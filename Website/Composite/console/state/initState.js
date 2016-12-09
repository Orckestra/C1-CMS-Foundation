import { loadAndOpenPage } from 'console/state/actions/loadAndOpen.js';

// The intent is that this should be as small as possible, instead initializing
// from server data
let pageName;
// Temporary. Intent is to let localstorage control location
if (location.search && /(\?|&)pageId/.test(location.search)) {
	pageName = location.search.replace(/^\?(?:.*&)?pageId=(.+?)?(?:&.*)?$/, '$1');
} else {
	pageName = 'component-selector-shim';
}

export default function initState(store) {
	store.dispatch(loadAndOpenPage(pageName));
}
