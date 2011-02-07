VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype = new VisualEditorInsertToolBarButtonBinding;
VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype.constructor = VisualEditorInsertPlusFieldsToolBarButtonBinding;
VisualEditorInsertPlusFieldsToolBarButtonBinding.superclass = VisualEditorInsertToolBarButtonBinding.prototype;

/**
 * @class
 */
function VisualEditorInsertPlusFieldsToolBarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorInsertPlusFieldsToolBarButtonBinding" );
	
	/**
	 * @type {boolean}
	 */
	this._isFieldsConfigured = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype.toString = function () {

	return "[VisualEditorInsertPlusFieldsToolBarButtonBinding]";
}

/**
 * @overloads {VisualEditorInsertToolBarButtonBinding#onBindingAttach}
 */
VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype.onBindingAttach = function () {
	
	VisualEditorInsertPlusFieldsToolBarButtonBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
}

/**
 * Configure fields insertion.
 */
VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype._configureFields = function ( config ) {
	
	this.popupBinding._indexMenuContent ();
	var item = this.popupBinding.getMenuItemForCommand ( "compositeInsertFieldParent" );
	var doc = this.bindingDocument;
	
	if ( item ) {
		item.dispose ();
	}
	
	item = MenuItemBinding.newInstance ( doc );
	item.setLabel( "${string:Composite.Web.VisualEditor:ContextMenu.LabelField}" );
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
 * @overloads {VisualEditorInsertToolBarButtonBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
VisualEditorInsertPlusFieldsToolBarButtonBinding.prototype.handleAction = function ( action ) {
	
	VisualEditorInsertPlusFieldsToolBarButtonBinding.superclass.handleAction.call ( this, action );
	
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
	}
}