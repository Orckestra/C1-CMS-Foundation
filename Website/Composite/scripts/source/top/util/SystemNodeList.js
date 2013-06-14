/**
 * @class
 * SystemNode list
 * Save handlers
 */
function SystemNodeList() {

	this._entityTokens = new List([]);
	return this;
}

/**
* Clear nodes.
*/
SystemNodeList.prototype.clear = function () {
	this._entityTokens.clear();
};

/**
* Add node
* @param {SystenNode} node
*/
SystemNodeList.prototype.add = function (node) {
	if (node.getEntityToken) {
		var entityToken = node.getEntityToken();
		this._entityTokens.add(entityToken);
	}
};

/**
* Does list contain SystemNode?
* @param {string} key
*/
SystemNodeList.prototype.has = function (node) {
	if (node.getEntityToken) {
		var entityToken = node.getEntityToken();
		return this._entityTokens.has(entityToken);
	}
	return false;
};

/**
* Return entityTokens
*/
SystemNodeList.prototype.getEntityTokens = function () {
	return this._entityTokens.copy();
};
