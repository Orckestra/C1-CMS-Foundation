/**
open="false" * @class
 */
var Developer = new function () {
	
	var keys = {
			
		// VIEWS ............................................................................
		
			// ASPX views.
			"xslt-preview"	                : "${root}/../Spikes/Maw/XsltPreviewMarkup.aspx",
			"widget-editor"	                : "${root}/../Spikes/Maw/WidgetEditor.aspx",
			"execition-ended"				: "${root}/content/flow/FlowUICompleted.aspx",
			"server-error"					: "${root}/content/misc/errors/error.aspx",
			"update-panel"	                : "${root}/../Spikes/JEM/UpdatePanelDebug.aspx",
			
			/*
			"editor-renderingeditor" 		: "${root}/content/views/editors/renderingeditor/renderingeditor.aspx",
			"editor-querytreeeditor" 		: "${root}/content/views/editors/querytreeeditor/querytreeeditor.aspx",
			"editor-imageeditor" 			: "${root}/content/views/editors/imageeditor/imageeditor.aspx?src=../../../../content/dialogs/wysiwygeditor/images/sample.jpg",
			*/
			
			"test-flexperimental"			: "${root}/content/views/dev/developer/tests/ui/flexperimental.aspx",
			"test-crawlers"					: "${root}/content/views/dev/developer/tests/ui/crawlers.aspx",
			
			"test-pageeditorfull"			: "${root}/content/views/dev/developer/tests/ui/pageeditorfull.aspx",
			"test-xslt"						: "${root}/content/views/dev/developer/tests/ui/xslt.aspx",
			"test-memory"					: "${root}/content/views/dev/developer/tests/ui/memory.aspx",
			"test-persistance"				: "${root}/content/views/dev/developer/tests/ui/persistance.aspx",
			"test-domevents"				: "${root}/content/views/dev/developer/tests/ui/domevents.aspx",
			"test-actionended"				: "${root}/FlowUICompleted.aspx",
			
			// GUI library tests.
			"test-sourcecodeviewers"		: "${root}/content/views/dev/developer/tests/ui/sourcecodeviewers.aspx",
			"test-icons"					: "${root}/content/views/dev/developer/tests/ui/icons.aspx",
			"test-iebug"					: "${root}/content/views/dev/developer/tests/ui/iebug.aspx",
			"test-relations"				: "${root}/content/views/dev/developer/tests/fields/relations.aspx",
			"test-fields-selectors"			: "${root}/content/views/dev/developer/tests/fields/selectors.aspx",
			"test-fields-datainputs"		: "${root}/content/views/dev/developer/tests/fields/datainputs.aspx",
			"test-fields-specialdatainputs" : "${root}/content/views/dev/developer/tests/fields/specialdatainputs.aspx",
			"test-fields-htmldatadialog"	: "${root}/content/views/dev/developer/tests/fields/htmldatadialog.aspx",
			"test-lazy" 					: "${root}/content/views/dev/developer/tests/fields/lazybindings.aspx",
			"test-fields-sourcecode"		: "${root}/content/views/dev/developer/tests/fields/sourcodeeditors.aspx",
			"test-fields-sourceedit"		: "${root}/content/views/dev/developer/tests/fields/sourceeditors.aspx",
			"test-fields-visualedit"		: "${root}/content/views/dev/developer/tests/fields/visualeditors.aspx",
			"test-fields-wysiwyg"			: "${root}/content/views/dev/developer/tests/fields/wyswiwygeditors.aspx",
			"test-textboxes" 				: "${root}/content/views/dev/developer/tests/fields/textboxes.aspx",
			"test-checkboxes"				: "${root}/content/views/dev/developer/tests/fields/checkboxes.aspx",
			"test-radiogroups"				: "${root}/content/views/dev/developer/tests/fields/radiogroups.aspx",
			"test-fields"					: "${root}/content/views/dev/developer/tests/fields/all/fields.aspx",
			"test-trees" 					: "${root}/content/views/dev/developer/tests/ui/trees.aspx",
			"test-splitboxes" 				: "${root}/content/views/dev/developer/tests/ui/splitboxes.aspx",
			"test-tabboxes" 				: "${root}/content/views/dev/developer/tests/ui/tabboxes.aspx",
			"test-buttons" 					: "${root}/content/views/dev/developer/tests/ui/buttons.aspx",
			"test-menus" 					: "${root}/content/views/dev/developer/tests/ui/menus.aspx",
			"test-focus" 					: "${root}/content/views/dev/developer/tests/ui/focus.aspx",
			"test-special" 					: "${root}/content/views/dev/developer/tests/ui/special.aspx",
			"test-style"					: "${root}/content/views/dev/developer/tests/ui/style.aspx",
			"test-nulltreeselect"			: "${root}/content/views/dev/developer/tests/fields/nulltreeselector.aspx",
			"test-nonframework"				: "${root}/content/views/dev/developer/tests/fields/nonframework.aspx",
			
			"test-marcusfun" 				: "${root}/content/views/dev/developer/tests/fields/postbackfun.aspx", 
			"test-dmitryfun" 				: "${root}/content/views/dev/developer/tests/ui/dmitryfun.aspx",
			"test-mothfun" 					: "${root}/content/views/dev/developer/tests/ui/updatemanager/updatemanager.aspx",
			
		// DAILOGS ............................................................................
		
			// special dialogs
			"dialog-imageselector"			: null, // see below
			"server-error-dialog"			: "${root}/content/misc/errors/error_dialog.aspx",
		
			// APSX dialogs.
			"dialog-function-parameters"    : "${root}/content/dialogs/functions/editFunctionCall.aspx?functionmarkup=<function name=\"Composite.Date.Now\" xmlns=\"http://www.composite.net/ns/function/1.0\"></function>",
			
			// Dialog types
			"dialog-autoheight"				: "${root}/content/dialogs/tests/autoheight/autoheightdialog.aspx",
			"dialog-fixedheight"			: "${root}/content/dialogs/tests/fixedheight/fixedheightdialog.aspx",
			"dialog-subpages"				: "${root}/content/dialogs/tests/subpages/subpagedialog.aspx",
			"dialog-textcontent"			: "${root}/content/dialogs/tests/textcontent/textcontent.aspx",
			"dialog-wizard"					: "${root}/content/dialogs/tests/wizard/wizard1.aspx",
			"dialog-no-ajax-wizard"			: "${root}/content/dialogs/tests/wizard/wizard3.aspx",
			"dialog-forcefitness-basic"		: "${root}/content/dialogs/tests/forcefitness/forcefitness-basic.aspx",
			"dialog-forcefitness-advanced"	: "${root}/content/dialogs/tests/forcefitness/forcefitness-advanced.aspx",
			"dialog-forcefitness-windowed"	: "${root}/content/dialogs/tests/forcefitness/forcefitness-windowed.aspx",
			"dialog-subpageforcefitness"    : "${root}/content/dialogs/tests/subpageforcefitness/parent.aspx",
			
			"dialog-test-infobox"			: "${root}/content/dialogs/tests/wizard/wizard4.aspx"
	}
	
	/**
	 * Load view.
	 * @param {string} url The url to load.
	 * @param {string} target The dock position.
	 */
	this.load = function ( key, target ) {
		
		switch ( key ) {
			default :
				StageBinding.presentViewDefinition ( 
					new HostedViewDefinition ({
						handle		: key,
						url 		: keys [ key ],
						position 	: target ? target : DockBinding.MAIN
					})
				);
				break;
		}
	}
	
	/**
	 * Load ViewDefinition.
	 * @param {string} url The url to load.
	 */
	this.loadView = function ( key ) {
		
		var definition = ViewDefinitions [ key ];
		StageBinding.presentViewDefinition ( 
			definition
		);
	}
	
	/**
	 * Launch modal dialog.
	 * @param {string} key
	 */
	this.launch = function ( key ) {
		
		switch ( key ) {
			case "dialog-imageselector" :
				launchImageSelector ();
				break;
			case "dialog-wysiwygimageselector" :
				launchWysiwyg ();
				break;
			default :
				Dialog.invokeModal ( keys [ key ]);
				break;
		}
	}
	
	
	// SPECIAL ......................................................................
	
	function launchWysiwyg () {
		
		var handler = {
				handleDialogResponse : function ( response, result ) {
					if ( response == Dialog.RESPONSE_ACCEPT ) {
						alert ( result );
					}
				}
			} 
				
		var arg = {
			
			// relevant for main window
			tinyAction			: "insert",
			tinyWindow			: null,
			tinyElement 		: null // TODO!
		}
		
		var URL_IMAGETREESELECTOR = "${root}/content/dialogs/wysiwygeditor/image/image.aspx";
		Dialog.invokeModal ( URL_IMAGETREESELECTOR, handler, arg );
	}
	
	
	/*
	 * Launch image selector.
	 */
	function launchImageSelector () {
	
		var handler = {
			handleDialogResponse : function ( response, result ) {
				if ( response == Dialog.RESPONSE_ACCEPT ) {
					alert ( result.getFirst ());
				}
			}
		} 
		var arg = {
			label 				: "Select Image",
			key 				: "MediaFileProviderOnlyImages",
			selectionProperty 	: "ElementType",
			selectionValue		: "image/jpeg image/gif image/png image/bmp image/tiff",
			selectionResult		: "ElementId"
		}
		Dialog.invokeModal ( Dialog.URL_TREESELECTOR, handler, arg );
	}
}
