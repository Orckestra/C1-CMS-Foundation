import React, { PropTypes } from 'react';
import Fieldset from 'console/components/presentation/Fieldset.js';

const FormTab = props => {
	if (!props.fieldsets) return null;
	let fieldsets = props.fieldsets.map(fieldset => {
		fieldset.fields.forEach(field => {
			field.updateValue = props.actions.updateValue(props.pageName, field.name);
		});
		return (
			<Fieldset
				{...fieldset}
				key={fieldset.name}/>
		);
	});
	return (
		<div className='scrollbox'>
			{fieldsets}
		</div>
	);
};

FormTab.propTypes = {
	name: PropTypes.string,
	pageName: PropTypes.string.isRequired,
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
	fieldsets: PropTypes.arrayOf(PropTypes.object)
};

export default FormTab;
