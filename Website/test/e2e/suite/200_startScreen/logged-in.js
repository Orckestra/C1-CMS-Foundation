module.exports = {
	'Start screen does not show when already logged in': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		browser.page.appWindow().prepare();
		browser.refresh();
		browser.page.appWindow().enter();
		browser.page.startScreen()
			.assert.hidden('@startFrame');
	}
};
