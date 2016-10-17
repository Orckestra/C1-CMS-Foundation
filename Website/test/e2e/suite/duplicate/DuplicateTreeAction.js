module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'can use duplicate action on tree': function (browser) {
		browser
		.selectPerspective("System")
		.openTreeNode("/")
		.openTreeNode("App_Data")
		.openTreeNode("App_Data","Composite")
		.openTreeNode("TreeDefinitions")
		.selectTreeNodeAction("Composite.Community.Blog.Entries.xml","Edit File")
		.replaceTextInCodeMirror('<EditDataAction Label="Edit Blog Entry" />','<DuplicateDataAction Label="Duplicate Blog Entry" />')
		.clickSave()
		.closeDocumentTab("Composite.Community.Blog.Entries.xml")
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.openTreeNode("Blog")
		.openTreeNode("Blog Entries")
		.openTreeNode("2014 June")
		.selectTreeNodeAction("About this blog","Duplicate Blog Entry")
		.assertTreeNodeHasChild("2014 June","Copy of About this blog")
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Copy of About this blog","Delete Blog Entry")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("2014 June","Copy of About this blog")
		.selectPerspective("System")
		.selectTreeNodeAction("Composite.Community.Blog.Entries.xml","Edit File")
		.replaceTextInCodeMirror('<DuplicateDataAction Label="Duplicate Blog Entry" />','<EditDataAction Label="Edit Blog Entry" />')
		.clickSave()
		.closeDocumentTab("Composite.Community.Blog.Entries.xml")
		
	},
	afterEach: function (browser, done) {
		done();
	}
}
