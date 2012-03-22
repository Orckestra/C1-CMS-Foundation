ToolBarComboButtonBinding.prototype = new ToolBarButtonBinding;
ToolBarComboButtonBinding.prototype.constructor = ToolBarComboButtonBinding;
ToolBarComboButtonBinding.superclass = ToolBarButtonBinding.prototype;

ToolBarComboButtonBinding.CLASSNAME_COMBOBUTTON = "combobutton";

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
	var activeMenu = null;
	var activeMenuId = this.getActiveMenuItemId();

	menuitems.reset();
	while (menuitems.hasNext()) {
		var menuitem = menuitems.getNext();
		if (menuitem.getProperty("id") == activeMenuId) {
			activeMenu = menuitem;
			break;
		}
	}

	if (activeMenu == null && menuitems.hasEntries()) {
		activeMenu = menuitems.getFirst();
	}

	if (activeMenu != null)
		this.setButton(activeMenu);
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

		this.oncommand = function () {
			Binding.evaluate(hiddenCommand, this);
		};

		this.hideActiveItem(menuitem);
	}
}

/**
* Set and Fire Commmand from MenuItem
* @param {MenuItemBinding} menuitem
*/
ToolBarComboButtonBinding.prototype.setAndFireButton = function (menuitem) {

	if (menuitem instanceof MenuItemBinding) {
		this.setButton(menuitem);
		this.setActiveMenuItemId(menuitem.getProperty("id"));
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
			if (menuitem == activeMenuitem) {
				Binding.prototype.hide.call(menuitem);
			} else {
				Binding.prototype.show.call(menuitem);
			}
		}
	);
}


/**
* Set active menuitem id
* @param {MenuItemBinding} menuitem id
*/
ToolBarComboButtonBinding.prototype.setActiveMenuItemId = function (id) {
	Cookies.createCookie(this.getProperty("id"), id, 365);
}

/**
* Get active menuitem id
*/
ToolBarComboButtonBinding.prototype.getActiveMenuItemId = function () {
	return Cookies.readCookie(this.getProperty("id"));
}

