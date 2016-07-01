import React from 'react';
import DataField from './DataField.js';

export default class Fieldset extends React.Component {
	render() {
		let fields = this.props.fields.map(
			(field, index) => <DataField key={index} {...field} value={this.props.values[field.name]}/>
		);
		return (
			<fieldset>
				<legend>{this.props.label}</legend>
				{fields}
			</fieldset>
		);
	}
}
