import { createElement, Component, Children } from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter, BrowserRouter, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import * as PropTypes from 'prop-types';

import Root from './components/Root';
import IsomorphicStyleContext from './components/IsomorphicStyleContext';
import routes from './routes';
import website from './data';

const css : Set<string> = new Set<string>();

// context for catching css modules during static rendering
class CssCaptureContext extends Component<{}, {}> {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };
  getChildContext() {
    return {
      insertCss: (...styles : { _getCss() : string }[]) => {
        styles.forEach(s => css.add(s._getCss()));
      },
    };
  }
  render() {
    return Children.only(this.props.children);
  }
}

const serverRender = (locals : any) => {
  // react root contents rendered with react ids
  const child = createElement(Switch, {}, routes);
  const router = createElement(StaticRouter, { location: locals.path, context: {} }, child);
  const context = createElement(CssCaptureContext, {}, router);
  const body = renderToString(context);

  // site skeleton rendered without react ids and with prerendered css modules
  const page = (website.entities[locals.path] || { tags: [], description: '' });
  const root = createElement(Root, Object.assign({ css: [ ...css ] }, locals, page));
  const html = renderToStaticMarkup(root);

  // everything together
  return '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
}

const clientRender = () => {
  const container = document.getElementById('root');
  const child = createElement(Switch, {}, routes);
  const router = createElement(BrowserRouter, {}, child);
  const context = createElement(IsomorphicStyleContext, { children: router });
  const app = createElement(AppContainer, {}, context);
  render(app, container);
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', clientRender);
}

export default serverRender;

if (module.hot) {
  module.hot.accept('./routes', clientRender);
}

