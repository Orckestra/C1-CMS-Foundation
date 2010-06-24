/* PATCHING ........................................................... */

TinyMCE_Engine.prototype._originalSetInnerHTML = TinyMCE_Engine.prototype.setInnerHTML;

/*
 * Patching line 5184 (bug number?). Bug converting <embed> to <ibed>
 * Also patching a bug where no content would result in two <p> by default.
 * @see http://wordpress.org/support/topic/107101
 * @see http://trac.wordpress.org/ticket/3946
 */
TinyMCE_Engine.prototype.setInnerHTML = function( e, h ) {
	
	// Convert all strong/em to b/i in Gecko
	if (tinyMCE.isGecko) {
	
		h = h.replace(/<strong/gi, '<b');
		h = h.replace(/<em(\/?)/gi, '<i');
		h = h.replace(/<em /gi, '<i');
		h = h.replace(/<\/strong>/gi, '</b>');
		h = h.replace(/<\/em>/gi, '</i>');
		h = h.replace(/<\/ibed/gi, '</embed');
        h = h.replace(/<ibed /gi, '<embed ');
	}
	
	this._originalSetInnerHTML ( e, h );
};

/* REAL STUFF ........................................................... */

/*
 * TinyMCE initialization.
 */
tinyMCE.init ({
	
	mode : "exact",
	elements : "editor",
	theme : "composite",
	plugins : "compositetable,compositeimage,compositecharmap,compositerendering,compositelink,compositemedia,compositefield,compositeword,compositetext",
	
	verify_html : false,
	doctype : "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>",
	entity_encoding : "raw",
	
	convert_fonts_to_spans : false,
	apply_source_formatting : false,
	fix_list_elements : false,
	fix_table_elements : false,
	convert_newlines_to_brs : false,
	force_p_newlines : false,
	force_br_newlines: false,
	forced_root_block : "p",
	
	oninit : onEngineInitialize,
	init_instance_callback 	: onInstanceInitialize
});

/*
 * Used by plugins.
 */
function makeAttrib ( attrib, value ) {
	var res = "";
	if ( value ) {
		res = value.replace(/&/g, '&amp;');
		res = value.replace(/\"/g, '&quot;');
		res = value.replace(/</g, '&lt;');
		res = value.replace(/>/g, '&gt;');
		res = ' ' + attrib + '="' + value + '"';
	}
	return res;
}			

/**
 * @type {TinyMCE_Engine}
 */
var tinyEngine = null;

/**
 * @type {TinyMCE_Control}
 */
var tinyInstance = null;

/**
 * @type {TinyMCE_CompositeTheme}
 */
var tinyTheme = null;


// GLOBAL FUNCTIONS .....................................................

/** 
 * Called when tinyInstance initialized.
 * @param {TinyMCE_Control} inst
 */
function onInstanceInitialize ( inst ) {
	
	if ( !tinyInstance ) { // mozilla initalizes twice!
	
		tinyInstance = inst;
		checkStartupConditions ();
	}
}

/**
 * Called when engine initializes
 */
function onEngineInitialize () {
	
	tinyEngine = tinyMCE;
	tinyTheme = TinyMCE_CompositeTheme;
	checkStartupConditions ();
}

/**
 * Mozilla versus Explorer initializes components in different order. This 
 * will make sure that everything is loaded correctly before we broadcast.
 */
function checkStartupConditions () {
	
	if ( tinyEngine && tinyInstance ) {
		
		tinyTheme = TinyMCE_CompositeTheme;
		
		if ( top.EventBroadcaster ) {
		
			/*
			 * Broadcast intercepted by WysiwygEditorBinding.
			 */
			top.EventBroadcaster.broadcast ( 
				top.BroadcastMessages.TINYMCE_INITIALIZED, {
				
					// this will let them know who we are
					broadcastWindow		: window,
					
					// this is what they need to know
					tinyEngine			: tinyEngine,
					tinyInstance 		: tinyInstance,
					tinyTheme 			: tinyTheme
				}
			);
		}
	}
}