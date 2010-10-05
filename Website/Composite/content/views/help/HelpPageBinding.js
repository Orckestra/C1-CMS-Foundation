HelpPageBinding.prototype = new PageBinding;
HelpPageBinding.prototype.constructor = HelpPageBinding;
HelpPageBinding.superclass = PageBinding.prototype;

/**
 * True when content is pulled from remote server.
 * TODO: Figure out how to switch this intelligently.
 * @type {boolean}
 */
HelpPageBinding.hasRemoteConnection = false;

/**
 * Update this to always point at the root of the help folder.
 * @type {string}
 */
HelpPageBinding.HELPURL = Resolver.resolve ( "${root}/help/help.ashx" );

/**
 * Special pages mapped to special buttons.
 * @type {HashMap<string><string>}
 */
HelpPageBinding.PAGES = {
	
	"contentsbutton"	: "Composite.Help.Contents.Url",
	"searchbutton" 		: "Composite.Help.Search.Url",
	"bookmarksbutton" 	: "Composite.Help.Bookmarks.Url",
	"indexbutton" 		: "Composite.Help.Index.Url"
}

/**
 * This is injected into links as an onclick function.
 * @type {funtion}
 */
HelpPageBinding.navigate = function () {
	
	var domain = "c1console.composite.net/";
	var location = this.href.split ( domain )[ 1 ];
	
	/*
	 * Change window location. Patching an 
	 * exotic WindowBinding exception in moz.
	 */
	var page = bindingMap.page;
	if ( Client.isExplorer ) {
		page.setLocalURL ( location );
	} else {
		setTimeout ( function () {
			page.setLocalURL ( location );
		}, 0 );
	}
	
	/*
	 * Onclick action can 
	 * be removed now.
	 */
	this.onclick = null;
	
	/*
	 * Skip normal link behavior because it doesn't 
	 * update the WindowBinding URL property.
	 */
	return false;
}

/**
 * @class
 */
function HelpPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "HelpPageBinding" );
	 
	/**
	 * The main window.
	 * @type {WindowBinding}
	 */
	this._windowBinding = null;
	
	/**
	 * The bottom toolbar.
	 * @type {ToolBarBinding}
	 */
	this._statusbarBinding = null;
	
	/**
	 * The text size popup.
	 * @type {PopupBinding}
	 */
	this._popupBinding = null;
	
	/**
	 * Navigation history list.
	 * @type {List<string>
	 */
	this._history = new List ();
	
	/**
	 * Navigation history position.
	 * @type {int}
	 */
	this._index = parseInt ( -1 );
	
	/**
	 * True when navigating using toolbar buttons.
	 * @type {boolean}
	 */
	this._isHistoryBrowsing = false;
	
	/**
	 * True while using the refresh button (developermode).
	 * @type {boolean}
	 */
	this._isRefreshing = false;
}

/**
 * Identifies binding.
 */
HelpPageBinding.prototype.toString = function () {
	
	return "[HelpPageBinding]";
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
HelpPageBinding.prototype.onBeforePageInitialize = function () {
	
	HelpPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this._windowBinding = bindingMap.helpwindow;
	this._windowBinding.addActionListener ( WindowBinding.ACTION_ONLOAD, this );
	
	this._toolbarBinding = bindingMap.toolbar;
	this._toolbarBinding.addActionListener ( ButtonBinding.ACTION_COMMAND, this )
	
	this._statusbarBinding = bindingMap.statusbar;
	if ( this._statusbarBinding != null ) {
		this._statusbarBinding.addActionListener ( ButtonBinding.ACTION_COMMAND, this );
	}
	
	this._popupBinding = bindingMap.textsizepopup;
	if ( this._popupBinding != null ) {
		this._popupBinding.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
	}
}



/**
 * Page load delayed in order to present GUI faster.
 * @overloads {PageBinding#onAfterPageInitialize}
 */
HelpPageBinding.prototype.onAfterPageInitialize = function () {
	
	HelpPageBinding.superclass.onAfterPageInitialize.call ( this );
	this.setLocalURL ( "Composite.Help.Contents.Url" );
}

/**
 * @overloads {PageBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
HelpPageBinding.prototype.handleAction = function ( action ) {

	HelpPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		case WindowBinding.ACTION_ONLOAD :
			if ( binding == this._windowBinding ) {
				this._onWindowLoaded ();
				action.consume ();
			}
			break;
		case ButtonBinding.ACTION_COMMAND :
			switch ( action.listener ) {
				case this._toolbarBinding :
					this._onToolBarButton ( binding );
					break;
				case this._statusbarBinding :
					this._onStatusBarButton ( binding );
					break;
			}
			action.consume ();
			break;
		case MenuItemBinding.ACTION_COMMAND :
			alert ( "Text size not implemented!" );
			action.consume ();
			break;
	}
}

/**
 * Set window location by localized URL fragment.
 * @param {string} urlfragment
 */
HelpPageBinding.prototype.setLocalURL = function ( urlfragment ) {
	
	if ( urlfragment == null ) {
		urlfragment = "";
	}
	this._windowBinding.setURL ( HelpPageBinding.HELPURL + "?id=" + urlfragment );
}

/**
 * Get window location as localized URL fragment.
 * @return {string}
 */
HelpPageBinding.prototype.getLocalURL = function () {
	
	return this._windowBinding.getURL ().split ( HelpPageBinding.HELPURL + "?id=" )[ 1 ];
}

/**
 * Go forward.
 */
HelpPageBinding.prototype._goForward = function () {
	
	if ( !this._isHistoryBrowsing ) {
		if ( this._index < this._history.getLength () - 1 ) {
			this._isHistoryBrowsing = true;
			this._index ++;
			this.setLocalURL ( this._history.get ( this._index ));
		}
	}
}

/**
 * Go back.
 */
HelpPageBinding.prototype._goBack = function () {
	
	if ( !this._isHistoryBrowsing ) {
		if ( this._index > 0 ) {
			this._isHistoryBrowsing = true;
			this._index --;
			this.setLocalURL ( this._history.get ( this._index ));
		}
	}
}

/**
 * On window loaded.
 * @param {string} url
 */
HelpPageBinding.prototype._onWindowLoaded = function () {
	
	/*
	 * Update history index, broadcasters and statusbar buttons.
	 */
	if ( !this._isRefreshing ) {
		var url = this.getLocalURL ();
		this._updateHistory ( url );
		this._updateBroadcasters ();
		this._updateStatusBar ( url );
	} else {
		this._isRefreshing = false;
	}
	
	/*
	 * Modify links in contained document.
	 */
	var win = this._windowBinding;
	var doc = win.getContentDocument ();
	var links = new List ( doc.links );
	links.each ( function ( link ) {
		if ( link.href != Constants.DUMMY_LINK && link.target != "_blank" ) {
			link.onclick = HelpPageBinding.navigate;
		}
	});
}

/**
 * On navigationbar button.
 * @param {ToolBarButtonBinding} button
 */
HelpPageBinding.prototype._onToolBarButton = function ( button ) {
	
	switch ( button.bindingElement.id ) {
		case "backbutton" :
			this._goBack ();
			break;
		case "forwardbutton" :
			this._goForward ();
			break;
		case "refreshbutton" :
			this._isRefreshing = true;
			this._windowBinding.reload ();
			break;
		case "bookmarkbutton" :
			alert ( "Bookmarks not implemented!" );
			break;
	}
}

/**
 * On statusbar button.
 * @param {ToolBarButtonBinding} button
 */
HelpPageBinding.prototype._onStatusBarButton = function ( button ) {
	
	var id = button.bindingElement.id;
	var url = HelpPageBinding.PAGES [ id ];
	this.setLocalURL ( url );
}

/**
 * Update history index (on page load).
 * @param {string} url
 */
HelpPageBinding.prototype._updateHistory = function ( url ) {

	if ( !this._isHistoryBrowsing ) {
		while ( this._history.getLength () - 1 > this._index ) {
			this._history.extractLast ();
		}
		this._history.add ( url );
		this._index ++;
	} else {
		this._isHistoryBrowsing = false;
	}
}
 
/**
 * Update broadcasters.
 */
HelpPageBinding.prototype._updateBroadcasters = function () {
	
	/*
	 * Back.
	 */
	var back = bindingMap.broadcasterHistoryBack;
	if ( this._index == parseInt ( 0 )) {
		if ( !back.isDisabled ()) {
			back.disable ();
		}
	} else {
		if ( back.isDisabled ()) {
			back.enable ();
		}
	}
	
	/*
	 * Forward.
	 */
	var forward = bindingMap.broadcasterHistoryForward;
	if ( this._index < this._history.getLength () - 1 ) {
		if ( forward.isDisabled ()) {
			forward.enable ();
		}
	} else {
		if ( !forward.isDisabled ()) {
			forward.disable ();
		}
	}
}

/*
 * Update statusbar on page load. When special pages 
 * are active, disable corresponding button.
 * @param {string} url
 */
HelpPageBinding.prototype._updateStatusBar = function ( url ) {

	for ( var entry in HelpPageBinding.PAGES ) {
		if ( bindingMap [ entry ]) {
			if ( HelpPageBinding.PAGES [ entry ] == url ) {
				bindingMap [ entry ].disable ();
			} else {
				bindingMap [ entry ].enable ();
			}
		}
	}
}