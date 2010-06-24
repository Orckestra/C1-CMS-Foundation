TableRowDialogPageBinding.prototype = new TinyDialogPageBinding;
TableRowDialogPageBinding.prototype.constructor = TableRowDialogPageBinding;
TableRowDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function TableRowDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TableRowDialogPageBinding" );
}

/**
 * Identifies binding.
 */
TableRowDialogPageBinding.prototype.toString = function () {

	return "[TableRowDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
TableRowDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	TableRowDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this._populateClassNameSelector ();
	this._populateDataBindingsFromDOM ();
}

/**
 * Initialize databindings.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
TableRowDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	TableRowDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
	
	var manager = this.bindingWindow.DataManager;
	var tr = this._tinyElement;

	var rowtype = manager.getDataBinding ( "rowtype" );
	var position = DOMUtil.getLocalName ( tr.parentNode );
	rowtype.selectByValue ( position, true );
	
	if ( tr.getAttribute ( "align" )) {
		manager.getDataBinding ( "align" ).selectByValue ( tr.align );
	}
	if ( tr.getAttribute ( "valign" )) {
		manager.getDataBinding ( "valign" ).selectByValue ( tr.valign );
	}
	
	var selector = DataManager.getDataBinding ( "rowtype" );
	switch ( tr.parentNode.nodeName.toLowerCase ()) {
		case "thead" :
			selector.selectByValue ( "thead" );
			break;
		case "tfoot" :
			selector.selectByValue ( "tfoot" );
			break;
	}
}