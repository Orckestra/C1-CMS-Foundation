// Shows page if given name and type, else shows nothing.
import React, { PropTypes } from 'react';

const TabPage = ({name, Type}) => {
	if (!name ||!Type) {
		return <div/>;
	} else {
		return (<Type name={name}/>);
	}
};

TabPage.propTypes = {
	name: PropTypes.string,
	Type: PropTypes.func
};

export default TabPage;
