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
				this.waitForElementPresent('@startFrame', 1000);
				this.api.pause(1000);
				// Enter the frame containing it
				this.getAttribute('@startFrame', 'id', function (result) {
					this.api.frame(result.value);
				}.bind(this));
				return this;
			},
			close: function () {
				this.enter();
				this.click('@closeButton');
			}
		}
	]
};
