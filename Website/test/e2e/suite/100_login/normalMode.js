module.exports = {
	'Normal mode does not have prefilled credentials': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		login = browser.page.login();
		login.assert.value('@usernameInput', '');
		login.assert.value('@passwordInput', '');
	}
};
