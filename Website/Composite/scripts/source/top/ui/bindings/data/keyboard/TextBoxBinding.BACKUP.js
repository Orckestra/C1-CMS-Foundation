TextBoxBinding.prototype = new DataBinding;
TextBoxBinding.prototype.constructor = TextBoxBinding;
TextBoxBinding.superclass = DataBinding.prototype;

/**
 * @class
 * @implements {IData}
 * TODO: Refactor this whole lot to simply subclass the DataInputBinding!
 */
function TextBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TextBoxBinding" );
	
	/**
	 * @type {string}
	 */
	this.type = null;
	
	/**
	 * @type {boolean}
	 */
	this.isRequired = false;
	
	/**
	 * @type {boolean}
	 */
	this.isReadonly = false;
	
	/**
	 * @type {boolean}
	 */
	this.isDisabled = false;

	/**
	 * Used to cache value while displaying error messages.
	 * @type {string}
	 */
	this._value = null;
	
	/**
	 * @type {boolean}
	 */
	this._isValid = true;
	
	/**
	 * @type {boolean}
	 */
	this._invalidRequiredField = false;
	
	/**
	 * @type {object}
	 */
	this._sessionResult = null;
	
	/**
	 * @type {boolean}
	 */
	this._hasWordWrap = true;
	
	/**
	 * @type {boolean}
	 */
	this._isAutoSelect = false;
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FocusCrawler.ID ]);
	
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
 * @overloads {Binding#onBindingAttach}
 */
TextBoxBinding.prototype.onBindingAttach = function () {

	TextBoxBinding.superclass.onBindingAttach.call ( this );	
	this.propertyMethodMap [ "value" ] = this.setValue;
	this._buildDOMContent ();
	this._attachDOMEvents ();
}

/**
 * @overloads {Binding#onBindingDispose}
 */
TextBoxBinding.prototype.onBindingDispose = DataInputBinding.prototype.onBindingDispose;

/**
 * Build DOM content.
 */
TextBoxBinding.prototype._buildDOMContent = function () {
	
	/*
	 * Notice that only a subset of DataInputBinding 
	 * properties are parsed for this binding. 
	 * @see {DataInputBinding#_parseDOMProperties}
	 */
	
	var value = null;
	var defaultarea = DOMUtil.getElementsByTagName ( this.bindingElement, "textarea" ).item ( 0 );
	
	if ( defaultarea ) {
		value = defaultarea.value;
		this.bindingElement.removeChild ( defaultarea );
	}
	
	var	area = DOMUtil.createElementNS ( Constants.NS_XHTML, "textarea", this.bindingDocument );
	this.shadowTree.input = area;
	
	area.setAttribute ( "spellcheck", "false" );
	if ( !this._hasWordWrap ) {
		area.setAttribute ( "wrap", "off" );
	}

	this.shadowTree.box = DOMUtil.createElementNS ( Constants.NS_UI, "ui:box", this.bindingDocument );
	
	if ( !value ) {
		value = this.getProperty ( "value" );
	}
	if ( value ) {
		area.value = value;
	}
	
	var name = this.getName ();
	if ( name ) {
		area.name = name;
	}
	
	var isAutoSelect = this.getProperty ( "autoselect" );
	if ( isAutoSelect ) {
		this._isAutoSelect = true;
	}

	this.isRequired = this.getProperty ( "required" ) ? true : false;	
	var isDisabled = this.getProperty ( "isdisabled" );
	if ( isDisabled ) {
		this.setDisabled ( true );
	}
	
	var isReadOnly = this.getProperty ( "readonly" );
	if ( isReadOnly ) {
		this.setReadOnly ( true );
	}
	
	this.shadowTree.input.tabIndex = -1;
	this.shadowTree.box.appendChild ( area );
	this.bindingElement.appendChild ( this.shadowTree.box );
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
	if ( this.getValue () != newval ) {
		var manager = this.bindingWindow.UpdateManager;
		manager.report ( "Property [value] updated on binding \"" + this.getID () + "\"" );
		this.setValue ( newval );
	}
	return true;
};

/**
 * Attach DOM events.
 */
TextBoxBinding.prototype._attachDOMEvents = DataInputBinding.prototype._attachDOMEvents;

/**
 * @implements {IEventListener}
 * @param {Event} e
 */
TextBoxBinding.prototype.handleEvent = DataInputBinding.prototype.handleEvent;

/**
 * Handle DOM focus and blur.
 * @param {boolean} isFocus
 */
TextBoxBinding.prototype._handleFocusAndBlur = DataInputBinding.prototype._handleFocusAndBlur;

/**
 * Handle ENTER key. Unlike {@link DataInputBinding}, we won't preventDefault the event! 
 * @param {KeyEvent} e
 */
TextBoxBinding.prototype._handleEnterKey = function ( e ) {
	
	DOMEvents.stopPropagation ( e );
	// EventBroadcaster.broadcast ( BroadcastMessages.KEY_ENTER ); this would submit an open dialog!
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 */
TextBoxBinding.prototype.handleBroadcast = DataInputBinding.prototype.handleBroadcast;

/**
 * @see {DataInputBinding#setReadOnly}
 * @param {boolean} isReadOnly
 */
TextBoxBinding.prototype.setReadOnly = DataInputBinding.prototype.setReadOnly;

/**
 * @see {DataInputBinding#setDisabled}
 * @param {boolean} isDisabled
 */
TextBoxBinding.prototype.setDisabled = DataInputBinding.prototype.setDisabled;

/**
 * @see {DataInputBinding#onValueChange}
 */
TextBoxBinding.prototype.onValueChange = DataInputBinding.prototype.onValueChange;

/**
 * @see {DataInputBinding#select}
 */
TextBoxBinding.prototype.select = DataInputBinding.prototype.select;

/**
 * Check dirty.
 */
TextBoxBinding.prototype.checkDirty = DataInputBinding.prototype.checkDirty;

/**
 * Clean.
 * @overloads {DataBinding#clean}
 * @implements {IData}
 */
TextBoxBinding.prototype.clean = DataInputBinding.prototype.clean;

/**
 * Focus.
 * @implements {IData}
 */
TextBoxBinding.prototype.focus = DataInputBinding.prototype.focus;

/**
 * Blur.
 * @implements {IData}
 */
TextBoxBinding.prototype.blur = DataInputBinding.prototype.blur;

/**
 * Setup validation on focus.
 * @private
 */
TextBoxBinding.prototype._focus = DataInputBinding.prototype._focus;

/**
 * Validate on blur.
 * @private
 */
TextBoxBinding.prototype._blur = DataInputBinding.prototype._blur;

/**
 * Overwrite this!
 */
TextBoxBinding.prototype.onfocus = DataInputBinding.prototype.onfocus;

/**
 * Overwrite this!
 */
TextBoxBinding.prototype.onblur = DataInputBinding.prototype.onblur;

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
TextBoxBinding.prototype.validate = DataInputBinding.prototype.validate;

/**
 * @return {boolean}
 */
TextBoxBinding.prototype.isValid = DataInputBinding.prototype.isValid;

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
TextBoxBinding.prototype.manifest = function () {

	// do nothing
};

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
TextBoxBinding.prototype.getValue = DataInputBinding.prototype.getValue;

/**
 * Set value.
 * @param {string} value
 */
TextBoxBinding.prototype.setValue = DataInputBinding.prototype.setValue;

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
TextBoxBinding.prototype.getResult = TextBoxBinding.prototype.getValue;

/**
 * Set result.
 * @implements {IData}
 * @param {object} result
 */
TextBoxBinding.prototype.setResult = TextBoxBinding.prototype.setValue;