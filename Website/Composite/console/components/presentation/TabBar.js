import React, {PropTypes } from 'react';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';
import Icon from 'console/components/presentation/Icon.js';

export const TabIcon = styled(Icon).withConfig({ displayName: 'TabIcon' })`
	width: 18px;
	height: 18px;
	position: absolute;
	left: 19px;
`;

export const TabDiv = styled.div.withConfig({ displayName: 'TabDiv' })`
	width: 50px;
	border: 1px solid ${colors.borderColor};
	border-radius: 5px 5px 0 0;
	position: absolute;
	background-color: white;
	color: ${colors.fadedTextColor};
	text-transform: uppercase;
	cursor: default;
	${props => props.active ? css`
		border-bottom-color: white;
		color: ${colors.buttonHighlightColor};
		z-index: 1;
	` : ''}
	${props => props.dock ? css`
		height: 18px;
		min-width: 110px;
		padding: 10px 30px 10px 45px;
		left: ${props => 10 + (props.index * 183)}px;
		bottom: -1px;
	` : css`
		height: 16px;
		top: -27px;
		left: ${props => 10 + (props.index * 83)}px;
		padding: 5px 20px 5px 15px;
	`}
`;

export const Tab = props => <TabDiv
	onClick={props.onClick}
	index={props.index}
	active={props.active}
	dock={props.dock}
	className={'tab'}>
		{props.icon ? <TabIcon id={props.icon}/> : null }
		{props.label}
	</TabDiv>;

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	icon: PropTypes.string,
	active: PropTypes.bool,
	dock: PropTypes.bool,
	onClick: PropTypes.func
};

export const TabBarDiv = styled.div.withConfig({ displayName: 'TabBarDiv' })`
	margin-top: -1px;
	position: relative;
	${props => props.dock ? css`
		height: 50px;
		background-color: ${colors.darkBackground};
		margin-top: 0;
		border-bottom: 1px solid ${colors.borderColor};
		` : ''}
`;

const TabBar = props => (
	<TabBarDiv className='tabbar' dock={props.dock}>
		{props.tabs.map((p, index) => <Tab
			dock={props.dock}
			key={p.name}
			index={index}
			onClick={p.onClick || (props.onClick && props.onClick(p.name))}
			{...p}/>)}
	</TabBarDiv>
);

TabBar.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func
	})).isRequired,
	onClick: PropTypes.func,
	dock: PropTypes.bool
};

export default TabBar;
