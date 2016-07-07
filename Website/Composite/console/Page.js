import React from 'react';
import Toolbar from './components/presentation/Toolbar.js';
import Fieldset from './components/presentation/Fieldset.js';
import update from 'react-addons-update';

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fieldsets: {}
		};
		this.props.fieldsets.forEach(fieldset => {
			this.state.fieldsets[fieldset.name] = {};
			fieldset.fields.forEach(field => {
				this.state.fieldsets[fieldset.name][field.name] = 'initialValue' in field ? field.initialValue : '';
				field.changeValue = this.getFieldUpdater(fieldset.name, field.name);
			});
		});
  }

	getFieldUpdater(fieldset, field) {
		var that = this;
		return function (newValue) {
			let change = { fieldsets: {} };
			change.fieldsets[fieldset] = {};
			change.fieldsets[fieldset][field] = { $set: newValue };
			let newState = update(that.state, change);
			that.setState(newState);
		}
	}

	getState() {
		return this.state;
	}

	render() {
		let fieldSets = this.props.fieldsets.map(
			(fieldset, index) => <Fieldset key={index} {...fieldset} values={this.state.fieldsets[fieldset.name]}/>
		);
		return (
			<div className="page">
				<Toolbar type="document" buttons={this.props.buttons} getState={this.getState.bind(this)}/>
				<div className="scrollbox">
					{fieldSets}
				</div>
			</div>
		);
	}
}
