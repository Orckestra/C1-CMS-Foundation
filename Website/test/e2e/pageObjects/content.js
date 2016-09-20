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
			enter: function (perspective) {
				if(perspective==null){
					perspective = "Content"; // for backward compatibility
				}
				this.api.page.appWindow()
					.enter()
					.waitForElementNotPresent('dialogcover[display="block"]', 10000)
					.assert.elementPresent('#explorer explorertoolbarbutton[label="'+perspective+'"]')
					.api.pause(200)
					.click('#explorer explorertoolbarbutton[label="'+perspective+'"]')
					.waitForFrameLoad('#stagedecks stagedeck[data-qa*="'+perspective+'"] iframe', 10000)
					.enterFrame('#stagedecks stagedeck[data-qa*="'+perspective+'"] iframe');
				return this;
			},
			enterActivePerspective: function () {
				this.api.page.appWindow()
					.enter()
					.enterFrame('#stagedecks stagedeck[selected="true"] iframe');					
				return this;
			},
			prepare: function (perspective) {
				this.api.page.appWindow().prepare();
				this
					.enter(perspective)
					.waitForElementVisible('@browserFrame', 10000)
					.waitForFrameLoad('@browserFrame', 10000);
				return this;
			},
			enterTabFrame: function (index) {
				this
					.enter()
					.waitForElementPresent('view:nth-of-type(' + index + ') window', 10000)
					.waitForFrameLoad('view:nth-of-type(' + index + ') window iframe', 10000)
					.enterFrame('view:nth-of-type(' + index + ') window iframe')
				return this;
			},
			_assertBrowserContains: function (selector, value) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', 10000)
					.waitForFrameLoad('#browsertabbox iframe', 10000)
					.enterFrame('#browsertabbox iframe')
					.assert.containsText(selector, value);
				return this;
			},
			_assertBrowserContainsWithXpath: function (selector) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', 10000)
					.waitForFrameLoad('#browsertabbox iframe', 10000)
					.enterFrame('#browsertabbox iframe')
					.useXpath()
					.assert.elementPresent(selector);
				return this;
			},
			_assertBrowserContainsAttribute: function (selector,attribiute, value) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', 10000)
					.waitForFrameLoad('#browsertabbox iframe', 10000)
					.enterFrame('#browsertabbox iframe')
					.assert.attributeContains(selector,attribiute, value)
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
