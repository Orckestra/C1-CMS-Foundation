/**
 * @class
 */
function _Installation () {
	
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_KICKSTART, this ); 
}

_Installation.prototype = {
	
	/**
	 * @type {string}
	 */
	registrationName : null,
	
	/**
	 * @type {string}
	 */
	registrationURL : null,
	
	/**
	 * @type {string}
	 */
	statusURL : null,
	
	/**
	 * Robot readable build version "1.2.3505.18361".
	 * @type {string}
	 */
	versionString : null,
	
	/**
	 * Human readable product version "C1 1.2 SP2".
	 * @type {string}
	 */
	versionPrettyString : null,
	
	/**
	 * @type {string}
	 */
	installationID : null,
	
	/**
	 * Constructor action: Get installation info.
	 * @return {_Installation}
	 */
	handleBroadcast : function ( broadcast ) {
		
		switch ( broadcast ) {
			case BroadcastMessages.APPLICATION_KICKSTART :
				var list = new List ( InstallationService.GetLicenseInfo ( true ));
				list.each ( function ( entry ) {
					switch ( entry.Key ) {
						case "RegistrationURL" :
							this.registrationURL = entry.Value;
							break;
						case "StatusURL" :
							this.statusURL = entry.Value;
							break;
						case "ProductVersion" :
							this.versionString = entry.Value;
							break;
						case "ProductTitle" :
							this.versionPrettyString = entry.Value;
							break;
						case "RegisteredTo" :
							this.registrationName = entry.Value;
							break;
						case "Expired" :
							this.isExpired = entry.Value == "True";
							break;
						case "InstallationId" :
							this.installationID = entry.Value;
							break;
					}
				}, this );
				break;
		}
	}
};

/*
 * Here we go.
 */
var Installation = new _Installation ();