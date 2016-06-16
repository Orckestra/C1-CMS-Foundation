/**
 * @class
 * Centralizes interaction with TreeService.
 */
var System = new function () {

	var logger = SystemLogger.getLogger("System");
	var root = null;
	var defaultEntityTokens = null;

	/**
	* Has perspectives mounted?
	*/
	this.hasActivePerspectives = false;

	/**
	 * Cache tree
	 */
	this.nodes = new Map();

	/**
	 * Cache parents
	 */
	this.parents = new Map();

	/**
	* Get default EntityToken for perspective.
	* @return {EntityToken}
	*/
	this.getDefaultEntityToken = function (perspectiveEntityToken) {

		if (defaultEntityTokens == null) {
			defaultEntityTokens = {};
			new List(TreeService.GetDefaultEntityTokens(true)).each(
				function (token) {
					defaultEntityTokens[token.Key] = token.Value;
				}
			);
		}
		return defaultEntityTokens[perspectiveEntityToken];
	}

	/**
	* Get the alpha node.
	* @return {SystemNode}
	*/
	this.getRootNode = function () {

		if (root == null) {
			root = new SystemNode(TreeService.GetRootElements("")[0]);
		}
		return root;
	}

	/**
	* Get the main "area" nodes (the buttons in the outlook menu).
	* For some security related reason, this must be done especial.
	* @return {List<SystemNode>}
	*/
	this.getPerspectiveNodes = function () {

		var result = new List();
		var response = TreeService.GetActivePerspectiveElements("dummy");

		var list = new List(response);
		if (list.hasEntries()) {
			this.hasActivePerspectives = true;
			list.each(function (element) {
				result.add(
					new SystemNode(element)
				);
			});
		} else {
			EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
		}
		return result;

	}

	/**
	* Get child nodes, optionally by search token.
	* @param {SystemNode} node
	* @param {string} searchToken Optional
	* @return {List<SystemNode>}
	*/
	this.getChildNodes = function (node, searchToken) {
		var result = new List();
		var response = null;

		var self = this;
		//disabel cache prototype
		//var handle = node.getHandle();
		//if (!this.nodes.has(handle) || searchToken) {
			if (searchToken) {
				if (SearchTokens.hasToken(searchToken)) {
					searchToken = SearchTokens.getToken(searchToken);
				}
				response = TreeService.GetElementsBySearchToken(node.getData(), searchToken);
			} else {
				response = TreeService.GetElements(node.getData());
			}
			new List(response).each(function(element) {
				var newnode = new SystemNode(element);
				if (searchToken) {
					newnode.searchToken = searchToken;
				}
				result.add(newnode);

				//Add parents to cache
				if (!searchToken) {
					self.parents.set(newnode.getHandle(), node);
				}

			});


		//	if (!searchToken) {
		//		this.nodes.set(handle, result.copy());
		//	}
		//} else {
		//	result = this.nodes.get(handle).copy();
		//}
		return this.groupListByBundles(result);
	}

	this.getParents = function (handle) {
		var handles = new List();
		var result = new List();

		while (this.parents.has(handle) && !handles.has(handle)) {
			var parent = this.parents.get(handle);
			handles.add(handle);
			result.add(parent);
			handle = parent.getHandle();
		}
		return result;
	}


	/**
	* Get branch. This will *not* return a tree structure, but the structure 
	* can be inferred from a sequential parsing of the returned map. 
	* @param {List<SystemNode>} nodes A list of open sub-treenodes.
	* @return {Map<string><List<SystemNode>>}
	*/
	this.getDescendantBranch = function (nodes) {

		var map = new Map();
		var arg = [];

		nodes.each(function (node) {
			arg.push({
				ProviderName: node.getProviderName(),
				EntityToken: node.getEntityToken(),
				Piggybag: node.getPiggyBag(),
				SearchToken: node.searchToken,
			});
		});

		var response = TreeService.GetMultipleChildren(arg);
		var triples = new List(response);

		while (triples.hasNext()) {
			this._listNodesInMap(triples.getNext(), map);
		}

		return this.groupMapByBundles(map);
	}

	/**
	* This will *not* return a tree structure, but the structure 
	* can be inferred from a sequential parsing of the returned map. 
	* @param {string} rootToken The current perspective token.
	* @param {string} token 
	* @param {List<SystemNode>} nodes A list of open treenodes in the whole tree.
	* @return {Map<string><List<SystemNode>>}
	*/
	this.getInvisibleBranch = function (rootToken, token, nodes) {

		var map = new Map();
		var arg = [];

		nodes.each(function (node) {
			arg.push({
				ProviderName: node.getProviderName(),
				EntityToken: node.getEntityToken(),
				Piggybag: node.getPiggyBag()
			});
		});

		var response = TreeService.FindEntityToken(rootToken, token, arg);

		if (response instanceof SOAPFault) {

			logger.error(response.getFaultString());
			if (Application.isDeveloperMode) {
				alert(response.getFaultString());
			}
			map = null;

		} else {

			var triples = new List(response);
			while (triples.hasNext()) {
				this._listNodesInMap(triples.getNext(), map);
			};
		}

		return this.groupMapByBundles(map);
	}

	/**
	* @param {object} triple
	* @param {Map<string><List<SystemNode>>} map
	*/
	this._listNodesInMap = function (triple, map) {

		var list = new List();
		var key = triple.ElementKey; //triple.ProviderName + triple.EntityToken;
		var elements = new List(triple.ClientElements);

		map.set(key, list);
		while (elements.hasNext()) {
			var element = elements.getNext();
			list.add(new SystemNode(element));
		}

		var self = this;
		map.each(function(key, list) {
			self.nodes.set(key, list.copy());
		});
	}

	/**
	* Get child nodes by search token.
	* @param {SystemNode} node
	* @param {string} searchToken Optional
	* @return {List<SystemNode>}
	*/
	this.getChildNodesBySearchToken = function (node, searchToken) {

		return this.getChildNodes(node, searchToken);
	}

	/**
	* Get named roots (nodes for a given root).
	* @param {string} key
	* @param {string} searchToken Optional
	* @return {List<SystemNode>}
	*/
	this.getNamedRoots = function (key, searchToken) {

		var result = new List();
		var response = null;

		if (searchToken) {
			if (SearchTokens.hasToken(searchToken)) {
				searchToken = SearchTokens.getToken(searchToken);
			}
			response = TreeService.GetNamedRootsBySearchToken(key, searchToken);
		} else {
			response = TreeService.GetNamedRoots(key);
		}

		new List(response).each(function (element) {
			var node = new SystemNode(element);
			if (searchToken) {
				node.searchToken = searchToken;
			}
			result.add(node);
		});
		return result;
	}

	/**
	* Get named roots by search token.
	* @param {string} key
	* @param {string} searchToken
	* @return {List<SystemNode>}
	*/
	this.getNamedRootsBySearchToken = function (key, searchToken) {

		return this.getNamedRoots(key, searchToken);
	}

	/**
	* Compile action list.
	* @param {SystemNode} node
	* @param {object} element
	* @param {List} actions
	* @ignore
	*/
	function compileActionList(node, element, actions) {

		var index = element.ClientElementActionGroupId;
		if (index != null) {
			var items = actions.get(index).ClientElementActionGroupItems;
			if (items && items.length > 0) {
				node.setActionList(
					new List(items)
				);
			}
		}
	}

	/**
	 * Group by bundles
	 * @param {List<SystemNode>} nodes
	 */
	this.groupListByBundles = function (nodes) {
		var result = new List();
		var bundles = new Map();

		while (nodes.hasEntries()) {
			var node = nodes.extractFirst();
			var elementBundle = node.getData().ElementBundle;
			if (elementBundle) {
				var bundle = null;
				if (bundles.has(elementBundle)) {
					bundle = bundles.get(elementBundle);
					bundle.add(node);
				} else {
					result.add(node);
					bundles.set(elementBundle, node);
				}
			} else {
				result.add(node);
			}
		}
		return result;
	}

	/**
	 * Group by bundles
	 * @param {Map<string><List<SystemNode>>} nodes
	 */
	this.groupMapByBundles = function (map) {
		var result = new Map();
		map.each(function (key) {
			result.set(key, this.groupListByBundles(map.get(key)));
		}, this);
		return result;
	}
}