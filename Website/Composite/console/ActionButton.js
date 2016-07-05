import React, { PropTypes } from 'react';

const ActionButton = ({ label, action, getState }) => (
	<button onClick={() => action(getState())}>{label}</button>
);

ActionButton.propTypes = {
	label: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
	getState: PropTypes.func.isRequired
};

export default ActionButton;
