EditFunctionCallTabBoxBinding.prototype = new TabBoxBinding;
EditFunctionCallTabBoxBinding.prototype.constructor = EditFunctionCallTabBoxBinding;
EditFunctionCallTabBoxBinding.superclass = TabBoxBinding.prototype;

/**
 * @class
 */
function EditFunctionCallTabBoxBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("EditFunctionCallTabBoxBinding");
}

/**
 * Identifies binding.
 */
EditFunctionCallTabBoxBinding.prototype.toString = function () {

	return "[EditFunctionCallTabBoxBinding]";
}


/**
 * Dispatching action to initialize containing tabboxbinding.
 * Overloads {Binding#onBindingAttach}
 */
EditFunctionCallTabBoxBinding.prototype.onBindingAttach = function () {

	EditFunctionCallTabBoxBinding.superclass.onBindingAttach.call(this);

}

///**
// * @overloads {TabBoxBinding#select}
// */
//EditFunctionCallTabBoxBinding.prototype.select = function (arg, isManaged) {

//	if (!isManaged) {
//		var tagname = Client.isExplorer || Client.isWebKit ? "functioneditor" : "ui:functioneditor";
//		var editor = this.bindingDocument.getElementsByTagName(tagname).item(0);
//		var binding = UserInterface.getBinding(editor);
//		var win = binding.getContentWindow();

//		if (win.bindingMap != null) {
//			var page = win.bindingMap.functioneditorpage;
//			win.DataManager.isDirty = true; // hacking away!
//			page.postMessage(EditorPageBinding.MESSAGE_PERSIST);
//		}
//		return;
//	}
//	EditFunctionCallTabBoxBinding.superclass.select.call(this, arg, isManaged);
//}

