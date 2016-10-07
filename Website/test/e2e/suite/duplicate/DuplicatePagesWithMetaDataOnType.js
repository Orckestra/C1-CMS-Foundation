module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	'can duplicate simple page with Metadata attached to page type': function (browser) {
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
		
		.selectPerspective("Layout")
		.openTreeNode("Page")
		.selectTreeNodeAction("Metadata Fields","Add Metadata Field")
		.clickDataBySibilings("Metadata type")
		.clickLabel("Human title")
		.setFieldValue("Programmatic name","newName")
		.setFieldValue("Show with label","newLabel")
		.clickDialogButton("Next")
		.setFieldValue("NewField", "newTextValue")
		.clickDialogButton("Finish")
				
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Getting Started","Edit Page")
		.selectContentTab("Metadata")
		.setFieldValueInFieldGroup("newLabel","NewField","anotherTextValue")
		.clickSave()
		.closeDocumentTab("Getting Started")
		
		.selectTreeNodeAction("Getting Started","Duplicate Page")
		.selectTreeNodeAction("Copy of Getting Started","Edit Page")
		.selectContentTab("Metadata")
		.assertFieldValue("newLabel","NewField","anotherTextValue")
		.closeDocumentTab("Copy of Getting Started")
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Getting Started","Undo Changes")
		.selectTreeNodeAction("Getting Started","Publish")
		.selectTreeNodeAction("Copy of Getting Started","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Copy of Getting Started")
		
		.selectPerspective("Layout")
		.openTreeNode("Metadata Fields")
		.selectTreeNodeAction("newName","Delete Metadata Field")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("newName")
		
		.selectPerspective("Data")
		.selectTreeNodeAction("newNamespace.myTypeName","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("newNamespace.myTypeName")
				
	},
	afterEach: function (browser, done) {
		done();
	}
}

