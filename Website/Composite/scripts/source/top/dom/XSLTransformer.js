/**
 * @class
 * XSL transformers rule.
 */
function XSLTransformer () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "XSLTransformer" );
	
	/**
	 * @type {MSXMLXSLTemplate}
	 */
	this._processor = null;
	
	/**
	 * @type {MSXMLXSLTemplate}
	 */
	this._cache = null;
}

/**
 * Import stylesheet.
 * @param {string} url
 */
XSLTransformer.prototype.importStylesheet = function ( url ) {
	
	var stylesheet = this._import ( 
		Resolver.resolve ( url )
	);
	
	if (Client.hasXSLTProcessor) {
		this._processor = new XSLTProcessor ();
		this._processor.importStylesheet ( stylesheet );
	} else {	
		this._cache = DOMUtil.getMSXMLXSLTemplate ();
		this._cache.stylesheet = stylesheet;
	}
}

/**
 * @param {string} url
 * @return {DOMDocument}
 */
XSLTransformer.prototype._import = function ( url ) {

	var result = null;

	if (Client.hasXSLTProcessor) {
	
		var request = DOMUtil.getXMLHTTPRequest ();
		request.open ( "get", Resolver.resolve ( url ),  false );
		request.send ( null );
		result = request.responseXML;
		
	} else {
		
		var result = DOMUtil.getDOMDocument ( true );
		result.async = false;
		result.load ( url );
	}
	
	return result;
}

/**
 * @param {DOMDocument} dom
 * @return {DOMDocument}
 */
XSLTransformer.prototype.transformToDocument = function ( dom ) {
	
	var result = null;
	if (Client.hasXSLTProcessor) {
		result = this._processor.transformToDocument ( dom );
	} else {
		alert ( "TODO!" );
	}
	return result;
	
}

/**
 * @param {DOMDocument} dom
 * @param {boolean} isPrettyPrint
 * @return {string}
 */
XSLTransformer.prototype.transformToString = function ( dom, isPrettyPrint ) {
	
	var result = null;
	if (Client.hasXSLTProcessor) {
		var doc = this.transformToDocument ( dom );
		result = DOMSerializer.serialize ( doc, isPrettyPrint ); 
	} else {
		var proc = this._cache.createProcessor ();
		proc.input = dom;
		proc.transform ();
		result = proc.output;
	}
	return result;
}