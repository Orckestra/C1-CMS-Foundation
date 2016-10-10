import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import DockPanel from 'console/components/presentation/DockPanel.js';
import Immutable from 'immutable';

describe('ConnectDockPanel', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			pages: {
				currentPage: 'test1',
				pages: ['test1', 'test2']
			},
			pageDefs: {
				test1: {
					name: 'test1'
				}
			},
		});
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value',
			pageTypes: {} // required for DockPanel
		};
	});

	it('renders a DockPanel with props and page name to show', () => {
		renderer.render(<ConnectDockPanel store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<DockPanel
					test='value'
					pageDef={{
						name: 'test1'
					}}
					pageTypes={{}}
					dispatch={store.dispatch}
					store={store}/>
			),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
