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
					.waitForElementPresent('@appWindow', 10000)
				return this;
			},
			enter: function () {
				this
					.topFrame()
					.waitForElementPresent('@appFrame', 10000)
					.enterFrame('@appFrame');
				return this;
			}
		}
	]
};
