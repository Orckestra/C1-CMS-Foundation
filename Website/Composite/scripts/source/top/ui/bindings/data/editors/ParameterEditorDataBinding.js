ParameterEditorDataBinding.prototype = new EditorDataBinding;
ParameterEditorDataBinding.prototype.constructor = ParameterEditorDataBinding;
ParameterEditorDataBinding.superclass = EditorDataBinding.prototype;


/**
 * @class
 */
function ParameterEditorDataBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ParameterEditorDataBinding" );
	
	/**
	 * @overwrites {EditorDataBinding#_url}
	 */
	this._url = "${root}/controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionParameterEditor.aspx?StateProvider=${stateprovider}&handle=${handle}";
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ParameterEditorDataBinding.prototype.toString = function () {

	return "[ParameterEditorDataBinding]";
};

/**
 * @implements {IData}
 */
ParameterEditorDataBinding.prototype.getValue = function () {
	
	return Math.random ();
}