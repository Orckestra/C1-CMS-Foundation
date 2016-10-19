import { loadPageDef } from 'console/state/actions/pageDefs.js';
import { loadValues } from 'console/state/actions/values.js';
import { selectShownPage, replacePages } from 'console/state/reducers/pages.js';
import { refreshLog } from 'console/state/reducers/logs.js';
import requestJSON from 'console/access/requestJSON.js';

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
	requestJSON('/longLog.json').then(data => store.dispatch(refreshLog('server-log/log', '2016-10-06', data)));
	requestJSON('/mediumLog.json').then(data => store.dispatch(refreshLog('server-log/log', '2016-10-05', data)));
}
