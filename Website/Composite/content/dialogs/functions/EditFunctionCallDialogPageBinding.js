EditFunctionCallDialogPageBinding.prototype = new DialogPageBinding;
EditFunctionCallDialogPageBinding.prototype.constructor = EditFunctionCallDialogPageBinding;
EditFunctionCallDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function EditFunctionCallDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditFunctionCallDialogPageBinding" );
}

/**
 * Identifies binding.
 */
EditFunctionCallDialogPageBinding.prototype.toString = function () {
	
	return "[EditFunctionCallDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBindingAttach}
 */
EditFunctionCallDialogPageBinding.prototype.onBindingAttach = function () {
	
	EditFunctionCallDialogPageBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( ResponseBinding.ACTION_SUCCESS );
	this.addActionListener ( ResponseBinding.ACTION_FAILURE );
	this.addActionListener ( ResponseBinding.ACTION_OOOOKAY );
}

/**
 * @overloads {DialogPageBinding#handleAction}
 * @param {Action} action
 */
EditFunctionCallDialogPageBinding.prototype.handleAction = function ( action ) {
	
	EditFunctionCallDialogPageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		
		case ResponseBinding.ACTION_SUCCESS :
			this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
			break;
		
		case ResponseBinding.ACTION_FAILURE :
			// server action expected!
			break;
	}
}

/**
 * Post that frame. Somwhat hacky, eh?
 */
EditFunctionCallDialogPageBinding.prototype.postframe = function () {
	
	var tagname = Client.isExplorer || Client.isWebKit ? "functioneditor" : "ui:functioneditor"; 
	var editor = this.bindingDocument.getElementsByTagName ( tagname ).item ( 0 );
	var binding = UserInterface.getBinding ( editor );
	var win = binding.getContentWindow ();
	
	if ( win.bindingMap != null ) {
		var page = win.bindingMap.functioneditorpage;
		win.DataManager.isDirty = true; // hacking away!
		page.postMessage ( EditorPageBinding.MESSAGE_SAVE );
	}
}

/**
 * @overloads {DialogPageBinding#onBindingAccept}
 */
EditFunctionCallDialogPageBinding.prototype.onDialogAccept = function () {
	
	this.response = Dialog.RESPONSE_ACCEPT;
	this.result = new String ( "" );
	
	var value = document.getElementById ( "FunctionMarkup" ).value;
	
	if ( value != "" ) {
		this.result = value;
	}
	
    EditFunctionCallDialogPageBinding.superclass.onDialogAccept.call ( this );	
}