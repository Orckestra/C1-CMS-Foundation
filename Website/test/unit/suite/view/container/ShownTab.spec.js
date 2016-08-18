import expect from '../../../helpers/expect';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ShownTab from 'console/components/container/ShownTab.js';
import TabPage from 'console/components/presentation/TabPage.js';

describe('ShownTab', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = {
			pages: {
				currentPage: 'test1',
				pages: ['test1', 'test2']
			},
			pageDefs: {
				test1: {}
			},
		};
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
		renderer.render(<ShownTab store={store} {...props}/>);
		return Promise.all([
			expect(renderer, 'to have exactly rendered', <TabPage name='test1' test='value' pageDefs={state.pageDefs} pageTypes={{}} dispatch={store.dispatch} store={store}/>),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
