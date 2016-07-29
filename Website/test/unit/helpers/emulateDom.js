// emulateDom.js - jsdom variant

if (typeof document === 'undefined') {
	const jsdom = require('jsdom');
	global.document = jsdom.jsdom('');
	global.window = global.document.defaultView;

	for (let key in global.window) {
		if (!global[key]) {
			global[key] = global.window[key];
		}
	}
	jsdom.changeURL(global.window, 'http://localhost/');
}
