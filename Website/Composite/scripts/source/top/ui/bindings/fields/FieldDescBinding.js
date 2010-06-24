FieldDescBinding.prototype = new Binding;
FieldDescBinding.prototype.constructor = FieldDescBinding;
FieldDescBinding.superclass = Binding.prototype;

/**
 * The fielddescbinding constructs a {@link LabelBinding}  
 * in order to support alphatransparent PNG images.
 * @class
 */
function FieldDescBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldDescBinding" );
	
	return this;
}

/**
 * Identifies binding.
 */
FieldDescBinding.prototype.toString = function () {

	return "[FieldDescBinding]";
}

/** 
 * @overloads {Bindong#onBindingAttach}
 */
FieldDescBinding.prototype.onBindingAttach = function () {
	
	// FieldDescBinding.superclass.onBindingAttach.call ( this );
	Binding.prototype.onBindingAttach.call ( this );
	
	this.buildDOMContent (); 
	this.attachDOMEvents ();
}

/**
 * Build DOM content.
 */
FieldDescBinding.prototype.buildDOMContent = function () {

	// image
	var image = this.getProperty ( "image" );
	if ( image ) {
		this.setImage ( image );
	}
	
	// tooltip
	var tooltip	= this.getProperty ( "tooltip" );
	if ( tooltip ) {
		this.setToolTip ( tooltip );
	}
	
	// label
	var label = this.getProperty ( "label" );
	if ( label ) {
		this.setLabel ( label );
	}
}

/**
 * Attach DOM events.
 * Attach listeners to focus DataBinding when label is clicked.
 */
FieldDescBinding.prototype.attachDOMEvents = function () {

	/*
	 * Don't use mousedown since this will simultaneously blur HTML input fields.
	 */
	this.addEventListener ( DOMEvents.CLICK );
}

/**
 * Focus related DataBinding when label is clicked.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
FieldDescBinding.prototype.handleEvent = function ( e ) {

	FieldDescBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) { 
		case DOMEvents.CLICK :
			var field = this.getAncestorBindingByLocalName ( "field" );
			if ( field ) {
				var isContinue = true;
				field.getDescendantBindingsByLocalName ( "*" ).each (
					function ( binding ) {
						if ( Interfaces.isImplemented ( IData, binding )) {
							binding.focus ();
							isContinue = false;
						}
						return isContinue;
					}
				);
			}
			break;
	}	
}

/**
 * Set label.
 * @param {string} label
 */
FieldDescBinding.prototype.setLabel = function ( label ) {
	
	this.setProperty ( "label", label );
	if ( this.isAttached ) {
		this.bindingElement.innerHTML = Resolver.resolve ( label );
	}
}

/**
 * Get label. First check label property; then analyze text content.
 * @return {string}
 */
FieldDescBinding.prototype.getLabel = function () {
	
	var label = this.getProperty ( "label" );
	if ( !label ) {
		var node = this.bindingElement.firstChild;
		if ( node && node.nodeType == Node.TEXT_NODE ) {
			label = node.data;
		}
	}
	return label;
}

/**
 * Set image.
 * TODO: getter?
 * @param {string} image
 */
FieldDescBinding.prototype.setImage = function ( image ) {
	
	this.setProperty ( "image", image );
	if ( this.isAttached ) {
		throw "FieldDescBinding: Images not suppoerted!";
	}
}

/** 
 * Set tooltip.
 * TODO: getter?
 * @param {string} tooltip
 */
FieldDescBinding.prototype.setToolTip = function ( tooltip ) {
	
	this.setProperty ( "tooltip", tooltip );
	if ( this.isAttached ) {
		this.bindingElement.title = tooltip;
	}
}

/**
 * FieldDescBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {FieldDescBinding}
 */
FieldDescBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:fielddesc", ownerDocument );
	return UserInterface.registerBinding ( element, FieldDescBinding );
}