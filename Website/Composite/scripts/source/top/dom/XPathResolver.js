/**
 * @class
 */
function XPathResolver () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "XPathResolver" );

	/**
	 * @type {XPathEvaluator}
	 */
	this._evaluator = window.XPathEvaluator ? new XPathEvaluator () : null;
	
	/**
 	 * @type {HashMap<string><string>}
 	 */
	this._nsResolver = null;
}

/**
 * @param {HashMap<string><string>} hashMap
 */
XPathResolver.prototype.setNamespacePrefixResolver = function ( hashMap ) {

	if ( this._evaluator ) {
		this._nsResolver = {
			lookupNamespaceURI : function ( prefix ) {
				return hashMap [ prefix ];
			}
		}
	} else {
		this._nsResolver = hashMap;
	 }
}

/**
 * In effect implementing Microsofts "selectSingleNode" method.
 * @param {string} xpath
 * @param {DOMNode} node
 * @param {boolean} isMultiple
 * @return {DOMElement)
 */
XPathResolver.prototype.resolve = function ( xpath, node, isMultiple ) {
	
	var result = null;
	try {
		if ( this._evaluator ) {
			result = this._evaluateDOMXpath ( xpath, node, isMultiple ? true : false );	
		} else {
			result = this._evaluateMSXpath ( xpath, node, isMultiple ? true : false );
		}
	} catch ( exception ) {
		alert ( "XPathResolver#resolve: " + exception );
		if ( exception.stack ) {
			alert ( exception.stack );
		} else {
			alert ( arguments.caller.callee.toString ());
		}
		throw exception;
	}
	return result;
}

/**
 * In effect implementing Microsofts "selectNode" method.
 * @param {string} xpath
 * @param {DOMNode} node
 * @return {List)
 */
XPathResolver.prototype.resolveAll = function ( xpath, node ) {

	return this.resolve ( xpath, node, true );
}

/**
 * Evaluate DOM3 style.
 * @param {string} xpath
 * @param {DOMNode} node
 * @param {boolean} isMultiple
 * @return {object) Either a DOMElement or a List (depends on isMultiple).
 * @private
 */
XPathResolver.prototype._evaluateDOMXpath = function ( xpath, node, isMultiple ) {
	
	var result = null;
	
	if ( node ) {
		var result = this._evaluator.evaluate ( 
			xpath, node, this._nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null 
		);
		if ( isMultiple ) {
			var list = new List ();
			while (( node = result.iterateNext ()) != null ) {
				list.add ( node );
			}
			result = list;
		} else {
			result = result.iterateNext ();
		}
	} else {
		var cry = "XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
		if ( Application.isDeveloperMode ) {
			alert ( cry );
		} else {
			this.logger.fatal ( cry );
		}
	}
	return result;
}

/**
 * Evaluate Microsoft style.
 * @param {string} xpath
 * @param {DOMNode} node
 * @param {boolean} isMultiple
 * @return {object) Either a DOMElement or a List
 * @private
 */
XPathResolver.prototype._evaluateMSXpath = function ( xpath, node, isMultiple ) {
	
	var doc = ( node.nodeType == Node.DOCUMENT_NODE ? node : node.ownerDocument );
	
	/*
	 * define selectionnamespaces on each xpath evaluation. this way, one 
	 * single XPathResolver can be used to evaluate multiple documents. 
	 * TODO: why doesnt it work when reading getProperty?
	 */
	var nsDeclarations = "";
	for ( var prefix in this._nsResolver ) {
		nsDeclarations += "xmlns:" + prefix + "=\"" + this._nsResolver [ prefix ] + "\" ";	
	}
	doc.setProperty ( "SelectionNamespaces", nsDeclarations );	
	
	if ( isMultiple ) {
		var list = new List ();
		var i = 0, nodes = node.selectNodes ( xpath );
		while ( i < nodes.length ) {
			list.add ( nodes.item ( i++ ));
		}
		result = list;
	} else {
		result = node.selectSingleNode ( xpath );
	}
	return result;
}