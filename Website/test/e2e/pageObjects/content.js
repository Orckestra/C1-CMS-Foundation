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
        perspective = perspective || "Content"; // for backward compatibility

				var perspectiveButton = '#explorer explorertoolbarbutton[label="'+perspective+'"]';
				var perspectiveFrame = '#stagedecks stagedeck[data-qa*="'+perspective+'"] iframe';

				this.api.page.appWindow()
					.enter()
					.waitForElementNotPresent('dialogcover[hidden="true"]', this.api.globals.timeouts.basic);

				this.api.pause(1000);

				this.api.page.appWindow()
					.waitForElementPresent(perspectiveButton, this.api.globals.timeouts.basic)
					.click(perspectiveButton)
					.waitForFrameLoad(perspectiveFrame, this.api.globals.timeouts.basic)
					.enterFrame(perspectiveFrame);
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
					.waitForElementVisible('@browserFrame', this.api.globals.timeouts.basic)
					.waitForFrameLoad('@browserFrame', this.api.globals.timeouts.basic);
				return this;
			},
			waitForBrowserFrame: function (perspective) {
				perspective = perspective || "Content"; // for backward compatibility
				this
					.enter(perspective)
					.waitForElementVisible('@browserFrame', this.api.globals.timeouts.basic)
					.waitForFrameLoad('@browserFrame', this.api.globals.timeouts.basic);
				return this;
			},
			enterTabFrame: function (index) {
				this
					.enter()
					.waitForElementPresent('view:nth-of-type(' + index + ') window', this.api.globals.timeouts.basic)
					.waitForFrameLoad('view:nth-of-type(' + index + ') window iframe', this.api.globals.timeouts.basic)
					.enterFrame('view:nth-of-type(' + index + ') window iframe')
				return this;
			},
			_assertBrowserContains: function (selector, value) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', this.api.globals.timeouts.basic)
					.waitForFrameLoad('#browsertabbox iframe', this.api.globals.timeouts.basic)
					.enterFrame('#browsertabbox iframe')
					.assert.containsText(selector, value);
				return this;
			},
			_assertBrowserContainsWithXpath: function (selector) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', this.api.globals.timeouts.basic)
					.waitForFrameLoad('#browsertabbox iframe', this.api.globals.timeouts.basic)
					.enterFrame('#browsertabbox iframe')
					.useXpath()
					.assert.elementPresent(selector);
				return this;
			},
			_assertBrowserContainsAttribute: function (selector,attribiute, value) {
				this
					.enter()
					.enterFrame('@browserFrame')
					.waitForElementVisible('#browsertabbox iframe', this.api.globals.timeouts.basic)
					.waitForFrameLoad('#browsertabbox iframe', this.api.globals.timeouts.basic)
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
