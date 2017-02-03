import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ConnectTabPanel from 'console/components/container/ConnectTabPanel.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
import Immutable from 'immutable';

describe('ConnectTabPanel', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'system',
				perspectives: {
					system: {
						currentPage: 'test1',
						pages: {
							test1: {
								currentTab: 'tab1',
								tabs: {
									tab1: {}
								}
							},
							test2: {}
						}
					}
				}
			},
			pageDefs: {
				test1: {
					name: 'test1',
					tabs: ['tab1']
				}
			},
			tabDefs: {
				tab1: {
					name: 'tab1',
					type: 'testtab'
				}
			}
		});
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value',
			panelTypes: {} // required for SwitchPanel
		};
	});

	it('renders a SwitchPanel with props and type to show', () => {
		renderer.render(<ConnectTabPanel store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<SwitchPanel
					test='value'
					tabDef={{}}
					showType='testtab'
					panelTypes={{}}
					dispatch={store.dispatch}
					store={store}/>
			),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
