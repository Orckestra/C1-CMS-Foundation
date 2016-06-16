module.exports = {
	elements: [
		{ startFrame: 'window[url="/Composite/content/views/start/start.aspx"] iframe' },
		{ closeButton: '#closecontrol' }
	],
	commands: [
		{
			enter: function () {
				this.api.page.appWindow().enter(); // Start page shows inside appwindow.
				this.waitForElementPresent('@startFrame', 1000);
				this.api.pause(1000);
				// Enter the frame containing it
				this.getAttribute('@startFrame', 'id', function (result) {
					this.api.frame(result.value);
				}.bind(this));
			},
			close: function () {
				this.enter();
				this.click('@closeButton');
			},
			isShown: function () {
				this.api.page.appWindow().enter(); // Start page shows inside appwindow.
				this.assert.visible('@startFrame');
			},
			isHidden: function () {
				this.api.page.appWindow().enter(); // Start page shows inside appwindow.
				this.assert.hidden('@startFrame');
			}
		}
	]
};
