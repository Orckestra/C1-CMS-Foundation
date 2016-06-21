module.exports = {
	'stages match explorer buttons': function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx');
		var app = browser.page.appWindow();
		app.prepare().enter();
		browser.elements('css selector', '#explorer explorertoolbarbutton', function (result) {
			var explorerButtons = result.value;
			browser.elements('css selector', '#stagedecks stagedeck', function (result) {
				var stages = result.value;
				browser.assert.equal(explorerButtons.length, stages.length);
				explorerButtons.forEach(function (button, index) {
					browser.elementIdAttribute(button.ELEMENT, 'id', function (result) {
						var buttonId = '#' + result.value;
						browser.elementIdAttribute(stages[index].ELEMENT, 'id', function (result) {
							var stageId = '#' + result.value;
							browser
								.click(buttonId)
								.waitForElementVisible(stageId, 2000);
						});
					});
				});
			});
		});
		browser.end();
	}
};
