import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchFacets, * as searchUi from 'console/components/presentation/SearchFacets.js';
import Immutable from 'immutable';

describe('SearchFacets', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			facetGroups: Immutable.fromJS([
				{
					fieldName: 'testgroup',
					label: 'Test group 1',
					facets: [
						{
							value: 'facet1',
							label: 'Facet One',
							hitCount: 1,
							checked: true
						},
						{
							value: 'facet2',
							label: 'Facet Two',
							hitCount: 3
						},
						{
							value: 'facet3',
							label: 'Facet Three',
							hitCount: 2,
							checked: true
						}
					]
				}
			]),
			searchQuery: Immutable.fromJS({
				selections: [
					{
						fieldName: 'testgroup',
						values: ['facet1', 'facet3']
					}
				]
			}),
			updateQuery: () => {}
		};
	});

	it('should render a facet selection list', () => {
		renderer.render(<SearchFacets {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.FacetList>
					<searchUi.FacetGroup key='testgroup'>
						<searchUi.FacetHeader>Test group 1</searchUi.FacetHeader>
						<searchUi.Facet key='facet1'><searchUi.FacetSelector checked={true}/>Facet One [1]</searchUi.Facet>
						<searchUi.Facet key='facet2'><searchUi.FacetSelector checked={false}/>Facet Two [3]</searchUi.Facet>
						<searchUi.Facet key='facet3'><searchUi.FacetSelector checked={true}/>Facet Three [2]</searchUi.Facet>
					</searchUi.FacetGroup>
				</searchUi.FacetList>);
	});
});
