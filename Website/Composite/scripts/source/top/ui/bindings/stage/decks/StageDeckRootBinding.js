StageDeckRootBinding.prototype = new RootBinding;
StageDeckRootBinding.prototype.constructor = StageDeckRootBinding;
StageDeckRootBinding.superclass = RootBinding.prototype;

/**
 * Default deck layout to be loaded from "templates" folder.
 * UPDATE: Remote loading has been disabled for now...
 */
StageDeckRootBinding.DEFAULT_TEMPLATE = "defaultstagedeck.xml";

/**
 * @class
 * The content of the deck is generated dynamically. Point being 
 * that we can easily persist deck layout between sessions. We 
 * still need to implement this feature, though. DISABLED NOW!
 */
function StageDeckRootBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageDeckRootBinding" );
}

/**
 * Identifies binding.
 */
StageDeckRootBinding.prototype.toString = function () {
	
	return "[StageDeckRootBinding]";
}

/**
 * @overloads {RootBinding#onBindingAttach}
 *
StageDeckRootBinding.prototype.onBindingAttach = function () {
	
	StageDeckRootBinding.superclass.onBindingAttach.call ( this );
	this._defaultLayout ();
}

/**
 * Setup default layout.
 *
StageDeckRootBinding.prototype._defaultLayout = function () {
	
	var markup = Templates.getTemplateElementText ( 
		StageDeckRootBinding.DEFAULT_TEMPLATE 
	)
	this.subTreeFromString ( markup );
}
*/