import React, { PropTypes } from 'react';
import ActionButton from './ActionButton.js';

const typeClassName = {
	document: " document-toolbar"
}

const Toolbar = ({ type, buttons, getState }) => (
	<div className={"toolbar" + (typeClassName[type] || '')}>
		{buttons.map(
			(button, index) => <ActionButton key={index} {...button} getState={getState}/>
		)}
	</div>
);

Toolbar.propTypes = {
	type: PropTypes.string,
	buttons: PropTypes.array.isRequired,
	getState: PropTypes.func.isRequired
};

export default Toolbar;
