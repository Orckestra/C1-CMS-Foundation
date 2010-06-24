BindingMappingSetBinding.prototype = new Binding;
BindingMappingSetBinding.prototype.constructor = BindingMappingSetBinding;
BindingMappingSetBinding.superclass = Binding.prototype;

/**
 * @class
 * Note that this is *not* a real binding. We contructed this file 
 * specifically to inform you of this. The markup "ui:bindingmappingset" 
 * is parsed by the DocumentManager as sort of a processing instruction 
 * directing how Bindings should be associated to elements in this window.
 * @see {DocumentManager}
 */
function BindingMappingSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BindingMappingSetBinding" );
}

/**
 * Identifies binding.
 */
BindingMappingSetBinding.prototype.toString = function () {
	
	return "[BindingMappingSetBinding]";
}