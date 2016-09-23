import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { selectShownPage, replacePages } from 'console/state/reducers/pages.js';

// The intent is that this should be as small as possible, instead initializing
// from server data
let pageName;
if (location.search) {
	pageName = location.search.replace(/^\?(?:.+&)?page=(.+?)(?:&.*)?$/, '$1');
} else {
	pageName = 'edit-language';
}

export default function initState(store) {
	store.dispatch(loadPageDef(pageName));
	store.dispatch(loadValues(pageName));
	store.dispatch(replacePages([pageName]));
	store.dispatch(selectShownPage(pageName));
}
