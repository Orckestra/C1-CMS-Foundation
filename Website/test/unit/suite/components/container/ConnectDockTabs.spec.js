import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ConnectDockTabs from 'console/components/container/ConnectDockTabs.js';
import TabBar from 'console/components/presentation/TabBar.js';
import { SELECT_LOCATION } from 'console/state/reducers/layout.js';

describe('ConnectDockTabs', () => {
	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'content',
				perspectives: {
					'console-search': {
						singlePage: true,
						currentPage: 'search',
						pages: {
							search: {}
						}
					},
					content: {
						currentPage: 'page1',
						pages: {
							contentBrowser: {},
							page1: {},
							page2: {}
						}
					}
				}
			},
			pageDefs: {
				contentBrowser: {
					name: 'contentBrowser',
					label: 'Content'
				},
				page1: {
					name: 'page1',
					label: 'Venus starter site'
				},
				page2: {
					name: 'page2',
					label: 'Tags'
				},
				search: {}
			}
		});
		store = {
			stateObj: state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => store.stateObj).named('getState')
		};
	});

	it('renders a tab bar with a tab for each open page', () => {
		renderer.render(<ConnectDockTabs store={store}/>);
		return expect(renderer, 'to have rendered', <TabBar
			dock
			tabs={[
				{ label: 'Content', name: 'contentBrowser' },
				{ label: 'Venus starter site', name: 'page1', active: true },
				{ label: 'Tags', name: 'page2' }
			]}
			onClick={expect.it('to be a function').and('when called with', ['contentBrowser'], 'when called')}
		/>)
		.then(() => expect(store.dispatch, 'to have calls satisfying', [
			{ args: [{ type: SELECT_LOCATION, page: 'contentBrowser' }] }
		]));
	});

	it('renders nothing in single-page perspectives', () => {
		renderer.render(<ConnectDockTabs store={store}/>);
		return expect(renderer, 'to have rendered', <TabBar
			dock
			tabs={[
				{ label: 'Content', name: 'contentBrowser' },
				{ label: 'Venus starter site', name: 'page1', active: true },
				{ label: 'Tags', name: 'page2' }
			]}
			onClick={expect.it('to be a function').and('when called with', ['contentBrowser'], 'when called')}
		/>)
		.then(() => expect(store.dispatch, 'to have calls satisfying', [
			{ args: [{ type: SELECT_LOCATION, page: 'contentBrowser' }] }
		]));
	});
});
