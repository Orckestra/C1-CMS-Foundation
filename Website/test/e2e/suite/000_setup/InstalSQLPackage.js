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
		.pause(2000)
		
		browser
		.selectPerspective("System")
		.openTreeNode("Packages","Installed Packages")
		.openTreeNode("Installed Packages","Composite.Tools")
		.assertTreeNodeHasChild("Composite.Tools","Composite.Tools.SqlServerDataProvider")
		
		.openTreeNode("/")
		.openTreeNode("Composite")
		.openTreeNode("Composite","InstalledPackages")
		.openTreeNode("InstalledPackages","content")
		.openTreeNode("content","views")
		.openTreeNode("views","Composite.Tools.SqlServerDataProvider")
		.selectTreeNodeAction("SqlServerDataProvider.aspx.cs","Edit File")
		.replaceTextInCodeMirror('ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);','//ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);')
		.clickSave()
		.closeDocumentTab("SqlServerDataProvider.aspx.cs")
		
		.selectTreeNodeAction("SqlServer Data Provider","Convert to SQL")
		.selectDocumentTab("Convert to SQL")
		.setFieldValue("Connection String:",browser.globals.connectionString)
		.submitFormData('Next')
		.submitFormData('Finish')
		.waitForDialog(browser.globals.timeouts.save)
		.refresh()
				
	},
	afterEach: function (browser, done) {
		done();
	}
}
