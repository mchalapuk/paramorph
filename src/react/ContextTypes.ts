
import * as React from 'react';

const PropTypes : React.ReactPropTypes = require('prop-types');

export const ContextTypes = {
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

export default ContextTypes;

