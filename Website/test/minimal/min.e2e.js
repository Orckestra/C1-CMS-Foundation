var selectFrame = require('../selectFrame.js');

module.exports = {
	'Demo test login' : function (browser) {
    browser
      .url('http://localhost:57917/Composite/top.aspx');
    browser.page.login().fullLogin();
		browser.page.startScreen().close();

		browser.pause(1000);
		browser.page.appWindow().enter();
		browser.assert.hidden('window[url="/Composite/content/views/start/start.aspx"] iframe');

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
