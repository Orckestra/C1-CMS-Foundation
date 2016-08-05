import React, { PropTypes } from 'react';
import HelpIcon from './HelpIcon.js';

const DataField = props => {
	let input;
	function handleChange() {
		props.updateValue(input.value);
	}

	return (
		<div className="datafield">
			{props.label ?
				<label htmlFor={props.name}>{props.label}</label> :
				null}
			<input
				type={props.type}
				id={props.name}
				value={props.value}
				ref={comp => { input = comp; }}
				onChange={handleChange}/>
			{props.help ? <HelpIcon text={props.help} /> : null}
		</div>
	);
};

DataField.propTypes = {
	type: PropTypes.string,
	updateValue: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	help: PropTypes.string,
	value: PropTypes.any
};
DataField.defaultProps = { type: 'text' };
export default DataField;
