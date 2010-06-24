BroadcasterBinding.prototype = new Binding;
BroadcasterBinding.prototype.constructor = BroadcasterBinding;
BroadcasterBinding.superclass = Binding.prototype;

/**
 * @class
 * The broadcaster can mysteriously project its properties onto other bindings. 
 * By updating a single broadcaster, multiple other bindings will update. This 
 * setup is handled using the (other) bindings "observes" property.
 */
function BroadcasterBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BroadcasterBinding" );
	
	/**
	 * @type {HashMap<string><List<Binding>>}
	 */
	this._observers = null;
}

/**
 * Identifies binding.
 */
BroadcasterBinding.prototype.toString = function () {

	return "[BroadcasterBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
BroadcasterBinding.prototype.onBindingRegister = function () {

	BroadcasterBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this._observers = new List ();
}

/**
 * All broadcaster property updates will be transmitted to observers. 
 * @overloads {Binding#setProperty}
 * @param {string} attname The name of the attribute
 * @param {object} value The attribute value.
 */
BroadcasterBinding.prototype.setProperty = function ( attname, value ) {
	
	BroadcasterBinding.superclass.setProperty.call ( this, attname, value );
	
	function update ( list ) {
		if ( list ) {
			list.each ( function ( binding ) {
				binding.setProperty ( attname, value );
			});
		}
	}
	if ( this._observers [ "*" ] != null ) {
		update ( this._observers [ "*" ]);
	}
	var observers = this._observers [ attname ];
	if ( observers ) {
		update ( observers );
	}
}

/**
 * All broadcaster property deletions will be mimicked by observers. 
 * @overloads {Binding#deleteProperty}
 * @param {string} attname The name of the attribute
 */
BroadcasterBinding.prototype.deleteProperty = function ( attname ) {
	
	BroadcasterBinding.superclass.deleteProperty.call ( this, attname );
	
	function update ( list ) {
		if ( list ) {
			list.each ( function ( binding ) {
				binding.deleteProperty ( attname );
			});
		}
	}
	if ( this._observers [ "*" ] != null ) {
		update ( this._observers [ "*" ]);
	}
	var observers = this._observers [ attname ];
	if ( observers ) {
		update ( observers );
	}
}

/**
 * Add observer binding.
 * @param {Binding} binding
 * @param {string} properties A whitespace-separated list of properties to watch
 */
BroadcasterBinding.prototype.addObserver = function ( binding, properties ) {
	
	properties = properties ? properties : "*";
	properties = new List ( properties.split ( " " ));
	
	while ( properties.hasNext ()) {
		var property = properties.getNext ();
		switch ( property ) {
			case "*" :
				this._setAllProperties ( binding );
				break;
			default :
				var value = this.getProperty ( property );
				binding.setProperty ( property, value );
				break;
		}
		if ( !this._observers [ property ]) {
			this._observers [ property ] = new List ();
		}
		this._observers [ property ].add ( binding );
	}
}

/**
 * Transmit all properties to specified binding.
 * @param {Binding} binding
 */
BroadcasterBinding.prototype._setAllProperties = function ( binding ) {
	
	var atts = new List ( this.bindingElement.attributes );
	while ( atts.hasNext ()) {
		var att = atts.getNext ();
		if ( att.specified ) {
			var property = att.nodeName;
			switch ( property ) {
				case "id" :
				case "key" :
					break;
				default :
					var value = this.getProperty ( property );
					binding.setProperty ( 
						property,
						value
					);
					break;
			}
		}
	}
}

/**
 * Remove observer binding.
 * TODO: Test this method!
 * @param {Binding} binding
 * @param {string} properties A whitespace-separated list of properties to watch
 */
BroadcasterBinding.prototype.removeObserver = function ( binding, properties ) {
	
	properties = properties ? properties : "*";
	properties = new List ( properties.split ( " " ));
	
	while ( properties.hasNext ()) {
		var list = this._observers [ properties.getNext ()];
		if ( list ) {
			while ( list.hasNext ()) {
				var entry = list.getNext ();
				if ( entry == binding ) {
					list.del ( entry );
				}
			}
		}
	}
}

/**
 * This method provides a prettified interface for 
 * updating the always popular disabled property. 
 */
BroadcasterBinding.prototype.disable = function () {
	
	this.setDisabled ( true );
}

/**
 * This method provides a prettified interface for 
 * updating the always popular disabled property. 
 */
BroadcasterBinding.prototype.enable = function () {
	
	this.setDisabled ( false );
}

/**
 * This method provides a prettified interface for 
 * updating the always popular disabled property. 
 * @param {boolean} isDisabled
 */
BroadcasterBinding.prototype.setDisabled = function ( isDisabled ) {
	
	this.setProperty ( "isdisabled", isDisabled );
}

/**
 * This method provides a prettified interface for 
 * checking the always popular disabled property. 
 * @return {boolean}
 */
BroadcasterBinding.prototype.isDisabled = function () {
	
	return this.getProperty ( "isdisabled" ) == true;
}