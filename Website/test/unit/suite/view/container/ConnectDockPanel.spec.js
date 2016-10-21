import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ConnectDockPanel from 'console/components/container/ConnectDockPanel.js';
import SwitchPanel from 'console/components/presentation/SwitchPanel.js';
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
					name: 'test1',
					type: 'test'
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

	it('renders a SwitchPanel with props and panel type to show', () => {
		renderer.render(<ConnectDockPanel store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<SwitchPanel
					test='value'
					pageDef={{
						name: 'test1'
					}}
					showType='test'
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
