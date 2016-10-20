module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'Click Bundled Action': function (browser) {
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Getting Started", "Add Blog", "Add Page")
		.setFieldValue("Page title", "New Blog")
		.clickDialogButton("Finish")
		.selectDocumentTab("Content")
		.closeDocumentTab("New Blog")
		.assertTreeNodeHasChild("Getting Started","New Blog")
		
		.selectTreeNodeAction("New Blog","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("New Blog")
				
	},
	afterEach: function (browser, done) {
		done();
	}
}

