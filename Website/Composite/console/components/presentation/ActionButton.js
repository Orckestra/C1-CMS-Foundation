import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';
import styled from 'styled-components';
import colors from 'console/components/colors.js';

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
	min-width: 100px;
	box-shadow: 0 2px 2px -2px ${colors.buttonDropShadowColor};
	text-align: left;

	&:hover {
		color: ${colors.buttonHighlightColor};
		border-color: ${colors.buttonHighlightColor};
	}

	&:disabled {
		opacity: 0.4;
	}

	&.main {
		border: 1px solid ${colors.buttonHighlightColor};
		background-image: linear-gradient(to bottom, ${colors.buttonHighlightColor} 0%, ${colors.buttonShadingColor} 100%);
		color: white;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	&.dialog {
		color: ${colors.buttonHighlightColor};
		border-color: ${colors.buttonHighlightColor};
	}
`;

const Label = styled.span`
	display: inline-block;
	text-align: center;
	width: 100%;

	svg + & {
		padding-left: 10px;
		text-align: left;
	}
`;

const ActionButton = ({ label, action, icon, disabled, style }) => (
	<Button onClick={() => action()} disabled={disabled} className={style}>
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
