
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';

import { Context } from './Context';
import { ContextTypes } from './ContextTypes';

export class ContextContainer extends React.Component<Context, {}> {
  static readonly childContextTypes = ContextTypes;

  getChildContext() : Context {
    const { paramorph, page, history } = this.props;
    return { paramorph, page, history };
  }

  render() {
    return (
      <AppContainer>
        { React.Children.only(this.props.children) }
      </AppContainer>
    );
  }
}

export default ContextContainer;

