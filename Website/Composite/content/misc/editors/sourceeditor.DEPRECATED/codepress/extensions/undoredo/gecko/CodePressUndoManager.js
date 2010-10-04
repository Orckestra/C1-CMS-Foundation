/*
 * Clone Java Swing KeyEvent interface.
 * TODO: investigate ALT and INSERT.
 * TODO: THIS IS NOT USED!
 */
window.KeyEventCodes = {
	
	VK_BACK						: 8,
	VK_TAB						: 9,
	VK_ENTER					: 13,
	VK_SHIFT					: 16,
	VK_CONTROL					: 17,
	VK_ALT						: null,
	VK_ESCAPE					: 27,
	VK_SPACE					: 32,
	VK_PAGE_UP					: 33,
	VK_PAGE_DOWN				: 34,
	VK_END						: 35,
	VK_HOME						: 36,
	VK_LEFT						: 37,
	VK_UP						: 38,
	VK_RIGHT					: 39,
	VK_DOWN						: 40,
	VK_INSERT					: null,
	VK_DELETE					: 127,
	VK_PLUS						: 187,
	VK_MINUS					: 189,
	VK_NUMPLUS					: 107,
	VK_NUMMINUS					: 109
};

/**
 * @class
 * Optimized undo-redo management for Mozilla in CodePress. 
 * @link {http://codepress.org}
 * @author Wired Earp
 */
function CodePressUndoManager () {}
CodePressUndoManager.prototype = {
	
	_logger : top.SystemLogger.getLogger ( "CodePressUndoManager" ),
	
	_win : null,
	_doc : null,
	_root : null,
	_editor : null,
	_engine : null,
	_undos : new Array (),
	_redos : new Array (),
	_hasSnapShot : false,
	
	_CONTROLCHAR : '\u2009',
	_MAXHISTORY : 100,
	
	_BACKKEY 	: 8,
	_DELKEY 	: 46,
	_TABKEY 	: 9,
	_NEWKEY 	: 13,
	_UNDOKEY 	: 90,
	_REDOKEY 	: 89,
	_LEFTKEY 	: 37,
	_UPKEY 		: 38,
	_RIGHTKEY 	: 39,
	_DOWNKEY 	: 40,
	
	/**
	 * Initialize tab management.
	 * @param {HTMLDocumentView} win 
	 */
	manage : function ( win ) {
		
		/*
		 * Register players.
		 */
		this._win = win;
		this._doc = win.document;
		this._engine = win.CodePress;
		this._editor = win.frameElement.editor;
		
		/*
		 * Listners
		 */
		this._doc.addEventListener ( "mousedown", this, false );
		this._doc.addEventListener ( "cut", this, false );
		this._doc.addEventListener ( "paste", this, false );
		
		/*
		 * The capture flag has been reversed  
		 * in order to snapshot the document  
		 * before TabManager changes it.
		 */
		this._doc.addEventListener ( "keypress", this, true );
		this._doc.addEventListener ( "keydown", this, true );
		
		/*
		 * Nuke CodePress native undo-redo.
		 */
		this._engine.actions.undo = new Function ();
		this._engine.actions.redo = new Function ();
		
		/*
		 * Used to restore caret position after undo.
		 */
		this._marker = this._doc.createElement ( "abbr" );
		this._marker.id = "marker";
		
		this._helper = this._doc.createElement ( "abbr" );
		this._helper.id = "helper";
	},
	
	/**
	 * TODO: Figure out how to snapshot before TAB is invoked!
	 * @param {KeyEvent} e
	 */
	handleEvent : function ( e ) {
		
		var isSnapShot = false;
		
		switch ( e.type ) {
			
			case "cut" :
			case "paste" :
				this._hasSnapShot = false;
				break;
			
			case "keypress" :
				
				/*
				 * Intercepting delete and  
				 * backspace, see notes below.
				 */
				switch ( e.keyCode ) {
					case this._BACKKEY :
					case this._DELKEY :
						var selection = this._win.getSelection ();
						if ( !selection.isCollapsed ) {
							this._snapshot ();
							this._hasSnapShot = true;
							e.preventDefault ();
							this._deleteSelection ();
						}
						break;
				}
				switch ( e.keyCode ) {
					case this._BACKKEY :
					case this._DELKEY :	
					case this._NEWKEY :
					case this._UPKEY :
					case this._DOWNKEY :
					case this._LEFTKEY :
					case this._RIGHTKEY :
						isSnapShot = true;
						if ( !this._hasSnapShot ) {
							this._snapshot ();
							this._hasSnapShot = true;
						}
						break;
					default :
						this._hasSnapShot = false;
						break;
				}
				break;
				
			case "keydown" :
				var isDoing = false;
				if ( e.ctrlKey ) {
					switch ( e.keyCode ) {
						case this._UNDOKEY :
							this._undo ();
							isDoing = true;
							break;
						case this._REDOKEY :
							this._redo ();
							isDoing = true;
							break;
					}
				}
				if ( !isDoing ) {
					if ( this._redos.length > 0 ) {
						this._redos = new Array ();
					}
				}
				break;
				
			case "mousedown" :
				if ( this._undos.length == 0 && !isSnapShot ) {
					this._doc.removeEventListener ( "mousedown", this, false );
					this._snapshot ( false );
				}
				break;
		}
	},
	
	/**
	 * Snapshot.
	 * @param @optional {boolean} hasMarker
	 */
	_snapshot : function ( hasMarker ) {
		
		/*
		 * Insert marker to restore caret position.
		 */
		if ( hasMarker != false ) {
			this._mark ( this._win.getSelection ());	
		}
		
		/*
		 * Update undo history.
		 */
		this._undos.push ( this._getRoot ().innerHTML );
		while ( this._undos.length > this._MAXHISTORY ) {
			this._undos.shift ();
		}
	},
	
	/**
	 * Insert an invisible marker at caret position.
	 * @param {DOMSelection} sel
	 */
	_mark : function ( sel ) {
		
		/*
		 * Remove any existing marker.
		 */
		var marker = this._doc.getElementById ( "marker" );
		if ( marker != null ) {
			marker.parentNode.removeChild ( marker );
		}
		
		if ( sel.isCollapsed ) {
			
			/*
			 * The easy way out.
			 */
			this._doc.execCommand ( "inserthtml", false, "<abbr id=\"marker\"/>" );
			
		} else {
			
			/*
			 * We want to make sure that the caret gets positioned correctly, 
			 * where the selection originated. This is not made easy by the 
			 * complications of the DOM Range spec, but this seems to work...  
			 */
			var r1 = this._doc.createRange ();
			r1.setStart ( sel.anchorNode, sel.anchorOffset );
			r1.collapse ( true );
			
			var r2 = this._doc.createRange ();
			r2.setEnd ( sel.focusNode, sel.focusOffset );
			r2.collapse ( false );
			
			var range = sel.getRangeAt ( 0 );
			switch ( r1.compareBoundaryPoints ( Range.START_TO_START, r2 )) {
				case -1 :
					r2.insertNode ( this._helper );
					r1.insertNode ( this._marker );
					range.setStartAfter ( this._marker );
					range.setEndBefore ( this._helper );
					break;
				case 1 :
					r1.insertNode ( this._marker );
					r2.insertNode ( this._helper );
					range.setStartAfter ( this._helper );
					range.setEndBefore ( this._marker );
					break;
			}
			
			this._helper.parentNode.removeChild ( this._helper );
		}
	},
	
	/**
	 * Undo.
	 */
	_undo : function ( isUndo ) {
		
		if ( this._undos.length > 0 ) {
			this._redos.push ( this._getRoot ().innerHTML );
			this._getRoot ().innerHTML = this._undos.pop ();
			this._restore ();
		}
	},
	
	/**
	 * Redo.
	 */
	_redo : function () {
		
		if ( this._redos.length > 0 ) {
			this._undos.push ( this._getRoot ().innerHTML );
			this._getRoot ().innerHTML = this._redos.pop ();
			this._restore ();
		}
	},
	
	/**
	 * Restore caret position.
	 */
	_restore : function () {
		
		var marker = this._doc.getElementById ( "marker" );
		
		if ( marker != null ) {
			marker.textContent = this._CONTROLCHAR;
			this._win.find ( this._CONTROLCHAR );
			marker.textContent = "";
		}
	},
	
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
	 * This patches a bug: Pressing backspace or delete on a selection 
	 * would delete one too many characters. Blurring the editor window 
	 * and focusing again would fix the bug magically. Note: This may 
	 * be a bug in the Composite C1 framework, not nescessarily a bug 
	 * in the CodePress source. Technically, this has nothing to do 
	 * with undo and redo, so we may consider moving this method...
	 */
	_deleteSelection : function () {
		
		var selection = this._win.getSelection ();
		if ( !selection.isCollpsed ) {
			selection.getRangeAt ( 0 ).deleteContents ();
		}
	}
}