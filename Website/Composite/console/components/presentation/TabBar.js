import React, {PropTypes } from 'react';

export const Tab = props => <div className='tab' {...props}/>;

const TabBar = props => (
	<div className='tabbar'>
		{props.tabs.map(p => <Tab key={p.name} {...p}/>)}
	</div>
);

TabBar.propTypes = {
	tabs: PropTypes.array.isRequired
};

export default TabBar;
