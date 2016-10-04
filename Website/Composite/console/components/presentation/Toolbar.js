import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';
import CheckboxGroup from 'console/components/presentation/CheckboxGroup.js';
import Select from 'react-select';

const Toolbar = ({ style, items, canSave }) => (
	<div className={'toolbar' + (style ? ' ' + style : '')}>
		{items.map(item => {
			switch (item.type) {
			case 'checkboxGroup':
				return <CheckboxGroup key={item.name} {...item}/>;
			case 'select':
				item.options.forEach(option => {
					option.label = option.label || option.value;
				});
				return <Select key={item.name} clearable={false} multi={false} simpleValue={true} {...item}/>;
			case 'button':
			default:
				if (!((item.label || item.icon) && item.action)) return null;
				item.disabled = item.saveButton && !canSave;
				delete item.saveButton;
				return <ActionButton
					key={item.name}
					{...item}/>;
			}
		}).filter(item => !!item)}
	</div>
);

Toolbar.propTypes = {
	style: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
