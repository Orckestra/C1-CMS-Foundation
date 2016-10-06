import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import TabContent from 'console/components/container/TabContent.js';

const ToolbarFrame = props => {
	// Collate toolbars with item lists
	let toolbars = props.toolbars.map(toolbarDef => {
		toolbarDef.items.forEach(item => {
			if (item.action === 'save') {
				item.action = props.actions.save(props.pageName);
				item.saveButton = true;
			} else if (item.type === 'select' || item.type === 'checkboxGroup') {
				item.onChange = props.actions.setOption(item.name);
			} else if (!item.saveButton) {
				item.action = props.actions.fireAction(item.action, props.pageName);
			}
		});
		return (
			<Toolbar
				{...toolbarDef}
				key={toolbarDef.name}
				canSave={!!props.dirty}/>
		);
	});
	return (
		<div className='page'
			onContextMenu={event => {
				event.preventDefault(); // To not show the default menu
			}}>
			{toolbars}
			<TabContent/>
		</div>
	);
};

ToolbarFrame.propTypes = {
	pageName: PropTypes.string.isRequired,
	toolbars: PropTypes.arrayOf(PropTypes.object).isRequired,
	actions: PropTypes.object.isRequired,
	dirty: PropTypes.bool.isRequired
};

export default ToolbarFrame;
