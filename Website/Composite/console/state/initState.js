import { loadAndOpenPage } from 'console/state/actions/loadAndOpen.js';

// The intent is that this should be as small as possible, instead initializing
// from server data

let runStartActions;
// Temporary. Intent is to let localstorage control location
if (location.search && /(\?|&)pageId=/.test(location.search)) {
	runStartActions = store => {
		let pageName = location.search.replace(/^\?(?:.*&)?pageId=(.+?)?(?:&.*)?$/, '$1');
		store.dispatch(loadAndOpenPage(pageName));
	};
} else {
	runStartActions = store => {
		let pageName = 'content-browser';
		store.dispatch(loadAndOpenPage(pageName));
	};
}

export default function initState(store) {
	runStartActions(store);
}
