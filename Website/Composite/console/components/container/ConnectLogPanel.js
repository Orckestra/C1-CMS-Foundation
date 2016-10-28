import { connect } from 'react-redux';
import { tabSelector } from 'console/state/selectors/tabSelector.js';
import { logSelector } from 'console/state/selectors/logSelector.js';
import Dimensions from 'react-dimensions';
import LogPanel from 'console/components/presentation/LogPanel.js';

function mapStateToProps(state) {
	return {
		placeholder: () => tabSelector(state).get('placeholder') || 'No data',
		logPage: logSelector(state).toJS()
	};
}

export const ConnectLogPanel = connect(mapStateToProps)(LogPanel);

export default Dimensions({
	containerStyle: {
		padding: 0,
		borderTop: 0,
		overflow: 'hidden'
	},
	className: 'scrollbox',
	elementResize: true
})(ConnectLogPanel);
