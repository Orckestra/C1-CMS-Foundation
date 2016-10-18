import React, {PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, Column, Cell }from 'fixed-data-table';

const LogPanel = props => (
	<Table
		height={500}
		width={1000}
		headerHeight={26}
		rowsCount={props.logPage.length}
		rowHeight={26}>
		<Column
			width={26}
			header={<Cell/>}
			cell={({ rowIndex, ...cellProps }) => <Cell className={props.logPage[rowIndex]['type']} {...cellProps}></Cell>}
			/>
		<Column
			width={200}
			header={<Cell>{props.tabDef.get('headers').get('timestamp')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['timestamp']}</Cell>}
			/>
		<Column
			width={500}
			header={<Cell>{props.tabDef.get('headers').get('message')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['message']}</Cell>}
			/>
		<Column
			width={174}
			header={<Cell>{props.tabDef.get('headers').get('title')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['title']}</Cell>}
			/>
		<Column
			width={100}
			header={<Cell>{props.tabDef.get('headers').get('type')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['type']}</Cell>}
			/>
	</Table>
);

LogPanel.propTypes = {
	tabDef: ImmutablePropTypes.map,
	logPage: PropTypes.arrayOf(PropTypes.object)
};

export default LogPanel;
