module.exports = {
	'@tags': ['Content'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();	
	},
	'can add component and set it\'s function parameters': function (browser) {
		browser
		.selectPerspective("System")
		.openTreeNode("/")
		.openTreeNode("App_Data")
		.selectTreeNodeAction("Components","Upload File")
		.setFileFieldValue("Select file", require('path').resolve(__dirname + '/function-set-params.xml'))
		.clickDialogButton("OK")
		.assertTreeNodeHasChild("Components","function-set-params.xml")
		
		.selectPerspective("Content")	
		.selectTreeNodeAction("Venus Starter Site", "Edit Page")
		.page.editor()
			.selectContent(1)
			.clickLabel("${string:Composite.Web.VisualEditor:Components.LaunchButton.Label}")
			.pause(browser.globals.timeouts.basic)
			.clickText("function-set-params")
			.clickText("OK")
			.pause(browser.globals.timeouts.basic)
			.clickDataBySibilings("Text")
			.changeElementContent('h1', 'Some Title')
			.acceptChanges()
			.clickDialogButton("${string:Website.Dialogs.LabelAccept}")
		.clickSave()
		.closeDocumentTab("Venus Starter Site")
		.assertBrowserContains('div.image-and-text h1', 'Some Title')
		
		.selectPerspective("Content")
		.selectTreeNodeAction("Venus Starter Site","Undo Changes")
		.selectTreeNodeAction("Venus Starter Site","Publish")
		.assertBrowserContains('div.jumbotron-content > h1 > em', 'Venus')
		
		.selectPerspective("System")
		.selectTreeNodeAction("function-set-params.xml","Delete File")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Components","function-set-params.xml")
	},
	afterEach: function (browser, done) {
		done();
	}
}
