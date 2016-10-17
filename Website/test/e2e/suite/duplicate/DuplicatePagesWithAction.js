module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'asserts duplicated simple page contains application attached to original page but not the data': function (browser) {
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		.selectTreeNodeAction("Blog", "Duplicate Page")
		.assertTreeNodeHasChild('Websites', 'Venus Starter Site')
		.assertTreeNodeHasChild('Venus Starter Site')
		.assertTreeNodeHasChild('Venus Starter Site', 'Copy of Blog')
		.openTreeNode("Blog")
		.assertTreeNodeHasChild('Blog')
		.assertTreeNodeHasChild('Blog', 'Blog Entries')
		.openTreeNode('Blog','Blog Entries')
		.assertTreeNodeIsNotEmpty('Blog','Blog Entries')
		.openTreeNode('Copy of Blog')
		.assertTreeNodeHasChild('Copy of Blog')
		.assertTreeNodeHasChild('Copy of Blog', 'Blog Entries')
		.openTreeNode('Copy of Blog','Blog Entries')
		.assertTreeNodeIsEmpty('Copy of Blog','Blog Entries')
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Copy of Blog","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Copy of Blog")
	},
	afterEach: function (browser, done) {
		done();
	}
}
