TableCellDialogPageBinding.prototype = new TinyDialogPageBinding;
TableCellDialogPageBinding.prototype.constructor = TableCellDialogPageBinding;
TableCellDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function TableCellDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TableCellDialogPageBinding" );
}

/**
 * Identifies binding.
 */
TableCellDialogPageBinding.prototype.toString = function () {

	return "[TableCellDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBeforePageIntialize}
 */
TableCellDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	this._populateClassNameSelector ();
	this._populateDataBindingsFromDOM ();
	
	TableCellDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Initialize databindings.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
TableCellDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	TableCellDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
	
	var td = this._tinyElement;
	var manager = this.bindingWindow.DataManager;
	
	manager.getDataBinding ( "cellType" ).selectByValue ( 
		DOMUtil.getLocalName ( td ),
		true
	);
	if ( td.getAttribute ( "width" )) {
		manager.getDataBinding ( "width" ).setValue ( td.width );
	}
	if ( td.getAttribute ( "align" )) {
		manager.getDataBinding ( "align" ).selectByValue ( td.align );
	}
	if ( td.getAttribute ( "valign" )) {
		manager.getDataBinding ( "valign" ).selectByValue ( td.valign );
	}
}