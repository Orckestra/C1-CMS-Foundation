// Shows page if given name and type, else shows nothing.
import React, { PropTypes } from 'react';

const DockPanel = props => {
	if (!props.pageDef || !props.pageDef.get('type')) {
		return <div/>;
	} else {
		let Page = props.pageTypes[props.pageDef.get('type')];
		if (!Page) {
			throw new Error('Could not find page type "' + props.pageDef.get('type') + '" for page "' + props.pageDef.get('name') + '"');
		}
		let otherProps = Object.assign({}, props);
		delete otherProps.pageTypes;
		return (<Page {...otherProps}/>);
	}
};

DockPanel.propTypes = {
	pageDef: PropTypes.object,
	pageTypes: PropTypes.objectOf(PropTypes.func).isRequired
};

export default DockPanel;
