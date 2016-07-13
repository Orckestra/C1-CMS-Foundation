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
			// Chack that it is editable
			.assert.attributeEquals('body', 'contenteditable', 'true')
			// Check that it has content
			.section.editorBody
			.assert.visible('h1')
			// Change header
			.replaceContent('h1', 'Moving forward')
		// Save change.
		content
			.selectFrame('#savebutton')
			.verify.cssClassNotPresent('#savebutton', 'isdisabled')
			.click('#savebutton > labelbox');
		browser
			.pause(1000)
		content
			.verify.cssClassPresent('#savebutton', 'isdisabled')
			// Close editor after you
			.enter() // Reset to content frame
			.section.docktabs.closeTab(2);
		// Check that the change is made
		content
			.enterFrame('@browserFrame')
			.waitForElementVisible('#browsertabbox iframe', 1000)
			.waitForFrameLoad('#browsertabbox iframe', 1000)
			.enterFrame('#browsertabbox iframe')
			// The below fails if page starts out with unpublished changes.
			.assert.containsText('div.content-column > h1', 'Moving forward');
		browser
			.pause(2000);
	},
	after: function (browser) {
		var content = browser.page.content();
		// Revert changes
		content
			.enter()
			.enterFrame('@browserFrame')
			.click('#moreactionsbutton')
			.click('menuitem[image="item-undo-unpublished-changes"]')
			.click('toolbarbutton[image="item-publish"]');
		browser.end();
	}
}
