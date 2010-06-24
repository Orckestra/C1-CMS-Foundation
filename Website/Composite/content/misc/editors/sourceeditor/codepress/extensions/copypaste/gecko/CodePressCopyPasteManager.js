/**
 * @class 
 * @link {http://codepress.org}
 * @author Wired Earp
 */
function CodePressCopyPasteManager () {}
CodePressCopyPasteManager.prototype = {
	
	_logger : top.SystemLogger.getLogger ( "CodePressCopyPasteManager" ),
	
	_win : null,
	_doc : null,
	_editor : null,
	_engine : null,
	_clipboard : null,
	_isMac : false,
	_isPasting : false,
	_isCutting : false,
	_cc : "\u2009",
	
	_keys : {
		INS : 45,
		DEL : 46
	},
	
	_chars : {
		X : 120,
		C : 99,
		V : 118		
	},
	
	/**
	 * Initialize tab management.
	 * @param {HTMLDocumentView} win 
	 */
	manage : function ( win ) {
		
		this._win = win;
		this._doc = win.document;
		this._engine = win.CodePress;
		this._editor = win.frameElement.editor;
		this._hilitefunction = this._editor.syntaxHighlight;
		this._isMac = navigator.platform.indexOf ( "Mac" ) > -1;
		this._clipboard = this._createClipboard ();
		this._doc.addEventListener ( "keydown", this, false );
		this._doc.addEventListener ( "keypress", this, false );
		this._clipboard.addEventListener ( "input", this, false );
	},
	
	/**
	 * Create the clipboard.
	 * @return {HTMLTextAreaElement}
	 */
	_createClipboard : function () {
		
		var doc = this._win.frameElement.ownerDocument;
		var area = doc.createElement ( "textarea" );
		area.setAttribute ( "autocomplete", "off" );
		area.style.position = "absolute";
		area.style.height = "100px";
		area.style.width = "300px";
		area.style.top = "-200px";
		area.style.right = "0";
		area.tabIndex = -1;
		doc.body.appendChild ( area );
		return area;
	},

	/**
	 * @param {KeyEvent} e
	 */
	handleEvent : function ( e ) {
		
		var isCut = false;
		var isCopy = false;
		var isPaste = false;
		
		switch ( e.type ) {
		
			case "input" :
				if ( this._isPasting ) {
					this._paste ();
					this._isPasting = false;
				}
				break;
				
			case "keypress" :
				var isCommand = ( this._isMac && e.metaKey ) || e.ctrlKey;
				if ( isCommand ) {
					switch ( e.charCode ) {
						case this._chars.V :
							isPaste = true;
							break;
						case this._chars.C :
						case this._chars.X :
							isCopy = true;
							if ( e.charCode == this._chars.X ) {
								isCut = true;
							}
							break;
					}
				}
				break;
				
			case "keydown" :
				var isCommand = ( this._isMac && e.metaKey ) || e.ctrlKey;
				if ( isCommand ) {
					switch ( e.keyCode ) {
						case this._keys.INS :
							isCopy = true;
							break;
					}
				} else if ( e.shiftKey ) {
					switch ( e.keyCode ) {
						case this._keys.DEL :
							isCopy = true;
							isCut = true;
							break;
						case this._keys.INS :
							// isPaste = true;
							/*
							 * Bug in Mozilla! This will focus the textarea, 
							 * but paste is not carried out. Pressing shift +
							 * insert again will do the trick. For now, we 
							 * simply perform a normal paste using no textarea. 
							 */
							break;
					}
				}
				break;
		}
		if ( isCut || isCopy ) {
			if ( !this._win.getSelection ().isCollapsed ) {
				if ( isCut ) {
					this._isCutting = true;
				}
				this._oncopy ();
			}
		} else if ( isPaste ) {
			this._isPasting = true;
			this._onpaste ();
		}
	},
	
	/**
	 * Cleanup.
	 */
	_cleanup : function () {
		
		this._clipboard.value = "";
	},
	
	/**
	 * Intercept paste: Transfer focus to clipboard.
	 */
	_onpaste : function () {
		
		this._clipboard.focus ();
		this._enableHighlight ( false );
	},
	
	/**
	 * Peform paste: Focus CodePress and inject from clipboard.
	 */
	_paste : function () {
		
		this._win.focus ();
		this._inject ( this._clipboard.value );
		this._cleanup ();
		this._enableHighlight ( true );
		this._editor.syntaxHighlight ( "generic" ); // DOESNT ALWAYS!
	},
	
	/**
	 * Intercept copy: Move selection text to clipboard, 
	 * focus clipboard and restore focus to CodePress.
	 */
	_oncopy : function () {
		
		this._clipboard.value = this._getSelectedText ();
		this._clipboard.focus ();
		this._clipboard.setSelectionRange ( 0, this._clipboard.value.length );
		
		var self = this;
		top.setTimeout ( function () {
			self._win.focus ();
			self._cleanup ();
			if ( self._isCutting ) {
				self._cut ();
			}
		}, 0 );
	},
	
	/**
	 * Cut selection.
	 */
	_cut : function () {
		
		if ( this._isCutting ) {
			this._win.getSelection ().getRangeAt ( 0 ).deleteContents ();
			this._isCutting = false;
		}
	},
	
	/**
	 * The toString methods of selection and range objects 
	 * will destroy tabs and newlines. We must compute it. 
	 * @return {string}
	 */
	_getSelectedText : function () {
		
		var selection = this._win.getSelection ();
		if ( !selection.isCollapsed ) {
			
			var range = selection.getRangeAt ( 0 );
			var offset = range.endOffset;
			var filter = NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT;
			var walker = this._doc.createTreeWalker ( this._doc.body, filter, null, false );
			var isResult = false;
			var result = ""; 
			
			while ( walker.nextNode ()) {
				var node = walker.currentNode;
				if ( selection.containsNode ( node, true )) {
					switch ( node.nodeType ) {
						case Node.TEXT_NODE :
							result += node.nodeValue;
							if ( range.endContainer.nodeType == Node.TEXT_NODE ) {
								if ( offset != 0 ) {
									if ( node == range.endContainer ) {
										offset = node.nodeValue.length - offset;
									}
								}
							}
							break;
						case Node.ELEMENT_NODE :
							if ( node.nodeName.toLowerCase () == "br" ) {
								result += "\n";
							}
							break;
					}
				}
			}
			if ( range.startContainer.nodeType == Node.TEXT_NODE ) {
				if ( selection.containsNode ( range.startContainer, true )) {
					result = result.substring ( range.startOffset, result.length );
				}
			}
			if ( range.endContainer.nodeType == Node.TEXT_NODE ) {
				if ( selection.containsNode ( range.endContainer, true )) {
					result = result.substring ( 0, result.length - offset );
				}
			}
			return result;
		}
	},
	
	/**
	 * @param {string} code
	 */
	_inject : function ( code ) {
			
		code = code.replace ( /&/gi, "&amp;" );
		code = code.replace ( /</g, "&lt;" );
		code = code.replace ( />/g, "&gt;" );
		
		/*
		 * Delete existing selection. Apparently 
		 * not covered by execCommand "inserthtml".
		 */
		var sel = this._win.getSelection ();
		if ( !sel.isCollapsed ) {
			sel.deleteFromDocument ();
		}
		
		/*
		 * For some odd reason, caret positions get's misplaced 
		 * when injected code contains a line break. This fixes.
		 */
		if ( code.indexOf ( "\n") >-1 ) {
			this._doc.execCommand ( "inserthtml", false, code + this._cc );
			this._win.find ( this._cc, true, false );
			this._win.getSelection ().getRangeAt ( 0 ).deleteContents ();
		} else {
			this._doc.execCommand ( "inserthtml", false, code );
		}
	},
	
	/**
	 * Improvised kill switch for syntax highlighting 
	 * in CodePress. Please introduce a flag for this!
	 * @param {boolean} isEnable
	 */
	_enableHighlight : function ( isEnable ) {
		
		this._isHilite = isEnable;
		if ( isEnable ) {
			this._editor.syntaxHighlight = this._hilitefunction;
		} else {
			this._editor.syntaxHighlight = function () {};
		}
	}
}