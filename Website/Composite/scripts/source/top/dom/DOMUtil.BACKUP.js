/**
 * @class
 */
window.DOMUtil = new function () {
	
	var MSXML_MAXVERSION	= 6;
	var MSXML_MINVERSION 	= 1;
	var MSXML_HTTPREQUEST	= "MSXML2.XMLHTTP.{$version}.0";
	var MSXML_DOMDOCUMENT	= "MSXML2.DOMDocument.{$version}.0";
	var MSXML_FREETHREADED	= "MSXML2.FreeThreadedDOMDocument.{$version}.0";
	var MSXML_XSLTEMPLATE	= "MSXML2.XSLTemplate.{$version}.0"; // capitals here?

	var logger = SystemLogger.getLogger ( "DOMUtil" );
	
	/**
	 * You've been ActiveX'ed.
	 * @ignore
	 */
	function getMSComponent ( signature ) {
	
		var sig, result = null, version = MSXML_MAXVERSION;
		while ( !result && version >= MSXML_MINVERSION ) {
			try {
				sig = signature.replace ( "{$version}", version );
				result = new ActiveXObject ( sig );
			} catch ( exception ) {}
			version--;
		}
		return result;
	}
	
	/**
	 * Builds a XmlHttpRequest.
	 * @return {XMLHTTPRequest}
	 */
	this.getXMLHTTPRequest = function () {
	
		var result = null;
		if ( Client.isExplorer ) {
			result = getMSComponent ( MSXML_HTTPREQUEST );
		} else {
			result = new XMLHttpRequest ();
		}
		return result;
	}
	
	/**
	 * Builds a DOM document.
	 * @return {DOMDocument}
	 * @param {boolean} isFreeThreaded
	 */
	this.getDOMDocument = function ( isFreeThreaded ) {
	
		var result = null;
		if ( Client.isExplorer ) {
			result = getMSComponent ( isFreeThreaded ? MSXML_FREETHREADED : MSXML_DOMDOCUMENT );
		} else {
			/*
			 * There is an encoding fokup in Firefox 3 when using the command  
			 * document.implementation.createDocument ( "", "", null ).  
			 * See bug 431701 (claimed fixed for FF 3.0.4, but that's a lie).
			 */
			var doc = XMLParser.parse ( "<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>" );
			doc.removeChild ( doc.documentElement );
			result = doc;
		}
		return result;
	}
	
	/**
	 * @return {MSXMLXSLTemplate}
	 */
	this.getMSXMLXSLTemplate = function () {
		
		var result = null;
		if ( Client.isExplorer ) {
			result = getMSComponent ( MSXML_XSLTEMPLATE );
		}
		return result;
	}
	
	/**
	 * Get the localname of a DOM element.
	 * @param {DOMElement} element
	 * @return {string}
	 */
	this.getLocalName = function ( element ) {
	
		var result = null;
		if ( element.localName ) {
			result = element.localName;
		} else if ( element.baseName ) {
			result = element.baseName;
		} else {
			result = element.nodeName.toLowerCase (); // HTMLElement in explorer!
		}
		return result;
	}
	
	/**
	 * Get computed style.
	 * @param {DOMElement} element
	 * @param {string} styleprop
	 */
	this.getComputedStyle = function ( element, styleprop ) {
	
		if ( element.currentStyle ) {
			return element.currentStyle [ styleprop ];
		} else {
			return element.ownerDocument.defaultView
				.getComputedStyle ( element, null ).getPropertyValue ( styleprop );
		}
	}
	
	/**
	 * Get max z-index.
	 * @param {DOMDocument} doc
	 */
	this.getMaxIndex = function ( doc ) {
	
		var max = 0, elements = new List ( 
			this.getElementsByTagName ( doc, "*" )
		);
		elements.each ( function ( element ) {
			var index = CSSComputer.getZIndex ( element );
			if ( index > max ) {
				max = index;
			}
		});
		return max;
	}
	
	/**
	 * Get the ordinal position of a DOM element within it's container (skipping textnodes). 
	 * @param {DOMElement} element
	 * @param {boolean} isSimilar If set to true, count only elements of equal nodeName.
	 * @return {int}
	 */
	this.getOrdinalPosition = function ( element, isSimilar ) {
		
		var result = null;
		var position = -1;
		var localName = this.getLocalName ( element );
		var children = new List ( element.parentNode.childNodes );
		
		while ( children.hasNext ()) {
			var child = children.getNext ();
			if ( child.nodeType == Node.ELEMENT_NODE ) {
				if ( !isSimilar || this.getLocalName ( child ) == localName ) {
					position ++;
					if ( child == element || ( child.id != "" && child.id == element.id )) { // spell it out for ie!
						result = position;
						break;
					}
				}
			}
		}
		return result;
	}
	
	/**
	 * @param {DOMElement} element
	 * @param {boolean} isSimilar If set to true, count only elements of equal nodeName.
	 * @return {boolean}
	 */
	this.isFirstElement = function ( element, isSimilar ) {
	
		return ( DOMUtil.getOrdinalPosition ( element, isSimilar ) == 0 );
	}
	
	/**
	 * @param {DOMElement} element
	 * @param {boolean} isSimilar If set to true, count only elements of equal nodeName.
	 * @return {boolean}
	 */
	this.isLastElement = function ( element, isSimilar ) {
	
		var elements = DOMUtil.getElementsByTagName ( 
			element.parentNode,
			isSimilar ? DOMUtil.getLocalName ( element ) : "*" 
		);
		return ( DOMUtil.getOrdinalPosition ( element ) == elements.length );
	}
	
	/**
	 * Get the window object associated to a given node. 
	 * @param {DOMNode} node
	 * @return {window}
	 */
	this.getParentWindow = function ( node ) {
		
		var doc = node.nodeType == Node.DOCUMENT_NODE ? node : node.ownerDocument;
		return doc.defaultView ? doc.defaultView : doc.parentWindow;
	}
	
	/**
	 * Get the text content of a node.
	 * @param {DOMNode} node
	 * @return {string}
	 */
	this.getTextContent = function ( node ) {
	
		var result = null;
		if ( node.textContent ) {
			result = node.textContent;
		} else if ( node.text ) {
			result = node.text;
		} else {
			result = node.innerText;
		}	
		return result;
	}
	
	/**
	 * Set the text content of a node.
	 * @param {DOMNode} node
	 * @param {string} text
	 */
	this.setTextContent = function ( node, text ) {
		
		text = String ( text );
		if ( node.textContent ) {
			node.textContent = text;
		} else if ( node.text ) {
			node.text = text;
		} else {
			node.innerText = text;
		}
	}
	
	/**
	 * Get ancestor by localname (nodename with no namespace prefix).
	 * @param {string} nodeName
	 * @param {DOMNode} node
	 * @param {boolean} isTraverse If true, cross iframe boundaries
	 * @return {DOMElement}
	 */
	this.getAncestorByLocalName = function ( nodeName, node, isTraverse ) {
		
		var result = null;
		while ( result == null ) {
			node = node.parentNode;
			if ( node.nodeType == Node.DOCUMENT_NODE ) {
				if ( isTraverse == true ) {
					var win = DOMUtil.getParentWindow ( node );
					node = win.frameElement;
				} else {
					break;
				}
			}
			if ( this.getLocalName ( node ) == nodeName ) {
				result = node;
			}
		}
		return result;
	}
	
	/**
	 * Does element contain a node?
	 * @param {DOMElement} element
	 * @param {DOMNode} node
	 */
	this.contains = function ( element, node ) {
		
		return element.contains ? 
			element != node && element.contains ( node ) : 
			!!( element.compareDocumentPosition ( node ) & 16 );
	}
	
	/**
	 * CreateElementNS. For HTML documents, this is simply simulated in explorer.
	 * @param {URI} namespaceURI
	 * @param {string} nodeName
	 * @parm {DOMDocument} ownerDocument
	 * @return {DOMElement}
	 */
	this.createElementNS = function ( namespaceURI, nodeName, ownerDocument ) {
		
		var result = null;
		if ( !ownerDocument ) { // always forget this argument...
			alert ( "DOMUtil#createElementNS : Missing argument (DOMDocument)" );
		} else {
			if ( Client.isMozilla ) {
				result = ownerDocument.createElementNS ( namespaceURI, nodeName );
			} else {
				if ( ownerDocument.xml != null ) {
					result = ownerDocument.createNode ( 
						Node.ELEMENT_NODE, nodeName, namespaceURI 
					);
				} else {
					result = ownerDocument.createElement ( nodeName );
				}
			}
		}
		return result;
	}
	
	/**
	 * Get elements by tagname in the XHTML namespace. DOM3 style 
	 * qualified namespaces seems to be required for Gecko 1.9 alpha.
	 * TODO: DEPRECATE THIS UNIVERSALLY AT SOME POINT! - MARKING @DEPRECATED FOR NOW!
	 * @deprecated
	 * @param {DOMNode} node
	 * @param {string} tagname
	 * @return {NodeList} this would be an simple array in explorer...
	 */
	this.getElementsByTagName = function ( node, tagname ) {
		
		var result = null;
		if ( Client.isMozilla ) {
			result = node.getElementsByTagNameNS ( Constants.NS_XHTML, tagname );
		} else {
			result = node.getElementsByTagName ( tagname );
		}
		return result;
	}
	
	/**
	 * Get next element sibling.
	 * @param {DOMElement} element
	 * @return {DOMElement}
	 */
	this.getNextElementSibling = function ( element ) {
		
		return Client.isExplorer ? element.nextSibling : element.nextElementSibling;
	}
	
	/**
	 * Get previous element sibling.
	 * @param {DOMElement} element
	 * @return {DOMElement}
	 */
	this.getPreviousElementSibling = function ( element ) {
		
		return Client.isExplorer ? element.previousSibling : element.previousElementSibling;
	}
	
	/**
	 * Clone node. This seems to terminate encoding in Firefox 3.0.4, 
	 * so we slip it through a serializer and suck it back up with a parser.   
	 * The bug is verified fixed in Firefox 3.1 - no known bug number!
	 * TODO: DEPRECATE THIS UNIVERSALLY - MARKING @DEPRECATED FOR NOW
	 * @deprecated
	 * @param {DOMNode} node
	 */
	this.cloneNode = function ( node ) {
		
		var result = null;
		if ( Client.isMozilla == true ) {
			result = XMLParser.parse ( DOMSerializer.serialize ( node ));
		} else {
			result = node.cloneNode ( true );
		}
		return result;
	}
	
	/**
	 * Find position of element in local coordinate space 
	 * (relative to the nearest positioned ancestor).
	 * @param {DOMElement} element
	 * @return {Point}
	 */
	this.getLocalPosition = function ( element ) {
		
		var result = new Point ( element.offsetLeft, element.offsetTop );
		
		if ( Client.isExplorer && element.parentNode && element.parentNode.currentStyle ) {
			if ( element.parentNode.currentStyle.position == "static" ) {
				var point = this.getLocalPosition ( element.parentNode );
				result.x += point.x;
				result.y += point.y;
			}
		}
		
		return result;
	}
	
	/**
	 * Find position of element relative to the elements viewport. 
	 * @param {DOMElement} element
	 * @return {Point}
	 */
	this.getGlobalPosition = function ( element ) {
	
		return getPosition ( element, false );
	}
	
	/**
	 * Find position of element relative to the top viewport. 
	 * @param {DOMElement} element
	 * @return {Point}
	 */
	this.getUniversalPosition = function ( element ) {
	
		return getPosition ( element, true );
	}
	
	/**
	 * Find position. 
	 * @param {DOMElement} element
	 * @param {boolean} isUniversal
	 * @return {Point}
	 * @ignore
	 */
	function getPosition ( element, isUniversal ) {
		
		var result = null;
		
		/*
		 * Explorer and Firefox 3.0
		 */
		if ( typeof element.getBoundingClientRect != Types.UNDEFINED ) {
			
			var rect = element.getBoundingClientRect ();
			result = {
				x : rect.left,
			 	y : rect.top
			}
			if ( Client.isMozilla ) { 
				// why would mozilla steal this method and implement it differently?
				result.x -= element.scrollLeft;
				result.y -= element.scrollTop;
			}
		
		/*
		 * Firefox 2.0
		 */
		} else {
			result = {
				x : element.offsetLeft - element.scrollLeft,
				y : element.offsetTop - element.scrollTop
			}
			while ( element.offsetParent ) {
				element = element.offsetParent;
				result.x += ( element.offsetLeft - element.scrollLeft );
				result.y += ( element.offsetTop - element.scrollTop );
			}
			
		}
		if ( isUniversal ) {
			var win = DOMUtil.getParentWindow ( element );
			if ( win ) {
				var frame = win.frameElement;
				if ( frame ) {
					var add = DOMUtil.getUniversalPosition ( frame );
					result.x += add.x;
					result.y += add.y;
				}
			}
		}
		return new Point ( result.x, result.y );
	}
	
	/**
	 * @param {MouseEvent} e
	 */
	this.getGlobalMousePosition = function ( e ) {
	
		return getMousePosition ( e, false );
	}
	
	/**
	 * @param {MouseEvent} e
	 */
	this.getUniversalMousePosition = function ( e ) {
	
		return getMousePosition ( e, true );
	}
	
	/**
	 * @param {MouseEvent} e
	 * @param {boolean} isUniversal
	 * @ignore
	 */
	function getMousePosition ( e, isUniversal ) {
		
		var element = DOMEvents.getTarget ( e );
		
		var result = {
			x : e.pageX ? e.pageX : e.clientX,
			y : e.pageY ? e.pageY : e.clientY
		}
		
		/*
		 * Vaguely hardcoded to compensate only for the BODY scroll!
		 */
		if ( Client.isMozilla ) {
			var doc = element.ownerDocument;
			var win = DOMUtil.getParentWindow ( doc );
			result.x -= win.pageXOffset;
			result.y -= win.pageYOffset;
		}
		
		if ( isUniversal ) {
			var frame = DOMUtil.getParentWindow ( element ).frameElement;
			if ( frame ) {
				var add = DOMUtil.getUniversalPosition ( frame );
				result.x += add.x;
				result.y += add.y;
			}
		}
		return result;
	}
}