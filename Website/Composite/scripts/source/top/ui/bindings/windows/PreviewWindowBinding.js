PreviewWindowBinding.prototype = new WindowBinding;
PreviewWindowBinding.prototype.constructor = PreviewWindowBinding;
PreviewWindowBinding.superclass = WindowBinding.prototype;

PreviewWindowBinding.URL_FULL_STOP = "${root}/content/misc/preview/stop.aspx";
PreviewWindowBinding.URL_ERROR = "${root}/content/misc/preview/error.aspx";
PreviewWindowBinding.ACTION_RETURN = "return";
PreviewWindowBinding.TIMEOUT_RETURN = parseInt ( 2300 );


/**
 * @class
 * This window is hardwired for HTTP POST previews.
 */
function PreviewWindowBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PreviewWindowBinding" );
	
	/**
	 * @type {Map<String><String>}
	 */
	this._postBackList = null;
	
	/**
	 * @type {string}
	 */
	this._postBackURL = null;
	
	/**
	 * @type {CoverBinding}
	 */
	this._coverBinding = null;
	
	/**
	 * @type {WindowBinding}
	 */
	this._windowBinding = null;
	
	/**
	 * @type {WindowBinding}
	 */
	this._errorBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this._hasFullStop = false;
	
	/**
	 * @type {boolean}
	 */
	this._isReturning = false;
	 
	/**
	 * @type {ILoadHandler}
	 */
	this._loadhandler = null;
	
	/**
	 * @type {function}
	 */
	this._timeout = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
PreviewWindowBinding.prototype.toString = function () {

	return "[PreviewWindowBinding]";
}

/**
 * Append a cover to hide flashes-of-white while navigating.
 */
PreviewWindowBinding.prototype.onBindingAttach = function () {
	
	PreviewWindowBinding.superclass.onBindingAttach.call ( this );
	
	this.bindingElement.style.backgroundColor = "white"; // Mozilla is transparent!
	this._coverBinding = this.add ( CoverBinding.newInstance ( this.bindingDocument ));
	this._coverBinding.attach ();
}

/**
 * @param {DOMDocumentView} win
 * @overloads {WindowBinding#onWindowLoaded}
 */
PreviewWindowBinding.prototype.onWindowLoaded = function ( win ) {

	if (this.getURL() != WindowBinding.DEFAULT_URL) {

		if (this.hasAccess(win)) {
			if (!this._hasFullStop) {
				if (win.isPostBackDocument) {
					if (this._isReturning) {
						win.submit(this._postBackList, this._postBackURL);
						this._isReturning = false;
					}
				} else {
					this._coverBinding.hide();
				}
				if (!win.isDefaultDocument) {
					var self = this;
					this._loadhandler = {
						handleEvent: function (e) {
							//self._coverBinding.show ();
							if (win.isPostBackDocument) {
								self._postBackList = win.postBackList;
								self._postBackURL = win.postBackURL;
							} else if (!win.isDefaultDocument) {
								self._fullStop();
							}
						}
					};
					DOMEvents.addEventListener(
						win,
						DOMEvents.BEFOREUNLOAD,
						this._loadhandler
					);
				}
			}
		} else {
			this._coverBinding.hide();
		}
	}
	
	PreviewWindowBinding.superclass.onWindowLoaded.call ( this, win );
}

/**
 * Show full stop message. Note that the forbidden 
 * page is in fact loaded behind the curtains. 
 */
PreviewWindowBinding.prototype._fullStop = function () {

	this._coverBinding.show ();
	
	if ( this._windowBinding == null ) {
		
		this._windowBinding = this._getWindowBinding ();
		this._windowBinding.setURL ( PreviewWindowBinding.URL_FULL_STOP );
		this._windowBinding.hide ();
		this._windowBinding.attach ();
		
		this._windowBinding.addActionListener ( WindowBinding.ACTION_LOADED, {
			handleAction : function ( action ) {
				action.target.show ();
				action.consume ();
			}
		});
		
	} else {
		
		this._windowBinding.show ();
	}

	this._hasFullStop = true;
	this.addActionListener ( PreviewWindowBinding.ACTION_RETURN );
	this.setURL ( WindowBinding.DEFAULT_URL ); // nuke the forbidden document!
	
	/*
	 * Auto-return after a short timeout. Note that a mouseclick  
	 * anywhere inside the stop page also triggers a return.
	 */
	var self = this;
	this._timeout = setTimeout ( function () {
		self._return ();
	}, PreviewWindowBinding.TIMEOUT_RETURN );
};

/**
 * Show error message. Invoked by the {@link EditorPageBinding}
 * TODO: Fuse this._errorBinding with this._windowBinding?
 */
PreviewWindowBinding.prototype.error = function () {
	
	this._coverBinding.show ();
	
	if ( this._errorBinding == null ) {
		
		this._errorBinding = this._getWindowBinding ();
		this._errorBinding.setURL ( PreviewWindowBinding.URL_ERROR );
		this._errorBinding.hide ();
		this._errorBinding.attach ();
		
		this._errorBinding.addActionListener ( WindowBinding.ACTION_LOADED, {
			handleAction : function ( action ) {
				action.target.show ();
				action.consume ();
			}
		});
		
	} else {
		
		this._errorBinding.show ();
	}

	this._hasError = true;
	this.setURL ( WindowBinding.DEFAULT_URL );
};

/**
 * @return {WindowBinding}
 */
PreviewWindowBinding.prototype._getWindowBinding = function () {
	
	var win = this._coverBinding.add ( WindowBinding.newInstance ( this.bindingDocument ));
	
	/*
	 * TODO: Move to (general) CSS
	 */
	win.isFlexible = false;
	win.bindingElement.style.position = "absolute";
	win.bindingElement.style.width = "100%";
	win.bindingElement.style.height = "100%";
	
	return win;
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
PreviewWindowBinding.prototype.handleAction = function ( action ) {
	
	PreviewWindowBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case PreviewWindowBinding.ACTION_RETURN :
			this._return ();
			break;
	}
}

/**
 * Return from full stop page.
 */
PreviewWindowBinding.prototype._return = function () {
	
	clearTimeout ( this._timeout );
	this._timeout = null;
	
	this.removeActionListener ( PreviewWindowBinding.ACTION_RETURN );
	this._windowBinding.hide ();
	this._hasFullStop = false;
	this._isReturning = true;
	this.setURL ( WindowBinding.POSTBACK_URL );
}

/**
 * Reset setup. This method is invoked by the  
 * {@link EditorPageBinding} when another tab is selected.
 */
PreviewWindowBinding.prototype.reset = function () {
	
	if ( this._timeout != null ) {
		clearTimeout ( this._timeout );
		this._timeout = null;
	}
	
	if ( this._errorBinding != null ) {
		if ( this._errorBinding.isVisible ) {
			this._errorBinding.hide ();
			
		}
	}
	
	if ( this._windowBinding != null ) {
		if ( this._windowBinding.isVisible ) {
			this._windowBinding.hide ();
		}
	}
	
	if ( this._loadhandler != null ) {
		if (this.getURL() != WindowBinding.DEFAULT_URL) {
			if (this.hasAccess(this._windowBinding)) {
				DOMEvents.removeEventListener(
					this.getContentWindow(),
					DOMEvents.BEFOREUNLOAD,
					this._loadhandler
				);
			}
			this._loadhandler = null;
		}
	}
	
	this._hasError = false;
	this._hasFullStop = false;
	this._isReturning = false;
	
	//this._coverBinding.show ();
	this.setURL ( WindowBinding.DEFAULT_URL );
}