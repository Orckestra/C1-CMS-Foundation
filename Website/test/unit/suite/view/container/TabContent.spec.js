import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabContent from 'console/components/container/TabContent.js';
import FormTab from 'console/components/presentation/FormTab.js';
import { UPDATE_VALUE } from 'console/state/reducers/dataFields.js';

describe('TabContent', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			pages: {
				currentPage: 'test',
				tabs: {
					'test': 'test/tab'
				}
			},
			tabDefs: {
				'test/tab': {
					name: 'test/tab',
					fieldsets: [
						'test/tab/oneset',
						'test/tab/twoset',
						'test/tab/fourset'
					]
				}
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
			},
			values: {
				'test/twoset/threefield': 'different'
			}
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {};
	});

	it('renders a FormTab with props and page name to show', () => {
		renderer.render(<TabContent store={store} {...props}/>);
		return expect(renderer,
			'to have exactly rendered',
			<FormTab
				name='test/tab'
				tabDef={state.tabDefs['test/tab']}
				fieldsetDefs={state.fieldsetDefs}
				dataFieldDefs={state.dataFieldDefs}
				values={state.values}
				actions={{
					updateValue: expect.it('to be a function')
						.and('when called with', ['pagename', 'fieldname'], 'to be a function')
						.and('when called with', ['pagename', 'fieldname'], 'when called with', ['value'], 'to be undefined') // Result is call to store.dispatch
				}}
				store={{}}/>)
			.then(() => expect(store.dispatch, 'to have calls satisfying', [
				{ args: [{ type: UPDATE_VALUE, pageName: 'pagename', fieldName: 'fieldname', newValue: 'value' }]}
			]));
	});
});
