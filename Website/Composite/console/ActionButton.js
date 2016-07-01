import React from 'react';

export default class ActionButton extends React.Component {
	actionWrapper() {
		this.props.action(this.props.getState());
	}

	render() {
		return (
			<button onClick={this.actionWrapper.bind(this)}>{this.props.label}</button>
		);
	}
}
