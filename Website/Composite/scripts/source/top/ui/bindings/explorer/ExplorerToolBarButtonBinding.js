ExplorerToolBarButtonBinding.prototype = new ToolBarButtonBinding;
ExplorerToolBarButtonBinding.prototype.constructor = ExplorerToolBarButtonBinding;
ExplorerToolBarButtonBinding.superclass = ToolBarButtonBinding.prototype;
ExplorerToolBarButtonBinding.TYPE_NORMAL = "normal";
ExplorerToolBarButtonBinding.TYPE_LARGE = "large";

/**
 * @class
 */
function ExplorerToolBarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerToolBarButtonBinding" );
	
	/** 
	 * @type {boolean}
	 */
	this.isRadioButton = true;
	
	/** 
	 * @type {string}
	 */
	this.explorerToolBarButtonType = null;
	
	/**
	 * This property is set by the {@link ExplorerMenuBinding}
	 * @type {SystemNode}
	 */
	this.node = null;
}

/**
 * Identifies binding.
 */
ExplorerToolBarButtonBinding.prototype.toString = function () {

	return "[ExplorerToolBarButtonBinding]";
}

/**
 * Compute button image.
 * @overloads {Binding#onBindingAttach}
 */
ExplorerToolBarButtonBinding.prototype.onBindingAttach = function () {
	
	var isLargeButton = this.explorerToolBarButtonType == ExplorerToolBarButtonBinding.TYPE_LARGE;
	var imageSizeParameter = isLargeButton ? ToolBarBinding.IMAGESIZE_LARGE : ToolBarBinding.IMAGESIZE_NORMAL;
	this.imageProfile = this.node.getImageProfile ( imageSizeParameter );
	ExplorerToolBarButtonBinding.superclass.onBindingAttach.call ( this );
}

/**
 * ExplorerToolBarButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @param {string} explorerToolBarButtonType
 * @return {ExplorerToolBarButtonBinding}
 */
ExplorerToolBarButtonBinding.newInstance = function ( ownerDocument, explorerToolBarButtonType ) {

	var nodename = "ui:explorertoolbarbutton";
	
	var element = DOMUtil.createElementNS ( Constants.NS_UI, nodename, ownerDocument );
	var binding = UserInterface.registerBinding ( element, ExplorerToolBarButtonBinding );
	binding.explorerToolBarButtonType = explorerToolBarButtonType;
	return binding;
}