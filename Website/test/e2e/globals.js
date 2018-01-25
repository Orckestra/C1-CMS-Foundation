var timeouts = {
		basic: 10000,
		save: 120000,
		little: 1000,
		smallest: 250,
		loading: 25000,
	};

var setupOptions = {
	"Starter sites" : 1,
	"Templates only" : 2,
	"Bare bones" : 3,
}

var starterSites = {
		Venus: 1,
		Neptune: 2,
		Mercury: 3,
		"Open Cph - Razor": 4,
		"Open Cph - Master Pages" : 5,
	};
	
var templatesOnly = {
		"Tiny Cph - Razor": 1,
		"Tiny Cph - Master Pages" : 2,
}
	
module.exports = {
	siteLocation : "",
	asyncHookTimeout : 20000,
	timeouts : timeouts,
	setupOptions : setupOptions,
	starterSites : starterSites,
	beforeEach: function (browser, done) {
		browser.resizeWindow(1400, 1000, done);
	},
	afterEach: function (browser, done) {
		browser.end(done);
	}
}
