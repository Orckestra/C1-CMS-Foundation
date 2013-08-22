/**
 * @class
 */
function _XMLParser () {}

_XMLParser.prototype = {

	_logger: SystemLogger.getLogger("XMLParser"),
	_domParser: (window.DOMParser != null && window.XPathResult != null ? new DOMParser() : null),

	/**
	* @param {string} xml
	* @param @optional {boolean} If true, ignore all parse errors.
	* @return {DOMDocument}
	*/
	parse: function (xml, isIgnore) {

		var doc = null;

		if (xml != null) {
			if (this._domParser != null) {
				try {
					doc = this._domParser.parseFromString(xml, "text/xml");
				} catch (e) {
					alert(xml)
				}
				if (doc.documentElement.namespaceURI == Constants.NS_DOMPARSEERROR) {
					if (!isIgnore) {
						this._logger.error(DOMSerializer.serialize(doc.documentElement, true));
						if (Application.isDeveloperMode) {
							alert("XMLParser failed: \n\n" + DOMSerializer.serialize(doc.documentElement, true));
						}
					}
					doc = null;
				}
			} else {
				doc = DOMUtil.getDOMDocument();
				doc.setProperty("ProhibitDTD", false);
				doc.validateOnParse = false;
				doc.async = false;
				doc.loadXML(xml);
				if (doc.parseError.errorCode != 0) {
					if (!isIgnore) {
						this._logger.error("XMLParser failed!");
						if (Application.isDeveloperMode) {
							alert("XMLParser failed!");
						}
					}
					doc = null;
				}
			}
		} else {
			throw "XMLParser: No XML input to parse!";
		}

		return doc;
	},

	/**
	* Is xml parsable as full document? Note that we allow a string  
	* with no XML declaration. This may not be the best idea... 
	* @param {string} xml
	* @param @optional {boolean} hasDialog If true, automatically show a dialog
	*/
	isWellFormedDocument: function (xml, hasDialog, isConfirmDialog) {

		var result = true;
		var dec = '<?xml version="1.0" encoding="UTF-8"?>';
		if (xml.indexOf("<?xml ") == -1) {
			xml = dec + xml;
		}
		var string = SourceValidationService.IsWellFormedDocument(xml);

		if (string != "True") {
			result = false;
			if (hasDialog == true) {
				if (isConfirmDialog) {
					if (confirm("Not well-formed\n" + string + "\nContinue?")) {
						result = true;
					}
				}else {
					this._illFormedDialog(string);
				}
			}
		}

		return result;
	},

	/**
	* Is xml parsable as full document fragment?
	* @param {string} xml
	* @param @optional {boolean} hasDialog  If true, automatically show a dialog
	*/
	isWellFormedFragment: function (xml, hasDialog) {

		var result = true;
		var string = SourceValidationService.IsWellFormedFragment(xml);

		if (string != "True") {
			result = false;
			if (hasDialog == true) {
				this._illFormedDialog(string);
			}
		}

		return result;
	},

	/**
	* In case of malformed XML, analyze server parser 
	* exception and present a clarifying dialog. 
	* @param {String} string
	*/
	_illFormedDialog: function (string) {

		/*
		* Timeout allows any previous method to returnvalue first.
		*/
		setTimeout(function () {
			Dialog.error("Not well-formed", string);
		}, 0);
	}
}

/**
 * The instance that does it.
 * @type {_XMLParser}
 */
var XMLParser = new _XMLParser ();