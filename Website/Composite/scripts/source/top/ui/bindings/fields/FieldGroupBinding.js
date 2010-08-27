FieldGroupBinding.prototype = new Binding;
FieldGroupBinding.prototype.constructor = FieldGroupBinding;
FieldGroupBinding.superclass = Binding.prototype;

FieldGroupBinding.CENTER	= "group-c";
FieldGroupBinding.NORTH 	= "group-n";
FieldGroupBinding.SOUTH 	= "group-s";
FieldGroupBinding.EAST 		= "group-e";
FieldGroupBinding.WEST 		= "group-w";
FieldGroupBinding.NORTHEAST	= "group-ne";
FieldGroupBinding.NORTHWEST	= "group-nw";
FieldGroupBinding.SOUTHEAST	= "group-se";
FieldGroupBinding.SOUTHWEST	= "group-sw";

FieldGroupBinding.ACTION_HIDE = "fieldgrouphide";
FieldGroupBinding.CLASSNAME_NOLABEL = "nolabel";
FieldGroupBinding.CLASSNAME_FIRST = "first"; // attached by FieldsBinding!

/**
 * @class
 */
function FieldGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldGroupBinding" );
}

/**
 * Identifies binding.
 */
FieldGroupBinding.prototype.toString = function () {

	return "[FieldGroupBinding]";
}

/**
 * Notice that we need to do this on register already!
 * @overloads {Binding#onBindingRegister}
 */
FieldGroupBinding.prototype.onBindingRegister = function () {

	FieldGroupBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "label" ] = this.setLabel;
	this._innerHTML ();
	this._buildDOMContent ();
}

/**
 * Perform the questionable "surround" html stunt. 
 * Please avoid this setup when possible.
 */
FieldGroupBinding.prototype._innerHTML = function () {
	
	var template = Templates.getTemplateElementText ( "fieldgroupmatrix.xml" );
	var markup = template.replace ( "MARKUP :)", this.bindingElement.innerHTML );	
	
	try {
		this.bindingElement.innerHTML = markup;
	} catch ( exception1 ) {
		this.logger.error ( "Exeption in innerHTML!" ); // WHAT IS THIS????????
		markup = markup.replace ( /\&nbsp;/g, "" );
		this.bindingElement.innerHTML = markup;
	}
	
	var self = this;
	var table = DOMUtil.getElementsByTagName ( this.bindingElement, "table" ).item ( 0 );
	new List ( table.rows ).each ( function ( row ) {
		new List ( row.cells ).each ( function ( cell ) {
			self.shadowTree [ cell.className ] = cell;
		});
	});
}

/**
 * Build DOM content.
 */
FieldGroupBinding.prototype._buildDOMContent = function () { 
	
	var label = this.getProperty ( "label" );
	if ( label ) {
		this.setLabel ( label );
	} else {
		this.attachClassName ( FieldGroupBinding.CLASSNAME_NOLABEL );
	}
}

/**
 * Set label.
 * @parm {string} label
 */
FieldGroupBinding.prototype.setLabel = function ( label ) {
	
	this.setProperty ( "label", label );
	
	if ( this.shadowTree.labelBinding == null ) {
	
		var labelBinding = LabelBinding.newInstance ( this.bindingDocument );
		var cell = this.shadowTree [ FieldGroupBinding.NORTH ];
		labelBinding.attachClassName ( "fieldgrouplabel" );
		cell.insertBefore ( 
			labelBinding.bindingElement,
			cell.getElementsByTagName ( "div" ).item ( 1 )
		);
		labelBinding.attach ();
		this.shadowTree.labelBinding = labelBinding;
	}
	
	this.shadowTree.labelBinding.setLabel ( 
		Resolver.resolve ( label )
	);
}

/** 
 * Get label.
 * @return {string}
 */
FieldGroupBinding.prototype.getLabel = function () {
	
	return this.getProperty ( "label" );
}

/**
 * Make sure that added content is placed in matrix center.
 * @overwrites {Binding#add}  
 * @param {Binding} binding
 * @return {Binding}
 */
FieldGroupBinding.prototype.add = function ( binding ) {

	this.shadowTree [ FieldGroupBinding.CENTER ].appendChild ( binding.bindingElement );
	return binding;
}

/**
 * Make sure that added content is placed in matrix center.
 * @overwrites {Binding#addFirst}
 * @param {Binding} binding
 * @return {Binding}
 */
FieldGroupBinding.prototype.addFirst = function ( binding ) {
	
	var centerCell = this.shadowTree [ FieldGroupBinding.CENTER ];
	centerCell.insertBefore ( binding.bindingElement, centerCell.firstChild );
	return binding;
}