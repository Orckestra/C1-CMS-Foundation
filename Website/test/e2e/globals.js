var timeouts = {
		basic: 10000,
		save: 120000,
		little: 1000,
	};
	
var starterSites = {
		Venus: 1,
		Neptune: 2,
		Mercury: 3,
		"Open Cph - Razor": 4,
		"Open Cph - Master Pages" : 5,
	};	
module.exports = {
	timeouts : timeouts,
	starterSites : starterSites,
	beforeEach: function (browser, done) {
		browser.resizeWindow(1400, 1000, done);
	},
	afterEach: function (browser, done) {
		browser.end(done);
	}
}
