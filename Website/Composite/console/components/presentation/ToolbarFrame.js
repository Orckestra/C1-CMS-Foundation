import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import TabContent from 'console/components/container/TabContent.js';

const ToolbarFrame = props => {
	// Collate toolbars with item lists
	let toolbars = props.pageDef.toolbars.reduce((toolbars, toolbarName) => {
		let toolbarDef = props.toolbarDefs[toolbarName];
		if (!toolbarDef) return null;
		let items = toolbarDef.items.reduce((items, itemName) => {
			let item = Object.assign({}, props.itemDefs[itemName]);
			if (item.action === 'save') {
				item.action = props.actions.save(props.name);
				item.saveButton = true;
			} else {
				item.action = props.actions.fireAction(item.action, props.name);
			}
			items[itemName] = item;
			return items;
		}, {});
		toolbars.push(
			<Toolbar
				key={toolbarName}
				canSave={!!props.dirtyPages[props.name]}
				type='document'
				items={items}/>);
		return toolbars;
	}, []);
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
	name: PropTypes.string.isRequired,
	toolbarDefs: PropTypes.object.isRequired,
	itemDefs: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	dirtyPages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	pageDef: PropTypes.object.isRequired
};

export default ToolbarFrame;
