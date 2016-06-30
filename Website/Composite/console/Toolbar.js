import React from 'react';
import ActionButton from './ActionButton.js';

export default class Toolbar extends React.Component {
	render() {
		let buttons = [];
		// For each button in state, create matching ActionButton
		buttons.push(<ActionButton key={1}/>);
		return (
			<div className="toolbar">
				{buttons}
			</div>
		);
	}
}
