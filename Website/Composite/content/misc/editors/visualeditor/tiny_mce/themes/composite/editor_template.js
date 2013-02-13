new function () {
	
	/**
	 * Node change handlers.
	 * @type {List<IWysiwygEditorNodeChangeHandler>}
	 */
	var nodeChangeHandlers = new List ();
	
	/**
	 * Content change handlers.
	 * @type {List<IWysiwygEditorContentChangeHandler>}
	 */
	var contentChangeHandlers = new List ();
	
	/*
	 * Shortcut.
	 */
	var DOM = tinymce.DOM;
	
	/**
	 * Format list.
	 * @see {VisualEditor.js}
	 * @type {List<FormatGroup>}
	 */
	this.formatGroups = new List (),
	
	/**
	 * Info
	 */
	this.getInfo = function() {
		return {
			longname : 'Composite theme',
			author : 'Composite A/S',
			authorurl : 'http://www.composite.net',
			version : tinymce.majorVersion + "." + tinymce.minorVersion
		}
	}

	/*
	 * This would be the actual theme.
	 */
	tinymce.create ( "tinymce.themes.CompositeTheme", {
		
		/**
		 * @type {VisualEditorBinding}
		 */
		editorBinding : null,
		
		/**
		 * The TinyMCE engine.
		 * @type {TinyMCE_Engine} 
		 */
		tinyEngine : null,
		
		/**
		 * The TinyMCE instance.
		 * @type {tinymce.Editor}
		 */
		tinyInstance : null,
		
		/**
		 * Invoked by the VisualEditorBinding.
		 * @param {VisualEditorBinding} editor
		 * @param {TinyMCE_Engine} engine
		 * @param {tinymce.Editor} instance
		 */
		initC1 : function ( binding, engine, instance ) {
			
			this.editorBinding = binding;
			this.tinyEngine = engine;
			this.tinyInstance = instance;
			
			/*
			 * Inject stylesheets.
			 *
			var css0 = this.editorBinding.defaultStylesheet;
			var css1 = this.editorBinding.presentationStylesheet;
			var css2 = this.editorBinding.configurationStylesheet;
			
			if ( css0 != null ) {
				this.tinyInstance.dom.loadCSS ( css0 );
			}
			if ( css1 != null ) {
				this.tinyInstance.dom.loadCSS ( css1 );
			}
			if ( css2 != null ) {
				this.tinyInstance.dom.loadCSS ( css2 );
			}
			*/
		},
		
		/**
		 * @param {IWysiwygEditorNodeChangeHandler} handler
		 */
		registerNodeChangeHandler : function ( handler ) {
			if ( handler && handler.handleNodeChange != null ) {
				nodeChangeHandlers.add ( handler );
			}
		},
		
		/**
		 * @param {IWysiwygEditorContentChangeHandler} handler
		 */
		registerContentChangeHandler : function ( handler ) {
			if ( handler && handler.handleContentChange != null ) {
				contentChangeHandlers.add ( handler );
			}
		},
		
		/**
		 * Init.
		 */
		init : function ( ed, url ) {
		
			var t = this;
			t.editor = ed;
			
			ed.onInit.add ( function () {
				
				/*
				 * Register node change handler.
				 */
				ed.onNodeChange.add ( 
					
					/*
					 * @param {tinymce.Editor} ed
					 * @param {tinymce.ControlManager} cm
					 * @param {HTMLElement} e
					 */
					function ( ed, cm, e ) {
						if ( e != null ) {
							var node = !Client.isExplorer && e.getAttribute('data-mce-bogus') ? e.parentNode : e; 
							if ( nodeChangeHandlers.hasEntries ()) {
								nodeChangeHandlers.each ( function ( handler ) {
									handler.handleNodeChange ( node );
								});
							}
						}
				});
				
				/*
				 * Register content change handler.
				 */
				ed.onChange.add ( 
					
					/*
					 * @param {tinymce.Editor} ed
					 * @param {int} l Undo lavel that got added
					 * @param {object} um Undo manager that level was added to
					 */
					function ( ed, l, um ) {
						if ( contentChangeHandlers.hasEntries ()) {
							contentChangeHandlers.each ( function ( handler ) {
								handler.handleContentChange ();
							});
						}
				});
			});
		},
		
		/**
		 * @param {what?} o
		 */
		renderUI : function(o) {
			
			var t = this, n = o.targetNode, ic, tb, ed = t.editor, cf = ed.controlManager;

			n = DOM.insertAfter ( DOM.create ( 'div', { id : ed.id + '_container' }), n );
			n = ic = DOM.add ( n, 'div' );

			return {
				iframeContainer : ic,
				editorContainer : ed.id + '_container',
				sizeContainer : null,
				deltaHeight : -20
			};
		},
		
		/**
		 * Enable dialog mode.
		 */
		enableDialogMode : function () {
			
			this.editorBinding.enableDialogMode ();
		},
		
		/**
		 * Disable dialog mode.
		 */
		disableDialogMode : function () {
			
			this.editorBinding.disableDialogMode ();
			
		}
	});

	tinymce.ThemeManager.add ( "composite", tinymce.themes.CompositeTheme );
}