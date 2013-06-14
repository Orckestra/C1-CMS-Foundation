UploadDialogPageBinding.prototype = new DialogPageBinding;
UploadDialogPageBinding.prototype.constructor = UploadDialogPageBinding;
UploadDialogPageBinding.superclass = DialogPageBinding.prototype;

var UPLOAD_SERVICE_URL = Resolver.resolve("${root}/content/dialogs/util/upload/upload.ashx");

/**
* @class
*/
function UploadDialogPageBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("UploadDialogPageBinding");

	/**
	* Files
	* @type {FileList}
	*/
	this._files = null;
}

/**
* Identifies binding.
*/
UploadDialogPageBinding.prototype.toString = function () {

	return "[UploadDialogPageBinding]";
};

/**
* @overloads {PageBinding#setPageArgument}
* @param {object} arg
*/
UploadDialogPageBinding.prototype.setPageArgument = function (arg) {

	UploadDialogPageBinding.superclass.setPageArgument.call(this, arg);
	this._files = arg.files;
};

/* 
 *  @overloads {TinyDialogPageBinding#handleAction}
*/
UploadDialogPageBinding.prototype.onDialogAccept = function () {
	var manager = this.bindingWindow.DataManager;

	this.result = '';
	if (this._files) {
		for (var i = 0; i < this._files.length; i++) {
			var file = this._files[i];
			var request = DOMUtil.getXMLHTTPRequest();

			request.open("post", UPLOAD_SERVICE_URL, false);
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			request.setRequestHeader("X-FileName", file.name);
			var folder = manager.getDataBinding("MediaFileFolder").getValue();
			if (folder) request.setRequestHeader("X-FolderPath", folder);
			var maxwidth = manager.getDataBinding("maxwidth").getValue();
			var maxheight = manager.getDataBinding("maxheight").getValue();
			if (maxwidth) request.setRequestHeader("X-MaxWidth", maxwidth);
			if (maxheight) request.setRequestHeader("X-MaxHeight", maxheight);
			request.send(file);
			this.result += request.responseText;
		}
	}
	this.onDialogResponse();

};