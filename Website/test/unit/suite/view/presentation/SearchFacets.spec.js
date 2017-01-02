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
			actions: {
				setOption: () => {},
				performSearch: () => {}
			}
		};
	});

	it('should render a facet selection list', () => {
		renderer.render(<SearchFacets {...props}/>);
		expect(renderer, 'to have rendered', <searchUi.FacetList>
					<searchUi.FacetGroup key='testgroup'>
						<searchUi.FacetHeader>Test group 1</searchUi.FacetHeader>
						<searchUi.Facet key='facet1'>Facet One</searchUi.Facet>
						<searchUi.Facet key='facet2'>Facet Two</searchUi.Facet>
						<searchUi.Facet key='facet3'>Facet Three</searchUi.Facet>
					</searchUi.FacetGroup>
				</searchUi.FacetList>);
	});
});
