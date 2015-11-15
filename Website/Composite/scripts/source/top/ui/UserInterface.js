/**
 * @class
 * UserInterface.
 */
var UserInterface = new function () {
	
	/*
	 * This binding implementation is browser specific!
	 */
	var editortextboximpl = ( Client.isMozilla ? MozEditorTextBoxBinding : IEEditorTextBoxBinding );
	
	/*
	 * Application scope binding mappings. 
	 * These may be overruled locally.
	 */
	var mapping = new UserInterfaceMapping ({
	
		"body"							: RootBinding,
		"ui:binding"					: Binding,
		"ui:box"						: Binding,
		"ui:brandsnippet"				: BrandSnippetBinding,
		"ui:dialog"						: DialogBinding,
		"ui:dialoghead"					: DialogHeadBinding,
		"ui:dialogbody"					: DialogBodyBinding,
		"ui:dialogset"					: DialogSetBinding,
		"ui:dialogborder"				: DialogBorderBinding,
		"ui:dialogcover"				: DialogCoverBinding,
		"ui:titlebar"					: DialogTitleBarBinding,
		"ui:titlebarbody"				: DialogTitleBarBodyBinding,
		"ui:window"						: WindowBinding,
		"ui:controlgroup"				: ControlGroupBinding,
		"ui:control"					: ControlBinding,
		"ui:menubar" 					: MenuBarBinding,
		"ui:menu" 						: MenuBinding,
		"ui:menubody" 					: MenuBodyBinding,
		"ui:menugroup" 					: MenuGroupBinding,
		"ui:menuitem" 					: MenuItemBinding,
		"ui:menupopup" 					: MenuPopupBinding,
		"ui:tabbox" 					: TabBoxBinding,
		"ui:tabs" 						: TabsBinding,
		"ui:tab" 						: TabBinding,
		"ui:tabpanels" 					: TabPanelsBinding,
		"ui:tabpanel" 					: TabPanelBinding,
		"ui:splitbox" 					: SplitBoxBinding,
		"ui:splitpanel" 				: SplitPanelBinding,
		"ui:splitter" 					: SplitterBinding,
		"ui:decks" 						: DecksBinding,
		"ui:deck" 						: DeckBinding,
		"ui:toolbar" 					: ToolBarBinding,
		"ui:toolbargroup"				: ToolBarGroupBinding,
		"ui:toolbarbody"				: ToolBarBodyBinding,
		"ui:toolbarbutton" 				: ToolBarButtonBinding,
		"ui:toolbarlabel" 				: ToolBarLabelBinding,
		"ui:labelbox" 					: LabelBinding,
		"ui:text" 						: TextBinding,
		"ui:clickbutton" 				: ClickButtonBinding,
		"ui:tree" 						: TreeBinding,
		"ui:treebody" 					: TreeBodyBinding,
		"ui:treenode" 					: TreeNodeBinding,
		"ui:flexbox" 					: FlexBoxBinding,
		"ui:scrollbox" 					: ScrollBoxBinding,
		"ui:popupset" 					: PopupSetBinding,
		"ui:popup" 						: PopupBinding,
		"ui:sourceeditor"				: CodeMirrorEditorBinding,
		"ui:visualeditor" 				: VisualEditorBinding,
		"ui:visualmultieditor" 			: VisualMultiEditorBinding,
		"ui:visualmultitemplateeditor" 	: VisualMultiTemplateEditorBinding,
		"ui:wysiwygeditortoolbarbutton" : EditorToolBarButtonBinding, // needed?
		"ui:dock" 						: DockBinding,
		"ui:docktabs" 					: DockTabsBinding,
		"ui:docktab" 					: DockTabBinding,
		"ui:dockpanels" 				: DockPanelsBinding,
		"ui:dockpanel"					: DockPanelBinding,
		"ui:page"						: PageBinding,
		"ui:editorpage"					: EditorPageBinding,
		"ui:dialogpage"					: DialogPageBinding,
		"ui:pagebody"					: DialogPageBodyBinding,
		"ui:wizardpage"					: WizardPageBinding,
		"ui:explorer" 					: ExplorerBinding,
		"ui:explorermenu" 				: ExplorerMenuBinding,
		"ui:explorertoolbar" 			: ExplorerToolBarBinding,
		"ui:explorertoolbarbutton"		: ExplorerToolBarButtonBinding,
		"ui:stagecontainer"				: StageContainerBinding,
		"ui:stage"						: StageBinding,
		"ui:stagedecks"					: StageDecksBinding,
		"ui:stagedeck"					: StageDeckBinding,
		"ui:viewset"					: ViewSetBinding,
		"ui:view"						: ViewBinding,
		"ui:broadcasterset"				: BroadcasterSetBinding,
		"ui:broadcaster"				: BroadcasterBinding,
		"ui:fields"						: FieldsBinding,
		"ui:fieldgroup"					: FieldGroupBinding,
		"ui:field"						: FieldBinding,
		"ui:fielddesc"					: FieldDescBinding,
		"ui:fielddata"					: FieldDataBinding,
		"ui:fieldhelp"					: FieldHelpBinding,
		"ui:datainput"					: DataInputBinding,
		"ui:selector"					: SelectorBinding,
		"ui:simpleselector"				: SimpleSelectorBinding,
		"ui:multiselector"				: MultiSelectorBinding,
		"ui:datainputselector"			: DataInputSelectorBinding,
		"ui:datainputdialog"			: DataInputDialogBinding,
		"ui:urlinputdialog"				: UrlInputDialogBinding,
		"ui:datainputbutton"			: DataInputButtonBinding,
		"ui:textbox"					: TextBoxBinding,
		"ui:editortextbox"				: editortextboximpl,
		"ui:radiodatagroup"				: RadioDataGroupBinding,
		"ui:radio"						: RadioDataBinding,
		"ui:checkbutton"				: CheckButtonBinding,
		"ui:checkbox"					: CheckBoxBinding,
		"ui:checkboxgroup"				: CheckBoxGroupBinding,
		"ui:datadialog"					: DataDialogBinding,
		"ui:postbackdialog"				: PostBackDataDialogBinding,
		"ui:nullpostbackdialog"			: NullPostBackDataDialogBinding,
		"ui:htmldatadialog"				: HTMLDataDialogBinding,
		"ui:functioneditor"				: FunctionEditorDataBinding,
		"ui:parametereditor"			: ParameterEditorDataBinding,
		"ui:keyset"						: KeySetBinding,
		"ui:cover"						: CoverBinding,
		"ui:uncover"					: UncoverBinding,
		"ui:cursor"						: CursorBinding,
		"ui:dialogtoolbar"				: DialogToolBarBinding,
		"ui:focus"						: FocusBinding,
		"ui:balloonset"					: BalloonSetBinding,
		"ui:balloon"					: BalloonBinding,
		"ui:error"						: ErrorBinding,
		"ui:progressbar"				: ProgressBarBinding,
		"ui:lazybinding"				: LazyBindingBinding,
		"ui:sourcecodeviewer"			: SourceCodeViewerBinding,
		"ui:theatre"					: TheatreBinding,
		"ui:persistance"				: PersistanceBinding,
		"ui:filepicker"					: FilePickerBinding,
		"ui:request"					: RequestBinding,
		"ui:response"					: ResponseBinding,
		"ui:stylesheet"					: StyleBinding
	});
	
	/*
	 * @type {SystemLogger}
	 */
	var logger = SystemLogger.getLogger ( "UserInterface" );
	
	/*
	 * Indexing an object with two properties, "element" and "binding".
	 * @type {HashMap<string><object>}
	 */
	var keys = {};
	
	/**
	 * Regsiter element with binding implementation. If you omit the binding 
	 * implementation, we will search the element environment for the most 
	 * likely binding to register with.
	 * @param {DOMElement} element
	 * @param {Binding} impl Optional
	 * @return {Binding} Returns null if no suitable Binding was found.
	 */
	this.registerBinding = function ( element, impl ) {
		
		var binding = null;
		
		if ( !this.hasBinding ( element )) {
		
			var parentWindow = DOMUtil.getParentWindow ( element );
			
			if ( DOMUtil.getLocalName ( element ) != "bindingmapping" ) {
				
				// setup the quick and dirty way of assigning a custom binding
				if ( !impl && element.getAttribute ( "binding" ) != null ) {
					var bindingstring = element.getAttribute ( "binding" );
					impl = parentWindow [ bindingstring ];
					if ( impl == null ) {
						throw "No such binding in scope: " + bindingstring;
					}
				}
				
				// check for local scope binding mapping
				if ( !impl ) {
					var manager = parentWindow.DocumentManager;
					if ( manager ) {
						var custom = manager.customUserInterfaceMapping;
						if ( custom ) {
							impl = custom.getBindingImplementation ( element );
						}
					}
				}
				
				// check for global scope binding mapping
				if ( !impl ) {
					impl = mapping.getBindingImplementation ( element );
				}
				
				// instantiate new binding
				if ( impl != null && !Application.isMalFunctional ) {
					try {
						binding = new impl ();
					} catch ( exception ) {
						Application.isMalFunctional = true;
						alert ( "No such binding!\n" + exception.message + ( exception.stack ? "\n" + exception.stack : "" ));
						throw ( exception );
					}
				}
				
				// register element and binding, invoking the bindings onBindingRegister method. 
				if ( binding ) {
				
					var key = KeyMaster.getUniqueKey ();
					element.setAttribute ( "key", key );
					binding.key = key;
					if ( !element.id ) {
						element.id = key;
					}
					keys [ key ] = {
						element : element,
						binding : binding
					}
					binding.onBindingRegister ();
				}
			}
		}
		
		/*
		 * Finally return the binding.
		 */
		return binding;
	}
	
	/**
	 * Unregister binding. This will destroy the binding.
	 * @param {Binding} binding
	 */
	this.unRegisterBinding = function ( binding ) {
		
		terminate ( binding );
	}
	
	/**
	 * Terminate Binding.
	 */
	function terminate ( binding ) {
		
		if ( Binding.exists ( binding ) == true ) {
			var key = binding.key; 
			Binding.destroy ( binding );
			if ( key ) {
				if ( keys [ key ]) {
					keys [ key ].binding = null;
					keys [ key ].element = null;
					delete keys [ key ];
					binding = null;
				} else {
					logger.error ( "URGH: " + key );
				}
			}
		}
	}
	
	/**
	 * @param {Binding} binding
	 * @return {DOMElement}
	 * @deprecated
	 */
	this.getElement = function ( binding ) {
	
		var result = null;
		if ( keys [ binding.key ]) {
			result = keys [ binding.key ].element;
		}
		return result;
	}
	
	/**
	 * Get binding by bound element.
	 * @param {DOMElement} element
	 * @return {Binding}
	 */
	this.getBinding = function ( element ) {
	
		var result = null;
		if ( element && element.nodeType == Node.ELEMENT_NODE ) {
			try {
				var key = element.getAttribute ( "key" );
				if ( key && keys [ key ]) {
					result = keys [ key ].binding;
				}
			} catch ( exception ) { // if this happens, you can usually solve with a timeout
				alert ( "getBinding exception occurred on element:\n\n\t\t" + element );
				if ( exception.stack ) {
					alert ( exception.stack );
				}
			}
		}
		return result;
	}
	
	/**
	 * Get binding by key.
	 * @param {string} key
	 * @return {Binding}
	 */
	this.getBindingByKey = function ( key ) {
		
		var result = null;
		if ( keys [ key ]) {
			result = keys [ key ].binding;
		}
		return result;
	}
	
	/**
	 * @param {DOMElement} element
	 * @return {boolean}
	 */
	this.hasBinding = function ( element ) {
	
		return this.getBinding ( element ) != null;
	}
	
	/**
	 * TODO: explain this!
	 */
	this.isBindingVisible = function ( binding ) {
		
		/*
		 * Note that we return false while startup up 
		 * for reasons of very small performance gain.
		 */
		var result = Application.isOperational;
		
		if ( result == true ) {
			
			/*
			 * TODO: construct this crawler only once!
			 */
			var crawler = new Crawler ();
			crawler.type = NodeCrawler.TYPE_ASCENDING;
			crawler.id = "visibilitycrawler";
			crawler.addFilter ( function ( element ) {
				var b = UserInterface.getBinding ( element );
				var res = 0;
				if ( !b.isVisible ) {
					result = false;
					res = NodeCrawler.STOP_CRAWLING;
				}
				return res;
			});
			crawler.crawl ( binding.bindingElement );
			crawler.dispose ();
		}
		return result;
	}
	
	// DEBUG STUFF ................................................................
	
	var debugKeys = null;
	
	/**
	 * Counting active Binding instances.
	 * @return {int}
	 */
	this.getBindingCount = function () {
	
		var count = 0;
		for ( var key in keys ) {
			count ++;
		}
		return count;
	}
	
	/*
	 * Copy all keys to a reference hashmap.
	 */
	this.setPoint = function () {
	
		debugKeys = {};
		for ( var key in keys ) {
			debugKeys [ key ] = true;
		}
	}
	
	/*
	 * Return list of NEW keys since point was set (see setPoint). 
	 * This can be used to pinpoint bindings not properly disposed.
	 * @return {List<string>}
	 */
	this.getPoint = function () {
		
		var result = null;
		if ( debugKeys ) {
			result = new List ();
			for ( var key in keys ) {
				if ( !debugKeys [ key ]) {
					result.add ( key );
				}
			}
		}
		return result;
	}
	
	/*
	 * Enough point.
	 */
	this.clearPoint = function () {
		
		debugKeys = null;
	}
	
	/**
	 * Tracking undisposed bindings.
	 */
	this.trackUndisposedBindings = function () {
		
		var report = null;
		
		for ( var key in keys ) {
			var entry = keys [ key ];
			if ( !entry.binding || !entry.element || !Binding.exists ( entry.binding )) {
				if ( !report ) {
					report = "Bindings illdisposed: ";
				}
				report += entry.binding + " ";
			}
		}
		if ( report != null ) {
			logger.error ( report );
		}
	}
	
	/**
	 * Autotrack.
	 * @param {boolean} isTrack
	 */
	this.autoTrackDisposedBindings = function ( isTrack ) {
		
		if ( isTrack ) {
			if ( !window.disposedbindingtrackinterval ) {
				window.disposedbindingtrackinterval = window.setInterval ( 
					UserInterface.trackUndisposedBindings, 10000 
				);
				this.trackUndisposedBindings ();
			}
		} else if ( window.disposedbindingtrackinterval ) {
			window.clearInterval ( window.disposedbindingtrackinterval );
			window.disposedbindingtrackinterval = null;
		}
	}
}