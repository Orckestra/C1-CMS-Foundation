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
* @overloads {ButtonBinding#onBindingAttach}
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
* @implements {IBroadcastListener}
* @param {string} broadcast
* @param {object} arg
*/
ToolBarComboButtonBinding.prototype.handleBroadcast = function (broadcast, arg) {

	ToolBarComboButtonBinding.superclass.handleBroadcast.call(this, broadcast, arg);

}


/**
* Set and Fire Commmand from MenuItem
* @param {MenuItemBinding} menuitem
*/
ToolBarComboButtonBinding.prototype.setAndFireButton = function (label, image, imageDisabled, oncommand) {

	this.setLabel(label);
	this.image = image;
	this.imageDisabled = imageDisabled;
	this.imageProfile = new ImageProfile(this);
	this.setImage(this.imageProfile.getDefaultImage());

	this.oncommand = function () {
		Binding.evaluate(oncommand, this);
	};
	this.fireCommand();
}