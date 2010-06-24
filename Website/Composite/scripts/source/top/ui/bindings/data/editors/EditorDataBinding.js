EditorDataBinding.prototype = new WindowBinding;
EditorDataBinding.prototype.constructor = EditorDataBinding;
EditorDataBinding.superclass = WindowBinding.prototype;


/**
 * This WindowBinding implements the DataBinding interface.
 * @implements {IData}
 * @class
 */
function EditorDataBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorDataBinding" );
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = false; // HUH?
	
	/**
	 * Sublcasses will define this.
	 * @type {string}
	 */
	this._url = WindowBinding.DEFAULT_URL;
	
	/**
	 * @type {boolean}
	 */
	this.isDirty = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
EditorDataBinding.prototype.toString = function () {

	return "[EditorDataBinding]";
};

/**
 * @overloads {WindowBinding#onBindingRegister}
 * @overloads {DataBinding#onBindingRegister}
 */
EditorDataBinding.prototype.onBindingRegister = function () {
	
	EditorDataBinding.superclass.onBindingRegister.call ( this );
	DataBinding.prototype.onBindingRegister.call ( this );
	
	/*
	 * Hide IE flash-of-white when loading.
	 */
	this._coverBinding = this.add ( 
		CoverBinding.newInstance ( this.bindingDocument )
	).attach ();
	
	var url = this._url;
	var provider = this.getProperty ( "stateprovider" );
	var handle = this.getProperty ( "handle" );
	if ( provider != null && handle != null ) {
		url = url.replace ( "${stateprovider}", provider ).replace ( "${handle}", handle );
	} else {
		url = url.split ( "?" )[ 0 ];
	}
	this.logger.debug ( "Loading URL: " + url );
	this.setURL ( url );
};

/**
 * @overloads {DataBinding#onBindingAttach}
 */
EditorDataBinding.prototype.onBindingAttach = function () {

	EditorDataBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( Binding.ACTION_DIRTY );
	Application.lock ( this ); // unlocked by method _onPageInitialize
};

/**
 * Unlock when contained page initializes.
 * @overloads {WindowBinding#_onPageInitialize}
 * @param {PageBinding} binding
 */
EditorDataBinding.prototype._onPageInitialize = function ( binding ) {
	
	EditorDataBinding.superclass._onPageInitialize.call ( this, binding );
	
	if ( this._pageBinding != null ) {
		Application.unlock ( this );
		this._coverBinding.hide ();
	}
} 

/**
 * TODO: Should this fellow be transferred to IData?
 * @param {String} name
 */
EditorDataBinding.prototype.setName = DataBinding.prototype.setName;



// IMPLEMENT IDATA ...........................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
EditorDataBinding.prototype.validate = function () {
	
	return this._pageBinding.validateAllDataBindings ();
};

/**
 * @overloads {WindowBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
EditorDataBinding.prototype.handleAction = function ( action ) {
	
	EditorDataBinding.superclass.handleAction.call ( this, action );
	
	/*
	 * Collect dirty actions and assign them to myself. 
	 */
	switch ( action.type ) {
		case Binding.ACTION_DIRTY :
			if ( action.target != this ) {
				if ( !this.isDirty ) {
					this.dirty ();
				}
				action.consume ();
			}
			break;
	}
}

/**
 * This binding does not manifest itself in current context window, but it  
 * may instruct contained window to instigate a postback. Long story, but  
 * the return value will instruct the {PageBinding} to stop the press and wait.
 * @see {PageBinding#_setupDotNet}
 * @overloads {DataBinding#manifest}
 * @implements {IData}
 * @return {EditorDataBinding}
 */
EditorDataBinding.prototype.manifest = function () {}

/**
 * Pollute dirty flag. Note that the local DataManager is NOT informed about this 
 * since the dirty event should not count as a real update to this.contextDocument. 
 * This way, we know how to save only frames that were really updated... 
 * @implements {IData}
 */
EditorDataBinding.prototype.dirty = function () {
	
	if ( !this.isDirty ) {
		this.isDirty = true;
		this.dispatchAction ( Binding.ACTION_DIRTY );
	}
}

/**
 * Clean dirty flag. Note recursive iframe infiltration!
 * @implements {IData}
 */
EditorDataBinding.prototype.clean = function () {
	
	this._pageBinding.cleanAllDataBindings ();
	DataBinding.prototype.clean.call ( this );
}

/**
 * Focus.
 * @implements {IFocusable}
 */
EditorDataBinding.prototype.focus = function () {
	
	// TODO: focus first focusable!!!!
};

/**
 * Blur.
 * @implements {IFocusable}
 */
EditorDataBinding.prototype.blur = function () {};

/**
 * Get name.
 * @return {string}
 */
EditorDataBinding.prototype.getName = function () {};

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
EditorDataBinding.prototype.getValue = function () {};

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
EditorDataBinding.prototype.setValue = function ( value ) {};

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
EditorDataBinding.prototype.getResult = function () {
	
	return null;
};

/**
 * Set result.
 * @implements {IData}
 * @param {object} result
 */
EditorDataBinding.prototype.setResult = function ( result ) {};