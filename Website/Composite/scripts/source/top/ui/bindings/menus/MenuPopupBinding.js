MenuPopupBinding.prototype = new PopupBinding;
MenuPopupBinding.prototype.constructor = MenuPopupBinding;
MenuPopupBinding.superclass = PopupBinding.prototype;

function MenuPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuPopupBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MenuPopupBinding.prototype.toString = function () {

	return "[MenuPopupBinding]";
}

/**
 * Menupopups are always positioned in a local coordinate space.
 * @overwrites {PopupBinding#_getElementPosition}.
 * @param {DOMElement} element
 * @return {Point}
 */
MenuPopupBinding.prototype._getElementPosition = function ( element ) {

	return new Point ( element.offsetLeft, 0 );
}

/**
 * @overwrites {PopupBinding#fitOnScreen}.
 */
MenuPopupBinding.prototype.fitOnScreen = function () {
	switch (this.position) {
		case PopupBinding.POSITION_BOTTOM:

			var x = this.bindingElement.offsetLeft;
			var y = this.bindingElement.offsetTop;
			var w = this.bindingElement.offsetWidth;
			var h = this.bindingElement.offsetHeight;
			var dim = this.bindingWindow.WindowManager.getWindowDimensions();
			var pos = this.boxObject.getGlobalPosition();

			x = this.targetElement.offsetLeft + this.targetElement.offsetWidth / 2 - this.bindingElement.offsetWidth / 2;

			this.detachClassName("bottomright");
			if ( x + w >= dim.w ) {
				x = this.targetElement.offsetLeft + this.targetElement.offsetWidth - this.bindingElement.offsetWidth;
				this.attachClassName("bottomright");
			}

			this.setPosition(x, y);

			break;
		default:
			MenuPopupBinding.superclass.fitOnScreen.call(this);
			break;
	}
}

/**
 * MenuPopupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MenuPopupBinding}
 */
MenuPopupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menupopup", ownerDocument );
	return UserInterface.registerBinding ( element, MenuPopupBinding );
}