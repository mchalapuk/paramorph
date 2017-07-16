import * as  React from 'react';
import { Component, ReactNode, Children } from 'react';
import * as PropTypes from 'prop-types';

export interface Props {
  children: ReactNode;
}

export class IsomorphicStyleContext extends Component<Props, {}> {
  static readonly childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      insertCss: (...styles : { _insertCss: () => () => void}[] ) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
      },
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default IsomorphicStyleContext;

