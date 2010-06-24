/**
 * @class
 * TODO: Dont use cookies! Define a functional Persistance instead.
 */
function _Cookies () {}
var Cookies = new _Cookies ();

_Cookies.prototype = {
	
	/**
	 * Create new cookie.
	 * @param {string} name
	 * @param {string} value
	 * @param {string} days
	 */
	createCookie : function ( name, value, days ) {
	
		var expires = "";
		if ( days ) {
			var date = new Date ();
			date.setTime ( date.getTime () + ( days * 24 * 60 * 60 * 1000 ));
			expires = "; expires=" + date.toGMTString ();
		}
		document.cookie = name + "=" + escape ( value ) + expires + "; path=/";
		return this.readCookie ( name );
	},
	
	/**
	 * Read existing cookie.
	 * @param {string} name
	 * @return {string}
	 */
	readCookie : function ( name ) {
	
		var result = null;
		var nameEQ = name + "=";
		var ca = document.cookie.split ( ";" );
		for( var i=0; i < ca.length; i++ ) {
			var c = ca [i];
			while ( c.charAt ( 0 )== " " ) c = c.substring ( 1, c.length );
			if ( c.indexOf ( nameEQ ) == 0 ) {
				result = unescape ( c.substring ( nameEQ.length, c.length ));
			}
		}
		return result;
	},
	
	/**
	 * No more cookie.
	 * @param {string} name
	 */
	eraseCookie : function ( name ) {
	
		this.createCookie ( name, "", -1 );
	}
}