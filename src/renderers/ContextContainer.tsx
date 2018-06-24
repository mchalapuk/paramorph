
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { History } from 'history';

import { Paramorph, Page } from '../model';

const PropTypes : React.ReactPropTypes = require('prop-types');

export interface Props {
  paramorph : Paramorph;
  history : History;
  page : Page;
}

export class ContextContainer extends React.Component<Props, {}> {
  static readonly contextTypes = {
    paramorph: PropTypes.shape({
      layouts: PropTypes.object.isRequired,
      includes: PropTypes.object.isRequired,
      pages: PropTypes.object.isRequired,
      categories: PropTypes.object.isRequired,
      tags: PropTypes.object.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      listen: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    page: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
      collection: PropTypes.string.isRequired,
      layout: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      output: PropTypes.bool.isRequired,
      feed: PropTypes.bool.isRequired,
      category: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      timestamp: PropTypes.number.isRequired,
    }).isRequired,
  };

  getChildContext() {
    const { paramorph, page, history } = this.props;
    return { paramorph, page, history };
  }

  render() {
    return (
      <AppContainer>
        { React.Children.only(this.props.children) }
      </AppContainer>
    );
  }
}

export default ContextContainer;

