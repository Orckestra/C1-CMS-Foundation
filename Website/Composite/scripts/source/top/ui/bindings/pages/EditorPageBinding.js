EditorPageBinding.prototype = new PageBinding;
EditorPageBinding.prototype.constructor = EditorPageBinding;
EditorPageBinding.superclass = PageBinding.prototype;

EditorPageBinding.ACTION_ATTACHED 	= "editorpage attached";
EditorPageBinding.ACTION_DIRTY		= "editorpage dirty";
EditorPageBinding.ACTION_CLEAN		= "editorpage clean";
EditorPageBinding.ACTION_SAVE		= "editorpage save";
EditorPageBinding.ACTION_SAVE_AND_PUBLISH = "editorpage save and publish";

/*
 * Special binding IDs, hardcoded by the server goo.
 */
EditorPageBinding.ID_SAVEASBUTTON 	= "saveasbutton";
EditorPageBinding.ID_PREVIEWTAB		= "previewtab";
EditorPageBinding.ID_MAINTABBOX		= "maintabbox";
EditorPageBinding.ID_PREVIEWWINDOW 	= "previewwindow";

/*
 * Postback directives. Matched serverside, don't change!
 */
EditorPageBinding.MESSAGE_SAVE = "save";
EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH = "saveandpublish";
EditorPageBinding.MESSAGE_PERSIST 	= "persist";
EditorPageBinding.MESSAGE_REFRESH 	= "refresh";

/**
 * Magic message.
 * @type {String}
 */
EditorPageBinding.message = null;

/**
 * True while tabbing.
 * @type {boolean}
 */
EditorPageBinding.isTabbing = false;

/**
 * Register open editorpages. Considered private.
 * @type {Map<string><EditorPageBinding>}
 */
EditorPageBinding._registry = new Map ();

/**
 * Register open editor.
 * @param {EditorPagebinding}
 */
EditorPageBinding.register = function ( page ) {

	var map = EditorPageBinding._registry;
	if ( !map.hasEntries ()) {
		top.app.bindingMap.broadcasterHasOpenEditors.enable ();
	}
	map.set ( page.key, page );
}

/**
 * Unregister open editor.
 * @param {EditorPagebinding}
 */
EditorPageBinding.unregister = function ( page ) {

	var map = EditorPageBinding._registry;
	map.del ( page.key );
	if ( !map.hasEntries ()) {
		top.app.bindingMap.broadcasterHasOpenEditors.disable ();
	}
}

/**
 * @class
 */
function EditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorPageBinding" );

	/**
	 * @type {boolean}
	 */
	this.isDirty = false;

	/** The main tabbox!
	 * @type {TabBoxBinding}
	 */
	this._tabBoxBinding = null;

	/**
	 * The preview tab!
	 * @type {TabBinding}
	 */
	this._tabBinding = null;

	/**
	 * The preview window!
	 * @type {WindowBinding}
	 */
	this._windowBinding = null;

	/**
	 * @type {boolean}
	 */
	this._isGeneratingPreview = false;

	/**
	 * @type {boolean}
	 */
	this._isPreviewWindowVisible = false;

	/**
	 * The current postMessage string matching "save" or "persist".
	 */
	this._message = null;

	/**
	 * Messages waiting to be executed as soon
	 * as this._messengers has been emptied.
	 * @deprecated
	 * @type {List<String>}
	 */
	this._messages = null;

	/**
	 * While not empty, incoming postMessages
	 * will be collected in this._messages.
	 * @type {List<PageBinding>}
	 */
	this._messengers = null;

	/**
	 * Hack the preview setup - don't instigate preview while persisting.
	 * @type {boolean}
	 */
	this._isWaitingForPreview = false;

	/**
	 * True while the preview tab is selected. Note that there may not
	 * be a preview window in editor, but only the backend knows this.
	 * @type {boolean}
	 */
	this._isPreviewing = false;
}

/**
 * Identifies binding.
 */
EditorPageBinding.prototype.toString = function () {

	return "[EditorPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingRegister}
 */
EditorPageBinding.prototype.onBindingRegister = function () {

	EditorPageBinding.superclass.onBindingRegister.call ( this );

	this.addActionListener ( Binding.ACTION_DIRTY );
	this.addActionListener ( Binding.ACTION_VALID );
	this.addActionListener ( Binding.ACTION_INVALID );
	this.addActionListener ( EditorPageBinding.ACTION_SAVE );
	this.addActionListener ( EditorPageBinding.ACTION_SAVE_AND_PUBLISH );

	this.addActionListener ( ResponseBinding.ACTION_SUCCESS );
	this.addActionListener ( ResponseBinding.ACTION_FAILURE );
	this.addActionListener ( ResponseBinding.ACTION_OOOOKAY );

	EditorPageBinding.register ( this );

	this._invalidBindings = new Map ();
	this._messengers = new List ();
	this._messages = new List ();
}

/**
 *
 * @overloads {FocusBinding#onBindingDispose}
 */
EditorPageBinding.prototype.onBindingDispose = function () {

	/*
	 * If editor documents gets replaced for whatever reason, this will make
	 * sure that the tab can be closed without prompting a save dialog.
	 */
	this.dispatchAction ( EditorPageBinding.ACTION_CLEAN );

	/*
	 * Cleaning up for various XHTML-aware panels.
	 */
	if ( this._isPreviewWindowVisible == true ) {
		setTimeout ( function () {
			EventBroadcaster.broadcast ( BroadcastMessages.XHTML_MARKUP_OFF );
		}, 250 );
	}

	EditorPageBinding.unregister ( this );
	EditorPageBinding.superclass.onBindingDispose.call ( this );
}

/**
 * @overwrites {PageBinding#onPageInitialize}
 */
EditorPageBinding.prototype.onBeforePageInitialize = function () {

	this._setupPreviewListeners ();
	EditorPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Inititalize save buttons.
 * @overloads {PageBinding#onPageInitialize}
 */
EditorPageBinding.prototype.onPageInitialize = function () {

	EditorPageBinding.superclass.onPageInitialize.call ( this );
	this.enableSaveAs ();
}

/**
 * Setup stuff to generate a preview when the related tab is selected.
 * This should really not be done on a general EditorPageBinding...
 * but we are trapped by the DocumentExecutionContainer.aspx hardcode.
 */
EditorPageBinding.prototype._setupPreviewListeners = function () {

	var box = this.bindingDocument.getElementById ( EditorPageBinding.ID_MAINTABBOX );
	var tab = this.bindingDocument.getElementById ( EditorPageBinding.ID_PREVIEWTAB );
	var win = this.bindingDocument.getElementById ( EditorPageBinding.ID_PREVIEWWINDOW );

	if ( box != null ) {

		this._tabBoxBinding = UserInterface.getBinding ( box );
		this._tabBoxBinding.addActionListener ( TabBoxBinding.ACTION_SELECTED, this );
		this._tabBoxBinding.addActionListener ( TabBoxBinding.ACTION_UNSELECTED, this );

		if ( tab != null && win != null ) { // preview generating stuff

			this._tabBinding	= UserInterface.getBinding ( tab );
			this._windowBinding = UserInterface.getBinding ( win );

			this._windowBinding.addActionListener ( WindowBinding.ACTION_LOADED, this );
			this._windowBinding.addActionListener ( WindowBinding.ACTION_ONLOAD, this );

			this.subscribe ( BroadcastMessages.HIGHLIGHT_KEYWORDS );

			if ( this._tabBinding.isSelected ) {
				this._startPreview ();
			}
		}
	}
}

/**
 * This gets invoked by the associated {@link DockTabBinding}
 * when a save was successfull. This is probably determined by a
 * message on the {@link MessageQueue}.
 */
EditorPageBinding.prototype.onSaveSuccess = function () {

	this.enableSave ( false );
	this.enableSaveAs ();
	this.cleanAllDataBindings ();
	this.isDirty = false;
	EditorPageBinding.message = null; // could have been flipped by PageBinding!
	this.dispatchAction ( EditorPageBinding.ACTION_CLEAN );
}

/**
 * When a dirty event is registered, update the relevant {@link BroadcasterBinding}.
 * A specialized dirty event is passed on to the containing {@link DockBinding}.
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
EditorPageBinding.prototype.handleAction = function (action) {

	EditorPageBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		case EditorPageBinding.ACTION_SAVE:
			this.postMessage(EditorPageBinding.MESSAGE_SAVE);
			// don't consume - DockTabBinding is listening!
			break;

		case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
			this.postMessage(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
			break;

		case ResponseBinding.ACTION_OOOOKAY:
			if (Application.isDeveloperMode) {
				// alert ( "OOOOKAY "  + binding.bindingDocument.title );
			}
			break;

		case ResponseBinding.ACTION_SUCCESS:

			if (Application.isDeveloperMode) {
				// alert ( "SUCCESS " + binding.bindingDocument.title );
			}

			if (this._messengers.hasEntries()) {

				var index = -1;
				this._messengers.each(function (page) {
					var res = page.bindingWindow == binding.bindingWindow;
					if (res) {
						page.bindingWindow.DataManager.isDirty = false;
						if (index == -1) {
							index = 0;
						}
					} else {
						index++;
					}
					return res;
				});
				if (index > -1) {
					this._messengers.del(index);
				}
				if (!this._messengers.hasEntries()) {
					switch (this._message) {
						case EditorPageBinding.MESSAGE_SAVE:
							this._saveEditorPage();
							break;
						case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
							this._saveAndPublishEditorPage();
							break;
						case EditorPageBinding.MESSAGE_PERSIST:
							this._refresh(); // refresh after "persist"
							this._message = null;
							if (this._isWaitingForPreview) { // please unhack this!
								this._isWaitingForPreview = false;
								this._startPreview();
							}
							break;
					}
				}

			} else {
				this._refresh(); // refresh after "save"
				this._message = null;
			}
			break;

		case ResponseBinding.ACTION_FAILURE:
			if (Application.isDeveloperMode) {
				// alert ( "FAILURE " + binding.bindingDocument.title );
			}
			this._message = null;
			this._messengers = new List();
			break;

		case Binding.ACTION_DIRTY:
			if (this.canSave()) {
				if (!this.isDirty) {
					this.enableSave(true);
					this.isDirty = true;
					this.dispatchAction(EditorPageBinding.ACTION_DIRTY);
				}
			}
			action.consume();
			break;

		case Binding.ACTION_INVALID:
			this.enableSave(false);
			this._invalidBindings.set(binding.key, binding);
			if (binding instanceof FieldsBinding) {
				this._updateStatusBar();
			}
			break;

		case Binding.ACTION_VALID:
			this._invalidBindings.del(binding.key);
			if (binding instanceof FieldsBinding) {
				this._updateStatusBar();
			}
			if (!this._invalidBindings.hasEntries()) {
				this.enableSave(true);
			}
			break;

		case TabBoxBinding.ACTION_SELECTED:
			if (binding == this._tabBoxBinding) {
				if (this._windowBinding != null) { // preview stuff
					var tab = binding.getSelectedTabBinding();
					if (tab.getID() == EditorPageBinding.ID_PREVIEWTAB) {
						this._isPreviewing = true;
						if (this._messengers.hasEntries()) {
							this._isWaitingForPreview = true;
						} else {
							this._startPreview();
						}
					} else if (this._isPreviewing) {
						this._isPreviewing = false;
						this._stopPreview();
					}
				}
			}
			action.consume();
			break;

		case TabBoxBinding.ACTION_UNSELECTED:
			if (binding == this._tabBoxBinding) {
				this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
			}
			action.consume();
			break;

		case WindowBinding.ACTION_LOADED: // preview

			if (binding == this._windowBinding) {
				if (this._isGeneratingPreview == true) {
					this._generatePreview();
					this._isGeneratingPreview = false;
				}
				action.consume();
			}
			break;

		case WindowBinding.ACTION_ONLOAD: // preview

			/*
			* TODO: Consider how this might impact focus in layout...
			*/
			if (binding == this._windowBinding) {

				/*
				* First hit is the postback document. This is neglected.
				*/
				if (binding.getContentWindow().isPostBackDocument != true) {

					/*
					* Disable new-version lookup. Cache enabled by
					* {@link EditorPageBinding#_startPreview}
					*/
					if (Client.isPrism) {
						Prism.enableCache();
					}

					/*
					* Note that this here code is invoked twice
					* when the preview is first generated!
					*/
					var self = this;
					setTimeout(function () { // COPYPASTED ABOVE!
						Application.unlock(self);
					}, 100);

					/*
					* Broadcast contained markup for
					* various panels to intercept.
					*/
					if (EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)) {
						var markup = WindowBinding.getMarkup(this._windowBinding);
						EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON, markup);
					}
				}
			}
			break;
	}
}

/**
 * Can we save? This question has been made dependant on
 * the existance of a save-button inside the document.
 * TODO: should this reflect thie buttons isDisabled state?
 * @return {boolean}
 */
EditorPageBinding.prototype.canSave = function () {

	return this.bindingWindow.bindingMap.savebutton != null;
}

/**
 * Ignite the save routine. For reasons of NET postback drama,
 * this must be delegated by emulating a click on the save button.
 */
EditorPageBinding.prototype.doSave = function () {

	var button = this.bindingWindow.bindingMap.savebutton;
	if ( button != null && !button.isDisabled ) {
		button.fireCommand ();
	}
}

EditorPageBinding.prototype._wakeAndValidateAllDataBindings = function (callback) {

	var dataBindings = this.bindingWindow.DataManager.getAllDataBindings();
	var listLength = dataBindings.getLength();
	var wokenBindings = 0;

	var validateCallback = function () {
		if (this.validateAllDataBindings( true )) {
			callback();
		}
	}.bind(this);

	function awakeCallback() {
		wokenBindings += 1;
		if (wokenBindings === listLength) {
			validateCallback();
		}
	}

	while (dataBindings.hasNext()) {
		var binding = dataBindings.getNext();
		if (binding.isRequired || binding.getProperty('required')) {
			while (binding && !binding.isLazy) {
				binding = binding.getAncestorBindingByType(Binding);
			}
			if (!binding) {
				// No lazy ancestor
				awakeCallback();
			} else {
				binding.wakeUp(awakeCallback);
			}
		} else {
			awakeCallback();
		}
	}
};

/**
 * Performs the final save transaction.
 */
EditorPageBinding.prototype._saveEditorPage = function (publish) {

	this._wakeAndValidateAllDataBindings(function () {
		this.bindingWindow.DataManager.isDirty = false;
		var postback = this.bindingWindow.bindingMap.__REQUEST;
		if (postback != null) {
			var signal = publish ?
				EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH :
				EditorPageBinding.MESSAGE_SAVE;
			postback.postback(signal);
		} else {
			this.logger.error("Save " + publish ? "and publish " : "" + "aborted: " +
				"Could not locate RequestBinding");
		}
	}.bind(this));
};

/**
* Performs the final save and publish transaction.
*/
EditorPageBinding.prototype._saveAndPublishEditorPage = function () {
	this._saveEditorPage(true);
};

/**
 * Refresh page!
 */
EditorPageBinding.prototype._refresh = function () {

	if ( Application.isDeveloperMode ) {
		// alert ( "REFRESHING ALL" );
	}
	this.postMessage ( EditorPageBinding.MESSAGE_REFRESH );
}

/**
 * Post message to this frame and descendant frames.
 * TODO: collect messages added while messaging?
 * @overwrites {PageBinding#postMessage}
 * @param {String} message
 * @param {List<Binding>} list
 */
EditorPageBinding.prototype.postMessage = function (message) {

	this._message = null;

	switch (message) {

		case EditorPageBinding.MESSAGE_SAVE:
		case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
			this._postMessageToDescendants(message, this._messengers);
			if (!this._messengers.hasEntries()) {
				if (message == EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH) {
					this._saveAndPublishEditorPage();
				}
				else {
					this._saveEditorPage();
				}
			} else {
				this._message = message;
			}
			break;

		case EditorPageBinding.MESSAGE_PERSIST:
			this._message = message;
			EditorPageBinding.superclass.postMessage.call(this, message, this._messengers);
			break;

		case EditorPageBinding.MESSAGE_REFRESH:
			EditorPageBinding.superclass.postMessage.call(this, message, this._messengers);
			break;
	}
};

/**
 * @implements {IBroadcastListener}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
EditorPageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	EditorPageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	switch ( broadcast ) {
		case BroadcastMessages.HIGHLIGHT_KEYWORDS :
			var keywords = arg;
			if ( UserInterface.isBindingVisible ( this._windowBinding )) {
				WindowBinding.highlightKeywords ( this._windowBinding, keywords );
			}
			break;
	}
}

/**
 * Invoked be ancestor {IActivatable} when activated.
 * @overloads {FocusBinding#onActivate}
 */
EditorPageBinding.prototype.onActivate = function () {

	EditorPageBinding.superclass.onActivate.call ( this );

	if ( this._isPreviewWindowVisible == true ) {
		EventBroadcaster.broadcast ( BroadcastMessages.XHTML_MARKUP_ACTIVATE );
	}
}

/**
 * Invoked be ancestor {IActivatable} when deactivated.
 * @overloads {FocusBinding#onDectivate}
 */
EditorPageBinding.prototype.onDeactivate = function () {

	EditorPageBinding.superclass.onDeactivate.call ( this );

	if ( this._isPreviewWindowVisible == true ) {
		EventBroadcaster.broadcast ( BroadcastMessages.XHTML_MARKUP_DEACTIVATE );
	}
}

/**
 * Display invalid labels in statusbar. The backend spawns a FieldsBinding
 * for each FieldGroupBinding, so this has been made slightly complicated.
 * This method is invoked whenever a FieldsBinding reports invalid or valid.
 * @param {boolean} isShow
 */
EditorPageBinding.prototype._updateStatusBar = function () {

	var labels = new List ();
	this._invalidBindings.each ( function ( key, binding ) {
		var list = binding.getInvalidLabels ();
		if ( list ) {
			list.each ( function ( label ) {
				labels.add ( label );
			});
		}
	});
	if ( labels.hasEntries ()) {
		var output = "";
		while ( labels.hasNext ()) {
			output += labels.getNext ().toLowerCase ();
			if ( labels.hasNext ()) {
				output += ", ";
			} else {
				output += ".";
			}
		}
		var string = StringBundle.getString ( "ui", "Website.App.StatusBar.ErrorInField" );
		StatusBar.error ( string + " " + output );
	} else {
		StatusBar.clear ();
	}
}

/**
 * Start preview process. This can be invoked by either a tab selection
 * or when the page inititalizes (if the tab is preselected).
 */
EditorPageBinding.prototype._startPreview = function () {

	//Application.lock ( this ); // unlocked when preview is loaded
	this._isGeneratingPreview = true;

	if ( Client.isPrism ) {
		Prism.disableCache (); // enable new-version lookup!
	}

	this._windowBinding.setURL ( WindowBinding.POSTBACK_URL );
}

/**
 * Stop preview.
 */
EditorPageBinding.prototype._stopPreview = function () {

	this._windowBinding.reset ();
	//if ( Application.isLocked ) { // occurs on rapid tabshift using keyboard
	//	Application.unlock ( this );
	//}
}

/**
 * Enable-disable save button.
 * @param {boolean} isEnable
 */
EditorPageBinding.prototype.enableSave = function ( isEnable ) {

	var broadcasterElement = this.bindingDocument.getElementById ( "broadcasterCanSave" );
	if ( broadcasterElement ) {
		var broadcasterBinding = UserInterface.getBinding ( broadcasterElement );
		if ( isEnable ) {
			broadcasterBinding.enable ();
		} else {
			broadcasterBinding.disable ();
		}
	} else {
		throw new Error ( "A required BroadcasterBinding could not be located." );
	}
}

/**
 * Manually enable saveas button (observes same broadcaster as save button).
 */
EditorPageBinding.prototype.enableSaveAs = function () {

	var button = this.bindingDocument.getElementById (
		EditorPageBinding.ID_SAVEASBUTTON
	);
	if ( button != null ) {
		UserInterface.getBinding ( button ).enable ();
	}
}

/**
 * Handle invalid data.
 * TODO: Something intelligent.
 */
EditorPageBinding.prototype.handleInvalidData = function () {

	this.logger.error ( "INVALID DATA :(" );
	if ( this._isGeneratingPreview ) {
		this._isGeneratingPreview = false;
		this._windowBinding.error ();
		this._message = null;
		this._messengers = new List ();
		Application.unlock ( this );
	}
}

/**
 * Generate preview.
 */
EditorPageBinding.prototype._generatePreview = function () {

	var title = this._windowBinding.getContentDocument ().title;

	if ( title == WindowBinding.POSTBACK_TITLE ) {

		if ( this.validateAllDataBindings ()) {

			this.manifestAllDataBindings ();

			/*
			 * Collect form data for postback into alien document.
			 * Notice that __EVENTTARGET data is handled manually.
			 */
			var callbackid = this._tabBinding.getCallBackID ();

			var list = new List ();
			new List ( this.bindingDocument.forms [ 0 ].elements ).each (
				function ( element ) {
					if ( element.name == "__EVENTTARGET" && callbackid ) {
						element.value = callbackid;
					}
					list.add ({
						name : element.name,
						value : element.value
					});
				}
			);

			/*
			 * Submit to iframe. Note that we store the
			 * list in a variable for later use.
			 */
			var url = String ( this.bindingDocument.location );
			this._windowBinding.getContentWindow ().submit ( list, url );
			this._latestPostbackList = list.reset ();

		} else {

			this.handleInvalidData ();
		}
	}
}
