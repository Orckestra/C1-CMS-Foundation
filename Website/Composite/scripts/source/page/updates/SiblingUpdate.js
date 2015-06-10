SiblingUpdate.prototype = new Update ();
SiblingUpdate.superclass = Update.prototype;

/**
 * Sibling update.
 * @param {String} type
 * @param {String} id
 * @param {Element} element
 * @return
 */
function SiblingUpdate ( type, id, element, isFirst ) {
	
	this.type = type;
	this.id = id;
	this.element = element;
	this.isFirst = isFirst;
	return this;
}

/**
 * Update by either inserting or removing an element.
 */
SiblingUpdate.prototype.update = function () {
		
	var element = document.getElementById ( this.id );
	
	switch ( this.type ) {
		case Update.TYPE_REMOVE :
			this._remove ( element );
			break;		
		case Update.TYPE_INSERT :
			this._insert ( this.element, element );
			break;
	}
};

/**
 * Remove element.
 * @param {Element} element
 * @return
 */
SiblingUpdate.prototype._remove = function ( element ) {
	
	var parent = element.parentNode;
	if ( parent != null ) {
		if ( this._beforeUpdate ( element )) {
			parent.removeChild ( element );
			this._afterUpdate ( parent );
		}
	}
};

/**
 * Insert new element after existing element.
 * @param {Element} element The new (XML) element
 * @param {Element} otherelement An existing (HTML) element
 * @return
 */
SiblingUpdate.prototype._insert = function ( element, otherelement ) {
	
	var update = UpdateAssistant.toHTMLElement ( element );
	
	if ( this.isFirst ) {
		var parent = otherelement;
		if ( parent != null ) {
			if ( this._beforeUpdate ( parent )) {
				parent.insertBefore ( update, parent.firstChild );
				this._afterUpdate ( update );
			}
		}
	} else {
		var parent = otherelement.parentNode;
		if ( parent != null ) {
			if ( this._beforeUpdate ( parent )) {
				parent.insertBefore ( update, otherelement.nextSibling );
				this._afterUpdate ( update );
			}
		}
	}
};

/**
 * @param {Element} element
 */
SiblingUpdate.prototype._beforeUpdate = function ( element ) {
	
	var result = SiblingUpdate.superclass._beforeUpdate.call ( this, element );
	if ( this.type == Update.TYPE_REMOVE ) {
		UpdateManager.report ( "Removed element id=\"" + element.id + "\"" );
	}
	return result;
};

/**
 * @param {Element} element
 */
SiblingUpdate.prototype._afterUpdate = function ( element ) {
	
	var result = true;
	if ( element != null ) {
		result = SiblingUpdate.superclass._afterUpdate.call ( this, element );
		if ( this.type == Update.TYPE_INSERT ) {
			UpdateManager.report ( "Inserted element id=\"" + element.id + "\"" );
			if ( element.nodeName == "form" || element.getElementsByTagName ( "form" ).item ( 0 ) != null ) {
				UpdateManager.setupForms ();
			}
		}
	}
	return result;
};