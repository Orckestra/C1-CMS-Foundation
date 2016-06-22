module.exports = {
	'can edit page': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var app = browser.page.appWindow();
		app.prepare()
			.enterPerspective('content')
			.waitForElementVisible('iframe[src="/Composite/content/views/browser/browser.aspx"]', 2000);

		browser.end();
	}
};
