import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { LogPanel } from 'console/components/presentation/LogPanel.js';
import { Table, Column } from 'fixed-data-table-2';
import Immutable from 'immutable';
import styled from 'styled-components';

const StyledTable = styled(Table)``;

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
			<StyledTable
				height={693}
				width={1280}
				headerHeight={26}
				rowsCount={props.logPage.length}
				rowHeightGetter={expect.it('to be a function')}
				rowHeight={26}>
				<Column width={26}/>
				<Column width={20} flexGrow={3}/>
				<Column width={50} flexGrow={20}/>
				<Column width={20} flexGrow={5}/>
				<Column width={10} flexGrow={2}/>
			</StyledTable>);
	});
});
