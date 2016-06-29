module.exports = {
	'can edit front page': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		var editor = browser.page.editor();
		content
			.prepare()
			// Default situation: One open docktab showing content browser, with tab view.
			// Select the one open tab
			.section.docktabs.clickTab(1);
		content
			.enterFrame('@browserFrame')
			// Click edit button (identified by icon name)
			.click('toolbarbutton[image="page-edit-page"]')
			// Locate and check editor screen
			// Relies on it being inside the second docktab frame in existence.
			.enterTabFrame(2)
		// Enter frame with editor content
		editor
			.enter()
			// Check that it has more than just one entry
			.section.editorBody
			.assert.visible('img:nth-child(2)')
			// Select the first element
			.click('img:nth-child(1)')
			// Click the toolbar button for properties
		browser
			.selectFrame('toolbarbutton[cmd="compositeInsertRendering"]')
			.click('toolbarbutton[cmd="compositeInsertRendering"]')
			.pause(1000);
		// Click the edit HTML button
		content
			.selectFrame('#renderingdialogpage')
			.click('htmldatadialog')
		browser
			.pause(1000)
			// Find the editor in the dialog that just appeared
			.selectFrame('#masterdialogset')
			.enterFrame('iframe[src^="/Composite/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx"]')
		editor
			.selectFrame('@editorFrame', true)
			// Enter the editor frame
			.enter();
		// Edit its contents
		browser
			.assert.elementPresent('#tinymce > h1 > em')
			.replaceContent('#tinymce > h1 > em', 'Jupiter');
		// Approve the change
		content
			.selectFrame('#masterdialogset')
			.selectFrame('#visualeditor', true)
			.click('clickbutton[response="accept"]');
		// Close the properties dialog
		browser.topFrame();
		content
			.selectFrame('#renderingdialogpage')
			.waitForElementVisible('clickbutton[callbackid="buttonAccept"]', 1000)
			.click('clickbutton[callbackid="buttonAccept"] labelbox')
		browser.pause(500)
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
			.assert.containsText('div.jumbotron-content > h1 > em', 'Jupiter');
	},
	after: function (browser) {
		var content = browser.page.content();
		// Revert changes
		content
			.enter()
			.enterFrame('@browserFrame')
			.click('#moreactionsbutton')
			.click('menuitem[image="item-undo-unpublished-changes"]')
			.click('toolbarbutton[image="item-publish"]')
		browser.end();
	}
};
