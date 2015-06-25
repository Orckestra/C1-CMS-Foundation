TabsBinding.prototype = new Binding;
TabsBinding.prototype.constructor = TabsBinding;
TabsBinding.superclass = Binding.prototype;
TabsBinding.NODENAME_TABBOX = "tabbox";
TabsBinding.TABBUTTON_IMPLEMENTATION = TabsButtonBinding;

/**
 * @implements {IBroadcastListener}
 */
function TabsBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabsBinding" );

	/**
	 * @type {TabBoxBinding}
	 */
	this.containingTabBoxBinding = null;
	
	/**
	 * @type {TabManagerBinding}
	 */
	this.tabsButtonBinding = null;
	
	/**
	 * @type {int}
	 */
	this._cachedOffsetWidth = parseInt ( 0 );

	/**
	 * Prevents the occasiona "too much recursion"...
	 * @type {boolean}
	 */
	this.isManaging = false;
	
	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TabsBinding.prototype.toString = function () {

	return "[TabsBinding]";
}

/**
 * Attach classname to clear stylesheet floats.
 * @overloads {Binding#onBindingRegister}
 */
TabsBinding.prototype.onBindingRegister = function () {

	TabsBinding.superclass.onBindingRegister.call ( this );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TabsBinding.prototype.onBindingAttach = function () {

	TabsBinding.superclass.onBindingAttach.call ( this );
	
	this.containingTabBoxBinding = this.getAncestorBindingByType ( TabBoxBinding );
	this.containingTabBoxBinding.addActionListener ( TabBoxBinding.ACTION_UPDATED, this );
	this.buildDOMContent ();
	this.dispatchAction ( Binding.ACTION_ATTACHED );
}

/**
 * Build DOM content.
 */
TabsBinding.prototype.buildDOMContent = function () {
	
	// build the tabmanager
	this.shadowTree.tabManager = this.bindingDocument.createElement ( "div" );
	this.shadowTree.tabManager.className = "tabmanager";
	
	var tabButtonImplementation = this.constructor.TABBUTTON_IMPLEMENTATION;
	this.tabsButtonBinding = tabButtonImplementation.newInstance ( this.bindingDocument );
	this.shadowTree.tabsButton = this.tabsButtonBinding;
	this.add ( this.tabsButtonBinding );
	this.tabsButtonBinding.attach ();
}

/**
 * Invoke tabmanager update when tabbox is modified.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
TabsBinding.prototype.handleAction = function ( action ) {

	TabsBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case TabBoxBinding.ACTION_UPDATED  :
			if ( !this.isManaging ) {
				var self = this;
				function manage () {
					self.manage ();
				}
				setTimeout ( manage, 0 );
			}
			break;
	}
}

/**
 * Update tabsbutton when tabbox environment is resized.
 * A size check is added to prevent unnescessary management.
 * A timeout is enforced for browser convenience.
 */
TabsBinding.prototype.flex = function () {
	
	if ( this.isAttached == true ) {
		var self = this;
		function manage () {
			if ( Binding.exists ( self ) == true ) {
				var currentOffsetWidth = self.bindingElement.offsetWidth;
				if ( currentOffsetWidth != self._cachedOffsetWidth ) {
					self.manage ();
				}
				self._cachedOffsetWidth = currentOffsetWidth;
			}
		}
		setTimeout ( manage, 0 );
	}
}

/**
 * Hide the tabsbutton when adding new tabs. This will 
 * prevent the button from jumping around (timeout issue). 
 * If necessary, the button is shown by manage method.
 * @overloads {Binding#add}
 * @param {Binding} binding
 * @return {Binding}
 */
TabsBinding.prototype.add = function ( binding ) {
	
	if ( binding instanceof TabBinding ) {
		if ( this.tabsButtonBinding && this.tabsButtonBinding.isVisible ) {
			this.tabsButtonBinding.hide ();
		}
	}
	return TabsBinding.superclass.add.call ( this, binding );
}

/**
 * Manage tab layout.
 * TODO: this routine is way too complex - please refactor!
 */
TabsBinding.prototype.manage = function () {
	
	if ( Binding.exists ( this ) == true && this.isVisible ) {
	
		this.isManaging = true;
	
		var isOverflow = false;
		var tabBinding, tab, tabs = this.containingTabBoxBinding.getTabElements ();
		var tabButtonImplementation = this.constructor.TABBUTTON_IMPLEMENTATION;
		var width = this.bindingElement.offsetWidth - tabButtonImplementation.RESERVED_SPACE;
		var lastVisibleTabBinding = null;
	
		var sum = 0, visibleCount = 0;
		var isContinue = true;	
		
		if ( tabs.hasEntries ()) {
		
			this.tabsButtonBinding.reset ();
			
			while ( tabs.hasNext () && isContinue ) {
				tab = tabs.getNext ();
				tabBinding = UserInterface.getBinding ( tab );
				if ( !lastVisibleTabBinding ) {
					lastVisibleTabBinding = tabBinding;
				}
				sum += tab.offsetWidth;
				if ( sum >= width ) {
					isOverflow = true;
					if ( tabBinding.isSelected ) {
						if ( !DOMUtil.isFirstElement ( tabBinding.bindingElement, true )) {
							this.isManaging = false;
							if ( lastVisibleTabBinding ) {
								lastVisibleTabBinding.hide (); // prevents jumping tabs!
								if ( this.tabsButtonBinding.isVisible ) {
									this.tabsButtonBinding.hide ();
								}
							}
							this.containingTabBoxBinding.moveToOrdinalPosition ( // this will invoke a new manage!
								tabBinding,
								visibleCount - 1
							);
							isContinue = false; 
						}
					} else {
						tabBinding.hide ();
						this.tabsButtonBinding.registerHiddenTabBinding ( tabBinding );
					}
				} else {
					tabBinding.show ();
					lastVisibleTabBinding = tabBinding;
					visibleCount ++;
				}
			}
			if ( isContinue ) {
				if ( isOverflow && this.tabsButtonBinding.hiddenTabBindings.hasEntries ()) {
					var lastElement = lastVisibleTabBinding.getBindingElement ();
					var xposition = lastElement.offsetLeft + lastElement.offsetWidth;
					var button = this.tabsButtonBinding;
					setTimeout ( function () {
						button.show ( xposition + 4 );
					}, 50 );
				} else {
					this.tabsButtonBinding.hide ();
				}
			}
		}
		
		this.isManaging = false;
	}
}