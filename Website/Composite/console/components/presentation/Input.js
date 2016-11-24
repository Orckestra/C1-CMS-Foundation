import styled from 'styled-components';
import colors from 'console/components/colors.js';

const Input = styled.input`
	vertical-align: middle;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 5px 7px;
	margin: 2px 1px 7px 2px;
	background-color: #fff;
	width: calc(100% - 50px);
	height: 20px;
	overflow: hidden;

	&:focus {
		border-color: ${colors.fieldFocusColor};
	}

	&[type="checkbox"]{
		position: relative;
		border-radius: 4px;
		width: 18px;
		height: 18px;
		appearance: none;
	}

	&[type="checkbox"]:checked {
		background-color: ${colors.fieldFocusColor};
	}
	&[type="checkbox"]:checked::after {
		content: "\u2713";
		font-size: 14px;
		font-weight: bold;
		color: white;
		position: absolute;
		top: -2px;
		left: 2px;
	}
`;

Input.defaultProps = {
	value: ''
};

export default Input;
