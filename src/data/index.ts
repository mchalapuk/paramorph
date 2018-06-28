import { stripTags } from '../utils';

const index = website.pages['/'];
if (index === undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

// generate descriptions for pages, categories and tags
pages.forEach((page : Page) => {
  if (page.description || !page.output) {
    return;
  }
  Object.defineProperty(page, 'description', {
    get: () => descriptionFromContent(page),
    set: () => { throw new Error('Page.description is readonly'); }
  });
});
categories.forEach((category : Category) => {
  if (category.description) {
    return;
  }
  Object.defineProperty(category, 'description', {
    get: () => descriptionFromContent(category) || descriptionFromPages(category),
    set: () => { throw new Error('Page.description is readonly'); }
  });
});
tags.forEach((tag: Tag) => {
  tag.description = descriptionFromPages(tag);
});

// check for missing descriptions
const missingDescription = pages
  .concat(categories)
  .concat(tags)
  .filter((p : Page) => p.description === '' && p.output)
  .map((p : Page) => p.title);
if (missingDescription.length !== 0) {
  throw new Error(`Description missing in pages ${JSON.stringify(missingDescription)}. Write some text in the article or add \'description\' field.`);
}

// if absent, set image to first img src found in content
pages.forEach((page : Page) => {
  if (page.image || !page.output) {
    return;
  }
  Object.defineProperty(page, 'image', {
    get: () => imageFromContent(page),
    set: () => { throw new Error('Page.image is readonly'); }
  });
});

function descriptionFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: true })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  return removeEntities(stripTags(renderToStaticMarkup(router)));
}
function descriptionFromPages(page : Tag | Category) {
  return removeEntities(`${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`);
}

function imageFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: false })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  const markup = renderToStaticMarkup(router);
  const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
  if (!found) {
    console.warn(`Couldn't find image on page ${page.url}; page.image is null`);
    return null;
  }
  return found[1];
}

function removeEntities(str : string) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
  ;
}

