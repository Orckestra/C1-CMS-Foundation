import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import TabBar from 'console/components/presentation/TabBar.js';
import ConnectTabPanel from 'console/components/container/ConnectTabPanel.js';
import { toolbarPropsSelector } from 'console/state/selectors/toolbarPropsSelector.js';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ToolbarFrame = props => {
	let toolbars = toolbarPropsSelector(props).map(toolbar => (
			<Toolbar
				{...toolbar.toObject()}
				key={toolbar.get('name')}/>
		)
	).toArray();
	if (props.tabDefs.size > 1) {
		toolbars.push(<TabBar key='tabs' tabs={props.tabDefs
			.map(tabDef => ({
				name: tabDef.get('name'),
				active: tabDef.get('name') === props.shownTab,
				label: tabDef.get('label'),
				onClick: props.actions.setTab(tabDef.get('name'))
			}))
			.toArray()}/>);
	}
	return (
		<div className='page'
			onContextMenu={event => {
				event.preventDefault(); // To not show the default menu
			}}>
			{toolbars}
			<ConnectTabPanel/>
		</div>
	);
};

ToolbarFrame.propTypes = {
	tabDefs: ImmutablePropTypes.list.isRequired,
	shownTab: PropTypes.string,
	toolbars: ImmutablePropTypes.list.isRequired,
	actions: PropTypes.object.isRequired,
	dirty: PropTypes.bool.isRequired
};

export default ToolbarFrame;
