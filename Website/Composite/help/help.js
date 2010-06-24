var Help = new function () {
	
	/**
	 * Initialize.
	 */
	this.initialize = function () {
		
		/*
		 * Handle navigationlists.
		 */
		var i = 0, ul, uls = document.getElementsByTagName ( "ul" );
		while ( ul = uls.item ( i++ )) {
			if ( ul.className.indexOf ( "nl" ) >-1 ) {
				navigationlist ( ul );
			}
		}
	}
	
	/**
	 * Applied to navigationlist links as event handler.
	 * @param {MouseEvent} e
	 */
	function navigationlistaction ( e ) {
		
		var isValid = true;
		e = e ? e : window.event; 
		if ( e.type == "keydown" && e.keyCode != 13 ) {
			isValid = false;
		}
		if ( isValid ) {
			var a = e.target ? e.target : e.srcElement;
			if ( a.nodeName.toLowerCase () == "a" ) {
				var ul = a.parentNode.getElementsByTagName ( "ul" ).item ( 0 );
				if ( ul ) {
					switch ( a.className ) {
						case "label" :
							a.className = "label on";
							ul.className = "on";
							break;
						case "label on" :
							a.className = "label";
							ul.className = "";
							break;
					}
				}
			}
		}
		if ( e.stopPropagation ) {
			e.stopPropagation ();
		} else {
			e.cancelBubble = true;
		}
	}
	
	/**
	 * Convert list to navigationlist.
	 * @param {HTMLUListElement}
	 */
	function navigationlist ( ul ) {
		
		ul.onmousedown = navigationlistaction;
		ul.onkeydown = navigationlistaction;
	}
	
}

/*
 * Initialize onload.
 */
window.onload = Help.initialize;