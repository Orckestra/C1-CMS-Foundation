import styled from 'styled-components';
import colors from 'console/components/colors.js';

const Input = styled.input`
	vertical-align: middle;
	box-sizing: border-box;
	display: block;
	border: 1px solid ${colors.fieldBorderColor};
	border-radius: 4px;
	padding: 5px 7px;
	margin: 2px 1px 7px 2px;
	background-color: #fff;
	height: 30px;
	overflow: hidden;
	width: ${props => !props.withHelp ? '100%' : 'calc(100% - 20px)'};

	&:focus {
		border-color: ${colors.fieldFocusColor};
	}
`;

Input.defaultProps = {
	value: ''
};

export default Input;
