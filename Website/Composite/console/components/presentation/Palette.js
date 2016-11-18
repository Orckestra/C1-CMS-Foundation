import React, { PropTypes } from 'react';

// two-dimensional structure: Categories containing components.
// Category has headline, open state, contains list of components
// Component has preview image url, label, description

const Palette = () => <div></div>;

Palette.propTypes = {
	components: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
};

export default Palette;
