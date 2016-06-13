var clickButton = require('../findButton.js').click;
var tmpActionHandle = "actionTokenType='Composite\\.C1Console\\.Actions\\.Data\\.ProxyDataActionToken,Composite'actionToken='_ActionIdentifier_=\\'_ActionIdentifier_=\\\\\\'Edit\\\\\\'\\'_PermissionTypes_=\\'Edit\\'_DoIgnoreEntityTokenLocking_=\\'False\\''actionTokenHash='-1425725536'";


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

		clickButton(browser, tmpActionHandle);

		browser.pause(5000);

		// browser.getLog('browser', function(logEntriesArray) {
  	// 	logEntriesArray.forEach(function(log) {
    // 		console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
		// 	})
		// });
		browser
      .end();
	}
}
