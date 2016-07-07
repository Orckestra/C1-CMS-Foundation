import React from 'react';
import Icon from './Icon';

const DataField = props => {
	let type = props.type;
	if (!type) {
		type = 'text';
	}

	let input, helper;
	function handleChange() {
		props.changeValue(input.value);
	}

	function showHelper() {
		helper.style.visibility = 'visible';
		helper.style.opacity = 1;
	}

	function hideHelper() {
		setTimeout(() => {
			helper.style.visibility = '';
			helper.style.opacity = '';
		}, 2000);
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
			{props.help ?
				<span className="helperIcon"
					onClick={showHelper}
					onMouseOut={hideHelper}>
					<div ref={comp => { helper = comp; }} className="helper">{props.help}</div>
				</span> :
				null}
		</div>
	);
}

export default DataField;
