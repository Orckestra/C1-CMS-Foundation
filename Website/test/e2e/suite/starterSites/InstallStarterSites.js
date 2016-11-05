var resetSite = require('../../reset.js');

module.exports = {
	'@tags': ['install'],
	beforeEach: function (browser) {
	// 0 Reset the website
		resetSite();
	},
	
	// 1 install starter sites other than "Venus"
	'install Neptune starter site': function (browser) {
		browser
		.installWebsite('Starter sites', 'Neptune', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Neptune Starter Site")
		
		.end()
	},
	
	'install Mercury starter site': function (browser) {
		browser
		.installWebsite('Starter sites', 'Mercury', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Frontpage")
		
		.end()
	},
	
	'install Open Cph Razor starter site': function (browser) {
		browser
		.installWebsite('Starter sites', 'Open Cph - Razor', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Open Cph Starter Site")
		
		.end()
	},
	
	'install Open Cph Master Pages starter site': function (browser) {
		browser
		.installWebsite('Starter sites', 'Open Cph - Master Pages', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Open Cph Starter Site")
		
		.end()
	},
		
	'install Bare Bones site': function (browser) {
		browser
		.installWebsite('Bare bones', '', 'en-US')
		
		browser
		.selectPerspective("Content")
		.assertTreeNodeHasNoChild('Websites')
		
		.end()
	},
	
	// 2 reset to  "Venus" 
	'install Venus starter site': function (browser) {
		browser
		.installWebsite('Starter sites', 'Venus', 'en-US')
		
		browser
		.selectPerspective("Content")
		.openTreeNode("Venus Starter Site")
		
		.end()
	},
}
