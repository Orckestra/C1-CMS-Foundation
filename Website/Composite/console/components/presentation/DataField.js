import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DataFieldWrapper from 'console/components/presentation/DataFieldWrapper.js';
import DataFieldLabel from 'console/components/presentation/DataFieldLabel.js';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import Select from 'console/components/presentation/Select.js';
import Input from 'console/components/presentation/Input.js';
import TextArea from 'console/components/presentation/TextArea.js';
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

const Error = styled.span`
	color: red;
	font-size: 12px;
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
	case 'textarea':
		inputElement = <TextArea
			{...props}
			withHelp={props.help ? true : false} />;
		break;
	default:
		inputElement = <Input
			{...props}
			onContextMenu={event => {
				event.stopPropagation(); // to ensure default context menu is shown here
			}}
			withHelp={props.help ? true : false}
		/>;
	}

	return (
		<DataFieldWrapper>
			{
				// props.headline ?
				//	<Headline>{props.headline}</Headline> :
				//	null
			}
			
			{props.label ?
				<DataFieldLabel htmlFor={props.name}>{props.label}</DataFieldLabel> :
				null}
			{inputElement}
			{props.help ? <HelpIcon text={props.help} /> : null}
			{props.error ? <Error>{props.error}</Error> : null}
		</DataFieldWrapper>
	);
};

DataField.propTypes = {
	type: PropTypes.string,
	options: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
	updateValue: PropTypes.func,
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
