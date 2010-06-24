SEOResultTreeNodeBinding.prototype = new TreeNodeBinding;
SEOResultTreeNodeBinding.prototype.constructor = SEOResultTreeNodeBinding;
SEOResultTreeNodeBinding.superclass = TreeNodeBinding.prototype;

/**
 * @class
 */
function SEOResultTreeNodeBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SEOResultTreeNodeBinding" );
	
	/**
	 * The associated SEOResult. Assigned by SEOAssistantPageBinding.
	 * @type {SEOResult}
	 */
	this.seoresult = null;

	/**
	 * @overwrites {TreeNodeBinding#isContainer}
	 * @type {boolean}
	 */
	this.isContainer = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * @overloads {TreeNodeBinding#buildDOMContent}
 */
SEOResultTreeNodeBinding.prototype.buildDOMContent = function () {
	
	SEOResultTreeNodeBinding.superclass.buildDOMContent.call ( this );
	
	/*
	 * Disable image support.
	 */
	this.setImage ( false );
	this.setImage = new Function ();
	
	
	if ( this.seoresult != null ) {
		
		/*
		 * Set label.
		 */
		this.setLabel ( this.seoresult.keyword );
		this._addScore ();
	}
}

/*
 * Graphic score indicator.
 */
SEOResultTreeNodeBinding.prototype._addScore = function () {
	
	var span = DOMUtil.createElementNS ( Constants.NS_XHTML, "span", this.bindingDocument );
	var score = this.seoresult.getScore ();
	
	var i = 0; while ( i++ < SEOResult.MAX_SCORE ) {
		var inc = span.cloneNode ( false );
		inc.className = i <= score ? "true" : "false";
		span.appendChild ( inc );
	}
	
	span.className = "seoresult";
	var container = this.labelBinding.shadowTree.labelText;
	var textnode = this.labelBinding.shadowTree.text;
	container.insertBefore ( span, textnode );
	
	this.setToolTip ( String ( score ) + "/" + String ( SEOResult.MAX_SCORE ));
	
	var self = this;
	DOMEvents.addEventListener ( span, DOMEvents.CLICK, {
		handleEvent : function () {
			self.focus ();
		}
	});
}

/**
 * Numerical score version.
 *
SEOResultTreeNodeBinding.prototype._addScore = function () {
	
	var span = DOMUtil.createElementNS ( Constants.NS_XHTML, "span", this.bindingDocument );
	var score = String ( this.seoresult.getScore ()) + "/" + String ( SEOResult.MAX_SCORE );
	span.appendChild ( this.bindingDocument.createTextNode ( score ));
	span.className = "seoresult";
	
	var container = this.labelBinding.shadowTree.labelText;
	var textnode = this.labelBinding.shadowTree.text;
	container.insertBefore ( span, textnode );
}
*/

/**
 * @overwrites {TreeNodeBinding#open}
 */
SEOResultTreeNodeBinding.prototype.open = function () {
	
	if ( !this.hasBeenOpened ) {
		var self = this;
		new List ([
			"isInTitle", 
			"isInURL",
			"isInMenuTitle",
			"isInDescription", 
			"isInHeading", 
			"isInContent"   
		]).each ( function ( what ) {
			self._appendChildTreeNode ( what ); 
		});
	}
	
	SEOResultTreeNodeBinding.superclass.open.call ( this );
}

/**
 * @param {string} what
 */
SEOResultTreeNodeBinding.prototype._appendChildTreeNode = function ( what ) {
	
	var isTrue = this.seoresult [ what ];
	var node = TreeNodeBinding.newInstance ( this.bindingDocument );
	node.setLabel ( StringBundle.getString ( "Composite.Web.SEOAssistant", what ));
	node.setImage ( isTrue ? "${icon:accept}" : "${icon:cancel}" );
	node.attachClassName ( isTrue ? "true" : "false" );
	this.add ( node ); 
	node.attach ();
}

/**
 * Identifies binding.
 */
SEOResultTreeNodeBinding.prototype.toString = function () {

	return "[SEOResultTreeNodeBinding]";
}

/**
 * SEOResultTreeNodeBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SEOResultTreeNodeBinding}
 */
SEOResultTreeNodeBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treenode", ownerDocument );
	return UserInterface.registerBinding ( element, SEOResultTreeNodeBinding );
}