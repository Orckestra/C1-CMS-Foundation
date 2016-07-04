import React from 'react';

export default class DataField extends React.Component {
	handleChange() {
		this.props.changeValue(this.refs.input.value);
	}

	render() {
		let helper = this.props.help ? <span className="helper">{this.props.help}</span> : null;
		let label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;

		return (
			<div className="datafield">
				{label}
				<input
					type={this.props.type}
					id={this.props.name}
					value={this.props.value}
					ref="input"
					onChange={this.handleChange.bind(this)}/>
				{helper}
			</div>
		);
	}
}
