module.exports = {
	'Development mode has prefilled credentials': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx?mode=develop');
		login = browser.page.login();
		login.getAttribute('@usernameInput', 'value', function (result) {
			browser.assert.equal(result.value, 'admin');
		});
		login.getAttribute('@passwordInput', 'value', function (result) {
			browser.assert.equal(result.value, '123456');
		});

		browser.end();
	}
};
