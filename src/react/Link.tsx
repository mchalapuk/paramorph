
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
      <a onClick={ this.wrap(onClick) } href={ to }>{ children }</a>
    );
  }

  private wrap(onClick : ClickCallback) {
    return (event : ClickEvent) => {
      const result = onClick(event);
      if (result === false) {
        event.preventDefault();
        return false;
      }

      if (this.isLocal()) {
        const { history } = this.context;
        const { to } = this.props;
        history.push(to);
        event.preventDefault();
        return false;
      }

      // default anchor behavior
      return true;
    };
  }

  private isLocal() {
    // if it doesn't start with something:// then its local
    return !this.props.to.match(/^[a-z]*\:\/\/.*$/i)
  }
}

export default Link;

