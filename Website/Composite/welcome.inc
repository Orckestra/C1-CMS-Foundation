<html>
	<head>
		<script type="text/javascript" src="Welcome.js"/>
		<link rel="stylesheet" type="text/css" href="welcome.css.aspx"/>
	</head>
	<body>
	<div class="welcomepage">
		<ui:cover id="introcover" hidden="true" busy="false"/>
		<div class="splash">
			<div class="splash-inner">
				<div id="intro" class="intro">
					<p id="crumbs" class="crumbs">
						<span id="crumbtest" class="text-primary">Welcome</span>
						<em>►</em>
						<span id="crumblicense">License</span> 
						<em>►</em> 
						<span id="crumbsetup">Setup</span> 
						<em>►</em>
						<span id="crumblanguage">Language</span> 
						<em>►</em>
						<span id="crumblogin">Login</span>
					</p>
					<ui:decks id="introdecks" flex="false">
					<ui:deck id="test">
					<h1>Welcome</h1>
					<div>
						<p>Please wait while we test your installation.</p>
						<ul id="introtest"/>
						<p id="introtestsuccess">Your installation is operational.</p>
						<p id="introtestfailure" class="hide">
							Your installation has problems!<br/>
							<a href="#" onclick="window.location.reload()">(check again)</a>
						</p>
					</div>
					</ui:deck>
					<ui:deck id="license">
						<h1 class="simple-h1">License</h1>
						<div id="licensetext" class="licensetext"/>
						<form id="licenseform" action="javascript://" method="get">
							<input id="licenseaccept" type="checkbox" class="checkbox" onclick="Welcome.acceptLicense(this)"/>
							<label for="licenseaccept">Accept</label>
						</form>
					</ui:deck>
					<ui:deck id="setup">
						<h1 class="simple-h1">Setup</h1>
						<div>
							<div id="setupfields" class="setupfields"/>
							<div id="setuptext"/>
						</div>
					</ui:deck>
					<ui:deck id="language">
					<h1>Language</h1>
					<div>
						<!-- p id="consolehelp">The "console language" is the language used in the administration of your website. You can change this later.</p-->
						<p id="websitehelp">Select the default public language of your website. You can add more languages later.</p>
						<form id="languageform" class="form" action="javascript://" method="get">
							<!-- 
							<div>
								<label>Console language</label>
								<span>
									<select id="consolelanguage">
										<option value="en-UK">English UK</option>
									</select>
								</span>
							</div>
							-->
							<div class="field-group">
								<label>Website language</label>
								<select id="websitelanguage" class="form-control" />
							</div>
						</form>
					</div>			
					</ui:deck>
					<ui:deck id="login">
						<h1>Create Login</h1>
						<p id="loginbad" class="text-error hide">Passwords don't match!</p>
						<p id="lengthbad" class="text-error hide">Minimum 6 characters password.</p>
						<form id="loginform" class="form" action="javascript://" method="get">
							<div class="field-group">
								<label>Username</label>
								<input id="username" class="form-control" type="text" value="admin"/>
							</div>
							<div class="field-group">
								<label>Email</label>
								<input id="email" class="form-control" type="text" value=""/>
							</div>
							<div class="field-group">
								<label>Password</label>
								<input id="password" class="form-control" type="password"/>
							</div>
							<div class="field-group">
								<label>Repeat password</label>
								<input id="passcheck" class="form-control" type="password"/>
							</div>
							<div class="field-group">
								<label>Regional settings</label>
								<select id="consolelanguage" class="form-control" />
							</div>
							<div class="field-group">
								<label class="innerlabel" for="newsletter">Sign up for our newsletter</label> <input id="newsletter" class="newslettercheckbox" type="checkbox" checked="checked"/>
							</div>
						</form>
					</ui:deck>
					<ui:deck id="loading" class="loading-deck">
						<div class="brand-logo"></div>
						<div class="progress">
							<p class="progressbar-msg">Your starter site is being downloaded and installed. This may take a few minutes...</p>
							<div id="progressbar" class="progressbar">
								<ui:text label="Installing"/>
								<ui:progressbar/>
							</div>
						</div>
					</ui:deck>
				</ui:decks>
			</div>
			<ui:decks id="navdecks" class="navdecks">
			<ui:deck id="navtest">
				<ui:dialogtoolbar>
					<ui:clickbutton id="introtestsuccessbutton" class="right-btn" label="Next" focusable="true" oncommand="Welcome.switchTo('license')"/>
					<ui:clickbutton id="introtestfailurebutton" label="Read more" focusable="true" url="http://docs.composite.net/installationfailed?errors=" hidden="true"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlicense">
				<ui:dialogtoolbar>
					<ui:clickbutton label="Back" class="left-btn"  focusable="true" oncommand="Welcome.switchTo('test')"/>
					<ui:clickbutton id="setupbutton" class="right-btn"  label="Next" focusable="true" oncommand="Welcome.switchTo('setup')" isdisabled="true"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navsetup">
				<ui:dialogtoolbar>
					<ui:clickbutton label="Back" class="left-btn" focusable="true" oncommand="Welcome.switchTo('license')"/>
					<ui:clickbutton label="Next" class="right-btn" focusable="true" oncommand="Welcome.switchTo('language')"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlanguage">
				<ui:dialogtoolbar>
					<ui:clickbutton class="left-btn" label="Back" focusable="true" oncommand="Welcome.switchTo('setup')"/>
					<ui:clickbutton class="right-btn" label="Next" focusable="true" oncommand="Welcome.switchTo('login')"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlogin">
				<ui:dialogtoolbar>
					<ui:clickbutton class="left-btn"  label="Back" focusable="true" oncommand="Welcome.switchTo('language')"/>
					<ui:clickbutton class="right-btn" id="startbutton" isdisabled="true" label="Start C1" focusable="true" oncommand="Welcome.login()"/>
				</ui:dialogtoolbar>
			</ui:deck>
			</ui:decks>
		</div>
	</div>
</div>
	</body>
</html>