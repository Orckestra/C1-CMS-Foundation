TableMergeCellsDialogPageBinding.prototype = new TinyDialogPageBinding;
TableMergeCellsDialogPageBinding.prototype.constructor = TableMergeCellsDialogPageBinding;
TableMergeCellsDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function TableMergeCellsDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TableMergeCellsDialogPageBinding" );
	
	/**
	 * @type {object}
	 */
	this._layout = null;
}

/**
 * Identifies binding.
 */
TableMergeCellsDialogPageBinding.prototype.toString = function () {

	return "[TableMergeCellsDialogPageBinding]";
}

/**
 * @param {object} arg
 */
TableMergeCellsDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	TableMergeCellsDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this._layout = arg;
}

/**
 * overloads {DialogPageBinding#onBeforePageIntialize}
 */
TableMergeCellsDialogPageBinding.prototype.onBeforePageInitialize = function () {

	var manager = this.bindingWindow.DataManager;
	
	if ( this._layout.numcols ) {
		manager.getDataBinding ( "numcols" ).setValue ( this._layout.numcols );
	}
	if ( this._layout.numrows ) {
		manager.getDataBinding ( "numrows" ).setValue ( this._layout.numrows );
	}
	
	TableMergeCellsDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}