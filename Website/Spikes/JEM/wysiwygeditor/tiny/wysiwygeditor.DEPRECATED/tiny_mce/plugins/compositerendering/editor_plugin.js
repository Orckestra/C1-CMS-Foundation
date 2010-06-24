var TinyMCE_CompositeRenderingPlugin = new function () {
	
	var URL_UPDATERENDERING = "${root}/content/dialogs/functions/editFunctionCall.aspx?type=Composite.Xml.XhtmlDocument,Composite&functionmarkup=${functionmarkup}";
	
	var logger = SystemLogger.getLogger ( "TinyMCE_CompositeRenderingPlugin" );
	
	/**
	 * Returns information about the plugin as a name/value array.
	 * The current keys are longname, author, authorurl, infourl and version.
	 * @returns Name/value array containing information about the plugin.
	 * @type Array 
	 */
	this.getInfo = function() {
		return {
			longname 	: "Composite Rendering Plugin",
			author 		: "Wired Earp",
			authorurl 	: "http://www.composite.net",
			infourl 	: null,
			version 	: "1.0"
		};
	}

	/**
	 * Gets executed when a TinyMCE editor instance is initialized.
	 * @param {TinyMCE_Control} Initialized TinyMCE editor control instance. 
	 */
	this.initInstance = function(inst) {}

	/**
	 * Gets executed when a TinyMCE editor instance is removed.
	 * @param {TinyMCE_Control} Removed TinyMCE editor control instance. 
	 */
	this.removeInstance = function ( inst ) {}

	/**
	 * Gets executed when a TinyMCE editor instance is displayed using for example mceToggleEditor command.
	 * @param {TinyMCE_Control} Visible TinyMCE editor control instance. 
	 */
	this.showInstance = function ( inst ) {}

	/**
	 * Gets executed when a TinyMCE editor instance is hidden using for example mceToggleEditor command.
	 * @param {TinyMCE_Control} Hidden TinyMCE editor control instance. 
	 */
	this.hideInstance = function ( inst ) {}

	/**
	 * Returns the HTML code for a specific control or empty string if this plugin doesn't have that control.
	 * A control can be a button, select list or any other HTML item to present in the TinyMCE user interface.
	 * The variable {$editor_id} will be replaced with the current editor instance id and {$pluginurl} will be replaced
	 * with the URL of the plugin. Language variables such as {$lang_somekey} will also be replaced with contents from
	 * the language packs.
	 * @param {string} cn Editor control/button name to get HTML for.
	 * @return HTML code for a specific control or empty string.
	 * @type string
	 */
	this.getControlHTML = function( cn ) {
		return "";
	}

	/**
	 * Executes a specific command, this function handles plugin commands.
	 * @param {string} editor_id TinyMCE editor instance id that issued the command.
	 * @param {HTMLElement} element Body or root element for the editor instance.
	 * @param {string} command Command name to be executed.
	 * @param {string} user_interface True/false if a user interface should be presented.
	 * @param {mixed} value Custom value argument, can be anything.
	 * @return true/false if the command was executed by this plugin or not.
	 * @type
	 */
	this.execCommand = function(editor_id, element, command, user_interface, value) {
		
		// Handle commands
		switch (command) {
		
			case "compositeInsertRendering":
				if ( value == "update" ) {
					this._updateRendering ();
				} else {
					this._insertRendering ();
				}
				return true;
				break;
		}
		
		// Pass to next handler in chain
		return false;
	}
	
	/**
	 * Insert rendering.
	 */
	this._insertRendering = function () {
		
		TinyMCE_CompositeTheme.enableDialogMode ();
		
		var def = ViewDefinitions [ "Composite.Management.XhtmlDocumentFunctionSelectorDialog" ];
		def.handler = {
			handleDialogResponse : function ( response, result ) {
				if ( response == Dialog.RESPONSE_ACCEPT ) {
				
					var functionName = result.getFirst ();
					var functionInfo = top.XhtmlTransformationsService.GetFunctionInfo ( functionName );
					
					if ( functionInfo.RequireConfiguration ) {
						TinyMCE_CompositeRenderingPlugin._launchUpdateDialog ( functionInfo.FunctionMarkup );
					} else {
						TinyMCE_CompositeTheme.disableDialogMode ()
						TinyMCE_CompositeRenderingPlugin._insertImgTag ( functionInfo.FunctionMarkup );
					}
				} else {
					TinyMCE_CompositeTheme.disableDialogMode ()
				}
			}
		}
		Dialog.invokeDefinition ( def );
	}
	
	/**
	 * Update rendering.
	 */
	this._updateRendering = function () {
		
		var img = tinyMCE.selectedInstance.getFocusElement ();
		var markup = img.getAttribute ( "functionmarkup" )
		this._launchUpdateDialog ( markup );
	}
	
	/**
	 * Launch update dialog.
	 * @param {string} markup
	 */
	this._launchUpdateDialog = function ( markup ) {
	
		TinyMCE_CompositeTheme.enableDialogMode ();
		
		var dialogHandler = {
			handleDialogResponse : function ( response, result ) {
			
				TinyMCE_CompositeTheme.disableDialogMode ();
				
				if ( response == Dialog.RESPONSE_ACCEPT ) {
					TinyMCE_CompositeRenderingPlugin._insertImgTag ( result );
				}
			}
		}
		var url = URL_UPDATERENDERING.replace ( 
			"${functionmarkup}", 
			markup
		);
		Dialog.invokeModal ( 
			url,
			dialogHandler, 
			null 
		);
	}
	
	/**
	 * Insert image tag from function markup.
	 * @param {string} markup
	 */
	this._insertImgTag = function ( markup ) {
		
		var inst = tinyMCE.selectedInstance;
		if ( markup != "" ) {
			var html = top.XhtmlTransformationsService.GetImageTagForFunctionCall ( markup );
			inst.execCommand ( "mceInsertContent", false, html );
		} else {
			inst.execCommand ( "mceInsertContent", false, "" );
		}
	}

	/**
	 * Gets called ones the cursor/selection in a TinyMCE instance changes. This is useful to enable/disable
	 * button controls depending on where the user are and what they have selected. This method gets executed
	 * alot and should be as performance tuned as possible.
	 * @param {string} editor_id TinyMCE editor instance id that was changed.
	 * @param {HTMLNode} node Current node location, where the cursor is in the DOM tree.
	 * @param {int} undo_index The current undo index, if this is -1 custom undo/redo is disabled.
	 * @param {int} undo_levels The current undo levels, if this is -1 custom undo/redo is disabled.
	 * @param {boolean} visual_aid Is visual aids enabled/disabled ex: dotted lines on tables.
	 * @param {boolean} any_selection Is there any selection at all or is there only a cursor.
	 */
	this.handleNodeChange = function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {}

	/**
	 * Gets called when a TinyMCE editor instance gets filled with content on startup.
	 * @param {string} editor_id TinyMCE editor instance id that was filled with content.
	 * @param {HTMLElement} body HTML body element of editor instance.
	 * @param {HTMLDocument} doc HTML document instance.
	 */
	this.setupContent = function(editor_id, body, doc) {}

	/**
	 * Gets called when the contents of a TinyMCE area is modified, in other words when a undo level is
	 * added.
	 * @param {TinyMCE_Control} inst TinyMCE editor area control instance that got modified.
	 */
	this.onChange = function(inst) {}

	/**
	 * Gets called when TinyMCE handles events such as keydown, mousedown etc. TinyMCE
	 * doesn't listen on all types of events so custom event handling may be required for
	 * some purposes.
	 * @param {Event} e HTML editor event reference.
	 * @return true - pass to next handler in chain, false - stop chain execution
	 * @type boolean
	 */
	this.handleEvent = function(e) {
		return true;
	}

	/**
	 * Gets called when HTML contents is inserted or retrived from a TinyMCE editor instance.
	 * The type parameter contains what type of event that was performed and what format the content is in.
	 * Possible valuses for type is get_from_editor, insert_to_editor, get_from_editor_dom, insert_to_editor_dom.
	 * @param {string} type Cleanup event type.
	 * @param {mixed} content Editor contents that gets inserted/extracted can be a string or DOM element.
	 * @param {TinyMCE_Control} inst TinyMCE editor instance control that performes the cleanup.
	 * @return New content or the input content depending on action.
	 * @type string
	 */
	this.cleanup = function(type, content, inst) {
		return content;
	}
}

tinyMCE.addPlugin("compositerendering", TinyMCE_CompositeRenderingPlugin);