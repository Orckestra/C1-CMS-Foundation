ImageToolBoxDraggerBinding.prototype = new Binding;
ImageToolBoxDraggerBinding.prototype.constructor = ImageToolBoxDraggerBinding;
ImageToolBoxDraggerBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ImageToolBoxDraggerBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageToolBoxDraggerBinding" );
	
	/**
	 * @overwrites {Binding#isDraggable}
	 */
	this.isDraggable = true;
}

/**
 * Identifies binding.
 */
ImageToolBoxDraggerBinding.prototype.toString = function () {
	
	return "[ImageToolBoxDraggerBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ImageToolBoxDraggerBinding.prototype.onBindingAttach = function () {
	
	ImageToolBoxDraggerBinding.superclass.onBindingAttach.call ( this );
	
	this.dragger.registerHandler ( 
		this.getAncestorBindingByLocalName ( "imagetoolbox" )
	);
}