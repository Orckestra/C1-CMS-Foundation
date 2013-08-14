/**
 * @class
 * Don't instantiate this class manually. Access through 
 * instance variable "Constants" declared below. This 
 * instance should be considered a singleton class.
 */
function _Constants () {}

/*
 * Don't use these variables. They will 
 * be nulled by the end of this file.
 */
var temppath = document.location.pathname;
var temproot = temppath.substring ( 0, temppath.lastIndexOf ( "/" ));

/*
 * Public fields.
 */
_Constants.prototype = {
		
	COMPOSITE_HOME				: "http://www.composite.net",
	DUMMY_LINK					: "javascript:void(false);",
	
	APPROOT     				: temproot,
	WEBSITEROOT					: temproot.substring(0, temproot.length - 9),
	CONFIGROOT					: temproot.substring(0, temproot.length - 9) + "Frontend/Config/VisualEditor/",
	TEMPLATESROOT     			: temproot + "/templates",
	SKINROOT     				: temproot + "/skins/system", // TODO: unhardcode this!
	TINYROOT					: temproot + "/content/misc/editors/visualeditor/tinymce",

	/*
	 * Web service desciptions.
	 */
	URL_WSDL_SETUPSERVICE		: temproot + "/services/Setup/SetupService.asmx?WSDL",
	URL_WSDL_CONFIGURATION		: temproot + "/services/Configuration/ConfigurationService.asmx?WSDL", 
	URL_WSDL_LOGINSERVICE		: temproot + "/services/Login/Login.asmx?WSDL",
	URL_WSDL_INSTALLSERVICE		: temproot + "/services/Installation/InstallationService.asmx?WSDL",
	URL_WSDL_MESSAGEQUEUE 		: temproot + "/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",
	URL_WSDL_EDITORCONFIG 		: temproot + "/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",
	URL_WSDL_FLOWCONTROLLER		: temproot + "/services/FlowController/FlowControllerServices.asmx?WSDL",
	URL_WSDL_STRINGSERVICE 		: temproot + "/services/StringResource/StringService.asmx?WSDL",
	URL_WSDL_TREESERVICE  		: temproot + "/services/Tree/TreeServices.asmx?WSDL",
	URL_WSDL_XHTMLTRANSFORM		: temproot + "/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",
	URL_WSDL_FUNCTIONSERVICE	: temproot + "/services/WysiwygEditor/FunctionService.asmx?WSDL",
	URL_WSDL_SECURITYSERVICE	: temproot + "/services/Tree/SecurityServices.asmx?WSDL",
	URL_WSDL_READYSERVICE		: temproot + "/services/Ready/ReadyService.asmx?WSDL",
	URL_WSDL_LOCALIZATION		: temproot + "/services/Localization/LocalizationService.asmx?WSDL",
	URL_WSDL_SOURCEVALIDATION	: temproot + "/services/SourceEditor/SourceValidationService.asmx?WSDL",
	URL_WSDL_MARKUPFORMAT		: temproot + "/services/SourceEditor/MarkupFormatService.asmx?WSDL",
	URL_WSDL_SEOSERVICE			: temproot + "/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",
	URL_WSDL_PAGESERVICE		: temproot + "/services/Page/PageService.asmx?WSDL",
	URL_WSDL_DIFFSERVICE		: temproot + "/services/StringResource/DiffService.asmx?WSDL",
	
	/*
	 * Namespaces.
	 */ 
	NS_XHTML					: "http://www.w3.org/1999/xhtml",
	NS_UI						: "http://www.w3.org/1999/xhtml",
	NX_XUL						: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
	NS_XBL						: "http://www.mozilla.org/xbl",
	NS_WSDL						: "http://schemas.xmlsoap.org/wsdl/",
	NS_SOAP						: "http://schemas.xmlsoap.org/wsdl/soap/",
	NS_ENVELOPE					: "http://schemas.xmlsoap.org/soap/envelope/",
	NS_ENCODING					: "http://schemas.xmlsoap.org/soap/encoding/",
	NS_SCHEMA					: "http://www.w3.org/2001/XMLSchema",
	NS_SCHEMA_INSTANCE			: "http://www.w3.org/1999/XMLSchema-instance",
	NS_DOMPARSEERROR			: "http://www.mozilla.org/newlayout/xml/parsererror.xml",
	NS_NS						: "http://www.w3.org/2000/xmlns/",
	NS_PERSISTANCE				: "http://www.composite.net/ns/localstore/persistance",
	NS_FUNCTION					: "http://www.composite.net/ns/function/1.0",
	
	/*
	 * Estimates the size of a scrollbar on various systems, platforms and settings.
	 * The estimate is considered correct within a factor of plus/minus 19 pixels.
	 */
	SCROLLBAR_DIMENSION_HARDCODED_VALUE : 19
}

/**
 * The instance that does it.
 * @type {_Constants}
 */
var Constants = new _Constants ();

/*
 * Cleaning up the global scope.
 */
temppath = null;
temproot = null;