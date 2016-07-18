const decks = [
	'test',
	'license',
	'setup',
	'language',
	'login',
	'loading'
];

var resetSite = require('../../reset.js');

module.exports = {
	before: function (_, done) {
		resetSite(function (err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			done();
		});
	},
	beforeEach: function (browser) {
		browser.url(browser.launchUrl + '/Composite/top.aspx?mode=develop');
	},
	'install Venus starter site': function (browser) {
		// 1  Launch an uninitialized website.	The “Welcome” page of the setup wizard appears.
		//    All the requirements are met (checked).
		//    The “Next” button is available and enabled
		// 2  Click “Next”.  The “License” page of the setup wizard appears.
		//    The “Accept” check box is present and unchecked
		//    The “Next” button is available but disabled
		// 3  Check the “Accept” check box.  The check mark appears in the “Accept” check box.
		//    The “Next” button gets enabled.
		// 4  Click “Next”.  The “Setup” page of the setup wizard appears.
		//    The “Starter Site” radio button is present and selected
		//    The “Venus” radio button is present and selected.
		//    The “Next” button is available and enabled
		// 5  Click “Next”.  The “Language” page of the setup wizard appears.
		//    A language is selected. (It must be based on the user’s locale.)
		//    The “Next” button is available and enabled
		// 6  Click “Next”.  The “Create Login” page of the setup wizard appears.
		//    The “Next” button is available but disabled.
		//    The “Username” field is filled with the value ‘admin’.
		//    The “Regional settings” field is set to the same language as in Step 5.
		// 7  Fill the “Email” field. Value: “john.doe@contoso.com”
		//    The field is filled with the value.
		//    The “Next” button is still disabled.
		// 8  Fill the “Password” field. Value: “123456”
		//    The field is filled with the value.
		//    The value is masked.
		//    The “Next” button is still disabled.
		// 9  Fill the “Repeat Password” field. Value: “123456”
		//    The field is filled with the value.
		//    The value is masked.
		//    The “Next” button gets enabled.
		// 10 Click “Start C1”.
		//    The screen with “You starting site being downloaded
		//        and installed…” appears showing the installation progress and
		//        other screens succeed each other.
		//    Eventually, the user logs in successfully and the C1 Console appears.
	}
}
