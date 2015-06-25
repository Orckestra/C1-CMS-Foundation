SplitPanelBinding.prototype = new ControlBoxBinding;
SplitPanelBinding.prototype.constructor = SplitPanelBinding;
SplitPanelBinding.superclass = ControlBoxBinding.prototype;
//SplitPanelBinding.MIN_WIDTH = 220;

/**
 * @class
 * Notice that we inherit ControlBoxBinding. This dependency can be assumed specific 
 * for stage layout splitboxes. Consider refactoring this (postponed for now 
 * because IE gets stressed by too many flexboxes).
 */
function SplitPanelBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SplitPanelBinding" );
	
	/** 
	 * @type {SplitBoxBinding} 
	 */
	this._containingSplitBoxBinding = null;
	
	/** 
	 * @type {boolean} 
	 */
	this.isCollapsed = false;
	
	/** 
	 * @type {boolean} 
	 */
	this.isFixed = false;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = true;
	
	/**
	 * @type {int}
	 */
	this._fixedSpan = null;
	
	/**
	 * This could in theory be disabled, but it fixes a rendering bug in Explorer.
	 * Notice that the property gets switched once in a while by the splitbox.
	 * @see {SplitBoxBinding#invokeLayout} 
	 * @overwrites {FlexBoxBinding#isFlexible}
	 * @type {boolean}
	 */
	this.isFlexible = true; //TRUE
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SplitPanelBinding.prototype.toString = function () {

	return "[SplitPanelBinding]";
}

/*
SplitPanelBinding.prototype.serialize = function () {
	// ratio
	// ratiocache
	// collapsed
}
*/

/**
 * @overloads {ControlBoxBinding#onBindingAttach}
 */
SplitPanelBinding.prototype.onBindingAttach = function () {
	
	SplitPanelBinding.superclass.onBindingAttach.call ( this );
	
	this._containingSplitBoxBinding = this.getAncestorBindingByLocalName ( "splitbox" );
	this.attachClassName ( this._containingSplitBoxBinding.getOrient ());
	this.parseDOMProperties ();
}

/**
 * Parse DOM properties.
 */
SplitPanelBinding.prototype.parseDOMProperties = function () {
	
	// the type property is reflected in the CSS classname
	var type = this.getProperty ( "type" );
	if ( type ) {
		this.attachClassName ( type );
	}

	// implement fixed width
	var fix = this.getProperty ( "fix" );
	if ( fix ) {
		this.setFix ( fix );
	}
	
	var hidden = this.getProperty ( "hidden" );
	if ( hidden ) {
		this.hide ();
	}
}

/**
 * Collapse.
 */
SplitPanelBinding.prototype.collapse = function () {

	this.hide ();
	this.isCollapsed = true;
	this.setProperty ( "collapsed", "true" );
}

/**
 * Collapse.
 */
SplitPanelBinding.prototype.unCollapse = function () {

	this.show ();
	this.isCollapsed = false;
	this.deleteProperty ( "collapsed" );
}

/**
 * Hide.
 * @overwrites {Binding#hide}
 */
SplitPanelBinding.prototype.hide = function () {
	
	if ( this.isVisible == true ) {
		this.setProperty ( "ratiocache", this.getRatio ());
		this.setRatio ( 0 );
		this.bindingElement.style.display = "none"; // nescessary for Explorer!
		this.setProperty ( "hidden" , true );
		this.isVisible = false;
	}
}

/**
 * Show.
 * @overwrites {Binding#show}
 */
SplitPanelBinding.prototype.show = function () {

	if ( !this.isVisible ) {
		var ratiocache = this.getProperty ( "ratiocache" );
		if ( ratiocache ) {
		 	this.setRatio ( ratiocache );
			this.deleteProperty ( "ratiocache" );
		} else {
			this._containingSplitBoxBinding.computeLayout (); // ADDED!
		}
		this.bindingElement.style.display = "block";
		this.deleteProperty ( "hidden" );
		this.isVisible = true;
		
		/*
		} else {
			throw new Error ( "SplitPanelBinding: missing required property: ratiocache" );
		}
		*/
	}
}

/**
 * Set width.
 * @param {number} width
 */
SplitPanelBinding.prototype.setWidth = function ( width ) {

	if ( !this.isFixed  ) {
		if ( width != this.getWidth ()) {
			if ( width < 0 ) {
				width = this.getWidth (); // TODO: EXPLORER BUG!
				this.logger.warn ( "SplitPanelBinding#setWidth bug in Internet Explorer!" );
			}
			try {
				this.bindingElement.style.width = width + "px";
			} catch ( exception ) {
				alert ( "SplitPanelBinding#setWidth: Occult width: " + width );
				alert ( arguments.caller.callee );
			}
		}
	}
}

/**
 * Get width.
 * @return {number}
 */
SplitPanelBinding.prototype.getWidth = function () {

	var result = null;
	if ( this.isFixed ) {
		result = this.getFix ();
	} else {
		result = this.bindingElement.offsetWidth;
	}
	return result;
}

/**
 * Set width.
 * @param {number} height
 */
SplitPanelBinding.prototype.setHeight = function ( height ) {
	
	/*
	SystemDebug.stack ( arguments );
	this.logger.debug ( Math.random ())
	*/
	
	if ( !this.isFixed ) {
		if ( height != this.getHeight ()) {
			try {
				this.bindingElement.style.height = height + "px";
			} catch ( exception ) {
				alert ( "SplitPanelBinding.prototype.setHeight" + arguments.caller.callee );
			}
		}
	}
}

/**
 * Get height.
 * @return {number}
 */
SplitPanelBinding.prototype.getHeight = function () {

	var result = null;
	if ( this.isFixed ) {
		result = this.getFix ();
	} else {
		result = this.bindingElement.offsetHeight;
	}
	return result;
}

/**
 * Set ratio. This property is set by the {@link SplitBoxBinding}
 * @param {number} value
 */
SplitPanelBinding.prototype.setRatio = function ( value ) {

	this.setProperty ( "ratio", value );
}

/**
 * Get ratio. Remember to consider fixation when using the ratio.
 * @return {number}
 */
SplitPanelBinding.prototype.getRatio = function () {

	return this.getProperty ( "ratio" );
}

/**
 * Set or remove fix.
 * TODO: something is wrong with horizontal splitboxes - should be investigated.
 * @param {int} fixedspan Fixed span in pixels - use null or false to unfix.
 */
SplitPanelBinding.prototype.setFix = function ( fixedSpan ) {
	
	if ( fixedSpan ) {
		this._fixedSpan = fixedSpan;
		switch ( this._containingSplitBoxBinding.getOrient ()) {
			case SplitBoxBinding.ORIENT_HORIZONTAL :
				this.logger.warn ( "Fix not properly supported on horizontal splitboxes!" );
				this.setWidth ( fixedSpan ); /***/
				break;
			case SplitBoxBinding.ORIENT_VERTICAL :
				this.setHeight ( fixedSpan );
				break;
		}
		this.isFixed = true;
	} else {
		this._fixedSpan = null;
		this.isFixed = false;
		// TODO: should this recalculate splitbox layout?
	}
}

/**
 * Get fixed width/height.
 * @return {int}
 */
SplitPanelBinding.prototype.getFix = function () {
	
	return this._fixedSpan;
}

/**
 * SplitPanelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SplitPanelBinding}
 */
SplitPanelBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:splitpanel", ownerDocument );
	return UserInterface.registerBinding ( element, SplitPanelBinding );
}