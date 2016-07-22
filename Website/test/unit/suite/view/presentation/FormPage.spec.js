import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormPage from '../../../../../Composite/console/components/presentation/FormPage';
import Fieldset from '../../../../../Composite/console/components/presentation/Fieldset';
import Toolbar from '../../../../../Composite/console/components/presentation/Toolbar';

describe('FormPage', () => {
	let renderer, props, state, pageActions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			pages: {
				'test': {
					fieldsets: [
						'test/oneset',
						'test/twoset'
					],
					buttons: [
						'test/onebutton',
						'test/twobutton'
					]
				}
			},
			buttons: {
				'test/onebutton': { label: 'One' },
				'test/twobutton': { label: 'Two' }
			},
			fieldsets: {
				'test/oneset': {
					label: 'First set',
					fields: [ 'test/oneset/onefield', 'test/oneset/twofield' ]
				},
				'test/twoset': {
					label: 'Second set',
					fields: [ 'test/twoset/threefield' ]
				}
			},
			dataFields: {
				'test/oneset/onefield': {},
				'test/oneset/twofield': { defaultValue: 'a default' },
				'test/twoset/threefield': { defaultValue: 'overwritten' }
			}
		};
		pageActions = {
			onebutton: () => {},
			twobutton: () => {},
			update: () => {}
		};
		state = {
			actions: {
				onebutton: sinon.spy(() => pageActions.onebutton),
				twobutton: sinon.spy(() => pageActions.twobutton),
				updateValue: sinon.spy(() => pageActions.update)
			},
			values: {
				'test/twoset/threefield': 'different'
			}
		};
	});

	it('renders a form page with a toolbar and field sets', () => {
		renderer.render(<FormPage name='test' {...props} {...state}/>);
		return expect(
			renderer, 'to have rendered',
			<div className='page'>
				<Toolbar
					type='document'
					buttons={props.buttons}
					actions={{}}/>
				<div className='scrollbox'>
					<Fieldset
						label='First set'
						fields={{
							'test/oneset/onefield': {},
							'test/oneset/twofield': { value: 'a default' }
						}}/>
					<Fieldset
						label='Second set'
						fields={{ 'test/twoset/threefield': { value: 'different' } }}/>
				</div>
			</div>
		);
	});

	it('passes named actions to the toolbar', () => {
		renderer.render(<FormPage name='test' {...props} {...state}/>);
		return Promise.all([
			expect(renderer,
				'queried for', <Toolbar type='document' actions={{}} buttons={{}}/>,
			'to have props satisfying', {
				type: 'document',
				buttons: expect.it('to be', props.buttons),
				actions: {
					'test/onebutton': expect.it('to be', pageActions.onebutton),
					'test/twobutton': expect.it('to be', pageActions.twobutton)
				}
			}),
			expect(state.actions.onebutton, 'was called with', 'test'),
			expect(state.actions.twobutton, 'was called with', 'test')
		]);
	});

	it('passes a nametagged update function to fields', () => {
		renderer.render(<FormPage name='test' {...props} {...state}/>);
		return Promise.all([
			expect(renderer,
				'queried for', <Fieldset label='First set' fields={{}}/>,
				'to have props satisfying', {
					fields: expect.it('to have values satisfying',
						'to have property',
						'updateValue', pageActions.update
					)
				}
			),
			expect(state.actions.updateValue, 'to have calls satisfying', [
				{args: ['test/oneset/onefield']},
				{args: ['test/oneset/twofield']},
				{args: ['test/twoset/threefield']}
			])
		]);
	});
});
