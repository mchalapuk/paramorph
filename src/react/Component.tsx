
import * as React from 'react';

import { ContextTypes } from './ContextTypes';
import { Context } from './Context';

export class Component<P, S> extends React.Component<P, S> {
  static readonly contextTypes = ContextTypes;
  context : Context;
}

export default Component;

