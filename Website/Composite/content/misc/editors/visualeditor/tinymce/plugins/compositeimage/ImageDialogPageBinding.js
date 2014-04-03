ImageDialogPageBinding.prototype = new TinyDialogPageBinding;
ImageDialogPageBinding.prototype.constructor = ImageDialogPageBinding;
ImageDialogPageBinding.superclass = TinyDialogPageBinding.prototype;

/**
* @class
*/
function ImageDialogPageBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("ImageDialogPageBinding");

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
ImageDialogPageBinding.prototype.setPageArgument = function (arg) {

	this._tinyAction = arg.tinyAction;
	this.label = this._tinyAction == "insert" ? "${string:Composite.Web.VisualEditor:Image.LabelInsertImage}" : "${string:Composite.Web.VisualEditor:Image.LabelImageProperties}";

	ImageDialogPageBinding.superclass.setPageArgument.call(this, arg);
}

/**
* @overloads {DialogPageBinding#onBeforePageIntialize}
*/
ImageDialogPageBinding.prototype.onBeforePageInitialize = function () {

	ImageDialogPageBinding.superclass.onBeforePageInitialize.call(this);

	this.addActionListener(UrlInputDialogBinding.URL_SELECTED);

	this._populateClassNameSelector("img");
	if (this._tinyAction == "update") {
		this._populateDataBindingsFromDOM();
	}
	this._configureFields();
}

/**
* On "insert" action, launch dialog automatically.
* @overloads {DialogPageBinding#onAfterPageIntialize}
*/
ImageDialogPageBinding.prototype.onAfterPageInitialize = function () {

	if (this._tinyAction == "insert") {
		var dialoginput = this.bindingWindow.DataManager.getDataBinding("src");
		dialoginput.oncommand();
	}

	ImageDialogPageBinding.superclass.onAfterPageInitialize.call(this);
}

/**
* Initialize databindings.
* @overloads {TinyDialogPageBinding#_populateDataBindingsFromDOM}
*/
ImageDialogPageBinding.prototype._populateDataBindingsFromDOM = function () {

	ImageDialogPageBinding.superclass._populateDataBindingsFromDOM.call(this);

	var img = this._tinyElement;
	var src = img.getAttribute("src");
	var alt = img.getAttribute("alt");
	var title = img.getAttribute("title");
	var c1PreserveTilde = img.getAttribute("c1-preserve-tilde");
	var manager = this.bindingWindow.DataManager;

	if (src) {
		if (src.indexOf("../../../../..") > -1) {
			src = "~" + src.substring(src.indexOf("../../../../..") + 14);
		} else if (c1PreserveTilde && src.indexOf(Constants.WEBSITEROOT) === 0) {
			src = src.replace(Constants.WEBSITEROOT, "~/");
		}

		src = src.replace(/%28/g, "(").replace(/%29/g, ")");

		var mediaUrl = new Uri(src);
		if (mediaUrl.isMedia) {
			if (mediaUrl.hasParam("mw"))
				manager.getDataBinding("maxwidth").setValue(mediaUrl.getParam("mw"));
			if (mediaUrl.hasParam("mh"))
				manager.getDataBinding("maxheight").setValue(mediaUrl.getParam("mh"));
			src = mediaUrl.getPath();
		}

		manager.getDataBinding("src").setValue(src);
	}
	if (alt) {
		manager.getDataBinding("alt").setValue(alt);
	}
	if (title) {
		manager.getDataBinding("title").setValue(title);
	}
}

/**
* @implements {IActionListener}
* @overloads {TinyDialogPageBinding#handleAction}
* @param {Action} action
*/
ImageDialogPageBinding.prototype.handleAction = function (action) {

	ImageDialogPageBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case UrlInputDialogBinding.URL_SELECTED:
			this._configureFields();
			break;
	}
}

/**
* Configure fields
*/
ImageDialogPageBinding.prototype._configureFields = function () {
	var manager = this.bindingWindow.DataManager;
	var src = manager.getDataBinding("src");
	var maxwidth = manager.getDataBinding("maxwidth");
	var maxheight = manager.getDataBinding("maxheight");

	if (maxwidth && maxheight) {

		if (src.compositeUrl != null && src.compositeUrl.isMedia) {
			maxwidth.setReadOnly(false);
			maxheight.setReadOnly(false);
		} else {
			maxwidth.setReadOnly(true);
			maxheight.setReadOnly(true);
		}
	}

}