var reset = require('../../reset.js');

module.exports = {
	'@tags': ['install'],
	beforeEach: function (browser, done) {
		reset(function (err) {
			if (err) {
				browser.end();
				console.error(err);
				process.exit(1);
			}
			done();
		});
	},
	
	'install Venus starter site with French (CA)': function (browser) {
		browser
		.installWebsite('Starter sites', 'Venus', 'en-US', 'French (CA)', 'fr-CA')
		
		// assert the GUI and the website language is French 
		browser
		.selectPerspective("Système")
		.openTreeNode("Langues")
		.assertTreeNodeHasChild("Langues", "Français, Canada")
		
		.end()
	},
	
	'reinstall Venus starter site with English (US)': function (browser) {
		browser.installWebsite('Starter sites', 'Venus', 'en-US')
		
		// assert the GUI and the website language is English 
		browser
		.selectPerspective("System")
		.openTreeNode("Languages")
		.assertTreeNodeHasChild("Languages", "English, US")
		
		.end()
	}
	
	
}
