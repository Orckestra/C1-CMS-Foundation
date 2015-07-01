<ui:splash id="splash" class="splash">
  <ui:decks id="decks" flex="false" class="splash-inner">
    <div class="logo"></div>
    <ui:deck id="introdeck"/>
    <ui:deck id="logindeck">
      <div class="buzzwords">
        <div id="version">
          <ui:text label="${version}"/>
        </div>
        <div id="build">
          <ui:text label="Build ${build}"/>
        </div>
        <div>
          <ui:text label="© 2014 Composite A/S"/>
        </div>
      </div>
      <ui:fields id="loginfields" >
        <div id="loginerror" class="errortext">
          <ui:text label="Username or password incorrect!"/>
        </div>
        <ui:field>
          <ui:fielddata>
            <ui:labelbox class="icon" image="${icon:user}"></ui:labelbox>
            <ui:datainput name="username" required="true" autoselect="true" placeholder="Username" />
          </ui:fielddata>
        </ui:field>
        <ui:field>
          <ui:fielddata>
            <ui:labelbox class="icon" image="${icon:users-changeownpassword}"></ui:labelbox>
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
        <div id="passwordexpired">
          <ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.PasswordExpiredMessage}"/>
        </div>
      </div>
      <ui:fields id="passwordfields">
        <div id="passworderror">
        </div>
        <ui:field>
          <ui:fielddesc>
            <ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.Username}" />
          </ui:fielddesc>
          <ui:fielddata>
            <ui:datainput name="usernameold" required="true" readonly="true"/>
          </ui:fielddata>
        </ui:field>
        <ui:field>
          <ui:fielddesc>
            <ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.OldPassword}" />
          </ui:fielddesc>
          <ui:fielddata>
            <ui:datainput name="passwordold" password="true" required="true" autoselect="true"/>
          </ui:fielddata>
        </ui:field>
        <ui:field>
          <ui:fielddesc>
            <ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.NewPassword}" />
          </ui:fielddesc>
          <ui:fielddata>
            <ui:datainput name="passwordnew" password="true" required="true" autoselect="true"/>
          </ui:fielddata>
        </ui:field>
        <ui:field>
          <ui:fielddesc>
            <ui:text label="${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmPassword}" />
          </ui:fielddesc>
          <ui:fielddata>
            <ui:datainput name="passwordnew2" password="true" required="true" autoselect="true"/>
          </ui:fielddata>
        </ui:field>
      </ui:fields>
      <ui:dialogtoolbar>
        <ui:clickbutton label="${string:Composite.C1Console.Users:ChangePasswordForm.ChangePasswordButton}" image="${skin}/splash/button.png" focusable="true" oncommand="KickStart.changePassword()"/>
      </ui:dialogtoolbar>
    </ui:deck>
    <ui:deck id="loadingdeck">
      <p class="progressbar-msg">Depending on your internet connection speed, Composite C1 may take a few moments to load.</p>
      <div id="progressbar" class="progressbar">
        <ui:text label="Initializing Composite C1"/>
        <ui:progressbar/>
      </div>
    </ui:deck>
    <ui:deck id="shutdowndeck">
      <p>Shutting down...</p>
    </ui:deck>
  </ui:decks>
  <div id="backdrop"></div>
</ui:splash>