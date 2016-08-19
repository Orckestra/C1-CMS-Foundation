import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { selectShownPage, replacePages } from 'console/state/actions/pageSelection.js';

export default function initState(store) {
	store.dispatch(loadPageDef('edit-language'));
	store.dispatch(replacePages(['edit-language']));
	store.dispatch(selectShownPage('edit-language'));
}
