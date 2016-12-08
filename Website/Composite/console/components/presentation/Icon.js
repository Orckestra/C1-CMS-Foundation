import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
	height: 20px;
	width: 20px;
	stroke: currentColor;
	fill: currentColor;

	button & {
		height: 18px;
		width: 18px;
		display: inline-block;
		vertical-align: -4px;
	}

	.iconlist & {
		height: 24px;
		width: 24px;
	}
`;


const Icon = ({id}) => {
	return (
		<Svg>
			<use xlinkHref={'#icon-' + id}/>
		</Svg>
	);
};

Icon.propTypes = {
	id: PropTypes.string.isRequired
};

export default Icon;
