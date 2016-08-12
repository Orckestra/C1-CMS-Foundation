module.exports = {
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare();
	},
	'can edit front page': function (browser) {
		var content = browser.page.content();
		var editor = browser.page.editor();
		var systemView = browser.page.systemView();
		// Default situation: One open docktab showing content browser, with tab view.
		// Select the one open tab
		content
			.section.docktabs.clickTab(1);
		// Find the home page in the system tree.
		systemView
			.enter()
			.selectTreeNode('Venus Starter Site')
			.leaveFrame()
		content
			// Click edit button
			.click('toolbarbutton[label="Edit Page"]')
			// Locate and check editor screen
			// Relies on it being inside the second docktab frame in existence.
			.enterTabFrame(2)
		// Enter frame with editor content
		editor
			.enter()
			// Check that it has more than just one entry
			.section.editorBody
			.waitForElementVisible('img:nth-child(2)', 1000)
			// Select the first element
			.click('img:nth-child(1)')
		browser
			// Click the toolbar button for properties
			.clickInFrame('toolbarbutton[cmd="compositeInsertRendering"]', 1000)
			// Click the edit HTML button
			.clickInFrame('#renderingdialogpage', 'htmldatadialog', 1000)
		// Find the editor in the dialog that just appeared
		editor
			.selectFrame('#masterdialogset')
			.enterFrame('@wysiwygFrame')
			.selectFrame('@editorFrame', true)
			// Change the content
			.changeElementContent('h1 > em', 'Jupiter');
		// Approve the change
		browser
			.selectFrame('#masterdialogset')
			.selectFrame('#visualeditor', true)
			.click('clickbutton[response="accept"]');
		// Close the properties dialog
		browser
			.clickInFrame('#renderingdialogpage', 'clickbutton[callbackid="buttonAccept"]', 1000);
		// Save change.
		editor.save()
		// Close editor after you
		content
			.enter() // Reset to content frame
			.section.docktabs.closeTab(2);
		// Check that the change is made
		content
			.assertBrowserContains('div.jumbotron-content > h1 > em', 'Jupiter');
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
};
