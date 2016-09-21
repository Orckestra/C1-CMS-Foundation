import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormTab from 'console/components/presentation/FormTab.js';
import Fieldset from 'console/components/presentation/Fieldset.js';

describe('FormTab', () => {
	let renderer, props, state, pageActions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tabDef: {
				fieldsets: [
					'test/oneset',
					'test/twoset',
					'test/fourset'
				]
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
		renderer.render(<FormTab name='test' {...props} {...state}/>);
	});

	it('renders a form page with a toolbar and field sets', () => expect(
		renderer, 'to have exactly rendered',
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
	));

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
