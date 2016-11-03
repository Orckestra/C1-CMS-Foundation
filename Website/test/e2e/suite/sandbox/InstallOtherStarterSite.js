var resetSite = require('../../reset.js');

module.exports = {
	'@tags': ['install'],
	beforeEach: function (browser) {
	// 0 Reset the website
		resetSite(function (err) {
			if (err) {
				browser.end();
				console.error(err);
				process.exit(1);
			}
		});

    // 1  Launch an uninitialized website.
		browser
      .url(browser.launchUrl + '/Composite/top.aspx')
      .waitForElementVisible('.welcomepage', browser.globals.timeouts.basic);
		/*	  */
	},
	
/*		
	'install Neptune starter site': function (browser) {
		browser
		.installWebsite('Neptune', 'en-US')
	},
	
	'install Mercury starter site': function (browser) {
		browser
		.installWebsite('Mercury', 'en-US')
	},
	
	'install Open Cph Razor starter site': function (browser) {
		browser
		.installWebsite('Open Cph - Razor', 'en-US')
	},
	
	'install Open Cph Master Pages starter site': function (browser) {
		browser
		.installWebsite('Open Cph - Master Pages', 'en-US')
	},
*/	
	'install Venus starter site': function (browser) {
		browser
		.installWebsite('Venus', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
	}

}
