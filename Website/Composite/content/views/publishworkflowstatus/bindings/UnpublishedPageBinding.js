UnpublishedPageBinding.prototype = new PageBinding;
UnpublishedPageBinding.prototype.constructor = UnpublishedPageBinding;
UnpublishedPageBinding.superclass = PageBinding.prototype;

UnpublishedPageBinding.ACTION_CHECK_ALL = "unpublished check all";

/**
 * @class
 */
function UnpublishedPageBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("UnpublishedPageBinding");

	this.tablebody = null;

	this.actionGroup = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
UnpublishedPageBinding.prototype.toString = function () {

	return "[UnpublishedPageBinding]";
}

/**
 * Note that the binding is *invisible* when created!
 * @see {UnpublishedPageBinding#newInstance}
 * @overloads {Binding#onBindintAttach}
 */
UnpublishedPageBinding.prototype.onBindingAttach = function () {

	UnpublishedPageBinding.superclass.onBindingAttach.call(this);

	this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
	this.addActionListener(ButtonBinding.ACTION_COMMAND);
	this.addActionListener(UnpublishedPageBinding.ACTION_CHECK_ALL);

	this.addEventListener(DOMEvents.DOUBLECLICK);


	this.tablebody = this.bindingWindow.bindingMap.tablebody;
	this.actionGroup = this.bindingWindow.bindingMap.actiongroup;

	TreeService.GetUnpublishedElements(true, (function (response) {
		var nodes = new List();
		new List(response).each(function (element) {
			var newnode = new SystemNode(element);
			nodes.add(newnode);
		});
		this.renderActions(nodes);
		this.renderTable(nodes);
	}).bind(this));
}

UnpublishedPageBinding.prototype.renderActions = function (nodes) {

	var actions = new Map();
	nodes.each(function (node) {
		this.getWorkflowActions(node).each(function (action) {
			if (!actions.has(action.getHandle())) {
				actions.set(action.getHandle(), action);
			}
		});

	}, this);

	actions.each(function (key, action) {

		var buttonBinding = SystemToolBarBinding.prototype.getToolBarButtonBinding.call(this, action);
		buttonBinding.disable();
		this.actionGroup.add(buttonBinding);
	}, this);

	this.actionGroup.attachRecursive();
}


UnpublishedPageBinding.prototype.updateActions = function () {

	var actionButtons = this.actionGroup.getDescendantBindingsByType(ToolBarButtonBinding);
	var selected = this.getSelectedCheckboxes();
	var requiredActionKeys = new Map();

	selected.each(function (check) {
		var node = check.associatedNode;
		this.getAllowedActionKeys(node).each(function (key) {
			requiredActionKeys.set(key, requiredActionKeys.has(key) ? requiredActionKeys.get(key) + 1 : 1);
		}, this);
	}, this);

	actionButtons.each(function (actionButton) {
		var action = actionButton.associatedSystemAction;
		if (action) {
			var key = action.getHandle();
			if (requiredActionKeys.has(key) && requiredActionKeys.get(key) === selected.getLength()) {
				actionButton.enable();
			} else {
				actionButton.disable();
			}
		}
	}, this);
}

UnpublishedPageBinding.prototype.renderTable = function (nodes) {

	nodes.each(function (node) {
		var row = this.bindingDocument.createElement('tr');
		this.tablebody.bindingElement.appendChild(row);

		var cell = this.bindingDocument.createElement("td");
		var checkbox = CheckBoxBinding.newInstance(this.bindingDocument);
		cell.appendChild(checkbox.bindingElement);
		checkbox.attach();
		checkbox.associatedNode = node;
		row.appendChild(cell);

		row.setAttribute("entitytoken", node.getEntityToken());

		var linkcell = this.addTextCell(row);
		var link = this.bindingDocument.createElement("a");
		link.appendChild(this.bindingDocument.createTextNode(node.getLabel()));
		link.onclick = function () {
			var entityToken = row.getAttribute("entitytoken");
			StageBinding.selectBrowserTab();
			EventBroadcaster.broadcast(
				BroadcastMessages.SYSTEMTREEBINDING_FOCUS,
				entityToken
			);
		}
		linkcell.appendChild(link);

		this.addTextCell(row, node.getPropertyBag().Version);
		this.addTextCell(row, node.getPropertyBag().Status);
		this.addTextCell(row, node.getPropertyBag().Type);
		this.addTextCell(row, node.getPropertyBag().Created).setAttribute("data-sort-value", node.getPropertyBag().SortableCreated);
		this.addTextCell(row, node.getPropertyBag().Modified).setAttribute("data-sort-value", node.getPropertyBag().SortableModified);
		this.addTextCell(row, "");

	}, this);
}

UnpublishedPageBinding.prototype.getWorkflowActions = function (node) {

	var result = new List();
	node.getActionProfile().each(function (group, list) {
		list.each(function (action) {
			if (action.getGroupName() === "Workflow") {
				result.add(action);
			}
		}, this);
	}, this);
	return result;
}

UnpublishedPageBinding.prototype.getAllowedActionKeys = function (node) {

	var result = new List();
	this.getWorkflowActions(node).each(function (action) {
		if (!action.isDisabled()) {
			result.add(action.getHandle());
		}
	}, this);
	return result;
}

UnpublishedPageBinding.prototype.getSelectedCheckboxes = function() {

	var selected = new List();
	this.tablebody.getDescendantBindingsByType(CheckBoxBinding).each(function(checkbox) {
		if (checkbox.associatedNode && checkbox.isChecked) {
			selected.add(checkbox);
		}
	}, this);
	return selected;
}

UnpublishedPageBinding.prototype.addTextCell = function (row, value) {

	var cell = this.bindingDocument.createElement("td");
	if (value != undefined) {
		cell.appendChild(this.bindingDocument.createTextNode(value));
	}
	return row.appendChild(cell);
}

/**
 * @overloads {Binding#onBindingDispose}
 */
UnpublishedPageBinding.prototype.onBindingDispose = function () {

	UnpublishedPageBinding.superclass.onBindingDispose.call(this);
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
UnpublishedPageBinding.prototype.handleAction = function (action) {

	UnpublishedPageBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		case CheckBoxBinding.ACTION_COMMAND:

			var checkbox = action.target;
			var node = checkbox.associatedNode;
			if (node instanceof SystemNode) {
				this.updateActions();

				//Update 'check all' button
				if (!checkbox.isChecked || this.tablebody.getDescendantBindingsByType(CheckBoxBinding).toArray().filter(function(item) {
					return item.associatedNode && !item.isChecked;
				}).length === 0) {
					this.bindingWindow.bindingMap.checkallbox.setChecked(checkbox.isChecked, true);
				}
			}
			action.consume();
			break;

		case ButtonBinding.ACTION_COMMAND:

			var button = action.target;
			this._handleSystemAction(button.associatedSystemAction);
			break;

		case UnpublishedPageBinding.ACTION_CHECK_ALL:

			this.tablebody.getDescendantBindingsByType(CheckBoxBinding).each(function (checkbox) {
				if (checkbox.associatedNode) {
					checkbox.setChecked(binding.isChecked, true);
				}
			}, this);

			this.updateActions();

			action.consume();
			break;
	}
}

/**
 * Handle system-action.
 * @param (SystemAction} action
 */
UnpublishedPageBinding.prototype._handleSystemAction = function (action) {

	if (action != null) {

		this.getSelectedCheckboxes().each(function (check) {
			var node = check.associatedNode;
			var allowedActionKeys = this.getAllowedActionKeys(node);
			if (allowedActionKeys.has(action.getHandle())) {
				SystemAction.invoke(action, node);
			}
		}, this);

		window.location.reload();
	}
}