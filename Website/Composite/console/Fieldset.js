import React from 'react';

export default class Fieldset extends React.Component {
	render() {
		let fields = [];
		// For each field in state, define a DataField
		fields.push(
			<div key={1}>
				<label for="url-mapping-name">URL mapping name</label>
				<input id="url-mapping-name"></input>
				<span className="helper">URL mapping name</span>
			</div>
		)
		return (
			<fieldset>
				<legend>Language Properties</legend>
				{fields}
			</fieldset>
		);
	}
}
