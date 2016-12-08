// Shows page if given name and type, else shows nothing.
import React, { PropTypes } from 'react';

const SwitchPanel = props => {
	if (!props.showType) {
		return <div/>;
	} else {
		let Page = props.panelTypes[props.showType];
		if (!Page) {
			throw new Error('Could not find panel type "' + props.showType + '"');
		}
		let otherProps = Object.assign({}, props);
		delete otherProps.showType;
		delete otherProps.panelTypes;
		return (<Page {...otherProps}/>);
	}
};

SwitchPanel.propTypes = {
	showType: PropTypes.string,
	panelTypes: PropTypes.objectOf(PropTypes.func).isRequired
};

export default SwitchPanel;
