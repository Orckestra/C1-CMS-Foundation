TabBinding.prototype = new Binding;
TabBinding.prototype.constructor = TabBinding;
TabBinding.superclass = Binding.prototype;

TabBinding.ACTION_SELECTED = "tabselected";
TabBinding.ACTION_UNSELECTED = "tabunselected";
TabBinding.NODENAME_TABBOX = "tabbox";

/**
 * @class
 * TabBinding.
 */
function TabBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabBinding" );
	
	/**
	 * This property is set by the {@link TabBoxBinding}.
	 * @type {string}
	 */
	this.tabboxkey = null;
	
	/**
	 * @type {boolean}
	 */
	this.isSelected	= false;
	
	/**
	 * @type {LabelBinding}
	 */
	this.labelBinding = null;
	
	/**
	 * @type {TabBoxBinding}
	 * @private
	 */
	this.containingTabBoxBinding = null;
	
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
TabBinding.prototype.toString = function () {

	return "[TabBinding]";
}

/**
 * Serialize binding.
 * @return {HashMap<string><object>}
 */
TabBinding.prototype.serialize = function () {
	
	var result = TabBinding.superclass.serialize.call ( this );
	if ( result ) {
		result.label = this.getLabel ();
		result.image = this.getImage ();
		result.tooltip = this.getToolTip ();
	}
	return result;
}

/**
 * Dispatching action to initialize containing tabboxbinding.
 * Overloads {Binding#onBindingAttach}
 */
TabBinding.prototype.onBindingAttach = function () {
	
	TabBinding.superclass.onBindingAttach.call ( this );
	this.defaultElementPosition = DOMUtil.getComputedStyle ( this.bindingElement, "position" );
	this.defaultElementLeft = DOMUtil.getComputedStyle ( this.bindingElement, "left" );
	this.containingTabBoxBinding = this.getAncestorBindingByType ( TabBoxBinding );
	this.buildDOMContent ();
	this.assignDOMEvents ();
	this.dispatchAction ( Binding.ACTION_ATTACHED );
	
	if ( this.getProperty ( "selected" ) == true ) {
		this.containingTabBoxBinding.select ( this, true );
	}	
}

/**
 * Build DOM content.
 */
TabBinding.prototype.buildDOMContent = function () {

	var image 		= this.bindingElement.getAttribute ( "image" );
	var label 		= this.bindingElement.getAttribute ( "label" );
	var tooltip 	= this.bindingElement.getAttribute ( "tooltip" );

	/*
	 * Assign default classname.
	 */
	this.bindingElement.className = "default";

	this.labelBinding = LabelBinding.newInstance ( this.bindingDocument );
	this.shadowTree.labelBinding = this.labelBinding;
	this.labelBinding.attachClassName ( "tablabel" );
	this.add ( this.labelBinding );

	if ( label ) {
		this.setLabel ( label );
	}
	if ( image ) {
		this.setImage ( image );
	}
	if ( tooltip ) {
		this.setToolTip ( tooltip );
	}
}

/**
 * @param {string} string
 */
TabBinding.prototype.setImage = function ( url ) {
	
	this.setProperty ( "image", url );
	if ( this.isAttached ) {
		this.labelBinding.setImage ( 
			url
		);
	}
}

/**
 * @return {string}
 */
TabBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}

/**
 * @param {string} label
 */
TabBinding.prototype.setLabel = function ( label ) {

	if ( label != null ) {
		this.setProperty ( "label", label );	
		if ( this.isAttached ) {
			this.labelBinding.setLabel ( label )
		}
	}
}

/**
 * @return {string}
 */
TabBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}

/**
 * @param {string} tooltip
 */
TabBinding.prototype.setToolTip = function ( tooltip ) {

	if ( tooltip ) {
		this.setProperty ( "tooltip", tooltip );	
		if ( this.isAttached ) {
			this.labelBinding.setToolTip ( tooltip )
		}
	}
}

/**
 * @return {string}
 */
TabBinding.prototype.getToolTip = function () {

	return this.getProperty ( "tooltip" );
}

/**
 * Assigning DOM events.
 */
TabBinding.prototype.assignDOMEvents = function () {
	
	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this.addEventListener ( DOMEvents.MOUSEENTER );
	this.addEventListener ( DOMEvents.MOUSELEAVE );
}

/**
 * @implements {IEventListener}.
 * @overlads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
TabBinding.prototype.handleEvent = function ( e ) {

	TabBinding.superclass.handleEvent.call ( this, e );
	
	if ( !this.isSelected ) {
	
		var isAbort = false;
		if ( Client.isMozilla == true ) {
			/*
			 * something must be done!
			var related = e.relatedTarget;
			var current = e.currentTarget;
			this.logger.debug ( current.parentNode == related );
			*/
		}	
		if ( !isAbort ) {
			switch ( e.type ) {
				case DOMEvents.MOUSEENTER :
				case DOMEvents.MOUSEOVER :
					if ( !this.isSelected ) {
						this.bindingElement.className = "hover";
					}
					break;
				case DOMEvents.MOUSELEAVE :
				case DOMEvents.MOUSEOUT :
					if ( !this.isSelected ) {
						this.bindingElement.className = "default";
					}
					break;
				case DOMEvents.MOUSEDOWN :
					if ( !DOMEvents.isRightButton ( e )) {
						this.containingTabBoxBinding.select ( this );
					}
					break;
			}
		}
	}
}

/**
 * Select tab. This method should only be invoked by the {@link TabBoxBinding}.
 * TODO: Rename to invokeManagedSelect
 */
TabBinding.prototype.select = function ( isManaged ) {

	this.show (); // here?
	this.isSelected = true;
	this.setProperty ( "selected", true );
	this.bindingElement.className = "selected";
}

/**
 * Unselect tab. This method should only be invoked by the {@link TabBoxBinding}.
 * TODO: Rename to invokeManagedUnselect
 */
TabBinding.prototype.unselect = function () {

	this.isSelected = false;
	this.deleteProperty ( "selected" );
	this.bindingElement.className = "default";
}

/**
 * @param {boolean} isHighlight
 */
TabBinding.prototype.highlight = function (isHighlight) {
	if (isHighlight) {
		this.shadowTree.labelBinding.attachClassName("highlighted");
	} else {
		this.shadowTree.labelBinding.detachClassName("highlighted");
	}
}

/**
 * Hide tab. Notice that we cannot simply use "display:none" because we need access 
 * to the offsetWidth property when managing tabstrip layout. Accessing style property 
 * directly instead of assigning a CSS classname is preferred because its faster.
 * @overwrites {Binding#hide}
 */
TabBinding.prototype.hide = function () {

	if ( this.isVisible ) {
		this.bindingElement.style.position = "absolute";
		this.bindingElement.style.left = "-1000px";
		this.isVisible = false;
	}
}

/**
 * Show tab. 
 * @overwrites {Binding#show}
 */
TabBinding.prototype.show = function () {

	if ( !this.isVisible ) {
		this.bindingElement.style.position = this.defaultElementPosition;
		this.bindingElement.style.left = this.defaultElementLeft;
		this.isVisible = true;
	}
}


/**
 * TabBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TabBinding}
 */
TabBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:tab", ownerDocument );
	return UserInterface.registerBinding ( element, TabBinding );
}