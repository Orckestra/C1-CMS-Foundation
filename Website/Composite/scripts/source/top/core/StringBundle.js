/**
 * @class
 */
window.StringBundle = new function () {
	
	var logger = SystemLogger.getLogger ( "StringBundle" );
	
	/*
	 * Provider shorthand.
	 */
	this.UI = "Composite.Management";
	
	/*
	 * Mapping providers.
	 * @type {HashMap<string><HashMap<string><string>>}
	 */
	var providers = {};
	
	/**
	 * Populate provider via webservice.
	 * @param {string} providername
	 * @param {HashMap} provider
	 * @param {HashMap}
	 */
	function resolve ( providername, provider ) {
		
		var list = new List (
			StringService.GetLocalisation ( providername )
		);
		if ( list.hasEntries ()) {
			list.each (
				function ( entry ) {
					provider [ entry.Key ] = entry.Value;
				}
			);
		} else {
			throw "No strings from provider: " + providername;
		}
	}
	
	/**
	 * Get string!
	 * @param {string} providername
	 * @param {string} stringkey
	 * @return {string}
	 */
	this.getString = function ( providername, stringkey ) {
		
		var result = null;
		
		if ( window.StringService != null ) {
			try {
				if ( providername == "ui" ) {
					providername = StringBundle.UI;
				}
				if ( !providers [ providername ] ) {
					var provider = providers [ providername ] = {};
					resolve ( providername, provider );
				}
				if ( providers [ providername ]) {
					result = providers [ providername ][ stringkey ]
				}
				if ( !result ) {
					throw "No such string: " + stringkey;
				}
			} catch ( exception ) {
				var cry = "StringBundle exception in string " + providername + ":" + stringkey;
				logger.error ( cry );
				if ( Application.isDeveloperMode ) {
					alert ( cry );
				}
			}
		}
		return result;
	}
}