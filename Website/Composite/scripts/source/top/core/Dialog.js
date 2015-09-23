/**
 * @class
 */
function _Dialog () {
}

_Dialog.prototype = {
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "Dialog" ),
	
	/*
	 * Standard dialogs are loaded from here.
	 */
	_URL_STANDARDDIALOG : "${root}/content/dialogs/standard/standard.aspx",
	
	/*
	 * Two basic types of dialogs.
	 */
	MODAL : "modal",
	NON_MODAL : "nonmodal",
	
	/*
	 * Some URL constants for common dialogs.
	 */
	URL_TREESELECTOR 		: "${root}/content/dialogs/treeselector/treeselector.aspx",
	URL_TREESEARCH 			: "${root}/content/dialogs/treesearch/treeSearchForm.aspx",
	URL_IMAGESELECTOR		: "${root}/content/dialogs/treeselector/special/imageselector.aspx",
	//URL_TREEACTIONSELECTOR	: "${root}/content/dialogs/treeselector/special/treeactionselector.aspx",
	//TODO combine tree selector to one file
	URL_TREEACTIONSELECTOR: "${root}/content/dialogs/treeselector/special/imageselector.aspx",
	URL_SERVICEFAULT 		: "${root}/content/dialogs/webservices/error.aspx",
	
	/*
	 * Some predefined button configurations
	 */
	BUTTONS_YES_NO_CANCEL 	: [ "yes:default", "no", "cancel" ],
	BUTTONS_ACCEPT_CANCEL 	: [ "accept:default", "cancel" ],
	BUTTONS_ACCEPT 			: [ "accept:default" ],
	
	/*
	 * Some predefined button response values
	 */
	RESPONSE_YES 		: "yes",
	RESPONSE_NO 		: "no",
	RESPONSE_ACCEPT 	: "accept",
	RESPONSE_CANCEL 	: "cancel",
	RESPONSE_DEFAULT	: "default",
	
	/*
	 * Some predefined standard dialog types
	 */
	_TYPE_WARNING 	: "warning",
	_TYPE_MESSAGE	: "message",
	_TYPE_ERROR 	: "error",
	_TYPE_QUESTION 	: "question",
	
	/*
	 * Hm. If these are defined by code, maybe the 
	 * dialog vignette should be expelled from CSS?
	 */
	_dialogImages : {
	
		"warning" 	: "${icon:warning}",
		"message" 	: "${icon:message}",
		"error" 	: "${icon:error}",
		"question" 	: "${icon:question}"
	},

	/**
	* Build dialog button.
	* @param {entry} entry
	* @return {DialogButton}
	*/
	dialogButton: function (entry) {
		if (this._dialogButtons == undefined) {
			this._dialogButtons = {

				"yes": new DialogButton({ label: StringBundle.getString("ui", "Website.Dialogs.LabelYes"), response: this.RESPONSE_YES }),
				"no": new DialogButton({ label: StringBundle.getString("ui", "Website.Dialogs.LabelNo"), response: this.RESPONSE_NO }),
				"accept": new DialogButton({ label: StringBundle.getString("ui", "Website.Dialogs.LabelAccept"), response: this.RESPONSE_ACCEPT }),
				"cancel": new DialogButton({ label: StringBundle.getString("ui", "Website.Dialogs.LabelCancel"), response: this.RESPONSE_CANCEL })
			}
		}
		return Dialog._dialogButtons[entry];
	},
	
	/**
	 * Invoke dialog by URL.
	 * @param {string} url
	 * @param {IDialogResponseHandler} handler
	 * @param {object} argument
	 * @return {DialogViewDefinition}
	 */
	invoke : function  ( url, handler, argument ) {
			
		this._logger.error ( "Not implemented" );
	},
	
	/**
	 * Invoke modal dialog by URL.
	 * @param {string} url
	 * @param {IDialogResponseHandler} handler
	 * @param {object} argument
	 * @return {DialogViewDefinition}
	 */
	invokeModal : function ( url, handler, argument ) {
		
		var definition = new DialogViewDefinition ({
			handle 		: KeyMaster.getUniqueKey (),
			position	: Dialog.MODAL,
			url 		: url,
			handler		: handler,
			argument	: argument
		});
		
		StageBinding.presentViewDefinition ( definition );
		return definition;
	},

	/**
	 * Invoke dialog by definition. 
	 * @param {DialogViewDefinition} definition
	 * @return {DialogViewDefinition}
	 */
	invokeDefinition : function  ( definition ) {
		
		if ( definition instanceof DialogViewDefinition ) {
			StageBinding.presentViewDefinition ( definition );	
		}
		return definition;
	},
		
	/**
	 * Invoke question dialog.
	 * @param {string} title
	 * @param {string} text
	 * @param {array<DialogButton>} buttons
	 * @param {IDialogResponseHandler} handler
	 */
	question : function ( title, text, buttons, handler ) {
		
		if ( !buttons ) {
			buttons = this.BUTTONS_ACCEPT_CANCEL;
		}
		this._standardDialog ( this._TYPE_QUESTION, title, text, buttons, handler );
	},
	
	/**
	 * Invoke message dialog.
	 * @param {string} title
	 * @param {string} text
	 * @param {array<DialogButton>} buttons
	 * @param {IDialogResponseHandler} handler
	 */
	message : function ( title, text, buttons, handler ) {
		
		if ( !buttons ) {
			buttons = this.BUTTONS_ACCEPT;
		}
		this._standardDialog ( this._TYPE_MESSAGE, title, text, buttons, handler );
	},
	
	/**
	 * Invoke error dialog.
	 * @param {string} title
	 * @param {string} text
	 * @param {array<DialogButton>} buttons Defaults to Accept button.
	 * @param {IDialogResponseHandler} handler
	 */
	error : function ( title, text, buttons, handler ) {
		
		if ( !buttons ) {
			buttons = this.BUTTONS_ACCEPT;
		}
		this._standardDialog ( this._TYPE_ERROR, title, text, buttons, handler );
	},
	
	/**
	 * Invoke warning dialog.
	 * @param {string} title
	 * @param {string} text
	 * @param {array<DialogButton>} buttons
	 * @param {IDialogResponseHandler} handler
	 */
	warning :  function ( title, text, buttons, handler ) {
		
		if ( !buttons ) {
			buttons = this.BUTTONS_ACCEPT;
		}
		this._standardDialog ( this._TYPE_WARNING, title, text, buttons, handler );
	},
	
	/**
	 * TODO: example on how to invoke with custom buttons.
	 * @param {string} type
	 * @param {string} title
	 * @param {string} text
	 * @param {array<DialogButton>} buttons
	 * @param {IDialogResponseHandler} handler
	 * @ignore
	 */
	_standardDialog : function ( type, title, text, buttons, handler ) {
		
		var buttonList = null;
		
		if ( !buttons ) {
			buttonList = new List ( 
				Dialog.BUTTONS_ACCEPT
			);
		} else {
			buttonList = new List ();
			new List ( buttons ).each ( 
				function ( entry ) {
					var config = null;
					switch ( typeof entry ) {
						case "object" :
							config = entry;
							break;
						case "string" :
							var isDefault = false;
							if ( entry.indexOf ( ":" ) >-1 ) {
								entry = entry.split ( ":" )[ 0 ];
								isDefault = true;
							}
							config = Dialog.dialogButton(entry);
							if ( isDefault ) {
								config.isDefault = true;
							}
							break;
					}
					buttonList.add ( config );
				}
			);
		}
		
		var argument = {
			title	: title,
			text	: text,
			type	: type,
			image	: this._dialogImages [ type ],
			buttons : buttonList
		}
		
		var definition = new DialogViewDefinition ({
			handle 		: "standarddialog:" + type,
			position	: Dialog.MODAL,
			url 		: this._URL_STANDARDDIALOG,
			handler		: handler,
			argument	: argument
		})
		
		StageBinding.presentViewDefinition ( definition );
	}
}
 
/**
 * The instance that does it.
 */
var Dialog = new _Dialog ();