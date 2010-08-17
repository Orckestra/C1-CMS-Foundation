/**
 * @class
 * Enables tab preservation and block indentation for Mozilla in CodePress. 
 * @link {http://codepress.org}
 * @author Wired Earp
 */
function CodePressTabManager () {}
CodePressTabManager.prototype = {
	
	_logger : top.SystemLogger.getLogger ( "CodePressTabManager" ),
	
	_win : null,
	_doc : null,
	_root : null,
	_editor : null,
	_engine : null,
	_hilitefunction : null,
	_isBlocking : false,
	_isHilite : true,
	_controlRange : null,
	_blockstart : null,
	_blockstop : null,
	_isLastLine : false,
	
	_TAB : "\t",
	_NEW : "\n",
	_TABKEY : 9,
	_NEWKEY : 13,
	_CTRLKEY : 17,
	_SPACING : /[^\t\s\n\r]/,

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
		this._doc.addEventListener ( "keypress", this, false );
		this._doc.addEventListener ( "keydown", this, false );
		this._doc.addEventListener ( "mousedown", this, false );
		this._win.addEventListener ( "blur", this, false );
		this._controlRange = this._doc.createRange ();
		this._blockstart = this._doc.createElement ( "blockstart" );
		this._blockstop = this._doc.createElement ( "blockstop" );
	},
	
	/**
	 * Handle that event.
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		switch ( e.type ) {
			
			/*
			 * MouseEvent is here to detect if user changed the current selection  
			 * by mouse. A domselectionchanged event is missing from spec...
			 */
			case "mousedown" : 
				if ( this._isBlocking == true ) {
					this._resetBlocking ();
				}
				break;
			
			case "keypress" :
				this._handleKeyPress ( e );
				break;
			
			case "keydown" :
				switch ( e.keyCode ) {
					case this._CTRLKEY : // intercepting an undo keypress (CTRL+Z)
						this._defaultKeyAction ();
						break;
				}
				break;
				
			case "blur" :
				this._defaultKeyAction (); // reset when editor is blurred
				break;
		}
	},
	
	/**
	 * Handle keypress.
	 * @param {KeyEvent} e
	 */
	_handleKeyPress : function ( e ) {
		
		var sel = this._win.getSelection ();
		var isDisabled = false;
		
		switch ( e.keyCode ) {
				
			case this._TABKEY :
				
				if ( this._isNewing == true ) {
					this._resetNewing ();
				}
				if ( !e.ctrlKey ) { // TAB+CTRL excluded
					e.preventDefault ();
					var isIndent = !e.shiftKey;
					if ( sel.isCollapsed ) {
						this._insertTab ( isIndent );
					} else {
						if ( !this._isBlocking ) {
							this._enableHighlight ( false );
							this._isBlocking = true;
						}	
						this._blockIndent ( isIndent );
					}
				}
				break;
				
			case this._NEWKEY :
				
				e.preventDefault ();
				if ( this._isBlocking == true ) {
					this._resetBlocking ();
				}
				var wasCollapsed = true;
				if ( !sel.isCollapsed ) {
					wasCollapsed = false;
					sel.deleteFromDocument ()
				}
				this._enableHighlight ( false );
				this._insertNew ( wasCollapsed );
				break;
				
			default :
				this._defaultKeyAction ();
				break;
		}
	},
	
	/**
	 * Actions to take when keys other  
	 * than TAB and NEW are pressed.
	 */
	_defaultKeyAction : function () {
		
		if ( this._isNewing == true ) {
			this._resetNewing ();
		}
		if ( this._isBlocking == true ) {
			this._resetBlocking ();
		}
		if ( this._isHilite == false ) {
			this._enableHighlight ( true );
		}
	},
	
	// UTILITIES ........................................................................
	
	/**
	 * Get the root PRE tag (not available on startup).
	 * @return {HTMLPREElement}
	 */
	_getRoot : function () {
		
		if ( this._root == null ) {
			this._root = this._doc.getElementsByTagName ( "pre" ).item ( 0 );
		}
		return this._root; 
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
			this._editor.syntaxHighlight = function () {}
		}
	},
	
	/**
	 * Simply easier than range operations.
	 * @param {string} markup
	 */
	_injectMarkup : function ( markup ) {
		
		this._doc.execCommand ( "inserthtml", false, markup );
	},
	
	/**
	 * Is whitespace?
	 * @return {boolean}
	 */
	_isWhiteSpace : function ( data ) {
		
		return !this._SPACING.test ( data );
	},
	
	// NEWLINES ........................................................................
	
	/**
	 * Insert NEW character. Remember the boolean param!
	 * @param {boolean} isPreserveIndent
	 */
	_insertNew : function ( isPreserveIndent ) {
		
		if ( !this._isNewing && isPreserveIndent ) {
			var nodes = this._getAllNodes_currentLine ();
			this._space = this._getLeadingSpace_line ( nodes );
			this._isNewing = true;
		}
		this._injectMarkup ( "<br>" + ( isPreserveIndent ? this._space : "" ));
		if ( this._isLastLine == true ) {
			this._insertLastLine ();
		}
	},
	
	/**
	 * Insert the last line. Time being, this may be considered experimental. Note that  
	 * we have a bug: insert last line and press backspace; previous char is deleted!
	 */
	_insertLastLine : function () {
		
		var temp = this._doc.createTextNode ( " " );
		this._getRoot ().appendChild ( temp );
		var range = this._win.getSelection ().getRangeAt ( 0 );
		range.setStartBefore ( temp );
		range.setEndAfter ( temp );
		range.collapse ( false );
		temp.data = "";
		this._doc.defaultView.scrollBy ( 0, 20 );
	},
	
	/**
	 * Extract the leading whitespace section of the percieved    
	 * line. Result may include both TAB and SPACE characters.
	 * @param {array<DOMNode>} nodes 
	 * @return {string}
	 */
	_getLeadingSpace_line : function ( nodes ) {
		
		var result = "";
		var string = "";
		nodes.forEach ( function ( node ) {
			if ( node.nodeType == Node.TEXT_NODE )
			string += node.data;
		})
		var match = /^\s*/.exec ( string );
		if ( match != null ) {
			result = match [ 0 ];
		}
		return result;
	},
	
	/**
	 * Is the target texnode positioned in the leading whitespace section of a line?  
	 * @param {DOMNode} target
	 * @param {array<DOMNode>} line
	 * @return {boolean}
	 *
	_isLeadingSpace_node : function ( target, line ) {
		
		var is = true;
		var isAbort = false;
		var range = this._win.getSelection ().getRangeAt ( 0 );
		
		return line.every ( function ( node ) {
			var res = true;
			if ( is == true ) {
				is = this._isWhiteSpace ( node.data );
			}
			if ( !is && node == target ) {
				res = false;
			}
			return res;
		}, this );
	},
	*/
	
	/**
	 * Reset private variables when newline mode is exited. 
	 */
	_resetNewing : function () {
				
		this._isNewing = false;
		this._spaces = null;
		this._isLastLine = false;
	},
	
	
	// INDENT ........................................................................
	
	/**
	 * Indent or unindent a single textnode. 
	 * @param {DOMNode} node
	 */
	_indentNode : function ( node, isIndent ) {
		
		if ( node.nodeType == Node.TEXT_NODE ) {
			var data = node.data;
			if ( isIndent ) {
				node.data = this._TAB + data;
			} else if ( node.data.length > 0 ) {
				node.data = data.substring ( 1, data.length );
			}
		}
	},
	
	/**
	 * Get all textnodes on the current percieved line. Note that 
	 * this may adjust the value of the variable _isLastLine.
	 * @return {array<DOMNode>}
	 */
	_getAllNodes_currentLine : function () {
		
		/*
		 * The selection is collapsed and the root PRE tag may be the focusnode. 
		 * We cannot locate the current line using the Range spec in this scenario, 
		 * so we inject a reference node and simply traverse ahead until we find it.
		 */
		this._injectMarkup ( "<abbr id=\"tabber\"/>" );
		var type = NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT;
		var walker = document.createTreeWalker ( this._doc.body, type, null, false );
		
		var isContinue = true;
		var marker = null;
		var nodes = [];

		
		while ( walker.nextNode () && isContinue ) {
			var node = walker.currentNode;
			switch ( node.nodeType ) {
				case Node.TEXT_NODE :
					nodes.push ( node );
					break;
				case Node.ELEMENT_NODE :
					switch ( node.localName.toLowerCase ()) {
						case "abbr" :
							if ( node.id == "tabber" ) {
								marker = node;
							}
							break;
						case "br" :
							if ( marker != null ) {
								isContinue = false;
							} else {
								nodes = [];
							}
							break;
					}
					break;
			}
		}
		marker.parentNode.removeChild ( marker );
		if ( isContinue ) {
			this._isLastLine = true;
		}
		return nodes;
	},

	/**
	 * This is a just debugging feature. 
	 * @param {array<DOMNode>} line
	 * @return {string}
	 */
	_getAllText_line : function ( line ) {
		
		var result = "";
		line.forEach ( function ( node ) {
			result += node.data;
		})
		return result;
	},
	
	
	// BLOCKINDENT ..................................................................
	
	/**
	 * Reset private variables when blockindent mode is exited. 
	 */
	_resetBlocking : function () {
		
		this._blockstart.parentNode.removeChild ( this._blockstart );
		this._blockstop.parentNode.removeChild ( this._blockstop );
		this._isBlocking = false;
		this._lines = null;
	},
	
	/**
	 * Indent or unindent a block of text. When unindenting, the 
	 * process will be stopped when any text in the selection hits 
	 * the far left wall. Otherwise existing indent may be spoiled.
	 * @param {boolean} isIndent
	 */
	_blockIndent : function ( isIndent ) {
		
		var lines = this._getLines_selection ();
		var isAbort = false;
		var nodes = [];
		
		lines.some ( function ( line ) {
			if ( line.length > 0 ) {
				if ( isIndent ) {
					nodes.push ( line [ 0 ]);
				} else {
					if ( !isAbort ) {
						
						var node = line [ 0 ];
						var data = node.data;
						
						/*
						 * If we remove this hack, unindent will not work 
						 * if selection anchor is at the far left margin.
						 */
						if ( data.length == 0 && line [ 1 ] != null ) {
							node = line [ 1 ];
							data = node.data;
						}
						
						if ( data.length > 0 ) {
							data = data.substring ( 0, 1 );
							if ( this._isWhiteSpace ( data )) {
								nodes.push ( node );
							} else {
								isAbort = true;
							}
						} else {
							isAbort = true;
						}
					}
				}
			}
			return isAbort;
		}, this );
		
		if ( !isAbort ) {
			nodes.forEach ( function ( node ) {
				this._indentNode ( node, isIndent );
			}, this );
		}
	},
	
	/**
	 * Because each language in CodePress comes with a unique HTML structure, 
	 * the trick here is to filter our view of the DOM tree and focus on text. 
	 * The result is cached for faster performance on repeated TAB keystrokes.
	 * @return <array<array<DOMNode>>
	 */
	_getLines_selection : function () {
		
		var sel = this._win.getSelection ();
		
		if ( this._lines == null ) {
			
			this._prepareSelection ();
			
			var type = NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT;
			var walker = document.createTreeWalker ( this._doc.body, type, null, false );
			
			var node = null;
			var prev = null;
			var lines = [];
			var line = [];
			var isContinue = true;
			var isStart = false;
			var isStop = false;
			var isTested = false;

			while ( walker.nextNode () && isContinue ) {
				
				node = walker.currentNode;
				switch ( node.nodeType ) {
					
					/*
					 * The stuff with the prev variable concerns non- 
					 * visible selection of the first and last line.
					 */
					case Node.TEXT_NODE :
						if ( !isTested && isStart == true ) { // first line
							if ( node.data.length > 0 ) {
								isTested = true;
							}
						}
						if ( prev != null ) {
							if ( node.data.length > 0 ) { // last line
								prev = null;
							}
						}
						line.push ( node );
						break;
						
					case Node.ELEMENT_NODE :
						switch ( node.localName.toLowerCase ()) {
							case "blockstart" :
								isStart = true;
								break;
							case "blockstop" :
								isStop = true;
								if ( prev != null ) {
									if ( prev.localName.toLowerCase () == "br" ) {
										isContinue = false;
									}
								}
								break;
							case "br" :
								if ( isTested == true ) {
									lines.push ( line );
								}
								if ( isStop == true ) {
									isContinue = false;
								}
								line = [];
								break;
						}
						break;
				}
				if ( node.nodeType == Node.ELEMENT_NODE ) {
					prev = node;
				}
			}
			if ( isContinue == true ) {
				lines.push ( line );
			}
			this._lines = lines;
		}
		return this._lines;
	},
	
	/**
	 * Note here!
	 */
	_prepareSelection : function () {
		
		var sel = this._win.getSelection ();
		var range = sel.getRangeAt ( 0 );
		var control = this._controlRange;
		
		control.setStart ( range.startContainer, range.startOffset );
		control.collapse ( true );
		control.insertNode ( this._blockstart );
		
		control.setEnd ( range.endContainer, range.endOffset );
		control.collapse ( false );
		control.insertNode ( this._blockstop );
		
		range.setStart ( this._blockstart, 0 );
		range.setEnd ( this._blockstop, 0 );
		sel.addRange ( range );
	},
	
	/**
	 * Insert TAB character. But when caret is positioned in  
	 * the leading whitespace section of the line, caret will   
	 * instead be positioned before the first non-whitespace 
	 * character in the line. This is Eclipse default behavior.
	 * TODO: What I just wrote... 
	 */
	_insertTab : function ( isIndent ) {
		
		var sel = this._win.getSelection ();
		var range = sel.getRangeAt ( 0 );
		var nodes = this._getAllNodes_currentLine ();
		
		if ( isIndent ) {
			this._injectMarkup ( this._TAB );
		} else {
			var has = false;
			nodes.forEach ( function ( node ) {
				if ( !has && node.length > 0 ) {
					if ( this._isWhiteSpace ( node.data )) {
						this._indentNode ( node, false );
					}
					has = true;
				}
			}, this );
		}
	}
}