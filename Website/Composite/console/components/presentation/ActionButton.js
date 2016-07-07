import React, { PropTypes } from 'react';
import Icon from './Icon';

const ActionButton = ({ label, action, getState, icon }) => (
	<button onClick={() => action(getState())}>
		{icon ? <Icon {...icon}/> : null}
		<span>{label}</span>
	</button>
);


ActionButton.propTypes = {
	label: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
	getState: PropTypes.func.isRequired
};

export default ActionButton;
