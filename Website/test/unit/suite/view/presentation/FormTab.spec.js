import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormTab from 'console/components/presentation/FormTab.js';
import Fieldset from 'console/components/presentation/Fieldset.js';
import Immutable from 'immutable';
import styled from 'styled-components';

const StyledDiv = styled.div``;

describe('FormTab', () => {
	let renderer, props, state, pageActions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			pageName: 'test',
			fieldsets: Immutable.fromJS([
				{
					label: 'First set',
					name: 'test/oneset',
					fields: [
						{ name: 'test/oneset/onefield'},
						{ name: 'test/oneset/twofield', defaultValue: 'a default' }
					]
				},
				{
					label: 'Second set',
					name: 'test/twoset',
					fields: [ { name: 'test/twoset/threefield', defaultValue: 'overwritten' } ]
				}
			])
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
				updateValue: sinon.spy(() => pageActions.update).named('updateValue')
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
		<StyledDiv>
			<Fieldset
				name='test/oneset'
				label='First set'
				fields={[
					{ name: 'test/oneset/onefield'},
					{ name: 'test/oneset/twofield', defaultValue: 'a default' }
				]}/>
			<Fieldset
				name='test/twoset'
				label='Second set'
				fields={[ { name: 'test/twoset/threefield', defaultValue: 'overwritten' } ]}/>
		</StyledDiv>
	));

	it('passes a nametagged update function to fields', () => Promise.all([
		// expect({ bar: Immutable.List([Immutable.Map({foo: 1})])}, 'to satisfy', {bar: expect.it('to have items satisfying', 'to have property', 'foo', 1)})
		expect(renderer,
			'queried for', <Fieldset label='First set'/>,
			'to have props satisfying', {
				fields: expect.it('to have items satisfying',
					'to have property',
					'updateValue'//, pageActions.update
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
