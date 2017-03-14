module.exports = {
	'@tags': ['create-data-types'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare("Content");
	},
	
	'Create Parent Global Data Type': function (browser) {
	
		// create a parent global data type
		browser
		.selectPerspective("Data")
		.selectTreeNodeAction("Global Datatypes", "Add Datatype")
		.selectDocumentTab("New Datatype")
		.setFieldValue("Title", "Parents")
		.setFieldValue("Type namespace", "Auto.Tests")
		.setFieldValue("Type name", "Parent")
		.selectContentTab("Fields")
		.clickLabel("Add New")
		.setFieldValue("Name", "MyStringField")
		.clickLabel("Add New")
		.setFieldValue("Name", "MyIntField")
		.clickDataBySibilings("Field type")
		.clickText("Integer")
		.clickLabel("Add New")
		.setFieldValue("Name", "MyDateTimeField")
		.clickDataBySibilings("Field type")
		.clickText("Date")
		.clickLabel("Add New")
		.clickSave()
		.closeDocumentTab("Parents")
		.assertTreeNodeHasChild("Global Datatypes","Auto.Tests.Parent")
		
		browser
		.logOut("admin")
	},
	
	'Add data items': function (browser) {
	
		browser
		.selectPerspective("Data")
		.selectTreeNodeAction("Auto.Tests.Parent", "Add Data")
		.selectDocumentTab("Parent")
		.setFieldValue("MyStringField", "Parent A")
		.setFieldValue("MyIntField", "100")
		.setFieldValue("MyDateTimeField", "12/31/2016")
		.setFieldValue("NewField", "Some text 1")
		.clickSave()
		.closeDocumentTab("Parent")
		.openTreeNode("Auto.Tests.Parent")
		.assertTreeNodeHasChild("Auto.Tests.Parent","Parent A")
		
		.selectTreeNodeAction("Auto.Tests.Parent", "Add Data")
		.selectDocumentTab("Parent")
		.setFieldValue("MyStringField", "Parent B")
		.setFieldValue("MyIntField", "1000")
		.setFieldValue("MyDateTimeField", "12/31/2018")
		.setFieldValue("NewField", "Some text 2")
		.clickSave()
		.closeDocumentTab("Parent")
		.openTreeNode("Auto.Tests.Parent")
		.assertTreeNodeHasChild("Auto.Tests.Parent","Parent B")
		
		.selectTreeNodeAction("Auto.Tests.Parent", "Add Data")
		.selectDocumentTab("Parent")
		.setFieldValue("MyStringField", "Parent C")
		.setFieldValue("MyIntField", "10000")
		.setFieldValue("MyDateTimeField", "12/31/2020")
		.setFieldValue("NewField", "Some text 3")
		.clickSave()
		.closeDocumentTab("Parent")
		.openTreeNode("Auto.Tests.Parent")
		.assertTreeNodeHasChild("Auto.Tests.Parent","Parent C")	
		
		browser
		.logOut("admin")	
	},

	'Duplicate data items': function (browser) {
	
		browser
		.selectPerspective("Data")
		.openTreeNode("Auto.Tests.Parent")
		.selectTreeNodeAction("Parent B", "Duplicate Data")
		.assertTreeNodeHasChild("Auto.Tests.Parent", "Copy of Parent B")
		
		browser
		.logOut("admin")
	},
	
	'Delete data items': function (browser) {
	
		browser
		.selectPerspective("Data")
		.openTreeNode("Auto.Tests.Parent")
		.selectTreeNodeAction("Parent B", "Delete Data")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Auto.Tests.Parent", "Parent B")
		
		browser
		.logOut("admin")
	},
	
	'Edit data items': function (browser) {
	
		browser
		.selectPerspective("Data")
		.openTreeNode("Auto.Tests.Parent")		
		.selectTreeNodeAction("Copy of Parent B", "Edit Data")
		.selectDocumentTab("Copy of Parent B")
		.setFieldValue("MyStringField", "Parent B new")
		.setFieldValue("MyIntField", "99")
		.setFieldValue("MyDateTimeField", "01/01/2017")
		.setFieldValue("NewField", "New text 1 edited")
		.clickSave()
		.closeDocumentTab("Copy of Parent B")
		.openTreeNode("Auto.Tests.Parent")
		.assertTreeNodeHasChild("Auto.Tests.Parent","Parent B new")
	
		browser
		.logOut("admin")
	},
	
	'Delete Parent Global Data Type': function (browser) {
	
		browser
		.selectPerspective("Data")
		.selectTreeNodeAction("Auto.Tests.Parent","Delete Datatype")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Auto.Tests.Parent")
	},
	
	afterEach: function (browser, done) {	    
		done();
	}
}

