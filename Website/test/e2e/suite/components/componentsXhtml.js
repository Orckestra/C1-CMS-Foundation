module.exports = {
	'@tags': ['Content'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();	
	},
	'can add simple component': function (browser) {
		browser
		.selectPerspective("System")
		.openTreeNode("/")
		.openTreeNode("App_Data")
		.selectTreeNodeAction("Components","Upload File")
		.setFileFieldValue("Select file", require('path').resolve(__dirname + '/xhtml-Simple.xml'))
		.clickDialogButton("OK")
		.assertTreeNodeHasChild("Components","xhtml-Simple.xml")
		
		.selectPerspective("Content")	
		.selectTreeNodeAction("Venus Starter Site", "Edit Page")
		.page.editor()
			.selectContent(1)
			.clickLabel("${string:Composite.Web.VisualEditor:Components.LaunchButton.Label}")
			.pause(browser.globals.timeouts.basic)
			.clickText("xhtml-Simple")
			.clickText("OK")
		.clickSave()
		.closeDocumentTab("Venus Starter Site")
		.assertBrowserContains('div.container > h1', 'Simple content')
		
		.selectPerspective("Content")
		.selectTreeNodeAction("Venus Starter Site","Undo Changes")
		.selectTreeNodeAction("Venus Starter Site","Publish")
		.assertBrowserContains('div.jumbotron-content > h1 > em', 'Venus')
		
		.selectPerspective("System")
		.selectTreeNodeAction("xhtml-Simple.xml","Delete File")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Components","xhtml-Simple.xml")
	},
	afterEach: function (browser, done) {
		done();
	}
}
