var selectFrame = require('../selectFrame.js');

module.exports = {
	'Demo test login' : function (browser) {
    browser
      .url('http://localhost:57917/Composite/top.aspx?mode=develop')
    	.page.login()
			.isShown()
			.setUsername('admin')
			.setPassword('123456')
			.click('@submitButton')
			.waitForElementNotVisible('@usernameField', 1000);
		browser
			.assert.visible('#appwindow')
			.execute(function () {
				EventBroadcaster.broadcast ( BroadcastMessages.STOP_COMPOSITE );
			})
			.pause(1000);

		var treeNode;
		selectFrame(browser, '#tree treenode labelbox', function () {
			browser.click('#tree treenode labelbox');
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
