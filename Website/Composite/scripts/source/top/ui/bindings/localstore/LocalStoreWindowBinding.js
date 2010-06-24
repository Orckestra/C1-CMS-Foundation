LocalStoreWindowBinding.prototype= new WindowBinding;
LocalStoreWindowBinding.prototype.constructor = LocalStoreWindowBinding;
LocalStoreWindowBinding.superclass = WindowBinding.prototype;
LocalStoreWindowBinding.URL = "${root}/content/misc/localstore/localstore.aspx";

/**
 * @class
 */
function LocalStoreWindowBinding () {
	
	/**
	 * @overloads {FlexBoxBinding#isFlexible}
	 * @type {boolean}
	 */
	this.isFlexible = false;
}

/**
 * Identifies binding.
 * @return {string}
 */
LocalStoreWindowBinding.prototype.toString = function () {
	
	return "[LocalStoreWindowBinding]";
}

/**
 * Load the localstore only if client has the correct Flash version installed.
 * @overloads {WindowBinding#onBindingRegister}
 */
LocalStoreWindowBinding.prototype.onBindingRegister = function () {
	
	LocalStoreWindowBinding.superclass.onBindingRegister.call ( this );
	if ( Client.hasFlash ) {
		this.setURL ( LocalStoreWindowBinding.URL );
	}
}