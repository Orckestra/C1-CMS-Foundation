import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';

const typeClassName = {
	document: ' document-toolbar'
};

const Toolbar = ({ type, items, canSave }) => (
	<div className={'toolbar' + (typeClassName[type] || '')}>
		{Object.keys(items).map(name => {
			let button = Object.assign({}, items[name]);
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
	items: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
