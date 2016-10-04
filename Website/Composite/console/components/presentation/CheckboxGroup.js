import React, { PropTypes } from 'react';

const CheckboxGroup = props => {
	let getBoxChanger = name => () => {
		let value = [].concat(props.value);
		let index = props.value.indexOf(name);
		if (index === -1) {
			value.push(name);
		} else {
			value.splice(index, 1);
		}
		props.onChange(value);
	};
	return (
		<div className='checkboxGroup'>
			{props.options.reduce((elements, cbProps) => {
				let value = (props.value.indexOf(cbProps.name) !== -1) || false;
				elements.push(<input
					key={cbProps.name}
					id={cbProps.name}
					type='checkbox'
					value={value}
					checked={value}
					onChange={getBoxChanger(cbProps.name)}
					/>);
				elements.push(<label
					key={cbProps.name + 'Key'}
					htmlFor={cbProps.name}>{cbProps.label}</label>);
				return elements;
			}, [])}
		</div>
	);
};

CheckboxGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	value: PropTypes.array.isRequired
};

export default CheckboxGroup;
