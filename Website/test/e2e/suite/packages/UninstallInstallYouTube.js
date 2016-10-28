module.exports = {
	'@tags': ['InstallPackage'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'Install Extranet': function (browser) {
		
		browser
		.uninstallLocalPackage("Composite.Media.YouTube")

		browser
		.installPackage("Composite.Media", "Composite.Media.YouTube")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}