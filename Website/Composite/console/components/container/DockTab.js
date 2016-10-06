import { connect } from 'react-redux';
import { currentPageSelector } from 'console/state/selectors/pageSelector.js';
import TabPage from 'console/components/presentation/TabPage.js';

function mapStateToProps(state) {
	return {
		pageDef: currentPageSelector(state)
	};
}

const DockTab = connect(mapStateToProps)(TabPage);

export default DockTab;
