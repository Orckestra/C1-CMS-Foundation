/**
 * Kickstarting the entire shebang.
 */
var KickStart = new function () {
	
	var isLocalStoreReady = false;
	var isLoggedIn = null;
	var isFirstTime = false;
	var isQualified = Client.qualifies ();
	
	var DEVUSERNAME = "admin";
	var DEVPASSWORD = "123456";
	

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
			InstallationService = WebServiceProxy.createProxy ( Constants.URL_WSDL_INSTALLSERVICE );

			EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);

			setTimeout(function () {
				Persistance.initialize(); // NOTE: We are not using this stuff!
			}, 0);
		
	};

	
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
				
			case BroadcastMessages.KEY_ENTER :
				this.login ();
				break;
				
			case BroadcastMessages.APPLICATION_LOGIN :
				var appwindow = window.bindingMap.appwindow;
				appwindow.setURL ( "app.aspx" );
				break;
				
			case BroadcastMessages.APPLICATION_OPERATIONAL :
				showWorkbench ();
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
					splashScreenData ();
					showLogin ();
				} else {
					showWelcome ();
				}
			}
		}
	}
	
	/**
	 * Splash screen data.
	 */
	function splashScreenData () {
		
		var ver = document.getElementById ( "version" );	
		ver.firstChild.data = ver.firstChild.data.replace ( "${version}", Installation.versionPrettyString );
		
		var build = document.getElementById ( "build" );
		build.firstChild.data = build.firstChild.data.replace ( "${build}", Installation.versionString );
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
			if ( Application.isDeveloperMode && Application.isLocalHost ) {
				DataManager.getDataBinding ( "username" ).setValue ( DEVUSERNAME );
				DataManager.getDataBinding ( "password" ).setValue ( DEVPASSWORD );
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
		var result = LoginService.ValidateAndLogin ( username, password );
		if ( result instanceof SOAPFault ) {
			alert ( result.getFaultString ());
		} else {
			isAllowed = result;
		}
		
		if ( isAllowed ) {
			EventBroadcaster.unsubscribe ( BroadcastMessages.KEY_ENTER, KickStart );
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