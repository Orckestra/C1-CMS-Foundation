module.exports = {
	'@tags': ['InstallPackage'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'install a local package': function (browser) {
		
		browser
		.installLocalPackage(require('path').resolve(__dirname),"Orckestra.Demo.Contacts")
		
		browser
		.uninstallLocalPackage("Orckestra.Demo.Contacts")		
	},
	afterEach: function (browser, done) {
		done();
	}
}