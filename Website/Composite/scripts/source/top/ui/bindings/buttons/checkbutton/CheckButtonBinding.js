CheckButtonBinding.prototype = new ButtonBinding;
CheckButtonBinding.prototype.constructor = CheckButtonBinding;
CheckButtonBinding.superclass = ButtonBinding.prototype;

/**
 * @class
 */
function CheckButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CheckButtonBinding" );
	
	/**
	 * @overwrites {ButtonBinding#isCheckButton}
	 * @type {boolean}
	 */
	this.isCheckButton = true;
	
	/**
	 * Invoke hover state onmouseover even when checked.
	 * @overwrites {ButtonBinding#isCheckBox}
	 * @type {boolean}
	 */
	this.isCheckBox = true;
	
	/**
	 * @overwrites {MatrixBinding#hasMatrix}
	 * @type {boolean}
	 */
	this.hasMatrix = false;
	
	/**
	 * @type {CheckButtonImageProfile}
	 */
	this.imageProfile = new CheckButtonImageProfile ( this );
}

/**
 * Identifies binding.
 */
CheckButtonBinding.prototype.toString = function () {

	return "[CheckButtonBinding]";
}

/**
 * CheckButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {CheckButtonBinding}
 */
CheckButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:checkbutton", ownerDocument );
	return UserInterface.registerBinding ( element, CheckButtonBinding );
}