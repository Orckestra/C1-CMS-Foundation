import React from 'react';
import Icon from './Icon';
import HelpIcon from './HelpIcon';

const DataField = props => {
	let type = props.type;
	if (!type) {
		type = 'text';
	}

	let input;
	function handleChange() {
		props.updateValue(props.name, input.value);
	}

	return (
		<div className="datafield">
			{props.label ?
				<label htmlFor={props.name}>{props.label}</label> :
				null}
			<input
				type={type}
				id={props.name}
				value={props.value}
				ref={comp => { input = comp; }}
				onChange={handleChange}/>
			{props.help ? <HelpIcon text={props.help} /> : null}
		</div>
	);
}

export default DataField;
