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
					.enter()
					.click('#explorer explorertoolbarbutton[data-qa="Content"]')
					.waitForFrameLoad('#stagedecks stagedeck[data-qa="perspectiveContent"] iframe', 1000)
					.enterFrame('#stagedecks stagedeck[data-qa="perspectiveContent"] iframe');
				return this;
			},
			prepare: function () {
				this.api.page.appWindow().prepare();
				this
					.enter()
					.waitForElementVisible('@browserFrame', 2000)
					.waitForFrameLoad('@browserFrame', 1000);
				return this;
			},
			enterTabFrame: function (index) {
				this
					.enter()
					.waitForElementPresent('view:nth-of-type(' + index + ') window', 1000)
					.waitForFrameLoad('view:nth-of-type(' + index + ') window iframe', 1000)
					.enterFrame('view:nth-of-type(' + index + ') window iframe')
				return this;
			},
			assertBrowserContains: function (selector, value) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', 1000)
					.waitForFrameLoad('#browsertabbox iframe', 1000)
					.enterFrame('#browsertabbox iframe')
					.assert.containsText(selector, value);
				return this;
			},
			assertBrowserUrl: function (url) {
				var urlRegex = new RegExp(url.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&') + '$');
				this
					.enter()
					.enterFrame('@browserFrame')
					.expect.element('#addressbar input').value
					.to.match(urlRegex);
				return this;
			}
		}
	]
};
