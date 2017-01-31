import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchPage, * as searchUi from 'console/components/presentation/SearchPage.js';
import SearchResults from 'console/components/presentation/SearchResults.js';
import SearchFacets from 'console/components/presentation/SearchFacets.js';
import Immutable from 'immutable';

describe('SearchPage', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			pageDef: Immutable.fromJS({
				name: 'search',
				label: 'Search',
				type: 'search',
				searchProvider: 'searchProvider',
				providers: {
					searchProvider: {
						name: 'searchProvider',
						protocol: 'wamp',
						uri: 'content.search' // TBD
					}
				},
				multipleResultsFound: '{1} results for \'{0}\'',
				linkColumn: 'label'
			}),
			facetGroups: Immutable.fromJS([
				{
					fieldName: 'testgroup',
					label: 'Test group 1',
					facets: [
						{
							value: 'facet1',
							label: 'Facet One',
							hitCount: 1
						},
						{
							value: 'facet2',
							label: 'Facet Two',
							hitCount: 3
						},
						{
							value: 'facet3',
							label: 'Facet Three',
							hitCount: 2
						}
					]
				}
			]),
			resultColumns: Immutable.fromJS([
				{ fieldName: 'label' },
				{ fieldName: 'type' }
			]),
			results: Immutable.fromJS([
				{
					label: 'Components',
					url: '/address1',
					values: {}
				},
				{
					label: 'Navigation',
					url: '/address2',
					values: {}
				},
				{
					label: 'Styles',
					url: '/address3',
					values: {}
				}
			]),
			searchQuery: Immutable.fromJS({ text: 'Test', sortInReverseOrder: false }),
			searchString: 'Test',
			actions: {
				setOption: () => () => () => {},
				performSearch: () => () => {}
			}
		};
	});

	it('should render a basic search page', () => {
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon/>
				<SearchFacets
					facetGroups={Immutable.fromJS([{}])}
					searchQuery={Immutable.Map()}
					updateQuery={expect.it('to be a function')}
				/>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>3 results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					searchQuery={{ text: 'Test', sortInReverseOrder: false }}
					updateQuery={expect.it('to be a function')}
					performSearch={expect.it('to be a function')}
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }, { label: 'Navigation' }, { label: 'Styles' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});
});
