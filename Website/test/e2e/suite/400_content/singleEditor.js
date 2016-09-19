module.exports = {
	'@tags': ['Content'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();	
	},
	'can edit simple page': function (browser) {
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Getting Started", "Edit Page")
		.page.editor()
			.changeElementContent('h1', 'Moving forward')
		.clickSave()
		.closeDocumentTab("Getting Started")
		.assertBrowserContains('div.content-column > h1', 'Moving forward')
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Getting Started","Undo Changes")
		.selectTreeNodeAction("Getting Started","Publish")
		.assertBrowserContains('div.content-column > h1', 'Getting Started')
	},
	afterEach: function (browser, done) {
		done();
	}
}
