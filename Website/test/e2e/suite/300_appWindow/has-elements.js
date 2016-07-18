module.exports = {
	'menu, explorer, stage': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var app = browser.page.appWindow()
		app.prepare()
			.enter()
			.assert.visible('@menu')
			.assert.visible('@explorer')
			.assert.visible('@stage');
	}
};
