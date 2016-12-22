import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchPage, * as searchUi from 'console/components/presentation/SearchPage.js';
import Immutable from 'immutable';


describe('SearchPage', () => {
	let renderer, pageDef, facetGroups, resultColumns, results, searchFieldValue, searchString;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		pageDef = Immutable.fromJS({
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
			}
		});
		facetGroups = Immutable.fromJS([
			{
				name: 'testgroup',
				header: 'Test group 1',
				facets: [
					{
						name: 'facet1',
						label: 'Facet One'
					},
					{
						name: 'facet2',
						label: 'Facet Two'
					},
					{
						name: 'facet3',
						label: 'Facet Three'
					}
				]
			}
		]);
		resultColumns = Immutable.fromJS([
			{ name: 'name', label: 'Label' },
			{ name: 'type', label: 'Data type' },
			{ name: 'description', label: 'Description' },
			{ name: 'creationDate', label: 'Created' },
			{ name: 'createdBy', label: 'Author' },
			{ name: 'published', label: 'Published?' }
		]);
		results = Immutable.fromJS([
			{
				name: 'Components',
				type: 'C1 Page',
				description: 'This section contains pages that show off the different layouts and styling options.',
				creationDate: '2016 Dec 14',
				createdBy: 'admin',
				published: 'published',
			},
			{
				name: 'Navigation',
				type: 'C1 Page',
				description: 'Test things like deep structures and labels that are darn long.',
				creationDate: '2016 Dec 14',
				createdBy: 'admin',
				published: 'published',
			},
			{
				name: 'Styles',
				type: 'C1 Page',
				description: 'This page contains different elements that you can define with the Visual Editor in the CMS Console.',
				creationDate: '2016 Dec 14',
				createdBy: 'admin',
				published: 'published',
			}
		]);
		searchFieldValue = 'Test';
		searchString = 'Test';
	});

	it('should render a basic search page', () => {
		renderer.render(<SearchPage pageDef={pageDef} facetGroups={facetGroups} resultColumns={resultColumns} results={results} searchFieldValue={searchFieldValue} searchString={searchString}/>);
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
				<searchUi.ResultTable/>
			</searchUi.SearchResultPane>
		</searchUi.SearchContainer>);
	});
});
