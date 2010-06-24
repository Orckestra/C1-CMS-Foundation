/*
 * If Prism, clear the cache and load top.aspx - else display message to user.
 */
window.onload = function () {
	
	var agent = navigator.userAgent.toLowerCase ();
	var isPrism = agent.indexOf ( "prism" ) >-1;
	var url = "top.aspx" + document.location.search;
	
	if ( isPrism ) {
		var event = document.createEvent ( "Events" );
		event.initEvent ( "contenttochrome-clearcache", true, true );
		window.dispatchEvent ( event );
		setTimeout ( function () {
			document.location = url;
		}, 250 );
	} else {
		var link = document.getElementById ( "continuelink" );
		var splash = document.getElementById ( "splash" );
		link.href = url;
		splash.style.display = "block";
		document.oncontextmenu = function ( e ) {
			return false;
		}
	}
}