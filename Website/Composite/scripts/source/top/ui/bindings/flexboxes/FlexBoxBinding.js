FlexBoxBinding.prototype= new Binding;
FlexBoxBinding.prototype.constructor = FlexBoxBinding;
FlexBoxBinding.superclass = Binding.prototype;

FlexBoxBinding.CLASSNAME = "flexboxelement";

FlexBoxBinding.TIMEOUT = 250;

/**
 * In case the reflex chain should invoke a new call to reflex, a clever timeout 
 * system has been established to prevent multiple simultaneous flex iterators. 
 * It works by switching the isFlexSuspended property on bindings. The timeout can 
 * be supressed by passing a boolean value of true to the method. This can be desired, 
 * but should be avoided since it adds a computational overhead that threatens Explorer. 
 * Notice that reflex invokation is disabled during startup since the stage is hidden anyway.
 * @param {Binding} startBinding
 * @param @optional {boolean} isForce
 */
FlexBoxBinding.reflex = function ( startBinding, isForce ) {
	
	/*
	 * Collect flexible bindings in a list.  
	 * Skip bindings with suspended flex.
	 */
	var list = new List ();
	var crawler = new FlexBoxCrawler ();
	crawler.mode = isForce ? FlexBoxCrawler.MODE_FORCE : FlexBoxCrawler.MODE_NORMAL;
	crawler.startBinding = startBinding;
	crawler.crawl ( startBinding.bindingElement, list );
	
	/*
	 * Flex each binding in list, briefly suspending flexibility 
	 * (the binding may still flex in case the isForce param is true). 
	 * Note that the crawler SKIPS bindings with suspended flex.
	 */
	list.each ( function ( binding ) {
		binding.flex ();
	});
	
	/*
	 * This is ultra lame. But so is Internet Explorer. Note that 
	 * we don't respect the significance of suspended flex here,  
	 * We simply flex again. The longer the timeout, the better  
	 * the odds of IE computing an exact layout calculation...
	 */
	if ( Client.isExplorer ) {
		setTimeout ( function () {
			list.each ( function ( binding ) {
				if ( Binding.exists ( binding )) {
					binding.flex ();
				}
			});
		}, 0.5 * FlexBoxBinding.TIMEOUT );
	}
	
	/*
	 * Reset binding flexibility after a short timeout.
	 */
	setTimeout ( function () {
		list.each ( function ( binding ) {
			if ( Binding.exists ( binding )) {
				binding.isFlexSuspended = false;
			}
		});
		list.dispose ();
	}, FlexBoxBinding.TIMEOUT );
		
	/*
	 * Creepy crawlers.
	 */
	crawler.dispose ();
}

/**
 * @class
 */
function FlexBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FlexBoxBinding" );
	
	/**
	 * This flag is switched off and and later switched back on by the binding 
	 * that started the iteration. This will prevent multiple flex invokations 
	 * with much computational stress but no visible effect.
	 * @see {Binding#reflex}
	 * @type {boolean}
	 */
	this.isFlexSuspended = false;
	
	/**
	 * Enable flexbox behavior.
	 * @type {boolean}
	 */
	this.isFlexible = true;
	
	/**
	 * @type {boolean}
	 */
	this.isFit = true; 
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FlexBoxBinding.prototype.toString = function () {

	return "[FlexBoxBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
FlexBoxBinding.prototype.onBindingRegister = function () {

	FlexBoxBinding.superclass.onBindingRegister.call ( this );
	
	/*
	 * Note that you can disable flex  
	 * by twisting this property.
	 */
	if ( this.getProperty ( "flex" ) == false ) {
		this.isFlexible = false;
	}

	if ( this.isFlexible ) {
		this.attachClassName(FlexBoxBinding.CLASSNAME);
		if (Client.isPad)
			this.bindingElement.style.overflow = "auto";
	}

}

/**
 * @overloads {Binding#onBindingAttach}
 */
FlexBoxBinding.prototype.onBindingAttach = function () {
	
	FlexBoxBinding.superclass.onBindingAttach.call ( this );
	
	/*
	 * For use with the fitness program. This allows dialogs 
	 * to expand in order to show content without scrollbars.
	 */
	this.addActionListener ( Binding.ACTION_UPDATED );

}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
FlexBoxBinding.prototype.handleAction = function ( action ) {
	
	FlexBoxBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case Binding.ACTION_UPDATED :
			this.isFit = false;
			break;
	}
}

/**
 * Get combined span of sibling elements.
 * @param @optional {boolean} isHorizontal
 */
FlexBoxBinding.prototype._getSiblingsSpan = function ( isHorizontal ) {
	
	var result = 0;
	var children = new List ( this.bindingElement.parentNode.childNodes );
	
	while ( children.hasNext ()) {
		var child = children.getNext ();
		if ( child.nodeType == Node.ELEMENT_NODE && child != this.bindingElement ) {
			if ( !this._isOutOfFlow ( child )) {
				var rect = child.getBoundingClientRect ();
				if ( isHorizontal ) {
					height += ( rect.right - rect.left );
				} else {
					result += ( rect.bottom - rect.top );
				}
			}			
		}
	};
	return result;
}

/**
 * Not counting absolutely positioned or floated elements.
 * @param {DOMElement} element
 * @return {boolean}
 * @private
 */
FlexBoxBinding.prototype._isOutOfFlow = function ( element ) {

	var position = CSSComputer.getPosition ( element );
	var cssfloat = CSSComputer.getFloat ( element );
	return ( position == "absolute" || cssfloat != "none" ? true : false );
}

/**
 * Compute height.
 */
FlexBoxBinding.prototype._getCalculatedHeight = function () {

	var parent	= this.bindingElement.parentNode;
	var rect = parent.getBoundingClientRect ();
	var result = rect.bottom - rect.top;

	var padding	= CSSComputer.getPadding ( parent );
	var border	= CSSComputer.getBorder ( parent );
	
	result -= ( padding.top + padding.bottom );
	result -= ( border.top + border.bottom );

	var margin = CSSComputer.getMargin(this.bindingElement);

	result -= (margin.top + margin.bottom);

	return result;
}

/**
 * Compute width. This is not currently in use.
 */
FlexBoxBinding.prototype._getCalculatedWidth = function () {

	var parent	= this.bindingElement.parentNode;
	var rect = parent.getBoundingClientRect ();
	var result = rect.right - rect.left;
	var padding	= CSSComputer.getPadding ( parent );
	var border	= CSSComputer.getBorder ( parent );
	
	result -= ( padding.left + padding.right );
	result -= ( border.left + border.right );

	return result;
}

/**
 * Set flex behavior.
 */
FlexBoxBinding.prototype.setFlexibility = function ( isFlexible ) {
	
	if ( isFlexible != this.isFlexible ) {
		if ( isFlexible ) {
			this.attachClassName ( FlexBoxBinding.CLASSNAME );
			if (Client.isPad)
				this.bindingElement.style.overflow = "auto";
			this.deleteProperty ( "flex" );
		} else {
			this.detachClassName ( FlexBoxBinding.CLASSNAME );
			if (Client.isPad)
				this.bindingElement.style.removeProperty("overflow");
			this.setProperty ( "flex", false );
		}
		this.isFlexible = isFlexible;
	}
}

/**
 * Performs the actual flexing. Note that  
 * isFlexSuspended is not accounted for here.
 * @implements {IFlexible}
 */
FlexBoxBinding.prototype.flex = function ( ) {
	
	if ( Binding.exists ( this )) {
		if ( this.isFlexible == true ) {
			var height = this._getSiblingsSpan ();
			height = this._getCalculatedHeight () - height;
			if ( !isNaN ( height ) && height >= 0 ) {
				this.bindingElement.style.height = String ( height ) + "px";
			}
		}
	}
}
	
/**
 * Expand flexbox vertically to eclose it's content. 
 * Should only be invoked by the {@link StageDialogBinding}
 * @param {boolean} isForce
 * @implements {IFit}
 */
FlexBoxBinding.prototype.fit = function ( isForce ) {

	if ( !this.isFit || isForce ) {
		
		var height = 0;
		
		new List ( this.bindingElement.childNodes ).each ( 
			function ( child ) {
				if ( child.nodeType == Node.ELEMENT_NODE ) {
					if ( !this._isOutOfFlow ( child )) {
						var rect = child.getBoundingClientRect ();
						height += ( rect.bottom - rect.top );
					}
				}
			}
		, this );
		// if ( height > this._getFitnessHeight ()) { // check disabled!
			this._setFitnessHeight ( height );
		// }
		this.isFit = true;
	}
}

/**
 * Hardwired for method fit. 
 * Note the {@link DialogPageBodyBinding} overwrites this!
 * @param {int} height
 */
FlexBoxBinding.prototype._setFitnessHeight = function ( height ) {

	var padding	= CSSComputer.getPadding ( this.bindingElement );
	var border	= CSSComputer.getBorder ( this.bindingElement );
	
	height += padding.top + padding.bottom;
	height += border.top + border.bottom;
	
	this.bindingElement.style.height = height + "px";
}
