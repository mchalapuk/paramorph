
import * as React from 'react';

import { PureComponent } from '../react';

export type ClickEvent = React.MouseEvent<HTMLAnchorElement>;
export type ClickCallback = (event : ClickEvent) => boolean | void;
const noop = () => {};

export interface Props {
  to : string;
  children : React.ReactNode;
  onClick ?: ClickCallback;
}

export class Link extends PureComponent<Props, {}> {
  render() {
    const { to, children, onClick = noop } = this.props;

    return (
      <a onClick={ wrap(onClick) } href={ to }>{ children }</a>
    );
  }
}

export default Link;

function wrap(onClick : ClickCallback) {
  return (event : ClickEvent) => {
    const result = onClick(event);
    return result !== undefined ? result : true;
  };
}

