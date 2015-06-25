MenuBinding.prototype = new MenuContainerBinding;
MenuBinding.prototype.constructor = MenuBinding;
MenuBinding.superclass = MenuContainerBinding.prototype;

function MenuBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuBinding" );
	
	/**
	 * @type {LabelBinding}
	 */
	this.labelBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this.isFocused = false;
}

/**
 * Identifies binding.
 */
MenuBinding.prototype.toString = function () {

	return "[MenuBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
MenuBinding.prototype.onBindingAttach = function () {

	MenuBinding.superclass.onBindingAttach.call ( this );
	this.buildDOMContent ();
	this.assignDOMEvents ();
}

/**
 * Build DOM content.
 */
MenuBinding.prototype.buildDOMContent = function () {

	var image 		= this.getProperty ( "image" );
	var label 		= this.getProperty ( "label" );
	var tooltip 	= this.getProperty ( "tooltip" );

	this.labelBinding = LabelBinding.newInstance ( this.bindingDocument );
	this.labelBinding.attachClassName ( "menulabel" );
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
 * Reset visual appearance when menus are closed. 
 */
MenuBinding.prototype.reset = function () {
	
	this.detachClassName ( "hover" );
}

/**
 * Set image.
 * @param {string} url
 */
MenuBinding.prototype.setImage = function ( url ) {

	this.setProperty ( "image", url );
	if ( this.isAttached ) {
		this.labelBinding.setImage ( 
			url
		);
	}
}

/**
 * Set label.
 * @param {string} label
 */
MenuBinding.prototype.setLabel = function ( label ) {

	this.setProperty ( "label", label );
	if ( this.isAttached ) {
		this.labelBinding.setLabel ( 
			Resolver.resolve ( label )
		);
	}
}

/**
 * Set tooltip.
 * @param {string} tooltip
 */
MenuBinding.prototype.setToolTip = function ( tooltip ) {

	this.setProperty ( "tooltip", tooltip );
	if ( this.isAttached ) {
		this.labelBinding.setToolTip ( 
			Resolver.resolve ( tooltip )
		);
	}
}

/**
 * Get image.
 * @return {string}
 */
MenuBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}

/**
 * Get label.
 * @return {string}
 */
MenuBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}


/**
 * Get tooltip.
 * @return {string}
 */
MenuBinding.prototype.getToolTip = function () {

	return this.getProperty ( "tooltip" );
}

/**
 * Assigning DOM events.
 */
MenuBinding.prototype.assignDOMEvents = function () {
	
	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEOUT );
	this.addEventListener ( DOMEvents.MOUSEUP );
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
MenuBinding.prototype.handleEvent = function ( e ) {
	
	MenuBinding.superclass.handleEvent.call ( this, e );
	
	var container = this.getMenuContainerBinding ();
	
	if ( !BindingDragger.isDragging ) {
	
		switch ( e.type ) {
			
			case DOMEvents.MOUSEDOWN :
				if ( container.isOpen ( this )) {
					DOMEvents.stopPropagation ( e );
				}
				break;
				
			case DOMEvents.MOUSEOVER :
				if ( container.isOpen () && !container.isOpen ( this )) {
					this.show ();
					this.menuPopupBinding.grabKeyboard ();
				}
				this.attachClassName ( "hover" );
				this.isFocused = true;
				break;
				
			case DOMEvents.MOUSEOUT :
				if ( !container.isOpen ()) {
					this.hide ();
				}
				this.isFocused = false;
				break;
				
			case DOMEvents.MOUSEUP :
				if ( !container.isOpen ( this )) {
					this.show ();
					this.menuPopupBinding.grabKeyboard ();
				}
				DOMEvents.stopPropagation ( e );
				break;
		}
	}
	
	/*
	 * Consuming the event!
	 */
	DOMEvents.stopPropagation ( e );
}
