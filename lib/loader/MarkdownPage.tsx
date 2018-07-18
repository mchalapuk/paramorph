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

    const PLACEHOLDER = children;

    return (
      <Content limit={ 5 } { ...data }>
        { PLACEHOLDER }
      </Content>
    );
  }
}

export default MarkdownPage;

