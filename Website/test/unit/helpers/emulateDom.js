import jsdom from '@node/jsdom';
import fetch from '@node/node-fetch';

// emulateDom.js - jsdom variant
if (typeof document === 'undefined') {

	global.document = jsdom.jsdom('');
	global.window = global.document.defaultView;
	global.window.fetch = fetch;
	global.window.WebSocket = function () { // Dead simple mock
		this.send = () => {};
		this.addEventListener = () => {};
	};

	for (let key in global.window) {
		if (!global[key]) {
			global[key] = global.window[key];
		}
	}
	jsdom.changeURL(global.window, 'http://localhost/');
}
