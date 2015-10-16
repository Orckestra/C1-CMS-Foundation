VisualEditorBoxBinding.prototype = new Binding;
VisualEditorBoxBinding.prototype.constructor = VisualEditorBoxBinding;
VisualEditorBoxBinding.superclass = Binding.prototype;

/**
 * @class
 */
function VisualEditorBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorBoxBinding" );
	
	/**
	 * @type {VisualEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * Subtree binding attachment delayed until editor has loaded.
	 * @overwrites {Binding#isLazy}
	 */
	this.isLazy = true;


	/**
	 * @type {int}
	 */
	this.lastHeight = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorBoxBinding.prototype.toString = function () {

	return "[VisualEditorBoxBinding]";
}


/**
 * Register for initialization when TinyMCE is loaded.
 * @overloads {ToolBarBinding#onBindingAttach}
 */
VisualEditorBoxBinding.prototype.onBindingAttach = function () {
	
	VisualEditorBoxBinding.superclass.onBindingAttach.call ( this );
	
	/*
	 * Rigup editor component.
	 */
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
	
	/*
	 * Size the damn cover for IE.
	 */
	if ( Client.isExplorer ) {
		var cover = this.bindingWindow.bindingMap.toolbarscover;
		cover.setHeight ( this.boxObject.getDimension ().h );
	}
}

/**
 * Setup to initialize when TinyMCE is loaded and containng EditorBinding initializes.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
VisualEditorBoxBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._editorBinding.addActionListener ( VisualEditorBinding.ACTION_INITIALIZED, this );

	theme.registerNodeChangeHandler(this);
}


/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
VisualEditorBoxBinding.prototype.handleAction = function ( action ) {

	VisualEditorBoxBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	/*
	 * This binding is LAZY. We attach toolbar content 
	 * only when editor content has finished loading. 
	 * This will be percieved as a faster load. 
	 */
	switch ( action.type ) {
		case VisualEditorBinding.ACTION_INITIALIZED :
			if ( binding == this._editorBinding ) {
				var self = this;
				setTimeout ( function () {
					self._initialize ();
				}, 100 );
			}
			break;
	}
}

/**
* Handle node change.
* @implements {IWysiwygEditorNodeChangeHandler}
* @param {DOMElement} element
*/
VisualEditorBoxBinding.prototype.handleNodeChange = function (element) {
	var self = this;
	setTimeout(
		function () {
			var height = self.bindingElement.offsetHeight;
			if (self.lastHeight != height) {
				self.lastHeight = height;
				self.bindingWindow.bindingMap.tinyflexbox.flex();
			}
				
		}, 0);
};

/**
 * Initialize. By default, this simply attaches subtree bindings.
 */
VisualEditorBoxBinding.prototype._initialize = function () {
	
	this._editorBinding.removeActionListener ( VisualEditorBinding.ACTION_INITIALIZED, this );
	this.attachRecursive ();
	//this.bindingWindow.bindingMap.toolbarscover.hide ();
	CoverBinding.fadeOut ( this.bindingWindow.bindingMap.toolbarscover );
}