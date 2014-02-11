EditFunctionCallDialogPageBinding.prototype = new DialogPageBinding;
EditFunctionCallDialogPageBinding.prototype.constructor = EditFunctionCallDialogPageBinding;
EditFunctionCallDialogPageBinding.superclass = DialogPageBinding.prototype;

EditFunctionCallDialogPageBinding.ID_BASICTAB = "basictab";
EditFunctionCallDialogPageBinding.ID_ADVANCEDTAB = "advancedtab";
EditFunctionCallDialogPageBinding.ID_MAINTABBOX = "maintabbox";

/**
 * @class
 */
function EditFunctionCallDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("EditFunctionCallDialogPageBinding");

	/** The main tabbox!
	 * @type {TabBoxBinding}
	 */
	this._tabBoxBinding = null;

	/**
	 * @type {Handler}
	 */
	this._successHandler = null;
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
 * @overwrites {PageBinding#onPageInitialize}
 */
EditFunctionCallDialogPageBinding.prototype.onBeforePageInitialize = function () {

	var box = this.bindingDocument.getElementById(EditFunctionCallDialogPageBinding.ID_MAINTABBOX);
	if (box != null) {
		this._tabBoxBinding = UserInterface.getBinding(box);
	}

	EditorPageBinding.superclass.onBeforePageInitialize.call(this);
}

/**
 * @overloads {DialogPageBinding#handleAction}
 * @param {Action} action
 */
EditFunctionCallDialogPageBinding.prototype.handleAction = function (action) {

	EditFunctionCallDialogPageBinding.superclass.handleAction.call(this, action);

	var binding = action.target;
	var self = this;

	switch (action.type) {

		case ResponseBinding.ACTION_SUCCESS:
			if (this.bindingWindow.bindingMap.FunctionCallDesigner.getContentWindow() == binding.bindingWindow) {
				if (this._successHandler) this._successHandler();
				this._successHandler = null;
			}
			break;

		case ResponseBinding.ACTION_FAILURE:
			this._successHandler = null;
			break;
	}
}

/**
 * Post that frame. Somwhat hacky, eh?
 */
EditFunctionCallDialogPageBinding.prototype.onOk = function () {

	var tab = this._tabBoxBinding.getSelectedTabBinding();
	if (this.validateAllDataBindings()) {
		if (tab.getID() == EditFunctionCallDialogPageBinding.ID_ADVANCEDTAB) {
			var self = this;
			this.postframe(
				function () {
					self.bindingWindow.__doPostBack("buttonAccept");
				});
		} else {
			this.bindingWindow.__doPostBack("buttonAccept");
		}
	}
}

/**
 * Post that frame. Somwhat hacky, eh?
 */
EditFunctionCallDialogPageBinding.prototype.postframe = function (successHandler) {
	
	if (successHandler) {
		this._successHandler = successHandler;
	};

	var win = this.bindingWindow.bindingMap.FunctionCallDesigner.getContentWindow();
	
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