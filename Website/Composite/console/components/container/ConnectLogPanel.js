import React from 'react';
import { connect } from 'react-redux';
import Table from 'rc-table';
import Immutable from 'immutable';
import { tabSelector } from 'console/state/selectors/tabSelector.js';
import { logSelector } from 'console/state/selectors/logSelector.js';

const indicatorColors = {
	Critical: 'deeppink',
	Error: 'red',
	Warning: 'gold',
	Information: 'lime',
	Verbose: 'white'
}

const columns = [
	{
		title: '',
		dataIndex: '',
		key: 'indicator',
		width: '25px',
		render: (value, record) =>
		<div style={{
				width: '100%',
				height: '100%',
				backgroundColor: indicatorColors[record.type]
			}}/>
	},
	{ title: 'Date', key: 'timestamp', dataIndex: 'timestamp', width: '20%' },
	{ title: 'Message', key: 'message', dataIndex: 'message' },
	{ title: 'Title', key: 'title', dataIndex: 'title', width: '20%' },
	{ title: 'EventType', key: 'type', dataIndex: 'type', width: '10%' }
];

function mapStateToProps(state) {
	return {
		prefixCls: 'log-table',
		columns,
		emptyText: () => tabSelector(state).get('placeholder') || 'No data',
		data: logSelector(state).toJS()
	}
}

const ConnectLogPanel = connect(mapStateToProps)(Table);

export default ConnectLogPanel;
