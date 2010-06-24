VisualEditorDialogPageBinding.prototype = new DialogPageBinding;
VisualEditorDialogPageBinding.prototype.constructor = VisualEditorDialogPageBinding;
VisualEditorDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function VisualEditorDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorDialogPageBinding" );
}

/**
 * Identifies binding.
 */
VisualEditorDialogPageBinding.prototype.toString = function () {
	
	return "[VisualEditorDialogPageBinding]";
}

/**
 * Transfer all argument properties to editor instance.
 * @param {object} arg
 */
VisualEditorDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	/*
	 * Dialog title.
	 */
	this.label = arg.label;
	
	/*
	 * Deprecated!
	 *
	var textarea = this.bindingDocument.getElementById ( "visualeditortextarea" );
	textarea.value = arg.value;
	*/
	
	/*
	 * Editor value.
	 */
	this.bindingWindow.bindingMap.visualeditor.setValue ( arg.value );
	
	/*
	 * Configuration.
	 */ 
	var editor = this.bindingWindow.bindingMap.visualeditor;
	if ( editor && !editor.isAttached ) {
		for ( var property in arg.configuration ) {
			editor.setProperty ( property, arg.configuration [ property ]);
		}
	} else {
		throw "VisualEditorDialogPageBinding dysfunction!";
	}
	
	VisualEditorDialogPageBinding.superclass.setPageArgument.call ( this, arg );
}

/**
 * Must return a simple string.
 * @overloads {DialogPageBinding#onBindingAccept}
 */
VisualEditorDialogPageBinding.prototype.onDialogAccept = function () {
	
	this.response  = Dialog.RESPONSE_ACCEPT;
	this.result = this.bindingWindow.bindingMap.visualeditor.getValue ();

    VisualEditorDialogPageBinding.superclass.onDialogAccept.call ( this );	
}