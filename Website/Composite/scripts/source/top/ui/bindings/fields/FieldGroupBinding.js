FieldGroupBinding.prototype = new Binding;
FieldGroupBinding.prototype.constructor = FieldGroupBinding;
FieldGroupBinding.superclass = Binding.prototype;

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
	this._buildDOMContent ();
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
	var fields = this.bindingElement.getElementsByTagName('field');
    if (!fields.length) {
        fields = this.bindingElement.getElementsByTagName('ui:field'); // taht works for IE
    }
    var firstField = fields[0];
    if (firstField) {
        firstField.className += " " + "first";
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
		this.bindingElement.insertBefore(labelBinding.bindingElement, this.bindingElement.firstChild);
		labelBinding.attach ();
		this.shadowTree.labelBinding = labelBinding;

		this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML, "div", this.bindingDocument));
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