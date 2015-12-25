<div class="loginpage">
	<ui:splash id="splash" class="splash">
		<ui:decks id="decks" flex="false" class="splash-inner">
			<ui:brandsnippet snippetName="logo" />
			<ui:deck id="introdeck"/>
			<ui:deck id="logindeck">
				<ui:fields id="loginfields" >
					<div id="loginerror" class="text-error text-sm hide">
						<ui:text label="Username or password incorrect!"/>
					</div>
					<ui:field class="no-bg">
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:user}"></ui:labelbox>
							<ui:datainput name="username" required="true" autoselect="true" placeholder="Username" />
						</ui:fielddata>
					</ui:field>
					<ui:field  class="no-bg">
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:users-changeownpassword}"></ui:labelbox>
							<ui:datainput name="password" password="true" required="true" autoselect="true" placeholder="Password"/>
						</ui:fielddata>
					</ui:field>
				</ui:fields>
				<ui:dialogtoolbar>
					<ui:clickbutton label="SIGN IN" focusable="true" oncommand="KickStart.login()"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="changepassworddeck" lazy="true">
				<div class="buzzwords">
					<div id="passwordexpired" class="text-muted mb-20">
						<ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.PasswordExpiredMessage}"/>
					</div>
				</div>
				<ui:fields id="passwordfields">
					<div id="passworderror">
					</div>
					<ui:field>
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:user}"></ui:labelbox>
							<ui:datainput name="usernameold" required="true" readonly="true" placeholder="${string:Composite.C1Console.Users:ChangePasswordForm.Username}"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:users-changeownpassword}" title="Old Password"></ui:labelbox>
							<ui:datainput name="passwordold" password="true" required="true" autoselect="true" placeholder="${string:Composite.C1Console.Users:ChangePasswordForm.OldPassword}"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:users-changeownpassword}" title="New Password"></ui:labelbox>
							<ui:datainput name="passwordnew" password="true" required="true" autoselect="true" placeholder="${string:Composite.C1Console.Users:ChangePasswordForm.NewPassword}"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddata>
							<ui:labelbox class="icon text-primary" image="${icon:users-changeownpassword}" title="Confirm Password"></ui:labelbox>
							<ui:datainput name="passwordnew2" password="true" required="true" autoselect="true" placeholder="${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmPassword}"/>
						</ui:fielddata>
					</ui:field>
				</ui:fields>
				<ui:dialogtoolbar>
					<ui:clickbutton label="${string:Composite.C1Console.Users:ChangePasswordForm.ChangePasswordButton}" focusable="true" oncommand="KickStart.changePassword()"/>
				</ui:dialogtoolbar>
			</ui:deck>
			<ui:deck id="loadingdeck" class="loading-deck">
				<div class="progress">
					<p class="progressbar-msg">
						Depending on your internet connection speed, <span class="js-applicationname"></span> may take a few moments to load.
					</p>
					<div id="progressbar" class="progressbar">
						Initializing <span class="js-applicationname"></span>
						<ui:progressbar/>
					</div>
				</div>
			</ui:deck>
			<ui:deck id="shutdowndeck">
				<p>Shutting down...</p>
			</ui:deck>
		</ui:decks>
	</ui:splash>
</div>