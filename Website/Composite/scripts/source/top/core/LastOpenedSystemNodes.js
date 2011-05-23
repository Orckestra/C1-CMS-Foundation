/**
* @class
* Save last opened nodes.
*/
window.LastOpenedSystemNodes = new function () {

	var handles = new List([]);

	/**
	* Clear opened nodes.
	*/
	this.clear = function () {
		handles.clear();
	}

	/**
	* Add open node
	* @param {SystenNode} node
	*/

	this.add = function (node) {
		var handle = node.getHandle();
		handles.add(handle);
	}

	/**
	* Does LastOpenedNodes contain SystemNode?
	* @param {string} key
	*/
	this.isOpen = function (node) {
		var handle = node.getHandle();
		return handles.has(handle);
	}

}