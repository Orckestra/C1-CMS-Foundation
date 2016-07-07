import React from 'react';

export default props => {
	let { id, ...others } = props;
	return (
		<svg { ...others }>
      <use xlinkHref={'#icon-' + id}/>
		</svg>
	)
}
