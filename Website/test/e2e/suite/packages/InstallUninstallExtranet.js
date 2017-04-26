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
		.installCommercialPackage("Composite.Community", "Composite.Community.Extranet")
		
		browser
		.uninstallPackage("Composite.Community", "Composite.Community.Extranet")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}