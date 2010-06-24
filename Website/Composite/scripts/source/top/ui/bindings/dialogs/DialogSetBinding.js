DialogSetBinding.prototype = new Binding;
DialogSetBinding.prototype.constructor = DialogSetBinding;
DialogSetBinding.superclass = Binding.prototype;

/**
 * @class
 */
function DialogSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogSetBinding" );
}

/**
 * Identifies binding.
 */
DialogSetBinding.prototype.toString = function () {

	return "[DialogSetBinding]";
}

/**
 * Overloads {Binding#onBindingAttach}
 */
DialogSetBinding.prototype.onBindingAttach = function () {
	
	DialogSetBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( Binding.ACTION_MOVETOTOP, this );
	this.addActionListener ( Binding.ACTION_MOVEDONTOP, this );
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
DialogSetBinding.prototype.handleAction = function ( action ) {

	DialogSetBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;

	switch ( action.type ) {
		case Binding.ACTION_MOVETOTOP :
			if ( binding instanceof DialogBinding ) {
				this._moveToTop ( binding );
			}
			break;
		case Binding.ACTION_MOVEDONTOP :
			action.consume ();
			break;
	}
}

/**
 * Move dialog to highest z-index. Increment index by three so that the 
 * {@link DialogCoverBinding} can fit the slot between two dialogs.
 * @param {DialogBinding} binding
 */
DialogSetBinding.prototype._moveToTop = function ( binding ) {
	
	var maxIndex = 0;
	var dialogs = this.getChildBindingsByLocalName ( "dialog" );
	
	dialogs.each ( function ( dialog ) {
		var index = dialog.getZIndex ();
		maxIndex = index > maxIndex ? index : maxIndex;
	});
	
	binding.setZIndex ( maxIndex + 2 );
}