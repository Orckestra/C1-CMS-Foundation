/**
 * @class
 * Broadcasting keys globally. This class is closely connected to the 
 * KeyGroupBinding going on in the root application file "top.aspx".
 */
function _Keyboard () {}

_Keyboard.prototype = {
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "Keyboard" ),
	
	/** 
	 * @type {boolean}
	 */
	isShiftPressed : false,
	
	/** 
	 * @type {boolean}
	 */
	isControlPressed : false,
	
	/**
	 * Enter key pressed.
	 */
	keyEnter : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_ENTER );
	},
	
	/**
	 * Escape key pressed.
	 */
	keyEscape : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_ESCAPE );
	},
	
	/**
	 * Space key pressed.
	 */
	keySpace : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_SPACE );
	},
	
	/**
	 * Shift key pressed. Another broadcast is 
	 * transmitted when the shift key is released.
	 * @see {Keyboard#keyUp} 
	 */
	keyShift : function () {
		
		this.isShiftPressed = true;
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_SHIFT_DOWN );
	},
	
	/**
	 * Control key pressed. Another broadcast is 
	 * transmitted when the control key is released.
	 * @see {Keyboard#keyUp}
	 */
	keyControl : function () {
		
		this.isControlPressed = true;	
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_CONTROL_DOWN );
	},
	
	/**
	 * Arrow key pressed.
	 */
	keyArrow : function ( key ) {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_ARROW, key );
	},
	
	/**
	 * Arrow key pressed.
	 */
	keyAlt : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_ALT );
	},
	
	/**
	 * Tab key pressed.
	 */
	keyTab : function () {
		
		EventBroadcaster.broadcast ( BroadcastMessages.KEY_TAB );
	},
	
	/**
	 * Special broadcast whenever the shift or control key is released. 
	 * This method is invoked by the local {@link DocumentManager}.
	 * @param {KeyEvent} e
	 */
	keyUp : function ( e ) {
		
		if ( this.isShiftPressed && e.keyCode == window.KeyEventCodes.VK_SHIFT ) {
			this.isShiftPressed = false;
			EventBroadcaster.broadcast ( BroadcastMessages.KEY_SHIFT_UP );
		} else if ( this.isControlPressed && e.keyCode == window.KeyEventCodes.VK_CONTROL ) {
			this.isControlPressed = false;
			EventBroadcaster.broadcast ( BroadcastMessages.KEY_CONTROL_UP );
		}
	}
}

/**
 * The instance that does it.
 */
var Keyboard = new _Keyboard ();