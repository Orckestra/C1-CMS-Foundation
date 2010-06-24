MultiSelectorDataDialogBinding.prototype = new DataDialogBinding;
MultiSelectorDataDialogBinding.prototype.constructor = MultiSelectorDataDialogBinding;
MultiSelectorDataDialogBinding.superclass = DataDialogBinding.prototype;

MultiSelectorDataDialogBinding.ACTION_RESULT = "multiselectordatadialog result";

/**
 * @class
 * This is intended for use by the {@link MultiSelectorBinding} as 
 * an internal binding only. Don't use it for anything else.
 */
function MultiSelectorDataDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MultiSelectorDataDialogBinding" );
	
	/**
	 * Hardwired viewdefinition!
	 * @overwrites {DataDialogBinding#_dialogViewHandle}
	 * @type {string}
	 */
	this._dialogViewHandle = "Composite.Management.MultiSelectorDialog";
	
	/**
	 * @overwrites {DataBinding#isFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = false;
	
	/**
	 * This property is set by the MultiSelectorBinding.
	 * @see {MultiSelectorBinding#_buildEditorButton}
	 * @type {List<SelectorBindingSelection>}
	 */
	this.selections = null;
	 
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MultiSelectorDataDialogBinding.prototype.toString = function () {
	
	return "[MultiSelectorDataDialogBinding]";
}

/**
 * @overloads {StringDataDialogBinding#onBindingAttach}
 */
MultiSelectorDataDialogBinding.prototype.onBindingAttach = function () {
	
	this.setProperty ( "label", StringBundle.getString ( "ui", "Website.Misc.MultiSelector.LabelEditSelections" ) );
	MultiSelectorDataDialogBinding.superclass.onBindingAttach.call ( this );
}

/**
 * @overwrites {DataDialogBinding#fireCommand}
 */
MultiSelectorDataDialogBinding.prototype.fireCommand = function () {
	
	this.dispatchAction ( DataDialogBinding.ACTION_COMMAND );
	
	/*
	 * Build argument for selections editor.
	 */
	var argument = {
		label : DataBinding.getAssociatedLabel ( this ),
		selections : this.selections
	}
	
	/*
	 * Build dialog handler. Action intercepted 
	 * by hosting MultiSelecotorBinding.
	 */
	var self = this;
	var handler = {
		handleDialogResponse : function ( response, result ) {
			if ( response == Dialog.RESPONSE_ACCEPT ) {
				self.result = result;
				self.dispatchAction ( MultiSelectorDataDialogBinding.ACTION_RESULT );
			}
		}
	}
	
	/*
	 * Launch dialog.
	 */
	var definition = ViewDefinitions [ this._dialogViewHandle ];
	definition.handler = handler;
	definition.argument = argument;
	StageBinding.presentViewDefinition ( definition );
}

/**
 * MultiSelectorDataDialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MultiSelectorDataDialogBinding}
 */
MultiSelectorDataDialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:datadialog", ownerDocument );
	return UserInterface.registerBinding ( element, MultiSelectorDataDialogBinding );
}