RadioButtonBinding.prototype = new ButtonBinding;
RadioButtonBinding.prototype.constructor = RadioButtonBinding;
RadioButtonBinding.superclass = ButtonBinding.prototype;

RadioButtonBinding.IMG_DEFAULT 		= "${skin}/buttons/radiobutton-default.png";
RadioButtonBinding.IMG_HOVER 		= "${skin}/buttons/radiobutton-hover.png";
RadioButtonBinding.IMG_ACTIVE 		= "${skin}/buttons/radiobutton-active.png";
RadioButtonBinding.IMG_DISABLED 	= "${skin}/buttons/radiobutton-disabled.png";

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
	
	/**
	 * @overwrites {MatrixBinding#hasMatrix}
	 * @type {boolean}
	 */
	this.hasMatrix = false;
	
	/**
	 * @type {ImageProfile}
	 */
	this.imageProfile = new ImageProfile ({
		image			: RadioButtonBinding.IMG_DEFAULT,
		imageHover 		: RadioButtonBinding.IMG_HOVER,
		imageActive		: RadioButtonBinding.IMG_ACTIVE,
		imageDisabled	: RadioButtonBinding.IMG_DISABLED 
	});
	
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