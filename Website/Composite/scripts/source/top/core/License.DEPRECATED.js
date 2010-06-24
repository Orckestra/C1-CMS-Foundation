/**
 * @class
 */
window.License = new function () {
	
	/**
	 * @type {boolean}
	 */
	this.isRegistered = false;
	
	/**
	 * @type {boolean}
	 */
	this.isExpired = false;
	
	/**
	 * @type {string}
	 */
	this.registrationName = null;
	
	/**
	 * @type {string}
	 */
	this.registrationURL = null;
	
	/**
	 * @type {string}
	 */
	this.statusURL = null;
	
	/**
	 * Robot readable build version "1.2.3505.18361".
	 * @type {string}
	 */
	this.versionString = null;
	
	/**
	 * Human readable product version "C1 1.2 SP2".
	 * @type {string}
	 */
	this.versionPrettyString = null;
	
	/**
	 * @type {string}
	 */
	this.installationID = null;
	
	/**
	 * Refresh license. This is done at least once, on Application startup.
	 * @param {boolean} isHardUpdate This will trigger the server to discover any new lisense.
	 */
	this.refresh = function ( isHardUpdate ) {
		
		/*
		if ( isHardUpdate ) {
			LicensingService.InvokeLicenseFetch ( true );
		}
		*/
		
		this.isRegistered = true; // HARDCODED FOR NOW. WAS: LicensingService.Registered ( true );
		
		var self = this;
		new List ( InstallationService.GetLicenseInfo ( true )).each ( function ( entry ) {
			switch ( entry.Key ) {
				case "RegistrationURL" :
					self.registrationURL = entry.Value;
					break;
				case "StatusURL" :
					self.statusURL = entry.Value;
					break;
				case "ProductVersion" :
					self.versionString = entry.Value;
					break;
				case "ProductTitle" :
					self.versionPrettyString = entry.Value;
					break;
				case "RegisteredTo" :
					self.registrationName = entry.Value;
					break;
				case "Expired" :
					self.isExpired = entry.Value == "True";
					break;
				case "InstallationId" :
					self.installationID = entry.Value;
					break;
			}
		});
	};
}