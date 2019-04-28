
import * as webpack from 'webpack';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { promisify } from 'util';

import Module = require('module');
import { createMemoryHistory } from 'history';

import { Paramorph, Post, PathParams } from '../../model';
import { ContextContainer } from '../../react';
import ErrorPolicy from '../../ErrorPolicy';

import ContentLoader from './ContentLoader';
import DescriptionGenerator from './DescriptionGenerator';

const TEMPLATE = 'paramorph/loader/markdown/NoDependencyPost.tsx.ejs';

export class FullContentLoader implements ContentLoader {
  private readonly history = createMemoryHistory();
  private errored = false;

  constructor(
    private readonly context : webpack.loader.LoaderContext,
    private readonly policy : {
      missingDescription : ErrorPolicy,
      missingImage : ErrorPolicy,
    },
    private readonly debug : {
      generatedDescriptions: boolean,
      generatedImages: boolean,
    },
  ) {
  }

  async load(paramorph : Paramorph) : Promise<void> {
    const urls = Object.keys(paramorph.posts);

    const promises = urls
      .map(url => paramorph.posts[url] as Post)
      .filter(post => (post.output && (!post.description || !post.image)))
      .map(post => this.loadPost(post, paramorph))
    ;
    await Promise.all(promises);

    const descriptionErrors = this.validateDescriptions(paramorph);

    switch (this.policy.missingDescription) {
      case 'ignore':
        break;
      case 'warning':
        descriptionErrors.forEach(err => this.context.emitWarning(err));
        break;
      case 'error':
        descriptionErrors.forEach(err => this.context.emitError(err));
        break;
    }
  }

  async loadPost(post : Post, paramorph : Paramorph) : Promise<void> {
    const loadModule = promisify(this.context.loadModule.bind(this.context));
    const query = `!markdown-loader?template=${TEMPLATE}!@website${post.source.substring(1)}`;

    await loadModule(query)
      .then((postSource : string) => {
        return this.loadPost0(postSource, post, paramorph);
      })
      .catch((err : any) => {
        this.context.emitError(err);
      })
    ;
  }

  private async loadPost0(postSource : string, post : Post, paramorph : Paramorph) {
    const PostComponent = this.exec(postSource, post.url);
    const html = this.render(PostComponent, post, paramorph);

    if (!post.image) {
      const image = await this.imageFromContent(html, post);

      if (image) {
        Object.defineProperty(post, 'image', {
          get: () => image,
          set: () => { throw new Error('Post.image is readonly'); }
        });
        if (this.debug.generatedImages) {
          console.log(`generated posts['${post.url}'].image = '${image}'`);
        }
      }
    }
    if (!post.description) {
      const generator = new DescriptionGenerator(post.limit);
      const description = generator.generate(html, post);

      if (description) {
        Object.defineProperty(post, 'description', {
          get: () => description,
          set: () => { throw new Error('Post.description is readonly'); },
        });
        if (this.debug.generatedDescriptions) {
          console.log(`generated posts['${post.url}'].description = '${description}'`);
        }
      }
    }
  }

  private exec(source : string, url : string) {
    const module = new Module(url, this.context as any);
    module.paths = (Module as any)._nodeModulePaths(this.context.context);
    module.filename = url;
    (module as any)._compile(source, url);

    return module.exports.default;
  }

  private render(
    PostComponent : React.ComponentType<any>,
    post : Post,
    paramorph : Paramorph,
  ) {
    const { history } = this;
    const pathParams = new PathParams();

    const postElement = React.createElement(
      PostComponent,
      { respectLimit: true },
    );
    const container = React.createElement(
      ContextContainer,
      { history, pathParams, paramorph, post },
      postElement,
    );

    const html = ReactDomServer.renderToStaticMarkup(container);
    return html;
  }

  private async imageFromContent(html : string, post : Post) {
    const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(html);
    if (found) {
      return found[1];
    }

    switch (this.policy.missingImage) {
      case 'error':
        this.errored = true;
        this.context.emitError(
          new Error(`Couldn't find image on post ${post.url}; post.image is null`),
        );
        return null;
      case 'warning':
        this.context.emitWarning(
          new Error(`Couldn't find image on post ${post.url}; post.image is null`),
        );
        return null;
      case 'ignore':
        return null;
    }
  }

  private validateDescriptions(paramorph : Paramorph) : Error[] {
    const urls = Object.keys(paramorph.posts)
      .map(key => paramorph.posts[key] as Post)
      .filter(p => p.description === '' && p.output)
      .map(p => p.url)
    ;
    if (!urls.length) {
      return [];
    }

    return urls.map(url => Error(
      `Description missing in post ${url}. `
      + `Write some text on the post or add 'description' field.`
    ));
  }
}

export default FullContentLoader;

