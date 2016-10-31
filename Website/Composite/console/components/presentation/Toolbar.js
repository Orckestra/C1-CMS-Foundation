import React, { PropTypes } from 'react';
import ActionButton from 'console/components/presentation/ActionButton.js';
import CheckboxGroup from 'console/components/presentation/CheckboxGroup.js';
import Select from 'react-select';

const Toolbar = props => (
	<div className={'toolbar' + (props.style ? ' ' + props.style : '')}>
		{props.items.map(item => {
			switch (item.get('type')) {
			case 'checkboxGroup':
				return <CheckboxGroup key={item.get('name')} {...item.toJS()}/>;
			case 'select':
				item = item.toJS();
				item.options && item.options.forEach(option => {
					option.label = option.label || option.value;
				});
				return <Select key={item.name} clearable={false} multi={false} simpleValue={true} {...item}/>;
			case 'button':
			default:
				if (!((item.get('label') || item.get('icon')) && item.get('action'))) return null;
				return <ActionButton
					key={item.get('name')}
					{...item.toJS()}/>;
			}
		}).filter(item => !!item)}
	</div>
);

Toolbar.propTypes = {
	style: PropTypes.string,
	items: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
