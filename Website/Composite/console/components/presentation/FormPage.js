import React, { PropTypes } from 'react';
import Toolbar from './Toolbar.js';
import Fieldset from './Fieldset.js';

function transformButtonActions(pageName, rawActions, buttons) {
	let actions = {};
	Object.keys(rawActions).forEach(actionName => {
		let buttonName = pageName + '/' + actionName;
		if (buttons[buttonName]) {
			actions[buttonName] = rawActions[actionName](pageName);
		}
	});
	return actions;
}

function transformFields(fieldset, dataFields, rawActions, values) {
	let fields = {};
	fieldset.fields.forEach(fieldName => {
		fields[fieldName] = Object.assign({}, dataFields[fieldName]);
		fields[fieldName].updateValue = rawActions.updateValue(fieldName);
		if (values && values[fieldName]) {
			fields[fieldName].value = values[fieldName];
		} else {
			fields[fieldName].value = fields[fieldName].defaultValue;
		}
	});
	return fields;
}

const FormPage = props => (
	<div className='page'>
		<Toolbar
			type='document'
			buttons={props.buttons}
			actions={transformButtonActions(props.name, props.actions, props.buttons)}/>
		<div className='scrollbox'>
			{Object.keys(props.fieldsets).map(fieldsetName => {
				let fieldset = props.fieldsets[fieldsetName];
				let fields = transformFields(fieldset, props.dataFields, props.actions, props.values);
				return (
					<Fieldset
						{...fieldset}
						fields={fields}
						key={name}/>
				);
			})}
		</div>
	</div>
);

FormPage.propTypes = {
	name: PropTypes.string.isRequired,
	buttons: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	fieldsets: PropTypes.object.isRequired,
	dataFields: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired
};

export default FormPage;
