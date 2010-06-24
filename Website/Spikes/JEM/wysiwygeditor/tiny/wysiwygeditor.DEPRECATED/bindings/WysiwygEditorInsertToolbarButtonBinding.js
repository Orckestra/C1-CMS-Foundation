WysiwygEditorInsertToolbarButtonBinding.prototype = new EditorToolBarButtonBinding;
WysiwygEditorInsertToolbarButtonBinding.prototype.constructor = WysiwygEditorInsertToolbarButtonBinding;
WysiwygEditorInsertToolbarButtonBinding.superclass = EditorToolBarButtonBinding.prototype;

/**
 * @class
 */
function WysiwygEditorInsertToolbarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorInsertToolbarButtonBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorInsertToolbarButtonBinding.prototype.toString = function () {
	
	return "[WysiwygEditorInsertToolbarButtonBinding]";
}

/**
 * @overloads {ButtonBinding#onBindingAttach}
 */
WysiwygEditorInsertToolbarButtonBinding.prototype.onBindingAttach = function () {
	
	WysiwygEditorInsertToolbarButtonBinding.superclass.onBindingAttach.call ( this );
	this.popupBinding.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
}

/**
 * Configure fields insertion.
 */
WysiwygEditorInsertToolbarButtonBinding.prototype._configureFields = function ( config ) {
	
	this.popupBinding._indexMenuContent ();
	var item = this.popupBinding.getMenuItemForCommand ( "compositeInsertFieldParent" );
	var doc = this.bindingDocument;
	
	if ( item ) {
		item.dispose ();
	}
	
	item = MenuItemBinding.newInstance ( doc );
	item.setLabel ( "Field" );
	item.image = "${icon:fields}";
	item.imageDisabled = "${icon:fields-disabled}";
	item.setProperty ( "cmd", "compositeInsertFieldParent" );
			
	var groupnames = config.getGroupNames ();
	if ( groupnames.hasEntries ()) {
	
		var popup 	= MenuPopupBinding.newInstance ( doc );
		var body 	= popup.add ( MenuBodyBinding.newInstance ( doc ));
		var group 	= body.add ( MenuGroupBinding.newInstance ( doc ));
		
		groupnames.each ( function ( groupname ) {
			var fields = config.getFieldNames ( groupname );
			fields.each ( function ( fieldname ) {
				var i = group.add ( MenuItemBinding.newInstance ( doc ));
				i.setLabel ( fieldname );
				i.setImage ( "${icon:field}" );
				i.setProperty ( "cmd", "compositeInsertField" );
				i.setProperty ( "val", groupname + ":" + fieldname );
				group.add ( i );
			});
		});
		item.add ( popup );
	}
	
	this.popupBinding._menuGroups [ "insertions" ].getFirst ().add ( item );
	item.attachRecursive ();
	this.popupBinding._menuItems [ "compositeInsertFieldParent" ] = item;
}

/**
 * @implements {IActionListener}
 * @param {Action} action
 */
WysiwygEditorInsertToolbarButtonBinding.prototype.handleAction = function ( action ) {
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case ButtonBinding.ACTION_COMMAND :
			if ( !this._isFieldsConfigured ) {
				if ( binding == this ) {
					var config = this._editorBinding.embedableFieldConfiguration;
					if ( config ) {
						this._configureFields ( config );
					}
				}
				this._isFieldsConfigured = true;
			}
			break;
			
		case MenuItemBinding.ACTION_COMMAND :
		
			var cmd = binding.getProperty ( "cmd" );
			var gui = binding.getProperty ( "gui" );
			var val = binding.getProperty ( "val" );
			
			if ( this._editorBinding.hasBookmark ()) {
				this._editorBinding.restoreBookmark ();
			}
			
			this._editorBinding.handleCommand ( cmd, gui ? gui : false, val );
			
			/*
			 * Temp!!!!!!!!!!!!!!!!!!!!!!!
			 */
			var handler = this._editorBinding.getEditorWindow ().standardEventHandler;
			setTimeout ( function () {
				handler.enableNativeKeys ( true );
			}, 100 );
			break;
	}
}