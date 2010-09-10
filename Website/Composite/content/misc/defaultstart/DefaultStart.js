/**
 * @class
 */
var DefaultStart = new function () {
	
	/**
	 * @implements {ILoadHandler}
	 */
	this.fireOnLoad = function () {
		
		var td = document.getElementById ( "versioninfo" );
		DOMUtil.setTextContent ( td, Installation.versionString );
	}
}

WindowManager.fireOnLoad ( DefaultStart );