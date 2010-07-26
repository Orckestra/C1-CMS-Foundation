<html>
	<head>
		<script type="text/javascript" src="Welcome.js.aspx"/>
		<link rel="stylesheet" type="text/css" href="welcome.css.aspx"/>
	</head>
	<body>
		<ui:tableframe id="intro" class="splash">
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
				<ui:deck id="setup">
					<h1>Setup</h1>
					<div>
						<p>Choose your default setup.</p>
						<div id="setupfields"/>
					</div>			
				</ui:deck>
				<ui:deck id="login">
					<h1>Login</h1>
					<div>
						<form id="loginform" action="javascript://" method="get">
							<div>
								<label>Username</label>
								<input id="username" type="text" value="admin"/>
							</div>
							<div>
								<label>Password</label>
								<input id="password" type="password"/>
							</div>
							<div>
								<label>Repeat password</label>
								<input id="passcheck" type="password"/>
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
					<ui:clickbutton id="introtestsuccessbutton" label="Go to setup" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('setup')"/>
					<ui:clickbutton id="introtestfailurebutton" label="Read more" image="${skin}/splash/button.png" focusable="true" url="http://docs.composite.net/installationfailed?errors=" hidden="true"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navsetup">
				<ui:dialogtoolbar>
					<ui:clickbutton label="Go to login" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('login')"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="navlogin">
				<ui:dialogtoolbar>
					<ui:clickbutton style="float:left;" label="Back to setup" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.switchTo('setup')"/>
					<ui:clickbutton id="startbutton" isdisabled="true" label="Start C1" image="${skin}/splash/button.png" focusable="true" oncommand="Welcome.login()"/>
				</ui:dialogtoolbar>
			</ui:deck>
		</ui:decks>
	</body>
</html>