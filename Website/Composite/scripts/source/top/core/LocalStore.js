/*
 * TEMP!
 */
var LocalStore = new function () {
	
	
	this.isInitialized = true;	
	this.isEnabled = false;
	
	/*
	 *Save last opened nodes.
	 */
	this.openedNodes = new SystemNodeList();

	/*
	 * Save last focused nodes.
	 */
	this.focuseNodes = new SystemNodeList();
	
}