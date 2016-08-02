// Shows page if given name and type, else shows nothing.
import React, { PropTypes } from 'react';

const TabPage = props => {
	let pageDef = props.pageDefs[props.name];
	if (!props.name || !pageDef || !pageDef.type) {
		return <div/>;
	} else {
		let Page = props.pageTypes[pageDef.type];
		if (!Page) {
			throw new Error('Could not find page type "' + pageDef.type + '" for page "' + props.name + '"');
		}
		let otherProps = Object.assign({}, props);
		delete otherProps.pageDefs;
		delete otherProps.pageTypes;
		return (<Page {...otherProps} pageDef={pageDef}/>);
	}
};

TabPage.propTypes = {
	name: PropTypes.string,
	pageDefs: PropTypes.object.isRequired,
	pageTypes: PropTypes.objectOf(PropTypes.func).isRequired
};

export default TabPage;
