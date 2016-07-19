import React from 'react';
import Toolbar from './components/presentation/Toolbar.js';
import Fieldset from './components/presentation/Fieldset.js';
import update from 'react-addons-update';

const Page = props => (
	<div className="page">
		<Toolbar type="document" buttons={props.buttons} actions={props.actions}/>
		<div className="scrollbox">
			{Object.values(props.fieldsets).map(fieldset => {
				console.log(props)
				let fields = {};
				fieldset.fields.forEach(fieldName => {
					fields[fieldName] = props.fields[fieldName];
					fields[fieldName].updateValue = props.actions.updateValue;
				});
				return (
					<Fieldset
						{...fieldset}
						fields={fields}
						key={fieldset.name}/>
				)}
			)}
		</div>
	</div>
);

export default Page;
