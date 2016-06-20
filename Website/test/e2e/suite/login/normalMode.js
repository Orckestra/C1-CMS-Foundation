module.exports = {
	'Normal mode does not have prefilled credentials': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		login = browser.page.login();
		login.getAttribute('@usernameInput', 'value', function (result) {
			browser.assert.equal(result.value, '');
		});
		login.getAttribute('@passwordInput', 'value', function (result) {
			browser.assert.equal(result.value, '');
		});

		browser.end();
	}
};
