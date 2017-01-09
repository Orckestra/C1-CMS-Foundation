import { connect } from 'react-redux';
import Perspectives from 'console/components/presentation/Perspectives';
import { perspectiveDefsSelector } from 'console/state/selectors/perspectiveSelector.js';
import { setPerspective, toggleExplorer } from 'console/state/reducers/layout.js';
import { loadAndOpenPage } from 'console/state/actions/loadAndOpen.js';

function mapStateToProps(state) {
	return {
		identityName: 'C1 CMS',
		perspectiveDefs: perspectiveDefsSelector(state),
		layout: state.get('layout')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setPerspective: name => dispatch(setPerspective(name)),
		loadPage: pageName => dispatch(loadAndOpenPage(pageName)),
		toggleExplorer: () => dispatch(toggleExplorer())
	};
}

const ConnectPerspectives = connect(mapStateToProps, mapDispatchToProps)(Perspectives);

export default ConnectPerspectives;
