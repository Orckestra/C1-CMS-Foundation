/**
 * @class
 */
var TinyMCE_CompositeTheme = new function () {
	
	/**
	 * Register as global variable!
	 */
	window.tinyTheme = this;
	
	/**
	 * Set by the containing WysiwygEditorBinding.
	 * @see {WysiwygEditorBinding#handleBroadcast}
	 */
	this.editorBinding = null;

	/**
	 * We only have this single editor in scope, so we might as well hardcode it.
	 * @type {string}
	 */
	var EDITOR_ID = "mce_editor_0";
	
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

	/**
	 * @type {HTMLElement}
	 */
	var lastNodeChangeNode = null;

	/**
	 * Get editor template.
	 * @return {string}
	 */
	this.getEditorTemplate = function() {

		return {
			delta_width : null,
			delta_height : null,
			html : '<span id="{$editor_id}"/>'
		};
	}
	
	/**
	 * Intercepting ALL editor events as per TinyMCE convention. 
	 * To enable, rig something up for the handle_event_callback
	 * @param {Event} e
	 */
	this.handleEvent = function ( e ) {}
	
	/**
	 * Theme specific execcommand handling.
	 * @return {boolan}
	 */
	this.execCommand = function ( editor_id, element, command, user_interface, value ) {
		
		var returnable = false; // by default allowing command propagation
		switch (command) {
			case "Undo" : 
				var index = tinyMCE.getInstanceById ( EDITOR_ID ).undoRedo.undoIndex;
				if ( index <= 1 ) {
					returnable = true;
				}
				break;
			case "mceInsertContent" : // sometimes this doesn't trigger a dirty one
				this.editorBinding.checkForDirty ();
				// this is allowed to propagate
				break;
		}
		return returnable;
	}
	
	/**
	 * @param {IWysiwygEditorNodeChangeHandler} handler
	 */
	this.registerNodeChangeHandler = function ( handler ) {
		
		if ( handler && handler.handleNodeChange ) {
			nodeChangeHandlers.add ( handler );
		}
	}
	
	/**
	 * @param {IWysiwygEditorContentChangeHandler} handler
	 */
	this.registerContentChangeHandler = function ( handler ) {
		
		if ( handler && handler.handleContentChange ) {
			contentChangeHandlers.add ( handler );
		}
	}
	
	/**
	 * @param {string} editor_id
	 * @param {DOMNode} node
	 */
	this.handleNodeChange = function ( editor_id, node ) {
		
		if ( node ) { // && node != lastNodeChangeNode
			if ( nodeChangeHandlers.hasEntries ()) {
				nodeChangeHandlers.each ( function ( handler ) {
					handler.handleNodeChange ( node );
				});
			}
			lastNodeChangeNode = node;
		}
	}
	
	/**
	 * Handle content change.
	 * @param {TinyMCE_Control} inst
	 */
	this.onChange = function ( inst ) {
		
		if ( contentChangeHandlers.hasEntries ()) {
			contentChangeHandlers.each ( function ( handler ) {
				handler.handleContentChange ();
			});
		}
	}
	
	/**
	 * Enable dialog mode.
	 */
	this.enableDialogMode = function () {
	
		this.editorBinding.enableDialogMode ();
	}
	
	/**
	 * Disable dialog mode.
	 */
	this.disableDialogMode = function () {
	
		this.editorBinding.disableDialogMode ();
	}
};

tinyMCE.addTheme ( "composite", TinyMCE_CompositeTheme );