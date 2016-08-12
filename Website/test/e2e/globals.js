module.exports = {
	beforeEach: function (browser, done) {
		browser.resizeWindow(1400, 1000, done);
	},
	afterEach: function (browser, done) {
		browser.end(done);
	}
}
