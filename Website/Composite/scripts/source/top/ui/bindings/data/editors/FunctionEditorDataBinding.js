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
	
	/**
	 * @type {bool}
	 */
	this.hasBasic = false;

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


/**
 * @overloads {FocusManagerBinding#onBindingAttach}
 */
FunctionEditorDataBinding.prototype.onBindingAttach = function () {

	FunctionEditorDataBinding.superclass.onBindingAttach.call(this);

	if (this.getProperty("hasbasic"))
		this.hasBasic = this.getProperty("hasbasic");

};

/**
 * @overloads {WindowBinding#_onPageInitialize}
 * @param {PageBinding} binding
 */
FunctionEditorDataBinding.prototype._onPageInitialize = function (binding) {

	FunctionEditorDataBinding.superclass._onPageInitialize.call(this, binding);

	if (this.hasBasic === false) {
		var basicgroup = this.getContentWindow().bindingMap.basicgroup;
		if (basicgroup)
			basicgroup.hide();
	}

}