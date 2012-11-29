ViewDefinitionPostBackDataDialogBinding.prototype = new PostBackDataDialogBinding;
ViewDefinitionPostBackDataDialogBinding.prototype.constructor = ViewDefinitionPostBackDataDialogBinding;
ViewDefinitionPostBackDataDialogBinding.superclass = PostBackDataDialogBinding.prototype;

/**
 * This fellow will clone a ViewDefinition while  
 * allowing user to modify search properties and more.
 */
function ViewDefinitionPostBackDataDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ViewDefinitionPostBackDataDialogBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ViewDefinitionPostBackDataDialogBinding.prototype.toString = function () {

	return "[ViewDefinitionPostBackDataDialogBinding]";
}

/**
 * Temporarliy modify the all-functions dialog definition.
 * @overloads {DataDialogBinding#fireCommand}
 */
ViewDefinitionPostBackDataDialogBinding.prototype.fireCommand = function () {

	var label = this.getProperty("dialoglabel");
	var search = this.getProperty("providersearch");
	var key = this.getProperty("providerkey");
	var handle = this.getProperty("handle");
	var selectedToken = this.getProperty("selectedtoken");

	if (handle != null) {

		var def = ViewDefinition.clone(
			handle,
			"Generated.ViewDefinition.Handle." + KeyMaster.getUniqueKey()
		);

		/*
		* Label
		*/
		if (label != null) {
			if (def.argument == null) {
				def.argument = {};
			}
			def.argument.label = label;
		}

		/*
		* Search
		*/
		if (search != null) {
			if (def.argument == null) {
				def.argument = {};
			}
			if (def.argument.nodes == null) {
				def.argument.nodes = [];
			}
			def.argument.nodes[0].search = search;
		}

		/*
		* Key
		*/
		if (key != null) {
			if (def.argument == null) {
				def.argument = {};
			}
			if (def.argument.nodes == null) {
				def.argument.nodes = [];
			}
			def.argument.nodes[0].key = key;
		}

		/*
		* Token
		*/
		if (selectedToken != null) {
			if (def.argument == null) {
				def.argument = {};
			}
			def.argument.selectedToken = selectedToken;
		}

		/*
		* Super
		*/
		ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this, def);

	} else {
		throw "Attribute \"handle\" required.";
	}
};

/**
 * ViewDefinitionPostBackDataDialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ViewDefinitionPostBackDataDialogBinding}
 */
ViewDefinitionPostBackDataDialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:postbackdialog", ownerDocument );
	return UserInterface.registerBinding ( element, ViewDefinitionPostBackDataDialogBinding );
}