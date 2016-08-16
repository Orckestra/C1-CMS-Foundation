module.exports = {
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'can edit simple page': function (browser) {
		var content = browser.page.content();
		var editor = browser.page.editor();
		var systemView = browser.page.systemView();
		// Default situation: One open docktab showing content browser, with tab view.
		// Select the one open tab
		content
			.section.docktabs.clickTab(1);
		// Find the 'getting started' page in the system tree.
		systemView
			.enter()
			.openTreeNode('Venus Starter Site')
			.selectTreeNode('Getting Started')
			.leaveFrame()
		content
			// Click edit button
			.click('toolbarbutton[label="Edit Page"]')
			// Locate and check editor screen
			// Relies on it being inside the second docktab frame in existence.
			.enterTabFrame(2)
		// Change header in editor
		editor
			.changeElementContent('h1', 'Moving forward')
		browser.pause(100);
		// Save change.
        editor
			.save()
		content
			// Close editor after you
			.enter() // Reset to content frame
			.section.docktabs.closeTab(2);
		// Check that the change is made
		content
			.assertBrowserContains('div.content-column > h1', 'Moving forward');
	},
	afterEach: function (browser, done) {
		var content = browser.page.content();
		// Revert changes
		content
			.enter()
			.enterFrame('@browserFrame')
			// .click('#moreactionsbutton')
			.click('toolbarbutton[image="item-undo-unpublished-changes"]')
			.click('toolbarbutton[image="item-publish"]', done);
	}
}
