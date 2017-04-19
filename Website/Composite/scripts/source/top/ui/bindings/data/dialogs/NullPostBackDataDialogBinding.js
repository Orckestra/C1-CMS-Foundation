NullPostBackDataDialogBinding.prototype = new DataBinding;
NullPostBackDataDialogBinding.prototype.constructor = NullPostBackDataDialogBinding;
NullPostBackDataDialogBinding.superclass = DataBinding.prototype;

NullPostBackDataDialogBinding.LABEL_NULL = "(No selection)";
NullPostBackDataDialogBinding.LABEL_DEFAULT = "Select";

NullPostBackDataDialogBinding.VALUE_NULL = "null";
NullPostBackDataDialogBinding.VALUE_SELECTED = "selected";

NullPostBackDataDialogBinding.ACTION_COMMAND = "nullpostbackdatadialog command";


/**
 * @class
 */
function NullPostBackDataDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "NullPostBackDataDialogBinding" );
	
	/**
	 * @type {ViewDefinitionPostBackDataDialogBinding}
	 */
	this._datathing = null;
	
	/**
	 * @type {NullPostBackDataDialogSelectorBinding}
	 */
	this._selector = null;
	
	/**
	* Focus works on internal selecter
	* @overwrites {SelectorBinding#isFocusable}
	*/
	this.isFocusable = false;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
NullPostBackDataDialogBinding.prototype.toString = function () {

	return "[NullPostBackDataDialogBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
NullPostBackDataDialogBinding.prototype.onBindingAttach = function () {
	
	NullPostBackDataDialogBinding.superclass.onBindingAttach.call ( this );
	
	this.propertyMethodMap [ "label" ] = this.setLabel;
	var self = this;
	this.propertyMethodMap [ "value" ] = function ( value ) {
		self._datathing.setValue ( value );
	};
	this.propertyMethodMap [ "selectorlabel" ] = function () {
		if ( Application.isDeveloperMode ) {
			alert ( "Selectorlabel property not supported yet!" )
		}
	}
	
	this.addActionListener ( PageBinding.ACTION_DOPOSTBACK );
	this._buildDataDialog ();
	this._buildSelector ();
}

/**
 * Build PostBackDataDialogBinding.
 */
NullPostBackDataDialogBinding.prototype._buildDataDialog = function () {
	
	this._datathing = this.add ( ViewDefinitionPostBackDataDialogBinding.newInstance ( this.bindingDocument ));
	
	// transfer properties to datathing
	new List ([ "callbackid", "handle", "name", "providersearch", "providerkey", "value" ]).each ( function ( prop ) {
		this._datathing.setProperty ( prop, this.getProperty ( prop ));
		this.setProperty ( prop, null );
	}, this );
	
	var self = this;
	this._datathing.ondialogcancel = function () {
		var value = self.getValue (); 
		if ( value == "" || value == null ) {
			self._selector.setLabel ( NullPostBackDataDialogBinding.LABEL_NULL );
		} else {
			self._selector.setLabel ( self.getLabel ());
		}
	}
	
	this._datathing.hide ();
	this._datathing.attach ();
}

/**
 * Build selector thingy.
 */
NullPostBackDataDialogBinding.prototype._buildSelector = function () {

	this._selector = this.add ( NullPostBackDataDialogSelectorBinding.newInstance ( this.bindingDocument ));
	
	var value = this.getProperty ( "value" );
	var label = this.getProperty ( "selectorlabel" );
	
	if ( label == null ) {
		label = NullPostBackDataDialogBinding.LABEL_DEFAULT;
	}
	
	var list = new List ();
	list.add ( 
		new SelectorBindingSelection ( 
			NullPostBackDataDialogBinding.LABEL_NULL, 
			NullPostBackDataDialogBinding.VALUE_NULL,
			value == null
		)
	);
	list.add ( 
		new SelectorBindingSelection (
			label + LabelBinding.DIALOG_INDECATOR_SUFFIX, 
			NullPostBackDataDialogBinding.VALUE_SELECTED,
			value != null,
			new ImageProfile ({
				image : "${icon:popup}"
			})
		)
	);
	
	this._selector.master = this;
	this._selector.attach ();
	this._selector.populateFromList ( list );
	
	// override label from default selection!
	var value = this.getValue (); 
	if ( value == "" || value == null ) {
		this._selector.setLabel ( NullPostBackDataDialogBinding.LABEL_NULL );
	} else {
		this._selector.setLabel ( this.getLabel ());
	}
}

/**
 * @implements {IActionHandler}
 * @param {Action} action
 */
NullPostBackDataDialogBinding.prototype.handleAction = function ( action ) {
	
	NullPostBackDataDialogBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case PageBinding.ACTION_DOPOSTBACK :
			if ( action.target == this._datathing ) {
				
				// we are waiting for server 
				// to update label property...
				
				var label = this.getProperty ( "label" );
				this._selector.setLabel ( "" );
				this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
				
				/*
				 * ... but if user selected the SAME item, the 
				 * UpdateManager sees no update and we must 
				 * manually restore the old label. This should 
				 * be moved to an evented setup at some point... 
				 */
				var self = this;
				setTimeout ( function () {
					if ( self.getProperty ( "label" ) == label ) {
						self._selector.setLabel ( label );
					}
				}, 500 );
				
				
				/*
				var value = this._datathing.getValue ();
				var label = decodeURIComponent ( value );
				
				this._selector.setLabel ( label );
				this._selector.setToolTip ( label );
				this.setValue ( value );
				*/
				
				action.consume ();
			}
			break;
	}
}

/**
 * @return {String}
 */
NullPostBackDataDialogBinding.prototype.getLabel = function () {
	
	return this.getProperty ( "label" );
}

/**
 * @param {String} label
 */
NullPostBackDataDialogBinding.prototype.setLabel = function ( label ) {
	
	this.setProperty ( "label", label );
	if ( this._selector != null ) {
		this._selector.setLabel ( label );
	}
}

/**
 * @return {String}
 */
NullPostBackDataDialogBinding.prototype.getValue = function () {
	
	return this._datathing.getValue ();
}

/**
 * @param {String} value
 */
NullPostBackDataDialogBinding.prototype.setValue = function ( value ) {
	
	this._datathing.setValue ( value );
	this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
}

NullPostBackDataDialogBinding.prototype.action = function () {
    new List(["selectedtoken"]).each(function (prop) {
        this._datathing.setProperty(prop, this.getProperty(prop));
    }, this);
	this._datathing.fireCommand ();
}


// MUST IMPLEMENT! .............................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
NullPostBackDataDialogBinding.prototype.validate = function () {
	
	return true;
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
NullPostBackDataDialogBinding.prototype.manifest = function () {}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
NullPostBackDataDialogBinding.prototype.getResult = function () {}

/**
 * Set result.
 * @implements {IData}
 * @param {object} value
 */
NullPostBackDataDialogBinding.prototype.setResult = function () {}