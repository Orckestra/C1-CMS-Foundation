import React from 'react';
import Toolbar from './components/presentation/Toolbar.js';
import Fieldset from './components/presentation/Fieldset.js';
import update from 'react-addons-update';

export default class Page extends React.Component {
	render() {
		return (
			<div className="page">
				<Toolbar type="document" buttons={this.props.buttons}/>
				<div className="scrollbox">
					{Object.values(this.props.fieldsets).map(fieldset => <Fieldset
						{...fieldset}
						key={fieldset.name}/>)}
				</div>
			</div>
		);
	}
}
