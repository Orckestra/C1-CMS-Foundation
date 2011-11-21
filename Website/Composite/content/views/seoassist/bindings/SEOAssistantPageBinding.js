SEOAssistantPageBinding.prototype = new MarkupAwarePageBinding;
SEOAssistantPageBinding.prototype.constructor = SEOAssistantPageBinding;
SEOAssistantPageBinding.superclass = MarkupAwarePageBinding.prototype;

SEOAssistantPageBinding.CLASSNAME_DEACTIVATED = "deactivated";
SEOAssistantPageBinding.LOCALIZATION = "Composite.Web.SEOAssistant";

/**
 * @class
 */
function SEOAssistantPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SEOAssistantPageBinding." );
	
	/**
	 * @type {SEODOMParser}
	 */
	this._parser = new SEODOMParser ();
	
	/**
	 * @type {HTMLInputElement}
	 */
	this._focusedInput = null;
	
	/**
	 * @type {boolean}
	 */
	this._isDirty = false;
	
	/**
	 * @type {List<string>}
	 */
	this._keywords = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SEOAssistantPageBinding.prototype.toString = function () {

	return "[SEOAssistantPageBinding.]";
}

/**
 * Setup page elements.
 * @overloads {PageBinding#onBeforePageInitialize}
 */
SEOAssistantPageBinding.prototype.onBeforePageInitialize = function () {
	
	SEOAssistantPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this.subscribe ( BroadcastMessages.KEY_ARROW );
	this.subscribe ( BroadcastMessages.KEY_ENTER );
	this.subscribe ( BroadcastMessages.TOLANGUAGE_UPDATED );
	
	/*
	 * Rig up keyword editor.
	 */
	var container = this.bindingDocument.getElementById ( "inputs" );
	DOMEvents.addEventListener ( container, DOMEvents.KEYDOWN, this );
	
	var scrollbox = this.bindingDocument.getElementById ( "keywords" );
	DOMEvents.addEventListener ( scrollbox, DOMEvents.MOUSEDOWN, this );
	
	/*
	 * Clear keywords highlighting when result-tab is not selected. 
	 * This should also clear the current tree selection.
	 */
	var tabbox = this.bindingWindow.bindingMap.tabbox;
	var tree = this.bindingWindow.bindingMap.tree;
	tabbox.addActionListener ( TabBoxBinding.ACTION_SELECTED, {
		handleAction : function () {
			var tab = tabbox.getSelectedTabBinding ();
			if ( tab.bindingElement.id != "scoretab" ) {
				EventBroadcaster.broadcast ( BroadcastMessages.HIGHLIGHT_KEYWORDS, null );
				tree.blurSelectedTreeNodes ();
				tree.keyword = null;
			}
		}
	});
	
	/*
	 * Hook up the save button.
	 */
	var self = this, button = this.bindingWindow.bindingMap.savebutton;
	button.oncommand = function () {
		self._isDirty = false;
		this.disable ();
		self._saveKeywords ();
	}
	
	/*
	 * Initialize the SEO service and retrieve keywords.
	 */
	if ( top.SEOService == null ) {
		top.SEOService = WebServiceProxy.createProxy ( Constants.URL_WSDL_SEOSERVICE );
	}
	this._getKeywords ();
}

/**
 * Get keywords and populate list. Note that this  
 * is reinvoked when user changes to to-language.
 */
SEOAssistantPageBinding.prototype._getKeywords = function () {
	
	var list = new List ( top.SEOService.GetKeyWords ( true ));
	this._populateKeyWords ( list );
	this._parser.setKeys ( list );
	this._keywords = list;
	
	/*
	 * If no keywords are recieved, focus the keywords panel.
	 */
	if ( !list.hasEntries ()) {
		var tabbox = this.bindingWindow.bindingMap.tabbox;
		tabbox.select ( "keywordstab" ); 
		this._focusBestInput ();
	}
}

/**
 * Save keywords.
 */
SEOAssistantPageBinding.prototype._saveKeywords = function () {
		
	var keywords = this._extractKeyWords ();
		
	/*
	 * Transmit to server.
	 */
	Application.lock ( this );
	top.SEOService.SaveKeyWords ( keywords );
	
	/*
	 * Update internally.
	 */
	var list = new List ( keywords );
	this._parser.setKeys ( list );
	this._keywords = list;
	
	/*
	 * Old result now invalid; select default deck.
	 */
	var decks = this.bindingWindow.bindingMap.decks;
	decks.select ( "defaultdeck" );
	
	/*
	 * Unlock GUI. The timeout is simply a 
	 * user feedback ploy to indicate activity.
	 */
	var self = this;
	setTimeout ( function () {
		Application.unlock ( self );
	}, 500 );
}

/**
 * Extract keywords from inputs.
 * @return {array}
 */
SEOAssistantPageBinding.prototype._extractKeyWords = function () {	

	var container = this.bindingDocument.getElementById ( "inputs" );
	var inputs = new List ( container.getElementsByTagName ( "input" ));
	var result = [];
	
	inputs.each ( function ( input ) {
		if ( !input.getAttribute ( "isdeleting" )) {
			var keyword = input.value;
			if ( /[^\s ]/.test ( keyword )) {
				result.push ( keyword );
			}
		}
	});	
	
	return result;
}

/**
 * Populate keyword list.
 */
SEOAssistantPageBinding.prototype._populateKeyWords = function ( list ) {
	
	var container = this.bindingDocument.getElementById ( "inputs" );
	
	while ( container.hasChildNodes ()) {
		container.removeChild ( container.lastChild );
	}
	
	if ( list.hasEntries ()) {
		list.reset ();
		while ( list.hasNext ()) {
			var entry = list.getNext ();
			var input = this._getInput ( entry );
			container.appendChild ( input );
		}
	} else {
		container.appendChild ( this._getInput ( "" ));
	}
}

/**
 * @implements {IBroadcastHandler}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
SEOAssistantPageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	SEOAssistantPageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.KEY_ARROW :
			if ( this._focusedInput != null ) {
				switch ( arg ) {
					case KeyEventCodes.VK_UP :
						this._navigateInput ( true );
						break;
					case KeyEventCodes.VK_DOWN :
						this._navigateInput ( false );
						break;
				}
			}
			break;
			
		case BroadcastMessages.KEY_ENTER :
			if ( this._focusedInput != null ) {
				if ( this._focusedInput.value != "" ) {
					this._insertInput ();
				}
			}
			break;
			
		case BroadcastMessages.TOLANGUAGE_UPDATED :
			var decks = this.bindingWindow.bindingMap.decks;
			var tree = this.bindingWindow.bindingMap.tree;
			decks.select ( "defaultdeck" );
			tree.empty ();
			this._getKeywords ();
			break;
	}
}

/**
 * @overloads {MarkupAwarePageBinding#_handleMarkup}
 * @param {string} markup
 */
SEOAssistantPageBinding.prototype._handleMarkup = function (markup) {

	SEOAssistantPageBinding.superclass._handleMarkup.call(this, markup);

	if (markup == null || markup == "") {
		this._incorrectHtml();
	}
	else if (this._keywords.hasEntries()) {
		this._parseMarkup(markup);
	} else {
		this._noKeyWords();
	}

	/*
	* Select the result deck.
	*/
	var decks = this.bindingWindow.bindingMap.decks;
	decks.select("resultdeck");

	/*
	* Select the scoretab.
	*/
	var decks = this.bindingWindow.bindingMap.tabbox;
	decks.select("scoretab");
}


/**
* @overloads {MarkupAwarePageBinding#_handleWrongMarkup}
* @param {string} markup
*/
SEOAssistantPageBinding.prototype._incorrectHtml = function () {

	var tree = this.bindingWindow.bindingMap.tree;
	tree.empty();
	var node = tree.add(TreeNodeBinding.newInstance(tree.bindingDocument));
	node.setImage("${icon:warning}");
	node.setLabel(StringBundle.getString(SEOAssistantPageBinding.LOCALIZATION, "IncorrectHtml"));
	node.attach();
}

/**
 * 
 */
SEOAssistantPageBinding.prototype._noKeyWords = function () {
	
	var tree = this.bindingWindow.bindingMap.tree;
	tree.empty ();
	var node = tree.add ( TreeNodeBinding.newInstance ( tree.bindingDocument ));
	node.setImage ( "${icon:warning}" );
	node.setLabel ( StringBundle.getString ( SEOAssistantPageBinding.LOCALIZATION, "NoKeywordsWarning" ));
	node.attach ();
}

/**
 * @param {string} markup
 */
SEOAssistantPageBinding.prototype._parseMarkup = function ( markup ) {
	
	var dom = XMLParser.parse ( markup, true );
	
	if ( dom != null ) {
		
		/*
		 * Build the tree.
		 */
		var list = this._parser.parse ( dom );
		var tree = this.bindingWindow.bindingMap.tree;
		tree.empty ();
		
		if ( list.hasEntries ()) {
			while ( list.hasNext ()) {
				var node = tree.add ( SEOResultTreeNodeBinding.newInstance ( tree.bindingDocument ));
				node.seoresult = list.getNext ();
				node.attach ();
			}
		} else {
			var node = tree.add ( TreeNodeBinding.newInstance ( tree.bindingDocument ));
			node.setImage ( "${icon:message}" );
			node.setLabel ( StringBundle.getString ( SEOAssistantPageBinding.LOCALIZATION, "NoKeywords" ));
			node.attach ();
		}
		
	} else {
		
		this.logger.error ( "Illformed markup:\n\n" + markup );
	}
}

/**
 * Activate and deactivate whenever markup is available.
 * @overloads {MarkupAwarePageBinding._activate}
 * @param {boolean} isActivate
 */
SEOAssistantPageBinding.prototype._activate = function ( isActivate ) {
	
	SEOAssistantPageBinding.superclass._activate.call ( this, isActivate );
	
	var root = UserInterface.getBinding ( this.bindingDocument.body );
	var name = SEOAssistantPageBinding.CLASSNAME_DEACTIVATED;
	
	if ( isActivate ) {
		root.detachClassName ( name );
	} else {
		root.attachClassName ( name );
		if ( this._focusedInput != null ) {
			
			/*
			 * Some some reason, simply invoking blur() would also 
			 * blur any other input that just recieved focus somewhere.
			 */
			var container = this.bindingDocument.getElementById ( "inputs" );
			container.style.display = "none";
			container.style.display = "block";
		}
	}
}

/**
 * Capitalize first-letter.
 * @param {string} string
 * @return {string}
 */
SEOAssistantPageBinding.prototype._capFirst = function ( string ) {
	
	var result = string
	if ( result != null && result != "" ) {
		var first = result.charAt ( 0 );
		var last = result.substring ( 1, result.length );
		result = first.toUpperCase () + last;
	}
	return result;
}

/**
 * @overloads {PageBinding#handleEvent}
 * @implements {IEventHandler}
 * @param {KeyEvent} e
 */
SEOAssistantPageBinding.prototype.handleEvent = function ( e ) {
	
	SEOAssistantPageBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.KEYDOWN :
			switch ( e.keyCode ) {
				case KeyEventCodes.VK_UP :
				case KeyEventCodes.VK_DOWN :
				case KeyEventCodes.VK_LEFT :
				case KeyEventCodes.VK_RIGHT :
				case KeyEventCodes.VK_SHIFT :
				case KeyEventCodes.VK_CONTROL :
				case KeyEventCodes.VK_ALT :
				case KeyEventCodes.VK_ESCAPE :
				case KeyEventCodes.VK_END :
					break;
				case KeyEventCodes.VK_DELETE :
					this._checkForDirty ();
					break;
				case KeyEventCodes.VK_BACK :
					this._checkForDirty ();
					var input = DOMEvents.getTarget ( e );
					if ( input && input.nodeName.toLowerCase () == "input" ) {
						if ( input.value == "" ) {
							if ( this._navigateInput ( true )) {
								this._deleteInput ( input );
							}
						}
					}
					break;
				default :
					this._checkForDirty ();
					break;
			}
			break;
			
		case DOMEvents.MOUSEDOWN :
			
			var target = DOMEvents.getTarget ( e );
			switch ( target.nodeName.toLowerCase ()) {
				case "input" :
					DOMEvents.stopPropagation ( e );
					break;
				default :
					this._focusBestInput ();
					break;
			}
			break;
	}
}

/**
 * Focus a nice input. Let's say the last one.
 */
SEOAssistantPageBinding.prototype._focusBestInput = function () {
	
	var container = this.bindingDocument.getElementById ( "inputs" );
	var inputs = container.getElementsByTagName ( "input" );
	var input = inputs.item ( inputs.length - 1 );
	if ( input != null ) {
		setTimeout ( function () { // moz weirdness
			input.focus ();
		}, 250 );
	}
}

/**
 * Blur all inputs.
 * @return
 */
SEOAssistantPageBinding.prototype._blurAllInputs = function () {
	
	var container = this.bindingDocument.getElementById ( "inputs" );
	var inputs = new List ( container.getElementsByTagName ( "input" ));
	inputs.each ( function ( input ) {
		input.blur ();
	});
}

/**
 * Check for dirty.
 */
SEOAssistantPageBinding.prototype._checkForDirty = function () {
	
	if ( !this._isDirty ) {
		var saveButton = this.bindingWindow.bindingMap.savebutton;
		saveButton.enable ();
		this._isDirty = true;
	}
}

/**
 * Build a keyword editor input.
 * @param {string} value
 * @return {HTMLInputElement}
 */
SEOAssistantPageBinding.prototype._getInput = function ( value ) {
	
	var input = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", this.bindingDocument );
	
	var self = this;
	input.onfocus = function () {
		self._focusInput ( this );
		self.dispatchAction ( Binding.ACTION_ACTIVATED ); // otherwise consumed by evil
	};
	input.onblur = function () {
		self._blurInput ( this );
	}
	if ( value != null ) {
		input.value = value;
	}
	
	return input;
}

/**
 * Focus input.
 * @param {HTMLInputElement} input
 */
SEOAssistantPageBinding.prototype._focusInput = function ( input ) {
	
	this._focusedInput = input;
	this.bindingWindow.standardEventHandler.enableNativeKeys ();
	
	setTimeout ( function () {
		if ( Client.isExplorer == true ) {
			var range = input.createTextRange();
			range.moveStart ( "character", 0 );
			range.moveEnd ( "character", input.value.length );
			range.select ();
		} else {
	    	input.setSelectionRange ( 0, input.value.length );
		}
	}, 0 );
}

/**
 * Blur input.
 * @param {HTMLInputElement} input
 */
SEOAssistantPageBinding.prototype._blurInput = function ( input ) {
	
	this._focusedInput = null;
	this.bindingWindow.standardEventHandler.disableNativeKeys ();
	
	if ( !/[^\s ]/.test ( input.value )) {
		this._deleteInput ( input );
	}
}

/**
 * Navigate.
 * @param {boolean} isUp
 * @return {boolean} True if navigation was possible
 */
SEOAssistantPageBinding.prototype._navigateInput = function ( isUp ) {
	
	var result 		= true;
	var container 	= this.bindingDocument.getElementById ( "inputs" );
	var inputs 		= container.getElementsByTagName ( "input" );
	var position 	= DOMUtil.getOrdinalPosition ( this._focusedInput );
	var target 		= position + ( isUp ? -1 : 1 );
	var input 		= inputs.item ( target );
	
	if ( input != null ) {
		input.focus ();
	} else {
		result = false;
	}
	
	return result;
}

/**
 * Delete input.
 * @param {HTMLInputElement} input
 */
SEOAssistantPageBinding.prototype._deleteInput = function ( input ) {
	
	/*
	 * Never delete the last remaining input.
	 */
	if ( input.previousSibling != null || input.nextSibling != null ) {
		
		var height = 0;
		
		/*
		 * Prevent multiple operations from deleting the same input.
		 */
		if ( !input.getAttribute ( "isdeleting" )) {
			input.setAttribute ( "isdeleting", "true ");
			new Animation ({
				iterator : input.offsetHeight,
				modifier : -5,
				endcount : 0,
				onstep : function ( iterator ) {
					input.style.height = iterator + "px";
				},
				onstop : function () {
					input.parentNode.removeChild ( input );
				}
			}).play ();
		}
	}
}

/**
 * Insert input.
 */
SEOAssistantPageBinding.prototype._insertInput = function () {
	
	var container = this.bindingDocument.getElementById ( "inputs" );
	var input = this._getInput ();
	
	container.insertBefore ( input, this._focusedInput.nextSibling );
	input.focus ();
}