SystemLogger.TAB_SEQUENCE = "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;";

SystemLogger.LEVEL_INFO		= "info";
SystemLogger.LEVEL_DEBUG	= "debug";
SystemLogger.LEVEL_ERROR	= "error";
SystemLogger.LEVEL_WARN		= "warn";
SystemLogger.LEVEL_FATAL	= "fatal";
SystemLogger.LEVEL_FINE		= "fine";

/**
 * @type {boolean}
 */
SystemLogger.isFlushing = false;

/**
 * @class
 * Don't use constructor! Please use syntax SystemLogger.getLogger ( "string" )
 * @param {string} indentifier
 */
function SystemLogger ( identifier ) {
	
	/**
	 * @private
	 * @type {string}
	 */
	this.identifier = identifier;
}

/**
 * Info.
 */
SystemLogger.prototype.info = function ( message ) {
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_INFO, message );
}

/**
 * Debug.
 */
SystemLogger.prototype.debug = function ( message ) {
	
	if ( message == "page" ) {
		alert ( arguments.caller.callee );
	}
	
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_DEBUG, message );
}

/**
 * Error.
 */
SystemLogger.prototype.error = function ( message ) {
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_ERROR, message );
}

/**
 * Message.
 */
SystemLogger.prototype.warn = function ( message ) {
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_WARN, message );
}

/**
 * Fatal.
 */
SystemLogger.prototype.fatal = function ( message ) {
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_FATAL, message );
}

/**
 * Fine.
 */
SystemLogger.prototype.fine = function ( message ) {
	SystemLogger.log ( this.identifier, SystemLogger.LEVEL_FINE, message );
}



// STATIC PROPERTIES AND METHODS ....................................

/*
 * @type {HashMap<string><SystemLogger>}
 */
SystemLogger.loggers = {};

/**
 * TODO: datatype this!
 * @type {List}
 */
SystemLogger.buffer = new List ();

/**
 * Collect logs in buffer only.
 * Invoked by {@link Application}
 */
SystemLogger.suspend = function () {
	
	SystemLogger.outputWindow	= null;
	SystemLogger.outputDocument = null;
	SystemLogger.outputElement 	= null;
	
	SystemLogger.log = SystemLogger.bufferLog;
}

/**
 * Flush buffer to screen.
 * Invoked by {@link Application}
 * @param {DOMDocumentView} win
 */
SystemLogger.unsuspend = function ( win ) {
	
	SystemLogger.outputWindow	= win;
	SystemLogger.outputDocument = win.document;
	SystemLogger.outputElement 	= win.document.body;
	
	SystemLogger.log = SystemLogger.outputLog;
	SystemLogger.flushBuffer ();
}

/**
 * @param {string} indentifier
 */
SystemLogger.getLogger = function ( identifier ) {

	var logger = SystemLogger.loggers [ identifier ];
	if ( !logger ) {
		logger = new SystemLogger ( identifier );
		SystemLogger.loggers [ identifier ] = logger;
	}
	return logger;
}

/**
 * During starup, all logs are collected in a buffer. The buffer 
 * can be flushed to screen by calling this method.
 */
SystemLogger.flushBuffer = function () {
	
	SystemLogger.buffer.reset ();
	SystemLogger.isFlushing = true;
	
	if ( SystemLogger.buffer.hasEntries ()) {
		while ( SystemLogger.buffer.hasNext ()) {
			var entry = SystemLogger.buffer.getNext ();
			this.log ( 
				entry.identifier,
				entry.level,
				entry.message
			);
		}
	}
	SystemLogger.isFlushing = false;
}

/**
 * Simply collect logs in a buffer.
 * @param {string} identifier
 * @param {string} level
 * @param {string} message
 */
SystemLogger.bufferLog = function (identifier, level, message) {

	if (Application.isDeveloperMode) {
		message = String(message);

		SystemLogger.buffer.add({
			identifier: identifier,
			level: level,
			message: message
		});
	}
}

/**
 * Display logs on screen (while still collecting them in a buffer).
 * @param {string} level
 * @param {string} message
 */
SystemLogger.outputLog = function ( identifier, level, message ) {

	message = String ( message );
	 
	if ( !SystemLogger.isFlushing ) {
		SystemLogger.bufferLog ( 
			identifier, 
			level, 
			message 
		);
	}
	
	var win		= SystemLogger.outputWindow;
	var doc		= SystemLogger.outputDocument;
	var elm		= SystemLogger.outputElement;
	var div 	= doc.createElement ( "div" );
	var span 	= doc.createElement ( "span" );
	var pre 	= doc.createElement ( "pre" );
	
	/*
	 * Only mozilla seems to grok the intention 
	 * of tabs and newlines in PRE elements....
	 */
	if ( Client.isExplorer ) {
		message = message.replace ( /</g, "&lt;" );
		message = message.replace ( />/g, "&gt;" );
		message = message.replace ( /\n/g, "<br/>" );
		message = message.replace ( /\t/g, SystemLogger.TAB_SEQUENCE );
		pre.innerHTML = message;
	} else {
		pre.textContent = message;
	}
	
	div.className = level;
	span.innerHTML = identifier;
	div.appendChild ( span );
	div.appendChild ( pre );
	//if ( level == SystemLogger.LEVEL_FATAL ) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		elm.insertBefore ( div, elm.firstChild );
	//}
	
	win.scrollTo ( 0, 0 );
}

/** 
 * By default, collecting logs in buffer.
 * @param {string} level
 * @param {string} message
 */
SystemLogger.log = SystemLogger.bufferLog;

/**
 * Clear all log entries.
 */
SystemLogger.clear = function () {
	
	SystemLogger.buffer = new List ();
	var doc = SystemLogger.outputDocument;
	if ( doc ) {
		doc.body.innerHTML = "";
	}
}