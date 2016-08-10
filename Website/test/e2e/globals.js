module.exports = {
	beforeEach: function (browser, done) {
		browser.resizeWindow(1600, 1000, done);
	},
	afterEach: function (browser, done) {
		browser.end(done);
	}
}
