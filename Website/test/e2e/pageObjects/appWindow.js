module.exports = {
	elements: [
		{ appWindow: '#appwindow' },
		{ appFrame: '#appwindow iframe' },
		{ menu: '#menubar' },
		{ explorer: '#explorer' },
		{ stage: '#stage' }
	],
	commands: [
		{
			prepare: function () {
				this.api.page.login().fullLogin();
				this.api.page.startScreen().close();
				this
					.topFrame()
					.waitForElementPresent('@appWindow', this.api.globals.timeouts.basic)
				return this;
			},
			enter: function () {
				this
					.topFrame()
					.waitForElementPresent('@appFrame', this.api.globals.timeouts.basic)
					.enterFrame('@appFrame');
				return this;
			}
		}
	]
};
