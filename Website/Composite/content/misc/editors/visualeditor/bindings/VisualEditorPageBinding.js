VisualEditorPageBinding.prototype = new PageBinding;
VisualEditorPageBinding.prototype.constructor = VisualEditorPageBinding;
VisualEditorPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function VisualEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorPageBinding" );
	
	/**
	 * The containing editor.
	 * @type {WysiwygEditorBinding}
	 */
	this._editorBinding = null;
	
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
	 * Flipped when editor is targetted by the mouse or something.
	 * TODO: implement something!
	 * @type {boolean}
	 */
	this._isActive = false;
	
	/**
	 * @type {boolean}
	 */
	this.isSourceMode = false;
	
	/**
	 * @type {SourceEditorBinding}
	 */
	this._sourceEditor = null;
	
	/**
	 * TODO: this seems to have no effect!
	 */
	this._isFocusManager = false;
	
	/**
	 * @type {object}
	 */
	this._dirtyInterval = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorPageBinding.prototype.toString = function () {

	return "[VisualEditorPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingAttach}
 */
VisualEditorPageBinding.prototype.onBindingAttach = function () {
	
	VisualEditorPageBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener( CodeMirrorEditorBinding.ACTION_INITIALIZED );
}

/**
 * Register for initialization when TinyMCE is loaded.
 * @overloads {PageBinding#onPageInitialize}
 */
VisualEditorPageBinding.prototype.onBeforePageInitialize = function () {
	
	VisualEditorPageBinding.superclass.onBeforePageInitialize.call ( this );
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Clear dirty interval on dispose.
 * @overloads {PageBinding#onBindingDispose}
 */
VisualEditorPageBinding.prototype.onBindingDispose = function () {
	
	VisualEditorPageBinding.superclass.onBindingDispose.call ( this ); 
	
	if ( this._dirtyInterval != null ) {
		clearInterval ( this._dirtyInterval );
	}
	
	/*
	 * This is supposed to unleak memory.
	 * http://wiki.moxiecode.com/index.php/TinyMCE:API/tinymce.Editor/destroy
	 */
	if ( this._tinyInstance != null ) {
		this._tinyInstance.destroy (true);
	}
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
VisualEditorPageBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	/*
	 * Intercept undo-redo.
	 */
	var self = this;
	instance.on('Undo',  function () {
		self.updateUndoBroadcasters ();
		editor.checkForDirty ();
	});
	instance.on('Redo',  function () {
		self.updateUndoBroadcasters ();
		editor.checkForDirty ();
	});
	
	/*
	 * Register content change handler to support undo-redo.
	 */
	theme.registerContentChangeHandler ({
		handleContentChange: function () {
			setTimeout(function () {
				self.updateUndoBroadcasters();
			}, 0);
		}
	});
	
	/*
	 * Get ready to do the dirty thing when stuff is dragged around and images are resized. 
	 * Stuff like this cannot be evented in IE, so we must resort to a primitive timeout.
	 */
	if ( Client.isMozilla ) {
		var isWaiting = false;
		DOMEvents.addEventListener ( this._tinyInstance.getDoc (), "DOMSubtreeModified", {
			handleEvent : function () {
				if ( !isWaiting ) {
					isWaiting = true;
					setTimeout ( function () {
						editor.checkForDirty ();
						isWaiting = false;
					}, 100 );
				}
			}
		});
	} else {
		this._dirtyInterval = setInterval ( function () {
			editor.checkForDirty ();
		}, 1500 );
	}
}

/**
 * Validate. Always validates true when in visual mode.
 * @return {boolean}
 */
VisualEditorPageBinding.prototype.validate = function () {
	
	var result = true;
	
	/*
	 * Validate source code?
	 */
	if ( this.isSourceMode == true ) {
		result = this._sourceEditor.validate (); 
	}
	return result;
}

/**
 * @param {boolean} isShow
 */
VisualEditorPageBinding.prototype.showEditor = function ( isShow ) {
	
	/**
	 * Visual editor cover.
	 */
	var cover = bindingMap.tinycover;
	if ( cover != null ) {
		if ( isShow ) {
			cover.hide ();
		} else {
			cover.show ();
		}
	}
	
	/**
	 * Source editor cover.
	 */
	var editor = this._sourceEditor;
	if ( editor != null ) {
		editor.cover ( !isShow );
	}
};

/**
 * Switch to either wysiwyg or source code editing.
 * Invoked by the {@link WysigwygEditorToolBarBinding}
 * @see {VisualEditorPageBinding#_buildSwitchButton}
 */
VisualEditorPageBinding.prototype.switchEditingMode = function () {
	
	var self = this;
	Application.lock ( self );
	setTimeout ( function () {
		self._switchMode ();
		setTimeout ( function () {
			Application.unlock ( self );
		}, 0 );
	}, 0 );
}

/**
 * Switch editing mode.
 */
VisualEditorPageBinding.prototype._switchMode = function () {
	
	var decks = this.bindingWindow.bindingMap.decks;
	var isSwitchAllowed = true;
	
	/*
	 * Note double validation. First we check if the source editor 
	 * has valid code. Then we see if visual editor will accept it.
	 * The source editor may not be loaded now, see below.
	 */
	if ( this._sourceEditor != null ) {
		isSwitchAllowed = this._sourceEditor.validate ();
		if ( isSwitchAllowed == true ) {
			if ( !this._synchronizeSwitch ()) {
				isSwitchAllowed = false;
			}
		}
	}
	
	/*
	 * This will attach and load the (lazy) sourceeditor on first invoke. 
	 */
	if ( isSwitchAllowed ) {
		var currentID = decks.getSelectedDeckBinding ().getID ();
		decks.select (
			currentID == "sourcedeck" ? "designdeck" : "sourcedeck"
		);
	}
}

/**
 * Switch to either wysiwyg or source code editing, transferring content from one 
 * to the other. This may not always succeed, in which case the deck will not shift.
 * @param {boolean} isNotSwitching True if the editing mode is not supposed to switch.
 * @return {boolean} True for smooth switch.
 */
VisualEditorPageBinding.prototype._synchronizeSwitch = function () {
	
	var content = this.getContent ();
	this.isSourceMode = !this.isSourceMode;
	var isSuccess = this.setContent ( content );
	if ( !isSuccess ) {
		this.isSourceMode = !this.isSourceMode;
	} else {
		
		/*
		 * Hide "flash-of-previous-code"
		 * when switching to source editor.
		 */
		if ( this._sourceEditor != null ) {
			var self = this;
			setTimeout ( function () {
				self._sourceEditor.cover ( !self.isSourceMode );
			}, 200 )
			
		}
	}
	
	/*
	 * Hacks ohoy! For some absurd reason, the toolbarbutton images are hidden 
	 * in Explorer after a switch to source editor. This seems to have been 
	 * introduced after adding the fading cover. Anyhow, this stunt will fix it. 
	 */
	if ( Client.isExplorer ) {
		if ( !this.isSourceMode ) {
			var box = this.bindingWindow.bindingMap.toolbarsbox;
			box.bindingElement.style.display = "none";
			box.bindingElement.style.display = "block";
		}
	}
	
	return isSuccess;
}

/**
 * Get content. Some garbage markup is eliminated by XSLT, anticipating 
 * the users intention to create an all empty page.
 * @return {string}
 */
VisualEditorPageBinding.prototype.getContent = function () {

	var result = null;
	if ( this.isSourceMode == true ) {
		result = this._sourceEditor.getValue ();
	} else {
		var html = this._tinyInstance.getContent({ format: 'raw' });
		var WEBKITBAD = '"="">'; // what on earth? invalid innerHTML!
		if ( html.indexOf ( WEBKITBAD ) >-1 ) {
			html = html.replace ( /\"=\"\">/g, ">" );
		}
		result = this._editorBinding.normalizeToDocument ( 
			VisualEditorBinding.getStructuredContent ( html )
		);
	}
	return result;
}

/**
 * Set content. Note that content should *always* be provided as structured markup, not 
 * Tiny markup. This method is invoked by the containing {@link VisualEditorBinding}
 * @param {string} content
 * @return {boolean} True if content can be mounted.
 */
VisualEditorPageBinding.prototype.setContent = function ( content ) {
	
	var isSuccess = true;
	
	if ( this.isSourceMode ) {
		
		/*
		 * While old pages (with no HEAD section) are updated, 
		 * notmalizeToDocument should be enabled here so that 
		 * switch between placeholders in source mode works.
		 */
	    content = this._editorBinding.normalizeToDocument(  content );
	    if ( content == null || content == "" ) {
	    	
	    	// this may happen in WebKit...
	    	content = "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head></head>\n\t<body></body>\n</html>";
	    }
	    content = decodeURIComponent( MarkupFormatService.AutoIndentDocument( encodeURIComponent( content )));
		this._sourceEditor.setValue ( content );
		
	} else {
		
		/*
		 * Isolate the BODY section.
		 */
		content = this._editorBinding.extractBody ( content );
		
		/*
		 * Inject to TinyMCE.
		 */
		content = VisualEditorBinding.getTinyContent ( content, this._editorBinding );
		if ( content != null ) {
			this._tinyInstance.setContent(content, { format: 'raw' });
			this._editorBinding.resetUndoRedo ();
			this._editorBinding._checksum = this._editorBinding.getCheckSum (); // ARGH
		} else {
			isSuccess = false;
		}
	}
	
	return isSuccess;	
};

/**
 * @implements {IActionListner}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
VisualEditorPageBinding.prototype.handleAction = function ( action ) {
	
	VisualEditorPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {

		case CodeMirrorEditorBinding.ACTION_INITIALIZED:
			
			this._sourceEditor = binding;
			this._buildSwitchButton ();
			
			var cover = this.bindingWindow.bindingMap.sourcecover;
			
			/*
			 * Timeout saves the day.
			 * TODO: handle illegal content?
			 */
			var self = this;
			setTimeout ( function () {
				if ( self._synchronizeSwitch ()) {
					setTimeout ( function () {
						cover.hide ();
					}, 100 );
				} else {
					throw "Illegal content";
				}
			}, Client.isExplorer == true ? 500 : 0 );
			break;
	}
}

/**
 * Injecting the switch-button on the sourceeditor toolbar.
 */
VisualEditorPageBinding.prototype._buildSwitchButton = function () {

	var win = this._sourceEditor.getContentWindow ();
	var doc = this._sourceEditor.getContentDocument ();
	
	var button = ToolBarButtonBinding.newInstance ( doc );
	button.isEditorControlBinding = false;
	button.setLabel ( StringBundle.getString ( "Composite.Web.VisualEditor", "ToolBar.LabelWysiwyg" ));
	button.flip ( true );
	button.imageProfile = new ImageProfile ({
		image : "${icon:editor-designview}",
		imageDisabled : "${icon:editor-designview-disabled}" 
	});

	var self = this;
	button.oncommand = function () {
		self.switchEditingMode ();
	};
	
	var toolbar = win.bindingMap.toolbar;
	if ( toolbar != null ) {
		win.bindingMap.toolbar.addRight ( button );
		button.attach ();
		
		/*
		// pending https://bugzilla.mozilla.org/show_bug.cgi?id=602484
		if ( !toolbar.isVisible ) {
			toolbar.show ();
			this.reflex ();
		}
		*/
	}
}

/**
 * Invoked by {@link VisualEditorBinding} and {@link VisualEditorSimpleToolBarBinding}
 */
VisualEditorPageBinding.prototype.updateUndoBroadcasters = function () {
	
	var manager = this._tinyInstance.undoManager;
	var undo = this.bindingWindow.bindingMap.broadcasterCanUndo;
	var redo = this.bindingWindow.bindingMap.broadcasterCanRedo;
	
	undo.setDisabled ( !manager.hasUndo ());
	redo.setDisabled ( !manager.hasRedo ());
}

/**
 * Clean the source editor.
 * Invoked by {@link VisualEditorBinding} on clean.
 */
VisualEditorPageBinding.prototype.clean = function () {
	
	if ( this._sourceEditor != null ) {
		this._sourceEditor.clean ();
	}
}

/**
 * This setup implies that a switch to source and back again may actually 
 * corrupt the checksum system IF the user copied stuff from either mode 
 * without modifying content. Just so that you know...
 * @param {string} checksum 
 * @return {string}
 */
VisualEditorPageBinding.prototype.getCheckSum = function (checksum) {

	if (this.isSourceMode) {

		/*
		* If the source editor is dirty, we must return something 
		* not equal to the current visual editor checksum.
		*/
		if (this._sourceEditor.isDirty) {
			return new String(Math.random());
		} else {
			return checksum;
		}
	} else {
		// IE innerHTML - returns wrong quotes (' instead ") in attribute data-markup
		if (Client.isAnyExplorer) {
			checksum = this._tinyInstance.getContent();
		} else {
			checksum = this._tinyInstance.getDoc().body.innerHTML;
		}

		//delete mceC1Focused from checksum to prevent unexpected dirty
		checksum = checksum.replace(/\s*mceC1Focused\s*/g, "");

		checksum = checksum.replace(/<img[^<]*data-markup="([^"]*)"[^<]*>/g, "$1");
		checksum = checksum.replace(/\sdata-mce-selected="[^"]*"/g, "");
		

		return checksum;
	}
}