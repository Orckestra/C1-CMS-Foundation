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

	/**
	  * Enable flexbox behavior.
	  * @type {boolean}
	  */
	this.isFlexible = true;

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

	EditFunctionCallDialogPageBinding.superclass.onBeforePageInitialize.call(this);
}


/**
 * @overwrites {PageBinding#onAfterPageInitialize}
 */
EditFunctionCallDialogPageBinding.prototype.onAfterPageInitialize = function () {

	EditFunctionCallDialogPageBinding.superclass.onAfterPageInitialize.call(this);
	
	var dialog = this.getAncestorBindingByType(DialogBinding, true);
	if (dialog != null) {
		var dim = dialog.getDimension();
		var pos = dialog.getPosition();
		var newdim = dialog.getDimension();
		newdim.w = this.getProperty("width");
		newdim.h = this.getProperty("height");
		dialog.setDimension(newdim);

		//Fit height
		dialog._fit(true);

		//Flex height
		newdim = dialog.getDimension();
		if (newdim.h > top.window.innerHeight) {
			newdim.h = top.window.innerHeight;
			dialog.setDimension(newdim);
			dialog.reflex(true);
		}


		//Fit position
		pos.x = pos.x + (dim.w - newdim.w) / 2;
		pos.x = (pos.x + newdim.w > top.window.innerWidth) ? top.window.innerWidth - newdim.w : pos.x;
		pos.x = pos.x < 0 ? 0 : pos.x;
		pos.y = (pos.y + newdim.h > top.window.innerHeight) ? top.window.innerHeight - newdim.h : pos.y;
		pos.y = pos.y < 0 ? 0 : pos.y;
		dialog.setPosition(pos);


	}

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
			
		case ButtonBinding.ACTION_COMMAND:
			var button = action.target;
			var page = this.bindingWindow.bindingMap.renderingdialogpage;
			switch (button.getID()) {
				case "advancedbutton":
					//if (page.validateAllDataBindings()) {
						page.bindingWindow.__doPostBack("Advanced");
					//}
					break;
				case "basicbutton":
					if (page.validateAllDataBindings()) {
						page.postframe(
							function () {
								page.bindingWindow.__doPostBack("Basic");
							});
					}
					break;
			}
			break;
			
	}
}

/**
 * Post that frame. Somwhat hacky, eh?
 */
EditFunctionCallDialogPageBinding.prototype.onOk = function () {

	var advancedbutton = this.bindingWindow.bindingMap.advancedbutton;
	if (this.validateAllDataBindings()) {
		if (advancedbutton == undefined) {
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