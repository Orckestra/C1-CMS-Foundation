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
					.waitForElementPresent('@appWindow', 1000)
				return this;
			},
			enter: function () {
				this
					.topFrame()
					.enterFrame('@appFrame');
				return this;
			}
		}
	]
};
