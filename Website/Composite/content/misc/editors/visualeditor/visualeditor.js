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
	force_p_newlines : true,
	force_br_newlines: false,
	visual : true,
	object_resizing : false,
	auto_reset_designmode : true,
	
	init_instance_callback 	: onInstanceInitialize
};

/*
 * Load configuration.
 */
var conf = "common";
var editorpath = window.location.toString ();
if (editorpath.indexOf("config=") > -1) {
    conf = editorpath.split("config=")[1];
}
var sitepath = editorpath.substring(0, editorpath.toLowerCase().indexOf("/composite/content/"));
var relconfigpath = "/Frontend/Config/VisualEditor/" + conf + ".xml";
var url = sitepath + relconfigpath;

var request = DOMUtil.getXMLHTTPRequest ();
request.open ( "get", url, false );
request.send ( null );

var doc = request.responseXML;
if ( doc == null ) {
    var cry = "File not found: ~" + relconfigpath;
	alert ( cry );
	throw cry;
}

var groups = new List ();
var formats = {};

/*
 * Setup formats.
 */
var elements = new List ( doc.getElementsByTagName ( "group" ))
	.merge ( new List ( doc.getElementsByTagName ( "radiogroup" )));

elements.each ( function ( el ) {
	var group = new List ();
	new List ( el.getElementsByTagName ( "format" )).each ( function ( element ) {
		var format = new Format ( element );
		formats [ format.id ] = format.props;
		group.add ( format );
	});
	groups.add ( group );
});

/*
 * Init TinyMCE. 
 */
config.formats = formats;
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
	
	// make TinyMCE aware of our buttons and stuff.
	Format.configure ( tinyInstance );
	tinyTheme.registerNodeChangeHandler ( Format );
	
	// The toolbar will access this at some point...
	tinyTheme.formatGroups = groups; 
	
	/*
	 * Load CSS.
	 */
	var styles = new List ( doc.getElementsByTagName ( "style" ));
	styles.each ( function ( style ) {
		var file = style.getAttribute ( "file" );
		if ( file != null && file != "" ) {
			tinyInstance.dom.loadCSS ( Constants.CONFIGROOT + file );
		}
	})
	
	/*
	 * Hacking!!! See notes below...
	 */
	tinyInstance.queryCommandState = queryCommandState_hacked;
	
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

/**
 * Something is wrong with TinyMCE the "queryCommandState" method. 
 * @see {http://tinymce.moxiecode.com/punbb/viewtopic.php?pid=35821}
 * @param {String} u
 * @returns {boolean}
 */
function queryCommandState_hacked (u) {
	
    var q = this, v, r;
    if (q._isHidden()) {
        return;
    }
    if ((v = q.queryStateCommands[u])) {
        r = v.func.call(v.scope);
        if ( r == true ) {
            return r;
        }
    }
    v = q.editorCommands.queryCommandState(u);
    if (v !== -1) {
        return v;
    }
    try {
        return this.getDoc().queryCommandState(u);
    } catch (p) {
    }
}