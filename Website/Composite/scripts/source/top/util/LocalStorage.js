/**
 * Local Storage Util
 */
function _LocalStorage() { }

_LocalStorage.prototype = {

	set: function (key, data) {
		if (!window.localStorage || !window.JSON || !key) {
			return;
		}
		localStorage.setItem(key, JSON.stringify(data));
	},

	get: function (key) {
		if (!window.localStorage || !window.JSON || !key) {
			return undefined;
		}
		var item = localStorage.getItem(key);

		if (!item) {
			return undefined;
		}
		return JSON.parse(item);
	},

	remove: function (key) {
		if (!window.localStorage || !window.JSON || !key) {
			return;
		}
		localStorage.removeItem(key);
	},

	//Obsolute
	store_data: function(data, key) { this.set(key, data) },
	//Obsolute
	get_data: function (key) { return this.get(key)},
	//Obsolute
	remove_data: function(key) { this.remove(key)}

}

/**
 * The instance that does it.
 * @type {_LocalStorge}
 */
var LocalStorage = new _LocalStorage();