import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Input from 'console/components/presentation/Input.js';

const Checkbox = styled(Input)`
	position: relative;
	border-radius: 4px;
	width: 18px;
	height: 18px;
	appearance: none;
	padding: 0;

	&:checked {
		background-color: ${colors.fieldFocusColor};
	}
	&:checked::after {
		content: "\u2713";
		font-size: 24px;
		font-weight: bold;
		color: white;
		position: absolute;
		top: -2px;
		left: 2px;
	}
`;

Checkbox.defaultProps = { type: 'checkbox' };

export default Checkbox;
