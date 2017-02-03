import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import ActionButton from 'console/components/presentation/ActionButton.js';
import CheckboxGroup from 'console/components/presentation/CheckboxGroup.js';
import Select from 'console/components/presentation/Select.js';

const ToolbarBox = styled.div`
	padding: 15px 10px 20px;
	height: 38px;
	border-bottom: 1px solid ${colors.borderColor};

	&.rightAligned {
	${''/* TODO: Needs better way to right-align toolbar items */}
		text-align: right;
	}
	&.rightAligned > * {
		text-align: left;
	}
	&.rightAligned > button,
	&.rightAligned > .Select {
		margin-left: 10px;
		margin-right: 0;
	}
	&.dark {
		background-color: ${colors.darkBackground};
	}

	& + & {
		padding-bottom: 15px;
	}
`;

const Toolbar = props => (
	<ToolbarBox className={'toolbar' + (props.style ? ' ' + props.style : '')}>
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
	</ToolbarBox>
);

Toolbar.propTypes = {
	style: PropTypes.string,
	items: PropTypes.object.isRequired,
	canSave: PropTypes.bool
};

export default Toolbar;
