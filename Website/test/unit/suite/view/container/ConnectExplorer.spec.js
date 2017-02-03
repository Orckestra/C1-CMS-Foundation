import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ConnectExplorer from 'console/components/container/ConnectExplorer.js';
import ToolbarFrame from 'console/components/presentation/ToolbarFrame.js';


describe('ConnectExplorer', () => {
	let renderer, state, store, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'content',
				perspectives: {
					content: {
						currentPage: 'contentExplorer',
						pages: {
							contentExplorer: {
								currentTab: 'contentBrowser',
								tabs: {
									contentBrowser: {
										preview: 'selected'
									}
								}
							}
						}
					}
				}
			},
			pageDefs: {
				'contentExplorer': {
					name: 'contentExplorer',
					toolbars: ['navigator'],
					tabs: ['contentBrowser']
				}
			},
			tabDefs: {
				contentBrowser: {
					name: 'contentBrowser'
				}
			},
			pageTree: {
				selected: {
					actions: []
				}
			},
			toolbarDefs: {
				navigator: {
					name: 'navigator',
					items: []
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

	it('renders a ToolbarFrame set up for a browser', () => {
		renderer.render(<ConnectExplorer store={store} {...props}/>);
		return expect(renderer, 'to have rendered', <ToolbarFrame
			{...props}
			pageName='contentExplorer'
			toolbars={Immutable.fromJS([
				{ name: 'content-browser-node-action-placeholder', items: [] },
				{ name: 'navigator', items: [] }
			])}
			tabDefs={Immutable.List([Immutable.Map({ name: 'contentBrowser' })])}
			test={'value'}
			dirty={false}
			actions={{
				useProvider: expect.it('to be a function')
					.and(
						'when called with', [{ test: 'provider' }, 'testname'],
						'when called with', [{ test: 'data' }]
					)
			}}/>)
			.then(() => expect(store.dispatch, 'to have calls satisfying', [
				{ args: [expect.it('to be a function')] }
			]));
	});
});
