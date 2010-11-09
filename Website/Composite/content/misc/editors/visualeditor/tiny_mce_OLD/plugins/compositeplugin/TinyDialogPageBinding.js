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
	 * The current action.
	 * @type {string}
	 */
	this._tinyAction = null;
	
	/**
	 * The TinyMCE window.
	 * @type {DOMDocumentView}
	 */
	this._tinyWindow = null;
	
	/**
	 * The element being edited.
	 * @type {DOMElement}
	 */
	this._tinyElement = null;
		
	/**
	 * The TinyMCE engine.
	 * @type {tinymce.EditorManager} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE engine.
	 * @type {tinymce.EditorManager} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE theme.
	 * @type {tinymce.Theme}
	 */
	this._tinyTheme = null;

	/**
	 * The containing binding.
	 * @type {VisualEditorBinding}
	 */
	this._tinyEditor = null;
}

/**
 * @param {object} arg
 */
TinyDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	TinyDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this._tinyAction 		= arg.tinyAction;
	this._tinyWindow 		= arg.tinyWindow;
	this._tinyElement 		= arg.tinyElement;
	this._tinyEngine 		= arg.tinyEngine;
	this._tinyInstance 		= arg.tinyInstance;
	this._tinyTheme 		= arg.tinyTheme;
	this._editorBinding 	= arg.editorBinding;
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
 * Populates the common classname and id databindings.
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