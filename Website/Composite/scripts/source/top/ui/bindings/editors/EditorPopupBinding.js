EditorPopupBinding.prototype = new PopupBinding;
EditorPopupBinding.prototype.constructor = EditorPopupBinding;
EditorPopupBinding.superclass = PopupBinding.prototype;

/*
 * Subclass defines this.
 */
EditorPopupBinding.CONTENT_TEMPLATE = null;

/**
 * @class
 */
function EditorPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorPopupBinding" );

	/**
	 * @type {boolean}
	 */
	this._isEditorPopupBindingInitialized = false;
	
	/** 
	 * This is set by the EditorBinding. Remember that   
	 * all editor instances use the same popup.
	 * @see {EditorBinding#handleEvent}
	 * @type {EditorBinding}
	 */
	this.editorBinding = null;
}

/**
 * Identifies binding.
 */
EditorPopupBinding.prototype.toString = function () {

	return "[EditorPopupBinding]";
}

/**
 * To reduce startup time, menu generation is delayed until first show.
 * @overloads {PopupBinding#show}
 */
EditorPopupBinding.prototype.show = function () {
	
	if ( !this._isEditorPopupBindingInitialized ) {
		var self = this;
		Application.lock ( this );
		setTimeout ( function () { // timeout allows mastercover to appear
			self._initialize ();
			Application.unlock ( self );
		}, 0 );
	} else {
		EditorPopupBinding.superclass.show.call ( this );
	}
}

/**
 * Initialize menu content.
 * {@see EditorBinding#handleEvent}
 */
EditorPopupBinding.prototype._initialize = function () {
	
	if ( !this._isEditorPopupBindingInitialized ) {
		this.subTreeFromString ( 
			Templates.getTemplateElementText ( 
				this.constructor.CONTENT_TEMPLATE 
			)
		);
		this._bodyBinding = this.getChildBindingByLocalName ( "menubody" );
		this.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
		this._indexMenuContent ();
		this._isEditorPopupBindingInitialized = true;
		this._onInitialize ();
	}
}

/**
 * Show popup when initialized. Move to separate method 
 * so that subclasses may overload at this point.
 */
EditorPopupBinding.prototype._onInitialize = function () {
	
	this._configure ();
	this.show ();
}

/**
 * Configure.
 */
EditorPopupBinding.prototype.configure = function () {
	
	if ( this._isEditorPopupBindingInitialized ) {
		this._configure ();
	}
}

/**
 * Subclass must overwrite this.
 */
EditorPopupBinding.prototype._configure = Binding.ABSTRACT_METHOD;

/**
 * Hide menugroups.
 * @param {string} rel
 */
EditorPopupBinding.prototype._showMenuGroups = function ( rel ) {
	var menuGroup = this._menuGroups[rel];
	if(menuGroup instanceof List)
	{
		menuGroup.each(function (group) {
			group.show ();
		});
	}
}

/**
 * Show menugroups.
 * @param {string} rel
 */
EditorPopupBinding.prototype._hideMenuGroups = function (rel) {
	var menuGroup = this._menuGroups[rel];
	if (menuGroup instanceof List) {
		menuGroup.each(function (group) {
			group.hide();
		});
	}
}


/**
 * Subclass may overload this.
 * @overloads {PopupBinding#handleAction}
 * @param {Action} action
 * @return {boolean}
 */
EditorPopupBinding.prototype.handleAction = function ( action ) {

	EditorPopupBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	if ( action.type == MenuItemBinding.ACTION_COMMAND ) {
		
		this.hide (); // this should happen automatically, but ie doesn't get it
		
		var cmd = binding.getProperty ( "cmd" );
		var gui = binding.getProperty ( "gui" );
		var val = binding.getProperty ( "val" );
		
		this.handleCommand ( cmd, gui, val );
	}
}

/**
 * Handle that command.
 * @param {string} cmd
 * @param [string} gui
 * @param {string} val
 */
EditorPopupBinding.prototype.handleCommand = Binding.ABSTRACT_METHOD;