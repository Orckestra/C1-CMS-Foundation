module.exports = {
	'@tags': ['InstallPackage'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'Install Package Creator': function (browser) {
		
		browser
		.installPackage("Composite.Tools","Composite.Tools.PackageCreator")
		
		browser
		.uninstallPackage("Composite.Tools","Composite.Tools.PackageCreator")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}
