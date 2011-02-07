VisualEditorPopupBinding.prototype = new EditorPopupBinding;
VisualEditorPopupBinding.prototype.constructor = VisualEditorPopupBinding;
VisualEditorPopupBinding.superclass = EditorPopupBinding.prototype;

VisualEditorPopupBinding.CONTENT_TEMPLATE = "wysiwygeditor/popup.xml";

/**
 * @class
 */
function VisualEditorPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorPopupBinding" );

	/**
	 * @type {HTMLElement} 
	 */
	this.tinyElement = null;

	/**
	 * The TinyMCE engine.
	 * @type {tinymce.EngineManager} 
	 */
	this.tinyEngine = null;
	
	/** 
	 * A TinyMCE instance.
	 * @type {tinymce.Engine}
	 */
	this.tinyInstance = null;

	/**
	 * Flags whether or not a selection was made in the editor.
	 * @type {boolean}
	 */
	this.hasSelection = false;
	
	/**
	 * @type {boolean}
	 */
	this._isRenderingSelected = false;
}

/**
 * Identifies binding.
 */
VisualEditorPopupBinding.prototype.toString = function () {

	return "[VisualEditorPopupBinding]";
}

/**
 * Configures the menu. See also method _configure.
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_Engine} engine 
 * @param {HTMLElement} element
 */
VisualEditorPopupBinding.prototype.configure = function ( instance, engine, element ) {
	
	var hasSelection = this.editorBinding.hasSelection ();
	
	this.tinyInstance	= instance;
	this.tinyEngine 	= engine;
	this.tinyElement	= element;
	this.hasSelection 	= hasSelection;
	
	VisualEditorPopupBinding.superclass.configure.call ( this );
}

/**
 * Handle that command.
 * @param {string} cmd
 * @param [string} gui
 * @param {string} val
 */
VisualEditorPopupBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	this.editorBinding.blurEditor ();
	this.editorBinding.handleCommand ( cmd, gui ? gui : false, val );
}

/**
 * Configure in separate method so that we may 
 * delay invokation until menu is initialized. 
 * Purpose of delay is to show the busy cursor.
 */
VisualEditorPopupBinding.prototype._configure = function () {

	if ( this._isEditorPopupBindingInitialized ) {
		this._configureLinkGroup ();
		this._configureInsertGroup ();
		this._configureTableGroup ();
		this._configureRenderingGroup ();
		this._configureFieldGroup ();
		this._configureImageGroup ();
	}
}

/**
 * Configures and displays the linkgroup.
 */
VisualEditorPopupBinding.prototype._configureLinkGroup = function () {

	var isVisible = false;
	
	if ( this.hasSelection ) {
		isVisible = true;
	} else if ( this.tinyElement ) {
		if ( this.tinyElement.nodeName == "A" && !this.tinyElement.getAttribute ( "name" )) {
			isVisible = true;
		} else if ( this.tinyElement.nodeName == "IMG" ) {
			isVisible = true;
		}
	}
	
	if ( isVisible ) {
		this._showMenuGroups ( "link" );
		this._configureLinkGroupDetails ();
	} else {
		this._hideMenuGroups ( "link" );
	}
}

/**
 * Configure link group details.
 */
VisualEditorPopupBinding.prototype._configureLinkGroupDetails = function () {
	
	var linkitem = this.getMenuItemForCommand ( "compositeInsertLink" );
	var unlinkitem = this.getMenuItemForCommand ( "unlink" );
	var linkbutton = this.editorBinding.getButtonForCommand ( "compositeInsertLink" );
	var unlinkbutton = this.editorBinding.getButtonForCommand ( "unlink" );
	
	unlinkitem.setDisabled ( unlinkbutton.isDisabled );
		
	if ( unlinkitem.isDisabled ) {
	    linkitem.setLabel( "${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}" );
	} else {
    linkitem.setLabel( "${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}" );
	}
}

/**
 * Configure insert group. This is mostly 
 * a question of handling the fields menu.
 * TODO: Don't rebuild this on each show!
 */
VisualEditorPopupBinding.prototype._configureInsertGroup = function () {
	
	var config = this.editorBinding.embedableFieldConfiguration;
	var item = this.getMenuItemForCommand ( "compositeInsertFieldParent" );
	var doc = this.bindingDocument;
	
	if ( item ) {
		item.dispose ();
	}
	
	item = MenuItemBinding.newInstance ( doc );
	item.setLabel( "${string:Composite.Web.VisualEditor:ContextMenu.LabelField}" );
	item.image = "${icon:fields}";
	item.imageDisabled = "${icon:fields-disabled}";
	item.setProperty ( "cmd", "compositeInsertFieldParent" );
	
	if ( config ) {
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
	} else {
		item.disable ();
	}
	
	this._menuGroups [ "insertions" ].getFirst ().add ( item );
	item.attachRecursive ();
	this._menuItems [ "compositeInsertFieldParent" ] = item;
}

/**
 * Configures and displays the tablegroup.
 */
VisualEditorPopupBinding.prototype._configureTableGroup = function () {

	var element = this.tinyInstance.dom.getParent ( this.tinyElement, "table,td" );
	var colspan = null;
	var rowspan = null;
	
	if ( element ) {
		if ( element.nodeName == "TD" ) {
			colspan = element.getAttribute ( "colspan" );
			rowspan = element.getAttribute ( "rowspan" )
		}
		this._menuItems [ "mceTableSplitCells" ].setDisabled ( colspan == "1" && rowspan == "1" );
		this._menuItems [ "mceTablePasteRowBefore" ].setDisabled ( this.tinyInstance.tableRowClipboard == null );
		this._menuItems [ "mceTablePasteRowAfter" ].setDisabled ( this.tinyInstance.tableRowClipboard == null );
	}
	if ( element ) {
		this._showMenuGroups ( "table" );
	} else {
		this._hideMenuGroups ( "table" );
	}
}

/**
 * Configures and displays the rendering group.
 */
VisualEditorPopupBinding.prototype._configureRenderingGroup = function () {
	
 	var isRendering = this._isRendering ();
	if ( isRendering ) {
		this._showMenuGroups ( "rendering" );
	} else {
		this._hideMenuGroups ( "rendering" );
	}
	this._isRenderingSelected = isRendering;
}

/**
 * Configures and displays the field group.
 */
VisualEditorPopupBinding.prototype._configureFieldGroup = function () {

	var isField = this._isField ();
	if ( isField ) {
		this._showMenuGroups ( "field" );
	} else {
		this._hideMenuGroups ( "field" );
	}
	this._isFieldSelected = isField;
}

/**
 * Configures and displays the tablegroup. This should
 * be done *after* rendering configuration.
 */
VisualEditorPopupBinding.prototype._configureImageGroup = function () {

	if ( this._isImage () && 
		!this._isRenderingSelected && 
		!this._isFieldSelected ) {
		this._showMenuGroups ( "image" );
	} else {
		this._hideMenuGroups ( "image" );
	}
}

/**
 * Is image? Will return FALSE if editor has selection!
 * This will in turn affect _isRendering and _isField
 * @return {boolean}
 */
VisualEditorPopupBinding.prototype._isImage = function () {
	
	var result = false;
	if ( !this.hasSelection ) {
		result = this.tinyElement && this.tinyElement.nodeName == "IMG";
	}
	return result;
}

/**
 * Is rendering?
 * @return {boolean}
 */
VisualEditorPopupBinding.prototype._isRendering = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this.tinyElement, 
			VisualEditorBinding.FUNCTION_CLASSNAME 
		);
}

/**
 * Is field?
 * @return {boolean}
 */
VisualEditorPopupBinding.prototype._isField = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this.tinyElement, 
			VisualEditorBinding.FIELD_CLASSNAME 
		);
}