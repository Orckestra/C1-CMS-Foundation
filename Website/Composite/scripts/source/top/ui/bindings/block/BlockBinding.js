BlockBinding.prototype = new Binding;
BlockBinding.prototype.constructor = BlockBinding;
BlockBinding.superclass = Binding.prototype;

/**
 * @class
 */
function BlockBinding () {
	
	/**
	 * @type {boolean}
	 */
	this._isBlocking = false;
	
	/*
	 * Returnable 
	 */
	return this;
}

/**
 * Identifies binding
 * @return {string}
 */
BlockBinding.prototype.toString = function () {
	
	return "[BlockBinding]";
}

/**
 * Block GUI.
 */
BlockBinding.prototype.block = function () {
	
	if ( !this._isBlocking ) {
		Application.lock ( this );
		this._isBlocking = true;
		this.show ();
	}
}

/**
 * Unblock gui.
 */
BlockBinding.prototype.unblock = function () {
	
	if ( this._isBlocking == true ) {
		this.hide ();
	}
}