import React, { PropTypes } from 'react';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import Select from 'react-select';

const DataField = props => {
	let input, handleChange, defaultOption, inputElement;
	switch (props.type) {
	case 'select':
		handleChange = function (option) {
			props.updateValue(option.value);
		};
		defaultOption = props.options.filter(option => option.value === props.value)[0];
		inputElement =
			<Select
				id={props.name}
				value={defaultOption}
				clearable={false}
				multi={false}
				isOpen={true}
				options={props.options}
				onChange={handleChange}
				placeholder={props.placeholder}>
			</Select>;
		break;
	default:
		handleChange = function () {
			props.updateValue(input.value);
		};
		inputElement = <input
			type={props.type}
			id={props.name}
			value={props.value}
			ref={comp => { input = comp; }}
			onChange={handleChange}/>;
	}

	return (
		<div className="datafield">
			{props.label ?
				<label htmlFor={props.name}>{props.label}</label> :
				null}
			{inputElement}
			{props.help ? <HelpIcon text={props.help} /> : null}
		</div>
	);
};

DataField.propTypes = {
	type: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	updateValue: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
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
