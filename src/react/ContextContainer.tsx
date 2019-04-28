
import * as React from 'react';

import { Context } from './Context';
import { ContextTypes } from './ContextTypes';

export class ContextContainer extends React.Component<Context, {}> {
  static readonly childContextTypes = ContextTypes;

  getChildContext() : Context {
    const { paramorph, post, history, pathParams } = this.props;
    return { paramorph, post, history, pathParams };
  }

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}

export default ContextContainer;

