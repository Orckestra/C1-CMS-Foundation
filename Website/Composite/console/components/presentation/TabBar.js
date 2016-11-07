import React, {PropTypes } from 'react';

export const Tab = props => <div
	onClick={props.onClick}
	className={'tab' + (props.active ? ' active' : '')}
	style={{ left: 10 + (props.index * 83) + 'px' }}>
		{props.label}
	</div>;

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool,
	onClick: PropTypes.func
};

const TabBar = props => (
	<div className='tabbar'>
		{props.tabs.map((p, index) => <Tab
			key={p.name}
			index={index}
			{...p}/>)}
	</div>
);

TabBar.propTypes = {
	tabs: PropTypes.array.isRequired,
	onClick: PropTypes.func
};

export default TabBar;
