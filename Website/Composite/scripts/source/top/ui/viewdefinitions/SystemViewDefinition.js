SystemViewDefinition.prototype = new ViewDefinition;
SystemViewDefinition.prototype.constructor = SystemViewDefinition;
SystemViewDefinition.superclass = ViewDefinition.prototype;
SystemViewDefinition.DEFAULT_URL = "${root}/content/views/systemview/systemview.aspx";

/**
 * @class
 * @param {SystemNode} node
 */
function SystemViewDefinition ( node ) {
	
	/**
	 * Unique for system viewdefinitions.
	 * @type {SystemNode}
	 */
	this.node = node;
	
	/**
	 * Served for the {@link SystemPageBinding}.
	 * @overwrites {ViewDefinition#argument}
	 * @type {SystemNode}
	 */
	this.argument = node;
	
	/**
	 * All systemviews start with the same URL. The content is later
	 * generated on basis of the the SystemNode supplied in constructor.
	 * @overwrites {ViewDefinition#url}
	 * @type {string}	 
	 */
	this.url = SystemViewDefinition.DEFAULT_URL;
	
	/**
	 * @type {string}
	 */
	this.handle	= node.getHandle ();
	
	/**
	 * @type {string}
	 */
	this.label = node.getLabel ();
	
	/** 
	 * TODO: are we using this?
	 * @type {string}
	 */
	this.image = node.getImageProfile ().getDefaultImage ();
	
	/**
	 * @type {string}
	 */
	this.toolTip = node.getToolTip ();
}