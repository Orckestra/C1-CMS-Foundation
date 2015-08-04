PermissionEditorGridBinding.prototype = new Binding;
PermissionEditorGridBinding.prototype.constructor = PermissionEditorGridBinding;
PermissionEditorGridBinding.superclass = Binding.prototype;

PermissionEditorGridBinding.CLASSNAME_DEFINED = "primary";

/**
 * @class
 */
function PermissionEditorGridBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PermissionEditorGridBinding" );
	
	/**
	 * Tracking defined permissions.
	 * @type {HashMap<string><array>}
	 */
	this._defined = {};
	
	/**
	 * Tracking inherited permissions.
	 * @type {HashMap<string><array>}
	 */
	this._inherited = {};
	
	/**
	 * @type {int}
	 */
	this._index = 0;
}

/**
 * Identifies binding.
 */
PermissionEditorGridBinding.prototype.toString = function () {
	
	return "[PermissionEditorGridBinding]";
}

/**
 * Added when editor was modified to handle two distinct editor grids.
 * @overloads {Binding#onBindingAttach}
 */
PermissionEditorGridBinding.prototype.onBindingRegister = function () {

	PermissionEditorGridBinding.superclass.onBindingRegister.call ( this );
 	this._index = this.getID ().split ( "grid" )[ 1 ];
}

/**
 * @overloads {Binding#onBindingAttach}
 */
PermissionEditorGridBinding.prototype.onBindingAttach = function () {

	PermissionEditorGridBinding.superclass.onBindingAttach.call ( this );
 	this.addActionListener ( CheckBoxBinding.ACTION_COMMAND );
}

/**
 * Populate grid.
 * @param {List<object>} inheritedList
 * @param {List<object>} definedList
 */
PermissionEditorGridBinding.prototype.populate = function ( inheritedList, definedList ) {
	
	var isFirst	= true;
	var tbody = this.getChildElementByLocalName ( "tbody" );
	var self = this;
	
	/*
	 * Terminate existing population.
	 */
	while ( tbody.hasChildNodes ()) {
		tbody.removeChild ( tbody.lastChild );
	}
	
	/*
	 * Scanning defined permissions. 
	 */
	definedList.each ( function ( object ) {
		self._defined [ object.UserName ] = object.PermissionTypes;
	});
	
	/*
	 * Scanning inherited permissions.
	 */
	inheritedList.each ( function ( object ) {
		self._inherited [ object.UserName ] = object.PermissionTypes;
	});
	
	/*
	 * Build main table.
	 */
	inheritedList.each ( function ( object ) {
		var row = self._getRow ( object.UserName, object.PermissionTypes );
		if ( isFirst ) {
			CSSUtil.attachClassName ( row, "first" );
			isFirst = false;
		}
		tbody.appendChild ( row );
	});
	
}

/**
 * Get row, freshly populated by name and permissions.
 * @param {string} name
 * @param {array} perms
 */
PermissionEditorGridBinding.prototype._getRow = function ( name, perms ) {

	var self = this;
	
	if ( !this._row ) {
		this._row = this._getBaseRow ();
	}
	var row = this._row.cloneNode ( true );
	var cells = new List ( DOMUtil.getElementsByTagName ( row, "td" ));
	
	if ( name ) {
		
		// checkbox
		var checkbox = CheckBoxBinding.newInstance ( document );
		cells.get ( 0 ).appendChild ( checkbox.bindingElement );
		checkbox.associatedRow = row;
		checkbox.associatedName = name;
		checkbox.associatedCells = new List ();
		checkbox.attach ();
		
		// name
		cells.get ( 1 ).appendChild ( this._getElement ( "span", "name", name ));
		
		// defined permissions
		var definedPerms = this._defined [ name ];
		if ( definedPerms ) {
			new List ( definedPerms ).each ( function ( perm ) {
				var index = self.getHeadBinding ().getIndexForPermission ( perm );
				self._check ( cells.get ( index ));
			});
			CSSUtil.attachClassName ( row, PermissionEditorGridBinding.CLASSNAME_DEFINED );
			checkbox.check ( true );
		}
		
		// inherited permissions
		else {
			var inheritedPerms = this._inherited [ name ];
			if ( inheritedPerms ) {
				this._setInheritedPermissions ( row );
			}
		}
		
		// activate permission cells
		var i = 1;
		while ( i++ <= this.getHeadBinding ().getPermissionTypeCount ()) {
			var cell = cells.get ( i );
			DOMEvents.addEventListener ( cell, DOMEvents.MOUSEDOWN, this );
			checkbox.associatedCells.add ( cell );
		}
	}
	return row;
}

/**
 * Set inherited permissions for a row.
 * @param {HTMLTableRowElement} row
 */
PermissionEditorGridBinding.prototype._setInheritedPermissions = function ( row ) {

	var cells = new List ( DOMUtil.getElementsByTagName ( row, "td" ));
	var inheritedPerms = this._inherited [ this._getNameForRow ( row )];
	var self = this;
	
	CSSUtil.detachClassName ( row, PermissionEditorGridBinding.CLASSNAME_DEFINED );
	
	var i = 0;
	cells.each ( function ( cell ) {
		if ( i++ > 1 ) {
			self._uncheck ( cell );
		}
	});
	
	new List ( inheritedPerms ).each ( function ( perm ) {
		var index = self.getHeadBinding ().getIndexForPermission ( perm );
		cells.get ( index ).appendChild ( self._getElement ( "span", "x" ));
	});
}

/**
 * Get name for row.
 * @param {HTMLTableRowElement} row
 * @return {string}
 */
PermissionEditorGridBinding.prototype._getNameForRow = function ( row ) {
	
	var result = null;
	var span = DOMUtil.getElementsByTagName ( row, "span" ).item ( 0 );
	if ( span ) {
	 	result = DOMUtil.getTextContent ( span );
	}
	return result;
}

/**
 * Check permission.
 * @param {HTMLTableCellElement} cell
 * @param {boolean} isUpdate This switch is not needed during startup
 */
PermissionEditorGridBinding.prototype._check = function ( cell, isUpdate ) {
	
	cell.appendChild ( this._getElement ( "span", "x" ));
	if ( isUpdate ) {
		this._define ( cell );
	}
}

/**
 * Uncheck permission.
 * @param {HTMLTableCellElement} cell
 */
PermissionEditorGridBinding.prototype._uncheck = function ( cell, isUpdate ) {

	cell.innerHTML = ""; // removeChild causes a spastic loop in Explorer...
	if ( isUpdate ) {
		this._define ( cell );
	}
}

/**
 * Permission checked?
 * @param {HTMLTableCellElement} cell
 */
PermissionEditorGridBinding.prototype._isChecked = function ( cell ) {
	
	return DOMUtil.getElementsByTagName ( cell, "span" ).item ( 0 ) != null;
}

/**
 * Checking the checkbox assocaiated to a given cell (row).
 * @param {HTMLTableCellElement} cell
 */
PermissionEditorGridBinding.prototype._define = function ( cell ) {
	
	/*
	 * Oldshcool.
	 */
	var row = cell.parentNode;
	var first = row.cells [ 0 ];
	var element = DOMUtil.getElementsByTagName ( first, "checkbox" ).item ( 0 );
	var binding = UserInterface.getBinding ( element );
	binding.check ();
}


/**
 * Create an clonable default row.
 * @param {boolean} isDecorational
 * @return {HTMLTableRowElement}
 */
PermissionEditorGridBinding.prototype._getBaseRow = function () {
	
	var cell, row = this._getElement ( "tr" );
	cell = row.appendChild ( this._getElement ( "td", "edit" ));
	cell = row.appendChild ( this._getElement ( "td", "index" ));
	
	var i = 0, max = this.getHeadBinding ().getPermissionTypeCount ();
	while ( i < max ) {
		cell = row.appendChild ( this._getElement ( "td" ));
		if ( ++i == max ) {
			cell.className = "last";
		}
	}
	return row;
}

/**
 * Simple element builder.
 * @param {string} name
 * @param {string} className
 * @return {HTMLElement}
 */
PermissionEditorGridBinding.prototype._getElement = function ( name, className, text ) {

	var element = DOMUtil.createElementNS ( Constants.NS_XHTML, name, document );
	if ( className ) {
		CSSUtil.attachClassName ( element, className );
	}
	if ( text ) {
		element.appendChild ( document.createTextNode ( text ));
	}
	return element;
}

/**
 * @implements {IEventHandler}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
PermissionEditorGridBinding.prototype.handleEvent = function ( e ) {
	
	PermissionEditorGridBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
			var cell = e.currentTarget ? e.currentTarget : DOMEvents.getTarget ( e );
			if ( DOMUtil.getLocalName ( cell ) == "span" ) { // elegant...
				cell = cell.parentNode;
			}
			if ( this._isChecked ( cell )) {
				this._uncheck ( cell, true );
			} else {
				this._check ( cell, true );
			}
			this.dispatchAction ( Binding.ACTION_DIRTY );
			break;
	}
}

/**
 * @implements {IActionHandler}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
PermissionEditorGridBinding.prototype.handleAction = function ( action ) {
	
	PermissionEditorGridBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case CheckBoxBinding.ACTION_COMMAND :
			var checkbox = action.target;
			var row = checkbox.associatedRow;
			if ( checkbox.isChecked ) {
				CSSUtil.attachClassName ( row, PermissionEditorGridBinding.CLASSNAME_DEFINED );
			} else {
				this._setInheritedPermissions ( row );
			}
			this.dispatchAction ( Binding.ACTION_DIRTY );
			break;
	}
}

/**
 * Get that result.
 * @param {boolean} isPreview
 * @return {array}
 */
PermissionEditorGridBinding.prototype.getResult = function ( isPreview ) {
	
	var checkboxes = this.getDescendantBindingsByLocalName ( "checkbox" );
	var result = [];
	
	var self = this;
	checkboxes.each ( function ( checkbox ) {
		if ( isPreview || checkbox.isChecked ) {
			var types = [];
			checkbox.associatedCells.each ( function ( cell ) {
				if ( self._isChecked ( cell )) {
					types.push ( self.getHeadBinding ().getPermissionForIndex ( cell.cellIndex ));
				}
			});
			result.push ({
				UserName : checkbox.associatedName,
				PermissionTypes : types
			});
		}
	});
	
	return result;
}

/**
 * Get preview result. THIS IS NO LONGER USED!
 * @deprecated
 * @return {array}
 */
PermissionEditorGridBinding.prototype.getPreviewResult = function () {
	
	return this.getResult ( true );
}

/**
 * Get table head binding.
 * @return {PermissionEditorHeadBinding}
 */
PermissionEditorGridBinding.prototype.getHeadBinding = function () {
	
	return this.bindingWindow.bindingMap [ "head" + this._index ];
}