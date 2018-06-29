/**
* MessageQueue!
*/
window.MessageQueue = new function () {

	/**
	* Update interval in milliseconds when server is online.
	* @type {int}
	*/
	this.INTERVAL_ONLINE = 5 * 1000;

	/**
	* Update interval in milliseconds when server is offline.
	* @type {int}
	*/
	this.INTERVAL_OFFLINE = 1 * 1000;

	/**
	* List of actions waiting to be executed.
	* @type {List<object>}
	*/
	this._actions = new List();

	/**
	* Indexing action ID's to make sure we don't execute the same action twice.
	* This would happen on server restart, where server resets the sequencenumber.
	* @type {HashMap<String><boolean>}
	*/
	this._index = {};

	/**
	* Holds the hightest action sequencenumber sent from the server.
	* @type {int}
	*/
	this.index = 0; // NOT equal to private variable "sequencenumber"

	/*
	* Privates
	*/
	var logger = SystemLogger.getLogger("MessageQueue");
	var service = null;
	var sequenceNumber = 0;
	var triggerhandle = null;
	var refreshingtrees = new Map();
	var openingtreenodes = new Map();
	var isOffline = false;
	var isAutoUpdate = false;
	var isReceivingMessages = false;
	var orderMessages = false;

	/*
	* Mapping dock locations. Hashmap keys correspond
	* to values of the servers "ViewType" property.
	*/
	var docklocation = {

		"Main": DockBinding.MAIN,
		"External": DockBinding.EXTERNAL,
		"BottomLeft": DockBinding.BOTTOMLEFT,
		"BottomRight": DockBinding.BOTTOMRIGHT,
		"RightTop": DockBinding.RIGHTTOP,
		"RightBottom": DockBinding.RIGHTBOTTOM,
		"AbsBottomLeft": DockBinding.ABSBOTTOMLEFT,
		"AbsBottomRight": DockBinding.ABSBOTTOMRIGHT,
		"Slide": DockBinding.SLIDE,
	}

	/**
	* Initialize.
	*/
	this.initialize = function () {

		service = ConsoleMessageQueueService;
		sequenceNumber = service.GetCurrentSequenceNumber("dummyparam!");

		this.index = sequenceNumber;

		EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED, this);
		EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED, this);
		EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE, this);
		EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE, this);

		window.messageQueueInterval = window.setInterval(
			MessageQueue._autoupdate,
			MessageQueue.INTERVAL_ONLINE
		);
	};

	/**
	* Fetching actions from server. Note that
	* we don't request new actions while we are
	* already executing a list of actions.
	*/
	this._autoupdate = function () {

		/*
		* Note that you should not use the "this" keyword
		* around here since we are executed on a setInterval.
		*/
		if (!isOffline) {

			/*
			* While an action sequence is being evaluated,
			* to further actions are retrieved from server.
			*/
			if (!MessageQueue._actions.hasEntries()) {
				var isEnabled = WebServiceProxy.isLoggingEnabled;
				if (Application.isLoggedIn) {
					isAutoUpdate = true;
					WebServiceProxy.isLoggingEnabled = false; // not logging the SOAP request
					MessageQueue.update();
					WebServiceProxy.isLoggingEnabled = isEnabled;
					isAutoUpdate = false;
				}
			}
		}
	};

	/**
	* When server is offline, this will be executed
	* on an interval to unlock GUI when ready.
	* @see {MessageQueue#_lockSystem}
	*/
	this._pokeserver = function () {

		if (isOffline == true) {
			if (ReadyService.IsServerReady(true)) {
				MessageQueue._lockSystem(false);
			}
		}
	}

	/**
	* Fetch list of actions from server.
	* @param {bool} syncRequest
	*/
	this.update = function (syncRequest) {

		if (Application.isLoggedIn) { // otherwise no service...

			/*
			* Note that we broadcast the boolean argument: isAutoUpdate
			*/
			EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED, isAutoUpdate);

			this._updateMessages(syncRequest);
		}
	}

	/**
	* @param {bool} syncRequest
	*/
	this._updateMessages = function(syncRequest) {

		if (isReceivingMessages) {
			orderMessages = true;
		} else {
			isReceivingMessages = true;
			var self = this;
			/*
			* Fetch new actions; append them to current actions in execution chain.
			* Response has two properties: The servers highest known action number
			* and a list of actions. The first property is needed because the server
			* will RESET the actionindex on restart.
			*/
			var handleResponce = function(response) {
				if (response != null) {
					if (Types.isDefined(response.CurrentSequenceNumber)) {
						var newindex = response.CurrentSequenceNumber;
						if (newindex < self.index) {
							logger.debug("SERVER WAS RESTARTED! old messagequeue index: " + self.index + ", new messagequeue index: " + newindex);
							// the server was restarted!
						}
						self.index = newindex;

						var actions = new List(response.ConsoleActions);
						if (actions.hasEntries()) {
							self.evaluate(actions);
						} else if (!self._actions.hasEntries()) {
							broadcastUpdateEvaluated();
						}
					} else {
						logger.error("No sequencenumber in MessageQueue response!");
					}
				}
				isReceivingMessages = false;
				if (orderMessages) {
					orderMessages = false;
					self._updateMessages();
				}
			};

			if (syncRequest) {
				handleResponce(service.GetMessages(Application.CONSOLE_ID, this.index));
			} else {
				service.GetMessages(Application.CONSOLE_ID, this.index, handleResponce);
			}
		}
	}

	/**
	* Evaluate a list of actions. These will be appended
	* to any actions currently scheduled for execution.
	* @param {List} actions
	*/
	this.evaluate = function (actions) {

		var newactions = new List();

		if (actions.hasEntries()) {

			/*
			* Filter out actions that were already queued
			* up for evaluation (server restart scenario).
			*/
			actions.each(function (action) {
				if (this._index[action.Id] != true) {
					newactions.add(action);
				}
				this._index[action.Id] = true;
			}, this);

			if (newactions.hasEntries()) {

				// merge into existing actionlist?
				if (this._actions.hasEntries()) {
					this._actions.merge(newactions);
				} else {
					this._actions = newactions;
				}

				// execute first action!
				this._nextAction();
			}
		}
	};

	/**
	* Close all views - with a flowHandle (important)!
	* @param {object} params
	*/
	this._closeAllViews = function (params) {

		var reason = "(No reason)";
		if (params != null) {
			reason = params.Reason;
		}

		/*
		* TODO: externalize strings!
		*/
		var title = "Warning";
		var text = "The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
		text = text.replace("${reason}", reason);

		var self = this;
		Dialog.warning(title, text, Dialog.BUTTONS_ACCEPT_CANCEL, {
			handleDialogResponse: function (response) {
				if (response == Dialog.RESPONSE_ACCEPT) {
					EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
				}
				self._nextAction();
			}
		})
	}

	/**
	* Evaluate next action. This will update the sequencenumber.
	*/
	this._nextAction = function () {

		var params = null;

		if (this._actions.hasEntries()) {

			var action = this._actions.extractFirst();
			sequenceNumber = action.SequenceNumber;
			logger.debug("MessageQueue action: " + action.ActionType + " > QUEUE-MAX-SEQNUM: " + this.index + " > CURRENT SEQNUM: " + sequenceNumber + " > ACTIONS-LEFT: " + this._actions.getLength());

			/*
			* Parse action.
			*/
			switch (action.ActionType) {

				case "OpenView":
					params = action.OpenViewParams;
					if (params.ViewType == "ModalDialog") {
						openDialogView(params);
					} else {
						triggerhandle = params.ViewId;
						openView(params);
					}
					break;

				case "CloseView":
					params = action.CloseViewParams;
					triggerhandle = params.ViewId;
					closeView(params);
					break;

				case "RefreshTree":
					EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this);
					EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this);
					EventBroadcaster.broadcast(
						BroadcastMessages.SYSTEMTREEBINDING_REFRESH,
						action.RefreshTreeParams.EntityToken
					);

					var debug = "REFRESHING TREES: " + refreshingtrees.countEntries() + "\n";
					refreshingtrees.each(function (token) {
						debug += "\n\tTOKEN: " + token;
					})
					logger.debug(debug);

					/*
					* The trees perform a timeout before refreshing
					* so that this code gets evaluted straight away
					* and not when the trees are done refreshing.
					*/
					if (!refreshingtrees.hasEntries()) {
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this);
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this);
						this._nextAction();
					}
					break;

				case "SelectElement":

					var perspectiveElementKey = action.SelectElementParams.PerspectiveElementKey;
					var entityToken = action.SelectElementParams.EntityToken;

					StageBinding.select(perspectiveElementKey)
						.then(
						function () {
							EventBroadcaster.broadcast(
								BroadcastMessages.SYSTEMTREEBINDING_FOCUS,
								entityToken
							);
						});

					this._nextAction();
					break;

				case "MessageBox":
					openMessageBox(action.MessageBoxParams);
					break;

				case "OpenViewDefinition":
					params = action.OpenViewDefinitionParams;
					triggerhandle = params.Handle;
					openViewDefinition(params);
					break;

				case "LogEntry":
					logEntry(action.LogEntryParams);
					this._nextAction();
					break;

				case "Reboot":
					Application.reload(true);
					break;

				case "LockSystem":
					MessageQueue._lockSystem(true);
					break;

				case "BroadcastMessage":
					params = action.BroadcastMessageParams;
					logger.debug("Server says: EventBroadcaster.broadcast ( \"" + params.Name + "\", " + params.Value + " )");
					EventBroadcaster.broadcast(params.Name, params.Value);
					this._nextAction();
					break;

				case "CollapseAndRefresh":
					EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
					EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this);
					EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this);
					EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
					if (!refreshingtrees.hasEntries()) {
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this);
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this);
						this._nextAction();
					}
					break;

				case "CloseAllViews":
					this._closeAllViews(action.CloseAllViewsParams);
					break;

				case "SaveStatus":
					saveStatus(action.SaveStatusParams);
					this._nextAction();
					break;

				case "DownloadFile":
					Download.init(action.DownloadFileParams.Url);
					this._nextAction();
					break;

				case "ExpandTreeNode": // TODO: CLEAR THIS!
					this._nextAction();
					/*
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN, this );
					EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN, this );
					EventBroadcaster.broadcast (
					BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN,
					action.ExpandTreeNodeParams.EntityToken
					);
					if ( !openingtreenodes.hasEntries ()) {
					EventBroadcaster.unsubscribe ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN, this );
					EventBroadcaster.unsubscribe ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN, this );
					this._nextAction ();
					}
					*/
					break;

				case "BindEntityTokenToView":
					params = action.BindEntityTokenToViewParams;
					EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW, {
						handle: params.ViewId,
						entityToken: params.EntityToken
					});
					this._nextAction();
					break;

				case "OpenGenericView":
					params = action.OpenGenericViewParams;
					openGenericView(params);
					break;

				case "OpenExternalView":
					params = action.OpenExternalViewParams;
					openExternalView(params);
					break;

				case "OpenSlideView":
					params = action.OpenSlideViewParams;
					openSlideView(params);
					break;

				default:
					Dialog.error("Dysfunction", "Unhandled action: " + action.ActionType);
					break;
			}
		} else {

			broadcastUpdateEvaluated();
		}
	}

	/**
	* Note that we broadcast the boolean argument: isAutoUpdate
	*/
	function broadcastUpdateEvaluated() {

		EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED, isAutoUpdate);
	}

	/**
	* Parse log entry.
	* @param {object} params
	*/
	function logEntry(params) {

		var method = params.Level.toLowerCase();
		SystemLogger.getLogger(params.SenderId)[method](params.Message);
	}

	/**
	* Parse view opening. Views targeted for editors dock
	* are presented with a "Loading..." label on startup,
	* this is handled by the DockTabBinding.
	* @param {object} params
	*/
	function openView(params) {

		var list = paramsToList(params.Argument);

		if (list.hasEntries()) {

			var def = ViewDefinition.clone("Composite.Management.PostBackView", params.ViewId);
			def.entityToken = params.EntityToken;
			def.flowHandle = params.FlowHandle;
			def.position = docklocation[params.ViewType],
			def.label = params.Label;
			def.image = params.Image;
			def.toolTip = params.ToolTip;
			def.argument = {
				"url": params.Url,
				"list": list
			};
			StageBinding.presentViewDefinition(def);

		} else {

			StageBinding.presentViewDefinition(
				new HostedViewDefinition({
					handle: params.ViewId,
					entityToken: params.EntityToken,
					flowHandle: params.FlowHandle,
					position: docklocation[params.ViewType],
					url: params.Url,
					label: params.Label,
					image: params.Image,
					toolTip: params.ToolTip
				})
			);
		}
	}

	/*
	* Open modal dialog. This will delay next action until the dialog is closed!
	* @param {object} params/
	*/
	function openDialogView(params) {

		StageBinding.presentViewDefinition(
			new DialogViewDefinition({
				handle: params.ViewId,
				flowHandle: params.FlowHandle,
				position: Dialog.MODAL,
				url: params.Url,
				handler: {
					handleDialogResponse: function () {
						setTimeout(function () {
							MessageQueue._nextAction();
						}, 250);
					}
				}
			})
		);
	}

	/**
	* Open standard dialog of type error, info or warning.
	* Question type dialogs not supported here. This will
	* delay next action until the dialog is closed!
	* @param {object} params
	*/
	function openMessageBox(params) {

		var method = params.DialogType.toLowerCase();
		if (method == "question") {
			throw "Not supported!";
		} else {
			Dialog[method](params.Title, params.Message, null, {
				handleDialogResponse: function () {
					setTimeout(function () {
						MessageQueue._nextAction();
					}, 250);
				}
			});
		}
	}

	/**
	* Open ViewDefinition.
	* @param {object} params
	*/
	function openViewDefinition(params) {

		// var list = paramsToList ( params.Argument );

		/*
		* TODO: Note on how this stuff differs from the paramsToList stuff...
		*/
		var map = {};
		var hasMap = false;
		new List(params.Argument).each(function (entry) {
			map[entry.Key] = entry.Value;
			hasMap = true;
		});

		/*
		* Determine whether or not to open a new view or to reuse any opened view.
		* The Page Browser is a view-reuse example - it opens new tabs INSIDE a
		* singluar open instance.
		*/
		var proto = ViewDefinitions[params.Handle];

		if (proto != null) {

			var def = null;

			if (proto.isMutable == false) { // reuse the same view

				def = proto; // keeping original handle, ignoring server handle

			} else { // create new view by cloning the old

				def = new HostedViewDefinition();
				for (var prop in proto) {
					def[prop] = proto[prop];
				}
				def.handle = params.ViewId; // assigning new handle, unique from server
			}

			//def.argument = list.hasEntries () ? list : null;
			def.argument = hasMap ? map : null;
			StageBinding.presentViewDefinition(def);

		} else {
			throw "Unknown ViewDefinition: " + param.Handle;
		}
	}

	/**
	* Open generic view. That is, a PageBinding with a WindowBinding that will
	* 1) Open a given URL - or, if params are specified...
	* 2) Polulate a form with given params and post to a given URL
	*/
	function openGenericView(params) {

		var def = ViewDefinition.clone("Composite.Management.GenericView", params.ViewId);
		def.label = params.Label;
		def.toolTip = params.ToolTip;
		def.image = params.Image;
		def.argument = {
			"url": params.Url,
			"list": paramsToList(params.UrlPostArguments)
		};
		StageBinding.presentViewDefinition(def);

	}

	/**
	* Open external view. That is, a PageBinding with a WindowBinding that will
	* 1) Open a given URL ...
	*/
	function openExternalView(params) {

		var def = ViewDefinition.clone("Composite.Management.ExternalView", params.ViewId);
		def.label = params.Label;
		def.toolTip = params.ToolTip;
		def.image = params.Image;
		def.url = params.Url,

		StageBinding.presentViewDefinition(def);
	}

	/**
	* Open slide view.
	*/
	function openSlideView(params) {
		try {


			var def = ViewDefinition.clone("Composite.Management.SlideView", params.ViewId);
			def.label = params.Label;
			def.toolTip = params.ToolTip;
			def.image = params.Image;
			def.url = params.Url,
				StageBinding.presentViewDefinition(def);
		} catch (e) {
		};
	}

	/**
	* Close view.
	* @param {object} params
	*/
	function closeView(params) {

		if (StageBinding.isViewOpen(params.ViewId)) {
			// This broadcast will be intercepted by the ViewBinding.
			EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW, params.ViewId);
		} else {
			// If the view is a dialog, user may have cancelled it already.
			// In that case, we execute the next action straight away...
			MessageQueue._nextAction();
		}
	}

	/**
	* Handle save status.
	* @param {object} params
	*/
	function saveStatus(params) {

		/*
		* This broadcast will be intercepted by the DockTabBinding and
		* possibly the DockBinding.
		*/
		EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED, {
			handle: params.ViewId,
			isSuccess: params.Succeeded
		});
	}

	/**
	* Lock and unlock the system when
	* server goes offline and online.
	* @param {boolean} isLock
	*/
	this._lockSystem = function (isLock) {

		var theatre = top.bindingMap.offlinetheatre;

		if (isLock) {
			theatre.play(true);
			window.clearInterval(window.messageQueueInterval);
			window.messageQueueInterval = window.setInterval(
				MessageQueue._pokeserver,
				MessageQueue.INTERVAL_OFFLINE
			);
		} else {
			theatre.stop();
			window.clearInterval(window.messageQueueInterval);
			window.messageQueueInterval = window.setInterval(
				MessageQueue._autoupdate,
				MessageQueue.INTERVAL_ONLINE
			);
			/*
			* Note that we now execute any actions that were
			* stacked on the list BEFORE offline mode started.
			*/
			var self = this;
			setTimeout(function () {
				if (self._actions.hasEntries()) {
					self._nextAction();
				}
			}, 0);
		}
		isOffline = isLock;
	}


	this.placeConsoleCommand = function (serializedMessageOrder) {

	    service.PlaceConsoleCommand(Application.CONSOLE_ID, serializedMessageOrder);
	}

	// EVENTBROADCASTERSTUFF ...................................................

	/**
	* @implements {IBroadcastListener}
	* @param {string} broadcast
	* @param {object} arg
	*/
	this.handleBroadcast = function (broadcast, arg) {

		switch (broadcast) {

			case BroadcastMessages.APPLICATION_LOGIN:
				this.initialize();
				break;

			case BroadcastMessages.VIEW_COMPLETED:
			case BroadcastMessages.VIEW_CLOSED:
				if (triggerhandle != null && arg == triggerhandle) {
					triggerhandle = null;
					this._nextAction();
				}
				break;

			/*
			* Multiple trees may report in on this. We count
			* them all and await the broadcast seen below.
			*/
			case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:

				if (arg != null) {
					refreshingtrees.set(arg, true);
				} else {
					logger.debug("Saa har vi balladen!");
				}
				//logger.debug ( "REFRESHING! ... " + refreshingtrees.countEntries ());
				//logger.fatal ( "REFRESHING " + arg );
				break;

			/*
			* Continue when all trees are reported refreshed.
			*/
			case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:

				//logger.debug ( "REFRESHED! ... " + refreshingtrees.countEntries ());
				//logger.fatal ( "REFRESHED " + arg );

				if (refreshingtrees.hasEntries()) {

					refreshingtrees.del(arg);

					logger.debug("Refreshed tree: " + arg + "\n(" + refreshingtrees.countEntries() + " trees left!)");

					//logger.debug ( "AND NOW: " + refreshingtrees.countEntries ());

					if (!refreshingtrees.hasEntries()) {

						//logger.debug ( "ALL REFRESHED! NEXT..." )

						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this);
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this);

						/*
						* This timeout allows trees to calm down in case
						* the next action is another refreshtree request.
						*/
						setTimeout(function () {
							MessageQueue._nextAction();
						}, 0);
					}
				}
				break

				/*
				* Multiple treenodes may report in on this. We count
				* them all and await the broadcast seen below.
				*/
			case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:

				openingtreenodes.set(arg, true);
				break;

			/*
			* Continue only when all treenodes are reported open.
			*/
			case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:

				if (openingtreenodes.hasEntries() == true) {
					openingtreenodes.del(arg);
					if (!openingtreenodes.hasEntries()) {
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN, this);
						EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN, this);
						MessageQueue._nextAction();
					}
				}
				break

				/*
				* Probably broadcasted by a {@link SOAPRequest}.
				*/
			case BroadcastMessages.SERVER_OFFLINE:
				MessageQueue._lockSystem(true);
				break;

			/*
			* Probably broadcasted by a {@link SOAPRequest}.
			*/
			case BroadcastMessages.SERVER_ONLINE:
				MessageQueue._lockSystem(false);
				break;
		}
	}

	/**
	* Convert array-of-key-value-objects into a plain old list.
	* @param {Array} params Array of objects with "Key" and "Value" props.
	* @return {List<object>} a list of objects with "name" and "value" props
	*/
	function paramsToList(params) {

		var list = new List();
		new List(params).each(function (entry) {
			list.add({
				name: entry.Key,
				value: entry.Value
			});
		});

		return list;
	}

	/*
	* File subscriptions.
	*/
	EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN, this);
}


