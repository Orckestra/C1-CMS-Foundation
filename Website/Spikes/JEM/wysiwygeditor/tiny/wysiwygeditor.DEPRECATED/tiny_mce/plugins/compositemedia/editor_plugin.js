var TinyMCE_CompositeMediaPlugin = new function () {
	
	var URL_MEDIA = "${tinymce}/plugins/compositemedia/media.aspx";
	var CLASSNAME_MEDIA = "compositemedia${mediatype}";
	var logger = SystemLogger.getLogger ( "TinyMCE_CompositeMediaPlugin" );
	
	/**
	 * Returns information about the plugin as a name/value array.
	 * The current keys are longname, author, authorurl, infourl and version.
	 * @returns Name/value array containing information about the plugin.
	 * @type Array 
	 */
	this.getInfo = function() {
		return {
			longname 	: "Composite Media Plugin",
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
		
		switch (command) {
			
			case "compositeInsertMedia":
				
				TinyMCE_CompositeTheme.enableDialogMode ();
				
				var dialogHandler = {
					handleDialogResponse : function ( response, result ) {
					
						TinyMCE_CompositeTheme.disableDialogMode ()
						
						if ( response == Dialog.RESPONSE_ACCEPT ) {
							
							switch ( value ) {
								
								case "insert" :
								case "update" :
									
									/*
									 * Compute classname.
									 */
									var classname = CLASSNAME_MEDIA.replace ( "${mediatype}", result.get ( "mediatype" ));
									classname += result.get ( "classname" ) ? " " + result.get ( "classname" ) : "";
									
									/*
									 * Compute params. Notice reserved suffix "param".
									 */
									var params = "";
									result.each ( function ( name, value ) {
										if ( value != null ) {
											if ( name.length > 5 && name.substring ( 0, 5 ) == "param" ) {
												var paramname = name.split ( "param" )[ 1 ];
												params += paramname + "===" + value + ";"; // since "=" could occur elsewhere
											}
										}
									});
									
									/* TODO: remove defaults from result! */
									
									var html = '<img src="' + Resolver.resolve ( "${root}/images/blank.png" ) + '"';
									html += makeAttrib ( "id", result.get ( "id" ));
									html += makeAttrib ( "class", classname );
									html += makeAttrib ( "width", result.get ( "width" ));
									html += makeAttrib ( "height", result.get ( "height" ));
									//html += makeAttrib ( "mediasrc", result.get ( "src" ));
									html += makeAttrib ( "params", params );
									html += '/>';
									
									logger.debug ( html );
									var inst = tinyMCE.selectedInstance;
									inst.execCommand ( "mceInsertContent", false, html );
									
									break;
							}
						}
					}
				}
				
				var arg = {
					tinyAction	: value,
					tinyWindow	: window,
					tinyElement : tinyMCE.selectedInstance.getFocusElement ()
				}
				
				// open dialog
				Dialog.invokeModal ( 
					URL_MEDIA,
					dialogHandler, 
					arg
				);
				
				return true;
		}

		// Pass to next handler in chain
		return false;
	}
	
	/*
	function writeFlash(p) {
		writeEmbed(
			'D27CDB6E-AE6D-11cf-96B8-444553540000',
			'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0',
			'application/x-shockwave-flash',
			p
		);
	}

	function writeShockWave(p) {
		writeEmbed(
		'166B1BCA-3F9C-11CF-8075-444553540000',
		'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0',
		'application/x-director',
			p
		);
	}

	function writeQuickTime(p) {
		writeEmbed(
			'02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
			'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0',
			'video/quicktime',
			p
		);
	}
	
	function writeWindowsMedia(p) {
		p.url = p.src;
		writeEmbed(
			'6BF52A52-394A-11D3-B153-00C04F79FAA6',
			'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701',
			'application/x-mplayer2',
			p
		);
	}

	function writeEmbed(cls, cb, mt, p) {
		var h = '', n;
	
		h += '<object classid="clsid:' + cls + '" codebase="' + cb + '"';
		
		h += typeof(p.id) != "undefined" ? 'id="' + p.id + '"' : '';
		h += typeof(p.name) != "undefined" ? 'name="' + p.name + '"' : '';
		h += typeof(p.width) != "undefined" ? 'width="' + p.width + '"' : '';
		h += typeof(p.height) != "undefined" ? 'height="' + p.height + '"' : '';
		h += typeof(p.align) != "undefined" ? 'align="' + p.align + '"' : '';
		
		h += '>';
	
		for ( n in p ) {
			h += '<param name="' + n + '" value="' + p[n] + '">';
		}
	
		h += '<embed type="' + mt + '"';
	
		for ( n in p ) {
			h += n + '="' + p[n] + '" ';
		}
	
		h += '></embed></object>';
	
		//document.write(h);
	}
	*/

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

tinyMCE.addPlugin("compositemedia", TinyMCE_CompositeMediaPlugin);