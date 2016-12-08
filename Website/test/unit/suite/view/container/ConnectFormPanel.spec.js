import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ConnectFormPanel from 'console/components/container/ConnectFormPanel.js';
import FormTab from 'console/components/presentation/FormTab.js';
import { UPDATE_VALUE } from 'console/state/reducers/dataFields.js';
import Immutable from 'immutable';

describe('ConnectFormPanel', () => {
	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'content',
				perspectives: {
					content: {
						currentPage: 'test',
						pages: {
							test: {
								currentTab: 'test/tab',
								tabs: {
									'test/tab': {}
								}
							}
						}
					}
				}
			},
			pageDefs: {
				'test': {
					name: 'test',
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
					name: 'test/tab/oneset',
					label: 'First set',
					fields: [ 'test/tab/oneset/onefield', 'test/tab/oneset/twofield' ]
				},
				'test/tab/twoset': {
					name: 'test/tab/twoset',
					label: 'Second set',
					fields: [ 'test/tab/twoset/threefield' ]
				},
				'no-show-set': {
					name: 'no-show-set',
					label: 'Don\'t show me',
					fields: []
				}
			},
			dataFieldDefs: {
				'test/tab/oneset/onefield': { name: 'test/tab/oneset/onefield' },
				'test/tab/oneset/twofield': { name: 'test/tab/oneset/twofield', defaultValue: 'a default' },
				'test/tab/twoset/threefield': { name: 'test/tab/twoset/threefield', defaultValue: 'overwritten' }
			},
			dataFields: {
				committedPages: {
					'test': {
						'test/tab/twoset/threefield': 'same'
					}
				},
				'test': {
					'test/tab/twoset/threefield': 'different'
				}
			}
		});
		store = {
			state: state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => store.state).named('getState')
		};
	});

	it('renders a FormTab with props and page name to show', () => {
		renderer.render(<ConnectFormPanel store={store}/>);
		return expect(renderer,
			'to have exactly rendered',
			<FormTab
				name='test/tab'
				pageName='test'
				fieldsets={[
					{
						name: 'test/tab/oneset',
						label: 'First set',
						fields: [
							{ name: 'test/tab/oneset/onefield' },
							{ name: 'test/tab/oneset/twofield', defaultValue: 'a default' }
						]
					},
					{
						name: 'test/tab/twoset',
						label: 'Second set',
						fields: [ { name: 'test/tab/twoset/threefield', defaultValue: 'overwritten', value: 'different' } ]
					}
				]}
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
			store.state = state.deleteIn(['layout', 'perspectives', 'content', 'pages', 'test', 'currentTab']);
			renderer.render(<ConnectFormPanel store={store}/>);
			return expect(renderer,
				'to have rendered',
				<FormTab
					name='test/tab'
					pageName='test'
					fieldsets={[{}, {}]}
					actions={{}}
					store={{}}/>);
		});

		it('provides an empty tabDef if none found', () => {
			store.state = state.deleteIn(['tabDefs', 'test/tab']);
			renderer.render(<ConnectFormPanel store={store}/>);
			return expect(renderer,
				'to have rendered',
				<FormTab
					actions={{}}
					store={{}}/>);
		});
	});

});
