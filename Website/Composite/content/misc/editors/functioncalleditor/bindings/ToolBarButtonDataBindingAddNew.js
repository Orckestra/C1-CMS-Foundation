ToolBarButtonDataBindingAddNew.prototype = new ToolBarButtonBinding;
ToolBarButtonDataBindingAddNew.prototype.constructor = ToolBarButtonDataBindingAddNew;
ToolBarButtonDataBindingAddNew.superclass = ToolBarButtonBinding.prototype;

/**
 * @class
 */
function ToolBarButtonDataBindingAddNew () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarButtonDataBindingAddNew" );
	
	/**
	 * @type {string}
	 */
	this._dialoglabel = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ToolBarButtonDataBindingAddNew.prototype.toString = function () {

	return "[ToolBarButtonDataBindingAddNew]";
}

ToolBarButtonDataBindingAddNew.prototype.oncommand = function () {
	
	// TODO: move the view handle to binding markup as a property... 
	var showWidget = this.getProperty ( "selectwidget" );
	var def = ViewDefinitions [ showWidget ? "Composite.Management.WidgetFunctionSelectorDialog" : "Composite.Management.FunctionSelectorDialog" ];
	
	this._dialoglabel = def._label;
	def.argument.label = this.getProperty ( "dialoglabel" );
	def.argument.nodes[0].search = this.getProperty("providersearch");

	var self = this;
	def.handler = {
		handleDialogResponse : function ( response, result ) {
			delete def.argument.nodes [ 0 ].search;
			def.argument.label = self._dialoglabel;
			if ( response == Dialog.RESPONSE_ACCEPT ) {
				self.shadowTree.dotnetinput.value = result.getFirst ();
				setTimeout ( function () {
					self.dispatchAction ( Binding.ACTION_DIRTY )
					self.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
				}, 0 );
			}
		}
	}

	def.argument.selectedToken = null;

	if (showWidget) {
		TreeService.GetWidgetEntityToken(this.shadowTree.dotnetinput.value, function (result) {
			def.argument.selectedToken = result;
			Dialog.invokeDefinition(def);
		});
	}
	else {
		Dialog.invokeDefinition(def);
	}
}