ReplaceUpdate.prototype = new Update ();
ReplaceUpdate.superclass = Update.prototype;

/**
 * Simple update.
 * @param {String} id
 * @param {Element} element
 */
function ReplaceUpdate ( id, element ) {
	
	this.type = Update.TYPE_REPLACE;
	this.id = id;
	this.element = element;
	return this;
}

/**
 * Replace current element with new element.
 */
ReplaceUpdate.prototype.update = function () {

	var target, container, update = UpdateAssistant.toHTMLElement(this.element);

	if ((target = document.getElementById(this.id)) != null) {
		if ((container = target.parentNode) != null) {
			var targetbinding = UserInterface.getBinding(target);
			if (targetbinding != null) {
				update.__isAttached = targetbinding.isAttached;
			}
			if (this._beforeUpdate(target)) {
				container.replaceChild(update, target);
				this._afterUpdate(update);
			}
		}
	} else {
		UpdateManager.error("Element null point: " + this.id);
	}
};

/**
 * @param {Element} element
 * @return {boolean}
 */
ReplaceUpdate.prototype._afterUpdate = function ( element ) {
	
	var result = ReplaceUpdate.superclass._afterUpdate.call ( this, element );
	UpdateManager.report ( "Replaced element id=\"" + this.id + "\"" );
	if ( element.nodeName == "form" || element.getElementsByTagName ( "form" ).item ( 0 ) != null ) {
		UpdateManager.setupForms ();
	}
	return result;
}