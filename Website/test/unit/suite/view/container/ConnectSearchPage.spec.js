import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import loadModules from 'unittest/helpers/moduleLoader.js';
import SearchPage from 'console/components/presentation/SearchPage.js';
import Immutable from 'immutable';

describe('ConnectSearchPage', () => {
	let ConnectSearchPage;
	before(done => {
		loadModules([
			{
				module: 'console/components/container/ConnectSearchPage.js',
				moduleCb: m => {
					ConnectSearchPage = m.default;
				}
			}
		], () => done());
	});

	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'system',
				perspectives: {
					system: {
						currentPage: 'search',
						pages: {
							search: {
							}
						}
					}
				}
			},
			pageDefs: {
				search: {
					name: 'search',
					label: 'Search',
					type: 'search',
					placeholder: 'Search here',
					searchProvider: 'searchProvider',
					providers: ['searchProvider'],
					linkColumn: 'col1'
				}
			},
			options: {
				values: {
					search: {
						text: 'changed',
						sortInReverseOrder: false
					}
				}
			},
			providerDefs: {
				searchProvider: {
					name: 'searchProvider',
					protocol: 'wamp',
					uri: 'search.query'
				}
			},
			providers: {
				'search.query': {
					search: {
						columns: [
							{
								fieldName: 'col1',
								label: 'Column 1',
								sortable: false
							},
							{
								fieldName: 'col2',
								label: 'Column 2',
								sortable: true
							}
						],
						rows: [
							{
								label: 'Value',
								url: '/address1',
								values: {
									col1: 'Value',
									col2: 'One'
								}
							},
							{
								label: 'Other value',
								url: '/address1',
								values: {
									col1: 'Other value',
									col2: 'Two'
								}
							},
							{
								label: 'And another',
								url: '/address1',
								values: {
									col1: 'And another',
									col2: 'One'
								}
							},
							{
								label: 'Yet more',
								url: '/address1',
								values: {
									col1: 'Yet more',
									col2: 'Two'
								}
							},
							{
								label: 'Last one',
								url: '/address1',
								values: {
									col1: 'Last one',
									col2: 'One'
								}
							}
						],
						totalHits: 5,
						facetFields: [
							{
								fieldName: 'col2',
								label: 'Column 2',
								facets: [
									{
										value: '1',
										label: 'One',
										hitCount: 3
									},
									{
										value: '2',
										label: 'Two',
										hitCount: 2
									}
								]
							}
						],
						queryText: 'testquery'
					}
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
		renderer.render(<ConnectSearchPage pageDef={
			Immutable.fromJS({
				name: 'search',
				label: 'Search',
				type: 'search',
				placeholder: 'Search here',
				searchProvider: 'searchProvider',
				providers: {
					searchProvider: {
						name: 'searchProvider',
						protocol: 'wamp',
						uri: 'search.query'
					}
				},
				linkColumn: 'col1'
			})
		} store={store}/>);
		return expect(renderer, 'to have rendered', <SearchPage
			pageDef={Immutable.fromJS({
				name: 'search',
				label: 'Search',
				type: 'search',
				placeholder: 'Search here',
				searchProvider: 'searchProvider',
				providers: {
					searchProvider: {
						name: 'searchProvider',
						protocol: 'wamp',
						uri: 'search.query'
					}
				},
				linkColumn: 'col1'
			})}
			facetGroups={Immutable.fromJS([{}])}
			resultColumns={Immutable.fromJS([{ label: 'Column 1' }, { label: 'Column 2' }])}
			results={Immutable.fromJS([{}, {}, {}, {}, {}])}
			searchQuery={Immutable.fromJS({ text: 'changed', sortInReverseOrder: false })}
			searchString='testquery'
			actions={{
				performSearch: expect.it('to be a function'),
				setOption: expect.it('to be a function')
			}}
		/>);
	});
});
