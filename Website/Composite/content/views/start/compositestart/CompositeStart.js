/*
 * @class
 * This fellow is required around here. It provides a minimal interface 
 * for interaction with the Composite framework. Use the "start" method 
 * to start a Flash movie or whatever when the start page is shown. Use 
 * the "stop" method to stop processor-intensive stuff when page exits.
 */
var CompositeStart = new function () {
	
	/**
	 * Invoked by framework when page is shown. Do whatever you 
	 * like around here but REMEMBER to broadcast when done.
	 */
	this.start = function () {
		
		/*
		 * Notice that we import top level classes for use in this window. 
		 * Although we don't actually use this for anything...
		 */
		if ( top.Application ) {
			if ( !window.Application ) {
				top.Application.declareTopLocal ( window );
				customStartupStuff ();
			}
			EventBroadcaster.broadcast ( BroadcastMessages.COMPOSITE_START );
		}
	}
	
	/**
	 * Invoked by framework when page gets hidden. Do whatever 
	 * you like around here but REMEMBER to broadcast when done!
	 */
	this.stop = function () {
		
		if ( window.Application ) {
			EventBroadcaster.broadcast ( BroadcastMessages.COMPOSITE_STOP );
		}
	}
	
	/**
	 * Startup stuff.
	 */
	function customStartupStuff () {
		
		if ( document.getElementById ( "content" )) {
			sizeToFit ();
			window.onresize = sizeToFit;
		}
	}
	
	/**
	 * Size to fit.
	 */
	function sizeToFit () {
		
		var height = window.innerHeight ? window.innerHeight : document.body.clientHeight;
		var titlebar = document.getElementById ( "titlebar" );
		var content = document.getElementById ( "content" );
		content.style.height = ( height - titlebar.offsetHeight ) + "px";
	}
}