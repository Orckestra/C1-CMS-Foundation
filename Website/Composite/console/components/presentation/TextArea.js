import styled from 'styled-components';
import colors from 'console/components/colors.js';

const Textarea = styled.textarea`
	box-sizing: border-box;
	vertical-align: middle;
	display: block;
	border: 1px solid ${colors.fieldBorderColor};
	border-radius: 4px;
	padding: 5px 7px;
	margin: 2px 0 7px 0;
	background-color: #fff;
	height: 90px;
	overflow: hidden;
	width: ${props => !props.withHelp ? '100%' : 'calc(100% - 20px)'};


	&:focus {
		border-color: ${colors.fieldFocusColor};
	}
`;

Textarea.defaultProps = {
	value: ''
};

export default Textarea;
