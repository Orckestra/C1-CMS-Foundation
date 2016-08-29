import React, { PropTypes } from 'react';
import Icon from 'console/components/presentation/Icon.js';

const ActionButton = ({ label, action, icon, disabled }) => (
	<button onClick={() => action()} disabled={disabled}>
		{icon ? <Icon id={icon}/> : null}
		<span>{label}</span>
	</button>
);


ActionButton.propTypes = {
	label: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
	icon: PropTypes.string
};

export default ActionButton;
