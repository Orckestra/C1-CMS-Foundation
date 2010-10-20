ImageDialogPageBinding.prototype = new TinyDialogPageBinding;
ImageDialogPageBinding.prototype.constructor = ImageDialogPageBinding;
ImageDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function ImageDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageDialogPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._tinyAction = null;
}

/**
 * Identifies binding.
 */
ImageDialogPageBinding.prototype.toString = function () {

	return "[ImageDialogPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
ImageDialogPageBinding.prototype.setPageArgument = function ( arg ) {

	this._tinyAction = arg.tinyAction;
	this.label = this._tinyAction == "insert" ? "Insert Image" : "Image Properties";
	
	ImageDialogPageBinding.superclass.setPageArgument.call ( this, arg );
}

/**
 * @overloads {DialogPageBinding#onBeforePageIntialize}
 */
ImageDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	ImageDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this._populateClassNameSelector ( "img" );
	if ( this._tinyAction == "update" ) {
		this._populateDataBindingsFromDOM ();
	}
}

/**
 * On "insert" action, launch dialog automatically.
 * @overloads {DialogPageBinding#onAfterPageIntialize}
 */
ImageDialogPageBinding.prototype.onAfterPageInitialize = function () {
	
	if ( this._tinyAction == "insert" ) {
		var dialoginput = this.bindingWindow.DataManager.getDataBinding ( "src" );
		dialoginput.oncommand ();
	}
	
	ImageDialogPageBinding.superclass.onAfterPageInitialize.call ( this );
}

/**
 * Initialize databindings.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
ImageDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	ImageDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
	
	var img 	= this._tinyElement;
	var src 	= img.getAttribute ( "src" );
	var alt 	= img.getAttribute ( "alt" );
	var title 	= img.getAttribute ( "title" );
	var manager	= this.bindingWindow.DataManager;
	
	if ( src ) {
		manager.getDataBinding ( "src" ).setValue ( src );
	}
	if ( alt ) {
		manager.getDataBinding ( "alt" ).setValue ( alt );
	}
	if ( title ) {
		manager.getDataBinding ( "title" ).setValue ( title );
	}
}