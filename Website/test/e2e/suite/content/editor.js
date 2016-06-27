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
		browser
			.execute(function () {
				var element = document.querySelector('#tinymce > h1 > em');
				element.innerHTML = 'Jupiter';
			}, [], () => {
				// Approve the change
				content
					.selectFrame('#masterdialogset')
					.selectFrame('#visualeditor', true)
					.click('clickbutton[response="accept"]');
				// Close the properties dialog
				browser.topFrame();
				content
					.selectFrame('#renderingdialogpage')
					.verify.elementPresent('#renderingdialogpage')
					.verify.elementPresent('clickbutton[callbackid="buttonAccept"]')
					.verify.visible('#renderingdialogpage')
					.verify.visible('clickbutton[callbackid="buttonAccept"]')
					.click('clickbutton[callbackid="buttonAccept"]')
				browser
					.pause(3000)
				content
					// Close editor after you
					.enter()
					.section.docktabs.closeTab(2);
				// Check that the change is made
				browser.end();
			})
	}
};
