LazyBindingBinding.prototype = new DataBinding;
LazyBindingBinding.prototype.constructor = LazyBindingBinding;
LazyBindingBinding.superclass = DataBinding.prototype;

/*
 * Used when constructing IDs for LazyBindings.
 */
LazyBindingBinding.ID_APPENDIX = "lazybinding";

/**
 * Change LazyBinding server submit value.
 * @param {Binding} binding
 */
LazyBindingBinding.wakeUp = function ( binding ) {

	var id = binding.bindingElement.id + LazyBindingBinding.ID_APPENDIX;
	var element = binding.bindingDocument.getElementById ( id );
	if ( element != null ) {
		var lazyBinding = UserInterface.getBinding ( element );
		lazyBinding.setResult ( true );
	}
}

/**
 * @class
 */
function LazyBindingBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LazyBindingBinding" );
	
	/**
	 * @overwrites {DataBinding#isFocusable}
	 */
	this.isFocusable = false;
	
	/**
	 * Flipped when lazy binding wakes up.
	 * @type {boolean}
	 */
	this._isLazy = false;
}

/**
 * Identifies binding.
 */
LazyBindingBinding.prototype.toString = function () {
	
	return "[LazyBindingBinding]";
}

/**
 * Mark lazy bindings in containing document. 
 * Attached bindings will not be affected.
 * @overloads {DataBinding#onBindingRegister}
 */
LazyBindingBinding.prototype.onBindingRegister = function () {
	
	LazyBindingBinding.superclass.onBindingRegister.call ( this );
	
	var id = this.getProperty ( "bindingid" );
	if ( id != null ) {
		
		// generation of the lazybindings ID attribute has been moved to XSLT! 
		// this.bindingElement.id = id + LazyBindingBinding.ID_APPENDIX;
		
		var element = this.bindingDocument.getElementById ( id );
		if ( element != null ) {
			var binding = UserInterface.getBinding ( element );
			if ( binding && !binding.isAttached ) {
				binding.isLazy = true;	
			} else {
				element.setAttribute ( "lazy", true );
			}
		}
	}
}

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
LazyBindingBinding.prototype.validate = function () {
	
	return true;
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
LazyBindingBinding.prototype.manifest = function () {
	
	/*
	 * TODO: Migrate to Binding.dotnetify!
	 */
	if ( this.isAttached ) {
		if ( this.shadowTree.input == null ) {
			this.shadowTree.input = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", this.bindingDocument );
			this.shadowTree.input.type = "hidden";
			this.shadowTree.input.name = this.getName ();
			this.bindingElement.appendChild ( this.shadowTree.input );
		}	
		this.shadowTree.input.value = this.getValue ();
	}
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
LazyBindingBinding.prototype.getValue = function () {
	
	return String ( this._isLazy );
}

/**
 * Set value.
 * @implements {IData}
 * @return {object}
 */
LazyBindingBinding.prototype.setValue = function () {
	
	throw "Not implemented";
}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
LazyBindingBinding.prototype.getResult = function () {
	
	return this._isLazy;
}

/**
 * Set result. This is intended for clientside processing.
 * @see {LazyBindingBinding#wakeUp}
 * @implements {IData}
 * @param {boolean} isLazy
 */
LazyBindingBinding.prototype.setResult = function ( isLazy ) {
	
	this._isLazy = isLazy
}