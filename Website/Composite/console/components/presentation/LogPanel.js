import React, {PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, Column, Cell } from 'fixed-data-table-2';

function getTextHeight(message) {
	let lineBreaks = message.match(/\n/g);
	let lineCount = lineBreaks && lineBreaks.length + 1;
	if (lineCount) {
		return lineCount * 15;
	} else {
		return 16;
	}
}

export const LogPanel = props => {
	let mainWidth = props.containerWidth;
	let mainHeight = props.containerHeight;
	let getRowHeight = rowIndex =>
		props.logPage[rowIndex] &&
		getTextHeight(props.logPage[rowIndex].message) + 10;
	let getMessageBlock = message => /\n/.test(message) ? <pre>{message}</pre> : message;
	return <Table
		height={mainHeight}
		width={mainWidth}
		headerHeight={26}
		rowsCount={props.logPage.length}
		rowHeight={26}
		rowHeightGetter={getRowHeight}
		>
		<Column
			width={26}
			header={<Cell/>}
			cell={({ rowIndex, ...cellProps }) => <Cell className={props.logPage[rowIndex]['severity']} {...cellProps}></Cell>}
			/>
		<Column
			flexGrow={2}
			width={20}
			header={<Cell>{props.tabDef.get('headers').get('timeStamp')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell className='tableCell' {...cellProps}>{props.logPage[rowIndex]['timeStamp']}</Cell>}
			/>
		<Column
			flexGrow={20}
			width={50}
			header={<Cell>{props.tabDef.get('headers').get('message')}</Cell>}
			cell={
				({ rowIndex, ...cellProps }) =>
				<Cell className='tableCell' {...cellProps}>
					{getMessageBlock(props.logPage[rowIndex].message)}
				</Cell>
			}
			/>
		<Column
			flexGrow={3}
			width={20}
			header={<Cell>{props.tabDef.get('headers').get('title')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell className='tableCell' {...cellProps}>{props.logPage[rowIndex]['title']}</Cell>}
			/>
		<Column
			flexGrow={1}
			width={10}
			header={<Cell>{props.tabDef.get('headers').get('severity')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell className='tableCell' {...cellProps}>{props.logPage[rowIndex]['severity']}</Cell>}
			/>
	</Table>;
};

LogPanel.propTypes = {
	containerWidth: PropTypes.number.isRequired,
	containerHeight: PropTypes.number.isRequired,
	tabDef: ImmutablePropTypes.map.isRequired,
	logPage: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LogPanel;
