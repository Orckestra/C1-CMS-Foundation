/**
 * @class
 */
function _Installation () {
	
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_KICKSTART, this ); 
}

_Installation.prototype = {

	/** Application Name like "C1 CMS"
	* @type {string}
	*/
	applicationName: null,

    /**
    * Robot readable build version "1.2.3505.18361".
    * @type {string}
    */
    versionString: null,

    /**
    * Human readable product version "C1 CMS 1.2 SP2".
    * @type {string}
    */
    versionPrettyString: null,

    /**
    * @type {string}
    */
    installationID: null,


	/**
	* @type {string}
	*/
    passwordExpirationTimeInDays: null,

    /**
    * Constructor action: Get installation info.
    * @return {_Installation}
    */
    handleBroadcast: function (broadcast) {

        switch (broadcast) {
            case BroadcastMessages.APPLICATION_KICKSTART:
                var list = new List(InstallationService.GetInstallationInfo(true));
                list.each(function (entry) {
                	switch (entry.Key) {
                		case "ApplicationName":
                			this.applicationName = entry.Value;
                			break;
                        case "ProductVersion":
                            this.versionString = entry.Value;
                            break;
                        case "ProductTitle":
                            this.versionPrettyString = entry.Value;
                            break;
                        case "InstallationId":
                            this.installationID = entry.Value;
                            break;
                    	case "PasswordExpirationTimeInDays":
                    		this.passwordExpirationTimeInDays = entry.Value;
                    		break;
                    }
                }, this);
                break;
        }
    }
};

/*
 * Here we go.
 */
var Installation = new _Installation ();