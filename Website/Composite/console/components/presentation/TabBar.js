import React, {PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';

const TabDiv = styled.div`
	width: 50px;
	padding: 5px 20px 5px 15px;
	border: 1px solid ${colors.borderColor};
	border-radius: 5px 5px 0 0;
	position: absolute;
	top: -27px;
	background-color: white;
	color: ${colors.fadedTextColor};
	text-transform: uppercase;
	cursor: default;

	&.active {
		border-bottom-color: white;
		color: ${colors.buttonHighlightColor};
		z-index: 1;
	}
`;

export const Tab = props => <TabDiv
	onClick={props.onClick}
	className={'tab' + (props.active ? ' active' : '')}
	style={{ left: 10 + (props.index * 83) + 'px' }}>
		{props.label}
	</TabDiv>;

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool,
	onClick: PropTypes.func
};

const TabBarDiv = styled.div`
	border-bottom: 1px solid ${colors.borderColor};
	position: relative;
`;

const TabBar = props => (
	<TabBarDiv className='tabbar'>
		{props.tabs.map((p, index) => <Tab
			key={p.name}
			index={index}
			{...p}/>)}
	</TabBarDiv>
);

TabBar.propTypes = {
	tabs: PropTypes.array.isRequired,
	onClick: PropTypes.func
};

export default TabBar;
