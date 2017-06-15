RowContainerBinding.prototype = new Binding;
RowContainerBinding.prototype.constructor = RowContainerBinding;
RowContainerBinding.superclass = Binding.prototype;

/**
 * @class
 * RowContainerBinding.
 * @param {DOMElement} bindingElement
 */
function RowContainerBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("RowContainerBinding");

	/*
	 * Return this.
	 */
	return this;
}

/**
 * Identifies binding.
 */
RowContainerBinding.prototype.toString = function () {

	return "[RowContainerBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
RowContainerBinding.prototype.onBindingRegister = function () {

	RowContainerBinding.superclass.onBindingRegister.call(this);
}

/**
 * Overloads {Binding#onBindingAttach}
 */
RowContainerBinding.prototype.onBindingAttach = function () {

	RowContainerBinding.superclass.onBindingAttach.call(this);

	var row, rows = new List(this.bindingElement.rows);
	while (rows.hasNext()) {
		row = rows.getNext();
		DOMEvents.addEventListener(row, DOMEvents.MOUSEENTER, this);
		DOMEvents.addEventListener(row, DOMEvents.MOUSELEAVE, this);
	}

}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
RowContainerBinding.prototype.handleEvent = function (e) {

	RowContainerBinding.superclass.handleEvent.call(this, e);

	var target = e.currentTarget ? e.currentTarget : DOMEvents.getTarget(e);

	switch (e.type) {
		case DOMEvents.MOUSEENTER:
		case DOMEvents.MOUSEOVER:
			var row, rows = new List(this.bindingElement.rows);
			while (rows.hasNext()) {
				row = rows.getNext();
				CSSUtil.detachClassName(row, "hilite");
			}
			CSSUtil.attachClassName(target, "hilite");
			break;

		case DOMEvents.MOUSELEAVE:
		case DOMEvents.MOUSEOUT:
			CSSUtil.detachClassName(target, "hilite");
			break;
	}
}