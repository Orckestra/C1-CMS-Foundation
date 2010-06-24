WysiwygEditorPopupBinding.prototype = new EditorPopupBinding;
WysiwygEditorPopupBinding.prototype.constructor = WysiwygEditorPopupBinding;
WysiwygEditorPopupBinding.superclass = EditorPopupBinding.prototype;

WysiwygEditorPopupBinding.CONTENT_TEMPLATE = "wysiwygeditor/popup.xml";

/**
 * @class
 */
function WysiwygEditorPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorPopupBinding" );

	/**
	 * @type {DOMElement} 
	 */
	this.tinyElement = null;

	/**
	 * The TinyMCE engine.
	 * @type {TinyMCE_Engine} 
	 */
	this.tinyEngine = null;
	
	/** 
	 * A TinyMCE instance.
	 * @type {TinyMCE_Control}
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
	
	/**
	 * @type {boolean}
	 */
	this._isMediaSelected = false;
}

/**
 * Identifies binding.
 */
WysiwygEditorPopupBinding.prototype.toString = function () {

	return "[WysiwygEditorPopupBinding]";
}

/**
 * Configures the menu. See also method _configure.
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_Engine} engine 
 * @param {HTMLElement} element
 */
WysiwygEditorPopupBinding.prototype.configure = function ( instance, engine, element ) {
	
	var hasSelection = this.editorBinding.hasSelection ();
	
	this.tinyInstance	= instance;
	this.tinyEngine 	= engine;
	this.tinyElement	= element;
	this.hasSelection 	= hasSelection;
	
	WysiwygEditorPopupBinding.superclass.configure.call ( this );
}

/**
 * Handle that command.
 * @param {string} cmd
 * @param [string} gui
 * @param {string} val
 */
WysiwygEditorPopupBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	this.editorBinding.blurEditor ();
	this.editorBinding.handleCommand ( cmd, gui ? gui : false, val );
}

/**
 * Configure in separate method so that we may 
 * delay invokation until menu is initialized. 
 * Purpose of delay is to show the busy cursor.
 */
WysiwygEditorPopupBinding.prototype._configure = function () {

	if ( this._isInitialized ) {
		this._configureLinkGroup ();
		this._configureInsertGroup ();
		this._configureTableGroup ();
		this._configureMediaGroup ();
		this._configureRenderingGroup ();
		this._configureFieldGroup ();
		this._configureImageGroup ();
	}
}

/**
 * Configure when initialized.
 * @overloads {EditorPopupBinding#onInitialize}
 *
WysiwygEditorPopupBinding.prototype._onInitialize = function () {
	
	this._configure ();
	WysiwygEditorPopupBinding.superclass._onInitialize.call ( this );
}
*/

/**
 * Configures and displays the linkgroup.
 */
WysiwygEditorPopupBinding.prototype._configureLinkGroup = function () {

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
WysiwygEditorPopupBinding.prototype._configureLinkGroupDetails = function () {
	
	var linkitem = this.getMenuItemForCommand ( "compositeInsertLink" );
	var unlinkitem = this.getMenuItemForCommand ( "unlink" );
	var linkbutton = this.editorBinding.getButtonForCommand ( "compositeInsertLink" );
	var unlinkbutton = this.editorBinding.getButtonForCommand ( "unlink" );
	
	unlinkitem.setDisabled ( unlinkbutton.isDisabled );
		
	if ( unlinkitem.isDisabled ) {
		linkitem.setLabel ( "Link" );
	} else {
		linkitem.setLabel ( "Link properties" );
	}
}

/**
 * Configure insert group. This is mostly 
 * a question of handling the fields menu.
 * TODO: Don't rebuild this on each show!
 */
WysiwygEditorPopupBinding.prototype._configureInsertGroup = function () {
	
	var config = this.editorBinding.embedableFieldConfiguration;
	var item = this.getMenuItemForCommand ( "compositeInsertFieldParent" );
	var doc = this.bindingDocument;
	
	if ( item ) {
		item.dispose ();
	}
	
	item = MenuItemBinding.newInstance ( doc );
	item.setLabel ( "Field" );
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
WysiwygEditorPopupBinding.prototype._configureTableGroup = function () {

	var element = this.tinyEngine.getParentElement ( this.tinyElement, "table,td" );
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
WysiwygEditorPopupBinding.prototype._configureRenderingGroup = function () {
	
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
WysiwygEditorPopupBinding.prototype._configureFieldGroup = function () {

	var isField = this._isField ();
	if ( isField ) {
		this._showMenuGroups ( "field" );
	} else {
		this._hideMenuGroups ( "field" );
	}
	this._isFieldSelected = isField;
}

/**
 * Configures and displays the media group.
 */
WysiwygEditorPopupBinding.prototype._configureMediaGroup = function () {
	
 	var isMedia = this._isMedia ();
	if ( isMedia ) {
		this._showMenuGroups ( "media" );
	} else {
		this._hideMenuGroups ( "media" );
	}
	this._isMediaSelected = isMedia;
}

/**
 * Configures and displays the tablegroup. This should
 * be done *after* rendering and media configuration.
 */
WysiwygEditorPopupBinding.prototype._configureImageGroup = function () {

	if ( this._isImage () && 
		!this._isRenderingSelected && 
		!this._isFieldSelected &&
		!this._isMediaSelected ) {
		this._showMenuGroups ( "image" );
	} else {
		this._hideMenuGroups ( "image" );
	}
}

/**
 * Is image? Will return FALSE if editor has selection!
 * This will in turn affect _isRendering and _isField and _isMedia!
 * @return {boolean}
 */
WysiwygEditorPopupBinding.prototype._isImage = function () {
	
	var result = false;
	if ( !this.hasSelection ) {
		result = this.tinyElement && this.tinyElement.nodeName == "IMG";
	}
	return result
}

/**
 * Is rendering?
 * @return {boolean}
 */
WysiwygEditorPopupBinding.prototype._isRendering = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this.tinyElement, 
			WysiwygEditorBinding.RENDERING_CLASSNAME 
		);
}

/**
 * Is field?
 * @return {boolean}
 */
WysiwygEditorPopupBinding.prototype._isField = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this.tinyElement, 
			WysiwygEditorBinding.FIELD_CLASSNAME 
		);
}

/**
 * Is media?
 * @return {boolean}
 */
WysiwygEditorPopupBinding.prototype._isMedia = function () {

	return this._isImage () && 
		(
			CSSUtil.hasClassName ( this.tinyElement, WysiwygEditorBinding.CLASSNAME_MEDIA ) ||
			CSSUtil.hasClassName ( this.tinyElement, WysiwygEditorBinding.CLASSNAME_FLASH ) ||
			CSSUtil.hasClassName ( this.tinyElement, WysiwygEditorBinding.CLASSNAME_QUICKTIME ) ||
			CSSUtil.hasClassName ( this.tinyElement, WysiwygEditorBinding.CLASSNAME_SHOCKWAVE ) ||
			CSSUtil.hasClassName ( this.tinyElement, WysiwygEditorBinding.CLASSNAME_WINMEDIA )
		);
}