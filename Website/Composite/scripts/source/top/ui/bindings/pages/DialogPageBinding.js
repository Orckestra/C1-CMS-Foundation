DialogPageBinding.prototype = new PageBinding;
DialogPageBinding.prototype.constructor = DialogPageBinding;
DialogPageBinding.superclass = PageBinding.prototype;

DialogPageBinding.DEFAULT_WIDTH = 531;
DialogPageBinding.DEFAULT_TABBOXED_WIDTH = 476;
DialogPageBinding.DEFAULT_HEIGHT = "auto";
DialogPageBinding.DEFAULT_CONTROLS = "close";
DialogPageBinding.DEFAULT_RESIZABLE = false;
DialogPageBinding.ACTION_RESPONSE = "dialogpageresponse";
DialogPageBinding.ACTION_LAYOUT_D = "dialoglayoutd";
DialogPageBinding.CLASSNAME_TABBOXED = "tabboxed";

/**
 * @class
 * Note that a this fellow only has effect when loaded inside the {@link StageDialogBinding}.
 */
function DialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogPageBinding" );
	
	/**
	 * The dialog will always return this property 
	 * to an instance of (@link IDialogResponseHandler}.
	 * @type {object}
	 */
	this.response = null;
	
	/**
	 * If this property is specified, usually when the dialog is accepted, 
	 * it will be returned to an instance of (@link IDialogResponseHandler}. 
	 * If the subclass doesn't handle it specifically, the response will 
	 * default to an instance of {@link DataBindingMap}.
	 * @see {DialogPageBinding#onDialogAccept}
	 * @type {object}
	 */
	this.result = null;
	
	/**
	 * @type {int}
	 */
	this.width = null;
	
	/**
	 * @type {int}
	 */
	this.height = null;
	
	/**
	 * @type {int}
	 */
	this.minheight = null;
	
	/**
	 * @type {string}
	 */
	this.controls = null;

	/**
	 * @type {boolean}
	 */
	this.isResizable = null;
	
	/**
	 * @type {boolean}
	 */
	this.isAutoHeightLayoutMode = false;

	/**
	 * @type {boolean}
	 */
	this.isNonAjaxPage = true;
}

/**
 * Identifies binding.
 */
DialogPageBinding.prototype.toString = function () {

	return "[DialogPageBinding]";
}

/**
 *
 */
DialogPageBinding.prototype.onBindingRegister = function () {
	
	DialogPageBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( PageBinding.ACTION_ATTACHED );
	this.addActionListener ( Binding.ACTION_DIRTY );
	this.addActionListener ( Binding.ACTION_VALID );
	this.addActionListener ( Binding.ACTION_INVALID );
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
}

/**
 * Parse DOM properties.
 */
DialogPageBinding.prototype.parseDOMProperties = function () {

	/*
	 * This elaborate setup takes into consideration that some 
	 * properties may have been defined by stuff going on eg. 
	 * in the setPageArgument method.
	 */

	DialogPageBinding.superclass.parseDOMProperties.call ( this );
	
	var isBranded = this.getProperty("branded");
	var dialog = this.getAncestorBindingByType(DialogBinding, true);
	if (dialog) {
		if (isBranded) {
			dialog.attachClassName("branded");
		} else {
			dialog.detachClassName("branded");
		}
	}

	if ( this.width == null ) {
		var width = this.getProperty ( "width" );
		if ( !width ) {
			width = this.hasClassName ( DialogPageBinding.CLASSNAME_TABBOXED ) ? 
				DialogPageBinding.DEFAULT_TABBOXED_WIDTH :
				DialogPageBinding.DEFAULT_WIDTH;
		}
		this.width = width;
	}
	if ( this.height == null ) {
		var height = this.getProperty ( "height" );
		this.height = height ? height : DialogPageBinding.DEFAULT_HEIGHT;
	}
	if ( this.minheight == null ) {
		var minheight = this.getProperty ( "minheight" );
		if ( minheight != null ) {
			this.minheight = minheight;
		}
	}
	if ( this.controls == null ) {
		var controls = this.getProperty ( "controls" );
		this.controls = controls ? controls : DialogPageBinding.DEFAULT_CONTROLS;
	}
	if ( !this.isResizable ) {
		var isResizable = this.getProperty ( "resizable" );
		this.isResizable = isResizable ? isResizable : DialogPageBinding.DEFAULT_RESIZABLE;
	}

	/*
	 * Comment here please!
	 */
	if ( this.height == "auto" ) {
		this.enableAutoHeightLayoutMode ( true );
	}
}


/**
 * @overloads {PageBinding#onBindingAttach}
 */
DialogPageBinding.prototype.onBindingAttach = function () {

	DialogPageBinding.superclass.onBindingAttach.call(this);

	var image = this.getProperty("image");
	var dialogvignette = this.getDescendantElementsByLocalName("dialogvignette").getFirst();
	if (image && dialogvignette) {
		this.labelBinding = LabelBinding.newInstance(this.bindingDocument);
		this.labelBinding.setImage(image);
		dialogvignette.appendChild(
			this.labelBinding.bindingElement
		);
		this.labelBinding.attach();
	}

}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
DialogPageBinding.prototype.setPageArgument = function (arg) {

	DialogPageBinding.superclass.setPageArgument.call(this, arg);

	if (arg && arg.image)
		this.setProperty("image", arg.image);
}

/**
 * Check the MessageQueue after page load.
 * TODO: Remove this! Should be handled by ResponseBinding!!!
 * @overloads {PageBinding#onAfterPageInitialize}
 *
DialogPageBinding.prototype.onAfterPageInitialize = function () {
	
	DialogPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	if ( this._isDotNet ()) {
		
		/*
		 * TODO: This should be handled by ResponseBinding!!!
		 * Update: ResponseBinding is now supposed to work...
		 * "AJAX!" - this is just a keyword we can sarch for :)
		 *
		MessageQueue.update ();
	}
}
*/

/**
 * @see {StageDialogBinding}
 * @param {boolean} isMode
 */
DialogPageBinding.prototype.enableAutoHeightLayoutMode = function ( isMode ) {
	
	if ( isMode != this.isAutoHeightLayoutMode ) {
		if ( isMode ) {
			this.attachClassName ( "auto" );
		} else {
			this.detachClassName ( "auto" );
		}
		this.isAutoHeightLayoutMode = isMode;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
DialogPageBinding.prototype.handleAction = function ( action ) {

	DialogPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case PageBinding.ACTION_ATTACHED :
		
			/*
			 * TODO: check for this.height == "auto"?
			 */
			if ( binding != this && binding.isFitAsDialogSubPage ) {
				binding.makeDialogSubPage ();
			}
			// don't consume - ViewBinding is listening!
			break;
	
		case ButtonBinding.ACTION_COMMAND : 
			
			// no need to relay button commands to containing dialog
			action.consume ();
			
			// special handling of buttons with a "response" property set
			if ( binding.response != null ) {
				
				/* 
				 * Hide while handling response.
				 *
				this.bindingElement.style.visibility = "hidden";
				*/
				
				/*
				 * By default, dialog response is identical to 
				 * button response. This can be changed later.
				 */
				this.response = binding.response;
				
				switch ( binding.response ) {
					
					/*
					 * The dialog ACCEPT button will validate the dialog  
					 * before being accepted as a dialog response. If content  
					 * is validated correctly, "onDialogAccept" is invoked.
					 */
					case Dialog.RESPONSE_ACCEPT :
						if ( this.validateAllDataBindings () == true ) {
							this.onDialogAccept ();
						} else {
							this.onDialogInvalid ();
						}
						break;
						
					/*
					 * The dialog CANCEL button invokes another special method.
					 */
					case Dialog.RESPONSE_CANCEL :
						this.onDialogCancel ();
						break;
					
					/*
					 * All other buttons (with a specified response) invoke this method.
					 */
					default :
						this.onDialogResponse ();
						break;
				}
			}
			break;
		
		case Binding.ACTION_INVALID :
			this._disableAcceptButton ( true );
			break;
			
		case Binding.ACTION_VALID :
			this._disableAcceptButton ( false );
			break;
	}
}

/**
 * Disable or enable accept button.
 * @param {boolean} isDisable
 */
DialogPageBinding.prototype._disableAcceptButton = function ( isDisable ) {
	
	var acceptButton = this.bindingWindow.bindingMap.buttonAccept;
	if ( acceptButton != null ) {
		acceptButton.setDisabled ( isDisable );
	}
}

/**
 * Subclasses should overload this method if a special dialog result  
 * is required. Result defaults to the local dataBindingResultMap.
 * @see {DataManager#getDataBindingResultMap}
 */
DialogPageBinding.prototype.onDialogAccept = function () {
	
	/*
	 * Define your result around here. Otherwise 
	 * the default result will be set, see below.
	 */
	if ( this.result === null ) {
		try {
			this.result = this.bindingWindow.DataManager.getDataBindingResultMap ();
		} catch ( exception ) {
			alert ( exception );
			throw exception;
		}
	}
	this.onDialogResponse ();
}

/**
 * Subclasses should overwrite this method to setup invalid content scenario.
 */
DialogPageBinding.prototype.onDialogInvalid = function () {
	
	// do nothing by default
}

/**
 * Subclasses should overload this method to perform  
 * cleanup before the dialog is closed.
 * @param {object} response
 */
DialogPageBinding.prototype.onDialogCancel = function () {
	
	this.onDialogResponse ();
}

/**
 * If response was neither accept nor cancel, this method will be invoked directly. 
 * Otherwise, the corresponding methods will be invoked first, for you to hook into. 
 * Remember that any relayed response will close the dialog automatically.
 * @param {object} response
 */
DialogPageBinding.prototype.onDialogResponse = function () {
	
	this.dispatchAction ( DialogPageBinding.ACTION_RESPONSE );
}