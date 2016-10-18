/**
 * @class
 * Don't instantiate this class manually. Access through 
 * instance variable "Client" declared below. This 
 * instance should be considered a singleton class.
 */
function _Client () {
	
	var agent = navigator.userAgent.toLowerCase ();
	var platform = navigator.platform.toLowerCase ();

	var isExplorer = navigator.appName == "Microsoft Internet Explorer"; // IE<=10 OR IE11
	var isMozilla = !isExplorer && typeof document.createTreeWalker != "undefined" ;
	var isPrism = isMozilla && ( agent.indexOf ( "webrunner" ) >-1 || agent.indexOf ( "prism" ) >-1 );
	var hasTransitions = history.pushState != null;

	this.isMozilla = isMozilla;
	this.isFirefox = agent.indexOf("firefox") > -1;
	this.isWebKit = agent.indexOf("webkit") > -1;
	this.isPerformanceTest = agent.indexOf("performance") > -1;
	this.isExplorer = isExplorer;
	this.isExplorer6 = this.isExplorer && ( agent.indexOf ( "msie 6.0" ) > -1 || agent.indexOf ( "msie 6.1" ) > -1 );
	this.isExplorer8 = this.isExplorer && window.XDomainRequest != null;
	this.isExplorer11 = !!navigator.userAgent.match(/Trident\/7\./);
	this.isEdge = !!navigator.userAgent.match(/Edge\/\d+/g);
	this.isAnyExplorer = this.isExplorer || this.isExplorer11 || this.isEdge;
	this.isPrism = isPrism;
	this.isWindows = platform.indexOf ( "win" ) > -1;
	this.isVista = this.isWindows && agent.indexOf("windows nt 6") > -1;
	this.isMac = platform.indexOf("mac") > -1;
	this.isPad = navigator.userAgent.match(/iPad/i) != null;
	this.isOS7 = navigator.userAgent.match(/CPU.*OS 7_\d/i) != null;
	
	var version = this._getFlashVersion ();
	this.hasFlash = ( version && version >= 9 );
	this.hasTransitions = hasTransitions;

	this.canvas = !!document.createElement('canvas').getContext;

	this.hasSpellcheck = true;
	this.hasXSLTProcessor = this.isMozilla && !this.isExplorer11;

	return this;
}
/*
 * Public fields.
 */
_Client.prototype = {

	/** 
	* Is Internet Explorer?
	* @type {boolean} 
	*/
	isExplorer: false,

	/**
	* Is Gecko derivate? 
	* @type {boolean} 
	*/
	isMozilla: false,

	/** 
	* True for Mozilla Prism.
	* @type {boolean} 
	*/
	isPrism: false,

	/**
	* Has Flash version 10 minimum? 
	* @type {boolean} 
	*/
	hasFlash: false,

	/**
	* Is Microsoft Windows? Macintosh and Linux 
	* distros uniformely treated as not-Windows.
	* @type {boolean}
	*/
	isWindows: false,

	/**
	* Is Vista or Windows 7? As opposed to Windows XP.
	* @type {boolean}
	*/
	isVista: false,

	/**
	* Supports CSS transitions?
	* @type {boolean}
	*/
	hasTransitions: false,

	/**
	* Get Flash version.
	* @return {int}
	*/
	_getFlashVersion: function () {

		var result = null;
		var maxversion = 10; // maximum version tested for

		// detect flash version
		try {
			if (this.isMozilla == true) {
				if (typeof navigator.plugins["Shockwave Flash"] != "undefined") {
					var plugin = navigator.plugins["Shockwave Flash"];
					if (plugin) {
						var desc = plugin.description;
						if (desc != null) {
							result = desc.charAt(desc.indexOf(".") - 1);
						}
					}
				}
			} else {
				for (var i = 2; i <= maxversion; i++) {
					try {
						new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
						result = i;
					} catch (exception) {
						continue;
					}
				}
			}
		}
		catch (exception) { };
		return result;
	},

	/**
	* Client qualified for the awesome Orckestra CMS experience?
	* @return {boolean}
	*/
	qualifies: function () {

		var result = true;
		var isOldFox = false;
		if (this.isMozilla && !this.isWebKit && !this.isExplorer11) {
			isOldFox = (document.documentElement.mozMatchesSelector === undefined);
		}
		if (window.opera != null || isOldFox || this.isExplorer && !this.canvas) {
			result = false;
		}
		return result;
	},

	fixUI: function (html) {
		if (Client.isExplorer) {
			html = html.replace(/<ui:/g, "<").replace(/<\/ui:/g, "</");
			html = html.replace(/(<(\w+)[^>]*)\/>/g, "$1></$2>");
		}
		return html;
	}
}

/**
 * The instance that does it.
 * @type {_Client}
 */
var Client = new _Client ();
