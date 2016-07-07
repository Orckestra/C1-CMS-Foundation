UnpublishedPageBinding.prototype = new PageBinding;
UnpublishedPageBinding.prototype.constructor = UnpublishedPageBinding;
UnpublishedPageBinding.superclass = PageBinding.prototype;

UnpublishedPageBinding.ACTION_CHECK_ALL = "unpublished check all";

UnpublishedPageBinding.SELECTED_CLASSNAME = "selected";
UnpublishedPageBinding.NOVERSION_CLASSNAME = "noversion";

UnpublishedPageBinding.BULK_PUBLISHING_COMMANDS = "BulkPublishingCommands";

/**
 * @class
 */
function UnpublishedPageBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("UnpublishedPageBinding");


	this.table = null;

	this.tablebody = null;

	this.actionGroup = null;

	this.containingViewBinding = null;

	this.isSelectedTab = false;

	this.isRequireRefresh = false;

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

	this.subscribe(BroadcastMessages.DOCKTABBINDING_SELECT);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);

	this.tablebody = this.bindingWindow.bindingMap.tablebody;
	this.table = DOMUtil.getAncestorByLocalName("table", this.tablebody.bindingElement);
	this.table.style.display = "none";

	this.actionGroup = this.bindingWindow.bindingMap.actiongroup;

	this.containingViewBinding = this.getAncestorBindingByType(ViewBinding, true);
	this.isSelectedTab = true;

	this.refresh();
}

UnpublishedPageBinding.prototype.renderActions = function (nodes) {

	this.actionGroup.empty();

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

UnpublishedPageBinding.prototype.renderTable = function (nodes, selected) {

	while (this.tablebody.bindingElement.firstChild) {
		this.tablebody.bindingElement.removeChild(this.tablebody.bindingElement.firstChild);
	}

	var hasVersion = false;
	nodes.each(function(node) {
		if (node.getPropertyBag().Version != undefined) {
			hasVersion = true;
		}
		return hasVersion;
	}, this);

	if (hasVersion) {
		CSSUtil.detachClassName(this.table, UnpublishedPageBinding.NOVERSION_CLASSNAME);
	} else {
		CSSUtil.attachClassName(this.table, UnpublishedPageBinding.NOVERSION_CLASSNAME);
	}
	this.table.style.display = "";

	nodes.each(function (node) {
		var handle = node.getHandle();
		var row = this.bindingDocument.createElement('tr');
		this.tablebody.bindingElement.appendChild(row);

		var cell = this.bindingDocument.createElement("td");
		var checkbox = CheckBoxBinding.newInstance(this.bindingDocument);
		if (selected.has(handle)) {
			checkbox.check(true);
			CSSUtil.attachClassName(row, UnpublishedPageBinding.SELECTED_CLASSNAME);
		}
		cell.appendChild(checkbox.bindingElement);
		checkbox.attach();
		checkbox.associatedNode = node;
		row.appendChild(cell);

		row.setAttribute("entitytoken", node.getEntityToken());

		var linkcell = this.addTextCell(row);
		var link = this.bindingDocument.createElement("a");
		link.appendChild(this.bindingDocument.createTextNode(node.getLabel()));
		link.onclick = function (e) {
			DOMEvents.preventDefault(e);
			DOMEvents.stopPropagation(e);
			var entityToken = row.getAttribute("entitytoken");
			StageBinding.selectBrowserTab();
			EventBroadcaster.broadcast(
				BroadcastMessages.SYSTEMTREEBINDING_FOCUS,
				entityToken
			);
		}
		linkcell.appendChild(link);

		this.addTextCell(row, node.getPropertyBag().Version,
			{
				"class": "version"
			});
		this.addTextCell(row, node.getPropertyBag().Status);
		this.addTextCell(row, node.getPropertyBag().PublishDate,
			{
				"data-sort-value": node.getPropertyBag().SortablePublishDate ,
				"class": "date"
			}
		);
		this.addTextCell(row, node.getPropertyBag().UnpublishDate, {
			"data-sort-value": node.getPropertyBag().SortableUnpublishDate,
			"class": "date"
		});
		this.addTextCell(row, node.getPropertyBag().Created).setAttribute("data-sort-value", node.getPropertyBag().SortableCreated);
		this.addTextCell(row, node.getPropertyBag().Modified).setAttribute("data-sort-value", node.getPropertyBag().SortableModified);
		this.addTextCell(row, "");

	}, this);


	var sortButton = UserInterface.getBinding(this.table.querySelector(".sortbutton[direction]"));
	if(sortButton != null && sortButton instanceof SortButtonBinding){
		sortButton.sort(sortButton.getDirection());
	}
}


UnpublishedPageBinding.prototype.refresh = function () {

	this.isRequireRefresh = false;

	TreeService.GetUnpublishedElements(true, (function (response) {

		var selected = new List();
		this.getSelectedCheckboxes().each(function(checkbox) {
			if (checkbox.associatedNode && checkbox.isChecked) {
				selected.add(checkbox.associatedNode.getHandle());
			}
		});

		var nodes = new List();
		new List(response).each(function (element) {
			var newnode = new SystemNode(element);
			nodes.add(newnode);
		});
		this.renderActions(nodes);
		this.renderTable(nodes, selected);
		this.updateActions();
		this.updateCheckAllButton(true);

	}).bind(this));
}

UnpublishedPageBinding.prototype.getWorkflowActions = function (node) {

	var result = new List();
	node.getActionProfile().each(function (group, list) {
		list.each(function (action) {
			if (action.getTag() === UnpublishedPageBinding.BULK_PUBLISHING_COMMANDS) {
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

UnpublishedPageBinding.prototype.addTextCell = function (row, value, attributes) {

	var cell = this.bindingDocument.createElement("td");
	if (value != undefined) {
		var span = this.bindingDocument.createElement("span");
		span.appendChild(this.bindingDocument.createTextNode(value));
		cell.appendChild(span);
	}
	if (attributes != undefined) {
		for (var name in attributes) {
			cell.setAttribute(name, attributes[name]);
		}
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
				this.updateCheckAllButton(checkbox.isChecked);
				this.hightlightRow(checkbox);
			}
			action.consume();
			break;

		case ButtonBinding.ACTION_COMMAND:

			var button = action.target;
			var systemAction = button.associatedSystemAction;
			if (systemAction != null) {
				var bulkExecutionDialog = systemAction.getBulkExecutionDialog();
				if (bulkExecutionDialog != null && this.getSelectedCheckboxes().getLength() > 1) {
					Dialog.question(
						bulkExecutionDialog.Title,
						bulkExecutionDialog.Text,
						Dialog.BUTTONS_ACCEPT_CANCEL,
						{
							handleDialogResponse: (function(response) {
								if (response === Dialog.RESPONSE_ACCEPT) {
									this._handleSystemAction(systemAction);
								}
							}).bind(this)
						}
					);
				} else {
					this._handleSystemAction(systemAction);
				}
			}
			break;

		case UnpublishedPageBinding.ACTION_CHECK_ALL:

			this.tablebody.getDescendantBindingsByType(CheckBoxBinding).each(function (checkbox) {
				if (checkbox.associatedNode) {
					checkbox.setChecked(binding.isChecked, true);
					this.hightlightRow(checkbox);
				}
			}, this);

			this.updateActions();

			action.consume();
			break;
	}
}


/**
 * Implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
UnpublishedPageBinding.prototype.handleBroadcast = function (broadcast, arg) {

	UnpublishedPageBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case BroadcastMessages.DOCKTABBINDING_SELECT:
			if (this.containingViewBinding === arg.getAssociatedView()) {
				this.isSelectedTab = true;
				if (this.isRequireRefresh) {
					this.refresh();
				}
			} else {
				this.isSelectedTab = false;
			}
			console.log(arg);
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
			if (this.isSelectedTab) {
				this.refresh();
			} else {
				this.isRequireRefresh = true;
			}
			break;
	}
}

/**
 * Update 'check all' button
 * @param (checkbox} Chec
 */
UnpublishedPageBinding.prototype.hightlightRow = function (checkbox) {

	var row = DOMUtil.getAncestorByLocalName("tr", checkbox.bindingElement);
	if (row) {
		if (checkbox.isChecked) {
			CSSUtil.attachClassName(row, UnpublishedPageBinding.SELECTED_CLASSNAME);
		} else {
			CSSUtil.detachClassName(row, UnpublishedPageBinding.SELECTED_CLASSNAME);
		}
	}
}

/**
 * Update 'check all' button
 * @param (bool} isChecked
 */
UnpublishedPageBinding.prototype.updateCheckAllButton = function(isChecked) {

	this.bindingWindow.bindingMap.checkallbox.setChecked(
		isChecked && this.tablebody.getDescendantBindingsByType(CheckBoxBinding).toArray().filter(function(item) { return item.associatedNode && !item.isChecked; }).length === 0,
		true
	);
}


/**
 * Handle system-action.
 * @param (SystemAction} action
 */
UnpublishedPageBinding.prototype._handleSystemAction = function (action) {

	if (action != null) {

		Application.lock(SystemAction);
		this.getSelectedCheckboxes().each(function (check) {
			var node = check.associatedNode;
			if (node instanceof SystemNode) {
				var allowedActionKeys = this.getAllowedActionKeys(node);
				if (allowedActionKeys.has(action.getHandle())) {
					TreeService.ExecuteSingleElementAction(
						node.getData(),
						action.getHandle(),
						Application.CONSOLE_ID
					);
				}
			}
		}, this);
		MessageQueue.update();
		Application.unlock(SystemAction);
		this.refresh();
	}
}