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

/**
 * @overloads {TabBoxBinding#select}
 */
EditFunctionCallTabBoxBinding.prototype.select = function (arg, isManaged) {

	if (!isManaged) {
		var tab = arg;
		var self = this;
		var page = this.bindingWindow.bindingMap.renderingdialogpage;
		if (tab.getID() == EditFunctionCallDialogPageBinding.ID_ADVANCEDTAB) {
			if (page.validateAllDataBindings()) {
				page.bindingWindow.__doPostBack("Advanced");
			} 
			return;
		
		} else if (tab.getID() == EditFunctionCallDialogPageBinding.ID_BASICTAB) {
			if (page.validateAllDataBindings()) {
				page.postframe(
					function () {
						self.select(tab, true);
						page.bindingWindow.__doPostBack("Basic");
					});
			}
			return;
		}
	}
	EditFunctionCallTabBoxBinding.superclass.select.call(this, arg, isManaged);
}

