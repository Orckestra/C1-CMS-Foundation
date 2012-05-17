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
TinyDialogPageBinding.prototype._populateClassNameSelector = function (elementName) {

	var groups = this._tinyTheme.formatGroups;
	var classSelector = this.bindingWindow.bindingMap.classnameselector;

	if (classSelector != null) {


		var list = new List();
		groups.reverse().each(function (group) {
			group.each(function (format) {
				if (format.select != null) {
					if (format.props.block == null && format.props.inline == null) {
						if (this.canApplyDirect(format.id, elementName)) {
							list.add({
								value: format.props.classes,
								label: format.label,
								image: (format.image != null && format.image != "") ? (Constants.CONFIGROOT + format.image) : null
							});
							
						}
					}
				}
			}, this);
		}, this);
		classSelector.populateFromList(list);
	}
}

/**
 * Populates the common classname and id databindings.
 */
TinyDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	var manager = this.bindingWindow.DataManager;
	var element = this._tinyElement;
	
	if ( element.className != "" ) {
		var classSelector = this.bindingWindow.bindingMap.classnameselector;
		if ( classSelector != null ) {
			classSelector.setValue ( 
				VisualEditorBinding.getTinyLessClassName ( element.className )
			);
		}
	}
	if ( element.id ) {
		manager.getDataBinding ( "id" ).setValue ( element.id );
	}
}


/**
* Test is the named TinyMCE format can be applied directly to the current selection.
* A specialization for the formatter.canApply(name) which also include parent elements
* @param {string} formatName
* @param {string} elementName
* @returns {boolean}
*/
TinyDialogPageBinding.prototype.canApplyDirect = function (formatName, elementName) {

	var formatList = this._tinyInstance.formatter.get(formatName), x, selector;
	var element = this._tinyElement;



	if (elementName == null) {
		if (element == null)
			return true;

		for (x = formatList.length - 1; x >= 0; x--) {
			selector = formatList[x].selector;
			if (!selector || this._tinyInstance.dom.is(element, selector)) {
				return true;
			}
		}
	}
	else {
		for (x = formatList.length - 1; x >= 0; x--) {
			selector = formatList[x].selector;
			if (!selector || selector == elementName) {
				return true;
			}
		}
	}
	return false;
}