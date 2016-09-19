module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'can duplicate simple page': function (browser) {
		
		browser
		.selectPerspective("System")
		.openTreeNode("Available Packages")
		.openTreeNode("Composite.Tools")
		.selectTreeNodeAction("Composite.Tools.SqlServerDataProvider", "Install")
		.clickLabel("I accept the license agreement")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.clickDialogButton("Finish")
		
		browser
		.selectPerspective("System")
		.openTreeNode("Installed Packages")
		.openTreeNode("Composite.Tools")
		.assertTreeNodeHasChild("Composite.Tools","Composite.Tools.SqlServerDataProvider")
	},
	afterEach: function (browser, done) {
		done();
	}
}
