VisualEditorSimpleToolBarBinding.prototype = new VisualEditorToolBarBinding;
VisualEditorSimpleToolBarBinding.prototype.constructor = VisualEditorSimpleToolBarBinding;
VisualEditorSimpleToolBarBinding.superclass = VisualEditorToolBarBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function VisualEditorSimpleToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorSimpleToolBarBinding" );

	/**
	 * Indexing toolbarbuttons by value of the cmd attribute.
	 * @type {Map<string><EditorToolBarButtonBinding>}
	 */
	this._buttons = null;

	/**
	 * Supress nodechange instructions while toolbar is handled.
	 * @type {boolean}
	 */
	this._isToolBarUpdate = false;

	/**
	 * @type {boolean}
	 */
	this._isAlignmentDisabled = false;

	/**
	 * @type {HTMLElement}
	 *
	this._element = null;

	/**
	 * @type {String}
	 *
	this._classname = null;
	*/

	/**
	 * @type {List<ToolBarButtonBinding>}
	 */
	this.priorities = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorSimpleToolBarBinding.prototype.toString = function () {

	return "[VisualEditorSimpleToolBarBinding]";
}

/**
 * Hookup broadcaster integration.
 * @overloads {ToolBarBinding#onBindingRegister}
 */
VisualEditorSimpleToolBarBinding.prototype.onBindingRegister = function () {

	VisualEditorSimpleToolBarBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
	this.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED );
}

/**
 * @overloads {ToolBarBinding#onBindingAttach}
 */
VisualEditorSimpleToolBarBinding.prototype.onBindingAttach = function () {

	/*
	 * Fetch buttons from server.
	 */
	VisualEditorSimpleToolBarBinding.superclass.onBindingAttach.call ( this );

	/*
	 * toolbar buttons index.
	 */
	this._buttons = new Map ();

	/*
	 * Index existing buttons.
	 */
	var buttons = this.getDescendantBindingsByLocalName ( "toolbarbutton" );
	while ( buttons.hasNext ()) {
		var button = buttons.getNext ();
		var cmd = button.getProperty ( "cmd" );
		if ( cmd != null ) {
			this._buttons.set (
				cmd,
				button
			);
		}
	}

	/*
	 * Mount and index configuration buttons.
	 */
	var groups = this._tinyTheme.formatGroups;
	groups.reverse ().each ( function ( group ) {
		var groupBinding = ToolBarGroupBinding.newInstance ( this.bindingDocument );
		group.each ( function ( format ) {
			if ( format.button != null ) {
				var button = this._getButton ( format )
				groupBinding.add ( button );
				if ( this._buttons.has ( format.id )) {
					throw "Duplicate format ID: " + format.id;
				} else {
					this._buttons.set (
						format.id,
						button
					);
				}
			}
		}, this );
		this.addFirst ( groupBinding );
		groupBinding.attachRecursive ();
	}, this );

	/*
	 * Compute priorities
	 */
	var array = [];
	this._buttons.each ( function ( key, button ) {
		if ( button.format != null ) {
			array.push ( button );
		}
	});
	array.sort ( function ( b1, b2 ) {
		var p1 = b1.format.priority;
		var p2 = b2.format.priority;
		return p2 - p1;
	});
	this.priorities = new List ( array );

	/*
	 * Hookup on theme transmission.
	 */
	this._tinyTheme.registerNodeChangeHandler ( this );

	/*
	 * Hookup on TinyMCE internal events.
	 */
	DOMEvents.addEventListener ( this._tinyInstance.getDoc (), DOMEvents.MOUSEUP, this );
	DOMEvents.addEventListener ( this._tinyInstance.getDoc (), DOMEvents.KEYUP, this );
}

/**
 * Build button.
 * @param {Format} format
 * @returns {EditorToolBarButtonBinding}
 */
VisualEditorSimpleToolBarBinding.prototype._getButton = function ( format ) {

	var button = EditorToolBarButtonBinding.newInstance ( this.bindingDocument );

	var cmd = format.id;
	var label = format.button.label;
	var image = format.button.image;
	var notes = format.button.notes;

	if ( label != null && label != "" ) {
		button.setLabel ( label );
	}
	if ( image != null && image != "" ) {
		button.setImage ( Constants.CONFIGROOT + image );
	}
	if ( notes != null && notes != "" ) {
		button.setToolTip ( notes );
	}

	button.disable ();
	button.setProperty ( "cmd", cmd );
	button.setType ( ButtonBinding.TYPE_CHECKBUTTON );
	button.format = format;

	return button;
}

/**
 * Handle node change.
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
VisualEditorSimpleToolBarBinding.prototype.handleNodeChange = function ( element ) {

	if ( !this._isToolBarUpdate ) {

		var hasSelection = this._editorBinding.hasSelection();
		//Buttons should be always enabled for ipad, becouse iPad does not always handle selection changes.
		if (Client.isPad) {
			hasSelection = true;
		}
		// uncheck buttons and disable some buttons
		this._buttons.each ( function ( key, button ) {
			if ( button.isChecked ) {
				button.uncheck ( true );
			}
			var format = button.format;
			if ( format != null ) {
				if ( format.props.inline != null ) {
					button.setDisabled ( !hasSelection );
				} else if ( format.props.block != null ) {
					button.setDisabled ( hasSelection );
				} else {
					button.enable ();
				}
			}
		}, this )

		var tiny = this._tinyInstance;

		//skip rendering functions objects
		if (VisualEditorBinding.isReservedElement(element)) {
			this._buttons.each(function (key, button) {
				var format = button.format;
				if (format != null) {
					if (!button.isDisabled) {
						button.disable();
					}
				}
			})
		}
		else
			// disable more buttons
			this._buttons.each ( function ( key, button ) {
				if ( !button.isDisabled ) {
					var format = button.format;
					if ( format != null ) {
						if ( tiny.formatter.canApply ( format.id )) {
							button.enable ();
						} else {
							button.disable ();
						}
					}
				}
			})

		// check buttons
		this.priorities.each ( function ( button ) {
			var result = true;
			if ( !button.isDisabled ) {
				if ( tiny.queryCommandState ( button.cmd )) {
					button.check ( true );
					result = false;
				} else {
					button.uncheck ( true );
				}
			}
			return result;
		}, this );


		if (this._buttons.has("InsertUnorderedList"))  {
			// hack this button
			// TODO: less hacking
			var b1 = this._buttons.get ( "InsertUnorderedList" );
			if ( tiny.queryCommandState ( b1.cmd )) {
				b1.check ( true );
			}
		}

		if (this._buttons.has("InsertUnorderedList")) {
			// hack this button
			// TODO: less hacking
			var b2 = this._buttons.get("InsertOrderedList");
			if (tiny.queryCommandState(b2.cmd)) {
				b2.check(true);
			}
		}


		if (this._buttons.has("Indent") && this._buttons.has("Outdent")) {
			var indentButton = this._buttons.get("Indent");
			var outdentButton = this._buttons.get("Outdent");
			var isEnableIndent = false;
			var isEnableOutdent = false;
			var node = element;
			do {
				if (node.nodeType == Node.ELEMENT_NODE) {
					if (node.nodeName.toLowerCase() == "ul" || node.nodeName.toLowerCase() == "ol") {
						isEnableIndent = true;
						isEnableOutdent = true;
						break;
					}
				}
			} while ((node = node.parentNode) != null);

			indentButton.setDisabled(!isEnableIndent);
			outdentButton.setDisabled(!isEnableOutdent);
		}

		if (this._buttons.has("compositeInsertLink")) {

			var linkButton = this._buttons.get("compositeInsertLink");
			var unLinkButton = this._buttons.get("unlink");
			var isEnableLink = hasSelection;

			var isEnableUnlink = false;

			var node = element;
			do {
				if (node.nodeType == Node.ELEMENT_NODE) {
					if (node.nodeName.toLowerCase() == "a") {
						isEnableLink = true;
						isEnableUnlink = true;
						break;
					}
				}
			} while ((node = node.parentNode) != null);

			linkButton.setDisabled(!isEnableLink);
			unLinkButton.setDisabled(!isEnableUnlink);
		}
	}
}

/**
 * This handles all button commands.
 * @overloads {WysiwygEditorToolBarBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
VisualEditorSimpleToolBarBinding.prototype.handleAction = function ( action ) {

	VisualEditorSimpleToolBarBinding.superclass.handleAction.call ( this, action );

	var button = null;
	var binding = action.target;

	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			button = binding;
			break;
		case RadioGroupBinding.ACTION_SELECTIONCHANGED :
			button = binding.getCheckedButtonBinding ();
			break;
	}
	if ( button ) {
		var self = this;
		setTimeout ( function () {
			self._handleButton ( button );
		}, 0 );
	}
}

/**
 * Handle button.
 * @param {EditorToolBarButton} button
 */
VisualEditorSimpleToolBarBinding.prototype._handleButton = function ( button ) {

	if ( button.cmd != null ) {

		var isRelay = true;
		var isUndoRedo = false;

		switch ( button.cmd ) {

			case "compositeswitchmode" :
				this.bindingWindow.bindingMap.editorpage.switchEditingMode ();
				isRelay = false;
				break;

			case "Undo" :
				this._tinyInstance.undoManager.undo ();
				this._editorBinding.checkForDirty ();
				isUndoRedo = true;
				isRelay = false;
				break;

			case "Redo" :
				this._tinyInstance.undoManager.redo ();
				this._editorBinding.checkForDirty ();
				isUndoRedo = true;
				isRelay = false;
				break;

			case "unlink" :
				this._buttons.get ( "compositeInsertLink" ).disable ();
				this._buttons.get ( "unlink" ).disable ();
				this._editorBinding.checkForDirty ();
				break;

			case "compositeCleanup" :
				this._cleanup ();
				this._editorBinding.checkForDirty ();
				isRealy = false;
				break;
		}

		if ( isUndoRedo ) {
			this._editorBinding.blurEditor ();
		}

		if ( isRelay ) {

			/*
			 * Relay command execution to TinyMCE. Note that
			 * we disable nodechange awareness for the duration
			 * of this operation (leads to weird toolbar behavior).
			 */
			this._isToolBarUpdate = true;

			/*
			 * Not the most elegant way to handle this...
			 */
			if ( button.format != null ) {
				if ( button.isChecked ) {
					if ( button.format != null && button.format.isRadio ) {
						var group = UserInterface.getBinding ( button.bindingElement.parentNode );
						var buttons = group.getDescendantBindingsByLocalName ( "toolbarbutton" );
						buttons.each ( function ( b ) {
							if ( b != button ) {
								this._tinyInstance.formatter.remove ( b.cmd );
								b.uncheck ( true );
							}
						}, this );
					}
					this._tinyInstance.formatter.apply ( button.cmd );
				} else {
					this._tinyInstance.formatter.remove ( button.cmd );
				}
			} else {
				this._editorBinding.handleCommand (
					button.cmd, button.val, button.gui
				);
			}

			var self = this;
			setTimeout(function () {
				//self._editorBinding.restoreEditorFocus();
				self._isToolBarUpdate = false;
			}, 0 );
		}
	}
}

/**
 * Disabling alignement functions when eg. a function or field is selected.
 * @param {boolean} isDisable
 */
VisualEditorSimpleToolBarBinding.prototype._disableAlignment = function ( isDisable ) {

	if ( isDisable != this._isAlignmentDisabled ) {
		var buttons = this._buttons;
		new List ([ "JustifyLeft", "JustifyRight", "JustifyCenter", "JustifyFull" ]).each (
			function ( cmd ) {
				var button = buttons.get ( cmd );
				if ( button.isDisabled != isDisable ) {
					button.setDisabled ( isDisable );
				}
			}
		);
		this._isAlignmentDisabled = isDisable;
	}
}

/**
 * Exposing buttons so that outside fellows can control the toolbar.
 * @param {string} cmd
 * @return {EditorToolBarButtonBinding}
 */
VisualEditorSimpleToolBarBinding.prototype.getButtonForCommand = function ( cmd ) {

	return this._buttons.get ( cmd );
}

/**
 * Disable buttons when editor is unactivated.
 * TODO: To allow completely custom buttons, maybe move this to button itself?
 * @param {boolean} isDisabled
 */
VisualEditorSimpleToolBarBinding.prototype.setDisabled = function ( isDisabled ) {

	/*
	 * Timeout should allow another view to focus
	 * any databinding before we update buttons.
	 */
	var self = this;
	setTimeout ( function () {
		self._buttons.each ( function ( key, button ) {
			switch ( button.cmd ) {
				case "Undo" :
				case "Redo" :
				case "compositeswitchmode" :
					// these should always be enabled...
					break;
				case "compositeInsertLink" :
				case "unlink" :
					if ( isDisabled ) {
						button.disable ();
					}
					break;
				case "InsertUnorderedList" :
				case "InsertOrderedList" :
					button.setDisabled ( isDisabled );
					break;
				default :
					if ( isDisabled ) {
						if ( button.format != null ) {
							if ( button.isChecked ) {
								button.uncheck ( true );
							}
							button.disable ();
						}
					}
					// button.setDisabled ( isDisabled );
					break;
			}
		});
	}, 10 );

	// this._element = null;
}

VisualEditorSimpleToolBarBinding.prototype._cleanup = function () {

	//alert ( this + ": TODO!" );

	var markup = this._editorBinding.getValue ();
	// alert ( this + ":\n\n" + markup );
}