import React, { PropTypes } from 'react';
import DataField from './DataField.js';

const Fieldset = ({ label, fields }) => (
	<fieldset>
		{label ? <legend>{label}</legend> : null}
		{
			Object.keys(fields).map(name => {
				let field = fields[name];
				return (<DataField key={name} {...field}/>);
			})
		}
	</fieldset>
)

Fieldset.propTypes = {
	label: PropTypes.string,
	fields: PropTypes.object.isRequired
};

export default Fieldset;
