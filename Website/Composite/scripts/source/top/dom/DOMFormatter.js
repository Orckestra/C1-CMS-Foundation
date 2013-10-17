/** 
 * @class
 * DOMFormatter. Only to be used for debugging purposes - works only in Mozilla.
 */
window.DOMFormatter = new function () {

	var TAB = "\t";
	var NEW = "\n";
	var WHITESPACE = new RegExp ( /[^\t\n\r ]/ );
	this.ignoreCDATASections = false;

	/**
	 * Nodetree indenter.
	 * @param {DOMElement} oElement
	 * @return {DOMElement} oElement indented
	 * @ignore
	 */
	function indent ( oElement ) {
	
		var doc = oElement.ownerDocument;
	
		var doindent = function ( node, iTabs ) {
			if ( node.hasChildNodes () && node.firstChild.nodeType != Node.TEXT_NODE ) {
				var sTabs = "", i = 0; 
				while ( i++ < iTabs ) {
					sTabs += TAB;
				}
				var nextnode = node.firstChild;
				while ( nextnode ) {
					switch ( nextnode.nodeType ) {
						case Node.ELEMENT_NODE :
							if ( nextnode == node.lastChild ) {
								node.appendChild ( doc.createTextNode ( NEW + sTabs ));
							}
							node.insertBefore ( doc.createTextNode ( NEW + sTabs + TAB ), nextnode );
							doindent ( nextnode, iTabs + 1 );
							break;
						case Node.COMMENT_NODE :
						case Node.PROCESSING_INSTRUCTION_NODE :
						case Node.CDATA_SECTION_NODE : 
							node.insertBefore ( doc.createTextNode ( NEW + sTabs + TAB ), nextnode );
							break;
					}
					if ( nextnode.nodeType ==  Node.CDATA_SECTION_NODE ) {
						if ( !this.ignoreCDATASections ) {
							formatCDATASection ( nextnode, sTabs + TAB );
						}
					}
					nextnode = nextnode.nextSibling;
				}
			}
		}
		doindent ( oElement, 0 );
	}
	
	/**
	 * Whitespace stripper.
	 * @param {DOMElement} oElement
	 * @return {DOMElement} oElement stripped
	 * @ignore
	 *
	 * TODO: check status on normalize method 
	 * TODO: check isElementContentWhitespace
	 * TODO: handle intext carriage returns
	 */
	function strip ( oElement ) {

		var aFilter = [];
		var oFilter = {
			acceptNode : function ( oElement ) {
				return ( !WHITESPACE.test ( oElement.nodeValue )) ? 
				NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
			}
		}
		var oWalker = oElement.ownerDocument.createTreeWalker ( 
			oElement, 
			NodeFilter.SHOW_TEXT, 
			oFilter, 
			true 
		);
		while ( oWalker.nextNode ()) aFilter.push ( oWalker.currentNode );
		var i = 0, oNode;
		while (( oNode = aFilter [ i++ ]) != null ) {
			oNode.parentNode.removeChild ( oNode );
		}
	}
	
	/**
	 * Format CDATA section text. Depending on the content scenario, this can be 
	 * controversial. For most common use (scripting language embedding) it will work 
	 * out fine. User can disable the feature by setting property ignoreCDATASections.
	 * @param {DOMCDATASectionNode} node
	 * @param {string} indent
	 * @ignore
	 *
	 * TODO: too many assumptions in routine?
	 * TODO: leaves a trailing empty line
	 * TODO: qa this routine
	 */
	function formatCDATASection ( node, indent ) {
	
		if ( node.textContent.indexOf ( NEW ) >-1 ) {
		
			var split = node.textContent.split ( NEW );
			var result = "", line, level = 0, isFirst = true;
			
			while (( line = split.shift ()) != null ) {
				
				// first line indentation level is now base reference level
				if ( level == 0 && line.charAt ( 0 ) == TAB ) {
					while ( line.charAt ( level++ ) == TAB ) {}
				}
				line = line.substring ( level, line.length );
				if ( split.length > 0 ) {
					result += indent + TAB + line;
					result += isFirst ? "" : "\n";
				}
				else {
					result += indent + line;
					indent = indent.slice ( 1, indent.length );
					node.parentNode.appendChild ( doc.createTextNode ( NEW + indent ));
				}
				isFirst = false;
			}
			node.textContent = result;
		}
	}
	
	/**
	 * Format that element.
	 * @param {DOMElement} oElement
	 * @param {int} iType Optional, stripped or indented (default)
	 * @return {DOMElement} oElement
	 */
	this.format = function ( oElement, iType ) {
		
		var STRIPPED_TYPE_RESULT = 1;

		if (document.createTreeWalker && !Client.isExplorer && !Client.isExplorer11) {
			try {
				strip ( oElement );
				if ( iType != STRIPPED_TYPE_RESULT ) {
					indent ( oElement );
				}
			}
			catch ( exception ) {
				throw new Error ( exception );
			}
		}
		return ( oElement );
	}
}

DOMFormatter.INDENTED_TYPE_RESULT = 0;
DOMFormatter.STRIPPED_TYPE_RESULT = 1;