SEOAssistantPageBinding.prototype = new MarkupAwarePageBinding;
SEOAssistantPageBinding.prototype.constructor = SEOAssistantPageBinding;
SEOAssistantPageBinding.superclass = MarkupAwarePageBinding.prototype;

SEOAssistantPageBinding.CLASSNAME_DEACTIVATED = "deactivated";
SEOAssistantPageBinding.LOCALIZATION = "Composite.Web.SEOAssistant";

/**
 * @class
 */
function SEOAssistantPageBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("SEOAssistantPageBinding.");

	/**
	 * @type {SEODOMParser}
	 */
	this._parser = new SEODOMParser();

	/**
	 * @type {HTMLInputElement}
	 */
	this._focusedInput = null;

	/**
	 * @type {boolean}
	 */
	this._isDirty = false;

	/**
	 * @type {List<string>}
	 */
	this._keywords = null;

	/**
	 * @type {string}
	 */
	this._markup = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SEOAssistantPageBinding.prototype.toString = function () {

	return "[SEOAssistantPageBinding.]";
}

/**
 * Setup page elements.
 * @overloads {PageBinding#onBeforePageInitialize}
 */
SEOAssistantPageBinding.prototype.onBeforePageInitialize = function () {

	SEOAssistantPageBinding.superclass.onBeforePageInitialize.call(this);


	this.addActionListener(ButtonBinding.ACTION_COMMAND);

	this.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED);

	this.addEventListener(DOMEvents.DOUBLECLICK);

	/*
	 * Initialize the SEO service and retrieve keywords.
	 */
	if (top.SEOService == null) {
		top.SEOService = WebServiceProxy.createProxy(Constants.URL_WSDL_SEOSERVICE);
	}
	this._getKeywords();
}

/**
 * Get keywords and populate list. Note that this  
 * is reinvoked when user changes to to-language.
 */
SEOAssistantPageBinding.prototype._getKeywords = function () {

	var list = new List(top.SEOService.GetKeyWords(true));
	this._parser.setKeys(list);
	this._keywords = list;


}

/**
 * Save keywords.
 */
SEOAssistantPageBinding.prototype._saveKeywords = function () {

	var keywords = this._keywords;

	/*
	 * Transmit to server.
	 */
	Application.lock(this);
	top.SEOService.SaveKeyWords(keywords.toArray());

	/*
	 * Update internally.
	 */
	var list = keywords;
	this._parser.setKeys(list);

	var self = this;
	setTimeout(function () {
		Application.unlock(self);
	}, 500);
}

/**
 * @implements {IBroadcastHandler}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
SEOAssistantPageBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SEOAssistantPageBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case BroadcastMessages.TOLANGUAGE_UPDATED:

			this._getKeywords();
			break;
	}
}

/**
 * @overloads {MarkupAwarePageBinding#_handleMarkup}
 * @param {string} markup
 */
SEOAssistantPageBinding.prototype._handleMarkup = function (markup) {

	SEOAssistantPageBinding.superclass._handleMarkup.call(this, markup);

	this._markup = markup;

	if (markup == null || markup == "") {
		this._incorrectHtml();
	}
	else if (this._keywords.hasEntries()) {
		this._parseMarkup(markup);
	} else {
		this._noKeyWords();
	}
}


/**
* @overloads {MarkupAwarePageBinding#_handleWrongMarkup}
* @param {string} markup
*/
SEOAssistantPageBinding.prototype._incorrectHtml = function () {

	//var tree = this.bindingWindow.bindingMap.tree;
	//tree.empty();
	//var node = tree.add(TreeNodeBinding.newInstance(tree.bindingDocument));
	//node.setImage("${icon:warning}");
	//node.setLabel(StringBundle.getString(SEOAssistantPageBinding.LOCALIZATION, "IncorrectHtml"));
	//node.attach();
}

/**
 * 
 */
SEOAssistantPageBinding.prototype._noKeyWords = function () {

	//var tree = this.bindingWindow.bindingMap.tree;
	//tree.empty ();
	//var node = tree.add ( TreeNodeBinding.newInstance ( tree.bindingDocument ));
	//node.setImage ( "${icon:warning}" );
	//node.setLabel ( StringBundle.getString ( SEOAssistantPageBinding.LOCALIZATION, "NoKeywordsWarning" ));
	//node.attach ();
}

/**
 * @param {string} markup
 */
SEOAssistantPageBinding.prototype._parseMarkup = function (markup) {

	var dom = null;
	try {
		dom = new DOMParser().parseFromString(markup, "text/html");
		
	} catch (Exception) {
	}

	if (dom == null) // IE9
	{
		try {
			var dom = document.implementation.createHTMLDocument("");
			dom.body.innerHTML = markup;
		} catch (Exception) {
			
		}
	}

	if (dom != null) {

		/*
		 * Build the tree.
		 */
		var list = this._parser.parse(dom);
		if (list.hasEntries()) {
			document.getElementById("resultcontaner").innerHTML = "";

			while (list.hasNext()) {
				var item = list.getNext();
				var tr = this._addKeywordRow(document.getElementById("resultcontaner"), item);
				this._addResults(tr, item.isInTitle, item.isInURL, item.isInMenuTitle, item.isInDescription, item.isInHeading, item.isInContent);
				this._addDeleteCell(tr);
			}
			document.getElementById("message").style.display = "none";

		} else {

		}

	} else {

		this.logger.error("Illformed markup:\n\n" + markup);
	}
}

/**
 * @param {string} 
 */
SEOAssistantPageBinding.prototype._addKeywordRow = function (tablebody, item) {

	var tr = this.bindingDocument.createElement("tr");
	tr.setAttribute("keyword", item.keyword);
	tablebody.appendChild(tr);
	var scoretd = this._addCell(tr);
	scoretd.className = "score";
	var span = DOMUtil.createElementNS(Constants.NS_XHTML, "span", this.bindingDocument);
	var score = item.getScore();

	var i = 0; while (i++ < SEOResult.MAX_SCORE) {
		var inc = span.cloneNode(false);
		inc.className = i <= score ? "true" : "false";
		span.appendChild(inc);
	}

	span.className = "seoresult";
	scoretd.appendChild(span);

	var keyword = item.keyword;
	var button = ClickButtonBinding.newInstance(this.bindingDocument);
	var keywordtd = this._addCell(tr);
	keywordtd.appendChild(button.bindingElement);
	button.addActionListener(
		ButtonBinding.ACTION_COMMAND, {
			handleAction: function (action) {
				action.consume();
				EventBroadcaster.broadcast(BroadcastMessages.HIGHLIGHT_KEYWORDS,
				new List([keyword])
				);
			}
		}
	);
	button.setLabel(keyword);
	button.attach();
	button.attachClassName("simple-text");

	return tr;
}

/**
 * @param {string} 
 */
SEOAssistantPageBinding.prototype._addCell = function (tr) {
	var td = this.bindingDocument.createElement("td");
	return tr.appendChild(td);
}

SEOAssistantPageBinding.prototype._addDeleteCell = function (tr) {
	var td = this.bindingDocument.createElement("td");
	var button = ClickButtonBinding.newInstance(this.bindingDocument);
	button.setImage("${icon:delete}");
	
	td.appendChild(button.bindingElement);
	tr.appendChild(td);
	button.attach();
	button.attachClassName("simple-icon");
	var self = this;
	button.oncommand = function () {
		self._deleteKeywordRow(tr);
	}

}

/**
 * @param {string} 
 */
SEOAssistantPageBinding.prototype._addResults = function () {
	if (arguments.length === 0)
		return;
	var tr = arguments[0];
	var i;
	for (i = 1; i < arguments.length; i++) {
		var td = this._addCell(tr);
		td.className = arguments[i];
	}
}

SEOAssistantPageBinding.prototype._deleteKeywordRow = function (tr) {
	var keyword = tr.getAttribute("keyword");
	tr.parentNode.removeChild(tr);
	this._removeKeyword(keyword);
	this._saveKeywords();
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
SEOAssistantPageBinding.prototype.handleAction = function (action) {

	SEOAssistantPageBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case ButtonBinding.ACTION_COMMAND:
			var button = action.target;
			switch (button.getID()) {
				case "addkeywordbutton":
					var input = this.bindingWindow.bindingMap.keywordinput;
					var value = input.getValue();
					if (!value) {
						break;
					}
					this._addKeyword(input.getValue());
					this._saveKeywords();
					input.setValue("");
					if (this._markup)
						this._parseMarkup(this._markup);
					break;
			}
			break;
	}
}

/**
 * Add keyword.
 */
SEOAssistantPageBinding.prototype._addKeyword = function (keyword) {


	this._keywords.add(keyword);

}


/**
 * Add keyword.
 */
SEOAssistantPageBinding.prototype._removeKeyword = function (keyword) {

	this._keywords.remove(keyword);

}