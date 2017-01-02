import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const FacetList = styled.div`
border-top: 1px solid ${colors.borderColor};
`;
export const FacetGroup = styled.div``;
export const FacetHeader = styled.h2``;
export const Facet = styled.div``;

const SearchFacets = props => <FacetList>
		{
			/* Get list of facet groups, render one header and group for each */
			props.facetGroups.map(group => <FacetGroup key={group.get('fieldName')}>
				<FacetHeader>{group.get('label')}</FacetHeader>
				{group.get('facets').map(facet => <Facet key={facet.get('value')}>{facet.get('label')}</Facet>).toArray()}
			</FacetGroup>).toArray()
		}
	</FacetList>;

SearchFacets.propTypes = {
	facetGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		facets: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
	})),
	actions: PropTypes.shape({
		performSearch: PropTypes.func.isRequired,
		setOption: PropTypes.func.isRequired
	}).isRequired
};

export default SearchFacets;
