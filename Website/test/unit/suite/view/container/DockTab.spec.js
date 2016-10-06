import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DockTab from 'console/components/container/DockTab.js';
import TabPage from 'console/components/presentation/TabPage.js';
import Immutable from 'immutable';

describe('DockTab', () => {
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
			pageTypes: {} // required for TabPage
		};
	});

	it('renders a TabPage with props and page name to show', () => {
		renderer.render(<DockTab store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<TabPage
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
