KeySetBinding.prototype = new Binding;
KeySetBinding.prototype.constructor = KeySetBinding;
KeySetBinding.superclass = Binding.prototype;

/**
 * MODIFIERS IMPLEMENTED
 * shift: 	The Shift key.
 * control:	The Control key.
 *
 * MODIFIERS NOT IMPLEMENTED
 * alt: 	The Alt key. On the Macintosh, this is the Option key.
 * meta: 	The Meta key. On the Macintosh, this is the Command key.
 * accel: 	The key used for keyboard shortcuts on the user's platform. Usually, this would be the value you would use.
 * access: 	The access key for activating menus and other elements. On Windows, this is the Alt key, used in conjuction with an element's accesskey.
 */


/**
 * @ type {HashMap<DOMDocument><HashMap<int><HashMap<string><IKeyEventHandler>>>}
 */
KeySetBinding.keyEventHandlers = {};
	
/**
 * Register keyevent handler.
 * @param {DOMDocument} doc
 * @param {string} key
 * @param {string} modifiers
 * @param {IKeyEventHandler} handler
 */
KeySetBinding.registerKeyEventHandler = function ( doc, key, modifiers, handler ) {
	
	var handlers = KeySetBinding.keyEventHandlers;
	
	if ( Interfaces.isImplemented ( IKeyEventHandler, handler, true ) == true ) {
		
		if ( modifiers != "*" ) {
			modifiers = KeySetBinding._sanitizeKeyModifiers ( modifiers );
		}
		var code = window.KeyEventCodes [ key ];
		if ( !code ) {
			code = key.charCodeAt ( 0 );
		}
		if ( !handlers [ doc ]) {
			handlers [ doc ] = {};
		}
		if ( !handlers [ doc ][ code ]) {
			handlers [ doc ][ code ] = {};
		}
		handlers [ doc ][ code ][ modifiers ] = handler;
	}
}

/**
 * Handle key.
 * @see {StandardEventHandler#_handleKeyDown}
 * @param {DOMDocument} doc
 * @param {KeyEvent} e
 * @return {boolean}
 */
KeySetBinding.handleKey = function ( doc, e ) {
	
	var isHandled = false;
	var code = e.keyCode;
	var handlers = KeySetBinding.keyEventHandlers;
	
	if ( handlers [ doc ] && handlers [ doc ][ code ]) {
	
		var modifiers = "[default]";	
		modifiers += code != KeyEventCodes.VK_SHIFT ? e.shiftKey ? " shift" : "" : "";
		if (Client.isMac) {
			modifiers += code != KeyEventCodes.VK_COMMAND ? e.metaKey ? " control" : "" : "";
		} else {
			modifiers += code != KeyEventCodes.VK_CONTROL ? e.ctrlKey ? " control" : "" : "";
		}
		modifiers += code != KeyEventCodes.VK_ALT ? e.altKey ? " alt" : "" : "";
		
		var handler = handlers [ doc ][ code ][ modifiers ];
		if ( handler == null ) {
			handler = handlers [ doc ][ code ][ "*" ];
		}
		
		if ( handler != null ) {
			
			/*
			 * The handler also handles any "preventDefault" 
			 * that my be relevant. "stopPropagation" is always invoked. 
			 */
			handler.handleKeyEvent ( e );
			isHandled = true;
		}
	}
	return isHandled;
}

/**
 * We need to index keyhandlers by modifiers in a clearly defined sequence.
 * @return {string}
 */
KeySetBinding._sanitizeKeyModifiers = function ( modifiers ) {
	 
	 var result = "[default]";
	 var mods = {};
	 
	 if ( modifiers ) {
		 new List ( modifiers.split ( " " )).each ( 
		 	function ( modifier ) {
		 		mods [ modifier ] = true;
		 	}	
		 );
		 function check ( modifier ) {
		 	if ( mods [ modifier ]) {
		 		result += " " + modifier;
		 	} 
		 }
		 check ( "shift" );
		 check ( "control" );
	}
	return result;
}

function KeySetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "KeySetBinding" );
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
KeySetBinding.prototype.toString = function () {
	
	return "[KeySetBinding]";
}

/**
 * Identifies binding.
 */
KeySetBinding.prototype.onBindingAttach = function () {
	
	KeySetBinding.superclass.onBindingAttach.call ( this );
	
	var self = this;
	var keys = new List ( 
		DOMUtil.getElementsByTagName ( this.bindingElement, "key" )
	);
	
	keys.each ( function ( key ) {
		
		var oncommand = key.getAttribute ( "oncommand" );
		var isPreventDefault = key.getAttribute ( "preventdefault" ) == "true";
		
		/*
		 * Register handler.
		 */
		KeySetBinding.registerKeyEventHandler (
				
			self.bindingDocument,
			key.getAttribute ( "key" ),
			key.getAttribute ( "modifiers" ), {
				
				/*
				 * This executes the action. 
				 * @param {KeyEvent} e
				 */
				handleKeyEvent : function ( e ) {
					DOMEvents.stopPropagation ( e );
					if ( isPreventDefault ) {
						DOMEvents.preventDefault ( e );
					}
					/*
					 * The timeout is needed for events 
					 * to properly cancel in Mozilla.
					 */
					var manager = self.bindingWindow.WindowManager;
					top.setTimeout ( function () {
						Binding.evaluate ( oncommand, self );
					}, 0 );
				}
			}
		);
	});
}