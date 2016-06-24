const PERSPECTIVES = {
	content: 1,
	media: 2,
	data: 3,
	layout: 4,
	functions: 5,
	systems: 6
}

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
			},
			enterPerspective: function (id) {
				if (typeof id === 'string') {
					id = PERSPECTIVES[id];
				}
				this
					.enter()
					.click('#explorer explorertoolbarbutton:nth-of-type(' + id + ')')
					.waitForElementVisible('#stagedecks stagedeck:nth-child(' + id + ')', 1000)
					.enterFrame('#stagedecks stagedeck:nth-child(' + id + ') iframe');
				return this;
			}
		}
	]
};
