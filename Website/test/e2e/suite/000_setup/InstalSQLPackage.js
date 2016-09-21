module.exports = {
	'@tags': ['InstallSql'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'Install SQL Package': function (browser) {
		
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
		.openTreeNode("Packages","Installed Packages")
		.openTreeNode("Installed Packages","Composite.Tools")
		.assertTreeNodeHasChild("Composite.Tools","Composite.Tools.SqlServerDataProvider")
		
		.selectTreeNodeAction("SqlServer Data Provider","Convert to SQL")
		.selectDocumentTab("Convert to SQL")
		.setFieldValue("Connection String:",browser.globals.connectionString)
		.submitFormData('Next')
		.submitFormData('Finish')
		.selectFrameWithXpath('//*[local-name()="span"][contains(.,"completed")]')
		.useXpath()
		.waitForElementPresent('//*[local-name()="span"][contains(.,"completed")]',browser.globals.timeouts.save)
				
	},
	afterEach: function (browser, done) {
		done();
	}
}
