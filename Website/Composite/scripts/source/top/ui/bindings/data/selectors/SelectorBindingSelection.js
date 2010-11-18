/**
 * @class
 * This is *not* a binding! It is simply an object that 
 * can be fed to a SelectorBinding in order to populate it.
 * @implements {IData}
 * @param {string} label
 * @param {object} value
 * @param {boolean} isSelected
 * @param {ImageProfile} imageProfile
 */ 
function SelectorBindingSelection ( label, value, isSelected, imageProfile, tooltip ) {
	
	this._init ( label, value, isSelected, imageProfile, tooltip );
}

SelectorBindingSelection.prototype = {
	
	/**
	 * The visible label on the selection.
	 * @type {string}
	 */
	label : null,
	
	/**
	 * Value is stored internally as a string. You can extract the typecasted value, 
	 * dependant on the selectors type property, by using the getResult method.
	 * @see {SelectorBinding#getResult}
	 * @type {string}
	 */
	value : null,
	
	/**
	 * @type {String}
	 */
	tooltip : null,
	
	/**
	 * If set to true, the selection will be selected.
	 * @type {boolean}
	 */
	isSelected : null,
	
	/**
	 * Das image profile.
	 * @type {ImageProfile}
	 */
	imageProfile : null,
	
	/**
	 * This property is set by the SelectorBinding when selection is resolved.
	 * @type {MenuItemBinding}
	 */
	menuItemBinding : null,
	
	/**
	 * Initialize all of the above.
	 * @param {string} label
	 * @param {object} value
	 * @param {boolean} isSelected
	 * @param {ImageProfile} imageProfile
	 * @param {String} tooltip
	 */
	_init : function ( label, value, isSelected, imageProfile, tooltip ) {
		
		if ( label != null ) {
			this.label = String ( label );
		}
		if ( value != null ) {
			this.value = String ( value );
		}
		if ( imageProfile != null ) {
			this.imageProfile = imageProfile;
		}
		if ( tooltip != null ) {
			this.tooltip = tooltip;
		}
		this.isSelected = isSelected ? true : false;
	}
}