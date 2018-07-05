
import { ComponentType, ReactElement, createElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { History } from 'history';

import { Paramorph, Page } from '../model';
import { ContextContainer } from './ContextContainer';

export class LoaderRenderer {
  constructor(
    private history : History,
    private paramorph : Paramorph
  ) {
  }

  render(page : Page) : string {
    const props = {
      history: this.history,
      paramorph: this.paramorph,
      page,
      respectLimit: false,
    };
    const component = require(`@website${page.source.substring(1)}`).default;

    const element = createElement(component, props);
    return renderToStaticMarkup(element);
  }
}

export default LoaderRenderer;

