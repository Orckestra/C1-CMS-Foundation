StandardDialogPageBinding.prototype = new DialogPageBinding;
StandardDialogPageBinding.prototype.constructor = StandardDialogPageBinding;
StandardDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function StandardDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StandardDialogPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._dialogType = null;
	
	/**
	 * @type {string}
	 */
	this._dialogText = null;
	
	/**
	 * @type {List<DialogButton>}
	 */
	this._dialogButtons = null;

}

/**
 * Identifies binding.
 */
StandardDialogPageBinding.prototype.toString = function () {
	
	return "[StandardDialogPageBinding]";

}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
StandardDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	StandardDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this.label 			= arg.title;
	this.image 			= arg.image;
	
	this._dialogType 	= arg.type;
	this._dialogText	= arg.text;
	this._dialogButtons = arg.buttons;
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
StandardDialogPageBinding.prototype.onBeforePageInitialize = function () {

    this.attachClassName(this._dialogType);

    var divDialogText = document.getElementById("dialogtext");

    var text = (this._dialogText == null) ? "" : this._dialogText.replace('\r\n', '\n');
    var textParts = text.split('\n');

    // Adding text and inserting and inserting line breaks
    for (var i = 0; i < textParts.length; i++) {
        divDialogText.appendChild(document.createTextNode(textParts[i]));
        if (i < textParts.length - 1) {
            divDialogText.appendChild(document.createElement("br"));
        }
    }

    while (this._dialogButtons.hasNext()) {

        var config = this._dialogButtons.getNext();
        var button = ClickButtonBinding.newInstance(document);

        button.isFocusable = config.isFocusable;
        button.isFocused = config.isFocused;
        button.isDefault = config.isDefault;

        button.setLabel(config.label);
        button.setImage(config.image);
        button.response = config.response;

        if (!button.response) {
            button.response = Dialog.DEFAULT_RESPONSE;
        }
        bindingMap.dialogtoolbargroup.add(button);
    }

    bindingMap.dialogtoolbargroup.attachRecursive();
    bindingMap.dialogtoolbarbody.enforceEqualSize();
    bindingMap.dialogtoolbar.indexDialogButtons();

    StandardDialogPageBinding.superclass.onBeforePageInitialize.call(this);
}

/**
 * Display a notification on the statusbar (copy dialog title).
 * @overloads {DialogPageBinding#onAfterPageInitialize}
 */
StandardDialogPageBinding.prototype.onAfterPageInitialize = function () {
	
	StandardDialogPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	/*
	 * Mirror message in statusbar.
	 */
	if ( !StatusBar.status ) {
		StatusBar.report ( this.label, this.image );
	}
	
	/*
	 * Force-clear the lock. This has been added specifically to 
	 * hack the scenario where a page-preview was hindered by 
	 * non-wellformed markup (the screen would stay locked), but 
	 * it may come in handy in other situations (this being 
	 * warning and error dialogs).
	 */
	Application.unlock ( this, true );
}

/**
 * Clear statusbar on terminate (unless something important is now displayed).
 * @overloads {FocusBinding#onBindingDispose}
 */
StandardDialogPageBinding.prototype.onBindingDispose = function () {
	
	StandardDialogPageBinding.superclass.onBindingDispose.call ( this );
	if ( !StatusBar.status ) {
		StatusBar.clear ();
	}
}