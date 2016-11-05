var resetSite = require('../../reset.js');

var setupOption = 'Starter sites';
var starterSite = 'Venus';
var expectedLanguage = 'en-US';

module.exports = {
	'@tags': ['install'],

	before: function () {
		resetSite();
	},

	'install Venus starter site': function (browser) {
		browser.installWebsite(setupOption, starterSite, expectedLanguage)
	}
}
