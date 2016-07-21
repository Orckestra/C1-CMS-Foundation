import React, { PropTypes } from 'react';

const Icon = ({id}) => {
	return (
		<svg>
			<use xlinkHref={'#icon-' + id}/>
		</svg>
	);
};

Icon.propTypes = {
	id: PropTypes.string.isRequired
};

export default Icon;
