var events = require('events');

function InstallWebsite() {
  events.EventEmitter.call(this);
}

InstallWebsite.prototype.command = function (setupOption, starterSite, expectedLanguage, newLanguage, newLanguageCode) {
	
	var browser = this.client.api;
	
	// Launch an uninitialized website.
	browser
      .url(browser.launchUrl + '/Composite/top.aspx')
      .waitForElementVisible('.welcomepage', browser.globals.timeouts.basic);
	
    browser
    //	The “Welcome” page of the setup wizard appears.
      .waitForElementVisible('#intro', browser.globals.timeouts.little)
		//    All the requirements are met (checked).
      .waitForElementVisible('#introtestsuccess', browser.globals.timeouts.basic)
		//    The “Next” button is available and enabled
      .waitForElementVisible('#introtestsuccessbutton', browser.globals.timeouts.little)
		// 2  Click “Next”.  The “License” page of the setup wizard appears.
      .click('#introtestsuccessbutton')
	  
		//    The “Accept” check box is present and unchecked
      .waitForElementVisible('#licenseaccept', browser.globals.timeouts.little);
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
      .waitForElementVisible('#setup', browser.globals.timeouts.little);
    browser.expect.element('#setup h1').text.to.contain('Setup');
		//    The “Venus” (or other site's) radio button is present and selected.
		
	// {{ select s setup option, for example "Starter site"
	
	var setupGroupIndex = this.api.globals.setupOptions[setupOption];
	
	browser.clickLabel(setupOption);
	
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(' + setupGroupIndex + ') > radiobutton')
      .to.have.attribute('ischecked', 'true');
    browser.expect
      .element('#setupfields > div > radiodatagroup > radio:nth-of-type(' + setupGroupIndex + ') > datalabeltext')
      .text.to.equal(setupOption);
	  
	// }}
	  
	// {{ select a starter site, for example, "Venus" (only if not "Bare bones" : 3)
 		
	if(setupOption != 'Bare bones')
	{
		var siteIndex = this.api.globals.starterSites[starterSite];
		
		browser.clickLabel(starterSite);
		   
		browser.expect
		  .element('#setupfields > div > radiodatagroup > radio:nth-of-type(' + setupGroupIndex + ') + p + div > radiodatagroup > radio:nth-of-type(' + siteIndex + ') > radiobutton')
		  .to.have.attribute('ischecked', 'true');
		  
		browser.expect
		  .element('#setupfields > div > radiodatagroup > radio:nth-of-type(' + setupGroupIndex + ') + p + div > radiodatagroup > radio:nth-of-type(' + siteIndex + ') > datalabeltext')
		  .text.to.equal(starterSite);
	}
	
	// }}
	  
		//    The “Next” button is available and enabled
    browser.expect.element('#navsetup clickbutton[label="Next"]').to.not.have.attribute('isdisabled');
		// 5  Click “Next”.  The “Language” page of the setup wizard appears.
    browser
      .click('#navsetup clickbutton[label="Next"]')
	  
      .waitForElementVisible('#language', browser.globals.timeouts.little);
		//    A language is selected. (It must be based on the user’s locale.)
    browser.expect.element('#websitelanguage').value.to.equal(expectedLanguage);
	
	// {{
		
		// change the language
		if(newLanguage)
		{
			browser.setValue('#websitelanguage', newLanguage);
		}
		if(newLanguageCode)
		{
			browser.expect.element('#websitelanguage').value.to.equal(newLanguageCode);
		}
		
	// }}
	
		//    The “Next” button is available and enabled
    browser.expect.element('#navlanguage clickbutton[label="Next"]').to.not.have.attribute('isdisabled');
		// 6  Click “Next”.  The “Create Login” page of the setup wizard appears.
    browser
      .click('#navlanguage clickbutton[label="Next"]')
      .waitForElementVisible('#login', browser.globals.timeouts.little);
		//    The “Start CMS” button is available but disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start CMS"]')
      .to.have.attribute('isdisabled');
		//    The “Username” field is filled with the value ‘admin’.
    browser.expect.element('#username').value.to.equal('admin');
	
		//    The “Regional settings” field is set to the same language as in Step 5.
		// {{
		if(newLanguageCode)
		{		
			browser.expect.element('#consolelanguage').value.to.equal(newLanguageCode);
		}
		// }}
		
		// 7  Fill the “Email” field. Value: “john.doe@contoso.com”
	browser.click('#email');
    browser.setValue('#email', 'john.doe@contoso.com');
		//    The field is filled with the value.
	browser.expect.element('#email').value.to.equal('john.doe@contoso.com')
		//    The “Start CMS” button is still disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start CMS"]')
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
		//    The “Start CMS” button is still disabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start CMS"]')
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
		//    The “Start CMS” button gets enabled.
    browser.expect
      .element('#navlogin clickbutton[label="Start CMS"]')
      .to.not.have.attribute('isdisabled');
		// 10 Click “Start CMS”.
    browser.click('#navlogin clickbutton[label="Start CMS"]');
		//    The screen with “You starting site being downloaded
		//        and installed…” appears showing the installation progress and
		//        other screens succeed each other.
    browser
      .waitForElementVisible('#loading', browser.globals.timeouts.little)
		//    Eventually, the user logs in successfully and the CMS Console appears.
      .waitForElementNotPresent('#loading', browser.globals.timeouts.save)
      .waitForElementVisible('body', browser.globals.timeouts.loading)
      .page.appWindow()
        .waitForFrameLoad('@appFrame', browser.globals.timeouts.loading);
};

module.exports = InstallWebsite; 