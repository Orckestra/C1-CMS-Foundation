module.exports = {
	'@tags': ['InstallPackage'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'Uninstall and Install YouTube': function (browser) {
		
		browser
		.uninstallLocalPackage("Orckestra.Media.YouTube")

		browser
		.installPackage("Orckestra.Media", "Orckestra.Media.YouTube")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}