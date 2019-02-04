
import * as React from 'react';

import Content from 'paramorph/react/Content';
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
      .map(name => {
        const include = paramorph.includes[name];
        const path = include.path.replace('_includes/', '');
        return `var ${name} = include('${path}');`;
      })
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

