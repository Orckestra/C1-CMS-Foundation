ToolBarLabelBinding.prototype = new Binding;
ToolBarLabelBinding.prototype.constructor = ToolBarLabelBinding;
ToolBarLabelBinding.superclass = Binding.prototype;

/**
 * @class
 * Simple text (and possibly an image) on the toolbar.
 */
function ToolBarLabelBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarLabelBinding" );
}

/**
 * Identifies binding.
 */
ToolBarLabelBinding.prototype.toString = function () {
	
	return "[ToolBarLabelBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ToolBarLabelBinding.prototype.onBindingAttach = function () {
	
	ToolBarLabelBinding.superclass.onBindingAttach.call ( this );
	
	this._labelBinding = this.add ( LabelBinding.newInstance ( this.bindingDocument ));
	this.shadowTree.label = this._labelBinding;
	
	var label = this.getProperty ( "label" );
	var image = this.getProperty ( "image" );
	
	if ( label ) {
		this.setLabel ( label );
	}
	
	if ( image ) {
		this.setImage ( image );
	}
}

/**
 * Set label.
 * @param {string} label
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
ToolBarLabelBinding.prototype.setLabel = function ( label, isNotBuildingClassName ) {
	
	if ( this.isAttached ) {
		this._labelBinding.setLabel ( label, isNotBuildingClassName );
	}
	this.setProperty ( "label", label );
}

/**
 * Set image.
 * @param {string} image
 * @param {boolean} isNotBuildingClassName Set to true for faster screen update.
 */
ToolBarLabelBinding.prototype.setImage = function ( image, isNotBuildingClassName ) {
	
	if ( this.isAttached ) {
		this._labelBinding.setImage ( image, isNotBuildingClassName );
	}
	this.setProperty ( "image", image );
}

/**
 * ToolBarLabelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarLabelBinding}
 */
ToolBarLabelBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarlabel", ownerDocument );
	return UserInterface.registerBinding ( element, ToolBarLabelBinding );
}