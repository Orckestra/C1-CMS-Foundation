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
					'test/save',
					'test/onebutton',
					'test/twobutton'
				]
			},
			buttonDefs: {
				'test/onebutton': { label: 'One', action: 'oneaction' },
				'test/twobutton': { label: 'Two', action: 'twoaction' },
				'test/save': { label: 'Save', action: 'save' },
				'do-not-render-button': { label: 'Must not be shown' }
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
			fireAction: () => {},
			update: () => {},
			save: () => {}
		};
		state = {
			actions: {
				save: sinon.spy(() => pageActions.save).named('save'),
				fireAction: sinon.spy(() => pageActions.fireAction).named('fireAction'),
				updateValue: sinon.spy(() => pageActions.update).named('threebutton')
			},
			dirtyPages: [],
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
				buttons={{}}/>
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
		'queried for', <Toolbar type='document' canSave={false} buttons={{}}/>,
		'to have props exhaustively satisfying', {
			type: 'document',
			canSave: false,
			buttons: {
				'test/save': { label: 'Save', action: pageActions.save, saveButton: true },
				'test/onebutton': { label: 'One', action: pageActions.fireAction },
				'test/twobutton': { label: 'Two', action: pageActions.fireAction }
			}
		}
	));

	it('passes named actions to the toolbar', () => Promise.all([
		expect(renderer,
			'queried for', <Toolbar type='document' canSave={false} buttons={{}}/>,
		'to have props satisfying', {
			type: 'document',
			buttons: {
				'test/onebutton': { action: expect.it('to be', pageActions.fireAction) },
				'test/twobutton': { action: expect.it('to be', pageActions.fireAction) }
			}
		}),
		expect(state.actions.save, 'to have a call satisfying', { args: ['test'] }),
		expect(state.actions.fireAction, 'to have calls exhaustively satisfying', [
			{ args: ['oneaction', 'test'] },
			{ args: ['twoaction', 'test'] },
		])
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
			{args: ['test', 'test/oneset/onefield']},
			{args: ['test', 'test/oneset/twofield']},
			{args: ['test', 'test/twoset/threefield']}
		])
	]));
});
