NullPostBackDataDialogSelectorBinding.prototype = new SelectorBinding;
NullPostBackDataDialogSelectorBinding.prototype.constructor = NullPostBackDataDialogSelectorBinding;
NullPostBackDataDialogSelectorBinding.superclass = SelectorBinding.prototype;

/**
 * @class
 */
function NullPostBackDataDialogSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "NullPostBackDataDialogSelectorBinding" );

	/**
	 * @type {NullPostBackDataDialogBinding}
	 */
	this.master = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
NullPostBackDataDialogSelectorBinding.prototype.toString = function () {

	return "[NullPostBackDataDialogSelectorBinding]";
}

/**
 * @overloads {SelectorBinding#select}
 * @param {MenuItemBinding} itemBinding
 * @param {boolean} isActionBlocked True while initializing to block action.
 * @return {boolean} True if something (new) was selected
 */
NullPostBackDataDialogSelectorBinding.prototype.select = function ( itemBinding, isActionBlocked ) {

	if ( NullPostBackDataDialogSelectorBinding.superclass.select.call ( this, itemBinding, true )) {
		this._buttonBinding.setImage ( null );
		this._updateImageLayout ();
		if ( this._selectionValue == NullPostBackDataDialogBinding.VALUE_SELECTED ) {
			if ( this.master.getValue () != null ) {
				
				//this._buttonBinding.setLabel ( this.master.getLabel ());
			}
		}
	}
}

NullPostBackDataDialogSelectorBinding.prototype.setLabel = function ( label ) {
	
	this._buttonBinding.setLabel ( label );
}

NullPostBackDataDialogSelectorBinding.prototype.setToolTip = function ( tooltip ) {
	
	this._buttonBinding.setToolTip ( tooltip );
}

/**
 * @implements {IActionListener}
 * @overloads {SelectorBinding#handleAction}
 * @param {Action} action
 */
NullPostBackDataDialogSelectorBinding.prototype.handleAction = function ( action ) {
	
	NullPostBackDataDialogSelectorBinding.superclass.handleAction.call ( this, action )
	
	switch ( action.type ) {
		case MenuItemBinding.ACTION_COMMAND :
			var menuitem = action.target;
			var master = this.master;
			if ( menuitem.selectionValue == NullPostBackDataDialogBinding.VALUE_SELECTED ) {
				this.setLabel ( menuitem.getLabel ());
				setTimeout ( function () {
					master.action ();
				}, 0 );
			} else {
			    if (master.getValue()) {
			        master.dirty();
			    }
			    master.setValue("");
			}
			break;
	}
}

/**
 * @overwrites {SelectorBinding#manifest}
 */
NullPostBackDataDialogSelectorBinding.prototype.manifest = function () {
	
	// do nothing
}

/**
 * NullPostBackDataDialogSelectorBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {NullPostBackDataDialogSelectorBinding}
 */
NullPostBackDataDialogSelectorBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:selector", ownerDocument );
	return UserInterface.registerBinding ( element, NullPostBackDataDialogSelectorBinding );
}