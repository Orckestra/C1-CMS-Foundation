TinyDialogPageBinding.prototype = new DialogPageBinding;
TinyDialogPageBinding.prototype.constructor = TinyDialogPageBinding;
TinyDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * Subclass this to get a standard hold on varios TinyMCE entities.
 * @class
 */
function TinyDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TinyDialogPageBinding" );
	
	/**
	 * The element being edited.
	 * @type {DOMElement}
	 */
	this._tinyElement = null;
	
	/**
	 * The TinyMCE window.
	 * @type {DOMDocumentView}
	 */
	this._tinyWindow = null;
	
	/**
	 * The TinyMCE engine.
	 * @type {TinyMCE_Engine} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE instance.
	 * @type {TinyMCE_Control}
	 */
	this._tinyInstance = null;
	
	/**
	 * The containing binding.
	 * @type {WysiwygEditorBinding}
	 */
	this._tinyEditor = null;
}

/**
 * @param {object} arg
 */
TinyDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	TinyDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this._tinyElement	= arg.tinyElement;
	this._tinyWindow	= arg.tinyWindow;
	this._tinyEngine 	= this._tinyWindow.tinyMCE;
	this._tinyInstance	= this._tinyWindow.tinyMCE.selectedInstance;
	this._editorBinding	= this._tinyWindow.TinyMCE_CompositeTheme.editorBinding;
}

/**
 * Populate the classname selector.
 * @param {string} elementName Optional
 */
TinyDialogPageBinding.prototype._populateClassNameSelector = function ( elementName ) {

	if ( !elementName ) {
		elementName = DOMUtil.getLocalName ( this._tinyElement );
	}
	var classSelector = this.bindingWindow.bindingMap.classnameselector;
	if ( classSelector ) {
		var classes = this._editorBinding.elementClassConfiguration.getClassNamesForElement ( elementName );
		var list = new List ();
		while ( classes.hasNext ()) {
			list.add ({
				value : classes.getNext ()
			});
		}
		classSelector.populateFromList ( list );
	};
}

/**
 * By default populates the classname and id databindings.
 */
TinyDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	var manager = this.bindingWindow.DataManager;
	var element = this._tinyElement;
	
	if ( element.className != "" ) {
		var className = VisualEditorBinding.getTinyLessClassName ( element.className );
		UserInterface.getBinding ( 
			this.bindingDocument.getElementById ( "classnameselector" )
		).setValue ( className );
	}
	if ( element.id ) {
		manager.getDataBinding ( "id" ).setValue ( element.id );
	}
}