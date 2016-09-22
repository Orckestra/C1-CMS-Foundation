import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TabContent from 'console/components/container/TabContent.js';
import FormTab from 'console/components/presentation/FormTab.js';
import { UPDATE_VALUE } from 'console/state/reducers/dataFields.js';

describe('TabContent', () => {
	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			pages: {
				currentPage: 'test',
				tabs: {
					'test': 'test/tab'
				}
			},
			pageDefs: {
				'test': {
					tabs: ['test/tab']
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
				'test/tab/oneset': {
					label: 'First set',
					fields: [ 'test/tab/oneset/onefield', 'test/tab/oneset/twofield' ]
				},
				'test/tab/twoset': {
					label: 'Second set',
					fields: [ 'test/tab/twoset/threefield' ]
				},
				'no-show-set': {
					label: 'Don\'t show me',
					fields: []
				}
			},
			dataFieldDefs: {
				'test/tab/oneset/onefield': {},
				'test/tab/oneset/twofield': { defaultValue: 'a default' },
				'test/tab/twoset/threefield': { defaultValue: 'overwritten' }
			},
			dataFields: {
				dirtyPages: {
					'test': ['test/tab/twoset/threefield']
				},
				'test/tab/twoset/threefield': 'different'
			}
		};
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
	});

	it('renders a FormTab with props and page name to show', () => {
		renderer.render(<TabContent store={store}/>);
		return expect(renderer,
			'to have exactly rendered',
			<FormTab
				name='test/tab'
				pageName='test'
				tabDef={state.tabDefs['test/tab']}
				fieldsetDefs={state.fieldsetDefs}
				dataFieldDefs={state.dataFieldDefs}
				values={{ 'test/tab/twoset/threefield': 'different' }}
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


	describe('missing fields in state', () => {
		it('provides a default tabName if none selected', () => {
			delete state.pages.tabs.test;
			renderer.render(<TabContent store={store}/>);
			return expect(renderer,
				'to have rendered',
				<FormTab
					name='test/tab'
					pageName='test'
					tabDef={state.tabDefs['test/tab']}
					fieldsetDefs={{}}
					dataFieldDefs={{}}
					values={{}}
					actions={{}}
					store={{}}/>);
		});

		it('provides an empty tabDef if none found', () => {
			delete state.tabDefs['test/tab'];
			renderer.render(<TabContent store={store}/>);
			return expect(renderer,
				'to have rendered',
				<FormTab
					name='test/tab'
					pageName='test'
					tabDef={{}}
					fieldsetDefs={{}}
					dataFieldDefs={{}}
					values={{}}
					actions={{}}
					store={{}}/>);
		});
	});

});
