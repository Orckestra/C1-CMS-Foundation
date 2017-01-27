import React, { PropTypes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import colors from 'console/components/colors.js';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Input from 'console/components/presentation/Input.js';
import Icon from 'console/components/presentation/Icon.js';
import SearchResults from 'console/components/presentation/SearchResults.js';
import SearchFacets from 'console/components/presentation/SearchFacets.js';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

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
transform-origin: 9.25px 9.75px;

${props => props.id === 'magnifier' ?
	css`&:hover {
		fill: ${colors.buttonHighlightColor};
	}` :
	css`animation: ${rotate360} 2s linear infinite;`
}
`;
export const SearchResultPane = styled.div`
box-sizing: border-box;
position: absolute;
top: 0;
right: 0;
width: calc(100% - 290px);
height: 100%;
`;
export const ResultHeader = styled.h1`
font-family: 'Roboto Condensed', sans-serif;
font-weight: normal;
font-size: 18px;
text-transform: uppercase;
margin: 18px 15px 16px;
`;

function interpolateString(str, ...params) {
	return str.replace(/\{(\d+)\}/g, (match, num) => params[parseInt(num, 10)]);
}

const SearchPage = props => {
	let searchQueryUpdater = props.actions.setOption(props.pageDef.get('name'));
	let searchChangeHandler = event => {
		searchQueryUpdater(props.searchQuery.set('text', event.target.value));
	};
	let fireSearch = props.actions.performSearch(
		(props.pageDef.getIn(['providers', props.pageDef.get('searchProvider')]) || Immutable.Map()).toJS(),
		props.pageDef.get('name')
	);
	let searchAction = () => {
		let searchQuery = props.searchQuery.toJS();
		fireSearch(searchQuery);
	};
	return <SearchContainer>
		<SearchSidebar>
			<SearchField
				placeholder={props.pageDef.get('placeholder')}
				value={props.searchQuery.get('text')}
				onChange={searchChangeHandler}
				onInput={searchChangeHandler}
				onKeyPress={event => {
					if (event.key === 'Enter') {
						searchAction();
					}
				}}/>
			<SearchIcon id={props.searchActive ? 'refresh' : 'magnifier'} onClick={searchAction}/>
			<SearchFacets
				facetGroups={props.facetGroups}
				searchQuery={props.searchQuery}
				updateQuery={searchQueryUpdater}
			/>
		</SearchSidebar>
		<SearchResultPane>
			{!props.searchString && !props.results.size ? null :
				props.results.size ?
					(props.results.size > 1 ?
						<ResultHeader>{interpolateString(props.pageDef.get('multipleResultsFound'), props.searchString, props.results.size)}</ResultHeader> :
						<ResultHeader>{interpolateString(props.pageDef.get('singleResultFound'), props.searchString)}</ResultHeader>
					) :
					<ResultHeader>{interpolateString(props.pageDef.get('noResultsFound'), props.searchString)}</ResultHeader>
			}
			<SearchResults
				searchQuery={props.searchQuery}
				updateQuery={searchQueryUpdater}
				performSearch={fireSearch}
				resultColumns={props.resultColumns}
				results={props.results}
				urlColumn={props.pageDef.get('urlColumn')}
			/>
		</SearchResultPane>
	</SearchContainer>;
};

SearchPage.propTypes = {
	pageDef: ImmutablePropTypes.map,
	facetGroups: ImmutablePropTypes.list,
	results: ImmutablePropTypes.list,
	resultColumns: ImmutablePropTypes.list.isRequired,
	searchQuery: ImmutablePropTypes.mapContains({
		text: PropTypes.string.isRequired,
		sortBy: PropTypes.string,
		sortInReverseOrder: PropTypes.bool.isRequired,
		selections: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
			fieldName: PropTypes.string.isRequired,
			values: ImmutablePropTypes.listOf(PropTypes.string).isRequired
		}))
	}).isRequired,
	searchString: PropTypes.string,
	actions: PropTypes.shape({
		performSearch: PropTypes.func.isRequired,
		setOption: PropTypes.func.isRequired
	}).isRequired,
	searchActive: PropTypes.bool
};

export default SearchPage;
