ToolBarGroupBinding.prototype= new RadioGroupBinding;
ToolBarGroupBinding.prototype.constructor = ToolBarGroupBinding;
ToolBarGroupBinding.superclass = RadioGroupBinding.prototype;

ToolBarGroupBinding.LAYOUT_DEFAULT = 0;
ToolBarGroupBinding.LAYOUT_FIRST = 1;
ToolBarGroupBinding.LAYOUT_LAST = 2;

ToolBarGroupBinding.CLASSNAME_DEFAULTCONTENT = "defaultcontent";

/**
 * @class
 */
function ToolBarGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarGroupBinding" );

	/**
	 * @type {boolean}
	 */
	this.isDefaultContent = false;
}

/**
 * Identifies binding.
 */
ToolBarGroupBinding.prototype.toString = function () {

	return "[ToolBarGroupBinding]";
}

/**
 * Assign special classname to defaultcontent toolbargroup.
 * Overloads {Binding#onBindingAttach}
 * @see {ToolBarBinding#addDefaultContent}
 */
ToolBarGroupBinding.prototype.onBindingAttach = function () {

	ToolBarGroupBinding.superclass.onBindingAttach.call ( this );

	this.addMembers (
		this.getDescendantBindingsByLocalName ( "toolbarbutton" )
	);
	this.addMembers (
		this.getDescendantBindingsByLocalName ( "toolbarlabel" )
	);
	this.addMembers (
		this.getDescendantBindingsByLocalName ( "clickbutton" )
	);
	if ( this.isDefaultContent == true ) {
		this.attachClassName ( ToolBarGroupBinding.CLASSNAME_DEFAULTCONTENT );
	}
}

/**
 * Set layout. This method is invoked by the {@link ToolBarBodyBinding}.
 * @param {int} layout
 */
ToolBarGroupBinding.prototype.setLayout = function ( layout ) {

	switch ( layout ) {
		case ToolBarGroupBinding.LAYOUT_DEFAULT :
			this.detachClassName ( "first" );
			this.detachClassName ( "last" );
			break;
		case ToolBarGroupBinding.LAYOUT_FIRST :
			this.attachClassName ( "first" );
			break;
		case ToolBarGroupBinding.LAYOUT_LAST :
			this.attachClassName ( "last" );
			break;
	}
}

/**
 * Refresh toolbar layout when a group gets shown.
 * @overloads {Binding#show}
 */
ToolBarGroupBinding.prototype.show = function () {

	ToolBarGroupBinding.superclass.show.call ( this );
	var parent = this.bindingElement.parentNode;
	if ( DOMUtil.getLocalName ( parent ) == "toolbarbody" ) {
		UserInterface.getBinding ( parent ).refreshToolBarGroups ();
	}
}

/**
 * Refresh toolbar layout when a group gets hidden.
 * @overloads {Binding#hide}
 */
ToolBarGroupBinding.prototype.hide = function () {

	ToolBarGroupBinding.superclass.hide.call ( this );
	var parent = this.bindingElement.parentNode;
	if ( DOMUtil.getLocalName ( parent ) == "toolbarbody" ) {
		UserInterface.getBinding ( parent ).refreshToolBarGroups ();
	}
}

/**
 * Dispose toolbargroup content.
 */
ToolBarGroupBinding.prototype.empty = function () {

	this.detachRecursive();
	this.bindingElement.innerHTML = "";
}

/**
 * ToolBarGroupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarGroupBinding}
 */
ToolBarGroupBinding.newInstance = function ( ownerDocument ) {

	var toolbargroup = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbargroup", ownerDocument );
	return UserInterface.registerBinding ( toolbargroup, ToolBarGroupBinding );
}