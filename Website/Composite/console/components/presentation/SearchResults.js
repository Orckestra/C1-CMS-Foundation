import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from 'console/components/colors.js';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const ResultTable = styled.table`
width: 100%;
max-height: calc(100% - 32px);
border-collapse: collapse;
`;
export const ResultTableHead = styled.thead``;
export const ResultTableBody = styled.tbody`
overflow-y: scroll;
`;
export const ResultTableHeadCell = styled.th`
height: 26px;
border-top: 1px solid ${colors.borderColor};
border-bottom: 1px solid ${colors.borderColor};
background-color: ${colors.darkBackground};
text-align: left;
font-weight: normal;

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

const SearchResults = props => <ResultTable>
	<ResultTableHead>
		<tr>
			{props.resultColumns.map(col => <ResultTableHeadCell key={col.get('fieldName')}>{col.get('label')}</ResultTableHeadCell>).toArray()}
		</tr>
	</ResultTableHead>
	<ResultTableBody>
		{props.results.map(row =>
			<tr key={row.hashCode()}>
				{props.resultColumns.map(col => <ResultTableBodyCell key={col.get('fieldName')}>
					{col.get('fieldName') === props.urlColumn ?
						<a href={row.get('url')} target="_top">{row.getIn(['values', col.get('fieldName')])}</a> :
						row.getIn(['values', col.get('fieldName')])
					}
				</ResultTableBodyCell>).toArray()}
			</tr>
		).toArray()}
	</ResultTableBody>
</ResultTable>;


SearchResults.propTypes = {
	results: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
	resultColumns: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
		fieldName: PropTypes.string.isRequired
	})).isRequired,
	urlColumn: PropTypes.string,
};

export default SearchResults;
