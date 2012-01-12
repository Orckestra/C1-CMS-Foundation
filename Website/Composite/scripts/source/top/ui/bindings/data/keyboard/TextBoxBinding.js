TextBoxBinding.prototype = new DataInputBinding;
TextBoxBinding.prototype.constructor = TextBoxBinding;
TextBoxBinding.superclass = DataInputBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function TextBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TextBoxBinding" );
	
	/**
	 * For subclasses to negate.
	 * @type {boolean}
	 */
	this._hasWordWrap = true;
	
	/*
	 * Returnable.
	 */
	return this;
	
}

/**
 * Identifies binding.
 */
TextBoxBinding.prototype.toString = function () {

	return "[TextBoxBinding]";
}

/**
 * @overloads {DataInputBinding#_buildDOMContent}
 */
TextBoxBinding.prototype._buildDOMContent = function () {

	/*
	* Note that we nuke the textarea that may have been used to populate  
	* our value. That's because we'll replace it with our own area...
	*/
	var defaultarea = DOMUtil.getElementsByTagName(this.bindingElement, "textarea").item(0);
	if (defaultarea != null) {
		this.setValue(defaultarea.value);
		defaultarea.parentNode.removeChild(defaultarea);
	}

	/*
	* Super goes here!
	*/
	TextBoxBinding.superclass._buildDOMContent.call(this);

	/*
	* Textarea specials.
	*/
	if (Client.isMozilla) {
		var currentLang = Localization.currentLang();
		if (currentLang != null) {
			this.shadowTree.input.setAttribute("spellcheck", "true");
			this.shadowTree.input.setAttribute("lang", Localization.currentLang());
		} else {
			this.shadowTree.input.setAttribute("spellcheck", "false");
		}
	}
	else {
		this.shadowTree.input.setAttribute("spellcheck", "false");
	}

	if (!this._hasWordWrap) {
		this.shadowTree.input.setAttribute("wrap", "off");
	}

}

/**
 * Get input element. A textarea, in this case.
 * @return {HTMLInputElement}
 */
TextBoxBinding.prototype._getInputElement = function () {
	
	var element = DOMUtil.createElementNS ( Constants.NS_XHTML, "textarea", this.bindingDocument );
	element.tabIndex = -1;
	return element;
} 


/** 
 * Handle element update.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 * @return {boolean}
 */
TextBoxBinding.prototype.handleElement = function ( element ) {
	
	return true;
};

/** 
 * Update element.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * TODO: handle "value" property, though not normally used by server ???!!!
 * @param {Element} element
 * @return {boolean}
 */
TextBoxBinding.prototype.updateElement = function ( element ) {
	
	var newval, area = element.getElementsByTagName ( "textarea" ).item ( 0 );
	if ( area != null && area.hasChildNodes ()) {
		newval = DOMUtil.getTextContent ( area );
	}
	if ( newval == null ) {
		newval = "";
	}
	
	var manager = this.bindingWindow.UpdateManager;
	if ( this.getValue () != newval ) {
		manager.report ( "Property [value] updated on binding \"" + this.getID () + "\"" );
		this.setValue ( newval );
	}
	
	var newtype = element.getAttribute ( "type" );
	if ( this.type != newtype ) {
		manager.report ( "Property [type] updated on binding \"" + this.getID () + "\"" );
		this.type = newtype;
	}
	
	return true;
};

/**
 * Handle ENTER key. Lets not preventDefault the event!
 * @overwrites {DataInputBinding#_handleEnterKey} 
 * @param {KeyEvent} e
 */
TextBoxBinding.prototype._handleEnterKey = function ( e ) {
	
	DOMEvents.stopPropagation ( e );
};