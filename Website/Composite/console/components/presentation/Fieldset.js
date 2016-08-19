import React, { PropTypes } from 'react';
import DataField from 'console/components/presentation/DataField.js';

const Fieldset = ({ label, fields }) => (
	<fieldset>
		{label ? <legend>{label}</legend> : null}
		{
			Object.keys(fields).map(name => (
				<DataField key={name} name={name} {...fields[name]}/>
			))
		}
	</fieldset>
);

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: PropTypes.object.isRequired
};

export default Fieldset;
