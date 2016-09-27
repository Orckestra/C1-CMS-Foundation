import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';

const Toolbar = ({ style, items, canSave }) => (
	<div className={'toolbar' + (style ? ' ' + style : '')}>
		{Object.keys(items).map(name => {
			let button = Object.assign({}, items[name]);
			if (!((button.label || button.icon) && button.action)) return null;
			button.disabled = button.saveButton && !canSave;
			delete button.saveButton;
			return <ActionButton
				key={name}
				{...button}/>;
		}).filter(button => !!button)}
	</div>
);

Toolbar.propTypes = {
	style: PropTypes.string,
	items: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
