import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchPage, * as searchUi from 'console/components/presentation/SearchPage.js';
import SearchResults from 'console/components/presentation/SearchResults.js';
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
			searchFieldValue: 'Test',
			searchString: 'Test',
			actions: {
				setOption: () => {},
				performSearch: () => {}
			}
		};
	});

	it('should render a basic search page', () => {
		renderer.render(<SearchPage {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.SearchContainer>
			<searchUi.SearchSidebar>
				<searchUi.SearchField value='Test'/><searchUi.SearchIcon/>
				<searchUi.FacetList>
					<searchUi.FacetGroup key='testgroup'>
						<searchUi.FacetHeader>Test group 1</searchUi.FacetHeader>
						<searchUi.Facet key='facet1'>Facet One</searchUi.Facet>
						<searchUi.Facet key='facet2'>Facet Two</searchUi.Facet>
						<searchUi.Facet key='facet3'>Facet Three</searchUi.Facet>
					</searchUi.FacetGroup>
				</searchUi.FacetList>
			</searchUi.SearchSidebar>
			<searchUi.SearchResultPane>
				<searchUi.ResultHeader>3 results for 'Test'</searchUi.ResultHeader>
				<SearchResults
					resultColumns={Immutable.fromJS([{ fieldName: 'label' }, { fieldName: 'type' }])}
					results={Immutable.fromJS([{ label: 'Components' }, { label: 'Navigation' }, { label: 'Styles' }])}
				/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});
});
