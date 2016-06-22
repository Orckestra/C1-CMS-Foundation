module.exports = {
	elements: [
		{ browserFrame: 'iframe[src="/Composite/content/views/browser/browser.aspx"]' },
		{ treeFrame: 'iframe[src="/Composite/content/views/systemview/systemview.aspx"]' }
	],
	commands: [
		{
			prepare: function () {
				var app = this.api.page.appWindow();
				app.prepare()
					.enterPerspective('content');
				this
					.waitForElementVisible('@browserFrame', 2000)
					.enterFrame('@browserFrame');
			}
		}
	]
};
