/*
 * TinyMCE initialization.
 */
var config = {
			
	mode : "exact",
	elements : "editor",
	theme : "composite",
	browsers : "msie,gecko",
	plugins : "compositelink,compositetable,compositeimage,compositerendering,compositecharmap,compositefield,compositetext,compositeword",	
	verify_html : false,
	entity_encoding : "raw",
	convert_fonts_to_spans : false,
	apply_source_formatting : false,
	fix_list_elements : false,
	fix_table_elements : false,
	convert_newlines_to_brs : false,
	force_p_newlines : false,
	force_br_newlines: false,
	visual : true,
	object_resizing : false,
	
	init_instance_callback 	: onInstanceInitialize
};

window.tinyMCE.init ( config );


/**
 * Used by plugins.
 * @param {string} attrib
 * @param {string} value
 * @return {string}
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


// ...........................................................................

/** @type {TinyMCE_Engine} */
var tinyEngine = null;

/** @type {tinymce.Editor} */
var tinyInstance = null;

/** @type {tinymce.themes.CompositeTheme} */
var tinyTheme = null;

/** 
 * Called when tinyInstance initialized.
 * @param {object} inst
 */
function onInstanceInitialize ( inst ) {

	tinyEngine = tinyMCE;
	tinyInstance = inst;
	tinyTheme = inst.theme;
	
	if ( top.EventBroadcaster != null ) {
		
		/*
		 * Broadcast intercepted by VisualEditorBinding.
		 */
		top.EventBroadcaster.broadcast ( 
			top.BroadcastMessages.TINYMCE_INITIALIZED, {
			
				// this will identify us to the correct editor
				broadcastWindow	: window,
				
				// this is what the editor needs to know
				tinyEngine : tinyEngine,
				tinyInstance : tinyInstance,
				tinyTheme : tinyTheme
			}
		);
	}
}