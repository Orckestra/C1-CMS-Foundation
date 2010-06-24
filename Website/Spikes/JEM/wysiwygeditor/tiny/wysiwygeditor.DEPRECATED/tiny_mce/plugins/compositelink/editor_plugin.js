var TinyMCE_CompositeLinkPlugin = new function () {
	
	var URL_LINK = "${tinymce}/plugins/compositelink/link.aspx";
	
	/**
	 * Returns information about the plugin as a name/value array.
	 * The current keys are longname, author, authorurl, infourl and version.
	 * @returns Name/value array containing information about the plugin.
	 * @type Array 
	 */
	this.getInfo = function() {
		return {
			longname 	: "Composite Link Plugin",
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
		
			// Remember to have the "mce" prefix for commands so they don't intersect with built in ones in the browser.
			
			case "compositeInsertLink":
				
				var inst = tinyMCE.getInstanceById ( editor_id );
				var elm = inst.getFocusElement ();
				var anchor = tinyMCE.getParentElement ( elm, "a" );
				
				if ( !value ) {
					value = anchor ? "update" : "insert";
				}
				
				TinyMCE_CompositeTheme.enableDialogMode ();
				
				var dialogHandler = {
					handleDialogResponse : function ( response, result ) {
					
						TinyMCE_CompositeTheme.disableDialogMode ()
						
						if ( response == Dialog.RESPONSE_ACCEPT ) {
							
							switch ( value ) {
								case "insert" :
									
									/*
									 * mceInsertContent fails miserably when multiple 
									 * paragraphs are selected. One could argue that 
									 * this scenario should disable link insertion 
									 * entirely, but they probably wouldn't listen.
									 */	
									
									try {
									inst.execCommand ( "createlink", false, "#mce_temp_url#" );
									var elementArray = tinyMCE.getElementsByAttributeValue ( inst.getBody(), "a", "href", "#mce_temp_url#" );
									for ( var i=0; i < elementArray.length; i++ ) {
									
										var elm = elementArray [ i ];
							
										// Move cursor to end
										try {
											tinyMCE.selectedInstance.selection.collapse ( false );
										} catch ( exception ) {
											// do nothing
										}
										TinyMCE_CompositeLinkPlugin._attribLink ( elm, result, false );
										
										
										/*
										 * Sometimes the caret may be trapped inside 
										 * a link, inserting new links on Enter key.
										 * This may or may not help it.
										 */
										if ( tinyMCE.isGecko ) {
										
											var sp = inst.getDoc().createTextNode ( " " );
											if ( elm.nextSibling ) {
												elm.parentNode.insertBefore( sp, elm.nextSibling );
											} else {
												elm.parentNode.appendChild ( sp );
											}
							
											// Set range after link
											var rng = inst.getDoc ().createRange ();
											rng.setStartAfter ( elm );
											rng.setEndAfter ( elm );
							
											// Update selection
											var sel = inst.getSel();
											sel.removeAllRanges();
											sel.addRange(rng);
										}
									}
									} catch ( e ) {
										alert ( e );
									}
									
									break;
								case "update" :
								
									TinyMCE_CompositeLinkPlugin._attribLink ( anchor, result, true );
									break;
							}
							 
							var editorBinding = TinyMCE_CompositeTheme.editorBinding;
							editorBinding.getButtonForCommand ( "compositeInsertLink" ).disable ();
							editorBinding.getButtonForCommand ( "unlink" ).disable ();
						}
					}
				}
				
				var arg = {
					
					// relevant for main window
					tinyAction			: value,
					tinyWindow			: window,
					tinyElement 		: anchor
				}
				
				// open dialog
				Dialog.invokeModal ( 
					URL_LINK,
					dialogHandler, 
					arg
				);
				
				return true;
		}

		// Pass to next handler in chain
		return false;
	}
	
	/**
	 * @param {HTMLAnchorElement} a
	 * @param {DataBindingResultMap} result
	 * @param {boolean} isUpdate
	 */
	this._attribLink = function ( a, result, isUpdate ) {
		
		if ( result.get( "href" )) {
			a.href = result.get( "href" );
		} else if ( isUpdate ) {
			a.href = ""
			a.removeAttribute ( "href" );
		}
		if ( result.get( "rel" )) {
			a.rel = result.get( "rel" );
		} else if ( isUpdate ) {
			a.rel = ""
			a.removeAttribute ( "rel" );
		}
		if ( result.get( "title" )) {
			a.title = result.get( "title" );
		} else if ( isUpdate ) {
			a.title = ""
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

tinyMCE.addPlugin("compositelink", TinyMCE_CompositeLinkPlugin);