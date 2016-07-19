import React from 'react';

export default (id, ...others) => {
	return (
		<svg { ...others }>
			<use xlinkHref={'#icon-' + id}/>
		</svg>
	)
}
