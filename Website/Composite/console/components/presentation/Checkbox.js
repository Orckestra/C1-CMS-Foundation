import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';

const Wrapper = styled.div`
	display: inline-block;
	position: relative;
	vertical-align: middle;
	margin: 2px 1px 7px 2px;
	width: 18px;
	height: 18px;
`;

const VisualCheckbox = styled.label`
	display: inline-block;
	position: absolute;
	vertical-align: middle;
	border: 1px solid #ccc;
	border-radius: 5px;
	border-radius: 4px;
	width: 18px;
	height: 18px;
	padding: 0;
	margin: 0;
	background-color: #fff;

	${props => props.checked ? css`
		background-color: ${colors.fieldFocusColor};
		&::after {
			content: "\u2713";
			font-size: 14px;
			font-weight: bold;
			color: white;
			position: absolute;
			top: -1px;
			left: 3px;
		}
	` : ''}

	input:focus + & {
		border-color: ${colors.fieldFocusColor};
	}
`;

const HiddenCheckbox = styled.input`
	position: absolute;
`;

const Checkbox = props => (
	<Wrapper className={props.className}>
		<HiddenCheckbox type='checkbox' {...props}/>
		<VisualCheckbox checked={props.checked} htmlFor={props.id}/>
	</Wrapper>
);

Checkbox.propTypes = {
	checked: PropTypes.bool,
	id: PropTypes.string.isRequired
};

export default Checkbox;
