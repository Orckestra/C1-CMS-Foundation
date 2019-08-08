TreeSelectorDialogBinding.prototype = new DataInputDialogBinding;
TreeSelectorDialogBinding.prototype.constructor = TreeSelectorDialogBinding;
TreeSelectorDialogBinding.superclass = DataInputDialogBinding.prototype;

/**
* @class
* @implements {IData}
*/
function TreeSelectorDialogBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("TreeSelectorDialogBinding");

	/**
	* @type {LabelBinding}
	*/
	this.labelBinding = null;


}

/**
* Identifies binding.
*/
TreeSelectorDialogBinding.prototype.toString = function () {

	return "[TreeSelectorDialogBinding]";
}

/**
 * Get definition to invoke.
 * @overloads {DataInputDialogBinding#getDefinition}
 */
TreeSelectorDialogBinding.prototype.getDefinition = function () {

	var definition = ViewDefinition.clone(
		"Composite.Management.TreeSelectorDialog",
		"Generated.ViewDefinition.Handle." + KeyMaster.getUniqueKey()
	);
	definition.argument.selectionProperty = this.getProperty("selection-property");
	definition.argument.selectionValue = this.getProperty("selection-value");
	definition.argument.selectionResult = this.getProperty("selection-result");
	definition.argument.nodes = [
		{
			key: this.getProperty("element-provider"),
			search: this.getProperty('serialized-search-token')
		}
	];

	return definition;
};