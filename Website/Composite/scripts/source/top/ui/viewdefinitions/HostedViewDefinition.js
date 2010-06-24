HostedViewDefinition.prototype = new ViewDefinition;
HostedViewDefinition.prototype.constructor = HostedViewDefinition;
HostedViewDefinition.superclass = ViewDefinition.prototype;
HostedViewDefinition.POSTBACK_URL = "${root}/postback.aspx";

/**
 * @class 
 * @param {object} arg Constructor argument properties maps directly into class properties.
 */
function HostedViewDefinition ( arg ) {
	
	/**
	 * The dock default position.
	 * @type {object}
	 */
	this.position = DockBinding.MAIN;
	
	/**
	 * Associates the View to a given perspective. This property matches 
	 * the "TagValue" property of the ClientElement objects sent from server.
	 * @type {string}
	 */
	this.perspective = null;
	
	/**
	 * @overwrites {ViewDefinition#entityToken}
	 * @type {string}
	 */
	this.entityToken = null;
	
	/**
	 * @overwrites {ViewDefinition#label}
	 * @type {string}
	 */
	this.label = null;
	
	/**
	 * @overwrites {ViewDefinition#image}
	 * @type {string}
	 */
	this.image = null;
	
	/*
	 * Initialize all of the above from argument.
	 */
	if ( arg ) {
		for ( var prop in arg ) {
			if ( this [ prop ] || this.prop == null ) {
				this [ prop ] = arg [ prop ];
				if ( this.url ) {
					this.url = Resolver.resolve ( this.url );
				}
			} else {
				throw "Property not recognized: " + prop;
			}
		}
	}
}