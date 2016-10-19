import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { LogPanel } from 'console/components/presentation/LogPanel.js';
import { Table, Column } from 'fixed-data-table-2';
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
			logPage: [],
			containerHeight: 693,
			containerWidth: 1280
		};
	});

	it('renders a table of log entries', () => {
		renderer.render(<LogPanel {...props}/>);
		return expect(renderer, 'to have rendered',
			<Table
				height={693}
				width={1280}
				headerHeight={26}
				rowsCount={props.logPage.length}
				rowHeight={26}>
				<Column width={26}/>
				<Column width={251}/>
				<Column width={627}/>
				<Column width={250}/>
				<Column width={126}/>
			</Table>);
	});
});
