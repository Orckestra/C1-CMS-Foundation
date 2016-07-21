import expect from '../../../helpers/expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormPage from '../../../../../Composite/console/components/presentation/FormPage';
import Fieldset from '../../../../../Composite/console/components/presentation/Fieldset';
import Toolbar from '../../../../../Composite/console/components/presentation/Toolbar';

describe('FormPage', () => {
	let renderer, props;
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
			fields: {
				onefield: {},
				twofield: { defaultValue: 'a default' },
				threefield: { defaultValue: 'overwritten' }
			},
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
		renderer.render(<FormPage {...props}/>);
		return expect(
			renderer, 'to have rendered',
			<div className="page">
				<Toolbar type="document" buttons={props.buttons} actions={props.actions}/>
				<div className="scrollbox">
					<Fieldset
						fields={{
							onefield: { updateValue: props.actions.updateValue },
							twofield: { value: 'a default', updateValue: props.actions.updateValue }
						}}/>
					<Fieldset
						fields={{ threefield: { value: 'different', updateValue: props.actions.updateValue } }}/>
				</div>
			</div>
		)
	});
});
