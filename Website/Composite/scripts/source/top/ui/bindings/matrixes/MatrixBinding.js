MatrixBinding.prototype= new Binding;
MatrixBinding.prototype.constructor = MatrixBinding;
MatrixBinding.superclass = Binding.prototype;

MatrixBinding.CLASSNAME_MANIFESTER = "matrixbindingmanifester";

MatrixBinding.CENTER	= "c";
MatrixBinding.NORTH 	= "n";
MatrixBinding.SOUTH 	= "s";
MatrixBinding.EAST 		= "e";
MatrixBinding.WEST 		= "w";
MatrixBinding.NORTHEAST	= "ne";
MatrixBinding.NORTHWEST	= "nw";
MatrixBinding.SOUTHEAST	= "se";
MatrixBinding.SOUTHWEST	= "sw";

/**
 * @type {string}
 */
MatrixBinding.markup = null;

/**
 * @class
 */
function MatrixBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MatrixBinding" );
	
	/**
	 * Subclass can overwrite this property to disable matrix building.
	 * @type {boolean}
	 */
	this.hasMatrix = true;
	
	/**
	 * The matrix template. Locates a file in the "templates" folder.
	 * @type {string}
	 */
	this.template = "matrixbindingelement.xml";
	
	/**
	 * We'll be generating of lot of matrixes, so we won't index the table unless required.
	 * @type {boolean}
	 */
	this._isTableIndexed = false;
	
	/*
	 * Returnable
	 */
	return this;
}

/**
 * Identifies binding.
 */
MatrixBinding.prototype.toString = function () {

	return "[MatrixBinding]";
}

/**
 *
 */
MatrixBinding.prototype.onBindingAttach = function () {

	MatrixBinding.superclass.onBindingAttach.call ( this );
	
	if ( this.hasMatrix ) {
		//if ( this.bindingElement.hasChildNodes ()) {
		//	throw new Error ( "MatrixBinding: No support for childnodes!" );
		//} else {
			this.bindingElement.innerHTML = Templates.getTemplateElementText ( 
				this.template 
			);
			this.shadowTree.table = this.bindingElement.firstChild;
		//}
	}
}

/**
 * Indexing table cells.
 */
MatrixBinding.prototype._indexTable = function () {

	var cells = new List ( 
		DOMUtil.getElementsByTagName ( this.bindingElement, "td" )
	);
	while ( cells.hasNext ()) {
		var cell = cells.getNext ();
		this.shadowTree [ cell.className ] = cell;	
	}
}

/**
 * @overwrites {Binding#add} to make sure 
 * that added content is placed in matrix center.
 * @param {Binding} binding
 * @return {Binding}
 */
MatrixBinding.prototype.add = function ( binding ) {

	var returnable = null;
	if ( this.hasMatrix ) {
		if ( !this._isTableIndexed ) {
			this._indexTable ();
		}
		this.shadowTree [ MatrixBinding.CENTER ].appendChild ( binding.bindingElement );
		returnable = binding;
	} else {
		returnable = MatrixBinding.superclass.add.call ( this, binding );
	}
	return returnable;
}

/**
 * @overwrites {Binding#addFirst} to make sure 
 * that added content is placed in matrix center.
 * @param {Binding} binding
 * @return {Binding}
 */
MatrixBinding.prototype.addFirst = function ( binding ) {

	var returnable = null;
	if ( this.hasMatrix ) {
		if ( !this._isTableIndexed ) {
			this._indexTable ();
		}
		var centerCell = this.shadowTree [ MatrixBinding.CENTER ];
		centerCell.insertBefore ( binding.bindingElement, centerCell.firstChild );
		returnable = binding;
	} else {
		returnable = MatrixBinding.superclass.addFirst.call ( this, binding );
	}
	return binding;
}

/**
 * Both browsers have trouble rendering the table unless at least one cell has 
 * content. This can be fixed by setting a border, but we don't want one of those.
 * In most cases - eg buttons and tabs - the matrix has content and this can be skipped.
 */
MatrixBinding.prototype.manifest = function () {
	
	if ( !this._isTableIndexed ) {
		this._indexTable ();
	}
	var div = this.bindingDocument.createElement ( "div" );
	div.appendChild ( this.bindingDocument.createTextNode ( "!" ));
	div.className = MatrixBinding.CLASSNAME_MANIFESTER;
	this.shadowTree [ MatrixBinding.CENTER ].appendChild ( div );
}

/**
 * MYBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MYBinding}
 */
MatrixBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:matrix", ownerDocument );
	return UserInterface.registerBinding ( element, MatrixBinding );
}