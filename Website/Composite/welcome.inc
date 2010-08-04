<html>
	<head>
		<script type="text/javascript" src="Welcome.js.aspx"/>
		<link rel="stylesheet" type="text/css" href="welcome.css.aspx"/>
	</head>
	<body>
		<ui:tableframe id="intro" class="splash">
			<p id="crumbs">
				<span id="crumbtest" class="selected">Welcome</span>
				<em>►</em>
				<span id="crumblicense">License</span> 
				<em>►</em> 
				<span id="crumbsetup">Setup</span> 
				<em>►</em> 
				<span id="crumblogin">Login</span>
			</p>
			<ui:decks id="introdecks" flex="false">
				<ui:deck id="test">
					<h1>Welcome</h1>
					<div>
						<p>Please wait while we test your installation.</p>
						<ul id="introtest"/>
						<p id="introtestsuccess">Your Composite C1 installation is operational.</p>
						<p id="introtestfailure">Your Composite C1 installation has problems!</p>
					</div>
				</ui:deck>
				<ui:deck id="license">
					<h1>License</h1>
					<div>
						<div id="licensetext"/>
						<form id="loginform" action="javascript://" method="get">
							<div>
								<input id="username" type="checkbox" class="checkbox" onclick="Welcome.acceptLicense(this)"/>
								<label>Accept</label>
							</div>
						</form>
					</div>
				</ui:deck>
				<ui:deck id="setup">
					<h1>Setup</h1>
					<div>
						<div id="setuptext"/>
						<div id="setupfields"/>
					</div>			
				</ui:deck>
				<ui:deck id="login">
					<h1>Create Login</h1>
					<div>
						<form id="loginform" action="javascript://" method="get">
							<div>
								<label>Username</label>
								<input id="username" class="text" type="text" value="admin"/>
							</div>
							<div>
								<label>Password</label>
								<input id="password" class="text" type="password"/>
							</div>
							<div>
								<label>Repeat password</label>
								<input id="passcheck" class="text" type="password"/>
							</div>
							<div>
								<label>Website language</label>
								<span>
									<select id="language"/>
								</span>
							</div>
						</form>
						<br/>
						<div style="position:relative;">
							<span>&#160;</span>
							<p id="loginbad">Passwords don't match!</p>
							<p id="lengthbad">Minimum 6 characters password.</p>
						</div>
					</div>
				</ui:deck>
			</ui:decks>
		</ui:tableframe>
		<ui:decks id="navdecks" class="splash">
			<ui:deck id="navtest">
				<ui:dialogtoolbar>
					<ui:clickbutton id="introtestsuccessbutton" label="License" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('license')"/>
					<ui:clickbutton id="introtestfailurebutton" label="Read more" image="${skin}/splash/button.png" focusable="true" url="http://docs.composite.net/installationfailed?errors=" hidden="true"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlicense">
				<ui:dialogtoolbar>
					<ui:clickbutton style="float:left;" label="Welcome" image="${skin}/splash/buttonback.png" focusable="true" oncommand="Welcome.switchTo('test')"/>
					<ui:clickbutton id="setupbutton" label="Setup" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('setup')" isdisabled="true"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navsetup">
				<ui:dialogtoolbar>
					<ui:clickbutton style="float:left;" label="License" image="${skin}/splash/buttonback.png" focusable="true" oncommand="Welcome.switchTo('license')"/>
					<ui:clickbutton label="Login" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('login')"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlogin">
				<ui:dialogtoolbar>
					<ui:clickbutton style="float:left;" label="Setup" image="${skin}/splash/buttonback.png" focusable="true" oncommand="Welcome.switchTo('setup')"/>
					<ui:clickbutton id="startbutton" isdisabled="true" label="Start C1" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.login()"/>
				</ui:dialogtoolbar>
			</ui:deck>
		</ui:decks>
	</body>
</html>