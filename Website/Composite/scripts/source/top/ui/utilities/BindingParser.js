BindingParser.XML = "<div xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:ui=\"http://www.w3.org/1999/xhtml\">${markup}</div>";

/**
 * @class
 * Parses markup into elements with all bindings preregistered.
 * @param {DOMDocument} ownerDocument
 */
function BindingParser ( ownerDocument ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BindingParser" );
	
	/**
	 * @type {DOMDocument}
	 */
	this._ownerDocument = ownerDocument;
	
	/**
	 * @type {DOMElement}
	 */
	this._rootElement = null;
}

/**
 * Since incoming markup may not be placed in a single root element, 
 * this method returns a list of elements. Normally you would   
 * return a DOMDocumentFragment, but IE doesn't handle those. Notice 
 * that we return a list of elements, not bindings.
 * @param {string} markup
 * @return {List<DOMElement>}
 */
BindingParser.prototype.parseFromString = function ( markup ) {
	
	var result = new List ();
	var xml = BindingParser.XML.replace ( "${markup}", markup );
	var doc = XMLParser.parse ( markup );
	
	if ( doc ) {
		var solidroot = DOMUtil.createElementNS ( 
			Constants.NS_XHTML, 
			"div", 
			this._ownerDocument 
		);
		this._iterate ( doc.documentElement, solidroot );
		var node = solidroot.firstChild;
		while ( node ) {
			if ( node.nodeType == Node.ELEMENT_NODE ) {
				result.add ( node );
			}
			node = node.nextSibling;
		}
	}
	return result;
}

/**
 * Iterate an "abstract" DOM document and produce a solid XHTML nodetree.
 * @param {DOMNode} abstract
 * @param {DOMElement} collector
 */
BindingParser.prototype._iterate = function ( abstractnode, collector ) {
	
	var solidnode = null;

	switch ( abstractnode.nodeType ) {
		case Node.ELEMENT_NODE :
			solidnode = this._cloneElement ( abstractnode );
			UserInterface.registerBinding ( solidnode );
			break;
		case Node.TEXT_NODE :		
			solidnode = this._ownerDocument.createTextNode ( abstractnode.nodeValue );
			break;
	}
	if ( solidnode ) {
		collector.appendChild ( solidnode );
	}
	if ( solidnode && abstractnode.hasChildNodes ()) { // SOLIDNODE?
		var child = abstractnode.firstChild;
		while ( child ) {
			this._iterate ( child, solidnode );
			child = child.nextSibling;
		}
	}
};

/**
 * Clone element and attributes from "abstract" node and return a solid XHTML node.
 * @param {DOMElement} abstractnode
 * @return {DOMElement}
 */
BindingParser.prototype._cloneElement = function ( abstractnode ) {
	
	/*
	 * Notice that null namespaces gets converted to XHTML because of Atlas fugup.
	 */
	var solidnode = DOMUtil.createElementNS (
		abstractnode.namespaceURI ? abstractnode.namespaceURI : Constants.NS_XHTML, 
		abstractnode.nodeName, 
		this._ownerDocument 
	);
	var i = 0;
	while ( i < abstractnode.attributes.length ) {
		var attr = abstractnode.attributes.item ( i++ );
		solidnode.setAttribute ( attr.nodeName, String ( attr.nodeValue ));
	}
	return solidnode;
}

/**
 * Register binding if applicable.
 * @param {DOMElement} abstractnode
 * @param {DOMElement} solidnode
 *
BindingParser.prototype._registerBinding = function ( abstractnode, solidnode ) {
	
	UserInterface.registerBinding ( solidnode );
	if ( abstractnode.prefix && abstractnode.prefix == "ui" ) {
		var name = DOMUtil.getLocalName ( abstractnode );
		var impl = null;
		if ( abstractnode.getAttribute ( "binding" ) != null ) {
			impl = eval ( abstractnode.getAttribute ( "binding" ));
		} else {
			impl = BindingParser.map [ name ];
		}
		if ( impl ) {
			UserInterface.registerBinding ( solidnode, impl );
		}
	}
}
*/