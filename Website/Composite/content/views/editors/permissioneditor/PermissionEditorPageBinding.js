PermissionEditorPageBinding.prototype = new EditorPageBinding;
PermissionEditorPageBinding.prototype.constructor = PermissionEditorPageBinding;
PermissionEditorPageBinding.superclass = EditorPageBinding.prototype;

/**
 * @class
 */
function PermissionEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PermissionEditorPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._entityToken = null;
	
	/**
	 * First tab inflated? This is the groups tab.
	 * @type {boolean}
	 */
	this._tab0 = false;
	
	/**
	 * Second tab inflated? This is the users tab.
	 * @type {boolean}
	 */
	this._tab1 = false;
	
	/**
	 * Inflate this tab when page initializes.
	 * @type {int}
	 */
	this._inflateOnInitialize = null;
	
	/**
	 * Handle of the view that contains us.
	 * @type {string}
	 */
	this._viewhandle = null;
	
	/**
	 * True when usergroup permissions was changed.
	 */
	this.wasGroupsUpdated = false;
}
/**
 * Identifies binding.
 */
PermissionEditorPageBinding.prototype.toString = function () {
	
	return "[PermissionEditorPageBinding]";
}

/**
 * @param {object} arg
 * @overloads {PageBinding#setPageArgument}
 */
PermissionEditorPageBinding.prototype.setPageArgument = function ( arg ) {

	PermissionEditorPageBinding.superclass.setPageArgument.call ( this );
	this._entityToken = arg.serializedEntityToken;
	//this._entityToken = arg.getFirst ().value;
}

/**
 * @overwrites {PageBinding#onBindingAttach}
 */
PermissionEditorPageBinding.prototype.onBindingAttach = function () {
	
	PermissionEditorPageBinding.superclass.onBindingAttach.call ( this );
	
	/*
	 * Extract the view handle. SecurityService needs to know.
	 */
	var view = this.getAncestorBindingByLocalName ( "view", true );
	var def = view.getDefinition ();
	this._viewhandle = def.handle;
	
	/*
	 * Listen for tab selection.
	 */
	this.addActionListener ( TabBoxBinding.ACTION_SELECTED );
}

/**
 * @implements {IActionListener}
 * @overloads {EditorPageBinding#handleAction}
 * @param {Action} action
 */
PermissionEditorPageBinding.prototype.handleAction = function ( action ) {
	
	PermissionEditorPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	switch ( action.type ) {
		case TabBoxBinding.ACTION_SELECTED :
			var id = binding.getSelectedTabBinding ().getID ();
			if ( !this [ "_" + id ] == true ) {
				this [ "_" + id ] = true;
				this._inflate ( id );
			}
			switch ( id ) {
				case "tab0" :
					this._display ( 0, true );
					this._display ( 1, false );
					break;
				case "tab1" :
					this._display ( 1, true );
					this._display ( 0, false );
					break;
			}
			break;
		case Binding.ACTION_DIRTY :
			if ( binding.getID () == "grid0" ) {
				this._tab1 = false;
				this._wasGroupsUpdated = true;
			}
			break;
	}
}

/**
 * Inflate.
 * @param {string} id
 */
PermissionEditorPageBinding.prototype._inflate = function ( id ) {
	
	var map = this.bindingWindow.bindingMap;
	var perms = null;
	
	if ( this._isPageBindingInitialized ) {
		
		switch ( id ) {
			case "tab0" :
				perms = SecurityService.GetGroupPermissions ( this._entityToken );
				map.grid0.populate ( 
					new List ( perms.InheritedUserPermissions ),
					new List ( perms.EntityUserPermissions )
				);
				break;
			case "tab1" :
				if ( this._wasGroupsUpdated ) {
					perms = SecurityService.PreviewGetPermissions ( 
						this._entityToken, 
						map.grid1.getResult (),
						map.grid0.getResult ()
					);
					this._wasGroupsUpdated = false;
				} else {
					perms = SecurityService.GetPermissions ( this._entityToken );
				}
				map.grid1.populate ( 
					new List ( perms.InheritedUserPermissions ),
					new List ( perms.EntityUserPermissions )
				);
				break;
		}
		
	} else {
		
		this._inflateOnInitialize = id;
	}
}

/**
 * @overloads {PageBinding#onPageInitialize}
 */
PermissionEditorPageBinding.prototype.onPageInitialize = function () {
	
	/*
	 * Set headings.
	 */
	var types = SecurityService.GetPermissionTypes ( "dummy" );
	
	this.bindingWindow.bindingMap.head0.setHeadings ( new List ( types ));
	this.bindingWindow.bindingMap.head1.setHeadings ( new List ( types ));
	
	PermissionEditorPageBinding.superclass.onPageInitialize.call ( this );
	
	if ( this._inflateOnInitialize != null ) {
		this._inflate ( this._inflateOnInitialize );
	}
}

/**
 * Show main section only after page initializes. This 
 * prevents strange visual initialization in Explorer. 
 * Also, it renders faster while undisplayed.
 * @overloads {EditorPageBinding#onAfterPageInitialize}
 */
PermissionEditorPageBinding.prototype._display = function ( index, isDisplay ) {
	
	PermissionEditorPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	var display = isDisplay ? ( Client.isExplorer ? "block" : "table" ) : "none";
	
	document.getElementById ( "head" + index ).style.display = display;
	document.getElementById ( "grid" + index ).style.display = display;
}

/**
 * Backup edits.
 * @overwrites {EditorPageBinding#_saveEditorPage}
 */
PermissionEditorPageBinding.prototype._saveEditorPage = function () {

	var map = this.bindingWindow.bindingMap;
	
	var error = SecurityService.SetAllPermissions ( 
			this._entityToken, 
			map.grid1.getResult (), 
			map.grid0.getResult (),
			this._viewhandle,
			Application.CONSOLE_ID
	);
	
	if ( error != null ) {
		Dialog.error ( "Error!", error );
	}
	
	/*
	map.broadcasterCanSave.disable ();
	this.isDirty = false;
	this.dispatchAction ( EditorPageBinding.ACTION_CLEAN );
	*/
	
	/*
	 * TODO!
	 */
	setTimeout ( function () {
		MessageQueue.update ();
	}, 50 );
}