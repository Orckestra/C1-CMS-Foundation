module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'can duplicate simple page with Metadata attached': function (browser) {
		browser
		.selectPerspective("Data")
		.selectTreeNodeAction("Page Metatypes", "Add Metatype")
		.selectDocumentTab("New Page Metatype")
		.setFieldValue("Title", "Human title")
		.setFieldValue("Type namespace", "newNamespace")
		.setFieldValue("Type name", "myTypeName")
		.selectContentTab("Fields")
		.clickLabel("Add New")
		.clickSave()
		.closeDocumentTab("New Page Metatype")
		.assertTreeNodeHasChild("Page Metatypes","newNamespace.myTypeName")
		
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Getting Started","Add Metadata Field")
		.clickDialogButton("Next")
		.clickDialogButton("Next")
		.setFieldValue("NewField", "newTextValue")
		.clickDialogButton("Finish")
		
		.selectTreeNodeAction("Getting Started","Duplicate Page")
		.selectTreeNodeAction("Copy of Getting Started","Edit Page")
		.selectContentTab("Metadata")
		.assertFieldValue("Human title","NewField","newTextValue")
		.closeDocumentTab("Copy of Getting Started")
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Getting Started","Remove Metadata Field")
		.clickDialogButton("OK")
		.selectTreeNodeAction("Copy of Getting Started","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Copy of Getting Started")
		.selectPerspective("Data")
		.selectTreeNodeAction("newNamespace.myTypeName","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("newNamespace.myTypeName")
		
					
	},
	afterEach: function (browser, done) {
		done();
	}
}

