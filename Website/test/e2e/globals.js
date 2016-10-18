var timeouts = {
		basic: 10000,
		save: 120000,
		little: 1000,
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
