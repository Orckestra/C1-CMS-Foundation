module.exports = {
	'Can log in with correct credentials': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		login = browser.page.login();
		startScreen = browser.page.startScreen();
		login
			.setUsername('admin')
			.setPassword('123456')
			.click('@submitButton')
			.waitForElementNotVisible('@usernameField', 1000);
		// Check that start screen is shown
		browser.page.appWindow().enter();
		startScreen.waitForElementVisible('@startFrame', 2000);
	}
};
