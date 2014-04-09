/*
 * Pseudoimplement DOM2 Node interface.
 */
if ( !window.Node ) {
	window.Node = {
		ELEMENT_NODE				: 1,
		ATTRIBUTE_NODE				: 2,
		TEXT_NODE					: 3,
		CDATA_SECTION_NODE			: 4,
		ENTITY_REFERENCE_NODE		: 5,
		ENTITY_NODE					: 6,
		PROCESSING_INSTRUCTION_NODE	: 7,
		COMMENT_NODE				: 8,
		DOCUMENT_NODE				: 9,
		DOCUMENT_TYPE_NODE			: 10,
		DOCUMENT_FRAGMENT_NODE		: 11,
		NOTATION_NODE				: 12
	};
}

/*
 * Clone Java Swing KeyEvent interface.
 * TODO: investigate ALT and INSERT.
 */
window.KeyEventCodes = {
	
	VK_BACK						: 8,
	VK_TAB						: 9,
	VK_ENTER					: 13,
	VK_SHIFT					: 16,
	VK_CONTROL					: 17,
	VK_ALT						: 18,
	VK_ESCAPE					: 27,
	VK_SPACE					: 32,
	VK_PAGE_UP					: 33,
	VK_PAGE_DOWN				: 34,
	VK_END						: 35,
	VK_HOME						: 36,
	VK_LEFT						: 37,
	VK_UP						: 38,
	VK_RIGHT					: 39,
	VK_DOWN						: 40,
	VK_COMMAND					: 91,
	VK_INSERT					: null,
	VK_DELETE					: 127,
	VK_PLUS						: 187,
	VK_MINUS					: 189,
	VK_NUMPLUS					: 107,
	VK_NUMMINUS					: 109,
	VK_F1						: 112
};

/**
 * Global pointer to the root application window object. 
 * Please don't use too many of these global variables! 
 * @type {DOMDocumentView>
 */
if ( window == top ) {
	window.app = this;
} else {
	window.app = top.app;
}

/**
 * All bindings with a specified ID will be mapped here. 
 * @see {Binding#_updateBindingMap}
 * @type {HashMap<string><Binding>
 */
window.bindingMap = {};

/** 
 * @see {Application#framework}
 * @type {StandardEventHandler}
 */
window.standardEventHandler = null;

/*
 * Localize top level objects. From this point on, top level 
 * objects may be addressed without the "top" notation. This  
 * requires that the object is named identically to the file 
 * that loads it (Java convention). See ScriptLoaderControl.
 */
if ( window != window.top ) {
	
	top.Application.declareTopLocal ( window );
}

/*
 * Uncomment this to hunt down stray alerts.
 * 
new function () {
	var oldalert = window.alert;
	window.alert = function ( string ) {
		SystemLogger.getLogger ( "window.alert" ).debug ( string );
		oldalert ( string );
		SystemDebug.stack ( arguments );
	}
}
*/

/**
 * Accessed through instance variable "WindowManager" declared below.
 */
function _WindowManager () {
	
	this._construct ( KeyMaster.getUniqueKey ());
}

_WindowManager.prototype = {
		
	/*
	 * TODO: These are not really constants any more.
	 */
	WINDOW_LOADED_BROADCAST		: null,
	WINDOW_UNLOADED_BROADCAST	: null,
	WINDOW_EVALUATED_BROADCAST	: null,
	WINDOW_RESIZED_BROADCAST 	: null,
	
	/**
	 * @type {boolean}
	 */
	isWindowLoaded : false,
	
	_logger						: SystemLogger.getLogger ( "WindowManager [" + document.title + "]" ),
	_ondomstatements 			: new List (),
	_onloadstatements 			: new List (),
	_onresizestatements 		: new List (),
	
	_currentDimensions			: null,
	_newDimensions				: null,
	_broadcastTimeout			: null,
	_isHorizontalResize 		: false,
	_isVerticalResize 			: false,
	_broadcastTimeout			: null,
	
	/**
	 * Using unique key to compute various other keys.
	 * @param {string} string
	 * @return {string} 
	 */
	_compute : function ( string, key ) {
	
		return string.replace ( "${windowkey}", document.location + ":" + key );
	},
	
	/**
	 * Constructor action.
	 */
	_construct : function ( key ) {
		
		/*
		 * Define broadcast "constants".
		 */
		this.WINDOW_LOADED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_LOADED, key );
		this.WINDOW_UNLOADED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_UNLOADED, key );
		this.WINDOW_EVALUATED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_EVALUATED, key );
		this.WINDOW_RESIZED_BROADCAST 	= this._compute ( BroadcastMessages.$WINKEY_RESIZED, key );
		
		/*
		 * Action on load and unload.
		 */
		DOMEvents.addEventListener ( window, DOMEvents.DOM, this );
		DOMEvents.addEventListener ( window, DOMEvents.LOAD, this );
		DOMEvents.addEventListener ( window, DOMEvents.UNLOAD, this );
	},
	
	/**
	 * Implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
	
		switch ( e.type ) {
			
			case DOMEvents.DOM :
				this.onDOMContentLoaded ();
				break;
		
			case DOMEvents.LOAD :
				
				/*
				 * Can this happen twice? 
				 * Maybe descendant frames loading?
				 */
				if ( !this.isWindowLoaded ) {
					
					this.isWindowLoaded = true;
					
					/*
					 * Intercepted by DocumentManager. Register and attach Bindings.
					 */
					EventBroadcaster.broadcast ( this.WINDOW_LOADED_BROADCAST, this );
					
					while ( this._onloadstatements.hasNext ()) {
						this._onloadstatements.getNext ().fireOnLoad ();
					}
					
					/*
					 * Setup resize and unload events.
					 */
					this._currentDimensions = this.getWindowDimensions ();
					DOMEvents.addEventListener ( window, DOMEvents.RESIZE, this );
					EventBroadcaster.broadcast ( this.WINDOW_EVALUATED_BROADCAST, this );
					DOMEvents.removeEventListener ( window, DOMEvents.LOAD, this );
					DOMEvents.stopPropagation ( e );
				}
				break;
				
			case DOMEvents.RESIZE :
			
				/*
				 * Handling the top browser window will consume the mousedown event.
				 * Let's fire a global broadcast to close open menus and stuff.
				 */
				if ( window == top ) {
					EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, document.body );
				}
				
				/*
				 * These statements will be executed RIGHT NOW. As of Firefox 3.6, 
				 * this implies that both browsers will fire them a million times 
				 * while resizing.
				 */
				this._onresizestatements.reset ();
				while ( this._onresizestatements.hasNext ()) {
					this._onresizestatements.getNext ().fireOnResize ();
				}
				
				/*
				 * EventBroadcasts are executed after a short timeout. 
				 * The timeout cancels itself on each resize event. 
				 * This will make sure that onresize methods aren't 
				 * executed a million times when user resizes window.
				 */
				this._newDimensions = WindowManager.getWindowDimensions ();
				var isHorizontalResize = this._newDimensions.w != this._currentDimensions.w;
				var isVerticalResize = this._newDimensions.h != this._currentDimensions.h;
				
				if ( isHorizontalResize || isVerticalResize ) {
					if ( this._broadcastTimeout != null ) {
						clearTimeout ( this._broadcastTimeout );
						this._broadcastTimeout = null;
					}
					var self = this;
					this._broadcastTimeout = setTimeout ( function () { 
						self._broadcastResizeEvent ();
					}, 250 );
				}
				break;
				
			case DOMEvents.UNLOAD :
			
				/*
				 * Currently not intercepted by nothing.
				 */
				EventBroadcaster.broadcast ( this.WINDOW_UNLOADED_BROADCAST );
				break;
		}
	},
	
	/**
	 * Broadcast resize event globally. 
	 */
	_broadcastResizeEvent : function () {
		
		clearTimeout ( this._broadcastTimeout );
		this._broadcastTimeout = null;
		EventBroadcaster.broadcast ( this.WINDOW_RESIZED_BROADCAST );
		this._currentDimensions = this._newDimensions;
	},
	
	/**
	 * Add DOMContentLoaded observer.
	 * @param {IDOMHandler} onDomHandler
	 */
	fireOnDOM : function ( onDomHandler ) {
		
		if ( Interfaces.isImplemented ( IDOMHandler, onDomHandler, true )) {
			this._ondomstatements.add ( onDomHandler );
		}
	},
	
	/**
	 * Add onload observer.
	 * @param {ILoadHandler} onLoadHandler
	 */
	fireOnLoad : function ( onLoadHandler ) {
		
		if ( Interfaces.isImplemented ( ILoadHandler, onLoadHandler, true )) {
			this._onloadstatements.add ( onLoadHandler );
		}
	},
	
	/**
	 * Add onresize observer.
	 * @param {IResizeHandler} onResizeHandler
	 */
	fireOnResize : function ( onResizeHandler ) {
		
		if ( Interfaces.isImplemented ( IResizeHandler, onResizeHandler, true )) {
			this._onresizestatements.add ( onResizeHandler );
		}
	},
	
	/**
	 * Note that in IE, this method will be invoked by the WindowAsssitant.
	 * TODO: Will IE9 support DOMContentLoaded event?
	 */
	onDOMContentLoaded : function () {
		
		while ( this._ondomstatements.hasNext ()) {
			this._ondomstatements.getNext ().fireOnDOM ();
		}
	},
	
	/**
	 * @return {Dimension}
	 */
	getWindowDimensions : function () {
	
		return new Dimension (
			Client.isMozilla ? window.innerWidth : document.body.clientWidth,
			Client.isMozilla ? window.innerHeight : document.body.clientHeight
		);
	},
	
	/*
	 * In Mozilla strict error parsing mode, eval must be performed locally  
	 * not to fire a warning. You cannot invoke "anotherWindow.eval(xxx)" ...
	 * http://groups.google.com/group/jquery-en/browse_thread/thread/9e6ed95bce10e2a4
	 * bug #359159 
	 */
	evaluate : function ( string ) {
		return eval ( string );
	}
}

/**
 * The instance that does it.
 * @type {_WindowManager}
 */
var WindowManager = new _WindowManager ();