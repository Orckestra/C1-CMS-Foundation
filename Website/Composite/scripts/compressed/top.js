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
List.prototype.get=function(_20){
var _21=null;
if(this._array[_20]){
_21=this._array[_20];
}
return _21;
};
List.prototype.set=function(_22,_23){
this._array[_22]=_23;
};
List.prototype.del=function(_24){
this._array.splice(_24,1);
};
List.prototype.has=function(_25){
var _26=false;
var i=0,e;
while((e=this._array[i++])!==undefined){
if(e==_25){
_26=true;
break;
}
}
return _26;
};
List.prototype.getLength=function(){
return this._array.length;
};
List.prototype.hasEntries=function(){
return this.getLength()>0;
};
List.prototype.hasNext=function(){
var _29=false;
if(this._array!=null){
_29=this._index<this._array.length;
}else{
SystemLogger.getLogger("List").error("Mysterious List#hasNext exception in IE");
}
return _29;
};
List.prototype.getNext=function(){
var _2a=null;
if(this.hasNext()){
_2a=this._array[this._index++];
}
return _2a;
};
List.prototype.getFollowing=function(_2b){
var _2c=null;
var i=0,e=null;
while((e=this._array[i])!=null&&!_2c){
if(e==_2b&&this._array[i+1]){
_2c=this._array[i+1];
}
i++;
}
return _2c;
};
List.prototype.getPreceding=function(_2f){
var _30=null;
var i=1,e=null;
while((e=this._array[i])!=null&&!_30){
if(e==_2f&&this._array[i-1]){
_30=this._array[i-1];
}
i++;
}
return _30;
};
List.prototype.getIndex=function(_33){
var _34=-1;
if(this._array.indexOf!=null){
_34=this._array.indexOf(_33);
}else{
var _35=0;
this.each(function(e){
var res=true;
if(e==_33){
_34=_35;
res=false;
}
_35++;
return res;
});
}
return _34;
};
List.prototype.reset=function(){
this._index=0;
return this;
};
List.prototype.clear=function(){
this._array=[];
return this.reset();
};
List.prototype.each=function(_38,_39){
this.reset();
var _3a,is=true;
while(is!=false&&this.hasNext()){
if(_39===undefined){
_39=null;
}
var _3c=this._index;
var _3d=this.getNext();
is=_38.call(_39,_3d,_3c);
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
List.prototype.merge=function(_3e){
_3e.reset();
while(_3e.hasNext()){
this.add(_3e.getNext());
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
var _43=null;
if(this.has(key)){
_43=this._map[key];
}else{
var cry="Map: Invalid key: "+key;
SystemLogger.getLogger("Map").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
console.log(cry);
console.log(arguments);
}
}
return _43;
};
Map.prototype.set=function(key,_46){
this._map[key]=_46;
};
Map.prototype.del=function(key){
delete this._map[key];
};
Map.prototype.has=function(key){
return typeof this._map[key]!="undefined";
};
Map.prototype.each=function(_49){
for(var key in this._map){
var _4b=_49(key,this._map[key]);
if(_4b==false){
break;
}
}
};
Map.prototype.hasEntries=function(){
var _4c=false;
for(var key in this._map){
_4c=true;
break;
}
return _4c;
};
Map.prototype.countEntries=function(){
var _4e=0;
for(var key in this._map){
_4e++;
}
return _4e;
};
Map.prototype.toList=function(_50){
var _51=new List();
for(var key in this._map){
_51.add(_50?key:this._map[key]);
}
return _51;
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
SystemNodeList.prototype.add=function(_59){
if(_59.getEntityToken){
var _5a=_59.getEntityToken();
this._entityTokens.add(_5a);
}
};
SystemNodeList.prototype.has=function(_5b){
if(_5b.getEntityToken){
var _5c=_5b.getEntityToken();
return this._entityTokens.has(_5c);
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
_EventBroadcaster.prototype={_broadcasts:{},subscribe:function(_5d,_5e){
if(_5d!=null){
if(!Interfaces.isImplemented(IBroadcastListener,_5e,true)){
throw ("IBroadcastListener not implemented: "+_5d);
}else{
if(!this._broadcasts[_5d]){
this._broadcasts[_5d]=[_5e];
}else{
this._broadcasts[_5d].push(_5e);
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast: "+_5e;
}
},unsubscribe:function(_5f,_60){
if(_5f!=null){
if(Interfaces.isImplemented(IBroadcastListener,_60)){
var i=0,_62,_63=this._broadcasts[_5f];
if(_63){
while(i<_63.length){
_62=_63[i];
if(_62==_60){
_63.splice(i,1);
break;
}
i++;
}
}
}
}else{
throw "Undefined broadcast"+_60;
}
},hasSubscribers:function(_64){
var _65=this._broadcasts[_64];
return _65!=null&&_65.length>0;
},broadcast:function(_66,_67){
if(_66!=null){
var i=0,_69=this._broadcasts[_66];
var _6a=[];
if(_69!=null){
var _6b=new List();
while(i<_69.length){
_6a.push(_69[i++]);
}
i=0;
while(i<_6a.length){
var _6c=_6a[i];
if(Application.isDeveloperMode){
_6c.handleBroadcast(_66,_67);
}else{
try{
_6c.handleBroadcast(_66,_67);
}
catch(exception){
_6b.add(_6c);
var cry="Exception in "+new String(_6c)+" on broadcast '"+_66+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
}
}
i++;
}
if(_6b.hasEntries()){
_6b.each(function(_6e){
EventBroadcaster.unsubscribe(_66,_6e);
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
var _6f=navigator.userAgent.toLowerCase();
var _70=navigator.platform.toLowerCase();
var _71=navigator.appName=="Microsoft Internet Explorer";
var _72=!_71&&typeof document.createTreeWalker!="undefined";
var _73=_72&&(_6f.indexOf("webrunner")>-1||_6f.indexOf("prism")>-1);
var _74=history.pushState!=null;
this.isMozilla=_72;
this.isFirefox=_6f.indexOf("firefox")>-1;
this.isWebKit=_6f.indexOf("webkit")>-1;
this.isExplorer=_71;
this.isExplorer6=this.isExplorer&&(_6f.indexOf("msie 6.0")>-1||_6f.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isExplorer11=!!navigator.userAgent.match(/Trident\/7\./);
this.isPrism=_73;
this.isWindows=_70.indexOf("win")>-1;
this.isVista=this.isWindows&&_6f.indexOf("windows nt 6")>-1;
this.isMac=_70.indexOf("mac")>-1;
this.isPad=navigator.userAgent.match(/iPad/i)!=null;
this.isOS7=navigator.userAgent.match(/CPU.*OS 7_\d/i)!=null;
var _75=this._getFlashVersion();
this.hasFlash=(_75&&_75>=9);
this.hasTransitions=_74;
this.canvas=!!document.createElement("canvas").getContext;
this.hasSpellcheck=this.isFirefox||this.isExplorer&&document.documentElement.spellcheck;
this.hasXSLTProcessor=this.isMozilla&&!this.isExplorer11;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _76=null;
var _77=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _78=navigator.plugins["Shockwave Flash"];
if(_78){
var _79=_78.description;
if(_79!=null){
_76=_79.charAt(_79.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_77;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_76=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _76;
},qualifies:function(){
var _7b=true;
var _7c=false;
if(this.isMozilla&&!this.isWebKit&&!this.isExplorer11){
_7c=(document.documentElement.mozMatchesSelector===undefined);
}
if(window.opera!=null||_7c||this.isExplorer&&!this.canvas){
_7b=false;
}
return _7b;
},fixUI:function(_7d){
if(Client.isExplorer){
_7d=_7d.replace(/<ui:/g,"<").replace(/<\/ui:/g,"</");
_7d=_7d.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
}
return _7d;
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
function SystemLogger(_7e){
this.identifier=_7e;
}
SystemLogger.prototype.info=function(_7f){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_7f);
};
SystemLogger.prototype.debug=function(_80){
if(_80=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_80);
};
SystemLogger.prototype.error=function(_81){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_81);
};
SystemLogger.prototype.warn=function(_82){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_82);
};
SystemLogger.prototype.fatal=function(_83){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_83);
};
SystemLogger.prototype.fine=function(_84){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_84);
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
SystemLogger.getLogger=function(_86){
var _87=SystemLogger.loggers[_86];
if(!_87){
_87=new SystemLogger(_86);
SystemLogger.loggers[_86]=_87;
}
return _87;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _88=SystemLogger.buffer.getNext();
this.log(_88.identifier,_88.level,_88.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_89,_8a,_8b){
if(Application.isDeveloperMode){
_8b=String(_8b);
SystemLogger.buffer.add({identifier:_89,level:_8a,message:_8b});
}
};
SystemLogger.outputLog=function(_8c,_8d,_8e){
_8e=String(_8e);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_8c,_8d,_8e);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _93=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_8e=_8e.replace(/</g,"&lt;");
_8e=_8e.replace(/>/g,"&gt;");
_8e=_8e.replace(/\n/g,"<br/>");
_8e=_8e.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_8e;
}else{
pre.textContent=_8e;
}
div.className=_8d;
_93.innerHTML=_8c;
div.appendChild(_93);
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
SystemTimer.getTimer=function(_96){
return new SystemTimer(_96.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_98){
this.logger.debug(this._id+": "+this.getTime()+(_98?": "+_98:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_99,_9a){
this._stackMozilla(_99,_9a);
},_stackMozilla:function(_9b,_9c){
_9c=_9c?_9c:this._stacklength;
if(Client.isMozilla&&_9b.callee||_9b.caller){
var _9d=Client.isMozilla?_9b.callee.caller:_9b.caller.callee;
var _9e="";
var i=0;
while(_9d!=null&&i++<_9c){
_9e+="\n#"+i+"\n";
_9e+=_9d.toString();
_9d=_9d.caller;
_9e+="\n";
}
this._logger.error(_9e);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _a0=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_a1,_a2,_a3){
var _a4=true;
for(var _a5 in _a1){
if(typeof _a2[_a5]==Types.UNDEFINED){
_a4=false;
}else{
if(typeof _a1[_a5]!=typeof _a2[_a5]){
_a4=false;
}
}
if(!_a4){
break;
}
}
if(!_a4){
if(_a3){
_a0.fine(_a2+" invalid. Interface check abandoned at: "+_a5);
}
}
return _a4;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a6){
var _a7=_a6;
if(parseInt(_a7).toString()===_a7){
_a7=parseInt(_a7);
}else{
if(parseFloat(_a7).toString()===_a7){
_a7=parseFloat(_a7);
}else{
if(_a7==="true"||_a7==="false"){
_a7=(_a7==="true");
}
}
}
return _a7;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _aa={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"MediaFileElementProvider.WritableFolders":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _ac=null;
if(this.hasToken(key)){
_ac=_aa[key];
}else{
throw "Unknown search token key: "+key;
}
return _ac;
};
this.hasToken=function(key){
return typeof _aa[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_ae){
if(SearchTokens.hasToken(_ae.Key)){
_aa[_ae.Key]=_ae.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _af=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _b0={};
function resolve(_b1,_b2){
var _b3=new List(StringService.GetLocalisation(_b1));
if(_b3.hasEntries()){
_b3.each(function(_b4){
_b2[_b4.Key]=_b4.Value;
});
}else{
throw "No strings from provider: "+_b1;
}
}
this.getString=function(_b5,_b6){
var _b7=null;
if(window.StringService!=null){
try{
if(_b5=="ui"){
_b5=StringBundle.UI;
}
if(!_b0[_b5]){
var _b8=_b0[_b5]={};
resolve(_b5,_b8);
}
if(_b0[_b5]){
_b7=_b0[_b5][_b6];
}
if(!_b7){
throw "No such string: "+_b6;
}
}
catch(exception){
var cry="StringBundle exception in string "+_b5+":"+_b6;
_af.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _b7;
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
var _bc=false;
if(this._uniqueKeys[key]){
_bc=true;
}
return _bc;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_bd,_be){
var _bf=_bd.ResourceNamespace;
var _c0=_bd.ResourceName;
if(_bf===this.UI){
return _c0;
}else{
var _c1=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
_be=_be?_be:"DEFAULT";
if(_c0!=null&&_bf!=null){
_c1=url.replace("${name}",_c0).replace("${hash}",_bf).replace("${size}",_be);
if(_be=="DEFAULT"){
_c1=_c1.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _c1;
}
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_c3){
if(typeof _c3!=Types.UNDEFINED){
_c3=String(_c3);
_c3=_c3.replace("${root}",Constants.APPROOT);
_c3=_c3.replace("${skin}",Constants.SKINROOT);
_c3=_c3.replace("${tiny}",Constants.TINYROOT);
if(_c3.indexOf("${icon:")>-1){
_c3=this._resolveImage(_c3);
}else{
if(_c3.indexOf("${class:")>-1){
_c3=this._resolveClasses(_c3);
}else{
if(_c3.indexOf("${string:")>-1){
_c3=this._resolveString(_c3);
}
}
}
}
return _c3;
},resolveVars:function(_c4,_c5){
var i=0;
while(i<_c5.length){
_c4=_c4.replace("{"+i+"}",_c5[i]);
i++;
}
return _c4;
},_resolveString:function(_c7){
var _c8=null;
var _c9=null;
var key=_c7.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_c9=key.split(":")[0];
key=key.split(":")[1];
}else{
_c9=StringBundle.UI;
}
_c8=StringBundle.getString(_c9,key);
if(!_c8){
_c8="(?)";
}
return _c8;
},_resolveImage:function(_cb){
var _cc=null;
var _cd=null;
var _ce=null;
var _cf=null;
_ce=_cb.split("${icon:")[1].split("}")[0];
if(_ce.indexOf(":")>-1){
_cd=_ce.split(":")[0];
_ce=_ce.split(":")[1];
}else{
_cd=ImageProvider.UI;
}
if(_ce.indexOf("(")>-1){
_cf=_ce.split("(")[1].split(")")[0];
_ce=_ce.split("(")[0];
}
_cc=ImageProvider.getImageURL({ResourceNamespace:_cd,ResourceName:_ce},_cf);
return _cc;
},_resolveClasses:function(_d0){
var _d1={};
resource=_d0.split("${class:")[1].split("}")[0];
_d1.classes=resource;
return _d1;
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
_Cookies.prototype={createCookie:function(_d4,_d5,_d6){
var _d7="";
if(_d6){
var _d8=new Date();
_d8.setTime(_d8.getTime()+(_d6*24*60*60*1000));
_d7="; expires="+_d8.toGMTString();
}
document.cookie=_d4+"="+escape(_d5)+_d7+"; path=/";
return this.readCookie(_d4);
},readCookie:function(_d9){
var _da=null;
var _db=_d9+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_db)==0){
_da=unescape(c.substring(_db.length,c.length));
}
}
return _da;
},eraseCookie:function(_df){
this.createCookie(_df,"",-1);
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
var _e0=SystemLogger.getLogger("StatusBar");
var _e1=null;
var _e2="${icon:error}";
var _e3="${icon:warning}";
var _e4="${icon:loading}";
var _e5="${icon:message}";
var _e6=null;
var _e7=null;
var _e8=null;
var _e9=null;
this.initialize=function(_ea){
_e6=StringBundle.getString("ui","Website.App.StatusBar.Error");
_e7=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_e8=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_e9=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_e1=_ea;
this.document=_ea.bindingDocument;
};
this.error=function(_eb,_ec){
this.state=StatusBar.ERROR;
_eb=_eb?_eb:_e6;
show(_eb,_e2,_ec,false);
};
this.warn=function(_ed,_ee){
this.state=StatusBar.WARN;
_ed=_ed?_ed:_e7;
show(_ed,_e3,_ee,false);
};
this.busy=function(_ef,_f0){
this.state=StatusBar.BUSY;
_ef=_ef?_ef:_e8;
show(_ef,_e4,_f0,false);
};
this.ready=function(_f1,_f2){
this.state=StatusBar.READY;
_f1=_f1?_f1:_e9;
show(_f1,_e5,_f2,true);
};
this.report=function(_f3,_f4,_f5,_f6){
this.state=null;
show(_f3,_f4,_f5,_f6);
};
this.clear=function(){
this.state=null;
if(_e1){
_e1.clear();
}
};
function show(_f7,_f8,_f9,_fa){
if(_f9){
_f7=Resolver.resolveVars(_f7,_f9);
}
if(_e1){
_e1.setLabel(_f7);
_e1.setImage(_f8);
if(_fa){
_e1.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_e0.error("Message not initialized for display: "+_f7);
}
}
this.addToGroup=function(_fb,_fc){
if(!this._groups.has(_fb)){
this._groups.set(_fb,_e1.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_fb).add(_fc);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,isUIRtl:false,isRtl:false,handleBroadcast:function(_fd,arg){
switch(_fd){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
this.isUIRtl=LocalizationService.GetUITextDirection(true)=="rtl";
this.isRtl=LocalizationService.GetTextDirection(true)=="rtl";
var _ff=LocalizationService.GetActiveLocales(true);
if(_ff.length>=1){
this.languages=new List(_ff);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_fd){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _100=LocalizationService.GetLocales(true);
this.source=_100.ForeignLocaleName;
this.target=_100.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_100.ForeignLocaleName,target:_100.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _101=this.languages.copy();
while(_101.hasNext()){
var lang=_101.getNext();
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
_Validator.prototype={validate:function(_103,key,_105){
var _106=true;
var _107=SourceValidationService.ValidateSource(_103,key);
if(_107!="True"){
if(_105==true){
this._dialog(_107);
}
_106=false;
}
return _106;
},validateInformed:function(_108,key){
return this.validate(_108,key,true);
},_dialog:function(_10a){
setTimeout(function(){
Dialog.error("Source Invalid",_10a);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_10b,_10c,_10d,_10e){
this._count++;
this._eventListener(true,_10b,_10c,_10d,_10e);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_10b&&typeof _10b.nodeType!=Types.UNDEFINED){
if(_10b.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_10b);
if(win){
var _110={handleEvent:function(){
DOMEvents.removeEventListener(_10b,_10c,_10d,_10e);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_110);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_110);
}
}
}
}
},removeEventListener:function(_111,_112,_113,_114){
this._count--;
this._eventListener(false,_111,_112,_113,_114);
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
},cleanupEventListeners:function(_11a){
this._deleteWrappedHandler(_11a);
},isCurrentTarget:function(e){
var _11c=false;
if(Client.isMozilla==true){
_11c=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_11d,_11e){
var _11f=true;
if(_11d==_11e){
_11f=false;
}
if(_11f==true){
while(_11e!=null&&_11e.nodeType!=Node.DOCUMENT_NODE&&_11e!=_11d){
_11e=_11e.parentNode;
}
_11f=(_11e==_11d);
}
return _11f;
},_eventListener:function(_120,_121,_122,_123,_124,_125){
if(Interfaces.isImplemented(IEventListener,_123,true)){
if(typeof _122!=Types.UNDEFINED){
var _126=this._getAction(_120);
if(_121[_126]){
if(Client.isExplorer||Client.isExplorer11){
switch(_122){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_123=this._getWrappedHandler(_121,_122,_123,_125);
_121[_126](_122,_123,false);
break;
default:
_121[_126](_122,_123,false);
break;
}
}else{
switch(_122){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_122=_122==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_121[_126](_122,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_123.handleEvent(e);
}
}},_124?true:false);
break;
default:
_121[_126](_122,_123,_124?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_129){
var _12a=null;
switch(_129){
case true:
_12a="addEventListener";
break;
case false:
_12a="removeEventListener";
break;
}
return _12a;
},_getWrappedHandler:function(_12b,_12c,_12d,_12e){
var _12f=null;
try{
if(!_12d._domEventHandlers){
_12d._domEventHandlers={};
}
if(!_12d._domEventHandlers[_12b]){
_12d._domEventHandlers[_12b]={};
}
if(!_12d._domEventHandlers[_12b][_12c]){
var win=_12b.nodeType?DOMUtil.getParentWindow(_12b):_12b;
if(win){
_12d._domEventHandlers[_12b][_12c]=function(e){
if(win.event!=null&&_12d!=null){
_12d.handleEvent(win.event);
}else{
if(_12d!=null){
_12d.handleEvent(e);
}
}
};
}
}
_12f=_12d._domEventHandlers[_12b][_12c];
}
catch(exception){
this._report(_12b,_12c,_12d,_12e);
}
return _12f;
},_deleteWrappedHandler:function(_132){
for(var _133 in _132._domEventHandlers){
if(_133){
for(var _134 in _132._domEventHandlers[_133]){
if(_134){
delete _132._domEventHandlers[_133][_134];
}
}
}
delete _132._domEventHandlers[_133];
}
},_report:function(_135,_136,_137,_138){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_135?_135.nodeName:_135)+"\n"+"\tevent: "+_136+"\n"+"\thandler: "+_137+"\n\n"+"Offending invoker: "+(_138.callee?_138.callee.toString():_138.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_13a){
var _13b=null;
var _13c=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_13c=node.documentElement;
}
if(_13c.xml!=null){
return _13c.xml;
}else{
if(this._serializer!=null){
if(_13a==true){
_13c=_13c.cloneNode(true);
_13c=DOMFormatter.format(_13c,DOMFormatter.INDENTED_TYPE_RESULT);
}
_13b=this._serializer.serializeToString(_13c);
}
}
return _13b;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _13f=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_140){
var doc=_140.ownerDocument;
var _142=function(node,_144){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _145="",i=0;
while(i++<_144){
_145+=TAB;
}
var _147=node.firstChild;
while(_147){
switch(_147.nodeType){
case Node.ELEMENT_NODE:
if(_147==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_145));
}
node.insertBefore(doc.createTextNode(NEW+_145+TAB),_147);
_142(_147,_144+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_145+TAB),_147);
break;
}
if(_147.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_147,_145+TAB);
}
}
_147=_147.nextSibling;
}
}
};
_142(_140,0);
}
function strip(_148){
var _149=[];
var _14a={acceptNode:function(_14b){
return (!_13f.test(_14b.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _14c=_148.ownerDocument.createTreeWalker(_148,NodeFilter.SHOW_TEXT,_14a,true);
while(_14c.nextNode()){
_149.push(_14c.currentNode);
}
var i=0,_14e;
while((_14e=_149[i++])!=null){
_14e.parentNode.removeChild(_14e);
}
}
function formatCDATASection(node,_150){
if(node.textContent.indexOf(NEW)>-1){
var _151=node.textContent.split(NEW);
var _152="",line,_154=0,_155=true;
while((line=_151.shift())!=null){
if(_154==0&&line.charAt(0)==TAB){
while(line.charAt(_154++)==TAB){
}
}
line=line.substring(_154,line.length);
if(_151.length>0){
_152+=_150+TAB+line;
_152+=_155?"":"\n";
}else{
_152+=_150+line;
_150=_150.slice(1,_150.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_150));
}
_155=false;
}
node.textContent=_152;
}
}
this.format=function(_156,_157){
var _158=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_156);
if(_157!=_158){
indent(_156);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_156);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_159){
var sig,_15b=null,_15c=this.MSXML_MAXVERSION;
while(!_15b&&_15c>=this.MSXML_MINVERSION){
try{
sig=_159.replace("{$version}",_15c);
_15b=new ActiveXObject(sig);
}
catch(exception){
}
_15c--;
}
return _15b;
},getXMLHTTPRequest:function(){
var _15d=null;
if(Client.isExplorer||Client.isExplorer11){
_15d=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_15d=new XMLHttpRequest();
}
return _15d;
},getDOMDocument:function(_15e){
var _15f=null;
if(Client.isExplorer||Client.isExplorer11){
_15f=this.getMSComponent(_15e?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_15f=doc;
}
return _15f;
},getMSXMLXSLTemplate:function(){
var _161=null;
if(Client.isExplorer||Client.isExplorer11){
_161=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _161;
},getLocalName:function(_162){
var _163=null;
if(_162.localName){
_163=_162.localName.replace("ui:","");
}else{
if(_162.baseName){
_163=_162.baseName;
}else{
_163=_162.nodeName.toLowerCase();
}
}
return _163;
},getComputedStyle:function(_164,_165){
var _166=null;
if(Client.isExplorer){
if(_164.currentStyle!=null){
_166=_164.currentStyle[_165];
}else{
this._logger.error("Could not compute style for element "+_164.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _167=_164.ownerDocument.defaultView.getComputedStyle(_164,null);
if(_167!=null){
_166=_167.getPropertyValue(_165);
}else{
this._logger.error("Could not compute style for element "+_164.nodeName);
SystemDebug.stack(arguments);
}
}
return _166;
},getMaxIndex:function(doc){
var max=0,_16a=new List(doc.getElementsByTagName("*"));
_16a.each(function(_16b){
var _16c=CSSComputer.getZIndex(_16b);
if(_16c>max){
max=_16c;
}
});
return max;
},getOrdinalPosition:function(_16d,_16e){
var _16f=null;
var _170=-1;
var _171=this.getLocalName(_16d);
var _172=new List(_16d.parentNode.childNodes);
while(_172.hasNext()){
var _173=_172.getNext();
if(_173.nodeType==Node.ELEMENT_NODE){
if(!_16e||this.getLocalName(_173)==_171){
_170++;
if(_173==_16d||(_173.id!=""&&_173.id==_16d.id)){
_16f=_170;
break;
}
}
}
}
return _16f;
},isFirstElement:function(_174,_175){
return (this.getOrdinalPosition(_174,_175)==0);
},isLastElement:function(_176,_177){
var _178=_176.parentNode.getElementsByTagName(_177?this.getLocalName(_176):"*");
return (this.getOrdinalPosition(_176)==_178.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _17c=null;
if(node.textContent){
_17c=node.textContent;
}else{
if(node.text){
_17c=node.text;
}else{
_17c=node.innerText;
}
}
return _17c;
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
},getAncestorByLocalName:function(_17f,node,_181){
var _182=null;
while(_182==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_181==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_17f){
_182=node;
}
}
return _182;
},contains:function(_184,node){
return _184.contains?_184!=node&&_184.contains(node):!!(_184.compareDocumentPosition(node)&16);
},createElementNS:function(_186,_187,_188){
var _189=null;
if(_188==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_189=_188.createElementNS(_186,_187);
}else{
if(_188.xml!=null){
_189=_188.createNode(Node.ELEMENT_NODE,_187,_186);
}else{
_189=_188.createElement(_187.replace("ui:",""));
}
}
}
return _189;
},getElementsByTagName:function(node,_18b){
var _18c=null;
if(Client.isMozilla){
_18c=node.getElementsByTagNameNS(Constants.NS_XHTML,_18b);
}else{
_18c=node.getElementsByTagName(_18b);
}
return _18c;
},getNextElementSibling:function(_18d){
return Client.isExplorer?_18d.nextSibling:_18d.nextElementSibling;
},getPreviousElementSibling:function(_18e){
return Client.isExplorer?_18e.previousSibling:_18e.previousElementSibling;
},cloneNode:function(node){
var _190=null;
if(Client.isMozilla==true){
_190=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_190=node.cloneNode(true);
}
return _190;
},getLocalPosition:function(_191){
var _192=new Point(_191.offsetLeft,_191.offsetTop);
if(Client.isExplorer&&_191.parentNode&&_191.parentNode.currentStyle){
if(_191.parentNode.currentStyle.position=="static"){
var _193=this.getLocalPosition(_191.parentNode);
_192.x+=_193.x;
_192.y+=_193.y;
}
}
return _192;
},getGlobalPosition:function(_194){
return this._getPosition(_194,false);
},getUniversalPosition:function(_195){
return this._getPosition(_195,true);
},_getPosition:function(_196,_197){
var _198=null;
if(typeof _196.getBoundingClientRect!=Types.UNDEFINED){
var rect=_196.getBoundingClientRect();
_198={x:rect.left,y:rect.top};
if(Client.isMozilla){
_198.x-=_196.scrollLeft;
_198.y-=_196.scrollTop;
}
}else{
_198={x:_196.offsetLeft-_196.scrollLeft,y:_196.offsetTop-_196.scrollTop};
while(_196.offsetParent){
_196=_196.offsetParent;
_198.x+=(_196.offsetLeft-_196.scrollLeft);
_198.y+=(_196.offsetTop-_196.scrollTop);
}
}
if(_197){
var win=DOMUtil.getParentWindow(_196);
if(win){
var _19b=win.frameElement;
if(_19b){
var add=DOMUtil.getUniversalPosition(_19b);
_198.x+=add.x;
_198.y+=add.y;
}
}
}
return new Point(_198.x,_198.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a0){
var _1a1=DOMEvents.getTarget(e);
var _1a2={x:e.clientX,y:e.clientY};
if(_1a0){
var _1a3=this.getParentWindow(_1a1).frameElement;
if(_1a3){
var add=this.getUniversalPosition(_1a3);
_1a2.x+=add.x;
_1a2.y+=add.y;
}
}
return _1a2;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1a6){
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
if(!_1a6){
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
if(!_1a6){
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
},isWellFormedDocument:function(xml,_1a9,_1aa){
var _1ab=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1ad=SourceValidationService.IsWellFormedDocument(xml);
if(_1ad!="True"){
_1ab=false;
if(_1a9==true){
if(_1aa){
if(confirm("Not well-formed\n"+_1ad+"\nContinue?")){
_1ab=true;
}
}else{
this._illFormedDialog(_1ad);
}
}
}
return _1ab;
},isWellFormedFragment:function(xml,_1af){
var _1b0=true;
var _1b1=SourceValidationService.IsWellFormedFragment(xml);
if(_1b1!="True"){
_1b0=false;
if(_1af==true){
this._illFormedDialog(_1b1);
}
}
return _1b0;
},_illFormedDialog:function(_1b2){
setTimeout(function(){
Dialog.error("Not well-formed",_1b2);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1b3){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1b4){
return _1b3[_1b4];
}};
}else{
this._nsResolver=_1b3;
}
};
XPathResolver.prototype.resolve=function(_1b5,node,_1b7){
var _1b8=null;
try{
if(this._evaluator){
_1b8=this._evaluateDOMXpath(_1b5,node,_1b7?true:false);
}else{
_1b8=this._evaluateMSXpath(_1b5,node,_1b7?true:false);
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
return _1b8;
};
XPathResolver.prototype.resolveAll=function(_1b9,node){
return this.resolve(_1b9,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1bb,node,_1bd){
var _1be=null;
if(node){
var _1be=this._evaluator.evaluate(_1bb,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1bd){
var list=new List();
while((node=_1be.iterateNext())!=null){
list.add(node);
}
_1be=list;
}else{
_1be=_1be.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1be;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c1,node,_1c3){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1c5="";
for(var _1c6 in this._nsResolver){
_1c5+="xmlns:"+_1c6+"=\""+this._nsResolver[_1c6]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1c5);
if(_1c3){
var list=new List();
var i=0,_1c9=node.selectNodes(_1c1);
while(i<_1c9.length){
list.add(_1c9.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c1);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1cb=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1cb);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1cb;
}
};
XSLTransformer.prototype._import=function(url){
var _1cd=null;
if(Client.hasXSLTProcessor){
var _1ce=DOMUtil.getXMLHTTPRequest();
_1ce.open("get",Resolver.resolve(url),false);
_1ce.send(null);
_1cd=_1ce.responseXML;
}else{
var _1cd=DOMUtil.getDOMDocument(true);
_1cd.async=false;
_1cd.load(url);
}
return _1cd;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d0=null;
if(Client.hasXSLTProcessor){
_1d0=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d0;
};
XSLTransformer.prototype.transformToString=function(dom,_1d2){
var _1d3=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1d3=DOMSerializer.serialize(doc,_1d2);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1d3=proc.output;
}
return _1d3;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d6){
var _1d7=_1d6.style?_1d6.className:_1d6.getAttribute("class");
_1d7=_1d7?_1d7:"";
return _1d7;
},_contains:function(_1d8,sub){
return _1d8.indexOf(sub)>-1;
},_attach:function(_1da,sub){
return _1da+(_1da==""?"":" ")+sub;
},_detach:function(_1dc,sub){
if(this._contains(_1dc," "+sub)){
sub=" "+sub;
}
return _1dc.replace(sub,"");
},attachClassName:function(_1de,_1df){
if(_1de.classList!=null){
if(!_1de.classList.contains(_1df)){
_1de.classList.add(_1df);
}
}else{
var _1e0=this._getCurrent(_1de);
if(!this._contains(_1e0,_1df)){
_1e0=this._attach(_1e0,_1df);
}
if(_1de.style!=null){
_1de.className=_1e0;
}else{
_1de.setAttribute("class",_1e0);
}
}
},detachClassName:function(_1e1,_1e2){
if(_1e1.classList!=null){
if(_1e1.classList.contains(_1e2)){
_1e1.classList.remove(_1e2);
}
}else{
var _1e3=this._getCurrent(_1e1);
if(this._contains(_1e3,_1e2)){
_1e3=this._detach(_1e3,_1e2);
}
if(_1e1.style!=null){
_1e1.className=_1e3;
}else{
if(_1e3==""){
_1e1.removeAttribute("class");
}else{
_1e1.setAttribute("class",_1e3);
}
}
}
},hasClassName:function(_1e4,_1e5){
var _1e6=false;
if(_1e4.classList!=null){
_1e6=_1e4.classList.contains(_1e5);
}else{
_1e6=this._contains(this._getCurrent(_1e4),_1e5);
}
return _1e6;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1e7,_1e8){
var _1e9={};
for(var _1ea in _1e7){
var ent=parseInt(DOMUtil.getComputedStyle(_1e8,_1e7[_1ea]));
_1e9[_1ea]=isNaN(ent)?0:ent;
}
return _1e9;
},_getMargin:function(_1ec){
return this._getComplexResult(this._margins,_1ec);
},getPadding:function(_1ed){
return this._getComplexResult(this._paddings,_1ed);
},getBorder:function(_1ee){
return this._getComplexResult(this._borders,_1ee);
},getPosition:function(_1ef){
return DOMUtil.getComputedStyle(_1ef,"position");
},getFloat:function(_1f0){
return DOMUtil.getComputedStyle(_1f0,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f1){
return parseInt(DOMUtil.getComputedStyle(_1f1,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1f2){
return DOMUtil.getComputedStyle(_1f2,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1f3=SystemLogger.getLogger("System");
var root=null;
var _1f5=null;
this.hasActivePerspectives=false;
this.nodes=new Map();
this.getDefaultEntityToken=function(_1f6){
if(_1f5==null){
_1f5={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1f7){
_1f5[_1f7.Key]=_1f7.Value;
});
}
return _1f5[_1f6];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1f8=new List();
var _1f9=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1f9);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1fb){
_1f8.add(new SystemNode(_1fb));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1f8;
};
this.getChildNodes=function(node,_1fd){
var _1fe=new List();
var _1ff=null;
if(_1fd){
if(SearchTokens.hasToken(_1fd)){
_1fd=SearchTokens.getToken(_1fd);
}
_1ff=TreeService.GetElementsBySearchToken(node.getData(),_1fd);
}else{
_1ff=TreeService.GetElements(node.getData());
}
new List(_1ff).each(function(_200){
var _201=new SystemNode(_200);
if(_1fd){
_201.searchToken=_1fd;
}
_1fe.add(_201);
});
return _1fe;
};
this.getDescendantBranch=function(_202){
var map=new Map();
var arg=[];
_202.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _206=TreeService.GetMultipleChildren(arg);
var _207=new List(_206);
while(_207.hasNext()){
this._listNodesInMap(_207.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_208,_209,_20a){
var map=new Map();
var arg=[];
_20a.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20e=TreeService.FindEntityToken(_208,_209,arg);
if(_20e instanceof SOAPFault){
_1f3.error(_20e.getFaultString());
if(Application.isDeveloperMode){
alert(_20e.getFaultString());
}
map=null;
}else{
var _20f=new List(_20e);
while(_20f.hasNext()){
this._listNodesInMap(_20f.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_210,map){
var list=new List();
var key=_210.ElementKey;
var _214=new List(_210.ClientElements);
map.set(key,list);
while(_214.hasNext()){
var _215=_214.getNext();
list.add(new SystemNode(_215));
}
var self=this;
map.each(function(key,list){
self.nodes.set(key,list.copy());
});
};
this.getChildNodesBySearchToken=function(node,_21a){
return this.getChildNodes(node,_21a);
};
this.getNamedRoots=function(key,_21c){
var _21d=new List();
var _21e=null;
if(_21c){
if(SearchTokens.hasToken(_21c)){
_21c=SearchTokens.getToken(_21c);
}
_21e=TreeService.GetNamedRootsBySearchToken(key,_21c);
}else{
_21e=TreeService.GetNamedRoots(key);
}
new List(_21e).each(function(_21f){
var node=new SystemNode(_21f);
if(_21c){
node.searchToken=_21c;
}
_21d.add(node);
});
return _21d;
};
this.getNamedRootsBySearchToken=function(key,_222){
return this.getNamedRoots(key,_222);
};
function compileActionList(node,_224,_225){
var _226=_224.ClientElementActionGroupId;
if(_226!=null){
var _227=_225.get(_226).ClientElementActionGroupItems;
if(_227&&_227.length>0){
node.setActionList(new List(_227));
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
new List(self._data.Actions).each(function(_22d){
var _22e=_22d.ActionCategory.Name;
if(SystemAction.hasCategory(_22e)){
var _22f=new SystemAction(_22d);
SystemAction.actionMap.set(_22d.ActionKey,_22f);
}else{
throw "No such action category: "+_22e;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _230=null;
if(this.searchToken){
_230=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_230=System.getChildNodes(this);
}
return _230;
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
var _232=this._data.Piggybag;
if(_232==null){
_232="";
}
return _232;
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
var _234=null;
if(typeof this._data.ToolTip!="undefined"){
_234=this._data.ToolTip;
}
return _234;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_236){
map[_236.Key]=_236.Value;
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
var _23a=SystemAction.actionMap.get(key);
var _23b=true;
if(_23a.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_23b=false;
}
}
if(_23b){
var id=_23a.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_23a);
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
SystemAction.invoke=function(_23e,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_23e.logger.debug("Execute \""+_23e.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_23e.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_241,_242){
action=SystemAction.taggedActions.get(_241);
node=SystemNode.taggedNodes.get(_242);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_243){
return SystemAction.categories[_243]?true:false;
};
function SystemAction(_244){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_244;
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
var _245=null;
if(this.isInFolder()){
_245=this._data.ActionCategory.FolderName;
}
return _245;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _246=null;
if(typeof this._data.TagValue!="undefined"){
_246=this._data.TagValue;
}
return _246;
};
SystemAction.prototype.isChecked=function(){
var _247=null;
if(this.isCheckBox()){
_247=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _247;
};
function _UpdateManager(){
var _248=null;
if(!window.UpdateManager){
this._construct();
_248=this;
}
return _248;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_249){
var root=document.documentElement;
var _24b=root.namespaceURI;
if(_24b==null){
_24b=new String(root.getAttribute("xmlns"));
}
if(_24b=="http://www.w3.org/1999/xhtml"){
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
var _24c=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_24c);
}else{
throw new TypeError();
}
}else{
var _24d=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_24d.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _24f=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_24f=true;
}
},this);
return _24f;
},_setupForm:function(form){
var _252=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_252.isEnabled){
_252._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_253,type){
if(_253.addEventListener!=null){
_253.addEventListener(type,this,false);
}else{
var _255=this;
_253.attachEvent("on"+type,function(){
_255.handleEvent(window.event);
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
var _25a=UpdateAssistant.getUpdateZones(dom);
var _25b=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_25a.forEach(function(_25c,_25d){
var _25e=_25b[_25d];
this._crawl(_25c,_25e);
},this);
this._updates.forEach(function(_25f,_260){
_25f.update();
_25f.dispose();
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
},_crawl:function(_262,_263,_264,id){
var _266=true;
var _267=_263.getAttribute("class");
if(_267==null||_267.indexOf(this.CLASSNAME_GONE)==-1){
if(_263.nodeType==Node.ELEMENT_NODE){
var _268=_263.getAttribute("id");
if(_268!=null){
_264=_262;
id=_268;
}
}
if(_266=this._check(_262,_263,_264,id)){
var _269=_262.firstChild;
var _26a=_263.firstChild;
while(_269!=null&&_26a!=null&&!this._replaced[id]){
switch(_269.nodeType){
case Node.TEXT_NODE:
_266=this._check(_269,_26a,_264,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_266=this._crawl(_269,_26a,_264,id);
break;
}
if(this._replaced[id]){
_266=false;
}else{
_269=_269.nextSibling;
_26a=_26a.nextSibling;
}
}
}
}
return _266;
},_check:function(_26b,_26c,_26d,id){
var _26f=true;
var _270=null;
var _271=false;
var _272=false;
if((_26b!=null&&_26c==null)||(_26b==null&&_26c!=null)){
_26f=false;
}else{
if(_26f=_26b.nodeType==_26c.nodeType){
switch(_26c.nodeType){
case Node.ELEMENT_NODE:
if(_26b.namespaceURI!=_26c.namespaceURI||_26b.nodeName!=_26c.nodeName){
_26f=false;
}else{
if(_26f=(_26b.nodeName==_26c.nodeName)){
var _273=_26c.getAttribute("id");
var _274=_26b.getAttribute("id");
if(_273!=null&&_274!=null){
if(_273!=_274){
_26f=false;
}else{
if((_270=this._getPlugin(_26b,_26c))!=null){
if(_270.updateElement(_26b,_26c)){
_272=true;
_26f=false;
}
}
}
}
if(_26f){
if(_26f=this._checkAttributes(_26b,_26c)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_26b)&&this._hasSoftChildren(_26c)){
if(this._validateSoftChildren(_26b,_26c)){
this._updateSoftChildren(_26b,_26c);
_271=true;
}
_26f=false;
}else{
_26f=_26b.childNodes.length==_26c.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_26b.data.trim()!=_26c.data.trim()){
_26f=false;
}
break;
}
}
}
if(_26f==false&&!_271&&!_272){
if(id!=null&&_26d!=null){
this.addUpdate(new ReplaceUpdate(id,_26d));
}
}
return _26f;
},_checkAttributes:function(_275,_276){
var _277=true;
var _278=false;
var _279=_275.attributes;
var _27a=_276.attributes;
if(_279.length!=_27a.length){
_278=true;
}else{
_278=!Array.every(_279,function(att1,i){
var att2=_27a.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_278){
var _27e=_275.getAttribute("id");
var _27f=_276.getAttribute("id");
if(this.hasSoftAttributes&&_27e!=null&&_27e==_27f){
this.addUpdate(new AttributesUpdate(_27f,_275,_276));
}else{
_277=false;
}
}
return _277;
},_hasSoftChildren:function(_280){
var _281=true;
if(_280.hasChildNodes()){
_281=Array.every(_280.childNodes,function(node){
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
return _281;
},_validateSoftChildren:function(_284,_285){
var _286=true;
var _287=-1;
var _288=-1;
var _289=-1;
var news=this._toMap(_284.childNodes,true);
var olds=this._toMap(_285.childNodes,true);
for(var id in olds){
if(_286){
var _28d=olds[id];
_286=_28d>=_287;
if(news[id]!=null){
_289=news[id];
_286=_289>=_288;
}
}
_287=_28d;
if(_289>-1){
_288=_289;
}
}
return _286;
},_updateSoftChildren:function(_28e,_28f){
var news=this._toMap(_28e.childNodes);
var olds=this._toMap(_28f.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _293=null;
for(id in news){
if(olds[id]==null){
var _294=news[id];
if(_293==null){
var _295=_28f.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_295,_294,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_293,_294,false));
}
}
_293=id;
}
},addUpdate:function(_296){
this._updates.push(_296);
if(_296 instanceof ReplaceUpdate){
this._replaced[_296.id]=true;
}
},_getPlugin:function(_297,_298){
var _299=null;
this.plugins.every(function(_29a){
if(_29a.handleElement(_297,_298)){
_299=_29a;
}
return _299==null;
});
return _299;
},_toMap:function(_29b,_29c){
var _29d={};
Array.forEach(_29b,function(node,_29f){
if(node.nodeType==Node.ELEMENT_NODE){
_29d[node.getAttribute("id")]=_29c?_29f:node;
}
});
return _29d;
},_getPost:function(form){
var _2a1=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a3){
if(_2a3.name==null||_2a3.name==""){
return;
}
var name=_2a3.name;
var _2a5=encodeURIComponent(_2a3.value);
switch(_2a3.type){
case "button":
case "submit":
var _2a6=UpdateAssistant.getActiveElement();
if(_2a3==_2a6&&name!=""){
_2a1+=name+"="+_2a5+"&";
}
break;
case "radio":
if(_2a3.checked){
_2a1+=name+"="+_2a5+"&";
}
break;
case "checkbox":
if(_2a3.checked){
if(_2a3.name==last){
if(_2a1.lastIndexOf("&")==_2a1.length-1){
_2a1=_2a1.substr(0,_2a1.length-1);
}
_2a1+=","+_2a5;
}else{
_2a1+=name+"="+_2a3.value;
}
last=name;
_2a1+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a1+=name+"="+_2a5+"&";
break;
}
});
}
return _2a1.substr(0,_2a1.length-1);
},_postRequest:function(form){
var _2a8=form.method!=""?form.method:"get";
var _2a9=form.action!=""?form.action:window.location.toString();
var _2aa=this._getPost(form);
if(_2a8=="get"){
if(_2a9.indexOf("?")>-1){
_2a9=_2a9+"&"+_2aa;
}else{
_2a9+"?"+_2aa;
}
}
var _2ab=this;
var _2ac=UpdateAssistant.getXMLHttpRequest(_2a8,_2a9,this);
if(_2a8=="post"){
_2ac.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2ac.send(_2a8=="post"?_2aa:null);
},_fixdotnet:function(dom,id){
var _2af=document.getElementById(id);
if(_2af!=null){
var _2b0=UpdateAssistant.getElementById(dom,id);
if(_2b0!=null){
var _2b1=_2b0.getAttribute("value");
if(_2b1!==_2af.value){
_2af.value=_2b1;
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
},report:function(_2b4){
this.summary+=_2b4+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b5=null;
if(!window.UpdateAssistant){
this._construct();
_2b5=this;
}
return _2b5;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b6,fun){
var _2b8=true;
var len=_2b6.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ba=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b6[i]!="undefined"){
if(!fun.call(_2ba,_2b6[i],i,_2b6)){
_2b8=false;
break;
}
}
}
}
return _2b8;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2bd=arguments[1];
return Array.every(this,fun,_2bd);
};
}
if(!Array.forEach){
Array.forEach=function(_2be,fun){
var len=_2be.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c1=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2be[i]!="undefined"){
fun.call(_2c1,_2be[i],i,_2be);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c4=arguments[1];
Array.forEach(this,fun,_2c4);
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
},getXMLHttpRequest:function(_2c6,_2c7,_2c8){
var _2c9=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c9!=null){
_2c9.open(_2c6,_2c7,(_2c8!=null?true:false));
if(_2c8!=null){
function action(){
if(_2c9.readyState==4){
var _2ca=_2c9.getResponseHeader("X-Error-Type");
if(_2ca){
var _2cb="";
for(var i=0;i<10;i++){
var _2cd=i?i:"";
var _2ca=_2c9.getResponseHeader("X-Error-Type"+_2cd);
if(!_2ca){
break;
}
var _2ce=_2c9.getResponseHeader("X-Error-Message"+_2cd);
_2cb+=_2ca+"\n"+_2ce+"\n";
}
Dialog.error("Error",_2cb);
}else{
var text=_2c9.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c8.handleResponse(dom);
}
}
}
}
if(_2c9.addEventListener!=null){
_2c9.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c9.onreadystatechange=action;
}
}
}
return _2c9;
},dispatchEvent:function(_2d1,name){
var _2d3=true;
var _2d4=document.createEvent("UIEvents");
_2d4.initEvent(name,true,true);
_2d3=_2d1.dispatchEvent(_2d4);
return _2d3;
},getUpdateZones:function(dom){
var _2d6="//*[@id and contains(@class,'updatezone')]";
var _2d7=[];
var _2d8=null;
var _2d9=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d8=dom.evaluate(_2d6,dom,null,type,null);
while((_2d9=_2d8.iterateNext())!=null){
_2d7.push(_2d9);
}
}else{
_2d8=dom.documentElement.selectNodes(_2d6);
Array.forEach(_2d8,function(_2db){
_2d7.push(_2db);
});
}
return _2d7;
},getElementById:function(dom,id){
var _2de="//*[@id='"+id+"']";
var _2df=null;
var _2e0=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2df=dom.evaluate(_2de,dom,null,type,null);
_2e0=_2df.singleNodeValue;
}else{
_2e0=dom.documentElement.selectNodes(_2de)[0];
}
return _2e0;
},_getIds:function(dom){
var _2e3="//*[@id]";
var _2e4=null;
var _2e5=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e4=dom.evaluate(_2e3,dom,null,type,null);
while((element=_2e4.iterateNext())!=null){
_2e5.push(element.getAttribute("id"));
}
}else{
_2e4=dom.documentElement.selectNodes(_2e3);
Array.forEach(_2e4,function(_2e7){
_2e5.push(_2e7.getAttribute("id"));
});
}
return _2e5;
},toHTMLElement:function(_2e8){
var _2e9=this.serialize(_2e8);
var temp=document.createElement("temp");
temp.innerHTML=_2e9;
return temp.firstChild;
},getActiveElement:function(){
var _2eb=document.activeElement;
if(_2eb==null||_2eb==document.body){
_2eb=this._activeElement;
}
return _2eb;
},serialize:function(_2ec){
var _2ed=null;
if(_2ec.xml!=null){
_2ed=_2ec.xml;
}else{
if(this._serializer!=null){
_2ed=this._serializer.serializeToString(_2ec);
}
}
return _2ed;
},hasDifferences:function(_2ee,_2ef){
var s1=null;
var s2=null;
if(_2ee.xml!=null){
s1=_2ee.xml;
s2=_2ef.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2ee);
s2=this._serializer.serializeToString(_2ef);
}
}
return s1!=s2;
},parse:function(_2f2){
var _2f3=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f3=this._parser.parseFromString(_2f2,"text/xml");
}else{
_2f3=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f3.setProperty("SelectionLanguage","XPath");
_2f3.loadXML(_2f2);
}
return this._validate(_2f3);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f6=dom.getElementsByTagName("parsererror").item(0);
if(_2f6!=null){
out=_2f6.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2fa=!has[id];
has[id]=true;
if(!_2fa){
out="Element \""+id+"\" encountered twice.";
}
return _2fa;
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
this.handleElement=function(_2fb,_2fc){
var _2fd=false;
switch(_2fb.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2fb.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2fd=false;
break;
}
break;
}
return _2fd;
};
this.updateElement=function(_2fe,_2ff){
var id=_2fe.getAttribute("id");
var _301=document.getElementById(id);
if(_301!=null){
var _302=null;
switch(_301.nodeName.toLowerCase()){
case "input":
_302=_2fe.getAttribute("value");
break;
case "textarea":
_302=_2fe.textContent?_2fe.textContent:_2fe.text;
break;
}
if(_302==null){
_302="";
}
if(_302!=_301.value){
_301.value=_302;
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
},_beforeUpdate:function(_303){
var _304=true;
if(_303!=null){
_303.__updateType=this.type;
_304=UpdateAssistant.dispatchEvent(_303,Update.EVENT_BEFOREUPDATE);
}
return _304;
},_afterUpdate:function(_305){
var _306=true;
if(_305!=null){
_305.__updateType=this.type;
_306=UpdateAssistant.dispatchEvent(_305,Update.EVENT_AFTERUPDATE);
}
return _306;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_308){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_308;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _309,_30a,_30b=UpdateAssistant.toHTMLElement(this.element);
if((_309=document.getElementById(this.id))!=null){
if((_30a=_309.parentNode)!=null){
var _30c=UserInterface.getBinding(_309);
if(_30c!=null){
_30b.__isAttached=_30c.isAttached;
}
if(this._beforeUpdate(_309)){
_30a.replaceChild(_30b,_309);
this._afterUpdate(_30b);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_30d){
var _30e=ReplaceUpdate.superclass._afterUpdate.call(this,_30d);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_30d.nodeName=="form"||_30d.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30e;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_311,_312){
this.type=type;
this.id=id;
this.element=_311;
this.isFirst=_312;
return this;
}
SiblingUpdate.prototype.update=function(){
var _313=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_313);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_313);
break;
}
};
SiblingUpdate.prototype._remove=function(_314){
var _315=_314.parentNode;
if(_315!=null){
if(this._beforeUpdate(_314)){
_315.removeChild(_314);
this._afterUpdate(_315);
}
}
};
SiblingUpdate.prototype._insert=function(_316,_317){
var _318=UpdateAssistant.toHTMLElement(_316);
if(this.isFirst){
var _319=_317;
if(_319!=null){
if(this._beforeUpdate(_319)){
_319.insertBefore(_318,_319.firstChild);
this._afterUpdate(_318);
}
}
}else{
var _319=_317.parentNode;
if(_319!=null){
if(this._beforeUpdate(_319)){
_319.insertBefore(_318,_317.nextSibling);
this._afterUpdate(_318);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_31a){
var _31b=SiblingUpdate.superclass._beforeUpdate.call(this,_31a);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_31a.id+"\"");
}
return _31b;
};
SiblingUpdate.prototype._afterUpdate=function(_31c){
var _31d=true;
if(_31c!=null){
_31d=SiblingUpdate.superclass._afterUpdate.call(this,_31c);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_31c.id+"\"");
if(_31c.nodeName=="form"||_31c.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _31d;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31f,_320){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31f;
this.currentElement=_320;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _321=document.getElementById(this.id);
if(this._beforeUpdate(_321)){
this._updateAttributes(_321);
this._afterUpdate(_321);
}
};
AttributesUpdate.prototype._updateAttributes=function(_322){
Array.forEach(this.element.attributes,function(_323){
var _324=this.currentElement.getAttribute(_323.nodeName);
if(_324==null||_324!=_323.nodeValue){
this._setAttribute(_322,_323.nodeName,_323.nodeValue);
this._summary.push("@"+_323.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_325){
if(this.element.getAttribute(_325.nodeName)==null){
this._setAttribute(_322,_325.nodeName,null);
this._summary.push("@"+_325.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_326,name,_328){
if(_326==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_328);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _329=(_328==null);
if(_329){
_326.removeAttribute(name);
}else{
_326.setAttribute(name,_328);
}
if(document.all!=null){
if(_329){
_328="";
}
switch(name.toLowerCase()){
case "class":
_326.className=_328;
break;
case "disabled":
_326.disabled=!_329;
break;
case "checked":
_326.checked=!_329;
break;
case "readonly":
_326.readOnly=!_329;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_32a){
AttributesUpdate.superclass._afterUpdate.call(this,_32a);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_32b,key){
return _32b.replace("${windowkey}",document.location+":"+key);
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
var _32f=this._newDimensions.w!=this._currentDimensions.w;
var _330=this._newDimensions.h!=this._currentDimensions.h;
if(_32f||_330){
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
},fireOnDOM:function(_332){
if(Interfaces.isImplemented(IDOMHandler,_332,true)){
this._ondomstatements.add(_332);
}
},fireOnLoad:function(_333){
if(Interfaces.isImplemented(ILoadHandler,_333,true)){
this._onloadstatements.add(_333);
}
},fireOnResize:function(_334){
if(Interfaces.isImplemented(IResizeHandler,_334,true)){
this._onresizestatements.add(_334);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_335){
return eval(_335);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_336,_337){
SystemLogger.unsuspend(_337);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_338,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _33b=top.app.bindingMap.broadcasterHasDirtyTabs;
_33b.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_33c,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33f=top.app.bindingMap.broadcasterHasDirtyTabs;
_33f.disable();
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
var _340=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_340=LoginService.Logout(true);
if(!_340){
alert("Logout failed.");
}
}
return _340;
},lock:function(_341){
if(_341!=null){
this._lockthings[_341]=true;
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
},unlock:function(_342,_343){
if(_342!=null){
delete this._lockthings[_342];
if(top.bindingMap.mastercover!=null){
if(_343||this._lockers>0){
if(_343){
var out="Unlocked by "+new String(_342)+"\n";
for(var _345 in this._lockthings){
out+="Locked by "+new String(_345)+". ";
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
},hasLock:function(_346){
return this._lockthings[_346]==true;
},activate:function(_347){
var _348=this._activeBinding;
this._activeBinding=_347;
this._activatedBindings.add(_347);
if(_348&&_348.isActive){
_348.deActivate();
}
},deActivate:function(_349){
var _34a=null;
var _34b=null;
if(_349==this._activeBinding){
while(!_34b&&this._activatedBindings.hasEntries()){
_34a=this._activatedBindings.extractLast();
if(_34a!=_349&&_34a.isActivatable){
_34b=_34a;
}
}
if(!_34b){
_34b=app.bindingMap.explorerdock;
}
_34b.activate();
}
},focused:function(_34c){
this.isFocused=_34c;
if(_34c){
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
},handleAction:function(_351){
switch(_351.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _353=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_355){
var src=_355.src;
if(src.indexOf(_353)>-1){
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
var _35a=false;
if(this._isMousePositionTracking){
_35a=true;
if(Client.isExplorer&&e.button!=1){
_35a=false;
}
if(_35a){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _35a;
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
},onDragStart:function(_35c){
var _35d=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_35d,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_35d.getImage());
this._cursorStartPoint=_35c;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_35d.showDrag){
_35d.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_35d.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35f=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35f);
}
},onDragStop:function(diff){
if(this._isDragging){
var _361=BindingDragger.draggedBinding;
if(_361.hideDrag){
_361.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_361.dragType);
this._isDragging=false;
_361=BindingAcceptor.acceptingBinding;
if(_361!=null){
if(Interfaces.isImplemented(IAcceptable,_361,true)==true){
_361.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_361);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_362){
if(this.isDeveloperMode||_362){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_363){
if(_363==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_364){
switch(_364){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_366){
switch(_366.Key){
case "ProductVersion":
this.versionString=_366.Value;
break;
case "ProductTitle":
this.versionPrettyString=_366.Value;
break;
case "InstallationId":
this.installationID=_366.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_366.Value;
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
var _369=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _36a={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36b=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36b){
for(var key in _36b){
_36a[key]=_36b[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_36a);
}
}});
this.getPref=function(key){
var _36e=null;
if(key){
_36e=_36a[key];
}else{
throw "No such preference.";
}
return _36e;
};
this.setPref=function(key,_370){
if(key){
_36a[key]=_370;
}else{
throw "No such preference.";
}
};
function debug(_371){
var _372=_371?"Persisted preferences":"No persisted preferences. Using defaults";
_372+=":\n";
for(var key in _36a){
var pref=_36a[key];
_372+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_369.fine(_372);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _377=null;
if(this.isInitialized==true){
if(this._persistance){
var _378=this._persistance[id];
if(_378){
_377=_378[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _377;
},setPersistedProperty:function(id,prop,_37b){
if(this.isInitialized==true){
if(this._persistance){
if(_37b!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37b);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37c){
switch(_37c){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _37d=top.bindingMap.persistance;
_37d.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37e=top.bindingMap.persistance;
var map=_37e.getPersistanceMap();
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
function StandardEventHandler(doc,_381){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_381;
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
var _385={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_385);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_385);
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
var _38c=UserInterface.getBinding(node);
if(_38c!=null){
_38c.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38c!=null?null:node.parentNode;
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
var _38f=Application.trackMousePosition(e);
if(_38f){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_392){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_392){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_392=true;
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
var _393=KeySetBinding.handleKey(this._contextDocument,e);
if(!_393){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _394=this._contextWindow.frameElement;
if(_394!=null){
var _395=DOMUtil.getParentWindow(_394);
if(_395.standardEventHandler!=null){
_395.standardEventHandler._handleKeyDown(e,_392);
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
var _398=false;
var _399=DOMEvents.getTarget(e);
var name=_399.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_398=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_398;
}
if(_398){
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
StandardEventHandler.prototype.enableNativeKeys=function(_39c){
this._isAllowTabs=(_39c==true?true:false);
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
function Action(_39f,type){
this.target=_39f;
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
function Animation(_3a1){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a2 in _3a1){
this[_3a2]=_3a1[_3a2];
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
Animation.prototype.onstart=function(_3a6){
};
Animation.prototype.onstep=function(_3a7){
};
Animation.prototype.onstop=function(_3a8){
};
Point.isEqual=function(p1,p2){
var _3ab=false;
if(p1&&p2){
_3ab=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3ab;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b0=false;
if(dim1&&dim2){
_3b0=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b0;
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
function BindingAcceptor(_3b7){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b7;
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
var _3b8=new List(this._binding.dragAccept.split(" "));
while(_3b8.hasNext()){
var type=_3b8.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3ba,arg){
var type=arg;
try{
switch(_3ba){
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
function BindingBoxObject(_3bf){
this._domElement=_3bf.getBindingElement();
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
function BindingDragger(_3c1){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c1;
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
BindingDragger.prototype.registerHandler=function(_3c3){
if(Interfaces.isImplemented(IDragHandler,_3c3)==true){
this.handler=_3c3;
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
var _3c6=e.button==(e.target?0:1);
if(_3c6){
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
var _3c8=Application.getMousePosition();
var dx=_3c8.x-this.startPoint.x;
var dy=_3c8.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3cb,e){
switch(_3cb){
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
function BindingParser(_3cd){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3cd;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3ce){
var _3cf=new List();
var xml=BindingParser.XML.replace("${markup}",_3ce);
var doc=XMLParser.parse(_3ce);
if(doc){
var _3d2=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d2);
var node=_3d2.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3cf.add(node);
}
node=node.nextSibling;
}
}
return _3cf;
};
BindingParser.prototype._iterate=function(_3d4,_3d5){
var _3d6=null;
switch(_3d4.nodeType){
case Node.ELEMENT_NODE:
_3d6=this._cloneElement(_3d4);
UserInterface.registerBinding(_3d6);
break;
case Node.TEXT_NODE:
_3d6=this._ownerDocument.createTextNode(_3d4.nodeValue);
break;
}
if(_3d6){
_3d5.appendChild(_3d6);
}
if(_3d6&&_3d4.hasChildNodes()){
var _3d7=_3d4.firstChild;
while(_3d7){
this._iterate(_3d7,_3d6);
_3d7=_3d7.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d8){
var _3d9=DOMUtil.createElementNS(_3d8.namespaceURI?_3d8.namespaceURI:Constants.NS_XHTML,_3d8.nodeName,this._ownerDocument);
var i=0;
while(i<_3d8.attributes.length){
var attr=_3d8.attributes.item(i++);
_3d9.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d9;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3dc){
var _3dd=null;
var _3de=false;
var _3df=_3dc.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3dc)){
var _3e0=UserInterface.getBinding(_3dc);
_3de=BindingSerializer.activeInstance.indexBinding(_3e0);
if(_3de){
_3dd=_3e0.key;
_3dc.setAttribute(BindingSerializer.KEYPOINTER,_3dd);
}
}
_3dd=_3dd?_3dd:_3df;
var _3e1=new List(_3dc.childNodes);
_3e1.each(function(_3e2){
if(_3e2.nodeType==Node.ELEMENT_NODE){
_3e2.setAttribute(BindingSerializer.KEYPOINTER,_3dd);
}
});
if(_3de){
BindingSerializer.activeInstance.append(_3dd,_3df);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e3){
BindingSerializer.activeInstance=this;
_3e3.bindingWindow.ElementIterator.iterate(_3e3.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e4){
var _3e5=false;
var _3e6=_3e4.serialize();
if(_3e6!=false){
_3e5=true;
var _3e7="ui:"+DOMUtil.getLocalName(_3e4.bindingElement);
var _3e8=DOMUtil.createElementNS(Constants.NS_UI,_3e7,this._dom);
this._pointers[_3e4.key]=_3e8;
for(var prop in _3e6){
if(_3e6[prop]!=null){
_3e8.setAttribute(prop,String(_3e6[prop]));
}
}
}
return _3e5;
};
BindingSerializer.prototype.append=function(_3ea,_3eb){
var _3ec=this._pointers[_3ea];
var _3ed=_3eb?this._pointers[_3eb]:this._dom;
_3ed.appendChild(_3ec);
};
function ImageProfile(_3ee){
this._default=_3ee.image;
this._hover=_3ee.imageHover;
this._active=_3ee.imageActive;
this._disabled=_3ee.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3ef){
this._default=_3ef;
};
ImageProfile.prototype.getHoverImage=function(){
return this._default;
};
ImageProfile.prototype.setHoverImage=function(_3f0){
this._hover=_3f0;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f1){
this._active=_3f1;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._default;
};
ImageProfile.prototype.setDisabledImage=function(_3f2){
this._disabled=_3f2;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f3,_3f4,_3f5){
var _3f6=null;
if(_3f3.isAttached){
_3f6=new List();
var _3f7=_3f5?_3f3.getChildElementsByLocalName(_3f4):_3f3.getDescendantElementsByLocalName(_3f4);
_3f7.each(function(_3f8){
var _3f9=UserInterface.getBinding(_3f8);
if(_3f9){
_3f6.add(_3f9);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f3.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f6;
},getAncestorBindingByType:function(_3fb,impl,_3fd){
var _3fe=null;
if(Binding.exists(_3fb)){
var node=_3fb.bindingElement;
while(_3fe==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _400=UserInterface.getBinding(node);
if(_400 instanceof impl){
_3fe=_400;
}
}else{
if(_3fd&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fe;
},getAncestorBindingByLocalName:function(_402,_403,_404){
var _405=null;
if(_403=="*"){
var node=_402.bindingElement;
while(!_405&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_405=UserInterface.getBinding(node);
}
}
}else{
_405=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_403,_402.bindingElement,_404));
}
return _405;
},getChildElementsByLocalName:function(_407,_408){
var _409=new List();
var _40a=new List(_407.bindingElement.childNodes);
_40a.each(function(_40b){
if(_40b.nodeType==Node.ELEMENT_NODE){
if(_408=="*"||DOMUtil.getLocalName(_40b)==_408){
_409.add(_40b);
}
}
});
return _409;
},getChildBindingByType:function(_40c,impl){
var _40e=null;
_40c.getChildElementsByLocalName("*").each(function(_40f){
var _410=UserInterface.getBinding(_40f);
if(_410!=null&&_410 instanceof impl){
_40e=_410;
return false;
}else{
return true;
}
});
return _40e;
},getDescendantBindingByType:function(_411,impl){
var _413=null;
_411.getDescendantElementsByLocalName("*").each(function(_414){
var _415=UserInterface.getBinding(_414);
if(_415!=null&&_415 instanceof impl){
_413=_415;
return false;
}else{
return true;
}
});
return _413;
},getDescendantBindingsByType:function(_416,impl){
var _418=new List();
_416.getDescendantElementsByLocalName("*").each(function(_419){
var _41a=UserInterface.getBinding(_419);
if(_41a!=null&&_41a instanceof impl){
_418.add(_41a);
}
return true;
});
return _418;
},getNextBindingByLocalName:function(_41b,name){
var _41d=null;
var _41e=_41b.bindingElement;
while((_41e=DOMUtil.getNextElementSibling(_41e))!=null&&DOMUtil.getLocalName(_41e)!=name){
}
if(_41e!=null){
_41d=UserInterface.getBinding(_41e);
}
return _41d;
},getPreviousBindingByLocalName:function(_41f,name){
var _421=null;
var _422=_41f.bindingElement;
while((_422=DOMUtil.getPreviousElementSibling(_422))!=null&&DOMUtil.getLocalName(_422)!=name){
}
if(_422!=null){
_421=UserInterface.getBinding(_422);
}
return _421;
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
},addFilter:function(_423){
this._filters.add(_423);
},removeFilter:function(_424){
var _425=-1;
this._filters.each(function(fil){
_425++;
var _427=true;
if(fil==_424){
_427=false;
}
return _427;
});
if(_425>-1){
this._filters.del(_425);
}
},_applyFilters:function(node,arg){
var _42a=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42d=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42e=true;
while(this._filters.hasNext()&&_42e==true){
var _42f=this._filters.getNext();
var res=_42f.call(this,node,arg);
if(res!=null){
_42a=res;
switch(res){
case stop:
case skip:
case skip+_42d:
_42e=false;
break;
}
}
}
return _42a;
},crawl:function(_431,arg){
this.contextDocument=_431.ownerDocument;
this.onCrawlStart();
var _433=this.type==NodeCrawler.TYPE_ASCENDING;
var _434=this._applyFilters(_431,arg);
if(_434!=NodeCrawler.STOP_CRAWLING){
if(_433&&_434==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_433?_431.parentNode:_431;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_436,arg){
var _438=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_438=this._crawlDescending(_436,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_438=this._crawlAscending(_436,arg);
break;
}
return _438;
},_crawlDescending:function(_439,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43c=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43e=null;
if(_439.hasChildNodes()){
var node=_439.firstChild;
while(node!=null&&_43e!=stop){
this.currentNode=node;
_43e=this._applyFilters(node,arg);
switch(_43e){
case stop:
case _43c:
case skip+_43c:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43e=stop;
break;
}
}
}
if(_43e!=stop&&_43e!=skip){
this.previousNode=node;
}
break;
}
if(_43e!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43e;
},_crawlAscending:function(_441,arg){
var _443=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_441!=null){
this.currentNode=_441;
_443=this._applyFilters(_441,arg);
if(_443!=stop){
var next=this.nextNode?this.nextNode:_441.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_441;
_443=this._crawl(next,arg);
}
}
}else{
_443=stop;
}
return _443;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _447 in this){
this[_447]=null;
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
var _44a=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44a=NodeCrawler.SKIP_NODE;
}
return _44a;
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
this.addFilter(function(_44b,arg){
var _44d=null;
if(!UserInterface.hasBinding(_44b)){
_44d=NodeCrawler.SKIP_NODE;
}
return _44d;
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
this.addFilter(function(_44f,arg){
var _451=null;
var _452=UserInterface.getBinding(_44f);
if(Interfaces.isImplemented(ICrawlerHandler,_452)==true){
self.response=null;
_452.handleCrawler(self);
_451=self.response;
}
return _451;
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
this.addFilter(function(_454,list){
var _456=null;
var _457=UserInterface.getBinding(_454);
if(Interfaces.isImplemented(IFlexible,_457)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_457);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_457.isFlexSuspended==true){
_456=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_457);
}
break;
}
}
return _456;
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
this.addFilter(function(_458,list){
var _45a=null;
var _45b=UserInterface.getBinding(_458);
if(_45b.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_45b)==true){
if(_45b.isFocusable&&_45b.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_45b);
break;
case FocusCrawler.MODE_FOCUS:
if(!_45b.isFocused){
_45b.focus();
}
_45a=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_45b.isFocused==true){
_45b.blur();
_45a=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45a;
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
this.addFilter(function(_45c,list){
var _45e=null;
var _45f=UserInterface.getBinding(_45c);
if(!_45f.isVisible){
_45e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45e;
});
this.addFilter(function(_460,list){
var _462=null;
var _463=UserInterface.getBinding(_460);
if(_463.isAttached){
if(Interfaces.isImplemented(IFit,_463)){
if(!_463.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_463);
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
UpdateAssistant.serialize=function(_464){
_464=_464.cloneNode(true);
_464.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_464.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_464);
};
}
},handleEvent:function(e){
var _466=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_466);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_466);
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
},_beforeUpdate:function(_467){
var _468=(_467==document.documentElement);
if(_468){
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
var _46b=FocusBinding.focusedBinding;
if(_46b!=null){
this._focusID=_46b.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_467.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_467);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_467,false);
break;
}
}
},_afterUpdate:function(_46c){
var _46d=(_46c==document.documentElement);
if(_46d){
var _46e=this._elementsbuffer;
if(_46e.hasEntries()){
_46e.each(function(_46f){
DocumentManager.attachBindings(_46f);
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
var _472=FocusBinding.focusedBinding;
if(_472==null){
var _473=document.getElementById(this._focusID);
if(_473!=null){
var _472=UserInterface.getBinding(_473);
if(_472!=null){
_472.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _474=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _475="NEW DOM: "+document.title+"\n\n"+_474+"\n\n";
_475+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_475);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46c.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_46c);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46c,true);
break;
}
switch(_46c.id){
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
var _472=UserInterface.getBinding(_46c);
while(_472==null&&_46c!=null){
_472=UserInterface.getBinding(_46c);
_46c=_46c.parentNode;
}
if(_472!=null){
_472.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_477,_478){
var _479=UserInterface.getBinding(_477);
if(_479!=null){
if(_478){
var _47a=this._attributesbuffer;
var map=new Map();
_47a.each(function(name,old){
var now=_477.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_477.attributes).each(function(att){
if(att.specified){
if(!_47a.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_481){
var _482=_479.propertyMethodMap[name];
if(_482!=null){
_482.call(_479,_481);
}
});
}else{
var map=new Map();
new List(_477.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_484,_485){
var _486=window.bindingMap[_484.getAttribute("id")];
if(_486!=null){
return _486.handleElement(_484,_485);
}
},updateElement:function(_487,_488){
var _489=window.bindingMap[_487.getAttribute("id")];
if(_489!=null){
return _489.updateElement(_487,_488);
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
this.addFilter(function(_48b,list){
var _48d=UserInterface.getBinding(_48b);
var _48e=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48d==null){
UserInterface.registerBinding(_48b);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48d!=null){
if(!_48d.isAttached){
list.add(_48d);
}
if(_48d.isLazy==true){
_48e=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48d!=null){
list.add(_48d);
}
break;
}
return _48e;
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
},handleBroadcast:function(_48f,arg){
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
var _492=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_492)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_492!=null){
if(_492.href!=null&&_492.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _493=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_493!=null){
var map={};
var _495=DOMUtil.getElementsByTagName(_493,"bindingmapping");
new List(_495).each(function(_496){
var _497=_496.getAttribute("element");
var _498=_496.getAttribute("binding");
map[_497]=eval(_498);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_499){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_499;
}else{
this.customUserInterfaceMapping.merge(_499);
}
},_registerBindings:function(_49a){
var _49b=new DocumentCrawler();
_49b.mode=DocumentCrawler.MODE_REGISTER;
_49b.crawl(_49a);
_49b.dispose();
},_attachBindings:function(_49c){
var _49d=new DocumentCrawler();
_49d.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49d.crawl(_49c,list);
var _49f=false;
while(list.hasNext()){
var _4a0=list.getNext();
if(!_4a0.isAttached){
_4a0.onBindingAttach();
if(!_4a0.memberDependencies){
_4a0.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a0)){
_49f=true;
}
}
}
if(_49f){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49d.dispose();
list.dispose();
},attachBindings:function(_4a2){
this._registerBindings(_4a2);
this._attachBindings(_4a2);
},detachBindings:function(_4a3,_4a4){
var _4a5=new DocumentCrawler();
_4a5.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a5.crawl(_4a3,list);
if(_4a4==true){
list.extractFirst();
}
var _4a7=false;
list.reverse().each(function(_4a8){
if(Interfaces.isImplemented(IData,_4a8)){
_4a7=true;
}
_4a8.dispose(true);
});
if(_4a7){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a5.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4aa){
return (/textarea|input/.test(DOMUtil.getLocalName(_4aa)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4ab){
this.isDirty=true;
var _4ac=false;
if(_4ab!=null&&!_4ab.isDirty){
_4ab.isDirty=true;
_4ab.dispatchAction(Binding.ACTION_DIRTY);
_4ac=true;
}
return _4ac;
},clean:function(_4ad){
if(_4ad.isDirty){
_4ad.isDirty=false;
}
},registerDataBinding:function(name,_4af){
if(Interfaces.isImplemented(IData,_4af,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4af;
}
}else{
throw "Invalid DataBinding: "+_4af;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b2=null;
if(this._dataBindings[name]!=null){
_4b2=this._dataBindings[name];
}
return _4b2;
},getAllDataBindings:function(_4b3){
var list=new List();
for(var name in this._dataBindings){
var _4b6=this._dataBindings[name];
list.add(_4b6);
if(_4b3&&_4b6 instanceof WindowBinding){
var _4b7=_4b6.getContentWindow().DataManager;
if(_4b7!=null){
list.merge(_4b7.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b8=false;
for(var name in this._dataBindings){
_4b8=true;
break;
}
return _4b8;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4bc){
var _4bd=this._dataBindings[name];
if(_4bd!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4bd.setResult(_4bc);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4bd);
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
var _4be=new DataBindingMap();
_4be.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c0=this._dataBindings[name];
if(_4c0 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4be[name]=_4c0.getValue();
}
return _4be;
},getDataBindingResultMap:function(){
var _4c1=new DataBindingMap();
_4c1.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c3=this._dataBindings[name];
var res=_4c3.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c6){
_4c1.set(name,_4c6);
});
}else{
_4c1.set(name,res);
}
}
return _4c1;
},getPostBackString:function(){
var _4c7="";
var form=document.forms[0];
if(form!=null){
var _4c9="";
new List(form.elements).each(function(_4ca){
var name=_4ca.name;
var _4cc=encodeURIComponent(_4ca.value);
switch(_4ca.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c7+=name+"="+_4cc+"&";
break;
case "submit":
if(document.activeElement==_4ca){
_4c7+=name+"="+_4cc+"&";
}
break;
case "radio":
if(_4ca.checked){
_4c7+=name+"="+_4cc+"&";
}
break;
case "checkbox":
if(_4ca.checked){
if(_4ca.name==_4c9){
if(_4c7.lastIndexOf("&")==_4c7.length-1){
_4c7=_4c7.substr(0,_4c7.length-1);
}
_4c7+=","+_4cc;
}else{
_4c7+=name+"="+_4ca.value;
}
_4c9=name;
_4c7+="&";
}
break;
}
});
}
return _4c7.substr(0,_4c7.length-1);
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
var _4d5=null;
var _4d6=null;
var _4d7=false;
if(!this._cache[name]){
_4d7=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d9=DOMUtil.getXMLHTTPRequest();
_4d9.open("get",uri,false);
_4d9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d9.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d6=_4d9.responseText;
break;
default:
_4d6=_4d9.responseXML;
break;
}
if(_4d6==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d6;
}
}
_4d6=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d5=_4d6;
break;
case this._modes.MODE_DOCUMENT:
_4d5=DOMUtil.cloneNode(_4d6,true);
break;
case this._modes.MODE_ELEMENT:
_4d5=DOMUtil.cloneNode(_4d6.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d5=DOMSerializer.serialize(_4d6,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d5=DOMSerializer.serialize(_4d6.documentElement,true);
break;
}
if(_4d7&&Application.isDeveloperMode){
}
return _4d5;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4dc){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4dc];
},invoke:function(url,_4de,_4df){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e1,_4e2){
var _4e3=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e1,argument:_4e2});
StageBinding.presentViewDefinition(_4e3);
return _4e3;
},invokeDefinition:function(_4e4){
if(_4e4 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e4);
}
return _4e4;
},question:function(_4e5,text,_4e7,_4e8){
if(!_4e7){
_4e7=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e5,text,_4e7,_4e8);
},message:function(_4e9,text,_4eb,_4ec){
if(!_4eb){
_4eb=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e9,text,_4eb,_4ec);
},error:function(_4ed,text,_4ef,_4f0){
if(!_4ef){
_4ef=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ed,text,_4ef,_4f0);
},warning:function(_4f1,text,_4f3,_4f4){
if(!_4f3){
_4f3=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f1,text,_4f3,_4f4);
},_standardDialog:function(type,_4f6,text,_4f8,_4f9){
var _4fa=null;
if(!_4f8){
_4fa=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4fa=new List();
new List(_4f8).each(function(_4fb){
var _4fc=null;
switch(typeof _4fb){
case "object":
_4fc=_4fb;
break;
case "string":
var _4fd=false;
if(_4fb.indexOf(":")>-1){
_4fb=_4fb.split(":")[0];
_4fd=true;
}
_4fc=Dialog.dialogButton(_4fb);
if(_4fd){
_4fc.isDefault=true;
}
break;
}
_4fa.add(_4fc);
});
}
var _4fe={title:_4f6,text:text,type:type,image:this._dialogImages[type],buttons:_4fa};
var _4ff=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f9,argument:_4fe});
StageBinding.presentViewDefinition(_4ff);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_501,arg){
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
},saveAll:function(_504){
var self=this;
var _506=Application.getDirtyDockTabsTabs();
if(_506.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_507,_508){
switch(_507){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_508,_504);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_506);
}else{
if(_504){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_509,_50a){
var _50b=false;
var list=new List();
_509.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_50b=true;
var _50f=list.getLength();
var _510={handleBroadcast:function(_511,tab){
if(--_50f==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50a){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_510);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _50b;
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
var _515="Composite.Management.Help";
if(!StageBinding.isViewOpen(_515)){
StageBinding.handleViewPresentation(_515);
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
var _517=document.createEvent("Events");
_517.initEvent(type,true,true);
window.dispatchEvent(_517);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _519=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51a=_519.exec(url?url:"");
if(_51a){
if(_51a[3]=="media"){
this.isMedia=true;
}else{
if(_51a[3]=="page"){
this.isPage=true;
}
}
}
var _51b={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_51b[$1]=$3;
});
this.queryString=_51b;
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
Uri.prototype.setParam=function(key,_524){
if(_524==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_524;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _526=[];
for(var key in this.queryString){
_526.push(key+"="+this.queryString[key]);
}
if(_526.length>0){
url+="?"+_526.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_528,_529){
var _52a=null;
var _52b=ViewDefinitions[_528];
if(_52b.isMutable){
var impl=null;
if(_52b instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_529!=null&&impl!=null){
var def=new impl();
for(var prop in _52b){
def[prop]=ViewDefinition.cloneProperty(_52b[prop]);
}
def.handle=_529;
_52a=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _52a;
};
ViewDefinition.cloneProperty=function(_52f){
if(null==_52f){
return _52f;
}
if(typeof _52f==="object"){
var _530=(_52f.constructor===Array)?[]:{};
for(var prop in _52f){
_530[prop]=ViewDefinition.cloneProperty(_52f[prop]);
}
return _530;
}
return _52f;
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
Binding.evaluate=function(_537,_538){
var _539=null;
var _53a=_538.bindingWindow.WindowManager;
if(_53a!=null){
var _53b=Binding.parseScriptStatement(_537,_538.key);
_539=_53a.evaluate(_53b);
}
return _539;
};
Binding.parseScriptStatement=function(_53c,key){
if(_53c!=null&&key!=null){
var _53e="UserInterface.getBindingByKey ( \""+key+"\" )";
_53c=_53c.replace(/(\W|^)this(,| +|\)|;)/g,_53e);
_53c=_53c.replace(/(\W|^)this(\.)/g,_53e+".");
}
return _53c;
};
Binding.exists=function(_53f){
var _540=false;
try{
if(_53f&&_53f.bindingElement&&_53f.bindingElement.nodeType&&_53f.isDisposed==false){
_540=true;
}
}
catch(accessDeniedException){
_540=false;
}
finally{
return _540;
}
};
Binding.destroy=function(_541){
if(!_541.isDisposed){
if(_541.acceptor!=null){
_541.acceptor.dispose();
}
if(_541.dragger!=null){
_541.disableDragging();
}
if(_541.boxObject!=null){
_541.boxObject.dispose();
}
if(_541._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_541);
}
for(var _542 in _541.shadowTree){
var _543=_541.shadowTree[_542];
if(_543 instanceof Binding&&Binding.exists(_543)){
_543.dispose(true);
}
_541.shadowTree[_542]=null;
}
_541.isDisposed=true;
_541=null;
}
};
Binding.dotnetify=function(_544,_545){
var _546=_544.getCallBackID();
if(_546!=null){
var _547=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_544.bindingDocument);
_547.type="hidden";
_547.id=_546;
_547.name=_546;
_547.value=_545!=null?_545:"";
_544.bindingElement.appendChild(_547);
_544.shadowTree.dotnetinput=_547;
}else{
throw _544.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_548){
var _549=_548.getProperty("image");
var _54a=_548.getProperty("image-hover");
var _54b=_548.getProperty("image-active");
var _54c=_548.getProperty("image-disabled");
if(_548.imageProfile==null){
if(_548.image==null&&_549!=null){
_548.image=_549;
}
if(_548.imageHover==null&&_54a!=null){
_548.imageHover=_54a;
}
if(_548.imageActive==null&&_54b!=null){
_548.imageActive=_54b;
}
if(_548.imageDisabled==null&&_54c!=null){
_548.imageDisabled=_54c;
}
if(_548.image||_548.imageHover||_548.imageActive||_548.imageDisabled){
_548.imageProfile=new ImageProfile(_548);
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
var _54e=this.dependentBindings[key];
_54e.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54f){
if(_54f){
this.memberDependencies[_54f.key]=true;
var _550=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_550=false;
break;
}
}
if(_550){
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
Binding.prototype.detachRecursive=function(_552){
if(_552==null){
_552=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_552);
};
Binding.prototype.addMember=function(_553){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_553.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_553.key]=false;
_553.registerDependentBinding(this);
}
}
return _553;
};
Binding.prototype.addMembers=function(_554){
while(_554.hasNext()){
var _555=_554.getNext();
if(!_555.isInitialized){
this.addMember(_555);
}
}
return _554;
};
Binding.prototype.registerDependentBinding=function(_556){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_556.key]=_556;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _557=this.getProperty("persist");
if(_557&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _559=new List(_557.split(" "));
while(_559.hasNext()){
var prop=_559.getNext();
var _55b=Persistance.getPersistedProperty(id,prop);
if(_55b!=null){
this._persist[prop]=_55b;
this.setProperty(prop,_55b);
}else{
_55b=this.getProperty(prop);
if(_55b!=null){
this._persist[prop]=_55b;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _55c=this.getProperty("disabled");
var _55d=this.getProperty("contextmenu");
var _55e=this.getProperty("observes");
var _55f=this.getProperty("onattach");
var _560=this.getProperty("hidden");
var _561=this.getProperty("blockactionevents");
if(_560==true&&this.isVisible==true){
this.hide();
}
if(_55c&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55d){
this.setContextMenu(_55d);
}
if(_55e){
this.observe(this.getBindingForArgument(_55e));
}
if(_561==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55f!=null){
Binding.evaluate(_55f,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _563=this.getProperty("draggable");
var _564=this.getProperty("dragtype");
var _565=this.getProperty("dragaccept");
var _566=this.getProperty("dragreject");
if(_563!=null){
this.isDraggable=_563;
}
if(_564!=null){
this.dragType=_564;
if(_563!=false){
this.isDraggable=true;
}
}
if(_565!=null){
this.dragAccept=_565;
}
if(_566!=null){
this.dragReject=_566;
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
Binding.prototype._updateBindingMap=function(_567){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _56a=null;
if(_567){
_56a=map[id];
if(_56a!=null&&_56a!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_56a=map[id];
if(_56a!=null&&_56a==this){
delete map[id];
}
}
}else{
var _56c=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_567);
if(Application.isDeveloperMode==true){
alert(_56c);
}else{
this.logger.error(_56c);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56e){
};
Binding.prototype.handleBroadcast=function(_56f,arg){
};
Binding.prototype.handleElement=function(_571){
return false;
};
Binding.prototype.updateElement=function(_572){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _574=null;
switch(typeof arg){
case "object":
_574=arg;
break;
case "string":
_574=this.bindingDocument.getElementById(arg);
if(_574==null){
_574=Binding.evaluate(arg,this);
}
break;
}
if(_574!=null&&_574.nodeType!=null){
_574=UserInterface.getBinding(_574);
}
return _574;
};
Binding.prototype.serialize=function(){
var _575={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_575.id=id;
}
var _577=this.getProperty("binding");
if(_577){
_575.binding=_577;
}
return _575;
};
Binding.prototype.serializeToString=function(){
var _578=null;
if(this.isAttached){
_578=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _578;
};
Binding.prototype.subTreeFromString=function(_579){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_579);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57a){
var _57b=this.bindingElement.getAttribute(_57a);
if(_57b){
_57b=Types.castFromString(_57b);
}
return _57b;
};
Binding.prototype.setProperty=function(prop,_57d){
if(_57d!=null){
_57d=_57d.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57d){
this.bindingElement.setAttribute(prop,_57d);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57d!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57d;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57d);
}
}
var _57e=this.propertyMethodMap[prop];
if(_57e){
_57e.call(this,this.getProperty(prop));
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
var _580=null;
if(Binding.exists(this)){
_580=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _580;
};
Binding.prototype.attachClassName=function(_581){
CSSUtil.attachClassName(this.bindingElement,_581);
};
Binding.prototype.detachClassName=function(_582){
CSSUtil.detachClassName(this.bindingElement,_582);
};
Binding.prototype.hasClassName=function(_583){
return CSSUtil.hasClassName(this.bindingElement,_583);
};
Binding.prototype.addActionListener=function(type,_585){
_585=_585!=null?_585:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_585)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_585);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_585+")");
}
};
Binding.prototype.removeActionListener=function(type,_587){
_587=_587?_587:this;
if(Action.isValid(type)){
var _588=this.actionListeners[type];
if(_588){
var i=0,_58a;
while((_58a=_588[i])!=null){
if(_58a==_587){
_588.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58c){
_58c=_58c?_58c:this;
DOMEvents.addEventListener(this.bindingElement,type,_58c);
};
Binding.prototype.removeEventListener=function(type,_58e){
_58e=_58e?_58e:this;
DOMEvents.removeEventListener(this.bindingElement,type,_58e);
};
Binding.prototype.subscribe=function(_58f){
if(!this.hasSubscription(_58f)){
this._subscriptions.set(_58f,true);
EventBroadcaster.subscribe(_58f,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_58f);
}
};
Binding.prototype.unsubscribe=function(_590){
if(this.hasSubscription(_590)){
this._subscriptions.del(_590);
EventBroadcaster.unsubscribe(_590,this);
}
};
Binding.prototype.hasSubscription=function(_591){
return this._subscriptions.has(_591);
};
Binding.prototype.observe=function(_592,_593){
_592.addObserver(this,_593);
};
Binding.prototype.unObserve=function(_594,_595){
_594.removeObserver(this,_595);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _599={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_599);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_599);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _59c=false;
var _59d=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_59d=setTimeout(function(){
self.handleContextEvent(e);
},800);
_59c=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_59c){
clearTimeout(_59d);
_59c=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_59c){
clearTimeout(_59d);
_59c=false;
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
var _5a3=null;
var _5a4=null;
var _5a5=false;
if(arg instanceof Action){
_5a3=arg;
}else{
if(Action.isValid(arg)){
_5a3=new Action(this,arg);
_5a5=true;
}
}
if(_5a3!=null&&Action.isValid(_5a3.type)==true){
if(_5a3.isConsumed==true){
_5a4=_5a3;
}else{
var _5a6=this.actionListeners[_5a3.type];
if(_5a6!=null){
_5a3.listener=this;
var i=0,_5a8;
while((_5a8=_5a6[i++])!=null){
if(_5a8&&_5a8.handleAction){
_5a8.handleAction(_5a3);
}
}
}
var _5a9=true;
if(this.isBlockingActions==true){
switch(_5a3.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a5){
_5a9=false;
}
break;
}
}
if(_5a9){
_5a4=this.migrateAction(_5a3);
}else{
_5a4=_5a3;
}
}
}
return _5a4;
};
Binding.prototype.migrateAction=function(_5aa){
var _5ab=null;
var _5ac=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5ab&&node.nodeType!=Node.DOCUMENT_NODE){
_5ab=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5ab){
_5ac=_5ab.dispatchAction(_5aa);
}else{
_5ac=_5aa;
}
}
return _5ac;
};
Binding.prototype.reflex=function(_5ae){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ae);
}
};
Binding.prototype.getMigrationParent=function(){
var _5af=null;
if(true){
try{
var _5b0=this.bindingElement.parentNode;
if(_5b0!=null){
_5af=_5b0;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5af=null;
}
}
return _5af;
};
Binding.prototype.add=function(_5b1){
if(_5b1.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5b1.bindingElement);
}else{
throw "Could not add "+_5b1.toString()+" of different document origin.";
}
return _5b1;
};
Binding.prototype.addFirst=function(_5b2){
if(_5b2.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b2.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b2.toString()+" of different document origin.";
}
return _5b2;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b3,_5b4){
return BindingFinder.getAncestorBindingByLocalName(this,_5b3,_5b4);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b6){
return BindingFinder.getAncestorBindingByType(this,impl,_5b6);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b8){
return BindingFinder.getChildElementsByLocalName(this,_5b8);
};
Binding.prototype.getChildElementByLocalName=function(_5b9){
return this.getChildElementsByLocalName(_5b9).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5ba){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5ba));
};
Binding.prototype.getChildBindingsByLocalName=function(_5bb){
return this.getDescendantBindingsByLocalName(_5bb,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5bc){
return this.getChildBindingsByLocalName(_5bc).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5bd,_5be){
return BindingFinder.getDescendantBindingsByLocalName(this,_5bd,_5be);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5bf){
return this.getDescendantBindingsByLocalName(_5bf,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c2){
return BindingFinder.getNextBindingByLocalName(this,_5c2);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c3){
return BindingFinder.getPreviousBindingByLocalName(this,_5c3);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c4){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c4);
};
Binding.prototype.isFirstBinding=function(_5c5){
return (this.getOrdinalPosition(_5c5)==0);
};
Binding.prototype.isLastBinding=function(_5c6){
return DOMUtil.isLastElement(this.bindingElement,_5c6);
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
Binding.prototype.setCallBackArg=function(_5c8){
this.setProperty(Binding.CALLBACKARG,_5c8);
};
Binding.prototype.dispose=function(_5c9){
if(!this.isDisposed){
if(!_5c9){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5ca=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5ca){
if(Client.isExplorer){
_5ca.outerHTML="";
}else{
_5ca.parentNode.removeChild(_5ca);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5cd){
list.add(_5cd);
});
list.each(function(_5ce){
self.unsubscribe(_5ce);
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
Binding.prototype.wakeUp=function(_5d0,_5d1){
_5d1=_5d1?_5d1:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d0!==undefined){
self[_5d0]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5d1);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d3){
if(_5d3.response==null&&this.isLazy==true){
if(_5d3.id==DocumentCrawler.ID&&_5d3.mode==DocumentCrawler.MODE_REGISTER){
_5d3.response=NodeCrawler.NORMAL;
}else{
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d3.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d3.id)){
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d3.response==null){
switch(_5d3.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d4){
var _5d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d4);
return UserInterface.registerBinding(_5d5,Binding);
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
var _5d6=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d6.each(function(_5d7){
DataBinding.expressions[_5d7.Key]=new RegExp(_5d7.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d8){
var _5d9=null;
var _5da=_5d8.getAncestorBindingByLocalName("field");
if(_5da&&_5da instanceof FieldBinding){
var desc=_5da.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d9=desc.getLabel();
}
}
return _5d9;
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
var _5dd=this.bindingWindow.DataManager;
_5dd.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5df=this.bindingWindow.DataManager;
if(_5df.getDataBinding(name)){
_5df.unRegisterDataBinding(name);
}
_5df.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5e0,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e0,arg);
var _5e2=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e0){
case _5e2:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e2);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e3){
var _5e4=_5e3?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e3!=this.isActivated){
this.isActivated=_5e3;
this.dispatchAction(_5e4);
var _5e5=new List();
var self=this;
this._activationawares.each(function(_5e7){
if(_5e7.isActivationAware){
try{
if(_5e3){
if(!_5e7.isActivated){
_5e7.onActivate();
}
}else{
if(_5e7.isActivated){
_5e7.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e5.add(_5e7);
}
}
});
_5e5.each(function(_5e8){
this._activationawares.del(_5e8);
});
_5e5.dispose();
}else{
var _5e9="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e9);
}else{
this.logger.error(_5e9);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ea,_5eb){
if(Interfaces.isImplemented(IActivationAware,_5ea,true)==true){
if(_5eb==false){
this._activationawares.del(_5ea);
}else{
this._activationawares.add(_5ea);
if(this.isActivated==true){
_5ea.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ea+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ec){
var _5ed=this.getMigrationParent();
if(_5ed!=null){
var root=_5ed.ownerDocument.body;
var _5ef=UserInterface.getBinding(root);
if(_5ef!=null){
_5ef.makeActivationAware(this,_5ec);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f0){
RootBinding.superclass.handleCrawler.call(this,_5f0);
if(_5f0.type==NodeCrawler.TYPE_ASCENDING){
_5f0.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5f1=null;
if(this.bindingWindow.parent){
_5f1=this.bindingWindow.frameElement;
}
return _5f1;
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
StyleBinding.prototype.handleElement=function(_5f2){
return true;
};
StyleBinding.prototype.updateElement=function(_5f3){
var href=_5f3.getAttribute("link");
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
FlexBoxBinding.reflex=function(_5f5,_5f6){
var list=new List();
var _5f8=new FlexBoxCrawler();
_5f8.mode=_5f6?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5f8.startBinding=_5f5;
_5f8.crawl(_5f5.bindingElement,list);
list.each(function(_5f9){
_5f9.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fa){
if(Binding.exists(_5fa)){
_5fa.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fb){
if(Binding.exists(_5fb)){
_5fb.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5f8.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5fc){
FlexBoxBinding.superclass.handleAction.call(this,_5fc);
switch(_5fc.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5fd){
var _5fe=0;
var _5ff=new List(this.bindingElement.parentNode.childNodes);
while(_5ff.hasNext()){
var _600=_5ff.getNext();
if(_600.nodeType==Node.ELEMENT_NODE&&_600!=this.bindingElement){
if(!this._isOutOfFlow(_600)){
var rect=_600.getBoundingClientRect();
if(_5fd){
height+=(rect.right-rect.left);
}else{
_5fe+=(rect.bottom-rect.top);
}
}
}
}
return _5fe;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_602){
var _603=CSSComputer.getPosition(_602);
var _604=CSSComputer.getFloat(_602);
return (_603=="absolute"||_604!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _605=this.bindingElement.parentNode;
var rect=_605.getBoundingClientRect();
var _607=rect.bottom-rect.top;
var _608=CSSComputer.getPadding(_605);
var _609=CSSComputer.getBorder(_605);
_607-=(_608.top+_608.bottom);
_607-=(_609.top+_609.bottom);
return _607;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60a=this.bindingElement.parentNode;
var rect=_60a.getBoundingClientRect();
var _60c=rect.right-rect.left;
var _60d=CSSComputer.getPadding(_60a);
var _60e=CSSComputer.getBorder(_60a);
_60c-=(_60d.left+_60d.right);
_60c-=(_60e.left+_60e.right);
return _60c;
};
FlexBoxBinding.prototype.setFlexibility=function(_60f){
if(_60f!=this.isFlexible){
if(_60f){
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
this.isFlexible=_60f;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _610=this._getSiblingsSpan();
_610=this._getCalculatedHeight()-_610;
if(!isNaN(_610)&&_610>=0){
this.bindingElement.style.height=String(_610)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_611){
if(!this.isFit||_611){
var _612=0;
new List(this.bindingElement.childNodes).each(function(_613){
if(_613.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_613)){
var rect=_613.getBoundingClientRect();
_612+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_612);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_615){
var _616=CSSComputer.getPadding(this.bindingElement);
var _617=CSSComputer.getBorder(this.bindingElement);
_615+=_616.top+_616.bottom;
_615+=_617.top+_617.bottom;
this.bindingElement.style.height=_615+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_618){
ScrollBoxBinding.superclass.handleAction.call(this,_618);
switch(_618.type){
case BalloonBinding.ACTION_INITIALIZE:
_618.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_619){
this.bindingElement.scrollLeft=_619.x;
this.bindingElement.scrollTop=_619.y;
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
var _61a=this,_61b=document.createElement("x");
_61b.innerHTML=_61a.responseText;
var uses=_61b.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _621=_61b.querySelector("#"+hash);
if(_621){
var _622=_621.cloneNode(true);
_622.id=def.id;
def.parentNode.replaceChild(_622,def);
}
}
LabelBinding.sprites=_61b;
LabelBinding.spriteLoading=false;
LabelBinding.spritesQueue.each(function(key,_624){
var _625=UserInterface.getBindingByKey(key);
if(_625!=null){
LabelBinding.setImageSvg(_625,_624);
}
});
LabelBinding.spritesQueue.empty();
}
if(!LabelBinding.spriteLoading){
LabelBinding.spriteLoading=true;
var _626=new XMLHttpRequest();
_626.open("GET",Resolver.resolve(LabelBinding.SPRITE_PATH));
_626.onload=onspriteload;
_626.send();
}
};
LabelBinding.setImageSvg=function(_627,_628){
if(typeof _628=="string"&&/^[A-Za-z]+[\w\-\.]*$/.test(_628)){
if(_627.shadowTree.labelBody){
if(!_628){
if(_627.shadowTree.svg){
if(_627.shadowTree.svg.parentNode){
_627.shadowTree.svg.parentNode.removeChild(_627.shadowTree.svg);
}
_627.shadowTree.svg=null;
}
}else{
if(LabelBinding.sprites){
var g=LabelBinding.sprites.querySelector("#"+_628);
if(g){
var _62a="http://www.w3.org/2000/svg";
if(!_627.shadowTree.svg){
_627.shadowTree.svg=_627.bindingDocument.createElementNS(_62a,"svg");
_627.shadowTree.labelBody.insertBefore(_627.shadowTree.svg,_627.shadowTree.labelBody.firstChild);
}
_627.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
var _62b=g.getAttribute("viewBox"),_62c=document.createDocumentFragment(),_62d=g.cloneNode(true);
if(_62b){
_627.shadowTree.svg.setAttribute("viewBox",_62b);
}
_62c.appendChild(_62d);
_627.shadowTree.svg.innerHTML="";
_627.shadowTree.svg.appendChild(_62c);
}
}else{
LabelBinding.spritesQueue.set(_627.getID(),_628);
LabelBinding.spriteLoad();
}
}
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
var _62e=this._getBuildElement("labeltext");
if(_62e){
this.shadowTree.labelText=_62e;
this.shadowTree.text=_62e.firstChild;
this.hasLabel=true;
}
}else{
var _62f=this.getProperty("label");
var _630=this.getProperty("image");
var _631=this.getProperty("tooltip");
if(_62f){
this.setLabel(_62f,false);
}
if(_630){
this.setImage(_630,false);
}
if(_631){
this.setToolTip(_631);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_632,_633){
_632=_632!=null?_632:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_632);
this.setProperty("label",_632);
if(!_633){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_635){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _636=Resolver.resolve(url);
if(_636.classes){
this.setAlphaTransparentBackdrop();
this.setImageSvg();
this.setImageClasses(_636.classes);
}else{
if(typeof _636=="string"&&_636[0]=="/"){
this.setAlphaTransparentBackdrop(_636);
this.setImageSvg();
this.setImageClasses();
}else{
this.setAlphaTransparentBackdrop();
this.setImageSvg(_636);
this.setImageClasses();
}
}
if(typeof _636=="string"){
this.setProperty("image",url);
}
this.hasImage=true;
if(!_635){
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
LabelBinding.prototype.setImageClasses=function(_637){
if(this.shadowTree.labelBody){
if(!_637){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_637;
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
LabelBinding.prototype.setToolTip=function(_63b){
this.setProperty("tooltip",_63b);
if(_63b!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_63b));
}
};
LabelBinding.prototype.getToolTip=function(_63c){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_63d){
_63d=_63d==null?true:_63d;
var _63e=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_63d;
if(_63d){
this.attachClassName(_63e);
}else{
this.detachClassName(_63e);
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
var _63f="textonly";
var _640="imageonly";
var _641="image-and-text";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_63f);
this.detachClassName(_640);
this.attachClassName(_641);
}else{
if(this.hasLabel){
this.detachClassName(_641);
this.detachClassName(_640);
this.attachClassName(_63f);
}else{
if(this.hasImage){
this.detachClassName(_641);
this.detachClassName(_63f);
this.attachClassName(_640);
}
}
}
};
LabelBinding.newInstance=function(_642){
var _643=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_642);
return UserInterface.registerBinding(_643,LabelBinding);
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
var _644=this.getProperty("label");
if(!_644){
_644=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_644));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_646){
this.setProperty("label",_646);
};
TextBinding.newInstance=function(_647){
var _648=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_647);
return UserInterface.registerBinding(_648,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_649,_64a){
BroadcasterBinding.superclass.setProperty.call(this,_649,_64a);
function update(list){
if(list){
list.each(function(_64c){
_64c.setProperty(_649,_64a);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _64d=this._observers[_649];
if(_64d){
update(_64d);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_64e){
BroadcasterBinding.superclass.deleteProperty.call(this,_64e);
function update(list){
if(list){
list.each(function(_650){
_650.deleteProperty(_64e);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _651=this._observers[_64e];
if(_651){
update(_651);
}
};
BroadcasterBinding.prototype.addObserver=function(_652,_653){
_653=_653?_653:"*";
_653=new List(_653.split(" "));
while(_653.hasNext()){
var _654=_653.getNext();
switch(_654){
case "*":
this._setAllProperties(_652);
break;
default:
var _655=this.getProperty(_654);
_652.setProperty(_654,_655);
break;
}
if(!this._observers[_654]){
this._observers[_654]=new List();
}
this._observers[_654].add(_652);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_656){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _659=att.nodeName;
switch(_659){
case "id":
case "key":
break;
default:
var _65a=this.getProperty(_659);
_656.setProperty(_659,_65a);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_65b,_65c){
_65c=_65c?_65c:"*";
_65c=new List(_65c.split(" "));
while(_65c.hasNext()){
var list=this._observers[_65c.getNext()];
if(list){
while(list.hasNext()){
var _65e=list.getNext();
if(_65e==_65b){
list.del(_65e);
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
BroadcasterBinding.prototype.setDisabled=function(_65f){
this.setProperty("isdisabled",_65f);
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
var _660=this.getProperty("callbackid");
if(_660!=null){
this.bindingWindow.DataManager.unRegisterDataBinding(_660);
}
};
ButtonBinding.prototype.parseDOMProperties=function(){
Binding.imageProfile(this);
};
ButtonBinding.prototype.buildDOMContent=function(){
var tree=this.shadowTree;
var _662=this.getProperty("width");
var _663=this.getProperty("label");
var type=this.getProperty("type");
var _665=this.getProperty("popup");
var _666=this.getProperty("tooltip");
var _667=this.getProperty("isdisabled");
var _668=this.getProperty("response");
var _669=this.getProperty("oncommand");
var _66a=this.getProperty("value");
var _66b=this.getProperty("ischecked");
var _66c=this.getProperty("callbackid");
var _66d=this.getProperty("focusable");
var _66e=this.getProperty("focused");
var _66f=this.getProperty("default");
var url=this.getProperty("url");
var _671=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_671){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_663!=null){
this.setLabel(_663);
}
if(type!=null){
this.setType(type);
}
if(_666!=null){
this.setToolTip(_666);
}
if(_662!=null){
this.setWidth(_662);
}
if(_665!=null){
this.setPopup(_665);
}
if(_668!=null){
this.response=_668;
}
if(_66b==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_669!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_669,this);
};
}
if(_66d||this.isFocusable){
this._makeFocusable();
if(_66f||this.isDefault){
this.isDefault=true;
}
if(_66e){
this.focus();
}
}
if(_667==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_66c!=null){
this.bindingWindow.DataManager.registerDataBinding(_66c,this);
if(_66a!=null){
Binding.dotnetify(this,_66a);
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
ButtonBinding.prototype.setImage=function(_672){
if(this.isAttached){
this.labelBinding.setImage(_672);
}
this.setProperty("image",_672);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_673){
if(this.isAttached){
this.labelBinding.setLabel(_673);
}
this.setProperty("label",_673);
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
ButtonBinding.prototype.setToolTip=function(_675){
this.setProperty("tooltip",_675);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_675));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_676){
this.imageProfile=new _676(this);
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
ButtonBinding.prototype.flip=function(_67b){
_67b=_67b==null?true:_67b;
this.isFlipped=_67b;
this.setProperty("flip",_67b);
if(this.isAttached){
this.labelBinding.flip(_67b);
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
ButtonBinding.prototype.check=function(_67c){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_67c==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",true);
}
}
};
ButtonBinding.prototype._check=function(_67d){
this.isActive=true;
this.isChecked=true;
if(!_67d){
this._stateManager.invokeActiveState();
}
this.setProperty("ischecked",true);
};
ButtonBinding.prototype.uncheck=function(_67e){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_67e==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",false);
}
}
};
ButtonBinding.prototype._uncheck=function(_67f){
this.isActive=false;
this.isChecked=false;
if(!_67f){
this._stateManager.invokeNormalState();
}
this.setProperty("ischecked",false);
};
ButtonBinding.prototype.setChecked=function(_680,_681){
if(_680==null){
_680==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_680){
case true:
this.check(_681);
break;
case false:
this.uncheck(_681);
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
var _683=this.getProperty("tooltip");
if(_683){
this.setToolTip(_683);
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
var _684=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_684=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _684;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _686=this.getEqualSizeWidth();
if(goal>_686){
var diff=goal-_686;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _689=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_68a){
if(_68a>=0){
this.bindingElement.style.width=new String(_68a+"px");
}
this.setProperty("width",_68a);
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
ButtonBinding.prototype.setValue=function(_68b){
this.shadowTree.dotnetinput.value=_68b;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_68c){
this.setValue(_68c);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_68d){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_68d;
this.imageProfile=_68d.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_68e){
var _68f=_68e?"addEventListener":"removeEventListener";
this.binding[_68f](DOMEvents.MOUSEENTER,this);
this.binding[_68f](DOMEvents.MOUSELEAVE,this);
this.binding[_68f](DOMEvents.MOUSEDOWN,this);
this.binding[_68f](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _691=false,_692=false,_693=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_693=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_693=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_693=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_693=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_693==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_691=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_693=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_693=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_693=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_693=ButtonStateManager.STATE_NORMAL;
var _694=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_694 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_693=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_693==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_692=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_693=ButtonStateManager.STATE_NORMAL;
_691=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_693=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_693=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_693=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_693=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_693==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_691=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_693=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_693=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_693=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_693=ButtonStateManager.STATE_NORMAL;
_691=true;
break;
}
}
}
}
}
switch(_693){
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
if(_691){
this.binding.fireCommand();
}
if(_692){
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
ClickButtonBinding.newInstance=function(_695){
var _696=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_695);
return UserInterface.registerBinding(_696,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_697){
var _698=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_697);
return UserInterface.registerBinding(_698,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_699){
var _69a=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_699);
return UserInterface.registerBinding(_69a,CheckButtonBinding);
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
var _69b=this.getDescendantBindingsByLocalName("control");
_69b.each(function(_69c){
_69c.setControlType(_69c.controlType);
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
ControlGroupBinding.newInstance=function(_69e){
var _69f=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_69e);
return UserInterface.registerBinding(_69f,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6a2){
ControlBinding.superclass.handleAction.call(this,_6a2);
switch(_6a2.type){
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
ControlBoxBinding.prototype.handleAction=function(_6a3){
ControlBoxBinding.superclass.handleAction.call(this,_6a3);
switch(_6a3.type){
case ControlBinding.ACTION_COMMAND:
var _6a4=_6a3.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a4);
Application.unlock(self);
},0);
_6a3.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a6){
switch(_6a6.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a7){
var _6a8=this.getState();
this.setProperty("state",_6a7);
this.detachClassName(_6a8);
this.attachClassName(_6a7);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a9=this.getProperty("state");
if(!_6a9){
_6a9=ControlBoxBinding.STATE_NORMAL;
}
return _6a9;
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
MenuContainerBinding.prototype.isOpen=function(_6aa){
var _6ab=null;
if(!_6aa){
_6ab=this._isOpen;
}else{
_6ab=(_6aa==this._openElement);
}
return _6ab;
};
MenuContainerBinding.prototype.setOpenElement=function(_6ac){
if(_6ac){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6ac;
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
var _6ad=this.getChildBindingByLocalName("menupopup");
if(_6ad&&_6ad!=this.menuPopupBinding){
this.menuPopupBinding=_6ad;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6ae=this.getMenuContainerBinding();
_6ae.setOpenElement(this);
var _6af=this.getMenuPopupBinding();
_6af.snapTo(this.bindingElement);
_6af.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6b0){
MenuContainerBinding.superclass.handleAction.call(this,_6b0);
if(_6b0.type==PopupBinding.ACTION_HIDE){
var _6b1=this.getMenuContainerBinding();
_6b1.setOpenElement(false);
this.reset();
_6b0.consume();
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
MenuBarBinding.prototype.handleAction=function(_6b2){
MenuBarBinding.superclass.handleAction.call(this,_6b2);
switch(_6b2.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b3=_6b2.target;
var _6b4=this.getChildBindingsByLocalName("menu");
while(_6b4.hasNext()){
var menu=_6b4.getNext();
}
switch(_6b3.arrowKey){
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
var _6b6=this.getProperty("image");
var _6b7=this.getProperty("label");
var _6b8=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b7){
this.setLabel(_6b7);
}
if(_6b6){
this.setImage(_6b6);
}
if(_6b8){
this.setToolTip(_6b8);
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
MenuBinding.prototype.setLabel=function(_6ba){
this.setProperty("label",_6ba);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ba));
}
};
MenuBinding.prototype.setToolTip=function(_6bb){
this.setProperty("tooltip",_6bb);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6bb));
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
var _6bd=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6bd.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6bd.isOpen()&&!_6bd.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6bd.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6bd.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6be,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6be){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c3){
switch(_6c3.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c4=null;
var _6c5=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c3.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c7){
for(var key in this._focused){
if(key!=_6c7.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c7.key]=_6c7;
this._lastFocused=_6c7;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6ca){
delete this._focused[_6ca.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6cb){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6cb);
}
if(_6cb){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6ce=this.getChildBindingsByLocalName("menugroup");
var _6cf=null;
var _6d0=null;
while(_6ce.hasNext()){
var _6d1=_6ce.getNext();
if(!_6d1.isDefaultContent){
_6d1.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6cf&&_6d1.isVisible){
_6cf=_6d1;
}
if(_6d1.isVisible){
_6d0=_6d1;
}
}
}
if(_6cf&&_6d0){
_6cf.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6d0.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6d2){
MenuBodyBinding.activeInstance=this;
if(_6d2){
var _6d3=this._getMenuItems().getFirst();
if(_6d3){
_6d3.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d4=this._lastFocused;
if((_6d4!=null)&&(!_6d4.isMenuContainer)){
_6d4.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d6=this._getMenuItems();
var _6d7=null;
var next=null;
if(this._lastFocused){
_6d7=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d6.getPreceding(_6d7);
break;
case KeyEventCodes.VK_DOWN:
next=_6d6.getFollowing(_6d7);
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
next=_6d6.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6da=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6db){
_6da=_6db.getChildBindingsByLocalName("menuitem");
_6da.each(function(item){
list.add(item);
});
});
_6da=this.getChildBindingsByLocalName("menuitem");
_6da.each(function(item){
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
MenuBodyBinding.newInstance=function(_6de){
var _6df=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6de);
return UserInterface.registerBinding(_6df,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6e0){
switch(_6e0){
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
MenuGroupBinding.newInstance=function(_6e1){
var _6e2=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e1);
return UserInterface.registerBinding(_6e2,MenuGroupBinding);
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
var _6e3=this.getProperty("image");
var _6e4=this.getProperty("image-hover");
var _6e5=this.getProperty("image-active");
var _6e6=this.getProperty("image-disabled");
if(!this.image&&_6e3){
this.image=_6e3;
}
if(!this.imageHover&&_6e4){
this.imageHover=_6e3;
}
if(!this.imageActive&&_6e5){
this.imageActive=_6e5;
}
if(!this.imageDisabled&&_6e6){
this.imageDisabled=_6e6;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e7=this.getProperty("label");
var _6e8=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6ea=this.getProperty("isdisabled");
var _6eb=this.getProperty("image");
var _6ec=this.getProperty("image-hover");
var _6ed=this.getProperty("image-active");
var _6ee=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6ef=this.getMenuPopupBinding();
if(_6ef){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6eb){
this.image=_6eb;
}
if(!this.imageHover&&_6ec){
this.imageHover=_6eb;
}
if(!this.imageActive&&_6ed){
this.imageActive=_6ed;
}
if(!this.imageDisabled&&_6ee){
this.imageDisabled=_6ee;
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
if(_6e7!=null){
this.setLabel(_6e7);
}
if(_6e8){
this.setToolTip(_6e8);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6ea==true){
this.disable();
}
var _6f0=this.getProperty("oncommand");
if(_6f0){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6f0);
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
MenuItemBinding.prototype.setLabel=function(_6f3){
this.setProperty("label",_6f3);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f3));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f4){
this.setProperty("tooltip",_6f4);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f4));
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
var _6f6=this.bindingDocument.createElement("div");
_6f6.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f6.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f7=this.labelBinding.bindingElement;
_6f7.insertBefore(_6f6,_6f7.firstChild);
_6f6.style.display="none";
this.shadowTree.checkBoxIndicator=_6f6;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f6=this.bindingDocument.createElement("div");
_6f6.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f6.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f7=this.labelBinding.bindingElement;
_6f7.insertBefore(_6f6,_6f7.firstChild);
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
var _6f9=this.imageProfile.getDisabledImage();
if(_6f9){
this.setImage(_6f9);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f9=this.imageProfile.getDefaultImage();
if(_6f9){
this.setImage(_6f9);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6fb=this.getMenuContainerBinding();
if(_6fb.isOpen()&&!_6fb.isOpen(this)){
_6fb._openElement.hide();
_6fb.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6fb=this.getMenuContainerBinding();
if(!_6fb.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6fd){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6fe=this.getMenuContainerBinding();
if(!_6fe||!_6fe.isOpen(this)||_6fd){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6ff){
this.setChecked(true,_6ff);
};
MenuItemBinding.prototype.uncheck=function(_700){
this.setChecked(false,_700);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_701,_702){
this.setProperty("ischecked",_701);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_701){
this.isChecked=_701;
this.shadowTree.checkBoxIndicator.style.display=_701?"block":"none";
if(!_702){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_703){
var _704=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_703);
UserInterface.registerBinding(_704,MenuItemBinding);
return UserInterface.getBinding(_704);
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
PopupSetBinding.newInstance=function(_705){
var _706=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_705);
return UserInterface.registerBinding(_706,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_707,arg){
switch(_707){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _70b=PopupBinding.activeInstances.get(key);
var _70c=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_70b);
if(!_70c){
list.add(_70b);
}
});
list.each(function(_70d){
_70d.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _70f=PopupBinding.activeInstances.get(key);
_70f.hide();
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
var _710=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _711=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_710){
this._bodyBinding=UserInterface.getBinding(_710);
}else{
if(_711){
this._bodyBinding=UserInterface.getBinding(_711);
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
var _712=this.getProperty("position");
this.position=_712?_712:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_713){
var _714=null;
if(this._bodyBinding){
this._bodyBinding.add(_713);
_714=_713;
}else{
_714=PopupBinding.superclass.add.call(this,_713);
}
return _714;
};
PopupBinding.prototype.addFirst=function(_715){
var _716=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_715);
_716=_715;
}else{
_716=PopupBinding.superclass.addFirst.call(this,_715);
}
return _716;
};
PopupBinding.prototype.handleAction=function(_717){
PopupBinding.superclass.handleAction.call(this,_717);
var _718=_717.target;
switch(_717.type){
case Binding.ACTION_ATTACHED:
if(_718 instanceof MenuItemBinding){
this._count(true);
_717.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_718 instanceof MenuItemBinding){
this._count(false);
_717.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_719){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_719?1:-1);
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
PopupBinding.prototype.snapTo=function(_71a){
var _71b=this._getElementPosition(_71a);
switch(this.position){
case PopupBinding.POSITION_TOP:
_71b.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_71b.x+=_71a.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_71b.y+=_71a.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_71b.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_71a;
this.bindingElement.style.display="block";
this.setPosition(_71b.x,_71b.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_71d){
this.bindingElement.style.display="block";
this.setPosition(_71d.x,_71d.y);
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
PopupBinding.prototype._getElementPosition=function(_722){
return _722.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_722):DOMUtil.getUniversalPosition(_722);
};
PopupBinding.prototype._getMousePosition=function(e){
var _724=DOMEvents.getTarget(e);
return _724.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_725){
var _726=this.bindingElement;
if(_725){
_726.style.visibility="visible";
}else{
_726.style.visibility="hidden";
_726.style.display="none";
}
this.isVisible=_725;
};
PopupBinding.prototype._enableTab=function(_727){
var self=this;
var _729=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_729.each(function(_72a){
_72a.bindingElement.tabIndex=_727?0:-1;
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
var _732=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_732.y<0){
y=-_732.y;
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
PopupBinding.prototype.grabKeyboard=function(_734){
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
var _73a=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_73a=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _73a;
};
PopupBinding.prototype.clear=function(){
var _73b=this._bodyBinding;
if(_73b){
_73b.detachRecursive();
_73b.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_73c){
var _73d=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_73c);
return UserInterface.registerBinding(_73d,PopupBinding);
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
PopupBodyBinding.newInstance=function(_73f){
var _740=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_73f);
return UserInterface.registerBinding(_740,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_741){
return new Point(_741.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_742){
var _743=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_742);
return UserInterface.registerBinding(_743,MenuPopupBinding);
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
var _744=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_744){
this._body=UserInterface.getBinding(_744);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _745=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_745.hasNext()){
var _746=DialogBorderBinding.newInstance(this.bindingDocument);
_746.setType(_745.getNext());
this.add(_746);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _747=this.getProperty("controls");
if(_747){
var _748=new List(_747.split(" "));
while(_748.hasNext()){
var type=_748.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _74a=DialogControlBinding.newInstance(this.bindingDocument);
_74a.setControlType(type);
this._titlebar.addControl(_74a);
this.controlBindings[type]=_74a;
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
var _74b=this.getProperty("image");
var _74c=this.getProperty("label");
var _74d=this.getProperty("draggable");
var _74e=this.getProperty("resizable");
var _74f=this.getProperty("modal");
if(_74b){
this.setImage(_74b);
}
if(_74c){
this.setLabel(_74c);
}
if(_74d==false){
this.isDialogDraggable=false;
}
if(_74e==false){
this.isPanelResizable=false;
}
if(_74f==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_750){
this.isModal=_750;
};
DialogBinding.prototype.setLabel=function(_751){
this.setProperty("label",_751);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_751));
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
DialogBinding.prototype.handleAction=function(_753){
DialogBinding.superclass.handleAction.call(this,_753);
switch(_753.type){
case Binding.ACTION_DRAG:
var _754=_753.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_754.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_754.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_754;
_754.dragger.registerHandler(this);
}
break;
}
}
_753.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_753.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_755,arg){
DialogBinding.superclass.handleBroadcast.call(this,_755,arg);
switch(_755){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_757){
DialogBinding.superclass.handleInvokedControl.call(this,_757);
switch(_757.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_758){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_758){
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
var _75a=self.bindingElement;
setTimeout(function(){
_75a.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_75b){
this.bindingElement.style.zIndex=new String(_75b);
};
DialogBinding.prototype.onDragStart=function(_75c){
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
DialogBinding.prototype.setResizable=function(_76e){
if(this._isResizable!=_76e){
if(_76e){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_76e;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _76f=null;
var _770=this.bindingDocument.body.offsetWidth;
var _771=this.bindingDocument.body.offsetHeight;
_76f={x:0.125*_770,y:0.125*_771,w:0.75*_770,h:0.5*_771};
return _76f;
};
DialogBinding.prototype.centerOnScreen=function(){
var _772=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_772.w-dim.w),0.5*(_772.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _774=this;
var i=0;
function blink(){
if(i%2==0){
_774.detachClassName("active");
}else{
_774.attachClassName("active");
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
var _778="";
while(list.hasNext()){
var type=list.getNext();
_778+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_778);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_779){
var _77a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_779);
return UserInterface.registerBinding(_77a,DialogBinding);
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
DialogHeadBinding.newInstance=function(_77b){
var _77c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_77b);
return UserInterface.registerBinding(_77c,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_77f);
return UserInterface.registerBinding(_780,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_781){
DialogSetBinding.superclass.handleAction.call(this,_781);
var _782=_781.target;
switch(_781.type){
case Binding.ACTION_MOVETOTOP:
if(_782 instanceof DialogBinding){
this._moveToTop(_782);
}
break;
case Binding.ACTION_MOVEDONTOP:
_781.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_783){
var _784=0;
var _785=this.getChildBindingsByLocalName("dialog");
_785.each(function(_786){
var _787=_786.getZIndex();
_784=_787>_784?_787:_784;
});
_783.setZIndex(_784+2);
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
DialogBorderBinding.newInstance=function(_789){
var _78a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_789);
return UserInterface.registerBinding(_78a,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_78b){
this._dialogBinding=_78b;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_78d){
DialogCoverBinding.superclass.handleAction.call(this,_78d);
var _78e=_78d.target;
if(this._dialogBinding.isModal){
switch(_78d.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_78e==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_78e.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_78f,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_78f,arg);
switch(_78f){
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
var _792=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_792);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _793=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_793);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_794){
var _795=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_794);
return UserInterface.registerBinding(_795,DialogCoverBinding);
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
var _796=this.getProperty("image");
if(_796){
this.setImage(_796);
}
var _797=this.getProperty("label");
if(_797){
this.setLabel(_797);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_798){
if(this.isAttached){
this.labelBinding.setLabel(_798);
}
this.setProperty("label",_798);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_79a){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_79a);
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
DialogTitleBarBinding.newInstance=function(_79b){
var _79c=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_79b);
return UserInterface.registerBinding(_79c,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_79d){
var _79e=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_79d);
return UserInterface.registerBinding(_79e,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_79f){
var _7a0=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_79f);
return UserInterface.registerBinding(_7a0,DialogControlBinding);
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
var _7a3=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a4=node.nodeName.toLowerCase();
switch(_7a4){
case "script":
case "style":
case "textarea":
_7a3=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a3;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7ab=true;
if(exp.test(text)){
self._textnodes.add(node);
_7ab=false;
}
return _7ab;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7ac,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7ac,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b0=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b0+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b6){
var _7b7="";
var _7b8="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b9="</span>";
var self=this;
function iterate(_7bb){
var _7bc=-1;
var _7bd=null;
self._map.each(function(key,exp){
var low=_7bb.toLowerCase();
var _7c1=low.search(exp);
if(_7c1>-1){
if(_7bc==-1){
_7bc=_7c1;
}
if(_7c1<=_7bc){
_7bc=_7c1;
_7bd=key;
}
}
});
if(_7bc>-1&&_7bd!=null){
var pre=_7bb.substring(0,_7bc);
var hit=_7bb.substring(_7bc,_7bc+_7bd.length);
var pst=_7bb.substring(_7bc+_7bd.length,_7bb.length);
_7b7+=pre+_7b8+hit+_7b9;
iterate(pst);
}else{
_7b7+=_7bb;
}
}
iterate(_7b6);
return _7b7;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c5){
var _7c6=new List(_7c5.getElementsByTagName("span"));
_7c6.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c5.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c9){
var _7ca=null;
if(_7c9.isAttached){
var doc=_7c9.getContentDocument();
if(doc!=null){
_7ca=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7ca,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7ca=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7ca instanceof SOAPFault){
_7ca=null;
}
}
}
}
return _7ca;
};
WindowBinding.highlightKeywords=function(_7ce,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7ce.isAttached){
var doc=_7ce.getContentDocument();
if(doc!=null){
var _7d1=WindowBinding._highlightcrawler;
_7d1.reset(doc.body);
if(list!=null){
_7d1.setKeys(list);
_7d1.crawl(doc.body);
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
var _7d2=WindowBinding.superclass.serialize.call(this);
if(_7d2){
_7d2.url=this.getURL();
}
return _7d2;
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
var _7d4=this.getContentWindow().DocumentManager;
if(_7d4!=null){
_7d4.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d5){
WindowBinding.superclass.handleAction.call(this,_7d5);
var _7d6=_7d5.target;
switch(_7d5.type){
case RootBinding.ACTION_PHASE_3:
if(_7d6.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d6);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d5.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d7){
if(!this.isFit||_7d7){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d8){
if(this._pageBinding==null){
if(_7d8.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d8;
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
WindowBinding.prototype._registerOnloadListener=function(_7d9){
var _7da=this.shadowTree.iframe;
var _7db=_7d9?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7de=true;
if(Client.isExplorer){
_7de=_7da.readyState=="complete";
}
if(_7de==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7db](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7df){
var _7e0=_7df?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e0](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e5=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e5.getQueryString().each(function(name,_7e7){
if(_7e7.length>512){
data.set(name,_7e7);
_7e5.setParam(name,null);
}
});
url=_7e5.toString();
}
if(data){
var self=this;
var _7e9=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7e9.id;
form.setAttribute("target",_7e9.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7ec){
var _7ed=self.bindingDocument.createElement("input");
_7ed.name=name;
_7ed.value=_7ec;
_7ed.type="hidden";
form.appendChild(_7ed);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7ee=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7ee=url;
}
return _7ee;
};
WindowBinding.prototype.reload=function(_7f0){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f1=null;
if(this.shadowTree.iframe!=null){
_7f1=this.shadowTree.iframe;
}
return _7f1;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f2=null,_7f3=this.getFrameElement();
if(_7f3!==null){
try{
_7f2=_7f3.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f2;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f4=null,win=this.getContentWindow();
if(win){
_7f4=win.document;
}
return _7f4;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f6=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f6=UserInterface.getBinding(doc.body);
}
return _7f6;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7f8){
this.bindingElement.style.height=_7f8+"px";
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
WindowBinding.prototype.handleCrawler=function(_7f9){
WindowBinding.superclass.handleCrawler.call(this,_7f9);
if(_7f9.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7f9.nextNode=root.bindingElement;
}else{
_7f9.response=NodeCrawler.SKIP_CHILDREN;
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
var _7fe=this.getContentWindow();
if(_7fe!=null&&_7fe.document!=null&&_7fe.document.body!=null){
if(this.bindingElement.offsetHeight){
_7fe.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_7fe.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_7ff){
var _800=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7ff);
var _801=UserInterface.registerBinding(_800,WindowBinding);
return _801;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_805){
_805.target.show();
_805.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_807){
_807.target.show();
_807.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_809){
PreviewWindowBinding.superclass.handleAction.call(this,_809);
switch(_809.type){
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
var _80a=null;
this._getRadioButtonBindings().each(function(_80b){
if(_80b.getProperty("ischecked")){
_80a=_80b;
return false;
}else{
return true;
}
});
if(_80a){
this._checkedRadioBinding=_80a;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_80c){
RadioGroupBinding.superclass.handleAction.call(this,_80c);
var _80d=_80c.target;
switch(_80c.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_80c.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_80d.isRadioButton&&!_80d.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_80d);
}
this._checkedRadioBinding=_80d;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_80c.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_80e,_80f){
if(_80e instanceof RadioDataBinding){
_80e=_80e.getButton();
}
if(_80e.isRadioButton){
switch(_80f){
case true:
this._unCheckRadioBindingsExcept(_80e);
this._checkedRadioBinding=_80e;
_80e.check(true);
break;
default:
_80e.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_810){
var _811=this._getRadioButtonBindings();
_811.each(function(_812){
if(_812.isChecked&&_812!=_810){
_812.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _813=new Crawler();
var list=new List();
_813.addFilter(function(_815){
var _816=true;
var _817=UserInterface.getBinding(_815);
if(_817 instanceof RadioGroupBinding){
_816=NodeCrawler.SKIP_CHILDREN;
}else{
if(_817 instanceof ButtonBinding&&_817.isRadioButton){
list.add(_817);
}
}
return _816;
});
_813.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_818){
var _819=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_818);
return UserInterface.registerBinding(_819,RadioGroupBinding);
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
var _81b=this.getProperty("regexrule");
if(_81b!=null){
this.expression=new RegExp(_81b);
}
var _81c=this.getProperty("onbindingblur");
if(_81c!=null){
this.onblur=function(){
Binding.evaluate(_81c,this);
};
}
var _81d=this.getProperty("onvaluechange");
if(_81d!=null){
this.onValueChange=function(){
Binding.evaluate(_81d,this);
};
}
if(this.error==null&&this.type!=null){
var _81e=DataBinding.errors[this.type];
if(_81e!=null){
this.error=_81e;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _81f=this.getProperty("value");
if(_81f!=null){
this.setValue(String(_81f));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _821=this.getProperty("isdisabled");
if(_821==true){
this.setDisabled(true);
}
var _822=this.getProperty("readonly");
if(_822==true){
this.setReadOnly(true);
}
var _823=this.getProperty("autoselect");
if(_823==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _824=this.getProperty("placeholder");
if(_824){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_824));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _825=Localization.currentLang();
if(_825!=null){
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
var _826=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_826.type=this.isPassword==true?"password":"text";
_826.tabIndex=-1;
return _826;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_829){
if(_829){
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
DataInputBinding.prototype.focus=function(_82b){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_82b){
var self=this,_82d=this.bindingElement,_82e={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_82d,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_82d,DOMEvents.MOUSEUP,_82e);
}else{
this.select();
}
}
this.onfocus();
if(!_82b){
var _82f=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_82f);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _830=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _831=_830.createTextRange();
_831.moveStart("character",0);
_831.moveEnd("character",_830.value.length);
_831.select();
}else{
_830.setSelectionRange(0,_830.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_832){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_832){
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
DataInputBinding.prototype.validate=function(_836){
if(_836==true||this._isValid){
var _837=this.isValid();
if(_837!=this._isValid){
this._isValid=_837;
if(!_837){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _838=null;
if(this._isInvalidBecauseRequired==true){
_838=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_838=DataBinding.warnings["minlength"];
_838=_838.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_838=DataBinding.warnings["maxlength"];
_838=_838.replace("${count}",String(this.maxlength));
}else{
_838=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_838!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_838);
}
}else{
this.setValue(_838);
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
var _839=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _83a=this.getValue();
if(_83a==""){
if(this.isRequired==true){
_839=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _83b=DataBinding.expressions[this.type];
if(!_83b.test(_83a)){
_839=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_83a)){
_839=false;
}
}
}
}
if(_839&&this.minlength!=null){
if(_83a.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_839=false;
}
}
if(_839&&this.maxlength!=null){
if(_83a.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_839=false;
}
}
return _839;
};
DataInputBinding.prototype.setDisabled=function(_83c){
if(_83c!=this.isDisabled){
if(_83c){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _83d=this.shadowTree.input;
if(_83c){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_83d,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_83d,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_83c;
this.shadowTree.input.unselectable=_83c?"on":"off";
}
this.isDisabled=_83c;
this.isFocusable=!_83c;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_83f){
if(_83f!=this.isReadOnly){
if(_83f){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_83f;
this.isReadOnly=_83f;
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
DataInputBinding.prototype.handleElement=function(_840){
return true;
};
DataInputBinding.prototype.updateElement=function(_841){
var _842=_841.getAttribute("value");
var _843=_841.getAttribute("type");
var _844=_841.getAttribute("maxlength");
var _845=_841.getAttribute("minlength");
var _846=_841.getAttribute("required")==="true";
if(_842==null){
_842="";
}
var _847=this.bindingWindow.UpdateManager;
if(this.getValue()!=_842){
_847.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_842);
}
if(this.type!=_843){
_847.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_843;
}
if(this.maxlength!=_844){
_847.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_844;
}
if(this.minlength!=_845){
_847.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_845;
}
if(this.isRequired!=_846){
_847.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_846;
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
DataInputBinding.prototype.setValue=function(_848){
if(_848===null){
_848="";
}
if(_848!=this.getValue()){
this.setProperty("value",_848);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_848);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _849=null;
if(this.shadowTree.input!=null){
_849=this.shadowTree.input.value;
}else{
_849=this.getProperty("value");
}
return _849;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _84b=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_84b=Number(_84b);
break;
}
return _84b;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_84c){
var _84d=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_84c);
return UserInterface.registerBinding(_84d,DataInputBinding);
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
var _84e=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_84e!=null){
this.setValue(_84e.value);
_84e.parentNode.removeChild(_84e);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _84f;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_84f=div.firstChild;
}else{
_84f=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_84f.tabIndex=-1;
return _84f;
};
TextBoxBinding.prototype.handleElement=function(_851){
return true;
};
TextBoxBinding.prototype.updateElement=function(_852){
var _853,area=_852.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_853=DOMUtil.getTextContent(area);
}
if(_853==null){
_853="";
}
var _855=this.bindingWindow.UpdateManager;
if(this.getValue()!=_853){
_855.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_853);
}
var _856=_852.getAttribute("type");
if(this.type!=_856){
_855.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_856;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_85a){
var _85b=this.bindingDocument.selection.createRange();
var _85c=_85b.text=="";
if(_85c&&!_85a){
_85b.text="\t";
}else{
var text="";
var _85e=_85b.text.length;
while((_85b.moveStart("word",-1)&&_85b.text.charAt(1)!="\n")){
}
_85b.moveStart("character",1);
var _85f=0;
var i=0,line,_862=_85b.text.split("\n");
while((line=_862[i++])!=null){
if(_85a){
line=line.replace(/^(\s)/mg,"");
_85f++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_862[i+1]?"\n":"");
}
_85b.text=text;
_85b.moveStart("character",-_85e);
if(_85a){
_85b.moveStart("character",2*_862.length-2);
}
_85b.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _863=this.bindingDocument.selection.createRange();
var _864=_863.duplicate();
while((_864.moveStart("word",-1)&&_864.text.indexOf("\n")==-1)){
}
_864.moveStart("character",1);
_863.text="\n"+_864.text.match(/^(\s)*/)[0]+"!";
_863.moveStart("character",-1);
_863.select();
_863.text="";
_863.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_865){
var _866;
var _867;
var oss;
var osy;
var i;
var fnd;
var _86c=this._getSelectedText();
var el=this.shadowTree.input;
_866=el.scrollLeft;
_867=el.scrollTop;
if(!_86c.match(/\n/)){
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
_86c=this._getSelectedText();
if(_865){
ntext=_86c.replace(/^(\s)/mg,"");
}else{
ntext=_86c.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_86c.length);
}
el.scrollLeft=_866;
el.scrollTop=_867;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86e;
var _86f;
var oss;
var osy;
var el=this.shadowTree.input;
_86e=el.scrollLeft;
_86f=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_86e;
el.scrollTop=_86f;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _876=this.shadowTree.input.value;
var _877=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _876.substr(_877,end-_877);
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
var _879=this.getProperty("isdisabled");
if(this.isDisabled||_879){
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
var _87b=this.getProperty("label");
var _87c=this.getProperty("value");
var _87d=this.getProperty("width");
var _87e=this.getProperty("onchange");
var _87f=this.getProperty("required")==true;
var _880=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_87b!=null){
this.label=_87b;
}
if(!this.value&&_87c!=null){
this.value=_87c;
}
if(!this.width&&_87d){
this.width=_87d;
}
if(_87f){
this.isRequired=true;
}
if(_880){
this._isLocal=true;
}
if(_87e){
this.onValueChange=function(){
Binding.evaluate(_87e,this);
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
var _881=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_881.name=this.getName();
_881.value=this.getValue();
_881.type="hidden";
if(this.hasCallBackID()){
_881.id=this.getCallBackID();
}
this.shadowTree.input=_881;
this.bindingElement.appendChild(_881);
};
SelectorBinding.prototype.buildButton=function(){
var _882=this.BUTTON_IMPLEMENTATION;
var _883=this.add(_882.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_883.imageProfile=this.imageProfile;
}
if(this.width!=null){
_883.setWidth(this.width);
}
this._buttonBinding=_883;
this.shadowTree.button=_883;
_883.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _884;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _885=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_885.id="selectorpopupset";
_884=UserInterface.registerBinding(_885,PopupSetBinding);
this.bindingDocument.body.appendChild(_884.bindingElement);
}else{
_884=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_884=top.app.bindingMap.selectorpopupset;
}
var doc=_884.bindingDocument;
var _887=_884.add(PopupBinding.newInstance(doc));
var _888=_887.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_887;
this._menuBodyBinding=_888;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_887.attachClassName("selectorpopup");
_887.addActionListener(PopupBinding.ACTION_SHOW,this);
_887.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_887.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_887);
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
var _88b=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_88b).each(function(_88c){
var _88d=_88c.getAttribute("label");
var _88e=_88c.getAttribute("value");
var _88f=_88c.getAttribute("selected");
var _890=_88c.getAttribute("image");
var _891=_88c.getAttribute("image-hover");
var _892=_88c.getAttribute("image-active");
var _893=_88c.getAttribute("image-disabled");
var _894=null;
if(_890||_891||_892||_893){
_894=new ImageProfile({image:_890,imageHover:_891,imageActive:_892,imageDisabled:_893});
}
list.add(new SelectorBindingSelection(_88d?_88d:null,_88e?_88e:null,_88f&&_88f=="true",_894));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _896=null;
while(list.hasNext()){
var _897=list.getNext();
var item=this.addSelection(_897);
if(_897.isSelected){
this.select(item,true);
}
if(!_896){
_896=item;
}
}
if(!this._selectedItemBinding){
this.select(_896,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_899,_89a){
var _89b=this.MENUITEM_IMPLEMENTATION;
var _89c=this._menuBodyBinding;
var _89d=_89c.bindingDocument;
var _89e=_89b.newInstance(_89d);
_89e.imageProfile=_899.imageProfile;
_89e.setLabel(_899.label);
if(_899.tooltip!=null){
_89e.setToolTip(_899.tooltip);
}
_89e.selectionValue=_899.value;
_899.menuItemBinding=_89e;
if(_89a){
_89c.addFirst(_89e);
this.selections.addFirst(_899);
}else{
_89c.add(_89e);
this.selections.add(_899);
}
this._isUpToDate=false;
return _89e;
};
SelectorBinding.prototype.addSelectionFirst=function(_89f){
return this.addSelection(_89f,true);
};
SelectorBinding.prototype.clear=function(_8a0){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a0&&this.defaultSelection!=null){
var _8a1=this.addSelection(this.defaultSelection);
this.select(_8a1,true);
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
SelectorBinding.prototype.setDisabled=function(_8a2){
if(this.isAttached==true){
var _8a3=this._buttonBinding;
_8a3.setDisabled(_8a2);
}
if(_8a2){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a4){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a4);
}
};
SelectorBinding.prototype.handleAction=function(_8a5){
SelectorBinding.superclass.handleAction.call(this,_8a5);
switch(_8a5.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8a5.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8a5.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8a5.target);
_8a5.consume();
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
_8a5.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8a7){
this.select(_8a7);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8a8=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8a9=this._popupBinding.bindingElement;
_8a9.style.minWidth=_8a8;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ab=Client.isExplorer?e.keyCode:e.which;
if(_8ab==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ab=Client.isExplorer?e.keyCode:e.which;
if(_8ab>=32){
this._buttonBinding.check();
var _8ac=String.fromCharCode(_8ab);
this._pushSearchSelection(_8ac);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8ad){
this._searchString+=_8ad.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8ae){
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
var _8af=this._menuBodyBinding;
if(_8af!=null){
var _8b0=this.MENUITEM_IMPLEMENTATION;
var _8b1=_8af.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b3=list.getNext();
if(_8b3.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b3);
}
}
}
this._attachSelections();
var _8b4=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8b5=_8af.getDescendantBindingsByType(_8b0);
if(_8b5.hasEntries()){
while(_8b5.hasNext()){
var _8b6=_8b5.getNext();
var _8b7=_8b6.labelBinding;
if(_8b7!=null&&_8b7.shadowTree!=null&&_8b7.shadowTree.labelText!=null){
_8b7.shadowTree.labelText.innerHTML=_8b7.shadowTree.labelText.innerHTML.replace(_8b4,"<b>$&</b>");
}
}
_8b5.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8b7=LabelBinding.newInstance(_8b1);
_8b7.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8af.add(_8b7);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b3=list.getNext();
var item=this.addSelection(_8b3);
if(this._selectionValue==_8b3.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8b9,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8b9,arg);
switch(_8b9){
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
SelectorBinding.prototype.select=function(_8bc,_8bd){
var _8be=false;
if(_8bc!=this._selectedItemBinding){
this._selectedItemBinding=_8bc;
_8be=true;
var _8bf=this._buttonBinding;
this._selectionValue=_8bc.selectionValue;
this._selectionLabel=_8bc.getLabel();
_8bf.setLabel(_8bc.getLabel());
if(_8bc.imageProfile!=null){
_8bf.imageProfile=_8bc.imageProfile;
}
if(_8bf.imageProfile!=null){
_8bf.setImage(this.isDisabled==true?_8bf.imageProfile.getDisabledImage():_8bf.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8bd){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8bd)){
this.validate();
}
}
return _8be;
};
SelectorBinding.prototype._relate=function(){
var _8c0=this.getProperty("relate");
if(_8c0){
var _8c1=this.bindingDocument.getElementById(_8c0);
if(_8c1){
var _8c2=UserInterface.getBinding(_8c1);
if(_8c2){
if(this.isChecked){
_8c2.show();
}else{
_8c2.hide();
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
SelectorBinding.prototype.selectByValue=function(_8c3,_8c4){
var _8c5=false;
var _8c6=this._menuBodyBinding;
var _8c7=_8c6.getDescendantElementsByLocalName("menuitem");
while(_8c7.hasNext()){
var _8c8=UserInterface.getBinding(_8c7.getNext());
if(_8c8.selectionValue==_8c3){
_8c5=this.select(_8c8,_8c4);
break;
}
}
return _8c5;
};
SelectorBinding.prototype.getValue=function(){
var _8c9=this._selectionValue;
if(_8c9!=null){
_8c9=String(_8c9);
}
return _8c9;
};
SelectorBinding.prototype.setValue=function(_8ca){
this.selectByValue(String(_8ca),true);
};
SelectorBinding.prototype.getResult=function(){
var _8cb=this._selectionValue;
if(_8cb=="null"){
_8cb=null;
}
if(_8cb){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8cb=Number(_8cb);
break;
}
}
return _8cb;
};
SelectorBinding.prototype.setResult=function(_8cc){
this.selectByValue(_8cc,true);
};
SelectorBinding.prototype.validate=function(){
var _8cd=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ce=this.getValue();
if(_8ce==this.defaultSelection.value){
_8cd=false;
}
if(_8cd!=this._isValid){
if(_8cd){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8cd;
}
return _8cd;
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
var _8cf=this._popupBinding;
if(!this._isUpToDate){
_8cf.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d0,_8d1){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d0));
return true;
};
SelectorBinding.newInstance=function(_8d2){
var _8d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d2);
return UserInterface.registerBinding(_8d3,SelectorBinding);
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
var _8d6=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d6){
this.onValueChange=function(){
Binding.evaluate(_8d6,this);
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
SimpleSelectorBinding.prototype.focus=function(_8d9){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8d9){
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
SimpleSelectorBinding.prototype._hack=function(_8da){
if(Client.isExplorer){
this._select.style.width=_8da?"auto":this._cachewidth+"px";
if(_8da){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8db=true;
if(this.isRequired){
if(this.getValue()==null){
_8db=false;
}
}
if(_8db!=this._isValid){
if(_8db){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8dc=this._select;
var _8dd=_8dc.options[_8dc.selectedIndex];
var text=DOMUtil.getTextContent(_8dd);
_8dc.blur();
_8dc.style.color="#A40000";
_8dc.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8dd,DataBinding.warnings["required"]);
}
_8dc.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8dd,text);
}
};
}
this._isValid=_8db;
}
return _8db;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8df=null;
var _8e0=this._select;
var _8e1=_8e0.options[_8e0.selectedIndex];
var _8e2=true;
if(Client.isExplorer){
var html=_8e1.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e2=false;
}
}
if(_8e2){
_8df=_8e1.getAttribute("value");
}
return _8df;
};
SimpleSelectorBinding.prototype.setValue=function(_8e4){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8e5){
this.setValue(_8e5);
};
SimpleSelectorBinding.newInstance=function(_8e6){
var _8e7=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e6);
return UserInterface.registerBinding(_8e7,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8e8,_8e9,_8ea,_8eb,_8ec){
this._init(_8e8,_8e9,_8ea,_8eb,_8ec);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8ed,_8ee,_8ef,_8f0,_8f1){
if(_8ed!=null){
this.label=String(_8ed);
}
if(_8ee!=null){
this.value=String(_8ee);
}
if(_8f0!=null){
this.imageProfile=_8f0;
}
if(_8f1!=null){
this.tooltip=_8f1;
}
this.isSelected=_8ef?true:false;
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
var _8f2=this.getProperty("image");
if(_8f2){
this.setImage(_8f2);
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
var _8f5=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8f5.popupBindingTargetElement=this.shadowTree.input;
_8f5.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8f5.attach();
var self=this;
_8f5.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8f5;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8f8=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8f8).each(function(_8f9){
if(_8f9.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8fa=_8f9.getAttribute("value");
var _8fb=_8f9.getAttribute("selected");
var _8fc=_8f9.getAttribute("tooltip");
list.add({value:_8fa?_8fa:null,toolTip:_8fc?_8fc:null,isSelected:(_8fb&&_8fb=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8fe=this._menuBodyBinding;
var _8ff=_8fe.bindingDocument;
while(_8fe.bindingElement.hasChildNodes()){
var node=_8fe.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8fe.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _901=this.getProperty("emptyentrylabel");
if(_901){
var _902=MenuItemBinding.newInstance(_8ff);
_902.setLabel(_901);
_902.selectionValue="";
_8fe.add(_902);
}
while(list.hasNext()){
var _903=list.getNext();
var _902=MenuItemBinding.newInstance(_8ff);
_902.setLabel(_903.label?_903.label:_903.value);
_902.selectionValue=_903.value;
if(_903.image){
_902.setImage(_903.image);
}
if(_903.toolTip){
_902.setToolTip(_903.toolTip);
}
if(_903.isSelected){
this.select(_902,true);
}
_8fe.add(_902);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_904){
this.select(_904);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_905,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_905,arg);
switch(_905){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_905,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_907){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_907);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_908){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_908);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _909=this.bindingElement.offsetWidth+"px";
var _90a=this._popupBinding.bindingElement;
_90a.style.minWidth=_909;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _90b=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _90c=this.getValue();
var _90d=null;
_90b.each(function(item){
if(item.getLabel()==_90c){
_90d=item;
}
});
if(_90d){
_90d.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_910){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_910){
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
DataInputSelectorBinding.prototype.setValue=function(_911){
var _912=this.isReadOnly;
var _913=null;
if(_911!=null&&_911!=""){
var _914=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_914.hasNext()){
var item=_914.getNext();
if(item.selectionValue==_911){
_913=item.getLabel();
break;
}
}
}
if(_913!=null){
this.value=_911;
this.shadowTree.input.value=_913;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_911);
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
var _917="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_917);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_917);
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
var _919=ToolBarButtonBinding.newInstance(this.bindingDocument);
_919.setImage("${icon:popup}");
this.addFirst(_919);
_919.attach();
var self=this;
_919.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _91b=self.getProperty("handle");
var _91c=ViewDefinition.clone(_91b,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_91c instanceof DialogViewDefinition){
_91c.handler={handleDialogResponse:function(_91d,_91e){
self._isButtonClicked=false;
if(_91d==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _91f=_91e.getFirst();
self.setValue(_91f);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_91c.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_91c);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_919.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_919;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _921=this._dialogButtonBinding;
if(_921!=null){
_921.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _923=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_923=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _923;
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
var _926=ToolBarButtonBinding.newInstance(this.bindingDocument);
_926.setImage("${icon:editor-sourceview}");
_926.bindingElement.style.left="1px";
_926.bindingElement.style.width="29px";
this.addFirst(_926);
_926.attach();
_926.hide();
var self=this;
_926.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_926;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_927){
UrlInputDialogBinding.superclass.setValue.call(this,_927);
if(this.isAttached){
this.compositeUrl=new Uri(_927);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _928=TreeService.GetCompositeUrlLabel(_927);
if(_928!=_927){
this.setLabel(_928);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_929){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_929){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_929;
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
var _92a=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _92b=this.getProperty("image");
if(_92b!=null){
_92a.setImage(_92b);
}else{
_92a.setImage("${icon:popup}");
}
this.addFirst(_92a);
_92a.attach();
var self=this;
_92a.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_92a;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _92d=this._dialogButtonBinding;
if(_92d!=null){
_92d.oncommand();
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
var _92e=this.getProperty("required")==true;
if(_92e){
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
var _92f=this.getProperty("label");
var _930=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_92f!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_92f+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_92f);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_930!=null){
this._buttonBinding.setToolTip(_930);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _931="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_931,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _933=g.getAttribute("viewBox"),_934=document.createDocumentFragment(),_935=g.cloneNode(true);
if(_933){
this.shadowTree.indicatorimage.setAttribute("viewBox",_933);
}
_934.appendChild(_935);
this.shadowTree.indicatorimage.appendChild(_934);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_936){
DataDialogBinding.superclass.handleAction.call(this,_936);
var _937=_936.target;
var self=this;
switch(_936.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_939,_93a){
if(_939==Dialog.RESPONSE_ACCEPT){
if(_93a instanceof DataBindingMap){
self._map=_93a;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_937==this._buttonBinding){
_936.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_93b,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_93b,arg);
switch(_93b){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _93e=this.getProperty("handle");
var url=this.getURL();
var _940=null;
if(_93e!=null||def!=null){
if(def!=null){
_940=def;
}else{
_940=ViewDefinitions[_93e];
}
if(_940 instanceof DialogViewDefinition){
_940.handler=this._handler;
if(this._map!=null){
_940.argument=this._map;
}
StageBinding.presentViewDefinition(_940);
}
}else{
if(url!=null){
_940=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_940!=null){
this._dialogViewHandle=_940.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_941){
this.setProperty("label",_941);
if(this.isAttached){
this._buttonBinding.setLabel(_941+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_942){
this.setProperty("image",_942);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_942);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_943){
this.setProperty("tooltip",_943);
if(this.isAttached){
this._buttonBinding.setToolTip(_943);
}
};
DataDialogBinding.prototype.setHandle=function(_944){
this.setProperty("handle",_944);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_946){
this._handler=_946;
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
var _947=true;
if(this.isRequired==true){
var _948=this.getValue();
if(_948==null||_948==""){
_947=false;
}
if(_947!=this._isValid){
if(_947){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_947;
}
return _947;
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
DataDialogBinding.newInstance=function(_94a){
var _94b=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_94a);
return UserInterface.registerBinding(_94b,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_94d,_94e){
if(_94d==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_94e);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_94f){
_94f=new String(_94f);
this.dirty();
this.setValue(encodeURIComponent(_94f));
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
var _953=this.getValue();
if(_953==null){
_953="";
}
this.shadowTree.dotnetinput.value=_953;
};
PostBackDataDialogBinding.prototype.setValue=function(_954){
this.setProperty("value",_954);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_955){
};
PostBackDataDialogBinding.newInstance=function(_956){
var _957=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_956);
return UserInterface.registerBinding(_957,PostBackDataDialogBinding);
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
var _958=this.getProperty("dialoglabel");
var _959=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _95b=this.getProperty("handle");
var _95c=this.getProperty("selectedtoken");
if(_95b!=null){
var def=ViewDefinition.clone(_95b,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_958!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_958;
}
if(_959!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_959;
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
if(_95c!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_95c;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_95e){
var _95f=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95e);
return UserInterface.registerBinding(_95f,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_961){
self._datathing.setValue(_961);
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
var _964=self.getValue();
if(_964==""||_964==null){
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
var _965=this.getProperty("value");
var _966=this.getProperty("selectorlabel");
if(_966==null){
_966=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_965==null));
list.add(new SelectorBindingSelection(_966+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_965!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _965=this.getValue();
if(_965==""||_965==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_968){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_968);
switch(_968.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_968.target==this._datathing){
var _969=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_969){
self._selector.setLabel(_969);
}
},500);
_968.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_96b){
this.setProperty("label",_96b);
if(this._selector!=null){
this._selector.setLabel(_96b);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_96c){
this._datathing.setValue(_96c);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_96e,_96f){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_96e,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_970){
this._buttonBinding.setLabel(_970);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_971){
this._buttonBinding.setToolTip(_971);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_972){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_972);
switch(_972.type){
case MenuItemBinding.ACTION_COMMAND:
var _973=_972.target;
var _974=this.master;
if(_973.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_973.getLabel());
setTimeout(function(){
_974.action();
},0);
}else{
if(_974.getValue()){
_974.dirty();
}
_974.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_975){
var _976=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_975);
return UserInterface.registerBinding(_976,NullPostBackDataDialogSelectorBinding);
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
var _977=this._dataDialogBinding;
if(_977!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_977.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _978=this.getProperty("editable");
var _979=this.getProperty("selectable");
var _97a=this.getProperty("display");
if(_978!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_979){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_97a){
this._display=_97a;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _97b=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_97b.selections=this.selections;
this.add(_97b);
_97b.attach();
this._dataDialogBinding=_97b;
this.shadowTree.datadialog=_97b;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _97d=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _97e=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_97d=_97e.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_97d=_97e.isSelected!=true;
break;
}
if(_97d){
this.shadowTree.box.appendChild(this._getElementForSelection(_97e));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_980){
var box=this.shadowTree.box;
var _982=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _983=list.getNext();
if(_980){
_983.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_982=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_982=_983.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_982=_983.isSelected!=true;
break;
}
}
if(_982){
var _984=this._getElementForSelection(_983);
box.insertBefore(_984,box.firstChild);
CSSUtil.attachClassName(_984,"selected");
this._selectionMap.set(_983.value,_984);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_985){
var _986=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_986.appendChild(this.bindingDocument.createTextNode(_985.label));
_986.setAttribute("label",_985.label);
_986.setAttribute("value",_985.value);
return _986;
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
var _988=DOMEvents.getTarget(e);
var _989=DOMUtil.getLocalName(_988);
if(_989=="div"){
this._handleMouseDown(_988);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_98a){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _98b=this._getElements();
var _98c=_98a.getAttribute("value");
var _98d=this._lastSelectedElement.getAttribute("value");
var _98e=false;
while(_98b.hasNext()){
var el=_98b.getNext();
switch(el.getAttribute("value")){
case _98c:
case _98d:
_98e=!_98e;
break;
}
if(_98e){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_98a);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_98a)){
this._unhilite(_98a);
}else{
this._hilite(_98a);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_98a){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_98a;
};
MultiSelectorBinding.prototype._hilite=function(_992){
var _993=_992.getAttribute("value");
if(!this._selectionMap.has(_993)){
CSSUtil.attachClassName(_992,"selected");
this._selectionMap.set(_993,_992);
}
};
MultiSelectorBinding.prototype._unhilite=function(_994){
var _995=_994.getAttribute("value");
if(this._selectionMap.has(_995)){
CSSUtil.detachClassName(_994,"selected");
this._selectionMap.del(_995);
}
};
MultiSelectorBinding.prototype._isHilited=function(_996){
return CSSUtil.hasClassName(_996,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_997){
MultiSelectorBinding.superclass.handleAction.call(this,_997);
var _998=_997.target;
switch(_997.type){
case DataDialogBinding.ACTION_COMMAND:
if(_998==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_997.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_998.result);
this.dirty();
_998.result=null;
_997.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _999=null;
if(this.isSelectable){
_999=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_99b){
if(self._isHilited(_99b)){
_99b.parentNode.removeChild(_99b);
_999.add(new SelectorBindingSelection(_99b.getAttribute("label"),_99b.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _999;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _99d=this._getElements();
if(!isUp){
_99d.reverse();
}
var _99e=true;
while(_99e&&_99d.hasNext()){
var _99f=_99d.getNext();
if(this._isHilited(_99f)){
switch(isUp){
case true:
if(_99f.previousSibling){
_99f.parentNode.insertBefore(_99f,_99f.previousSibling);
}else{
_99e=false;
}
break;
case false:
if(_99f.nextSibling){
_99f.parentNode.insertBefore(_99f,_99f.nextSibling.nextSibling);
}else{
_99e=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9a0=new List();
var _9a1=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a3){
var _9a4=new SelectorBindingSelection(_9a3.getAttribute("label"),_9a3.getAttribute("value"),_9a1);
_9a4.isHighlighted=self._isHilited(_9a3);
_9a0.add(_9a4);
});
return _9a0;
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
var _9a5=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9a5.hasEntries()){
_9a5.each(function(_9a6){
_9a6.parentNode.removeChild(_9a6);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9a7=this.selections.getNext();
if(_9a7.isSelected){
var _9a8=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9a8.name=this._name;
_9a8.value=_9a7.value;
this.bindingElement.appendChild(_9a8);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9a9){
alert(_9a9);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9aa){
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
var _9ab={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9ac=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9ac.handler=this._handler;
_9ac.argument=_9ab;
StageBinding.presentViewDefinition(_9ac);
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
var _9ad={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9af={handleDialogResponse:function(_9b0,_9b1){
if(_9b0==Dialog.RESPONSE_ACCEPT){
self.result=_9b1;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b2=ViewDefinitions[this._dialogViewHandle];
_9b2.handler=_9af;
_9b2.argument=_9ad;
StageBinding.presentViewDefinition(_9b2);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b3){
var _9b4=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b3);
return UserInterface.registerBinding(_9b4,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9b5){
var id=_9b5.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9b7=_9b5.bindingDocument.getElementById(id);
if(_9b7!=null){
var _9b8=UserInterface.getBinding(_9b7);
_9b8.setResult(true);
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
var _9ba=this.bindingDocument.getElementById(id);
if(_9ba!=null){
var _9bb=UserInterface.getBinding(_9ba);
if(_9bb&&!_9bb.isAttached){
_9bb.isLazy=true;
}else{
_9ba.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9bc){
this._isLazy=_9bc;
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
var _9be=this.getProperty("stateprovider");
var _9bf=this.getProperty("handle");
if(_9be!=null&&_9bf!=null){
url=url.replace("${stateprovider}",_9be).replace("${handle}",_9bf);
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
EditorDataBinding.prototype._onPageInitialize=function(_9c0){
EditorDataBinding.superclass._onPageInitialize.call(this,_9c0);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9c1){
EditorDataBinding.superclass.handleAction.call(this,_9c1);
switch(_9c1.type){
case Binding.ACTION_DIRTY:
if(_9c1.target!=this){
if(!this.isDirty){
this.dirty();
}
_9c1.consume();
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
EditorDataBinding.prototype.setValue=function(_9c2){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c3){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9c4){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9c4);
if(this.hasBasic===false){
var _9c5=this.getContentWindow().bindingMap.basicgroup;
if(_9c5){
_9c5.hide();
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
var _9ca=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9ca=fake.getValue()!="";
}
if(!_9ca&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9ca&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9ca;
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
var _9ce=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9ce!=null){
_9ce.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9cf){
_9cf=_9cf!=null?_9cf:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9cf;
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
var _9d0=this.getProperty("label");
if(_9d0){
this.setLabel(_9d0);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
var _9d1=this.bindingElement.getElementsByTagName("field");
if(!_9d1.length){
_9d1=this.bindingElement.getElementsByTagName("ui:field");
}
var _9d2=_9d1[0];
var _9d3=_9d1[_9d1.length-1];
if(_9d2){
_9d2.className+=" "+"first";
}
if(_9d3){
_9d3.className+=" "+"last";
}
};
FieldGroupBinding.prototype.setLabel=function(_9d4){
this.setProperty("label",_9d4);
if(this.shadowTree.labelBinding==null){
var _9d5=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d5.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d5.bindingElement,this.bindingElement.firstChild);
_9d5.attach();
this.shadowTree.labelBinding=_9d5;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9d4));
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
var _9d7=this.getProperty("relation");
if(_9d7!=null){
this.bindingRelation=_9d7;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9d8,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9d8,arg);
switch(_9d8){
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
FieldBinding.newInstance=function(_9da){
var _9db=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9da);
return UserInterface.registerBinding(_9db,FieldBinding);
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
var _9dc=this.getDescendantBindingByLocalName("fieldgroup");
if(_9dc!=null){
_9dc.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9dd=true;
var _9de=this.getDescendantBindingsByLocalName("*");
while(_9de.hasNext()){
var _9df=_9de.getNext();
if(Interfaces.isImplemented(IData,_9df)){
var _9e0=_9df.validate();
if(_9dd&&!_9e0){
_9dd=false;
}
}
}
return _9dd;
};
FieldsBinding.prototype.handleAction=function(_9e1){
FieldsBinding.superclass.handleAction.call(this,_9e1);
var _9e2=_9e1.target;
if(_9e2!=this){
switch(_9e1.type){
case Binding.ACTION_INVALID:
var _9e3=DataBinding.getAssociatedLabel(_9e2);
if(_9e3){
this._invalidFieldLabels.set(_9e2.key,_9e3);
}
if(_9e2.error){
if(!_9e2.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9e2.error},_9e2);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9e1.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9e2.key)){
this._invalidFieldLabels.del(_9e2.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9e1.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e4=null;
if(this._invalidFieldLabels.hasEntries()){
_9e4=this._invalidFieldLabels.toList();
}
return _9e4;
};
FieldsBinding.newInstance=function(_9e5){
var _9e6=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e5);
return UserInterface.registerBinding(_9e6,FieldsBinding);
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
var _9e7=this.getProperty("image");
if(_9e7){
this.setImage(_9e7);
}
var _9e8=this.getProperty("tooltip");
if(_9e8){
this.setToolTip(_9e8);
}
var _9e9=this.getProperty("label");
if(_9e9){
this.setLabel(_9e9);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9eb=this.getAncestorBindingByLocalName("field");
if(_9eb){
var _9ec=true;
_9eb.getDescendantBindingsByLocalName("*").each(function(_9ed){
if(Interfaces.isImplemented(IData,_9ed)){
_9ed.focus();
_9ec=false;
}
return _9ec;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9ee){
this.setProperty("label",_9ee);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9ee);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9ef=this.getProperty("label");
if(!_9ef){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9ef=node.data;
}
}
return _9ef;
};
FieldDescBinding.prototype.setImage=function(_9f1){
this.setProperty("image",_9f1);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9f2){
this.setProperty("tooltip",_9f2);
if(this.isAttached){
this.bindingElement.title=_9f2;
}
};
FieldDescBinding.newInstance=function(_9f3){
var _9f4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f3);
return UserInterface.registerBinding(_9f4,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f5){
var _9f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f5);
return UserInterface.registerBinding(_9f6,FieldDataBinding);
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
var _9f7=this._fieldHelpPopupBinding;
if(_9f7){
_9f7.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9f8=app.bindingMap.fieldhelpopupset;
var doc=_9f8.bindingDocument;
var _9fa=_9f8.add(PopupBinding.newInstance(doc));
var _9fb=_9fa.add(PopupBodyBinding.newInstance(doc));
_9fa.position=PopupBinding.POSITION_RIGHT;
_9fa.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9fb.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9fc=this.getProperty("label");
if(_9fc){
_9fb.bindingElement.innerHTML=Resolver.resolve(_9fc);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9fa;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9fd=this.getAncestorBindingByLocalName("field");
if(_9fd){
_9fd.attachClassName("fieldhelp");
var _9fe=ClickButtonBinding.newInstance(this.bindingDocument);
_9fe.attachClassName("fieldhelp");
_9fe.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9fe);
_9fe.attach();
var self=this;
_9fe.oncommand=function(){
self.attachPopupBinding();
};
_9fe.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9fe;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a00=this._fieldHelpPopupBinding;
if(_a00&&!_a00.isAttached){
_a00.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a02){
RadioDataGroupBinding.superclass.handleAction.call(this,_a02);
switch(_a02.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a04,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a04,arg);
switch(_a04){
case BroadcastMessages.KEY_ARROW:
var _a06=null;
var next=null;
var _a08=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a08=this.getChildBindingsByLocalName("radio");
while(!_a06&&_a08.hasNext()){
var _a09=_a08.getNext();
if(_a09.getProperty("ischecked")){
_a06=_a09;
}
}
break;
}
if(_a06){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a08.getFollowing(_a06);
while(next!=null&&next.isDisabled){
next=_a08.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a08.getPreceding(_a06);
while(next!=null&&next.isDisabled){
next=_a08.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a0a){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a0a){
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
var _a0b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0b.type="hidden";
_a0b.name=this._name;
this.bindingElement.appendChild(_a0b);
this.shadowTree.input=_a0b;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a0c=null;
var _a0d=this.getChildBindingsByLocalName("radio");
while(!_a0c&&_a0d.hasNext()){
var _a0e=_a0d.getNext();
if(_a0e.isChecked){
_a0c=_a0e.getProperty("value");
}
}
return _a0c;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a0f){
};
RadioDataGroupBinding.prototype.setResult=function(_a10){
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
var _a11=this.getProperty("relate");
var _a12=this.getProperty("oncommand");
var _a13=this.getProperty("isdisabled");
if(_a11){
this.bindingRelate=_a11;
this.relate();
}
if(_a12){
this.oncommand=function(){
Binding.evaluate(_a12,this);
};
}
if(_a13==true){
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
var _a15=this.getCallBackID();
this._buttonBinding.check=function(_a16){
RadioButtonBinding.prototype.check.call(this,_a16);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a17){
RadioButtonBinding.prototype.uncheck.call(this,_a17);
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
RadioDataBinding.prototype.setChecked=function(_a18,_a19){
this._buttonBinding.setChecked(_a18,_a19);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a18);
};
RadioDataBinding.prototype.check=function(_a1a){
this.setChecked(true,_a1a);
};
RadioDataBinding.prototype.uncheck=function(_a1b){
this.setChecked(false,_a1b);
};
RadioDataBinding.prototype.setDisabled=function(_a1c){
if(_a1c!=this.isDisabled){
this.isDisabled=_a1c;
this._buttonBinding.setDisabled(_a1c);
if(_a1c){
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
var _a1e=DOMEvents.getTarget(e);
switch(_a1e){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a1f=this.getProperty("label");
if(_a1f){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a1f)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a20){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a20;
}
this.setProperty("label",_a20);
};
RadioDataBinding.prototype.handleElement=function(_a21){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a22){
var _a23=_a22.getAttribute("ischecked")==="true";
if(this.isChecked!=_a23){
this.setChecked(_a23,true);
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
var _a25=DOMEvents.getTarget(e);
switch(_a25){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a26,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a26,arg);
switch(_a26){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a29){
_a29.consume();
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
var _a2b=this.getCallBackID();
this._buttonBinding.check=function(_a2c){
ButtonBinding.prototype.check.call(this,_a2c);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a2c){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a2d){
ButtonBinding.prototype.uncheck.call(this,_a2d);
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
if(_a2b!=null){
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
var _a2e=true;
var _a2f=this.bindingElement.parentNode;
if(_a2f){
var _a30=UserInterface.getBinding(_a2f);
if(_a30&&_a30 instanceof CheckBoxGroupBinding){
if(_a30.isRequired){
if(_a30.isValid){
_a2e=_a30.validate();
}else{
_a2e=false;
}
}
}
}
return _a2e;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a31=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a31.type="hidden";
_a31.name=this._name;
_a31.style.display="none";
this.bindingElement.appendChild(_a31);
this.shadowTree.input=_a31;
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
var _a32=null;
var _a33=this.getProperty("value");
if(this.isChecked){
_a32=_a33?_a33:"on";
}
return _a32;
};
CheckBoxBinding.prototype.setValue=function(_a34){
if(_a34==this.getValue()||_a34=="on"){
this.check(true);
}else{
if(_a34!="on"){
this.setPropety("value",_a34);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a35=false;
if(this.isChecked){
_a35=this._result!=null?this._result:true;
}
return _a35;
};
CheckBoxBinding.prototype.setResult=function(_a36){
if(typeof _a36=="boolean"){
this.setChecked(_a36,true);
}else{
this._result=_a36;
}
};
CheckBoxBinding.newInstance=function(_a37){
var _a38=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a37);
return UserInterface.registerBinding(_a38,CheckBoxBinding);
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
var _a39=true;
if(this.isRequired){
var _a3a=this.getDescendantBindingsByLocalName("checkbox");
if(_a3a.hasEntries()){
_a39=false;
while(_a3a.hasNext()&&!_a39){
if(_a3a.getNext().isChecked){
_a39=true;
}
}
}
if(_a39==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a39;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a3b){
if(_a3b){
if(!this._labelBinding){
var _a3c=LabelBinding.newInstance(this.bindingDocument);
_a3c.attachClassName("invalid");
_a3c.setImage("${icon:error}");
_a3c.setLabel("Selection required");
this._labelBinding=this.addFirst(_a3c);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a3d){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a3d);
switch(_a3d.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a3e){
var _a3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a3e);
return UserInterface.registerBinding(_a3f,CheckBoxGroupBinding);
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
var _a40=DialogControlBinding.newInstance(this.bindingDocument);
_a40.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a40);
this._controlGroupBinding.attachRecursive();
var _a41=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a41);
var _a42=this.getLabel();
if(_a42!=null){
this.setLabel(_a42);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a43=this._snapTargetBinding;
if(Binding.exists(_a43)==true){
_a43.removeActionListener(Binding.ACTION_BLURRED,this);
_a43.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a44){
if(Interfaces.isImplemented(IData,_a44)){
this._snapTargetBinding=_a44;
var _a45=_a44.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a45&&_a45.isConsumed){
this._environmentBinding=_a45.listener;
}
if(this._environmentBinding){
_a44.addActionListener(Binding.ACTION_BLURRED,this);
_a44.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a44)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a44.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a47=this._snapTargetBinding;
var _a48=this._environmentBinding;
var root=UserInterface.getBinding(_a47.bindingDocument.body);
if(Binding.exists(_a47)&&Binding.exists(_a48)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a47.isAttached&&_a48.isAttached){
var _a4a=_a47.boxObject.getUniversalPosition();
var _a4b=_a48.boxObject.getUniversalPosition();
_a4b.y+=_a48.bindingElement.scrollTop;
_a4b.x+=_a48.bindingElement.scrollLeft;
var tDim=_a47.boxObject.getDimension();
var eDim=_a48.boxObject.getDimension();
var _a4e=false;
if(_a4a.y+tDim.h<_a4b.y){
_a4e=true;
}else{
if(_a4a.x+tDim.w<_a4b.x){
_a4e=true;
}else{
if(_a4a.y>_a4b.y+eDim.h){
_a4e=true;
}else{
if(_a4a.x>_a4b.x+eDim.w){
_a4e=true;
}
}
}
}
if(!_a4e){
this._setComputedPosition(_a4a,_a4b,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a4f,_a50,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a55=_a4f;
var _a56=false;
if(_a4f.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a56=true;
}else{
if(_a4f.x+tDim.w>=_a50.x+eDim.w){
_a56=true;
}
}
if(_a56){
_a55.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a55.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a55.y-=(bDim.h);
_a55.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a55);
};
BalloonBinding.prototype.handleBroadcast=function(_a57,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a57,arg);
switch(_a57){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a59){
var _a5a=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a59){
_a5a=true;
}
}
return _a5a;
};
BalloonBinding.prototype._setPosition=function(_a5c){
var _a5d=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a5d=true;
}
}
if(!_a5d){
this.bindingElement.style.left=_a5c.x+"px";
this.bindingElement.style.top=_a5c.y+"px";
this._point=_a5c;
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
BalloonBinding.prototype.handleAction=function(_a5f){
BalloonBinding.superclass.handleAction.call(this,_a5f);
var _a60=_a5f.target;
switch(_a5f.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a5f.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a60==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a60)){
self.dispose();
}else{
if(_a60.validate()){
var _a62=true;
if(_a5f.type==Binding.ACTION_BLURRED){
var root=_a60.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a62=false;
}
}
if(_a62){
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
BalloonBinding.prototype.setLabel=function(_a65){
if(this.isAttached==true){
var _a66=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a65);
_a66.appendChild(text);
this.bindingElement.appendChild(_a66);
}
this.setProperty("label",_a65);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a68){
var _a69=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a68);
var _a6a=UserInterface.registerBinding(_a69,BalloonBinding);
_a6a.hide();
return _a6a;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a6b,_a6c){
if(Interfaces.isImplemented(IData,_a6c)==true){
var _a6d,_a6e=_a6c.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a6e&&_a6e.isConsumed){
switch(_a6e.listener.constructor){
case StageBinding:
_a6d=false;
break;
case StageDialogBinding:
_a6d=true;
break;
}
}
var _a6f=_a6d?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a70=_a6f.add(BalloonBinding.newInstance(top.app.document));
_a70.setLabel(_a6b.text);
_a70.snapTo(_a6c);
_a70.attach();
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
var _a71=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a74=_a71.getDataBinding(name);
if(_a74){
ErrorBinding.presentError({text:text},_a74);
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
FocusBinding.focusElement=function(_a75){
var _a76=true;
try{
_a75.focus();
Application.focused(true);
}
catch(exception){
var _a77=UserInterface.getBinding(_a75);
var _a78=SystemLogger.getLogger("FocusBinding.focusElement");
_a78.warn("Could not focus "+(_a77?_a77.toString():String(_a75)));
_a76=false;
}
return _a76;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a79){
var win=_a79.bindingWindow;
var id=_a79.bindingElement.id;
return {getBinding:function(){
var _a7c=null;
try{
if(Binding.exists(_a79)){
_a7c=win.bindingMap[id];
}
}
catch(exception){
}
return _a7c;
}};
};
FocusBinding.navigateNext=function(_a7d){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a7d);
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
var _a7e=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a7e&&_a7e.isConsumed){
if(_a7e.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a7f){
FocusBinding.superclass.handleAction.call(this,_a7f);
var _a80=_a7f.target;
var _a81=null;
if(this._isFocusManager){
switch(_a7f.type){
case FocusBinding.ACTION_ATTACHED:
if(_a80!=this){
this._isUpToDate=false;
}
_a7f.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a80!=this){
this._isUpToDate=false;
_a7f.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a81=new FocusCrawler();
_a81.mode=FocusCrawler.MODE_BLUR;
_a81.crawl(_a80.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a7f.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a80!=this){
_a81=new FocusCrawler();
_a81.mode=FocusCrawler.MODE_FOCUS;
_a81.crawl(_a80.bindingElement);
}
_a7f.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a80)){
this.claimFocus();
this._onFocusableFocused(_a80);
}
_a7f.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a80)){
this._onFocusableBlurred(_a80);
}
_a7f.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a82){
var _a83=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a83==null&&list.hasNext()){
var _a85=list.getNext();
if(this._cachedFocus&&_a85==this._cachedFocus.getBinding()){
_a83=_a85;
}
}
if(_a83!=null){
if(_a85.isFocused){
var next=_a82?list.getPreceding(_a83):list.getFollowing(_a83);
if(!next){
next=_a82?list.getLast():list.getFirst();
}
next.focus();
}else{
_a83.focus();
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
var _a87=new FocusCrawler();
var list=new List();
_a87.mode=FocusCrawler.MODE_INDEX;
_a87.crawl(this.bindingElement,list);
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
var _a8a=this._cachedFocus.getBinding();
if(_a8a&&!_a8a.isFocused){
_a8a.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a8b){
if(_a8b!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a8b;
_a8b.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a8b);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a8c){
_a8c.deleteProperty(FocusBinding.MARKER);
if(_a8c==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a8e){
this.bindingElement.style.left=_a8e+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a8f){
this.hiddenTabBindings.add(_a8f);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a90=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a90.getLabel());
item.setImage(_a90.getImage());
item.associatedTabBinding=_a90;
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
TabsButtonBinding.prototype.handleAction=function(_a93){
TabsButtonBinding.superclass.handleAction.call(this,_a93);
switch(_a93.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a94=this.selectedTabBinding;
if(_a94){
this.containingTabBoxBinding.moveToOrdinalPosition(_a94,0);
this.containingTabBoxBinding.select(_a94);
}
_a93.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a95){
var _a96=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a95);
_a96.setAttribute("type","checkbox");
_a96.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a96.className="tabbutton";
return UserInterface.registerBinding(_a96,TabsButtonBinding);
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
var _a97=TabBoxBinding.currentActiveInstance;
if(_a97!=null&&Binding.exists(_a97)){
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
var _a98=this.getTabElements().getLength();
var _a99=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a98!=_a99){
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
var _a9a=this.getTabPanelElements();
while(_a9a.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a9a.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a9b=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a9c=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a9d=_a9b>_a9c?"tabsbelow":"tabsontop";
this.attachClassName(_a9d);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a9f=this.getTabPanelElements();
var _aa0=null;
var _aa1=this.getProperty("selectedindex");
if(_aa1!=null){
if(_aa1>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aa2=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa4=_a9f.getNext();
this.registerTabBoxPair(tab,_aa4);
if(_aa1&&_aa2==_aa1){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aa0=tab;
}
}
_aa2++;
}
if(!_aa0){
_aa0=tabs.getFirst();
_aa0.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa5){
var _aa6=null;
var _aa7=null;
if(this.isEqualSize){
var _aa8=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aaa=this.getTabPanelElements();
_aaa.each(function(_aab){
max=_aab.offsetHeight>max?_aab.offsetHeight:max;
});
_aa7=max+_aa8.top+_aa8.bottom;
if(_aa5&&this._tabPanelsElement.style.height!=null){
_aa6=this._tabPanelsElement.offsetHeight;
}
if(_aa6!=null||_aa7>_aa6){
this._tabPanelsElement.style.height=_aa7+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aac){
_aac._invalidCount=0;
_aac.addActionListener(Binding.ACTION_INVALID,this);
_aac.addActionListener(Binding.ACTION_VALID,this);
_aac.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aad){
TabBoxBinding.superclass.handleAction.call(this,_aad);
var _aae=_aad.target;
var _aaf=_aad.listener;
switch(_aad.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aae.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aad.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aae.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aaf._invalidCount++;
if(_aaf._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aaf.isSelected){
self._showWarning(_aaf,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aaf._invalidCount>0){
_aaf._invalidCount--;
if(_aaf._invalidCount==0){
if(_aaf.isSelected){
this._showWarning(_aaf,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aaf,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aad._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aad._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ab2=DOMEvents.getTarget(e);
if(_ab2==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab4=this.getTabPanelElements();
tabs.each(function(tab,_ab6){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab7=_ab4.get(_ab6);
this.registerTabBoxPair(tab,_ab7);
}
},this);
var _ab8=this._tabBoxPairs;
for(var key in _ab8){
var tab=_ab8[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ab2);
switch(_ab2.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _abc=_ab2.parentNode;
if(_abc==this._tabsElement||_abc==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ab2==this._tabsElement||_ab2==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_abe){
var _abf=this.getBindingForArgument(arg);
if(_abf!=null&&!_abf.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_abf.select(_abe);
this.getTabPanelBinding(_abf).select(_abe);
var _ac0=this.getProperty("selectedindex");
if(_ac0!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_abf.bindingElement,true));
}
this._selectedTabBinding=_abf;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_abf.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ac1=this.getTabPanelBinding(_abf);
this._showBalloon(_ac1,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac3){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac3.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac3};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac7){
var _ac8=null;
try{
var key=_ac7.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aca=this._tabBoxPairs[key].tabPanel;
_ac8=UserInterface.getBinding(_aca);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ac8;
};
TabBoxBinding.prototype.getTabBinding=function(_acb){
var key=_acb.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _acd=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_acd);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ace=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ace);
return _ace;
};
TabBoxBinding.prototype.appendTabByBindings=function(_acf,_ad0){
var _ad1=_acf.bindingElement;
_acf.setProperty("selected",true);
var _ad2=this.summonTabPanelBinding();
var _ad3=_ad2.bindingElement;
if(_ad0){
_ad3.appendChild(_ad0 instanceof Binding?_ad0.bindingElement:_ad0);
}
this.registerTabBoxPair(_ad1,_ad3);
UserInterface.getBinding(this._tabsElement).add(_acf);
this._tabPanelsElement.appendChild(_ad3);
_acf.attach();
UserInterface.getBinding(_ad3).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _acf;
};
TabBoxBinding.prototype.importTabBinding=function(_ad4){
var that=_ad4.containingTabBoxBinding;
var _ad6=that.getTabPanelBinding(_ad4);
var _ad7=_ad6.getBindingElement();
var _ad8=_ad4.getBindingElement();
that.dismissTabBinding(_ad4);
this._tabsElement.appendChild(_ad8);
this._tabPanelsElement.appendChild(_ad7);
this.registerTabBoxPair(_ad8,_ad7);
_ad4.containingTabBoxBinding=this;
this.select(_ad4);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ad9){
var _ada=null;
if(_ad9.isSelected){
_ada=this.getBestTab(_ad9);
this._selectedTabBinding=null;
}
var _adb=this.getTabPanelBinding(_ad9);
this.unRegisterTabBoxPair(_ad9.bindingElement);
_ad9.dispose();
_adb.dispose();
if(_ada!=null){
this.select(_ada,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_adc){
if(_adc.isSelected){
this.selectBestTab(_adc);
}
};
TabBoxBinding.prototype.selectBestTab=function(_add){
var _ade=this.getBestTab(_add);
if(_ade){
this.select(_ade);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_adf){
var _ae0=null;
var _ae1=_adf.getOrdinalPosition(true);
var _ae2=this.getTabBindings();
var _ae3=_ae2.getLength();
var _ae4=_ae3-1;
if(_ae3==1){
_ae0=null;
}else{
if(_ae1==_ae4){
_ae0=_ae2.get(_ae1-1);
}else{
_ae0=_ae2.get(_ae1+1);
}
}
return _ae0;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae5,_ae6){
var _ae7=this.bindingDocument.getElementById(_ae5.bindingElement.id);
var tab=this.getTabElements().get(_ae6);
this._tabsElement.insertBefore(_ae7,tab);
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
var _ae9=this._nodename_tab;
var _aea=new List(this._tabsElement.childNodes);
var _aeb=new List();
while(_aea.hasNext()){
var _aec=_aea.getNext();
if(_aec.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aec)==_ae9){
_aeb.add(_aec);
}
}
return _aeb;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _aed=this._nodename_tabpanel;
var _aee=new List(this._tabPanelsElement.childNodes);
var _aef=new List();
_aee.each(function(_af0){
if(_af0.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af0)==_aed){
_aef.add(_af0);
}
});
return _aef;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _af1=new List();
var _af2=this.getTabElements();
_af2.each(function(_af3){
_af1.add(UserInterface.getBinding(_af3));
});
return _af1;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af4=new List();
this.getTabPanelElements().each(function(_af5){
_af4.add(UserInterface.getBinding(_af5));
});
return _af4;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af6=null;
if(this._selectedTabBinding){
_af6=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af6;
};
TabBoxBinding.prototype._showWarning=function(_af7,_af8){
var _af9=this.getTabBinding(_af7);
if(_af8){
if(_af9.labelBinding.hasImage){
_af9._backupImage=_af9.getImage();
}
_af9.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_af9._backupImage){
_af9.setImage(_af9._backupImage);
}else{
_af9.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_afa,_afb){
var _afc=this.getTabBinding(_afa);
if((_afb&&!_afc.isSelected)||!_afb){
if(_afc.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_afb){
if(_afc.labelBinding.hasImage){
_afc._backupImage=_afc.getImage();
}
_afc.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_afc._backupImage!=null){
_afc.setImage(_afc._backupImage);
}else{
_afc.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_afd){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b00=tab.getOrdinalPosition(true);
var next=null;
var _b02=new List();
tabs.each(function(t){
if(t.isVisible){
_b02.add(t);
}
});
if(_b02.getLength()>1){
if(_b00==0&&!_afd){
next=_b02.getLast();
}else{
if(_b00==_b02.getLength()-1&&_afd){
next=_b02.getFirst();
}else{
if(_afd){
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
var _b04=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b04.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b05){
TabsBinding.superclass.handleAction.call(this,_b05);
switch(_b05.type){
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
var _b08=self.bindingElement.offsetWidth;
if(_b08!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b08;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b09){
if(_b09 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b09);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b0a=false;
var _b0b,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b0e=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b0f=this.bindingElement.offsetWidth-_b0e.RESERVED_SPACE;
var _b10=null;
var sum=0,_b12=0;
var _b13=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b13){
tab=tabs.getNext();
_b0b=UserInterface.getBinding(tab);
if(!_b10){
_b10=_b0b;
}
sum+=tab.offsetWidth;
if(sum>=_b0f){
_b0a=true;
if(_b0b.isSelected){
if(!DOMUtil.isFirstElement(_b0b.bindingElement,true)){
this.isManaging=false;
if(_b10){
_b10.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b0b,_b12-1);
_b13=false;
}
}else{
_b0b.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b0b);
}
}else{
_b0b.show();
_b10=_b0b;
_b12++;
}
}
if(_b13){
if(_b0a&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b14=_b10.getBindingElement();
var _b15=_b14.offsetLeft+_b14.offsetWidth;
var _b16=this.tabsButtonBinding;
setTimeout(function(){
_b16.show(_b15+4);
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
var _b17=TabBinding.superclass.serialize.call(this);
if(_b17){
_b17.label=this.getLabel();
_b17.image=this.getImage();
_b17.tooltip=this.getToolTip();
}
return _b17;
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
var _b18=this.bindingElement.getAttribute("image");
var _b19=this.bindingElement.getAttribute("label");
var _b1a=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b19){
this.setLabel(_b19);
}
if(_b18){
this.setImage(_b18);
}
if(_b1a){
this.setToolTip(_b1a);
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
TabBinding.prototype.setLabel=function(_b1c){
if(_b1c!=null){
this.setProperty("label",_b1c);
if(this.isAttached){
this.labelBinding.setLabel(_b1c);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b1d){
if(_b1d){
this.setProperty("tooltip",_b1d);
if(this.isAttached){
this.labelBinding.setToolTip(_b1d);
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
var _b1f=false;
if(Client.isMozilla==true){
}
if(!_b1f){
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
TabBinding.prototype.select=function(_b20){
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
TabBinding.newInstance=function(_b21){
var _b22=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b21);
return UserInterface.registerBinding(_b22,TabBinding);
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
var _b23=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b23=true;
this._lastKnownDimension=dim1;
}
return _b23;
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
TabPanelBinding.prototype.select=function(_b26){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b26!=true){
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
TabPanelBinding.prototype.handleAction=function(_b27){
TabPanelBinding.superclass.handleAction.call(this,_b27);
var _b28=_b27.target;
switch(_b27.type){
case BalloonBinding.ACTION_INITIALIZE:
_b27.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b29){
var _b2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b29);
UserInterface.registerBinding(_b2a,TabPanelBinding);
return UserInterface.getBinding(_b2a);
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
var _b2b=SplitBoxBinding.superclass.serialize.call(this);
if(_b2b){
_b2b.orient=this.getOrient();
_b2b.layout=this.getLayout();
}
return _b2b;
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
var _b2d=this.getSplitPanelElements();
if(_b2d.hasEntries()){
var _b2e=new List(this.getLayout().split(":"));
if(_b2e.getLength()!=_b2d.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b2d.each(function(_b2f){
_b2f.setAttribute("ratio",_b2e.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b30=this.getProperty("orient");
if(_b30){
this._orient=_b30;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b31=this.getSplitterBindings();
while(_b31.hasNext()){
var _b32=_b31.getNext();
if(_b32&&_b32.getProperty("collapsed")==true){
_b32.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b33){
SplitBoxBinding.superclass.handleAction.call(this,_b33);
switch(_b33.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b33.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b33.target);
_b33.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b33.target);
_b33.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b34){
this._getSplitPanelBindingForSplitter(_b34).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b35){
this._getSplitPanelBindingForSplitter(_b35).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b36){
var _b37=DOMUtil.getOrdinalPosition(_b36.bindingElement,true);
var _b38,_b39=this.getSplitPanelElements();
switch(_b36.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b38=_b39.get(_b37);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b38=_b39.get(_b37+1);
break;
}
return UserInterface.getBinding(_b38);
};
SplitBoxBinding.prototype.invokeLayout=function(_b3a){
var _b3b=this.isHorizontalOrient();
var _b3c=this.getSplitPanelBindings();
var _b3d=this.getSplitterBindings();
var _b3e=new List();
var _b3f,sum=0;
var _b41=0;
_b3c.each(function(_b42){
if(_b42.isFixed==true){
if(!_b3c.hasNext()){
_b41+=_b42.getFix();
}
_b3e.add(0);
sum+=0;
}else{
_b3f=_b42.getRatio();
_b3e.add(_b3f);
sum+=_b3f;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b3e.getLength()!=_b3c.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b43=_b3b?this.getInnerWidth():this.getInnerHeight();
_b43-=_b41;
_b3d.each(function(_b44){
if(_b44.isVisible){
_b43-=SplitterBinding.DIMENSION;
}
});
var unit=_b43/sum;
var _b46=0;
var self=this;
_b3c.each(function(_b48){
var span=0;
var _b4a=_b3e.getNext();
if(_b48.isFixed){
span=_b48.getFix();
}else{
span=Math.floor(unit*_b4a);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b46+=span;
while(_b46>_b43){
_b46--;
span--;
}
if(!_b48.isFixed){
if(_b3b){
_b48.setWidth(span);
}else{
_b48.setHeight(span);
}
}
});
}
if(_b3a!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b4b=this.getLayout();
if(_b4b){
this.setProperty("layout",_b4b);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b4c=this.isHorizontalOrient();
var _b4d=this.getSplitPanelBindings();
var _b4e=this.getSplitterBindings();
var _b4f=null;
var _b50=null;
var unit=null;
var _b52=null;
var span=null;
_b4d.each(function(_b54){
if(!unit){
unit=_b4c?_b54.getWidth():_b54.getHeight();
}
span=_b4c?_b54.getWidth():_b54.getHeight();
if(_b52){
span-=_b52;
_b52=null;
}
_b4f=_b4e.getNext();
if(_b4f&&_b4f.offset){
_b52=_b4f.offset;
span+=_b52;
}
_b54.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b55){
this.logger.debug(_b55);
this.setProperty("layout",_b55);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b56="",_b57=this.getSplitPanelBindings();
_b57.each(function(_b58){
_b56+=_b58.getRatio().toString();
_b56+=_b57.hasNext()?":":"";
});
this.setProperty("layout",_b56);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b59=this.getSplitPanelElements();
_b59.each(function(_b5a){
layout+="1"+(_b59.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b5b){
this.bindingElement.style.width=_b5b+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b5c){
this.bindingElement.style.height=_b5c+"px";
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
var _b5d=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b5d.reverse();
}
return _b5d;
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
SplitBoxBinding.prototype.fit=function(_b5e){
if(!this.isFit||_b5e){
if(this.isHorizontalOrient()){
var max=0;
var _b60=this.getSplitPanelBindings();
_b60.each(function(_b61){
var _b62=_b61.bindingElement.offsetHeight;
max=_b62>max?_b62:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b63){
var _b64=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b63);
return UserInterface.registerBinding(_b64,SplitBoxBinding);
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
var _b67=this.getProperty("hidden");
if(_b67){
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
var _b68=this.getProperty("ratiocache");
if(_b68){
this.setRatio(_b68);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b69){
if(!this.isFixed){
if(_b69!=this.getWidth()){
if(_b69<0){
_b69=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b69+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b69);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b6a=null;
if(this.isFixed){
_b6a=this.getFix();
}else{
_b6a=this.bindingElement.offsetWidth;
}
return _b6a;
};
SplitPanelBinding.prototype.setHeight=function(_b6b){
if(!this.isFixed){
if(_b6b!=this.getHeight()){
try{
this.bindingElement.style.height=_b6b+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b6c=null;
if(this.isFixed){
_b6c=this.getFix();
}else{
_b6c=this.bindingElement.offsetHeight;
}
return _b6c;
};
SplitPanelBinding.prototype.setRatio=function(_b6d){
this.setProperty("ratio",_b6d);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b6e){
if(_b6e){
this._fixedSpan=_b6e;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b6e);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b6e);
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
SplitPanelBinding.newInstance=function(_b6f){
var _b70=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b6f);
return UserInterface.registerBinding(_b70,SplitPanelBinding);
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
var _b71=SplitBoxBinding.superclass.serialize.call(this);
if(_b71){
_b71.collapse=this.getProperty("collapse");
_b71.collapsed=this.getProperty("collapsed");
_b71.disabled=this.getProperty("isdisabled");
}
return _b71;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b72=this.getProperty("hidden");
if(_b72){
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
SplitterBinding.prototype.setCollapseDirection=function(_b74){
this.setProperty("collapse",_b74);
this._collapseDirection=_b74;
};
SplitterBinding.prototype.handleAction=function(_b75){
SplitterBinding.superclass.handleAction.call(this,_b75);
switch(_b75.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b75.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b77=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b77.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b77.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b78){
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
SplitterBinding.newInstance=function(_b83){
var _b84=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b83);
return UserInterface.registerBinding(_b84,SplitterBinding);
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
var _b85=this.getProperty("selectedindex");
var _b86=this.getDeckElements();
if(_b86.hasEntries()){
var _b87=false;
var _b88=0;
while(_b86.hasNext()){
var deck=_b86.getNext();
if(_b85&&_b88==_b85){
deck.setAttribute("selected","true");
_b87=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b87=true;
}
}
_b88++;
}
if(!_b87){
_b86.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b8b=this.getBindingForArgument(arg);
if(_b8b!=null){
if(_b8b!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b8b.select();
this._selectedDeckBinding=_b8b;
var _b8c=this.getProperty("selectedindex");
if(_b8c!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b8b.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b8d=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b8d=true;
this._lastKnownDimension=dim1;
}
return _b8d;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b90){
var _b91=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b90);
return UserInterface.registerBinding(_b91,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b92){
DeckBinding.superclass.handleAction.call(this,_b92);
var _b93=_b92.target;
switch(_b92.type){
case BalloonBinding.ACTION_INITIALIZE:
_b92.consume();
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
DeckBinding.newInstance=function(_b95){
var _b96=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b95);
return UserInterface.registerBinding(_b96,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b97){
if(_b97 instanceof ToolBarBodyBinding){
if(_b97.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b97;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b97;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b97);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b98=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b98){
this.setImageSize(_b98);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b9a=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b9a.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b9a.isDefaultContent=true;
this.add(_b9a);
_b9a.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b9c=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b9c);
}
if(_b9c!=null&&_b9c.hasClassName("max")){
this._maxToolBarGroup(_b9c,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b9e){
var _b9f=this.boxObject.getDimension().w;
var _ba0=CSSComputer.getPadding(this.bindingElement);
_b9f-=(_ba0.left+_ba0.right);
if(_b9e!=null){
_b9f-=_b9e.boxObject.getDimension().w;
if(!Client.isWindows){
_b9f-=1;
}
if(Client.isExplorer){
_b9f-=15;
}
}
max.bindingElement.style.width=_b9f+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ba1){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ba1);
};
ToolBarBinding.prototype.addLeft=function(_ba2,_ba3){
var _ba4=null;
if(this._toolBarBodyLeft!=null){
_ba4=this._toolBarBodyLeft.add(_ba2,_ba3);
}else{
throw new Error("No left toolbarbody");
}
return _ba4;
};
ToolBarBinding.prototype.addLeftFirst=function(_ba5,_ba6){
var _ba7=null;
if(this._toolBarBodyLeft){
_ba7=this._toolBarBodyLeft.addFirst(_ba5,_ba6);
}else{
throw new Error("No left toolbarbody");
}
return _ba7;
};
ToolBarBinding.prototype.addRight=function(_ba8){
var _ba9=null;
if(this._toolBarBodyRight){
_ba9=this._toolBarBodyRight.add(_ba8);
}else{
throw new Error("No left toolbarbody");
}
return _ba9;
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
ToolBarBinding.newInstance=function(_bac){
var _bad=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bac);
return UserInterface.registerBinding(_bad,ToolBarBinding);
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
var _bae=this.getDescendantBindingsByLocalName("toolbargroup");
var _baf=new List();
var _bb0=true;
_bae.each(function(_bb1){
if(_bb1.isVisible&&!_bb1.isDefaultContent){
_baf.add(_bb1);
}
});
while(_baf.hasNext()){
var _bb2=_baf.getNext();
_bb2.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bb0){
_bb2.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bb0=false;
}
if(!_baf.hasNext()){
_bb2.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bb5=list.getNext();
var _bb6=_bb5.getEqualSizeWidth();
if(_bb6>max){
max=_bb6;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bb5=list.getNext();
_bb5.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bb7,_bb8){
var _bb9=ToolBarBinding.superclass.add.call(this,_bb7);
if(!_bb8){
if(_bb7 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb9;
};
ToolBarBodyBinding.prototype.addFirst=function(_bba,_bbb){
var _bbc=ToolBarBinding.superclass.addFirst.call(this,_bba);
if(!_bbb){
if(_bba instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbc;
};
ToolBarBodyBinding.newInstance=function(_bbd){
var _bbe=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bbd);
return UserInterface.registerBinding(_bbe,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bbf){
switch(_bbf){
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
var _bc0=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc0)=="toolbarbody"){
UserInterface.getBinding(_bc0).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bc1=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc1)=="toolbarbody"){
UserInterface.getBinding(_bc1).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bc2){
var _bc3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bc2);
return UserInterface.registerBinding(_bc3,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bc4){
var _bc5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc4);
return UserInterface.registerBinding(_bc5,ToolBarButtonBinding);
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
var _bc6=this.getProperty("label");
var _bc7=this.getProperty("image");
if(_bc6){
this.setLabel(_bc6);
}
if(_bc7){
this.setImage(_bc7);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bc8,_bc9){
if(this.isAttached){
this._labelBinding.setLabel(_bc8,_bc9);
}
this.setProperty("label",_bc8);
};
ToolBarLabelBinding.prototype.setImage=function(_bca,_bcb){
if(this.isAttached){
this._labelBinding.setImage(_bca,_bcb);
}
this.setProperty("image",_bca);
};
ToolBarLabelBinding.newInstance=function(_bcc){
var _bcd=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bcc);
return UserInterface.registerBinding(_bcd,ToolBarLabelBinding);
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
var _bce=this.getDescendantBindingsByLocalName("clickbutton");
if(_bce.hasEntries()){
while(_bce.hasNext()){
var _bcf=_bce.getNext();
if(_bcf.isDefault){
this._defaultButton=_bcf;
_bcf.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bcf.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bce;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bd0,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bd0,arg);
switch(_bd0){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bd2=this.getAncestorBindingByType(DialogBinding,true);
if(_bd2!=null&&_bd2.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bd3){
DialogToolBarBinding.superclass.handleAction.call(this,_bd3);
var _bd4=_bd3.target;
var _bd5=false;
var _bd6=this._buttons.reset();
if(_bd4 instanceof ClickButtonBinding){
switch(_bd3.type){
case Binding.ACTION_FOCUSED:
_bd4.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd4;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd4.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bd5&&_bd6.hasNext()){
var _bd7=_bd6.getNext();
_bd5=_bd7.isFocused;
}
if(!_bd5){
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
ComboBoxBinding.newInstance=function(_bd9){
var _bda=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bd9);
return UserInterface.registerBinding(_bda,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bdb,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bdb,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bdf=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bdf.each(function(_be0){
var _be1=_be0.getProperty("oncommand");
_be0.setProperty("hiddencommand",_be1);
_be0.deleteProperty("oncommand");
_be0.oncommand=function(){
self.setAndFireButton(this);
};
});
var _be2=null;
var _be3=this.getActiveMenuItemId();
_bdf.reset();
while(_bdf.hasNext()){
var _be4=_bdf.getNext();
if(_be4.getProperty("id")==_be3){
_be2=_be4;
break;
}
}
if(_be2==null&&_bdf.hasEntries()){
_be2=_bdf.getFirst();
}
if(_be2!=null){
this.setButton(_be2);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_be5){
if(_be5 instanceof MenuItemBinding){
var _be6=_be5.getProperty("label");
var _be7=_be5.getProperty("image");
var _be8=_be5.getProperty("image-hover");
var _be9=_be5.getProperty("image-active");
var _bea=_be5.getProperty("image-disabled");
var _beb=_be5.getProperty("hiddencommand");
this.setLabel(_be6?_be6:"");
this.image=_be7;
this.imageHover=_be7;
this.imageActive=_be9;
this.imageDisabled=_bea;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_beb,this);
};
this.hideActiveItem(_be5);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bec){
if(_bec instanceof MenuItemBinding){
this.setButton(_bec);
this.setActiveMenuItemId(_bec.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bed){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bee){
if(_bee==_bed){
Binding.prototype.hide.call(_bee);
}else{
Binding.prototype.show.call(_bee);
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
var _bf0=this._views;
for(var _bf1 in ViewDefinitions){
var def=ViewDefinitions[_bf1];
var key=def.perspective;
if(key!=null){
if(!_bf0.has(key)){
_bf0.set(key,new List());
}
var list=_bf0.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bf5,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bf5,arg);
switch(_bf5){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bf8=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bf8.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bf8.add(StageViewMenuItemBinding.newInstance(_bf8.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bf8.show();
}else{
_bf8.hide();
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
TreeBinding.grid=function(_bfc){
var _bfd=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bfc);
var _bff=_bfc%_bfd;
if(_bff>0){
_bfc=_bfc-_bff+_bfd;
}
return _bfc+TreeBodyBinding.PADDING_TOP;
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
var _c00=this.getProperty("focusable");
if(_c00!=null){
this._isFocusable=_c00;
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
var _c02=this.getProperty("builder");
if(_c02){
this._buildFromTextArea(_c02);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c03=this.getProperty("selectable");
var _c04=this.getProperty("selectionproperty");
var _c05=this.getProperty("selectionvalue");
if(_c03){
this.setSelectable(true);
if(_c04){
this.setSelectionProperty(_c04);
}
if(_c05){
this.setSelectionValue(_c05);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c08=UserInterface.getBinding(area);
var _c09=this._treeBodyBinding;
function build(){
_c09.subTreeFromString(area.value);
}
_c08.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c0a){
var _c0b=_c0a.getHandle();
if(this._treeNodeBindings.has(_c0b)){
throw "Duplicate treenodehandles registered: "+_c0a.getLabel();
}else{
this._treeNodeBindings.set(_c0b,_c0a);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c0b)){
_c0a.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c0d){
this._treeNodeBindings.del(_c0d.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c0e){
var _c0f=null;
if(this._treeNodeBindings.has(_c0e)){
_c0f=this._treeNodeBindings.get(_c0e);
}else{
throw "No such treenode: "+_c0e;
}
return _c0f;
};
TreeBinding.prototype.handleAction=function(_c10){
TreeBinding.superclass.handleAction.call(this,_c10);
var _c11=_c10.target;
switch(_c10.type){
case TreeNodeBinding.ACTION_OPEN:
_c10.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c11);
_c10.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c11;
this.focusSingleTreeNodeBinding(_c11);
if(!this.isFocused){
this.focus();
}
_c10.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c11;
this.focusSingleTreeNodeBinding(_c11);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c11;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c11;
this.focusSingleTreeNodeBinding(_c11);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c10.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c11.isFocused){
this.blurSelectedTreeNodes();
}
_c10.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c12,_c13){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c14){
if(_c14!=null&&!_c14.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c14);
_c14.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c15){
this.blurSelectedTreeNodes();
while(_c15.hasNext()){
var _c16=_c15.getNext();
this._focusedTreeNodeBindings.add(_c16);
_c16.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c17=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c18=false;
var _c19=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c1a=this._focusedTreeNodeBindings.getNext();
var _c1b=_c1a.getProperty(this._selectionProperty);
if(_c1b!=null){
if(!this._selectionValue||this._selectionValue[_c1b]){
_c19=(this._selectedTreeNodeBindings[_c1a.key]=_c1a);
var _c1c=_c17[_c1a.key];
if(!_c1c||_c1c!=_c19){
_c18=true;
}
}
}
}
if(_c19){
if(_c18){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c17){
for(var key in _c17){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c1e=new List();
for(var key in this._selectedTreeNodeBindings){
_c1e.add(this._selectedTreeNodeBindings[key]);
}
return _c1e;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c20){
_c20.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c21){
var _c22=_c21.getDescendantBindingsByLocalName("treenode");
var _c23=true;
var self=this;
_c22.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c23;
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
var _c26=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c26!=null){
this.focusSingleTreeNodeBinding(_c26);
_c26.callback();
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
TreeBinding.prototype.add=function(_c27){
var _c28=null;
if(this._treeBodyBinding){
_c28=this._treeBodyBinding.add(_c27);
}else{
this._treeNodeBuffer.add(_c27);
_c28=_c27;
}
return _c28;
};
TreeBinding.prototype.addFirst=function(_c29){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c2a=this._treeBodyBinding.bindingElement;
_c2a.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c2b,_c2c){
if(_c2c.isContainer&&_c2c.isOpen){
_c2c.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c2d){
this._isSelectable=_c2d;
if(_c2d){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c2e){
this._selectionProperty=_c2e;
};
TreeBinding.prototype.setSelectionValue=function(_c2f){
if(_c2f){
var list=new List(_c2f.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c31,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c31,arg);
switch(_c31){
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
var _c33=this.getFocusedTreeNodeBindings();
if(_c33.hasEntries()){
var node=_c33.getFirst();
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
var _c36=this.getFocusedTreeNodeBindings();
if(_c36.hasEntries()){
var node=_c36.getFirst();
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
var _c39=null;
while(next==null&&(_c39=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c39!=null){
next=_c39.getNextBindingByLocalName("treenode");
}
node=_c39;
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
var _c3b=DOMEvents.getTarget(e);
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
var _c3c=new TreeCrawler();
var list=new List();
_c3c.mode=TreeCrawler.MODE_GETOPEN;
_c3c.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c3f=list.getNext();
map.set(_c3f.getHandle(),true);
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
var _c44=this._positionIndicatorBinding;
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
if(y!=_c44.getPosition().y){
_c44.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c44.isVisible){
_c44.show();
}
}else{
if(_c44.isVisible){
_c44.hide();
}
}
}else{
if(_c44.isVisible){
_c44.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c47){
this._acceptingTreeNodeBinding=_c47;
this._acceptingPosition=_c47.boxObject.getLocalPosition();
this._acceptingDimension=_c47.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c47);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c48){
var map={};
var _c4a=_c48.getChildBindingsByLocalName("treenode");
var _c4b,pos,dim,y;
y=TreeBinding.grid(_c48.boxObject.getLocalPosition().y);
map[y]=true;
while(_c4a.hasNext()){
_c4b=_c4a.getNext();
pos=_c4b.boxObject.getLocalPosition();
dim=_c4b.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c51 in this._acceptingPositions){
if(_c51==y){
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
TreeBinding.newInstance=function(_c52){
var _c53=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c52);
var _c54=UserInterface.registerBinding(_c53,TreeBinding);
_c54.treeBodyBinding=TreeBodyBinding.newInstance(_c52);
return _c54;
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
TreeBodyBinding.prototype.accept=function(_c55){
if(_c55 instanceof TreeNodeBinding){
this.logger.debug(_c55);
}
};
TreeBodyBinding.newInstance=function(_c56){
var _c57=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c56);
return UserInterface.registerBinding(_c57,TreeBodyBinding);
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
var _c58=TreeNodeBinding.superclass.serialize.call(this);
if(_c58){
_c58.label=this.getLabel();
_c58.image=this.getImage();
var _c59=this.getHandle();
if(_c59&&_c59!=this.key){
_c58.handle=_c59;
}
if(this.isOpen){
_c58.open=true;
}
if(this.isDisabled){
_c58.disabled=true;
}
if(this.dragType){
_c58.dragtype=this.dragType;
}
if(this.dragAccept){
_c58.dragaccept=this.dragAccept;
}
}
return _c58;
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
var _c5b=UserInterface.getBinding(node);
if(_c5b&&_c5b.containingTreeBinding){
this.containingTreeBinding=_c5b.containingTreeBinding;
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
var _c5c=this.key;
var _c5d=this.getProperty("handle");
if(_c5d){
_c5c=_c5d;
}
return _c5c;
};
TreeNodeBinding.prototype.setHandle=function(_c5e){
this.setProperty("handle",_c5e);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c60=this.getProperty("label");
var _c61=this.getProperty("tooltip");
var _c62=this.getProperty("oncommand");
var _c63=this.getProperty("onbindingfocus");
var _c64=this.getProperty("onbindingblur");
var _c65=this.getProperty("focused");
var _c66=this.getProperty("callbackid");
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
if(_c60!=null){
this.setLabel(_c60);
}
if(_c61!=null){
this.setToolTip(_c61);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c68=this.bindingWindow.WindowManager;
if(_c62!=null){
this.oncommand=function(){
Binding.evaluate(_c62,this);
};
}
if(_c63!=null){
this.onfocus=function(){
Binding.evaluate(_c63,this);
};
}
if(_c64!=null){
this.onblur=function(){
Binding.evaluate(_c64,this);
};
}
if(_c65==true){
this.focus();
}
if(_c66!=null){
Binding.dotnetify(this,_c66);
}
};
TreeNodeBinding.prototype.handleAction=function(_c69){
TreeNodeBinding.superclass.handleAction.call(this,_c69);
switch(_c69.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c69.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c6a,_c6b){
var _c6c=true;
if(_c6a instanceof TreeNodeBinding){
var _c6d=false;
var _c6e=this.bindingElement;
var _c6f=this.containingTreeBinding.bindingElement;
while(!_c6d&&_c6e!=_c6f){
if(_c6e==_c6a.getBindingElement()){
_c6d=true;
}else{
_c6e=_c6e.parentNode;
}
}
if(_c6d){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c6c=false;
}else{
this.acceptTreeNodeBinding(_c6a,_c6b);
}
}else{
_c6c=false;
}
return _c6c;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c70,_c71){
var _c72=_c70.serializeToString();
var _c73=new BindingParser(this.bindingDocument);
var _c74=_c73.parseFromString(_c72).getFirst();
_c71=_c71?_c71:this.containingTreeBinding.getDropIndex();
var _c75=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c74,_c75.get(_c71));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c70.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c76=this.getProperty("image");
var _c77=this.getProperty("image-active");
var _c78=this.getProperty("image-disabled");
_c77=_c77?_c77:this.isContainer?_c76?_c76:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c76?_c76:TreeNodeBinding.DEFAULT_ITEM;
_c78=_c78?_c78:this.isContainer?_c76?_c76:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c76?_c76:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c76=_c76?_c76:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c76,imageHover:null,imageActive:_c77,imageDisabled:_c78});
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
TreeNodeBinding.prototype.setLabel=function(_c7a){
this.setProperty("label",String(_c7a));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7a));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c7b){
this.setProperty("tooltip",String(_c7b));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c7b));
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
var _c7c=this.imageProfile.getDefaultImage();
var _c7d=this.imageProfile.getActiveImage();
_c7d=_c7d?_c7d:_c7c;
return this.isOpen?_c7d:_c7c;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c7f=DOMEvents.getTarget(e);
var _c80=this.labelBinding.bindingElement;
var _c81=this.labelBinding.shadowTree.labelBody;
var _c82=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c7f){
case _c80:
this._onAction(e);
break;
case _c81:
case _c82:
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
if(_c7f.parentNode==this.bindingElement&&_c7f.__updateType==Update.TYPE_INSERT){
var _c80=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c7f)=="treenode"){
if(_c7f==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c7f,_c80.nextSibling);
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
switch(_c7f){
case _c80:
case _c81:
case _c82:
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
var _c86=true;
if(e.type=="mousedown"){
var _c87=e.button==(e.target?0:1);
if(!_c87){
_c86=false;
}
}
if(_c86){
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
var _c89=false;
if(e!=null){
_c89=e.shiftKey;
}
this.dispatchAction(_c89?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c8c=this.getDescendantBindingsByLocalName("treenode");
_c8c.each(function(_c8d){
_c8d.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c8e){
var _c8f=_c8e.getAttribute("focused");
if(_c8f=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c90){
var _c91=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c90);
return UserInterface.registerBinding(_c91,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c92){
var _c93=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c92);
return UserInterface.registerBinding(_c93,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c94){
this.bindingElement.style.left=_c94.x+"px";
this.bindingElement.style.top=_c94.y+"px";
this._geometry.x=_c94.x;
this._geometry.y=_c94.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c95){
var _c96=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c95);
return UserInterface.registerBinding(_c96,TreePositionIndicatorBinding);
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
this.addFilter(function(_c98){
var _c99=UserInterface.getBinding(_c98);
var _c9a=null;
var _c9a=null;
if(!_c99 instanceof TreeNodeBinding){
_c9a=NodeCrawler.SKIP_NODE;
}
return _c9a;
});
this.addFilter(function(_c9b,list){
var _c9d=UserInterface.getBinding(_c9b);
var _c9e=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c9d.isOpen){
list.add(_c9d);
}
break;
}
return _c9e;
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
DockTabsButtonBinding.newInstance=function(_c9f){
var _ca0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9f);
_ca0.setAttribute("type","checkbox");
_ca0.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca0.className="tabbutton";
return UserInterface.registerBinding(_ca0,DockTabsButtonBinding);
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
var _ca1=DockBinding.superclass.serialize.call(this);
if(_ca1){
_ca1.active=this.isActive?true:null;
_ca1.collapsed=this.isCollapsed?true:null;
}
return _ca1;
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
DockBinding.prototype.interceptDisplayChange=function(_ca3){
var _ca4=this.getSelectedTabPanelBinding();
if(_ca4){
_ca4.isVisible=_ca3;
_ca4.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca5){
var _ca6=this._getBindingForDefinition(_ca5);
var _ca7=DockTabBinding.newInstance(this.bindingDocument);
_ca7.setHandle(_ca5.handle);
_ca7.setLabel(_ca5.flowHandle?null:_ca5.label);
_ca7.setImage(_ca5.image);
_ca7.setToolTip(_ca5.toolTip);
_ca7.setEntityToken(_ca5.entityToken);
_ca7.setAssociatedView(_ca6);
this.appendTabByBindings(_ca7,null);
this._setupPageBindingListeners(_ca7);
var _ca8=this.getTabPanelBinding(_ca7);
_ca6.snapToBinding(_ca8);
var _ca9=this.bindingWindow.bindingMap.views;
_ca9.add(_ca6);
if(!this.isActive){
this.activate();
}
_ca6.attach();
};
DockBinding.prototype.prepareOpenView=function(_caa,_cab){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cab.setLabel(_caa.label);
_cab.setImage(_caa.image);
_cab.setToolTip(_caa.toolTip);
this._setupPageBindingListeners(_cab);
var _cac=this.getTabPanelBinding(_cab);
var _cad=this._getBindingForDefinition(_caa);
_cab.setAssociatedView(_cad);
_cad.snapToBinding(_cac);
UserInterface.getBinding(this.bindingDocument.body).add(_cad);
_cad.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cae){
var _caf=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_caf.bindingDocument);
view.setDefinition(_cae);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb1){
var _cb2=this.getTabPanelBinding(_cb1);
var self=this;
var _cb4={handleAction:function(_cb5){
var _cb6=_cb5.target;
switch(_cb5.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cb6.reflex(true);
var view=_cb1.getAssociatedView();
if(_cb6.bindingWindow==view.getContentWindow()){
_cb1.updateDisplay(_cb6);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb1.onPageInitialize(_cb6);
_cb5.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb1.getAssociatedView();
if(_cb6.bindingWindow==view.getContentWindow()){
_cb1.updateDisplay(_cb6);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb1.updateDisplay(_cb6);
_cb5.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb1.updateEntityToken(_cb6);
_cb5.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb1.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb1.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb1);
_cb5.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb1,true);
_cb5.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb1);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb2.reflex(true);
_cb5.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb1.isDirty){
_cb1.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb8){
_cb2.addActionListener(_cb8,_cb4);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb9){
DockBinding.superclass.handleAction.call(this,_cb9);
var _cba=_cb9.target;
switch(_cb9.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb9.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cba instanceof DockBinding){
if(_cba.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cba);
if(this.isActive){
_cba.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cba);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cbb,arg){
DockBinding.superclass.handleBroadcast.call(this,_cbb,arg);
switch(_cbb){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cbd=arg;
if(_cbd.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cbd.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cbe){
var tabs=this.getTabBindings();
var _cc0=false;
while(tabs.hasNext()&&!_cc0){
var tab=tabs.getNext();
var _cc2=tab.getEntityToken();
if(_cc2!=null&&_cc2==_cbe){
if(!tab.isSelected){
this.select(tab,true);
_cc0=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc3){
this._handleCollapse(true,_cc3);
};
DockBinding.prototype.unCollapse=function(_cc4){
this._handleCollapse(false,_cc4);
};
DockBinding.prototype._handleCollapse=function(_cc5,_cc6){
var _cc7=this.getChildBindingByLocalName("dockpanels");
var _cc8=this.getAncestorBindingByLocalName("splitbox");
if(_cc5){
_cc7.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cc6&&_cc8.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cc7.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cc6){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc5);
this.isCollapsed=_cc5;
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
DockBinding.prototype.closeTab=function(_ccd,_cce){
if(_ccd.isDirty&&!_cce){
var _ccf=Resolver.resolve(_ccd.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ccf),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd1){
switch(_cd1){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_ccd);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_ccd);
break;
}
}});
}else{
this.removeTab(_ccd);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd2){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd2){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd5){
var _cd6=_cd5.getAssociatedView();
_cd6.saveContainedEditor();
var self=this;
var _cd8={handleBroadcast:function(_cd9,arg){
switch(_cd9){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cd6.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cd8);
if(arg.isSuccess){
self.removeTab(_cd5);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cd8);
};
DockBinding.prototype.appendTabByBindings=function(_cdb,_cdc){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cdb,_cdc);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cdd){
_cdd=_cdd?_cdd+"px":"100%";
this.bindingElement.style.width=_cdd;
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
var _cde=null;
var _cdf=this.getTabBindings();
var _ce0=_cdf.getLength();
if(_ce0==1){
_cde=null;
}else{
_cde=_cdf.get(0);
}
return _cde;
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
var _ce2=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce2)){
_ce2=_ce2>0?_ce2-1:0;
self.bindingElement.style.width=new String(_ce2)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce3){
DockTabsBinding.superclass.handleCrawler.call(this,_ce3);
switch(_ce3.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_ce6){
var _ce7=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce6);
return UserInterface.registerBinding(_ce7,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce8){
this._viewBinding=_ce8;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce9=DockTabBinding.superclass.serialize.call(this);
if(_ce9){
_ce9.label=null;
_ce9.image=null;
_ce9.handle=this.getHandle();
}
return _ce9;
};
DockTabBinding.prototype.setHandle=function(_cea){
this.setProperty("handle",_cea);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ceb){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ceb;
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
var _cec=DialogControlBinding.newInstance(this.bindingDocument);
_cec.setControlType(ControlBinding.TYPE_CLOSE);
_cec.attachClassName("closecontrol");
this._controlGroupBinding.add(_cec);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_ced){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ced){
this.isDirty=_ced;
if(Binding.exists(this.labelBinding)){
var _cee=this.labelBinding.getLabel();
if(_cee!=null){
this.labelBinding.setLabel(_ced?"*"+_cee:_cee.slice(1,_cee.length));
}else{
this.labelBinding.setLabel(_ced?"*":"");
}
}
}
var _cef=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cef.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cef.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf0){
this.setLabel(_cf0.getLabel());
this.setImage(_cf0.getImage());
this.setToolTip(_cf0.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf1){
this.setEntityToken(_cf1.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cf2){
DockTabBinding.superclass.handleAction.call(this,_cf2);
var _cf3=_cf2.target;
switch(_cf2.type){
case ControlBinding.ACTION_COMMAND:
if(_cf3.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cf2.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf3);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf4){
var cmd=_cf4.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cf6){
if(!_cf6){
if(!this.getLabel()){
_cf6=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf6=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cf6=this.isDirty?"*"+_cf6:_cf6;
DockTabBinding.superclass.setLabel.call(this,_cf6);
};
DockTabBinding.prototype.setImage=function(_cf7){
if(!_cf7){
if(!this.getImage()){
_cf7=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cf7=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cf7);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cfa=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cfa;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cfa;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cfa;
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
var _cfc=this.bindingElement;
setTimeout(function(){
_cfc.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cfd,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cfd,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cfd){
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
DockTabBinding.prototype.select=function(_d02){
DockTabBinding.superclass.select.call(this,_d02);
this._updateBroadcasters();
if(_d02!=true){
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
var _d03=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d04=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d04.enable();
if(this.isDirty){
_d03.enable();
}else{
_d03.disable();
}
}else{
_d04.disable();
_d03.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d05){
if(this._canUpdateTree||_d05){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d06=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d08=win.bindingMap.savebutton;
if(_d08!=null){
_d06=true;
}
}
}
return _d06;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d09){
var _d0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d09);
return UserInterface.registerBinding(_d0a,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d0b){
var _d0c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d0b);
return UserInterface.registerBinding(_d0c,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d0d){
DockPanelBinding.superclass.select.call(this,_d0d);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d0e){
DockPanelBinding.superclass.handleCrawler.call(this,_d0e);
if(_d0e.response==null){
if(_d0e.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d0e.id==FocusCrawler.ID){
_d0e.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d0f){
var _d10=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d0f);
return UserInterface.registerBinding(_d10,DockPanelBinding);
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
ViewBinding.getInstance=function(_d11){
var _d12=ViewBinding._instances.get(_d11);
if(!_d12){
var cry="ViewBinding.getInstance: No such instance: "+_d11;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d12;
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
var _d15=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d15){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d16=snap.boxObject.getGlobalPosition();
var _d17=snap.boxObject.getDimension();
if(!Point.isEqual(_d16,this._lastknownposition)){
this.setPosition(_d16);
this._lastknownposition=_d16;
}
if(!Dimension.isEqual(_d17,this._lastknowndimension)){
this.setDimension(_d17);
this._lastknowndimension=_d17;
var _d18=_d17.h-ViewBinding.VERTICAL_ADJUST;
_d18=_d18<0?0:_d18;
this.windowBinding.getBindingElement().style.height=new String(_d18)+"px";
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
var _d19=this._viewDefinition.flowHandle;
if(_d19!=null){
FlowControllerService.CancelFlow(_d19);
}
}
if(this._viewDefinition!=null){
var _d1a=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d1a);
this.logger.fine("ViewBinding closed: \""+_d1a+"\"");
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
var _d1c=null;
if(this._viewDefinition!=null){
_d1c=this._viewDefinition.handle;
}
return _d1c;
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
ViewBinding.prototype.setDefinition=function(_d1d){
this._viewDefinition=_d1d;
if(_d1d.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d1e){
ViewBinding.superclass.handleAction.call(this,_d1e);
var _d1f=_d1e.target;
switch(_d1e.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d1e.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d1f.isActivated){
_d1f.onActivate();
}
}
_d1e.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d1f==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d1e.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d1f==this._snapBinding){
if(_d1f.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d1f.getContentWindow().isPostBackDocument){
if(_d1e.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d1f.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d1f==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d1f.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d1e.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d1e.type==WindowBinding.ACTION_ONLOAD){
var win=_d1f.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d1f);
}
}
}
_d1e.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d1f.label&&this._viewDefinition.label){
_d1f.label=this._viewDefinition.label;
}
if(!_d1f.image&&this._viewDefinition.image){
_d1f.image=this._viewDefinition.image;
}
if(_d1f.bindingWindow==this.getContentWindow()){
this._pageBinding=_d1f;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d1f.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d1f==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d1e.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d1e.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d24,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d24,arg);
switch(_d24){
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
var _d28=def.argument;
if(_d28!=null){
page.setPageArgument(_d28);
}
var _d29=def.width;
if(_d29!=null){
page.width=_d29;
}
var _d2a=def.height;
if(_d2a!=null){
page.height=_d2a;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d2b){
ViewBinding.superclass.handleCrawler.call(this,_d2b);
switch(_d2b.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d2b.id==FocusCrawler.ID){
if(_d2b.previousNode!=this._snapBinding.bindingElement){
_d2b.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d2b.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d2c){
_d2c.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d2c.x+"px";
this.bindingElement.style.top=_d2c.y+"px";
};
ViewBinding.prototype.setDimension=function(_d2d){
_d2d.h-=ViewBinding.VERTICAL_ADJUST;
_d2d.w-=ViewBinding.HORIZONTAL_ADJUST;
_d2d.w-=1;
if(_d2d.h<0){
_d2d.h=0;
}
if(_d2d.w<0){
_d2d.w=0;
}
this.bindingElement.style.width=String(_d2d.w)+"px";
this.bindingElement.style.height=String(_d2d.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d2e){
this.isFlexBoxBehavior=false;
_d2e.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d2e.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d2e.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d2e;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d2f=null;
if(this.isFreeFloating==true){
_d2f=this._snapBinding.getBindingElement();
}else{
_d2f=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d2f;
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
ViewBinding.prototype.reload=function(_d30){
this._isLoaded=false;
this.windowBinding.reload(_d30);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d31=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d31=true;
}
}
if(!_d31){
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
ViewBinding.newInstance=function(_d35){
var _d36=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d35);
var _d37=UserInterface.registerBinding(_d36,ViewBinding);
_d37.windowBinding=_d37.add(WindowBinding.newInstance(_d35));
return _d37;
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
var _d3f=this.bindingWindow.__doPostBack;
var _d40=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d40){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d41,_d42){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d40=true;
}
self.manifestAllDataBindings();
_d3f(_d41,_d42);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d43,list){
var _d45=this.bindingWindow.bindingMap.__REQUEST;
if(_d45!=null&&this._isDotNet()){
switch(_d43){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d45.postback(_d43);
}
}
break;
default:
_d45.postback(_d43);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d43,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d46,list){
var _d48=this.getDescendantBindingsByType(WindowBinding);
_d48.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d46,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d4c){
if(_d4c.name==null||_d4c.name==""){
return;
}
list.add({name:_d4c.name,value:_d4c.value});
});
var out="";
list.each(function(_d4e){
out+=_d4e.name+": "+_d4e.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d4f){
PageBinding.superclass.handleAction.call(this,_d4f);
var _d50=_d4f.target;
switch(_d4f.type){
case RootBinding.ACTION_PHASE_3:
if(_d50==UserInterface.getBinding(this.bindingDocument.body)){
_d50.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d50);
}
_d4f.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d51=this.validateAllDataBindings();
if(_d51){
this.doPostBack(_d50);
}
}
_d4f.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d4f.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d50.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d50.key)){
this._initBlockers.del(_d50.key);
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
var _d53={handleAction:function(_d54){
if(_d54.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d53);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d53);
}else{
MessageQueue.udpdate();
}
_d4f.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d55,arg){
PageBinding.superclass.handleBroadcast.call(this,_d55,arg);
switch(_d55){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d57=arg;
if(!this._canPostBack&&!_d57){
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
PageBinding.prototype.doPostBack=function(_d59){
if(this._canPostBack){
if(_d59!=null&&this._isDotNet()){
var _d5a=_d59.getCallBackID();
var _d5b=_d59.getCallBackArg();
if(_d5a!=null){
_d5a=_d5a.replace(/_/g,"$");
}else{
_d5a="";
}
if(_d5b==null){
_d5b="";
}
this.bindingWindow.__doPostBack(_d5a,_d5b);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d5c){
var _d5d=true;
var _d5e=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5e.hasNext()&&_d5d){
var _d5f=_d5e.getNext();
if(_d5f.isAttached){
var _d60=_d5f.validate();
if(_d5d&&!_d60){
_d5d=false;
this.logger.debug("Invalid DataBinding: "+_d5f.toString()+" ("+_d5f.getName()+")");
if(_d5c){
var _d61=_d5f.getAncestorBindingByType(TabPanelBinding);
if(_d61!=null&&!_d61.isVisible){
var _d62=_d61.getAncestorBindingByType(TabBoxBinding);
var _d63=_d62.getTabBinding(_d61);
_d62.select(_d63);
}
}
break;
}
}
}
return _d5d;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d65=this.bindingWindow.DataManager.getAllDataBindings();
while(_d65.hasNext()){
var _d66=_d65.getNext();
if(_d66.isAttached){
var _d67=_d66.manifest();
if(_d67!=null){
list.add(_d67);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d68=this.bindingWindow.DataManager.getAllDataBindings();
while(_d68.hasNext()){
var _d69=_d68.getNext();
if(_d69.isAttached){
_d69.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d6a="";
if(!_d6a&&this.labelfield){
var _d6b=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d6b!=null&&_d6b.getLabel){
_d6a=_d6b.getLabel();
}else{
if(_d6b!=null&&_d6b.getValue){
_d6a=_d6b.getValue();
}
}
}
if(!_d6a&&this.label){
_d6a=this.label;
}
return _d6a;
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
var _d6e=this._cachedFocus.getBinding();
if(_d6e){
_d6e.blur();
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
var _d6f=this.getProperty("width");
if(!_d6f){
_d6f=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d6f;
}
if(this.height==null){
var _d70=this.getProperty("height");
this.height=_d70?_d70:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d71=this.getProperty("minheight");
if(_d71!=null){
this.minheight=_d71;
}
}
if(this.controls==null){
var _d72=this.getProperty("controls");
this.controls=_d72?_d72:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d73=this.getProperty("resizable");
this.isResizable=_d73?_d73:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d74=this.getProperty("image");
var _d75=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d74&&_d75){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d74);
_d75.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d77){
if(_d77!=this.isAutoHeightLayoutMode){
if(_d77){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d77;
}
};
DialogPageBinding.prototype.handleAction=function(_d78){
DialogPageBinding.superclass.handleAction.call(this,_d78);
var _d79=_d78.target;
switch(_d78.type){
case PageBinding.ACTION_ATTACHED:
if(_d79!=this&&_d79.isFitAsDialogSubPage){
_d79.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d78.consume();
if(_d79.response!=null){
this.response=_d79.response;
switch(_d79.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d7a){
var _d7b=this.bindingWindow.bindingMap.buttonAccept;
if(_d7b!=null){
_d7b.setDisabled(_d7a);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d7c){
var _d7d=CSSComputer.getPadding(this.bindingElement);
var _d7e=CSSComputer.getBorder(this.bindingElement);
_d7c+=_d7d.top+_d7d.bottom;
_d7c+=_d7e.top+_d7e.bottom;
if(_d7c>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d7c+"px";
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
EditorPageBinding.prototype.handleAction=function(_d86){
EditorPageBinding.superclass.handleAction.call(this,_d86);
var _d87=_d86.target;
switch(_d86.type){
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
var _d88=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d87.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d88==-1){
_d88=0;
}
}else{
_d88++;
}
return res;
});
if(_d88>-1){
this._messengers.del(_d88);
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
_d86.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d87.key,_d87);
if(_d87 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d87.key);
if(_d87 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d87==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d87.getSelectedTabBinding();
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
_d86.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d87==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d86.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d87==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d86.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d87==this._windowBinding){
if(_d87.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d8d=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d8d);
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
var _d8e=this.bindingWindow.bindingMap.savebutton;
if(_d8e!=null&&!_d8e.isDisabled){
_d8e.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8f=this.bindingWindow.bindingMap.__REQUEST;
if(_d8f!=null){
_d8f.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d90=this.bindingWindow.bindingMap.__REQUEST;
if(_d90!=null){
_d90.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d91){
this._message=null;
switch(_d91){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d91,this._messengers);
if(!this._messengers.hasEntries()){
if(_d91==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d91;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d91;
EditorPageBinding.superclass.postMessage.call(this,_d91,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d91,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d92,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d92,arg);
switch(_d92){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d94=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d94);
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
var _d95=new List();
this._invalidBindings.each(function(key,_d97){
var list=_d97.getInvalidLabels();
if(list){
list.each(function(_d99){
_d95.add(_d99);
});
}
});
if(_d95.hasEntries()){
var _d9a="";
while(_d95.hasNext()){
_d9a+=_d95.getNext().toLowerCase();
if(_d95.hasNext()){
_d9a+=", ";
}else{
_d9a+=".";
}
}
var _d9b=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d9b+" "+_d9a);
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
EditorPageBinding.prototype.enableSave=function(_d9c){
var _d9d=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d9d){
var _d9e=UserInterface.getBinding(_d9d);
if(_d9c){
_d9e.enable();
}else{
_d9e.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d9f=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d9f!=null){
UserInterface.getBinding(_d9f).enable();
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
var _da0=this._windowBinding.getContentDocument().title;
if(_da0==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da1=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da3){
if(_da3.name=="__EVENTTARGET"&&_da1){
_da3.value=_da1;
}
list.add({name:_da3.name,value:_da3.value});
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
var _da5=this.getProperty("responseid");
this.responseid=_da5;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_da6){
ResponsePageBinding.superclass.handleAction.call(this,_da6);
switch(_da6.type){
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
WizardPageBinding.prototype.handleAction=function(_da7){
WizardPageBinding.superclass.handleAction.call(this,_da7);
var _da8=_da7.target;
switch(_da7.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_da8);
}else{
_da7.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_da8);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_da7.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_da7.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_da9){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dab=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_da9);
}
if(_dab){
_dab.setDisabled(!_da9);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dac,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dac,arg);
var self=this;
switch(_dac){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db0){
};
MarkupAwarePageBinding.prototype._activate=function(_db1){
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
var _db2=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db2.boxObject.getDimension().w;
_db2.hide();
var _db3=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db3+"px";
var self=this;
var _db5=this.bindingWindow.bindingMap.moreactionsbutton;
_db5.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db6){
self._showMoreActions();
_db6.consume();
}});
var _db7=this.bindingWindow.bindingMap.moreactionspopup;
_db7.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_db8){
var item=_db8.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dba,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dba,arg);
switch(_dba){
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
var _dbe=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dbe!=null){
_dbe.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dbf=this.bindingWindow.WindowManager;
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
var _dc0=new String("");
this._actionProfile.each(function(_dc1,list){
list.each(function(_dc3){
_dc0+=_dc3.getHandle()+";"+_dc3.getKey()+";";
if(_dc3.isDisabled()){
_dc0+="isDisabled='true';";
}
});
});
return _dc0;
};
SystemToolBarBinding.prototype.handleAction=function(_dc4){
SystemToolBarBinding.superclass.handleAction.call(this,_dc4);
switch(_dc4.type){
case ButtonBinding.ACTION_COMMAND:
var _dc5=_dc4.target;
this._handleSystemAction(_dc5.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc6){
if(_dc6!=null){
SystemAction.invoke(_dc6,this._node);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dc9,list){
var _dcb=new List();
list.reset();
while(list.hasNext()){
var _dcc=list.getNext();
var _dcd=null;
if(_dcc.isInToolBar()){
if(_dcc.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dcd=self.getToolBarButtonBinding(_dcc);
}
}
if(_dcd!=null){
_dcb.add(_dcd);
}
}
if(_dcb.hasEntries()){
var _dce=ToolBarGroupBinding.newInstance(doc);
_dcb.each(function(_dcf){
_dce.add(_dcf);
});
self.addLeft(_dce);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd0=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd1=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_dd1=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _dd2=0;
var _dd3=new List();
var _dd4,_dd5=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd4=_dd5.getNext())!=null){
if(!_dd4.isVisible){
_dd4.show();
}
_dd2+=_dd4.boxObject.getDimension().w;
if(_dd2>=_dd1){
_dd3.add(_dd4);
_dd4.hide();
}
}
if(_dd3.hasEntries()){
var _dd6=_dd3.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dd6).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd4=_dd3.getNext())!=null){
this._moreActions.add(_dd4.associatedSystemAction);
}
_dd0.show();
}else{
this._moreActions=null;
_dd0.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dd7=this.bindingWindow.bindingMap.moreactionspopup;
_dd7.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dd7.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dd7.add(item);
}
_dd7.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dd9){
var _dda=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _ddb=_dd9.getLabel();
var _ddc=_dd9.getToolTip();
var _ddd=_dd9.getImage();
var _dde=_dd9.isDisabled();
if(_ddd){
_dda.setImage(_ddd);
}
if(_ddb){
_dda.setLabel(_ddb);
}
if(_ddc){
_dda.setToolTip(_ddc);
}
if(_dd9.isDisabled()){
_dda.disable();
}
_dda.associatedSystemAction=_dd9;
return _dda;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _ddf=this.getDescendantBindingByLocalName("toolbarbutton");
if(_ddf!=null){
_ddf.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_de0){
var _de1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_de0);
return UserInterface.registerBinding(_de1,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_de2){
this.bindingElement.style.left=_de2.x+"px";
this.bindingElement.style.top=_de2.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_de3){
_de3.h-=ViewBinding.VERTICAL_ADJUST;
_de3.w-=ViewBinding.HORIZONTAL_ADJUST;
_de3.w-=1;
if(_de3.h<0){
_de3.h=0;
}
if(_de3.w<0){
_de3.w=0;
}
this.bindingElement.style.width=String(_de3.w)+"px";
this.bindingElement.style.height=String(_de3.h)+"px";
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
SystemTreeBinding.prototype.add=function(_de4){
var _de5=SystemTreeBinding.superclass.add.call(this,_de4);
if(!this._defaultTreeNode){
if(_de4 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de4;
}
}
return _de5;
};
SystemTreeBinding.prototype.handleAction=function(_de6){
SystemTreeBinding.superclass.handleAction.call(this,_de6);
var _de7=_de6.target;
switch(_de6.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_de7.key);
this._updateFocusedNode();
_de6.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de6.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_de7.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de6.consume();
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
var _de9=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_de9);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dea){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dea);
var reg=this._entityTokenRegistry;
var _dec=_dea.node.getEntityToken();
if(reg.has(_dec)){
reg.get(_dec).add(_dea);
}else{
reg.set(_dec,new List([_dea]));
}
var _ded=null;
if(this.isLockedToEditor){
if(_dec==StageBinding.entityToken){
if(_dea.node.isTreeLockEnabled()){
_ded=_dea;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dea.node.getHandle()){
_ded=_dea;
}
}
}
if(_ded!=null){
this.focusSingleTreeNodeBinding(_ded);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dee){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dee);
var reg=this._entityTokenRegistry;
var _df0=_dee.node.getEntityToken();
if(reg.has(_df0)){
var list=reg.get(_df0);
list.del(_dee);
if(!list.hasEntries()){
reg.del(_df0);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dee.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dee.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df4=this._refreshingTreeNodes;
if(_df4.hasEntries()&&_df4.has(key)){
_df4.del(key);
if(!_df4.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df5=StageBinding.entityToken;
if(_df5!=null){
this._focusTreeNodeByEntityToken(_df5);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df6=false;
var _df7=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df6=false;
}else{
if(_df7.hasEntries()){
_df6=true;
while(_df6&&_df7.hasNext()){
var _df8=_df7.getNext();
if(!_df8.isDraggable){
_df6=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df6;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_df9,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_df9,arg);
switch(_df9){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_df9,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_df9);
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
var self=this,_dfd=arg;
setTimeout(function(){
if(_dfd!=null){
self._focusTreeNodeByEntityToken(_dfd);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _dff=tab.perspectiveNode==null;
if(!_dff){
_dff=tab.perspectiveNode==this.perspectiveNode;
}
if(_dff){
var self=this,_e01=tab.getEntityToken();
setTimeout(function(){
if(_e01!=null){
self._focusTreeNodeByEntityToken(_e01);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e02,_e03){
this.isLockFeatureFocus=true;
var _e04=null;
if(this._entityTokenRegistry.has(_e02)){
var list=this._entityTokenRegistry.get(_e02);
list.each(function(tn){
var _e07=true;
if(tn.node.isTreeLockEnabled()){
_e04=tn;
_e07=false;
}
return _e07;
});
if(_e04!=null){
if(!_e04.isFocused){
this.focusSingleTreeNodeBinding(_e04,true);
}else{
_e04.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e04==null&&_e03!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e02);
self._focusTreeNodeByEntityToken(_e02,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e09){
var _e0a=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e0b=this.getRootTreeNodeBindings();
while(_e0b.hasNext()){
var _e0c=_e0b.getNext();
_e0a.add(_e0c.node.getEntityToken());
}
}else{
_e0a.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e0a.hasNext()){
var _e0d=_e0a.getNext();
var _e0e=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e0d,_e09,_e0e);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e11=this._treeNodeBindings;
var _e12=new Map();
function fix(_e13,list){
if(!_e13.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e11.has(node.getHandle())){
var _e16=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e12.set(node.getHandle(),_e16);
_e13.add(_e16);
}
});
_e13.attachRecursive();
}
}
_e13.open(true);
}
map.each(function(_e17,list){
if(_e11.has(_e17)){
var _e19=_e11.get(_e17);
fix(_e19,list);
}else{
if(_e12.has(_e17)){
var _e1a=_e12.get(_e17);
fix(_e1a,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e1b,arg){
switch(_e1b){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e1d=arg;
if(_e1d!=null){
this._invokeServerRefresh(_e1d);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e1e=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e1e;
_e1e.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e1e=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e1e;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e1f){
if(_e1f!=null&&_e1f=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e1f)){
var list=this._entityTokenRegistry.get(_e1f).reset();
this._refreshToken=_e1f;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e21=list.getNext();
this._refreshingTreeNodes.set(_e21.key,true);
setTimeout(function(){
_e21.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e22=this.getFocusedTreeNodeBindings().getFirst();
if(_e22){
var _e23=_e22.getLabel();
var _e24=_e22.getAncestorBindingByLocalName("treenode");
if(_e24){
_e22=_e24;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e22.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e25=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e25,[_e23]);
}
_e22.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e26=SystemTreeBinding.clipboard;
if(_e26){
var type=_e26.dragType;
var _e28=this.getFocusedTreeNodeBindings().getFirst();
if(_e28.dragAccept){
if(_e28.acceptor.isAccepting(type)){
this._performPaste(_e28);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e29){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e29.node.hasDetailedDropSupport()){
if(_e29.node.hasChildren()){
var _e2b=_e29.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e2c,_e2d){
if(_e2c==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e2e=_e2d.get("switch");
var _e2f=_e2d.get("sibling");
if(_e2e=="after"){
_e2f++;
}
var _e30=_e29.accept(SystemTreeBinding.clipboard,_e2f);
if(_e30){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e2b);
}else{
Application.lock(self);
var _e31=_e29.accept(SystemTreeBinding.clipboard,0);
if(_e31){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e31=_e29.accept(SystemTreeBinding.clipboard,0);
if(_e31){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e32=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e32!=null){
this._focusTreeNodeByEntityToken(_e32);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e33){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e33){
this.blurSelectedTreeNodes();
var _e34=this.getRootTreeNodeBindings();
_e34.each(function(_e35){
if(_e35.isContainer&&_e35.isOpen){
_e35.close();
_e35.hasBeenOpened=false;
_e35.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e36){
if(_e36!=this.isLockedToEditor){
this.isLockedToEditor=_e36;
if(_e36){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e38=this.getRootTreeNodeBindings();
_e38.each(function(_e39){
var _e3a=_e39.getOpenSystemNodes();
if(_e3a!=null&&_e3a.hasEntries()){
list.merge(_e3a);
}else{
if(_e39.isOpen){
list.add(_e39.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e3b){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e3b);
if(_e3b!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e3c){
if(_e3c){
var list=new List(_e3c.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e3e=new Map();
var _e3f=this.getFocusedTreeNodeBindings().getFirst();
var _e40=_e3f.node.getActionProfile();
if(_e40!=null){
var self=this;
_e40.each(function(_e42,list){
var _e44=new List();
list.each(function(_e45){
if(_e45.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e45.getGroupName()]){
_e44.add(_e45);
}
}
});
if(_e44.hasEntries()){
_e3e.set(_e42,_e44);
}
});
}
_e3e.activePosition=this._activePosition;
var _e46=_e3f.node.getPropertyBag();
if(_e46&&_e46.Uri&&_e46.ElementType==="application/x-composite-page"){
_e3e.Uri=_e46.Uri;
}
_e3e.EnitityToken=_e3f.node.getEntityToken();
_e3e.Node=_e3f.node;
return _e3e;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e47,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e47,arg);
switch(_e47){
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
var _e4c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e4c.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e4d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e4d.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e4e){
SystemTreePopupBinding.superclass.handleAction.call(this,_e4e);
switch(_e4e.type){
case MenuItemBinding.ACTION_COMMAND:
var _e4f=_e4e.target;
var _e50=_e4f.associatedSystemAction;
if(_e50){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e52=list.getFirst();
var _e53=_e52.node;
}
SystemAction.invoke(_e50,_e53);
}else{
var cmd=_e4f.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e56=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e56=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e56=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e56=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e56=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e56){
setTimeout(function(){
EventBroadcaster.broadcast(_e56);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e57=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e57.hasNext()){
var _e58=UserInterface.getBinding(_e57.getNext());
if(!_e58.getProperty("rel")){
_e58.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e5a=new List();
var self=this;
this._actionProfile.each(function(_e5c,list){
var _e5e=MenuGroupBinding.newInstance(doc);
list.each(function(_e5f){
var _e60=self.getMenuItemBinding(_e5f);
_e5e.add(_e60);
});
_e5a.add(_e5e);
});
_e5a.reverse();
while(_e5a.hasNext()){
this._bodyBinding.addFirst(_e5a.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e61){
var _e62=MenuItemBinding.newInstance(this.bindingDocument);
var _e63=_e61.getLabel();
var _e64=_e61.getToolTip();
var _e65=_e61.getImage();
var _e66=_e61.getDisabledImage();
var _e67=_e61.isCheckBox();
if(_e63){
_e62.setLabel(_e63);
}
if(_e64){
_e62.setToolTip(_e64);
}
if(_e65){
_e62.imageProfile=new ImageProfile({image:_e65,imageDisabled:_e66});
}
if(_e67){
_e62.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e61.isChecked()){
_e62.check(true);
}
}
if(_e61.isDisabled()){
_e62.disable();
}
_e62.associatedSystemAction=_e61;
return _e62;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e6b=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e6b=UserInterface.getBinding(node);
if(_e6b.isDisabled){
_e6b=null;
}
}
break;
}
if(_e6b!=null&&_e6b.node!=null&&_e6b.node.getActionProfile()!=null){
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
var _e6c=this.node.getLabel();
if(_e6c){
this.setLabel(_e6c);
}
var _e6d=this.node.getToolTip();
if(_e6d){
this.setToolTip(_e6d);
}
var _e6e=this.node.getHandle();
if(_e6e){
this.setHandle(_e6e);
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
var _e71="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e71+=list.getNext();
if(list.hasNext()){
_e71+=" ";
}
}
this.setProperty("dragaccept",_e71);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e73){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e73);
switch(_e73.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e73.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e73.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e74,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e74,arg);
switch(_e74){
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
var _e77=null;
var _e78=this.node.getImageProfile();
if(_e78){
if(this.isOpen){
_e77=_e78.getActiveImage();
}else{
_e77=_e78.getDefaultImage();
}
}
if(!_e77){
_e77=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e77;
};
SystemTreeNodeBinding.prototype.open=function(_e79){
var _e7a=this.isContainer&&!this.isOpen;
var _e7b=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e7a&&(_e7b||SystemTreeBinding.HAS_NO_MEMORY)&&_e79!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e7c=null;
if(this.isContainer){
_e7c=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e7c);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e7e){
if(_e7e!=null){
this._refreshBranch(_e7e);
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
var _e7f=new List();
var _e80=this.node.getChildren();
this.empty();
if(_e80.hasEntries()){
this._insertTreeNodesRegulated(_e80);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e81){
var _e82=0;
var _e83=new List([]);
while(_e81.hasEntries()&&_e82<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e84=SystemTreeNodeBinding.newInstance(_e81.extractFirst(),this.bindingDocument);
_e84.autoExpand=this.autoExpand;
this.add(_e84);
_e84.attach();
_e82++;
if(this.autoExpand){
if(_e82==1&&!_e81.hasEntries()||LocalStore.openedNodes.has(_e84.node)){
_e83.add(_e84);
}
}
}
if(_e81.hasEntries()){
this._insertBufferTreeNode(_e81);
}
_e83.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e87){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e89=this.node.getDescendantBranch(list);
if(_e89.hasEntries()){
this.XXX(_e89);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e8a){
var self=this;
var map=new Map();
this.empty();
_e8a.each(function(key,_e8e){
if(_e8e.hasEntries()){
_e8e.each(function(node){
var _e90=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e90);
if(map.has(key)){
var _e91=map.get(key);
_e91.add(_e90);
_e91.isOpen=true;
_e91.hasBeenOpened=true;
node.searchToken=_e91.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e90);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e8a.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e92=new TreeCrawler();
var _e93=new List();
_e92.mode=TreeCrawler.MODE_GETOPEN;
_e92.crawl(this.bindingElement,_e93);
if(_e93.hasEntries()){
_e93.extractFirst();
}
_e92.dispose();
return _e93;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e94=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e94=new List([this.node]);
list.each(function(_e96){
_e94.add(_e96.node);
});
}
return _e94;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e97,_e98){
var _e99=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e97 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e97.node.getData(),this.node.getData(),_e98?_e98:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e99);
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
SystemTreeNodeBinding.newInstance=function(node,_e9d){
var _e9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e9d);
var _e9f=UserInterface.registerBinding(_e9e,SystemTreeNodeBinding);
_e9f.node=node;
return _e9f;
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
SystemPageBinding.prototype.setPageArgument=function(_ea0){
this.node=_ea0;
SystemPageBinding.superclass.setPageArgument.call(this,_ea0);
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
var _ea1=this.node.getChildren();
if(_ea1.hasEntries()){
while(_ea1.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ea1.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea3=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea3.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ea5=new TreeCrawler();
var _ea6=new List();
_ea5.mode=TreeCrawler.MODE_GETOPEN;
_ea5.crawl(this.bindingElement,_ea6);
_ea5.dispose();
var list=new List([this.node]);
_ea6.each(function(_ea8){
list.add(_ea8.node);
});
this._tree.empty();
var _ea9=this.node.getDescendantBranch(list);
if(_ea9.hasEntries()){
var self=this;
var map=new Map();
_ea9.each(function(key,_ead){
_ead.each(function(node){
var _eaf=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eaf);
if(map.has(key)){
var _eb0=map.get(key);
_eb0.add(_eaf);
_eb0.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eaf);
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
SystemPageBinding.prototype.handleAction=function(_eb1){
SystemPageBinding.superclass.handleAction.call(this,_eb1);
switch(_eb1.type){
case ButtonBinding.ACTION_COMMAND:
var _eb2=_eb1.target;
switch(_eb2.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eb2.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb3,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb3,arg);
switch(_eb3){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eb5=arg;
if(this.node&&this.node.getEntityToken()==_eb5){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eb5);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eb5);
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
StageContainerBinding.prototype.handleBroadcast=function(_eb7,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eb7,arg);
var _eb9=this.bindingWindow.WindowManager;
switch(_eb7){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eb9.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eb9.WINDOW_RESIZED_BROADCAST:
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
var _ebb=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ebb.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ebc){
if(StageBinding.isViewOpen(_ebc)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ebc);
}else{
var _ebd=ViewDefinitions[_ebc];
StageBinding.presentViewDefinition(_ebd);
}
};
StageBinding.isViewOpen=function(_ebe){
return StageBinding.bindingInstance._activeViewDefinitions[_ebe]!=null;
};
StageBinding.selectPerspective=function(_ebf){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ebf);
};
StageBinding.presentViewDefinition=function(_ec0){
if(_ec0.label!=null){
var _ec1=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec1,[_ec0.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec0);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ec3,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec5=System.getPerspectiveNodes();
if(_ec5.hasEntries()){
this._initializeSystemViewDefinitions(_ec5);
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
var _ec7=null;
if(LocalStore.isEnabled){
_ec7=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ec7&&ViewDefinitions[_ec7]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ec7));
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
var _ec9=root.getActionProfile();
if(_ec9&&_ec9.hasEntries()){
var _eca=top.app.bindingMap.toolsmenugroup;
if(_eca){
_ec9.each(function(_ecb,list){
list.each(function(_ecd){
var item=MenuItemBinding.newInstance(_eca.bindingDocument);
item.setLabel(_ecd.getLabel());
item.setToolTip(_ecd.getToolTip());
item.setImage(_ecd.getImage());
item.setDisabled(_ecd.isDisabled());
item.associatedSystemAction=_ecd;
var _ecf=_eca;
var tag=_ecd.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ecf=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ecf.add(item);
});
});
_eca.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed1){
while(_ed1.hasNext()){
var node=_ed1.getNext();
var _ed3=node.getHandle();
ViewDefinitions[_ed3]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed4){
StageBinding.superclass.handleAction.call(this,_ed4);
var _ed5=_ed4.target;
switch(_ed4.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed5;
this._inflateBinding(_ed5);
_ed4.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed5;
this._inflateBinding(_ed5);
_ed4.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ed4.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed5 instanceof DockBinding){
switch(_ed5.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed5.reference,_ed5);
break;
}
this.handleAttachedDock(_ed5);
_ed4.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed5 instanceof DockBinding){
this.handleSelectedDockTab(_ed5.getSelectedTabBinding());
_ed4.consume();
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
_ed4.consume();
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
_ed4.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed4);
};
StageBinding.prototype.handleBroadcast=function(_ed7,arg){
StageBinding.superclass.handleBroadcast.call(this,_ed7,arg);
switch(_ed7){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ed9=arg;
this._dontView(_ed9);
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
StageBinding.prototype._showStart=function(_edb){
if(_edb!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ede=this.bindingWindow.bindingMap.maindecks;
if(_edb){
_ede.select("startdeck");
view.show();
}else{
view.hide();
_ede.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_edb;
}
};
StageBinding.prototype._inflateBinding=function(_edf){
for(var _ee0 in ViewDefinitions){
var _ee1=ViewDefinitions[_ee0];
if(_ee1 instanceof SystemViewDefinition){
_edf.mountDefinition(_ee1);
}
}
var _ee2=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ee2){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee5=new StageCrawler();
_ee5.mode=mode;
_ee5.crawl(this.bindingElement);
_ee5.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ee6){
var _ee7=_ee6.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ee7);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ee7));
}
};
StageBinding.prototype.handleAttachedDock=function(_ee8){
var _ee9=_ee8.getTabBindings();
if(_ee9.hasEntries()){
while(_ee9.hasNext()){
var _eea=_ee9.getNext();
var _eeb=_eea.getHandle();
if(_eeb){
if(_eeb=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eec=ViewDefinitions[_eeb];
if(_eec){
this._view(_ee8,_eea,_eec,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eeb+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_eed){
var _eee=null;
var _eef=false;
switch(_eed.position){
case Dialog.MODAL:
_eee=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_eee=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_eed.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_eee=this._dockBindings.get(_eed.position);
break;
case DockBinding.EXTERNAL:
window.open(_eed.url);
_eef=true;
break;
default:
var _ef0=this._decksBinding.getSelectedDeckBinding();
_eee=_ef0.getDockBindingByReference(_eed.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef1=this.bindingWindow.bindingMap.maindecks;
_ef1.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eef=true;
}
break;
}
if(!_eef){
if(_eee!=null){
this._view(_eee,null,_eed,true);
}else{
throw "StageBinding: Could not position view: "+_eed.handle;
}
}
};
StageBinding.prototype._view=function(_ef2,_ef3,_ef4,_ef5){
var _ef6=_ef4.handle;
if(_ef4.isMutable){
_ef6+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ef6]){
var _ef7=ViewBinding.getInstance(_ef6);
if(_ef7!=null){
_ef7.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ef6);
}
}else{
this._activeViewDefinitions[_ef6]=_ef4;
Application.lock(this);
switch(_ef2.constructor){
case DockBinding:
if(_ef5){
_ef2.prepareNewView(_ef4);
}else{
_ef2.prepareOpenView(_ef4,_ef3);
}
break;
case StageDialogBinding:
if(_ef5){
_ef2.prepareNewView(_ef4);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ef8){
if(this._activeViewDefinitions[_ef8]!=null){
delete this._activeViewDefinitions[_ef8];
}else{
this.logger.debug("Could not unregister active view: "+_ef8);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ef9){
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
this.addFilter(function(_efb){
var _efc=UserInterface.getBinding(_efb);
var _efd=null;
if(_efc){
switch(_efc.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_efc.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_efc.handleUnMaximization();
break;
}
break;
case DockBinding:
_efd=NodeCrawler.SKIP_NODE;
break;
}
}
return _efd;
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
var _efe=null;
this._dialogs.each(function(_eff){
if(!_eff.isVisible){
_efe=_eff;
}
return _efe!=null;
});
if(!_efe){
this._newInstance();
_efe=this._dialogs.getLast();
}
_efe.setModal(false);
return _efe;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f00=this.getInstance();
_f00.setModal(true);
return _f00;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f01=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f01);
_f01.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f02){
if(_f02 instanceof DialogViewDefinition){
var _f03=ViewBinding.newInstance(this.bindingDocument);
_f03.setDefinition(_f02);
_f03.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f02.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f02.handler)){
this._dialogResponseHandler=_f02.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f03;
this._body.add(_f03);
_f03.attach();
_f03.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f04){
StageDialogBinding.superclass.handleAction.call(this,_f04);
var _f05=_f04.target;
switch(_f04.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f05);
_f04.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f05.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f04.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f05.response){
this._handleDialogPageResponse(_f05);
}
_f04.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f04.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f04.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f04.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f04.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f04.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f04.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f04.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f04.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f05==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f06,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f06,arg);
switch(_f06){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f08){
var _f09=new FitnessCrawler();
var list=new List();
if(_f08){
_f09.mode=FitnessCrawler.MODE_BRUTAL;
}
_f09.crawl(this.bindingElement,list);
_f09.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f0b){
_f0b.fit(_f08);
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
var _f0c=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f0c){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f0e){
var cmd=_f0e.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f10){
if(_f10.bindingDocument==this._viewBinding.getContentDocument()){
if(_f10 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f10);
}
this._pageBinding=_f10;
if(_f10.height=="auto"){
_f10.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f10);
_f10.enableAutoHeightLayoutMode(false);
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
if(_f10.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f10);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f11){
var _f12=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f12){
var _f13=UserInterface.getBinding(_f12);
_f13.setDisabled(_f11);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f14){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f14.response,_f14.result!=null?_f14.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f16){
if(_f16.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f16);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f18){
switch(_f18.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f18.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f18.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f19){
var _f1a=_f19.label;
var _f1b=_f19.image;
var _f1c=_f19.width;
var _f1d=_f19.height;
var _f1e=_f19.controls;
var _f1f=_f19.isResizable;
if(_f1a){
this.setLabel(_f1a);
}
if(_f1b){
this.setImage(_f1b);
}
if(_f1c||_f1d){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f1c?_f1c:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f1d!=null&&_f1d!="auto")?_f1d:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f1e){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f23=new List(_f1e.split(" "));
while((type=_f23.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f1f!=this._isResizable){
this.setResizable(_f1f);
}
if(_f1d=="auto"){
this._fixAutoHeight(_f19);
}
if(_f19==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f24){
var dim=this.getDimension();
var _f26=0;
var _f27=0;
if(_f24.isDialogSubPage){
_f24=this._pageBinding;
}
if(this._isFirstPage){
_f26=_f24.width!=null?_f24.width:dim.w;
}else{
_f26=dim.w;
}
_f27=_f24.bindingElement.offsetHeight;
_f27+=this._titlebar.bindingElement.offsetHeight;
_f27+=4;
_f27+=4;
if(_f27<dim.h){
_f27=dim.h;
}
if(_f24.minheight!=null){
if(_f27<_f24.minheight){
_f27=_f24.minheight;
}
}
this.setDimension(new Dimension(_f26,_f27));
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
StageDialogBinding.newInstance=function(_f2a){
var _f2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f2a);
var _f2c=UserInterface.registerBinding(_f2b,StageDialogBinding);
_f2c.setProperty("controls","minimize maximize close");
return _f2c;
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
this.addFilter(function(_f2d,list){
var _f2f=null;
var _f30=UserInterface.getBinding(_f2d);
if(!_f30.isVisible){
_f2f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f2f;
});
this.addFilter(function(_f31,list){
var _f33=null;
var _f34=UserInterface.getBinding(_f31);
if(_f34.isAttached){
if(Interfaces.isImplemented(IFit,_f34)){
if(!_f34.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f34);
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
StageDecksBinding.prototype.mountDefinition=function(_f35){
var _f36=StageDeckBinding.newInstance(this.bindingDocument);
_f36.handle=_f35.handle;
_f36.perspectiveNode=_f35.node;
_f36.definition=_f35;
this._decks[_f36.handle]=_f36;
this.add(_f36);
_f36.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f37){
var _f38=this._decks[_f37];
StageBinding.perspectiveNode=_f38.perspectiveNode;
this.select(_f38);
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
StageDeckBinding.prototype.handleAction=function(_f39){
StageDeckBinding.superclass.handleAction.call(this,_f39);
var _f3a=_f39.target;
switch(_f39.type){
case WindowBinding.ACTION_LOADED:
if(_f3a==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f3b=this.windowBinding.getContentDocument();
var _f3c=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f3d=ViewBinding.newInstance(_f3b);
_f3d.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f3e=ViewDefinitions["Composite.Management.Browser"];
_f3e.argument["SystemViewDefinition"]=this.definition;
_f3d.setDefinition(_f3e);
_f3c.add(_f3d);
_f3d.attach();
_f3d.initialize();
this._viewBinding=_f3d;
_f39.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f3a instanceof DockBinding){
this._dockBindings.set(_f3a.reference,_f3a);
_f3a.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f39.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f39.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f39);
StageDeckBinding.superclass.handleAction.call(this,_f39);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f40=new StageCrawler();
_f40.mode=mode;
_f40.crawl(this.windowBinding.getContentDocument().body);
_f40.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f41){
return this._dockBindings.get(_f41);
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
StageDeckBinding.newInstance=function(_f43){
var _f44=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f43);
var _f45=UserInterface.registerBinding(_f44,StageDeckBinding);
return _f45;
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
StageSplitBoxBinding.prototype.handleAction=function(_f46){
StageSplitBoxBinding.superclass.handleAction.call(this,_f46);
StageBoxAbstraction.handleAction.call(this,_f46);
var _f47=_f46.target;
var _f48=null;
var _f49=null;
switch(_f46.type){
case DockBinding.ACTION_EMPTIED:
_f49=this.getChildBindingByLocalName("splitter");
if(_f49.isVisible){
_f49.hide();
}
_f48=this.getDescendantBindingsByLocalName("dock");
if(_f48.getFirst().isEmpty&&_f48.getLast().isEmpty){
if(_f48.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f46.consume();
break;
case DockBinding.ACTION_OPENED:
_f48=this.getDescendantBindingsByLocalName("dock");
if(!_f48.getFirst().isEmpty&&!_f48.getLast().isEmpty){
_f49=this.getChildBindingByLocalName("splitter");
if(!_f49.isVisible){
_f49.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f46.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f47!=this){
_f49=this.getChildBindingByLocalName("splitter");
if(_f49.isVisible){
_f49.hide();
}
this.invokeLayout();
_f46.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f47!=this){
var _f4a=this.getChildBindingsByLocalName("splitpanel");
if(_f4a.getFirst().isVisible&&_f4a.getLast().isVisible){
_f49=this.getChildBindingByLocalName("splitter");
if(!_f49.isVisible){
_f49.show();
}
}
this.invokeLayout();
_f46.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f4b){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f4b);
switch(_f4b.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f4b.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f4c=this.getChildBindingsByLocalName("splitpanel");
return _f4c.getFirst().isVisible&&_f4c.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f4d=this.getChildBindingsByLocalName("splitpanel");
return _f4d.getFirst().isFixed&&_f4d.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f4e){
StageSplitPanelBinding.superclass.handleAction.call(this,_f4e);
StageBoxAbstraction.handleAction.call(this,_f4e);
switch(_f4e.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f4e.type==StageSplitBoxBinding.ACTION_HIDE){
_f4e.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f4e.type==DockBinding.ACTION_EMPTIED){
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
if(_f4e.type==StageSplitBoxBinding.ACTION_SHOW){
_f4e.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f51=_f4e.target;
if(_f51!=this&&_f51.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f52=_f51._containingSplitBoxBinding;
if(_f52.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f53=_f52.getChildBindingsByLocalName("splitpanel");
var _f54=_f53.getFirst();
var _f55=_f53.getLast();
if(this.isFixed==true){
if(!_f54.isFixed||!_f55.isFixed||(!_f52.hasBothPanelsVisible()&&_f51.isMinimizedForReal)){
this.setFix(false);
_f4e.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f52.hasBothPanelsFixed()||(!_f52.hasBothPanelsVisible()&&_f51.isMinimizedForReal)){
this.setFix(_f51.getContainedDock().getHeight());
_f4e.consume();
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
var _f56=this.getContainedDock();
if(_f56){
if(this.isMaximizePrepared==true){
}else{
_f56.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f57=this.getContainedDock();
if(_f57){
if(_f57.type==DockBinding.TYPE_EDITORS){
if(_f57.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f57.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f58=this.getContainedDock();
if(_f58){
_f58.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f58);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f59=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5a=this.getContainedDock();
if(_f5a){
_f5a.collapse(_f59);
if(!_f59){
this.setFix(_f5a.getHeight());
}else{
this.setFix(_f5a.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5a&&_f5a.isActive){
_f5a.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f5a);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f5b){
var _f5c=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5d=this.getContainedDock();
if(_f5d){
if(this.isMinimized==true){
_f5d.unCollapse(_f5c);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f5b){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5d){
_f5d.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f5d);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f5e){
var _f5f=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f5f=false;
}
}
if(_f5f==true){
this._invisibilize(_f5e);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f61){
if(_f61!=this._isInvisibilized){
if(_f61){
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
StageSplitterBinding.prototype.onDragStart=function(_f62){
var _f63=top.app.bindingMap.stagesplittercover;
var _f64=this._containingSplitBoxBinding.getOrient();
switch(_f64){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f63.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f63.bindingElement.style.cursor="n-resize";
break;
}
_f63.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f64);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f6a){
this._orient=_f6a;
this.attachClassName(_f6a);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f6c=true;
var _f6d=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6d=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6c=false;
break;
}
if(_f6c){
this.bindingElement.style.left=pos.x+"px";
}
if(_f6d){
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
StageBoxAbstraction.handleAction=function(_f6f){
switch(_f6f.type){
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
if(_f6f.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f6f.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f70=this.bindingElement.style;
_f70.position="absolute";
_f70.width="100%";
_f70.height="100%";
_f70.top="0";
_f70.left="0";
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
var _f71=this.bindingElement.style;
_f71.position="relative";
_f71.width="auto";
_f71.height="auto";
_f71.top="auto";
_f71.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f72,_f73){
var _f74=_f72.bindingElement.style;
var _f75=_f72.bindingElement.parentNode;
var box=_f72._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f73){
_f72._unmodifiedFlexMethod=_f72.flex;
_f72.flex=function(){
_f74.width=_f75.offsetWidth+"px";
_f74.height=_f75.offsetHeight+"px";
};
}else{
_f74.width="100%";
_f74.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f74.width="auto";
_f74.height="auto";
box.reflex(true);
},0);
}
_f72.flex=_f72._unmodifiedFlexMethod;
_f72._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f77){
var _f78=_f77.target;
switch(_f77.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f78 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f77);
_f77.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f77.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f79){
var mode=null;
switch(_f79.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f7b){
StageMenuBarBinding.superclass.handleAction.call(this,_f7b);
switch(_f7b.type){
case MenuItemBinding.ACTION_COMMAND:
var _f7c=_f7b.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f7c){
SystemAction.invoke(_f7c,this._rootNode);
}
}
_f7b.consume();
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
var _f7d=this.getProperty("handle");
if(_f7d){
this._handle=_f7d;
if(StageBinding.isViewOpen(_f7d)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f7d);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f7f){
this.setProperty("handle",_f7f);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f80,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f80,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f80){
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
StageViewMenuItemBinding.newInstance=function(_f82){
var _f83=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f82);
UserInterface.registerBinding(_f83,StageViewMenuItemBinding);
return UserInterface.getBinding(_f83);
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
StageStatusBarBinding.prototype.setLabel=function(_f84){
this._label.setLabel(_f84);
};
StageStatusBarBinding.prototype.setImage=function(_f85){
this._label.setImage(_f85);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f86){
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
var _f87=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f88=_f87._viewBinding;
var _f89=_f88.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _f8a=_f89.getFocusedTreeNodeBindings();
if(!_f8a.hasEntries()&&StageBinding.treeSelector){
_f8a=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f8a;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f8b=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f8b.each(function(_f8c){
LocalStore.focuseNodes.add(_f8c.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f8d=LocalStore.focuseNodes.getEntityTokens();
var _f8e=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8f=_f8e.getAssociatedView();
var _f90=_f8f.getContentWindow().bindingMap.tree;
_f8d=new List(TreeService.GetCurrentLocaleEntityTokens(_f8d.toArray()));
_f8d.each(function(_f91){
_f90._focusTreeNodeByEntityToken(_f91);
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
ExplorerBinding.prototype.handleAction=function(_f92){
ExplorerBinding.superclass.handleAction.call(this,_f92);
var _f93=_f92.target;
switch(_f92.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f92.consume();
break;
case Binding.ACTION_DRAG:
if(_f93 instanceof ExplorerSplitterBinding){
_f93.dragger.registerHandler(this);
}
_f92.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f95){
this._menuBinding.setSelectionByHandle(_f95);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f96){
if(_f96 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f96);
this._menuBinding.mountDefinition(_f96);
}
};
ExplorerBinding.prototype.onDragStart=function(_f97){
var _f98=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f98.hasEntries()){
var _f99=_f98.getFirst();
this._dragStart=_f99.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f99.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f9d){
if(_f9d instanceof SystemViewDefinition){
var _f9e=ViewBinding.newInstance(this.bindingDocument);
_f9e.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f9e.setDefinition(_f9d);
var _f9f=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f9f.setAssociatedView(_f9e);
this._decks[_f9d.handle]=_f9f;
_f9f.add(_f9e);
this.add(_f9f);
function attach(){
_f9f.attach();
_f9e.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa0){
var _fa1=this._decks[_fa0];
this.select(_fa1);
};
DecksBinding.prototype.expandBy=function(_fa2){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa4=this.bindingElement.offsetHeight+_fa2;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa4+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa6){
var _fa7=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa6);
return UserInterface.registerBinding(_fa7,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fa8){
this._viewBinding=_fa8;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fa9=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _faa=this._viewBinding.getDefinition().label;
StatusBar.busy(_fa9,[_faa]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fab){
ExplorerDeckBinding.superclass.handleAction.call(this,_fab);
var _fac=_fab.target;
switch(_fab.type){
case PageBinding.ACTION_INITIALIZED:
if(_fac instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fac.node.getEntityToken();
this._handle=_fac.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fad,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fad,arg);
switch(_fad){
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
var _faf=null;
if(this._isExplorerDeckBindingInitialized){
_faf=this._viewBinding.getDefinition().label;
}else{
_faf=DockTabBinding.LABEL_TABLOADING;
}
return _faf;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb0=null;
if(this._isExplorerDeckBindingInitialized){
_fb0=this._viewBinding.getDefinition().image;
}else{
_fb0=DockTabBinding.IMG_TABLOADING;
}
return _fb0;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb1=null;
if(this._isExplorerDeckBindingInitialized){
_fb1=this._viewBinding.getDefinition().toolTip;
}
return _fb1;
};
ExplorerDeckBinding.newInstance=function(_fb2){
var _fb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fb2);
return UserInterface.registerBinding(_fb3,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb4){
switch(_fb4.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fb4.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb4);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb5){
this._minButtons.set(_fb5.handle,this._mountMinButton(_fb5));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fb6){
var _fb7=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fb7.setLabel(_fb6.label);
_fb7.setToolTip(_fb6.label);
_fb7.handle=_fb6.handle;
_fb7.node=_fb6.node;
this._minGroup.add(_fb7);
this._minList.add(_fb7);
_fb7.attach();
return _fb7;
};
ExplorerMenuBinding.prototype.handleAction=function(_fb8){
ExplorerMenuBinding.superclass.handleAction.call(this,_fb8);
switch(_fb8.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fb9=_fb8.target;
var _fba=_fb9.getCheckedButtonBinding();
var _fbb=_fba.handle;
this._selectedHandle=_fbb;
this._selectedTag=_fba.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fb8.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fbc,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fbc,arg);
switch(_fbc){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fbe){
var _fbf=this._minButtons.get(_fbe);
if(_fbf){
_fbf.check();
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
ExplorerToolBarBinding.newInstance=function(_fc0){
var _fc1=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc0);
return UserInterface.registerBinding(_fc1,ExplorerToolBarBinding);
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
var _fc2=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc3=_fc2?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc3);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fc4,_fc5){
var _fc6="ui:explorertoolbarbutton";
var _fc7=DOMUtil.createElementNS(Constants.NS_UI,_fc6,_fc4);
var _fc8=UserInterface.registerBinding(_fc7,ExplorerToolBarButtonBinding);
_fc8.explorerToolBarButtonType=_fc5;
return _fc8;
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
EditorBinding.invokeFunctionEditorDialog=function(_fc9,_fca,type){
type=type?type:"";
var _fcc=FunctionService.GetCustomEditorSettingsByMarkup(_fc9);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fcc){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fcc.Width?(_fcc.Width>dim.w?dim.w:_fcc.Width):undefined;
def.height=_fcc.Height?(_fcc.Height>dim.h?dim.h:_fcc.Height):undefined;
if(_fcc.Url){
_fcc.Url=_fcc.Url.indexOf("?")>-1?_fcc.Url+"&consoleId="+Application.CONSOLE_ID:_fcc.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fca;
def.argument={url:_fcc?_fcc.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fc9}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fcf,_fd0){
var _fd1=EditorBinding._components;
var _fd2=EditorBinding._editors;
var key=_fd0.key;
var _fd4=Interfaces.isImplemented(IWysiwygEditorComponent,_fcf);
if(!_fd4){
_fd4=Interfaces.isImplemented(ISourceEditorComponent,_fcf);
}
if(_fd4){
if(_fd2.has(key)){
_fd2.get(key).initializeEditorComponent(_fcf);
}else{
if(!_fd1.has(key)){
_fd1.set(key,new List());
}
_fd1.get(key).add(_fcf);
}
}else{
throw "Editor component interface not implemented: "+_fcf;
}
};
EditorBinding.claimComponents=function(_fd5,_fd6){
var _fd7=EditorBinding._components;
var _fd8=EditorBinding._editors;
var key=_fd6.key;
_fd8.set(key,_fd5);
var list=null;
if(_fd7.has(key)){
list=_fd7.get(key).copy();
_fd7.del(key);
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
var _fdc=this.getProperty("value");
if(_fdc!=null){
_fdc=decodeURIComponent(_fdc);
this._startContent=_fdc;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fde=this.bindingWindow.DataManager;
_fde.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fe0){
var _fe1=EditorBinding.claimComponents(this,_fe0);
if(_fe1!=null){
while(_fe1.hasNext()){
this.initializeEditorComponent(_fe1.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe3=this.bindingWindow.DataManager;
if(_fe3.getDataBinding(name)){
_fe3.unRegisterDataBinding(name);
}
_fe3.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fe4=this.getEditorDocument();
if(_fe4!=null){
Application.framework(_fe4);
DOMEvents.addEventListener(_fe4,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fe4,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fe4,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fe4,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fe6){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fe6==true){
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
var _fe8=this.getCheckSum();
if(_fe8!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fe8;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fe9=null;
if(Binding.exists(this._pageBinding)){
_fe9=this._pageBinding.getCheckSum(this._checksum);
}
return _fe9;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _feb=DOMEvents.getTarget(e);
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
if(_feb.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fed,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fed,arg);
var _fef=null;
switch(_fed){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff0=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff0=false;
}
}
}else{
_fef=DOMEvents.getTarget(arg);
if(_fef&&_fef.ownerDocument==this.getEditorDocument()){
_ff0=false;
}
}
if(_ff0){
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
EditorBinding.prototype._activateEditor=function(_ff1){
if(_ff1!=this._isActivated){
this._isActivated=_ff1;
EditorBinding.isActive=_ff1;
var _ff2=this.getEditorWindow().standardEventHandler;
var _ff3=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff3!=null){
if(_ff1){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff3.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff2.enableNativeKeys(true);
}else{
_ff3.disable();
_ff2.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ff4=this.getEditorDocument().selection.createRange();
_ff4.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ff5=false;
try{
var _ff6=this.getEditorWindow().getSelection();
if(_ff6!=null){
_ff5=_ff6.toString().length>0;
if(!_ff5){
var _ff7=_ff6.getRangeAt(0);
var frag=_ff7.cloneContents();
var _ff9=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_ff9.appendChild(frag.firstChild);
}
var img=_ff9.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ff5=true;
}
}
}
}
}
catch(exception){
}
return _ff5;
};
EditorBinding.prototype.isCommandEnabled=function(_ffb){
var _ffc=true;
switch(_ffb){
case "Cut":
case "Copy":
case "Paste":
_ffc=this.getEditorDocument().queryCommandEnabled(_ffb);
break;
}
return _ffc;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1000=false;
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
_1000=true;
}
break;
}
return _1000;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1003=this.getContentWindow().bindingMap.toolbar;
var _1004=_1003.getButtonForCommand(cmd);
if(!_1004){
throw "No button for command "+cmd;
}
return _1004;
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
EditorBinding.prototype.handleAction=function(_1008){
EditorBinding.superclass.handleAction.call(this,_1008);
var _1009=_1008.target;
var self=this;
var _100b=this.shadowTree.iframe;
switch(_1008.type){
case Binding.ACTION_DIRTY:
if(_1008.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_100c){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_100c);
};
EditorBinding.prototype.handleElement=function(_100d){
return true;
};
EditorBinding.prototype.updateElement=function(_100e){
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
var _1011=this._menuGroups[rel];
if(_1011 instanceof List){
_1011.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1014=this._menuGroups[rel];
if(_1014 instanceof List){
_1014.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1016){
EditorPopupBinding.superclass.handleAction.call(this,_1016);
var _1017=_1016.target;
if(_1016.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1017.getProperty("cmd");
var gui=_1017.getProperty("gui");
var val=_1017.getProperty("val");
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
var _101b=this.bindingWindow.bindingMap.tinywindow;
var _101c=this.bindingWindow.bindingMap.codepresswindow;
if(_101b){
EditorBinding.registerComponent(this,_101b);
}else{
if(_101c){
EditorBinding.registerComponent(this,_101c);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_101d,_101e,_101f,theme){
this._editorBinding=_101d;
this._tinyEngine=_101e;
this._tinyInstance=_101f;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1021,frame,_1023){
this._editorBinding=_1021;
this._codePressFrame=frame;
this._codePressEngine=_1023;
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
var _1026=this._editorBinding;
if(_1026!=null){
var self=this;
var _1028={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1026.hasBookmark()){
_1026.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1026.hasBookmark()){
_1026.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1028);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1028);
}
};
EditorClickButtonBinding.newInstance=function(_102a){
var _102b=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_102a);
return UserInterface.registerBinding(_102b,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_102c){
var _102d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_102c);
return UserInterface.registerBinding(_102d,EditorToolBarButtonBinding);
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
var _102e=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_102e);
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
EditorSelectorBinding.prototype.initializeComponent=function(_102f,_1030,_1031,theme){
this._editorBinding=_102f;
this._tinyEngine=_1030;
this._tinyInstance=_1031;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1033){
EditorSelectorBinding.superclass.handleAction.call(this,_1033);
switch(_1033.type){
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
EditorMenuItemBinding.newInstance=function(_1037){
var _1038=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1037);
return UserInterface.registerBinding(_1038,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1039){
var i=0,_103b,_103c=[],split=_1039.split(" ");
while((_103b=split[i++])!=null){
if(_103b.length>=3&&_103b.substring(0,3)=="mce"){
continue;
}else{
if(_103b.length>=14&&_103b.substring(0,14)=="compositemedia"){
continue;
}
}
_103c.push(_103b);
}
return _103c.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_103e){
var _103f=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_103e);
if(soap instanceof SOAPFault){
}else{
_103f=soap.XhtmlFragment;
if(!_103f){
_103f="";
}
}
WebServiceProxy.isFaultHandler=true;
return _103f;
};
VisualEditorBinding.getTinyContent=function(_1041,_1042){
var _1043=null;
if(_1041==null||!_1041.replace(/\s*/gm,"").length){
_1041=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1042.getSoapTinyContent(_1041);
if(soap instanceof SOAPFault){
var _1045=soap;
var _1046={handleDialogResponse:function(){
_1042.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1046,_1045);
}else{
_1043=soap.XhtmlFragment;
if(_1043==null){
_1043=new String("");
}
_1043=_1043.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1043;
};
VisualEditorBinding.isImage=function(_1047){
return _1047&&_1047.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1048){
return VisualEditorBinding.isImage(_1048)&&!VisualEditorBinding.isReservedElement(_1048);
};
VisualEditorBinding.isReservedElement=function(_1049){
if(VisualEditorBinding.isFunctionElement(_1049)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1049)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1049)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_104a){
return VisualEditorBinding.isImage(_104a)&&CSSUtil.hasClassName(_104a,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_104b){
return VisualEditorBinding.isImage(_104b)&&CSSUtil.hasClassName(_104b,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_104c){
return VisualEditorBinding.isImage(_104c)&&CSSUtil.hasClassName(_104c,VisualEditorBinding.HTML_CLASSNAME);
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
var _104d=this.getProperty("embedablefieldstypenames");
if(_104d!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_104d);
}
var _104e=this.getProperty("formattingconfiguration");
if(_104e!=null){
this._url+="?config="+_104e;
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
VisualEditorBinding.prototype.handleBroadcast=function(_104f,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_104f,arg);
var _1051=this.getContentWindow().bindingMap.tinywindow;
var _1052=_1051.getContentWindow();
switch(_104f){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1052){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1051);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1053){
_1053.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1054=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1054.replace(/\s*/gm,"").length==0){
_1054=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1054,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1055){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1055);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1057=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1057=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1057=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1057;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_105a){
var _105b=_105a;
if(!this._isNormalizedDocument(_105a)){
_105b=this._getHtmlMarkup().replace("${body}",_105a);
}
return _105b;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_105c){
var _105d=false;
var doc=XMLParser.parse(_105c,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_105d=true;
}
}
if(Client.isWebKit){
if(_105c.indexOf("<html")!==0){
_105d=false;
}
}
return _105d;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1062=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1062){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1062=true;
}
return _1062;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1064=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1064);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1066){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1066,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1068){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1068,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _106b=CSSComputer.getPadding(body);
var _106c=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_106c.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_106f){
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
VisualEditorPopupBinding.prototype.configure=function(_1070,_1071,_1072){
var _1073=this.editorBinding.hasSelection();
this.tinyInstance=_1070;
this.tinyEngine=_1071;
this.tinyElement=_1072;
this.hasSelection=_1073;
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
var _1077=false;
if(this.hasSelection){
_1077=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1077=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1077=true;
}
}
}
}
if(_1077){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1078=this.getMenuItemForCommand("compositeInsertLink");
var _1079=this.getMenuItemForCommand("unlink");
var _107a=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _107b=this.editorBinding.getButtonForCommand("unlink");
_1079.setDisabled(_107b.isDisabled);
if(_1079.isDisabled){
_1078.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1078.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _107c=this.editorBinding.embedableFieldConfiguration;
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
if(_107c){
var _107f=_107c.getGroupNames();
if(_107f.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_107f.each(function(_1083){
var _1084=_107c.getFieldNames(_1083);
_1084.each(function(_1085){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1085);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1083+":"+_1085);
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
var _1087=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1088=null;
var _1089=null;
if(_1087){
if(_1087.nodeName=="TD"){
_1088=_1087.getAttribute("colspan");
_1089=_1087.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1088=="1"&&_1089=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1087){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_108a){
var _108b=VisualEditorFormattingConfiguration._configurations;
if(!_108b.has(_108a)){
_108b.set(_108a,new VisualEditorFormattingConfiguration());
}
return _108b.get(_108a);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_108d){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_108e){
var _108f=null;
var _1090=VisualEditorFieldGroupConfiguration._configurations;
if(!_1090.has(_108e)){
_1090.set(_108e,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_108e)));
}
return _1090.get(_108e);
};
function VisualEditorFieldGroupConfiguration(_1091){
var _1092=new Map();
new List(_1091).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1092.set(group.GroupName,map);
});
this._groups=_1092;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1096){
return this._groups.get(_1096).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1097,_1098){
return this._groups.get(_1097).get(_1098).xhtml;
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
var _109a=this.getDescendantElementsByLocalName("textarea");
while(_109a.hasNext()){
var _109b=_109a.getNext();
if(_109b.getAttribute("selected")=="true"){
this._startContent=_109b.value;
this._textareaname=_109b.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _109d=this.getContentWindow().bindingMap.templatetree;
_109d.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_109e){
var _109f=_109d.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_109f.textareaname);
_109e.consume();
}});
_109d.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a0){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a1=this.getContentWindow().bindingMap.toolsplitter;
_10a1.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a2=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a2.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a2);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a3){
this._textareas=new Map();
while(_10a3.hasNext()){
var _10a4=_10a3.getNext();
var _10a5=_10a4.getAttribute("placeholderid");
this._textareas.set(_10a5,{placeholderid:_10a5,placeholdername:_10a4.getAttribute("placeholdername"),placeholdermarkup:_10a4.value,textareaelement:_10a4,isSelected:_10a4.getAttribute("selected")=="true"});
}
var _10a6=new Map();
this._textareas.each(function(name,_10a8){
var _10a9=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10a9.setLabel(_10a8.placeholdername);
_10a9.setImage("${icon:placeholder}");
_10a9.setProperty("placeholder",true);
_10a9.textareaname=name;
_10a6.set(_10a8.placeholdername,_10a9);
if(_10a8.isSelected){
selected=_10a9;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10aa=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10aa.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10ab=this.getContentWindow().bindingMap.templatetree;
var _10ac=_10ab.add(TreeNodeBinding.newInstance(_10ab.bindingDocument));
_10ac.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10ac.setImage("${icon:warning}");
_10ac.attach();
var _10ad=this.getContentWindow().bindingMap.statusbar;
_10ad.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10af=this._textareas.get(name);
var _10b0=_10af.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b0));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b1){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b1;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b2=this.getContentWindow().bindingMap.statusbar;
_10b2.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b1);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10b5=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10b5;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10b6=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10b6=this._xhtmls.get(this._textareaname);
if(_10b6==null){
_10b6=VisualEditorBinding.XHTML;
}
}
return _10b6;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10b8){
_10b8.textareaelement.value=_10b8.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10b9,_10ba,_10bb){
var _10bc=_10b9.getElementsByTagName("div").item(0);
var _10bd=_10ba.getElementsByTagName("div").item(0);
var _10be=new List(_10bc.getElementsByTagName("textarea"));
var _10bf=new List(_10bd.getElementsByTagName("textarea"));
if(_10be.getLength()!=_10bf.getLength()){
_10bb=true;
}else{
var index=0;
_10be.each(function(_10c1,index){
var _10c3=_10bf.get(index);
var newid=_10c1.getAttribute("placeholderid");
var oldid=_10c3.getAttribute("placeholderid");
var _10c6=_10c1.getAttribute("placeholdername");
var _10c7=_10c3.getAttribute("placeholdername");
if(newid!=oldid||_10c6!=_10c7){
_10bb=true;
}
return !_10bb;
});
}
if(_10bb){
var html=null;
if(_10bc.innerHTML!=null){
html=_10bc.innerHTML;
}else{
html=DOMSerializer.serialize(_10bc);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10ca){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10ca);
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
var _10cd=this.getDescendantBindingByLocalName("selector");
_10cd.attach();
this._populateTemplateSelector();
var _10ce=this.getContentWindow().bindingMap.templateselector;
_10ce.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10cf=this.getDescendantBindingByLocalName("selector");
var _10d0=this.getContentWindow().bindingMap.templateselector;
_10cf.selections.each(function(_10d1){
_10d1.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d0.populateFromList(_10cf.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d2=this.getDescendantBindingByLocalName("selector");
var _10d3=this.getContentWindow().bindingMap.templateselector;
_10d2.selectByValue(_10d3.getValue());
_10d2.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10d4){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10d9,_10da){
var _10db=_10da;
if(old.has(_10d9)){
_10db=old.get(_10d9).placeholdermarkup;
}
return _10db;
}
while(_10d4.hasNext()){
var _10dc=_10d4.getNext();
var _10dd=_10dc.getAttribute("placeholderid");
this._textareas.set(_10dd,{placeholderid:_10dd,placeholdername:_10dc.getAttribute("placeholdername"),placeholdermarkup:compute(_10dd,_10dc.value),textareaelement:_10dc,isSelected:_10dc.getAttribute("selected")=="true"});
}
var _10de=null;
var _10df=this.getContentWindow().bindingMap.templatetree;
var _10e0=new Map();
this._textareas.each(function(name,_10e2){
var _10e3=_10df.add(TreeNodeBinding.newInstance(_10df.bindingDocument));
_10e3.setLabel(_10e2.placeholdername);
_10e3.setImage("${icon:placeholder}");
_10e3.setProperty("placeholder",true);
_10e3.textareaname=name;
_10e0.set(_10e2.placeholdername,_10e3);
if(_10e2.isSelected){
_10de=_10e3;
}
});
_10df.attachRecursive();
if(_10de!=null){
var _10e4=true;
if(this._oldtextareas.hasEntries()){
_10e4=false;
var map=new Map();
this._textareas.each(function(id,_10e7){
map.set(_10e7.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10e4=true;
}
}
if(_10e4){
var _10e8=this._textareas.get(_10de.textareaname);
this._textareaname=_10de.textareaname;
this._placeholdername=_10e8.placeholdername;
this._setContentFromPlaceHolder(_10de.textareaname);
_10de.focus();
}else{
var _10e9=_10e0.get(this._placeholdername);
this._textareaname=_10e9.textareaname;
_10e9.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10ec){
var _10ed=null;
if(Client.isWebKit||Client.isExplorer){
_10ed=node.getElementsByTagName(_10ec);
}else{
_10ed=node.getElementsByTagName("ui:"+_10ec);
}
return _10ed;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10ee,_10ef){
var _10f0=this._getElementsByTagName(_10ee,"selector").item(0);
var _10f1=this._getElementsByTagName(_10ef,"selector").item(0);
var _10f2=false;
var _10f3=false;
if(_10f0!=null&&_10f1!=null){
var _10f4=new List(this._getElementsByTagName(_10f0,"selection"));
var _10f5=new List(this._getElementsByTagName(_10f1,"selection"));
if(_10f4.getLength()!=_10f5.getLength()){
_10f2=true;
_10f3=true;
}else{
_10f4.each(function(_10f6,index){
var _10f8=_10f6.getAttribute("value");
var _10f9=_10f5.get(index).getAttribute("value");
if(_10f8!=_10f9){
_10f2=true;
}
return !_10f2;
});
_10f4.each(function(_10fa,index){
var _10fc=_10fa.getAttribute("selected");
var _10fd=_10f5.get(index).getAttribute("selected");
if(_10fc!=_10fd){
_10f3=true;
}
return !_10f3;
});
}
}
if(_10f2){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f0);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_10f3){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10ee,_10ef,_10f3);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10ff){
var _1100=null;
if(_10ff==undefined){
_10ff=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1102){
if(_1102.PlaceholderId==_10ff){
_1100=_1102.ClientRectangle.Width;
return false;
}
});
}
return _1100;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1104=this._pageId;
var _1105=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1104,_1105,function(_1107){
self._templatePreview=_1107;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1108){
var _1109=this._pageId;
var _110a=this._textareaname;
var _110b=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1108,_1109,_110b,_110a,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_110d){
var _110e=this._pageId;
var _110f=this._textareaname;
var _1110=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_110d,_110e,_1110,_110f,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1112,frame,_1114){
this._editorBinding=_1112;
this._codePressFrame=frame;
this._codePressEngine=_1114;
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
var _111a=this.getProperty("validate");
if(_111a==true){
this._hasStrictValidation=true;
}
var _111b=this.getProperty("strictsave");
if(_111b===false){
this._strictSave=false;
}
var _111c=this.getProperty("validator");
if(_111c!=null){
this._validator=_111c;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_111d,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_111d,arg);
switch(_111d){
case BroadcastMessages.CODEMIRROR_LOADED:
var _111f=this.getContentWindow().bindingMap.codemirrorwindow;
if(_111f!=null){
var _1120=_111f.getContentWindow();
if(arg.broadcastWindow==_1120){
this._codemirrorWindow=_1120;
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
this.initializeEditorComponents(_111f);
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
this.unsubscribe(_111d);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1124){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1124);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1125){
if(_1125!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1125;
EditorBinding.isActive=_1125;
var _1126=this._codemirrorWindow.standardEventHandler;
if(_1125){
_1126.enableNativeKeys(true);
}else{
_1126.disableNativeKeys();
}
var _1127=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1127!=null){
if(_1125){
_1127.enable();
}else{
_1127.disable();
}
}
if(_1125){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _112b=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _112b;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_112c){
_112c.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_112e){
if(!this._isFinalized){
if(_112e!=this._startContent){
this._startContent=_112e;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_112e);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _112f=this.getContentWindow().bindingMap.editorpage.getContent();
return _112f?_112f:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1130){
if(this._pageBinding!=null){
this._pageBinding.cover(_1130);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1131){
if(_1131!=null&&this.shadowTree.dotnetinput!=null){
var value=_1131.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1133=true;
var _1134=this.getContent();
if(this._validator!=null){
_1133=Validator.validateInformed(_1134,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1135=_1134.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1135!=_1134){
_1134=_1135;
this.setContent(_1135);
}
_1133=XMLParser.isWellFormedDocument(_1134,true,!this._strictSave);
if(_1133==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1133=this._isValidHTML(_1134);
break;
}
}
break;
}
}
return _1133;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1137=true;
var doc=XMLParser.parse(xml);
var _1139=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1139.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1139.add("NamespaceURI");
}
var head=null,body=null;
var _113d=new List(root.childNodes);
while(_113d.hasNext()){
var child=_113d.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1139.add("MultipleHead");
}
if(body!=null){
_1139.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1139.add("MultipleBody");
}
body=child;
break;
default:
_1139.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1139.add("MissingHead");
}
if(body==null){
_1139.add("MissingBody");
}
}
if(_1139.hasEntries()){
_1137=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1139.getFirst()));
}
return _1137;
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
var _113f=null;
var page=this._pageBinding;
if(page!=null){
_113f=page.getCheckSum();
}
return _113f;
};
ProgressBarBinding.prototype=new Binding;
ProgressBarBinding.prototype.constructor=ProgressBarBinding;
ProgressBarBinding.superclass=Binding.prototype;
ProgressBarBinding.WIDTH=190;
ProgressBarBinding.NOTCH=9;
ProgressBarBinding._bindingInstance=null;
ProgressBarBinding.notch=function(_1141){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1141);
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
ProgressBarBinding.prototype.notch=function(_1143){
_1143=_1143?_1143:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1143);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1145,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1145,arg);
switch(_1145){
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
StartMenuItemBinding.prototype.setChecked=function(_1147,_1148){
StartMenuItemBinding.superclass.setChecked.call(this,_1147,_1148);
if(!_1148){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1149){
var _114a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1149);
UserInterface.registerBinding(_114a,StartMenuItemBinding);
return UserInterface.getBinding(_114a);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_114d,_114e){
var _114f=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_114e,true)==true){
if(_114d!="*"){
_114d=KeySetBinding._sanitizeKeyModifiers(_114d);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_114f[doc]){
_114f[doc]={};
}
if(!_114f[doc][code]){
_114f[doc][code]={};
}
_114f[doc][code][_114d]=_114e;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1153=false;
var code=e.keyCode;
var _1155=KeySetBinding.keyEventHandlers;
if(_1155[doc]&&_1155[doc][code]){
var _1156="[default]";
_1156+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1156+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1156+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1156+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1157=_1155[doc][code][_1156];
if(_1157==null){
_1157=_1155[doc][code]["*"];
}
if(_1157!=null){
_1157.handleKeyEvent(e);
_1153=true;
}
}
return _1153;
};
KeySetBinding._sanitizeKeyModifiers=function(_1158){
var _1159="[default]";
var mods={};
if(_1158){
new List(_1158.split(" ")).each(function(_115b){
mods[_115b]=true;
});
function check(_115c){
if(mods[_115c]){
_1159+=" "+_115c;
}
}
check("shift");
check("control");
}
return _1159;
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
var _1160=key.getAttribute("oncommand");
var _1161=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1161){
DOMEvents.preventDefault(e);
}
var _1163=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1160,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1164){
if(_1164 instanceof CursorBinding){
_1164.setOpacity(0);
_1164.show();
new Animation({modifier:9,onstep:function(_1165){
_1164.setOpacity(Math.sin(_1165*Math.PI/180));
},onstop:function(){
_1164.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1166){
if(_1166 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1167){
_1166.setOpacity(Math.cos(_1167*Math.PI/180));
},onstop:function(){
_1166.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1168,_1169,_116a){
if(_1168 instanceof CursorBinding){
_116a.x-=16;
_116a.y-=16;
new Animation({modifier:3,onstep:function(_116b){
var tal=Math.sin(_116b*Math.PI/180);
_1168.setPosition(new Point(((1-tal)*_1169.x)+((0+tal)*_116a.x),((1-tal)*_1169.y)+((0+tal)*_116a.y)));
},onstop:function(){
CursorBinding.fadeOut(_1168);
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
CursorBinding.prototype.setOpacity=function(_1171){
this.bindingElement.style.opacity=new String(_1171);
this._opacity=_1171;
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
function setOpacity(_1174){
cover.bindingElement.style.opacity=new String(_1174);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1175){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1175*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1177){
cover.bindingElement.style.MozOpacity=new String(_1177);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1178){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1178*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_117a){
if(_117a!=this._isBusy){
if(_117a){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_117a;
}
};
CoverBinding.prototype.setTransparent=function(_117b){
if(_117b!=this._isTransparent){
if(_117b){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_117b;
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
CoverBinding.prototype.setHeight=function(_117d){
if(_117d>=0){
this.bindingElement.style.height=new String(_117d+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_117e){
var _117f=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_117e);
return UserInterface.registerBinding(_117f,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1181=UncoverBinding._bindingInstance;
if(Binding.exists(_1181)){
_1181.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1185){
this._isFading=_1185==true;
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
var _1186=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1186.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1186.clearRect(0,0,300,150);
_1186.fillRect(0,0,300,150);
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
var _1188=this._canvas.getContext("2d");
_1188.clearRect(0,0,300,150);
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
var _1189=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1189);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _118a=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_118a){
this._startcontent=_118a.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_118b){
SourceCodeViewerBinding.superclass.handleAction.call(this,_118b);
switch(_118b.type){
case WindowBinding.ACTION_ONLOAD:
if(_118b.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_118b.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_118b);
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
var _118f=this._transformer.transformToString(doc);
this._inject(_118f);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1192){
this.getContentDocument().body.innerHTML=_1192;
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
var _119a=list.getNext();
var id=_119a.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_119a);
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
var _11a4=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a4.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a4.appendChild(att);
}
elm.appendChild(_11a4);
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
var _11ae=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ae){
doc=XMLParser.parse(_11ae);
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
var _11b2=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11b2;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b3,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b3,arg);
switch(_11b3){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11b5){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11b5);
switch(_11b5.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11b5.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11b7=new List();
list.each(function(lang){
_11b7.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11b7);
this.bindingElement.style.display="block";
}else{
this.bindingElement.style.display="none";
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11bb=this.getDescendantBindingByLocalName("menugroup");
_11bb.detachRecursive();
_11bb.bindingElement.innerHTML="";
if(list.hasEntries()){
while(list.hasNext()){
var _11bc=list.getNext();
if(_11bc.isSelected){
this.setLabel(_11bc.label);
}
var _11bd=MenuItemBinding.newInstance(this.bindingDocument);
_11bd.imageProfile=_11bc.imageProfile;
_11bd.setLabel(_11bc.label);
if(_11bc.tooltip!=null){
_11bd.setToolTip(_11bc.tooltip);
}
_11bd.selectionValue=_11bc.value;
_11bb.add(_11bd);
_11bd.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11c0){
switch(_11c0){
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
var _11c3=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11c3,root);
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
var _11c4=this.getProperty("status");
if(_11c4!=null){
switch(_11c4){
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
GenericViewBinding.prototype.handleAction=function(_11c6){
GenericViewBinding.superclass.handleAction.call(this,_11c6);
var _11c7=_11c6.target;
switch(_11c6.type){
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_11c6.consume();
break;
case TreeNodeBinding.ACTION_OPEN:
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_11c6.target.node.getEntityToken());
_11c6.consume();
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
var _11c9=node.getChildren();
while(_11c9.hasEntries()){
var child=_11c9.extractFirst();
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
var _11cc=TreeNodeBinding.newInstance(this.bindingDocument);
_11cc.node=child;
var label=_11cc.node.getLabel();
if(label){
_11cc.setLabel(label);
}
var _11ce=_11cc.node.getImageProfile();
if(_11ce){
_11cc.setImage(_11ce.getDefaultImage());
}
_11cc.isContainer=_11cc.node.hasChildren();
this.add(_11cc);
_11cc.attach();
};
GenericViewBinding.prototype.getPerspectiveHandle=function(){
return this.perspectiveNode.getHandle();
};
GenericViewBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition,actionProfile:this.getCompiledActionProfile(),});
}
};
GenericViewBinding.prototype.focusSingleTreeNodeBinding=function(_11cf){
GenericViewBinding.superclass.focusSingleTreeNodeBinding.call(this,_11cf);
if(_11cf!=null){
this._handleSystemTreeFocus();
}
};
GenericViewBinding.prototype.getCompiledActionProfile=SystemTreeBinding.prototype.getCompiledActionProfile;
GenericViewBinding.newInstance=function(_11d0){
var _11d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_11d0);
var _11d2=UserInterface.registerBinding(_11d1,GenericViewBinding);
_11d2.treeBodyBinding=TreeBodyBinding.newInstance(_11d0);
return _11d2;
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
UserInterfaceMapping.prototype.merge=function(_11d5){
for(var _11d6 in _11d5.map){
this.map[_11d6]=_11d5.getBindingImplementation(_11d6);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11d7){
var _11d8=null;
var name=_11d7.nodeName.toLowerCase();
if(this.map[name]){
_11d8=this.map[name];
}
return _11d8;
};
var UserInterface=new function(){
var _11da=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11db=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11da,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11dc=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11de,impl){
var _11e0=null;
if(!this.hasBinding(_11de)){
var _11e1=DOMUtil.getParentWindow(_11de);
if(DOMUtil.getLocalName(_11de)!="bindingmapping"){
if(!impl&&_11de.getAttribute("binding")!=null){
var _11e2=_11de.getAttribute("binding");
impl=_11e1[_11e2];
if(impl==null){
throw "No such binding in scope: "+_11e2;
}
}
if(!impl){
var _11e3=_11e1.DocumentManager;
if(_11e3){
var _11e4=_11e3.customUserInterfaceMapping;
if(_11e4){
impl=_11e4.getBindingImplementation(_11de);
}
}
}
if(!impl){
impl=_11db.getBindingImplementation(_11de);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11e0=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11e0){
var key=KeyMaster.getUniqueKey();
_11de.setAttribute("key",key);
_11e0.key=key;
if(!_11de.id){
_11de.id=key;
}
keys[key]={element:_11de,binding:_11e0};
_11e0.onBindingRegister();
}
}
}
return _11e0;
};
this.unRegisterBinding=function(_11e6){
terminate(_11e6);
};
function terminate(_11e7){
if(Binding.exists(_11e7)==true){
var key=_11e7.key;
Binding.destroy(_11e7);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11e7=null;
}else{
_11dc.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11e9){
var _11ea=null;
if(keys[_11e9.key]){
_11ea=keys[_11e9.key].element;
}
return _11ea;
};
this.getBinding=function(_11eb){
var _11ec=null;
if(_11eb&&_11eb.nodeType==Node.ELEMENT_NODE){
try{
var key=_11eb.getAttribute("key");
if(key&&keys[key]){
_11ec=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11eb);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11ec;
};
this.getBindingByKey=function(key){
var _11ef=null;
if(keys[key]){
_11ef=keys[key].binding;
}
return _11ef;
};
this.hasBinding=function(_11f0){
return this.getBinding(_11f0)!=null;
};
this.isBindingVisible=function(_11f1){
var _11f2=Application.isOperational;
if(_11f2==true){
var _11f3=new Crawler();
_11f3.type=NodeCrawler.TYPE_ASCENDING;
_11f3.id="visibilitycrawler";
_11f3.addFilter(function(_11f4){
var b=UserInterface.getBinding(_11f4);
var res=0;
if(!b.isVisible){
_11f2=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11f3.crawl(_11f1.bindingElement);
_11f3.dispose();
}
return _11f2;
};
var _11f7=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11f7={};
for(var key in keys){
_11f7[key]=true;
}
};
this.getPoint=function(){
var _11fb=null;
if(_11f7){
_11fb=new List();
for(var key in keys){
if(!_11f7[key]){
_11fb.add(key);
}
}
}
return _11fb;
};
this.clearPoint=function(){
_11f7=null;
};
this.trackUndisposedBindings=function(){
var _11fd=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11fd){
_11fd="Bindings illdisposed: ";
}
_11fd+=entry.binding+" ";
}
}
if(_11fd!=null){
_11dc.error(_11fd);
}
};
this.autoTrackDisposedBindings=function(_1200){
if(_1200){
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
SOAPRequest.newInstance=function(_1201,_1202){
var _1203=_1201+"/"+_1202;
var _1204=new SOAPRequest(_1203);
var _1205=SOAPRequest.resolver;
_1204.document=Templates.getTemplateDocument("soapenvelope.xml");
_1204.envelope=_1205.resolve("soap:Envelope",_1204.document);
_1204.header=_1205.resolve("soap:Header",_1204.envelope);
_1204.body=_1205.resolve("soap:Body",_1204.envelope);
return _1204;
};
SOAPRequest._parseResponse=function(_1206){
var _1207=null;
var _1208=false;
var doc=_1206.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1207=SOAPRequestResponse.newInstance(_1206.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1206.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1208=true;
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
var text=_1206.responseText;
if(_1206.status==503||text.indexOf("id=\"offline\"")>-1){
_1208=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1206.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1206.responseText);
}
}
}
}
if(_1208==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1207;
};
function SOAPRequest(_120d){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_120d;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _120f=DOMUtil.getXMLHTTPRequest();
var _1210=null;
_120f.open("post",url,false);
_120f.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_120f.setRequestHeader("SOAPAction",this.action);
try{
_120f.send(this.document);
_1210=SOAPRequest._parseResponse(_120f);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_120f=null;
return _1210;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1213){
var _1214=DOMUtil.getXMLHTTPRequest();
_1214.open("post",url,true);
_1214.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1214.setRequestHeader("SOAPAction",this.action);
_1214.onreadystatechange=function(){
if(_1214.readyState==4){
var _1215=SOAPRequest._parseResponse(_1214);
_1213(_1215);
_1214=null;
}
};
_1214.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1216 in this){
this[_1216]=null;
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
var _1218=null;
if(doc&&doc.documentElement){
_1218=new SOAPRequestResponse();
var _1219=SOAPRequestResponse.resolver;
_1218.document=doc;
_1218.envelope=_1219.resolve("soap:Envelope",_1218.document);
_1218.header=_1219.resolve("soap:Header",_1218.envelope);
_1218.body=_1219.resolve("soap:Body",_1218.envelope);
var fault=_1219.resolve("soap:Fault",_1218.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1218.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1219.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1219.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1218;
};
function SOAPFault(_121b,_121c,_121d){
this._operationName=_121b;
this._operationAddress=_121c;
this._faultString=_121d;
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
SOAPFault.newInstance=function(_121e,fault){
return new SOAPFault(_121e.name,_121e.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1221){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1221;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1223=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1223.body,this._operation);
var _1225=this._wsdl.getSchema();
var _1226=_1225.lookup(this._operation);
var _1227=_1226.getListedDefinitions();
while(_1227.hasNext()){
var def=_1227.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1223;
};
SOAPEncoder.prototype._resolve=function(_122b,_122c,value){
var _122e=this._wsdl.getSchema();
if(_122c.isSimpleValue){
this._appendText(_122b,value,_122c.type=="string");
}else{
var _122f=_122e.lookup(_122c.type);
if(_122f instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_122f.getListedDefinitions();
if(_122f.isArray){
var _1231=new List(value);
var def=defs.getNext();
while(_1231.hasNext()){
var elm=this._appendElement(_122b,def.name);
var val=_1231.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_122b,def.name);
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
SOAPEncoder.prototype._appendText=function(_1238,value,_123a){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _123d=false;
var i=0,c;
while(c=chars[i++]){
var _1240=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1240=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1240=false;
}
break;
}
if(!_1240){
safe+=c;
}else{
_123d=true;
}
}
if(_123d){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1238.appendChild(_1238.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1243){
this._wsdl=wsdl;
this._operation=_1243;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1248){
var _1249=null;
var _124a=this._wsdl.getSchema();
var id=this._operation+"Response";
var _124c=this.resolve(id,_1248.body);
var _124d=_124a.lookup(id);
var _124e=_124d.getListedDefinitions();
while(!_1249&&_124e.hasNext()){
var def=_124e.getNext();
var elm=this.resolve(def.name,_124c);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1249=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1249.appendChild(_1249.importNode(e,true));
}else{
_1249=this._compute(elm,def);
}
}
return _1249;
};
SOAPDecoder.prototype._compute=function(_1252,_1253){
var _1254=null;
var _1255=this._wsdl.getSchema();
if(_1253.isSimpleValue){
_1254=this._getSimpleValue(_1252,_1253.type);
}else{
var _1256=_1255.lookup(_1253.type);
if(_1256 instanceof SchemaSimpleType){
_1254=this._getSimpleValue(_1252,_1256.restrictionType);
}else{
var defs=_1256.getListedDefinitions();
if(_1256.isArray){
_1254=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1252);
while(elms.hasNext()){
var elm=elms.getNext();
_1254.push(this._compute(elm,def));
}
}else{
if(_1252==null){
_1254=null;
}else{
_1254={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1252);
if(elm){
_1254[def.name]=this._compute(elm,def);
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
return _1254;
};
SOAPDecoder.prototype._getSimpleValue=function(_125b,type){
var _125d=null;
if(_125b!=null&&_125b.firstChild&&_125b.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_125b.childNodes.length>1){
_125b.normalize();
}
_125d=_125b.firstChild.data;
switch(type){
case Schema.types.STRING:
_125d=_125d;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_125d=Number(_125d);
break;
case Schema.types.BOOLEAN:
_125d=_125d=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _125d;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_125e){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_125e);
}
Schema.prototype._parseSchema=function(_125f){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1260={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_125f);
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
_1260[rule.getAttribute("name")]=entry;
}
return _1260;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1265){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1265);
}
SchemaDefinition.prototype._parse=function(_1266){
var min=_1266.getAttribute("minOccurs");
var max=_1266.getAttribute("maxOccurs");
var type=_1266.getAttribute("type");
this.name=_1266.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _126c=split[1];
this.isSimpleValue=sort!="tns";
this.type=_126c;
}else{
var elm=_1266.getElementsByTagName("*").item(0);
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
function SchemaElementType(_126e,_126f){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_126e,_126f);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1270,_1271){
var els=_1270.resolveAll("s:complexType/s:sequence/s:element",_1271);
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
function SchemaComplexType(_1273,_1274){
this._definitions=new List();
this._parseListedDefinitions(_1273,_1274);
this.isArray=_1274.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1275,_1276){
var els=_1275.resolveAll("s:sequence/s:element",_1276);
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
function SchemaSimpleType(_1279,_127a){
this.restrictionType=null;
this._parse(_1279,_127a);
}
SchemaSimpleType.prototype._parse=function(_127b,_127c){
var _127d=_127b.resolve("s:restriction",_127c);
if(_127d){
this.restrictionType=_127d.getAttribute("base").split(":")[1];
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
var _1280=null;
var _1281=DOMUtil.getXMLHTTPRequest();
_1281.open("get",url,false);
_1281.send(null);
if(_1281.responseXML){
_1280=_1281.responseXML.documentElement;
}else{
alert(_1281.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1280;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1282=new List();
var _1283=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1283.hasEntries()){
while(_1283.hasNext()){
var _1284=_1283.getNext();
var name=_1284.getAttribute("name");
_1282.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1282;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1287,_1288,_1289){
this.name=name;
this.address=_1287;
this.encoder=_1288;
this.decoder=_1289;
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
var _128d=wsdl.getOperations();
_128d.each(function(_128e){
proxy[_128e.name]=WebServiceProxy.createProxyOperation(_128e);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_128f,_1290){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1290){
var log=_1290 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_128f.address+": "+_128f.name+"\n\n";
log+=DOMSerializer.serialize(_1290.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1292){
return function(){
var _1293=new List(arguments);
var _1294=null;
if(typeof (_1293.getLast())=="function"){
var _1295=_1293.extractLast();
var _1296=_1292.encoder.encode(_1293);
this._log(_1292,_1296);
var self=this;
var _1298=_1296.asyncInvoke(_1292.address,function(_1299){
self._log(_1292,_1299);
if(_1299){
if(_1299.fault){
_1294=SOAPFault.newInstance(_1292,_1299.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1294,_1296,_1299);
}
}else{
if(WebServiceProxy.isDOMResult){
_1294=_1299.document;
}else{
_1294=_1292.decoder.decode(_1299);
}
}
}
_1296.dispose();
_1295(_1294);
});
}else{
var _1296=_1292.encoder.encode(new List(arguments));
this._log(_1292,_1296);
var _1298=_1296.invoke(_1292.address);
this._log(_1292,_1298);
if(_1298){
if(_1298.fault){
_1294=SOAPFault.newInstance(_1292,_1298.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1294,_1296,_1298);
}
}else{
if(WebServiceProxy.isDOMResult){
_1294=_1298.document;
}else{
_1294=_1292.decoder.decode(_1298);
}
}
}
_1296.dispose();
return _1294;
}
};
};
WebServiceProxy.handleFault=function(_129a,_129b,_129c){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_129a,soapRequest:_129b,soapResponse:_129c});
}
catch(exception){
alert(_129a.getFaultString());
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
var _129d=SystemLogger.getLogger("MessageQueue");
var _129e=null;
var _129f=0;
var _12a0=null;
var _12a1=new Map();
var _12a2=new Map();
var _12a3=false;
var _12a4=false;
var _12a5=false;
var _12a6=false;
var _12a7={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_129e=ConsoleMessageQueueService;
_129f=_129e.GetCurrentSequenceNumber("dummyparam!");
this.index=_129f;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12a3){
if(!MessageQueue._actions.hasEntries()){
var _12a8=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12a4=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12a8;
_12a4=false;
}
}
}
};
this._pokeserver=function(){
if(_12a3==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12a9){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12a4);
this._updateMessages(_12a9);
}
};
this._updateMessages=function(_12aa){
if(_12a5){
_12a6=true;
}else{
_12a5=true;
var self=this;
var _12ac=function(_12ad){
if(_12ad!=null){
if(Types.isDefined(_12ad.CurrentSequenceNumber)){
var _12ae=_12ad.CurrentSequenceNumber;
if(_12ae<self.index){
_129d.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12ae);
}
self.index=_12ae;
var _12af=new List(_12ad.ConsoleActions);
if(_12af.hasEntries()){
self.evaluate(_12af);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_129d.error("No sequencenumber in MessageQueue response!");
}
}
_12a5=false;
if(_12a6){
_12a6=false;
self._updateMessages();
}
};
if(_12aa){
_12ac(_129e.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_129e.GetMessages(Application.CONSOLE_ID,this.index,_12ac);
}
}
};
this.evaluate=function(_12b0){
var _12b1=new List();
if(_12b0.hasEntries()){
_12b0.each(function(_12b2){
if(this._index[_12b2.Id]!=true){
_12b1.add(_12b2);
}
this._index[_12b2.Id]=true;
},this);
if(_12b1.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12b1);
}else{
this._actions=_12b1;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12b3){
var _12b4="(No reason)";
if(_12b3!=null){
_12b4=_12b3.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12b4);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12b8){
if(_12b8==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12b9=null;
if(this._actions.hasEntries()){
var _12ba=this._actions.extractFirst();
_129f=_12ba.SequenceNumber;
_129d.debug("MessageQueue action: "+_12ba.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_129f+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12ba.ActionType){
case "OpenView":
_12b9=_12ba.OpenViewParams;
if(_12b9.ViewType=="ModalDialog"){
openDialogView(_12b9);
}else{
_12a0=_12b9.ViewId;
openView(_12b9);
}
break;
case "CloseView":
_12b9=_12ba.CloseViewParams;
_12a0=_12b9.ViewId;
closeView(_12b9);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12ba.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12a1.countEntries()+"\n";
_12a1.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_129d.debug(debug);
if(!_12a1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12bd=_12ba.SelectElementParams.PerspectiveElementKey;
if(_12bd){
var _12be={handleBroadcast:function(_12bf,arg){
switch(_12bf){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12bd){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12ba.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12be);
StageBinding.selectPerspective(_12ba.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12ba.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12ba.MessageBoxParams);
break;
case "OpenViewDefinition":
_12b9=_12ba.OpenViewDefinitionParams;
_12a0=_12b9.Handle;
openViewDefinition(_12b9);
break;
case "LogEntry":
logEntry(_12ba.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12b9=_12ba.BroadcastMessageParams;
_129d.debug("Server says: EventBroadcaster.broadcast ( \""+_12b9.Name+"\", "+_12b9.Value+" )");
EventBroadcaster.broadcast(_12b9.Name,_12b9.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12a1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12ba.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12ba.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12ba.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12b9=_12ba.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12b9.ViewId,entityToken:_12b9.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12b9=_12ba.OpenGenericViewParams;
openGenericView(_12b9);
break;
case "OpenExternalView":
_12b9=_12ba.OpenExternalViewParams;
openExternalView(_12b9);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12ba.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12a4);
}
function logEntry(_12c1){
var _12c2=_12c1.Level.toLowerCase();
SystemLogger.getLogger(_12c1.SenderId)[_12c2](_12c1.Message);
}
function openView(_12c3){
var list=paramsToList(_12c3.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12c3.ViewId);
def.entityToken=_12c3.EntityToken;
def.flowHandle=_12c3.FlowHandle;
def.position=_12a7[_12c3.ViewType],def.label=_12c3.Label;
def.image=_12c3.Image;
def.toolTip=_12c3.ToolTip;
def.argument={"url":_12c3.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12c3.ViewId,entityToken:_12c3.EntityToken,flowHandle:_12c3.FlowHandle,position:_12a7[_12c3.ViewType],url:_12c3.Url,label:_12c3.Label,image:_12c3.Image,toolTip:_12c3.ToolTip}));
}
}
function openDialogView(_12c6){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12c6.ViewId,flowHandle:_12c6.FlowHandle,position:Dialog.MODAL,url:_12c6.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12c7){
var _12c8=_12c7.DialogType.toLowerCase();
if(_12c8=="question"){
throw "Not supported!";
}else{
Dialog[_12c8](_12c7.Title,_12c7.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12c9){
var map={};
var _12cb=false;
new List(_12c9.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12cb=true;
});
var proto=ViewDefinitions[_12c9.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12c9.ViewId;
}
def.argument=_12cb?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12d0){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12d0.ViewId);
def.label=_12d0.Label;
def.toolTip=_12d0.ToolTip;
def.image=_12d0.Image;
def.argument={"url":_12d0.Url,"list":paramsToList(_12d0.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12d2){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12d2.ViewId);
def.label=_12d2.Label;
def.toolTip=_12d2.ToolTip;
def.image=_12d2.Image;
def.url=_12d2.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12d4){
if(StageBinding.isViewOpen(_12d4.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12d4.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12d5){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12d5.ViewId,isSuccess:_12d5.Succeeded});
}
this._lockSystem=function(_12d6){
var _12d7=top.bindingMap.offlinetheatre;
if(_12d6){
_12d7.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12d7.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a3=_12d6;
};
this.placeConsoleCommand=function(_12d9){
_129e.PlaceConsoleCommand(Application.CONSOLE_ID,_12d9);
};
this.handleBroadcast=function(_12da,arg){
switch(_12da){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12a0!=null&&arg==_12a0){
_12a0=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12a1.set(arg,true);
}else{
_129d.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12a1.hasEntries()){
_12a1.del(arg);
_129d.debug("Refreshed tree: "+arg+"\n("+_12a1.countEntries()+" trees left!)");
if(!_12a1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12a2.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12a2.hasEntries()==true){
_12a2.del(arg);
if(!_12a2.hasEntries()){
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
function paramsToList(_12dc){
var list=new List();
new List(_12dc).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12df=false;
var _12e0=null;
var _12e1=false;
var _12e2=Client.qualifies();
var _12e3="admin";
var _12e4="123456";
if(!_12e2){
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
this.handleBroadcast=function(_12e5){
switch(_12e5){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12e5);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12e6=bindingMap.decks.getSelectedDeckBinding();
if(_12e6!=null){
switch(_12e6.getID()){
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
var _12e7=window.bindingMap.appwindow;
_12e7.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12e8=window.location.hash.replace(/^#/,"");
if(_12e8){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12e8);
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
function fileEventBroadcasterSubscriptions(_12e9){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12ea){
if(_12e9){
EventBroadcaster.subscribe(_12ea,KickStart);
}else{
EventBroadcaster.unsubscribe(_12ea,KickStart);
}
});
}
function kickStart(_12eb){
switch(_12eb){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12df=true;
break;
}
if(_12df){
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
DataManager.getDataBinding("username").setValue(_12e3);
DataManager.getDataBinding("password").setValue(_12e4);
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
var _12ee=DataManager.getDataBinding("username").getResult();
var _12ef=DataManager.getDataBinding("passwordold").getResult();
var _12f0=DataManager.getDataBinding("passwordnew").getResult();
var _12f1=DataManager.getDataBinding("passwordnew2").getResult();
if(_12f0==_12f1){
var _12f2=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f3=LoginService.ChangePassword(_12ee,_12ef,_12f0);
if(_12f3 instanceof SOAPFault){
alert(_12f3.getFaultString());
}else{
if(_12f3.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12f3);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12f2){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12f4){
_12f4=new List(_12f4);
var _12f5=document.getElementById("passworderror");
_12f5.innerHTML="";
_12f4.each(function(error){
var _12f7=document.createElement("div");
_12f7.textContent=error;
_12f7.className="errortext";
_12f5.appendChild(_12f7);
});
_12f5.style.display="block";
var _12f8={handleAction:function(_12f9){
document.getElementById("passworderror").style.display="none";
_12f9.target.removeActionListener(Binding.ACTION_DIRTY,_12f8);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12f8);
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
this.doLogin=function(_12fa,_12fb){
var _12fc=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12fd=false;
var _12fe=false;
var _12ff=LoginService.ValidateAndLogin(_12fa,_12fb);
if(_12ff instanceof SOAPFault){
alert(_12ff.getFaultString());
}else{
if(_12ff=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_12ff=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_12ff=="passwordUpdateRequired"){
_12fe=true;
}
if(_12ff=="success"){
_12fd=true;
}
}
if(_12fe){
changePasswordRequired();
}else{
if(_12fd){
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
if(_12fc){
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
var _1300=document.getElementById("passwordexpired");
_1300.firstChild.data=_1300.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1301=DataManager.getDataBinding("username");
var _1302=DataManager.getDataBinding("password");
_1301.blur();
_1302.blur();
_1301.setValue("");
_1302.setValue("");
_1301.clean();
_1302.clean();
_1301.focus();
document.getElementById("loginerror").style.display="block";
var _1303={handleAction:function(_1304){
document.getElementById("loginerror").style.display="none";
_1304.target.removeActionListener(Binding.ACTION_DIRTY,_1303);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1303);
}
WindowManager.fireOnLoad(this);
if(!_12e2){
UpdateManager.isEnabled=false;
}
};

