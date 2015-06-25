DataDialogBinding.prototype = new DataBinding;
DataDialogBinding.prototype.constructor = DataDialogBinding;
DataDialogBinding.superclass = DataBinding.prototype;

DataDialogBinding.ACTION_COMMAND = "datadialog command";

/**
 * @class
 * Notice that this fellow works only as a clientside conrol.  
 * Use the PostBackDataDialogBinding for serverside work.
 * @implements {IData}
 */ 
function DataDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DataDialogBinding" );
	
	/**
	 * @type {ButtonBinding}
	 */
	this._buttonBinding = null;
	
	/**
	 * @type {IDialogResponseHandler}
	 */
	this._handler = null;
	
	/**
	 * This will be served to the associated dialog as argument 
	 * and returned as result when a getResult is invoked.
	 * @type {DataBindingMap}
	 */
	this._map = null;
	
	/**
	 * @type {string}
	 */
	this._dialogViewHandle = null;
	
	/**
	 * @type {boolean}
	 */
	this._hasKeyboard = false;
	
	/**
	 * @type {boolean}
	 */
	this._hasFocus = false;

    /**
     * @type {boolean}
     */
	this.isRequired = false;

    /**
	 * @type {boolean}
	 */
	this._isValid = true;
}

/**
 * Identifies binding.
 */
DataDialogBinding.prototype.toString = function () {
	
	return "[DataDialogBinding]";
}

DataDialogBinding.prototype.onBindingRegister = function () {
	
	DataDialogBinding.superclass.onBindingRegister.call ( this );
	
	this.propertyMethodMap [ "image" ] = this.setImage;
	this.propertyMethodMap [ "label" ] = this.setLabel;
	this.propertyMethodMap [ "tooltip" ] = this.setToolTip;
	this.propertyMethodMap [ "handle" ] = this.setHandle;
	this.propertyMethodMap [ "url" ] = this.setURL;
	this.propertyMethodMap [ "value" ] = this.setValue;
}

/**
 * Parse DOM properties.
 */
DataDialogBinding.prototype.parseDOMProperties = function () {

    var isRequired = this.getProperty("required") == true;
    if (isRequired) {
        this.isRequired = true;
    }
}


/**
 * Overloads {@link Binding#onBindingAttach}
 */
DataDialogBinding.prototype.onBindingAttach = function () {
	
	DataDialogBinding.superclass.onBindingAttach.call ( this );
	
	Binding.imageProfile(this);
	this._buildButton();
	this.parseDOMProperties();
	
	if ( this.getProperty ( "handle" ) != null || this.getProperty ( "url" )) {
		//this._buildIndicator ();
		this._buttonBinding.setImage("${icon:popup}");
		this._buttonBinding.labelBinding.attachClassName("flipped");
	}
	
	this.bindingElement.tabIndex = 0;
	if ( Client.isExplorer ) {
		this.bindingElement.hideFocus = true;
	}
}

/**
 * Building button.
 */
DataDialogBinding.prototype._buildButton = function () {

	var label	= this.getProperty ( "label" );
	var tooltip = this.getProperty ( "tooltip" );
	
	this._buttonBinding = this.add ( 
		ClickButtonBinding.newInstance ( this.bindingDocument ) 
	);
	if ( label != null ) {
		if ( this.getProperty ( "handle" ) != null || this.getProperty ( "url" ) != null ) {
			this._buttonBinding.setLabel ( label + LabelBinding.DIALOG_INDECATOR_SUFFIX );
		} else {
			this._buttonBinding.setLabel ( label );
		}
	}
	if ( this.imageProfile ) {
		this._buttonBinding.imageProfile = this.imageProfile;
	}
	if ( tooltip != null ) {
		this._buttonBinding.setToolTip ( tooltip );
	}
	this._buttonBinding.addActionListener ( 
		ButtonBinding.ACTION_COMMAND, this 
	);
	this._buttonBinding.attach ();
}

/**
 * Building dialog indicator image.
 */
DataDialogBinding.prototype._buildIndicator = function () {
	
	//var img = this.bindingDocument.createElement ( "img" );
	//img.src = Resolver.resolve ( "${icon:popup}" );
	//img.className = "dialogindicatorimage";
	//this._buttonBinding.bindingElement.appendChild ( img );
	//this.shadowTree.indicatorimage = img;



	var xmlns = "http://www.w3.org/2000/svg";
	
	this.shadowTree.indicatorimage = this.bindingDocument.createElementNS(xmlns, "svg");

	this.shadowTree.indicatorimage.setAttribute("viewBox", "0 0 24 24");
	this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
	
	var g = KickStart.sprites.querySelector("#popup");
	if (g) {
		var viewBox = g.getAttribute('viewBox'),
				fragment = document.createDocumentFragment(),
				clone = g.cloneNode(true);

		if (viewBox) {
			this.shadowTree.indicatorimage.setAttribute('viewBox', viewBox);
		}
		fragment.appendChild(clone);

		this.shadowTree.indicatorimage.appendChild(fragment);
	}

	this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
}

/**
 * @implemenents {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
DataDialogBinding.prototype.handleAction = function ( action ) {
	
	DataDialogBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var self = this;
	
	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			
			if ( this._handler == null ) {
				this._handler = {
					handleDialogResponse : function ( response, result ) {
						if ( response == Dialog.RESPONSE_ACCEPT ) {
							if ( result instanceof DataBindingMap ) {
								self._map = result;
							} else {
								throw "Invalid dialog result";
							}
						}
					}
				};
			}
			
			if ( binding == this._buttonBinding ) {
				action.consume ();
				this.focus ();	
				this.fireCommand ();
			}
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 */
DataDialogBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	DataDialogBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.KEY_SPACE :
			this.fireCommand ();
			break;
	}
}

/**
 * Open that dialog! An optional ViewDefinition can be build by subclass.
 * @param @optional {ViewDefinition} def
 */
DataDialogBinding.prototype.fireCommand = function ( def ) {
	
	/* 
	 * This can be intercepted by someone 
	 * waiting to change the dialog handler.
	 */
	this.dispatchAction ( this.constructor.ACTION_COMMAND );
	
	var handle = this.getProperty ( "handle" );
	var url	= this.getURL ();
	var definition = null;
	
	if ( handle != null || def != null ) {
		if (def != null) {
			definition = def;
		} else {
			definition = ViewDefinitions[handle];
		}
		if ( definition instanceof DialogViewDefinition ) {
			definition.handler = this._handler;
			if ( this._map != null ) { // otherwise mess up StringDataDialogBinding
				definition.argument = this._map;
			}
			StageBinding.presentViewDefinition ( definition );
		}
	} else if ( url != null ) {
		definition = Dialog.invokeModal ( 
			url,
			this._handler, 
			this._map
		);
	}
	
	/*
	 * Release keyboard and be prepared to 
	 * grab it again when the dialog closes.
	 */
	if ( definition != null ) {
		this._dialogViewHandle = definition.handle;
		this._releaseKeyboard ();
	}
}

/**
 * Set label.
 * @param {string} label
 */
DataDialogBinding.prototype.setLabel = function ( label ) {
	
	this.setProperty ( "label", label );
	if ( this.isAttached ) {
		this._buttonBinding.setLabel ( 
			label + LabelBinding.DIALOG_INDECATOR_SUFFIX 
		);
	}
}

/**
 * Get label 
 * @return {string}
 */
DataDialogBinding.prototype.getLabel = function () {

    return this.getProperty("label");
}

/**
 * Set image.
 * @param {string} image
 */
DataDialogBinding.prototype.setImage = function ( image ) {
	
	this.setProperty ( "image", image );
	
	/*
	 * TODO: Refactor this setup!
	 */
	if ( this.imageProfile != null ) {
		this.imageProfile.setDefaultImage ( image );
		if ( this._buttonBinding != null ) {
			this._buttonBinding.imageProfile = this.imageProfile;
			this._buttonBinding.setImage ( this._buttonBinding.imageProfile.getDefaultImage ());
		}
	}
}


/**
 * Set label.
 * @param {string} tooltip
 */
DataDialogBinding.prototype.setToolTip = function ( tooltip ) {
	
	this.setProperty ( "tooltip", tooltip );
	if ( this.isAttached ) {
		this._buttonBinding.setToolTip ( tooltip );
	}	
	
}

/**
 * Set handle.
 * @param {string} handle
 */
DataDialogBinding.prototype.setHandle = function ( handle ) {

	this.setProperty ( "handle", handle );
}

/**
 * Set that URL.
 * @param {string} url
 */
DataDialogBinding.prototype.setURL = function ( url ) {
	
	this.setProperty ( "url", url );
}

/**
 * Get that URL. Isolated so that subclasses may hack it.
 * @return {string}
 */
DataDialogBinding.prototype.getURL = function () {

	return this.getProperty ( "url" );
}

/**
 * Set handler.
 * @param {IDialogResponseHandler} handler
 */
DataDialogBinding.prototype.setHandler = function ( handler ) {
	
	this._handler = handler;
}

/**
 * Focus.
 * @implements {IData}
 */
DataDialogBinding.prototype.focus = function () {
	
	if ( !this.isFocused ) {
		DataBinding.prototype.focus.call ( this );
		FocusBinding.focusElement ( this.bindingElement );
		if ( this.isFocused ) {
			this._grabKeyboard ();
		}
	}
};

/**
 * Blur.
 * @implements {IData}
 */
DataDialogBinding.prototype.blur = function () {
	
	if ( this.isFocused ) {
		DataBinding.prototype.blur.call ( this );
		if ( this._hasKeyboard ) {
			this._releaseKeyboard ();
		}	
	}
}

/**
 * Grab keyboard.
 */
DataDialogBinding.prototype._grabKeyboard = function () {
	
	if ( !this._hasKeyboard ) {
		this.subscribe ( BroadcastMessages.KEY_SPACE );
		this._hasKeyboard = true;
	}
	
}

/**
 * Release keyboard.
 */
DataDialogBinding.prototype._releaseKeyboard = function () {
	
	if ( this._hasKeyboard ) {
		this.unsubscribe ( BroadcastMessages.KEY_SPACE );
		this._hasKeyboard = false;
	}
}

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
DataDialogBinding.prototype.validate = function () {
	
    var isValid = true;
    if (this.isRequired == true) {
        var value = this.getValue();

        if (value == null || value == "") {
            isValid = false;
        }

        if (isValid != this._isValid) {
            if (isValid) {
                this.dispatchAction(Binding.ACTION_VALID);
                this.detachClassName(DataBinding.CLASSNAME_INVALID);
            } else {
                this.dispatchAction(Binding.ACTION_INVALID);
                this.attachClassName(DataBinding.CLASSNAME_INVALID);
                this._buttonBinding.setLabel(DataBinding.warnings["required"]);
            }
        }
        this._isValid = isValid;
    }
    return isValid;
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
DataDialogBinding.prototype.manifest = function () {
	
	// do nothing
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
DataDialogBinding.prototype.getValue = function () {
	
	return null;
}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {DataBindingMap}
 */
DataDialogBinding.prototype.getResult = function () {
	
	return this._map;
}

/**
 * Set result. Notice that the result is automatically 
 * deployed as argument for the associated dialog.
 * @param {DataBindingMap} map
 */
DataDialogBinding.prototype.setResult = function ( map ) {

	if ( map instanceof DataBindingMap ) {
		this._map = map;
	} else {
		throw "Invalid argument";
	}
}

/**
 * DataDialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DataDialogBinding}
 */
DataDialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:datadialog", ownerDocument );
	return UserInterface.registerBinding ( element, DataDialogBinding );
}