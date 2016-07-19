import React from 'react';

const Icon = ({id}) => {
	return (
		<svg>
			<use xlinkHref={'#icon-' + id}/>
		</svg>
	)
}

export default Icon;
