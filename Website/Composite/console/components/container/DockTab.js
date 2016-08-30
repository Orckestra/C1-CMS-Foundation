import { connect } from 'react-redux';
import TabPage from 'console/components/presentation/TabPage.js';

function mapStateToProps(state) {
	return {
		pageDefs: state.pageDefs,
		name: state.pages.currentPage
	};
}

const DockTab = connect(mapStateToProps)(TabPage);

export default DockTab;
