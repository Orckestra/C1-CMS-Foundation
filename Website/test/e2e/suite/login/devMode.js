module.exports = {
	'Development mode has prefilled credentials': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx?mode=develop');
		login = browser.page.login();
		login.assert.value('@usernameInput', 'admin');
		login.assert.value('@passwordInput', '123456');
	}
};
