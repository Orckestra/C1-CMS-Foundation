module.exports = {
	elements: [
		{ startFrame: 'window[url="/Composite/content/views/start/start.aspx"] iframe' },
		{ closeButton: '#closecontrol' }
	],
	commands: [
		{
			prepare: function () {
				this.api.page.login().fullLogin();
				this.api.page.appWindow().enter(); // Start page shows inside appwindow.
				return this;
			},
			enter: function () {
				this.api.page.appWindow().enter(); // Start page shows inside appwindow.
				this.waitForElementPresent('@startFrame', this.api.globals.timeouts.basic);
				this.enterFrame('@startFrame'); // Enter the frame containing it
				return this;
			},
			close: function () {
				this.enter();
				this.click('@closeButton');
			}
		}
	]
};
