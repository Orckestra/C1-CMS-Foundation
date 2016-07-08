import { connect } from 'react-redux'
import Page from '../../Page';
import { saveState }from './../../state/actions';

// Sets up a page that allows editing of a document consisting of sets of fields.
function mapStateToProps(state) {
	return { fieldsets: state.fieldsets };
}

function mapDispatchToProps(dispatch) {
	return { save: { action: () => dispatch(saveState()) }};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	let state = Object.assign({}, ownProps);
	Object.keys(stateProps).forEach(setName =>
		Object.keys(stateProps[setName]).forEach(fieldName =>
			Object.assign(ownProps[setName][fieldName], stateProps[setName][fieldName])));
	Object.keys(dispatchProps).forEach(name =>
		Object.assign(state.buttons[name], dispatchProps[name]));
	return state;
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Page);
