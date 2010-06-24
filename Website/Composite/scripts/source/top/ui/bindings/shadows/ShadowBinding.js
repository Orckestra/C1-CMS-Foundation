ShadowBinding.prototype = new MatrixBinding;
ShadowBinding.prototype.constructor = ShadowBinding;
ShadowBinding.superclass = MatrixBinding.prototype;

/**
 * @class
 */
function ShadowBinding () {
 	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ShadowBinding" );
	
	/**
	 * @type {Binding}
	 */
	this.targetBinding = null;
	
	/**
	 * @type {int}
	 */
	this.offset = 4;
	
	/**
	 * @type {int}
	 */
	this.expand = 14;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = true;
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID ]);
}

/**
 * Identifies binding.
 */
ShadowBinding.prototype.toString = function () {

	return "[ShadowBinding]";
}

/**
 * Hide quickly - otherwise Firefox may show the shaodow in a flash.
 * @overloads {Binding#onBindingRegister}
 */
ShadowBinding.prototype.onBindingRegister = function () {

	ShadowBinding.superclass.onBindingRegister.call ( this );
	this.hide ();
}

/**
 * TODO: Interfacecheck for IFloating or something?
 * @param {Binding} binding
 */
ShadowBinding.prototype.shadow = function ( binding ) {
		
	this.targetBinding = binding;
	
	binding.addActionListener ( Binding.ACTION_POSITIONCHANGED, this );
	binding.addActionListener ( Binding.ACTION_DIMENSIONCHANGED, this );
	binding.addActionListener ( Binding.ACTION_VISIBILITYCHANGED, this );
	binding.bindingElement.parentNode.appendChild ( this.bindingElement );
	
	if ( binding.isVisible ) {
		this.show ();
		this.setPosition ( binding.getPosition ());
		this.setDimension ( binding.getDimension ());
	} else {
		this.hide ();
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ShadowBinding.prototype.handleAction = function ( action ) {
	
	ShadowBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	if ( binding == this.targetBinding ) {
		switch ( action.type ) {
			case Binding.ACTION_POSITIONCHANGED :
				this.setPosition ( this.targetBinding.getPosition ());
				action.consume ();
				break;
			case Binding.ACTION_DIMENSIONCHANGED :
				this.setDimension ( this.targetBinding.getDimension ());
				// don't consume - MenyBodyBinding could be listening!
				break;
			case Binding.ACTION_VISIBILITYCHANGED :
				if ( binding.isVisible ) {
					this.show ();
					this.setPosition ( binding.getPosition ());
					this.setDimension ( binding.getDimension ());
				} else {
					this.hide ();
				}
				break;
		}
	}
}

/**
 * @param {Point} point
 */
ShadowBinding.prototype.setPosition = function ( point ) {
	
	/* 
	 * This adjustment cannot be performed because the CSSComputer doesn't 
	 * update fast enough! The targetBinding must correct position manually.
	 *
	if ( this.targetBinding ) {
		var margin = CSSComputer.getMargin ( this.targetBinding.getBindingElement ());
		if ( margin.top && margin.top != 0 ) {
			point.y += margin.top;
		}
	}
	*/
	
	var adjust = this.offset - this.expand;
	this.bindingElement.style.left = new String ( point.x + adjust ) + "px";
	this.bindingElement.style.top = new String ( point.y + adjust ) + "px";
}

/**
 * @param {Dimension} dim
 */
ShadowBinding.prototype.setDimension = function ( dim ) {
	
	this.bindingElement.style.width = new String ( dim.w + 2 * this.expand ) + "px";
	this.bindingElement.style.height = new String ( dim.h + 2 * this.expand ) + "px";
}

/**
 * ShadowBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ShadowBinding}
 */
ShadowBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:shadow", ownerDocument );
	return UserInterface.registerBinding ( element, ShadowBinding );
}