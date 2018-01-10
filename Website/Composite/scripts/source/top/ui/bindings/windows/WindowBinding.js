WindowBinding.prototype = new FlexBoxBinding;
WindowBinding.prototype.constructor = WindowBinding;
WindowBinding.superclass = FlexBoxBinding.prototype;

WindowBinding.ACTION_LOADED		= "window loaded";
WindowBinding.ACTION_ONLOAD 	= "alien window loaded";
WindowBinding.DEFAULT_URL 		= "${root}/blank.aspx";
WindowBinding.DEFAULT_TITLE 	= "Composite.Management.Blank";
WindowBinding.POSTBACK_URL 		= "${root}/postback.aspx"; 
WindowBinding.POSTBACK_TITLE 	= "Composite.Management.DefaultPostBack";

/**
 * Extract well-formed XHTML source from WindowBinding instance. 
 * This involves a roundtrip to the server, so use with caution. 
 * TODO: handle namespace declarations in contained document?
 * @param {WindowBinding} windowBinding
 * @return {string}
 */
WindowBinding.getMarkup = function ( windowBinding ) {
	
	var result = null;
	if ( windowBinding.isAttached ) {
		var doc = windowBinding.getContentDocument ();
		if (doc != null) {
			if (Client.isAnyExplorer) {
				result = doc.documentElement.outerHTML;
			} else {
				result = new XMLSerializer().serializeToString(doc);
			}

		}
	}
	return result;
};

/** 
 * Highlight a list of keywords inside a WindowBinding instance. 
 * This stuff is used for SEOAssistant in preview and browser.
 * @param {WindowBinding} windowBinding
 * @param {List<string>} list
 */
WindowBinding.highlightKeywords = function ( windowBinding, list ) {
	
	if ( WindowBinding._highlightcrawler == null ) {
		WindowBinding._highlightcrawler = new WindowBindingHighlightNodeCrawler ();
	}
	
	if ( windowBinding.isAttached ) {
		var doc = windowBinding.getContentDocument ();
		if ( doc != null ) {
			var crawler = WindowBinding._highlightcrawler;
			crawler.reset ( doc.body );
			if ( list != null ) {
				crawler.setKeys ( list );
				crawler.crawl ( doc.body );
			}
		}
	}
};

/**
 * This fellow handles inline highlighting of keywords in preview windows.
 * @type {WindowBindingHighlightNodeCrawler}
 * @see {WindowBinding.highlightKeywords}
 */
WindowBinding._highlightcrawler = null;

/**
 * @class
 * For some reason, iframe content pages must be loaded dynamically for 
 * Mozilla to display them consistantly after page reload. The WindowBinding 
 * does precisely that. We've added some {@link FlexBoxBinding} functionality.
 */
function WindowBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WindowBinding" );
	
	/**
	 * @type {string}
	 */
	this._target = null;
	
	/**
	 * @type {HashMap<string><string>}
	 */
	this._parameterMap = null;
	
	/**
	 * Points to the currently hosted PageBinding. Note that this is now a 
	 * prequisite for bindings to be disposed when window gets unloaded!
	 * @type {PageBinding);
	 */
	this._pageBinding = null;
	
	/**
	 * True while reloading. This helps us control cache in Prism.
	 * @type {boolean}
	 */
	this._isReloading = false;
	
	/**
	 * This one watches for the load event in the iframe document. If an  
	 * alien document is loaded, it will automatically be adapted to fit 
	 * (event listeners and stuff is registered).
	 * @type {IEventListener}
	 */
	this._onloadHandler = null;
	
	/**
	 * @type {IEventListener}
	 */
	this._unloadHandler = null;
	
	/**
	 * Used to fire the onload event as soon as possible. That is, 
	 * when the onload event is supposed to fire! Seems that 
	 * Firefox3 evaluates the WindowManager onload event first, 
	 * so that all bindings have been registered (and attached?) 
	 * when the onload event is fired on the iframe.
	 * @type {boolean}
	 */
	this._hasLoadActionFired = false;
	
	/**
	 * indicate that iframe should not part of framework
	 * @type {Boolean}
	 */
	this._native = false;

	/*
	 * Returnable.
	 */
	return this;
};

/**
 * Identifies binding.
 */
WindowBinding.prototype.toString = function () {
	
	return "[WindowBinding]";
};

/**
 * Serialize binding.
 * @return {HashMap<string><object>}
 */
WindowBinding.prototype.serialize = function () {
	
	var result = WindowBinding.superclass.serialize.call ( this );
	if ( result ) {
		result.url = this.getURL ();
	}
	return result;
};

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
WindowBinding.prototype.onBindingRegister = function () {

	WindowBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( RootBinding.ACTION_PHASE_3 );
	this.addActionListener ( PageBinding.ACTION_INITIALIZED );
	this.addActionListener ( RootBinding.ACTION_ACTIVATED );
	this.addActionListener ( RootBinding.ACTION_DEACTIVATED );
};

/**
 * @overloads {Binding#onBindingAttach}
 */
WindowBinding.prototype.onBindingAttach = function () {

	if (this.getProperty("native"))
		this._native = this.getProperty("native");

	this.buildDOMContent ();
	WindowBinding.superclass.onBindingAttach.call ( this );
	this.setURL ( this.getURL ());
};

/**
 * Dispose content document on dispose.
 * @overloads {Binding#onBindingDispose}
 */
WindowBinding.prototype.onBindingDispose = function () {
	
	WindowBinding.superclass.onBindingDispose.call ( this );
	
	/*
	 * TODO: Aint this handled by  
	 * the unloadlistener already?
	 */
	this._disposeContentDocument ();
};

/*
 * Ignite a chain reaction to dispose all bindings (in nested frames) within 
 * contained window. Note that chain breaks when a window hosts no PageBinding!
 */
WindowBinding.prototype._disposeContentDocument = function () {
	
	if ( this._pageBinding != null ) {
		var win = this.getContentWindow ();
		if ( win != null ) {
			var manager = this.getContentWindow ().DocumentManager;
			if ( manager != null ) {
				manager.detachAllBindings ();
				this._pageBinding = null;
			}
		}
	}
};

/**
 * Please notice that this implies that a WindowBinding will only dispatch 
 * the ACTION_LOADED loaded event if an on-server file is loaded!!!
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
WindowBinding.prototype.handleAction = function ( action ) {
	
	WindowBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case RootBinding.ACTION_PHASE_3 :
			
			if ( binding.bindingDocument == this.getContentDocument ()) {
				if ( this._isReloading == true ) {
					this._isReloading = false;
					if ( Client.isPrism == true ) {
						Prism.enableCache ();
					}
				}
				this.dispatchAction ( WindowBinding.ACTION_LOADED );
			}
			// dont consume - pagebinding may be listening!
			break;
			
		case PageBinding.ACTION_INITIALIZED :
			
			this._onPageInitialize ( binding );
			break;
			
		/*
		 * Simply consume this event. Only descendant bindings   
		 * will be listening. We can listen to the same event   
		 * on the RootBinding in our own bindingDocument.
		 */
		case RootBinding.ACTION_ACTIVATED :
		case RootBinding.ACTION_DEACTIVATED :
			action.consume ();
			break;
	}
};

/**
 * @implements {IFit}
 * @overwrites {FlexBoxBinding#fit}
 * @param {boolean} isForce
 */
WindowBinding.prototype.fit = function ( isForce ) {
	
	if ( !this.isFit || isForce ) {
		if ( this._pageBinding != null ) {
			this.setHeight ( this._pageBinding.getHeight ());
			this.isFit = true;
		}
	}
};
 
/**
 * Invoked when contained page initializes.
 * @param {PageBinding} binding
 */
WindowBinding.prototype._onPageInitialize = function ( binding ) {
	
	/*
	 * Fetch a pointer to the main page.
	 */
	if ( this._pageBinding == null ) {
		if ( binding.bindingWindow == this.getContentWindow ()) {
			this._pageBinding = binding;	
		}
	}
	
	/*
	 * Handle dialog sub pages ...
	 * Remember that the page gets converted 
	 * to a subpage opon attachment already! 
	 * Also remember that the page property 
	 * "fitasdialogsubpage" can override this.
	 *
	if ( binding.isDialogSubPage ) {
		if ( binding.bindingDocument == this.getContentDocument ()) {
			this.setHeight (
				binding.getHeight ()
			);
		}
	}
	*/
};

/**
 * Build the iframe and setup alien watch.
 */
WindowBinding.prototype.buildDOMContent = function () {

	this.shadowTree.iframe = DOMUtil.createElementNS ( Constants.NS_XHTML, "iframe", this.bindingDocument );
	this.shadowTree.iframe.setAttribute ( "frameborder", "0" );
	this.shadowTree.iframe.frameBorder = 0;
	this.shadowTree.iframe.id = KeyMaster.getUniqueKey();
	this.shadowTree.iframe.name = this.shadowTree.iframe.id;
	this.bindingElement.appendChild ( this.shadowTree.iframe );
	this._registerOnloadListener(true);
};

/**
 * Register onload listener.
 * @param {boolean} isRegister
 */
WindowBinding.prototype._registerOnloadListener = function ( isRegister ) {
	
	var iframe = this.shadowTree.iframe;
	var action = isRegister ? "addEventListener" : "removeEventListener";

	if ( this._onloadHandler == null ) {
		var self = this;
		this._onloadHandler = {
			handleEvent : function ( e ) {
				
					var isComplete = true;
					if ( Client.isExplorer ) {
						isComplete = iframe.readyState == "complete";
					}
					if ( isComplete == true ) {
						if ( self.getURL () != WindowBinding.DEFAULT_URL ) {
							if ( !self._hasLoadActionFired ) {
								self.onWindowLoaded ( 
									self.getContentWindow ()
								);
							}
						}
					}
				
			}
		}
	}
	
	DOMEvents [ action ] ( 
		this.shadowTree.iframe,
		Client.isExplorer == true ? "readystatechange" : DOMEvents.LOAD, 
		this._onloadHandler
	);
};

/**
 * Setup to reset on unload. This involves binding detachment.
 * @param {boolean} isRegister
 * @return
 */
WindowBinding.prototype._registerUnloadListener = function ( isRegister ) {
	
	var action = isRegister ? "addEventListener" : "removeEventListener";
	
	if ( this._unloadHandler == null ) {
		var self = this;
		this._unloadHandler = {
			handleEvent : function () {
				self._disposeContentDocument ();
				self._hasLoadActionFired = false;
			}
		}
	}
	DOMEvents [ action ] ( 
		this.getContentWindow (),
		DOMEvents.UNLOAD, 
		this._unloadHandler
	);
};

/**
 * Invoked when the contained document fires the onload event. 
 * Note that the default URL doesn't dispatch actions (since 
 * it is nearly always loaded on startup).
 * @param {DOMDocumentView} win
 */
WindowBinding.prototype.onWindowLoaded = function ( win ) {
	
	/*
	 * When overloading, PLACE YOUR CODE HERE! This 
	 * will respect the value of _hasLoadActionFired.
	 */
	
	/*
	 * Strange glitch can occur here. In both 
	 * browsers, apparently. Please investigate.
	 */
	if ( win == null ) {
		this.logger.error ( "WindowBinding#onWindowLoaded: Bad argument: " + this.getURL ());
	} else if ( this.getURL () != WindowBinding.DEFAULT_URL ) {
		if (!this._hasLoadActionFired && this.hasAccess(win)) {
			if ( win != null && win.document != null && win.document.body != null ) {
				win.document.body.style.border = "none";
				if ( win.WindowManager == undefined && !this._native) {
					Application.framework(win.document);
				}
				if ( this._isReloading == true ) {
					this._isReloading = false;
					if ( Client.isPrism ) {
						Prism.enableCache ();
					}
				}
			}
			this._registerUnloadListener ( true );
			this.dispatchAction ( WindowBinding.ACTION_ONLOAD );
			this._hasLoadActionFired = true;

			this.fitContentWindow();
		}
	}
};

/**
 * Set URL.
 * @param {string} url
 * @param {map} data
 */
WindowBinding.prototype.setURL = function ( url, data) {

	this.setProperty ( "url", url );
	this._hasLoadActionFired = false;
	
	if ( this.isAttached == true ) {
	
		/*
		 * Mozilla hardcore-caches the page from last page-refresh 
		 * unless we do this ugly hack. This bug is serious, but 
		 * apparently not documented anywhere!
		 * TODO: File this hideous bug.
		 * UPDATE: The bug seems to have been fixed...?
		 *
		if ( this.shadowTree.iframe == null ) {
			this.buildDOMContent ();
		} 
		*/
		
		/*
		 * Dispose possible contained bindings.
		 * TODO: Aint this handled by the unloadlistener?
		 */
		this._disposeContentDocument ();
		
		/*
		 * Load resolved URL.
		 */
		if (url.length > 1900) {
			var actionUrl = new Uri(Resolver.resolve(url));
			if (!data) data = new Map();
			
			actionUrl.getQueryString().each(function(name, value) {
				if (value.length > 512) {
					data.set(name, value);
					actionUrl.setParam(name, null);
				}
			});

			url = actionUrl.toString();
		}
		
		if (data) {
			var self = this;
			var iframe = this.getFrameElement();

			if(typeof this.shadowTree.form == 'undefined'){
				
				this.shadowTree.form = DOMUtil.createElementNS ( Constants.NS_XHTML, "form", this.bindingDocument );
				this.shadowTree.form.style.display = "none";
				this.shadowTree.form.enctype = "application/x-www-form-urlencoded";
				this.shadowTree.form.method = "POST";
				this.bindingElement.appendChild(this.shadowTree.form);
			}
			var form = this.shadowTree.form;

			form.action = url;
			form.target = iframe.id;
			form.setAttribute("target", iframe.id);
			while(form.firstChild){
				   form.removeChild(form.firstChild);
			}

			data.each(function (name, value) {
				var input = self.bindingDocument.createElement("input");
				input.name = name;
				input.value = value;
				input.type = "hidden";
				form.appendChild(input);
			});
			
			form.submit();

		} else {
			this.getFrameElement().src = Resolver.resolve(url);
		}
	}
};

/**
 * Unlike an iframe "src" attribute, this doesn't 
 * nescessarily include protocol, host and port information. 
 * If the url was supplied with a "${root}" type pattern, 
 * this will be reflected in the returned result.
 * @return {string}
 */
WindowBinding.prototype.getURL = function () {
	
	var result = WindowBinding.DEFAULT_URL;
	var url = this.getProperty ( "url" );
	if ( url ) {
		result = url;
	}
	return result;
};

/**
 * Reload. TODO: handle the isClearCache stuff!!!!!!!!!!!!
 * @param {boolean} isClearCache Clears the cache in Prism.
 */
WindowBinding.prototype.reload = function ( isClearCache ) {
	
	this._disposeContentDocument ();
	if ( Client.isPrism ) {
		Prism.disableCache ();
	}
	this._isReloading = true;
	this.getContentDocument ().location.reload ();
};

/**
 * Get the iframe element associated to this WindowBinding.
 * @return {DOMElement}
 */
WindowBinding.prototype.getFrameElement = function () {
	
	var result = null;
	if ( this.shadowTree.iframe != null ) {
		result = this.shadowTree.iframe;
	}
	return result;
};

/**
 * @return {Boolean}
 */
WindowBinding.prototype.hasAccess = function (win) {

	var result = false;
	if (win) {
		try {
			result = win.document != null;
		} catch (e) {
		}
	}
	return result;
};


/**
 * Get the window object hosted by this WindowBinding. 
 * During startup, this may be undefined. 
 * @return {DOMDocumentView}
 */
WindowBinding.prototype.getContentWindow = function () {
	
	var result = null, frame = this.getFrameElement ();
	if ( frame !== null ) {
		try {
			result = frame.contentWindow;
		} catch ( e ) {
			this.logger.error ( "WindowBinding#getContentWindow: strange IE9 error" );
		}
	}
	return result;
};

/**
 * Get the document object hosted by this WindowBinding.
 * @return {DOMDocument}
 */
WindowBinding.prototype.getContentDocument = function () {
	
	var result = null, win = this.getContentWindow ();
	if (this.hasAccess(win) ) {
		result = win.document;
	}
	return result;
};

/**
 * Get the RootBinding contained in this WindowBinding.
 * @return {RootBinding}
 */
WindowBinding.prototype.getRootBinding = function () {
	
	var result = null, doc = this.getContentDocument ();
	if ( doc && doc.body ) {
		result = UserInterface.getBinding ( 
			doc.body 
		);
	}
	return result;
};

/**
 * Get the PageBinding contained in this WindowBinding.
 * @return {PageBinding}
 */
WindowBinding.prototype.getPageBinding = function () {
	
	return this._pageBinding;
};

/**
 * @param {int} height
 */
WindowBinding.prototype.setHeight = function ( height ) {
	
	this.bindingElement.style.height = height + "px";
};

/**
 * Iframes should never undisplay. Contained  
 * document may not survive it (eg applets).
 * @overwrites {Binding#hide}
 */
WindowBinding.prototype.hide = function () {
	
	if ( this.isVisible == true ) {
		this.bindingElement.style.visibility = "hidden";
		this.isVisible = false;
	}
};

/**
 * @overwrites {Binding#show}
 */
WindowBinding.prototype.show = function () {
	
	if ( !this.isVisible ) {
		this.bindingElement.style.visibility = "visible";
		this.isVisible = true;
	}
};

/**
 * Directing all crawlers into contained document 
 * only if it looks lile be a framework document.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
WindowBinding.prototype.handleCrawler = function ( crawler ) {
	
	WindowBinding.superclass.handleCrawler.call ( this, crawler );
	
	if ( crawler.type == NodeCrawler.TYPE_DESCENDING ) {
		var root = this.getRootBinding ();
		if ( root != null ) {
			crawler.nextNode = root.bindingElement;
		} else {
			crawler.response = NodeCrawler.SKIP_CHILDREN;
		}
	}	
};

/**
 * Performs a HTTP post to the given URL.
 * @param {List<object>} list
 * @param {String} url
 */
WindowBinding.prototype.post = function ( list, url ) {
	
	var win = this.getContentWindow ();
	if ( win.isPostBackDocument ) {
		win.submit ( list, url );
	} else  {
		throw "Post aborted";
	}
};

/**
 * Action dispatched to be intercepted by the {@link ViewBinding}.
 * @implements {IFlexible}
 */
WindowBinding.prototype.flex = function () {

	this.fitContentWindow();
	WindowBinding.superclass.flex.call(this);
}


/**
 * Fit ContentWindows to WindowBinding.
 */
WindowBinding.prototype.fitContentWindow = function () {
	if (Client.isPad) {
		var contentWindow = this.getContentWindow();
		if (contentWindow != null && contentWindow.document != null
			&& contentWindow.document.body != null)
		{
			if(this.bindingElement.offsetHeight)
				contentWindow.document.body.style.height = this.bindingElement.offsetHeight + "px";
			if (this.bindingElement.offsetWidth)
				contentWindow.document.body.style.width = this.bindingElement.offsetWidth + "px";

		}
	}
}


/**
 * WindowBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {WindowBinding}
 */
WindowBinding.newInstance = function ( ownerDocument ) {
	
	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:window", ownerDocument );
	var binding = UserInterface.registerBinding ( element, WindowBinding );
	return binding;
};