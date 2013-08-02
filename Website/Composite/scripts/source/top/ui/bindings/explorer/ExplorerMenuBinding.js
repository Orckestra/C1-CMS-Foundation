ExplorerMenuBinding.prototype = new Binding;
ExplorerMenuBinding.prototype.constructor = ExplorerMenuBinding;
ExplorerMenuBinding.superclass = Binding.prototype;
ExplorerMenuBinding.ACTION_SELECTIONCHANGED = "explorermenu selectionchanged";

/**
 * @class
 */
function ExplorerMenuBinding () { 

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerMenuBinding" );
	
	/** 
	 * Associating buttons to handles.
	 * @type {Map<string><ExplorerToolBarButtonBinding>}
	 */
	this._maxButtons = new Map ();
	
	/**
	 * @type {List<ExplorerToolBarButtonBinding}
	 */
	this._maxList = new List ();
	
	/** 
	 * Associating buttons to handles.
	 * @type {Map<string><ToolBarButtonBinding>}
	 */
	this._minButtons = new Map ();
	
	/**
	 * @type {List<ToolBarButtonBinding}
	 */
	this._minList = new List ();
	
	/**
	 * @type {int}
	 */
	this._index = -1;
	
	/**
	 * The big toolbargroup
	 * @type {ToolBarGroupBinding}
	 */
	this._maxGroup= null;
	
	/**
	 * The small toolbargroup
	 * @type {ToolBarGroupBinding}
	 */
	this._minGroup = null;
	
	/**
	 * @type {string}
	 */
	this._selectedHandle = null;
	
	/**
	 * @type {string}
	 */
	this._selectedTag = null;
	
}

/**
 * Identifies binding.
 */
ExplorerMenuBinding.prototype.toString = function () {

	return "[ExplorerMenuBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
ExplorerMenuBinding.prototype.onBindingRegister = function () {

	ExplorerMenuBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED, this );
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ExplorerMenuBinding.prototype.onBindingAttach = function () {

	ExplorerMenuBinding.superclass.onBindingAttach.call ( this );
	this.addMember ( this.getChildBindingByLocalName ( "explorertoolbar" ));
	this.addMember ( this.getChildBindingByLocalName ( "toolbar" ));
}

/**
 * @overloads {Binding#onMemberInitialize}
 * @param {Binding} binding
 */
ExplorerMenuBinding.prototype.onMemberInitialize = function ( binding ) {
	
	switch ( binding.constructor ) {
		case ExplorerToolBarBinding :
			this._maxGroup= binding.getToolBarGroupByIndex ( 0 );
			break;
		case ToolBarBinding :
			this._minGroup = binding.getToolBarGroupByIndex ( 0 );
			break;
	}
	ExplorerMenuBinding.superclass.onMemberInitialize.call ( this, binding );
}

/**
 * Mount viewDefinition, building menu items.
 * @param {SystemViewDefinition} definition
 */
ExplorerMenuBinding.prototype.mountDefinition = function ( definition ) {

	this._maxButtons.set ( definition.handle, this._mountMaxButton ( definition ));
	this._minButtons.set ( definition.handle, this._mountMinButton ( definition ));
	this._index ++;
}

/**
 * Building big menubutton.
 * @param {SystemViewDefinition} definition
 * @return {ExplorerToolBarButtonBinding}
 */
ExplorerMenuBinding.prototype._mountMaxButton = function ( definition ) {
	
	var button = ExplorerToolBarButtonBinding.newInstance ( 
		this.bindingDocument,
		ExplorerToolBarButtonBinding.TYPE_LARGE
	);
	button.setLabel ( definition.label );
	button.setToolTip ( definition.toolTip );
	button.handle = definition.handle;
	button.node = definition.node;
	this._maxGroup.add ( button );
	this._maxList.add ( button ); 
	button.attach();
	if (Client.isiPad)
		button.hide(); // note that we hide large buttons on startup for iPad!
	return button;
}

/**
 * Building small menubutton.
 * @param {SystemViewDefinition} definition
 * @return {ExplorerToolBarButtonBinding}
 */
ExplorerMenuBinding.prototype._mountMinButton = function ( definition ) {

	var button = ExplorerToolBarButtonBinding.newInstance ( 
		this.bindingDocument,
		ExplorerToolBarButtonBinding.TYPE_NORMAL
	);
	button.setLabel ( definition.label );
	button.setToolTip ( definition.label ); // use label as tooltip
	button.handle = definition.handle;
	button.node = definition.node;
	this._minGroup.addFirst ( button );
	this._minList.add ( button );
	button.attach();
	if (!Client.isiPad)
		button.hide (); // note that we hide small buttons on startup!
	return button;
}

/**
 * Fires when selection changes in either one of the menus.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ExplorerMenuBinding.prototype.handleAction = function ( action ) {

	ExplorerMenuBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case RadioGroupBinding.ACTION_SELECTIONCHANGED :
		
			var radioGroupBinding = action.target;
			var buttonBinding = radioGroupBinding.getCheckedButtonBinding ();
			var handle = buttonBinding.handle;
	
			switch ( radioGroupBinding ) {
				case this._maxGroup:
					this._minGroup.setCheckedButtonBinding ( 
						this._minButtons.get ( handle ), true 
					);
					break;
				case this._minGroup :
					this._maxGroup.setCheckedButtonBinding ( 
						this._maxButtons.get ( handle ), true 
					);
					break;
			}
			
			this._selectedHandle = handle;
			this._selectedTag = buttonBinding.node.getTag ();
			this.dispatchAction ( ExplorerMenuBinding.ACTION_SELECTIONCHANGED );
			action.consume ();
			break;
	}
}

/**
 * Set selection by handle.
 * @param {string} handle
 */
ExplorerMenuBinding.prototype.setSelectionByHandle = function ( handle ) { 

	var buttonBinding = this._maxButtons.get ( handle );
	
	if ( buttonBinding ) {
		buttonBinding.check ();
	} else {
		this.setSelectionDefault ();
	}
}

/**
 * Get handle on selected viewDefinition.
 * @return {string}
 */
ExplorerMenuBinding.prototype.getSelectionHandle = function () { 

	return this._selectedHandle;
}

/**
 * Get tag on selected viewDefinition (or the SystemNode associated to it).
 * @return {string}
 */
ExplorerMenuBinding.prototype.getSelectionTag = function () {

	return this._selectedTag;
}

/**
 * Selecting first button by default.
 */
ExplorerMenuBinding.prototype.setSelectionDefault = function () {

	if ( this._maxList.hasEntries ()) {
		this._maxList.getFirst ().check ();
	}
}

/**
 * Show more.
 * @return {boolean} True if something changed.
 */
ExplorerMenuBinding.prototype.showMore = function () {
	
	var isUpdated = false;
	var max = this._maxList.getLength () - 1;
	
	if ( !this._maxList.get ( max ).isVisible ) {
		this._index ++;
		this._maxList.get ( this._index ).show ();
		this._minList.get ( this._index ).hide ();
		isUpdated = true;
	}
	return isUpdated;
}

/**
 * Show less.
 * @return {boolean} True if something changed.
 */
ExplorerMenuBinding.prototype.showLess = function () {
	
	var isUpdated = false;
	
	if ( this._maxList.get ( 0 ).isVisible ) {
		this._maxList.get ( this._index ).hide ();
		this._minList.get ( this._index ).show ();
		this._index --;
		isUpdated = true;
	}
	return isUpdated;
}