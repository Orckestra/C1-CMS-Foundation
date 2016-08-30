import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';

const typeClassName = {
	document: ' document-toolbar'
};

const Toolbar = ({ type, actions, buttons, canSave }) => (
	<div className={'toolbar' + (typeClassName[type] || '')}>
		{Object.keys(buttons).map(name => {
			if (!(buttons[name] && actions[name])) return null;
			let button = Object.assign({}, buttons[name]);
			button.action = actions[name];
			button.disabled = button.saveButton && !canSave;
			delete button.saveButton;
			return <ActionButton
				key={name}
				{...button}/>;
		}).filter(button => !!button)}
	</div>
);

Toolbar.propTypes = {
	type: PropTypes.string,
	actions: PropTypes.object.isRequired,
	buttons: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
