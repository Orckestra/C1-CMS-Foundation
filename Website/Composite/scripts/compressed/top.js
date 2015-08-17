var IAcceptable=new function(){
this.dragAccept="type1 type2 type3";
this.accept=function(_1){
};
};
var IActionListener=new function(){
this.handleAction=function(_2){
};
};
var IActivatable=new function(){
this.isActivatable=true;
this.activate=function(){
};
this.deActivate=function(){
};
};
var IActivationAware=new function(){
this.isActivationAware=true;
this.isActivated=false;
this.onActivate=function(){
};
this.onDeactivate=function(){
};
};
var IBroadcastListener=new function(){
this.handleBroadcast=function(_3,_4){
};
};
var ICrawlerHandler=new function(){
this.handleCrawler=function(_5){
};
};
var IData=new function(){
this.isFocusable=true;
this.validate=function(){
};
this.manifest=function(){
};
this.dirty=function(){
};
this.clean=function(){
};
this.focus=function(){
};
this.blur=function(){
};
this.getName=function(){
};
this.getValue=function(){
};
this.setValue=function(_6){
};
this.getResult=function(){
};
this.setResult=function(_7){
};
};
var IDialogResponseHandler=new function(){
this.handleDialogResponse=function(){
response,result;
};
};
var IDOMHandler=new function(){
this.fireOnDOM=function(){
};
};
var IDraggable=new function(){
this.dragType="type";
this.getImage=function(){
};
};
var IDragHandler=new function(){
this.onDragStart=function(_8){
};
this.onDrag=function(_9){
};
this.onDragStop=function(_a){
};
};
var IEditorControlBinding=new function(){
this.isEditorControlBinding=true;
};
var IEventListener=new function(){
this.handleEvent=function(e){
};
};
var IFit=new function(){
this.isFit=true;
this.fit=function(){
return true;
};
};
var IFlexible=new function(){
this.flex=function(){
};
};
var IFocusable=new function(){
this.isFocusable=true;
this.isFocused=false;
this.focus=function(){
this.dispatchAction(Binding.ACTION_FOCUSED);
};
this.blur=function(){
this.dispatchAction(Binding.ACTION_BLURRED);
};
};
var IImageProfile=new function(){
this.getDefaultImage=function(){
};
this.getHoverImage=function(){
};
this.getActiveImage=function(){
};
this.getDisabledImage=function(){
};
};
var IKeyEventHandler=new function(){
this.handleKeyEvent=function(){
};
};
var ILabel=new function(){
this.getLabel=function(){
};
this.getImage=function(){
};
this.getToolTip=function(){
};
};
var ILoadHandler=new function(){
this.fireOnLoad=function(){
};
};
var IMenuContainer=new function(){
this.isOpen=function(){
};
this.setOpenElement=function(_c){
};
};
var IResizeHandler=new function(){
this.fireOnResize=function(){
};
};
var ISourceEditorComponent=new function(){
this.initializeSourceEditorComponent=function(_d,_e,_f){
};
};
var IUpdateHandler=new function(){
this.handleElement=function(_10,_11){
};
this.updateElement=function(_12,_13){
};
};
var IWysiwygEditorComponent=new function(){
this.initializeComponent=function(_14,_15,_16,_17){
};
};
var IWysiwygEditorContentChangeHandler=new function(){
this.handleContentChange=function(){
};
};
var IWysiwygEditorNodeChangeHandler=new function(){
this.handleNodeChange=function(_18){
};
};
function List(arg){
this._index=0;
this._array=[];
this.isDisposed=false;
if(arg){
this.init(arg);
}
return this;
}
List.prototype.init=function(_1a){
var _1b=(_1a!==undefined&&_1a.splice!==undefined);
if(_1b){
this._array=_1a;
}else{
if(_1a.length){
var i=0;
for(var i=0;i<_1a.length;i++){
this._array.push(_1a[i]);
}
}else{
var i=0,_1d;
while((_1d=_1a[i++])!=null){
this._array.push(_1d);
}
}
}
this.reset();
};
List.prototype.add=function(_1e){
this._array.push(_1e);
return _1e;
};
List.prototype.addFirst=function(_1f){
this._array.unshift(_1f);
return _1f;
};
List.prototype.remove=function(_20){
var i=0,e;
while((e=this._array[i++])!==undefined){
if(e==_20){
this._array.splice(i-1,1);
break;
}
}
};
List.prototype.get=function(_23){
var _24=null;
if(this._array[_23]){
_24=this._array[_23];
}
return _24;
};
List.prototype.set=function(_25,_26){
this._array[_25]=_26;
};
List.prototype.del=function(_27){
this._array.splice(_27,1);
};
List.prototype.has=function(_28){
var _29=false;
var i=0,e;
while((e=this._array[i++])!==undefined){
if(e==_28){
_29=true;
break;
}
}
return _29;
};
List.prototype.getLength=function(){
return this._array.length;
};
List.prototype.hasEntries=function(){
return this.getLength()>0;
};
List.prototype.hasNext=function(){
var _2c=false;
if(this._array!=null){
_2c=this._index<this._array.length;
}else{
SystemLogger.getLogger("List").error("Mysterious List#hasNext exception in IE");
}
return _2c;
};
List.prototype.getNext=function(){
var _2d=null;
if(this.hasNext()){
_2d=this._array[this._index++];
}
return _2d;
};
List.prototype.getFollowing=function(_2e){
var _2f=null;
var i=0,e=null;
while((e=this._array[i])!=null&&!_2f){
if(e==_2e&&this._array[i+1]){
_2f=this._array[i+1];
}
i++;
}
return _2f;
};
List.prototype.getPreceding=function(_32){
var _33=null;
var i=1,e=null;
while((e=this._array[i])!=null&&!_33){
if(e==_32&&this._array[i-1]){
_33=this._array[i-1];
}
i++;
}
return _33;
};
List.prototype.getIndex=function(_36){
var _37=-1;
if(this._array.indexOf!=null){
_37=this._array.indexOf(_36);
}else{
var _38=0;
this.each(function(e){
var res=true;
if(e==_36){
_37=_38;
res=false;
}
_38++;
return res;
});
}
return _37;
};
List.prototype.reset=function(){
this._index=0;
return this;
};
List.prototype.clear=function(){
this._array=[];
return this.reset();
};
List.prototype.each=function(_3b,_3c){
this.reset();
var _3d,is=true;
while(is!=false&&this.hasNext()){
if(_3c===undefined){
_3c=null;
}
var _3f=this._index;
var _40=this.getNext();
is=_3b.call(_3c,_40,_3f);
}
this.reset();
};
List.prototype.copy=function(){
return new List(this._array);
};
List.prototype.reverse=function(){
this._array.reverse();
return this;
};
List.prototype.extractFirst=function(){
return this._array.shift();
};
List.prototype.extractLast=function(){
return this._array.pop();
};
List.prototype.getFirst=function(){
return this.get(0);
};
List.prototype.getLast=function(){
return this.get(this.getLength()-1);
};
List.prototype.toString=function(){
return this._array.toString();
};
List.prototype.toArray=function(){
return this._array.concat([]);
};
List.prototype.merge=function(_41){
_41.reset();
while(_41.hasNext()){
this.add(_41.getNext());
}
return this;
};
List.prototype.dispose=function(){
var i=this._array.length-1;
while(i>=0){
this._array[i--]=null;
}
this._array=null;
this._index=null;
this._isDisposed=true;
};
function Map(map){
this._map={};
if(map!=null){
for(var key in map){
this.set(key,map[key]);
}
}
}
Map.prototype._map={};
Map.prototype.get=function(key){
var _46=null;
if(this.has(key)){
_46=this._map[key];
}else{
var cry="Map: Invalid key: "+key;
SystemLogger.getLogger("Map").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
console.log(cry);
console.log(arguments);
}
}
return _46;
};
Map.prototype.set=function(key,_49){
this._map[key]=_49;
};
Map.prototype.del=function(key){
delete this._map[key];
};
Map.prototype.has=function(key){
return typeof this._map[key]!="undefined";
};
Map.prototype.each=function(_4c){
for(var key in this._map){
var _4e=_4c(key,this._map[key]);
if(_4e==false){
break;
}
}
};
Map.prototype.hasEntries=function(){
var _4f=false;
for(var key in this._map){
_4f=true;
break;
}
return _4f;
};
Map.prototype.countEntries=function(){
var _51=0;
for(var key in this._map){
_51++;
}
return _51;
};
Map.prototype.toList=function(_53){
var _54=new List();
for(var key in this._map){
_54.add(_53?key:this._map[key]);
}
return _54;
};
Map.prototype.copy=function(){
var map=new Map();
for(var key in this._map){
map.set(key,this._map[key]);
}
return map;
};
Map.prototype.inverse=function(){
var map=new Map();
for(var key in this._map){
map.set(this._map[key],key);
}
return map;
};
Map.prototype.empty=function(){
for(var key in this._map){
delete this._map[key];
}
};
Map.prototype.dispose=function(){
for(var key in this._map){
this._map[key]=null;
}
};
function SystemNodeList(){
this._entityTokens=new List([]);
return this;
}
SystemNodeList.prototype.clear=function(){
this._entityTokens.clear();
};
SystemNodeList.prototype.add=function(_5c){
if(_5c.getEntityToken){
var _5d=_5c.getEntityToken();
this._entityTokens.add(_5d);
}
};
SystemNodeList.prototype.has=function(_5e){
if(_5e.getEntityToken){
var _5f=_5e.getEntityToken();
return this._entityTokens.has(_5f);
}
return false;
};
SystemNodeList.prototype.getEntityTokens=function(){
return this._entityTokens.copy();
};
function _BroadcastMessages(){
}
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",TOUCHEVENT_TOUCHSTART:"touchevent touchstart",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",EXPLORERDECK_CHANGED:"explorer deck changed",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
var BroadcastMessages=new _BroadcastMessages();
function _EventBroadcaster(){
}
_EventBroadcaster.prototype={_broadcasts:{},subscribe:function(_60,_61){
if(_60!=null){
if(!Interfaces.isImplemented(IBroadcastListener,_61,true)){
throw ("IBroadcastListener not implemented: "+_60);
}else{
if(!this._broadcasts[_60]){
this._broadcasts[_60]=[_61];
}else{
this._broadcasts[_60].push(_61);
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast: "+_61;
}
},unsubscribe:function(_62,_63){
if(_62!=null){
if(Interfaces.isImplemented(IBroadcastListener,_63)){
var i=0,_65,_66=this._broadcasts[_62];
if(_66){
while(i<_66.length){
_65=_66[i];
if(_65==_63){
_66.splice(i,1);
break;
}
i++;
}
}
}
}else{
throw "Undefined broadcast"+_63;
}
},hasSubscribers:function(_67){
var _68=this._broadcasts[_67];
return _68!=null&&_68.length>0;
},broadcast:function(_69,_6a){
if(_69!=null){
var i=0,_6c=this._broadcasts[_69];
var _6d=[];
if(_6c!=null){
var _6e=new List();
while(i<_6c.length){
_6d.push(_6c[i++]);
}
i=0;
while(i<_6d.length){
var _6f=_6d[i];
if(Application.isDeveloperMode){
_6f.handleBroadcast(_69,_6a);
}else{
try{
_6f.handleBroadcast(_69,_6a);
}
catch(exception){
_6e.add(_6f);
var cry="Exception in "+new String(_6f)+" on broadcast '"+_69+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
}
}
i++;
}
if(_6e.hasEntries()){
_6e.each(function(_71){
EventBroadcaster.unsubscribe(_69,_71);
});
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast";
}
}};
var EventBroadcaster=new _EventBroadcaster();
function _Constants(){
}
var temppath=document.location.pathname;
var temproot=temppath.substring(0,temppath.lastIndexOf("/"));
_Constants.prototype={COMPOSITE_HOME:"http://www.composite.net",DUMMY_LINK:"javascript:void(false);",APPROOT:temproot,WEBSITEROOT:temproot.substring(0,temproot.length-9),CONFIGROOT:temproot.substring(0,temproot.length-9)+"Frontend/Config/VisualEditor/",TEMPLATESROOT:temproot+"/templates",SKINROOT:temproot+"/skins/system",TINYROOT:temproot+"/content/misc/editors/visualeditor/tinymce",URL_WSDL_SETUPSERVICE:temproot+"/services/Setup/SetupService.asmx?WSDL",URL_WSDL_CONFIGURATION:temproot+"/services/Configuration/ConfigurationService.asmx?WSDL",URL_WSDL_LOGINSERVICE:temproot+"/services/Login/Login.asmx?WSDL",URL_WSDL_INSTALLSERVICE:temproot+"/services/Installation/InstallationService.asmx?WSDL",URL_WSDL_MESSAGEQUEUE:temproot+"/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",URL_WSDL_EDITORCONFIG:temproot+"/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",URL_WSDL_FLOWCONTROLLER:temproot+"/services/FlowController/FlowControllerServices.asmx?WSDL",URL_WSDL_STRINGSERVICE:temproot+"/services/StringResource/StringService.asmx?WSDL",URL_WSDL_TREESERVICE:temproot+"/services/Tree/TreeServices.asmx?WSDL",URL_WSDL_XHTMLTRANSFORM:temproot+"/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",URL_WSDL_PAGETEMPLATE:temproot+"/services/WysiwygEditor/PageTemplate.asmx?WSDL",URL_WSDL_FUNCTIONSERVICE:temproot+"/services/WysiwygEditor/FunctionService.asmx?WSDL",URL_WSDL_SECURITYSERVICE:temproot+"/services/Tree/SecurityServices.asmx?WSDL",URL_WSDL_READYSERVICE:temproot+"/services/Ready/ReadyService.asmx?WSDL",URL_WSDL_LOCALIZATION:temproot+"/services/Localization/LocalizationService.asmx?WSDL",URL_WSDL_SOURCEVALIDATION:temproot+"/services/SourceEditor/SourceValidationService.asmx?WSDL",URL_WSDL_MARKUPFORMAT:temproot+"/services/SourceEditor/MarkupFormatService.asmx?WSDL",URL_WSDL_SEOSERVICE:temproot+"/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",URL_WSDL_PAGESERVICE:temproot+"/services/Page/PageService.asmx?WSDL",URL_WSDL_DIFFSERVICE:temproot+"/services/StringResource/DiffService.asmx?WSDL",NS_XHTML:"http://www.w3.org/1999/xhtml",NS_UI:"http://www.w3.org/1999/xhtml",NX_XUL:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",NS_XBL:"http://www.mozilla.org/xbl",NS_WSDL:"http://schemas.xmlsoap.org/wsdl/",NS_SOAP:"http://schemas.xmlsoap.org/wsdl/soap/",NS_ENVELOPE:"http://schemas.xmlsoap.org/soap/envelope/",NS_ENCODING:"http://schemas.xmlsoap.org/soap/encoding/",NS_SCHEMA:"http://www.w3.org/2001/XMLSchema",NS_SCHEMA_INSTANCE:"http://www.w3.org/1999/XMLSchema-instance",NS_DOMPARSEERROR:"http://www.mozilla.org/newlayout/xml/parsererror.xml",NS_NS:"http://www.w3.org/2000/xmlns/",NS_PERSISTANCE:"http://www.composite.net/ns/localstore/persistance",NS_FUNCTION:"http://www.composite.net/ns/function/1.0",SCROLLBAR_DIMENSION_HARDCODED_VALUE:19};
var Constants=new _Constants();
temppath=null;
temproot=null;
function _Client(){
var _72=navigator.userAgent.toLowerCase();
var _73=navigator.platform.toLowerCase();
var _74=navigator.appName=="Microsoft Internet Explorer";
var _75=!_74&&typeof document.createTreeWalker!="undefined";
var _76=_75&&(_72.indexOf("webrunner")>-1||_72.indexOf("prism")>-1);
var _77=history.pushState!=null;
this.isMozilla=_75;
this.isFirefox=_72.indexOf("firefox")>-1;
this.isWebKit=_72.indexOf("webkit")>-1;
this.isExplorer=_74;
this.isExplorer6=this.isExplorer&&(_72.indexOf("msie 6.0")>-1||_72.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isExplorer11=!!navigator.userAgent.match(/Trident\/7\./);
this.isPrism=_76;
this.isWindows=_73.indexOf("win")>-1;
this.isVista=this.isWindows&&_72.indexOf("windows nt 6")>-1;
this.isMac=_73.indexOf("mac")>-1;
this.isPad=navigator.userAgent.match(/iPad/i)!=null;
this.isOS7=navigator.userAgent.match(/CPU.*OS 7_\d/i)!=null;
var _78=this._getFlashVersion();
this.hasFlash=(_78&&_78>=9);
this.hasTransitions=_77;
this.canvas=!!document.createElement("canvas").getContext;
this.hasSpellcheck=this.isFirefox||this.isExplorer&&document.documentElement.spellcheck;
this.hasXSLTProcessor=this.isMozilla&&!this.isExplorer11;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _79=null;
var _7a=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _7b=navigator.plugins["Shockwave Flash"];
if(_7b){
var _7c=_7b.description;
if(_7c!=null){
_79=_7c.charAt(_7c.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_7a;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_79=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _79;
},qualifies:function(){
var _7e=true;
var _7f=false;
if(this.isMozilla&&!this.isWebKit&&!this.isExplorer11){
_7f=(document.documentElement.mozMatchesSelector===undefined);
}
if(window.opera!=null||_7f||this.isExplorer&&!this.canvas){
_7e=false;
}
return _7e;
},fixUI:function(_80){
if(Client.isExplorer){
_80=_80.replace(/<ui:/g,"<").replace(/<\/ui:/g,"</");
_80=_80.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
}
return _80;
}};
var Client=new _Client();
SystemLogger.TAB_SEQUENCE="&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;";
SystemLogger.LEVEL_INFO="info";
SystemLogger.LEVEL_DEBUG="debug";
SystemLogger.LEVEL_ERROR="error";
SystemLogger.LEVEL_WARN="warn";
SystemLogger.LEVEL_FATAL="fatal";
SystemLogger.LEVEL_FINE="fine";
SystemLogger.isFlushing=false;
function SystemLogger(_81){
this.identifier=_81;
}
SystemLogger.prototype.info=function(_82){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_82);
};
SystemLogger.prototype.debug=function(_83){
if(_83=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_83);
};
SystemLogger.prototype.error=function(_84){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_84);
};
SystemLogger.prototype.warn=function(_85){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_85);
};
SystemLogger.prototype.fatal=function(_86){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_86);
};
SystemLogger.prototype.fine=function(_87){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_87);
};
SystemLogger.loggers={};
SystemLogger.buffer=new List();
SystemLogger.suspend=function(){
SystemLogger.outputWindow=null;
SystemLogger.outputDocument=null;
SystemLogger.outputElement=null;
SystemLogger.log=SystemLogger.bufferLog;
};
SystemLogger.unsuspend=function(win){
SystemLogger.outputWindow=win;
SystemLogger.outputDocument=win.document;
SystemLogger.outputElement=win.document.body;
SystemLogger.log=SystemLogger.outputLog;
SystemLogger.flushBuffer();
};
SystemLogger.getLogger=function(_89){
var _8a=SystemLogger.loggers[_89];
if(!_8a){
_8a=new SystemLogger(_89);
SystemLogger.loggers[_89]=_8a;
}
return _8a;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _8b=SystemLogger.buffer.getNext();
this.log(_8b.identifier,_8b.level,_8b.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_8c,_8d,_8e){
if(Application.isDeveloperMode){
_8e=String(_8e);
SystemLogger.buffer.add({identifier:_8c,level:_8d,message:_8e});
}
};
SystemLogger.outputLog=function(_8f,_90,_91){
_91=String(_91);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_8f,_90,_91);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _96=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_91=_91.replace(/</g,"&lt;");
_91=_91.replace(/>/g,"&gt;");
_91=_91.replace(/\n/g,"<br/>");
_91=_91.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_91;
}else{
pre.textContent=_91;
}
div.className=_90;
_96.innerHTML=_8f;
div.appendChild(_96);
div.appendChild(pre);
elm.insertBefore(div,elm.firstChild);
win.scrollTo(0,0);
};
SystemLogger.log=SystemLogger.bufferLog;
SystemLogger.clear=function(){
SystemLogger.buffer=new List();
var doc=SystemLogger.outputDocument;
if(doc){
doc.body.innerHTML="";
}
};
SystemTimer.getTimer=function(_99){
return new SystemTimer(_99.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_9b){
this.logger.debug(this._id+": "+this.getTime()+(_9b?": "+_9b:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_9c,_9d){
this._stackMozilla(_9c,_9d);
},_stackMozilla:function(_9e,_9f){
_9f=_9f?_9f:this._stacklength;
if(Client.isMozilla&&_9e.callee||_9e.caller){
var _a0=Client.isMozilla?_9e.callee.caller:_9e.caller.callee;
var _a1="";
var i=0;
while(_a0!=null&&i++<_9f){
_a1+="\n#"+i+"\n";
_a1+=_a0.toString();
_a0=_a0.caller;
_a1+="\n";
}
this._logger.error(_a1);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _a3=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_a4,_a5,_a6){
var _a7=true;
for(var _a8 in _a4){
if(typeof _a5[_a8]==Types.UNDEFINED){
_a7=false;
}else{
if(typeof _a4[_a8]!=typeof _a5[_a8]){
_a7=false;
}
}
if(!_a7){
break;
}
}
if(!_a7){
if(_a6){
_a3.fine(_a5+" invalid. Interface check abandoned at: "+_a8);
}
}
return _a7;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a9){
var _aa=_a9;
if(parseInt(_aa).toString()===_aa){
_aa=parseInt(_aa);
}else{
if(parseFloat(_aa).toString()===_aa){
_aa=parseFloat(_aa);
}else{
if(_aa==="true"||_aa==="false"){
_aa=(_aa==="true");
}
}
}
return _aa;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _ad={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"MediaFileElementProvider.WritableFolders":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _af=null;
if(this.hasToken(key)){
_af=_ad[key];
}else{
throw "Unknown search token key: "+key;
}
return _af;
};
this.hasToken=function(key){
return typeof _ad[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_b1){
if(SearchTokens.hasToken(_b1.Key)){
_ad[_b1.Key]=_b1.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _b2=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _b3={};
function resolve(_b4,_b5){
var _b6=new List(StringService.GetLocalisation(_b4));
if(_b6.hasEntries()){
_b6.each(function(_b7){
_b5[_b7.Key]=_b7.Value;
});
}else{
throw "No strings from provider: "+_b4;
}
}
this.getString=function(_b8,_b9){
var _ba=null;
if(window.StringService!=null){
try{
if(_b8=="ui"){
_b8=StringBundle.UI;
}
if(!_b3[_b8]){
var _bb=_b3[_b8]={};
resolve(_b8,_bb);
}
if(_b3[_b8]){
_ba=_b3[_b8][_b9];
}
if(!_ba){
throw "No such string: "+_b9;
}
}
catch(exception){
var cry="StringBundle exception in string "+_b8+":"+_b9;
_b2.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _ba;
};
};
function _KeyMaster(){
}
_KeyMaster.prototype={_uniqueKeys:{},getUniqueKey:function(){
var key=new String("key"+Math.random().toString().split(".")[1]);
if(this._uniqueKeys[key]!=null){
return this.getUniqueKey();
}
this._uniqueKeys[key]=true;
return key;
},hasKey:function(key){
var _bf=false;
if(this._uniqueKeys[key]){
_bf=true;
}
return _bf;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_c0,_c1){
var _c2=_c0.ResourceNamespace;
var _c3=_c0.ResourceName;
if(_c2===this.UI){
return _c3;
}else{
var _c4=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
_c1=_c1?_c1:"DEFAULT";
if(_c3!=null&&_c2!=null){
_c4=url.replace("${name}",_c3).replace("${hash}",_c2).replace("${size}",_c1);
if(_c1=="DEFAULT"){
_c4=_c4.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _c4;
}
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_c6){
if(typeof _c6!=Types.UNDEFINED){
_c6=String(_c6);
_c6=_c6.replace("${root}",Constants.APPROOT);
_c6=_c6.replace("${skin}",Constants.SKINROOT);
_c6=_c6.replace("${tiny}",Constants.TINYROOT);
if(_c6.indexOf("${icon:")>-1){
_c6=this._resolveImage(_c6);
}else{
if(_c6.indexOf("${class:")>-1){
_c6=this._resolveClasses(_c6);
}else{
if(_c6.indexOf("${string:")>-1){
_c6=this._resolveString(_c6);
}
}
}
}
return _c6;
},resolveVars:function(_c7,_c8){
var i=0;
while(i<_c8.length){
_c7=_c7.replace("{"+i+"}",_c8[i]);
i++;
}
return _c7;
},_resolveString:function(_ca){
var _cb=null;
var _cc=null;
var key=_ca.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_cc=key.split(":")[0];
key=key.split(":")[1];
}else{
_cc=StringBundle.UI;
}
_cb=StringBundle.getString(_cc,key);
if(!_cb){
_cb="(?)";
}
return _cb;
},_resolveImage:function(_ce){
var _cf=null;
var _d0=null;
var _d1=null;
var _d2=null;
_d1=_ce.split("${icon:")[1].split("}")[0];
if(_d1.indexOf(":")>-1){
_d0=_d1.split(":")[0];
_d1=_d1.split(":")[1];
}else{
_d0=ImageProvider.UI;
}
if(_d1.indexOf("(")>-1){
_d2=_d1.split("(")[1].split(")")[0];
_d1=_d1.split("(")[0];
}
_cf=ImageProvider.getImageURL({ResourceNamespace:_d0,ResourceName:_d1},_d2);
return _cf;
},_resolveClasses:function(_d3){
var _d4={};
resource=_d3.split("${class:")[1].split("}")[0];
_d4.classes=resource;
return _d4;
}};
var Resolver=new _Resolver();
function _Download(){
}
_Download.prototype.init=function(url){
var win=top.app.bindingMap.downloadwindow;
win.setURL(url);
};
var Download=new _Download();
function _Cookies(){
}
_Cookies.prototype={createCookie:function(_d7,_d8,_d9){
var _da="";
if(_d9){
var _db=new Date();
_db.setTime(_db.getTime()+(_d9*24*60*60*1000));
_da="; expires="+_db.toGMTString();
}
document.cookie=_d7+"="+escape(_d8)+_da+"; path=/";
return this.readCookie(_d7);
},readCookie:function(_dc){
var _dd=null;
var _de=_dc+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_de)==0){
_dd=unescape(c.substring(_de.length,c.length));
}
}
return _dd;
},eraseCookie:function(_e2){
this.createCookie(_e2,"",-1);
}};
var Cookies=new _Cookies();
function _StatusBar(){
this.AUTOCLEAR_TIMEOUT=5*1000;
this.GROUP_LANGUAGETOOLS="languagetools";
this.document=null;
this.state=null;
this.ERROR="error";
this.WARN="warn";
this.BUSY="busy";
this.READY="ready";
this._groups=new Map();
var _e3=SystemLogger.getLogger("StatusBar");
var _e4=null;
var _e5="${icon:error}";
var _e6="${icon:warning}";
var _e7="${icon:loading}";
var _e8="${icon:message}";
var _e9=null;
var _ea=null;
var _eb=null;
var _ec=null;
this.initialize=function(_ed){
_e9=StringBundle.getString("ui","Website.App.StatusBar.Error");
_ea=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_eb=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_ec=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_e4=_ed;
this.document=_ed.bindingDocument;
};
this.error=function(_ee,_ef){
this.state=StatusBar.ERROR;
_ee=_ee?_ee:_e9;
show(_ee,_e5,_ef,false);
};
this.warn=function(_f0,_f1){
this.state=StatusBar.WARN;
_f0=_f0?_f0:_ea;
show(_f0,_e6,_f1,false);
};
this.busy=function(_f2,_f3){
this.state=StatusBar.BUSY;
_f2=_f2?_f2:_eb;
show(_f2,_e7,_f3,false);
};
this.ready=function(_f4,_f5){
this.state=StatusBar.READY;
_f4=_f4?_f4:_ec;
show(_f4,_e8,_f5,true);
};
this.report=function(_f6,_f7,_f8,_f9){
this.state=null;
show(_f6,_f7,_f8,_f9);
};
this.clear=function(){
this.state=null;
if(_e4){
_e4.clear();
}
};
function show(_fa,_fb,_fc,_fd){
if(_fc){
_fa=Resolver.resolveVars(_fa,_fc);
}
if(_e4){
_e4.setLabel(_fa);
_e4.setImage(_fb);
if(_fd){
_e4.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_e3.error("Message not initialized for display: "+_fa);
}
}
this.addToGroup=function(_fe,_ff){
if(!this._groups.has(_fe)){
this._groups.set(_fe,_e4.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_fe).add(_ff);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,isUIRtl:false,isRtl:false,handleBroadcast:function(_100,arg){
switch(_100){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
this.isUIRtl=LocalizationService.GetUITextDirection(true)=="rtl";
this.isRtl=LocalizationService.GetTextDirection(true)=="rtl";
var _102=LocalizationService.GetActiveLocales(true);
if(_102.length>=1){
this.languages=new List(_102);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_100){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _103=LocalizationService.GetLocales(true);
this.source=_103.ForeignLocaleName;
this.target=_103.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_103.ForeignLocaleName,target:_103.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _104=this.languages.copy();
while(_104.hasNext()){
var lang=_104.getNext();
if(lang.IsCurrent){
return lang.IsoName;
}
}
}
return null;
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_106,key,_108){
var _109=true;
var _10a=SourceValidationService.ValidateSource(_106,key);
if(_10a!="True"){
if(_108==true){
this._dialog(_10a);
}
_109=false;
}
return _109;
},validateInformed:function(_10b,key){
return this.validate(_10b,key,true);
},_dialog:function(_10d){
setTimeout(function(){
Dialog.error("Source Invalid",_10d);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_10e,_10f,_110,_111){
this._count++;
this._eventListener(true,_10e,_10f,_110,_111);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_10e&&typeof _10e.nodeType!=Types.UNDEFINED){
if(_10e.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_10e);
if(win){
var _113={handleEvent:function(){
DOMEvents.removeEventListener(_10e,_10f,_110,_111);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_113);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_113);
}
}
}
}
},removeEventListener:function(_114,_115,_116,_117){
this._count--;
this._eventListener(false,_114,_115,_116,_117);
},getTarget:function(e){
return e?(e.target?e.target:e.srcElement):null;
},stopPropagation:function(e){
try{
if(e.stopPropagation!=null){
e.stopPropagation();
}else{
e.cancelBubble=true;
}
}
catch(exception){
if(Application.isDeveloperMode==true){
this._logger.error(exception);
}
}
},preventDefault:function(e){
try{
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
}
catch(exception){
if(Application.isDeveloperMode==true){
this._logger.error(exception);
}
}
},isRightButton:function(e){
return e.button==2?true:false;
},isButtonPressed:function(e){
if((Client.isFirefox||Client.isExplorer11)&&e.buttons===0){
return false;
}else{
if(Client.isWebKit&&e.which===0){
return false;
}
}
return undefined;
},cleanupEventListeners:function(_11d){
this._deleteWrappedHandler(_11d);
},isCurrentTarget:function(e){
var _11f=false;
if(Client.isMozilla==true){
_11f=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_120,_121){
var _122=true;
if(_120==_121){
_122=false;
}
if(_122==true){
while(_121!=null&&_121.nodeType!=Node.DOCUMENT_NODE&&_121!=_120){
_121=_121.parentNode;
}
_122=(_121==_120);
}
return _122;
},_eventListener:function(_123,_124,_125,_126,_127,_128){
if(Interfaces.isImplemented(IEventListener,_126,true)){
if(typeof _125!=Types.UNDEFINED){
var _129=this._getAction(_123);
if(_124[_129]){
if(Client.isExplorer||Client.isExplorer11){
switch(_125){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_126=this._getWrappedHandler(_124,_125,_126,_128);
_124[_129](_125,_126,false);
break;
default:
_124[_129](_125,_126,false);
break;
}
}else{
switch(_125){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_125=_125==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_124[_129](_125,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_126.handleEvent(e);
}
}},_127?true:false);
break;
default:
_124[_129](_125,_126,_127?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_12c){
var _12d=null;
switch(_12c){
case true:
_12d="addEventListener";
break;
case false:
_12d="removeEventListener";
break;
}
return _12d;
},_getWrappedHandler:function(_12e,_12f,_130,_131){
var _132=null;
try{
if(!_130._domEventHandlers){
_130._domEventHandlers={};
}
if(!_130._domEventHandlers[_12e]){
_130._domEventHandlers[_12e]={};
}
if(!_130._domEventHandlers[_12e][_12f]){
var win=_12e.nodeType?DOMUtil.getParentWindow(_12e):_12e;
if(win){
_130._domEventHandlers[_12e][_12f]=function(e){
if(win.event!=null&&_130!=null){
_130.handleEvent(win.event);
}else{
if(_130!=null){
_130.handleEvent(e);
}
}
};
}
}
_132=_130._domEventHandlers[_12e][_12f];
}
catch(exception){
this._report(_12e,_12f,_130,_131);
}
return _132;
},_deleteWrappedHandler:function(_135){
for(var _136 in _135._domEventHandlers){
if(_136){
for(var _137 in _135._domEventHandlers[_136]){
if(_137){
delete _135._domEventHandlers[_136][_137];
}
}
}
delete _135._domEventHandlers[_136];
}
},_report:function(_138,_139,_13a,_13b){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_138?_138.nodeName:_138)+"\n"+"\tevent: "+_139+"\n"+"\thandler: "+_13a+"\n\n"+"Offending invoker: "+(_13b.callee?_13b.callee.toString():_13b.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_13d){
var _13e=null;
var _13f=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_13f=node.documentElement;
}
if(_13f.xml!=null){
return _13f.xml;
}else{
if(this._serializer!=null){
if(_13d==true){
_13f=_13f.cloneNode(true);
_13f=DOMFormatter.format(_13f,DOMFormatter.INDENTED_TYPE_RESULT);
}
_13e=this._serializer.serializeToString(_13f);
}
}
return _13e;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _142=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_143){
var doc=_143.ownerDocument;
var _145=function(node,_147){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _148="",i=0;
while(i++<_147){
_148+=TAB;
}
var _14a=node.firstChild;
while(_14a){
switch(_14a.nodeType){
case Node.ELEMENT_NODE:
if(_14a==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_148));
}
node.insertBefore(doc.createTextNode(NEW+_148+TAB),_14a);
_145(_14a,_147+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_148+TAB),_14a);
break;
}
if(_14a.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_14a,_148+TAB);
}
}
_14a=_14a.nextSibling;
}
}
};
_145(_143,0);
}
function strip(_14b){
var _14c=[];
var _14d={acceptNode:function(_14e){
return (!_142.test(_14e.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _14f=_14b.ownerDocument.createTreeWalker(_14b,NodeFilter.SHOW_TEXT,_14d,true);
while(_14f.nextNode()){
_14c.push(_14f.currentNode);
}
var i=0,_151;
while((_151=_14c[i++])!=null){
_151.parentNode.removeChild(_151);
}
}
function formatCDATASection(node,_153){
if(node.textContent.indexOf(NEW)>-1){
var _154=node.textContent.split(NEW);
var _155="",line,_157=0,_158=true;
while((line=_154.shift())!=null){
if(_157==0&&line.charAt(0)==TAB){
while(line.charAt(_157++)==TAB){
}
}
line=line.substring(_157,line.length);
if(_154.length>0){
_155+=_153+TAB+line;
_155+=_158?"":"\n";
}else{
_155+=_153+line;
_153=_153.slice(1,_153.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_153));
}
_158=false;
}
node.textContent=_155;
}
}
this.format=function(_159,_15a){
var _15b=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_159);
if(_15a!=_15b){
indent(_159);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_159);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_15c){
var sig,_15e=null,_15f=this.MSXML_MAXVERSION;
while(!_15e&&_15f>=this.MSXML_MINVERSION){
try{
sig=_15c.replace("{$version}",_15f);
_15e=new ActiveXObject(sig);
}
catch(exception){
}
_15f--;
}
return _15e;
},getXMLHTTPRequest:function(){
var _160=null;
if(Client.isExplorer||Client.isExplorer11){
_160=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_160=new XMLHttpRequest();
}
return _160;
},getDOMDocument:function(_161){
var _162=null;
if(Client.isExplorer||Client.isExplorer11){
_162=this.getMSComponent(_161?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_162=doc;
}
return _162;
},getMSXMLXSLTemplate:function(){
var _164=null;
if(Client.isExplorer||Client.isExplorer11){
_164=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _164;
},getLocalName:function(_165){
var _166=null;
if(_165.localName){
_166=_165.localName.replace("ui:","");
}else{
if(_165.baseName){
_166=_165.baseName;
}else{
_166=_165.nodeName.toLowerCase();
}
}
return _166;
},getComputedStyle:function(_167,_168){
var _169=null;
if(Client.isExplorer){
if(_167.currentStyle!=null){
_169=_167.currentStyle[_168];
}else{
this._logger.error("Could not compute style for element "+_167.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _16a=_167.ownerDocument.defaultView.getComputedStyle(_167,null);
if(_16a!=null){
_169=_16a.getPropertyValue(_168);
}else{
this._logger.error("Could not compute style for element "+_167.nodeName);
SystemDebug.stack(arguments);
}
}
return _169;
},getMaxIndex:function(doc){
var max=0,_16d=new List(doc.getElementsByTagName("*"));
_16d.each(function(_16e){
var _16f=CSSComputer.getZIndex(_16e);
if(_16f>max){
max=_16f;
}
});
return max;
},getOrdinalPosition:function(_170,_171){
var _172=null;
var _173=-1;
var _174=this.getLocalName(_170);
var _175=new List(_170.parentNode.childNodes);
while(_175.hasNext()){
var _176=_175.getNext();
if(_176.nodeType==Node.ELEMENT_NODE){
if(!_171||this.getLocalName(_176)==_174){
_173++;
if(_176==_170||(_176.id!=""&&_176.id==_170.id)){
_172=_173;
break;
}
}
}
}
return _172;
},isFirstElement:function(_177,_178){
return (this.getOrdinalPosition(_177,_178)==0);
},isLastElement:function(_179,_17a){
var _17b=_179.parentNode.getElementsByTagName(_17a?this.getLocalName(_179):"*");
return (this.getOrdinalPosition(_179)==_17b.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _17f=null;
if(node.textContent){
_17f=node.textContent;
}else{
if(node.text){
_17f=node.text;
}else{
_17f=node.innerText;
}
}
return _17f;
},setTextContent:function(node,text){
text=String(text);
if(node.textContent){
node.textContent=text;
}else{
if(node.text){
node.text=text;
}else{
node.innerText=text;
}
}
},getAncestorByLocalName:function(_182,node,_184){
var _185=null;
while(_185==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_184==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_182){
_185=node;
}
}
return _185;
},contains:function(_187,node){
return _187.contains?_187!=node&&_187.contains(node):!!(_187.compareDocumentPosition(node)&16);
},createElementNS:function(_189,_18a,_18b){
var _18c=null;
if(_18b==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_18c=_18b.createElementNS(_189,_18a);
}else{
if(_18b.xml!=null){
_18c=_18b.createNode(Node.ELEMENT_NODE,_18a,_189);
}else{
_18c=_18b.createElement(_18a.replace("ui:",""));
}
}
}
return _18c;
},getElementsByTagName:function(node,_18e){
var _18f=null;
if(Client.isMozilla){
_18f=node.getElementsByTagNameNS(Constants.NS_XHTML,_18e);
}else{
_18f=node.getElementsByTagName(_18e);
}
return _18f;
},getNextElementSibling:function(_190){
return Client.isExplorer?_190.nextSibling:_190.nextElementSibling;
},getPreviousElementSibling:function(_191){
return Client.isExplorer?_191.previousSibling:_191.previousElementSibling;
},cloneNode:function(node){
var _193=null;
if(Client.isMozilla==true){
_193=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_193=node.cloneNode(true);
}
return _193;
},getLocalPosition:function(_194){
var _195=new Point(_194.offsetLeft,_194.offsetTop);
if(Client.isExplorer&&_194.parentNode&&_194.parentNode.currentStyle){
if(_194.parentNode.currentStyle.position=="static"){
var _196=this.getLocalPosition(_194.parentNode);
_195.x+=_196.x;
_195.y+=_196.y;
}
}
return _195;
},getGlobalPosition:function(_197){
return this._getPosition(_197,false);
},getUniversalPosition:function(_198){
return this._getPosition(_198,true);
},_getPosition:function(_199,_19a){
var _19b=null;
if(typeof _199.getBoundingClientRect!=Types.UNDEFINED){
var rect=_199.getBoundingClientRect();
_19b={x:rect.left,y:rect.top};
if(Client.isMozilla){
_19b.x-=_199.scrollLeft;
_19b.y-=_199.scrollTop;
}
}else{
_19b={x:_199.offsetLeft-_199.scrollLeft,y:_199.offsetTop-_199.scrollTop};
while(_199.offsetParent){
_199=_199.offsetParent;
_19b.x+=(_199.offsetLeft-_199.scrollLeft);
_19b.y+=(_199.offsetTop-_199.scrollTop);
}
}
if(_19a){
var win=DOMUtil.getParentWindow(_199);
if(win){
var _19e=win.frameElement;
if(_19e){
var add=DOMUtil.getUniversalPosition(_19e);
_19b.x+=add.x;
_19b.y+=add.y;
}
}
}
return new Point(_19b.x,_19b.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a3){
var _1a4=DOMEvents.getTarget(e);
var _1a5={x:e.clientX,y:e.clientY};
if(_1a3){
var _1a6=this.getParentWindow(_1a4).frameElement;
if(_1a6){
var add=this.getUniversalPosition(_1a6);
_1a5.x+=add.x;
_1a5.y+=add.y;
}
}
return _1a5;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1a9){
var doc=null;
if(xml!=null){
if(this._domParser!=null){
try{
doc=this._domParser.parseFromString(xml,"text/xml");
}
catch(e){
alert(xml);
}
if(doc.documentElement.namespaceURI==Constants.NS_DOMPARSEERROR){
if(!_1a9){
this._logger.error(DOMSerializer.serialize(doc.documentElement,true));
if(Application.isDeveloperMode){
alert("XMLParser failed: \n\n"+DOMSerializer.serialize(doc.documentElement,true));
}
}
doc=null;
}
}else{
doc=DOMUtil.getDOMDocument();
doc.setProperty("ProhibitDTD",false);
doc.validateOnParse=false;
doc.async=false;
doc.loadXML(xml);
if(doc.parseError.errorCode!=0){
if(!_1a9){
this._logger.error("XMLParser failed!");
if(Application.isDeveloperMode){
alert("XMLParser failed!");
}
}
doc=null;
}
}
}else{
throw "XMLParser: No XML input to parse!";
}
return doc;
},isWellFormedDocument:function(xml,_1ac,_1ad){
var _1ae=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b0=SourceValidationService.IsWellFormedDocument(xml);
if(_1b0!="True"){
_1ae=false;
if(_1ac==true){
if(_1ad){
if(confirm("Not well-formed\n"+_1b0+"\nContinue?")){
_1ae=true;
}
}else{
this._illFormedDialog(_1b0);
}
}
}
return _1ae;
},isWellFormedFragment:function(xml,_1b2){
var _1b3=true;
var _1b4=SourceValidationService.IsWellFormedFragment(xml);
if(_1b4!="True"){
_1b3=false;
if(_1b2==true){
this._illFormedDialog(_1b4);
}
}
return _1b3;
},_illFormedDialog:function(_1b5){
setTimeout(function(){
Dialog.error("Not well-formed",_1b5);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1b6){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1b7){
return _1b6[_1b7];
}};
}else{
this._nsResolver=_1b6;
}
};
XPathResolver.prototype.resolve=function(_1b8,node,_1ba){
var _1bb=null;
try{
if(this._evaluator){
_1bb=this._evaluateDOMXpath(_1b8,node,_1ba?true:false);
}else{
_1bb=this._evaluateMSXpath(_1b8,node,_1ba?true:false);
}
}
catch(exception){
alert("XPathResolver#resolve: "+exception);
if(exception.stack){
alert(exception.stack);
}else{
alert(arguments.caller.callee.toString());
}
throw exception;
}
return _1bb;
};
XPathResolver.prototype.resolveAll=function(_1bc,node){
return this.resolve(_1bc,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1be,node,_1c0){
var _1c1=null;
if(node){
var _1c1=this._evaluator.evaluate(_1be,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c0){
var list=new List();
while((node=_1c1.iterateNext())!=null){
list.add(node);
}
_1c1=list;
}else{
_1c1=_1c1.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c1;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c4,node,_1c6){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1c8="";
for(var _1c9 in this._nsResolver){
_1c8+="xmlns:"+_1c9+"=\""+this._nsResolver[_1c9]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1c8);
if(_1c6){
var list=new List();
var i=0,_1cc=node.selectNodes(_1c4);
while(i<_1cc.length){
list.add(_1cc.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c4);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1ce=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1ce);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1ce;
}
};
XSLTransformer.prototype._import=function(url){
var _1d0=null;
if(Client.hasXSLTProcessor){
var _1d1=DOMUtil.getXMLHTTPRequest();
_1d1.open("get",Resolver.resolve(url),false);
_1d1.send(null);
_1d0=_1d1.responseXML;
}else{
var _1d0=DOMUtil.getDOMDocument(true);
_1d0.async=false;
_1d0.load(url);
}
return _1d0;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d3=null;
if(Client.hasXSLTProcessor){
_1d3=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d3;
};
XSLTransformer.prototype.transformToString=function(dom,_1d5){
var _1d6=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1d6=DOMSerializer.serialize(doc,_1d5);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1d6=proc.output;
}
return _1d6;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d9){
var _1da=_1d9.style?_1d9.className:_1d9.getAttribute("class");
_1da=_1da?_1da:"";
return _1da;
},_contains:function(_1db,sub){
return _1db.indexOf(sub)>-1;
},_attach:function(_1dd,sub){
return _1dd+(_1dd==""?"":" ")+sub;
},_detach:function(_1df,sub){
if(this._contains(_1df," "+sub)){
sub=" "+sub;
}
return _1df.replace(sub,"");
},attachClassName:function(_1e1,_1e2){
if(_1e1.classList!=null){
if(!_1e1.classList.contains(_1e2)){
_1e1.classList.add(_1e2);
}
}else{
var _1e3=this._getCurrent(_1e1);
if(!this._contains(_1e3,_1e2)){
_1e3=this._attach(_1e3,_1e2);
}
if(_1e1.style!=null){
_1e1.className=_1e3;
}else{
_1e1.setAttribute("class",_1e3);
}
}
},detachClassName:function(_1e4,_1e5){
if(_1e4.classList!=null){
if(_1e4.classList.contains(_1e5)){
_1e4.classList.remove(_1e5);
}
}else{
var _1e6=this._getCurrent(_1e4);
if(this._contains(_1e6,_1e5)){
_1e6=this._detach(_1e6,_1e5);
}
if(_1e4.style!=null){
_1e4.className=_1e6;
}else{
if(_1e6==""){
_1e4.removeAttribute("class");
}else{
_1e4.setAttribute("class",_1e6);
}
}
}
},hasClassName:function(_1e7,_1e8){
var _1e9=false;
if(_1e7.classList!=null){
_1e9=_1e7.classList.contains(_1e8);
}else{
_1e9=this._contains(this._getCurrent(_1e7),_1e8);
}
return _1e9;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1ea,_1eb){
var _1ec={};
for(var _1ed in _1ea){
var ent=parseInt(DOMUtil.getComputedStyle(_1eb,_1ea[_1ed]));
_1ec[_1ed]=isNaN(ent)?0:ent;
}
return _1ec;
},_getMargin:function(_1ef){
return this._getComplexResult(this._margins,_1ef);
},getPadding:function(_1f0){
return this._getComplexResult(this._paddings,_1f0);
},getBorder:function(_1f1){
return this._getComplexResult(this._borders,_1f1);
},getPosition:function(_1f2){
return DOMUtil.getComputedStyle(_1f2,"position");
},getFloat:function(_1f3){
return DOMUtil.getComputedStyle(_1f3,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f4){
return parseInt(DOMUtil.getComputedStyle(_1f4,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1f5){
return DOMUtil.getComputedStyle(_1f5,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1f6=SystemLogger.getLogger("System");
var root=null;
var _1f8=null;
this.hasActivePerspectives=false;
this.nodes=new Map();
this.getDefaultEntityToken=function(_1f9){
if(_1f8==null){
_1f8={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1fa){
_1f8[_1fa.Key]=_1fa.Value;
});
}
return _1f8[_1f9];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1fb=new List();
var _1fc=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1fc);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1fe){
_1fb.add(new SystemNode(_1fe));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1fb;
};
this.getChildNodes=function(node,_200){
var _201=new List();
var _202=null;
if(_200){
if(SearchTokens.hasToken(_200)){
_200=SearchTokens.getToken(_200);
}
_202=TreeService.GetElementsBySearchToken(node.getData(),_200);
}else{
_202=TreeService.GetElements(node.getData());
}
new List(_202).each(function(_203){
var _204=new SystemNode(_203);
if(_200){
_204.searchToken=_200;
}
_201.add(_204);
});
return _201;
};
this.getDescendantBranch=function(_205){
var map=new Map();
var arg=[];
_205.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _209=TreeService.GetMultipleChildren(arg);
var _20a=new List(_209);
while(_20a.hasNext()){
this._listNodesInMap(_20a.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_20b,_20c,_20d){
var map=new Map();
var arg=[];
_20d.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _211=TreeService.FindEntityToken(_20b,_20c,arg);
if(_211 instanceof SOAPFault){
_1f6.error(_211.getFaultString());
if(Application.isDeveloperMode){
alert(_211.getFaultString());
}
map=null;
}else{
var _212=new List(_211);
while(_212.hasNext()){
this._listNodesInMap(_212.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_213,map){
var list=new List();
var key=_213.ElementKey;
var _217=new List(_213.ClientElements);
map.set(key,list);
while(_217.hasNext()){
var _218=_217.getNext();
list.add(new SystemNode(_218));
}
var self=this;
map.each(function(key,list){
self.nodes.set(key,list.copy());
});
};
this.getChildNodesBySearchToken=function(node,_21d){
return this.getChildNodes(node,_21d);
};
this.getNamedRoots=function(key,_21f){
var _220=new List();
var _221=null;
if(_21f){
if(SearchTokens.hasToken(_21f)){
_21f=SearchTokens.getToken(_21f);
}
_221=TreeService.GetNamedRootsBySearchToken(key,_21f);
}else{
_221=TreeService.GetNamedRoots(key);
}
new List(_221).each(function(_222){
var node=new SystemNode(_222);
if(_21f){
node.searchToken=_21f;
}
_220.add(node);
});
return _220;
};
this.getNamedRootsBySearchToken=function(key,_225){
return this.getNamedRoots(key,_225);
};
function compileActionList(node,_227,_228){
var _229=_227.ClientElementActionGroupId;
if(_229!=null){
var _22a=_228.get(_229).ClientElementActionGroupItems;
if(_22a&&_22a.length>0){
node.setActionList(new List(_22a));
}
}
}
};
SystemNode.dispose=function(node){
for(var prop in node){
node[prop]=null;
}
};
SystemNode.taggedNodes=new Map();
function SystemNode(data){
this.logger=SystemLogger.getLogger("SystemNode");
this._data=data;
this._actionProfile=null;
this._propertyBag=null;
this._registerSystemActions();
this.searchToken=null;
if(this._data.TagValue!=null){
SystemNode.taggedNodes.set(this._data.TagValue,this);
}
}
SystemNode.prototype.toString=function(){
return "[SystemNode]";
};
SystemNode.prototype._registerSystemActions=function(){
var self=this;
new List(this._data.ActionKeys).each(function(key){
if(!SystemAction.actionMap.has(key)){
new List(self._data.Actions).each(function(_230){
var _231=_230.ActionCategory.Name;
if(SystemAction.hasCategory(_231)){
var _232=new SystemAction(_230);
SystemAction.actionMap.set(_230.ActionKey,_232);
}else{
throw "No such action category: "+_231;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _233=null;
if(this.searchToken){
_233=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_233=System.getChildNodes(this);
}
return _233;
};
SystemNode.prototype.getDescendantBranch=function(list){
return System.getDescendantBranch(list);
};
SystemNode.prototype.getLabel=function(){
return this._data.Label;
};
SystemNode.prototype.getProviderName=function(){
return this._data.ProviderName;
};
SystemNode.prototype.getEntityToken=function(){
return this._data.EntityToken;
};
SystemNode.prototype.getPiggyBag=function(){
var _235=this._data.Piggybag;
if(_235==null){
_235="";
}
return _235;
};
SystemNode.prototype.getHandle=function(){
return this._data.ElementKey;
};
SystemNode.prototype.getTag=function(){
return this._data.TagValue;
};
SystemNode.prototype.getImageProfile=function(size){
return new ImageProfile({image:ImageProvider.getImageURL(this._data.Icon,size),imageActive:ImageProvider.getImageURL(this._data.OpenedIcon?this._data.OpenedIcon:this._data.Icon,size)});
};
SystemNode.prototype.getToolTip=function(){
var _237=null;
if(typeof this._data.ToolTip!="undefined"){
_237=this._data.ToolTip;
}
return _237;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_239){
map[_239.Key]=_239.Value;
});
this._propertyBag=map;
}
return this._propertyBag;
};
SystemNode.prototype.hasChildren=function(){
return this._data.HasChildren;
};
SystemNode.prototype.getActionProfile=function(){
if(this._actionProfile==null&&this._data.ActionKeys!=null&&this._data.ActionKeys.length>0){
var map=new Map();
var self=this;
new List(this._data.ActionKeys).each(function(key){
if(SystemAction.actionMap.has(key)){
var _23d=SystemAction.actionMap.get(key);
var _23e=true;
if(_23d.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_23e=false;
}
}
if(_23e){
var id=_23d.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_23d);
}
}else{
throw "No details for action key: "+key;
}
});
this._actionProfile=map;
}
return this._actionProfile;
};
SystemNode.prototype.hasDragType=function(){
return this._data.DragType!=null;
};
SystemNode.prototype.getDragType=function(){
return this._data.DragType;
};
SystemNode.prototype.hasDragAccept=function(){
return this._data.DropTypeAccept!=null;
};
SystemNode.prototype.getDragAccept=function(){
return new List(this._data.DropTypeAccept);
};
SystemNode.prototype.hasDetailedDropSupport=function(){
return this._data.DetailedDropSupported==true;
};
SystemNode.prototype.isDisabled=function(){
return this._data.IsDisabled==true;
};
SystemNode.prototype.isTreeLockEnabled=function(){
return this._data.TreeLockEnabled==true;
};
SystemNode.prototype.dispose=function(){
SystemNode.dispose(this);
};
SystemAction.OPEN_DOCUMENT="OpenDocument";
SystemAction.OPEN_MODAL_DIALOG="OpenModalDialog";
SystemAction.TAG_CHANGEFROMLANGUAGE="ChangeFromLocale";
SystemAction.categories={Edit:"Edit",Add:"Add",Delete:"Delete",Other:"Other",DeveloperMode:"DeveloperMode"};
SystemAction.activePositions={NavigatorTree:1,SelectorTree:2};
SystemAction.taggedActions=new Map();
SystemAction.actionMap=new Map();
SystemAction.invoke=function(_241,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_241.logger.debug("Execute \""+_241.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_241.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_244,_245){
action=SystemAction.taggedActions.get(_244);
node=SystemNode.taggedNodes.get(_245);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_246){
return SystemAction.categories[_246]?true:false;
};
function SystemAction(_247){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_247;
if(this._data.TagValue!=null){
SystemAction.taggedActions.set(this._data.TagValue,this);
}
}
SystemAction.prototype.toString=function(){
return "[SystemAction]";
};
SystemAction.prototype.getHandle=function(){
return this._data.ActionToken;
};
SystemAction.prototype.getKey=function(){
return this._data.ActionKey;
};
SystemAction.prototype.getLabel=function(){
return this._data.Label;
};
SystemAction.prototype.getImage=function(){
return ImageProvider.getImageURL(this._data.Icon);
};
SystemAction.prototype.getDisabledImage=function(){
return null;
};
SystemAction.prototype.getToolTip=function(){
return this._data.ToolTip;
};
SystemAction.prototype.getCategory=function(){
return this._data.ActionCategory.Name;
};
SystemAction.prototype.getGroupID=function(){
return this._data.ActionCategory.GroupId;
};
SystemAction.prototype.getGroupName=function(){
return this._data.ActionCategory.GroupName;
};
SystemAction.prototype.getActivePositions=function(){
return this._data.ActivePositions;
};
SystemAction.prototype.isInToolBar=function(){
return this._data.ActionCategory.IsInToolbar;
};
SystemAction.prototype.isInFolder=function(){
return this._data.ActionCategory.IsInFolder;
};
SystemAction.prototype.getFolderName=function(){
var _248=null;
if(this.isInFolder()){
_248=this._data.ActionCategory.FolderName;
}
return _248;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _249=null;
if(typeof this._data.TagValue!="undefined"){
_249=this._data.TagValue;
}
return _249;
};
SystemAction.prototype.isChecked=function(){
var _24a=null;
if(this.isCheckBox()){
_24a=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _24a;
};
function _UpdateManager(){
var _24b=null;
if(!window.UpdateManager){
this._construct();
_24b=this;
}
return _24b;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_24c){
var root=document.documentElement;
var _24e=root.namespaceURI;
if(_24e==null){
_24e=new String(root.getAttribute("xmlns"));
}
if(_24e=="http://www.w3.org/1999/xhtml"){
this._addListener(window,"load");
this._addListener(window,"unload");
}else{
this.error("Not an XHTML document!");
}
},_setup:function(){
if(this.isEnabled){
this.isEnabled=this.setupForms();
if(this.isEnabled){
if(this.xhtml!=null){
if(typeof this.xhtml=="string"){
var _24f=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_24f);
}else{
throw new TypeError();
}
}else{
var _250=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_250.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _252=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_252=true;
}
},this);
return _252;
},_setupForm:function(form){
var _255=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_255.isEnabled){
_255._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_256,type){
if(_256.addEventListener!=null){
_256.addEventListener(type,this,false);
}else{
var _258=this;
_256.attachEvent("on"+type,function(){
_258.handleEvent(window.event);
});
}
},handleEvent:function(e){
switch(e.type){
case "load":
if(this.isEnabled){
this._setup();
}
break;
case "unload":
this.isEnabled=false;
break;
case "submit":
if(this.isEnabled){
if(document.all){
e.returnValue=false;
}else{
e.preventDefault();
}
var form=e.target?e.target:e.srcElement;
this._submit(form);
}
break;
}
},_submit:function(form){
if(!this.isUpdating){
this.isUpdating=true;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_BEFOREUPDATE);
this._postRequest(form);
}
},handleResponse:function(dom){
if(this.isEnabled){
this.summary=new String("");
this.errors=new String("");
if(dom!=null){
var _25d=UpdateAssistant.getUpdateZones(dom);
var _25e=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_25d.forEach(function(_25f,_260){
var _261=_25e[_260];
this._crawl(_25f,_261);
},this);
this._updates.forEach(function(_262,_263){
_262.update();
_262.dispose();
},this);
this._dotnetnames.forEach(function(name){
this._fixdotnet(dom,name);
},this);
this.currentDOM=dom;
}
}
this.isUpdating=false;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},handleSimilarResponse:function(){
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},_crawl:function(_265,_266,_267,id){
var _269=true;
var _26a=_266.getAttribute("class");
if(_26a==null||_26a.indexOf(this.CLASSNAME_GONE)==-1){
if(_266.nodeType==Node.ELEMENT_NODE){
var _26b=_266.getAttribute("id");
if(_26b!=null){
_267=_265;
id=_26b;
}
}
if(_269=this._check(_265,_266,_267,id)){
var _26c=_265.firstChild;
var _26d=_266.firstChild;
while(_26c!=null&&_26d!=null&&!this._replaced[id]){
switch(_26c.nodeType){
case Node.TEXT_NODE:
_269=this._check(_26c,_26d,_267,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_269=this._crawl(_26c,_26d,_267,id);
break;
}
if(this._replaced[id]){
_269=false;
}else{
_26c=_26c.nextSibling;
_26d=_26d.nextSibling;
}
}
}
}
return _269;
},_check:function(_26e,_26f,_270,id){
var _272=true;
var _273=null;
var _274=false;
var _275=false;
if((_26e!=null&&_26f==null)||(_26e==null&&_26f!=null)){
_272=false;
}else{
if(_272=_26e.nodeType==_26f.nodeType){
switch(_26f.nodeType){
case Node.ELEMENT_NODE:
if(_26e.namespaceURI!=_26f.namespaceURI||_26e.nodeName!=_26f.nodeName){
_272=false;
}else{
if(_272=(_26e.nodeName==_26f.nodeName)){
var _276=_26f.getAttribute("id");
var _277=_26e.getAttribute("id");
if(_276!=null&&_277!=null){
if(_276!=_277){
_272=false;
}else{
if((_273=this._getPlugin(_26e,_26f))!=null){
if(_273.updateElement(_26e,_26f)){
_275=true;
_272=false;
}
}
}
}
if(_272){
if(_272=this._checkAttributes(_26e,_26f)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_26e)&&this._hasSoftChildren(_26f)){
if(this._validateSoftChildren(_26e,_26f)){
this._updateSoftChildren(_26e,_26f);
_274=true;
}
_272=false;
}else{
_272=_26e.childNodes.length==_26f.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_26e.data.trim()!=_26f.data.trim()){
_272=false;
}
break;
}
}
}
if(_272==false&&!_274&&!_275){
if(id!=null&&_270!=null){
this.addUpdate(new ReplaceUpdate(id,_270));
}
}
return _272;
},_checkAttributes:function(_278,_279){
var _27a=true;
var _27b=false;
var _27c=_278.attributes;
var _27d=_279.attributes;
if(_27c.length!=_27d.length){
_27b=true;
}else{
_27b=!Array.every(_27c,function(att1,i){
var att2=_27d.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_27b){
var _281=_278.getAttribute("id");
var _282=_279.getAttribute("id");
if(this.hasSoftAttributes&&_281!=null&&_281==_282){
this.addUpdate(new AttributesUpdate(_282,_278,_279));
}else{
_27a=false;
}
}
return _27a;
},_hasSoftChildren:function(_283){
var _284=true;
if(_283.hasChildNodes()){
_284=Array.every(_283.childNodes,function(node){
var res=true;
switch(node.nodeType){
case Node.TEXT_NODE:
res=!/[^\t\n\r ]/.test(node.nodeValue);
break;
case Node.ELEMENT_NODE:
res=node.getAttribute("id")!=null;
break;
}
return res;
});
}
return _284;
},_validateSoftChildren:function(_287,_288){
var _289=true;
var _28a=-1;
var _28b=-1;
var _28c=-1;
var news=this._toMap(_287.childNodes,true);
var olds=this._toMap(_288.childNodes,true);
for(var id in olds){
if(_289){
var _290=olds[id];
_289=_290>=_28a;
if(news[id]!=null){
_28c=news[id];
_289=_28c>=_28b;
}
}
_28a=_290;
if(_28c>-1){
_28b=_28c;
}
}
return _289;
},_updateSoftChildren:function(_291,_292){
var news=this._toMap(_291.childNodes);
var olds=this._toMap(_292.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _296=null;
for(id in news){
if(olds[id]==null){
var _297=news[id];
if(_296==null){
var _298=_292.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_298,_297,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_296,_297,false));
}
}
_296=id;
}
},addUpdate:function(_299){
this._updates.push(_299);
if(_299 instanceof ReplaceUpdate){
this._replaced[_299.id]=true;
}
},_getPlugin:function(_29a,_29b){
var _29c=null;
this.plugins.every(function(_29d){
if(_29d.handleElement(_29a,_29b)){
_29c=_29d;
}
return _29c==null;
});
return _29c;
},_toMap:function(_29e,_29f){
var _2a0={};
Array.forEach(_29e,function(node,_2a2){
if(node.nodeType==Node.ELEMENT_NODE){
_2a0[node.getAttribute("id")]=_29f?_2a2:node;
}
});
return _2a0;
},_getPost:function(form){
var _2a4=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a6){
if(_2a6.name==null||_2a6.name==""){
return;
}
var name=_2a6.name;
var _2a8=encodeURIComponent(_2a6.value);
switch(_2a6.type){
case "button":
case "submit":
var _2a9=UpdateAssistant.getActiveElement();
if(_2a6==_2a9&&name!=""){
_2a4+=name+"="+_2a8+"&";
}
break;
case "radio":
if(_2a6.checked){
_2a4+=name+"="+_2a8+"&";
}
break;
case "checkbox":
if(_2a6.checked){
if(_2a6.name==last){
if(_2a4.lastIndexOf("&")==_2a4.length-1){
_2a4=_2a4.substr(0,_2a4.length-1);
}
_2a4+=","+_2a8;
}else{
_2a4+=name+"="+_2a6.value;
}
last=name;
_2a4+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a4+=name+"="+_2a8+"&";
break;
}
});
}
return _2a4.substr(0,_2a4.length-1);
},_postRequest:function(form){
var _2ab=form.method!=""?form.method:"get";
var _2ac=form.action!=""?form.action:window.location.toString();
var _2ad=this._getPost(form);
if(_2ab=="get"){
if(_2ac.indexOf("?")>-1){
_2ac=_2ac+"&"+_2ad;
}else{
_2ac+"?"+_2ad;
}
}
var _2ae=this;
var _2af=UpdateAssistant.getXMLHttpRequest(_2ab,_2ac,this);
if(_2ab=="post"){
_2af.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2af.send(_2ab=="post"?_2ad:null);
},_fixdotnet:function(dom,id){
var _2b2=document.getElementById(id);
if(_2b2!=null){
var _2b3=UpdateAssistant.getElementById(dom,id);
if(_2b3!=null){
var _2b4=_2b3.getAttribute("value");
if(_2b4!==_2b2.value){
_2b2.value=_2b4;
}
}
}
},debug:function(out){
if(this.isDebugging){
alert("UpdateManager dysfunction. \n\n"+out);
}
},error:function(out){
this.errorsmessage=out;
UpdateAssistant.dispatchEvent(document.documentElement,UpdateManager.EVENT_ERRORUPDATE);
this.debug(out);
},report:function(_2b7){
this.summary+=_2b7+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b8=null;
if(!window.UpdateAssistant){
this._construct();
_2b8=this;
}
return _2b8;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b9,fun){
var _2bb=true;
var len=_2b9.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2bd=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b9[i]!="undefined"){
if(!fun.call(_2bd,_2b9[i],i,_2b9)){
_2bb=false;
break;
}
}
}
}
return _2bb;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c0=arguments[1];
return Array.every(this,fun,_2c0);
};
}
if(!Array.forEach){
Array.forEach=function(_2c1,fun){
var len=_2c1.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c4=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c1[i]!="undefined"){
fun.call(_2c4,_2c1[i],i,_2c1);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c7=arguments[1];
Array.forEach(this,fun,_2c7);
};
}
if(!String.prototype.trim){
String.prototype.trim=function(){
return this.replace(/^\s*/,"").replace(/\s*$/,"");
};
}
if(document.addEventListener!=null){
document.addEventListener("focus",this,false);
document.addEventListener("blur",this,false);
document.addEventListener("mousedown",this,false);
}
},handleEvent:function(e){
switch(e.type){
case "focus":
case "mousedown":
this._activeElement=e.target;
break;
case "blur":
if(this._activeElement==e.target){
this._activeElement=null;
}
break;
}
},getXMLHttpRequest:function(_2c9,_2ca,_2cb){
var _2cc=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2cc!=null){
_2cc.open(_2c9,_2ca,(_2cb!=null?true:false));
if(_2cb!=null){
function action(){
if(_2cc.readyState==4){
var _2cd=_2cc.getResponseHeader("X-Error-Type");
if(_2cd){
var _2ce="";
for(var i=0;i<10;i++){
var _2d0=i?i:"";
var _2cd=_2cc.getResponseHeader("X-Error-Type"+_2d0);
if(!_2cd){
break;
}
var _2d1=_2cc.getResponseHeader("X-Error-Message"+_2d0);
_2ce+=_2cd+"\n"+_2d1+"\n";
}
Dialog.error("Error",_2ce);
}else{
var text=_2cc.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2cb.handleResponse(dom);
}
}
}
}
if(_2cc.addEventListener!=null){
_2cc.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2cc.onreadystatechange=action;
}
}
}
return _2cc;
},dispatchEvent:function(_2d4,name){
var _2d6=true;
var _2d7=document.createEvent("UIEvents");
_2d7.initEvent(name,true,true);
_2d6=_2d4.dispatchEvent(_2d7);
return _2d6;
},getUpdateZones:function(dom){
var _2d9="//*[@id and contains(@class,'updatezone')]";
var _2da=[];
var _2db=null;
var _2dc=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2db=dom.evaluate(_2d9,dom,null,type,null);
while((_2dc=_2db.iterateNext())!=null){
_2da.push(_2dc);
}
}else{
_2db=dom.documentElement.selectNodes(_2d9);
Array.forEach(_2db,function(_2de){
_2da.push(_2de);
});
}
return _2da;
},getElementById:function(dom,id){
var _2e1="//*[@id='"+id+"']";
var _2e2=null;
var _2e3=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e2=dom.evaluate(_2e1,dom,null,type,null);
_2e3=_2e2.singleNodeValue;
}else{
_2e3=dom.documentElement.selectNodes(_2e1)[0];
}
return _2e3;
},_getIds:function(dom){
var _2e6="//*[@id]";
var _2e7=null;
var _2e8=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e7=dom.evaluate(_2e6,dom,null,type,null);
while((element=_2e7.iterateNext())!=null){
_2e8.push(element.getAttribute("id"));
}
}else{
_2e7=dom.documentElement.selectNodes(_2e6);
Array.forEach(_2e7,function(_2ea){
_2e8.push(_2ea.getAttribute("id"));
});
}
return _2e8;
},toHTMLElement:function(_2eb){
var _2ec=this.serialize(_2eb);
var temp=document.createElement("temp");
temp.innerHTML=_2ec;
return temp.firstChild;
},getActiveElement:function(){
var _2ee=document.activeElement;
if(_2ee==null||_2ee==document.body){
_2ee=this._activeElement;
}
return _2ee;
},serialize:function(_2ef){
var _2f0=null;
if(_2ef.xml!=null){
_2f0=_2ef.xml;
}else{
if(this._serializer!=null){
_2f0=this._serializer.serializeToString(_2ef);
}
}
return _2f0;
},hasDifferences:function(_2f1,_2f2){
var s1=null;
var s2=null;
if(_2f1.xml!=null){
s1=_2f1.xml;
s2=_2f2.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f1);
s2=this._serializer.serializeToString(_2f2);
}
}
return s1!=s2;
},parse:function(_2f5){
var _2f6=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f6=this._parser.parseFromString(_2f5,"text/xml");
}else{
_2f6=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f6.setProperty("SelectionLanguage","XPath");
_2f6.loadXML(_2f5);
}
return this._validate(_2f6);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f9=dom.getElementsByTagName("parsererror").item(0);
if(_2f9!=null){
out=_2f9.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2fd=!has[id];
has[id]=true;
if(!_2fd){
out="Element \""+id+"\" encountered twice.";
}
return _2fd;
});
}
if(out!=null){
UpdateManager.error(out);
dom=null;
}
return dom;
}};
var UpdateAssistant=new _UpdateAssistant();
function UpdatePlugin(){
this.handleElement=function(_2fe,_2ff){
var _300=false;
switch(_2fe.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2fe.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_300=false;
break;
}
break;
}
return _300;
};
this.updateElement=function(_301,_302){
var id=_301.getAttribute("id");
var _304=document.getElementById(id);
if(_304!=null){
var _305=null;
switch(_304.nodeName.toLowerCase()){
case "input":
_305=_301.getAttribute("value");
break;
case "textarea":
_305=_301.textContent?_301.textContent:_301.text;
break;
}
if(_305==null){
_305="";
}
if(_305!=_304.value){
_304.value=_305;
UpdateManager.report("Property [value] updated on field \""+id+"\"");
}
}
return true;
};
}
UpdateManager.plugins.push(new UpdatePlugin());
Update.TYPE_REPLACE="replace";
Update.TYPE_ATTRIBUTES="attributes";
Update.TYPE_REMOVE="remove";
Update.TYPE_INSERT="insert";
Update.EVENT_BEFOREUPDATE="beforeupdate";
Update.EVENT_AFTERUPDATE="afterupdate";
function Update(){
return this;
}
Update.prototype={type:null,key:null,id:null,element:null,update:function(){
},dispose:function(){
this.element=null;
},_beforeUpdate:function(_306){
var _307=true;
if(_306!=null){
_306.__updateType=this.type;
_307=UpdateAssistant.dispatchEvent(_306,Update.EVENT_BEFOREUPDATE);
}
return _307;
},_afterUpdate:function(_308){
var _309=true;
if(_308!=null){
_308.__updateType=this.type;
_309=UpdateAssistant.dispatchEvent(_308,Update.EVENT_AFTERUPDATE);
}
return _309;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_30b){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_30b;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _30c,_30d,_30e=UpdateAssistant.toHTMLElement(this.element);
if((_30c=document.getElementById(this.id))!=null){
if((_30d=_30c.parentNode)!=null){
var _30f=UserInterface.getBinding(_30c);
if(_30f!=null){
_30e.__isAttached=_30f.isAttached;
}
if(this._beforeUpdate(_30c)){
_30d.replaceChild(_30e,_30c);
this._afterUpdate(_30e);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_310){
var _311=ReplaceUpdate.superclass._afterUpdate.call(this,_310);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_310.nodeName=="form"||_310.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _311;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_314,_315){
this.type=type;
this.id=id;
this.element=_314;
this.isFirst=_315;
return this;
}
SiblingUpdate.prototype.update=function(){
var _316=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_316);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_316);
break;
}
};
SiblingUpdate.prototype._remove=function(_317){
var _318=_317.parentNode;
if(_318!=null){
if(this._beforeUpdate(_317)){
_318.removeChild(_317);
this._afterUpdate(_318);
}
}
};
SiblingUpdate.prototype._insert=function(_319,_31a){
var _31b=UpdateAssistant.toHTMLElement(_319);
if(this.isFirst){
var _31c=_31a;
if(_31c!=null){
if(this._beforeUpdate(_31c)){
_31c.insertBefore(_31b,_31c.firstChild);
this._afterUpdate(_31b);
}
}
}else{
var _31c=_31a.parentNode;
if(_31c!=null){
if(this._beforeUpdate(_31c)){
_31c.insertBefore(_31b,_31a.nextSibling);
this._afterUpdate(_31b);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_31d){
var _31e=SiblingUpdate.superclass._beforeUpdate.call(this,_31d);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_31d.id+"\"");
}
return _31e;
};
SiblingUpdate.prototype._afterUpdate=function(_31f){
var _320=true;
if(_31f!=null){
_320=SiblingUpdate.superclass._afterUpdate.call(this,_31f);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_31f.id+"\"");
if(_31f.nodeName=="form"||_31f.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _320;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_322,_323){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_322;
this.currentElement=_323;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _324=document.getElementById(this.id);
if(this._beforeUpdate(_324)){
this._updateAttributes(_324);
this._afterUpdate(_324);
}
};
AttributesUpdate.prototype._updateAttributes=function(_325){
Array.forEach(this.element.attributes,function(_326){
var _327=this.currentElement.getAttribute(_326.nodeName);
if(_327==null||_327!=_326.nodeValue){
this._setAttribute(_325,_326.nodeName,_326.nodeValue);
this._summary.push("@"+_326.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_328){
if(this.element.getAttribute(_328.nodeName)==null){
this._setAttribute(_325,_328.nodeName,null);
this._summary.push("@"+_328.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_329,name,_32b){
if(_329==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_32b);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _32c=(_32b==null);
if(_32c){
_329.removeAttribute(name);
}else{
_329.setAttribute(name,_32b);
}
if(document.all!=null){
if(_32c){
_32b="";
}
switch(name.toLowerCase()){
case "class":
_329.className=_32b;
break;
case "disabled":
_329.disabled=!_32c;
break;
case "checked":
_329.checked=!_32c;
break;
case "readonly":
_329.readOnly=!_32c;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_32d){
AttributesUpdate.superclass._afterUpdate.call(this,_32d);
UpdateManager.report("Attributes updated on element id=\""+this.id+"\": "+this._summary.toString());
};
AttributesUpdate.prototype.dispose=function(){
Update.prototype.dispose.call(this);
this.currentElement=null;
};
if(!window.Node){
window.Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
window.KeyEventCodes={VK_BACK:8,VK_TAB:9,VK_ENTER:13,VK_SHIFT:16,VK_CONTROL:17,VK_ALT:18,VK_ESCAPE:27,VK_SPACE:32,VK_PAGE_UP:33,VK_PAGE_DOWN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40,VK_COMMAND:91,VK_INSERT:null,VK_DELETE:127,VK_PLUS:187,VK_MINUS:189,VK_NUMPLUS:107,VK_NUMMINUS:109,VK_F1:112};
if(window==top){
window.app=this;
}else{
window.app=top.app;
}
window.bindingMap={};
window.standardEventHandler=null;
if(window!=window.top){
top.Application.declareTopLocal(window);
}
function _WindowManager(){
this._construct(KeyMaster.getUniqueKey());
}
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_32e,key){
return _32e.replace("${windowkey}",document.location+":"+key);
},_construct:function(key){
this.WINDOW_LOADED_BROADCAST=this._compute(BroadcastMessages.$WINKEY_LOADED,key);
this.WINDOW_UNLOADED_BROADCAST=this._compute(BroadcastMessages.$WINKEY_UNLOADED,key);
this.WINDOW_EVALUATED_BROADCAST=this._compute(BroadcastMessages.$WINKEY_EVALUATED,key);
this.WINDOW_RESIZED_BROADCAST=this._compute(BroadcastMessages.$WINKEY_RESIZED,key);
DOMEvents.addEventListener(window,DOMEvents.DOM,this);
DOMEvents.addEventListener(window,DOMEvents.LOAD,this);
DOMEvents.addEventListener(window,DOMEvents.UNLOAD,this);
},handleEvent:function(e){
switch(e.type){
case DOMEvents.DOM:
this.onDOMContentLoaded();
break;
case DOMEvents.LOAD:
if(!this.isWindowLoaded){
this.isWindowLoaded=true;
EventBroadcaster.broadcast(this.WINDOW_LOADED_BROADCAST,this);
while(this._onloadstatements.hasNext()){
this._onloadstatements.getNext().fireOnLoad();
}
this._currentDimensions=this.getWindowDimensions();
DOMEvents.addEventListener(window,DOMEvents.RESIZE,this);
EventBroadcaster.broadcast(this.WINDOW_EVALUATED_BROADCAST,this);
DOMEvents.removeEventListener(window,DOMEvents.LOAD,this);
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.RESIZE:
if(window==top){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,document.body);
}
this._onresizestatements.reset();
while(this._onresizestatements.hasNext()){
this._onresizestatements.getNext().fireOnResize();
}
this._newDimensions=WindowManager.getWindowDimensions();
var _332=this._newDimensions.w!=this._currentDimensions.w;
var _333=this._newDimensions.h!=this._currentDimensions.h;
if(_332||_333){
if(this._broadcastTimeout!=null){
clearTimeout(this._broadcastTimeout);
this._broadcastTimeout=null;
}
var self=this;
this._broadcastTimeout=setTimeout(function(){
self._broadcastResizeEvent();
},250);
}
break;
case DOMEvents.UNLOAD:
EventBroadcaster.broadcast(this.WINDOW_UNLOADED_BROADCAST);
break;
}
},_broadcastResizeEvent:function(){
clearTimeout(this._broadcastTimeout);
this._broadcastTimeout=null;
EventBroadcaster.broadcast(this.WINDOW_RESIZED_BROADCAST);
this._currentDimensions=this._newDimensions;
},fireOnDOM:function(_335){
if(Interfaces.isImplemented(IDOMHandler,_335,true)){
this._ondomstatements.add(_335);
}
},fireOnLoad:function(_336){
if(Interfaces.isImplemented(ILoadHandler,_336,true)){
this._onloadstatements.add(_336);
}
},fireOnResize:function(_337){
if(Interfaces.isImplemented(IResizeHandler,_337,true)){
this._onresizestatements.add(_337);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_338){
return eval(_338);
}};
var WindowManager=new _WindowManager();
new function WindowAssistant(){
if(Client.isExplorer){
WindowManager.onDOMContentLoaded();
}
};
top.app=null;
function _Application(){
this._construct();
}
_Application.prototype={CONSOLE_ID:KeyMaster.getUniqueKey(),_TIMEOUT_LOSTFOCUS:250,logger:SystemLogger.getLogger("Application"),timer:SystemTimer.getTimer("Application"),isDeveloperMode:false,isLocalHost:false,hasExternalConnection:false,isLoggedIn:false,isLoggedOut:false,isLocked:false,hasStartPage:true,isMalFunctional:false,isOperational:false,isShuttingDown:false,isOffLine:false,isFocused:true,isBlurred:false,_isMousePositionTracking:false,_mousePosition:null,_cursorStartPoint:null,_isDragging:false,_isShutDownAllowed:true,_lockers:0,_lockthings:{},_isRegistered:null,_activeBinding:null,_activatedBindings:new List(),_dirtyTabs:new Map(),_topLevelClasses:typeof topLevelClassNames!="undefined"?new List(topLevelClassNames):null,_construct:function(){
EventBroadcaster.subscribe(WindowManager.WINDOW_EVALUATED_BROADCAST,{handleBroadcast:function(){
try{
Application.initialize();
}
catch(exception){
SystemDebug.stack(arguments);
throw (exception);
}
}});
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_339,_33a){
SystemLogger.unsuspend(_33a);
}});
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_CLOSED,{handleBroadcast:function(){
SystemLogger.suspend();
}});
EventBroadcaster.subscribe(BroadcastMessages.STAGE_INITIALIZED,{handleBroadcast:function(){
setTimeout(function(){
ProgressBarBinding.notch(4);
Application.isOperational=true;
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_OPERATIONAL);
},PageBinding.TIMEOUT);
}});
EventBroadcaster.subscribe(BroadcastMessages.KEY_ESCAPE,{handleBroadcast:function(){
if(Application.isLocked){
Application.unlock(Application,true);
}
}});
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,{handleBroadcast:function(){
Application.isOffLine=true;
}});
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,{handleBroadcast:function(){
Application.isOffLine=false;
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_33b,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _33e=top.app.bindingMap.broadcasterHasDirtyTabs;
_33e.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_33f,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _342=top.app.bindingMap.broadcasterHasDirtyTabs;
_342.disable();
}
}});
},toString:function(){
return "[Application]";
},login:function(){
this.isLoggedIn=true;
ConfigurationService=WebServiceProxy.createProxy(Constants.URL_WSDL_CONFIGURATION);
ConsoleMessageQueueService=WebServiceProxy.createProxy(Constants.URL_WSDL_MESSAGEQUEUE);
EditorConfigurationService=WebServiceProxy.createProxy(Constants.URL_WSDL_EDITORCONFIG);
FlowControllerService=WebServiceProxy.createProxy(Constants.URL_WSDL_FLOWCONTROLLER);
StringService=WebServiceProxy.createProxy(Constants.URL_WSDL_STRINGSERVICE);
TreeService=WebServiceProxy.createProxy(Constants.URL_WSDL_TREESERVICE);
SecurityService=WebServiceProxy.createProxy(Constants.URL_WSDL_SECURITYSERVICE);
XhtmlTransformationsService=WebServiceProxy.createProxy(Constants.URL_WSDL_XHTMLTRANSFORM);
PageTemplateService=WebServiceProxy.createProxy(Constants.URL_WSDL_PAGETEMPLATE);
FunctionService=WebServiceProxy.createProxy(Constants.URL_WSDL_FUNCTIONSERVICE);
LocalizationService=WebServiceProxy.createProxy(Constants.URL_WSDL_LOCALIZATION);
SourceValidationService=WebServiceProxy.createProxy(Constants.URL_WSDL_SOURCEVALIDATION);
MarkupFormatService=WebServiceProxy.createProxy(Constants.URL_WSDL_MARKUPFORMAT);
PageService=WebServiceProxy.createProxy(Constants.URL_WSDL_PAGESERVICE);
ProgressBarBinding.notch(4);
function next(){
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_LOGIN);
}
if(Client.isWebKit){
setTimeout(function(){
next();
},0);
}else{
next();
}
},logout:function(){
var _343=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_343=LoginService.Logout(true);
if(!_343){
alert("Logout failed.");
}
}
return _343;
},lock:function(_344){
if(_344!=null){
this._lockthings[_344]=true;
if(top.bindingMap.mastercover!=null){
if(this._lockers>=0){
this._lockers++;
if(this._lockers==1){
this.isLocked=true;
top.bindingMap.mastercover.show();
if(top.app!=null&&top.app.bindingMap.throbber!=null){
top.app.bindingMap.throbber.play();
}
}
}
}
}else{
throw "Application: No locker specified.";
}
},unlock:function(_345,_346){
if(_345!=null){
delete this._lockthings[_345];
if(top.bindingMap.mastercover!=null){
if(_346||this._lockers>0){
if(_346){
var out="Unlocked by "+new String(_345)+"\n";
for(var _348 in this._lockthings){
out+="Locked by "+new String(_348)+". ";
}
this.logger.debug(out);
this._lockers=0;
}else{
this._lockers--;
}
if(this._lockers==0){
this.isLocked=false;
top.bindingMap.mastercover.hide();
if(top.app!=null&&top.app.bindingMap.throbber!=null){
setTimeout(function(){
top.app.bindingMap.throbber.stop();
},250);
}
}
}
}
}else{
throw "Application: No unlocker specified.";
}
},hasLock:function(_349){
return this._lockthings[_349]==true;
},activate:function(_34a){
var _34b=this._activeBinding;
this._activeBinding=_34a;
this._activatedBindings.add(_34a);
if(_34b&&_34b.isActive){
_34b.deActivate();
}
},deActivate:function(_34c){
var _34d=null;
var _34e=null;
if(_34c==this._activeBinding){
while(!_34e&&this._activatedBindings.hasEntries()){
_34d=this._activatedBindings.extractLast();
if(_34d!=_34c&&_34d.isActivatable){
_34e=_34d;
}
}
if(!_34e){
_34e=app.bindingMap.explorerdock;
}
_34e.activate();
}
},focused:function(_34f){
this.isFocused=_34f;
if(_34f){
if(this.isBlurred){
this.isBlurred=false;
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_FOCUSED);
}
}else{
setTimeout(function(){
if(!Application.isFocused){
Application.isBlurred=true;
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_BLURRED);
}
},Application._TIMEOUT_LOSTFOCUS);
}
},initialize:function(){
DOMEvents.addEventListener(top,DOMEvents.UNLOAD,{handleEvent:function(e){
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_ONSHUTDOWN);
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_SHUTDOWN);
if(!Application.isShuttingDown){
Application.isShuttingDown=true;
if(FlowControllerService!=null){
FlowControllerService.ReleaseAllConsoleResources(Application.CONSOLE_ID);
}
}
if(this.isLoggedIn&&!Application.isDeveloperMode){
Application.logout();
}
}});
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_STARTUP);
},cancelShutDown:function(){
this._isShutDownAllowed=false;
},framework:function(doc){
var win=DOMUtil.getParentWindow(doc);
if(win!=null){
if(!win.standardEventHandler){
win.standardEventHandler=new StandardEventHandler(doc);
}else{
}
}
},normalize:function(doc){
},handleAction:function(_354){
switch(_354.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _356=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_358){
var src=_358.src;
if(src.indexOf(_356)>-1){
var name=src.substring(src.lastIndexOf("/")+1,src.lastIndexOf(".js"));
self._topLevelClasses.add(name);
}
});
}
this._topLevelClasses.each(function(name){
if(window[name]!=null){
win[name]=window[name];
}
});
},trackMousePosition:function(e){
var _35d=false;
if(this._isMousePositionTracking){
_35d=true;
if(Client.isExplorer&&e.button!=1){
_35d=false;
}
if(_35d){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _35d;
},enableMousePositionTracking:function(e){
if(e){
this._isMousePositionTracking=true;
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}else{
throw new Error("Application: MouseEvent undefined.");
}
},disableMousePositionTracking:function(){
this._isMousePositionTracking=false;
this._mouseposition=null;
},getMousePosition:function(){
return this._mousePosition;
},onDragStart:function(_35f){
var _360=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_360,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_360.getImage());
this._cursorStartPoint=_35f;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_360.showDrag){
_360.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_360.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _362=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_362);
}
},onDragStop:function(diff){
if(this._isDragging){
var _364=BindingDragger.draggedBinding;
if(_364.hideDrag){
_364.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_364.dragType);
this._isDragging=false;
_364=BindingAcceptor.acceptingBinding;
if(_364!=null){
if(Interfaces.isImplemented(IAcceptable,_364,true)==true){
_364.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_364);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_365){
if(this.isDeveloperMode||_365){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_366){
if(_366==Dialog.RESPONSE_ACCEPT){
Application.reload(true);
}
}});
}else{
Application.reload(true);
}
}
},quit:function(){
Application.isShuttingDown=true;
if(FlowControllerService!=null){
FlowControllerService.ReleaseAllConsoleResources(Application.CONSOLE_ID);
}
if(this.logout()){
top.close();
top.bindingMap.logoutcover.show();
}
},hasDirtyDockTabs:function(){
return this._dirtyTabs.countEntries()>0;
},getDirtyDockTabsTabs:function(){
return this._dirtyTabs;
}};
var Application=new _Application();
function _Installation(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_KICKSTART,this);
}
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_367){
switch(_367){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_369){
switch(_369.Key){
case "ProductVersion":
this.versionString=_369.Value;
break;
case "ProductTitle":
this.versionPrettyString=_369.Value;
break;
case "InstallationId":
this.installationID=_369.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_369.Value;
break;
}
},this);
break;
}
}};
var Installation=new _Installation();
function _Keyboard(){
}
_Keyboard.prototype={_logger:SystemLogger.getLogger("Keyboard"),isShiftPressed:false,isControlPressed:false,keyEnter:function(){
EventBroadcaster.broadcast(BroadcastMessages.KEY_ENTER);
},keyEscape:function(){
EventBroadcaster.broadcast(BroadcastMessages.KEY_ESCAPE);
},keySpace:function(){
EventBroadcaster.broadcast(BroadcastMessages.KEY_SPACE);
},keyShift:function(){
this.isShiftPressed=true;
EventBroadcaster.broadcast(BroadcastMessages.KEY_SHIFT_DOWN);
},keyControl:function(){
this.isControlPressed=true;
EventBroadcaster.broadcast(BroadcastMessages.KEY_CONTROL_DOWN);
},keyArrow:function(key){
EventBroadcaster.broadcast(BroadcastMessages.KEY_ARROW,key);
},keyAlt:function(){
EventBroadcaster.broadcast(BroadcastMessages.KEY_ALT);
},keyTab:function(){
EventBroadcaster.broadcast(BroadcastMessages.KEY_TAB);
},keyUp:function(e){
if(this.isShiftPressed&&e.keyCode==window.KeyEventCodes.VK_SHIFT){
this.isShiftPressed=false;
EventBroadcaster.broadcast(BroadcastMessages.KEY_SHIFT_UP);
}else{
if(this.isControlPressed&&e.keyCode==window.KeyEventCodes.VK_CONTROL){
this.isControlPressed=false;
EventBroadcaster.broadcast(BroadcastMessages.KEY_CONTROL_UP);
}
}
}};
var Keyboard=new _Keyboard();
window.Preferences=new function(){
var _36c=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _36d={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36e=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36e){
for(var key in _36e){
_36d[key]=_36e[key];
}
debug(true);
}else{
debug(false);
}
}else{
debug(false);
}
}});
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN,{handleBroadcast:function(){
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.PREFERENCES,_36d);
}
}});
this.getPref=function(key){
var _371=null;
if(key){
_371=_36d[key];
}else{
throw "No such preference.";
}
return _371;
};
this.setPref=function(key,_373){
if(key){
_36d[key]=_373;
}else{
throw "No such preference.";
}
};
function debug(_374){
var _375=_374?"Persisted preferences":"No persisted preferences. Using defaults";
_375+=":\n";
for(var key in _36d){
var pref=_36d[key];
_375+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_36c.fine(_375);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _37a=null;
if(this.isInitialized==true){
if(this._persistance){
var _37b=this._persistance[id];
if(_37b){
_37a=_37b[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _37a;
},setPersistedProperty:function(id,prop,_37e){
if(this.isInitialized==true){
if(this._persistance){
if(_37e!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37e);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37f){
switch(_37f){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _380=top.bindingMap.persistance;
_380.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _381=top.bindingMap.persistance;
var map=_381.getPersistanceMap();
if(map){
this.isEnabled=true;
this._persistance=map;
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN,this);
}
}else{
this.isEnabled=false;
}
EventBroadcaster.broadcast(BroadcastMessages.PERSISTANCE_INITIALIZED);
}
}};
var Persistance=new _Persistance();
var LocalStore=new function(){
this.isInitialized=true;
this.isEnabled=false;
this.openedNodes=new SystemNodeList();
this.focuseNodes=new SystemNodeList();
};
StandardEventHandler.isBackAllowed=false;
function StandardEventHandler(doc,_384){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_384;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
DOMEvents.addEventListener(doc,DOMEvents.TOUCHSTART,this);
if(Client.isExplorer||Client.isExplorer11){
DOMEvents.addEventListener(this._contextDocument,DOMEvents.HELP,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
DOMEvents.addEventListener(this._contextWindow,DOMEvents.HELP,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
}
if(!this._isMouseHandlerOnly){
DOMEvents.addEventListener(doc,DOMEvents.KEYDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.KEYUP,this);
if(this._contextWindow.WindowManager==null){
if(Client.isExplorer){
DOMEvents.addEventListener(doc,DOMEvents.FOCUSIN,this);
DOMEvents.addEventListener(doc,DOMEvents.FOCUSOUT,this);
}else{
if(this._contextDocument.designMode!="on"){
DOMEvents.addEventListener(doc,DOMEvents.FOCUS,this,true);
DOMEvents.addEventListener(doc,DOMEvents.BLUR,this,true);
}
}
}
var _388={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_388);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_388);
}
if(Client.isMozilla){
doc.addEventListener(DOMEvents.KEYDOWN,{handleEvent:function(e){
var s=83;
if(Client.isMac){
if(e.metaKey&&e.keyCode==s&&!e.altKey){
e.preventDefault();
}
}else{
if(e.ctrlKey&&e.keyCode==s&&!e.altKey){
e.preventDefault();
}
}
}},true);
}
};
StandardEventHandler.prototype.handleEvent=function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
this._handleMouseDown(e);
break;
case DOMEvents.MOUSEUP:
this._handleMouseUp(e);
break;
case DOMEvents.MOUSEMOVE:
this._handleMouseMove(e);
break;
case DOMEvents.TOUCHSTART:
this._handleTouchStart(e);
break;
case DOMEvents.KEYDOWN:
this._handleKeyDown(e);
break;
case DOMEvents.KEYUP:
this._handleKeyUp(e);
break;
case DOMEvents.FOCUS:
case DOMEvents.BLUR:
case DOMEvents.FOCUSIN:
case DOMEvents.FOCUSOUT:
this._handleFocus(e);
break;
}
};
StandardEventHandler.prototype._handleMouseDown=function(e){
Application.trackMousePosition(e);
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,e);
if(e.button!=ButtonStateManager.RIGHT_BUTTON){
var node=DOMEvents.getTarget(e);
while(node!=null){
switch(node.nodeType){
case Node.ELEMENT_NODE:
var _38f=UserInterface.getBinding(node);
if(_38f!=null){
_38f.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38f!=null?null:node.parentNode;
break;
case Node.DOCUMENT_NODE:
node=DOMUtil.getParentWindow(node).frameElement;
break;
default:
node=null;
break;
}
}
}
};
StandardEventHandler.prototype._handleMouseUp=function(e){
Application.trackMousePosition(e);
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEUP,e);
};
StandardEventHandler.prototype._handleMouseMove=function(e){
try{
var _392=Application.trackMousePosition(e);
if(_392){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleTouchStart=function(e){
EventBroadcaster.broadcast(BroadcastMessages.TOUCHEVENT_TOUCHSTART,e);
};
StandardEventHandler.prototype._handleKeyDown=function(e,_395){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_395){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_395=true;
}
if(!this.hasNativeKeys&&!e.shiftKey&&!e.ctrlKey){
switch(e.keyCode){
case KeyEventCodes.VK_UP:
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_LEFT:
case KeyEventCodes.VK_RIGHT:
case KeyEventCodes.VK_SPACE:
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
}
}
if(e.keyCode==KeyEventCodes.VK_BACK){
if(!StandardEventHandler.isBackAllowed||UserInterface.hasBinding(e.target)){
DOMEvents.preventDefault(e);
}
}
var _396=KeySetBinding.handleKey(this._contextDocument,e);
if(!_396){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _397=this._contextWindow.frameElement;
if(_397!=null){
var _398=DOMUtil.getParentWindow(_397);
if(_398.standardEventHandler!=null){
_398.standardEventHandler._handleKeyDown(e,_395);
}
}
break;
}
}
};
StandardEventHandler.prototype._handleTab=function(e){
if(!this._isAllowTabs){
if(!e.ctrlKey){
if(e.shiftKey){
FocusBinding.navigatePrevious();
}else{
FocusBinding.navigateNext();
}
}
}
};
StandardEventHandler.prototype._handleFocus=function(e){
var _39b=false;
var _39c=DOMEvents.getTarget(e);
var name=_39c.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_39b=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_39b;
}
if(_39b){
if(!this.hasNativeKeys){
this.enableNativeKeys();
}
}else{
if(this.hasNativeKeys){
this.disableNativeKeys();
}
}
break;
}
};
StandardEventHandler.prototype._handleKeyUp=function(e){
Keyboard.keyUp(e);
};
StandardEventHandler.prototype.enableNativeKeys=function(_39f){
this._isAllowTabs=(_39f==true?true:false);
var self=this;
top.setTimeout(function(){
self.hasNativeKeys=true;
StandardEventHandler.isBackAllowed=true;
},0);
};
StandardEventHandler.prototype.disableNativeKeys=function(){
this._isAllowTabs=false;
this.hasNativeKeys=false;
StandardEventHandler.isBackAllowed=false;
};
Action.isValid=function(type){
return typeof type!=Types.UNDEFINED;
};
function Action(_3a2,type){
this.target=_3a2;
this.type=type;
this.listener=null;
this.isConsumed=false;
this.isCancelled=false;
}
Action.prototype.consume=function(){
this.isConsumed=true;
};
Action.prototype.cancel=function(){
this.isCancelled=true;
};
Animation.DEFAULT_TIME=parseInt(250);
function Animation(_3a4){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a5 in _3a4){
this[_3a5]=_3a4[_3a5];
}
}
Animation.prototype.play=function(){
if(!this.isPlaying){
var self=this;
this._nextframe=function(){
window[this.id]=setTimeout(function(){
self.play();
},this.interval);
};
this.onstart(this.iterator);
this._nextframe();
this.isPlaying=true;
}else{
if(this.modifier>0?this.iterator>=this.endcount:this.iterator<=this.endcount){
this.stop();
}else{
var it1=this.iterator;
var it2=this.onstep(this.iterator);
if(it2&&it2!=it1){
this.iterator=it2;
}else{
this.iterator+=this.modifier;
}
this._nextframe();
}
}
};
Animation.prototype.stop=function(){
this.onstop(this.iterator);
this.isPlaying=false;
};
Animation.prototype.onstart=function(_3a9){
};
Animation.prototype.onstep=function(_3aa){
};
Animation.prototype.onstop=function(_3ab){
};
Point.isEqual=function(p1,p2){
var _3ae=false;
if(p1&&p2){
_3ae=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3ae;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b3=false;
if(dim1&&dim2){
_3b3=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b3;
};
function Dimension(w,h){
this.w=w;
this.h=h;
}
Dimension.prototype={w:0,h:0};
function Geometry(x,y,w,h){
this.x=x;
this.y=y;
this.w=w;
this.h=h;
}
BindingAcceptor.acceptingBinding=null;
function BindingAcceptor(_3ba){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3ba;
this._acceptedList={};
this._isAccepting=false;
this._corsor=null;
this._initialize();
return this;
}
BindingAcceptor.prototype._initialize=function(){
EventBroadcaster.subscribe(BroadcastMessages.TYPEDRAG_START,this);
EventBroadcaster.subscribe(BroadcastMessages.TYPEDRAG_STOP,this);
if(this._binding.dragAccept){
EventBroadcaster.subscribe(BroadcastMessages.TYPEDRAG_PAUSE,this);
var _3bb=new List(this._binding.dragAccept.split(" "));
while(_3bb.hasNext()){
var type=_3bb.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3bd,arg){
var type=arg;
try{
switch(_3bd){
case BroadcastMessages.TYPEDRAG_START:
if(this._cursor==null){
this._cursor=app.bindingMap.dragdropcursor;
}
this._binding.addEventListener(DOMEvents.MOUSEENTER,this);
this._binding.addEventListener(DOMEvents.MOUSELEAVE,this);
if(this.isAccepting(type)){
this._isAccepting=true;
this._startAccepting();
}
break;
case BroadcastMessages.TYPEDRAG_STOP:
this._binding.removeEventListener(DOMEvents.MOUSEENTER,this);
this._binding.removeEventListener(DOMEvents.MOUSELEAVE,this);
if(this.isAccepting(type)){
this._isAccepting=false;
this._stopAccepting();
}
break;
case BroadcastMessages.TYPEDRAG_PAUSE:
if(this.isAccepting(type)){
this._pauseAccepting();
}
break;
}
}
catch(exception){
this.logger.debug(exception);
}
};
BindingAcceptor.prototype.isAccepting=function(type){
return Types.isDefined(this._acceptedList[type]);
};
BindingAcceptor.prototype._startAccepting=function(){
if(Types.isFunction(this._binding.showGeneralAcceptance)){
this._binding.showGeneralAcceptance();
}
};
BindingAcceptor.prototype._pauseAccepting=function(){
if(this._binding.hideAcceptance){
this._binding.hideAcceptance();
}
this._cursor.hideAcceptance();
BindingAcceptor.acceptingBinding=null;
};
BindingAcceptor.prototype._stopAccepting=function(){
if(this._binding.hideGeneralAcceptance){
this._binding.hideGeneralAcceptance();
}
if(this._binding.hideAcceptance){
this._binding.hideAcceptance();
}
};
BindingAcceptor.prototype.handleEvent=function(e){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(this._isAccepting){
if(BindingAcceptor.acceptingBinding!=this._binding){
BindingAcceptor.acceptingBinding=this._binding;
this._cursor.showAcceptance();
if(Types.isFunction(this._binding.showAcceptance)){
this._binding.showAcceptance();
}
}
}else{
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_PAUSE);
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(this._isAccepting){
BindingAcceptor.acceptingBinding=null;
this._cursor.hideAcceptance();
if(Types.isFunction(this._binding.hideAcceptance)){
this._binding.hideAcceptance();
}
}else{
DOMEvents.stopPropagation(e);
}
break;
}
DOMEvents.stopPropagation(e);
};
BindingAcceptor.prototype.dispose=function(){
EventBroadcaster.unsubscribe(BroadcastMessages.TYPEDRAG_START,this);
EventBroadcaster.unsubscribe(BroadcastMessages.TYPEDRAG_STOP,this);
};
function BindingBoxObject(_3c2){
this._domElement=_3c2.getBindingElement();
}
BindingBoxObject.prototype.getUniversalPosition=function(){
return DOMUtil.getUniversalPosition(this._domElement);
};
BindingBoxObject.prototype.getGlobalPosition=function(){
return DOMUtil.getGlobalPosition(this._domElement);
};
BindingBoxObject.prototype.getLocalPosition=function(){
return DOMUtil.getLocalPosition(this._domElement);
};
BindingBoxObject.prototype.getDimension=function(){
var rect=this._domElement.getBoundingClientRect();
return new Dimension(rect.right-rect.left,rect.bottom-rect.top);
};
BindingBoxObject.prototype.dispose=function(){
this._domElement=null;
};
BindingDragger.isDragging=false;
BindingDragger.draggedBinding=null;
BindingDragger.bindingDragger=null;
function BindingDragger(_3c4){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c4;
this.isDragReady=false;
this.isDragging=false;
this.startPoint=null;
this.currentEvent=null;
}
BindingDragger.prototype.handleEvent=function(e){
if(e.type==DOMEvents.MOUSEUP){
this.isDragReady=false;
}else{
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!DOMEvents.isRightButton(e)){
this.isDragReady=true;
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.MOUSEMOVE:
if(this.isDragReady==true){
this.binding.dispatchAction(Binding.ACTION_DRAG);
if(this.handler){
this.onDragStart(e);
}
this.isDragReady=false;
}
break;
}
}
}
};
BindingDragger.prototype.registerHandler=function(_3c6){
if(Interfaces.isImplemented(IDragHandler,_3c6)==true){
this.handler=_3c6;
}else{
throw new Error("BindingDragger: Interface IDraghandler not implemented.");
}
};
BindingDragger.prototype.onDragStart=function(e){
if(!this.isDragging){
Application.enableMousePositionTracking(e);
this.startPoint=Application.getMousePosition();
this.isDragging=true;
BindingDragger.isDragging=true;
BindingDragger.draggedBinding=this.binding;
this.handler.onDragStart(this.startPoint);
EventBroadcaster.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,this);
EventBroadcaster.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP,this);
}
};
BindingDragger.prototype.onDrag=function(e){
if(this.isDragging==true){
var _3c9=e.button==(e.target?0:1);
if(_3c9){
this.handler.onDrag(this.getDiff());
}else{
this.onDragStop(e);
}
}
};
BindingDragger.prototype.onDragStop=function(e){
if(this.isDragging==true){
Application.disableMousePositionTracking();
this.handler.onDragStop(this.getDiff());
this.isDragging=false;
BindingDragger.isDragging=false;
BindingDragger.draggedBinding=null;
EventBroadcaster.unsubscribe(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,this);
EventBroadcaster.unsubscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP,this);
}
};
BindingDragger.prototype.getDiff=function(){
var _3cb=Application.getMousePosition();
var dx=_3cb.x-this.startPoint.x;
var dy=_3cb.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3ce,e){
switch(_3ce){
case BroadcastMessages.MOUSEEVENT_MOUSEMOVE:
this.onDrag(e);
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
this.onDragStop(e);
break;
}
};
BindingDragger.prototype.dispose=function(){
this.binding=null;
};
BindingParser.XML="<div xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:ui=\"http://www.w3.org/1999/xhtml\">${markup}</div>";
function BindingParser(_3d0){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d0;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d1){
var _3d2=new List();
var xml=BindingParser.XML.replace("${markup}",_3d1);
var doc=XMLParser.parse(_3d1);
if(doc){
var _3d5=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d5);
var node=_3d5.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d2.add(node);
}
node=node.nextSibling;
}
}
return _3d2;
};
BindingParser.prototype._iterate=function(_3d7,_3d8){
var _3d9=null;
switch(_3d7.nodeType){
case Node.ELEMENT_NODE:
_3d9=this._cloneElement(_3d7);
UserInterface.registerBinding(_3d9);
break;
case Node.TEXT_NODE:
_3d9=this._ownerDocument.createTextNode(_3d7.nodeValue);
break;
}
if(_3d9){
_3d8.appendChild(_3d9);
}
if(_3d9&&_3d7.hasChildNodes()){
var _3da=_3d7.firstChild;
while(_3da){
this._iterate(_3da,_3d9);
_3da=_3da.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3db){
var _3dc=DOMUtil.createElementNS(_3db.namespaceURI?_3db.namespaceURI:Constants.NS_XHTML,_3db.nodeName,this._ownerDocument);
var i=0;
while(i<_3db.attributes.length){
var attr=_3db.attributes.item(i++);
_3dc.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3dc;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3df){
var _3e0=null;
var _3e1=false;
var _3e2=_3df.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3df)){
var _3e3=UserInterface.getBinding(_3df);
_3e1=BindingSerializer.activeInstance.indexBinding(_3e3);
if(_3e1){
_3e0=_3e3.key;
_3df.setAttribute(BindingSerializer.KEYPOINTER,_3e0);
}
}
_3e0=_3e0?_3e0:_3e2;
var _3e4=new List(_3df.childNodes);
_3e4.each(function(_3e5){
if(_3e5.nodeType==Node.ELEMENT_NODE){
_3e5.setAttribute(BindingSerializer.KEYPOINTER,_3e0);
}
});
if(_3e1){
BindingSerializer.activeInstance.append(_3e0,_3e2);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e6){
BindingSerializer.activeInstance=this;
_3e6.bindingWindow.ElementIterator.iterate(_3e6.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e7){
var _3e8=false;
var _3e9=_3e7.serialize();
if(_3e9!=false){
_3e8=true;
var _3ea="ui:"+DOMUtil.getLocalName(_3e7.bindingElement);
var _3eb=DOMUtil.createElementNS(Constants.NS_UI,_3ea,this._dom);
this._pointers[_3e7.key]=_3eb;
for(var prop in _3e9){
if(_3e9[prop]!=null){
_3eb.setAttribute(prop,String(_3e9[prop]));
}
}
}
return _3e8;
};
BindingSerializer.prototype.append=function(_3ed,_3ee){
var _3ef=this._pointers[_3ed];
var _3f0=_3ee?this._pointers[_3ee]:this._dom;
_3f0.appendChild(_3ef);
};
function ImageProfile(_3f1){
this._default=_3f1.image;
this._hover=_3f1.imageHover;
this._active=_3f1.imageActive;
this._disabled=_3f1.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f2){
this._default=_3f2;
};
ImageProfile.prototype.getHoverImage=function(){
return this._default;
};
ImageProfile.prototype.setHoverImage=function(_3f3){
this._hover=_3f3;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f4){
this._active=_3f4;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._default;
};
ImageProfile.prototype.setDisabledImage=function(_3f5){
this._disabled=_3f5;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f6,_3f7,_3f8){
var _3f9=null;
if(_3f6.isAttached){
_3f9=new List();
var _3fa=_3f8?_3f6.getChildElementsByLocalName(_3f7):_3f6.getDescendantElementsByLocalName(_3f7);
_3fa.each(function(_3fb){
var _3fc=UserInterface.getBinding(_3fb);
if(_3fc){
_3f9.add(_3fc);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f6.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f9;
},getAncestorBindingByType:function(_3fe,impl,_400){
var _401=null;
if(Binding.exists(_3fe)){
var node=_3fe.bindingElement;
while(_401==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _403=UserInterface.getBinding(node);
if(_403 instanceof impl){
_401=_403;
}
}else{
if(_400&&node.nodeType==Node.DOCUMENT_NODE){
var win=DOMUtil.getParentWindow(node);
if(win!=null){
node=win.frameElement;
}else{
SystemDebug.stack(arguments);
break;
}
}
}
}
}
}
return _401;
},getAncestorBindingByLocalName:function(_405,_406,_407){
var _408=null;
if(_406=="*"){
var node=_405.bindingElement;
while(!_408&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_408=UserInterface.getBinding(node);
}
}
}else{
_408=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_406,_405.bindingElement,_407));
}
return _408;
},getChildElementsByLocalName:function(_40a,_40b){
var _40c=new List();
var _40d=new List(_40a.bindingElement.childNodes);
_40d.each(function(_40e){
if(_40e.nodeType==Node.ELEMENT_NODE){
if(_40b=="*"||DOMUtil.getLocalName(_40e)==_40b){
_40c.add(_40e);
}
}
});
return _40c;
},getChildBindingByType:function(_40f,impl){
var _411=null;
_40f.getChildElementsByLocalName("*").each(function(_412){
var _413=UserInterface.getBinding(_412);
if(_413!=null&&_413 instanceof impl){
_411=_413;
return false;
}else{
return true;
}
});
return _411;
},getDescendantBindingByType:function(_414,impl){
var _416=null;
_414.getDescendantElementsByLocalName("*").each(function(_417){
var _418=UserInterface.getBinding(_417);
if(_418!=null&&_418 instanceof impl){
_416=_418;
return false;
}else{
return true;
}
});
return _416;
},getDescendantBindingsByType:function(_419,impl){
var _41b=new List();
_419.getDescendantElementsByLocalName("*").each(function(_41c){
var _41d=UserInterface.getBinding(_41c);
if(_41d!=null&&_41d instanceof impl){
_41b.add(_41d);
}
return true;
});
return _41b;
},getNextBindingByLocalName:function(_41e,name){
var _420=null;
var _421=_41e.bindingElement;
while((_421=DOMUtil.getNextElementSibling(_421))!=null&&DOMUtil.getLocalName(_421)!=name){
}
if(_421!=null){
_420=UserInterface.getBinding(_421);
}
return _420;
},getPreviousBindingByLocalName:function(_422,name){
var _424=null;
var _425=_422.bindingElement;
while((_425=DOMUtil.getPreviousElementSibling(_425))!=null&&DOMUtil.getLocalName(_425)!=name){
}
if(_425!=null){
_424=UserInterface.getBinding(_425);
}
return _424;
}};
var BindingFinder=new _BindingFinder();
NodeCrawler.NORMAL=1;
NodeCrawler.SKIP_NODE=2;
NodeCrawler.SKIP_CHILDREN=4;
NodeCrawler.STOP_CRAWLING=8;
NodeCrawler.TYPE_DESCENDING="descending";
NodeCrawler.TYPE_ASCENDING="ascending";
function NodeCrawler(){
this._construct();
return this;
}
NodeCrawler.prototype={logger:SystemLogger.getLogger("NodeCrawler"),type:NodeCrawler.TYPE_DESCENDING,currentNode:null,previousNode:null,contextDocument:null,_filters:null,_construct:function(){
this.currentNode=null,this.previousNode=null;
this.nextNode=null;
this._filters=new List();
this.type=NodeCrawler.TYPE_DESCENDING;
},addFilter:function(_426){
this._filters.add(_426);
},removeFilter:function(_427){
var _428=-1;
this._filters.each(function(fil){
_428++;
var _42a=true;
if(fil==_427){
_42a=false;
}
return _42a;
});
if(_428>-1){
this._filters.del(_428);
}
},_applyFilters:function(node,arg){
var _42d=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _430=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _431=true;
while(this._filters.hasNext()&&_431==true){
var _432=this._filters.getNext();
var res=_432.call(this,node,arg);
if(res!=null){
_42d=res;
switch(res){
case stop:
case skip:
case skip+_430:
_431=false;
break;
}
}
}
return _42d;
},crawl:function(_434,arg){
this.contextDocument=_434.ownerDocument;
this.onCrawlStart();
var _436=this.type==NodeCrawler.TYPE_ASCENDING;
var _437=this._applyFilters(_434,arg);
if(_437!=NodeCrawler.STOP_CRAWLING){
if(_436&&_437==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_436?_434.parentNode:_434;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_439,arg){
var _43b=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_43b=this._crawlDescending(_439,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_43b=this._crawlAscending(_439,arg);
break;
}
return _43b;
},_crawlDescending:function(_43c,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43f=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _441=null;
if(_43c.hasChildNodes()){
var node=_43c.firstChild;
while(node!=null&&_441!=stop){
this.currentNode=node;
_441=this._applyFilters(node,arg);
switch(_441){
case stop:
case _43f:
case skip+_43f:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_441=stop;
break;
}
}
}
if(_441!=stop&&_441!=skip){
this.previousNode=node;
}
break;
}
if(_441!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _441;
},_crawlAscending:function(_444,arg){
var _446=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_444!=null){
this.currentNode=_444;
_446=this._applyFilters(_444,arg);
if(_446!=stop){
var next=this.nextNode?this.nextNode:_444.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_444;
_446=this._crawl(next,arg);
}
}
}else{
_446=stop;
}
return _446;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _44a in this){
this[_44a]=null;
}
};
ElementCrawler.prototype=new NodeCrawler;
ElementCrawler.prototype.constructor=ElementCrawler;
ElementCrawler.superclass=NodeCrawler.prototype;
function ElementCrawler(){
this._construct();
return this;
}
ElementCrawler.prototype._construct=function(){
ElementCrawler.superclass._construct.call(this);
this.addFilter(function(node,arg){
var _44d=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44d=NodeCrawler.SKIP_NODE;
}
return _44d;
});
};
BindingCrawler.prototype=new ElementCrawler;
BindingCrawler.prototype.constructor=BindingCrawler;
BindingCrawler.superclass=ElementCrawler.prototype;
function BindingCrawler(){
this._construct();
return this;
}
BindingCrawler.prototype._construct=function(){
BindingCrawler.superclass._construct.call(this);
this.addFilter(function(_44e,arg){
var _450=null;
if(!UserInterface.hasBinding(_44e)){
_450=NodeCrawler.SKIP_NODE;
}
return _450;
});
};
Crawler.prototype=new BindingCrawler;
Crawler.prototype.constructor=Crawler;
Crawler.superclass=BindingCrawler.prototype;
function Crawler(){
this.id=null;
this.response=null;
this._construct();
return this;
}
Crawler.prototype._construct=function(){
Crawler.superclass._construct.call(this);
this.response=null;
var self=this;
this.addFilter(function(_452,arg){
var _454=null;
var _455=UserInterface.getBinding(_452);
if(Interfaces.isImplemented(ICrawlerHandler,_455)==true){
self.response=null;
_455.handleCrawler(self);
_454=self.response;
}
return _454;
});
};
FlexBoxCrawler.prototype=new Crawler;
FlexBoxCrawler.prototype.constructor=FlexBoxCrawler;
FlexBoxCrawler.superclass=Crawler.prototype;
FlexBoxCrawler.ID="flexboxcrawler";
FlexBoxCrawler.MODE_FORCE="force";
FlexBoxCrawler.MODE_NORMAL="normal";
function FlexBoxCrawler(){
this.id=FlexBoxCrawler.ID;
this.mode=FlexBoxCrawler.MODE_NORMAL;
this.startBinding=null;
this._construct();
return this;
}
FlexBoxCrawler.prototype._construct=function(){
FlexBoxCrawler.superclass._construct.call(this);
var self=this;
this.addFilter(function(_457,list){
var _459=null;
var _45a=UserInterface.getBinding(_457);
if(Interfaces.isImplemented(IFlexible,_45a)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_45a);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_45a.isFlexSuspended==true){
_459=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_45a);
}
break;
}
}
return _459;
});
};
FocusCrawler.prototype=new Crawler;
FocusCrawler.prototype.constructor=FocusCrawler;
FocusCrawler.superclass=Crawler.prototype;
FocusCrawler.ID="focuscrawler";
FocusCrawler.MODE_INDEX="index";
FocusCrawler.MODE_FOCUS="focus";
FocusCrawler.MODE_BLUR="blur";
function FocusCrawler(){
this.id=FocusCrawler.ID;
this._construct();
return this;
}
FocusCrawler.prototype._construct=function(){
FocusCrawler.superclass._construct.call(this);
this.addFilter(function(_45b,list){
var _45d=null;
var _45e=UserInterface.getBinding(_45b);
if(_45e.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_45e)==true){
if(_45e.isFocusable&&_45e.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_45e);
break;
case FocusCrawler.MODE_FOCUS:
if(!_45e.isFocused){
_45e.focus();
}
_45d=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_45e.isFocused==true){
_45e.blur();
_45d=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45d;
});
};
FitnessCrawler.prototype=new Crawler;
FitnessCrawler.prototype.constructor=FitnessCrawler;
FitnessCrawler.superclass=Crawler.prototype;
FitnessCrawler.ID="fitnesscrawler";
FitnessCrawler.MODE_BRUTAL="brutal fitness";
FitnessCrawler.MODE_TRAINING="train fitness";
function FitnessCrawler(){
this.id=FitnessCrawler.ID;
this.mode=FitnessCrawler.MODE_TRAINING;
this._construct();
return this;
}
FitnessCrawler.prototype._construct=function(){
FitnessCrawler.superclass._construct.call(this);
this.addFilter(function(_45f,list){
var _461=null;
var _462=UserInterface.getBinding(_45f);
if(!_462.isVisible){
_461=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _461;
});
this.addFilter(function(_463,list){
var _465=null;
var _466=UserInterface.getBinding(_463);
if(_466.isAttached){
if(Interfaces.isImplemented(IFit,_466)){
if(!_466.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_466);
}
}
}
return null;
});
};
function _DocumentUpdatePlugin(){
if(window.UpdateManager!=null){
UpdateManager.plugins.push(this);
this._setup();
}
}
_DocumentUpdatePlugin.prototype={toString:function(){
return "[DocumentUpdatePlugin]";
},_logger:SystemLogger.getLogger("DocumentUpdatePlugin ["+document.title+"]"),_isUpdating:false,_attributesbuffer:null,_elementsbuffer:null,isDebugging:Application.isDeveloperMode,_oldDOM:null,_focusID:null,_setup:function(){
UpdateManager.isDebugging=Application.isDeveloperMode;
UpdateManager.hasSoftAttributes=true;
UpdateManager.hasSoftSiblings=true;
DOMEvents.addEventListener(document,DOMEvents.BEFOREUPDATE,this);
DOMEvents.addEventListener(document,DOMEvents.AFTERUPDATE,this);
DOMEvents.addEventListener(document,DOMEvents.ERRORUPDATE,this);
DOMEvents.addEventListener(window,DOMEvents.UNLOAD,this);
if(Client.isFirefox){
UpdateAssistant.serialize=function(_467){
_467=_467.cloneNode(true);
_467.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_467.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_467);
};
}
},handleEvent:function(e){
var _469=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_469);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_469);
break;
case DOMEvents.ERRORUPDATE:
this._errorUpdate();
break;
case DOMEvents.UNLOAD:
if(Application.hasLock(this)){
Application.unlock(this);
}
break;
}
},_beforeUpdate:function(_46a){
var _46b=(_46a==document.documentElement);
if(_46b){
this._elementsbuffer=new List();
this._isUpdating=true;
Application.lock(this);
var root=UserInterface.getBinding(document.body);
if(root!=null){
var page=root.getDescendantBindingByType(PageBinding);
if(page!=null){
page.onBeforeUpdates();
}
}
var _46e=FocusBinding.focusedBinding;
if(_46e!=null){
this._focusID=_46e.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_46a.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_46a);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46a,false);
break;
}
}
},_afterUpdate:function(_46f){
var _470=(_46f==document.documentElement);
if(_470){
var _471=this._elementsbuffer;
if(_471.hasEntries()){
_471.each(function(_472){
DocumentManager.attachBindings(_472);
});
}
this._isUpdating=false;
Application.unlock(this);
var root=UserInterface.getBinding(document.body);
if(root!=null){
var page=root.getDescendantBindingByType(PageBinding);
if(page!=null){
page.onAfterUpdates();
}
}
var _475=FocusBinding.focusedBinding;
if(_475==null){
var _476=document.getElementById(this._focusID);
if(_476!=null){
var _475=UserInterface.getBinding(_476);
if(_475!=null){
_475.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _477=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _478="NEW DOM: "+document.title+"\n\n"+_477+"\n\n";
_478+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_478);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46f.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_46f);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46f,true);
break;
}
switch(_46f.id){
case "__VIEWSTATE":
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__EVENTVALIDATION":
case "__LASTFOCUS":
case "__REQUEST":
case "__RESPONSE":
case "__CONSOLEID":
break;
default:
var _475=UserInterface.getBinding(_46f);
while(_475==null&&_46f!=null){
_475=UserInterface.getBinding(_46f);
_46f=_46f.parentNode;
}
if(_475!=null){
_475.dispatchAction(Binding.ACTION_UPDATED);
}
break;
}
}
},_errorUpdate:function(){
Application.unlock(this);
var cry="UpdateManager dysfunction:\n\n"+UpdateManager.errorsmessage;
this._logger.error(cry+"\n\n"+UpdateManager.pendingResponse);
if(Application.isDeveloperMode){
alert(cry);
}
},_backupattributes:function(_47a,_47b){
var _47c=UserInterface.getBinding(_47a);
if(_47c!=null){
if(_47b){
var _47d=this._attributesbuffer;
var map=new Map();
_47d.each(function(name,old){
var now=_47a.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_47a.attributes).each(function(att){
if(att.specified){
if(!_47d.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_484){
var _485=_47c.propertyMethodMap[name];
if(_485!=null){
_485.call(_47c,_484);
}
});
}else{
var map=new Map();
new List(_47a.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_487,_488){
var _489=window.bindingMap[_487.getAttribute("id")];
if(_489!=null){
return _489.handleElement(_487,_488);
}
},updateElement:function(_48a,_48b){
var _48c=window.bindingMap[_48a.getAttribute("id")];
if(_48c!=null){
return _48c.updateElement(_48a,_48b);
}
}};
var DocumentUpdatePlugin=new _DocumentUpdatePlugin();
DocumentCrawler.prototype=new ElementCrawler;
DocumentCrawler.prototype.constructor=DocumentCrawler;
DocumentCrawler.superclass=ElementCrawler.prototype;
DocumentCrawler.ID="documentcrawler";
DocumentCrawler.MODE_REGISTER="register";
DocumentCrawler.MODE_ATTACH="attach";
DocumentCrawler.MODE_DETACH="detach";
function DocumentCrawler(){
this.mode=DocumentCrawler.MODE_REGISTER;
this.id=DocumentCrawler.ID;
this._construct();
return this;
}
DocumentCrawler.prototype._construct=function(){
DocumentCrawler.superclass._construct.call(this);
var self=this;
this.addFilter(function(_48e,list){
var _490=UserInterface.getBinding(_48e);
var _491=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_490==null){
UserInterface.registerBinding(_48e);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_490!=null){
if(!_490.isAttached){
list.add(_490);
}
if(_490.isLazy==true){
_491=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_490!=null){
list.add(_490);
}
break;
}
return _491;
});
};
function _DocumentManager(){
this._construct();
}
_DocumentManager.prototype={_logger:SystemLogger.getLogger("DocumentManager ["+document.title+"]"),_maxIndex:-1,customUserInterfaceMapping:null,isDocumentSelectable:false,hasNativeContextMenu:false,_construct:function(){
Application.framework(document);
EventBroadcaster.subscribe(WindowManager.WINDOW_LOADED_BROADCAST,this);
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.CLICK,this);
}
},handleBroadcast:function(_492,arg){
if(!this.isDocumentSelectable){
this._makeDocumentUnselectable();
}
if(!this.hasNativeContextMenu){
DOMEvents.addEventListener(document,DOMEvents.CONTEXTMENU,this);
}
if(!Application.isMalFunctional){
this._resolveCustomBindingMappings();
this.attachBindings(document.documentElement);
}
},handleEvent:function(e){
var _495=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_495)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_495!=null){
if(_495.href!=null&&_495.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _496=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_496!=null){
var map={};
var _498=DOMUtil.getElementsByTagName(_496,"bindingmapping");
new List(_498).each(function(_499){
var _49a=_499.getAttribute("element");
var _49b=_499.getAttribute("binding");
map[_49a]=eval(_49b);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_49c){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_49c;
}else{
this.customUserInterfaceMapping.merge(_49c);
}
},_registerBindings:function(_49d){
var _49e=new DocumentCrawler();
_49e.mode=DocumentCrawler.MODE_REGISTER;
_49e.crawl(_49d);
_49e.dispose();
},_attachBindings:function(_49f){
var _4a0=new DocumentCrawler();
_4a0.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a0.crawl(_49f,list);
var _4a2=false;
while(list.hasNext()){
var _4a3=list.getNext();
if(!_4a3.isAttached){
_4a3.onBindingAttach();
if(!_4a3.memberDependencies){
_4a3.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a3)){
_4a2=true;
}
}
}
if(_4a2){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a0.dispose();
list.dispose();
},attachBindings:function(_4a5){
this._registerBindings(_4a5);
this._attachBindings(_4a5);
},detachBindings:function(_4a6,_4a7){
var _4a8=new DocumentCrawler();
_4a8.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a8.crawl(_4a6,list);
if(_4a7==true){
list.extractFirst();
}
var _4aa=false;
list.reverse().each(function(_4ab){
if(Interfaces.isImplemented(IData,_4ab)){
_4aa=true;
}
_4ab.dispose(true);
});
if(_4aa){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a8.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4ad){
return (/textarea|input/.test(DOMUtil.getLocalName(_4ad)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4ae){
this.isDirty=true;
var _4af=false;
if(_4ae!=null&&!_4ae.isDirty){
_4ae.isDirty=true;
_4ae.dispatchAction(Binding.ACTION_DIRTY);
_4af=true;
}
return _4af;
},clean:function(_4b0){
if(_4b0.isDirty){
_4b0.isDirty=false;
}
},registerDataBinding:function(name,_4b2){
if(Interfaces.isImplemented(IData,_4b2,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b2;
}
}else{
throw "Invalid DataBinding: "+_4b2;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b5=null;
if(this._dataBindings[name]!=null){
_4b5=this._dataBindings[name];
}
return _4b5;
},getAllDataBindings:function(_4b6){
var list=new List();
for(var name in this._dataBindings){
var _4b9=this._dataBindings[name];
list.add(_4b9);
if(_4b6&&_4b9 instanceof WindowBinding){
var _4ba=_4b9.getContentWindow().DataManager;
if(_4ba!=null){
list.merge(_4ba.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4bb=false;
for(var name in this._dataBindings){
_4bb=true;
break;
}
return _4bb;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4bf){
var _4c0=this._dataBindings[name];
if(_4c0!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c0.setResult(_4bf);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c0);
}
throw exception;
}
break;
case DataBindingMap.TYPE_VALUE:
throw "Not implemented!";
}
}
});
}
},getDataBindingValueMap:function(){
var _4c1=new DataBindingMap();
_4c1.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c3=this._dataBindings[name];
if(_4c3 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c1[name]=_4c3.getValue();
}
return _4c1;
},getDataBindingResultMap:function(){
var _4c4=new DataBindingMap();
_4c4.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c6=this._dataBindings[name];
var res=_4c6.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c9){
_4c4.set(name,_4c9);
});
}else{
_4c4.set(name,res);
}
}
return _4c4;
},getPostBackString:function(){
var _4ca="";
var form=document.forms[0];
if(form!=null){
var _4cc="";
new List(form.elements).each(function(_4cd){
var name=_4cd.name;
var _4cf=encodeURIComponent(_4cd.value);
switch(_4cd.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4ca+=name+"="+_4cf+"&";
break;
case "submit":
if(document.activeElement==_4cd){
_4ca+=name+"="+_4cf+"&";
}
break;
case "radio":
if(_4cd.checked){
_4ca+=name+"="+_4cf+"&";
}
break;
case "checkbox":
if(_4cd.checked){
if(_4cd.name==_4cc){
if(_4ca.lastIndexOf("&")==_4ca.length-1){
_4ca=_4ca.substr(0,_4ca.length-1);
}
_4ca+=","+_4cf;
}else{
_4ca+=name+"="+_4cd.value;
}
_4cc=name;
_4ca+="&";
}
break;
}
});
}
return _4ca.substr(0,_4ca.length-1);
}};
var DataManager=new _DataManager();
function _Templates(){
}
_Templates.prototype={_logger:SystemLogger.getLogger("Templates"),_cache:{},_mode:null,_modes:{MODE_PLAINTEXT:0,MODE_DOCUMENT:1,MODE_ELEMENT:2,MODE_DOCUMENTTEXT:3,MODE_ELEMENTTEXT:4},getTemplateDocument:function(name){
this._mode=this._modes.MODE_DOCUMENT;
return this._getIt(name);
},getTemplateElement:function(name){
this._mode=this._modes.MODE_ELEMENT;
return this._getIt(name);
},getTemplateDocumentText:function(name){
this._mode=this._modes.MODE_DOCUMENTTEXT;
return this._getIt(name);
},getTemplateElementText:function(name){
this._mode=this._modes.MODE_ELEMENTTEXT;
return this._getIt(name);
},getTemplateBodyText:function(name){
var tmp=this.getTemplateDocumentText(name);
tmp=tmp.split("<body>")[1].split("</body>")[0];
return tmp;
},getPlainText:function(name){
this._mode=this._modes.MODE_PLAINTEXT;
return this._getIt(name);
},_getIt:function(name){
var _4d8=null;
var _4d9=null;
var _4da=false;
if(!this._cache[name]){
_4da=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4dc=DOMUtil.getXMLHTTPRequest();
_4dc.open("get",uri,false);
_4dc.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4dc.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d9=_4dc.responseText;
break;
default:
_4d9=_4dc.responseXML;
break;
}
if(_4d9==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d9;
}
}
_4d9=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d8=_4d9;
break;
case this._modes.MODE_DOCUMENT:
_4d8=DOMUtil.cloneNode(_4d9,true);
break;
case this._modes.MODE_ELEMENT:
_4d8=DOMUtil.cloneNode(_4d9.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d8=DOMSerializer.serialize(_4d9,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d8=DOMSerializer.serialize(_4d9.documentElement,true);
break;
}
if(_4da&&Application.isDeveloperMode){
}
return _4d8;
}};
var Templates=new _Templates();
function DialogButton(obj){
this.label=null;
this.image=null;
this.response=null;
this.isFocusable=true;
this.isDefault=false;
this.isFocused=false;
if(obj){
for(var prop in obj){
if(typeof this[prop]!="undefined"){
this[prop]=obj[prop];
}
}
}
}
function _Dialog(){
}
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4df){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4df];
},invoke:function(url,_4e1,_4e2){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e4,_4e5){
var _4e6=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e4,argument:_4e5});
StageBinding.presentViewDefinition(_4e6);
return _4e6;
},invokeDefinition:function(_4e7){
if(_4e7 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e7);
}
return _4e7;
},question:function(_4e8,text,_4ea,_4eb){
if(!_4ea){
_4ea=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e8,text,_4ea,_4eb);
},message:function(_4ec,text,_4ee,_4ef){
if(!_4ee){
_4ee=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4ec,text,_4ee,_4ef);
},error:function(_4f0,text,_4f2,_4f3){
if(!_4f2){
_4f2=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f0,text,_4f2,_4f3);
},warning:function(_4f4,text,_4f6,_4f7){
if(!_4f6){
_4f6=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f4,text,_4f6,_4f7);
},_standardDialog:function(type,_4f9,text,_4fb,_4fc){
var _4fd=null;
if(!_4fb){
_4fd=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4fd=new List();
new List(_4fb).each(function(_4fe){
var _4ff=null;
switch(typeof _4fe){
case "object":
_4ff=_4fe;
break;
case "string":
var _500=false;
if(_4fe.indexOf(":")>-1){
_4fe=_4fe.split(":")[0];
_500=true;
}
_4ff=Dialog.dialogButton(_4fe);
if(_500){
_4ff.isDefault=true;
}
break;
}
_4fd.add(_4ff);
});
}
var _501={title:_4f9,text:text,type:type,image:this._dialogImages[type],buttons:_4fd};
var _502=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4fc,argument:_501});
StageBinding.presentViewDefinition(_502);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_504,arg){
self.saveAll(arg);
}});
},about:function(){
this._dialog(this._URL_ABOUTDIALOG);
},preferences:function(){
this._dialog(this._URL_PREFERENCES);
},_dialog:function(url){
if(Client.hasTransitions){
setTimeout(function(){
Dialog.invokeModal(url);
},Animation.DEFAULT_TIME);
}else{
Dialog.invokeModal(url);
}
},close:function(){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_CURRENT);
},closeAll:function(){
this.saveAll(true);
},save:function(){
EventBroadcaster.broadcast(BroadcastMessages.SAVE_CURRENT);
},saveAll:function(_507){
var self=this;
var _509=Application.getDirtyDockTabsTabs();
if(_509.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_50a,_50b){
switch(_50a){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_50b,_507);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_509);
}else{
if(_507){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_50c,_50d){
var _50e=false;
var list=new List();
_50c.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_50e=true;
var _512=list.getLength();
var _513={handleBroadcast:function(_514,tab){
if(--_512==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50d){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_513);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _50e;
},systemLog:function(){
if(Application.isOperational){
StageBinding.handleViewPresentation("Composite.Management.SystemLog");
}else{
var win=window.open(Constants.APPROOT+"/content/views/dev/systemlog/systemlogoutput.html");
win.onload=function(){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMLOG_OPENED,this);
};
}
},help:function(){
var _518="Composite.Management.Help";
if(!StageBinding.isViewOpen(_518)){
StageBinding.handleViewPresentation(_518);
}
}};
var Commands=new _Commands();
function _Prism(){
}
_Prism.prototype={_logger:SystemLogger.getLogger("Prism"),clearCache:function(){
this._logger.fine("Clearing the cache");
this._dispatchToPrism("contenttochrome-clearcache");
},disableCache:function(){
this._logger.fine("Disabling cache");
this._dispatchToPrism("contenttochrome-cache-disable");
},enableCache:function(){
this._logger.fine("Enabling cache");
this._dispatchToPrism("contenttochrome-cache-enable");
},_dispatchToPrism:function(type){
if(Client.isPrism){
var _51a=document.createEvent("Events");
_51a.initEvent(type,true,true);
window.dispatchEvent(_51a);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _51c=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51d=_51c.exec(url?url:"");
if(_51d){
if(_51d[3]=="media"){
this.isMedia=true;
}else{
if(_51d[3]=="page"){
this.isPage=true;
}
}
}
var _51e={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_51e[$1]=$3;
});
this.queryString=_51e;
this.path=url.replace(/\?.*/g,"");
return this;
}
Uri.isMedia=function(url){
return new Uri(url).isMedia;
};
Uri.prototype.getPath=function(){
return this.path;
};
Uri.prototype.getQueryString=function(){
return new Map(this.queryString);
};
Uri.prototype.hasParam=function(key){
return this.queryString[key]!=null;
};
Uri.prototype.getParam=function(key){
return this.queryString[key];
};
Uri.prototype.setParam=function(key,_527){
if(_527==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_527;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _529=[];
for(var key in this.queryString){
_529.push(key+"="+this.queryString[key]);
}
if(_529.length>0){
url+="?"+_529.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_52b,_52c){
var _52d=null;
var _52e=ViewDefinitions[_52b];
if(_52e.isMutable){
var impl=null;
if(_52e instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_52c!=null&&impl!=null){
var def=new impl();
for(var prop in _52e){
def[prop]=ViewDefinition.cloneProperty(_52e[prop]);
}
def.handle=_52c;
_52d=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _52d;
};
ViewDefinition.cloneProperty=function(_532){
if(null==_532){
return _532;
}
if(typeof _532==="object"){
var _533=(_532.constructor===Array)?[]:{};
for(var prop in _532){
_533[prop]=ViewDefinition.cloneProperty(_532[prop]);
}
return _533;
}
return _532;
};
function ViewDefinition(){
}
ViewDefinition.prototype={url:ViewDefinition.DEFAULT_URL,argument:null,handle:null,entityToken:null,flowHandle:null,label:null,image:null,toolTip:null};
SystemViewDefinition.prototype=new ViewDefinition;
SystemViewDefinition.prototype.constructor=SystemViewDefinition;
SystemViewDefinition.superclass=ViewDefinition.prototype;
SystemViewDefinition.DEFAULT_URL="${root}/content/views/systemview/systemview.aspx";
function SystemViewDefinition(node){
this.node=node;
this.argument=node;
this.url=SystemViewDefinition.DEFAULT_URL;
this.handle=node.getHandle();
this.label=node.getLabel();
this.image=node.getImageProfile().getDefaultImage();
this.toolTip=node.getToolTip();
}
HostedViewDefinition.prototype=new ViewDefinition;
HostedViewDefinition.prototype.constructor=HostedViewDefinition;
HostedViewDefinition.superclass=ViewDefinition.prototype;
HostedViewDefinition.POSTBACK_URL="${root}/postback.aspx";
function HostedViewDefinition(arg){
this.position=DockBinding.MAIN;
this.perspective=null;
this.entityToken=null;
this.label=null;
this.image=null;
if(arg){
for(var prop in arg){
if(this[prop]||this.prop==null){
this[prop]=arg[prop];
if(this.url){
this.url=Resolver.resolve(this.url);
}
}else{
throw "Property not recognized: "+prop;
}
}
}
}
DialogViewDefinition.prototype=new ViewDefinition;
DialogViewDefinition.prototype.constructor=HostedViewDefinition;
DialogViewDefinition.superclass=ViewDefinition.prototype;
function DialogViewDefinition(arg){
this.handler=null;
this.position=Dialog.MODAL;
this.label=null;
this.image=null;
this.width=null;
this.height=null;
if(arg){
for(var prop in arg){
if(this[prop]||this.prop==null){
this[prop]=arg[prop];
if(this.url){
this.url=Resolver.resolve(this.url);
}
if(this.handler){
if(!Interfaces.isImplemented(IDialogResponseHandler,this.handler)){
throw "IDialogResponseHandler not implemented";
}
}
}else{
throw "Property not recognized: "+prop;
}
}
}
}
Binding.prototype.constructor=Binding;
Binding.CALLBACKID="callbackid";
Binding.CALLBACKARG="callbackarg";
Binding.CLASSNAME_CLEARFLOAT="clearfix";
Binding.CLASSNAME_FOCUSED="focused";
Binding.SNOOZE=Client.isMozilla==true?125:250;
Binding.ACTION_DRAG="bindingdrag";
Binding.ACTION_DROP="bindingdrop";
Binding.ACTION_DIRTY="bindingdirty";
Binding.ACTION_VALID="bindingvalid";
Binding.ACTION_UPDATED="bindingupdated";
Binding.ACTION_INVALID="bindinginvalid";
Binding.ACTION_RESIZED="bindingresized";
Binding.ACTION_FOCUSED="bindingfocused";
Binding.ACTION_BLURRED="bindingblurred";
Binding.ACTION_ATTACHED="bindingattached";
Binding.ACTION_DETACHED="bindingdetached";
Binding.ACTION_DISPOSED="bindingdisposed";
Binding.ACTION_MOVETOTOP="bindingmovetotop";
Binding.ACTION_ACTIVATED="bindingactivated";
Binding.ACTION_REGISTERED="bindingregistered";
Binding.ACTION_MOVEDONTOP="bindingmovedontop";
Binding.ACTION_INITIALIZED="bindinginitialized";
Binding.ACTION_FORCE_REFLEX="bindingforcereflex";
Binding.ACTION_DIMENSIONCHANGED="bindingdimensionchanged";
Binding.ACTION_VISIBILITYCHANGED="bindingvisibilitychanged";
Binding.ABSTRACT_METHOD=function(){
SystemDebug.stack(arguments);
throw (this.toString()+" abstract method not implemented");
};
Binding.evaluate=function(_53a,_53b){
var _53c=null;
var _53d=_53b.bindingWindow.WindowManager;
if(_53d!=null){
var _53e=Binding.parseScriptStatement(_53a,_53b.key);
_53c=_53d.evaluate(_53e);
}
return _53c;
};
Binding.parseScriptStatement=function(_53f,key){
if(_53f!=null&&key!=null){
var _541="UserInterface.getBindingByKey ( \""+key+"\" )";
_53f=_53f.replace(/(\W|^)this(,| +|\)|;)/g,_541);
_53f=_53f.replace(/(\W|^)this(\.)/g,_541+".");
}
return _53f;
};
Binding.exists=function(_542){
var _543=false;
try{
if(_542&&_542.bindingElement&&_542.bindingElement.nodeType&&_542.isDisposed==false){
_543=true;
}
}
catch(accessDeniedException){
_543=false;
}
finally{
return _543;
}
};
Binding.destroy=function(_544){
if(!_544.isDisposed){
if(_544.acceptor!=null){
_544.acceptor.dispose();
}
if(_544.dragger!=null){
_544.disableDragging();
}
if(_544.boxObject!=null){
_544.boxObject.dispose();
}
if(_544._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_544);
}
for(var _545 in _544.shadowTree){
var _546=_544.shadowTree[_545];
if(_546 instanceof Binding&&Binding.exists(_546)){
_546.dispose(true);
}
_544.shadowTree[_545]=null;
}
_544.isDisposed=true;
_544=null;
}
};
Binding.dotnetify=function(_547,_548){
var _549=_547.getCallBackID();
if(_549!=null){
var _54a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_547.bindingDocument);
_54a.type="hidden";
_54a.id=_549;
_54a.name=_549;
_54a.value=_548!=null?_548:"";
_547.bindingElement.appendChild(_54a);
_547.shadowTree.dotnetinput=_54a;
}else{
throw _547.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_54b){
var _54c=_54b.getProperty("image");
var _54d=_54b.getProperty("image-hover");
var _54e=_54b.getProperty("image-active");
var _54f=_54b.getProperty("image-disabled");
if(_54b.imageProfile==null){
if(_54b.image==null&&_54c!=null){
_54b.image=_54c;
}
if(_54b.imageHover==null&&_54d!=null){
_54b.imageHover=_54d;
}
if(_54b.imageActive==null&&_54e!=null){
_54b.imageActive=_54e;
}
if(_54b.imageDisabled==null&&_54f!=null){
_54b.imageDisabled=_54f;
}
if(_54b.image||_54b.imageHover||_54b.imageActive||_54b.imageDisabled){
_54b.imageProfile=new ImageProfile(_54b);
}
}
};
function Binding(){
this.logger=SystemLogger.getLogger("binding");
this.key=null;
this.bindingElement=null;
this.bindingDocument=null;
this.bindingWindow=null;
this.shadowTree=null;
this.actionListeners=null;
this.contextMenuBinding=null;
this.isRegistered=false;
this.isAttached=false;
this.isInitialized=false;
this.isDisposed=false;
this.isDraggable=false;
this.dragger=null;
this.memberDependencies=null;
this.dependentBindings=null;
this.propertyMethodMap=null;
this.isBlockingActions=false;
this.isVisible=true;
this.boxObject=null;
this.dragType=null;
this.dragAccept=null;
this.dragReject=false;
this.acceptor=null;
this.isLazy=false;
this._persist=null;
this.isBindingBuild=false;
this._hasActivationAwareness=false;
this.isFlexSuspended=false;
this.crawlerFilters=null;
this._subscriptions=null;
}
Binding.prototype.toString=function(){
return "[Binding]";
};
Binding.prototype.onBindingRegister=function(){
if(!this.isRegistered){
this.bindingElement=UserInterface.getElement(this);
this.bindingDocument=this.bindingElement.ownerDocument;
this.bindingWindow=DOMUtil.getParentWindow(this.bindingDocument);
this.shadowTree={};
this.actionListeners={};
this.propertyMethodMap={};
this.isRegistered=true;
this._subscriptions=new Map();
this._updateBindingMap(true);
if(this.getProperty("lazy")){
this.isLazy=true;
}
}
};
Binding.prototype.onBindingAttach=function(){
if(!this.isAttached){
if(!this.bindingElement.parentNode){
alert(this+" onBindingAttach: Binding must be positioned in document structure before attachment can be invoked.");
}else{
this.boxObject=new BindingBoxObject(this);
this._initializeBindingPersistanceFeatures();
this._initializeBindingGeneralFeatures();
this._initializeBindingDragAndDropFeatures();
this._updateBindingMap(true);
this.isAttached=true;
}
}
};
Binding.prototype.onBindingInitialize=function(){
if(this.dependentBindings!=null){
for(var key in this.dependentBindings){
var _551=this.dependentBindings[key];
_551.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_552){
if(_552){
this.memberDependencies[_552.key]=true;
var _553=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_553=false;
break;
}
}
if(_553){
this.onBindingInitialize();
}
}else{
throw new Error(this+" onMemberInitialize: Expected argument.");
}
};
Binding.prototype.attach=function(){
if(!this.isAttached){
this.onBindingAttach();
if(this.memberDependencies==null){
this.onBindingInitialize();
}
}
return this;
};
Binding.prototype.attachRecursive=function(){
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
};
Binding.prototype.detachRecursive=function(_555){
if(_555==null){
_555=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_555);
};
Binding.prototype.addMember=function(_556){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_556.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_556.key]=false;
_556.registerDependentBinding(this);
}
}
return _556;
};
Binding.prototype.addMembers=function(_557){
while(_557.hasNext()){
var _558=_557.getNext();
if(!_558.isInitialized){
this.addMember(_558);
}
}
return _557;
};
Binding.prototype.registerDependentBinding=function(_559){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_559.key]=_559;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _55a=this.getProperty("persist");
if(_55a&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _55c=new List(_55a.split(" "));
while(_55c.hasNext()){
var prop=_55c.getNext();
var _55e=Persistance.getPersistedProperty(id,prop);
if(_55e!=null){
this._persist[prop]=_55e;
this.setProperty(prop,_55e);
}else{
_55e=this.getProperty(prop);
if(_55e!=null){
this._persist[prop]=_55e;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _55f=this.getProperty("disabled");
var _560=this.getProperty("contextmenu");
var _561=this.getProperty("observes");
var _562=this.getProperty("onattach");
var _563=this.getProperty("hidden");
var _564=this.getProperty("blockactionevents");
if(_563==true&&this.isVisible==true){
this.hide();
}
if(_55f&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_560){
this.setContextMenu(_560);
}
if(_561){
this.observe(this.getBindingForArgument(_561));
}
if(_564==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_562!=null){
Binding.evaluate(_562,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _566=this.getProperty("draggable");
var _567=this.getProperty("dragtype");
var _568=this.getProperty("dragaccept");
var _569=this.getProperty("dragreject");
if(_566!=null){
this.isDraggable=_566;
}
if(_567!=null){
this.dragType=_567;
if(_566!=false){
this.isDraggable=true;
}
}
if(_568!=null){
this.dragAccept=_568;
}
if(_569!=null){
this.dragReject=_569;
}
if(this.isDraggable){
this.enableDragging();
}
if(this.dragger!=null&&this.dragType!=null){
this.dragger.registerHandler(Application);
}
if(this.dragAccept!=null&&this.dragReject==true){
throw new Error("Binding cannot both accept and reject "+this);
}else{
if(this.dragAccept!=null||this.dragReject!=null){
this.acceptor=new BindingAcceptor(this);
}
}
};
Binding.prototype._updateBindingMap=function(_56a){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _56d=null;
if(_56a){
_56d=map[id];
if(_56d!=null&&_56d!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_56d=map[id];
if(_56d!=null&&_56d==this){
delete map[id];
}
}
}else{
var _56f=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_56a);
if(Application.isDeveloperMode==true){
alert(_56f);
}else{
this.logger.error(_56f);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_571){
};
Binding.prototype.handleBroadcast=function(_572,arg){
};
Binding.prototype.handleElement=function(_574){
return false;
};
Binding.prototype.updateElement=function(_575){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _577=null;
switch(typeof arg){
case "object":
_577=arg;
break;
case "string":
_577=this.bindingDocument.getElementById(arg);
if(_577==null){
_577=Binding.evaluate(arg,this);
}
break;
}
if(_577!=null&&_577.nodeType!=null){
_577=UserInterface.getBinding(_577);
}
return _577;
};
Binding.prototype.serialize=function(){
var _578={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_578.id=id;
}
var _57a=this.getProperty("binding");
if(_57a){
_578.binding=_57a;
}
return _578;
};
Binding.prototype.serializeToString=function(){
var _57b=null;
if(this.isAttached){
_57b=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _57b;
};
Binding.prototype.subTreeFromString=function(_57c){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_57c);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57d){
var _57e=this.bindingElement.getAttribute(_57d);
if(_57e){
_57e=Types.castFromString(_57e);
}
return _57e;
};
Binding.prototype.setProperty=function(prop,_580){
if(_580!=null){
_580=_580.toString();
if(String(this.bindingElement.getAttribute(prop))!=_580){
this.bindingElement.setAttribute(prop,_580);
if(this.isAttached==true){
if(Persistance.isEnabled&&_580!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_580;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_580);
}
}
var _581=this.propertyMethodMap[prop];
if(_581){
_581.call(this,this.getProperty(prop));
}
}
}
}else{
this.deleteProperty(prop);
}
};
Binding.prototype.deleteProperty=function(prop){
this.bindingElement.removeAttribute(prop);
};
Binding.prototype.getID=function(){
var _583=null;
if(Binding.exists(this)){
_583=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _583;
};
Binding.prototype.attachClassName=function(_584){
CSSUtil.attachClassName(this.bindingElement,_584);
};
Binding.prototype.detachClassName=function(_585){
CSSUtil.detachClassName(this.bindingElement,_585);
};
Binding.prototype.hasClassName=function(_586){
return CSSUtil.hasClassName(this.bindingElement,_586);
};
Binding.prototype.addActionListener=function(type,_588){
_588=_588!=null?_588:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_588)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_588);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_588+")");
}
};
Binding.prototype.removeActionListener=function(type,_58a){
_58a=_58a?_58a:this;
if(Action.isValid(type)){
var _58b=this.actionListeners[type];
if(_58b){
var i=0,_58d;
while((_58d=_58b[i])!=null){
if(_58d==_58a){
_58b.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58f){
_58f=_58f?_58f:this;
DOMEvents.addEventListener(this.bindingElement,type,_58f);
};
Binding.prototype.removeEventListener=function(type,_591){
_591=_591?_591:this;
DOMEvents.removeEventListener(this.bindingElement,type,_591);
};
Binding.prototype.subscribe=function(_592){
if(!this.hasSubscription(_592)){
this._subscriptions.set(_592,true);
EventBroadcaster.subscribe(_592,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_592);
}
};
Binding.prototype.unsubscribe=function(_593){
if(this.hasSubscription(_593)){
this._subscriptions.del(_593);
EventBroadcaster.unsubscribe(_593,this);
}
};
Binding.prototype.hasSubscription=function(_594){
return this._subscriptions.has(_594);
};
Binding.prototype.observe=function(_595,_596){
_595.addObserver(this,_596);
};
Binding.prototype.unObserve=function(_597,_598){
_597.removeObserver(this,_598);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59c={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59c);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59c);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _59f=false;
var _5a0=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_5a0=setTimeout(function(){
self.handleContextEvent(e);
},800);
_59f=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_59f){
clearTimeout(_5a0);
_59f=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_59f){
clearTimeout(_5a0);
_59f=false;
}
}});
}else{
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
self.handleContextEvent(e);
}});
}
}else{
throw "No such contextmenu: "+arg;
}
};
Binding.prototype.getContextMenu=function(){
return this.contextMenuBinding;
};
Binding.prototype.dispatchAction=function(arg){
var _5a6=null;
var _5a7=null;
var _5a8=false;
if(arg instanceof Action){
_5a6=arg;
}else{
if(Action.isValid(arg)){
_5a6=new Action(this,arg);
_5a8=true;
}
}
if(_5a6!=null&&Action.isValid(_5a6.type)==true){
if(_5a6.isConsumed==true){
_5a7=_5a6;
}else{
var _5a9=this.actionListeners[_5a6.type];
if(_5a9!=null){
_5a6.listener=this;
var i=0,_5ab;
while((_5ab=_5a9[i++])!=null){
if(_5ab&&_5ab.handleAction){
_5ab.handleAction(_5a6);
}
}
}
var _5ac=true;
if(this.isBlockingActions==true){
switch(_5a6.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a8){
_5ac=false;
}
break;
}
}
if(_5ac){
_5a7=this.migrateAction(_5a6);
}else{
_5a7=_5a6;
}
}
}
return _5a7;
};
Binding.prototype.migrateAction=function(_5ad){
var _5ae=null;
var _5af=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5ae&&node.nodeType!=Node.DOCUMENT_NODE){
_5ae=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5ae){
_5af=_5ae.dispatchAction(_5ad);
}else{
_5af=_5ad;
}
}
return _5af;
};
Binding.prototype.reflex=function(_5b1){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5b1);
}
};
Binding.prototype.getMigrationParent=function(){
var _5b2=null;
if(true){
try{
var _5b3=this.bindingElement.parentNode;
if(_5b3!=null){
_5b2=_5b3;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5b2=null;
}
}
return _5b2;
};
Binding.prototype.add=function(_5b4){
if(_5b4.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5b4.bindingElement);
}else{
throw "Could not add "+_5b4.toString()+" of different document origin.";
}
return _5b4;
};
Binding.prototype.addFirst=function(_5b5){
if(_5b5.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b5.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b5.toString()+" of different document origin.";
}
return _5b5;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b6,_5b7){
return BindingFinder.getAncestorBindingByLocalName(this,_5b6,_5b7);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b9){
return BindingFinder.getAncestorBindingByType(this,impl,_5b9);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5bb){
return BindingFinder.getChildElementsByLocalName(this,_5bb);
};
Binding.prototype.getChildElementByLocalName=function(_5bc){
return this.getChildElementsByLocalName(_5bc).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5bd){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5bd));
};
Binding.prototype.getChildBindingsByLocalName=function(_5be){
return this.getDescendantBindingsByLocalName(_5be,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5bf){
return this.getChildBindingsByLocalName(_5bf).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5c0,_5c1){
return BindingFinder.getDescendantBindingsByLocalName(this,_5c0,_5c1);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5c2){
return this.getDescendantBindingsByLocalName(_5c2,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c5){
return BindingFinder.getNextBindingByLocalName(this,_5c5);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c6){
return BindingFinder.getPreviousBindingByLocalName(this,_5c6);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c7){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c7);
};
Binding.prototype.isFirstBinding=function(_5c8){
return (this.getOrdinalPosition(_5c8)==0);
};
Binding.prototype.isLastBinding=function(_5c9){
return DOMUtil.isLastElement(this.bindingElement,_5c9);
};
Binding.prototype.hasCallBackID=function(){
return this.getProperty(Binding.CALLBACKID)!=null;
};
Binding.prototype.getCallBackID=function(){
return this.getProperty(Binding.CALLBACKID);
};
Binding.prototype.setCallBackID=function(id){
this.setProperty(Binding.CALLBACKID,id);
};
Binding.prototype.hasCallBackArg=function(){
return this.getCallBackArg()!=null;
};
Binding.prototype.getCallBackArg=function(){
return this.getProperty(Binding.CALLBACKARG);
};
Binding.prototype.setCallBackArg=function(_5cb){
this.setProperty(Binding.CALLBACKARG,_5cb);
};
Binding.prototype.dispose=function(_5cc){
if(!this.isDisposed){
if(!_5cc){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5cd=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5cd){
if(Client.isExplorer){
_5cd.outerHTML="";
}else{
_5cd.parentNode.removeChild(_5cd);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5d0){
list.add(_5d0);
});
list.each(function(_5d1){
self.unsubscribe(_5d1);
});
}
this.onBindingDispose();
UserInterface.unRegisterBinding(this);
}
}
};
Binding.prototype.onBindingDispose=function(){
if(this._hasActivationAwareness){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this,false);
this._hasActivationAwareness=false;
}
this._updateBindingMap(false);
};
Binding.prototype.enableDragging=function(){
if(this.dragger==null){
this.dragger=new BindingDragger(this);
this.addEventListener(DOMEvents.MOUSEDOWN,this.dragger);
this.addEventListener(DOMEvents.MOUSEMOVE,this.dragger);
this.addEventListener(DOMEvents.MOUSEUP,this.dragger);
}
this.isDraggable=true;
};
Binding.prototype.disableDragging=function(){
if(this.dragger!=null){
this.removeEventListener(DOMEvents.MOUSEDOWN,this.dragger);
this.removeEventListener(DOMEvents.MOUSEMOVE,this.dragger);
this.removeEventListener(DOMEvents.MOUSEUP,this.dragger);
this.dragger.dispose();
this.dragger=null;
}
this.isDraggable=false;
};
Binding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.display="block";
this.setProperty("hidden",true);
this.isVisible=true;
}
};
Binding.prototype.hide=function(){
if(this.isVisible==true){
this.bindingElement.style.display="none";
this.deleteProperty("hidden");
this.isVisible=false;
}
};
Binding.prototype.wakeUp=function(_5d3,_5d4){
_5d4=_5d4?_5d4:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d3!==undefined){
self[_5d3]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5d4);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d6){
if(_5d6.response==null&&this.isLazy==true){
if(_5d6.id==DocumentCrawler.ID&&_5d6.mode==DocumentCrawler.MODE_REGISTER){
_5d6.response=NodeCrawler.NORMAL;
}else{
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d6.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d6.id)){
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d6.response==null){
switch(_5d6.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d7){
var _5d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d7);
return UserInterface.registerBinding(_5d8,Binding);
};
DataBinding.prototype=new Binding;
DataBinding.prototype.constructor=DataBinding;
DataBinding.superclass=Binding.prototype;
DataBinding.AUTOGENERATED="autogenerateddatabindingname";
DataBinding.TYPE_NUMBER="number";
DataBinding.TYPE_INTEGER="integer";
DataBinding.TYPE_STRING="string";
DataBinding.CLASSNAME_INVALID="invalid";
DataBinding.CLASSNAME_INFOBOX="infobox";
DataBinding.CLASSNAME_WARNING="warning";
DataBinding.CLASSNAME_FOCUSED="focused";
DataBinding.CLASSNAME_DISABLED="disabled";
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
var _5d9=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d9.each(function(_5da){
DataBinding.expressions[_5da.Key]=new RegExp(_5da.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5db){
var _5dc=null;
var _5dd=_5db.getAncestorBindingByLocalName("field");
if(_5dd&&_5dd instanceof FieldBinding){
var desc=_5dd.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5dc=desc.getLabel();
}
}
return _5dc;
};
function DataBinding(){
this.logger=SystemLogger.getLogger("DataBinding");
this._name=null;
this.isDirty=false;
this.isFocusable=true;
this.isFocused=false;
this.error=null;
return this;
}
DataBinding.prototype.toString=function(){
return "[DataBinding]";
};
DataBinding.prototype.onBindingRegister=function(){
DataBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["isdisabled"]=this.setDisabled;
var name=this._name?this._name:this.getProperty("name");
if(name==null){
name=DataBinding.AUTOGENERATED+KeyMaster.getUniqueKey();
}
this.setName(name);
};
DataBinding.prototype.onBindingAttach=function(){
DataBinding.superclass.onBindingAttach.call(this);
if(this.getProperty("error")){
this.error=this.getProperty("error");
}
};
DataBinding.prototype.onBindingDispose=function(){
DataBinding.superclass.onBindingDispose.call(this);
if(this.isFocused==true){
this.blur();
}
var _5e0=this.bindingWindow.DataManager;
_5e0.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5e2=this.bindingWindow.DataManager;
if(_5e2.getDataBinding(name)){
_5e2.unRegisterDataBinding(name);
}
_5e2.registerDataBinding(name,this);
this.setProperty("name",name);
this._name=name;
};
DataBinding.prototype.getName=function(){
return this._name;
};
DataBinding.prototype.focus=function(){
if(this.isFocusable&&!this.isFocused){
this.isFocused=true;
this.dispatchAction(Binding.ACTION_FOCUSED);
this.attachClassName(DataBinding.CLASSNAME_FOCUSED);
}
};
DataBinding.prototype.blur=function(){
if(this.isFocused){
this.isFocused=false;
this.dispatchAction(Binding.ACTION_BLURRED);
this.detachClassName(DataBinding.CLASSNAME_FOCUSED);
}
};
DataBinding.prototype.dirty=function(){
this.bindingWindow.DataManager.dirty(this);
};
DataBinding.prototype.clean=function(){
this.bindingWindow.DataManager.clean(this);
};
DataBinding.prototype.validate=Binding.ABSTRACT_METHOD;
DataBinding.prototype.manifest=Binding.ABSTRACT_METHOD;
DataBinding.prototype.getValue=Binding.ABSTRACT_METHOD;
DataBinding.prototype.setValue=Binding.ABSTRACT_METHOD;
DataBinding.prototype.getResult=Binding.ABSTRACT_METHOD;
DataBinding.prototype.setResult=Binding.ABSTRACT_METHOD;
RootBinding.prototype=new Binding;
RootBinding.prototype.constructor=RootBinding;
RootBinding.superclass=Binding.prototype;
RootBinding.ACTION_PHASE_1="root init phase 1";
RootBinding.ACTION_PHASE_2="root init phase 2";
RootBinding.ACTION_PHASE_3="root init phase 3";
RootBinding.ACTION_ACTIVATED="root activated";
RootBinding.ACTION_DEACTIVATED="root deactivated";
function RootBinding(){
this.logger=SystemLogger.getLogger("RootBinding");
this.isActivationAware=false;
this.isActivated=false;
this._activationawares=null;
return this;
}
RootBinding.prototype.toString=function(){
return "[RootBinding]";
};
RootBinding.prototype.onBindingRegister=function(){
RootBinding.superclass.onBindingRegister.call(this);
this.logger=SystemLogger.getLogger(this.bindingDocument.title.toString());
if(this.bindingWindow.WindowManager){
this.subscribe(this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST);
}
this._activationawares=new List();
this.isActivated=false;
this._setupActivationAwareness(true);
if(Localization.isUIRtl){
this.setProperty("dir","rtl");
this.attachClassName("rtl");
}
};
RootBinding.prototype.onBindingDispose=function(){
RootBinding.superclass.onBindingDispose.call(this);
this._setupActivationAwareness(false);
EventBroadcaster.unsubscribe(this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST,this);
};
RootBinding.prototype.handleBroadcast=function(_5e3,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e3,arg);
var _5e5=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e3){
case _5e5:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e5);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e6){
var _5e7=_5e6?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e6!=this.isActivated){
this.isActivated=_5e6;
this.dispatchAction(_5e7);
var _5e8=new List();
var self=this;
this._activationawares.each(function(_5ea){
if(_5ea.isActivationAware){
try{
if(_5e6){
if(!_5ea.isActivated){
_5ea.onActivate();
}
}else{
if(_5ea.isActivated){
_5ea.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e8.add(_5ea);
}
}
});
_5e8.each(function(_5eb){
this._activationawares.del(_5eb);
});
_5e8.dispose();
}else{
var _5ec="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5ec);
}else{
this.logger.error(_5ec);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ed,_5ee){
if(Interfaces.isImplemented(IActivationAware,_5ed,true)==true){
if(_5ee==false){
this._activationawares.del(_5ed);
}else{
this._activationawares.add(_5ed);
if(this.isActivated==true){
_5ed.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ed+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ef){
var _5f0=this.getMigrationParent();
if(_5f0!=null){
var root=_5f0.ownerDocument.body;
var _5f2=UserInterface.getBinding(root);
if(_5f2!=null){
_5f2.makeActivationAware(this,_5ef);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f3){
RootBinding.superclass.handleCrawler.call(this,_5f3);
if(_5f3.type==NodeCrawler.TYPE_ASCENDING){
_5f3.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5f4=null;
if(this.bindingWindow.parent){
_5f4=this.bindingWindow.frameElement;
}
return _5f4;
};
StyleBinding.prototype=new Binding;
StyleBinding.prototype.constructor=StyleBinding;
StyleBinding.superclass=Binding.prototype;
function StyleBinding(){
this.logger=SystemLogger.getLogger("StyleBinding");
this.style=null;
this.href=null;
return this;
}
StyleBinding.prototype.toString=function(){
return "[StyleBinding]";
};
StyleBinding.prototype.onBindingAttach=function(){
StyleBinding.superclass.onBindingAttach.call(this);
console.log("StyleBinding.prototype.onBindingAttach");
this.href=this.getProperty("link");
this.style=document.createElement("link");
this.style.rel="stylesheet";
this.style.type="text/css";
this.style.href=Resolver.resolve(this.href);
this.bindingDocument.getElementsByTagName("head")[0].appendChild(this.style);
};
StyleBinding.prototype.handleElement=function(_5f5){
return true;
};
StyleBinding.prototype.updateElement=function(_5f6){
var href=_5f6.getAttribute("link");
if(this.href!=href){
this.href=href;
this.style.href=Resolver.resolve(this.href);
}
return true;
};
StyleBinding.prototype.onBindingDispose=function(){
StyleBinding.superclass.onBindingDispose.call(this);
if(this.style&&this.style.parentNode){
this.style.parentNode.removeChild(this.style);
}
this.href=null;
this.style=null;
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f8,_5f9){
var list=new List();
var _5fb=new FlexBoxCrawler();
_5fb.mode=_5f9?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5fb.startBinding=_5f8;
_5fb.crawl(_5f8.bindingElement,list);
list.each(function(_5fc){
_5fc.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fd){
if(Binding.exists(_5fd)){
_5fd.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fe){
if(Binding.exists(_5fe)){
_5fe.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5fb.dispose();
};
function FlexBoxBinding(){
this.logger=SystemLogger.getLogger("FlexBoxBinding");
this.isFlexSuspended=false;
this.isFlexible=true;
this.isFit=true;
return this;
}
FlexBoxBinding.prototype.toString=function(){
return "[FlexBoxBinding]";
};
FlexBoxBinding.prototype.onBindingRegister=function(){
FlexBoxBinding.superclass.onBindingRegister.call(this);
if(this.getProperty("flex")==false){
this.isFlexible=false;
}
if(this.isFlexible){
this.attachClassName(FlexBoxBinding.CLASSNAME);
if(Client.isPad){
this.bindingElement.style.overflow="auto";
}
}
};
FlexBoxBinding.prototype.onBindingAttach=function(){
FlexBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_UPDATED);
};
FlexBoxBinding.prototype.handleAction=function(_5ff){
FlexBoxBinding.superclass.handleAction.call(this,_5ff);
switch(_5ff.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_600){
var _601=0;
var _602=new List(this.bindingElement.parentNode.childNodes);
while(_602.hasNext()){
var _603=_602.getNext();
if(_603.nodeType==Node.ELEMENT_NODE&&_603!=this.bindingElement){
if(!this._isOutOfFlow(_603)){
var rect=_603.getBoundingClientRect();
if(_600){
height+=(rect.right-rect.left);
}else{
_601+=(rect.bottom-rect.top);
}
}
}
}
return _601;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_605){
var _606=CSSComputer.getPosition(_605);
var _607=CSSComputer.getFloat(_605);
return (_606=="absolute"||_607!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _608=this.bindingElement.parentNode;
var rect=_608.getBoundingClientRect();
var _60a=rect.bottom-rect.top;
var _60b=CSSComputer.getPadding(_608);
var _60c=CSSComputer.getBorder(_608);
_60a-=(_60b.top+_60b.bottom);
_60a-=(_60c.top+_60c.bottom);
return _60a;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60d=this.bindingElement.parentNode;
var rect=_60d.getBoundingClientRect();
var _60f=rect.right-rect.left;
var _610=CSSComputer.getPadding(_60d);
var _611=CSSComputer.getBorder(_60d);
_60f-=(_610.left+_610.right);
_60f-=(_611.left+_611.right);
return _60f;
};
FlexBoxBinding.prototype.setFlexibility=function(_612){
if(_612!=this.isFlexible){
if(_612){
this.attachClassName(FlexBoxBinding.CLASSNAME);
if(Client.isPad){
this.bindingElement.style.overflow="auto";
}
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
if(Client.isPad){
this.bindingElement.style.removeProperty("overflow");
}
this.setProperty("flex",false);
}
this.isFlexible=_612;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _613=this._getSiblingsSpan();
_613=this._getCalculatedHeight()-_613;
if(!isNaN(_613)&&_613>=0){
this.bindingElement.style.height=String(_613)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_614){
if(!this.isFit||_614){
var _615=0;
new List(this.bindingElement.childNodes).each(function(_616){
if(_616.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_616)){
var rect=_616.getBoundingClientRect();
_615+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_615);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_618){
var _619=CSSComputer.getPadding(this.bindingElement);
var _61a=CSSComputer.getBorder(this.bindingElement);
_618+=_619.top+_619.bottom;
_618+=_61a.top+_61a.bottom;
this.bindingElement.style.height=_618+"px";
};
ScrollBoxBinding.prototype=new FlexBoxBinding;
ScrollBoxBinding.prototype.constructor=ScrollBoxBinding;
ScrollBoxBinding.superclass=FlexBoxBinding.prototype;
function ScrollBoxBinding(){
this.logger=SystemLogger.getLogger("ScrollBoxBinding");
}
ScrollBoxBinding.prototype.toString=function(){
return "[ScrollBoxBinding]";
};
ScrollBoxBinding.prototype.onBindingRegister=function(){
ScrollBoxBinding.superclass.onBindingRegister.call(this);
this.addActionListener(BalloonBinding.ACTION_INITIALIZE);
};
ScrollBoxBinding.prototype.handleAction=function(_61b){
ScrollBoxBinding.superclass.handleAction.call(this,_61b);
switch(_61b.type){
case BalloonBinding.ACTION_INITIALIZE:
_61b.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_61c){
this.bindingElement.scrollLeft=_61c.x;
this.bindingElement.scrollTop=_61c.y;
};
ScrollBoxBinding.prototype.getPosition=function(){
return new Point(this.bindingElement.scrollLeft,this.bindingElement.scrollTop);
};
LabelBinding.prototype=new Binding;
LabelBinding.prototype.constructor=LabelBinding;
LabelBinding.superclass=Binding.prototype;
LabelBinding.DIALOG_INDECATOR_SUFFIX=String.fromCharCode(8230);
LabelBinding.DEFAULT_IMAGE="blank";
LabelBinding.SPRITE_PATH="${root}/images/sprite.svg";
LabelBinding.CLASSNAME_GRAYTEXT="graytext";
LabelBinding.CLASSNAME_FLIPPED="flipped";
LabelBinding.sprites=null;
LabelBinding.spritesQueue=new Map();
LabelBinding.spriteLoading=false;
LabelBinding.spriteLoad=function(){
function onspriteload(){
var _61d=this,_61e=document.createElement("x");
_61e.innerHTML=_61d.responseText;
var uses=_61e.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _624=_61e.querySelector("#"+hash);
if(_624){
var _625=_624.cloneNode(true);
_625.id=def.id;
def.parentNode.replaceChild(_625,def);
}
}
LabelBinding.sprites=_61e;
LabelBinding.spriteLoading=false;
LabelBinding.spritesQueue.each(function(key,_627){
var _628=UserInterface.getBindingByKey(key);
if(_628!=null){
LabelBinding.setImageSvg(_628,_627);
}
});
LabelBinding.spritesQueue.empty();
}
if(!LabelBinding.spriteLoading){
LabelBinding.spriteLoading=true;
var _629=new XMLHttpRequest();
_629.open("GET",Resolver.resolve(LabelBinding.SPRITE_PATH));
_629.onload=onspriteload;
_629.send();
}
};
LabelBinding.setImageSvg=function(_62a,_62b){
if(_62b&&typeof _62b=="string"&&/^[A-Za-z]+[\w\-\.]*$/.test(_62b)){
if(_62a.shadowTree.labelBody){
if(!_62b){
}else{
if(LabelBinding.sprites){
var g=LabelBinding.sprites.querySelector("#"+_62b);
if(g){
var _62d="http://www.w3.org/2000/svg";
if(!_62a.shadowTree.svg){
_62a.shadowTree.svg=_62a.bindingDocument.createElementNS(_62d,"svg");
_62a.shadowTree.labelBody.insertBefore(_62a.shadowTree.svg,_62a.shadowTree.labelBody.firstChild);
}
_62a.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
var _62e=g.getAttribute("viewBox"),_62f=document.createDocumentFragment(),_630=g.cloneNode(true);
if(_62e){
_62a.shadowTree.svg.setAttribute("viewBox",_62e);
}
_62f.appendChild(_630);
_62a.shadowTree.svg.innerHTML="";
_62a.shadowTree.svg.appendChild(_62f);
}
}else{
LabelBinding.spritesQueue.set(_62a.getID(),_62b);
LabelBinding.spriteLoad();
}
}
}
}else{
if(_62a.shadowTree.svg){
if(_62a.shadowTree.svg.parentNode){
_62a.shadowTree.svg.parentNode.removeChild(_62a.shadowTree.svg);
}
_62a.shadowTree.svg=null;
}
}
};
function LabelBinding(){
this.logger=SystemLogger.getLogger("LabelBinding");
this.hasImage=false;
this.hasLabel=false;
this.isFlipped=false;
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
LabelBinding.prototype.toString=function(){
return "[LabelBinding]";
};
LabelBinding.prototype.onBindingRegister=function(){
LabelBinding.superclass.onBindingRegister.call(this);
if(this.isBindingBuild){
this.shadowTree.labelBody=this._getBuildElement("labelbody");
}else{
this.shadowTree.labelBody=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbody",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.labelBody);
}
};
LabelBinding.prototype.onBindingAttach=function(){
LabelBinding.superclass.onBindingAttach.call(this);
if(this.isBindingBuild){
var _631=this._getBuildElement("labeltext");
if(_631){
this.shadowTree.labelText=_631;
this.shadowTree.text=_631.firstChild;
this.hasLabel=true;
}
}else{
var _632=this.getProperty("label");
var _633=this.getProperty("image");
var _634=this.getProperty("tooltip");
if(_632){
this.setLabel(_632,false);
}
if(_633){
this.setImage(_633,false);
}
if(_634){
this.setToolTip(_634);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_635,_636){
_635=_635!=null?_635:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_635);
this.setProperty("label",_635);
if(!_636){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_638){
if(url!=false&&url!=undefined){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _639=Resolver.resolve(url);
if(_639.classes){
this.setAlphaTransparentBackdrop();
this.setImageSvg();
this.setImageClasses(_639.classes);
}else{
if(typeof _639=="string"&&_639[0]=="/"){
this.setAlphaTransparentBackdrop(_639);
this.setImageSvg();
this.setImageClasses();
}else{
this.setAlphaTransparentBackdrop();
this.setImageSvg(_639);
this.setImageClasses();
}
}
if(typeof _639=="string"){
this.setProperty("image",url);
}
this.hasImage=true;
if(!_638){
this.buildClassName();
}
}else{
this.setImageSvg();
this.setImageClasses();
this.deleteProperty("image");
this.hasImage=false;
this.buildClassName();
}
};
LabelBinding.prototype.setImageClasses=function(_63a){
if(this.shadowTree.labelBody){
if(!_63a){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_63a;
}
}
};
LabelBinding.prototype.setImageSvg=function(svg){
LabelBinding.setImageSvg(this,svg);
};
LabelBinding.prototype.setDefaultImage=function(url){
this.setImage(LabelBinding.DEFAULT_IMAGE);
};
LabelBinding.prototype.setAlphaTransparentBackdrop=function(url){
if(this.shadowTree.labelBody){
if(url){
url=Resolver.resolve(url);
this.shadowTree.labelBody.style.backgroundImage="url('"+url+"')";
}else{
this.shadowTree.labelBody.style.removeProperty("background-image");
}
}
};
LabelBinding.prototype.getImage=function(){
return this.getProperty("image");
};
LabelBinding.prototype.setToolTip=function(_63e){
this.setProperty("tooltip",_63e);
if(_63e!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_63e));
}
};
LabelBinding.prototype.getToolTip=function(_63f){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_640){
_640=_640==null?true:_640;
var _641=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_640;
if(_640){
this.attachClassName(_641);
}else{
this.detachClassName(_641);
}
}
};
LabelBinding.prototype.buildLabel=function(){
if(!this.hasLabel){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:labeltext",this.bindingDocument);
this.shadowTree.text=this.bindingDocument.createTextNode("");
this.shadowTree.labelText.appendChild(this.shadowTree.text);
this.shadowTree.labelBody.appendChild(this.shadowTree.labelText);
this.hasLabel=true;
}
};
LabelBinding.prototype.buildClassName=function(){
var _642="textonly";
var _643="imageonly";
var _644="image-and-text";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_642);
this.detachClassName(_643);
this.attachClassName(_644);
}else{
if(this.hasLabel){
this.detachClassName(_644);
this.detachClassName(_643);
this.attachClassName(_642);
}else{
if(this.hasImage){
this.detachClassName(_644);
this.detachClassName(_642);
this.attachClassName(_643);
}
}
}
};
LabelBinding.newInstance=function(_645){
var _646=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_645);
return UserInterface.registerBinding(_646,LabelBinding);
};
TextBinding.prototype=new Binding;
TextBinding.prototype.constructor=TextBinding;
TextBinding.superclass=Binding.prototype;
function TextBinding(){
this.logger=SystemLogger.getLogger("TextBinding");
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
TextBinding.prototype.toString=function(){
return "[TextBinding]";
};
TextBinding.prototype.onBindingAttach=function(){
TextBinding.superclass.onBindingAttach.call(this);
var _647=this.getProperty("label");
if(!_647){
_647=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_647));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_649){
this.setProperty("label",_649);
};
TextBinding.newInstance=function(_64a){
var _64b=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_64a);
return UserInterface.registerBinding(_64b,TextBinding);
};
BroadcasterSetBinding.prototype=new Binding;
BroadcasterSetBinding.prototype.constructor=BroadcasterSetBinding;
BroadcasterSetBinding.superclass=Binding.prototype;
function BroadcasterSetBinding(){
this.logger=SystemLogger.getLogger("BroadcasterSetBinding");
}
BroadcasterSetBinding.prototype.toString=function(){
return "[BroadcasterSetBinding]";
};
BroadcasterBinding.prototype=new Binding;
BroadcasterBinding.prototype.constructor=BroadcasterBinding;
BroadcasterBinding.superclass=Binding.prototype;
function BroadcasterBinding(){
this.logger=SystemLogger.getLogger("BroadcasterBinding");
this._observers=null;
}
BroadcasterBinding.prototype.toString=function(){
return "[BroadcasterBinding]";
};
BroadcasterBinding.prototype.onBindingRegister=function(){
BroadcasterBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["isdisabled"]=this.setDisabled;
this._observers=new List();
};
BroadcasterBinding.prototype.setProperty=function(_64c,_64d){
BroadcasterBinding.superclass.setProperty.call(this,_64c,_64d);
function update(list){
if(list){
list.each(function(_64f){
_64f.setProperty(_64c,_64d);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _650=this._observers[_64c];
if(_650){
update(_650);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_651){
BroadcasterBinding.superclass.deleteProperty.call(this,_651);
function update(list){
if(list){
list.each(function(_653){
_653.deleteProperty(_651);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _654=this._observers[_651];
if(_654){
update(_654);
}
};
BroadcasterBinding.prototype.addObserver=function(_655,_656){
_656=_656?_656:"*";
_656=new List(_656.split(" "));
while(_656.hasNext()){
var _657=_656.getNext();
switch(_657){
case "*":
this._setAllProperties(_655);
break;
default:
var _658=this.getProperty(_657);
_655.setProperty(_657,_658);
break;
}
if(!this._observers[_657]){
this._observers[_657]=new List();
}
this._observers[_657].add(_655);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_659){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _65c=att.nodeName;
switch(_65c){
case "id":
case "key":
break;
default:
var _65d=this.getProperty(_65c);
_659.setProperty(_65c,_65d);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_65e,_65f){
_65f=_65f?_65f:"*";
_65f=new List(_65f.split(" "));
while(_65f.hasNext()){
var list=this._observers[_65f.getNext()];
if(list){
while(list.hasNext()){
var _661=list.getNext();
if(_661==_65e){
list.del(_661);
}
}
}
}
};
BroadcasterBinding.prototype.disable=function(){
this.setDisabled(true);
};
BroadcasterBinding.prototype.enable=function(){
this.setDisabled(false);
};
BroadcasterBinding.prototype.setDisabled=function(_662){
this.setProperty("isdisabled",_662);
};
BroadcasterBinding.prototype.isDisabled=function(){
return this.getProperty("isdisabled")==true;
};
ButtonBinding.prototype=new Binding;
ButtonBinding.prototype.constructor=ButtonBinding;
ButtonBinding.superclass=Binding.prototype;
ButtonBinding.ACTION_COMMAND="buttoncommand";
ButtonBinding.ACTION_RADIOBUTTON_ATTACHED="radiobutton attached";
ButtonBinding.TYPE_CHECKBUTTON="checkbox";
ButtonBinding.TYPE_RADIOBUTTON="radio";
ButtonBinding.CLASSNAME_FOCUSABLE="focusable";
ButtonBinding.CLASSNAME_FOCUSED="focused";
ButtonBinding.CLASSNAME_DEFAULT="primary";
function ButtonBinding(){
this.logger=SystemLogger.getLogger("ButtonBinding");
this.isCheckButton=false;
this.isRadioButton=false;
this.isComboButton=false;
this.isCheckBox=false;
this.isActive=false;
this.isChecked=false;
this.isDisabled=false;
this.isFocusable=false;
this._isFocusableButton=false;
this.isFocused=false;
this.isDefault=false;
this.popupBinding=null;
this.labelBinding=null;
this.image=null;
this.imageHover=null;
this.imageActive=null;
this.imageDisabled=null;
this.imageProfile=null;
this._stateManager=null;
this.response=null;
this.popupBindingTargetElement=null;
this.commandAction=ButtonBinding.ACTION_COMMAND;
this.isFlipped=false;
this.isDirty=false;
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID,FitnessCrawler.ID]);
}
ButtonBinding.prototype.toString=function(){
return "[ButtonBinding]";
};
ButtonBinding.prototype.onBindingRegister=function(){
ButtonBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["isdisabled"]=this.setDisabled;
};
ButtonBinding.prototype.onBindingAttach=function(){
ButtonBinding.superclass.onBindingAttach.call(this);
this.parseDOMProperties();
this.buildDOMContent();
if(this.isRadioButton==true){
this.dispatchAction(ButtonBinding.ACTION_RADIOBUTTON_ATTACHED);
}
};
ButtonBinding.prototype.onBindingDispose=function(){
ButtonBinding.superclass.onBindingDispose.call(this);
if(this._stateManager!=null){
this._stateManager.dispose();
this._stateManager=null;
}
var _663=this.getProperty("callbackid");
if(_663!=null){
this.bindingWindow.DataManager.unRegisterDataBinding(_663);
}
};
ButtonBinding.prototype.parseDOMProperties=function(){
Binding.imageProfile(this);
};
ButtonBinding.prototype.buildDOMContent=function(){
var tree=this.shadowTree;
var _665=this.getProperty("width");
var _666=this.getProperty("label");
var type=this.getProperty("type");
var _668=this.getProperty("popup");
var _669=this.getProperty("tooltip");
var _66a=this.getProperty("isdisabled");
var _66b=this.getProperty("response");
var _66c=this.getProperty("oncommand");
var _66d=this.getProperty("value");
var _66e=this.getProperty("ischecked");
var _66f=this.getProperty("callbackid");
var _670=this.getProperty("focusable");
var _671=this.getProperty("focused");
var _672=this.getProperty("default");
var url=this.getProperty("url");
var _674=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_674){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_666!=null){
this.setLabel(_666);
}
if(type!=null){
this.setType(type);
}
if(_669!=null){
this.setToolTip(_669);
}
if(_665!=null){
this.setWidth(_665);
}
if(_668!=null){
this.setPopup(_668);
}
if(_66b!=null){
this.response=_66b;
}
if(_66e==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_66c!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_66c,this);
};
}
if(_670||this.isFocusable){
this._makeFocusable();
if(_672||this.isDefault){
this.isDefault=true;
}
if(_671){
this.focus();
}
}
if(_66a==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_66f!=null){
this.bindingWindow.DataManager.registerDataBinding(_66f,this);
if(_66d!=null){
Binding.dotnetify(this,_66d);
}
if(this.oncommand==null){
this.oncommand=function(){
this.dirty();
if(this.getProperty("validate")==true){
this.dispatchAction(PageBinding.ACTION_DOVALIDATEDPOSTBACK);
}else{
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
}
};
}
}
};
ButtonBinding.prototype._makeFocusable=function(){
this.isFocusable=true;
this.attachClassName(ButtonBinding.CLASSNAME_FOCUSABLE);
this._isFocusableButton=true;
};
ButtonBinding.prototype.setImage=function(_675){
if(this.isAttached){
this.labelBinding.setImage(_675);
}
this.setProperty("image",_675);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_676){
if(this.isAttached){
this.labelBinding.setLabel(_676);
}
this.setProperty("label",_676);
};
ButtonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
ButtonBinding.prototype.setType=function(type){
switch(type){
case ButtonBinding.TYPE_CHECKBUTTON:
this.isCheckButton=true;
break;
case ButtonBinding.TYPE_RADIOBUTTON:
this.isRadioButton=true;
break;
}
this.setProperty("type",type);
};
ButtonBinding.prototype.setToolTip=function(_678){
this.setProperty("tooltip",_678);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_678));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_679){
this.imageProfile=new _679(this);
};
ButtonBinding.prototype.setPopup=function(arg){
this.popupBinding=this.getBindingForArgument(arg);
if(this.popupBinding){
this.setType(ButtonBinding.TYPE_CHECKBUTTON);
if(!this.popupBindingTargetElement){
this.popupBindingTargetElement=this.bindingElement;
}
var self=this;
this.popupBinding.addActionListener(PopupBinding.ACTION_HIDE,{handleAction:function(){
if(self.isChecked==true){
self.uncheck(true);
}
}});
}
};
ButtonBinding.prototype.setURL=function(url){
if(this.isAttached==true){
if(!this.shadowTree.buttonurl){
var a=this.bindingDocument.createElement("a");
a.className="buttonurl";
a.target="_blank";
this.shadowTree.buttonurl=a;
this.bindingElement.appendChild(a);
}
this.shadowTree.buttonurl.href=url;
}
this.setProperty("url",url);
};
ButtonBinding.prototype.getURL=function(){
return this.getProperty("url");
};
ButtonBinding.prototype.flip=function(_67e){
_67e=_67e==null?true:_67e;
this.isFlipped=_67e;
this.setProperty("flip",_67e);
if(this.isAttached){
this.labelBinding.flip(_67e);
}
};
ButtonBinding.prototype.fireCommand=function(){
if(!this.isDisabled){
if(this.oncommand!=null){
this.oncommand();
}
this.dispatchAction(this.commandAction);
this.invokePopup();
}
};
ButtonBinding.prototype.invokePopup=function(){
if(!this.isDisabled){
if(this.popupBinding){
if(!this.isCheckButton||this.isChecked){
this.popupBinding.snapTo(this.popupBindingTargetElement);
this.popupBinding.show();
this.popupBinding.grabKeyboard();
}else{
this.popupBinding.hide();
this.popupBinding.releaseKeyboard();
}
}
}
};
ButtonBinding.prototype.oncommand=null;
ButtonBinding.prototype.invoke=function(){
if(!this.isCheckButton){
this.fireCommand();
}else{
if(this.isChecked){
this.uncheck();
}else{
this.check();
}
}
};
ButtonBinding.prototype.check=function(_67f){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_67f==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",true);
}
}
};
ButtonBinding.prototype._check=function(_680){
this.isActive=true;
this.isChecked=true;
if(!_680){
this._stateManager.invokeActiveState();
}
this.setProperty("ischecked",true);
};
ButtonBinding.prototype.uncheck=function(_681){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_681==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",false);
}
}
};
ButtonBinding.prototype._uncheck=function(_682){
this.isActive=false;
this.isChecked=false;
if(!_682){
this._stateManager.invokeNormalState();
}
this.setProperty("ischecked",false);
};
ButtonBinding.prototype.setChecked=function(_683,_684){
if(_683==null){
_683==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_683){
case true:
this.check(_684);
break;
case false:
this.uncheck(_684);
break;
}
}
};
ButtonBinding.prototype.setDisabled=function(bool){
if(bool==null){
bool=false;
}
this.isDisabled=bool;
switch(bool){
case true:
this.bindingElement.setAttribute("title","");
this.setProperty("isdisabled",true);
if(this._stateManager!=null){
this._stateManager.invokeDisabledState();
}
break;
case false:
this.deleteProperty("isdisabled");
var _686=this.getProperty("tooltip");
if(_686){
this.setToolTip(_686);
}
if(this._stateManager!=null){
this._stateManager.invokeNormalState();
}
break;
}
if(this._isFocusableButton==true){
this.isFocusable=!this.isDisabled;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
ButtonBinding.prototype.disable=function(){
this.setDisabled(true);
};
ButtonBinding.prototype.enable=function(){
this.setDisabled(false);
};
ButtonBinding.prototype.focus=function(){
if(this.isFocusable&&!this.isFocused){
this.isFocused=true;
FocusBinding.focusElement(this.bindingElement);
this.dispatchAction(Binding.ACTION_FOCUSED);
}
};
ButtonBinding.prototype.blur=function(){
if(this.isFocusable&&this.isFocused){
this.isFocused=false;
this.dispatchAction(Binding.ACTION_BLURRED);
}
};
ButtonBinding.prototype.onMouseDown=function(){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,this);
this.dispatchAction(Binding.ACTION_ACTIVATED);
};
ButtonBinding.prototype.onMouseUp=function(){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEUP,this);
};
ButtonBinding.prototype.getEqualSizeWidth=function(){
var _687=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_687=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _687;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _689=this.getEqualSizeWidth();
if(goal>_689){
var diff=goal-_689;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _68c=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_68d){
if(_68d>=0){
this.bindingElement.style.width=new String(_68d+"px");
}
this.setProperty("width",_68d);
};
ButtonBinding.prototype.validate=function(){
return true;
};
ButtonBinding.prototype.manifest=function(){
};
ButtonBinding.prototype.dirty=DataBinding.prototype.dirty;
ButtonBinding.prototype.clean=DataBinding.prototype.clean;
ButtonBinding.prototype.getName=function(){
};
ButtonBinding.prototype.getValue=function(){
return this.shadowTree.dotnetinput.value;
};
ButtonBinding.prototype.setValue=function(_68e){
this.shadowTree.dotnetinput.value=_68e;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_68f){
this.setValue(_68f);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_690){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_690;
this.imageProfile=_690.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_691){
var _692=_691?"addEventListener":"removeEventListener";
this.binding[_692](DOMEvents.MOUSEENTER,this);
this.binding[_692](DOMEvents.MOUSELEAVE,this);
this.binding[_692](DOMEvents.MOUSEDOWN,this);
this.binding[_692](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _694=false,_695=false,_696=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_696=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_696=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_696=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_696=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_696==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_694=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_696=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_696=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_696=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_696=ButtonStateManager.STATE_NORMAL;
var _697=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_697 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_696=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_696==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_695=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_696=ButtonStateManager.STATE_NORMAL;
_694=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_696=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_696=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_696=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_696=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_696==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_694=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_696=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_696=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_696=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_696=ButtonStateManager.STATE_NORMAL;
_694=true;
break;
}
}
}
}
}
switch(_696){
case ButtonStateManager.STATE_NORMAL:
this.invokeNormalState();
break;
case ButtonStateManager.STATE_HOVER:
this.invokeHoverState();
break;
case ButtonStateManager.STATE_ACTIVE:
this.invokeActiveState();
break;
}
if(_694){
this.binding.fireCommand();
}
if(_695){
this.binding.invokePopup();
}
if(Binding.exists(this.binding)==true){
DOMEvents.stopPropagation(e);
switch(e.type){
case DOMEvents.MOUSEDOWN:
this.binding.onMouseDown();
break;
case DOMEvents.MOUSEUP:
this.binding.onMouseUp();
break;
}
}
}
};
ButtonStateManager.prototype.invokeNormalState=function(){
this.binding.detachClassName("hover");
this.binding.detachClassName("active");
this.binding.detachClassName("isdisabled");
};
ButtonStateManager.prototype.invokeHoverState=function(){
this.binding.attachClassName("hover");
this.binding.detachClassName("active");
};
ButtonStateManager.prototype.invokeActiveState=function(){
this.binding.attachClassName("active");
this.binding.detachClassName("hover");
};
ButtonStateManager.prototype.invokeDisabledState=function(){
this.binding.detachClassName("hover");
this.binding.detachClassName("active");
this.binding.attachClassName("isdisabled");
};
ClickButtonBinding.prototype=new ButtonBinding;
ClickButtonBinding.prototype.constructor=ClickButtonBinding;
ClickButtonBinding.superclass=ButtonBinding.prototype;
function ClickButtonBinding(){
this.logger=SystemLogger.getLogger("ClickButtonBinding");
}
ClickButtonBinding.prototype.toString=function(){
return "[ClickButtonBinding]";
};
ClickButtonBinding.newInstance=function(_698){
var _699=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_698);
return UserInterface.registerBinding(_699,ClickButtonBinding);
};
RadioButtonBinding.prototype=new ButtonBinding;
RadioButtonBinding.prototype.constructor=RadioButtonBinding;
RadioButtonBinding.superclass=ButtonBinding.prototype;
function RadioButtonBinding(){
this.logger=SystemLogger.getLogger("RadioButtonBinding");
this.isRadioButton=true;
return this;
}
RadioButtonBinding.prototype.toString=function(){
return "[RadioButtonBinding]";
};
RadioButtonBinding.newInstance=function(_69a){
var _69b=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_69a);
return UserInterface.registerBinding(_69b,RadioButtonBinding);
};
CheckButtonBinding.prototype=new ButtonBinding;
CheckButtonBinding.prototype.constructor=CheckButtonBinding;
CheckButtonBinding.superclass=ButtonBinding.prototype;
function CheckButtonBinding(){
this.logger=SystemLogger.getLogger("CheckButtonBinding");
this.isCheckButton=true;
this.isCheckBox=true;
}
CheckButtonBinding.prototype.toString=function(){
return "[CheckButtonBinding]";
};
CheckButtonBinding.newInstance=function(_69c){
var _69d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_69c);
return UserInterface.registerBinding(_69d,CheckButtonBinding);
};
ViewButtonBinding.prototype=new ButtonBinding;
ViewButtonBinding.prototype.constructor=ViewButtonBinding;
ViewButtonBinding.superclass=ButtonBinding.prototype;
function ViewButtonBinding(){
return this;
}
ViewButtonBinding.prototype.toString=function(){
return "[ViewButtonBinding]";
};
ViewButtonBinding.prototype.oncommand=function(){
alert(this);
};
ControlGroupBinding.prototype=new Binding;
ControlGroupBinding.prototype.constructor=ControlGroupBinding;
ControlGroupBinding.superclass=Binding.prototype;
function ControlGroupBinding(){
this.logger=SystemLogger.getLogger("ControlGroupBinding");
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
ControlGroupBinding.prototype.toString=function(){
return "[ControlGroupBinding]";
};
ControlGroupBinding.prototype.onBindingAttach=function(){
ControlGroupBinding.superclass.onBindingAttach.call(this);
this.assignDOMEvents();
};
ControlGroupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
ControlGroupBinding.prototype.onActivate=function(){
var _69e=this.getDescendantBindingsByLocalName("control");
_69e.each(function(_69f){
_69f.setControlType(_69f.controlType);
});
};
ControlGroupBinding.prototype.onDeactivate=ControlGroupBinding.prototype.onActivate;
ControlGroupBinding.prototype.handleEvent=function(e){
ControlGroupBinding.superclass.handleEvent.call(this,e);
DOMEvents.stopPropagation(e);
switch(e.type){
case DOMEvents.MOUSEDOWN:
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,e);
this.dispatchAction(Binding.ACTION_ACTIVATED);
break;
case DOMEvents.MOUSEUP:
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEUP,e);
break;
}
};
ControlGroupBinding.newInstance=function(_6a1){
var _6a2=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6a1);
return UserInterface.registerBinding(_6a2,ControlGroupBinding);
};
ControlBinding.prototype=new ButtonBinding;
ControlBinding.prototype.constructor=ControlBinding;
ControlBinding.superclass=ButtonBinding.prototype;
ControlBinding.ACTION_COMMAND="controlcommand";
ControlBinding.TYPE_MINIMIZE="minimize";
ControlBinding.TYPE_MAXIMIZE="maximize";
ControlBinding.TYPE_UNMAXIMIZE="unmaximize";
ControlBinding.TYPE_UNMINIMIZE="unminimize";
ControlBinding.TYPE_CLOSE="close";
ControlBinding.TOOLTIP={"minimize":"${string:Website.App.ToolTipMinimize}","maximize":"${string:Website.App.ToolTipMaximize}","unmaximize":"${string:Website.App.ToolTipUnMaximize}","unminimize":"${string:Website.App.ToolTipUnMinimize}","close":"${string:Website.App.ToolTipClose}"};
function ControlBinding(){
this.logger=SystemLogger.getLogger("ControlBinding");
this.controlType=null;
this.commandAction=ControlBinding.ACTION_COMMAND;
this.containingControlBoxBinding=null;
this.isVisible=true;
this.isGhostable=false;
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
}
ControlBinding.prototype.toString=function(){
return "[ControlBinding]";
};
ControlBinding.prototype.onBindingAttach=function(){
this.controlType=this.getProperty("controltype");
this.setProperty("tooltip",ControlBinding.TOOLTIP[this.controlType]);
if(!this.isAttached){
if(this.controlType){
this.containingControlBoxBinding=this.getAncestorBindingByType(ControlBoxBinding);
if(this.containingControlBoxBinding){
this.containingControlBoxBinding.addActionListener(ControlBoxBinding.ACTION_STATECHANGE,this);
}
ControlBinding.superclass.onBindingAttach.call(this);
this.addEventListener(DOMEvents.MOUSEDOWN);
}else{
throw "ControlBinding: type not specified.";
}
}
};
ControlBinding.prototype.handleEvent=function(e){
ControlBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.MOUSEDOWN:
DOMEvents.stopPropagation(e);
break;
}
};
ControlBinding.prototype.setControlType=function(type){
this.controlType=type;
this.setProperty("controltype",type);
this.setToolTip(ControlBinding.TOOLTIP[type]);
};
ControlBinding.prototype.handleAction=function(_6a5){
ControlBinding.superclass.handleAction.call(this,_6a5);
switch(_6a5.type){
case ControlBoxBinding.ACTION_STATECHANGE:
this._handleStateChange();
break;
}
};
ControlBinding.prototype._handleStateChange=function(){
switch(this.containingControlBoxBinding.getState()){
case ControlBoxBinding.STATE_MAXIMIZED:
if(this.controlType==ControlBinding.TYPE_MAXIMIZE){
this.setControlType(ControlBinding.TYPE_UNMAXIMIZE);
}
if(this.controlType==ControlBinding.TYPE_UNMINIMIZE){
this.setControlType(ControlBinding.TYPE_MINIMIZE);
}
break;
case ControlBoxBinding.STATE_MINIMIZED:
if(this.controlType==ControlBinding.TYPE_MINIMIZE){
this.setControlType(ControlBinding.TYPE_UNMINIMIZE);
}
if(this.controlType==ControlBinding.TYPE_UNMAXIMIZE){
this.setControlType(ControlBinding.TYPE_MAXIMIZE);
}
break;
case ControlBoxBinding.STATE_NORMAL:
if(this.controlType==ControlBinding.TYPE_UNMAXIMIZE){
this.setControlType(ControlBinding.TYPE_MAXIMIZE);
}
if(this.controlType==ControlBinding.TYPE_UNMINIMIZE){
this.setControlType(ControlBinding.TYPE_MINIMIZE);
}
break;
}
};
ControlBinding.prototype.onMouseDown=function(){
};
ControlBinding.prototype.onMouseUp=function(){
};
ControlBoxBinding.prototype=new FlexBoxBinding;
ControlBoxBinding.prototype.constructor=ControlBoxBinding;
ControlBoxBinding.superclass=FlexBoxBinding.prototype;
ControlBoxBinding.STATE_NORMAL="normal";
ControlBoxBinding.STATE_MAXIMIZED="maximized";
ControlBoxBinding.STATE_MINIMIZED="minimized";
ControlBoxBinding.ACTION_NORMALIZE="controlbox normalizeaction";
ControlBoxBinding.ACTION_MAXIMIZE="controlbox maximizeaction";
ControlBoxBinding.ACTION_MINIMIZE="controlbox minimizeaction";
ControlBoxBinding.ACTION_STATECHANGE="controlbox statechangeacton";
function ControlBoxBinding(){
this.logger=SystemLogger.getLogger("ControlBoxBinding");
this.isNormalized=true;
this.isMaximized=false;
this.isMinimized=false;
}
ControlBoxBinding.prototype.toString=function(){
return "[ControlBoxBinding]";
};
ControlBoxBinding.prototype.onBindingAttach=function(){
ControlBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ControlBinding.ACTION_COMMAND,this);
this.attachClassName(ControlBoxBinding.STATE_NORMAL);
};
ControlBoxBinding.prototype.handleAction=function(_6a6){
ControlBoxBinding.superclass.handleAction.call(this,_6a6);
switch(_6a6.type){
case ControlBinding.ACTION_COMMAND:
var _6a7=_6a6.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a7);
Application.unlock(self);
},0);
_6a6.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a9){
switch(_6a9.controlType){
case ControlBinding.TYPE_MAXIMIZE:
this.maximize();
break;
case ControlBinding.TYPE_MINIMIZE:
this.minimize();
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
this.normalize();
break;
}
};
ControlBoxBinding.prototype.maximize=function(){
this.dispatchAction(ControlBoxBinding.ACTION_MAXIMIZE);
this.setState(ControlBoxBinding.STATE_MAXIMIZED);
this.isNormalized=false;
this.isMaximized=true;
this.isMinimized=false;
};
ControlBoxBinding.prototype.minimize=function(){
this.dispatchAction(ControlBoxBinding.ACTION_MINIMIZE);
this.setState(ControlBoxBinding.STATE_MINIMIZED);
this.isNormalized=false;
this.isMaximized=false;
this.isMinimized=true;
};
ControlBoxBinding.prototype.normalize=function(){
this.dispatchAction(ControlBoxBinding.ACTION_NORMALIZE);
this.setState(ControlBoxBinding.STATE_NORMAL);
this.isNormalized=true;
this.isMaximized=false;
this.isMinimized=false;
};
ControlBoxBinding.prototype.setState=function(_6aa){
var _6ab=this.getState();
this.setProperty("state",_6aa);
this.detachClassName(_6ab);
this.attachClassName(_6aa);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6ac=this.getProperty("state");
if(!_6ac){
_6ac=ControlBoxBinding.STATE_NORMAL;
}
return _6ac;
};
MenuContainerBinding.prototype=new Binding;
MenuContainerBinding.prototype.constructor=MenuContainerBinding;
MenuContainerBinding.superclass=Binding.prototype;
function MenuContainerBinding(){
this.logger=SystemLogger.getLogger("MenuContainerBinding");
this._isOpen=false;
this._openElement=null;
this.menuContainerBinding=null;
this.menuPopupBinding=null;
}
MenuContainerBinding.prototype.toString=function(){
return "[MenuContainerBinding]";
};
MenuContainerBinding.prototype.isOpen=function(_6ad){
var _6ae=null;
if(!_6ad){
_6ae=this._isOpen;
}else{
_6ae=(_6ad==this._openElement);
}
return _6ae;
};
MenuContainerBinding.prototype.setOpenElement=function(_6af){
if(_6af){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6af;
this._isOpen=true;
}else{
this._openElement=null;
this._isOpen=false;
}
};
MenuContainerBinding.prototype.getMenuContainerBinding=function(){
if(!this.menuContainerBinding){
this.menuContainerBinding=this.getAncestorBindingByType(MenuContainerBinding);
}
return this.menuContainerBinding;
};
MenuContainerBinding.prototype.getMenuPopupBinding=function(){
var _6b0=this.getChildBindingByLocalName("menupopup");
if(_6b0&&_6b0!=this.menuPopupBinding){
this.menuPopupBinding=_6b0;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6b1=this.getMenuContainerBinding();
_6b1.setOpenElement(this);
var _6b2=this.getMenuPopupBinding();
_6b2.snapTo(this.bindingElement);
_6b2.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6b3){
MenuContainerBinding.superclass.handleAction.call(this,_6b3);
if(_6b3.type==PopupBinding.ACTION_HIDE){
var _6b4=this.getMenuContainerBinding();
_6b4.setOpenElement(false);
this.reset();
_6b3.consume();
}
};
MenuBarBinding.prototype=new MenuContainerBinding;
MenuBarBinding.prototype.constructor=MenuBarBinding;
MenuBarBinding.superclass=MenuContainerBinding.prototype;
function MenuBarBinding(){
this.logger=SystemLogger.getLogger("MenuBarBinding");
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
MenuBarBinding.prototype.toString=function(){
return "[MenuBarBinding]";
};
MenuBarBinding.prototype.onBindingRegister=function(){
MenuBarBinding.superclass.onBindingRegister.call(this);
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
};
MenuBarBinding.prototype.handleAction=function(_6b5){
MenuBarBinding.superclass.handleAction.call(this,_6b5);
switch(_6b5.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b6=_6b5.target;
var _6b7=this.getChildBindingsByLocalName("menu");
while(_6b7.hasNext()){
var menu=_6b7.getNext();
}
switch(_6b6.arrowKey){
case KeyEventCodes.VK_LEFT:
this.logger.debug("LEFTG");
break;
case KeyEventCodes.VK_RIGHT:
this.logger.debug("RIGHT");
break;
}
break;
}
};
MenuBinding.prototype=new MenuContainerBinding;
MenuBinding.prototype.constructor=MenuBinding;
MenuBinding.superclass=MenuContainerBinding.prototype;
function MenuBinding(){
this.logger=SystemLogger.getLogger("MenuBinding");
this.labelBinding=null;
this.isFocused=false;
}
MenuBinding.prototype.toString=function(){
return "[MenuBinding]";
};
MenuBinding.prototype.onBindingAttach=function(){
MenuBinding.superclass.onBindingAttach.call(this);
this.buildDOMContent();
this.assignDOMEvents();
};
MenuBinding.prototype.buildDOMContent=function(){
var _6b9=this.getProperty("image");
var _6ba=this.getProperty("label");
var _6bb=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6ba){
this.setLabel(_6ba);
}
if(_6b9){
this.setImage(_6b9);
}
if(_6bb){
this.setToolTip(_6bb);
}
};
MenuBinding.prototype.reset=function(){
this.detachClassName("hover");
};
MenuBinding.prototype.setImage=function(url){
this.setProperty("image",url);
if(this.isAttached){
this.labelBinding.setImage(url);
}
};
MenuBinding.prototype.setLabel=function(_6bd){
this.setProperty("label",_6bd);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6bd));
}
};
MenuBinding.prototype.setToolTip=function(_6be){
this.setProperty("tooltip",_6be);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6be));
}
};
MenuBinding.prototype.getImage=function(){
return this.getProperty("image");
};
MenuBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
MenuBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
MenuBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEOVER);
this.addEventListener(DOMEvents.MOUSEOUT);
this.addEventListener(DOMEvents.MOUSEUP);
};
MenuBinding.prototype.handleEvent=function(e){
MenuBinding.superclass.handleEvent.call(this,e);
var _6c0=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6c0.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6c0.isOpen()&&!_6c0.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6c0.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6c0.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
DOMEvents.stopPropagation(e);
break;
}
}
DOMEvents.stopPropagation(e);
};
MenuBodyBinding.prototype=new Binding;
MenuBodyBinding.prototype.constructor=MenuBodyBinding;
MenuBodyBinding.superclass=Binding.prototype;
MenuBodyBinding.CLASSNAME_CHECKBOXED="checkboxed";
MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY="menubody unhandled arrowkey";
MenuBodyBinding.activeInstance=null;
MenuBodyBinding.handleBroadcast=function(_6c1,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6c1){
case BroadcastMessages.KEY_ARROW:
body.handleArrowKey(key);
break;
case BroadcastMessages.KEY_ENTER:
body.handleEnterKey();
break;
}
}
};
EventBroadcaster.subscribe(BroadcastMessages.KEY_ARROW,MenuBodyBinding);
EventBroadcaster.subscribe(BroadcastMessages.KEY_ENTER,MenuBodyBinding);
EventBroadcaster.subscribe(BroadcastMessages.KEY_ESCAPE,MenuBodyBinding);
function MenuBodyBinding(){
this.logger=SystemLogger.getLogger("MenuBodyBinding");
this._containingPopupBinding=null;
this._focused=null;
this._lastFocused=null;
this._showSubMenuTimeout=null;
this.arrowKey=null;
this.isDirty=true;
this._hasImageLayout=false;
this._hasCheckBoxLayout=false;
}
MenuBodyBinding.prototype.toString=function(){
return "[MenuBodyBinding]";
};
MenuBodyBinding.prototype.onBindingAttach=function(){
MenuBodyBinding.superclass.onBindingAttach.call(this);
this._focused={};
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEOVER);
this.addEventListener(DOMEvents.MOUSEOUT);
this.addEventListener(DOMEvents.MOUSEUP);
this.addEventListener(DOMEvents.KEYDOWN);
this.addEventListener(DOMEvents.TOUCHSTART);
var self=this;
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c6){
switch(_6c6.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c7=null;
var _6c8=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c6.consume();
break;
}
}});
this._containingPopupBinding=UserInterface.getBinding(this.bindingElement.parentNode);
this._containingPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,{handleAction:function(){
self.resetFocusedItems(true);
self.releaseKeyboard();
}});
};
MenuBodyBinding.prototype.onBindingDispose=function(){
MenuBodyBinding.superclass.onBindingDispose.call(this);
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEvent=function(e){
MenuBodyBinding.superclass.handleEvent.call(this,e);
if(e.type==DOMEvents.MOUSEOUT){
this.resetFocusedItems();
}
switch(e.type){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEUP:
case DOMEvents.TOUCHSTART:
DOMEvents.stopPropagation(e);
break;
case DOMEvents.KEYDOWN:
switch(e.keyCode){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
case KeyEventCodes.VK_LEFT:
case KeyEventCodes.VK_RIGHT:
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
this.handleArrowKey(e.keyCode);
break;
}
break;
}
};
MenuBodyBinding.prototype.handleFocusedItem=function(_6ca){
for(var key in this._focused){
if(key!=_6ca.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6ca.key]=_6ca;
this._lastFocused=_6ca;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6cd){
delete this._focused[_6cd.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6ce){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6ce);
}
if(_6ce){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6d1=this.getChildBindingsByLocalName("menugroup");
var _6d2=null;
var _6d3=null;
while(_6d1.hasNext()){
var _6d4=_6d1.getNext();
if(!_6d4.isDefaultContent){
_6d4.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6d2&&_6d4.isVisible){
_6d2=_6d4;
}
if(_6d4.isVisible){
_6d3=_6d4;
}
}
}
if(_6d2&&_6d3){
_6d2.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6d3.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6d5){
MenuBodyBinding.activeInstance=this;
if(_6d5){
var _6d6=this._getMenuItems().getFirst();
if(_6d6){
_6d6.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d7=this._lastFocused;
if((_6d7!=null)&&(!_6d7.isMenuContainer)){
_6d7.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d9=this._getMenuItems();
var _6da=null;
var next=null;
if(this._lastFocused){
_6da=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d9.getPreceding(_6da);
break;
case KeyEventCodes.VK_DOWN:
next=_6d9.getFollowing(_6da);
break;
case KeyEventCodes.VK_LEFT:
this.dispatchAction(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY);
break;
case KeyEventCodes.VK_RIGHT:
if(this._lastFocused.isMenuContainer){
this.releaseKeyboard();
this._lastFocused.show();
this._lastFocused.menuPopupBinding.grabKeyboard(true);
}else{
this.dispatchAction(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY);
}
break;
}
}else{
next=_6d9.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6dd=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6de){
_6dd=_6de.getChildBindingsByLocalName("menuitem");
_6dd.each(function(item){
list.add(item);
});
});
_6dd=this.getChildBindingsByLocalName("menuitem");
_6dd.each(function(item){
list.add(item);
});
this._menuItemsList=list;
this.isDirty=false;
}
return this._menuItemsList;
};
MenuBodyBinding.prototype.invokeCheckBoxLayout=function(){
if(!this.hasClassName(MenuBodyBinding.CLASSNAME_CHECKBOXED)){
this.attachClassName(MenuBodyBinding.CLASSNAME_CHECKBOXED);
}
};
MenuBodyBinding.prototype.invokeImageLayout=function(){
if(!this._hasImageLayout){
this.detachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this._hasImageLayout=true;
}
};
MenuBodyBinding.newInstance=function(_6e1){
var _6e2=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6e1);
return UserInterface.registerBinding(_6e2,MenuBodyBinding);
};
MenuGroupBinding.prototype=new Binding;
MenuGroupBinding.prototype.constructor=MenuGroupBinding;
MenuGroupBinding.superclass=Binding.prototype;
MenuGroupBinding.LAYOUT_DEFAULT=0;
MenuGroupBinding.LAYOUT_FIRST=1;
MenuGroupBinding.LAYOUT_LAST=2;
function MenuGroupBinding(){
this.logger=SystemLogger.getLogger("MenuGroupBinding");
this.isVisible=true;
}
MenuGroupBinding.prototype.toString=function(){
return "[MenuGroupBinding]";
};
MenuGroupBinding.prototype.setLayout=function(_6e3){
switch(_6e3){
case MenuGroupBinding.LAYOUT_DEFAULT:
this.detachClassName("first");
this.detachClassName("last");
break;
case MenuGroupBinding.LAYOUT_FIRST:
this.attachClassName("first");
break;
case MenuGroupBinding.LAYOUT_LAST:
this.attachClassName("last");
break;
}
};
MenuGroupBinding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.display="block";
this.bindingElement.style.visibility="visible";
this.isVisible=true;
}
};
MenuGroupBinding.prototype.hide=function(){
if(this.isVisible){
this.bindingElement.style.display="none";
this.bindingElement.style.visibility="hidden";
this.isVisible=false;
}
};
MenuGroupBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
MenuGroupBinding.newInstance=function(_6e4){
var _6e5=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e4);
return UserInterface.registerBinding(_6e5,MenuGroupBinding);
};
MenuItemBinding.prototype=new MenuContainerBinding;
MenuItemBinding.prototype.constructor=MenuItemBinding;
MenuItemBinding.superclass=MenuContainerBinding.prototype;
MenuItemBinding.ACTION_COMMAND="menuitemcommand";
MenuItemBinding.TYPE_CHECKBOX="checkbox";
MenuItemBinding.TYPE_MENUCONTAINER="menucontainer";
MenuItemBinding.CLASSNAME_CHECKBOX="checkboxindicator";
MenuItemBinding.CLASSNAME_SUBMENU="submenuindicator";
MenuItemBinding.CLASSNAME_HOVER="hover";
MenuItemBinding.CHAR_CHECKBOX="V";
MenuItemBinding.CHAR_SUBMENU=String.fromCharCode(9658);
MenuItemBinding.TIMEOUT=150;
function MenuItemBinding(){
this.logger=SystemLogger.getLogger("MenuItemBinding");
this.type=null;
this.oncommand=null;
this.isDisabled=false;
this.labelBinding=null;
this.image=null;
this.imageHover=null;
this.imageActive=null;
this.imageDisabled=null;
this.imageProfile=null;
this.isMenuContainer=false;
this.isTypeSet=false;
this.isChecked=false;
this.isFocused=false;
this._containingMenuBodyBinding=null;
}
MenuItemBinding.prototype.toString=function(){
return "[MenuItemBinding]";
};
MenuItemBinding.prototype.onBindingRegister=function(){
MenuItemBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["isdisabled"]=this.setDisabled;
if(this.type){
this.setProperty("type",this.type);
}
};
MenuItemBinding.prototype.onBindingAttach=function(){
MenuItemBinding.superclass.onBindingAttach.call(this);
this._containingMenuBodyBinding=this.getAncestorBindingByLocalName("menubody");
this._containingMenuBodyBinding.isDirty=true;
this.parseDOMProperties();
this.buildDOMContent();
this.assignDOMEvents();
this.dispatchAction(Binding.ACTION_ATTACHED);
};
MenuItemBinding.prototype.parseDOMProperties=function(){
var _6e6=this.getProperty("image");
var _6e7=this.getProperty("image-hover");
var _6e8=this.getProperty("image-active");
var _6e9=this.getProperty("image-disabled");
if(!this.image&&_6e6){
this.image=_6e6;
}
if(!this.imageHover&&_6e7){
this.imageHover=_6e6;
}
if(!this.imageActive&&_6e8){
this.imageActive=_6e8;
}
if(!this.imageDisabled&&_6e9){
this.imageDisabled=_6e9;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6ea=this.getProperty("label");
var _6eb=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6ed=this.getProperty("isdisabled");
var _6ee=this.getProperty("image");
var _6ef=this.getProperty("image-hover");
var _6f0=this.getProperty("image-active");
var _6f1=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6f2=this.getMenuPopupBinding();
if(_6f2){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6ee){
this.image=_6ee;
}
if(!this.imageHover&&_6ef){
this.imageHover=_6ee;
}
if(!this.imageActive&&_6f0){
this.imageActive=_6f0;
}
if(!this.imageDisabled&&_6f1){
this.imageDisabled=_6f1;
}
if(this.image||this.imageHover||this.imageActive||this.imageDisabled){
this.imageProfile=new ImageProfile(this);
}
}
if(this.imageProfile){
this.setImage(this.imageProfile.getDefaultImage());
}else{
this.setImage(null);
}
if(_6ea!=null){
this.setLabel(_6ea);
}
if(_6eb){
this.setToolTip(_6eb);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6ed==true){
this.disable();
}
var _6f3=this.getProperty("oncommand");
if(_6f3){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6f3);
};
}
}
};
MenuItemBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEOVER);
this.addEventListener(DOMEvents.MOUSEUP);
};
MenuItemBinding.prototype.handleEvent=function(e){
MenuItemBinding.superclass.handleEvent.call(this,e);
if(!this.isDisabled&&!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEOVER:
this.focus(e);
break;
case DOMEvents.MOUSEUP:
DOMEvents.stopPropagation(e);
if(!this.isMenuContainer){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.setChecked(!this.isChecked);
}else{
this.fireCommand();
}
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,this);
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEUP,this);
}
break;
}
}
};
MenuItemBinding.prototype.fireCommand=function(){
if(!this.isMenuContainer){
if(this.oncommand){
this.oncommand();
}
this.dispatchAction(MenuItemBinding.ACTION_COMMAND);
}
};
MenuItemBinding.prototype.setImage=function(url){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setProperty("image",url);
if(this.isAttached){
this.labelBinding.setImage(url);
}
};
MenuItemBinding.prototype.setLabel=function(_6f6){
this.setProperty("label",_6f6);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f6));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f7){
this.setProperty("tooltip",_6f7);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f7));
}
};
MenuItemBinding.prototype.reset=function(){
if(this.labelBinding.hasClassName("hover")){
this.labelBinding.detachClassName("hover");
}
};
MenuItemBinding.prototype.setType=function(type){
if(this.isAttached){
if(!this.isTypeSet){
switch(type){
case MenuItemBinding.TYPE_CHECKBOX:
if(!this.isMenuContainer){
this._containingMenuBodyBinding.invokeCheckBoxLayout();
var _6f9=this.bindingDocument.createElement("div");
_6f9.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f9.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6fa=this.labelBinding.bindingElement;
_6fa.insertBefore(_6f9,_6fa.firstChild);
_6f9.style.display="none";
this.shadowTree.checkBoxIndicator=_6f9;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f9=this.bindingDocument.createElement("div");
_6f9.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f9.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6fa=this.labelBinding.bindingElement;
_6fa.insertBefore(_6f9,_6fa.firstChild);
break;
}
this.type=type;
this.isTypeSet=true;
}else{
throw new Error("MenuItemBinding: Cannot set type twice.");
}
}
this.setProperty("type",type);
};
MenuItemBinding.prototype.getImage=function(){
return this.getProperty("image");
};
MenuItemBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
MenuItemBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
MenuItemBinding.prototype.disable=function(){
this.setDisabled(true);
};
MenuItemBinding.prototype.enable=function(){
this.setDisabled(false);
};
MenuItemBinding.prototype.setDisabled=function(bool){
this.isDisabled=bool;
if(this.isDisabled){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
if(this.isAttached){
if(this.isDisabled){
this.labelBinding.detachClassName("hover");
this.attachClassName("isdisabled");
if(this.imageProfile){
var _6fc=this.imageProfile.getDisabledImage();
if(_6fc){
this.setImage(_6fc);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6fc=this.imageProfile.getDefaultImage();
if(_6fc){
this.setImage(_6fc);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6fe=this.getMenuContainerBinding();
if(_6fe.isOpen()&&!_6fe.isOpen(this)){
_6fe._openElement.hide();
_6fe.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6fe=this.getMenuContainerBinding();
if(!_6fe.isOpen(this)){
var self=this;
this._showSubMenuTimeout=window.setTimeout(function(){
self.show();
self._showSubMenuTimeout=null;
},MenuItemBinding.TIMEOUT);
}
}
if(!e||e.type!=DOMEvents.MOUSEOVER){
if(this.bindingElement.tabIndex!=-1){
if(Client.isMozilla){
FocusBinding.focusElement(this.bindingElement);
}else{
var self=this;
setTimeout(function(){
FocusBinding.focusElement(self.bindingElement);
},0);
}
}
}
this.isFocused=true;
this._containingMenuBodyBinding.handleFocusedItem(this);
};
MenuItemBinding.prototype.blur=function(_700){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _701=this.getMenuContainerBinding();
if(!_701||!_701.isOpen(this)||_700){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_702){
this.setChecked(true,_702);
};
MenuItemBinding.prototype.uncheck=function(_703){
this.setChecked(false,_703);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_704,_705){
this.setProperty("ischecked",_704);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_704){
this.isChecked=_704;
this.shadowTree.checkBoxIndicator.style.display=_704?"block":"none";
if(!_705){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_706){
var _707=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_706);
UserInterface.registerBinding(_707,MenuItemBinding);
return UserInterface.getBinding(_707);
};
PopupSetBinding.prototype=new MenuContainerBinding;
PopupSetBinding.prototype.constructor=PopupSetBinding;
PopupSetBinding.superclass=MenuContainerBinding.prototype;
function PopupSetBinding(){
this.logger=SystemLogger.getLogger("PopupSetBinding");
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
PopupSetBinding.prototype.toString=function(){
return "[PopupSetBinding]";
};
PopupSetBinding.newInstance=function(_708){
var _709=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_708);
return UserInterface.registerBinding(_709,PopupSetBinding);
};
PopupBinding.prototype=new Binding;
PopupBinding.prototype.constructor=PopupBinding;
PopupBinding.superclass=Binding.prototype;
PopupBinding.ACTION_SHOW="popupshow";
PopupBinding.ACTION_HIDE="popuphide";
PopupBinding.POSITION_TOP="top";
PopupBinding.POSITION_RIGHT="right";
PopupBinding.POSITION_BOTTOM="bottom";
PopupBinding.POSITION_LEFT="left";
PopupBinding.TYPE_NORMAL="normal";
PopupBinding.TYPE_FIXED="fixed";
PopupBinding.FIXED_MAX=12;
PopupBinding.CLASSNAME_OVERFLOW="overflow";
PopupBinding.activeInstances=new Map();
PopupBinding.hasActiveInstances=function(){
return PopupBinding.activeInstances.hasEntries();
};
PopupBinding.handleBroadcast=function(_70a,arg){
switch(_70a){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _70e=PopupBinding.activeInstances.get(key);
var _70f=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_70e);
if(!_70f){
list.add(_70e);
}
});
list.each(function(_710){
_710.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _712=PopupBinding.activeInstances.get(key);
_712.hide();
});
}
break;
}
};
EventBroadcaster.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,PopupBinding);
EventBroadcaster.subscribe(BroadcastMessages.TOUCHEVENT_TOUCHSTART,PopupBinding);
EventBroadcaster.subscribe(BroadcastMessages.KEY_ESCAPE,PopupBinding);
function PopupBinding(){
this.logger=SystemLogger.getLogger("PopupBinding");
this._bodyBinding=null;
this.position=null;
this.isVisible=false;
this.onshow=null;
this.onhide=null;
this.geometry=null;
this._menuItems=null;
this._menuGroups=null;
this._menuItemCount=0;
this.type=PopupBinding.TYPE_NORMAL;
this._isOverflow=false;
return this;
}
PopupBinding.prototype.toString=function(){
return "[PopupBinding]";
};
PopupBinding.prototype.onBindingAttach=function(){
PopupBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_ATTACHED);
this.geometry={x:0,y:0,w:0,h:0};
this.buildDOMContent();
this.parseDOMProperties();
this.assignDOMEvents();
};
PopupBinding.prototype.onBindingDispose=function(){
PopupBinding.superclass.onBindingDispose.call(this);
if(PopupBinding.activeInstances.has(this.key)){
PopupBinding.activeInstances.del(this.key);
}
};
PopupBinding.prototype.buildDOMContent=function(){
var _713=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _714=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_713){
this._bodyBinding=UserInterface.getBinding(_713);
}else{
if(_714){
this._bodyBinding=UserInterface.getBinding(_714);
}else{
if(this.bindingElement.childElementCount>0){
throw new Error(this+": DOM structure invalid.");
}else{
this._bodyBinding=this.add(MenuBodyBinding.newInstance(this.bindingDocument)).attach();
}
}
}
};
PopupBinding.prototype.parseDOMProperties=function(){
if(!this.position){
var _715=this.getProperty("position");
this.position=_715?_715:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_716){
var _717=null;
if(this._bodyBinding){
this._bodyBinding.add(_716);
_717=_716;
}else{
_717=PopupBinding.superclass.add.call(this,_716);
}
return _717;
};
PopupBinding.prototype.addFirst=function(_718){
var _719=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_718);
_719=_718;
}else{
_719=PopupBinding.superclass.addFirst.call(this,_718);
}
return _719;
};
PopupBinding.prototype.handleAction=function(_71a){
PopupBinding.superclass.handleAction.call(this,_71a);
var _71b=_71a.target;
switch(_71a.type){
case Binding.ACTION_ATTACHED:
if(_71b instanceof MenuItemBinding){
this._count(true);
_71a.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_71b instanceof MenuItemBinding){
this._count(false);
_71a.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_71c){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_71c?1:-1);
if(!this._isOverflow){
if(this._menuItemCount>=PopupBinding.FIXED_MAX){
this.bindingElement.style.height="";
this.attachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=true;
}
}else{
if(this._menuItemCount<PopupBinding.FIXED_MAX){
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
}
}
}
};
PopupBinding.prototype.snapTo=function(_71d){
var _71e=this._getElementPosition(_71d);
switch(this.position){
case PopupBinding.POSITION_TOP:
_71e.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_71e.x+=_71d.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_71e.y+=_71d.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_71e.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_71d;
this.bindingElement.style.display="block";
this.setPosition(_71e.x,_71e.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_720){
this.bindingElement.style.display="block";
this.setPosition(_720.x,_720.y);
this.show();
};
PopupBinding.prototype.setPosition=function(x,y){
this.geometry.x=x;
this.geometry.y=y;
this.bindingElement.style.left=this.geometry.x+"px";
this.bindingElement.style.top=this.geometry.y+"px";
};
PopupBinding.prototype.getPosition=function(x,y){
return new Point(this.geometry.x,this.geometry.y);
};
PopupBinding.prototype.getDimension=function(){
return new Dimension(this.bindingElement.offsetWidth,this.bindingElement.offsetHeight);
};
PopupBinding.prototype._getElementPosition=function(_725){
return _725.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_725):DOMUtil.getUniversalPosition(_725);
};
PopupBinding.prototype._getMousePosition=function(e){
var _727=DOMEvents.getTarget(e);
return _727.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
};
PopupBinding.prototype.show=function(){
if(this.isVisible==true){
this.hide();
}
if(!this.isVisible){
PopupBinding.activeInstances.set(this.key,this);
this.bindingElement.style.display="block";
this.dispatchAction(PopupBinding.ACTION_SHOW);
this.fitOnScreen();
this._makeVisible(true);
if(this._bodyBinding instanceof MenuBodyBinding){
this._bodyBinding.refreshMenuGroups();
}
this._enableTab(true);
}
};
PopupBinding.prototype._makeVisible=function(_728){
var _729=this.bindingElement;
if(_728){
_729.style.visibility="visible";
}else{
_729.style.visibility="hidden";
_729.style.display="none";
}
this.isVisible=_728;
};
PopupBinding.prototype._enableTab=function(_72a){
var self=this;
var _72c=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_72c.each(function(_72d){
_72d.bindingElement.tabIndex=_72a?0:-1;
});
}
},0);
};
PopupBinding.prototype.hide=function(){
this.releaseKeyboard();
if(this.isVisible){
this._makeVisible(false);
this.targetElement=null;
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
this.dispatchAction(PopupBinding.ACTION_HIDE);
this._enableTab(false);
var self=this;
setTimeout(function(){
if(!self.isVisible){
PopupBinding.activeInstances.del(self.key);
}
},0);
}
};
PopupBinding.prototype.fitOnScreen=function(){
var x=this.bindingElement.offsetLeft;
var y=this.bindingElement.offsetTop;
var w=this.bindingElement.offsetWidth;
var h=this.bindingElement.offsetHeight;
var dim=this.bindingWindow.WindowManager.getWindowDimensions();
var pos=this.boxObject.getGlobalPosition();
if(this.targetElement!=null){
if(pos.y+h>=dim.h){
switch(CSSComputer.getPosition(this.bindingElement.offsetParent)){
case "absolute":
y=y-h-this.targetElement.offsetHeight;
if(y<0){
y=0;
}
break;
case "relative":
y=y-h+this.targetElement.offsetHeight+9;
var _735=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_735.y<0){
y=-_735.y;
}
break;
}
}
if(pos.x+w>=dim.w){
x-=w;
switch(this.position){
case PopupBinding.POSITION_RIGHT:
x-=this.targetElement.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
x+=this.targetElement.offsetWidth;
break;
}
}
}else{
if(pos.y+h>=dim.h){
y-=h;
if(y<0){
y=0;
}
}
if(pos.x+w>=dim.w){
x-=w;
if(x<0){
x=0;
}
}
}
this.setPosition(x,y);
};
PopupBinding.prototype.handleEvent=function(e){
PopupBinding.superclass.handleEvent.call(this,e);
DOMEvents.stopPropagation(e);
};
PopupBinding.prototype.empty=function(){
this._bodyBinding.detachRecursive();
this._bodyBinding.bindingElement.innerHTML="";
};
PopupBinding.prototype.grabKeyboard=function(_737){
};
PopupBinding.prototype.releaseKeyboard=function(){
if(this._bodyBinding!=null&&this._bodyBinding instanceof MenuBodyBinding){
this._bodyBinding.releaseKeyboard();
}
};
PopupBinding.prototype._indexMenuContent=function(){
this._menuItems={};
this._menuGroups={};
var list=this.getDescendantBindingsByLocalName("menugroup");
while(list.hasNext()){
var item=list.getNext();
var rel=item.getProperty("rel");
if(rel){
if(!this._menuGroups[rel]){
this._menuGroups[rel]=new List();
}
this._menuGroups[rel].add(item);
}
}
list=this.getDescendantBindingsByLocalName("menuitem");
while(list.hasNext()){
var item=list.getNext();
var cmd=item.getProperty("cmd");
this._menuItems[cmd]=item;
}
};
PopupBinding.prototype.getMenuItemForCommand=function(cmd){
var _73d=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_73d=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _73d;
};
PopupBinding.prototype.clear=function(){
var _73e=this._bodyBinding;
if(_73e){
_73e.detachRecursive();
_73e.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_73f){
var _740=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_73f);
return UserInterface.registerBinding(_740,PopupBinding);
};
PopupBodyBinding.prototype=new Binding;
PopupBodyBinding.prototype.constructor=PopupBodyBinding;
PopupBodyBinding.superclass=Binding.prototype;
function PopupBodyBinding(){
this.logger=SystemLogger.getLogger("PopupBodyBinding");
}
PopupBodyBinding.prototype.toString=function(){
return "[PopupBodyBinding]";
};
PopupBodyBinding.prototype.setDimension=function(dim){
this.getBindingElement().style.width=new String(dim.w)+"px";
};
PopupBodyBinding.newInstance=function(_742){
var _743=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_742);
return UserInterface.registerBinding(_743,PopupBodyBinding);
};
MenuPopupBinding.prototype=new PopupBinding;
MenuPopupBinding.prototype.constructor=MenuPopupBinding;
MenuPopupBinding.superclass=PopupBinding.prototype;
function MenuPopupBinding(){
this.logger=SystemLogger.getLogger("MenuPopupBinding");
return this;
}
MenuPopupBinding.prototype.toString=function(){
return "[MenuPopupBinding]";
};
MenuPopupBinding.prototype._getElementPosition=function(_744){
return new Point(_744.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_745){
var _746=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_745);
return UserInterface.registerBinding(_746,MenuPopupBinding);
};
DialogBinding.prototype=new ControlBoxBinding;
DialogBinding.prototype.constructor=DialogBinding;
DialogBinding.superclass=ControlBoxBinding.prototype;
DialogBinding.MODE_DRAGGING="dialogdragging";
DialogBinding.MODE_RESIZING="dialogresizing";
DialogBinding.ACTION_OPEN="dialogopen";
DialogBinding.ACTION_CLOSE="dialogclose";
DialogBinding.DEFAULT_WIDTH=540;
DialogBinding.DEFAULT_HEIGHT=100;
function DialogBinding(){
this.logger=SystemLogger.getLogger("DialogBinding");
this.isFlexible=false;
this._head=null;
this._body=null;
this._cover=null;
this._titlebar=null;
this._border=null;
this.startPoint=null;
this.geometry=null;
this.isActive=false;
this.isActivatable=false;
this.isVisible=false;
this._isResizable=true;
this.isDialogResizable=true;
this.isModal=false;
this.mode=null;
this.controlBindings={};
this._index=null;
this._hasTransitions=false;
return this;
}
DialogBinding.prototype.toString=function(){
return "[DialogBinding]";
};
DialogBinding.prototype.onBindingRegister=function(){
DialogBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_DRAG,this);
this.addActionListener(FocusBinding.ACTION_ACTIVATED);
this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
this.buildDescendantBindings();
};
DialogBinding.prototype.onBindingAttach=function(){
DialogBinding.superclass.onBindingAttach.call(this);
this.geometry=this.computeDefaultGeometry();
this.parseDOMProperties();
this.buildControlBindings();
this.buildBorderBindings();
this.attachRecursive();
if(this._isResizable){
this.attachClassName("resizable");
}
if(this._hasTransitions){
this.bindingElement.style.opacity="0";
}
this.setPosition(new Point(0,0));
this.setDimension(new Dimension(DialogBinding.DEFAULT_WIDTH,DialogBinding.DEFAULT_HEIGHT));
if(this.getProperty("open")){
this.open();
}
};
DialogBinding.prototype.buildDescendantBindings=function(){
this._head=DialogHeadBinding.newInstance(this.bindingDocument);
this._titlebar=DialogTitleBarBinding.newInstance(this.bindingDocument);
this.addFirst(this._head);
this._head.add(this._titlebar);
var _747=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_747){
this._body=UserInterface.getBinding(_747);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _748=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_748.hasNext()){
var _749=DialogBorderBinding.newInstance(this.bindingDocument);
_749.setType(_748.getNext());
this.add(_749);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _74a=this.getProperty("controls");
if(_74a){
var _74b=new List(_74a.split(" "));
while(_74b.hasNext()){
var type=_74b.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _74d=DialogControlBinding.newInstance(this.bindingDocument);
_74d.setControlType(type);
this._titlebar.addControl(_74d);
this.controlBindings[type]=_74d;
break;
default:
throw new Error("DialogBinding: Control not added: "+type);
break;
}
}
}
};
DialogBinding.prototype.buildDialogCoverBinding=function(){
this._cover=DialogCoverBinding.newInstance(this.bindingDocument);
this.getAncestorBindingByLocalName("dialogset").add(this._cover);
this._cover.cover(this);
};
DialogBinding.prototype.parseDOMProperties=function(){
var _74e=this.getProperty("image");
var _74f=this.getProperty("label");
var _750=this.getProperty("draggable");
var _751=this.getProperty("resizable");
var _752=this.getProperty("modal");
if(_74e){
this.setImage(_74e);
}
if(_74f){
this.setLabel(_74f);
}
if(_750==false){
this.isDialogDraggable=false;
}
if(_751==false){
this.isPanelResizable=false;
}
if(_752==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_753){
this.isModal=_753;
};
DialogBinding.prototype.setLabel=function(_754){
this.setProperty("label",_754);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_754));
}
};
DialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DialogBinding.prototype.setImage=function(url){
this.setProperty("image",url);
if(this.isAttached){
this._titlebar.setImage(Resolver.resolve(url));
}
};
DialogBinding.prototype.handleAction=function(_756){
DialogBinding.superclass.handleAction.call(this,_756);
switch(_756.type){
case Binding.ACTION_DRAG:
var _757=_756.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_757.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_757.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_757;
_757.dragger.registerHandler(this);
}
break;
}
}
_756.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_756.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_758,arg){
DialogBinding.superclass.handleBroadcast.call(this,_758,arg);
switch(_758){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_75a){
DialogBinding.superclass.handleInvokedControl.call(this,_75a);
switch(_75a.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_75b){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_75b){
}else{
this.centerOnScreen();
this.reflex(true);
}
this.bindingElement.style.marginTop="0";
this.dispatchAction(DialogBinding.ACTION_OPEN);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
if(this._hasTransitions){
this.bindingElement.style.opacity="1";
}
}
};
DialogBinding.prototype.close=function(){
if(this.isVisible){
this.isActivatable=false;
this.deActivate();
var self=this;
function doit(){
self.isVisible=false;
self.deleteProperty("open");
self.bindingElement.style.marginTop="-10000px";
self.dispatchAction(DialogBinding.ACTION_CLOSE);
}
if(!this._hasTransitions){
setTimeout(function(){
doit();
},0);
}else{
var _75d=self.bindingElement;
setTimeout(function(){
_75d.style.opacity="0";
setTimeout(function(){
doit();
},Animation.DEFAULT_TIME);
},Animation.DEFAULT_TIME);
}
}
};
DialogBinding.prototype.activate=function(){
if(!this.isActive){
this.isActive=true;
this.attachClassName("active");
this.moveToTop();
this._titlebar.onActivate();
Application.activate(this);
}
};
DialogBinding.prototype.deActivate=function(){
if(this.isActive==true){
this.isActive=false;
this.detachClassName("active");
this._titlebar.onDeactivate();
Application.deActivate(this);
}
};
DialogBinding.prototype.moveToTop=function(){
this.dispatchAction(Binding.ACTION_MOVETOTOP);
this.dispatchAction(Binding.ACTION_MOVEDONTOP);
};
DialogBinding.prototype.getZIndex=function(){
return CSSComputer.getZIndex(this.bindingElement);
};
DialogBinding.prototype.setZIndex=function(_75e){
this.bindingElement.style.zIndex=new String(_75e);
};
DialogBinding.prototype.onDragStart=function(_75f){
switch(this.mode){
case DialogBinding.MODE_DRAGGING:
case DialogBinding.MODE_RESIZING:
this.startPoint=new Point(this.bindingElement.offsetLeft,this.bindingElement.offsetTop);
this.startDimension=new Dimension(this.bindingElement.offsetWidth,this.bindingElement.offsetHeight);
break;
}
};
DialogBinding.prototype.onDrag=function(diff){
switch(this.mode){
case DialogBinding.MODE_DRAGGING:
this._setComputedPosition(diff);
break;
case DialogBinding.MODE_RESIZING:
switch(this._border.getType()){
case DialogBorderBinding.TYPE_NORTH:
this.resizeNorth(diff);
break;
case DialogBorderBinding.TYPE_SOUTH:
this.resizeSouth(diff);
break;
case DialogBorderBinding.TYPE_EAST:
this.resizeEast(diff);
break;
case DialogBorderBinding.TYPE_WEST:
this.resizeWest(diff);
break;
}
this.reflex(true);
break;
}
};
DialogBinding.prototype.onDragStop=function(diff){
switch(this.mode){
case DialogBinding.MODE_DRAGGING:
this._setComputedPosition(diff);
break;
case DialogBinding.MODE_RESIZING:
break;
}
this.mode=null;
};
DialogBinding.prototype.resizeNorth=function(diff){
this.setPosition(new Point(this.startPoint.x,this.startPoint.y+diff.y));
this.setDimension(new Dimension(this.startDimension.w,this.startDimension.h-diff.y));
};
DialogBinding.prototype.resizeSouth=function(diff){
this.setDimension(new Dimension(this.startDimension.w,this.startDimension.h+diff.y));
};
DialogBinding.prototype.resizeEast=function(diff){
this.setDimension(new Dimension(this.startDimension.w+diff.x,this.startDimension.h));
};
DialogBinding.prototype.resizeWest=function(diff){
this.setPosition(new Point(this.startPoint.x+diff.x,this.startPoint.y));
this.setDimension(new Dimension(this.startDimension.w-diff.x,this.startDimension.h));
};
DialogBinding.prototype._setComputedPosition=function(diff){
var win=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
var x=this.startPoint.x+diff.x;
var y=this.startPoint.y+diff.y;
x=x<0?0:x+dim.w>win.w?win.w-dim.w:x;
y=y<0?0:y+dim.h>win.h?win.h-dim.h:y;
this.setPosition(new Point(x,y));
};
DialogBinding.prototype.setPosition=function(p){
var x=p.x;
var y=p.y;
x=Math.round(x);
this.bindingElement.style.left=x+"px";
this.geometry.x=x;
y=Math.round(y);
this.bindingElement.style.top=y+"px";
this.geometry.y=y;
};
DialogBinding.prototype.getPosition=function(){
return new Point(this.geometry.x,this.geometry.y);
};
DialogBinding.prototype.setDimension=function(dim){
if(!dim){
SystemDebug.stack(arguments);
}
var w=dim.w;
var h=dim.h;
w=Math.round(w);
this.bindingElement.style.width=w+"px";
this.geometry.w=w;
h=Math.round(h);
this.bindingElement.style.height=h+"px";
this.geometry.h=h;
};
DialogBinding.prototype.getDimension=function(){
return new Dimension(this.geometry.w,this.geometry.h);
};
DialogBinding.prototype.setResizable=function(_771){
if(this._isResizable!=_771){
if(_771){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_771;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _772=null;
var _773=this.bindingDocument.body.offsetWidth;
var _774=this.bindingDocument.body.offsetHeight;
_772={x:0.125*_773,y:0.125*_774,w:0.75*_773,h:0.5*_774};
return _772;
};
DialogBinding.prototype.centerOnScreen=function(){
var _775=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_775.w-dim.w),0.5*(_775.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _777=this;
var i=0;
function blink(){
if(i%2==0){
_777.detachClassName("active");
}else{
_777.attachClassName("active");
}
if(i++<7){
setTimeout(blink,50);
}
}
blink();
};
DialogBinding.prototype.setControls=function(list){
for(var type in this.controlBindings){
this.controlBindings[type].dispose();
}
var _77b="";
while(list.hasNext()){
var type=list.getNext();
_77b+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_77b);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_77c){
var _77d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_77c);
return UserInterface.registerBinding(_77d,DialogBinding);
};
DialogHeadBinding.prototype=new Binding;
DialogHeadBinding.prototype.constructor=DialogHeadBinding;
DialogHeadBinding.superclass=Binding.prototype;
function DialogHeadBinding(){
this.logger=SystemLogger.getLogger("DialogHeadBinding");
}
DialogHeadBinding.prototype.toString=function(){
return "[DialogHeadBinding]";
};
DialogHeadBinding.newInstance=function(_77e){
var _77f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_77e);
return UserInterface.registerBinding(_77f,DialogHeadBinding);
};
DialogBodyBinding.prototype=new FlexBoxBinding;
DialogBodyBinding.prototype.constructor=DialogBodyBinding;
DialogBodyBinding.superclass=FlexBoxBinding.prototype;
function DialogBodyBinding(){
this.logger=SystemLogger.getLogger("DialogBodyBinding");
this.panelBinding=null;
this.isVisible=true;
this._dialogBinding=null;
}
DialogBodyBinding.prototype.toString=function(){
return "[DialogBodyBinding]";
};
DialogBodyBinding.prototype.onBindingAttach=function(){
DialogBodyBinding.superclass.onBindingAttach.call(this);
this._dialogBinding=UserInterface.getBinding(this.bindingElement.parentNode);
};
DialogBodyBinding.prototype.getPosition=function(){
var pos=this._dialogBinding.getPosition();
return new Position(pos.x+this.offsetLeft+DialogBorderBinding.DIMENSION,pos.y+this.offsetTop);
};
DialogBodyBinding.prototype.getDimension=function(){
var dim=this.boxObject.getDimension();
return new Dimension(dim.w-2*DialogBorderBinding.DIMENSION,dim.h-DialogBorderBinding.DIMENSION);
};
DialogBodyBinding.newInstance=function(_782){
var _783=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_782);
return UserInterface.registerBinding(_783,DialogBodyBinding);
};
DialogSetBinding.prototype=new Binding;
DialogSetBinding.prototype.constructor=DialogSetBinding;
DialogSetBinding.superclass=Binding.prototype;
function DialogSetBinding(){
this.logger=SystemLogger.getLogger("DialogSetBinding");
}
DialogSetBinding.prototype.toString=function(){
return "[DialogSetBinding]";
};
DialogSetBinding.prototype.onBindingAttach=function(){
DialogSetBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_MOVETOTOP,this);
this.addActionListener(Binding.ACTION_MOVEDONTOP,this);
};
DialogSetBinding.prototype.handleAction=function(_784){
DialogSetBinding.superclass.handleAction.call(this,_784);
var _785=_784.target;
switch(_784.type){
case Binding.ACTION_MOVETOTOP:
if(_785 instanceof DialogBinding){
this._moveToTop(_785);
}
break;
case Binding.ACTION_MOVEDONTOP:
_784.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_786){
var _787=0;
var _788=this.getChildBindingsByLocalName("dialog");
_788.each(function(_789){
var _78a=_789.getZIndex();
_787=_78a>_787?_78a:_787;
});
_786.setZIndex(_787+2);
};
DialogBorderBinding.prototype=new Binding;
DialogBorderBinding.prototype.constructor=DialogBorderBinding;
DialogBorderBinding.superclass=Binding.prototype;
DialogBorderBinding.TYPE_NORTH="n";
DialogBorderBinding.TYPE_SOUTH="s";
DialogBorderBinding.TYPE_EAST="e";
DialogBorderBinding.TYPE_WEST="w";
DialogBorderBinding.DIMENSION=4;
function DialogBorderBinding(){
this.logger=SystemLogger.getLogger("DialogBorderBinding");
this.isDraggable=true;
this._type=null;
}
DialogBorderBinding.prototype.toString=function(){
return "[DialogBorderBinding]";
};
DialogBorderBinding.prototype.setType=function(type){
this.attachClassName(type);
this._type=type;
};
DialogBorderBinding.prototype.getType=function(){
return this._type;
};
DialogBorderBinding.newInstance=function(_78c){
var _78d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_78c);
return UserInterface.registerBinding(_78d,DialogBorderBinding);
};
DialogCoverBinding.prototype=new Binding;
DialogCoverBinding.prototype.constructor=DialogCoverBinding;
DialogCoverBinding.superclass=Binding.prototype;
function DialogCoverBinding(){
this.logger=SystemLogger.getLogger("DialogCoverBinding");
this._dialogBinding=null;
}
DialogCoverBinding.prototype.toString=function(){
return "[DialogCoverBinding]";
};
DialogCoverBinding.prototype.cover=function(_78e){
this._dialogBinding=_78e;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_790){
DialogCoverBinding.superclass.handleAction.call(this,_790);
var _791=_790.target;
if(this._dialogBinding.isModal){
switch(_790.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_791==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_791.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_792,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_792,arg);
switch(_792){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this._max();
break;
}
};
DialogCoverBinding.prototype._max=function(){
var dim=this.bindingWindow.WindowManager.getWindowDimensions();
this.bindingElement.style.width=dim.w+"px";
this.bindingElement.style.height=dim.h+"px";
};
DialogCoverBinding.prototype.show=function(){
this._max();
var _795=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_795);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _796=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_796);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_797){
var _798=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_797);
return UserInterface.registerBinding(_798,DialogCoverBinding);
};
DialogTitleBarBinding.prototype=new Binding;
DialogTitleBarBinding.prototype.constructor=DialogTitleBarBinding;
DialogTitleBarBinding.superclass=Binding.prototype;
function DialogTitleBarBinding(){
this.logger=SystemLogger.getLogger("DialogTitleBarBinding");
this.bodyBinding=null;
this.labelBinding=null;
this._controlGroupBinding=null;
this.isDraggable=true;
}
DialogTitleBarBinding.prototype.toString=function(){
return "[DialogTitleBarBinding]";
};
DialogTitleBarBinding.prototype.onBindingRegister=function(){
DialogTitleBarBinding.superclass.onBindingRegister.call(this);
this.bodyBinding=this.add(DialogTitleBarBodyBinding.newInstance(this.bindingDocument));
this.labelBinding=this.bodyBinding.add(LabelBinding.newInstance(this.bindingDocument));
this.labelBinding.attachClassName("dialogtitle");
};
DialogTitleBarBinding.prototype.onBindingAttach=function(){
DialogTitleBarBinding.superclass.onBindingAttach.call(this);
var _799=this.getProperty("image");
if(_799){
this.setImage(_799);
}
var _79a=this.getProperty("label");
if(_79a){
this.setLabel(_79a);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_79b){
if(this.isAttached){
this.labelBinding.setLabel(_79b);
}
this.setProperty("label",_79b);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_79d){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_79d);
};
DialogTitleBarBinding.prototype.onActivate=function(){
if(this._controlGroupBinding){
this._controlGroupBinding.onActivate();
}
};
DialogTitleBarBinding.prototype.onDeactivate=function(){
if(this._controlGroupBinding){
this._controlGroupBinding.onDeactivate();
}
};
DialogTitleBarBinding.newInstance=function(_79e){
var _79f=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_79e);
return UserInterface.registerBinding(_79f,DialogTitleBarBinding);
};
DialogTitleBarBodyBinding.prototype=new Binding;
DialogTitleBarBodyBinding.prototype.constructor=DialogTitleBarBodyBinding;
DialogTitleBarBodyBinding.superclass=Binding.prototype;
function DialogTitleBarBodyBinding(){
this.logger=SystemLogger.getLogger("DialogTitleBarBodyBinding");
}
DialogTitleBarBodyBinding.prototype.toString=function(){
return "[DialogTitleBarBodyBinding]";
};
DialogTitleBarBodyBinding.prototype.onBindingRegister=function(){
DialogTitleBarBodyBinding.superclass.onBindingRegister.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
};
DialogTitleBarBodyBinding.newInstance=function(_7a0){
var _7a1=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7a0);
return UserInterface.registerBinding(_7a1,DialogTitleBarBodyBinding);
};
DialogControlBinding.prototype=new ControlBinding;
DialogControlBinding.prototype.constructor=DialogControlBinding;
DialogControlBinding.superclass=ControlBinding.prototype;
DialogControlBinding.CLASSNAME="dialogcontrol";
function DialogControlBinding(){
this.logger=SystemLogger.getLogger("DialogControlBinding");
this.isGhostable=true;
}
DialogControlBinding.prototype.toString=function(){
return "[DialogControlBinding]";
};
DialogControlBinding.prototype.onBindingRegister=function(){
DialogControlBinding.superclass.onBindingRegister.call(this);
this.attachClassName(DialogControlBinding.CLASSNAME);
};
DialogControlBinding.newInstance=function(_7a2){
var _7a3=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a2);
return UserInterface.registerBinding(_7a3,DialogControlBinding);
};
DialogTitleBarPopupBinding.prototype=new PopupBinding;
DialogTitleBarPopupBinding.prototype.constructor=DialogTitleBarPopupBinding;
DialogTitleBarPopupBinding.superclass=PopupBinding.prototype;
DialogTitleBarPopupBinding.CMD_RESTORE="restore";
DialogTitleBarPopupBinding.CMD_MINIMIZE="minimize";
DialogTitleBarPopupBinding.CMD_MAXIMIZE="maximize";
DialogTitleBarPopupBinding.CMD_REFRESH="refreshview";
DialogTitleBarPopupBinding.CMD_CLOSE="closedialog";
DialogTitleBarPopupBinding.CMD_VIEWSOURCE="viewsource";
DialogTitleBarPopupBinding.CMD_VIEWGENERATED="viewgenerated";
DialogTitleBarPopupBinding.CMD_VIEWSERIALIZED="viewserialized";
function DialogTitleBarPopupBinding(){
this.logger=SystemLogger.getLogger("DialogTitleBarPopupBinding");
}
DialogTitleBarPopupBinding.prototype.toString=function(){
return "[DialogTitleBarPopupBinding]";
};
DialogTitleBarPopupBinding.prototype.onBindingAttach=function(){
DialogTitleBarPopupBinding.superclass.onBindingAttach.call(this);
this._indexMenuContent();
};
WindowBindingHighlightNodeCrawler.prototype=new NodeCrawler;
WindowBindingHighlightNodeCrawler.prototype.constructor=WindowBindingHighlightNodeCrawler;
WindowBindingHighlightNodeCrawler.superclass=NodeCrawler.prototype;
WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT="compositec1generatedhighlight";
function WindowBindingHighlightNodeCrawler(){
this._keywords=null;
this._map=new Map();
this._textnodes=null;
this._construct();
return this;
}
WindowBindingHighlightNodeCrawler.prototype._construct=function(){
ElementCrawler.superclass._construct.call(this);
this.addFilter(function(node,arg){
var _7a6=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a7=node.nodeName.toLowerCase();
switch(_7a7){
case "script":
case "style":
case "textarea":
_7a6=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a6;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7ae=true;
if(exp.test(text)){
self._textnodes.add(node);
_7ae=false;
}
return _7ae;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7af,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7af,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b3=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b3+")");
this._map.set(key,exp);
}
};
WindowBindingHighlightNodeCrawler.prototype.onCrawlStop=function(){
var self=this;
if(this._textnodes.hasEntries()){
this._textnodes.each(function(node){
var div=self.contextDocument.createElement("div");
var frag=self.contextDocument.createDocumentFragment();
div.innerHTML=self._getMarkup(node.nodeValue);
while(div.hasChildNodes()){
frag.appendChild(div.firstChild);
}
node.parentNode.replaceChild(frag,node);
});
}
};
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b9){
var _7ba="";
var _7bb="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7bc="</span>";
var self=this;
function iterate(_7be){
var _7bf=-1;
var _7c0=null;
self._map.each(function(key,exp){
var low=_7be.toLowerCase();
var _7c4=low.search(exp);
if(_7c4>-1){
if(_7bf==-1){
_7bf=_7c4;
}
if(_7c4<=_7bf){
_7bf=_7c4;
_7c0=key;
}
}
});
if(_7bf>-1&&_7c0!=null){
var pre=_7be.substring(0,_7bf);
var hit=_7be.substring(_7bf,_7bf+_7c0.length);
var pst=_7be.substring(_7bf+_7c0.length,_7be.length);
_7ba+=pre+_7bb+hit+_7bc;
iterate(pst);
}else{
_7ba+=_7be;
}
}
iterate(_7b9);
return _7ba;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c8){
var _7c9=new List(_7c8.getElementsByTagName("span"));
_7c9.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c8.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
span.parentNode.replaceChild(node,span);
}
});
};
WindowBinding.prototype=new FlexBoxBinding;
WindowBinding.prototype.constructor=WindowBinding;
WindowBinding.superclass=FlexBoxBinding.prototype;
WindowBinding.ACTION_LOADED="window loaded";
WindowBinding.ACTION_ONLOAD="alien window loaded";
WindowBinding.DEFAULT_URL="${root}/blank.aspx";
WindowBinding.DEFAULT_TITLE="Composite.Management.Blank";
WindowBinding.POSTBACK_URL="${root}/postback.aspx";
WindowBinding.POSTBACK_TITLE="Composite.Management.DefaultPostBack";
WindowBinding.getMarkup=function(_7cc){
var _7cd=null;
if(_7cc.isAttached){
var doc=_7cc.getContentDocument();
if(doc!=null){
_7cd=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7cd,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7cd=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7cd instanceof SOAPFault){
_7cd=null;
}
}
}
}
return _7cd;
};
WindowBinding.highlightKeywords=function(_7d1,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d1.isAttached){
var doc=_7d1.getContentDocument();
if(doc!=null){
var _7d4=WindowBinding._highlightcrawler;
_7d4.reset(doc.body);
if(list!=null){
_7d4.setKeys(list);
_7d4.crawl(doc.body);
}
}
}
};
WindowBinding._highlightcrawler=null;
function WindowBinding(){
this.logger=SystemLogger.getLogger("WindowBinding");
this._target=null;
this._parameterMap=null;
this._pageBinding=null;
this._isReloading=false;
this._onloadHandler=null;
this._unloadHandler=null;
this._hasLoadActionFired=false;
return this;
}
WindowBinding.prototype.toString=function(){
return "[WindowBinding]";
};
WindowBinding.prototype.serialize=function(){
var _7d5=WindowBinding.superclass.serialize.call(this);
if(_7d5){
_7d5.url=this.getURL();
}
return _7d5;
};
WindowBinding.prototype.onBindingRegister=function(){
WindowBinding.superclass.onBindingRegister.call(this);
this.addActionListener(RootBinding.ACTION_PHASE_3);
this.addActionListener(PageBinding.ACTION_INITIALIZED);
this.addActionListener(RootBinding.ACTION_ACTIVATED);
this.addActionListener(RootBinding.ACTION_DEACTIVATED);
};
WindowBinding.prototype.onBindingAttach=function(){
this.buildDOMContent();
WindowBinding.superclass.onBindingAttach.call(this);
this.setURL(this.getURL());
};
WindowBinding.prototype.onBindingDispose=function(){
WindowBinding.superclass.onBindingDispose.call(this);
this._disposeContentDocument();
};
WindowBinding.prototype._disposeContentDocument=function(){
if(this._pageBinding!=null){
var win=this.getContentWindow();
if(win!=null){
var _7d7=this.getContentWindow().DocumentManager;
if(_7d7!=null){
_7d7.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d8){
WindowBinding.superclass.handleAction.call(this,_7d8);
var _7d9=_7d8.target;
switch(_7d8.type){
case RootBinding.ACTION_PHASE_3:
if(_7d9.bindingDocument==this.getContentDocument()){
if(this._isReloading==true){
this._isReloading=false;
if(Client.isPrism==true){
Prism.enableCache();
}
}
this.dispatchAction(WindowBinding.ACTION_LOADED);
}
break;
case PageBinding.ACTION_INITIALIZED:
this._onPageInitialize(_7d9);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d8.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7da){
if(!this.isFit||_7da){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7db){
if(this._pageBinding==null){
if(_7db.bindingWindow==this.getContentWindow()){
this._pageBinding=_7db;
}
}
};
WindowBinding.prototype.buildDOMContent=function(){
this.shadowTree.iframe=DOMUtil.createElementNS(Constants.NS_XHTML,"iframe",this.bindingDocument);
this.shadowTree.iframe.setAttribute("frameborder","0");
this.shadowTree.iframe.frameBorder=0;
this.shadowTree.iframe.id=KeyMaster.getUniqueKey();
this.shadowTree.iframe.name=this.shadowTree.iframe.id;
this.bindingElement.appendChild(this.shadowTree.iframe);
this._registerOnloadListener(true);
};
WindowBinding.prototype._registerOnloadListener=function(_7dc){
var _7dd=this.shadowTree.iframe;
var _7de=_7dc?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e1=true;
if(Client.isExplorer){
_7e1=_7dd.readyState=="complete";
}
if(_7e1==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7de](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7e2){
var _7e3=_7e2?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e3](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
};
WindowBinding.prototype.onWindowLoaded=function(win){
if(win==null){
this.logger.error("WindowBinding#onWindowLoaded: Bad argument: "+this.getURL());
}else{
if(this.getURL()!=WindowBinding.DEFAULT_URL){
if(!this._hasLoadActionFired){
if(win!=null&&win.document!=null&&win.document.body!=null){
win.document.body.style.border="none";
if(win.WindowManager==undefined){
Application.framework(win.document);
}
if(this._isReloading==true){
this._isReloading=false;
if(Client.isPrism){
Prism.enableCache();
}
}
}
this._registerUnloadListener(true);
this.dispatchAction(WindowBinding.ACTION_ONLOAD);
this._hasLoadActionFired=true;
this.fitContentWindow();
}
}
}
};
WindowBinding.prototype.setURL=function(url,data){
this.setProperty("url",url);
this._hasLoadActionFired=false;
if(this.isAttached==true){
this._disposeContentDocument();
if(url.length>1900){
var _7e8=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e8.getQueryString().each(function(name,_7ea){
if(_7ea.length>512){
data.set(name,_7ea);
_7e8.setParam(name,null);
}
});
url=_7e8.toString();
}
if(data){
var self=this;
var _7ec=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7ec.id;
form.setAttribute("target",_7ec.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7ef){
var _7f0=self.bindingDocument.createElement("input");
_7f0.name=name;
_7f0.value=_7ef;
_7f0.type="hidden";
form.appendChild(_7f0);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f1=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f1=url;
}
return _7f1;
};
WindowBinding.prototype.reload=function(_7f3){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f4=null;
if(this.shadowTree.iframe!=null){
_7f4=this.shadowTree.iframe;
}
return _7f4;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f5=null,_7f6=this.getFrameElement();
if(_7f6!==null){
try{
_7f5=_7f6.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f5;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f7=null,win=this.getContentWindow();
if(win){
_7f7=win.document;
}
return _7f7;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f9=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f9=UserInterface.getBinding(doc.body);
}
return _7f9;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7fb){
this.bindingElement.style.height=_7fb+"px";
};
WindowBinding.prototype.hide=function(){
if(this.isVisible==true){
this.bindingElement.style.visibility="hidden";
this.isVisible=false;
}
};
WindowBinding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.visibility="visible";
this.isVisible=true;
}
};
WindowBinding.prototype.handleCrawler=function(_7fc){
WindowBinding.superclass.handleCrawler.call(this,_7fc);
if(_7fc.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7fc.nextNode=root.bindingElement;
}else{
_7fc.response=NodeCrawler.SKIP_CHILDREN;
}
}
};
WindowBinding.prototype.post=function(list,url){
var win=this.getContentWindow();
if(win.isPostBackDocument){
win.submit(list,url);
}else{
throw "Post aborted";
}
};
WindowBinding.prototype.flex=function(){
this.fitContentWindow();
WindowBinding.superclass.flex.call(this);
};
WindowBinding.prototype.fitContentWindow=function(){
if(Client.isPad){
var _801=this.getContentWindow();
if(_801!=null&&_801.document!=null&&_801.document.body!=null){
if(this.bindingElement.offsetHeight){
_801.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_801.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_802){
var _803=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_802);
var _804=UserInterface.registerBinding(_803,WindowBinding);
return _804;
};
PreviewWindowBinding.prototype=new WindowBinding;
PreviewWindowBinding.prototype.constructor=PreviewWindowBinding;
PreviewWindowBinding.superclass=WindowBinding.prototype;
PreviewWindowBinding.URL_FULL_STOP="${root}/content/misc/preview/stop.aspx";
PreviewWindowBinding.URL_ERROR="${root}/content/misc/preview/error.aspx";
PreviewWindowBinding.ACTION_RETURN="return";
PreviewWindowBinding.TIMEOUT_RETURN=parseInt(2300);
function PreviewWindowBinding(){
this.logger=SystemLogger.getLogger("PreviewWindowBinding");
this._postBackList=null;
this._postBackURL=null;
this._coverBinding=null;
this._windowBinding=null;
this._errorBinding=null;
this._hasFullStop=false;
this._isReturning=false;
this._loadhandler=null;
this._timeout=null;
return this;
}
PreviewWindowBinding.prototype.toString=function(){
return "[PreviewWindowBinding]";
};
PreviewWindowBinding.prototype.onBindingAttach=function(){
PreviewWindowBinding.superclass.onBindingAttach.call(this);
this.bindingElement.style.backgroundColor="white";
this._coverBinding=this.add(CoverBinding.newInstance(this.bindingDocument));
this._coverBinding.attach();
};
PreviewWindowBinding.prototype.onWindowLoaded=function(win){
if(this.getURL()!=WindowBinding.DEFAULT_URL){
if(!this._hasFullStop){
if(win.isPostBackDocument){
if(this._isReturning){
win.submit(this._postBackList,this._postBackURL);
this._isReturning=false;
}
}else{
this._coverBinding.hide();
}
if(!win.isDefaultDocument){
var self=this;
this._loadhandler={handleEvent:function(e){
if(win.isPostBackDocument){
self._postBackList=win.postBackList;
self._postBackURL=win.postBackURL;
}else{
if(!win.isDefaultDocument){
self._fullStop();
}
}
}};
DOMEvents.addEventListener(win,DOMEvents.BEFOREUNLOAD,this._loadhandler);
}
}
}
PreviewWindowBinding.superclass.onWindowLoaded.call(this,win);
};
PreviewWindowBinding.prototype._fullStop=function(){
this._coverBinding.show();
if(this._windowBinding==null){
this._windowBinding=this._getWindowBinding();
this._windowBinding.setURL(PreviewWindowBinding.URL_FULL_STOP);
this._windowBinding.hide();
this._windowBinding.attach();
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_808){
_808.target.show();
_808.consume();
}});
}else{
this._windowBinding.show();
}
this._hasFullStop=true;
this.addActionListener(PreviewWindowBinding.ACTION_RETURN);
this.setURL(WindowBinding.DEFAULT_URL);
var self=this;
this._timeout=setTimeout(function(){
self._return();
},PreviewWindowBinding.TIMEOUT_RETURN);
};
PreviewWindowBinding.prototype.error=function(){
this._coverBinding.show();
if(this._errorBinding==null){
this._errorBinding=this._getWindowBinding();
this._errorBinding.setURL(PreviewWindowBinding.URL_ERROR);
this._errorBinding.hide();
this._errorBinding.attach();
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_80a){
_80a.target.show();
_80a.consume();
}});
}else{
this._errorBinding.show();
}
this._hasError=true;
this.setURL(WindowBinding.DEFAULT_URL);
};
PreviewWindowBinding.prototype._getWindowBinding=function(){
var win=this._coverBinding.add(WindowBinding.newInstance(this.bindingDocument));
win.isFlexible=false;
win.bindingElement.style.position="absolute";
win.bindingElement.style.width="100%";
win.bindingElement.style.height="100%";
return win;
};
PreviewWindowBinding.prototype.handleAction=function(_80c){
PreviewWindowBinding.superclass.handleAction.call(this,_80c);
switch(_80c.type){
case PreviewWindowBinding.ACTION_RETURN:
this._return();
break;
}
};
PreviewWindowBinding.prototype._return=function(){
clearTimeout(this._timeout);
this._timeout=null;
this.removeActionListener(PreviewWindowBinding.ACTION_RETURN);
this._windowBinding.hide();
this._hasFullStop=false;
this._isReturning=true;
this.setURL(WindowBinding.POSTBACK_URL);
};
PreviewWindowBinding.prototype.reset=function(){
if(this._timeout!=null){
clearTimeout(this._timeout);
this._timeout=null;
}
if(this._errorBinding!=null){
if(this._errorBinding.isVisible){
this._errorBinding.hide();
}
}
if(this._windowBinding!=null){
if(this._windowBinding.isVisible){
this._windowBinding.hide();
}
}
if(this._loadhandler!=null){
if(this.getURL()!=WindowBinding.DEFAULT_URL){
DOMEvents.removeEventListener(this.getContentWindow(),DOMEvents.BEFOREUNLOAD,this._loadhandler);
this._loadhandler=null;
}
}
this._hasError=false;
this._hasFullStop=false;
this._isReturning=false;
this.setURL(WindowBinding.DEFAULT_URL);
};
RadioGroupBinding.prototype=new Binding;
RadioGroupBinding.prototype.constructor=RadioGroupBinding;
RadioGroupBinding.superclass=Binding.prototype;
RadioGroupBinding.ACTION_SELECTIONCHANGED="radiogroupselectionchanged";
function RadioGroupBinding(){
this.logger=SystemLogger.getLogger("RadioGroupBinding");
this._checkedRadioBinding=null;
this._radioButtonBindings=null;
this._isUpToDate=false;
return this;
}
RadioGroupBinding.prototype.toString=function(){
return "[RadioGroupBinding]";
};
RadioGroupBinding.prototype.onBindingRegister=function(){
RadioGroupBinding.superclass.onBindingRegister.call(this);
this.addActionListener(ButtonBinding.ACTION_RADIOBUTTON_ATTACHED,this);
this.addActionListener(ButtonBinding.ACTION_COMMAND,this);
};
RadioGroupBinding.prototype.onBindingInitialize=function(){
var _80d=null;
this._getRadioButtonBindings().each(function(_80e){
if(_80e.getProperty("ischecked")){
_80d=_80e;
return false;
}else{
return true;
}
});
if(_80d){
this._checkedRadioBinding=_80d;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_80f){
RadioGroupBinding.superclass.handleAction.call(this,_80f);
var _810=_80f.target;
switch(_80f.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_80f.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_810.isRadioButton&&!_810.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_810);
}
this._checkedRadioBinding=_810;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_80f.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_811,_812){
if(_811 instanceof RadioDataBinding){
_811=_811.getButton();
}
if(_811.isRadioButton){
switch(_812){
case true:
this._unCheckRadioBindingsExcept(_811);
this._checkedRadioBinding=_811;
_811.check(true);
break;
default:
_811.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_813){
var _814=this._getRadioButtonBindings();
_814.each(function(_815){
if(_815.isChecked&&_815!=_813){
_815.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _816=new Crawler();
var list=new List();
_816.addFilter(function(_818){
var _819=true;
var _81a=UserInterface.getBinding(_818);
if(_81a instanceof RadioGroupBinding){
_819=NodeCrawler.SKIP_CHILDREN;
}else{
if(_81a instanceof ButtonBinding&&_81a.isRadioButton){
list.add(_81a);
}
}
return _819;
});
_816.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_81b){
var _81c=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_81b);
return UserInterface.registerBinding(_81c,RadioGroupBinding);
};
DataBindingMap.prototype=new Map;
DataBindingMap.prototype.constructor=DataBindingMap;
DataBindingMap.superclass=Map.prototype;
DataBindingMap.TYPE_VALUE="databindingmap valuetype";
DataBindingMap.TYPE_RESULT="databindingmap resulttype";
function DataBindingMap(map){
this._map=map?map:{};
this.type=DataBindingMap.TYPE_RESULT;
}
DataInputBinding.prototype=new DataBinding;
DataInputBinding.prototype.constructor=DataInputBinding;
DataInputBinding.superclass=DataBinding.prototype;
function DataInputBinding(){
this.logger=SystemLogger.getLogger("DataInputBinding");
this.type=null;
this.isRequired=false;
this.expression=null;
this.isPassword=false;
this._value=null;
this._isValid=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength==true;
this._isInvalidBecauseMinLength==true;
this._isInvalidBecauseMaxLength==true;
this._sessionResult=null;
this.isDisabled=false;
this.isReadOnly=false;
this._dirtyinterval=null;
this._isAutoSelect=false;
this.minlength=null;
this.maxlength=null;
this._isAutoPost=false;
this._timeout=null;
this._time=1500;
this.crawlerFilters=new List([DocumentCrawler.ID,FocusCrawler.ID]);
this.spellcheck=true;
return this;
}
DataInputBinding.prototype.toString=function(){
return "[DataInputBinding]";
};
DataInputBinding.prototype.onBindingRegister=function(){
DataInputBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["value"]=this.setValue;
};
DataInputBinding.prototype.onBindingAttach=function(){
DataInputBinding.superclass.onBindingAttach.call(this);
this._parseDOMProperties();
this._buildDOMContent();
this._attachDOMEvents();
};
DataInputBinding.prototype.onBindingDispose=function(){
DataInputBinding.superclass.onBindingDispose.call(this);
if(this._dirtyinterval){
window.clearInterval(this._dirtyinterval);
}
if(!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
};
DataInputBinding.prototype._parseDOMProperties=function(){
this.type=this.getProperty("type");
this.isRequired=this.getProperty("required");
this.isPassword=this.getProperty("password")==true;
this.minlength=this.getProperty("minlength");
this.maxlength=this.getProperty("maxlength");
this._isAutoPost=this.getProperty("autopost")==true;
this.spellcheck=this.getProperty("spellcheck")!==false;
if(this.type=="programmingidentifier"){
this.spellcheck=false;
}
if(this.type=="programmingnamespace"){
this.spellcheck=false;
}
var _81e=this.getProperty("regexrule");
if(_81e!=null){
this.expression=new RegExp(_81e);
}
var _81f=this.getProperty("onbindingblur");
if(_81f!=null){
this.onblur=function(){
Binding.evaluate(_81f,this);
};
}
var _820=this.getProperty("onvaluechange");
if(_820!=null){
this.onValueChange=function(){
Binding.evaluate(_820,this);
};
}
if(this.error==null&&this.type!=null){
var _821=DataBinding.errors[this.type];
if(_821!=null){
this.error=_821;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _822=this.getProperty("value");
if(_822!=null){
this.setValue(String(_822));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _824=this.getProperty("isdisabled");
if(_824==true){
this.setDisabled(true);
}
var _825=this.getProperty("readonly");
if(_825==true){
this.setReadOnly(true);
}
var _826=this.getProperty("autoselect");
if(_826==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _827=this.getProperty("placeholder");
if(_827){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_827));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _828=Localization.currentLang();
if(_828!=null){
this.shadowTree.input.setAttribute("spellcheck","true");
this.shadowTree.input.setAttribute("lang",Localization.currentLang());
}else{
this.shadowTree.input.setAttribute("spellcheck","false");
}
}else{
this.shadowTree.input.setAttribute("spellcheck","false");
}
if(Localization.isRtl!==Localization.isUIRtl){
this.shadowTree.input.setAttribute("dir",Localization.isRtl?"rtl":"ltr");
}
if(this.hasCallBackID()){
}else{
if(this._isAutoPost){
this.logger.warn("Autopost "+this.toString()+" without a callbackid?");
}
}
};
DataInputBinding.prototype._getInputElement=function(){
var _829=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_829.type=this.isPassword==true?"password":"text";
_829.tabIndex=-1;
return _829;
};
DataInputBinding.prototype._attachDOMEvents=function(){
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.FOCUS,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.BLUR,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.KEYDOWN,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.DRAGOVER,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.DROP,this);
};
DataInputBinding.prototype.handleEvent=function(e){
DataInputBinding.superclass.handleEvent.call(this,e);
if(this.isFocusable==true){
switch(e.type){
case DOMEvents.DRAGOVER:
DOMEvents.preventDefault(e);
break;
case DOMEvents.DROP:
if(e.dataTransfer){
this.setValue(e.dataTransfer.getData("Text"));
this.checkDirty();
this.validate(true);
}
DOMEvents.preventDefault(e);
break;
case DOMEvents.FOCUS:
case DOMEvents.BLUR:
this._handleFocusAndBlur(e.type==DOMEvents.FOCUS);
break;
case DOMEvents.KEYPRESS:
switch(e.keyCode){
case KeyEventCodes.VK_BACK:
case KeyEventCodes.VK_INSERT:
case KeyEventCodes.VK_DELETE:
this._testDirty();
break;
}
break;
case DOMEvents.KEYDOWN:
this._testDirty();
switch(e.keyCode){
case KeyEventCodes.VK_ENTER:
this._handleEnterKey(e);
break;
case KeyEventCodes.VK_ESCAPE:
DOMEvents.preventDefault(e);
break;
}
if(this.isFocusable&&this._isAutoPost){
if(this._timeout!=null){
top.window.clearTimeout(this._timeout);
}
var self=this;
this._timeout=top.window.setTimeout(function(){
if(Binding.exists(self)){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
}
},this._time);
}
break;
}
}
};
DataInputBinding.prototype._handleFocusAndBlur=function(_82c){
if(_82c){
this.focus(true);
this.bindingWindow.standardEventHandler.enableNativeKeys();
}else{
this.blur(true);
this.bindingWindow.standardEventHandler.disableNativeKeys();
}
};
DataInputBinding.prototype._handleEnterKey=function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
EventBroadcaster.broadcast(BroadcastMessages.KEY_ENTER);
};
DataInputBinding.prototype.focus=function(_82e){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_82e){
var self=this,_830=this.bindingElement,_831={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_830,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_830,DOMEvents.MOUSEUP,_831);
}else{
this.select();
}
}
this.onfocus();
if(!_82e){
var _832=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_832);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _833=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _834=_833.createTextRange();
_834.moveStart("character",0);
_834.moveEnd("character",_833.value.length);
_834.select();
}else{
_833.setSelectionRange(0,_833.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_835){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_835){
this.shadowTree.input.blur();
}
this._blur();
}
};
DataInputBinding.prototype._focus=function(){
if(!this._isValid){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="password";
this.setValue(this._value);
}
}else{
this.setValue(this._value);
}
this.shadowTree.input.className="";
}
this._sessionResult=this.getResult();
var self=this;
this._dirtyinterval=window.setInterval(function(){
if(Binding.exists(self)==true){
self.checkDirty();
if(!self._isValid){
self.validate(true);
}
}else{
window.clearInterval(self._dirtyinterval);
self._dirtyinterval=null;
}
},500);
};
DataInputBinding.prototype._blur=function(){
if(this._dirtyinterval){
window.clearInterval(this._dirtyinterval);
this._dirtyinterval=null;
}
this.checkDirty();
this._isValid=true;
this._normalizeToValid();
this.validate(true);
if(Types.isFunction(this.onblur)){
this.onblur();
}
if(this._isValid){
if(this.getResult()!=this._sessionResult){
this.onValueChange();
}
}
};
DataInputBinding.prototype.onfocus=function(){
};
DataInputBinding.prototype.onblur=function(){
};
DataInputBinding.prototype.checkDirty=function(){
if(!this.isDirty){
if(this.getResult()!=this._sessionResult){
this.dirty();
}
}
};
DataInputBinding.prototype._testDirty=function(){
var val=this.getValue();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
if(self.getValue()!=val){
self.dirty();
}
}
},0);
};
DataInputBinding.prototype.onValueChange=function(){
};
DataInputBinding.prototype.validate=function(_839){
if(_839==true||this._isValid){
var _83a=this.isValid();
if(_83a!=this._isValid){
this._isValid=_83a;
if(!_83a){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _83b=null;
if(this._isInvalidBecauseRequired==true){
_83b=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_83b=DataBinding.warnings["minlength"];
_83b=_83b.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_83b=DataBinding.warnings["maxlength"];
_83b=_83b.replace("${count}",String(this.maxlength));
}else{
_83b=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_83b!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_83b);
}
}else{
this.setValue(_83b);
}
}
}
}else{
this._normalizeToValid();
}
}
}
return this._isValid;
};
DataInputBinding.prototype._normalizeToValid=function(){
if(this._isValid){
if(this.hasClassName(DataBinding.CLASSNAME_INVALID)){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}
this.shadowTree.input.className="";
this.dispatchAction(Binding.ACTION_VALID);
}
};
DataInputBinding.prototype.isValid=function(){
var _83c=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _83d=this.getValue();
if(_83d==""){
if(this.isRequired==true){
_83c=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _83e=DataBinding.expressions[this.type];
if(!_83e.test(_83d)){
_83c=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_83d)){
_83c=false;
}
}
}
}
if(_83c&&this.minlength!=null){
if(_83d.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_83c=false;
}
}
if(_83c&&this.maxlength!=null){
if(_83d.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_83c=false;
}
}
return _83c;
};
DataInputBinding.prototype.setDisabled=function(_83f){
if(_83f!=this.isDisabled){
if(_83f){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _840=this.shadowTree.input;
if(_83f){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_840,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_840,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_83f;
this.shadowTree.input.unselectable=_83f?"on":"off";
}
this.isDisabled=_83f;
this.isFocusable=!_83f;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_842){
if(_842!=this.isReadOnly){
if(_842){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_842;
this.isReadOnly=_842;
}
};
DataInputBinding.prototype.disable=function(){
if(!this.isDisabled){
this.setDisabled(true);
}
};
DataInputBinding.prototype.enable=function(){
if(this.isDisabled){
this.setDisabled(false);
}
};
DataInputBinding.prototype.handleElement=function(_843){
return true;
};
DataInputBinding.prototype.updateElement=function(_844){
var _845=_844.getAttribute("value");
var _846=_844.getAttribute("type");
var _847=_844.getAttribute("maxlength");
var _848=_844.getAttribute("minlength");
var _849=_844.getAttribute("required")==="true";
if(_845==null){
_845="";
}
var _84a=this.bindingWindow.UpdateManager;
if(this.getValue()!=_845){
_84a.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_845);
}
if(this.type!=_846){
_84a.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_846;
}
if(this.maxlength!=_847){
_84a.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_847;
}
if(this.minlength!=_848){
_84a.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_848;
}
if(this.isRequired!=_849){
_84a.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_849;
}
return true;
};
DataInputBinding.prototype.manifest=function(){
if(this._timeout!=null){
top.window.clearTimeout(this._timeout);
}
if(!this._isValid){
this.setValue("");
this._isValid=true;
this._normalizeToValid();
}
};
DataInputBinding.prototype.clean=function(){
DataInputBinding.superclass.clean.call(this);
this._sessionResult=this.getResult();
};
DataInputBinding.prototype.setValue=function(_84b){
if(_84b===null){
_84b="";
}
if(_84b!=this.getValue()){
this.setProperty("value",_84b);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_84b);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _84c=null;
if(this.shadowTree.input!=null){
_84c=this.shadowTree.input.value;
}else{
_84c=this.getProperty("value");
}
return _84c;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _84e=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_84e=Number(_84e);
break;
}
return _84e;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_84f){
var _850=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_84f);
return UserInterface.registerBinding(_850,DataInputBinding);
};
TextBoxBinding.prototype=new DataInputBinding;
TextBoxBinding.prototype.constructor=TextBoxBinding;
TextBoxBinding.superclass=DataInputBinding.prototype;
function TextBoxBinding(){
this.logger=SystemLogger.getLogger("TextBoxBinding");
this._hasWordWrap=true;
return this;
}
TextBoxBinding.prototype.toString=function(){
return "[TextBoxBinding]";
};
TextBoxBinding.prototype._buildDOMContent=function(){
var _851=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_851!=null){
this.setValue(_851.value);
_851.parentNode.removeChild(_851);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _852;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_852=div.firstChild;
}else{
_852=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_852.tabIndex=-1;
return _852;
};
TextBoxBinding.prototype.handleElement=function(_854){
return true;
};
TextBoxBinding.prototype.updateElement=function(_855){
var _856,area=_855.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_856=DOMUtil.getTextContent(area);
}
if(_856==null){
_856="";
}
var _858=this.bindingWindow.UpdateManager;
if(this.getValue()!=_856){
_858.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_856);
}
var _859=_855.getAttribute("type");
if(this.type!=_859){
_858.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_859;
}
return true;
};
TextBoxBinding.prototype._handleEnterKey=function(e){
DOMEvents.stopPropagation(e);
};
EditorTextBoxBinding.prototype=new TextBoxBinding;
EditorTextBoxBinding.prototype.constructor=EditorTextBoxBinding;
EditorTextBoxBinding.superclass=TextBoxBinding.prototype;
function EditorTextBoxBinding(){
this.logger=SystemLogger.getLogger("EditorTextBoxBinding");
this._hasWordWrap=false;
}
EditorTextBoxBinding.prototype.toString=function(){
return "[EditorTextBoxBinding]";
};
EditorTextBoxBinding.prototype.handleEvent=function(e){
if(this.isFocusable==true){
switch(e.type){
case DOMEvents.FOCUS:
case DOMEvents.BLUR:
this._handleFocusAndBlur(e.type==DOMEvents.FOCUS);
break;
case DOMEvents.KEYDOWN:
this._handleKeyEvent(e);
break;
}
}
};
EditorTextBoxBinding.prototype._handleKeyEvent=function(e){
switch(e.keyCode){
case KeyEventCodes.VK_TAB:
this._handleTabKey(e.shiftKey);
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
break;
case KeyEventCodes.VK_ENTER:
this._handleEnterKey();
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
break;
case KeyEventCodes.VK_ESCAPE:
DOMEvents.preventDefault(e);
break;
}
};
EditorTextBoxBinding.prototype._handleTabKey=Binding.ABSTRACT_METHOD;
EditorTextBoxBinding.prototype._handleEnterKey=Binding.ABSTRACT_METHOD;
IEEditorTextBoxBinding.prototype=new EditorTextBoxBinding;
IEEditorTextBoxBinding.prototype.constructor=IEEditorTextBoxBinding;
IEEditorTextBoxBinding.superclass=EditorTextBoxBinding.prototype;
function IEEditorTextBoxBinding(){
this.logger=SystemLogger.getLogger("IEEditorTextBoxBinding");
}
IEEditorTextBoxBinding.prototype.toString=function(){
return "[IEEditorTextBoxBinding]";
};
IEEditorTextBoxBinding.prototype._handleTabKey=function(_85d){
var _85e=this.bindingDocument.selection.createRange();
var _85f=_85e.text=="";
if(_85f&&!_85d){
_85e.text="\t";
}else{
var text="";
var _861=_85e.text.length;
while((_85e.moveStart("word",-1)&&_85e.text.charAt(1)!="\n")){
}
_85e.moveStart("character",1);
var _862=0;
var i=0,line,_865=_85e.text.split("\n");
while((line=_865[i++])!=null){
if(_85d){
line=line.replace(/^(\s)/mg,"");
_862++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_865[i+1]?"\n":"");
}
_85e.text=text;
_85e.moveStart("character",-_861);
if(_85d){
_85e.moveStart("character",2*_865.length-2);
}
_85e.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _866=this.bindingDocument.selection.createRange();
var _867=_866.duplicate();
while((_867.moveStart("word",-1)&&_867.text.indexOf("\n")==-1)){
}
_867.moveStart("character",1);
_866.text="\n"+_867.text.match(/^(\s)*/)[0]+"!";
_866.moveStart("character",-1);
_866.select();
_866.text="";
_866.select();
};
MozEditorTextBoxBinding.prototype=new EditorTextBoxBinding;
MozEditorTextBoxBinding.prototype.constructor=MozEditorTextBoxBinding;
MozEditorTextBoxBinding.superclass=EditorTextBoxBinding.prototype;
function MozEditorTextBoxBinding(){
this.logger=SystemLogger.getLogger("MozEditorTextBoxBinding");
return this;
}
MozEditorTextBoxBinding.prototype.toString=function(){
return "[MozEditorTextBoxBinding]";
};
MozEditorTextBoxBinding.prototype._handleTabKey=function(_868){
var _869;
var _86a;
var oss;
var osy;
var i;
var fnd;
var _86f=this._getSelectedText();
var el=this.shadowTree.input;
_869=el.scrollLeft;
_86a=el.scrollTop;
if(!_86f.match(/\n/)){
oss=el.selectionStart;
el.value=el.value.substr(0,el.selectionStart)+"\t"+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1;
el.selectionEnd=oss+1;
}else{
oss=el.selectionStart;
osy=el.selectionEnd;
fnd=0;
for(i=oss-1;i>=0;i--){
if(el.value.charAt(i)=="\n"){
oss=i+1;
fnd=1;
break;
}
}
if(fnd==0){
oss=0;
}
fnd=0;
for(i=osy;i<el.value.length;i++){
if(el.value.charAt(i)=="\n"){
osy=i;
fnd=1;
break;
}
}
if(fnd==0){
osy=el.value.length;
}
el.selectionStart=oss;
el.selectionEnd=osy;
_86f=this._getSelectedText();
if(_868){
ntext=_86f.replace(/^(\s)/mg,"");
}else{
ntext=_86f.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_86f.length);
}
el.scrollLeft=_869;
el.scrollTop=_86a;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _871;
var _872;
var oss;
var osy;
var el=this.shadowTree.input;
_871=el.scrollLeft;
_872=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_871;
el.scrollTop=_872;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _879=this.shadowTree.input.value;
var _87a=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _879.substr(_87a,end-_87a);
};
SelectorBinding.prototype=new DataBinding;
SelectorBinding.prototype.constructor=SelectorBinding;
SelectorBinding.superclass=DataBinding.prototype;
SelectorBinding.ACTION_SELECTIONCHANGED="selectorselectionchanged";
SelectorBinding.ACTION_COMMAND="selectorcommand";
SelectorBinding.CLASSNAME_POPUP="selectorpopup";
function SelectorBinding(){
this.logger=SystemLogger.getLogger("SelectorBinding");
this.type=null;
this._buttonBinding=null;
this._popupBinding=null;
this._isLocal=false;
this._menuBodyBinding=null;
this._selectionValue=null;
this._selectionLabel=null;
this._searchString="";
this.isSearchSelectionEnabled=true;
this.selections=null;
this.isDisabled=false;
this.label=null;
this.value=null;
this.width=null;
this.defaultSelection=null;
this.image=null;
this.imageHover=null;
this.imageActive=null;
this.imageDisabled=null;
this.isDirty=false;
this._isUpToDate=false;
this._hasKeyboard=false;
this.BUTTON_IMPLEMENTATION=ClickButtonBinding;
this.MENUITEM_IMPLEMENTATION=MenuItemBinding;
this._isImageLayout=true;
this.isRequired=false;
this._isValid=true;
this.crawlerFilters=new List([DocumentCrawler.ID,FocusCrawler.ID]);
}
SelectorBinding.prototype.toString=function(){
return "[SelectorBinding]";
};
SelectorBinding.prototype.onBindingAttach=function(){
SelectorBinding.superclass.onBindingAttach.call(this);
this.selections=new List();
this.parseDOMProperties();
this.buildDOMContent();
this.addEventListener(DOMEvents.FOCUS);
this.addEventListener(DOMEvents.KEYPRESS);
this.addEventListener(DOMEvents.KEYDOWN);
this.addActionListener(ButtonBinding.ACTION_COMMAND);
var _87c=this.getProperty("isdisabled");
if(this.isDisabled||_87c){
this.disable();
}
};
SelectorBinding.prototype.onBindingDispose=function(){
SelectorBinding.superclass.onBindingDispose.call(this);
if(this._popupBinding&&Binding.exists(this._popupBinding)){
this._popupBinding.dispose();
}
if(this._hasKeyboard==true){
this._releaseKeyboard();
}
};
SelectorBinding.prototype.parseDOMProperties=function(){
var type=this.getProperty("type");
var _87e=this.getProperty("label");
var _87f=this.getProperty("value");
var _880=this.getProperty("width");
var _881=this.getProperty("onchange");
var _882=this.getProperty("required")==true;
var _883=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_87e!=null){
this.label=_87e;
}
if(!this.value&&_87f!=null){
this.value=_87f;
}
if(!this.width&&_880){
this.width=_880;
}
if(_882){
this.isRequired=true;
}
if(_883){
this._isLocal=true;
}
if(_881){
this.onValueChange=function(){
Binding.evaluate(_881,this);
};
}
this._computeImageProfile();
};
SelectorBinding.prototype._computeImageProfile=function(){
Binding.imageProfile(this);
};
SelectorBinding.prototype.buildDOMContent=function(){
this.buildButton();
this.buildPopup();
this.buildSelections();
this.bindingElement.tabIndex=0;
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
};
SelectorBinding.prototype.buildFormField=function(){
var _884=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_884.name=this.getName();
_884.value=this.getValue();
_884.type="hidden";
if(this.hasCallBackID()){
_884.id=this.getCallBackID();
}
this.shadowTree.input=_884;
this.bindingElement.appendChild(_884);
};
SelectorBinding.prototype.buildButton=function(){
var _885=this.BUTTON_IMPLEMENTATION;
var _886=this.add(_885.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_886.imageProfile=this.imageProfile;
}
if(this.width!=null){
_886.setWidth(this.width);
}
this._buttonBinding=_886;
this.shadowTree.button=_886;
_886.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _887;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _888=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_888.id="selectorpopupset";
_887=UserInterface.registerBinding(_888,PopupSetBinding);
this.bindingDocument.body.appendChild(_887.bindingElement);
}else{
_887=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_887=top.app.bindingMap.selectorpopupset;
}
var doc=_887.bindingDocument;
var _88a=_887.add(PopupBinding.newInstance(doc));
var _88b=_88a.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_88a;
this._menuBodyBinding=_88b;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_88a.attachClassName("selectorpopup");
_88a.addActionListener(PopupBinding.ACTION_SHOW,this);
_88a.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_88a.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_88a);
};
SelectorBinding.prototype.buildSelections=function(){
if(this.defaultSelection==null&&(this.label||this.value)){
this.defaultSelection=new SelectorBindingSelection(this.label,this.value,true,null);
}
var list=this._getSelectionsList();
this.populateFromList(list);
};
SelectorBinding.prototype._getSelectionsList=function(){
var list=new List();
var _88e=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_88e).each(function(_88f){
var _890=_88f.getAttribute("label");
var _891=_88f.getAttribute("value");
var _892=_88f.getAttribute("selected");
var _893=_88f.getAttribute("image");
var _894=_88f.getAttribute("image-hover");
var _895=_88f.getAttribute("image-active");
var _896=_88f.getAttribute("image-disabled");
var _897=null;
if(_893||_894||_895||_896){
_897=new ImageProfile({image:_893,imageHover:_894,imageActive:_895,imageDisabled:_896});
}
list.add(new SelectorBindingSelection(_890?_890:null,_891?_891:null,_892&&_892=="true",_897));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _899=null;
while(list.hasNext()){
var _89a=list.getNext();
var item=this.addSelection(_89a);
if(_89a.isSelected){
this.select(item,true);
}
if(!_899){
_899=item;
}
}
if(!this._selectedItemBinding){
this.select(_899,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_89c,_89d){
var _89e=this.MENUITEM_IMPLEMENTATION;
var _89f=this._menuBodyBinding;
var _8a0=_89f.bindingDocument;
var _8a1=_89e.newInstance(_8a0);
_8a1.imageProfile=_89c.imageProfile;
_8a1.setLabel(_89c.label);
if(_89c.tooltip!=null){
_8a1.setToolTip(_89c.tooltip);
}
_8a1.selectionValue=_89c.value;
_89c.menuItemBinding=_8a1;
if(_89d){
_89f.addFirst(_8a1);
this.selections.addFirst(_89c);
}else{
_89f.add(_8a1);
this.selections.add(_89c);
}
this._isUpToDate=false;
return _8a1;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a2){
return this.addSelection(_8a2,true);
};
SelectorBinding.prototype.clear=function(_8a3){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a3&&this.defaultSelection!=null){
var _8a4=this.addSelection(this.defaultSelection);
this.select(_8a4,true);
}
}
};
SelectorBinding.prototype.clearAll=function(){
this.clear(true);
};
SelectorBinding.prototype.disable=function(){
this.setDisabled(true);
};
SelectorBinding.prototype.enable=function(){
this.setDisabled(false);
};
SelectorBinding.prototype.focus=function(){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused==true){
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
}
}
};
SelectorBinding.prototype.blur=function(){
if(this.isFocused==true){
DataBinding.prototype.blur.call(this);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
SelectorBinding.prototype._grabKeyboard=function(){
if(!this._hasKeyboard){
this.subscribe(BroadcastMessages.KEY_ARROW);
this._hasKeyboard=true;
}
};
SelectorBinding.prototype._releaseKeyboard=function(){
if(this._hasKeyboard==true){
this.unsubscribe(BroadcastMessages.KEY_ARROW);
this._hasKeyboard=false;
}
};
SelectorBinding.prototype.setDisabled=function(_8a5){
if(this.isAttached==true){
var _8a6=this._buttonBinding;
_8a6.setDisabled(_8a5);
}
if(_8a5){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a7){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a7);
}
};
SelectorBinding.prototype.handleAction=function(_8a8){
SelectorBinding.superclass.handleAction.call(this,_8a8);
switch(_8a8.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8a8.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8a8.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8a8.target);
_8a8.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
if(this._clearSearchSelection){
this._clearSearchSelection();
}
_8a8.consume();
break;
}
};
SelectorBinding.prototype._onButtonCommand=function(){
this.focus();
this._attachSelections();
this._restoreSelection();
this.dispatchAction(SelectorBinding.ACTION_COMMAND);
};
SelectorBinding.prototype._onPopupShowing=function(){
this._fitMenuToSelector();
this._releaseKeyboard();
};
SelectorBinding.prototype._onMenuItemCommand=function(_8aa){
this.select(_8aa);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8ab=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8ac=this._popupBinding.bindingElement;
_8ac.style.minWidth=_8ab;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ae=Client.isExplorer?e.keyCode:e.which;
if(_8ae==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ae=Client.isExplorer?e.keyCode:e.which;
if(_8ae>=32){
this._buttonBinding.check();
var _8af=String.fromCharCode(_8ae);
this._pushSearchSelection(_8af);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8b0){
this._searchString+=_8b0.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b1){
this._searchString=this._searchString.substring(0,this._searchString.length-1);
this._applySearchSelection();
};
SelectorBinding.prototype._clearSearchSelection=function(){
if(this._searchString!=null&&this._searchString!=""){
this._searchString="";
this._applySearchSelection();
}
};
SelectorBinding.prototype._applySearchSelection=function(){
if(this.isSearchSelectionEnabled){
var _8b2=this._menuBodyBinding;
if(_8b2!=null){
var _8b3=this.MENUITEM_IMPLEMENTATION;
var _8b4=_8b2.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b6=list.getNext();
if(_8b6.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b6);
}
}
}
this._attachSelections();
var _8b7=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8b8=_8b2.getDescendantBindingsByType(_8b3);
if(_8b8.hasEntries()){
while(_8b8.hasNext()){
var _8b9=_8b8.getNext();
var _8ba=_8b9.labelBinding;
if(_8ba!=null&&_8ba.shadowTree!=null&&_8ba.shadowTree.labelText!=null){
_8ba.shadowTree.labelText.innerHTML=_8ba.shadowTree.labelText.innerHTML.replace(_8b7,"<b>$&</b>");
}
}
_8b8.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8ba=LabelBinding.newInstance(_8b4);
_8ba.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b2.add(_8ba);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b6=list.getNext();
var item=this.addSelection(_8b6);
if(this._selectionValue==_8b6.value){
this._selectedItemBinding=item;
}
}
}
this._attachSelections();
this._restoreSelection();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}
if(this._bodyBinding instanceof MenuBodyBinding){
this._bodyBinding.refreshMenuGroups();
}
this._popupBinding._enableTab(true);
}
}
};
SelectorBinding.prototype.handleBroadcast=function(_8bc,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8bc,arg);
switch(_8bc){
case BroadcastMessages.KEY_ARROW:
this.logger.debug(this._buttonBinding.getLabel());
this._handleArrowKey(arg);
break;
}
};
SelectorBinding.prototype._handleArrowKey=function(key){
if(!this._popupBinding.isVisible){
switch(key){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
this._buttonBinding.check();
break;
}
}
};
SelectorBinding.prototype.select=function(_8bf,_8c0){
var _8c1=false;
if(_8bf!=this._selectedItemBinding){
this._selectedItemBinding=_8bf;
_8c1=true;
var _8c2=this._buttonBinding;
this._selectionValue=_8bf.selectionValue;
this._selectionLabel=_8bf.getLabel();
_8c2.setLabel(_8bf.getLabel());
if(_8bf.imageProfile!=null){
_8c2.imageProfile=_8bf.imageProfile;
}
if(_8c2.imageProfile!=null){
_8c2.setImage(this.isDisabled==true?_8c2.imageProfile.getDisabledImage():_8c2.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8c0){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8c0)){
this.validate();
}
}
return _8c1;
};
SelectorBinding.prototype._relate=function(){
var _8c3=this.getProperty("relate");
if(_8c3){
var _8c4=this.bindingDocument.getElementById(_8c3);
if(_8c4){
var _8c5=UserInterface.getBinding(_8c4);
if(_8c5){
if(this.isChecked){
_8c5.show();
}else{
_8c5.hide();
}
}
}
}
};
SelectorBinding.prototype._updateImageLayout=function(){
if(this._buttonBinding.getImage()==null){
if(this._isImageLayout==true){
this._buttonBinding.attachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this._isImageLayout=false;
}
}else{
if(!this._isImageLayout){
this._buttonBinding.detachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this._isImageLayout=true;
}
}
};
SelectorBinding.prototype.onValueChange=function(){
};
SelectorBinding.prototype.selectByValue=function(_8c6,_8c7){
var _8c8=false;
var _8c9=this._menuBodyBinding;
var _8ca=_8c9.getDescendantElementsByLocalName("menuitem");
while(_8ca.hasNext()){
var _8cb=UserInterface.getBinding(_8ca.getNext());
if(_8cb.selectionValue==_8c6){
_8c8=this.select(_8cb,_8c7);
break;
}
}
return _8c8;
};
SelectorBinding.prototype.getValue=function(){
var _8cc=this._selectionValue;
if(_8cc!=null){
_8cc=String(_8cc);
}
return _8cc;
};
SelectorBinding.prototype.setValue=function(_8cd){
this.selectByValue(String(_8cd),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ce=this._selectionValue;
if(_8ce=="null"){
_8ce=null;
}
if(_8ce){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ce=Number(_8ce);
break;
}
}
return _8ce;
};
SelectorBinding.prototype.setResult=function(_8cf){
this.selectByValue(_8cf,true);
};
SelectorBinding.prototype.validate=function(){
var _8d0=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d1=this.getValue();
if(_8d1==this.defaultSelection.value){
_8d0=false;
}
if(_8d0!=this._isValid){
if(_8d0){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8d0;
}
return _8d0;
};
SelectorBinding.prototype.manifest=function(){
if(this.isAttached==true){
if(this.getResult()){
if(!this.shadowTree.input){
this.buildFormField();
}
this.shadowTree.input.value=this.getValue();
}else{
if(this.shadowTree.input){
this.shadowTree.input.parentNode.removeChild(this.shadowTree.input);
this.shadowTree.input=null;
}
}
}
};
SelectorBinding.prototype._attachSelections=function(){
var _8d2=this._popupBinding;
if(!this._isUpToDate){
_8d2.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d3,_8d4){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d3));
return true;
};
SelectorBinding.newInstance=function(_8d5){
var _8d6=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d5);
return UserInterface.registerBinding(_8d6,SelectorBinding);
};
SimpleSelectorBinding.prototype=new DataBinding;
SimpleSelectorBinding.prototype.constructor=SimpleSelectorBinding;
SimpleSelectorBinding.superclass=DataBinding.prototype;
function SimpleSelectorBinding(){
this.logger=SystemLogger.getLogger("SimpleSelectorBinding");
this._select=null;
this.isRequired=false;
this._isValid=true;
this._cachewidth=0;
return this;
}
SimpleSelectorBinding.prototype.toString=function(){
return "[SimpleSelectorBinding]";
};
SimpleSelectorBinding.prototype.onBindingRegister=function(){
SimpleSelectorBinding.superclass.onBindingRegister.call(this);
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
};
SimpleSelectorBinding.prototype.onBindingAttach=function(){
SimpleSelectorBinding.superclass.onBindingAttach.call(this);
this._select=this.getChildElementByLocalName("select");
var name=this.getName();
if(name!=null){
this._select.name=name;
}
this._parseDOMProperties();
this._buildDOMContent();
};
SimpleSelectorBinding.prototype._parseDOMProperties=function(){
var _8d9=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d9){
this.onValueChange=function(){
Binding.evaluate(_8d9,this);
};
}
};
SimpleSelectorBinding.prototype._buildDOMContent=function(){
this.bindingElement.tabIndex=0;
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var self=this;
this._select.onchange=function(){
self.onValueChange();
self.dirty();
if(!self._isValid){
self.validate();
}
};
this._select.onfocus=function(){
self.focus(true);
};
if(Client.isExplorer){
this._buildDOMContentIE();
}
};
SimpleSelectorBinding.prototype._buildDOMContentIE=function(){
if(Client.isExplorer){
this.bindingElement.style.height=this.bindingElement.offsetHeight+"px";
this._cachewidth=this._select.offsetWidth;
this._select.style.position="absolute";
var self=this;
this._select.onmouseover=function(){
if(!self.isFocused){
self._hack(true);
}
};
this._select.onmouseout=function(){
if(!self.isFocused){
self._hack(false);
}
};
}
};
SimpleSelectorBinding.prototype.onValueChange=function(){
};
SimpleSelectorBinding.prototype.focus=function(_8dc){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8dc){
FocusBinding.focusElement(this._select);
if(Client.isExplorer){
this._hack(true);
}
}
this.bindingWindow.standardEventHandler.enableNativeKeys(false);
}
};
SimpleSelectorBinding.prototype.blur=function(){
SimpleSelectorBinding.superclass.blur.call(this);
if(!this.isFocused){
this._select.blur();
this.bindingWindow.standardEventHandler.disableNativeKeys();
if(Client.isExplorer){
this._hack(false);
}
if(this.isRequired){
this.validate();
}
}
};
SimpleSelectorBinding.prototype._hack=function(_8dd){
if(Client.isExplorer){
this._select.style.width=_8dd?"auto":this._cachewidth+"px";
if(_8dd){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8de=true;
if(this.isRequired){
if(this.getValue()==null){
_8de=false;
}
}
if(_8de!=this._isValid){
if(_8de){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8df=this._select;
var _8e0=_8df.options[_8df.selectedIndex];
var text=DOMUtil.getTextContent(_8e0);
_8df.blur();
_8df.style.color="#A40000";
_8df.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e0,DataBinding.warnings["required"]);
}
_8df.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e0,text);
}
};
}
this._isValid=_8de;
}
return _8de;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e2=null;
var _8e3=this._select;
var _8e4=_8e3.options[_8e3.selectedIndex];
var _8e5=true;
if(Client.isExplorer){
var html=_8e4.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e5=false;
}
}
if(_8e5){
_8e2=_8e4.getAttribute("value");
}
return _8e2;
};
SimpleSelectorBinding.prototype.setValue=function(_8e7){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8e8){
this.setValue(_8e8);
};
SimpleSelectorBinding.newInstance=function(_8e9){
var _8ea=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e9);
return UserInterface.registerBinding(_8ea,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8eb,_8ec,_8ed,_8ee,_8ef){
this._init(_8eb,_8ec,_8ed,_8ee,_8ef);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8f0,_8f1,_8f2,_8f3,_8f4){
if(_8f0!=null){
this.label=String(_8f0);
}
if(_8f1!=null){
this.value=String(_8f1);
}
if(_8f3!=null){
this.imageProfile=_8f3;
}
if(_8f4!=null){
this.tooltip=_8f4;
}
this.isSelected=_8f2?true:false;
}};
DataInputSelectorBinding.prototype=new DataInputBinding;
DataInputSelectorBinding.prototype.constructor=DataInputSelectorBinding;
DataInputSelectorBinding.superclass=DataInputBinding.prototype;
DataInputSelectorBinding.INDICATOR_IMAGE=null;
DataInputSelectorBinding.ACTION_SELECTIONCHANGED="datainputselectorselectionchanged";
function DataInputSelectorBinding(){
this.logger=SystemLogger.getLogger("DataInputSelectorBinding");
this._buttonBinding=null;
this._popupBinding=null;
this._menuBodyBinding=null;
this._selectionValue=null;
this.isDirty=false;
this._hasKeyboard=false;
this._isUpToDate=false;
this._selectedItemBinding=null;
this.crawlerFilters=new List([DocumentCrawler.ID,FocusCrawler.ID]);
this.value=null;
}
DataInputSelectorBinding.prototype.toString=function(){
return "[DataInputSelectorBinding]";
};
DataInputSelectorBinding.prototype.onBindingDispose=SelectorBinding.prototype.onBindingDispose;
DataInputSelectorBinding.prototype._buildDOMContent=function(){
DataInputSelectorBinding.superclass._buildDOMContent.call(this);
this.buildButton();
this.buildPopup();
this.buildSelections();
};
DataInputSelectorBinding.prototype.onBindingAttach=function(){
DataInputSelectorBinding.superclass.onBindingAttach.call(this);
var _8f5=this.getProperty("image");
if(_8f5){
this.setImage(_8f5);
}
var self=this;
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.DOUBLECLICK,{handleEvent:function(e){
if(self.isReadOnly){
self.shadowTree.input.value=self.value;
self.setReadOnly(false);
self.focus();
}
}});
};
DataInputSelectorBinding.prototype.buildButton=function(){
var _8f8=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8f8.popupBindingTargetElement=this.shadowTree.input;
_8f8.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8f8.attach();
var self=this;
_8f8.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8f8;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8fb=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8fb).each(function(_8fc){
if(_8fc.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8fd=_8fc.getAttribute("value");
var _8fe=_8fc.getAttribute("selected");
var _8ff=_8fc.getAttribute("tooltip");
list.add({value:_8fd?_8fd:null,toolTip:_8ff?_8ff:null,isSelected:(_8fe&&_8fe=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _901=this._menuBodyBinding;
var _902=_901.bindingDocument;
while(_901.bindingElement.hasChildNodes()){
var node=_901.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_901.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _904=this.getProperty("emptyentrylabel");
if(_904){
var _905=MenuItemBinding.newInstance(_902);
_905.setLabel(_904);
_905.selectionValue="";
_901.add(_905);
}
while(list.hasNext()){
var _906=list.getNext();
var _905=MenuItemBinding.newInstance(_902);
_905.setLabel(_906.label?_906.label:_906.value);
_905.selectionValue=_906.value;
if(_906.image){
_905.setImage(_906.image);
}
if(_906.toolTip){
_905.setToolTip(_906.toolTip);
}
if(_906.isSelected){
this.select(_905,true);
}
_901.add(_905);
}
}else{
this._buttonBinding.hide();
}
};
DataInputSelectorBinding.prototype.handleAction=SelectorBinding.prototype.handleAction;
DataInputSelectorBinding.prototype._onButtonCommand=function(){
this.focus();
this._restoreSelection();
this.dispatchAction(SelectorBinding.ACTION_COMMAND);
};
DataInputSelectorBinding.prototype._onPopupShowing=function(){
this._fitMenuToSelector();
this._restoreSelection();
this._releaseKeyboard();
};
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_907){
this.select(_907);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_908,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_908,arg);
switch(_908){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_908,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_90a){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_90a);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_90b){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_90b);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _90c=this.bindingElement.offsetWidth+"px";
var _90d=this._popupBinding.bindingElement;
_90d.style.minWidth=_90c;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _90e=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _90f=this.getValue();
var _910=null;
_90e.each(function(item){
if(item.getLabel()==_90f){
_910=item;
}
});
if(_910){
_910.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_913){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_913){
this.dirty();
this.dispatchAction(DataInputSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
this.shadowTree.input.focus();
};
DataInputSelectorBinding.prototype._attachSelections=SelectorBinding.prototype._attachSelections;
DataInputSelectorBinding.prototype.setResult=DataInputSelectorBinding.prototype.setValue;
DataInputSelectorBinding.prototype.onblur=function(){
DataInputSelectorBinding.superclass.onblur.call(this);
if(!self.isReadOnly){
this.setValue(this.getValue());
}
};
DataInputSelectorBinding.prototype.setValue=function(_914){
var _915=this.isReadOnly;
var _916=null;
if(_914!=null&&_914!=""){
var _917=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_917.hasNext()){
var item=_917.getNext();
if(item.selectionValue==_914){
_916=item.getLabel();
break;
}
}
}
if(_916!=null){
this.value=_914;
this.shadowTree.input.value=_916;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_914);
if(this.isReadOnly){
this.setReadOnly(false);
}
}
};
DataInputSelectorBinding.prototype.getValue=function(){
if(this.isReadOnly){
result=this.value;
}else{
result=DataInputSelectorBinding.superclass.getValue.call(this);
}
return result;
};
DataInputSelectorBinding.prototype.setImage=function(url){
var _91a="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_91a);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_91a);
}
};
DataInputSelectorBinding.prototype.setAlphaTransparentBackdrop=function(url){
if(this.shadowTree.input){
if(url!=false){
url=Resolver.resolve(url);
if(Client.isExplorer6){
this.shadowTree.inputy.style.filter=LabelBinding.EXPLORER_IMAGE_FILTER.replace("${url}",url);
}else{
this.shadowTree.input.style.backgroundImage="url('"+url+"')";
}
}else{
if(Client.isExplorer6){
this.shadowTree.input.style.filter="none";
}else{
this.shadowTree.input.style.backgroundImage="none";
}
}
}
};
DataInputDialogBinding.prototype=new DataInputBinding;
DataInputDialogBinding.prototype.constructor=DataInputDialogBinding;
DataInputDialogBinding.superclass=DataInputBinding.prototype;
function DataInputDialogBinding(){
this.logger=SystemLogger.getLogger("DataInputDialogBinding");
this._handle=null;
this._dialogButtonBinding=null;
this._isButtonClicked=false;
}
DataInputDialogBinding.prototype.toString=function(){
return "[DataInputDialogBinding]";
};
DataInputDialogBinding.prototype._buildDOMContent=function(){
DataInputSelectorBinding.superclass._buildDOMContent.call(this);
this.buildButton();
};
DataInputDialogBinding.prototype.buildButton=function(){
var _91c=ToolBarButtonBinding.newInstance(this.bindingDocument);
_91c.setImage("${icon:popup}");
this.addFirst(_91c);
_91c.attach();
var self=this;
_91c.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _91e=self.getProperty("handle");
var _91f=ViewDefinition.clone(_91e,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_91f instanceof DialogViewDefinition){
_91f.handler={handleDialogResponse:function(_920,_921){
self._isButtonClicked=false;
if(_920==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _922=_921.getFirst();
self.setValue(_922);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_91f.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_91f);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_91c.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_91c;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _924=this._dialogButtonBinding;
if(_924!=null){
_924.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _926=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_926=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _926;
};
UrlInputDialogBinding.prototype=new DataInputDialogBinding;
UrlInputDialogBinding.prototype.constructor=UrlInputDialogBinding;
UrlInputDialogBinding.superclass=DataInputDialogBinding.prototype;
UrlInputDialogBinding.URL_SELECTED="input link selected";
function UrlInputDialogBinding(){
this.logger=SystemLogger.getLogger("UrlInputDialogBinding");
this.editButtonBinding=null;
this.labelBinding=null;
}
UrlInputDialogBinding.prototype.toString=function(){
return "[UrlInputDialogBinding]";
};
UrlInputDialogBinding.prototype.onBindingRegister=function(){
UrlInputDialogBinding.superclass.onBindingRegister.call(this);
this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
};
UrlInputDialogBinding.prototype._buildDOMContent=function(){
UrlInputDialogBinding.superclass._buildDOMContent.call(this);
};
UrlInputDialogBinding.prototype.buildButtonAndLabel=function(){
if(this.shadowTree.labelInput==null){
this.shadowTree.labelInput=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
this.shadowTree.box.appendChild(this.shadowTree.labelInput);
this.shadowTree.labelInput.style.display="none";
this.shadowTree.labelInput.readOnly=true;
var self=this;
DOMEvents.addEventListener(this.shadowTree.labelInput,DOMEvents.DOUBLECLICK,{handleEvent:function(e){
self.clearLabel();
self.focus();
}});
}
if(this.editButtonBinding==null){
var _929=ToolBarButtonBinding.newInstance(this.bindingDocument);
_929.setImage("${icon:editor-sourceview}");
_929.bindingElement.style.left="1px";
_929.bindingElement.style.width="29px";
this.addFirst(_929);
_929.attach();
_929.hide();
var self=this;
_929.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_929;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_92a){
UrlInputDialogBinding.superclass.setValue.call(this,_92a);
if(this.isAttached){
this.compositeUrl=new Uri(_92a);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _92b=TreeService.GetCompositeUrlLabel(_92a);
if(_92b!=_92a){
this.setLabel(_92b);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_92c){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_92c){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_92c;
}else{
this.setReadOnly(false);
this.editButtonBinding.hide();
this.shadowTree.input.style.display="block";
this.shadowTree.labelInput.style.display="none";
}
}
};
UrlInputDialogBinding.prototype.clearLabel=function(){
this.setLabel();
};
DataInputButtonBinding.prototype=new DataInputBinding;
DataInputButtonBinding.prototype.constructor=DataInputButtonBinding;
DataInputButtonBinding.superclass=DataInputBinding.prototype;
function DataInputButtonBinding(){
this.logger=SystemLogger.getLogger("DataInputButtonBinding");
this._dialogButtonBinding=null;
}
DataInputButtonBinding.prototype.toString=function(){
return "[DataInputButtonBinding]";
};
DataInputButtonBinding.prototype.onBindingAttach=function(){
DataInputButtonBinding.superclass.onBindingAttach.call(this);
if(this.hasCallBackID()){
Binding.dotnetify(this);
}
};
DataInputButtonBinding.prototype._buildDOMContent=function(){
DataInputSelectorBinding.superclass._buildDOMContent.call(this);
this.buildButton();
};
DataInputButtonBinding.prototype.buildButton=function(){
var _92d=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _92e=this.getProperty("image");
if(_92e!=null){
_92d.setImage(_92e);
}else{
_92d.setImage("${icon:popup}");
}
this.addFirst(_92d);
_92d.attach();
var self=this;
_92d.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_92d;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _930=this._dialogButtonBinding;
if(_930!=null){
_930.oncommand();
}
};
DataDialogBinding.prototype=new DataBinding;
DataDialogBinding.prototype.constructor=DataDialogBinding;
DataDialogBinding.superclass=DataBinding.prototype;
DataDialogBinding.ACTION_COMMAND="datadialog command";
function DataDialogBinding(){
this.logger=SystemLogger.getLogger("DataDialogBinding");
this._buttonBinding=null;
this._handler=null;
this._map=null;
this._dialogViewHandle=null;
this._hasKeyboard=false;
this._hasFocus=false;
this.isRequired=false;
this._isValid=true;
}
DataDialogBinding.prototype.toString=function(){
return "[DataDialogBinding]";
};
DataDialogBinding.prototype.onBindingRegister=function(){
DataDialogBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["image"]=this.setImage;
this.propertyMethodMap["label"]=this.setLabel;
this.propertyMethodMap["tooltip"]=this.setToolTip;
this.propertyMethodMap["handle"]=this.setHandle;
this.propertyMethodMap["url"]=this.setURL;
this.propertyMethodMap["value"]=this.setValue;
};
DataDialogBinding.prototype.parseDOMProperties=function(){
var _931=this.getProperty("required")==true;
if(_931){
this.isRequired=true;
}
};
DataDialogBinding.prototype.onBindingAttach=function(){
DataDialogBinding.superclass.onBindingAttach.call(this);
Binding.imageProfile(this);
this._buildButton();
this.parseDOMProperties();
if(this.getProperty("handle")!=null||this.getProperty("url")){
this._buttonBinding.setImage("${icon:popup}");
this._buttonBinding.labelBinding.attachClassName("flipped");
}
this.bindingElement.tabIndex=0;
if(Client.isExplorer){
this.bindingElement.hideFocus=true;
}
};
DataDialogBinding.prototype._buildButton=function(){
var _932=this.getProperty("label");
var _933=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_932!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_932+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_932);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_933!=null){
this._buttonBinding.setToolTip(_933);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _934="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_934,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _936=g.getAttribute("viewBox"),_937=document.createDocumentFragment(),_938=g.cloneNode(true);
if(_936){
this.shadowTree.indicatorimage.setAttribute("viewBox",_936);
}
_937.appendChild(_938);
this.shadowTree.indicatorimage.appendChild(_937);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_939){
DataDialogBinding.superclass.handleAction.call(this,_939);
var _93a=_939.target;
var self=this;
switch(_939.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_93c,_93d){
if(_93c==Dialog.RESPONSE_ACCEPT){
if(_93d instanceof DataBindingMap){
self._map=_93d;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_93a==this._buttonBinding){
_939.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_93e,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_93e,arg);
switch(_93e){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _941=this.getProperty("handle");
var url=this.getURL();
var _943=null;
if(_941!=null||def!=null){
if(def!=null){
_943=def;
}else{
_943=ViewDefinitions[_941];
}
if(_943 instanceof DialogViewDefinition){
_943.handler=this._handler;
if(this._map!=null){
_943.argument=this._map;
}
StageBinding.presentViewDefinition(_943);
}
}else{
if(url!=null){
_943=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_943!=null){
this._dialogViewHandle=_943.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_944){
this.setProperty("label",_944);
if(this.isAttached){
this._buttonBinding.setLabel(_944+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_945){
this.setProperty("image",_945);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_945);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_946){
this.setProperty("tooltip",_946);
if(this.isAttached){
this._buttonBinding.setToolTip(_946);
}
};
DataDialogBinding.prototype.setHandle=function(_947){
this.setProperty("handle",_947);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_949){
this._handler=_949;
};
DataDialogBinding.prototype.focus=function(){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
FocusBinding.focusElement(this.bindingElement);
if(this.isFocused){
this._grabKeyboard();
}
}
};
DataDialogBinding.prototype.blur=function(){
if(this.isFocused){
DataBinding.prototype.blur.call(this);
if(this._hasKeyboard){
this._releaseKeyboard();
}
}
};
DataDialogBinding.prototype._grabKeyboard=function(){
if(!this._hasKeyboard){
this.subscribe(BroadcastMessages.KEY_SPACE);
this._hasKeyboard=true;
}
};
DataDialogBinding.prototype._releaseKeyboard=function(){
if(this._hasKeyboard){
this.unsubscribe(BroadcastMessages.KEY_SPACE);
this._hasKeyboard=false;
}
};
DataDialogBinding.prototype.validate=function(){
var _94a=true;
if(this.isRequired==true){
var _94b=this.getValue();
if(_94b==null||_94b==""){
_94a=false;
}
if(_94a!=this._isValid){
if(_94a){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_94a;
}
return _94a;
};
DataDialogBinding.prototype.manifest=function(){
};
DataDialogBinding.prototype.getValue=function(){
return null;
};
DataDialogBinding.prototype.getResult=function(){
return this._map;
};
DataDialogBinding.prototype.setResult=function(map){
if(map instanceof DataBindingMap){
this._map=map;
}else{
throw "Invalid argument";
}
};
DataDialogBinding.newInstance=function(_94d){
var _94e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_94d);
return UserInterface.registerBinding(_94e,DataDialogBinding);
};
PostBackDataDialogBinding.prototype=new DataDialogBinding;
PostBackDataDialogBinding.prototype.constructor=PostBackDataDialogBinding;
PostBackDataDialogBinding.superclass=DataDialogBinding.prototype;
PostBackDataDialogBinding.ACTION_COMMAND="postbackdialog command";
function PostBackDataDialogBinding(){
this.input=null;
return this;
}
PostBackDataDialogBinding.prototype.onBindingAttach=function(){
PostBackDataDialogBinding.superclass.onBindingAttach.call(this);
Binding.dotnetify(this);
var self=this;
this._handler={handleDialogResponse:function(_950,_951){
if(_950==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_951);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_952){
_952=new String(_952);
this.dirty();
this.setValue(encodeURIComponent(_952));
this.validate(true);
var self=this;
setTimeout(function(){
if(self.ondialogaccept!=null){
self.ondialogaccept();
}
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
},0);
};
PostBackDataDialogBinding.prototype._onDialogCancel=function(){
if(this.ondialogcancel!=null){
this.ondialogcancel();
}
};
PostBackDataDialogBinding.prototype.getURL=function(){
var url=this.getProperty("url");
var suf=this.getValue();
if(suf==null){
suf=this.getProperty("defaultValue");
}
return new String(url+suf);
};
PostBackDataDialogBinding.prototype.manifest=function(){
var _956=this.getValue();
if(_956==null){
_956="";
}
this.shadowTree.dotnetinput.value=_956;
};
PostBackDataDialogBinding.prototype.setValue=function(_957){
this.setProperty("value",_957);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_958){
};
PostBackDataDialogBinding.newInstance=function(_959){
var _95a=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_959);
return UserInterface.registerBinding(_95a,PostBackDataDialogBinding);
};
ViewDefinitionPostBackDataDialogBinding.prototype=new PostBackDataDialogBinding;
ViewDefinitionPostBackDataDialogBinding.prototype.constructor=ViewDefinitionPostBackDataDialogBinding;
ViewDefinitionPostBackDataDialogBinding.superclass=PostBackDataDialogBinding.prototype;
function ViewDefinitionPostBackDataDialogBinding(){
this.logger=SystemLogger.getLogger("ViewDefinitionPostBackDataDialogBinding");
return this;
}
ViewDefinitionPostBackDataDialogBinding.prototype.toString=function(){
return "[ViewDefinitionPostBackDataDialogBinding]";
};
ViewDefinitionPostBackDataDialogBinding.prototype.fireCommand=function(){
var _95b=this.getProperty("dialoglabel");
var _95c=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _95e=this.getProperty("handle");
var _95f=this.getProperty("selectedtoken");
if(_95e!=null){
var def=ViewDefinition.clone(_95e,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_95b!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_95b;
}
if(_95c!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_95c;
}
if(key!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].key=key;
}
if(_95f!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_95f;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_961){
var _962=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_961);
return UserInterface.registerBinding(_962,ViewDefinitionPostBackDataDialogBinding);
};
NullPostBackDataDialogBinding.prototype=new DataBinding;
NullPostBackDataDialogBinding.prototype.constructor=NullPostBackDataDialogBinding;
NullPostBackDataDialogBinding.superclass=DataBinding.prototype;
NullPostBackDataDialogBinding.LABEL_NULL="(No selection)";
NullPostBackDataDialogBinding.LABEL_DEFAULT="Select";
NullPostBackDataDialogBinding.VALUE_NULL="null";
NullPostBackDataDialogBinding.VALUE_SELECTED="selected";
NullPostBackDataDialogBinding.ACTION_COMMAND="nullpostbackdatadialog command";
function NullPostBackDataDialogBinding(){
this.logger=SystemLogger.getLogger("NullPostBackDataDialogBinding");
this._datathing=null;
this._selector=null;
return this;
}
NullPostBackDataDialogBinding.prototype.toString=function(){
return "[NullPostBackDataDialogBinding]";
};
NullPostBackDataDialogBinding.prototype.onBindingAttach=function(){
NullPostBackDataDialogBinding.superclass.onBindingAttach.call(this);
this.propertyMethodMap["label"]=this.setLabel;
var self=this;
this.propertyMethodMap["value"]=function(_964){
self._datathing.setValue(_964);
};
this.propertyMethodMap["selectorlabel"]=function(){
if(Application.isDeveloperMode){
alert("Selectorlabel property not supported yet!");
}
};
this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
this._buildDataDialog();
this._buildSelector();
};
NullPostBackDataDialogBinding.prototype._buildDataDialog=function(){
this._datathing=this.add(ViewDefinitionPostBackDataDialogBinding.newInstance(this.bindingDocument));
new List(["callbackid","handle","name","providersearch","providerkey","value"]).each(function(prop){
this._datathing.setProperty(prop,this.getProperty(prop));
this.setProperty(prop,null);
},this);
var self=this;
this._datathing.ondialogcancel=function(){
var _967=self.getValue();
if(_967==""||_967==null){
self._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
self._selector.setLabel(self.getLabel());
}
};
this._datathing.hide();
this._datathing.attach();
};
NullPostBackDataDialogBinding.prototype._buildSelector=function(){
this._selector=this.add(NullPostBackDataDialogSelectorBinding.newInstance(this.bindingDocument));
var _968=this.getProperty("value");
var _969=this.getProperty("selectorlabel");
if(_969==null){
_969=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_968==null));
list.add(new SelectorBindingSelection(_969+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_968!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _968=this.getValue();
if(_968==""||_968==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_96b){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_96b);
switch(_96b.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_96b.target==this._datathing){
var _96c=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_96c){
self._selector.setLabel(_96c);
}
},500);
_96b.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_96e){
this.setProperty("label",_96e);
if(this._selector!=null){
this._selector.setLabel(_96e);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_96f){
this._datathing.setValue(_96f);
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
NullPostBackDataDialogBinding.prototype.action=function(){
new List(["selectedtoken"]).each(function(prop){
this._datathing.setProperty(prop,this.getProperty(prop));
},this);
this._datathing.fireCommand();
};
NullPostBackDataDialogBinding.prototype.validate=function(){
return true;
};
NullPostBackDataDialogBinding.prototype.manifest=function(){
};
NullPostBackDataDialogBinding.prototype.getResult=function(){
};
NullPostBackDataDialogBinding.prototype.setResult=function(){
};
NullPostBackDataDialogSelectorBinding.prototype=new SelectorBinding;
NullPostBackDataDialogSelectorBinding.prototype.constructor=NullPostBackDataDialogSelectorBinding;
NullPostBackDataDialogSelectorBinding.superclass=SelectorBinding.prototype;
function NullPostBackDataDialogSelectorBinding(){
this.logger=SystemLogger.getLogger("NullPostBackDataDialogSelectorBinding");
this.master=null;
return this;
}
NullPostBackDataDialogSelectorBinding.prototype.toString=function(){
return "[NullPostBackDataDialogSelectorBinding]";
};
NullPostBackDataDialogSelectorBinding.prototype.select=function(_971,_972){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_971,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_973){
this._buttonBinding.setLabel(_973);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_974){
this._buttonBinding.setToolTip(_974);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_975){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_975);
switch(_975.type){
case MenuItemBinding.ACTION_COMMAND:
var _976=_975.target;
var _977=this.master;
if(_976.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_976.getLabel());
setTimeout(function(){
_977.action();
},0);
}else{
if(_977.getValue()){
_977.dirty();
}
_977.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_978){
var _979=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_978);
return UserInterface.registerBinding(_979,NullPostBackDataDialogSelectorBinding);
};
MultiSelectorBinding.prototype=new DataBinding;
MultiSelectorBinding.prototype.constructor=MultiSelectorBinding;
MultiSelectorBinding.superclass=DataBinding.prototype;
MultiSelectorBinding.DISPLAY_SELECTED="selected";
MultiSelectorBinding.DISPLAY_UNSELECTED="unselected";
MultiSelectorBinding.ACTION_COMMAND="multiselector command";
MultiSelectorBinding.ACTION_SELECTIONCHANGED="multiselector selection changed";
function MultiSelectorBinding(){
this.logger=SystemLogger.getLogger("MultiSelectorBinding");
this.isEditable=true;
this.isSelectable=false;
this._dataDialogBinding=null;
this.selections=null;
this._selectionMap=null;
this._display=MultiSelectorBinding.DISPLAY_SELECTED;
this._lastSelectedElement=null;
this.crawlerFilters=new List([DocumentCrawler.ID,FocusCrawler.ID]);
}
MultiSelectorBinding.prototype.toString=function(){
return "[MultiSelectorBinding]";
};
MultiSelectorBinding.prototype.onBindingAttach=function(){
MultiSelectorBinding.superclass.onBindingAttach.call(this);
this.selections=this._getSelectionsList();
this.addActionListener(DataDialogBinding.ACTION_COMMAND);
this.addActionListener(MultiSelectorDataDialogBinding.ACTION_RESULT);
this.addEventListener(DOMEvents.MOUSEDOWN);
this._buildDOMContent();
this._parseDOMProperties();
this.populateFromList(this.selections);
var _97a=this._dataDialogBinding;
if(_97a!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_97a.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _97b=this.getProperty("editable");
var _97c=this.getProperty("selectable");
var _97d=this.getProperty("display");
if(_97b!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_97c){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_97d){
this._display=_97d;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _97e=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_97e.selections=this.selections;
this.add(_97e);
_97e.attach();
this._dataDialogBinding=_97e;
this.shadowTree.datadialog=_97e;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _980=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _981=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_980=_981.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_980=_981.isSelected!=true;
break;
}
if(_980){
this.shadowTree.box.appendChild(this._getElementForSelection(_981));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_983){
var box=this.shadowTree.box;
var _985=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _986=list.getNext();
if(_983){
_986.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_985=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_985=_986.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_985=_986.isSelected!=true;
break;
}
}
if(_985){
var _987=this._getElementForSelection(_986);
box.insertBefore(_987,box.firstChild);
CSSUtil.attachClassName(_987,"selected");
this._selectionMap.set(_986.value,_987);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_988){
var _989=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_989.appendChild(this.bindingDocument.createTextNode(_988.label));
_989.setAttribute("label",_988.label);
_989.setAttribute("value",_988.value);
return _989;
};
MultiSelectorBinding.prototype.hasHighlight=function(){
return this._selectionMap&&this._selectionMap.hasEntries();
};
MultiSelectorBinding.prototype.handleEvent=function(e){
MultiSelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!this.isFocused){
this.focus();
}
if(this.isSelectable){
var _98b=DOMEvents.getTarget(e);
var _98c=DOMUtil.getLocalName(_98b);
if(_98c=="div"){
this._handleMouseDown(_98b);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_98d){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _98e=this._getElements();
var _98f=_98d.getAttribute("value");
var _990=this._lastSelectedElement.getAttribute("value");
var _991=false;
while(_98e.hasNext()){
var el=_98e.getNext();
switch(el.getAttribute("value")){
case _98f:
case _990:
_991=!_991;
break;
}
if(_991){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_98d);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_98d)){
this._unhilite(_98d);
}else{
this._hilite(_98d);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_98d){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_98d;
};
MultiSelectorBinding.prototype._hilite=function(_995){
var _996=_995.getAttribute("value");
if(!this._selectionMap.has(_996)){
CSSUtil.attachClassName(_995,"selected");
this._selectionMap.set(_996,_995);
}
};
MultiSelectorBinding.prototype._unhilite=function(_997){
var _998=_997.getAttribute("value");
if(this._selectionMap.has(_998)){
CSSUtil.detachClassName(_997,"selected");
this._selectionMap.del(_998);
}
};
MultiSelectorBinding.prototype._isHilited=function(_999){
return CSSUtil.hasClassName(_999,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_99a){
MultiSelectorBinding.superclass.handleAction.call(this,_99a);
var _99b=_99a.target;
switch(_99a.type){
case DataDialogBinding.ACTION_COMMAND:
if(_99b==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_99a.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_99b.result);
this.dirty();
_99b.result=null;
_99a.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _99c=null;
if(this.isSelectable){
_99c=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_99e){
if(self._isHilited(_99e)){
_99e.parentNode.removeChild(_99e);
_99c.add(new SelectorBindingSelection(_99e.getAttribute("label"),_99e.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _99c;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9a0=this._getElements();
if(!isUp){
_9a0.reverse();
}
var _9a1=true;
while(_9a1&&_9a0.hasNext()){
var _9a2=_9a0.getNext();
if(this._isHilited(_9a2)){
switch(isUp){
case true:
if(_9a2.previousSibling){
_9a2.parentNode.insertBefore(_9a2,_9a2.previousSibling);
}else{
_9a1=false;
}
break;
case false:
if(_9a2.nextSibling){
_9a2.parentNode.insertBefore(_9a2,_9a2.nextSibling.nextSibling);
}else{
_9a1=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9a3=new List();
var _9a4=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a6){
var _9a7=new SelectorBindingSelection(_9a6.getAttribute("label"),_9a6.getAttribute("value"),_9a4);
_9a7.isHighlighted=self._isHilited(_9a6);
_9a3.add(_9a7);
});
return _9a3;
};
MultiSelectorBinding.prototype._getElements=function(){
if(!this.shadowTree.box){
return new List();
}
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _9a8=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9a8.hasEntries()){
_9a8.each(function(_9a9){
_9a9.parentNode.removeChild(_9a9);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9aa=this.selections.getNext();
if(_9aa.isSelected){
var _9ab=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9ab.name=this._name;
_9ab.value=_9aa.value;
this.bindingElement.appendChild(_9ab);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9ac){
alert(_9ac);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9ad){
alert("TODO: MultiSelectorBinding#setResult");
};
HTMLDataDialogBinding.prototype=new PostBackDataDialogBinding;
HTMLDataDialogBinding.prototype.constructor=HTMLDataDialogBinding;
HTMLDataDialogBinding.superclass=PostBackDataDialogBinding.prototype;
function HTMLDataDialogBinding(){
this.logger=SystemLogger.getLogger("HTMLDataDialogBinding");
}
HTMLDataDialogBinding.prototype.toString=function(){
return "[HTMLDataDialogBinding]";
};
HTMLDataDialogBinding.prototype.onBindingAttach=function(){
if(this.getProperty("label")==null){
this.setProperty("label","Edit HTML");
}
HTMLDataDialogBinding.superclass.onBindingAttach.call(this);
};
HTMLDataDialogBinding.prototype.fireCommand=function(){
this.dispatchAction(DataDialogBinding.ACTION_COMMAND);
var _9ae={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9af=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9af.handler=this._handler;
_9af.argument=_9ae;
StageBinding.presentViewDefinition(_9af);
this._releaseKeyboard();
};
MultiSelectorDataDialogBinding.prototype=new DataDialogBinding;
MultiSelectorDataDialogBinding.prototype.constructor=MultiSelectorDataDialogBinding;
MultiSelectorDataDialogBinding.superclass=DataDialogBinding.prototype;
MultiSelectorDataDialogBinding.ACTION_RESULT="multiselectordatadialog result";
function MultiSelectorDataDialogBinding(){
this.logger=SystemLogger.getLogger("MultiSelectorDataDialogBinding");
this._dialogViewHandle="Composite.Management.MultiSelectorDialog";
this.isFocusable=false;
this.selections=null;
return this;
}
MultiSelectorDataDialogBinding.prototype.toString=function(){
return "[MultiSelectorDataDialogBinding]";
};
MultiSelectorDataDialogBinding.prototype.onBindingAttach=function(){
this.setProperty("label",StringBundle.getString("ui","Website.Misc.MultiSelector.LabelEditSelections"));
MultiSelectorDataDialogBinding.superclass.onBindingAttach.call(this);
};
MultiSelectorDataDialogBinding.prototype.fireCommand=function(){
this.dispatchAction(DataDialogBinding.ACTION_COMMAND);
var _9b0={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9b2={handleDialogResponse:function(_9b3,_9b4){
if(_9b3==Dialog.RESPONSE_ACCEPT){
self.result=_9b4;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b5=ViewDefinitions[this._dialogViewHandle];
_9b5.handler=_9b2;
_9b5.argument=_9b0;
StageBinding.presentViewDefinition(_9b5);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b6){
var _9b7=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b6);
return UserInterface.registerBinding(_9b7,MultiSelectorDataDialogBinding);
};
LazyBindingSetBinding.prototype=new Binding;
LazyBindingSetBinding.prototype.constructor=LazyBindingSetBinding;
LazyBindingSetBinding.superclass=Binding.prototype;
function LazyBindingSetBinding(){
this.logger=SystemLogger.getLogger("LazyBindingSetBinding");
}
LazyBindingSetBinding.prototype.toString=function(){
return "[LazyBindingSetBinding]";
};
LazyBindingBinding.prototype=new DataBinding;
LazyBindingBinding.prototype.constructor=LazyBindingBinding;
LazyBindingBinding.superclass=DataBinding.prototype;
LazyBindingBinding.ID_APPENDIX="lazybinding";
LazyBindingBinding.wakeUp=function(_9b8){
var id=_9b8.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9ba=_9b8.bindingDocument.getElementById(id);
if(_9ba!=null){
var _9bb=UserInterface.getBinding(_9ba);
_9bb.setResult(true);
}
};
function LazyBindingBinding(){
this.logger=SystemLogger.getLogger("LazyBindingBinding");
this.isFocusable=false;
this._isLazy=false;
}
LazyBindingBinding.prototype.toString=function(){
return "[LazyBindingBinding]";
};
LazyBindingBinding.prototype.onBindingRegister=function(){
LazyBindingBinding.superclass.onBindingRegister.call(this);
var id=this.getProperty("bindingid");
if(id!=null){
var _9bd=this.bindingDocument.getElementById(id);
if(_9bd!=null){
var _9be=UserInterface.getBinding(_9bd);
if(_9be&&!_9be.isAttached){
_9be.isLazy=true;
}else{
_9bd.setAttribute("lazy",true);
}
}
}
};
LazyBindingBinding.prototype.validate=function(){
return true;
};
LazyBindingBinding.prototype.manifest=function(){
if(this.isAttached){
if(this.shadowTree.input==null){
this.shadowTree.input=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
this.shadowTree.input.type="hidden";
this.shadowTree.input.name=this.getName();
this.bindingElement.appendChild(this.shadowTree.input);
}
this.shadowTree.input.value=this.getValue();
}
};
LazyBindingBinding.prototype.getValue=function(){
return String(this._isLazy);
};
LazyBindingBinding.prototype.setValue=function(){
throw "Not implemented";
};
LazyBindingBinding.prototype.getResult=function(){
return this._isLazy;
};
LazyBindingBinding.prototype.setResult=function(_9bf){
this._isLazy=_9bf;
};
EditorDataBinding.prototype=new WindowBinding;
EditorDataBinding.prototype.constructor=EditorDataBinding;
EditorDataBinding.superclass=WindowBinding.prototype;
function EditorDataBinding(){
this.logger=SystemLogger.getLogger("EditorDataBinding");
this.isFocusable=false;
this._url=WindowBinding.DEFAULT_URL;
this.isDirty=false;
return this;
}
EditorDataBinding.prototype.toString=function(){
return "[EditorDataBinding]";
};
EditorDataBinding.prototype.onBindingRegister=function(){
EditorDataBinding.superclass.onBindingRegister.call(this);
DataBinding.prototype.onBindingRegister.call(this);
this._coverBinding=this.add(CoverBinding.newInstance(this.bindingDocument)).attach();
var url=this._url;
var _9c1=this.getProperty("stateprovider");
var _9c2=this.getProperty("handle");
if(_9c1!=null&&_9c2!=null){
url=url.replace("${stateprovider}",_9c1).replace("${handle}",_9c2);
}else{
url=url.split("?")[0];
}
this.logger.debug("Loading URL: "+url);
this.setURL(url);
};
EditorDataBinding.prototype.onBindingAttach=function(){
EditorDataBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DIRTY);
Application.lock(this);
};
EditorDataBinding.prototype._onPageInitialize=function(_9c3){
EditorDataBinding.superclass._onPageInitialize.call(this,_9c3);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9c4){
EditorDataBinding.superclass.handleAction.call(this,_9c4);
switch(_9c4.type){
case Binding.ACTION_DIRTY:
if(_9c4.target!=this){
if(!this.isDirty){
this.dirty();
}
_9c4.consume();
}
break;
}
};
EditorDataBinding.prototype.manifest=function(){
};
EditorDataBinding.prototype.dirty=function(){
if(!this.isDirty){
this.isDirty=true;
this.dispatchAction(Binding.ACTION_DIRTY);
}
};
EditorDataBinding.prototype.clean=function(){
this._pageBinding.cleanAllDataBindings();
DataBinding.prototype.clean.call(this);
};
EditorDataBinding.prototype.focus=function(){
};
EditorDataBinding.prototype.blur=function(){
};
EditorDataBinding.prototype.getName=function(){
};
EditorDataBinding.prototype.getValue=function(){
};
EditorDataBinding.prototype.setValue=function(_9c5){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c6){
};
FunctionEditorDataBinding.prototype=new EditorDataBinding;
FunctionEditorDataBinding.prototype.constructor=FunctionEditorDataBinding;
FunctionEditorDataBinding.superclass=EditorDataBinding.prototype;
function FunctionEditorDataBinding(){
this.logger=SystemLogger.getLogger("FunctionEditorDataBinding");
this._url="${root}/content/misc/editors/functioncalleditor/functioncalleditor.aspx?StateProvider=${stateprovider}&Handle=${handle}";
this.hasBasic=false;
return this;
}
FunctionEditorDataBinding.prototype.toString=function(){
return "[FunctionEditorDataBinding]";
};
FunctionEditorDataBinding.prototype.onBindingAttach=function(){
FunctionEditorDataBinding.superclass.onBindingAttach.call(this);
if(this.getProperty("hasbasic")){
this.hasBasic=this.getProperty("hasbasic");
}
};
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9c7){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9c7);
if(this.hasBasic===false){
var _9c8=this.getContentWindow().bindingMap.basicgroup;
if(_9c8){
_9c8.hide();
}
}
};
ParameterEditorDataBinding.prototype=new EditorDataBinding;
ParameterEditorDataBinding.prototype.constructor=ParameterEditorDataBinding;
ParameterEditorDataBinding.superclass=EditorDataBinding.prototype;
function ParameterEditorDataBinding(){
this.logger=SystemLogger.getLogger("ParameterEditorDataBinding");
this._url="${root}/controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionParameterEditor.aspx?StateProvider=${stateprovider}&handle=${handle}";
return this;
}
ParameterEditorDataBinding.prototype.toString=function(){
return "[ParameterEditorDataBinding]";
};
ParameterEditorDataBinding.prototype.getValue=function(){
return Math.random();
};
FilePickerBinding.prototype=new DataBinding;
FilePickerBinding.prototype.constructor=FilePickerBinding;
FilePickerBinding.superclass=DataBinding.prototype;
function FilePickerBinding(){
this.logger=SystemLogger.getLogger("FilePickerBinding");
this.isReadOnly=true;
this._isValid=true;
return this;
}
FilePickerBinding.prototype.toString=function(){
return "[FilePickerBinding]";
};
FilePickerBinding.prototype.onBindingAttach=function(){
FilePickerBinding.superclass.onBindingAttach.call(this);
var real=this.getDescendantElementsByLocalName("input").getLast();
var fake=this.getDescendantBindingByLocalName("datainput");
fake.isFocusable=false;
var self=this;
real.onchange=function(){
var val=this.value;
if(val.indexOf("/")>-1){
val=val.substring(val.lastIndexOf("/")+1);
}else{
if(val.indexOf("\\")>-1){
val=val.substring(val.lastIndexOf("\\")+1);
}
}
fake.setValue(val);
self.dirty();
if(!self._isValid){
self.validate();
}
};
};
FilePickerBinding.prototype.validate=function(){
var _9cd=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9cd=fake.getValue()!="";
}
if(!_9cd&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9cd&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9cd;
};
FilePickerBinding.prototype.focus=function(){
FilePickerBinding.superclass.focus.call(this);
if(this.isFocused){
var fake=this.getDescendantBindingByLocalName("datainput");
if(fake!=null){
fake.attachClassName(DataBinding.CLASSNAME_FOCUSED);
}
}
};
FilePickerBinding.prototype.blur=function(){
FilePickerBinding.superclass.blur.call(this);
if(!this.isFocused){
var fake=this.getDescendantBindingByLocalName("datainput");
if(fake!=null){
fake.detachClassName(DataBinding.CLASSNAME_FOCUSED);
}
}
};
FilePickerBinding.prototype.manifest=function(){
};
FilePickerBinding.prototype.getValue=function(){
};
FilePickerBinding.prototype.setValue=function(){
};
FilePickerBinding.prototype.getResult=function(){
};
FilePickerBinding.prototype.setResult=function(){
};
RequestBinding.prototype=new Binding;
RequestBinding.prototype.constructor=RequestBinding;
RequestBinding.superclass=Binding.prototype;
RequestBinding.CALLBACK_ID="__REQUEST";
RequestBinding.INPUT_ID="__CONSOLEID";
function RequestBinding(){
this.logger=SystemLogger.getLogger("RequestBinding");
return this;
}
RequestBinding.prototype.toString=function(){
return "[RequestBinding]";
};
RequestBinding.prototype.onBindingAttach=function(){
RequestBinding.superclass.onBindingAttach.call(this);
this.setCallBackID(RequestBinding.CALLBACK_ID);
Binding.dotnetify(this);
var _9d1=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9d1!=null){
_9d1.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9d2){
_9d2=_9d2!=null?_9d2:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9d2;
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
FieldGroupBinding.prototype=new Binding;
FieldGroupBinding.prototype.constructor=FieldGroupBinding;
FieldGroupBinding.superclass=Binding.prototype;
FieldGroupBinding.ACTION_HIDE="fieldgrouphide";
FieldGroupBinding.CLASSNAME_NOLABEL="nolabel";
FieldGroupBinding.CLASSNAME_FIRST="first";
function FieldGroupBinding(){
this.logger=SystemLogger.getLogger("FieldGroupBinding");
}
FieldGroupBinding.prototype.toString=function(){
return "[FieldGroupBinding]";
};
FieldGroupBinding.prototype.onBindingRegister=function(){
FieldGroupBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["label"]=this.setLabel;
this._buildDOMContent();
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9d3=this.getProperty("label");
if(_9d3){
this.setLabel(_9d3);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
var _9d4=this.bindingElement.getElementsByTagName("field");
if(!_9d4.length){
_9d4=this.bindingElement.getElementsByTagName("ui:field");
}
var _9d5=_9d4[0];
var _9d6=_9d4[_9d4.length-1];
if(_9d5){
_9d5.className+=" "+"first";
}
if(_9d6){
_9d6.className+=" "+"last";
}
};
FieldGroupBinding.prototype.setLabel=function(_9d7){
this.setProperty("label",_9d7);
if(this.shadowTree.labelBinding==null){
var _9d8=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d8.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d8.bindingElement,this.bindingElement.firstChild);
_9d8.attach();
this.shadowTree.labelBinding=_9d8;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9d7));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldBinding.prototype=new Binding;
FieldBinding.prototype.constructor=FieldBinding;
FieldBinding.superclass=Binding.prototype;
function FieldBinding(){
this.logger=SystemLogger.getLogger("FieldBinding");
this.bindingRelation=null;
return this;
}
FieldBinding.prototype.toString=function(){
return "[FieldBinding]";
};
FieldBinding.prototype.onBindingRegister=function(){
FieldBinding.superclass.onBindingRegister.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
var _9da=this.getProperty("relation");
if(_9da!=null){
this.bindingRelation=_9da;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9db,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9db,arg);
switch(_9db){
case BroadcastMessages.BINDING_RELATE:
if(arg.relate==this.bindingRelation&&arg.origin==this.bindingDocument){
if(arg.result==true){
if(!this.isVisible){
this.show();
this.dispatchAction(Binding.ACTION_UPDATED);
}
}else{
if(this.isVisible){
this.hide();
this.dispatchAction(Binding.ACTION_UPDATED);
}
}
}
break;
}
};
FieldBinding.newInstance=function(_9dd){
var _9de=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9dd);
return UserInterface.registerBinding(_9de,FieldBinding);
};
FieldsBinding.prototype=new Binding;
FieldsBinding.prototype.constructor=FieldsBinding;
FieldsBinding.superclass=Binding.prototype;
FieldsBinding.ACTION_LAYOUT_UPDATED="fieldslayoutupdated";
function FieldsBinding(){
this.logger=SystemLogger.getLogger("FieldsBinding");
this._invalidCount=0;
this._invalidFieldLabels=null;
this.crawlerFilters=new List([FlexBoxCrawler.ID,FitnessCrawler.ID]);
return this;
}
FieldsBinding.prototype.toString=function(){
return "[FieldsBinding]";
};
FieldsBinding.prototype.onBindingRegister=function(){
FieldsBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_INVALID);
this.addActionListener(Binding.ACTION_VALID);
this.addActionListener(FieldGroupBinding.ACTION_HIDE);
this._invalidFieldLabels=new Map();
};
FieldsBinding.prototype.onBindingInitialize=function(){
FieldsBinding.superclass.onBindingInitialize.call(this);
this.bindingElement.style.display="block";
var _9df=this.getDescendantBindingByLocalName("fieldgroup");
if(_9df!=null){
_9df.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9e0=true;
var _9e1=this.getDescendantBindingsByLocalName("*");
while(_9e1.hasNext()){
var _9e2=_9e1.getNext();
if(Interfaces.isImplemented(IData,_9e2)){
var _9e3=_9e2.validate();
if(_9e0&&!_9e3){
_9e0=false;
}
}
}
return _9e0;
};
FieldsBinding.prototype.handleAction=function(_9e4){
FieldsBinding.superclass.handleAction.call(this,_9e4);
var _9e5=_9e4.target;
if(_9e5!=this){
switch(_9e4.type){
case Binding.ACTION_INVALID:
var _9e6=DataBinding.getAssociatedLabel(_9e5);
if(_9e6){
this._invalidFieldLabels.set(_9e5.key,_9e6);
}
if(_9e5.error){
if(!_9e5.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9e5.error},_9e5);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9e4.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9e5.key)){
this._invalidFieldLabels.del(_9e5.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9e4.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e7=null;
if(this._invalidFieldLabels.hasEntries()){
_9e7=this._invalidFieldLabels.toList();
}
return _9e7;
};
FieldsBinding.newInstance=function(_9e8){
var _9e9=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e8);
return UserInterface.registerBinding(_9e9,FieldsBinding);
};
FieldDescBinding.prototype=new Binding;
FieldDescBinding.prototype.constructor=FieldDescBinding;
FieldDescBinding.superclass=Binding.prototype;
function FieldDescBinding(){
this.logger=SystemLogger.getLogger("FieldDescBinding");
return this;
}
FieldDescBinding.prototype.toString=function(){
return "[FieldDescBinding]";
};
FieldDescBinding.prototype.onBindingAttach=function(){
Binding.prototype.onBindingAttach.call(this);
this.buildDOMContent();
this.attachDOMEvents();
};
FieldDescBinding.prototype.buildDOMContent=function(){
var _9ea=this.getProperty("image");
if(_9ea){
this.setImage(_9ea);
}
var _9eb=this.getProperty("tooltip");
if(_9eb){
this.setToolTip(_9eb);
}
var _9ec=this.getProperty("label");
if(_9ec){
this.setLabel(_9ec);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9ee=this.getAncestorBindingByLocalName("field");
if(_9ee){
var _9ef=true;
_9ee.getDescendantBindingsByLocalName("*").each(function(_9f0){
if(Interfaces.isImplemented(IData,_9f0)){
_9f0.focus();
_9ef=false;
}
return _9ef;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9f1){
this.setProperty("label",_9f1);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9f1);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9f2=this.getProperty("label");
if(!_9f2){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9f2=node.data;
}
}
return _9f2;
};
FieldDescBinding.prototype.setImage=function(_9f4){
this.setProperty("image",_9f4);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9f5){
this.setProperty("tooltip",_9f5);
if(this.isAttached){
this.bindingElement.title=_9f5;
}
};
FieldDescBinding.newInstance=function(_9f6){
var _9f7=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f6);
return UserInterface.registerBinding(_9f7,FieldDescBinding);
};
FieldDataBinding.prototype=new Binding;
FieldDataBinding.prototype.constructor=FieldDataBinding;
FieldDataBinding.superclass=Binding.prototype;
function FieldDataBinding(){
this.logger=SystemLogger.getLogger("FieldDataBinding");
return this;
}
FieldDataBinding.prototype.toString=function(){
return "[FieldDataBinding]";
};
FieldDataBinding.newInstance=function(_9f8){
var _9f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f8);
return UserInterface.registerBinding(_9f9,FieldDataBinding);
};
FieldHelpBinding.prototype=new Binding;
FieldHelpBinding.prototype.constructor=FieldHelpBinding;
FieldHelpBinding.superclass=Binding.prototype;
FieldHelpBinding.INDICATOR_IMAGE=null;
function FieldHelpBinding(){
this.logger=SystemLogger.getLogger("FieldHelpBinding");
return this;
}
FieldHelpBinding.prototype.toString=function(){
return "[FieldHelpBinding]";
};
FieldHelpBinding.prototype.onBindingAttach=function(){
FieldHelpBinding.superclass.onBindingAttach.call(this);
this.buildPopupBinding();
this.buildPopupButton();
};
FieldHelpBinding.prototype.onBindingDispose=function(){
FieldHelpBinding.superclass.onBindingDispose.call(this);
var _9fa=this._fieldHelpPopupBinding;
if(_9fa){
_9fa.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9fb=app.bindingMap.fieldhelpopupset;
var doc=_9fb.bindingDocument;
var _9fd=_9fb.add(PopupBinding.newInstance(doc));
var _9fe=_9fd.add(PopupBodyBinding.newInstance(doc));
_9fd.position=PopupBinding.POSITION_RIGHT;
_9fd.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9fe.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9ff=this.getProperty("label");
if(_9ff){
_9fe.bindingElement.innerHTML=Resolver.resolve(_9ff);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9fd;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a00=this.getAncestorBindingByLocalName("field");
if(_a00){
_a00.attachClassName("fieldhelp");
var _a01=ClickButtonBinding.newInstance(this.bindingDocument);
_a01.attachClassName("fieldhelp");
_a01.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a01);
_a01.attach();
var self=this;
_a01.oncommand=function(){
self.attachPopupBinding();
};
_a01.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a01;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a03=this._fieldHelpPopupBinding;
if(_a03&&!_a03.isAttached){
_a03.attachRecursive();
}
};
RadioDataGroupBinding.prototype=new RadioGroupBinding;
RadioDataGroupBinding.prototype.constructor=RadioDataGroupBinding;
RadioDataGroupBinding.superclass=RadioGroupBinding.prototype;
function RadioDataGroupBinding(){
this.logger=SystemLogger.getLogger("RadioDataGroupBinding");
this._name=null;
this.isDirty=false;
this._hasFocus=false;
this.isFocusable=true;
this.isFocused=false;
}
RadioDataGroupBinding.prototype.toString=function(){
return "[RadioDataGroupBinding]";
};
RadioDataGroupBinding.prototype.onBindingRegister=function(){
RadioDataGroupBinding.superclass.onBindingRegister.call(this);
DataBinding.prototype.onBindingRegister.call(this);
this.addActionListener(RadioGroupBinding.ACTION_SELECTIONCHANGED,this);
};
RadioDataGroupBinding.prototype.onBindingAttach=function(){
RadioDataGroupBinding.superclass.onBindingAttach.call(this);
this.bindingElement.tabIndex=0;
if(Client.isExplorer){
this.bindingElement.hideFocus=true;
}
var self=this;
DOMEvents.addEventListener(this.bindingElement,DOMEvents.FOCUS,{handleEvent:function(){
self.focus(true);
}});
};
RadioDataGroupBinding.prototype.onBindingDispose=function(){
RadioDataGroupBinding.superclass.onBindingDispose.call(this);
DataBinding.prototype.onBindingDispose.call(this);
};
RadioDataGroupBinding.prototype.handleAction=function(_a05){
RadioDataGroupBinding.superclass.handleAction.call(this,_a05);
switch(_a05.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.dirty();
break;
}
};
RadioDataGroupBinding.prototype.handleEvent=function(e){
RadioDataGroupBinding.superclass.handleEvent.call(this,e);
if(e.type==DOMEvents.KEYDOWN){
switch(e.keyCode){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
Keyboard.keyArrow(e.keyCode);
break;
}
}
};
RadioDataGroupBinding.prototype.handleBroadcast=function(_a07,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a07,arg);
switch(_a07){
case BroadcastMessages.KEY_ARROW:
var _a09=null;
var next=null;
var _a0b=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a0b=this.getChildBindingsByLocalName("radio");
while(!_a09&&_a0b.hasNext()){
var _a0c=_a0b.getNext();
if(_a0c.getProperty("ischecked")){
_a09=_a0c;
}
}
break;
}
if(_a09){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a0b.getFollowing(_a09);
while(next!=null&&next.isDisabled){
next=_a0b.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a0b.getPreceding(_a09);
while(next!=null&&next.isDisabled){
next=_a0b.getPreceding(next);
}
break;
}
}
if(next!=null){
this.setCheckedButtonBinding(next);
}
break;
}
};
RadioDataGroupBinding.prototype.setName=DataBinding.prototype.setName;
RadioDataGroupBinding.prototype.getName=DataBinding.prototype.getName;
RadioDataGroupBinding.prototype.dirty=DataBinding.prototype.dirty;
RadioDataGroupBinding.prototype.clean=DataBinding.prototype.clean;
RadioDataGroupBinding.prototype.focus=function(_a0d){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a0d){
FocusBinding.focusElement(this.bindingElement);
}
this.addEventListener(DOMEvents.KEYDOWN);
this.subscribe(BroadcastMessages.KEY_ARROW);
}
}
};
RadioDataGroupBinding.prototype.blur=function(){
if(this.isFocused){
DataBinding.prototype.blur.call(this);
this.removeEventListener(DOMEvents.KEYDOWN);
this.unsubscribe(BroadcastMessages.KEY_ARROW);
}
};
RadioDataGroupBinding.prototype.validate=function(){
return true;
};
RadioDataGroupBinding.prototype.manifest=function(){
if(this.isAttached){
if(!this.shadowTree.input){
var _a0e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0e.type="hidden";
_a0e.name=this._name;
this.bindingElement.appendChild(_a0e);
this.shadowTree.input=_a0e;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a0f=null;
var _a10=this.getChildBindingsByLocalName("radio");
while(!_a0f&&_a10.hasNext()){
var _a11=_a10.getNext();
if(_a11.isChecked){
_a0f=_a11.getProperty("value");
}
}
return _a0f;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a12){
};
RadioDataGroupBinding.prototype.setResult=function(_a13){
};
RadioDataBinding.prototype=new Binding;
RadioDataBinding.prototype.constructor=RadioDataBinding;
RadioDataBinding.superclass=Binding.prototype;
function RadioDataBinding(){
this.logger=SystemLogger.getLogger("RadioDataBinding");
this.isRadioButton=false;
this.isChecked=false;
this._result=null;
this.bindingRelate=null;
return this;
}
RadioDataBinding.prototype.toString=function(){
return "[RadioDataBinding]";
};
RadioDataBinding.prototype.onBindingRegister=function(){
RadioDataBinding.superclass.onBindingRegister.call(this);
this._buttonBinding=this.add(RadioButtonBinding.newInstance(this.bindingDocument));
this._hack();
if(this.getProperty("ischecked")==true){
this.check(true);
}
};
RadioDataBinding.prototype.onBindingAttach=function(){
RadioDataBinding.superclass.onBindingAttach.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
this._buttonBinding.attach();
this._buildDOMContent();
};
RadioDataBinding.prototype._buildDOMContent=function(){
var _a14=this.getProperty("relate");
var _a15=this.getProperty("oncommand");
var _a16=this.getProperty("isdisabled");
if(_a14){
this.bindingRelate=_a14;
this.relate();
}
if(_a15){
this.oncommand=function(){
Binding.evaluate(_a15,this);
};
}
if(_a16==true){
this.disable();
}
if(this.hasCallBackID()){
Binding.dotnetify(this);
}
this._buildLabelText();
};
RadioDataBinding.prototype.relate=function(){
if(this.bindingRelate!=null){
this.logger.warn("Relations not properly implemented!");
EventBroadcaster.broadcast(BroadcastMessages.BINDING_RELATE,{relate:this.bindingRelate,origin:this.bindingDocument,result:this.isChecked});
}
};
RadioDataBinding.prototype.getButton=function(){
return this._buttonBinding;
};
RadioDataBinding.prototype._hack=function(){
var self=this;
var _a18=this.getCallBackID();
this._buttonBinding.check=function(_a19){
RadioButtonBinding.prototype.check.call(this,_a19);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a1a){
RadioButtonBinding.prototype.uncheck.call(this,_a1a);
self.deleteProperty("ischecked");
self.isChecked=false;
self.relate();
};
this._buttonBinding.oncommand=function(){
self.isChecked=this.isChecked;
self.setProperty("ischecked",self.isChecked);
self.relate();
if(Types.isFunction(self.oncommand)){
self.oncommand();
}
};
};
RadioDataBinding.prototype.setChecked=function(_a1b,_a1c){
this._buttonBinding.setChecked(_a1b,_a1c);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a1b);
};
RadioDataBinding.prototype.check=function(_a1d){
this.setChecked(true,_a1d);
};
RadioDataBinding.prototype.uncheck=function(_a1e){
this.setChecked(false,_a1e);
};
RadioDataBinding.prototype.setDisabled=function(_a1f){
if(_a1f!=this.isDisabled){
this.isDisabled=_a1f;
this._buttonBinding.setDisabled(_a1f);
if(_a1f){
this.attachClassName(DataBinding.CLASSNAME_DISABLED);
}else{
this.detachClassName(DataBinding.CLASSNAME_DISABLED);
}
}
};
RadioDataBinding.prototype.disable=function(){
if(!this.isDisabled){
this.setDisabled(true);
}
};
RadioDataBinding.prototype.enable=function(){
if(this.isDisabled){
this.setDisabled(false);
}
};
RadioDataBinding.prototype.handleEvent=function(e){
RadioDataBinding.superclass.handleEvent.call(this,e);
if(e.type==DOMEvents.CLICK){
var _a21=DOMEvents.getTarget(e);
switch(_a21){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a22=this.getProperty("label");
if(_a22){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a22)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a23){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a23;
}
this.setProperty("label",_a23);
};
RadioDataBinding.prototype.handleElement=function(_a24){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a25){
var _a26=_a25.getAttribute("ischecked")==="true";
if(this.isChecked!=_a26){
this.setChecked(_a26,true);
}
return true;
};
CheckBoxBinding.prototype=new Binding;
CheckBoxBinding.prototype.constructor=CheckBoxBinding;
CheckBoxBinding.superclass=Binding.prototype;
CheckBoxBinding.ACTION_COMMAND="checkbox command";
function CheckBoxBinding(){
this.logger=SystemLogger.getLogger("CheckBoxBinding");
this._buttonBinding=null;
this._name=null;
this.isDirty=false;
this.isChecked=false;
this._result=null;
this.isFocusable=true;
this.isFocused=false;
}
CheckBoxBinding.prototype.toString=function(){
return "[CheckBoxBinding]";
};
CheckBoxBinding.prototype.onBindingRegister=function(){
CheckBoxBinding.superclass.onBindingRegister.call(this);
DataBinding.prototype.onBindingRegister.call(this);
this._buildButtonBinding();
};
CheckBoxBinding.prototype.onBindingAttach=function(){
CheckBoxBinding.superclass.onBindingAttach.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
this.bindingElement.tabIndex=0;
if(Client.isExplorer){
this.bindingElement.hideFocus=true;
}
this._buildDOMContent();
};
CheckBoxBinding.prototype.onBindingDispose=function(){
CheckBoxBinding.superclass.onBindingRegister.call(this);
DataBinding.prototype.onBindingDispose.call(this);
};
CheckBoxBinding.prototype._buildDOMContent=RadioDataBinding.prototype._buildDOMContent;
CheckBoxBinding.prototype.handleEvent=function(e){
CheckBoxBinding.superclass.handleEvent.call(this,e);
if(e.type==DOMEvents.CLICK){
var _a28=DOMEvents.getTarget(e);
switch(_a28){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a29,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a29,arg);
switch(_a29){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a2c){
_a2c.consume();
self.dispatchAction(CheckBoxBinding.ACTION_COMMAND);
}});
this._hack();
this._buttonBinding.attach();
if(this.getProperty("ischecked")){
this.check(true);
}
};
CheckBoxBinding.prototype._hack=function(){
var self=this;
var _a2e=this.getCallBackID();
this._buttonBinding.check=function(_a2f){
ButtonBinding.prototype.check.call(this,_a2f);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a2f){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a30){
ButtonBinding.prototype.uncheck.call(this,_a30);
self.setProperty("ischecked",false);
self.isChecked=false;
self.relate();
};
this._buttonBinding.oncommand=function(){
self.isChecked=this.isChecked;
self.setProperty("ischecked",self.isChecked);
self.focus();
self.relate();
if(self.oncommand){
self.oncommand();
}
self.dirty();
if(_a2e!=null){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
}
};
};
CheckBoxBinding.prototype.setChecked=RadioDataBinding.prototype.setChecked;
CheckBoxBinding.prototype.check=RadioDataBinding.prototype.check;
CheckBoxBinding.prototype.uncheck=RadioDataBinding.prototype.uncheck;
CheckBoxBinding.prototype._buildLabelText=RadioDataBinding.prototype._buildLabelText;
CheckBoxBinding.prototype.setLabel=RadioDataBinding.prototype.setLabel;
CheckBoxBinding.prototype.setName=DataBinding.prototype.setName;
CheckBoxBinding.prototype.getName=DataBinding.prototype.getName;
CheckBoxBinding.prototype.dirty=DataBinding.prototype.dirty;
CheckBoxBinding.prototype.clean=DataBinding.prototype.clean;
CheckBoxBinding.prototype.focus=function(){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
FocusBinding.focusElement(this.bindingElement);
this.subscribe(BroadcastMessages.KEY_SPACE);
}
}
};
CheckBoxBinding.prototype.blur=function(){
if(this.isFocused){
DataBinding.prototype.blur.call(this);
this.unsubscribe(BroadcastMessages.KEY_SPACE);
}
};
CheckBoxBinding.prototype.validate=function(){
var _a31=true;
var _a32=this.bindingElement.parentNode;
if(_a32){
var _a33=UserInterface.getBinding(_a32);
if(_a33&&_a33 instanceof CheckBoxGroupBinding){
if(_a33.isRequired){
if(_a33.isValid){
_a31=_a33.validate();
}else{
_a31=false;
}
}
}
}
return _a31;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a34=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a34.type="hidden";
_a34.name=this._name;
_a34.style.display="none";
this.bindingElement.appendChild(_a34);
this.shadowTree.input=_a34;
}
this.shadowTree.input.value=this.getValue();
break;
case false:
if(this.shadowTree.input){
this.bindingElement.removeChild(this.shadowTree.input);
this.shadowTree.input=null;
}
break;
}
}
};
CheckBoxBinding.prototype.getValue=function(){
var _a35=null;
var _a36=this.getProperty("value");
if(this.isChecked){
_a35=_a36?_a36:"on";
}
return _a35;
};
CheckBoxBinding.prototype.setValue=function(_a37){
if(_a37==this.getValue()||_a37=="on"){
this.check(true);
}else{
if(_a37!="on"){
this.setPropety("value",_a37);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a38=false;
if(this.isChecked){
_a38=this._result!=null?this._result:true;
}
return _a38;
};
CheckBoxBinding.prototype.setResult=function(_a39){
if(typeof _a39=="boolean"){
this.setChecked(_a39,true);
}else{
this._result=_a39;
}
};
CheckBoxBinding.newInstance=function(_a3a){
var _a3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a3a);
return UserInterface.registerBinding(_a3b,CheckBoxBinding);
};
CheckBoxGroupBinding.prototype=new Binding;
CheckBoxGroupBinding.prototype.constructor=CheckBoxGroupBinding;
CheckBoxGroupBinding.superclass=Binding.prototype;
function CheckBoxGroupBinding(){
this.logger=SystemLogger.getLogger("CheckBoxGroupBinding");
this.isRequired=false;
this.isValid=true;
}
CheckBoxGroupBinding.prototype.toString=function(){
return "[CheckBoxGroupBinding]";
};
CheckBoxGroupBinding.prototype.onBindingAttach=function(){
CheckBoxGroupBinding.superclass.onBindingAttach.call(this);
this.isRequired=this.getProperty("required")==true;
};
CheckBoxGroupBinding.prototype.validate=function(){
var _a3c=true;
if(this.isRequired){
var _a3d=this.getDescendantBindingsByLocalName("checkbox");
if(_a3d.hasEntries()){
_a3c=false;
while(_a3d.hasNext()&&!_a3c){
if(_a3d.getNext().isChecked){
_a3c=true;
}
}
}
if(_a3c==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a3c;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a3e){
if(_a3e){
if(!this._labelBinding){
var _a3f=LabelBinding.newInstance(this.bindingDocument);
_a3f.attachClassName("invalid");
_a3f.setImage("${icon:error}");
_a3f.setLabel("Selection required");
this._labelBinding=this.addFirst(_a3f);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a40){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a40);
switch(_a40.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a41){
var _a42=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a41);
return UserInterface.registerBinding(_a42,CheckBoxGroupBinding);
};
BalloonSetBinding.prototype=new Binding;
BalloonSetBinding.prototype.constructor=BalloonSetBinding;
BalloonSetBinding.superclass=Binding.prototype;
function BalloonSetBinding(){
this.logger=SystemLogger.getLogger("BalloonSetBinding");
}
BalloonSetBinding.prototype.toString=function(){
return "[BalloonSetBinding]";
};
BalloonBinding.prototype=new Binding;
BalloonBinding.prototype.constructor=BalloonBinding;
BalloonBinding.superclass=Binding.prototype;
BalloonBinding.TIMEOUT=parseInt(200);
BalloonBinding.OFFSET_X=parseInt(14);
BalloonBinding.OFFSET_Y=parseInt(6);
BalloonBinding.ACTION_SNAP="balloon snap";
BalloonBinding.CLASSNAME_LEFT="left";
BalloonBinding.ACTION_INITIALIZE="ballon initialize";
function BalloonBinding(){
this.logger=SystemLogger.getLogger("BalloonBinding");
this._snapTargetBinding=null;
this._environmentBinding=null;
return this;
}
BalloonBinding.prototype.toString=function(){
return "[BalloonBinding]";
};
BalloonBinding.prototype.onBindingAttach=function(){
BalloonBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_ACTIVATED);
this.addActionListener(ControlBinding.ACTION_COMMAND);
this._controlGroupBinding=this.add(ControlGroupBinding.newInstance(this.bindingDocument));
var _a43=DialogControlBinding.newInstance(this.bindingDocument);
_a43.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a43);
this._controlGroupBinding.attachRecursive();
var _a44=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a44);
var _a45=this.getLabel();
if(_a45!=null){
this.setLabel(_a45);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a46=this._snapTargetBinding;
if(Binding.exists(_a46)==true){
_a46.removeActionListener(Binding.ACTION_BLURRED,this);
_a46.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a47){
if(Interfaces.isImplemented(IData,_a47)){
this._snapTargetBinding=_a47;
var _a48=_a47.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a48&&_a48.isConsumed){
this._environmentBinding=_a48.listener;
}
if(this._environmentBinding){
_a47.addActionListener(Binding.ACTION_BLURRED,this);
_a47.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a47)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a47.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a4a=this._snapTargetBinding;
var _a4b=this._environmentBinding;
var root=UserInterface.getBinding(_a4a.bindingDocument.body);
if(Binding.exists(_a4a)&&Binding.exists(_a4b)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a4a.isAttached&&_a4b.isAttached){
var _a4d=_a4a.boxObject.getUniversalPosition();
var _a4e=_a4b.boxObject.getUniversalPosition();
_a4e.y+=_a4b.bindingElement.scrollTop;
_a4e.x+=_a4b.bindingElement.scrollLeft;
var tDim=_a4a.boxObject.getDimension();
var eDim=_a4b.boxObject.getDimension();
var _a51=false;
if(_a4d.y+tDim.h<_a4e.y){
_a51=true;
}else{
if(_a4d.x+tDim.w<_a4e.x){
_a51=true;
}else{
if(_a4d.y>_a4e.y+eDim.h){
_a51=true;
}else{
if(_a4d.x>_a4e.x+eDim.w){
_a51=true;
}
}
}
}
if(!_a51){
this._setComputedPosition(_a4d,_a4e,tDim,eDim);
if(!this.isVisible){
this.show();
}
}else{
if(this.isVisible==true){
this.hide();
}
}
}
}
}else{
this.dispose();
}
};
BalloonBinding.prototype._setComputedPosition=function(_a52,_a53,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a58=_a52;
var _a59=false;
if(_a52.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a59=true;
}else{
if(_a52.x+tDim.w>=_a53.x+eDim.w){
_a59=true;
}
}
if(_a59){
_a58.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a58.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a58.y-=(bDim.h);
_a58.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a58);
};
BalloonBinding.prototype.handleBroadcast=function(_a5a,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a5a,arg);
switch(_a5a){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a5c){
var _a5d=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a5c){
_a5d=true;
}
}
return _a5d;
};
BalloonBinding.prototype._setPosition=function(_a5f){
var _a60=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a60=true;
}
}
if(!_a60){
this.bindingElement.style.left=_a5f.x+"px";
this.bindingElement.style.top=_a5f.y+"px";
this._point=_a5f;
}
};
BalloonBinding.prototype._getPosition=function(){
return new Point(this.bindingElement.offsetLeft,this.bindingElement.offsetTop);
};
BalloonBinding.prototype._getDimension=function(){
return new Dimension(this.bindingElement.offsetWidth,this.bindingElement.offsetHeight);
};
BalloonBinding.prototype.hide=function(){
if(this.isVisible){
this.bindingElement.style.visibility="hidden";
this.isVisible=false;
}
};
BalloonBinding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.visibility="visible";
this.isVisible=true;
}
};
BalloonBinding.prototype.handleAction=function(_a62){
BalloonBinding.superclass.handleAction.call(this,_a62);
var _a63=_a62.target;
switch(_a62.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a62.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a63==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a63)){
self.dispose();
}else{
if(_a63.validate()){
var _a65=true;
if(_a62.type==Binding.ACTION_BLURRED){
var root=_a63.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a65=false;
}
}
if(_a65){
self.dispose();
}
}
}
},0);
}
break;
case ControlBinding.ACTION_COMMAND:
this.dispose();
break;
}
};
BalloonBinding.prototype.setLabel=function(_a68){
if(this.isAttached==true){
var _a69=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a68);
_a69.appendChild(text);
this.bindingElement.appendChild(_a69);
}
this.setProperty("label",_a68);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a6b){
var _a6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a6b);
var _a6d=UserInterface.registerBinding(_a6c,BalloonBinding);
_a6d.hide();
return _a6d;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a6e,_a6f){
if(Interfaces.isImplemented(IData,_a6f)==true){
var _a70,_a71=_a6f.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a71&&_a71.isConsumed){
switch(_a71.listener.constructor){
case StageBinding:
_a70=false;
break;
case StageDialogBinding:
_a70=true;
break;
}
}
var _a72=_a70?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a73=_a72.add(BalloonBinding.newInstance(top.app.document));
_a73.setLabel(_a6e.text);
_a73.snapTo(_a6f);
_a73.attach();
}
};
function ErrorBinding(){
this.logger=SystemLogger.getLogger("ErrorBinding");
return this;
}
ErrorBinding.prototype.toString=function(){
return "[ErrorBinding]";
};
ErrorBinding.prototype.onBindingAttach=function(){
ErrorBinding.superclass.onBindingAttach.call(this);
var _a74=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a77=_a74.getDataBinding(name);
if(_a77){
ErrorBinding.presentError({text:text},_a77);
}else{
alert("ErrorBinding dysfunction: No such DataBinding!\n"+name);
if(name.indexOf("_")>-1){
alert("Name contaings '_' - replace with '$' ?");
}
}
this.dispose();
};
FocusBinding.prototype=new FlexBoxBinding;
FocusBinding.prototype.constructor=FocusBinding;
FocusBinding.superclass=FlexBoxBinding.prototype;
FocusBinding.MARKER="focusbindingcurrentfocus";
FocusBinding.ACTION_ACTIVATED="focusmanager activated";
FocusBinding.ACTION_ATTACHED="focusmanager attached";
FocusBinding.ACTION_UPDATE="focusmanager update required";
FocusBinding.ACTION_FOCUS="focusmanager focus";
FocusBinding.ACTION_BLUR="focusmanager blur";
FocusBinding.focusElement=function(_a78){
var _a79=true;
try{
_a78.focus();
Application.focused(true);
}
catch(exception){
var _a7a=UserInterface.getBinding(_a78);
var _a7b=SystemLogger.getLogger("FocusBinding.focusElement");
_a7b.warn("Could not focus "+(_a7a?_a7a.toString():String(_a78)));
_a79=false;
}
return _a79;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a7c){
var win=_a7c.bindingWindow;
var id=_a7c.bindingElement.id;
return {getBinding:function(){
var _a7f=null;
try{
if(Binding.exists(_a7c)){
_a7f=win.bindingMap[id];
}
}
catch(exception){
}
return _a7f;
}};
};
FocusBinding.navigateNext=function(_a80){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a80);
}
};
FocusBinding.navigatePrevious=function(){
FocusBinding.navigateNext(true);
};
function FocusBinding(){
this.logger=SystemLogger.getLogger("FocusManangerBinding");
this._focusableList=null;
this._isUpToDate=false;
this._isFocusManager=true;
this.isStrongFocusManager=true;
this._cachedFocus=null;
this.isFlexible=false;
return this;
}
FocusBinding.prototype.toString=function(){
return "[FocusManangerBinding]";
};
FocusBinding.prototype.onBindingAttach=function(){
if(this.getProperty("focusmanager")==false){
this._isFocusManager=false;
}else{
if(this.getProperty("strongfocusmanager")==false){
this.isStrongFocusManager=false;
}
if(this._isFocusManager){
var _a81=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a81&&_a81.isConsumed){
if(_a81.listener.isStrongFocusManager){
this._isFocusManager=false;
}
}
if(this._isFocusManager){
this.addActionListener(Binding.ACTION_ACTIVATED);
this.addActionListener(Binding.ACTION_FOCUSED);
this.addActionListener(Binding.ACTION_BLURRED);
this.addActionListener(FocusBinding.ACTION_UPDATE);
this.addActionListener(FocusBinding.ACTION_FOCUS);
this.addActionListener(FocusBinding.ACTION_BLUR);
this.addActionListener(FocusBinding.ACTION_ATTACHED);
}
}
}
FocusBinding.superclass.onBindingAttach.call(this);
};
FocusBinding.prototype.onBindingDispose=function(){
FocusBinding.superclass.onBindingDispose.call(this);
if(FocusBinding.activeInstance==this){
FocusBinding.activeInstance=null;
}
};
FocusBinding.prototype.handleAction=function(_a82){
FocusBinding.superclass.handleAction.call(this,_a82);
var _a83=_a82.target;
var _a84=null;
if(this._isFocusManager){
switch(_a82.type){
case FocusBinding.ACTION_ATTACHED:
if(_a83!=this){
this._isUpToDate=false;
}
_a82.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a83!=this){
this._isUpToDate=false;
_a82.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a84=new FocusCrawler();
_a84.mode=FocusCrawler.MODE_BLUR;
_a84.crawl(_a83.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a82.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a83!=this){
_a84=new FocusCrawler();
_a84.mode=FocusCrawler.MODE_FOCUS;
_a84.crawl(_a83.bindingElement);
}
_a82.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a83)){
this.claimFocus();
this._onFocusableFocused(_a83);
}
_a82.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a83)){
this._onFocusableBlurred(_a83);
}
_a82.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a85){
var _a86=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a86==null&&list.hasNext()){
var _a88=list.getNext();
if(this._cachedFocus&&_a88==this._cachedFocus.getBinding()){
_a86=_a88;
}
}
if(_a86!=null){
if(_a88.isFocused){
var next=_a85?list.getPreceding(_a86):list.getFollowing(_a86);
if(!next){
next=_a85?list.getLast():list.getFirst();
}
next.focus();
}else{
_a86.focus();
}
}else{
list.getFirst().focus();
}
}
};
FocusBinding.prototype.claimFocus=function(){
FocusBinding.activeInstance=this;
};
FocusBinding.prototype._getFocusableList=function(){
if(!this._isUpToDate){
var _a8a=new FocusCrawler();
var list=new List();
_a8a.mode=FocusCrawler.MODE_INDEX;
_a8a.crawl(this.bindingElement,list);
this._focusableList=list;
this._isUpToDate=true;
}
return this._focusableList;
};
FocusBinding.prototype._focusFirstFocusable=function(){
if(this._isFocusManager&&this.isActivated){
var list=this._getFocusableList();
if(list!=null){
if(list.hasEntries()){
list.getFirst().focus();
}
}else{
this.logger.warn("Could not compute focusable list.");
}
}
};
FocusBinding.prototype._focusPreviouslyFocused=function(){
if(this._cachedFocus){
var _a8d=this._cachedFocus.getBinding();
if(_a8d&&!_a8d.isFocused){
_a8d.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a8e){
if(_a8e!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a8e;
_a8e.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a8e);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a8f){
_a8f.deleteProperty(FocusBinding.MARKER);
if(_a8f==FocusBinding.focusedBinding){
FocusBinding.focusedBinding=null;
}
};
TabsButtonBinding.prototype=new ButtonBinding;
TabsButtonBinding.prototype.constructor=TabsButtonBinding;
TabsButtonBinding.superclass=ButtonBinding.prototype;
TabsButtonBinding.RESERVED_SPACE=36;
TabsButtonBinding.NODENAME_TABBOX="tabbox";
TabsButtonBinding.CHAR_INDICATOR=String.fromCharCode(187);
function TabsButtonBinding(){
this.logger=SystemLogger.getLogger("TabsButtonBinding");
this.hiddenTabBindings=null;
this.menuItemBindings=null;
this.containingTabBoxBinding=null;
this.selectedTabBinding=null;
this.isVisible=false;
this.snapshotWindowWidth=null;
}
TabsButtonBinding.prototype.toString=function(){
return "[TabsButtonBinding]";
};
TabsButtonBinding.prototype.onBindingRegister=function(){
TabsButtonBinding.superclass.onBindingRegister.call(this);
this.hiddenTabBindings=new List();
this.menuItemBindings=new List();
};
TabsButtonBinding.prototype.buildDOMContent=function(){
TabsButtonBinding.superclass.buildDOMContent.call(this);
this.containingTabBoxBinding=this.getAncestorBindingByLocalName(this.constructor.NODENAME_TABBOX);
var span=this.bindingDocument.createElement("span");
span.appendChild(this.bindingDocument.createTextNode(TabsButtonBinding.CHAR_INDICATOR));
span.className="arrow";
this.labelBinding.bindingElement.appendChild(span);
};
TabsButtonBinding.prototype.show=function(_a91){
this.bindingElement.style.left=_a91+"px";
this.setLabel(this.hiddenTabBindings.getLength().toString());
TabsButtonBinding.superclass.show.call(this);
};
TabsButtonBinding.prototype.reset=function(){
if(this.menuItemBindings.hasEntries()){
while(this.menuItemBindings.hasNext()){
this.menuItemBindings.getNext().dispose();
}
}
this.hiddenTabBindings.clear();
this.menuItemBindings.clear();
this.selectedTabBinding=null;
this.isPopulated=false;
};
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a92){
this.hiddenTabBindings.add(_a92);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a93=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a93.getLabel());
item.setImage(_a93.getImage());
item.associatedTabBinding=_a93;
var self=this;
item.oncommand=function(){
self.selectedTabBinding=this.associatedTabBinding;
};
this.popupBinding.add(item);
this.menuItemBindings.add(item);
this.popupBinding.attachRecursive();
}
this.isPopulated=true;
}
this.popupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
TabsButtonBinding.superclass.fireCommand.call(this);
};
TabsButtonBinding.prototype.handleAction=function(_a96){
TabsButtonBinding.superclass.handleAction.call(this,_a96);
switch(_a96.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a97=this.selectedTabBinding;
if(_a97){
this.containingTabBoxBinding.moveToOrdinalPosition(_a97,0);
this.containingTabBoxBinding.select(_a97);
}
_a96.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a98){
var _a99=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a98);
_a99.setAttribute("type","checkbox");
_a99.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a99.className="tabbutton";
return UserInterface.registerBinding(_a99,TabsButtonBinding);
};
TabBoxBinding.prototype=new FlexBoxBinding;
TabBoxBinding.prototype.constructor=TabBoxBinding;
TabBoxBinding.superclass=FlexBoxBinding.prototype;
TabBoxBinding.ASSOCIATION_KEY="tabboxkey";
TabBoxBinding.ACTION_ATTACHED="tabbox attached";
TabBoxBinding.ACTION_SELECTED="tabbox selected";
TabBoxBinding.ACTION_UNSELECTED="tabbox unselected";
TabBoxBinding.ACTION_UPDATED="tabbox updated";
TabBoxBinding.UPDATE_ORDINAL="tabbox ordinalupdate";
TabBoxBinding.UPDATE_ATTACH="tabbox attachupdate";
TabBoxBinding.UPDATE_DETACH="tabbox detachupdate";
TabBoxBinding.INVALID_TAB_IMAGE="${icon:error}";
TabBoxBinding.BALLOON_TAB_IMAGE="${icon:balloon}";
EventBroadcaster.subscribe(BroadcastMessages.KEY_TAB,{handleBroadcast:function(){
if(Keyboard.isControlPressed){
var _a9a=TabBoxBinding.currentActiveInstance;
if(_a9a!=null&&Binding.exists(_a9a)){
}
}
}});
TabBoxBinding.currentActiveInstance=null;
function TabBoxBinding(){
this.logger=SystemLogger.getLogger("TabBoxBinding");
this._tabBoxPairs={};
this._selectedTabElement=null;
this._selectedTabBinding=null;
this._tabsElement=null;
this._tabPanelsElement=null;
this._attachedMemberCount=0;
this._isMembersAttached=false;
this.isEqualSize=false;
this._nodename_tab="tab";
this._nodename_tabs="tabs";
this._nodename_tabpanel="tabpanel";
this._nodename_tabpanels="tabpanels";
this._impl_tab=TabBinding;
this._impl_tabs=TabsBinding;
this._impl_tabpanel=TabPanelBinding;
this._impl_tabpanels=TabPanelsBinding;
this.updateType=null;
this._hasBastardUpdates=false;
return this;
}
TabBoxBinding.prototype.toString=function(){
return "[TabBoxBinding]";
};
TabBoxBinding.prototype.onBindingRegister=function(){
TabBoxBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_ATTACHED);
this.addActionListener(Binding.ACTION_DETACHED);
this.addActionListener(Binding.ACTION_ACTIVATED);
this.addActionListener(Binding.ACTION_FOCUSED);
this.addActionListener(PageBinding.ACTION_INITIALIZED);
DOMEvents.addEventListener(this.bindingDocument.documentElement,DOMEvents.AFTERUPDATE,this);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.AFTERUPDATE,this);
};
TabBoxBinding.prototype.onBindingAttach=function(){
TabBoxBinding.superclass.onBindingAttach.call(this);
TabBoxBinding.currentActiveInstance=this;
this._tabsElement=this.getTabsElement();
this._tabPanelsElement=this.getTabPanelsElement();
var _a9b=this.getTabElements().getLength();
var _a9c=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a9b!=_a9c){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(this.getProperty("type")=="boxed"){
this.setFlexibility(false);
this.attachClassName("boxed");
}
this.buildDOMContent();
this._TEMPNAME();
if(this.getProperty("equalsize")==true){
this.dispatchAction(PageBinding.ACTION_BLOCK_INIT);
this.setFlexibility(false);
this.attachClassName("equalsize");
this.isEqualSize=true;
this.addMembers(this.getDescendantBindingsByLocalName("*"));
}else{
this.addMember(this.getTabsBinding());
this.addMember(this.getTabPanelsBinding());
this.addMembers(this.getTabBindings());
this.addMembers(this.getTabPanelBindings());
}
}
}
};
TabBoxBinding.prototype.onBindingInitialize=function(){
var _a9d=this.getTabPanelElements();
while(_a9d.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a9d.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a9e=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a9f=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _aa0=_a9e>_a9f?"tabsbelow":"tabsontop";
this.attachClassName(_aa0);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _aa2=this.getTabPanelElements();
var _aa3=null;
var _aa4=this.getProperty("selectedindex");
if(_aa4!=null){
if(_aa4>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aa5=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa7=_aa2.getNext();
this.registerTabBoxPair(tab,_aa7);
if(_aa4&&_aa5==_aa4){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aa3=tab;
}
}
_aa5++;
}
if(!_aa3){
_aa3=tabs.getFirst();
_aa3.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa8){
var _aa9=null;
var _aaa=null;
if(this.isEqualSize){
var _aab=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aad=this.getTabPanelElements();
_aad.each(function(_aae){
max=_aae.offsetHeight>max?_aae.offsetHeight:max;
});
_aaa=max+_aab.top+_aab.bottom;
if(_aa8&&this._tabPanelsElement.style.height!=null){
_aa9=this._tabPanelsElement.offsetHeight;
}
if(_aa9!=null||_aaa>_aa9){
this._tabPanelsElement.style.height=_aaa+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aaf){
_aaf._invalidCount=0;
_aaf.addActionListener(Binding.ACTION_INVALID,this);
_aaf.addActionListener(Binding.ACTION_VALID,this);
_aaf.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ab0){
TabBoxBinding.superclass.handleAction.call(this,_ab0);
var _ab1=_ab0.target;
var _ab2=_ab0.listener;
switch(_ab0.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_ab1.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ab0.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_ab1.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_ab2._invalidCount++;
if(_ab2._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_ab2.isSelected){
self._showWarning(_ab2,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_ab2._invalidCount>0){
_ab2._invalidCount--;
if(_ab2._invalidCount==0){
if(_ab2.isSelected){
this._showWarning(_ab2,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_ab2,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ab0._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ab0._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ab5=DOMEvents.getTarget(e);
if(_ab5==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab7=this.getTabPanelElements();
tabs.each(function(tab,_ab9){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aba=_ab7.get(_ab9);
this.registerTabBoxPair(tab,_aba);
}
},this);
var _abb=this._tabBoxPairs;
for(var key in _abb){
var tab=_abb[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ab5);
switch(_ab5.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _abf=_ab5.parentNode;
if(_abf==this._tabsElement||_abf==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ab5==this._tabsElement||_ab5==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
}
}
}
break;
}
};
TabBoxBinding.prototype.select=function(arg,_ac1){
var _ac2=this.getBindingForArgument(arg);
if(_ac2!=null&&!_ac2.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ac2.select(_ac1);
this.getTabPanelBinding(_ac2).select(_ac1);
var _ac3=this.getProperty("selectedindex");
if(_ac3!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ac2.bindingElement,true));
}
this._selectedTabBinding=_ac2;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ac2.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ac4=this.getTabPanelBinding(_ac2);
this._showBalloon(_ac4,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac6){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac6.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac6};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aca){
var _acb=null;
try{
var key=_aca.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _acd=this._tabBoxPairs[key].tabPanel;
_acb=UserInterface.getBinding(_acd);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _acb;
};
TabBoxBinding.prototype.getTabBinding=function(_ace){
var key=_ace.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad0=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ad0);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ad1=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ad1);
return _ad1;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ad2,_ad3){
var _ad4=_ad2.bindingElement;
_ad2.setProperty("selected",true);
var _ad5=this.summonTabPanelBinding();
var _ad6=_ad5.bindingElement;
if(_ad3){
_ad6.appendChild(_ad3 instanceof Binding?_ad3.bindingElement:_ad3);
}
this.registerTabBoxPair(_ad4,_ad6);
UserInterface.getBinding(this._tabsElement).add(_ad2);
this._tabPanelsElement.appendChild(_ad6);
_ad2.attach();
UserInterface.getBinding(_ad6).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ad2;
};
TabBoxBinding.prototype.importTabBinding=function(_ad7){
var that=_ad7.containingTabBoxBinding;
var _ad9=that.getTabPanelBinding(_ad7);
var _ada=_ad9.getBindingElement();
var _adb=_ad7.getBindingElement();
that.dismissTabBinding(_ad7);
this._tabsElement.appendChild(_adb);
this._tabPanelsElement.appendChild(_ada);
this.registerTabBoxPair(_adb,_ada);
_ad7.containingTabBoxBinding=this;
this.select(_ad7);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_adc){
var _add=null;
if(_adc.isSelected){
_add=this.getBestTab(_adc);
this._selectedTabBinding=null;
}
var _ade=this.getTabPanelBinding(_adc);
this.unRegisterTabBoxPair(_adc.bindingElement);
_adc.dispose();
_ade.dispose();
if(_add!=null){
this.select(_add,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_adf){
if(_adf.isSelected){
this.selectBestTab(_adf);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ae0){
var _ae1=this.getBestTab(_ae0);
if(_ae1){
this.select(_ae1);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ae2){
var _ae3=null;
var _ae4=_ae2.getOrdinalPosition(true);
var _ae5=this.getTabBindings();
var _ae6=_ae5.getLength();
var _ae7=_ae6-1;
if(_ae6==1){
_ae3=null;
}else{
if(_ae4==_ae7){
_ae3=_ae5.get(_ae4-1);
}else{
_ae3=_ae5.get(_ae4+1);
}
}
return _ae3;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae8,_ae9){
var _aea=this.bindingDocument.getElementById(_ae8.bindingElement.id);
var tab=this.getTabElements().get(_ae9);
this._tabsElement.insertBefore(_aea,tab);
this.updateType=TabBoxBinding.UPDATE_ORDINAL;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.getTabsElement=function(){
return DOMUtil.getElementsByTagName(this.bindingElement,this._nodename_tabs).item(0);
};
TabBoxBinding.prototype.getTabPanelsElement=function(){
return DOMUtil.getElementsByTagName(this.bindingElement,this._nodename_tabpanels).item(0);
};
TabBoxBinding.prototype.getTabElements=function(){
var _aec=this._nodename_tab;
var _aed=new List(this._tabsElement.childNodes);
var _aee=new List();
while(_aed.hasNext()){
var _aef=_aed.getNext();
if(_aef.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aef)==_aec){
_aee.add(_aef);
}
}
return _aee;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _af0=this._nodename_tabpanel;
var _af1=new List(this._tabPanelsElement.childNodes);
var _af2=new List();
_af1.each(function(_af3){
if(_af3.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af3)==_af0){
_af2.add(_af3);
}
});
return _af2;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _af4=new List();
var _af5=this.getTabElements();
_af5.each(function(_af6){
_af4.add(UserInterface.getBinding(_af6));
});
return _af4;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af7=new List();
this.getTabPanelElements().each(function(_af8){
_af7.add(UserInterface.getBinding(_af8));
});
return _af7;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af9=null;
if(this._selectedTabBinding){
_af9=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af9;
};
TabBoxBinding.prototype._showWarning=function(_afa,_afb){
var _afc=this.getTabBinding(_afa);
if(_afb){
if(_afc.labelBinding.hasImage){
_afc._backupImage=_afc.getImage();
}
_afc.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_afc._backupImage){
_afc.setImage(_afc._backupImage);
}else{
_afc.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_afd,_afe){
var _aff=this.getTabBinding(_afd);
if((_afe&&!_aff.isSelected)||!_afe){
if(_aff.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_afe){
if(_aff.labelBinding.hasImage){
_aff._backupImage=_aff.getImage();
}
_aff.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aff._backupImage!=null){
_aff.setImage(_aff._backupImage);
}else{
_aff.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b00){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b03=tab.getOrdinalPosition(true);
var next=null;
var _b05=new List();
tabs.each(function(t){
if(t.isVisible){
_b05.add(t);
}
});
if(_b05.getLength()>1){
if(_b03==0&&!_b00){
next=_b05.getLast();
}else{
if(_b03==_b05.getLength()-1&&_b00){
next=_b05.getFirst();
}else{
if(_b00){
next=tab.getNextBindingByLocalName(this._nodename_tab);
}else{
next=tab.getPreviousBindingByLocalName(this._nodename_tab);
}
}
}
if(next!=null){
this.select(next);
}
}
};
TabsBinding.prototype=new Binding;
TabsBinding.prototype.constructor=TabsBinding;
TabsBinding.superclass=Binding.prototype;
TabsBinding.NODENAME_TABBOX="tabbox";
TabsBinding.TABBUTTON_IMPLEMENTATION=TabsButtonBinding;
function TabsBinding(){
this.logger=SystemLogger.getLogger("TabsBinding");
this.containingTabBoxBinding=null;
this.tabsButtonBinding=null;
this._cachedOffsetWidth=parseInt(0);
this.isManaging=false;
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
TabsBinding.prototype.toString=function(){
return "[TabsBinding]";
};
TabsBinding.prototype.onBindingRegister=function(){
TabsBinding.superclass.onBindingRegister.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
};
TabsBinding.prototype.onBindingAttach=function(){
TabsBinding.superclass.onBindingAttach.call(this);
this.containingTabBoxBinding=this.getAncestorBindingByType(TabBoxBinding);
this.containingTabBoxBinding.addActionListener(TabBoxBinding.ACTION_UPDATED,this);
this.buildDOMContent();
this.dispatchAction(Binding.ACTION_ATTACHED);
};
TabsBinding.prototype.buildDOMContent=function(){
this.shadowTree.tabManager=this.bindingDocument.createElement("div");
this.shadowTree.tabManager.className="tabmanager";
var _b07=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b07.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b08){
TabsBinding.superclass.handleAction.call(this,_b08);
switch(_b08.type){
case TabBoxBinding.ACTION_UPDATED:
if(!this.isManaging){
var self=this;
function manage(){
self.manage();
}
setTimeout(manage,0);
}
break;
}
};
TabsBinding.prototype.flex=function(){
if(this.isAttached==true){
var self=this;
function manage(){
if(Binding.exists(self)==true){
var _b0b=self.bindingElement.offsetWidth;
if(_b0b!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b0b;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b0c){
if(_b0c instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b0c);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b0d=false;
var _b0e,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b11=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b12=this.bindingElement.offsetWidth-_b11.RESERVED_SPACE;
var _b13=null;
var sum=0,_b15=0;
var _b16=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b16){
tab=tabs.getNext();
_b0e=UserInterface.getBinding(tab);
if(!_b13){
_b13=_b0e;
}
sum+=tab.offsetWidth;
if(sum>=_b12){
_b0d=true;
if(_b0e.isSelected){
if(!DOMUtil.isFirstElement(_b0e.bindingElement,true)){
this.isManaging=false;
if(_b13){
_b13.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b0e,_b15-1);
_b16=false;
}
}else{
_b0e.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b0e);
}
}else{
_b0e.show();
_b13=_b0e;
_b15++;
}
}
if(_b16){
if(_b0d&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b17=_b13.getBindingElement();
var _b18=_b17.offsetLeft+_b17.offsetWidth;
var _b19=this.tabsButtonBinding;
setTimeout(function(){
_b19.show(_b18+4);
},50);
}else{
this.tabsButtonBinding.hide();
}
}
}
this.isManaging=false;
}
};
TabBinding.prototype=new Binding;
TabBinding.prototype.constructor=TabBinding;
TabBinding.superclass=Binding.prototype;
TabBinding.ACTION_SELECTED="tabselected";
TabBinding.ACTION_UNSELECTED="tabunselected";
TabBinding.NODENAME_TABBOX="tabbox";
function TabBinding(){
this.logger=SystemLogger.getLogger("TabBinding");
this.tabboxkey=null;
this.isSelected=false;
this.labelBinding=null;
this.containingTabBoxBinding=null;
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
TabBinding.prototype.toString=function(){
return "[TabBinding]";
};
TabBinding.prototype.serialize=function(){
var _b1a=TabBinding.superclass.serialize.call(this);
if(_b1a){
_b1a.label=this.getLabel();
_b1a.image=this.getImage();
_b1a.tooltip=this.getToolTip();
}
return _b1a;
};
TabBinding.prototype.onBindingAttach=function(){
TabBinding.superclass.onBindingAttach.call(this);
this.defaultElementPosition=DOMUtil.getComputedStyle(this.bindingElement,"position");
this.defaultElementLeft=DOMUtil.getComputedStyle(this.bindingElement,"left");
this.containingTabBoxBinding=this.getAncestorBindingByType(TabBoxBinding);
this.buildDOMContent();
this.assignDOMEvents();
this.dispatchAction(Binding.ACTION_ATTACHED);
if(this.getProperty("selected")==true){
this.containingTabBoxBinding.select(this,true);
}
};
TabBinding.prototype.buildDOMContent=function(){
var _b1b=this.bindingElement.getAttribute("image");
var _b1c=this.bindingElement.getAttribute("label");
var _b1d=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b1c){
this.setLabel(_b1c);
}
if(_b1b){
this.setImage(_b1b);
}
if(_b1d){
this.setToolTip(_b1d);
}
};
TabBinding.prototype.setImage=function(url){
this.setProperty("image",url);
if(this.isAttached){
this.labelBinding.setImage(url);
}
};
TabBinding.prototype.getImage=function(){
return this.getProperty("image");
};
TabBinding.prototype.setLabel=function(_b1f){
if(_b1f!=null){
this.setProperty("label",_b1f);
if(this.isAttached){
this.labelBinding.setLabel(_b1f);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b20){
if(_b20){
this.setProperty("tooltip",_b20);
if(this.isAttached){
this.labelBinding.setToolTip(_b20);
}
}
};
TabBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
TabBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEENTER);
this.addEventListener(DOMEvents.MOUSELEAVE);
};
TabBinding.prototype.handleEvent=function(e){
TabBinding.superclass.handleEvent.call(this,e);
if(!this.isSelected){
var _b22=false;
if(Client.isMozilla==true){
}
if(!_b22){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.isSelected){
this.bindingElement.className="hover";
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.isSelected){
this.bindingElement.className="default";
}
break;
case DOMEvents.MOUSEDOWN:
if(!DOMEvents.isRightButton(e)){
this.containingTabBoxBinding.select(this);
}
break;
}
}
}
};
TabBinding.prototype.select=function(_b23){
this.show();
this.isSelected=true;
this.setProperty("selected",true);
this.bindingElement.className="selected";
};
TabBinding.prototype.unselect=function(){
this.isSelected=false;
this.deleteProperty("selected");
this.bindingElement.className="default";
};
TabBinding.prototype.hide=function(){
if(this.isVisible){
this.bindingElement.style.position="absolute";
this.bindingElement.style.left="-1000px";
this.isVisible=false;
}
};
TabBinding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.position=this.defaultElementPosition;
this.bindingElement.style.left=this.defaultElementLeft;
this.isVisible=true;
}
};
TabBinding.newInstance=function(_b24){
var _b25=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b24);
return UserInterface.registerBinding(_b25,TabBinding);
};
TabPanelsBinding.prototype=new FlexBoxBinding;
TabPanelsBinding.prototype.constructor=TabPanelsBinding;
TabPanelsBinding.superclass=FlexBoxBinding.prototype;
function TabPanelsBinding(){
this.logger=SystemLogger.getLogger("TabPanelsBinding");
this.containingTabBoxBinding=null;
this._lastKnownDimension=null;
}
TabPanelsBinding.prototype.toString=function(){
return "[TabPanelsBinding]";
};
TabPanelsBinding.prototype.onBindingRegister=function(){
TabPanelsBinding.superclass.onBindingRegister.call(this);
this._lastKnownDimension=new Dimension(0,0);
};
TabPanelsBinding.prototype.hasDimensionsChanged=function(){
var _b26=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b26=true;
this._lastKnownDimension=dim1;
}
return _b26;
};
TabPanelsBinding.prototype.onBindingAttach=function(){
TabPanelsBinding.superclass.onBindingAttach.call(this);
this.containingTabBoxBinding=this.getAncestorBindingByType(TabBoxBinding);
this.setFlexibility(this.containingTabBoxBinding.isFlexible);
this.dispatchAction(Binding.ACTION_ATTACHED);
};
TabPanelBinding.prototype=new Binding;
TabPanelBinding.prototype.constructor=TabPanelBinding;
TabPanelBinding.superclass=Binding.prototype;
function TabPanelBinding(){
this.logger=SystemLogger.getLogger("TabPanelBinding");
this.tabboxkey=null;
this.isVisible=false;
this._focusedBinding=null;
return this;
}
TabPanelBinding.prototype.toString=function(){
return "[TabPanelBinding]";
};
TabPanelBinding.prototype.onBindingAttach=function(){
TabPanelBinding.superclass.onBindingAttach.call(this);
this.dispatchAction(Binding.ACTION_ATTACHED);
this.addActionListener(BalloonBinding.ACTION_INITIALIZE);
};
TabPanelBinding.prototype.select=function(_b29){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b29!=true){
this.dispatchAction(FocusBinding.ACTION_FOCUS);
}
}
}
};
TabPanelBinding.prototype.unselect=function(){
if(this.isSelected){
this.dispatchAction(FocusBinding.ACTION_BLUR);
this.isSelected=false;
this.isVisible=false;
this.bindingElement.style.position="absolute";
}
};
TabPanelBinding.prototype._invokeManagedRecursiveFlex=function(){
this.reflex(true);
};
TabPanelBinding.prototype.handleAction=function(_b2a){
TabPanelBinding.superclass.handleAction.call(this,_b2a);
var _b2b=_b2a.target;
switch(_b2a.type){
case BalloonBinding.ACTION_INITIALIZE:
_b2a.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b2c){
var _b2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b2c);
UserInterface.registerBinding(_b2d,TabPanelBinding);
return UserInterface.getBinding(_b2d);
};
SplitBoxBinding.prototype=new FlexBoxBinding;
SplitBoxBinding.prototype.constructor=SplitBoxBinding;
SplitBoxBinding.superclass=FlexBoxBinding.prototype;
SplitBoxBinding.ORIENT_HORIZONTAL="horizontal";
SplitBoxBinding.ORIENT_VERTICAL="vertical";
function SplitBoxBinding(){
this.logger=SystemLogger.getLogger("SplitBoxBinding");
this._orient=SplitBoxBinding.ORIENT_HORIZONTAL;
this.isLayoutInitialized=false;
this._isFirstLayout=true;
return this;
}
SplitBoxBinding.prototype.toString=function(){
return "[SplitBoxBinding]";
};
SplitBoxBinding.prototype.serialize=function(){
var _b2e=SplitBoxBinding.superclass.serialize.call(this);
if(_b2e){
_b2e.orient=this.getOrient();
_b2e.layout=this.getLayout();
}
return _b2e;
};
SplitBoxBinding.prototype.onBindingAttach=function(){
if(this.isHorizontalOrient()&&Localization.isUIRtl){
var i=this.bindingElement.childNodes.length;
while(i--){
this.bindingElement.appendChild(this.bindingElement.childNodes[i]);
}
}
SplitBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(SplitterBinding.ACTION_DRAGGED,this);
this.addActionListener(SplitterBinding.ACTION_COLLAPSE,this);
this.addActionListener(SplitterBinding.ACTION_UNCOLLAPSE,this);
this._initializeLayout();
this._initializeOrient();
this._initializeSplitters();
};
SplitBoxBinding.prototype._initializeLayout=function(){
this.isLayoutInitialized=false;
var _b30=this.getSplitPanelElements();
if(_b30.hasEntries()){
var _b31=new List(this.getLayout().split(":"));
if(_b31.getLength()!=_b30.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b30.each(function(_b32){
_b32.setAttribute("ratio",_b31.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b33=this.getProperty("orient");
if(_b33){
this._orient=_b33;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b34=this.getSplitterBindings();
while(_b34.hasNext()){
var _b35=_b34.getNext();
if(_b35&&_b35.getProperty("collapsed")==true){
_b35.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b36){
SplitBoxBinding.superclass.handleAction.call(this,_b36);
switch(_b36.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b36.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b36.target);
_b36.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b36.target);
_b36.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b37){
this._getSplitPanelBindingForSplitter(_b37).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b38){
this._getSplitPanelBindingForSplitter(_b38).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b39){
var _b3a=DOMUtil.getOrdinalPosition(_b39.bindingElement,true);
var _b3b,_b3c=this.getSplitPanelElements();
switch(_b39.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b3b=_b3c.get(_b3a);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b3b=_b3c.get(_b3a+1);
break;
}
return UserInterface.getBinding(_b3b);
};
SplitBoxBinding.prototype.invokeLayout=function(_b3d){
var _b3e=this.isHorizontalOrient();
var _b3f=this.getSplitPanelBindings();
var _b40=this.getSplitterBindings();
var _b41=new List();
var _b42,sum=0;
var _b44=0;
_b3f.each(function(_b45){
if(_b45.isFixed==true){
if(!_b3f.hasNext()){
_b44+=_b45.getFix();
}
_b41.add(0);
sum+=0;
}else{
_b42=_b45.getRatio();
_b41.add(_b42);
sum+=_b42;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b41.getLength()!=_b3f.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b46=_b3e?this.getInnerWidth():this.getInnerHeight();
_b46-=_b44;
_b40.each(function(_b47){
if(_b47.isVisible){
_b46-=SplitterBinding.DIMENSION;
}
});
var unit=_b46/sum;
var _b49=0;
var self=this;
_b3f.each(function(_b4b){
var span=0;
var _b4d=_b41.getNext();
if(_b4b.isFixed){
span=_b4b.getFix();
}else{
span=Math.floor(unit*_b4d);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b49+=span;
while(_b49>_b46){
_b49--;
span--;
}
if(!_b4b.isFixed){
if(_b3e){
_b4b.setWidth(span);
}else{
_b4b.setHeight(span);
}
}
});
}
if(_b3d!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b4e=this.getLayout();
if(_b4e){
this.setProperty("layout",_b4e);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b4f=this.isHorizontalOrient();
var _b50=this.getSplitPanelBindings();
var _b51=this.getSplitterBindings();
var _b52=null;
var _b53=null;
var unit=null;
var _b55=null;
var span=null;
_b50.each(function(_b57){
if(!unit){
unit=_b4f?_b57.getWidth():_b57.getHeight();
}
span=_b4f?_b57.getWidth():_b57.getHeight();
if(_b55){
span-=_b55;
_b55=null;
}
_b52=_b51.getNext();
if(_b52&&_b52.offset){
_b55=_b52.offset;
span+=_b55;
}
_b57.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b58){
this.logger.debug(_b58);
this.setProperty("layout",_b58);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b59="",_b5a=this.getSplitPanelBindings();
_b5a.each(function(_b5b){
_b59+=_b5b.getRatio().toString();
_b59+=_b5a.hasNext()?":":"";
});
this.setProperty("layout",_b59);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b5c=this.getSplitPanelElements();
_b5c.each(function(_b5d){
layout+="1"+(_b5c.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b5e){
this.bindingElement.style.width=_b5e+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b5f){
this.bindingElement.style.height=_b5f+"px";
};
SplitBoxBinding.prototype.getInnerHeight=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().height);
}
return this.bindingElement.offsetHeight;
};
SplitBoxBinding.prototype.getOrient=function(){
return this.getProperty("orient");
};
SplitBoxBinding.prototype.isHorizontalOrient=function(){
return this._orient==SplitBoxBinding.ORIENT_HORIZONTAL;
};
SplitBoxBinding.prototype.getSplitPanelElements=function(){
var _b60=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b60.reverse();
}
return _b60;
};
SplitBoxBinding.prototype.getSplitPanelBindings=function(){
return this.getChildBindingsByLocalName("splitpanel");
};
SplitBoxBinding.prototype.getSplitterElements=function(){
return this.getChildElementsByLocalName("splitter");
};
SplitBoxBinding.prototype.getSplitterBindings=function(){
return this.getChildBindingsByLocalName("splitter");
};
SplitBoxBinding.prototype.fit=function(_b61){
if(!this.isFit||_b61){
if(this.isHorizontalOrient()){
var max=0;
var _b63=this.getSplitPanelBindings();
_b63.each(function(_b64){
var _b65=_b64.bindingElement.offsetHeight;
max=_b65>max?_b65:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b66){
var _b67=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b66);
return UserInterface.registerBinding(_b67,SplitBoxBinding);
};
SplitPanelBinding.prototype=new ControlBoxBinding;
SplitPanelBinding.prototype.constructor=SplitPanelBinding;
SplitPanelBinding.superclass=ControlBoxBinding.prototype;
function SplitPanelBinding(){
this.logger=SystemLogger.getLogger("SplitPanelBinding");
this._containingSplitBoxBinding=null;
this.isCollapsed=false;
this.isFixed=false;
this.isVisible=true;
this._fixedSpan=null;
this.isFlexible=true;
return this;
}
SplitPanelBinding.prototype.toString=function(){
return "[SplitPanelBinding]";
};
SplitPanelBinding.prototype.onBindingAttach=function(){
SplitPanelBinding.superclass.onBindingAttach.call(this);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this.parseDOMProperties();
};
SplitPanelBinding.prototype.parseDOMProperties=function(){
var type=this.getProperty("type");
if(type){
this.attachClassName(type);
}
var fix=this.getProperty("fix");
if(fix){
this.setFix(fix);
}
var _b6a=this.getProperty("hidden");
if(_b6a){
this.hide();
}
};
SplitPanelBinding.prototype.collapse=function(){
this.hide();
this.isCollapsed=true;
this.setProperty("collapsed","true");
};
SplitPanelBinding.prototype.unCollapse=function(){
this.show();
this.isCollapsed=false;
this.deleteProperty("collapsed");
};
SplitPanelBinding.prototype.hide=function(){
if(this.isVisible==true){
this.setProperty("ratiocache",this.getRatio());
this.setRatio(0);
this.bindingElement.style.display="none";
this.setProperty("hidden",true);
this.isVisible=false;
}
};
SplitPanelBinding.prototype.show=function(){
if(!this.isVisible){
var _b6b=this.getProperty("ratiocache");
if(_b6b){
this.setRatio(_b6b);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b6c){
if(!this.isFixed){
if(_b6c!=this.getWidth()){
if(_b6c<0){
_b6c=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b6c+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b6c);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b6d=null;
if(this.isFixed){
_b6d=this.getFix();
}else{
_b6d=this.bindingElement.offsetWidth;
}
return _b6d;
};
SplitPanelBinding.prototype.setHeight=function(_b6e){
if(!this.isFixed){
if(_b6e!=this.getHeight()){
try{
this.bindingElement.style.height=_b6e+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b6f=null;
if(this.isFixed){
_b6f=this.getFix();
}else{
_b6f=this.bindingElement.offsetHeight;
}
return _b6f;
};
SplitPanelBinding.prototype.setRatio=function(_b70){
this.setProperty("ratio",_b70);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b71){
if(_b71){
this._fixedSpan=_b71;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b71);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b71);
break;
}
this.isFixed=true;
}else{
this._fixedSpan=null;
this.isFixed=false;
}
};
SplitPanelBinding.prototype.getFix=function(){
return this._fixedSpan;
};
SplitPanelBinding.newInstance=function(_b72){
var _b73=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b72);
return UserInterface.registerBinding(_b73,SplitPanelBinding);
};
SplitterBinding.prototype=new Binding;
SplitterBinding.prototype.constructor=SplitterBinding;
SplitterBinding.superclass=Binding.prototype;
SplitterBinding.DIMENSION=0;
SplitterBinding.BUFFER=30;
SplitterBinding.COLLAPSE_AFTER="after";
SplitterBinding.COLLAPSE_BEFORE="before";
SplitterBinding.ACTION_DRAGSTART="splitter dragstart";
SplitterBinding.ACTION_DRAGGED="splitter dragged";
SplitterBinding.ACTION_COLLAPSE="splitter collapse";
SplitterBinding.ACTION_UNCOLLAPSE="splitter uncollapse";
SplitterBinding.CLASSNAME_ACTIVE="active";
SplitterBinding.CLASSNAME_HOVER="hover";
function SplitterBinding(){
this.logger=SystemLogger.getLogger("SplitterBinding");
this.isDraggable=true;
this.isDragging=false;
this.isCollapsed=false;
this.isDisabled=true;
this._containingSplitBoxBinding=null;
this._collapseDirection=SplitterBinding.COLLAPSE_AFTER;
this.offset=null;
return this;
}
SplitterBinding.prototype.toString=function(){
return "[SplitterBinding]";
};
SplitterBinding.prototype.serialize=function(){
var _b74=SplitBoxBinding.superclass.serialize.call(this);
if(_b74){
_b74.collapse=this.getProperty("collapse");
_b74.collapsed=this.getProperty("collapsed");
_b74.disabled=this.getProperty("isdisabled");
}
return _b74;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b75=this.getProperty("hidden");
if(_b75){
this.hide();
}
};
SplitterBinding.prototype.buildDOMContent=function(){
this.shadowTree.splitterBody=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitterbody",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.splitterBody);
if(Client.isMozilla==true){
var text=this.bindingDocument.createTextNode("!");
this.bindingElement.appendChild(text);
}
};
SplitterBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEOVER);
this.addEventListener(DOMEvents.MOUSEOUT);
};
SplitterBinding.prototype.collapse=function(){
if(!this.isCollapsed){
this.hide();
this.setProperty("collapsed","true");
this.isCollapsed=true;
this.dispatchAction(SplitterBinding.ACTION_COLLAPSE);
}
};
SplitterBinding.prototype.unCollapse=function(){
if(this.isCollapsed==true){
this.show();
this.deleteProperty("collapsed");
this.isCollapsed=false;
this.dispatchAction(SplitterBinding.ACTION_UNCOLLAPSE);
}
};
SplitterBinding.prototype.getCollapseDirection=function(){
return this._collapseDirection;
};
SplitterBinding.prototype.setCollapseDirection=function(_b77){
this.setProperty("collapse",_b77);
this._collapseDirection=_b77;
};
SplitterBinding.prototype.handleAction=function(_b78){
SplitterBinding.superclass.handleAction.call(this,_b78);
switch(_b78.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b78.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b7a=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b7a.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b7a.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b7b){
this.attachClassName(SplitterBinding.CLASSNAME_ACTIVE);
this.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_ACTIVE;
this.isDragging=true;
};
SplitterBinding.prototype.onDrag=function(diff){
diff=this.getEvaluatedDiff(diff);
if(this._containingSplitBoxBinding.isHorizontalOrient()){
this.shadowTree.splitterBody.style.left=diff.x+"px";
}else{
this.shadowTree.splitterBody.style.top=diff.y+"px";
}
};
SplitterBinding.prototype.onDragStop=function(diff){
diff=this.getEvaluatedDiff(diff);
this.offset=this._containingSplitBoxBinding.isHorizontalOrient()?diff.x:diff.y;
this.dispatchAction(SplitterBinding.ACTION_DRAGGED);
this.offset=null;
this.detachClassName(SplitterBinding.CLASSNAME_ACTIVE);
this.shadowTree.splitterBody.className="";
this.isDragging=false;
if(this._containingSplitBoxBinding.isHorizontalOrient()){
this.shadowTree.splitterBody.style.left="0";
}else{
this.shadowTree.splitterBody.style.top="0";
}
};
SplitterBinding.prototype.getEvaluatedDiff=function(diff){
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
var x=this.bindingElement.offsetLeft;
var w=this.bindingElement.offsetWidth;
var t=this.bindingElement.parentNode.offsetWidth;
var min=-x+SplitterBinding.BUFFER;
var max=t-x-w-SplitterBinding.BUFFER;
diff.x=diff.x<=min?min:diff.x;
diff.x=diff.x>=max?max:diff.x;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
var y=this.bindingElement.offsetTop;
var h=this.bindingElement.offsetHeight;
var t=this.bindingElement.parentNode.offsetHeight;
var min=-y+SplitterBinding.BUFFER;
var max=t-y-h-SplitterBinding.BUFFER;
diff.y=diff.y<=min?min:diff.y;
diff.y=diff.y>=max?max:diff.y;
break;
}
return diff;
};
SplitterBinding.prototype.disable=function(){
if(!this.isDisabled){
alert("disable");
this.isDisabled=true;
this.disableDragging();
this.setProperty("isdisabled",true);
}
};
SplitterBinding.prototype.enable=function(){
if(this.isDisabled==true){
this.isDisabled=false;
this.enableDragging();
this.deleteProperty("isdisabled");
}
};
SplitterBinding.newInstance=function(_b86){
var _b87=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b86);
return UserInterface.registerBinding(_b87,SplitterBinding);
};
DecksBinding.prototype=new FlexBoxBinding;
DecksBinding.prototype.constructor=DecksBinding;
DecksBinding.superclass=FlexBoxBinding.prototype;
DecksBinding.ACTION_SELECTED="decks deck selected";
DecksBinding.NODENAME_DECK="deck";
function DecksBinding(){
this.logger=SystemLogger.getLogger("DecksBinding");
this._selectedDeckBinding=null;
this._lastKnownDimension=null;
}
DecksBinding.prototype.toString=function(){
return "[DecksBinding]";
};
DecksBinding.prototype.onBindingRegister=function(){
DecksBinding.superclass.onBindingRegister.call(this);
this._lastKnownDimension=new Dimension(0,0);
this.attachClassName("deckselement");
};
DecksBinding.prototype.onBindingAttach=function(){
DecksBinding.superclass.onBindingAttach.call(this);
var _b88=this.getProperty("selectedindex");
var _b89=this.getDeckElements();
if(_b89.hasEntries()){
var _b8a=false;
var _b8b=0;
while(_b89.hasNext()){
var deck=_b89.getNext();
if(_b88&&_b8b==_b88){
deck.setAttribute("selected","true");
_b8a=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b8a=true;
}
}
_b8b++;
}
if(!_b8a){
_b89.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b8e=this.getBindingForArgument(arg);
if(_b8e!=null){
if(_b8e!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b8e.select();
this._selectedDeckBinding=_b8e;
var _b8f=this.getProperty("selectedindex");
if(_b8f!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b8e.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b90=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b90=true;
this._lastKnownDimension=dim1;
}
return _b90;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b93){
var _b94=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b93);
return UserInterface.registerBinding(_b94,DecksBinding);
};
DeckBinding.prototype=new FlexBoxBinding;
DeckBinding.prototype.constructor=DeckBinding;
DeckBinding.superclass=FlexBoxBinding.prototype;
DeckBinding.ACTION_SELECTED="deck selected";
DeckBinding.ACTION_UNSELECTED="deck unselected";
DeckBinding.NODENAME_DECKS="decks";
DeckBinding.CLASSNAME="deckelement";
function DeckBinding(){
this.logger=SystemLogger.getLogger("DeckBinding");
this.isSelected=false;
this.isVisible=false;
this.containingDecksBinding=null;
return this;
}
DeckBinding.prototype.toString=function(){
return "[DeckBinding]";
};
DeckBinding.prototype.onBindingRegister=function(){
DeckBinding.superclass.onBindingRegister.call(this);
this.addActionListener(BalloonBinding.ACTION_INITIALIZE);
this.attachClassName(DeckBinding.CLASSNAME);
};
DeckBinding.prototype.onBindingAttach=function(){
DeckBinding.superclass.onBindingAttach.call(this);
this.containingDecksBinding=this.getAncestorBindingByLocalName(this.constructor.NODENAME_DECKS);
if(this.getProperty("selected")==true){
this.containingDecksBinding.select(this);
}
};
DeckBinding.prototype.handleAction=function(_b95){
DeckBinding.superclass.handleAction.call(this,_b95);
var _b96=_b95.target;
switch(_b95.type){
case BalloonBinding.ACTION_INITIALIZE:
_b95.consume();
break;
}
};
DeckBinding.prototype.select=function(){
if(!this.isSelected){
if(this.isLazy==true){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.setProperty("selected","true");
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
this.dispatchAction(DeckBinding.ACTION_SELECTED);
var root=UserInterface.getBinding(this.bindingDocument.body);
if(root.isActivated){
this.dispatchAction(FocusBinding.ACTION_FOCUS);
}
}
}
};
DeckBinding.prototype.unselect=function(){
if(this.isSelected){
this.dispatchAction(FocusBinding.ACTION_BLUR);
this.deleteProperty("selected");
this.isSelected=false;
this.isVisible=false;
this.bindingElement.style.position="absolute";
this.dispatchAction(DeckBinding.ACTION_UNSELECTED);
}
};
DeckBinding.prototype._invokeManagedRecursiveFlex=function(){
this.reflex(true);
};
DeckBinding.newInstance=function(_b98){
var _b99=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b98);
return UserInterface.registerBinding(_b99,DeckBinding);
};
ToolBarBinding.prototype=new Binding;
ToolBarBinding.prototype.constructor=ToolBarBinding;
ToolBarBinding.superclass=Binding.prototype;
ToolBarBinding.TYPE_TEXTONLY="textonly";
ToolBarBinding.TYPE_IMAGESONLY="imagesonly";
ToolBarBinding.TYPE_DEFAULT="imagesandtext";
ToolBarBinding.CLASSNAME_TEXTONLY="textonly";
ToolBarBinding.CLASSNAME_IMAGESONLY="imagesonly";
ToolBarBinding.CLASSNAME_IMAGESIZELARGE="imagesizelarge";
ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE="imagesizexlarge";
ToolBarBinding.CLASSNAME_ICONSIZE_22="icons-s-22";
ToolBarBinding.IMAGESIZE_NORMAL="normal";
ToolBarBinding.IMAGESIZE_LARGE="large";
ToolBarBinding.ICONSIZE_22="icons-s-22";
function ToolBarBinding(){
this.logger=SystemLogger.getLogger("ToolBarBinding");
this.hasImages=true;
this.hasText=true;
this._imageSize=ToolBarBinding.IMAGESIZE_NORMAL;
this.type=ToolBarBinding.TYPE_DEFAULT;
this._hasDefaultContent=true;
this._toolBarBodyRight=null;
this._toolBarBodyLeft=null;
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID,FitnessCrawler.ID]);
this._hasDOMContent=false;
return this;
}
ToolBarBinding.prototype.toString=function(){
return "[ToolBarBinding]";
};
ToolBarBinding.prototype.onBindingRegister=function(){
ToolBarBinding.superclass.onBindingRegister.call(this);
this.attachClassName(Binding.CLASSNAME_CLEARFLOAT);
};
ToolBarBinding.prototype.onBindingAttach=function(){
ToolBarBinding.superclass.onBindingAttach.call(this);
this.parseDOMProperties();
this.buildDOMContent();
this.addMembers(this.getChildBindingsByLocalName("toolbarbody"));
};
ToolBarBinding.prototype.onMemberInitialize=function(_b9a){
if(_b9a instanceof ToolBarBodyBinding){
if(_b9a.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b9a;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b9a;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b9a);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b9b=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b9b){
this.setImageSize(_b9b);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b9d=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b9d.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b9d.isDefaultContent=true;
this.add(_b9d);
_b9d.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b9f=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b9f);
}
if(_b9f!=null&&_b9f.hasClassName("max")){
this._maxToolBarGroup(_b9f,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_ba1){
var _ba2=this.boxObject.getDimension().w;
var _ba3=CSSComputer.getPadding(this.bindingElement);
_ba2-=(_ba3.left+_ba3.right);
if(_ba1!=null){
_ba2-=_ba1.boxObject.getDimension().w;
if(!Client.isWindows){
_ba2-=1;
}
if(Client.isExplorer){
_ba2-=15;
}
}
max.bindingElement.style.width=_ba2+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ba4){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ba4);
};
ToolBarBinding.prototype.addLeft=function(_ba5,_ba6){
var _ba7=null;
if(this._toolBarBodyLeft!=null){
_ba7=this._toolBarBodyLeft.add(_ba5,_ba6);
}else{
throw new Error("No left toolbarbody");
}
return _ba7;
};
ToolBarBinding.prototype.addLeftFirst=function(_ba8,_ba9){
var _baa=null;
if(this._toolBarBodyLeft){
_baa=this._toolBarBodyLeft.addFirst(_ba8,_ba9);
}else{
throw new Error("No left toolbarbody");
}
return _baa;
};
ToolBarBinding.prototype.addRight=function(_bab){
var _bac=null;
if(this._toolBarBodyRight){
_bac=this._toolBarBodyRight.add(_bab);
}else{
throw new Error("No left toolbarbody");
}
return _bac;
};
ToolBarBinding.prototype.empty=function(){
this.emptyLeft();
this.emptyRight();
};
ToolBarBinding.prototype.emptyLeft=function(){
if(this._toolBarBodyLeft){
this._toolBarBodyLeft.empty();
}
};
ToolBarBinding.prototype.emptyRight=function(){
if(this._toolBarBodyRight){
this._toolBarBodyRight.empty();
}
};
ToolBarBinding.prototype.setImageSize=function(size){
switch(size){
case ToolBarBinding.IMAGESIZE_LARGE:
this.attachClassName(ToolBarBinding.CLASSNAME_IMAGESIZELARGE);
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE);
break;
case ToolBarBinding.IMAGESIZE_XLARGE:
this.attachClassName(ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE);
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESIZELARGE);
break;
case ToolBarBinding.ICONSIZE_22:
this.attachClassName(ToolBarBinding.CLASSNAME_ICONSIZE_22);
break;
default:
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESIZELARGE);
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESIZEXLARGE);
break;
}
this._imageSize=size;
this.setProperty("imagesize",size);
};
ToolBarBinding.prototype.getImageSize=function(){
return this._imageSize;
};
ToolBarBinding.prototype.showImagesOnly=function(){
this.detachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this.attachClassName(ToolBarBinding.CLASSNAME_IMAGESONLY);
this.hasImages=true;
this.hasText=false;
};
ToolBarBinding.prototype.showTextOnly=function(){
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESONLY);
this.attachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this.hasImages=false;
this.hasText=true;
};
ToolBarBinding.prototype.showBoth=function(){
this.detachClassName(ToolBarBinding.CLASSNAME_IMAGESONLY);
this.detachClassName(ToolBarBinding.CLASSNAME_TEXTONLY);
this.hasImages=true;
this.hasText=true;
};
ToolBarBinding.prototype.setType=function(type){
switch(type){
case ToolBarBinding.TYPE_TEXTONLY:
this.showTextOnly();
break;
case ToolBarBinding.TYPE_IMAGESONLY:
this.showImagesOnly();
break;
default:
this.showBoth();
break;
}
this.setProperty("type",type);
};
ToolBarBinding.newInstance=function(_baf){
var _bb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_baf);
return UserInterface.registerBinding(_bb0,ToolBarBinding);
};
ToolBarBodyBinding.prototype=new Binding;
ToolBarBodyBinding.prototype.constructor=ToolBarBodyBinding;
ToolBarBodyBinding.superclass=Binding.prototype;
function ToolBarBodyBinding(){
this.logger=SystemLogger.getLogger("ToolBarBodyBinding");
this.isRightAligned=false;
return this;
}
ToolBarBodyBinding.prototype.toString=function(){
return "[ToolBarBodyBinding]";
};
ToolBarBodyBinding.prototype.onBindingAttach=function(){
ToolBarBodyBinding.superclass.onBindingAttach.call(this);
this.addMembers(this.getChildBindingsByLocalName("toolbargroup"));
if(this.getProperty("align")=="right"||this.isRightAligned){
this.alignRight();
}
};
ToolBarBodyBinding.prototype.onBindingInitialize=function(){
this.refreshToolBarGroups();
ToolBarBodyBinding.superclass.onBindingInitialize.call(this);
};
ToolBarBodyBinding.prototype.alignRight=function(){
this.attachClassName("alignright");
this.setProperty("align","right");
this.isRightAligned=true;
};
ToolBarBodyBinding.prototype.refreshToolBarGroups=function(){
var _bb1=this.getDescendantBindingsByLocalName("toolbargroup");
var _bb2=new List();
var _bb3=true;
_bb1.each(function(_bb4){
if(_bb4.isVisible&&!_bb4.isDefaultContent){
_bb2.add(_bb4);
}
});
while(_bb2.hasNext()){
var _bb5=_bb2.getNext();
_bb5.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bb3){
_bb5.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bb3=false;
}
if(!_bb2.hasNext()){
_bb5.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bb8=list.getNext();
var _bb9=_bb8.getEqualSizeWidth();
if(_bb9>max){
max=_bb9;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bb8=list.getNext();
_bb8.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bba,_bbb){
var _bbc=ToolBarBinding.superclass.add.call(this,_bba);
if(!_bbb){
if(_bba instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbc;
};
ToolBarBodyBinding.prototype.addFirst=function(_bbd,_bbe){
var _bbf=ToolBarBinding.superclass.addFirst.call(this,_bbd);
if(!_bbe){
if(_bbd instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbf;
};
ToolBarBodyBinding.newInstance=function(_bc0){
var _bc1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bc0);
return UserInterface.registerBinding(_bc1,ToolBarBodyBinding);
};
ToolBarGroupBinding.prototype=new RadioGroupBinding;
ToolBarGroupBinding.prototype.constructor=ToolBarGroupBinding;
ToolBarGroupBinding.superclass=RadioGroupBinding.prototype;
ToolBarGroupBinding.LAYOUT_DEFAULT=0;
ToolBarGroupBinding.LAYOUT_FIRST=1;
ToolBarGroupBinding.LAYOUT_LAST=2;
ToolBarGroupBinding.CLASSNAME_DEFAULTCONTENT="defaultcontent";
function ToolBarGroupBinding(){
this.logger=SystemLogger.getLogger("ToolBarGroupBinding");
this.isDefaultContent=false;
}
ToolBarGroupBinding.prototype.toString=function(){
return "[ToolBarGroupBinding]";
};
ToolBarGroupBinding.prototype.onBindingAttach=function(){
ToolBarGroupBinding.superclass.onBindingAttach.call(this);
this.addMembers(this.getDescendantBindingsByLocalName("toolbarbutton"));
this.addMembers(this.getDescendantBindingsByLocalName("toolbarlabel"));
this.addMembers(this.getDescendantBindingsByLocalName("clickbutton"));
if(this.isDefaultContent==true){
this.attachClassName(ToolBarGroupBinding.CLASSNAME_DEFAULTCONTENT);
}
};
ToolBarGroupBinding.prototype.setLayout=function(_bc2){
switch(_bc2){
case ToolBarGroupBinding.LAYOUT_DEFAULT:
this.detachClassName("first");
this.detachClassName("last");
break;
case ToolBarGroupBinding.LAYOUT_FIRST:
this.attachClassName("first");
break;
case ToolBarGroupBinding.LAYOUT_LAST:
this.attachClassName("last");
break;
}
};
ToolBarGroupBinding.prototype.show=function(){
ToolBarGroupBinding.superclass.show.call(this);
var _bc3=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc3)=="toolbarbody"){
UserInterface.getBinding(_bc3).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bc4=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc4)=="toolbarbody"){
UserInterface.getBinding(_bc4).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bc5){
var _bc6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bc5);
return UserInterface.registerBinding(_bc6,ToolBarGroupBinding);
};
ToolBarButtonBinding.prototype=new ButtonBinding;
ToolBarButtonBinding.prototype.constructor=ToolBarButtonBinding;
ToolBarButtonBinding.superclass=ButtonBinding.prototype;
function ToolBarButtonBinding(){
this.logger=SystemLogger.getLogger("ToolBarButtonBinding");
}
ToolBarButtonBinding.prototype.toString=function(){
return "[ToolBarButtonBinding]";
};
ToolBarButtonBinding.newInstance=function(_bc7){
var _bc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc7);
return UserInterface.registerBinding(_bc8,ToolBarButtonBinding);
};
ToolBarLabelBinding.prototype=new Binding;
ToolBarLabelBinding.prototype.constructor=ToolBarLabelBinding;
ToolBarLabelBinding.superclass=Binding.prototype;
function ToolBarLabelBinding(){
this.logger=SystemLogger.getLogger("ToolBarLabelBinding");
}
ToolBarLabelBinding.prototype.toString=function(){
return "[ToolBarLabelBinding]";
};
ToolBarLabelBinding.prototype.onBindingAttach=function(){
ToolBarLabelBinding.superclass.onBindingAttach.call(this);
this._labelBinding=this.add(LabelBinding.newInstance(this.bindingDocument));
this.shadowTree.label=this._labelBinding;
var _bc9=this.getProperty("label");
var _bca=this.getProperty("image");
if(_bc9){
this.setLabel(_bc9);
}
if(_bca){
this.setImage(_bca);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bcb,_bcc){
if(this.isAttached){
this._labelBinding.setLabel(_bcb,_bcc);
}
this.setProperty("label",_bcb);
};
ToolBarLabelBinding.prototype.setImage=function(_bcd,_bce){
if(this.isAttached){
this._labelBinding.setImage(_bcd,_bce);
}
this.setProperty("image",_bcd);
};
ToolBarLabelBinding.newInstance=function(_bcf){
var _bd0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bcf);
return UserInterface.registerBinding(_bd0,ToolBarLabelBinding);
};
DialogToolBarBinding.prototype=new ToolBarBinding;
DialogToolBarBinding.prototype.constructor=DialogToolBarBinding;
DialogToolBarBinding.superclass=ToolBarBinding.prototype;
function DialogToolBarBinding(){
this.logger=SystemLogger.getLogger("DialogToolBarBinding");
this._buttons=null;
this._defaultButton=null;
this._focusedButton=null;
this._isListening=false;
this.crawlerFilters=new List([FlexBoxCrawler.ID]);
return this;
}
DialogToolBarBinding.prototype.toString=function(){
return "[DialogToolBarBinding]";
};
DialogToolBarBinding.prototype.onBindingRegister=function(){
DialogToolBarBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_FOCUSED);
this.addActionListener(Binding.ACTION_BLURRED);
};
DialogToolBarBinding.prototype.onBindingDispose=function(){
DialogToolBarBinding.superclass.onBindingDispose.call(this);
if(this._isListening==true){
this.unsubscribe(BroadcastMessages.KEY_ENTER);
}
};
DialogToolBarBinding.prototype.onBindingInitialize=function(){
this.indexDialogButtons();
DialogToolBarBinding.superclass.onBindingInitialize.call(this);
};
DialogToolBarBinding.prototype.indexDialogButtons=function(){
var _bd1=this.getDescendantBindingsByLocalName("clickbutton");
if(_bd1.hasEntries()){
while(_bd1.hasNext()){
var _bd2=_bd1.getNext();
if(_bd2.isDefault){
this._defaultButton=_bd2;
_bd2.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bd2.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bd1;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bd3,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bd3,arg);
switch(_bd3){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bd5=this.getAncestorBindingByType(DialogBinding,true);
if(_bd5!=null&&_bd5.isActive){
if(this._focusedButton!=null){
if(!this._focusedButton.isDisabled){
this.unsubscribe(BroadcastMessages.KEY_ENTER);
this._focusedButton.fireCommand();
}
}else{
if(!this._defaultButton.isDisabled){
this.unsubscribe(BroadcastMessages.KEY_ENTER);
this._defaultButton.fireCommand();
}
}
}
}else{
this.logger.error("Ouch: DialogToolBarBinding#handleBroadcast");
}
}
break;
}
};
DialogToolBarBinding.prototype.handleAction=function(_bd6){
DialogToolBarBinding.superclass.handleAction.call(this,_bd6);
var _bd7=_bd6.target;
var _bd8=false;
var _bd9=this._buttons.reset();
if(_bd7 instanceof ClickButtonBinding){
switch(_bd6.type){
case Binding.ACTION_FOCUSED:
_bd7.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd7;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd7.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bd8&&_bd9.hasNext()){
var _bda=_bd9.getNext();
_bd8=_bda.isFocused;
}
if(!_bd8){
this._defaultButton.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
this._focusedButton=null;
}
}
};
ComboBoxBinding.prototype=new Binding;
ComboBoxBinding.prototype.constructor=ComboBoxBinding;
ComboBoxBinding.superclass=Binding.prototype;
function ComboBoxBinding(){
this.logger=SystemLogger.getLogger("ComboBoxBinding");
return this;
}
ComboBoxBinding.prototype.toString=function(){
return "[ComboBoxBinding]";
};
ComboBoxBinding.prototype.onBindingAttach=function(){
ComboBoxBinding.superclass.onBindingAttach.call(this);
var text=this.bindingDocument.createTextNode(Resolver.resolve("\u25bc"));
this.bindingElement.appendChild(text);
};
ComboBoxBinding.newInstance=function(_bdc){
var _bdd=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bdc);
return UserInterface.registerBinding(_bdd,ComboBoxBinding);
};
ToolBarComboButtonBinding.prototype=new ToolBarButtonBinding;
ToolBarComboButtonBinding.prototype.constructor=ToolBarComboButtonBinding;
ToolBarComboButtonBinding.superclass=ToolBarButtonBinding.prototype;
ToolBarComboButtonBinding.CLASSNAME_COMBOBUTTON="combobutton";
function ToolBarComboButtonBinding(){
this.logger=SystemLogger.getLogger("ToolBarComboButtonBinding");
this.isComboButton=true;
this.isCheckButton=true;
return this;
}
ToolBarComboButtonBinding.prototype.toString=function(){
return "[ToolBarComboButtonBinding]";
};
ToolBarComboButtonBinding.prototype.onBindingAttach=function(){
ToolBarComboButtonBinding.superclass.onBindingAttach.call(this);
this.comboBoxBinding=ComboBoxBinding.newInstance(this.bindingDocument);
this.add(this.comboBoxBinding);
this.comboBoxBinding.attach();
this.attachClassName(ToolBarComboButtonBinding.CLASSNAME_COMBOBUTTON);
};
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bde,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bde,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _be2=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_be2.each(function(_be3){
var _be4=_be3.getProperty("oncommand");
_be3.setProperty("hiddencommand",_be4);
_be3.deleteProperty("oncommand");
_be3.oncommand=function(){
self.setAndFireButton(this);
};
});
var _be5=null;
var _be6=this.getActiveMenuItemId();
_be2.reset();
while(_be2.hasNext()){
var _be7=_be2.getNext();
if(_be7.getProperty("id")==_be6){
_be5=_be7;
break;
}
}
if(_be5==null&&_be2.hasEntries()){
_be5=_be2.getFirst();
}
if(_be5!=null){
this.setButton(_be5);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_be8){
if(_be8 instanceof MenuItemBinding){
var _be9=_be8.getProperty("label");
var _bea=_be8.getProperty("image");
var _beb=_be8.getProperty("image-hover");
var _bec=_be8.getProperty("image-active");
var _bed=_be8.getProperty("image-disabled");
var _bee=_be8.getProperty("hiddencommand");
this.setLabel(_be9?_be9:"");
this.image=_bea;
this.imageHover=_bea;
this.imageActive=_bec;
this.imageDisabled=_bed;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bee,this);
};
this.hideActiveItem(_be8);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bef){
if(_bef instanceof MenuItemBinding){
this.setButton(_bef);
this.setActiveMenuItemId(_bef.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bf0){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bf1){
if(_bf1==_bf0){
Binding.prototype.hide.call(_bf1);
}else{
Binding.prototype.show.call(_bf1);
}
});
};
ToolBarComboButtonBinding.prototype.setActiveMenuItemId=function(id){
Cookies.createCookie(this.getProperty("id"),id,365);
};
ToolBarComboButtonBinding.prototype.getActiveMenuItemId=function(){
return Cookies.readCookie(this.getProperty("id"));
};
ToolBoxToolBarButtonBinding.prototype=new ToolBarButtonBinding;
ToolBoxToolBarButtonBinding.prototype.constructor=ToolBoxToolBarButtonBinding;
ToolBoxToolBarButtonBinding.superclass=ToolBarButtonBinding.prototype;
function ToolBoxToolBarButtonBinding(){
this.logger=SystemLogger.getLogger("ToolBoxToolBarButtonBinding");
this._views=new Map();
this._lastGeneratedPerspective=null;
return this;
}
ToolBoxToolBarButtonBinding.prototype.toString=function(){
return "[ToolBoxToolBarButtonBinding]";
};
ToolBoxToolBarButtonBinding.prototype.onBindingAttach=function(){
ToolBoxToolBarButtonBinding.superclass.onBindingAttach.call(this);
if(System.hasActivePerspectives){
this.subscribe(BroadcastMessages.PERSPECTIVE_CHANGED);
var _bf3=this._views;
for(var _bf4 in ViewDefinitions){
var def=ViewDefinitions[_bf4];
var key=def.perspective;
if(key!=null){
if(!_bf3.has(key)){
_bf3.set(key,new List());
}
var list=_bf3.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bf8,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bf8,arg);
switch(_bf8){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bfb=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bfb.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bfb.add(StageViewMenuItemBinding.newInstance(_bfb.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bfb.show();
}else{
_bfb.hide();
}
}
break;
}
};
TreeBinding.prototype=new FlexBoxBinding;
TreeBinding.prototype.constructor=TreeBinding;
TreeBinding.superclass=FlexBoxBinding.prototype;
TreeBinding.ACTION_SELECTIONCHANGED="tree selection changed";
TreeBinding.ACTION_NOSELECTION="tree selection none";
TreeBinding.SELECTIONTYPE_SINGLE="single";
TreeBinding.SELECTIONTYPE_MULTIPLE="multiple";
TreeBinding.grid=function(_bff){
var _c00=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bff);
var _c02=_bff%_c00;
if(_c02>0){
_bff=_bff-_c02+_c00;
}
return _bff+TreeBodyBinding.PADDING_TOP;
};
function TreeBinding(){
this.logger=SystemLogger.getLogger("TreeBinding");
this.isFocusable=true;
this.isFocused=false;
this._treeBodyBinding=null;
this._positionIndicatorBinding=null;
this._treeNodeBuffer=null;
this._treeNodeBindings=null;
this._focusedTreeNodeBindings=null;
this._isFocusable=true;
this._isSelectable=false;
this._selectionProperty=null;
this._selectonValue=null;
this._selectedTreeNodeBindings=null;
this._selectionType=TreeBinding.SELECTIONTYPE_SINGLE;
this._actionFilter=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
this._acceptingTreeNodeBinding=null;
this._acceptingPositions=null;
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID,FitnessCrawler.ID]);
this._hasKeyboard=false;
this._yposition=0;
this._openTreeNodesBackupMap=null;
return this;
}
TreeBinding.prototype.toString=function(){
return "[TreeBinding]";
};
TreeBinding.prototype.onBindingRegister=function(){
TreeBinding.superclass.onBindingRegister.call(this);
this._treeNodeBindings=new Map();
this._treeNodeBuffer=new List();
this._focusedTreeNodeBindings=new List();
};
TreeBinding.prototype.onBindingAttach=function(){
TreeBinding.superclass.onBindingAttach.call(this);
var _c03=this.getProperty("focusable");
if(_c03!=null){
this._isFocusable=_c03;
}
if(!this._treeBodyBinding&&this.bindingElement.childElementCount===0){
this._treeBodyBinding=TreeBodyBinding.newInstance(this.bindingDocument);
this.bindingElement.appendChild(this._treeBodyBinding.bindingElement);
this._treeBodyBinding.attach();
}
if(!this._treeBodyBinding){
this._treeBodyBinding=this.addMember(this.getChildBindingByLocalName("treebody"));
}
if(!this._treeBodyBinding){
var cry="TreeBinding structure invalid. Missing TreeBodyBinding.";
this.logger.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}else{
this.addActionListener(Binding.ACTION_ACTIVATED);
this.addActionListener(TreeNodeBinding.ACTION_OPEN);
this.addActionListener(TreeNodeBinding.ACTION_CLOSE);
this.addActionListener(TreeNodeBinding.ACTION_DISPOSE);
if(this._isFocusable){
this.addActionListener(TreeNodeBinding.ACTION_ONFOCUS);
this.addActionListener(TreeNodeBinding.ACTION_ONMULTIFOCUS);
this.addActionListener(TreeNodeBinding.ACTION_BLUR);
}
this.subscribe(BroadcastMessages.TYPEDRAG_START);
this.subscribe(BroadcastMessages.TYPEDRAG_STOP);
this.addEventListener(DOMEvents.BEFOREUPDATE);
this.addEventListener(DOMEvents.AFTERUPDATE);
}
};
TreeBinding.prototype.onBindingInitialize=function(){
TreeBinding.superclass.onBindingInitialize.call(this);
this._setupTreeSelection();
var _c05=this.getProperty("builder");
if(_c05){
this._buildFromTextArea(_c05);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c06=this.getProperty("selectable");
var _c07=this.getProperty("selectionproperty");
var _c08=this.getProperty("selectionvalue");
if(_c06){
this.setSelectable(true);
if(_c07){
this.setSelectionProperty(_c07);
}
if(_c08){
this.setSelectionValue(_c08);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c0b=UserInterface.getBinding(area);
var _c0c=this._treeBodyBinding;
function build(){
_c0c.subTreeFromString(area.value);
}
_c0b.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c0d){
var _c0e=_c0d.getHandle();
if(this._treeNodeBindings.has(_c0e)){
throw "Duplicate treenodehandles registered: "+_c0d.getLabel();
}else{
this._treeNodeBindings.set(_c0e,_c0d);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c0e)){
_c0d.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c10){
this._treeNodeBindings.del(_c10.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c11){
var _c12=null;
if(this._treeNodeBindings.has(_c11)){
_c12=this._treeNodeBindings.get(_c11);
}else{
throw "No such treenode: "+_c11;
}
return _c12;
};
TreeBinding.prototype.handleAction=function(_c13){
TreeBinding.superclass.handleAction.call(this,_c13);
var _c14=_c13.target;
switch(_c13.type){
case TreeNodeBinding.ACTION_OPEN:
_c13.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c14);
_c13.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c14;
this.focusSingleTreeNodeBinding(_c14);
if(!this.isFocused){
this.focus();
}
_c13.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c14;
this.focusSingleTreeNodeBinding(_c14);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c14;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c14;
this.focusSingleTreeNodeBinding(_c14);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c13.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c14.isFocused){
this.blurSelectedTreeNodes();
}
_c13.consume();
break;
case TreeNodeBinding.ACTION_BLUR:
break;
case Binding.ACTION_ACTIVATED:
if(!this.isFocused){
this.focus();
}
break;
}
};
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c15,_c16){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c17){
if(_c17!=null&&!_c17.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c17);
_c17.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c18){
this.blurSelectedTreeNodes();
while(_c18.hasNext()){
var _c19=_c18.getNext();
this._focusedTreeNodeBindings.add(_c19);
_c19.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c1a=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c1b=false;
var _c1c=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c1d=this._focusedTreeNodeBindings.getNext();
var _c1e=_c1d.getProperty(this._selectionProperty);
if(_c1e!=null){
if(!this._selectionValue||this._selectionValue[_c1e]){
_c1c=(this._selectedTreeNodeBindings[_c1d.key]=_c1d);
var _c1f=_c1a[_c1d.key];
if(!_c1f||_c1f!=_c1c){
_c1b=true;
}
}
}
}
if(_c1c){
if(_c1b){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c1a){
for(var key in _c1a){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c21=new List();
for(var key in this._selectedTreeNodeBindings){
_c21.add(this._selectedTreeNodeBindings[key]);
}
return _c21;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c23){
_c23.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c24){
var _c25=_c24.getDescendantBindingsByLocalName("treenode");
var _c26=true;
var self=this;
_c25.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c26;
});
};
TreeBinding.prototype.getFocusedTreeNodeBindings=function(){
return this._focusedTreeNodeBindings.reset();
};
TreeBinding.prototype.focus=function(){
if(!this.isFocused){
this.isFocused=true;
FocusBinding.focusElement(this.bindingElement);
this.attachClassName(Binding.CLASSNAME_FOCUSED);
this.dispatchAction(Binding.ACTION_FOCUSED);
if(!this.getFocusedTreeNodeBindings().hasEntries()){
if(this.isFocusable){
this._focusDefault();
}
}
this._grabKeyboard();
}
};
TreeBinding.prototype._focusDefault=function(){
var _c29=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c29!=null){
this.focusSingleTreeNodeBinding(_c29);
_c29.callback();
}
};
TreeBinding.prototype.blur=function(){
if(this.isFocused){
this.isFocused=false;
this.detachClassName(Binding.CLASSNAME_FOCUSED);
this.dispatchAction(Binding.ACTION_BLURRED);
this._releaseKeyboard();
}
};
TreeBinding.prototype._grabKeyboard=function(){
this.subscribe(BroadcastMessages.KEY_ARROW);
this.subscribe(BroadcastMessages.KEY_ENTER);
this._hasKeyboard=true;
};
TreeBinding.prototype._releaseKeyboard=function(){
this.unsubscribe(BroadcastMessages.KEY_ARROW);
this.unsubscribe(BroadcastMessages.KEY_ENTER);
this._hasKeyboard=false;
};
TreeBinding.prototype.add=function(_c2a){
var _c2b=null;
if(this._treeBodyBinding){
_c2b=this._treeBodyBinding.add(_c2a);
}else{
this._treeNodeBuffer.add(_c2a);
_c2b=_c2a;
}
return _c2b;
};
TreeBinding.prototype.addFirst=function(_c2c){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c2d=this._treeBodyBinding.bindingElement;
_c2d.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c2e,_c2f){
if(_c2f.isContainer&&_c2f.isOpen){
_c2f.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c30){
this._isSelectable=_c30;
if(_c30){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c31){
this._selectionProperty=_c31;
};
TreeBinding.prototype.setSelectionValue=function(_c32){
if(_c32){
var list=new List(_c32.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c34,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c34,arg);
switch(_c34){
case BroadcastMessages.TYPEDRAG_START:
this.addEventListener(DOMEvents.MOUSEMOVE);
this._yposition=this.boxObject.getGlobalPosition().y;
break;
case BroadcastMessages.TYPEDRAG_STOP:
this.removeEventListener(DOMEvents.MOUSEMOVE);
this._positionIndicatorBinding.hide();
this._yposition=-1;
break;
case BroadcastMessages.KEY_ARROW:
this._navigateByKey(arg);
break;
case BroadcastMessages.KEY_ENTER:
var _c36=this.getFocusedTreeNodeBindings();
if(_c36.hasEntries()){
var node=_c36.getFirst();
if(node.isContainer){
if(node.isOpen){
node.close();
}else{
node.open();
}
}else{
node.fireCommand();
}
}
break;
}
};
TreeBinding.prototype._navigateByKey=function(key){
var _c39=this.getFocusedTreeNodeBindings();
if(_c39.hasEntries()){
var node=_c39.getFirst();
var next=null;
switch(key){
case KeyEventCodes.VK_UP:
next=node.getPreviousBindingByLocalName("treenode");
if(next!=null){
while(next.isContainer&&next.hasChildren()&&next.isOpen){
next=next.getChildBindingsByLocalName("treenode").getLast();
}
}
if(next==null){
next=node.getAncestorBindingByLocalName("treenode");
}
break;
case KeyEventCodes.VK_DOWN:
if(node.isContainer&&node.hasChildren()&&node.isOpen){
next=node.getChildBindingByLocalName("treenode");
}else{
next=node.getNextBindingByLocalName("treenode");
if(next==null){
var _c3c=null;
while(next==null&&(_c3c=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c3c!=null){
next=_c3c.getNextBindingByLocalName("treenode");
}
node=_c3c;
}
}
}
break;
case KeyEventCodes.VK_RIGHT:
if(node.isContainer){
if(!node.isOpen){
node.open();
}else{
if(node.hasChildren()){
next=node.getChildBindingByLocalName("treenode");
}
}
}
break;
case KeyEventCodes.VK_LEFT:
if(node.isContainer&&node.isOpen){
node.close();
}
break;
}
if(next!=null){
this.focusSingleTreeNodeBinding(next);
}
}
};
TreeBinding.prototype.handleEvent=function(e){
TreeBinding.superclass.handleEvent.call(this,e);
var _c3e=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.MOUSEMOVE:
try{
this._updatePositionIndicator(e);
}
catch(exception){
this.removeEventListener(DOMEvents.MOUSEMOVE);
throw (exception);
}
break;
case DOMEvents.BEFOREUPDATE:
var _c3f=new TreeCrawler();
var list=new List();
_c3f.mode=TreeCrawler.MODE_GETOPEN;
_c3f.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c42=list.getNext();
map.set(_c42.getHandle(),true);
}
this._openTreeNodesBackupMap=map;
}
break;
case DOMEvents.AFTERUPDATE:
this._openTreeNodesBackupMap=null;
break;
}
};
TreeBinding.prototype._updatePositionIndicator=function(e){
var y=e.clientY-this._yposition;
var pos=this._acceptingPosition;
var dim=this._acceptingDimension;
var _c47=this._positionIndicatorBinding;
if(this._acceptingTreeNodeBinding){
var miny=pos.y;
var maxy=pos.y+dim.h;
if(y>=miny&&y<=maxy){
y=y<miny+TreeNodeBinding.HEIGHT?miny+TreeNodeBinding.HEIGHT:y;
y=y-TreeNodeBinding.HEIGHT;
y=TreeBinding.grid(y);
while(!this._acceptingPositions[y]){
y+=TreeNodeBinding.HEIGHT;
}
if(y!=_c47.getPosition().y){
_c47.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c47.isVisible){
_c47.show();
}
}else{
if(_c47.isVisible){
_c47.hide();
}
}
}else{
if(_c47.isVisible){
_c47.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c4a){
this._acceptingTreeNodeBinding=_c4a;
this._acceptingPosition=_c4a.boxObject.getLocalPosition();
this._acceptingDimension=_c4a.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c4a);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c4b){
var map={};
var _c4d=_c4b.getChildBindingsByLocalName("treenode");
var _c4e,pos,dim,y;
y=TreeBinding.grid(_c4b.boxObject.getLocalPosition().y);
map[y]=true;
while(_c4d.hasNext()){
_c4e=_c4d.getNext();
pos=_c4e.boxObject.getLocalPosition();
dim=_c4e.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c54 in this._acceptingPositions){
if(_c54==y){
break;
}else{
drop++;
}
}
return Number(drop);
};
TreeBinding.prototype.getRootTreeNodeBindings=function(){
return this._treeBodyBinding.getChildBindingsByLocalName("treenode");
};
TreeBinding.newInstance=function(_c55){
var _c56=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c55);
var _c57=UserInterface.registerBinding(_c56,TreeBinding);
_c57.treeBodyBinding=TreeBodyBinding.newInstance(_c55);
return _c57;
};
TreeBodyBinding.prototype=new FlexBoxBinding;
TreeBodyBinding.prototype.constructor=TreeBodyBinding;
TreeBodyBinding.superclass=FlexBoxBinding.prototype;
TreeBodyBinding.PADDING_TOP=8;
function TreeBodyBinding(){
this.logger=SystemLogger.getLogger("TreeBodyBinding");
this.containingTreeBinding=null;
return this;
}
TreeBodyBinding.prototype.toString=function(){
return "[TreeBodyBinding]";
};
TreeBodyBinding.prototype.onBindingAttach=function(){
TreeBodyBinding.superclass.onBindingAttach.call(this);
this.addActionListener(TreeNodeBinding.ACTION_FOCUSED);
this.containingTreeBinding=UserInterface.getBinding(this.bindingElement.parentNode);
};
TreeBodyBinding.prototype.accept=function(_c58){
if(_c58 instanceof TreeNodeBinding){
this.logger.debug(_c58);
}
};
TreeBodyBinding.newInstance=function(_c59){
var _c5a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c59);
return UserInterface.registerBinding(_c5a,TreeBodyBinding);
};
TreeNodeBinding.prototype=new Binding;
TreeNodeBinding.prototype.constructor=TreeNodeBinding;
TreeNodeBinding.superclass=Binding.prototype;
TreeNodeBinding.DEFAULT_FOLDER_CLOSED="${icon:folder}";
TreeNodeBinding.DEFAULT_FOLDER_OPEN="${icon:folder_active}";
TreeNodeBinding.DEFAULT_FOLDER_DISABLED="${icon:default}";
TreeNodeBinding.DEFAULT_ITEM="${root}/images/icons/harmony/composite/default_16.png";
TreeNodeBinding.DEFAULT_ITEM_DISABLED="${icon:default}";
TreeNodeBinding.ACTION_OPEN="treenodeopen";
TreeNodeBinding.ACTION_CLOSE="treenodeclose";
TreeNodeBinding.ACTION_ONFOCUS="treenodeonfocus";
TreeNodeBinding.ACTION_ONMULTIFOCUS="treenodeonmultifocus";
TreeNodeBinding.ACTION_FOCUSED="treenodefocused";
TreeNodeBinding.ACTION_BLUR="treenodeblur";
TreeNodeBinding.ACTION_COMMAND="treenodecommand";
TreeNodeBinding.ACTION_DISPOSE="treenodedisposed";
TreeNodeBinding.CLASSNAME_DRAGGED="dragged";
TreeNodeBinding.HEIGHT=19;
TreeNodeBinding.INDENT=16+18;
function TreeNodeBinding(){
this.logger=SystemLogger.getLogger("TreeNodeBinding");
this.hasBeenOpened=false;
this.isDisabled=false;
this.isFocused=false;
this.isOpen=false;
this.isContainer=false;
this.imageProfile=null;
this.image=null;
this.imageHover=null;
this.imageActive=null;
this.imageDisabled=null;
this.containingTreeBinding=null;
return this;
}
TreeNodeBinding.prototype.toString=function(){
return "[TreeNodeBinding]";
};
TreeNodeBinding.prototype.serialize=function(){
var _c5b=TreeNodeBinding.superclass.serialize.call(this);
if(_c5b){
_c5b.label=this.getLabel();
_c5b.image=this.getImage();
var _c5c=this.getHandle();
if(_c5c&&_c5c!=this.key){
_c5b.handle=_c5c;
}
if(this.isOpen){
_c5b.open=true;
}
if(this.isDisabled){
_c5b.disabled=true;
}
if(this.dragType){
_c5b.dragtype=this.dragType;
}
if(this.dragAccept){
_c5b.dragaccept=this.dragAccept;
}
}
return _c5b;
};
TreeNodeBinding.prototype.onBindingRegister=function(){
TreeNodeBinding.superclass.onBindingRegister.call(this);
this.propertyMethodMap["label"]=this.setLabel;
this.propertyMethodMap["image"]=this.setImage;
this.propertyMethodMap["tooltip"]=this.setToolTip;
};
TreeNodeBinding.prototype.onBindingAttach=function(){
TreeBinding.superclass.onBindingAttach.call(this);
this.isOpen=this.isOpen?true:this.getProperty("open");
if(!this.isContainer){
this.isContainer=this.hasChildren();
}
this.buildDOMContent();
this.assignDOMEvents();
if(this.isDisabled){
this.labelBinding.attachClassName(LabelBinding.CLASSNAME_GRAYTEXT);
}
this.addActionListener(TreeNodeBinding.ACTION_FOCUSED);
this.addEventListener(UpdateManager.EVENT_AFTERUPDATE);
this._registerWithAncestorTreeBinding();
};
TreeNodeBinding.prototype.onBindingDispose=function(){
if(this.isAttached){
if(this.dragger!=null){
this.labelBinding.removeEventListener(DOMEvents.MOUSEDOWN,this.dragger);
this.labelBinding.removeEventListener(DOMEvents.MOUSEMOVE,this.dragger);
this.labelBinding.removeEventListener(DOMEvents.MOUSEUP,this.dragger);
this.disableDragging();
this.dragger.dispose();
}
this.dispatchAction(TreeNodeBinding.ACTION_DISPOSE);
this.containingTreeBinding.unRegisterTreeNodeBinding(this);
this.labelBinding.dispose();
}
TreeNodeBinding.superclass.onBindingDispose.call(this);
};
TreeNodeBinding.prototype._registerWithAncestorTreeBinding=function(){
var node=this.bindingElement;
while((node=node.parentNode)!=null&&!this.containingTreeBinding){
var _c5e=UserInterface.getBinding(node);
if(_c5e&&_c5e.containingTreeBinding){
this.containingTreeBinding=_c5e.containingTreeBinding;
}
}
if(this.containingTreeBinding){
this.containingTreeBinding.registerTreeNodeBinding(this);
}else{
alert(this.bindingElement.parentNode.nodeName);
throw "TreeNodeBinding attached outside TreeBodyBinding";
}
};
TreeNodeBinding.prototype.getHandle=function(){
var _c5f=this.key;
var _c60=this.getProperty("handle");
if(_c60){
_c5f=_c60;
}
return _c5f;
};
TreeNodeBinding.prototype.setHandle=function(_c61){
this.setProperty("handle",_c61);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c63=this.getProperty("label");
var _c64=this.getProperty("tooltip");
var _c65=this.getProperty("oncommand");
var _c66=this.getProperty("onbindingfocus");
var _c67=this.getProperty("onbindingblur");
var _c68=this.getProperty("focused");
var _c69=this.getProperty("callbackid");
if(url){
var link=DOMUtil.createElementNS(Constants.NS_XHTML,"a",this.bindingDocument);
link.href=url;
this.bindingElement.appendChild(link);
this.shadowTree.link=link;
}
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
if(url){
this.shadowTree.link.appendChild(this.labelBinding.bindingElement);
}else{
this.addFirst(this.labelBinding);
}
this.shadowTree.label=this.labelBinding;
if(this.dragger!=null){
this.removeEventListener(DOMEvents.MOUSEDOWN,this.dragger);
this.removeEventListener(DOMEvents.MOUSEMOVE,this.dragger);
this.removeEventListener(DOMEvents.MOUSEUP,this.dragger);
this.labelBinding.addEventListener(DOMEvents.MOUSEDOWN,this.dragger);
this.labelBinding.addEventListener(DOMEvents.MOUSEMOVE,this.dragger);
this.labelBinding.addEventListener(DOMEvents.MOUSEUP,this.dragger);
}
if(this.isContainer&&!this.dragAccept){
this.acceptor=new BindingAcceptor(this);
}
if(_c63!=null){
this.setLabel(_c63);
}
if(_c64!=null){
this.setToolTip(_c64);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c6b=this.bindingWindow.WindowManager;
if(_c65!=null){
this.oncommand=function(){
Binding.evaluate(_c65,this);
};
}
if(_c66!=null){
this.onfocus=function(){
Binding.evaluate(_c66,this);
};
}
if(_c67!=null){
this.onblur=function(){
Binding.evaluate(_c67,this);
};
}
if(_c68==true){
this.focus();
}
if(_c69!=null){
Binding.dotnetify(this,_c69);
}
};
TreeNodeBinding.prototype.handleAction=function(_c6c){
TreeNodeBinding.superclass.handleAction.call(this,_c6c);
switch(_c6c.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c6c.target!=this){
if(this.isContainer&&!this.isOpen){
this.open(true);
}
}
break;
}
};
TreeNodeBinding.prototype.enableDragging=function(){
};
TreeNodeBinding.prototype.disableDragging=function(){
this.isDraggable=false;
};
TreeNodeBinding.prototype.accept=function(_c6d,_c6e){
var _c6f=true;
if(_c6d instanceof TreeNodeBinding){
var _c70=false;
var _c71=this.bindingElement;
var _c72=this.containingTreeBinding.bindingElement;
while(!_c70&&_c71!=_c72){
if(_c71==_c6d.getBindingElement()){
_c70=true;
}else{
_c71=_c71.parentNode;
}
}
if(_c70){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c6f=false;
}else{
this.acceptTreeNodeBinding(_c6d,_c6e);
}
}else{
_c6f=false;
}
return _c6f;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c73,_c74){
var _c75=_c73.serializeToString();
var _c76=new BindingParser(this.bindingDocument);
var _c77=_c76.parseFromString(_c75).getFirst();
_c74=_c74?_c74:this.containingTreeBinding.getDropIndex();
var _c78=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c77,_c78.get(_c74));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c73.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c79=this.getProperty("image");
var _c7a=this.getProperty("image-active");
var _c7b=this.getProperty("image-disabled");
_c7a=_c7a?_c7a:this.isContainer?_c79?_c79:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c79?_c79:TreeNodeBinding.DEFAULT_ITEM;
_c7b=_c7b?_c7b:this.isContainer?_c79?_c79:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c79?_c79:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c79=_c79?_c79:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c79,imageHover:null,imageActive:_c7a,imageDisabled:_c7b});
};
TreeNodeBinding.prototype.assignDOMEvents=function(){
this.labelBinding.addEventListener(DOMEvents.DOUBLECLICK,this);
this.labelBinding.addEventListener(DOMEvents.MOUSEDOWN,this);
this.labelBinding.addEventListener(DOMEvents.MOUSEOVER,this);
this.labelBinding.addEventListener(DOMEvents.MOUSEOUT,this);
};
TreeNodeBinding.prototype.setImage=function(url){
this.setProperty("image",url);
if(this.isAttached){
this.labelBinding.setImage(url);
}
};
TreeNodeBinding.prototype.setLabel=function(_c7d){
this.setProperty("label",String(_c7d));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7d));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c7e){
this.setProperty("tooltip",String(_c7e));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c7e));
}
};
TreeNodeBinding.prototype.getImage=function(){
return this.getProperty("image");
};
TreeNodeBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TreeNodeBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
TreeNodeBinding.prototype.computeImage=function(){
var _c7f=this.imageProfile.getDefaultImage();
var _c80=this.imageProfile.getActiveImage();
_c80=_c80?_c80:_c7f;
return this.isOpen?_c80:_c7f;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c82=DOMEvents.getTarget(e);
var _c83=this.labelBinding.bindingElement;
var _c84=this.labelBinding.shadowTree.labelBody;
var _c85=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c82){
case _c83:
this._onAction(e);
break;
case _c84:
case _c85:
if(!this.isDisabled){
this._onFocus(e);
}
break;
}
break;
case DOMEvents.DOUBLECLICK:
this._onAction(e);
break;
case UpdateManager.EVENT_AFTERUPDATE:
if(_c82.parentNode==this.bindingElement&&_c82.__updateType==Update.TYPE_INSERT){
var _c83=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c82)=="treenode"){
if(_c82==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c82,_c83.nextSibling);
}
}
break;
}
break;
}
if(BindingDragger.isDragging&&this.isContainer&&!this.isOpen){
switch(e.type){
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
switch(_c82){
case _c83:
case _c84:
case _c85:
this._folderDragOverTimeout(e);
break;
}
break;
}
}
};
TreeNodeBinding.prototype._folderDragOverTimeout=function(e){
var self=this;
switch(e.type){
case DOMEvents.MOUSEOVER:
this._dragTimeout=this.bindingWindow.setTimeout(function(){
self.open();
},500);
break;
case DOMEvents.MOUSEOUT:
this.bindingWindow.clearTimeout(this._dragTimeout);
break;
}
};
TreeNodeBinding.prototype._onAction=function(e){
var _c89=true;
if(e.type=="mousedown"){
var _c8a=e.button==(e.target?0:1);
if(!_c8a){
_c89=false;
}
}
if(_c89){
if(this.isContainer){
if(!this.isOpen){
this.open();
}else{
this.close();
}
}else{
this.fireCommand();
}
}
};
TreeNodeBinding.prototype.fireCommand=function(){
if(this.oncommand){
this.oncommand();
}
this.dispatchAction(TreeNodeBinding.ACTION_COMMAND);
};
TreeNodeBinding.prototype._onFocus=function(e){
var _c8c=false;
if(e!=null){
_c8c=e.shiftKey;
}
this.dispatchAction(_c8c?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
if(e!=null){
this.stopPropagation(e);
}
if(this.onfocus!=null){
this.onfocus();
}
if(e!=null){
if(this.hasCallBackID()){
this.callback();
}
}
};
TreeNodeBinding.prototype.callback=function(){
if(this.hasCallBackID()){
var self=this;
setTimeout(function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
},0);
}
};
TreeNodeBinding.prototype.invokeManagedFocus=function(){
if(!this.isFocused){
this.isFocused=true;
this.setProperty("focused",true);
this.labelBinding.attachClassName("focused");
this.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
};
TreeNodeBinding.prototype.focus=function(){
this.setProperty("focused",true);
if(this.isAttached){
this._onFocus();
}
};
TreeNodeBinding.prototype.blur=function(){
if(this.isFocused){
this.isFocused=false;
this.deleteProperty("focused");
this.labelBinding.detachClassName("focused");
if(this.onblur){
this.onblur();
}
this.dispatchAction(TreeNodeBinding.ACTION_BLUR);
}
};
TreeNodeBinding.prototype.stopPropagation=function(e){
if(e.type=="mousedown"){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,e);
this.dispatchAction(Binding.ACTION_ACTIVATED);
}
DOMEvents.stopPropagation(e);
};
TreeNodeBinding.prototype.open=function(){
if(this.isContainer&&!this.isOpen){
this.isOpen=true;
this.setProperty("open",true);
this.dispatchAction(TreeNodeBinding.ACTION_OPEN);
this.setImage(this.computeImage());
this.updateClassNames();
this.hasBeenOpened=true;
}
};
TreeNodeBinding.prototype.close=function(){
if(this.isContainer&&this.isOpen){
this.isOpen=false;
this.setProperty("open",false);
this.dispatchAction(TreeNodeBinding.ACTION_CLOSE);
this.setImage(this.computeImage());
this.updateClassNames();
}
};
TreeNodeBinding.prototype.updateClassNames=function(){
if(this.isContainer){
if(!this.hasClassName("container")){
this.attachClassName("container");
}
if(this.isOpen){
this.detachClassName("closed");
this.attachClassName("open");
this.labelBinding.detachClassName("closed");
this.labelBinding.attachClassName("open");
}else{
this.detachClassName("open");
this.attachClassName("closed");
this.labelBinding.detachClassName("open");
this.labelBinding.attachClassName("closed");
}
}else{
if(this.hasClassName("container")){
this.detachClassName("container");
this.labelBinding.detachClassName("closed");
this.labelBinding.detachClassName("open");
}
}
};
TreeNodeBinding.prototype.empty=function(){
var _c8f=this.getDescendantBindingsByLocalName("treenode");
_c8f.each(function(_c90){
_c90.dispose();
});
};
TreeNodeBinding.prototype.showDrag=function(){
this.attachClassName(TreeNodeBinding.CLASSNAME_DRAGGED);
};
TreeNodeBinding.prototype.hideDrag=function(){
this.detachClassName(TreeNodeBinding.CLASSNAME_DRAGGED);
};
TreeNodeBinding.prototype.hasChildren=function(){
return this.bindingElement.hasChildNodes();
};
TreeNodeBinding.prototype.handleElement=function(_c91){
var _c92=_c91.getAttribute("focused");
if(_c92=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c93){
var _c94=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c93);
return UserInterface.registerBinding(_c94,TreeNodeBinding);
};
TreeContentBinding.prototype=new Binding;
TreeContentBinding.prototype.constructor=TreeContentBinding;
TreeContentBinding.superclass=Binding.prototype;
function TreeContentBinding(){
this.logger=SystemLogger.getLogger("TreeContentBinding");
return this;
}
TreeContentBinding.prototype.toString=function(){
return "[TreeContentBinding]";
};
TreeContentBinding.newInstance=function(_c95){
var _c96=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c95);
return UserInterface.registerBinding(_c96,TreeContentBinding);
};
TreePositionIndicatorBinding.prototype=new Binding;
TreePositionIndicatorBinding.prototype.constructor=TreePositionIndicatorBinding;
TreePositionIndicatorBinding.superclass=Binding.prototype;
function TreePositionIndicatorBinding(){
this.logger=SystemLogger.getLogger("TreePositionIndicatorBinding");
this._geometry={x:0,y:0};
}
TreePositionIndicatorBinding.prototype.toString=function(){
return "[TreePositionIndicatorBinding]";
};
TreePositionIndicatorBinding.prototype.onBindingAttach=function(){
TreePositionIndicatorBinding.superclass.onBindingAttach.call(this);
this.hide();
};
TreePositionIndicatorBinding.prototype.setPosition=function(_c97){
this.bindingElement.style.left=_c97.x+"px";
this.bindingElement.style.top=_c97.y+"px";
this._geometry.x=_c97.x;
this._geometry.y=_c97.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c98){
var _c99=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c98);
return UserInterface.registerBinding(_c99,TreePositionIndicatorBinding);
};
TreeCrawler.prototype=new BindingCrawler;
TreeCrawler.prototype.constructor=TreeCrawler;
TreeCrawler.superclass=BindingCrawler.prototype;
TreeCrawler.ID="treecrawler";
TreeCrawler.MODE_GETOPEN="get open treenodes";
function TreeCrawler(){
this.mode=TreeCrawler.MODE_GETOPEN;
this.id=TreeCrawler.ID;
this._construct();
return this;
}
TreeCrawler.prototype._construct=function(){
TreeCrawler.superclass._construct.call(this);
var self=this;
this.addFilter(function(_c9b){
var _c9c=UserInterface.getBinding(_c9b);
var _c9d=null;
var _c9d=null;
if(!_c9c instanceof TreeNodeBinding){
_c9d=NodeCrawler.SKIP_NODE;
}
return _c9d;
});
this.addFilter(function(_c9e,list){
var _ca0=UserInterface.getBinding(_c9e);
var _ca1=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca0.isOpen){
list.add(_ca0);
}
break;
}
return _ca1;
});
};
DockTabsButtonBinding.prototype=new TabsButtonBinding;
DockTabsButtonBinding.prototype.constructor=DockTabsButtonBinding;
DockTabsButtonBinding.superclass=TabsButtonBinding.prototype;
DockTabsButtonBinding.RESERVED_SPACE=50;
DockTabsButtonBinding.NODENAME_TABBOX="dock";
function DockTabsButtonBinding(){
this.logger=SystemLogger.getLogger("DockTabsButtonBinding");
}
DockTabsButtonBinding.prototype.toString=function(){
return "[DockTabsButtonBinding]";
};
DockTabsButtonBinding.newInstance=function(_ca2){
var _ca3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca2);
_ca3.setAttribute("type","checkbox");
_ca3.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca3.className="tabbutton";
return UserInterface.registerBinding(_ca3,DockTabsButtonBinding);
};
DockBinding.prototype=new TabBoxBinding;
DockBinding.prototype.constructor=DockBinding;
DockBinding.superclass=TabBoxBinding.prototype;
DockBinding.START="start";
DockBinding.EXTERNAL="external";
DockBinding.EXPLORER="explorer";
DockBinding.MAIN="main";
DockBinding.BOTTOMLEFT="bottomleft";
DockBinding.BOTTOMRIGHT="bottomright";
DockBinding.RIGHTTOP="righttop";
DockBinding.RIGHTBOTTOM="rightbottom";
DockBinding.ABSBOTTOMLEFT="absbottomleft";
DockBinding.ABSBOTTOMRIGHT="absbottomright";
DockBinding.ABSRIGHTTOP="absrighttop";
DockBinding.ABSRIGHTBOTTOM="absrightbottom";
DockBinding.TYPE_START="start";
DockBinding.TYPE_EXPLORER="explorer";
DockBinding.TYPE_EDITORS="editors";
DockBinding.TYPE_TOOLS="tools";
DockBinding.ACTION_OPENED="dockopened";
DockBinding.ACTION_EMPTIED="dockemptied";
DockBinding.CLASSNAME_ACTIVE="active";
function DockBinding(){
this.logger=SystemLogger.getLogger("DockBinding");
this.isActive=false;
this.isActivatable=true;
this.type=null;
this.reference=null;
this.isCollapsed=false;
this.isEmpty=true;
this._containingSplitPanelBinding=null;
this._viewBindingList=null;
this.perspectiveNode=null;
this._nodename_tab="docktab";
this._nodename_tabs="docktabs";
this._nodename_tabpanel="dockpanel";
this._nodename_tabpanels="dockpanels";
this._impl_tab=DockTabBinding;
this._impl_tabs=DockTabsBinding;
this._impl_tabpanel=DockPanelBinding;
this._impl_tabpanels=DockPanelsBinding;
}
DockBinding.prototype.toString=function(){
return "[DockBinding]";
};
DockBinding.prototype.serialize=function(){
var _ca4=DockBinding.superclass.serialize.call(this);
if(_ca4){
_ca4.active=this.isActive?true:null;
_ca4.collapsed=this.isCollapsed?true:null;
}
return _ca4;
};
DockBinding.prototype.onBindingRegister=function(){
DockBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_ACTIVATED,this);
this.addActionListener(TabBoxBinding.ACTION_UPDATED,this);
this.addActionListener(ViewBinding.ACTION_LOADED);
this.addActionListener(ViewBinding.ACTION_CLOSED);
this.subscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS);
this._viewBindingList=new List();
this.reference=this.getProperty("reference");
};
DockBinding.prototype.onBindingAttach=function(){
DockBinding.superclass.onBindingAttach.call(this);
this._containingSplitPanelBinding=this.getAncestorBindingByLocalName("splitpanel");
if(this.getTabBindings().hasEntries()){
this.isEmpty=false;
this.isActivatable=true;
}else{
this.dispatchAction(DockBinding.ACTION_EMPTIED);
}
};
DockBinding.prototype.buildDOMContent=function(){
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_ca6){
var _ca7=this.getSelectedTabPanelBinding();
if(_ca7){
_ca7.isVisible=_ca6;
_ca7.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca8){
var _ca9=this._getBindingForDefinition(_ca8);
var _caa=DockTabBinding.newInstance(this.bindingDocument);
_caa.setHandle(_ca8.handle);
_caa.setLabel(_ca8.flowHandle?null:_ca8.label);
_caa.setImage(_ca8.image);
_caa.setToolTip(_ca8.toolTip);
_caa.setEntityToken(_ca8.entityToken);
_caa.setAssociatedView(_ca9);
this.appendTabByBindings(_caa,null);
this._setupPageBindingListeners(_caa);
var _cab=this.getTabPanelBinding(_caa);
_ca9.snapToBinding(_cab);
var _cac=this.bindingWindow.bindingMap.views;
_cac.add(_ca9);
if(!this.isActive){
this.activate();
}
_ca9.attach();
};
DockBinding.prototype.prepareOpenView=function(_cad,_cae){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cae.setLabel(_cad.label);
_cae.setImage(_cad.image);
_cae.setToolTip(_cad.toolTip);
this._setupPageBindingListeners(_cae);
var _caf=this.getTabPanelBinding(_cae);
var _cb0=this._getBindingForDefinition(_cad);
_cae.setAssociatedView(_cb0);
_cb0.snapToBinding(_caf);
UserInterface.getBinding(this.bindingDocument.body).add(_cb0);
_cb0.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb1){
var _cb2=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb2.bindingDocument);
view.setDefinition(_cb1);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb4){
var _cb5=this.getTabPanelBinding(_cb4);
var self=this;
var _cb7={handleAction:function(_cb8){
var _cb9=_cb8.target;
switch(_cb8.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cb9.reflex(true);
var view=_cb4.getAssociatedView();
if(_cb9.bindingWindow==view.getContentWindow()){
_cb4.updateDisplay(_cb9);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb4.onPageInitialize(_cb9);
_cb8.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb4.getAssociatedView();
if(_cb9.bindingWindow==view.getContentWindow()){
_cb4.updateDisplay(_cb9);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb4.updateDisplay(_cb9);
_cb8.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb4.updateEntityToken(_cb9);
_cb8.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb4.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb4.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb4);
_cb8.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb4,true);
_cb8.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb4);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb5.reflex(true);
_cb8.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb4.isDirty){
_cb4.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cbb){
_cb5.addActionListener(_cbb,_cb7);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cbc){
DockBinding.superclass.handleAction.call(this,_cbc);
var _cbd=_cbc.target;
switch(_cbc.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cbc.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cbd instanceof DockBinding){
if(_cbd.updateType==TabBoxBinding.UPDATE_DETACH){
if(!this.getTabElements().hasEntries()){
this.isEmpty=true;
this.isActivatable=false;
if(this.isActive==true){
this.deActivate();
}
this.dispatchAction(DockBinding.ACTION_EMPTIED);
}
}
}
break;
case ViewBinding.ACTION_LOADED:
this._viewBindingList.add(_cbd);
if(this.isActive){
_cbd.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cbd);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cbe,arg){
DockBinding.superclass.handleBroadcast.call(this,_cbe,arg);
switch(_cbe){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cc0=arg;
if(_cc0.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cc0.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc1){
var tabs=this.getTabBindings();
var _cc3=false;
while(tabs.hasNext()&&!_cc3){
var tab=tabs.getNext();
var _cc5=tab.getEntityToken();
if(_cc5!=null&&_cc5==_cc1){
if(!tab.isSelected){
this.select(tab,true);
_cc3=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc6){
this._handleCollapse(true,_cc6);
};
DockBinding.prototype.unCollapse=function(_cc7){
this._handleCollapse(false,_cc7);
};
DockBinding.prototype._handleCollapse=function(_cc8,_cc9){
var _cca=this.getChildBindingByLocalName("dockpanels");
var _ccb=this.getAncestorBindingByLocalName("splitbox");
if(_cc8){
_cca.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cc9&&_ccb.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cca.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cc9){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc8);
this.isCollapsed=_cc8;
};
DockBinding.prototype.activate=function(){
if(!this.isActive){
this.isActive=true;
this.attachClassName(DockBinding.CLASSNAME_ACTIVE);
this.setProperty("active",true);
if(this._containingSplitPanelBinding){
this._containingSplitPanelBinding.isActive=true;
}
this.getTabBindings().each(function(tab){
tab.onActivate();
});
this._viewBindingList.each(function(view){
view.onActivate();
});
Application.activate(this);
}
};
DockBinding.prototype.deActivate=function(){
if(this.isActive==true){
this.isActive=false;
this.detachClassName(DockBinding.CLASSNAME_ACTIVE);
this.deleteProperty("active");
if(this._containingSplitPanelBinding){
this._containingSplitPanelBinding.isActive=false;
}
this.getTabBindings().each(function(tab){
tab.onDeactivate();
});
this._viewBindingList.each(function(view){
view.onDeactivate();
});
Application.deActivate(this);
}
};
DockBinding.prototype.closeTab=function(_cd0,_cd1){
if(_cd0.isDirty&&!_cd1){
var _cd2=Resolver.resolve(_cd0.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd2),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd4){
switch(_cd4){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cd0);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cd0);
break;
}
}});
}else{
this.removeTab(_cd0);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd5){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd5){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd8){
var _cd9=_cd8.getAssociatedView();
_cd9.saveContainedEditor();
var self=this;
var _cdb={handleBroadcast:function(_cdc,arg){
switch(_cdc){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cd9.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cdb);
if(arg.isSuccess){
self.removeTab(_cd8);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cdb);
};
DockBinding.prototype.appendTabByBindings=function(_cde,_cdf){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cde,_cdf);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ce0){
_ce0=_ce0?_ce0+"px":"100%";
this.bindingElement.style.width=_ce0;
};
DockBinding.prototype.show=function(){
if(this.isVisible){
DockBinding.superclass.show.call(this);
this.isFlexible=true;
}
};
DockBinding.prototype.hide=function(){
if(!this.isVisible){
DockBinding.superclass.hide.call(this);
this.isFlexible=false;
if(this.isActive){
this.deActivate();
}
}
};
DockBinding.prototype.getBestTab=function(){
var _ce1=null;
var _ce2=this.getTabBindings();
var _ce3=_ce2.getLength();
if(_ce3==1){
_ce1=null;
}else{
_ce1=_ce2.get(0);
}
return _ce1;
};
DockTabsBinding.prototype=new TabsBinding;
DockTabsBinding.prototype.constructor=DockTabsBinding;
DockTabsBinding.superclass=TabsBinding.prototype;
DockTabsBinding.NODENAME_TABBOX="dock";
DockTabsBinding.TABBUTTON_IMPLEMENTATION=DockTabsButtonBinding;
function DockTabsBinding(){
this.logger=SystemLogger.getLogger("DockTabsBinding");
}
DockTabsBinding.prototype.toString=function(){
return "[DockTabsBinding]";
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce5=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce5)){
_ce5=_ce5>0?_ce5-1:0;
self.bindingElement.style.width=new String(_ce5)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce6){
DockTabsBinding.superclass.handleCrawler.call(this,_ce6);
switch(_ce6.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce8=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce8)){
_ce8=_ce8>0?_ce8-1:0;
self.bindingElement.style.width=new String(_ce8)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_ce9){
var _cea=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce9);
return UserInterface.registerBinding(_cea,DockTabsBinding);
};
DockTabBinding.prototype=new TabBinding;
DockTabBinding.prototype.constructor=DockTabBinding;
DockTabBinding.superclass=TabBinding.prototype;
DockTabBinding.ACTION_FORCE_CLEAN="docktab force clean";
DockTabBinding.ACTION_UPDATE_VISUAL="docktab update visual";
DockTabBinding.ACTION_UPDATE_TOKEN="docktab update token";
DockTabBinding.NODENAME_TABBOX="dock";
DockTabBinding.LABEL_TABLOADING="${string:Website.App.LabelLoading}";
DockTabBinding.LABEL_TABDEFAULT="${string:Website.App.LabelLoaded}";
DockTabBinding.LABEL_TABSAVED="${string:Website.App.LabelSaved}";
DockTabBinding.IMG_TABLOADING="${icon:loading}";
DockTabBinding.IMG_TABDEFAULT="${icon:default}";
function DockTabBinding(){
this.logger=SystemLogger.getLogger("DockTabBinding");
this.perspectiveNode=null;
this._controlGroupBinding=null;
this._viewBinding=null;
this.isDirty=false;
this.isInitiallyHidden=true;
this._entityToken=null;
this._canUpdateTree=true;
return this;
}
DockTabBinding.prototype.toString=function(){
return "[DockTabBinding]";
};
DockTabBinding.prototype.onBindingAttach=function(){
DockTabBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.BIND_TOKEN_TO_VIEW);
this.perspectiveNode=this.containingTabBoxBinding.perspectiveNode;
this.addActionListener(ControlBinding.ACTION_COMMAND,this);
if(this.containingTabBoxBinding.type!=DockBinding.EXPLORER){
this.setContextMenu(top.app.bindingMap.docktabpopup);
}
};
DockTabBinding.prototype.setAssociatedView=function(_ceb){
this._viewBinding=_ceb;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cec=DockTabBinding.superclass.serialize.call(this);
if(_cec){
_cec.label=null;
_cec.image=null;
_cec.handle=this.getHandle();
}
return _cec;
};
DockTabBinding.prototype.setHandle=function(_ced){
this.setProperty("handle",_ced);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cee){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cee;
if(this.isAttached){
if(this.isSelected){
this._updateTree(true);
}
}
};
DockTabBinding.prototype.getEntityToken=function(){
return this._entityToken;
};
DockTabBinding.prototype.buildDOMContent=function(){
DockTabBinding.superclass.buildDOMContent.call(this);
if(this.getProperty("pinned")!=true){
this._controlGroupBinding=this.labelBinding.add(ControlGroupBinding.newInstance(this.bindingDocument));
var _cef=DialogControlBinding.newInstance(this.bindingDocument);
_cef.setControlType(ControlBinding.TYPE_CLOSE);
_cef.attachClassName("closecontrol");
this._controlGroupBinding.add(_cef);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_cf0){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cf0){
this.isDirty=_cf0;
if(Binding.exists(this.labelBinding)){
var _cf1=this.labelBinding.getLabel();
if(_cf1!=null){
this.labelBinding.setLabel(_cf0?"*"+_cf1:_cf1.slice(1,_cf1.length));
}else{
this.labelBinding.setLabel(_cf0?"*":"");
}
}
}
var _cf2=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf2.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf2.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf3){
this.setLabel(_cf3.getLabel());
this.setImage(_cf3.getImage());
this.setToolTip(_cf3.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf4){
this.setEntityToken(_cf4.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cf5){
DockTabBinding.superclass.handleAction.call(this,_cf5);
var _cf6=_cf5.target;
switch(_cf5.type){
case ControlBinding.ACTION_COMMAND:
if(_cf6.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cf5.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf6);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf7){
var cmd=_cf7.getProperty("cmd");
switch(cmd){
case DockTabPopupBinding.CMD_REFRESH:
if(this.containingTabBoxBinding.type!=DockBinding.TYPE_TOOLS){
this.setLabel(DockTabBinding.LABEL_TABLOADING);
}
this.setImage(DockTabBinding.IMG_TABLOADING);
this._viewBinding.reload(Application.isDeveloperMode);
this.isDirty=false;
break;
case DockTabPopupBinding.CMD_MAKEDIRTY:
this.setDirty(true);
break;
case DockTabPopupBinding.CMD_VIEWSOURCE:
case DockTabPopupBinding.CMD_VIEWGENERATED:
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
this._viewSource(cmd);
break;
case DockTabPopupBinding.CMD_CLOSETAB:
this.close();
break;
case DockTabPopupBinding.CMD_CLOSEOTHERS:
this.containingTabBoxBinding.closeTabsExcept(this);
break;
default:
alert("TODO!");
break;
}
};
DockTabBinding.prototype.setLabel=function(_cf9){
if(!_cf9){
if(!this.getLabel()){
_cf9=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf9=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cf9=this.isDirty?"*"+_cf9:_cf9;
DockTabBinding.superclass.setLabel.call(this,_cf9);
};
DockTabBinding.prototype.setImage=function(_cfa){
if(!_cfa){
if(!this.getImage()){
_cfa=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cfa=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cfa);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cfd=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cfd;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cfd;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cfd;
break;
}
StageBinding.presentViewDefinition(def);
};
DockTabBinding.prototype.onActivate=function(){
this._updateBroadcasters();
if(this.isSelected){
this._updateTree();
}
if(this._controlGroupBinding){
this._controlGroupBinding.onActivate();
}
if(this.isSelected){
this._updateGlobalEntityToken();
}
};
DockTabBinding.prototype.onDeactivate=function(){
if(this._controlGroupBinding){
this._controlGroupBinding.onDeactivate();
}
};
DockTabBinding.prototype.onPageInitialize=function(page){
this._updateBroadcasters();
if(this._isEditorDockTab()){
if(!this.hasSubscription(BroadcastMessages.CLOSE_ALL)){
this.subscribe(BroadcastMessages.CLOSE_CURRENT);
this.subscribe(BroadcastMessages.CLOSE_ALL);
}
}
};
DockTabBinding.prototype.saveContainedEditor=function(){
if(this._isEditorDockTab()&&this.isDirty==true){
this._viewBinding.saveContainedEditor();
}
};
DockTabBinding.prototype.show=function(){
DockTabBinding.superclass.show.call(this);
if(this.isVisible&&this.isInitiallyHidden&&Binding.exists(this)){
this.isInitiallyHidden=false;
var _cff=this.bindingElement;
setTimeout(function(){
_cff.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d00,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d00,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d00){
case BroadcastMessages.SAVE_CURRENT:
if(this.isDirty&&this.isSelected&&root.isActivated){
this.saveContainedEditor();
}
break;
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==this.getAssociatedView().getHandle()){
this.unsubscribe(BroadcastMessages.CURRENT_SAVED);
if(arg.isSuccess){
this._onSaveSuccess();
}else{
this._onSaveFailure();
}
}
break;
case BroadcastMessages.CLOSE_CURRENT:
if(this._isEditorDockTab()){
if(this.isSelected&&root.isActivated){
this.close();
}
}
break;
case BroadcastMessages.CLOSE_ALL:
if(this._isEditorDockTab()){
this.close();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR:
if(this.isSelected){
if(UserInterface.isBindingVisible(this)){
this._updateTree();
}
}
break;
case BroadcastMessages.BIND_TOKEN_TO_VIEW:
if(arg.handle==this._viewBinding.getDefinition().handle){
this.setEntityToken(arg.entityToken);
if(this.isSelected){
this._updateTree();
}
}
break;
}
};
DockTabBinding.prototype.onSaveStart=function(){
this.subscribe(BroadcastMessages.CURRENT_SAVED);
};
DockTabBinding.prototype._onSaveSuccess=function(){
var page=this._viewBinding.getPageBinding();
if(page!=null&&page instanceof EditorPageBinding){
page.onSaveSuccess();
}
};
DockTabBinding.prototype._onSaveFailure=function(){
};
DockTabBinding.prototype.select=function(_d05){
DockTabBinding.superclass.select.call(this,_d05);
this._updateBroadcasters();
if(_d05!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
if(this.getProperty("pinned")!=true){
this.containingTabBoxBinding.closeTab(this);
}
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d06=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d07=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d07.enable();
if(this.isDirty){
_d06.enable();
}else{
_d06.disable();
}
}else{
_d07.disable();
_d06.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d08){
if(this._canUpdateTree||_d08){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d09=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d0b=win.bindingMap.savebutton;
if(_d0b!=null){
_d09=true;
}
}
}
return _d09;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d0c){
var _d0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d0c);
return UserInterface.registerBinding(_d0d,DockTabBinding);
};
DockPanelsBinding.prototype=new TabPanelsBinding;
DockPanelsBinding.prototype.constructor=DockPanelsBinding;
DockPanelsBinding.superclass=TabPanelsBinding.prototype;
function DockPanelsBinding(){
this.logger=SystemLogger.getLogger("DockPanelsBinding");
this.isVisible=true;
return this;
}
DockPanelsBinding.prototype.toString=function(){
return "[DockPanelsBinding]";
};
DockPanelsBinding.newInstance=function(_d0e){
var _d0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d0e);
return UserInterface.registerBinding(_d0f,DockPanelsBinding);
};
DockPanelBinding.prototype=new TabPanelBinding;
DockPanelBinding.prototype.constructor=DockPanelBinding;
DockPanelBinding.superclass=TabPanelBinding.prototype;
DockPanelBinding.ACTION_FORCE_SELECT="dockpanel force select";
function DockPanelBinding(){
this.logger=SystemLogger.getLogger("DockPanelBinding");
this.viewBinding=null;
return this;
}
DockPanelBinding.prototype.toString=function(){
return "[DockPanelBinding]";
};
DockPanelBinding.prototype.onBindingDispose=function(){
DockPanelBinding.superclass.onBindingDispose.call(this);
this.dispatchAction(Binding.ACTION_DISPOSED);
};
DockPanelBinding.prototype.select=function(_d10){
DockPanelBinding.superclass.select.call(this,_d10);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d11){
DockPanelBinding.superclass.handleCrawler.call(this,_d11);
if(_d11.response==null){
if(_d11.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d11.id==FocusCrawler.ID){
_d11.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d12){
var _d13=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d12);
return UserInterface.registerBinding(_d13,DockPanelBinding);
};
DockTabPopupBinding.prototype=new PopupBinding;
DockTabPopupBinding.prototype.constructor=DockTabPopupBinding;
DockTabPopupBinding.superclass=PopupBinding.prototype;
DockTabPopupBinding.CMD_RESTORE="restore";
DockTabPopupBinding.CMD_MINIMIZE="minimize";
DockTabPopupBinding.CMD_MAXIMIZE="maximize";
DockTabPopupBinding.CMD_REFRESH="refreshview";
DockTabPopupBinding.CMD_MAKEDIRTY="makedirty";
DockTabPopupBinding.CMD_CLOSETAB="closetab";
DockTabPopupBinding.CMD_CLOSEOTHERS="closeothers";
DockTabPopupBinding.CMD_CLOSEALL="closeall";
DockTabPopupBinding.CMD_VIEWSOURCE="viewsource";
DockTabPopupBinding.CMD_VIEWGENERATED="viewgenerated";
DockTabPopupBinding.CMD_VIEWSERIALIZED="viewserialized";
function DockTabPopupBinding(){
this.logger=SystemLogger.getLogger("DockTabPopupBinding");
}
DockTabPopupBinding.prototype.toString=function(){
return "[DockTabPopupBinding]";
};
DockTabPopupBinding.prototype.onBindingAttach=function(){
DockTabPopupBinding.superclass.onBindingAttach.call(this);
this._indexMenuContent();
};
ViewSetBinding.prototype=new Binding;
ViewSetBinding.prototype.constructor=ViewSetBinding;
ViewSetBinding.superclass=Binding.prototype;
function ViewSetBinding(){
this.logger=SystemLogger.getLogger("ViewSetBinding");
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
ViewSetBinding.prototype.toString=function(){
return "[ViewSetBinding]";
};
ViewBinding.prototype=new FlexBoxBinding;
ViewBinding.prototype.constructor=ViewBinding;
ViewBinding.superclass=FlexBoxBinding.prototype;
ViewBinding.ACTION_LOADED="view loaded";
ViewBinding.ACTION_ONCLOSE="view onclose";
ViewBinding.ACTION_ONCLOSE_FORCE="view onclose force";
ViewBinding.ACTION_CLOSED="view closed";
ViewBinding.ACTION_DETACH="view detach";
ViewBinding.HORIZONTAL_ADJUST=1;
ViewBinding.VERTICAL_ADJUST=1;
ViewBinding.TYPE_EXPLORERVIEW="explorerview";
ViewBinding.TYPE_DOCKVIEW="dockview";
ViewBinding.TYPE_DIALOGVIEW="dialogview";
ViewBinding.CLASSNAME_ACTIVE="active";
ViewBinding.TIMEOUT=15;
ViewBinding._instances=new Map();
ViewBinding.getInstance=function(_d14){
var _d15=ViewBinding._instances.get(_d14);
if(!_d15){
var cry="ViewBinding.getInstance: No such instance: "+_d14;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d15;
};
function ViewBinding(){
this.logger=SystemLogger.getLogger("ViewBinding");
this._viewDefinition=null;
this.isVisible=false;
this._isViewBindingInitialized=false;
this._snapBinding=null;
this.isFreeFloating=false;
this.windowBinding=null;
this._coverBinding=null;
this._isLoaded=false;
this._isFirstShow=true;
this._type=ViewBinding.TYPE_DOCKVIEW;
this._pageBinding=null;
this._lastknownposition=null;
this._lastknowndimension=null;
this.isActivated=false;
return this;
}
ViewBinding.prototype.toString=function(){
return "[ViewBinding]";
};
ViewBinding.prototype.onBindingRegister=function(){
ViewBinding.superclass.onBindingRegister.call(this);
this.addActionListener(RootBinding.ACTION_PHASE_1);
this.addActionListener(RootBinding.ACTION_PHASE_2);
this.addActionListener(RootBinding.ACTION_PHASE_3);
this.addActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
this.addActionListener(PageBinding.ACTION_ATTACHED);
this.addActionListener(PageBinding.ACTION_INITIALIZED);
this.addActionListener(ViewBinding.ACTION_DETACH);
this.addActionListener(WizardPageBinding.ACTION_NAVIGATE_NEXT);
this.addActionListener(WizardPageBinding.ACTION_NAVIGATE_PREVIOUS);
this.addActionListener(WizardPageBinding.ACTION_FINISH);
this.subscribe(BroadcastMessages.CLOSE_VIEW);
this.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN);
};
ViewBinding.prototype.onBindingAttach=function(){
ViewBinding.superclass.onBindingAttach.call(this);
this.attachClassName(this._type);
if(Client.isExplorer==true){
this._coverBinding=this.add(CoverBinding.newInstance(this.bindingDocument));
this._coverBinding.attach();
}
this.windowBinding.attach();
};
ViewBinding.prototype.updatePositionDimension=function(){
var snap=this._snapBinding;
var _d18=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d18){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d19=snap.boxObject.getGlobalPosition();
var _d1a=snap.boxObject.getDimension();
if(!Point.isEqual(_d19,this._lastknownposition)){
this.setPosition(_d19);
this._lastknownposition=_d19;
}
if(!Dimension.isEqual(_d1a,this._lastknowndimension)){
this.setDimension(_d1a);
this._lastknowndimension=_d1a;
var _d1b=_d1a.h-ViewBinding.VERTICAL_ADJUST;
_d1b=_d1b<0?0:_d1b;
this.windowBinding.getBindingElement().style.height=new String(_d1b)+"px";
this.windowBinding.reflex();
}else{
throw "Could not snap to unattached binding!";
}
}
}
}
};
ViewBinding.prototype.onBindingDispose=function(){
ViewBinding.superclass.onBindingDispose.call(this);
if(this._viewDefinition!=null){
var _d1c=this._viewDefinition.flowHandle;
if(_d1c!=null){
FlowControllerService.CancelFlow(_d1c);
}
}
if(this._viewDefinition!=null){
var _d1d=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d1d);
this.logger.fine("ViewBinding closed: \""+_d1d+"\"");
}
this.dispatchAction(ViewBinding.ACTION_CLOSED);
};
ViewBinding.prototype.setType=function(type){
this._type=type;
};
ViewBinding.prototype.getType=function(){
return this._type;
};
ViewBinding.prototype.getHandle=function(){
var _d1f=null;
if(this._viewDefinition!=null){
_d1f=this._viewDefinition.handle;
}
return _d1f;
};
ViewBinding.prototype.initialize=function(){
if(!this._isViewBindingInitialized){
this._isViewBindingInitialized=true;
this.windowBinding.setURL(this._viewDefinition.url);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
}else{
throw ("Somehow ViewBinding got initialized twice: "+this.getHandle());
}
};
ViewBinding.prototype.setDefinition=function(_d20){
this._viewDefinition=_d20;
if(_d20.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d21){
ViewBinding.superclass.handleAction.call(this,_d21);
var _d22=_d21.target;
switch(_d21.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d21.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d22.isActivated){
_d22.onActivate();
}
}
_d21.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d22==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d21.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d22==this._snapBinding){
if(_d22.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d22.getContentWindow().isPostBackDocument){
if(_d21.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d22.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d22==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d22.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d21.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d21.type==WindowBinding.ACTION_ONLOAD){
var win=_d22.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d22);
}
}
}
_d21.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d22.label&&this._viewDefinition.label){
_d22.label=this._viewDefinition.label;
}
if(!_d22.image&&this._viewDefinition.image){
_d22.image=this._viewDefinition.image;
}
if(_d22.bindingWindow==this.getContentWindow()){
this._pageBinding=_d22;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d22.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d22==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d21.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d21.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d27,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d27,arg);
switch(_d27){
case BroadcastMessages.CLOSE_VIEW:
if(arg==this._viewDefinition.handle){
this.dispatchAction(ViewBinding.ACTION_ONCLOSE);
}
break;
case BroadcastMessages.CLOSE_VIEWS:
if(this._viewDefinition.position==DockBinding.MAIN){
this.dispatchAction(ViewBinding.ACTION_ONCLOSE_FORCE);
}
break;
case BroadcastMessages.APPLICATION_SHUTDOWN:
this.dispose();
break;
}
};
ViewBinding.prototype._onLoadingCompleted=function(){
if(!this._isLoaded){
this._open();
this._isLoaded=true;
}
};
ViewBinding.prototype._open=function(){
ViewBinding._instances.set(this._viewDefinition.handle,this);
this.dispatchAction(ViewBinding.ACTION_LOADED);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENED,this._viewDefinition.handle);
this.show();
this.logger.fine("ViewBinding opened: \""+this._viewDefinition.handle+"\"");
};
ViewBinding.prototype.update=function(){
this.dispatchAction(Binding.ACTION_ACTIVATED);
this._injectPageArgument();
};
ViewBinding.prototype._injectPageArgument=function(){
var page=this._pageBinding;
var def=this._viewDefinition;
if(page!=null){
var _d2b=def.argument;
if(_d2b!=null){
page.setPageArgument(_d2b);
}
var _d2c=def.width;
if(_d2c!=null){
page.width=_d2c;
}
var _d2d=def.height;
if(_d2d!=null){
page.height=_d2d;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d2e){
ViewBinding.superclass.handleCrawler.call(this,_d2e);
switch(_d2e.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d2e.id==FocusCrawler.ID){
if(_d2e.previousNode!=this._snapBinding.bindingElement){
_d2e.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d2e.nextNode=this._snapBinding.bindingElement;
}
break;
}
};
ViewBinding.prototype.show=function(){
if(!this.isVisible){
if(this.isFreeFloating==true){
if(Client.isWebKit){
this.bindingElement.style.display="";
}
if(this._type==ViewBinding.TYPE_DOCKVIEW&&this.windowBinding!=null){
this.windowBinding.getBindingElement().style.position="static";
}
this.updatePositionDimension();
this.isVisible=true;
}else{
ViewBinding.superclass.show.call(this);
}
}
};
ViewBinding.prototype.hide=function(){
if(this.isVisible==true){
if(this.isFreeFloating==true){
if(this.windowBinding){
this.windowBinding.getBindingElement().style.position="absolute";
}
this.bindingElement.style.top="-10000px";
if(Client.isWebKit){
this.bindingElement.style.display="none";
}
this.isVisible=false;
}else{
ViewBinding.superclass.hide.call(this);
}
}
};
ViewBinding.prototype.setPosition=function(_d2f){
_d2f.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d2f.x+"px";
this.bindingElement.style.top=_d2f.y+"px";
};
ViewBinding.prototype.setDimension=function(_d30){
_d30.h-=ViewBinding.VERTICAL_ADJUST;
_d30.w-=ViewBinding.HORIZONTAL_ADJUST;
_d30.w-=1;
if(_d30.h<0){
_d30.h=0;
}
if(_d30.w<0){
_d30.w=0;
}
this.bindingElement.style.width=String(_d30.w)+"px";
this.bindingElement.style.height=String(_d30.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d31){
this.isFlexBoxBehavior=false;
_d31.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d31.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d31.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d31;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d32=null;
if(this.isFreeFloating==true){
_d32=this._snapBinding.getBindingElement();
}else{
_d32=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d32;
};
ViewBinding.prototype.getContentWindow=function(){
return this.windowBinding.getContentWindow();
};
ViewBinding.prototype.getContentDocument=function(){
return this.windowBinding.getContentDocument();
};
ViewBinding.prototype.getRootBinding=function(){
return this.windowBinding.getRootBinding();
};
ViewBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
ViewBinding.prototype.reload=function(_d33){
this._isLoaded=false;
this.windowBinding.reload(_d33);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d34=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d34=true;
}
}
if(!_d34){
this.logger.error("saveContainedEditor failed");
}
};
ViewBinding.prototype.onActivate=function(){
if(!this.isActivated){
this.isActivated=true;
var root=this.getRootBinding();
if(root!=null){
root.onActivate();
}
}
};
ViewBinding.prototype.onDeactivate=function(){
if(this.isActivated==true){
this.isActivated=false;
var root=this.getRootBinding();
if(root!=null){
this.getRootBinding().onDeactivate();
}
}
};
ViewBinding.newInstance=function(_d38){
var _d39=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d38);
var _d3a=UserInterface.registerBinding(_d39,ViewBinding);
_d3a.windowBinding=_d3a.add(WindowBinding.newInstance(_d38));
return _d3a;
};
PageBinding.prototype=new FocusBinding;
PageBinding.prototype.constructor=Binding;
PageBinding.superclass=FocusBinding.prototype;
PageBinding.ACTION_ATTACHED="page attached";
PageBinding.ACTION_DETACHED="page detached";
PageBinding.ACTION_INITIALIZED="page initialized";
PageBinding.ACTION_DOPOSTBACK="page do postback";
PageBinding.ACTION_VALIDATE="page validate";
PageBinding.ACTION_DOVALIDATEDPOSTBACK="page do validated postback";
PageBinding.ACTION_BLOCK_INIT="page block init";
PageBinding.ACTION_UNBLOCK_INIT="page unblock init";
PageBinding.ACTION_UPDATING="page updating";
PageBinding.ACTION_UPDATED="page updated";
PageBinding.ACTION_GETMESSAGES="page poll messagequeue";
PageBinding.CLASSNAME_SUBPAGE="dialogsubpage";
PageBinding.TIMEOUT=250;
function PageBinding(){
this.logger=SystemLogger.getLogger("PageBinding");
this.label=null;
this.image=null;
this.toolTip=null;
this._isPageBindingInitialized=false;
this.pageArgument=null;
this.isDialogSubPage=false;
this.isFitAsDialogSubPage=true;
this._initBlockers=null;
this._isReadyForInitialize=false;
this.isActivationAware=false;
this.isActivated=false;
this.isNonAjaxPage=false;
this._canPostBack=true;
this._responseResolver=null;
this._isUpdating=false;
}
PageBinding.prototype.toString=function(){
return "[PageBinding]";
};
PageBinding.prototype.onBindingRegister=function(){
PageBinding.superclass.onBindingRegister.call(this);
var root=UserInterface.getBinding(this.bindingDocument.body);
root.addActionListener(RootBinding.ACTION_PHASE_3,this);
this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
this.addActionListener(PageBinding.ACTION_DOVALIDATEDPOSTBACK);
this.addActionListener(BalloonBinding.ACTION_INITIALIZE);
this.addActionListener(PageBinding.ACTION_BLOCK_INIT);
this.addActionListener(PageBinding.ACTION_UNBLOCK_INIT);
this.addActionListener(PageBinding.ACTION_GETMESSAGES);
this.subscribe(BroadcastMessages.MESSAGEQUEUE_REQUESTED);
};
PageBinding.prototype.onBindingAttach=function(){
PageBinding.superclass.onBindingAttach.call(this);
Application.lock(this);
this.parseDOMProperties();
this.dispatchAction(PageBinding.ACTION_ATTACHED);
};
PageBinding.prototype.onBindingDispose=function(){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.removeActionListener(RootBinding.ACTION_PHASE_3,this);
this.dispatchAction(PageBinding.ACTION_DETACHED);
};
PageBinding.prototype.parseDOMProperties=function(){
if(this.getProperty("label")){
this.label=this.getProperty("label");
}
if(this.getProperty("labelfield")){
this.labelfield=this.getProperty("labelfield");
}
if(this.getProperty("image")){
this.image=this.getProperty("image");
}
this.toolTip=this.getProperty("tooltip");
if(this.getProperty("fitasdialogsubpage")==false){
this.isFitAsDialogSubPage=false;
}
};
PageBinding.prototype.setPageArgument=function(arg){
if(Application.isOperational){
this.dispatchAction(DockPanelBinding.ACTION_FORCE_SELECT);
}
this.pageArgument=arg;
};
PageBinding.prototype.onBeforePageInitialize=function(){
this._isReadyForInitialize=true;
if(this._initBlockers==null){
this.onPageInitialize();
}
};
PageBinding.prototype.onPageInitialize=function(){
if(!this._isPageBindingInitialized){
this._isPageBindingInitialized=true;
if(this._isDotNet()){
this._setupDotNet();
}
if(this.pageArgument&&this.pageArgument instanceof DataBindingMap){
this.bindingWindow.DataManager.populateDataBindings(this.pageArgument);
}
var self=this;
setTimeout(function(){
try{
if(Binding.exists(self)==true){
self.bindingElement.style.visibility="visible";
self.dispatchAction(PageBinding.ACTION_INITIALIZED);
self.onAfterPageInitialize();
}else{
Application.unlock(Application,true);
SystemLogger.getLogger("PageBinding").warn("Premature PageBinding dispose? Please consult your developer.");
}
}
catch(exception){
self.logger.error(exception);
SystemDebug.stack(arguments);
throw exception;
}
},PageBinding.TIMEOUT);
}else{
if(Client.isExplorer==true){
this.logger.error("PageBinding: Somehow initialized twice");
this.logger.error(arguments.caller.callee.toString());
}else{
throw "PageBinding: Somehow initialized twice";
}
}
};
PageBinding.prototype.onAfterPageInitialize=function(){
this.removeActionListener(PageBinding.ACTION_BLOCK_INIT);
this.removeActionListener(PageBinding.ACTION_UNBLOCK_INIT);
Application.unlock(this);
this.isActivationAware=true;
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
if(UserInterface.isBindingVisible(this)){
this.dispatchAction(FocusBinding.ACTION_FOCUS);
}
};
PageBinding.prototype.onBeforeUpdates=function(){
this._isUpdating=true;
this.dispatchAction(PageBinding.ACTION_UPDATING);
};
PageBinding.prototype.onAfterUpdates=function(){
this.parseDOMProperties();
this._isUpdating=false;
this.dispatchAction(PageBinding.ACTION_UPDATED);
};
PageBinding.prototype.makeDialogSubPage=function(){
if(this.isFitAsDialogSubPage){
if(Client.isExplorer){
this.setFlexibility(true);
}
this.attachClassName(PageBinding.CLASSNAME_SUBPAGE);
this.isDialogSubPage=true;
}
};
PageBinding.prototype._setupDotNet=function(){
var self=this;
var form=this.bindingDocument.forms[0];
var _d42=this.bindingWindow.__doPostBack;
var _d43=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d43){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d44,_d45){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d43=true;
}
self.manifestAllDataBindings();
_d42(_d44,_d45);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d46,list){
var _d48=this.bindingWindow.bindingMap.__REQUEST;
if(_d48!=null&&this._isDotNet()){
switch(_d46){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d48.postback(_d46);
}
}
break;
default:
_d48.postback(_d46);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d46,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d49,list){
var _d4b=this.getDescendantBindingsByType(WindowBinding);
_d4b.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d49,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d4f){
if(_d4f.name==null||_d4f.name==""){
return;
}
list.add({name:_d4f.name,value:_d4f.value});
});
var out="";
list.each(function(_d51){
out+=_d51.name+": "+_d51.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d52){
PageBinding.superclass.handleAction.call(this,_d52);
var _d53=_d52.target;
switch(_d52.type){
case RootBinding.ACTION_PHASE_3:
if(_d53==UserInterface.getBinding(this.bindingDocument.body)){
_d53.removeActionListener(RootBinding.ACTION_PHASE_3,this);
if(!this._isPageBindingInitialized){
try{
this.onBeforePageInitialize();
}
catch(exception){
alert(exception);
SystemDebug.stack(arguments);
throw exception;
}
}
}
break;
case PageBinding.ACTION_DOPOSTBACK:
if(this._isDotNet()){
this.doPostBack(_d53);
}
_d52.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d54=this.validateAllDataBindings();
if(_d54){
this.doPostBack(_d53);
}
}
_d52.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d52.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d53.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d53.key)){
this._initBlockers.del(_d53.key);
if(!this._initBlockers.hasEntries()){
this._initBlockers=null;
if(this._isReadyForInitialize==true){
var self=this;
setTimeout(function(){
self.onBeforePageInitialize();
},0);
}
}
}
}
break;
case PageBinding.ACTION_GETMESSAGES:
if(UpdateMananger.isUpdating){
var self=this;
var _d56={handleAction:function(_d57){
if(_d57.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d56);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d56);
}else{
MessageQueue.udpdate();
}
_d52.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d58,arg){
PageBinding.superclass.handleBroadcast.call(this,_d58,arg);
switch(_d58){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d5a=arg;
if(!this._canPostBack&&!_d5a){
this._canPostBack=true;
Application.unlock(this);
}
break;
}
};
PageBinding.prototype._isDotNet=function(){
var form=this.bindingDocument.forms[0];
return (form!=null&&typeof this.bindingWindow.__doPostBack!="undefined");
};
PageBinding.prototype.doPostBack=function(_d5c){
if(this._canPostBack){
if(_d5c!=null&&this._isDotNet()){
var _d5d=_d5c.getCallBackID();
var _d5e=_d5c.getCallBackArg();
if(_d5d!=null){
_d5d=_d5d.replace(/_/g,"$");
}else{
_d5d="";
}
if(_d5e==null){
_d5e="";
}
this.bindingWindow.__doPostBack(_d5d,_d5e);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d5f){
var _d60=true;
var _d61=this.bindingWindow.DataManager.getAllDataBindings();
while(_d61.hasNext()&&_d60){
var _d62=_d61.getNext();
if(_d62.isAttached){
var _d63=_d62.validate();
if(_d60&&!_d63){
_d60=false;
this.logger.debug("Invalid DataBinding: "+_d62.toString()+" ("+_d62.getName()+")");
if(_d5f){
var _d64=_d62.getAncestorBindingByType(TabPanelBinding);
if(_d64!=null&&!_d64.isVisible){
var _d65=_d64.getAncestorBindingByType(TabBoxBinding);
var _d66=_d65.getTabBinding(_d64);
_d65.select(_d66);
}
}
break;
}
}
}
return _d60;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d68=this.bindingWindow.DataManager.getAllDataBindings();
while(_d68.hasNext()){
var _d69=_d68.getNext();
if(_d69.isAttached){
var _d6a=_d69.manifest();
if(_d6a!=null){
list.add(_d6a);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d6b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6b.hasNext()){
var _d6c=_d6b.getNext();
if(_d6c.isAttached){
_d6c.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d6d="";
if(!_d6d&&this.labelfield){
var _d6e=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d6e!=null&&_d6e.getLabel){
_d6d=_d6e.getLabel();
}else{
if(_d6e!=null&&_d6e.getValue){
_d6d=_d6e.getValue();
}
}
}
if(!_d6d&&this.label){
_d6d=this.label;
}
return _d6d;
};
PageBinding.prototype.getImage=function(){
return this.image;
};
PageBinding.prototype.getToolTip=function(){
return this.toolTip;
};
PageBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
PageBinding.prototype.onActivate=function(){
if(Binding.exists(this)){
if(!this.isActivated){
this.isActivated=true;
if(this._isFocusManager){
if(UserInterface.isBindingVisible(this)){
try{
var win=this.bindingWindow;
win.focus();
}
catch(exception){
}
if(this._cachedFocus!=null){
var self=this;
setTimeout(function(){
if(FocusBinding.focusedBinding==null){
self._focusPreviouslyFocused();
}
},0);
}else{
this._focusFirstFocusable();
}
}
}
}
}
};
PageBinding.prototype.onDeactivate=function(){
if(this.isActivated==true){
this.isActivated=false;
if(this._cachedFocus!=null){
var _d71=this._cachedFocus.getBinding();
if(_d71){
_d71.blur();
}
}
if(FocusBinding.activeInstance==this){
FocusBinding.activeInstance=null;
}
}
};
DialogPageBinding.prototype=new PageBinding;
DialogPageBinding.prototype.constructor=DialogPageBinding;
DialogPageBinding.superclass=PageBinding.prototype;
DialogPageBinding.DEFAULT_WIDTH=443;
DialogPageBinding.DEFAULT_TABBOXED_WIDTH=476;
DialogPageBinding.DEFAULT_HEIGHT="auto";
DialogPageBinding.DEFAULT_CONTROLS="close";
DialogPageBinding.DEFAULT_RESIZABLE=false;
DialogPageBinding.ACTION_RESPONSE="dialogpageresponse";
DialogPageBinding.ACTION_LAYOUT_D="dialoglayoutd";
DialogPageBinding.CLASSNAME_TABBOXED="tabboxed";
function DialogPageBinding(){
this.logger=SystemLogger.getLogger("DialogPageBinding");
this.response=null;
this.result=null;
this.width=null;
this.height=null;
this.minheight=null;
this.controls=null;
this.isResizable=null;
this.isAutoHeightLayoutMode=false;
this.isNonAjaxPage=true;
}
DialogPageBinding.prototype.toString=function(){
return "[DialogPageBinding]";
};
DialogPageBinding.prototype.onBindingRegister=function(){
DialogPageBinding.superclass.onBindingRegister.call(this);
this.addActionListener(PageBinding.ACTION_ATTACHED);
this.addActionListener(Binding.ACTION_DIRTY);
this.addActionListener(Binding.ACTION_VALID);
this.addActionListener(Binding.ACTION_INVALID);
this.addActionListener(ButtonBinding.ACTION_COMMAND);
};
DialogPageBinding.prototype.parseDOMProperties=function(){
DialogPageBinding.superclass.parseDOMProperties.call(this);
if(this.width==null){
var _d72=this.getProperty("width");
if(!_d72){
_d72=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d72;
}
if(this.height==null){
var _d73=this.getProperty("height");
this.height=_d73?_d73:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d74=this.getProperty("minheight");
if(_d74!=null){
this.minheight=_d74;
}
}
if(this.controls==null){
var _d75=this.getProperty("controls");
this.controls=_d75?_d75:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d76=this.getProperty("resizable");
this.isResizable=_d76?_d76:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d77=this.getProperty("image");
var _d78=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d77&&_d78){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d77);
_d78.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d7a){
if(_d7a!=this.isAutoHeightLayoutMode){
if(_d7a){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d7a;
}
};
DialogPageBinding.prototype.handleAction=function(_d7b){
DialogPageBinding.superclass.handleAction.call(this,_d7b);
var _d7c=_d7b.target;
switch(_d7b.type){
case PageBinding.ACTION_ATTACHED:
if(_d7c!=this&&_d7c.isFitAsDialogSubPage){
_d7c.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d7b.consume();
if(_d7c.response!=null){
this.response=_d7c.response;
switch(_d7c.response){
case Dialog.RESPONSE_ACCEPT:
if(this.validateAllDataBindings()==true){
this.onDialogAccept();
}else{
this.onDialogInvalid();
}
break;
case Dialog.RESPONSE_CANCEL:
this.onDialogCancel();
break;
default:
this.onDialogResponse();
break;
}
}
break;
case Binding.ACTION_INVALID:
this._disableAcceptButton(true);
break;
case Binding.ACTION_VALID:
this._disableAcceptButton(false);
break;
}
};
DialogPageBinding.prototype._disableAcceptButton=function(_d7d){
var _d7e=this.bindingWindow.bindingMap.buttonAccept;
if(_d7e!=null){
_d7e.setDisabled(_d7d);
}
};
DialogPageBinding.prototype.onDialogAccept=function(){
if(this.result===null){
try{
this.result=this.bindingWindow.DataManager.getDataBindingResultMap();
}
catch(exception){
alert(exception);
throw exception;
}
}
this.onDialogResponse();
};
DialogPageBinding.prototype.onDialogInvalid=function(){
};
DialogPageBinding.prototype.onDialogCancel=function(){
this.onDialogResponse();
};
DialogPageBinding.prototype.onDialogResponse=function(){
this.dispatchAction(DialogPageBinding.ACTION_RESPONSE);
};
DialogPageBodyBinding.prototype=new FlexBoxBinding;
DialogPageBodyBinding.prototype.constructor=DialogPageBodyBinding;
DialogPageBodyBinding.superclass=FlexBoxBinding.prototype;
function DialogPageBodyBinding(){
this.logger=SystemLogger.getLogger("DialogPageBodyBinding");
}
DialogPageBodyBinding.prototype.toString=function(){
return "[DialogPageBodyBinding]";
};
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d7f){
var _d80=CSSComputer.getPadding(this.bindingElement);
var _d81=CSSComputer.getBorder(this.bindingElement);
_d7f+=_d80.top+_d80.bottom;
_d7f+=_d81.top+_d81.bottom;
if(_d7f>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d7f+"px";
}
};
EditorPageBinding.prototype=new PageBinding;
EditorPageBinding.prototype.constructor=EditorPageBinding;
EditorPageBinding.superclass=PageBinding.prototype;
EditorPageBinding.ACTION_ATTACHED="editorpage attached";
EditorPageBinding.ACTION_DIRTY="editorpage dirty";
EditorPageBinding.ACTION_CLEAN="editorpage clean";
EditorPageBinding.ACTION_SAVE="editorpage save";
EditorPageBinding.ACTION_SAVE_AND_PUBLISH="editorpage save and publish";
EditorPageBinding.ID_SAVEASBUTTON="saveasbutton";
EditorPageBinding.ID_PREVIEWTAB="previewtab";
EditorPageBinding.ID_MAINTABBOX="maintabbox";
EditorPageBinding.ID_PREVIEWWINDOW="previewwindow";
EditorPageBinding.MESSAGE_SAVE="save";
EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH="saveandpublish";
EditorPageBinding.MESSAGE_PERSIST="persist";
EditorPageBinding.MESSAGE_REFRESH="refresh";
EditorPageBinding.message=null;
EditorPageBinding.isTabbing=false;
EditorPageBinding._registry=new Map();
EditorPageBinding.register=function(page){
var map=EditorPageBinding._registry;
if(!map.hasEntries()){
top.app.bindingMap.broadcasterHasOpenEditors.enable();
}
map.set(page.key,page);
};
EditorPageBinding.unregister=function(page){
var map=EditorPageBinding._registry;
map.del(page.key);
if(!map.hasEntries()){
top.app.bindingMap.broadcasterHasOpenEditors.disable();
}
};
function EditorPageBinding(){
this.logger=SystemLogger.getLogger("EditorPageBinding");
this.isDirty=false;
this._tabBoxBinding=null;
this._tabBinding=null;
this._windowBinding=null;
this._isGeneratingPreview=false;
this._isPreviewWindowVisible=false;
this._message=null;
this._messages=null;
this._messengers=null;
this._isWaitingForPreview=false;
this._isPreviewing=false;
}
EditorPageBinding.prototype.toString=function(){
return "[EditorPageBinding]";
};
EditorPageBinding.prototype.onBindingRegister=function(){
EditorPageBinding.superclass.onBindingRegister.call(this);
this.addActionListener(Binding.ACTION_DIRTY);
this.addActionListener(Binding.ACTION_VALID);
this.addActionListener(Binding.ACTION_INVALID);
this.addActionListener(EditorPageBinding.ACTION_SAVE);
this.addActionListener(EditorPageBinding.ACTION_SAVE_AND_PUBLISH);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
EditorPageBinding.register(this);
this._invalidBindings=new Map();
this._messengers=new List();
this._messages=new List();
};
EditorPageBinding.prototype.onBindingDispose=function(){
this.dispatchAction(EditorPageBinding.ACTION_CLEAN);
if(this._isPreviewWindowVisible==true){
setTimeout(function(){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_OFF);
},250);
}
EditorPageBinding.unregister(this);
EditorPageBinding.superclass.onBindingDispose.call(this);
};
EditorPageBinding.prototype.onBeforePageInitialize=function(){
this._setupPreviewListeners();
EditorPageBinding.superclass.onBeforePageInitialize.call(this);
};
EditorPageBinding.prototype.onPageInitialize=function(){
EditorPageBinding.superclass.onPageInitialize.call(this);
this.enableSaveAs();
};
EditorPageBinding.prototype._setupPreviewListeners=function(){
var box=this.bindingDocument.getElementById(EditorPageBinding.ID_MAINTABBOX);
var tab=this.bindingDocument.getElementById(EditorPageBinding.ID_PREVIEWTAB);
var win=this.bindingDocument.getElementById(EditorPageBinding.ID_PREVIEWWINDOW);
if(box!=null){
this._tabBoxBinding=UserInterface.getBinding(box);
this._tabBoxBinding.addActionListener(TabBoxBinding.ACTION_SELECTED,this);
this._tabBoxBinding.addActionListener(TabBoxBinding.ACTION_UNSELECTED,this);
if(tab!=null&&win!=null){
this._tabBinding=UserInterface.getBinding(tab);
this._windowBinding=UserInterface.getBinding(win);
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,this);
this._windowBinding.addActionListener(WindowBinding.ACTION_ONLOAD,this);
this.subscribe(BroadcastMessages.HIGHLIGHT_KEYWORDS);
if(this._tabBinding.isSelected){
this._startPreview();
}
}
}
};
EditorPageBinding.prototype.onSaveSuccess=function(){
this.enableSave(false);
this.enableSaveAs();
this.cleanAllDataBindings();
this.isDirty=false;
EditorPageBinding.message=null;
this.dispatchAction(EditorPageBinding.ACTION_CLEAN);
};
EditorPageBinding.prototype.handleAction=function(_d89){
EditorPageBinding.superclass.handleAction.call(this,_d89);
var _d8a=_d89.target;
switch(_d89.type){
case EditorPageBinding.ACTION_SAVE:
this.postMessage(EditorPageBinding.MESSAGE_SAVE);
break;
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
this.postMessage(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
break;
case ResponseBinding.ACTION_OOOOKAY:
if(Application.isDeveloperMode){
}
break;
case ResponseBinding.ACTION_SUCCESS:
if(Application.isDeveloperMode){
}
if(this._messengers.hasEntries()){
var _d8b=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d8a.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d8b==-1){
_d8b=0;
}
}else{
_d8b++;
}
return res;
});
if(_d8b>-1){
this._messengers.del(_d8b);
}
if(!this._messengers.hasEntries()){
switch(this._message){
case EditorPageBinding.MESSAGE_SAVE:
this._saveEditorPage();
break;
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._saveAndPublishEditorPage();
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._refresh();
this._message=null;
if(this._isWaitingForPreview){
this._isWaitingForPreview=false;
this._startPreview();
}
break;
}
}
}else{
this._refresh();
this._message=null;
}
break;
case ResponseBinding.ACTION_FAILURE:
if(Application.isDeveloperMode){
}
this._message=null;
this._messengers=new List();
break;
case Binding.ACTION_DIRTY:
if(this.canSave()){
if(!this.isDirty){
this.enableSave(true);
this.isDirty=true;
this.dispatchAction(EditorPageBinding.ACTION_DIRTY);
}
}
_d89.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d8a.key,_d8a);
if(_d8a instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d8a.key);
if(_d8a instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d8a==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d8a.getSelectedTabBinding();
if(tab.getID()==EditorPageBinding.ID_PREVIEWTAB){
this._isPreviewing=true;
if(this._messengers.hasEntries()){
this._isWaitingForPreview=true;
}else{
this._startPreview();
}
}else{
if(this._isPreviewing){
this._isPreviewing=false;
this._stopPreview();
}
}
}
}
_d89.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d8a==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d89.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d8a==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d89.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d8a==this._windowBinding){
if(_d8a.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d90=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d90);
}
}
}
break;
}
};
EditorPageBinding.prototype.canSave=function(){
return this.bindingWindow.bindingMap.savebutton!=null;
};
EditorPageBinding.prototype.doSave=function(){
var _d91=this.bindingWindow.bindingMap.savebutton;
if(_d91!=null&&!_d91.isDisabled){
_d91.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d92=this.bindingWindow.bindingMap.__REQUEST;
if(_d92!=null){
_d92.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d93=this.bindingWindow.bindingMap.__REQUEST;
if(_d93!=null){
_d93.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
}else{
this.logger.error("Save and publish aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._refresh=function(){
if(Application.isDeveloperMode){
}
this.postMessage(EditorPageBinding.MESSAGE_REFRESH);
};
EditorPageBinding.prototype.postMessage=function(_d94){
this._message=null;
switch(_d94){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d94,this._messengers);
if(!this._messengers.hasEntries()){
if(_d94==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d94;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d94;
EditorPageBinding.superclass.postMessage.call(this,_d94,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d94,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d95,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d95,arg);
switch(_d95){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d97=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d97);
}
break;
}
};
EditorPageBinding.prototype.onActivate=function(){
EditorPageBinding.superclass.onActivate.call(this);
if(this._isPreviewWindowVisible==true){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ACTIVATE);
}
};
EditorPageBinding.prototype.onDeactivate=function(){
EditorPageBinding.superclass.onDeactivate.call(this);
if(this._isPreviewWindowVisible==true){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_DEACTIVATE);
}
};
EditorPageBinding.prototype._updateStatusBar=function(){
var _d98=new List();
this._invalidBindings.each(function(key,_d9a){
var list=_d9a.getInvalidLabels();
if(list){
list.each(function(_d9c){
_d98.add(_d9c);
});
}
});
if(_d98.hasEntries()){
var _d9d="";
while(_d98.hasNext()){
_d9d+=_d98.getNext().toLowerCase();
if(_d98.hasNext()){
_d9d+=", ";
}else{
_d9d+=".";
}
}
var _d9e=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d9e+" "+_d9d);
}else{
StatusBar.clear();
}
};
EditorPageBinding.prototype._startPreview=function(){
this._isGeneratingPreview=true;
if(Client.isPrism){
Prism.disableCache();
}
this._windowBinding.setURL(WindowBinding.POSTBACK_URL);
};
EditorPageBinding.prototype._stopPreview=function(){
this._windowBinding.reset();
};
EditorPageBinding.prototype.enableSave=function(_d9f){
var _da0=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da0){
var _da1=UserInterface.getBinding(_da0);
if(_d9f){
_da1.enable();
}else{
_da1.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _da2=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_da2!=null){
UserInterface.getBinding(_da2).enable();
}
};
EditorPageBinding.prototype.handleInvalidData=function(){
this.logger.error("INVALID DATA :(");
if(this._isGeneratingPreview){
this._isGeneratingPreview=false;
this._windowBinding.error();
this._message=null;
this._messengers=new List();
Application.unlock(this);
}
};
EditorPageBinding.prototype._generatePreview=function(){
var _da3=this._windowBinding.getContentDocument().title;
if(_da3==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da4=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da6){
if(_da6.name=="__EVENTTARGET"&&_da4){
_da6.value=_da4;
}
list.add({name:_da6.name,value:_da6.value});
});
var url=String(this.bindingDocument.location);
this._windowBinding.getContentWindow().submit(list,url);
this._latestPostbackList=list.reset();
}else{
this.handleInvalidData();
}
}
};
ResponsePageBinding.prototype=new DialogPageBinding;
ResponsePageBinding.prototype.constructor=ResponsePageBinding;
ResponsePageBinding.superclass=DialogPageBinding.prototype;
function ResponsePageBinding(){
this.logger=SystemLogger.getLogger("ResponsePageBinding");
this.responseid=null;
}
ResponsePageBinding.prototype.toString=function(){
return "[ResponsePageBinding]";
};
ResponsePageBinding.prototype.parseDOMProperties=function(){
ResponsePageBinding.superclass.parseDOMProperties.call(this);
var _da8=this.getProperty("responseid");
this.responseid=_da8;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_da9){
ResponsePageBinding.superclass.handleAction.call(this,_da9);
switch(_da9.type){
case ResponseBinding.ACTION_SUCCESS:
this.onDialogAccept();
break;
case ResponseBinding.ACTION_FAILURE:
break;
}
};
ResponsePageBinding.prototype.onDialogAccept=function(){
this.response=Dialog.RESPONSE_ACCEPT;
if(this.responseid&&this.bindingDocument.getElementById(this.responseid)){
this.result=this.bindingDocument.getElementById(this.responseid).value;
}
ResponsePageBinding.superclass.onDialogAccept.call(this);
};
WizardPageBinding.prototype=new DialogPageBinding;
WizardPageBinding.prototype.constructor=WizardPageBinding;
WizardPageBinding.superclass=DialogPageBinding.prototype;
WizardPageBinding.ID_NEXTBUTTON="nextbutton";
WizardPageBinding.ID_PREVIOUSBUTTON="previousbutton";
WizardPageBinding.ID_FINISHBUTTON="finishbutton";
WizardPageBinding.ACTION_NAVIGATE_NEXT="wizardnavigatenext";
WizardPageBinding.ACTION_NAVIGATE_PREVIOUS="wizardnavigateprevious";
WizardPageBinding.ACTION_FINISH="wizardfinish";
function WizardPageBinding(){
this.logger=SystemLogger.getLogger("WizardPageBinding");
return this;
}
WizardPageBinding.prototype.toString=function(){
return "[WizardPageBinding]";
};
WizardPageBinding.prototype.onPageInitialize=function(){
WizardPageBinding.superclass.onPageInitialize.call(this);
this.addActionListener(WizardPageBinding.ACTION_NAVIGATE_NEXT,this);
this.addActionListener(WizardPageBinding.ACTION_NAVIGATE_PREVIOUS,this);
this.addActionListener(WizardPageBinding.ACTION_FINISH,this);
};
WizardPageBinding.prototype.handleAction=function(_daa){
WizardPageBinding.superclass.handleAction.call(this,_daa);
var _dab=_daa.target;
switch(_daa.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dab);
}else{
_daa.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dab);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_daa.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_daa.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dac){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dae=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dac);
}
if(_dae){
_dae.setDisabled(!_dac);
}
};
MarkupAwarePageBinding.prototype=new PageBinding;
MarkupAwarePageBinding.prototype.constructor=MarkupAwarePageBinding;
MarkupAwarePageBinding.superclass=PageBinding.prototype;
function MarkupAwarePageBinding(){
this.logger=SystemLogger.getLogger("MarkupAwarePageBinding");
this._isActivated=false;
this._isWaiting=false;
return this;
}
MarkupAwarePageBinding.prototype.toString=function(){
return "[MarkupAwarePageBinding]";
};
MarkupAwarePageBinding.prototype.onBeforePageInitialize=function(){
MarkupAwarePageBinding.superclass.onBeforePageInitialize.call(this);
this.subscribe(BroadcastMessages.XHTML_MARKUP_ON);
this.subscribe(BroadcastMessages.XHTML_MARKUP_OFF);
this.subscribe(BroadcastMessages.XHTML_MARKUP_ACTIVATE);
this.subscribe(BroadcastMessages.XHTML_MARKUP_DEACTIVATE);
};
MarkupAwarePageBinding.prototype.handleBroadcast=function(_daf,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_daf,arg);
var self=this;
switch(_daf){
case BroadcastMessages.XHTML_MARKUP_ON:
this._activate(true);
this._handleMarkup(arg);
break;
case BroadcastMessages.XHTML_MARKUP_OFF:
this._activate(false);
break;
case BroadcastMessages.XHTML_MARKUP_ACTIVATE:
this._isWaiting=true;
this._activate(true);
setTimeout(function(){
self._isWaiting=false;
},20);
break;
case BroadcastMessages.XHTML_MARKUP_DEACTIVATE:
setTimeout(function(){
if(!self._isActivated){
self._activate(false);
}
},0);
break;
}
};
MarkupAwarePageBinding.prototype.onActivate=function(){
MarkupAwarePageBinding.superclass.onActivate.call(this);
this._activate(true);
this._isActivated=true;
};
MarkupAwarePageBinding.prototype.onDeactivate=function(){
MarkupAwarePageBinding.superclass.onDeactivate.call(this);
this._isActivated=false;
var self=this;
setTimeout(function(){
if(!self._isWaiting){
self._activate(false);
}
},0);
};
MarkupAwarePageBinding.prototype._handleMarkup=function(_db3){
};
MarkupAwarePageBinding.prototype._activate=function(_db4){
};
SystemToolBarBinding.prototype=new ToolBarBinding;
SystemToolBarBinding.prototype.constructor=SystemToolBarBinding;
SystemToolBarBinding.superclass=ToolBarBinding.prototype;
function SystemToolBarBinding(){
this.logger=SystemLogger.getLogger("SystemToolBarBinding");
this._currentProfileKey=null;
this._actionFolderNames={};
this._actionProfile=null;
this._moreActionsWidth=0;
this._moreActions=null;
this._node=null;
this._activePosition=SystemAction.activePositions.NavigatorTree;
return this;
}
SystemToolBarBinding.prototype.toString=function(){
return "[SystemToolBarBinding]";
};
SystemToolBarBinding.prototype.onBindingAttach=function(){
SystemToolBarBinding.superclass.onBindingAttach.call(this);
if(System.hasActivePerspectives){
this.subscribe(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED);
this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
this.subscribe(BroadcastMessages.INVOKE_DEFAULT_ACTION);
this.addActionListener(ButtonBinding.ACTION_COMMAND);
}else{
this.hide();
}
};
SystemToolBarBinding.prototype.onBindingInitialize=function(){
var _db5=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db5.boxObject.getDimension().w;
_db5.hide();
var _db6=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db6+"px";
var self=this;
var _db8=this.bindingWindow.bindingMap.moreactionsbutton;
_db8.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db9){
self._showMoreActions();
_db9.consume();
}});
var _dba=this.bindingWindow.bindingMap.moreactionspopup;
_dba.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dbb){
var item=_dbb.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dbd,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dbd,arg);
switch(_dbd){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
var self=this;
if(arg!=null){
if(arg.activePosition==this.getActivePosition()){
if(arg.actionProfile!=null&&arg.actionProfile.hasEntries()){
this._actionProfile=arg.actionProfile;
this._node=arg.actionProfile.Node;
var key=this._getProfileKey();
if(key!=this._currentProfileKey){
setTimeout(function(){
self.emptyLeft();
self._actionFolderNames={};
self.buildLeft();
self._currentProfileKey=key;
},0);
}
}else{
setTimeout(function(){
self.emptyLeft();
self._actionFolderNames={};
self._currentProfileKey=null;
self._node=null;
var _dc1=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc1!=null){
_dc1.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dc2=this.bindingWindow.WindowManager;
this._toolBarBodyLeft.refreshToolBarGroups();
this._containAllButtons();
break;
case BroadcastMessages.INVOKE_DEFAULT_ACTION:
var self=this;
setTimeout(function(){
self._invokeDefaultAction();
},0);
break;
}
};
SystemToolBarBinding.prototype._getProfileKey=function(){
var _dc3=new String("");
this._actionProfile.each(function(_dc4,list){
list.each(function(_dc6){
_dc3+=_dc6.getHandle()+";"+_dc6.getKey()+";";
if(_dc6.isDisabled()){
_dc3+="isDisabled='true';";
}
});
});
return _dc3;
};
SystemToolBarBinding.prototype.handleAction=function(_dc7){
SystemToolBarBinding.superclass.handleAction.call(this,_dc7);
switch(_dc7.type){
case ButtonBinding.ACTION_COMMAND:
var _dc8=_dc7.target;
this._handleSystemAction(_dc8.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc9){
if(_dc9!=null){
SystemAction.invoke(_dc9,this._node);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dcc,list){
var _dce=new List();
list.reset();
while(list.hasNext()){
var _dcf=list.getNext();
var _dd0=null;
if(_dcf.isInToolBar()){
if(_dcf.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd0=self.getToolBarButtonBinding(_dcf);
}
}
if(_dd0!=null){
_dce.add(_dd0);
}
}
if(_dce.hasEntries()){
var _dd1=ToolBarGroupBinding.newInstance(doc);
_dce.each(function(_dd2){
_dd1.add(_dd2);
});
self.addLeft(_dd1);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd3=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd4=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_dd4=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _dd5=0;
var _dd6=new List();
var _dd7,_dd8=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd7=_dd8.getNext())!=null){
if(!_dd7.isVisible){
_dd7.show();
}
_dd5+=_dd7.boxObject.getDimension().w;
if(_dd5>=_dd4){
_dd6.add(_dd7);
_dd7.hide();
}
}
if(_dd6.hasEntries()){
var _dd9=_dd6.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dd9).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd7=_dd6.getNext())!=null){
this._moreActions.add(_dd7.associatedSystemAction);
}
_dd3.show();
}else{
this._moreActions=null;
_dd3.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dda=this.bindingWindow.bindingMap.moreactionspopup;
_dda.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dda.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dda.add(item);
}
_dda.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_ddc){
var _ddd=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dde=_ddc.getLabel();
var _ddf=_ddc.getToolTip();
var _de0=_ddc.getImage();
var _de1=_ddc.isDisabled();
if(_de0){
_ddd.setImage(_de0);
}
if(_dde){
_ddd.setLabel(_dde);
}
if(_ddf){
_ddd.setToolTip(_ddf);
}
if(_ddc.isDisabled()){
_ddd.disable();
}
_ddd.associatedSystemAction=_ddc;
return _ddd;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _de2=this.getDescendantBindingByLocalName("toolbarbutton");
if(_de2!=null){
_de2.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_de3){
var _de4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_de3);
return UserInterface.registerBinding(_de4,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_de5){
this.bindingElement.style.left=_de5.x+"px";
this.bindingElement.style.top=_de5.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_de6){
_de6.h-=ViewBinding.VERTICAL_ADJUST;
_de6.w-=ViewBinding.HORIZONTAL_ADJUST;
_de6.w-=1;
if(_de6.h<0){
_de6.h=0;
}
if(_de6.w<0){
_de6.w=0;
}
this.bindingElement.style.width=String(_de6.w)+"px";
this.bindingElement.style.height=String(_de6.h)+"px";
};
SystemTreeBinding.prototype=new TreeBinding;
SystemTreeBinding.prototype.constructor=SystemTreeBinding;
SystemTreeBinding.superclass=TreeBinding.prototype;
SystemTreeBinding.HAS_NO_MEMORY=false;
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
SystemTreeBinding.URL_DIALOG_DETAILEDPASTE="${root}/content/dialogs/systemtrees/detailedpaste.aspx";
function SystemTreeBinding(){
this.logger=SystemLogger.getLogger("SystemTreeBinding");
this.perspectiveNode=null;
this._defaultTreeNode=null;
this._isActionProfileAware=true;
this._activePosition=SystemAction.activePositions.NavigatorTree;
this._actionGroup=null;
this._backupfocushandle=null;
this._tempSelectedNode=null;
this._tempSelectionTimeout=false;
this._entityTokenRegistry=null;
this._refreshingTreeNodes=null;
this._refreshToken=null;
this.isLockedToEditor=false;
this.isLockFeatureFocus=false;
this._restorableFocusHandle=null;
}
SystemTreeBinding.prototype.toString=function(){
return "[SystemTreeBinding]";
};
SystemTreeBinding.prototype.onBindingRegister=function(){
SystemTreeBinding.superclass.onBindingRegister.call(this);
this.perspectiveNode=StageBinding.perspectiveNode;
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_FOCUS);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_CUT);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_COPY);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_PASTE);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
this.subscribe(BroadcastMessages.DOCKTABBINDING_SELECT);
this.subscribe(BroadcastMessages.STAGEDIALOG_OPENED);
this.addActionListener(SystemTreeNodeBinding.ACTION_REFRESHED_YEAH);
this.addActionListener(TreeNodeBinding.ACTION_COMMAND);
this._entityTokenRegistry=new Map();
this._refreshingTreeNodes=new Map();
if(this.getProperty("actionaware")==false){
this._isActionProfileAware=false;
}else{
this.setContextMenu(top.app.bindingMap.systemtreepopup);
}
if(this.getProperty("treeselector")==true){
this._activePosition=SystemAction.activePositions.SelectorTree;
}
if(this.getProperty("locktoeditor")!=null){
this.isLockedToEditor=this.getProperty("locktoeditor");
}
};
SystemTreeBinding.prototype.add=function(_de7){
var _de8=SystemTreeBinding.superclass.add.call(this,_de7);
if(!this._defaultTreeNode){
if(_de7 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de7;
}
}
return _de8;
};
SystemTreeBinding.prototype.handleAction=function(_de9){
SystemTreeBinding.superclass.handleAction.call(this,_de9);
var _dea=_de9.target;
switch(_de9.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dea.key);
this._updateFocusedNode();
_de9.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de9.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dea.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de9.consume();
break;
}
};
SystemTreeBinding.prototype._focusDefault=function(){
this._attemptRestorableFocus();
if(!this.getFocusedTreeNodeBindings().hasEntries()){
SystemTreeBinding.superclass._focusDefault.call(this);
}
};
SystemTreeBinding.prototype.getPerspectiveHandle=function(){
return this.perspectiveNode.getHandle();
};
SystemTreeBinding.prototype._attemptRestorableFocus=function(){
if(this._treeNodeBindings.has(this._restorableFocusHandle)){
var _dec=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dec);
}
this._restorableFocusHandle=null;
};
SystemTreeBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
this._computeClipboardSetup();
this._computeRefreshSetup();
if(this._isActionProfileAware){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition,actionProfile:this.getCompiledActionProfile(),perspectiveHandle:this.getPerspectiveHandle()});
}
}
};
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_ded){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_ded);
var reg=this._entityTokenRegistry;
var _def=_ded.node.getEntityToken();
if(reg.has(_def)){
reg.get(_def).add(_ded);
}else{
reg.set(_def,new List([_ded]));
}
var _df0=null;
if(this.isLockedToEditor){
if(_def==StageBinding.entityToken){
if(_ded.node.isTreeLockEnabled()){
_df0=_ded;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_ded.node.getHandle()){
_df0=_ded;
}
}
}
if(_df0!=null){
this.focusSingleTreeNodeBinding(_df0);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df1){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df1);
var reg=this._entityTokenRegistry;
var _df3=_df1.node.getEntityToken();
if(reg.has(_df3)){
var list=reg.get(_df3);
list.del(_df1);
if(!list.hasEntries()){
reg.del(_df3);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df1.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df1.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df7=this._refreshingTreeNodes;
if(_df7.hasEntries()&&_df7.has(key)){
_df7.del(key);
if(!_df7.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df8=StageBinding.entityToken;
if(_df8!=null){
this._focusTreeNodeByEntityToken(_df8);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df9=false;
var _dfa=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df9=false;
}else{
if(_dfa.hasEntries()){
_df9=true;
while(_df9&&_dfa.hasNext()){
var _dfb=_dfa.getNext();
if(!_dfb.isDraggable){
_df9=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df9;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dfc,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dfc,arg);
switch(_dfc){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dfc,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dfc);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL:
this.collapse(true);
break;
case BroadcastMessages.DOCKTABBINDING_SELECT:
if(this.isLockedToEditor){
var tab=arg;
if(tab.getHandle()!="Composite.Management.Explorer"){
this._handleDockTabSelect(tab);
}
}
break;
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this.isLockedToEditor){
this.blurSelectedTreeNodes();
}
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition});
break;
case BroadcastMessages.SYSTEMTREEBINDING_FOCUS:
var self=this,_e00=arg;
setTimeout(function(){
if(_e00!=null){
self._focusTreeNodeByEntityToken(_e00);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e02=tab.perspectiveNode==null;
if(!_e02){
_e02=tab.perspectiveNode==this.perspectiveNode;
}
if(_e02){
var self=this,_e04=tab.getEntityToken();
setTimeout(function(){
if(_e04!=null){
self._focusTreeNodeByEntityToken(_e04);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e05,_e06){
this.isLockFeatureFocus=true;
var _e07=null;
if(this._entityTokenRegistry.has(_e05)){
var list=this._entityTokenRegistry.get(_e05);
list.each(function(tn){
var _e0a=true;
if(tn.node.isTreeLockEnabled()){
_e07=tn;
_e0a=false;
}
return _e0a;
});
if(_e07!=null){
if(!_e07.isFocused){
this.focusSingleTreeNodeBinding(_e07,true);
}else{
_e07.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e07==null&&_e06!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e05);
self._focusTreeNodeByEntityToken(_e05,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e0c){
var _e0d=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e0e=this.getRootTreeNodeBindings();
while(_e0e.hasNext()){
var _e0f=_e0e.getNext();
_e0d.add(_e0f.node.getEntityToken());
}
}else{
_e0d.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e0d.hasNext()){
var _e10=_e0d.getNext();
var _e11=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e10,_e0c,_e11);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e14=this._treeNodeBindings;
var _e15=new Map();
function fix(_e16,list){
if(!_e16.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e14.has(node.getHandle())){
var _e19=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e15.set(node.getHandle(),_e19);
_e16.add(_e19);
}
});
_e16.attachRecursive();
}
}
_e16.open(true);
}
map.each(function(_e1a,list){
if(_e14.has(_e1a)){
var _e1c=_e14.get(_e1a);
fix(_e1c,list);
}else{
if(_e15.has(_e1a)){
var _e1d=_e15.get(_e1a);
fix(_e1d,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e1e,arg){
switch(_e1e){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e20=arg;
if(_e20!=null){
this._invokeServerRefresh(_e20);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e21=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e21;
_e21.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e21=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e21;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e22){
if(_e22!=null&&_e22=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e22)){
var list=this._entityTokenRegistry.get(_e22).reset();
this._refreshToken=_e22;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e24=list.getNext();
this._refreshingTreeNodes.set(_e24.key,true);
setTimeout(function(){
_e24.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e25=this.getFocusedTreeNodeBindings().getFirst();
if(_e25){
var _e26=_e25.getLabel();
var _e27=_e25.getAncestorBindingByLocalName("treenode");
if(_e27){
_e25=_e27;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e25.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e28=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e28,[_e26]);
}
_e25.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e29=SystemTreeBinding.clipboard;
if(_e29){
var type=_e29.dragType;
var _e2b=this.getFocusedTreeNodeBindings().getFirst();
if(_e2b.dragAccept){
if(_e2b.acceptor.isAccepting(type)){
this._performPaste(_e2b);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e2c){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e2c.node.hasDetailedDropSupport()){
if(_e2c.node.hasChildren()){
var _e2e=_e2c.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e2f,_e30){
if(_e2f==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e31=_e30.get("switch");
var _e32=_e30.get("sibling");
if(_e31=="after"){
_e32++;
}
var _e33=_e2c.accept(SystemTreeBinding.clipboard,_e32);
if(_e33){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e2e);
}else{
Application.lock(self);
var _e34=_e2c.accept(SystemTreeBinding.clipboard,0);
if(_e34){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e34=_e2c.accept(SystemTreeBinding.clipboard,0);
if(_e34){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e35=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e35!=null){
this._focusTreeNodeByEntityToken(_e35);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
if(this._defaultTreeNode.isContainer&&!this._defaultTreeNode.isOpen){
this._defaultTreeNode.open();
}
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e36){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e36){
this.blurSelectedTreeNodes();
var _e37=this.getRootTreeNodeBindings();
_e37.each(function(_e38){
if(_e38.isContainer&&_e38.isOpen){
_e38.close();
_e38.hasBeenOpened=false;
_e38.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e39){
if(_e39!=this.isLockedToEditor){
this.isLockedToEditor=_e39;
if(_e39){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e3b=this.getRootTreeNodeBindings();
_e3b.each(function(_e3c){
var _e3d=_e3c.getOpenSystemNodes();
if(_e3d!=null&&_e3d.hasEntries()){
list.merge(_e3d);
}else{
if(_e3c.isOpen){
list.add(_e3c.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e3e){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e3e);
if(_e3e!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e3f){
if(_e3f){
var list=new List(_e3f.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e41=new Map();
var _e42=this.getFocusedTreeNodeBindings().getFirst();
var _e43=_e42.node.getActionProfile();
if(_e43!=null){
var self=this;
_e43.each(function(_e45,list){
var _e47=new List();
list.each(function(_e48){
if(_e48.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e48.getGroupName()]){
_e47.add(_e48);
}
}
});
if(_e47.hasEntries()){
_e41.set(_e45,_e47);
}
});
}
_e41.activePosition=this._activePosition;
var _e49=_e42.node.getPropertyBag();
if(_e49&&_e49.Uri&&_e49.ElementType==="application/x-composite-page"){
_e41.Uri=_e49.Uri;
}
_e41.EnitityToken=_e42.node.getEntityToken();
_e41.Node=_e42.node;
return _e41;
};
SystemTreePopupBinding.prototype=new PopupBinding;
SystemTreePopupBinding.prototype.constructor=SystemTreePopupBinding;
SystemTreePopupBinding.superclass=PopupBinding.prototype;
SystemTreePopupBinding.CMD_CUT="cut";
SystemTreePopupBinding.CMD_COPY="copy";
SystemTreePopupBinding.CMD_PASTE="paste";
SystemTreePopupBinding.CMD_REFRESH="refresh";
SystemTreePopupBinding.isCutAllowed=false;
SystemTreePopupBinding.isRefreshAllowed=true;
function SystemTreePopupBinding(){
this.logger=SystemLogger.getLogger("SystemTreePopupBinding");
this._currentProfileKey=null;
this._actionProfile=null;
this.selectedTreeNodeBinding=null;
}
SystemTreePopupBinding.prototype.onBindingRegister=function(){
SystemTreePopupBinding.superclass.onBindingRegister.call(this);
this.subscribe(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED);
this.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
};
SystemTreePopupBinding.prototype.onBindingAttach=function(){
SystemTreePopupBinding.superclass.onBindingAttach.call(this);
this._indexMenuContent();
};
SystemTreePopupBinding.prototype.handleBroadcast=function(_e4a,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e4a,arg);
switch(_e4a){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
if(arg!=null&&arg.actionProfile!=null){
this._actionProfile=arg.actionProfile;
}else{
this._currentProfileKey=null;
}
break;
}
};
SystemTreePopupBinding.prototype._getProfileKey=SystemToolBarBinding.prototype._getProfileKey;
SystemTreePopupBinding.prototype.show=function(){
var key=this._getProfileKey();
if(key!=this._currentProfileKey){
this.disposeContent();
this.constructContent();
this._currentProfileKey=key;
}
this._setupClipboardItems();
this._setupRefreshItem();
SystemTreePopupBinding.superclass.show.call(this);
};
SystemTreePopupBinding.prototype._setupClipboardItems=function(){
var cut=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_CUT);
var copy=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_COPY);
var _e4f=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e4f.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e50=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e50.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e51){
SystemTreePopupBinding.superclass.handleAction.call(this,_e51);
switch(_e51.type){
case MenuItemBinding.ACTION_COMMAND:
var _e52=_e51.target;
var _e53=_e52.associatedSystemAction;
if(_e53){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e55=list.getFirst();
var _e56=_e55.node;
}
SystemAction.invoke(_e53,_e56);
}else{
var cmd=_e52.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e59=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e59=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e59=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e59=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e59=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e59){
setTimeout(function(){
EventBroadcaster.broadcast(_e59);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e5a=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e5a.hasNext()){
var _e5b=UserInterface.getBinding(_e5a.getNext());
if(!_e5b.getProperty("rel")){
_e5b.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e5d=new List();
var self=this;
this._actionProfile.each(function(_e5f,list){
var _e61=MenuGroupBinding.newInstance(doc);
list.each(function(_e62){
var _e63=self.getMenuItemBinding(_e62);
_e61.add(_e63);
});
_e5d.add(_e61);
});
_e5d.reverse();
while(_e5d.hasNext()){
this._bodyBinding.addFirst(_e5d.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e64){
var _e65=MenuItemBinding.newInstance(this.bindingDocument);
var _e66=_e64.getLabel();
var _e67=_e64.getToolTip();
var _e68=_e64.getImage();
var _e69=_e64.getDisabledImage();
var _e6a=_e64.isCheckBox();
if(_e66){
_e65.setLabel(_e66);
}
if(_e67){
_e65.setToolTip(_e67);
}
if(_e68){
_e65.imageProfile=new ImageProfile({image:_e68,imageDisabled:_e69});
}
if(_e6a){
_e65.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e64.isChecked()){
_e65.check(true);
}
}
if(_e64.isDisabled()){
_e65.disable();
}
_e65.associatedSystemAction=_e64;
return _e65;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e6e=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e6e=UserInterface.getBinding(node);
if(_e6e.isDisabled){
_e6e=null;
}
}
break;
}
if(_e6e!=null&&_e6e.node!=null&&_e6e.node.getActionProfile()!=null){
SystemTreePopupBinding.superclass.snapToMouse.call(this,e);
}
}
};
SystemTreeNodeBinding.prototype=new TreeNodeBinding;
SystemTreeNodeBinding.prototype.constructor=SystemTreeNodeBinding;
SystemTreeNodeBinding.superclass=TreeNodeBinding.prototype;
SystemTreeNodeBinding.ACTION_REFRESHED="systemtreenoderefreshed";
SystemTreeNodeBinding.ACTION_REFRESHED_YEAH="systemtreenoderefreshedyeah!";
SystemTreeNodeBinding.MAX_CHILD_IMPORT=10000;
function SystemTreeNodeBinding(){
this.logger=SystemLogger.getLogger("SystemTreeNodeBinding");
this.perspectiveNode=null;
this._isForcedOpen=false;
this.node=null;
this.autoExpand=false;
}
SystemTreeNodeBinding.prototype.onBindingAttach=function(){
this.addActionListener(SystemTreeNodeBinding.ACTION_REFRESHED);
this.subscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN);
this.isDisabled=this.node.isDisabled();
var _e6f=this.node.getLabel();
if(_e6f){
this.setLabel(_e6f);
}
var _e70=this.node.getToolTip();
if(_e70){
this.setToolTip(_e70);
}
var _e71=this.node.getHandle();
if(_e71){
this.setHandle(_e71);
}
var bag=this.node.getPropertyBag();
if(bag){
for(var key in bag){
switch(key.toLowerCase()){
case "id":
case "key":
throw new Error("Illegal propertybag key: "+key);
break;
default:
this.setProperty(key,bag[key]);
break;
}
}
}
SystemTreeNodeBinding.superclass.onBindingAttach.call(this);
this.perspectiveNode=this.containingTreeBinding.perspectiveNode;
};
SystemTreeNodeBinding.prototype._initializeBindingDragAndDropFeatures=function(){
if(this.node.hasDragType()){
this.setProperty("dragtype",this.node.getDragType());
}
if(this.node.hasDragAccept()){
var _e74="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e74+=list.getNext();
if(list.hasNext()){
_e74+=" ";
}
}
this.setProperty("dragaccept",_e74);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e76){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e76);
switch(_e76.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e76.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e76.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e77,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e77,arg);
switch(_e77){
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN:
if(arg==this.node.getEntityToken()){
if(this.isContainer&&!this.isOpen){
this._isForcedOpen=true;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN,this);
var self=this;
setTimeout(function(){
self.open();
},0);
}
}
break;
}
};
SystemTreeNodeBinding.prototype._computeImageProfile=function(){
};
SystemTreeNodeBinding.prototype.computeImage=function(){
var _e7a=null;
var _e7b=this.node.getImageProfile();
if(_e7b){
if(this.isOpen){
_e7a=_e7b.getActiveImage();
}else{
_e7a=_e7b.getDefaultImage();
}
}
if(!_e7a){
_e7a=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e7a;
};
SystemTreeNodeBinding.prototype.open=function(_e7c){
var _e7d=this.isContainer&&!this.isOpen;
var _e7e=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e7d&&(_e7e||SystemTreeBinding.HAS_NO_MEMORY)&&_e7c!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e7f=null;
if(this.isContainer){
_e7f=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e7f);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e81){
if(_e81!=null){
this._refreshBranch(_e81);
}else{
this._refreshChildren();
}
this.isRefreshing=false;
this.isContainer=DOMUtil.getElementsByTagName(this.bindingElement,"treenode").item(0)!=null;
this.updateClassNames();
this.dispatchAction(SystemTreeNodeBinding.ACTION_REFRESHED);
this.dispatchAction(SystemTreeNodeBinding.ACTION_REFRESHED_YEAH);
};
SystemTreeNodeBinding.prototype._refreshChildren=function(){
var _e82=new List();
var _e83=this.node.getChildren();
this.empty();
if(_e83.hasEntries()){
this._insertTreeNodesRegulated(_e83);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e84){
var _e85=0;
var _e86=new List([]);
while(_e84.hasEntries()&&_e85<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e87=SystemTreeNodeBinding.newInstance(_e84.extractFirst(),this.bindingDocument);
_e87.autoExpand=this.autoExpand;
this.add(_e87);
_e87.attach();
_e85++;
if(this.autoExpand){
if(_e85==1&&!_e84.hasEntries()||LocalStore.openedNodes.has(_e87.node)){
_e86.add(_e87);
}
}
}
if(_e84.hasEntries()){
this._insertBufferTreeNode(_e84);
}
_e86.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e8a){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e8c=this.node.getDescendantBranch(list);
if(_e8c.hasEntries()){
this.XXX(_e8c);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e8d){
var self=this;
var map=new Map();
this.empty();
_e8d.each(function(key,_e91){
if(_e91.hasEntries()){
_e91.each(function(node){
var _e93=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e93);
if(map.has(key)){
var _e94=map.get(key);
_e94.add(_e93);
_e94.isOpen=true;
_e94.hasBeenOpened=true;
node.searchToken=_e94.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e93);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e8d.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e95=new TreeCrawler();
var _e96=new List();
_e95.mode=TreeCrawler.MODE_GETOPEN;
_e95.crawl(this.bindingElement,_e96);
if(_e96.hasEntries()){
_e96.extractFirst();
}
_e95.dispose();
return _e96;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e97=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e97=new List([this.node]);
list.each(function(_e99){
_e97.add(_e99.node);
});
}
return _e97;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e9a,_e9b){
var _e9c=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e9a instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e9a.node.getData(),this.node.getData(),_e9b?_e9b:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e9c);
}
}
};
SystemTreeNodeBinding.prototype.invokeManagedFocus=function(e){
if(!this.isFocused){
SystemTreeNodeBinding.superclass.invokeManagedFocus.call(this);
var tree=this.containingTreeBinding;
if(tree.isLockedToEditor&&!tree.isLockFeatureFocus){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS,this);
}
}
};
SystemTreeNodeBinding.prototype.hasChildren=function(){
return this.node.hasChildren();
};
SystemTreeNodeBinding.newInstance=function(node,_ea0){
var _ea1=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ea0);
var _ea2=UserInterface.registerBinding(_ea1,SystemTreeNodeBinding);
_ea2.node=node;
return _ea2;
};
SystemPageBinding.prototype=new PageBinding;
SystemPageBinding.prototype.constructor=SystemPageBinding;
SystemPageBinding.superclass=PageBinding.prototype;
function SystemPageBinding(){
this.logger=SystemLogger.getLogger("SystemPageBinding");
this.node=null;
this._tree=null;
}
SystemPageBinding.prototype.toString=function(){
return "[SystemPageBinding]";
};
SystemPageBinding.prototype.onBindingRegister=function(){
SystemPageBinding.superclass.onBindingRegister.call(this);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);
this.addActionListener(ButtonBinding.ACTION_COMMAND);
};
SystemPageBinding.prototype.setPageArgument=function(_ea3){
this.node=_ea3;
SystemPageBinding.superclass.setPageArgument.call(this,_ea3);
};
SystemPageBinding.prototype.onBeforePageInitialize=function(){
if(this.node){
this._tree=this.bindingWindow.bindingMap.tree;
if(this._tree){
this._buildTree();
}else{
throw "SystemPageBinding requires a SystemTreeBinding";
}
}else{
throw "SystemPageBinding requires a SystemNode";
}
SystemPageBinding.superclass.onBeforePageInitialize.call(this);
};
SystemPageBinding.prototype._buildTree=function(){
var _ea4=this.node.getChildren();
if(_ea4.hasEntries()){
while(_ea4.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ea4.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea6=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea6.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ea8=new TreeCrawler();
var _ea9=new List();
_ea8.mode=TreeCrawler.MODE_GETOPEN;
_ea8.crawl(this.bindingElement,_ea9);
_ea8.dispose();
var list=new List([this.node]);
_ea9.each(function(_eab){
list.add(_eab.node);
});
this._tree.empty();
var _eac=this.node.getDescendantBranch(list);
if(_eac.hasEntries()){
var self=this;
var map=new Map();
_eac.each(function(key,_eb0){
_eb0.each(function(node){
var _eb2=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eb2);
if(map.has(key)){
var _eb3=map.get(key);
_eb3.add(_eb2);
_eb3.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eb2);
}
}
});
});
this._tree.attachRecursive();
}
};
SystemPageBinding.prototype.onAfterPageInitialize=function(){
SystemPageBinding.superclass.onAfterPageInitialize.call(this);
this._tree.selectDefault();
};
SystemPageBinding.prototype.handleAction=function(_eb4){
SystemPageBinding.superclass.handleAction.call(this,_eb4);
switch(_eb4.type){
case ButtonBinding.ACTION_COMMAND:
var _eb5=_eb4.target;
switch(_eb5.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eb5.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb6,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb6,arg);
switch(_eb6){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eb8=arg;
if(this.node&&this.node.getEntityToken()==_eb8){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eb8);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eb8);
Application.unlock(self);
},0);
}
catch(exception){
alert(exception);
SystemDebug.stack(arguments);
}
}
break;
}
};
StageContainerBinding.prototype=new FlexBoxBinding;
StageContainerBinding.prototype.constructor=StageContainerBinding;
StageContainerBinding.superclass=FlexBoxBinding.prototype;
function StageContainerBinding(){
this.logger=SystemLogger.getLogger("StageContainerBinding");
}
StageContainerBinding.prototype.toString=function(){
return "[StageContainerBinding]";
};
StageContainerBinding.prototype.onBindingAttach=function(){
StageContainerBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.APPLICATION_OPERATIONAL);
};
StageContainerBinding.prototype.handleBroadcast=function(_eba,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eba,arg);
var _ebc=this.bindingWindow.WindowManager;
switch(_eba){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ebc.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ebc.WINDOW_RESIZED_BROADCAST:
if(Client.isMozilla==true){
this._fit();
this.reflex();
}else{
Application.lock(this);
var self=this;
setTimeout(function(){
self._fit();
self.reflex();
Application.unlock(self);
},0);
}
break;
}
};
StageContainerBinding.prototype._fit=function(){
var _ebe=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ebe.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ebf){
if(StageBinding.isViewOpen(_ebf)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ebf);
}else{
var _ec0=ViewDefinitions[_ebf];
StageBinding.presentViewDefinition(_ec0);
}
};
StageBinding.isViewOpen=function(_ec1){
return StageBinding.bindingInstance._activeViewDefinitions[_ec1]!=null;
};
StageBinding.selectPerspective=function(_ec2){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ec2);
};
StageBinding.presentViewDefinition=function(_ec3){
if(_ec3.label!=null){
var _ec4=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec4,[_ec3.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec3);
};
function StageBinding(){
this.logger=SystemLogger.getLogger("StageBinding");
this._activeViewDefinitions={};
this._decksBinding=null;
this._explorerBinding=null;
this._isStageReady=false;
this._isExplorerReady=false;
this._isDecksReady=false;
this._dockBindings=new Map();
this._isShowingStart=false;
this._isShowingDefaultStart=false;
this.isActivationAware=false;
return this;
}
StageBinding.prototype.toString=function(){
return "[StageBinding]";
};
StageBinding.prototype.onBindingRegister=function(){
StageBinding.superclass.onBindingRegister.call(this);
StageBinding.bindingInstance=this;
StageBoxHandlerAbstraction.onBindingRegister.call(this);
this.addActionListener(ExplorerBinding.ACTION_INITIALIZED);
this.addActionListener(StageDecksBinding.ACTION_INITIALIZED);
this.addActionListener(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
this.addActionListener(TabBoxBinding.ACTION_ATTACHED);
this.addActionListener(TabBoxBinding.ACTION_SELECTED);
this.addActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(ExplorerBinding.ACTION_DECK_LOADED);
this.addActionListener(StageDeckBinding.ACTION_LOADED);
this.addActionListener(ErrorBinding.ACTION_INITIALIZE);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
this.subscribe(BroadcastMessages.VIEW_OPENED);
this.subscribe(BroadcastMessages.COMPOSITE_START);
this.subscribe(BroadcastMessages.COMPOSITE_STOP);
this.subscribe(BroadcastMessages.DOCK_MAXIMIZED);
this.subscribe(BroadcastMessages.DOCK_NORMALIZED);
var root=System.getRootNode();
this._initializeRootActions(root);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ec6,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec8=System.getPerspectiveNodes();
if(_ec8.hasEntries()){
this._initializeSystemViewDefinitions(_ec8);
}else{
top.app.bindingMap.stagecontainer.hide();
this._onStageReady();
Dialog.message(StringBundle.getString("ui","Website.Dialogs.NoAccessTitle"),StringBundle.getString("ui","Website.Dialogs.NoAccessText"));
}
};
StageBinding.prototype._renameThisMethod=function(){
if(LocalStore.isInitialized){
this._initializeWorkbenchLayout();
}else{
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
self._initializeWorkbenchLayout();
}});
}
};
StageBinding.prototype._initializeWorkbenchLayout=function(){
if(this._explorerBinding){
var _eca=null;
if(LocalStore.isEnabled){
_eca=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eca&&ViewDefinitions[_eca]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eca));
}else{
this._explorerBinding.setSelectionDefault();
}
}else{
this._onStageReady();
}
};
StageBinding.prototype._onStageReady=function(){
if(!this._isStageReady){
if(!Application.hasStartPage||!Application.hasExternalConnection||Client.isPad||true){
top.app.bindingMap.maindecks.select("stagedeck");
}
EventBroadcaster.broadcast(BroadcastMessages.STAGE_INITIALIZED);
this._isStageReady=true;
}
};
StageBinding.prototype._initializeRootActions=function(root){
var _ecc=root.getActionProfile();
if(_ecc&&_ecc.hasEntries()){
var _ecd=top.app.bindingMap.toolsmenugroup;
if(_ecd){
_ecc.each(function(_ece,list){
list.each(function(_ed0){
var item=MenuItemBinding.newInstance(_ecd.bindingDocument);
item.setLabel(_ed0.getLabel());
item.setToolTip(_ed0.getToolTip());
item.setImage(_ed0.getImage());
item.setDisabled(_ed0.isDisabled());
item.associatedSystemAction=_ed0;
var _ed2=_ecd;
var tag=_ed0.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ed2=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ed2.add(item);
});
});
_ecd.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed4){
while(_ed4.hasNext()){
var node=_ed4.getNext();
var _ed6=node.getHandle();
ViewDefinitions[_ed6]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed7){
StageBinding.superclass.handleAction.call(this,_ed7);
var _ed8=_ed7.target;
switch(_ed7.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed8;
this._inflateBinding(_ed8);
_ed7.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed8;
this._inflateBinding(_ed8);
_ed7.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ed7.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed8 instanceof DockBinding){
switch(_ed8.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed8.reference,_ed8);
break;
}
this.handleAttachedDock(_ed8);
_ed7.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed8 instanceof DockBinding){
this.handleSelectedDockTab(_ed8.getSelectedTabBinding());
_ed7.consume();
}
break;
case WindowBinding.ACTION_LOADED:
break;
case ExplorerBinding.ACTION_DECK_LOADED:
this._isExplorerReady=true;
if(this._isDecksReady==true){
if(!this._isStageReady){
ProgressBarBinding.notch(3);
this._onStageReady();
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
if(!this._isFlexAbort&&Application.isOperational){
this._isFlexAbort=true;
this.reflex(true);
var self=this;
setTimeout(function(){
if(Client.isMozilla==true){
self.reflex(true);
}
self._isFlexAbort=false;
},0);
}
_ed7.consume();
break;
case StageDeckBinding.ACTION_LOADED:
this._isDecksReady=true;
if(this._isExplorerReady==true){
if(!this._isStageReady){
this._onStageReady();
}
}
break;
case ErrorBinding.ACTION_INITIALIZE:
_ed7.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed7);
};
StageBinding.prototype.handleBroadcast=function(_eda,arg){
StageBinding.superclass.handleBroadcast.call(this,_eda,arg);
switch(_eda){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _edc=arg;
this._dontView(_edc);
break;
case BroadcastMessages.COMPOSITE_START:
this._showStart(true);
break;
case BroadcastMessages.COMPOSITE_STOP:
this._showStart(false);
break;
case BroadcastMessages.DOCK_MAXIMIZED:
this._stabilizeExplorer();
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
break;
case BroadcastMessages.DOCK_NORMALIZED:
this._stabilizeExplorer();
break;
}
};
StageBinding.prototype._stabilizeExplorer=function(){
if(Client.isExplorer==true){
var self=this;
if(Client.isExplorer==true){
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageBinding.prototype._showStart=function(_ede){
if(_ede!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ee1=this.bindingWindow.bindingMap.maindecks;
if(_ede){
_ee1.select("startdeck");
view.show();
}else{
view.hide();
_ee1.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ede;
}
};
StageBinding.prototype._inflateBinding=function(_ee2){
for(var _ee3 in ViewDefinitions){
var _ee4=ViewDefinitions[_ee3];
if(_ee4 instanceof SystemViewDefinition){
_ee2.mountDefinition(_ee4);
}
}
var _ee5=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ee5){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee8=new StageCrawler();
_ee8.mode=mode;
_ee8.crawl(this.bindingElement);
_ee8.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ee9){
var _eea=_ee9.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eea);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eea));
}
};
StageBinding.prototype.handleAttachedDock=function(_eeb){
var _eec=_eeb.getTabBindings();
if(_eec.hasEntries()){
while(_eec.hasNext()){
var _eed=_eec.getNext();
var _eee=_eed.getHandle();
if(_eee){
if(_eee=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eef=ViewDefinitions[_eee];
if(_eef){
this._view(_eeb,_eed,_eef,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eee+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ef0){
var _ef1=null;
var _ef2=false;
switch(_ef0.position){
case Dialog.MODAL:
_ef1=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ef1=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ef0.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ef1=this._dockBindings.get(_ef0.position);
break;
case DockBinding.EXTERNAL:
window.open(_ef0.url);
_ef2=true;
break;
default:
var _ef3=this._decksBinding.getSelectedDeckBinding();
_ef1=_ef3.getDockBindingByReference(_ef0.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef4=this.bindingWindow.bindingMap.maindecks;
_ef4.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ef2=true;
}
break;
}
if(!_ef2){
if(_ef1!=null){
this._view(_ef1,null,_ef0,true);
}else{
throw "StageBinding: Could not position view: "+_ef0.handle;
}
}
};
StageBinding.prototype._view=function(_ef5,_ef6,_ef7,_ef8){
var _ef9=_ef7.handle;
if(_ef7.isMutable){
_ef9+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ef9]){
var _efa=ViewBinding.getInstance(_ef9);
if(_efa!=null){
_efa.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ef9);
}
}else{
this._activeViewDefinitions[_ef9]=_ef7;
Application.lock(this);
switch(_ef5.constructor){
case DockBinding:
if(_ef8){
_ef5.prepareNewView(_ef7);
}else{
_ef5.prepareOpenView(_ef7,_ef6);
}
break;
case StageDialogBinding:
if(_ef8){
_ef5.prepareNewView(_ef7);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_efb){
if(this._activeViewDefinitions[_efb]!=null){
delete this._activeViewDefinitions[_efb];
}else{
this.logger.debug("Could not unregister active view: "+_efb);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_efc){
};
StageCrawler.prototype=new BindingCrawler;
StageCrawler.prototype.constructor=StageCrawler;
StageCrawler.superclass=BindingCrawler.prototype;
StageCrawler.ID="stagecrawler";
StageCrawler.MODE_MAXIMIZE="maximize";
StageCrawler.MODE_UNMAXIMIZE="minimize";
function StageCrawler(){
this.mode=StageCrawler.MODE_MAXIMIZE;
this.id=StageCrawler.ID;
this._construct();
return this;
}
StageCrawler.prototype._construct=function(){
StageCrawler.superclass._construct.call(this);
var self=this;
this.addFilter(function(_efe){
var _eff=UserInterface.getBinding(_efe);
var _f00=null;
if(_eff){
switch(_eff.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eff.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eff.handleUnMaximization();
break;
}
break;
case DockBinding:
_f00=NodeCrawler.SKIP_NODE;
break;
}
}
return _f00;
});
};
StageDialogSetBinding.prototype=new DialogSetBinding;
StageDialogSetBinding.prototype.constructor=StageDialogSetBinding;
StageDialogSetBinding.superclass=DialogSetBinding.prototype;
function StageDialogSetBinding(){
this.logger=SystemLogger.getLogger("StageDialogSetBinding");
this._dialogs=new List();
}
StageDialogSetBinding.prototype.toString=function(){
return "[StageDialogSetBinding]";
};
StageDialogSetBinding.prototype.getInstance=function(){
var _f01=null;
this._dialogs.each(function(_f02){
if(!_f02.isVisible){
_f01=_f02;
}
return _f01!=null;
});
if(!_f01){
this._newInstance();
_f01=this._dialogs.getLast();
}
_f01.setModal(false);
return _f01;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f03=this.getInstance();
_f03.setModal(true);
return _f03;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f04=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f04);
_f04.attach();
};
StageDialogBinding.prototype=new DialogBinding;
StageDialogBinding.prototype.constructor=StageDialogBinding;
StageDialogBinding.superclass=DialogBinding.prototype;
function StageDialogBinding(){
this.logger=SystemLogger.getLogger("StageDialogBinding");
this._viewBinding=null;
this._pageBinding=null;
this._dialogResponseHandler=null;
this._isFirstPage=true;
return this;
}
StageDialogBinding.prototype.toString=function(){
return "[StageDialogBinding]";
};
StageDialogBinding.prototype.onBindingRegister=function(){
StageDialogBinding.superclass.onBindingRegister.call(this);
this.addActionListener(PageBinding.ACTION_INITIALIZED);
this.addActionListener(PageBinding.ACTION_DETACHED);
this.addActionListener(DialogPageBinding.ACTION_RESPONSE);
this.addActionListener(Binding.ACTION_INVALID);
this.addActionListener(Binding.ACTION_VALID);
this.addActionListener(ViewBinding.ACTION_LOADED);
this.addActionListener(ViewBinding.ACTION_ONCLOSE);
this.addActionListener(ViewBinding.ACTION_CLOSED);
this.addActionListener(ErrorBinding.ACTION_INITIALIZE);
this.addActionListener(PageBinding.ACTION_UPDATING);
this.addActionListener(PageBinding.ACTION_UPDATED);
this.addActionListener(DialogBinding.ACTION_CLOSE);
this.subscribe(BroadcastMessages.KEY_ESCAPE);
};
StageDialogBinding.prototype.onBindingAttach=function(){
StageDialogBinding.superclass.onBindingAttach.call(this);
this.defaultSetup();
};
StageDialogBinding.prototype.prepareNewView=function(_f05){
if(_f05 instanceof DialogViewDefinition){
var _f06=ViewBinding.newInstance(this.bindingDocument);
_f06.setDefinition(_f05);
_f06.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f05.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f05.handler)){
this._dialogResponseHandler=_f05.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f06;
this._body.add(_f06);
_f06.attach();
_f06.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f07){
StageDialogBinding.superclass.handleAction.call(this,_f07);
var _f08=_f07.target;
switch(_f07.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f08);
_f07.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f08.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f07.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f08.response){
this._handleDialogPageResponse(_f08);
}
_f07.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f07.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f07.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f07.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f07.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f07.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f07.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f07.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f07.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f08==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f09,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f09,arg);
switch(_f09){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f0b){
var _f0c=new FitnessCrawler();
var list=new List();
if(_f0b){
_f0c.mode=FitnessCrawler.MODE_BRUTAL;
}
_f0c.crawl(this.bindingElement,list);
_f0c.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f0e){
_f0e.fit(_f0b);
});
list.dispose();
this._fitMe();
}
};
StageDialogBinding.prototype._fitMe=function(){
if(this._pageBinding!=null){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(this._pageBinding);
this._pageBinding.enableAutoHeightLayoutMode(false);
var _f0f=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f0f){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f11){
var cmd=_f11.getProperty("cmd");
switch(cmd){
case DialogTitleBarPopupBinding.CMD_CLOSE:
this._defaultClose();
break;
case DialogTitleBarPopupBinding.CMD_REFRESH:
this._titlebar.setLabel(DockTabBinding.LABEL_TABLOADING);
this._titlebar.setImage(DockTabBinding.IMG_TABLOADING);
this._pageBinding=null;
this._viewBinding.reload(Application.isDeveloperMode);
break;
case DialogTitleBarPopupBinding.CMD_VIEWSOURCE:
case DialogTitleBarPopupBinding.CMD_VIEWGENERATED:
case DialogTitleBarPopupBinding.CMD_VIEWSERIALIZED:
this._viewSource(cmd);
break;
default:
alert("TODO!");
break;
}
};
StageDialogBinding.prototype._viewSource=DockTabBinding.prototype._viewSource;
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f13){
if(_f13.bindingDocument==this._viewBinding.getContentDocument()){
if(_f13 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f13);
}
this._pageBinding=_f13;
if(_f13.height=="auto"){
_f13.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f13);
_f13.enableAutoHeightLayoutMode(false);
this.reflex(true);
}
}
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
if(this._isFirstPage){
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,this._viewBinding.getHandle());
EventBroadcaster.broadcast(BroadcastMessages.STAGEDIALOG_OPENED);
}
}else{
if(_f13.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f13);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f14){
var _f15=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f15){
var _f16=UserInterface.getBinding(_f15);
_f16.setDisabled(_f14);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f17){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f17.response,_f17.result!=null?_f17.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f19){
if(_f19.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f19);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f1b){
switch(_f1b.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f1b.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f1b.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f1c){
var _f1d=_f1c.label;
var _f1e=_f1c.image;
var _f1f=_f1c.width;
var _f20=_f1c.height;
var _f21=_f1c.controls;
var _f22=_f1c.isResizable;
if(_f1d){
this.setLabel(_f1d);
}
if(_f1e){
this.setImage(_f1e);
}
if(_f1f||_f20){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f1f?_f1f:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f20!=null&&_f20!="auto")?_f20:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f21){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f26=new List(_f21.split(" "));
while((type=_f26.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f22!=this._isResizable){
this.setResizable(_f22);
}
if(_f20=="auto"){
this._fixAutoHeight(_f1c);
}
if(_f1c==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f27){
var dim=this.getDimension();
var _f29=0;
var _f2a=0;
if(_f27.isDialogSubPage){
_f27=this._pageBinding;
}
if(this._isFirstPage){
_f29=_f27.width!=null?_f27.width:dim.w;
}else{
_f29=dim.w;
}
_f2a=_f27.bindingElement.offsetHeight;
_f2a+=this._titlebar.bindingElement.offsetHeight;
if(_f2a<dim.h){
_f2a=dim.h;
}
if(_f27.minheight!=null){
if(_f2a<_f27.minheight){
_f2a=_f27.minheight;
}
}
_f2a=(top.window.innerHeight<_f2a)?top.window.innerHeight:_f2a;
this.setDimension(new Dimension(_f29,_f2a));
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
};
StageDialogBinding.prototype._defaultClose=function(){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(Dialog.RESPONSE_CANCEL);
}
this.close();
};
StageDialogBinding.prototype.open=function(){
StageDialogBinding.superclass.open.call(this);
if(this.isVisible==true){
this._viewBinding.onActivate();
}
};
StageDialogBinding.prototype.defaultSetup=function(){
this.setImage(LabelBinding.DEFAULT_IMAGE);
this.setLabel("");
this.setDimension(new Dimension(DialogBinding.DEFAULT_WIDTH,DialogBinding.DEFAULT_HEIGHT));
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].show();
this._pageBinding=null;
this._dialogResponseHandler=null;
if(!this._isResizable){
this.setResizable(true);
}
};
StageDialogBinding.prototype.setPosition=function(p){
StageDialogBinding.superclass.setPosition.call(this,p);
this._body.dispatchAction(Binding.ACTION_POSITIONCHANGED);
};
StageDialogBinding.prototype.setDimension=function(dim){
StageDialogBinding.superclass.setDimension.call(this,dim);
this._body.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
StageDialogBinding.prototype.activate=function(){
if(!this.isActive){
StageDialogBinding.superclass.activate.call(this);
this._viewBinding.onActivate();
}
};
StageDialogBinding.prototype.deActivate=function(){
if(this.isActive==true){
StageDialogBinding.superclass.deActivate.call(this);
this._viewBinding.onDeactivate();
}
};
StageDialogBinding.newInstance=function(_f2d){
var _f2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f2d);
var _f2f=UserInterface.registerBinding(_f2e,StageDialogBinding);
_f2f.setProperty("controls","minimize maximize close");
return _f2f;
};
FitnessCrawler.prototype=new Crawler;
FitnessCrawler.prototype.constructor=FitnessCrawler;
FitnessCrawler.superclass=Crawler.prototype;
FitnessCrawler.ID="fitnesscrawler";
FitnessCrawler.MODE_BRUTAL="brutal fitness";
FitnessCrawler.MODE_TRAINING="train fitness";
function FitnessCrawler(){
this.id=FitnessCrawler.ID;
this.mode=FitnessCrawler.MODE_TRAINING;
this._construct();
return this;
}
FitnessCrawler.prototype._construct=function(){
FitnessCrawler.superclass._construct.call(this);
this.addFilter(function(_f30,list){
var _f32=null;
var _f33=UserInterface.getBinding(_f30);
if(!_f33.isVisible){
_f32=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f32;
});
this.addFilter(function(_f34,list){
var _f36=null;
var _f37=UserInterface.getBinding(_f34);
if(_f37.isAttached){
if(Interfaces.isImplemented(IFit,_f37)){
if(!_f37.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f37);
}
}
}
return null;
});
};
StageDecksBinding.prototype=new DecksBinding;
StageDecksBinding.prototype.constructor=StageDecksBinding;
StageDecksBinding.superclass=DecksBinding.prototype;
StageDecksBinding.NODENAME_DECK="stagedeck";
StageDecksBinding.ACTION_INITIALIZED="stagedecks initialized";
function StageDecksBinding(){
this.logger=SystemLogger.getLogger("StageDecksBinding");
this._decks={};
}
StageDecksBinding.prototype.toString=function(){
return "[StageDecksBinding]";
};
StageDecksBinding.prototype.onBindingInitialize=function(){
StageDecksBinding.superclass.onBindingInitialize.call(this);
this.dispatchAction(StageDecksBinding.ACTION_INITIALIZED);
};
StageDecksBinding.prototype.mountDefinition=function(_f38){
var _f39=StageDeckBinding.newInstance(this.bindingDocument);
_f39.handle=_f38.handle;
_f39.perspectiveNode=_f38.node;
_f39.definition=_f38;
this._decks[_f39.handle]=_f39;
this.add(_f39);
_f39.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f3a){
var _f3b=this._decks[_f3a];
StageBinding.perspectiveNode=_f3b.perspectiveNode;
this.select(_f3b);
};
StageDeckBinding.prototype=new DeckBinding;
StageDeckBinding.prototype.constructor=StageDeckBinding;
StageDeckBinding.superclass=DeckBinding.prototype;
StageDeckBinding.ACTION_LOADED="stagedeck loaded";
StageDeckBinding.NODENAME_DECKS="stagedecks";
StageDeckBinding.DEFAULT_URL="${root}/content/misc/stage/stagedeck.aspx";
StageDeckBinding.CLASSNAME_TOOLS_OPEN="toolsopen";
function StageDeckBinding(){
this.logger=SystemLogger.getLogger("StageDeckBinding");
this.handle=null;
this.perspectiveNode=null;
this.isReady=false;
this._isStageDeckBindingInitialized=false;
this._dockBindings=null;
this._dockBindingCount=0;
this.windowBinding=null;
this.isSubPanelMaximized=false;
this.definition=null;
}
StageDeckBinding.prototype.toString=function(){
return "[StageDeckBinding]";
};
StageDeckBinding.prototype.onBindingRegister=function(){
StageDeckBinding.superclass.onBindingRegister.call(this);
StageBoxHandlerAbstraction.onBindingRegister.call(this);
this._dockBindings=new Map();
this.addActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(TabBoxBinding.ACTION_ATTACHED);
};
StageDeckBinding.prototype.handleAction=function(_f3c){
StageDeckBinding.superclass.handleAction.call(this,_f3c);
var _f3d=_f3c.target;
switch(_f3c.type){
case WindowBinding.ACTION_LOADED:
if(_f3d==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f3e=this.windowBinding.getContentDocument();
var _f3f=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f40=ViewBinding.newInstance(_f3e);
_f40.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f41=ViewDefinitions["Composite.Management.Browser"];
_f41.argument["SystemViewDefinition"]=this.definition;
_f40.setDefinition(_f41);
_f3f.add(_f40);
_f40.attach();
_f40.initialize();
this._viewBinding=_f40;
_f3c.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f3d instanceof DockBinding){
this._dockBindings.set(_f3d.reference,_f3d);
_f3d.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f3c.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f3c.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f3c);
StageDeckBinding.superclass.handleAction.call(this,_f3c);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f43=new StageCrawler();
_f43.mode=mode;
_f43.crawl(this.windowBinding.getContentDocument().body);
_f43.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f44){
return this._dockBindings.get(_f44);
};
StageDeckBinding.prototype.initialize=function(){
if(!this._isStageDeckBindingInitialized){
top.app.bindingMap.stagedeckscover.show();
this.windowBinding=this.add(WindowBinding.newInstance(this.bindingDocument));
var url=StageDeckBinding.DEFAULT_URL+"?handle="+this.handle;
this.windowBinding.setURL(url);
this.windowBinding.attach();
this._isStageDeckBindingInitialized=true;
}
};
StageDeckBinding.newInstance=function(_f46){
var _f47=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f46);
var _f48=UserInterface.registerBinding(_f47,StageDeckBinding);
return _f48;
};
StageDeckRootBinding.prototype=new RootBinding;
StageDeckRootBinding.prototype.constructor=StageDeckRootBinding;
StageDeckRootBinding.superclass=RootBinding.prototype;
StageDeckRootBinding.DEFAULT_TEMPLATE="defaultstagedeck.xml";
function StageDeckRootBinding(){
this.logger=SystemLogger.getLogger("StageDeckRootBinding");
}
StageDeckRootBinding.prototype.toString=function(){
return "[StageDeckRootBinding]";
};
StageSplitBoxBinding.prototype=new SplitBoxBinding;
StageSplitBoxBinding.prototype.constructor=StageSplitBoxBinding;
StageSplitBoxBinding.superclass=SplitBoxBinding.prototype;
StageSplitBoxBinding.ACTION_HIDE="stagesplitboxbinding hide";
StageSplitBoxBinding.ACTION_SHOW="stagesplitboxbinding show";
StageSplitBoxBinding.ACTION_DOCK_EMPTIED="stagesplitbox says dock emptied";
StageSplitBoxBinding.ACTION_DOCK_OPENED="stagesplitbox says dock opened";
function StageSplitBoxBinding(){
this.logger=SystemLogger.getLogger("StageSplitBoxBinding");
this.isMaximizePrepared=false;
this.isMaximizedForReal=null;
this.isMinimizedForReal=null;
return this;
}
StageSplitBoxBinding.prototype.toString=function(){
return "[StageSplitBoxBinding]";
};
StageSplitBoxBinding.prototype.onBindingRegister=function(){
StageSplitBoxBinding.superclass.onBindingRegister.call(this);
StageBoxAbstraction.onBindingRegister.call(this);
this.addActionListener(DockBinding.ACTION_EMPTIED,this);
this.addActionListener(DockBinding.ACTION_OPENED,this);
this.addActionListener(StageSplitBoxBinding.ACTION_SHOW,this);
this.addActionListener(StageSplitBoxBinding.ACTION_HIDE,this);
};
StageSplitBoxBinding.prototype.handleAction=function(_f49){
StageSplitBoxBinding.superclass.handleAction.call(this,_f49);
StageBoxAbstraction.handleAction.call(this,_f49);
var _f4a=_f49.target;
var _f4b=null;
var _f4c=null;
switch(_f49.type){
case DockBinding.ACTION_EMPTIED:
_f4c=this.getChildBindingByLocalName("splitter");
if(_f4c.isVisible){
_f4c.hide();
}
_f4b=this.getDescendantBindingsByLocalName("dock");
if(_f4b.getFirst().isEmpty&&_f4b.getLast().isEmpty){
if(_f4b.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f49.consume();
break;
case DockBinding.ACTION_OPENED:
_f4b=this.getDescendantBindingsByLocalName("dock");
if(!_f4b.getFirst().isEmpty&&!_f4b.getLast().isEmpty){
_f4c=this.getChildBindingByLocalName("splitter");
if(!_f4c.isVisible){
_f4c.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f49.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f4a!=this){
_f4c=this.getChildBindingByLocalName("splitter");
if(_f4c.isVisible){
_f4c.hide();
}
this.invokeLayout();
_f49.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f4a!=this){
var _f4d=this.getChildBindingsByLocalName("splitpanel");
if(_f4d.getFirst().isVisible&&_f4d.getLast().isVisible){
_f4c=this.getChildBindingByLocalName("splitter");
if(!_f4c.isVisible){
_f4c.show();
}
}
this.invokeLayout();
_f49.consume();
}
break;
}
};
StageSplitBoxBinding.prototype.handleMaximization=function(){
StageBoxAbstraction.handleMaximization.call(this);
};
StageSplitBoxBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
};
StageSplitBoxBinding.prototype.flex=function(){
if(this.isMaximizedForReal==null){
StageSplitBoxBinding.superclass.flex.call(this);
}
};
StageSplitBoxBinding.prototype.handleCrawler=function(_f4e){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f4e);
switch(_f4e.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f4e.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f4f=this.getChildBindingsByLocalName("splitpanel");
return _f4f.getFirst().isVisible&&_f4f.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f50=this.getChildBindingsByLocalName("splitpanel");
return _f50.getFirst().isFixed&&_f50.getLast().isFixed;
};
StageSplitPanelBinding.prototype=new SplitPanelBinding;
StageSplitPanelBinding.prototype.constructor=StageSplitPanelBinding;
StageSplitPanelBinding.superclass=SplitPanelBinding.prototype;
StageSplitPanelBinding.ACTION_LAYOUTUPDATE="stagesplitpanel layout changed";
function StageSplitPanelBinding(){
this.logger=SystemLogger.getLogger("StageSplitPanelBinding");
this.isMaximizePrepared=false;
this.isMaximizedForReal=null;
this.isMinimizedForReal=null;
this._isInvisibilized=false;
this.isActive=true;
this.isFixed=false;
}
StageSplitPanelBinding.prototype.toString=function(){
return "[StageSplitPanelBinding]";
};
StageSplitPanelBinding.prototype.onBindingRegister=function(){
StageSplitPanelBinding.superclass.onBindingRegister.call(this);
StageBoxAbstraction.onBindingRegister.call(this);
this.addActionListener(DockBinding.ACTION_OPENED,this);
this.addActionListener(DockBinding.ACTION_EMPTIED,this);
this.addActionListener(StageSplitBoxBinding.ACTION_HIDE,this);
this.addActionListener(StageSplitBoxBinding.ACTION_SHOW,this);
this.addActionListener(StageSplitPanelBinding.ACTION_LAYOUTUPDATE,this);
};
StageSplitPanelBinding.prototype.handleAction=function(_f51){
StageSplitPanelBinding.superclass.handleAction.call(this,_f51);
StageBoxAbstraction.handleAction.call(this,_f51);
switch(_f51.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f51.type==StageSplitBoxBinding.ACTION_HIDE){
_f51.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f51.type==DockBinding.ACTION_EMPTIED){
var self=this;
setTimeout(function(){
self.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
},0);
}
break;
case DockBinding.ACTION_OPENED:
case StageSplitBoxBinding.ACTION_SHOW:
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(false);
if(_f51.type==StageSplitBoxBinding.ACTION_SHOW){
_f51.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f54=_f51.target;
if(_f54!=this&&_f54.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f55=_f54._containingSplitBoxBinding;
if(_f55.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f56=_f55.getChildBindingsByLocalName("splitpanel");
var _f57=_f56.getFirst();
var _f58=_f56.getLast();
if(this.isFixed==true){
if(!_f57.isFixed||!_f58.isFixed||(!_f55.hasBothPanelsVisible()&&_f54.isMinimizedForReal)){
this.setFix(false);
_f51.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f55.hasBothPanelsFixed()||(!_f55.hasBothPanelsVisible()&&_f54.isMinimizedForReal)){
this.setFix(_f54.getContainedDock().getHeight());
_f51.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}
}
}else{
}
}
break;
}
};
StageSplitPanelBinding.prototype.handleMaximization=function(){
StageBoxAbstraction.handleMaximization.call(this);
var _f59=this.getContainedDock();
if(_f59){
if(this.isMaximizePrepared==true){
}else{
_f59.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f5a=this.getContainedDock();
if(_f5a){
if(_f5a.type==DockBinding.TYPE_EDITORS){
if(_f5a.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f5a.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f5b=this.getContainedDock();
if(_f5b){
_f5b.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f5b);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f5c=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5d=this.getContainedDock();
if(_f5d){
_f5d.collapse(_f5c);
if(!_f5c){
this.setFix(_f5d.getHeight());
}else{
this.setFix(_f5d.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5d&&_f5d.isActive){
_f5d.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f5d);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f5e){
var _f5f=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f60=this.getContainedDock();
if(_f60){
if(this.isMinimized==true){
_f60.unCollapse(_f5f);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f5e){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f60){
_f60.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f60);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f61){
var _f62=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f62=false;
}
}
if(_f62==true){
this._invisibilize(_f61);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f64){
if(_f64!=this._isInvisibilized){
if(_f64){
this.bindingElement.style.visibility="hidden";
}else{
this.bindingElement.style.visibility="visible";
}
this._isInvisibilized=!this._isInvisibilized;
}
};
StageSplitterBinding.prototype=new SplitterBinding;
StageSplitterBinding.prototype.constructor=StageSplitterBinding;
StageSplitterBinding.superclass=SplitterBinding.prototype;
function StageSplitterBinding(){
this.logger=SystemLogger.getLogger("StageSplitterBinding");
this._wasHidden=null;
}
StageSplitterBinding.prototype.toString=function(){
return "[StageSplitterBinding]";
};
StageSplitterBinding.prototype.handleMaximization=function(){
this._wasHidden=!this.isVisible;
this.bindingElement.style.display="none";
};
StageSplitterBinding.prototype.handleUnMaximization=function(){
if(!this._wasHidden){
this.bindingElement.style.display="block";
this._wasHidden=null;
}
};
StageSplitterBinding.prototype.onDragStart=function(_f65){
var _f66=top.app.bindingMap.stagesplittercover;
var _f67=this._containingSplitBoxBinding.getOrient();
switch(_f67){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f66.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f66.bindingElement.style.cursor="n-resize";
break;
}
_f66.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f67);
body.show();
this.isDragging=true;
};
StageSplitterBinding.prototype.onDrag=function(diff){
this._updateSplitterBodyPosition(this.getEvaluatedDiff(diff));
};
StageSplitterBinding.prototype.onDragStop=function(diff){
this._updateSplitterBodyPosition(this.getEvaluatedDiff(diff));
top.app.bindingMap.stagesplitterbody.hide();
top.app.bindingMap.stagesplittercover.hide();
this.isDragging=false;
this.offset=this._containingSplitBoxBinding.isHorizontalOrient()?diff.x:diff.y;
this.dispatchAction(SplitterBinding.ACTION_DRAGGED);
};
StageSplitterBinding.prototype._updateSplitterBodyPosition=function(diff){
var pos=this.getPosition();
pos.x+=diff.x;
pos.y+=diff.y;
app.bindingMap.stagesplitterbody.setPosition(pos);
};
StageSplitterBinding.prototype.getPosition=function(){
return DOMUtil.getUniversalPosition(this.bindingElement);
};
StageSplitterBinding.prototype.getDimension=function(){
return new Dimension(this.bindingElement.offsetWidth,this.bindingElement.offsetHeight);
};
StageSplitterBodyBinding.prototype=new Binding;
StageSplitterBodyBinding.prototype.constructor=StageSplitterBodyBinding;
StageSplitterBodyBinding.superclass=Binding.prototype;
function StageSplitterBodyBinding(){
this.logger=SystemLogger.getLogger("StageSplitterBodyBinding");
this._orient=null;
}
StageSplitterBodyBinding.prototype.toString=function(){
return "[StageSplitterBodyBinding]";
};
StageSplitterBodyBinding.prototype.setOrient=function(_f6d){
this._orient=_f6d;
this.attachClassName(_f6d);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f6f=true;
var _f70=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f70=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6f=false;
break;
}
if(_f6f){
this.bindingElement.style.left=pos.x+"px";
}
if(_f70){
this.bindingElement.style.top=pos.y+"px";
}
};
StageSplitterBodyBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=dim.w+"px";
this.bindingElement.style.height=dim.h+"px";
};
StageSplitterBodyBinding.prototype.show=function(){
this.bindingElement.style.display="block";
};
StageSplitterBodyBinding.prototype.hide=function(){
this.bindingElement.style.display="none";
this.detachClassName(SplitBoxBinding.ORIENT_HORIZONTAL);
this.detachClassName(SplitBoxBinding.ORIENT_VERTICAL);
this._orient=null;
};
StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED="hidden stagebox stuff updated";
function StageBoxAbstraction(){
this.isMaximizePrepared=false;
this.isMaximizedForReal=null;
this.isMinimizedForReal=null;
this.isHiddenForReal=null;
}
StageBoxAbstraction.onBindingRegister=function(){
this.addActionListener(ControlBoxBinding.ACTION_MAXIMIZE);
this.addActionListener(ControlBoxBinding.ACTION_MINIMIZE);
this.addActionListener(ControlBoxBinding.ACTION_NORMALIZE);
this.addActionListener(TabBoxBinding.ACTION_UPDATED);
};
StageBoxAbstraction.handleAction=function(_f72){
switch(_f72.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
this.isMaximizePrepared=true;
break;
case ControlBoxBinding.ACTION_MINIMIZE:
this.isMinimizedForReal=true;
break;
case ControlBoxBinding.ACTION_NORMALIZE:
this.isMaximizePrepared=false;
this.isMinimizedForReal=null;
break;
case TabBoxBinding.ACTION_UPDATED:
if(_f72.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f72.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f73=this.bindingElement.style;
_f73.position="absolute";
_f73.width="100%";
_f73.height="100%";
_f73.top="0";
_f73.left="0";
}else{
this.attachClassName("maximized");
if(this instanceof StageSplitPanelBinding){
StageBoxAbstraction._emulateBasicCSS(this,true);
}
}
}else{
this.isMaximizedForReal=false;
this.isHiddenForReal=true;
if(this instanceof StageSplitPanelBinding){
this.invisibilize(true);
}
}
};
StageBoxAbstraction.handleUnMaximization=function(){
if(this.isMaximizedForReal==true){
this.isFlexible=true;
if(Client.isMozilla==true){
var _f74=this.bindingElement.style;
_f74.position="relative";
_f74.width="auto";
_f74.height="auto";
_f74.top="auto";
_f74.left="auto";
}else{
this.detachClassName("maximized");
if(this instanceof StageSplitPanelBinding){
StageBoxAbstraction._emulateBasicCSS(this,false);
}
}
}else{
if(this instanceof StageSplitPanelBinding){
this.invisibilize(false);
}
}
this.isMaximizePrepared=false;
this.isMaximizedForReal=null;
this.isHiddenForReal=null;
};
StageBoxAbstraction._emulateBasicCSS=function(_f75,_f76){
var _f77=_f75.bindingElement.style;
var _f78=_f75.bindingElement.parentNode;
var box=_f75._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f76){
_f75._unmodifiedFlexMethod=_f75.flex;
_f75.flex=function(){
_f77.width=_f78.offsetWidth+"px";
_f77.height=_f78.offsetHeight+"px";
};
}else{
_f77.width="100%";
_f77.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f77.width="auto";
_f77.height="auto";
box.reflex(true);
},0);
}
_f75.flex=_f75._unmodifiedFlexMethod;
_f75._unmodifiedFlexMethod=null;
}
}
};
function StageBoxHandlerAbstraction(){
this.isSubPanelMaximized=false;
}
StageBoxHandlerAbstraction.onBindingRegister=function(){
this.addActionListener(ControlBoxBinding.ACTION_MAXIMIZE,this);
this.addActionListener(ControlBoxBinding.ACTION_NORMALIZE,this);
this.addActionListener(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED,this);
this.addActionListener(StageSplitPanelBinding.ACTION_LAYOUTUPDATE,this);
};
StageBoxHandlerAbstraction.handleAction=function(_f7a){
var _f7b=_f7a.target;
switch(_f7a.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f7b instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f7a);
_f7a.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f7a.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f7c){
var mode=null;
switch(_f7c.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
if(!this.isSubPanelMaximized){
mode=StageCrawler.MODE_MAXIMIZE;
this.isSubPanelMaximized=true;
}
break;
case ControlBoxBinding.ACTION_NORMALIZE:
if(this.isSubPanelMaximized){
mode=StageCrawler.MODE_UNMAXIMIZE;
this.isSubPanelMaximized=false;
}
break;
}
if(mode!=null){
this.iterateContainedStageBoxBindings(mode);
}
};
StageMenuBarBinding.prototype=new MenuBarBinding;
StageMenuBarBinding.prototype.constructor=StageMenuBarBinding;
StageMenuBarBinding.superclass=MenuBarBinding.prototype;
function StageMenuBarBinding(){
this.logger=SystemLogger.getLogger("StageMenuBarBinding");
this._rootNode=null;
}
StageMenuBarBinding.prototype.toString=function(){
return "[StageMenuBarBinding]";
};
StageMenuBarBinding.prototype.onBindingAttach=function(){
StageMenuBarBinding.superclass.onBindingAttach.call(this);
if(System.hasActivePerspectives){
this.addActionListener(MenuItemBinding.ACTION_COMMAND);
}else{
Binding.prototype.hide.call(this);
}
};
StageMenuBarBinding.prototype.handleAction=function(_f7e){
StageMenuBarBinding.superclass.handleAction.call(this,_f7e);
switch(_f7e.type){
case MenuItemBinding.ACTION_COMMAND:
var _f7f=_f7e.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f7f){
SystemAction.invoke(_f7f,this._rootNode);
}
}
_f7e.consume();
break;
}
};
StageViewMenuItemBinding.prototype=new MenuItemBinding;
StageViewMenuItemBinding.prototype.constructor=StageViewMenuItemBinding;
StageViewMenuItemBinding.superclass=MenuItemBinding.prototype;
function StageViewMenuItemBinding(){
this.logger=SystemLogger.getLogger("StageViewMenuItemBinding");
this._handle=null;
}
StageViewMenuItemBinding.prototype.toString=function(){
return "[StageViewMenuItemBinding]";
};
StageViewMenuItemBinding.prototype.onBindingAttach=function(){
StageViewMenuItemBinding.superclass.onBindingAttach.call(this);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.subscribe(BroadcastMessages.VIEW_OPENED);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
this.subscribe(BroadcastMessages.STAGE_INITIALIZED);
}
};
StageViewMenuItemBinding.prototype.buildDOMContent=function(){
StageViewMenuItemBinding.superclass.buildDOMContent.call(this);
var _f80=this.getProperty("handle");
if(_f80){
this._handle=_f80;
if(StageBinding.isViewOpen(_f80)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f80);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f82){
this.setProperty("handle",_f82);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f83,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f83,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f83){
case BroadcastMessages.STAGE_INITIALIZED:
if(this.isChecked){
this.fireCommand();
}
break;
case BroadcastMessages.VIEW_OPENED:
if(arg==this._handle){
this.check(true);
}
break;
case BroadcastMessages.VIEW_CLOSED:
if(arg==this._handle){
this.uncheck(true);
}
break;
}
}
};
StageViewMenuItemBinding.newInstance=function(_f85){
var _f86=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f85);
UserInterface.registerBinding(_f86,StageViewMenuItemBinding);
return UserInterface.getBinding(_f86);
};
StageStatusBarBinding.prototype=new ToolBarBinding;
StageStatusBarBinding.prototype.constructor=StageStatusBarBinding;
StageStatusBarBinding.superclass=ToolBarBinding.prototype;
function StageStatusBarBinding(){
this.logger=SystemLogger.getLogger("StageStatusBarBinding");
this._label=null;
}
StageStatusBarBinding.prototype.toString=function(){
return "[StageStatusBarBinding]";
};
StageStatusBarBinding.prototype.onBindingInitialize=function(){
this._label=this.bindingWindow.bindingMap.statusbarlabel;
StatusBar.initialize(this);
StageStatusBarBinding.superclass.onBindingInitialize.call(this);
};
StageStatusBarBinding.prototype.setLabel=function(_f87){
this._label.setLabel(_f87);
};
StageStatusBarBinding.prototype.setImage=function(_f88){
this._label.setImage(_f88);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f89){
this.logger.debug("START FADEOUT");
};
ExplorerBinding.prototype=new FlexBoxBinding;
ExplorerBinding.prototype.constructor=ExplorerBinding;
ExplorerBinding.superclass=FlexBoxBinding.prototype;
ExplorerBinding.ACTION_INITIALIZED="explorer initialized";
ExplorerBinding.ACTION_DECK_LOADED="explorer deck loaded";
ExplorerBinding.PERSPECTIVE_CONTENT="Content";
ExplorerBinding.PERSPECTIVE_MEDIA="Media";
ExplorerBinding.PERSPECTIVE_DATA="Datas";
ExplorerBinding.PERSPECTIVE_DESIGN="Design";
ExplorerBinding.PERSPECTIVE_FUNCTIONS="Functions";
ExplorerBinding.PERSPECTIVE_USERS="Users";
ExplorerBinding.PERSPECTIVE_SYSTEM="System";
ExplorerBinding.bindingInstance=null;
ExplorerBinding.getFocusedTreeNodeBindings=function(){
var _f8a=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f8b=_f8a._viewBinding;
var _f8c=_f8b.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _f8d=_f8c.getFocusedTreeNodeBindings();
if(!_f8d.hasEntries()&&StageBinding.treeSelector){
_f8d=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f8d;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f8e=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f8e.each(function(_f8f){
LocalStore.focuseNodes.add(_f8f.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f90=LocalStore.focuseNodes.getEntityTokens();
var _f91=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f92=_f91.getAssociatedView();
var _f93=_f92.getContentWindow().bindingMap.tree;
_f90=new List(TreeService.GetCurrentLocaleEntityTokens(_f90.toArray()));
_f90.each(function(_f94){
_f93._focusTreeNodeByEntityToken(_f94);
});
LocalStore.focuseNodes.clear();
};
function ExplorerBinding(){
this.logger=SystemLogger.getLogger("ExplorerBinding");
this._decksBinding=null;
this._menuBinding=null;
this._splitterBinding=null;
this._dragStart=0;
this._dragSlot=0;
this._dragHeight=0;
return this;
}
ExplorerBinding.prototype.toString=function(){
return "[ExplorerBinding]";
};
ExplorerBinding.prototype.onBindingAttach=function(){
ExplorerBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
this.addActionListener(ViewBinding.ACTION_LOADED);
this.addActionListener(Binding.ACTION_DRAG);
this._decksBinding=this.addMember(this.getDescendantBindingByLocalName("explorerdecks"));
this._menuBinding=this.addMember(app.bindingMap.explorermenu);
};
ExplorerBinding.prototype.onBindingInitialize=function(){
ExplorerBinding.bindingInstance=this;
ExplorerBinding.superclass.onBindingInitialize.call(this);
this.dispatchAction(ExplorerBinding.ACTION_INITIALIZED);
};
ExplorerBinding.prototype.handleAction=function(_f95){
ExplorerBinding.superclass.handleAction.call(this,_f95);
var _f96=_f95.target;
switch(_f95.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f95.consume();
break;
case Binding.ACTION_DRAG:
if(_f96 instanceof ExplorerSplitterBinding){
_f96.dragger.registerHandler(this);
}
_f95.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f98){
this._menuBinding.setSelectionByHandle(_f98);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f99){
if(_f99 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f99);
this._menuBinding.mountDefinition(_f99);
}
};
ExplorerBinding.prototype.onDragStart=function(_f9a){
var _f9b=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f9b.hasEntries()){
var _f9c=_f9b.getFirst();
this._dragStart=_f9c.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f9c.boxObject.getDimension().h;
}
this.bindingWindow.bindingMap.explorercover.show();
}
};
ExplorerBinding.prototype.onDrag=function(diff){
var y=this._dragStart+diff.y;
if(y>this._dragStart+this._dragSlot+this._dragHeight){
if(this._menuBinding.showLess()){
this._decksBinding.expandBy(this._dragHeight);
this._dragSlot+=this._dragHeight;
}
}
if(y<this._dragStart+this._dragSlot){
if(this._menuBinding.showMore()){
this._decksBinding.expandBy(-this._dragHeight);
this._dragSlot-=this._dragHeight;
}
}
};
ExplorerBinding.prototype.onDragStop=function(diff){
this.bindingWindow.bindingMap.explorercover.hide();
};
ExplorerDecksBinding.prototype=new DecksBinding;
ExplorerDecksBinding.prototype.constructor=ExplorerDecksBinding;
ExplorerDecksBinding.superclass=DecksBinding.prototype;
ExplorerDecksBinding.NODENAME_DECK="explorerdeck";
function ExplorerDecksBinding(){
this.logger=SystemLogger.getLogger("ExplorerDecksBinding");
this._decks={};
return this;
}
ExplorerDecksBinding.prototype.onBindingAttach=function(){
ExplorerDecksBinding.superclass.onBindingAttach.call(this);
this.addActionListener(PageBinding.ACTION_ATTACHED);
};
ExplorerDecksBinding.prototype.toString=function(){
return "[ExplorerDecksBinding]";
};
ExplorerDecksBinding.prototype.mountDefinition=function(_fa0){
if(_fa0 instanceof SystemViewDefinition){
var _fa1=ViewBinding.newInstance(this.bindingDocument);
_fa1.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa1.setDefinition(_fa0);
var _fa2=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa2.setAssociatedView(_fa1);
this._decks[_fa0.handle]=_fa2;
_fa2.add(_fa1);
this.add(_fa2);
function attach(){
_fa2.attach();
_fa1.attach();
}
if(Client.isWebKit){
setTimeout(function(){
attach();
},0);
}else{
attach();
}
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa3){
var _fa4=this._decks[_fa3];
this.select(_fa4);
};
DecksBinding.prototype.expandBy=function(_fa5){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa7=this.bindingElement.offsetHeight+_fa5;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa7+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa9){
var _faa=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa9);
return UserInterface.registerBinding(_faa,ExplorerDecksBinding);
};
ExplorerDeckBinding.prototype=new DeckBinding;
ExplorerDeckBinding.prototype.constructor=ExplorerDeckBinding;
ExplorerDeckBinding.superclass=DeckBinding.prototype;
ExplorerDeckBinding.NODENAME_DECKS="explorerdecks";
function ExplorerDeckBinding(){
this.logger=SystemLogger.getLogger("ExplorerDeckBinding");
this._entityToken=null;
this._handle=null;
this._isRefreshRequired=false;
this._viewBinding=null;
this._isExplorerDeckBindingInitialized=false;
return this;
}
ExplorerDeckBinding.prototype.toString=function(){
return "[ExplorerDeckBinding]";
};
ExplorerDeckBinding.prototype.onBindingRegister=function(){
ExplorerDeckBinding.superclass.onBindingRegister.call(this);
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
};
ExplorerDeckBinding.prototype.setAssociatedView=function(_fab){
this._viewBinding=_fab;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fac=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fad=this._viewBinding.getDefinition().label;
StatusBar.busy(_fac,[_fad]);
this.bindingWindow.bindingMap.explorerdeckscover.show();
this.addActionListener(PageBinding.ACTION_INITIALIZED);
this._viewBinding.initialize();
}
if(this._isRefreshRequired==true){
this._refreshTree();
this._isRefreshRequired=false;
}else{
ExplorerDeckBinding.superclass.select.call(this);
this.dispatchAction(DockTabBinding.ACTION_UPDATE_VISUAL);
}
if(this._isExplorerDeckBindingInitialized){
EventBroadcaster.broadcast(BroadcastMessages.EXPLORERDECK_CHANGED,this._handle);
}
};
ExplorerDeckBinding.prototype.handleAction=function(_fae){
ExplorerDeckBinding.superclass.handleAction.call(this,_fae);
var _faf=_fae.target;
switch(_fae.type){
case PageBinding.ACTION_INITIALIZED:
if(_faf instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_faf.node.getEntityToken();
this._handle=_faf.node.getHandle();
this.removeActionListener(PageBinding.ACTION_INITIALIZED);
this.bindingWindow.bindingMap.explorerdeckscover.hide();
this.dispatchAction(DockTabBinding.ACTION_UPDATE_VISUAL);
Application.unlock(this);
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
EventBroadcaster.broadcast(BroadcastMessages.EXPLORERDECK_CHANGED,this._handle);
}
break;
}
};
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb0,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb0,arg);
switch(_fb0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL:
if(this.isSelected==true){
this._refreshTree();
}else{
if(this._entityToken!=null){
this._isRefreshRequired=true;
}
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
this.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED);
this.select();
break;
}
};
ExplorerDeckBinding.prototype._refreshTree=function(){
if(this._entityToken!=null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,this._entityToken);
}
};
ExplorerDeckBinding.prototype._collapseTree=function(){
alert("ExplorerDeckBinding: collapse tree!");
};
ExplorerDeckBinding.prototype.getLabel=function(){
var _fb2=null;
if(this._isExplorerDeckBindingInitialized){
_fb2=this._viewBinding.getDefinition().label;
}else{
_fb2=DockTabBinding.LABEL_TABLOADING;
}
return _fb2;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb3=null;
if(this._isExplorerDeckBindingInitialized){
_fb3=this._viewBinding.getDefinition().image;
}else{
_fb3=DockTabBinding.IMG_TABLOADING;
}
return _fb3;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb4=null;
if(this._isExplorerDeckBindingInitialized){
_fb4=this._viewBinding.getDefinition().toolTip;
}
return _fb4;
};
ExplorerDeckBinding.newInstance=function(_fb5){
var _fb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fb5);
return UserInterface.registerBinding(_fb6,ExplorerDeckBinding);
};
ExplorerSplitterBinding.prototype=new Binding;
ExplorerSplitterBinding.prototype.constructor=ExplorerSplitterBinding;
ExplorerSplitterBinding.superclass=Binding.prototype;
function ExplorerSplitterBinding(){
this.logger=SystemLogger.getLogger("ExplorerSplitterBinding");
this.isDraggable=true;
return this;
}
ExplorerSplitterBinding.prototype.toString=function(){
return "[ExplorerSplitterBinding]";
};
ExplorerMenuBinding.prototype=new Binding;
ExplorerMenuBinding.prototype.constructor=ExplorerMenuBinding;
ExplorerMenuBinding.superclass=Binding.prototype;
ExplorerMenuBinding.ACTION_SELECTIONCHANGED="explorermenu selectionchanged";
function ExplorerMenuBinding(){
this.logger=SystemLogger.getLogger("ExplorerMenuBinding");
this._minButtons=new Map();
this._minList=new List();
this._index=-1;
this._minGroup=null;
this._selectedHandle=null;
this._selectedTag=null;
}
ExplorerMenuBinding.prototype.toString=function(){
return "[ExplorerMenuBinding]";
};
ExplorerMenuBinding.prototype.onBindingRegister=function(){
ExplorerMenuBinding.superclass.onBindingRegister.call(this);
this.addActionListener(RadioGroupBinding.ACTION_SELECTIONCHANGED,this);
this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
};
ExplorerMenuBinding.prototype.onBindingAttach=function(){
ExplorerMenuBinding.superclass.onBindingAttach.call(this);
this.addMember(this.getChildBindingByLocalName("explorertoolbar"));
};
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb7){
switch(_fb7.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fb7.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb7);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb8){
this._minButtons.set(_fb8.handle,this._mountMinButton(_fb8));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fb9){
var _fba=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fba.setLabel(_fb9.label);
_fba.setToolTip(_fb9.label);
_fba.handle=_fb9.handle;
_fba.node=_fb9.node;
this._minGroup.add(_fba);
this._minList.add(_fba);
_fba.attach();
return _fba;
};
ExplorerMenuBinding.prototype.handleAction=function(_fbb){
ExplorerMenuBinding.superclass.handleAction.call(this,_fbb);
switch(_fbb.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fbc=_fbb.target;
var _fbd=_fbc.getCheckedButtonBinding();
var _fbe=_fbd.handle;
this._selectedHandle=_fbe;
this._selectedTag=_fbd.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fbb.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fbf,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fbf,arg);
switch(_fbf){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc1){
var _fc2=this._minButtons.get(_fc1);
if(_fc2){
_fc2.check();
}else{
this.setSelectionDefault();
}
};
ExplorerMenuBinding.prototype.getSelectionHandle=function(){
return this._selectedHandle;
};
ExplorerMenuBinding.prototype.getSelectionTag=function(){
return this._selectedTag;
};
ExplorerMenuBinding.prototype.setSelectionDefault=function(){
if(this._minList.hasEntries()){
this._minList.getFirst().check();
}
};
ExplorerMenuBinding.prototype.toggle=function(){
if(top.app.bindingMap.app.hasClassName("exploler-expanded")){
this.collapse();
}else{
this.expand();
}
};
ExplorerMenuBinding.prototype.collapse=function(){
top.app.bindingMap.app.detachClassName("exploler-expanded");
top.app.bindingMap.menutogglebutton.setImage("${icon:menu}");
};
ExplorerMenuBinding.prototype.expand=function(){
top.app.bindingMap.app.attachClassName("exploler-expanded");
top.app.bindingMap.menutogglebutton.setImage("${icon:arrow-left}");
};
ExplorerToolBarBinding.prototype=new ToolBarBinding;
ExplorerToolBarBinding.prototype.constructor=ExplorerToolBarBinding;
ExplorerToolBarBinding.superclass=ToolBarBinding.prototype;
function ExplorerToolBarBinding(){
this.logger=SystemLogger.getLogger("ExplorerToolBarBinding");
this._hasDefaultContent=false;
}
ExplorerToolBarBinding.prototype.toString=function(){
return "[ExplorerToolBarBinding]";
};
ExplorerToolBarBinding.prototype.onBindingRegister=function(){
ExplorerToolBarBinding.superclass.onBindingRegister.call(this);
this.setImageSize(ToolBarBinding.ICONSIZE_22);
};
ExplorerToolBarBinding.newInstance=function(_fc3){
var _fc4=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc3);
return UserInterface.registerBinding(_fc4,ExplorerToolBarBinding);
};
ExplorerToolBarButtonBinding.prototype=new ToolBarButtonBinding;
ExplorerToolBarButtonBinding.prototype.constructor=ExplorerToolBarButtonBinding;
ExplorerToolBarButtonBinding.superclass=ToolBarButtonBinding.prototype;
ExplorerToolBarButtonBinding.TYPE_NORMAL="normal";
ExplorerToolBarButtonBinding.TYPE_LARGE="large";
function ExplorerToolBarButtonBinding(){
this.logger=SystemLogger.getLogger("ExplorerToolBarButtonBinding");
this.isRadioButton=true;
this.explorerToolBarButtonType=null;
this.node=null;
}
ExplorerToolBarButtonBinding.prototype.toString=function(){
return "[ExplorerToolBarButtonBinding]";
};
ExplorerToolBarButtonBinding.prototype.onBindingAttach=function(){
var _fc5=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc6=_fc5?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc6);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fc7,_fc8){
var _fc9="ui:explorertoolbarbutton";
var _fca=DOMUtil.createElementNS(Constants.NS_UI,_fc9,_fc7);
var _fcb=UserInterface.registerBinding(_fca,ExplorerToolBarButtonBinding);
_fcb.explorerToolBarButtonType=_fc8;
return _fcb;
};
EditorBinding.prototype=new WindowBinding;
EditorBinding.prototype.constructor=EditorBinding;
EditorBinding.superclass=WindowBinding.prototype;
EditorBinding.isActive=false;
EditorBinding.ACTION_ATTACHED=null;
EditorBinding.URL_DIALOG_MOZ_CONFIGURE="${root}/content/dialogs/wysiwygeditor/mozsecuritynote/mozsecuritynote.aspx";
EditorBinding.URL_UPDATERENDERING="${root}/content/dialogs/functions/editFunctionCall.aspx?type={0}";
EditorBinding.ABSURD_NUMBER=-999999999;
EditorBinding.LINE_BREAK_ENTITY_HACK="C1.LINE.BREAK.ENTITY.HACK";
EditorBinding.invokeFunctionEditorDialog=function(_fcc,_fcd,type){
type=type?type:"";
var _fcf=FunctionService.GetCustomEditorSettingsByMarkup(_fcc);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fcf){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fcf.Width?(_fcf.Width>dim.w?dim.w:_fcf.Width):undefined;
def.height=_fcf.Height?(_fcf.Height>dim.h?dim.h:_fcf.Height):undefined;
if(_fcf.Url){
_fcf.Url=_fcf.Url.indexOf("?")>-1?_fcf.Url+"&consoleId="+Application.CONSOLE_ID:_fcf.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fcd;
def.argument={url:_fcf?_fcf.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fcc}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fd2,_fd3){
var _fd4=EditorBinding._components;
var _fd5=EditorBinding._editors;
var key=_fd3.key;
var _fd7=Interfaces.isImplemented(IWysiwygEditorComponent,_fd2);
if(!_fd7){
_fd7=Interfaces.isImplemented(ISourceEditorComponent,_fd2);
}
if(_fd7){
if(_fd5.has(key)){
_fd5.get(key).initializeEditorComponent(_fd2);
}else{
if(!_fd4.has(key)){
_fd4.set(key,new List());
}
_fd4.get(key).add(_fd2);
}
}else{
throw "Editor component interface not implemented: "+_fd2;
}
};
EditorBinding.claimComponents=function(_fd8,_fd9){
var _fda=EditorBinding._components;
var _fdb=EditorBinding._editors;
var key=_fd9.key;
_fdb.set(key,_fd8);
var list=null;
if(_fda.has(key)){
list=_fda.get(key).copy();
_fda.del(key);
}
return list;
};
function EditorBinding(){
this.logger=SystemLogger.getLogger("EditorBinding");
this.action_initialized=null;
this.url_default=null;
this._popupBinding=null;
this._startContent=null;
this._explorerBookmark=null;
this.isDirty=false;
this.isDialogMode=false;
this.isFocusable=true;
this.isFocused=false;
this._isActivated=false;
this._Binding=null;
this._url=null;
this.isBlockingActions=true;
this._isFinalized=false;
this._bookmark=null;
this._checksum=null;
this.crawlerFilters=new List([FocusCrawler.ID,FitnessCrawler.ID]);
}
EditorBinding.prototype.toString=function(){
return "[EditorBinding]";
};
EditorBinding.prototype.onBindingRegister=function(){
EditorBinding.superclass.onBindingRegister.call(this);
this._url=this.url_default;
this._coverBinding=this.add(CoverBinding.newInstance(this.bindingDocument));
var name=this.getProperty("name");
if(name==null||name==""){
name="generated"+KeyMaster.getUniqueKey();
}
this._registerWithDataManager(name);
};
EditorBinding.prototype.onBindingAttach=function(){
Application.lock(this);
if(this.hasCallBackID()){
Binding.dotnetify(this);
}
this._setup();
this.setURL(this._url);
this.addActionListener(Binding.ACTION_DIRTY);
EditorBinding.superclass.onBindingAttach.call(this);
};
EditorBinding.prototype._setup=function(){
var _fdf=this.getProperty("value");
if(_fdf!=null){
_fdf=decodeURIComponent(_fdf);
this._startContent=_fdf;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fe1=this.bindingWindow.DataManager;
_fe1.unRegisterDataBinding(name);
}
};
EditorBinding.prototype._initialize=function(){
this.subscribe(BroadcastMessages.STAGEDIALOG_OPENED);
this.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP);
if(this._startContent==null){
this._startContent=new String("");
}
this.addEditorEvents();
var self=this;
setTimeout(function(){
self._finalize();
},0);
};
EditorBinding.prototype._finalize=function(){
this.resetUndoRedo();
this._popupBinding=this.getEditorPopupBinding();
Application.unlock(this);
this._isFinalized=true;
this.dispatchAction(this.action_initialized);
};
EditorBinding.prototype.initializeEditorComponents=function(_fe3){
var _fe4=EditorBinding.claimComponents(this,_fe3);
if(_fe4!=null){
while(_fe4.hasNext()){
this.initializeEditorComponent(_fe4.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe6=this.bindingWindow.DataManager;
if(_fe6.getDataBinding(name)){
_fe6.unRegisterDataBinding(name);
}
_fe6.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fe7=this.getEditorDocument();
if(_fe7!=null){
Application.framework(_fe7);
DOMEvents.addEventListener(_fe7,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fe7,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fe7,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fe7,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fe9){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fe9==true){
this.bindingWindow.DataManager.dirty(this);
}else{
var self=this;
setTimeout(function(){
self._checkForRealDirty();
},0);
}
}
};
EditorBinding.prototype._checkForRealDirty=function(){
var _feb=this.getCheckSum();
if(_feb!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_feb;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fec=null;
if(Binding.exists(this._pageBinding)){
_fec=this._pageBinding.getCheckSum(this._checksum);
}
return _fec;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fee=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.CONTEXTMENU:
if(Client.isFirefox&&e.ctrlKey){
}else{
DOMEvents.preventDefault(e);
this._popupBinding.editorBinding=this;
this.handleContextMenu(e);
}
break;
case DOMEvents.KEYPRESS:
this.checkForDirty();
if(!this._isActivated||this.isFocusable&&!this.isFocused){
this._activateEditor(true);
}
break;
case DOMEvents.MOUSEDOWN:
if(_fee.ownerDocument==this.getEditorDocument()){
if(!this._isActivated||this.isFocusable&&!this.isFocused){
this._activateEditor(true);
}
}
break;
case DOMEvents.MOUSEMOVE:
if(Client.isExplorer||Client.isExplorer11){
if(Application.isBlurred){
if(!this._isActivated){
this.getContentWindow().focus();
}
}
}
break;
}
};
EditorBinding.prototype.handleContextMenu=function(e){
this.createBookmark();
this._popupBinding.snapToMouse(e);
};
EditorBinding.prototype.handleBroadcast=function(_ff0,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff0,arg);
var _ff2=null;
switch(_ff0){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff3=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff3=false;
}
}
}else{
_ff2=DOMEvents.getTarget(arg);
if(_ff2&&_ff2.ownerDocument==this.getEditorDocument()){
_ff3=false;
}
}
if(_ff3){
if(this._isActivated){
this._activateEditor(false);
}
}
}
catch(exception){
this.unsubscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP);
throw exception;
}
}
break;
}
};
EditorBinding.prototype._activateEditor=function(_ff4){
if(_ff4!=this._isActivated){
this._isActivated=_ff4;
EditorBinding.isActive=_ff4;
var _ff5=this.getEditorWindow().standardEventHandler;
var _ff6=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff6!=null){
if(_ff4){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff6.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff5.enableNativeKeys(true);
}else{
_ff6.disable();
_ff5.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ff7=this.getEditorDocument().selection.createRange();
_ff7.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ff8=false;
try{
var _ff9=this.getEditorWindow().getSelection();
if(_ff9!=null){
_ff8=_ff9.toString().length>0;
if(!_ff8){
var _ffa=_ff9.getRangeAt(0);
var frag=_ffa.cloneContents();
var _ffc=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_ffc.appendChild(frag.firstChild);
}
var img=_ffc.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ff8=true;
}
}
}
}
}
catch(exception){
}
return _ff8;
};
EditorBinding.prototype.isCommandEnabled=function(_ffe){
var _fff=true;
switch(_ffe){
case "Cut":
case "Copy":
case "Paste":
_fff=this.getEditorDocument().queryCommandEnabled(_ffe);
break;
}
return _fff;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1003=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var value=null;
if(cmd=="Paste"){
value=null;
}else{
value=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,value);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_1003=true;
}
break;
}
return _1003;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1006=this.getContentWindow().bindingMap.toolbar;
var _1007=_1006.getButtonForCommand(cmd);
if(!_1007){
throw "No button for command "+cmd;
}
return _1007;
};
EditorBinding.prototype.getName=function(){
return this.getProperty("name");
};
EditorBinding.prototype.dirty=DataBinding.prototype.dirty;
EditorBinding.prototype.clean=function(){
this.isDirty=false;
this._checksum=this.getCheckSum();
};
EditorBinding.prototype.enableDialogMode=function(){
if(!this.isDialogMode){
this.isDialogMode=true;
if(!this.hasBookmark()){
this.createBookmark();
}
var self=this;
setTimeout(function(){
self._activateEditor(false);
},0);
}
};
EditorBinding.prototype.disableDialogMode=function(){
if(this.isDialogMode){
if(this.hasBookmark()){
this.restoreBookmark();
}
var self=this;
setTimeout(function(){
self.isDialogMode=false;
self.blurEditor();
},100);
}
};
EditorBinding.prototype.blurEditor=function(){
var input=this.getContentDocument().getElementById("focusableinput");
if(input!=null){
input.style.display="block";
FocusBinding.focusElement(input);
input.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_100b){
EditorBinding.superclass.handleAction.call(this,_100b);
var _100c=_100b.target;
var self=this;
var _100e=this.shadowTree.iframe;
switch(_100b.type){
case Binding.ACTION_DIRTY:
if(_100b.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_100f){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_100f);
};
EditorBinding.prototype.handleElement=function(_1010){
return true;
};
EditorBinding.prototype.updateElement=function(_1011){
return true;
};
EditorBinding.prototype.focus=DataBinding.prototype.focus;
EditorBinding.prototype.blur=DataBinding.prototype.blur;
EditorBinding.prototype.manifest=function(){
this.shadowTree.dotnetinput.value=encodeURIComponent(this.getValue());
};
EditorBinding.prototype.getEditorWindow=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getEditorDocument=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getEditorPopupBinding=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.createBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.restoreBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.hasBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.deleteBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.resetUndoRedo=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.validate=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getValue=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getResult=Binding.ABSTRACT_METHOD;
EditorPopupBinding.prototype=new PopupBinding;
EditorPopupBinding.prototype.constructor=EditorPopupBinding;
EditorPopupBinding.superclass=PopupBinding.prototype;
EditorPopupBinding.CONTENT_TEMPLATE=null;
function EditorPopupBinding(){
this.logger=SystemLogger.getLogger("EditorPopupBinding");
this._isEditorPopupBindingInitialized=false;
this.editorBinding=null;
}
EditorPopupBinding.prototype.toString=function(){
return "[EditorPopupBinding]";
};
EditorPopupBinding.prototype.show=function(){
if(!this._isEditorPopupBindingInitialized){
var self=this;
Application.lock(this);
setTimeout(function(){
self._initialize();
Application.unlock(self);
},0);
}else{
EditorPopupBinding.superclass.show.call(this);
}
};
EditorPopupBinding.prototype._initialize=function(){
if(!this._isEditorPopupBindingInitialized){
this.subTreeFromString(Templates.getTemplateElementText(this.constructor.CONTENT_TEMPLATE));
this._bodyBinding=this.getChildBindingByLocalName("menubody");
this.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
this._indexMenuContent();
this._isEditorPopupBindingInitialized=true;
this._onInitialize();
}
};
EditorPopupBinding.prototype._onInitialize=function(){
this._configure();
this.show();
};
EditorPopupBinding.prototype.configure=function(){
if(this._isEditorPopupBindingInitialized){
this._configure();
}
};
EditorPopupBinding.prototype._configure=Binding.ABSTRACT_METHOD;
EditorPopupBinding.prototype._showMenuGroups=function(rel){
var _1014=this._menuGroups[rel];
if(_1014 instanceof List){
_1014.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1017=this._menuGroups[rel];
if(_1017 instanceof List){
_1017.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1019){
EditorPopupBinding.superclass.handleAction.call(this,_1019);
var _101a=_1019.target;
if(_1019.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_101a.getProperty("cmd");
var gui=_101a.getProperty("gui");
var val=_101a.getProperty("val");
this.handleCommand(cmd,gui,val);
}
};
EditorPopupBinding.prototype.handleCommand=Binding.ABSTRACT_METHOD;
EditorClickButtonBinding.prototype=new ClickButtonBinding;
EditorClickButtonBinding.prototype.constructor=EditorClickButtonBinding;
EditorClickButtonBinding.superclass=ClickButtonBinding.prototype;
function EditorClickButtonBinding(){
this.logger=SystemLogger.getLogger("EditorClickButtonBinding");
this._editorBinding=null;
this.isEditorControlBinding=true;
this.isEditorSimpleControl=true;
this.cmd=null;
this.val=null;
this.gui=null;
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this._codePressFrame=null;
this._codePressEngine=null;
}
EditorClickButtonBinding.prototype.toString=function(){
return "[EditorClickButtonBinding]";
};
EditorClickButtonBinding.prototype.onBindingAttach=function(){
EditorClickButtonBinding.superclass.onBindingAttach.call(this);
this._setupEditorButton();
};
EditorClickButtonBinding.prototype._setupEditorButton=function(){
this.cmd=this.getProperty("cmd");
this.val=this.getProperty("val");
this.gui=this.getProperty("gui");
if(this.getProperty("editorcontrol")==false){
this.isEditorControlBinding=false;
}
var _101e=this.bindingWindow.bindingMap.tinywindow;
var _101f=this.bindingWindow.bindingMap.codepresswindow;
if(_101e){
EditorBinding.registerComponent(this,_101e);
}else{
if(_101f){
EditorBinding.registerComponent(this,_101f);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1020,_1021,_1022,theme){
this._editorBinding=_1020;
this._tinyEngine=_1021;
this._tinyInstance=_1022;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1024,frame,_1026){
this._editorBinding=_1024;
this._codePressFrame=frame;
this._codePressEngine=_1026;
};
EditorClickButtonBinding.prototype._buildDesignModeSanitizer=function(){
if(Client.isExplorer||Client.isExplorer11){
var img=this.bindingDocument.createElement("img");
img.className="designmodesanitizer";
img.src=Resolver.resolve("${root}/images/blank.png");
img.ondragstart=function(e){
e.preventDefault();
};
this.shadowTree.designmodesanitizer=img;
this.bindingElement.appendChild(img);
}
};
EditorClickButtonBinding.prototype._setupEditorBookmarking=function(){
var _1029=this._editorBinding;
if(_1029!=null){
var self=this;
var _102b={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1029.hasBookmark()){
_1029.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1029.hasBookmark()){
_1029.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_102b);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_102b);
}
};
EditorClickButtonBinding.newInstance=function(_102d){
var _102e=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_102d);
return UserInterface.registerBinding(_102e,EditorClickButtonBinding);
};
EditorToolBarButtonBinding.prototype=new ToolBarButtonBinding;
EditorToolBarButtonBinding.prototype.constructor=EditorToolBarButtonBinding;
EditorToolBarButtonBinding.superclass=ToolBarButtonBinding.prototype;
function EditorToolBarButtonBinding(){
this.logger=SystemLogger.getLogger("EditorToolBarButtonBinding");
this._editorBinding=null;
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this.isEditorSimpleControl=true;
this.isEditorControlBinding=true;
this.cmd=null;
this.val=null;
this.gui=null;
}
EditorToolBarButtonBinding.prototype.toString=function(){
return "[EditorToolBarButtonBinding]";
};
EditorToolBarButtonBinding.prototype.onBindingAttach=function(){
EditorToolBarButtonBinding.superclass.onBindingAttach.call(this);
this._setupEditorButton();
};
EditorToolBarButtonBinding.prototype._setupEditorButton=EditorClickButtonBinding.prototype._setupEditorButton;
EditorToolBarButtonBinding.prototype.buildDOMContent=function(){
EditorToolBarButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorToolBarButtonBinding.prototype.initializeComponent=EditorClickButtonBinding.prototype.initializeComponent;
EditorToolBarButtonBinding.prototype.initializeSourceEditorComponent=EditorClickButtonBinding.prototype.initializeSourceEditorComponent;
EditorToolBarButtonBinding.prototype._buildDesignModeSanitizer=EditorClickButtonBinding.prototype._buildDesignModeSanitizer;
EditorToolBarButtonBinding.prototype._setupEditorBookmarking=EditorClickButtonBinding.prototype._setupEditorBookmarking;
EditorToolBarButtonBinding.newInstance=function(_102f){
var _1030=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_102f);
return UserInterface.registerBinding(_1030,EditorToolBarButtonBinding);
};
EditorSelectorBinding.prototype=new SelectorBinding;
EditorSelectorBinding.prototype.constructor=EditorSelectorBinding;
EditorSelectorBinding.superclass=SelectorBinding.prototype;
function EditorSelectorBinding(){
this.logger=SystemLogger.getLogger("EditorSelectorBinding");
this._editorBinding=null;
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this.BUTTON_IMPLEMENTATION=EditorClickButtonBinding;
this.MENUITEM_IMPLEMENTATION=EditorMenuItemBinding;
this.isFocusable=false;
this.isEditorControlBinding=true;
this.isSearchSelectionEnabled=false;
}
EditorSelectorBinding.prototype.toString=function(){
return "[EditorSelectorBinding]";
};
EditorSelectorBinding.prototype.onBindingAttach=function(){
if(this.getProperty("editorcontrol")==false){
this.isEditorControlBinding=false;
this.BUTTON_IMPLEMENTATION=ClickButtonBinding;
this.MENUITEM_IMPLEMENTATION=MenuItemBinding;
}
var _1031=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1031);
if(Client.isPad){
this.setProperty("width",140);
}
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1032,_1033,_1034,theme){
this._editorBinding=_1032;
this._tinyEngine=_1033;
this._tinyInstance=_1034;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1036){
EditorSelectorBinding.superclass.handleAction.call(this,_1036);
switch(_1036.type){
case MenuItemBinding.ACTION_COMMAND:
if(this._editorBinding.hasBookmark()){
var self=this;
setTimeout(function(){
if(!self._editorBinding.isDialogMode){
self._editorBinding.restoreBookmark();
self._tinyInstance.focus();
}
},0);
}
break;
}
};
EditorSelectorBinding.prototype._grabKeyboard=function(){
};
EditorSelectorBinding.prototype._releaseKeyboard=function(){
};
EditorMenuItemBinding.prototype=new MenuItemBinding;
EditorMenuItemBinding.prototype.constructor=EditorMenuItemBinding;
EditorMenuItemBinding.superclass=MenuItemBinding.prototype;
function EditorMenuItemBinding(){
this.logger=SystemLogger.getLogger("EditorMenuItemBinding");
this.isEditorControlBinding=true;
}
EditorMenuItemBinding.prototype.toString=function(){
return "[EditorMenuItemBinding]";
};
EditorMenuItemBinding.prototype.buildDOMContent=function(){
EditorMenuItemBinding.superclass.buildDOMContent.call(this);
if(Client.isExplorer||Client.isExplorer11){
this._buildDesignModeSanitizer();
}
};
EditorMenuItemBinding.prototype._buildDesignModeSanitizer=function(){
if(Client.isExplorer||Client.isExplorer11){
var img=this.bindingDocument.createElement("img");
img.className="designmodesanitizer";
img.src=Resolver.resolve("${root}/images/blank.png");
img.ondragstart=function(e){
e.preventDefault();
};
this.shadowTree.designmodesanitizer=img;
this.bindingElement.appendChild(img);
}
};
EditorMenuItemBinding.newInstance=function(_103a){
var _103b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_103a);
return UserInterface.registerBinding(_103b,EditorMenuItemBinding);
};
VisualEditorBinding.prototype=new EditorBinding;
VisualEditorBinding.prototype.constructor=VisualEditorBinding;
VisualEditorBinding.superclass=EditorBinding.prototype;
VisualEditorBinding.FUNCTION_CLASSNAME="compositeFunctionWysiwygRepresentation";
VisualEditorBinding.FIELD_CLASSNAME="compositeFieldReferenceWysiwygRepresentation";
VisualEditorBinding.HTML_CLASSNAME="compositeHtmlWysiwygRepresentation";
VisualEditorBinding.ACTION_INITIALIZED="visualeditor initialized";
VisualEditorBinding.DEFAULT_CONTENT="<p></p>";
VisualEditorBinding.URL_DIALOG_CONTENTERROR="${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
VisualEditorBinding.XHTML="<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head></head>\n\t<body>\n${body}\n\t</body>\n</html>";
VisualEditorBinding.getTinyLessClassName=function(_103c){
var i=0,_103e,_103f=[],split=_103c.split(" ");
while((_103e=split[i++])!=null){
if(_103e.length>=3&&_103e.substring(0,3)=="mce"){
continue;
}else{
if(_103e.length>=14&&_103e.substring(0,14)=="compositemedia"){
continue;
}
}
_103f.push(_103e);
}
return _103f.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1041){
var _1042=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1041);
if(soap instanceof SOAPFault){
}else{
_1042=soap.XhtmlFragment;
if(!_1042){
_1042="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1042;
};
VisualEditorBinding.getTinyContent=function(_1044,_1045){
var _1046=null;
if(_1044==null||!_1044.replace(/\s*/gm,"").length){
_1044=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1045.getSoapTinyContent(_1044);
if(soap instanceof SOAPFault){
var _1048=soap;
var _1049={handleDialogResponse:function(){
_1045.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1049,_1048);
}else{
_1046=soap.XhtmlFragment;
if(_1046==null){
_1046=new String("");
}
_1046=_1046.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1046;
};
VisualEditorBinding.isImage=function(_104a){
return _104a&&_104a.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_104b){
return VisualEditorBinding.isImage(_104b)&&!VisualEditorBinding.isReservedElement(_104b);
};
VisualEditorBinding.isReservedElement=function(_104c){
if(VisualEditorBinding.isFunctionElement(_104c)){
return true;
}
if(VisualEditorBinding.isFieldElement(_104c)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_104c)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_104d){
return VisualEditorBinding.isImage(_104d)&&CSSUtil.hasClassName(_104d,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_104e){
return VisualEditorBinding.isImage(_104e)&&CSSUtil.hasClassName(_104e,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_104f){
return VisualEditorBinding.isImage(_104f)&&CSSUtil.hasClassName(_104f,VisualEditorBinding.HTML_CLASSNAME);
};
function VisualEditorBinding(){
this.logger=SystemLogger.getLogger("VisualEditorBinding");
this.action_initialized=VisualEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/visualeditor/visualeditor.aspx";
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this.embedableFieldConfiguration=null;
this._xhtml=null;
this._previewPageId=null;
this._previewTemplateId=null;
this._previewPlaceholder=null;
return this;
}
VisualEditorBinding.prototype.onBindingRegister=function(){
VisualEditorBinding.superclass.onBindingRegister.call(this);
StringBundle.getString("Composite.Web.VisualEditor","Preload.Key");
};
VisualEditorBinding.prototype.onBindingAttach=function(){
var _1050=this.getProperty("embedablefieldstypenames");
if(_1050!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1050);
}
var _1051=this.getProperty("formattingconfiguration");
if(_1051!=null){
this._url+="?config="+_1051;
}
this._previewPageId=this.getProperty("previewpageid");
if(this._previewPageId==null){
this._previewPageId="00000000-0000-0000-0000-000000000000";
}
this._previewTemplateId=this.getProperty("previewtemplateid");
if(this._previewTemplateId==null){
this._previewTemplateId="00000000-0000-0000-0000-000000000000";
}
this._previewPlaceholder=this.getProperty("previewplaceholder");
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1052,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1052,arg);
var _1054=this.getContentWindow().bindingMap.tinywindow;
var _1055=_1054.getContentWindow();
switch(_1052){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1055){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1054);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1056){
_1056.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1057=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1057.replace(/\s*/gm,"").length==0){
_1057=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1057,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1058){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1058);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _105a=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_105a=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_105a=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _105a;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_105d){
var _105e=_105d;
if(!this._isNormalizedDocument(_105d)){
_105e=this._getHtmlMarkup().replace("${body}",_105d);
}
return _105e;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_105f){
var _1060=false;
var doc=XMLParser.parse(_105f,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1060=true;
}
}
if(Client.isWebKit){
if(_105f.indexOf("<html")!==0){
_1060=false;
}
}
return _1060;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1065=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1065){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1065=true;
}
return _1065;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1067=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1067);
VisualEditorBinding.superclass.handleContextMenu.call(this,e);
};
VisualEditorBinding.prototype.getEditorWindow=function(){
return DOMUtil.getParentWindow(this.getEditorDocument());
};
VisualEditorBinding.prototype.getEditorDocument=function(){
return this._tinyInstance.getDoc();
};
VisualEditorBinding.prototype.getEditorPopupBinding=function(){
return app.bindingMap.visualeditorpopup;
};
VisualEditorBinding.prototype.createBookmark=function(){
this._bookmark=this._tinyInstance.selection.getBookmark(true);
};
VisualEditorBinding.prototype.restoreBookmark=function(){
if(this.hasBookmark()){
this._tinyInstance.selection.moveToBookmark(this._bookmark);
this.deleteBookmark();
}
};
VisualEditorBinding.prototype.hasBookmark=function(){
return this._bookmark!=null;
};
VisualEditorBinding.prototype.deleteBookmark=function(){
this._bookmark=null;
};
VisualEditorBinding.prototype.resetUndoRedo=function(){
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
if(this._pageBinding!=null){
this._pageBinding.updateUndoBroadcasters();
}
};
VisualEditorBinding.prototype.validate=function(){
return this._pageBinding.validate();
};
VisualEditorBinding.prototype.getValue=function(){
return this._pageBinding.getContent();
};
VisualEditorBinding.prototype.setValue=function(value){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(value);
}
}else{
if(this._startContent==null){
this._startContent=value;
}
}
};
VisualEditorBinding.prototype.getResult=function(){
};
VisualEditorBinding.prototype.clean=function(){
VisualEditorBinding.superclass.clean.call(this);
if(this._pageBinding!=null){
this._pageBinding.clean();
}
};
VisualEditorBinding.prototype.getSoapTinyContent=function(_1069){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1069,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_106b){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_106b,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _106e=CSSComputer.getPadding(body);
var _106f=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_106f.bindingElement.offsetWidth-52;
return Math.floor(width/32)*32;
};
VisualEditorBinding.prototype.getPlaceholderWidth=function(){
return StageBinding.placeholderWidth;
};
VisualEditorBinding.prototype.updateBodyWidth=function(width){
if(width==undefined){
width=this.getPlaceholderWidth();
}
if(width){
this._tinyInstance.getBody().style.maxWidth=(width+52)+"px";
}else{
this._tinyInstance.getBody().style.maxWidth="";
}
};
VisualEditorBinding.prototype.focus=function(){
VisualEditorBinding.superclass.focus.call(this);
if(Client.isExplorer&&this._tinyInstance){
this._tinyInstance.selection.setRng(this._tinyInstance.selection.getRng());
}
};
VisualEditorBinding.prototype.setResult=function(_1072){
};
VisualEditorPopupBinding.prototype=new EditorPopupBinding;
VisualEditorPopupBinding.prototype.constructor=VisualEditorPopupBinding;
VisualEditorPopupBinding.superclass=EditorPopupBinding.prototype;
VisualEditorPopupBinding.CONTENT_TEMPLATE="wysiwygeditor/popup.xml";
function VisualEditorPopupBinding(){
this.logger=SystemLogger.getLogger("VisualEditorPopupBinding");
this.tinyElement=null;
this.tinyEngine=null;
this.tinyInstance=null;
this.hasSelection=false;
}
VisualEditorPopupBinding.prototype.toString=function(){
return "[VisualEditorPopupBinding]";
};
VisualEditorPopupBinding.prototype.configure=function(_1073,_1074,_1075){
var _1076=this.editorBinding.hasSelection();
this.tinyInstance=_1073;
this.tinyEngine=_1074;
this.tinyElement=_1075;
this.hasSelection=_1076;
VisualEditorPopupBinding.superclass.configure.call(this);
};
VisualEditorPopupBinding.prototype.handleCommand=function(cmd,gui,val){
this.editorBinding.blurEditor();
this.editorBinding.handleCommand(cmd,gui?gui:false,val);
};
VisualEditorPopupBinding.prototype._configure=function(){
if(this._isEditorPopupBindingInitialized){
this._configureLinkGroup();
this._configureInsertGroup();
this._configureTableGroup();
this._configureRenderingGroup();
this._configureFieldGroup();
this._configureImageGroup();
this._configureSpellCheckGroup();
}
};
VisualEditorPopupBinding.prototype._configureLinkGroup=function(){
var _107a=false;
if(this.hasSelection){
_107a=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_107a=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_107a=true;
}
}
}
}
if(_107a){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _107b=this.getMenuItemForCommand("compositeInsertLink");
var _107c=this.getMenuItemForCommand("unlink");
var _107d=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _107e=this.editorBinding.getButtonForCommand("unlink");
_107c.setDisabled(_107e.isDisabled);
if(_107c.isDisabled){
_107b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_107b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _107f=this.editorBinding.embedableFieldConfiguration;
var item=this.getMenuItemForCommand("compositeInsertFieldParent");
var doc=this.bindingDocument;
if(item){
item.dispose();
}
item=MenuItemBinding.newInstance(doc);
item.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelField}");
item.image="${icon:fields}";
item.imageDisabled="${icon:fields-disabled}";
item.setProperty("cmd","compositeInsertFieldParent");
if(_107f){
var _1082=_107f.getGroupNames();
if(_1082.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1082.each(function(_1086){
var _1087=_107f.getFieldNames(_1086);
_1087.each(function(_1088){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1088);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1086+":"+_1088);
group.add(i);
});
});
item.add(popup);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _108a=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _108b=null;
var _108c=null;
if(_108a){
if(_108a.nodeName=="TD"){
_108b=_108a.getAttribute("colspan");
_108c=_108a.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_108b=="1"&&_108c=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_108a){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
if(VisualEditorBinding.isFunctionElement(this.tinyElement)){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
if(VisualEditorBinding.isFieldElement(this.tinyElement)){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(VisualEditorBinding.isImageElement(this.tinyElement)){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._configureSpellCheckGroup=function(){
if(Client.isFirefox){
this._showMenuGroups("spellcheck");
}else{
this._hideMenuGroups("spellcheck");
}
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_108d){
var _108e=VisualEditorFormattingConfiguration._configurations;
if(!_108e.has(_108d)){
_108e.set(_108d,new VisualEditorFormattingConfiguration());
}
return _108e.get(_108d);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1090){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1091){
var _1092=null;
var _1093=VisualEditorFieldGroupConfiguration._configurations;
if(!_1093.has(_1091)){
_1093.set(_1091,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1091)));
}
return _1093.get(_1091);
};
function VisualEditorFieldGroupConfiguration(_1094){
var _1095=new Map();
new List(_1094).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1095.set(group.GroupName,map);
});
this._groups=_1095;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1099){
return this._groups.get(_1099).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_109a,_109b){
return this._groups.get(_109a).get(_109b).xhtml;
};
VisualEditorFieldGroupConfiguration.prototype.getStructuredMarkup=function(name){
return this._groups.get(groupname).get(fieldname).xml;
};
VisualMultiEditorBinding.prototype=new VisualEditorBinding;
VisualMultiEditorBinding.prototype.constructor=VisualMultiEditorBinding;
VisualMultiEditorBinding.superclass=VisualEditorBinding.prototype;
function VisualMultiEditorBinding(){
this.logger=SystemLogger.getLogger("VisualMultiEditorBinding");
this._hasPlaceHolders=false;
this._textareaname=null;
this._textareas=null;
this._xhtmls=null;
return this;
}
VisualMultiEditorBinding.prototype.toString=function(){
return "[VisualMultiEditorBinding]";
};
VisualMultiEditorBinding.prototype._maybeShowEditor=function(){
if(this._hasPlaceHolders){
VisualMultiEditorBinding.superclass._maybeShowEditor.call(this);
}
};
VisualMultiEditorBinding.prototype._setup=function(){
this._xhtmls=new Map();
var _109d=this.getDescendantElementsByLocalName("textarea");
while(_109d.hasNext()){
var _109e=_109d.getNext();
if(_109e.getAttribute("selected")=="true"){
this._startContent=_109e.value;
this._textareaname=_109e.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10a0=this.getContentWindow().bindingMap.templatetree;
_10a0.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10a1){
var _10a2=_10a0.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10a2.textareaname);
_10a1.consume();
}});
_10a0.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a3){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a4=this.getContentWindow().bindingMap.toolsplitter;
_10a4.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a5=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a5.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a5);
if(this._isFinalized){
this._pageBinding.showEditor(true);
}
}else{
this._hasPlaceHolders=false;
this._noPlaceHolders();
if(this._isFinalized){
this._pageBinding.showEditor(false);
}
}
};
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a6){
this._textareas=new Map();
while(_10a6.hasNext()){
var _10a7=_10a6.getNext();
var _10a8=_10a7.getAttribute("placeholderid");
this._textareas.set(_10a8,{placeholderid:_10a8,placeholdername:_10a7.getAttribute("placeholdername"),placeholdermarkup:_10a7.value,textareaelement:_10a7,isSelected:_10a7.getAttribute("selected")=="true"});
}
var _10a9=new Map();
this._textareas.each(function(name,_10ab){
var _10ac=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10ac.setLabel(_10ab.placeholdername);
_10ac.setImage("${icon:placeholder}");
_10ac.setProperty("placeholder",true);
_10ac.textareaname=name;
_10a9.set(_10ab.placeholdername,_10ac);
if(_10ab.isSelected){
selected=_10ac;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10ad=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10ad.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10ae=this.getContentWindow().bindingMap.templatetree;
var _10af=_10ae.add(TreeNodeBinding.newInstance(_10ae.bindingDocument));
_10af.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10af.setImage("${icon:warning}");
_10af.attach();
var _10b0=this.getContentWindow().bindingMap.statusbar;
_10b0.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10b2=this._textareas.get(name);
var _10b3=_10b2.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b3));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b4){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b4;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b5=this.getContentWindow().bindingMap.statusbar;
_10b5.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b4);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10b8=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10b8;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10b9=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10b9=this._xhtmls.get(this._textareaname);
if(_10b9==null){
_10b9=VisualEditorBinding.XHTML;
}
}
return _10b9;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10bb){
_10bb.textareaelement.value=_10bb.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10bc,_10bd,_10be){
var _10bf=_10bc.getElementsByTagName("div").item(0);
var _10c0=_10bd.getElementsByTagName("div").item(0);
var _10c1=new List(_10bf.getElementsByTagName("textarea"));
var _10c2=new List(_10c0.getElementsByTagName("textarea"));
if(_10c1.getLength()!=_10c2.getLength()){
_10be=true;
}else{
var index=0;
_10c1.each(function(_10c4,index){
var _10c6=_10c2.get(index);
var newid=_10c4.getAttribute("placeholderid");
var oldid=_10c6.getAttribute("placeholderid");
var _10c9=_10c4.getAttribute("placeholdername");
var _10ca=_10c6.getAttribute("placeholdername");
if(newid!=oldid||_10c9!=_10ca){
_10be=true;
}
return !_10be;
});
}
if(_10be){
var html=null;
if(_10bf.innerHTML!=null){
html=_10bf.innerHTML;
}else{
html=DOMSerializer.serialize(_10bf);
html=html.substring(html.indexOf(">")+1,html.length);
html=html.substring(0,html.lastIndexOf("<"));
}
var div=this.bindingElement.getElementsByTagName("div").item(0);
if(div!=null){
div.innerHTML=html;
}
this._updatePlaceHolders();
}
return true;
};
VisualMultiTemplateEditorBinding.prototype=new VisualMultiEditorBinding;
VisualMultiTemplateEditorBinding.prototype.constructor=VisualMultiTemplateEditorBinding;
VisualMultiTemplateEditorBinding.superclass=VisualMultiEditorBinding.prototype;
function VisualMultiTemplateEditorBinding(){
this.logger=SystemLogger.getLogger("VisualMultiTemplateEditorBinding");
this._oldtextareas=null;
this._pageId=null;
this._templatePreview=null;
return this;
}
VisualMultiTemplateEditorBinding.prototype.toString=function(){
return "[VisualMultiTemplateEditorBinding]";
};
VisualMultiTemplateEditorBinding.prototype.onBindingAttach=function(){
VisualMultiTemplateEditorBinding.superclass.onBindingAttach.call(this);
this._oldtextareas=new Map();
if(this.getProperty("pageid")){
this._pageId=this.getProperty("pageid");
}
};
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10cd){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10cd);
if(this.bindingElement.offsetWidth>1000){
this.getContentWindow().bindingMap.visualeditorsplitbox.setLayout("4:1");
}
var self=this;
this.getContentWindow().bindingMap.visualeditorsplitbox.addActionListener(SplitterBinding.ACTION_DRAGGED,{handleAction:function(){
self.handleCommand("CompositeUpdateLayout",false,null);
}});
};
VisualMultiTemplateEditorBinding.prototype._initialize=function(){
var self=this;
var _10d0=this.getDescendantBindingByLocalName("selector");
_10d0.attach();
this._populateTemplateSelector();
var _10d1=this.getContentWindow().bindingMap.templateselector;
_10d1.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10d2=this.getDescendantBindingByLocalName("selector");
var _10d3=this.getContentWindow().bindingMap.templateselector;
_10d2.selections.each(function(_10d4){
_10d4.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d3.populateFromList(_10d2.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d5=this.getDescendantBindingByLocalName("selector");
var _10d6=this.getContentWindow().bindingMap.templateselector;
_10d5.selectByValue(_10d6.getValue());
_10d5.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10d7){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10dc,_10dd){
var _10de=_10dd;
if(old.has(_10dc)){
_10de=old.get(_10dc).placeholdermarkup;
}
return _10de;
}
while(_10d7.hasNext()){
var _10df=_10d7.getNext();
var _10e0=_10df.getAttribute("placeholderid");
this._textareas.set(_10e0,{placeholderid:_10e0,placeholdername:_10df.getAttribute("placeholdername"),placeholdermarkup:compute(_10e0,_10df.value),textareaelement:_10df,isSelected:_10df.getAttribute("selected")=="true"});
}
var _10e1=null;
var _10e2=this.getContentWindow().bindingMap.templatetree;
var _10e3=new Map();
this._textareas.each(function(name,_10e5){
var _10e6=_10e2.add(TreeNodeBinding.newInstance(_10e2.bindingDocument));
_10e6.setLabel(_10e5.placeholdername);
_10e6.setImage("${icon:placeholder}");
_10e6.setProperty("placeholder",true);
_10e6.textareaname=name;
_10e3.set(_10e5.placeholdername,_10e6);
if(_10e5.isSelected){
_10e1=_10e6;
}
});
_10e2.attachRecursive();
if(_10e1!=null){
var _10e7=true;
if(this._oldtextareas.hasEntries()){
_10e7=false;
var map=new Map();
this._textareas.each(function(id,_10ea){
map.set(_10ea.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10e7=true;
}
}
if(_10e7){
var _10eb=this._textareas.get(_10e1.textareaname);
this._textareaname=_10e1.textareaname;
this._placeholdername=_10eb.placeholdername;
this._setContentFromPlaceHolder(_10e1.textareaname);
_10e1.focus();
}else{
var _10ec=_10e3.get(this._placeholdername);
this._textareaname=_10ec.textareaname;
_10ec.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10ef){
var _10f0=null;
if(Client.isWebKit||Client.isExplorer){
_10f0=node.getElementsByTagName(_10ef);
}else{
_10f0=node.getElementsByTagName("ui:"+_10ef);
}
return _10f0;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10f1,_10f2){
var _10f3=this._getElementsByTagName(_10f1,"selector").item(0);
var _10f4=this._getElementsByTagName(_10f2,"selector").item(0);
var _10f5=false;
var _10f6=false;
if(_10f3!=null&&_10f4!=null){
var _10f7=new List(this._getElementsByTagName(_10f3,"selection"));
var _10f8=new List(this._getElementsByTagName(_10f4,"selection"));
if(_10f7.getLength()!=_10f8.getLength()){
_10f5=true;
_10f6=true;
}else{
_10f7.each(function(_10f9,index){
var _10fb=_10f9.getAttribute("value");
var _10fc=_10f8.get(index).getAttribute("value");
if(_10fb!=_10fc){
_10f5=true;
}
return !_10f5;
});
_10f7.each(function(_10fd,index){
var _10ff=_10fd.getAttribute("selected");
var _1100=_10f8.get(index).getAttribute("selected");
if(_10ff!=_1100){
_10f6=true;
}
return !_10f6;
});
}
}
if(_10f5){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f3);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_10f6){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10f1,_10f2,_10f6);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_1102){
var _1103=null;
if(_1102==undefined){
_1102=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1105){
if(_1105.PlaceholderId==_1102){
_1103=_1105.ClientRectangle.Width;
return false;
}
});
}
return _1103;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1107=this._pageId;
var _1108=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1107,_1108,function(_110a){
self._templatePreview=_110a;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_110b){
var _110c=this._pageId;
var _110d=this._textareaname;
var _110e=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_110b,_110c,_110e,_110d,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1110){
var _1111=this._pageId;
var _1112=this._textareaname;
var _1113=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1110,_1111,_1113,_1112,width);
};
CodeMirrorEditorPopupBinding.prototype=new EditorPopupBinding;
CodeMirrorEditorPopupBinding.prototype.constructor=CodeMirrorEditorPopupBinding;
CodeMirrorEditorPopupBinding.superclass=EditorPopupBinding.prototype;
CodeMirrorEditorPopupBinding.CONTENT_TEMPLATE="sourceeditor/popup.xml";
function CodeMirrorEditorPopupBinding(){
this.logger=SystemLogger.getLogger("CodeMirrorEditorPopupBinding");
this._editorBinding=null;
this._codePressFrame=null;
this._codePressEngine=null;
}
CodeMirrorEditorPopupBinding.prototype.toString=function(){
return "[CodeMirrorEditorPopupBinding]";
};
CodeMirrorEditorPopupBinding.prototype.configure=function(_1115,frame,_1117){
this._editorBinding=_1115;
this._codePressFrame=frame;
this._codePressEngine=_1117;
WysiwygEditorPopupBinding.superclass.configure.call(this);
};
CodeMirrorEditorPopupBinding.prototype._configure=function(){
switch(this._editorBinding.syntax){
case SourceEditorBinding.syntax.XML:
case SourceEditorBinding.syntax.XSL:
case SourceEditorBinding.syntax.HTML:
this._showMenuGroups("xml");
break;
default:
this._hideMenuGroups("xml");
break;
}
};
CodeMirrorEditorPopupBinding.prototype.handleCommand=function(cmd,gui,val){
var win=this._editorBinding.getContentWindow();
var but=null;
switch(cmd){
case "compositeInsert":
but=win.bindingMap.insertbutton;
break;
case "compositeFormat":
but=win.bindingMap.formatbutton;
break;
}
if(but!=null){
but.handleCommand(cmd,gui,val);
}
};
CodeMirrorEditorBinding.prototype=new EditorBinding;
CodeMirrorEditorBinding.prototype.constructor=CodeMirrorEditorBinding;
CodeMirrorEditorBinding.superclass=EditorBinding.prototype;
CodeMirrorEditorBinding.ACTION_INITIALIZED="codemirroreditor initialized";
CodeMirrorEditorBinding.syntax={TEXT:"text",XML:"xml",XSL:"xsl",HTML:"html",CSS:"css",JAVASCRIPT:"js",CSHARP:"cs",CSHTML:"cshtml",ASPX:"aspx",SQL:"sql",SASS:"sass"};
function CodeMirrorEditorBinding(){
this.logger=SystemLogger.getLogger("CodeMirrorEditorBinding");
this.action_initialized=CodeMirrorEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/codemirroreditor/codemirroreditor.aspx";
this._editorWindowBinding=null;
this._codemirrorWindow=null;
this._codemirrorEditor=null;
this._codemirrorWrapperElement=null;
this.syntax=new String(CodeMirrorEditorBinding.syntax.TEXT);
this._isPlainEditMode=false;
this.isFocusable=true;
this._isEmbedded=false;
this._hasStrictValidation=false;
this._strictSave=true;
this._validator=null;
this._startContent="";
return this;
}
CodeMirrorEditorBinding.prototype.toString=function(){
return "[CodeMirrorEditorBinding]";
};
CodeMirrorEditorBinding.prototype.onBindingRegister=function(){
CodeMirrorEditorBinding.superclass.onBindingRegister.call(this);
StringBundle.getString("Composite.Web.SourceEditor","Preload.Key");
};
CodeMirrorEditorBinding.prototype.onBindingAttach=function(){
this.subscribe(BroadcastMessages.CODEMIRROR_LOADED);
if(this.getProperty("embedded")==true){
this._isEmbedded=true;
}
var _111d=this.getProperty("validate");
if(_111d==true){
this._hasStrictValidation=true;
}
var _111e=this.getProperty("strictsave");
if(_111e===false){
this._strictSave=false;
}
var _111f=this.getProperty("validator");
if(_111f!=null){
this._validator=_111f;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1120,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1120,arg);
switch(_1120){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1122=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1122!=null){
var _1123=_1122.getContentWindow();
if(arg.broadcastWindow==_1123){
this._codemirrorWindow=_1123;
this._codemirrorEditor=arg.codemirrorEditor;
this._codemirrorWrapperElement=arg.codemirrorEditor.getWrapperElement();
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
this._codemirrorEditor.setOption("mode","application/xml");
break;
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
this._codemirrorEditor.setOption("mode","text/html");
break;
case CodeMirrorEditorBinding.syntax.CSS:
this._codemirrorEditor.setOption("mode","text/css");
break;
case CodeMirrorEditorBinding.syntax.CSHARP:
this._codemirrorEditor.setOption("mode","text/x-csharp");
break;
case CodeMirrorEditorBinding.syntax.CSHTML:
this._codemirrorEditor.setOption("mode","application/x-cshtml");
break;
case CodeMirrorEditorBinding.syntax.JAVASCRIPT:
this._codemirrorEditor.setOption("mode","text/javascript");
break;
case CodeMirrorEditorBinding.syntax.ASPX:
this._codemirrorEditor.setOption("mode","application/x-aspx");
break;
case CodeMirrorEditorBinding.syntax.SASS:
this._codemirrorEditor.setOption("mode","text/x-sass");
break;
case CodeMirrorEditorBinding.syntax.SQL:
this._codemirrorEditor.setOption("mode","");
break;
case CodeMirrorEditorBinding.syntax.TEXT:
this._codemirrorEditor.setOption("mode","");
break;
}
this.initializeEditorComponents(_1122);
var self=this;
this._codemirrorEditor.on("change",function(e){
self.checkForDirty();
});
this._codemirrorEditor.on("focus",function(e){
self._activateEditor(true);
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_1120);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1127){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1127);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1128){
if(_1128!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1128;
EditorBinding.isActive=_1128;
var _1129=this._codemirrorWindow.standardEventHandler;
if(_1128){
_1129.enableNativeKeys(true);
}else{
_1129.disableNativeKeys();
}
var _112a=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_112a!=null){
if(_1128){
_112a.enable();
}else{
_112a.disable();
}
}
if(_1128){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _112e=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _112e;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_112f){
_112f.initializeSourceEditorComponent(this,this._codemirrorEditor);
};
CodeMirrorEditorBinding.prototype.handleContextMenu=function(e){
};
CodeMirrorEditorBinding.prototype.getEditorPopupBinding=function(){
return top.app.bindingMap.sourcecodeeditorpopup;
};
CodeMirrorEditorBinding.prototype.getEditorWindow=function(){
return this._codemirrorWindow;
};
CodeMirrorEditorBinding.prototype.getEditorDocument=function(){
if(this._codemirrorWrapperElement!=null){
return this._codemirrorWrapperElement.ownerDocument;
}
return null;
};
CodeMirrorEditorBinding.prototype.setContent=function(_1131){
if(!this._isFinalized){
if(_1131!=this._startContent){
this._startContent=_1131;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1131);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1132=this.getContentWindow().bindingMap.editorpage.getContent();
return _1132?_1132:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1133){
if(this._pageBinding!=null){
this._pageBinding.cover(_1133);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1134){
if(_1134!=null&&this.shadowTree.dotnetinput!=null){
var value=_1134.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1136=true;
var _1137=this.getContent();
if(this._validator!=null){
_1136=Validator.validateInformed(_1137,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1138=_1137.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1138!=_1137){
_1137=_1138;
this.setContent(_1138);
}
_1136=XMLParser.isWellFormedDocument(_1137,true,!this._strictSave);
if(_1136==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1136=this._isValidHTML(_1137);
break;
}
}
break;
}
}
return _1136;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _113a=true;
var doc=XMLParser.parse(xml);
var _113c=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_113c.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_113c.add("NamespaceURI");
}
var head=null,body=null;
var _1140=new List(root.childNodes);
while(_1140.hasNext()){
var child=_1140.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_113c.add("MultipleHead");
}
if(body!=null){
_113c.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_113c.add("MultipleBody");
}
body=child;
break;
default:
_113c.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_113c.add("MissingHead");
}
if(body==null){
_113c.add("MissingBody");
}
}
if(_113c.hasEntries()){
_113a=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_113c.getFirst()));
}
return _113a;
};
CodeMirrorEditorBinding.prototype._isValidXSL=function(){
return true;
};
CodeMirrorEditorBinding.prototype.getValue=CodeMirrorEditorBinding.prototype.getContent;
CodeMirrorEditorBinding.prototype.setValue=CodeMirrorEditorBinding.prototype.setContent;
CodeMirrorEditorBinding.prototype.getResult=CodeMirrorEditorBinding.prototype.getContent;
CodeMirrorEditorBinding.prototype.setResult=CodeMirrorEditorBinding.prototype.setContent;
CodeMirrorEditorBinding.prototype.createBookmark=function(){
};
CodeMirrorEditorBinding.prototype.restoreBookmark=function(){
};
CodeMirrorEditorBinding.prototype.hasBookmark=function(){
};
CodeMirrorEditorBinding.prototype.deleteBookmark=function(){
};
CodeMirrorEditorBinding.prototype.getCheckSum=function(){
var _1142=null;
var page=this._pageBinding;
if(page!=null){
_1142=page.getCheckSum();
}
return _1142;
};
ProgressBarBinding.prototype=new Binding;
ProgressBarBinding.prototype.constructor=ProgressBarBinding;
ProgressBarBinding.superclass=Binding.prototype;
ProgressBarBinding.WIDTH=190;
ProgressBarBinding.NOTCH=9;
ProgressBarBinding._bindingInstance=null;
ProgressBarBinding.notch=function(_1144){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1144);
}
};
function ProgressBarBinding(){
this.logger=SystemLogger.getLogger("ProgressBarBinding");
this._cover=null;
return this;
}
ProgressBarBinding.prototype.toString=function(){
return "[ProgressBarBinding]";
};
ProgressBarBinding.prototype.onBindingAttach=function(){
ProgressBarBinding.superclass.onBindingAttach.call(this);
ProgressBarBinding._bindingInstance=this;
this._cover=this.add(CoverBinding.newInstance(this.bindingDocument));
this._cover.setBusy(false);
this._cover.setWidth(ProgressBarBinding.WIDTH);
this.shadowTree.cover=this._cover;
};
ProgressBarBinding.prototype.notch=function(_1146){
_1146=_1146?_1146:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1146);
this._cover.setWidth(width>=0?width:0);
};
StartMenuItemBinding.prototype=new MenuItemBinding;
StartMenuItemBinding.prototype.constructor=StartMenuItemBinding;
StartMenuItemBinding.superclass=MenuItemBinding.prototype;
function StartMenuItemBinding(){
this.logger=SystemLogger.getLogger("StartMenuItemBinding");
this.type=MenuItemBinding.TYPE_CHECKBOX;
}
StartMenuItemBinding.prototype.toString=function(){
return "[StartMenuItemBinding]";
};
StartMenuItemBinding.prototype.onBindingRegister=function(){
StartMenuItemBinding.superclass.onBindingRegister.call(this);
this.subscribe(BroadcastMessages.COMPOSITE_START);
this.subscribe(BroadcastMessages.COMPOSITE_STOP);
};
StartMenuItemBinding.prototype.handleBroadcast=function(_1148,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1148,arg);
switch(_1148){
case BroadcastMessages.COMPOSITE_START:
if(!this.isChecked){
this.check(true);
}
break;
case BroadcastMessages.COMPOSITE_STOP:
if(this.isChecked){
this.uncheck(true);
}
break;
}
};
StartMenuItemBinding.prototype.setChecked=function(_114a,_114b){
StartMenuItemBinding.superclass.setChecked.call(this,_114a,_114b);
if(!_114b){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_114c){
var _114d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_114c);
UserInterface.registerBinding(_114d,StartMenuItemBinding);
return UserInterface.getBinding(_114d);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1150,_1151){
var _1152=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1151,true)==true){
if(_1150!="*"){
_1150=KeySetBinding._sanitizeKeyModifiers(_1150);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1152[doc]){
_1152[doc]={};
}
if(!_1152[doc][code]){
_1152[doc][code]={};
}
_1152[doc][code][_1150]=_1151;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1156=false;
var code=e.keyCode;
var _1158=KeySetBinding.keyEventHandlers;
if(_1158[doc]&&_1158[doc][code]){
var _1159="[default]";
_1159+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1159+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1159+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1159+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _115a=_1158[doc][code][_1159];
if(_115a==null){
_115a=_1158[doc][code]["*"];
}
if(_115a!=null){
_115a.handleKeyEvent(e);
_1156=true;
}
}
return _1156;
};
KeySetBinding._sanitizeKeyModifiers=function(_115b){
var _115c="[default]";
var mods={};
if(_115b){
new List(_115b.split(" ")).each(function(_115e){
mods[_115e]=true;
});
function check(_115f){
if(mods[_115f]){
_115c+=" "+_115f;
}
}
check("shift");
check("control");
}
return _115c;
};
function KeySetBinding(){
this.logger=SystemLogger.getLogger("KeySetBinding");
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
return this;
}
KeySetBinding.prototype.toString=function(){
return "[KeySetBinding]";
};
KeySetBinding.prototype.onBindingAttach=function(){
KeySetBinding.superclass.onBindingAttach.call(this);
var self=this;
var keys=new List(DOMUtil.getElementsByTagName(this.bindingElement,"key"));
keys.each(function(key){
var _1163=key.getAttribute("oncommand");
var _1164=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1164){
DOMEvents.preventDefault(e);
}
var _1166=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1163,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1167){
if(_1167 instanceof CursorBinding){
_1167.setOpacity(0);
_1167.show();
new Animation({modifier:9,onstep:function(_1168){
_1167.setOpacity(Math.sin(_1168*Math.PI/180));
},onstop:function(){
_1167.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1169){
if(_1169 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_116a){
_1169.setOpacity(Math.cos(_116a*Math.PI/180));
},onstop:function(){
_1169.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_116b,_116c,_116d){
if(_116b instanceof CursorBinding){
_116d.x-=16;
_116d.y-=16;
new Animation({modifier:3,onstep:function(_116e){
var tal=Math.sin(_116e*Math.PI/180);
_116b.setPosition(new Point(((1-tal)*_116c.x)+((0+tal)*_116d.x),((1-tal)*_116c.y)+((0+tal)*_116d.y)));
},onstop:function(){
CursorBinding.fadeOut(_116b);
}}).play();
}
};
function CursorBinding(){
this.logger=SystemLogger.getLogger("CursorBinding");
this._labelBinding=null;
this._opacity=1;
this.isAccepting=true;
return this;
}
CursorBinding.prototype.toString=function(){
return "[CursorBinding]";
};
CursorBinding.prototype.onBindingAttach=function(){
CursorBinding.superclass.onBindingAttach.call(this);
this._labelBinding=this.add(LabelBinding.newInstance(this.bindingDocument));
var image=this.getProperty("image");
if(image!=null){
this.setImage(image);
}
this._stopIndicatorBinding=this.add(LabelBinding.newInstance(this.bindingDocument));
this._stopIndicatorBinding.attachClassName("indicator");
this._stopIndicatorBinding.setImage("${icon:cancel}");
this.hide();
this._stopIndicatorBinding.hide();
};
CursorBinding.prototype.setImage=function(url){
this._labelBinding.setImage(url);
};
CursorBinding.prototype.showAcceptance=function(){
this.isAccepting=true;
if(Client.isMozilla){
this._stopIndicatorBinding.hide();
}else{
var self=this;
setTimeout(function(){
if(self.isAccepting){
self._stopIndicatorBinding.hide();
}
},0);
}
};
CursorBinding.prototype.hideAcceptance=function(){
this.isAccepting=false;
if(Client.isMozilla){
this._stopIndicatorBinding.show();
}else{
var self=this;
setTimeout(function(){
if(!self.isAccepting){
self._stopIndicatorBinding.show();
}
},0);
}
};
CursorBinding.prototype.show=function(){
CursorBinding.superclass.show.call(this);
};
CursorBinding.prototype.setOpacity=function(_1174){
this.bindingElement.style.opacity=new String(_1174);
this._opacity=_1174;
};
CursorBinding.prototype.getOpacity=function(){
return this._opacity;
};
CursorBinding.prototype.setPosition=function(pos){
this.bindingElement.style.left=pos.x+"px";
this.bindingElement.style.top=pos.y+"px";
};
CursorBinding.prototype.getPosition=function(){
return new Point(this.bindingElement.offsetLeft,this.bindingElement.offsetTop);
};
CursorBinding.prototype.fadeIn=function(){
CursorBinding.fadeIn(this);
};
CursorBinding.prototype.fadeOut=function(){
CursorBinding.fadeOut(this);
};
CoverBinding.prototype=new Binding;
CoverBinding.prototype.constructor=CoverBinding;
CoverBinding.superclass=Binding.prototype;
CoverBinding.CLASSNAME_TRANSPARENT="transparent";
CoverBinding.fadeOut=function(cover){
function setOpacity(_1177){
cover.bindingElement.style.opacity=new String(_1177);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1178){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1178*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_117a){
cover.bindingElement.style.MozOpacity=new String(_117a);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_117b){
if(Binding.exists(cover)){
setOpacity(Math.sin(_117b*Math.PI/180));
}
},onstop:function(){
setOpacity(1);
}}).play();
}
};
function CoverBinding(){
this.logger=SystemLogger.getLogger("CoverBinding");
this._isBusy=true;
this._isTransparent=false;
this.lastTouch=null;
this._position=null;
return this;
}
CoverBinding.prototype.toString=function(){
return "[CoverBinding]";
};
CoverBinding.prototype.onBindingRegister=function(){
CoverBinding.superclass.onBindingRegister.call(this);
if(this.getProperty("blockevents")){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
this.addEventListener(DOMEvents.MOUSEMOVE);
this.addEventListener(DOMEvents.CLICK);
this.addEventListener(DOMEvents.DOUBLECLICK);
}
if(this.getProperty("doubletouchunlock")){
this.addEventListener(DOMEvents.TOUCHEND);
}
if(this.getProperty("transparent")==true){
this.setTransparent(true);
}
if(this.getProperty("busy")==false){
this._isBusy=false;
}
if(this._isBusy){
this.bindingElement.style.cursor="wait";
}
};
CoverBinding.prototype.show=function(){
CoverBinding.superclass.show.call(this);
if(this._isBusy&&this.isVisible){
this.addEventListener(DOMEvents.MOUSEMOVE);
}
};
CoverBinding.prototype.hide=function(){
CoverBinding.superclass.hide.call(this);
if(this._isBusy&&!this.isVisible&&this._position){
UncoverBinding.uncover(this._position);
this.removeEventListener(DOMEvents.MOUSEMOVE);
}
};
CoverBinding.prototype.handleEvent=function(e){
CoverBinding.superclass.handleEvent.call(this,e);
DOMEvents.stopPropagation(e);
switch(e.type){
case DOMEvents.MOUSEMOVE:
this._position=DOMUtil.getUniversalMousePosition(e);
break;
case DOMEvents.TOUCHEND:
if(this.lastTouch&&Date.now()-this.lastTouch<300){
if(Application.isLocked){
Application.unlock(Application,true);
}
}
this.lastTouch=Date.now();
break;
}
};
CoverBinding.prototype.setBusy=function(_117d){
if(_117d!=this._isBusy){
if(_117d){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_117d;
}
};
CoverBinding.prototype.setTransparent=function(_117e){
if(_117e!=this._isTransparent){
if(_117e){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_117e;
}
};
CoverBinding.prototype.setWidth=function(width){
if(width>=0){
this.bindingElement.style.width=new String(width+"px");
}
};
CoverBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
CoverBinding.prototype.setHeight=function(_1180){
if(_1180>=0){
this.bindingElement.style.height=new String(_1180+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1181){
var _1182=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1181);
return UserInterface.registerBinding(_1182,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1184=UncoverBinding._bindingInstance;
if(Binding.exists(_1184)){
_1184.setPosition(pos);
}
};
function UncoverBinding(){
this.logger=SystemLogger.getLogger("UncoverBinding");
UncoverBinding._bindingInstance=this;
}
UncoverBinding.prototype.toString=function(){
return "[UncoverBinding]";
};
UncoverBinding.prototype.setPosition=function(pos){
this.bindingElement.style.display="block";
var dim=this.boxObject.getDimension();
pos.x-=0.5*dim.w;
pos.y-=0.5*dim.h;
pos.x=pos.x<0?0:pos.x;
pos.y=pos.y<0?0:pos.y;
this.bindingElement.style.left=String(pos.x)+"px";
this.bindingElement.style.top=String(pos.y)+"px";
this.bindingElement.style.cursor="wait";
var self=this;
setTimeout(function(){
self.bindingElement.style.cursor="default";
self.bindingElement.style.display="none";
},0);
};
TheatreBinding.prototype=new Binding;
TheatreBinding.prototype.constructor=TheatreBinding;
TheatreBinding.superclass=Binding.prototype;
TheatreBinding.CLASSNAME_INITIALIZED="initialized";
function TheatreBinding(){
this._isPlaying=false;
this._isFading=false;
this._canvas=null;
return this;
}
TheatreBinding.prototype.toString=function(){
return "[TheatreBinding]";
};
TheatreBinding.prototype.onBindingAttach=function(){
TheatreBinding.superclass.onBindingAttach.call(this);
this._canvas=document.createElement("canvas");
this.bindingElement.appendChild(this._canvas);
};
TheatreBinding.prototype.play=function(_1188){
this._isFading=_1188==true;
if(!this._isPlaying){
Application.lock(this);
this.show();
this._isPlaying=true;
if(this._isFading){
this._fade();
}
}
};
TheatreBinding.prototype._fade=function(){
var _1189=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1189.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1189.clearRect(0,0,300,150);
_1189.fillRect(0,0,300,150);
alpha+=0.002;
}else{
top.clearInterval(TheatreBinding._interval);
TheatreBinding._interval=null;
}
},50);
};
TheatreBinding.prototype.stop=function(){
if(this._isPlaying){
if(this._isFading){
if(TheatreBinding._interval!=null){
top.clearInterval(TheatreBinding._interval);
}
var _118b=this._canvas.getContext("2d");
_118b.clearRect(0,0,300,150);
}
Application.unlock(this,true);
this.hide();
this._isPlaying=false;
}
};
SourceCodeViewerBinding.prototype=new WindowBinding;
SourceCodeViewerBinding.prototype.constructor=SourceCodeViewerBinding;
SourceCodeViewerBinding.superclass=WindowBinding.prototype;
SourceCodeViewerBinding.ACTION_INITIALIZED="sourcecodeviewer initialized";
SourceCodeViewerBinding.URL_DEFAULT="${root}/content/misc/viewers/sourcecodeviewer/viewsourcecontent.aspx";
SourceCodeViewerBinding.syntax={XML:"xml"};
SourceCodeViewerBinding.stylesheets={"xml":Resolver.resolve("${root}/transformations/viewsource-xml.xsl")};
function SourceCodeViewerBinding(){
this.logger=SystemLogger.getLogger("SourceCodeViewerBinding");
this._syntax=null;
this._transformer=null;
}
SourceCodeViewerBinding.prototype.toString=function(){
return "[SourceCodeViewerBinding]";
};
SourceCodeViewerBinding.prototype.onBindingAttach=function(){
this._syntax=this.getProperty("syntax");
switch(this._syntax){
case SourceCodeViewerBinding.syntax.XML:
var _118c=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_118c);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _118d=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_118d){
this._startcontent=_118d.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_118e){
SourceCodeViewerBinding.superclass.handleAction.call(this,_118e);
switch(_118e.type){
case WindowBinding.ACTION_ONLOAD:
if(_118e.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_118e.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_118e);
};
SourceCodeViewerBinding.prototype.view=function(arg){
switch(this._syntax){
case SourceCodeViewerBinding.syntax.XML:
this._viewXML(arg);
break;
}
};
SourceCodeViewerBinding.prototype._viewXML=function(arg){
var doc=null;
if(arg){
if(typeof arg==Types.STRING){
doc=XMLParser.parse(arg);
}else{
if(arg.nodeType&&arg.nodeType==Node.DOCUMENT_NODE){
doc=object;
}
}
}
if(doc){
var _1192=this._transformer.transformToString(doc);
this._inject(_1192);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1195){
this.getContentDocument().body.innerHTML=_1195;
};
PersistanceBinding.prototype=new Binding;
PersistanceBinding.prototype.constructor=PersistanceBinding;
PersistanceBinding.superclass=Binding.prototype;
PersistanceBinding.USERDATAKEY="persistance";
PersistanceBinding.GLOBALSTOREKEY=document.location.host;
PersistanceBinding.TEMPLATE="storagetemplates/persistance.xml";
function PersistanceBinding(){
this.logger=SystemLogger.getLogger("PersistanceBinding");
this._resolver=null;
return this;
}
PersistanceBinding.prototype.toString=function(){
return "[PersistanceBinding]";
};
PersistanceBinding.prototype.getPersistanceMap=function(){
var doc=null;
var map=null;
if(Client.isExplorer==true){
doc=this._getDocExplorer();
}else{
doc=this._getDocMozilla();
}
if(doc!=null){
this._document=doc;
this.logger.fine(DOMSerializer.serialize(doc,true));
map=this._getPersistanceMap(this._document);
}
return map;
};
PersistanceBinding.prototype.persist=function(map){
var doc=this._getPersistanceDoc(map);
alert(DOMSerializer.serialize(doc,true));
if(Client.isExplorer==true){
this._persistDocExplorer(doc);
}else{
this._persistDocMozilla(doc);
}
};
PersistanceBinding.prototype._getPersistanceMap=function(doc){
var map={};
if(this._resolver==null){
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"p":Constants.NS_PERSISTANCE});
}
var list=this._resolver.resolveAll("p:persist",doc.documentElement);
while(list.hasNext()){
var _119d=list.getNext();
var id=_119d.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_119d);
while(atts.hasNext()){
var att=atts.getNext();
var name=att.getAttribute("name");
var value=att.getAttribute("value");
map[id][name]=value;
}
}
return map;
};
PersistanceBinding.prototype._getPersistanceDoc=function(map){
var doc=this._document;
var elm=doc.documentElement;
elm.setAttribute("version",Installation.versionString);
while(elm.hasChildNodes()){
elm.removeChild(elm.lastChild);
}
for(var id in map){
var _11a7=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a7.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a7.appendChild(att);
}
elm.appendChild(_11a7);
}
return doc;
};
PersistanceBinding.prototype._getDocExplorer=function(){
this.bindingElement.load(PersistanceBinding.USERDATAKEY);
var doc=this.bindingElement.XMLDocument;
if(doc.documentElement.namespaceURI==""){
var file=PersistanceBinding.TEMPLATE;
var text=Templates.getTemplateElementText(file);
doc.loadXML(text);
var elm=doc.documentElement;
while(elm.hasChildNodes()){
elm.removeChild(elm.firstChild);
}
}
return doc;
};
PersistanceBinding.prototype._persistDocExplorer=function(doc){
var text=DOMSerializer.serialize(doc,true);
this.bindingElement.XMLDocument.loadXML(text);
this.bindingElement.save(PersistanceBinding.USERDATAKEY);
};
PersistanceBinding.prototype._getDocMozilla=function(){
delete window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
var doc=null;
var _11b1=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11b1){
doc=XMLParser.parse(_11b1);
}else{
var file=PersistanceBinding.TEMPLATE;
doc=Templates.getTemplateDocument(file);
var elm=doc.documentElement;
while(elm.hasChildNodes()){
elm.removeChild(elm.lastChild);
}
}
return doc;
};
PersistanceBinding.prototype._persistDocMozilla=function(doc){
var _11b5=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11b5;
};
LocalizationSelectorBinding.prototype=new MenuBinding;
LocalizationSelectorBinding.prototype.constructor=LocalizationSelectorBinding;
LocalizationSelectorBinding.superclass=MenuBinding.prototype;
function LocalizationSelectorBinding(){
this.logger=SystemLogger.getLogger("LocalizationSelectorBinding");
return this;
}
LocalizationSelectorBinding.prototype.toString=function(){
return "[LocalizationSelectorBinding]";
};
LocalizationSelectorBinding.prototype.onBindingAttach=function(){
LocalizationSelectorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.UPDATE_LANGUAGES);
this.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED);
this._populateFromLanguages(Localization.languages);
this.addActionListener(MenuItemBinding.ACTION_COMMAND);
};
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b6,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b6,arg);
switch(_11b6){
case BroadcastMessages.TOLANGUAGE_UPDATED:
ExplorerBinding.restoreFocuseNodes();
break;
case BroadcastMessages.UPDATE_LANGUAGES:
this._populateFromLanguages(arg);
break;
case BroadcastMessages.SAVE_ALL_DONE:
this.unsubscribe(BroadcastMessages.SAVE_ALL_DONE);
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
this._invokeAction();
break;
}
};
LocalizationSelectorBinding.prototype.handleAction=function(_11b8){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11b8);
switch(_11b8.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11b8.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11ba=new List();
list.each(function(lang){
_11ba.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11ba);
this.bindingElement.style.display="block";
}else{
this.bindingElement.style.display="none";
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11be=this.getDescendantBindingByLocalName("menugroup");
_11be.detachRecursive();
_11be.bindingElement.innerHTML="";
if(list.hasEntries()){
while(list.hasNext()){
var _11bf=list.getNext();
if(_11bf.isSelected){
this.setLabel(_11bf.label);
}
var _11c0=MenuItemBinding.newInstance(this.bindingDocument);
_11c0.imageProfile=_11bf.imageProfile;
_11c0.setLabel(_11bf.label);
if(_11bf.tooltip!=null){
_11c0.setToolTip(_11bf.tooltip);
}
_11c0.selectionValue=_11bf.value;
_11be.add(_11c0);
_11c0.attach();
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
LocalizationSelectorBinding.prototype.onValueChange=function(token){
ExplorerBinding.saveFocusedNodes();
var self=this;
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11c3){
switch(_11c3){
case Dialog.RESPONSE_ACCEPT:
if(Application.hasDirtyDockTabs()){
self.subscribe(BroadcastMessages.SAVE_ALL_DONE);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL);
}else{
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
self._invokeAction(token);
}
break;
case Dialog.RESPONSE_CANCEL:
break;
}
}});
};
LocalizationSelectorBinding.prototype._invokeAction=function(token){
var root=SystemNode.taggedNodes.get("Root");
var _11c6=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11c6,root);
};
ResponseBinding.prototype=new Binding;
ResponseBinding.prototype.constructor=ResponseBinding;
ResponseBinding.superclass=Binding.prototype;
ResponseBinding.ACTION_SUCCESS="response success";
ResponseBinding.ACTION_OOOOKAY="response ooookay";
ResponseBinding.ACTION_FAILURE="response failure";
function ResponseBinding(){
this.logger=SystemLogger.getLogger("ResponseBinding");
return this;
}
ResponseBinding.prototype.toString=function(){
return "[ResponseBinding]";
};
ResponseBinding.prototype.onBindingAttach=function(){
ResponseBinding.superclass.onBindingAttach.call(this);
this.propertyMethodMap["checksum"]=this._update;
this._update();
};
ResponseBinding.prototype._update=function(){
if(this.getProperty("dirty")===true){
this.dispatchAction(Binding.ACTION_DIRTY);
}
var _11c7=this.getProperty("status");
if(_11c7!=null){
switch(_11c7){
case "success":
this.dispatchAction(ResponseBinding.ACTION_SUCCESS);
break;
case "failure":
this.dispatchAction(ResponseBinding.ACTION_FAILURE);
break;
case "ooookay":
this.dispatchAction(ResponseBinding.ACTION_OOOOKAY);
break;
}
}
var index=this.getProperty("messagequeueindex");
if(index!=null){
if(index>MessageQueue.index){
MessageQueue.update(true);
}
}
};
GenericViewBinding.prototype=new TreeBinding;
GenericViewBinding.prototype.constructor=GenericViewBinding;
GenericViewBinding.superclass=TreeBinding.prototype;
GenericViewBinding.CLASSNAME="generericview";
GenericViewBinding.CLASSNAME_SINGLE="single";
GenericViewBinding.CLASSNAME_ICONSIZE="icons-s-150";
GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE="icons-s-400";
function GenericViewBinding(){
this.logger=SystemLogger.getLogger("GenericViewBinding");
this.perspectiveNode=null;
this._activePosition=SystemAction.activePositions.NavigatorTree;
}
GenericViewBinding.prototype.toString=function(){
return "[GenericViewBinding]";
};
GenericViewBinding.prototype.onBindingRegister=function(){
GenericViewBinding.superclass.onBindingRegister.call(this);
this.addActionListener(TreeNodeBinding.ACTION_COMMAND);
this.addActionListener(TreeNodeBinding.ACTION_OPEN);
this.attachClassName(GenericViewBinding.CLASSNAME);
this.perspectiveNode=StageBinding.perspectiveNode;
};
GenericViewBinding.prototype.handleAction=function(_11c9){
GenericViewBinding.superclass.handleAction.call(this,_11c9);
var _11ca=_11c9.target;
switch(_11c9.type){
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_11c9.consume();
break;
case TreeNodeBinding.ACTION_OPEN:
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_11c9.target.node.getEntityToken());
_11c9.consume();
break;
}
};
GenericViewBinding.prototype.setNode=function(node){
this.empty();
this.detachClassName(GenericViewBinding.CLASSNAME_SINGLE);
this.detachClassName(GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE);
this.detachClassName(GenericViewBinding.CLASSNAME_ICONSIZE);
if(node){
if(node.hasChildren()){
var _11cc=node.getChildren();
while(_11cc.hasEntries()){
var child=_11cc.extractFirst();
this.addNode(child);
this.attachClassName(GenericViewBinding.CLASSNAME_ICONSIZE);
}
}else{
this.attachClassName(GenericViewBinding.CLASSNAME_SINGLE);
this.attachClassName(GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE);
this.addNode(node);
}
}
};
GenericViewBinding.prototype.addNode=function(child){
var _11cf=TreeNodeBinding.newInstance(this.bindingDocument);
_11cf.node=child;
var label=_11cf.node.getLabel();
if(label){
_11cf.setLabel(label);
}
var _11d1=_11cf.node.getImageProfile();
if(_11d1){
_11cf.setImage(_11d1.getDefaultImage());
}
_11cf.isContainer=_11cf.node.hasChildren();
this.add(_11cf);
_11cf.attach();
};
GenericViewBinding.prototype.getPerspectiveHandle=function(){
return this.perspectiveNode.getHandle();
};
GenericViewBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition,actionProfile:this.getCompiledActionProfile(),});
}
};
GenericViewBinding.prototype.focusSingleTreeNodeBinding=function(_11d2){
GenericViewBinding.superclass.focusSingleTreeNodeBinding.call(this,_11d2);
if(_11d2!=null){
this._handleSystemTreeFocus();
}
};
GenericViewBinding.prototype.getCompiledActionProfile=SystemTreeBinding.prototype.getCompiledActionProfile;
GenericViewBinding.newInstance=function(_11d3){
var _11d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_11d3);
var _11d5=UserInterface.registerBinding(_11d4,GenericViewBinding);
_11d5.treeBodyBinding=TreeBodyBinding.newInstance(_11d3);
return _11d5;
};
function UserInterfaceMapping(map){
this.logger=SystemLogger.getLogger("UserInterfaceMapping");
if(Client.isExplorer){
this.map={};
for(var m in map){
this.map[m.replace("ui:","")]=map[m];
}
}else{
this.map=map;
}
}
UserInterfaceMapping.prototype.merge=function(_11d8){
for(var _11d9 in _11d8.map){
this.map[_11d9]=_11d8.getBindingImplementation(_11d9);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11da){
var _11db=null;
var name=_11da.nodeName.toLowerCase();
if(this.map[name]){
_11db=this.map[name];
}
return _11db;
};
var UserInterface=new function(){
var _11dd=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11de=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11dd,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11df=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11e1,impl){
var _11e3=null;
if(!this.hasBinding(_11e1)){
var _11e4=DOMUtil.getParentWindow(_11e1);
if(DOMUtil.getLocalName(_11e1)!="bindingmapping"){
if(!impl&&_11e1.getAttribute("binding")!=null){
var _11e5=_11e1.getAttribute("binding");
impl=_11e4[_11e5];
if(impl==null){
throw "No such binding in scope: "+_11e5;
}
}
if(!impl){
var _11e6=_11e4.DocumentManager;
if(_11e6){
var _11e7=_11e6.customUserInterfaceMapping;
if(_11e7){
impl=_11e7.getBindingImplementation(_11e1);
}
}
}
if(!impl){
impl=_11de.getBindingImplementation(_11e1);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11e3=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11e3){
var key=KeyMaster.getUniqueKey();
_11e1.setAttribute("key",key);
_11e3.key=key;
if(!_11e1.id){
_11e1.id=key;
}
keys[key]={element:_11e1,binding:_11e3};
_11e3.onBindingRegister();
}
}
}
return _11e3;
};
this.unRegisterBinding=function(_11e9){
terminate(_11e9);
};
function terminate(_11ea){
if(Binding.exists(_11ea)==true){
var key=_11ea.key;
Binding.destroy(_11ea);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11ea=null;
}else{
_11df.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11ec){
var _11ed=null;
if(keys[_11ec.key]){
_11ed=keys[_11ec.key].element;
}
return _11ed;
};
this.getBinding=function(_11ee){
var _11ef=null;
if(_11ee&&_11ee.nodeType==Node.ELEMENT_NODE){
try{
var key=_11ee.getAttribute("key");
if(key&&keys[key]){
_11ef=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11ee);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11ef;
};
this.getBindingByKey=function(key){
var _11f2=null;
if(keys[key]){
_11f2=keys[key].binding;
}
return _11f2;
};
this.hasBinding=function(_11f3){
return this.getBinding(_11f3)!=null;
};
this.isBindingVisible=function(_11f4){
var _11f5=Application.isOperational;
if(_11f5==true){
var _11f6=new Crawler();
_11f6.type=NodeCrawler.TYPE_ASCENDING;
_11f6.id="visibilitycrawler";
_11f6.addFilter(function(_11f7){
var b=UserInterface.getBinding(_11f7);
var res=0;
if(!b.isVisible){
_11f5=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11f6.crawl(_11f4.bindingElement);
_11f6.dispose();
}
return _11f5;
};
var _11fa=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11fa={};
for(var key in keys){
_11fa[key]=true;
}
};
this.getPoint=function(){
var _11fe=null;
if(_11fa){
_11fe=new List();
for(var key in keys){
if(!_11fa[key]){
_11fe.add(key);
}
}
}
return _11fe;
};
this.clearPoint=function(){
_11fa=null;
};
this.trackUndisposedBindings=function(){
var _1200=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1200){
_1200="Bindings illdisposed: ";
}
_1200+=entry.binding+" ";
}
}
if(_1200!=null){
_11df.error(_1200);
}
};
this.autoTrackDisposedBindings=function(_1203){
if(_1203){
if(!window.disposedbindingtrackinterval){
window.disposedbindingtrackinterval=window.setInterval(UserInterface.trackUndisposedBindings,10000);
this.trackUndisposedBindings();
}
}else{
if(window.disposedbindingtrackinterval){
window.clearInterval(window.disposedbindingtrackinterval);
window.disposedbindingtrackinterval=null;
}
}
};
};
function SOAPMessage(){
}
SOAPMessage.prototype={document:null,envelope:null,header:null,body:null,fault:null};
SOAPRequest.prototype=new SOAPMessage;
SOAPRequest.prototype.constructor=SOAPRequest;
SOAPRequest.superclass=SOAPMessage.prototype;
SOAPRequest.resolver=new XPathResolver();
SOAPRequest.resolver.setNamespacePrefixResolver({"soap":Constants.NS_ENVELOPE,"xhtml":Constants.NS_XHTML});
SOAPRequest.newInstance=function(_1204,_1205){
var _1206=_1204+"/"+_1205;
var _1207=new SOAPRequest(_1206);
var _1208=SOAPRequest.resolver;
_1207.document=Templates.getTemplateDocument("soapenvelope.xml");
_1207.envelope=_1208.resolve("soap:Envelope",_1207.document);
_1207.header=_1208.resolve("soap:Header",_1207.envelope);
_1207.body=_1208.resolve("soap:Body",_1207.envelope);
return _1207;
};
SOAPRequest._parseResponse=function(_1209){
var _120a=null;
var _120b=false;
var doc=_1209.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_120a=SOAPRequestResponse.newInstance(_1209.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1209.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_120b=true;
}
}
break;
case Constants.NS_DOMPARSEERROR:
var cry=DOMSerializer.serialize(doc);
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("SOAPRequest parseerror! \n\n"+cry);
}
break;
default:
if(Application.isDeveloperMode){
alert("SOAPRequest: "+doc.documentElement.namespaceURI);
}
break;
}
}else{
if(!Application.isOffLine&&!Application.isLoggedOut){
var text=_1209.responseText;
if(_1209.status==503||text.indexOf("id=\"offline\"")>-1){
_120b=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1209.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1209.responseText);
}
}
}
}
if(_120b==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _120a;
};
function SOAPRequest(_1210){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1210;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1212=DOMUtil.getXMLHTTPRequest();
var _1213=null;
_1212.open("post",url,false);
_1212.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1212.setRequestHeader("SOAPAction",this.action);
try{
_1212.send(this.document);
_1213=SOAPRequest._parseResponse(_1212);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1212=null;
return _1213;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1216){
var _1217=DOMUtil.getXMLHTTPRequest();
_1217.open("post",url,true);
_1217.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1217.setRequestHeader("SOAPAction",this.action);
_1217.onreadystatechange=function(){
if(_1217.readyState==4){
var _1218=SOAPRequest._parseResponse(_1217);
_1216(_1218);
_1217=null;
}
};
_1217.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1219 in this){
this[_1219]=null;
}
};
SOAPRequestResponse.prototype=new SOAPMessage;
SOAPRequestResponse.prototype.constructor=SOAPRequestResponse;
SOAPRequestResponse.superclass=SOAPMessage.prototype;
function SOAPRequestResponse(){
}
SOAPRequestResponse.logger=SystemLogger.getLogger("SOAPRequestResponse");
SOAPRequestResponse.resolver=new XPathResolver();
SOAPRequestResponse.resolver.setNamespacePrefixResolver({"soap":Constants.NS_ENVELOPE});
SOAPRequestResponse.newInstance=function(doc){
var _121b=null;
if(doc&&doc.documentElement){
_121b=new SOAPRequestResponse();
var _121c=SOAPRequestResponse.resolver;
_121b.document=doc;
_121b.envelope=_121c.resolve("soap:Envelope",_121b.document);
_121b.header=_121c.resolve("soap:Header",_121b.envelope);
_121b.body=_121c.resolve("soap:Body",_121b.envelope);
var fault=_121c.resolve("soap:Fault",_121b.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_121b.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_121c.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_121c.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _121b;
};
function SOAPFault(_121e,_121f,_1220){
this._operationName=_121e;
this._operationAddress=_121f;
this._faultString=_1220;
}
SOAPFault.prototype.getOperationName=function(){
return this._operationName;
};
SOAPFault.prototype.getOperationAddress=function(){
return this._operationAddress;
};
SOAPFault.prototype.getFaultString=function(){
return this._faultString;
};
SOAPFault.newInstance=function(_1221,fault){
return new SOAPFault(_1221.name,_1221.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1224){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1224;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1226=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1226.body,this._operation);
var _1228=this._wsdl.getSchema();
var _1229=_1228.lookup(this._operation);
var _122a=_1229.getListedDefinitions();
while(_122a.hasNext()){
var def=_122a.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1226;
};
SOAPEncoder.prototype._resolve=function(_122e,_122f,value){
var _1231=this._wsdl.getSchema();
if(_122f.isSimpleValue){
this._appendText(_122e,value,_122f.type=="string");
}else{
var _1232=_1231.lookup(_122f.type);
if(_1232 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1232.getListedDefinitions();
if(_1232.isArray){
var _1234=new List(value);
var def=defs.getNext();
while(_1234.hasNext()){
var elm=this._appendElement(_122e,def.name);
var val=_1234.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_122e,def.name);
var val=value[def.name];
this._resolve(elm,def,val);
}
catch(exception){
this.logger.error("Mysterius malfunction in "+this._operation+":\n\n"+def.name+": "+value);
}
}
}
}
}
}
};
SOAPEncoder.prototype._appendElement=function(node,name){
var child=DOMUtil.createElementNS(this._namespace,name,node.ownerDocument);
node.appendChild(child);
return child;
};
SOAPEncoder.prototype._appendText=function(_123b,value,_123d){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1240=false;
var i=0,c;
while(c=chars[i++]){
var _1243=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1243=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1243=false;
}
break;
}
if(!_1243){
safe+=c;
}else{
_1240=true;
}
}
if(_1240){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_123b.appendChild(_123b.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1246){
this._wsdl=wsdl;
this._operation=_1246;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_124b){
var _124c=null;
var _124d=this._wsdl.getSchema();
var id=this._operation+"Response";
var _124f=this.resolve(id,_124b.body);
var _1250=_124d.lookup(id);
var _1251=_1250.getListedDefinitions();
while(!_124c&&_1251.hasNext()){
var def=_1251.getNext();
var elm=this.resolve(def.name,_124f);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_124c=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_124c.appendChild(_124c.importNode(e,true));
}else{
_124c=this._compute(elm,def);
}
}
return _124c;
};
SOAPDecoder.prototype._compute=function(_1255,_1256){
var _1257=null;
var _1258=this._wsdl.getSchema();
if(_1256.isSimpleValue){
_1257=this._getSimpleValue(_1255,_1256.type);
}else{
var _1259=_1258.lookup(_1256.type);
if(_1259 instanceof SchemaSimpleType){
_1257=this._getSimpleValue(_1255,_1259.restrictionType);
}else{
var defs=_1259.getListedDefinitions();
if(_1259.isArray){
_1257=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1255);
while(elms.hasNext()){
var elm=elms.getNext();
_1257.push(this._compute(elm,def));
}
}else{
if(_1255==null){
_1257=null;
}else{
_1257={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1255);
if(elm){
_1257[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
}
return _1257;
};
SOAPDecoder.prototype._getSimpleValue=function(_125e,type){
var _1260=null;
if(_125e!=null&&_125e.firstChild&&_125e.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_125e.childNodes.length>1){
_125e.normalize();
}
_1260=_125e.firstChild.data;
switch(type){
case Schema.types.STRING:
_1260=_1260;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1260=Number(_1260);
break;
case Schema.types.BOOLEAN:
_1260=_1260=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1260;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1261){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1261);
}
Schema.prototype._parseSchema=function(_1262){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1263={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1262);
while(rules.hasNext()){
var rule=rules.getNext();
switch(DOMUtil.getLocalName(rule)){
case "element":
entry=new SchemaElementType(this,rule);
break;
case "complexType":
entry=new SchemaComplexType(this,rule);
break;
case "simpleType":
entry=new SchemaSimpleType(this,rule);
break;
}
_1263[rule.getAttribute("name")]=entry;
}
return _1263;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1268){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1268);
}
SchemaDefinition.prototype._parse=function(_1269){
var min=_1269.getAttribute("minOccurs");
var max=_1269.getAttribute("maxOccurs");
var type=_1269.getAttribute("type");
this.name=_1269.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _126f=split[1];
this.isSimpleValue=sort!="tns";
this.type=_126f;
}else{
var elm=_1269.getElementsByTagName("*").item(0);
if(elm&&DOMUtil.getLocalName(elm)=="complexType"&&elm.getAttribute("mixed")=="true"){
elm=elm.getElementsByTagName("*").item(0);
if(elm&&DOMUtil.getLocalName(elm)=="sequence"){
elm=elm.getElementsByTagName("*").item(0);
if(DOMUtil.getLocalName(elm)=="any"){
this.type=SchemaDefinition.TYPE_XML_DOCUMENT;
}
}
}
}
};
function SchemaType(){
}
SchemaType.prototype={};
SchemaElementType.prototype=new SchemaType;
SchemaElementType.prototype.constructor=SchemaElementType;
SchemaElementType.superclass=SchemaType.prototype;
function SchemaElementType(_1271,_1272){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1271,_1272);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1273,_1274){
var els=_1273.resolveAll("s:complexType/s:sequence/s:element",_1274);
if(els.hasEntries()){
while(els.hasNext()){
this._definitions.add(new SchemaDefinition(els.getNext()));
}
}else{
this.logger.warn("SchemaElementType: Unparsed SchemaDefinition encountered.");
throw Schema.notSupportedException;
}
};
SchemaElementType.prototype.getListedDefinitions=function(){
return this._definitions.copy();
};
SchemaComplexType.prototype=new SchemaType;
SchemaComplexType.prototype.constructor=SchemaComplexType;
SchemaComplexType.superclass=SchemaType.prototype;
function SchemaComplexType(_1276,_1277){
this._definitions=new List();
this._parseListedDefinitions(_1276,_1277);
this.isArray=_1277.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1278,_1279){
var els=_1278.resolveAll("s:sequence/s:element",_1279);
if(els.hasEntries()){
while(els.hasNext()){
var el=els.getNext();
this._definitions.add(new SchemaDefinition(el));
}
}else{
throw Schema.notSupportedException;
}
};
SchemaComplexType.prototype.getListedDefinitions=function(){
return this._definitions.copy();
};
SchemaSimpleType.prototype=new SchemaType;
SchemaSimpleType.prototype.constructor=SchemaSimpleType;
SchemaSimpleType.superclass=SchemaType.prototype;
function SchemaSimpleType(_127c,_127d){
this.restrictionType=null;
this._parse(_127c,_127d);
}
SchemaSimpleType.prototype._parse=function(_127e,_127f){
var _1280=_127e.resolve("s:restriction",_127f);
if(_1280){
this.restrictionType=_1280.getAttribute("base").split(":")[1];
}else{
throw Schema.notSupportedException;
}
};
WebServiceResolver.prototype=new XPathResolver;
WebServiceResolver.prototype.constructor=WebServiceResolver;
WebServiceResolver.superclass=XPathResolver.prototype;
function WebServiceResolver(url){
this.logger=SystemLogger.getLogger("WebServiceResolver");
this._root=this._getDocumentElement(url);
this._schema=null;
if(this._root){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
this._schema=new Schema(this.resolve("wsdl:types/s:schema",this._root));
}
this._WSDLURL=url;
}
WebServiceResolver.prototype._getDocumentElement=function(url){
var _1283=null;
var _1284=DOMUtil.getXMLHTTPRequest();
_1284.open("get",url,false);
_1284.send(null);
if(_1284.responseXML){
_1283=_1284.responseXML.documentElement;
}else{
alert(_1284.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1283;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1285=new List();
var _1286=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1286.hasEntries()){
while(_1286.hasNext()){
var _1287=_1286.getNext();
var name=_1287.getAttribute("name");
_1285.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1285;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_128a,_128b,_128c){
this.name=name;
this.address=_128a;
this.encoder=_128b;
this.decoder=_128c;
}
WebServiceOperation.prototype={name:null,address:null,encoder:null,decoder:null};
WebServiceProxy.isLoggingEnabled=true;
WebServiceProxy.isDOMResult=false;
WebServiceProxy.isFaultHandler=true;
function WebServiceProxy(){
this.logger=SystemLogger.getLogger("WebServiceProxy");
}
WebServiceProxy.createProxy=function(url){
var wsdl=new WebServiceResolver(url);
var proxy=new WebServiceProxy();
var _1290=wsdl.getOperations();
_1290.each(function(_1291){
proxy[_1291.name]=WebServiceProxy.createProxyOperation(_1291);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1292,_1293){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1293){
var log=_1293 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1292.address+": "+_1292.name+"\n\n";
log+=DOMSerializer.serialize(_1293.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1295){
return function(){
var _1296=new List(arguments);
var _1297=null;
if(typeof (_1296.getLast())=="function"){
var _1298=_1296.extractLast();
var _1299=_1295.encoder.encode(_1296);
this._log(_1295,_1299);
var self=this;
var _129b=_1299.asyncInvoke(_1295.address,function(_129c){
self._log(_1295,_129c);
if(_129c){
if(_129c.fault){
_1297=SOAPFault.newInstance(_1295,_129c.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1297,_1299,_129c);
}
}else{
if(WebServiceProxy.isDOMResult){
_1297=_129c.document;
}else{
_1297=_1295.decoder.decode(_129c);
}
}
}
_1299.dispose();
_1298(_1297);
});
}else{
var _1299=_1295.encoder.encode(new List(arguments));
this._log(_1295,_1299);
var _129b=_1299.invoke(_1295.address);
this._log(_1295,_129b);
if(_129b){
if(_129b.fault){
_1297=SOAPFault.newInstance(_1295,_129b.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1297,_1299,_129b);
}
}else{
if(WebServiceProxy.isDOMResult){
_1297=_129b.document;
}else{
_1297=_1295.decoder.decode(_129b);
}
}
}
_1299.dispose();
return _1297;
}
};
};
WebServiceProxy.handleFault=function(_129d,_129e,_129f){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_129d,soapRequest:_129e,soapResponse:_129f});
}
catch(exception){
alert(_129d.getFaultString());
}
};
var ConfigurationService=null;
var ConsoleMessageQueueService=null;
var EditorConfigurationService=null;
var FlowControllerService=null;
var InstallationService=null;
var LocalizationService=null;
var LoginService=null;
var MarkupFormatService=null;
var PageService=null;
var ReadyService=null;
var SecurityService=null;
var SEOService=null;
var SourceValidationService=null;
var StringService=null;
var TreeService=null;
var XhtmlTransformationsService=null;
var FunctionService=null;
window.MessageQueue=new function(){
this.INTERVAL_ONLINE=5*1000;
this.INTERVAL_OFFLINE=1*1000;
this._actions=new List();
this._index={};
this.index=0;
var _12a0=SystemLogger.getLogger("MessageQueue");
var _12a1=null;
var _12a2=0;
var _12a3=null;
var _12a4=new Map();
var _12a5=new Map();
var _12a6=false;
var _12a7=false;
var _12a8=false;
var _12a9=false;
var _12aa={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_12a1=ConsoleMessageQueueService;
_12a2=_12a1.GetCurrentSequenceNumber("dummyparam!");
this.index=_12a2;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12a6){
if(!MessageQueue._actions.hasEntries()){
var _12ab=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12a7=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12ab;
_12a7=false;
}
}
}
};
this._pokeserver=function(){
if(_12a6==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12ac){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12a7);
this._updateMessages(_12ac);
}
};
this._updateMessages=function(_12ad){
if(_12a8){
_12a9=true;
}else{
_12a8=true;
var self=this;
var _12af=function(_12b0){
if(_12b0!=null){
if(Types.isDefined(_12b0.CurrentSequenceNumber)){
var _12b1=_12b0.CurrentSequenceNumber;
if(_12b1<self.index){
_12a0.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12b1);
}
self.index=_12b1;
var _12b2=new List(_12b0.ConsoleActions);
if(_12b2.hasEntries()){
self.evaluate(_12b2);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_12a0.error("No sequencenumber in MessageQueue response!");
}
}
_12a8=false;
if(_12a9){
_12a9=false;
self._updateMessages();
}
};
if(_12ad){
_12af(_12a1.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_12a1.GetMessages(Application.CONSOLE_ID,this.index,_12af);
}
}
};
this.evaluate=function(_12b3){
var _12b4=new List();
if(_12b3.hasEntries()){
_12b3.each(function(_12b5){
if(this._index[_12b5.Id]!=true){
_12b4.add(_12b5);
}
this._index[_12b5.Id]=true;
},this);
if(_12b4.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12b4);
}else{
this._actions=_12b4;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12b6){
var _12b7="(No reason)";
if(_12b6!=null){
_12b7=_12b6.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12b7);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12bb){
if(_12bb==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12bc=null;
if(this._actions.hasEntries()){
var _12bd=this._actions.extractFirst();
_12a2=_12bd.SequenceNumber;
_12a0.debug("MessageQueue action: "+_12bd.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_12a2+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12bd.ActionType){
case "OpenView":
_12bc=_12bd.OpenViewParams;
if(_12bc.ViewType=="ModalDialog"){
openDialogView(_12bc);
}else{
_12a3=_12bc.ViewId;
openView(_12bc);
}
break;
case "CloseView":
_12bc=_12bd.CloseViewParams;
_12a3=_12bc.ViewId;
closeView(_12bc);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12bd.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12a4.countEntries()+"\n";
_12a4.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_12a0.debug(debug);
if(!_12a4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12c0=_12bd.SelectElementParams.PerspectiveElementKey;
if(_12c0){
var _12c1={handleBroadcast:function(_12c2,arg){
switch(_12c2){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12c0){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12bd.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12c1);
StageBinding.selectPerspective(_12bd.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12bd.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12bd.MessageBoxParams);
break;
case "OpenViewDefinition":
_12bc=_12bd.OpenViewDefinitionParams;
_12a3=_12bc.Handle;
openViewDefinition(_12bc);
break;
case "LogEntry":
logEntry(_12bd.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12bc=_12bd.BroadcastMessageParams;
_12a0.debug("Server says: EventBroadcaster.broadcast ( \""+_12bc.Name+"\", "+_12bc.Value+" )");
EventBroadcaster.broadcast(_12bc.Name,_12bc.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12a4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12bd.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12bd.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12bd.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12bc=_12bd.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12bc.ViewId,entityToken:_12bc.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12bc=_12bd.OpenGenericViewParams;
openGenericView(_12bc);
break;
case "OpenExternalView":
_12bc=_12bd.OpenExternalViewParams;
openExternalView(_12bc);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12bd.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12a7);
}
function logEntry(_12c4){
var _12c5=_12c4.Level.toLowerCase();
SystemLogger.getLogger(_12c4.SenderId)[_12c5](_12c4.Message);
}
function openView(_12c6){
var list=paramsToList(_12c6.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12c6.ViewId);
def.entityToken=_12c6.EntityToken;
def.flowHandle=_12c6.FlowHandle;
def.position=_12aa[_12c6.ViewType],def.label=_12c6.Label;
def.image=_12c6.Image;
def.toolTip=_12c6.ToolTip;
def.argument={"url":_12c6.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12c6.ViewId,entityToken:_12c6.EntityToken,flowHandle:_12c6.FlowHandle,position:_12aa[_12c6.ViewType],url:_12c6.Url,label:_12c6.Label,image:_12c6.Image,toolTip:_12c6.ToolTip}));
}
}
function openDialogView(_12c9){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12c9.ViewId,flowHandle:_12c9.FlowHandle,position:Dialog.MODAL,url:_12c9.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12ca){
var _12cb=_12ca.DialogType.toLowerCase();
if(_12cb=="question"){
throw "Not supported!";
}else{
Dialog[_12cb](_12ca.Title,_12ca.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12cc){
var map={};
var _12ce=false;
new List(_12cc.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12ce=true;
});
var proto=ViewDefinitions[_12cc.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12cc.ViewId;
}
def.argument=_12ce?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12d3){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12d3.ViewId);
def.label=_12d3.Label;
def.toolTip=_12d3.ToolTip;
def.image=_12d3.Image;
def.argument={"url":_12d3.Url,"list":paramsToList(_12d3.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12d5){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12d5.ViewId);
def.label=_12d5.Label;
def.toolTip=_12d5.ToolTip;
def.image=_12d5.Image;
def.url=_12d5.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12d7){
if(StageBinding.isViewOpen(_12d7.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12d7.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12d8){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12d8.ViewId,isSuccess:_12d8.Succeeded});
}
this._lockSystem=function(_12d9){
var _12da=top.bindingMap.offlinetheatre;
if(_12d9){
_12da.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12da.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a6=_12d9;
};
this.placeConsoleCommand=function(_12dc){
_12a1.PlaceConsoleCommand(Application.CONSOLE_ID,_12dc);
};
this.handleBroadcast=function(_12dd,arg){
switch(_12dd){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12a3!=null&&arg==_12a3){
_12a3=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12a4.set(arg,true);
}else{
_12a0.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12a4.hasEntries()){
_12a4.del(arg);
_12a0.debug("Refreshed tree: "+arg+"\n("+_12a4.countEntries()+" trees left!)");
if(!_12a4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12a5.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12a5.hasEntries()==true){
_12a5.del(arg);
if(!_12a5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
MessageQueue._nextAction();
}
}
break;
case BroadcastMessages.SERVER_OFFLINE:
MessageQueue._lockSystem(true);
break;
case BroadcastMessages.SERVER_ONLINE:
MessageQueue._lockSystem(false);
break;
}
};
function paramsToList(_12df){
var list=new List();
new List(_12df).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.ABSBOTTOMRIGHT,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12e2=false;
var _12e3=null;
var _12e4=false;
var _12e5=Client.qualifies();
var _12e6="admin";
var _12e7="123456";
if(!_12e5){
document.location="unsupported.aspx";
return;
}
this.fireOnLoad=function(){
if(Client.isPad&&Client.isOS7&&window.innerHeight!=document.documentElement.clientHeight){
document.documentElement.style.height=window.innerHeight+"px";
}
Application.lock(this);
fileEventBroadcasterSubscriptions(true);
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN,this);
SetupService=WebServiceProxy.createProxy(Constants.URL_WSDL_SETUPSERVICE);
ReadyService=WebServiceProxy.createProxy(Constants.URL_WSDL_READYSERVICE);
LoginService=WebServiceProxy.createProxy(Constants.URL_WSDL_LOGINSERVICE);
InstallationService=WebServiceProxy.createProxy(Constants.URL_WSDL_INSTALLSERVICE);
StringService=WebServiceProxy.createProxy(Constants.URL_WSDL_STRINGSERVICE);
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);
setTimeout(function(){
Persistance.initialize();
},0);
};
this.handleBroadcast=function(_12e8){
switch(_12e8){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12e8);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12e9=bindingMap.decks.getSelectedDeckBinding();
if(_12e9!=null){
switch(_12e9.getID()){
case "logindeck":
this.login();
break;
case "changepassworddeck":
this.changePassword();
break;
default:
}
}
}
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12ea=window.bindingMap.appwindow;
_12ea.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12eb=window.location.hash.replace(/^#/,"");
if(_12eb){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12eb);
MessageQueue.update();
EventBroadcaster.broadcast(BroadcastMessages.COMPOSITE_STOP);
}
showWorkbench();
break;
case BroadcastMessages.APPLICATION_SHUTDOWN:
if(bindingMap.decks!=null){
bindingMap.decks.select("shutdowndeck");
}
bindingMap.cover.show();
break;
}
};
function fileEventBroadcasterSubscriptions(_12ec){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12ed){
if(_12ec){
EventBroadcaster.subscribe(_12ed,KickStart);
}else{
EventBroadcaster.unsubscribe(_12ed,KickStart);
}
});
}
function kickStart(_12ee){
switch(_12ee){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12e2=true;
break;
}
if(_12e2){
if(bindingMap.decks!=null&&LoginService.IsLoggedIn(true)){
accessGranted();
}else{
if(bindingMap.decks!=null){
splashScreenData();
showLogin();
}else{
showWelcome();
}
}
}
}
function splashScreenData(){
var ver=document.getElementById("version");
ver.firstChild.data=ver.firstChild.data.replace("${version}",Installation.versionPrettyString);
var build=document.getElementById("build");
build.firstChild.data=build.firstChild.data.replace("${build}",Installation.versionString);
}
function showWelcome(){
Application.unlock(KickStart);
if(window.Welcome!=null){
Welcome.test();
}
}
function showLogin(){
EventBroadcaster.subscribe(BroadcastMessages.KEY_ENTER,KickStart);
Application.unlock(KickStart);
bindingMap.decks.select("logindeck");
setTimeout(function(){
if(Application.isDeveloperMode&&Application.isLocalHost){
DataManager.getDataBinding("username").setValue(_12e6);
DataManager.getDataBinding("password").setValue(_12e7);
}
setTimeout(function(){
DataManager.getDataBinding("username").focus();
},250);
},0);
}
function watchProgress(){
window.progressOnRegistrationInterval=window.setInterval(function(){
if(ReadyService.IsServerReady(true)){
window.clearInterval(window.progressOnRegistrationInterval);
window.progressOnRegistrationInterval=null;
splashScreenData();
showLogin();
}
},2000);
}
function showWorkbench(){
setTimeout(function(){
bindingMap.cover.hide();
fileEventBroadcasterSubscriptions(false);
Application.unlock(KickStart);
},PageBinding.TIMEOUT);
}
this.changePassword=function(){
if(bindingMap.toppage.validateAllDataBindings()){
var _12f1=DataManager.getDataBinding("username").getResult();
var _12f2=DataManager.getDataBinding("passwordold").getResult();
var _12f3=DataManager.getDataBinding("passwordnew").getResult();
var _12f4=DataManager.getDataBinding("passwordnew2").getResult();
if(_12f3==_12f4){
var _12f5=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f6=LoginService.ChangePassword(_12f1,_12f2,_12f3);
if(_12f6 instanceof SOAPFault){
alert(_12f6.getFaultString());
}else{
if(_12f6.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12f6);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12f5){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12f7){
_12f7=new List(_12f7);
var _12f8=document.getElementById("passworderror");
_12f8.innerHTML="";
_12f7.each(function(error){
var _12fa=document.createElement("div");
_12fa.textContent=error;
_12fa.className="errortext";
_12f8.appendChild(_12fa);
});
_12f8.style.display="block";
var _12fb={handleAction:function(_12fc){
document.getElementById("passworderror").style.display="none";
_12fc.target.removeActionListener(Binding.ACTION_DIRTY,_12fb);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12fb);
DataManager.getDataBinding("passwordold").clean();
DataManager.getDataBinding("passwordnew").clean();
DataManager.getDataBinding("passwordnew2").clean();
};
this.login=function(){
Application.lock(KickStart);
setTimeout(function(){
if(bindingMap.toppage.validateAllDataBindings()){
KickStart.doLogin(DataManager.getDataBinding("username").getResult(),DataManager.getDataBinding("password").getResult());
}else{
Application.unlock(KickStart);
}
},25);
};
this.doLogin=function(_12fd,_12fe){
var _12ff=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1300=false;
var _1301=false;
var _1302=LoginService.ValidateAndLogin(_12fd,_12fe);
if(_1302 instanceof SOAPFault){
alert(_1302.getFaultString());
}else{
if(_1302=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_1302=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_1302=="passwordUpdateRequired"){
_1301=true;
}
if(_1302=="success"){
_1300=true;
}
}
if(_1301){
changePasswordRequired();
}else{
if(_1300){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
}
WebServiceProxy.isFaultHandler=true;
if(_12ff){
WebServiceProxy.isLoggingEnabled=true;
}
};
function accessGranted(){
setTimeout(function(){
if(bindingMap.decks!=null){
bindingMap.decks.select("loadingdeck");
}
setTimeout(function(){
Application.login();
},0);
},0);
}
function changePasswordRequired(){
setTimeout(function(){
Application.unlock(KickStart);
if(bindingMap.decks!=null){
bindingMap.decks.select("changepassworddeck");
bindingMap.cover.attachClassName("widesplash");
setTimeout(function(){
var _1303=document.getElementById("passwordexpired");
_1303.firstChild.data=_1303.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1304=DataManager.getDataBinding("username");
var _1305=DataManager.getDataBinding("password");
_1304.blur();
_1305.blur();
_1304.setValue("");
_1305.setValue("");
_1304.clean();
_1305.clean();
_1304.focus();
document.getElementById("loginerror").style.display="block";
var _1306={handleAction:function(_1307){
document.getElementById("loginerror").style.display="none";
_1307.target.removeActionListener(Binding.ACTION_DIRTY,_1306);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1306);
}
WindowManager.fireOnLoad(this);
if(!_12e5){
UpdateManager.isEnabled=false;
}
};

