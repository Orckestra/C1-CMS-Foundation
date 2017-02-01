import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ConnectBrowser from 'console/components/container/ConnectBrowser.js';
import BrowserPage from 'console/components/presentation/BrowserPage.js';

describe('ConnectBrowser', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'test',
				perspectives: {
					test: {
						currentPage: 'testexplorer',
						pages: {
							testexplorer: {
								currentTab: 'testbrowser',
								tabs: {
									testbrowser: {
										previewLocation: 'test11',
										splitPosition: 350
									}
								}
							}
						}
					}
				}
			},
			pageDefs: {
				testexplorer: {
					name: 'testexplorer',
					tabs: ['testbrowser']
				}
			},
			tabDefs: {
				testbrowser: {
					name: 'testbrowser',
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
					selectedNode='test11'
					actions={{
						openNode: expect.it('to be a function')
							.and(
								'when called with', ['node']
							),
						closeNode: expect.it('to be a function')
							.and(
								'when called with', ['node']
							),
						loadChildren: expect.it('to be a function')
							.and(
								'when called with', [{ test: 'provider' }],
								'when called with', [{ test: 'node' }]
							),
						selectNode: expect.it('to be a function')
							.and(
								'when called with', ['node']
							)
					}}
					splitPosition={350}
					store={store}/>
			)
			.then(expect(store.dispatch, 'to have calls satisfying', [
				{ args: [{ type: 'PAGE_TREE.OPEN_NODE', name: 'node' }]},
				{ args: [{ type: 'PAGE_TREE.CLOSE_NODE', name: 'node' }]},
				{ args: [expect.it('to be a function')]},
				{ args: [{ type: 'LAYOUT.SELECT_LOCATION', preview: 'node' }]}
			])),
			expect(store.subscribe, 'was not called'),
			expect(store.getState, 'was called')
		]);
	});
});
