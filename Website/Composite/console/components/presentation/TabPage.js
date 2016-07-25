// Shows page if given name and type, else shows nothing.
import React, { PropTypes } from 'react';

const TabPage = props => {
	let pageDef = props.pageDefs[props.name];
	if (!props.name || !pageDef) {
		return <div/>;
	} else {
		let Type = props.pageDefs[props.name].type;
		let otherProps = Object.assign({}, props);
		delete otherProps.pageDefs;
		return (<Type {...otherProps} pageDef={pageDef}/>);
	}
};

TabPage.propTypes = {
	name: PropTypes.string,
	pageDefs: PropTypes.object.isRequired
};

export default TabPage;
