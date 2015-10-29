/**
 * @class
 * Global broadcast messages.
 * @see {EventBroadcaster}
 * 
 * Don't instantiate this class manually. Access through 
 * instance variable "BroadcastMessages" declared below.
 * This instance should be considered a singleton class.
 */
function _BroadcastMessages () {}

/*
 * Public fields.
 */
_BroadcastMessages.prototype = {
	
	/*
	 * Application status
	 */
	APPLICATION_STARTUP					: "application startup",
	APPLICATION_LOGIN					: "application login",
	APPLICATION_LOGOUT					: "application logout",
	APPLICATION_OPERATIONAL				: "application operational",
	APPLICATION_ONSHUTDOWN				: "application onshutdown",
	APPLICATION_SHUTDOWN				: "application shutdown",
	APPLICATION_ERROR					: "application error",
	APPLICATION_BLURRED					: "application blurred",
	APPLICATION_FOCUSED					: "application focused",
	APPLICATION_KICKSTART				: "application kickstart",
	
	/*
	 * Experimental
	 */
	CODEMIRROR_LOADED					: "codemirror loaded",

	/*
	 * Mouse events
	 */
	MOUSEEVENT_MOUSEDOWN 				: "mouseevent mousedown",
	MOUSEEVENT_MOUSEUP 					: "mouseevent mouseup",
	MOUSEEVENT_MOUSEMOVE 				: "mouseevent mousemove",

	TOUCHEVENT_TOUCHSTART				: "touchevent touchstart",
	
	/*
	 * WindowManager keys
	 */
	$WINKEY_LOADED						: "${windowkey} loaded",
	$WINKEY_UNLOADED					: "${windowkey} unloaded",
	$WINKEY_EVALUATED					: "${windowkey} evaluated",
	$WINKEY_RESIZED						: "${windowkey} resized",
	$WINKEY_HRESIZED					: "${windowkey} horizontally resized",
	$WINKEY_VRESIZED					: "${windowkey} vertically resized",
	
	/*
	 * Startup milestones
	 */
	LOADED_NAVIGATOR					: "navigator loaded",
	LOADED_MAINSTAGE					: "mainstage loaded",
	LOCALSTORE_INITIALIZED				: "localstore initialized",
	PERSISTANCE_INITIALIZED				: "persistance initialized",
	STAGE_INITIALIZED					: "stage initialized",
	
	/*
	 * Keys
	 */
	KEY_SHIFT_DOWN						: "shiftkeydown",
	KEY_SHIFT_UP						: "shiftkeyup",
	KEY_CONTROL_DOWN					: "controlkeydown",
	KEY_CONTROL_UP						: "controlkeyup",
	KEY_ARROW							: "arrowkey",
	KEY_ENTER							: "enterkeydown",
	KEY_ESCAPE							: "escapekeydown",
	KEY_SPACE							: "spacekeydown",
	KEY_TAB								: "tabkeydown",
	KEY_ALT								: "altkeydown",
	KEY_CONTROLTAB						: "controltabkeysdown",
	
	/*
	 * Dragndrop
	 */
	TYPEDRAG_START						: "typedrag start",
	TYPEDRAG_STOP						: "typedrag stop",
	TYPEDRAG_PAUSE						: "typedrag pause",
	
	/*
	 * Dock events
	 */
	DOCK_MAXIMIZED						: "dockmaximized",
	DOCK_MINIMIZED						: "dockminimized",
	DOCK_NORMALIZED						: "docknormalized",
	DOCKTABBINDING_SELECT				: "docktab select",
	
	/*
	 * Tree events
	 */
	SYSTEMTREEBINDING_REFRESH			: "systemtree refresh",
	SYSTEMTREEBINDING_REFRESHALL		: "systemtree refresh all",
	SYSTEMTREEBINDING_REFRESHING		: "systemtree refreshing",
	SYSTEMTREEBINDING_REFRESHED			: "systemtree refreshed",
	SYSTEMTREEBINDING_REFRESHED_AFTER	: "systemtree refreshed after",
	SYSTEMTREEBINDING_FOCUS				: "systemtree focus",
	SYSTEMTREEBINDING_CUT  				: "systemtree cut",
	SYSTEMTREEBINDING_COPY				: "systemtree copy",
	SYSTEMTREEBINDING_PASTE 			: "systemtree paste",
	SYSTEMTREEBINDING_COLLAPSEALL		: "systemtree collapse all",
	SYSTEMTREENODEBINDING_FOCUS			: "systemtreenode focus",
	SYSTEMTREEBINDING_LOCKTOEDITOR		: "systemtreenode lock to editor",
	SYSTEMTREENODEBINDING_FORCE_OPEN	: "systemtreenode force open",
	SYSTEMTREENODEBINDING_FORCING_OPEN	: "systemtreenode forcing open",
	SYSTEMTREENODEBINDING_FORCED_OPEN	: "systemtreenode forced open",
	
	/*
	 * Start page
	 */
	START_COMPOSITE						: "startcomposite",
	STOP_COMPOSITE						: "stopcomposite",
	COMPOSITE_START						: "compositestart",
	COMPOSITE_STOP						: "compositestop",
	
	/*
	 * View events.
	 */
	VIEW_OPENING						: "view opening",
	VIEW_OPENED							: "view opened",
	VIEW_COMPLETED						: "view completed",
	CLOSE_VIEW							: "close view",
	CLOSE_VIEWS							: "close views", // close all views at DockBinding.MAIN
	VIEW_CLOSED							: "view closed",
	
	/*
	 * Editor events
	 */
	TINYMCE_INITIALIZED					: "tinymce initialized",
	CODEPRESS_INITIALIZED				: "codepress initialized",
	VISUALEDITOR_FOCUSED				: "visualeditor focused", // TODO?
	VISUALEDITOR_BLURRED				: "visualditor blurred", // TODO?
	
	/*
	 * Misc events
	 */
	PERSPECTIVE_CHANGED					: "perspective changed",
	PERSPECTIVES_NONE					: "no perspectives",
	SYSTEMLOG_OPENED					: "systemlog opened",
	SYSTEMLOG_CLOSED					: "systemlog closed",
	SYSTEMACTION_INVOKE					: "systemaction invoke",
	SYSTEMACTION_INVOKED				: "systemaction invoked",
	SYSTEM_ACTIONPROFILE_PUBLISHED		: "system actionprofile published",
	NAVIGATOR_TREENODE_SELECTED			: "navigator treenode selected",
	MODAL_DIALOG_OPENED					: "modal dialog invoked",
	MODAL_DIALOG_CLOSED					: "modal dialog closed",
	COVERBINDING_MOUSEDOWN 				: "userinterfacecoverbinding mousedown",
	SERVER_OFFLINE						: "server offline",
	SERVER_ONLINE						: "server online",
	OFFLINE_FLASH_INITIALIZED			: "offline flash initialized",
	CLOSE_CURRENT						: "close current",
	CLOSE_ALL							: "close all",
	CLOSE_ALL_DONE						: "close all done",
	SAVE_CURRENT						: "save current",
	CURRENT_SAVED						: "current saved",
	SAVE_ALL							: "save all",
	SAVE_ALL_DONE						: "save all done",
	DOCKTAB_DIRTY						: "docktab dirty",
	DOCKTAB_CLEAN						: "docktab clean",
	BINDING_RELATE						: "binding relate",
	LOCALIZATION_CHANGED				: "localization changed",
	XHTML_MARKUP_ON						: "xhtml markup on",
	XHTML_MARKUP_OFF					: "xhtml markup off",
	XHTML_MARKUP_ACTIVATE				: "xhtml markup activate",
	XHTML_MARKUP_DEACTIVATE				: "xhtml markup deactivate",
	HIGHLIGHT_KEYWORDS					: "highlight keywords",
	BIND_TOKEN_TO_VIEW					: "bind entitytoken to view",
	STAGEDIALOG_OPENED					: "stage dialog opened",
	INVOKE_DEFAULT_ACTION				: "invoke default action",
	STAGEDECK_CHANGED					: "stage deck changed",
	/*
	 * Server messages for EventBroadcaster.
	 */
	LANGUAGES_UPDATED					: "LocalesUpdated",
	FROMLANGUAGE_UPDATED				: "ForeignLocaleChanged", // tree builder language
	TOLANGUAGE_UPDATED					: "ActiveLocaleChanged", // page authoring language
	
	/*
	 * MessageQueue.
	 */
	MESSAGEQUEUE_REQUESTED				: "messagequeue requested", // when new actions are requested
	MESSAGEQUEUE_EVALUATED				: "messagequeue evaluated", // when all actions are done executing
	
	/*
	 * Mostly systemperformance
	 *
	MICROSOFTAJAXREQUEST				: "microsoft ajax request",
	POSTBACK_START						: "postback start",
	POSTBACK_STOP						: "postback stop",
	UPDATEPANEL_UPDATING				: "updatepanel updating",
	UPDATEPANELS_UPDATING				: "updatepanels updating",
	UPDATEPANELS_UPDATED				: "updatepanels updated",
	*/
	
	UPDATE_LANGUAGES					: "update languages"
}

/**
 * The instance that does it.
 * @type {_BroadcastMessages}
 */
var BroadcastMessages = new _BroadcastMessages ();