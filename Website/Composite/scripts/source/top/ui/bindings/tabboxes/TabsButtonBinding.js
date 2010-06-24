TabsButtonBinding.prototype = new ButtonBinding;
TabsButtonBinding.prototype.constructor = TabsButtonBinding;
TabsButtonBinding.superclass = ButtonBinding.prototype;
TabsButtonBinding.RESERVED_SPACE = 36;
TabsButtonBinding.NODENAME_TABBOX = "tabbox";

TabsButtonBinding.CHAR_INDICATOR = String.fromCharCode ( 187 ); // "»".charCodeAt ( 0 )

function TabsButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabsButtonBinding" );
	
	/**
	 * @type {List}
	 */
	this.hiddenTabBindings = null;
	
	/**
	 * @type {List}
	 * @private
	 */
	this.menuItemBindings = null;
	
	/**
	 * @type {TabBoxBinding}
	 * @private
	 */
	this.containingTabBoxBinding = null;
	
	/**
	 * @type {TabBinding}
	 */
	this.selectedTabBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = false;
	
	/**
	 * @type {int}
	 */
	this.snapshotWindowWidth = null;
}

/**
 * Identifies binding.
 */
TabsButtonBinding.prototype.toString = function () {

	return "[TabsButtonBinding]";
}

/**
 * Overloads {ButtonBinding#onBindingRegister}
 */
TabsButtonBinding.prototype.onBindingRegister = function () {
	
	TabsButtonBinding.superclass.onBindingRegister.call ( this );
	this.hiddenTabBindings = new List ();
	this.menuItemBindings = new List ();
}

/**
 * Build DOM content.
 */
TabsButtonBinding.prototype.buildDOMContent = function () {

	TabsButtonBinding.superclass.buildDOMContent.call ( this );

	this.containingTabBoxBinding = this.getAncestorBindingByLocalName ( this.constructor.NODENAME_TABBOX );
	//this.addActionListener ( ButtonBinding.ACTION_COMMAND, this );
	
	var span = this.bindingDocument.createElement ( "span" );
	span.appendChild ( this.bindingDocument.createTextNode ( TabsButtonBinding.CHAR_INDICATOR ));
	span.className = "arrow";
	this.labelBinding.bindingElement.appendChild ( span );
}

/**
 * Show tabmanager. Automaticaly updates tabbutton tabcount.
 * @overwrites {Binding#show}
 * @param {int} xposition
 */
TabsButtonBinding.prototype.show = function ( xposition ) {

	this.bindingElement.style.left = xposition + "px";
	this.setLabel ( 
		this.hiddenTabBindings.getLength ().toString ()
	);
	TabsButtonBinding.superclass.show.call ( this );
}

/**
 * Hide the button while resizing window horizontally. 
 * TODO: find ud af det!
 * @implements {IResizeHandler}
 *
TabsButtonBinding.prototype.fireOnResize = function () {

	var width = this.bindingWindow.WindowManager.getWindowDimensions ().w;
	if ( this.isVisible && width != this.snapshotWindowWidth ) {
		this.hide ();
	}
	this.snapshotWindowWidth = width;
}
*/

/**
 * This method is invoked by the {@link TabsBinding}
 */
TabsButtonBinding.prototype.reset = function () {
	
	if ( this.menuItemBindings.hasEntries ()) {
		while ( this.menuItemBindings.hasNext ()) {
			this.menuItemBindings.getNext ().dispose ();
		}
	}
	this.hiddenTabBindings.clear ();
	this.menuItemBindings.clear ();
	this.selectedTabBinding = null;
	this.isPopulated = false;
}

/**
 * @param {TabBinding} tabBinding
 */
TabsButtonBinding.prototype.registerHiddenTabBinding = function ( tabBinding ) {

	this.hiddenTabBindings.add ( tabBinding );
}

/**
 * Overloads {ButtonBinding#fireCommand}
 */
TabsButtonBinding.prototype.fireCommand = function () {
	
	if ( this.isChecked && !this.isPopulated ) {	
		this.hiddenTabBindings.reset ();
		while ( this.hiddenTabBindings.hasNext ()) {
			var tabBinding = this.hiddenTabBindings.getNext ();
			var item = MenuItemBinding.newInstance ( 
				this.popupBinding.bindingDocument 
			);
			item.setLabel ( tabBinding.getLabel ());
			item.setImage ( tabBinding.getImage ());	
			item.associatedTabBinding = tabBinding;
			var self = this;
			item.oncommand = function () {
				self.selectedTabBinding = this.associatedTabBinding;
			}
			this.popupBinding.add ( item );
			this.menuItemBindings.add ( item );
			
			this.popupBinding.attachRecursive ();
		}
		this.isPopulated = true;
	}
	
	this.popupBinding.addActionListener ( PopupBinding.ACTION_HIDE, this );
	TabsButtonBinding.superclass.fireCommand.call ( this );
}

/**
 * Make the selected tabBinding visible!
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
TabsButtonBinding.prototype.handleAction = function ( action ) {

	TabsButtonBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case PopupBinding.ACTION_HIDE :
			this.popupBinding.removeActionListener ( PopupBinding.ACTION_HIDE, this );
			var tabBinding = this.selectedTabBinding;
			if ( tabBinding ) {
				this.containingTabBoxBinding.moveToOrdinalPosition ( tabBinding, 0 );
				this.containingTabBoxBinding.select ( tabBinding );
			}
			action.consume ();
			break;
	}
}

/**
 * TabsButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TabsButtonBinding}
 */
TabsButtonBinding.newInstance = function ( ownerDocument ) {

	var toolbarbutton = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbutton", ownerDocument );
	toolbarbutton.setAttribute ( "type", "checkbox" );
	toolbarbutton.setAttribute ( "popup", "app.bindingMap.tabsbuttonpopup" );	
	toolbarbutton.className = "tabbutton";
	return UserInterface.registerBinding ( toolbarbutton, TabsButtonBinding );
}