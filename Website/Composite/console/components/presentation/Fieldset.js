import React, { PropTypes } from 'react';
import DataField from 'console/components/presentation/DataField.js';
import * as CustomPropTypes from 'console/components/customPropTypes.js';

const Fieldset = ({ label, fields }) => (
	<fieldset>
		{label ? <legend>{label}</legend> : null}
		{
			fields.map(field => (
				<DataField key={field.get('name')} name={field.get('name')} {...field.toObject()}/>
			)).toArray()
		}
	</fieldset>
);

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: CustomPropTypes.immutableList.isRequired
};

export default Fieldset;
