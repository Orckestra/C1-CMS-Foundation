SplitBoxBinding.prototype = new FlexBoxBinding;
SplitBoxBinding.prototype.constructor = SplitBoxBinding;
SplitBoxBinding.superclass = FlexBoxBinding.prototype;
SplitBoxBinding.ORIENT_HORIZONTAL = "horizontal";
SplitBoxBinding.ORIENT_VERTICAL = "vertical";

/**
 * @class
 */
function SplitBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SplitBoxBinding" );
	
	/**
	 * Defaults to horizontal layout.
	 * @type {string}
	 */
	this._orient = SplitBoxBinding.ORIENT_HORIZONTAL;
	
	/**
	 * @type {boolean}
	 */
	this.isLayoutInitialized = false;
	
	/**
	 * @type {boolean}
	 */
	this._isFirstLayout = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SplitBoxBinding.prototype.toString = function () {

	return "[SplitBoxBinding]";
}

/**
 * Serialize binding.
 * Overloads {FlexBoxBinding#serialize}
 * @return {HashMap<string><object>}
 */
SplitBoxBinding.prototype.serialize = function () {
	
	var result = SplitBoxBinding.superclass.serialize.call ( this );
	if ( result ) {
	 	result.orient = this.getOrient ();
		result.layout = this.getLayout ();
	}
	return result;
}

/**
 * @overloads {Binding#onBindingAttach}
 */
SplitBoxBinding.prototype.onBindingAttach = function () {
	
	if (this.isHorizontalOrient() && Localization.isUIRtl)
	{
		var i = this.bindingElement.childNodes.length;
		while (i--)
			this.bindingElement.appendChild(this.bindingElement.childNodes[i]);
	}

	SplitBoxBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( SplitterBinding.ACTION_DRAGGED, this );	
	this.addActionListener ( SplitterBinding.ACTION_COLLAPSE, this );
	this.addActionListener ( SplitterBinding.ACTION_UNCOLLAPSE, this );
	
	this._initializeLayout ();
	this._initializeOrient ();
	this._initializeSplitters ();
}

/** 
 * The layout attribute is easy to work with for content authors, 
 * but for internal work we prefer to split it up and assign it 
 * as attributes on descendant splitpanels.
 */
SplitBoxBinding.prototype._initializeLayout = function () {

	this.isLayoutInitialized = false;

	var splitPanels = this.getSplitPanelElements ();
	if ( splitPanels.hasEntries ()) { 
		var ratios = new List ( 
			this.getLayout ().split ( ":" )
		);
		if ( ratios.getLength () != splitPanels.getLength ()) {
			throw new Error ( this + " DOM subree invalid" ); 
		} else {
			splitPanels.each ( function ( splitPanel ) {
				splitPanel.setAttribute ( "ratio", ratios.getNext ());
			});
		}
	}
	
	// flag initialized status
	this.isLayoutInitialized = true;
}

/**
 * Initialize splitbox orientation.
 */ 
SplitBoxBinding.prototype._initializeOrient = function () {
	
	var orient = this.getProperty ( "orient" );
	if ( orient ) {
		this._orient = orient;
	}
	this.attachClassName ( this._orient );
}

/**
 * Initialize splitters.
 */ 
SplitBoxBinding.prototype._initializeSplitters = function () {

	var splitters = this.getSplitterBindings ();
	while ( splitters.hasNext ()) {
		var splitterBinding = splitters.getNext ();
		if ( splitterBinding && splitterBinding.getProperty ( "collapsed" ) == true ) {
			splitterBinding.collapse ();
		}
	}
}

/**
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
SplitBoxBinding.prototype.handleAction = function ( action ) {

	SplitBoxBinding.superclass.handleAction.call ( this, action );

	switch ( action.type ) {
		case SplitterBinding.ACTION_DRAGGED :
			this.refreshLayout ();
			break;
		case SplitterBinding.ACTION_COLLAPSE :
			this.collapse ( action.target );
			action.consume ();
			break;
		case SplitterBinding.ACTION_UNCOLLAPSE :
			this.unCollapse ( action.target );
			action.consume ();
			break;
	}
}

/**
 * Overload flex method to maintain splitpanel ratios when resizing.
 * @overloads {FlexBoxBinding#flex}
 * @implements {IFlexible}
 */
SplitBoxBinding.prototype.flex = function () {
	
	SplitBoxBinding.superclass.flex.call ( this );

	if ( this.isAttached == true ) {
		this.invokeLayout ( true ); // true arg blocks new reflex chain...
	}
}

/**
 * Collapse splitter. Note that you should always invoke collapse by 
 * calling the corresponding method on the {@link SplitterBinding}.
 * @param {SplitterBinding} splitter
 */
SplitBoxBinding.prototype.collapse = function ( splitterBinding ) {
	
	this._getSplitPanelBindingForSplitter ( splitterBinding ).collapse ();
	this.invokeLayout ();
}

/**
 * Uncollapse splitter.
 * @param {SplitterBinding} splitter
 */
SplitBoxBinding.prototype.unCollapse = function ( splitterBinding ) {
	
	this._getSplitPanelBindingForSplitter ( splitterBinding ).unCollapse ();
	this.invokeLayout ();
}

/**
 * Get SplitPanelBinding dependant on the SplitterBindings "collapse" property.
 * @param {SplitterBinding} splitter
 */
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter = function ( splitterBinding ) {

	var ordinal = DOMUtil.getOrdinalPosition ( splitterBinding.bindingElement, true );
	var splitPanel, splitPanels = this.getSplitPanelElements ();
	
	switch ( splitterBinding.getCollapseDirection ()) {
		case SplitterBinding.COLLAPSE_BEFORE :
			splitPanel = splitPanels.get ( ordinal );	
			break;
		case SplitterBinding.COLLAPSE_AFTER :
			splitPanel = splitPanels.get ( ordinal + 1 );
			break;
	}	
	return UserInterface.getBinding ( splitPanel );
	
}

/**
 * Invoke current layout.
 * @param @optional {boolean} isFlexing True if layout was invoked by FlexBoxCrawler.
 */
SplitBoxBinding.prototype.invokeLayout = function ( isFlexing ) {

	var isHorizontal = this.isHorizontalOrient ();
	var panelBindings = this.getSplitPanelBindings ();
	var splitterBindings = this.getSplitterBindings ();
	var ratios = new List ();
	var ratio, sum = 0;
	var fixedPanelSum = 0;
	
	/*
	 * NOTE FOR STAGSPLITBOXES: the calculation of fixedPanelSum is only 
	 * accurate  because we have exactly two splitpanels in each stage splitbox. 
	 * If more panels are added, the calculation becomes inacurate.
	 */
	panelBindings.each ( function ( panelBinding ) {
		if ( panelBinding.isFixed == true ) {
			if ( !panelBindings.hasNext ()) {
				fixedPanelSum += panelBinding.getFix ();
			}
			ratios.add ( 0 );
			sum += 0;
		} else {
			ratio = panelBinding.getRatio ();
			ratios.add ( ratio );
			sum += ratio;
		}
	});
	if ( sum == 0 ) { // TODO: this avoids division by zero, but can it break something?
		this.logger.warn ( "Division by zero was hacked" );
		sum = 1;
	}
	if ( ratios.getLength () != panelBindings.getLength ()) {
		throw new Error ( 
			this + " Invalid property (ratio)" 
		);
	} else {
		var total = isHorizontal ? this.getInnerWidth() : this.getInnerHeight();
		total -= fixedPanelSum;
		splitterBindings.each ( function ( splitterBinding ) {
			if ( splitterBinding.isVisible ) {
				total -= SplitterBinding.DIMENSION;
			}
		});
		var unit = total / sum;
		var spancount = 0;
		
		var self = this;
		
		panelBindings.each ( function ( panelBinding ) {
			var span = 0;
			var ratio = ratios.getNext ();
			if ( panelBinding.isFixed ) {
				span = panelBinding.getFix ();
			} else {
			    span = Math.floor (unit * ratio);
				if ( isNaN ( span )) {
					alert ( "isNaN ( span ) [" + this.getProperty ( "layout" ) + "]" );
				}
			}
			
			
			// TODO: this correction should not be performed on fixed panels!
			spancount += span;
			while ( spancount > total ) {
				spancount--;
				span--;
			}
			if ( !panelBinding.isFixed ) {
				if ( isHorizontal ) {
					panelBinding.setWidth ( span );
				} else {
					panelBinding.setHeight ( span );
				}
			}	
		});
	}

	if ( isFlexing != true ) {
		this.reflex ();
	}
	
	/*
	 * Handle persistance.
	 */
	if ( this._persist && this._persist.layout ) {
		var persistlayout = this.getLayout ();
		if ( persistlayout ) { // can this fail?
 			this.setProperty ( "layout", persistlayout );
 		}
	}
}

/**
 * Compute new layout.
 */
SplitBoxBinding.prototype.computeLayout = function () {
	
	var isHorizontal		= this.isHorizontalOrient ();
	var panelBindings		= this.getSplitPanelBindings ();
	var splitterBindings 	= this.getSplitterBindings ();
	var splitterBinding 	= null;
	var ratio 				= null;
	var unit 				= null;
	var offset 				= null;
	var span 				= null;
	
	panelBindings.each ( function ( panelBinding ) {
		
		if ( !unit ) { // TODO: collapsed first binding?
			unit = isHorizontal ? panelBinding.getWidth() : panelBinding.getHeight();
		}
		span = isHorizontal ? panelBinding.getWidth() : panelBinding.getHeight();
		if ( offset ) {
			span -= offset;
			offset = null;
		}
		splitterBinding = splitterBindings.getNext ();
		if ( splitterBinding && splitterBinding.offset ) {
			offset = splitterBinding.offset;
			span += offset;
		}
		
		panelBinding.setRatio ( span / unit );
	});
}

/**
 * Refresh layout.
 */
SplitBoxBinding.prototype.refreshLayout = function () {

	this.computeLayout ();
	this.invokeLayout ();
}

/**
 * Set layout. 
 */
SplitBoxBinding.prototype.setLayout = function ( layout ) {

	this.logger.debug ( layout );
	this.setProperty ( "layout", layout );
	this._initializeLayout ();
	this.invokeLayout ();
}

/**
 * Get layout.
 * @param {string} layout
 */
SplitBoxBinding.prototype.getLayout = function () {

	if ( !this.isLayoutInitialized ) {
		if ( !this.getProperty ( "layout" )) {
			this.setProperty ( "layout", this.getDefaultLayout ());
		}
	} else {
		var layout = "", panelBindings = this.getSplitPanelBindings ();
		 panelBindings.each ( function ( panelBinding ) {
		 	layout += panelBinding.getRatio ().toString ();
			layout += panelBindings.hasNext () ? ":" : "";
		 });
		this.setProperty ( "layout", layout );
	}
	return new String ( 
		this.getProperty ( "layout" )
	);
}

/**
 * @return {string}
 */
SplitBoxBinding.prototype.getDefaultLayout = function () {

	var elements = this.getSplitPanelElements ();
	elements.each ( function ( element ) {
		layout += "1" + ( elements.hasNext () ? ":" : "" );
	});
	this.setProperty ( "layout", layout )
}

/**
 * Set width.
 * @param {number} width
 */
SplitBoxBinding.prototype.setWidth = function ( width ) {

	this.bindingElement.style.width = width + "px";
}

/**
 * Get width.
 * @return {number}
 */
SplitBoxBinding.prototype.getInnerWidth = function () {

	if (Client.isFirefox)
		return Math.floor(this.bindingElement.getBoundingClientRect().width);

	return this.bindingElement.offsetWidth;
}

/**
 * Set width.
 * @param {number} height
 */
SplitBoxBinding.prototype.setHeight = function ( height ) {

	this.bindingElement.style.height = height + "px";
}

/**
 * Get height.
 * @return {number}
 */
SplitBoxBinding.prototype.getInnerHeight = function () {

	if (Client.isFirefox)
		return Math.floor(this.bindingElement.getBoundingClientRect().height);

	return this.bindingElement.offsetHeight;
}

/**
 * Get orient property.
 * TODO: make a setter for this property (implies layout recalc)?
 */
SplitBoxBinding.prototype.getOrient = function () {

	return this.getProperty ( "orient" )
}

/**
 * Is horizontal orient?.
 * @return {boolean}
 */
SplitBoxBinding.prototype.isHorizontalOrient = function () {

	return this._orient == SplitBoxBinding.ORIENT_HORIZONTAL;
}

/**
 * Get splitpanel elements. Taking care not to include 
 * splitpanels from descendant splitboxes in result.
 * TODO: store result untill some kind of dirty flag is set
 * @return {List<DOMElement>}
 */
SplitBoxBinding.prototype.getSplitPanelElements = function () {
	var splitpanels = this.getChildElementsByLocalName("splitpanel")
	if (this.isHorizontalOrient() && Localization.isUIRtl)
	{
		splitpanels.reverse();
	}
	return splitpanels;
}

/**
 * Get splitpanel bindings.
 * @return {List<SplitPanelBinding>}
 */
SplitBoxBinding.prototype.getSplitPanelBindings = function () {

	return this.getChildBindingsByLocalName ( "splitpanel" );
}

/**
 * Get splitter elements.
 * TODO: store result untill some kind of dirty flag is set
 * @return {List<DOMElement>}
 */
SplitBoxBinding.prototype.getSplitterElements = function () {

	return this.getChildElementsByLocalName ( "splitter" );
}

/**
 * Get splitter bindings.
 * @return {List<SplitterBinding>}
 */
SplitBoxBinding.prototype.getSplitterBindings = function () {

	return this.getChildBindingsByLocalName ( "splitter" );
}

/**
 * @overloads {FlexBoxBinding#fit}
 * @param {boolean} isForce
 */
SplitBoxBinding.prototype.fit = function ( isForce ) {
	
	if ( !this.isFit || isForce ) {
	
		if ( this.isHorizontalOrient ()) {
			
			var max = 0;
			var panels = this.getSplitPanelBindings ();
			panels.each ( function ( panel ) {
				var height = panel.bindingElement.offsetHeight;
				max = height > max ? height : max;
			});
			//if ( max > this._getFitnessHeight ()) { // check disabled!
				this._setFitnessHeight ( max );
			//}
		
		} else {
			
			// but wont this be easy to fix? just call super!
			throw "SplitBoxBinding enforceFitness not supported vertically!";
		}
		
		this.isFit = true;
	
	}
}

/**
 * SplitBoxBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SplitBoxBinding}
 */
SplitBoxBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:splitbox", ownerDocument );
	return UserInterface.registerBinding ( element, SplitBoxBinding );
}