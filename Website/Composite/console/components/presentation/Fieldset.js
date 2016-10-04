import React, { PropTypes } from 'react';
import DataField from 'console/components/presentation/DataField.js';

const Fieldset = ({ label, fields }) => (
	<fieldset>
		{label ? <legend>{label}</legend> : null}
		{
			fields.map(field => (
				<DataField key={field.name} name={field.name} {...field}/>
			))
		}
	</fieldset>
);

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Fieldset;
