/**
 * @type {BindingSerializer}
 */
BindingSerializer.activeInstance = null;

/**
 * @type {string}
 */
BindingSerializer.KEYPOINTER = "bindingserializerkeypointer";

/**
 * This filter function is intended for the {@link ElementIterator}.
 * It's not elegant. But at least we get to use the ElementIterator! 
 * TODO: REFACTOR now that extra arguments are provided to the filter!
 * @param {DOMElement} element
 */
BindingSerializer.filter = function ( element ) {

	var keyPointer = null;
	var wasBindingSerializeable = false;
	var parentKeyPointer = element.parentNode.getAttribute ( BindingSerializer.KEYPOINTER );

	if ( UserInterface.hasBinding ( element )) {
		var binding = UserInterface.getBinding ( element );
		wasBindingSerializeable = BindingSerializer.activeInstance.indexBinding ( binding );
		if ( wasBindingSerializeable ) {
			keyPointer = binding.key;
			element.setAttribute ( BindingSerializer.KEYPOINTER, keyPointer ) 
		}
	}
	keyPointer = keyPointer ? keyPointer : parentKeyPointer;
	var children = new List ( element.childNodes );
	children.each ( function ( child ) {
		if ( child.nodeType == Node.ELEMENT_NODE ) {
			child.setAttribute ( BindingSerializer.KEYPOINTER, keyPointer ) 
		}
	});
	if ( wasBindingSerializeable ) {
		BindingSerializer.activeInstance.append ( keyPointer, parentKeyPointer );
	}
}

/**
 * @class
 */
function BindingSerializer () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BindingSerializer" );

	/**
	 * @type {DOMDocument}
	 */
	this._dom = DOMUtil.getDOMDocument ();
	
	/*
	 * TEMP!
	 */
	alert ( "BindingSerializer: Convert to Crawler!" );
	
	/**
	 * @type {HashMap<string><DOMElement>}
	 */
	this._pointers = [];
}

BindingSerializer.prototype.serializeBinding = function ( binding ) {

	BindingSerializer.activeInstance = this;
	binding.bindingWindow.ElementIterator.iterate ( 
		binding.bindingElement, 
		BindingSerializer.filter
	);
	return DOMSerializer.serialize ( this._dom, true );
}

BindingSerializer.prototype.indexBinding = function ( binding ) {

	var wasBindingSerialized = false;
 	var properties = binding.serialize ();
	
	if ( properties != false ) {
		
		/*
		 * The filter queries this return value.
		 */
		wasBindingSerialized = true;
		
		/*
		 * create a new element in the serialization 
		 * document and index it with a pointer key.
		 */
		var nodeName = "ui:" + DOMUtil.getLocalName ( binding.bindingElement );
		var element = DOMUtil.createElementNS ( Constants.NS_UI, nodeName, this._dom );
		this._pointers [ binding.key ] = element;
		
		/*
		 * Assign binding properties.
		 */
		for ( var prop in properties ) {
			if ( properties [ prop ] != null ) {
				element.setAttribute ( prop, String ( properties [ prop ]));
			}
		}	
	}
	return wasBindingSerialized;
}

/**
 * @param {string} keyPointer
 * @param {string} parentKeyPointer
 */
BindingSerializer.prototype.append = function ( keyPointer, parentKeyPointer ) {
	
	var childNode = this._pointers [ keyPointer ];	
	var parentNode = parentKeyPointer ? this._pointers [ parentKeyPointer ] : this._dom;
	parentNode.appendChild ( childNode );	
}
