
ContextContainer.getContextContainer = function (binding) {

	var result = null;
	if (binding.getContextContainer) {
		result = binding.getContextContainer();
	}
	if (result == null) {
		result = ContextContainer.getAncestorContextContainer(binding);
	}
	return result;
}

ContextContainer.getAncestorContextContainer = function(binding) {

	var ancestoContextContainerBinding = BindingFinder.getAncestorBindingByInterface(binding, IContextContainerBinding, true);
	if (ancestoContextContainerBinding != null) {
		var contextContainer = ancestoContextContainerBinding.getContextContainer();
		if (contextContainer == null) {
			return ContextContainer.getAncestorContextContainer(ancestoContextContainerBinding);
		} else {
			return contextContainer;
		}
	}
	return null;
}

ContextContainer.resolve = function (url, contextContainer) {

	if (typeof url != "string")
		return url;
	if (contextContainer == undefined)
		return url;
	var re = /\{context\:([^\}]+)\}/gm;
	var matches = url.match(re);
	new List(matches).each(function(match) {
		var result = /\{context\:([^\}]+)\}/gm.exec(match);;
		var property = result[1];
		url = url.replace(match, contextContainer.getProperty(property));
	});
	return url;
}


ContextContainer.CONTAINER_CLASSES = "containerClasses";

/**
 * @class
 * @param {object} data
 */
function ContextContainer () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ContextContainer" );

	/**
	 * @type {object}
	 * @private
	 */
	this._data = {};

}

/**
 * Identifies ContextContainer.
 */
ContextContainer.prototype.toString = function () {

	return "[ContextContainer]";
}


/**
 * @returns {void}
 */
ContextContainer.prototype.setProperty = function (name, value) {

	this._data[name] = value;
}


/**
 * @returns {object}
 */
ContextContainer.prototype.getProperty = function (name) {

	return this._data[name];
}

/**
 * @returns {object}
 */
ContextContainer.prototype.getData = function () {

	return this._data;
}

/**
 * @return {string}
 */
ContextContainer.prototype.getContainerClasses = function () {

	return this._data[ContextContainer.CONTAINER_CLASSES];
}

/**
 * @return {List<string>}
 */
ContextContainer.prototype.getContainerClassesList = function () {

	var containerClasses = this._data[ContextContainer.CONTAINER_CLASSES];
	if (!containerClasses)
		return new List();
	return new List(containerClasses.split(",").map(function(str) { return str.trim()}));
}

ContextContainer.prototype.getContainerClassesList = function () {

	var containerClasses = this._data[ContextContainer.CONTAINER_CLASSES];
	if (!containerClasses)
		return new List();
	return new List(containerClasses.split(",").map(function (str) { return str.trim() }));
}

ContextContainer.prototype.setContainerClasses = function (containerClasses) {

	this.setProperty(ContextContainer.CONTAINER_CLASSES, containerClasses);
	return this;
}

ContextContainer.prototype.clone = function() {
	var result = new ContextContainer();
	var contextContainer = this;
	for (var prop in contextContainer) {
		if (contextContainer.hasOwnProperty(prop)) {
			result[prop] = ViewDefinition.cloneProperty(contextContainer[prop]);
		}
	}
	return result;
}