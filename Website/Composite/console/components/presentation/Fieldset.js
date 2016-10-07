import React, { PropTypes } from 'react';
import DataField from 'console/components/presentation/DataField.js';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
	fields: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
};

export default Fieldset;
