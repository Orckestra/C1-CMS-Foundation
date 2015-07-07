BrowserPageBinding.prototype = new PageBinding;
BrowserPageBinding.prototype.constructor = BrowserPageBinding;
BrowserPageBinding.superclass = PageBinding.prototype;

BrowserPageBinding.ICON_PUBLISHED = "${icon:page-view-public-scope}";
BrowserPageBinding.ICON_UNPUBLISHED = "${icon:page-view-administrated-scope}";

BrowserPageBinding.ACTION_ONLOAD = "browserpage loaded";
BrowserPageBinding.ACTION_TABSHIFT = "browserpage tabshift";

/**
 * @class
 */
function BrowserPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BrowserPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._startURL = null;
	
	/**
	 * See below...
	 * @type {Map<string><object>}
	 */
	this._currents = new Map ();
	
	/**
	 * This will be set to an index in the map declared above. it has two properties: 
	 *     history {List<string>}
	 *     index {int}
	 * @type {object}
	 */
	this._current = null;
	
	/**
	 * @type {boolean}
	 */
	this._isHistoryBrowsing = false;

	/**
	 * @type {boolean}
	 */
	this._isNewUrl = false;
	
	/**
	 * @type {boolean}
	 */
	this._isDisposing = false;
	
	/**
	 * @type {BrowserTabBoxBinding}
	 */
	this._box = null; 
	
	/**
	 * Timeout to hide the cover that blocks external URLs.
	 * @type {function}
	 */
	this._blockertimeout = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserPageBinding.prototype.toString = function () {
	
	return "[BrowserPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingRegister}
 */
BrowserPageBinding.prototype.onBindingRegister = function () {
	
	BrowserPageBinding.superclass.onBindingRegister.call(this);
	this.subscribe(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED);
	this.addActionListener ( WindowBinding.ACTION_ONLOAD );
	this.addActionListener ( TabBoxBinding.ACTION_SELECTED );
	this.addActionListener ( TabBoxBinding.ACTION_UPDATED );	
	this.addActionListener ( BrowserTabBinding.ACTIONVENT_CLOSE );
	
	
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
BrowserPageBinding.prototype.handleBroadcast = function (broadcast, arg) {

	BrowserPageBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {
		case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
			if (arg.perspectiveHandle == this.getPerspectiveHandle()) {
				var url = arg.actionProfile.Uri;
				if (url) {
					url = PageService.GetSavedPagelUrl(url);
					if (url != this._box.getLocation()) {
						this.setURL(url);
					}
				}
			}
			break;
	}
}

/**
 * @overloads {Binding#onBindingDispose}
 */
BrowserPageBinding.prototype.onBindingDispose = function () {
	
	/*
	 * This will instruct Prism not to  
	 * disable forced cache when closing.
	 * @see {BrowserPageBinding#handleEvent}
	 */
	BrowserPageBinding.superclass.onBindingDispose.call ( this );
	this._isDisposing = true;
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {HashMap<string><string>}
 */
BrowserPageBinding.prototype.setPageArgument = function ( map ) {
	
	BrowserPageBinding.superclass.setPageArgument.call ( this, map );
	
	var url = map [ "URL" ];
	if ( url == null ) {
		url = PageService.GetPageBrowserDefaultUrl ( true );
	}
	if ( this._isPageBindingInitialized ) {
		this._newURL ( url );
	} else {
		this._startURL = url;
	}

	this.systemViewDefinition = map["SystemViewDefinition"];

	//NEWUI Add tree to Browser
	var explorerdocument = this.bindingDocument;
	var explorerpanel = this.bindingWindow.bindingMap.explorerpanel;
	// construct ViewBinding
	var viewBinding = ViewBinding.newInstance(explorerdocument);
	viewBinding.setType(ViewBinding.TYPE_EXPLORERVIEW);
	viewBinding.setDefinition(this.systemViewDefinition);

	explorerpanel.add(viewBinding);

	viewBinding.attach();
	viewBinding.initialize();

	this._viewBinding = viewBinding;
}

/**
 * Delay onPageInitialize.
 * @overwrites {PageBinding#onBeforePageInitialize}
 */
BrowserPageBinding.prototype.onBeforePageInitialize = function () {
	
	this._box = window.bindingMap.browsertabbox;
	
	var navbar = window.bindingMap.navbar;
	navbar.addActionListener ( ButtonBinding.ACTION_COMMAND, this );
	
	var contextmenu = window.bindingMap.contextmenu;
	contextmenu.addActionListener(MenuItemBinding.ACTION_COMMAND, this);


	var docktab = this.getAncestorBindingByType(DockPanelBinding, true);
	docktab.addActionListener(FocusBinding.ACTION_BLUR, this);
	docktab.addActionListener(FocusBinding.ACTION_FOCUS, this);
	
	
	if ( this._startURL ) {
		this._newURL ( this._startURL );
		this._startURL = null;
	}

	
}

/**
 * Prepare cover to block external URLs.
 * @overloads {PageBinding#onAfterPageInitialize}
 */
BrowserPageBinding.prototype.onAfterPageInitialize = function () {
	
	BrowserPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	var self = this;
	var blocker = this.bindingWindow.bindingMap.blocker;
	
	if ( blocker != null ) {
		DOMEvents.addEventListener ( blocker.bindingElement, DOMEvents.MOUSEDOWN, {
			handleEvent : function () {
				blocker.hide ();
				if ( self._blockertimeout != null ) {
					clearTimeout ( self._blockertimeout );
				}
			}
		});
	}


	this.reflex(); //?

}

/**
 * Load URL in new tab.
 * @param {string} url
 * @return
 */
BrowserPageBinding.prototype._newURL = function ( url ) {
	
	if ( Client.isPrism ) {
		Prism.disableCache ();
	}
	
	var cover = window.bindingMap.cover;
	cover.show();
	this._isNewUrl = true;
	this._box.newURL ( url );
}

/**
 * Load URL in selected tab.
 * @param {string} url
 * @return
 */
BrowserPageBinding.prototype.setURL = function (url) {
    if (Client.isPrism) {
        Prism.disableCache();
    }
    
    var cover = window.bindingMap.cover;
    cover.show();
    this._isNewUrl = true;
    this._box.setURL(url);
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
BrowserPageBinding.prototype.handleAction = function ( action ) {

	BrowserPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case WindowBinding.ACTION_ONLOAD :
			this._handleDocumentLoad ( binding );
			action.consume ();
			break;
		 	
		case ButtonBinding.ACTION_COMMAND :
		case MenuItemBinding.ACTION_COMMAND :
			this._handleCommand ( binding.getProperty ( "cmd" ));
			action.consume ();
			break;
			 
		case TabBoxBinding.ACTION_SELECTED :
			this._handleSelectedTab ();
			action.consume ();
			break;
			
		case TabBoxBinding.ACTION_UPDATED :
			this._handleTabBoxUpdate ();
			action.consume ();
			break;
			
		case BrowserTabBinding.ACTIONVENT_CLOSE :
			this._isDisposing = true;
			action.consume ();
			break;
		case FocusBinding.ACTION_BLUR:
			//TODO add check target
			this.hideToolbar();
			break;
		case FocusBinding.ACTION_FOCUS:
			//TODO add check target
			this.showToolbar();
			break;
			
			
	}
}

/**
 * Handle selected tab.
 * @param {BrowserTabBoxBinding} tabbox
 */
BrowserPageBinding.prototype._handleSelectedTab = function () {
	
	var tab = this._box.getSelectedTabBinding ();
	if ( tab.getLabel () != null ) {
		tab.dispatchAction ( DockTabBinding.ACTION_UPDATE_VISUAL );
	}
	if ( Types.isFunction ( tab.getEntityToken )) {
		tab.dispatchAction ( DockTabBinding.ACTION_UPDATE_TOKEN );
	}
	if ( !this._currents.has ( tab.key )) {
		this._currents.set ( tab.key, {
			history : new List (),
			index : parseInt ( -1 )
		});
	}
	this._current = this._currents.get ( tab.key );
	this._updateBroadcasters ();
	this._updateAddressBar ( tab.url );

	/*
	 * So that Page Browser remember it's location when closed and reopened.
	 */
	if ( tab.browserwindow != null && tab.browserwindow.getContentDocument () != null ) {
		var def = ViewDefinitions [ "Composite.Management.Browser" ];
		def.argument = { "URL" : tab.url };
	}
	
	/*
	 * Broadcast contained markup for various panels to intercept. Since the markup   
	 * extraction requires a server roundtrip, we check for subscribers first.
	 */
	if ( EventBroadcaster.hasSubscribers ( BroadcastMessages.XHTML_MARKUP_ON )) {
		if ( tab.browserwindow != null ) {
			var markup = WindowBinding.getMarkup ( tab.browserwindow );
			EventBroadcaster.broadcast ( BroadcastMessages.XHTML_MARKUP_ON, markup );
		}
	}
	
	/*
	 * Dispatch event for plugins to hook.
	 */
	this.dispatchAction ( BrowserPageBinding.ACTION_TABSHIFT );
}

/**
 * @param {BrowserTabBoxBinding} tabbox
 */
BrowserPageBinding.prototype._handleTabBoxUpdate = function () {
	
	var box = this._box;
	
	switch ( box.updateType ) {
		
		case TabBoxBinding.UPDATE_DETACH :
		case TabBoxBinding.UPDATE_ATTACH :
			
			var tabs = UserInterface.getBinding ( box.getTabsElement ());
			if ( box.getTabBindings ().getLength () == 1 ) {
				if ( tabs.isVisible ) {
					tabs.hide ();
					this.reflex ();
				}
			} else {
				if ( !tabs.isVisible ) {
					tabs.show ();
					this.reflex ();
				}
			}
			break;
	}
}

/**
 * Handle loaded document.
 * @param {WindowBinding} binding
 */
BrowserPageBinding.prototype._handleDocumentLoad = function ( binding ) {
		
	var url = new String ( binding.getContentDocument ().location );

	/*
	 * Update stuff.
	 */
	this._updateAddressBar ( url );
	this._updateHistory ( url );
	this._updateBroadcasters ();
	this._updateDocument ();
	this._updateTabBox ( url );
	
	/*
	 * Cache control.
	 */
	if ( Client.isPrism == true ) {
		Prism.enableCache ();
	}
	
	/*
	 * Initialize on first load.
	 */
	if ( !this._isPageBindingInitialized ) {
		this.onPageInitialize ();
	}
	
	/*
	 * Broadcast contained markup for various panels to intercept. Since the markup   
	 * extraction requires a server roundtrip, we check for subscribers first.
	 */
	if ( EventBroadcaster.hasSubscribers ( BroadcastMessages.XHTML_MARKUP_ON )) {
		var markup = WindowBinding.getMarkup ( binding );
		EventBroadcaster.broadcast ( BroadcastMessages.XHTML_MARKUP_ON, markup );
	}
	
	/*
	 * Hide the cover.
	 */
	var cover = window.bindingMap.cover;
	if ( cover.isVisible ) {
		cover.hide ();
	}

	if (!this._isNewUrl) {
		var entityToken = TreeService.GetEntityTokenByPageUrl(url);
		EventBroadcaster.broadcast(
			BroadcastMessages.SYSTEMTREEBINDING_FOCUS,
			entityToken
		);
	}

	/*
	 * Dispatch event for Browser plugins to hook into.
	 */
	this.dispatchAction(BrowserPageBinding.ACTION_ONLOAD);

	this._isNewUrl = false;
}

/**
 * @param {string} url
 */
BrowserPageBinding.prototype._updateAddressBar = function ( url ) {
	
	var bar = this.bindingWindow.bindingMap.addressbar;
	if (bar != null) {
		url = PageService.ConvertRelativePageUrlToAbsolute(url);
		bar.setValue ( url );
	}
}

/**
 * @param {string} url
 */
BrowserPageBinding.prototype._updateTabBox = function ( url ) {
	
	/*
	 * Compute label and image, 
	 * update containing dock.
	 */
	this.label = this.getContentDocument ().title;
	this.image = (url.indexOf("dataScope=administrated") > 0 || url.indexOf("c1mode(unpublished)") > 0) ? 
			BrowserPageBinding.ICON_UNPUBLISHED : BrowserPageBinding.ICON_PUBLISHED;
	
	var tab = this._box.getSelectedTabBinding ();
	tab.setLabel ( this.label );
	tab.setImage ( this.image );
	tab.dispatchAction ( DockTabBinding.ACTION_UPDATE_VISUAL );
	
	WebServiceProxy.isFaultHandler = false;
	var token = TreeService.GetEntityTokenByPageUrl ( url );
	WebServiceProxy.isFaultHandler = true;
	
	if ( token instanceof SOAPFault ) {
		
		this.logger.error ( token.getFaultString ());
		
	} else {
		
		tab.getEntityToken = function () {
			return token;
		}
		tab.dispatchAction ( DockTabBinding.ACTION_UPDATE_TOKEN );
		
		/*
		 * So that Page Browser remember it's location when closed and reopened.
		 */
		tab.url = url;
		var def = ViewDefinitions [ "Composite.Management.Browser" ];
		def.argument = { "URL" : tab.url };
	}
}

/*
 * Update history.
 * @param {string} url
 */
BrowserPageBinding.prototype._updateHistory = function ( url ) {

	if ( this._isHistoryBrowsing == true ) {
		this._isHistoryBrowsing = false;
	} else {
		
		/*
		 * Clicking the same link twice should not update history, so we 
		 * made the code below. But since this would not enable user to 
		 * go back after a HTTP POST submit, the fix was disabled again. 
		 * Funny thing is - try uncomment this code and check it out... 
		 *
		var last = this._current.history.getLast ();
		if ( last != null ) {
			alert ( url.toString () + "\n" + last.toString () + "\n" + ( url == last ));
		}
		*/
		
		while ( this._current.history.getLength () - 1 > this._current.index ) {
			this._current.history.extractLast ();
		}
		this._current.history.add ( url );
		this._current.index ++;
		
	}
}

/**
 * Handle command (navbar or contextmenu).
 * @param {string} cmd
 */
BrowserPageBinding.prototype._handleCommand = function ( cmd ) {
	
	/*
	 * Because of a bug in the history object in Prism 0.91,
	 * we cannot invoke history.back and stuff. We have 
	 * to load new URLs from our own history. This will 
	 * destroy native history.back in document, so please 
	 * fix at some point... 
	 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=429550
	 */
	switch ( cmd ) {
		case "back" :
			this._isHistoryBrowsing = true;
			this.setURL ( this._current.history.get ( -- this._current.index ));
			break;
		case "forward" :
			this._isHistoryBrowsing = true;
			this.setURL ( this._current.history.get ( ++ this._current.index ));
			break;
		case "refresh" :
			this._isHistoryBrowsing = true;
			this.getContentDocument ().location.reload ();
			break;
		case "home" :
			url = PageService.GetPageBrowserDefaultUrl ( true );
			this.setURL ( url );
			break;
		case DockTabPopupBinding.CMD_VIEWSOURCE : /* notice dependencies */
			this._viewSource ( cmd );
			break;
	}
}

/**
 * View source.
 * @param {string} cmd
 */
BrowserPageBinding.prototype._viewSource = function ( cmd ) {
	
	var doc = this.getContentDocument ();
	var def = ViewDefinitions [ "Composite.User.SourceCodeViewer" ];
	
	def.argument = { 
		action: cmd, 
		doc: doc
	}
	def.label = this.label;
	StageBinding.presentViewDefinition ( def );
}

/**
 * Update broadcasters.
 */
BrowserPageBinding.prototype._updateBroadcasters = function () {
	
	var back = window.bindingMap.broadcasterHistoryBack;
	var forward = window.bindingMap.broadcasterHistoryForward;
	
	if ( this._current.index > 0 ) {
		back.enable ();
	} else {
		back.disable ();
	}
	if ( this._current.index < this._current.history.getLength () - 1 ) {
		forward.enable ();
	} else {
		forward.disable ();
	}
}

/**
 * Update hosted document (performed on load).
 */
BrowserPageBinding.prototype._updateDocument = function () {
	
	var win = this.getContentWindow ();
	var doc = this.getContentDocument ();
	
	DOMEvents.addEventListener ( doc, DOMEvents.CONTEXTMENU, this );
	DOMEvents.addEventListener ( win, DOMEvents.UNLOAD, this );
	
	/*
	 * Paralyze links leading to external websites.
	 */
	if ( doc.links.length > 0 ) {
		
		var self = this;
		var span = this.bindingDocument.getElementById ( "externalurl" );
		var blocker = this.bindingWindow.bindingMap.blocker;
		
		var handler = {
			handleEvent : function ( e ) {
				DOMEvents.preventDefault ( e );
				var link = DOMEvents.getTarget ( e );
				span.firstChild.data = link.href;
				blocker.show ();
				self._blockertimeout = setTimeout ( function () {
					blocker.hide ();
				}, 2300 );
			}
		}
		
		var link, i = 0;
		while (( link = doc.links [ i++ ]) != null ) {
			if ( link.href.indexOf ( "//" ) >-1 ) {
	 			var host = link.href.split ( "//" )[ 1 ].split ( "/" )[ 0 ];
				if ( host != window.location.host ) {
					DOMEvents.addEventListener ( link, DOMEvents.CLICK, handler );
				}
			}
		}
	}
}

/**
 * Get document from selected tab.
 * @return {DOMDocument}
 */
BrowserPageBinding.prototype.getContentDocument =  function () {
	
	return this._box.getContentDocument ();
}

/**
 * Get window from selected tab.
 * @return {DOMDocumentView}
 */
BrowserPageBinding.prototype.getContentWindow =  function () {
	
	return this._box.getContentWindow ();
}

/**
 * @overloads {PageBinding#handleEvent}
 * @implements {IEventListener}
 * @param {Event} e
 */
BrowserPageBinding.prototype.handleEvent = function ( e ) {
	
	BrowserPageBinding.superclass.handleEvent.call ( this, e );
	
	var cover = window.bindingMap.cover;
	
	switch ( e.type ) {
	
		case DOMEvents.CONTEXTMENU :
			var contextmenu = window.bindingMap.contextmenu;
			var p1 = DOMUtil.getUniversalMousePosition ( e );
			var p2 = this.boxObject.getUniversalPosition ();
			var p3 = new Point ( p1.x -p2.x, p1.y - p2.y );
			contextmenu.snapToPoint ( p3 );
			DOMEvents.preventDefault ( e );
			break;
			
		case DOMEvents.UNLOAD :
			
			if ( !this._isDisposing ) {
				cover.show ();
				if ( Client.isPrism ) {
					Prism.disableCache ();
				}
			}
			break;
	}
}

/**
 * @overloads {TabsBinding#flex}
 * @implements {IFlexible}
 */
BrowserPageBinding.prototype.flex = function () {

	

	BrowserPageBinding.superclass.flex.call(this);


	this.showToolbar();

}


/**
 * Show toolbar
 */
BrowserPageBinding.prototype.showToolbar = function () {
	var snap = this.bindingWindow.bindingMap.toolbar;

	var position = snap.boxObject.getUniversalPosition();
	var dimension = snap.boxObject.getDimension();


	var systemtoolbar = top.app.bindingMap.systemtoolbar;

	systemtoolbar.setPosition(position);
	systemtoolbar.setDimension(dimension);
	systemtoolbar.show();
	//Update More button
	systemtoolbar._toolBarBodyLeft.refreshToolBarGroups();
	systemtoolbar._containAllButtons();
}

/**
 *  Hide toolbar
 */
BrowserPageBinding.prototype.hideToolbar = function () {

	var systemtoolbar = top.app.bindingMap.systemtoolbar;
	systemtoolbar.hide();
}

/**
 * Return perspective handle for browser
 */
BrowserPageBinding.prototype.getPerspectiveHandle = function () {

	return this.systemViewDefinition.handle;
}