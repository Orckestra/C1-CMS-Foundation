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
	* @type {string}
	*/
	this.bundleName = null;

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

	this.bundleName = this.getProperty("bundle") ? this.getProperty("bundle") : this.getProperty("id");
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
	var menuitems = this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
	menuitems.each(
		function (menuitem) {
			var hiddenCommand = menuitem.getProperty("oncommand");
			menuitem.setProperty("hiddencommand", hiddenCommand);
			menuitem.deleteProperty("oncommand");
			menuitem.oncommand = function () {
				self.setAndFireButton(this);
			};
		}
	);
	var activeMenu = menuitems.hasEntries() ? menuitems.getFirst() : null ;
	var activeMenuHandle = this.getActiveMenuHandle();

	menuitems.reset();
	while (menuitems.hasNext()) {
		var menuitem = menuitems.getNext();
		if (this.getMenuHandle(menuitem) === activeMenuHandle) {
			activeMenu = menuitem;
			break;
		}
	}

	if (activeMenu != null)
		this.setButton(activeMenu);

	if (this.comboBoxBinding) {
		if (menuitems.getLength() <= 1) {
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
		var imageHover = menuitem.getProperty("image-hover");
		var imageActive = menuitem.getProperty("image-active");
		var imageDisabled = menuitem.getProperty("image-disabled");
		var hiddenCommand = menuitem.getProperty("hiddencommand");


		this.setLabel(label ? label : "");

		this.image = image;
		this.imageHover = image;
		this.imageActive = imageActive;
		this.imageDisabled = imageDisabled;
		this.imageProfile = new ImageProfile(this);
		this._stateManager.imageProfile = this.imageProfile;

		this.setImage(this.imageProfile.getDefaultImage());

		this.associatedSystemAction = menuitem.associatedSystemAction;

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
		this.setButton(menuitem);
		this.setActiveMenuHandle(this.getMenuHandle(menuitem));
		this.fireCommand();
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
ToolBarComboButtonBinding.prototype.setActiveMenuHandle = function (handle) {
	LocalStorage.set(ToolBarComboButtonBinding.STORAGE_PREFFIX + this.bundleName, handle);
}

/**
* Get active menuitem handle
*/
ToolBarComboButtonBinding.prototype.getActiveMenuHandle = function () {
	return LocalStorage.get(ToolBarComboButtonBinding.STORAGE_PREFFIX + this.bundleName);
}

ToolBarComboButtonBinding.prototype.getMenuHandle = function (menuitem) {

	return menuitem.menuHandle ? menuitem.menuHandle : this.getProperty("id");
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