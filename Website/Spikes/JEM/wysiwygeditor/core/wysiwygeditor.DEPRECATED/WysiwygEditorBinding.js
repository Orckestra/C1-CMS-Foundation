WysiwygEditorBinding.prototype = new EditorBinding;
WysiwygEditorBinding.prototype.constructor = WysiwygEditorBinding;
WysiwygEditorBinding.superclass = EditorBinding.prototype;

WysiwygEditorBinding.URL_DEFAULT = "${root}/content/misc/editors/wysiwygeditor/wysiwygeditor.aspx";
WysiwygEditorBinding.URL_IE8_BETA = "${root}/content/misc/editors/wysiwygeditor/ie8alarm.aspx";

WysiwygEditorBinding.URL_DIALOG_CONTENTERROR = "${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
WysiwygEditorBinding.DEFAULT_CONTENT = "<p><br/></p>";
WysiwygEditorBinding.RENDERING_CLASSNAME = "compositeFunctionWysiwygRepresentation";
WysiwygEditorBinding.FIELD_CLASSNAME = "compositeFieldReferenceWysiwygRepresentation";
WysiwygEditorBinding.TYPE_NORMALEDITOR = "normaleditor";
WysiwygEditorBinding.TYPE_PAGEEDITOR = "pageeditor";

/*
WysiwygEditorBinding.ACTION_ATTACHED = "wysiwygeditor attached";
*/
WysiwygEditorBinding.ACTION_INITIALIZED = "wysiwygeditor initialized";

WysiwygEditorBinding.CLASSNAME_MEDIA 		= "compositemedia";
WysiwygEditorBinding.CLASSNAME_FLASH 		= "compositemediaflash";
WysiwygEditorBinding.CLASSNAME_QUICKTIME 	= "compositemediaquicktime";
WysiwygEditorBinding.CLASSNAME_SHOCKWAVE 	= "compositemediashockwave";
WysiwygEditorBinding.CLASSNAME_WINMEDIA 	= "compositemediawinmedia";

/**
 * Considered private to the WysiwygEditorBinding.
 * @type {Map<string><List<IWysiwygEditorComponent>>}
 */
WysiwygEditorBinding._components = new Map ();

/**
 * Considered private to the WysiwygEditorBinding.
 * @type {Map<string><EditorBinding>}
 */
WysiwygEditorBinding._editors = new Map ();

/**
 * Editor compontens can register themselves around here  
 * to be initialized when TinyMCE or CodePress is loaded.
 * TODO: TRANSFER TO EDITORBINDING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * @param {IWysiwygEditorComponent} binding
 * @param {WindowBinding} windowBinding
 */
WysiwygEditorBinding.registerComponent = function ( binding, windowBinding ) {
	
	var components = WysiwygEditorBinding._components;
	var editors = WysiwygEditorBinding._editors;
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
 * TODO: TRANSFER TO EDITORBINDING
 * @param {EditorBinding} editor
 * @param {WindowBinding} windowBinding
 * @return {List<IWysiwygEditorComponent>}
 */
WysiwygEditorBinding.claimComponents = function ( editor, windowBinding ) {
	
	var components = WysiwygEditorBinding._components;
	var editors = WysiwygEditorBinding._editors;
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
 * Sorry, but we had to put this somewhere...
 * TODO: consider moving back to Tiny when we refactor the dialogs!
 * @param {string} classname
 * @return {string}
 */
VisualEditorBinding.getTinyLessClassName = function ( classname ) {
	
	var i = 0, singlename, result = "", split = classname.split ( " " );
	while (( singlename = split [ i ]) != null ) {
		if ( singlename.length >= 3 && singlename.substring ( 0, 3 ) == "mce" ) {
			singlename = "";
		} else if ( singlename.length >= 14 && singlename.substring ( 0, 14 ) == "compositemedia" ) {
			singlename = "";
		}
		result += singlename;
		if ( split [ i + 1 ]) {
			result += " ";
		}
		i++;
	}
	return result;
}

/**
 * Convert structured markup to tinymarkup.
 * @param {string} content Structured markup
 * @param {WysiwygEditorBinding} binding
 * @return {string}
 */
VisualEditorBinding.getTinyContent = function ( content, binding ) {
	
	var result = null;
	
	/*
	 * Some content seems to be needed for the webservice to return valid fragment.
	 */
	if ( !content || content == "" ) {
		content = WysiwygEditorBinding.DEFAULT_CONTENT;
	}
	
	/*
	 * If webservice fails to convert structured markup,
	 * a dialog will be presented and false will be returned.
	 */
	WebServiceProxy.isFaultHandler = false;
	var soap = XhtmlTransformationsService.StructuredContentToTinyContent ( content );
	if ( soap instanceof SOAPFault ) {
		var dialogArgument = soap;
		var dialogHandler = {
			handleDialogResponse : function () {
				/*
				 * Otherwise the save button could be disabled 
				 * indefinitely during save scenario
				 */
				binding.dispatchAction ( Binding.ACTION_VALID );
			}
		}
		Dialog.invokeModal (
			WysiwygEditorBinding.URL_DIALOG_CONTENTERROR,
			dialogHandler, 
			dialogArgument 
		);
	} else {
		result = soap.XhtmlFragment;
		if ( result == null ) { // always return a string!
			result = "";
		}
	}
	WebServiceProxy.isFaultHandler = true;
	return result;
}

/**
 * Convert tinymarkup to structured markup.
 * @param {string} content
 * @return {string}
 */
VisualEditorBinding.getStructuredContent = function ( content ) {
	
	var result = null;
	WebServiceProxy.isFaultHandler = false;
	var soap = XhtmlTransformationsService.TinyContentToStructuredContent ( content );
	if ( soap instanceof SOAPFault ) {
		// DO SOMETHING!?
	} else {
		result = soap.XhtmlFragment;
		if ( !result ) {
			result = "";
		}
	}
	WebServiceProxy.isFaultHandler = true;
	return result;
}


/**
 * @class
 * @implements {IData}
 */
function WysiwygEditorBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorBinding" );
	
	/**
	 * @type {Timer}
	 */
	this.timer = SystemTimer.getTimer ( this );
	
	/**
	 * The TinyMCE engine.
	 * @type {TinyMCE_Engine} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE instance.
	 * @type {TinyMCE_Control}
	 */
	this._tinyInstance = null;
	
	/**
	 * The TinyMCE theme.
	 * @type {TinyMCE_CompositeTheme}
	 */
	this._tinyTheme = null;
	
	/**
	 * @type {WysiwygEditorElementClassConfiguration}
	 */
	this.elementClassConfiguration = null;
	
	/**
	 * @type {WysiwygEditorFieldGroupConfiguration}
	 */
	this.embedableFieldConfiguration = null;
	
	/**
	 * Editor configuration stylesheet URL.
	 * @type {string}
	 */
	this.configurationStylesheet = null;
	
	/**
	 * Editor presentation stylesheet URL.
	 * @type {string}
	 */
	this.presentationStylesheet = null;
	
	/**
	 * @implements {IData}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	// TODO: subclass the following!
	
	/**
	 * @type {Map<string><string>}
	 */
	this._textareas = null;
	
	/**
	 * @type {string}
	 */
	this._textareaname = null;
	
	/**
	 * So that we can invoke the "clean" method.
	 * TODO: Make unaware of sourcecodeeditor, move to page...
	 * @type {SourceCodeEditorBinding}
	 */
	this._sourceEditorBinding = null;
	
	/**
	 * Editor type defaults to normal. 
	 * Alternative would be a "page editor" 
	 * sporting multiple content slots.
	 * @type {string}
	 */
	this._type = WysiwygEditorBinding.TYPE_NORMALEDITOR;
	
	/**
	 * Some kind of hacked patch.
	 * @type {boolean}
	 */
	this._isWaitingForPageBinding = false;
	
	/**
	 * Has template placeholders?
	 */
	this._hasPlaceHolders = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorBinding.prototype.toString = function () {

	return "[WysiwygEditorBinding]";
}

/**
 * @overloads {WindowBinding#onBindingAttach}
 */
WysiwygEditorBinding.prototype.onBindingAttach = function () {
	
	this.timer.reset ();
	
	if ( Client.isExplorer8 == true ) {
		
		Binding.prototype.onBindingAttach.call ( this );
		this.setURL ( WysiwygEditorBinding.URL_IE8_BETA );
		
		// see changes to method _onPageInitialize !!!!
		
	} else {
	
		WysiwygEditorBinding.superclass.onBindingAttach.call ( this );	
		this.subscribe ( BroadcastMessages.TINYMCE_INITIALIZED );
		this.subscribe ( BroadcastMessages.WYSIWYGEDITOR_HACKED );
		this.addActionListener ( SourceEditorBinding.ACTION_INITIALIZED );
		this._parseDOMProperties ();
	}
}

/**
 * Find start content and register as data binding. Note that we 
 * operate with two distinct types of visual editors. Also note that 
 * the startup markup is parsed by a web service for both types!
 * @overloads {EditorBinding._setup}
 */
WysiwygEditorBinding.prototype._setup = function () {
	
	if ( this.getProperty ( "type" ) == WysiwygEditorBinding.TYPE_PAGEEDITOR ) {
		this._type = WysiwygEditorBinding.TYPE_PAGEEDITOR;
		var textareas = this.getDescendantElementsByLocalName ( "textarea" );
		while ( textareas.hasNext ()) {
			var textarea = textareas.getNext ();
			if ( textarea.getAttribute ( "selected" ) == "true" ) {
				this._startContent = textarea.value; // modified just below!
			}
		}	
	} else {
		WysiwygEditorBinding.superclass._setup.call ( this );
	}
	
	/*
	 * This step will convert structured markup 
	 * to tinymarkup. Defaults to empty string.
	 */
	this._startContent = VisualEditorBinding.getTinyContent ( this._startContent, this );
	if ( !this._startContent ) {
		this._startContent = "";
	}
}

/**
 * Invoked when contained page initializes.
 * @overloads {EditorBinding#_onPageInitialze}
 * @param {PageBinding} binding
 */
WysiwygEditorBinding.prototype._onPageInitialize = function ( binding ) {
	
	if ( Client.isExplorer8 == true ) {
		
		WindowBinding.prototype._onPageInitialize.call ( this, binding );
		
	} else {
	
		/*
		 * Collapse main splitter if normal editor.
		 */
		if ( !this._pageBinding ) {
			if ( this._type == WysiwygEditorBinding.TYPE_NORMALEDITOR ) {
				this.getContentWindow ().bindingMap.toolsplitter.collapse ();
			}
		}
		
		/*
		 * Super method.
		 */
		WysiwygEditorBinding.superclass._onPageInitialize.call ( this, binding );
		
		/*
		 * Patch absurd rendering bug in Firefox 2.0
		 */
		if ( Client.isMozilla && !Client.isGecko19 ) {
			this._pageBinding.desperateHack ();
		}
		
		/*
		 * Patches an occasional synchronization bug in explorer.
		 * @see {WysiwygEditorBinding#_initialize}
		 *
		if ( this._isWaitingForPageBinding == true ) {
			if ( this._pageBinding != null ) {
				//this._pageBinding.showEditor ( true );
			} else {
				this.logger.fatal ( "WysiwygEditorBinding#_onPageInitialize maximum failure." );
			}
		}
		*/
	}
}

/**
 * Parse DOM properties.
 */
WysiwygEditorBinding.prototype._parseDOMProperties = function () {
	
	var configuration = this.getProperty ( "configurationstylesheet" );
	if ( configuration ) {
		this.configurationStylesheet = configuration;
	}
	
	var presentation = this.getProperty ( "presentationstylesheet" );
	if ( presentation ) {
		this.presentationStylesheet = presentation;
	}
	
	var classconfig = this.getProperty ( "elementclassconfiguration" );
	if ( classconfig ) {
		this.elementClassConfiguration = WysiwygEditorElementClassConfiguration.getConfiguration ( classconfig );
	}
	
	var fieldsconfig = this.getProperty ( "embedablefieldstypenames" );
	if ( fieldsconfig ) {
		this.embedableFieldConfiguration = WysiwygEditorFieldGroupConfiguration.getConfiguration ( fieldsconfig );
	}
}

/**
 * Rig up as page editor.
 */
WysiwygEditorBinding.prototype._registerAsPageEditor = function () {

	var self = this;
	var selector = this.getDescendantBindingByLocalName ( "selector" );
	var updatepanel = this.getDescendantBindingByLocalName ( "updatepanel" );
		
	/*
	 * Register as DataBinding with random 
	 * key.This is simply a formality.
	 */
	this._registerWithDocumentManager ( KeyMaster.getUniqueKey ());
	
	/*
	 * Rig up selector. The selections is main 
	 * page is duplicated into contained page.
	 */
	selector.attach ();
	var templateselector = this.getContentWindow ().bindingMap.templateselector;
	selector.selections.each ( function ( selection ) {
		selection.imageProfile = new ImageProfile ({
			image : "${icon:page-template-template}"
		});
	});
	templateselector.populateFromList ( selector.selections );
	
	/*
	 * Contained page selector is wired to control main page selector.
	 * When selection changes, main page performs a postback.
	 */
	templateselector.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED, {
		handleAction : function () {
			selector.selectByValue ( templateselector.getValue ());
			selector.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
		}
	});
	
	/**
	 * Rig up the templates tree to update TinyMCE 
	 * content when a new placeholder is selected.
	 */
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	templatetree.addActionListener ( TreeBinding.ACTION_SELECTIONCHANGED, this );
	
	/**
	 * Rig up the updatepanel. When new content is served from the 
	 * server, placeholders are automatically injected into tree.
	 */
	this._placeholdersFromUpdatePanel ( updatepanel );
	updatepanel.addActionListener ( UpdatePanelBinding.ACTION_UPDATED, {
		handleAction : function ( action ) {
			self._placeholdersFromUpdatePanel ( updatepanel );
			action.consume ();
		}
	});
}

/**
 * Parse textareas into treenodes.
 * @param {UpdatePanelBinding} updatepanel
 */
WysiwygEditorBinding.prototype._placeholdersFromUpdatePanel = function ( updatepanel ) {
	
	templatetree = this.getContentWindow ().bindingMap.templatetree;
	var textareas = updatepanel.getDescendantElementsByLocalName ( "textarea" );
	
	templatetree.empty ();
	
	if ( textareas.hasEntries ()) {
		this._hasPlaceHolders = true;
		this._parsePlaceHolders ( textareas );
		if ( this._isFinalized ) {
			this._pageBinding.showEditor ( true );
		}
	} else {
		this._hasPlaceHolders = false;
		this._noPlaceHolders ();
		if ( this._isFinalized ) {
			this._pageBinding.showEditor ( false );
		}
	}
}

/**
 * Actually parse textareas into treenodes.
 * @param {List<DOMElement>}
 */
WysiwygEditorBinding.prototype._parsePlaceHolders = function ( textareas ) {
	
	/*
	 * Reset textareas Map. Keep a copy of the old 
	 * map in order to persist content changes (similarly 
	 * named placeholder will inherit content from last 
	 * used template).
	 */
	var oldtextareas = null;
	if ( this._textareas != null ) {
		oldtextareas = this._textareas.copy ();
	}
	this._textareas = new Map ();
	
	/*
	 * Nifty function to persist content in identically named placeholders.
	 */
	function compute ( placeholderid, placeholdermarkup ) {
		var result = placeholdermarkup;
		if ( oldtextareas && oldtextareas.has ( placeholderid )) {
			result = oldtextareas.get ( placeholderid ).placeholdermarkup;
		}
		return result;
	}	
	
	/**
	 * Rig up textareas.
	 */
	while ( textareas.hasNext ()) {
		var textarea = textareas.getNext ();
		var placeholderid = textarea.getAttribute ( "placeholderid" );
		this._textareas.set ( placeholderid, 
			{
				placeholderid       : placeholderid,
				placeholdername 	: textarea.getAttribute ( "placeholdername" ),
				placeholdermarkup 	: compute ( placeholderid, textarea.value ),
				textareaelement		: textarea,
				isSelected 			: textarea.getAttribute ( "selected" ) == "true"
			}
		);
	}
	
	/*
	 * Populate the tree.
	 */
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	var selected = null;
	
	var treenodes = new Map ();
	this._textareas.each ( function ( name, object ) {
		var treenode = templatetree.add ( 
			TreeNodeBinding.newInstance ( 
				templatetree.bindingDocument 
			)
		);
		treenode.setLabel ( object.placeholdername );
		treenode.setImage ( "${icon:placeholder}" );
		treenode.setProperty ( "placeholder", true );
		treenode.textareaname = name;
		treenodes.set ( object.placeholdername, treenode );
		if ( object.isSelected ) {
			selected = treenode;
		}
	});
	templatetree.attachRecursive ();
	
	/*
	 * Select default placeholder. If old template is mounted, 
	 * this part is skipped *unless* new template doesn't include 
	 * the currently edited placeholders name. The following code 
	 * is not easy to decipher - this setup should be refactored!
	 */
	if ( selected ) {
	
		var isDefaultBehavior = true;
		
		if ( oldtextareas != null ) {
			
			isDefaultBehavior = false;
			var map = new Map ();
			this._textareas.each ( function ( id, object ) {
				map.set ( object.placeholdername, true );
			});
			if ( !map.has ( this._placeholdername )) {
				isDefaultBehavior = true;
				this._isHackedFlag = true;
			}
		}
		
		if ( isDefaultBehavior ) {
			var object = this._textareas.get ( selected.textareaname );
			this._textareaname = selected.textareaname;
			this._placeholdername = object.placeholdername;
			this._setContentFromPlaceHolder ( selected.textareaname );
			selected.focus ();
		} else {
			var treenode = treenodes.get ( this._placeholdername );
			this._textareaname = treenode.textareaname;
			treenode.focus ();
		}
	}
}

/**
 * No placeholders in template: Display warning.
 */
WysiwygEditorBinding.prototype._noPlaceHolders = function () {
	
	/*
	 * Build warning treenode.
	 */
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	var treenode = templatetree.add ( 
		TreeNodeBinding.newInstance ( 
			templatetree.bindingDocument 
		)
	);
	treenode.setLabel ( StringBundle.getString ( "ui", "Website.WysiwygEditor.TemplateTree.NoTemplateWarning" ));
	treenode.setImage ( "${icon:warning}" );
	treenode.attach ();
	
	/*
	 * Neutralize statusbar
	 */
	var statusbar = this.getContentWindow ().bindingMap.statusbar;
	statusbar.setPlaceHolderName ( null );
}

/** 
 * Set editor content based on placeholder name. Currently, 
 * this will reset the undo history for all placeholders.
 * @param {string} name
 */
WysiwygEditorBinding.prototype._setContentFromPlaceHolder = function ( name ) {
	
	/*
	 * While initializing, content is presented in TinyMCE independantly from 
	 * the current placeholder selction. Content is only updated when initialized.
	 */
	if ( this._isFinalized == true ) {
		var object = this._textareas.get ( name );
		this.setContent ( object.placeholdermarkup );
		this.resetUndoRedo ();
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
WysiwygEditorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	WysiwygEditorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	var windowBinding = this.getContentWindow ().bindingMap.tinywindow;
	var contentWindow = windowBinding.getContentWindow ();
	
	switch ( broadcast ) {
		
		/*
		 * This broadcast is transmitted from inline javascript in the TinyMCE window.
		 * Window contains a textarea that we need to update *before* TinyMCE is loaded.
		 */
		case BroadcastMessages.WYSIWYGEDITOR_HACKED :
			
			if ( arg.broadcastWindow == contentWindow ) {
				arg.textareaElement.value = this._startContent;
				this.unsubscribe ( BroadcastMessages.WYSIWYGEDITOR_HACKED );
			}
			break;
		
		/*
		 * TinyMCE initialized.
		 */
		case BroadcastMessages.TINYMCE_INITIALIZED :
			
			if ( arg.broadcastWindow == contentWindow ) {
				
				this._tinyEngine	= arg.tinyEngine;
				this._tinyInstance 	= arg.tinyInstance;
				this._tinyTheme 	= arg.tinyTheme;
				
				this._tinyTheme.editorBinding = this;
				this.initializeEditorComponents ( windowBinding );
				this._initialize ();
				
				this.unsubscribe ( BroadcastMessages.TINYMCE_INITIALIZED );
			}
			break;
	}
}

/**
 * @param {Action} action
 */
WysiwygEditorBinding.prototype.handleAction = function ( action ) {
	
	WysiwygEditorBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	switch ( action.type ) {
		
		case SourceEditorBinding.ACTION_INITIALIZED :
			this._sourceEditorBinding = binding;
			action.consume ();
			break;
		
		/**
		 * Page editors only: Managing selection 
		 * changes on the placeholder tree
		 */
		case TreeBinding.ACTION_SELECTIONCHANGED :
			
			var templatetree = this.getContentWindow ().bindingMap.templatetree;
			var treenode = templatetree.getSelectedTreeNodeBindings ().getFirst ();
			this._placeHolderSelected ( treenode.textareaname );
			action.consume ();
			break;
	}
}

/**
 * Do stuff when tree selection changes.
 * @param {string} textareaname
 */
WysiwygEditorBinding.prototype._placeHolderSelected = function ( textareaname ) {
	
	/*
	 * Unless we are initializing, backup current placeholdermarkup.
	 */
	if ( this._isFinalized == true ) {
		if ( !this._isHackedFlag ) {
			if ( this._textareaname && this._textareas.has ( this._textareaname )) {
				this._textareas.get ( this._textareaname ).placeholdermarkup = this.getContent ();
			}
		}
		this._isHackedFlag = false;
	}
	
	/*
	 * Register new placeholdernames 
	 * and update the statusbar.
	 */
	this._textareaname = textareaname;
	this._placeholdername = this._textareas.get ( this._textareaname ).placeholdername;
	var statusbar = this.getContentWindow ().bindingMap.statusbar;
	statusbar.setPlaceHolderName ( this._placeholdername );
	
	/*
	 * Unless we are initializing, 
	 * update TinyMCE contentarea.
	 */
	if ( this._isFinalized == true ) {
		var self = this;
		Application.lock ( self );
		setTimeout ( function () {
			self._setContentFromPlaceHolder ( textareaname );
			Application.unlock ( self );
		}, 0 );
	}
}

/**
 * @overloads {EditorBinding#_initialize}
 */
WysiwygEditorBinding.prototype._initialize = function () {

	if ( this._type == WysiwygEditorBinding.TYPE_PAGEEDITOR ) {
		this._registerAsPageEditor ();
		this.getContentWindow ().bindingMap.toolscover.hide ();
	}
	
	/*
	 * Register as content change handler.
	 */
	this._tinyTheme.registerContentChangeHandler ( this );
	
	/*
	 * Import presentation stylesheet. Configuration 
	 * stylesheet can be imported from here using CSS.
	 * DAMN! FF3.0 is too fast, you actually see this happen!
	 */
	if ( this.presentationStylesheet ) {
		this._tinyEngine.importCSS (
			this._tinyInstance.getDoc (),
			this.presentationStylesheet
		);
	}
	
	/*
	 * Import configuration stylesheet.
	 */
	if ( this.configurationStylesheet ) {
		this._tinyEngine.importCSS (
			this._tinyInstance.getDoc (),
			this.configurationStylesheet
		);
	}
	
	/*
	 * Show the editor while the buttons and controls initializes,
	 * simply in order to show something fast. This step is known 
	 * to fail in Explorer from time to time, so we keep IE waiting. 
	 * @see {WysiwygEditorBinding#onPageInitialize}
	 *
	try {
		if ( this._pageBinding != null ) {
			//this._pageBinding.showEditor ( true );
		} else {
			this._isWaitingForPageBinding = true;
		}
	} catch ( e ) {
		this.logger.fatal ( "WysiwygEditorBinding#_initialize maximum failure." );
	}
	*/
	
	WysiwygEditorBinding.superclass._initialize.call ( this );
}

/**
 * Final actions.
 */
WysiwygEditorBinding.prototype._finalize = function () {
	
	var page = this._pageBinding;
	if ( page != null ) {
		
		if ( this._type == WysiwygEditorBinding.TYPE_PAGEEDITOR ) {
			if ( this._hasPlaceHolders ) {
				setTimeout ( function () {
					page.showEditor ( true );
				}, 0 );
			}
		} else {
			page.showEditor ( true );
		}
		
		WysiwygEditorBinding.superclass._finalize.call ( this );
		this.timer.report ( "Finalized" );
		
	} else { // some machines may have a bugger around here...
		
		var self = this;
		setTimeout ( function () {
			self._finalize ();
		}, 1000 );
	}
}

/**
 * Dirty and cleanup when editor content changes.
 * @implements {IWysiwygEditorContentChangeHandler}
 */
WysiwygEditorBinding.prototype.handleContentChange = function () {
 
 	this.checkForDirty ();
}

/**
 * Initialize component. After startup, this method is invoked 
 * directly by method EditorBinding.registerComponent.
 * @param {IEditorComponent} binding
 */
WysiwygEditorBinding.prototype.initializeEditorComponent = function ( binding ) {

	binding.initializeComponent (
		this,
		this._tinyEngine,
		this._tinyInstance,
		this._tinyTheme
	);
}

/**
 * Configure contextmenu before showing it.
 * @param {MouseEvent} e
 */
WysiwygEditorBinding.prototype.handleContextMenu = function ( e ) {

	var element = DOMEvents.getTarget ( e );
	this._popupBinding.configure ( this._tinyInstance, this._tinyEngine, element );
	WysiwygEditorBinding.superclass.handleContextMenu.call ( this, e );
}

/**
 * Handle command.
 * @param {string} cmd
 * @param {boolean} gui
 * @param {string} val
 */
WysiwygEditorBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	var isCommandHandled = WysiwygEditorBinding.superclass.handleCommand.call ( this, cmd, gui, val );
	
	if ( !isCommandHandled ) {
		this._tinyInstance.execCommand ( cmd, gui, val );
	}
	
	return isCommandHandled;
}

/**
 * Get the contextmenu associated.
 * @return {WysiwygEditorPopupBinding}
 */
WysiwygEditorBinding.prototype.getEditorPopupBinding = function () {
	
	return app.bindingMap.wysiwygeditorpopup;
}

/**
 * Get editor window.
 * @return {DOMDocumentView}
 */
WysiwygEditorBinding.prototype.getEditorWindow = function () {
	
	return DOMUtil.getParentWindow ( this.getEditorDocument ());
}

/**
 * Get editor document.
 * @return {DOMDocument}
 */
WysiwygEditorBinding.prototype.getEditorDocument = function () {
	
	return this._tinyInstance.getDoc ();
}

/**
 * Set content. Note that content should *always* be 
 * provided as structured markup, not Tiny markup.
 * @param {string} content
 * @return {boolean} True if content can be mounted.
 */
WysiwygEditorBinding.prototype.setContent = function ( content ) {
	
	content = content ? content : "";
	var isSuccess = this._pageBinding.setContent ( content );
	return isSuccess;
}

/**
 * Get content. Note that this is simply duplicated by methods "getValue" and "getResult".
 * @return {string}
 */
WysiwygEditorBinding.prototype.getContent = function () {

	/*
	 * The content is probably valid at this point because the validate 
	 * method has been invoked. We can save some time here by not duplicating 
	 * validation, although theoretically we should.
	 */
	var content = this._pageBinding.getContent ();
	content = content ? content : "";
	return content;
}

/**
 * Create bookmark.
 */
WysiwygEditorBinding.prototype.createBookmark = function () {
	
	if ( this.hasBookmark ()) {
		this.logger.error ( "createBookmark deleted a previous bookmark!" );
	}
	this._bookmark = this._tinyInstance.selection.getBookmark ( true );
}

/**
 * Restore bookmark. This will null the bookmark.
 */
WysiwygEditorBinding.prototype.restoreBookmark = function () {
	
	if ( this.hasBookmark ()) {
		
		this._tinyInstance.selection.moveToBookmark ( this._bookmark );
		this._bookmark = null;
		
		if ( Client.isExplorer == true ) { // TODO: verify if this is needed...
			var self = this;
			setTimeout ( function () {
				self._sanitizeExplorer ();
			}, 100 );
		}
		
	} else {
		this.logger.error ( "restoreBookmark - no bookmark!" );
	}
}

/**
 * Has bookmark?
 * @return {boolean}
 */
WysiwygEditorBinding.prototype.hasBookmark = function () {
	
	return this._bookmark != null;
}

/**
 * Delete bookmark.
 */
WysiwygEditorBinding.prototype.deleteBookmark = function () {
	
	this._bookmark = null;
}

/**
 * Reset undo-redo history.
 * Note to self: Not really needed when first run.
 */
WysiwygEditorBinding.prototype.resetUndoRedo = function () {
	
	this._tinyInstance.undoRedo.undoIndex = 0;
	this._tinyInstance.undoRedo.typingUndoIndex = -1;
	
	this.getContentWindow ().bindingMap.broadcasterCanUndo.disable ();
	this.getContentWindow ().bindingMap.broadcasterCanRedo.disable ();
}

/**
 * Focus.
 * @implements {IData}
 */
WysiwygEditorBinding.prototype.focus = function () {
	
	this.logger.debug ( "TODO: Implement focus!" );
	/*
	this.attachClassName ( DataBinding.CLASSNAME_FOCUSED );
	*/
}

/**
 * Blur.
 * @implements {IData}
 */
WysiwygEditorBinding.prototype.blur = function () {
	
	//this.detachClassName ( DataBinding.CLASSNAME_FOCUSED );
}

/**
 * Validate content. Validation is performed on the server WHEN in source mode. 
 * @implements {IData}
 * @return {boolean}
 */
WysiwygEditorBinding.prototype.validate = function () {
	
	return this._pageBinding.validate ();
}

/**
 * Manifest. This will write form data into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
WysiwygEditorBinding.prototype.manifest = function () {
	
	if ( this.isAttached == true ) {
		if ( this._textareas != null && this._textareas.hasEntries ()) { // page editor
			this._textareas.get ( this._textareaname ).placeholdermarkup = this.getContent ();
			this._textareas.each ( function ( name, object ) {
				object.textareaelement.value = object.placeholdermarkup;
			});
		}
		if ( this._textarea != null ) { // regular editor
			this._textarea.value = this.getValue ();
		}
	}
};

/**
 * Clean must be realyed to sourcecodeeditor.
 * TODO: some kind of ElementIterator cleaner?
 * TODO: Make unaware of sourcecodeeditor, move to page...
 * @overloads {EditorBinding#clean}
 */
WysiwygEditorBinding.prototype.clean = function () {
	
	WysiwygEditorBinding.superclass.clean.call ( this );
	
	if ( this._sourceEditorBinding != null ) {
		this._sourceEditorBinding.clean ();
	}
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
WysiwygEditorBinding.prototype.getValue = WysiwygEditorBinding.prototype.getContent;

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
WysiwygEditorBinding.prototype.setValue = WysiwygEditorBinding.prototype.setContent;

/**
 * Get result. This is intended for clientside processing.
 * TODO: could be fun to parse the content into a DOM object as returntype.
 * @implements {IData}
 * @return {string}
 */
WysiwygEditorBinding.prototype.getResult = WysiwygEditorBinding.prototype.getContent;

/**
 * Set result.
 * TODO: could be fun to pass a DOMDocument and present the serialized result.
 * @implements {IData}
 * @param {object} result
 */
WysiwygEditorBinding.prototype.setResult = WysiwygEditorBinding.prototype.setContent;