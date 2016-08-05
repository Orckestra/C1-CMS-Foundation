import { loadPageDef } from './actions/pageDefs.js';
import { selectShownPage, replacePages } from './actions/pageSelection.js';

export default function initState(store) {
	store.dispatch(loadPageDef('edit-language'));
	store.dispatch(replacePages(['edit-language']));
	store.dispatch(selectShownPage('edit-language'));
}
