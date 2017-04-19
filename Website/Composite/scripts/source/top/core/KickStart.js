/**
 * Kickstarting the entire shebang.
 */
var KickStart = new function () {
	
	var isLocalStoreReady = false;
	var isQualified = Client.qualifies ();
	
	var DEFAULT_USERNAME = "admin";
	var DEFAULT_PASSWORD = "123456";
	

	if ( !isQualified ) {
		document.location = "unsupported.aspx";
		return;
	}

	/*
		* Fire on load!
		*/
	this.fireOnLoad = function () {
		
			// iPad IOS7 hack
			if (Client.isPad && Client.isOS7 && window.innerHeight != document.documentElement.clientHeight) {
				document.documentElement.style.height = window.innerHeight + "px";
			}
			
			Application.lock ( this );
			fileEventBroadcasterSubscriptions ( true );
			EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_SHUTDOWN, this );
			
			SetupService = WebServiceProxy.createProxy ( Constants.URL_WSDL_SETUPSERVICE );
			ReadyService = WebServiceProxy.createProxy ( Constants.URL_WSDL_READYSERVICE );
			LoginService =  WebServiceProxy.createProxy ( Constants.URL_WSDL_LOGINSERVICE );
			InstallationService = WebServiceProxy.createProxy(Constants.URL_WSDL_INSTALLSERVICE);
			StringService = WebServiceProxy.createProxy(Constants.URL_WSDL_STRINGSERVICE);

			EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);

			setTimeout(function () {
				Persistance.initialize(); // NOTE: We are not using this stuff!
			}, 0);
	};
	/*
	 * Indicate user just logged to console
	 */
	this.justLogged = false;
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {string} broadcast
	 */
	this.handleBroadcast = function ( broadcast ) {
		
		switch ( broadcast ) {
		
			case BroadcastMessages.PERSISTANCE_INITIALIZED :
				kickStart ( broadcast );
				break;
				
			case BroadcastMessages.APPLICATION_STARTUP :
				// doStartUp (); hmmmm....
				break;
				
			case BroadcastMessages.KEY_ENTER:
				if (bindingMap.decks != null) {
					var selecteddeck = bindingMap.decks.getSelectedDeckBinding();
					if (selecteddeck != null) {
						switch (selecteddeck.getID()) {
							case "logindeck":
								this.login();
								break;
						    case "changepassworddeck":
								this.changePassword();
								break;
							default:
						}
					}
					
				}
				break;
				
			case BroadcastMessages.APPLICATION_LOGIN :
				var appwindow = window.bindingMap.appwindow;
				//Workarrond for iPad - "div layout creashed on some reflex"
				if (Client.isPad) {
					appwindow.bindingElement.style.borderLeft = "1px solid #333";
				}
				appwindow.setURL ( "app.aspx" );
				break;
				
			case BroadcastMessages.APPLICATION_OPERATIONAL:
				showWorkbench();

				setTimeout(function() {
					StageBinding.bindingInstance.handleHash(window);
				}, 0);
				break;
				
			case BroadcastMessages.APPLICATION_SHUTDOWN :
				if ( bindingMap.decks != null ) {
					bindingMap.decks.select ( "shutdowndeck" );
				}
				bindingMap.cover.show ();
				break;
		}
	}
	
	/**
	 * File and unfile EventBroadcaster subscriptions.
	 * @param {boolean} isSubscribe
	 */
	function fileEventBroadcasterSubscriptions ( isSubscribe ) {
		
		new List ([
		
			BroadcastMessages.PERSISTANCE_INITIALIZED,
			BroadcastMessages.APPLICATION_STARTUP,
			BroadcastMessages.APPLICATION_LOGIN,
			BroadcastMessages.APPLICATION_OPERATIONAL
			
		]).each ( 
			function ( broadcast ) {
				if ( isSubscribe ) {
					EventBroadcaster.subscribe ( broadcast, KickStart );
				} else {
					EventBroadcaster.unsubscribe ( broadcast, KickStart );
				}
			}
		);
	}
	
	/**
	 * Freeze storyboard until Localstore initialize.
	 * If not registered, show registration. Otherwise show login.
	 * @param {string} broadcast
	 */
	function kickStart ( broadcast ) {
		
		switch ( broadcast ) {
			case BroadcastMessages.PERSISTANCE_INITIALIZED :
				isLocalStoreReady = true;
				break;
		}
		
		if ( isLocalStoreReady ) {
			if ( bindingMap.decks != null && LoginService.IsLoggedIn ( true )) {
				accessGranted ();
			} else {
				if ( bindingMap.decks != null ) {
					showLogin ();
				} else {
					showWelcome ();
				}
			}
		}

		splashScreenData();
	}
	
	/**
	 * Splash screen data.
	 */
	function splashScreenData () {
		var elems = document.getElementsByClassName("js-applicationname");
		for(var  index = 0; index < elems.length; ++index)
		{
			elems[index].innerHTML = Installation.applicationName;
		}
	}
	
	/*
	 * Show welcome screens on first time startup.
	 */
	function showWelcome () {
		
		Application.unlock ( KickStart );
		if ( window.Welcome != null ) {
			Welcome.test ();
		}
	}
	
	/*
	 * Show login screen.
	 */
	function showLogin () {
		
		EventBroadcaster.subscribe ( BroadcastMessages.KEY_ENTER, KickStart );
		Application.unlock ( KickStart );
		bindingMap.decks.select ( "logindeck" );
		
		setTimeout ( function () {
			if (Application.isLocalHost) {
				if(Application.isDeveloperMode || Client.isPerformanceTest)
				{
					DataManager.getDataBinding("username").setValue(DEFAULT_USERNAME);
					DataManager.getDataBinding("password").setValue(DEFAULT_PASSWORD);
				}
				// Auto login for the performance test
				if (Client.isPerformanceTest) {
					KickStart.login();
				}
			}
			setTimeout ( function () {
				DataManager.getDataBinding ( "username" ).focus ();
			}, 250 );
		}, 0 );
	}
	
	/**
	 * When registered, monitor the servers readystate and continue to login screen when done.
	 */
	function watchProgress () {
		
		window.progressOnRegistrationInterval = window.setInterval ( function () {
			if ( ReadyService.IsServerReady ( true )) {
				window.clearInterval ( window.progressOnRegistrationInterval );
				window.progressOnRegistrationInterval = null;
				splashScreenData ();
				showLogin ();
			}
		}, 2000 );
	}
	
	/**
	 * Show it.
	 */
	function showWorkbench () {
	
		setTimeout ( function () {
			bindingMap.cover.hide ();
			fileEventBroadcasterSubscriptions ( false );
			Application.unlock ( KickStart );
		}, PageBinding.TIMEOUT );
	}


	this.changePassword = function () {
		
		if (bindingMap.toppage.validateAllDataBindings()) {

			var username = DataManager.getDataBinding("username").getResult();
			var oldpassword = DataManager.getDataBinding("passwordold").getResult();
			var newpassword = DataManager.getDataBinding("passwordnew").getResult();
			var newpassword2 = DataManager.getDataBinding("passwordnew2").getResult();


			if (newpassword == newpassword2) {
				var wasEnabled = WebServiceProxy.isLoggingEnabled;
				WebServiceProxy.isLoggingEnabled = false;
				WebServiceProxy.isFaultHandler = false;

				var result = LoginService.ChangePassword(username, oldpassword, newpassword);

				if (result instanceof SOAPFault) {
					alert(result.getFaultString());
				} else {
					if (result.length == 0) {
						setTimeout(function() {
							top.window.location.reload(true);
						}, 0);
					} else {
						this.showPasswordErrors(result);
					}
				}

				WebServiceProxy.isFaultHandler = true;
				if (wasEnabled) {
					WebServiceProxy.isLoggingEnabled = true;
				}
			} else {

				
				this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
			}
		}
	}

	this.showPasswordErrors = function (errors) {
		errors = new List(errors);
		var errorsElement = document.getElementById("passworderror");
		errorsElement.innerHTML = "";

		errors.each(function(error) {
			var errorElement = document.createElement("div");
			errorElement.textContent = error;
			errorElement.className = "text-error text-sm";
			errorsElement.appendChild(errorElement);

		});
		


		errorsElement.style.display = "block";


		var handler = {
			handleAction: function (action) {
				document.getElementById("passworderror").style.display = "none";
				action.target.removeActionListener(
						Binding.ACTION_DIRTY, handler
				);
			}
		}
		bindingMap.passwordfields.addActionListener(
				Binding.ACTION_DIRTY, handler
		);

		DataManager.getDataBinding("passwordold").clean();
		DataManager.getDataBinding("passwordnew").clean();
		DataManager.getDataBinding("passwordnew2").clean();
	}


	
	/** 
	 * Note that we disable SOAP debugging during login. 
	 * Note that we may be able to do something intelligent with the SOAP response.
	 * Note that we didn't manage to come up with intelligent handling of the SOAP response.
	 */
	this.login = function () {
		
		Application.lock ( KickStart ); // unlocked by showWorkbench or if fields don't validate
		
		/*
		 * The timeout is here to block GUI with wait cursor.
		 */
		setTimeout ( function () {
		
			if ( bindingMap.toppage.validateAllDataBindings ()) {
				KickStart.doLogin ( 
					DataManager.getDataBinding ( "username" ).getResult (), 
					DataManager.getDataBinding ( "password" ).getResult ()
				);
			} else {
				Application.unlock ( KickStart );
			}
			
		}, 25 );
	}

	/**
	 * Isolated in order to be invoked by {@link Welcome}
	 * @param {String} username
	 * @param {String} password
	 */
	this.doLogin = function ( username, password ) {
		
		var wasEnabled = WebServiceProxy.isLoggingEnabled;
		WebServiceProxy.isLoggingEnabled = false;
		WebServiceProxy.isFaultHandler = false;
		
		var isAllowed = false;
		var isChangePasswordRequired = false;
		var result = LoginService.ValidateAndLogin ( username, password );
		if ( result instanceof SOAPFault ) {
			alert ( result.getFaultString ());
		} else {
		    if (result == "lockedAfterMaxAttempts") {
                // TODO: unhardcode
		        alert("The account was locked after maximum login attempts. Please contact administrator.");
		    }

		    if (result == "lockedByAnAdministrator") {
		        // TODO: unhardcode
		        alert("The account was locked by an administrator.");
		    }

		    if (result == "passwordUpdateRequired") {
		    	isChangePasswordRequired = true;

		    }

            if (result == "success") {
                isAllowed = true;
            }
		}

		if (isChangePasswordRequired) {
			changePasswordRequired();
		}else if ( isAllowed ) {
			EventBroadcaster.unsubscribe ( BroadcastMessages.KEY_ENTER, KickStart );
			this.justLogged = true;
			accessGranted ();
		} else {
			Application.unlock ( KickStart );
			if ( bindingMap.decks != null ) { // on Welcome we may get trapped here!
				accesssDenied ();
			}
		}
		WebServiceProxy.isFaultHandler = true;
		if ( wasEnabled ) {
			WebServiceProxy.isLoggingEnabled = true;
		}
	}
	
	/**
	 * Access granted.
	 */
	function accessGranted () {
		setTimeout ( function () {
			if ( bindingMap.decks != null ) {
				bindingMap.decks.select ( "loadingdeck" );
			}
			setTimeout ( function () {
				Application.login ();
			}, 0 );
		}, 0 );
	}

	/**
	 * Change Password Required.
	 */
	function changePasswordRequired() {

		setTimeout(function () {
			Application.unlock(KickStart);
			if (bindingMap.decks != null) {
			    bindingMap.decks.select("changepassworddeck");
				bindingMap.cover.attachClassName("widesplash");

				setTimeout(function () {
				    var passwordexpired = document.getElementById("passwordexpired");
				    passwordexpired.textContent = passwordexpired.textContent.replace("{0}", Installation.passwordExpirationTimeInDays);

					DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
					DataManager.getDataBinding("passwordold").focus();
				}, 0);

			}
		}, 25);
	}
	
	/**
	 * Access denied.
	 */
	function accesssDenied () {
	
		var username = DataManager.getDataBinding ( "username" );
		var password = DataManager.getDataBinding ( "password" );
			
		username.blur ();
		password.blur ();
		username.setValue ( "" );
		password.setValue ( "" );
		username.clean ();
		password.clean ();
		username.focus ();
		
		document.getElementById ( "loginerror" ).style.display = "block";
		
		var handler = {
			handleAction : function ( action ) {
				document.getElementById ( "loginerror" ).style.display = "none";
				action.target.removeActionListener ( 
					Binding.ACTION_DIRTY, handler 
				);
			}
		}
		bindingMap.loginfields.addActionListener ( 
			Binding.ACTION_DIRTY, handler 
		);
	}
	
	/*
	 * Fire on load!
	 */
	WindowManager.fireOnLoad ( this );
	
	/*
	 * Non-qualified browsers would run into a javascript  
	 * error in the UpdateManager when switching to the 
	 * not supported page. Let's disable the UpdateManager.
	 */
	if ( !isQualified ) {
		UpdateManager.isEnabled = false;
	}
}