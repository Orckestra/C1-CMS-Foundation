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
_926.bindingElement.style.left="-24px";
_926.bindingElement.style.width="24px";
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
};
FieldGroupBinding.prototype.setLabel=function(_9d1){
this.setProperty("label",_9d1);
if(this.shadowTree.labelBinding==null){
var _9d2=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d2.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d2.bindingElement,this.bindingElement.firstChild);
_9d2.attach();
this.shadowTree.labelBinding=_9d2;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9d1));
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
var _9d4=this.getProperty("relation");
if(_9d4!=null){
this.bindingRelation=_9d4;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9d5,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9d5,arg);
switch(_9d5){
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
FieldBinding.newInstance=function(_9d7){
var _9d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9d7);
return UserInterface.registerBinding(_9d8,FieldBinding);
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
var _9d9=this.getDescendantBindingByLocalName("fieldgroup");
if(_9d9!=null){
_9d9.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9da=true;
var _9db=this.getDescendantBindingsByLocalName("*");
while(_9db.hasNext()){
var _9dc=_9db.getNext();
if(Interfaces.isImplemented(IData,_9dc)){
var _9dd=_9dc.validate();
if(_9da&&!_9dd){
_9da=false;
}
}
}
return _9da;
};
FieldsBinding.prototype.handleAction=function(_9de){
FieldsBinding.superclass.handleAction.call(this,_9de);
var _9df=_9de.target;
if(_9df!=this){
switch(_9de.type){
case Binding.ACTION_INVALID:
var _9e0=DataBinding.getAssociatedLabel(_9df);
if(_9e0){
this._invalidFieldLabels.set(_9df.key,_9e0);
}
if(_9df.error){
if(!_9df.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9df.error},_9df);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9de.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9df.key)){
this._invalidFieldLabels.del(_9df.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9de.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e1=null;
if(this._invalidFieldLabels.hasEntries()){
_9e1=this._invalidFieldLabels.toList();
}
return _9e1;
};
FieldsBinding.newInstance=function(_9e2){
var _9e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e2);
return UserInterface.registerBinding(_9e3,FieldsBinding);
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
var _9e4=this.getProperty("image");
if(_9e4){
this.setImage(_9e4);
}
var _9e5=this.getProperty("tooltip");
if(_9e5){
this.setToolTip(_9e5);
}
var _9e6=this.getProperty("label");
if(_9e6){
this.setLabel(_9e6);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9e8=this.getAncestorBindingByLocalName("field");
if(_9e8){
var _9e9=true;
_9e8.getDescendantBindingsByLocalName("*").each(function(_9ea){
if(Interfaces.isImplemented(IData,_9ea)){
_9ea.focus();
_9e9=false;
}
return _9e9;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9eb){
this.setProperty("label",_9eb);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9eb);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9ec=this.getProperty("label");
if(!_9ec){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9ec=node.data;
}
}
return _9ec;
};
FieldDescBinding.prototype.setImage=function(_9ee){
this.setProperty("image",_9ee);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9ef){
this.setProperty("tooltip",_9ef);
if(this.isAttached){
this.bindingElement.title=_9ef;
}
};
FieldDescBinding.newInstance=function(_9f0){
var _9f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f0);
return UserInterface.registerBinding(_9f1,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f2){
var _9f3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f2);
return UserInterface.registerBinding(_9f3,FieldDataBinding);
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
var _9f4=this._fieldHelpPopupBinding;
if(_9f4){
_9f4.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9f5=app.bindingMap.fieldhelpopupset;
var doc=_9f5.bindingDocument;
var _9f7=_9f5.add(PopupBinding.newInstance(doc));
var _9f8=_9f7.add(PopupBodyBinding.newInstance(doc));
_9f7.position=PopupBinding.POSITION_RIGHT;
_9f7.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9f8.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9f9=this.getProperty("label");
if(_9f9){
_9f8.bindingElement.innerHTML=Resolver.resolve(_9f9);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9f7;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9fa=this.getAncestorBindingByLocalName("field");
if(_9fa){
_9fa.attachClassName("fieldhelp");
var _9fb=ClickButtonBinding.newInstance(this.bindingDocument);
_9fb.attachClassName("fieldhelp");
_9fb.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9fb);
_9fb.attach();
var self=this;
_9fb.oncommand=function(){
self.attachPopupBinding();
};
_9fb.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9fb;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9fd=this._fieldHelpPopupBinding;
if(_9fd&&!_9fd.isAttached){
_9fd.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ff){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ff);
switch(_9ff.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a01,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a01,arg);
switch(_a01){
case BroadcastMessages.KEY_ARROW:
var _a03=null;
var next=null;
var _a05=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a05=this.getChildBindingsByLocalName("radio");
while(!_a03&&_a05.hasNext()){
var _a06=_a05.getNext();
if(_a06.getProperty("ischecked")){
_a03=_a06;
}
}
break;
}
if(_a03){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a05.getFollowing(_a03);
while(next!=null&&next.isDisabled){
next=_a05.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a05.getPreceding(_a03);
while(next!=null&&next.isDisabled){
next=_a05.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a07){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a07){
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
var _a08=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a08.type="hidden";
_a08.name=this._name;
this.bindingElement.appendChild(_a08);
this.shadowTree.input=_a08;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a09=null;
var _a0a=this.getChildBindingsByLocalName("radio");
while(!_a09&&_a0a.hasNext()){
var _a0b=_a0a.getNext();
if(_a0b.isChecked){
_a09=_a0b.getProperty("value");
}
}
return _a09;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a0c){
};
RadioDataGroupBinding.prototype.setResult=function(_a0d){
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
var _a0e=this.getProperty("relate");
var _a0f=this.getProperty("oncommand");
var _a10=this.getProperty("isdisabled");
if(_a0e){
this.bindingRelate=_a0e;
this.relate();
}
if(_a0f){
this.oncommand=function(){
Binding.evaluate(_a0f,this);
};
}
if(_a10==true){
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
var _a12=this.getCallBackID();
this._buttonBinding.check=function(_a13){
RadioButtonBinding.prototype.check.call(this,_a13);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a14){
RadioButtonBinding.prototype.uncheck.call(this,_a14);
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
RadioDataBinding.prototype.setChecked=function(_a15,_a16){
this._buttonBinding.setChecked(_a15,_a16);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a15);
};
RadioDataBinding.prototype.check=function(_a17){
this.setChecked(true,_a17);
};
RadioDataBinding.prototype.uncheck=function(_a18){
this.setChecked(false,_a18);
};
RadioDataBinding.prototype.setDisabled=function(_a19){
if(_a19!=this.isDisabled){
this.isDisabled=_a19;
this._buttonBinding.setDisabled(_a19);
if(_a19){
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
var _a1b=DOMEvents.getTarget(e);
switch(_a1b){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a1c=this.getProperty("label");
if(_a1c){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a1c)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a1d){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a1d;
}
this.setProperty("label",_a1d);
};
RadioDataBinding.prototype.handleElement=function(_a1e){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a1f){
var _a20=_a1f.getAttribute("ischecked")==="true";
if(this.isChecked!=_a20){
this.setChecked(_a20,true);
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
var _a22=DOMEvents.getTarget(e);
switch(_a22){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a23,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a23,arg);
switch(_a23){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a26){
_a26.consume();
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
var _a28=this.getCallBackID();
this._buttonBinding.check=function(_a29){
ButtonBinding.prototype.check.call(this,_a29);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a29){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a2a){
ButtonBinding.prototype.uncheck.call(this,_a2a);
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
if(_a28!=null){
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
var _a2b=true;
var _a2c=this.bindingElement.parentNode;
if(_a2c){
var _a2d=UserInterface.getBinding(_a2c);
if(_a2d&&_a2d instanceof CheckBoxGroupBinding){
if(_a2d.isRequired){
if(_a2d.isValid){
_a2b=_a2d.validate();
}else{
_a2b=false;
}
}
}
}
return _a2b;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a2e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a2e.type="hidden";
_a2e.name=this._name;
_a2e.style.display="none";
this.bindingElement.appendChild(_a2e);
this.shadowTree.input=_a2e;
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
var _a2f=null;
var _a30=this.getProperty("value");
if(this.isChecked){
_a2f=_a30?_a30:"on";
}
return _a2f;
};
CheckBoxBinding.prototype.setValue=function(_a31){
if(_a31==this.getValue()||_a31=="on"){
this.check(true);
}else{
if(_a31!="on"){
this.setPropety("value",_a31);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a32=false;
if(this.isChecked){
_a32=this._result!=null?this._result:true;
}
return _a32;
};
CheckBoxBinding.prototype.setResult=function(_a33){
if(typeof _a33=="boolean"){
this.setChecked(_a33,true);
}else{
this._result=_a33;
}
};
CheckBoxBinding.newInstance=function(_a34){
var _a35=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a34);
return UserInterface.registerBinding(_a35,CheckBoxBinding);
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
var _a36=true;
if(this.isRequired){
var _a37=this.getDescendantBindingsByLocalName("checkbox");
if(_a37.hasEntries()){
_a36=false;
while(_a37.hasNext()&&!_a36){
if(_a37.getNext().isChecked){
_a36=true;
}
}
}
if(_a36==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a36;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a38){
if(_a38){
if(!this._labelBinding){
var _a39=LabelBinding.newInstance(this.bindingDocument);
_a39.attachClassName("invalid");
_a39.setImage("${icon:error}");
_a39.setLabel("Selection required");
this._labelBinding=this.addFirst(_a39);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a3a){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a3a);
switch(_a3a.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a3b){
var _a3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a3b);
return UserInterface.registerBinding(_a3c,CheckBoxGroupBinding);
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
var _a3d=DialogControlBinding.newInstance(this.bindingDocument);
_a3d.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a3d);
this._controlGroupBinding.attachRecursive();
var _a3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a3e);
var _a3f=this.getLabel();
if(_a3f!=null){
this.setLabel(_a3f);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a40=this._snapTargetBinding;
if(Binding.exists(_a40)==true){
_a40.removeActionListener(Binding.ACTION_BLURRED,this);
_a40.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a41){
if(Interfaces.isImplemented(IData,_a41)){
this._snapTargetBinding=_a41;
var _a42=_a41.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a42&&_a42.isConsumed){
this._environmentBinding=_a42.listener;
}
if(this._environmentBinding){
_a41.addActionListener(Binding.ACTION_BLURRED,this);
_a41.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a41)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a41.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a44=this._snapTargetBinding;
var _a45=this._environmentBinding;
var root=UserInterface.getBinding(_a44.bindingDocument.body);
if(Binding.exists(_a44)&&Binding.exists(_a45)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a44.isAttached&&_a45.isAttached){
var _a47=_a44.boxObject.getUniversalPosition();
var _a48=_a45.boxObject.getUniversalPosition();
_a48.y+=_a45.bindingElement.scrollTop;
_a48.x+=_a45.bindingElement.scrollLeft;
var tDim=_a44.boxObject.getDimension();
var eDim=_a45.boxObject.getDimension();
var _a4b=false;
if(_a47.y+tDim.h<_a48.y){
_a4b=true;
}else{
if(_a47.x+tDim.w<_a48.x){
_a4b=true;
}else{
if(_a47.y>_a48.y+eDim.h){
_a4b=true;
}else{
if(_a47.x>_a48.x+eDim.w){
_a4b=true;
}
}
}
}
if(!_a4b){
this._setComputedPosition(_a47,_a48,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a4c,_a4d,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a52=_a4c;
var _a53=false;
if(_a4c.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a53=true;
}else{
if(_a4c.x+tDim.w>=_a4d.x+eDim.w){
_a53=true;
}
}
if(_a53){
_a52.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a52.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a52.y-=(bDim.h);
_a52.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a52);
};
BalloonBinding.prototype.handleBroadcast=function(_a54,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a54,arg);
switch(_a54){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a56){
var _a57=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a56){
_a57=true;
}
}
return _a57;
};
BalloonBinding.prototype._setPosition=function(_a59){
var _a5a=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a5a=true;
}
}
if(!_a5a){
this.bindingElement.style.left=_a59.x+"px";
this.bindingElement.style.top=_a59.y+"px";
this._point=_a59;
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
BalloonBinding.prototype.handleAction=function(_a5c){
BalloonBinding.superclass.handleAction.call(this,_a5c);
var _a5d=_a5c.target;
switch(_a5c.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a5c.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a5d==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a5d)){
self.dispose();
}else{
if(_a5d.validate()){
var _a5f=true;
if(_a5c.type==Binding.ACTION_BLURRED){
var root=_a5d.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a5f=false;
}
}
if(_a5f){
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
BalloonBinding.prototype.setLabel=function(_a62){
if(this.isAttached==true){
var _a63=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a62);
_a63.appendChild(text);
this.bindingElement.appendChild(_a63);
}
this.setProperty("label",_a62);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a65){
var _a66=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a65);
var _a67=UserInterface.registerBinding(_a66,BalloonBinding);
_a67.hide();
return _a67;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a68,_a69){
if(Interfaces.isImplemented(IData,_a69)==true){
var _a6a,_a6b=_a69.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a6b&&_a6b.isConsumed){
switch(_a6b.listener.constructor){
case StageBinding:
_a6a=false;
break;
case StageDialogBinding:
_a6a=true;
break;
}
}
var _a6c=_a6a?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a6d=_a6c.add(BalloonBinding.newInstance(top.app.document));
_a6d.setLabel(_a68.text);
_a6d.snapTo(_a69);
_a6d.attach();
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
var _a6e=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a71=_a6e.getDataBinding(name);
if(_a71){
ErrorBinding.presentError({text:text},_a71);
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
FocusBinding.focusElement=function(_a72){
var _a73=true;
try{
_a72.focus();
Application.focused(true);
}
catch(exception){
var _a74=UserInterface.getBinding(_a72);
var _a75=SystemLogger.getLogger("FocusBinding.focusElement");
_a75.warn("Could not focus "+(_a74?_a74.toString():String(_a72)));
_a73=false;
}
return _a73;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a76){
var win=_a76.bindingWindow;
var id=_a76.bindingElement.id;
return {getBinding:function(){
var _a79=null;
try{
if(Binding.exists(_a76)){
_a79=win.bindingMap[id];
}
}
catch(exception){
}
return _a79;
}};
};
FocusBinding.navigateNext=function(_a7a){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a7a);
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
var _a7b=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a7b&&_a7b.isConsumed){
if(_a7b.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a7c){
FocusBinding.superclass.handleAction.call(this,_a7c);
var _a7d=_a7c.target;
var _a7e=null;
if(this._isFocusManager){
switch(_a7c.type){
case FocusBinding.ACTION_ATTACHED:
if(_a7d!=this){
this._isUpToDate=false;
}
_a7c.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a7d!=this){
this._isUpToDate=false;
_a7c.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a7e=new FocusCrawler();
_a7e.mode=FocusCrawler.MODE_BLUR;
_a7e.crawl(_a7d.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a7c.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a7d!=this){
_a7e=new FocusCrawler();
_a7e.mode=FocusCrawler.MODE_FOCUS;
_a7e.crawl(_a7d.bindingElement);
}
_a7c.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a7d)){
this.claimFocus();
this._onFocusableFocused(_a7d);
}
_a7c.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a7d)){
this._onFocusableBlurred(_a7d);
}
_a7c.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a7f){
var _a80=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a80==null&&list.hasNext()){
var _a82=list.getNext();
if(this._cachedFocus&&_a82==this._cachedFocus.getBinding()){
_a80=_a82;
}
}
if(_a80!=null){
if(_a82.isFocused){
var next=_a7f?list.getPreceding(_a80):list.getFollowing(_a80);
if(!next){
next=_a7f?list.getLast():list.getFirst();
}
next.focus();
}else{
_a80.focus();
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
var _a84=new FocusCrawler();
var list=new List();
_a84.mode=FocusCrawler.MODE_INDEX;
_a84.crawl(this.bindingElement,list);
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
var _a87=this._cachedFocus.getBinding();
if(_a87&&!_a87.isFocused){
_a87.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a88){
if(_a88!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a88;
_a88.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a88);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a89){
_a89.deleteProperty(FocusBinding.MARKER);
if(_a89==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a8b){
this.bindingElement.style.left=_a8b+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a8c){
this.hiddenTabBindings.add(_a8c);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a8d=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a8d.getLabel());
item.setImage(_a8d.getImage());
item.associatedTabBinding=_a8d;
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
TabsButtonBinding.prototype.handleAction=function(_a90){
TabsButtonBinding.superclass.handleAction.call(this,_a90);
switch(_a90.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a91=this.selectedTabBinding;
if(_a91){
this.containingTabBoxBinding.moveToOrdinalPosition(_a91,0);
this.containingTabBoxBinding.select(_a91);
}
_a90.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a92){
var _a93=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a92);
_a93.setAttribute("type","checkbox");
_a93.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a93.className="tabbutton";
return UserInterface.registerBinding(_a93,TabsButtonBinding);
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
var _a94=TabBoxBinding.currentActiveInstance;
if(_a94!=null&&Binding.exists(_a94)){
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
var _a95=this.getTabElements().getLength();
var _a96=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a95!=_a96){
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
var _a97=this.getTabPanelElements();
while(_a97.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a97.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a98=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a99=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a9a=_a98>_a99?"tabsbelow":"tabsontop";
this.attachClassName(_a9a);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a9c=this.getTabPanelElements();
var _a9d=null;
var _a9e=this.getProperty("selectedindex");
if(_a9e!=null){
if(_a9e>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a9f=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa1=_a9c.getNext();
this.registerTabBoxPair(tab,_aa1);
if(_a9e&&_a9f==_a9e){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a9d=tab;
}
}
_a9f++;
}
if(!_a9d){
_a9d=tabs.getFirst();
_a9d.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa2){
var _aa3=null;
var _aa4=null;
if(this.isEqualSize){
var _aa5=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aa7=this.getTabPanelElements();
_aa7.each(function(_aa8){
max=_aa8.offsetHeight>max?_aa8.offsetHeight:max;
});
_aa4=max+_aa5.top+_aa5.bottom;
if(_aa2&&this._tabPanelsElement.style.height!=null){
_aa3=this._tabPanelsElement.offsetHeight;
}
if(_aa3!=null||_aa4>_aa3){
this._tabPanelsElement.style.height=_aa4+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aa9){
_aa9._invalidCount=0;
_aa9.addActionListener(Binding.ACTION_INVALID,this);
_aa9.addActionListener(Binding.ACTION_VALID,this);
_aa9.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aaa){
TabBoxBinding.superclass.handleAction.call(this,_aaa);
var _aab=_aaa.target;
var _aac=_aaa.listener;
switch(_aaa.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aab.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aaa.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aab.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aac._invalidCount++;
if(_aac._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aac.isSelected){
self._showWarning(_aac,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aac._invalidCount>0){
_aac._invalidCount--;
if(_aac._invalidCount==0){
if(_aac.isSelected){
this._showWarning(_aac,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aac,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aaa._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aaa._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aaf=DOMEvents.getTarget(e);
if(_aaf==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab1=this.getTabPanelElements();
tabs.each(function(tab,_ab3){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab4=_ab1.get(_ab3);
this.registerTabBoxPair(tab,_ab4);
}
},this);
var _ab5=this._tabBoxPairs;
for(var key in _ab5){
var tab=_ab5[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aaf);
switch(_aaf.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ab9=_aaf.parentNode;
if(_ab9==this._tabsElement||_ab9==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aaf==this._tabsElement||_aaf==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_abb){
var _abc=this.getBindingForArgument(arg);
if(_abc!=null&&!_abc.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_abc.select(_abb);
this.getTabPanelBinding(_abc).select(_abb);
var _abd=this.getProperty("selectedindex");
if(_abd!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_abc.bindingElement,true));
}
this._selectedTabBinding=_abc;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_abc.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _abe=this.getTabPanelBinding(_abc);
this._showBalloon(_abe,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac0){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac0.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac0};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac4){
var _ac5=null;
try{
var key=_ac4.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac7=this._tabBoxPairs[key].tabPanel;
_ac5=UserInterface.getBinding(_ac7);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ac5;
};
TabBoxBinding.prototype.getTabBinding=function(_ac8){
var key=_ac8.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aca=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aca);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _acb=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_acb);
return _acb;
};
TabBoxBinding.prototype.appendTabByBindings=function(_acc,_acd){
var _ace=_acc.bindingElement;
_acc.setProperty("selected",true);
var _acf=this.summonTabPanelBinding();
var _ad0=_acf.bindingElement;
if(_acd){
_ad0.appendChild(_acd instanceof Binding?_acd.bindingElement:_acd);
}
this.registerTabBoxPair(_ace,_ad0);
UserInterface.getBinding(this._tabsElement).add(_acc);
this._tabPanelsElement.appendChild(_ad0);
_acc.attach();
UserInterface.getBinding(_ad0).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _acc;
};
TabBoxBinding.prototype.importTabBinding=function(_ad1){
var that=_ad1.containingTabBoxBinding;
var _ad3=that.getTabPanelBinding(_ad1);
var _ad4=_ad3.getBindingElement();
var _ad5=_ad1.getBindingElement();
that.dismissTabBinding(_ad1);
this._tabsElement.appendChild(_ad5);
this._tabPanelsElement.appendChild(_ad4);
this.registerTabBoxPair(_ad5,_ad4);
_ad1.containingTabBoxBinding=this;
this.select(_ad1);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ad6){
var _ad7=null;
if(_ad6.isSelected){
_ad7=this.getBestTab(_ad6);
this._selectedTabBinding=null;
}
var _ad8=this.getTabPanelBinding(_ad6);
this.unRegisterTabBoxPair(_ad6.bindingElement);
_ad6.dispose();
_ad8.dispose();
if(_ad7!=null){
this.select(_ad7,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ad9){
if(_ad9.isSelected){
this.selectBestTab(_ad9);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ada){
var _adb=this.getBestTab(_ada);
if(_adb){
this.select(_adb);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_adc){
var _add=null;
var _ade=_adc.getOrdinalPosition(true);
var _adf=this.getTabBindings();
var _ae0=_adf.getLength();
var _ae1=_ae0-1;
if(_ae0==1){
_add=null;
}else{
if(_ade==_ae1){
_add=_adf.get(_ade-1);
}else{
_add=_adf.get(_ade+1);
}
}
return _add;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae2,_ae3){
var _ae4=this.bindingDocument.getElementById(_ae2.bindingElement.id);
var tab=this.getTabElements().get(_ae3);
this._tabsElement.insertBefore(_ae4,tab);
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
var _ae6=this._nodename_tab;
var _ae7=new List(this._tabsElement.childNodes);
var _ae8=new List();
while(_ae7.hasNext()){
var _ae9=_ae7.getNext();
if(_ae9.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae9)==_ae6){
_ae8.add(_ae9);
}
}
return _ae8;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _aea=this._nodename_tabpanel;
var _aeb=new List(this._tabPanelsElement.childNodes);
var _aec=new List();
_aeb.each(function(_aed){
if(_aed.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aed)==_aea){
_aec.add(_aed);
}
});
return _aec;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aee=new List();
var _aef=this.getTabElements();
_aef.each(function(_af0){
_aee.add(UserInterface.getBinding(_af0));
});
return _aee;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af1=new List();
this.getTabPanelElements().each(function(_af2){
_af1.add(UserInterface.getBinding(_af2));
});
return _af1;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af3=null;
if(this._selectedTabBinding){
_af3=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af3;
};
TabBoxBinding.prototype._showWarning=function(_af4,_af5){
var _af6=this.getTabBinding(_af4);
if(_af5){
if(_af6.labelBinding.hasImage){
_af6._backupImage=_af6.getImage();
}
_af6.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_af6._backupImage){
_af6.setImage(_af6._backupImage);
}else{
_af6.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_af7,_af8){
var _af9=this.getTabBinding(_af7);
if((_af8&&!_af9.isSelected)||!_af8){
if(_af9.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_af8){
if(_af9.labelBinding.hasImage){
_af9._backupImage=_af9.getImage();
}
_af9.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_af9._backupImage!=null){
_af9.setImage(_af9._backupImage);
}else{
_af9.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_afa){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _afd=tab.getOrdinalPosition(true);
var next=null;
var _aff=new List();
tabs.each(function(t){
if(t.isVisible){
_aff.add(t);
}
});
if(_aff.getLength()>1){
if(_afd==0&&!_afa){
next=_aff.getLast();
}else{
if(_afd==_aff.getLength()-1&&_afa){
next=_aff.getFirst();
}else{
if(_afa){
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
var _b01=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b01.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b02){
TabsBinding.superclass.handleAction.call(this,_b02);
switch(_b02.type){
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
var _b05=self.bindingElement.offsetWidth;
if(_b05!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b05;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b06){
if(_b06 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b06);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b07=false;
var _b08,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b0b=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b0c=this.bindingElement.offsetWidth-_b0b.RESERVED_SPACE;
var _b0d=null;
var sum=0,_b0f=0;
var _b10=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b10){
tab=tabs.getNext();
_b08=UserInterface.getBinding(tab);
if(!_b0d){
_b0d=_b08;
}
sum+=tab.offsetWidth;
if(sum>=_b0c){
_b07=true;
if(_b08.isSelected){
if(!DOMUtil.isFirstElement(_b08.bindingElement,true)){
this.isManaging=false;
if(_b0d){
_b0d.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b08,_b0f-1);
_b10=false;
}
}else{
_b08.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b08);
}
}else{
_b08.show();
_b0d=_b08;
_b0f++;
}
}
if(_b10){
if(_b07&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b11=_b0d.getBindingElement();
var _b12=_b11.offsetLeft+_b11.offsetWidth;
var _b13=this.tabsButtonBinding;
setTimeout(function(){
_b13.show(_b12+4);
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
var _b14=TabBinding.superclass.serialize.call(this);
if(_b14){
_b14.label=this.getLabel();
_b14.image=this.getImage();
_b14.tooltip=this.getToolTip();
}
return _b14;
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
var _b15=this.bindingElement.getAttribute("image");
var _b16=this.bindingElement.getAttribute("label");
var _b17=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b16){
this.setLabel(_b16);
}
if(_b15){
this.setImage(_b15);
}
if(_b17){
this.setToolTip(_b17);
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
TabBinding.prototype.setLabel=function(_b19){
if(_b19!=null){
this.setProperty("label",_b19);
if(this.isAttached){
this.labelBinding.setLabel(_b19);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b1a){
if(_b1a){
this.setProperty("tooltip",_b1a);
if(this.isAttached){
this.labelBinding.setToolTip(_b1a);
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
var _b1c=false;
if(Client.isMozilla==true){
}
if(!_b1c){
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
TabBinding.prototype.select=function(_b1d){
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
TabBinding.newInstance=function(_b1e){
var _b1f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b1e);
return UserInterface.registerBinding(_b1f,TabBinding);
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
var _b20=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b20=true;
this._lastKnownDimension=dim1;
}
return _b20;
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
TabPanelBinding.prototype.select=function(_b23){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b23!=true){
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
TabPanelBinding.prototype.handleAction=function(_b24){
TabPanelBinding.superclass.handleAction.call(this,_b24);
var _b25=_b24.target;
switch(_b24.type){
case BalloonBinding.ACTION_INITIALIZE:
_b24.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b26){
var _b27=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b26);
UserInterface.registerBinding(_b27,TabPanelBinding);
return UserInterface.getBinding(_b27);
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
var _b28=SplitBoxBinding.superclass.serialize.call(this);
if(_b28){
_b28.orient=this.getOrient();
_b28.layout=this.getLayout();
}
return _b28;
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
var _b2a=this.getSplitPanelElements();
if(_b2a.hasEntries()){
var _b2b=new List(this.getLayout().split(":"));
if(_b2b.getLength()!=_b2a.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b2a.each(function(_b2c){
_b2c.setAttribute("ratio",_b2b.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b2d=this.getProperty("orient");
if(_b2d){
this._orient=_b2d;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b2e=this.getSplitterBindings();
while(_b2e.hasNext()){
var _b2f=_b2e.getNext();
if(_b2f&&_b2f.getProperty("collapsed")==true){
_b2f.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b30){
SplitBoxBinding.superclass.handleAction.call(this,_b30);
switch(_b30.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b30.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b30.target);
_b30.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b30.target);
_b30.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b31){
this._getSplitPanelBindingForSplitter(_b31).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b32){
this._getSplitPanelBindingForSplitter(_b32).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b33){
var _b34=DOMUtil.getOrdinalPosition(_b33.bindingElement,true);
var _b35,_b36=this.getSplitPanelElements();
switch(_b33.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b35=_b36.get(_b34);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b35=_b36.get(_b34+1);
break;
}
return UserInterface.getBinding(_b35);
};
SplitBoxBinding.prototype.invokeLayout=function(_b37){
var _b38=this.isHorizontalOrient();
var _b39=this.getSplitPanelBindings();
var _b3a=this.getSplitterBindings();
var _b3b=new List();
var _b3c,sum=0;
var _b3e=0;
_b39.each(function(_b3f){
if(_b3f.isFixed==true){
if(!_b39.hasNext()){
_b3e+=_b3f.getFix();
}
_b3b.add(0);
sum+=0;
}else{
_b3c=_b3f.getRatio();
_b3b.add(_b3c);
sum+=_b3c;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b3b.getLength()!=_b39.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b40=_b38?this.getInnerWidth():this.getInnerHeight();
_b40-=_b3e;
_b3a.each(function(_b41){
if(_b41.isVisible){
_b40-=SplitterBinding.DIMENSION;
}
});
var unit=_b40/sum;
var _b43=0;
var self=this;
_b39.each(function(_b45){
var span=0;
var _b47=_b3b.getNext();
if(_b45.isFixed){
span=_b45.getFix();
}else{
span=Math.floor(unit*_b47);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b43+=span;
while(_b43>_b40){
_b43--;
span--;
}
if(!_b45.isFixed){
if(_b38){
_b45.setWidth(span);
}else{
_b45.setHeight(span);
}
}
});
}
if(_b37!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b48=this.getLayout();
if(_b48){
this.setProperty("layout",_b48);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b49=this.isHorizontalOrient();
var _b4a=this.getSplitPanelBindings();
var _b4b=this.getSplitterBindings();
var _b4c=null;
var _b4d=null;
var unit=null;
var _b4f=null;
var span=null;
_b4a.each(function(_b51){
if(!unit){
unit=_b49?_b51.getWidth():_b51.getHeight();
}
span=_b49?_b51.getWidth():_b51.getHeight();
if(_b4f){
span-=_b4f;
_b4f=null;
}
_b4c=_b4b.getNext();
if(_b4c&&_b4c.offset){
_b4f=_b4c.offset;
span+=_b4f;
}
_b51.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b52){
this.logger.debug(_b52);
this.setProperty("layout",_b52);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b53="",_b54=this.getSplitPanelBindings();
_b54.each(function(_b55){
_b53+=_b55.getRatio().toString();
_b53+=_b54.hasNext()?":":"";
});
this.setProperty("layout",_b53);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b56=this.getSplitPanelElements();
_b56.each(function(_b57){
layout+="1"+(_b56.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b58){
this.bindingElement.style.width=_b58+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b59){
this.bindingElement.style.height=_b59+"px";
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
var _b5a=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b5a.reverse();
}
return _b5a;
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
SplitBoxBinding.prototype.fit=function(_b5b){
if(!this.isFit||_b5b){
if(this.isHorizontalOrient()){
var max=0;
var _b5d=this.getSplitPanelBindings();
_b5d.each(function(_b5e){
var _b5f=_b5e.bindingElement.offsetHeight;
max=_b5f>max?_b5f:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b60){
var _b61=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b60);
return UserInterface.registerBinding(_b61,SplitBoxBinding);
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
var _b64=this.getProperty("hidden");
if(_b64){
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
var _b65=this.getProperty("ratiocache");
if(_b65){
this.setRatio(_b65);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b66){
if(!this.isFixed){
if(_b66!=this.getWidth()){
if(_b66<0){
_b66=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b66+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b66);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b67=null;
if(this.isFixed){
_b67=this.getFix();
}else{
_b67=this.bindingElement.offsetWidth;
}
return _b67;
};
SplitPanelBinding.prototype.setHeight=function(_b68){
if(!this.isFixed){
if(_b68!=this.getHeight()){
try{
this.bindingElement.style.height=_b68+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b69=null;
if(this.isFixed){
_b69=this.getFix();
}else{
_b69=this.bindingElement.offsetHeight;
}
return _b69;
};
SplitPanelBinding.prototype.setRatio=function(_b6a){
this.setProperty("ratio",_b6a);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b6b){
if(_b6b){
this._fixedSpan=_b6b;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b6b);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b6b);
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
SplitPanelBinding.newInstance=function(_b6c){
var _b6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b6c);
return UserInterface.registerBinding(_b6d,SplitPanelBinding);
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
var _b6e=SplitBoxBinding.superclass.serialize.call(this);
if(_b6e){
_b6e.collapse=this.getProperty("collapse");
_b6e.collapsed=this.getProperty("collapsed");
_b6e.disabled=this.getProperty("isdisabled");
}
return _b6e;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b6f=this.getProperty("hidden");
if(_b6f){
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
SplitterBinding.prototype.setCollapseDirection=function(_b71){
this.setProperty("collapse",_b71);
this._collapseDirection=_b71;
};
SplitterBinding.prototype.handleAction=function(_b72){
SplitterBinding.superclass.handleAction.call(this,_b72);
switch(_b72.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b72.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b74=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b74.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b74.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b75){
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
SplitterBinding.newInstance=function(_b80){
var _b81=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b80);
return UserInterface.registerBinding(_b81,SplitterBinding);
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
var _b82=this.getProperty("selectedindex");
var _b83=this.getDeckElements();
if(_b83.hasEntries()){
var _b84=false;
var _b85=0;
while(_b83.hasNext()){
var deck=_b83.getNext();
if(_b82&&_b85==_b82){
deck.setAttribute("selected","true");
_b84=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b84=true;
}
}
_b85++;
}
if(!_b84){
_b83.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b88=this.getBindingForArgument(arg);
if(_b88!=null){
if(_b88!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b88.select();
this._selectedDeckBinding=_b88;
var _b89=this.getProperty("selectedindex");
if(_b89!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b88.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b8a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b8a=true;
this._lastKnownDimension=dim1;
}
return _b8a;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b8d){
var _b8e=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b8d);
return UserInterface.registerBinding(_b8e,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b8f){
DeckBinding.superclass.handleAction.call(this,_b8f);
var _b90=_b8f.target;
switch(_b8f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b8f.consume();
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
DeckBinding.newInstance=function(_b92){
var _b93=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b92);
return UserInterface.registerBinding(_b93,DeckBinding);
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
ToolBarBinding.IMAGESIZE_NORMAL="normal";
ToolBarBinding.IMAGESIZE_LARGE="large";
ToolBarBinding.IMAGESIZE_XLARGE="xlarge";
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
ToolBarBinding.prototype.onMemberInitialize=function(_b94){
if(_b94 instanceof ToolBarBodyBinding){
if(_b94.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b94;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b94;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b94);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b95=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b95){
this.setImageSize(_b95);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b97=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b97.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b97.isDefaultContent=true;
this.add(_b97);
_b97.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b99=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b99);
}
if(_b99!=null&&_b99.hasClassName("max")){
this._maxToolBarGroup(_b99,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b9b){
var _b9c=this.boxObject.getDimension().w;
var _b9d=CSSComputer.getPadding(this.bindingElement);
_b9c-=(_b9d.left+_b9d.right);
if(_b9b!=null){
_b9c-=_b9b.boxObject.getDimension().w;
if(!Client.isWindows){
_b9c-=1;
}
if(Client.isExplorer){
_b9c-=15;
}
}
max.bindingElement.style.width=_b9c+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b9e){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b9e);
};
ToolBarBinding.prototype.addLeft=function(_b9f,_ba0){
var _ba1=null;
if(this._toolBarBodyLeft!=null){
_ba1=this._toolBarBodyLeft.add(_b9f,_ba0);
}else{
throw new Error("No left toolbarbody");
}
return _ba1;
};
ToolBarBinding.prototype.addLeftFirst=function(_ba2,_ba3){
var _ba4=null;
if(this._toolBarBodyLeft){
_ba4=this._toolBarBodyLeft.addFirst(_ba2,_ba3);
}else{
throw new Error("No left toolbarbody");
}
return _ba4;
};
ToolBarBinding.prototype.addRight=function(_ba5){
var _ba6=null;
if(this._toolBarBodyRight){
_ba6=this._toolBarBodyRight.add(_ba5);
}else{
throw new Error("No left toolbarbody");
}
return _ba6;
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
ToolBarBinding.newInstance=function(_ba9){
var _baa=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ba9);
return UserInterface.registerBinding(_baa,ToolBarBinding);
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
var _bab=this.getDescendantBindingsByLocalName("toolbargroup");
var _bac=new List();
var _bad=true;
_bab.each(function(_bae){
if(_bae.isVisible&&!_bae.isDefaultContent){
_bac.add(_bae);
}
});
while(_bac.hasNext()){
var _baf=_bac.getNext();
_baf.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bad){
_baf.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bad=false;
}
if(!_bac.hasNext()){
_baf.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bb2=list.getNext();
var _bb3=_bb2.getEqualSizeWidth();
if(_bb3>max){
max=_bb3;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bb2=list.getNext();
_bb2.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bb4,_bb5){
var _bb6=ToolBarBinding.superclass.add.call(this,_bb4);
if(!_bb5){
if(_bb4 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb6;
};
ToolBarBodyBinding.prototype.addFirst=function(_bb7,_bb8){
var _bb9=ToolBarBinding.superclass.addFirst.call(this,_bb7);
if(!_bb8){
if(_bb7 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb9;
};
ToolBarBodyBinding.newInstance=function(_bba){
var _bbb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bba);
return UserInterface.registerBinding(_bbb,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bbc){
switch(_bbc){
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
var _bbd=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bbd)=="toolbarbody"){
UserInterface.getBinding(_bbd).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bbe=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bbe)=="toolbarbody"){
UserInterface.getBinding(_bbe).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bbf){
var _bc0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bbf);
return UserInterface.registerBinding(_bc0,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bc1){
var _bc2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc1);
return UserInterface.registerBinding(_bc2,ToolBarButtonBinding);
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
var _bc3=this.getProperty("label");
var _bc4=this.getProperty("image");
if(_bc3){
this.setLabel(_bc3);
}
if(_bc4){
this.setImage(_bc4);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bc5,_bc6){
if(this.isAttached){
this._labelBinding.setLabel(_bc5,_bc6);
}
this.setProperty("label",_bc5);
};
ToolBarLabelBinding.prototype.setImage=function(_bc7,_bc8){
if(this.isAttached){
this._labelBinding.setImage(_bc7,_bc8);
}
this.setProperty("image",_bc7);
};
ToolBarLabelBinding.newInstance=function(_bc9){
var _bca=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bc9);
return UserInterface.registerBinding(_bca,ToolBarLabelBinding);
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
var _bcb=this.getDescendantBindingsByLocalName("clickbutton");
if(_bcb.hasEntries()){
while(_bcb.hasNext()){
var _bcc=_bcb.getNext();
if(_bcc.isDefault){
this._defaultButton=_bcc;
_bcc.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bcc.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bcb;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bcd,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bcd,arg);
switch(_bcd){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bcf=this.getAncestorBindingByType(DialogBinding,true);
if(_bcf!=null&&_bcf.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bd0){
DialogToolBarBinding.superclass.handleAction.call(this,_bd0);
var _bd1=_bd0.target;
var _bd2=false;
var _bd3=this._buttons.reset();
if(_bd1 instanceof ClickButtonBinding){
switch(_bd0.type){
case Binding.ACTION_FOCUSED:
_bd1.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd1;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd1.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bd2&&_bd3.hasNext()){
var _bd4=_bd3.getNext();
_bd2=_bd4.isFocused;
}
if(!_bd2){
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
ComboBoxBinding.newInstance=function(_bd6){
var _bd7=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bd6);
return UserInterface.registerBinding(_bd7,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bd8,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bd8,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bdc=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bdc.each(function(_bdd){
var _bde=_bdd.getProperty("oncommand");
_bdd.setProperty("hiddencommand",_bde);
_bdd.deleteProperty("oncommand");
_bdd.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bdf=null;
var _be0=this.getActiveMenuItemId();
_bdc.reset();
while(_bdc.hasNext()){
var _be1=_bdc.getNext();
if(_be1.getProperty("id")==_be0){
_bdf=_be1;
break;
}
}
if(_bdf==null&&_bdc.hasEntries()){
_bdf=_bdc.getFirst();
}
if(_bdf!=null){
this.setButton(_bdf);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_be2){
if(_be2 instanceof MenuItemBinding){
var _be3=_be2.getProperty("label");
var _be4=_be2.getProperty("image");
var _be5=_be2.getProperty("image-hover");
var _be6=_be2.getProperty("image-active");
var _be7=_be2.getProperty("image-disabled");
var _be8=_be2.getProperty("hiddencommand");
this.setLabel(_be3?_be3:"");
this.image=_be4;
this.imageHover=_be4;
this.imageActive=_be6;
this.imageDisabled=_be7;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_be8,this);
};
this.hideActiveItem(_be2);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_be9){
if(_be9 instanceof MenuItemBinding){
this.setButton(_be9);
this.setActiveMenuItemId(_be9.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bea){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_beb){
if(_beb==_bea){
Binding.prototype.hide.call(_beb);
}else{
Binding.prototype.show.call(_beb);
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
var _bed=this._views;
for(var _bee in ViewDefinitions){
var def=ViewDefinitions[_bee];
var key=def.perspective;
if(key!=null){
if(!_bed.has(key)){
_bed.set(key,new List());
}
var list=_bed.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bf2,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bf2,arg);
switch(_bf2){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bf5=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bf5.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bf5.add(StageViewMenuItemBinding.newInstance(_bf5.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bf5.show();
}else{
_bf5.hide();
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
TreeBinding.grid=function(_bf9){
var _bfa=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bf9);
var _bfc=_bf9%_bfa;
if(_bfc>0){
_bf9=_bf9-_bfc+_bfa;
}
return _bf9+TreeBodyBinding.PADDING_TOP;
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
var _bfd=this.getProperty("focusable");
if(_bfd!=null){
this._isFocusable=_bfd;
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
var _bff=this.getProperty("builder");
if(_bff){
this._buildFromTextArea(_bff);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c00=this.getProperty("selectable");
var _c01=this.getProperty("selectionproperty");
var _c02=this.getProperty("selectionvalue");
if(_c00){
this.setSelectable(true);
if(_c01){
this.setSelectionProperty(_c01);
}
if(_c02){
this.setSelectionValue(_c02);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c05=UserInterface.getBinding(area);
var _c06=this._treeBodyBinding;
function build(){
_c06.subTreeFromString(area.value);
}
_c05.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c07){
var _c08=_c07.getHandle();
if(this._treeNodeBindings.has(_c08)){
throw "Duplicate treenodehandles registered: "+_c07.getLabel();
}else{
this._treeNodeBindings.set(_c08,_c07);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c08)){
_c07.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c0a){
this._treeNodeBindings.del(_c0a.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c0b){
var _c0c=null;
if(this._treeNodeBindings.has(_c0b)){
_c0c=this._treeNodeBindings.get(_c0b);
}else{
throw "No such treenode: "+_c0b;
}
return _c0c;
};
TreeBinding.prototype.handleAction=function(_c0d){
TreeBinding.superclass.handleAction.call(this,_c0d);
var _c0e=_c0d.target;
switch(_c0d.type){
case TreeNodeBinding.ACTION_OPEN:
_c0d.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c0e);
_c0d.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c0e;
this.focusSingleTreeNodeBinding(_c0e);
if(!this.isFocused){
this.focus();
}
_c0d.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c0e;
this.focusSingleTreeNodeBinding(_c0e);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c0e;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c0e;
this.focusSingleTreeNodeBinding(_c0e);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c0d.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c0e.isFocused){
this.blurSelectedTreeNodes();
}
_c0d.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c0f,_c10){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c11){
if(_c11!=null&&!_c11.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c11);
_c11.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c12){
this.blurSelectedTreeNodes();
while(_c12.hasNext()){
var _c13=_c12.getNext();
this._focusedTreeNodeBindings.add(_c13);
_c13.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c14=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c15=false;
var _c16=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c17=this._focusedTreeNodeBindings.getNext();
var _c18=_c17.getProperty(this._selectionProperty);
if(_c18!=null){
if(!this._selectionValue||this._selectionValue[_c18]){
_c16=(this._selectedTreeNodeBindings[_c17.key]=_c17);
var _c19=_c14[_c17.key];
if(!_c19||_c19!=_c16){
_c15=true;
}
}
}
}
if(_c16){
if(_c15){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c14){
for(var key in _c14){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c1b=new List();
for(var key in this._selectedTreeNodeBindings){
_c1b.add(this._selectedTreeNodeBindings[key]);
}
return _c1b;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c1d){
_c1d.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c1e){
var _c1f=_c1e.getDescendantBindingsByLocalName("treenode");
var _c20=true;
var self=this;
_c1f.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c20;
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
var _c23=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c23!=null){
this.focusSingleTreeNodeBinding(_c23);
_c23.callback();
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
TreeBinding.prototype.add=function(_c24){
var _c25=null;
if(this._treeBodyBinding){
_c25=this._treeBodyBinding.add(_c24);
}else{
this._treeNodeBuffer.add(_c24);
_c25=_c24;
}
return _c25;
};
TreeBinding.prototype.addFirst=function(_c26){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c27=this._treeBodyBinding.bindingElement;
_c27.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c28,_c29){
if(_c29.isContainer&&_c29.isOpen){
_c29.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c2a){
this._isSelectable=_c2a;
if(_c2a){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c2b){
this._selectionProperty=_c2b;
};
TreeBinding.prototype.setSelectionValue=function(_c2c){
if(_c2c){
var list=new List(_c2c.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c2e,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c2e,arg);
switch(_c2e){
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
var _c30=this.getFocusedTreeNodeBindings();
if(_c30.hasEntries()){
var node=_c30.getFirst();
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
var _c33=this.getFocusedTreeNodeBindings();
if(_c33.hasEntries()){
var node=_c33.getFirst();
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
var _c36=null;
while(next==null&&(_c36=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c36!=null){
next=_c36.getNextBindingByLocalName("treenode");
}
node=_c36;
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
var _c38=DOMEvents.getTarget(e);
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
var _c39=new TreeCrawler();
var list=new List();
_c39.mode=TreeCrawler.MODE_GETOPEN;
_c39.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c3c=list.getNext();
map.set(_c3c.getHandle(),true);
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
var _c41=this._positionIndicatorBinding;
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
if(y!=_c41.getPosition().y){
_c41.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c41.isVisible){
_c41.show();
}
}else{
if(_c41.isVisible){
_c41.hide();
}
}
}else{
if(_c41.isVisible){
_c41.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c44){
this._acceptingTreeNodeBinding=_c44;
this._acceptingPosition=_c44.boxObject.getLocalPosition();
this._acceptingDimension=_c44.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c44);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c45){
var map={};
var _c47=_c45.getChildBindingsByLocalName("treenode");
var _c48,pos,dim,y;
y=TreeBinding.grid(_c45.boxObject.getLocalPosition().y);
map[y]=true;
while(_c47.hasNext()){
_c48=_c47.getNext();
pos=_c48.boxObject.getLocalPosition();
dim=_c48.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c4e in this._acceptingPositions){
if(_c4e==y){
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
TreeBinding.newInstance=function(_c4f){
var _c50=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c4f);
var _c51=UserInterface.registerBinding(_c50,TreeBinding);
_c51.treeBodyBinding=TreeBodyBinding.newInstance(_c4f);
return _c51;
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
TreeBodyBinding.prototype.accept=function(_c52){
if(_c52 instanceof TreeNodeBinding){
this.logger.debug(_c52);
}
};
TreeBodyBinding.newInstance=function(_c53){
var _c54=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c53);
return UserInterface.registerBinding(_c54,TreeBodyBinding);
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
var _c55=TreeNodeBinding.superclass.serialize.call(this);
if(_c55){
_c55.label=this.getLabel();
_c55.image=this.getImage();
var _c56=this.getHandle();
if(_c56&&_c56!=this.key){
_c55.handle=_c56;
}
if(this.isOpen){
_c55.open=true;
}
if(this.isDisabled){
_c55.disabled=true;
}
if(this.dragType){
_c55.dragtype=this.dragType;
}
if(this.dragAccept){
_c55.dragaccept=this.dragAccept;
}
}
return _c55;
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
var _c58=UserInterface.getBinding(node);
if(_c58&&_c58.containingTreeBinding){
this.containingTreeBinding=_c58.containingTreeBinding;
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
var _c59=this.key;
var _c5a=this.getProperty("handle");
if(_c5a){
_c59=_c5a;
}
return _c59;
};
TreeNodeBinding.prototype.setHandle=function(_c5b){
this.setProperty("handle",_c5b);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c5d=this.getProperty("label");
var _c5e=this.getProperty("tooltip");
var _c5f=this.getProperty("oncommand");
var _c60=this.getProperty("onbindingfocus");
var _c61=this.getProperty("onbindingblur");
var _c62=this.getProperty("focused");
var _c63=this.getProperty("callbackid");
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
if(_c5d!=null){
this.setLabel(_c5d);
}
if(_c5e!=null){
this.setToolTip(_c5e);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c65=this.bindingWindow.WindowManager;
if(_c5f!=null){
this.oncommand=function(){
Binding.evaluate(_c5f,this);
};
}
if(_c60!=null){
this.onfocus=function(){
Binding.evaluate(_c60,this);
};
}
if(_c61!=null){
this.onblur=function(){
Binding.evaluate(_c61,this);
};
}
if(_c62==true){
this.focus();
}
if(_c63!=null){
Binding.dotnetify(this,_c63);
}
};
TreeNodeBinding.prototype.handleAction=function(_c66){
TreeNodeBinding.superclass.handleAction.call(this,_c66);
switch(_c66.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c66.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c67,_c68){
var _c69=true;
if(_c67 instanceof TreeNodeBinding){
var _c6a=false;
var _c6b=this.bindingElement;
var _c6c=this.containingTreeBinding.bindingElement;
while(!_c6a&&_c6b!=_c6c){
if(_c6b==_c67.getBindingElement()){
_c6a=true;
}else{
_c6b=_c6b.parentNode;
}
}
if(_c6a){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c69=false;
}else{
this.acceptTreeNodeBinding(_c67,_c68);
}
}else{
_c69=false;
}
return _c69;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c6d,_c6e){
var _c6f=_c6d.serializeToString();
var _c70=new BindingParser(this.bindingDocument);
var _c71=_c70.parseFromString(_c6f).getFirst();
_c6e=_c6e?_c6e:this.containingTreeBinding.getDropIndex();
var _c72=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c71,_c72.get(_c6e));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c6d.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c73=this.getProperty("image");
var _c74=this.getProperty("image-active");
var _c75=this.getProperty("image-disabled");
_c74=_c74?_c74:this.isContainer?_c73?_c73:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c73?_c73:TreeNodeBinding.DEFAULT_ITEM;
_c75=_c75?_c75:this.isContainer?_c73?_c73:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c73?_c73:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c73=_c73?_c73:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c73,imageHover:null,imageActive:_c74,imageDisabled:_c75});
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
TreeNodeBinding.prototype.setLabel=function(_c77){
this.setProperty("label",String(_c77));
if(this.isAttached){
this.labelBinding.setLabel(String(_c77));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c78){
this.setProperty("tooltip",String(_c78));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c78));
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
var _c79=this.imageProfile.getDefaultImage();
var _c7a=this.imageProfile.getActiveImage();
_c7a=_c7a?_c7a:_c79;
return this.isOpen?_c7a:_c79;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c7c=DOMEvents.getTarget(e);
var _c7d=this.labelBinding.bindingElement;
var _c7e=this.labelBinding.shadowTree.labelBody;
var _c7f=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c7c){
case _c7d:
this._onAction(e);
break;
case _c7e:
case _c7f:
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
if(_c7c.parentNode==this.bindingElement&&_c7c.__updateType==Update.TYPE_INSERT){
var _c7d=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c7c)=="treenode"){
if(_c7c==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c7c,_c7d.nextSibling);
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
switch(_c7c){
case _c7d:
case _c7e:
case _c7f:
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
var _c83=true;
if(e.type=="mousedown"){
var _c84=e.button==(e.target?0:1);
if(!_c84){
_c83=false;
}
}
if(_c83){
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
var _c86=false;
if(e!=null){
_c86=e.shiftKey;
}
this.dispatchAction(_c86?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c89=this.getDescendantBindingsByLocalName("treenode");
_c89.each(function(_c8a){
_c8a.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c8b){
var _c8c=_c8b.getAttribute("focused");
if(_c8c=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c8d){
var _c8e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c8d);
return UserInterface.registerBinding(_c8e,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c8f){
var _c90=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c8f);
return UserInterface.registerBinding(_c90,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c91){
this.bindingElement.style.left=_c91.x+"px";
this.bindingElement.style.top=_c91.y+"px";
this._geometry.x=_c91.x;
this._geometry.y=_c91.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c92){
var _c93=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c92);
return UserInterface.registerBinding(_c93,TreePositionIndicatorBinding);
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
this.addFilter(function(_c95){
var _c96=UserInterface.getBinding(_c95);
var _c97=null;
var _c97=null;
if(!_c96 instanceof TreeNodeBinding){
_c97=NodeCrawler.SKIP_NODE;
}
return _c97;
});
this.addFilter(function(_c98,list){
var _c9a=UserInterface.getBinding(_c98);
var _c9b=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c9a.isOpen){
list.add(_c9a);
}
break;
}
return _c9b;
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
DockTabsButtonBinding.newInstance=function(_c9c){
var _c9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9c);
_c9d.setAttribute("type","checkbox");
_c9d.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c9d.className="tabbutton";
return UserInterface.registerBinding(_c9d,DockTabsButtonBinding);
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
var _c9e=DockBinding.superclass.serialize.call(this);
if(_c9e){
_c9e.active=this.isActive?true:null;
_c9e.collapsed=this.isCollapsed?true:null;
}
return _c9e;
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
DockBinding.prototype.interceptDisplayChange=function(_ca0){
var _ca1=this.getSelectedTabPanelBinding();
if(_ca1){
_ca1.isVisible=_ca0;
_ca1.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca2){
var _ca3=this._getBindingForDefinition(_ca2);
var _ca4=DockTabBinding.newInstance(this.bindingDocument);
_ca4.setHandle(_ca2.handle);
_ca4.setLabel(_ca2.flowHandle?null:_ca2.label);
_ca4.setImage(_ca2.image);
_ca4.setToolTip(_ca2.toolTip);
_ca4.setEntityToken(_ca2.entityToken);
_ca4.setAssociatedView(_ca3);
this.appendTabByBindings(_ca4,null);
this._setupPageBindingListeners(_ca4);
var _ca5=this.getTabPanelBinding(_ca4);
_ca3.snapToBinding(_ca5);
var _ca6=this.bindingWindow.bindingMap.views;
_ca6.add(_ca3);
if(!this.isActive){
this.activate();
}
_ca3.attach();
};
DockBinding.prototype.prepareOpenView=function(_ca7,_ca8){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_ca8.setLabel(_ca7.label);
_ca8.setImage(_ca7.image);
_ca8.setToolTip(_ca7.toolTip);
this._setupPageBindingListeners(_ca8);
var _ca9=this.getTabPanelBinding(_ca8);
var _caa=this._getBindingForDefinition(_ca7);
_ca8.setAssociatedView(_caa);
_caa.snapToBinding(_ca9);
UserInterface.getBinding(this.bindingDocument.body).add(_caa);
_caa.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cab){
var _cac=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cac.bindingDocument);
view.setDefinition(_cab);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cae){
var _caf=this.getTabPanelBinding(_cae);
var self=this;
var _cb1={handleAction:function(_cb2){
var _cb3=_cb2.target;
switch(_cb2.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cb3.reflex(true);
var view=_cae.getAssociatedView();
if(_cb3.bindingWindow==view.getContentWindow()){
_cae.updateDisplay(_cb3);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cae.onPageInitialize(_cb3);
_cb2.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cae.getAssociatedView();
if(_cb3.bindingWindow==view.getContentWindow()){
_cae.updateDisplay(_cb3);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cae.updateDisplay(_cb3);
_cb2.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cae.updateEntityToken(_cb3);
_cb2.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cae.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cae.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cae);
_cb2.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cae,true);
_cb2.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cae);
break;
case Binding.ACTION_FORCE_REFLEX:
_caf.reflex(true);
_cb2.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cae.isDirty){
_cae.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb5){
_caf.addActionListener(_cb5,_cb1);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb6){
DockBinding.superclass.handleAction.call(this,_cb6);
var _cb7=_cb6.target;
switch(_cb6.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb6.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cb7 instanceof DockBinding){
if(_cb7.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cb7);
if(this.isActive){
_cb7.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cb7);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cb8,arg){
DockBinding.superclass.handleBroadcast.call(this,_cb8,arg);
switch(_cb8){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cba=arg;
if(_cba.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cba.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cbb){
var tabs=this.getTabBindings();
var _cbd=false;
while(tabs.hasNext()&&!_cbd){
var tab=tabs.getNext();
var _cbf=tab.getEntityToken();
if(_cbf!=null&&_cbf==_cbb){
if(!tab.isSelected){
this.select(tab,true);
_cbd=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc0){
this._handleCollapse(true,_cc0);
};
DockBinding.prototype.unCollapse=function(_cc1){
this._handleCollapse(false,_cc1);
};
DockBinding.prototype._handleCollapse=function(_cc2,_cc3){
var _cc4=this.getChildBindingByLocalName("dockpanels");
var _cc5=this.getAncestorBindingByLocalName("splitbox");
if(_cc2){
_cc4.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cc3&&_cc5.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cc4.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cc3){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc2);
this.isCollapsed=_cc2;
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
DockBinding.prototype.closeTab=function(_cca,_ccb){
if(_cca.isDirty&&!_ccb){
var _ccc=Resolver.resolve(_cca.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ccc),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cce){
switch(_cce){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cca);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cca);
break;
}
}});
}else{
this.removeTab(_cca);
}
};
DockBinding.prototype.closeTabsExcept=function(_ccf){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ccf){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd2){
var _cd3=_cd2.getAssociatedView();
_cd3.saveContainedEditor();
var self=this;
var _cd5={handleBroadcast:function(_cd6,arg){
switch(_cd6){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cd3.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cd5);
if(arg.isSuccess){
self.removeTab(_cd2);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cd5);
};
DockBinding.prototype.appendTabByBindings=function(_cd8,_cd9){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cd8,_cd9);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cda){
_cda=_cda?_cda+"px":"100%";
this.bindingElement.style.width=_cda;
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
var _cdb=null;
var _cdc=this.getTabBindings();
var _cdd=_cdc.getLength();
if(_cdd==1){
_cdb=null;
}else{
_cdb=_cdc.get(0);
}
return _cdb;
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
var _cdf=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cdf)){
_cdf=_cdf>0?_cdf-1:0;
self.bindingElement.style.width=new String(_cdf)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce0){
DockTabsBinding.superclass.handleCrawler.call(this,_ce0);
switch(_ce0.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_ce3){
var _ce4=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce3);
return UserInterface.registerBinding(_ce4,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce5){
this._viewBinding=_ce5;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce6=DockTabBinding.superclass.serialize.call(this);
if(_ce6){
_ce6.label=null;
_ce6.image=null;
_ce6.handle=this.getHandle();
}
return _ce6;
};
DockTabBinding.prototype.setHandle=function(_ce7){
this.setProperty("handle",_ce7);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce8){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce8;
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
var _ce9=DialogControlBinding.newInstance(this.bindingDocument);
_ce9.setControlType(ControlBinding.TYPE_CLOSE);
_ce9.attachClassName("closecontrol");
this._controlGroupBinding.add(_ce9);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_cea){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cea){
this.isDirty=_cea;
if(Binding.exists(this.labelBinding)){
var _ceb=this.labelBinding.getLabel();
if(_ceb!=null){
this.labelBinding.setLabel(_cea?"*"+_ceb:_ceb.slice(1,_ceb.length));
}else{
this.labelBinding.setLabel(_cea?"*":"");
}
}
}
var _cec=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cec.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cec.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_ced){
this.setLabel(_ced.getLabel());
this.setImage(_ced.getImage());
this.setToolTip(_ced.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cee){
this.setEntityToken(_cee.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cef){
DockTabBinding.superclass.handleAction.call(this,_cef);
var _cf0=_cef.target;
switch(_cef.type){
case ControlBinding.ACTION_COMMAND:
if(_cf0.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cef.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf0);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf1){
var cmd=_cf1.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cf3){
if(!_cf3){
if(!this.getLabel()){
_cf3=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf3=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cf3=this.isDirty?"*"+_cf3:_cf3;
DockTabBinding.superclass.setLabel.call(this,_cf3);
};
DockTabBinding.prototype.setImage=function(_cf4){
if(!_cf4){
if(!this.getImage()){
_cf4=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cf4=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cf4);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cf7=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cf7;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cf7;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cf7;
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
var _cf9=this.bindingElement;
setTimeout(function(){
_cf9.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cfa,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cfa,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cfa){
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
DockTabBinding.prototype.select=function(_cff){
DockTabBinding.superclass.select.call(this,_cff);
this._updateBroadcasters();
if(_cff!=true){
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
var _d00=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d01=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d01.enable();
if(this.isDirty){
_d00.enable();
}else{
_d00.disable();
}
}else{
_d01.disable();
_d00.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d02){
if(this._canUpdateTree||_d02){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d03=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d05=win.bindingMap.savebutton;
if(_d05!=null){
_d03=true;
}
}
}
return _d03;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d06){
var _d07=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d06);
return UserInterface.registerBinding(_d07,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d08){
var _d09=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d08);
return UserInterface.registerBinding(_d09,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d0a){
DockPanelBinding.superclass.select.call(this,_d0a);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d0b){
DockPanelBinding.superclass.handleCrawler.call(this,_d0b);
if(_d0b.response==null){
if(_d0b.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d0b.id==FocusCrawler.ID){
_d0b.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d0c){
var _d0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d0c);
return UserInterface.registerBinding(_d0d,DockPanelBinding);
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
ViewBinding.getInstance=function(_d0e){
var _d0f=ViewBinding._instances.get(_d0e);
if(!_d0f){
var cry="ViewBinding.getInstance: No such instance: "+_d0e;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d0f;
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
var _d12=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d12){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d13=snap.boxObject.getGlobalPosition();
var _d14=snap.boxObject.getDimension();
if(!Point.isEqual(_d13,this._lastknownposition)){
this.setPosition(_d13);
this._lastknownposition=_d13;
}
if(!Dimension.isEqual(_d14,this._lastknowndimension)){
this.setDimension(_d14);
this._lastknowndimension=_d14;
var _d15=_d14.h-ViewBinding.VERTICAL_ADJUST;
_d15=_d15<0?0:_d15;
this.windowBinding.getBindingElement().style.height=new String(_d15)+"px";
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
var _d16=this._viewDefinition.flowHandle;
if(_d16!=null){
FlowControllerService.CancelFlow(_d16);
}
}
if(this._viewDefinition!=null){
var _d17=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d17);
this.logger.fine("ViewBinding closed: \""+_d17+"\"");
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
var _d19=null;
if(this._viewDefinition!=null){
_d19=this._viewDefinition.handle;
}
return _d19;
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
ViewBinding.prototype.setDefinition=function(_d1a){
this._viewDefinition=_d1a;
if(_d1a.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d1b){
ViewBinding.superclass.handleAction.call(this,_d1b);
var _d1c=_d1b.target;
switch(_d1b.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d1b.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d1c.isActivated){
_d1c.onActivate();
}
}
_d1b.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d1c==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d1b.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d1c==this._snapBinding){
if(_d1c.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d1c.getContentWindow().isPostBackDocument){
if(_d1b.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d1c.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d1c==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d1c.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d1b.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d1b.type==WindowBinding.ACTION_ONLOAD){
var win=_d1c.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d1c);
}
}
}
_d1b.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d1c.label&&this._viewDefinition.label){
_d1c.label=this._viewDefinition.label;
}
if(!_d1c.image&&this._viewDefinition.image){
_d1c.image=this._viewDefinition.image;
}
if(_d1c.bindingWindow==this.getContentWindow()){
this._pageBinding=_d1c;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d1c.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d1c==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d1b.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d1b.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d21,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d21,arg);
switch(_d21){
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
var _d25=def.argument;
if(_d25!=null){
page.setPageArgument(_d25);
}
var _d26=def.width;
if(_d26!=null){
page.width=_d26;
}
var _d27=def.height;
if(_d27!=null){
page.height=_d27;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d28){
ViewBinding.superclass.handleCrawler.call(this,_d28);
switch(_d28.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d28.id==FocusCrawler.ID){
if(_d28.previousNode!=this._snapBinding.bindingElement){
_d28.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d28.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d29){
_d29.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d29.x+"px";
this.bindingElement.style.top=_d29.y+"px";
};
ViewBinding.prototype.setDimension=function(_d2a){
_d2a.h-=ViewBinding.VERTICAL_ADJUST;
_d2a.w-=ViewBinding.HORIZONTAL_ADJUST;
_d2a.w-=1;
if(_d2a.h<0){
_d2a.h=0;
}
if(_d2a.w<0){
_d2a.w=0;
}
this.bindingElement.style.width=String(_d2a.w)+"px";
this.bindingElement.style.height=String(_d2a.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d2b){
this.isFlexBoxBehavior=false;
_d2b.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d2b.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d2b.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d2b;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d2c=null;
if(this.isFreeFloating==true){
_d2c=this._snapBinding.getBindingElement();
}else{
_d2c=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d2c;
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
ViewBinding.prototype.reload=function(_d2d){
this._isLoaded=false;
this.windowBinding.reload(_d2d);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d2e=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d2e=true;
}
}
if(!_d2e){
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
ViewBinding.newInstance=function(_d32){
var _d33=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d32);
var _d34=UserInterface.registerBinding(_d33,ViewBinding);
_d34.windowBinding=_d34.add(WindowBinding.newInstance(_d32));
return _d34;
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
var _d3c=this.bindingWindow.__doPostBack;
var _d3d=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d3d){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d3e,_d3f){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d3d=true;
}
self.manifestAllDataBindings();
_d3c(_d3e,_d3f);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d40,list){
var _d42=this.bindingWindow.bindingMap.__REQUEST;
if(_d42!=null&&this._isDotNet()){
switch(_d40){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d42.postback(_d40);
}
}
break;
default:
_d42.postback(_d40);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d40,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d43,list){
var _d45=this.getDescendantBindingsByType(WindowBinding);
_d45.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d43,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d49){
if(_d49.name==null||_d49.name==""){
return;
}
list.add({name:_d49.name,value:_d49.value});
});
var out="";
list.each(function(_d4b){
out+=_d4b.name+": "+_d4b.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d4c){
PageBinding.superclass.handleAction.call(this,_d4c);
var _d4d=_d4c.target;
switch(_d4c.type){
case RootBinding.ACTION_PHASE_3:
if(_d4d==UserInterface.getBinding(this.bindingDocument.body)){
_d4d.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d4d);
}
_d4c.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d4e=this.validateAllDataBindings();
if(_d4e){
this.doPostBack(_d4d);
}
}
_d4c.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d4c.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d4d.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d4d.key)){
this._initBlockers.del(_d4d.key);
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
var _d50={handleAction:function(_d51){
if(_d51.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d50);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d50);
}else{
MessageQueue.udpdate();
}
_d4c.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d52,arg){
PageBinding.superclass.handleBroadcast.call(this,_d52,arg);
switch(_d52){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d54=arg;
if(!this._canPostBack&&!_d54){
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
PageBinding.prototype.doPostBack=function(_d56){
if(this._canPostBack){
if(_d56!=null&&this._isDotNet()){
var _d57=_d56.getCallBackID();
var _d58=_d56.getCallBackArg();
if(_d57!=null){
_d57=_d57.replace(/_/g,"$");
}else{
_d57="";
}
if(_d58==null){
_d58="";
}
this.bindingWindow.__doPostBack(_d57,_d58);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d59){
var _d5a=true;
var _d5b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5b.hasNext()&&_d5a){
var _d5c=_d5b.getNext();
if(_d5c.isAttached){
var _d5d=_d5c.validate();
if(_d5a&&!_d5d){
_d5a=false;
this.logger.debug("Invalid DataBinding: "+_d5c.toString()+" ("+_d5c.getName()+")");
if(_d59){
var _d5e=_d5c.getAncestorBindingByType(TabPanelBinding);
if(_d5e!=null&&!_d5e.isVisible){
var _d5f=_d5e.getAncestorBindingByType(TabBoxBinding);
var _d60=_d5f.getTabBinding(_d5e);
_d5f.select(_d60);
}
}
break;
}
}
}
return _d5a;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d62=this.bindingWindow.DataManager.getAllDataBindings();
while(_d62.hasNext()){
var _d63=_d62.getNext();
if(_d63.isAttached){
var _d64=_d63.manifest();
if(_d64!=null){
list.add(_d64);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d65=this.bindingWindow.DataManager.getAllDataBindings();
while(_d65.hasNext()){
var _d66=_d65.getNext();
if(_d66.isAttached){
_d66.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d67="";
if(!_d67&&this.labelfield){
var _d68=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d68!=null&&_d68.getLabel){
_d67=_d68.getLabel();
}else{
if(_d68!=null&&_d68.getValue){
_d67=_d68.getValue();
}
}
}
if(!_d67&&this.label){
_d67=this.label;
}
return _d67;
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
var _d6b=this._cachedFocus.getBinding();
if(_d6b){
_d6b.blur();
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
var _d6c=this.getProperty("width");
if(!_d6c){
_d6c=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d6c;
}
if(this.height==null){
var _d6d=this.getProperty("height");
this.height=_d6d?_d6d:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d6e=this.getProperty("minheight");
if(_d6e!=null){
this.minheight=_d6e;
}
}
if(this.controls==null){
var _d6f=this.getProperty("controls");
this.controls=_d6f?_d6f:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d70=this.getProperty("resizable");
this.isResizable=_d70?_d70:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d71=this.getProperty("image");
var _d72=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d71&&_d72){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d71);
_d72.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d74){
if(_d74!=this.isAutoHeightLayoutMode){
if(_d74){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d74;
}
};
DialogPageBinding.prototype.handleAction=function(_d75){
DialogPageBinding.superclass.handleAction.call(this,_d75);
var _d76=_d75.target;
switch(_d75.type){
case PageBinding.ACTION_ATTACHED:
if(_d76!=this&&_d76.isFitAsDialogSubPage){
_d76.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d75.consume();
if(_d76.response!=null){
this.response=_d76.response;
switch(_d76.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d77){
var _d78=this.bindingWindow.bindingMap.buttonAccept;
if(_d78!=null){
_d78.setDisabled(_d77);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d79){
var _d7a=CSSComputer.getPadding(this.bindingElement);
var _d7b=CSSComputer.getBorder(this.bindingElement);
_d79+=_d7a.top+_d7a.bottom;
_d79+=_d7b.top+_d7b.bottom;
if(_d79>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d79+"px";
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
EditorPageBinding.prototype.handleAction=function(_d83){
EditorPageBinding.superclass.handleAction.call(this,_d83);
var _d84=_d83.target;
switch(_d83.type){
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
var _d85=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d84.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d85==-1){
_d85=0;
}
}else{
_d85++;
}
return res;
});
if(_d85>-1){
this._messengers.del(_d85);
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
_d83.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d84.key,_d84);
if(_d84 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d84.key);
if(_d84 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d84==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d84.getSelectedTabBinding();
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
_d83.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d84==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d83.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d84==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d83.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d84==this._windowBinding){
if(_d84.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d8a=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d8a);
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
var _d8b=this.bindingWindow.bindingMap.savebutton;
if(_d8b!=null&&!_d8b.isDisabled){
_d8b.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8c=this.bindingWindow.bindingMap.__REQUEST;
if(_d8c!=null){
_d8c.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8d=this.bindingWindow.bindingMap.__REQUEST;
if(_d8d!=null){
_d8d.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d8e){
this._message=null;
switch(_d8e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d8e,this._messengers);
if(!this._messengers.hasEntries()){
if(_d8e==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d8e;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d8e;
EditorPageBinding.superclass.postMessage.call(this,_d8e,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d8e,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d8f,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d8f,arg);
switch(_d8f){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d91=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d91);
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
var _d92=new List();
this._invalidBindings.each(function(key,_d94){
var list=_d94.getInvalidLabels();
if(list){
list.each(function(_d96){
_d92.add(_d96);
});
}
});
if(_d92.hasEntries()){
var _d97="";
while(_d92.hasNext()){
_d97+=_d92.getNext().toLowerCase();
if(_d92.hasNext()){
_d97+=", ";
}else{
_d97+=".";
}
}
var _d98=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d98+" "+_d97);
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
EditorPageBinding.prototype.enableSave=function(_d99){
var _d9a=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d9a){
var _d9b=UserInterface.getBinding(_d9a);
if(_d99){
_d9b.enable();
}else{
_d9b.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d9c=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d9c!=null){
UserInterface.getBinding(_d9c).enable();
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
var _d9d=this._windowBinding.getContentDocument().title;
if(_d9d==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d9e=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da0){
if(_da0.name=="__EVENTTARGET"&&_d9e){
_da0.value=_d9e;
}
list.add({name:_da0.name,value:_da0.value});
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
var _da2=this.getProperty("responseid");
this.responseid=_da2;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_da3){
ResponsePageBinding.superclass.handleAction.call(this,_da3);
switch(_da3.type){
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
WizardPageBinding.prototype.handleAction=function(_da4){
WizardPageBinding.superclass.handleAction.call(this,_da4);
var _da5=_da4.target;
switch(_da4.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_da5);
}else{
_da4.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_da5);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_da4.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_da4.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_da6){
var next=this.bindingWindow.bindingMap.nextbutton;
var _da8=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_da6);
}
if(_da8){
_da8.setDisabled(!_da6);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_da9,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_da9,arg);
var self=this;
switch(_da9){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dad){
};
MarkupAwarePageBinding.prototype._activate=function(_dae){
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
var _daf=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_daf.boxObject.getDimension().w;
_daf.hide();
var _db0=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db0+"px";
var self=this;
var _db2=this.bindingWindow.bindingMap.moreactionsbutton;
_db2.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db3){
self._showMoreActions();
_db3.consume();
}});
var _db4=this.bindingWindow.bindingMap.moreactionspopup;
_db4.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_db5){
var item=_db5.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_db7,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_db7,arg);
switch(_db7){
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
var _dbb=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dbb!=null){
_dbb.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dbc=this.bindingWindow.WindowManager;
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
var _dbd=new String("");
this._actionProfile.each(function(_dbe,list){
list.each(function(_dc0){
_dbd+=_dc0.getHandle()+";"+_dc0.getKey()+";";
if(_dc0.isDisabled()){
_dbd+="isDisabled='true';";
}
});
});
return _dbd;
};
SystemToolBarBinding.prototype.handleAction=function(_dc1){
SystemToolBarBinding.superclass.handleAction.call(this,_dc1);
switch(_dc1.type){
case ButtonBinding.ACTION_COMMAND:
var _dc2=_dc1.target;
this._handleSystemAction(_dc2.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc3){
if(_dc3!=null){
SystemAction.invoke(_dc3,this._node);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dc6,list){
var _dc8=new List();
list.reset();
while(list.hasNext()){
var _dc9=list.getNext();
var _dca=null;
if(_dc9.isInToolBar()){
if(_dc9.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dca=self.getToolBarButtonBinding(_dc9);
}
}
if(_dca!=null){
_dc8.add(_dca);
}
}
if(_dc8.hasEntries()){
var _dcb=ToolBarGroupBinding.newInstance(doc);
_dc8.each(function(_dcc){
_dcb.add(_dcc);
});
self.addLeft(_dcb);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dcd=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dce=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_dce=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _dcf=0;
var _dd0=new List();
var _dd1,_dd2=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd1=_dd2.getNext())!=null){
if(!_dd1.isVisible){
_dd1.show();
}
_dcf+=_dd1.boxObject.getDimension().w;
if(_dcf>=_dce){
_dd0.add(_dd1);
_dd1.hide();
}
}
if(_dd0.hasEntries()){
var _dd3=_dd0.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dd3).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd1=_dd0.getNext())!=null){
this._moreActions.add(_dd1.associatedSystemAction);
}
_dcd.show();
}else{
this._moreActions=null;
_dcd.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dd4=this.bindingWindow.bindingMap.moreactionspopup;
_dd4.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dd4.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dd4.add(item);
}
_dd4.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dd6){
var _dd7=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dd8=_dd6.getLabel();
var _dd9=_dd6.getToolTip();
var _dda=_dd6.getImage();
var _ddb=_dd6.isDisabled();
if(_dda){
_dd7.setImage(_dda);
}
if(_dd8){
_dd7.setLabel(_dd8);
}
if(_dd9){
_dd7.setToolTip(_dd9);
}
if(_dd6.isDisabled()){
_dd7.disable();
}
_dd7.associatedSystemAction=_dd6;
return _dd7;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _ddc=this.getDescendantBindingByLocalName("toolbarbutton");
if(_ddc!=null){
_ddc.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_ddd){
var _dde=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ddd);
return UserInterface.registerBinding(_dde,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_ddf){
this.bindingElement.style.left=_ddf.x+"px";
this.bindingElement.style.top=_ddf.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_de0){
_de0.h-=ViewBinding.VERTICAL_ADJUST;
_de0.w-=ViewBinding.HORIZONTAL_ADJUST;
_de0.w-=1;
if(_de0.h<0){
_de0.h=0;
}
if(_de0.w<0){
_de0.w=0;
}
this.bindingElement.style.width=String(_de0.w)+"px";
this.bindingElement.style.height=String(_de0.h)+"px";
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
SystemTreeBinding.prototype.add=function(_de1){
var _de2=SystemTreeBinding.superclass.add.call(this,_de1);
if(!this._defaultTreeNode){
if(_de1 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de1;
}
}
return _de2;
};
SystemTreeBinding.prototype.handleAction=function(_de3){
SystemTreeBinding.superclass.handleAction.call(this,_de3);
var _de4=_de3.target;
switch(_de3.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_de4.key);
this._updateFocusedNode();
_de3.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de3.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_de4.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de3.consume();
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
var _de6=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_de6);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_de7){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_de7);
var reg=this._entityTokenRegistry;
var _de9=_de7.node.getEntityToken();
if(reg.has(_de9)){
reg.get(_de9).add(_de7);
}else{
reg.set(_de9,new List([_de7]));
}
var _dea=null;
if(this.isLockedToEditor){
if(_de9==StageBinding.entityToken){
if(_de7.node.isTreeLockEnabled()){
_dea=_de7;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_de7.node.getHandle()){
_dea=_de7;
}
}
}
if(_dea!=null){
this.focusSingleTreeNodeBinding(_dea);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_deb){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_deb);
var reg=this._entityTokenRegistry;
var _ded=_deb.node.getEntityToken();
if(reg.has(_ded)){
var list=reg.get(_ded);
list.del(_deb);
if(!list.hasEntries()){
reg.del(_ded);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_deb.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_deb.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df1=this._refreshingTreeNodes;
if(_df1.hasEntries()&&_df1.has(key)){
_df1.del(key);
if(!_df1.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df2=StageBinding.entityToken;
if(_df2!=null){
this._focusTreeNodeByEntityToken(_df2);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df3=false;
var _df4=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df3=false;
}else{
if(_df4.hasEntries()){
_df3=true;
while(_df3&&_df4.hasNext()){
var _df5=_df4.getNext();
if(!_df5.isDraggable){
_df3=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df3;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_df6,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_df6,arg);
switch(_df6){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_df6,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_df6);
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
var self=this,_dfa=arg;
setTimeout(function(){
if(_dfa!=null){
self._focusTreeNodeByEntityToken(_dfa);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _dfc=tab.perspectiveNode==null;
if(!_dfc){
_dfc=tab.perspectiveNode==this.perspectiveNode;
}
if(_dfc){
var self=this,_dfe=tab.getEntityToken();
setTimeout(function(){
if(_dfe!=null){
self._focusTreeNodeByEntityToken(_dfe);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_dff,_e00){
this.isLockFeatureFocus=true;
var _e01=null;
if(this._entityTokenRegistry.has(_dff)){
var list=this._entityTokenRegistry.get(_dff);
list.each(function(tn){
var _e04=true;
if(tn.node.isTreeLockEnabled()){
_e01=tn;
_e04=false;
}
return _e04;
});
if(_e01!=null){
if(!_e01.isFocused){
this.focusSingleTreeNodeBinding(_e01,true);
}else{
_e01.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e01==null&&_e00!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_dff);
self._focusTreeNodeByEntityToken(_dff,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e06){
var _e07=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e08=this.getRootTreeNodeBindings();
while(_e08.hasNext()){
var _e09=_e08.getNext();
_e07.add(_e09.node.getEntityToken());
}
}else{
_e07.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e07.hasNext()){
var _e0a=_e07.getNext();
var _e0b=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e0a,_e06,_e0b);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e0e=this._treeNodeBindings;
var _e0f=new Map();
function fix(_e10,list){
if(!_e10.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e0e.has(node.getHandle())){
var _e13=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e0f.set(node.getHandle(),_e13);
_e10.add(_e13);
}
});
_e10.attachRecursive();
}
}
_e10.open(true);
}
map.each(function(_e14,list){
if(_e0e.has(_e14)){
var _e16=_e0e.get(_e14);
fix(_e16,list);
}else{
if(_e0f.has(_e14)){
var _e17=_e0f.get(_e14);
fix(_e17,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e18,arg){
switch(_e18){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e1a=arg;
if(_e1a!=null){
this._invokeServerRefresh(_e1a);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e1b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e1b;
_e1b.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e1b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e1b;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e1c){
if(_e1c!=null&&_e1c=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e1c)){
var list=this._entityTokenRegistry.get(_e1c).reset();
this._refreshToken=_e1c;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e1e=list.getNext();
this._refreshingTreeNodes.set(_e1e.key,true);
setTimeout(function(){
_e1e.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e1f=this.getFocusedTreeNodeBindings().getFirst();
if(_e1f){
var _e20=_e1f.getLabel();
var _e21=_e1f.getAncestorBindingByLocalName("treenode");
if(_e21){
_e1f=_e21;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e1f.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e22=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e22,[_e20]);
}
_e1f.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e23=SystemTreeBinding.clipboard;
if(_e23){
var type=_e23.dragType;
var _e25=this.getFocusedTreeNodeBindings().getFirst();
if(_e25.dragAccept){
if(_e25.acceptor.isAccepting(type)){
this._performPaste(_e25);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e26){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e26.node.hasDetailedDropSupport()){
if(_e26.node.hasChildren()){
var _e28=_e26.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e29,_e2a){
if(_e29==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e2b=_e2a.get("switch");
var _e2c=_e2a.get("sibling");
if(_e2b=="after"){
_e2c++;
}
var _e2d=_e26.accept(SystemTreeBinding.clipboard,_e2c);
if(_e2d){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e28);
}else{
Application.lock(self);
var _e2e=_e26.accept(SystemTreeBinding.clipboard,0);
if(_e2e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e2e=_e26.accept(SystemTreeBinding.clipboard,0);
if(_e2e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e2f=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e2f!=null){
this._focusTreeNodeByEntityToken(_e2f);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e30){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e30){
this.blurSelectedTreeNodes();
var _e31=this.getRootTreeNodeBindings();
_e31.each(function(_e32){
if(_e32.isContainer&&_e32.isOpen){
_e32.close();
_e32.hasBeenOpened=false;
_e32.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e33){
if(_e33!=this.isLockedToEditor){
this.isLockedToEditor=_e33;
if(_e33){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e35=this.getRootTreeNodeBindings();
_e35.each(function(_e36){
var _e37=_e36.getOpenSystemNodes();
if(_e37!=null&&_e37.hasEntries()){
list.merge(_e37);
}else{
if(_e36.isOpen){
list.add(_e36.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e38){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e38);
if(_e38!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e39){
if(_e39){
var list=new List(_e39.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e3b=new Map();
var _e3c=this.getFocusedTreeNodeBindings().getFirst();
var _e3d=_e3c.node.getActionProfile();
if(_e3d!=null){
var self=this;
_e3d.each(function(_e3f,list){
var _e41=new List();
list.each(function(_e42){
if(_e42.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e42.getGroupName()]){
_e41.add(_e42);
}
}
});
if(_e41.hasEntries()){
_e3b.set(_e3f,_e41);
}
});
}
_e3b.activePosition=this._activePosition;
var _e43=_e3c.node.getPropertyBag();
if(_e43&&_e43.Uri&&_e43.ElementType==="application/x-composite-page"){
_e3b.Uri=_e43.Uri;
}
_e3b.EnitityToken=_e3c.node.getEntityToken();
_e3b.Node=_e3c.node;
return _e3b;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e44,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e44,arg);
switch(_e44){
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
var _e49=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e49.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e4a=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e4a.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e4b){
SystemTreePopupBinding.superclass.handleAction.call(this,_e4b);
switch(_e4b.type){
case MenuItemBinding.ACTION_COMMAND:
var _e4c=_e4b.target;
var _e4d=_e4c.associatedSystemAction;
if(_e4d){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e4f=list.getFirst();
var _e50=_e4f.node;
}
SystemAction.invoke(_e4d,_e50);
}else{
var cmd=_e4c.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e53=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e53=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e53=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e53=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e53=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e53){
setTimeout(function(){
EventBroadcaster.broadcast(_e53);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e54=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e54.hasNext()){
var _e55=UserInterface.getBinding(_e54.getNext());
if(!_e55.getProperty("rel")){
_e55.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e57=new List();
var self=this;
this._actionProfile.each(function(_e59,list){
var _e5b=MenuGroupBinding.newInstance(doc);
list.each(function(_e5c){
var _e5d=self.getMenuItemBinding(_e5c);
_e5b.add(_e5d);
});
_e57.add(_e5b);
});
_e57.reverse();
while(_e57.hasNext()){
this._bodyBinding.addFirst(_e57.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e5e){
var _e5f=MenuItemBinding.newInstance(this.bindingDocument);
var _e60=_e5e.getLabel();
var _e61=_e5e.getToolTip();
var _e62=_e5e.getImage();
var _e63=_e5e.getDisabledImage();
var _e64=_e5e.isCheckBox();
if(_e60){
_e5f.setLabel(_e60);
}
if(_e61){
_e5f.setToolTip(_e61);
}
if(_e62){
_e5f.imageProfile=new ImageProfile({image:_e62,imageDisabled:_e63});
}
if(_e64){
_e5f.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e5e.isChecked()){
_e5f.check(true);
}
}
if(_e5e.isDisabled()){
_e5f.disable();
}
_e5f.associatedSystemAction=_e5e;
return _e5f;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e68=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e68=UserInterface.getBinding(node);
if(_e68.isDisabled){
_e68=null;
}
}
break;
}
if(_e68!=null&&_e68.node!=null&&_e68.node.getActionProfile()!=null){
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
var _e69=this.node.getLabel();
if(_e69){
this.setLabel(_e69);
}
var _e6a=this.node.getToolTip();
if(_e6a){
this.setToolTip(_e6a);
}
var _e6b=this.node.getHandle();
if(_e6b){
this.setHandle(_e6b);
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
var _e6e="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e6e+=list.getNext();
if(list.hasNext()){
_e6e+=" ";
}
}
this.setProperty("dragaccept",_e6e);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e70){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e70);
switch(_e70.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e70.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e70.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e71,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e71,arg);
switch(_e71){
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
var _e74=null;
var _e75=this.node.getImageProfile();
if(_e75){
if(this.isOpen){
_e74=_e75.getActiveImage();
}else{
_e74=_e75.getDefaultImage();
}
}
if(!_e74){
_e74=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e74;
};
SystemTreeNodeBinding.prototype.open=function(_e76){
var _e77=this.isContainer&&!this.isOpen;
var _e78=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e77&&(_e78||SystemTreeBinding.HAS_NO_MEMORY)&&_e76!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e79=null;
if(this.isContainer){
_e79=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e79);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e7b){
if(_e7b!=null){
this._refreshBranch(_e7b);
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
var _e7c=new List();
var _e7d=this.node.getChildren();
this.empty();
if(_e7d.hasEntries()){
this._insertTreeNodesRegulated(_e7d);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e7e){
var _e7f=0;
var _e80=new List([]);
while(_e7e.hasEntries()&&_e7f<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e81=SystemTreeNodeBinding.newInstance(_e7e.extractFirst(),this.bindingDocument);
_e81.autoExpand=this.autoExpand;
this.add(_e81);
_e81.attach();
_e7f++;
if(this.autoExpand){
if(_e7f==1&&!_e7e.hasEntries()||LocalStore.openedNodes.has(_e81.node)){
_e80.add(_e81);
}
}
}
if(_e7e.hasEntries()){
this._insertBufferTreeNode(_e7e);
}
_e80.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e84){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e86=this.node.getDescendantBranch(list);
if(_e86.hasEntries()){
this.XXX(_e86);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e87){
var self=this;
var map=new Map();
this.empty();
_e87.each(function(key,_e8b){
if(_e8b.hasEntries()){
_e8b.each(function(node){
var _e8d=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e8d);
if(map.has(key)){
var _e8e=map.get(key);
_e8e.add(_e8d);
_e8e.isOpen=true;
_e8e.hasBeenOpened=true;
node.searchToken=_e8e.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e8d);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e87.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e8f=new TreeCrawler();
var _e90=new List();
_e8f.mode=TreeCrawler.MODE_GETOPEN;
_e8f.crawl(this.bindingElement,_e90);
if(_e90.hasEntries()){
_e90.extractFirst();
}
_e8f.dispose();
return _e90;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e91=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e91=new List([this.node]);
list.each(function(_e93){
_e91.add(_e93.node);
});
}
return _e91;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e94,_e95){
var _e96=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e94 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e94.node.getData(),this.node.getData(),_e95?_e95:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e96);
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
SystemTreeNodeBinding.newInstance=function(node,_e9a){
var _e9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e9a);
var _e9c=UserInterface.registerBinding(_e9b,SystemTreeNodeBinding);
_e9c.node=node;
return _e9c;
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
SystemPageBinding.prototype.setPageArgument=function(_e9d){
this.node=_e9d;
SystemPageBinding.superclass.setPageArgument.call(this,_e9d);
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
var _e9e=this.node.getChildren();
if(_e9e.hasEntries()){
while(_e9e.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e9e.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea0=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea0.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ea2=new TreeCrawler();
var _ea3=new List();
_ea2.mode=TreeCrawler.MODE_GETOPEN;
_ea2.crawl(this.bindingElement,_ea3);
_ea2.dispose();
var list=new List([this.node]);
_ea3.each(function(_ea5){
list.add(_ea5.node);
});
this._tree.empty();
var _ea6=this.node.getDescendantBranch(list);
if(_ea6.hasEntries()){
var self=this;
var map=new Map();
_ea6.each(function(key,_eaa){
_eaa.each(function(node){
var _eac=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eac);
if(map.has(key)){
var _ead=map.get(key);
_ead.add(_eac);
_ead.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eac);
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
SystemPageBinding.prototype.handleAction=function(_eae){
SystemPageBinding.superclass.handleAction.call(this,_eae);
switch(_eae.type){
case ButtonBinding.ACTION_COMMAND:
var _eaf=_eae.target;
switch(_eaf.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eaf.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb0,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb0,arg);
switch(_eb0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eb2=arg;
if(this.node&&this.node.getEntityToken()==_eb2){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eb2);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eb2);
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
StageContainerBinding.prototype.handleBroadcast=function(_eb4,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eb4,arg);
var _eb6=this.bindingWindow.WindowManager;
switch(_eb4){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eb6.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eb6.WINDOW_RESIZED_BROADCAST:
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
var _eb8=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eb8.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_eb9){
if(StageBinding.isViewOpen(_eb9)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eb9);
}else{
var _eba=ViewDefinitions[_eb9];
StageBinding.presentViewDefinition(_eba);
}
};
StageBinding.isViewOpen=function(_ebb){
return StageBinding.bindingInstance._activeViewDefinitions[_ebb]!=null;
};
StageBinding.selectPerspective=function(_ebc){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ebc);
};
StageBinding.presentViewDefinition=function(_ebd){
if(_ebd.label!=null){
var _ebe=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ebe,[_ebd.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ebd);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ec0,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec2=System.getPerspectiveNodes();
if(_ec2.hasEntries()){
this._initializeSystemViewDefinitions(_ec2);
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
var _ec4=null;
if(LocalStore.isEnabled){
_ec4=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ec4&&ViewDefinitions[_ec4]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ec4));
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
var _ec6=root.getActionProfile();
if(_ec6&&_ec6.hasEntries()){
var _ec7=top.app.bindingMap.toolsmenugroup;
if(_ec7){
_ec6.each(function(_ec8,list){
list.each(function(_eca){
var item=MenuItemBinding.newInstance(_ec7.bindingDocument);
item.setLabel(_eca.getLabel());
item.setToolTip(_eca.getToolTip());
item.setImage(_eca.getImage());
item.setDisabled(_eca.isDisabled());
item.associatedSystemAction=_eca;
var _ecc=_ec7;
var tag=_eca.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ecc=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ecc.add(item);
});
});
_ec7.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ece){
while(_ece.hasNext()){
var node=_ece.getNext();
var _ed0=node.getHandle();
ViewDefinitions[_ed0]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed1){
StageBinding.superclass.handleAction.call(this,_ed1);
var _ed2=_ed1.target;
switch(_ed1.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed2;
this._inflateBinding(_ed2);
_ed1.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed2;
this._inflateBinding(_ed2);
_ed1.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ed1.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed2 instanceof DockBinding){
switch(_ed2.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed2.reference,_ed2);
break;
}
this.handleAttachedDock(_ed2);
_ed1.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed2 instanceof DockBinding){
this.handleSelectedDockTab(_ed2.getSelectedTabBinding());
_ed1.consume();
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
_ed1.consume();
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
_ed1.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed1);
};
StageBinding.prototype.handleBroadcast=function(_ed4,arg){
StageBinding.superclass.handleBroadcast.call(this,_ed4,arg);
switch(_ed4){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ed6=arg;
this._dontView(_ed6);
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
StageBinding.prototype._showStart=function(_ed8){
if(_ed8!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _edb=this.bindingWindow.bindingMap.maindecks;
if(_ed8){
_edb.select("startdeck");
view.show();
}else{
view.hide();
_edb.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ed8;
}
};
StageBinding.prototype._inflateBinding=function(_edc){
for(var _edd in ViewDefinitions){
var _ede=ViewDefinitions[_edd];
if(_ede instanceof SystemViewDefinition){
_edc.mountDefinition(_ede);
}
}
var _edf=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_edf){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee2=new StageCrawler();
_ee2.mode=mode;
_ee2.crawl(this.bindingElement);
_ee2.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ee3){
var _ee4=_ee3.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ee4);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ee4));
}
};
StageBinding.prototype.handleAttachedDock=function(_ee5){
var _ee6=_ee5.getTabBindings();
if(_ee6.hasEntries()){
while(_ee6.hasNext()){
var _ee7=_ee6.getNext();
var _ee8=_ee7.getHandle();
if(_ee8){
if(_ee8=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ee9=ViewDefinitions[_ee8];
if(_ee9){
this._view(_ee5,_ee7,_ee9,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ee8+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_eea){
var _eeb=null;
var _eec=false;
switch(_eea.position){
case Dialog.MODAL:
_eeb=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_eeb=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_eea.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_eeb=this._dockBindings.get(_eea.position);
break;
case DockBinding.EXTERNAL:
window.open(_eea.url);
_eec=true;
break;
default:
var _eed=this._decksBinding.getSelectedDeckBinding();
_eeb=_eed.getDockBindingByReference(_eea.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _eee=this.bindingWindow.bindingMap.maindecks;
_eee.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eec=true;
}
break;
}
if(!_eec){
if(_eeb!=null){
this._view(_eeb,null,_eea,true);
}else{
throw "StageBinding: Could not position view: "+_eea.handle;
}
}
};
StageBinding.prototype._view=function(_eef,_ef0,_ef1,_ef2){
var _ef3=_ef1.handle;
if(_ef1.isMutable){
_ef3+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ef3]){
var _ef4=ViewBinding.getInstance(_ef3);
if(_ef4!=null){
_ef4.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ef3);
}
}else{
this._activeViewDefinitions[_ef3]=_ef1;
Application.lock(this);
switch(_eef.constructor){
case DockBinding:
if(_ef2){
_eef.prepareNewView(_ef1);
}else{
_eef.prepareOpenView(_ef1,_ef0);
}
break;
case StageDialogBinding:
if(_ef2){
_eef.prepareNewView(_ef1);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ef5){
if(this._activeViewDefinitions[_ef5]!=null){
delete this._activeViewDefinitions[_ef5];
}else{
this.logger.debug("Could not unregister active view: "+_ef5);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ef6){
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
this.addFilter(function(_ef8){
var _ef9=UserInterface.getBinding(_ef8);
var _efa=null;
if(_ef9){
switch(_ef9.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_ef9.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_ef9.handleUnMaximization();
break;
}
break;
case DockBinding:
_efa=NodeCrawler.SKIP_NODE;
break;
}
}
return _efa;
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
var _efb=null;
this._dialogs.each(function(_efc){
if(!_efc.isVisible){
_efb=_efc;
}
return _efb!=null;
});
if(!_efb){
this._newInstance();
_efb=this._dialogs.getLast();
}
_efb.setModal(false);
return _efb;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _efd=this.getInstance();
_efd.setModal(true);
return _efd;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _efe=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_efe);
_efe.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_eff){
if(_eff instanceof DialogViewDefinition){
var _f00=ViewBinding.newInstance(this.bindingDocument);
_f00.setDefinition(_eff);
_f00.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_eff.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_eff.handler)){
this._dialogResponseHandler=_eff.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f00;
this._body.add(_f00);
_f00.attach();
_f00.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f01){
StageDialogBinding.superclass.handleAction.call(this,_f01);
var _f02=_f01.target;
switch(_f01.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f02);
_f01.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f02.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f01.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f02.response){
this._handleDialogPageResponse(_f02);
}
_f01.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f01.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f01.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f01.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f01.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f01.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f01.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f01.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f01.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f02==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f03,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f03,arg);
switch(_f03){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f05){
var _f06=new FitnessCrawler();
var list=new List();
if(_f05){
_f06.mode=FitnessCrawler.MODE_BRUTAL;
}
_f06.crawl(this.bindingElement,list);
_f06.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f08){
_f08.fit(_f05);
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
var _f09=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f09){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f0b){
var cmd=_f0b.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f0d){
if(_f0d.bindingDocument==this._viewBinding.getContentDocument()){
if(_f0d instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f0d);
}
this._pageBinding=_f0d;
if(_f0d.height=="auto"){
_f0d.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f0d);
_f0d.enableAutoHeightLayoutMode(false);
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
if(_f0d.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f0d);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f0e){
var _f0f=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f0f){
var _f10=UserInterface.getBinding(_f0f);
_f10.setDisabled(_f0e);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f11){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f11.response,_f11.result!=null?_f11.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f13){
if(_f13.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f13);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f15){
switch(_f15.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f15.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f15.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f16){
var _f17=_f16.label;
var _f18=_f16.image;
var _f19=_f16.width;
var _f1a=_f16.height;
var _f1b=_f16.controls;
var _f1c=_f16.isResizable;
if(_f17){
this.setLabel(_f17);
}
if(_f18){
this.setImage(_f18);
}
if(_f19||_f1a){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f19?_f19:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f1a!=null&&_f1a!="auto")?_f1a:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f1b){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f20=new List(_f1b.split(" "));
while((type=_f20.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f1c!=this._isResizable){
this.setResizable(_f1c);
}
if(_f1a=="auto"){
this._fixAutoHeight(_f16);
}
if(_f16==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f21){
var dim=this.getDimension();
var _f23=0;
var _f24=0;
if(_f21.isDialogSubPage){
_f21=this._pageBinding;
}
if(this._isFirstPage){
_f23=_f21.width!=null?_f21.width:dim.w;
}else{
_f23=dim.w;
}
_f24=_f21.bindingElement.offsetHeight;
_f24+=this._titlebar.bindingElement.offsetHeight;
_f24+=4;
_f24+=4;
if(_f24<dim.h){
_f24=dim.h;
}
if(_f21.minheight!=null){
if(_f24<_f21.minheight){
_f24=_f21.minheight;
}
}
this.setDimension(new Dimension(_f23,_f24));
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
StageDialogBinding.newInstance=function(_f27){
var _f28=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f27);
var _f29=UserInterface.registerBinding(_f28,StageDialogBinding);
_f29.setProperty("controls","minimize maximize close");
return _f29;
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
this.addFilter(function(_f2a,list){
var _f2c=null;
var _f2d=UserInterface.getBinding(_f2a);
if(!_f2d.isVisible){
_f2c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f2c;
});
this.addFilter(function(_f2e,list){
var _f30=null;
var _f31=UserInterface.getBinding(_f2e);
if(_f31.isAttached){
if(Interfaces.isImplemented(IFit,_f31)){
if(!_f31.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f31);
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
StageDecksBinding.prototype.mountDefinition=function(_f32){
var _f33=StageDeckBinding.newInstance(this.bindingDocument);
_f33.handle=_f32.handle;
_f33.perspectiveNode=_f32.node;
_f33.definition=_f32;
this._decks[_f33.handle]=_f33;
this.add(_f33);
_f33.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f34){
var _f35=this._decks[_f34];
StageBinding.perspectiveNode=_f35.perspectiveNode;
this.select(_f35);
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
StageDeckBinding.prototype.handleAction=function(_f36){
StageDeckBinding.superclass.handleAction.call(this,_f36);
var _f37=_f36.target;
switch(_f36.type){
case WindowBinding.ACTION_LOADED:
if(_f37==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f38=this.windowBinding.getContentDocument();
var _f39=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f3a=ViewBinding.newInstance(_f38);
_f3a.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f3b=ViewDefinitions["Composite.Management.Browser"];
_f3b.argument["SystemViewDefinition"]=this.definition;
_f3a.setDefinition(_f3b);
_f39.add(_f3a);
_f3a.attach();
_f3a.initialize();
this._viewBinding=_f3a;
_f36.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f37 instanceof DockBinding){
this._dockBindings.set(_f37.reference,_f37);
_f37.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f36.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f36.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f36);
StageDeckBinding.superclass.handleAction.call(this,_f36);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f3d=new StageCrawler();
_f3d.mode=mode;
_f3d.crawl(this.windowBinding.getContentDocument().body);
_f3d.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f3e){
return this._dockBindings.get(_f3e);
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
StageDeckBinding.newInstance=function(_f40){
var _f41=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f40);
var _f42=UserInterface.registerBinding(_f41,StageDeckBinding);
return _f42;
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
StageSplitBoxBinding.prototype.handleAction=function(_f43){
StageSplitBoxBinding.superclass.handleAction.call(this,_f43);
StageBoxAbstraction.handleAction.call(this,_f43);
var _f44=_f43.target;
var _f45=null;
var _f46=null;
switch(_f43.type){
case DockBinding.ACTION_EMPTIED:
_f46=this.getChildBindingByLocalName("splitter");
if(_f46.isVisible){
_f46.hide();
}
_f45=this.getDescendantBindingsByLocalName("dock");
if(_f45.getFirst().isEmpty&&_f45.getLast().isEmpty){
if(_f45.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f43.consume();
break;
case DockBinding.ACTION_OPENED:
_f45=this.getDescendantBindingsByLocalName("dock");
if(!_f45.getFirst().isEmpty&&!_f45.getLast().isEmpty){
_f46=this.getChildBindingByLocalName("splitter");
if(!_f46.isVisible){
_f46.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f43.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f44!=this){
_f46=this.getChildBindingByLocalName("splitter");
if(_f46.isVisible){
_f46.hide();
}
this.invokeLayout();
_f43.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f44!=this){
var _f47=this.getChildBindingsByLocalName("splitpanel");
if(_f47.getFirst().isVisible&&_f47.getLast().isVisible){
_f46=this.getChildBindingByLocalName("splitter");
if(!_f46.isVisible){
_f46.show();
}
}
this.invokeLayout();
_f43.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f48){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f48);
switch(_f48.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f48.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f49=this.getChildBindingsByLocalName("splitpanel");
return _f49.getFirst().isVisible&&_f49.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f4a=this.getChildBindingsByLocalName("splitpanel");
return _f4a.getFirst().isFixed&&_f4a.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f4b){
StageSplitPanelBinding.superclass.handleAction.call(this,_f4b);
StageBoxAbstraction.handleAction.call(this,_f4b);
switch(_f4b.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f4b.type==StageSplitBoxBinding.ACTION_HIDE){
_f4b.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f4b.type==DockBinding.ACTION_EMPTIED){
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
if(_f4b.type==StageSplitBoxBinding.ACTION_SHOW){
_f4b.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f4e=_f4b.target;
if(_f4e!=this&&_f4e.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f4f=_f4e._containingSplitBoxBinding;
if(_f4f.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f50=_f4f.getChildBindingsByLocalName("splitpanel");
var _f51=_f50.getFirst();
var _f52=_f50.getLast();
if(this.isFixed==true){
if(!_f51.isFixed||!_f52.isFixed||(!_f4f.hasBothPanelsVisible()&&_f4e.isMinimizedForReal)){
this.setFix(false);
_f4b.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f4f.hasBothPanelsFixed()||(!_f4f.hasBothPanelsVisible()&&_f4e.isMinimizedForReal)){
this.setFix(_f4e.getContainedDock().getHeight());
_f4b.consume();
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
var _f53=this.getContainedDock();
if(_f53){
if(this.isMaximizePrepared==true){
}else{
_f53.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f54=this.getContainedDock();
if(_f54){
if(_f54.type==DockBinding.TYPE_EDITORS){
if(_f54.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f54.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f55=this.getContainedDock();
if(_f55){
_f55.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f55);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f56=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f57=this.getContainedDock();
if(_f57){
_f57.collapse(_f56);
if(!_f56){
this.setFix(_f57.getHeight());
}else{
this.setFix(_f57.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f57&&_f57.isActive){
_f57.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f57);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f58){
var _f59=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5a=this.getContainedDock();
if(_f5a){
if(this.isMinimized==true){
_f5a.unCollapse(_f59);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f58){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5a){
_f5a.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f5a);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f5b){
var _f5c=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f5c=false;
}
}
if(_f5c==true){
this._invisibilize(_f5b);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f5e){
if(_f5e!=this._isInvisibilized){
if(_f5e){
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
StageSplitterBinding.prototype.onDragStart=function(_f5f){
var _f60=top.app.bindingMap.stagesplittercover;
var _f61=this._containingSplitBoxBinding.getOrient();
switch(_f61){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f60.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f60.bindingElement.style.cursor="n-resize";
break;
}
_f60.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f61);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f67){
this._orient=_f67;
this.attachClassName(_f67);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f69=true;
var _f6a=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6a=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f69=false;
break;
}
if(_f69){
this.bindingElement.style.left=pos.x+"px";
}
if(_f6a){
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
StageBoxAbstraction.handleAction=function(_f6c){
switch(_f6c.type){
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
if(_f6c.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f6c.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f6d=this.bindingElement.style;
_f6d.position="absolute";
_f6d.width="100%";
_f6d.height="100%";
_f6d.top="0";
_f6d.left="0";
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
var _f6e=this.bindingElement.style;
_f6e.position="relative";
_f6e.width="auto";
_f6e.height="auto";
_f6e.top="auto";
_f6e.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f6f,_f70){
var _f71=_f6f.bindingElement.style;
var _f72=_f6f.bindingElement.parentNode;
var box=_f6f._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f70){
_f6f._unmodifiedFlexMethod=_f6f.flex;
_f6f.flex=function(){
_f71.width=_f72.offsetWidth+"px";
_f71.height=_f72.offsetHeight+"px";
};
}else{
_f71.width="100%";
_f71.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f71.width="auto";
_f71.height="auto";
box.reflex(true);
},0);
}
_f6f.flex=_f6f._unmodifiedFlexMethod;
_f6f._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f74){
var _f75=_f74.target;
switch(_f74.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f75 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f74);
_f74.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f74.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f76){
var mode=null;
switch(_f76.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f78){
StageMenuBarBinding.superclass.handleAction.call(this,_f78);
switch(_f78.type){
case MenuItemBinding.ACTION_COMMAND:
var _f79=_f78.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f79){
SystemAction.invoke(_f79,this._rootNode);
}
}
_f78.consume();
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
var _f7a=this.getProperty("handle");
if(_f7a){
this._handle=_f7a;
if(StageBinding.isViewOpen(_f7a)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f7a);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f7c){
this.setProperty("handle",_f7c);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f7d,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f7d,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f7d){
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
StageViewMenuItemBinding.newInstance=function(_f7f){
var _f80=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f7f);
UserInterface.registerBinding(_f80,StageViewMenuItemBinding);
return UserInterface.getBinding(_f80);
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
StageStatusBarBinding.prototype.setLabel=function(_f81){
this._label.setLabel(_f81);
};
StageStatusBarBinding.prototype.setImage=function(_f82){
this._label.setImage(_f82);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f83){
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
var _f84=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f85=_f84._viewBinding;
var _f86=_f85.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _f87=_f86.getFocusedTreeNodeBindings();
if(!_f87.hasEntries()&&StageBinding.treeSelector){
_f87=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f87;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f88=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f88.each(function(_f89){
LocalStore.focuseNodes.add(_f89.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f8a=LocalStore.focuseNodes.getEntityTokens();
var _f8b=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8c=_f8b.getAssociatedView();
var _f8d=_f8c.getContentWindow().bindingMap.tree;
_f8a=new List(TreeService.GetCurrentLocaleEntityTokens(_f8a.toArray()));
_f8a.each(function(_f8e){
_f8d._focusTreeNodeByEntityToken(_f8e);
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
ExplorerBinding.prototype.handleAction=function(_f8f){
ExplorerBinding.superclass.handleAction.call(this,_f8f);
var _f90=_f8f.target;
switch(_f8f.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f8f.consume();
break;
case Binding.ACTION_DRAG:
if(_f90 instanceof ExplorerSplitterBinding){
_f90.dragger.registerHandler(this);
}
_f8f.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f92){
this._menuBinding.setSelectionByHandle(_f92);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f93){
if(_f93 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f93);
this._menuBinding.mountDefinition(_f93);
}
};
ExplorerBinding.prototype.onDragStart=function(_f94){
var _f95=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f95.hasEntries()){
var _f96=_f95.getFirst();
this._dragStart=_f96.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f96.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f9a){
if(_f9a instanceof SystemViewDefinition){
var _f9b=ViewBinding.newInstance(this.bindingDocument);
_f9b.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f9b.setDefinition(_f9a);
var _f9c=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f9c.setAssociatedView(_f9b);
this._decks[_f9a.handle]=_f9c;
_f9c.add(_f9b);
this.add(_f9c);
function attach(){
_f9c.attach();
_f9b.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f9d){
var _f9e=this._decks[_f9d];
this.select(_f9e);
};
DecksBinding.prototype.expandBy=function(_f9f){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa1=this.bindingElement.offsetHeight+_f9f;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa1+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa3){
var _fa4=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa3);
return UserInterface.registerBinding(_fa4,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fa5){
this._viewBinding=_fa5;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fa6=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fa7=this._viewBinding.getDefinition().label;
StatusBar.busy(_fa6,[_fa7]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fa8){
ExplorerDeckBinding.superclass.handleAction.call(this,_fa8);
var _fa9=_fa8.target;
switch(_fa8.type){
case PageBinding.ACTION_INITIALIZED:
if(_fa9 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fa9.node.getEntityToken();
this._handle=_fa9.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_faa,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_faa,arg);
switch(_faa){
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
var _fac=null;
if(this._isExplorerDeckBindingInitialized){
_fac=this._viewBinding.getDefinition().label;
}else{
_fac=DockTabBinding.LABEL_TABLOADING;
}
return _fac;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fad=null;
if(this._isExplorerDeckBindingInitialized){
_fad=this._viewBinding.getDefinition().image;
}else{
_fad=DockTabBinding.IMG_TABLOADING;
}
return _fad;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fae=null;
if(this._isExplorerDeckBindingInitialized){
_fae=this._viewBinding.getDefinition().toolTip;
}
return _fae;
};
ExplorerDeckBinding.newInstance=function(_faf){
var _fb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_faf);
return UserInterface.registerBinding(_fb0,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb1){
switch(_fb1.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fb1.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb1);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb2){
this._minButtons.set(_fb2.handle,this._mountMinButton(_fb2));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fb3){
var _fb4=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fb4.setLabel(_fb3.label);
_fb4.setToolTip(_fb3.label);
_fb4.handle=_fb3.handle;
_fb4.node=_fb3.node;
this._minGroup.add(_fb4);
this._minList.add(_fb4);
_fb4.attach();
return _fb4;
};
ExplorerMenuBinding.prototype.handleAction=function(_fb5){
ExplorerMenuBinding.superclass.handleAction.call(this,_fb5);
switch(_fb5.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fb6=_fb5.target;
var _fb7=_fb6.getCheckedButtonBinding();
var _fb8=_fb7.handle;
this._selectedHandle=_fb8;
this._selectedTag=_fb7.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fb5.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fb9,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fb9,arg);
switch(_fb9){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fbb){
var _fbc=this._minButtons.get(_fbb);
if(_fbc){
_fbc.check();
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
this.setImageSize(ToolBarBinding.IMAGESIZE_LARGE);
};
ExplorerToolBarBinding.newInstance=function(_fbd){
var _fbe=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fbd);
return UserInterface.registerBinding(_fbe,ExplorerToolBarBinding);
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
var _fbf=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc0=_fbf?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc0);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fc1,_fc2){
var _fc3="ui:explorertoolbarbutton";
var _fc4=DOMUtil.createElementNS(Constants.NS_UI,_fc3,_fc1);
var _fc5=UserInterface.registerBinding(_fc4,ExplorerToolBarButtonBinding);
_fc5.explorerToolBarButtonType=_fc2;
return _fc5;
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
EditorBinding.invokeFunctionEditorDialog=function(_fc6,_fc7,type){
type=type?type:"";
var _fc9=FunctionService.GetCustomEditorSettingsByMarkup(_fc6);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fc9){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fc9.Width?(_fc9.Width>dim.w?dim.w:_fc9.Width):undefined;
def.height=_fc9.Height?(_fc9.Height>dim.h?dim.h:_fc9.Height):undefined;
if(_fc9.Url){
_fc9.Url=_fc9.Url.indexOf("?")>-1?_fc9.Url+"&consoleId="+Application.CONSOLE_ID:_fc9.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fc7;
def.argument={url:_fc9?_fc9.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fc6}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fcc,_fcd){
var _fce=EditorBinding._components;
var _fcf=EditorBinding._editors;
var key=_fcd.key;
var _fd1=Interfaces.isImplemented(IWysiwygEditorComponent,_fcc);
if(!_fd1){
_fd1=Interfaces.isImplemented(ISourceEditorComponent,_fcc);
}
if(_fd1){
if(_fcf.has(key)){
_fcf.get(key).initializeEditorComponent(_fcc);
}else{
if(!_fce.has(key)){
_fce.set(key,new List());
}
_fce.get(key).add(_fcc);
}
}else{
throw "Editor component interface not implemented: "+_fcc;
}
};
EditorBinding.claimComponents=function(_fd2,_fd3){
var _fd4=EditorBinding._components;
var _fd5=EditorBinding._editors;
var key=_fd3.key;
_fd5.set(key,_fd2);
var list=null;
if(_fd4.has(key)){
list=_fd4.get(key).copy();
_fd4.del(key);
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
var _fd9=this.getProperty("value");
if(_fd9!=null){
_fd9=decodeURIComponent(_fd9);
this._startContent=_fd9;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fdb=this.bindingWindow.DataManager;
_fdb.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fdd){
var _fde=EditorBinding.claimComponents(this,_fdd);
if(_fde!=null){
while(_fde.hasNext()){
this.initializeEditorComponent(_fde.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe0=this.bindingWindow.DataManager;
if(_fe0.getDataBinding(name)){
_fe0.unRegisterDataBinding(name);
}
_fe0.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fe1=this.getEditorDocument();
if(_fe1!=null){
Application.framework(_fe1);
DOMEvents.addEventListener(_fe1,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fe1,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fe1,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fe1,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fe3){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fe3==true){
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
var _fe5=this.getCheckSum();
if(_fe5!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fe5;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fe6=null;
if(Binding.exists(this._pageBinding)){
_fe6=this._pageBinding.getCheckSum(this._checksum);
}
return _fe6;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fe8=DOMEvents.getTarget(e);
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
if(_fe8.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fea,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fea,arg);
var _fec=null;
switch(_fea){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _fed=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fed=false;
}
}
}else{
_fec=DOMEvents.getTarget(arg);
if(_fec&&_fec.ownerDocument==this.getEditorDocument()){
_fed=false;
}
}
if(_fed){
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
EditorBinding.prototype._activateEditor=function(_fee){
if(_fee!=this._isActivated){
this._isActivated=_fee;
EditorBinding.isActive=_fee;
var _fef=this.getEditorWindow().standardEventHandler;
var _ff0=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff0!=null){
if(_fee){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff0.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fef.enableNativeKeys(true);
}else{
_ff0.disable();
_fef.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ff1=this.getEditorDocument().selection.createRange();
_ff1.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ff2=false;
try{
var _ff3=this.getEditorWindow().getSelection();
if(_ff3!=null){
_ff2=_ff3.toString().length>0;
if(!_ff2){
var _ff4=_ff3.getRangeAt(0);
var frag=_ff4.cloneContents();
var _ff6=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_ff6.appendChild(frag.firstChild);
}
var img=_ff6.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ff2=true;
}
}
}
}
}
catch(exception){
}
return _ff2;
};
EditorBinding.prototype.isCommandEnabled=function(_ff8){
var _ff9=true;
switch(_ff8){
case "Cut":
case "Copy":
case "Paste":
_ff9=this.getEditorDocument().queryCommandEnabled(_ff8);
break;
}
return _ff9;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _ffd=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _ffe=null;
if(cmd=="Paste"){
_ffe=null;
}else{
_ffe=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_ffe);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_ffd=true;
}
break;
}
return _ffd;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1000=this.getContentWindow().bindingMap.toolbar;
var _1001=_1000.getButtonForCommand(cmd);
if(!_1001){
throw "No button for command "+cmd;
}
return _1001;
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
EditorBinding.prototype.handleAction=function(_1005){
EditorBinding.superclass.handleAction.call(this,_1005);
var _1006=_1005.target;
var self=this;
var _1008=this.shadowTree.iframe;
switch(_1005.type){
case Binding.ACTION_DIRTY:
if(_1005.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1009){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1009);
};
EditorBinding.prototype.handleElement=function(_100a){
return true;
};
EditorBinding.prototype.updateElement=function(_100b){
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
var _100e=this._menuGroups[rel];
if(_100e instanceof List){
_100e.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1011=this._menuGroups[rel];
if(_1011 instanceof List){
_1011.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1013){
EditorPopupBinding.superclass.handleAction.call(this,_1013);
var _1014=_1013.target;
if(_1013.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1014.getProperty("cmd");
var gui=_1014.getProperty("gui");
var val=_1014.getProperty("val");
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
var _1018=this.bindingWindow.bindingMap.tinywindow;
var _1019=this.bindingWindow.bindingMap.codepresswindow;
if(_1018){
EditorBinding.registerComponent(this,_1018);
}else{
if(_1019){
EditorBinding.registerComponent(this,_1019);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_101a,_101b,_101c,theme){
this._editorBinding=_101a;
this._tinyEngine=_101b;
this._tinyInstance=_101c;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_101e,frame,_1020){
this._editorBinding=_101e;
this._codePressFrame=frame;
this._codePressEngine=_1020;
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
var _1023=this._editorBinding;
if(_1023!=null){
var self=this;
var _1025={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1023.hasBookmark()){
_1023.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1023.hasBookmark()){
_1023.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1025);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1025);
}
};
EditorClickButtonBinding.newInstance=function(_1027){
var _1028=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1027);
return UserInterface.registerBinding(_1028,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1029){
var _102a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1029);
return UserInterface.registerBinding(_102a,EditorToolBarButtonBinding);
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
var _102b=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_102b);
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
EditorSelectorBinding.prototype.initializeComponent=function(_102c,_102d,_102e,theme){
this._editorBinding=_102c;
this._tinyEngine=_102d;
this._tinyInstance=_102e;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1030){
EditorSelectorBinding.superclass.handleAction.call(this,_1030);
switch(_1030.type){
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
EditorMenuItemBinding.newInstance=function(_1034){
var _1035=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1034);
return UserInterface.registerBinding(_1035,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1036){
var i=0,_1038,_1039=[],split=_1036.split(" ");
while((_1038=split[i++])!=null){
if(_1038.length>=3&&_1038.substring(0,3)=="mce"){
continue;
}else{
if(_1038.length>=14&&_1038.substring(0,14)=="compositemedia"){
continue;
}
}
_1039.push(_1038);
}
return _1039.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_103b){
var _103c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_103b);
if(soap instanceof SOAPFault){
}else{
_103c=soap.XhtmlFragment;
if(!_103c){
_103c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _103c;
};
VisualEditorBinding.getTinyContent=function(_103e,_103f){
var _1040=null;
if(_103e==null||!_103e.replace(/\s*/gm,"").length){
_103e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_103f.getSoapTinyContent(_103e);
if(soap instanceof SOAPFault){
var _1042=soap;
var _1043={handleDialogResponse:function(){
_103f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1043,_1042);
}else{
_1040=soap.XhtmlFragment;
if(_1040==null){
_1040=new String("");
}
_1040=_1040.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1040;
};
VisualEditorBinding.isImage=function(_1044){
return _1044&&_1044.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1045){
return VisualEditorBinding.isImage(_1045)&&!VisualEditorBinding.isReservedElement(_1045);
};
VisualEditorBinding.isReservedElement=function(_1046){
if(VisualEditorBinding.isFunctionElement(_1046)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1046)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1046)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1047){
return VisualEditorBinding.isImage(_1047)&&CSSUtil.hasClassName(_1047,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1048){
return VisualEditorBinding.isImage(_1048)&&CSSUtil.hasClassName(_1048,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1049){
return VisualEditorBinding.isImage(_1049)&&CSSUtil.hasClassName(_1049,VisualEditorBinding.HTML_CLASSNAME);
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
var _104a=this.getProperty("embedablefieldstypenames");
if(_104a!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_104a);
}
var _104b=this.getProperty("formattingconfiguration");
if(_104b!=null){
this._url+="?config="+_104b;
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
VisualEditorBinding.prototype.handleBroadcast=function(_104c,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_104c,arg);
var _104e=this.getContentWindow().bindingMap.tinywindow;
var _104f=_104e.getContentWindow();
switch(_104c){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_104f){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_104e);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1050){
_1050.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1051=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1051.replace(/\s*/gm,"").length==0){
_1051=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1051,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1052){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1052);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1054=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1054=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1054=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1054;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1057){
var _1058=_1057;
if(!this._isNormalizedDocument(_1057)){
_1058=this._getHtmlMarkup().replace("${body}",_1057);
}
return _1058;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1059){
var _105a=false;
var doc=XMLParser.parse(_1059,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_105a=true;
}
}
if(Client.isWebKit){
if(_1059.indexOf("<html")!==0){
_105a=false;
}
}
return _105a;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _105f=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_105f){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_105f=true;
}
return _105f;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1061=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1061);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1063){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1063,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1065){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1065,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1068=CSSComputer.getPadding(body);
var _1069=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1069.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_106c){
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
VisualEditorPopupBinding.prototype.configure=function(_106d,_106e,_106f){
var _1070=this.editorBinding.hasSelection();
this.tinyInstance=_106d;
this.tinyEngine=_106e;
this.tinyElement=_106f;
this.hasSelection=_1070;
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
var _1074=false;
if(this.hasSelection){
_1074=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1074=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1074=true;
}
}
}
}
if(_1074){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1075=this.getMenuItemForCommand("compositeInsertLink");
var _1076=this.getMenuItemForCommand("unlink");
var _1077=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1078=this.editorBinding.getButtonForCommand("unlink");
_1076.setDisabled(_1078.isDisabled);
if(_1076.isDisabled){
_1075.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1075.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1079=this.editorBinding.embedableFieldConfiguration;
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
if(_1079){
var _107c=_1079.getGroupNames();
if(_107c.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_107c.each(function(_1080){
var _1081=_1079.getFieldNames(_1080);
_1081.each(function(_1082){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1082);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1080+":"+_1082);
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
var _1084=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1085=null;
var _1086=null;
if(_1084){
if(_1084.nodeName=="TD"){
_1085=_1084.getAttribute("colspan");
_1086=_1084.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1085=="1"&&_1086=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1084){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1087){
var _1088=VisualEditorFormattingConfiguration._configurations;
if(!_1088.has(_1087)){
_1088.set(_1087,new VisualEditorFormattingConfiguration());
}
return _1088.get(_1087);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_108a){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_108b){
var _108c=null;
var _108d=VisualEditorFieldGroupConfiguration._configurations;
if(!_108d.has(_108b)){
_108d.set(_108b,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_108b)));
}
return _108d.get(_108b);
};
function VisualEditorFieldGroupConfiguration(_108e){
var _108f=new Map();
new List(_108e).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_108f.set(group.GroupName,map);
});
this._groups=_108f;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1093){
return this._groups.get(_1093).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1094,_1095){
return this._groups.get(_1094).get(_1095).xhtml;
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
var _1097=this.getDescendantElementsByLocalName("textarea");
while(_1097.hasNext()){
var _1098=_1097.getNext();
if(_1098.getAttribute("selected")=="true"){
this._startContent=_1098.value;
this._textareaname=_1098.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _109a=this.getContentWindow().bindingMap.templatetree;
_109a.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_109b){
var _109c=_109a.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_109c.textareaname);
_109b.consume();
}});
_109a.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_109d){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _109e=this.getContentWindow().bindingMap.toolsplitter;
_109e.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _109f=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_109f.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_109f);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a0){
this._textareas=new Map();
while(_10a0.hasNext()){
var _10a1=_10a0.getNext();
var _10a2=_10a1.getAttribute("placeholderid");
this._textareas.set(_10a2,{placeholderid:_10a2,placeholdername:_10a1.getAttribute("placeholdername"),placeholdermarkup:_10a1.value,textareaelement:_10a1,isSelected:_10a1.getAttribute("selected")=="true"});
}
var _10a3=new Map();
this._textareas.each(function(name,_10a5){
var _10a6=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10a6.setLabel(_10a5.placeholdername);
_10a6.setImage("${icon:placeholder}");
_10a6.setProperty("placeholder",true);
_10a6.textareaname=name;
_10a3.set(_10a5.placeholdername,_10a6);
if(_10a5.isSelected){
selected=_10a6;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10a7=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10a7.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10a8=this.getContentWindow().bindingMap.templatetree;
var _10a9=_10a8.add(TreeNodeBinding.newInstance(_10a8.bindingDocument));
_10a9.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10a9.setImage("${icon:warning}");
_10a9.attach();
var _10aa=this.getContentWindow().bindingMap.statusbar;
_10aa.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10ac=this._textareas.get(name);
var _10ad=_10ac.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10ad));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10ae){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10ae;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10af=this.getContentWindow().bindingMap.statusbar;
_10af.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10ae);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10b2=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10b2;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10b3=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10b3=this._xhtmls.get(this._textareaname);
if(_10b3==null){
_10b3=VisualEditorBinding.XHTML;
}
}
return _10b3;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10b5){
_10b5.textareaelement.value=_10b5.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10b6,_10b7,_10b8){
var _10b9=_10b6.getElementsByTagName("div").item(0);
var _10ba=_10b7.getElementsByTagName("div").item(0);
var _10bb=new List(_10b9.getElementsByTagName("textarea"));
var _10bc=new List(_10ba.getElementsByTagName("textarea"));
if(_10bb.getLength()!=_10bc.getLength()){
_10b8=true;
}else{
var index=0;
_10bb.each(function(_10be,index){
var _10c0=_10bc.get(index);
var newid=_10be.getAttribute("placeholderid");
var oldid=_10c0.getAttribute("placeholderid");
var _10c3=_10be.getAttribute("placeholdername");
var _10c4=_10c0.getAttribute("placeholdername");
if(newid!=oldid||_10c3!=_10c4){
_10b8=true;
}
return !_10b8;
});
}
if(_10b8){
var html=null;
if(_10b9.innerHTML!=null){
html=_10b9.innerHTML;
}else{
html=DOMSerializer.serialize(_10b9);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10c7){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10c7);
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
var _10ca=this.getDescendantBindingByLocalName("selector");
_10ca.attach();
this._populateTemplateSelector();
var _10cb=this.getContentWindow().bindingMap.templateselector;
_10cb.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10cc=this.getDescendantBindingByLocalName("selector");
var _10cd=this.getContentWindow().bindingMap.templateselector;
_10cc.selections.each(function(_10ce){
_10ce.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10cd.populateFromList(_10cc.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10cf=this.getDescendantBindingByLocalName("selector");
var _10d0=this.getContentWindow().bindingMap.templateselector;
_10cf.selectByValue(_10d0.getValue());
_10cf.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10d1){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10d6,_10d7){
var _10d8=_10d7;
if(old.has(_10d6)){
_10d8=old.get(_10d6).placeholdermarkup;
}
return _10d8;
}
while(_10d1.hasNext()){
var _10d9=_10d1.getNext();
var _10da=_10d9.getAttribute("placeholderid");
this._textareas.set(_10da,{placeholderid:_10da,placeholdername:_10d9.getAttribute("placeholdername"),placeholdermarkup:compute(_10da,_10d9.value),textareaelement:_10d9,isSelected:_10d9.getAttribute("selected")=="true"});
}
var _10db=null;
var _10dc=this.getContentWindow().bindingMap.templatetree;
var _10dd=new Map();
this._textareas.each(function(name,_10df){
var _10e0=_10dc.add(TreeNodeBinding.newInstance(_10dc.bindingDocument));
_10e0.setLabel(_10df.placeholdername);
_10e0.setImage("${icon:placeholder}");
_10e0.setProperty("placeholder",true);
_10e0.textareaname=name;
_10dd.set(_10df.placeholdername,_10e0);
if(_10df.isSelected){
_10db=_10e0;
}
});
_10dc.attachRecursive();
if(_10db!=null){
var _10e1=true;
if(this._oldtextareas.hasEntries()){
_10e1=false;
var map=new Map();
this._textareas.each(function(id,_10e4){
map.set(_10e4.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10e1=true;
}
}
if(_10e1){
var _10e5=this._textareas.get(_10db.textareaname);
this._textareaname=_10db.textareaname;
this._placeholdername=_10e5.placeholdername;
this._setContentFromPlaceHolder(_10db.textareaname);
_10db.focus();
}else{
var _10e6=_10dd.get(this._placeholdername);
this._textareaname=_10e6.textareaname;
_10e6.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10e9){
var _10ea=null;
if(Client.isWebKit||Client.isExplorer){
_10ea=node.getElementsByTagName(_10e9);
}else{
_10ea=node.getElementsByTagName("ui:"+_10e9);
}
return _10ea;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10eb,_10ec){
var _10ed=this._getElementsByTagName(_10eb,"selector").item(0);
var _10ee=this._getElementsByTagName(_10ec,"selector").item(0);
var _10ef=false;
var _10f0=false;
if(_10ed!=null&&_10ee!=null){
var _10f1=new List(this._getElementsByTagName(_10ed,"selection"));
var _10f2=new List(this._getElementsByTagName(_10ee,"selection"));
if(_10f1.getLength()!=_10f2.getLength()){
_10ef=true;
_10f0=true;
}else{
_10f1.each(function(_10f3,index){
var _10f5=_10f3.getAttribute("value");
var _10f6=_10f2.get(index).getAttribute("value");
if(_10f5!=_10f6){
_10ef=true;
}
return !_10ef;
});
_10f1.each(function(_10f7,index){
var _10f9=_10f7.getAttribute("selected");
var _10fa=_10f2.get(index).getAttribute("selected");
if(_10f9!=_10fa){
_10f0=true;
}
return !_10f0;
});
}
}
if(_10ef){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10ed);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_10f0){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10eb,_10ec,_10f0);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10fc){
var _10fd=null;
if(_10fc==undefined){
_10fc=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_10ff){
if(_10ff.PlaceholderId==_10fc){
_10fd=_10ff.ClientRectangle.Width;
return false;
}
});
}
return _10fd;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1101=this._pageId;
var _1102=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1101,_1102,function(_1104){
self._templatePreview=_1104;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1105){
var _1106=this._pageId;
var _1107=this._textareaname;
var _1108=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1105,_1106,_1108,_1107,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_110a){
var _110b=this._pageId;
var _110c=this._textareaname;
var _110d=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_110a,_110b,_110d,_110c,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_110f,frame,_1111){
this._editorBinding=_110f;
this._codePressFrame=frame;
this._codePressEngine=_1111;
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
var _1117=this.getProperty("validate");
if(_1117==true){
this._hasStrictValidation=true;
}
var _1118=this.getProperty("strictsave");
if(_1118===false){
this._strictSave=false;
}
var _1119=this.getProperty("validator");
if(_1119!=null){
this._validator=_1119;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_111a,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_111a,arg);
switch(_111a){
case BroadcastMessages.CODEMIRROR_LOADED:
var _111c=this.getContentWindow().bindingMap.codemirrorwindow;
if(_111c!=null){
var _111d=_111c.getContentWindow();
if(arg.broadcastWindow==_111d){
this._codemirrorWindow=_111d;
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
this.initializeEditorComponents(_111c);
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
this.unsubscribe(_111a);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1121){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1121);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1122){
if(_1122!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1122;
EditorBinding.isActive=_1122;
var _1123=this._codemirrorWindow.standardEventHandler;
if(_1122){
_1123.enableNativeKeys(true);
}else{
_1123.disableNativeKeys();
}
var _1124=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1124!=null){
if(_1122){
_1124.enable();
}else{
_1124.disable();
}
}
if(_1122){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1128=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1128;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1129){
_1129.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_112b){
if(!this._isFinalized){
if(_112b!=this._startContent){
this._startContent=_112b;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_112b);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _112c=this.getContentWindow().bindingMap.editorpage.getContent();
return _112c?_112c:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_112d){
if(this._pageBinding!=null){
this._pageBinding.cover(_112d);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_112e){
if(_112e!=null&&this.shadowTree.dotnetinput!=null){
var value=_112e.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1130=true;
var _1131=this.getContent();
if(this._validator!=null){
_1130=Validator.validateInformed(_1131,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1132=_1131.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1132!=_1131){
_1131=_1132;
this.setContent(_1132);
}
_1130=XMLParser.isWellFormedDocument(_1131,true,!this._strictSave);
if(_1130==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1130=this._isValidHTML(_1131);
break;
}
}
break;
}
}
return _1130;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1134=true;
var doc=XMLParser.parse(xml);
var _1136=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1136.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1136.add("NamespaceURI");
}
var head=null,body=null;
var _113a=new List(root.childNodes);
while(_113a.hasNext()){
var child=_113a.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1136.add("MultipleHead");
}
if(body!=null){
_1136.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1136.add("MultipleBody");
}
body=child;
break;
default:
_1136.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1136.add("MissingHead");
}
if(body==null){
_1136.add("MissingBody");
}
}
if(_1136.hasEntries()){
_1134=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1136.getFirst()));
}
return _1134;
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
var _113c=null;
var page=this._pageBinding;
if(page!=null){
_113c=page.getCheckSum();
}
return _113c;
};
ProgressBarBinding.prototype=new Binding;
ProgressBarBinding.prototype.constructor=ProgressBarBinding;
ProgressBarBinding.superclass=Binding.prototype;
ProgressBarBinding.WIDTH=190;
ProgressBarBinding.NOTCH=9;
ProgressBarBinding._bindingInstance=null;
ProgressBarBinding.notch=function(_113e){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_113e);
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
ProgressBarBinding.prototype.notch=function(_1140){
_1140=_1140?_1140:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1140);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1142,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1142,arg);
switch(_1142){
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
StartMenuItemBinding.prototype.setChecked=function(_1144,_1145){
StartMenuItemBinding.superclass.setChecked.call(this,_1144,_1145);
if(!_1145){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1146){
var _1147=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1146);
UserInterface.registerBinding(_1147,StartMenuItemBinding);
return UserInterface.getBinding(_1147);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_114a,_114b){
var _114c=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_114b,true)==true){
if(_114a!="*"){
_114a=KeySetBinding._sanitizeKeyModifiers(_114a);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_114c[doc]){
_114c[doc]={};
}
if(!_114c[doc][code]){
_114c[doc][code]={};
}
_114c[doc][code][_114a]=_114b;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1150=false;
var code=e.keyCode;
var _1152=KeySetBinding.keyEventHandlers;
if(_1152[doc]&&_1152[doc][code]){
var _1153="[default]";
_1153+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1153+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1153+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1153+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1154=_1152[doc][code][_1153];
if(_1154==null){
_1154=_1152[doc][code]["*"];
}
if(_1154!=null){
_1154.handleKeyEvent(e);
_1150=true;
}
}
return _1150;
};
KeySetBinding._sanitizeKeyModifiers=function(_1155){
var _1156="[default]";
var mods={};
if(_1155){
new List(_1155.split(" ")).each(function(_1158){
mods[_1158]=true;
});
function check(_1159){
if(mods[_1159]){
_1156+=" "+_1159;
}
}
check("shift");
check("control");
}
return _1156;
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
var _115d=key.getAttribute("oncommand");
var _115e=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_115e){
DOMEvents.preventDefault(e);
}
var _1160=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_115d,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1161){
if(_1161 instanceof CursorBinding){
_1161.setOpacity(0);
_1161.show();
new Animation({modifier:9,onstep:function(_1162){
_1161.setOpacity(Math.sin(_1162*Math.PI/180));
},onstop:function(){
_1161.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1163){
if(_1163 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1164){
_1163.setOpacity(Math.cos(_1164*Math.PI/180));
},onstop:function(){
_1163.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1165,_1166,_1167){
if(_1165 instanceof CursorBinding){
_1167.x-=16;
_1167.y-=16;
new Animation({modifier:3,onstep:function(_1168){
var tal=Math.sin(_1168*Math.PI/180);
_1165.setPosition(new Point(((1-tal)*_1166.x)+((0+tal)*_1167.x),((1-tal)*_1166.y)+((0+tal)*_1167.y)));
},onstop:function(){
CursorBinding.fadeOut(_1165);
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
CursorBinding.prototype.setOpacity=function(_116e){
this.bindingElement.style.opacity=new String(_116e);
this._opacity=_116e;
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
function setOpacity(_1171){
cover.bindingElement.style.opacity=new String(_1171);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1172){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1172*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1174){
cover.bindingElement.style.MozOpacity=new String(_1174);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1175){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1175*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1177){
if(_1177!=this._isBusy){
if(_1177){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1177;
}
};
CoverBinding.prototype.setTransparent=function(_1178){
if(_1178!=this._isTransparent){
if(_1178){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1178;
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
CoverBinding.prototype.setHeight=function(_117a){
if(_117a>=0){
this.bindingElement.style.height=new String(_117a+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_117b){
var _117c=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_117b);
return UserInterface.registerBinding(_117c,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _117e=UncoverBinding._bindingInstance;
if(Binding.exists(_117e)){
_117e.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1182){
this._isFading=_1182==true;
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
var _1183=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1183.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1183.clearRect(0,0,300,150);
_1183.fillRect(0,0,300,150);
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
var _1185=this._canvas.getContext("2d");
_1185.clearRect(0,0,300,150);
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
var _1186=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1186);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1187=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1187){
this._startcontent=_1187.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1188){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1188);
switch(_1188.type){
case WindowBinding.ACTION_ONLOAD:
if(_1188.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1188.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1188);
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
var _118c=this._transformer.transformToString(doc);
this._inject(_118c);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_118f){
this.getContentDocument().body.innerHTML=_118f;
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
var _1197=list.getNext();
var id=_1197.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1197);
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
var _11a1=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a1.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a1.appendChild(att);
}
elm.appendChild(_11a1);
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
var _11ab=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ab){
doc=XMLParser.parse(_11ab);
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
var _11af=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11af;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b0,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b0,arg);
switch(_11b0){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11b2){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11b2);
switch(_11b2.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11b2.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11b4=new List();
list.each(function(lang){
_11b4.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11b4);
this.bindingElement.style.display="block";
}else{
this.bindingElement.style.display="none";
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11b8=this.getDescendantBindingByLocalName("menugroup");
_11b8.detachRecursive();
_11b8.bindingElement.innerHTML="";
if(list.hasEntries()){
while(list.hasNext()){
var _11b9=list.getNext();
if(_11b9.isSelected){
this.setLabel(_11b9.label);
}
var _11ba=MenuItemBinding.newInstance(this.bindingDocument);
_11ba.imageProfile=_11b9.imageProfile;
_11ba.setLabel(_11b9.label);
if(_11b9.tooltip!=null){
_11ba.setToolTip(_11b9.tooltip);
}
_11ba.selectionValue=_11b9.value;
_11b8.add(_11ba);
_11ba.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11bd){
switch(_11bd){
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
var _11c0=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11c0,root);
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
var _11c1=this.getProperty("status");
if(_11c1!=null){
switch(_11c1){
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
GenericViewBinding.prototype.handleAction=function(_11c3){
GenericViewBinding.superclass.handleAction.call(this,_11c3);
var _11c4=_11c3.target;
switch(_11c3.type){
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_11c3.consume();
break;
case TreeNodeBinding.ACTION_OPEN:
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_11c3.target.node.getEntityToken());
_11c3.consume();
break;
}
};
GenericViewBinding.prototype.setNode=function(node){
this.empty();
this.detachClassName(GenericViewBinding.CLASSNAME_SINGLE);
if(node){
if(node.hasChildren()){
var _11c6=node.getChildren();
while(_11c6.hasEntries()){
var child=_11c6.extractFirst();
this.addNode(child);
}
}else{
this.attachClassName(GenericViewBinding.CLASSNAME_SINGLE);
this.addNode(node);
}
}
};
GenericViewBinding.prototype.addNode=function(child){
var _11c9=TreeNodeBinding.newInstance(this.bindingDocument);
_11c9.node=child;
var label=_11c9.node.getLabel();
if(label){
_11c9.setLabel(label);
}
var _11cb=_11c9.node.getImageProfile();
if(_11cb){
_11c9.setImage(_11cb.getDefaultImage());
}
_11c9.isContainer=_11c9.node.hasChildren();
this.add(_11c9);
_11c9.attach();
};
GenericViewBinding.prototype.getPerspectiveHandle=function(){
return this.perspectiveNode.getHandle();
};
GenericViewBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition,actionProfile:this.getCompiledActionProfile(),});
}
};
GenericViewBinding.prototype.focusSingleTreeNodeBinding=function(_11cc){
GenericViewBinding.superclass.focusSingleTreeNodeBinding.call(this,_11cc);
if(_11cc!=null){
this._handleSystemTreeFocus();
}
};
GenericViewBinding.prototype.getCompiledActionProfile=SystemTreeBinding.prototype.getCompiledActionProfile;
GenericViewBinding.newInstance=function(_11cd){
var _11ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_11cd);
var _11cf=UserInterface.registerBinding(_11ce,GenericViewBinding);
_11cf.treeBodyBinding=TreeBodyBinding.newInstance(_11cd);
return _11cf;
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
UserInterfaceMapping.prototype.merge=function(_11d2){
for(var _11d3 in _11d2.map){
this.map[_11d3]=_11d2.getBindingImplementation(_11d3);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11d4){
var _11d5=null;
var name=_11d4.nodeName.toLowerCase();
if(this.map[name]){
_11d5=this.map[name];
}
return _11d5;
};
var UserInterface=new function(){
var _11d7=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11d8=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11d7,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11d9=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11db,impl){
var _11dd=null;
if(!this.hasBinding(_11db)){
var _11de=DOMUtil.getParentWindow(_11db);
if(DOMUtil.getLocalName(_11db)!="bindingmapping"){
if(!impl&&_11db.getAttribute("binding")!=null){
var _11df=_11db.getAttribute("binding");
impl=_11de[_11df];
if(impl==null){
throw "No such binding in scope: "+_11df;
}
}
if(!impl){
var _11e0=_11de.DocumentManager;
if(_11e0){
var _11e1=_11e0.customUserInterfaceMapping;
if(_11e1){
impl=_11e1.getBindingImplementation(_11db);
}
}
}
if(!impl){
impl=_11d8.getBindingImplementation(_11db);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11dd=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11dd){
var key=KeyMaster.getUniqueKey();
_11db.setAttribute("key",key);
_11dd.key=key;
if(!_11db.id){
_11db.id=key;
}
keys[key]={element:_11db,binding:_11dd};
_11dd.onBindingRegister();
}
}
}
return _11dd;
};
this.unRegisterBinding=function(_11e3){
terminate(_11e3);
};
function terminate(_11e4){
if(Binding.exists(_11e4)==true){
var key=_11e4.key;
Binding.destroy(_11e4);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11e4=null;
}else{
_11d9.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11e6){
var _11e7=null;
if(keys[_11e6.key]){
_11e7=keys[_11e6.key].element;
}
return _11e7;
};
this.getBinding=function(_11e8){
var _11e9=null;
if(_11e8&&_11e8.nodeType==Node.ELEMENT_NODE){
try{
var key=_11e8.getAttribute("key");
if(key&&keys[key]){
_11e9=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11e8);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11e9;
};
this.getBindingByKey=function(key){
var _11ec=null;
if(keys[key]){
_11ec=keys[key].binding;
}
return _11ec;
};
this.hasBinding=function(_11ed){
return this.getBinding(_11ed)!=null;
};
this.isBindingVisible=function(_11ee){
var _11ef=Application.isOperational;
if(_11ef==true){
var _11f0=new Crawler();
_11f0.type=NodeCrawler.TYPE_ASCENDING;
_11f0.id="visibilitycrawler";
_11f0.addFilter(function(_11f1){
var b=UserInterface.getBinding(_11f1);
var res=0;
if(!b.isVisible){
_11ef=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11f0.crawl(_11ee.bindingElement);
_11f0.dispose();
}
return _11ef;
};
var _11f4=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11f4={};
for(var key in keys){
_11f4[key]=true;
}
};
this.getPoint=function(){
var _11f8=null;
if(_11f4){
_11f8=new List();
for(var key in keys){
if(!_11f4[key]){
_11f8.add(key);
}
}
}
return _11f8;
};
this.clearPoint=function(){
_11f4=null;
};
this.trackUndisposedBindings=function(){
var _11fa=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11fa){
_11fa="Bindings illdisposed: ";
}
_11fa+=entry.binding+" ";
}
}
if(_11fa!=null){
_11d9.error(_11fa);
}
};
this.autoTrackDisposedBindings=function(_11fd){
if(_11fd){
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
SOAPRequest.newInstance=function(_11fe,_11ff){
var _1200=_11fe+"/"+_11ff;
var _1201=new SOAPRequest(_1200);
var _1202=SOAPRequest.resolver;
_1201.document=Templates.getTemplateDocument("soapenvelope.xml");
_1201.envelope=_1202.resolve("soap:Envelope",_1201.document);
_1201.header=_1202.resolve("soap:Header",_1201.envelope);
_1201.body=_1202.resolve("soap:Body",_1201.envelope);
return _1201;
};
SOAPRequest._parseResponse=function(_1203){
var _1204=null;
var _1205=false;
var doc=_1203.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1204=SOAPRequestResponse.newInstance(_1203.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1203.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1205=true;
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
var text=_1203.responseText;
if(_1203.status==503||text.indexOf("id=\"offline\"")>-1){
_1205=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1203.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1203.responseText);
}
}
}
}
if(_1205==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1204;
};
function SOAPRequest(_120a){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_120a;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _120c=DOMUtil.getXMLHTTPRequest();
var _120d=null;
_120c.open("post",url,false);
_120c.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_120c.setRequestHeader("SOAPAction",this.action);
try{
_120c.send(this.document);
_120d=SOAPRequest._parseResponse(_120c);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_120c=null;
return _120d;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1210){
var _1211=DOMUtil.getXMLHTTPRequest();
_1211.open("post",url,true);
_1211.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1211.setRequestHeader("SOAPAction",this.action);
_1211.onreadystatechange=function(){
if(_1211.readyState==4){
var _1212=SOAPRequest._parseResponse(_1211);
_1210(_1212);
_1211=null;
}
};
_1211.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1213 in this){
this[_1213]=null;
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
var _1215=null;
if(doc&&doc.documentElement){
_1215=new SOAPRequestResponse();
var _1216=SOAPRequestResponse.resolver;
_1215.document=doc;
_1215.envelope=_1216.resolve("soap:Envelope",_1215.document);
_1215.header=_1216.resolve("soap:Header",_1215.envelope);
_1215.body=_1216.resolve("soap:Body",_1215.envelope);
var fault=_1216.resolve("soap:Fault",_1215.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1215.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1216.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1216.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1215;
};
function SOAPFault(_1218,_1219,_121a){
this._operationName=_1218;
this._operationAddress=_1219;
this._faultString=_121a;
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
SOAPFault.newInstance=function(_121b,fault){
return new SOAPFault(_121b.name,_121b.address,fault.faultString);
};
function SOAPEncoder(wsdl,_121e){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_121e;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1220=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1220.body,this._operation);
var _1222=this._wsdl.getSchema();
var _1223=_1222.lookup(this._operation);
var _1224=_1223.getListedDefinitions();
while(_1224.hasNext()){
var def=_1224.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1220;
};
SOAPEncoder.prototype._resolve=function(_1228,_1229,value){
var _122b=this._wsdl.getSchema();
if(_1229.isSimpleValue){
this._appendText(_1228,value,_1229.type=="string");
}else{
var _122c=_122b.lookup(_1229.type);
if(_122c instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_122c.getListedDefinitions();
if(_122c.isArray){
var _122e=new List(value);
var def=defs.getNext();
while(_122e.hasNext()){
var elm=this._appendElement(_1228,def.name);
var val=_122e.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1228,def.name);
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
SOAPEncoder.prototype._appendText=function(_1235,value,_1237){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _123a=false;
var i=0,c;
while(c=chars[i++]){
var _123d=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_123d=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_123d=false;
}
break;
}
if(!_123d){
safe+=c;
}else{
_123a=true;
}
}
if(_123a){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1235.appendChild(_1235.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1240){
this._wsdl=wsdl;
this._operation=_1240;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1245){
var _1246=null;
var _1247=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1249=this.resolve(id,_1245.body);
var _124a=_1247.lookup(id);
var _124b=_124a.getListedDefinitions();
while(!_1246&&_124b.hasNext()){
var def=_124b.getNext();
var elm=this.resolve(def.name,_1249);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1246=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1246.appendChild(_1246.importNode(e,true));
}else{
_1246=this._compute(elm,def);
}
}
return _1246;
};
SOAPDecoder.prototype._compute=function(_124f,_1250){
var _1251=null;
var _1252=this._wsdl.getSchema();
if(_1250.isSimpleValue){
_1251=this._getSimpleValue(_124f,_1250.type);
}else{
var _1253=_1252.lookup(_1250.type);
if(_1253 instanceof SchemaSimpleType){
_1251=this._getSimpleValue(_124f,_1253.restrictionType);
}else{
var defs=_1253.getListedDefinitions();
if(_1253.isArray){
_1251=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_124f);
while(elms.hasNext()){
var elm=elms.getNext();
_1251.push(this._compute(elm,def));
}
}else{
if(_124f==null){
_1251=null;
}else{
_1251={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_124f);
if(elm){
_1251[def.name]=this._compute(elm,def);
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
return _1251;
};
SOAPDecoder.prototype._getSimpleValue=function(_1258,type){
var _125a=null;
if(_1258!=null&&_1258.firstChild&&_1258.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1258.childNodes.length>1){
_1258.normalize();
}
_125a=_1258.firstChild.data;
switch(type){
case Schema.types.STRING:
_125a=_125a;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_125a=Number(_125a);
break;
case Schema.types.BOOLEAN:
_125a=_125a=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _125a;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_125b){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_125b);
}
Schema.prototype._parseSchema=function(_125c){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _125d={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_125c);
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
_125d[rule.getAttribute("name")]=entry;
}
return _125d;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1262){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1262);
}
SchemaDefinition.prototype._parse=function(_1263){
var min=_1263.getAttribute("minOccurs");
var max=_1263.getAttribute("maxOccurs");
var type=_1263.getAttribute("type");
this.name=_1263.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1269=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1269;
}else{
var elm=_1263.getElementsByTagName("*").item(0);
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
function SchemaElementType(_126b,_126c){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_126b,_126c);
}
SchemaElementType.prototype._parseListedDefinitions=function(_126d,_126e){
var els=_126d.resolveAll("s:complexType/s:sequence/s:element",_126e);
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
function SchemaComplexType(_1270,_1271){
this._definitions=new List();
this._parseListedDefinitions(_1270,_1271);
this.isArray=_1271.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1272,_1273){
var els=_1272.resolveAll("s:sequence/s:element",_1273);
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
function SchemaSimpleType(_1276,_1277){
this.restrictionType=null;
this._parse(_1276,_1277);
}
SchemaSimpleType.prototype._parse=function(_1278,_1279){
var _127a=_1278.resolve("s:restriction",_1279);
if(_127a){
this.restrictionType=_127a.getAttribute("base").split(":")[1];
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
var _127d=null;
var _127e=DOMUtil.getXMLHTTPRequest();
_127e.open("get",url,false);
_127e.send(null);
if(_127e.responseXML){
_127d=_127e.responseXML.documentElement;
}else{
alert(_127e.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _127d;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _127f=new List();
var _1280=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1280.hasEntries()){
while(_1280.hasNext()){
var _1281=_1280.getNext();
var name=_1281.getAttribute("name");
_127f.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _127f;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1284,_1285,_1286){
this.name=name;
this.address=_1284;
this.encoder=_1285;
this.decoder=_1286;
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
var _128a=wsdl.getOperations();
_128a.each(function(_128b){
proxy[_128b.name]=WebServiceProxy.createProxyOperation(_128b);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_128c,_128d){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_128d){
var log=_128d instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_128c.address+": "+_128c.name+"\n\n";
log+=DOMSerializer.serialize(_128d.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_128f){
return function(){
var _1290=new List(arguments);
var _1291=null;
if(typeof (_1290.getLast())=="function"){
var _1292=_1290.extractLast();
var _1293=_128f.encoder.encode(_1290);
this._log(_128f,_1293);
var self=this;
var _1295=_1293.asyncInvoke(_128f.address,function(_1296){
self._log(_128f,_1296);
if(_1296){
if(_1296.fault){
_1291=SOAPFault.newInstance(_128f,_1296.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1291,_1293,_1296);
}
}else{
if(WebServiceProxy.isDOMResult){
_1291=_1296.document;
}else{
_1291=_128f.decoder.decode(_1296);
}
}
}
_1293.dispose();
_1292(_1291);
});
}else{
var _1293=_128f.encoder.encode(new List(arguments));
this._log(_128f,_1293);
var _1295=_1293.invoke(_128f.address);
this._log(_128f,_1295);
if(_1295){
if(_1295.fault){
_1291=SOAPFault.newInstance(_128f,_1295.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1291,_1293,_1295);
}
}else{
if(WebServiceProxy.isDOMResult){
_1291=_1295.document;
}else{
_1291=_128f.decoder.decode(_1295);
}
}
}
_1293.dispose();
return _1291;
}
};
};
WebServiceProxy.handleFault=function(_1297,_1298,_1299){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1297,soapRequest:_1298,soapResponse:_1299});
}
catch(exception){
alert(_1297.getFaultString());
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
var _129a=SystemLogger.getLogger("MessageQueue");
var _129b=null;
var _129c=0;
var _129d=null;
var _129e=new Map();
var _129f=new Map();
var _12a0=false;
var _12a1=false;
var _12a2=false;
var _12a3=false;
var _12a4={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_129b=ConsoleMessageQueueService;
_129c=_129b.GetCurrentSequenceNumber("dummyparam!");
this.index=_129c;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12a0){
if(!MessageQueue._actions.hasEntries()){
var _12a5=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12a1=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12a5;
_12a1=false;
}
}
}
};
this._pokeserver=function(){
if(_12a0==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12a6){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12a1);
this._updateMessages(_12a6);
}
};
this._updateMessages=function(_12a7){
if(_12a2){
_12a3=true;
}else{
_12a2=true;
var self=this;
var _12a9=function(_12aa){
if(_12aa!=null){
if(Types.isDefined(_12aa.CurrentSequenceNumber)){
var _12ab=_12aa.CurrentSequenceNumber;
if(_12ab<self.index){
_129a.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12ab);
}
self.index=_12ab;
var _12ac=new List(_12aa.ConsoleActions);
if(_12ac.hasEntries()){
self.evaluate(_12ac);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_129a.error("No sequencenumber in MessageQueue response!");
}
}
_12a2=false;
if(_12a3){
_12a3=false;
self._updateMessages();
}
};
if(_12a7){
_12a9(_129b.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_129b.GetMessages(Application.CONSOLE_ID,this.index,_12a9);
}
}
};
this.evaluate=function(_12ad){
var _12ae=new List();
if(_12ad.hasEntries()){
_12ad.each(function(_12af){
if(this._index[_12af.Id]!=true){
_12ae.add(_12af);
}
this._index[_12af.Id]=true;
},this);
if(_12ae.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12ae);
}else{
this._actions=_12ae;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12b0){
var _12b1="(No reason)";
if(_12b0!=null){
_12b1=_12b0.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12b1);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12b5){
if(_12b5==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12b6=null;
if(this._actions.hasEntries()){
var _12b7=this._actions.extractFirst();
_129c=_12b7.SequenceNumber;
_129a.debug("MessageQueue action: "+_12b7.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_129c+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12b7.ActionType){
case "OpenView":
_12b6=_12b7.OpenViewParams;
if(_12b6.ViewType=="ModalDialog"){
openDialogView(_12b6);
}else{
_129d=_12b6.ViewId;
openView(_12b6);
}
break;
case "CloseView":
_12b6=_12b7.CloseViewParams;
_129d=_12b6.ViewId;
closeView(_12b6);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12b7.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_129e.countEntries()+"\n";
_129e.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_129a.debug(debug);
if(!_129e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12ba=_12b7.SelectElementParams.PerspectiveElementKey;
if(_12ba){
var _12bb={handleBroadcast:function(_12bc,arg){
switch(_12bc){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12ba){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b7.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12bb);
StageBinding.selectPerspective(_12b7.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b7.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12b7.MessageBoxParams);
break;
case "OpenViewDefinition":
_12b6=_12b7.OpenViewDefinitionParams;
_129d=_12b6.Handle;
openViewDefinition(_12b6);
break;
case "LogEntry":
logEntry(_12b7.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12b6=_12b7.BroadcastMessageParams;
_129a.debug("Server says: EventBroadcaster.broadcast ( \""+_12b6.Name+"\", "+_12b6.Value+" )");
EventBroadcaster.broadcast(_12b6.Name,_12b6.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_129e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12b7.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12b7.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12b7.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12b6=_12b7.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12b6.ViewId,entityToken:_12b6.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12b6=_12b7.OpenGenericViewParams;
openGenericView(_12b6);
break;
case "OpenExternalView":
_12b6=_12b7.OpenExternalViewParams;
openExternalView(_12b6);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12b7.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12a1);
}
function logEntry(_12be){
var _12bf=_12be.Level.toLowerCase();
SystemLogger.getLogger(_12be.SenderId)[_12bf](_12be.Message);
}
function openView(_12c0){
var list=paramsToList(_12c0.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12c0.ViewId);
def.entityToken=_12c0.EntityToken;
def.flowHandle=_12c0.FlowHandle;
def.position=_12a4[_12c0.ViewType],def.label=_12c0.Label;
def.image=_12c0.Image;
def.toolTip=_12c0.ToolTip;
def.argument={"url":_12c0.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12c0.ViewId,entityToken:_12c0.EntityToken,flowHandle:_12c0.FlowHandle,position:_12a4[_12c0.ViewType],url:_12c0.Url,label:_12c0.Label,image:_12c0.Image,toolTip:_12c0.ToolTip}));
}
}
function openDialogView(_12c3){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12c3.ViewId,flowHandle:_12c3.FlowHandle,position:Dialog.MODAL,url:_12c3.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12c4){
var _12c5=_12c4.DialogType.toLowerCase();
if(_12c5=="question"){
throw "Not supported!";
}else{
Dialog[_12c5](_12c4.Title,_12c4.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12c6){
var map={};
var _12c8=false;
new List(_12c6.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12c8=true;
});
var proto=ViewDefinitions[_12c6.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12c6.ViewId;
}
def.argument=_12c8?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12cd){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12cd.ViewId);
def.label=_12cd.Label;
def.toolTip=_12cd.ToolTip;
def.image=_12cd.Image;
def.argument={"url":_12cd.Url,"list":paramsToList(_12cd.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12cf){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12cf.ViewId);
def.label=_12cf.Label;
def.toolTip=_12cf.ToolTip;
def.image=_12cf.Image;
def.url=_12cf.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12d1){
if(StageBinding.isViewOpen(_12d1.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12d1.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12d2){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12d2.ViewId,isSuccess:_12d2.Succeeded});
}
this._lockSystem=function(_12d3){
var _12d4=top.bindingMap.offlinetheatre;
if(_12d3){
_12d4.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12d4.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a0=_12d3;
};
this.placeConsoleCommand=function(_12d6){
_129b.PlaceConsoleCommand(Application.CONSOLE_ID,_12d6);
};
this.handleBroadcast=function(_12d7,arg){
switch(_12d7){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_129d!=null&&arg==_129d){
_129d=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_129e.set(arg,true);
}else{
_129a.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_129e.hasEntries()){
_129e.del(arg);
_129a.debug("Refreshed tree: "+arg+"\n("+_129e.countEntries()+" trees left!)");
if(!_129e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_129f.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_129f.hasEntries()==true){
_129f.del(arg);
if(!_129f.hasEntries()){
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
function paramsToList(_12d9){
var list=new List();
new List(_12d9).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12dc=false;
var _12dd=null;
var _12de=false;
var _12df=Client.qualifies();
var _12e0="admin";
var _12e1="123456";
if(!_12df){
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
this.handleBroadcast=function(_12e2){
switch(_12e2){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12e2);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12e3=bindingMap.decks.getSelectedDeckBinding();
if(_12e3!=null){
switch(_12e3.getID()){
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
var _12e4=window.bindingMap.appwindow;
_12e4.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12e5=window.location.hash.replace(/^#/,"");
if(_12e5){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12e5);
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
function fileEventBroadcasterSubscriptions(_12e6){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12e7){
if(_12e6){
EventBroadcaster.subscribe(_12e7,KickStart);
}else{
EventBroadcaster.unsubscribe(_12e7,KickStart);
}
});
}
function kickStart(_12e8){
switch(_12e8){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12dc=true;
break;
}
if(_12dc){
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
DataManager.getDataBinding("username").setValue(_12e0);
DataManager.getDataBinding("password").setValue(_12e1);
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
var _12eb=DataManager.getDataBinding("username").getResult();
var _12ec=DataManager.getDataBinding("passwordold").getResult();
var _12ed=DataManager.getDataBinding("passwordnew").getResult();
var _12ee=DataManager.getDataBinding("passwordnew2").getResult();
if(_12ed==_12ee){
var _12ef=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f0=LoginService.ChangePassword(_12eb,_12ec,_12ed);
if(_12f0 instanceof SOAPFault){
alert(_12f0.getFaultString());
}else{
if(_12f0.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12f0);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12ef){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12f1){
_12f1=new List(_12f1);
var _12f2=document.getElementById("passworderror");
_12f2.innerHTML="";
_12f1.each(function(error){
var _12f4=document.createElement("div");
_12f4.textContent=error;
_12f4.className="errortext";
_12f2.appendChild(_12f4);
});
_12f2.style.display="block";
var _12f5={handleAction:function(_12f6){
document.getElementById("passworderror").style.display="none";
_12f6.target.removeActionListener(Binding.ACTION_DIRTY,_12f5);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12f5);
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
this.doLogin=function(_12f7,_12f8){
var _12f9=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12fa=false;
var _12fb=false;
var _12fc=LoginService.ValidateAndLogin(_12f7,_12f8);
if(_12fc instanceof SOAPFault){
alert(_12fc.getFaultString());
}else{
if(_12fc=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_12fc=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_12fc=="passwordUpdateRequired"){
_12fb=true;
}
if(_12fc=="success"){
_12fa=true;
}
}
if(_12fb){
changePasswordRequired();
}else{
if(_12fa){
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
if(_12f9){
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
var _12fd=document.getElementById("passwordexpired");
_12fd.firstChild.data=_12fd.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _12fe=DataManager.getDataBinding("username");
var _12ff=DataManager.getDataBinding("password");
_12fe.blur();
_12ff.blur();
_12fe.setValue("");
_12ff.setValue("");
_12fe.clean();
_12ff.clean();
_12fe.focus();
document.getElementById("loginerror").style.display="block";
var _1300={handleAction:function(_1301){
document.getElementById("loginerror").style.display="none";
_1301.target.removeActionListener(Binding.ACTION_DIRTY,_1300);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1300);
}
WindowManager.fireOnLoad(this);
if(!_12df){
UpdateManager.isEnabled=false;
}
};

