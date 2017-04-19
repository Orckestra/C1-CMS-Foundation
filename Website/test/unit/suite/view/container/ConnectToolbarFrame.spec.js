import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';

describe('ConnectToolbarFrame', () => {
	let ConnectToolbarFrame, ToolbarFrame, UPDATE_VALUE, SET_OPTION;
	before(done => {
		loadModules([
			{
				module: 'console/components/container/ConnectToolbarFrame.js',
				moduleCb: m => { ConnectToolbarFrame = m.default; }
			},
			{
				module: 'console/components/presentation/ToolbarFrame.js',
				moduleCb: m => { ToolbarFrame = m.default; }
			},
			{
				module: 'console/state/reducers/dataFields.js',
				moduleCb: m => { UPDATE_VALUE = m.UPDATE_VALUE; }
			},
			{
				module: 'console/state/reducers/options.js',
				moduleCb: m => { SET_OPTION = m.SET_OPTION; }
			}
		], () => done());
	});

	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'system',
				perspectives: {
					system: {
						currentPage: 'testpage',
						pages: {
							testpage: {
								currentTab: 'tab',
								tabs: {
									tab: {}
								}
							},
							test2: {}
						}
					}
				}
			},
			pageDefs: {
				'testpage': {
					name: 'testpage',
					toolbars: ['hasItemDefs', 'hasNoItemDefs', 'hasNoToolbarDef'],
					tabs: ['tab1']
				}
			},
			tabDefs: {
				tab1: {
					name: 'tab1'
				}
			},
			dataFields: {
				committedPages: {
					testpage: {
						'one': 1,
						'two': 2
					}
				},
				testpage: {
					'one': 1,
					'two': 2
				}
			},
			options: {
				values: {
					'switchItUp': 2
				},
				lists: {
					'checkItOut': [
						{ value: 'one', label: 'Thing' },
						{ value: 'two', label: 'Stuff' }
					]
				}
			},
			toolbarDefs: {
				hasItemDefs: {
					name: 'hasItemDefs',
					items: ['item1', 'item2', 'item3', 'item4']
				},
				hasNoItemDefs: {
					name: 'hasNoItemDefs',
					items: ['item5', 'item6']
				}
			},
			itemDefs: {
				item1: {
					type: 'button',
					name: 'saveIt',
					action: 'save'
				},
				item2: {
					type: 'button',
					name: 'doStuff',
					action: 'stuff'
				},
				item3: {
					type: 'select',
					name: 'switchItUp',
					options: [
						{ value: 'One' },
						{ value: 2, label: 'Two' }
					]
				},
				item4: {
					type: 'checkboxGroup',
					name: 'checkItOut'
				}
			}
		});
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value' // Not required - should be there anyway when passed through
		};
	});

	it('renders a ToolbarFrame with props, values and actions', () => {
		renderer.render(<ConnectToolbarFrame store={store} {...props}/>);
		return expect(renderer, 'to have rendered', <ToolbarFrame
			{...props}
			pageName='testpage'
			toolbars={[{
				name: 'hasItemDefs',
				items: [
					{ type: 'button', name: 'saveIt', action: 'save' },
					{ type: 'button', name: 'doStuff', action: 'stuff'},
					{ type: 'select', options: [{value: 'One'}, {value: 2, label: 'Two' }], value: 2 },
					{ type: 'checkboxGroup', options: [{value: 'one', label: 'Thing'}, {value: 'two', label: 'Stuff'}], value: []}
				]
			}, {
				name: 'hasNoItemDefs',
				items: []
			}]}
			test={'value'}
			dirty={false}
			actions={{
				updateValue: expect.it('to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'to be a function')
					.and('when called with', ['pagename', 'fieldname'], 'when called with', ['value'], 'to be undefined'), // Result is call to store.dispatch
				setOption: expect.it('to be a function')
					.and('when called with', ['fieldname'], 'to be a function')
					.and('when called with', ['fieldname'], 'when called with', ['value'], 'to be undefined'), // Result is call to store.dispatch
				save: expect.it('to be a function')
					.and('when called with', ['pagename'], 'to be a function')
					.and('when called with', ['pagename'], 'when called', 'to be undefined'), // Result is call to store.dispatch
				fireAction: expect.it('to be a function')
					.and('when called with', ['pagename', 'actionId'], 'to be a function')
					.and('when called with', ['pagename', 'actionId'], 'when called with', [['val1', 'val2']], 'to be undefined') // Result is call to store.dispatch
			}}/>)
		.then(() => expect(store.dispatch, 'to have calls satisfying', [
			{ args: [{ type: UPDATE_VALUE, pageName: 'pagename', fieldName: 'fieldname', newValue: 'value' }]},
			{ args: [{ type: SET_OPTION, name: 'fieldname', value: 'value' }]},
			{ args: [expect.it('to be a function')]},
			{ args: [expect.it('to be a function')]}
		]));
	});
});
