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
`;

Input.defaultProps = {
	value: ''
};

export default Input;
