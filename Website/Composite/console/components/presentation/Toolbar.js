import React, { PropTypes } from 'react';
import ActionButton from './ActionButton.js';

const typeClassName = {
	document: " document-toolbar"
}

const Toolbar = ({ type, buttons, getState }) => (
	<div className={"toolbar" + (typeClassName[type] || '')}>
		{Object.keys(buttons).map(
			name => <ActionButton key={name} {...buttons[name]}/>
		)}
	</div>
);

Toolbar.propTypes = {
	type: PropTypes.string,
	buttons: PropTypes.object.isRequired
};

export default Toolbar;
