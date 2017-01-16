import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';

const buttonStyleSheet = {
	main: css`
		border: 1px solid ${colors.buttonHighlightColor};
		background-image: linear-gradient(to bottom, ${colors.buttonHighlightColor} 0%, ${colors.buttonShadingColor} 100%);
		color: white;
		padding-top: 4px;
		padding-bottom: 4px;
	`,
	'join-right': css`
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		margin-right: 0px;
		&:hover {
			border-right-color: ${colors.borderColor};
		}
	`,
	'join-left': css`
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-left: -1px;
		&:hover {
			border-left-color: ${colors.borderColor};
		}
	`
};

function getStyles(props) {
	let buttonStyles = props.buttonStyle.split(' ');
	return buttonStyles.map(styleName => buttonStyleSheet[styleName]);
}

const Button = styled.button`
	text-transform: uppercase;
	border: 1px solid ${colors.borderColor};
	border-radius: 4px;
	background: white;
	color: ${colors.buttonTextColor};
	margin: 2px 10px 2px 0;
	padding: 6px 11px;
	line-height: 18px;
	height: 36px;
	box-shadow: 0 2px 2px -2px ${colors.buttonDropShadowColor};

	&:hover {
		color: ${colors.buttonHighlightColor};
		border-color: ${colors.buttonHighlightColor};
	}

	&:disabled {
		opacity: 0.4;
	}

	${getStyles}
`;
Button.defaultProps = { buttonStyle: '' };

const Label = styled.span`
svg + & {
	padding-left: 10px;
}
`;

const ActionButton = ({ label, action, icon, disabled, style }) => (
	<Button onClick={() => action()} disabled={disabled} buttonStyle={style}>
		{icon ? <Icon id={icon}/> : null}
		{label ? <Label>{label}</Label> : null }
	</Button>
);


ActionButton.propTypes = {
	label: PropTypes.string,
	style: PropTypes.string,
	action: PropTypes.func.isRequired,
	icon: PropTypes.string,
	disabled: PropTypes.bool
};

export default ActionButton;
