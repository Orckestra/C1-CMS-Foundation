MediaDialogPageBinding.prototype = new TinyDialogPageBinding;
MediaDialogPageBinding.prototype.constructor = MediaDialogPageBinding;
MediaDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

MediaDialogPageBinding.URL_FLASHOPTIONS		= "${tinymce}/plugins/compositemedia/mediaflash.aspx";
MediaDialogPageBinding.URL_QUICKTIMEOPTIONS	= "${tinymce}/plugins/compositemedia/mediaquicktime.aspx";
MediaDialogPageBinding.URL_SHOCKWAVEOPTIONS	= "${tinymce}/plugins/compositemedia/mediashockwawe.aspx";
MediaDialogPageBinding.URL_WINMEDIAOPTIONS 	= "${tinymce}/plugins/compositemedia/mediawinmedia.aspx";

/**
 * @class
 */
function MediaDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MediaDialogPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._tinyAction = null;
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
MediaDialogPageBinding.prototype.setPageArgument = function ( arg ) {

	this._tinyAction = arg.tinyAction;
	this.label = this._tinyAction == "insert" ? "Insert Media" : "Media Properties";
	
	MediaDialogPageBinding.superclass.setPageArgument.call ( this, arg );
}

/**
 * Connect various bindings.
 * @overloads {TinyDialogPageBinding#onBeforePageInitialize}
 */
MediaDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	var typeselector = bindingMap.mediatype;
	var datadialog = bindingMap.advancedoptions;
	
	var options = {
		"flash" 	: MediaDialogPageBinding.URL_FLASHOPTIONS,
		"quicktime" : MediaDialogPageBinding.URL_QUICKTIMEOPTIONS,
		"shockwave" : MediaDialogPageBinding.URL_SHOCKWAVEOPTIONS,
		"winmedia" 	: MediaDialogPageBinding.URL_WINMEDIAOPTIONS
	}
	
	datadialog.addActionListener ( DataDialogBinding.ACTION_COMMAND, {
		handleAction : function () {
			datadialog.setURL ( 
				options [ 
					typeselector.getValue () 
				]
			)
		}
	});
	
	this._populateClassNameSelector ( "object" );
	
	if ( this._tinyAction == "update" ) {
		this._populateDataBindingsFromDOM ();
	}
	
	MediaDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Initialize databindings.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
MediaDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	var options = new DataBindingMap ();
	var params = this._tinyElement.getAttribute ( "params" );
	
	if ( params ) {
		params = new List ( params.split ( ";" ));
	}
	
	var width = this._tinyElement.width;
	var height = this._tinyElement.height;
	
	if ( width ) {
		DataManager.getDataBinding ( "width" ).setValue ( width );
	}
	if ( height ) {
		DataManager.getDataBinding ( "height" ).setValue ( height );
	}
	
	/*
	 * Isolate data for DataDialogBinding and populate src field.
	 */
	var src = null;
	while ( params && params.hasNext ()) {
		var param = params.getNext ();
		if ( params.hasNext ()) {
			var split = param.split ( "===" ), // since "=" could occur elsewhere
				name = split [ 0 ], 
				value = split [ 1 ];
			if ( name != "src" ) {
				options.set ( 
					"param" + name, 
					Types.castFromString ( value )
				);
			} else {
				DataManager.getDataBinding ( "paramsrc" ).setValue ( value );
			}
		}
	}
	
	var classname = this._tinyElement.className;
	if ( classname.indexOf ( " " ) >-1 ) {
		classname = classname.split ( " " )[ 0 ];
	}
	
	var value = null;
	switch ( classname ) {
		case "compositemediaflash" :
			value = "flash";
			break;
		case "compositemediaquicktime" :
			value = "quicktime";
			break;
		case "compositemediashockwave" :
			value = "shockwave";
			break;
		case "compositemediawinmedia" :
			value = "winmedia";	
			break;
	}
	
	if ( value ) {
		var typeselector = bindingMap.mediatype;
		typeselector.selectByValue ( value );
	}
	bindingMap.advancedoptions.setResult ( options );
	MediaDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
}