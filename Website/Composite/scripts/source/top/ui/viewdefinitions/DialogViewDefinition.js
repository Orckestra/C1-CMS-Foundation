DialogViewDefinition.prototype = new ViewDefinition;
DialogViewDefinition.prototype.constructor = HostedViewDefinition;
DialogViewDefinition.superclass = ViewDefinition.prototype;

/**
 * @class 
 * @param {object} arg Constructor argument properties maps directly into class properties.
 */
function DialogViewDefinition ( arg ) {
	
	/**
	 * Don't confuse with "handle".
	 * @type {IDialogResponseHandler}
	 */
	this.handler = null;
	
	/**
	 * The dialog default position.
	 * @type {object}
	 */
	this.position = Dialog.MODAL;
	
	/**
	 * @overwrites {ViewDefinition#label}
	 * @type {string}
	 */
	this.label = null; //DockTabBinding.LABEL_TABLOADING;
	
	/**
	 * @overwrites {ViewDefinition#image}
	 * @type {string}
	 */
	this.image = null; // DockTabBinding.IMG_TABLOADING;
	
	/**
	 * @type {int}
	 */
	this.width = null;
	
	/**
	 * @type {int}
	 */
	this.height = null;
	
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
				if ( this.handler ) {
					if ( !Interfaces.isImplemented ( IDialogResponseHandler, this.handler )) {
						throw "IDialogResponseHandler not implemented";
					}
				}
			} else {
				throw "Property not recognized: " + prop;
			}
		}
	}
}