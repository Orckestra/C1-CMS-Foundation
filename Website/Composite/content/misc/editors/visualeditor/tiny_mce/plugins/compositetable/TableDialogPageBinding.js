TableDialogPageBinding.prototype = new TinyDialogPageBinding;
TableDialogPageBinding.prototype.constructor = TableDialogPageBinding;
TableDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function TableDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TableDialogPageBinding" );

	/**
	 * @type {string}
	 */
	this._tinyAction = null;
}

/**
 * Identifies binding.
 */
TableDialogPageBinding.prototype.toString = function () {

	return "[TableDialogPageBinding]";
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
TableDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	this._tinyAction = this.pageArgument.tinyAction;
	//this._populateClassNameSelector ();
	this._populateClassNameSelector ( "table" );
	this._invokeInsertVersusUpdateLayout ();
	
	TableDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Same dialog is used for both "insert" and "update" table.
 */
TableDialogPageBinding.prototype._invokeInsertVersusUpdateLayout = function () {
	
	if ( this._tinyAction == "update" ) {
		this.label = StringBundle.getString ( "Composite.Web.VisualEditor", "Tables.Table.TitleUpdate" );
		this._populateDataBindingsFromDOM ();
	} else {
		this.label = StringBundle.getString ( "Composite.Web.VisualEditor", "Tables.Table.TitleInsert" );
	}
}

/**
 * Initialize databindings (only  in update scenario}.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
TableDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	TableDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
	
	var docManager = this.bindingWindow.DataManager;
	var table = this._tinyElement;
	
	var layoutFieldGroupBinding = UserInterface.getBinding ( 
		this.bindingDocument.getElementById ( "layoutfieldgroup" )
	);
	if ( layoutFieldGroupBinding ) {
		layoutFieldGroupBinding.hide ();
	}
	if ( table.summary ) {
		docManager.getDataBinding ( "summary" ).setValue ( table.summary );
	}
}