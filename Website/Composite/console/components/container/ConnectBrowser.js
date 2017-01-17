import { connect } from 'react-redux';
import BrowserPage from 'console/components/presentation/BrowserPage.js';
import { openNode, closeNode } from 'console/state/reducers/pageTree.js';
import { setPreview } from 'console/state/reducers/layout.js';
import { loadTreeNodes } from 'console/state/actions/loadTreeNodes.js';
import { currentTreeSelector } from 'console/state/selectors/pageTreeSelector.js';
import { currentPreviewSelector } from 'console/state/selectors/layoutSelector.js';

function mapStateToProps(state) {
	return {
		tree: currentTreeSelector(state),
		selectedNode: currentPreviewSelector(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadChildren: provider => node => dispatch(loadTreeNodes(provider, node)),
			openNode: nodeName => dispatch(openNode(nodeName)),
			closeNode: nodeName => dispatch(closeNode(nodeName)),
			selectNode: nodeName => dispatch(setPreview(nodeName))
		}
	};
}

const ConnectBrowser = connect(mapStateToProps, mapDispatchToProps)(BrowserPage);

export default ConnectBrowser;
