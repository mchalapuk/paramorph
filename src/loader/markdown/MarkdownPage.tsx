
import * as React from 'react';

import Content from 'paramorph/components/Content';
import { PureComponent } from 'paramorph';

const include = require.context('@website/_includes', true, /.(j|t)sx?$/);

export interface Props {
  children : React.ReactNode;
}

export class MarkdownPage extends PureComponent<Props, {}> {
  render() {
    const { children, ...data } = this.props;
    const { paramorph, page, history } = this.context;

    const includes = Object.keys(paramorph.includes)
      .map(name => `var ${name} = include('${name}');`)
      .join('\n')
    ;
    eval(includes);

    const PLACEHOLDER = children;

    return (
      <Content limit={ 5 } { ...data }>
        { PLACEHOLDER }
      </Content>
    );
  }
}

export default MarkdownPage;

