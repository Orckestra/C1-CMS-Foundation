import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LogPanel from 'console/components/presentation/LogPanel.js';
import { Table, Column }from 'fixed-data-table';
import Immutable from 'immutable';

describe('LogPanel', () => {
	let renderer, props;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		props = {
			tabDef: Immutable.fromJS({
				headers: {
					timestamp: 'Date',
					message: 'Message',
					title: 'Title',
					type: 'EventType'
				}
			}),
			logPage: []
		};
	});

	it('renders a table of log entries', () => {
		renderer.render(<LogPanel {...props}/>);
		return expect(renderer, 'to have rendered',
			<Table
				height={500}
				width={1000}
				headerHeight={26}
				rowsCount={props.logPage.length}
				rowHeight={26}>
				<Column width={26}/>
				<Column width={200}/>
				<Column width={500}/>
				<Column width={174}/>
				<Column width={100}/>
			</Table>);
	});
});
