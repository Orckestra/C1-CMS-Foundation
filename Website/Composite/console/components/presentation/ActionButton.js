import React, { PropTypes } from 'react';
import Icon from './Icon';

const ActionButton = ({ label, action, getState, icon }) => (
	<button onClick={() => action()}>
		{icon ? <Icon {...icon}/> : null}
		<span>{label}</span>
	</button>
);


ActionButton.propTypes = {
	label: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired
};

export default ActionButton;
