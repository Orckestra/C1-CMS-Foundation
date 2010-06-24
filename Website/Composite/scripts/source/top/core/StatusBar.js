/**
 * @class
 * This would control the statusbar near the bottom of the app window. 
 * Access this fellow through instance variable StatusBar declared below.
 */
function _StatusBar () {
	
	/**
	 * Time in milliseconds before 
	 * text gets faded out.
	 */
	this.AUTOCLEAR_TIMEOUT = 5 * 1000;
	
	/**
	 * Toolbar groups.
	 */
	this.GROUP_LANGUAGETOOLS = "languagetools";
	
	/**
	 * Handy when statusbar bindings are to be constructed from other windows.
	 * @type {HTMLDocument}
	 */
	this.document = null;
	
	/*
	 * Read current statusbar state.
	 */
	this.state = null;
	this.ERROR = "error";
	this.WARN = "warn";
	this.BUSY = "busy";
	this.READY = "ready";
	
	/*
	 * statusbar tool groups.
	 * @type {Map<string><ToolBarGroupBinding>}
	 */
	this._groups = new Map ();
	
	/*
	 * Privates.
	 */
	var logger = SystemLogger.getLogger ( "StatusBar" );
	var statusbar = null;
	
	var icon_error 		= "${icon:error}";
	var icon_warn 		= "${icon:warning}";
	var icon_busy 		= "${icon:loading}";
	var icon_ready 		= "${icon:message}";
	
	var message_error 	= null;
	var message_warn 	= null;
	var message_busy 	= null;
	var message_ready 	= null;
	
	/**
	 * Initialize.
	 * @param {StageStatusBarBinding} binding
	 */
	this.initialize = function ( binding ) {
		
		message_error 	= StringBundle.getString ( "ui", "Website.App.StatusBar.Error" );
		message_warn 	= StringBundle.getString ( "ui", "Website.App.StatusBar.Warn" );
		message_busy 	= StringBundle.getString ( "ui", "Website.App.StatusBar.Busy" );
		message_ready 	= StringBundle.getString ( "ui", "Website.App.StatusBar.Ready" );
		
		statusbar = binding;
		this.document = binding.bindingDocument;
	}
	
	// STATUSBAR MESSAGES .............................................................
	
	/**
	 * Show error. Clear manually!
	 * @param {string} message
	 * @param {array} vars
	 */
	this.error = function ( message, vars ) {
		
		this.state = StatusBar.ERROR;
		message = message ? message : message_error;
		show ( message, icon_error, vars, false );
	}
	
	/**
	 * Show warning. Clear manually!
	 * @param {string} message
	 * @param {array} vars
	 */
	this.warn = function ( message, vars ) {
		
		this.state = StatusBar.WARN;
		message = message ? message : message_warn;
		show ( message, icon_warn, vars, false );
	}
	
	/**
	 * Indicate busy. Clear manually!
	 * @param {string} message
	 * @param {array} vars
	 */
	this.busy = function ( message, vars ) {
		
		this.state = StatusBar.BUSY;
		message = message ? message : message_busy;
		show ( message, icon_busy, vars, false );
	}
	
	/**
	 * Indicate ready. This will clear itself automatically.
	 * @param {string} message
	 * @param {array} vars
	 */
	this.ready = function ( message, vars ) {
		
		this.state = StatusBar.READY;
		message = message ? message : message_ready;
		show ( message, icon_ready, vars, true );
	}
	
	/**
	 * Show custom message and icon.
	 * @param {string} message
	 * @param {string} icon
	 * @param {array} vars
	 * @param {boolean} isAutoClear
	 */
	this.report = function ( message, icon, vars, isAutoClear ) {
		
		this.state = null;
		show ( message, icon, vars, isAutoClear );
	}
	
	/**
	 * Clear message and icon.
	 */
	this.clear = function () {
		
		this.state = null;
		if ( statusbar ) {
			statusbar.clear ();
		}
	}
	
	/**
	 * Show message.
	 * @param {string} message
	 * @param {string} icon
	 * @param {array} vars
	 * @param {boolean} isAutoClear
	 */
	function show ( message, icon, vars, isAutoClear ) {
		
		if ( vars ) {
			message = Resolver.resolveVars ( message, vars );
		}
		if ( statusbar ) {
			statusbar.setLabel ( message );
			statusbar.setImage ( icon );
			if ( isAutoClear ) {
				statusbar.startFadeOut ( StatusBar.AUTOCLEAR_TIMEOUT );
			}
		} else {
			logger.error ( "Message not initialized for display: " + message );
		}
	}
	
	
	// STATUSBAR TOOLS ................................................................
	
	/** 
	 * @param {string} name
	 * @param {Binding} binding
	 */
	this.addToGroup = function ( name, binding ) {
		
		if ( !this._groups.has ( name )) {
			this._groups.set ( name, statusbar.addRight (
				ToolBarGroupBinding.newInstance ( this.document )
			));
		}
		this._groups.get ( name ).add ( binding );
	}
}

/*
 * The instance that does it.
 */
var StatusBar = new _StatusBar ();