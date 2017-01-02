import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Input from 'console/components/presentation/Input.js';
import Icon from 'console/components/presentation/Icon.js';
import SearchResults from 'console/components/presentation/SearchResults.js';

export const SearchContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
`;
export const SearchSidebar = styled.div`
box-sizing: border-box;
position: absolute;
top: 0;
left: 0;
width: 290px;
height: 100%;
padding: 15px;
background-color: ${colors.darkBackground};
`;
export const SearchField = styled(Input)`
padding-right: 30px;
`;
export const SearchIcon = styled(Icon)`
position: absolute;
top: 23px;
right: 31px;
`;
export const FacetList = styled.div`
border-top: 1px solid ${colors.borderColor};
`;
export const FacetGroup = styled.div``;
export const FacetHeader = styled.h2``;
export const Facet = styled.div``;
export const SearchResultPane = styled.div`
box-sizing: border-box;
position: absolute;
top: 0;
right: 0;
width: calc(100% - 290px);
height: 100%;
`;
export const ResultHeader = styled.h1`
margin-left: 15px;
`;

const SearchPage = props => {
	let searchFieldUpdate = props.actions.setOption(props.pageDef.get('name'));
	let searchChangeHandler = event => {
		searchFieldUpdate(event.target.value);
	};
	let fireSearch = props.actions.performSearch(
		(props.pageDef.getIn(['providers', props.pageDef.get('searchProvider')]) || Immutable.Map()).toJS(),
		props.pageDef.get('name')
	);
	let searchAction = () => {
		let searchQuery = {
			text: props.searchFieldValue,
			sortInReverseOrder: false
		};
		fireSearch(searchQuery);
	};
	return <SearchContainer>
		<SearchSidebar>
			<SearchField
				placeholder={props.pageDef.get('placeholder')}
				value={props.searchFieldValue}
				onChange={searchChangeHandler}
				onKeyPress={event => {
					if (event.key === 'Enter') {
						searchAction();
					}
				}}/>
			<SearchIcon id="magnifier" onClick={searchAction}/>
			<FacetList>
				{
					/* Get list of facet groups, render one header and group for each */
					props.facetGroups.map(group => <FacetGroup key={group.get('fieldName')}>
						<FacetHeader>{group.get('label')}</FacetHeader>
						{group.get('facets').map(facet => <Facet key={facet.get('value')}>{facet.get('label')}</Facet>).toArray()}
					</FacetGroup>).toArray()
				}
			</FacetList>
		</SearchSidebar>
		<SearchResultPane>
			<ResultHeader>{props.results.size} results for '{props.searchString}'</ResultHeader>
			<SearchResults resultColumns={props.resultColumns} results={props.results}/>
		</SearchResultPane>
	</SearchContainer>;
};

SearchPage.propTypes = {
	pageDef: ImmutablePropTypes.map,
	facetGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		facets: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
	})),
	results: ImmutablePropTypes.list,
	resultColumns: ImmutablePropTypes.list.isRequired,
	searchFieldValue: PropTypes.string.isRequired,
	searchString: PropTypes.string,
	actions: PropTypes.shape({
		performSearch: PropTypes.func.isRequired,
		setOption: PropTypes.func.isRequired
	}).isRequired
};

export default SearchPage;
