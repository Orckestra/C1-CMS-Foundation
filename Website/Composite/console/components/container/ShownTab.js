import { connect } from 'react-redux';
import TabPage from '../presentation/TabPage.js';

function mapStateToProps(state) {
	return {
		pageDefs: state.pageDefs,
		name: state.pages.currentPage
	};
}

const ShownTab = connect(mapStateToProps)(TabPage);

export default ShownTab;
