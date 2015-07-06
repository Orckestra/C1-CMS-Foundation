RadioButtonBinding.prototype = new ButtonBinding;
RadioButtonBinding.prototype.constructor = RadioButtonBinding;
RadioButtonBinding.superclass = ButtonBinding.prototype;

/**
 * @class
 */
function RadioButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RadioButtonBinding" );
	
	/**
	 * @overwrites {ButtonBinding#isRadioButton}
	 * @type {boolean}
	 */
	this.isRadioButton = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
RadioButtonBinding.prototype.toString = function () {

	return "[RadioButtonBinding]";
}

/**
 * RadioButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {RadioButtonBinding}
 */
RadioButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:radiobutton", ownerDocument );
	return UserInterface.registerBinding ( element, RadioButtonBinding );
}