import { connect } from 'react-redux';
import BrowserPage from 'console/components/presentation/BrowserPage.js';
import { openNode, closeNode } from 'console/state/reducers/pageTree.js';
import { currentTreeSelector } from 'console/state/selectors/pageTreeSelector.js';

function mapStateToProps(state) {
	return {
		tree: currentTreeSelector(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadNode: pageName => { console.log('load', pageName); },
			openNode: pageName => dispatch(openNode(pageName)),
			closeNode: pageName => dispatch(closeNode(pageName))
		}
	};
}

const ConnectBrowser = connect(mapStateToProps, mapDispatchToProps)(BrowserPage);

export default ConnectBrowser;
