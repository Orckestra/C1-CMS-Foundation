var selectFrame = require('../selectFrame.js');

module.exports = {
	'Demo test login' : function (browser) {
    browser.url('http://localhost:57917/Composite/top.aspx');
    browser.page.login().fullLogin();
		var startScreen = browser.page.startScreen()
		startScreen.isShown();
		startScreen.close();

		browser.pause(1000);
		startScreen.isHidden();

		var treeNode;
		selectFrame(browser, '#tree treenode labelbox', function () {
			browser.click('#tree treenode labelbox');
		});

		// browser.getLog('browser', function(logEntriesArray) {
  	// 	logEntriesArray.forEach(function(log) {
    // 		console.log('[' + log.level + ']: ' + log.timestamp + ':\n' + log.message);
		// 	})
		// });
		browser
      .end();
	}
}
