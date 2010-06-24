/** 
 * Actually just a simple configuration which can be 
 * used to construct a real {@link ClickButtonBinding}.
 * @param {object} obj Optional constructor object
 */
function DialogButton ( obj ) {

	/**
     * The button label.
	 * @type {string}
	 */
	this.label = null;
	
	/**
     * The button image.
	 * @type {string}
	 */
	this.image = null;
	
	/**
	 * The button response. This can be anything object; although usually a string.
	 * @type {object}
	 */
	this.response = null;
	
	/**
	 * Always focusable!
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * Is default button?
	 * @type {boolean}
	 */
	this.isDefault = false;
	
	/**
	 * Is focused?
	 * @type {boolean}
	 */
	this.isFocused = false;

	/*
	 * Initialize values from constructor
	 */
	if ( obj ) {
		for ( var prop in obj ) {
			if ( typeof this [ prop ] != "undefined" ) {
				this [ prop ] = obj [ prop ];
			} 
		}
	}
}