ViewSourcePageBinding.prototype = new PageBinding;
ViewSourcePageBinding.prototype.constructor = ViewSourcePageBinding;
ViewSourcePageBinding.superclass = PageBinding.prototype;

ViewSourcePageBinding.XSLT = Resolver.resolve ( 
	"${root}/transformations/viewsource-xml.xsl" 
);

/**
 * @class
 */
function ViewSourcePageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ViewSourcePageBinding" );
	
	/**
	 * @type {string}
	 */
	this._action = null;
	
	/**
	 * @type {XSLTransformer}
	 */
	this._transformer = null;
	
	/**
	 * @type {DOMDocument}
	 */
	this._doc = null;

	/**
	 * @type {string}
	 */
	this._url = null;
	
	/**
	 * @type {HostedViewDefinition}
	 */
	this._viewDefinition = null;
	
	/**
	 * @type {WindowBinding}
	 */
	this._windowBinding = null;
}

/**
 * Identifies binding.
 */
ViewSourcePageBinding.prototype.toString = function () {
	
	return "[ViewSourcePageBinding]";
}

ViewSourcePageBinding.prototype.onBindingRegister = function () {
	
	ViewSourcePageBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( WindowBinding.ACTION_ONLOAD, this );
	
	this._transformer = new XSLTransformer ();
	this._transformer.importStylesheet ( ViewSourcePageBinding.XSLT );

	var url = this._getParameterByName("url");
	if(url) {
		this._url = url;
		this._action = DockTabPopupBinding.CMD_VIEWSOURCE;
	}
}

/**
 * @overloads {PageBinding#setPageArgument}
 */
ViewSourcePageBinding.prototype.setPageArgument = function ( arg ) {
	
	ViewSourcePageBinding.superclass.setPageArgument.call ( this, arg );

	this._action = arg.action;
	this._doc = arg.doc;
	this._url = arg.url;
	
	switch ( this._action ) {
		case DockTabPopupBinding.CMD_VIEWSOURCE :
			this.image = "${icon:editor-sourceview}";
			break;
		case DockTabPopupBinding.CMD_VIEWGENERATED :
		case DockTabPopupBinding.CMD_VIEWSERIALIZED :
			this.image = "${icon:default}";
			break;
	}
	
	this._inject ();
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ViewSourcePageBinding.prototype.handleAction = function ( action ) {
	
	ViewSourcePageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		case WindowBinding.ACTION_ONLOAD :
			this._windowBinding = binding;
			Application.framework ( binding.getContentDocument ());
			this.reflex ();
			this._inject ();
			break;
	}
}

ViewSourcePageBinding.prototype._getParameterByName = function ( name ) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/** 
 * Inject!
 */
ViewSourcePageBinding.prototype._inject = function () {

	if ((this._doc || this._url) && this._windowBinding) {
		
		var area = document.getElementById ( "raw" );
		var doc = this._windowBinding.getContentDocument ();
		
		if(Client.isEdge) {
			var markup = this._getMarkup();
			// raw output only!
			area.value = markup;
			doc.body.innerHTML = "Only raw source available in Microsoft Edge.";
			var tabbox = window.bindingMap.tabbox;
			var rawtab = window.bindingMap.rawtab;
			tabbox.select(rawtab);

		} else if (Client.isExplorer && this._action == DockTabPopupBinding.CMD_VIEWGENERATED) {
			
			var markup = this._doc.body.innerHTML;
			
			// raw output only!
			area.value = markup;
			doc.body.innerHTML = "Only raw source available in Internet Explorer.";
		
		} 
		else {
		
			var markup = this._getMarkup ();
			
			if ( markup ) {
			
				// raw output
				area.value = markup;
				
				// fancy output
				var isIgnore = true;
				var source = XMLParser.parse ( markup, isIgnore );
				if ( source ) {
					/* 
					this.logger.debug ( 
						DOMSerializer.serialize ( 
							this._transformer.transformToDocument ( source ), 
							true 
						)
					);
					*/
					var result = this._transformer.transformToString ( source );
					doc.body.innerHTML = result;
				} else {
					// the non-wellformed message is already present in markup.
				}
			}
		}
		
		// display result
		window.bindingMap.cover.hide ();
	}
}

/** 
 * Inject!
 */
ViewSourcePageBinding.prototype._getMarkup = function () {
	
	var result = null;
	
	switch ( this._action ) {
		
		case DockTabPopupBinding.CMD_VIEWSOURCE :
			var url = this._url ? this._url : this._doc.location.toString();
			var request = DOMUtil.getXMLHTTPRequest ();
			request.open ( "get", url, false );
			request.send ( null );
			result = request.responseText;
			break;
			
		case DockTabPopupBinding.CMD_VIEWGENERATED :
			
			if ( Client.isMozilla ) {
				result = DOMSerializer.serialize ( this._doc );
			} else {
				Dialog.warning ( "Browser Dysfunction", "Generated source not available for Internet Explorer." );
			}
			break;
			
		case DockTabPopupBinding.CMD_VIEWSERIALIZED :
			
			alert ( "ViewSourcePageBinding: UPDATE REQUIRED!" );
			//result = this._viewBinding.getRootBinding ().serializeToString ();
			break;
	}
	
	return result;
	
}