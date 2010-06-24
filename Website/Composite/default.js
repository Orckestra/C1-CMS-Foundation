var Composite = new function () {
	
	var isDevelop = window.location.toString ().indexOf ( "develop.aspx" ) >-1;
	
	window.onload = function () {
		
		document.onkeyup = function ( e ) {
			
			e = e ? e : window.event;
			if ( e.keyCode == 16 ) {
				window.timeout = setTimeout ( function () {
					window.location = isDevelop ? "default.aspx" : "develop.aspx";
				}, 50 );
			}
		}
	}
	
	window.onbeforeunload = function () {
		
		if ( window.timeout != null ) {
			clearTimeout ( window.timeout );
		}
	}
	
	this.start = function ( isDeveloperMode ) {
		
		var url = "top.aspx";
		if ( isDeveloperMode ) {
			url += "?mode=develop";
		}
		window.open ( url, "", "resizable=1,status=1" );
	}
}