
import * as React from 'react';

import { ContextTypes } from './ContextTypes';
import { Context } from './Context';

export class PureComponent<P, S> extends React.PureComponent<P, S> {
  static readonly contextTypes = ContextTypes;
  context : Context;
}

export default PureComponent;

