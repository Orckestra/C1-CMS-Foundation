ResolverContainerBinding.prototype = new Binding;
ResolverContainerBinding.prototype.constructor = ResolverContainerBinding;
ResolverContainerBinding.superclass = Binding.prototype;

/**
 * QA Staff
 * @class
 */
function ResolverContainerBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("ResolverContainerBinding");

	return this;
}

/**
 * Identifies binding.
 */
ResolverContainerBinding.prototype.toString = function () {

	return "[ResolverContainerBinding]";
}

/** 
 * @overloads {Bindong#onBindingAttach}
 */
ResolverContainerBinding.prototype.onBindingAttach = function () {

	ResolverContainerBinding.superclass.onBindingAttach.call(this);

	new List(this.bindingElement.attributes).each(function (attribute) {
		if (attribute.name.startsWith("data-")) {
			var elements = this.bindingDocument.getElementsByName(attribute.value);
			new List(elements).each(function (element) {
				element.setAttribute("data-qa", attribute.name.substring("data-".length));
			})
		}
	}, this);

}