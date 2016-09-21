import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import FormTab from 'console/components/presentation/FormTab.js';

const ToolbarFrame = props => {
	if (!(props.pageDef && props.pageDef.tabs && props.tabDefs && props.fieldsetDefs)) return null;
	let tabDef = props.tabDefs[props.tabName];
	if (!tabDef) return null;
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
	let tabProps = {
		name: props.tabName,
		actions: props.actions,
		fieldsetDefs: props.fieldsetDefs,
		dataFieldDefs: props.dataFieldDefs,
		dirtyPages: props.dirtyPages,
		values: props.values,
		tabDef
	};
	return (
		<div className='page'>
			<Toolbar
				canSave={false}
				type='document'
				buttons={buttons}/>
			<FormTab {...tabProps}/>
		</div>
	);
};

ToolbarFrame.propTypes = {
	name: PropTypes.string.isRequired,
	buttonDefs: PropTypes.object.isRequired,
	tabDefs: PropTypes.object.isRequired,
	tabName: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	dirtyPages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	fieldsetDefs: PropTypes.object.isRequired,
	dataFieldDefs: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	pageDef: PropTypes.object.isRequired
};

export default ToolbarFrame;
