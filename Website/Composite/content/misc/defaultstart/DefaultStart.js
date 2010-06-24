/**
 * @class
 */
var DefaultStart = new function () {
	
	/**
	 * @implements {ILoadHandler}
	 */
	this.fireOnLoad = function () {
		
		var td1 = document.getElementById ( "versioninfo" );
		var td2 = document.getElementById ( "licenseinfo" );
		
		DOMUtil.setTextContent ( td1, Installation.versionString );
		DOMUtil.setTextContent ( td2, Installation.registrationName );
	}
}

WindowManager.fireOnLoad ( DefaultStart );