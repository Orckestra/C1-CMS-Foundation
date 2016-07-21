import React from 'react';
import Toolbar from './Toolbar.js';
import Fieldset from './Fieldset.js';

const FormPage = props => (
	<div className="page">
		<Toolbar type="document" buttons={props.buttons} actions={props.actions}/>
		<div className="scrollbox">
			{Object.keys(props.fieldsets).map(fieldsetName => {
				let fieldset = props.fieldsets[fieldsetName];
				let fields = {};
				fieldset.fields.forEach(fieldName => {
					fields[fieldName] = Object.assign({}, props.dataFields[fieldName]);
					fields[fieldName].updateValue = props.actions.updateValue;
					if (props.values && props.values[fieldName]) {
						fields[fieldName].value = props.values[fieldName];
					} else {
						fields[fieldName].value = fields[fieldName].defaultValue;
					}
				});
				return (
					<Fieldset
						{...fieldset}
						fields={fields}
						key={name}/>
				)}
			)}
		</div>
	</div>
);

export default FormPage;
