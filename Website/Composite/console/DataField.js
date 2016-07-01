import React from 'react';

export default class DataField extends React.Component {
	handleChange() {
		this.props.changeValue(this.refs.input.value);
	}

	render() {
		return (
			<div className="datafield">
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<input
					type={this.props.type}
					id={this.props.name}
					value={this.props.value}
					ref="input"
					onChange={this.handleChange.bind(this)}>
				</input>
				<span className="helper">{this.props.help}</span>
			</div>
		);
	}
}
