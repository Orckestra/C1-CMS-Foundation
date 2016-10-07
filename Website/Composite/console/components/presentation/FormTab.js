import React, { PropTypes } from 'react';
import Fieldset from 'console/components/presentation/Fieldset.js';
import ImmutablePropTypes from 'react-immutable-proptypes';

const FormTab = props => {
	if (!props.fieldsets) return null;
	let fieldsets = props.fieldsets.toArray().map(fieldset => {
		let fsProps = fieldset.toObject();
		fsProps.fields = fsProps.fields.map(field =>
			field.set('updateValue', props.actions.updateValue(props.pageName, field.get('name')))
		);
		return (
			<Fieldset
				{...fsProps}
				key={fsProps.name}/>
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
	pageName: PropTypes.string,
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
	fieldsets: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default FormTab;
