import React from 'react';
import Icon from './Icon';

export default class DataField extends React.Component {
	handleChange() {
		this.props.changeValue(this.refs.input.value);
	}

	showHelper() {
		this.refs.helper.style.visibility = 'visible';
		this.refs.helper.style.opacity = 1;
	}

	hideHelper() {
		setTimeout(() => {
			this.refs.helper.style.visibility = '';
			this.refs.helper.style.opacity = '';
		}, 2000);
	}

	render() {
		return (
			<div className="datafield">
				{this.props.label ?
					<label htmlFor={this.props.name}>{this.props.label}</label> :
					null}
				<input
					type={this.props.type}
					id={this.props.name}
					value={this.props.value}
					ref="input"
					onChange={this.handleChange.bind(this)}/>
				{this.props.help ?
						<span className="helperIcon"
							onClick={this.showHelper.bind(this)}
							onMouseOut={this.hideHelper.bind(this)}>
						<div ref="helper" className="helper">{this.props.help}</div>
						</span>:
					null}
			</div>
		);
	}
}
