import loadModules from 'unittest/helpers/moduleLoader.js';
import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import BrowserPage from 'console/components/presentation/BrowserPage.js';

describe('ConnectBrowser', () => {
	let ConnectBrowser;
	before(done => {
		loadModules([
			{
				module: 'console/components/container/ConnectBrowser.js',
				moduleCb: m => { ConnectBrowser = m.default; }
			}
		], () => done());
	});

	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'test',
				perspectives: {
					test: {
						currentPage: 'testbrowser'
					}
				}
			},
			pageDefs: {
				testbrowser: {
					rootNode: 'testRoot'
				}
			},
			pageTree: {
				testRoot: {
					name: 'testRoot',
					childrenLoaded: true,
					children: ['test1', 'test2', 'test3']
				},
				test1: {
					name: 'test1',
					open: true,
					childrenLoaded: true,
					children: ['test11']
				},
				test11: {
					name: 'test11'
				},
				test2: {
					name: 'test2',
					childrenLoaded: false,
					children: ['notloaded1', 'notloaded2']
				},
				test3: {
					name: 'test3',
					open: false,
					childrenLoaded: true,
					children: ['test31']
				},
				test31: {
					name: 'test31'
				}
			}
		});
		store = {
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => state).named('getState')
		};
		props = {
			test: 'value'
		};
	});

	it('renders a BrowserPage with props and type to show', () => {
		renderer.render(<ConnectBrowser store={store} {...props}/>);
		return Promise.all([
			expect(renderer,
				'to have exactly rendered',
				<BrowserPage
					test='value'
					tree={Immutable.fromJS({
						name: 'testRoot',
						children: [
							{
								name: 'test1',
								children: [
									{
										name: 'test11'
									}
								]
							},
							{
								name: 'test2',
								children: ['notloaded1', 'notloaded2']
							},
							{
								name: 'test3',
								children: ['test31']
							}
						]
					})}
					// pageDef={{}}
					actions={{}}
					store={store}/>
			),
			expect(store.dispatch, 'was not called'),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
