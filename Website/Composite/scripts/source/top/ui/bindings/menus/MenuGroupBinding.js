MenuGroupBinding.prototype = new Binding;
MenuGroupBinding.prototype.constructor = MenuGroupBinding;
MenuGroupBinding.superclass = Binding.prototype;

MenuGroupBinding.LAYOUT_DEFAULT = 0;
MenuGroupBinding.LAYOUT_FIRST = 1;
MenuGroupBinding.LAYOUT_LAST = 2;

function MenuGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuGroupBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = true;
}

/**
 * Identifies binding.
 */
MenuGroupBinding.prototype.toString = function () {

	return "[MenuGroupBinding]";
}

/**
 * Set layout. This method is invoked by the {@link ToolBarBodyBinding}.
 * @param {int} layout
 */
MenuGroupBinding.prototype.setLayout = function ( layout ) {

	switch ( layout ) {
		case MenuGroupBinding.LAYOUT_DEFAULT :
			this.detachClassName ( "first" );
			this.detachClassName ( "last" );
			break;
		case MenuGroupBinding.LAYOUT_FIRST :
			this.attachClassName ( "first" );
			break;	
		case MenuGroupBinding.LAYOUT_LAST :
			this.attachClassName ( "last" );
			break;
	}
}

/**
 * Show group. The unnescessary visibility adjustment is nescessary for explorer.
 * @overwrites {Binding#show}
 */
MenuGroupBinding.prototype.show = function () {
	
	if ( !this.isVisible ) {
		this.bindingElement.style.display = "block";
		this.bindingElement.style.visibility = "visible";
		this.isVisible = true;
	}
}

/**
 * Hide group.
 * @overwrites {Binding#hide}
 */
MenuGroupBinding.prototype.hide = function () {
	
	if ( this.isVisible ) {
		this.bindingElement.style.display = "none";
		this.bindingElement.style.visibility = "hidden";
		this.isVisible = false;
	}
}


/**
* Empty content (of body).
*/
MenuGroupBinding.prototype.empty = function () {

	this.detachRecursive();
	this.bindingElement.innerHTML = "";
}

/**
 * MenuGroupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MenuGroupBinding}
 */
MenuGroupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menugroup", ownerDocument );
	return UserInterface.registerBinding ( element, MenuGroupBinding );
}