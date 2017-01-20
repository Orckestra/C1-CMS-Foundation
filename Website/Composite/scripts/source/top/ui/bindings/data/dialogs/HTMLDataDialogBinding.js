HTMLDataDialogBinding.prototype = new PostBackDataDialogBinding;
HTMLDataDialogBinding.prototype.constructor = HTMLDataDialogBinding;
HTMLDataDialogBinding.superclass = PostBackDataDialogBinding.prototype;

/**
 * @class
 * This will open a {@link WysiwygEditorBinding} in a dialog.
 */
function HTMLDataDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "HTMLDataDialogBinding" );
}

/**
 * Identifies binding.
 */
HTMLDataDialogBinding.prototype.toString = function () {

	return "[HTMLDataDialogBinding]";
}

/**
 * @overloads {StringDataDialogBinding#onBindingAttach}
 */
HTMLDataDialogBinding.prototype.onBindingAttach = function () {

	if ( this.getProperty ( "label" ) == null ) {
		this.setProperty ( "label", "Edit HTML" ); // TODO: stringbundle this!
	}
	HTMLDataDialogBinding.superclass.onBindingAttach.call ( this );
}

/**
 * @overwrites {DataDialogBinding#fireCommand}
 */
HTMLDataDialogBinding.prototype.fireCommand = function () {

	this.dispatchAction ( DataDialogBinding.ACTION_COMMAND );

	/*
	 * Build argument for editor configuration.
	 */
	var argument = {
		label : DataBinding.getAssociatedLabel ( this ),
		value : decodeURIComponent ( this.getValue ()),
		configuration : {
			"formattingconfiguration"	: this.getProperty ( "formattingconfiguration" ),
			"embedablefieldstypenames"  : this.getProperty ( "embedablefieldstypenames"),
            "previewtemplateid"	        : this.getProperty ( "previewtemplateid" ),
            "previewplaceholder"	    : this.getProperty ( "previewplaceholder" ),
            "previewpageid"	            : this.getProperty ( "previewpageid" )
		}
	}

	/*
	 * The dialoghandler is defined by superclass.
	 * @see {DataDialogBinding}
	 */
	var definition = ViewDefinitions [ "Composite.Management.VisualEditorDialog" ];
	definition.handler = this._handler;
	definition.argument = argument;

	StageBinding.presentViewDefinition ( definition , this);

	this._releaseKeyboard ();
}

HTMLDataDialogBinding.prototype.getContextContainer = function () {

	var result = null;
	if (this.getProperty("containerclasses") != undefined) {
		var ancestorContainer = ContextContainer.getAncestorContextContainer(this);
		result = (ancestorContainer == null) ? new ContextContainer() : ancestorContainer.clone();
		result.setContainerClasses(this.getProperty("containerclasses"));
	}
	return result;
}