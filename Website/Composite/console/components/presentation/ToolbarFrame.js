import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import TabContent from 'console/components/container/TabContent.js';

const ToolbarFrame = props => {
	let buttons = props.pageDef.buttons.reduce((buttons, buttonName) => {
		let button = Object.assign({}, props.buttonDefs[buttonName]);
		if (button.action === 'save') {
			button.action = props.actions.save(props.name);
			button.saveButton = true;
		} else {
			button.action = props.actions.fireAction(button.action, props.name);
		}
		buttons[buttonName] = button;
		return buttons;
	}, {});
	return (
		<div className='page'
			onContextMenu={event => {
				event.preventDefault(); // To not show the default menu
			}}>
			<Toolbar
				canSave={!!props.dirtyPages[props.name]}
				type='document'
				buttons={buttons}/>
			<TabContent/>
		</div>
	);
};

ToolbarFrame.propTypes = {
	name: PropTypes.string.isRequired,
	buttonDefs: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	dirtyPages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	pageDef: PropTypes.object.isRequired
};

export default ToolbarFrame;
