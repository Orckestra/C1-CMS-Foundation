module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'can duplicate simple page': function (browser) {
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Getting Started", "Duplicate Page")
		.assertTreeNodeHasChild('Websites', 'Venus Starter Site')
		.assertTreeNodeHasChild('Venus Starter Site', 'Copy of Getting Started');
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Copy of Getting Started","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Copy of Getting Started")
	},
	afterEach: function (browser, done) {
		done();
	}
}
