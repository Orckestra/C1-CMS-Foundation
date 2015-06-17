AttributesUpdate.prototype = new Update();
AttributesUpdate.superclass = Update.prototype;

/**
 * @type {Element}  
 */
AttributesUpdate.prototype.currentElement = null;

/**
 * Remember: The before and after element MUST have same id for this to work.
 * @param {String} type
 * @param {String} id
 * @param {Element} element
 * @return
 */
function AttributesUpdate ( id, element, oldelement ) {
	
	this.type = type = Update.TYPE_ATTRIBUTES;
	this.id = id;
	this.element = element;
	this.currentElement = oldelement;
	this._summary = [];
	return this;
}

/**
 * Update attributes.
 */
AttributesUpdate.prototype.update = function () {
	
	var element = document.getElementById ( this.id );
	if ( this._beforeUpdate ( element )) {
		this._updateAttributes ( element );
		this._afterUpdate ( element );
	}
};

/**
 * Performs the actual attribute synchronization.
 */
AttributesUpdate.prototype._updateAttributes = function ( element ) {
	
	// add and update attributes
	Array.forEach ( this.element.attributes, function ( newatt ) {
		var oldatt = this.currentElement.getAttribute ( newatt.nodeName );
		if ( oldatt == null || oldatt != newatt.nodeValue ) {
			this._setAttribute ( element, newatt.nodeName, newatt.nodeValue );
			this._summary.push ( "@" + newatt.nodeName );
		}
	}, this );
	
	// delete attributes
	Array.forEach ( this.currentElement.attributes, function ( oldatt ) {
		if ( this.element.getAttribute ( oldatt.nodeName ) == null ) {
			this._setAttribute ( element, oldatt.nodeName, null );
			this._summary.push ( "@" + oldatt.nodeName );
		}
	}, this );
};

/**
 * Set element attribute. For Internet Explorer, this may not be as simple as it sounds. 
 * @param {Element} element
 * @param {String} name
 * @param {String} value
 * @return
 */
AttributesUpdate.prototype._setAttribute = function ( element, name, value ) {
	
	
	if ( element == null ) {
		// id_FlowUI$Document$DocumentBody$TabPanels_lazybindingactivated2
		alert ( this.id + ": " + document.getElementById ( this.id )+ "\n\n" + name + "=" + value )
		SystemLogger.getLogger ( "AttributesUpdate" ).fine ( document.body.innerHTML )
	}
	
	
	var isDel = ( value == null );
	
	if ( isDel ) {
		element.removeAttribute ( name );
	} else {
		element.setAttribute ( name, value );
	}
	
	if ( document.all != null ) { // TODO: Think of more properties on the IE handicap list?
		if ( isDel ) {
			value = "";
		}
		switch ( name.toLowerCase ()) {
			
			/*
			 * Since matching IDs is a prerequisite for this to   
			 * happen, we don't need to hack support for ID updates.
			 */
			
			case "class" :
				element.className = value;
				break;
			case "disabled" :
				element.disabled = !isDel;
				break;
			case "checked" :
				element.checked = !isDel;
				break;
			case "readonly" :
				element.readOnly = !isDel;
				break;
		}
	}
};

/**
 * @overloads {Update#_afterUpdate}
 * @param {Element} element
 */
AttributesUpdate.prototype._afterUpdate = function ( element ) {
	
	AttributesUpdate.superclass._afterUpdate.call ( this, element );
	UpdateManager.report ( "Attributes updated on element id=\"" + this.id + "\": " + this._summary.toString ());
}

/**
 * Better not keep a reference to any DOM element around here.
 * @overloads {Update#dispose}
 */
AttributesUpdate.prototype.dispose = function () {
	
	Update.prototype.dispose.call ( this );
	this.currentElement = null;
};