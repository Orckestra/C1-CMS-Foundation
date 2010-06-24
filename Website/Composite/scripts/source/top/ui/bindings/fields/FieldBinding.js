FieldBinding.prototype = new Binding;
FieldBinding.prototype.constructor = FieldBinding;
FieldBinding.superclass = Binding.prototype;

/**
 * @class
 */
function FieldBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldBinding" );
	
	/**
	 * @type {string}
	 */
	this.bindingRelation = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldBinding.prototype.toString = function () {

	return "[FieldBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
FieldBinding.prototype.onBindingRegister = function () {
	
	FieldBinding.superclass.onBindingRegister.call ( this );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
	
	var relation = this.getProperty ( "relation" );
	if ( relation != null ) {
		this.bindingRelation = relation;
		this.subscribe ( BroadcastMessages.BINDING_RELATE );
		this.hide ();
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
FieldBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	FieldBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.BINDING_RELATE :
			if ( arg.relate == this.bindingRelation && arg.origin == this.bindingDocument ) {
				if ( arg.result == true ) {
					if ( !this.isVisible ) {
						this.show ();
						this.dispatchAction ( Binding.ACTION_UPDATED );
					}
				} else {
					if ( this.isVisible ) {
						this.hide ();
						this.dispatchAction ( Binding.ACTION_UPDATED );
					}
				}
			}
			break;
	}
}

/**
 * FieldBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {FieldBinding}
 */
FieldBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:field", ownerDocument );
	return UserInterface.registerBinding ( element, FieldBinding );
}                                                          