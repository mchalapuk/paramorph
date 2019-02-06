
import { Config, CollectionConfig, Paramorph, Layout, Include, Page, Collection, Tag } from '../../model';
import MarkdownLoader from '../markdown/MarkdownLoader';
import FileSystem from '../../platform/interface/FileSystem';

import { ProjectStructure, SpecialDirs, SourceFile, SourceDirectory } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
import { PageFactory } from './PageFactory';
import { TagFactory } from './TagFactory';

const TAG_PAGE_URL = '/tag';

export class ConfigLoader {
  constructor(
    private structure : ProjectStructure,
    private frontMatter : FrontMatter,
    private pageFactory : PageFactory,
    private markdownLoader : MarkdownLoader,
    private fs : FileSystem,
  ) {
  }

  async load(config : Config) : Promise<Paramorph> {
    const paramorph = new Paramorph(config);

    const specialDirs = await this.structure.scan(config);
    specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
    specialDirs.includes.forEach(file => paramorph.addInclude(new Include(file.name, file.path)));

    const collectionFileTuples : { file : SourceFile, collection : Collection }[] = [];
    specialDirs.collections.forEach(dir => {
      const { name, path } = dir;
      const cfg = config.collections[name] || {} as CollectionConfig;

      const collection = new Collection(name, cfg.title || toTitle(name), path, cfg.layout, cfg.output);
      paramorph.addCollection(collection);

      dir.files.forEach(file => collectionFileTuples.push({ file, collection }));
    });

    // TODO queue + limited number of workers?
    await Promise.all(
      collectionFileTuples.map(async ({ collection, file }) => {
        const matter = await this.frontMatter.read(file);
        const page = this.pageFactory.create(file, collection, matter);
        paramorph.addPage(page);
      }),
    );

    this.addTags(paramorph);
    const descriptions = this.generateMissingDescriptions(paramorph);
    const images = this.addDefaultImages(paramorph);
    await descriptions;
    await images;

    this.validatePages(paramorph);
    this.validateCategories(paramorph);

    return paramorph;
  }

  private addTags(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const tagPage = paramorph.pages[TAG_PAGE_URL] as Tag;
    if (!tagPage) {
      throw new Error(`Couldn't find page of url '${TAG_PAGE_URL}' (used to render tag pages)`);
    }
    const tagFactory = new TagFactory(tagPage);

    pages.forEach(page => {
      page.tags.forEach(title => {
        const tag = tagFactory.create(title);

        if (paramorph.pages.hasOwnProperty(tag.url)) {
          // In case there is a separately defined page for this tag.
          return;
        }
        paramorph.addPage(tag);
      });
    });
  }

  private async generateMissingDescriptions(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const index = paramorph.pages['/'] as Page;

    const promises = pages.map(async (page : Page) => {
      if (page.description || !page.output) {
        return;
      }
      if (page instanceof Tag) {
        const description = await this.descriptionFromPages(index, page);

        Object.defineProperty(page, 'description', {
          get: () => description,
          set: () => { throw new Error('Page.description is readonly'); },
        });
      } else {
        const description = await this.descriptionFromContent(page, paramorph);

        Object.defineProperty(page, 'description', {
          get: () => description,
          set: () => { throw new Error('Page.description is readonly'); },
        });
      }
    });
    return Promise.all(promises);
  }

  private async addDefaultImages(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const promises = pages.map(async (page : Page) => {
      if (page.image || !page.output) {
        return;
      }
      const description = await this.imageFromContent(page, paramorph);

      Object.defineProperty(page, 'image', {
        get: () => description,
        set: () => { throw new Error('Page.image is readonly'); }
      });
    });
    return Promise.all(promises);
  }

  private async descriptionFromContent(page : Page, paramorph : Paramorph) {
    const source = await this.fs.read(page.source, 2048);
    const markup = this.markdownLoader.load(source, page.url, paramorph);
    return removeEntities(stripTags(markup));
  }

  private descriptionFromPages(index : Page, page : Tag) {
    return removeEntities(`${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`);
  }

  private async imageFromContent(page : Page, paramorph : Paramorph) {
    const source = await this.fs.read(page.source, 2048);
    const markup = this.markdownLoader.load(source, page.url, paramorph);
    const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
    if (!found) {
      console.warn(`Couldn't find image on page ${page.url}; page.image is null`);
      return null;
    }
    return found[1];
  }

  private validatePages(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const missingDescription = pages
      .filter(p => p.description === '' && p.output)
      .map(p => p.title)
    ;
    if (missingDescription.length !== 0) {
      throw new Error(`Description missing in pages ${
        JSON.stringify(missingDescription)
      }. Write some text in the article or add \'description\' field.`);
    }
  }

  private validateCategories(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const missing = [] as { page : string, category : string }[];

    pages.forEach(page => {
      page.categories.forEach(category => {
        if (!paramorph.categories.hasOwnProperty(category)) {
          missing.push({ page: page.url, category });
        }
      });
    });

    if (missing.length !== 0) {
      throw new Error(`Couldn't find category page(s): ${JSON.stringify(missing)}`);
    }
  }
}

export default ConfigLoader;

function toTitle(name : string) {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

function stripTags(htmlText : string) {
	let uIndentionChar = "-";
	let oIndentionChar = "-";

	// removel all \n linebreaks
	let tmp = String(htmlText).replace(/\n|\r/g, " ");

	// remove everything before and after <body> tags including the tag itself
	tmp = tmp.replace(/<\/body>.*/i, "");
	tmp = tmp.replace(/.*<body[^>]*>/i, "");

	// remove inbody scripts and styles
	tmp = tmp.replace(/<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi, "");

	// remove all tags except that are being handled separately
	tmp = tmp.replace(/<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^>]*>/gi, "");

  // remove images
  tmp = tmp.replace(/<img([^>]*)>/gi, '');

	function createListReplaceCb() {
		return (match : string, listType : string, listAttributes : string | null, listBody : string) => {
			let liIndex = 0;
			let startMatch : string[] | null;
			if(listAttributes && (startMatch = /start="([0-9]+)"/i.exec(listAttributes)) !== null) {
				liIndex = parseInt(startMatch[1]) - 1;
			}
			const plainListItem = "<p>" + listBody.replace(
				/<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi,
				(str, listItem) => {
  				let actSubIndex = 0;
  				const plainListLine = listItem.replace(/(^|(<br \/>))(?!<p>)/gi, function(){
  					if(listType === "o" && actSubIndex === 0){
  						liIndex += 1;
  						actSubIndex += 1;
  						return "<br />" + liIndex + oIndentionChar;
  					}
  					return "<br />";
  				});
  				return plainListLine;
  			}
			) +"</p>";
			return plainListItem;
		};
	}

	// handle lists
	tmp = tmp.replace(/<\/?ul[^>]*>|<\/?ol[^>]*>|<\/?li[^>]*>/gi, "");
	// handle headings
	tmp = tmp.replace(/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, " $2 ");
	// replace <br>s, <td>s, <divs> and <p>s with linebreaks
	tmp = tmp.replace(/<br( [^>]*)*>|<p( [^>]*)*>|<\/p( [^>]*)*>|<div( [^>]*)*>|<\/div( [^>]*)*>|<td( [^>]*)*>|<\/td( [^>]*)*>/gi, "");
	// replace <a href>b<a> links with b (href)
	tmp = tmp.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi, function(str, href, linkText) {
		return " " + linkText +" ";
	});
	// remove duplicated spaces including non braking spaces
	tmp = tmp.replace(/( |&nbsp;|\t)+/gi, " ");
	// remove line starter spaces
	tmp = tmp.replace(/\n +/gi, "");
	// remove content starter spaces
	tmp = tmp.replace(/^ +/gi, "");

	return tmp;
}

function removeEntities(str : string) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
  ;
}

