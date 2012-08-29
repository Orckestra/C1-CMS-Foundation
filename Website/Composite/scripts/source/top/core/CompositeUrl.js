/**
*@class
* @param @url {string} media url.
* @constructor
*/
//TODO Add escaping
function CompositeUrl(url) {

    var mediaExpr = /^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
	var result = mediaExpr.exec(url)

	if (result) {
		var queryString = {};
		url.replace(/^[^\?]*/g, "").replace(
			/([^?=&]+)(=([^&]*))?/g, 
			function ($0, $1, $2, $3) { queryString[$1] = $3; }
		);

		this.queryString = queryString;

		this.path = url.replace(/\?.*/g, "");
		if (result[3] == "media") {
			this.isMedia = true;
		} else if (result[3] == "page") {
			this.isPage = true;
		}
	}
	return this;
}


/**
* Get media path without parameters
* @return {string}
*/
CompositeUrl.prototype.getPath = function () {
	return this.path;
}

/**
* Has param in query string?
* @param {object} key
* @return {boolean}
*/
CompositeUrl.prototype.hasParam = function (key) {
	return this.queryString[key] != null;
}

/**
* Get param in query string
* @param {object} key
* @return {boolean}
*/
CompositeUrl.prototype.getParam = function (key) {
	return this.queryString[key];
}

/**
* Set param in query string
* @param {object} key
*/
CompositeUrl.prototype.setParam = function (key, value) {
	this.queryString[key] = value;
}

/**
* @return {string}
*/
CompositeUrl.prototype.toString = function () {
	var url = this.path;

	var querystring = [];
	for (var key in this.queryString) {
		querystring.push(key + "=" + this.queryString[key]);
	}

	if (querystring.length > 0)
		url += "?" + querystring.join("&");

	return url;
}