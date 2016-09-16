const PERSPECTIVES = [
	'Content',
	'Media',
	'Data',
	'Layout',
	'Functions',
	'System'
]

module.exports = {
	'stages match explorer buttons': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var app = browser.page.appWindow();
		app.prepare().enter();

		PERSPECTIVES.forEach((perspective, index) => {
			var buttonSelector = 'explorertoolbarbutton[label="' + perspective + '"]';
			var stageSelector = 'stagedeck[data-qa="perspective' + perspective + '"]';
			browser
				.pause(1000)
				.click(buttonSelector)
				.waitForElementVisible(stageSelector, 5000);
		});
	}
};
