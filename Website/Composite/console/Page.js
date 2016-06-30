// Start out really basic, just a toolbar and a content block
import React from 'react';
import Toolbar from './Toolbar.js';
import Fieldset from './Fieldset.js';

export default class Page extends React.Component {
	render() {
		let fieldSets = [];
		// For each fieldset in state, render a fieldSet
		fieldSets.push(<Fieldset key={1}/>);
		return (
			<div className="page">
				<Toolbar/>
				{fieldSets}
			</div>
		);
	}
}
