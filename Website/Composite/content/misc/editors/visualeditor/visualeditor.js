/*
 * TinyMCE initialization.
 */
var config = {
			
	mode : "exact",
	elements : "editor",
	theme : "composite",
	browsers : "msie,gecko",
	plugins: "autolink,composite,compositelink,table,compositetable,compositeimage,compositerendering,compositecharmap,compositefield,compositetext,compositespellcheck,compositeimageresize,paste,lists",
	entity_encoding : "raw",
	convert_fonts_to_spans : false,
	apply_source_formatting : false,
	fix_list_elements : false,
	fix_table_elements : false,
	convert_newlines_to_brs : false,
	force_p_newlines : true,
	force_br_newlines: false,
	forced_root_block: '',
	visual : true,
	object_resizing: Client.isExplorer,
	auto_reset_designmode : true,
	list_outdent_on_enter: true,
	init_instance_callback 	: onInstanceInitialize
};

/*
 * Load configuration.
 */
var conf = "common";

var editorpath = window.location.toString();
var configParam = /[\?&]config=([^&#]*)/.exec(window.location.search);
if (configParam != null) {
	conf = configParam[1];
}
var sitepath = editorpath.substring(0, editorpath.toLowerCase().indexOf("/composite/content/"));
var relconfigpath = "/Composite/services/WysiwygEditor/getconfig.ashx?name=" + conf;
var url = sitepath + relconfigpath;

var request = DOMUtil.getXMLHTTPRequest ();
request.open ( "get", url, false );
request.send ( null );

var doc = request.responseXML;
if ( doc == null ) {
	doc = document.createElement("div");
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

if (Client.isExplorer || Client.isExplorer11) {
	config.content_css = "ie.css";
}

/*
 * Preload plugins
 */

var plugins = config.plugins.split(',');
var loadedPlugins = [];
for (var i = 0, length = plugins.length; i < length; i++) {
	var plugin = plugins[i];
	window.tinyMCE.PluginManager.load(plugin, sitepath + "/Composite/content/misc/editors/visualeditor/tinymce/plugins/" + plugin + "/plugin.min.js?c1=" + Installation.versionString);
	loadedPlugins.push("-" + plugin);
}
config.plugins = loadedPlugins.join(",");

/*
 * Preload theme
 */
window.tinyMCE.ThemeManager.load(plugin, sitepath + "/Composite/content/misc/editors/visualeditor/tinymce/themes/" + config.theme + "/theme.min.js?c1=" + Installation.versionString);
config.theme = "-" + config.theme;


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
	if (value) {
		res = res + value;
		res = res.replace(/&/g, '&amp;');
		res = res.replace(/\"/g, '&quot;');
		res = res.replace(/</g, '&lt;');
		res = res.replace(/>/g, '&gt;');
		res = ' ' + attrib + '="' + res + '"';
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
	
	var head = tinyInstance.dom.doc.getElementsByTagName('head')[0];

	/*
	 * Load CSS.
	 */
	
	var styles = new List ( doc.getElementsByTagName ( "style" ));
	styles.each(function(style) {
		var file = style.getAttribute("file");
		var rel = style.getAttribute("rel");
		if (file != null && file != "") {
			tinyInstance.dom.add(head, 'link', {
				'href': Constants.CONFIGROOT + file,
				'rel': rel ? rel:'stylesheet'
			});
		}
	});

	/*
	 * Load Scripts.
	 */
	var scripts = new List(doc.getElementsByTagName("script"));
	scripts.each(function (script) {
		var file = script.getAttribute("file");
		if (file != null && file != "") {
			tinyInstance.dom.add(head, 'script', {
				src: Constants.CONFIGROOT + file,
				type: 'text/javascript'
			});
		}
	});

	//Enable SpellCheck
	if (Client.hasSpellcheck) {
		tinyInstance.getBody().spellcheck = true;
		tinyInstance.getBody().lang = Localization.currentLang();
	}

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
