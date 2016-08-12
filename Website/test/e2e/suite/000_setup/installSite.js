var resetSite = require('../../reset.js');

var expectedLanguage = 'en-US';

module.exports = {
	'@tags': ['install'],
	before: function (browser, done) {
		resetSite(function (err) {
			if (err) {
				browser.end();
				console.error(err);
				process.exit(1);
			}
			done();
		});
	},
	beforeEach: function (browser) {
    // 1  Launch an uninitialized website.
		browser
      .url(browser.launchUrl + '/Composite/top.aspx?mode=develop')
      .waitForElementVisible('.welcomepage', 10000);
	},
	'install Venus starter site': function (browser) {
    browser
    //	The “Welcome” page of the setup wizard appears.
      .waitForElementVisible('#intro', 1000)
		//    All the requirements are met (checked).
      .waitForElementVisible('#introtestsuccess', 5000)
		//    The “Next” button is available and enabled
      .waitForElementVisible('#introtestsuccessbutton', 1000)
		// 2  Click “Next”.  The “License” page of the setup wizard appears.
      .click('#introtestsuccessbutton')
		//    The “Accept” check box is present and unchecked
      .waitForElementVisible('#licenseaccept', 1000);
    browser.expect.element('#licenseaccept').to.not.have.attribute('checked');
		//    The “Next” button is available but disabled
    browser.expect.element('#setupbutton').to.have.attribute('isdisabled');
		// 3  Check the “Accept” check box.  The check mark appears in the “Accept” check box.
    browser.click('#licenseaccept');
		//    The “Next” button gets enabled.
    browser.expect.element('#setupbutton').to.not.have.attribute('isdisabled');
		// 4  Click “Next”.  The “Setup” page of the setup wizard appears.
    browser
      .click('#setupbutton')
		//    The “Starter Site” radio button is present and selected
      .waitForElementVisible('#setup', 1000);
    browser.expect.element('#setup h1').text.to.contain('Setup');
		//    The “Venus” radio button is present and selected.
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(1) > radiobutton')
      .to.have.attribute('ischecked', 'true');
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(1) > datalabeltext')
      .text.to.equal('Starter sites');
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(1) + p + div > radiodatagroup > radio:nth-of-type(1) > radiobutton')
      .to.have.attribute('ischecked', 'true');
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(1) + p + div > radiodatagroup > radio:nth-of-type(1) > datalabeltext')
      .text.to.equal('Venus');
		//    The “Next” button is available and enabled
    browser.expect.element('#navsetup clickbutton[label="Next"]').to.not.have.attribute('isdisabled');
		// 5  Click “Next”.  The “Language” page of the setup wizard appears.
    browser
      .click('#navsetup clickbutton[label="Next"]')
      .waitForElementVisible('#language', 1000);
		//    A language is selected. (It must be based on the user’s locale.)
    browser.expect.element('#websitelanguage').value.to.equal(expectedLanguage);
		//    The “Next” button is available and enabled
    browser.expect.element('#navlanguage clickbutton[label="Next"]').to.not.have.attribute('isdisabled');
		// 6  Click “Next”.  The “Create Login” page of the setup wizard appears.
    browser
      .click('#navlanguage clickbutton[label="Next"]')
      .waitForElementVisible('#login', 1000);
		//    The “Start C1” button is available but disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start C1"]')
      .to.have.attribute('isdisabled');
		//    The “Username” field is filled with the value ‘admin’.
    browser.expect.element('#username').value.to.equal('admin');
		//    The “Regional settings” field is set to the same language as in Step 5.
    browser.expect.element('#consolelanguage').value.to.equal(expectedLanguage);
		// 7  Fill the “Email” field. Value: “john.doe@contoso.com”
	browser.click('#email');
    browser.setValue('#email', 'john.doe@contoso.com');
		//    The field is filled with the value.
	browser.expect.element('#email').value.to.equal('john.doe@contoso.com')
		//    The “Start C1” button is still disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start C1"]')
      .to.have.attribute('isdisabled');
		// 8  Fill the “Password” field. Value: “123456”
	browser.click('#password');
    browser.setValue('#password', '123456')
		//    The field is filled with the value.
	browser.expect.element('#password')
		.value.to.equal('123456');
		//    The value is masked.
    browser.expect.element('#password')
      .to.have.attribute('type', 'password')
		//    The “Start C1” button is still disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start C1"]')
      .to.have.attribute('isdisabled');
		// 9  Fill the “Repeat Password” field. Value: “123456”
	browser.click('#passcheck');
    browser.setValue('#passcheck', '123456')
		//    The field is filled with the value.
	browser.expect.element('#passcheck')
		.value.to.equal('123456');
		//    The value is masked.
    browser.expect.element('#passcheck')
      .to.have.attribute('type', 'password')
		//    The “Start C1” button gets enabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start C1"]')
      .to.not.have.attribute('isdisabled');
		// 10 Click “Start C1”.
    browser.click('#navlogin clickbutton[label="Start C1"]');
		//    The screen with “You starting site being downloaded
		//        and installed…” appears showing the installation progress and
		//        other screens succeed each other.
    browser
      .waitForElementVisible('#loading', 1000)
		//    Eventually, the user logs in successfully and the C1 Console appears.
      .waitForElementNotPresent('#loading', 60000)
      .waitForElementVisible('body', 10000)
      .page.appWindow()
        .waitForFrameLoad('@appFrame', 1000);
	}
}
