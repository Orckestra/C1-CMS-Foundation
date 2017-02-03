import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ConnectPerspectives from 'console/components/container/ConnectPerspectives.js';
import Perspectives from 'console/components/presentation/Perspectives.js';

describe('ConnectPerspectives', () => {
	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			perspectiveDefs: {
				'console-search': {
					name: 'console-search',
					icon: 'magnifier',
					label: 'Search',
					rootPage: 'search'
				},
				content: {
					name: 'content',
					icon: 'perspective-content',
					label: 'Content',
					rootPage: 'content-browser'
				}
			},
			layout: {
				currentPerspective: 'console-search',
				perspectivesOpen: false,
				perspectives: {
					'console-search': {
						currentPage: 'search'
					},
					content: {}
				}
			}
		});
		store = {
			stateObj: state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => store.stateObj).named('getState')
		};
	});

	it('passes data to presentation component', () => {
		renderer.render(<ConnectPerspectives store={store}/>);
		return expect(renderer, 'to have rendered', <Perspectives
			identityName='C1 CMS'
			setPerspective={expect.it('to be a function').and('when called with', ['name'])}
			loadPage={expect.it('to be a function').and('when called with', ['name'])}
			toggleExplorer={expect.it('to be a function').and('when called')}
			perspectiveDefs={Immutable.fromJS({
				'console-search': { name: 'console-search' },
				content: { name: 'content' }
			})}
			layout={Immutable.fromJS({
				currentPerspective: 'console-search',
				perspectives: {
					'console-search': {
						currentPage: 'search'
					},
					content: {}
				}
			})}
		/>)
		.then(() =>
			expect(store.dispatch, 'to have calls satisfying', [
				{ args: [{ type: 'LAYOUT.SELECT_LOCATION', perspective: 'name' }] },
				{ args: [expect.it('to be a function')] },
				{ args: [{ type: 'LAYOUT.TOGGLE_EXPLORER' }] }
			])
		);
	});
});
