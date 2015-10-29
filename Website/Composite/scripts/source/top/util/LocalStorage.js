/**
 * Local Storage Util
 */
function _LocalStorage() { }

_LocalStorage.prototype = {

	store_data: function (data, key) {
		if (!window.localStorage || !window.JSON || !key) {
			return;
		}
		localStorage.setItem(key, JSON.stringify(data));
	},

	get_data: function (key) {
		if (!window.localStorage || !window.JSON || !key) {
			return;
		}
		var item = localStorage.getItem(key);

		if (!item) {
			return;
		}
		return JSON.parse(item);
	},

	remove_data: function (key) {
		if (!window.localStorage || !window.JSON || !key) {
			return;
		}
		localStorage.removeItem(key);
	}

}

/**
 * The instance that does it.
 * @type {_LocalStorge}
 */
var LocalStorage = new _LocalStorage();