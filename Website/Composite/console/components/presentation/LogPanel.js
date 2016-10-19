import React, {PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, Column, Cell } from 'fixed-data-table';

const widthCoeff = [0, 0.2, 0.5, 0.2, 0.1];

const LogPanel = props => {
	let mainWidth = props.window.get('width'); // Adjust this to grab width of parent element
	let mainHeight = props.window.get('height'); // Adjust this to grab height of parent element
	let columnWidths = widthCoeff.map(coeff =>
		Math.ceil((mainWidth - 26) * coeff) || 26
	);
	// Adjust for rounding errors
	columnWidths[3] -= columnWidths.reduce((total, w) => total + w, 0) - mainWidth;
	return <Table
		height={mainHeight - 75}
		width={mainWidth}
		headerHeight={26}
		rowsCount={props.logPage.length}
		rowHeight={26}>
		<Column
			width={columnWidths[0]}
			header={<Cell/>}
			cell={({ rowIndex, ...cellProps }) => <Cell className={props.logPage[rowIndex]['type']} {...cellProps}></Cell>}
			/>
		<Column
			width={columnWidths[1]}
			header={<Cell>{props.tabDef.get('headers').get('timestamp')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['timestamp']}</Cell>}
			/>
		<Column
			width={columnWidths[2]}
			header={<Cell>{props.tabDef.get('headers').get('message')}</Cell>}
			cell={
				// Do something to show long messages
				// Support <pre>-tagged messages
				({ rowIndex, ...cellProps }) =>
					<Cell {...cellProps}>
						{props.logPage[rowIndex]['message']}
					</Cell>
				}
			/>
		<Column
			width={columnWidths[3]}
			header={<Cell>{props.tabDef.get('headers').get('title')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['title']}</Cell>}
			/>
		<Column
			width={columnWidths[4]}
			header={<Cell>{props.tabDef.get('headers').get('type')}</Cell>}
			cell={({ rowIndex, ...cellProps }) => <Cell {...cellProps}>{props.logPage[rowIndex]['type']}</Cell>}
			/>
	</Table>;
};

LogPanel.propTypes = {
	tabDef: ImmutablePropTypes.map,
	logPage: PropTypes.arrayOf(PropTypes.object)
};

export default LogPanel;
