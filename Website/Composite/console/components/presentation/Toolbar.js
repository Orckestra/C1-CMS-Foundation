import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';

const typeClassName = {
	document: ' document-toolbar'
};

const Toolbar = ({ type, buttons, canSave }) => (
	<div className={'toolbar' + (typeClassName[type] || '')}>
		{Object.keys(buttons).map(name => {
			let button = Object.assign({}, buttons[name]);
			if (!(button.label && button.action)) return null;
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
	buttons: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
