var selectFrame = require('../selectFrame.js');

module.exports = {
	'Demo test login' : function (browser) {
    browser
      .url('http://localhost:57917/Composite/top.aspx?mode=develop')
      .waitForElementVisible('#id_username', 1000)
			// .setValue('#id_username > box > input', 'admin')
			// .setValue('#id_password > box > input', '123456')
      .click('#loginButton')
      .pause(1000)
			.assert.visible('#appwindow');

			browser
				.execute(function () {
					EventBroadcaster.broadcast ( BroadcastMessages.STOP_COMPOSITE );
			}).pause(1000);

		selectFrame(browser, '#tree treenode labelbox', function () {
			browser.click('#tree treenode labelbox').pause(5000);
		});

		// browser.getLog('browser', function(logEntriesArray) {
  	// 	logEntriesArray.forEach(function(log) {
    // 		console.log('[' + log.level + ']: ' + log.timestamp + ':\n' + log.message + '\n');
		// 	})
		// });
		browser
      .end();
	}
}
