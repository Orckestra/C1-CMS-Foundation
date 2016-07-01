import React from 'react';
import ActionButton from './ActionButton.js';

export default class Toolbar extends React.Component {
	render() {
		let buttons = this.props.buttons.map(
			(button, index) => <ActionButton key={index} {...button} getState={this.props.getState}/>
		);
		// For each button in state, create matching ActionButton
		return (
			<div className="toolbar">
				{buttons}
			</div>
		);
	}
}
