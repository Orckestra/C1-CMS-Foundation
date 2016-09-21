import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { selectShownPage, replacePages, selectTab } from 'console/state/reducers/pages.js';

// The intent is that this should be as small as possible, instead initializing
// from server data
export default function initState(store) {
	store.dispatch(loadPageDef('edit-language'));
	store.dispatch(loadValues('edit-language'));
	store.dispatch(replacePages(['edit-language', 'other-page']));
	store.dispatch(selectShownPage('edit-language'));
	store.dispatch(selectTab('edit-language/tab'));
}
