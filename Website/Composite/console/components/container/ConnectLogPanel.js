import { connect } from 'react-redux';
import { tabSelector } from 'console/state/selectors/tabSelector.js';
import { logSelector } from 'console/state/selectors/logSelector.js';
import LogPanel from 'console/components/presentation/LogPanel.js';

function mapStateToProps(state) {
	return {
		placeholder: () => tabSelector(state).get('placeholder') || 'No data',
		logPage: logSelector(state).toJS()
	};
}

const ConnectLogPanel = connect(mapStateToProps)(LogPanel);

export default ConnectLogPanel;
