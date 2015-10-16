/*
 * This fellow is a superclass for editors based on the contentEditable interface. 
 * This should give us a unified way of accessing the editable document, and 
 * to setup contextmenus and stuff for the editor. @see {BespinEditorBinding}
 */

EditorBinding.prototype = new WindowBinding;
EditorBinding.prototype.constructor = EditorBinding;
EditorBinding.superclass = WindowBinding.prototype;

/**
 * True while an EditorBinding instance has focus.
 * @see {EditorBinding._activateEditor}
 * @type {boolean}
 */
EditorBinding.isActive = false;

/**
 * Subclasses should define these.
 */
EditorBinding.ACTION_ATTACHED = null;

/**
 * Clipboard security configuration dialog URL.
 */
EditorBinding.URL_DIALOG_MOZ_CONFIGURE = "${root}/content/dialogs/wysiwygeditor/mozsecuritynote/mozsecuritynote.aspx";

/**
 *
 */
EditorBinding.URL_UPDATERENDERING = "${root}/content/dialogs/functions/editFunctionCall.aspx?type={0}";

/**
 * The number of the beast.
 * @type {int}
 */
EditorBinding.ABSURD_NUMBER = -999999999;

/**
 * Used to preserve line-break entity &#xA; in source code. 
 * @type {String}
 */
EditorBinding.LINE_BREAK_ENTITY_HACK = "C1.LINE.BREAK.ENTITY.HACK";



// EDITITOR COMPONENT STUFF ..............................................
EditorBinding.invokeFunctionEditorDialog = function (markup, handler, type )
{
    type = type?type:'';
    var settings = FunctionService.GetCustomEditorSettingsByMarkup(markup);

    var def = ViewDefinitions["Composite.Management.PostBackDialog"];
    if (!settings) {
        def.width = 500;
        def.height = 520;
    } else {
        var dim = top.WindowManager.getWindowDimensions();
        def.width = settings.Width ? (settings.Width > dim.w ? dim.w : settings.Width) : undefined;
        def.height = settings.Height ? (settings.Height > dim.h ? dim.h : settings.Height) : undefined;
        if (settings.Url)
            settings.Url = settings.Url.indexOf("?") > -1 ? settings.Url + "&consoleId=" + Application.CONSOLE_ID : settings.Url + "?consoleId=" + Application.CONSOLE_ID;
    }

    def.label = "${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
    def.image = "${icon:parameter_overloaded}";
    def.handler = handler;
    def.argument = {
    	url: settings ? settings.Url : EditorBinding.URL_UPDATERENDERING.replace('{0}', type),
        list: new List([{ name: "functionmarkup", value: markup }])
    }
    StageBinding.presentViewDefinition(def);
}



/**
 * Considered private to the EditorBinding.
 * @type {Map<string><List<IWysiwygEditorComponent>>}
 */
EditorBinding._components = new Map ();

/**
 * Considered private to the EditorBinding.
 * @type {Map<string><EditorBinding>}
 */
EditorBinding._editors = new Map ();

/**
 * Editor compontens can register themselves around here  
 * to be initialized when TinyMCE or CodePress is loaded.
 * @param {IWysiwygEditorComponent} binding
 * @param {WindowBinding} windowBinding
 */
EditorBinding.registerComponent = function ( binding, windowBinding ) {
	
	var components = EditorBinding._components;
	var editors = EditorBinding._editors;
	var key = windowBinding.key;
	
	/*
	 * This if-else is ugly - refactor!
	 */
	var isImplemented = Interfaces.isImplemented ( IWysiwygEditorComponent, binding );
	if ( !isImplemented ) {
		isImplemented = Interfaces.isImplemented ( ISourceEditorComponent, binding );
	}
	
	if ( isImplemented ) {
		if ( editors.has ( key )) { // already initialized
			editors.get ( key ).initializeEditorComponent ( binding );
		}  else { // not yet initialized
			if ( !components.has ( key )) {
				components.set ( key, new List ());
			}
			components.get ( key ).add ( binding );
		}
	} else {
		throw "Editor component interface not implemented: " + binding;
	}
}

/**
 * When an editor instance is initialized, it will 
 * fetch associated components and initialize them.
 * @param {EditorBinding} editor
 * @param {WindowBinding} windowBinding
 * @return {List<IWysiwygEditorComponent>}
 */
EditorBinding.claimComponents = function ( editor, windowBinding ) {
	
	var components = EditorBinding._components;
	var editors = EditorBinding._editors;
	var key = windowBinding.key;
	
	// Register editor as initialized.
	editors.set ( key, editor );
	
	// Fetch associated components
	var list = null;
	if ( components.has ( key )) {
		list = components.get ( key ).copy ();
		components.del ( key ); // deleting entries!
	}
	return list;
}


/**
 * @class
 * In order to function elegantly as a DataBinding, we should probably refactor 
 * the inheritance chain. For now, we simply implement the required interface.
 * @implements {@link IData}
 */
function EditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorBinding" );
	
	/**
	 * Subclass must define.
	 * @type {string}
	 */
	this.action_initialized = null;
	
	/** 
	 * Subclass must define.
	 * @type {string}
	 */
	this.url_default = null;
	
	/** 
	 * @type {EditorPopupBinding}
	 */
	this._popupBinding = null;
	
	/**
	 * This is the string value of postbackable textarea.
	 * @type {string}
	 */
	this._startContent = null;
	
	/**
	 * An object with two properties, start and length. Used to cache   
	 * and restore the selection while document is out of focus.
	 * @type {object}
	 */
	this._explorerBookmark = null;
	
	/**
	 * Flipped when editor content changes first time.
	 * @type {boolean}
	 */
	this.isDirty = false;
	
	/**
	 * Flipped when editor launches and closed a dialog.
	 * @type {boolean}
	 */
	this.isDialogMode = false;
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocused = false;
	
	/**
	 * Flipped when editable document is handled.
	 * @type {boolean}
	 */
	this._isActivated = false;
	
	/**
	 * This will hide the "flash of white" in Explorer.
	 * @type {Binding}
	 */
	this._Binding = null;
	
	/**
	 * The URL to load. Defined during initialization 
	 * so that subclasses don't inherit the value.
	 */
	this._url = null;
	
	/**
	 * Dont relay events dispatched by any descendant binding.
	 * @overloads {Binding#isBlockingActions}
	 * @type {boolean}
	 */
	this.isBlockingActions = true;
	
	/**
	 * Flipped when the finalize method invokes.
	 * TODO: Investigate - do we still need this?
	 * @type {boolean}
	 */
	this._isFinalized = false;
	
	/**
	 * The bookmark thingy.
	 * @type {object}
	 */
	this._bookmark = null;
	
	/**
	 * Used to determine when a dirty flag should be raised.
	 * @type {string}
	 */
	this._checksum = null;
	
	/**
	 * Divert focus crawler.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ FocusCrawler.ID, FitnessCrawler.ID ]);
}

/**
 * Identifies binding.
 */
EditorBinding.prototype.toString = function () {

	return "[EditorBinding]";
}

/**
 * @overloads {WindowBinding#onBindingRegister}
 */
EditorBinding.prototype.onBindingRegister = function () {
	
	EditorBinding.superclass.onBindingRegister.call ( this );
	
	/*
	 * Mount the URL.
	 */
	this._url = this.url_default;
	
	/*
	 * Hides the "flash of white" when loading in explorer.
	 */
	this._coverBinding = this.add (
		CoverBinding.newInstance ( this.bindingDocument )
	);

	/*
	* Register as DataBinding so that we 
	* may masquerade as a DataBinding.
	*/
	var name = this.getProperty("name");
	if (name == null || name == "") {
		name = "generated" + KeyMaster.getUniqueKey();
	}
	this._registerWithDataManager(name);
}

/**
 * @overloads {WindowBinding#onBindingAttach}
 */
EditorBinding.prototype.onBindingAttach = function () {
	
	Application.lock ( this ); // unlocked by method _initialize!
	
	// Hello.
	if ( this.hasCallBackID ()) {
		Binding.dotnetify ( this );
	}
	
	this._setup ();
	this.setURL ( this._url );

	/*
	 * Relay dirty events. Remember that this.isBlockingActions!
	 */
	this.addActionListener ( Binding.ACTION_DIRTY );
	EditorBinding.superclass.onBindingAttach.call ( this );
}

/**
 * Find start content 
 */
EditorBinding.prototype._setup = function () {

	/*
	 * Extract content from the textarea, unless 
	 * already specified programatically.
	 */
	var value = this.getProperty ( "value" );
	if ( value != null ) {
		value = decodeURIComponent ( value );
		//value = value.replace ( /\&#xA;/g, EditorBinding.LINE_BREAK_ENTITY_HACK );
		this._startContent = value;
	}
}

/**
 * Unregister when disposed. 
 * TODO: UNREGISTER PAGE EDITOR!
 * @overloads {Binding#onBindingDispose}
 */
EditorBinding.prototype.onBindingDispose = function () {
	
	EditorBinding.superclass.onBindingDispose.call ( this );
	
	var name = this.getProperty ( "name" );
	if ( name != null ) {
		var dataManager = this.bindingWindow.DataManager;
		dataManager.unRegisterDataBinding ( name ); // TODO: PAGEEDITOR???
	}
}

/**
 * Initialize editor.
 */
EditorBinding.prototype._initialize = function () {

	this.subscribe ( BroadcastMessages.STAGEDIALOG_OPENED );
	this.subscribe ( BroadcastMessages.MOUSEEVENT_MOUSEUP );
	
	// if all else failed, at least we have a string
	if ( this._startContent == null ) {
		this._startContent = new String ( "" );
	}
	
	// setup internal events
	this.addEditorEvents ();
	
	// present startcontent - explorer needs a short break here
	var self = this;
	setTimeout ( function () {
		self._finalize ();
	}, 0 );
}

/**
 * Finalize initialization.
 */
EditorBinding.prototype._finalize = function () {
	
	this.resetUndoRedo ();
	this._popupBinding = this.getEditorPopupBinding ();
	Application.unlock ( this );
	this._isFinalized = true;
	this.dispatchAction ( this.action_initialized );
}

/*
 * Initialize components collected during startup.
 * @param {WindowBinding} windowBinding
 */
EditorBinding.prototype.initializeEditorComponents = function ( windowBinding ) {

	var components = EditorBinding.claimComponents ( this, windowBinding );
	if ( components != null ) {
		while ( components.hasNext ()) {
			this.initializeEditorComponent ( 
				components.getNext ()
			);
		}
	}
}


/**
 * We need this to masquerade the editor as a DataBinding!
 * @param {string} name
 */
EditorBinding.prototype._registerWithDataManager = function ( name ) {

	if ( name && name != "" ) {
		var dataManager = this.bindingWindow.DataManager;
		if ( dataManager.getDataBinding ( name )) {
			dataManager.unRegisterDataBinding ( name );
		}
		dataManager.registerDataBinding ( name, this );
	}
}

/*
 * Setup event handling inside the editable document.
 */
EditorBinding.prototype.addEditorEvents = function () {
	
	var editorDocument = this.getEditorDocument ();
	
	if ( editorDocument != null ) {
		Application.framework ( editorDocument );
		DOMEvents.addEventListener ( editorDocument, DOMEvents.CONTEXTMENU, this );
		DOMEvents.addEventListener ( editorDocument, DOMEvents.KEYPRESS, this );
		DOMEvents.addEventListener ( editorDocument, DOMEvents.MOUSEDOWN, this );
		DOMEvents.addEventListener ( editorDocument, DOMEvents.MOUSEMOVE, this );
	}
	
	/*
	 * Why this?
	 */
	DOMEvents.addEventListener ( this.bindingElement, DOMEvents.MOUSEDOWN, {
		handleEvent: function ( e ) {
			DOMEvents.stopPropagation ( e );
			DOMEvents.preventDefault ( e );
		}
	});
}

/**
 * Check for dirty. Note that VisualEditorPageBinding invokes this 
 * method on an interval (at least in Internet Explorer).
 * @param {boolean} isHiddenChange
 */
EditorBinding.prototype.checkForDirty = function ( isHiddenChange ) {

	if (!this.isDirty || !this.bindingWindow.DataManager.isDirty) {
		if ( isHiddenChange == true ) {
			this.bindingWindow.DataManager.dirty(this);
		} else {
			var self = this;
			setTimeout ( function () {
				self._checkForRealDirty ();
			}, 0 );
		}
	}
}

/**
 * The real dirty check.
 * @return
 */
EditorBinding.prototype._checkForRealDirty = function () {
	
	var checksum = this.getCheckSum ();
	if (checksum != this._checksum) {
		this.bindingWindow.DataManager.dirty(this);
		this._checksum = checksum;
	}
}

/**
 * Used to determine when a dirty flag should be raised.
 * @return {string}
 */
EditorBinding.prototype.getCheckSum = function () {
	
	var result = null;
	if ( Binding.exists ( this._pageBinding )) {
		result = this._pageBinding.getCheckSum ( this._checksum );
	}
	return result;
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {eEvent} e
 */
EditorBinding.prototype.handleEvent = function (e) {

	EditorBinding.superclass.handleEvent.call(this, e);

	var target = DOMEvents.getTarget(e);

	switch (e.type) {

		/*
		* Note that the contextmenu is build when first shown.
		*/ 
		case DOMEvents.CONTEXTMENU:
			if (Client.isFirefox && e.ctrlKey) {
				// nothing, default FF contextmenu
			} else {
				DOMEvents.preventDefault ( e );
				this._popupBinding.editorBinding = this;
				this.handleContextMenu ( e );
			}
			break;

		/*
		* Check for dirty on all keystrokes.
		*/ 
		case DOMEvents.KEYPRESS:
			this.checkForDirty();
			if (!this._isActivated || this.isFocusable && !this.isFocused) {
				this._activateEditor(true);
			}
			break;

		/*
		* Activate editor on editor mousedown.
		*/ 
		case DOMEvents.MOUSEDOWN:

			if (target.ownerDocument == this.getEditorDocument()) {
				if (!this._isActivated || this.isFocusable && !this.isFocused) {
					this._activateEditor(true);
				}
			}
			break;

		/*
		* A pityful and desperate attempt to fix the case where IE thinks 
		* that no window has the current focus combined with IE's assumption 
		* that mousedown on a contenteditable document should not invoke focus. 
		*/ 
		case DOMEvents.MOUSEMOVE:
			if (Client.isAnyExplorer) {
				if (Application.isBlurred) {
					if (!this._isActivated) {
						this.getContentWindow().focus();
					}
				}
			}
			break;
	}
}

/**
 * Subclass can overload this to update contextmenu before displaying it.
 * @param {MouseEvent} e
 */
EditorBinding.prototype.handleContextMenu = function ( e ) {
	
	this.createBookmark ();
	this._popupBinding.snapToMouse ( e );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
EditorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	EditorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	var target = null;
	
	switch ( broadcast ) {
		
		case BroadcastMessages.STAGEDIALOG_OPENED:

			if (this._isActivated) {
				this._activateEditor(false);
			}
			break;
		/*
		 * When a mouseup was performed on something, we need to analyze 
		 * whether or not this something should deactivate the editor. 
		 */
		case BroadcastMessages.MOUSEEVENT_MOUSEUP :
				
			if ( !this.isDialogMode ) {
				try {
					var isDeactivate = true;
					if ( arg instanceof Binding ) {
						if ( Interfaces.isImplemented ( IEditorControlBinding, arg ) == true ) {
							if ( arg.isEditorControlBinding ) {
								isDeactivate = false; 
							}
						}
					} else {
						target = DOMEvents.getTarget ( arg );
						if ( target && target.ownerDocument == this.getEditorDocument ()) {
							isDeactivate = false;
						}
					}
					if ( isDeactivate ) {
						if ( this._isActivated ) {
							this._activateEditor ( false );
						}
					}
				} catch ( exception ) {
					this.unsubscribe ( BroadcastMessages.MOUSEEVENT_MOUSEUP );
					throw exception;
				}
			}
			break;
	}	
}

/**
 * Activate editor.
 * @param {boolean} isActivate 
 */
EditorBinding.prototype._activateEditor = function ( isActivate ) {
	
	if ( isActivate != this._isActivated ) {
		
		this._isActivated = isActivate;
		EditorBinding.isActive = isActivate;
		
		var handler = this.getEditorWindow ().standardEventHandler;
		var broadcaster = this.getContentWindow ().bindingMap.broadcasterIsActive;
		
		if ( broadcaster != null ) {
			if ( isActivate ) {
				 
				if ( this.hasBookmark ()) {
					this.deleteBookmark (); // no need to keep old bookmarks around
				}
				broadcaster.enable ();
				
				if ( Client.isExplorer ) { // fixes a glitch where Explorer needs multiple activations.
					this._sanitizeExplorer ();
				}
				
				this.focus ();
				handler.enableNativeKeys ( true );
				
			} else {
				
				broadcaster.disable ();
				handler.disableNativeKeys ();
				this.blur (); 
			}
		} else {
			throw "Required broadcaster not found";
		}
	}
}

/**
 * Invoke this whenever Explorer appears not to fully 
 * realize that we are in contentEditable mode.
 */
EditorBinding.prototype._sanitizeExplorer = function () {
	
	if ( Client.isExplorer ) {
		var range = this.getEditorDocument ().selection.createRange ();
		range.select ();
	}
}

/**
 * Invoke this whenever Mozilla appears not to fully 
 * realize that we are in contentEditable mode.
 * 
 * @see {https://bugzilla.mozilla.org/show_bug.cgi?id=520395}
 * @see {https://bugzilla.mozilla.org/show_bug.cgi?id=429308}
 * @see {https://bugzilla.mozilla.org/show_bug.cgi?id=454191}
 * @see {https://bugzilla.mozilla.org/show_bug.cgi?id=571694}
 * @see {https://bugzilla.mozilla.org/show_bug.cgi?id=439808}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=73988}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?id=9153}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=2860}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=3278}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=604}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=3556}
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=13366}
 */
EditorBinding.prototype._sanitizeMozilla = function () {
	
	/*
	 * This has now been hacked into TinyMCE source code by 
	 * adding a timeout to the place in "Editor.js" where it says:
	 * 
	 * // Design mode must be set here once again to fix a bug where
	 * // Ctrl+A/Delete/Backspace didn't work if the editor was added 
	 * // using mceAddControl then removed then added again
	 */
}

/**
 * Returns true if text is selected or in IE - strangely - if an 
 * image is selected (even simply right-clicked).
 * This method is not really handled elegantly.
 * @return {boolean}
 */
EditorBinding.prototype.hasSelection = function () {
	var result = false;
	try {

		var selection = this.getEditorWindow().getSelection();
		if (selection != null) {
			result = selection.toString().length > 0;
			if (!result) {
				var range = selection.getRangeAt(0);
				var frag = range.cloneContents();
				var element = this.getEditorDocument().createElement("element");
				while (frag.hasChildNodes()) {
					element.appendChild(frag.firstChild);
				}
				var img = element.getElementsByTagName("img").item(0);
				if (img != null) {

					/*
					* Major hack. Should not be performed here, but the  
					* class check will at least prevent the Link button 
					* from being enabled when a Function is selected.
					*/
					if (!VisualEditorBinding.isReservedElement(img)) {
						result = true;
					}
				}
			}
		}

	} catch (exception) {
		// may happen in WebKit when inserting eg. a table from the Insert>Table dialog
	}
	return result;
}

/**
 * @param {EditorBinding} editorBinding
 * @param {string} command
 * @return {boolean}
 */
EditorBinding.prototype.isCommandEnabled = function ( command ) {
	
	var result = true; // by default enabling all commands!
	
	switch ( command ) {
		case "Cut" :
		case "Copy" :
		case "Paste" :
			result = this.getEditorDocument ().queryCommandEnabled ( command );
			break;
	}	
	return result;
}

/**
 * Handle command. Subclass may overload this.
 * @param {string} cmd
 * @param {boolean} gui
 * @param {string} val
 */
EditorBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	var isCommandHandled = false;
	
	// IE neeeds this!
	this.restoreBookmark ();
	
	switch ( cmd ) {
	
		case "Cut" :
		case "Copy" :
		case "Paste" :
			
			var value = null;
			if ( cmd == "Paste" ) {
				value = null;
			} else {
				value = this.hasSelection ();
			}
			
			try { // mozilla may throw a clipboard security exception here
				this.getEditorDocument ().execCommand ( cmd, gui, value );
			} catch ( mozillaSecurityException ) {
				if ( Client.isMozilla == true ) {
					Dialog.invokeModal ( EditorBinding.URL_DIALOG_MOZ_CONFIGURE );
				} else {
					throw "Clipboard operation malfunction. Contact your developer.";
				}
			} finally {
				isCommandHandled = true; 
			}
		break;
	}
	
	return isCommandHandled;		
}

/**
 * Get button for command. Probably the contextmenu want's to know, but TinyMCE plugins may also ask. 
 * @param {string} cmd
 * @return {EditorToolBarButtonBinding}
 */
EditorBinding.prototype.getButtonForCommand = function ( cmd ) {

	var toolbar = this.getContentWindow ().bindingMap.toolbar;
	var button = toolbar.getButtonForCommand ( cmd );
	if ( !button ) {
		throw "No button for command " + cmd;
	}
	return button;
}

/**
 * Get name.
 * @implements {IData}
 * @return {string}
 */
EditorBinding.prototype.getName = function () {
	
	return this.getProperty ( "name" );
}

/**
 * Set dirty flag.
 * @implements {IData}
 */
EditorBinding.prototype.dirty = DataBinding.prototype.dirty;

/**
 * Reset dirty flag.
 * @implements {IData}
 * @return {string}
 */
EditorBinding.prototype.clean = function () {
	
	this.isDirty = false;
	this._checksum = this.getCheckSum ();
}

/**
 * Enable dialog mode.
 */
EditorBinding.prototype.enableDialogMode = function () {
	
	if ( !this.isDialogMode ) {
		this.isDialogMode = true;
		if ( !this.hasBookmark ()) {
			this.createBookmark ();
		}
		
		/* 
		 * The activate-stuff seems required for Mozilla to keep track 
		 * on, whether or not backspace should be allowed. We bet it 
		 * could be fixed in a better way. Backspace is switched back on 
		 * when user focuses the editor window with the mouse...
		 */
		var self = this;
		setTimeout ( function () { // otherwise the insert selector may not disable...
			self._activateEditor ( false );
		}, 0 );
	}
}

/**
 * Disable dialog mode.
 */
EditorBinding.prototype.disableDialogMode = function () {
	
	if ( this.isDialogMode ) {
		if ( this.hasBookmark ()) {
			this.restoreBookmark ();
		}

		/*
		 * Allows for the popup to close before any 
		 * buttonclick disables editor toolbar.
		 * Maybe invoke this method AFTER dialog 
		 * is closed somehow?
		 */	
		var self = this;
		setTimeout ( function () {
			self.isDialogMode = false;
			self.blurEditor (); // force new activation to synch it all
		}, 100 );
	}
}

/**
 * Blur editor. Simply by transferring the focus 
 * to an inputfield, then hiding the inputfield.
 */
EditorBinding.prototype.blurEditor = function () {
	
	var input = this.getContentDocument ().getElementById ( "focusableinput" );
	
	if ( input != null ) {
		input.style.display = "block";
		FocusBinding.focusElement ( input );
		input.style.display = "none";
	} else {
		throw "Required element not found: focusableinput";
	}
}

/**
 * Hide cover when page initializes.
 * @implements {IActionListener}
 * @param {Action} action
 * @overloads {WindowBinding#handleAction}
 */
EditorBinding.prototype.handleAction = function ( action ) {
	
	EditorBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var self = this;
	var iframe = this.shadowTree.iframe;
	
	switch ( action.type ) {
		
		/*
		 * Dispatch dirty events. Remember that this.isBlockingActions!
		 */
		case Binding.ACTION_DIRTY :
			
			if ( action.target != this ) {
				this.checkForDirty ();
			}
			break;
	}
}

/**
 * Invoked when contained page initializes.
 * @overloads {WindowBinding#_onPageInitialze}
 * @param {PageBinding} binding
 */
EditorBinding.prototype._onPageInitialize = function ( binding ) {
	
	/* 
	 * Flex the content and hide the cover. Note that flex is repeated  
	 * on the finalize method in order to fix editors in lazy tabpanels. 
	 */
	if ( this._pageBinding == null ) {
		
		this.reflex ();
		if ( this._coverBinding != null && this._coverBinding.isVisible ) {
			this._coverBinding.hide ();
		}
	}
	
	EditorBinding.superclass._onPageInitialize.call ( this, binding );
}

/**
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 */
EditorBinding.prototype.handleElement = function ( element ) {
	
	return true; // do handle element update
};

/**
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 */
EditorBinding.prototype.updateElement = function ( element ) {
	
	return true; // stop crawling descendants
};


// IDATA .......................................................

/**
 * Focus.
 * @implements {IFocusable}
 */
EditorBinding.prototype.focus = DataBinding.prototype.focus;

/**
 * Blur.
 * @implements {IFocusable}
 */
EditorBinding.prototype.blur = DataBinding.prototype.blur;

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
EditorBinding.prototype.manifest = function () {
	
	this.shadowTree.dotnetinput.value = encodeURIComponent ( this.getValue ());
};


// ABSTRACT METHODS ......................................................

/**
 * Get the editable window.
 * @return {DOMDocumentView}
 */
EditorBinding.prototype.getEditorWindow = Binding.ABSTRACT_METHOD;

/**
 * Get the editable document.
 * @return {DOMDocument}
 */
EditorBinding.prototype.getEditorDocument = Binding.ABSTRACT_METHOD;

/**
 * Get the associated contextmenu.
 * @return {EditorPopupBinding}
 */
EditorBinding.prototype.getEditorPopupBinding = Binding.ABSTRACT_METHOD;

/**
 * Create selection bookmark, patching explorer focus dysfunction.
 */
EditorBinding.prototype.createBookmark = Binding.ABSTRACT_METHOD;

/**
 * Restore selection focus for explorer.
 */
EditorBinding.prototype.restoreBookmark = Binding.ABSTRACT_METHOD;

/**
 * Has bookmark
 * @return {boolean}
 */
EditorBinding.prototype.hasBookmark = Binding.ABSTRACT_METHOD;

/**
 * Delete bookmark.
 */
EditorBinding.prototype.deleteBookmark = Binding.ABSTRACT_METHOD;

/**
 * Reset undo-redo history.
 */
EditorBinding.prototype.resetUndoRedo = Binding.ABSTRACT_METHOD;


// ABSTRACT IDATA METHODS ............................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
EditorBinding.prototype.validate = Binding.ABSTRACT_METHOD;

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
EditorBinding.prototype.getValue = Binding.ABSTRACT_METHOD;

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
EditorBinding.prototype.getResult = Binding.ABSTRACT_METHOD;