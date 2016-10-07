module.exports = {
	'@tags': ['Duplicate'],
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'asserts duplicated simple page contains Data Folder attached to original page but not the data': function (browser) {
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Venus Starter Site", "Duplicate Page")
		.assertTreeNodeHasChild('Websites', 'Venus Starter Site')
		.assertTreeNodeHasChild('Websites', 'Copy of Venus Starter Site')
		.openTreeNode('Venus Starter Site')
		.assertTreeNodeHasChild('Venus Starter Site', 'Top links')
		.openTreeNode('Venus Starter Site','Top links')
		.assertTreeNodeIsNotEmpty('Venus Starter Site','Top links')
		.openTreeNode('Copy of Venus Starter Site')
		.assertTreeNodeHasChild('Copy of Venus Starter Site', 'Top links')
		.openTreeNode('Copy of Venus Starter Site', 'Top links')
		.assertTreeNodeIsEmpty('Copy of Venus Starter Site', 'Top links')
		
		browser
		.selectPerspective("Content")
		.selectTreeNodeAction("Copy of Venus Starter Site","Delete")
		.clickDialogButton("OK")
		.assertTreeNodeHasNoChild("Copy of Venus Starter Site")
		
				
	},
	afterEach: function (browser, done) {
		done();
	}
}
