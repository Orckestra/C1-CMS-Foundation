var reset = require('../../reset.js');

var setupOption = 'Starter sites';
var starterSite = 'Venus';
var expectedLanguage = 'en-US';

module.exports = {
	'@tags': ['install'],

	before: function (browser, done) {
		reset(function (err) {
			if (err) {
				browser.end();
				console.error(err);
				process.exit(1);
			}
			done();
		});
	},
	
	'install Venus starter site': function (browser) {
		browser.installWebsite(setupOption, starterSite, expectedLanguage)
	}
	
}
