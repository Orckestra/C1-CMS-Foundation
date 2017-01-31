import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Checkbox from 'console/components/presentation/Checkbox.js';

const Div = styled.div`
	display: inline-block;
`;

const Label = styled.label`
	display: inline-block;
	padding-left: 5px;
	padding-right: 15px;
`;

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
		<Div className='checkboxGroup'>
			{props.options.reduce((elements, cbProps) => {
				let value = (props.value.indexOf(cbProps.value) !== -1) || false;
				elements.push(<Checkbox
					key={cbProps.name}
					id={cbProps.name}
					type='checkbox'
					value={value}
					checked={value}
					onChange={getBoxChanger(cbProps.value)}
					/>);
				elements.push(<Label
					key={cbProps.name + 'Key'}
					htmlFor={cbProps.name}>{cbProps.label}</Label>);
				return elements;
			}, [])}
		</Div>
	);
};

CheckboxGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	value: PropTypes.array.isRequired
};

export default CheckboxGroup;
