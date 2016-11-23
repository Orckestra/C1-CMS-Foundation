import React from 'react';
import { connect } from 'react-redux';
import { tabSelector } from 'console/state/selectors/tabSelector.js';
import { logSelector } from 'console/state/selectors/logSelector.js';
import Dimensions from 'react-dimensions';
import LogPanel from 'console/components/presentation/LogPanel.js';
import ScrollBox from 'console/components/presentation/ScrollBox.js';
import styled from 'styled-components';

function mapStateToProps(state) {
	return {
		placeholder: () => tabSelector(state).get('placeholder') || 'No data',
		logPage: logSelector(state).toJS()
	};
}

export const CLP = connect(mapStateToProps)(LogPanel);

const SizedCLP = Dimensions({
	containerStyle: {
		height: '100%',
		width: '100%'
	},
	elementResize: true
})(CLP);

const CleanScrollBox = styled(ScrollBox)`
	padding: 0;
	border-top: 0 !important;
	overflow: hidden;
`;

const ConnectLogPanel = props => <CleanScrollBox>
	<SizedCLP {...props}/>
</CleanScrollBox>;

export default ConnectLogPanel;
