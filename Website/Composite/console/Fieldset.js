import React, { PropTypes } from 'react';
import DataField from './DataField.js';

const Fieldset = ({ label, fields, values }) => (
	<fieldset>
		{label ? <legend>{label}</legend> : null}
		{fields.map(
			(field, index) => <DataField key={index} {...field} value={values[field.name]}/>
		)}
	</fieldset>
)

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: PropTypes.array.isRequired,
	values: PropTypes.object.isRequired
};

export default Fieldset;
