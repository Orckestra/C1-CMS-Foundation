/**
 * Assist the WindowManager in evaluation of the DOMContentLoaded event in  
 * Internet Explorer. This script is loaded with "defer" attribute, you see.
 */
new function WindowAssistant () {
	
	/*
	 * TODO: Will IE9 support DOMContentLoaded event?
	 */
	if ( Client.isExplorer ) {
		WindowManager.onDOMContentLoaded ();
	}
};
