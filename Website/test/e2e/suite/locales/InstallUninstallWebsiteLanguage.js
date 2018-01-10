module.exports = {
	'@tags': ['InstallLocale'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'Install and uninstall a website language': function (browser) {
		
		browser
		.installLocale("French, Canada", "fr")

		browser
		.uninstallLocale("French, Canada")
	},
	afterEach: function (browser, done) {
		done();
	}
}