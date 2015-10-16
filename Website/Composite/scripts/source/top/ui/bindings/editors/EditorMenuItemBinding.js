EditorMenuItemBinding.prototype = new MenuItemBinding;
EditorMenuItemBinding.prototype.constructor = EditorMenuItemBinding;
EditorMenuItemBinding.superclass = MenuItemBinding.prototype;

/**
 * @class
 * @deprecated
 * @implements {IEditorControlBinding}
 */
function EditorMenuItemBinding () {

	/** 
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorMenuItemBinding" );
	
	/**
	 * Indicates that editors should not blur 
	 * the toolbars when binding is handled.
	 * @implements {IEditorControlBinding}
	 * @type {boolean}
	 */
	this.isEditorControlBinding = true;
}

/**
 * Identifies binding.
 */
EditorMenuItemBinding.prototype.toString = function () {
	
	return "[EditorMenuItemBinding]";
}

/**
 * @overloads {EditorMenuItemBinding#buildDOMContent}
 */
EditorMenuItemBinding.prototype.buildDOMContent = function () {
	
	EditorMenuItemBinding.superclass.buildDOMContent.call ( this );
	
	if (Client.isAnyExplorer) {
		this._buildDesignModeSanitizer ();
	}
}

/**
 * Places an IMG element on top of all other elements. This feature is 
 * disabled for Mozilla because it makes the button draggable; it's not 
 * needed in Mozilla anyway.
 */
EditorMenuItemBinding.prototype._buildDesignModeSanitizer = function () {
	
	if (Client.isAnyExplorer) {
		var img = this.bindingDocument.createElement ( "img" );
		img.className = "designmodesanitizer";
		img.src = Resolver.resolve("${root}/images/blank.png");
		img.ondragstart = function (e) { e.preventDefault(); }
		this.shadowTree.designmodesanitizer = img;
		this.bindingElement.appendChild ( img );
	}
}

/**
 * EditorMenuItemBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {EditorMenuItemBinding}
 */
EditorMenuItemBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menuitem", ownerDocument );
	return UserInterface.registerBinding ( element, EditorMenuItemBinding );
}