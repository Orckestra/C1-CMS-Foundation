DialogTitleBarBinding.prototype = new Binding;
DialogTitleBarBinding.prototype.constructor = DialogTitleBarBinding;
DialogTitleBarBinding.superclass = Binding.prototype;

function DialogTitleBarBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogTitleBarBinding" );
	
	/**
	 * @type {TitleBarBodyBinding}
	 */
	this.bodyBinding = null;
	
	/**
	 * @type {LabelBinding}
	 */
	this.labelBinding = null;
	
	/**
	 * @type {ControlGroupBinding}
	 */
	this._controlGroupBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this.isDraggable = true;
}

DialogTitleBarBinding.prototype.toString = function () {
	return "[DialogTitleBarBinding]";
}

/**
 * Overloads {Binding#onBindingRegister}
 */
DialogTitleBarBinding.prototype.onBindingRegister = function () {
	
	DialogTitleBarBinding.superclass.onBindingRegister.call ( this );
	
	this.bodyBinding = this.add (
		DialogTitleBarBodyBinding.newInstance ( this.bindingDocument )
	);
	this.labelBinding = this.bodyBinding.add (
		LabelBinding.newInstance ( this.bindingDocument )
	);
	this.labelBinding.attachClassName ( "dialogtitle" );
}

/**
 * Overloads {Binding#onBindingAttach}
 */
DialogTitleBarBinding.prototype.onBindingAttach = function () {

	DialogTitleBarBinding.superclass.onBindingAttach.call ( this );
	
	var image = this.getProperty ( "image" );
	if ( image ) {
		this.setImage ( image );
	}
	var label = this.getProperty ( "label" );
	if ( label ) {
		this.setLabel ( label );
	}
}

/**
 * Set label.
 * @param {string} label
 */
DialogTitleBarBinding.prototype.setLabel = function ( label ) {

	if ( this.isAttached ) {
		this.labelBinding.setLabel ( label ) 
	};
	this.setProperty ( "label", label );
}

/**
 * Set image.
 * @param {string} url
 */
DialogTitleBarBinding.prototype.setImage = function ( url ) {

	this.labelBinding.setImage ( url ) 
	this.setProperty ( "image", url );
}

/**
 * Add control.
 * @param {ControlBinding} controlBinding
 */
DialogTitleBarBinding.prototype.addControl = function ( controlBinding ) {

	if ( !this._controlGroupBinding ) {
		this._controlGroupBinding = this.bodyBinding.addFirst (
			ControlGroupBinding.newInstance ( this.bindingDocument ) 
		);
	}
	this._controlGroupBinding.add ( controlBinding );
}

/**
 * Invoked by the DialogBinding on activation.
 */
DialogTitleBarBinding.prototype.onActivate = function () {
	
	if ( this._controlGroupBinding ) {
		this._controlGroupBinding.onActivate ();
	}
}

/**
 * Invoked by the DialogBinding on deactivation.
 */
DialogTitleBarBinding.prototype.onDeactivate = function () {
	
	if ( this._controlGroupBinding ) {
		this._controlGroupBinding.onDeactivate ();
	}
}

/**
 * DialogTitleBarBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MYBinding}
 */
DialogTitleBarBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:titlebar", ownerDocument );
	return UserInterface.registerBinding ( element, DialogTitleBarBinding );
}