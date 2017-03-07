/**
*@class
* @param @url {string} url.
* @constructor
*/
//TODO Add escaping
function Uri(url) {

	url = url ? url : "";
	var mediaExpr = /^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
	var result = mediaExpr.exec(url);

	if (result) {
		if (result[3] == "media") {
			this.isMedia = true;
		} else if (result[3] == "page") {
			this.isPage = true;
		}
	}
	var queryString = {};
	url.replace(/^[^\?]*/g, "").replace(
		/([^?=&]+)(=([^&]*))?/g,
		function ($0, $1, $2, $3) { queryString[$1] = $3; }
	);

	this.queryString = queryString;

	this.path = url.replace(/\?.*/g, "");

	this.isInternalUrl = url.indexOf("~/") === 0;

	return this;
}


Uri.isMedia = function(url) {
	return new Uri(url).isMedia;
};

/**
* Get media path without parameters
* @return {string}
*/
Uri.prototype.getPath = function() {
	return this.path;
};

/**
* Get media path without parameters
* @return {string}
*/
Uri.prototype.getQueryString = function () {
	return new Map(this.queryString);
};

/**
* Has param in query string?
* @param {object} key
* @return {boolean}
*/
Uri.prototype.hasParam = function(key) {
	return this.queryString[key] != null;
};

/**
* Get param in query string
* @param {object} key
* @return {boolean}
*/
Uri.prototype.getParam = function(key) {
	return this.queryString[key];
};
/**
* Set param in query string
* @param {object} key
*/
Uri.prototype.setParam = function(key, value) {
	if (value == undefined) {
		delete this.queryString[key];
	} else {
		this.queryString[key] = value;
	}
};

/**
* @return {string}
*/
Uri.prototype.toString = function () {
	var url = this.path;

	var querystring = [];
	for (var key in this.queryString) {
		querystring.push(key + "=" + this.queryString[key]);
	}

	if (querystring.length > 0)
		url += "?" + querystring.join("&");

	return url;
}