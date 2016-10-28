import { loadAndOpenPage } from 'console/state/actions/loadAndOpen.js';
import { refreshLog } from 'console/state/reducers/logs.js';
import requestJSON from 'console/access/requestJSON.js';

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
	requestJSON('/longLog.json').then(data => store.dispatch(refreshLog('server-log.log', '2016-10-06T00:00:00.000Z', data)));
	requestJSON('/mediumLog.json').then(data => store.dispatch(refreshLog('server-log.log', '2016-10-05T00:00:00.000Z', data)));
}
