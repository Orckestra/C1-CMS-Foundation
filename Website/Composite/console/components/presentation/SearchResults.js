import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import colors from 'console/components/colors.js';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'console/components/presentation/Icon.js';

export const ResultTable = styled.table`
width: 100%;
max-height: calc(100% - 32px);
border-collapse: collapse;
table-layout: fixed;
`;
export const ResultTableHead = styled.thead``;
export const ResultTableBody = styled.tbody`
overflow-y: scroll;
`;
export const ResultTableRow = styled.tr`
width: 100%;
`;
export const SortIcon = styled(Icon)`
width: 10px;
height: 10px;
margin-left: 4px;
`;
export const ResultTableHeadCell = styled.th`
height: 26px;
border-top: 1px solid ${colors.borderColor};
border-bottom: 1px solid ${colors.borderColor};
background-color: ${colors.darkBackground};
text-align: left;
font-weight: normal;
cursor: default;

${
	props => props.sortable ?
		css`
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		` :
		''
}

&.active {
	font-weight: bold;
}

&:first-child {
	padding-left: 15px;
	border-left: 1px solid ${colors.borderColor};
}
&:last-child {
	padding-right: 15px;
}
`;
export const ResultTableBodyCell = styled.td`
height: 26px;
padding: 5px;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
border-bottom: 1px solid ${colors.borderColor};

&.active {
	font-weight: bold;
}

&:first-child {
	padding-left: 15px;
}
&:last-child {
	padding-right: 15px;
}
`;

const SearchResults = props => {
	return <ResultTable>
		<ResultTableHead>
			<ResultTableRow>
				{props.resultColumns.map(col => {
					let sort = col.get('sortable') ?
						() => {
							let searchQuery = props.searchQuery;
							if (searchQuery.get('sortBy') === col.get('fieldName')) {
								searchQuery = searchQuery.set('sortInReverseOrder', ! searchQuery.get('sortInReverseOrder'));
							} else {
								searchQuery = searchQuery.set('sortBy', col.get('fieldName')).set('sortInReverseOrder', false);
							}
							props.updateQuery(searchQuery);
							props.performSearch();
						} :
						() => {};
					return <ResultTableHeadCell key={col.get('fieldName')} onClick={sort} sortable={col.get('sortable')}>
						{col.get('label')}
						{props.searchQuery.get('sortBy') === col.get('fieldName') ?
						<SortIcon id={props.searchQuery.get('sortInReverseOrder') ? 'chevron-up' : 'chevron-down'}/> :
						null}
					</ResultTableHeadCell>;
				}).toArray()}
			</ResultTableRow>
		</ResultTableHead>
		<ResultTableBody>
			{props.results.map(row =>
				<ResultTableRow key={row.hashCode()}>
					{props.resultColumns.map(col => <ResultTableBodyCell key={col.get('fieldName')}>
						{col.get('fieldName') === props.urlColumn ?
							<a href={row.get('url')} target="_top">{row.getIn(['values', col.get('fieldName')])}</a> :
							row.getIn(['values', col.get('fieldName')])
						}
					</ResultTableBodyCell>).toArray()}
				</ResultTableRow>
			).toArray()}
		</ResultTableBody>
	</ResultTable>;
};

SearchResults.propTypes = {
	results: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
	resultColumns: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		fieldName: PropTypes.string.isRequired
	})).isRequired,
	searchQuery: ImmutablePropTypes.mapContains({
		sortBy: PropTypes.string,
		sortInReverseOrder: PropTypes.bool.isRequired
	}).isRequired,
	updateQuery: PropTypes.func.isRequired,
	performSearch: PropTypes.func.isRequired,
	urlColumn: PropTypes.string
};

export default SearchResults;
