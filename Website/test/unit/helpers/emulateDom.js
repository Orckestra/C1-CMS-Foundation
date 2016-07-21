// emulateDom.js - jsdom variant

if (typeof document === 'undefined') {
	const jsdom = require('jsdom').jsdom;
	global.document = jsdom('');
	global.window = global.document.defaultView;

	for (let key in global.window) {
		if (!global[key]) {
			global[key] = global.window[key];
		}
	}
}
