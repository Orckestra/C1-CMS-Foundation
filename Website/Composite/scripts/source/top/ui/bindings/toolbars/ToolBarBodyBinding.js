ToolBarBodyBinding.prototype = new Binding;
ToolBarBodyBinding.prototype.constructor = ToolBarBodyBinding;
ToolBarBodyBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ToolBarBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarBodyBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isRightAligned = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ToolBarBodyBinding.prototype.toString = function () {

	return "[ToolBarBodyBinding]";
}

/**
 * Overloads {Binding#onBindingAttach}
 */
ToolBarBodyBinding.prototype.onBindingAttach = function () {

	ToolBarBodyBinding.superclass.onBindingAttach.call ( this );
	
	this.addMembers (
		this.getChildBindingsByLocalName ( "toolbargroup" )
	);
	if ( this.getProperty ( "align" ) == "right" || this.isRightAligned ) {
		this.alignRight ();
	}
}

/**
 * Fires when children toolbargroups are initialized.
 * @overloads {Binding#onBindingInitialize}
 */
ToolBarBodyBinding.prototype.onBindingInitialize = function () {

	this.refreshToolBarGroups ();
	ToolBarBodyBinding.superclass.onBindingInitialize.call ( this );
}

/**
 * Invoke right-aligned layout.
 */
ToolBarBodyBinding.prototype.alignRight = function () {

	this.attachClassName ( "alignright" );
	this.setProperty ( "align", "right" );
	this.isRightAligned = true;
}


/** 
 * Refresh the visual appearance of toolbargroups. 
 * First and last group shall not show toolbarseparators. 
 * Explorer cannot fix this using CSS in retarded rendering mode.
 */
ToolBarBodyBinding.prototype.refreshToolBarGroups = function () {

	var allGroups = this.getDescendantBindingsByLocalName ( "toolbargroup" );
	var groups = new List ();
	var isFirst = true;
	
	/*
	 * Only counting visible groups. 
	 * Not counting default content.
	 */
	allGroups.each ( function ( group ) {
		if ( group.isVisible && !group.isDefaultContent ) {
			groups.add ( group );
		}
	});
	
	while ( groups.hasNext ()) {
		var group = groups.getNext ();
		group.setLayout ( ToolBarGroupBinding.LAYOUT_DEFAULT );
		if ( isFirst ) {
			group.setLayout ( ToolBarGroupBinding.LAYOUT_FIRST );
			isFirst = false;
		}
		if ( !groups.hasNext ()) {
			group.setLayout ( ToolBarGroupBinding.LAYOUT_LAST );
		}
	};
	
	if ( this.getProperty ( "equalsize" )) {
		this.enforceEqualSize ();
	}
}

/**
 * TODO: cache max?
 * TODO: enable equalsize for toolbarbuttons (not just clickbuttons)? But we only use this in dialogs...
 */
ToolBarBodyBinding.prototype.enforceEqualSize = function () {
	
	var max = 0, list = this.getDescendantBindingsByLocalName ( "clickbutton" );
	
	while ( list.hasNext ()) {
		var button = list.getNext ();
		var width = button.getEqualSizeWidth ();
		if ( width > max ) {
			max = width;
		}
	}
	if ( max != 0 ) {
		list.reset ();
		while ( list.hasNext ()) {
			var button = list.getNext ();
			button.setEqualSizeWidth ( max );		
		}
	}
}

/**
 * Dispose toolbarbody content.
 */
ToolBarBodyBinding.prototype.empty = function () {
	
	this.detachRecursive ();
	this.bindingElement.innerHTML = "";
}

/**
 * Update layout when new toolbargroup is added. 
 * @overwrites {Binding#add}
 * @param {Binding} binding
 * @param {boolean} isBulkAdd Minimize css engine work
 * @return {Binding}
 */
ToolBarBodyBinding.prototype.add = function ( binding, isBulkAdd ) {

	var returnable = ToolBarBinding.superclass.add.call ( this, binding );
	if ( !isBulkAdd ) {
		if ( binding instanceof ToolBarGroupBinding && this.isAttached ) {
			this.refreshToolBarGroups ();
		}
	}
	return returnable;
}

/**
 * Update layout when new toolbargroup is added.
 * @overwrites {Binding#addFirst}
 * @param {Binding} binding
 * @param {boolean} isBulkAdd
 * @return {Binding}
 */
ToolBarBodyBinding.prototype.addFirst = function ( binding, isBulkAdd ) {

	var returnable = ToolBarBinding.superclass.addFirst.call ( this, binding );
	if ( !isBulkAdd ) {
		if ( binding instanceof ToolBarGroupBinding && this.isAttached ) {
			this.refreshToolBarGroups ();
		}
	}
	return returnable;
}

/**
 * This will enable or disable ALL contained bindings that implement IFocusable.
 * TODO: THIS IS NOT USED NOWHERE...
 * @param {boolean} isDisabled
 *
ToolBarBodyBinding.prototype.setDisabled = function ( isDisabled ) {
	
	var bindings = this.getDescendantBindingsByLocalName ( "*" );
	while ( bindings.hasNext ()) {
		var binding = bindings.getNext ();
		if ( Interfaces.isImplemented ( IFocusable, binding )) {
			if ( typeof binding.setDisabled != Types.UNDEFINED ) {
				binding.setDisabled ( isDisabled );
			} else {
				throw "Could not disable focusable " + binding.toString ();
			}
		}
	}
}
*/

/**
 * ToolBarBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarBodyBinding}
 */
ToolBarBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbody", ownerDocument );
	return UserInterface.registerBinding ( element, ToolBarBodyBinding );
}