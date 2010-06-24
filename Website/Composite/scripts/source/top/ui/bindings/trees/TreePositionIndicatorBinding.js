TreePositionIndicatorBinding.prototype = new Binding;
TreePositionIndicatorBinding.prototype.constructor = TreePositionIndicatorBinding;
TreePositionIndicatorBinding.superclass = Binding.prototype;

/**
 * @class
 */
function TreePositionIndicatorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreePositionIndicatorBinding" );
	
	/**
	 * TODO: REFACTOR TO POINT!
	 * @type {object}
	 */
	this._geometry = {
		x : 0,
		y : 0
	}
}

/**
 * Identifies binding.
 */
TreePositionIndicatorBinding.prototype.toString = function () {
	
	return "[TreePositionIndicatorBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TreePositionIndicatorBinding.prototype.onBindingAttach = function () {
	
	TreePositionIndicatorBinding.superclass.onBindingAttach.call ( this );
	this.hide ();
}

/**
 * @param {Point} point
 */
TreePositionIndicatorBinding.prototype.setPosition = function ( point ) {
	
	this.bindingElement.style.left = point.x + "px";
	this.bindingElement.style.top = point.y + "px";
	
	this._geometry.x = point.x;
	this._geometry.y = point.y;
}

/**
 * @return {Point}
 */
TreePositionIndicatorBinding.prototype.getPosition = function () {

	return new Point ( 
		this._geometry.x,
		this._geometry.y
	);
}

/**
 * TreePositionIndicatorBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreePositionIndicatorBinding}
 */
TreePositionIndicatorBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treepositionindicator", ownerDocument );
	return UserInterface.registerBinding ( element, TreePositionIndicatorBinding );
}