/**
 * Composite link plugin.
 */
new function () {
	
	var URL_LINK = "${tiny}/plugins/compositelink/link.aspx";
	
	tinymce.create ( "tinymce.plugins.CompositeLinkPlugin", {
		
		getInfo : function() {
			return {
				longname : "Composite Link",
				author : "Composite A/S",
				authorurl : "http://www.composite.net",
				infourl : null,
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},
		
		/**
		 * @param {tinymce.Editor} ed
		 * @param {string} url
		 */
		init : function ( ed, url ) {
			
			this.editor = ed;
		},
		
		/**
		 * Update a single link element.
		 * @param {HTMLAnchorElement} a
		 * @param {DataBindingResultMap} result
		 * @param {boolean} isUpdate
		 */
		_attribLink : function ( a, result, isUpdate ) {
			
			if ( result.get( "href" )) {
				a.href = result.get( "href" );
			} else if ( isUpdate ) {
				a.href = "";
				a.removeAttribute ( "href" );
			}
			if ( result.get( "rel" )) {
				a.rel = result.get( "rel" );
			} else if ( isUpdate ) {
				a.rel = "";
				a.removeAttribute ( "rel" );
			}
			if ( result.get( "title" )) {
				a.title = result.get( "title" );
			} else if ( isUpdate ) {
				a.title = "";
				a.removeAttribute ( "title" );
			}
			if ( result.get( "blank" )) {
				a.setAttribute ( "tinymcetargetalias", "_blank" );
			} else if ( isUpdate ) {
				a.removeAttribute ( "tinymcetargetalias" );
			}
			if ( result.get( "id" )) {
				a.id = result.get( "id" );
			} else if ( isUpdate ) {
				a.id = "";
				a.removeAttribute ( "id" );	
			}
			if ( result.get( "classname" )) {
				a.className = result.get( "classname" );
				a.setAttribute ( "class", result.get( "classname" ));
			} else if ( isUpdate ) {
				a.className = "";
				a.removeAttribute ( "class" );
			}
		},
		
		/**
		 * @param {HTMLAnchorElement} a
		 * @param {tinymce.Editor} editor
		 * @param {DataBindingResultMap} result
		 */
		_insertLink : function ( anchor, editor, result ) {
			
			editor.getDoc().execCommand ( "unlink", false, null );
			editor.execCommand( "CreateLink", false, "#mce_temp_url#", {skip_undo : 1});
			elementArray = tinymce.grep(
				editor.dom.select ( "a" ), 
				function(n) {
					return editor.dom.getAttrib ( n, "href" ) == "#mce_temp_url#";
				}
			);
			for ( var i = 0; i < elementArray.length; i++ ) {
				
				var elm = elementArray [ i ];
				this._attribLink ( elm, result, false );
				
				/*
				 * Sometimes the caret may be trapped inside 
				 * a link, inserting new links on Enter key.
				 * This may or may not help it.
				 */
				if ( Client.isMozilla ) {
				
					var sp = editor.getDoc().createTextNode ( " " );
					if ( elm.nextSibling ) {
						elm.parentNode.insertBefore( sp, elm.nextSibling );
					} else {
						elm.parentNode.appendChild ( sp );
					}
	
					// Set range after link
					var rng = editor.getDoc ().createRange ();
					rng.setStartAfter ( elm );
					rng.setEndAfter ( elm );
	
					// Update selection
					var sel = editor.selection.getSel ();
					sel.removeAllRanges ();
					sel.addRange ( rng );
				}
			}
		},
		
		/**
		 * @param {string} cmd
		 * @param {boolean} ui
		 * @param {string} value
		 */
		execCommand : function ( cmd, ui, value ) {
			
			var result = false;
			var self = this;
			var editor = this.editor;
			var editorBinding = editor.theme.editorBinding;
			
			if ( cmd == "unlink" ) {
				
				setTimeout ( function () {
					editorBinding.checkForDirty ();
					editorBinding.blurEditor ();
				}, 50 );
				// result is still false - relay to higher authority
				
			} else if ( cmd == "compositeInsertLink" ) {
				
				var elm = editor.selection.getNode ();
				var anchor = editor.dom.getParent ( elm, "a" );
				
				if ( value == null ) {
					value = anchor != null ? "update" : "insert";
				}
				 
				editorBinding.enableDialogMode ();
				
				var dialogHandler = {
					handleDialogResponse : function ( response, result ) {
					
						editorBinding.disableDialogMode ();
						
						if ( response == Dialog.RESPONSE_ACCEPT ) {		
							switch ( value ) {
								case "insert" :
									self._insertLink ( anchor, editor, result );
									break;
								case "update" :
									self._attribLink ( anchor, result, true );
									break;
							}
							editorBinding.getButtonForCommand ( "compositeInsertLink" ).disable ();
							editorBinding.getButtonForCommand ( "unlink" ).disable ();
							editorBinding.checkForDirty ();
							editorBinding.blurEditor ();
						}
					}
				};
				
				Dialog.invokeModal ( 
					URL_LINK,
					dialogHandler, 
					{
						tinyAction 		: value,
						tinyWindow 		: window,
						tinyElement 	: anchor,
						tinyEngine 		: tinymce.EditorManager,
						tinyInstance 	: editor,
						tinyTheme 		: editor.theme,
						editorBinding 	: editor.theme.editorBinding
					}
				);
				
				result = true;
			} 
			return result;
		}
	});

	// Register plugin
	tinymce.PluginManager.add("compositelink", tinymce.plugins.CompositeLinkPlugin);
};