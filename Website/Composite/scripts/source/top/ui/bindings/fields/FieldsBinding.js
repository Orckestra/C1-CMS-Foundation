FieldsBinding.prototype = new Binding;
FieldsBinding.prototype.constructor = FieldsBinding;
FieldsBinding.superclass = Binding.prototype;

FieldsBinding.ACTION_LAYOUT_UPDATED = "fieldslayoutupdated";

/**
 * @class
 */
function FieldsBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldsBinding" );
	
	/**
	 * @type {int}
	 */
	this._invalidCount = 0;
	
	/**
	 * Tracking invalid fields for user message.
	 * @type {Map<string><string>}
	 */
	this._invalidFieldLabels = null;
	
	/**
	 * Block flex crawler.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FitnessCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldsBinding.prototype.toString = function () {

	return "[FieldsBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}.
 */
FieldsBinding.prototype.onBindingRegister = function () {

	FieldsBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( Binding.ACTION_INVALID );
	this.addActionListener ( Binding.ACTION_VALID );
	this.addActionListener ( FieldGroupBinding.ACTION_HIDE );
	
	this._invalidFieldLabels = new Map ();
}

/**
 * Display block when initialized (display none in stylesheet).
 * @overloads {Binding#onBindingInitialize}.
 */
FieldsBinding.prototype.onBindingInitialize = function () {

	FieldsBinding.superclass.onBindingInitialize.call ( this );
	this.bindingElement.style.display = "block";
	
	/**
	 * Emulate CSS first-child pseudoselector for IE... 
	 */
	var firstgroup = this.getDescendantBindingByLocalName ( "fieldgroup" );
	if ( firstgroup != null ) {
		firstgroup.attachClassName ( FieldGroupBinding.CLASSNAME_FIRST );
	}

	/**
	 *  Limit width becouse Edge smooth non-breakable items in columns #620
	 */
	if (Client.isEdge) {
		var editopPage = this.getAncestorBindingByType(EditorPageBinding);
		if (editopPage && this.bindingElement.childElementCount > 0) {
			var columnWidth = 430;
			this.bindingElement.style.maxWidth = (this.bindingElement.childElementCount + 1) * columnWidth - 1 + 'px';
		}
	}
}

/**
 * Disposing an invalid FieldsBinding will automatically 
 * make it valid in the greater scheme of things.
 * @overloads {Binding#onBindingDispose}.
 */
FieldsBinding.prototype.onBindingDispose = function () {

	FieldsBinding.superclass.onBindingDispose.call ( this );
	
	if ( this._invalidCount > 0 ) {
		this.dispatchAction ( Binding.ACTION_VALID );
	}
}

/**
 * Validate all contained bindings and return true only if everything validates.
 * @return {boolean}
 */
FieldsBinding.prototype.validate = function () {
	
	var isValid = true;
	
	var bindings = this.getDescendantBindingsByLocalName ( "*" );
	while ( bindings.hasNext ()) {
		var binding = bindings.getNext ();
		if ( Interfaces.isImplemented ( IData, binding )) {
			var isBindingValid = binding.validate ();
			if ( isValid && !isBindingValid ) {
				isValid = false;
			}
		}
	}
	return isValid;
}

/**
 * Get result. This returns a name-value hashmap for all contained DataBindings. 
 * Notice that the {@link DocumentManager} has a equivalent method extract information 
 * from *all* databindings within the local scope. Also notice that we call the getResult 
 * method instead of getValue. The value is for the serverside while the "result" is 
 * automatically typecasted for clientside handling.
 * @return {HashMap<string><object>}
 *
FieldsBinding.prototype.getDataBindingResultMap = function () {
	
	throw "Method needs updating";
	
	var result = {};
	 
	var bindings = this.getDescendantBindingsByLocalName ( "*" );
	while ( bindings.hasNext ()) {
		var binding = bindings.getNext ();
		if ( Interfaces.isImplemented ( IData, binding )) {
			result [ binding.getName ()] = binding.getResult ();	
		}
	}
	return result;
}
*/

/**
 * Around here we simply collect and count valid/invalid actions in order 
 * to dispatch a unified valid/invalid action for this entire binding.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
FieldsBinding.prototype.handleAction = function ( action ) {
	
	FieldsBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	if ( binding != this ) {
		switch ( action.type ) {
			
			/*
			 * Tracking invalid DataBindings. Error display handled.
			 */
			case Binding.ACTION_INVALID :
			
				/*
				 * Tracking statusbar errors (displayed by EditorPageBinding).
				 */
				var label = DataBinding.getAssociatedLabel ( binding );
				if ( label ) {
					this._invalidFieldLabels.set ( binding.key, label );
				}
				
				/*
				 * Show balloon error? Note that balloons are supressed for "required" errors.
				 */
				if ( binding.error ) {
					if ( !binding.isInvalidBecauseRequired ) {
						ErrorBinding.presentError ({
							text: binding.error
						}, binding );
					}
				}
				
				/*
				 * Count invalid bindings.
				 */
				if ( this._invalidCount == 0 ) {
					this.dispatchAction ( Binding.ACTION_INVALID );	
				}
				this._invalidCount ++;	
				action.consume ();
				break;
				
			case Binding.ACTION_VALID :
				if ( this._invalidFieldLabels.has ( binding.key )) {
					this._invalidFieldLabels.del ( binding.key );
				}
				this._invalidCount --;
				if ( this._invalidCount == 0 ) {
					this.dispatchAction ( Binding.ACTION_VALID );	
				}
				action.consume ();
				break;
		}
	}
}

/**
 * Get labels of invalid bindings.
 * @return {List<string>}
 */
FieldsBinding.prototype.getInvalidLabels =  function () {
	
	var result = null;
	if ( this._invalidFieldLabels.hasEntries ()) {
		result = this._invalidFieldLabels.toList ();
	}
	return result;
}

/**
 * FieldsBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {FieldsBinding}
 */
FieldsBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:fields", ownerDocument );
	return UserInterface.registerBinding ( element, FieldsBinding );
}