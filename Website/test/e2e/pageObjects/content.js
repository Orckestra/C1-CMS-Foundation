module.exports = {
	sections: {
		docktabs: {
			selector: 'dock[reference="main"] docktabs',
			commands: [{
				clickTab: function (index) {
					this.click('docktab:nth-of-type(' + index + ')');
				},
				closeTab: function (index) {
					this.click('docktab:nth-of-type(' + index + ') control[controltype="close"]');
				}
			}]
		}
	},
	elements: [
		{ browserFrame: 'iframe[src="/Composite/content/views/browser/browser.aspx"]' }
	],
	commands: [
		{
			enter: function () {
				this.api.page.appWindow()
					.enterPerspective('content');
				return this;
			},
			prepare: function () {
				this.api.page.appWindow().prepare();
				this
					.enter()
					.waitForElementVisible('@browserFrame', 2000)
					.waitForFrameLoad('@browserFrame', 1000);
				return this;
			}
		}
	]
};
