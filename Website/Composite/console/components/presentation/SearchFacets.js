import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Checkbox from 'console/components/presentation/Checkbox.js';

export const FacetList = styled.div`
border-top: 1px solid ${colors.borderColor};
height: calc(100% - 32px);
overflow-y: auto;
margin-right: -15px;
padding-right: 15px;
user-select: none;
`;
export const FacetGroup = styled.div``;
export const FacetHeader = styled.h2`
color: ${colors.dialogHeaderColor};
font-family: 'Roboto Condensed', sans-serif;
font-weight: normal;
font-style: italic;
font-size: 14px;
text-transform: uppercase;
`;
export const Facet = styled.div``;
export const FacetSelector = styled(Checkbox)`
margin-right: 10px;
`;

const SearchFacets = props => {
	function setFacet(name, value) {
		return () => {
			let searchQuery = props.searchQuery.withMutations(query => {
				if (!query.get('selections')) {
					query.set('selections', Immutable.List());
				}
				let selections = query.get('selections');
				let fieldIndex = selections.findKey(field => field.get('fieldName') === name);
				if (typeof fieldIndex !== 'number') {
					fieldIndex = selections.size;
					selections = selections.push(Immutable.Map({
						fieldName: name,
						values: Immutable.List()
					}));
					query.set('selections', selections);
				}
				let checkedFacets = selections.getIn([fieldIndex, 'values']);
				let facetIndex = checkedFacets.findKey(facet => facet === value);
				if (typeof facetIndex !== 'number') {
					query.setIn(['selections', fieldIndex, 'values'], checkedFacets.push(value));
				} else {
					query.deleteIn(['selections', fieldIndex, 'values', facetIndex]);
				}
			});
			props.updateQuery(searchQuery);
		};
	}
	return <FacetList>
		{props.facetGroups.map(group => <FacetGroup key={group.get('fieldName')}>
			<FacetHeader>{group.get('label')}</FacetHeader>
			{group.get('facets').map(facet => <Facet key={facet.get('value')}>
				<FacetSelector
					id={group.get('fieldName') + '_' +  facet.get('value')}
					checked={!!facet.get('checked')}
					onClick={setFacet(group.get('fieldName'), facet.get('value'))}
					onChange={() => {}/* To calm warnings about onChange missing */}
				/>
				<label htmlFor={group.get('fieldName') + '_' +  facet.get('value')}>
					{facet.get('label').slice(0, 30) + (facet.get('label').length > 30 ? '\u2026 ' : ' ')}
					[{facet.get('hitCount')}]
				</label>
			</Facet>).toArray()}
		</FacetGroup>).toArray()}
	</FacetList>;
};

SearchFacets.propTypes = {
	facetGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		facets: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
	})),
	searchQuery: ImmutablePropTypes.mapContains({
		selections: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
			fieldName: PropTypes.string.isRequired,
			values: ImmutablePropTypes.listOf(PropTypes.string).isRequired
		}))
	}).isRequired,
	updateQuery: PropTypes.func.isRequired
};

export default SearchFacets;
