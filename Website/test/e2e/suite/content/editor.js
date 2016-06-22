module.exports = {
	'can edit page': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var editor = browser.page.editor();
		editor.prepare()
			.enterFrame('@treeFrame');
		browser.end();
	}
};
