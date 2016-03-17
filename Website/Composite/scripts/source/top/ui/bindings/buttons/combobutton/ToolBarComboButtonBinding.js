ToolBarComboButtonBinding.prototype = new ToolBarButtonBinding;
ToolBarComboButtonBinding.prototype.constructor = ToolBarComboButtonBinding;
ToolBarComboButtonBinding.superclass = ToolBarButtonBinding.prototype;

ToolBarComboButtonBinding.CLASSNAME_COMBOBUTTON = "combobutton";
ToolBarComboButtonBinding.STORAGE_PREFFIX = "STORAGEBUTTONHANDLE";

/**
* @class
*/
function ToolBarComboButtonBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("ToolBarComboButtonBinding");


	/**
	* @overwrites {ButtonBinding#isComboButton}
	* @type {boolean}
	*/
	this.isComboButton = true;

	/**
	* @overwrites {ButtonBinding#isCheckButton}
	* @type {boolean}
	*/
	this.isCheckButton = true;

	/**
	 * @type {boolean}
	 */
	this.keepState = true;

	/**
	 * @type {boolean}
	 */
	this.alignWidth = false;

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
ToolBarComboButtonBinding.prototype.toString = function () {

	return "[ToolBarComboButtonBinding]";
}

/**
* @overloads {ToolBarButtonBinding#onBindingAttach}
*/
ToolBarComboButtonBinding.prototype.onBindingAttach = function () {

	ToolBarComboButtonBinding.superclass.onBindingAttach.call(this);

	this.comboBoxBinding = ComboBoxBinding.newInstance(this.bindingDocument);
	this.add(this.comboBoxBinding);
	this.comboBoxBinding.attach();

	this.attachClassName(ToolBarComboButtonBinding.CLASSNAME_COMBOBUTTON);

	this.keepState = this.getProperty("keepstate") !== false;
};

/**
* Build popup when perspective changes. If no
* views are associated, the button will disable.
* @overloads {ToolBarButtonBinding#handleBroadcast}
* @param {string} broadcast
* @param {object} arg
*/
ToolBarComboButtonBinding.prototype.handleBroadcast = function (broadcast, arg) {

	ToolBarComboButtonBinding.superclass.handleBroadcast.call(this, broadcast, arg);
}

/**
* @overloads {ToolBarButtonBinding#setPopup}
* @param {object} arg This can be either a string or a {@link PopupBinding}.
*/
ToolBarComboButtonBinding.prototype.setPopup = function (arg) {

	ToolBarComboButtonBinding.superclass.setPopup.call(this, arg);

	var self = this;
	var menuItemBindings = this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
	menuItemBindings.each(
		function (menuItemBinding) {
			var hiddenCommand = menuItemBinding.getProperty("oncommand");
			menuItemBinding.setProperty("hiddencommand", hiddenCommand);
			menuItemBinding.deleteProperty("oncommand");
			menuItemBinding.oncommand = function () {
				self.setAndFireButton(this);
			};
		}, this
	);
	var latestMenuItemBinding = null;
	if (this.keepState) {
		var latestMenuItemHandle = this.getActiveMenuHandle();

		menuItemBindings.each(function (menuItemBinding) {
			if (this.getMenuHandle(menuItemBinding) === latestMenuItemHandle && !menuItemBinding.isDisabled) {
				latestMenuItemBinding = menuItemBinding;
				return false;
			}
			return true;
		}, this);
	}

	if (latestMenuItemBinding == null) {
		menuItemBindings.each(function (menuItemBinding) {
			if (!menuItemBinding.isDisabled) {
				latestMenuItemBinding = menuItemBinding;
				return false;
			}
			return true;
		}, this);
	}

	if (latestMenuItemBinding != null)
		this.setButton(latestMenuItemBinding);

	if (this.comboBoxBinding) {
		if (menuItemBindings.getLength() <= 1) {
			this.comboBoxBinding.hide();
		} else {
			this.comboBoxBinding.show();
		}
	}
}

/**
* Set and Fire Commmand from MenuItem
* @param {MenuItemBinding} menuitem
*/
ToolBarComboButtonBinding.prototype.setButton = function (menuitem) {

	if (menuitem instanceof MenuItemBinding) {
		var label = menuitem.getProperty("label");
		var image = menuitem.getProperty("image");
		var hiddenCommand = menuitem.getProperty("hiddencommand");

		this.setLabel(label ? label : "");

		this.setImage(image);
		if (!this.isDisabled && menuitem.isDisabled) {
			this.setDisabled(true);
		} else if (this.isDisabled && !menuitem.isDisabled) {
			this.setDisabled(false);
		}

		if (menuitem.associatedSystemAction) {
			this.associatedSystemAction = menuitem.associatedSystemAction;
		}

		this.oncommand = function () {
			Binding.evaluate(hiddenCommand, this);
		};

		this.hideActiveItem(menuitem);
	}
}

ToolBarComboButtonBinding.prototype.getAssociatedSystemActions = function () {

	var result = new List();

	this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(menuitem) {
		if (menuitem.associatedSystemAction) {
			result.add(menuitem.associatedSystemAction);
		}
	});

	return result;
}

/**
* Set and Fire Commmand from MenuItem
* @param {MenuItemBinding} menuitem
*/
ToolBarComboButtonBinding.prototype.setAndFireButton = function (menuitem) {

	if (menuitem instanceof MenuItemBinding) {
		if (this.keepState) {
			this.setButton(menuitem);
			this.saveActiveMenuHandle(this.getMenuHandle(menuitem));
			this.fireCommand();
		} else {
			this.dispatchAction( new Action (menuitem, this.commandAction));
		}

	}
}

/**
* Set and Fire Commmand from MenuItem
* @param {MenuItemBinding} menuitem
*/
ToolBarComboButtonBinding.prototype.hideActiveItem = function (activeMenuitem) {

	this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(
		function (menuitem) {
			if (menuitem === activeMenuitem) {
				Binding.prototype.hide.call(menuitem);
			} else {
				Binding.prototype.show.call(menuitem);
			}
		}
	);
}

/**
* Set active menuitem handle
* @param {MenuItemBinding} menuitem id
*/
ToolBarComboButtonBinding.prototype.saveActiveMenuHandle = function (handle) {

	LocalStorage.set(ToolBarComboButtonBinding.STORAGE_PREFFIX + this.getBundleName(), handle);
}

/**
* Get active menuitem handle
*/
ToolBarComboButtonBinding.prototype.getActiveMenuHandle = function () {

	return LocalStorage.get(ToolBarComboButtonBinding.STORAGE_PREFFIX + this.getBundleName());
}

ToolBarComboButtonBinding.prototype.getMenuHandle = function (menuitem) {

	return menuitem.menuHandle ? menuitem.menuHandle : menuitem.getProperty("id");
}

ToolBarComboButtonBinding.prototype.getBundleName = function () {

	return this.getProperty("bundle") ? this.getProperty("bundle") : this.getProperty("id");
}

/**
 * ToolBarButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarButtonBinding}
 */
ToolBarComboButtonBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:toolbarbutton", ownerDocument);
	return UserInterface.registerBinding(element, ToolBarComboButtonBinding);
}