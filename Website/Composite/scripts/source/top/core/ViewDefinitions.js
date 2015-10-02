/**
 * @type {HashMap<string><ViewDefinition>}
 */
var ViewDefinitions = {
		
	/*
	 * The "null" definition is substituted for other definitions 
	 * when a view gets released from server control.
	 */
	"Composite.Management.Null" : new HostedViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.Management.Null"
	}),
	
	/*
	 * Postback dialog.
	 */
	"Composite.Management.PostBackDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.PostBackDialog",
		isMutable	: true,
		position 	: Dialog.MODAL,
		url			: "${root}/content/dialogs/postback/postbackdialog.aspx",
		argument 	: {
			"url"	: null,
			"list"	: null
		}
	}),
	
	/*
	 * Postback view. Load framework file using HTTP post (in addition to GET).  
	 * Use this to display framework stuff. Pages with a PageBinding, that is.
	 */
	"Composite.Management.PostBackView" : new HostedViewDefinition ({
		handle 		: "Composite.Management.PostBackView",
		isMutable	: true,
		position 	: DockBinding.MAIN,
		url			: "${root}/postback.aspx",
		argument 	: {
			"url"	: null,
			"list"	: null
		}
	}),
	 
	/*
	 * Generic views. Load PageBinding and inject any URL into a WindowBinding. 
	 * Use this to display non-framework stuff such as previews and thingies.
	 */
	"Composite.Management.GenericView" : new HostedViewDefinition ({
		handle 		: "Composite.Management.GenericView",
		isMutable	: true,
		position 	: DockBinding.MAIN,
		url 		: "${root}/content/views/generic/generic.aspx",
		label 		: null,
		image 		: null,
		toolTip		: null,
		argument 	: {
			"url"	: null,
			"list"	: null
		}
	}),

	"Composite.Management.ExternalView" : new HostedViewDefinition ({
		handle		: "Composite.Management.ExternalView",
		isMutable	: true,
		position	: DockBinding.EXTERNAL,
		url			: null,
		label		: null,
		image		: null,
		toolTip		: null
	}),

	/*
	 * Start.
	 */
	"Composite.Management.Start" : new HostedViewDefinition ({
		handle 		: "Composite.Management.Start",
		position 	: DockBinding.START,
		label 		: "Welcome Travellers", 
		isFloating	: false,
		url 		: "${root}/content/views/start/start.aspx"
	}),
	
	/*
	 * About.
	 */
	"Composite.Management.About" : new DialogViewDefinition ({
		handle 		: "Composite.Management.About",
		position 	: Dialog.MODAL,
		url 		: "${root}/content/dialogs/about/about.aspx"
	}),
	
	/*
	 * Permission editor.
	 */
	"Composite.Management.PermissionEditor" :  new HostedViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.Management.PermissionEditor",
		position 	: DockBinding.MAIN,
		url 		: "${root}/content/views/editors/permissioneditor/permissioneditor.aspx",
		argument 	: {
			serializedEntityToken : "entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""
		}
	}),
	
	/*
	 * System Log.
	 */
	"Composite.Management.SystemLog" : new HostedViewDefinition ({
		handle		: "Composite.Management.SystemLog",
		position 	: DockBinding.ABSBOTTOMLEFT,
		label 		: "System Log",
		url 		: "${root}/content/views/dev/systemlog/systemlog.aspx"
	}),
	
	/*
	 * Developer Panel.
	 */
	"Composite.Management.Developer" : new HostedViewDefinition ({
		handle 		: "Composite.Management.Developer",
		position 	: DockBinding.ABSBOTTOMRIGHT,
		label 		: "Developer", 
		url 		: "${root}/content/views/dev/developer/developer.aspx"
	}),
	
	/*
	 * Icon Pack Sprite SVG.
	 */
	"Composite.Management.IconPack.SpriteSVG": new HostedViewDefinition({
		handle: "Composite.Management.IconPack.SpriteSVG",
		position: DockBinding.MAIN,
		label: "Sprite SVG",
		image: "${icon:icon}",
		url: "${root}/content/views/dev/icons/svg/sprite.cshtml"
	}),
	
	/*
	 * Options dialog.
	 */
	"Composite.Management.Options" : new DialogViewDefinition ({
		handle 		: "Composite.Management.Options",
		position 	: Dialog.MODAL,
		url 		: "${root}/content/dialogs/options/options.aspx",
		label		: "Options"
	}),
	
	/*
	 * VisualEditor dialog.
	 */
	"Composite.Management.VisualEditorDialog" : new DialogViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.Management.VisualEditorDialog",
		position 	: Dialog.MODAL,
		url 		: "${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",
		width		: 1280, height : 800,
		argument	: {
			"formattingconfiguration"	: null,
			"embedablefieldstypenames"	: null
		}
	}),
	
	/*
	 * MultiSelector dialog.
	 */
	"Composite.Management.MultiSelectorDialog" : new DialogViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.Management.MultiSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: "${root}/content/dialogs/multiselector/multiselectordialog.aspx"
	}),
	
	/*
	 * Search view.
	 */
	"Composite.Management.Search" : new HostedViewDefinition ({
		handle 		: "Composite.Management.Search",
		position	: DockBinding.RIGHTBOTTOM,
		url			: "${root}/content/views/search/search.aspx",
		label		: "Search",
		image		: "${icon:view_search}",
		argument	: null
	}),
	
	/*
	 * Page Browser.
	 */
	"Composite.Management.Browser" : new HostedViewDefinition ({
		isMutable	: false,
		isPinned	: true,
		handle 		: "Composite.Management.Browser",
		position	: DockBinding.MAIN,
		perspective	: ExplorerBinding.PERSPECTIVE_CONTENT,
		label       : "${string:Composite.Management:Browser.Label}",
		image		: "${icon:page-view-administrated-scope}",
		toolTip     : "${string:Composite.Management:Browser.ToolTip}",
		url			: "${root}/content/views/browser/browser.aspx",
		argument	: { "URL" : null }
	}),
	
	/*
	 * SEO Assistant.
	 */
	"Composite.Management.SEOAssistant" : new HostedViewDefinition ({
		handle 		: "Composite.Management.SEOAssistant",
		position: DockBinding.ABSBOTTOMRIGHT,
		perspective	: ExplorerBinding.PERSPECTIVE_CONTENT,
		url			: "${root}/content/views/seoassist/seoassist.aspx",
		label		: "${string:Composite.Web.SEOAssistant:SEOAssistant}",
		image		: "${icon:seoassistant}",
		toolTip		: "${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"
	}),
	
	/*
	 * Source code viewer.
	 */
	"Composite.Management.SourceCodeViewer" : new HostedViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.Management.SourceCodeViewer",
		position	:  DockBinding.ABSBOTTOMLEFT,
		url			: "${root}/content/views/dev/viewsource/viewsource.aspx",
		argument 	: { 
			"action" : null, // {string}
			"viewBinding" : null // {ViewBinding}
		}
	}),
	
	/*
	 * User source code viewer.
	 */
	"Composite.User.SourceCodeViewer" : new HostedViewDefinition ({
		isMutable	: true,
		handle 		: "Composite.User.SourceCodeViewer",
		position	:  DockBinding.BOTTOMLEFT,
		url			: "${root}/content/views/dev/viewsource/viewsource.aspx",
		argument 	: { 
			"action" : null, // {string}
			"viewBinding" : null // {ViewBinding}
		}
	}),
	
	/*
	 * Help.
	 */
	"Composite.Management.Help" : new HostedViewDefinition ({
		label		: "${string:Website.App.LabelHelp}",
		image		: "${icon:help}", // ${root}/images/icons/republic/republic_0534/0534_16px_Republic_32bit_PNG.png
		handle 		: "Composite.Management.Help",
		position	:  DockBinding.ABSRIGHTTOP,
		url			: "${root}/content/views/help/help.aspx"
	}),
	
	/*
	 * Translations.
	 */
	"Composite.Management.Dialog.Translations" : new DialogViewDefinition ({
		handle 		: "Composite.Management.TranslationsDialog",
		position 	: Dialog.MODAL,
		url 		: "${root}/content/dialogs/translations/translations.aspx",
		label		: "Translations",
		image		: "${icon:users-changepublicculture}"
	}),
	
	
	// SELECTORS ......................................................................
	
	/*
	 * Image selector.
	 */
    "Composite.Management.ImageSelectorDialog": new DialogViewDefinition({
        isMutable   : true,
		handle 		: "Composite.Management.ImageSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_IMAGESELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.Image.SelectDialog.Title}",
			image				: "${icon:image}",
			selectionProperty 	: "ElementType",
			selectionValue      : "image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",
			selectionResult		: "Uri",
			nodes : [{
				key : "MediaFileElementProvider",
				search : "MediaFileElementProvider.WebImages"
			}]
		}
    }),

	/*
	* Writable Media Folder selector.
	*/
	"Composite.Management.MediaWritableFolderSelectorDialog": new DialogViewDefinition({
		isMutable: true,
		handle: "Composite.Management.MediaWritableFolderSelectorDialog",
		position: Dialog.MODAL,
		url: Dialog.URL_TREEACTIONSELECTOR,
		argument: {
			label: "${string:Composite.Management:Website.Folder.SelectDialog.Title}",
			image: "${icon:image}",
			selectionProperty: "ReadOnly",
			selectionValue: "False",
			selectionResult: "EntityToken",
			actionGroup: "Folder",
			nodes: [{
				key: "MediaFileElementProvider",
				search: "MediaFileElementProvider.WritableFolders"
			}]
		}
	}),
	
	/*
	 * Embeddable media selector.
	 */
"Composite.Management.EmbeddableMediaSelectorDialog": new DialogViewDefinition({
        isMutable   : true,
		handle 		: "Composite.Management.EmbeddableMediaSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREEACTIONSELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.Media.SelectDialog.Title}",
			image				: "${icon:media}",
			selectionProperty 	: "ElementType",
			selectionValue		: null,
			selectionResult		: "Uri",
			nodes : [{
				key : "MediaFileElementProvider",
				search : null //"MediaFileElementProvider.EmbeddableMedia" - kaput!
			}]
		}
	}),
	
	/*
	 * Frontend file selector.
	 */
	"Composite.Management.FrontendFileSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.EmbeddableMediaSelectorDialog",
		position 	: Dialog.MODAL,
		url			: Dialog.URL_TREEACTIONSELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",
			image				: "${icon:media}",
			selectionProperty 	: "ElementType",
			selectionValue		: null,
			selectionResult		: "Uri",
			nodes : [{
				key : "LayoutFileElementProvider"
			}]
		}
	}),
	
	/*
	 * Page URL selector.
	 */
	"Composite.Management.PageSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.PageSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREESELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.Page.SelectDialog.Title}",
		    image               : "${icon:page}",
			selectionProperty 	: "Uri",
			selectionValue		: null, // MimeTypes.COMPOSITEPAGES
			selectionResult		: "Uri",
			nodes : [{
				key : "PageElementProvider"
			}]
		}
	}),

    /*
    * Page Id selector.
    */
    "Composite.Management.PageIdSelectorDialog": new DialogViewDefinition({
        handle: "Composite.Management.PageIdSelectorDialog",
        isMutable: true,
        position: Dialog.MODAL,
        url: Dialog.URL_TREESELECTOR,
        argument: {
            label               : "${string:Composite.Management:Website.Page.SelectDialog.Title}",
            image               : "${icon:page}",
            selectionProperty   : "DataId",
            selectionValue      : null, // MimeTypes.COMPOSITEPAGES
            selectionResult     : "DataId",
            nodes: [{
                key: "PageElementProvider"
            }]
        }
    }),
	
	/*
	 * Linkable element selector (selecting pages and media files).
	 */
	"Composite.Management.LinkableSelectorDialog" : new DialogViewDefinition ({
	    handle: "Composite.Management.LinkableSelectorDialog",
	    isMutable   : true,
		position 	: Dialog.MODAL,
		url			: Dialog.URL_TREEACTIONSELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",
		    image               : "${icon:link}",
			selectionProperty 	: "Uri",
			selectionValue		: null,
			selectionResult		: "Uri",
			nodes : [
				{ key : "PageElementProvider" },
				{ key : "MediaFileElementProvider" }
			]
		}
	}),
	
	/*
	 * Media selector (images and other stuff).
	 */
	"Composite.Management.MediaSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.MediaSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREESELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",
			image				: "${icon:link}",
			selectionProperty 	: "Uri",
			selectionValue		: null,
			selectionResult		: "Uri",
			nodes : [
				{ key : "MediaFileElementProvider" }
			]
		}
	}),
	
	/*
	 * Function selector (ALL TYPES).
	 */
	"Composite.Management.FunctionSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.FunctionSelectorDialog",
		isMutable	: true,
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREESELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.Function.SelectDialog.Title}",
			image				: "${icon:functioncall}",
			selectionProperty 	: "ElementType",
			selectionValue		: MimeTypes.COMPOSITEFUNCTION,
			selectionResult		: "ElementId",
			nodes : [{
				key : "AllFunctionsElementProvider"
			}]
		}
	}),
	
	/*
	 * Function selector (widget functions).
	 */
	"Composite.Management.WidgetFunctionSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.WidgetFunctionSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREESELECTOR,
		argument : {
		    label               : "${string:Composite.Management:Website.Widget.SelectDialog.Title}",
		    image               : "${icon:functioncall}",
			selectionProperty 	: "ElementType",
			selectionValue		: MimeTypes.COMPOSITEFUNCTION,
			selectionResult		: "ElementId",
			nodes : [{
				key : "AllWidgetFunctionsElementProvider"
			}]
		}
	}),
	
	/*
	 * Function selector (XHTML types).
	 */
	"Composite.Management.XhtmlDocumentFunctionSelectorDialog" : new DialogViewDefinition ({
		handle 		: "Composite.Management.XhtmlDocumentFunctionSelectorDialog",
		position 	: Dialog.MODAL,
		url 		: Dialog.URL_TREESELECTOR,
		argument : {
			label 				: "${string:Composite.Management:Website.Function.SelectDialog.Title}",
			image				: "${icon:functioncall}",
			selectionProperty 	: "ElementType",
			selectionValue		: MimeTypes.COMPOSITEFUNCTION,
			selectionResult		: "ElementId",
			nodes : [{
				key : "AllFunctionsElementProvider",
				search : "AllFunctionsElementProvider.VisualEditorFunctions"
			}]
		}
	})
}

