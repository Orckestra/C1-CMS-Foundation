module.exports = {
	before: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var systemView = browser.page.systemView();
		systemView
			.prepare();
	},
	'can edit simple page': function (browser) {
		var content = browser.page.content();
		var systemView = browser.page.systemView();
		var editor = browser.page.editor();
		systemView
			.enterFrame('@systemFrame')
			.openTreeNode('Venus Starter Site')
			.selectTreeNode('Getting Started');
		content
			.enter()
			.enterFrame('@browserFrame')
			// Click edit button (identified by icon name)
			.click('toolbarbutton[image="page-edit-page"]')
			// Locate and check editor screen
			// Relies on it being inside the second docktab frame in existence.
			.enterTabFrame(2)
		// Enter frame with editor content
		editor
			.enter()
			// Check that it has content
			.section.editorBody
			.assert.visible('h1');
		browser
			.pause(2000);
		content
			.enter()
			.section.docktabs.closeTab(2);
	},
	after: function (browser) {
		var content = browser.page.content();
		// Revert changes
		// content
			// .enter()
			// .enterFrame('@browserFrame')
			// .click('#moreactionsbutton')
			// .click('menuitem[image="item-undo-unpublished-changes"]')
			// .click('toolbarbutton[image="item-publish"]');
		browser.end();
	}
}
