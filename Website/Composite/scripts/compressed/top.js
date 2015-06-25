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
alert(cry);
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
var _bf=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _c1=_bd.ResourceNamespace;
var _c2=_bd.ResourceName;
_bf="${svg:"+_bd.ResourceName+"}";
return _bf;
},toGrayScaleURL:function(_c3){
var _c4=document.createElement("canvas");
var ctx=_c4.getContext("2d");
var _c3=new Image();
var _c6=_c3.width;
var _c7=_c3.height;
_c4.width=_c6;
_c4.height=_c7;
ctx.drawImage(_c3,0,0);
var _c8=ctx.getImageData(0,0,_c6,_c7);
for(j=0;j<_c8.height;i++){
for(i=0;i<_c8.width;j++){
var _c9=(i*4)*_c8.width+(j*4);
var red=_c8.data[_c9];
var _cb=_c8.data[_c9+1];
var _cc=_c8.data[_c9+2];
var _cd=_c8.data[_c9+3];
var _ce=(red+_cb+_cc)/3;
_c8.data[_c9]=_ce;
_c8.data[_c9+1]=_ce;
_c8.data[_c9+2]=_ce;
_c8.data[_c9+3]=_cd;
}
}
return _c4.toDataURL();
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_cf){
if(typeof _cf!=Types.UNDEFINED){
_cf=String(_cf);
_cf=_cf.replace("${root}",Constants.APPROOT);
_cf=_cf.replace("${skin}",Constants.SKINROOT);
_cf=_cf.replace("${tiny}",Constants.TINYROOT);
if(_cf.indexOf("${icon:")>-1){
_cf=this._resolveImage(_cf);
}else{
if(_cf.indexOf("${class:")>-1){
_cf=this._resolveClasses(_cf);
}else{
if(_cf.indexOf("${svg:")>-1){
_cf=this._resolveSVG(_cf);
}else{
if(_cf.indexOf("${string:")>-1){
_cf=this._resolveString(_cf);
}
}
}
}
}
return _cf;
},resolveVars:function(_d0,_d1){
var i=0;
while(i<_d1.length){
_d0=_d0.replace("{"+i+"}",_d1[i]);
i++;
}
return _d0;
},_resolveString:function(_d3){
var _d4=null;
var _d5=null;
var key=_d3.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_d5=key.split(":")[0];
key=key.split(":")[1];
}else{
_d5=StringBundle.UI;
}
_d4=StringBundle.getString(_d5,key);
if(!_d4){
_d4="(?)";
}
return _d4;
},_resolveImage:function(_d7){
var _d8=null;
var _d9=null;
var _da=null;
var _db=null;
_da=_d7.split("${icon:")[1].split("}")[0];
if(_da.indexOf(":")>-1){
_d9=_da.split(":")[0];
_da=_da.split(":")[1];
}else{
_d9=ImageProvider.UI;
}
if(_da.indexOf("(")>-1){
_db=_da.split("(")[1].split(")")[0];
_da=_da.split("(")[0];
}
_d8=ImageProvider.getImageURL({ResourceNamespace:_d9,ResourceName:_da},_db);
var _d8={};
_d8.svg=_da;
return _d8;
return _d8;
},_resolveClasses:function(_dc){
var _dd={};
resource=_dc.split("${class:")[1].split("}")[0];
_dd.classes=resource;
return _dd;
},_resolveSVG:function(_de){
var _df={};
var _e0=_de.split("${svg:")[1].split("}")[0];
_df.svg=_e0;
return _df;
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
_Cookies.prototype={createCookie:function(_e3,_e4,_e5){
var _e6="";
if(_e5){
var _e7=new Date();
_e7.setTime(_e7.getTime()+(_e5*24*60*60*1000));
_e6="; expires="+_e7.toGMTString();
}
document.cookie=_e3+"="+escape(_e4)+_e6+"; path=/";
return this.readCookie(_e3);
},readCookie:function(_e8){
var _e9=null;
var _ea=_e8+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_ea)==0){
_e9=unescape(c.substring(_ea.length,c.length));
}
}
return _e9;
},eraseCookie:function(_ee){
this.createCookie(_ee,"",-1);
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
var _ef=SystemLogger.getLogger("StatusBar");
var _f0=null;
var _f1="${icon:error}";
var _f2="${icon:warning}";
var _f3="${icon:loading}";
var _f4="${icon:message}";
var _f5=null;
var _f6=null;
var _f7=null;
var _f8=null;
this.initialize=function(_f9){
_f5=StringBundle.getString("ui","Website.App.StatusBar.Error");
_f6=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_f7=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_f8=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_f0=_f9;
this.document=_f9.bindingDocument;
};
this.error=function(_fa,_fb){
this.state=StatusBar.ERROR;
_fa=_fa?_fa:_f5;
show(_fa,_f1,_fb,false);
};
this.warn=function(_fc,_fd){
this.state=StatusBar.WARN;
_fc=_fc?_fc:_f6;
show(_fc,_f2,_fd,false);
};
this.busy=function(_fe,_ff){
this.state=StatusBar.BUSY;
_fe=_fe?_fe:_f7;
show(_fe,_f3,_ff,false);
};
this.ready=function(_100,vars){
this.state=StatusBar.READY;
_100=_100?_100:_f8;
show(_100,_f4,vars,true);
};
this.report=function(_102,icon,vars,_105){
this.state=null;
show(_102,icon,vars,_105);
};
this.clear=function(){
this.state=null;
if(_f0){
_f0.clear();
}
};
function show(_106,icon,vars,_109){
if(vars){
_106=Resolver.resolveVars(_106,vars);
}
if(_f0){
_f0.setLabel(_106);
_f0.setImage(icon);
if(_109){
_f0.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_ef.error("Message not initialized for display: "+_106);
}
}
this.addToGroup=function(name,_10b){
if(!this._groups.has(name)){
this._groups.set(name,_f0.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(name).add(_10b);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,isUIRtl:false,isRtl:false,handleBroadcast:function(_10c,arg){
switch(_10c){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
this.isUIRtl=LocalizationService.GetUITextDirection(true)=="rtl";
this.isRtl=LocalizationService.GetTextDirection(true)=="rtl";
var _10e=LocalizationService.GetActiveLocales(true);
if(_10e.length>=1){
this.languages=new List(_10e);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_10c){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _10f=LocalizationService.GetLocales(true);
this.source=_10f.ForeignLocaleName;
this.target=_10f.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_10f.ForeignLocaleName,target:_10f.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _110=this.languages.copy();
while(_110.hasNext()){
var lang=_110.getNext();
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
_Validator.prototype={validate:function(_112,key,_114){
var _115=true;
var _116=SourceValidationService.ValidateSource(_112,key);
if(_116!="True"){
if(_114==true){
this._dialog(_116);
}
_115=false;
}
return _115;
},validateInformed:function(_117,key){
return this.validate(_117,key,true);
},_dialog:function(_119){
setTimeout(function(){
Dialog.error("Source Invalid",_119);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_11a,_11b,_11c,_11d){
this._count++;
this._eventListener(true,_11a,_11b,_11c,_11d);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_11a&&typeof _11a.nodeType!=Types.UNDEFINED){
if(_11a.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_11a);
if(win){
var _11f={handleEvent:function(){
DOMEvents.removeEventListener(_11a,_11b,_11c,_11d);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_11f);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_11f);
}
}
}
}
},removeEventListener:function(_120,_121,_122,_123){
this._count--;
this._eventListener(false,_120,_121,_122,_123);
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
},cleanupEventListeners:function(_129){
this._deleteWrappedHandler(_129);
},isCurrentTarget:function(e){
var _12b=false;
if(Client.isMozilla==true){
_12b=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_12c,_12d){
var _12e=true;
if(_12c==_12d){
_12e=false;
}
if(_12e==true){
while(_12d!=null&&_12d.nodeType!=Node.DOCUMENT_NODE&&_12d!=_12c){
_12d=_12d.parentNode;
}
_12e=(_12d==_12c);
}
return _12e;
},_eventListener:function(_12f,_130,_131,_132,_133,_134){
if(Interfaces.isImplemented(IEventListener,_132,true)){
if(typeof _131!=Types.UNDEFINED){
var _135=this._getAction(_12f);
if(_130[_135]){
if(Client.isExplorer||Client.isExplorer11){
switch(_131){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_132=this._getWrappedHandler(_130,_131,_132,_134);
_130[_135](_131,_132,false);
break;
default:
_130[_135](_131,_132,false);
break;
}
}else{
switch(_131){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_131=_131==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_130[_135](_131,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_132.handleEvent(e);
}
}},_133?true:false);
break;
default:
_130[_135](_131,_132,_133?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_138){
var _139=null;
switch(_138){
case true:
_139="addEventListener";
break;
case false:
_139="removeEventListener";
break;
}
return _139;
},_getWrappedHandler:function(_13a,_13b,_13c,_13d){
var _13e=null;
try{
if(!_13c._domEventHandlers){
_13c._domEventHandlers={};
}
if(!_13c._domEventHandlers[_13a]){
_13c._domEventHandlers[_13a]={};
}
if(!_13c._domEventHandlers[_13a][_13b]){
var win=_13a.nodeType?DOMUtil.getParentWindow(_13a):_13a;
if(win){
_13c._domEventHandlers[_13a][_13b]=function(e){
if(win.event!=null&&_13c!=null){
_13c.handleEvent(win.event);
}else{
if(_13c!=null){
_13c.handleEvent(e);
}
}
};
}
}
_13e=_13c._domEventHandlers[_13a][_13b];
}
catch(exception){
this._report(_13a,_13b,_13c,_13d);
}
return _13e;
},_deleteWrappedHandler:function(_141){
for(var _142 in _141._domEventHandlers){
if(_142){
for(var _143 in _141._domEventHandlers[_142]){
if(_143){
delete _141._domEventHandlers[_142][_143];
}
}
}
delete _141._domEventHandlers[_142];
}
},_report:function(_144,_145,_146,_147){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_144?_144.nodeName:_144)+"\n"+"\tevent: "+_145+"\n"+"\thandler: "+_146+"\n\n"+"Offending invoker: "+(_147.callee?_147.callee.toString():_147.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_149){
var _14a=null;
var _14b=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_14b=node.documentElement;
}
if(_14b.xml!=null){
return _14b.xml;
}else{
if(this._serializer!=null){
if(_149==true){
_14b=_14b.cloneNode(true);
_14b=DOMFormatter.format(_14b,DOMFormatter.INDENTED_TYPE_RESULT);
}
_14a=this._serializer.serializeToString(_14b);
}
}
return _14a;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _14e=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_14f){
var doc=_14f.ownerDocument;
var _151=function(node,_153){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _154="",i=0;
while(i++<_153){
_154+=TAB;
}
var _156=node.firstChild;
while(_156){
switch(_156.nodeType){
case Node.ELEMENT_NODE:
if(_156==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_154));
}
node.insertBefore(doc.createTextNode(NEW+_154+TAB),_156);
_151(_156,_153+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_154+TAB),_156);
break;
}
if(_156.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_156,_154+TAB);
}
}
_156=_156.nextSibling;
}
}
};
_151(_14f,0);
}
function strip(_157){
var _158=[];
var _159={acceptNode:function(_15a){
return (!_14e.test(_15a.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _15b=_157.ownerDocument.createTreeWalker(_157,NodeFilter.SHOW_TEXT,_159,true);
while(_15b.nextNode()){
_158.push(_15b.currentNode);
}
var i=0,_15d;
while((_15d=_158[i++])!=null){
_15d.parentNode.removeChild(_15d);
}
}
function formatCDATASection(node,_15f){
if(node.textContent.indexOf(NEW)>-1){
var _160=node.textContent.split(NEW);
var _161="",line,_163=0,_164=true;
while((line=_160.shift())!=null){
if(_163==0&&line.charAt(0)==TAB){
while(line.charAt(_163++)==TAB){
}
}
line=line.substring(_163,line.length);
if(_160.length>0){
_161+=_15f+TAB+line;
_161+=_164?"":"\n";
}else{
_161+=_15f+line;
_15f=_15f.slice(1,_15f.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_15f));
}
_164=false;
}
node.textContent=_161;
}
}
this.format=function(_165,_166){
var _167=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_165);
if(_166!=_167){
indent(_165);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_165);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_168){
var sig,_16a=null,_16b=this.MSXML_MAXVERSION;
while(!_16a&&_16b>=this.MSXML_MINVERSION){
try{
sig=_168.replace("{$version}",_16b);
_16a=new ActiveXObject(sig);
}
catch(exception){
}
_16b--;
}
return _16a;
},getXMLHTTPRequest:function(){
var _16c=null;
if(Client.isExplorer||Client.isExplorer11){
_16c=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_16c=new XMLHttpRequest();
}
return _16c;
},getDOMDocument:function(_16d){
var _16e=null;
if(Client.isExplorer||Client.isExplorer11){
_16e=this.getMSComponent(_16d?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_16e=doc;
}
return _16e;
},getMSXMLXSLTemplate:function(){
var _170=null;
if(Client.isExplorer||Client.isExplorer11){
_170=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _170;
},getLocalName:function(_171){
var _172=null;
if(_171.localName){
_172=_171.localName.replace("ui:","");
}else{
if(_171.baseName){
_172=_171.baseName;
}else{
_172=_171.nodeName.toLowerCase();
}
}
return _172;
},getComputedStyle:function(_173,_174){
var _175=null;
if(Client.isExplorer){
if(_173.currentStyle!=null){
_175=_173.currentStyle[_174];
}else{
this._logger.error("Could not compute style for element "+_173.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _176=_173.ownerDocument.defaultView.getComputedStyle(_173,null);
if(_176!=null){
_175=_176.getPropertyValue(_174);
}else{
this._logger.error("Could not compute style for element "+_173.nodeName);
SystemDebug.stack(arguments);
}
}
return _175;
},getMaxIndex:function(doc){
var max=0,_179=new List(doc.getElementsByTagName("*"));
_179.each(function(_17a){
var _17b=CSSComputer.getZIndex(_17a);
if(_17b>max){
max=_17b;
}
});
return max;
},getOrdinalPosition:function(_17c,_17d){
var _17e=null;
var _17f=-1;
var _180=this.getLocalName(_17c);
var _181=new List(_17c.parentNode.childNodes);
while(_181.hasNext()){
var _182=_181.getNext();
if(_182.nodeType==Node.ELEMENT_NODE){
if(!_17d||this.getLocalName(_182)==_180){
_17f++;
if(_182==_17c||(_182.id!=""&&_182.id==_17c.id)){
_17e=_17f;
break;
}
}
}
}
return _17e;
},isFirstElement:function(_183,_184){
return (this.getOrdinalPosition(_183,_184)==0);
},isLastElement:function(_185,_186){
var _187=_185.parentNode.getElementsByTagName(_186?this.getLocalName(_185):"*");
return (this.getOrdinalPosition(_185)==_187.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _18b=null;
if(node.textContent){
_18b=node.textContent;
}else{
if(node.text){
_18b=node.text;
}else{
_18b=node.innerText;
}
}
return _18b;
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
},getAncestorByLocalName:function(_18e,node,_190){
var _191=null;
while(_191==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_190==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_18e){
_191=node;
}
}
return _191;
},contains:function(_193,node){
return _193.contains?_193!=node&&_193.contains(node):!!(_193.compareDocumentPosition(node)&16);
},createElementNS:function(_195,_196,_197){
var _198=null;
if(_197==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_198=_197.createElementNS(_195,_196);
}else{
if(_197.xml!=null){
_198=_197.createNode(Node.ELEMENT_NODE,_196,_195);
}else{
_198=_197.createElement(_196.replace("ui:",""));
}
}
}
return _198;
},getElementsByTagName:function(node,_19a){
var _19b=null;
if(Client.isMozilla){
_19b=node.getElementsByTagNameNS(Constants.NS_XHTML,_19a);
}else{
_19b=node.getElementsByTagName(_19a);
}
return _19b;
},getNextElementSibling:function(_19c){
return Client.isExplorer?_19c.nextSibling:_19c.nextElementSibling;
},getPreviousElementSibling:function(_19d){
return Client.isExplorer?_19d.previousSibling:_19d.previousElementSibling;
},cloneNode:function(node){
var _19f=null;
if(Client.isMozilla==true){
_19f=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_19f=node.cloneNode(true);
}
return _19f;
},getLocalPosition:function(_1a0){
var _1a1=new Point(_1a0.offsetLeft,_1a0.offsetTop);
if(Client.isExplorer&&_1a0.parentNode&&_1a0.parentNode.currentStyle){
if(_1a0.parentNode.currentStyle.position=="static"){
var _1a2=this.getLocalPosition(_1a0.parentNode);
_1a1.x+=_1a2.x;
_1a1.y+=_1a2.y;
}
}
return _1a1;
},getGlobalPosition:function(_1a3){
return this._getPosition(_1a3,false);
},getUniversalPosition:function(_1a4){
return this._getPosition(_1a4,true);
},_getPosition:function(_1a5,_1a6){
var _1a7=null;
if(typeof _1a5.getBoundingClientRect!=Types.UNDEFINED){
var rect=_1a5.getBoundingClientRect();
_1a7={x:rect.left,y:rect.top};
if(Client.isMozilla){
_1a7.x-=_1a5.scrollLeft;
_1a7.y-=_1a5.scrollTop;
}
}else{
_1a7={x:_1a5.offsetLeft-_1a5.scrollLeft,y:_1a5.offsetTop-_1a5.scrollTop};
while(_1a5.offsetParent){
_1a5=_1a5.offsetParent;
_1a7.x+=(_1a5.offsetLeft-_1a5.scrollLeft);
_1a7.y+=(_1a5.offsetTop-_1a5.scrollTop);
}
}
if(_1a6){
var win=DOMUtil.getParentWindow(_1a5);
if(win){
var _1aa=win.frameElement;
if(_1aa){
var add=DOMUtil.getUniversalPosition(_1aa);
_1a7.x+=add.x;
_1a7.y+=add.y;
}
}
}
return new Point(_1a7.x,_1a7.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1af){
var _1b0=DOMEvents.getTarget(e);
var _1b1={x:e.clientX,y:e.clientY};
if(_1af){
var _1b2=this.getParentWindow(_1b0).frameElement;
if(_1b2){
var add=this.getUniversalPosition(_1b2);
_1b1.x+=add.x;
_1b1.y+=add.y;
}
}
return _1b1;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1b5){
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
if(!_1b5){
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
if(!_1b5){
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
},isWellFormedDocument:function(xml,_1b8,_1b9){
var _1ba=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1bc=SourceValidationService.IsWellFormedDocument(xml);
if(_1bc!="True"){
_1ba=false;
if(_1b8==true){
if(_1b9){
if(confirm("Not well-formed\n"+_1bc+"\nContinue?")){
_1ba=true;
}
}else{
this._illFormedDialog(_1bc);
}
}
}
return _1ba;
},isWellFormedFragment:function(xml,_1be){
var _1bf=true;
var _1c0=SourceValidationService.IsWellFormedFragment(xml);
if(_1c0!="True"){
_1bf=false;
if(_1be==true){
this._illFormedDialog(_1c0);
}
}
return _1bf;
},_illFormedDialog:function(_1c1){
setTimeout(function(){
Dialog.error("Not well-formed",_1c1);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1c2){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1c3){
return _1c2[_1c3];
}};
}else{
this._nsResolver=_1c2;
}
};
XPathResolver.prototype.resolve=function(_1c4,node,_1c6){
var _1c7=null;
try{
if(this._evaluator){
_1c7=this._evaluateDOMXpath(_1c4,node,_1c6?true:false);
}else{
_1c7=this._evaluateMSXpath(_1c4,node,_1c6?true:false);
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
return _1c7;
};
XPathResolver.prototype.resolveAll=function(_1c8,node){
return this.resolve(_1c8,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1ca,node,_1cc){
var _1cd=null;
if(node){
var _1cd=this._evaluator.evaluate(_1ca,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1cc){
var list=new List();
while((node=_1cd.iterateNext())!=null){
list.add(node);
}
_1cd=list;
}else{
_1cd=_1cd.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1cd;
};
XPathResolver.prototype._evaluateMSXpath=function(_1d0,node,_1d2){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1d4="";
for(var _1d5 in this._nsResolver){
_1d4+="xmlns:"+_1d5+"=\""+this._nsResolver[_1d5]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1d4);
if(_1d2){
var list=new List();
var i=0,_1d8=node.selectNodes(_1d0);
while(i<_1d8.length){
list.add(_1d8.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1d0);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1da=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1da);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1da;
}
};
XSLTransformer.prototype._import=function(url){
var _1dc=null;
if(Client.hasXSLTProcessor){
var _1dd=DOMUtil.getXMLHTTPRequest();
_1dd.open("get",Resolver.resolve(url),false);
_1dd.send(null);
_1dc=_1dd.responseXML;
}else{
var _1dc=DOMUtil.getDOMDocument(true);
_1dc.async=false;
_1dc.load(url);
}
return _1dc;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1df=null;
if(Client.hasXSLTProcessor){
_1df=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1df;
};
XSLTransformer.prototype.transformToString=function(dom,_1e1){
var _1e2=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1e2=DOMSerializer.serialize(doc,_1e1);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1e2=proc.output;
}
return _1e2;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1e5){
var _1e6=_1e5.style?_1e5.className:_1e5.getAttribute("class");
_1e6=_1e6?_1e6:"";
return _1e6;
},_contains:function(_1e7,sub){
return _1e7.indexOf(sub)>-1;
},_attach:function(_1e9,sub){
return _1e9+(_1e9==""?"":" ")+sub;
},_detach:function(_1eb,sub){
if(this._contains(_1eb," "+sub)){
sub=" "+sub;
}
return _1eb.replace(sub,"");
},attachClassName:function(_1ed,_1ee){
if(_1ed.classList!=null){
if(!_1ed.classList.contains(_1ee)){
_1ed.classList.add(_1ee);
}
}else{
var _1ef=this._getCurrent(_1ed);
if(!this._contains(_1ef,_1ee)){
_1ef=this._attach(_1ef,_1ee);
}
if(_1ed.style!=null){
_1ed.className=_1ef;
}else{
_1ed.setAttribute("class",_1ef);
}
}
},detachClassName:function(_1f0,_1f1){
if(_1f0.classList!=null){
if(_1f0.classList.contains(_1f1)){
_1f0.classList.remove(_1f1);
}
}else{
var _1f2=this._getCurrent(_1f0);
if(this._contains(_1f2,_1f1)){
_1f2=this._detach(_1f2,_1f1);
}
if(_1f0.style!=null){
_1f0.className=_1f2;
}else{
if(_1f2==""){
_1f0.removeAttribute("class");
}else{
_1f0.setAttribute("class",_1f2);
}
}
}
},hasClassName:function(_1f3,_1f4){
var _1f5=false;
if(_1f3.classList!=null){
_1f5=_1f3.classList.contains(_1f4);
}else{
_1f5=this._contains(this._getCurrent(_1f3),_1f4);
}
return _1f5;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f6,_1f7){
var _1f8={};
for(var _1f9 in _1f6){
var ent=parseInt(DOMUtil.getComputedStyle(_1f7,_1f6[_1f9]));
_1f8[_1f9]=isNaN(ent)?0:ent;
}
return _1f8;
},_getMargin:function(_1fb){
return this._getComplexResult(this._margins,_1fb);
},getPadding:function(_1fc){
return this._getComplexResult(this._paddings,_1fc);
},getBorder:function(_1fd){
return this._getComplexResult(this._borders,_1fd);
},getPosition:function(_1fe){
return DOMUtil.getComputedStyle(_1fe,"position");
},getFloat:function(_1ff){
return DOMUtil.getComputedStyle(_1ff,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_200){
return parseInt(DOMUtil.getComputedStyle(_200,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_201){
return DOMUtil.getComputedStyle(_201,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _202=SystemLogger.getLogger("System");
var root=null;
var _204=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_205){
if(_204==null){
_204={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_206){
_204[_206.Key]=_206.Value;
});
}
return _204[_205];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _207=new List();
var _208=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_208);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_20a){
_207.add(new SystemNode(_20a));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _207;
};
this.getChildNodes=function(node,_20c){
var _20d=new List();
var _20e=null;
if(_20c){
if(SearchTokens.hasToken(_20c)){
_20c=SearchTokens.getToken(_20c);
}
_20e=TreeService.GetElementsBySearchToken(node.getData(),_20c);
}else{
_20e=TreeService.GetElements(node.getData());
}
new List(_20e).each(function(_20f){
var _210=new SystemNode(_20f);
if(_20c){
_210.searchToken=_20c;
}
_20d.add(_210);
});
return _20d;
};
this.getDescendantBranch=function(_211){
var map=new Map();
var arg=[];
_211.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _215=TreeService.GetMultipleChildren(arg);
var _216=new List(_215);
while(_216.hasNext()){
this._listNodesInMap(_216.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_217,_218,_219){
var map=new Map();
var arg=[];
_219.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _21d=TreeService.FindEntityToken(_217,_218,arg);
if(_21d instanceof SOAPFault){
_202.error(_21d.getFaultString());
if(Application.isDeveloperMode){
alert(_21d.getFaultString());
}
map=null;
}else{
var _21e=new List(_21d);
while(_21e.hasNext()){
this._listNodesInMap(_21e.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_21f,map){
var list=new List();
var key=_21f.ElementKey;
var _223=new List(_21f.ClientElements);
map.set(key,list);
while(_223.hasNext()){
var _224=_223.getNext();
list.add(new SystemNode(_224));
}
};
this.getChildNodesBySearchToken=function(node,_226){
return this.getChildNodes(node,_226);
};
this.getNamedRoots=function(key,_228){
var _229=new List();
var _22a=null;
if(_228){
if(SearchTokens.hasToken(_228)){
_228=SearchTokens.getToken(_228);
}
_22a=TreeService.GetNamedRootsBySearchToken(key,_228);
}else{
_22a=TreeService.GetNamedRoots(key);
}
new List(_22a).each(function(_22b){
var node=new SystemNode(_22b);
if(_228){
node.searchToken=_228;
}
_229.add(node);
});
return _229;
};
this.getNamedRootsBySearchToken=function(key,_22e){
return this.getNamedRoots(key,_22e);
};
function compileActionList(node,_230,_231){
var _232=_230.ClientElementActionGroupId;
if(_232!=null){
var _233=_231.get(_232).ClientElementActionGroupItems;
if(_233&&_233.length>0){
node.setActionList(new List(_233));
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
new List(self._data.Actions).each(function(_239){
var _23a=_239.ActionCategory.Name;
if(SystemAction.hasCategory(_23a)){
var _23b=new SystemAction(_239);
SystemAction.actionMap.set(_239.ActionKey,_23b);
}else{
throw "No such action category: "+_23a;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _23c=null;
if(this.searchToken){
_23c=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_23c=System.getChildNodes(this);
}
return _23c;
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
var _23e=this._data.Piggybag;
if(_23e==null){
_23e="";
}
return _23e;
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
var _240=null;
if(typeof this._data.ToolTip!="undefined"){
_240=this._data.ToolTip;
}
return _240;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_242){
map[_242.Key]=_242.Value;
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
var _246=SystemAction.actionMap.get(key);
var _247=true;
if(_246.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_247=false;
}
}
if(_247){
var id=_246.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_246);
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
SystemAction.invoke=function(_24a,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_24a.logger.debug("Execute \""+_24a.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_24a.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_24d,_24e){
action=SystemAction.taggedActions.get(_24d);
node=SystemNode.taggedNodes.get(_24e);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_24f){
return SystemAction.categories[_24f]?true:false;
};
function SystemAction(_250){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_250;
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
var _251=null;
if(this.isInFolder()){
_251=this._data.ActionCategory.FolderName;
}
return _251;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _252=null;
if(typeof this._data.TagValue!="undefined"){
_252=this._data.TagValue;
}
return _252;
};
SystemAction.prototype.isChecked=function(){
var _253=null;
if(this.isCheckBox()){
_253=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _253;
};
function _UpdateManager(){
var _254=null;
if(!window.UpdateManager){
this._construct();
_254=this;
}
return _254;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_255){
var root=document.documentElement;
var _257=root.namespaceURI;
if(_257==null){
_257=new String(root.getAttribute("xmlns"));
}
if(_257=="http://www.w3.org/1999/xhtml"){
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
var _258=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_258);
}else{
throw new TypeError();
}
}else{
var _259=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_259.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _25b=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_25b=true;
}
},this);
return _25b;
},_setupForm:function(form){
var _25e=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_25e.isEnabled){
_25e._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_25f,type){
if(_25f.addEventListener!=null){
_25f.addEventListener(type,this,false);
}else{
var _261=this;
_25f.attachEvent("on"+type,function(){
_261.handleEvent(window.event);
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
var _266=UpdateAssistant.getUpdateZones(dom);
var _267=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_266.forEach(function(_268,_269){
var _26a=_267[_269];
this._crawl(_268,_26a);
},this);
this._updates.forEach(function(_26b,_26c){
_26b.update();
_26b.dispose();
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
},_crawl:function(_26e,_26f,_270,id){
var _272=true;
var _273=_26f.getAttribute("class");
if(_273==null||_273.indexOf(this.CLASSNAME_GONE)==-1){
if(_26f.nodeType==Node.ELEMENT_NODE){
var _274=_26f.getAttribute("id");
if(_274!=null){
_270=_26e;
id=_274;
}
}
if(_272=this._check(_26e,_26f,_270,id)){
var _275=_26e.firstChild;
var _276=_26f.firstChild;
while(_275!=null&&_276!=null&&!this._replaced[id]){
switch(_275.nodeType){
case Node.TEXT_NODE:
_272=this._check(_275,_276,_270,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_272=this._crawl(_275,_276,_270,id);
break;
}
if(this._replaced[id]){
_272=false;
}else{
_275=_275.nextSibling;
_276=_276.nextSibling;
}
}
}
}
return _272;
},_check:function(_277,_278,_279,id){
var _27b=true;
var _27c=null;
var _27d=false;
var _27e=false;
if((_277!=null&&_278==null)||(_277==null&&_278!=null)){
_27b=false;
}else{
if(_27b=_277.nodeType==_278.nodeType){
switch(_278.nodeType){
case Node.ELEMENT_NODE:
if(_277.namespaceURI!=_278.namespaceURI||_277.nodeName!=_278.nodeName){
_27b=false;
}else{
if(_27b=(_277.nodeName==_278.nodeName)){
var _27f=_278.getAttribute("id");
var _280=_277.getAttribute("id");
if(_27f!=null&&_280!=null){
if(_27f!=_280){
_27b=false;
}else{
if((_27c=this._getPlugin(_277,_278))!=null){
if(_27c.updateElement(_277,_278)){
_27e=true;
_27b=false;
}
}
}
}
if(_27b){
if(_27b=this._checkAttributes(_277,_278)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_277)&&this._hasSoftChildren(_278)){
if(this._validateSoftChildren(_277,_278)){
this._updateSoftChildren(_277,_278);
_27d=true;
}
_27b=false;
}else{
_27b=_277.childNodes.length==_278.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_277.data.trim()!=_278.data.trim()){
_27b=false;
}
break;
}
}
}
if(_27b==false&&!_27d&&!_27e){
if(id!=null&&_279!=null){
this.addUpdate(new ReplaceUpdate(id,_279));
}
}
return _27b;
},_checkAttributes:function(_281,_282){
var _283=true;
var _284=false;
var _285=_281.attributes;
var _286=_282.attributes;
if(_285.length!=_286.length){
_284=true;
}else{
_284=!Array.every(_285,function(att1,i){
var att2=_286.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_284){
var _28a=_281.getAttribute("id");
var _28b=_282.getAttribute("id");
if(this.hasSoftAttributes&&_28a!=null&&_28a==_28b){
this.addUpdate(new AttributesUpdate(_28b,_281,_282));
}else{
_283=false;
}
}
return _283;
},_hasSoftChildren:function(_28c){
var _28d=true;
if(_28c.hasChildNodes()){
_28d=Array.every(_28c.childNodes,function(node){
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
return _28d;
},_validateSoftChildren:function(_290,_291){
var _292=true;
var _293=-1;
var _294=-1;
var _295=-1;
var news=this._toMap(_290.childNodes,true);
var olds=this._toMap(_291.childNodes,true);
for(var id in olds){
if(_292){
var _299=olds[id];
_292=_299>=_293;
if(news[id]!=null){
_295=news[id];
_292=_295>=_294;
}
}
_293=_299;
if(_295>-1){
_294=_295;
}
}
return _292;
},_updateSoftChildren:function(_29a,_29b){
var news=this._toMap(_29a.childNodes);
var olds=this._toMap(_29b.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _29f=null;
for(id in news){
if(olds[id]==null){
var _2a0=news[id];
if(_29f==null){
var _2a1=_29b.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_2a1,_2a0,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29f,_2a0,false));
}
}
_29f=id;
}
},addUpdate:function(_2a2){
this._updates.push(_2a2);
if(_2a2 instanceof ReplaceUpdate){
this._replaced[_2a2.id]=true;
}
},_getPlugin:function(_2a3,_2a4){
var _2a5=null;
this.plugins.every(function(_2a6){
if(_2a6.handleElement(_2a3,_2a4)){
_2a5=_2a6;
}
return _2a5==null;
});
return _2a5;
},_toMap:function(_2a7,_2a8){
var _2a9={};
Array.forEach(_2a7,function(node,_2ab){
if(node.nodeType==Node.ELEMENT_NODE){
_2a9[node.getAttribute("id")]=_2a8?_2ab:node;
}
});
return _2a9;
},_getPost:function(form){
var _2ad=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2af){
if(_2af.name==null||_2af.name==""){
return;
}
var name=_2af.name;
var _2b1=encodeURIComponent(_2af.value);
switch(_2af.type){
case "button":
case "submit":
var _2b2=UpdateAssistant.getActiveElement();
if(_2af==_2b2&&name!=""){
_2ad+=name+"="+_2b1+"&";
}
break;
case "radio":
if(_2af.checked){
_2ad+=name+"="+_2b1+"&";
}
break;
case "checkbox":
if(_2af.checked){
if(_2af.name==last){
if(_2ad.lastIndexOf("&")==_2ad.length-1){
_2ad=_2ad.substr(0,_2ad.length-1);
}
_2ad+=","+_2b1;
}else{
_2ad+=name+"="+_2af.value;
}
last=name;
_2ad+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2ad+=name+"="+_2b1+"&";
break;
}
});
}
return _2ad.substr(0,_2ad.length-1);
},_postRequest:function(form){
var _2b4=form.method!=""?form.method:"get";
var _2b5=form.action!=""?form.action:window.location.toString();
var _2b6=this._getPost(form);
if(_2b4=="get"){
if(_2b5.indexOf("?")>-1){
_2b5=_2b5+"&"+_2b6;
}else{
_2b5+"?"+_2b6;
}
}
var _2b7=this;
var _2b8=UpdateAssistant.getXMLHttpRequest(_2b4,_2b5,this);
if(_2b4=="post"){
_2b8.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b8.send(_2b4=="post"?_2b6:null);
},_fixdotnet:function(dom,id){
var _2bb=document.getElementById(id);
if(_2bb!=null){
var _2bc=UpdateAssistant.getElementById(dom,id);
if(_2bc!=null){
var _2bd=_2bc.getAttribute("value");
if(_2bd!==_2bb.value){
_2bb.value=_2bd;
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
},report:function(_2c0){
this.summary+=_2c0+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2c1=null;
if(!window.UpdateAssistant){
this._construct();
_2c1=this;
}
return _2c1;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2c2,fun){
var _2c4=true;
var len=_2c2.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c6=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c2[i]!="undefined"){
if(!fun.call(_2c6,_2c2[i],i,_2c2)){
_2c4=false;
break;
}
}
}
}
return _2c4;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c9=arguments[1];
return Array.every(this,fun,_2c9);
};
}
if(!Array.forEach){
Array.forEach=function(_2ca,fun){
var len=_2ca.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2cd=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2ca[i]!="undefined"){
fun.call(_2cd,_2ca[i],i,_2ca);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2d0=arguments[1];
Array.forEach(this,fun,_2d0);
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
},getXMLHttpRequest:function(_2d2,_2d3,_2d4){
var _2d5=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2d5!=null){
_2d5.open(_2d2,_2d3,(_2d4!=null?true:false));
if(_2d4!=null){
function action(){
if(_2d5.readyState==4){
var _2d6=_2d5.getResponseHeader("X-Error-Type");
if(_2d6){
var _2d7="";
for(var i=0;i<10;i++){
var _2d9=i?i:"";
var _2d6=_2d5.getResponseHeader("X-Error-Type"+_2d9);
if(!_2d6){
break;
}
var _2da=_2d5.getResponseHeader("X-Error-Message"+_2d9);
_2d7+=_2d6+"\n"+_2da+"\n";
}
Dialog.error("Error",_2d7);
}else{
var text=_2d5.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d4.handleResponse(dom);
}
}
}
}
if(_2d5.addEventListener!=null){
_2d5.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2d5.onreadystatechange=action;
}
}
}
return _2d5;
},dispatchEvent:function(_2dd,name){
var _2df=true;
var _2e0=document.createEvent("UIEvents");
_2e0.initEvent(name,true,true);
_2df=_2dd.dispatchEvent(_2e0);
return _2df;
},getUpdateZones:function(dom){
var _2e2="//*[@id and contains(@class,'updatezone')]";
var _2e3=[];
var _2e4=null;
var _2e5=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e4=dom.evaluate(_2e2,dom,null,type,null);
while((_2e5=_2e4.iterateNext())!=null){
_2e3.push(_2e5);
}
}else{
_2e4=dom.documentElement.selectNodes(_2e2);
Array.forEach(_2e4,function(_2e7){
_2e3.push(_2e7);
});
}
return _2e3;
},getElementById:function(dom,id){
var _2ea="//*[@id='"+id+"']";
var _2eb=null;
var _2ec=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2eb=dom.evaluate(_2ea,dom,null,type,null);
_2ec=_2eb.singleNodeValue;
}else{
_2ec=dom.documentElement.selectNodes(_2ea)[0];
}
return _2ec;
},_getIds:function(dom){
var _2ef="//*[@id]";
var _2f0=null;
var _2f1=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2f0=dom.evaluate(_2ef,dom,null,type,null);
while((element=_2f0.iterateNext())!=null){
_2f1.push(element.getAttribute("id"));
}
}else{
_2f0=dom.documentElement.selectNodes(_2ef);
Array.forEach(_2f0,function(_2f3){
_2f1.push(_2f3.getAttribute("id"));
});
}
return _2f1;
},toHTMLElement:function(_2f4){
var _2f5=this.serialize(_2f4);
var temp=document.createElement("temp");
temp.innerHTML=_2f5;
return temp.firstChild;
},getActiveElement:function(){
var _2f7=document.activeElement;
if(_2f7==null||_2f7==document.body){
_2f7=this._activeElement;
}
return _2f7;
},serialize:function(_2f8){
var _2f9=null;
if(_2f8.xml!=null){
_2f9=_2f8.xml;
}else{
if(this._serializer!=null){
_2f9=this._serializer.serializeToString(_2f8);
}
}
return _2f9;
},hasDifferences:function(_2fa,_2fb){
var s1=null;
var s2=null;
if(_2fa.xml!=null){
s1=_2fa.xml;
s2=_2fb.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2fa);
s2=this._serializer.serializeToString(_2fb);
}
}
return s1!=s2;
},parse:function(_2fe){
var _2ff=null;
if(this._parser!=null&&window.XPathResult!=null){
_2ff=this._parser.parseFromString(_2fe,"text/xml");
}else{
_2ff=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2ff.setProperty("SelectionLanguage","XPath");
_2ff.loadXML(_2fe);
}
return this._validate(_2ff);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _302=dom.getElementsByTagName("parsererror").item(0);
if(_302!=null){
out=_302.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _306=!has[id];
has[id]=true;
if(!_306){
out="Element \""+id+"\" encountered twice.";
}
return _306;
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
this.handleElement=function(_307,_308){
var _309=false;
switch(_307.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_307.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_309=false;
break;
}
break;
}
return _309;
};
this.updateElement=function(_30a,_30b){
var id=_30a.getAttribute("id");
var _30d=document.getElementById(id);
if(_30d!=null){
var _30e=null;
switch(_30d.nodeName.toLowerCase()){
case "input":
_30e=_30a.getAttribute("value");
break;
case "textarea":
_30e=_30a.textContent?_30a.textContent:_30a.text;
break;
}
if(_30e==null){
_30e="";
}
if(_30e!=_30d.value){
_30d.value=_30e;
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
},_beforeUpdate:function(_30f){
var _310=true;
if(_30f!=null){
_30f.__updateType=this.type;
_310=UpdateAssistant.dispatchEvent(_30f,Update.EVENT_BEFOREUPDATE);
}
return _310;
},_afterUpdate:function(_311){
var _312=true;
if(_311!=null){
_311.__updateType=this.type;
_312=UpdateAssistant.dispatchEvent(_311,Update.EVENT_AFTERUPDATE);
}
return _312;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_314){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_314;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _315,_316,_317=UpdateAssistant.toHTMLElement(this.element);
if((_315=document.getElementById(this.id))!=null){
if((_316=_315.parentNode)!=null){
var _318=UserInterface.getBinding(_315);
if(_318!=null){
_317.__isAttached=_318.isAttached;
}
if(this._beforeUpdate(_315)){
_316.replaceChild(_317,_315);
this._afterUpdate(_317);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_319){
var _31a=ReplaceUpdate.superclass._afterUpdate.call(this,_319);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_319.nodeName=="form"||_319.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _31a;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_31d,_31e){
this.type=type;
this.id=id;
this.element=_31d;
this.isFirst=_31e;
return this;
}
SiblingUpdate.prototype.update=function(){
var _31f=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_31f);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_31f);
break;
}
};
SiblingUpdate.prototype._remove=function(_320){
var _321=_320.parentNode;
if(_321!=null){
if(this._beforeUpdate(_320)){
_321.removeChild(_320);
this._afterUpdate(_321);
}
}
};
SiblingUpdate.prototype._insert=function(_322,_323){
var _324=UpdateAssistant.toHTMLElement(_322);
if(this.isFirst){
var _325=_323;
if(_325!=null){
if(this._beforeUpdate(_325)){
_325.insertBefore(_324,_325.firstChild);
this._afterUpdate(_324);
}
}
}else{
var _325=_323.parentNode;
if(_325!=null){
if(this._beforeUpdate(_325)){
_325.insertBefore(_324,_323.nextSibling);
this._afterUpdate(_324);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_326){
var _327=SiblingUpdate.superclass._beforeUpdate.call(this,_326);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_326.id+"\"");
}
return _327;
};
SiblingUpdate.prototype._afterUpdate=function(_328){
var _329=true;
if(_328!=null){
_329=SiblingUpdate.superclass._afterUpdate.call(this,_328);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_328.id+"\"");
if(_328.nodeName=="form"||_328.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _329;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_32b,_32c){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_32b;
this.currentElement=_32c;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _32d=document.getElementById(this.id);
if(this._beforeUpdate(_32d)){
this._updateAttributes(_32d);
this._afterUpdate(_32d);
}
};
AttributesUpdate.prototype._updateAttributes=function(_32e){
Array.forEach(this.element.attributes,function(_32f){
var _330=this.currentElement.getAttribute(_32f.nodeName);
if(_330==null||_330!=_32f.nodeValue){
this._setAttribute(_32e,_32f.nodeName,_32f.nodeValue);
this._summary.push("@"+_32f.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_331){
if(this.element.getAttribute(_331.nodeName)==null){
this._setAttribute(_32e,_331.nodeName,null);
this._summary.push("@"+_331.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_332,name,_334){
if(_332==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_334);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _335=(_334==null);
if(_335){
_332.removeAttribute(name);
}else{
_332.setAttribute(name,_334);
}
if(document.all!=null){
if(_335){
_334="";
}
switch(name.toLowerCase()){
case "class":
_332.className=_334;
break;
case "disabled":
_332.disabled=!_335;
break;
case "checked":
_332.checked=!_335;
break;
case "readonly":
_332.readOnly=!_335;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_336){
AttributesUpdate.superclass._afterUpdate.call(this,_336);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_337,key){
return _337.replace("${windowkey}",document.location+":"+key);
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
var _33b=this._newDimensions.w!=this._currentDimensions.w;
var _33c=this._newDimensions.h!=this._currentDimensions.h;
if(_33b||_33c){
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
},fireOnDOM:function(_33e){
if(Interfaces.isImplemented(IDOMHandler,_33e,true)){
this._ondomstatements.add(_33e);
}
},fireOnLoad:function(_33f){
if(Interfaces.isImplemented(ILoadHandler,_33f,true)){
this._onloadstatements.add(_33f);
}
},fireOnResize:function(_340){
if(Interfaces.isImplemented(IResizeHandler,_340,true)){
this._onresizestatements.add(_340);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_341){
return eval(_341);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_342,_343){
SystemLogger.unsuspend(_343);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_344,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _347=top.app.bindingMap.broadcasterHasDirtyTabs;
_347.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_348,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _34b=top.app.bindingMap.broadcasterHasDirtyTabs;
_34b.disable();
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
var _34c=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_34c=LoginService.Logout(true);
if(!_34c){
alert("Logout failed.");
}
}
return _34c;
},lock:function(_34d){
if(_34d!=null){
this._lockthings[_34d]=true;
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
},unlock:function(_34e,_34f){
if(_34e!=null){
delete this._lockthings[_34e];
if(top.bindingMap.mastercover!=null){
if(_34f||this._lockers>0){
if(_34f){
var out="Unlocked by "+new String(_34e)+"\n";
for(var _351 in this._lockthings){
out+="Locked by "+new String(_351)+". ";
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
},hasLock:function(_352){
return this._lockthings[_352]==true;
},activate:function(_353){
var _354=this._activeBinding;
this._activeBinding=_353;
this._activatedBindings.add(_353);
if(_354&&_354.isActive){
_354.deActivate();
}
},deActivate:function(_355){
var _356=null;
var _357=null;
if(_355==this._activeBinding){
while(!_357&&this._activatedBindings.hasEntries()){
_356=this._activatedBindings.extractLast();
if(_356!=_355&&_356.isActivatable){
_357=_356;
}
}
if(!_357){
_357=app.bindingMap.explorerdock;
}
_357.activate();
}
},focused:function(_358){
this.isFocused=_358;
if(_358){
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
},handleAction:function(_35d){
switch(_35d.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _35f=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_361){
var src=_361.src;
if(src.indexOf(_35f)>-1){
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
var _366=false;
if(this._isMousePositionTracking){
_366=true;
if(Client.isExplorer&&e.button!=1){
_366=false;
}
if(_366){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _366;
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
},onDragStart:function(_368){
var _369=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_369,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_369.getImage());
this._cursorStartPoint=_368;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_369.showDrag){
_369.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_369.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _36b=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_36b);
}
},onDragStop:function(diff){
if(this._isDragging){
var _36d=BindingDragger.draggedBinding;
if(_36d.hideDrag){
_36d.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_36d.dragType);
this._isDragging=false;
_36d=BindingAcceptor.acceptingBinding;
if(_36d!=null){
if(Interfaces.isImplemented(IAcceptable,_36d,true)==true){
_36d.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_36d);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_36e){
if(this.isDeveloperMode||_36e){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_36f){
if(_36f==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_370){
switch(_370){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_372){
switch(_372.Key){
case "ProductVersion":
this.versionString=_372.Value;
break;
case "ProductTitle":
this.versionPrettyString=_372.Value;
break;
case "InstallationId":
this.installationID=_372.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_372.Value;
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
var _375=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _376={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _377=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_377){
for(var key in _377){
_376[key]=_377[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_376);
}
}});
this.getPref=function(key){
var _37a=null;
if(key){
_37a=_376[key];
}else{
throw "No such preference.";
}
return _37a;
};
this.setPref=function(key,_37c){
if(key){
_376[key]=_37c;
}else{
throw "No such preference.";
}
};
function debug(_37d){
var _37e=_37d?"Persisted preferences":"No persisted preferences. Using defaults";
_37e+=":\n";
for(var key in _376){
var pref=_376[key];
_37e+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_375.fine(_37e);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _383=null;
if(this.isInitialized==true){
if(this._persistance){
var _384=this._persistance[id];
if(_384){
_383=_384[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _383;
},setPersistedProperty:function(id,prop,_387){
if(this.isInitialized==true){
if(this._persistance){
if(_387!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_387);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_388){
switch(_388){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _389=top.bindingMap.persistance;
_389.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _38a=top.bindingMap.persistance;
var map=_38a.getPersistanceMap();
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
function StandardEventHandler(doc,_38d){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_38d;
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
var _391={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_391);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_391);
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
var _398=UserInterface.getBinding(node);
if(_398!=null){
_398.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_398!=null?null:node.parentNode;
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
var _39b=Application.trackMousePosition(e);
if(_39b){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_39e){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_39e){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_39e=true;
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
var _39f=KeySetBinding.handleKey(this._contextDocument,e);
if(!_39f){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _3a0=this._contextWindow.frameElement;
if(_3a0!=null){
var _3a1=DOMUtil.getParentWindow(_3a0);
if(_3a1.standardEventHandler!=null){
_3a1.standardEventHandler._handleKeyDown(e,_39e);
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
var _3a4=false;
var _3a5=DOMEvents.getTarget(e);
var name=_3a5.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_3a4=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_3a4;
}
if(_3a4){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a8){
this._isAllowTabs=(_3a8==true?true:false);
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
function Action(_3ab,type){
this.target=_3ab;
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
function Animation(_3ad){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3ae in _3ad){
this[_3ae]=_3ad[_3ae];
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
Animation.prototype.onstart=function(_3b2){
};
Animation.prototype.onstep=function(_3b3){
};
Animation.prototype.onstop=function(_3b4){
};
Point.isEqual=function(p1,p2){
var _3b7=false;
if(p1&&p2){
_3b7=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b7;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3bc=false;
if(dim1&&dim2){
_3bc=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3bc;
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
function BindingAcceptor(_3c3){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3c3;
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
var _3c4=new List(this._binding.dragAccept.split(" "));
while(_3c4.hasNext()){
var type=_3c4.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3c6,arg){
var type=arg;
try{
switch(_3c6){
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
function BindingBoxObject(_3cb){
this._domElement=_3cb.getBindingElement();
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
function BindingDragger(_3cd){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3cd;
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
BindingDragger.prototype.registerHandler=function(_3cf){
if(Interfaces.isImplemented(IDragHandler,_3cf)==true){
this.handler=_3cf;
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
var _3d2=e.button==(e.target?0:1);
if(_3d2){
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
var _3d4=Application.getMousePosition();
var dx=_3d4.x-this.startPoint.x;
var dy=_3d4.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d7,e){
switch(_3d7){
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
function BindingParser(_3d9){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d9;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3da){
var _3db=new List();
var xml=BindingParser.XML.replace("${markup}",_3da);
var doc=XMLParser.parse(_3da);
if(doc){
var _3de=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3de);
var node=_3de.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3db.add(node);
}
node=node.nextSibling;
}
}
return _3db;
};
BindingParser.prototype._iterate=function(_3e0,_3e1){
var _3e2=null;
switch(_3e0.nodeType){
case Node.ELEMENT_NODE:
_3e2=this._cloneElement(_3e0);
UserInterface.registerBinding(_3e2);
break;
case Node.TEXT_NODE:
_3e2=this._ownerDocument.createTextNode(_3e0.nodeValue);
break;
}
if(_3e2){
_3e1.appendChild(_3e2);
}
if(_3e2&&_3e0.hasChildNodes()){
var _3e3=_3e0.firstChild;
while(_3e3){
this._iterate(_3e3,_3e2);
_3e3=_3e3.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3e4){
var _3e5=DOMUtil.createElementNS(_3e4.namespaceURI?_3e4.namespaceURI:Constants.NS_XHTML,_3e4.nodeName,this._ownerDocument);
var i=0;
while(i<_3e4.attributes.length){
var attr=_3e4.attributes.item(i++);
_3e5.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3e5;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e8){
var _3e9=null;
var _3ea=false;
var _3eb=_3e8.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e8)){
var _3ec=UserInterface.getBinding(_3e8);
_3ea=BindingSerializer.activeInstance.indexBinding(_3ec);
if(_3ea){
_3e9=_3ec.key;
_3e8.setAttribute(BindingSerializer.KEYPOINTER,_3e9);
}
}
_3e9=_3e9?_3e9:_3eb;
var _3ed=new List(_3e8.childNodes);
_3ed.each(function(_3ee){
if(_3ee.nodeType==Node.ELEMENT_NODE){
_3ee.setAttribute(BindingSerializer.KEYPOINTER,_3e9);
}
});
if(_3ea){
BindingSerializer.activeInstance.append(_3e9,_3eb);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ef){
BindingSerializer.activeInstance=this;
_3ef.bindingWindow.ElementIterator.iterate(_3ef.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3f0){
var _3f1=false;
var _3f2=_3f0.serialize();
if(_3f2!=false){
_3f1=true;
var _3f3="ui:"+DOMUtil.getLocalName(_3f0.bindingElement);
var _3f4=DOMUtil.createElementNS(Constants.NS_UI,_3f3,this._dom);
this._pointers[_3f0.key]=_3f4;
for(var prop in _3f2){
if(_3f2[prop]!=null){
_3f4.setAttribute(prop,String(_3f2[prop]));
}
}
}
return _3f1;
};
BindingSerializer.prototype.append=function(_3f6,_3f7){
var _3f8=this._pointers[_3f6];
var _3f9=_3f7?this._pointers[_3f7]:this._dom;
_3f9.appendChild(_3f8);
};
function ImageProfile(_3fa){
this._default=_3fa.image;
this._hover=_3fa.imageHover;
this._active=_3fa.imageActive;
this._disabled=_3fa.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3fb){
this._default=_3fb;
};
ImageProfile.prototype.getHoverImage=function(){
return this._default;
};
ImageProfile.prototype.setHoverImage=function(_3fc){
this._hover=_3fc;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3fd){
this._active=_3fd;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._default;
};
ImageProfile.prototype.setDisabledImage=function(_3fe){
this._disabled=_3fe;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3ff,_400,_401){
var _402=null;
if(_3ff.isAttached){
_402=new List();
var _403=_401?_3ff.getChildElementsByLocalName(_400):_3ff.getDescendantElementsByLocalName(_400);
_403.each(function(_404){
var _405=UserInterface.getBinding(_404);
if(_405){
_402.add(_405);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3ff.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _402;
},getAncestorBindingByType:function(_407,impl,_409){
var _40a=null;
if(Binding.exists(_407)){
var node=_407.bindingElement;
while(_40a==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _40c=UserInterface.getBinding(node);
if(_40c instanceof impl){
_40a=_40c;
}
}else{
if(_409&&node.nodeType==Node.DOCUMENT_NODE){
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
return _40a;
},getAncestorBindingByLocalName:function(_40e,_40f,_410){
var _411=null;
if(_40f=="*"){
var node=_40e.bindingElement;
while(!_411&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_411=UserInterface.getBinding(node);
}
}
}else{
_411=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_40f,_40e.bindingElement,_410));
}
return _411;
},getChildElementsByLocalName:function(_413,_414){
var _415=new List();
var _416=new List(_413.bindingElement.childNodes);
_416.each(function(_417){
if(_417.nodeType==Node.ELEMENT_NODE){
if(_414=="*"||DOMUtil.getLocalName(_417)==_414){
_415.add(_417);
}
}
});
return _415;
},getChildBindingByType:function(_418,impl){
var _41a=null;
_418.getChildElementsByLocalName("*").each(function(_41b){
var _41c=UserInterface.getBinding(_41b);
if(_41c!=null&&_41c instanceof impl){
_41a=_41c;
return false;
}else{
return true;
}
});
return _41a;
},getDescendantBindingByType:function(_41d,impl){
var _41f=null;
_41d.getDescendantElementsByLocalName("*").each(function(_420){
var _421=UserInterface.getBinding(_420);
if(_421!=null&&_421 instanceof impl){
_41f=_421;
return false;
}else{
return true;
}
});
return _41f;
},getDescendantBindingsByType:function(_422,impl){
var _424=new List();
_422.getDescendantElementsByLocalName("*").each(function(_425){
var _426=UserInterface.getBinding(_425);
if(_426!=null&&_426 instanceof impl){
_424.add(_426);
}
return true;
});
return _424;
},getNextBindingByLocalName:function(_427,name){
var _429=null;
var _42a=_427.bindingElement;
while((_42a=DOMUtil.getNextElementSibling(_42a))!=null&&DOMUtil.getLocalName(_42a)!=name){
}
if(_42a!=null){
_429=UserInterface.getBinding(_42a);
}
return _429;
},getPreviousBindingByLocalName:function(_42b,name){
var _42d=null;
var _42e=_42b.bindingElement;
while((_42e=DOMUtil.getPreviousElementSibling(_42e))!=null&&DOMUtil.getLocalName(_42e)!=name){
}
if(_42e!=null){
_42d=UserInterface.getBinding(_42e);
}
return _42d;
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
},addFilter:function(_42f){
this._filters.add(_42f);
},removeFilter:function(_430){
var _431=-1;
this._filters.each(function(fil){
_431++;
var _433=true;
if(fil==_430){
_433=false;
}
return _433;
});
if(_431>-1){
this._filters.del(_431);
}
},_applyFilters:function(node,arg){
var _436=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _439=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _43a=true;
while(this._filters.hasNext()&&_43a==true){
var _43b=this._filters.getNext();
var res=_43b.call(this,node,arg);
if(res!=null){
_436=res;
switch(res){
case stop:
case skip:
case skip+_439:
_43a=false;
break;
}
}
}
return _436;
},crawl:function(_43d,arg){
this.contextDocument=_43d.ownerDocument;
this.onCrawlStart();
var _43f=this.type==NodeCrawler.TYPE_ASCENDING;
var _440=this._applyFilters(_43d,arg);
if(_440!=NodeCrawler.STOP_CRAWLING){
if(_43f&&_440==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_43f?_43d.parentNode:_43d;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_442,arg){
var _444=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_444=this._crawlDescending(_442,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_444=this._crawlAscending(_442,arg);
break;
}
return _444;
},_crawlDescending:function(_445,arg){
var skip=NodeCrawler.SKIP_NODE;
var _448=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _44a=null;
if(_445.hasChildNodes()){
var node=_445.firstChild;
while(node!=null&&_44a!=stop){
this.currentNode=node;
_44a=this._applyFilters(node,arg);
switch(_44a){
case stop:
case _448:
case skip+_448:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_44a=stop;
break;
}
}
}
if(_44a!=stop&&_44a!=skip){
this.previousNode=node;
}
break;
}
if(_44a!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _44a;
},_crawlAscending:function(_44d,arg){
var _44f=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_44d!=null){
this.currentNode=_44d;
_44f=this._applyFilters(_44d,arg);
if(_44f!=stop){
var next=this.nextNode?this.nextNode:_44d.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_44d;
_44f=this._crawl(next,arg);
}
}
}else{
_44f=stop;
}
return _44f;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _453 in this){
this[_453]=null;
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
var _456=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_456=NodeCrawler.SKIP_NODE;
}
return _456;
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
this.addFilter(function(_457,arg){
var _459=null;
if(!UserInterface.hasBinding(_457)){
_459=NodeCrawler.SKIP_NODE;
}
return _459;
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
this.addFilter(function(_45b,arg){
var _45d=null;
var _45e=UserInterface.getBinding(_45b);
if(Interfaces.isImplemented(ICrawlerHandler,_45e)==true){
self.response=null;
_45e.handleCrawler(self);
_45d=self.response;
}
return _45d;
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
this.addFilter(function(_460,list){
var _462=null;
var _463=UserInterface.getBinding(_460);
if(Interfaces.isImplemented(IFlexible,_463)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_463);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_463.isFlexSuspended==true){
_462=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_463);
}
break;
}
}
return _462;
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
this.addFilter(function(_464,list){
var _466=null;
var _467=UserInterface.getBinding(_464);
if(_467.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_467)==true){
if(_467.isFocusable&&_467.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_467);
break;
case FocusCrawler.MODE_FOCUS:
if(!_467.isFocused){
_467.focus();
}
_466=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_467.isFocused==true){
_467.blur();
_466=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _466;
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
this.addFilter(function(_468,list){
var _46a=null;
var _46b=UserInterface.getBinding(_468);
if(!_46b.isVisible){
_46a=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _46a;
});
this.addFilter(function(_46c,list){
var _46e=null;
var _46f=UserInterface.getBinding(_46c);
if(_46f.isAttached){
if(Interfaces.isImplemented(IFit,_46f)){
if(!_46f.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_46f);
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
UpdateAssistant.serialize=function(_470){
_470=_470.cloneNode(true);
_470.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_470.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_470);
};
}
},handleEvent:function(e){
var _472=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_472);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_472);
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
},_beforeUpdate:function(_473){
var _474=(_473==document.documentElement);
if(_474){
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
var _477=FocusBinding.focusedBinding;
if(_477!=null){
this._focusID=_477.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_473.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_473);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_473,false);
break;
}
}
},_afterUpdate:function(_478){
var _479=(_478==document.documentElement);
if(_479){
var _47a=this._elementsbuffer;
if(_47a.hasEntries()){
_47a.each(function(_47b){
DocumentManager.attachBindings(_47b);
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
var _47e=FocusBinding.focusedBinding;
if(_47e==null){
var _47f=document.getElementById(this._focusID);
if(_47f!=null){
var _47e=UserInterface.getBinding(_47f);
if(_47e!=null){
_47e.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _480=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _481="NEW DOM: "+document.title+"\n\n"+_480+"\n\n";
_481+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_481);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_478.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_478);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_478,true);
break;
}
switch(_478.id){
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
var _47e=UserInterface.getBinding(_478);
while(_47e==null&&_478!=null){
_47e=UserInterface.getBinding(_478);
_478=_478.parentNode;
}
if(_47e!=null){
_47e.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_483,_484){
var _485=UserInterface.getBinding(_483);
if(_485!=null){
if(_484){
var _486=this._attributesbuffer;
var map=new Map();
_486.each(function(name,old){
var now=_483.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_483.attributes).each(function(att){
if(att.specified){
if(!_486.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_48d){
var _48e=_485.propertyMethodMap[name];
if(_48e!=null){
_48e.call(_485,_48d);
}
});
}else{
var map=new Map();
new List(_483.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_490,_491){
var _492=window.bindingMap[_490.getAttribute("id")];
if(_492!=null){
return _492.handleElement(_490,_491);
}
},updateElement:function(_493,_494){
var _495=window.bindingMap[_493.getAttribute("id")];
if(_495!=null){
return _495.updateElement(_493,_494);
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
this.addFilter(function(_497,list){
var _499=UserInterface.getBinding(_497);
var _49a=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_499==null){
UserInterface.registerBinding(_497);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_499!=null){
if(!_499.isAttached){
list.add(_499);
}
if(_499.isLazy==true){
_49a=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_499!=null){
list.add(_499);
}
break;
}
return _49a;
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
},handleBroadcast:function(_49b,arg){
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
var _49e=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_49e)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_49e!=null){
if(_49e.href!=null&&_49e.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _49f=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_49f!=null){
var map={};
var _4a1=DOMUtil.getElementsByTagName(_49f,"bindingmapping");
new List(_4a1).each(function(_4a2){
var _4a3=_4a2.getAttribute("element");
var _4a4=_4a2.getAttribute("binding");
map[_4a3]=eval(_4a4);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_4a5){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_4a5;
}else{
this.customUserInterfaceMapping.merge(_4a5);
}
},_registerBindings:function(_4a6){
var _4a7=new DocumentCrawler();
_4a7.mode=DocumentCrawler.MODE_REGISTER;
_4a7.crawl(_4a6);
_4a7.dispose();
},_attachBindings:function(_4a8){
var _4a9=new DocumentCrawler();
_4a9.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a9.crawl(_4a8,list);
var _4ab=false;
while(list.hasNext()){
var _4ac=list.getNext();
if(!_4ac.isAttached){
_4ac.onBindingAttach();
if(!_4ac.memberDependencies){
_4ac.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4ac)){
_4ab=true;
}
}
}
if(_4ab){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a9.dispose();
list.dispose();
},attachBindings:function(_4ae){
this._registerBindings(_4ae);
this._attachBindings(_4ae);
},detachBindings:function(_4af,_4b0){
var _4b1=new DocumentCrawler();
_4b1.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4b1.crawl(_4af,list);
if(_4b0==true){
list.extractFirst();
}
var _4b3=false;
list.reverse().each(function(_4b4){
if(Interfaces.isImplemented(IData,_4b4)){
_4b3=true;
}
_4b4.dispose(true);
});
if(_4b3){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4b1.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4b6){
return (/textarea|input/.test(DOMUtil.getLocalName(_4b6)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b7){
this.isDirty=true;
var _4b8=false;
if(_4b7!=null&&!_4b7.isDirty){
_4b7.isDirty=true;
_4b7.dispatchAction(Binding.ACTION_DIRTY);
_4b8=true;
}
return _4b8;
},clean:function(_4b9){
if(_4b9.isDirty){
_4b9.isDirty=false;
}
},registerDataBinding:function(name,_4bb){
if(Interfaces.isImplemented(IData,_4bb,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4bb;
}
}else{
throw "Invalid DataBinding: "+_4bb;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4be=null;
if(this._dataBindings[name]!=null){
_4be=this._dataBindings[name];
}
return _4be;
},getAllDataBindings:function(_4bf){
var list=new List();
for(var name in this._dataBindings){
var _4c2=this._dataBindings[name];
list.add(_4c2);
if(_4bf&&_4c2 instanceof WindowBinding){
var _4c3=_4c2.getContentWindow().DataManager;
if(_4c3!=null){
list.merge(_4c3.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4c4=false;
for(var name in this._dataBindings){
_4c4=true;
break;
}
return _4c4;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c8){
var _4c9=this._dataBindings[name];
if(_4c9!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c9.setResult(_4c8);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c9);
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
var _4ca=new DataBindingMap();
_4ca.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4cc=this._dataBindings[name];
if(_4cc instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4ca[name]=_4cc.getValue();
}
return _4ca;
},getDataBindingResultMap:function(){
var _4cd=new DataBindingMap();
_4cd.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4cf=this._dataBindings[name];
var res=_4cf.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4d2){
_4cd.set(name,_4d2);
});
}else{
_4cd.set(name,res);
}
}
return _4cd;
},getPostBackString:function(){
var _4d3="";
var form=document.forms[0];
if(form!=null){
var _4d5="";
new List(form.elements).each(function(_4d6){
var name=_4d6.name;
var _4d8=encodeURIComponent(_4d6.value);
switch(_4d6.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4d3+=name+"="+_4d8+"&";
break;
case "submit":
if(document.activeElement==_4d6){
_4d3+=name+"="+_4d8+"&";
}
break;
case "radio":
if(_4d6.checked){
_4d3+=name+"="+_4d8+"&";
}
break;
case "checkbox":
if(_4d6.checked){
if(_4d6.name==_4d5){
if(_4d3.lastIndexOf("&")==_4d3.length-1){
_4d3=_4d3.substr(0,_4d3.length-1);
}
_4d3+=","+_4d8;
}else{
_4d3+=name+"="+_4d6.value;
}
_4d5=name;
_4d3+="&";
}
break;
}
});
}
return _4d3.substr(0,_4d3.length-1);
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
var _4e1=null;
var _4e2=null;
var _4e3=false;
if(!this._cache[name]){
_4e3=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4e5=DOMUtil.getXMLHTTPRequest();
_4e5.open("get",uri,false);
_4e5.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4e5.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4e2=_4e5.responseText;
break;
default:
_4e2=_4e5.responseXML;
break;
}
if(_4e2==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4e2;
}
}
_4e2=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4e1=_4e2;
break;
case this._modes.MODE_DOCUMENT:
_4e1=DOMUtil.cloneNode(_4e2,true);
break;
case this._modes.MODE_ELEMENT:
_4e1=DOMUtil.cloneNode(_4e2.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4e1=DOMSerializer.serialize(_4e2,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4e1=DOMSerializer.serialize(_4e2.documentElement,true);
break;
}
if(_4e3&&Application.isDeveloperMode){
}
return _4e1;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e8){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e8];
},invoke:function(url,_4ea,_4eb){
this._logger.error("Not implemented");
},invokeModal:function(url,_4ed,_4ee){
var _4ef=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4ed,argument:_4ee});
StageBinding.presentViewDefinition(_4ef);
return _4ef;
},invokeDefinition:function(_4f0){
if(_4f0 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4f0);
}
return _4f0;
},question:function(_4f1,text,_4f3,_4f4){
if(!_4f3){
_4f3=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4f1,text,_4f3,_4f4);
},message:function(_4f5,text,_4f7,_4f8){
if(!_4f7){
_4f7=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4f5,text,_4f7,_4f8);
},error:function(_4f9,text,_4fb,_4fc){
if(!_4fb){
_4fb=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f9,text,_4fb,_4fc);
},warning:function(_4fd,text,_4ff,_500){
if(!_4ff){
_4ff=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4fd,text,_4ff,_500);
},_standardDialog:function(type,_502,text,_504,_505){
var _506=null;
if(!_504){
_506=new List(Dialog.BUTTONS_ACCEPT);
}else{
_506=new List();
new List(_504).each(function(_507){
var _508=null;
switch(typeof _507){
case "object":
_508=_507;
break;
case "string":
var _509=false;
if(_507.indexOf(":")>-1){
_507=_507.split(":")[0];
_509=true;
}
_508=Dialog.dialogButton(_507);
if(_509){
_508.isDefault=true;
}
break;
}
_506.add(_508);
});
}
var _50a={title:_502,text:text,type:type,image:this._dialogImages[type],buttons:_506};
var _50b=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_505,argument:_50a});
StageBinding.presentViewDefinition(_50b);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_50d,arg){
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
},saveAll:function(_510){
var self=this;
var _512=Application.getDirtyDockTabsTabs();
if(_512.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_513,_514){
switch(_513){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_514,_510);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_512);
}else{
if(_510){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_515,_516){
var _517=false;
var list=new List();
_515.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_517=true;
var _51b=list.getLength();
var _51c={handleBroadcast:function(_51d,tab){
if(--_51b==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_516){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_51c);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _517;
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
var _521="Composite.Management.Help";
if(!StageBinding.isViewOpen(_521)){
StageBinding.handleViewPresentation(_521);
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
var _523=document.createEvent("Events");
_523.initEvent(type,true,true);
window.dispatchEvent(_523);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _525=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _526=_525.exec(url?url:"");
if(_526){
if(_526[3]=="media"){
this.isMedia=true;
}else{
if(_526[3]=="page"){
this.isPage=true;
}
}
}
var _527={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_527[$1]=$3;
});
this.queryString=_527;
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
Uri.prototype.setParam=function(key,_530){
if(_530==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_530;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _532=[];
for(var key in this.queryString){
_532.push(key+"="+this.queryString[key]);
}
if(_532.length>0){
url+="?"+_532.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_534,_535){
var _536=null;
var _537=ViewDefinitions[_534];
if(_537.isMutable){
var impl=null;
if(_537 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_535!=null&&impl!=null){
var def=new impl();
for(var prop in _537){
def[prop]=ViewDefinition.cloneProperty(_537[prop]);
}
def.handle=_535;
_536=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _536;
};
ViewDefinition.cloneProperty=function(_53b){
if(null==_53b){
return _53b;
}
if(typeof _53b==="object"){
var _53c=(_53b.constructor===Array)?[]:{};
for(var prop in _53b){
_53c[prop]=ViewDefinition.cloneProperty(_53b[prop]);
}
return _53c;
}
return _53b;
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
Binding.CLASSNAME_CLEARFLOAT="clearfloatelement";
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
Binding.evaluate=function(_543,_544){
var _545=null;
var _546=_544.bindingWindow.WindowManager;
if(_546!=null){
var _547=Binding.parseScriptStatement(_543,_544.key);
_545=_546.evaluate(_547);
}
return _545;
};
Binding.parseScriptStatement=function(_548,key){
if(_548!=null&&key!=null){
var _54a="UserInterface.getBindingByKey ( \""+key+"\" )";
_548=_548.replace(/(\W|^)this(,| +|\)|;)/g,_54a);
_548=_548.replace(/(\W|^)this(\.)/g,_54a+".");
}
return _548;
};
Binding.exists=function(_54b){
var _54c=false;
try{
if(_54b&&_54b.bindingElement&&_54b.bindingElement.nodeType&&_54b.isDisposed==false){
_54c=true;
}
}
catch(accessDeniedException){
_54c=false;
}
finally{
return _54c;
}
};
Binding.destroy=function(_54d){
if(!_54d.isDisposed){
if(_54d.acceptor!=null){
_54d.acceptor.dispose();
}
if(_54d.dragger!=null){
_54d.disableDragging();
}
if(_54d.boxObject!=null){
_54d.boxObject.dispose();
}
if(_54d._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_54d);
}
for(var _54e in _54d.shadowTree){
var _54f=_54d.shadowTree[_54e];
if(_54f instanceof Binding&&Binding.exists(_54f)){
_54f.dispose(true);
}
_54d.shadowTree[_54e]=null;
}
_54d.isDisposed=true;
_54d=null;
}
};
Binding.dotnetify=function(_550,_551){
var _552=_550.getCallBackID();
if(_552!=null){
var _553=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_550.bindingDocument);
_553.type="hidden";
_553.id=_552;
_553.name=_552;
_553.value=_551!=null?_551:"";
_550.bindingElement.appendChild(_553);
_550.shadowTree.dotnetinput=_553;
}else{
throw _550.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_554){
var _555=_554.getProperty("image");
var _556=_554.getProperty("image-hover");
var _557=_554.getProperty("image-active");
var _558=_554.getProperty("image-disabled");
if(_554.imageProfile==null){
if(_554.image==null&&_555!=null){
_554.image=_555;
}
if(_554.imageHover==null&&_556!=null){
_554.imageHover=_556;
}
if(_554.imageActive==null&&_557!=null){
_554.imageActive=_557;
}
if(_554.imageDisabled==null&&_558!=null){
_554.imageDisabled=_558;
}
if(_554.image||_554.imageHover||_554.imageActive||_554.imageDisabled){
_554.imageProfile=new ImageProfile(_554);
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
var _55a=this.dependentBindings[key];
_55a.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_55b){
if(_55b){
this.memberDependencies[_55b.key]=true;
var _55c=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_55c=false;
break;
}
}
if(_55c){
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
Binding.prototype.detachRecursive=function(_55e){
if(_55e==null){
_55e=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_55e);
};
Binding.prototype.addMember=function(_55f){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_55f.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_55f.key]=false;
_55f.registerDependentBinding(this);
}
}
return _55f;
};
Binding.prototype.addMembers=function(_560){
while(_560.hasNext()){
var _561=_560.getNext();
if(!_561.isInitialized){
this.addMember(_561);
}
}
return _560;
};
Binding.prototype.registerDependentBinding=function(_562){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_562.key]=_562;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _563=this.getProperty("persist");
if(_563&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _565=new List(_563.split(" "));
while(_565.hasNext()){
var prop=_565.getNext();
var _567=Persistance.getPersistedProperty(id,prop);
if(_567!=null){
this._persist[prop]=_567;
this.setProperty(prop,_567);
}else{
_567=this.getProperty(prop);
if(_567!=null){
this._persist[prop]=_567;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _568=this.getProperty("disabled");
var _569=this.getProperty("contextmenu");
var _56a=this.getProperty("observes");
var _56b=this.getProperty("onattach");
var _56c=this.getProperty("hidden");
var _56d=this.getProperty("blockactionevents");
if(_56c==true&&this.isVisible==true){
this.hide();
}
if(_568&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_569){
this.setContextMenu(_569);
}
if(_56a){
this.observe(this.getBindingForArgument(_56a));
}
if(_56d==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_56b!=null){
Binding.evaluate(_56b,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _56f=this.getProperty("draggable");
var _570=this.getProperty("dragtype");
var _571=this.getProperty("dragaccept");
var _572=this.getProperty("dragreject");
if(_56f!=null){
this.isDraggable=_56f;
}
if(_570!=null){
this.dragType=_570;
if(_56f!=false){
this.isDraggable=true;
}
}
if(_571!=null){
this.dragAccept=_571;
}
if(_572!=null){
this.dragReject=_572;
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
Binding.prototype._updateBindingMap=function(_573){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _576=null;
if(_573){
_576=map[id];
if(_576!=null&&_576!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_576=map[id];
if(_576!=null&&_576==this){
delete map[id];
}
}
}else{
var _578=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_573);
if(Application.isDeveloperMode==true){
alert(_578);
}else{
this.logger.error(_578);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_57a){
};
Binding.prototype.handleBroadcast=function(_57b,arg){
};
Binding.prototype.handleElement=function(_57d){
return false;
};
Binding.prototype.updateElement=function(_57e){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _580=null;
switch(typeof arg){
case "object":
_580=arg;
break;
case "string":
_580=this.bindingDocument.getElementById(arg);
if(_580==null){
_580=Binding.evaluate(arg,this);
}
break;
}
if(_580!=null&&_580.nodeType!=null){
_580=UserInterface.getBinding(_580);
}
return _580;
};
Binding.prototype.serialize=function(){
var _581={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_581.id=id;
}
var _583=this.getProperty("binding");
if(_583){
_581.binding=_583;
}
return _581;
};
Binding.prototype.serializeToString=function(){
var _584=null;
if(this.isAttached){
_584=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _584;
};
Binding.prototype.subTreeFromString=function(_585){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_585);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_586){
var _587=this.bindingElement.getAttribute(_586);
if(_587){
_587=Types.castFromString(_587);
}
return _587;
};
Binding.prototype.setProperty=function(prop,_589){
if(_589!=null){
_589=_589.toString();
if(String(this.bindingElement.getAttribute(prop))!=_589){
this.bindingElement.setAttribute(prop,_589);
if(this.isAttached==true){
if(Persistance.isEnabled&&_589!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_589;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_589);
}
}
var _58a=this.propertyMethodMap[prop];
if(_58a){
_58a.call(this,this.getProperty(prop));
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
var _58c=null;
if(Binding.exists(this)){
_58c=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _58c;
};
Binding.prototype.attachClassName=function(_58d){
CSSUtil.attachClassName(this.bindingElement,_58d);
};
Binding.prototype.detachClassName=function(_58e){
CSSUtil.detachClassName(this.bindingElement,_58e);
};
Binding.prototype.hasClassName=function(_58f){
return CSSUtil.hasClassName(this.bindingElement,_58f);
};
Binding.prototype.addActionListener=function(type,_591){
_591=_591!=null?_591:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_591)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_591);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_591+")");
}
};
Binding.prototype.removeActionListener=function(type,_593){
_593=_593?_593:this;
if(Action.isValid(type)){
var _594=this.actionListeners[type];
if(_594){
var i=0,_596;
while((_596=_594[i])!=null){
if(_596==_593){
_594.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_598){
_598=_598?_598:this;
DOMEvents.addEventListener(this.bindingElement,type,_598);
};
Binding.prototype.removeEventListener=function(type,_59a){
_59a=_59a?_59a:this;
DOMEvents.removeEventListener(this.bindingElement,type,_59a);
};
Binding.prototype.subscribe=function(_59b){
if(!this.hasSubscription(_59b)){
this._subscriptions.set(_59b,true);
EventBroadcaster.subscribe(_59b,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_59b);
}
};
Binding.prototype.unsubscribe=function(_59c){
if(this.hasSubscription(_59c)){
this._subscriptions.del(_59c);
EventBroadcaster.unsubscribe(_59c,this);
}
};
Binding.prototype.hasSubscription=function(_59d){
return this._subscriptions.has(_59d);
};
Binding.prototype.observe=function(_59e,_59f){
_59e.addObserver(this,_59f);
};
Binding.prototype.unObserve=function(_5a0,_5a1){
_5a0.removeObserver(this,_5a1);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a5={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a5);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a5);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _5a8=false;
var _5a9=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_5a9=setTimeout(function(){
self.handleContextEvent(e);
},800);
_5a8=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_5a8){
clearTimeout(_5a9);
_5a8=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_5a8){
clearTimeout(_5a9);
_5a8=false;
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
var _5af=null;
var _5b0=null;
var _5b1=false;
if(arg instanceof Action){
_5af=arg;
}else{
if(Action.isValid(arg)){
_5af=new Action(this,arg);
_5b1=true;
}
}
if(_5af!=null&&Action.isValid(_5af.type)==true){
if(_5af.isConsumed==true){
_5b0=_5af;
}else{
var _5b2=this.actionListeners[_5af.type];
if(_5b2!=null){
_5af.listener=this;
var i=0,_5b4;
while((_5b4=_5b2[i++])!=null){
if(_5b4&&_5b4.handleAction){
_5b4.handleAction(_5af);
}
}
}
var _5b5=true;
if(this.isBlockingActions==true){
switch(_5af.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5b1){
_5b5=false;
}
break;
}
}
if(_5b5){
_5b0=this.migrateAction(_5af);
}else{
_5b0=_5af;
}
}
}
return _5b0;
};
Binding.prototype.migrateAction=function(_5b6){
var _5b7=null;
var _5b8=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5b7&&node.nodeType!=Node.DOCUMENT_NODE){
_5b7=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5b7){
_5b8=_5b7.dispatchAction(_5b6);
}else{
_5b8=_5b6;
}
}
return _5b8;
};
Binding.prototype.reflex=function(_5ba){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ba);
}
};
Binding.prototype.getMigrationParent=function(){
var _5bb=null;
if(true){
try{
var _5bc=this.bindingElement.parentNode;
if(_5bc!=null){
_5bb=_5bc;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5bb=null;
}
}
return _5bb;
};
Binding.prototype.add=function(_5bd){
if(_5bd.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5bd.bindingElement);
}else{
throw "Could not add "+_5bd.toString()+" of different document origin.";
}
return _5bd;
};
Binding.prototype.addFirst=function(_5be){
if(_5be.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5be.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5be.toString()+" of different document origin.";
}
return _5be;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5bf,_5c0){
return BindingFinder.getAncestorBindingByLocalName(this,_5bf,_5c0);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5c2){
return BindingFinder.getAncestorBindingByType(this,impl,_5c2);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5c4){
return BindingFinder.getChildElementsByLocalName(this,_5c4);
};
Binding.prototype.getChildElementByLocalName=function(_5c5){
return this.getChildElementsByLocalName(_5c5).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5c6){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5c6));
};
Binding.prototype.getChildBindingsByLocalName=function(_5c7){
return this.getDescendantBindingsByLocalName(_5c7,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5c8){
return this.getChildBindingsByLocalName(_5c8).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5c9,_5ca){
return BindingFinder.getDescendantBindingsByLocalName(this,_5c9,_5ca);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5cb){
return this.getDescendantBindingsByLocalName(_5cb,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5ce){
return BindingFinder.getNextBindingByLocalName(this,_5ce);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5cf){
return BindingFinder.getPreviousBindingByLocalName(this,_5cf);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5d0){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5d0);
};
Binding.prototype.isFirstBinding=function(_5d1){
return (this.getOrdinalPosition(_5d1)==0);
};
Binding.prototype.isLastBinding=function(_5d2){
return DOMUtil.isLastElement(this.bindingElement,_5d2);
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
Binding.prototype.setCallBackArg=function(_5d4){
this.setProperty(Binding.CALLBACKARG,_5d4);
};
Binding.prototype.dispose=function(_5d5){
if(!this.isDisposed){
if(!_5d5){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5d6=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5d6){
if(Client.isExplorer){
_5d6.outerHTML="";
}else{
_5d6.parentNode.removeChild(_5d6);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5d9){
list.add(_5d9);
});
list.each(function(_5da){
self.unsubscribe(_5da);
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
Binding.prototype.wakeUp=function(_5dc,_5dd){
_5dd=_5dd?_5dd:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5dc!==undefined){
self[_5dc]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5dd);
},0);
}
};
Binding.prototype.handleCrawler=function(_5df){
if(_5df.response==null&&this.isLazy==true){
if(_5df.id==DocumentCrawler.ID&&_5df.mode==DocumentCrawler.MODE_REGISTER){
_5df.response=NodeCrawler.NORMAL;
}else{
_5df.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5df.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5df.id)){
_5df.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5df.response==null){
switch(_5df.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5df.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5e0){
var _5e1=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5e0);
return UserInterface.registerBinding(_5e1,Binding);
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
var _5e2=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5e2.each(function(_5e3){
DataBinding.expressions[_5e3.Key]=new RegExp(_5e3.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5e4){
var _5e5=null;
var _5e6=_5e4.getAncestorBindingByLocalName("field");
if(_5e6&&_5e6 instanceof FieldBinding){
var desc=_5e6.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5e5=desc.getLabel();
}
}
return _5e5;
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
var _5e9=this.bindingWindow.DataManager;
_5e9.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5eb=this.bindingWindow.DataManager;
if(_5eb.getDataBinding(name)){
_5eb.unRegisterDataBinding(name);
}
_5eb.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5ec,arg){
RootBinding.superclass.handleBroadcast.call(this,_5ec,arg);
var _5ee=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5ec){
case _5ee:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5ee);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5ef){
var _5f0=_5ef?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5ef!=this.isActivated){
this.isActivated=_5ef;
this.dispatchAction(_5f0);
var _5f1=new List();
var self=this;
this._activationawares.each(function(_5f3){
if(_5f3.isActivationAware){
try{
if(_5ef){
if(!_5f3.isActivated){
_5f3.onActivate();
}
}else{
if(_5f3.isActivated){
_5f3.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5f1.add(_5f3);
}
}
});
_5f1.each(function(_5f4){
this._activationawares.del(_5f4);
});
_5f1.dispose();
}else{
var _5f5="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5f5);
}else{
this.logger.error(_5f5);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5f6,_5f7){
if(Interfaces.isImplemented(IActivationAware,_5f6,true)==true){
if(_5f7==false){
this._activationawares.del(_5f6);
}else{
this._activationawares.add(_5f6);
if(this.isActivated==true){
_5f6.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5f6+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5f8){
var _5f9=this.getMigrationParent();
if(_5f9!=null){
var root=_5f9.ownerDocument.body;
var _5fb=UserInterface.getBinding(root);
if(_5fb!=null){
_5fb.makeActivationAware(this,_5f8);
}
}
};
RootBinding.prototype.handleCrawler=function(_5fc){
RootBinding.superclass.handleCrawler.call(this,_5fc);
if(_5fc.type==NodeCrawler.TYPE_ASCENDING){
_5fc.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5fd=null;
if(this.bindingWindow.parent){
_5fd=this.bindingWindow.frameElement;
}
return _5fd;
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
StyleBinding.prototype.handleElement=function(_5fe){
return true;
};
StyleBinding.prototype.updateElement=function(_5ff){
var href=_5ff.getAttribute("link");
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
MatrixBinding.prototype=new Binding;
MatrixBinding.prototype.constructor=MatrixBinding;
MatrixBinding.superclass=Binding.prototype;
MatrixBinding.CLASSNAME_MANIFESTER="matrixbindingmanifester";
MatrixBinding.CENTER="c";
MatrixBinding.NORTH="n";
MatrixBinding.SOUTH="s";
MatrixBinding.EAST="e";
MatrixBinding.WEST="w";
MatrixBinding.NORTHEAST="ne";
MatrixBinding.NORTHWEST="nw";
MatrixBinding.SOUTHEAST="se";
MatrixBinding.SOUTHWEST="sw";
MatrixBinding.markup=null;
function MatrixBinding(){
this.logger=SystemLogger.getLogger("MatrixBinding");
this.hasMatrix=true;
this.template="matrixbindingelement.xml";
this._isTableIndexed=false;
return this;
}
MatrixBinding.prototype.toString=function(){
return "[MatrixBinding]";
};
MatrixBinding.prototype.onBindingAttach=function(){
MatrixBinding.superclass.onBindingAttach.call(this);
if(this.hasMatrix){
this.bindingElement.innerHTML=Templates.getTemplateElementText(this.template);
this.shadowTree.table=this.bindingElement.firstChild;
}
};
MatrixBinding.prototype._indexTable=function(){
var _601=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_601.hasNext()){
var cell=_601.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_603){
var _604=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_603.bindingElement);
_604=_603;
}else{
_604=MatrixBinding.superclass.add.call(this,_603);
}
return _604;
};
MatrixBinding.prototype.addFirst=function(_605){
var _606=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _607=this.shadowTree[MatrixBinding.CENTER];
_607.insertBefore(_605.bindingElement,_607.firstChild);
_606=_605;
}else{
_606=MatrixBinding.superclass.addFirst.call(this,_605);
}
return _605;
};
MatrixBinding.prototype.manifest=function(){
if(!this._isTableIndexed){
this._indexTable();
}
var div=this.bindingDocument.createElement("div");
div.appendChild(this.bindingDocument.createTextNode("!"));
div.className=MatrixBinding.CLASSNAME_MANIFESTER;
this.shadowTree[MatrixBinding.CENTER].appendChild(div);
};
MatrixBinding.newInstance=function(_609){
var _60a=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_609);
return UserInterface.registerBinding(_60a,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_60b,_60c){
var list=new List();
var _60e=new FlexBoxCrawler();
_60e.mode=_60c?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_60e.startBinding=_60b;
_60e.crawl(_60b.bindingElement,list);
list.each(function(_60f){
_60f.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_610){
if(Binding.exists(_610)){
_610.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_611){
if(Binding.exists(_611)){
_611.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_60e.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_612){
FlexBoxBinding.superclass.handleAction.call(this,_612);
switch(_612.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_613){
var _614=0;
var _615=new List(this.bindingElement.parentNode.childNodes);
while(_615.hasNext()){
var _616=_615.getNext();
if(_616.nodeType==Node.ELEMENT_NODE&&_616!=this.bindingElement){
if(!this._isOutOfFlow(_616)){
var rect=_616.getBoundingClientRect();
if(_613){
height+=(rect.right-rect.left);
}else{
_614+=(rect.bottom-rect.top);
}
}
}
}
return _614;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_618){
var _619=CSSComputer.getPosition(_618);
var _61a=CSSComputer.getFloat(_618);
return (_619=="absolute"||_61a!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _61b=this.bindingElement.parentNode;
var rect=_61b.getBoundingClientRect();
var _61d=rect.bottom-rect.top;
var _61e=CSSComputer.getPadding(_61b);
var _61f=CSSComputer.getBorder(_61b);
_61d-=(_61e.top+_61e.bottom);
_61d-=(_61f.top+_61f.bottom);
return _61d;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _620=this.bindingElement.parentNode;
var rect=_620.getBoundingClientRect();
var _622=rect.right-rect.left;
var _623=CSSComputer.getPadding(_620);
var _624=CSSComputer.getBorder(_620);
_622-=(_623.left+_623.right);
_622-=(_624.left+_624.right);
return _622;
};
FlexBoxBinding.prototype.setFlexibility=function(_625){
if(_625!=this.isFlexible){
if(_625){
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
this.isFlexible=_625;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _626=this._getSiblingsSpan();
_626=this._getCalculatedHeight()-_626;
if(!isNaN(_626)&&_626>=0){
this.bindingElement.style.height=String(_626)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_627){
if(!this.isFit||_627){
var _628=0;
new List(this.bindingElement.childNodes).each(function(_629){
if(_629.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_629)){
var rect=_629.getBoundingClientRect();
_628+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_628);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_62b){
var _62c=CSSComputer.getPadding(this.bindingElement);
var _62d=CSSComputer.getBorder(this.bindingElement);
_62b+=_62c.top+_62c.bottom;
_62b+=_62d.top+_62d.bottom;
this.bindingElement.style.height=_62b+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_62e){
ScrollBoxBinding.superclass.handleAction.call(this,_62e);
switch(_62e.type){
case BalloonBinding.ACTION_INITIALIZE:
_62e.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_62f){
this.bindingElement.scrollLeft=_62f.x;
this.bindingElement.scrollTop=_62f.y;
};
ScrollBoxBinding.prototype.getPosition=function(){
return new Point(this.bindingElement.scrollLeft,this.bindingElement.scrollTop);
};
LabelBinding.prototype=new Binding;
LabelBinding.prototype.constructor=LabelBinding;
LabelBinding.superclass=Binding.prototype;
LabelBinding.DIALOG_INDECATOR_SUFFIX=String.fromCharCode(8230);
LabelBinding.DEFAULT_IMAGE="${root}/images/blank.png";
LabelBinding.EXPLORER_IMAGE_FILTER="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${url}',sizingMethod='crop');";
LabelBinding.CLASSNAME_GRAYTEXT="graytext";
LabelBinding.CLASSNAME_FLIPPED="flipped";
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
var _630=this._getBuildElement("labeltext");
if(_630){
this.shadowTree.labelText=_630;
this.shadowTree.text=_630.firstChild;
this.hasLabel=true;
}
}else{
var _631=this.getProperty("label");
var _632=this.getProperty("image");
var _633=this.getProperty("tooltip");
if(_631){
this.setLabel(_631,false);
}
if(_632){
this.setImage(_632,false);
}
if(_633){
this.setToolTip(_633);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_634,_635){
_634=_634!=null?_634:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_634);
this.setProperty("label",_634);
if(!_635){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_637){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _638=Resolver.resolve(url);
if(_638.svg){
this.setImageSvg(_638.svg);
this.setAlphaTransparentBackdrop(false);
this.setImageClasses();
}else{
if(_638.classes){
this.setImageSvg();
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_638.classes);
}else{
this.setImageSvg();
this.setImageClasses();
this.setAlphaTransparentBackdrop(_638);
}
}
this.hasImage=true;
if(!_637){
this.buildClassName();
}
}else{
this.setImageSvg();
this.setImageClasses();
this.setAlphaTransparentBackdrop(false);
this.setImageClasses();
this.deleteProperty("image");
this.hasImage=false;
this.buildClassName();
}
};
LabelBinding.prototype.setImageClasses=function(_639){
if(this.shadowTree.labelBody){
if(!_639){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_639;
}
}
};
LabelBinding.prototype.setImageSvg=function(svg){
if(this.shadowTree.labelBody){
if(!svg){
if(this.shadowTree.svg){
if(this.shadowTree.svg.parentNode){
this.shadowTree.svg.parentNode.removeChild(this.shadowTree.svg);
}
this.shadowTree.svg=null;
this.shadowTree.use=null;
}
}else{
var _63b="http://www.w3.org/2000/svg";
if(!this.shadowTree.svg){
this.shadowTree.svg=this.bindingDocument.createElementNS(_63b,"svg");
this.shadowTree.labelBody.insertBefore(this.shadowTree.svg,this.shadowTree.labelBody.firstChild);
this.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
}
var g=KickStart.sprites.querySelector("#"+svg);
if(g){
var _63d=g.getAttribute("viewBox"),_63e=document.createDocumentFragment(),_63f=g.cloneNode(true);
if(_63d){
this.shadowTree.svg.setAttribute("viewBox",_63d);
}
_63e.appendChild(_63f);
this.shadowTree.svg.innerHTML="";
this.shadowTree.svg.appendChild(_63e);
}
}
}
};
LabelBinding.prototype.setDefaultImage=function(url){
this.setImage(LabelBinding.DEFAULT_IMAGE);
};
LabelBinding.prototype.setAlphaTransparentBackdrop=function(url){
if(this.shadowTree.labelBody){
if(url!=false){
url=Resolver.resolve(url);
if(Client.isExplorer6){
this.shadowTree.labelBody.style.filter=LabelBinding.EXPLORER_IMAGE_FILTER.replace("${url}",url);
}else{
this.shadowTree.labelBody.style.backgroundImage="url('"+url+"')";
}
}else{
if(Client.isExplorer6){
this.shadowTree.labelBody.style.filter="none";
}else{
this.shadowTree.labelBody.style.backgroundImage="none";
}
}
}
};
LabelBinding.prototype.getImage=function(){
return this.getProperty("image");
};
LabelBinding.prototype.setToolTip=function(_642){
this.setProperty("tooltip",_642);
if(_642!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_642));
}
};
LabelBinding.prototype.getToolTip=function(_643){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_644){
_644=_644==null?true:_644;
var _645=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_644;
if(_644){
this.attachClassName(_645);
}else{
this.detachClassName(_645);
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
var _646="textonly";
var _647="imageonly";
var _648="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_646);
this.detachClassName(_647);
this.attachClassName(_648);
}else{
if(this.hasLabel){
this.detachClassName(_648);
this.detachClassName(_647);
this.attachClassName(_646);
}else{
if(this.hasImage){
this.detachClassName(_648);
this.detachClassName(_646);
this.attachClassName(_647);
}
}
}
};
LabelBinding.newInstance=function(_649){
var _64a=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_649);
return UserInterface.registerBinding(_64a,LabelBinding);
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
var _64b=this.getProperty("label");
if(!_64b){
_64b=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_64b));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_64d){
this.setProperty("label",_64d);
};
TextBinding.newInstance=function(_64e){
var _64f=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_64e);
return UserInterface.registerBinding(_64f,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_650,_651){
BroadcasterBinding.superclass.setProperty.call(this,_650,_651);
function update(list){
if(list){
list.each(function(_653){
_653.setProperty(_650,_651);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _654=this._observers[_650];
if(_654){
update(_654);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_655){
BroadcasterBinding.superclass.deleteProperty.call(this,_655);
function update(list){
if(list){
list.each(function(_657){
_657.deleteProperty(_655);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _658=this._observers[_655];
if(_658){
update(_658);
}
};
BroadcasterBinding.prototype.addObserver=function(_659,_65a){
_65a=_65a?_65a:"*";
_65a=new List(_65a.split(" "));
while(_65a.hasNext()){
var _65b=_65a.getNext();
switch(_65b){
case "*":
this._setAllProperties(_659);
break;
default:
var _65c=this.getProperty(_65b);
_659.setProperty(_65b,_65c);
break;
}
if(!this._observers[_65b]){
this._observers[_65b]=new List();
}
this._observers[_65b].add(_659);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_65d){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _660=att.nodeName;
switch(_660){
case "id":
case "key":
break;
default:
var _661=this.getProperty(_660);
_65d.setProperty(_660,_661);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_662,_663){
_663=_663?_663:"*";
_663=new List(_663.split(" "));
while(_663.hasNext()){
var list=this._observers[_663.getNext()];
if(list){
while(list.hasNext()){
var _665=list.getNext();
if(_665==_662){
list.del(_665);
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
BroadcasterBinding.prototype.setDisabled=function(_666){
this.setProperty("isdisabled",_666);
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
ButtonBinding.CLASSNAME_DEFAULT="default";
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
};
ButtonBinding.prototype.parseDOMProperties=function(){
Binding.imageProfile(this);
};
ButtonBinding.prototype.buildDOMContent=function(){
var tree=this.shadowTree;
var _668=this.getProperty("width");
var _669=this.getProperty("label");
var type=this.getProperty("type");
var _66b=this.getProperty("popup");
var _66c=this.getProperty("tooltip");
var _66d=this.getProperty("isdisabled");
var _66e=this.getProperty("response");
var _66f=this.getProperty("oncommand");
var _670=this.getProperty("value");
var _671=this.getProperty("ischecked");
var _672=this.getProperty("callbackid");
var _673=this.getProperty("focusable");
var _674=this.getProperty("focused");
var _675=this.getProperty("default");
var url=this.getProperty("url");
var _677=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_677){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_669!=null){
this.setLabel(_669);
}
if(type!=null){
this.setType(type);
}
if(_66c!=null){
this.setToolTip(_66c);
}
if(_668!=null){
this.setWidth(_668);
}
if(_66b!=null){
this.setPopup(_66b);
}
if(_66e!=null){
this.response=_66e;
}
if(_671==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_66f!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_66f,this);
};
}
if(_673||this.isFocusable){
this._makeFocusable();
if(_675||this.isDefault){
this.isDefault=true;
}
if(_674){
this.focus();
}
}
if(_66d==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_672!=null){
this.bindingWindow.DataManager.registerDataBinding(_672,this);
if(_670!=null){
Binding.dotnetify(this,_670);
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
ButtonBinding.prototype.setImage=function(_678){
if(this.isAttached){
this.labelBinding.setImage(_678);
}
this.setProperty("image",_678);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_679){
if(this.isAttached){
this.labelBinding.setLabel(_679);
}
this.setProperty("label",_679);
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
ButtonBinding.prototype.setToolTip=function(_67b){
this.setProperty("tooltip",_67b);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_67b));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_67c){
this.imageProfile=new _67c(this);
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
ButtonBinding.prototype.flip=function(_681){
_681=_681==null?true:_681;
this.isFlipped=_681;
this.setProperty("flip",_681);
if(this.isAttached){
this.labelBinding.flip(_681);
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
ButtonBinding.prototype.check=function(_682){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_682==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_683){
this.isActive=true;
this.isChecked=true;
if(!_683){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_684){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_684==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_685){
this.isActive=false;
this.isChecked=false;
if(!_685){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_686,_687){
if(_686==null){
_686==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_686){
case true:
this.check(_687);
break;
case false:
this.uncheck(_687);
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
var _689=this.getProperty("tooltip");
if(_689){
this.setToolTip(_689);
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
var _68a=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_68a=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _68a;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _68c=this.getEqualSizeWidth();
if(goal>_68c){
var diff=goal-_68c;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _68f=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_690){
if(_690>=0){
this.bindingElement.style.width=new String(_690+"px");
}
this.setProperty("width",_690);
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
ButtonBinding.prototype.setValue=function(_691){
this.shadowTree.dotnetinput.value=_691;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_692){
this.setValue(_692);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_693){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_693;
this.imageProfile=_693.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_694){
var _695=_694?"addEventListener":"removeEventListener";
this.binding[_695](DOMEvents.MOUSEENTER,this);
this.binding[_695](DOMEvents.MOUSELEAVE,this);
this.binding[_695](DOMEvents.MOUSEDOWN,this);
this.binding[_695](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _697=false,_698=false,_699=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_699=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_699=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_699=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_699=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_699==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_697=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_699=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_699=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_699=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_699=ButtonStateManager.STATE_NORMAL;
var _69a=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_69a instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_699=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_699==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_698=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_699=ButtonStateManager.STATE_NORMAL;
_697=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_699=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_699=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_699=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_699=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_699==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_697=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_699=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_699=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_699=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_699=ButtonStateManager.STATE_NORMAL;
_697=true;
break;
}
}
}
}
}
switch(_699){
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
if(_697){
this.binding.fireCommand();
}
if(_698){
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
if(this.imageProfile){
var url=this.imageProfile.getDefaultImage();
if(url){
this.binding.setImage(url);
}
}
};
ButtonStateManager.prototype.invokeHoverState=function(){
this.binding.attachClassName("hover");
this.binding.detachClassName("active");
if(this.imageProfile){
var url=this.imageProfile.getHoverImage();
if(url){
this.binding.setImage(url);
}
}
};
ButtonStateManager.prototype.invokeActiveState=function(){
this.binding.attachClassName("active");
this.binding.detachClassName("hover");
if(this.imageProfile){
var url=this.imageProfile.getActiveImage();
if(url){
this.binding.setImage(url);
}
}
};
ButtonStateManager.prototype.invokeDisabledState=function(){
this.binding.detachClassName("hover");
this.binding.detachClassName("active");
this.binding.attachClassName("isdisabled");
if(this.imageProfile){
var _69e=this.imageProfile.getDisabledImage();
if(_69e){
this.binding.setImage(_69e);
}
}
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
ClickButtonBinding.newInstance=function(_69f){
var _6a0=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_69f);
return UserInterface.registerBinding(_6a0,ClickButtonBinding);
};
RadioButtonBinding.prototype=new ButtonBinding;
RadioButtonBinding.prototype.constructor=RadioButtonBinding;
RadioButtonBinding.superclass=ButtonBinding.prototype;
RadioButtonBinding.IMG_DEFAULT="${skin}/buttons/radiobutton-default.png";
RadioButtonBinding.IMG_HOVER="${skin}/buttons/radiobutton-hover.png";
RadioButtonBinding.IMG_ACTIVE="${skin}/buttons/radiobutton-active.png";
RadioButtonBinding.IMG_DISABLED="${skin}/buttons/radiobutton-disabled.png";
function RadioButtonBinding(){
this.logger=SystemLogger.getLogger("RadioButtonBinding");
this.isRadioButton=true;
this.hasMatrix=false;
this.imageProfile=new ImageProfile({image:RadioButtonBinding.IMG_DEFAULT,imageHover:RadioButtonBinding.IMG_HOVER,imageActive:RadioButtonBinding.IMG_ACTIVE,imageDisabled:RadioButtonBinding.IMG_DISABLED});
return this;
}
RadioButtonBinding.prototype.toString=function(){
return "[RadioButtonBinding]";
};
RadioButtonBinding.newInstance=function(_6a1){
var _6a2=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_6a1);
return UserInterface.registerBinding(_6a2,RadioButtonBinding);
};
CheckButtonBinding.prototype=new ButtonBinding;
CheckButtonBinding.prototype.constructor=CheckButtonBinding;
CheckButtonBinding.superclass=ButtonBinding.prototype;
function CheckButtonBinding(){
this.logger=SystemLogger.getLogger("CheckButtonBinding");
this.isCheckButton=true;
this.isCheckBox=true;
this.hasMatrix=false;
this.imageProfile=new CheckButtonImageProfile(this);
}
CheckButtonBinding.prototype.toString=function(){
return "[CheckButtonBinding]";
};
CheckButtonBinding.newInstance=function(_6a3){
var _6a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_6a3);
return UserInterface.registerBinding(_6a4,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_6a5){
this._binding=_6a5;
}
CheckButtonImageProfile.prototype.getDefaultImage=function(){
return CheckButtonImageProfile.IMG_DEFAULT;
};
CheckButtonImageProfile.prototype.getHoverImage=function(){
return this._binding.isChecked?CheckButtonImageProfile.IMG_ACTIVE_HOVER:CheckButtonImageProfile.IMG_HOVER;
};
CheckButtonImageProfile.prototype.getActiveImage=function(){
return CheckButtonImageProfile.IMG_ACTIVE;
};
CheckButtonImageProfile.prototype.getDisabledImage=function(){
return this._binding.isChecked?CheckButtonImageProfile.IMG_DISABLED:CheckButtonImageProfile.IMG_DISABLED_ON;
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
var _6a6=this.getDescendantBindingsByLocalName("control");
_6a6.each(function(_6a7){
_6a7.setControlType(_6a7.controlType);
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
ControlGroupBinding.newInstance=function(_6a9){
var _6aa=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6a9);
return UserInterface.registerBinding(_6aa,ControlGroupBinding);
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
this.imageProfile=true;
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
this.setImage(this.imageProfile.getDefaultImage());
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
if(this.isAttached){
this.setImage(this.imageProfile.getDefaultImage());
}
};
ControlBinding.prototype.handleAction=function(_6ad){
ControlBinding.superclass.handleAction.call(this,_6ad);
switch(_6ad.type){
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
ControlImageProfile.IMAGE_MINIMIZE=null;
ControlImageProfile.IMAGE_MAXIMIZE=null;
ControlImageProfile.IMAGE_RESTORE=null;
ControlImageProfile.IMAGE_CLOSE=null;
function ControlImageProfile(_6ae){
this.binding=_6ae;
}
ControlImageProfile.prototype._getImage=function(_6af){
var _6b0=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6b0=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6b0=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6b0=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6b0=this.constructor.IMAGE_CLOSE;
break;
}
return _6b0.replace("${string}",_6af);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6b1=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6b1=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6b1?this._getImage("default"):this._getImage("ghosted");
};
ControlImageProfile.prototype.getHoverImage=function(){
return this._getImage("hover");
};
ControlImageProfile.prototype.getActiveImage=function(){
return this._getImage("active");
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
ControlBoxBinding.prototype.handleAction=function(_6b2){
ControlBoxBinding.superclass.handleAction.call(this,_6b2);
switch(_6b2.type){
case ControlBinding.ACTION_COMMAND:
var _6b3=_6b2.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6b3);
Application.unlock(self);
},0);
_6b2.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6b5){
switch(_6b5.controlType){
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
ControlBoxBinding.prototype.setState=function(_6b6){
var _6b7=this.getState();
this.setProperty("state",_6b6);
this.detachClassName(_6b7);
this.attachClassName(_6b6);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6b8=this.getProperty("state");
if(!_6b8){
_6b8=ControlBoxBinding.STATE_NORMAL;
}
return _6b8;
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
MenuContainerBinding.prototype.isOpen=function(_6b9){
var _6ba=null;
if(!_6b9){
_6ba=this._isOpen;
}else{
_6ba=(_6b9==this._openElement);
}
return _6ba;
};
MenuContainerBinding.prototype.setOpenElement=function(_6bb){
if(_6bb){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6bb;
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
var _6bc=this.getChildBindingByLocalName("menupopup");
if(_6bc&&_6bc!=this.menuPopupBinding){
this.menuPopupBinding=_6bc;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6bd=this.getMenuContainerBinding();
_6bd.setOpenElement(this);
var _6be=this.getMenuPopupBinding();
_6be.snapTo(this.bindingElement);
_6be.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6bf){
MenuContainerBinding.superclass.handleAction.call(this,_6bf);
if(_6bf.type==PopupBinding.ACTION_HIDE){
var _6c0=this.getMenuContainerBinding();
_6c0.setOpenElement(false);
this.reset();
_6bf.consume();
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
MenuBarBinding.prototype.handleAction=function(_6c1){
MenuBarBinding.superclass.handleAction.call(this,_6c1);
switch(_6c1.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6c2=_6c1.target;
var _6c3=this.getChildBindingsByLocalName("menu");
while(_6c3.hasNext()){
var menu=_6c3.getNext();
}
switch(_6c2.arrowKey){
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
var _6c5=this.getProperty("image");
var _6c6=this.getProperty("label");
var _6c7=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6c6){
this.setLabel(_6c6);
}
if(_6c5){
this.setImage(_6c5);
}
if(_6c7){
this.setToolTip(_6c7);
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
MenuBinding.prototype.setLabel=function(_6c9){
this.setProperty("label",_6c9);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c9));
}
};
MenuBinding.prototype.setToolTip=function(_6ca){
this.setProperty("tooltip",_6ca);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ca));
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
var _6cc=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6cc.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6cc.isOpen()&&!_6cc.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6cc.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6cc.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6cd,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6cd){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6d2){
switch(_6d2.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6d3=null;
var _6d4=true;
self._lastFocused.focus();
self.grabKeyboard();
_6d2.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6d6){
for(var key in this._focused){
if(key!=_6d6.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6d6.key]=_6d6;
this._lastFocused=_6d6;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6d9){
delete this._focused[_6d9.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6da){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6da);
}
if(_6da){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6dd=this.getChildBindingsByLocalName("menugroup");
var _6de=null;
var _6df=null;
while(_6dd.hasNext()){
var _6e0=_6dd.getNext();
if(!_6e0.isDefaultContent){
_6e0.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6de&&_6e0.isVisible){
_6de=_6e0;
}
if(_6e0.isVisible){
_6df=_6e0;
}
}
}
if(_6de&&_6df){
_6de.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6df.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6e1){
MenuBodyBinding.activeInstance=this;
if(_6e1){
var _6e2=this._getMenuItems().getFirst();
if(_6e2){
_6e2.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6e3=this._lastFocused;
if((_6e3!=null)&&(!_6e3.isMenuContainer)){
_6e3.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6e5=this._getMenuItems();
var _6e6=null;
var next=null;
if(this._lastFocused){
_6e6=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6e5.getPreceding(_6e6);
break;
case KeyEventCodes.VK_DOWN:
next=_6e5.getFollowing(_6e6);
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
next=_6e5.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6e9=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6ea){
_6e9=_6ea.getChildBindingsByLocalName("menuitem");
_6e9.each(function(item){
list.add(item);
});
});
_6e9=this.getChildBindingsByLocalName("menuitem");
_6e9.each(function(item){
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
MenuBodyBinding.newInstance=function(_6ed){
var _6ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6ed);
return UserInterface.registerBinding(_6ee,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6ef){
switch(_6ef){
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
MenuGroupBinding.newInstance=function(_6f0){
var _6f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6f0);
return UserInterface.registerBinding(_6f1,MenuGroupBinding);
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
var _6f2=this.getProperty("image");
var _6f3=this.getProperty("image-hover");
var _6f4=this.getProperty("image-active");
var _6f5=this.getProperty("image-disabled");
if(!this.image&&_6f2){
this.image=_6f2;
}
if(!this.imageHover&&_6f3){
this.imageHover=_6f2;
}
if(!this.imageActive&&_6f4){
this.imageActive=_6f4;
}
if(!this.imageDisabled&&_6f5){
this.imageDisabled=_6f5;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6f6=this.getProperty("label");
var _6f7=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6f9=this.getProperty("isdisabled");
var _6fa=this.getProperty("image");
var _6fb=this.getProperty("image-hover");
var _6fc=this.getProperty("image-active");
var _6fd=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6fe=this.getMenuPopupBinding();
if(_6fe){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6fa){
this.image=_6fa;
}
if(!this.imageHover&&_6fb){
this.imageHover=_6fa;
}
if(!this.imageActive&&_6fc){
this.imageActive=_6fc;
}
if(!this.imageDisabled&&_6fd){
this.imageDisabled=_6fd;
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
if(_6f6!=null){
this.setLabel(_6f6);
}
if(_6f7){
this.setToolTip(_6f7);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6f9==true){
this.disable();
}
var _6ff=this.getProperty("oncommand");
if(_6ff){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6ff);
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
MenuItemBinding.prototype.setLabel=function(_702){
this.setProperty("label",_702);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_702));
}
};
MenuItemBinding.prototype.setToolTip=function(_703){
this.setProperty("tooltip",_703);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_703));
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
var _705=this.bindingDocument.createElement("div");
_705.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_705.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _706=this.labelBinding.bindingElement;
_706.insertBefore(_705,_706.firstChild);
_705.style.display="none";
this.shadowTree.checkBoxIndicator=_705;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _705=this.bindingDocument.createElement("div");
_705.className=MenuItemBinding.CLASSNAME_SUBMENU;
_705.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _706=this.labelBinding.bindingElement;
_706.insertBefore(_705,_706.firstChild);
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
var _708=this.imageProfile.getDisabledImage();
if(_708){
this.setImage(_708);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _708=this.imageProfile.getDefaultImage();
if(_708){
this.setImage(_708);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _70a=this.getMenuContainerBinding();
if(_70a.isOpen()&&!_70a.isOpen(this)){
_70a._openElement.hide();
_70a.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _70a=this.getMenuContainerBinding();
if(!_70a.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_70c){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _70d=this.getMenuContainerBinding();
if(!_70d||!_70d.isOpen(this)||_70c){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_70e){
this.setChecked(true,_70e);
};
MenuItemBinding.prototype.uncheck=function(_70f){
this.setChecked(false,_70f);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_710,_711){
this.setProperty("ischecked",_710);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_710){
this.isChecked=_710;
this.shadowTree.checkBoxIndicator.style.display=_710?"block":"none";
if(!_711){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_712){
var _713=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_712);
UserInterface.registerBinding(_713,MenuItemBinding);
return UserInterface.getBinding(_713);
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
PopupSetBinding.newInstance=function(_714){
var _715=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_714);
return UserInterface.registerBinding(_715,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_716,arg){
switch(_716){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _71a=PopupBinding.activeInstances.get(key);
var _71b=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_71a);
if(!_71b){
list.add(_71a);
}
});
list.each(function(_71c){
_71c.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _71e=PopupBinding.activeInstances.get(key);
_71e.hide();
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
var _71f=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _720=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_71f){
this._bodyBinding=UserInterface.getBinding(_71f);
}else{
if(_720){
this._bodyBinding=UserInterface.getBinding(_720);
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
var _721=this.getProperty("position");
this.position=_721?_721:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_722){
var _723=null;
if(this._bodyBinding){
this._bodyBinding.add(_722);
_723=_722;
}else{
_723=PopupBinding.superclass.add.call(this,_722);
}
return _723;
};
PopupBinding.prototype.addFirst=function(_724){
var _725=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_724);
_725=_724;
}else{
_725=PopupBinding.superclass.addFirst.call(this,_724);
}
return _725;
};
PopupBinding.prototype.handleAction=function(_726){
PopupBinding.superclass.handleAction.call(this,_726);
var _727=_726.target;
switch(_726.type){
case Binding.ACTION_ATTACHED:
if(_727 instanceof MenuItemBinding){
this._count(true);
_726.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_727 instanceof MenuItemBinding){
this._count(false);
_726.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_728){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_728?1:-1);
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
PopupBinding.prototype.snapTo=function(_729){
var _72a=this._getElementPosition(_729);
switch(this.position){
case PopupBinding.POSITION_TOP:
_72a.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_72a.x+=_729.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_72a.y+=_729.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_72a.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_729;
this.bindingElement.style.display="block";
this.setPosition(_72a.x,_72a.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_72c){
this.bindingElement.style.display="block";
this.setPosition(_72c.x,_72c.y);
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
PopupBinding.prototype._getElementPosition=function(_731){
return _731.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_731):DOMUtil.getUniversalPosition(_731);
};
PopupBinding.prototype._getMousePosition=function(e){
var _733=DOMEvents.getTarget(e);
return _733.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_734){
var _735=this.bindingElement;
if(_734){
_735.style.visibility="visible";
}else{
_735.style.visibility="hidden";
_735.style.display="none";
}
this.isVisible=_734;
};
PopupBinding.prototype._enableTab=function(_736){
var self=this;
var _738=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_738.each(function(_739){
_739.bindingElement.tabIndex=_736?0:-1;
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
var _741=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_741.y<0){
y=-_741.y;
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
PopupBinding.prototype.grabKeyboard=function(_743){
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
var _749=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_749=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _749;
};
PopupBinding.prototype.clear=function(){
var _74a=this._bodyBinding;
if(_74a){
_74a.detachRecursive();
_74a.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_74b){
var _74c=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_74b);
return UserInterface.registerBinding(_74c,PopupBinding);
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
PopupBodyBinding.newInstance=function(_74e){
var _74f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_74e);
return UserInterface.registerBinding(_74f,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_750){
return new Point(_750.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_751){
var _752=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_751);
return UserInterface.registerBinding(_752,MenuPopupBinding);
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
var _753=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_753){
this._body=UserInterface.getBinding(_753);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _754=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_754.hasNext()){
var _755=DialogBorderBinding.newInstance(this.bindingDocument);
_755.setType(_754.getNext());
this.add(_755);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _756=this.getProperty("controls");
if(_756){
var _757=new List(_756.split(" "));
while(_757.hasNext()){
var type=_757.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _759=DialogControlBinding.newInstance(this.bindingDocument);
_759.setControlType(type);
this._titlebar.addControl(_759);
this.controlBindings[type]=_759;
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
var _75a=this.getProperty("image");
var _75b=this.getProperty("label");
var _75c=this.getProperty("draggable");
var _75d=this.getProperty("resizable");
var _75e=this.getProperty("modal");
if(_75a){
this.setImage(_75a);
}
if(_75b){
this.setLabel(_75b);
}
if(_75c==false){
this.isDialogDraggable=false;
}
if(_75d==false){
this.isPanelResizable=false;
}
if(_75e==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_75f){
this.isModal=_75f;
};
DialogBinding.prototype.setLabel=function(_760){
this.setProperty("label",_760);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_760));
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
DialogBinding.prototype.handleAction=function(_762){
DialogBinding.superclass.handleAction.call(this,_762);
switch(_762.type){
case Binding.ACTION_DRAG:
var _763=_762.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_763.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_763.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_763;
_763.dragger.registerHandler(this);
}
break;
}
}
_762.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_762.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_764,arg){
DialogBinding.superclass.handleBroadcast.call(this,_764,arg);
switch(_764){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_766){
DialogBinding.superclass.handleInvokedControl.call(this,_766);
switch(_766.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_767){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_767){
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
var _769=self.bindingElement;
setTimeout(function(){
_769.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_76a){
this.bindingElement.style.zIndex=new String(_76a);
};
DialogBinding.prototype.onDragStart=function(_76b){
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
DialogBinding.prototype.setResizable=function(_77d){
if(this._isResizable!=_77d){
if(_77d){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_77d;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _77e=null;
var _77f=this.bindingDocument.body.offsetWidth;
var _780=this.bindingDocument.body.offsetHeight;
_77e={x:0.125*_77f,y:0.125*_780,w:0.75*_77f,h:0.5*_780};
return _77e;
};
DialogBinding.prototype.centerOnScreen=function(){
var _781=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_781.w-dim.w),0.5*(_781.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _783=this;
var i=0;
function blink(){
if(i%2==0){
_783.detachClassName("active");
}else{
_783.attachClassName("active");
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
var _787="";
while(list.hasNext()){
var type=list.getNext();
_787+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_787);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_788){
var _789=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_788);
return UserInterface.registerBinding(_789,DialogBinding);
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
DialogHeadBinding.newInstance=function(_78a){
var _78b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_78a);
return UserInterface.registerBinding(_78b,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_78e){
var _78f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_78e);
return UserInterface.registerBinding(_78f,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_790){
DialogSetBinding.superclass.handleAction.call(this,_790);
var _791=_790.target;
switch(_790.type){
case Binding.ACTION_MOVETOTOP:
if(_791 instanceof DialogBinding){
this._moveToTop(_791);
}
break;
case Binding.ACTION_MOVEDONTOP:
_790.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_792){
var _793=0;
var _794=this.getChildBindingsByLocalName("dialog");
_794.each(function(_795){
var _796=_795.getZIndex();
_793=_796>_793?_796:_793;
});
_792.setZIndex(_793+2);
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
DialogBorderBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_798);
return UserInterface.registerBinding(_799,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_79a){
this._dialogBinding=_79a;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_79c){
DialogCoverBinding.superclass.handleAction.call(this,_79c);
var _79d=_79c.target;
if(this._dialogBinding.isModal){
switch(_79c.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_79d==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_79d.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_79e,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_79e,arg);
switch(_79e){
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
var _7a1=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_7a1);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _7a2=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_7a2);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_7a3){
var _7a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_7a3);
return UserInterface.registerBinding(_7a4,DialogCoverBinding);
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
var _7a5=this.getProperty("image");
if(_7a5){
this.setImage(_7a5);
}
var _7a6=this.getProperty("label");
if(_7a6){
this.setLabel(_7a6);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_7a7){
if(this.isAttached){
this.labelBinding.setLabel(_7a7);
}
this.setProperty("label",_7a7);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_7a9){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_7a9);
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
DialogTitleBarBinding.newInstance=function(_7aa){
var _7ab=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_7aa);
return UserInterface.registerBinding(_7ab,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7ac){
var _7ad=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7ac);
return UserInterface.registerBinding(_7ad,DialogTitleBarBodyBinding);
};
DialogControlBinding.prototype=new ControlBinding;
DialogControlBinding.prototype.constructor=DialogControlBinding;
DialogControlBinding.superclass=ControlBinding.prototype;
DialogControlBinding.CLASSNAME="dialogcontrol";
function DialogControlBinding(){
this.logger=SystemLogger.getLogger("DialogControlBinding");
this.hasMatrix=false;
this.isGhostable=true;
}
DialogControlBinding.prototype.toString=function(){
return "[DialogControlBinding]";
};
DialogControlBinding.prototype.onBindingRegister=function(){
DialogControlBinding.superclass.onBindingRegister.call(this);
this.setImageProfile(DialogControlImageProfile);
this.attachClassName(DialogControlBinding.CLASSNAME);
};
DialogControlBinding.newInstance=function(_7ae){
var _7af=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7ae);
return UserInterface.registerBinding(_7af,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7b0){
this.binding=_7b0;
}
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
var _7b3=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7b4=node.nodeName.toLowerCase();
switch(_7b4){
case "script":
case "style":
case "textarea":
_7b3=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7b3;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7bb=true;
if(exp.test(text)){
self._textnodes.add(node);
_7bb=false;
}
return _7bb;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7bc,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7bc,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7c0=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7c0+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7c6){
var _7c7="";
var _7c8="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7c9="</span>";
var self=this;
function iterate(_7cb){
var _7cc=-1;
var _7cd=null;
self._map.each(function(key,exp){
var low=_7cb.toLowerCase();
var _7d1=low.search(exp);
if(_7d1>-1){
if(_7cc==-1){
_7cc=_7d1;
}
if(_7d1<=_7cc){
_7cc=_7d1;
_7cd=key;
}
}
});
if(_7cc>-1&&_7cd!=null){
var pre=_7cb.substring(0,_7cc);
var hit=_7cb.substring(_7cc,_7cc+_7cd.length);
var pst=_7cb.substring(_7cc+_7cd.length,_7cb.length);
_7c7+=pre+_7c8+hit+_7c9;
iterate(pst);
}else{
_7c7+=_7cb;
}
}
iterate(_7c6);
return _7c7;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7d5){
var _7d6=new List(_7d5.getElementsByTagName("span"));
_7d6.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7d5.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7d9){
var _7da=null;
if(_7d9.isAttached){
var doc=_7d9.getContentDocument();
if(doc!=null){
_7da=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7da,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7da=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7da instanceof SOAPFault){
_7da=null;
}
}
}
}
return _7da;
};
WindowBinding.highlightKeywords=function(_7de,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7de.isAttached){
var doc=_7de.getContentDocument();
if(doc!=null){
var _7e1=WindowBinding._highlightcrawler;
_7e1.reset(doc.body);
if(list!=null){
_7e1.setKeys(list);
_7e1.crawl(doc.body);
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
var _7e2=WindowBinding.superclass.serialize.call(this);
if(_7e2){
_7e2.url=this.getURL();
}
return _7e2;
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
var _7e4=this.getContentWindow().DocumentManager;
if(_7e4!=null){
_7e4.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7e5){
WindowBinding.superclass.handleAction.call(this,_7e5);
var _7e6=_7e5.target;
switch(_7e5.type){
case RootBinding.ACTION_PHASE_3:
if(_7e6.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7e6);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7e5.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7e7){
if(!this.isFit||_7e7){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7e8){
if(this._pageBinding==null){
if(_7e8.bindingWindow==this.getContentWindow()){
this._pageBinding=_7e8;
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
WindowBinding.prototype._registerOnloadListener=function(_7e9){
var _7ea=this.shadowTree.iframe;
var _7eb=_7e9?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ee=true;
if(Client.isExplorer){
_7ee=_7ea.readyState=="complete";
}
if(_7ee==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7eb](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7ef){
var _7f0=_7ef?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7f0](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7f5=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7f5.getQueryString().each(function(name,_7f7){
if(_7f7.length>512){
data.set(name,_7f7);
_7f5.setParam(name,null);
}
});
url=_7f5.toString();
}
if(data){
var self=this;
var _7f9=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7f9.id;
form.setAttribute("target",_7f9.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7fc){
var _7fd=self.bindingDocument.createElement("input");
_7fd.name=name;
_7fd.value=_7fc;
_7fd.type="hidden";
form.appendChild(_7fd);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7fe=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7fe=url;
}
return _7fe;
};
WindowBinding.prototype.reload=function(_800){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _801=null;
if(this.shadowTree.iframe!=null){
_801=this.shadowTree.iframe;
}
return _801;
};
WindowBinding.prototype.getContentWindow=function(){
var _802=null,_803=this.getFrameElement();
if(_803!==null){
try{
_802=_803.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _802;
};
WindowBinding.prototype.getContentDocument=function(){
var _804=null,win=this.getContentWindow();
if(win){
_804=win.document;
}
return _804;
};
WindowBinding.prototype.getRootBinding=function(){
var _806=null,doc=this.getContentDocument();
if(doc&&doc.body){
_806=UserInterface.getBinding(doc.body);
}
return _806;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_808){
this.bindingElement.style.height=_808+"px";
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
WindowBinding.prototype.handleCrawler=function(_809){
WindowBinding.superclass.handleCrawler.call(this,_809);
if(_809.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_809.nextNode=root.bindingElement;
}else{
_809.response=NodeCrawler.SKIP_CHILDREN;
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
var _80e=this.getContentWindow();
if(_80e!=null&&_80e.document!=null&&_80e.document.body!=null){
if(this.bindingElement.offsetHeight){
_80e.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_80e.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_80f){
var _810=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_80f);
var _811=UserInterface.registerBinding(_810,WindowBinding);
return _811;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_815){
_815.target.show();
_815.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_817){
_817.target.show();
_817.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_819){
PreviewWindowBinding.superclass.handleAction.call(this,_819);
switch(_819.type){
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
var _81a=null;
this._getRadioButtonBindings().each(function(_81b){
if(_81b.getProperty("ischecked")){
_81a=_81b;
return false;
}else{
return true;
}
});
if(_81a){
this._checkedRadioBinding=_81a;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_81c){
RadioGroupBinding.superclass.handleAction.call(this,_81c);
var _81d=_81c.target;
switch(_81c.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_81c.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_81d.isRadioButton&&!_81d.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_81d);
}
this._checkedRadioBinding=_81d;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_81c.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_81e,_81f){
if(_81e instanceof RadioDataBinding){
_81e=_81e.getButton();
}
if(_81e.isRadioButton){
switch(_81f){
case true:
this._unCheckRadioBindingsExcept(_81e);
this._checkedRadioBinding=_81e;
_81e.check(true);
break;
default:
_81e.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_820){
var _821=this._getRadioButtonBindings();
_821.each(function(_822){
if(_822.isChecked&&_822!=_820){
_822.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _823=new Crawler();
var list=new List();
_823.addFilter(function(_825){
var _826=true;
var _827=UserInterface.getBinding(_825);
if(_827 instanceof RadioGroupBinding){
_826=NodeCrawler.SKIP_CHILDREN;
}else{
if(_827 instanceof ButtonBinding&&_827.isRadioButton){
list.add(_827);
}
}
return _826;
});
_823.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_828){
var _829=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_828);
return UserInterface.registerBinding(_829,RadioGroupBinding);
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
var _82b=this.getProperty("regexrule");
if(_82b!=null){
this.expression=new RegExp(_82b);
}
var _82c=this.getProperty("onbindingblur");
if(_82c!=null){
this.onblur=function(){
Binding.evaluate(_82c,this);
};
}
var _82d=this.getProperty("onvaluechange");
if(_82d!=null){
this.onValueChange=function(){
Binding.evaluate(_82d,this);
};
}
if(this.error==null&&this.type!=null){
var _82e=DataBinding.errors[this.type];
if(_82e!=null){
this.error=_82e;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _82f=this.getProperty("value");
if(_82f!=null){
this.setValue(String(_82f));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _831=this.getProperty("isdisabled");
if(_831==true){
this.setDisabled(true);
}
var _832=this.getProperty("readonly");
if(_832==true){
this.setReadOnly(true);
}
var _833=this.getProperty("autoselect");
if(_833==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _834=Localization.currentLang();
if(_834!=null){
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
var _835=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_835.type=this.isPassword==true?"password":"text";
_835.tabIndex=-1;
return _835;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_838){
if(_838){
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
DataInputBinding.prototype.focus=function(_83a){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_83a){
var self=this,_83c=this.bindingElement,_83d={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_83c,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_83c,DOMEvents.MOUSEUP,_83d);
}else{
this.select();
}
}
this.onfocus();
if(!_83a){
var _83e=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_83e);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _83f=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _840=_83f.createTextRange();
_840.moveStart("character",0);
_840.moveEnd("character",_83f.value.length);
_840.select();
}else{
_83f.setSelectionRange(0,_83f.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_841){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_841){
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
DataInputBinding.prototype.validate=function(_845){
if(_845==true||this._isValid){
var _846=this.isValid();
if(_846!=this._isValid){
this._isValid=_846;
if(!_846){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _847=null;
if(this._isInvalidBecauseRequired==true){
_847=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_847=DataBinding.warnings["minlength"];
_847=_847.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_847=DataBinding.warnings["maxlength"];
_847=_847.replace("${count}",String(this.maxlength));
}else{
_847=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_847!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_847);
}
}else{
this.setValue(_847);
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
var _848=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _849=this.getValue();
if(_849==""){
if(this.isRequired==true){
_848=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _84a=DataBinding.expressions[this.type];
if(!_84a.test(_849)){
_848=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_849)){
_848=false;
}
}
}
}
if(_848&&this.minlength!=null){
if(_849.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_848=false;
}
}
if(_848&&this.maxlength!=null){
if(_849.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_848=false;
}
}
return _848;
};
DataInputBinding.prototype.setDisabled=function(_84b){
if(_84b!=this.isDisabled){
if(_84b){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _84c=this.shadowTree.input;
if(_84b){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_84c,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_84c,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_84b;
this.shadowTree.input.unselectable=_84b?"on":"off";
}
this.isDisabled=_84b;
this.isFocusable=!_84b;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_84e){
if(_84e!=this.isReadOnly){
if(_84e){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_84e;
this.isReadOnly=_84e;
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
DataInputBinding.prototype.handleElement=function(_84f){
return true;
};
DataInputBinding.prototype.updateElement=function(_850){
var _851=_850.getAttribute("value");
var _852=_850.getAttribute("type");
var _853=_850.getAttribute("maxlength");
var _854=_850.getAttribute("minlength");
var _855=_850.getAttribute("required")==="true";
if(_851==null){
_851="";
}
var _856=this.bindingWindow.UpdateManager;
if(this.getValue()!=_851){
_856.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_851);
}
if(this.type!=_852){
_856.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_852;
}
if(this.maxlength!=_853){
_856.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_853;
}
if(this.minlength!=_854){
_856.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_854;
}
if(this.isRequired!=_855){
_856.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_855;
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
DataInputBinding.prototype.setValue=function(_857){
if(_857===null){
_857="";
}
if(_857!=this.getValue()){
this.setProperty("value",_857);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_857);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _858=null;
if(this.shadowTree.input!=null){
_858=this.shadowTree.input.value;
}else{
_858=this.getProperty("value");
}
return _858;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _85a=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_85a=Number(_85a);
break;
}
return _85a;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_85b){
var _85c=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_85b);
return UserInterface.registerBinding(_85c,DataInputBinding);
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
var _85d=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_85d!=null){
this.setValue(_85d.value);
_85d.parentNode.removeChild(_85d);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _85e;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_85e=div.firstChild;
}else{
_85e=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_85e.tabIndex=-1;
return _85e;
};
TextBoxBinding.prototype.handleElement=function(_860){
return true;
};
TextBoxBinding.prototype.updateElement=function(_861){
var _862,area=_861.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_862=DOMUtil.getTextContent(area);
}
if(_862==null){
_862="";
}
var _864=this.bindingWindow.UpdateManager;
if(this.getValue()!=_862){
_864.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_862);
}
var _865=_861.getAttribute("type");
if(this.type!=_865){
_864.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_865;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_869){
var _86a=this.bindingDocument.selection.createRange();
var _86b=_86a.text=="";
if(_86b&&!_869){
_86a.text="\t";
}else{
var text="";
var _86d=_86a.text.length;
while((_86a.moveStart("word",-1)&&_86a.text.charAt(1)!="\n")){
}
_86a.moveStart("character",1);
var _86e=0;
var i=0,line,_871=_86a.text.split("\n");
while((line=_871[i++])!=null){
if(_869){
line=line.replace(/^(\s)/mg,"");
_86e++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_871[i+1]?"\n":"");
}
_86a.text=text;
_86a.moveStart("character",-_86d);
if(_869){
_86a.moveStart("character",2*_871.length-2);
}
_86a.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _872=this.bindingDocument.selection.createRange();
var _873=_872.duplicate();
while((_873.moveStart("word",-1)&&_873.text.indexOf("\n")==-1)){
}
_873.moveStart("character",1);
_872.text="\n"+_873.text.match(/^(\s)*/)[0]+"!";
_872.moveStart("character",-1);
_872.select();
_872.text="";
_872.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_874){
var _875;
var _876;
var oss;
var osy;
var i;
var fnd;
var _87b=this._getSelectedText();
var el=this.shadowTree.input;
_875=el.scrollLeft;
_876=el.scrollTop;
if(!_87b.match(/\n/)){
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
_87b=this._getSelectedText();
if(_874){
ntext=_87b.replace(/^(\s)/mg,"");
}else{
ntext=_87b.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_87b.length);
}
el.scrollLeft=_875;
el.scrollTop=_876;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _87d;
var _87e;
var oss;
var osy;
var el=this.shadowTree.input;
_87d=el.scrollLeft;
_87e=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_87d;
el.scrollTop=_87e;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _885=this.shadowTree.input.value;
var _886=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _885.substr(_886,end-_886);
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
var _888=this.getProperty("isdisabled");
if(this.isDisabled||_888){
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
var _88a=this.getProperty("label");
var _88b=this.getProperty("value");
var _88c=this.getProperty("width");
var _88d=this.getProperty("onchange");
var _88e=this.getProperty("required")==true;
var _88f=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_88a!=null){
this.label=_88a;
}
if(!this.value&&_88b!=null){
this.value=_88b;
}
if(!this.width&&_88c){
this.width=_88c;
}
if(_88e){
this.isRequired=true;
}
if(_88f){
this._isLocal=true;
}
if(_88d){
this.onValueChange=function(){
Binding.evaluate(_88d,this);
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
var _890=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_890.name=this.getName();
_890.value=this.getValue();
_890.type="hidden";
if(this.hasCallBackID()){
_890.id=this.getCallBackID();
}
this.shadowTree.input=_890;
this.bindingElement.appendChild(_890);
};
SelectorBinding.prototype.buildButton=function(){
var _891=this.BUTTON_IMPLEMENTATION;
var _892=this.add(_891.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_892.imageProfile=this.imageProfile;
}
if(this.width!=null){
_892.setWidth(this.width);
}
this._buttonBinding=_892;
this.shadowTree.button=_892;
_892.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _893;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _894=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_894.id="selectorpopupset";
_893=UserInterface.registerBinding(_894,PopupSetBinding);
this.bindingDocument.body.appendChild(_893.bindingElement);
}else{
_893=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_893=top.app.bindingMap.selectorpopupset;
}
var doc=_893.bindingDocument;
var _896=_893.add(PopupBinding.newInstance(doc));
var _897=_896.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_896;
this._menuBodyBinding=_897;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_896.attachClassName("selectorpopup");
_896.addActionListener(PopupBinding.ACTION_SHOW,this);
_896.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_896.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_896);
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
var _89a=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_89a).each(function(_89b){
var _89c=_89b.getAttribute("label");
var _89d=_89b.getAttribute("value");
var _89e=_89b.getAttribute("selected");
var _89f=_89b.getAttribute("image");
var _8a0=_89b.getAttribute("image-hover");
var _8a1=_89b.getAttribute("image-active");
var _8a2=_89b.getAttribute("image-disabled");
var _8a3=null;
if(_89f||_8a0||_8a1||_8a2){
_8a3=new ImageProfile({image:_89f,imageHover:_8a0,imageActive:_8a1,imageDisabled:_8a2});
}
list.add(new SelectorBindingSelection(_89c?_89c:null,_89d?_89d:null,_89e&&_89e=="true",_8a3));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _8a5=null;
while(list.hasNext()){
var _8a6=list.getNext();
var item=this.addSelection(_8a6);
if(_8a6.isSelected){
this.select(item,true);
}
if(!_8a5){
_8a5=item;
}
}
if(!this._selectedItemBinding){
this.select(_8a5,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8a8,_8a9){
var _8aa=this.MENUITEM_IMPLEMENTATION;
var _8ab=this._menuBodyBinding;
var _8ac=_8ab.bindingDocument;
var _8ad=_8aa.newInstance(_8ac);
_8ad.imageProfile=_8a8.imageProfile;
_8ad.setLabel(_8a8.label);
if(_8a8.tooltip!=null){
_8ad.setToolTip(_8a8.tooltip);
}
_8ad.selectionValue=_8a8.value;
_8a8.menuItemBinding=_8ad;
if(_8a9){
_8ab.addFirst(_8ad);
this.selections.addFirst(_8a8);
}else{
_8ab.add(_8ad);
this.selections.add(_8a8);
}
this._isUpToDate=false;
return _8ad;
};
SelectorBinding.prototype.addSelectionFirst=function(_8ae){
return this.addSelection(_8ae,true);
};
SelectorBinding.prototype.clear=function(_8af){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8af&&this.defaultSelection!=null){
var _8b0=this.addSelection(this.defaultSelection);
this.select(_8b0,true);
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
SelectorBinding.prototype.setDisabled=function(_8b1){
if(this.isAttached==true){
var _8b2=this._buttonBinding;
_8b2.setDisabled(_8b1);
}
if(_8b1){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8b3){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8b3);
}
};
SelectorBinding.prototype.handleAction=function(_8b4){
SelectorBinding.superclass.handleAction.call(this,_8b4);
switch(_8b4.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8b4.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8b4.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8b4.target);
_8b4.consume();
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
_8b4.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8b6){
this.select(_8b6);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8b7=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8b8=this._popupBinding.bindingElement;
_8b8.style.minWidth=_8b7;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ba=Client.isExplorer?e.keyCode:e.which;
if(_8ba==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ba=Client.isExplorer?e.keyCode:e.which;
if(_8ba>=32){
this._buttonBinding.check();
var _8bb=String.fromCharCode(_8ba);
this._pushSearchSelection(_8bb);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8bc){
this._searchString+=_8bc.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8bd){
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
var _8be=this._menuBodyBinding;
if(_8be!=null){
var _8bf=this.MENUITEM_IMPLEMENTATION;
var _8c0=_8be.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8c2=list.getNext();
if(_8c2.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8c2);
}
}
}
this._attachSelections();
var _8c3=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8c4=_8be.getDescendantBindingsByType(_8bf);
if(_8c4.hasEntries()){
while(_8c4.hasNext()){
var _8c5=_8c4.getNext();
var _8c6=_8c5.labelBinding;
if(_8c6!=null&&_8c6.shadowTree!=null&&_8c6.shadowTree.labelText!=null){
_8c6.shadowTree.labelText.innerHTML=_8c6.shadowTree.labelText.innerHTML.replace(_8c3,"<b>$&</b>");
}
}
_8c4.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8c6=LabelBinding.newInstance(_8c0);
_8c6.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8be.add(_8c6);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8c2=list.getNext();
var item=this.addSelection(_8c2);
if(this._selectionValue==_8c2.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8c8,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8c8,arg);
switch(_8c8){
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
SelectorBinding.prototype.select=function(_8cb,_8cc){
var _8cd=false;
if(_8cb!=this._selectedItemBinding){
this._selectedItemBinding=_8cb;
_8cd=true;
var _8ce=this._buttonBinding;
this._selectionValue=_8cb.selectionValue;
this._selectionLabel=_8cb.getLabel();
_8ce.setLabel(_8cb.getLabel());
if(_8cb.imageProfile!=null){
_8ce.imageProfile=_8cb.imageProfile;
}
if(_8ce.imageProfile!=null){
_8ce.setImage(this.isDisabled==true?_8ce.imageProfile.getDisabledImage():_8ce.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8cc){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8cc)){
this.validate();
}
}
return _8cd;
};
SelectorBinding.prototype._relate=function(){
var _8cf=this.getProperty("relate");
if(_8cf){
var _8d0=this.bindingDocument.getElementById(_8cf);
if(_8d0){
var _8d1=UserInterface.getBinding(_8d0);
if(_8d1){
if(this.isChecked){
_8d1.show();
}else{
_8d1.hide();
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
SelectorBinding.prototype.selectByValue=function(_8d2,_8d3){
var _8d4=false;
var _8d5=this._menuBodyBinding;
var _8d6=_8d5.getDescendantElementsByLocalName("menuitem");
while(_8d6.hasNext()){
var _8d7=UserInterface.getBinding(_8d6.getNext());
if(_8d7.selectionValue==_8d2){
_8d4=this.select(_8d7,_8d3);
break;
}
}
return _8d4;
};
SelectorBinding.prototype.getValue=function(){
var _8d8=this._selectionValue;
if(_8d8!=null){
_8d8=String(_8d8);
}
return _8d8;
};
SelectorBinding.prototype.setValue=function(_8d9){
this.selectByValue(String(_8d9),true);
};
SelectorBinding.prototype.getResult=function(){
var _8da=this._selectionValue;
if(_8da=="null"){
_8da=null;
}
if(_8da){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8da=Number(_8da);
break;
}
}
return _8da;
};
SelectorBinding.prototype.setResult=function(_8db){
this.selectByValue(_8db,true);
};
SelectorBinding.prototype.validate=function(){
var _8dc=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8dd=this.getValue();
if(_8dd==this.defaultSelection.value){
_8dc=false;
}
if(_8dc!=this._isValid){
if(_8dc){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8dc;
}
return _8dc;
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
var _8de=this._popupBinding;
if(!this._isUpToDate){
_8de.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8df,_8e0){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8df));
return true;
};
SelectorBinding.newInstance=function(_8e1){
var _8e2=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8e1);
return UserInterface.registerBinding(_8e2,SelectorBinding);
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
var _8e5=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8e5){
this.onValueChange=function(){
Binding.evaluate(_8e5,this);
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
SimpleSelectorBinding.prototype.focus=function(_8e8){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8e8){
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
SimpleSelectorBinding.prototype._hack=function(_8e9){
if(Client.isExplorer){
this._select.style.width=_8e9?"auto":this._cachewidth+"px";
if(_8e9){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8ea=true;
if(this.isRequired){
if(this.getValue()==null){
_8ea=false;
}
}
if(_8ea!=this._isValid){
if(_8ea){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8eb=this._select;
var _8ec=_8eb.options[_8eb.selectedIndex];
var text=DOMUtil.getTextContent(_8ec);
_8eb.blur();
_8eb.style.color="#A40000";
_8eb.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ec,DataBinding.warnings["required"]);
}
_8eb.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ec,text);
}
};
}
this._isValid=_8ea;
}
return _8ea;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8ee=null;
var _8ef=this._select;
var _8f0=_8ef.options[_8ef.selectedIndex];
var _8f1=true;
if(Client.isExplorer){
var html=_8f0.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8f1=false;
}
}
if(_8f1){
_8ee=_8f0.getAttribute("value");
}
return _8ee;
};
SimpleSelectorBinding.prototype.setValue=function(_8f3){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8f4){
this.setValue(_8f4);
};
SimpleSelectorBinding.newInstance=function(_8f5){
var _8f6=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8f5);
return UserInterface.registerBinding(_8f6,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8f7,_8f8,_8f9,_8fa,_8fb){
this._init(_8f7,_8f8,_8f9,_8fa,_8fb);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8fc,_8fd,_8fe,_8ff,_900){
if(_8fc!=null){
this.label=String(_8fc);
}
if(_8fd!=null){
this.value=String(_8fd);
}
if(_8ff!=null){
this.imageProfile=_8ff;
}
if(_900!=null){
this.tooltip=_900;
}
this.isSelected=_8fe?true:false;
}};
DataInputSelectorBinding.prototype=new DataInputBinding;
DataInputSelectorBinding.prototype.constructor=DataInputSelectorBinding;
DataInputSelectorBinding.superclass=DataInputBinding.prototype;
DataInputSelectorBinding.INDICATOR_IMAGE=Resolver.resolve("${skin}/fields/selectorindicator.png");
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
var _901=this.getProperty("image");
if(_901){
this.setImage(_901);
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
var _904=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_904.popupBindingTargetElement=this.shadowTree.input;
_904.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_904.attach();
var self=this;
_904.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_904;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _907=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_907).each(function(_908){
if(_908.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _909=_908.getAttribute("value");
var _90a=_908.getAttribute("selected");
var _90b=_908.getAttribute("tooltip");
list.add({value:_909?_909:null,toolTip:_90b?_90b:null,isSelected:(_90a&&_90a=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _90d=this._menuBodyBinding;
var _90e=_90d.bindingDocument;
while(_90d.bindingElement.hasChildNodes()){
var node=_90d.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_90d.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _910=this.getProperty("emptyentrylabel");
if(_910){
var _911=MenuItemBinding.newInstance(_90e);
_911.setLabel(_910);
_911.selectionValue="";
_90d.add(_911);
}
while(list.hasNext()){
var _912=list.getNext();
var _911=MenuItemBinding.newInstance(_90e);
_911.setLabel(_912.label?_912.label:_912.value);
_911.selectionValue=_912.value;
if(_912.image){
_911.setImage(_912.image);
}
if(_912.toolTip){
_911.setToolTip(_912.toolTip);
}
if(_912.isSelected){
this.select(_911,true);
}
_90d.add(_911);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_913){
this.select(_913);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_914,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_914,arg);
switch(_914){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_914,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_916){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_916);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_917){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_917);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _918=this.bindingElement.offsetWidth+"px";
var _919=this._popupBinding.bindingElement;
_919.style.minWidth=_918;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _91a=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _91b=this.getValue();
var _91c=null;
_91a.each(function(item){
if(item.getLabel()==_91b){
_91c=item;
}
});
if(_91c){
_91c.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_91f){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_91f){
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
DataInputSelectorBinding.prototype.setValue=function(_920){
var _921=this.isReadOnly;
var _922=null;
if(_920!=null&&_920!=""){
var _923=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_923.hasNext()){
var item=_923.getNext();
if(item.selectionValue==_920){
_922=item.getLabel();
break;
}
}
}
if(_922!=null){
this.value=_920;
this.shadowTree.input.value=_922;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_920);
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
var _926="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_926);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_926);
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
var _928=ToolBarButtonBinding.newInstance(this.bindingDocument);
_928.setImage("${icon:popup}");
this.addFirst(_928);
_928.attach();
var self=this;
_928.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _92a=self.getProperty("handle");
var _92b=ViewDefinition.clone(_92a,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_92b instanceof DialogViewDefinition){
_92b.handler={handleDialogResponse:function(_92c,_92d){
self._isButtonClicked=false;
if(_92c==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _92e=_92d.getFirst();
self.setValue(_92e);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_92b.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_92b);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_928.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_928;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _930=this._dialogButtonBinding;
if(_930!=null){
_930.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _932=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_932=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _932;
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
var _935=ToolBarButtonBinding.newInstance(this.bindingDocument);
_935.setImage("${icon:editor-sourceview}");
_935.bindingElement.style.left="-24px";
_935.bindingElement.style.width="24px";
this.addFirst(_935);
_935.attach();
_935.hide();
var self=this;
_935.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_935;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_936){
UrlInputDialogBinding.superclass.setValue.call(this,_936);
if(this.isAttached){
this.compositeUrl=new Uri(_936);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _937=TreeService.GetCompositeUrlLabel(_936);
if(_937!=_936){
this.setLabel(_937);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_938){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_938){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_938;
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
var _939=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _93a=this.getProperty("image");
if(_93a!=null){
_939.setImage(_93a);
}else{
_939.setImage("${icon:popup}");
}
this.addFirst(_939);
_939.attach();
var self=this;
_939.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_939;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _93c=this._dialogButtonBinding;
if(_93c!=null){
_93c.oncommand();
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
var _93d=this.getProperty("required")==true;
if(_93d){
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
var _93e=this.getProperty("label");
var _93f=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_93e!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_93e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_93e);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_93f!=null){
this._buttonBinding.setToolTip(_93f);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _940="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_940,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _942=g.getAttribute("viewBox"),_943=document.createDocumentFragment(),_944=g.cloneNode(true);
if(_942){
this.shadowTree.indicatorimage.setAttribute("viewBox",_942);
}
_943.appendChild(_944);
this.shadowTree.indicatorimage.appendChild(_943);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_945){
DataDialogBinding.superclass.handleAction.call(this,_945);
var _946=_945.target;
var self=this;
switch(_945.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_948,_949){
if(_948==Dialog.RESPONSE_ACCEPT){
if(_949 instanceof DataBindingMap){
self._map=_949;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_946==this._buttonBinding){
_945.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_94a,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_94a,arg);
switch(_94a){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _94d=this.getProperty("handle");
var url=this.getURL();
var _94f=null;
if(_94d!=null||def!=null){
if(def!=null){
_94f=def;
}else{
_94f=ViewDefinitions[_94d];
}
if(_94f instanceof DialogViewDefinition){
_94f.handler=this._handler;
if(this._map!=null){
_94f.argument=this._map;
}
StageBinding.presentViewDefinition(_94f);
}
}else{
if(url!=null){
_94f=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_94f!=null){
this._dialogViewHandle=_94f.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_950){
this.setProperty("label",_950);
if(this.isAttached){
this._buttonBinding.setLabel(_950+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_951){
this.setProperty("image",_951);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_951);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_952){
this.setProperty("tooltip",_952);
if(this.isAttached){
this._buttonBinding.setToolTip(_952);
}
};
DataDialogBinding.prototype.setHandle=function(_953){
this.setProperty("handle",_953);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_955){
this._handler=_955;
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
var _956=true;
if(this.isRequired==true){
var _957=this.getValue();
if(_957==null||_957==""){
_956=false;
}
if(_956!=this._isValid){
if(_956){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_956;
}
return _956;
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
DataDialogBinding.newInstance=function(_959){
var _95a=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_959);
return UserInterface.registerBinding(_95a,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_95c,_95d){
if(_95c==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_95d);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_95e){
_95e=new String(_95e);
this.dirty();
this.setValue(encodeURIComponent(_95e));
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
var _962=this.getValue();
if(_962==null){
_962="";
}
this.shadowTree.dotnetinput.value=_962;
};
PostBackDataDialogBinding.prototype.setValue=function(_963){
this.setProperty("value",_963);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_964){
};
PostBackDataDialogBinding.newInstance=function(_965){
var _966=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_965);
return UserInterface.registerBinding(_966,PostBackDataDialogBinding);
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
var _967=this.getProperty("dialoglabel");
var _968=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _96a=this.getProperty("handle");
var _96b=this.getProperty("selectedtoken");
if(_96a!=null){
var def=ViewDefinition.clone(_96a,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_967!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_967;
}
if(_968!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_968;
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
if(_96b!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_96b;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_96d){
var _96e=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_96d);
return UserInterface.registerBinding(_96e,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_970){
self._datathing.setValue(_970);
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
var _973=self.getValue();
if(_973==""||_973==null){
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
var _974=this.getProperty("value");
var _975=this.getProperty("selectorlabel");
if(_975==null){
_975=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_974==null));
list.add(new SelectorBindingSelection(_975+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_974!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _974=this.getValue();
if(_974==""||_974==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_977){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_977);
switch(_977.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_977.target==this._datathing){
var _978=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_978){
self._selector.setLabel(_978);
}
},500);
_977.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_97a){
this.setProperty("label",_97a);
if(this._selector!=null){
this._selector.setLabel(_97a);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_97b){
this._datathing.setValue(_97b);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_97d,_97e){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_97d,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_97f){
this._buttonBinding.setLabel(_97f);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_980){
this._buttonBinding.setToolTip(_980);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_981){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_981);
switch(_981.type){
case MenuItemBinding.ACTION_COMMAND:
var _982=_981.target;
var _983=this.master;
if(_982.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_982.getLabel());
setTimeout(function(){
_983.action();
},0);
}else{
if(_983.getValue()){
_983.dirty();
}
_983.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_984){
var _985=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_984);
return UserInterface.registerBinding(_985,NullPostBackDataDialogSelectorBinding);
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
var _986=this._dataDialogBinding;
if(_986!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_986.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _987=this.getProperty("editable");
var _988=this.getProperty("selectable");
var _989=this.getProperty("display");
if(_987!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_988){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_989){
this._display=_989;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _98a=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_98a.selections=this.selections;
this.add(_98a);
_98a.attach();
this._dataDialogBinding=_98a;
this.shadowTree.datadialog=_98a;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _98c=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _98d=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_98c=_98d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_98c=_98d.isSelected!=true;
break;
}
if(_98c){
this.shadowTree.box.appendChild(this._getElementForSelection(_98d));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_98f){
var box=this.shadowTree.box;
var _991=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _992=list.getNext();
if(_98f){
_992.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_991=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_991=_992.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_991=_992.isSelected!=true;
break;
}
}
if(_991){
var _993=this._getElementForSelection(_992);
box.insertBefore(_993,box.firstChild);
CSSUtil.attachClassName(_993,"selected");
this._selectionMap.set(_992.value,_993);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_994){
var _995=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_995.appendChild(this.bindingDocument.createTextNode(_994.label));
_995.setAttribute("label",_994.label);
_995.setAttribute("value",_994.value);
return _995;
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
var _997=DOMEvents.getTarget(e);
var _998=DOMUtil.getLocalName(_997);
if(_998=="div"){
this._handleMouseDown(_997);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_999){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _99a=this._getElements();
var _99b=_999.getAttribute("value");
var _99c=this._lastSelectedElement.getAttribute("value");
var _99d=false;
while(_99a.hasNext()){
var el=_99a.getNext();
switch(el.getAttribute("value")){
case _99b:
case _99c:
_99d=!_99d;
break;
}
if(_99d){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_999);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_999)){
this._unhilite(_999);
}else{
this._hilite(_999);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_999){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_999;
};
MultiSelectorBinding.prototype._hilite=function(_9a1){
var _9a2=_9a1.getAttribute("value");
if(!this._selectionMap.has(_9a2)){
CSSUtil.attachClassName(_9a1,"selected");
this._selectionMap.set(_9a2,_9a1);
}
};
MultiSelectorBinding.prototype._unhilite=function(_9a3){
var _9a4=_9a3.getAttribute("value");
if(this._selectionMap.has(_9a4)){
CSSUtil.detachClassName(_9a3,"selected");
this._selectionMap.del(_9a4);
}
};
MultiSelectorBinding.prototype._isHilited=function(_9a5){
return CSSUtil.hasClassName(_9a5,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_9a6){
MultiSelectorBinding.superclass.handleAction.call(this,_9a6);
var _9a7=_9a6.target;
switch(_9a6.type){
case DataDialogBinding.ACTION_COMMAND:
if(_9a7==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_9a6.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_9a7.result);
this.dirty();
_9a7.result=null;
_9a6.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _9a8=null;
if(this.isSelectable){
_9a8=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9aa){
if(self._isHilited(_9aa)){
_9aa.parentNode.removeChild(_9aa);
_9a8.add(new SelectorBindingSelection(_9aa.getAttribute("label"),_9aa.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _9a8;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9ac=this._getElements();
if(!isUp){
_9ac.reverse();
}
var _9ad=true;
while(_9ad&&_9ac.hasNext()){
var _9ae=_9ac.getNext();
if(this._isHilited(_9ae)){
switch(isUp){
case true:
if(_9ae.previousSibling){
_9ae.parentNode.insertBefore(_9ae,_9ae.previousSibling);
}else{
_9ad=false;
}
break;
case false:
if(_9ae.nextSibling){
_9ae.parentNode.insertBefore(_9ae,_9ae.nextSibling.nextSibling);
}else{
_9ad=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9af=new List();
var _9b0=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9b2){
var _9b3=new SelectorBindingSelection(_9b2.getAttribute("label"),_9b2.getAttribute("value"),_9b0);
_9b3.isHighlighted=self._isHilited(_9b2);
_9af.add(_9b3);
});
return _9af;
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
var _9b4=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9b4.hasEntries()){
_9b4.each(function(_9b5){
_9b5.parentNode.removeChild(_9b5);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9b6=this.selections.getNext();
if(_9b6.isSelected){
var _9b7=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9b7.name=this._name;
_9b7.value=_9b6.value;
this.bindingElement.appendChild(_9b7);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9b8){
alert(_9b8);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9b9){
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
var _9ba={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9bb=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9bb.handler=this._handler;
_9bb.argument=_9ba;
StageBinding.presentViewDefinition(_9bb);
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
var _9bc={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9be={handleDialogResponse:function(_9bf,_9c0){
if(_9bf==Dialog.RESPONSE_ACCEPT){
self.result=_9c0;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9c1=ViewDefinitions[this._dialogViewHandle];
_9c1.handler=_9be;
_9c1.argument=_9bc;
StageBinding.presentViewDefinition(_9c1);
};
MultiSelectorDataDialogBinding.newInstance=function(_9c2){
var _9c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9c2);
return UserInterface.registerBinding(_9c3,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9c4){
var id=_9c4.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9c6=_9c4.bindingDocument.getElementById(id);
if(_9c6!=null){
var _9c7=UserInterface.getBinding(_9c6);
_9c7.setResult(true);
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
var _9c9=this.bindingDocument.getElementById(id);
if(_9c9!=null){
var _9ca=UserInterface.getBinding(_9c9);
if(_9ca&&!_9ca.isAttached){
_9ca.isLazy=true;
}else{
_9c9.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9cb){
this._isLazy=_9cb;
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
var _9cd=this.getProperty("stateprovider");
var _9ce=this.getProperty("handle");
if(_9cd!=null&&_9ce!=null){
url=url.replace("${stateprovider}",_9cd).replace("${handle}",_9ce);
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
EditorDataBinding.prototype._onPageInitialize=function(_9cf){
EditorDataBinding.superclass._onPageInitialize.call(this,_9cf);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9d0){
EditorDataBinding.superclass.handleAction.call(this,_9d0);
switch(_9d0.type){
case Binding.ACTION_DIRTY:
if(_9d0.target!=this){
if(!this.isDirty){
this.dirty();
}
_9d0.consume();
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
EditorDataBinding.prototype.setValue=function(_9d1){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9d2){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9d3){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9d3);
if(this.hasBasic===false){
var _9d4=this.getContentWindow().bindingMap.basicgroup;
if(_9d4){
_9d4.hide();
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
var _9d9=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9d9=fake.getValue()!="";
}
if(!_9d9&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9d9&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9d9;
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
var _9dd=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9dd!=null){
_9dd.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9de){
_9de=_9de!=null?_9de:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9de;
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
var _9df=this.getProperty("label");
if(_9df){
this.setLabel(_9df);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9e0){
this.setProperty("label",_9e0);
if(this.shadowTree.labelBinding==null){
var _9e1=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9e1.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9e1.bindingElement,this.bindingElement.firstChild);
_9e1.attach();
this.shadowTree.labelBinding=_9e1;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9e0));
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
var _9e3=this.getProperty("relation");
if(_9e3!=null){
this.bindingRelation=_9e3;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9e4,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9e4,arg);
switch(_9e4){
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
FieldBinding.newInstance=function(_9e6){
var _9e7=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9e6);
return UserInterface.registerBinding(_9e7,FieldBinding);
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
var _9e8=this.getDescendantBindingByLocalName("fieldgroup");
if(_9e8!=null){
_9e8.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9e9=true;
var _9ea=this.getDescendantBindingsByLocalName("*");
while(_9ea.hasNext()){
var _9eb=_9ea.getNext();
if(Interfaces.isImplemented(IData,_9eb)){
var _9ec=_9eb.validate();
if(_9e9&&!_9ec){
_9e9=false;
}
}
}
return _9e9;
};
FieldsBinding.prototype.handleAction=function(_9ed){
FieldsBinding.superclass.handleAction.call(this,_9ed);
var _9ee=_9ed.target;
if(_9ee!=this){
switch(_9ed.type){
case Binding.ACTION_INVALID:
var _9ef=DataBinding.getAssociatedLabel(_9ee);
if(_9ef){
this._invalidFieldLabels.set(_9ee.key,_9ef);
}
if(_9ee.error){
if(!_9ee.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9ee.error},_9ee);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9ed.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9ee.key)){
this._invalidFieldLabels.del(_9ee.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9ed.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9f0=null;
if(this._invalidFieldLabels.hasEntries()){
_9f0=this._invalidFieldLabels.toList();
}
return _9f0;
};
FieldsBinding.newInstance=function(_9f1){
var _9f2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9f1);
return UserInterface.registerBinding(_9f2,FieldsBinding);
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
var _9f3=this.getProperty("image");
if(_9f3){
this.setImage(_9f3);
}
var _9f4=this.getProperty("tooltip");
if(_9f4){
this.setToolTip(_9f4);
}
var _9f5=this.getProperty("label");
if(_9f5){
this.setLabel(_9f5);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9f7=this.getAncestorBindingByLocalName("field");
if(_9f7){
var _9f8=true;
_9f7.getDescendantBindingsByLocalName("*").each(function(_9f9){
if(Interfaces.isImplemented(IData,_9f9)){
_9f9.focus();
_9f8=false;
}
return _9f8;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9fa){
this.setProperty("label",_9fa);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9fa);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9fb=this.getProperty("label");
if(!_9fb){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9fb=node.data;
}
}
return _9fb;
};
FieldDescBinding.prototype.setImage=function(_9fd){
this.setProperty("image",_9fd);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9fe){
this.setProperty("tooltip",_9fe);
if(this.isAttached){
this.bindingElement.title=_9fe;
}
};
FieldDescBinding.newInstance=function(_9ff){
var _a00=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9ff);
return UserInterface.registerBinding(_a00,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_a01){
var _a02=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_a01);
return UserInterface.registerBinding(_a02,FieldDataBinding);
};
FieldHelpBinding.prototype=new Binding;
FieldHelpBinding.prototype.constructor=FieldHelpBinding;
FieldHelpBinding.superclass=Binding.prototype;
FieldHelpBinding.INDICATOR_IMAGE="${skin}/fields/fieldhelpindicator.png";
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
var _a03=this._fieldHelpPopupBinding;
if(_a03){
_a03.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _a04=app.bindingMap.fieldhelpopupset;
var doc=_a04.bindingDocument;
var _a06=_a04.add(PopupBinding.newInstance(doc));
var _a07=_a06.add(PopupBodyBinding.newInstance(doc));
_a06.position=PopupBinding.POSITION_RIGHT;
_a06.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_a07.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _a08=this.getProperty("label");
if(_a08){
_a07.bindingElement.innerHTML=Resolver.resolve(_a08);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_a06;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a09=this.getAncestorBindingByLocalName("field");
if(_a09){
_a09.attachClassName("fieldhelp");
var _a0a=ClickButtonBinding.newInstance(this.bindingDocument);
_a0a.attachClassName("fieldhelp");
_a0a.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a0a);
_a0a.attach();
var self=this;
_a0a.oncommand=function(){
self.attachPopupBinding();
};
_a0a.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a0a;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a0c=this._fieldHelpPopupBinding;
if(_a0c&&!_a0c.isAttached){
_a0c.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a0e){
RadioDataGroupBinding.superclass.handleAction.call(this,_a0e);
switch(_a0e.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a10,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a10,arg);
switch(_a10){
case BroadcastMessages.KEY_ARROW:
var _a12=null;
var next=null;
var _a14=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a14=this.getChildBindingsByLocalName("radio");
while(!_a12&&_a14.hasNext()){
var _a15=_a14.getNext();
if(_a15.getProperty("ischecked")){
_a12=_a15;
}
}
break;
}
if(_a12){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a14.getFollowing(_a12);
while(next!=null&&next.isDisabled){
next=_a14.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a14.getPreceding(_a12);
while(next!=null&&next.isDisabled){
next=_a14.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a16){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a16){
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
var _a17=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a17.type="hidden";
_a17.name=this._name;
this.bindingElement.appendChild(_a17);
this.shadowTree.input=_a17;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a18=null;
var _a19=this.getChildBindingsByLocalName("radio");
while(!_a18&&_a19.hasNext()){
var _a1a=_a19.getNext();
if(_a1a.isChecked){
_a18=_a1a.getProperty("value");
}
}
return _a18;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a1b){
};
RadioDataGroupBinding.prototype.setResult=function(_a1c){
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
var _a1d=this.getProperty("relate");
var _a1e=this.getProperty("oncommand");
var _a1f=this.getProperty("isdisabled");
if(_a1d){
this.bindingRelate=_a1d;
this.relate();
}
if(_a1e){
this.oncommand=function(){
Binding.evaluate(_a1e,this);
};
}
if(_a1f==true){
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
var _a21=this.getCallBackID();
this._buttonBinding.check=function(_a22){
RadioButtonBinding.prototype.check.call(this,_a22);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a23){
RadioButtonBinding.prototype.uncheck.call(this,_a23);
self.deleteProperty("ischecked");
self.isChecked=false;
self.relate();
};
this._buttonBinding.oncommand=function(){
self.isChecked=this.isChecked;
self.relate();
if(Types.isFunction(self.oncommand)){
self.oncommand();
}
};
};
RadioDataBinding.prototype.setChecked=function(_a24,_a25){
this._buttonBinding.setChecked(_a24,_a25);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a24);
};
RadioDataBinding.prototype.check=function(_a26){
this.setChecked(true,_a26);
};
RadioDataBinding.prototype.uncheck=function(_a27){
this.setChecked(false,_a27);
};
RadioDataBinding.prototype.setDisabled=function(_a28){
if(_a28!=this.isDisabled){
this.isDisabled=_a28;
this._buttonBinding.setDisabled(_a28);
if(_a28){
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
var _a2a=DOMEvents.getTarget(e);
switch(_a2a){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a2b=this.getProperty("label");
if(_a2b){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a2b)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a2c){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a2c;
}
this.setProperty("label",_a2c);
};
RadioDataBinding.prototype.handleElement=function(_a2d){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a2e){
var _a2f=_a2e.getAttribute("ischecked")==="true";
if(this.isChecked!=_a2f){
this.setChecked(_a2f,true);
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
var _a31=DOMEvents.getTarget(e);
switch(_a31){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a32,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a32,arg);
switch(_a32){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a35){
_a35.consume();
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
var _a37=this.getCallBackID();
this._buttonBinding.check=function(_a38){
ButtonBinding.prototype.check.call(this,_a38);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a38){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a39){
ButtonBinding.prototype.uncheck.call(this,_a39);
self.setProperty("ischecked",false);
self.isChecked=false;
self.relate();
};
this._buttonBinding.oncommand=function(){
self.isChecked=this.isChecked;
self.focus();
self.relate();
if(self.oncommand){
self.oncommand();
}
self.dirty();
if(_a37!=null){
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
var _a3a=true;
var _a3b=this.bindingElement.parentNode;
if(_a3b){
var _a3c=UserInterface.getBinding(_a3b);
if(_a3c&&_a3c instanceof CheckBoxGroupBinding){
if(_a3c.isRequired){
if(_a3c.isValid){
_a3a=_a3c.validate();
}else{
_a3a=false;
}
}
}
}
return _a3a;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a3d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a3d.type="hidden";
_a3d.name=this._name;
_a3d.style.display="none";
this.bindingElement.appendChild(_a3d);
this.shadowTree.input=_a3d;
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
var _a3e=null;
var _a3f=this.getProperty("value");
if(this.isChecked){
_a3e=_a3f?_a3f:"on";
}
return _a3e;
};
CheckBoxBinding.prototype.setValue=function(_a40){
if(_a40==this.getValue()||_a40=="on"){
this.check(true);
}else{
if(_a40!="on"){
this.setPropety("value",_a40);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a41=false;
if(this.isChecked){
_a41=this._result!=null?this._result:true;
}
return _a41;
};
CheckBoxBinding.prototype.setResult=function(_a42){
if(typeof _a42=="boolean"){
this.setChecked(_a42,true);
}else{
this._result=_a42;
}
};
CheckBoxBinding.newInstance=function(_a43){
var _a44=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a43);
return UserInterface.registerBinding(_a44,CheckBoxBinding);
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
var _a45=true;
if(this.isRequired){
var _a46=this.getDescendantBindingsByLocalName("checkbox");
if(_a46.hasEntries()){
_a45=false;
while(_a46.hasNext()&&!_a45){
if(_a46.getNext().isChecked){
_a45=true;
}
}
}
if(_a45==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a45;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a47){
if(_a47){
if(!this._labelBinding){
var _a48=LabelBinding.newInstance(this.bindingDocument);
_a48.attachClassName("invalid");
_a48.setImage("${icon:error}");
_a48.setLabel("Selection required");
this._labelBinding=this.addFirst(_a48);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a49){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a49);
switch(_a49.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a4a){
var _a4b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a4a);
return UserInterface.registerBinding(_a4b,CheckBoxGroupBinding);
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
BalloonBinding.prototype=new MatrixBinding;
BalloonBinding.prototype.constructor=BalloonBinding;
BalloonBinding.superclass=MatrixBinding.prototype;
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
var _a4c=DialogControlBinding.newInstance(this.bindingDocument);
_a4c.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a4c);
this._controlGroupBinding.attachRecursive();
var _a4d=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a4d);
var _a4e=this.getLabel();
if(_a4e!=null){
this.setLabel(_a4e);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a4f=this._snapTargetBinding;
if(Binding.exists(_a4f)==true){
_a4f.removeActionListener(Binding.ACTION_BLURRED,this);
_a4f.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a50){
if(Interfaces.isImplemented(IData,_a50)){
this._snapTargetBinding=_a50;
var _a51=_a50.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a51&&_a51.isConsumed){
this._environmentBinding=_a51.listener;
}
if(this._environmentBinding){
_a50.addActionListener(Binding.ACTION_BLURRED,this);
_a50.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a50)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a50.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a53=this._snapTargetBinding;
var _a54=this._environmentBinding;
var root=UserInterface.getBinding(_a53.bindingDocument.body);
if(Binding.exists(_a53)&&Binding.exists(_a54)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a53.isAttached&&_a54.isAttached){
var _a56=_a53.boxObject.getUniversalPosition();
var _a57=_a54.boxObject.getUniversalPosition();
_a57.y+=_a54.bindingElement.scrollTop;
_a57.x+=_a54.bindingElement.scrollLeft;
var tDim=_a53.boxObject.getDimension();
var eDim=_a54.boxObject.getDimension();
var _a5a=false;
if(_a56.y+tDim.h<_a57.y){
_a5a=true;
}else{
if(_a56.x+tDim.w<_a57.x){
_a5a=true;
}else{
if(_a56.y>_a57.y+eDim.h){
_a5a=true;
}else{
if(_a56.x>_a57.x+eDim.w){
_a5a=true;
}
}
}
}
if(!_a5a){
this._setComputedPosition(_a56,_a57,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a5b,_a5c,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a61=_a5b;
var _a62=false;
if(_a5b.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a62=true;
}else{
if(_a5b.x+tDim.w>=_a5c.x+eDim.w){
_a62=true;
}
}
if(_a62){
_a61.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a61.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a61.y-=(bDim.h);
_a61.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a61);
};
BalloonBinding.prototype.handleBroadcast=function(_a63,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a63,arg);
switch(_a63){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a65){
var _a66=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a65){
_a66=true;
}
}
return _a66;
};
BalloonBinding.prototype._setPosition=function(_a68){
var _a69=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a69=true;
}
}
if(!_a69){
this.bindingElement.style.left=_a68.x+"px";
this.bindingElement.style.top=_a68.y+"px";
this._point=_a68;
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
BalloonBinding.prototype.handleAction=function(_a6b){
BalloonBinding.superclass.handleAction.call(this,_a6b);
var _a6c=_a6b.target;
switch(_a6b.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a6b.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a6c==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a6c)){
self.dispose();
}else{
if(_a6c.validate()){
var _a6e=true;
if(_a6b.type==Binding.ACTION_BLURRED){
var root=_a6c.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a6e=false;
}
}
if(_a6e){
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
BalloonBinding.prototype.setLabel=function(_a71){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a72=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a71);
_a72.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a72);
}
this.setProperty("label",_a71);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a74){
var _a75=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a74);
var _a76=UserInterface.registerBinding(_a75,BalloonBinding);
_a76.hide();
return _a76;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a77,_a78){
if(Interfaces.isImplemented(IData,_a78)==true){
var _a79,_a7a=_a78.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a7a&&_a7a.isConsumed){
switch(_a7a.listener.constructor){
case StageBinding:
_a79=false;
break;
case StageDialogBinding:
_a79=true;
break;
}
}
var _a7b=_a79?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a7c=_a7b.add(BalloonBinding.newInstance(top.app.document));
_a7c.setLabel(_a77.text);
_a7c.snapTo(_a78);
_a7c.attach();
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
var _a7d=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a80=_a7d.getDataBinding(name);
if(_a80){
ErrorBinding.presentError({text:text},_a80);
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
FocusBinding.focusElement=function(_a81){
var _a82=true;
try{
_a81.focus();
Application.focused(true);
}
catch(exception){
var _a83=UserInterface.getBinding(_a81);
var _a84=SystemLogger.getLogger("FocusBinding.focusElement");
_a84.warn("Could not focus "+(_a83?_a83.toString():String(_a81)));
_a82=false;
}
return _a82;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a85){
var win=_a85.bindingWindow;
var id=_a85.bindingElement.id;
return {getBinding:function(){
var _a88=null;
try{
if(Binding.exists(_a85)){
_a88=win.bindingMap[id];
}
}
catch(exception){
}
return _a88;
}};
};
FocusBinding.navigateNext=function(_a89){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a89);
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
var _a8a=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a8a&&_a8a.isConsumed){
if(_a8a.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a8b){
FocusBinding.superclass.handleAction.call(this,_a8b);
var _a8c=_a8b.target;
var _a8d=null;
if(this._isFocusManager){
switch(_a8b.type){
case FocusBinding.ACTION_ATTACHED:
if(_a8c!=this){
this._isUpToDate=false;
}
_a8b.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a8c!=this){
this._isUpToDate=false;
_a8b.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a8d=new FocusCrawler();
_a8d.mode=FocusCrawler.MODE_BLUR;
_a8d.crawl(_a8c.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a8b.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a8c!=this){
_a8d=new FocusCrawler();
_a8d.mode=FocusCrawler.MODE_FOCUS;
_a8d.crawl(_a8c.bindingElement);
}
_a8b.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a8c)){
this.claimFocus();
this._onFocusableFocused(_a8c);
}
_a8b.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a8c)){
this._onFocusableBlurred(_a8c);
}
_a8b.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a8e){
var _a8f=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a8f==null&&list.hasNext()){
var _a91=list.getNext();
if(this._cachedFocus&&_a91==this._cachedFocus.getBinding()){
_a8f=_a91;
}
}
if(_a8f!=null){
if(_a91.isFocused){
var next=_a8e?list.getPreceding(_a8f):list.getFollowing(_a8f);
if(!next){
next=_a8e?list.getLast():list.getFirst();
}
next.focus();
}else{
_a8f.focus();
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
var _a93=new FocusCrawler();
var list=new List();
_a93.mode=FocusCrawler.MODE_INDEX;
_a93.crawl(this.bindingElement,list);
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
var _a96=this._cachedFocus.getBinding();
if(_a96&&!_a96.isFocused){
_a96.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a97){
if(_a97!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a97;
_a97.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a97);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a98){
_a98.deleteProperty(FocusBinding.MARKER);
if(_a98==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a9a){
this.bindingElement.style.left=_a9a+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a9b){
this.hiddenTabBindings.add(_a9b);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a9c=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a9c.getLabel());
item.setImage(_a9c.getImage());
item.associatedTabBinding=_a9c;
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
TabsButtonBinding.prototype.handleAction=function(_a9f){
TabsButtonBinding.superclass.handleAction.call(this,_a9f);
switch(_a9f.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _aa0=this.selectedTabBinding;
if(_aa0){
this.containingTabBoxBinding.moveToOrdinalPosition(_aa0,0);
this.containingTabBoxBinding.select(_aa0);
}
_a9f.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_aa1){
var _aa2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_aa1);
_aa2.setAttribute("type","checkbox");
_aa2.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_aa2.className="tabbutton";
return UserInterface.registerBinding(_aa2,TabsButtonBinding);
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
var _aa3=TabBoxBinding.currentActiveInstance;
if(_aa3!=null&&Binding.exists(_aa3)){
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
var _aa4=this.getTabElements().getLength();
var _aa5=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_aa4!=_aa5){
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
var _aa6=this.getTabPanelElements();
while(_aa6.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_aa6.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _aa7=DOMUtil.getOrdinalPosition(this._tabsElement);
var _aa8=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _aa9=_aa7>_aa8?"tabsbelow":"tabsontop";
this.attachClassName(_aa9);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _aab=this.getTabPanelElements();
var _aac=null;
var _aad=this.getProperty("selectedindex");
if(_aad!=null){
if(_aad>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aae=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _ab0=_aab.getNext();
this.registerTabBoxPair(tab,_ab0);
if(_aad&&_aae==_aad){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aac=tab;
}
}
_aae++;
}
if(!_aac){
_aac=tabs.getFirst();
_aac.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_ab1){
var _ab2=null;
var _ab3=null;
if(this.isEqualSize){
var _ab4=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_ab6=this.getTabPanelElements();
_ab6.each(function(_ab7){
max=_ab7.offsetHeight>max?_ab7.offsetHeight:max;
});
_ab3=max+_ab4.top+_ab4.bottom;
if(_ab1&&this._tabPanelsElement.style.height!=null){
_ab2=this._tabPanelsElement.offsetHeight;
}
if(_ab2!=null||_ab3>_ab2){
this._tabPanelsElement.style.height=_ab3+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_ab8){
_ab8._invalidCount=0;
_ab8.addActionListener(Binding.ACTION_INVALID,this);
_ab8.addActionListener(Binding.ACTION_VALID,this);
_ab8.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ab9){
TabBoxBinding.superclass.handleAction.call(this,_ab9);
var _aba=_ab9.target;
var _abb=_ab9.listener;
switch(_ab9.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aba.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ab9.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aba.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_abb._invalidCount++;
if(_abb._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_abb.isSelected){
self._showWarning(_abb,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_abb._invalidCount>0){
_abb._invalidCount--;
if(_abb._invalidCount==0){
if(_abb.isSelected){
this._showWarning(_abb,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_abb,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ab9._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ab9._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _abe=DOMEvents.getTarget(e);
if(_abe==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ac0=this.getTabPanelElements();
tabs.each(function(tab,_ac2){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ac3=_ac0.get(_ac2);
this.registerTabBoxPair(tab,_ac3);
}
},this);
var _ac4=this._tabBoxPairs;
for(var key in _ac4){
var tab=_ac4[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_abe);
switch(_abe.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ac8=_abe.parentNode;
if(_ac8==this._tabsElement||_ac8==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_abe==this._tabsElement||_abe==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aca){
var _acb=this.getBindingForArgument(arg);
if(_acb!=null&&!_acb.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_acb.select(_aca);
this.getTabPanelBinding(_acb).select(_aca);
var _acc=this.getProperty("selectedindex");
if(_acc!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_acb.bindingElement,true));
}
this._selectedTabBinding=_acb;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_acb.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _acd=this.getTabPanelBinding(_acb);
this._showBalloon(_acd,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_acf){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_acf.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_acf};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ad3){
var _ad4=null;
try{
var key=_ad3.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad6=this._tabBoxPairs[key].tabPanel;
_ad4=UserInterface.getBinding(_ad6);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ad4;
};
TabBoxBinding.prototype.getTabBinding=function(_ad7){
var key=_ad7.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad9=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ad9);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ada=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ada);
return _ada;
};
TabBoxBinding.prototype.appendTabByBindings=function(_adb,_adc){
var _add=_adb.bindingElement;
_adb.setProperty("selected",true);
var _ade=this.summonTabPanelBinding();
var _adf=_ade.bindingElement;
if(_adc){
_adf.appendChild(_adc instanceof Binding?_adc.bindingElement:_adc);
}
this.registerTabBoxPair(_add,_adf);
UserInterface.getBinding(this._tabsElement).add(_adb);
this._tabPanelsElement.appendChild(_adf);
_adb.attach();
UserInterface.getBinding(_adf).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _adb;
};
TabBoxBinding.prototype.importTabBinding=function(_ae0){
var that=_ae0.containingTabBoxBinding;
var _ae2=that.getTabPanelBinding(_ae0);
var _ae3=_ae2.getBindingElement();
var _ae4=_ae0.getBindingElement();
that.dismissTabBinding(_ae0);
this._tabsElement.appendChild(_ae4);
this._tabPanelsElement.appendChild(_ae3);
this.registerTabBoxPair(_ae4,_ae3);
_ae0.containingTabBoxBinding=this;
this.select(_ae0);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ae5){
var _ae6=null;
if(_ae5.isSelected){
_ae6=this.getBestTab(_ae5);
this._selectedTabBinding=null;
}
var _ae7=this.getTabPanelBinding(_ae5);
this.unRegisterTabBoxPair(_ae5.bindingElement);
_ae5.dispose();
_ae7.dispose();
if(_ae6!=null){
this.select(_ae6,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ae8){
if(_ae8.isSelected){
this.selectBestTab(_ae8);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ae9){
var _aea=this.getBestTab(_ae9);
if(_aea){
this.select(_aea);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_aeb){
var _aec=null;
var _aed=_aeb.getOrdinalPosition(true);
var _aee=this.getTabBindings();
var _aef=_aee.getLength();
var _af0=_aef-1;
if(_aef==1){
_aec=null;
}else{
if(_aed==_af0){
_aec=_aee.get(_aed-1);
}else{
_aec=_aee.get(_aed+1);
}
}
return _aec;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_af1,_af2){
var _af3=this.bindingDocument.getElementById(_af1.bindingElement.id);
var tab=this.getTabElements().get(_af2);
this._tabsElement.insertBefore(_af3,tab);
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
var _af5=this._nodename_tab;
var _af6=new List(this._tabsElement.childNodes);
var _af7=new List();
while(_af6.hasNext()){
var _af8=_af6.getNext();
if(_af8.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af8)==_af5){
_af7.add(_af8);
}
}
return _af7;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _af9=this._nodename_tabpanel;
var _afa=new List(this._tabPanelsElement.childNodes);
var _afb=new List();
_afa.each(function(_afc){
if(_afc.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_afc)==_af9){
_afb.add(_afc);
}
});
return _afb;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _afd=new List();
var _afe=this.getTabElements();
_afe.each(function(_aff){
_afd.add(UserInterface.getBinding(_aff));
});
return _afd;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _b00=new List();
this.getTabPanelElements().each(function(_b01){
_b00.add(UserInterface.getBinding(_b01));
});
return _b00;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _b02=null;
if(this._selectedTabBinding){
_b02=this.getTabPanelBinding(this._selectedTabBinding);
}
return _b02;
};
TabBoxBinding.prototype._showWarning=function(_b03,_b04){
var _b05=this.getTabBinding(_b03);
if(_b04){
if(_b05.labelBinding.hasImage){
_b05._backupImage=_b05.getImage();
}
_b05.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_b05._backupImage){
_b05.setImage(_b05._backupImage);
}else{
_b05.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_b06,_b07){
var _b08=this.getTabBinding(_b06);
if((_b07&&!_b08.isSelected)||!_b07){
if(_b08.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_b07){
if(_b08.labelBinding.hasImage){
_b08._backupImage=_b08.getImage();
}
_b08.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_b08._backupImage!=null){
_b08.setImage(_b08._backupImage);
}else{
_b08.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b09){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b0c=tab.getOrdinalPosition(true);
var next=null;
var _b0e=new List();
tabs.each(function(t){
if(t.isVisible){
_b0e.add(t);
}
});
if(_b0e.getLength()>1){
if(_b0c==0&&!_b09){
next=_b0e.getLast();
}else{
if(_b0c==_b0e.getLength()-1&&_b09){
next=_b0e.getFirst();
}else{
if(_b09){
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
var _b10=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b10.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b11){
TabsBinding.superclass.handleAction.call(this,_b11);
switch(_b11.type){
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
var _b14=self.bindingElement.offsetWidth;
if(_b14!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b14;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b15){
if(_b15 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b15);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b16=false;
var _b17,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b1a=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b1b=this.bindingElement.offsetWidth-_b1a.RESERVED_SPACE;
var _b1c=null;
var sum=0,_b1e=0;
var _b1f=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b1f){
tab=tabs.getNext();
_b17=UserInterface.getBinding(tab);
if(!_b1c){
_b1c=_b17;
}
sum+=tab.offsetWidth;
if(sum>=_b1b){
_b16=true;
if(_b17.isSelected){
if(!DOMUtil.isFirstElement(_b17.bindingElement,true)){
this.isManaging=false;
if(_b1c){
_b1c.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b17,_b1e-1);
_b1f=false;
}
}else{
_b17.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b17);
}
}else{
_b17.show();
_b1c=_b17;
_b1e++;
}
}
if(_b1f){
if(_b16&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b20=_b1c.getBindingElement();
var _b21=_b20.offsetLeft+_b20.offsetWidth;
var _b22=this.tabsButtonBinding;
setTimeout(function(){
_b22.show(_b21+4);
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
var _b23=TabBinding.superclass.serialize.call(this);
if(_b23){
_b23.label=this.getLabel();
_b23.image=this.getImage();
_b23.tooltip=this.getToolTip();
}
return _b23;
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
var _b24=this.bindingElement.getAttribute("image");
var _b25=this.bindingElement.getAttribute("label");
var _b26=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b25){
this.setLabel(_b25);
}
if(_b24){
this.setImage(_b24);
}
if(_b26){
this.setToolTip(_b26);
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
TabBinding.prototype.setLabel=function(_b28){
if(_b28!=null){
this.setProperty("label",_b28);
if(this.isAttached){
this.labelBinding.setLabel(_b28);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b29){
if(_b29){
this.setProperty("tooltip",_b29);
if(this.isAttached){
this.labelBinding.setToolTip(_b29);
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
var _b2b=false;
if(Client.isMozilla==true){
}
if(!_b2b){
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
TabBinding.prototype.select=function(_b2c){
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
TabBinding.newInstance=function(_b2d){
var _b2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b2d);
return UserInterface.registerBinding(_b2e,TabBinding);
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
var _b2f=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b2f=true;
this._lastKnownDimension=dim1;
}
return _b2f;
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
TabPanelBinding.prototype.select=function(_b32){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b32!=true){
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
TabPanelBinding.prototype.handleAction=function(_b33){
TabPanelBinding.superclass.handleAction.call(this,_b33);
var _b34=_b33.target;
switch(_b33.type){
case BalloonBinding.ACTION_INITIALIZE:
_b33.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b35){
var _b36=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b35);
UserInterface.registerBinding(_b36,TabPanelBinding);
return UserInterface.getBinding(_b36);
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
var _b37=SplitBoxBinding.superclass.serialize.call(this);
if(_b37){
_b37.orient=this.getOrient();
_b37.layout=this.getLayout();
}
return _b37;
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
var _b39=this.getSplitPanelElements();
if(_b39.hasEntries()){
var _b3a=new List(this.getLayout().split(":"));
if(_b3a.getLength()!=_b39.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b39.each(function(_b3b){
_b3b.setAttribute("ratio",_b3a.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b3c=this.getProperty("orient");
if(_b3c){
this._orient=_b3c;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b3d=this.getSplitterBindings();
while(_b3d.hasNext()){
var _b3e=_b3d.getNext();
if(_b3e&&_b3e.getProperty("collapsed")==true){
_b3e.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b3f){
SplitBoxBinding.superclass.handleAction.call(this,_b3f);
switch(_b3f.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b3f.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b3f.target);
_b3f.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b3f.target);
_b3f.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b40){
this._getSplitPanelBindingForSplitter(_b40).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b41){
this._getSplitPanelBindingForSplitter(_b41).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b42){
var _b43=DOMUtil.getOrdinalPosition(_b42.bindingElement,true);
var _b44,_b45=this.getSplitPanelElements();
switch(_b42.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b44=_b45.get(_b43);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b44=_b45.get(_b43+1);
break;
}
return UserInterface.getBinding(_b44);
};
SplitBoxBinding.prototype.invokeLayout=function(_b46){
var _b47=this.isHorizontalOrient();
var _b48=this.getSplitPanelBindings();
var _b49=this.getSplitterBindings();
var _b4a=new List();
var _b4b,sum=0;
var _b4d=0;
_b48.each(function(_b4e){
if(_b4e.isFixed==true){
if(!_b48.hasNext()){
_b4d+=_b4e.getFix();
}
_b4a.add(0);
sum+=0;
}else{
_b4b=_b4e.getRatio();
_b4a.add(_b4b);
sum+=_b4b;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b4a.getLength()!=_b48.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b4f=_b47?this.getInnerWidth():this.getInnerHeight();
_b4f-=_b4d;
_b49.each(function(_b50){
if(_b50.isVisible){
_b4f-=SplitterBinding.DIMENSION;
}
});
var unit=_b4f/sum;
var _b52=0;
var self=this;
_b48.each(function(_b54){
var span=0;
var _b56=_b4a.getNext();
if(_b54.isFixed){
span=_b54.getFix();
}else{
span=Math.floor(unit*_b56);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b52+=span;
while(_b52>_b4f){
_b52--;
span--;
}
if(!_b54.isFixed){
if(_b47){
_b54.setWidth(span);
}else{
_b54.setHeight(span);
}
}
});
}
if(_b46!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b57=this.getLayout();
if(_b57){
this.setProperty("layout",_b57);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b58=this.isHorizontalOrient();
var _b59=this.getSplitPanelBindings();
var _b5a=this.getSplitterBindings();
var _b5b=null;
var _b5c=null;
var unit=null;
var _b5e=null;
var span=null;
_b59.each(function(_b60){
if(!unit){
unit=_b58?_b60.getWidth():_b60.getHeight();
}
span=_b58?_b60.getWidth():_b60.getHeight();
if(_b5e){
span-=_b5e;
_b5e=null;
}
_b5b=_b5a.getNext();
if(_b5b&&_b5b.offset){
_b5e=_b5b.offset;
span+=_b5e;
}
_b60.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b61){
this.logger.debug(_b61);
this.setProperty("layout",_b61);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b62="",_b63=this.getSplitPanelBindings();
_b63.each(function(_b64){
_b62+=_b64.getRatio().toString();
_b62+=_b63.hasNext()?":":"";
});
this.setProperty("layout",_b62);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b65=this.getSplitPanelElements();
_b65.each(function(_b66){
layout+="1"+(_b65.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b67){
this.bindingElement.style.width=_b67+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b68){
this.bindingElement.style.height=_b68+"px";
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
var _b69=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b69.reverse();
}
return _b69;
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
SplitBoxBinding.prototype.fit=function(_b6a){
if(!this.isFit||_b6a){
if(this.isHorizontalOrient()){
var max=0;
var _b6c=this.getSplitPanelBindings();
_b6c.each(function(_b6d){
var _b6e=_b6d.bindingElement.offsetHeight;
max=_b6e>max?_b6e:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b6f){
var _b70=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b6f);
return UserInterface.registerBinding(_b70,SplitBoxBinding);
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
var _b73=this.getProperty("hidden");
if(_b73){
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
var _b74=this.getProperty("ratiocache");
if(_b74){
this.setRatio(_b74);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b75){
if(!this.isFixed){
if(_b75!=this.getWidth()){
if(_b75<0){
_b75=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b75+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b75);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b76=null;
if(this.isFixed){
_b76=this.getFix();
}else{
_b76=this.bindingElement.offsetWidth;
}
return _b76;
};
SplitPanelBinding.prototype.setHeight=function(_b77){
if(!this.isFixed){
if(_b77!=this.getHeight()){
try{
this.bindingElement.style.height=_b77+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b78=null;
if(this.isFixed){
_b78=this.getFix();
}else{
_b78=this.bindingElement.offsetHeight;
}
return _b78;
};
SplitPanelBinding.prototype.setRatio=function(_b79){
this.setProperty("ratio",_b79);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b7a){
if(_b7a){
this._fixedSpan=_b7a;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b7a);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b7a);
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
SplitPanelBinding.newInstance=function(_b7b){
var _b7c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b7b);
return UserInterface.registerBinding(_b7c,SplitPanelBinding);
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
var _b7d=SplitBoxBinding.superclass.serialize.call(this);
if(_b7d){
_b7d.collapse=this.getProperty("collapse");
_b7d.collapsed=this.getProperty("collapsed");
_b7d.disabled=this.getProperty("isdisabled");
}
return _b7d;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b7e=this.getProperty("hidden");
if(_b7e){
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
SplitterBinding.prototype.setCollapseDirection=function(_b80){
this.setProperty("collapse",_b80);
this._collapseDirection=_b80;
};
SplitterBinding.prototype.handleAction=function(_b81){
SplitterBinding.superclass.handleAction.call(this,_b81);
switch(_b81.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b81.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b83=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b83.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b83.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b84){
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
SplitterBinding.newInstance=function(_b8f){
var _b90=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b8f);
return UserInterface.registerBinding(_b90,SplitterBinding);
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
var _b91=this.getProperty("selectedindex");
var _b92=this.getDeckElements();
if(_b92.hasEntries()){
var _b93=false;
var _b94=0;
while(_b92.hasNext()){
var deck=_b92.getNext();
if(_b91&&_b94==_b91){
deck.setAttribute("selected","true");
_b93=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b93=true;
}
}
_b94++;
}
if(!_b93){
_b92.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b97=this.getBindingForArgument(arg);
if(_b97!=null){
if(_b97!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b97.select();
this._selectedDeckBinding=_b97;
var _b98=this.getProperty("selectedindex");
if(_b98!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b97.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b99=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b99=true;
this._lastKnownDimension=dim1;
}
return _b99;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b9c){
var _b9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b9c);
return UserInterface.registerBinding(_b9d,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b9e){
DeckBinding.superclass.handleAction.call(this,_b9e);
var _b9f=_b9e.target;
switch(_b9e.type){
case BalloonBinding.ACTION_INITIALIZE:
_b9e.consume();
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
DeckBinding.newInstance=function(_ba1){
var _ba2=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_ba1);
return UserInterface.registerBinding(_ba2,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_ba3){
if(_ba3 instanceof ToolBarBodyBinding){
if(_ba3.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_ba3;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_ba3;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_ba3);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _ba4=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_ba4){
this.setImageSize(_ba4);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _ba6=ToolBarGroupBinding.newInstance(this.bindingDocument);
_ba6.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_ba6.isDefaultContent=true;
this.add(_ba6);
_ba6.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _ba8=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_ba8);
}
if(_ba8!=null&&_ba8.hasClassName("max")){
this._maxToolBarGroup(_ba8,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_baa){
var _bab=this.boxObject.getDimension().w;
var _bac=CSSComputer.getPadding(this.bindingElement);
_bab-=(_bac.left+_bac.right);
if(_baa!=null){
_bab-=_baa.boxObject.getDimension().w;
if(!Client.isWindows){
_bab-=1;
}
if(Client.isExplorer){
_bab-=15;
}
}
max.bindingElement.style.width=_bab+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_bad){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_bad);
};
ToolBarBinding.prototype.addLeft=function(_bae,_baf){
var _bb0=null;
if(this._toolBarBodyLeft!=null){
_bb0=this._toolBarBodyLeft.add(_bae,_baf);
}else{
throw new Error("No left toolbarbody");
}
return _bb0;
};
ToolBarBinding.prototype.addLeftFirst=function(_bb1,_bb2){
var _bb3=null;
if(this._toolBarBodyLeft){
_bb3=this._toolBarBodyLeft.addFirst(_bb1,_bb2);
}else{
throw new Error("No left toolbarbody");
}
return _bb3;
};
ToolBarBinding.prototype.addRight=function(_bb4){
var _bb5=null;
if(this._toolBarBodyRight){
_bb5=this._toolBarBodyRight.add(_bb4);
}else{
throw new Error("No left toolbarbody");
}
return _bb5;
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
ToolBarBinding.newInstance=function(_bb8){
var _bb9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bb8);
return UserInterface.registerBinding(_bb9,ToolBarBinding);
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
var _bba=this.getDescendantBindingsByLocalName("toolbargroup");
var _bbb=new List();
var _bbc=true;
_bba.each(function(_bbd){
if(_bbd.isVisible&&!_bbd.isDefaultContent){
_bbb.add(_bbd);
}
});
while(_bbb.hasNext()){
var _bbe=_bbb.getNext();
_bbe.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bbc){
_bbe.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bbc=false;
}
if(!_bbb.hasNext()){
_bbe.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bc1=list.getNext();
var _bc2=_bc1.getEqualSizeWidth();
if(_bc2>max){
max=_bc2;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bc1=list.getNext();
_bc1.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bc3,_bc4){
var _bc5=ToolBarBinding.superclass.add.call(this,_bc3);
if(!_bc4){
if(_bc3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bc5;
};
ToolBarBodyBinding.prototype.addFirst=function(_bc6,_bc7){
var _bc8=ToolBarBinding.superclass.addFirst.call(this,_bc6);
if(!_bc7){
if(_bc6 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bc8;
};
ToolBarBodyBinding.newInstance=function(_bc9){
var _bca=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bc9);
return UserInterface.registerBinding(_bca,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bcb){
switch(_bcb){
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
var _bcc=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bcc)=="toolbarbody"){
UserInterface.getBinding(_bcc).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bcd=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bcd)=="toolbarbody"){
UserInterface.getBinding(_bcd).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bce){
var _bcf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bce);
return UserInterface.registerBinding(_bcf,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bd0){
var _bd1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bd0);
return UserInterface.registerBinding(_bd1,ToolBarButtonBinding);
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
var _bd2=this.getProperty("label");
var _bd3=this.getProperty("image");
if(_bd2){
this.setLabel(_bd2);
}
if(_bd3){
this.setImage(_bd3);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bd4,_bd5){
if(this.isAttached){
this._labelBinding.setLabel(_bd4,_bd5);
}
this.setProperty("label",_bd4);
};
ToolBarLabelBinding.prototype.setImage=function(_bd6,_bd7){
if(this.isAttached){
this._labelBinding.setImage(_bd6,_bd7);
}
this.setProperty("image",_bd6);
};
ToolBarLabelBinding.newInstance=function(_bd8){
var _bd9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bd8);
return UserInterface.registerBinding(_bd9,ToolBarLabelBinding);
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
var _bda=this.getDescendantBindingsByLocalName("clickbutton");
if(_bda.hasEntries()){
while(_bda.hasNext()){
var _bdb=_bda.getNext();
if(_bdb.isDefault){
this._defaultButton=_bdb;
_bdb.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bdb.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bda;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bdc,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bdc,arg);
switch(_bdc){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bde=this.getAncestorBindingByType(DialogBinding,true);
if(_bde!=null&&_bde.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bdf){
DialogToolBarBinding.superclass.handleAction.call(this,_bdf);
var _be0=_bdf.target;
var _be1=false;
var _be2=this._buttons.reset();
if(_be0 instanceof ClickButtonBinding){
switch(_bdf.type){
case Binding.ACTION_FOCUSED:
_be0.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_be0;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_be0.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_be1&&_be2.hasNext()){
var _be3=_be2.getNext();
_be1=_be3.isFocused;
}
if(!_be1){
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
ComboBoxBinding.newInstance=function(_be5){
var _be6=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_be5);
return UserInterface.registerBinding(_be6,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_be7,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_be7,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _beb=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_beb.each(function(_bec){
var _bed=_bec.getProperty("oncommand");
_bec.setProperty("hiddencommand",_bed);
_bec.deleteProperty("oncommand");
_bec.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bee=null;
var _bef=this.getActiveMenuItemId();
_beb.reset();
while(_beb.hasNext()){
var _bf0=_beb.getNext();
if(_bf0.getProperty("id")==_bef){
_bee=_bf0;
break;
}
}
if(_bee==null&&_beb.hasEntries()){
_bee=_beb.getFirst();
}
if(_bee!=null){
this.setButton(_bee);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bf1){
if(_bf1 instanceof MenuItemBinding){
var _bf2=_bf1.getProperty("label");
var _bf3=_bf1.getProperty("image");
var _bf4=_bf1.getProperty("image-hover");
var _bf5=_bf1.getProperty("image-active");
var _bf6=_bf1.getProperty("image-disabled");
var _bf7=_bf1.getProperty("hiddencommand");
this.setLabel(_bf2?_bf2:"");
this.image=_bf3;
this.imageHover=_bf3;
this.imageActive=_bf5;
this.imageDisabled=_bf6;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bf7,this);
};
this.hideActiveItem(_bf1);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bf8){
if(_bf8 instanceof MenuItemBinding){
this.setButton(_bf8);
this.setActiveMenuItemId(_bf8.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bf9){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bfa){
if(_bfa==_bf9){
Binding.prototype.hide.call(_bfa);
}else{
Binding.prototype.show.call(_bfa);
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
var _bfc=this._views;
for(var _bfd in ViewDefinitions){
var def=ViewDefinitions[_bfd];
var key=def.perspective;
if(key!=null){
if(!_bfc.has(key)){
_bfc.set(key,new List());
}
var list=_bfc.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_c01,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_c01,arg);
switch(_c01){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _c04=this.bindingWindow.bindingMap.toolboxpopupgroup;
_c04.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_c04.add(StageViewMenuItemBinding.newInstance(_c04.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_c04.show();
}else{
_c04.hide();
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
TreeBinding.grid=function(_c08){
var _c09=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_c08);
var _c0b=_c08%_c09;
if(_c0b>0){
_c08=_c08-_c0b+_c09;
}
return _c08+TreeBodyBinding.PADDING_TOP;
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
var _c0c=this.getProperty("focusable");
if(_c0c!=null){
this._isFocusable=_c0c;
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
var _c0e=this.getProperty("builder");
if(_c0e){
this._buildFromTextArea(_c0e);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c0f=this.getProperty("selectable");
var _c10=this.getProperty("selectionproperty");
var _c11=this.getProperty("selectionvalue");
if(_c0f){
this.setSelectable(true);
if(_c10){
this.setSelectionProperty(_c10);
}
if(_c11){
this.setSelectionValue(_c11);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c14=UserInterface.getBinding(area);
var _c15=this._treeBodyBinding;
function build(){
_c15.subTreeFromString(area.value);
}
_c14.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c16){
var _c17=_c16.getHandle();
if(this._treeNodeBindings.has(_c17)){
throw "Duplicate treenodehandles registered: "+_c16.getLabel();
}else{
this._treeNodeBindings.set(_c17,_c16);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c17)){
_c16.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c19){
this._treeNodeBindings.del(_c19.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c1a){
var _c1b=null;
if(this._treeNodeBindings.has(_c1a)){
_c1b=this._treeNodeBindings.get(_c1a);
}else{
throw "No such treenode: "+_c1a;
}
return _c1b;
};
TreeBinding.prototype.handleAction=function(_c1c){
TreeBinding.superclass.handleAction.call(this,_c1c);
var _c1d=_c1c.target;
switch(_c1c.type){
case TreeNodeBinding.ACTION_OPEN:
_c1c.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c1d);
_c1c.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c1d;
this.focusSingleTreeNodeBinding(_c1d);
if(!this.isFocused){
this.focus();
}
_c1c.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c1d;
this.focusSingleTreeNodeBinding(_c1d);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c1d;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c1d;
this.focusSingleTreeNodeBinding(_c1d);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c1c.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c1d.isFocused){
this.blurSelectedTreeNodes();
}
_c1c.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c1e,_c1f){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c20){
if(_c20!=null&&!_c20.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c20);
_c20.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c21){
this.blurSelectedTreeNodes();
while(_c21.hasNext()){
var _c22=_c21.getNext();
this._focusedTreeNodeBindings.add(_c22);
_c22.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c23=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c24=false;
var _c25=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c26=this._focusedTreeNodeBindings.getNext();
var _c27=_c26.getProperty(this._selectionProperty);
if(_c27!=null){
if(!this._selectionValue||this._selectionValue[_c27]){
_c25=(this._selectedTreeNodeBindings[_c26.key]=_c26);
var _c28=_c23[_c26.key];
if(!_c28||_c28!=_c25){
_c24=true;
}
}
}
}
if(_c25){
if(_c24){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c23){
for(var key in _c23){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c2a=new List();
for(var key in this._selectedTreeNodeBindings){
_c2a.add(this._selectedTreeNodeBindings[key]);
}
return _c2a;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c2c){
_c2c.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c2d){
var _c2e=_c2d.getDescendantBindingsByLocalName("treenode");
var _c2f=true;
var self=this;
_c2e.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c2f;
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
var _c32=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c32!=null){
this.focusSingleTreeNodeBinding(_c32);
_c32.callback();
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
TreeBinding.prototype.add=function(_c33){
var _c34=null;
if(this._treeBodyBinding){
_c34=this._treeBodyBinding.add(_c33);
}else{
this._treeNodeBuffer.add(_c33);
_c34=_c33;
}
return _c34;
};
TreeBinding.prototype.addFirst=function(_c35){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c36=this._treeBodyBinding.bindingElement;
_c36.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c37,_c38){
if(_c38.isContainer&&_c38.isOpen){
_c38.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c39){
this._isSelectable=_c39;
if(_c39){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c3a){
this._selectionProperty=_c3a;
};
TreeBinding.prototype.setSelectionValue=function(_c3b){
if(_c3b){
var list=new List(_c3b.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c3d,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c3d,arg);
switch(_c3d){
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
var _c3f=this.getFocusedTreeNodeBindings();
if(_c3f.hasEntries()){
var node=_c3f.getFirst();
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
var _c42=this.getFocusedTreeNodeBindings();
if(_c42.hasEntries()){
var node=_c42.getFirst();
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
var _c45=null;
while(next==null&&(_c45=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c45!=null){
next=_c45.getNextBindingByLocalName("treenode");
}
node=_c45;
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
var _c47=DOMEvents.getTarget(e);
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
var _c48=new TreeCrawler();
var list=new List();
_c48.mode=TreeCrawler.MODE_GETOPEN;
_c48.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c4b=list.getNext();
map.set(_c4b.getHandle(),true);
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
var _c50=this._positionIndicatorBinding;
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
if(y!=_c50.getPosition().y){
_c50.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c50.isVisible){
_c50.show();
}
}else{
if(_c50.isVisible){
_c50.hide();
}
}
}else{
if(_c50.isVisible){
_c50.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c53){
this._acceptingTreeNodeBinding=_c53;
this._acceptingPosition=_c53.boxObject.getLocalPosition();
this._acceptingDimension=_c53.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c53);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c54){
var map={};
var _c56=_c54.getChildBindingsByLocalName("treenode");
var _c57,pos,dim,y;
y=TreeBinding.grid(_c54.boxObject.getLocalPosition().y);
map[y]=true;
while(_c56.hasNext()){
_c57=_c56.getNext();
pos=_c57.boxObject.getLocalPosition();
dim=_c57.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c5d in this._acceptingPositions){
if(_c5d==y){
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
TreeBinding.newInstance=function(_c5e){
var _c5f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c5e);
var _c60=UserInterface.registerBinding(_c5f,TreeBinding);
_c60.treeBodyBinding=TreeBodyBinding.newInstance(_c5e);
return _c60;
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
TreeBodyBinding.prototype.accept=function(_c61){
if(_c61 instanceof TreeNodeBinding){
this.logger.debug(_c61);
}
};
TreeBodyBinding.prototype.handleAction=function(_c62){
TreeBodyBinding.superclass.handleAction.call(this,_c62);
switch(_c62.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c62.target);
_c62.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c63){
var _c64=_c63.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c64.offsetTop;
var h=_c64.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c64.scrollIntoView(true);
}else{
if(y-t+h>a){
_c64.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_c6a){
var _c6b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c6a);
return UserInterface.registerBinding(_c6b,TreeBodyBinding);
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
var _c6c=TreeNodeBinding.superclass.serialize.call(this);
if(_c6c){
_c6c.label=this.getLabel();
_c6c.image=this.getImage();
var _c6d=this.getHandle();
if(_c6d&&_c6d!=this.key){
_c6c.handle=_c6d;
}
if(this.isOpen){
_c6c.open=true;
}
if(this.isDisabled){
_c6c.disabled=true;
}
if(this.dragType){
_c6c.dragtype=this.dragType;
}
if(this.dragAccept){
_c6c.dragaccept=this.dragAccept;
}
}
return _c6c;
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
var _c6f=UserInterface.getBinding(node);
if(_c6f&&_c6f.containingTreeBinding){
this.containingTreeBinding=_c6f.containingTreeBinding;
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
var _c70=this.key;
var _c71=this.getProperty("handle");
if(_c71){
_c70=_c71;
}
return _c70;
};
TreeNodeBinding.prototype.setHandle=function(_c72){
this.setProperty("handle",_c72);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c74=this.getProperty("label");
var _c75=this.getProperty("tooltip");
var _c76=this.getProperty("oncommand");
var _c77=this.getProperty("onbindingfocus");
var _c78=this.getProperty("onbindingblur");
var _c79=this.getProperty("focused");
var _c7a=this.getProperty("callbackid");
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
if(_c74!=null){
this.setLabel(_c74);
}
if(_c75!=null){
this.setToolTip(_c75);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c7c=this.bindingWindow.WindowManager;
if(_c76!=null){
this.oncommand=function(){
Binding.evaluate(_c76,this);
};
}
if(_c77!=null){
this.onfocus=function(){
Binding.evaluate(_c77,this);
};
}
if(_c78!=null){
this.onblur=function(){
Binding.evaluate(_c78,this);
};
}
if(_c79==true){
this.focus();
}
if(_c7a!=null){
Binding.dotnetify(this,_c7a);
}
};
TreeNodeBinding.prototype.handleAction=function(_c7d){
TreeNodeBinding.superclass.handleAction.call(this,_c7d);
switch(_c7d.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c7d.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c7e,_c7f){
var _c80=true;
if(_c7e instanceof TreeNodeBinding){
var _c81=false;
var _c82=this.bindingElement;
var _c83=this.containingTreeBinding.bindingElement;
while(!_c81&&_c82!=_c83){
if(_c82==_c7e.getBindingElement()){
_c81=true;
}else{
_c82=_c82.parentNode;
}
}
if(_c81){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c80=false;
}else{
this.acceptTreeNodeBinding(_c7e,_c7f);
}
}else{
_c80=false;
}
return _c80;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c84,_c85){
var _c86=_c84.serializeToString();
var _c87=new BindingParser(this.bindingDocument);
var _c88=_c87.parseFromString(_c86).getFirst();
_c85=_c85?_c85:this.containingTreeBinding.getDropIndex();
var _c89=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c88,_c89.get(_c85));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c84.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c8a=this.getProperty("image");
var _c8b=this.getProperty("image-active");
var _c8c=this.getProperty("image-disabled");
_c8b=_c8b?_c8b:this.isContainer?_c8a?_c8a:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c8a?_c8a:TreeNodeBinding.DEFAULT_ITEM;
_c8c=_c8c?_c8c:this.isContainer?_c8a?_c8a:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c8a?_c8a:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c8a=_c8a?_c8a:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c8a,imageHover:null,imageActive:_c8b,imageDisabled:_c8c});
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
TreeNodeBinding.prototype.setLabel=function(_c8e){
this.setProperty("label",String(_c8e));
if(this.isAttached){
this.labelBinding.setLabel(String(_c8e));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c8f){
this.setProperty("tooltip",String(_c8f));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c8f));
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
var _c90=this.imageProfile.getDefaultImage();
var _c91=this.imageProfile.getActiveImage();
_c91=_c91?_c91:_c90;
return this.isOpen?_c91:_c90;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c93=DOMEvents.getTarget(e);
var _c94=this.labelBinding.bindingElement;
var _c95=this.labelBinding.shadowTree.labelBody;
var _c96=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c93){
case _c94:
this._onAction(e);
break;
case _c95:
case _c96:
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
if(_c93.parentNode==this.bindingElement&&_c93.__updateType==Update.TYPE_INSERT){
var _c94=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c93)=="treenode"){
if(_c93==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c93,_c94.nextSibling);
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
switch(_c93){
case _c94:
case _c95:
case _c96:
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
var _c9a=true;
if(e.type=="mousedown"){
var _c9b=e.button==(e.target?0:1);
if(!_c9b){
_c9a=false;
}
}
if(_c9a){
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
var _c9d=false;
if(e!=null){
_c9d=e.shiftKey;
}
this.dispatchAction(_c9d?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _ca0=this.getDescendantBindingsByLocalName("treenode");
_ca0.each(function(_ca1){
_ca1.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_ca2){
var _ca3=_ca2.getAttribute("focused");
if(_ca3=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_ca4){
var _ca5=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ca4);
return UserInterface.registerBinding(_ca5,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_ca6){
var _ca7=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_ca6);
return UserInterface.registerBinding(_ca7,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_ca8){
this.bindingElement.style.left=_ca8.x+"px";
this.bindingElement.style.top=_ca8.y+"px";
this._geometry.x=_ca8.x;
this._geometry.y=_ca8.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_ca9){
var _caa=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_ca9);
return UserInterface.registerBinding(_caa,TreePositionIndicatorBinding);
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
this.addFilter(function(_cac){
var _cad=UserInterface.getBinding(_cac);
var _cae=null;
var _cae=null;
if(!_cad instanceof TreeNodeBinding){
_cae=NodeCrawler.SKIP_NODE;
}
return _cae;
});
this.addFilter(function(_caf,list){
var _cb1=UserInterface.getBinding(_caf);
var _cb2=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_cb1.isOpen){
list.add(_cb1);
}
break;
}
return _cb2;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_cb3){
this.binding=_cb3;
}
DockControlImageProfile.prototype.getHoverImage=function(){
return null;
};
DockControlImageProfile.prototype.getActiveImage=function(){
return null;
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
DockTabsButtonBinding.newInstance=function(_cb4){
var _cb5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cb4);
_cb5.setAttribute("type","checkbox");
_cb5.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cb5.className="tabbutton";
return UserInterface.registerBinding(_cb5,DockTabsButtonBinding);
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
var _cb6=DockBinding.superclass.serialize.call(this);
if(_cb6){
_cb6.active=this.isActive?true:null;
_cb6.collapsed=this.isCollapsed?true:null;
}
return _cb6;
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
DockBinding.prototype.interceptDisplayChange=function(_cb8){
var _cb9=this.getSelectedTabPanelBinding();
if(_cb9){
_cb9.isVisible=_cb8;
_cb9.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cba){
var _cbb=this._getBindingForDefinition(_cba);
var _cbc=DockTabBinding.newInstance(this.bindingDocument);
_cbc.setHandle(_cba.handle);
_cbc.setLabel(_cba.flowHandle?null:_cba.label);
_cbc.setImage(_cba.image);
_cbc.setToolTip(_cba.toolTip);
_cbc.setEntityToken(_cba.entityToken);
_cbc.setAssociatedView(_cbb);
this.appendTabByBindings(_cbc,null);
this._setupPageBindingListeners(_cbc);
var _cbd=this.getTabPanelBinding(_cbc);
_cbb.snapToBinding(_cbd);
var _cbe=this.bindingWindow.bindingMap.views;
_cbe.add(_cbb);
if(!this.isActive){
this.activate();
}
_cbb.attach();
};
DockBinding.prototype.prepareOpenView=function(_cbf,_cc0){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cc0.setLabel(_cbf.label);
_cc0.setImage(_cbf.image);
_cc0.setToolTip(_cbf.toolTip);
this._setupPageBindingListeners(_cc0);
var _cc1=this.getTabPanelBinding(_cc0);
var _cc2=this._getBindingForDefinition(_cbf);
_cc0.setAssociatedView(_cc2);
_cc2.snapToBinding(_cc1);
UserInterface.getBinding(this.bindingDocument.body).add(_cc2);
_cc2.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cc3){
var _cc4=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cc4.bindingDocument);
view.setDefinition(_cc3);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cc6){
var _cc7=this.getTabPanelBinding(_cc6);
var self=this;
var _cc9={handleAction:function(_cca){
var _ccb=_cca.target;
switch(_cca.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_ccb.reflex(true);
var view=_cc6.getAssociatedView();
if(_ccb.bindingWindow==view.getContentWindow()){
_cc6.updateDisplay(_ccb);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cc6.onPageInitialize(_ccb);
_cca.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cc6.getAssociatedView();
if(_ccb.bindingWindow==view.getContentWindow()){
_cc6.updateDisplay(_ccb);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cc6.updateDisplay(_ccb);
_cca.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cc6.updateEntityToken(_ccb);
_cca.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cc6.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cc6.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cc6);
_cca.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cc6,true);
_cca.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cc6);
break;
case Binding.ACTION_FORCE_REFLEX:
_cc7.reflex(true);
_cca.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cc6.isDirty){
_cc6.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_ccd){
_cc7.addActionListener(_ccd,_cc9);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cce){
DockBinding.superclass.handleAction.call(this,_cce);
var _ccf=_cce.target;
switch(_cce.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cce.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_ccf instanceof DockBinding){
if(_ccf.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_ccf);
if(this.isActive){
_ccf.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_ccf);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cd0,arg){
DockBinding.superclass.handleBroadcast.call(this,_cd0,arg);
switch(_cd0){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cd2=arg;
if(_cd2.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cd2.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cd3){
var tabs=this.getTabBindings();
var _cd5=false;
while(tabs.hasNext()&&!_cd5){
var tab=tabs.getNext();
var _cd7=tab.getEntityToken();
if(_cd7!=null&&_cd7==_cd3){
if(!tab.isSelected){
this.select(tab,true);
_cd5=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cd8){
this._handleCollapse(true,_cd8);
};
DockBinding.prototype.unCollapse=function(_cd9){
this._handleCollapse(false,_cd9);
};
DockBinding.prototype._handleCollapse=function(_cda,_cdb){
var _cdc=this.getChildBindingByLocalName("dockpanels");
var _cdd=this.getAncestorBindingByLocalName("splitbox");
if(_cda){
_cdc.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cdb&&_cdd.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cdc.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cdb){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cda);
this.isCollapsed=_cda;
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
DockBinding.prototype.closeTab=function(_ce2,_ce3){
if(_ce2.isDirty&&!_ce3){
var _ce4=Resolver.resolve(_ce2.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ce4),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_ce6){
switch(_ce6){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_ce2);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_ce2);
break;
}
}});
}else{
this.removeTab(_ce2);
}
};
DockBinding.prototype.closeTabsExcept=function(_ce7){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ce7){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cea){
var _ceb=_cea.getAssociatedView();
_ceb.saveContainedEditor();
var self=this;
var _ced={handleBroadcast:function(_cee,arg){
switch(_cee){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ceb.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ced);
if(arg.isSuccess){
self.removeTab(_cea);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ced);
};
DockBinding.prototype.appendTabByBindings=function(_cf0,_cf1){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cf0,_cf1);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cf2){
_cf2=_cf2?_cf2+"px":"100%";
this.bindingElement.style.width=_cf2;
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
var _cf4=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf4)){
_cf4=_cf4>0?_cf4-1:0;
self.bindingElement.style.width=new String(_cf4)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cf5){
DockTabsBinding.superclass.handleCrawler.call(this,_cf5);
switch(_cf5.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cf7=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf7)){
_cf7=_cf7>0?_cf7-1:0;
self.bindingElement.style.width=new String(_cf7)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cf8){
var _cf9=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cf8);
return UserInterface.registerBinding(_cf9,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cfa){
this._viewBinding=_cfa;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cfb=DockTabBinding.superclass.serialize.call(this);
if(_cfb){
_cfb.label=null;
_cfb.image=null;
_cfb.handle=this.getHandle();
}
return _cfb;
};
DockTabBinding.prototype.setHandle=function(_cfc){
this.setProperty("handle",_cfc);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cfd){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cfd;
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
var _cfe=DialogControlBinding.newInstance(this.bindingDocument);
_cfe.setControlType(ControlBinding.TYPE_CLOSE);
_cfe.attachClassName("closecontrol");
this._controlGroupBinding.add(_cfe);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_cff){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cff){
this.isDirty=_cff;
if(Binding.exists(this.labelBinding)){
var _d00=this.labelBinding.getLabel();
if(_d00!=null){
this.labelBinding.setLabel(_cff?"*"+_d00:_d00.slice(1,_d00.length));
}else{
this.labelBinding.setLabel(_cff?"*":"");
}
}
}
var _d01=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_d01.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_d01.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_d02){
this.setLabel(_d02.getLabel());
this.setImage(_d02.getImage());
this.setToolTip(_d02.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_d03){
this.setEntityToken(_d03.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d04){
DockTabBinding.superclass.handleAction.call(this,_d04);
var _d05=_d04.target;
switch(_d04.type){
case ControlBinding.ACTION_COMMAND:
if(_d05.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d04.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d05);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d06){
var cmd=_d06.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d08){
if(!_d08){
if(!this.getLabel()){
_d08=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d08=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d08=this.isDirty?"*"+_d08:_d08;
DockTabBinding.superclass.setLabel.call(this,_d08);
};
DockTabBinding.prototype.setImage=function(_d09){
if(!_d09){
if(!this.getImage()){
_d09=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d09=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d09);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d0c=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d0c;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d0c;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d0c;
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
var _d0e=this.bindingElement;
setTimeout(function(){
_d0e.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d0f,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d0f,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d0f){
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
DockTabBinding.prototype.select=function(_d14){
DockTabBinding.superclass.select.call(this,_d14);
this._updateBroadcasters();
if(_d14!=true){
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
var _d15=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d16=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d16.enable();
if(this.isDirty){
_d15.enable();
}else{
_d15.disable();
}
}else{
_d16.disable();
_d15.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d17){
if(this._canUpdateTree||_d17){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d18=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d1a=win.bindingMap.savebutton;
if(_d1a!=null){
_d18=true;
}
}
}
return _d18;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d1b){
var _d1c=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d1b);
return UserInterface.registerBinding(_d1c,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d1d){
var _d1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d1d);
return UserInterface.registerBinding(_d1e,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d1f){
DockPanelBinding.superclass.select.call(this,_d1f);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d20){
DockPanelBinding.superclass.handleCrawler.call(this,_d20);
if(_d20.response==null){
if(_d20.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d20.id==FocusCrawler.ID){
_d20.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d21){
var _d22=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d21);
return UserInterface.registerBinding(_d22,DockPanelBinding);
};
DockControlBinding.prototype=new ControlBinding;
DockControlBinding.prototype.constructor=DockControlBinding;
DockControlBinding.superclass=ControlBinding.prototype;
function DockControlBinding(){
this.logger=SystemLogger.getLogger("DockControlBinding");
}
DockControlBinding.prototype.toString=function(){
return "[DockControlBinding]";
};
DockControlBinding.prototype.onBindingRegister=function(){
DockControlBinding.superclass.onBindingRegister.call(this);
this.setImageProfile(DockControlImageProfile);
};
DockControlBinding.newInstance=function(_d23){
var _d24=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d23);
return UserInterface.registerBinding(_d24,DockControlBinding);
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
ViewBinding.getInstance=function(_d25){
var _d26=ViewBinding._instances.get(_d25);
if(!_d26){
var cry="ViewBinding.getInstance: No such instance: "+_d25;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d26;
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
var _d29=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d29){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d2a=snap.boxObject.getGlobalPosition();
var _d2b=snap.boxObject.getDimension();
if(!Point.isEqual(_d2a,this._lastknownposition)){
this.setPosition(_d2a);
this._lastknownposition=_d2a;
}
if(!Dimension.isEqual(_d2b,this._lastknowndimension)){
this.setDimension(_d2b);
this._lastknowndimension=_d2b;
var _d2c=_d2b.h-ViewBinding.VERTICAL_ADJUST;
_d2c=_d2c<0?0:_d2c;
this.windowBinding.getBindingElement().style.height=new String(_d2c)+"px";
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
var _d2d=this._viewDefinition.flowHandle;
if(_d2d!=null){
FlowControllerService.CancelFlow(_d2d);
}
}
if(this._viewDefinition!=null){
var _d2e=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d2e);
this.logger.fine("ViewBinding closed: \""+_d2e+"\"");
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
var _d30=null;
if(this._viewDefinition!=null){
_d30=this._viewDefinition.handle;
}
return _d30;
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
ViewBinding.prototype.setDefinition=function(_d31){
this._viewDefinition=_d31;
if(_d31.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d32){
ViewBinding.superclass.handleAction.call(this,_d32);
var _d33=_d32.target;
switch(_d32.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d32.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d33.isActivated){
_d33.onActivate();
}
}
_d32.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d33==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d32.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d33==this._snapBinding){
if(_d33.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d33.getContentWindow().isPostBackDocument){
if(_d32.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d33.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d33==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d33.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d32.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d32.type==WindowBinding.ACTION_ONLOAD){
var win=_d33.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d33);
}
}
}
_d32.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d33.label&&this._viewDefinition.label){
_d33.label=this._viewDefinition.label;
}
if(!_d33.image&&this._viewDefinition.image){
_d33.image=this._viewDefinition.image;
}
if(_d33.bindingWindow==this.getContentWindow()){
this._pageBinding=_d33;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d33.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d33==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d32.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d32.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d38,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d38,arg);
switch(_d38){
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
var _d3c=def.argument;
if(_d3c!=null){
page.setPageArgument(_d3c);
}
var _d3d=def.width;
if(_d3d!=null){
page.width=_d3d;
}
var _d3e=def.height;
if(_d3e!=null){
page.height=_d3e;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d3f){
ViewBinding.superclass.handleCrawler.call(this,_d3f);
switch(_d3f.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d3f.id==FocusCrawler.ID){
if(_d3f.previousNode!=this._snapBinding.bindingElement){
_d3f.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d3f.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d40){
_d40.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d40.x+"px";
this.bindingElement.style.top=_d40.y+"px";
};
ViewBinding.prototype.setDimension=function(_d41){
_d41.h-=ViewBinding.VERTICAL_ADJUST;
_d41.w-=ViewBinding.HORIZONTAL_ADJUST;
_d41.w-=1;
if(_d41.h<0){
_d41.h=0;
}
if(_d41.w<0){
_d41.w=0;
}
this.bindingElement.style.width=String(_d41.w)+"px";
this.bindingElement.style.height=String(_d41.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d42){
this.isFlexBoxBehavior=false;
_d42.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d42.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d42.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d42;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d43=null;
if(this.isFreeFloating==true){
_d43=this._snapBinding.getBindingElement();
}else{
_d43=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d43;
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
ViewBinding.prototype.reload=function(_d44){
this._isLoaded=false;
this.windowBinding.reload(_d44);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d45=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d45=true;
}
}
if(!_d45){
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
ViewBinding.newInstance=function(_d49){
var _d4a=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d49);
var _d4b=UserInterface.registerBinding(_d4a,ViewBinding);
_d4b.windowBinding=_d4b.add(WindowBinding.newInstance(_d49));
return _d4b;
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
var _d53=this.bindingWindow.__doPostBack;
var _d54=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d54){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d55,_d56){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d54=true;
}
self.manifestAllDataBindings();
_d53(_d55,_d56);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d57,list){
var _d59=this.bindingWindow.bindingMap.__REQUEST;
if(_d59!=null&&this._isDotNet()){
switch(_d57){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d59.postback(_d57);
}
}
break;
default:
_d59.postback(_d57);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d57,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d5a,list){
var _d5c=this.getDescendantBindingsByType(WindowBinding);
_d5c.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d5a,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d60){
if(_d60.name==null||_d60.name==""){
return;
}
list.add({name:_d60.name,value:_d60.value});
});
var out="";
list.each(function(_d62){
out+=_d62.name+": "+_d62.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d63){
PageBinding.superclass.handleAction.call(this,_d63);
var _d64=_d63.target;
switch(_d63.type){
case RootBinding.ACTION_PHASE_3:
if(_d64==UserInterface.getBinding(this.bindingDocument.body)){
_d64.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d64);
}
_d63.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d65=this.validateAllDataBindings();
if(_d65){
this.doPostBack(_d64);
}
}
_d63.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d63.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d64.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d64.key)){
this._initBlockers.del(_d64.key);
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
var _d67={handleAction:function(_d68){
if(_d68.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d67);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d67);
}else{
MessageQueue.udpdate();
}
_d63.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d69,arg){
PageBinding.superclass.handleBroadcast.call(this,_d69,arg);
switch(_d69){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d6b=arg;
if(!this._canPostBack&&!_d6b){
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
PageBinding.prototype.doPostBack=function(_d6d){
if(this._canPostBack){
if(_d6d!=null&&this._isDotNet()){
var _d6e=_d6d.getCallBackID();
var _d6f=_d6d.getCallBackArg();
if(_d6e!=null){
_d6e=_d6e.replace(/_/g,"$");
}else{
_d6e="";
}
if(_d6f==null){
_d6f="";
}
this.bindingWindow.__doPostBack(_d6e,_d6f);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d70){
var _d71=true;
var _d72=this.bindingWindow.DataManager.getAllDataBindings();
while(_d72.hasNext()&&_d71){
var _d73=_d72.getNext();
if(_d73.isAttached){
var _d74=_d73.validate();
if(_d71&&!_d74){
_d71=false;
this.logger.debug("Invalid DataBinding: "+_d73.toString()+" ("+_d73.getName()+")");
if(_d70){
var _d75=_d73.getAncestorBindingByType(TabPanelBinding);
if(_d75!=null&&!_d75.isVisible){
var _d76=_d75.getAncestorBindingByType(TabBoxBinding);
var _d77=_d76.getTabBinding(_d75);
_d76.select(_d77);
}
}
break;
}
}
}
return _d71;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d79=this.bindingWindow.DataManager.getAllDataBindings();
while(_d79.hasNext()){
var _d7a=_d79.getNext();
if(_d7a.isAttached){
var _d7b=_d7a.manifest();
if(_d7b!=null){
list.add(_d7b);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d7c=this.bindingWindow.DataManager.getAllDataBindings();
while(_d7c.hasNext()){
var _d7d=_d7c.getNext();
if(_d7d.isAttached){
_d7d.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d7e="";
if(!_d7e&&this.labelfield){
var _d7f=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d7f!=null&&_d7f.getLabel){
_d7e=_d7f.getLabel();
}else{
if(_d7f!=null&&_d7f.getValue){
_d7e=_d7f.getValue();
}
}
}
if(!_d7e&&this.label){
_d7e=this.label;
}
return _d7e;
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
var _d82=this._cachedFocus.getBinding();
if(_d82){
_d82.blur();
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
var _d83=this.getProperty("width");
if(!_d83){
_d83=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d83;
}
if(this.height==null){
var _d84=this.getProperty("height");
this.height=_d84?_d84:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d85=this.getProperty("minheight");
if(_d85!=null){
this.minheight=_d85;
}
}
if(this.controls==null){
var _d86=this.getProperty("controls");
this.controls=_d86?_d86:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d87=this.getProperty("resizable");
this.isResizable=_d87?_d87:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d88=this.getProperty("image");
var _d89=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d88&&_d89){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d88);
_d89.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this);
var _d8b=arg.image;
if(_d8b){
this.setProperty("image",_d8b);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d8c){
if(_d8c!=this.isAutoHeightLayoutMode){
if(_d8c){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d8c;
}
};
DialogPageBinding.prototype.handleAction=function(_d8d){
DialogPageBinding.superclass.handleAction.call(this,_d8d);
var _d8e=_d8d.target;
switch(_d8d.type){
case PageBinding.ACTION_ATTACHED:
if(_d8e!=this&&_d8e.isFitAsDialogSubPage){
_d8e.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d8d.consume();
if(_d8e.response!=null){
this.response=_d8e.response;
switch(_d8e.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d8f){
var _d90=this.bindingWindow.bindingMap.buttonAccept;
if(_d90!=null){
_d90.setDisabled(_d8f);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d91){
var _d92=CSSComputer.getPadding(this.bindingElement);
var _d93=CSSComputer.getBorder(this.bindingElement);
_d91+=_d92.top+_d92.bottom;
_d91+=_d93.top+_d93.bottom;
if(_d91>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d91+"px";
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
EditorPageBinding.prototype.handleAction=function(_d9b){
EditorPageBinding.superclass.handleAction.call(this,_d9b);
var _d9c=_d9b.target;
switch(_d9b.type){
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
var _d9d=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d9c.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d9d==-1){
_d9d=0;
}
}else{
_d9d++;
}
return res;
});
if(_d9d>-1){
this._messengers.del(_d9d);
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
_d9b.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d9c.key,_d9c);
if(_d9c instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d9c.key);
if(_d9c instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d9c==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d9c.getSelectedTabBinding();
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
_d9b.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d9c==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d9b.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d9c==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d9b.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d9c==this._windowBinding){
if(_d9c.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _da2=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_da2);
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
var _da3=this.bindingWindow.bindingMap.savebutton;
if(_da3!=null&&!_da3.isDisabled){
_da3.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _da4=this.bindingWindow.bindingMap.__REQUEST;
if(_da4!=null){
_da4.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _da5=this.bindingWindow.bindingMap.__REQUEST;
if(_da5!=null){
_da5.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_da6){
this._message=null;
switch(_da6){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_da6,this._messengers);
if(!this._messengers.hasEntries()){
if(_da6==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_da6;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_da6;
EditorPageBinding.superclass.postMessage.call(this,_da6,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_da6,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_da7,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_da7,arg);
switch(_da7){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _da9=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_da9);
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
var _daa=new List();
this._invalidBindings.each(function(key,_dac){
var list=_dac.getInvalidLabels();
if(list){
list.each(function(_dae){
_daa.add(_dae);
});
}
});
if(_daa.hasEntries()){
var _daf="";
while(_daa.hasNext()){
_daf+=_daa.getNext().toLowerCase();
if(_daa.hasNext()){
_daf+=", ";
}else{
_daf+=".";
}
}
var _db0=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_db0+" "+_daf);
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
EditorPageBinding.prototype.enableSave=function(_db1){
var _db2=this.bindingDocument.getElementById("broadcasterCanSave");
if(_db2){
var _db3=UserInterface.getBinding(_db2);
if(_db1){
_db3.enable();
}else{
_db3.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _db4=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_db4!=null){
UserInterface.getBinding(_db4).enable();
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
var _db5=this._windowBinding.getContentDocument().title;
if(_db5==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _db6=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_db8){
if(_db8.name=="__EVENTTARGET"&&_db6){
_db8.value=_db6;
}
list.add({name:_db8.name,value:_db8.value});
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
var _dba=this.getProperty("responseid");
this.responseid=_dba;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dbb){
ResponsePageBinding.superclass.handleAction.call(this,_dbb);
switch(_dbb.type){
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
WizardPageBinding.prototype.handleAction=function(_dbc){
WizardPageBinding.superclass.handleAction.call(this,_dbc);
var _dbd=_dbc.target;
switch(_dbc.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dbd);
}else{
_dbc.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dbd);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dbc.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dbc.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dbe){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dc0=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dbe);
}
if(_dc0){
_dc0.setDisabled(!_dbe);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dc1,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dc1,arg);
var self=this;
switch(_dc1){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dc5){
};
MarkupAwarePageBinding.prototype._activate=function(_dc6){
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
var _dc7=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dc7.boxObject.getDimension().w;
_dc7.hide();
var _dc8=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dc8+"px";
var self=this;
var _dca=this.bindingWindow.bindingMap.moreactionsbutton;
_dca.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dcb){
self._showMoreActions();
_dcb.consume();
}});
var _dcc=this.bindingWindow.bindingMap.moreactionspopup;
_dcc.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dcd){
var item=_dcd.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dcf,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dcf,arg);
switch(_dcf){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
var self=this;
if(arg!=null){
if(arg.activePosition==this.getActivePosition()){
if(arg.actionProfile!=null&&arg.actionProfile.hasEntries()){
this._actionProfile=arg.actionProfile;
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
var _dd3=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dd3!=null){
_dd3.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dd4=this.bindingWindow.WindowManager;
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
var _dd5=new String("");
this._actionProfile.each(function(_dd6,list){
list.each(function(_dd8){
_dd5+=_dd8.getHandle()+";"+_dd8.getKey()+";";
if(_dd8.isDisabled()){
_dd5+="isDisabled='true';";
}
});
});
return _dd5;
};
SystemToolBarBinding.prototype.handleAction=function(_dd9){
SystemToolBarBinding.superclass.handleAction.call(this,_dd9);
switch(_dd9.type){
case ButtonBinding.ACTION_COMMAND:
var _dda=_dd9.target;
this._handleSystemAction(_dda.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_ddb){
if(_ddb!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _ddd=list.getFirst();
var _dde=_ddd.node;
}
SystemAction.invoke(_ddb,_dde);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_de1,list){
var _de3=new List();
list.reset();
while(list.hasNext()){
var _de4=list.getNext();
var _de5=null;
if(_de4.isInToolBar()){
if(_de4.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_de5=self.getToolBarButtonBinding(_de4);
}
}
if(_de5!=null){
_de3.add(_de5);
}
}
if(_de3.hasEntries()){
var _de6=ToolBarGroupBinding.newInstance(doc);
_de3.each(function(_de7){
_de6.add(_de7);
});
self.addLeft(_de6);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _de8=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _de9=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_de9=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _dea=0;
var _deb=new List();
var _dec,_ded=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dec=_ded.getNext())!=null){
if(!_dec.isVisible){
_dec.show();
}
_dea+=_dec.boxObject.getDimension().w;
if(_dea>=_de9){
_deb.add(_dec);
_dec.hide();
}
}
if(_deb.hasEntries()){
var _dee=_deb.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dee).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dec=_deb.getNext())!=null){
this._moreActions.add(_dec.associatedSystemAction);
}
_de8.show();
}else{
this._moreActions=null;
_de8.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _def=this.bindingWindow.bindingMap.moreactionspopup;
_def.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_def.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_def.add(item);
}
_def.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_df1){
var _df2=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _df3=_df1.getLabel();
var _df4=_df1.getToolTip();
var _df5=_df1.getImage();
var _df6=_df1.isDisabled();
if(_df5){
_df2.setImage(_df5);
}
if(_df3){
_df2.setLabel(_df3);
}
if(_df4){
_df2.setToolTip(_df4);
}
if(_df1.isDisabled()){
_df2.disable();
}
_df2.associatedSystemAction=_df1;
return _df2;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _df7=this.getDescendantBindingByLocalName("toolbarbutton");
if(_df7!=null){
_df7.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_df8){
var _df9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_df8);
return UserInterface.registerBinding(_df9,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_dfa){
this.bindingElement.style.left=_dfa.x+"px";
this.bindingElement.style.top=_dfa.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_dfb){
_dfb.h-=ViewBinding.VERTICAL_ADJUST;
_dfb.w-=ViewBinding.HORIZONTAL_ADJUST;
_dfb.w-=1;
if(_dfb.h<0){
_dfb.h=0;
}
if(_dfb.w<0){
_dfb.w=0;
}
this.bindingElement.style.width=String(_dfb.w)+"px";
this.bindingElement.style.height=String(_dfb.h)+"px";
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
SystemTreeBinding.prototype.add=function(_dfc){
var _dfd=SystemTreeBinding.superclass.add.call(this,_dfc);
if(!this._defaultTreeNode){
if(_dfc instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dfc;
}
}
return _dfd;
};
SystemTreeBinding.prototype.handleAction=function(_dfe){
SystemTreeBinding.superclass.handleAction.call(this,_dfe);
var _dff=_dfe.target;
switch(_dfe.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dff.key);
this._updateFocusedNode();
_dfe.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dfe.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dff.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dfe.consume();
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
var _e01=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_e01);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_e02){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_e02);
var reg=this._entityTokenRegistry;
var _e04=_e02.node.getEntityToken();
if(reg.has(_e04)){
reg.get(_e04).add(_e02);
}else{
reg.set(_e04,new List([_e02]));
}
var _e05=null;
if(this.isLockedToEditor){
if(_e04==StageBinding.entityToken){
if(_e02.node.isTreeLockEnabled()){
_e05=_e02;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_e02.node.getHandle()){
_e05=_e02;
}
}
}
if(_e05!=null){
this.focusSingleTreeNodeBinding(_e05);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_e06){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_e06);
var reg=this._entityTokenRegistry;
var _e08=_e06.node.getEntityToken();
if(reg.has(_e08)){
var list=reg.get(_e08);
list.del(_e06);
if(!list.hasEntries()){
reg.del(_e08);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_e06.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_e06.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e0c=this._refreshingTreeNodes;
if(_e0c.hasEntries()&&_e0c.has(key)){
_e0c.del(key);
if(!_e0c.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e0d=StageBinding.entityToken;
if(_e0d!=null){
this._focusTreeNodeByEntityToken(_e0d);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e0e=false;
var _e0f=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e0e=false;
}else{
if(_e0f.hasEntries()){
_e0e=true;
while(_e0e&&_e0f.hasNext()){
var _e10=_e0f.getNext();
if(!_e10.isDraggable){
_e0e=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e0e;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e11,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e11,arg);
switch(_e11){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e11,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e11);
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
var self=this,_e15=arg;
setTimeout(function(){
if(_e15!=null){
self._focusTreeNodeByEntityToken(_e15);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e17=tab.perspectiveNode==null;
if(!_e17){
_e17=tab.perspectiveNode==this.perspectiveNode;
}
if(_e17){
var self=this,_e19=tab.getEntityToken();
setTimeout(function(){
if(_e19!=null){
self._focusTreeNodeByEntityToken(_e19);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e1a,_e1b){
this.isLockFeatureFocus=true;
var _e1c=null;
if(this._entityTokenRegistry.has(_e1a)){
var list=this._entityTokenRegistry.get(_e1a);
list.each(function(tn){
var _e1f=true;
if(tn.node.isTreeLockEnabled()){
_e1c=tn;
_e1f=false;
}
return _e1f;
});
if(_e1c!=null){
if(!_e1c.isFocused){
this.focusSingleTreeNodeBinding(_e1c,true);
}else{
_e1c.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e1c==null&&_e1b!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e1a);
self._focusTreeNodeByEntityToken(_e1a,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e21){
var _e22=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e23=this.getRootTreeNodeBindings();
while(_e23.hasNext()){
var _e24=_e23.getNext();
_e22.add(_e24.node.getEntityToken());
}
}else{
_e22.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e22.hasNext()){
var _e25=_e22.getNext();
var _e26=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e25,_e21,_e26);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e29=this._treeNodeBindings;
var _e2a=new Map();
function fix(_e2b,list){
if(!_e2b.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e29.has(node.getHandle())){
var _e2e=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e2a.set(node.getHandle(),_e2e);
_e2b.add(_e2e);
}
});
_e2b.attachRecursive();
}
}
_e2b.open(true);
}
map.each(function(_e2f,list){
if(_e29.has(_e2f)){
var _e31=_e29.get(_e2f);
fix(_e31,list);
}else{
if(_e2a.has(_e2f)){
var _e32=_e2a.get(_e2f);
fix(_e32,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e33,arg){
switch(_e33){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e35=arg;
if(_e35!=null){
this._invokeServerRefresh(_e35);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e36=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e36;
_e36.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e36=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e36;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e37){
if(_e37!=null&&_e37=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e37)){
var list=this._entityTokenRegistry.get(_e37).reset();
this._refreshToken=_e37;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e39=list.getNext();
this._refreshingTreeNodes.set(_e39.key,true);
setTimeout(function(){
_e39.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e3a=this.getFocusedTreeNodeBindings().getFirst();
if(_e3a){
var _e3b=_e3a.getLabel();
var _e3c=_e3a.getAncestorBindingByLocalName("treenode");
if(_e3c){
_e3a=_e3c;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e3a.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e3d=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e3d,[_e3b]);
}
_e3a.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e3e=SystemTreeBinding.clipboard;
if(_e3e){
var type=_e3e.dragType;
var _e40=this.getFocusedTreeNodeBindings().getFirst();
if(_e40.dragAccept){
if(_e40.acceptor.isAccepting(type)){
this._performPaste(_e40);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e41){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e41.node.hasDetailedDropSupport()){
if(_e41.node.hasChildren()){
var _e43=_e41.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e44,_e45){
if(_e44==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e46=_e45.get("switch");
var _e47=_e45.get("sibling");
if(_e46=="after"){
_e47++;
}
var _e48=_e41.accept(SystemTreeBinding.clipboard,_e47);
if(_e48){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e43);
}else{
Application.lock(self);
var _e49=_e41.accept(SystemTreeBinding.clipboard,0);
if(_e49){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e49=_e41.accept(SystemTreeBinding.clipboard,0);
if(_e49){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e4a=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e4a!=null){
this._focusTreeNodeByEntityToken(_e4a);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e4b){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e4b){
this.blurSelectedTreeNodes();
var _e4c=this.getRootTreeNodeBindings();
_e4c.each(function(_e4d){
if(_e4d.isContainer&&_e4d.isOpen){
_e4d.close();
_e4d.hasBeenOpened=false;
_e4d.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e4e){
if(_e4e!=this.isLockedToEditor){
this.isLockedToEditor=_e4e;
if(_e4e){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e50=this.getRootTreeNodeBindings();
_e50.each(function(_e51){
var _e52=_e51.getOpenSystemNodes();
if(_e52!=null&&_e52.hasEntries()){
list.merge(_e52);
}else{
if(_e51.isOpen){
list.add(_e51.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e53){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e53);
if(_e53!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e54){
if(_e54){
var list=new List(_e54.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e56=new Map();
var _e57=this.getFocusedTreeNodeBindings().getFirst();
var _e58=_e57.node.getActionProfile();
if(_e58!=null){
var self=this;
_e58.each(function(_e5a,list){
var _e5c=new List();
list.each(function(_e5d){
if(_e5d.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e5d.getGroupName()]){
_e5c.add(_e5d);
}
}
});
if(_e5c.hasEntries()){
_e56.set(_e5a,_e5c);
}
});
}
_e56.activePosition=this._activePosition;
var _e5e=_e57.node.getPropertyBag();
if(_e5e&&_e5e.Uri&&_e5e.ElementType==="application/x-composite-page"){
_e56.Uri=_e5e.Uri;
}
return _e56;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e5f,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e5f,arg);
switch(_e5f){
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
var _e64=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e64.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e65=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e65.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e66){
SystemTreePopupBinding.superclass.handleAction.call(this,_e66);
switch(_e66.type){
case MenuItemBinding.ACTION_COMMAND:
var _e67=_e66.target;
var _e68=_e67.associatedSystemAction;
if(_e68){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e6a=list.getFirst();
var _e6b=_e6a.node;
}
SystemAction.invoke(_e68,_e6b);
}else{
var cmd=_e67.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e6e=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e6e=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e6e=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e6e=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e6e=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e6e){
setTimeout(function(){
EventBroadcaster.broadcast(_e6e);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e6f=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e6f.hasNext()){
var _e70=UserInterface.getBinding(_e6f.getNext());
if(!_e70.getProperty("rel")){
_e70.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e72=new List();
var self=this;
this._actionProfile.each(function(_e74,list){
var _e76=MenuGroupBinding.newInstance(doc);
list.each(function(_e77){
var _e78=self.getMenuItemBinding(_e77);
_e76.add(_e78);
});
_e72.add(_e76);
});
_e72.reverse();
while(_e72.hasNext()){
this._bodyBinding.addFirst(_e72.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e79){
var _e7a=MenuItemBinding.newInstance(this.bindingDocument);
var _e7b=_e79.getLabel();
var _e7c=_e79.getToolTip();
var _e7d=_e79.getImage();
var _e7e=_e79.getDisabledImage();
var _e7f=_e79.isCheckBox();
if(_e7b){
_e7a.setLabel(_e7b);
}
if(_e7c){
_e7a.setToolTip(_e7c);
}
if(_e7d){
_e7a.imageProfile=new ImageProfile({image:_e7d,imageDisabled:_e7e});
}
if(_e7f){
_e7a.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e79.isChecked()){
_e7a.check(true);
}
}
if(_e79.isDisabled()){
_e7a.disable();
}
_e7a.associatedSystemAction=_e79;
return _e7a;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e83=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e83=UserInterface.getBinding(node);
if(_e83.isDisabled){
_e83=null;
}
}
break;
}
if(_e83!=null&&_e83.node!=null&&_e83.node.getActionProfile()!=null){
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
var _e84=this.node.getLabel();
if(_e84){
this.setLabel(_e84);
}
var _e85=this.node.getToolTip();
if(_e85){
this.setToolTip(_e85);
}
var _e86=this.node.getHandle();
if(_e86){
this.setHandle(_e86);
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
var _e89="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e89+=list.getNext();
if(list.hasNext()){
_e89+=" ";
}
}
this.setProperty("dragaccept",_e89);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e8b){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e8b);
switch(_e8b.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e8b.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e8b.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e8c,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e8c,arg);
switch(_e8c){
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
var _e8f=null;
var _e90=this.node.getImageProfile();
if(_e90){
if(this.isOpen){
_e8f=_e90.getActiveImage();
}else{
_e8f=_e90.getDefaultImage();
}
}
if(!_e8f){
_e8f=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e8f;
};
SystemTreeNodeBinding.prototype.open=function(_e91){
var _e92=this.isContainer&&!this.isOpen;
var _e93=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e92&&(_e93||SystemTreeBinding.HAS_NO_MEMORY)&&_e91!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e94=null;
if(this.isContainer){
_e94=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e94);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e96){
if(_e96!=null){
this._refreshBranch(_e96);
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
var _e97=new List();
var _e98=this.node.getChildren();
this.empty();
if(_e98.hasEntries()){
this._insertTreeNodesRegulated(_e98);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e99){
var _e9a=0;
var _e9b=new List([]);
while(_e99.hasEntries()&&_e9a<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e9c=SystemTreeNodeBinding.newInstance(_e99.extractFirst(),this.bindingDocument);
_e9c.autoExpand=this.autoExpand;
this.add(_e9c);
_e9c.attach();
_e9a++;
if(this.autoExpand){
if(_e9a==1&&!_e99.hasEntries()||LocalStore.openedNodes.has(_e9c.node)){
_e9b.add(_e9c);
}
}
}
if(_e99.hasEntries()){
this._insertBufferTreeNode(_e99);
}
_e9b.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e9f){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _ea1=this.node.getDescendantBranch(list);
if(_ea1.hasEntries()){
this.XXX(_ea1);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_ea2){
var self=this;
var map=new Map();
this.empty();
_ea2.each(function(key,_ea6){
if(_ea6.hasEntries()){
_ea6.each(function(node){
var _ea8=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea8);
if(map.has(key)){
var _ea9=map.get(key);
_ea9.add(_ea8);
_ea9.isOpen=true;
_ea9.hasBeenOpened=true;
node.searchToken=_ea9.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_ea8);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_ea2.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _eaa=new TreeCrawler();
var _eab=new List();
_eaa.mode=TreeCrawler.MODE_GETOPEN;
_eaa.crawl(this.bindingElement,_eab);
if(_eab.hasEntries()){
_eab.extractFirst();
}
_eaa.dispose();
return _eab;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _eac=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_eac=new List([this.node]);
list.each(function(_eae){
_eac.add(_eae.node);
});
}
return _eac;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_eaf,_eb0){
var _eb1=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_eaf instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_eaf.node.getData(),this.node.getData(),_eb0?_eb0:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_eb1);
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
SystemTreeNodeBinding.newInstance=function(node,_eb5){
var _eb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_eb5);
var _eb7=UserInterface.registerBinding(_eb6,SystemTreeNodeBinding);
_eb7.node=node;
return _eb7;
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
SystemPageBinding.prototype.setPageArgument=function(_eb8){
this.node=_eb8;
SystemPageBinding.superclass.setPageArgument.call(this,_eb8);
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
var _eb9=this.node.getChildren();
if(_eb9.hasEntries()){
while(_eb9.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_eb9.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ebb=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ebb.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ebd=new TreeCrawler();
var _ebe=new List();
_ebd.mode=TreeCrawler.MODE_GETOPEN;
_ebd.crawl(this.bindingElement,_ebe);
_ebd.dispose();
var list=new List([this.node]);
_ebe.each(function(_ec0){
list.add(_ec0.node);
});
this._tree.empty();
var _ec1=this.node.getDescendantBranch(list);
if(_ec1.hasEntries()){
var self=this;
var map=new Map();
_ec1.each(function(key,_ec5){
_ec5.each(function(node){
var _ec7=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ec7);
if(map.has(key)){
var _ec8=map.get(key);
_ec8.add(_ec7);
_ec8.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ec7);
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
SystemPageBinding.prototype.handleAction=function(_ec9){
SystemPageBinding.superclass.handleAction.call(this,_ec9);
switch(_ec9.type){
case ButtonBinding.ACTION_COMMAND:
var _eca=_ec9.target;
switch(_eca.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eca.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ecb,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ecb,arg);
switch(_ecb){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ecd=arg;
if(this.node&&this.node.getEntityToken()==_ecd){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ecd);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ecd);
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
StageContainerBinding.prototype.handleBroadcast=function(_ecf,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ecf,arg);
var _ed1=this.bindingWindow.WindowManager;
switch(_ecf){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ed1.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ed1.WINDOW_RESIZED_BROADCAST:
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
var _ed3=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ed3.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ed4){
if(StageBinding.isViewOpen(_ed4)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ed4);
}else{
var _ed5=ViewDefinitions[_ed4];
StageBinding.presentViewDefinition(_ed5);
}
};
StageBinding.isViewOpen=function(_ed6){
return StageBinding.bindingInstance._activeViewDefinitions[_ed6]!=null;
};
StageBinding.selectPerspective=function(_ed7){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ed7);
};
StageBinding.presentViewDefinition=function(_ed8){
if(_ed8.label!=null){
var _ed9=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ed9,[_ed8.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ed8);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_edb,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _edd=System.getPerspectiveNodes();
if(_edd.hasEntries()){
this._initializeSystemViewDefinitions(_edd);
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
var _edf=null;
if(LocalStore.isEnabled){
_edf=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_edf&&ViewDefinitions[_edf]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_edf));
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
var _ee1=root.getActionProfile();
if(_ee1&&_ee1.hasEntries()){
var _ee2=top.app.bindingMap.toolsmenugroup;
if(_ee2){
_ee1.each(function(_ee3,list){
list.each(function(_ee5){
var item=MenuItemBinding.newInstance(_ee2.bindingDocument);
item.setLabel(_ee5.getLabel());
item.setToolTip(_ee5.getToolTip());
item.setImage(_ee5.getImage());
item.setDisabled(_ee5.isDisabled());
item.associatedSystemAction=_ee5;
var _ee7=_ee2;
var tag=_ee5.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ee7=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ee7.add(item);
});
});
_ee2.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ee9){
while(_ee9.hasNext()){
var node=_ee9.getNext();
var _eeb=node.getHandle();
ViewDefinitions[_eeb]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_eec){
StageBinding.superclass.handleAction.call(this,_eec);
var _eed=_eec.target;
switch(_eec.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_eed;
this._inflateBinding(_eed);
_eec.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_eed;
this._inflateBinding(_eed);
_eec.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_eec.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eed instanceof DockBinding){
switch(_eed.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_eed.reference,_eed);
break;
}
this.handleAttachedDock(_eed);
_eec.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_eed instanceof DockBinding){
this.handleSelectedDockTab(_eed.getSelectedTabBinding());
_eec.consume();
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
_eec.consume();
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
_eec.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eec);
};
StageBinding.prototype.handleBroadcast=function(_eef,arg){
StageBinding.superclass.handleBroadcast.call(this,_eef,arg);
switch(_eef){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ef1=arg;
this._dontView(_ef1);
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
StageBinding.prototype._showStart=function(_ef3){
if(_ef3!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ef6=this.bindingWindow.bindingMap.maindecks;
if(_ef3){
_ef6.select("startdeck");
view.show();
}else{
view.hide();
_ef6.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ef3;
}
};
StageBinding.prototype._inflateBinding=function(_ef7){
for(var _ef8 in ViewDefinitions){
var _ef9=ViewDefinitions[_ef8];
if(_ef9 instanceof SystemViewDefinition){
_ef7.mountDefinition(_ef9);
}
}
var _efa=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_efa){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _efd=new StageCrawler();
_efd.mode=mode;
_efd.crawl(this.bindingElement);
_efd.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_efe){
var _eff=_efe.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eff);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eff));
}
};
StageBinding.prototype.handleAttachedDock=function(_f00){
var _f01=_f00.getTabBindings();
if(_f01.hasEntries()){
while(_f01.hasNext()){
var _f02=_f01.getNext();
var _f03=_f02.getHandle();
if(_f03){
if(_f03=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _f04=ViewDefinitions[_f03];
if(_f04){
this._view(_f00,_f02,_f04,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_f03+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_f05){
var _f06=null;
var _f07=false;
switch(_f05.position){
case Dialog.MODAL:
_f06=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_f06=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_f05.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_f06=this._dockBindings.get(_f05.position);
break;
case DockBinding.EXTERNAL:
window.open(_f05.url);
_f07=true;
break;
default:
var _f08=this._decksBinding.getSelectedDeckBinding();
_f06=_f08.getDockBindingByReference(_f05.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _f09=this.bindingWindow.bindingMap.maindecks;
_f09.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_f07=true;
}
break;
}
if(!_f07){
if(_f06!=null){
this._view(_f06,null,_f05,true);
}else{
throw "StageBinding: Could not position view: "+_f05.handle;
}
}
};
StageBinding.prototype._view=function(_f0a,_f0b,_f0c,_f0d){
var _f0e=_f0c.handle;
if(_f0c.isMutable){
_f0e+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f0e]){
var _f0f=ViewBinding.getInstance(_f0e);
if(_f0f!=null){
_f0f.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f0e);
}
}else{
this._activeViewDefinitions[_f0e]=_f0c;
Application.lock(this);
switch(_f0a.constructor){
case DockBinding:
if(_f0d){
_f0a.prepareNewView(_f0c);
}else{
_f0a.prepareOpenView(_f0c,_f0b);
}
break;
case StageDialogBinding:
if(_f0d){
_f0a.prepareNewView(_f0c);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f10){
if(this._activeViewDefinitions[_f10]!=null){
delete this._activeViewDefinitions[_f10];
}else{
this.logger.debug("Could not unregister active view: "+_f10);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f11){
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
this.addFilter(function(_f13){
var _f14=UserInterface.getBinding(_f13);
var _f15=null;
if(_f14){
switch(_f14.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f14.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f14.handleUnMaximization();
break;
}
break;
case DockBinding:
_f15=NodeCrawler.SKIP_NODE;
break;
}
}
return _f15;
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
var _f16=null;
this._dialogs.each(function(_f17){
if(!_f17.isVisible){
_f16=_f17;
}
return _f16!=null;
});
if(!_f16){
this._newInstance();
_f16=this._dialogs.getLast();
}
_f16.setModal(false);
return _f16;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f18=this.getInstance();
_f18.setModal(true);
return _f18;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f19=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f19);
_f19.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f1a){
if(_f1a instanceof DialogViewDefinition){
var _f1b=ViewBinding.newInstance(this.bindingDocument);
_f1b.setDefinition(_f1a);
_f1b.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f1a.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f1a.handler)){
this._dialogResponseHandler=_f1a.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f1b;
this._body.add(_f1b);
_f1b.attach();
_f1b.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f1c){
StageDialogBinding.superclass.handleAction.call(this,_f1c);
var _f1d=_f1c.target;
switch(_f1c.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f1d);
_f1c.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f1d.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f1c.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f1d.response){
this._handleDialogPageResponse(_f1d);
}
_f1c.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f1c.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f1c.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f1c.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f1c.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f1c.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f1c.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f1c.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f1c.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f1d==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f1e,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f1e,arg);
switch(_f1e){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f20){
var _f21=new FitnessCrawler();
var list=new List();
if(_f20){
_f21.mode=FitnessCrawler.MODE_BRUTAL;
}
_f21.crawl(this.bindingElement,list);
_f21.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f23){
_f23.fit(_f20);
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
var _f24=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f24){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f26){
var cmd=_f26.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f28){
if(_f28.bindingDocument==this._viewBinding.getContentDocument()){
if(_f28 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f28);
}
this._pageBinding=_f28;
if(_f28.height=="auto"){
_f28.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f28);
_f28.enableAutoHeightLayoutMode(false);
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
if(_f28.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f28);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f29){
var _f2a=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f2a){
var _f2b=UserInterface.getBinding(_f2a);
_f2b.setDisabled(_f29);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f2c){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f2c.response,_f2c.result!=null?_f2c.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f2e){
if(_f2e.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f2e);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f30){
switch(_f30.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f30.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f30.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f31){
var _f32=_f31.label;
var _f33=_f31.image;
var _f34=_f31.width;
var _f35=_f31.height;
var _f36=_f31.controls;
var _f37=_f31.isResizable;
if(_f32){
this.setLabel(_f32);
}
if(_f33){
this.setImage(_f33);
}
if(_f34||_f35){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f34?_f34:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f35!=null&&_f35!="auto")?_f35:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f36){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f3b=new List(_f36.split(" "));
while((type=_f3b.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f37!=this._isResizable){
this.setResizable(_f37);
}
if(_f35=="auto"){
this._fixAutoHeight(_f31);
}
if(_f31==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f3c){
var dim=this.getDimension();
var _f3e=0;
var _f3f=0;
if(_f3c.isDialogSubPage){
_f3c=this._pageBinding;
}
if(this._isFirstPage){
_f3e=_f3c.width!=null?_f3c.width:dim.w;
}else{
_f3e=dim.w;
}
_f3f=_f3c.bindingElement.offsetHeight;
_f3f+=this._titlebar.bindingElement.offsetHeight;
_f3f+=4;
_f3f+=4;
if(_f3f<dim.h){
_f3f=dim.h;
}
if(_f3c.minheight!=null){
if(_f3f<_f3c.minheight){
_f3f=_f3c.minheight;
}
}
this.setDimension(new Dimension(_f3e,_f3f));
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
StageDialogBinding.newInstance=function(_f42){
var _f43=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f42);
var _f44=UserInterface.registerBinding(_f43,StageDialogBinding);
_f44.setProperty("controls","minimize maximize close");
return _f44;
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
this.addFilter(function(_f45,list){
var _f47=null;
var _f48=UserInterface.getBinding(_f45);
if(!_f48.isVisible){
_f47=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f47;
});
this.addFilter(function(_f49,list){
var _f4b=null;
var _f4c=UserInterface.getBinding(_f49);
if(_f4c.isAttached){
if(Interfaces.isImplemented(IFit,_f4c)){
if(!_f4c.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f4c);
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
StageDecksBinding.prototype.mountDefinition=function(_f4d){
var _f4e=StageDeckBinding.newInstance(this.bindingDocument);
_f4e.handle=_f4d.handle;
_f4e.perspectiveNode=_f4d.node;
_f4e.definition=_f4d;
this._decks[_f4e.handle]=_f4e;
this.add(_f4e);
_f4e.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f4f){
var _f50=this._decks[_f4f];
StageBinding.perspectiveNode=_f50.perspectiveNode;
this.select(_f50);
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
StageDeckBinding.prototype.handleAction=function(_f51){
StageDeckBinding.superclass.handleAction.call(this,_f51);
var _f52=_f51.target;
switch(_f51.type){
case WindowBinding.ACTION_LOADED:
if(_f52==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
explorerdocument=this.windowBinding.getContentDocument();
var _f53=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f54=ViewBinding.newInstance(explorerdocument);
_f54.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f55=ViewDefinitions["Composite.Management.Browser"];
_f55.argument["SystemViewDefinition"]=this.definition;
_f54.setDefinition(_f55);
_f53.add(_f54);
_f54.attach();
_f54.initialize();
this._viewBinding=_f54;
_f51.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f52 instanceof DockBinding){
this._dockBindings.set(_f52.reference,_f52);
_f52.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f51.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f51.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f51);
StageDeckBinding.superclass.handleAction.call(this,_f51);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f57=new StageCrawler();
_f57.mode=mode;
_f57.crawl(this.windowBinding.getContentDocument().body);
_f57.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f58){
return this._dockBindings.get(_f58);
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
StageDeckBinding.newInstance=function(_f5a){
var _f5b=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f5a);
var _f5c=UserInterface.registerBinding(_f5b,StageDeckBinding);
return _f5c;
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
StageSplitBoxBinding.prototype.handleAction=function(_f5d){
StageSplitBoxBinding.superclass.handleAction.call(this,_f5d);
StageBoxAbstraction.handleAction.call(this,_f5d);
var _f5e=_f5d.target;
var _f5f=null;
var _f60=null;
switch(_f5d.type){
case DockBinding.ACTION_EMPTIED:
_f60=this.getChildBindingByLocalName("splitter");
if(_f60.isVisible){
_f60.hide();
}
_f5f=this.getDescendantBindingsByLocalName("dock");
if(_f5f.getFirst().isEmpty&&_f5f.getLast().isEmpty){
if(_f5f.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f5d.consume();
break;
case DockBinding.ACTION_OPENED:
_f5f=this.getDescendantBindingsByLocalName("dock");
if(!_f5f.getFirst().isEmpty&&!_f5f.getLast().isEmpty){
_f60=this.getChildBindingByLocalName("splitter");
if(!_f60.isVisible){
_f60.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f5d.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f5e!=this){
_f60=this.getChildBindingByLocalName("splitter");
if(_f60.isVisible){
_f60.hide();
}
this.invokeLayout();
_f5d.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f5e!=this){
var _f61=this.getChildBindingsByLocalName("splitpanel");
if(_f61.getFirst().isVisible&&_f61.getLast().isVisible){
_f60=this.getChildBindingByLocalName("splitter");
if(!_f60.isVisible){
_f60.show();
}
}
this.invokeLayout();
_f5d.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f62){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f62);
switch(_f62.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f62.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f63=this.getChildBindingsByLocalName("splitpanel");
return _f63.getFirst().isVisible&&_f63.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f64=this.getChildBindingsByLocalName("splitpanel");
return _f64.getFirst().isFixed&&_f64.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f65){
StageSplitPanelBinding.superclass.handleAction.call(this,_f65);
StageBoxAbstraction.handleAction.call(this,_f65);
switch(_f65.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f65.type==StageSplitBoxBinding.ACTION_HIDE){
_f65.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f65.type==DockBinding.ACTION_EMPTIED){
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
if(_f65.type==StageSplitBoxBinding.ACTION_SHOW){
_f65.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f68=_f65.target;
if(_f68!=this&&_f68.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f69=_f68._containingSplitBoxBinding;
if(_f69.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f6a=_f69.getChildBindingsByLocalName("splitpanel");
var _f6b=_f6a.getFirst();
var _f6c=_f6a.getLast();
if(this.isFixed==true){
if(!_f6b.isFixed||!_f6c.isFixed||(!_f69.hasBothPanelsVisible()&&_f68.isMinimizedForReal)){
this.setFix(false);
_f65.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f69.hasBothPanelsFixed()||(!_f69.hasBothPanelsVisible()&&_f68.isMinimizedForReal)){
this.setFix(_f68.getContainedDock().getHeight());
_f65.consume();
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
var _f6d=this.getContainedDock();
if(_f6d){
if(this.isMaximizePrepared==true){
}else{
_f6d.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f6e=this.getContainedDock();
if(_f6e){
if(_f6e.type==DockBinding.TYPE_EDITORS){
if(_f6e.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f6e.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f6f=this.getContainedDock();
if(_f6f){
_f6f.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f6f);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f70=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f71=this.getContainedDock();
if(_f71){
_f71.collapse(_f70);
if(!_f70){
this.setFix(_f71.getHeight());
}else{
this.setFix(_f71.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f71&&_f71.isActive){
_f71.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f71);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f72){
var _f73=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f74=this.getContainedDock();
if(_f74){
if(this.isMinimized==true){
_f74.unCollapse(_f73);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f72){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f74){
_f74.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f74);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f75){
var _f76=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f76=false;
}
}
if(_f76==true){
this._invisibilize(_f75);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f78){
if(_f78!=this._isInvisibilized){
if(_f78){
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
StageSplitterBinding.prototype.onDragStart=function(_f79){
var _f7a=top.app.bindingMap.stagesplittercover;
var _f7b=this._containingSplitBoxBinding.getOrient();
switch(_f7b){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f7a.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f7a.bindingElement.style.cursor="n-resize";
break;
}
_f7a.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f7b);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f81){
this._orient=_f81;
this.attachClassName(_f81);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f83=true;
var _f84=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f84=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f83=false;
break;
}
if(_f83){
this.bindingElement.style.left=pos.x+"px";
}
if(_f84){
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
StageBoxAbstraction.handleAction=function(_f86){
switch(_f86.type){
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
if(_f86.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f86.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f87=this.bindingElement.style;
_f87.position="absolute";
_f87.width="100%";
_f87.height="100%";
_f87.top="0";
_f87.left="0";
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
var _f88=this.bindingElement.style;
_f88.position="relative";
_f88.width="auto";
_f88.height="auto";
_f88.top="auto";
_f88.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f89,_f8a){
var _f8b=_f89.bindingElement.style;
var _f8c=_f89.bindingElement.parentNode;
var box=_f89._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f8a){
_f89._unmodifiedFlexMethod=_f89.flex;
_f89.flex=function(){
_f8b.width=_f8c.offsetWidth+"px";
_f8b.height=_f8c.offsetHeight+"px";
};
}else{
_f8b.width="100%";
_f8b.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f8b.width="auto";
_f8b.height="auto";
box.reflex(true);
},0);
}
_f89.flex=_f89._unmodifiedFlexMethod;
_f89._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f8e){
var _f8f=_f8e.target;
switch(_f8e.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f8f instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f8e);
_f8e.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f8e.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f90){
var mode=null;
switch(_f90.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f92){
StageMenuBarBinding.superclass.handleAction.call(this,_f92);
switch(_f92.type){
case MenuItemBinding.ACTION_COMMAND:
var _f93=_f92.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f93){
SystemAction.invoke(_f93,this._rootNode);
}
}
_f92.consume();
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
var _f94=this.getProperty("handle");
if(_f94){
this._handle=_f94;
if(StageBinding.isViewOpen(_f94)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f94);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f96){
this.setProperty("handle",_f96);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f97,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f97,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f97){
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
StageViewMenuItemBinding.newInstance=function(_f99){
var _f9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f99);
UserInterface.registerBinding(_f9a,StageViewMenuItemBinding);
return UserInterface.getBinding(_f9a);
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
StageStatusBarBinding.prototype.setLabel=function(_f9b){
this._label.setLabel(_f9b);
};
StageStatusBarBinding.prototype.setImage=function(_f9c){
this._label.setImage(_f9c);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f9d){
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
var _f9e=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f9f=_f9e._viewBinding;
var _fa0=_f9f.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _fa1=_fa0.getFocusedTreeNodeBindings();
if(!_fa1.hasEntries()&&StageBinding.treeSelector){
_fa1=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _fa1;
};
ExplorerBinding.saveFocusedNodes=function(){
var _fa2=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_fa2.each(function(_fa3){
LocalStore.focuseNodes.add(_fa3.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _fa4=LocalStore.focuseNodes.getEntityTokens();
var _fa5=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _fa6=_fa5.getAssociatedView();
var _fa7=_fa6.getContentWindow().bindingMap.tree;
_fa4=new List(TreeService.GetCurrentLocaleEntityTokens(_fa4.toArray()));
_fa4.each(function(_fa8){
_fa7._focusTreeNodeByEntityToken(_fa8);
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
ExplorerBinding.prototype.handleAction=function(_fa9){
ExplorerBinding.superclass.handleAction.call(this,_fa9);
var _faa=_fa9.target;
switch(_fa9.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_fa9.consume();
break;
case Binding.ACTION_DRAG:
if(_faa instanceof ExplorerSplitterBinding){
_faa.dragger.registerHandler(this);
}
_fa9.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_fac){
this._menuBinding.setSelectionByHandle(_fac);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fad){
if(_fad instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fad);
this._menuBinding.mountDefinition(_fad);
}
};
ExplorerBinding.prototype.onDragStart=function(_fae){
var _faf=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_faf.hasEntries()){
var _fb0=_faf.getFirst();
this._dragStart=_fb0.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fb0.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fb4){
if(_fb4 instanceof SystemViewDefinition){
var _fb5=ViewBinding.newInstance(this.bindingDocument);
_fb5.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fb5.setDefinition(_fb4);
var _fb6=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fb6.setAssociatedView(_fb5);
this._decks[_fb4.handle]=_fb6;
_fb6.add(_fb5);
this.add(_fb6);
function attach(){
_fb6.attach();
_fb5.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fb7){
var _fb8=this._decks[_fb7];
this.select(_fb8);
};
DecksBinding.prototype.expandBy=function(_fb9){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fbb=this.bindingElement.offsetHeight+_fb9;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fbb+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fbd){
var _fbe=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fbd);
return UserInterface.registerBinding(_fbe,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fbf){
this._viewBinding=_fbf;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fc0=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fc1=this._viewBinding.getDefinition().label;
StatusBar.busy(_fc0,[_fc1]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fc2){
ExplorerDeckBinding.superclass.handleAction.call(this,_fc2);
var _fc3=_fc2.target;
switch(_fc2.type){
case PageBinding.ACTION_INITIALIZED:
if(_fc3 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fc3.node.getEntityToken();
this._handle=_fc3.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fc4,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fc4,arg);
switch(_fc4){
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
var _fc6=null;
if(this._isExplorerDeckBindingInitialized){
_fc6=this._viewBinding.getDefinition().label;
}else{
_fc6=DockTabBinding.LABEL_TABLOADING;
}
return _fc6;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fc7=null;
if(this._isExplorerDeckBindingInitialized){
_fc7=this._viewBinding.getDefinition().image;
}else{
_fc7=DockTabBinding.IMG_TABLOADING;
}
return _fc7;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fc8=null;
if(this._isExplorerDeckBindingInitialized){
_fc8=this._viewBinding.getDefinition().toolTip;
}
return _fc8;
};
ExplorerDeckBinding.newInstance=function(_fc9){
var _fca=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fc9);
return UserInterface.registerBinding(_fca,ExplorerDeckBinding);
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
};
ExplorerMenuBinding.prototype.onBindingAttach=function(){
ExplorerMenuBinding.superclass.onBindingAttach.call(this);
this.addMember(this.getChildBindingByLocalName("explorertoolbar"));
};
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fcb){
switch(_fcb.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fcb.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fcb);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fcc){
this._minButtons.set(_fcc.handle,this._mountMinButton(_fcc));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fcd){
var _fce=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fce.setLabel(_fcd.label);
_fce.setToolTip(_fcd.label);
_fce.handle=_fcd.handle;
_fce.node=_fcd.node;
this._minGroup.add(_fce);
this._minList.add(_fce);
_fce.attach();
return _fce;
};
ExplorerMenuBinding.prototype.handleAction=function(_fcf){
ExplorerMenuBinding.superclass.handleAction.call(this,_fcf);
switch(_fcf.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fd0=_fcf.target;
var _fd1=_fd0.getCheckedButtonBinding();
var _fd2=_fd1.handle;
this._selectedHandle=_fd2;
this._selectedTag=_fd1.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fcf.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fd3){
var _fd4=this._minButtons.get(_fd3);
if(_fd4){
_fd4.check();
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
if(top.app.bindingMap.app.hasClassName("expanded")){
this.collapse();
}else{
this.expand();
}
};
ExplorerMenuBinding.prototype.collapse=function(){
top.app.bindingMap.app.detachClassName("expanded");
};
ExplorerMenuBinding.prototype.expand=function(){
top.app.bindingMap.app.attachClassName("expanded");
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
ExplorerToolBarBinding.newInstance=function(_fd5){
var _fd6=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fd5);
return UserInterface.registerBinding(_fd6,ExplorerToolBarBinding);
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
var _fd7=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fd8=_fd7?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fd8);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fd9,_fda){
var _fdb="ui:explorertoolbarbutton";
var _fdc=DOMUtil.createElementNS(Constants.NS_UI,_fdb,_fd9);
var _fdd=UserInterface.registerBinding(_fdc,ExplorerToolBarButtonBinding);
_fdd.explorerToolBarButtonType=_fda;
return _fdd;
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
EditorBinding.invokeFunctionEditorDialog=function(_fde,_fdf,type){
type=type?type:"";
var _fe1=FunctionService.GetCustomEditorSettingsByMarkup(_fde);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fe1){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fe1.Width?(_fe1.Width>dim.w?dim.w:_fe1.Width):undefined;
def.height=_fe1.Height?(_fe1.Height>dim.h?dim.h:_fe1.Height):undefined;
if(_fe1.Url){
_fe1.Url=_fe1.Url.indexOf("?")>-1?_fe1.Url+"&consoleId="+Application.CONSOLE_ID:_fe1.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fdf;
def.argument={url:_fe1?_fe1.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fde}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fe4,_fe5){
var _fe6=EditorBinding._components;
var _fe7=EditorBinding._editors;
var key=_fe5.key;
var _fe9=Interfaces.isImplemented(IWysiwygEditorComponent,_fe4);
if(!_fe9){
_fe9=Interfaces.isImplemented(ISourceEditorComponent,_fe4);
}
if(_fe9){
if(_fe7.has(key)){
_fe7.get(key).initializeEditorComponent(_fe4);
}else{
if(!_fe6.has(key)){
_fe6.set(key,new List());
}
_fe6.get(key).add(_fe4);
}
}else{
throw "Editor component interface not implemented: "+_fe4;
}
};
EditorBinding.claimComponents=function(_fea,_feb){
var _fec=EditorBinding._components;
var _fed=EditorBinding._editors;
var key=_feb.key;
_fed.set(key,_fea);
var list=null;
if(_fec.has(key)){
list=_fec.get(key).copy();
_fec.del(key);
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
var _ff1=this.getProperty("value");
if(_ff1!=null){
_ff1=decodeURIComponent(_ff1);
this._startContent=_ff1;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _ff3=this.bindingWindow.DataManager;
_ff3.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_ff5){
var _ff6=EditorBinding.claimComponents(this,_ff5);
if(_ff6!=null){
while(_ff6.hasNext()){
this.initializeEditorComponent(_ff6.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _ff8=this.bindingWindow.DataManager;
if(_ff8.getDataBinding(name)){
_ff8.unRegisterDataBinding(name);
}
_ff8.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ff9=this.getEditorDocument();
if(_ff9!=null){
Application.framework(_ff9);
DOMEvents.addEventListener(_ff9,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ff9,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ff9,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_ff9,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_ffb){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_ffb==true){
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
var _ffd=this.getCheckSum();
if(_ffd!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ffd;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ffe=null;
if(Binding.exists(this._pageBinding)){
_ffe=this._pageBinding.getCheckSum(this._checksum);
}
return _ffe;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _1000=DOMEvents.getTarget(e);
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
if(_1000.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_1002,arg){
EditorBinding.superclass.handleBroadcast.call(this,_1002,arg);
var _1004=null;
switch(_1002){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _1005=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_1005=false;
}
}
}else{
_1004=DOMEvents.getTarget(arg);
if(_1004&&_1004.ownerDocument==this.getEditorDocument()){
_1005=false;
}
}
if(_1005){
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
EditorBinding.prototype._activateEditor=function(_1006){
if(_1006!=this._isActivated){
this._isActivated=_1006;
EditorBinding.isActive=_1006;
var _1007=this.getEditorWindow().standardEventHandler;
var _1008=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1008!=null){
if(_1006){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1008.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_1007.enableNativeKeys(true);
}else{
_1008.disable();
_1007.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var range=this.getEditorDocument().selection.createRange();
range.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _100a=false;
try{
var _100b=this.getEditorWindow().getSelection();
if(_100b!=null){
_100a=_100b.toString().length>0;
if(!_100a){
var range=_100b.getRangeAt(0);
var frag=range.cloneContents();
var _100e=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_100e.appendChild(frag.firstChild);
}
var img=_100e.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_100a=true;
}
}
}
}
}
catch(exception){
}
return _100a;
};
EditorBinding.prototype.isCommandEnabled=function(_1010){
var _1011=true;
switch(_1010){
case "Cut":
case "Copy":
case "Paste":
_1011=this.getEditorDocument().queryCommandEnabled(_1010);
break;
}
return _1011;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1015=false;
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
_1015=true;
}
break;
}
return _1015;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1018=this.getContentWindow().bindingMap.toolbar;
var _1019=_1018.getButtonForCommand(cmd);
if(!_1019){
throw "No button for command "+cmd;
}
return _1019;
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
EditorBinding.prototype.handleAction=function(_101d){
EditorBinding.superclass.handleAction.call(this,_101d);
var _101e=_101d.target;
var self=this;
var _1020=this.shadowTree.iframe;
switch(_101d.type){
case Binding.ACTION_DIRTY:
if(_101d.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1021){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1021);
};
EditorBinding.prototype.handleElement=function(_1022){
return true;
};
EditorBinding.prototype.updateElement=function(_1023){
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
var _1026=this._menuGroups[rel];
if(_1026 instanceof List){
_1026.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1029=this._menuGroups[rel];
if(_1029 instanceof List){
_1029.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_102b){
EditorPopupBinding.superclass.handleAction.call(this,_102b);
var _102c=_102b.target;
if(_102b.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_102c.getProperty("cmd");
var gui=_102c.getProperty("gui");
var val=_102c.getProperty("val");
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
var _1030=this.bindingWindow.bindingMap.tinywindow;
var _1031=this.bindingWindow.bindingMap.codepresswindow;
if(_1030){
EditorBinding.registerComponent(this,_1030);
}else{
if(_1031){
EditorBinding.registerComponent(this,_1031);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1032,_1033,_1034,theme){
this._editorBinding=_1032;
this._tinyEngine=_1033;
this._tinyInstance=_1034;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1036,frame,_1038){
this._editorBinding=_1036;
this._codePressFrame=frame;
this._codePressEngine=_1038;
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
var _103b=this._editorBinding;
if(_103b!=null){
var self=this;
var _103d={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_103b.hasBookmark()){
_103b.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_103b.hasBookmark()){
_103b.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_103d);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_103d);
}
};
EditorClickButtonBinding.newInstance=function(_103f){
var _1040=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_103f);
return UserInterface.registerBinding(_1040,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1041){
var _1042=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1041);
return UserInterface.registerBinding(_1042,EditorToolBarButtonBinding);
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
var _1043=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1043);
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
EditorSelectorBinding.prototype.initializeComponent=function(_1044,_1045,_1046,theme){
this._editorBinding=_1044;
this._tinyEngine=_1045;
this._tinyInstance=_1046;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1048){
EditorSelectorBinding.superclass.handleAction.call(this,_1048);
switch(_1048.type){
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
EditorMenuItemBinding.newInstance=function(_104c){
var _104d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_104c);
return UserInterface.registerBinding(_104d,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_104e){
var i=0,_1050,_1051=[],split=_104e.split(" ");
while((_1050=split[i++])!=null){
if(_1050.length>=3&&_1050.substring(0,3)=="mce"){
continue;
}else{
if(_1050.length>=14&&_1050.substring(0,14)=="compositemedia"){
continue;
}
}
_1051.push(_1050);
}
return _1051.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1053){
var _1054=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1053);
if(soap instanceof SOAPFault){
}else{
_1054=soap.XhtmlFragment;
if(!_1054){
_1054="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1054;
};
VisualEditorBinding.getTinyContent=function(_1056,_1057){
var _1058=null;
if(_1056==null||!_1056.replace(/\s*/gm,"").length){
_1056=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1057.getSoapTinyContent(_1056);
if(soap instanceof SOAPFault){
var _105a=soap;
var _105b={handleDialogResponse:function(){
_1057.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_105b,_105a);
}else{
_1058=soap.XhtmlFragment;
if(_1058==null){
_1058=new String("");
}
_1058=_1058.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1058;
};
VisualEditorBinding.isImage=function(_105c){
return _105c&&_105c.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_105d){
return VisualEditorBinding.isImage(_105d)&&!VisualEditorBinding.isReservedElement(_105d);
};
VisualEditorBinding.isReservedElement=function(_105e){
if(VisualEditorBinding.isFunctionElement(_105e)){
return true;
}
if(VisualEditorBinding.isFieldElement(_105e)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_105e)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_105f){
return VisualEditorBinding.isImage(_105f)&&CSSUtil.hasClassName(_105f,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1060){
return VisualEditorBinding.isImage(_1060)&&CSSUtil.hasClassName(_1060,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1061){
return VisualEditorBinding.isImage(_1061)&&CSSUtil.hasClassName(_1061,VisualEditorBinding.HTML_CLASSNAME);
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
var _1062=this.getProperty("embedablefieldstypenames");
if(_1062!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1062);
}
var _1063=this.getProperty("formattingconfiguration");
if(_1063!=null){
this._url+="?config="+_1063;
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
VisualEditorBinding.prototype.handleBroadcast=function(_1064,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1064,arg);
var _1066=this.getContentWindow().bindingMap.tinywindow;
var _1067=_1066.getContentWindow();
switch(_1064){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1067){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1066);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1068){
_1068.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1069=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1069.replace(/\s*/gm,"").length==0){
_1069=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1069,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_106a){
VisualEditorBinding.superclass._onPageInitialize.call(this,_106a);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _106c=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_106c=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_106c=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _106c;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_106f){
var _1070=_106f;
if(!this._isNormalizedDocument(_106f)){
_1070=this._getHtmlMarkup().replace("${body}",_106f);
}
return _1070;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1071){
var _1072=false;
var doc=XMLParser.parse(_1071,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1072=true;
}
}
if(Client.isWebKit){
if(_1071.indexOf("<html")!==0){
_1072=false;
}
}
return _1072;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1077=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1077){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1077=true;
}
return _1077;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1079=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1079);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_107b){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_107b,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_107d){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_107d,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1080=CSSComputer.getPadding(body);
var _1081=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1081.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_1084){
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
VisualEditorPopupBinding.prototype.configure=function(_1085,_1086,_1087){
var _1088=this.editorBinding.hasSelection();
this.tinyInstance=_1085;
this.tinyEngine=_1086;
this.tinyElement=_1087;
this.hasSelection=_1088;
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
var _108c=false;
if(this.hasSelection){
_108c=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_108c=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_108c=true;
}
}
}
}
if(_108c){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _108d=this.getMenuItemForCommand("compositeInsertLink");
var _108e=this.getMenuItemForCommand("unlink");
var _108f=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1090=this.editorBinding.getButtonForCommand("unlink");
_108e.setDisabled(_1090.isDisabled);
if(_108e.isDisabled){
_108d.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_108d.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1091=this.editorBinding.embedableFieldConfiguration;
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
if(_1091){
var _1094=_1091.getGroupNames();
if(_1094.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1094.each(function(_1098){
var _1099=_1091.getFieldNames(_1098);
_1099.each(function(_109a){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_109a);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1098+":"+_109a);
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
var _109c=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _109d=null;
var _109e=null;
if(_109c){
if(_109c.nodeName=="TD"){
_109d=_109c.getAttribute("colspan");
_109e=_109c.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_109d=="1"&&_109e=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_109c){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_109f){
var _10a0=VisualEditorFormattingConfiguration._configurations;
if(!_10a0.has(_109f)){
_10a0.set(_109f,new VisualEditorFormattingConfiguration());
}
return _10a0.get(_109f);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_10a2){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_10a3){
var _10a4=null;
var _10a5=VisualEditorFieldGroupConfiguration._configurations;
if(!_10a5.has(_10a3)){
_10a5.set(_10a3,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_10a3)));
}
return _10a5.get(_10a3);
};
function VisualEditorFieldGroupConfiguration(_10a6){
var _10a7=new Map();
new List(_10a6).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_10a7.set(group.GroupName,map);
});
this._groups=_10a7;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10ab){
return this._groups.get(_10ab).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10ac,_10ad){
return this._groups.get(_10ac).get(_10ad).xhtml;
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
var _10af=this.getDescendantElementsByLocalName("textarea");
while(_10af.hasNext()){
var _10b0=_10af.getNext();
if(_10b0.getAttribute("selected")=="true"){
this._startContent=_10b0.value;
this._textareaname=_10b0.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10b2=this.getContentWindow().bindingMap.templatetree;
_10b2.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10b3){
var _10b4=_10b2.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10b4.textareaname);
_10b3.consume();
}});
_10b2.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10b5){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10b6=this.getContentWindow().bindingMap.toolsplitter;
_10b6.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10b7=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10b7.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10b7);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10b8){
this._textareas=new Map();
while(_10b8.hasNext()){
var _10b9=_10b8.getNext();
var _10ba=_10b9.getAttribute("placeholderid");
this._textareas.set(_10ba,{placeholderid:_10ba,placeholdername:_10b9.getAttribute("placeholdername"),placeholdermarkup:_10b9.value,textareaelement:_10b9,isSelected:_10b9.getAttribute("selected")=="true"});
}
var _10bb=new Map();
this._textareas.each(function(name,_10bd){
var _10be=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10be.setLabel(_10bd.placeholdername);
_10be.setImage("${icon:placeholder}");
_10be.setProperty("placeholder",true);
_10be.textareaname=name;
_10bb.set(_10bd.placeholdername,_10be);
if(_10bd.isSelected){
selected=_10be;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10bf=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10bf.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10c0=this.getContentWindow().bindingMap.templatetree;
var _10c1=_10c0.add(TreeNodeBinding.newInstance(_10c0.bindingDocument));
_10c1.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10c1.setImage("${icon:warning}");
_10c1.attach();
var _10c2=this.getContentWindow().bindingMap.statusbar;
_10c2.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10c4=this._textareas.get(name);
var _10c5=_10c4.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10c5));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10c6){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10c6;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10c7=this.getContentWindow().bindingMap.statusbar;
_10c7.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10c6);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10ca=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10ca;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10cb=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10cb=this._xhtmls.get(this._textareaname);
if(_10cb==null){
_10cb=VisualEditorBinding.XHTML;
}
}
return _10cb;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10cd){
_10cd.textareaelement.value=_10cd.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10ce,_10cf,_10d0){
var _10d1=_10ce.getElementsByTagName("div").item(0);
var _10d2=_10cf.getElementsByTagName("div").item(0);
var _10d3=new List(_10d1.getElementsByTagName("textarea"));
var _10d4=new List(_10d2.getElementsByTagName("textarea"));
if(_10d3.getLength()!=_10d4.getLength()){
_10d0=true;
}else{
var index=0;
_10d3.each(function(_10d6,index){
var _10d8=_10d4.get(index);
var newid=_10d6.getAttribute("placeholderid");
var oldid=_10d8.getAttribute("placeholderid");
var _10db=_10d6.getAttribute("placeholdername");
var _10dc=_10d8.getAttribute("placeholdername");
if(newid!=oldid||_10db!=_10dc){
_10d0=true;
}
return !_10d0;
});
}
if(_10d0){
var html=null;
if(_10d1.innerHTML!=null){
html=_10d1.innerHTML;
}else{
html=DOMSerializer.serialize(_10d1);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10df){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10df);
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
var _10e2=this.getDescendantBindingByLocalName("selector");
_10e2.attach();
this._populateTemplateSelector();
var _10e3=this.getContentWindow().bindingMap.templateselector;
_10e3.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10e4=this.getDescendantBindingByLocalName("selector");
var _10e5=this.getContentWindow().bindingMap.templateselector;
_10e4.selections.each(function(_10e6){
_10e6.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10e5.populateFromList(_10e4.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10e7=this.getDescendantBindingByLocalName("selector");
var _10e8=this.getContentWindow().bindingMap.templateselector;
_10e7.selectByValue(_10e8.getValue());
_10e7.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10e9){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10ee,_10ef){
var _10f0=_10ef;
if(old.has(_10ee)){
_10f0=old.get(_10ee).placeholdermarkup;
}
return _10f0;
}
while(_10e9.hasNext()){
var _10f1=_10e9.getNext();
var _10f2=_10f1.getAttribute("placeholderid");
this._textareas.set(_10f2,{placeholderid:_10f2,placeholdername:_10f1.getAttribute("placeholdername"),placeholdermarkup:compute(_10f2,_10f1.value),textareaelement:_10f1,isSelected:_10f1.getAttribute("selected")=="true"});
}
var _10f3=null;
var _10f4=this.getContentWindow().bindingMap.templatetree;
var _10f5=new Map();
this._textareas.each(function(name,_10f7){
var _10f8=_10f4.add(TreeNodeBinding.newInstance(_10f4.bindingDocument));
_10f8.setLabel(_10f7.placeholdername);
_10f8.setImage("${icon:placeholder}");
_10f8.setProperty("placeholder",true);
_10f8.textareaname=name;
_10f5.set(_10f7.placeholdername,_10f8);
if(_10f7.isSelected){
_10f3=_10f8;
}
});
_10f4.attachRecursive();
if(_10f3!=null){
var _10f9=true;
if(this._oldtextareas.hasEntries()){
_10f9=false;
var map=new Map();
this._textareas.each(function(id,_10fc){
map.set(_10fc.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10f9=true;
}
}
if(_10f9){
var _10fd=this._textareas.get(_10f3.textareaname);
this._textareaname=_10f3.textareaname;
this._placeholdername=_10fd.placeholdername;
this._setContentFromPlaceHolder(_10f3.textareaname);
_10f3.focus();
}else{
var _10fe=_10f5.get(this._placeholdername);
this._textareaname=_10fe.textareaname;
_10fe.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_1101){
var _1102=null;
if(Client.isWebKit||Client.isExplorer){
_1102=node.getElementsByTagName(_1101);
}else{
_1102=node.getElementsByTagName("ui:"+_1101);
}
return _1102;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1103,_1104){
var _1105=this._getElementsByTagName(_1103,"selector").item(0);
var _1106=this._getElementsByTagName(_1104,"selector").item(0);
var _1107=false;
var _1108=false;
if(_1105!=null&&_1106!=null){
var _1109=new List(this._getElementsByTagName(_1105,"selection"));
var _110a=new List(this._getElementsByTagName(_1106,"selection"));
if(_1109.getLength()!=_110a.getLength()){
_1107=true;
_1108=true;
}else{
_1109.each(function(_110b,index){
var _110d=_110b.getAttribute("value");
var _110e=_110a.get(index).getAttribute("value");
if(_110d!=_110e){
_1107=true;
}
return !_1107;
});
_1109.each(function(_110f,index){
var _1111=_110f.getAttribute("selected");
var _1112=_110a.get(index).getAttribute("selected");
if(_1111!=_1112){
_1108=true;
}
return !_1108;
});
}
}
if(_1107){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1105);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1108){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1103,_1104,_1108);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_1114){
var _1115=null;
if(_1114==undefined){
_1114=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1117){
if(_1117.PlaceholderId==_1114){
_1115=_1117.ClientRectangle.Width;
return false;
}
});
}
return _1115;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1119=this._pageId;
var _111a=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1119,_111a,function(_111c){
self._templatePreview=_111c;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_111d){
var _111e=this._pageId;
var _111f=this._textareaname;
var _1120=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_111d,_111e,_1120,_111f,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1122){
var _1123=this._pageId;
var _1124=this._textareaname;
var _1125=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1122,_1123,_1125,_1124,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1127,frame,_1129){
this._editorBinding=_1127;
this._codePressFrame=frame;
this._codePressEngine=_1129;
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
var _112f=this.getProperty("validate");
if(_112f==true){
this._hasStrictValidation=true;
}
var _1130=this.getProperty("strictsave");
if(_1130===false){
this._strictSave=false;
}
var _1131=this.getProperty("validator");
if(_1131!=null){
this._validator=_1131;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1132,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1132,arg);
switch(_1132){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1134=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1134!=null){
var _1135=_1134.getContentWindow();
if(arg.broadcastWindow==_1135){
this._codemirrorWindow=_1135;
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
this.initializeEditorComponents(_1134);
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
this.unsubscribe(_1132);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1139){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1139);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_113a){
if(_113a!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_113a;
EditorBinding.isActive=_113a;
var _113b=this._codemirrorWindow.standardEventHandler;
if(_113a){
_113b.enableNativeKeys(true);
}else{
_113b.disableNativeKeys();
}
var _113c=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_113c!=null){
if(_113a){
_113c.enable();
}else{
_113c.disable();
}
}
if(_113a){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1140=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1140;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1141){
_1141.initializeSourceEditorComponent(this,this._codemirrorEditor);
};
CodeMirrorEditorBinding.prototype.clean=function(){
CodeMirrorEditorBinding.superclass.clean.call(this);
this.getContentWindow().bindingMap.editorpage.clean();
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
CodeMirrorEditorBinding.prototype.setContent=function(_1143){
if(!this._isFinalized){
if(_1143!=this._startContent){
this._startContent=_1143;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1143);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1144=this.getContentWindow().bindingMap.editorpage.getContent();
return _1144?_1144:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1145){
if(this._pageBinding!=null){
this._pageBinding.cover(_1145);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1146){
if(_1146!=null&&this.shadowTree.dotnetinput!=null){
var value=_1146.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1148=true;
var _1149=this.getContent();
if(this._validator!=null){
_1148=Validator.validateInformed(_1149,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _114a=_1149.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_114a!=_1149){
_1149=_114a;
this.setContent(_114a);
}
_1148=XMLParser.isWellFormedDocument(_1149,true,!this._strictSave);
if(_1148==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1148=this._isValidHTML(_1149);
break;
}
}
break;
}
}
return _1148;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _114c=true;
var doc=XMLParser.parse(xml);
var _114e=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_114e.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_114e.add("NamespaceURI");
}
var head=null,body=null;
var _1152=new List(root.childNodes);
while(_1152.hasNext()){
var child=_1152.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_114e.add("MultipleHead");
}
if(body!=null){
_114e.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_114e.add("MultipleBody");
}
body=child;
break;
default:
_114e.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_114e.add("MissingHead");
}
if(body==null){
_114e.add("MissingBody");
}
}
if(_114e.hasEntries()){
_114c=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_114e.getFirst()));
}
return _114c;
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
var _1154=null;
var page=this._pageBinding;
if(page!=null){
_1154=page.getCheckSum();
}
return _1154;
};
ThrobberBinding.prototype=new Binding;
ThrobberBinding.prototype.constructor=ThrobberBinding;
ThrobberBinding.superclass=Binding.prototype;
ThrobberBinding.URL_DEFAULT=Resolver.resolve("${skin}/throbber/throbber.gif");
ThrobberBinding.URL_ACTIVATE=Resolver.resolve("${skin}/throbber/throbber_activate.gif");
ThrobberBinding.URL_DEACTIVATE=Resolver.resolve("${skin}/throbber/throbber_deactivate.gif");
function ThrobberBinding(){
this.logger=SystemLogger.getLogger("ThrobberBinding");
this._isPlaying=false;
return this;
}
ThrobberBinding.prototype.toString=function(){
return "[ThrobberBinding]";
};
ThrobberBinding.prototype.onBindingRegister=function(){
ThrobberBinding.superclass.onBindingRegister.call(this);
this._setImage(ThrobberBinding.URL_DEFAULT);
if(Application.hasStartPage&&Application.hasExternalConnection){
this.subscribe(BroadcastMessages.COMPOSITE_START);
this.subscribe(BroadcastMessages.COMPOSITE_STOP);
this.subscribe(BroadcastMessages.START_COMPOSITE);
this.bindingElement.title=" Composite Start ";
this.attachClassName("active");
this.addEventListener(DOMEvents.CLICK,{handleEvent:function(){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}});
}
};
ThrobberBinding.prototype.handleBroadcast=function(_1156,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1156,arg);
switch(_1156){
case BroadcastMessages.COMPOSITE_START:
case BroadcastMessages.START_COMPOSITE:
this.hide();
break;
case BroadcastMessages.COMPOSITE_STOP:
this.show();
break;
}
};
ThrobberBinding.prototype.play=function(){
if(!this._isPlaying){
this._setImage(ThrobberBinding.URL_ACTIVATE);
this._isPlaying=true;
}
};
ThrobberBinding.prototype.stop=function(){
if(this._isPlaying==true){
this._setImage(ThrobberBinding.URL_DEACTIVATE?ThrobberBinding.URL_DEACTIVATE:ThrobberBinding.URL_DEFAULT);
this._isPlaying=false;
}
};
ThrobberBinding.prototype.hide=function(){
if(this.isVisible==true){
this.bindingElement.style.visibility="hidden";
this.isVisible=false;
}
};
ThrobberBinding.prototype.show=function(){
if(!this.isVisible){
this.bindingElement.style.visibility="visible";
this.isVisible=true;
}
};
ThrobberBinding.prototype._setImage=function(url){
this.bindingElement.style.backgroundImage="url(\""+url+"\")";
};
ProgressBarBinding.prototype=new Binding;
ProgressBarBinding.prototype.constructor=ProgressBarBinding;
ProgressBarBinding.superclass=Binding.prototype;
ProgressBarBinding.WIDTH=190;
ProgressBarBinding.NOTCH=9;
ProgressBarBinding._bindingInstance=null;
ProgressBarBinding.notch=function(_1159){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1159);
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
ProgressBarBinding.prototype.notch=function(_115b){
_115b=_115b?_115b:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_115b);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_115d,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_115d,arg);
switch(_115d){
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
StartMenuItemBinding.prototype.setChecked=function(_115f,_1160){
StartMenuItemBinding.superclass.setChecked.call(this,_115f,_1160);
if(!_1160){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1161){
var _1162=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1161);
UserInterface.registerBinding(_1162,StartMenuItemBinding);
return UserInterface.getBinding(_1162);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1165,_1166){
var _1167=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1166,true)==true){
if(_1165!="*"){
_1165=KeySetBinding._sanitizeKeyModifiers(_1165);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1167[doc]){
_1167[doc]={};
}
if(!_1167[doc][code]){
_1167[doc][code]={};
}
_1167[doc][code][_1165]=_1166;
}
};
KeySetBinding.handleKey=function(doc,e){
var _116b=false;
var code=e.keyCode;
var _116d=KeySetBinding.keyEventHandlers;
if(_116d[doc]&&_116d[doc][code]){
var _116e="[default]";
_116e+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_116e+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_116e+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_116e+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _116f=_116d[doc][code][_116e];
if(_116f==null){
_116f=_116d[doc][code]["*"];
}
if(_116f!=null){
_116f.handleKeyEvent(e);
_116b=true;
}
}
return _116b;
};
KeySetBinding._sanitizeKeyModifiers=function(_1170){
var _1171="[default]";
var mods={};
if(_1170){
new List(_1170.split(" ")).each(function(_1173){
mods[_1173]=true;
});
function check(_1174){
if(mods[_1174]){
_1171+=" "+_1174;
}
}
check("shift");
check("control");
}
return _1171;
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
var _1178=key.getAttribute("oncommand");
var _1179=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1179){
DOMEvents.preventDefault(e);
}
var _117b=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1178,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_117c){
if(_117c instanceof CursorBinding){
_117c.setOpacity(0);
_117c.show();
new Animation({modifier:9,onstep:function(_117d){
_117c.setOpacity(Math.sin(_117d*Math.PI/180));
},onstop:function(){
_117c.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_117e){
if(_117e instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_117f){
_117e.setOpacity(Math.cos(_117f*Math.PI/180));
},onstop:function(){
_117e.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1180,_1181,_1182){
if(_1180 instanceof CursorBinding){
_1182.x-=16;
_1182.y-=16;
new Animation({modifier:3,onstep:function(_1183){
var tal=Math.sin(_1183*Math.PI/180);
_1180.setPosition(new Point(((1-tal)*_1181.x)+((0+tal)*_1182.x),((1-tal)*_1181.y)+((0+tal)*_1182.y)));
},onstop:function(){
CursorBinding.fadeOut(_1180);
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
CursorBinding.prototype.setOpacity=function(_1189){
this.bindingElement.style.opacity=new String(_1189);
this._opacity=_1189;
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
function setOpacity(_118c){
cover.bindingElement.style.opacity=new String(_118c);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_118d){
if(Binding.exists(cover)){
setOpacity(Math.cos(_118d*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_118f){
cover.bindingElement.style.MozOpacity=new String(_118f);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1190){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1190*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1192){
if(_1192!=this._isBusy){
if(_1192){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1192;
}
};
CoverBinding.prototype.setTransparent=function(_1193){
if(_1193!=this._isTransparent){
if(_1193){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1193;
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
CoverBinding.prototype.setHeight=function(_1195){
if(_1195>=0){
this.bindingElement.style.height=new String(_1195+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1196){
var _1197=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1196);
return UserInterface.registerBinding(_1197,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1199=UncoverBinding._bindingInstance;
if(Binding.exists(_1199)){
_1199.setPosition(pos);
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
TheatreBinding.prototype.play=function(_119d){
this._isFading=_119d==true;
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
var _119e=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_119e.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_119e.clearRect(0,0,300,150);
_119e.fillRect(0,0,300,150);
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
var _11a0=this._canvas.getContext("2d");
_11a0.clearRect(0,0,300,150);
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
var _11a1=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_11a1);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _11a2=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_11a2){
this._startcontent=_11a2.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_11a3){
SourceCodeViewerBinding.superclass.handleAction.call(this,_11a3);
switch(_11a3.type){
case WindowBinding.ACTION_ONLOAD:
if(_11a3.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_11a3.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_11a3);
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
var _11a7=this._transformer.transformToString(doc);
this._inject(_11a7);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11aa){
this.getContentDocument().body.innerHTML=_11aa;
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
var _11b2=list.getNext();
var id=_11b2.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11b2);
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
var _11bc=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11bc.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11bc.appendChild(att);
}
elm.appendChild(_11bc);
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
var _11c6=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11c6){
doc=XMLParser.parse(_11c6);
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
var _11ca=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11ca;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11cb,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11cb,arg);
switch(_11cb){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11cd){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11cd);
switch(_11cd.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11cd.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11cf=new List();
list.each(function(lang){
_11cf.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11cf);
}else{
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11d3=this.getDescendantBindingByLocalName("menugroup");
_11d3.detachRecursive();
_11d3.bindingElement.innerHTML="";
if(list.hasEntries()){
var _11d4=null;
while(list.hasNext()){
var _11d5=list.getNext();
if(_11d5.isSelected){
this.setLabel(_11d5.label);
}
var _11d6=MenuItemBinding.newInstance(this.bindingDocument);
_11d6.imageProfile=_11d5.imageProfile;
_11d6.setLabel(_11d5.label);
if(_11d5.tooltip!=null){
_11d6.setToolTip(_11d5.tooltip);
}
_11d6.selectionValue=_11d5.value;
_11d3.add(_11d6);
_11d6.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11d9){
switch(_11d9){
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
var _11dc=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11dc,root);
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
var _11dd=this.getProperty("status");
if(_11dd!=null){
switch(_11dd){
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
UserInterfaceMapping.prototype.merge=function(_11e1){
for(var _11e2 in _11e1.map){
this.map[_11e2]=_11e1.getBindingImplementation(_11e2);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11e3){
var _11e4=null;
var name=_11e3.nodeName.toLowerCase();
if(this.map[name]){
_11e4=this.map[name];
}
return _11e4;
};
var UserInterface=new function(){
var _11e6=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11e7=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11e6,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11e8=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11ea,impl){
var _11ec=null;
if(!this.hasBinding(_11ea)){
var _11ed=DOMUtil.getParentWindow(_11ea);
if(DOMUtil.getLocalName(_11ea)!="bindingmapping"){
if(!impl&&_11ea.getAttribute("binding")!=null){
var _11ee=_11ea.getAttribute("binding");
impl=_11ed[_11ee];
if(impl==null){
throw "No such binding in scope: "+_11ee;
}
}
if(!impl){
var _11ef=_11ed.DocumentManager;
if(_11ef){
var _11f0=_11ef.customUserInterfaceMapping;
if(_11f0){
impl=_11f0.getBindingImplementation(_11ea);
}
}
}
if(!impl){
impl=_11e7.getBindingImplementation(_11ea);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11ec=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11ec){
var key=KeyMaster.getUniqueKey();
_11ea.setAttribute("key",key);
_11ec.key=key;
if(!_11ea.id){
_11ea.id=key;
}
keys[key]={element:_11ea,binding:_11ec};
_11ec.onBindingRegister();
}
}
}
return _11ec;
};
this.unRegisterBinding=function(_11f2){
terminate(_11f2);
};
function terminate(_11f3){
if(Binding.exists(_11f3)==true){
var key=_11f3.key;
Binding.destroy(_11f3);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11f3=null;
}else{
_11e8.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11f5){
var _11f6=null;
if(keys[_11f5.key]){
_11f6=keys[_11f5.key].element;
}
return _11f6;
};
this.getBinding=function(_11f7){
var _11f8=null;
if(_11f7&&_11f7.nodeType==Node.ELEMENT_NODE){
try{
var key=_11f7.getAttribute("key");
if(key&&keys[key]){
_11f8=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11f7);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11f8;
};
this.getBindingByKey=function(key){
var _11fb=null;
if(keys[key]){
_11fb=keys[key].binding;
}
return _11fb;
};
this.hasBinding=function(_11fc){
return this.getBinding(_11fc)!=null;
};
this.isBindingVisible=function(_11fd){
var _11fe=Application.isOperational;
if(_11fe==true){
var _11ff=new Crawler();
_11ff.type=NodeCrawler.TYPE_ASCENDING;
_11ff.id="visibilitycrawler";
_11ff.addFilter(function(_1200){
var b=UserInterface.getBinding(_1200);
var res=0;
if(!b.isVisible){
_11fe=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11ff.crawl(_11fd.bindingElement);
_11ff.dispose();
}
return _11fe;
};
var _1203=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1203={};
for(var key in keys){
_1203[key]=true;
}
};
this.getPoint=function(){
var _1207=null;
if(_1203){
_1207=new List();
for(var key in keys){
if(!_1203[key]){
_1207.add(key);
}
}
}
return _1207;
};
this.clearPoint=function(){
_1203=null;
};
this.trackUndisposedBindings=function(){
var _1209=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1209){
_1209="Bindings illdisposed: ";
}
_1209+=entry.binding+" ";
}
}
if(_1209!=null){
_11e8.error(_1209);
}
};
this.autoTrackDisposedBindings=function(_120c){
if(_120c){
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
SOAPRequest.newInstance=function(_120d,_120e){
var _120f=_120d+"/"+_120e;
var _1210=new SOAPRequest(_120f);
var _1211=SOAPRequest.resolver;
_1210.document=Templates.getTemplateDocument("soapenvelope.xml");
_1210.envelope=_1211.resolve("soap:Envelope",_1210.document);
_1210.header=_1211.resolve("soap:Header",_1210.envelope);
_1210.body=_1211.resolve("soap:Body",_1210.envelope);
return _1210;
};
SOAPRequest._parseResponse=function(_1212){
var _1213=null;
var _1214=false;
var doc=_1212.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1213=SOAPRequestResponse.newInstance(_1212.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1212.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1214=true;
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
var text=_1212.responseText;
if(_1212.status==503||text.indexOf("id=\"offline\"")>-1){
_1214=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1212.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1212.responseText);
}
}
}
}
if(_1214==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1213;
};
function SOAPRequest(_1219){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1219;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _121b=DOMUtil.getXMLHTTPRequest();
var _121c=null;
_121b.open("post",url,false);
_121b.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_121b.setRequestHeader("SOAPAction",this.action);
try{
_121b.send(this.document);
_121c=SOAPRequest._parseResponse(_121b);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_121b=null;
return _121c;
};
SOAPRequest.prototype.asyncInvoke=function(url,_121f){
var _1220=DOMUtil.getXMLHTTPRequest();
_1220.open("post",url,true);
_1220.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1220.setRequestHeader("SOAPAction",this.action);
_1220.onreadystatechange=function(){
if(_1220.readyState==4){
var _1221=SOAPRequest._parseResponse(_1220);
_121f(_1221);
_1220=null;
}
};
_1220.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1222 in this){
this[_1222]=null;
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
var _1224=null;
if(doc&&doc.documentElement){
_1224=new SOAPRequestResponse();
var _1225=SOAPRequestResponse.resolver;
_1224.document=doc;
_1224.envelope=_1225.resolve("soap:Envelope",_1224.document);
_1224.header=_1225.resolve("soap:Header",_1224.envelope);
_1224.body=_1225.resolve("soap:Body",_1224.envelope);
var fault=_1225.resolve("soap:Fault",_1224.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1224.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1225.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1225.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1224;
};
function SOAPFault(_1227,_1228,_1229){
this._operationName=_1227;
this._operationAddress=_1228;
this._faultString=_1229;
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
SOAPFault.newInstance=function(_122a,fault){
return new SOAPFault(_122a.name,_122a.address,fault.faultString);
};
function SOAPEncoder(wsdl,_122d){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_122d;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _122f=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_122f.body,this._operation);
var _1231=this._wsdl.getSchema();
var _1232=_1231.lookup(this._operation);
var _1233=_1232.getListedDefinitions();
while(_1233.hasNext()){
var def=_1233.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _122f;
};
SOAPEncoder.prototype._resolve=function(_1237,_1238,value){
var _123a=this._wsdl.getSchema();
if(_1238.isSimpleValue){
this._appendText(_1237,value,_1238.type=="string");
}else{
var _123b=_123a.lookup(_1238.type);
if(_123b instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_123b.getListedDefinitions();
if(_123b.isArray){
var _123d=new List(value);
var def=defs.getNext();
while(_123d.hasNext()){
var elm=this._appendElement(_1237,def.name);
var val=_123d.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1237,def.name);
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
SOAPEncoder.prototype._appendText=function(_1244,value,_1246){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1249=false;
var i=0,c;
while(c=chars[i++]){
var _124c=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_124c=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_124c=false;
}
break;
}
if(!_124c){
safe+=c;
}else{
_1249=true;
}
}
if(_1249){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1244.appendChild(_1244.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_124f){
this._wsdl=wsdl;
this._operation=_124f;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1254){
var _1255=null;
var _1256=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1258=this.resolve(id,_1254.body);
var _1259=_1256.lookup(id);
var _125a=_1259.getListedDefinitions();
while(!_1255&&_125a.hasNext()){
var def=_125a.getNext();
var elm=this.resolve(def.name,_1258);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1255=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1255.appendChild(_1255.importNode(e,true));
}else{
_1255=this._compute(elm,def);
}
}
return _1255;
};
SOAPDecoder.prototype._compute=function(_125e,_125f){
var _1260=null;
var _1261=this._wsdl.getSchema();
if(_125f.isSimpleValue){
_1260=this._getSimpleValue(_125e,_125f.type);
}else{
var _1262=_1261.lookup(_125f.type);
if(_1262 instanceof SchemaSimpleType){
_1260=this._getSimpleValue(_125e,_1262.restrictionType);
}else{
var defs=_1262.getListedDefinitions();
if(_1262.isArray){
_1260=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_125e);
while(elms.hasNext()){
var elm=elms.getNext();
_1260.push(this._compute(elm,def));
}
}else{
if(_125e==null){
_1260=null;
}else{
_1260={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_125e);
if(elm){
_1260[def.name]=this._compute(elm,def);
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
return _1260;
};
SOAPDecoder.prototype._getSimpleValue=function(_1267,type){
var _1269=null;
if(_1267!=null&&_1267.firstChild&&_1267.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1267.childNodes.length>1){
_1267.normalize();
}
_1269=_1267.firstChild.data;
switch(type){
case Schema.types.STRING:
_1269=_1269;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1269=Number(_1269);
break;
case Schema.types.BOOLEAN:
_1269=_1269=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1269;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_126a){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_126a);
}
Schema.prototype._parseSchema=function(_126b){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _126c={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_126b);
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
_126c[rule.getAttribute("name")]=entry;
}
return _126c;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1271){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1271);
}
SchemaDefinition.prototype._parse=function(_1272){
var min=_1272.getAttribute("minOccurs");
var max=_1272.getAttribute("maxOccurs");
var type=_1272.getAttribute("type");
this.name=_1272.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1278=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1278;
}else{
var elm=_1272.getElementsByTagName("*").item(0);
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
function SchemaElementType(_127a,_127b){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_127a,_127b);
}
SchemaElementType.prototype._parseListedDefinitions=function(_127c,_127d){
var els=_127c.resolveAll("s:complexType/s:sequence/s:element",_127d);
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
function SchemaComplexType(_127f,_1280){
this._definitions=new List();
this._parseListedDefinitions(_127f,_1280);
this.isArray=_1280.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1281,_1282){
var els=_1281.resolveAll("s:sequence/s:element",_1282);
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
function SchemaSimpleType(_1285,_1286){
this.restrictionType=null;
this._parse(_1285,_1286);
}
SchemaSimpleType.prototype._parse=function(_1287,_1288){
var _1289=_1287.resolve("s:restriction",_1288);
if(_1289){
this.restrictionType=_1289.getAttribute("base").split(":")[1];
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
var _128c=null;
var _128d=DOMUtil.getXMLHTTPRequest();
_128d.open("get",url,false);
_128d.send(null);
if(_128d.responseXML){
_128c=_128d.responseXML.documentElement;
}else{
alert(_128d.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _128c;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _128e=new List();
var _128f=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_128f.hasEntries()){
while(_128f.hasNext()){
var _1290=_128f.getNext();
var name=_1290.getAttribute("name");
_128e.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _128e;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1293,_1294,_1295){
this.name=name;
this.address=_1293;
this.encoder=_1294;
this.decoder=_1295;
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
var _1299=wsdl.getOperations();
_1299.each(function(_129a){
proxy[_129a.name]=WebServiceProxy.createProxyOperation(_129a);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_129b,_129c){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_129c){
var log=_129c instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_129b.address+": "+_129b.name+"\n\n";
log+=DOMSerializer.serialize(_129c.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_129e){
return function(){
var _129f=new List(arguments);
var _12a0=null;
if(typeof (_129f.getLast())=="function"){
var _12a1=_129f.extractLast();
var _12a2=_129e.encoder.encode(_129f);
this._log(_129e,_12a2);
var self=this;
var _12a4=_12a2.asyncInvoke(_129e.address,function(_12a5){
self._log(_129e,_12a5);
if(_12a5){
if(_12a5.fault){
_12a0=SOAPFault.newInstance(_129e,_12a5.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12a0,_12a2,_12a5);
}
}else{
if(WebServiceProxy.isDOMResult){
_12a0=_12a5.document;
}else{
_12a0=_129e.decoder.decode(_12a5);
}
}
}
_12a2.dispose();
_12a1(_12a0);
});
}else{
var _12a2=_129e.encoder.encode(new List(arguments));
this._log(_129e,_12a2);
var _12a4=_12a2.invoke(_129e.address);
this._log(_129e,_12a4);
if(_12a4){
if(_12a4.fault){
_12a0=SOAPFault.newInstance(_129e,_12a4.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12a0,_12a2,_12a4);
}
}else{
if(WebServiceProxy.isDOMResult){
_12a0=_12a4.document;
}else{
_12a0=_129e.decoder.decode(_12a4);
}
}
}
_12a2.dispose();
return _12a0;
}
};
};
WebServiceProxy.handleFault=function(_12a6,_12a7,_12a8){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_12a6,soapRequest:_12a7,soapResponse:_12a8});
}
catch(exception){
alert(_12a6.getFaultString());
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
var _12a9=SystemLogger.getLogger("MessageQueue");
var _12aa=null;
var _12ab=0;
var _12ac=null;
var _12ad=new Map();
var _12ae=new Map();
var _12af=false;
var _12b0=false;
var _12b1=false;
var _12b2=false;
var _12b3={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_12aa=ConsoleMessageQueueService;
_12ab=_12aa.GetCurrentSequenceNumber("dummyparam!");
this.index=_12ab;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12af){
if(!MessageQueue._actions.hasEntries()){
var _12b4=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12b0=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12b4;
_12b0=false;
}
}
}
};
this._pokeserver=function(){
if(_12af==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12b5){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12b0);
this._updateMessages(_12b5);
}
};
this._updateMessages=function(_12b6){
if(_12b1){
_12b2=true;
}else{
_12b1=true;
var self=this;
var _12b8=function(_12b9){
if(_12b9!=null){
if(Types.isDefined(_12b9.CurrentSequenceNumber)){
var _12ba=_12b9.CurrentSequenceNumber;
if(_12ba<self.index){
_12a9.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12ba);
}
self.index=_12ba;
var _12bb=new List(_12b9.ConsoleActions);
if(_12bb.hasEntries()){
self.evaluate(_12bb);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_12a9.error("No sequencenumber in MessageQueue response!");
}
}
_12b1=false;
if(_12b2){
_12b2=false;
self._updateMessages();
}
};
if(_12b6){
_12b8(_12aa.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_12aa.GetMessages(Application.CONSOLE_ID,this.index,_12b8);
}
}
};
this.evaluate=function(_12bc){
var _12bd=new List();
if(_12bc.hasEntries()){
_12bc.each(function(_12be){
if(this._index[_12be.Id]!=true){
_12bd.add(_12be);
}
this._index[_12be.Id]=true;
},this);
if(_12bd.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12bd);
}else{
this._actions=_12bd;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12bf){
var _12c0="(No reason)";
if(_12bf!=null){
_12c0=_12bf.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12c0);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12c4){
if(_12c4==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12c5=null;
if(this._actions.hasEntries()){
var _12c6=this._actions.extractFirst();
_12ab=_12c6.SequenceNumber;
_12a9.debug("MessageQueue action: "+_12c6.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_12ab+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12c6.ActionType){
case "OpenView":
_12c5=_12c6.OpenViewParams;
if(_12c5.ViewType=="ModalDialog"){
openDialogView(_12c5);
}else{
_12ac=_12c5.ViewId;
openView(_12c5);
}
break;
case "CloseView":
_12c5=_12c6.CloseViewParams;
_12ac=_12c5.ViewId;
closeView(_12c5);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12c6.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12ad.countEntries()+"\n";
_12ad.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_12a9.debug(debug);
if(!_12ad.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12c9=_12c6.SelectElementParams.PerspectiveElementKey;
if(_12c9){
var _12ca={handleBroadcast:function(_12cb,arg){
switch(_12cb){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12c9){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12c6.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12ca);
StageBinding.selectPerspective(_12c6.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12c6.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12c6.MessageBoxParams);
break;
case "OpenViewDefinition":
_12c5=_12c6.OpenViewDefinitionParams;
_12ac=_12c5.Handle;
openViewDefinition(_12c5);
break;
case "LogEntry":
logEntry(_12c6.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12c5=_12c6.BroadcastMessageParams;
_12a9.debug("Server says: EventBroadcaster.broadcast ( \""+_12c5.Name+"\", "+_12c5.Value+" )");
EventBroadcaster.broadcast(_12c5.Name,_12c5.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12ad.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12c6.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12c6.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12c6.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12c5=_12c6.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12c5.ViewId,entityToken:_12c5.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12c5=_12c6.OpenGenericViewParams;
openGenericView(_12c5);
break;
case "OpenExternalView":
_12c5=_12c6.OpenExternalViewParams;
openExternalView(_12c5);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12c6.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12b0);
}
function logEntry(_12cd){
var _12ce=_12cd.Level.toLowerCase();
SystemLogger.getLogger(_12cd.SenderId)[_12ce](_12cd.Message);
}
function openView(_12cf){
var list=paramsToList(_12cf.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12cf.ViewId);
def.entityToken=_12cf.EntityToken;
def.flowHandle=_12cf.FlowHandle;
def.position=_12b3[_12cf.ViewType],def.label=_12cf.Label;
def.image=_12cf.Image;
def.toolTip=_12cf.ToolTip;
def.argument={"url":_12cf.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12cf.ViewId,entityToken:_12cf.EntityToken,flowHandle:_12cf.FlowHandle,position:_12b3[_12cf.ViewType],url:_12cf.Url,label:_12cf.Label,image:_12cf.Image,toolTip:_12cf.ToolTip}));
}
}
function openDialogView(_12d2){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12d2.ViewId,flowHandle:_12d2.FlowHandle,position:Dialog.MODAL,url:_12d2.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12d3){
var _12d4=_12d3.DialogType.toLowerCase();
if(_12d4=="question"){
throw "Not supported!";
}else{
Dialog[_12d4](_12d3.Title,_12d3.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12d5){
var map={};
var _12d7=false;
new List(_12d5.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12d7=true;
});
var proto=ViewDefinitions[_12d5.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12d5.ViewId;
}
def.argument=_12d7?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12dc){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12dc.ViewId);
def.label=_12dc.Label;
def.toolTip=_12dc.ToolTip;
def.image=_12dc.Image;
def.argument={"url":_12dc.Url,"list":paramsToList(_12dc.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12de){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12de.ViewId);
def.label=_12de.Label;
def.toolTip=_12de.ToolTip;
def.image=_12de.Image;
def.url=_12de.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12e0){
if(StageBinding.isViewOpen(_12e0.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12e0.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12e1){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12e1.ViewId,isSuccess:_12e1.Succeeded});
}
this._lockSystem=function(_12e2){
var _12e3=top.bindingMap.offlinetheatre;
if(_12e2){
_12e3.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12e3.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12af=_12e2;
};
this.placeConsoleCommand=function(_12e5){
_12aa.PlaceConsoleCommand(Application.CONSOLE_ID,_12e5);
};
this.handleBroadcast=function(_12e6,arg){
switch(_12e6){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12ac!=null&&arg==_12ac){
_12ac=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12ad.set(arg,true);
}else{
_12a9.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12ad.hasEntries()){
_12ad.del(arg);
_12a9.debug("Refreshed tree: "+arg+"\n("+_12ad.countEntries()+" trees left!)");
if(!_12ad.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12ae.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12ae.hasEntries()==true){
_12ae.del(arg);
if(!_12ae.hasEntries()){
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
function paramsToList(_12e8){
var list=new List();
new List(_12e8).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12eb=false;
var _12ec=null;
var _12ed=false;
var _12ee=Client.qualifies();
var _12ef="admin";
var _12f0="123456";
if(!_12ee){
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
function onload(){
var xhr=this,x=document.createElement("x"),s=xhr.s;
x.innerHTML=xhr.responseText;
var uses=x.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _12f9=x.querySelector("#"+hash);
if(_12f9){
var clone=_12f9.cloneNode(true);
clone.id=def.id;
def.parentNode.replaceChild(clone,def);
}
}
KickStart.sprites=x;
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);
setTimeout(function(){
Persistance.initialize();
},0);
}
var xhr=new XMLHttpRequest();
if(!xhr.s){
xhr.s=[];
xhr.open("GET",Resolver.resolve("${root}/images/sprite.svg"));
xhr.onload=onload;
xhr.send();
}
};
this.handleBroadcast=function(_12fc){
switch(_12fc){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12fc);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12fd=bindingMap.decks.getSelectedDeckBinding();
if(_12fd!=null){
switch(_12fd.getID()){
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
var _12fe=window.bindingMap.appwindow;
_12fe.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12ff=window.location.hash.replace(/^#/,"");
if(_12ff){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12ff);
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
function fileEventBroadcasterSubscriptions(_1300){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1301){
if(_1300){
EventBroadcaster.subscribe(_1301,KickStart);
}else{
EventBroadcaster.unsubscribe(_1301,KickStart);
}
});
}
function kickStart(_1302){
switch(_1302){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12eb=true;
break;
}
if(_12eb){
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
DataManager.getDataBinding("username").setValue(_12ef);
DataManager.getDataBinding("password").setValue(_12f0);
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
var _1305=DataManager.getDataBinding("username").getResult();
var _1306=DataManager.getDataBinding("passwordold").getResult();
var _1307=DataManager.getDataBinding("passwordnew").getResult();
var _1308=DataManager.getDataBinding("passwordnew2").getResult();
if(_1307==_1308){
var _1309=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _130a=LoginService.ChangePassword(_1305,_1306,_1307);
if(_130a instanceof SOAPFault){
alert(_130a.getFaultString());
}else{
if(_130a.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_130a);
}
}
WebServiceProxy.isFaultHandler=true;
if(_1309){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_130b){
_130b=new List(_130b);
var _130c=document.getElementById("passworderror");
_130c.innerHTML="";
_130b.each(function(error){
var _130e=document.createElement("div");
_130e.textContent=error;
_130e.className="errortext";
_130c.appendChild(_130e);
});
_130c.style.display="block";
var _130f={handleAction:function(_1310){
document.getElementById("passworderror").style.display="none";
_1310.target.removeActionListener(Binding.ACTION_DIRTY,_130f);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_130f);
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
this.doLogin=function(_1311,_1312){
var _1313=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1314=false;
var _1315=false;
var _1316=LoginService.ValidateAndLogin(_1311,_1312);
if(_1316 instanceof SOAPFault){
alert(_1316.getFaultString());
}else{
if(_1316=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_1316=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_1316=="passwordUpdateRequired"){
_1315=true;
}
if(_1316=="success"){
_1314=true;
}
}
if(_1315){
changePasswordRequired();
}else{
if(_1314){
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
if(_1313){
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
var _1317=document.getElementById("passwordexpired");
_1317.firstChild.data=_1317.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1318=DataManager.getDataBinding("username");
var _1319=DataManager.getDataBinding("password");
_1318.blur();
_1319.blur();
_1318.setValue("");
_1319.setValue("");
_1318.clean();
_1319.clean();
_1318.focus();
document.getElementById("loginerror").style.display="block";
var _131a={handleAction:function(_131b){
document.getElementById("loginerror").style.display="none";
_131b.target.removeActionListener(Binding.ACTION_DIRTY,_131a);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_131a);
}
WindowManager.fireOnLoad(this);
if(!_12ee){
UpdateManager.isEnabled=false;
}
};

