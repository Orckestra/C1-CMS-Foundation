module.exports = {
	'can open editor': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare()
			// Select first tab
			.section.docktabs.click('docktab:nth-of-type(1)');
		content
			.enterFrame('@browserFrame')
			// Click edit button (identified by icon name)
			.click('toolbarbutton[image="page-edit-page"]')
			.leaveFrame()
			// Locate and check editor screen
			// relies on it being inside the second ui:view tag in existence in the content frame.
			.waitForElementPresent('view:nth-of-type(2) window', 1000)
			.enterFrame('view:nth-of-type(2) window iframe')
			.waitForElementVisible('iframe[src="/Composite/content/misc/editors/visualeditor/visualeditor.aspx?config=common"]', 1000)
			.waitForFrameLoad('iframe[src="/Composite/content/misc/editors/visualeditor/visualeditor.aspx?config=common"]', 1000);
		content
			// Find frame with editor content
			.selectFrame('#tinymce > img:nth-child(1)')
			// Check that it has more than just one entry
			.verify.visible('#tinymce > img:nth-child(2)')
			// Select the first element
			.click('#tinymce > img:nth-child(1)')
			// Click the toolbar button for properties
			.selectFrame('toolbarbutton[cmd="compositeInsertRendering"]')
			.click('toolbarbutton[cmd="compositeInsertRendering"]')
			.api.pause(1000);
		// Click the edit HTML button
		content
			.selectFrame('#renderingdialogpage')
			.click('htmldatadialog')
			.api.pause(1000);
		// Find and enter the editor in the dialog that just appeared
		content
			.selectFrame('#masterdialogset')
			.selectFrame('#visualeditor', true)
			.selectFrame('body#tinymce', true);
		// Edit its contents
		browser.replaceContent('#tinymce > h1 > em', 'Jupiter');
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
			.selectFrame('#savebutton');
		content
			.getAttribute('#savebutton', 'isdisabled', function (result) {
				browser.verify.equal(null, result.value);
			});
		content
			.click('#savebutton > labelbox');
		browser
			.pause(1000)
		content
			.getAttribute('#savebutton', 'isdisabled', function (result) {
				browser.verify.equal('true', result.value);
			});
		content
			// Close editor after you
			.enter()
			.section.docktabs.closeTab(2);
		// Check that the change is made
		browser
			.pause(3000)
		content
			.enterFrame('@browserFrame')
			.waitForElementVisible('#browsertabbox iframe', 1000)
			.enterFrame('#browsertabbox iframe')
			// The below fails if page starts out with unpublished changes.
			.assert.containsText('div.jumbotron-content > h1 > em', 'Jupiter');
		browser.end();
	}
};
