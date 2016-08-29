import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormPage from 'console/components/presentation/FormPage.js';
import Fieldset from 'console/components/presentation/Fieldset.js';
import Toolbar from 'console/components/presentation/Toolbar.js';

describe('FormPage', () => {
	let renderer, props, state, pageActions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			pageDef: {
				fieldsets: [
					'test/oneset',
					'test/twoset',
					'test/fourset'
				],
				buttons: [
					'test/onebutton',
					'test/twobutton'
				]
			},
			buttonDefs: {
				'test/onebutton': { label: 'One' },
				'test/twobutton': { label: 'Two' },
				'do-not-render-button': {label: 'Must not be shown'}
			},
			fieldsetDefs: {
				'test/oneset': {
					label: 'First set',
					fields: [ 'test/oneset/onefield', 'test/oneset/twofield' ]
				},
				'test/twoset': {
					label: 'Second set',
					fields: [ 'test/twoset/threefield' ]
				},
				'no-show-set': {
					label: 'Don\'t show me',
					fields: []
				}
			},
			dataFieldDefs: {
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
				'do-not-render-button': () => () => {},
				updateValue: sinon.spy(() => pageActions.update)
			},
			hasDirtyFields: false,
			values: {
				'test/twoset/threefield': 'different'
			}
		};
		renderer.render(<FormPage name='test' {...props} {...state}/>);
	});

	it('renders a form page with a toolbar and field sets', () => expect(
		renderer, 'to have exactly rendered',
		<div className='page'>
			<Toolbar
				canSave={false}
				type='document'
				buttons={{}}
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
	)
	.and(
		'queried for', <Toolbar type='document' canSave={false} buttons={{}} actions={{}}/>,
		'to have props exhaustively satisfying', {
			type: 'document',
			canSave: false,
			buttons: {
				'test/onebutton': { label: 'One' },
				'test/twobutton': { label: 'Two' }
			},
			actions: {
				'test/onebutton': pageActions.onebutton,
				'test/twobutton': pageActions.twobutton
			}
		}
	));

	it('passes named actions to the toolbar', () => Promise.all([
		expect(renderer,
			'queried for', <Toolbar type='document' canSave={false} actions={{}} buttons={{}}/>,
		'to have props satisfying', {
			type: 'document',
			buttons: expect.it('to be an', 'object'),
			actions: {
				'test/onebutton': expect.it('to be', pageActions.onebutton),
				'test/twobutton': expect.it('to be', pageActions.twobutton)
			}
		}),
		expect(state.actions.onebutton, 'was called with', 'test'),
		expect(state.actions.twobutton, 'was called with', 'test')
	]));

	it('passes a nametagged update function to fields', () => Promise.all([
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
	]));
});
