import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormPage from '../../../../../Composite/console/components/presentation/FormPage';
import Fieldset from '../../../../../Composite/console/components/presentation/Fieldset';
import Toolbar from '../../../../../Composite/console/components/presentation/Toolbar';

describe('FormPage', () => {
	let renderer, props, state;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			buttons: {
				onebutton: { label: 'One' },
				twobutton: { label: 'Two' }
			},
			fieldsets: {
				oneset: {
					label: 'First set',
					fields: [ 'onefield', 'twofield' ]
				},
				twoset: {
					label: 'Second set',
					name: 'twoset',
					fields: [ 'threefield' ]
				}
			},
			dataFields: {
				onefield: {},
				twofield: { defaultValue: 'a default' },
				threefield: { defaultValue: 'overwritten' }
			}
		};
		state = {
			actions: {
				onebutton: () => {},
				twobutton: () => {},
				updateValue: () => {}
			},
			values: {
				threefield: 'different'
			}
		};
	});

	it('renders a form page with a toolbar and field sets', () => {
		renderer.render(<FormPage {...props} {...state}/>);
		return expect(
			renderer, 'to have rendered',
			<div className="page">
				<Toolbar type="document" buttons={props.buttons} actions={state.actions}/>
				<div className="scrollbox">
					<Fieldset
						fields={{
							onefield: { updateValue: state.actions.updateValue },
							twofield: { value: 'a default', updateValue: state.actions.updateValue }
						}}/>
					<Fieldset
						fields={{ threefield: { value: 'different', updateValue: state.actions.updateValue } }}/>
				</div>
			</div>
		);
	});
});
