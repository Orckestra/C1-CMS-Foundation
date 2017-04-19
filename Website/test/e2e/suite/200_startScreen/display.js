module.exports = {
	'Start screen shows, includes close button': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var startScreen = browser.page.startScreen();
		startScreen.prepare()
			.enter()
			.assert.visible('@closeButton');
	}
};
