/**
*@class
* @param @url {string} media url.
* @constructor
*/
//TODO Add escaping
function MediaUrl(url) {

    var mediaExpr = /^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)media(\(|%28)[\w\d-\:]+(\)|%29)/;

	if (mediaExpr.test(url)) {
		var queryString = {};
		url.replace(/^[^\?]*/g, "").replace(
			/([^?=&]+)(=([^&]*))?/g, 
			function ($0, $1, $2, $3) { queryString[$1] = $3; }
		);

		this.queryString = queryString;

		this.path = url.replace(/\?.*/g, "");
		this.isMedia = true;

	}
	return this;
}


/**
* Get media path without parameters
* @return {string}
*/
MediaUrl.prototype.getPath = function () {
	return this.path;
}

/**
* Has param in query string?
* @param {object} key
* @return {boolean}
*/
MediaUrl.prototype.hasParam = function (key) {
	return this.queryString[key] != null;
}

/**
* Get param in query string
* @param {object} key
* @return {boolean}
*/
MediaUrl.prototype.getParam = function (key) {
	return this.queryString[key];
}

/**
* Set param in query string
* @param {object} key
*/
MediaUrl.prototype.setParam = function (key, value) {
	this.queryString[key] = value;
}

/**
* @return {string}
*/
MediaUrl.prototype.toString = function () {
	var url = this.path;

	var querystring = [];
	for (var key in this.queryString) {
		querystring.push(key + "=" + this.queryString[key]);
	}

	if (querystring.length > 0)
		url += "?" + querystring.join("&");

	return url;
}