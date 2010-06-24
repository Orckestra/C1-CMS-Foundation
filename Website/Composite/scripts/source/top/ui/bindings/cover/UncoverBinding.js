UncoverBinding.prototype = new Binding;
UncoverBinding.prototype.constructor = UncoverBinding;
UncoverBinding.superclass = Binding.prototype;

/**
 * Considered private.
 * @type {UncoverBinding}
 */
UncoverBinding._bindingInstance = null;

/**
 * Invoke to normalize cursor.
 * @param {Position} pos
 */
UncoverBinding.uncover = function ( pos ) {
	
	var binding = UncoverBinding._bindingInstance;
	if ( Binding.exists ( binding )) {
		binding.setPosition ( pos );
	}
}

/**
 * @class
 * When a "busy" cover gets hidden, the wait cursor may 
 * hang on, indicating activity until the mouse is moved. 
 * We force a cursor update by positioning the uncover 
 * at exact mouse position.
 */
function UncoverBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "UncoverBinding" );
	
	/*
	 * Register globally.
	 */
	UncoverBinding._bindingInstance = this;
}

/**
 * Identifies binding.
 */
UncoverBinding.prototype.toString = function () {
	
	return "[UncoverBinding]";
}

/**
 * This will place the bindings CENTER at the specified position.
 * @param {Position} pos
 */
UncoverBinding.prototype.setPosition = function ( pos ) {
	
	this.bindingElement.style.display = "block";
	var dim = this.boxObject.getDimension ();
	
	pos.x -= 0.5 * dim.w;
	pos.y -= 0.5 * dim.h;
	
	pos.x = pos.x < 0 ? 0 : pos.x;
	pos.y = pos.y < 0 ? 0 : pos.y;
	
	this.bindingElement.style.left = String ( pos.x ) + "px";
	this.bindingElement.style.top = String ( pos.y ) + "px";
	this.bindingElement.style.cursor = "wait";
	
	/*
	 * Flashing the cursor property, 
	 * forcing IE to update rendering.
	 */
	var self = this;
	setTimeout ( function () {
		self.bindingElement.style.cursor = "default";
		self.bindingElement.style.display = "none";
	}, 0 );
}