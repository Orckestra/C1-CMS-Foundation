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
LabelBinding.SPRITE_PATH="${root}/images/sprite.svg";
LabelBinding.EXPLORER_IMAGE_FILTER="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${url}',sizingMethod='crop');";
LabelBinding.CLASSNAME_GRAYTEXT="graytext";
LabelBinding.CLASSNAME_FLIPPED="flipped";
LabelBinding.sprites=null;
LabelBinding.spritesQueue=new Map();
LabelBinding.spriteLoading=false;
LabelBinding.spriteLoad=function(){
function onspriteload(){
var _630=this,_631=document.createElement("x");
_631.innerHTML=_630.responseText;
var uses=_631.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _637=_631.querySelector("#"+hash);
if(_637){
var _638=_637.cloneNode(true);
_638.id=def.id;
def.parentNode.replaceChild(_638,def);
}
}
LabelBinding.sprites=_631;
LabelBinding.spriteLoading=false;
LabelBinding.spritesQueue.each(function(key,_63a){
var _63b=UserInterface.getBindingByKey(key);
if(_63b!=null){
LabelBinding.setImageSvg(_63b,_63a);
}
});
LabelBinding.spritesQueue.empty();
}
if(!LabelBinding.spriteLoading){
LabelBinding.spriteLoading=true;
var _63c=new XMLHttpRequest();
_63c.open("GET",Resolver.resolve(LabelBinding.SPRITE_PATH));
_63c.onload=onspriteload;
_63c.send();
}
};
LabelBinding.setImageSvg=function(_63d,_63e){
if(_63d.shadowTree.labelBody){
if(!_63e){
if(_63d.shadowTree.svg){
if(_63d.shadowTree.svg.parentNode){
_63d.shadowTree.svg.parentNode.removeChild(_63d.shadowTree.svg);
}
_63d.shadowTree.svg=null;
}
}else{
if(LabelBinding.sprites){
var _63f="http://www.w3.org/2000/svg";
if(!_63d.shadowTree.svg){
_63d.shadowTree.svg=_63d.bindingDocument.createElementNS(_63f,"svg");
_63d.shadowTree.labelBody.insertBefore(_63d.shadowTree.svg,_63d.shadowTree.labelBody.firstChild);
}
_63d.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
var g=LabelBinding.sprites.querySelector("#"+_63e);
if(g){
var _641=g.getAttribute("viewBox"),_642=document.createDocumentFragment(),_643=g.cloneNode(true);
if(_641){
_63d.shadowTree.svg.setAttribute("viewBox",_641);
}
_642.appendChild(_643);
_63d.shadowTree.svg.innerHTML="";
_63d.shadowTree.svg.appendChild(_642);
}
}else{
LabelBinding.spritesQueue.set(_63d.getID(),_63e);
LabelBinding.spriteLoad();
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
var _644=this._getBuildElement("labeltext");
if(_644){
this.shadowTree.labelText=_644;
this.shadowTree.text=_644.firstChild;
this.hasLabel=true;
}
}else{
var _645=this.getProperty("label");
var _646=this.getProperty("image");
var _647=this.getProperty("tooltip");
if(_645){
this.setLabel(_645,false);
}
if(_646){
this.setImage(_646,false);
}
if(_647){
this.setToolTip(_647);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_648,_649){
_648=_648!=null?_648:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_648);
this.setProperty("label",_648);
if(!_649){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_64b){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _64c=Resolver.resolve(url);
if(_64c.svg){
this.setImageSvg(_64c.svg);
this.setAlphaTransparentBackdrop(false);
this.setImageClasses();
}else{
if(_64c.classes){
this.setImageSvg();
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_64c.classes);
}else{
this.setImageSvg();
this.setImageClasses();
this.setAlphaTransparentBackdrop(_64c);
}
}
this.hasImage=true;
if(!_64b){
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
LabelBinding.prototype.setImageClasses=function(_64d){
if(this.shadowTree.labelBody){
if(!_64d){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_64d;
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
LabelBinding.prototype.setToolTip=function(_651){
this.setProperty("tooltip",_651);
if(_651!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_651));
}
};
LabelBinding.prototype.getToolTip=function(_652){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_653){
_653=_653==null?true:_653;
var _654=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_653;
if(_653){
this.attachClassName(_654);
}else{
this.detachClassName(_654);
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
var _655="textonly";
var _656="imageonly";
var _657="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_655);
this.detachClassName(_656);
this.attachClassName(_657);
}else{
if(this.hasLabel){
this.detachClassName(_657);
this.detachClassName(_656);
this.attachClassName(_655);
}else{
if(this.hasImage){
this.detachClassName(_657);
this.detachClassName(_655);
this.attachClassName(_656);
}
}
}
};
LabelBinding.newInstance=function(_658){
var _659=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_658);
return UserInterface.registerBinding(_659,LabelBinding);
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
var _65a=this.getProperty("label");
if(!_65a){
_65a=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_65a));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_65c){
this.setProperty("label",_65c);
};
TextBinding.newInstance=function(_65d){
var _65e=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_65d);
return UserInterface.registerBinding(_65e,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_65f,_660){
BroadcasterBinding.superclass.setProperty.call(this,_65f,_660);
function update(list){
if(list){
list.each(function(_662){
_662.setProperty(_65f,_660);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _663=this._observers[_65f];
if(_663){
update(_663);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_664){
BroadcasterBinding.superclass.deleteProperty.call(this,_664);
function update(list){
if(list){
list.each(function(_666){
_666.deleteProperty(_664);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _667=this._observers[_664];
if(_667){
update(_667);
}
};
BroadcasterBinding.prototype.addObserver=function(_668,_669){
_669=_669?_669:"*";
_669=new List(_669.split(" "));
while(_669.hasNext()){
var _66a=_669.getNext();
switch(_66a){
case "*":
this._setAllProperties(_668);
break;
default:
var _66b=this.getProperty(_66a);
_668.setProperty(_66a,_66b);
break;
}
if(!this._observers[_66a]){
this._observers[_66a]=new List();
}
this._observers[_66a].add(_668);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_66c){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _66f=att.nodeName;
switch(_66f){
case "id":
case "key":
break;
default:
var _670=this.getProperty(_66f);
_66c.setProperty(_66f,_670);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_671,_672){
_672=_672?_672:"*";
_672=new List(_672.split(" "));
while(_672.hasNext()){
var list=this._observers[_672.getNext()];
if(list){
while(list.hasNext()){
var _674=list.getNext();
if(_674==_671){
list.del(_674);
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
BroadcasterBinding.prototype.setDisabled=function(_675){
this.setProperty("isdisabled",_675);
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
var _677=this.getProperty("width");
var _678=this.getProperty("label");
var type=this.getProperty("type");
var _67a=this.getProperty("popup");
var _67b=this.getProperty("tooltip");
var _67c=this.getProperty("isdisabled");
var _67d=this.getProperty("response");
var _67e=this.getProperty("oncommand");
var _67f=this.getProperty("value");
var _680=this.getProperty("ischecked");
var _681=this.getProperty("callbackid");
var _682=this.getProperty("focusable");
var _683=this.getProperty("focused");
var _684=this.getProperty("default");
var url=this.getProperty("url");
var _686=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_686){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_678!=null){
this.setLabel(_678);
}
if(type!=null){
this.setType(type);
}
if(_67b!=null){
this.setToolTip(_67b);
}
if(_677!=null){
this.setWidth(_677);
}
if(_67a!=null){
this.setPopup(_67a);
}
if(_67d!=null){
this.response=_67d;
}
if(_680==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_67e!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_67e,this);
};
}
if(_682||this.isFocusable){
this._makeFocusable();
if(_684||this.isDefault){
this.isDefault=true;
}
if(_683){
this.focus();
}
}
if(_67c==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_681!=null){
this.bindingWindow.DataManager.registerDataBinding(_681,this);
if(_67f!=null){
Binding.dotnetify(this,_67f);
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
ButtonBinding.prototype.setImage=function(_687){
if(this.isAttached){
this.labelBinding.setImage(_687);
}
this.setProperty("image",_687);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_688){
if(this.isAttached){
this.labelBinding.setLabel(_688);
}
this.setProperty("label",_688);
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
ButtonBinding.prototype.setToolTip=function(_68a){
this.setProperty("tooltip",_68a);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_68a));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_68b){
this.imageProfile=new _68b(this);
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
ButtonBinding.prototype.flip=function(_690){
_690=_690==null?true:_690;
this.isFlipped=_690;
this.setProperty("flip",_690);
if(this.isAttached){
this.labelBinding.flip(_690);
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
ButtonBinding.prototype.check=function(_691){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_691==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_692){
this.isActive=true;
this.isChecked=true;
if(!_692){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_693){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_693==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_694){
this.isActive=false;
this.isChecked=false;
if(!_694){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_695,_696){
if(_695==null){
_695==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_695){
case true:
this.check(_696);
break;
case false:
this.uncheck(_696);
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
var _698=this.getProperty("tooltip");
if(_698){
this.setToolTip(_698);
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
var _699=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_699=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _699;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _69b=this.getEqualSizeWidth();
if(goal>_69b){
var diff=goal-_69b;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _69e=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_69f){
if(_69f>=0){
this.bindingElement.style.width=new String(_69f+"px");
}
this.setProperty("width",_69f);
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
ButtonBinding.prototype.setValue=function(_6a0){
this.shadowTree.dotnetinput.value=_6a0;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_6a1){
this.setValue(_6a1);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_6a2){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_6a2;
this.imageProfile=_6a2.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_6a3){
var _6a4=_6a3?"addEventListener":"removeEventListener";
this.binding[_6a4](DOMEvents.MOUSEENTER,this);
this.binding[_6a4](DOMEvents.MOUSELEAVE,this);
this.binding[_6a4](DOMEvents.MOUSEDOWN,this);
this.binding[_6a4](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _6a6=false,_6a7=false,_6a8=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_6a8=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_6a8=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_6a8=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_6a8=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_6a8==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_6a6=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_6a8=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_6a8=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_6a8=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_6a8=ButtonStateManager.STATE_NORMAL;
var _6a9=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_6a9 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_6a8=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_6a8==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_6a7=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_6a8=ButtonStateManager.STATE_NORMAL;
_6a6=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_6a8=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_6a8=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_6a8=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_6a8=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_6a8==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_6a6=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_6a8=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_6a8=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_6a8=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_6a8=ButtonStateManager.STATE_NORMAL;
_6a6=true;
break;
}
}
}
}
}
switch(_6a8){
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
if(_6a6){
this.binding.fireCommand();
}
if(_6a7){
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
var _6ad=this.imageProfile.getDisabledImage();
if(_6ad){
this.binding.setImage(_6ad);
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
ClickButtonBinding.newInstance=function(_6ae){
var _6af=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_6ae);
return UserInterface.registerBinding(_6af,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_6b0){
var _6b1=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_6b0);
return UserInterface.registerBinding(_6b1,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_6b2){
var _6b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_6b2);
return UserInterface.registerBinding(_6b3,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_6b4){
this._binding=_6b4;
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
var _6b5=this.getDescendantBindingsByLocalName("control");
_6b5.each(function(_6b6){
_6b6.setControlType(_6b6.controlType);
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
ControlGroupBinding.newInstance=function(_6b8){
var _6b9=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6b8);
return UserInterface.registerBinding(_6b9,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6bc){
ControlBinding.superclass.handleAction.call(this,_6bc);
switch(_6bc.type){
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
function ControlImageProfile(_6bd){
this.binding=_6bd;
}
ControlImageProfile.prototype._getImage=function(_6be){
var _6bf=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6bf=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6bf=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6bf=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6bf=this.constructor.IMAGE_CLOSE;
break;
}
return _6bf.replace("${string}",_6be);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6c0=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6c0=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6c0?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6c1){
ControlBoxBinding.superclass.handleAction.call(this,_6c1);
switch(_6c1.type){
case ControlBinding.ACTION_COMMAND:
var _6c2=_6c1.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6c2);
Application.unlock(self);
},0);
_6c1.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6c4){
switch(_6c4.controlType){
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
ControlBoxBinding.prototype.setState=function(_6c5){
var _6c6=this.getState();
this.setProperty("state",_6c5);
this.detachClassName(_6c6);
this.attachClassName(_6c5);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6c7=this.getProperty("state");
if(!_6c7){
_6c7=ControlBoxBinding.STATE_NORMAL;
}
return _6c7;
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
MenuContainerBinding.prototype.isOpen=function(_6c8){
var _6c9=null;
if(!_6c8){
_6c9=this._isOpen;
}else{
_6c9=(_6c8==this._openElement);
}
return _6c9;
};
MenuContainerBinding.prototype.setOpenElement=function(_6ca){
if(_6ca){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6ca;
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
var _6cb=this.getChildBindingByLocalName("menupopup");
if(_6cb&&_6cb!=this.menuPopupBinding){
this.menuPopupBinding=_6cb;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6cc=this.getMenuContainerBinding();
_6cc.setOpenElement(this);
var _6cd=this.getMenuPopupBinding();
_6cd.snapTo(this.bindingElement);
_6cd.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6ce){
MenuContainerBinding.superclass.handleAction.call(this,_6ce);
if(_6ce.type==PopupBinding.ACTION_HIDE){
var _6cf=this.getMenuContainerBinding();
_6cf.setOpenElement(false);
this.reset();
_6ce.consume();
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
MenuBarBinding.prototype.handleAction=function(_6d0){
MenuBarBinding.superclass.handleAction.call(this,_6d0);
switch(_6d0.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6d1=_6d0.target;
var _6d2=this.getChildBindingsByLocalName("menu");
while(_6d2.hasNext()){
var menu=_6d2.getNext();
}
switch(_6d1.arrowKey){
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
var _6d4=this.getProperty("image");
var _6d5=this.getProperty("label");
var _6d6=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6d5){
this.setLabel(_6d5);
}
if(_6d4){
this.setImage(_6d4);
}
if(_6d6){
this.setToolTip(_6d6);
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
MenuBinding.prototype.setLabel=function(_6d8){
this.setProperty("label",_6d8);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6d8));
}
};
MenuBinding.prototype.setToolTip=function(_6d9){
this.setProperty("tooltip",_6d9);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6d9));
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
var _6db=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6db.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6db.isOpen()&&!_6db.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6db.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6db.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6dc,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6dc){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6e1){
switch(_6e1.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6e2=null;
var _6e3=true;
self._lastFocused.focus();
self.grabKeyboard();
_6e1.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6e5){
for(var key in this._focused){
if(key!=_6e5.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6e5.key]=_6e5;
this._lastFocused=_6e5;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6e8){
delete this._focused[_6e8.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6e9){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6e9);
}
if(_6e9){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6ec=this.getChildBindingsByLocalName("menugroup");
var _6ed=null;
var _6ee=null;
while(_6ec.hasNext()){
var _6ef=_6ec.getNext();
if(!_6ef.isDefaultContent){
_6ef.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6ed&&_6ef.isVisible){
_6ed=_6ef;
}
if(_6ef.isVisible){
_6ee=_6ef;
}
}
}
if(_6ed&&_6ee){
_6ed.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6ee.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6f0){
MenuBodyBinding.activeInstance=this;
if(_6f0){
var _6f1=this._getMenuItems().getFirst();
if(_6f1){
_6f1.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6f2=this._lastFocused;
if((_6f2!=null)&&(!_6f2.isMenuContainer)){
_6f2.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6f4=this._getMenuItems();
var _6f5=null;
var next=null;
if(this._lastFocused){
_6f5=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6f4.getPreceding(_6f5);
break;
case KeyEventCodes.VK_DOWN:
next=_6f4.getFollowing(_6f5);
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
next=_6f4.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6f8=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6f9){
_6f8=_6f9.getChildBindingsByLocalName("menuitem");
_6f8.each(function(item){
list.add(item);
});
});
_6f8=this.getChildBindingsByLocalName("menuitem");
_6f8.each(function(item){
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
MenuBodyBinding.newInstance=function(_6fc){
var _6fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6fc);
return UserInterface.registerBinding(_6fd,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6fe){
switch(_6fe){
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
MenuGroupBinding.newInstance=function(_6ff){
var _700=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6ff);
return UserInterface.registerBinding(_700,MenuGroupBinding);
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
var _701=this.getProperty("image");
var _702=this.getProperty("image-hover");
var _703=this.getProperty("image-active");
var _704=this.getProperty("image-disabled");
if(!this.image&&_701){
this.image=_701;
}
if(!this.imageHover&&_702){
this.imageHover=_701;
}
if(!this.imageActive&&_703){
this.imageActive=_703;
}
if(!this.imageDisabled&&_704){
this.imageDisabled=_704;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _705=this.getProperty("label");
var _706=this.getProperty("tooltip");
var type=this.getProperty("type");
var _708=this.getProperty("isdisabled");
var _709=this.getProperty("image");
var _70a=this.getProperty("image-hover");
var _70b=this.getProperty("image-active");
var _70c=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _70d=this.getMenuPopupBinding();
if(_70d){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_709){
this.image=_709;
}
if(!this.imageHover&&_70a){
this.imageHover=_709;
}
if(!this.imageActive&&_70b){
this.imageActive=_70b;
}
if(!this.imageDisabled&&_70c){
this.imageDisabled=_70c;
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
if(_705!=null){
this.setLabel(_705);
}
if(_706){
this.setToolTip(_706);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_708==true){
this.disable();
}
var _70e=this.getProperty("oncommand");
if(_70e){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_70e);
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
MenuItemBinding.prototype.setLabel=function(_711){
this.setProperty("label",_711);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_711));
}
};
MenuItemBinding.prototype.setToolTip=function(_712){
this.setProperty("tooltip",_712);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_712));
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
var _714=this.bindingDocument.createElement("div");
_714.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_714.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _715=this.labelBinding.bindingElement;
_715.insertBefore(_714,_715.firstChild);
_714.style.display="none";
this.shadowTree.checkBoxIndicator=_714;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _714=this.bindingDocument.createElement("div");
_714.className=MenuItemBinding.CLASSNAME_SUBMENU;
_714.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _715=this.labelBinding.bindingElement;
_715.insertBefore(_714,_715.firstChild);
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
var _717=this.imageProfile.getDisabledImage();
if(_717){
this.setImage(_717);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _717=this.imageProfile.getDefaultImage();
if(_717){
this.setImage(_717);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _719=this.getMenuContainerBinding();
if(_719.isOpen()&&!_719.isOpen(this)){
_719._openElement.hide();
_719.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _719=this.getMenuContainerBinding();
if(!_719.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_71b){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _71c=this.getMenuContainerBinding();
if(!_71c||!_71c.isOpen(this)||_71b){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_71d){
this.setChecked(true,_71d);
};
MenuItemBinding.prototype.uncheck=function(_71e){
this.setChecked(false,_71e);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_71f,_720){
this.setProperty("ischecked",_71f);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_71f){
this.isChecked=_71f;
this.shadowTree.checkBoxIndicator.style.display=_71f?"block":"none";
if(!_720){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_721){
var _722=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_721);
UserInterface.registerBinding(_722,MenuItemBinding);
return UserInterface.getBinding(_722);
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
PopupSetBinding.newInstance=function(_723){
var _724=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_723);
return UserInterface.registerBinding(_724,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_725,arg){
switch(_725){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _729=PopupBinding.activeInstances.get(key);
var _72a=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_729);
if(!_72a){
list.add(_729);
}
});
list.each(function(_72b){
_72b.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _72d=PopupBinding.activeInstances.get(key);
_72d.hide();
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
var _72e=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _72f=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_72e){
this._bodyBinding=UserInterface.getBinding(_72e);
}else{
if(_72f){
this._bodyBinding=UserInterface.getBinding(_72f);
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
var _730=this.getProperty("position");
this.position=_730?_730:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_731){
var _732=null;
if(this._bodyBinding){
this._bodyBinding.add(_731);
_732=_731;
}else{
_732=PopupBinding.superclass.add.call(this,_731);
}
return _732;
};
PopupBinding.prototype.addFirst=function(_733){
var _734=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_733);
_734=_733;
}else{
_734=PopupBinding.superclass.addFirst.call(this,_733);
}
return _734;
};
PopupBinding.prototype.handleAction=function(_735){
PopupBinding.superclass.handleAction.call(this,_735);
var _736=_735.target;
switch(_735.type){
case Binding.ACTION_ATTACHED:
if(_736 instanceof MenuItemBinding){
this._count(true);
_735.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_736 instanceof MenuItemBinding){
this._count(false);
_735.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_737){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_737?1:-1);
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
PopupBinding.prototype.snapTo=function(_738){
var _739=this._getElementPosition(_738);
switch(this.position){
case PopupBinding.POSITION_TOP:
_739.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_739.x+=_738.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_739.y+=_738.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_739.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_738;
this.bindingElement.style.display="block";
this.setPosition(_739.x,_739.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_73b){
this.bindingElement.style.display="block";
this.setPosition(_73b.x,_73b.y);
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
PopupBinding.prototype._getElementPosition=function(_740){
return _740.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_740):DOMUtil.getUniversalPosition(_740);
};
PopupBinding.prototype._getMousePosition=function(e){
var _742=DOMEvents.getTarget(e);
return _742.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_743){
var _744=this.bindingElement;
if(_743){
_744.style.visibility="visible";
}else{
_744.style.visibility="hidden";
_744.style.display="none";
}
this.isVisible=_743;
};
PopupBinding.prototype._enableTab=function(_745){
var self=this;
var _747=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_747.each(function(_748){
_748.bindingElement.tabIndex=_745?0:-1;
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
var _750=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_750.y<0){
y=-_750.y;
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
PopupBinding.prototype.grabKeyboard=function(_752){
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
var _758=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_758=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _758;
};
PopupBinding.prototype.clear=function(){
var _759=this._bodyBinding;
if(_759){
_759.detachRecursive();
_759.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_75a){
var _75b=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_75a);
return UserInterface.registerBinding(_75b,PopupBinding);
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
PopupBodyBinding.newInstance=function(_75d){
var _75e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_75d);
return UserInterface.registerBinding(_75e,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_75f){
return new Point(_75f.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_760){
var _761=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_760);
return UserInterface.registerBinding(_761,MenuPopupBinding);
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
var _762=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_762){
this._body=UserInterface.getBinding(_762);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _763=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_763.hasNext()){
var _764=DialogBorderBinding.newInstance(this.bindingDocument);
_764.setType(_763.getNext());
this.add(_764);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _765=this.getProperty("controls");
if(_765){
var _766=new List(_765.split(" "));
while(_766.hasNext()){
var type=_766.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _768=DialogControlBinding.newInstance(this.bindingDocument);
_768.setControlType(type);
this._titlebar.addControl(_768);
this.controlBindings[type]=_768;
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
var _769=this.getProperty("image");
var _76a=this.getProperty("label");
var _76b=this.getProperty("draggable");
var _76c=this.getProperty("resizable");
var _76d=this.getProperty("modal");
if(_769){
this.setImage(_769);
}
if(_76a){
this.setLabel(_76a);
}
if(_76b==false){
this.isDialogDraggable=false;
}
if(_76c==false){
this.isPanelResizable=false;
}
if(_76d==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_76e){
this.isModal=_76e;
};
DialogBinding.prototype.setLabel=function(_76f){
this.setProperty("label",_76f);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_76f));
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
DialogBinding.prototype.handleAction=function(_771){
DialogBinding.superclass.handleAction.call(this,_771);
switch(_771.type){
case Binding.ACTION_DRAG:
var _772=_771.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_772.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_772.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_772;
_772.dragger.registerHandler(this);
}
break;
}
}
_771.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_771.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_773,arg){
DialogBinding.superclass.handleBroadcast.call(this,_773,arg);
switch(_773){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_775){
DialogBinding.superclass.handleInvokedControl.call(this,_775);
switch(_775.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_776){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_776){
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
var _778=self.bindingElement;
setTimeout(function(){
_778.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_779){
this.bindingElement.style.zIndex=new String(_779);
};
DialogBinding.prototype.onDragStart=function(_77a){
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
DialogBinding.prototype.setResizable=function(_78c){
if(this._isResizable!=_78c){
if(_78c){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_78c;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _78d=null;
var _78e=this.bindingDocument.body.offsetWidth;
var _78f=this.bindingDocument.body.offsetHeight;
_78d={x:0.125*_78e,y:0.125*_78f,w:0.75*_78e,h:0.5*_78f};
return _78d;
};
DialogBinding.prototype.centerOnScreen=function(){
var _790=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_790.w-dim.w),0.5*(_790.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _792=this;
var i=0;
function blink(){
if(i%2==0){
_792.detachClassName("active");
}else{
_792.attachClassName("active");
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
var _796="";
while(list.hasNext()){
var type=list.getNext();
_796+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_796);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_797){
var _798=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_797);
return UserInterface.registerBinding(_798,DialogBinding);
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
DialogHeadBinding.newInstance=function(_799){
var _79a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_799);
return UserInterface.registerBinding(_79a,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_79d){
var _79e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_79d);
return UserInterface.registerBinding(_79e,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_79f){
DialogSetBinding.superclass.handleAction.call(this,_79f);
var _7a0=_79f.target;
switch(_79f.type){
case Binding.ACTION_MOVETOTOP:
if(_7a0 instanceof DialogBinding){
this._moveToTop(_7a0);
}
break;
case Binding.ACTION_MOVEDONTOP:
_79f.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_7a1){
var _7a2=0;
var _7a3=this.getChildBindingsByLocalName("dialog");
_7a3.each(function(_7a4){
var _7a5=_7a4.getZIndex();
_7a2=_7a5>_7a2?_7a5:_7a2;
});
_7a1.setZIndex(_7a2+2);
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
DialogBorderBinding.newInstance=function(_7a7){
var _7a8=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_7a7);
return UserInterface.registerBinding(_7a8,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_7a9){
this._dialogBinding=_7a9;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_7ab){
DialogCoverBinding.superclass.handleAction.call(this,_7ab);
var _7ac=_7ab.target;
if(this._dialogBinding.isModal){
switch(_7ab.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_7ac==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_7ac.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_7ad,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_7ad,arg);
switch(_7ad){
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
var _7b0=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_7b0);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _7b1=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_7b1);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_7b2){
var _7b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_7b2);
return UserInterface.registerBinding(_7b3,DialogCoverBinding);
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
var _7b4=this.getProperty("image");
if(_7b4){
this.setImage(_7b4);
}
var _7b5=this.getProperty("label");
if(_7b5){
this.setLabel(_7b5);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_7b6){
if(this.isAttached){
this.labelBinding.setLabel(_7b6);
}
this.setProperty("label",_7b6);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_7b8){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_7b8);
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
DialogTitleBarBinding.newInstance=function(_7b9){
var _7ba=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_7b9);
return UserInterface.registerBinding(_7ba,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7bb){
var _7bc=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7bb);
return UserInterface.registerBinding(_7bc,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7bd){
var _7be=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7bd);
return UserInterface.registerBinding(_7be,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7bf){
this.binding=_7bf;
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
var _7c2=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7c3=node.nodeName.toLowerCase();
switch(_7c3){
case "script":
case "style":
case "textarea":
_7c2=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7c2;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7ca=true;
if(exp.test(text)){
self._textnodes.add(node);
_7ca=false;
}
return _7ca;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7cb,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7cb,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7cf=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7cf+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7d5){
var _7d6="";
var _7d7="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7d8="</span>";
var self=this;
function iterate(_7da){
var _7db=-1;
var _7dc=null;
self._map.each(function(key,exp){
var low=_7da.toLowerCase();
var _7e0=low.search(exp);
if(_7e0>-1){
if(_7db==-1){
_7db=_7e0;
}
if(_7e0<=_7db){
_7db=_7e0;
_7dc=key;
}
}
});
if(_7db>-1&&_7dc!=null){
var pre=_7da.substring(0,_7db);
var hit=_7da.substring(_7db,_7db+_7dc.length);
var pst=_7da.substring(_7db+_7dc.length,_7da.length);
_7d6+=pre+_7d7+hit+_7d8;
iterate(pst);
}else{
_7d6+=_7da;
}
}
iterate(_7d5);
return _7d6;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7e4){
var _7e5=new List(_7e4.getElementsByTagName("span"));
_7e5.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7e4.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7e8){
var _7e9=null;
if(_7e8.isAttached){
var doc=_7e8.getContentDocument();
if(doc!=null){
_7e9=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7e9,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7e9=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7e9 instanceof SOAPFault){
_7e9=null;
}
}
}
}
return _7e9;
};
WindowBinding.highlightKeywords=function(_7ed,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7ed.isAttached){
var doc=_7ed.getContentDocument();
if(doc!=null){
var _7f0=WindowBinding._highlightcrawler;
_7f0.reset(doc.body);
if(list!=null){
_7f0.setKeys(list);
_7f0.crawl(doc.body);
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
var _7f1=WindowBinding.superclass.serialize.call(this);
if(_7f1){
_7f1.url=this.getURL();
}
return _7f1;
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
var _7f3=this.getContentWindow().DocumentManager;
if(_7f3!=null){
_7f3.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7f4){
WindowBinding.superclass.handleAction.call(this,_7f4);
var _7f5=_7f4.target;
switch(_7f4.type){
case RootBinding.ACTION_PHASE_3:
if(_7f5.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7f5);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7f4.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7f6){
if(!this.isFit||_7f6){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7f7){
if(this._pageBinding==null){
if(_7f7.bindingWindow==this.getContentWindow()){
this._pageBinding=_7f7;
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
WindowBinding.prototype._registerOnloadListener=function(_7f8){
var _7f9=this.shadowTree.iframe;
var _7fa=_7f8?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7fd=true;
if(Client.isExplorer){
_7fd=_7f9.readyState=="complete";
}
if(_7fd==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7fa](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7fe){
var _7ff=_7fe?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7ff](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _804=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_804.getQueryString().each(function(name,_806){
if(_806.length>512){
data.set(name,_806);
_804.setParam(name,null);
}
});
url=_804.toString();
}
if(data){
var self=this;
var _808=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_808.id;
form.setAttribute("target",_808.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_80b){
var _80c=self.bindingDocument.createElement("input");
_80c.name=name;
_80c.value=_80b;
_80c.type="hidden";
form.appendChild(_80c);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _80d=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_80d=url;
}
return _80d;
};
WindowBinding.prototype.reload=function(_80f){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _810=null;
if(this.shadowTree.iframe!=null){
_810=this.shadowTree.iframe;
}
return _810;
};
WindowBinding.prototype.getContentWindow=function(){
var _811=null,_812=this.getFrameElement();
if(_812!==null){
try{
_811=_812.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _811;
};
WindowBinding.prototype.getContentDocument=function(){
var _813=null,win=this.getContentWindow();
if(win){
_813=win.document;
}
return _813;
};
WindowBinding.prototype.getRootBinding=function(){
var _815=null,doc=this.getContentDocument();
if(doc&&doc.body){
_815=UserInterface.getBinding(doc.body);
}
return _815;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_817){
this.bindingElement.style.height=_817+"px";
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
WindowBinding.prototype.handleCrawler=function(_818){
WindowBinding.superclass.handleCrawler.call(this,_818);
if(_818.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_818.nextNode=root.bindingElement;
}else{
_818.response=NodeCrawler.SKIP_CHILDREN;
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
var _81d=this.getContentWindow();
if(_81d!=null&&_81d.document!=null&&_81d.document.body!=null){
if(this.bindingElement.offsetHeight){
_81d.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_81d.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_81e){
var _81f=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_81e);
var _820=UserInterface.registerBinding(_81f,WindowBinding);
return _820;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_824){
_824.target.show();
_824.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_826){
_826.target.show();
_826.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_828){
PreviewWindowBinding.superclass.handleAction.call(this,_828);
switch(_828.type){
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
var _829=null;
this._getRadioButtonBindings().each(function(_82a){
if(_82a.getProperty("ischecked")){
_829=_82a;
return false;
}else{
return true;
}
});
if(_829){
this._checkedRadioBinding=_829;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_82b){
RadioGroupBinding.superclass.handleAction.call(this,_82b);
var _82c=_82b.target;
switch(_82b.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_82b.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_82c.isRadioButton&&!_82c.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_82c);
}
this._checkedRadioBinding=_82c;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_82b.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_82d,_82e){
if(_82d instanceof RadioDataBinding){
_82d=_82d.getButton();
}
if(_82d.isRadioButton){
switch(_82e){
case true:
this._unCheckRadioBindingsExcept(_82d);
this._checkedRadioBinding=_82d;
_82d.check(true);
break;
default:
_82d.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_82f){
var _830=this._getRadioButtonBindings();
_830.each(function(_831){
if(_831.isChecked&&_831!=_82f){
_831.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _832=new Crawler();
var list=new List();
_832.addFilter(function(_834){
var _835=true;
var _836=UserInterface.getBinding(_834);
if(_836 instanceof RadioGroupBinding){
_835=NodeCrawler.SKIP_CHILDREN;
}else{
if(_836 instanceof ButtonBinding&&_836.isRadioButton){
list.add(_836);
}
}
return _835;
});
_832.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_837){
var _838=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_837);
return UserInterface.registerBinding(_838,RadioGroupBinding);
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
var _83a=this.getProperty("regexrule");
if(_83a!=null){
this.expression=new RegExp(_83a);
}
var _83b=this.getProperty("onbindingblur");
if(_83b!=null){
this.onblur=function(){
Binding.evaluate(_83b,this);
};
}
var _83c=this.getProperty("onvaluechange");
if(_83c!=null){
this.onValueChange=function(){
Binding.evaluate(_83c,this);
};
}
if(this.error==null&&this.type!=null){
var _83d=DataBinding.errors[this.type];
if(_83d!=null){
this.error=_83d;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _83e=this.getProperty("value");
if(_83e!=null){
this.setValue(String(_83e));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _840=this.getProperty("isdisabled");
if(_840==true){
this.setDisabled(true);
}
var _841=this.getProperty("readonly");
if(_841==true){
this.setReadOnly(true);
}
var _842=this.getProperty("autoselect");
if(_842==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _843=this.getProperty("placeholder");
if(_843){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_843));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _844=Localization.currentLang();
if(_844!=null){
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
var _845=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_845.type=this.isPassword==true?"password":"text";
_845.tabIndex=-1;
return _845;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_848){
if(_848){
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
DataInputBinding.prototype.focus=function(_84a){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_84a){
var self=this,_84c=this.bindingElement,_84d={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_84c,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_84c,DOMEvents.MOUSEUP,_84d);
}else{
this.select();
}
}
this.onfocus();
if(!_84a){
var _84e=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_84e);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _84f=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _850=_84f.createTextRange();
_850.moveStart("character",0);
_850.moveEnd("character",_84f.value.length);
_850.select();
}else{
_84f.setSelectionRange(0,_84f.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_851){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_851){
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
DataInputBinding.prototype.validate=function(_855){
if(_855==true||this._isValid){
var _856=this.isValid();
if(_856!=this._isValid){
this._isValid=_856;
if(!_856){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _857=null;
if(this._isInvalidBecauseRequired==true){
_857=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_857=DataBinding.warnings["minlength"];
_857=_857.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_857=DataBinding.warnings["maxlength"];
_857=_857.replace("${count}",String(this.maxlength));
}else{
_857=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_857!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_857);
}
}else{
this.setValue(_857);
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
var _858=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _859=this.getValue();
if(_859==""){
if(this.isRequired==true){
_858=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _85a=DataBinding.expressions[this.type];
if(!_85a.test(_859)){
_858=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_859)){
_858=false;
}
}
}
}
if(_858&&this.minlength!=null){
if(_859.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_858=false;
}
}
if(_858&&this.maxlength!=null){
if(_859.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_858=false;
}
}
return _858;
};
DataInputBinding.prototype.setDisabled=function(_85b){
if(_85b!=this.isDisabled){
if(_85b){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _85c=this.shadowTree.input;
if(_85b){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_85c,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_85c,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_85b;
this.shadowTree.input.unselectable=_85b?"on":"off";
}
this.isDisabled=_85b;
this.isFocusable=!_85b;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_85e){
if(_85e!=this.isReadOnly){
if(_85e){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_85e;
this.isReadOnly=_85e;
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
DataInputBinding.prototype.handleElement=function(_85f){
return true;
};
DataInputBinding.prototype.updateElement=function(_860){
var _861=_860.getAttribute("value");
var _862=_860.getAttribute("type");
var _863=_860.getAttribute("maxlength");
var _864=_860.getAttribute("minlength");
var _865=_860.getAttribute("required")==="true";
if(_861==null){
_861="";
}
var _866=this.bindingWindow.UpdateManager;
if(this.getValue()!=_861){
_866.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_861);
}
if(this.type!=_862){
_866.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_862;
}
if(this.maxlength!=_863){
_866.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_863;
}
if(this.minlength!=_864){
_866.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_864;
}
if(this.isRequired!=_865){
_866.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_865;
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
DataInputBinding.prototype.setValue=function(_867){
if(_867===null){
_867="";
}
if(_867!=this.getValue()){
this.setProperty("value",_867);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_867);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _868=null;
if(this.shadowTree.input!=null){
_868=this.shadowTree.input.value;
}else{
_868=this.getProperty("value");
}
return _868;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _86a=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_86a=Number(_86a);
break;
}
return _86a;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_86b){
var _86c=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_86b);
return UserInterface.registerBinding(_86c,DataInputBinding);
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
var _86d=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_86d!=null){
this.setValue(_86d.value);
_86d.parentNode.removeChild(_86d);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _86e;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_86e=div.firstChild;
}else{
_86e=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_86e.tabIndex=-1;
return _86e;
};
TextBoxBinding.prototype.handleElement=function(_870){
return true;
};
TextBoxBinding.prototype.updateElement=function(_871){
var _872,area=_871.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_872=DOMUtil.getTextContent(area);
}
if(_872==null){
_872="";
}
var _874=this.bindingWindow.UpdateManager;
if(this.getValue()!=_872){
_874.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_872);
}
var _875=_871.getAttribute("type");
if(this.type!=_875){
_874.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_875;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_879){
var _87a=this.bindingDocument.selection.createRange();
var _87b=_87a.text=="";
if(_87b&&!_879){
_87a.text="\t";
}else{
var text="";
var _87d=_87a.text.length;
while((_87a.moveStart("word",-1)&&_87a.text.charAt(1)!="\n")){
}
_87a.moveStart("character",1);
var _87e=0;
var i=0,line,_881=_87a.text.split("\n");
while((line=_881[i++])!=null){
if(_879){
line=line.replace(/^(\s)/mg,"");
_87e++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_881[i+1]?"\n":"");
}
_87a.text=text;
_87a.moveStart("character",-_87d);
if(_879){
_87a.moveStart("character",2*_881.length-2);
}
_87a.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _882=this.bindingDocument.selection.createRange();
var _883=_882.duplicate();
while((_883.moveStart("word",-1)&&_883.text.indexOf("\n")==-1)){
}
_883.moveStart("character",1);
_882.text="\n"+_883.text.match(/^(\s)*/)[0]+"!";
_882.moveStart("character",-1);
_882.select();
_882.text="";
_882.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_884){
var _885;
var _886;
var oss;
var osy;
var i;
var fnd;
var _88b=this._getSelectedText();
var el=this.shadowTree.input;
_885=el.scrollLeft;
_886=el.scrollTop;
if(!_88b.match(/\n/)){
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
_88b=this._getSelectedText();
if(_884){
ntext=_88b.replace(/^(\s)/mg,"");
}else{
ntext=_88b.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_88b.length);
}
el.scrollLeft=_885;
el.scrollTop=_886;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _88d;
var _88e;
var oss;
var osy;
var el=this.shadowTree.input;
_88d=el.scrollLeft;
_88e=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_88d;
el.scrollTop=_88e;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _895=this.shadowTree.input.value;
var _896=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _895.substr(_896,end-_896);
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
var _898=this.getProperty("isdisabled");
if(this.isDisabled||_898){
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
var _89a=this.getProperty("label");
var _89b=this.getProperty("value");
var _89c=this.getProperty("width");
var _89d=this.getProperty("onchange");
var _89e=this.getProperty("required")==true;
var _89f=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_89a!=null){
this.label=_89a;
}
if(!this.value&&_89b!=null){
this.value=_89b;
}
if(!this.width&&_89c){
this.width=_89c;
}
if(_89e){
this.isRequired=true;
}
if(_89f){
this._isLocal=true;
}
if(_89d){
this.onValueChange=function(){
Binding.evaluate(_89d,this);
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
var _8a0=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_8a0.name=this.getName();
_8a0.value=this.getValue();
_8a0.type="hidden";
if(this.hasCallBackID()){
_8a0.id=this.getCallBackID();
}
this.shadowTree.input=_8a0;
this.bindingElement.appendChild(_8a0);
};
SelectorBinding.prototype.buildButton=function(){
var _8a1=this.BUTTON_IMPLEMENTATION;
var _8a2=this.add(_8a1.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_8a2.imageProfile=this.imageProfile;
}
if(this.width!=null){
_8a2.setWidth(this.width);
}
this._buttonBinding=_8a2;
this.shadowTree.button=_8a2;
_8a2.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _8a3;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _8a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_8a4.id="selectorpopupset";
_8a3=UserInterface.registerBinding(_8a4,PopupSetBinding);
this.bindingDocument.body.appendChild(_8a3.bindingElement);
}else{
_8a3=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_8a3=top.app.bindingMap.selectorpopupset;
}
var doc=_8a3.bindingDocument;
var _8a6=_8a3.add(PopupBinding.newInstance(doc));
var _8a7=_8a6.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_8a6;
this._menuBodyBinding=_8a7;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_8a6.attachClassName("selectorpopup");
_8a6.addActionListener(PopupBinding.ACTION_SHOW,this);
_8a6.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_8a6.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_8a6);
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
var _8aa=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8aa).each(function(_8ab){
var _8ac=_8ab.getAttribute("label");
var _8ad=_8ab.getAttribute("value");
var _8ae=_8ab.getAttribute("selected");
var _8af=_8ab.getAttribute("image");
var _8b0=_8ab.getAttribute("image-hover");
var _8b1=_8ab.getAttribute("image-active");
var _8b2=_8ab.getAttribute("image-disabled");
var _8b3=null;
if(_8af||_8b0||_8b1||_8b2){
_8b3=new ImageProfile({image:_8af,imageHover:_8b0,imageActive:_8b1,imageDisabled:_8b2});
}
list.add(new SelectorBindingSelection(_8ac?_8ac:null,_8ad?_8ad:null,_8ae&&_8ae=="true",_8b3));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _8b5=null;
while(list.hasNext()){
var _8b6=list.getNext();
var item=this.addSelection(_8b6);
if(_8b6.isSelected){
this.select(item,true);
}
if(!_8b5){
_8b5=item;
}
}
if(!this._selectedItemBinding){
this.select(_8b5,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8b8,_8b9){
var _8ba=this.MENUITEM_IMPLEMENTATION;
var _8bb=this._menuBodyBinding;
var _8bc=_8bb.bindingDocument;
var _8bd=_8ba.newInstance(_8bc);
_8bd.imageProfile=_8b8.imageProfile;
_8bd.setLabel(_8b8.label);
if(_8b8.tooltip!=null){
_8bd.setToolTip(_8b8.tooltip);
}
_8bd.selectionValue=_8b8.value;
_8b8.menuItemBinding=_8bd;
if(_8b9){
_8bb.addFirst(_8bd);
this.selections.addFirst(_8b8);
}else{
_8bb.add(_8bd);
this.selections.add(_8b8);
}
this._isUpToDate=false;
return _8bd;
};
SelectorBinding.prototype.addSelectionFirst=function(_8be){
return this.addSelection(_8be,true);
};
SelectorBinding.prototype.clear=function(_8bf){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8bf&&this.defaultSelection!=null){
var _8c0=this.addSelection(this.defaultSelection);
this.select(_8c0,true);
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
SelectorBinding.prototype.setDisabled=function(_8c1){
if(this.isAttached==true){
var _8c2=this._buttonBinding;
_8c2.setDisabled(_8c1);
}
if(_8c1){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8c3){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8c3);
}
};
SelectorBinding.prototype.handleAction=function(_8c4){
SelectorBinding.superclass.handleAction.call(this,_8c4);
switch(_8c4.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8c4.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8c4.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8c4.target);
_8c4.consume();
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
_8c4.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8c6){
this.select(_8c6);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8c7=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8c8=this._popupBinding.bindingElement;
_8c8.style.minWidth=_8c7;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ca=Client.isExplorer?e.keyCode:e.which;
if(_8ca==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ca=Client.isExplorer?e.keyCode:e.which;
if(_8ca>=32){
this._buttonBinding.check();
var _8cb=String.fromCharCode(_8ca);
this._pushSearchSelection(_8cb);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8cc){
this._searchString+=_8cc.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8cd){
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
var _8ce=this._menuBodyBinding;
if(_8ce!=null){
var _8cf=this.MENUITEM_IMPLEMENTATION;
var _8d0=_8ce.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8d2=list.getNext();
if(_8d2.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8d2);
}
}
}
this._attachSelections();
var _8d3=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8d4=_8ce.getDescendantBindingsByType(_8cf);
if(_8d4.hasEntries()){
while(_8d4.hasNext()){
var _8d5=_8d4.getNext();
var _8d6=_8d5.labelBinding;
if(_8d6!=null&&_8d6.shadowTree!=null&&_8d6.shadowTree.labelText!=null){
_8d6.shadowTree.labelText.innerHTML=_8d6.shadowTree.labelText.innerHTML.replace(_8d3,"<b>$&</b>");
}
}
_8d4.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8d6=LabelBinding.newInstance(_8d0);
_8d6.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8ce.add(_8d6);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8d2=list.getNext();
var item=this.addSelection(_8d2);
if(this._selectionValue==_8d2.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8d8,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8d8,arg);
switch(_8d8){
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
SelectorBinding.prototype.select=function(_8db,_8dc){
var _8dd=false;
if(_8db!=this._selectedItemBinding){
this._selectedItemBinding=_8db;
_8dd=true;
var _8de=this._buttonBinding;
this._selectionValue=_8db.selectionValue;
this._selectionLabel=_8db.getLabel();
_8de.setLabel(_8db.getLabel());
if(_8db.imageProfile!=null){
_8de.imageProfile=_8db.imageProfile;
}
if(_8de.imageProfile!=null){
_8de.setImage(this.isDisabled==true?_8de.imageProfile.getDisabledImage():_8de.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8dc){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8dc)){
this.validate();
}
}
return _8dd;
};
SelectorBinding.prototype._relate=function(){
var _8df=this.getProperty("relate");
if(_8df){
var _8e0=this.bindingDocument.getElementById(_8df);
if(_8e0){
var _8e1=UserInterface.getBinding(_8e0);
if(_8e1){
if(this.isChecked){
_8e1.show();
}else{
_8e1.hide();
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
SelectorBinding.prototype.selectByValue=function(_8e2,_8e3){
var _8e4=false;
var _8e5=this._menuBodyBinding;
var _8e6=_8e5.getDescendantElementsByLocalName("menuitem");
while(_8e6.hasNext()){
var _8e7=UserInterface.getBinding(_8e6.getNext());
if(_8e7.selectionValue==_8e2){
_8e4=this.select(_8e7,_8e3);
break;
}
}
return _8e4;
};
SelectorBinding.prototype.getValue=function(){
var _8e8=this._selectionValue;
if(_8e8!=null){
_8e8=String(_8e8);
}
return _8e8;
};
SelectorBinding.prototype.setValue=function(_8e9){
this.selectByValue(String(_8e9),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ea=this._selectionValue;
if(_8ea=="null"){
_8ea=null;
}
if(_8ea){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ea=Number(_8ea);
break;
}
}
return _8ea;
};
SelectorBinding.prototype.setResult=function(_8eb){
this.selectByValue(_8eb,true);
};
SelectorBinding.prototype.validate=function(){
var _8ec=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ed=this.getValue();
if(_8ed==this.defaultSelection.value){
_8ec=false;
}
if(_8ec!=this._isValid){
if(_8ec){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ec;
}
return _8ec;
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
var _8ee=this._popupBinding;
if(!this._isUpToDate){
_8ee.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8ef,_8f0){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8ef));
return true;
};
SelectorBinding.newInstance=function(_8f1){
var _8f2=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8f1);
return UserInterface.registerBinding(_8f2,SelectorBinding);
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
var _8f5=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8f5){
this.onValueChange=function(){
Binding.evaluate(_8f5,this);
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
SimpleSelectorBinding.prototype.focus=function(_8f8){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8f8){
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
SimpleSelectorBinding.prototype._hack=function(_8f9){
if(Client.isExplorer){
this._select.style.width=_8f9?"auto":this._cachewidth+"px";
if(_8f9){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8fa=true;
if(this.isRequired){
if(this.getValue()==null){
_8fa=false;
}
}
if(_8fa!=this._isValid){
if(_8fa){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8fb=this._select;
var _8fc=_8fb.options[_8fb.selectedIndex];
var text=DOMUtil.getTextContent(_8fc);
_8fb.blur();
_8fb.style.color="#A40000";
_8fb.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8fc,DataBinding.warnings["required"]);
}
_8fb.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8fc,text);
}
};
}
this._isValid=_8fa;
}
return _8fa;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8fe=null;
var _8ff=this._select;
var _900=_8ff.options[_8ff.selectedIndex];
var _901=true;
if(Client.isExplorer){
var html=_900.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_901=false;
}
}
if(_901){
_8fe=_900.getAttribute("value");
}
return _8fe;
};
SimpleSelectorBinding.prototype.setValue=function(_903){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_904){
this.setValue(_904);
};
SimpleSelectorBinding.newInstance=function(_905){
var _906=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_905);
return UserInterface.registerBinding(_906,SimpleSelectorBinding);
};
function SelectorBindingSelection(_907,_908,_909,_90a,_90b){
this._init(_907,_908,_909,_90a,_90b);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_90c,_90d,_90e,_90f,_910){
if(_90c!=null){
this.label=String(_90c);
}
if(_90d!=null){
this.value=String(_90d);
}
if(_90f!=null){
this.imageProfile=_90f;
}
if(_910!=null){
this.tooltip=_910;
}
this.isSelected=_90e?true:false;
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
var _911=this.getProperty("image");
if(_911){
this.setImage(_911);
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
var _914=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_914.popupBindingTargetElement=this.shadowTree.input;
_914.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_914.attach();
var self=this;
_914.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_914;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _917=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_917).each(function(_918){
if(_918.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _919=_918.getAttribute("value");
var _91a=_918.getAttribute("selected");
var _91b=_918.getAttribute("tooltip");
list.add({value:_919?_919:null,toolTip:_91b?_91b:null,isSelected:(_91a&&_91a=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _91d=this._menuBodyBinding;
var _91e=_91d.bindingDocument;
while(_91d.bindingElement.hasChildNodes()){
var node=_91d.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_91d.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _920=this.getProperty("emptyentrylabel");
if(_920){
var _921=MenuItemBinding.newInstance(_91e);
_921.setLabel(_920);
_921.selectionValue="";
_91d.add(_921);
}
while(list.hasNext()){
var _922=list.getNext();
var _921=MenuItemBinding.newInstance(_91e);
_921.setLabel(_922.label?_922.label:_922.value);
_921.selectionValue=_922.value;
if(_922.image){
_921.setImage(_922.image);
}
if(_922.toolTip){
_921.setToolTip(_922.toolTip);
}
if(_922.isSelected){
this.select(_921,true);
}
_91d.add(_921);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_923){
this.select(_923);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_924,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_924,arg);
switch(_924){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_924,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_926){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_926);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_927){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_927);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _928=this.bindingElement.offsetWidth+"px";
var _929=this._popupBinding.bindingElement;
_929.style.minWidth=_928;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _92a=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _92b=this.getValue();
var _92c=null;
_92a.each(function(item){
if(item.getLabel()==_92b){
_92c=item;
}
});
if(_92c){
_92c.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_92f){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_92f){
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
DataInputSelectorBinding.prototype.setValue=function(_930){
var _931=this.isReadOnly;
var _932=null;
if(_930!=null&&_930!=""){
var _933=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_933.hasNext()){
var item=_933.getNext();
if(item.selectionValue==_930){
_932=item.getLabel();
break;
}
}
}
if(_932!=null){
this.value=_930;
this.shadowTree.input.value=_932;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_930);
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
var _936="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_936);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_936);
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
var _938=ToolBarButtonBinding.newInstance(this.bindingDocument);
_938.setImage("${icon:popup}");
this.addFirst(_938);
_938.attach();
var self=this;
_938.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _93a=self.getProperty("handle");
var _93b=ViewDefinition.clone(_93a,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_93b instanceof DialogViewDefinition){
_93b.handler={handleDialogResponse:function(_93c,_93d){
self._isButtonClicked=false;
if(_93c==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _93e=_93d.getFirst();
self.setValue(_93e);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_93b.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_93b);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_938.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_938;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _940=this._dialogButtonBinding;
if(_940!=null){
_940.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _942=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_942=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _942;
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
var _945=ToolBarButtonBinding.newInstance(this.bindingDocument);
_945.setImage("${icon:editor-sourceview}");
_945.bindingElement.style.left="-24px";
_945.bindingElement.style.width="24px";
this.addFirst(_945);
_945.attach();
_945.hide();
var self=this;
_945.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_945;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_946){
UrlInputDialogBinding.superclass.setValue.call(this,_946);
if(this.isAttached){
this.compositeUrl=new Uri(_946);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _947=TreeService.GetCompositeUrlLabel(_946);
if(_947!=_946){
this.setLabel(_947);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_948){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_948){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_948;
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
var _949=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _94a=this.getProperty("image");
if(_94a!=null){
_949.setImage(_94a);
}else{
_949.setImage("${icon:popup}");
}
this.addFirst(_949);
_949.attach();
var self=this;
_949.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_949;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _94c=this._dialogButtonBinding;
if(_94c!=null){
_94c.oncommand();
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
var _94d=this.getProperty("required")==true;
if(_94d){
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
var _94e=this.getProperty("label");
var _94f=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_94e!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_94e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_94e);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_94f!=null){
this._buttonBinding.setToolTip(_94f);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _950="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_950,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _952=g.getAttribute("viewBox"),_953=document.createDocumentFragment(),_954=g.cloneNode(true);
if(_952){
this.shadowTree.indicatorimage.setAttribute("viewBox",_952);
}
_953.appendChild(_954);
this.shadowTree.indicatorimage.appendChild(_953);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_955){
DataDialogBinding.superclass.handleAction.call(this,_955);
var _956=_955.target;
var self=this;
switch(_955.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_958,_959){
if(_958==Dialog.RESPONSE_ACCEPT){
if(_959 instanceof DataBindingMap){
self._map=_959;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_956==this._buttonBinding){
_955.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_95a,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_95a,arg);
switch(_95a){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _95d=this.getProperty("handle");
var url=this.getURL();
var _95f=null;
if(_95d!=null||def!=null){
if(def!=null){
_95f=def;
}else{
_95f=ViewDefinitions[_95d];
}
if(_95f instanceof DialogViewDefinition){
_95f.handler=this._handler;
if(this._map!=null){
_95f.argument=this._map;
}
StageBinding.presentViewDefinition(_95f);
}
}else{
if(url!=null){
_95f=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_95f!=null){
this._dialogViewHandle=_95f.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_960){
this.setProperty("label",_960);
if(this.isAttached){
this._buttonBinding.setLabel(_960+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_961){
this.setProperty("image",_961);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_961);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_962){
this.setProperty("tooltip",_962);
if(this.isAttached){
this._buttonBinding.setToolTip(_962);
}
};
DataDialogBinding.prototype.setHandle=function(_963){
this.setProperty("handle",_963);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_965){
this._handler=_965;
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
var _966=true;
if(this.isRequired==true){
var _967=this.getValue();
if(_967==null||_967==""){
_966=false;
}
if(_966!=this._isValid){
if(_966){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_966;
}
return _966;
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
DataDialogBinding.newInstance=function(_969){
var _96a=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_969);
return UserInterface.registerBinding(_96a,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_96c,_96d){
if(_96c==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_96d);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_96e){
_96e=new String(_96e);
this.dirty();
this.setValue(encodeURIComponent(_96e));
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
var _972=this.getValue();
if(_972==null){
_972="";
}
this.shadowTree.dotnetinput.value=_972;
};
PostBackDataDialogBinding.prototype.setValue=function(_973){
this.setProperty("value",_973);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_974){
};
PostBackDataDialogBinding.newInstance=function(_975){
var _976=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_975);
return UserInterface.registerBinding(_976,PostBackDataDialogBinding);
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
var _977=this.getProperty("dialoglabel");
var _978=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _97a=this.getProperty("handle");
var _97b=this.getProperty("selectedtoken");
if(_97a!=null){
var def=ViewDefinition.clone(_97a,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_977!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_977;
}
if(_978!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_978;
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
if(_97b!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_97b;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_97d){
var _97e=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_97d);
return UserInterface.registerBinding(_97e,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_980){
self._datathing.setValue(_980);
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
var _983=self.getValue();
if(_983==""||_983==null){
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
var _984=this.getProperty("value");
var _985=this.getProperty("selectorlabel");
if(_985==null){
_985=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_984==null));
list.add(new SelectorBindingSelection(_985+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_984!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _984=this.getValue();
if(_984==""||_984==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_987){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_987);
switch(_987.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_987.target==this._datathing){
var _988=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_988){
self._selector.setLabel(_988);
}
},500);
_987.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_98a){
this.setProperty("label",_98a);
if(this._selector!=null){
this._selector.setLabel(_98a);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_98b){
this._datathing.setValue(_98b);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_98d,_98e){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_98d,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_98f){
this._buttonBinding.setLabel(_98f);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_990){
this._buttonBinding.setToolTip(_990);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_991){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_991);
switch(_991.type){
case MenuItemBinding.ACTION_COMMAND:
var _992=_991.target;
var _993=this.master;
if(_992.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_992.getLabel());
setTimeout(function(){
_993.action();
},0);
}else{
if(_993.getValue()){
_993.dirty();
}
_993.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_994){
var _995=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_994);
return UserInterface.registerBinding(_995,NullPostBackDataDialogSelectorBinding);
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
var _996=this._dataDialogBinding;
if(_996!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_996.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _997=this.getProperty("editable");
var _998=this.getProperty("selectable");
var _999=this.getProperty("display");
if(_997!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_998){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_999){
this._display=_999;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _99a=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_99a.selections=this.selections;
this.add(_99a);
_99a.attach();
this._dataDialogBinding=_99a;
this.shadowTree.datadialog=_99a;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _99c=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _99d=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_99c=_99d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_99c=_99d.isSelected!=true;
break;
}
if(_99c){
this.shadowTree.box.appendChild(this._getElementForSelection(_99d));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_99f){
var box=this.shadowTree.box;
var _9a1=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _9a2=list.getNext();
if(_99f){
_9a2.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_9a1=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_9a1=_9a2.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_9a1=_9a2.isSelected!=true;
break;
}
}
if(_9a1){
var _9a3=this._getElementForSelection(_9a2);
box.insertBefore(_9a3,box.firstChild);
CSSUtil.attachClassName(_9a3,"selected");
this._selectionMap.set(_9a2.value,_9a3);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_9a4){
var _9a5=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_9a5.appendChild(this.bindingDocument.createTextNode(_9a4.label));
_9a5.setAttribute("label",_9a4.label);
_9a5.setAttribute("value",_9a4.value);
return _9a5;
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
var _9a7=DOMEvents.getTarget(e);
var _9a8=DOMUtil.getLocalName(_9a7);
if(_9a8=="div"){
this._handleMouseDown(_9a7);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_9a9){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _9aa=this._getElements();
var _9ab=_9a9.getAttribute("value");
var _9ac=this._lastSelectedElement.getAttribute("value");
var _9ad=false;
while(_9aa.hasNext()){
var el=_9aa.getNext();
switch(el.getAttribute("value")){
case _9ab:
case _9ac:
_9ad=!_9ad;
break;
}
if(_9ad){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_9a9);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_9a9)){
this._unhilite(_9a9);
}else{
this._hilite(_9a9);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_9a9){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_9a9;
};
MultiSelectorBinding.prototype._hilite=function(_9b1){
var _9b2=_9b1.getAttribute("value");
if(!this._selectionMap.has(_9b2)){
CSSUtil.attachClassName(_9b1,"selected");
this._selectionMap.set(_9b2,_9b1);
}
};
MultiSelectorBinding.prototype._unhilite=function(_9b3){
var _9b4=_9b3.getAttribute("value");
if(this._selectionMap.has(_9b4)){
CSSUtil.detachClassName(_9b3,"selected");
this._selectionMap.del(_9b4);
}
};
MultiSelectorBinding.prototype._isHilited=function(_9b5){
return CSSUtil.hasClassName(_9b5,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_9b6){
MultiSelectorBinding.superclass.handleAction.call(this,_9b6);
var _9b7=_9b6.target;
switch(_9b6.type){
case DataDialogBinding.ACTION_COMMAND:
if(_9b7==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_9b6.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_9b7.result);
this.dirty();
_9b7.result=null;
_9b6.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _9b8=null;
if(this.isSelectable){
_9b8=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9ba){
if(self._isHilited(_9ba)){
_9ba.parentNode.removeChild(_9ba);
_9b8.add(new SelectorBindingSelection(_9ba.getAttribute("label"),_9ba.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _9b8;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9bc=this._getElements();
if(!isUp){
_9bc.reverse();
}
var _9bd=true;
while(_9bd&&_9bc.hasNext()){
var _9be=_9bc.getNext();
if(this._isHilited(_9be)){
switch(isUp){
case true:
if(_9be.previousSibling){
_9be.parentNode.insertBefore(_9be,_9be.previousSibling);
}else{
_9bd=false;
}
break;
case false:
if(_9be.nextSibling){
_9be.parentNode.insertBefore(_9be,_9be.nextSibling.nextSibling);
}else{
_9bd=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9bf=new List();
var _9c0=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9c2){
var _9c3=new SelectorBindingSelection(_9c2.getAttribute("label"),_9c2.getAttribute("value"),_9c0);
_9c3.isHighlighted=self._isHilited(_9c2);
_9bf.add(_9c3);
});
return _9bf;
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
var _9c4=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9c4.hasEntries()){
_9c4.each(function(_9c5){
_9c5.parentNode.removeChild(_9c5);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9c6=this.selections.getNext();
if(_9c6.isSelected){
var _9c7=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9c7.name=this._name;
_9c7.value=_9c6.value;
this.bindingElement.appendChild(_9c7);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9c8){
alert(_9c8);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9c9){
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
var _9ca={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9cb=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9cb.handler=this._handler;
_9cb.argument=_9ca;
StageBinding.presentViewDefinition(_9cb);
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
var _9cc={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9ce={handleDialogResponse:function(_9cf,_9d0){
if(_9cf==Dialog.RESPONSE_ACCEPT){
self.result=_9d0;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9d1=ViewDefinitions[this._dialogViewHandle];
_9d1.handler=_9ce;
_9d1.argument=_9cc;
StageBinding.presentViewDefinition(_9d1);
};
MultiSelectorDataDialogBinding.newInstance=function(_9d2){
var _9d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9d2);
return UserInterface.registerBinding(_9d3,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9d4){
var id=_9d4.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9d6=_9d4.bindingDocument.getElementById(id);
if(_9d6!=null){
var _9d7=UserInterface.getBinding(_9d6);
_9d7.setResult(true);
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
var _9d9=this.bindingDocument.getElementById(id);
if(_9d9!=null){
var _9da=UserInterface.getBinding(_9d9);
if(_9da&&!_9da.isAttached){
_9da.isLazy=true;
}else{
_9d9.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9db){
this._isLazy=_9db;
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
var _9dd=this.getProperty("stateprovider");
var _9de=this.getProperty("handle");
if(_9dd!=null&&_9de!=null){
url=url.replace("${stateprovider}",_9dd).replace("${handle}",_9de);
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
EditorDataBinding.prototype._onPageInitialize=function(_9df){
EditorDataBinding.superclass._onPageInitialize.call(this,_9df);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9e0){
EditorDataBinding.superclass.handleAction.call(this,_9e0);
switch(_9e0.type){
case Binding.ACTION_DIRTY:
if(_9e0.target!=this){
if(!this.isDirty){
this.dirty();
}
_9e0.consume();
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
EditorDataBinding.prototype.setValue=function(_9e1){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9e2){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9e3){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9e3);
if(this.hasBasic===false){
var _9e4=this.getContentWindow().bindingMap.basicgroup;
if(_9e4){
_9e4.hide();
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
var _9e9=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9e9=fake.getValue()!="";
}
if(!_9e9&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9e9&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9e9;
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
var _9ed=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9ed!=null){
_9ed.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9ee){
_9ee=_9ee!=null?_9ee:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9ee;
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
var _9ef=this.getProperty("label");
if(_9ef){
this.setLabel(_9ef);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9f0){
this.setProperty("label",_9f0);
if(this.shadowTree.labelBinding==null){
var _9f1=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9f1.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9f1.bindingElement,this.bindingElement.firstChild);
_9f1.attach();
this.shadowTree.labelBinding=_9f1;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9f0));
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
var _9f3=this.getProperty("relation");
if(_9f3!=null){
this.bindingRelation=_9f3;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9f4,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9f4,arg);
switch(_9f4){
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
FieldBinding.newInstance=function(_9f6){
var _9f7=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9f6);
return UserInterface.registerBinding(_9f7,FieldBinding);
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
var _9f8=this.getDescendantBindingByLocalName("fieldgroup");
if(_9f8!=null){
_9f8.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9f9=true;
var _9fa=this.getDescendantBindingsByLocalName("*");
while(_9fa.hasNext()){
var _9fb=_9fa.getNext();
if(Interfaces.isImplemented(IData,_9fb)){
var _9fc=_9fb.validate();
if(_9f9&&!_9fc){
_9f9=false;
}
}
}
return _9f9;
};
FieldsBinding.prototype.handleAction=function(_9fd){
FieldsBinding.superclass.handleAction.call(this,_9fd);
var _9fe=_9fd.target;
if(_9fe!=this){
switch(_9fd.type){
case Binding.ACTION_INVALID:
var _9ff=DataBinding.getAssociatedLabel(_9fe);
if(_9ff){
this._invalidFieldLabels.set(_9fe.key,_9ff);
}
if(_9fe.error){
if(!_9fe.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9fe.error},_9fe);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9fd.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9fe.key)){
this._invalidFieldLabels.del(_9fe.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9fd.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _a00=null;
if(this._invalidFieldLabels.hasEntries()){
_a00=this._invalidFieldLabels.toList();
}
return _a00;
};
FieldsBinding.newInstance=function(_a01){
var _a02=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_a01);
return UserInterface.registerBinding(_a02,FieldsBinding);
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
var _a03=this.getProperty("image");
if(_a03){
this.setImage(_a03);
}
var _a04=this.getProperty("tooltip");
if(_a04){
this.setToolTip(_a04);
}
var _a05=this.getProperty("label");
if(_a05){
this.setLabel(_a05);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _a07=this.getAncestorBindingByLocalName("field");
if(_a07){
var _a08=true;
_a07.getDescendantBindingsByLocalName("*").each(function(_a09){
if(Interfaces.isImplemented(IData,_a09)){
_a09.focus();
_a08=false;
}
return _a08;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_a0a){
this.setProperty("label",_a0a);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_a0a);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _a0b=this.getProperty("label");
if(!_a0b){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_a0b=node.data;
}
}
return _a0b;
};
FieldDescBinding.prototype.setImage=function(_a0d){
this.setProperty("image",_a0d);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_a0e){
this.setProperty("tooltip",_a0e);
if(this.isAttached){
this.bindingElement.title=_a0e;
}
};
FieldDescBinding.newInstance=function(_a0f){
var _a10=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_a0f);
return UserInterface.registerBinding(_a10,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_a11){
var _a12=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_a11);
return UserInterface.registerBinding(_a12,FieldDataBinding);
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
var _a13=this._fieldHelpPopupBinding;
if(_a13){
_a13.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _a14=app.bindingMap.fieldhelpopupset;
var doc=_a14.bindingDocument;
var _a16=_a14.add(PopupBinding.newInstance(doc));
var _a17=_a16.add(PopupBodyBinding.newInstance(doc));
_a16.position=PopupBinding.POSITION_RIGHT;
_a16.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_a17.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _a18=this.getProperty("label");
if(_a18){
_a17.bindingElement.innerHTML=Resolver.resolve(_a18);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_a16;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a19=this.getAncestorBindingByLocalName("field");
if(_a19){
_a19.attachClassName("fieldhelp");
var _a1a=ClickButtonBinding.newInstance(this.bindingDocument);
_a1a.attachClassName("fieldhelp");
_a1a.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a1a);
_a1a.attach();
var self=this;
_a1a.oncommand=function(){
self.attachPopupBinding();
};
_a1a.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a1a;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a1c=this._fieldHelpPopupBinding;
if(_a1c&&!_a1c.isAttached){
_a1c.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a1e){
RadioDataGroupBinding.superclass.handleAction.call(this,_a1e);
switch(_a1e.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a20,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a20,arg);
switch(_a20){
case BroadcastMessages.KEY_ARROW:
var _a22=null;
var next=null;
var _a24=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a24=this.getChildBindingsByLocalName("radio");
while(!_a22&&_a24.hasNext()){
var _a25=_a24.getNext();
if(_a25.getProperty("ischecked")){
_a22=_a25;
}
}
break;
}
if(_a22){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a24.getFollowing(_a22);
while(next!=null&&next.isDisabled){
next=_a24.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a24.getPreceding(_a22);
while(next!=null&&next.isDisabled){
next=_a24.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a26){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a26){
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
var _a27=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a27.type="hidden";
_a27.name=this._name;
this.bindingElement.appendChild(_a27);
this.shadowTree.input=_a27;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a28=null;
var _a29=this.getChildBindingsByLocalName("radio");
while(!_a28&&_a29.hasNext()){
var _a2a=_a29.getNext();
if(_a2a.isChecked){
_a28=_a2a.getProperty("value");
}
}
return _a28;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a2b){
};
RadioDataGroupBinding.prototype.setResult=function(_a2c){
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
var _a2d=this.getProperty("relate");
var _a2e=this.getProperty("oncommand");
var _a2f=this.getProperty("isdisabled");
if(_a2d){
this.bindingRelate=_a2d;
this.relate();
}
if(_a2e){
this.oncommand=function(){
Binding.evaluate(_a2e,this);
};
}
if(_a2f==true){
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
var _a31=this.getCallBackID();
this._buttonBinding.check=function(_a32){
RadioButtonBinding.prototype.check.call(this,_a32);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a33){
RadioButtonBinding.prototype.uncheck.call(this,_a33);
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
RadioDataBinding.prototype.setChecked=function(_a34,_a35){
this._buttonBinding.setChecked(_a34,_a35);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a34);
};
RadioDataBinding.prototype.check=function(_a36){
this.setChecked(true,_a36);
};
RadioDataBinding.prototype.uncheck=function(_a37){
this.setChecked(false,_a37);
};
RadioDataBinding.prototype.setDisabled=function(_a38){
if(_a38!=this.isDisabled){
this.isDisabled=_a38;
this._buttonBinding.setDisabled(_a38);
if(_a38){
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
var _a3a=DOMEvents.getTarget(e);
switch(_a3a){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a3b=this.getProperty("label");
if(_a3b){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a3b)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a3c){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a3c;
}
this.setProperty("label",_a3c);
};
RadioDataBinding.prototype.handleElement=function(_a3d){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a3e){
var _a3f=_a3e.getAttribute("ischecked")==="true";
if(this.isChecked!=_a3f){
this.setChecked(_a3f,true);
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
var _a41=DOMEvents.getTarget(e);
switch(_a41){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a42,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a42,arg);
switch(_a42){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a45){
_a45.consume();
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
var _a47=this.getCallBackID();
this._buttonBinding.check=function(_a48){
ButtonBinding.prototype.check.call(this,_a48);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a48){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a49){
ButtonBinding.prototype.uncheck.call(this,_a49);
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
if(_a47!=null){
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
var _a4a=true;
var _a4b=this.bindingElement.parentNode;
if(_a4b){
var _a4c=UserInterface.getBinding(_a4b);
if(_a4c&&_a4c instanceof CheckBoxGroupBinding){
if(_a4c.isRequired){
if(_a4c.isValid){
_a4a=_a4c.validate();
}else{
_a4a=false;
}
}
}
}
return _a4a;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a4d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a4d.type="hidden";
_a4d.name=this._name;
_a4d.style.display="none";
this.bindingElement.appendChild(_a4d);
this.shadowTree.input=_a4d;
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
var _a4e=null;
var _a4f=this.getProperty("value");
if(this.isChecked){
_a4e=_a4f?_a4f:"on";
}
return _a4e;
};
CheckBoxBinding.prototype.setValue=function(_a50){
if(_a50==this.getValue()||_a50=="on"){
this.check(true);
}else{
if(_a50!="on"){
this.setPropety("value",_a50);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a51=false;
if(this.isChecked){
_a51=this._result!=null?this._result:true;
}
return _a51;
};
CheckBoxBinding.prototype.setResult=function(_a52){
if(typeof _a52=="boolean"){
this.setChecked(_a52,true);
}else{
this._result=_a52;
}
};
CheckBoxBinding.newInstance=function(_a53){
var _a54=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a53);
return UserInterface.registerBinding(_a54,CheckBoxBinding);
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
var _a55=true;
if(this.isRequired){
var _a56=this.getDescendantBindingsByLocalName("checkbox");
if(_a56.hasEntries()){
_a55=false;
while(_a56.hasNext()&&!_a55){
if(_a56.getNext().isChecked){
_a55=true;
}
}
}
if(_a55==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a55;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a57){
if(_a57){
if(!this._labelBinding){
var _a58=LabelBinding.newInstance(this.bindingDocument);
_a58.attachClassName("invalid");
_a58.setImage("${icon:error}");
_a58.setLabel("Selection required");
this._labelBinding=this.addFirst(_a58);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a59){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a59);
switch(_a59.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a5a){
var _a5b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a5a);
return UserInterface.registerBinding(_a5b,CheckBoxGroupBinding);
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
var _a5c=DialogControlBinding.newInstance(this.bindingDocument);
_a5c.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a5c);
this._controlGroupBinding.attachRecursive();
var _a5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a5d);
var _a5e=this.getLabel();
if(_a5e!=null){
this.setLabel(_a5e);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a5f=this._snapTargetBinding;
if(Binding.exists(_a5f)==true){
_a5f.removeActionListener(Binding.ACTION_BLURRED,this);
_a5f.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a60){
if(Interfaces.isImplemented(IData,_a60)){
this._snapTargetBinding=_a60;
var _a61=_a60.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a61&&_a61.isConsumed){
this._environmentBinding=_a61.listener;
}
if(this._environmentBinding){
_a60.addActionListener(Binding.ACTION_BLURRED,this);
_a60.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a60)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a60.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a63=this._snapTargetBinding;
var _a64=this._environmentBinding;
var root=UserInterface.getBinding(_a63.bindingDocument.body);
if(Binding.exists(_a63)&&Binding.exists(_a64)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a63.isAttached&&_a64.isAttached){
var _a66=_a63.boxObject.getUniversalPosition();
var _a67=_a64.boxObject.getUniversalPosition();
_a67.y+=_a64.bindingElement.scrollTop;
_a67.x+=_a64.bindingElement.scrollLeft;
var tDim=_a63.boxObject.getDimension();
var eDim=_a64.boxObject.getDimension();
var _a6a=false;
if(_a66.y+tDim.h<_a67.y){
_a6a=true;
}else{
if(_a66.x+tDim.w<_a67.x){
_a6a=true;
}else{
if(_a66.y>_a67.y+eDim.h){
_a6a=true;
}else{
if(_a66.x>_a67.x+eDim.w){
_a6a=true;
}
}
}
}
if(!_a6a){
this._setComputedPosition(_a66,_a67,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a6b,_a6c,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a71=_a6b;
var _a72=false;
if(_a6b.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a72=true;
}else{
if(_a6b.x+tDim.w>=_a6c.x+eDim.w){
_a72=true;
}
}
if(_a72){
_a71.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a71.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a71.y-=(bDim.h);
_a71.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a71);
};
BalloonBinding.prototype.handleBroadcast=function(_a73,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a73,arg);
switch(_a73){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a75){
var _a76=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a75){
_a76=true;
}
}
return _a76;
};
BalloonBinding.prototype._setPosition=function(_a78){
var _a79=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a79=true;
}
}
if(!_a79){
this.bindingElement.style.left=_a78.x+"px";
this.bindingElement.style.top=_a78.y+"px";
this._point=_a78;
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
BalloonBinding.prototype.handleAction=function(_a7b){
BalloonBinding.superclass.handleAction.call(this,_a7b);
var _a7c=_a7b.target;
switch(_a7b.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a7b.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a7c==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a7c)){
self.dispose();
}else{
if(_a7c.validate()){
var _a7e=true;
if(_a7b.type==Binding.ACTION_BLURRED){
var root=_a7c.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a7e=false;
}
}
if(_a7e){
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
BalloonBinding.prototype.setLabel=function(_a81){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a82=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a81);
_a82.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a82);
}
this.setProperty("label",_a81);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a84){
var _a85=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a84);
var _a86=UserInterface.registerBinding(_a85,BalloonBinding);
_a86.hide();
return _a86;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a87,_a88){
if(Interfaces.isImplemented(IData,_a88)==true){
var _a89,_a8a=_a88.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a8a&&_a8a.isConsumed){
switch(_a8a.listener.constructor){
case StageBinding:
_a89=false;
break;
case StageDialogBinding:
_a89=true;
break;
}
}
var _a8b=_a89?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a8c=_a8b.add(BalloonBinding.newInstance(top.app.document));
_a8c.setLabel(_a87.text);
_a8c.snapTo(_a88);
_a8c.attach();
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
var _a8d=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a90=_a8d.getDataBinding(name);
if(_a90){
ErrorBinding.presentError({text:text},_a90);
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
FocusBinding.focusElement=function(_a91){
var _a92=true;
try{
_a91.focus();
Application.focused(true);
}
catch(exception){
var _a93=UserInterface.getBinding(_a91);
var _a94=SystemLogger.getLogger("FocusBinding.focusElement");
_a94.warn("Could not focus "+(_a93?_a93.toString():String(_a91)));
_a92=false;
}
return _a92;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a95){
var win=_a95.bindingWindow;
var id=_a95.bindingElement.id;
return {getBinding:function(){
var _a98=null;
try{
if(Binding.exists(_a95)){
_a98=win.bindingMap[id];
}
}
catch(exception){
}
return _a98;
}};
};
FocusBinding.navigateNext=function(_a99){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a99);
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
var _a9a=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a9a&&_a9a.isConsumed){
if(_a9a.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a9b){
FocusBinding.superclass.handleAction.call(this,_a9b);
var _a9c=_a9b.target;
var _a9d=null;
if(this._isFocusManager){
switch(_a9b.type){
case FocusBinding.ACTION_ATTACHED:
if(_a9c!=this){
this._isUpToDate=false;
}
_a9b.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a9c!=this){
this._isUpToDate=false;
_a9b.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a9d=new FocusCrawler();
_a9d.mode=FocusCrawler.MODE_BLUR;
_a9d.crawl(_a9c.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a9b.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a9c!=this){
_a9d=new FocusCrawler();
_a9d.mode=FocusCrawler.MODE_FOCUS;
_a9d.crawl(_a9c.bindingElement);
}
_a9b.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a9c)){
this.claimFocus();
this._onFocusableFocused(_a9c);
}
_a9b.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a9c)){
this._onFocusableBlurred(_a9c);
}
_a9b.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a9e){
var _a9f=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a9f==null&&list.hasNext()){
var _aa1=list.getNext();
if(this._cachedFocus&&_aa1==this._cachedFocus.getBinding()){
_a9f=_aa1;
}
}
if(_a9f!=null){
if(_aa1.isFocused){
var next=_a9e?list.getPreceding(_a9f):list.getFollowing(_a9f);
if(!next){
next=_a9e?list.getLast():list.getFirst();
}
next.focus();
}else{
_a9f.focus();
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
var _aa3=new FocusCrawler();
var list=new List();
_aa3.mode=FocusCrawler.MODE_INDEX;
_aa3.crawl(this.bindingElement,list);
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
var _aa6=this._cachedFocus.getBinding();
if(_aa6&&!_aa6.isFocused){
_aa6.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_aa7){
if(_aa7!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_aa7;
_aa7.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_aa7);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_aa8){
_aa8.deleteProperty(FocusBinding.MARKER);
if(_aa8==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_aaa){
this.bindingElement.style.left=_aaa+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_aab){
this.hiddenTabBindings.add(_aab);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _aac=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_aac.getLabel());
item.setImage(_aac.getImage());
item.associatedTabBinding=_aac;
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
TabsButtonBinding.prototype.handleAction=function(_aaf){
TabsButtonBinding.superclass.handleAction.call(this,_aaf);
switch(_aaf.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _ab0=this.selectedTabBinding;
if(_ab0){
this.containingTabBoxBinding.moveToOrdinalPosition(_ab0,0);
this.containingTabBoxBinding.select(_ab0);
}
_aaf.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_ab1){
var _ab2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ab1);
_ab2.setAttribute("type","checkbox");
_ab2.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ab2.className="tabbutton";
return UserInterface.registerBinding(_ab2,TabsButtonBinding);
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
var _ab3=TabBoxBinding.currentActiveInstance;
if(_ab3!=null&&Binding.exists(_ab3)){
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
var _ab4=this.getTabElements().getLength();
var _ab5=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_ab4!=_ab5){
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
var _ab6=this.getTabPanelElements();
while(_ab6.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_ab6.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _ab7=DOMUtil.getOrdinalPosition(this._tabsElement);
var _ab8=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _ab9=_ab7>_ab8?"tabsbelow":"tabsontop";
this.attachClassName(_ab9);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _abb=this.getTabPanelElements();
var _abc=null;
var _abd=this.getProperty("selectedindex");
if(_abd!=null){
if(_abd>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _abe=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _ac0=_abb.getNext();
this.registerTabBoxPair(tab,_ac0);
if(_abd&&_abe==_abd){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_abc=tab;
}
}
_abe++;
}
if(!_abc){
_abc=tabs.getFirst();
_abc.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_ac1){
var _ac2=null;
var _ac3=null;
if(this.isEqualSize){
var _ac4=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_ac6=this.getTabPanelElements();
_ac6.each(function(_ac7){
max=_ac7.offsetHeight>max?_ac7.offsetHeight:max;
});
_ac3=max+_ac4.top+_ac4.bottom;
if(_ac1&&this._tabPanelsElement.style.height!=null){
_ac2=this._tabPanelsElement.offsetHeight;
}
if(_ac2!=null||_ac3>_ac2){
this._tabPanelsElement.style.height=_ac3+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_ac8){
_ac8._invalidCount=0;
_ac8.addActionListener(Binding.ACTION_INVALID,this);
_ac8.addActionListener(Binding.ACTION_VALID,this);
_ac8.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ac9){
TabBoxBinding.superclass.handleAction.call(this,_ac9);
var _aca=_ac9.target;
var _acb=_ac9.listener;
switch(_ac9.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aca.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ac9.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aca.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_acb._invalidCount++;
if(_acb._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_acb.isSelected){
self._showWarning(_acb,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_acb._invalidCount>0){
_acb._invalidCount--;
if(_acb._invalidCount==0){
if(_acb.isSelected){
this._showWarning(_acb,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_acb,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ac9._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ac9._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ace=DOMEvents.getTarget(e);
if(_ace==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ad0=this.getTabPanelElements();
tabs.each(function(tab,_ad2){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ad3=_ad0.get(_ad2);
this.registerTabBoxPair(tab,_ad3);
}
},this);
var _ad4=this._tabBoxPairs;
for(var key in _ad4){
var tab=_ad4[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ace);
switch(_ace.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ad8=_ace.parentNode;
if(_ad8==this._tabsElement||_ad8==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ace==this._tabsElement||_ace==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ada){
var _adb=this.getBindingForArgument(arg);
if(_adb!=null&&!_adb.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_adb.select(_ada);
this.getTabPanelBinding(_adb).select(_ada);
var _adc=this.getProperty("selectedindex");
if(_adc!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_adb.bindingElement,true));
}
this._selectedTabBinding=_adb;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_adb.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _add=this.getTabPanelBinding(_adb);
this._showBalloon(_add,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_adf){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_adf.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_adf};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ae3){
var _ae4=null;
try{
var key=_ae3.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ae6=this._tabBoxPairs[key].tabPanel;
_ae4=UserInterface.getBinding(_ae6);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ae4;
};
TabBoxBinding.prototype.getTabBinding=function(_ae7){
var key=_ae7.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ae9=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ae9);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aea=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aea);
return _aea;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aeb,_aec){
var _aed=_aeb.bindingElement;
_aeb.setProperty("selected",true);
var _aee=this.summonTabPanelBinding();
var _aef=_aee.bindingElement;
if(_aec){
_aef.appendChild(_aec instanceof Binding?_aec.bindingElement:_aec);
}
this.registerTabBoxPair(_aed,_aef);
UserInterface.getBinding(this._tabsElement).add(_aeb);
this._tabPanelsElement.appendChild(_aef);
_aeb.attach();
UserInterface.getBinding(_aef).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aeb;
};
TabBoxBinding.prototype.importTabBinding=function(_af0){
var that=_af0.containingTabBoxBinding;
var _af2=that.getTabPanelBinding(_af0);
var _af3=_af2.getBindingElement();
var _af4=_af0.getBindingElement();
that.dismissTabBinding(_af0);
this._tabsElement.appendChild(_af4);
this._tabPanelsElement.appendChild(_af3);
this.registerTabBoxPair(_af4,_af3);
_af0.containingTabBoxBinding=this;
this.select(_af0);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_af5){
var _af6=null;
if(_af5.isSelected){
_af6=this.getBestTab(_af5);
this._selectedTabBinding=null;
}
var _af7=this.getTabPanelBinding(_af5);
this.unRegisterTabBoxPair(_af5.bindingElement);
_af5.dispose();
_af7.dispose();
if(_af6!=null){
this.select(_af6,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_af8){
if(_af8.isSelected){
this.selectBestTab(_af8);
}
};
TabBoxBinding.prototype.selectBestTab=function(_af9){
var _afa=this.getBestTab(_af9);
if(_afa){
this.select(_afa);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_afb){
var _afc=null;
var _afd=_afb.getOrdinalPosition(true);
var _afe=this.getTabBindings();
var _aff=_afe.getLength();
var _b00=_aff-1;
if(_aff==1){
_afc=null;
}else{
if(_afd==_b00){
_afc=_afe.get(_afd-1);
}else{
_afc=_afe.get(_afd+1);
}
}
return _afc;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_b01,_b02){
var _b03=this.bindingDocument.getElementById(_b01.bindingElement.id);
var tab=this.getTabElements().get(_b02);
this._tabsElement.insertBefore(_b03,tab);
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
var _b05=this._nodename_tab;
var _b06=new List(this._tabsElement.childNodes);
var _b07=new List();
while(_b06.hasNext()){
var _b08=_b06.getNext();
if(_b08.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_b08)==_b05){
_b07.add(_b08);
}
}
return _b07;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _b09=this._nodename_tabpanel;
var _b0a=new List(this._tabPanelsElement.childNodes);
var _b0b=new List();
_b0a.each(function(_b0c){
if(_b0c.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_b0c)==_b09){
_b0b.add(_b0c);
}
});
return _b0b;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _b0d=new List();
var _b0e=this.getTabElements();
_b0e.each(function(_b0f){
_b0d.add(UserInterface.getBinding(_b0f));
});
return _b0d;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _b10=new List();
this.getTabPanelElements().each(function(_b11){
_b10.add(UserInterface.getBinding(_b11));
});
return _b10;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _b12=null;
if(this._selectedTabBinding){
_b12=this.getTabPanelBinding(this._selectedTabBinding);
}
return _b12;
};
TabBoxBinding.prototype._showWarning=function(_b13,_b14){
var _b15=this.getTabBinding(_b13);
if(_b14){
if(_b15.labelBinding.hasImage){
_b15._backupImage=_b15.getImage();
}
_b15.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_b15._backupImage){
_b15.setImage(_b15._backupImage);
}else{
_b15.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_b16,_b17){
var _b18=this.getTabBinding(_b16);
if((_b17&&!_b18.isSelected)||!_b17){
if(_b18.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_b17){
if(_b18.labelBinding.hasImage){
_b18._backupImage=_b18.getImage();
}
_b18.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_b18._backupImage!=null){
_b18.setImage(_b18._backupImage);
}else{
_b18.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b19){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b1c=tab.getOrdinalPosition(true);
var next=null;
var _b1e=new List();
tabs.each(function(t){
if(t.isVisible){
_b1e.add(t);
}
});
if(_b1e.getLength()>1){
if(_b1c==0&&!_b19){
next=_b1e.getLast();
}else{
if(_b1c==_b1e.getLength()-1&&_b19){
next=_b1e.getFirst();
}else{
if(_b19){
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
var _b20=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b20.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b21){
TabsBinding.superclass.handleAction.call(this,_b21);
switch(_b21.type){
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
var _b24=self.bindingElement.offsetWidth;
if(_b24!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b24;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b25){
if(_b25 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b25);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b26=false;
var _b27,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b2a=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b2b=this.bindingElement.offsetWidth-_b2a.RESERVED_SPACE;
var _b2c=null;
var sum=0,_b2e=0;
var _b2f=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b2f){
tab=tabs.getNext();
_b27=UserInterface.getBinding(tab);
if(!_b2c){
_b2c=_b27;
}
sum+=tab.offsetWidth;
if(sum>=_b2b){
_b26=true;
if(_b27.isSelected){
if(!DOMUtil.isFirstElement(_b27.bindingElement,true)){
this.isManaging=false;
if(_b2c){
_b2c.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b27,_b2e-1);
_b2f=false;
}
}else{
_b27.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b27);
}
}else{
_b27.show();
_b2c=_b27;
_b2e++;
}
}
if(_b2f){
if(_b26&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b30=_b2c.getBindingElement();
var _b31=_b30.offsetLeft+_b30.offsetWidth;
var _b32=this.tabsButtonBinding;
setTimeout(function(){
_b32.show(_b31+4);
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
var _b33=TabBinding.superclass.serialize.call(this);
if(_b33){
_b33.label=this.getLabel();
_b33.image=this.getImage();
_b33.tooltip=this.getToolTip();
}
return _b33;
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
var _b34=this.bindingElement.getAttribute("image");
var _b35=this.bindingElement.getAttribute("label");
var _b36=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b35){
this.setLabel(_b35);
}
if(_b34){
this.setImage(_b34);
}
if(_b36){
this.setToolTip(_b36);
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
TabBinding.prototype.setLabel=function(_b38){
if(_b38!=null){
this.setProperty("label",_b38);
if(this.isAttached){
this.labelBinding.setLabel(_b38);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b39){
if(_b39){
this.setProperty("tooltip",_b39);
if(this.isAttached){
this.labelBinding.setToolTip(_b39);
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
var _b3b=false;
if(Client.isMozilla==true){
}
if(!_b3b){
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
TabBinding.prototype.select=function(_b3c){
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
TabBinding.newInstance=function(_b3d){
var _b3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b3d);
return UserInterface.registerBinding(_b3e,TabBinding);
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
var _b3f=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b3f=true;
this._lastKnownDimension=dim1;
}
return _b3f;
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
TabPanelBinding.prototype.select=function(_b42){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b42!=true){
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
TabPanelBinding.prototype.handleAction=function(_b43){
TabPanelBinding.superclass.handleAction.call(this,_b43);
var _b44=_b43.target;
switch(_b43.type){
case BalloonBinding.ACTION_INITIALIZE:
_b43.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b45){
var _b46=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b45);
UserInterface.registerBinding(_b46,TabPanelBinding);
return UserInterface.getBinding(_b46);
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
var _b47=SplitBoxBinding.superclass.serialize.call(this);
if(_b47){
_b47.orient=this.getOrient();
_b47.layout=this.getLayout();
}
return _b47;
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
var _b49=this.getSplitPanelElements();
if(_b49.hasEntries()){
var _b4a=new List(this.getLayout().split(":"));
if(_b4a.getLength()!=_b49.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b49.each(function(_b4b){
_b4b.setAttribute("ratio",_b4a.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b4c=this.getProperty("orient");
if(_b4c){
this._orient=_b4c;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b4d=this.getSplitterBindings();
while(_b4d.hasNext()){
var _b4e=_b4d.getNext();
if(_b4e&&_b4e.getProperty("collapsed")==true){
_b4e.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b4f){
SplitBoxBinding.superclass.handleAction.call(this,_b4f);
switch(_b4f.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b4f.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b4f.target);
_b4f.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b4f.target);
_b4f.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b50){
this._getSplitPanelBindingForSplitter(_b50).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b51){
this._getSplitPanelBindingForSplitter(_b51).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b52){
var _b53=DOMUtil.getOrdinalPosition(_b52.bindingElement,true);
var _b54,_b55=this.getSplitPanelElements();
switch(_b52.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b54=_b55.get(_b53);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b54=_b55.get(_b53+1);
break;
}
return UserInterface.getBinding(_b54);
};
SplitBoxBinding.prototype.invokeLayout=function(_b56){
var _b57=this.isHorizontalOrient();
var _b58=this.getSplitPanelBindings();
var _b59=this.getSplitterBindings();
var _b5a=new List();
var _b5b,sum=0;
var _b5d=0;
_b58.each(function(_b5e){
if(_b5e.isFixed==true){
if(!_b58.hasNext()){
_b5d+=_b5e.getFix();
}
_b5a.add(0);
sum+=0;
}else{
_b5b=_b5e.getRatio();
_b5a.add(_b5b);
sum+=_b5b;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b5a.getLength()!=_b58.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b5f=_b57?this.getInnerWidth():this.getInnerHeight();
_b5f-=_b5d;
_b59.each(function(_b60){
if(_b60.isVisible){
_b5f-=SplitterBinding.DIMENSION;
}
});
var unit=_b5f/sum;
var _b62=0;
var self=this;
_b58.each(function(_b64){
var span=0;
var _b66=_b5a.getNext();
if(_b64.isFixed){
span=_b64.getFix();
}else{
span=Math.floor(unit*_b66);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b62+=span;
while(_b62>_b5f){
_b62--;
span--;
}
if(!_b64.isFixed){
if(_b57){
_b64.setWidth(span);
}else{
_b64.setHeight(span);
}
}
});
}
if(_b56!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b67=this.getLayout();
if(_b67){
this.setProperty("layout",_b67);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b68=this.isHorizontalOrient();
var _b69=this.getSplitPanelBindings();
var _b6a=this.getSplitterBindings();
var _b6b=null;
var _b6c=null;
var unit=null;
var _b6e=null;
var span=null;
_b69.each(function(_b70){
if(!unit){
unit=_b68?_b70.getWidth():_b70.getHeight();
}
span=_b68?_b70.getWidth():_b70.getHeight();
if(_b6e){
span-=_b6e;
_b6e=null;
}
_b6b=_b6a.getNext();
if(_b6b&&_b6b.offset){
_b6e=_b6b.offset;
span+=_b6e;
}
_b70.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b71){
this.logger.debug(_b71);
this.setProperty("layout",_b71);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b72="",_b73=this.getSplitPanelBindings();
_b73.each(function(_b74){
_b72+=_b74.getRatio().toString();
_b72+=_b73.hasNext()?":":"";
});
this.setProperty("layout",_b72);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b75=this.getSplitPanelElements();
_b75.each(function(_b76){
layout+="1"+(_b75.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b77){
this.bindingElement.style.width=_b77+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b78){
this.bindingElement.style.height=_b78+"px";
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
var _b79=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b79.reverse();
}
return _b79;
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
SplitBoxBinding.prototype.fit=function(_b7a){
if(!this.isFit||_b7a){
if(this.isHorizontalOrient()){
var max=0;
var _b7c=this.getSplitPanelBindings();
_b7c.each(function(_b7d){
var _b7e=_b7d.bindingElement.offsetHeight;
max=_b7e>max?_b7e:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b7f){
var _b80=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b7f);
return UserInterface.registerBinding(_b80,SplitBoxBinding);
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
var _b83=this.getProperty("hidden");
if(_b83){
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
var _b84=this.getProperty("ratiocache");
if(_b84){
this.setRatio(_b84);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b85){
if(!this.isFixed){
if(_b85!=this.getWidth()){
if(_b85<0){
_b85=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b85+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b85);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b86=null;
if(this.isFixed){
_b86=this.getFix();
}else{
_b86=this.bindingElement.offsetWidth;
}
return _b86;
};
SplitPanelBinding.prototype.setHeight=function(_b87){
if(!this.isFixed){
if(_b87!=this.getHeight()){
try{
this.bindingElement.style.height=_b87+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b88=null;
if(this.isFixed){
_b88=this.getFix();
}else{
_b88=this.bindingElement.offsetHeight;
}
return _b88;
};
SplitPanelBinding.prototype.setRatio=function(_b89){
this.setProperty("ratio",_b89);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b8a){
if(_b8a){
this._fixedSpan=_b8a;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b8a);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b8a);
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
SplitPanelBinding.newInstance=function(_b8b){
var _b8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b8b);
return UserInterface.registerBinding(_b8c,SplitPanelBinding);
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
var _b8d=SplitBoxBinding.superclass.serialize.call(this);
if(_b8d){
_b8d.collapse=this.getProperty("collapse");
_b8d.collapsed=this.getProperty("collapsed");
_b8d.disabled=this.getProperty("isdisabled");
}
return _b8d;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b8e=this.getProperty("hidden");
if(_b8e){
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
SplitterBinding.prototype.setCollapseDirection=function(_b90){
this.setProperty("collapse",_b90);
this._collapseDirection=_b90;
};
SplitterBinding.prototype.handleAction=function(_b91){
SplitterBinding.superclass.handleAction.call(this,_b91);
switch(_b91.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b91.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b93=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b93.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b93.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b94){
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
SplitterBinding.newInstance=function(_b9f){
var _ba0=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b9f);
return UserInterface.registerBinding(_ba0,SplitterBinding);
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
var _ba1=this.getProperty("selectedindex");
var _ba2=this.getDeckElements();
if(_ba2.hasEntries()){
var _ba3=false;
var _ba4=0;
while(_ba2.hasNext()){
var deck=_ba2.getNext();
if(_ba1&&_ba4==_ba1){
deck.setAttribute("selected","true");
_ba3=true;
}else{
if(deck.getAttribute("selected")=="true"){
_ba3=true;
}
}
_ba4++;
}
if(!_ba3){
_ba2.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _ba7=this.getBindingForArgument(arg);
if(_ba7!=null){
if(_ba7!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_ba7.select();
this._selectedDeckBinding=_ba7;
var _ba8=this.getProperty("selectedindex");
if(_ba8!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ba7.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _ba9=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_ba9=true;
this._lastKnownDimension=dim1;
}
return _ba9;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_bac){
var _bad=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_bac);
return UserInterface.registerBinding(_bad,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_bae){
DeckBinding.superclass.handleAction.call(this,_bae);
var _baf=_bae.target;
switch(_bae.type){
case BalloonBinding.ACTION_INITIALIZE:
_bae.consume();
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
DeckBinding.newInstance=function(_bb1){
var _bb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_bb1);
return UserInterface.registerBinding(_bb2,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_bb3){
if(_bb3 instanceof ToolBarBodyBinding){
if(_bb3.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_bb3;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_bb3;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_bb3);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _bb4=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_bb4){
this.setImageSize(_bb4);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _bb6=ToolBarGroupBinding.newInstance(this.bindingDocument);
_bb6.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_bb6.isDefaultContent=true;
this.add(_bb6);
_bb6.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _bb8=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_bb8);
}
if(_bb8!=null&&_bb8.hasClassName("max")){
this._maxToolBarGroup(_bb8,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_bba){
var _bbb=this.boxObject.getDimension().w;
var _bbc=CSSComputer.getPadding(this.bindingElement);
_bbb-=(_bbc.left+_bbc.right);
if(_bba!=null){
_bbb-=_bba.boxObject.getDimension().w;
if(!Client.isWindows){
_bbb-=1;
}
if(Client.isExplorer){
_bbb-=15;
}
}
max.bindingElement.style.width=_bbb+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_bbd){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_bbd);
};
ToolBarBinding.prototype.addLeft=function(_bbe,_bbf){
var _bc0=null;
if(this._toolBarBodyLeft!=null){
_bc0=this._toolBarBodyLeft.add(_bbe,_bbf);
}else{
throw new Error("No left toolbarbody");
}
return _bc0;
};
ToolBarBinding.prototype.addLeftFirst=function(_bc1,_bc2){
var _bc3=null;
if(this._toolBarBodyLeft){
_bc3=this._toolBarBodyLeft.addFirst(_bc1,_bc2);
}else{
throw new Error("No left toolbarbody");
}
return _bc3;
};
ToolBarBinding.prototype.addRight=function(_bc4){
var _bc5=null;
if(this._toolBarBodyRight){
_bc5=this._toolBarBodyRight.add(_bc4);
}else{
throw new Error("No left toolbarbody");
}
return _bc5;
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
ToolBarBinding.newInstance=function(_bc8){
var _bc9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bc8);
return UserInterface.registerBinding(_bc9,ToolBarBinding);
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
var _bca=this.getDescendantBindingsByLocalName("toolbargroup");
var _bcb=new List();
var _bcc=true;
_bca.each(function(_bcd){
if(_bcd.isVisible&&!_bcd.isDefaultContent){
_bcb.add(_bcd);
}
});
while(_bcb.hasNext()){
var _bce=_bcb.getNext();
_bce.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bcc){
_bce.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bcc=false;
}
if(!_bcb.hasNext()){
_bce.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bd1=list.getNext();
var _bd2=_bd1.getEqualSizeWidth();
if(_bd2>max){
max=_bd2;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bd1=list.getNext();
_bd1.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bd3,_bd4){
var _bd5=ToolBarBinding.superclass.add.call(this,_bd3);
if(!_bd4){
if(_bd3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bd5;
};
ToolBarBodyBinding.prototype.addFirst=function(_bd6,_bd7){
var _bd8=ToolBarBinding.superclass.addFirst.call(this,_bd6);
if(!_bd7){
if(_bd6 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bd8;
};
ToolBarBodyBinding.newInstance=function(_bd9){
var _bda=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bd9);
return UserInterface.registerBinding(_bda,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bdb){
switch(_bdb){
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
var _bdc=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bdc)=="toolbarbody"){
UserInterface.getBinding(_bdc).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bdd=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bdd)=="toolbarbody"){
UserInterface.getBinding(_bdd).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bde){
var _bdf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bde);
return UserInterface.registerBinding(_bdf,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_be0){
var _be1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_be0);
return UserInterface.registerBinding(_be1,ToolBarButtonBinding);
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
var _be2=this.getProperty("label");
var _be3=this.getProperty("image");
if(_be2){
this.setLabel(_be2);
}
if(_be3){
this.setImage(_be3);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_be4,_be5){
if(this.isAttached){
this._labelBinding.setLabel(_be4,_be5);
}
this.setProperty("label",_be4);
};
ToolBarLabelBinding.prototype.setImage=function(_be6,_be7){
if(this.isAttached){
this._labelBinding.setImage(_be6,_be7);
}
this.setProperty("image",_be6);
};
ToolBarLabelBinding.newInstance=function(_be8){
var _be9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_be8);
return UserInterface.registerBinding(_be9,ToolBarLabelBinding);
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
var _bea=this.getDescendantBindingsByLocalName("clickbutton");
if(_bea.hasEntries()){
while(_bea.hasNext()){
var _beb=_bea.getNext();
if(_beb.isDefault){
this._defaultButton=_beb;
_beb.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_beb.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bea;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bec,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bec,arg);
switch(_bec){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bee=this.getAncestorBindingByType(DialogBinding,true);
if(_bee!=null&&_bee.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bef){
DialogToolBarBinding.superclass.handleAction.call(this,_bef);
var _bf0=_bef.target;
var _bf1=false;
var _bf2=this._buttons.reset();
if(_bf0 instanceof ClickButtonBinding){
switch(_bef.type){
case Binding.ACTION_FOCUSED:
_bf0.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bf0;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bf0.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bf1&&_bf2.hasNext()){
var _bf3=_bf2.getNext();
_bf1=_bf3.isFocused;
}
if(!_bf1){
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
ComboBoxBinding.newInstance=function(_bf5){
var _bf6=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bf5);
return UserInterface.registerBinding(_bf6,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bf7,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bf7,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bfb=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bfb.each(function(_bfc){
var _bfd=_bfc.getProperty("oncommand");
_bfc.setProperty("hiddencommand",_bfd);
_bfc.deleteProperty("oncommand");
_bfc.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bfe=null;
var _bff=this.getActiveMenuItemId();
_bfb.reset();
while(_bfb.hasNext()){
var _c00=_bfb.getNext();
if(_c00.getProperty("id")==_bff){
_bfe=_c00;
break;
}
}
if(_bfe==null&&_bfb.hasEntries()){
_bfe=_bfb.getFirst();
}
if(_bfe!=null){
this.setButton(_bfe);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_c01){
if(_c01 instanceof MenuItemBinding){
var _c02=_c01.getProperty("label");
var _c03=_c01.getProperty("image");
var _c04=_c01.getProperty("image-hover");
var _c05=_c01.getProperty("image-active");
var _c06=_c01.getProperty("image-disabled");
var _c07=_c01.getProperty("hiddencommand");
this.setLabel(_c02?_c02:"");
this.image=_c03;
this.imageHover=_c03;
this.imageActive=_c05;
this.imageDisabled=_c06;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_c07,this);
};
this.hideActiveItem(_c01);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_c08){
if(_c08 instanceof MenuItemBinding){
this.setButton(_c08);
this.setActiveMenuItemId(_c08.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_c09){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_c0a){
if(_c0a==_c09){
Binding.prototype.hide.call(_c0a);
}else{
Binding.prototype.show.call(_c0a);
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
var _c0c=this._views;
for(var _c0d in ViewDefinitions){
var def=ViewDefinitions[_c0d];
var key=def.perspective;
if(key!=null){
if(!_c0c.has(key)){
_c0c.set(key,new List());
}
var list=_c0c.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_c11,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_c11,arg);
switch(_c11){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _c14=this.bindingWindow.bindingMap.toolboxpopupgroup;
_c14.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_c14.add(StageViewMenuItemBinding.newInstance(_c14.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_c14.show();
}else{
_c14.hide();
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
TreeBinding.grid=function(_c18){
var _c19=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_c18);
var _c1b=_c18%_c19;
if(_c1b>0){
_c18=_c18-_c1b+_c19;
}
return _c18+TreeBodyBinding.PADDING_TOP;
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
var _c1c=this.getProperty("focusable");
if(_c1c!=null){
this._isFocusable=_c1c;
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
var _c1e=this.getProperty("builder");
if(_c1e){
this._buildFromTextArea(_c1e);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c1f=this.getProperty("selectable");
var _c20=this.getProperty("selectionproperty");
var _c21=this.getProperty("selectionvalue");
if(_c1f){
this.setSelectable(true);
if(_c20){
this.setSelectionProperty(_c20);
}
if(_c21){
this.setSelectionValue(_c21);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c24=UserInterface.getBinding(area);
var _c25=this._treeBodyBinding;
function build(){
_c25.subTreeFromString(area.value);
}
_c24.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c26){
var _c27=_c26.getHandle();
if(this._treeNodeBindings.has(_c27)){
throw "Duplicate treenodehandles registered: "+_c26.getLabel();
}else{
this._treeNodeBindings.set(_c27,_c26);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c27)){
_c26.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c29){
this._treeNodeBindings.del(_c29.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c2a){
var _c2b=null;
if(this._treeNodeBindings.has(_c2a)){
_c2b=this._treeNodeBindings.get(_c2a);
}else{
throw "No such treenode: "+_c2a;
}
return _c2b;
};
TreeBinding.prototype.handleAction=function(_c2c){
TreeBinding.superclass.handleAction.call(this,_c2c);
var _c2d=_c2c.target;
switch(_c2c.type){
case TreeNodeBinding.ACTION_OPEN:
_c2c.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c2d);
_c2c.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c2d;
this.focusSingleTreeNodeBinding(_c2d);
if(!this.isFocused){
this.focus();
}
_c2c.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c2d;
this.focusSingleTreeNodeBinding(_c2d);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c2d;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c2d;
this.focusSingleTreeNodeBinding(_c2d);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c2c.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c2d.isFocused){
this.blurSelectedTreeNodes();
}
_c2c.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c2e,_c2f){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c30){
if(_c30!=null&&!_c30.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c30);
_c30.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c31){
this.blurSelectedTreeNodes();
while(_c31.hasNext()){
var _c32=_c31.getNext();
this._focusedTreeNodeBindings.add(_c32);
_c32.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c33=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c34=false;
var _c35=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c36=this._focusedTreeNodeBindings.getNext();
var _c37=_c36.getProperty(this._selectionProperty);
if(_c37!=null){
if(!this._selectionValue||this._selectionValue[_c37]){
_c35=(this._selectedTreeNodeBindings[_c36.key]=_c36);
var _c38=_c33[_c36.key];
if(!_c38||_c38!=_c35){
_c34=true;
}
}
}
}
if(_c35){
if(_c34){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c33){
for(var key in _c33){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c3a=new List();
for(var key in this._selectedTreeNodeBindings){
_c3a.add(this._selectedTreeNodeBindings[key]);
}
return _c3a;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c3c){
_c3c.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c3d){
var _c3e=_c3d.getDescendantBindingsByLocalName("treenode");
var _c3f=true;
var self=this;
_c3e.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c3f;
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
var _c42=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c42!=null){
this.focusSingleTreeNodeBinding(_c42);
_c42.callback();
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
TreeBinding.prototype.add=function(_c43){
var _c44=null;
if(this._treeBodyBinding){
_c44=this._treeBodyBinding.add(_c43);
}else{
this._treeNodeBuffer.add(_c43);
_c44=_c43;
}
return _c44;
};
TreeBinding.prototype.addFirst=function(_c45){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c46=this._treeBodyBinding.bindingElement;
_c46.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c47,_c48){
if(_c48.isContainer&&_c48.isOpen){
_c48.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c49){
this._isSelectable=_c49;
if(_c49){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c4a){
this._selectionProperty=_c4a;
};
TreeBinding.prototype.setSelectionValue=function(_c4b){
if(_c4b){
var list=new List(_c4b.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c4d,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c4d,arg);
switch(_c4d){
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
var _c4f=this.getFocusedTreeNodeBindings();
if(_c4f.hasEntries()){
var node=_c4f.getFirst();
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
var _c52=this.getFocusedTreeNodeBindings();
if(_c52.hasEntries()){
var node=_c52.getFirst();
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
var _c55=null;
while(next==null&&(_c55=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c55!=null){
next=_c55.getNextBindingByLocalName("treenode");
}
node=_c55;
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
var _c57=DOMEvents.getTarget(e);
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
var _c58=new TreeCrawler();
var list=new List();
_c58.mode=TreeCrawler.MODE_GETOPEN;
_c58.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c5b=list.getNext();
map.set(_c5b.getHandle(),true);
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
var _c60=this._positionIndicatorBinding;
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
if(y!=_c60.getPosition().y){
_c60.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c60.isVisible){
_c60.show();
}
}else{
if(_c60.isVisible){
_c60.hide();
}
}
}else{
if(_c60.isVisible){
_c60.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c63){
this._acceptingTreeNodeBinding=_c63;
this._acceptingPosition=_c63.boxObject.getLocalPosition();
this._acceptingDimension=_c63.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c63);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c64){
var map={};
var _c66=_c64.getChildBindingsByLocalName("treenode");
var _c67,pos,dim,y;
y=TreeBinding.grid(_c64.boxObject.getLocalPosition().y);
map[y]=true;
while(_c66.hasNext()){
_c67=_c66.getNext();
pos=_c67.boxObject.getLocalPosition();
dim=_c67.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c6d in this._acceptingPositions){
if(_c6d==y){
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
TreeBinding.newInstance=function(_c6e){
var _c6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c6e);
var _c70=UserInterface.registerBinding(_c6f,TreeBinding);
_c70.treeBodyBinding=TreeBodyBinding.newInstance(_c6e);
return _c70;
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
TreeBodyBinding.prototype.accept=function(_c71){
if(_c71 instanceof TreeNodeBinding){
this.logger.debug(_c71);
}
};
TreeBodyBinding.newInstance=function(_c72){
var _c73=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c72);
return UserInterface.registerBinding(_c73,TreeBodyBinding);
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
var _c74=TreeNodeBinding.superclass.serialize.call(this);
if(_c74){
_c74.label=this.getLabel();
_c74.image=this.getImage();
var _c75=this.getHandle();
if(_c75&&_c75!=this.key){
_c74.handle=_c75;
}
if(this.isOpen){
_c74.open=true;
}
if(this.isDisabled){
_c74.disabled=true;
}
if(this.dragType){
_c74.dragtype=this.dragType;
}
if(this.dragAccept){
_c74.dragaccept=this.dragAccept;
}
}
return _c74;
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
var _c77=UserInterface.getBinding(node);
if(_c77&&_c77.containingTreeBinding){
this.containingTreeBinding=_c77.containingTreeBinding;
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
var _c78=this.key;
var _c79=this.getProperty("handle");
if(_c79){
_c78=_c79;
}
return _c78;
};
TreeNodeBinding.prototype.setHandle=function(_c7a){
this.setProperty("handle",_c7a);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c7c=this.getProperty("label");
var _c7d=this.getProperty("tooltip");
var _c7e=this.getProperty("oncommand");
var _c7f=this.getProperty("onbindingfocus");
var _c80=this.getProperty("onbindingblur");
var _c81=this.getProperty("focused");
var _c82=this.getProperty("callbackid");
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
if(_c7c!=null){
this.setLabel(_c7c);
}
if(_c7d!=null){
this.setToolTip(_c7d);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c84=this.bindingWindow.WindowManager;
if(_c7e!=null){
this.oncommand=function(){
Binding.evaluate(_c7e,this);
};
}
if(_c7f!=null){
this.onfocus=function(){
Binding.evaluate(_c7f,this);
};
}
if(_c80!=null){
this.onblur=function(){
Binding.evaluate(_c80,this);
};
}
if(_c81==true){
this.focus();
}
if(_c82!=null){
Binding.dotnetify(this,_c82);
}
};
TreeNodeBinding.prototype.handleAction=function(_c85){
TreeNodeBinding.superclass.handleAction.call(this,_c85);
switch(_c85.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c85.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c86,_c87){
var _c88=true;
if(_c86 instanceof TreeNodeBinding){
var _c89=false;
var _c8a=this.bindingElement;
var _c8b=this.containingTreeBinding.bindingElement;
while(!_c89&&_c8a!=_c8b){
if(_c8a==_c86.getBindingElement()){
_c89=true;
}else{
_c8a=_c8a.parentNode;
}
}
if(_c89){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c88=false;
}else{
this.acceptTreeNodeBinding(_c86,_c87);
}
}else{
_c88=false;
}
return _c88;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c8c,_c8d){
var _c8e=_c8c.serializeToString();
var _c8f=new BindingParser(this.bindingDocument);
var _c90=_c8f.parseFromString(_c8e).getFirst();
_c8d=_c8d?_c8d:this.containingTreeBinding.getDropIndex();
var _c91=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c90,_c91.get(_c8d));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c8c.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c92=this.getProperty("image");
var _c93=this.getProperty("image-active");
var _c94=this.getProperty("image-disabled");
_c93=_c93?_c93:this.isContainer?_c92?_c92:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c92?_c92:TreeNodeBinding.DEFAULT_ITEM;
_c94=_c94?_c94:this.isContainer?_c92?_c92:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c92?_c92:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c92=_c92?_c92:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c92,imageHover:null,imageActive:_c93,imageDisabled:_c94});
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
TreeNodeBinding.prototype.setLabel=function(_c96){
this.setProperty("label",String(_c96));
if(this.isAttached){
this.labelBinding.setLabel(String(_c96));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c97){
this.setProperty("tooltip",String(_c97));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c97));
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
var _c98=this.imageProfile.getDefaultImage();
var _c99=this.imageProfile.getActiveImage();
_c99=_c99?_c99:_c98;
return this.isOpen?_c99:_c98;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c9b=DOMEvents.getTarget(e);
var _c9c=this.labelBinding.bindingElement;
var _c9d=this.labelBinding.shadowTree.labelBody;
var _c9e=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c9b){
case _c9c:
this._onAction(e);
break;
case _c9d:
case _c9e:
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
if(_c9b.parentNode==this.bindingElement&&_c9b.__updateType==Update.TYPE_INSERT){
var _c9c=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c9b)=="treenode"){
if(_c9b==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c9b,_c9c.nextSibling);
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
switch(_c9b){
case _c9c:
case _c9d:
case _c9e:
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
var _ca2=true;
if(e.type=="mousedown"){
var _ca3=e.button==(e.target?0:1);
if(!_ca3){
_ca2=false;
}
}
if(_ca2){
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
var _ca5=false;
if(e!=null){
_ca5=e.shiftKey;
}
this.dispatchAction(_ca5?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _ca8=this.getDescendantBindingsByLocalName("treenode");
_ca8.each(function(_ca9){
_ca9.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_caa){
var _cab=_caa.getAttribute("focused");
if(_cab=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_cac){
var _cad=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_cac);
return UserInterface.registerBinding(_cad,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_cae){
var _caf=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_cae);
return UserInterface.registerBinding(_caf,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_cb0){
this.bindingElement.style.left=_cb0.x+"px";
this.bindingElement.style.top=_cb0.y+"px";
this._geometry.x=_cb0.x;
this._geometry.y=_cb0.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_cb1){
var _cb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_cb1);
return UserInterface.registerBinding(_cb2,TreePositionIndicatorBinding);
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
this.addFilter(function(_cb4){
var _cb5=UserInterface.getBinding(_cb4);
var _cb6=null;
var _cb6=null;
if(!_cb5 instanceof TreeNodeBinding){
_cb6=NodeCrawler.SKIP_NODE;
}
return _cb6;
});
this.addFilter(function(_cb7,list){
var _cb9=UserInterface.getBinding(_cb7);
var _cba=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_cb9.isOpen){
list.add(_cb9);
}
break;
}
return _cba;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_cbb){
this.binding=_cbb;
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
DockTabsButtonBinding.newInstance=function(_cbc){
var _cbd=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cbc);
_cbd.setAttribute("type","checkbox");
_cbd.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cbd.className="tabbutton";
return UserInterface.registerBinding(_cbd,DockTabsButtonBinding);
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
var _cbe=DockBinding.superclass.serialize.call(this);
if(_cbe){
_cbe.active=this.isActive?true:null;
_cbe.collapsed=this.isCollapsed?true:null;
}
return _cbe;
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
DockBinding.prototype.interceptDisplayChange=function(_cc0){
var _cc1=this.getSelectedTabPanelBinding();
if(_cc1){
_cc1.isVisible=_cc0;
_cc1.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cc2){
var _cc3=this._getBindingForDefinition(_cc2);
var _cc4=DockTabBinding.newInstance(this.bindingDocument);
_cc4.setHandle(_cc2.handle);
_cc4.setLabel(_cc2.flowHandle?null:_cc2.label);
_cc4.setImage(_cc2.image);
_cc4.setToolTip(_cc2.toolTip);
_cc4.setEntityToken(_cc2.entityToken);
_cc4.setAssociatedView(_cc3);
this.appendTabByBindings(_cc4,null);
this._setupPageBindingListeners(_cc4);
var _cc5=this.getTabPanelBinding(_cc4);
_cc3.snapToBinding(_cc5);
var _cc6=this.bindingWindow.bindingMap.views;
_cc6.add(_cc3);
if(!this.isActive){
this.activate();
}
_cc3.attach();
};
DockBinding.prototype.prepareOpenView=function(_cc7,_cc8){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cc8.setLabel(_cc7.label);
_cc8.setImage(_cc7.image);
_cc8.setToolTip(_cc7.toolTip);
this._setupPageBindingListeners(_cc8);
var _cc9=this.getTabPanelBinding(_cc8);
var _cca=this._getBindingForDefinition(_cc7);
_cc8.setAssociatedView(_cca);
_cca.snapToBinding(_cc9);
UserInterface.getBinding(this.bindingDocument.body).add(_cca);
_cca.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ccb){
var _ccc=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ccc.bindingDocument);
view.setDefinition(_ccb);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cce){
var _ccf=this.getTabPanelBinding(_cce);
var self=this;
var _cd1={handleAction:function(_cd2){
var _cd3=_cd2.target;
switch(_cd2.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cd3.reflex(true);
var view=_cce.getAssociatedView();
if(_cd3.bindingWindow==view.getContentWindow()){
_cce.updateDisplay(_cd3);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cce.onPageInitialize(_cd3);
_cd2.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cce.getAssociatedView();
if(_cd3.bindingWindow==view.getContentWindow()){
_cce.updateDisplay(_cd3);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cce.updateDisplay(_cd3);
_cd2.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cce.updateEntityToken(_cd3);
_cd2.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cce.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cce.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cce);
_cd2.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cce,true);
_cd2.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cce);
break;
case Binding.ACTION_FORCE_REFLEX:
_ccf.reflex(true);
_cd2.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cce.isDirty){
_cce.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cd5){
_ccf.addActionListener(_cd5,_cd1);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cd6){
DockBinding.superclass.handleAction.call(this,_cd6);
var _cd7=_cd6.target;
switch(_cd6.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cd6.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cd7 instanceof DockBinding){
if(_cd7.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cd7);
if(this.isActive){
_cd7.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cd7);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cd8,arg){
DockBinding.superclass.handleBroadcast.call(this,_cd8,arg);
switch(_cd8){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cda=arg;
if(_cda.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cda.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cdb){
var tabs=this.getTabBindings();
var _cdd=false;
while(tabs.hasNext()&&!_cdd){
var tab=tabs.getNext();
var _cdf=tab.getEntityToken();
if(_cdf!=null&&_cdf==_cdb){
if(!tab.isSelected){
this.select(tab,true);
_cdd=true;
}
}
}
};
DockBinding.prototype.collapse=function(_ce0){
this._handleCollapse(true,_ce0);
};
DockBinding.prototype.unCollapse=function(_ce1){
this._handleCollapse(false,_ce1);
};
DockBinding.prototype._handleCollapse=function(_ce2,_ce3){
var _ce4=this.getChildBindingByLocalName("dockpanels");
var _ce5=this.getAncestorBindingByLocalName("splitbox");
if(_ce2){
_ce4.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_ce3&&_ce5.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_ce4.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_ce3){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_ce2);
this.isCollapsed=_ce2;
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
DockBinding.prototype.closeTab=function(_cea,_ceb){
if(_cea.isDirty&&!_ceb){
var _cec=Resolver.resolve(_cea.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cec),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cee){
switch(_cee){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cea);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cea);
break;
}
}});
}else{
this.removeTab(_cea);
}
};
DockBinding.prototype.closeTabsExcept=function(_cef){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cef){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cf2){
var _cf3=_cf2.getAssociatedView();
_cf3.saveContainedEditor();
var self=this;
var _cf5={handleBroadcast:function(_cf6,arg){
switch(_cf6){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cf3.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cf5);
if(arg.isSuccess){
self.removeTab(_cf2);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cf5);
};
DockBinding.prototype.appendTabByBindings=function(_cf8,_cf9){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cf8,_cf9);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cfa){
_cfa=_cfa?_cfa+"px":"100%";
this.bindingElement.style.width=_cfa;
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
var _cfc=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cfc)){
_cfc=_cfc>0?_cfc-1:0;
self.bindingElement.style.width=new String(_cfc)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cfd){
DockTabsBinding.superclass.handleCrawler.call(this,_cfd);
switch(_cfd.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cff=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cff)){
_cff=_cff>0?_cff-1:0;
self.bindingElement.style.width=new String(_cff)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_d00){
var _d01=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_d00);
return UserInterface.registerBinding(_d01,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_d02){
this._viewBinding=_d02;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _d03=DockTabBinding.superclass.serialize.call(this);
if(_d03){
_d03.label=null;
_d03.image=null;
_d03.handle=this.getHandle();
}
return _d03;
};
DockTabBinding.prototype.setHandle=function(_d04){
this.setProperty("handle",_d04);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_d05){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_d05;
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
var _d06=DialogControlBinding.newInstance(this.bindingDocument);
_d06.setControlType(ControlBinding.TYPE_CLOSE);
_d06.attachClassName("closecontrol");
this._controlGroupBinding.add(_d06);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_d07){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_d07){
this.isDirty=_d07;
if(Binding.exists(this.labelBinding)){
var _d08=this.labelBinding.getLabel();
if(_d08!=null){
this.labelBinding.setLabel(_d07?"*"+_d08:_d08.slice(1,_d08.length));
}else{
this.labelBinding.setLabel(_d07?"*":"");
}
}
}
var _d09=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_d09.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_d09.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_d0a){
this.setLabel(_d0a.getLabel());
this.setImage(_d0a.getImage());
this.setToolTip(_d0a.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_d0b){
this.setEntityToken(_d0b.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d0c){
DockTabBinding.superclass.handleAction.call(this,_d0c);
var _d0d=_d0c.target;
switch(_d0c.type){
case ControlBinding.ACTION_COMMAND:
if(_d0d.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d0c.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d0d);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d0e){
var cmd=_d0e.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d10){
if(!_d10){
if(!this.getLabel()){
_d10=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d10=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d10=this.isDirty?"*"+_d10:_d10;
DockTabBinding.superclass.setLabel.call(this,_d10);
};
DockTabBinding.prototype.setImage=function(_d11){
if(!_d11){
if(!this.getImage()){
_d11=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d11=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d11);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d14=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d14;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d14;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d14;
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
var _d16=this.bindingElement;
setTimeout(function(){
_d16.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d17,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d17,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d17){
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
DockTabBinding.prototype.select=function(_d1c){
DockTabBinding.superclass.select.call(this,_d1c);
this._updateBroadcasters();
if(_d1c!=true){
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
var _d1d=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d1e=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d1e.enable();
if(this.isDirty){
_d1d.enable();
}else{
_d1d.disable();
}
}else{
_d1e.disable();
_d1d.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d1f){
if(this._canUpdateTree||_d1f){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d20=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d22=win.bindingMap.savebutton;
if(_d22!=null){
_d20=true;
}
}
}
return _d20;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d23){
var _d24=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d23);
return UserInterface.registerBinding(_d24,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d25){
var _d26=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d25);
return UserInterface.registerBinding(_d26,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d27){
DockPanelBinding.superclass.select.call(this,_d27);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d28){
DockPanelBinding.superclass.handleCrawler.call(this,_d28);
if(_d28.response==null){
if(_d28.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d28.id==FocusCrawler.ID){
_d28.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d29){
var _d2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d29);
return UserInterface.registerBinding(_d2a,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d2b){
var _d2c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d2b);
return UserInterface.registerBinding(_d2c,DockControlBinding);
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
ViewBinding.getInstance=function(_d2d){
var _d2e=ViewBinding._instances.get(_d2d);
if(!_d2e){
var cry="ViewBinding.getInstance: No such instance: "+_d2d;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d2e;
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
var _d31=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d31){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d32=snap.boxObject.getGlobalPosition();
var _d33=snap.boxObject.getDimension();
if(!Point.isEqual(_d32,this._lastknownposition)){
this.setPosition(_d32);
this._lastknownposition=_d32;
}
if(!Dimension.isEqual(_d33,this._lastknowndimension)){
this.setDimension(_d33);
this._lastknowndimension=_d33;
var _d34=_d33.h-ViewBinding.VERTICAL_ADJUST;
_d34=_d34<0?0:_d34;
this.windowBinding.getBindingElement().style.height=new String(_d34)+"px";
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
var _d35=this._viewDefinition.flowHandle;
if(_d35!=null){
FlowControllerService.CancelFlow(_d35);
}
}
if(this._viewDefinition!=null){
var _d36=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d36);
this.logger.fine("ViewBinding closed: \""+_d36+"\"");
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
var _d38=null;
if(this._viewDefinition!=null){
_d38=this._viewDefinition.handle;
}
return _d38;
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
ViewBinding.prototype.setDefinition=function(_d39){
this._viewDefinition=_d39;
if(_d39.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d3a){
ViewBinding.superclass.handleAction.call(this,_d3a);
var _d3b=_d3a.target;
switch(_d3a.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d3a.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d3b.isActivated){
_d3b.onActivate();
}
}
_d3a.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d3b==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d3a.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d3b==this._snapBinding){
if(_d3b.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d3b.getContentWindow().isPostBackDocument){
if(_d3a.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d3b.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d3b==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d3b.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d3a.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d3a.type==WindowBinding.ACTION_ONLOAD){
var win=_d3b.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d3b);
}
}
}
_d3a.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d3b.label&&this._viewDefinition.label){
_d3b.label=this._viewDefinition.label;
}
if(!_d3b.image&&this._viewDefinition.image){
_d3b.image=this._viewDefinition.image;
}
if(_d3b.bindingWindow==this.getContentWindow()){
this._pageBinding=_d3b;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d3b.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d3b==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d3a.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d3a.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d40,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d40,arg);
switch(_d40){
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
var _d44=def.argument;
if(_d44!=null){
page.setPageArgument(_d44);
}
var _d45=def.width;
if(_d45!=null){
page.width=_d45;
}
var _d46=def.height;
if(_d46!=null){
page.height=_d46;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d47){
ViewBinding.superclass.handleCrawler.call(this,_d47);
switch(_d47.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d47.id==FocusCrawler.ID){
if(_d47.previousNode!=this._snapBinding.bindingElement){
_d47.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d47.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d48){
_d48.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d48.x+"px";
this.bindingElement.style.top=_d48.y+"px";
};
ViewBinding.prototype.setDimension=function(_d49){
_d49.h-=ViewBinding.VERTICAL_ADJUST;
_d49.w-=ViewBinding.HORIZONTAL_ADJUST;
_d49.w-=1;
if(_d49.h<0){
_d49.h=0;
}
if(_d49.w<0){
_d49.w=0;
}
this.bindingElement.style.width=String(_d49.w)+"px";
this.bindingElement.style.height=String(_d49.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d4a){
this.isFlexBoxBehavior=false;
_d4a.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d4a.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d4a.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d4a;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d4b=null;
if(this.isFreeFloating==true){
_d4b=this._snapBinding.getBindingElement();
}else{
_d4b=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d4b;
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
ViewBinding.prototype.reload=function(_d4c){
this._isLoaded=false;
this.windowBinding.reload(_d4c);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d4d=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d4d=true;
}
}
if(!_d4d){
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
ViewBinding.newInstance=function(_d51){
var _d52=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d51);
var _d53=UserInterface.registerBinding(_d52,ViewBinding);
_d53.windowBinding=_d53.add(WindowBinding.newInstance(_d51));
return _d53;
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
var _d5b=this.bindingWindow.__doPostBack;
var _d5c=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d5c){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d5d,_d5e){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d5c=true;
}
self.manifestAllDataBindings();
_d5b(_d5d,_d5e);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d5f,list){
var _d61=this.bindingWindow.bindingMap.__REQUEST;
if(_d61!=null&&this._isDotNet()){
switch(_d5f){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d61.postback(_d5f);
}
}
break;
default:
_d61.postback(_d5f);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d5f,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d62,list){
var _d64=this.getDescendantBindingsByType(WindowBinding);
_d64.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d62,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d68){
if(_d68.name==null||_d68.name==""){
return;
}
list.add({name:_d68.name,value:_d68.value});
});
var out="";
list.each(function(_d6a){
out+=_d6a.name+": "+_d6a.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d6b){
PageBinding.superclass.handleAction.call(this,_d6b);
var _d6c=_d6b.target;
switch(_d6b.type){
case RootBinding.ACTION_PHASE_3:
if(_d6c==UserInterface.getBinding(this.bindingDocument.body)){
_d6c.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d6c);
}
_d6b.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d6d=this.validateAllDataBindings();
if(_d6d){
this.doPostBack(_d6c);
}
}
_d6b.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d6b.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d6c.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d6c.key)){
this._initBlockers.del(_d6c.key);
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
var _d6f={handleAction:function(_d70){
if(_d70.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d6f);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d6f);
}else{
MessageQueue.udpdate();
}
_d6b.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d71,arg){
PageBinding.superclass.handleBroadcast.call(this,_d71,arg);
switch(_d71){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d73=arg;
if(!this._canPostBack&&!_d73){
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
PageBinding.prototype.doPostBack=function(_d75){
if(this._canPostBack){
if(_d75!=null&&this._isDotNet()){
var _d76=_d75.getCallBackID();
var _d77=_d75.getCallBackArg();
if(_d76!=null){
_d76=_d76.replace(/_/g,"$");
}else{
_d76="";
}
if(_d77==null){
_d77="";
}
this.bindingWindow.__doPostBack(_d76,_d77);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d78){
var _d79=true;
var _d7a=this.bindingWindow.DataManager.getAllDataBindings();
while(_d7a.hasNext()&&_d79){
var _d7b=_d7a.getNext();
if(_d7b.isAttached){
var _d7c=_d7b.validate();
if(_d79&&!_d7c){
_d79=false;
this.logger.debug("Invalid DataBinding: "+_d7b.toString()+" ("+_d7b.getName()+")");
if(_d78){
var _d7d=_d7b.getAncestorBindingByType(TabPanelBinding);
if(_d7d!=null&&!_d7d.isVisible){
var _d7e=_d7d.getAncestorBindingByType(TabBoxBinding);
var _d7f=_d7e.getTabBinding(_d7d);
_d7e.select(_d7f);
}
}
break;
}
}
}
return _d79;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d81=this.bindingWindow.DataManager.getAllDataBindings();
while(_d81.hasNext()){
var _d82=_d81.getNext();
if(_d82.isAttached){
var _d83=_d82.manifest();
if(_d83!=null){
list.add(_d83);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d84=this.bindingWindow.DataManager.getAllDataBindings();
while(_d84.hasNext()){
var _d85=_d84.getNext();
if(_d85.isAttached){
_d85.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d86="";
if(!_d86&&this.labelfield){
var _d87=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d87!=null&&_d87.getLabel){
_d86=_d87.getLabel();
}else{
if(_d87!=null&&_d87.getValue){
_d86=_d87.getValue();
}
}
}
if(!_d86&&this.label){
_d86=this.label;
}
return _d86;
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
var _d8a=this._cachedFocus.getBinding();
if(_d8a){
_d8a.blur();
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
var _d8b=this.getProperty("width");
if(!_d8b){
_d8b=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d8b;
}
if(this.height==null){
var _d8c=this.getProperty("height");
this.height=_d8c?_d8c:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d8d=this.getProperty("minheight");
if(_d8d!=null){
this.minheight=_d8d;
}
}
if(this.controls==null){
var _d8e=this.getProperty("controls");
this.controls=_d8e?_d8e:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d8f=this.getProperty("resizable");
this.isResizable=_d8f?_d8f:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d90=this.getProperty("image");
var _d91=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d90&&_d91){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d90);
_d91.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d93){
if(_d93!=this.isAutoHeightLayoutMode){
if(_d93){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d93;
}
};
DialogPageBinding.prototype.handleAction=function(_d94){
DialogPageBinding.superclass.handleAction.call(this,_d94);
var _d95=_d94.target;
switch(_d94.type){
case PageBinding.ACTION_ATTACHED:
if(_d95!=this&&_d95.isFitAsDialogSubPage){
_d95.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d94.consume();
if(_d95.response!=null){
this.response=_d95.response;
switch(_d95.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d96){
var _d97=this.bindingWindow.bindingMap.buttonAccept;
if(_d97!=null){
_d97.setDisabled(_d96);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d98){
var _d99=CSSComputer.getPadding(this.bindingElement);
var _d9a=CSSComputer.getBorder(this.bindingElement);
_d98+=_d99.top+_d99.bottom;
_d98+=_d9a.top+_d9a.bottom;
if(_d98>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d98+"px";
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
EditorPageBinding.prototype.handleAction=function(_da2){
EditorPageBinding.superclass.handleAction.call(this,_da2);
var _da3=_da2.target;
switch(_da2.type){
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
var _da4=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_da3.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_da4==-1){
_da4=0;
}
}else{
_da4++;
}
return res;
});
if(_da4>-1){
this._messengers.del(_da4);
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
_da2.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_da3.key,_da3);
if(_da3 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_da3.key);
if(_da3 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_da3==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_da3.getSelectedTabBinding();
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
_da2.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_da3==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_da2.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_da3==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_da2.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_da3==this._windowBinding){
if(_da3.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _da9=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_da9);
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
var _daa=this.bindingWindow.bindingMap.savebutton;
if(_daa!=null&&!_daa.isDisabled){
_daa.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _dab=this.bindingWindow.bindingMap.__REQUEST;
if(_dab!=null){
_dab.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _dac=this.bindingWindow.bindingMap.__REQUEST;
if(_dac!=null){
_dac.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_dad){
this._message=null;
switch(_dad){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_dad,this._messengers);
if(!this._messengers.hasEntries()){
if(_dad==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_dad;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_dad;
EditorPageBinding.superclass.postMessage.call(this,_dad,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_dad,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_dae,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_dae,arg);
switch(_dae){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _db0=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_db0);
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
var _db1=new List();
this._invalidBindings.each(function(key,_db3){
var list=_db3.getInvalidLabels();
if(list){
list.each(function(_db5){
_db1.add(_db5);
});
}
});
if(_db1.hasEntries()){
var _db6="";
while(_db1.hasNext()){
_db6+=_db1.getNext().toLowerCase();
if(_db1.hasNext()){
_db6+=", ";
}else{
_db6+=".";
}
}
var _db7=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_db7+" "+_db6);
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
EditorPageBinding.prototype.enableSave=function(_db8){
var _db9=this.bindingDocument.getElementById("broadcasterCanSave");
if(_db9){
var _dba=UserInterface.getBinding(_db9);
if(_db8){
_dba.enable();
}else{
_dba.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _dbb=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_dbb!=null){
UserInterface.getBinding(_dbb).enable();
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
var _dbc=this._windowBinding.getContentDocument().title;
if(_dbc==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _dbd=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_dbf){
if(_dbf.name=="__EVENTTARGET"&&_dbd){
_dbf.value=_dbd;
}
list.add({name:_dbf.name,value:_dbf.value});
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
var _dc1=this.getProperty("responseid");
this.responseid=_dc1;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dc2){
ResponsePageBinding.superclass.handleAction.call(this,_dc2);
switch(_dc2.type){
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
WizardPageBinding.prototype.handleAction=function(_dc3){
WizardPageBinding.superclass.handleAction.call(this,_dc3);
var _dc4=_dc3.target;
switch(_dc3.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dc4);
}else{
_dc3.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dc4);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dc3.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dc3.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dc5){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dc7=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dc5);
}
if(_dc7){
_dc7.setDisabled(!_dc5);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dc8,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dc8,arg);
var self=this;
switch(_dc8){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dcc){
};
MarkupAwarePageBinding.prototype._activate=function(_dcd){
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
var _dce=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dce.boxObject.getDimension().w;
_dce.hide();
var _dcf=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dcf+"px";
var self=this;
var _dd1=this.bindingWindow.bindingMap.moreactionsbutton;
_dd1.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dd2){
self._showMoreActions();
_dd2.consume();
}});
var _dd3=this.bindingWindow.bindingMap.moreactionspopup;
_dd3.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dd4){
var item=_dd4.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dd6,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dd6,arg);
switch(_dd6){
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
var _dda=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dda!=null){
_dda.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _ddb=this.bindingWindow.WindowManager;
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
var _ddc=new String("");
this._actionProfile.each(function(_ddd,list){
list.each(function(_ddf){
_ddc+=_ddf.getHandle()+";"+_ddf.getKey()+";";
if(_ddf.isDisabled()){
_ddc+="isDisabled='true';";
}
});
});
return _ddc;
};
SystemToolBarBinding.prototype.handleAction=function(_de0){
SystemToolBarBinding.superclass.handleAction.call(this,_de0);
switch(_de0.type){
case ButtonBinding.ACTION_COMMAND:
var _de1=_de0.target;
this._handleSystemAction(_de1.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_de2){
if(_de2!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _de4=list.getFirst();
var _de5=_de4.node;
}
SystemAction.invoke(_de2,_de5);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_de8,list){
var _dea=new List();
list.reset();
while(list.hasNext()){
var _deb=list.getNext();
var _dec=null;
if(_deb.isInToolBar()){
if(_deb.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dec=self.getToolBarButtonBinding(_deb);
}
}
if(_dec!=null){
_dea.add(_dec);
}
}
if(_dea.hasEntries()){
var _ded=ToolBarGroupBinding.newInstance(doc);
_dea.each(function(_dee){
_ded.add(_dee);
});
self.addLeft(_ded);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _def=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _df0=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_df0=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _df1=0;
var _df2=new List();
var _df3,_df4=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_df3=_df4.getNext())!=null){
if(!_df3.isVisible){
_df3.show();
}
_df1+=_df3.boxObject.getDimension().w;
if(_df1>=_df0){
_df2.add(_df3);
_df3.hide();
}
}
if(_df2.hasEntries()){
var _df5=_df2.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_df5).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_df3=_df2.getNext())!=null){
this._moreActions.add(_df3.associatedSystemAction);
}
_def.show();
}else{
this._moreActions=null;
_def.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _df6=this.bindingWindow.bindingMap.moreactionspopup;
_df6.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_df6.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_df6.add(item);
}
_df6.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_df8){
var _df9=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dfa=_df8.getLabel();
var _dfb=_df8.getToolTip();
var _dfc=_df8.getImage();
var _dfd=_df8.isDisabled();
if(_dfc){
_df9.setImage(_dfc);
}
if(_dfa){
_df9.setLabel(_dfa);
}
if(_dfb){
_df9.setToolTip(_dfb);
}
if(_df8.isDisabled()){
_df9.disable();
}
_df9.associatedSystemAction=_df8;
return _df9;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dfe=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dfe!=null){
_dfe.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dff){
var _e00=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dff);
return UserInterface.registerBinding(_e00,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_e01){
this.bindingElement.style.left=_e01.x+"px";
this.bindingElement.style.top=_e01.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_e02){
_e02.h-=ViewBinding.VERTICAL_ADJUST;
_e02.w-=ViewBinding.HORIZONTAL_ADJUST;
_e02.w-=1;
if(_e02.h<0){
_e02.h=0;
}
if(_e02.w<0){
_e02.w=0;
}
this.bindingElement.style.width=String(_e02.w)+"px";
this.bindingElement.style.height=String(_e02.h)+"px";
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
SystemTreeBinding.prototype.add=function(_e03){
var _e04=SystemTreeBinding.superclass.add.call(this,_e03);
if(!this._defaultTreeNode){
if(_e03 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_e03;
}
}
return _e04;
};
SystemTreeBinding.prototype.handleAction=function(_e05){
SystemTreeBinding.superclass.handleAction.call(this,_e05);
var _e06=_e05.target;
switch(_e05.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_e06.key);
this._updateFocusedNode();
_e05.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_e05.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_e06.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_e05.consume();
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
var _e08=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_e08);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_e09){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_e09);
var reg=this._entityTokenRegistry;
var _e0b=_e09.node.getEntityToken();
if(reg.has(_e0b)){
reg.get(_e0b).add(_e09);
}else{
reg.set(_e0b,new List([_e09]));
}
var _e0c=null;
if(this.isLockedToEditor){
if(_e0b==StageBinding.entityToken){
if(_e09.node.isTreeLockEnabled()){
_e0c=_e09;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_e09.node.getHandle()){
_e0c=_e09;
}
}
}
if(_e0c!=null){
this.focusSingleTreeNodeBinding(_e0c);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_e0d){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_e0d);
var reg=this._entityTokenRegistry;
var _e0f=_e0d.node.getEntityToken();
if(reg.has(_e0f)){
var list=reg.get(_e0f);
list.del(_e0d);
if(!list.hasEntries()){
reg.del(_e0f);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_e0d.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_e0d.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e13=this._refreshingTreeNodes;
if(_e13.hasEntries()&&_e13.has(key)){
_e13.del(key);
if(!_e13.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e14=StageBinding.entityToken;
if(_e14!=null){
this._focusTreeNodeByEntityToken(_e14);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e15=false;
var _e16=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e15=false;
}else{
if(_e16.hasEntries()){
_e15=true;
while(_e15&&_e16.hasNext()){
var _e17=_e16.getNext();
if(!_e17.isDraggable){
_e15=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e15;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e18,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e18,arg);
switch(_e18){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e18,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e18);
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
var self=this,_e1c=arg;
setTimeout(function(){
if(_e1c!=null){
self._focusTreeNodeByEntityToken(_e1c);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e1e=tab.perspectiveNode==null;
if(!_e1e){
_e1e=tab.perspectiveNode==this.perspectiveNode;
}
if(_e1e){
var self=this,_e20=tab.getEntityToken();
setTimeout(function(){
if(_e20!=null){
self._focusTreeNodeByEntityToken(_e20);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e21,_e22){
this.isLockFeatureFocus=true;
var _e23=null;
if(this._entityTokenRegistry.has(_e21)){
var list=this._entityTokenRegistry.get(_e21);
list.each(function(tn){
var _e26=true;
if(tn.node.isTreeLockEnabled()){
_e23=tn;
_e26=false;
}
return _e26;
});
if(_e23!=null){
if(!_e23.isFocused){
this.focusSingleTreeNodeBinding(_e23,true);
}else{
_e23.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e23==null&&_e22!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e21);
self._focusTreeNodeByEntityToken(_e21,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e28){
var _e29=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e2a=this.getRootTreeNodeBindings();
while(_e2a.hasNext()){
var _e2b=_e2a.getNext();
_e29.add(_e2b.node.getEntityToken());
}
}else{
_e29.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e29.hasNext()){
var _e2c=_e29.getNext();
var _e2d=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e2c,_e28,_e2d);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e30=this._treeNodeBindings;
var _e31=new Map();
function fix(_e32,list){
if(!_e32.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e30.has(node.getHandle())){
var _e35=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e31.set(node.getHandle(),_e35);
_e32.add(_e35);
}
});
_e32.attachRecursive();
}
}
_e32.open(true);
}
map.each(function(_e36,list){
if(_e30.has(_e36)){
var _e38=_e30.get(_e36);
fix(_e38,list);
}else{
if(_e31.has(_e36)){
var _e39=_e31.get(_e36);
fix(_e39,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e3a,arg){
switch(_e3a){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e3c=arg;
if(_e3c!=null){
this._invokeServerRefresh(_e3c);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e3d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e3d;
_e3d.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e3d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e3d;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e3e){
if(_e3e!=null&&_e3e=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e3e)){
var list=this._entityTokenRegistry.get(_e3e).reset();
this._refreshToken=_e3e;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e40=list.getNext();
this._refreshingTreeNodes.set(_e40.key,true);
setTimeout(function(){
_e40.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e41=this.getFocusedTreeNodeBindings().getFirst();
if(_e41){
var _e42=_e41.getLabel();
var _e43=_e41.getAncestorBindingByLocalName("treenode");
if(_e43){
_e41=_e43;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e41.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e44=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e44,[_e42]);
}
_e41.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e45=SystemTreeBinding.clipboard;
if(_e45){
var type=_e45.dragType;
var _e47=this.getFocusedTreeNodeBindings().getFirst();
if(_e47.dragAccept){
if(_e47.acceptor.isAccepting(type)){
this._performPaste(_e47);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e48){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e48.node.hasDetailedDropSupport()){
if(_e48.node.hasChildren()){
var _e4a=_e48.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e4b,_e4c){
if(_e4b==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e4d=_e4c.get("switch");
var _e4e=_e4c.get("sibling");
if(_e4d=="after"){
_e4e++;
}
var _e4f=_e48.accept(SystemTreeBinding.clipboard,_e4e);
if(_e4f){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e4a);
}else{
Application.lock(self);
var _e50=_e48.accept(SystemTreeBinding.clipboard,0);
if(_e50){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e50=_e48.accept(SystemTreeBinding.clipboard,0);
if(_e50){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e51=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e51!=null){
this._focusTreeNodeByEntityToken(_e51);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e52){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e52){
this.blurSelectedTreeNodes();
var _e53=this.getRootTreeNodeBindings();
_e53.each(function(_e54){
if(_e54.isContainer&&_e54.isOpen){
_e54.close();
_e54.hasBeenOpened=false;
_e54.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e55){
if(_e55!=this.isLockedToEditor){
this.isLockedToEditor=_e55;
if(_e55){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e57=this.getRootTreeNodeBindings();
_e57.each(function(_e58){
var _e59=_e58.getOpenSystemNodes();
if(_e59!=null&&_e59.hasEntries()){
list.merge(_e59);
}else{
if(_e58.isOpen){
list.add(_e58.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e5a){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e5a);
if(_e5a!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e5b){
if(_e5b){
var list=new List(_e5b.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e5d=new Map();
var _e5e=this.getFocusedTreeNodeBindings().getFirst();
var _e5f=_e5e.node.getActionProfile();
if(_e5f!=null){
var self=this;
_e5f.each(function(_e61,list){
var _e63=new List();
list.each(function(_e64){
if(_e64.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e64.getGroupName()]){
_e63.add(_e64);
}
}
});
if(_e63.hasEntries()){
_e5d.set(_e61,_e63);
}
});
}
_e5d.activePosition=this._activePosition;
var _e65=_e5e.node.getPropertyBag();
if(_e65&&_e65.Uri&&_e65.ElementType==="application/x-composite-page"){
_e5d.Uri=_e65.Uri;
}
return _e5d;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e66,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e66,arg);
switch(_e66){
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
var _e6b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e6b.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e6c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e6c.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e6d){
SystemTreePopupBinding.superclass.handleAction.call(this,_e6d);
switch(_e6d.type){
case MenuItemBinding.ACTION_COMMAND:
var _e6e=_e6d.target;
var _e6f=_e6e.associatedSystemAction;
if(_e6f){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e71=list.getFirst();
var _e72=_e71.node;
}
SystemAction.invoke(_e6f,_e72);
}else{
var cmd=_e6e.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e75=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e75=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e75=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e75=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e75=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e75){
setTimeout(function(){
EventBroadcaster.broadcast(_e75);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e76=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e76.hasNext()){
var _e77=UserInterface.getBinding(_e76.getNext());
if(!_e77.getProperty("rel")){
_e77.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e79=new List();
var self=this;
this._actionProfile.each(function(_e7b,list){
var _e7d=MenuGroupBinding.newInstance(doc);
list.each(function(_e7e){
var _e7f=self.getMenuItemBinding(_e7e);
_e7d.add(_e7f);
});
_e79.add(_e7d);
});
_e79.reverse();
while(_e79.hasNext()){
this._bodyBinding.addFirst(_e79.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e80){
var _e81=MenuItemBinding.newInstance(this.bindingDocument);
var _e82=_e80.getLabel();
var _e83=_e80.getToolTip();
var _e84=_e80.getImage();
var _e85=_e80.getDisabledImage();
var _e86=_e80.isCheckBox();
if(_e82){
_e81.setLabel(_e82);
}
if(_e83){
_e81.setToolTip(_e83);
}
if(_e84){
_e81.imageProfile=new ImageProfile({image:_e84,imageDisabled:_e85});
}
if(_e86){
_e81.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e80.isChecked()){
_e81.check(true);
}
}
if(_e80.isDisabled()){
_e81.disable();
}
_e81.associatedSystemAction=_e80;
return _e81;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e8a=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e8a=UserInterface.getBinding(node);
if(_e8a.isDisabled){
_e8a=null;
}
}
break;
}
if(_e8a!=null&&_e8a.node!=null&&_e8a.node.getActionProfile()!=null){
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
var _e8b=this.node.getLabel();
if(_e8b){
this.setLabel(_e8b);
}
var _e8c=this.node.getToolTip();
if(_e8c){
this.setToolTip(_e8c);
}
var _e8d=this.node.getHandle();
if(_e8d){
this.setHandle(_e8d);
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
var _e90="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e90+=list.getNext();
if(list.hasNext()){
_e90+=" ";
}
}
this.setProperty("dragaccept",_e90);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e92){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e92);
switch(_e92.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e92.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e92.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e93,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e93,arg);
switch(_e93){
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
var _e96=null;
var _e97=this.node.getImageProfile();
if(_e97){
if(this.isOpen){
_e96=_e97.getActiveImage();
}else{
_e96=_e97.getDefaultImage();
}
}
if(!_e96){
_e96=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e96;
};
SystemTreeNodeBinding.prototype.open=function(_e98){
var _e99=this.isContainer&&!this.isOpen;
var _e9a=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e99&&(_e9a||SystemTreeBinding.HAS_NO_MEMORY)&&_e98!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e9b=null;
if(this.isContainer){
_e9b=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e9b);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e9d){
if(_e9d!=null){
this._refreshBranch(_e9d);
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
var _e9e=new List();
var _e9f=this.node.getChildren();
this.empty();
if(_e9f.hasEntries()){
this._insertTreeNodesRegulated(_e9f);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_ea0){
var _ea1=0;
var _ea2=new List([]);
while(_ea0.hasEntries()&&_ea1<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _ea3=SystemTreeNodeBinding.newInstance(_ea0.extractFirst(),this.bindingDocument);
_ea3.autoExpand=this.autoExpand;
this.add(_ea3);
_ea3.attach();
_ea1++;
if(this.autoExpand){
if(_ea1==1&&!_ea0.hasEntries()||LocalStore.openedNodes.has(_ea3.node)){
_ea2.add(_ea3);
}
}
}
if(_ea0.hasEntries()){
this._insertBufferTreeNode(_ea0);
}
_ea2.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_ea6){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _ea8=this.node.getDescendantBranch(list);
if(_ea8.hasEntries()){
this.XXX(_ea8);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_ea9){
var self=this;
var map=new Map();
this.empty();
_ea9.each(function(key,_ead){
if(_ead.hasEntries()){
_ead.each(function(node){
var _eaf=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eaf);
if(map.has(key)){
var _eb0=map.get(key);
_eb0.add(_eaf);
_eb0.isOpen=true;
_eb0.hasBeenOpened=true;
node.searchToken=_eb0.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_eaf);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_ea9.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _eb1=new TreeCrawler();
var _eb2=new List();
_eb1.mode=TreeCrawler.MODE_GETOPEN;
_eb1.crawl(this.bindingElement,_eb2);
if(_eb2.hasEntries()){
_eb2.extractFirst();
}
_eb1.dispose();
return _eb2;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _eb3=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_eb3=new List([this.node]);
list.each(function(_eb5){
_eb3.add(_eb5.node);
});
}
return _eb3;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_eb6,_eb7){
var _eb8=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_eb6 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_eb6.node.getData(),this.node.getData(),_eb7?_eb7:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_eb8);
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
SystemTreeNodeBinding.newInstance=function(node,_ebc){
var _ebd=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ebc);
var _ebe=UserInterface.registerBinding(_ebd,SystemTreeNodeBinding);
_ebe.node=node;
return _ebe;
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
SystemPageBinding.prototype.setPageArgument=function(_ebf){
this.node=_ebf;
SystemPageBinding.superclass.setPageArgument.call(this,_ebf);
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
var _ec0=this.node.getChildren();
if(_ec0.hasEntries()){
while(_ec0.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ec0.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ec2=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ec2.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ec4=new TreeCrawler();
var _ec5=new List();
_ec4.mode=TreeCrawler.MODE_GETOPEN;
_ec4.crawl(this.bindingElement,_ec5);
_ec4.dispose();
var list=new List([this.node]);
_ec5.each(function(_ec7){
list.add(_ec7.node);
});
this._tree.empty();
var _ec8=this.node.getDescendantBranch(list);
if(_ec8.hasEntries()){
var self=this;
var map=new Map();
_ec8.each(function(key,_ecc){
_ecc.each(function(node){
var _ece=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ece);
if(map.has(key)){
var _ecf=map.get(key);
_ecf.add(_ece);
_ecf.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ece);
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
SystemPageBinding.prototype.handleAction=function(_ed0){
SystemPageBinding.superclass.handleAction.call(this,_ed0);
switch(_ed0.type){
case ButtonBinding.ACTION_COMMAND:
var _ed1=_ed0.target;
switch(_ed1.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ed1.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ed2,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ed2,arg);
switch(_ed2){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ed4=arg;
if(this.node&&this.node.getEntityToken()==_ed4){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ed4);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ed4);
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
StageContainerBinding.prototype.handleBroadcast=function(_ed6,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ed6,arg);
var _ed8=this.bindingWindow.WindowManager;
switch(_ed6){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ed8.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ed8.WINDOW_RESIZED_BROADCAST:
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
var _eda=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eda.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_edb){
if(StageBinding.isViewOpen(_edb)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_edb);
}else{
var _edc=ViewDefinitions[_edb];
StageBinding.presentViewDefinition(_edc);
}
};
StageBinding.isViewOpen=function(_edd){
return StageBinding.bindingInstance._activeViewDefinitions[_edd]!=null;
};
StageBinding.selectPerspective=function(_ede){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ede);
};
StageBinding.presentViewDefinition=function(_edf){
if(_edf.label!=null){
var _ee0=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ee0,[_edf.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_edf);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ee2,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ee4=System.getPerspectiveNodes();
if(_ee4.hasEntries()){
this._initializeSystemViewDefinitions(_ee4);
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
var _ee6=null;
if(LocalStore.isEnabled){
_ee6=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ee6&&ViewDefinitions[_ee6]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ee6));
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
var _ee8=root.getActionProfile();
if(_ee8&&_ee8.hasEntries()){
var _ee9=top.app.bindingMap.toolsmenugroup;
if(_ee9){
_ee8.each(function(_eea,list){
list.each(function(_eec){
var item=MenuItemBinding.newInstance(_ee9.bindingDocument);
item.setLabel(_eec.getLabel());
item.setToolTip(_eec.getToolTip());
item.setImage(_eec.getImage());
item.setDisabled(_eec.isDisabled());
item.associatedSystemAction=_eec;
var _eee=_ee9;
var tag=_eec.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_eee=top.app.bindingMap.translationsmenugroup;
break;
}
}
_eee.add(item);
});
});
_ee9.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ef0){
while(_ef0.hasNext()){
var node=_ef0.getNext();
var _ef2=node.getHandle();
ViewDefinitions[_ef2]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ef3){
StageBinding.superclass.handleAction.call(this,_ef3);
var _ef4=_ef3.target;
switch(_ef3.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ef4;
this._inflateBinding(_ef4);
_ef3.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ef4;
this._inflateBinding(_ef4);
_ef3.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ef3.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ef4 instanceof DockBinding){
switch(_ef4.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ef4.reference,_ef4);
break;
}
this.handleAttachedDock(_ef4);
_ef3.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ef4 instanceof DockBinding){
this.handleSelectedDockTab(_ef4.getSelectedTabBinding());
_ef3.consume();
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
_ef3.consume();
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
_ef3.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ef3);
};
StageBinding.prototype.handleBroadcast=function(_ef6,arg){
StageBinding.superclass.handleBroadcast.call(this,_ef6,arg);
switch(_ef6){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ef8=arg;
this._dontView(_ef8);
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
StageBinding.prototype._showStart=function(_efa){
if(_efa!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _efd=this.bindingWindow.bindingMap.maindecks;
if(_efa){
_efd.select("startdeck");
view.show();
}else{
view.hide();
_efd.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_efa;
}
};
StageBinding.prototype._inflateBinding=function(_efe){
for(var _eff in ViewDefinitions){
var _f00=ViewDefinitions[_eff];
if(_f00 instanceof SystemViewDefinition){
_efe.mountDefinition(_f00);
}
}
var _f01=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_f01){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f04=new StageCrawler();
_f04.mode=mode;
_f04.crawl(this.bindingElement);
_f04.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_f05){
var _f06=_f05.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_f06);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_f06));
}
};
StageBinding.prototype.handleAttachedDock=function(_f07){
var _f08=_f07.getTabBindings();
if(_f08.hasEntries()){
while(_f08.hasNext()){
var _f09=_f08.getNext();
var _f0a=_f09.getHandle();
if(_f0a){
if(_f0a=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _f0b=ViewDefinitions[_f0a];
if(_f0b){
this._view(_f07,_f09,_f0b,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_f0a+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_f0c){
var _f0d=null;
var _f0e=false;
switch(_f0c.position){
case Dialog.MODAL:
_f0d=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_f0d=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_f0c.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_f0d=this._dockBindings.get(_f0c.position);
break;
case DockBinding.EXTERNAL:
window.open(_f0c.url);
_f0e=true;
break;
default:
var _f0f=this._decksBinding.getSelectedDeckBinding();
_f0d=_f0f.getDockBindingByReference(_f0c.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _f10=this.bindingWindow.bindingMap.maindecks;
_f10.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_f0e=true;
}
break;
}
if(!_f0e){
if(_f0d!=null){
this._view(_f0d,null,_f0c,true);
}else{
throw "StageBinding: Could not position view: "+_f0c.handle;
}
}
};
StageBinding.prototype._view=function(_f11,_f12,_f13,_f14){
var _f15=_f13.handle;
if(_f13.isMutable){
_f15+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f15]){
var _f16=ViewBinding.getInstance(_f15);
if(_f16!=null){
_f16.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f15);
}
}else{
this._activeViewDefinitions[_f15]=_f13;
Application.lock(this);
switch(_f11.constructor){
case DockBinding:
if(_f14){
_f11.prepareNewView(_f13);
}else{
_f11.prepareOpenView(_f13,_f12);
}
break;
case StageDialogBinding:
if(_f14){
_f11.prepareNewView(_f13);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f17){
if(this._activeViewDefinitions[_f17]!=null){
delete this._activeViewDefinitions[_f17];
}else{
this.logger.debug("Could not unregister active view: "+_f17);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f18){
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
this.addFilter(function(_f1a){
var _f1b=UserInterface.getBinding(_f1a);
var _f1c=null;
if(_f1b){
switch(_f1b.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f1b.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f1b.handleUnMaximization();
break;
}
break;
case DockBinding:
_f1c=NodeCrawler.SKIP_NODE;
break;
}
}
return _f1c;
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
var _f1d=null;
this._dialogs.each(function(_f1e){
if(!_f1e.isVisible){
_f1d=_f1e;
}
return _f1d!=null;
});
if(!_f1d){
this._newInstance();
_f1d=this._dialogs.getLast();
}
_f1d.setModal(false);
return _f1d;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f1f=this.getInstance();
_f1f.setModal(true);
return _f1f;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f20=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f20);
_f20.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f21){
if(_f21 instanceof DialogViewDefinition){
var _f22=ViewBinding.newInstance(this.bindingDocument);
_f22.setDefinition(_f21);
_f22.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f21.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f21.handler)){
this._dialogResponseHandler=_f21.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f22;
this._body.add(_f22);
_f22.attach();
_f22.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f23){
StageDialogBinding.superclass.handleAction.call(this,_f23);
var _f24=_f23.target;
switch(_f23.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f24);
_f23.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f24.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f23.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f24.response){
this._handleDialogPageResponse(_f24);
}
_f23.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f23.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f23.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f23.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f23.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f23.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f23.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f23.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f23.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f24==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f25,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f25,arg);
switch(_f25){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f27){
var _f28=new FitnessCrawler();
var list=new List();
if(_f27){
_f28.mode=FitnessCrawler.MODE_BRUTAL;
}
_f28.crawl(this.bindingElement,list);
_f28.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f2a){
_f2a.fit(_f27);
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
var _f2b=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f2b){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f2d){
var cmd=_f2d.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f2f){
if(_f2f.bindingDocument==this._viewBinding.getContentDocument()){
if(_f2f instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f2f);
}
this._pageBinding=_f2f;
if(_f2f.height=="auto"){
_f2f.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f2f);
_f2f.enableAutoHeightLayoutMode(false);
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
if(_f2f.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f2f);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f30){
var _f31=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f31){
var _f32=UserInterface.getBinding(_f31);
_f32.setDisabled(_f30);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f33){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f33.response,_f33.result!=null?_f33.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f35){
if(_f35.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f35);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f37){
switch(_f37.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f37.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f37.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f38){
var _f39=_f38.label;
var _f3a=_f38.image;
var _f3b=_f38.width;
var _f3c=_f38.height;
var _f3d=_f38.controls;
var _f3e=_f38.isResizable;
if(_f39){
this.setLabel(_f39);
}
if(_f3a){
this.setImage(_f3a);
}
if(_f3b||_f3c){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f3b?_f3b:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f3c!=null&&_f3c!="auto")?_f3c:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f3d){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f42=new List(_f3d.split(" "));
while((type=_f42.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f3e!=this._isResizable){
this.setResizable(_f3e);
}
if(_f3c=="auto"){
this._fixAutoHeight(_f38);
}
if(_f38==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f43){
var dim=this.getDimension();
var _f45=0;
var _f46=0;
if(_f43.isDialogSubPage){
_f43=this._pageBinding;
}
if(this._isFirstPage){
_f45=_f43.width!=null?_f43.width:dim.w;
}else{
_f45=dim.w;
}
_f46=_f43.bindingElement.offsetHeight;
_f46+=this._titlebar.bindingElement.offsetHeight;
_f46+=4;
_f46+=4;
if(_f46<dim.h){
_f46=dim.h;
}
if(_f43.minheight!=null){
if(_f46<_f43.minheight){
_f46=_f43.minheight;
}
}
this.setDimension(new Dimension(_f45,_f46));
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
StageDialogBinding.newInstance=function(_f49){
var _f4a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f49);
var _f4b=UserInterface.registerBinding(_f4a,StageDialogBinding);
_f4b.setProperty("controls","minimize maximize close");
return _f4b;
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
this.addFilter(function(_f4c,list){
var _f4e=null;
var _f4f=UserInterface.getBinding(_f4c);
if(!_f4f.isVisible){
_f4e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f4e;
});
this.addFilter(function(_f50,list){
var _f52=null;
var _f53=UserInterface.getBinding(_f50);
if(_f53.isAttached){
if(Interfaces.isImplemented(IFit,_f53)){
if(!_f53.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f53);
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
StageDecksBinding.prototype.mountDefinition=function(_f54){
var _f55=StageDeckBinding.newInstance(this.bindingDocument);
_f55.handle=_f54.handle;
_f55.perspectiveNode=_f54.node;
_f55.definition=_f54;
this._decks[_f55.handle]=_f55;
this.add(_f55);
_f55.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f56){
var _f57=this._decks[_f56];
StageBinding.perspectiveNode=_f57.perspectiveNode;
this.select(_f57);
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
StageDeckBinding.prototype.handleAction=function(_f58){
StageDeckBinding.superclass.handleAction.call(this,_f58);
var _f59=_f58.target;
switch(_f58.type){
case WindowBinding.ACTION_LOADED:
if(_f59==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f5a=this.windowBinding.getContentDocument();
var _f5b=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f5c=ViewBinding.newInstance(_f5a);
_f5c.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f5d=ViewDefinitions["Composite.Management.Browser"];
_f5d.argument["SystemViewDefinition"]=this.definition;
_f5c.setDefinition(_f5d);
_f5b.add(_f5c);
_f5c.attach();
_f5c.initialize();
this._viewBinding=_f5c;
_f58.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f59 instanceof DockBinding){
this._dockBindings.set(_f59.reference,_f59);
_f59.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f58.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f58.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f58);
StageDeckBinding.superclass.handleAction.call(this,_f58);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f5f=new StageCrawler();
_f5f.mode=mode;
_f5f.crawl(this.windowBinding.getContentDocument().body);
_f5f.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f60){
return this._dockBindings.get(_f60);
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
StageDeckBinding.newInstance=function(_f62){
var _f63=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f62);
var _f64=UserInterface.registerBinding(_f63,StageDeckBinding);
return _f64;
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
StageSplitBoxBinding.prototype.handleAction=function(_f65){
StageSplitBoxBinding.superclass.handleAction.call(this,_f65);
StageBoxAbstraction.handleAction.call(this,_f65);
var _f66=_f65.target;
var _f67=null;
var _f68=null;
switch(_f65.type){
case DockBinding.ACTION_EMPTIED:
_f68=this.getChildBindingByLocalName("splitter");
if(_f68.isVisible){
_f68.hide();
}
_f67=this.getDescendantBindingsByLocalName("dock");
if(_f67.getFirst().isEmpty&&_f67.getLast().isEmpty){
if(_f67.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f65.consume();
break;
case DockBinding.ACTION_OPENED:
_f67=this.getDescendantBindingsByLocalName("dock");
if(!_f67.getFirst().isEmpty&&!_f67.getLast().isEmpty){
_f68=this.getChildBindingByLocalName("splitter");
if(!_f68.isVisible){
_f68.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f65.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f66!=this){
_f68=this.getChildBindingByLocalName("splitter");
if(_f68.isVisible){
_f68.hide();
}
this.invokeLayout();
_f65.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f66!=this){
var _f69=this.getChildBindingsByLocalName("splitpanel");
if(_f69.getFirst().isVisible&&_f69.getLast().isVisible){
_f68=this.getChildBindingByLocalName("splitter");
if(!_f68.isVisible){
_f68.show();
}
}
this.invokeLayout();
_f65.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f6a){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f6a);
switch(_f6a.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f6a.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f6b=this.getChildBindingsByLocalName("splitpanel");
return _f6b.getFirst().isVisible&&_f6b.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f6c=this.getChildBindingsByLocalName("splitpanel");
return _f6c.getFirst().isFixed&&_f6c.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f6d){
StageSplitPanelBinding.superclass.handleAction.call(this,_f6d);
StageBoxAbstraction.handleAction.call(this,_f6d);
switch(_f6d.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f6d.type==StageSplitBoxBinding.ACTION_HIDE){
_f6d.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f6d.type==DockBinding.ACTION_EMPTIED){
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
if(_f6d.type==StageSplitBoxBinding.ACTION_SHOW){
_f6d.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f70=_f6d.target;
if(_f70!=this&&_f70.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f71=_f70._containingSplitBoxBinding;
if(_f71.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f72=_f71.getChildBindingsByLocalName("splitpanel");
var _f73=_f72.getFirst();
var _f74=_f72.getLast();
if(this.isFixed==true){
if(!_f73.isFixed||!_f74.isFixed||(!_f71.hasBothPanelsVisible()&&_f70.isMinimizedForReal)){
this.setFix(false);
_f6d.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f71.hasBothPanelsFixed()||(!_f71.hasBothPanelsVisible()&&_f70.isMinimizedForReal)){
this.setFix(_f70.getContainedDock().getHeight());
_f6d.consume();
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
var _f75=this.getContainedDock();
if(_f75){
if(this.isMaximizePrepared==true){
}else{
_f75.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f76=this.getContainedDock();
if(_f76){
if(_f76.type==DockBinding.TYPE_EDITORS){
if(_f76.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f76.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f77=this.getContainedDock();
if(_f77){
_f77.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f77);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f78=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f79=this.getContainedDock();
if(_f79){
_f79.collapse(_f78);
if(!_f78){
this.setFix(_f79.getHeight());
}else{
this.setFix(_f79.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f79&&_f79.isActive){
_f79.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f79);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f7a){
var _f7b=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f7c=this.getContainedDock();
if(_f7c){
if(this.isMinimized==true){
_f7c.unCollapse(_f7b);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f7a){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f7c){
_f7c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f7c);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f7d){
var _f7e=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f7e=false;
}
}
if(_f7e==true){
this._invisibilize(_f7d);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f80){
if(_f80!=this._isInvisibilized){
if(_f80){
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
StageSplitterBinding.prototype.onDragStart=function(_f81){
var _f82=top.app.bindingMap.stagesplittercover;
var _f83=this._containingSplitBoxBinding.getOrient();
switch(_f83){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f82.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f82.bindingElement.style.cursor="n-resize";
break;
}
_f82.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f83);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f89){
this._orient=_f89;
this.attachClassName(_f89);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f8b=true;
var _f8c=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f8c=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f8b=false;
break;
}
if(_f8b){
this.bindingElement.style.left=pos.x+"px";
}
if(_f8c){
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
StageBoxAbstraction.handleAction=function(_f8e){
switch(_f8e.type){
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
if(_f8e.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f8e.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f8f=this.bindingElement.style;
_f8f.position="absolute";
_f8f.width="100%";
_f8f.height="100%";
_f8f.top="0";
_f8f.left="0";
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
var _f90=this.bindingElement.style;
_f90.position="relative";
_f90.width="auto";
_f90.height="auto";
_f90.top="auto";
_f90.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f91,_f92){
var _f93=_f91.bindingElement.style;
var _f94=_f91.bindingElement.parentNode;
var box=_f91._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f92){
_f91._unmodifiedFlexMethod=_f91.flex;
_f91.flex=function(){
_f93.width=_f94.offsetWidth+"px";
_f93.height=_f94.offsetHeight+"px";
};
}else{
_f93.width="100%";
_f93.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f93.width="auto";
_f93.height="auto";
box.reflex(true);
},0);
}
_f91.flex=_f91._unmodifiedFlexMethod;
_f91._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f96){
var _f97=_f96.target;
switch(_f96.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f97 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f96);
_f96.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f96.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f98){
var mode=null;
switch(_f98.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f9a){
StageMenuBarBinding.superclass.handleAction.call(this,_f9a);
switch(_f9a.type){
case MenuItemBinding.ACTION_COMMAND:
var _f9b=_f9a.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f9b){
SystemAction.invoke(_f9b,this._rootNode);
}
}
_f9a.consume();
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
var _f9c=this.getProperty("handle");
if(_f9c){
this._handle=_f9c;
if(StageBinding.isViewOpen(_f9c)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f9c);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f9e){
this.setProperty("handle",_f9e);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f9f,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f9f,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f9f){
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
StageViewMenuItemBinding.newInstance=function(_fa1){
var _fa2=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_fa1);
UserInterface.registerBinding(_fa2,StageViewMenuItemBinding);
return UserInterface.getBinding(_fa2);
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
StageStatusBarBinding.prototype.setLabel=function(_fa3){
this._label.setLabel(_fa3);
};
StageStatusBarBinding.prototype.setImage=function(_fa4){
this._label.setImage(_fa4);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_fa5){
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
var _fa6=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _fa7=_fa6._viewBinding;
var _fa8=_fa7.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _fa9=_fa8.getFocusedTreeNodeBindings();
if(!_fa9.hasEntries()&&StageBinding.treeSelector){
_fa9=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _fa9;
};
ExplorerBinding.saveFocusedNodes=function(){
var _faa=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_faa.each(function(_fab){
LocalStore.focuseNodes.add(_fab.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _fac=LocalStore.focuseNodes.getEntityTokens();
var _fad=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _fae=_fad.getAssociatedView();
var _faf=_fae.getContentWindow().bindingMap.tree;
_fac=new List(TreeService.GetCurrentLocaleEntityTokens(_fac.toArray()));
_fac.each(function(_fb0){
_faf._focusTreeNodeByEntityToken(_fb0);
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
ExplorerBinding.prototype.handleAction=function(_fb1){
ExplorerBinding.superclass.handleAction.call(this,_fb1);
var _fb2=_fb1.target;
switch(_fb1.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_fb1.consume();
break;
case Binding.ACTION_DRAG:
if(_fb2 instanceof ExplorerSplitterBinding){
_fb2.dragger.registerHandler(this);
}
_fb1.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_fb4){
this._menuBinding.setSelectionByHandle(_fb4);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fb5){
if(_fb5 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fb5);
this._menuBinding.mountDefinition(_fb5);
}
};
ExplorerBinding.prototype.onDragStart=function(_fb6){
var _fb7=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fb7.hasEntries()){
var _fb8=_fb7.getFirst();
this._dragStart=_fb8.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fb8.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fbc){
if(_fbc instanceof SystemViewDefinition){
var _fbd=ViewBinding.newInstance(this.bindingDocument);
_fbd.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fbd.setDefinition(_fbc);
var _fbe=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fbe.setAssociatedView(_fbd);
this._decks[_fbc.handle]=_fbe;
_fbe.add(_fbd);
this.add(_fbe);
function attach(){
_fbe.attach();
_fbd.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fbf){
var _fc0=this._decks[_fbf];
this.select(_fc0);
};
DecksBinding.prototype.expandBy=function(_fc1){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fc3=this.bindingElement.offsetHeight+_fc1;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fc3+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fc5){
var _fc6=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fc5);
return UserInterface.registerBinding(_fc6,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fc7){
this._viewBinding=_fc7;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fc8=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fc9=this._viewBinding.getDefinition().label;
StatusBar.busy(_fc8,[_fc9]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fca){
ExplorerDeckBinding.superclass.handleAction.call(this,_fca);
var _fcb=_fca.target;
switch(_fca.type){
case PageBinding.ACTION_INITIALIZED:
if(_fcb instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fcb.node.getEntityToken();
this._handle=_fcb.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fcc,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fcc,arg);
switch(_fcc){
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
var _fce=null;
if(this._isExplorerDeckBindingInitialized){
_fce=this._viewBinding.getDefinition().label;
}else{
_fce=DockTabBinding.LABEL_TABLOADING;
}
return _fce;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fcf=null;
if(this._isExplorerDeckBindingInitialized){
_fcf=this._viewBinding.getDefinition().image;
}else{
_fcf=DockTabBinding.IMG_TABLOADING;
}
return _fcf;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fd0=null;
if(this._isExplorerDeckBindingInitialized){
_fd0=this._viewBinding.getDefinition().toolTip;
}
return _fd0;
};
ExplorerDeckBinding.newInstance=function(_fd1){
var _fd2=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fd1);
return UserInterface.registerBinding(_fd2,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fd3){
switch(_fd3.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fd3.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fd3);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fd4){
this._minButtons.set(_fd4.handle,this._mountMinButton(_fd4));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fd5){
var _fd6=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fd6.setLabel(_fd5.label);
_fd6.setToolTip(_fd5.label);
_fd6.handle=_fd5.handle;
_fd6.node=_fd5.node;
this._minGroup.add(_fd6);
this._minList.add(_fd6);
_fd6.attach();
return _fd6;
};
ExplorerMenuBinding.prototype.handleAction=function(_fd7){
ExplorerMenuBinding.superclass.handleAction.call(this,_fd7);
switch(_fd7.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fd8=_fd7.target;
var _fd9=_fd8.getCheckedButtonBinding();
var _fda=_fd9.handle;
this._selectedHandle=_fda;
this._selectedTag=_fd9.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fd7.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fdb,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fdb,arg);
switch(_fdb){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fdd){
var _fde=this._minButtons.get(_fdd);
if(_fde){
_fde.check();
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
ExplorerToolBarBinding.newInstance=function(_fdf){
var _fe0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fdf);
return UserInterface.registerBinding(_fe0,ExplorerToolBarBinding);
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
var _fe1=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fe2=_fe1?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fe2);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fe3,_fe4){
var _fe5="ui:explorertoolbarbutton";
var _fe6=DOMUtil.createElementNS(Constants.NS_UI,_fe5,_fe3);
var _fe7=UserInterface.registerBinding(_fe6,ExplorerToolBarButtonBinding);
_fe7.explorerToolBarButtonType=_fe4;
return _fe7;
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
EditorBinding.invokeFunctionEditorDialog=function(_fe8,_fe9,type){
type=type?type:"";
var _feb=FunctionService.GetCustomEditorSettingsByMarkup(_fe8);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_feb){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_feb.Width?(_feb.Width>dim.w?dim.w:_feb.Width):undefined;
def.height=_feb.Height?(_feb.Height>dim.h?dim.h:_feb.Height):undefined;
if(_feb.Url){
_feb.Url=_feb.Url.indexOf("?")>-1?_feb.Url+"&consoleId="+Application.CONSOLE_ID:_feb.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fe9;
def.argument={url:_feb?_feb.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fe8}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fee,_fef){
var _ff0=EditorBinding._components;
var _ff1=EditorBinding._editors;
var key=_fef.key;
var _ff3=Interfaces.isImplemented(IWysiwygEditorComponent,_fee);
if(!_ff3){
_ff3=Interfaces.isImplemented(ISourceEditorComponent,_fee);
}
if(_ff3){
if(_ff1.has(key)){
_ff1.get(key).initializeEditorComponent(_fee);
}else{
if(!_ff0.has(key)){
_ff0.set(key,new List());
}
_ff0.get(key).add(_fee);
}
}else{
throw "Editor component interface not implemented: "+_fee;
}
};
EditorBinding.claimComponents=function(_ff4,_ff5){
var _ff6=EditorBinding._components;
var _ff7=EditorBinding._editors;
var key=_ff5.key;
_ff7.set(key,_ff4);
var list=null;
if(_ff6.has(key)){
list=_ff6.get(key).copy();
_ff6.del(key);
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
var _ffb=this.getProperty("value");
if(_ffb!=null){
_ffb=decodeURIComponent(_ffb);
this._startContent=_ffb;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _ffd=this.bindingWindow.DataManager;
_ffd.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fff){
var _1000=EditorBinding.claimComponents(this,_fff);
if(_1000!=null){
while(_1000.hasNext()){
this.initializeEditorComponent(_1000.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _1002=this.bindingWindow.DataManager;
if(_1002.getDataBinding(name)){
_1002.unRegisterDataBinding(name);
}
_1002.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _1003=this.getEditorDocument();
if(_1003!=null){
Application.framework(_1003);
DOMEvents.addEventListener(_1003,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_1003,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_1003,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_1003,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_1005){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_1005==true){
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
var _1007=this.getCheckSum();
if(_1007!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_1007;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _1008=null;
if(Binding.exists(this._pageBinding)){
_1008=this._pageBinding.getCheckSum(this._checksum);
}
return _1008;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _100a=DOMEvents.getTarget(e);
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
if(_100a.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_100c,arg){
EditorBinding.superclass.handleBroadcast.call(this,_100c,arg);
var _100e=null;
switch(_100c){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _100f=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_100f=false;
}
}
}else{
_100e=DOMEvents.getTarget(arg);
if(_100e&&_100e.ownerDocument==this.getEditorDocument()){
_100f=false;
}
}
if(_100f){
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
EditorBinding.prototype._activateEditor=function(_1010){
if(_1010!=this._isActivated){
this._isActivated=_1010;
EditorBinding.isActive=_1010;
var _1011=this.getEditorWindow().standardEventHandler;
var _1012=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1012!=null){
if(_1010){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1012.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_1011.enableNativeKeys(true);
}else{
_1012.disable();
_1011.disableNativeKeys();
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
var _1014=false;
try{
var _1015=this.getEditorWindow().getSelection();
if(_1015!=null){
_1014=_1015.toString().length>0;
if(!_1014){
var range=_1015.getRangeAt(0);
var frag=range.cloneContents();
var _1018=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1018.appendChild(frag.firstChild);
}
var img=_1018.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1014=true;
}
}
}
}
}
catch(exception){
}
return _1014;
};
EditorBinding.prototype.isCommandEnabled=function(_101a){
var _101b=true;
switch(_101a){
case "Cut":
case "Copy":
case "Paste":
_101b=this.getEditorDocument().queryCommandEnabled(_101a);
break;
}
return _101b;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _101f=false;
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
_101f=true;
}
break;
}
return _101f;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1022=this.getContentWindow().bindingMap.toolbar;
var _1023=_1022.getButtonForCommand(cmd);
if(!_1023){
throw "No button for command "+cmd;
}
return _1023;
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
EditorBinding.prototype.handleAction=function(_1027){
EditorBinding.superclass.handleAction.call(this,_1027);
var _1028=_1027.target;
var self=this;
var _102a=this.shadowTree.iframe;
switch(_1027.type){
case Binding.ACTION_DIRTY:
if(_1027.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_102b){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_102b);
};
EditorBinding.prototype.handleElement=function(_102c){
return true;
};
EditorBinding.prototype.updateElement=function(_102d){
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
var _1030=this._menuGroups[rel];
if(_1030 instanceof List){
_1030.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1033=this._menuGroups[rel];
if(_1033 instanceof List){
_1033.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1035){
EditorPopupBinding.superclass.handleAction.call(this,_1035);
var _1036=_1035.target;
if(_1035.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1036.getProperty("cmd");
var gui=_1036.getProperty("gui");
var val=_1036.getProperty("val");
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
var _103a=this.bindingWindow.bindingMap.tinywindow;
var _103b=this.bindingWindow.bindingMap.codepresswindow;
if(_103a){
EditorBinding.registerComponent(this,_103a);
}else{
if(_103b){
EditorBinding.registerComponent(this,_103b);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_103c,_103d,_103e,theme){
this._editorBinding=_103c;
this._tinyEngine=_103d;
this._tinyInstance=_103e;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1040,frame,_1042){
this._editorBinding=_1040;
this._codePressFrame=frame;
this._codePressEngine=_1042;
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
var _1045=this._editorBinding;
if(_1045!=null){
var self=this;
var _1047={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1045.hasBookmark()){
_1045.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1045.hasBookmark()){
_1045.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1047);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1047);
}
};
EditorClickButtonBinding.newInstance=function(_1049){
var _104a=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1049);
return UserInterface.registerBinding(_104a,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_104b){
var _104c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_104b);
return UserInterface.registerBinding(_104c,EditorToolBarButtonBinding);
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
var _104d=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_104d);
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
EditorSelectorBinding.prototype.initializeComponent=function(_104e,_104f,_1050,theme){
this._editorBinding=_104e;
this._tinyEngine=_104f;
this._tinyInstance=_1050;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1052){
EditorSelectorBinding.superclass.handleAction.call(this,_1052);
switch(_1052.type){
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
EditorMenuItemBinding.newInstance=function(_1056){
var _1057=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1056);
return UserInterface.registerBinding(_1057,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1058){
var i=0,_105a,_105b=[],split=_1058.split(" ");
while((_105a=split[i++])!=null){
if(_105a.length>=3&&_105a.substring(0,3)=="mce"){
continue;
}else{
if(_105a.length>=14&&_105a.substring(0,14)=="compositemedia"){
continue;
}
}
_105b.push(_105a);
}
return _105b.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_105d){
var _105e=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_105d);
if(soap instanceof SOAPFault){
}else{
_105e=soap.XhtmlFragment;
if(!_105e){
_105e="";
}
}
WebServiceProxy.isFaultHandler=true;
return _105e;
};
VisualEditorBinding.getTinyContent=function(_1060,_1061){
var _1062=null;
if(_1060==null||!_1060.replace(/\s*/gm,"").length){
_1060=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1061.getSoapTinyContent(_1060);
if(soap instanceof SOAPFault){
var _1064=soap;
var _1065={handleDialogResponse:function(){
_1061.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1065,_1064);
}else{
_1062=soap.XhtmlFragment;
if(_1062==null){
_1062=new String("");
}
_1062=_1062.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1062;
};
VisualEditorBinding.isImage=function(_1066){
return _1066&&_1066.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1067){
return VisualEditorBinding.isImage(_1067)&&!VisualEditorBinding.isReservedElement(_1067);
};
VisualEditorBinding.isReservedElement=function(_1068){
if(VisualEditorBinding.isFunctionElement(_1068)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1068)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1068)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1069){
return VisualEditorBinding.isImage(_1069)&&CSSUtil.hasClassName(_1069,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_106a){
return VisualEditorBinding.isImage(_106a)&&CSSUtil.hasClassName(_106a,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_106b){
return VisualEditorBinding.isImage(_106b)&&CSSUtil.hasClassName(_106b,VisualEditorBinding.HTML_CLASSNAME);
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
var _106c=this.getProperty("embedablefieldstypenames");
if(_106c!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_106c);
}
var _106d=this.getProperty("formattingconfiguration");
if(_106d!=null){
this._url+="?config="+_106d;
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
VisualEditorBinding.prototype.handleBroadcast=function(_106e,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_106e,arg);
var _1070=this.getContentWindow().bindingMap.tinywindow;
var _1071=_1070.getContentWindow();
switch(_106e){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1071){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1070);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1072){
_1072.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1073=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1073.replace(/\s*/gm,"").length==0){
_1073=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1073,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1074){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1074);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1076=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1076=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1076=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1076;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1079){
var _107a=_1079;
if(!this._isNormalizedDocument(_1079)){
_107a=this._getHtmlMarkup().replace("${body}",_1079);
}
return _107a;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_107b){
var _107c=false;
var doc=XMLParser.parse(_107b,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_107c=true;
}
}
if(Client.isWebKit){
if(_107b.indexOf("<html")!==0){
_107c=false;
}
}
return _107c;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1081=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1081){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1081=true;
}
return _1081;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1083=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1083);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1085){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1085,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1087){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1087,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _108a=CSSComputer.getPadding(body);
var _108b=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_108b.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_108e){
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
VisualEditorPopupBinding.prototype.configure=function(_108f,_1090,_1091){
var _1092=this.editorBinding.hasSelection();
this.tinyInstance=_108f;
this.tinyEngine=_1090;
this.tinyElement=_1091;
this.hasSelection=_1092;
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
var _1096=false;
if(this.hasSelection){
_1096=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1096=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1096=true;
}
}
}
}
if(_1096){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1097=this.getMenuItemForCommand("compositeInsertLink");
var _1098=this.getMenuItemForCommand("unlink");
var _1099=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _109a=this.editorBinding.getButtonForCommand("unlink");
_1098.setDisabled(_109a.isDisabled);
if(_1098.isDisabled){
_1097.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1097.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _109b=this.editorBinding.embedableFieldConfiguration;
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
if(_109b){
var _109e=_109b.getGroupNames();
if(_109e.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_109e.each(function(_10a2){
var _10a3=_109b.getFieldNames(_10a2);
_10a3.each(function(_10a4){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_10a4);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_10a2+":"+_10a4);
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
var _10a6=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _10a7=null;
var _10a8=null;
if(_10a6){
if(_10a6.nodeName=="TD"){
_10a7=_10a6.getAttribute("colspan");
_10a8=_10a6.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_10a7=="1"&&_10a8=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_10a6){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_10a9){
var _10aa=VisualEditorFormattingConfiguration._configurations;
if(!_10aa.has(_10a9)){
_10aa.set(_10a9,new VisualEditorFormattingConfiguration());
}
return _10aa.get(_10a9);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_10ac){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_10ad){
var _10ae=null;
var _10af=VisualEditorFieldGroupConfiguration._configurations;
if(!_10af.has(_10ad)){
_10af.set(_10ad,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_10ad)));
}
return _10af.get(_10ad);
};
function VisualEditorFieldGroupConfiguration(_10b0){
var _10b1=new Map();
new List(_10b0).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_10b1.set(group.GroupName,map);
});
this._groups=_10b1;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10b5){
return this._groups.get(_10b5).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10b6,_10b7){
return this._groups.get(_10b6).get(_10b7).xhtml;
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
var _10b9=this.getDescendantElementsByLocalName("textarea");
while(_10b9.hasNext()){
var _10ba=_10b9.getNext();
if(_10ba.getAttribute("selected")=="true"){
this._startContent=_10ba.value;
this._textareaname=_10ba.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10bc=this.getContentWindow().bindingMap.templatetree;
_10bc.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10bd){
var _10be=_10bc.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10be.textareaname);
_10bd.consume();
}});
_10bc.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10bf){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10c0=this.getContentWindow().bindingMap.toolsplitter;
_10c0.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10c1=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10c1.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10c1);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10c2){
this._textareas=new Map();
while(_10c2.hasNext()){
var _10c3=_10c2.getNext();
var _10c4=_10c3.getAttribute("placeholderid");
this._textareas.set(_10c4,{placeholderid:_10c4,placeholdername:_10c3.getAttribute("placeholdername"),placeholdermarkup:_10c3.value,textareaelement:_10c3,isSelected:_10c3.getAttribute("selected")=="true"});
}
var _10c5=new Map();
this._textareas.each(function(name,_10c7){
var _10c8=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10c8.setLabel(_10c7.placeholdername);
_10c8.setImage("${icon:placeholder}");
_10c8.setProperty("placeholder",true);
_10c8.textareaname=name;
_10c5.set(_10c7.placeholdername,_10c8);
if(_10c7.isSelected){
selected=_10c8;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10c9=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10c9.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10ca=this.getContentWindow().bindingMap.templatetree;
var _10cb=_10ca.add(TreeNodeBinding.newInstance(_10ca.bindingDocument));
_10cb.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10cb.setImage("${icon:warning}");
_10cb.attach();
var _10cc=this.getContentWindow().bindingMap.statusbar;
_10cc.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10ce=this._textareas.get(name);
var _10cf=_10ce.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10cf));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10d0){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10d0;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10d1=this.getContentWindow().bindingMap.statusbar;
_10d1.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10d0);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10d4=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10d4;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10d5=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10d5=this._xhtmls.get(this._textareaname);
if(_10d5==null){
_10d5=VisualEditorBinding.XHTML;
}
}
return _10d5;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10d7){
_10d7.textareaelement.value=_10d7.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10d8,_10d9,_10da){
var _10db=_10d8.getElementsByTagName("div").item(0);
var _10dc=_10d9.getElementsByTagName("div").item(0);
var _10dd=new List(_10db.getElementsByTagName("textarea"));
var _10de=new List(_10dc.getElementsByTagName("textarea"));
if(_10dd.getLength()!=_10de.getLength()){
_10da=true;
}else{
var index=0;
_10dd.each(function(_10e0,index){
var _10e2=_10de.get(index);
var newid=_10e0.getAttribute("placeholderid");
var oldid=_10e2.getAttribute("placeholderid");
var _10e5=_10e0.getAttribute("placeholdername");
var _10e6=_10e2.getAttribute("placeholdername");
if(newid!=oldid||_10e5!=_10e6){
_10da=true;
}
return !_10da;
});
}
if(_10da){
var html=null;
if(_10db.innerHTML!=null){
html=_10db.innerHTML;
}else{
html=DOMSerializer.serialize(_10db);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10e9){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10e9);
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
var _10ec=this.getDescendantBindingByLocalName("selector");
_10ec.attach();
this._populateTemplateSelector();
var _10ed=this.getContentWindow().bindingMap.templateselector;
_10ed.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ee=this.getDescendantBindingByLocalName("selector");
var _10ef=this.getContentWindow().bindingMap.templateselector;
_10ee.selections.each(function(_10f0){
_10f0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10ef.populateFromList(_10ee.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10f1=this.getDescendantBindingByLocalName("selector");
var _10f2=this.getContentWindow().bindingMap.templateselector;
_10f1.selectByValue(_10f2.getValue());
_10f1.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10f3){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10f8,_10f9){
var _10fa=_10f9;
if(old.has(_10f8)){
_10fa=old.get(_10f8).placeholdermarkup;
}
return _10fa;
}
while(_10f3.hasNext()){
var _10fb=_10f3.getNext();
var _10fc=_10fb.getAttribute("placeholderid");
this._textareas.set(_10fc,{placeholderid:_10fc,placeholdername:_10fb.getAttribute("placeholdername"),placeholdermarkup:compute(_10fc,_10fb.value),textareaelement:_10fb,isSelected:_10fb.getAttribute("selected")=="true"});
}
var _10fd=null;
var _10fe=this.getContentWindow().bindingMap.templatetree;
var _10ff=new Map();
this._textareas.each(function(name,_1101){
var _1102=_10fe.add(TreeNodeBinding.newInstance(_10fe.bindingDocument));
_1102.setLabel(_1101.placeholdername);
_1102.setImage("${icon:placeholder}");
_1102.setProperty("placeholder",true);
_1102.textareaname=name;
_10ff.set(_1101.placeholdername,_1102);
if(_1101.isSelected){
_10fd=_1102;
}
});
_10fe.attachRecursive();
if(_10fd!=null){
var _1103=true;
if(this._oldtextareas.hasEntries()){
_1103=false;
var map=new Map();
this._textareas.each(function(id,_1106){
map.set(_1106.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1103=true;
}
}
if(_1103){
var _1107=this._textareas.get(_10fd.textareaname);
this._textareaname=_10fd.textareaname;
this._placeholdername=_1107.placeholdername;
this._setContentFromPlaceHolder(_10fd.textareaname);
_10fd.focus();
}else{
var _1108=_10ff.get(this._placeholdername);
this._textareaname=_1108.textareaname;
_1108.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_110b){
var _110c=null;
if(Client.isWebKit||Client.isExplorer){
_110c=node.getElementsByTagName(_110b);
}else{
_110c=node.getElementsByTagName("ui:"+_110b);
}
return _110c;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_110d,_110e){
var _110f=this._getElementsByTagName(_110d,"selector").item(0);
var _1110=this._getElementsByTagName(_110e,"selector").item(0);
var _1111=false;
var _1112=false;
if(_110f!=null&&_1110!=null){
var _1113=new List(this._getElementsByTagName(_110f,"selection"));
var _1114=new List(this._getElementsByTagName(_1110,"selection"));
if(_1113.getLength()!=_1114.getLength()){
_1111=true;
_1112=true;
}else{
_1113.each(function(_1115,index){
var _1117=_1115.getAttribute("value");
var _1118=_1114.get(index).getAttribute("value");
if(_1117!=_1118){
_1111=true;
}
return !_1111;
});
_1113.each(function(_1119,index){
var _111b=_1119.getAttribute("selected");
var _111c=_1114.get(index).getAttribute("selected");
if(_111b!=_111c){
_1112=true;
}
return !_1112;
});
}
}
if(_1111){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_110f);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1112){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_110d,_110e,_1112);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_111e){
var _111f=null;
if(_111e==undefined){
_111e=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1121){
if(_1121.PlaceholderId==_111e){
_111f=_1121.ClientRectangle.Width;
return false;
}
});
}
return _111f;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1123=this._pageId;
var _1124=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1123,_1124,function(_1126){
self._templatePreview=_1126;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1127){
var _1128=this._pageId;
var _1129=this._textareaname;
var _112a=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1127,_1128,_112a,_1129,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_112c){
var _112d=this._pageId;
var _112e=this._textareaname;
var _112f=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_112c,_112d,_112f,_112e,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1131,frame,_1133){
this._editorBinding=_1131;
this._codePressFrame=frame;
this._codePressEngine=_1133;
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
var _1139=this.getProperty("validate");
if(_1139==true){
this._hasStrictValidation=true;
}
var _113a=this.getProperty("strictsave");
if(_113a===false){
this._strictSave=false;
}
var _113b=this.getProperty("validator");
if(_113b!=null){
this._validator=_113b;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_113c,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_113c,arg);
switch(_113c){
case BroadcastMessages.CODEMIRROR_LOADED:
var _113e=this.getContentWindow().bindingMap.codemirrorwindow;
if(_113e!=null){
var _113f=_113e.getContentWindow();
if(arg.broadcastWindow==_113f){
this._codemirrorWindow=_113f;
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
this.initializeEditorComponents(_113e);
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
this.unsubscribe(_113c);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1143){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1143);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1144){
if(_1144!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1144;
EditorBinding.isActive=_1144;
var _1145=this._codemirrorWindow.standardEventHandler;
if(_1144){
_1145.enableNativeKeys(true);
}else{
_1145.disableNativeKeys();
}
var _1146=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1146!=null){
if(_1144){
_1146.enable();
}else{
_1146.disable();
}
}
if(_1144){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _114a=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _114a;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_114b){
_114b.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_114d){
if(!this._isFinalized){
if(_114d!=this._startContent){
this._startContent=_114d;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_114d);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _114e=this.getContentWindow().bindingMap.editorpage.getContent();
return _114e?_114e:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_114f){
if(this._pageBinding!=null){
this._pageBinding.cover(_114f);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1150){
if(_1150!=null&&this.shadowTree.dotnetinput!=null){
var value=_1150.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1152=true;
var _1153=this.getContent();
if(this._validator!=null){
_1152=Validator.validateInformed(_1153,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1154=_1153.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1154!=_1153){
_1153=_1154;
this.setContent(_1154);
}
_1152=XMLParser.isWellFormedDocument(_1153,true,!this._strictSave);
if(_1152==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1152=this._isValidHTML(_1153);
break;
}
}
break;
}
}
return _1152;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1156=true;
var doc=XMLParser.parse(xml);
var _1158=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1158.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1158.add("NamespaceURI");
}
var head=null,body=null;
var _115c=new List(root.childNodes);
while(_115c.hasNext()){
var child=_115c.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1158.add("MultipleHead");
}
if(body!=null){
_1158.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1158.add("MultipleBody");
}
body=child;
break;
default:
_1158.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1158.add("MissingHead");
}
if(body==null){
_1158.add("MissingBody");
}
}
if(_1158.hasEntries()){
_1156=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1158.getFirst()));
}
return _1156;
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
var _115e=null;
var page=this._pageBinding;
if(page!=null){
_115e=page.getCheckSum();
}
return _115e;
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
ThrobberBinding.prototype.handleBroadcast=function(_1160,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1160,arg);
switch(_1160){
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
ProgressBarBinding.notch=function(_1163){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1163);
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
ProgressBarBinding.prototype.notch=function(_1165){
_1165=_1165?_1165:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1165);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1167,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1167,arg);
switch(_1167){
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
StartMenuItemBinding.prototype.setChecked=function(_1169,_116a){
StartMenuItemBinding.superclass.setChecked.call(this,_1169,_116a);
if(!_116a){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_116b){
var _116c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_116b);
UserInterface.registerBinding(_116c,StartMenuItemBinding);
return UserInterface.getBinding(_116c);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_116f,_1170){
var _1171=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1170,true)==true){
if(_116f!="*"){
_116f=KeySetBinding._sanitizeKeyModifiers(_116f);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1171[doc]){
_1171[doc]={};
}
if(!_1171[doc][code]){
_1171[doc][code]={};
}
_1171[doc][code][_116f]=_1170;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1175=false;
var code=e.keyCode;
var _1177=KeySetBinding.keyEventHandlers;
if(_1177[doc]&&_1177[doc][code]){
var _1178="[default]";
_1178+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1178+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1178+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1178+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1179=_1177[doc][code][_1178];
if(_1179==null){
_1179=_1177[doc][code]["*"];
}
if(_1179!=null){
_1179.handleKeyEvent(e);
_1175=true;
}
}
return _1175;
};
KeySetBinding._sanitizeKeyModifiers=function(_117a){
var _117b="[default]";
var mods={};
if(_117a){
new List(_117a.split(" ")).each(function(_117d){
mods[_117d]=true;
});
function check(_117e){
if(mods[_117e]){
_117b+=" "+_117e;
}
}
check("shift");
check("control");
}
return _117b;
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
var _1182=key.getAttribute("oncommand");
var _1183=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1183){
DOMEvents.preventDefault(e);
}
var _1185=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1182,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1186){
if(_1186 instanceof CursorBinding){
_1186.setOpacity(0);
_1186.show();
new Animation({modifier:9,onstep:function(_1187){
_1186.setOpacity(Math.sin(_1187*Math.PI/180));
},onstop:function(){
_1186.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1188){
if(_1188 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1189){
_1188.setOpacity(Math.cos(_1189*Math.PI/180));
},onstop:function(){
_1188.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_118a,_118b,_118c){
if(_118a instanceof CursorBinding){
_118c.x-=16;
_118c.y-=16;
new Animation({modifier:3,onstep:function(_118d){
var tal=Math.sin(_118d*Math.PI/180);
_118a.setPosition(new Point(((1-tal)*_118b.x)+((0+tal)*_118c.x),((1-tal)*_118b.y)+((0+tal)*_118c.y)));
},onstop:function(){
CursorBinding.fadeOut(_118a);
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
CursorBinding.prototype.setOpacity=function(_1193){
this.bindingElement.style.opacity=new String(_1193);
this._opacity=_1193;
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
function setOpacity(_1196){
cover.bindingElement.style.opacity=new String(_1196);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1197){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1197*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1199){
cover.bindingElement.style.MozOpacity=new String(_1199);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_119a){
if(Binding.exists(cover)){
setOpacity(Math.sin(_119a*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_119c){
if(_119c!=this._isBusy){
if(_119c){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_119c;
}
};
CoverBinding.prototype.setTransparent=function(_119d){
if(_119d!=this._isTransparent){
if(_119d){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_119d;
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
CoverBinding.prototype.setHeight=function(_119f){
if(_119f>=0){
this.bindingElement.style.height=new String(_119f+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_11a0){
var _11a1=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_11a0);
return UserInterface.registerBinding(_11a1,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _11a3=UncoverBinding._bindingInstance;
if(Binding.exists(_11a3)){
_11a3.setPosition(pos);
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
TheatreBinding.prototype.play=function(_11a7){
this._isFading=_11a7==true;
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
var _11a8=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_11a8.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_11a8.clearRect(0,0,300,150);
_11a8.fillRect(0,0,300,150);
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
var _11aa=this._canvas.getContext("2d");
_11aa.clearRect(0,0,300,150);
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
var _11ab=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_11ab);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _11ac=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_11ac){
this._startcontent=_11ac.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_11ad){
SourceCodeViewerBinding.superclass.handleAction.call(this,_11ad);
switch(_11ad.type){
case WindowBinding.ACTION_ONLOAD:
if(_11ad.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_11ad.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_11ad);
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
var _11b1=this._transformer.transformToString(doc);
this._inject(_11b1);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11b4){
this.getContentDocument().body.innerHTML=_11b4;
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
var _11bc=list.getNext();
var id=_11bc.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11bc);
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
var _11c6=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11c6.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11c6.appendChild(att);
}
elm.appendChild(_11c6);
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
var _11d0=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11d0){
doc=XMLParser.parse(_11d0);
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
var _11d4=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11d4;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11d5,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11d5,arg);
switch(_11d5){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11d7){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11d7);
switch(_11d7.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11d7.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11d9=new List();
list.each(function(lang){
_11d9.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11d9);
}else{
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11dd=this.getDescendantBindingByLocalName("menugroup");
_11dd.detachRecursive();
_11dd.bindingElement.innerHTML="";
if(list.hasEntries()){
var _11de=null;
while(list.hasNext()){
var _11df=list.getNext();
if(_11df.isSelected){
this.setLabel(_11df.label);
}
var _11e0=MenuItemBinding.newInstance(this.bindingDocument);
_11e0.imageProfile=_11df.imageProfile;
_11e0.setLabel(_11df.label);
if(_11df.tooltip!=null){
_11e0.setToolTip(_11df.tooltip);
}
_11e0.selectionValue=_11df.value;
_11dd.add(_11e0);
_11e0.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11e3){
switch(_11e3){
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
var _11e6=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11e6,root);
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
var _11e7=this.getProperty("status");
if(_11e7!=null){
switch(_11e7){
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
UserInterfaceMapping.prototype.merge=function(_11eb){
for(var _11ec in _11eb.map){
this.map[_11ec]=_11eb.getBindingImplementation(_11ec);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11ed){
var _11ee=null;
var name=_11ed.nodeName.toLowerCase();
if(this.map[name]){
_11ee=this.map[name];
}
return _11ee;
};
var UserInterface=new function(){
var _11f0=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11f1=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11f0,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11f2=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11f4,impl){
var _11f6=null;
if(!this.hasBinding(_11f4)){
var _11f7=DOMUtil.getParentWindow(_11f4);
if(DOMUtil.getLocalName(_11f4)!="bindingmapping"){
if(!impl&&_11f4.getAttribute("binding")!=null){
var _11f8=_11f4.getAttribute("binding");
impl=_11f7[_11f8];
if(impl==null){
throw "No such binding in scope: "+_11f8;
}
}
if(!impl){
var _11f9=_11f7.DocumentManager;
if(_11f9){
var _11fa=_11f9.customUserInterfaceMapping;
if(_11fa){
impl=_11fa.getBindingImplementation(_11f4);
}
}
}
if(!impl){
impl=_11f1.getBindingImplementation(_11f4);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11f6=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11f6){
var key=KeyMaster.getUniqueKey();
_11f4.setAttribute("key",key);
_11f6.key=key;
if(!_11f4.id){
_11f4.id=key;
}
keys[key]={element:_11f4,binding:_11f6};
_11f6.onBindingRegister();
}
}
}
return _11f6;
};
this.unRegisterBinding=function(_11fc){
terminate(_11fc);
};
function terminate(_11fd){
if(Binding.exists(_11fd)==true){
var key=_11fd.key;
Binding.destroy(_11fd);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11fd=null;
}else{
_11f2.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11ff){
var _1200=null;
if(keys[_11ff.key]){
_1200=keys[_11ff.key].element;
}
return _1200;
};
this.getBinding=function(_1201){
var _1202=null;
if(_1201&&_1201.nodeType==Node.ELEMENT_NODE){
try{
var key=_1201.getAttribute("key");
if(key&&keys[key]){
_1202=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_1201);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1202;
};
this.getBindingByKey=function(key){
var _1205=null;
if(keys[key]){
_1205=keys[key].binding;
}
return _1205;
};
this.hasBinding=function(_1206){
return this.getBinding(_1206)!=null;
};
this.isBindingVisible=function(_1207){
var _1208=Application.isOperational;
if(_1208==true){
var _1209=new Crawler();
_1209.type=NodeCrawler.TYPE_ASCENDING;
_1209.id="visibilitycrawler";
_1209.addFilter(function(_120a){
var b=UserInterface.getBinding(_120a);
var res=0;
if(!b.isVisible){
_1208=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1209.crawl(_1207.bindingElement);
_1209.dispose();
}
return _1208;
};
var _120d=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_120d={};
for(var key in keys){
_120d[key]=true;
}
};
this.getPoint=function(){
var _1211=null;
if(_120d){
_1211=new List();
for(var key in keys){
if(!_120d[key]){
_1211.add(key);
}
}
}
return _1211;
};
this.clearPoint=function(){
_120d=null;
};
this.trackUndisposedBindings=function(){
var _1213=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1213){
_1213="Bindings illdisposed: ";
}
_1213+=entry.binding+" ";
}
}
if(_1213!=null){
_11f2.error(_1213);
}
};
this.autoTrackDisposedBindings=function(_1216){
if(_1216){
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
SOAPRequest.newInstance=function(_1217,_1218){
var _1219=_1217+"/"+_1218;
var _121a=new SOAPRequest(_1219);
var _121b=SOAPRequest.resolver;
_121a.document=Templates.getTemplateDocument("soapenvelope.xml");
_121a.envelope=_121b.resolve("soap:Envelope",_121a.document);
_121a.header=_121b.resolve("soap:Header",_121a.envelope);
_121a.body=_121b.resolve("soap:Body",_121a.envelope);
return _121a;
};
SOAPRequest._parseResponse=function(_121c){
var _121d=null;
var _121e=false;
var doc=_121c.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_121d=SOAPRequestResponse.newInstance(_121c.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_121c.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_121e=true;
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
var text=_121c.responseText;
if(_121c.status==503||text.indexOf("id=\"offline\"")>-1){
_121e=true;
}else{
var cry="Invalid SOAP response: \n\n"+_121c.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_121c.responseText);
}
}
}
}
if(_121e==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _121d;
};
function SOAPRequest(_1223){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1223;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1225=DOMUtil.getXMLHTTPRequest();
var _1226=null;
_1225.open("post",url,false);
_1225.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1225.setRequestHeader("SOAPAction",this.action);
try{
_1225.send(this.document);
_1226=SOAPRequest._parseResponse(_1225);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1225=null;
return _1226;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1229){
var _122a=DOMUtil.getXMLHTTPRequest();
_122a.open("post",url,true);
_122a.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_122a.setRequestHeader("SOAPAction",this.action);
_122a.onreadystatechange=function(){
if(_122a.readyState==4){
var _122b=SOAPRequest._parseResponse(_122a);
_1229(_122b);
_122a=null;
}
};
_122a.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _122c in this){
this[_122c]=null;
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
var _122e=null;
if(doc&&doc.documentElement){
_122e=new SOAPRequestResponse();
var _122f=SOAPRequestResponse.resolver;
_122e.document=doc;
_122e.envelope=_122f.resolve("soap:Envelope",_122e.document);
_122e.header=_122f.resolve("soap:Header",_122e.envelope);
_122e.body=_122f.resolve("soap:Body",_122e.envelope);
var fault=_122f.resolve("soap:Fault",_122e.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_122e.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_122f.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_122f.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _122e;
};
function SOAPFault(_1231,_1232,_1233){
this._operationName=_1231;
this._operationAddress=_1232;
this._faultString=_1233;
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
SOAPFault.newInstance=function(_1234,fault){
return new SOAPFault(_1234.name,_1234.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1237){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1237;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1239=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1239.body,this._operation);
var _123b=this._wsdl.getSchema();
var _123c=_123b.lookup(this._operation);
var _123d=_123c.getListedDefinitions();
while(_123d.hasNext()){
var def=_123d.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1239;
};
SOAPEncoder.prototype._resolve=function(_1241,_1242,value){
var _1244=this._wsdl.getSchema();
if(_1242.isSimpleValue){
this._appendText(_1241,value,_1242.type=="string");
}else{
var _1245=_1244.lookup(_1242.type);
if(_1245 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1245.getListedDefinitions();
if(_1245.isArray){
var _1247=new List(value);
var def=defs.getNext();
while(_1247.hasNext()){
var elm=this._appendElement(_1241,def.name);
var val=_1247.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1241,def.name);
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
SOAPEncoder.prototype._appendText=function(_124e,value,_1250){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1253=false;
var i=0,c;
while(c=chars[i++]){
var _1256=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1256=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1256=false;
}
break;
}
if(!_1256){
safe+=c;
}else{
_1253=true;
}
}
if(_1253){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_124e.appendChild(_124e.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1259){
this._wsdl=wsdl;
this._operation=_1259;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_125e){
var _125f=null;
var _1260=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1262=this.resolve(id,_125e.body);
var _1263=_1260.lookup(id);
var _1264=_1263.getListedDefinitions();
while(!_125f&&_1264.hasNext()){
var def=_1264.getNext();
var elm=this.resolve(def.name,_1262);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_125f=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_125f.appendChild(_125f.importNode(e,true));
}else{
_125f=this._compute(elm,def);
}
}
return _125f;
};
SOAPDecoder.prototype._compute=function(_1268,_1269){
var _126a=null;
var _126b=this._wsdl.getSchema();
if(_1269.isSimpleValue){
_126a=this._getSimpleValue(_1268,_1269.type);
}else{
var _126c=_126b.lookup(_1269.type);
if(_126c instanceof SchemaSimpleType){
_126a=this._getSimpleValue(_1268,_126c.restrictionType);
}else{
var defs=_126c.getListedDefinitions();
if(_126c.isArray){
_126a=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1268);
while(elms.hasNext()){
var elm=elms.getNext();
_126a.push(this._compute(elm,def));
}
}else{
if(_1268==null){
_126a=null;
}else{
_126a={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1268);
if(elm){
_126a[def.name]=this._compute(elm,def);
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
return _126a;
};
SOAPDecoder.prototype._getSimpleValue=function(_1271,type){
var _1273=null;
if(_1271!=null&&_1271.firstChild&&_1271.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1271.childNodes.length>1){
_1271.normalize();
}
_1273=_1271.firstChild.data;
switch(type){
case Schema.types.STRING:
_1273=_1273;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1273=Number(_1273);
break;
case Schema.types.BOOLEAN:
_1273=_1273=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1273;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1274){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1274);
}
Schema.prototype._parseSchema=function(_1275){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1276={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1275);
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
_1276[rule.getAttribute("name")]=entry;
}
return _1276;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_127b){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_127b);
}
SchemaDefinition.prototype._parse=function(_127c){
var min=_127c.getAttribute("minOccurs");
var max=_127c.getAttribute("maxOccurs");
var type=_127c.getAttribute("type");
this.name=_127c.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1282=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1282;
}else{
var elm=_127c.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1284,_1285){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1284,_1285);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1286,_1287){
var els=_1286.resolveAll("s:complexType/s:sequence/s:element",_1287);
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
function SchemaComplexType(_1289,_128a){
this._definitions=new List();
this._parseListedDefinitions(_1289,_128a);
this.isArray=_128a.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_128b,_128c){
var els=_128b.resolveAll("s:sequence/s:element",_128c);
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
function SchemaSimpleType(_128f,_1290){
this.restrictionType=null;
this._parse(_128f,_1290);
}
SchemaSimpleType.prototype._parse=function(_1291,_1292){
var _1293=_1291.resolve("s:restriction",_1292);
if(_1293){
this.restrictionType=_1293.getAttribute("base").split(":")[1];
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
var _1296=null;
var _1297=DOMUtil.getXMLHTTPRequest();
_1297.open("get",url,false);
_1297.send(null);
if(_1297.responseXML){
_1296=_1297.responseXML.documentElement;
}else{
alert(_1297.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1296;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1298=new List();
var _1299=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1299.hasEntries()){
while(_1299.hasNext()){
var _129a=_1299.getNext();
var name=_129a.getAttribute("name");
_1298.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1298;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_129d,_129e,_129f){
this.name=name;
this.address=_129d;
this.encoder=_129e;
this.decoder=_129f;
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
var _12a3=wsdl.getOperations();
_12a3.each(function(_12a4){
proxy[_12a4.name]=WebServiceProxy.createProxyOperation(_12a4);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_12a5,_12a6){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_12a6){
var log=_12a6 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_12a5.address+": "+_12a5.name+"\n\n";
log+=DOMSerializer.serialize(_12a6.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_12a8){
return function(){
var _12a9=new List(arguments);
var _12aa=null;
if(typeof (_12a9.getLast())=="function"){
var _12ab=_12a9.extractLast();
var _12ac=_12a8.encoder.encode(_12a9);
this._log(_12a8,_12ac);
var self=this;
var _12ae=_12ac.asyncInvoke(_12a8.address,function(_12af){
self._log(_12a8,_12af);
if(_12af){
if(_12af.fault){
_12aa=SOAPFault.newInstance(_12a8,_12af.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12aa,_12ac,_12af);
}
}else{
if(WebServiceProxy.isDOMResult){
_12aa=_12af.document;
}else{
_12aa=_12a8.decoder.decode(_12af);
}
}
}
_12ac.dispose();
_12ab(_12aa);
});
}else{
var _12ac=_12a8.encoder.encode(new List(arguments));
this._log(_12a8,_12ac);
var _12ae=_12ac.invoke(_12a8.address);
this._log(_12a8,_12ae);
if(_12ae){
if(_12ae.fault){
_12aa=SOAPFault.newInstance(_12a8,_12ae.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12aa,_12ac,_12ae);
}
}else{
if(WebServiceProxy.isDOMResult){
_12aa=_12ae.document;
}else{
_12aa=_12a8.decoder.decode(_12ae);
}
}
}
_12ac.dispose();
return _12aa;
}
};
};
WebServiceProxy.handleFault=function(_12b0,_12b1,_12b2){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_12b0,soapRequest:_12b1,soapResponse:_12b2});
}
catch(exception){
alert(_12b0.getFaultString());
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
var _12b3=SystemLogger.getLogger("MessageQueue");
var _12b4=null;
var _12b5=0;
var _12b6=null;
var _12b7=new Map();
var _12b8=new Map();
var _12b9=false;
var _12ba=false;
var _12bb=false;
var _12bc=false;
var _12bd={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_12b4=ConsoleMessageQueueService;
_12b5=_12b4.GetCurrentSequenceNumber("dummyparam!");
this.index=_12b5;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12b9){
if(!MessageQueue._actions.hasEntries()){
var _12be=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12ba=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12be;
_12ba=false;
}
}
}
};
this._pokeserver=function(){
if(_12b9==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12bf){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12ba);
this._updateMessages(_12bf);
}
};
this._updateMessages=function(_12c0){
if(_12bb){
_12bc=true;
}else{
_12bb=true;
var self=this;
var _12c2=function(_12c3){
if(_12c3!=null){
if(Types.isDefined(_12c3.CurrentSequenceNumber)){
var _12c4=_12c3.CurrentSequenceNumber;
if(_12c4<self.index){
_12b3.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12c4);
}
self.index=_12c4;
var _12c5=new List(_12c3.ConsoleActions);
if(_12c5.hasEntries()){
self.evaluate(_12c5);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_12b3.error("No sequencenumber in MessageQueue response!");
}
}
_12bb=false;
if(_12bc){
_12bc=false;
self._updateMessages();
}
};
if(_12c0){
_12c2(_12b4.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_12b4.GetMessages(Application.CONSOLE_ID,this.index,_12c2);
}
}
};
this.evaluate=function(_12c6){
var _12c7=new List();
if(_12c6.hasEntries()){
_12c6.each(function(_12c8){
if(this._index[_12c8.Id]!=true){
_12c7.add(_12c8);
}
this._index[_12c8.Id]=true;
},this);
if(_12c7.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12c7);
}else{
this._actions=_12c7;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12c9){
var _12ca="(No reason)";
if(_12c9!=null){
_12ca=_12c9.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12ca);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12ce){
if(_12ce==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12cf=null;
if(this._actions.hasEntries()){
var _12d0=this._actions.extractFirst();
_12b5=_12d0.SequenceNumber;
_12b3.debug("MessageQueue action: "+_12d0.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_12b5+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12d0.ActionType){
case "OpenView":
_12cf=_12d0.OpenViewParams;
if(_12cf.ViewType=="ModalDialog"){
openDialogView(_12cf);
}else{
_12b6=_12cf.ViewId;
openView(_12cf);
}
break;
case "CloseView":
_12cf=_12d0.CloseViewParams;
_12b6=_12cf.ViewId;
closeView(_12cf);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12d0.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12b7.countEntries()+"\n";
_12b7.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_12b3.debug(debug);
if(!_12b7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12d3=_12d0.SelectElementParams.PerspectiveElementKey;
if(_12d3){
var _12d4={handleBroadcast:function(_12d5,arg){
switch(_12d5){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12d3){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12d0.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12d4);
StageBinding.selectPerspective(_12d0.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12d0.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12d0.MessageBoxParams);
break;
case "OpenViewDefinition":
_12cf=_12d0.OpenViewDefinitionParams;
_12b6=_12cf.Handle;
openViewDefinition(_12cf);
break;
case "LogEntry":
logEntry(_12d0.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12cf=_12d0.BroadcastMessageParams;
_12b3.debug("Server says: EventBroadcaster.broadcast ( \""+_12cf.Name+"\", "+_12cf.Value+" )");
EventBroadcaster.broadcast(_12cf.Name,_12cf.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12b7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12d0.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12d0.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12d0.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12cf=_12d0.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12cf.ViewId,entityToken:_12cf.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12cf=_12d0.OpenGenericViewParams;
openGenericView(_12cf);
break;
case "OpenExternalView":
_12cf=_12d0.OpenExternalViewParams;
openExternalView(_12cf);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12d0.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12ba);
}
function logEntry(_12d7){
var _12d8=_12d7.Level.toLowerCase();
SystemLogger.getLogger(_12d7.SenderId)[_12d8](_12d7.Message);
}
function openView(_12d9){
var list=paramsToList(_12d9.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12d9.ViewId);
def.entityToken=_12d9.EntityToken;
def.flowHandle=_12d9.FlowHandle;
def.position=_12bd[_12d9.ViewType],def.label=_12d9.Label;
def.image=_12d9.Image;
def.toolTip=_12d9.ToolTip;
def.argument={"url":_12d9.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12d9.ViewId,entityToken:_12d9.EntityToken,flowHandle:_12d9.FlowHandle,position:_12bd[_12d9.ViewType],url:_12d9.Url,label:_12d9.Label,image:_12d9.Image,toolTip:_12d9.ToolTip}));
}
}
function openDialogView(_12dc){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12dc.ViewId,flowHandle:_12dc.FlowHandle,position:Dialog.MODAL,url:_12dc.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12dd){
var _12de=_12dd.DialogType.toLowerCase();
if(_12de=="question"){
throw "Not supported!";
}else{
Dialog[_12de](_12dd.Title,_12dd.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12df){
var map={};
var _12e1=false;
new List(_12df.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12e1=true;
});
var proto=ViewDefinitions[_12df.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12df.ViewId;
}
def.argument=_12e1?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12e6){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12e6.ViewId);
def.label=_12e6.Label;
def.toolTip=_12e6.ToolTip;
def.image=_12e6.Image;
def.argument={"url":_12e6.Url,"list":paramsToList(_12e6.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12e8){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12e8.ViewId);
def.label=_12e8.Label;
def.toolTip=_12e8.ToolTip;
def.image=_12e8.Image;
def.url=_12e8.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12ea){
if(StageBinding.isViewOpen(_12ea.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12ea.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12eb){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12eb.ViewId,isSuccess:_12eb.Succeeded});
}
this._lockSystem=function(_12ec){
var _12ed=top.bindingMap.offlinetheatre;
if(_12ec){
_12ed.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12ed.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12b9=_12ec;
};
this.placeConsoleCommand=function(_12ef){
_12b4.PlaceConsoleCommand(Application.CONSOLE_ID,_12ef);
};
this.handleBroadcast=function(_12f0,arg){
switch(_12f0){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12b6!=null&&arg==_12b6){
_12b6=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12b7.set(arg,true);
}else{
_12b3.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12b7.hasEntries()){
_12b7.del(arg);
_12b3.debug("Refreshed tree: "+arg+"\n("+_12b7.countEntries()+" trees left!)");
if(!_12b7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12b8.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12b8.hasEntries()==true){
_12b8.del(arg);
if(!_12b8.hasEntries()){
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
function paramsToList(_12f2){
var list=new List();
new List(_12f2).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12f5=false;
var _12f6=null;
var _12f7=false;
var _12f8=Client.qualifies();
var _12f9="admin";
var _12fa="123456";
if(!_12f8){
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
this.handleBroadcast=function(_12fb){
switch(_12fb){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12fb);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12fc=bindingMap.decks.getSelectedDeckBinding();
if(_12fc!=null){
switch(_12fc.getID()){
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
var _12fd=window.bindingMap.appwindow;
_12fd.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12fe=window.location.hash.replace(/^#/,"");
if(_12fe){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12fe);
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
function fileEventBroadcasterSubscriptions(_12ff){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1300){
if(_12ff){
EventBroadcaster.subscribe(_1300,KickStart);
}else{
EventBroadcaster.unsubscribe(_1300,KickStart);
}
});
}
function kickStart(_1301){
switch(_1301){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12f5=true;
break;
}
if(_12f5){
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
DataManager.getDataBinding("username").setValue(_12f9);
DataManager.getDataBinding("password").setValue(_12fa);
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
var _1304=DataManager.getDataBinding("username").getResult();
var _1305=DataManager.getDataBinding("passwordold").getResult();
var _1306=DataManager.getDataBinding("passwordnew").getResult();
var _1307=DataManager.getDataBinding("passwordnew2").getResult();
if(_1306==_1307){
var _1308=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1309=LoginService.ChangePassword(_1304,_1305,_1306);
if(_1309 instanceof SOAPFault){
alert(_1309.getFaultString());
}else{
if(_1309.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_1309);
}
}
WebServiceProxy.isFaultHandler=true;
if(_1308){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_130a){
_130a=new List(_130a);
var _130b=document.getElementById("passworderror");
_130b.innerHTML="";
_130a.each(function(error){
var _130d=document.createElement("div");
_130d.textContent=error;
_130d.className="errortext";
_130b.appendChild(_130d);
});
_130b.style.display="block";
var _130e={handleAction:function(_130f){
document.getElementById("passworderror").style.display="none";
_130f.target.removeActionListener(Binding.ACTION_DIRTY,_130e);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_130e);
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
this.doLogin=function(_1310,_1311){
var _1312=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1313=false;
var _1314=false;
var _1315=LoginService.ValidateAndLogin(_1310,_1311);
if(_1315 instanceof SOAPFault){
alert(_1315.getFaultString());
}else{
if(_1315=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_1315=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_1315=="passwordUpdateRequired"){
_1314=true;
}
if(_1315=="success"){
_1313=true;
}
}
if(_1314){
changePasswordRequired();
}else{
if(_1313){
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
if(_1312){
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
var _1316=document.getElementById("passwordexpired");
_1316.firstChild.data=_1316.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1317=DataManager.getDataBinding("username");
var _1318=DataManager.getDataBinding("password");
_1317.blur();
_1318.blur();
_1317.setValue("");
_1318.setValue("");
_1317.clean();
_1318.clean();
_1317.focus();
document.getElementById("loginerror").style.display="block";
var _1319={handleAction:function(_131a){
document.getElementById("loginerror").style.display="none";
_131a.target.removeActionListener(Binding.ACTION_DIRTY,_1319);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1319);
}
WindowManager.fireOnLoad(this);
if(!_12f8){
UpdateManager.isEnabled=false;
}
};

