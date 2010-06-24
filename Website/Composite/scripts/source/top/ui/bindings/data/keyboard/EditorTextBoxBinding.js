EditorTextBoxBinding.prototype = new TextBoxBinding;
EditorTextBoxBinding.prototype.constructor = EditorTextBoxBinding;
EditorTextBoxBinding.superclass = TextBoxBinding.prototype;

/**
 * @class
 * Tab indent, tab preservation, no soft text wrap. Because of extremely different implementations, 
 * this has been split into two different bindings. Note that the box must be placed inside an 
 * <ui:flexbox> element to maximize it's sreen estate.
 * @see {MozEditorTextBoxBinding}
 * @see {IEEditorTextBoxBinding}
 */
function EditorTextBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorTextBoxBinding" );
	
	/**
	 * @overloads {TextBoxBinding#_hasWordWrap}
	 * @type {boolean}
	 */
	this._hasWordWrap = false;
}

/**
 * Identifies binding.
 */
EditorTextBoxBinding.prototype.toString = function () {
	
	return "[EditorTextBoxBinding]";
}

/**
 * @implements {IEventListener}
 * @overwrites {TextBoxBinding#handleEvent}
 * @param {Event} e
 */
EditorTextBoxBinding.prototype.handleEvent = function ( e ) {
	
	if ( this.isFocusable == true ) {
		switch ( e.type ) {
			
			case DOMEvents.FOCUS :
			case DOMEvents.BLUR :
				this._handleFocusAndBlur ( e.type == DOMEvents.FOCUS );
				break;
				
			case DOMEvents.KEYDOWN :
				this._handleKeyEvent ( e );
				break;
		}
	}
}

/**
 * @param {KeyEvent} e
 * @overloads {TextBoxBinding#_handleKeyEvent}
 */
EditorTextBoxBinding.prototype._handleKeyEvent = function ( e ) {
	
	switch ( e.keyCode ) {
		
		/*
		 * Handle TAB.
		 */
		case KeyEventCodes.VK_TAB :
			this._handleTabKey ( e.shiftKey );
			DOMEvents.stopPropagation ( e );
			DOMEvents.preventDefault ( e );
			break;
		
		/*
		 * Handle ENTER.
		 */
		case KeyEventCodes.VK_ENTER :
			this._handleEnterKey ();
			DOMEvents.stopPropagation ( e );
			DOMEvents.preventDefault ( e );
			break;
			
		/*
		 * Prevent ESC from reverting new value to original 
		 * value. This is default behavior in Explorer only. 
		 * We create input with JS, so our original is empty.
		 * TODO: This should also escape keyboard nav from editor!
		 */
		case KeyEventCodes.VK_ESCAPE :
			DOMEvents.preventDefault ( e );
			break;
	}
}

/**
 * Subclass must define this.
 * @param {boolean} isReverse
 */
EditorTextBoxBinding.prototype._handleTabKey = Binding.ABSTRACT_METHOD;

/**
 * Subclass must define this.
 */
EditorTextBoxBinding.prototype._handleEnterKey = Binding.ABSTRACT_METHOD;