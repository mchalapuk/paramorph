import * as React from 'react';

import Content from 'paramorph/components/Content';
import { ContextTypes, Context } from 'paramorph';

export interface Props {
  children : React.ReactNode;
}

export class MarkdownPage extends React.Component<Props, {}> {
  static readonly contextTypes = ContextTypes;
  context : Context;

  render() {
    const { children, ...data } = this.props;

    return (
      <Content limit={ 5 } { ...data }>{ children }</Content>
    );
  }
}

export default MarkdownPage;

