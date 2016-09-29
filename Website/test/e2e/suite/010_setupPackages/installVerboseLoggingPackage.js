module.exports = {
	'@tags': ['InstallPackage'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'Install Verbose Logging Package': function (browser) {
		
		browser
		.installPackage("Composite.Tools","Composite.Tools.VerboseLogging")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}
