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
	auto_reset_designmode : true,
	
	init_instance_callback 	: onInstanceInitialize
};

/*
formats : {
	alignleft : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
	aligncenter : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
	alignright : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
	alignfull : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
	bold : {inline : 'span', 'classes' : 'bold'},
	italic : {inline : 'span', 'classes' : 'italic'},
	underline : {inline : 'span', 'classes' : 'underline', exact : true},
	strikethrough : {inline : 'del'},
    forecolor : {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
    hilitecolor : {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
	custom_format : {block : 'h1', attributes : {title : "Header"}, styles : {color : "red"}}
}
*/

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