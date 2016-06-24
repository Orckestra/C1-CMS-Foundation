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
			// relies on it being the second ui:window tag in existence in this frame.
			.waitForElementPresent('view:nth-of-type(2) window', 1000)
			.enterFrame('view:nth-of-type(2) window iframe')
			.waitForElementVisible('iframe[src="/Composite/content/misc/editors/visualeditor/visualeditor.aspx?config=common"]', 1000);
		browser.pause(500);
		content
			// Find frame with editor content
			.selectFrame('#tinymce > img:nth-child(1)')
			// Check that it has more than just one entry
			.verify.visible('#tinymce > img:nth-child(2)')
			// Enter the element
			.click('#tinymce > img:nth-child(2)')
		browser
			.pause(3000)
		content
			// Close editor after you
			.enter()
			.section.docktabs.closeTab(2);
		browser.end();
	}
};
