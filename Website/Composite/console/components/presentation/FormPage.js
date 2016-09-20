import React, { PropTypes } from 'react';
import Fieldset from 'console/components/presentation/Fieldset.js';

const FormPage = props => {
	let fieldsets = props.tabDef.fieldsets.map(fieldsetName => {
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
	});
	return (
		<div className='scrollbox'>
			{fieldsets}
		</div>
	);
};

FormPage.propTypes = {
	name: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	fieldsetDefs: PropTypes.object.isRequired,
	dataFieldDefs: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	tabDef: PropTypes.object.isRequired
};

export default FormPage;
