SortButtonBinding.prototype = new ButtonBinding;
SortButtonBinding.prototype.constructor = SortButtonBinding;
SortButtonBinding.superclass = ButtonBinding.prototype;

SortButtonBinding.DIRECTION_ASC = "asc";
SortButtonBinding.DIRECTION_DESC = "desc";



SortButtonBinding.ascDirection = function (a, b) {

	if (a.sortvalue > b.sortvalue) {
		return 1;
	}
	if (a.sortvalue < b.sortvalue) {
		return -1;
	}
	return 0;
}


SortButtonBinding.descDirection = function (a, b) {

	if (a.sortvalue < b.sortvalue) {
		return 1;
	}
	if (a.sortvalue > b.sortvalue) {
		return -1;
	}
	return 0;
}

/**
 * @class
 */
function SortButtonBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("SortButtonBinding");

	this.table = null;

	this.tablebody = null;
}

/**
 * Identifies binding.
 */
SortButtonBinding.prototype.toString = function () {

	return "[SortButtonBinding]";
}

/**
 * Overloads {ButtonBinding#onBindingRegister}
 */
SortButtonBinding.prototype.onBindingRegister = function () {

	SortButtonBinding.superclass.onBindingRegister.call(this);

	this.table = DOMUtil.getAncestorByLocalName("table", this.bindingElement);
	this.tablebody = this.table.querySelector("tbody");

	this.attachClassName("sortbutton");
}

/**
 * Overloads {ButtonBinding#fireCommand}
 */
SortButtonBinding.prototype.fireCommand = function () {

	var direction = this.getProperty("direction") === SortButtonBinding.DIRECTION_ASC ? SortButtonBinding.DIRECTION_DESC : SortButtonBinding.DIRECTION_ASC;
	new List(this.table.querySelectorAll(".sortbutton[direction]")).each(function (sortbutton) {
		sortbutton.removeAttribute("direction");
	});

	this.sort(direction);
}

SortButtonBinding.prototype.getDirection = function() {

	return this.getProperty("direction");
}

SortButtonBinding.prototype.sort = function (direction) {

	this.setProperty("direction", direction);

	var cell = DOMUtil.getAncestorByLocalName("th", this.bindingElement);
	var cellIndex = cell.cellIndex;

	var items = [];

	new List(this.tablebody.querySelectorAll("tr")).each(function (row) {
		var sortcell = row.querySelector("td:nth-of-type(" + (cellIndex + 1) + ")");
		var sortvalue = this.getSortValue(sortcell);
		items.push({ row: row, sortvalue: sortvalue });
	}, this);

	items.sort(direction === SortButtonBinding.DIRECTION_ASC ? SortButtonBinding.ascDirection : SortButtonBinding.descDirection);

	new List(items).each(function (item) {
		this.tablebody.appendChild(item.row);
	}, this);

	/*
	 * Force new indexation of focusable elements.
	 */
	this.dispatchAction(FocusBinding.ACTION_UPDATE);
}

SortButtonBinding.prototype.getSortValue = function (cell) {

	if (cell == null) {
		return undefined;
	}
	if (cell.hasAttribute("data-sort-value")) {
		return cell.getAttribute("data-sort-value");
	}
	return cell.textContent;
}