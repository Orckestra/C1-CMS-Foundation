import React, { PropTypes } from 'react';
import { Button, ButtonIcon, ButtonLabel } from 'console/components/presentation/Button.js';

const ActionButton = ({ label, action, icon, disabled, style }) => (
	<Button onClick={() => action()} disabled={disabled} buttonStyle={style}>
		{icon ? <ButtonIcon id={icon}/> : null}
		{label ? <ButtonLabel>{label}</ButtonLabel> : null }
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
