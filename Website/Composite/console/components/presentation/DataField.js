import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import Select from 'console/components/presentation/Select.js';
import Input from 'console/components/presentation/Input.js';
import Checkbox from 'console/components/presentation/Checkbox.js';
import styled from 'styled-components';
import colors from 'console/components/colors.js';

const Headline = styled.h4`
	display: block;
	margin: 0;
	font-weight: normal;
	padding: 7px 0 5px 5px;
	color: ${colors.fieldLabelColor};
`;

const Label = styled.label`
	display: inline-block;
	padding-left: 10px;
	padding-right: 0;
	width: calc(100% - 56px);
`;

const DataFieldWrapper = styled.div`
	position: relative;
`;

const DataField = props => {
	let handleChange, defaultOption, inputElement, options;
	switch (props.type) {
	case 'checkbox':
		handleChange = function (event) {
			props.updateValue(event.target.checked);
		};
		inputElement = <Checkbox
			id={props.name}
			value={props.value || false}
			checked={props.value || false}
			onChange={handleChange}/>;
		break;
	case 'select':
		handleChange = function (option) {
			props.updateValue(option.value);
		};
		options = props.options.toJS();
		defaultOption = options.filter(option => option.value === props.value)[0];
		inputElement = <Select
				id={props.name}
				value={defaultOption}
				clearable={false}
				multi={false}
				options={options}
				onChange={handleChange}
				placeholder={props.placeholder}>
			</Select>;
		break;
	default:
		handleChange = function (event) {
			props.updateValue(event.target.value);
		};
		inputElement = <Input
			type={props.type}
			id={props.name}
			value={props.value}
			onContextMenu={event => {
				event.stopPropagation(); // to ensure default context menu is shown here
			}}
			onChange={handleChange}/>;
	}

	return (
		<DataFieldWrapper>
			{props.headline ?
				<Headline>{props.headline}</Headline> :
				null}
			{inputElement}
			{props.label ?
				<Label htmlFor={props.name}>{props.label}</Label> :
				null}
			{props.help ? <HelpIcon text={props.help} /> : null}
		</DataFieldWrapper>
	);
};

DataField.propTypes = {
	type: PropTypes.string,
	options: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
	updateValue: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	headline: PropTypes.string,
	label: PropTypes.string,
	help: PropTypes.string,
	value: PropTypes.any,
	placeholder: PropTypes.string
};
DataField.defaultProps = {
	type: 'text',
	placeholder: '(No selection)'
};
export default DataField;
