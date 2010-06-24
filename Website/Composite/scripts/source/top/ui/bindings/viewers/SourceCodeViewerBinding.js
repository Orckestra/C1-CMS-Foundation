SourceCodeViewerBinding.prototype = new WindowBinding;
SourceCodeViewerBinding.prototype.constructor = SourceCodeViewerBinding;
SourceCodeViewerBinding.superclass = WindowBinding.prototype;

SourceCodeViewerBinding.ACTION_INITIALIZED = "sourcecodeviewer initialized";

/**
 * @type {string}
 */
SourceCodeViewerBinding.URL_DEFAULT = "${root}/content/misc/viewers/sourcecodeviewer/viewsourcecontent.aspx";

/*
 * Supported syntax list. Currently only XML supported!
 * type {object}
 */
SourceCodeViewerBinding.syntax = {

	XML : "xml"
}

/*
 * Transformatrix stylesheets.
 * type {HashMap<string><string>}
 */
SourceCodeViewerBinding.stylesheets = {

	"xml" : Resolver.resolve ( "${root}/transformations/viewsource-xml.xsl" )
}

/**
 * @class
 */
function SourceCodeViewerBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceCodeViewerBinding" );
	
	/**
	 * @type {string}
	 */
	this._syntax = null;
	
	/**
	 * @type {XSLTransformer}
	 */
	this._transformer = null;
}

/**
 * Identifies binding.
 */
SourceCodeViewerBinding.prototype.toString = function () {
	
	return "[SourceCodeViewerBinding]";
}

/**
 * @overloads {WindowBinding#onBindingAttach}.
 */
SourceCodeViewerBinding.prototype.onBindingAttach = function () {
	
	this._syntax = this.getProperty ( "syntax" );
	
	/*
	 * Verify syntax.
	 */
	switch ( this._syntax ) {
		case SourceCodeViewerBinding.syntax.XML :
			var stylesheet = SourceCodeViewerBinding.stylesheets [ this._syntax ];
			this._transformer = new XSLTransformer ();
			this._transformer.importStylesheet ( stylesheet );
			break;
		default :
			throw "SourceCodeViewer: Syntax error!";
			this._syntax = null;
			break;
	}
	
	/*
	 * Fetch the start content (serverside control scenario).
	 */
	var textarea = DOMUtil.getElementsByTagName ( this.bindingElement, "textarea" ).item ( 0 );
	if ( textarea ) {
		this._startcontent = textarea.value;
	}
	
	this.setURL ( SourceCodeViewerBinding.URL_DEFAULT );
	this.addActionListener ( WindowBinding.ACTION_ONLOAD );
	SourceCodeViewerBinding.superclass.onBindingAttach.call ( this );
}

/** 
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SourceCodeViewerBinding.prototype.handleAction = function ( action ) {

	SourceCodeViewerBinding.superclass.handleAction.call ( this, action );
	
	/*
	 * Show start content when iframe is loaded. Don't expose 
	 * the iframe, dispatching special action instead.
	 */
	switch ( action.type ) {
		case WindowBinding.ACTION_ONLOAD :
			if ( action.target == this ) {
				if ( this._startcontent ) {
					this.view ( this._startcontent );
				}
				this.dispatchAction ( SourceCodeViewerBinding.ACTION_INITIALIZED );
				action.consume ();
			}
			break;
	}
	
	SourceCodeViewerBinding.superclass.handleAction.call ( this, action );
}

/** 
 * View source. 
 * @param {object} arg Argument is loosely dependant on viewer syntax.
 */
SourceCodeViewerBinding.prototype.view = function ( arg ) {
	
	switch ( this._syntax ) {
		case SourceCodeViewerBinding.syntax.XML :
			this._viewXML ( arg );
			break;
	}
}

/** 
 * View XML source.
 * @param {object} arg This should be either a parsable string or an XMLDocument.
 */
SourceCodeViewerBinding.prototype._viewXML = function ( arg ) {
	
	var doc = null;
	
	if ( arg ) {
		if ( typeof arg == Types.STRING ) {
			doc = XMLParser.parse ( arg );
		} else if ( arg.nodeType && arg.nodeType == Node.DOCUMENT_NODE ) {
			doc = object;
		}
	}
	
	if ( doc ) {
		var result = this._transformer.transformToString ( doc );
		this._inject ( result );
	}
}

/** 
 * View HTML source.
 * @param {object} arg This should be either a parsable string or an HTMLDocument.
 */
SourceCodeViewerBinding.prototype._viewHTML = function ( arg ) {
	
	// Note to self: This will require a call to HTMLTidy in Explorer.
}

/** 
 * View HTML source.
 * @param {string} arg This should be a wellformed javascript.
 */
SourceCodeViewerBinding.prototype._viewJavascript = function ( arg ) {
	
	// Note to self: This should probably NOT be done using XSLT.
}

/**
 * Injecting transformation result into iframe document.
 * @param {string} markup
 */
SourceCodeViewerBinding.prototype._inject = function ( markup ) {
	
	this.getContentDocument ().body.innerHTML = markup;
}