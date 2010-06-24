TextBinding.prototype = new Binding;
TextBinding.prototype.constructor = TextBinding;
TextBinding.superclass = Binding.prototype;

/**
 * @class
 * Here's a weird binding that will replace itself with a text node!
 */
function TextBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TextBinding" );
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TextBinding.prototype.toString = function () {
	
	return "[TextBinding]";
}

/**
 * Observe how the binding gets disposed and replaced by a simple text node.
 * TODO: This is silly, just keep the element and add some text!
 * @overloads {Binding#onBindingAttach}
 */
TextBinding.prototype.onBindingAttach = function () {
	
	TextBinding.superclass.onBindingAttach.call ( this );
	
	var label = this.getProperty ( "label" );
	if ( !label ) {
		label = DOMUtil.getTextContent ( this.bindingElement );
	}
	var text = this.bindingDocument.createTextNode ( 
		Resolver.resolve ( label )
	);
	this.bindingElement.parentNode.replaceChild ( text, this.bindingElement );
	this.dispose ();
}

/**
 * You should invoke this method before the binding attaches 
 * (since attachment will effectively destroy the binding).
 */
TextBinding.prototype.setLabel = function ( label ) {
	
	this.setProperty ( "label", label );
}

/**
 * TextBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TextBinding}
 */
TextBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:text", ownerDocument );
	return UserInterface.registerBinding ( element, TextBinding );
}