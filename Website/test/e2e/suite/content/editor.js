module.exports = {
	'can open editor': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var content = browser.page.content();
		content
			.prepare()
			.section.docktabs.click('docktab:nth-of-type(1)'); // Select first tab
		content
			.enterFrame('@browserFrame')
			.click('toolbarbutton[image="page-edit-page"]') // Click edit button
			.leaveFrame()
			.waitForElementPresent('view:nth-of-type(2) window', 1000) // Locate and check editor screen - relies on it being the second ui:window tag in existence in this frame.
			.enterFrame('view:nth-of-type(2) window iframe')
			.waitForElementVisible('iframe[src="/Composite/content/misc/editors/visualeditor/visualeditor.aspx?config=common"]', 1000);
		browser.pause(500);
		content
			.selectFrame('#tinymce > img:nth-child(1)') // Find frame with editor content
			.verify.visible('#tinymce > img:nth-child(2)') // Check that it has more than just one entry
			.enter()
			.section.docktabs.closeTab(2);
		browser.end();
	}
};
