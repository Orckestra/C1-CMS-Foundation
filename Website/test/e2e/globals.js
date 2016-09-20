var timeouts = {
		basic: 10000,
		save: 60000,
	};
module.exports = {
	timeouts : timeouts,
	beforeEach: function (browser, done) {
		browser.resizeWindow(1400, 1000, done);
	},
	afterEach: function (browser, done) {
		browser.end(done);
	}
}
