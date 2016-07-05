import React, { PropTypes } from 'react';
import ActionButton from './ActionButton.js';

const Toolbar = ({ buttons, getState }) => (
	<div className="toolbar">
		{buttons.map(
			(button, index) => <ActionButton key={index} {...button} getState={getState}/>
		)}
	</div>
);

Toolbar.propTypes = {
	buttons: PropTypes.array.isRequired,
	getState: PropTypes.func.isRequired
};

export default Toolbar;
