import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import Fieldset from 'console/components/presentation/Fieldset.js';

const FormPage = props => (
	<div className='page'>
		<Toolbar
			type='document'
			canSave={props.hasDirtyFields}
			buttons={props.pageDef.buttons.reduce((buttons, buttonName) => {
				buttons[buttonName] = props.buttonDefs[buttonName];
				return buttons;
			}, {})}
			actions={props.pageDef.buttons.reduce((actions, buttonName) => {
				let actionName = buttonName.replace(props.name + '/', '');
				actions[buttonName] = props.actions[actionName](props.name);
				return actions;
			}, {})}/>
		<div className='scrollbox'>
			{props.pageDef.fieldsets.map(fieldsetName => {
				let fieldset = props.fieldsetDefs[fieldsetName];
				if (!fieldset) return null;
				let fields = fieldset.fields.reduce((fields, fieldName) => {
					fields[fieldName] = Object.assign({}, props.dataFieldDefs[fieldName]);
					fields[fieldName].updateValue = props.actions.updateValue(fieldName);
					fields[fieldName].value = props.values[fieldName] || fields[fieldName].defaultValue;
					return fields;
				}, {});
				return (
					<Fieldset
						{...fieldset}
						fields={fields}
						key={fieldsetName}/>
				);
			})}
		</div>
	</div>
);

FormPage.propTypes = {
	name: PropTypes.string.isRequired,
	buttonDefs: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	hasDirtyFields: PropTypes.bool.isRequired,
	fieldsetDefs: PropTypes.object.isRequired,
	dataFieldDefs: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	pageDef: PropTypes.object.isRequired
};

export default FormPage;
