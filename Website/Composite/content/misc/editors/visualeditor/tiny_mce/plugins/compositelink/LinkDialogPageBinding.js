LinkDialogPageBinding.prototype = new TinyDialogPageBinding;
LinkDialogPageBinding.prototype.constructor = LinkDialogPageBinding;
LinkDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
 * @class
 */
function LinkDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LinkDialogPageBinding" );
}

/**
 * Identifies binding.
 */
LinkDialogPageBinding.prototype.toString = function () {

	return "[LinkDialogPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
LinkDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	LinkDialogPageBinding.superclass.setPageArgument.call ( this, arg );
	this.label = this._tinyAction == "update" ? "Link Properties" : "Insert Link";
}

/**
 * @overloads {DialogPageBinding#onBeforePageIntialize}
 */
LinkDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	LinkDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this._populateClassNameSelector ( "a" );
	if ( this._tinyAction == "update" ) {
		this._populateDataBindingsFromDOM ();
	} else {
		var manager = this.bindingWindow.DataManager;
		manager.getDataBinding ( "href" ).setValue ( "http://" );
	}
}

/**
 * Initialize databindings.
 * @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
 */
LinkDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {
	
	LinkDialogPageBinding.superclass._populateDataBindingsFromDOM.call ( this );
	
	var a = this._tinyElement, manager = this.bindingWindow.DataManager;
	
	if ( a.href ) {
		manager.getDataBinding ( "href" ).setValue ( a.href );
	}
	if ( a.rel ) {
		manager.getDataBinding ( "rel" ).setValue ( a.rel );
	}
	if ( a.title ) {
		manager.getDataBinding ( "title" ).setValue ( a.title );
	}
	
	var target = a.getAttribute ( "tinymcetargetalias" );
	if ( target &&  target == "_blank" ) {
		manager.getDataBinding ( "blank" ).check ( true );
	}
}