import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';

const ActionButton = ({ label, action, icon, disabled, style }) => (
	<button onClick={() => action()} disabled={disabled} className={style}>
		{icon ? <Icon id={icon}/> : null}
		{label ? <span>{label}</span> : null }
	</button>
);


ActionButton.propTypes = {
	label: PropTypes.string,
	style: PropTypes.string,
	action: PropTypes.func.isRequired,
	icon: PropTypes.string,
	disabled: PropTypes.bool
};

export default ActionButton;
