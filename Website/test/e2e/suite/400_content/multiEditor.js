module.exports = {
	'@tags': ['Content'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();	
	},
	'can edit front page': function (browser) {
		browser
		.selectPerspective("Content")	
		.selectTreeNodeAction("Venus Starter Site", "Edit Page")
		.page.editor()
			.selectEditOnContent(1)
			.clickDataBySibilings("Statement content")
			.changeElementContent('h1 > em', 'Jupiter')
			.acceptChanges()
			.clickDataBySibilings("Background Image")
			.clickLabel("Select…")
			.clickLabel("Copenhagen","Media Archive")
			.clickLabel("Botanical_Garden__Photographer_Ty_Stange.jpg")
			.acceptChanges()
			.acceptFunctionEdit()
		.clickSave()
		.closeDocumentTab("Venus Starter Site")
		.assertBrowserContains('div.jumbotron-content > h1 > em', 'Jupiter')
		.assertBrowserContainsAttribute('div.jumbotron', 'style', 'Botanical_Garden__Photographer_Ty_Stange.jpg')
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Venus Starter Site","Undo Changes")
		.selectTreeNodeAction("Venus Starter Site","Publish")
		.assertBrowserContains('div.jumbotron-content > h1 > em', 'Venus')
		.assertBrowserContainsAttribute('div.jumbotron', 'style', '5.jpg')
	},
	afterEach: function (browser, done) {
		done();
	}
}
