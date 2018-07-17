import * as React from 'react';

import Content from 'paramorph/components/Content';
import { PureComponent } from 'paramorph';

export interface Props {
  children : React.ReactNode;
}

export class MarkdownPage extends PureComponent<Props, {}> {
  render() {
    const { children, ...data } = this.props;
    const { paramorph, page, history } = this.context;

    return (
      <Content limit={ 5 } { ...data }>{ children }</Content>
    );
  }
}

export default MarkdownPage;

