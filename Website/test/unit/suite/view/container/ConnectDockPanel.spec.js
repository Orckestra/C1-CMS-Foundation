import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';

describe('ConnectDockPanel', () => {
	let ConnectDockPanel, SwitchPanel;
	before(done => {
		loadModules([
			{
				module: 'console/components/container/ConnectDockPanel.js',
				moduleCb: m => { ConnectDockPanel = m.default; }
			},
			{
				module: 'console/components/presentation/SwitchPanel.js',
				moduleCb: m => { SwitchPanel = m.default; }
			}
		], () => done());
	});

	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'content',
				perspectives: {
					content: {
						currentPage: 'test1',
						pages: {}
					}
				}
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
