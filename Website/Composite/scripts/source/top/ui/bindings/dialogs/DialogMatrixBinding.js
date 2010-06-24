DialogMatrixBinding.prototype = new MatrixBinding;
DialogMatrixBinding.prototype.constructor = DialogMatrixBinding;
DialogMatrixBinding.superclass = MatrixBinding.prototype;

/**
 * @class
 */
function DialogMatrixBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogMatrixBinding" );
	
	/**
	 * @overwrites {Binding#isDraggable}
	 * @type {boolean}
	 */
	this.isDraggable = true;
	
	/**
	 * This property is set by the containing {@link DialogBinding}.
	 * @type {string}
	 * @private
	 */
	this._type = null;
}

/**
 * Identifies binding.
 */
DialogMatrixBinding.prototype.toString = function () {

	return "[DialogMatrixBinding]";
}

/**
 * @overloads {MatrixBinding#onBindingAttach}.
 */
DialogMatrixBinding.prototype.onBindingAttach = function () {

	DialogMatrixBinding.superclass.onBindingAttach.call ( this );
	this.shadowTree.table.className = "matrix dialogmatrix";
	
	/*
	 * Bug implodes table in explorer unless content is added.
	 */
	this._indexTable ();
	this.shadowTree [ MatrixBinding.CENTER ].appendChild ( 
		this.bindingDocument.createTextNode ( "." )
	);
}

/**
 * DialogMatrixBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogMatrixBinding}
 */
DialogMatrixBinding.newInstance = function ( ownerDocument ) {
	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialogmatrix", ownerDocument );
	return UserInterface.registerBinding ( element, DialogMatrixBinding );
}