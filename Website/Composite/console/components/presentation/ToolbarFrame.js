import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import ConnectFormPanel from 'console/components/container/ConnectFormPanel.js';
import { toolbarPropsSelector } from 'console/state/selectors/toolbarPropsSelector.js';

const ToolbarFrame = props => {
	let toolbars = toolbarPropsSelector(props).map(toolbar => (
			<Toolbar
				{...toolbar.toObject()}
				key={toolbar.get('name')}/>
		)
	).toArray();
	return (
		<div className='page'
			onContextMenu={event => {
				event.preventDefault(); // To not show the default menu
			}}>
			{toolbars}
			<ConnectFormPanel/>
		</div>
	);
};

ToolbarFrame.propTypes = {
	toolbars: PropTypes.object.isRequired, // Immutable.List
	actions: PropTypes.object.isRequired,
	dirty: PropTypes.bool.isRequired
};

export default ToolbarFrame;
