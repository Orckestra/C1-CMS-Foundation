import { loadAndOpenPage } from 'console/state/actions/loadAndOpen.js';

// The intent is that this should be as small as possible, instead initializing
// from server data
let pageName;
// Temporary. Intent is to let localstorage control location
if (location.hash) {
	pageName = location.hash.replace(/^#\/(.+?)?$/, '$1');
} else {
	pageName = 'edit-language';
}

export default function initState(store) {
	store.dispatch(loadAndOpenPage(pageName));
}
