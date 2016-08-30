import React, { PropTypes } from 'react';
import Toolbar from 'console/components/presentation/Toolbar.js';
import Fieldset from 'console/components/presentation/Fieldset.js';

const FormPage = props => (
	<div className='page'>
		<Toolbar
			type='document'
			canSave={!!props.dirtyPages[props.name]}
			buttons={props.pageDef.buttons.reduce((buttons, buttonName) => {
				let button = Object.assign({}, props.buttonDefs[buttonName]);
				let actionName = buttonName.replace(props.name + '/', '');
				button.action = props.actions[actionName](props.name);
				buttons[buttonName] = button;
				return buttons;
			}, {})}/>
		<div className='scrollbox'>
			{props.pageDef.fieldsets.map(fieldsetName => {
				let fieldset = props.fieldsetDefs[fieldsetName];
				if (!fieldset) return null;
				let fields = fieldset.fields.reduce((fields, fieldName) => {
					fields[fieldName] = Object.assign({}, props.dataFieldDefs[fieldName]);
					fields[fieldName].updateValue = props.actions.updateValue(props.name, fieldName);
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
	dirtyPages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	fieldsetDefs: PropTypes.object.isRequired,
	dataFieldDefs: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	pageDef: PropTypes.object.isRequired
};

export default FormPage;
