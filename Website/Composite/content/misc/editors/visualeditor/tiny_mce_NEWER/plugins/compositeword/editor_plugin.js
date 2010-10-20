/**
 * Composite Word plugin.
 */
new function () {
	
	var URL_WORD = "${tiny}/plugins/compositeword/word.aspx";
	
	tinymce.create ( "tinymce.plugins.CompositeWordPlugin", {
		
		/**
		 * @type {tinymce.Editor}
		 */
		editor : null,
		
		/**
		 * Get info
		 */
		getInfo : function() {
			return {
				longname : "Composite Word Plugin",
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
		 * @param {string} cmd
		 * @param {boolean} ui
		 * @param {string} value
		 */
		execCommand : function ( cmd, ui, value ) {
			
			var result = false;
			var self = this;
			var editor = this.editor;
			var editorBinding = editor.theme.editorBinding;
			
			if ( cmd == "compositeInsertWord" ) {
				
				this.editor.theme.enableDialogMode ();
				
				var dialogHandler = {
					handleDialogResponse : function ( response, result ) {
						
						self.editor.theme.disableDialogMode ();
						if ( response == Dialog.RESPONSE_ACCEPT ) {
							if ( result != null ) {
								self.editor.execCommand ( "mceInsertContent", false, result );
								editorBinding.checkForDirty ();
							}
						}
					}
				}
				
				// open dialog
				Dialog.invokeModal ( 
					URL_WORD,
					dialogHandler, 
					null 
				);
				
				result = true;
			} 
			return result;
		}
	});

	// Register plugin
	tinymce.PluginManager.add ( "compositeword", tinymce.plugins.CompositeWordPlugin );
};