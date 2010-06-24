FunctionEditorDataBinding.prototype = new EditorDataBinding;
FunctionEditorDataBinding.prototype.constructor = FunctionEditorDataBinding;
FunctionEditorDataBinding.superclass = EditorDataBinding.prototype;


/**
 * @class
 */
function FunctionEditorDataBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FunctionEditorDataBinding" );
	
	/**
	 * @overwrites {EditorDataBinding#_url}
	 */
	this._url = "${root}/content/misc/editors/functioncalleditor/functioncalleditor.aspx?StateProvider=${stateprovider}&Handle=${handle}";
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FunctionEditorDataBinding.prototype.toString = function () {

	return "[FunctionEditorDataBinding]";
};