module.exports = {
	elements: [
		{ appWindow: '#appwindow' },
		{ appFrame: '#appwindow iframe' }
	],
	commands: [
		{
			prepare: function () {
				this.api.page.login().fullLogin();
				this.api.page.startScreen().close();
				return this;
			},
			enter: function () {
				this.api
					.frame(null);
				this
					.waitForElementPresent('@appWindow', 1000)
					.getAttribute('@appFrame', 'id', function (result) {
						this.api.frame(result.value)
					}.bind(this));
				return this;
			}
		}
	]
};
