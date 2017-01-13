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
			loadChildren: nodeName => { console.log('load', nodeName); },
			openNode: nodeName => dispatch(openNode(nodeName)),
			closeNode: nodeName => dispatch(closeNode(nodeName))
		}
	};
}

const ConnectBrowser = connect(mapStateToProps, mapDispatchToProps)(BrowserPage);

export default ConnectBrowser;
