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
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_bd){
if(typeof _bd!=Types.UNDEFINED){
_bd=String(_bd);
_bd=_bd.replace("${root}",Constants.APPROOT);
_bd=_bd.replace("${skin}",Constants.SKINROOT);
_bd=_bd.replace("${tiny}",Constants.TINYROOT);
if(_bd.indexOf("${icon:")>-1){
_bd=this._resolveImage(_bd);
}else{
if(_bd.indexOf("${class:")>-1){
_bd=this._resolveClasses(_bd);
}else{
if(_bd.indexOf("${string:")>-1){
_bd=this._resolveString(_bd);
}
}
}
}
return _bd;
},resolveVars:function(_be,_bf){
var i=0;
while(i<_bf.length){
_be=_be.replace("{"+i+"}",_bf[i]);
i++;
}
return _be;
},_resolveString:function(_c1){
var _c2=null;
var _c3=null;
var key=_c1.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_c3=key.split(":")[0];
key=key.split(":")[1];
}else{
_c3=StringBundle.UI;
}
_c2=StringBundle.getString(_c3,key);
if(!_c2){
_c2="(?)";
}
return _c2;
},_resolveImage:function(_c5){
var _c6=null;
var _c7=null;
var _c8=null;
var _c9=null;
_c8=_c5.split("${icon:")[1].split("}")[0];
if(_c8.indexOf(":")>-1){
_c7=_c8.split(":")[0];
_c8=_c8.split(":")[1];
}
if(_c8.indexOf("(")>-1){
_c9=_c8.split("(")[1].split(")")[0];
_c8=_c8.split("(")[0];
}
_c6=_c8;
return _c6;
},_resolveClasses:function(_ca){
var _cb={};
resource=_ca.split("${class:")[1].split("}")[0];
_cb.classes=resource;
return _cb;
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
_Cookies.prototype={createCookie:function(_ce,_cf,_d0){
var _d1="";
if(_d0){
var _d2=new Date();
_d2.setTime(_d2.getTime()+(_d0*24*60*60*1000));
_d1="; expires="+_d2.toGMTString();
}
document.cookie=_ce+"="+escape(_cf)+_d1+"; path=/";
return this.readCookie(_ce);
},readCookie:function(_d3){
var _d4=null;
var _d5=_d3+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_d5)==0){
_d4=unescape(c.substring(_d5.length,c.length));
}
}
return _d4;
},eraseCookie:function(_d9){
this.createCookie(_d9,"",-1);
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
var _da=SystemLogger.getLogger("StatusBar");
var _db=null;
var _dc="${icon:error}";
var _dd="${icon:warning}";
var _de="${icon:loading}";
var _df="${icon:message}";
var _e0=null;
var _e1=null;
var _e2=null;
var _e3=null;
this.initialize=function(_e4){
_e0=StringBundle.getString("ui","Website.App.StatusBar.Error");
_e1=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_e2=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_e3=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_db=_e4;
this.document=_e4.bindingDocument;
};
this.error=function(_e5,_e6){
this.state=StatusBar.ERROR;
_e5=_e5?_e5:_e0;
show(_e5,_dc,_e6,false);
};
this.warn=function(_e7,_e8){
this.state=StatusBar.WARN;
_e7=_e7?_e7:_e1;
show(_e7,_dd,_e8,false);
};
this.busy=function(_e9,_ea){
this.state=StatusBar.BUSY;
_e9=_e9?_e9:_e2;
show(_e9,_de,_ea,false);
};
this.ready=function(_eb,_ec){
this.state=StatusBar.READY;
_eb=_eb?_eb:_e3;
show(_eb,_df,_ec,true);
};
this.report=function(_ed,_ee,_ef,_f0){
this.state=null;
show(_ed,_ee,_ef,_f0);
};
this.clear=function(){
this.state=null;
if(_db){
_db.clear();
}
};
function show(_f1,_f2,_f3,_f4){
if(_f3){
_f1=Resolver.resolveVars(_f1,_f3);
}
if(_db){
_db.setLabel(_f1);
_db.setImage(_f2);
if(_f4){
_db.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_da.error("Message not initialized for display: "+_f1);
}
}
this.addToGroup=function(_f5,_f6){
if(!this._groups.has(_f5)){
this._groups.set(_f5,_db.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_f5).add(_f6);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,isUIRtl:false,isRtl:false,handleBroadcast:function(_f7,arg){
switch(_f7){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
this.isUIRtl=LocalizationService.GetUITextDirection(true)=="rtl";
this.isRtl=LocalizationService.GetTextDirection(true)=="rtl";
var _f9=LocalizationService.GetActiveLocales(true);
if(_f9.length>=1){
this.languages=new List(_f9);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_f7){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _fa=LocalizationService.GetLocales(true);
this.source=_fa.ForeignLocaleName;
this.target=_fa.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_fa.ForeignLocaleName,target:_fa.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _fb=this.languages.copy();
while(_fb.hasNext()){
var _fc=_fb.getNext();
if(_fc.IsCurrent){
return _fc.IsoName;
}
}
}
return null;
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_fd,key,_ff){
var _100=true;
var _101=SourceValidationService.ValidateSource(_fd,key);
if(_101!="True"){
if(_ff==true){
this._dialog(_101);
}
_100=false;
}
return _100;
},validateInformed:function(_102,key){
return this.validate(_102,key,true);
},_dialog:function(_104){
setTimeout(function(){
Dialog.error("Source Invalid",_104);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_105,_106,_107,_108){
this._count++;
this._eventListener(true,_105,_106,_107,_108);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_105&&typeof _105.nodeType!=Types.UNDEFINED){
if(_105.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_105);
if(win){
var _10a={handleEvent:function(){
DOMEvents.removeEventListener(_105,_106,_107,_108);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_10a);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_10a);
}
}
}
}
},removeEventListener:function(_10b,_10c,_10d,_10e){
this._count--;
this._eventListener(false,_10b,_10c,_10d,_10e);
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
},cleanupEventListeners:function(_114){
this._deleteWrappedHandler(_114);
},isCurrentTarget:function(e){
var _116=false;
if(Client.isMozilla==true){
_116=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_117,_118){
var _119=true;
if(_117==_118){
_119=false;
}
if(_119==true){
while(_118!=null&&_118.nodeType!=Node.DOCUMENT_NODE&&_118!=_117){
_118=_118.parentNode;
}
_119=(_118==_117);
}
return _119;
},_eventListener:function(_11a,_11b,_11c,_11d,_11e,_11f){
if(Interfaces.isImplemented(IEventListener,_11d,true)){
if(typeof _11c!=Types.UNDEFINED){
var _120=this._getAction(_11a);
if(_11b[_120]){
if(Client.isExplorer||Client.isExplorer11){
switch(_11c){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_11d=this._getWrappedHandler(_11b,_11c,_11d,_11f);
_11b[_120](_11c,_11d,false);
break;
default:
_11b[_120](_11c,_11d,false);
break;
}
}else{
switch(_11c){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_11c=_11c==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_11b[_120](_11c,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_11d.handleEvent(e);
}
}},_11e?true:false);
break;
default:
_11b[_120](_11c,_11d,_11e?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_123){
var _124=null;
switch(_123){
case true:
_124="addEventListener";
break;
case false:
_124="removeEventListener";
break;
}
return _124;
},_getWrappedHandler:function(_125,_126,_127,_128){
var _129=null;
try{
if(!_127._domEventHandlers){
_127._domEventHandlers={};
}
if(!_127._domEventHandlers[_125]){
_127._domEventHandlers[_125]={};
}
if(!_127._domEventHandlers[_125][_126]){
var win=_125.nodeType?DOMUtil.getParentWindow(_125):_125;
if(win){
_127._domEventHandlers[_125][_126]=function(e){
if(win.event!=null&&_127!=null){
_127.handleEvent(win.event);
}else{
if(_127!=null){
_127.handleEvent(e);
}
}
};
}
}
_129=_127._domEventHandlers[_125][_126];
}
catch(exception){
this._report(_125,_126,_127,_128);
}
return _129;
},_deleteWrappedHandler:function(_12c){
for(var _12d in _12c._domEventHandlers){
if(_12d){
for(var _12e in _12c._domEventHandlers[_12d]){
if(_12e){
delete _12c._domEventHandlers[_12d][_12e];
}
}
}
delete _12c._domEventHandlers[_12d];
}
},_report:function(_12f,_130,_131,_132){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_12f?_12f.nodeName:_12f)+"\n"+"\tevent: "+_130+"\n"+"\thandler: "+_131+"\n\n"+"Offending invoker: "+(_132.callee?_132.callee.toString():_132.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_134){
var _135=null;
var _136=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_136=node.documentElement;
}
if(_136.xml!=null){
return _136.xml;
}else{
if(this._serializer!=null){
if(_134==true){
_136=_136.cloneNode(true);
_136=DOMFormatter.format(_136,DOMFormatter.INDENTED_TYPE_RESULT);
}
_135=this._serializer.serializeToString(_136);
}
}
return _135;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _139=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_13a){
var doc=_13a.ownerDocument;
var _13c=function(node,_13e){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _13f="",i=0;
while(i++<_13e){
_13f+=TAB;
}
var _141=node.firstChild;
while(_141){
switch(_141.nodeType){
case Node.ELEMENT_NODE:
if(_141==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_13f));
}
node.insertBefore(doc.createTextNode(NEW+_13f+TAB),_141);
_13c(_141,_13e+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_13f+TAB),_141);
break;
}
if(_141.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_141,_13f+TAB);
}
}
_141=_141.nextSibling;
}
}
};
_13c(_13a,0);
}
function strip(_142){
var _143=[];
var _144={acceptNode:function(_145){
return (!_139.test(_145.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _146=_142.ownerDocument.createTreeWalker(_142,NodeFilter.SHOW_TEXT,_144,true);
while(_146.nextNode()){
_143.push(_146.currentNode);
}
var i=0,_148;
while((_148=_143[i++])!=null){
_148.parentNode.removeChild(_148);
}
}
function formatCDATASection(node,_14a){
if(node.textContent.indexOf(NEW)>-1){
var _14b=node.textContent.split(NEW);
var _14c="",line,_14e=0,_14f=true;
while((line=_14b.shift())!=null){
if(_14e==0&&line.charAt(0)==TAB){
while(line.charAt(_14e++)==TAB){
}
}
line=line.substring(_14e,line.length);
if(_14b.length>0){
_14c+=_14a+TAB+line;
_14c+=_14f?"":"\n";
}else{
_14c+=_14a+line;
_14a=_14a.slice(1,_14a.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_14a));
}
_14f=false;
}
node.textContent=_14c;
}
}
this.format=function(_150,_151){
var _152=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_150);
if(_151!=_152){
indent(_150);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_150);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_153){
var sig,_155=null,_156=this.MSXML_MAXVERSION;
while(!_155&&_156>=this.MSXML_MINVERSION){
try{
sig=_153.replace("{$version}",_156);
_155=new ActiveXObject(sig);
}
catch(exception){
}
_156--;
}
return _155;
},getXMLHTTPRequest:function(){
var _157=null;
if(Client.isExplorer||Client.isExplorer11){
_157=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_157=new XMLHttpRequest();
}
return _157;
},getDOMDocument:function(_158){
var _159=null;
if(Client.isExplorer||Client.isExplorer11){
_159=this.getMSComponent(_158?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_159=doc;
}
return _159;
},getMSXMLXSLTemplate:function(){
var _15b=null;
if(Client.isExplorer||Client.isExplorer11){
_15b=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _15b;
},getLocalName:function(_15c){
var _15d=null;
if(_15c.localName){
_15d=_15c.localName.replace("ui:","");
}else{
if(_15c.baseName){
_15d=_15c.baseName;
}else{
_15d=_15c.nodeName.toLowerCase();
}
}
return _15d;
},getComputedStyle:function(_15e,_15f){
var _160=null;
if(Client.isExplorer){
if(_15e.currentStyle!=null){
_160=_15e.currentStyle[_15f];
}else{
this._logger.error("Could not compute style for element "+_15e.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _161=_15e.ownerDocument.defaultView.getComputedStyle(_15e,null);
if(_161!=null){
_160=_161.getPropertyValue(_15f);
}else{
this._logger.error("Could not compute style for element "+_15e.nodeName);
SystemDebug.stack(arguments);
}
}
return _160;
},getMaxIndex:function(doc){
var max=0,_164=new List(doc.getElementsByTagName("*"));
_164.each(function(_165){
var _166=CSSComputer.getZIndex(_165);
if(_166>max){
max=_166;
}
});
return max;
},getOrdinalPosition:function(_167,_168){
var _169=null;
var _16a=-1;
var _16b=this.getLocalName(_167);
var _16c=new List(_167.parentNode.childNodes);
while(_16c.hasNext()){
var _16d=_16c.getNext();
if(_16d.nodeType==Node.ELEMENT_NODE){
if(!_168||this.getLocalName(_16d)==_16b){
_16a++;
if(_16d==_167||(_16d.id!=""&&_16d.id==_167.id)){
_169=_16a;
break;
}
}
}
}
return _169;
},isFirstElement:function(_16e,_16f){
return (this.getOrdinalPosition(_16e,_16f)==0);
},isLastElement:function(_170,_171){
var _172=_170.parentNode.getElementsByTagName(_171?this.getLocalName(_170):"*");
return (this.getOrdinalPosition(_170)==_172.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _176=null;
if(node.textContent){
_176=node.textContent;
}else{
if(node.text){
_176=node.text;
}else{
_176=node.innerText;
}
}
return _176;
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
},getAncestorByLocalName:function(_179,node,_17b){
var _17c=null;
while(_17c==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_17b==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_179){
_17c=node;
}
}
return _17c;
},contains:function(_17e,node){
return _17e.contains?_17e!=node&&_17e.contains(node):!!(_17e.compareDocumentPosition(node)&16);
},createElementNS:function(_180,_181,_182){
var _183=null;
if(_182==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_183=_182.createElementNS(_180,_181);
}else{
if(_182.xml!=null){
_183=_182.createNode(Node.ELEMENT_NODE,_181,_180);
}else{
_183=_182.createElement(_181.replace("ui:",""));
}
}
}
return _183;
},getElementsByTagName:function(node,_185){
var _186=null;
if(Client.isMozilla){
_186=node.getElementsByTagNameNS(Constants.NS_XHTML,_185);
}else{
_186=node.getElementsByTagName(_185);
}
return _186;
},getNextElementSibling:function(_187){
return Client.isExplorer?_187.nextSibling:_187.nextElementSibling;
},getPreviousElementSibling:function(_188){
return Client.isExplorer?_188.previousSibling:_188.previousElementSibling;
},cloneNode:function(node){
var _18a=null;
if(Client.isMozilla==true){
_18a=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_18a=node.cloneNode(true);
}
return _18a;
},getLocalPosition:function(_18b){
var _18c=new Point(_18b.offsetLeft,_18b.offsetTop);
if(Client.isExplorer&&_18b.parentNode&&_18b.parentNode.currentStyle){
if(_18b.parentNode.currentStyle.position=="static"){
var _18d=this.getLocalPosition(_18b.parentNode);
_18c.x+=_18d.x;
_18c.y+=_18d.y;
}
}
return _18c;
},getGlobalPosition:function(_18e){
return this._getPosition(_18e,false);
},getUniversalPosition:function(_18f){
return this._getPosition(_18f,true);
},_getPosition:function(_190,_191){
var _192=null;
if(typeof _190.getBoundingClientRect!=Types.UNDEFINED){
var rect=_190.getBoundingClientRect();
_192={x:rect.left,y:rect.top};
if(Client.isMozilla){
_192.x-=_190.scrollLeft;
_192.y-=_190.scrollTop;
}
}else{
_192={x:_190.offsetLeft-_190.scrollLeft,y:_190.offsetTop-_190.scrollTop};
while(_190.offsetParent){
_190=_190.offsetParent;
_192.x+=(_190.offsetLeft-_190.scrollLeft);
_192.y+=(_190.offsetTop-_190.scrollTop);
}
}
if(_191){
var win=DOMUtil.getParentWindow(_190);
if(win){
var _195=win.frameElement;
if(_195){
var add=DOMUtil.getUniversalPosition(_195);
_192.x+=add.x;
_192.y+=add.y;
}
}
}
return new Point(_192.x,_192.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_19a){
var _19b=DOMEvents.getTarget(e);
var _19c={x:e.clientX,y:e.clientY};
if(_19a){
var _19d=this.getParentWindow(_19b).frameElement;
if(_19d){
var add=this.getUniversalPosition(_19d);
_19c.x+=add.x;
_19c.y+=add.y;
}
}
return _19c;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1a0){
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
if(!_1a0){
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
if(!_1a0){
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
},isWellFormedDocument:function(xml,_1a3,_1a4){
var _1a5=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1a7=SourceValidationService.IsWellFormedDocument(xml);
if(_1a7!="True"){
_1a5=false;
if(_1a3==true){
if(_1a4){
if(confirm("Not well-formed\n"+_1a7+"\nContinue?")){
_1a5=true;
}
}else{
this._illFormedDialog(_1a7);
}
}
}
return _1a5;
},isWellFormedFragment:function(xml,_1a9){
var _1aa=true;
var _1ab=SourceValidationService.IsWellFormedFragment(xml);
if(_1ab!="True"){
_1aa=false;
if(_1a9==true){
this._illFormedDialog(_1ab);
}
}
return _1aa;
},_illFormedDialog:function(_1ac){
setTimeout(function(){
Dialog.error("Not well-formed",_1ac);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1ad){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1ae){
return _1ad[_1ae];
}};
}else{
this._nsResolver=_1ad;
}
};
XPathResolver.prototype.resolve=function(_1af,node,_1b1){
var _1b2=null;
try{
if(this._evaluator){
_1b2=this._evaluateDOMXpath(_1af,node,_1b1?true:false);
}else{
_1b2=this._evaluateMSXpath(_1af,node,_1b1?true:false);
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
return _1b2;
};
XPathResolver.prototype.resolveAll=function(_1b3,node){
return this.resolve(_1b3,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1b5,node,_1b7){
var _1b8=null;
if(node){
var _1b8=this._evaluator.evaluate(_1b5,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1b7){
var list=new List();
while((node=_1b8.iterateNext())!=null){
list.add(node);
}
_1b8=list;
}else{
_1b8=_1b8.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1b8;
};
XPathResolver.prototype._evaluateMSXpath=function(_1bb,node,_1bd){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1bf="";
for(var _1c0 in this._nsResolver){
_1bf+="xmlns:"+_1c0+"=\""+this._nsResolver[_1c0]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1bf);
if(_1bd){
var list=new List();
var i=0,_1c3=node.selectNodes(_1bb);
while(i<_1c3.length){
list.add(_1c3.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1bb);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1c5=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1c5);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1c5;
}
};
XSLTransformer.prototype._import=function(url){
var _1c7=null;
if(Client.hasXSLTProcessor){
var _1c8=DOMUtil.getXMLHTTPRequest();
_1c8.open("get",Resolver.resolve(url),false);
_1c8.send(null);
_1c7=_1c8.responseXML;
}else{
var _1c7=DOMUtil.getDOMDocument(true);
_1c7.async=false;
_1c7.load(url);
}
return _1c7;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1ca=null;
if(Client.hasXSLTProcessor){
_1ca=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1ca;
};
XSLTransformer.prototype.transformToString=function(dom,_1cc){
var _1cd=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1cd=DOMSerializer.serialize(doc,_1cc);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1cd=proc.output;
}
return _1cd;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d0){
var _1d1=_1d0.style?_1d0.className:_1d0.getAttribute("class");
_1d1=_1d1?_1d1:"";
return _1d1;
},_contains:function(_1d2,sub){
return _1d2.indexOf(sub)>-1;
},_attach:function(_1d4,sub){
return _1d4+(_1d4==""?"":" ")+sub;
},_detach:function(_1d6,sub){
if(this._contains(_1d6," "+sub)){
sub=" "+sub;
}
return _1d6.replace(sub,"");
},attachClassName:function(_1d8,_1d9){
if(_1d8.classList!=null){
if(!_1d8.classList.contains(_1d9)){
_1d8.classList.add(_1d9);
}
}else{
var _1da=this._getCurrent(_1d8);
if(!this._contains(_1da,_1d9)){
_1da=this._attach(_1da,_1d9);
}
if(_1d8.style!=null){
_1d8.className=_1da;
}else{
_1d8.setAttribute("class",_1da);
}
}
},detachClassName:function(_1db,_1dc){
if(_1db.classList!=null){
if(_1db.classList.contains(_1dc)){
_1db.classList.remove(_1dc);
}
}else{
var _1dd=this._getCurrent(_1db);
if(this._contains(_1dd,_1dc)){
_1dd=this._detach(_1dd,_1dc);
}
if(_1db.style!=null){
_1db.className=_1dd;
}else{
if(_1dd==""){
_1db.removeAttribute("class");
}else{
_1db.setAttribute("class",_1dd);
}
}
}
},hasClassName:function(_1de,_1df){
var _1e0=false;
if(_1de.classList!=null){
_1e0=_1de.classList.contains(_1df);
}else{
_1e0=this._contains(this._getCurrent(_1de),_1df);
}
return _1e0;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1e1,_1e2){
var _1e3={};
for(var _1e4 in _1e1){
var ent=parseInt(DOMUtil.getComputedStyle(_1e2,_1e1[_1e4]));
_1e3[_1e4]=isNaN(ent)?0:ent;
}
return _1e3;
},_getMargin:function(_1e6){
return this._getComplexResult(this._margins,_1e6);
},getPadding:function(_1e7){
return this._getComplexResult(this._paddings,_1e7);
},getBorder:function(_1e8){
return this._getComplexResult(this._borders,_1e8);
},getPosition:function(_1e9){
return DOMUtil.getComputedStyle(_1e9,"position");
},getFloat:function(_1ea){
return DOMUtil.getComputedStyle(_1ea,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1eb){
return parseInt(DOMUtil.getComputedStyle(_1eb,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1ec){
return DOMUtil.getComputedStyle(_1ec,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1ed=SystemLogger.getLogger("System");
var root=null;
var _1ef=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_1f0){
if(_1ef==null){
_1ef={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1f1){
_1ef[_1f1.Key]=_1f1.Value;
});
}
return _1ef[_1f0];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1f2=new List();
var _1f3=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1f3);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1f5){
_1f2.add(new SystemNode(_1f5));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1f2;
};
this.getChildNodes=function(node,_1f7){
var _1f8=new List();
var _1f9=null;
if(_1f7){
if(SearchTokens.hasToken(_1f7)){
_1f7=SearchTokens.getToken(_1f7);
}
_1f9=TreeService.GetElementsBySearchToken(node.getData(),_1f7);
}else{
_1f9=TreeService.GetElements(node.getData());
}
new List(_1f9).each(function(_1fa){
var _1fb=new SystemNode(_1fa);
if(_1f7){
_1fb.searchToken=_1f7;
}
_1f8.add(_1fb);
});
return _1f8;
};
this.getDescendantBranch=function(_1fc){
var map=new Map();
var arg=[];
_1fc.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _200=TreeService.GetMultipleChildren(arg);
var _201=new List(_200);
while(_201.hasNext()){
this._listNodesInMap(_201.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_202,_203,_204){
var map=new Map();
var arg=[];
_204.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _208=TreeService.FindEntityToken(_202,_203,arg);
if(_208 instanceof SOAPFault){
_1ed.error(_208.getFaultString());
if(Application.isDeveloperMode){
alert(_208.getFaultString());
}
map=null;
}else{
var _209=new List(_208);
while(_209.hasNext()){
this._listNodesInMap(_209.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_20a,map){
var list=new List();
var key=_20a.ElementKey;
var _20e=new List(_20a.ClientElements);
map.set(key,list);
while(_20e.hasNext()){
var _20f=_20e.getNext();
list.add(new SystemNode(_20f));
}
};
this.getChildNodesBySearchToken=function(node,_211){
return this.getChildNodes(node,_211);
};
this.getNamedRoots=function(key,_213){
var _214=new List();
var _215=null;
if(_213){
if(SearchTokens.hasToken(_213)){
_213=SearchTokens.getToken(_213);
}
_215=TreeService.GetNamedRootsBySearchToken(key,_213);
}else{
_215=TreeService.GetNamedRoots(key);
}
new List(_215).each(function(_216){
var node=new SystemNode(_216);
if(_213){
node.searchToken=_213;
}
_214.add(node);
});
return _214;
};
this.getNamedRootsBySearchToken=function(key,_219){
return this.getNamedRoots(key,_219);
};
function compileActionList(node,_21b,_21c){
var _21d=_21b.ClientElementActionGroupId;
if(_21d!=null){
var _21e=_21c.get(_21d).ClientElementActionGroupItems;
if(_21e&&_21e.length>0){
node.setActionList(new List(_21e));
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
new List(self._data.Actions).each(function(_224){
var _225=_224.ActionCategory.Name;
if(SystemAction.hasCategory(_225)){
var _226=new SystemAction(_224);
SystemAction.actionMap.set(_224.ActionKey,_226);
}else{
throw "No such action category: "+_225;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _227=null;
if(this.searchToken){
_227=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_227=System.getChildNodes(this);
}
return _227;
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
var _229=this._data.Piggybag;
if(_229==null){
_229="";
}
return _229;
};
SystemNode.prototype.getHandle=function(){
return this._data.ElementKey;
};
SystemNode.prototype.getTag=function(){
return this._data.TagValue;
};
SystemNode.prototype.getImageProfile=function(size){
return new ImageProfile({image:this._data.Icon.ResourceName,imageActive:(this._data.OpenedIcon?this._data.OpenedIcon:this._data.Icon).ResourceName});
};
SystemNode.prototype.getToolTip=function(){
var _22b=null;
if(typeof this._data.ToolTip!="undefined"){
_22b=this._data.ToolTip;
}
return _22b;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_22d){
map[_22d.Key]=_22d.Value;
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
var _231=SystemAction.actionMap.get(key);
var _232=true;
if(_231.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_232=false;
}
}
if(_232){
var id=_231.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_231);
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
SystemAction.invoke=function(_235,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_235.logger.debug("Execute \""+_235.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_235.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_238,_239){
action=SystemAction.taggedActions.get(_238);
node=SystemNode.taggedNodes.get(_239);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_23a){
return SystemAction.categories[_23a]?true:false;
};
function SystemAction(_23b){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_23b;
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
return this._data.Icon.ResourceName;
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
var _23c=null;
if(this.isInFolder()){
_23c=this._data.ActionCategory.FolderName;
}
return _23c;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _23d=null;
if(typeof this._data.TagValue!="undefined"){
_23d=this._data.TagValue;
}
return _23d;
};
SystemAction.prototype.isChecked=function(){
var _23e=null;
if(this.isCheckBox()){
_23e=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _23e;
};
function _UpdateManager(){
var _23f=null;
if(!window.UpdateManager){
this._construct();
_23f=this;
}
return _23f;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_240){
var root=document.documentElement;
var _242=root.namespaceURI;
if(_242==null){
_242=new String(root.getAttribute("xmlns"));
}
if(_242=="http://www.w3.org/1999/xhtml"){
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
var _243=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_243);
}else{
throw new TypeError();
}
}else{
var _244=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_244.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _246=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_246=true;
}
},this);
return _246;
},_setupForm:function(form){
var _249=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_249.isEnabled){
_249._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_24a,type){
if(_24a.addEventListener!=null){
_24a.addEventListener(type,this,false);
}else{
var _24c=this;
_24a.attachEvent("on"+type,function(){
_24c.handleEvent(window.event);
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
var _251=UpdateAssistant.getUpdateZones(dom);
var _252=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_251.forEach(function(_253,_254){
var _255=_252[_254];
this._crawl(_253,_255);
},this);
this._updates.forEach(function(_256,_257){
_256.update();
_256.dispose();
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
},_crawl:function(_259,_25a,_25b,id){
var _25d=true;
var _25e=_25a.getAttribute("class");
if(_25e==null||_25e.indexOf(this.CLASSNAME_GONE)==-1){
if(_25a.nodeType==Node.ELEMENT_NODE){
var _25f=_25a.getAttribute("id");
if(_25f!=null){
_25b=_259;
id=_25f;
}
}
if(_25d=this._check(_259,_25a,_25b,id)){
var _260=_259.firstChild;
var _261=_25a.firstChild;
while(_260!=null&&_261!=null&&!this._replaced[id]){
switch(_260.nodeType){
case Node.TEXT_NODE:
_25d=this._check(_260,_261,_25b,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_25d=this._crawl(_260,_261,_25b,id);
break;
}
if(this._replaced[id]){
_25d=false;
}else{
_260=_260.nextSibling;
_261=_261.nextSibling;
}
}
}
}
return _25d;
},_check:function(_262,_263,_264,id){
var _266=true;
var _267=null;
var _268=false;
var _269=false;
if((_262!=null&&_263==null)||(_262==null&&_263!=null)){
_266=false;
}else{
if(_266=_262.nodeType==_263.nodeType){
switch(_263.nodeType){
case Node.ELEMENT_NODE:
if(_262.namespaceURI!=_263.namespaceURI||_262.nodeName!=_263.nodeName){
_266=false;
}else{
if(_266=(_262.nodeName==_263.nodeName)){
var _26a=_263.getAttribute("id");
var _26b=_262.getAttribute("id");
if(_26a!=null&&_26b!=null){
if(_26a!=_26b){
_266=false;
}else{
if((_267=this._getPlugin(_262,_263))!=null){
if(_267.updateElement(_262,_263)){
_269=true;
_266=false;
}
}
}
}
if(_266){
if(_266=this._checkAttributes(_262,_263)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_262)&&this._hasSoftChildren(_263)){
if(this._validateSoftChildren(_262,_263)){
this._updateSoftChildren(_262,_263);
_268=true;
}
_266=false;
}else{
_266=_262.childNodes.length==_263.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_262.data.trim()!=_263.data.trim()){
_266=false;
}
break;
}
}
}
if(_266==false&&!_268&&!_269){
if(id!=null&&_264!=null){
this.addUpdate(new ReplaceUpdate(id,_264));
}
}
return _266;
},_checkAttributes:function(_26c,_26d){
var _26e=true;
var _26f=false;
var _270=_26c.attributes;
var _271=_26d.attributes;
if(_270.length!=_271.length){
_26f=true;
}else{
_26f=!Array.every(_270,function(att1,i){
var att2=_271.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_26f){
var _275=_26c.getAttribute("id");
var _276=_26d.getAttribute("id");
if(this.hasSoftAttributes&&_275!=null&&_275==_276){
this.addUpdate(new AttributesUpdate(_276,_26c,_26d));
}else{
_26e=false;
}
}
return _26e;
},_hasSoftChildren:function(_277){
var _278=true;
if(_277.hasChildNodes()){
_278=Array.every(_277.childNodes,function(node){
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
return _278;
},_validateSoftChildren:function(_27b,_27c){
var _27d=true;
var _27e=-1;
var _27f=-1;
var _280=-1;
var news=this._toMap(_27b.childNodes,true);
var olds=this._toMap(_27c.childNodes,true);
for(var id in olds){
if(_27d){
var _284=olds[id];
_27d=_284>=_27e;
if(news[id]!=null){
_280=news[id];
_27d=_280>=_27f;
}
}
_27e=_284;
if(_280>-1){
_27f=_280;
}
}
return _27d;
},_updateSoftChildren:function(_285,_286){
var news=this._toMap(_285.childNodes);
var olds=this._toMap(_286.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _28a=null;
for(id in news){
if(olds[id]==null){
var _28b=news[id];
if(_28a==null){
var _28c=_286.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28c,_28b,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28a,_28b,false));
}
}
_28a=id;
}
},addUpdate:function(_28d){
this._updates.push(_28d);
if(_28d instanceof ReplaceUpdate){
this._replaced[_28d.id]=true;
}
},_getPlugin:function(_28e,_28f){
var _290=null;
this.plugins.every(function(_291){
if(_291.handleElement(_28e,_28f)){
_290=_291;
}
return _290==null;
});
return _290;
},_toMap:function(_292,_293){
var _294={};
Array.forEach(_292,function(node,_296){
if(node.nodeType==Node.ELEMENT_NODE){
_294[node.getAttribute("id")]=_293?_296:node;
}
});
return _294;
},_getPost:function(form){
var _298=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_29a){
if(_29a.name==null||_29a.name==""){
return;
}
var name=_29a.name;
var _29c=encodeURIComponent(_29a.value);
switch(_29a.type){
case "button":
case "submit":
var _29d=UpdateAssistant.getActiveElement();
if(_29a==_29d&&name!=""){
_298+=name+"="+_29c+"&";
}
break;
case "radio":
if(_29a.checked){
_298+=name+"="+_29c+"&";
}
break;
case "checkbox":
if(_29a.checked){
if(_29a.name==last){
if(_298.lastIndexOf("&")==_298.length-1){
_298=_298.substr(0,_298.length-1);
}
_298+=","+_29c;
}else{
_298+=name+"="+_29a.value;
}
last=name;
_298+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_298+=name+"="+_29c+"&";
break;
}
});
}
return _298.substr(0,_298.length-1);
},_postRequest:function(form){
var _29f=form.method!=""?form.method:"get";
var _2a0=form.action!=""?form.action:window.location.toString();
var _2a1=this._getPost(form);
if(_29f=="get"){
if(_2a0.indexOf("?")>-1){
_2a0=_2a0+"&"+_2a1;
}else{
_2a0+"?"+_2a1;
}
}
var _2a2=this;
var _2a3=UpdateAssistant.getXMLHttpRequest(_29f,_2a0,this);
if(_29f=="post"){
_2a3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2a3.send(_29f=="post"?_2a1:null);
},_fixdotnet:function(dom,id){
var _2a6=document.getElementById(id);
if(_2a6!=null){
var _2a7=UpdateAssistant.getElementById(dom,id);
if(_2a7!=null){
var _2a8=_2a7.getAttribute("value");
if(_2a8!==_2a6.value){
_2a6.value=_2a8;
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
},report:function(_2ab){
this.summary+=_2ab+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2ac=null;
if(!window.UpdateAssistant){
this._construct();
_2ac=this;
}
return _2ac;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2ad,fun){
var _2af=true;
var len=_2ad.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b1=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2ad[i]!="undefined"){
if(!fun.call(_2b1,_2ad[i],i,_2ad)){
_2af=false;
break;
}
}
}
}
return _2af;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2b4=arguments[1];
return Array.every(this,fun,_2b4);
};
}
if(!Array.forEach){
Array.forEach=function(_2b5,fun){
var len=_2b5.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b8=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b5[i]!="undefined"){
fun.call(_2b8,_2b5[i],i,_2b5);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2bb=arguments[1];
Array.forEach(this,fun,_2bb);
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
},getXMLHttpRequest:function(_2bd,_2be,_2bf){
var _2c0=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c0!=null){
_2c0.open(_2bd,_2be,(_2bf!=null?true:false));
if(_2bf!=null){
function action(){
if(_2c0.readyState==4){
var _2c1=_2c0.getResponseHeader("X-Error-Type");
if(_2c1){
var _2c2="";
for(var i=0;i<10;i++){
var _2c4=i?i:"";
var _2c1=_2c0.getResponseHeader("X-Error-Type"+_2c4);
if(!_2c1){
break;
}
var _2c5=_2c0.getResponseHeader("X-Error-Message"+_2c4);
_2c2+=_2c1+"\n"+_2c5+"\n";
}
Dialog.error("Error",_2c2);
}else{
var text=_2c0.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2bf.handleResponse(dom);
}
}
}
}
if(_2c0.addEventListener!=null){
_2c0.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c0.onreadystatechange=action;
}
}
}
return _2c0;
},dispatchEvent:function(_2c8,name){
var _2ca=true;
var _2cb=document.createEvent("UIEvents");
_2cb.initEvent(name,true,true);
_2ca=_2c8.dispatchEvent(_2cb);
return _2ca;
},getUpdateZones:function(dom){
var _2cd="//*[@id and contains(@class,'updatezone')]";
var _2ce=[];
var _2cf=null;
var _2d0=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2cf=dom.evaluate(_2cd,dom,null,type,null);
while((_2d0=_2cf.iterateNext())!=null){
_2ce.push(_2d0);
}
}else{
_2cf=dom.documentElement.selectNodes(_2cd);
Array.forEach(_2cf,function(_2d2){
_2ce.push(_2d2);
});
}
return _2ce;
},getElementById:function(dom,id){
var _2d5="//*[@id='"+id+"']";
var _2d6=null;
var _2d7=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2d6=dom.evaluate(_2d5,dom,null,type,null);
_2d7=_2d6.singleNodeValue;
}else{
_2d7=dom.documentElement.selectNodes(_2d5)[0];
}
return _2d7;
},_getIds:function(dom){
var _2da="//*[@id]";
var _2db=null;
var _2dc=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2db=dom.evaluate(_2da,dom,null,type,null);
while((element=_2db.iterateNext())!=null){
_2dc.push(element.getAttribute("id"));
}
}else{
_2db=dom.documentElement.selectNodes(_2da);
Array.forEach(_2db,function(_2de){
_2dc.push(_2de.getAttribute("id"));
});
}
return _2dc;
},toHTMLElement:function(_2df){
var _2e0=this.serialize(_2df);
var temp=document.createElement("temp");
temp.innerHTML=_2e0;
return temp.firstChild;
},getActiveElement:function(){
var _2e2=document.activeElement;
if(_2e2==null||_2e2==document.body){
_2e2=this._activeElement;
}
return _2e2;
},serialize:function(_2e3){
var _2e4=null;
if(_2e3.xml!=null){
_2e4=_2e3.xml;
}else{
if(this._serializer!=null){
_2e4=this._serializer.serializeToString(_2e3);
}
}
return _2e4;
},hasDifferences:function(_2e5,_2e6){
var s1=null;
var s2=null;
if(_2e5.xml!=null){
s1=_2e5.xml;
s2=_2e6.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2e5);
s2=this._serializer.serializeToString(_2e6);
}
}
return s1!=s2;
},parse:function(_2e9){
var _2ea=null;
if(this._parser!=null&&window.XPathResult!=null){
_2ea=this._parser.parseFromString(_2e9,"text/xml");
}else{
_2ea=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2ea.setProperty("SelectionLanguage","XPath");
_2ea.loadXML(_2e9);
}
return this._validate(_2ea);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2ed=dom.getElementsByTagName("parsererror").item(0);
if(_2ed!=null){
out=_2ed.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2f1=!has[id];
has[id]=true;
if(!_2f1){
out="Element \""+id+"\" encountered twice.";
}
return _2f1;
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
this.handleElement=function(_2f2,_2f3){
var _2f4=false;
switch(_2f2.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2f2.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f4=false;
break;
}
break;
}
return _2f4;
};
this.updateElement=function(_2f5,_2f6){
var id=_2f5.getAttribute("id");
var _2f8=document.getElementById(id);
if(_2f8!=null){
var _2f9=null;
switch(_2f8.nodeName.toLowerCase()){
case "input":
_2f9=_2f5.getAttribute("value");
break;
case "textarea":
_2f9=_2f5.textContent?_2f5.textContent:_2f5.text;
break;
}
if(_2f9==null){
_2f9="";
}
if(_2f9!=_2f8.value){
_2f8.value=_2f9;
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
},_beforeUpdate:function(_2fa){
var _2fb=true;
if(_2fa!=null){
_2fa.__updateType=this.type;
_2fb=UpdateAssistant.dispatchEvent(_2fa,Update.EVENT_BEFOREUPDATE);
}
return _2fb;
},_afterUpdate:function(_2fc){
var _2fd=true;
if(_2fc!=null){
_2fc.__updateType=this.type;
_2fd=UpdateAssistant.dispatchEvent(_2fc,Update.EVENT_AFTERUPDATE);
}
return _2fd;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2ff){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2ff;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _300,_301,_302=UpdateAssistant.toHTMLElement(this.element);
if((_300=document.getElementById(this.id))!=null){
if((_301=_300.parentNode)!=null){
var _303=UserInterface.getBinding(_300);
if(_303!=null){
_302.__isAttached=_303.isAttached;
}
if(this._beforeUpdate(_300)){
_301.replaceChild(_302,_300);
this._afterUpdate(_302);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_304){
var _305=ReplaceUpdate.superclass._afterUpdate.call(this,_304);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_304.nodeName=="form"||_304.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _305;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_308,_309){
this.type=type;
this.id=id;
this.element=_308;
this.isFirst=_309;
return this;
}
SiblingUpdate.prototype.update=function(){
var _30a=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_30a);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_30a);
break;
}
};
SiblingUpdate.prototype._remove=function(_30b){
var _30c=_30b.parentNode;
if(_30c!=null){
if(this._beforeUpdate(_30b)){
_30c.removeChild(_30b);
this._afterUpdate(_30c);
}
}
};
SiblingUpdate.prototype._insert=function(_30d,_30e){
var _30f=UpdateAssistant.toHTMLElement(_30d);
if(this.isFirst){
var _310=_30e;
if(_310!=null){
if(this._beforeUpdate(_310)){
_310.insertBefore(_30f,_310.firstChild);
this._afterUpdate(_30f);
}
}
}else{
var _310=_30e.parentNode;
if(_310!=null){
if(this._beforeUpdate(_310)){
_310.insertBefore(_30f,_30e.nextSibling);
this._afterUpdate(_30f);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_311){
var _312=SiblingUpdate.superclass._beforeUpdate.call(this,_311);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_311.id+"\"");
}
return _312;
};
SiblingUpdate.prototype._afterUpdate=function(_313){
var _314=true;
if(_313!=null){
_314=SiblingUpdate.superclass._afterUpdate.call(this,_313);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_313.id+"\"");
if(_313.nodeName=="form"||_313.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _314;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_316,_317){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_316;
this.currentElement=_317;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _318=document.getElementById(this.id);
if(this._beforeUpdate(_318)){
this._updateAttributes(_318);
this._afterUpdate(_318);
}
};
AttributesUpdate.prototype._updateAttributes=function(_319){
Array.forEach(this.element.attributes,function(_31a){
var _31b=this.currentElement.getAttribute(_31a.nodeName);
if(_31b==null||_31b!=_31a.nodeValue){
this._setAttribute(_319,_31a.nodeName,_31a.nodeValue);
this._summary.push("@"+_31a.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_31c){
if(this.element.getAttribute(_31c.nodeName)==null){
this._setAttribute(_319,_31c.nodeName,null);
this._summary.push("@"+_31c.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_31d,name,_31f){
if(_31d==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_31f);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _320=(_31f==null);
if(_320){
_31d.removeAttribute(name);
}else{
_31d.setAttribute(name,_31f);
}
if(document.all!=null){
if(_320){
_31f="";
}
switch(name.toLowerCase()){
case "class":
_31d.className=_31f;
break;
case "disabled":
_31d.disabled=!_320;
break;
case "checked":
_31d.checked=!_320;
break;
case "readonly":
_31d.readOnly=!_320;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_321){
AttributesUpdate.superclass._afterUpdate.call(this,_321);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_322,key){
return _322.replace("${windowkey}",document.location+":"+key);
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
var _326=this._newDimensions.w!=this._currentDimensions.w;
var _327=this._newDimensions.h!=this._currentDimensions.h;
if(_326||_327){
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
},fireOnDOM:function(_329){
if(Interfaces.isImplemented(IDOMHandler,_329,true)){
this._ondomstatements.add(_329);
}
},fireOnLoad:function(_32a){
if(Interfaces.isImplemented(ILoadHandler,_32a,true)){
this._onloadstatements.add(_32a);
}
},fireOnResize:function(_32b){
if(Interfaces.isImplemented(IResizeHandler,_32b,true)){
this._onresizestatements.add(_32b);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_32c){
return eval(_32c);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_32d,_32e){
SystemLogger.unsuspend(_32e);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_32f,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _332=top.app.bindingMap.broadcasterHasDirtyTabs;
_332.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_333,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _336=top.app.bindingMap.broadcasterHasDirtyTabs;
_336.disable();
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
var _337=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_337=LoginService.Logout(true);
if(!_337){
alert("Logout failed.");
}
}
return _337;
},lock:function(_338){
if(_338!=null){
this._lockthings[_338]=true;
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
},unlock:function(_339,_33a){
if(_339!=null){
delete this._lockthings[_339];
if(top.bindingMap.mastercover!=null){
if(_33a||this._lockers>0){
if(_33a){
var out="Unlocked by "+new String(_339)+"\n";
for(var _33c in this._lockthings){
out+="Locked by "+new String(_33c)+". ";
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
},hasLock:function(_33d){
return this._lockthings[_33d]==true;
},activate:function(_33e){
var _33f=this._activeBinding;
this._activeBinding=_33e;
this._activatedBindings.add(_33e);
if(_33f&&_33f.isActive){
_33f.deActivate();
}
},deActivate:function(_340){
var _341=null;
var _342=null;
if(_340==this._activeBinding){
while(!_342&&this._activatedBindings.hasEntries()){
_341=this._activatedBindings.extractLast();
if(_341!=_340&&_341.isActivatable){
_342=_341;
}
}
if(!_342){
_342=app.bindingMap.explorerdock;
}
_342.activate();
}
},focused:function(_343){
this.isFocused=_343;
if(_343){
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
},handleAction:function(_348){
switch(_348.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _34a=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_34c){
var src=_34c.src;
if(src.indexOf(_34a)>-1){
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
var _351=false;
if(this._isMousePositionTracking){
_351=true;
if(Client.isExplorer&&e.button!=1){
_351=false;
}
if(_351){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _351;
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
},onDragStart:function(_353){
var _354=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_354,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_354.getImage());
this._cursorStartPoint=_353;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_354.showDrag){
_354.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_354.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _356=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_356);
}
},onDragStop:function(diff){
if(this._isDragging){
var _358=BindingDragger.draggedBinding;
if(_358.hideDrag){
_358.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_358.dragType);
this._isDragging=false;
_358=BindingAcceptor.acceptingBinding;
if(_358!=null){
if(Interfaces.isImplemented(IAcceptable,_358,true)==true){
_358.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_358);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_359){
if(this.isDeveloperMode||_359){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_35a){
if(_35a==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_35b){
switch(_35b){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_35d){
switch(_35d.Key){
case "ProductVersion":
this.versionString=_35d.Value;
break;
case "ProductTitle":
this.versionPrettyString=_35d.Value;
break;
case "InstallationId":
this.installationID=_35d.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_35d.Value;
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
var _360=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _361={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _362=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_362){
for(var key in _362){
_361[key]=_362[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_361);
}
}});
this.getPref=function(key){
var _365=null;
if(key){
_365=_361[key];
}else{
throw "No such preference.";
}
return _365;
};
this.setPref=function(key,_367){
if(key){
_361[key]=_367;
}else{
throw "No such preference.";
}
};
function debug(_368){
var _369=_368?"Persisted preferences":"No persisted preferences. Using defaults";
_369+=":\n";
for(var key in _361){
var pref=_361[key];
_369+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_360.fine(_369);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _36e=null;
if(this.isInitialized==true){
if(this._persistance){
var _36f=this._persistance[id];
if(_36f){
_36e=_36f[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _36e;
},setPersistedProperty:function(id,prop,_372){
if(this.isInitialized==true){
if(this._persistance){
if(_372!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_372);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_373){
switch(_373){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _374=top.bindingMap.persistance;
_374.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _375=top.bindingMap.persistance;
var map=_375.getPersistanceMap();
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
function StandardEventHandler(doc,_378){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_378;
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
var _37c={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_37c);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_37c);
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
var _383=UserInterface.getBinding(node);
if(_383!=null){
_383.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_383!=null?null:node.parentNode;
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
var _386=Application.trackMousePosition(e);
if(_386){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_389){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_389){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_389=true;
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
var _38a=KeySetBinding.handleKey(this._contextDocument,e);
if(!_38a){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _38b=this._contextWindow.frameElement;
if(_38b!=null){
var _38c=DOMUtil.getParentWindow(_38b);
if(_38c.standardEventHandler!=null){
_38c.standardEventHandler._handleKeyDown(e,_389);
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
var _38f=false;
var _390=DOMEvents.getTarget(e);
var name=_390.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_38f=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_38f;
}
if(_38f){
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
StandardEventHandler.prototype.enableNativeKeys=function(_393){
this._isAllowTabs=(_393==true?true:false);
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
function Action(_396,type){
this.target=_396;
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
function Animation(_398){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _399 in _398){
this[_399]=_398[_399];
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
Animation.prototype.onstart=function(_39d){
};
Animation.prototype.onstep=function(_39e){
};
Animation.prototype.onstop=function(_39f){
};
Point.isEqual=function(p1,p2){
var _3a2=false;
if(p1&&p2){
_3a2=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a2;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3a7=false;
if(dim1&&dim2){
_3a7=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3a7;
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
function BindingAcceptor(_3ae){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3ae;
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
var _3af=new List(this._binding.dragAccept.split(" "));
while(_3af.hasNext()){
var type=_3af.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b1,arg){
var type=arg;
try{
switch(_3b1){
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
function BindingBoxObject(_3b6){
this._domElement=_3b6.getBindingElement();
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
function BindingDragger(_3b8){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3b8;
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
BindingDragger.prototype.registerHandler=function(_3ba){
if(Interfaces.isImplemented(IDragHandler,_3ba)==true){
this.handler=_3ba;
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
var _3bd=e.button==(e.target?0:1);
if(_3bd){
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
var _3bf=Application.getMousePosition();
var dx=_3bf.x-this.startPoint.x;
var dy=_3bf.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c2,e){
switch(_3c2){
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
function BindingParser(_3c4){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c4;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c5){
var _3c6=new List();
var xml=BindingParser.XML.replace("${markup}",_3c5);
var doc=XMLParser.parse(_3c5);
if(doc){
var _3c9=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3c9);
var node=_3c9.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3c6.add(node);
}
node=node.nextSibling;
}
}
return _3c6;
};
BindingParser.prototype._iterate=function(_3cb,_3cc){
var _3cd=null;
switch(_3cb.nodeType){
case Node.ELEMENT_NODE:
_3cd=this._cloneElement(_3cb);
UserInterface.registerBinding(_3cd);
break;
case Node.TEXT_NODE:
_3cd=this._ownerDocument.createTextNode(_3cb.nodeValue);
break;
}
if(_3cd){
_3cc.appendChild(_3cd);
}
if(_3cd&&_3cb.hasChildNodes()){
var _3ce=_3cb.firstChild;
while(_3ce){
this._iterate(_3ce,_3cd);
_3ce=_3ce.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3cf){
var _3d0=DOMUtil.createElementNS(_3cf.namespaceURI?_3cf.namespaceURI:Constants.NS_XHTML,_3cf.nodeName,this._ownerDocument);
var i=0;
while(i<_3cf.attributes.length){
var attr=_3cf.attributes.item(i++);
_3d0.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d0;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3d3){
var _3d4=null;
var _3d5=false;
var _3d6=_3d3.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d3)){
var _3d7=UserInterface.getBinding(_3d3);
_3d5=BindingSerializer.activeInstance.indexBinding(_3d7);
if(_3d5){
_3d4=_3d7.key;
_3d3.setAttribute(BindingSerializer.KEYPOINTER,_3d4);
}
}
_3d4=_3d4?_3d4:_3d6;
var _3d8=new List(_3d3.childNodes);
_3d8.each(function(_3d9){
if(_3d9.nodeType==Node.ELEMENT_NODE){
_3d9.setAttribute(BindingSerializer.KEYPOINTER,_3d4);
}
});
if(_3d5){
BindingSerializer.activeInstance.append(_3d4,_3d6);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3da){
BindingSerializer.activeInstance=this;
_3da.bindingWindow.ElementIterator.iterate(_3da.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3db){
var _3dc=false;
var _3dd=_3db.serialize();
if(_3dd!=false){
_3dc=true;
var _3de="ui:"+DOMUtil.getLocalName(_3db.bindingElement);
var _3df=DOMUtil.createElementNS(Constants.NS_UI,_3de,this._dom);
this._pointers[_3db.key]=_3df;
for(var prop in _3dd){
if(_3dd[prop]!=null){
_3df.setAttribute(prop,String(_3dd[prop]));
}
}
}
return _3dc;
};
BindingSerializer.prototype.append=function(_3e1,_3e2){
var _3e3=this._pointers[_3e1];
var _3e4=_3e2?this._pointers[_3e2]:this._dom;
_3e4.appendChild(_3e3);
};
function ImageProfile(_3e5){
this._default=_3e5.image;
this._hover=_3e5.imageHover;
this._active=_3e5.imageActive;
this._disabled=_3e5.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3e6){
this._default=_3e6;
};
ImageProfile.prototype.getHoverImage=function(){
return this._default;
};
ImageProfile.prototype.setHoverImage=function(_3e7){
this._hover=_3e7;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3e8){
this._active=_3e8;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._default;
};
ImageProfile.prototype.setDisabledImage=function(_3e9){
this._disabled=_3e9;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3ea,_3eb,_3ec){
var _3ed=null;
if(_3ea.isAttached){
_3ed=new List();
var _3ee=_3ec?_3ea.getChildElementsByLocalName(_3eb):_3ea.getDescendantElementsByLocalName(_3eb);
_3ee.each(function(_3ef){
var _3f0=UserInterface.getBinding(_3ef);
if(_3f0){
_3ed.add(_3f0);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3ea.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3ed;
},getAncestorBindingByType:function(_3f2,impl,_3f4){
var _3f5=null;
if(Binding.exists(_3f2)){
var node=_3f2.bindingElement;
while(_3f5==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3f7=UserInterface.getBinding(node);
if(_3f7 instanceof impl){
_3f5=_3f7;
}
}else{
if(_3f4&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3f5;
},getAncestorBindingByLocalName:function(_3f9,_3fa,_3fb){
var _3fc=null;
if(_3fa=="*"){
var node=_3f9.bindingElement;
while(!_3fc&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3fc=UserInterface.getBinding(node);
}
}
}else{
_3fc=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3fa,_3f9.bindingElement,_3fb));
}
return _3fc;
},getChildElementsByLocalName:function(_3fe,_3ff){
var _400=new List();
var _401=new List(_3fe.bindingElement.childNodes);
_401.each(function(_402){
if(_402.nodeType==Node.ELEMENT_NODE){
if(_3ff=="*"||DOMUtil.getLocalName(_402)==_3ff){
_400.add(_402);
}
}
});
return _400;
},getChildBindingByType:function(_403,impl){
var _405=null;
_403.getChildElementsByLocalName("*").each(function(_406){
var _407=UserInterface.getBinding(_406);
if(_407!=null&&_407 instanceof impl){
_405=_407;
return false;
}else{
return true;
}
});
return _405;
},getDescendantBindingByType:function(_408,impl){
var _40a=null;
_408.getDescendantElementsByLocalName("*").each(function(_40b){
var _40c=UserInterface.getBinding(_40b);
if(_40c!=null&&_40c instanceof impl){
_40a=_40c;
return false;
}else{
return true;
}
});
return _40a;
},getDescendantBindingsByType:function(_40d,impl){
var _40f=new List();
_40d.getDescendantElementsByLocalName("*").each(function(_410){
var _411=UserInterface.getBinding(_410);
if(_411!=null&&_411 instanceof impl){
_40f.add(_411);
}
return true;
});
return _40f;
},getNextBindingByLocalName:function(_412,name){
var _414=null;
var _415=_412.bindingElement;
while((_415=DOMUtil.getNextElementSibling(_415))!=null&&DOMUtil.getLocalName(_415)!=name){
}
if(_415!=null){
_414=UserInterface.getBinding(_415);
}
return _414;
},getPreviousBindingByLocalName:function(_416,name){
var _418=null;
var _419=_416.bindingElement;
while((_419=DOMUtil.getPreviousElementSibling(_419))!=null&&DOMUtil.getLocalName(_419)!=name){
}
if(_419!=null){
_418=UserInterface.getBinding(_419);
}
return _418;
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
},addFilter:function(_41a){
this._filters.add(_41a);
},removeFilter:function(_41b){
var _41c=-1;
this._filters.each(function(fil){
_41c++;
var _41e=true;
if(fil==_41b){
_41e=false;
}
return _41e;
});
if(_41c>-1){
this._filters.del(_41c);
}
},_applyFilters:function(node,arg){
var _421=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _424=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _425=true;
while(this._filters.hasNext()&&_425==true){
var _426=this._filters.getNext();
var res=_426.call(this,node,arg);
if(res!=null){
_421=res;
switch(res){
case stop:
case skip:
case skip+_424:
_425=false;
break;
}
}
}
return _421;
},crawl:function(_428,arg){
this.contextDocument=_428.ownerDocument;
this.onCrawlStart();
var _42a=this.type==NodeCrawler.TYPE_ASCENDING;
var _42b=this._applyFilters(_428,arg);
if(_42b!=NodeCrawler.STOP_CRAWLING){
if(_42a&&_42b==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_42a?_428.parentNode:_428;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_42d,arg){
var _42f=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_42f=this._crawlDescending(_42d,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_42f=this._crawlAscending(_42d,arg);
break;
}
return _42f;
},_crawlDescending:function(_430,arg){
var skip=NodeCrawler.SKIP_NODE;
var _433=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _435=null;
if(_430.hasChildNodes()){
var node=_430.firstChild;
while(node!=null&&_435!=stop){
this.currentNode=node;
_435=this._applyFilters(node,arg);
switch(_435){
case stop:
case _433:
case skip+_433:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_435=stop;
break;
}
}
}
if(_435!=stop&&_435!=skip){
this.previousNode=node;
}
break;
}
if(_435!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _435;
},_crawlAscending:function(_438,arg){
var _43a=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_438!=null){
this.currentNode=_438;
_43a=this._applyFilters(_438,arg);
if(_43a!=stop){
var next=this.nextNode?this.nextNode:_438.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_438;
_43a=this._crawl(next,arg);
}
}
}else{
_43a=stop;
}
return _43a;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _43e in this){
this[_43e]=null;
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
var _441=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_441=NodeCrawler.SKIP_NODE;
}
return _441;
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
this.addFilter(function(_442,arg){
var _444=null;
if(!UserInterface.hasBinding(_442)){
_444=NodeCrawler.SKIP_NODE;
}
return _444;
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
this.addFilter(function(_446,arg){
var _448=null;
var _449=UserInterface.getBinding(_446);
if(Interfaces.isImplemented(ICrawlerHandler,_449)==true){
self.response=null;
_449.handleCrawler(self);
_448=self.response;
}
return _448;
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
this.addFilter(function(_44b,list){
var _44d=null;
var _44e=UserInterface.getBinding(_44b);
if(Interfaces.isImplemented(IFlexible,_44e)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_44e);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_44e.isFlexSuspended==true){
_44d=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_44e);
}
break;
}
}
return _44d;
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
this.addFilter(function(_44f,list){
var _451=null;
var _452=UserInterface.getBinding(_44f);
if(_452.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_452)==true){
if(_452.isFocusable&&_452.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_452);
break;
case FocusCrawler.MODE_FOCUS:
if(!_452.isFocused){
_452.focus();
}
_451=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_452.isFocused==true){
_452.blur();
_451=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _451;
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
this.addFilter(function(_453,list){
var _455=null;
var _456=UserInterface.getBinding(_453);
if(!_456.isVisible){
_455=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _455;
});
this.addFilter(function(_457,list){
var _459=null;
var _45a=UserInterface.getBinding(_457);
if(_45a.isAttached){
if(Interfaces.isImplemented(IFit,_45a)){
if(!_45a.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_45a);
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
UpdateAssistant.serialize=function(_45b){
_45b=_45b.cloneNode(true);
_45b.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_45b.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_45b);
};
}
},handleEvent:function(e){
var _45d=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_45d);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_45d);
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
},_beforeUpdate:function(_45e){
var _45f=(_45e==document.documentElement);
if(_45f){
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
var _462=FocusBinding.focusedBinding;
if(_462!=null){
this._focusID=_462.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_45e.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_45e);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_45e,false);
break;
}
}
},_afterUpdate:function(_463){
var _464=(_463==document.documentElement);
if(_464){
var _465=this._elementsbuffer;
if(_465.hasEntries()){
_465.each(function(_466){
DocumentManager.attachBindings(_466);
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
var _469=FocusBinding.focusedBinding;
if(_469==null){
var _46a=document.getElementById(this._focusID);
if(_46a!=null){
var _469=UserInterface.getBinding(_46a);
if(_469!=null){
_469.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _46b=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _46c="NEW DOM: "+document.title+"\n\n"+_46b+"\n\n";
_46c+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_46c);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_463.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_463);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_463,true);
break;
}
switch(_463.id){
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
var _469=UserInterface.getBinding(_463);
while(_469==null&&_463!=null){
_469=UserInterface.getBinding(_463);
_463=_463.parentNode;
}
if(_469!=null){
_469.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_46e,_46f){
var _470=UserInterface.getBinding(_46e);
if(_470!=null){
if(_46f){
var _471=this._attributesbuffer;
var map=new Map();
_471.each(function(name,old){
var now=_46e.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_46e.attributes).each(function(att){
if(att.specified){
if(!_471.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_478){
var _479=_470.propertyMethodMap[name];
if(_479!=null){
_479.call(_470,_478);
}
});
}else{
var map=new Map();
new List(_46e.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_47b,_47c){
var _47d=window.bindingMap[_47b.getAttribute("id")];
if(_47d!=null){
return _47d.handleElement(_47b,_47c);
}
},updateElement:function(_47e,_47f){
var _480=window.bindingMap[_47e.getAttribute("id")];
if(_480!=null){
return _480.updateElement(_47e,_47f);
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
this.addFilter(function(_482,list){
var _484=UserInterface.getBinding(_482);
var _485=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_484==null){
UserInterface.registerBinding(_482);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_484!=null){
if(!_484.isAttached){
list.add(_484);
}
if(_484.isLazy==true){
_485=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_484!=null){
list.add(_484);
}
break;
}
return _485;
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
},handleBroadcast:function(_486,arg){
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
var _489=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_489)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_489!=null){
if(_489.href!=null&&_489.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _48a=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_48a!=null){
var map={};
var _48c=DOMUtil.getElementsByTagName(_48a,"bindingmapping");
new List(_48c).each(function(_48d){
var _48e=_48d.getAttribute("element");
var _48f=_48d.getAttribute("binding");
map[_48e]=eval(_48f);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_490){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_490;
}else{
this.customUserInterfaceMapping.merge(_490);
}
},_registerBindings:function(_491){
var _492=new DocumentCrawler();
_492.mode=DocumentCrawler.MODE_REGISTER;
_492.crawl(_491);
_492.dispose();
},_attachBindings:function(_493){
var _494=new DocumentCrawler();
_494.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_494.crawl(_493,list);
var _496=false;
while(list.hasNext()){
var _497=list.getNext();
if(!_497.isAttached){
_497.onBindingAttach();
if(!_497.memberDependencies){
_497.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_497)){
_496=true;
}
}
}
if(_496){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_494.dispose();
list.dispose();
},attachBindings:function(_499){
this._registerBindings(_499);
this._attachBindings(_499);
},detachBindings:function(_49a,_49b){
var _49c=new DocumentCrawler();
_49c.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_49c.crawl(_49a,list);
if(_49b==true){
list.extractFirst();
}
var _49e=false;
list.reverse().each(function(_49f){
if(Interfaces.isImplemented(IData,_49f)){
_49e=true;
}
_49f.dispose(true);
});
if(_49e){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49c.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a1){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a1)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a2){
this.isDirty=true;
var _4a3=false;
if(_4a2!=null&&!_4a2.isDirty){
_4a2.isDirty=true;
_4a2.dispatchAction(Binding.ACTION_DIRTY);
_4a3=true;
}
return _4a3;
},clean:function(_4a4){
if(_4a4.isDirty){
_4a4.isDirty=false;
}
},registerDataBinding:function(name,_4a6){
if(Interfaces.isImplemented(IData,_4a6,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4a6;
}
}else{
throw "Invalid DataBinding: "+_4a6;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4a9=null;
if(this._dataBindings[name]!=null){
_4a9=this._dataBindings[name];
}
return _4a9;
},getAllDataBindings:function(_4aa){
var list=new List();
for(var name in this._dataBindings){
var _4ad=this._dataBindings[name];
list.add(_4ad);
if(_4aa&&_4ad instanceof WindowBinding){
var _4ae=_4ad.getContentWindow().DataManager;
if(_4ae!=null){
list.merge(_4ae.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4af=false;
for(var name in this._dataBindings){
_4af=true;
break;
}
return _4af;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b3){
var _4b4=this._dataBindings[name];
if(_4b4!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b4.setResult(_4b3);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b4);
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
var _4b5=new DataBindingMap();
_4b5.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4b7=this._dataBindings[name];
if(_4b7 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4b5[name]=_4b7.getValue();
}
return _4b5;
},getDataBindingResultMap:function(){
var _4b8=new DataBindingMap();
_4b8.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4ba=this._dataBindings[name];
var res=_4ba.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4bd){
_4b8.set(name,_4bd);
});
}else{
_4b8.set(name,res);
}
}
return _4b8;
},getPostBackString:function(){
var _4be="";
var form=document.forms[0];
if(form!=null){
var _4c0="";
new List(form.elements).each(function(_4c1){
var name=_4c1.name;
var _4c3=encodeURIComponent(_4c1.value);
switch(_4c1.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4be+=name+"="+_4c3+"&";
break;
case "submit":
if(document.activeElement==_4c1){
_4be+=name+"="+_4c3+"&";
}
break;
case "radio":
if(_4c1.checked){
_4be+=name+"="+_4c3+"&";
}
break;
case "checkbox":
if(_4c1.checked){
if(_4c1.name==_4c0){
if(_4be.lastIndexOf("&")==_4be.length-1){
_4be=_4be.substr(0,_4be.length-1);
}
_4be+=","+_4c3;
}else{
_4be+=name+"="+_4c1.value;
}
_4c0=name;
_4be+="&";
}
break;
}
});
}
return _4be.substr(0,_4be.length-1);
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
var _4cc=null;
var _4cd=null;
var _4ce=false;
if(!this._cache[name]){
_4ce=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d0=DOMUtil.getXMLHTTPRequest();
_4d0.open("get",uri,false);
_4d0.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d0.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cd=_4d0.responseText;
break;
default:
_4cd=_4d0.responseXML;
break;
}
if(_4cd==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4cd;
}
}
_4cd=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cc=_4cd;
break;
case this._modes.MODE_DOCUMENT:
_4cc=DOMUtil.cloneNode(_4cd,true);
break;
case this._modes.MODE_ELEMENT:
_4cc=DOMUtil.cloneNode(_4cd.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4cc=DOMSerializer.serialize(_4cd,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4cc=DOMSerializer.serialize(_4cd.documentElement,true);
break;
}
if(_4ce&&Application.isDeveloperMode){
}
return _4cc;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d3){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d3];
},invoke:function(url,_4d5,_4d6){
this._logger.error("Not implemented");
},invokeModal:function(url,_4d8,_4d9){
var _4da=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4d8,argument:_4d9});
StageBinding.presentViewDefinition(_4da);
return _4da;
},invokeDefinition:function(_4db){
if(_4db instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4db);
}
return _4db;
},question:function(_4dc,text,_4de,_4df){
if(!_4de){
_4de=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4dc,text,_4de,_4df);
},message:function(_4e0,text,_4e2,_4e3){
if(!_4e2){
_4e2=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e0,text,_4e2,_4e3);
},error:function(_4e4,text,_4e6,_4e7){
if(!_4e6){
_4e6=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e4,text,_4e6,_4e7);
},warning:function(_4e8,text,_4ea,_4eb){
if(!_4ea){
_4ea=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4e8,text,_4ea,_4eb);
},_standardDialog:function(type,_4ed,text,_4ef,_4f0){
var _4f1=null;
if(!_4ef){
_4f1=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f1=new List();
new List(_4ef).each(function(_4f2){
var _4f3=null;
switch(typeof _4f2){
case "object":
_4f3=_4f2;
break;
case "string":
var _4f4=false;
if(_4f2.indexOf(":")>-1){
_4f2=_4f2.split(":")[0];
_4f4=true;
}
_4f3=Dialog.dialogButton(_4f2);
if(_4f4){
_4f3.isDefault=true;
}
break;
}
_4f1.add(_4f3);
});
}
var _4f5={title:_4ed,text:text,type:type,image:this._dialogImages[type],buttons:_4f1};
var _4f6=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f0,argument:_4f5});
StageBinding.presentViewDefinition(_4f6);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4f8,arg){
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
},saveAll:function(_4fb){
var self=this;
var _4fd=Application.getDirtyDockTabsTabs();
if(_4fd.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4fe,_4ff){
switch(_4fe){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4ff,_4fb);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4fd);
}else{
if(_4fb){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_500,_501){
var _502=false;
var list=new List();
_500.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_502=true;
var _506=list.getLength();
var _507={handleBroadcast:function(_508,tab){
if(--_506==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_501){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_507);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _502;
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
var _50c="Composite.Management.Help";
if(!StageBinding.isViewOpen(_50c)){
StageBinding.handleViewPresentation(_50c);
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
var _50e=document.createEvent("Events");
_50e.initEvent(type,true,true);
window.dispatchEvent(_50e);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _510=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _511=_510.exec(url?url:"");
if(_511){
if(_511[3]=="media"){
this.isMedia=true;
}else{
if(_511[3]=="page"){
this.isPage=true;
}
}
}
var _512={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_512[$1]=$3;
});
this.queryString=_512;
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
Uri.prototype.setParam=function(key,_51b){
if(_51b==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_51b;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _51d=[];
for(var key in this.queryString){
_51d.push(key+"="+this.queryString[key]);
}
if(_51d.length>0){
url+="?"+_51d.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_51f,_520){
var _521=null;
var _522=ViewDefinitions[_51f];
if(_522.isMutable){
var impl=null;
if(_522 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_520!=null&&impl!=null){
var def=new impl();
for(var prop in _522){
def[prop]=ViewDefinition.cloneProperty(_522[prop]);
}
def.handle=_520;
_521=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _521;
};
ViewDefinition.cloneProperty=function(_526){
if(null==_526){
return _526;
}
if(typeof _526==="object"){
var _527=(_526.constructor===Array)?[]:{};
for(var prop in _526){
_527[prop]=ViewDefinition.cloneProperty(_526[prop]);
}
return _527;
}
return _526;
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
Binding.evaluate=function(_52e,_52f){
var _530=null;
var _531=_52f.bindingWindow.WindowManager;
if(_531!=null){
var _532=Binding.parseScriptStatement(_52e,_52f.key);
_530=_531.evaluate(_532);
}
return _530;
};
Binding.parseScriptStatement=function(_533,key){
if(_533!=null&&key!=null){
var _535="UserInterface.getBindingByKey ( \""+key+"\" )";
_533=_533.replace(/(\W|^)this(,| +|\)|;)/g,_535);
_533=_533.replace(/(\W|^)this(\.)/g,_535+".");
}
return _533;
};
Binding.exists=function(_536){
var _537=false;
try{
if(_536&&_536.bindingElement&&_536.bindingElement.nodeType&&_536.isDisposed==false){
_537=true;
}
}
catch(accessDeniedException){
_537=false;
}
finally{
return _537;
}
};
Binding.destroy=function(_538){
if(!_538.isDisposed){
if(_538.acceptor!=null){
_538.acceptor.dispose();
}
if(_538.dragger!=null){
_538.disableDragging();
}
if(_538.boxObject!=null){
_538.boxObject.dispose();
}
if(_538._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_538);
}
for(var _539 in _538.shadowTree){
var _53a=_538.shadowTree[_539];
if(_53a instanceof Binding&&Binding.exists(_53a)){
_53a.dispose(true);
}
_538.shadowTree[_539]=null;
}
_538.isDisposed=true;
_538=null;
}
};
Binding.dotnetify=function(_53b,_53c){
var _53d=_53b.getCallBackID();
if(_53d!=null){
var _53e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_53b.bindingDocument);
_53e.type="hidden";
_53e.id=_53d;
_53e.name=_53d;
_53e.value=_53c!=null?_53c:"";
_53b.bindingElement.appendChild(_53e);
_53b.shadowTree.dotnetinput=_53e;
}else{
throw _53b.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_53f){
var _540=_53f.getProperty("image");
var _541=_53f.getProperty("image-hover");
var _542=_53f.getProperty("image-active");
var _543=_53f.getProperty("image-disabled");
if(_53f.imageProfile==null){
if(_53f.image==null&&_540!=null){
_53f.image=_540;
}
if(_53f.imageHover==null&&_541!=null){
_53f.imageHover=_541;
}
if(_53f.imageActive==null&&_542!=null){
_53f.imageActive=_542;
}
if(_53f.imageDisabled==null&&_543!=null){
_53f.imageDisabled=_543;
}
if(_53f.image||_53f.imageHover||_53f.imageActive||_53f.imageDisabled){
_53f.imageProfile=new ImageProfile(_53f);
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
var _545=this.dependentBindings[key];
_545.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_546){
if(_546){
this.memberDependencies[_546.key]=true;
var _547=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_547=false;
break;
}
}
if(_547){
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
Binding.prototype.detachRecursive=function(_549){
if(_549==null){
_549=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_549);
};
Binding.prototype.addMember=function(_54a){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_54a.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_54a.key]=false;
_54a.registerDependentBinding(this);
}
}
return _54a;
};
Binding.prototype.addMembers=function(_54b){
while(_54b.hasNext()){
var _54c=_54b.getNext();
if(!_54c.isInitialized){
this.addMember(_54c);
}
}
return _54b;
};
Binding.prototype.registerDependentBinding=function(_54d){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_54d.key]=_54d;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _54e=this.getProperty("persist");
if(_54e&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _550=new List(_54e.split(" "));
while(_550.hasNext()){
var prop=_550.getNext();
var _552=Persistance.getPersistedProperty(id,prop);
if(_552!=null){
this._persist[prop]=_552;
this.setProperty(prop,_552);
}else{
_552=this.getProperty(prop);
if(_552!=null){
this._persist[prop]=_552;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _553=this.getProperty("disabled");
var _554=this.getProperty("contextmenu");
var _555=this.getProperty("observes");
var _556=this.getProperty("onattach");
var _557=this.getProperty("hidden");
var _558=this.getProperty("blockactionevents");
if(_557==true&&this.isVisible==true){
this.hide();
}
if(_553&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_554){
this.setContextMenu(_554);
}
if(_555){
this.observe(this.getBindingForArgument(_555));
}
if(_558==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_556!=null){
Binding.evaluate(_556,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _55a=this.getProperty("draggable");
var _55b=this.getProperty("dragtype");
var _55c=this.getProperty("dragaccept");
var _55d=this.getProperty("dragreject");
if(_55a!=null){
this.isDraggable=_55a;
}
if(_55b!=null){
this.dragType=_55b;
if(_55a!=false){
this.isDraggable=true;
}
}
if(_55c!=null){
this.dragAccept=_55c;
}
if(_55d!=null){
this.dragReject=_55d;
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
Binding.prototype._updateBindingMap=function(_55e){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _561=null;
if(_55e){
_561=map[id];
if(_561!=null&&_561!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_561=map[id];
if(_561!=null&&_561==this){
delete map[id];
}
}
}else{
var _563=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_55e);
if(Application.isDeveloperMode==true){
alert(_563);
}else{
this.logger.error(_563);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_565){
};
Binding.prototype.handleBroadcast=function(_566,arg){
};
Binding.prototype.handleElement=function(_568){
return false;
};
Binding.prototype.updateElement=function(_569){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _56b=null;
switch(typeof arg){
case "object":
_56b=arg;
break;
case "string":
_56b=this.bindingDocument.getElementById(arg);
if(_56b==null){
_56b=Binding.evaluate(arg,this);
}
break;
}
if(_56b!=null&&_56b.nodeType!=null){
_56b=UserInterface.getBinding(_56b);
}
return _56b;
};
Binding.prototype.serialize=function(){
var _56c={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_56c.id=id;
}
var _56e=this.getProperty("binding");
if(_56e){
_56c.binding=_56e;
}
return _56c;
};
Binding.prototype.serializeToString=function(){
var _56f=null;
if(this.isAttached){
_56f=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _56f;
};
Binding.prototype.subTreeFromString=function(_570){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_570);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_571){
var _572=this.bindingElement.getAttribute(_571);
if(_572){
_572=Types.castFromString(_572);
}
return _572;
};
Binding.prototype.setProperty=function(prop,_574){
if(_574!=null){
_574=_574.toString();
if(String(this.bindingElement.getAttribute(prop))!=_574){
this.bindingElement.setAttribute(prop,_574);
if(this.isAttached==true){
if(Persistance.isEnabled&&_574!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_574;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_574);
}
}
var _575=this.propertyMethodMap[prop];
if(_575){
_575.call(this,this.getProperty(prop));
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
var _577=null;
if(Binding.exists(this)){
_577=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _577;
};
Binding.prototype.attachClassName=function(_578){
CSSUtil.attachClassName(this.bindingElement,_578);
};
Binding.prototype.detachClassName=function(_579){
CSSUtil.detachClassName(this.bindingElement,_579);
};
Binding.prototype.hasClassName=function(_57a){
return CSSUtil.hasClassName(this.bindingElement,_57a);
};
Binding.prototype.addActionListener=function(type,_57c){
_57c=_57c!=null?_57c:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_57c)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_57c);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_57c+")");
}
};
Binding.prototype.removeActionListener=function(type,_57e){
_57e=_57e?_57e:this;
if(Action.isValid(type)){
var _57f=this.actionListeners[type];
if(_57f){
var i=0,_581;
while((_581=_57f[i])!=null){
if(_581==_57e){
_57f.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_583){
_583=_583?_583:this;
DOMEvents.addEventListener(this.bindingElement,type,_583);
};
Binding.prototype.removeEventListener=function(type,_585){
_585=_585?_585:this;
DOMEvents.removeEventListener(this.bindingElement,type,_585);
};
Binding.prototype.subscribe=function(_586){
if(!this.hasSubscription(_586)){
this._subscriptions.set(_586,true);
EventBroadcaster.subscribe(_586,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_586);
}
};
Binding.prototype.unsubscribe=function(_587){
if(this.hasSubscription(_587)){
this._subscriptions.del(_587);
EventBroadcaster.unsubscribe(_587,this);
}
};
Binding.prototype.hasSubscription=function(_588){
return this._subscriptions.has(_588);
};
Binding.prototype.observe=function(_589,_58a){
_589.addObserver(this,_58a);
};
Binding.prototype.unObserve=function(_58b,_58c){
_58b.removeObserver(this,_58c);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _590={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_590);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_590);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _593=false;
var _594=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_594=setTimeout(function(){
self.handleContextEvent(e);
},800);
_593=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_593){
clearTimeout(_594);
_593=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_593){
clearTimeout(_594);
_593=false;
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
var _59a=null;
var _59b=null;
var _59c=false;
if(arg instanceof Action){
_59a=arg;
}else{
if(Action.isValid(arg)){
_59a=new Action(this,arg);
_59c=true;
}
}
if(_59a!=null&&Action.isValid(_59a.type)==true){
if(_59a.isConsumed==true){
_59b=_59a;
}else{
var _59d=this.actionListeners[_59a.type];
if(_59d!=null){
_59a.listener=this;
var i=0,_59f;
while((_59f=_59d[i++])!=null){
if(_59f&&_59f.handleAction){
_59f.handleAction(_59a);
}
}
}
var _5a0=true;
if(this.isBlockingActions==true){
switch(_59a.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_59c){
_5a0=false;
}
break;
}
}
if(_5a0){
_59b=this.migrateAction(_59a);
}else{
_59b=_59a;
}
}
}
return _59b;
};
Binding.prototype.migrateAction=function(_5a1){
var _5a2=null;
var _5a3=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a2&&node.nodeType!=Node.DOCUMENT_NODE){
_5a2=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a2){
_5a3=_5a2.dispatchAction(_5a1);
}else{
_5a3=_5a1;
}
}
return _5a3;
};
Binding.prototype.reflex=function(_5a5){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5a5);
}
};
Binding.prototype.getMigrationParent=function(){
var _5a6=null;
if(true){
try{
var _5a7=this.bindingElement.parentNode;
if(_5a7!=null){
_5a6=_5a7;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5a6=null;
}
}
return _5a6;
};
Binding.prototype.add=function(_5a8){
if(_5a8.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5a8.bindingElement);
}else{
throw "Could not add "+_5a8.toString()+" of different document origin.";
}
return _5a8;
};
Binding.prototype.addFirst=function(_5a9){
if(_5a9.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5a9.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5a9.toString()+" of different document origin.";
}
return _5a9;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5aa,_5ab){
return BindingFinder.getAncestorBindingByLocalName(this,_5aa,_5ab);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5ad){
return BindingFinder.getAncestorBindingByType(this,impl,_5ad);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5af){
return BindingFinder.getChildElementsByLocalName(this,_5af);
};
Binding.prototype.getChildElementByLocalName=function(_5b0){
return this.getChildElementsByLocalName(_5b0).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b1){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b1));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b2){
return this.getDescendantBindingsByLocalName(_5b2,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b3){
return this.getChildBindingsByLocalName(_5b3).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5b4,_5b5){
return BindingFinder.getDescendantBindingsByLocalName(this,_5b4,_5b5);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5b6){
return this.getDescendantBindingsByLocalName(_5b6,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5b9){
return BindingFinder.getNextBindingByLocalName(this,_5b9);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5ba){
return BindingFinder.getPreviousBindingByLocalName(this,_5ba);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5bb){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5bb);
};
Binding.prototype.isFirstBinding=function(_5bc){
return (this.getOrdinalPosition(_5bc)==0);
};
Binding.prototype.isLastBinding=function(_5bd){
return DOMUtil.isLastElement(this.bindingElement,_5bd);
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
Binding.prototype.setCallBackArg=function(_5bf){
this.setProperty(Binding.CALLBACKARG,_5bf);
};
Binding.prototype.dispose=function(_5c0){
if(!this.isDisposed){
if(!_5c0){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c1=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c1){
if(Client.isExplorer){
_5c1.outerHTML="";
}else{
_5c1.parentNode.removeChild(_5c1);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5c4){
list.add(_5c4);
});
list.each(function(_5c5){
self.unsubscribe(_5c5);
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
Binding.prototype.wakeUp=function(_5c7,_5c8){
_5c8=_5c8?_5c8:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5c7!==undefined){
self[_5c7]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5c8);
},0);
}
};
Binding.prototype.handleCrawler=function(_5ca){
if(_5ca.response==null&&this.isLazy==true){
if(_5ca.id==DocumentCrawler.ID&&_5ca.mode==DocumentCrawler.MODE_REGISTER){
_5ca.response=NodeCrawler.NORMAL;
}else{
_5ca.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5ca.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5ca.id)){
_5ca.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5ca.response==null){
switch(_5ca.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5ca.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5cb){
var _5cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5cb);
return UserInterface.registerBinding(_5cc,Binding);
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
var _5cd=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5cd.each(function(_5ce){
DataBinding.expressions[_5ce.Key]=new RegExp(_5ce.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5cf){
var _5d0=null;
var _5d1=_5cf.getAncestorBindingByLocalName("field");
if(_5d1&&_5d1 instanceof FieldBinding){
var desc=_5d1.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d0=desc.getLabel();
}
}
return _5d0;
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
var _5d4=this.bindingWindow.DataManager;
_5d4.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5d6=this.bindingWindow.DataManager;
if(_5d6.getDataBinding(name)){
_5d6.unRegisterDataBinding(name);
}
_5d6.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5d7,arg){
RootBinding.superclass.handleBroadcast.call(this,_5d7,arg);
var _5d9=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5d7){
case _5d9:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5d9);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5da){
var _5db=_5da?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5da!=this.isActivated){
this.isActivated=_5da;
this.dispatchAction(_5db);
var _5dc=new List();
var self=this;
this._activationawares.each(function(_5de){
if(_5de.isActivationAware){
try{
if(_5da){
if(!_5de.isActivated){
_5de.onActivate();
}
}else{
if(_5de.isActivated){
_5de.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5dc.add(_5de);
}
}
});
_5dc.each(function(_5df){
this._activationawares.del(_5df);
});
_5dc.dispose();
}else{
var _5e0="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e0);
}else{
this.logger.error(_5e0);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e1,_5e2){
if(Interfaces.isImplemented(IActivationAware,_5e1,true)==true){
if(_5e2==false){
this._activationawares.del(_5e1);
}else{
this._activationawares.add(_5e1);
if(this.isActivated==true){
_5e1.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e1+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e3){
var _5e4=this.getMigrationParent();
if(_5e4!=null){
var root=_5e4.ownerDocument.body;
var _5e6=UserInterface.getBinding(root);
if(_5e6!=null){
_5e6.makeActivationAware(this,_5e3);
}
}
};
RootBinding.prototype.handleCrawler=function(_5e7){
RootBinding.superclass.handleCrawler.call(this,_5e7);
if(_5e7.type==NodeCrawler.TYPE_ASCENDING){
_5e7.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5e8=null;
if(this.bindingWindow.parent){
_5e8=this.bindingWindow.frameElement;
}
return _5e8;
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
StyleBinding.prototype.handleElement=function(_5e9){
return true;
};
StyleBinding.prototype.updateElement=function(_5ea){
var href=_5ea.getAttribute("link");
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
var _5ec=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5ec.hasNext()){
var cell=_5ec.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5ee){
var _5ef=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5ee.bindingElement);
_5ef=_5ee;
}else{
_5ef=MatrixBinding.superclass.add.call(this,_5ee);
}
return _5ef;
};
MatrixBinding.prototype.addFirst=function(_5f0){
var _5f1=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f2=this.shadowTree[MatrixBinding.CENTER];
_5f2.insertBefore(_5f0.bindingElement,_5f2.firstChild);
_5f1=_5f0;
}else{
_5f1=MatrixBinding.superclass.addFirst.call(this,_5f0);
}
return _5f0;
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
MatrixBinding.newInstance=function(_5f4){
var _5f5=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f4);
return UserInterface.registerBinding(_5f5,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f6,_5f7){
var list=new List();
var _5f9=new FlexBoxCrawler();
_5f9.mode=_5f7?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5f9.startBinding=_5f6;
_5f9.crawl(_5f6.bindingElement,list);
list.each(function(_5fa){
_5fa.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fb){
if(Binding.exists(_5fb)){
_5fb.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fc){
if(Binding.exists(_5fc)){
_5fc.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5f9.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5fd){
FlexBoxBinding.superclass.handleAction.call(this,_5fd);
switch(_5fd.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5fe){
var _5ff=0;
var _600=new List(this.bindingElement.parentNode.childNodes);
while(_600.hasNext()){
var _601=_600.getNext();
if(_601.nodeType==Node.ELEMENT_NODE&&_601!=this.bindingElement){
if(!this._isOutOfFlow(_601)){
var rect=_601.getBoundingClientRect();
if(_5fe){
height+=(rect.right-rect.left);
}else{
_5ff+=(rect.bottom-rect.top);
}
}
}
}
return _5ff;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_603){
var _604=CSSComputer.getPosition(_603);
var _605=CSSComputer.getFloat(_603);
return (_604=="absolute"||_605!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _606=this.bindingElement.parentNode;
var rect=_606.getBoundingClientRect();
var _608=rect.bottom-rect.top;
var _609=CSSComputer.getPadding(_606);
var _60a=CSSComputer.getBorder(_606);
_608-=(_609.top+_609.bottom);
_608-=(_60a.top+_60a.bottom);
return _608;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60b=this.bindingElement.parentNode;
var rect=_60b.getBoundingClientRect();
var _60d=rect.right-rect.left;
var _60e=CSSComputer.getPadding(_60b);
var _60f=CSSComputer.getBorder(_60b);
_60d-=(_60e.left+_60e.right);
_60d-=(_60f.left+_60f.right);
return _60d;
};
FlexBoxBinding.prototype.setFlexibility=function(_610){
if(_610!=this.isFlexible){
if(_610){
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
this.isFlexible=_610;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _611=this._getSiblingsSpan();
_611=this._getCalculatedHeight()-_611;
if(!isNaN(_611)&&_611>=0){
this.bindingElement.style.height=String(_611)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_612){
if(!this.isFit||_612){
var _613=0;
new List(this.bindingElement.childNodes).each(function(_614){
if(_614.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_614)){
var rect=_614.getBoundingClientRect();
_613+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_613);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_616){
var _617=CSSComputer.getPadding(this.bindingElement);
var _618=CSSComputer.getBorder(this.bindingElement);
_616+=_617.top+_617.bottom;
_616+=_618.top+_618.bottom;
this.bindingElement.style.height=_616+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_619){
ScrollBoxBinding.superclass.handleAction.call(this,_619);
switch(_619.type){
case BalloonBinding.ACTION_INITIALIZE:
_619.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_61a){
this.bindingElement.scrollLeft=_61a.x;
this.bindingElement.scrollTop=_61a.y;
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
var _61b=this,_61c=document.createElement("x");
_61c.innerHTML=_61b.responseText;
var uses=_61c.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _622=_61c.querySelector("#"+hash);
if(_622){
var _623=_622.cloneNode(true);
_623.id=def.id;
def.parentNode.replaceChild(_623,def);
}
}
LabelBinding.sprites=_61c;
LabelBinding.spriteLoading=false;
LabelBinding.spritesQueue.each(function(key,_625){
var _626=UserInterface.getBindingByKey(key);
if(_626!=null){
LabelBinding.setImageSvg(_626,_625);
}
});
LabelBinding.spritesQueue.empty();
}
if(!LabelBinding.spriteLoading){
LabelBinding.spriteLoading=true;
var _627=new XMLHttpRequest();
_627.open("GET",Resolver.resolve(LabelBinding.SPRITE_PATH));
_627.onload=onspriteload;
_627.send();
}
};
LabelBinding.setImageSvg=function(_628,_629){
if(typeof _629=="string"&&/^[A-Za-z]+[\w\-\.]*$/.test(_629)){
if(_628.shadowTree.labelBody){
if(!_629){
if(_628.shadowTree.svg){
if(_628.shadowTree.svg.parentNode){
_628.shadowTree.svg.parentNode.removeChild(_628.shadowTree.svg);
}
_628.shadowTree.svg=null;
}
}else{
if(LabelBinding.sprites){
var g=LabelBinding.sprites.querySelector("#"+_629);
if(g){
var _62b="http://www.w3.org/2000/svg";
if(!_628.shadowTree.svg){
_628.shadowTree.svg=_628.bindingDocument.createElementNS(_62b,"svg");
_628.shadowTree.labelBody.insertBefore(_628.shadowTree.svg,_628.shadowTree.labelBody.firstChild);
}
_628.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
var _62c=g.getAttribute("viewBox"),_62d=document.createDocumentFragment(),_62e=g.cloneNode(true);
if(_62c){
_628.shadowTree.svg.setAttribute("viewBox",_62c);
}
_62d.appendChild(_62e);
_628.shadowTree.svg.innerHTML="";
_628.shadowTree.svg.appendChild(_62d);
}
}else{
LabelBinding.spritesQueue.set(_628.getID(),_629);
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
var _62f=this._getBuildElement("labeltext");
if(_62f){
this.shadowTree.labelText=_62f;
this.shadowTree.text=_62f.firstChild;
this.hasLabel=true;
}
}else{
var _630=this.getProperty("label");
var _631=this.getProperty("image");
var _632=this.getProperty("tooltip");
if(_630){
this.setLabel(_630,false);
}
if(_631){
this.setImage(_631,false);
}
if(_632){
this.setToolTip(_632);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_633,_634){
_633=_633!=null?_633:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_633);
this.setProperty("label",_633);
if(!_634){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_636){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _637=Resolver.resolve(url);
if(_637.classes){
this.setAlphaTransparentBackdrop();
this.setImageSvg();
this.setImageClasses(_637.classes);
}else{
if(typeof _637=="string"&&_637[0]=="/"){
this.setAlphaTransparentBackdrop(_637);
this.setImageSvg();
this.setImageClasses();
}else{
this.setAlphaTransparentBackdrop();
this.setImageSvg(_637);
this.setImageClasses();
}
}
if(typeof _637=="string"){
this.setProperty("image",url);
}
this.hasImage=true;
if(!_636){
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
LabelBinding.prototype.setImageClasses=function(_638){
if(this.shadowTree.labelBody){
if(!_638){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_638;
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
this.shadowTree.labelBody.style.removeProperty("backgroundImage");
}
}
};
LabelBinding.prototype.getImage=function(){
return this.getProperty("image");
};
LabelBinding.prototype.setToolTip=function(_63c){
this.setProperty("tooltip",_63c);
if(_63c!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_63c));
}
};
LabelBinding.prototype.getToolTip=function(_63d){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_63e){
_63e=_63e==null?true:_63e;
var _63f=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_63e;
if(_63e){
this.attachClassName(_63f);
}else{
this.detachClassName(_63f);
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
var _640="textonly";
var _641="imageonly";
var _642="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_640);
this.detachClassName(_641);
this.attachClassName(_642);
}else{
if(this.hasLabel){
this.detachClassName(_642);
this.detachClassName(_641);
this.attachClassName(_640);
}else{
if(this.hasImage){
this.detachClassName(_642);
this.detachClassName(_640);
this.attachClassName(_641);
}
}
}
};
LabelBinding.newInstance=function(_643){
var _644=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_643);
return UserInterface.registerBinding(_644,LabelBinding);
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
var _645=this.getProperty("label");
if(!_645){
_645=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_645));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_647){
this.setProperty("label",_647);
};
TextBinding.newInstance=function(_648){
var _649=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_648);
return UserInterface.registerBinding(_649,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_64a,_64b){
BroadcasterBinding.superclass.setProperty.call(this,_64a,_64b);
function update(list){
if(list){
list.each(function(_64d){
_64d.setProperty(_64a,_64b);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _64e=this._observers[_64a];
if(_64e){
update(_64e);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_64f){
BroadcasterBinding.superclass.deleteProperty.call(this,_64f);
function update(list){
if(list){
list.each(function(_651){
_651.deleteProperty(_64f);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _652=this._observers[_64f];
if(_652){
update(_652);
}
};
BroadcasterBinding.prototype.addObserver=function(_653,_654){
_654=_654?_654:"*";
_654=new List(_654.split(" "));
while(_654.hasNext()){
var _655=_654.getNext();
switch(_655){
case "*":
this._setAllProperties(_653);
break;
default:
var _656=this.getProperty(_655);
_653.setProperty(_655,_656);
break;
}
if(!this._observers[_655]){
this._observers[_655]=new List();
}
this._observers[_655].add(_653);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_657){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _65a=att.nodeName;
switch(_65a){
case "id":
case "key":
break;
default:
var _65b=this.getProperty(_65a);
_657.setProperty(_65a,_65b);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_65c,_65d){
_65d=_65d?_65d:"*";
_65d=new List(_65d.split(" "));
while(_65d.hasNext()){
var list=this._observers[_65d.getNext()];
if(list){
while(list.hasNext()){
var _65f=list.getNext();
if(_65f==_65c){
list.del(_65f);
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
BroadcasterBinding.prototype.setDisabled=function(_660){
this.setProperty("isdisabled",_660);
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
ControlImageProfile.IMAGE_MINIMIZE=null;
ControlImageProfile.IMAGE_MAXIMIZE=null;
ControlImageProfile.IMAGE_RESTORE=null;
ControlImageProfile.IMAGE_CLOSE=null;
function ControlImageProfile(_6a3){
this.binding=_6a3;
}
ControlImageProfile.prototype._getImage=function(_6a4){
var _6a5=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6a5=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6a5=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6a5=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6a5=this.constructor.IMAGE_CLOSE;
break;
}
return _6a5.replace("${string}",_6a4);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6a6=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6a6=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6a6?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6a7){
ControlBoxBinding.superclass.handleAction.call(this,_6a7);
switch(_6a7.type){
case ControlBinding.ACTION_COMMAND:
var _6a8=_6a7.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a8);
Application.unlock(self);
},0);
_6a7.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6aa){
switch(_6aa.controlType){
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
ControlBoxBinding.prototype.setState=function(_6ab){
var _6ac=this.getState();
this.setProperty("state",_6ab);
this.detachClassName(_6ac);
this.attachClassName(_6ab);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6ad=this.getProperty("state");
if(!_6ad){
_6ad=ControlBoxBinding.STATE_NORMAL;
}
return _6ad;
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
MenuContainerBinding.prototype.isOpen=function(_6ae){
var _6af=null;
if(!_6ae){
_6af=this._isOpen;
}else{
_6af=(_6ae==this._openElement);
}
return _6af;
};
MenuContainerBinding.prototype.setOpenElement=function(_6b0){
if(_6b0){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6b0;
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
var _6b1=this.getChildBindingByLocalName("menupopup");
if(_6b1&&_6b1!=this.menuPopupBinding){
this.menuPopupBinding=_6b1;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6b2=this.getMenuContainerBinding();
_6b2.setOpenElement(this);
var _6b3=this.getMenuPopupBinding();
_6b3.snapTo(this.bindingElement);
_6b3.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6b4){
MenuContainerBinding.superclass.handleAction.call(this,_6b4);
if(_6b4.type==PopupBinding.ACTION_HIDE){
var _6b5=this.getMenuContainerBinding();
_6b5.setOpenElement(false);
this.reset();
_6b4.consume();
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
MenuBarBinding.prototype.handleAction=function(_6b6){
MenuBarBinding.superclass.handleAction.call(this,_6b6);
switch(_6b6.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b7=_6b6.target;
var _6b8=this.getChildBindingsByLocalName("menu");
while(_6b8.hasNext()){
var menu=_6b8.getNext();
}
switch(_6b7.arrowKey){
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
var _6ba=this.getProperty("image");
var _6bb=this.getProperty("label");
var _6bc=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6bb){
this.setLabel(_6bb);
}
if(_6ba){
this.setImage(_6ba);
}
if(_6bc){
this.setToolTip(_6bc);
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
MenuBinding.prototype.setLabel=function(_6be){
this.setProperty("label",_6be);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6be));
}
};
MenuBinding.prototype.setToolTip=function(_6bf){
this.setProperty("tooltip",_6bf);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6bf));
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
var _6c1=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6c1.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6c1.isOpen()&&!_6c1.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6c1.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6c1.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6c2,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6c2){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c7){
switch(_6c7.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c8=null;
var _6c9=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c7.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6cb){
for(var key in this._focused){
if(key!=_6cb.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6cb.key]=_6cb;
this._lastFocused=_6cb;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6ce){
delete this._focused[_6ce.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6cf){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6cf);
}
if(_6cf){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6d2=this.getChildBindingsByLocalName("menugroup");
var _6d3=null;
var _6d4=null;
while(_6d2.hasNext()){
var _6d5=_6d2.getNext();
if(!_6d5.isDefaultContent){
_6d5.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6d3&&_6d5.isVisible){
_6d3=_6d5;
}
if(_6d5.isVisible){
_6d4=_6d5;
}
}
}
if(_6d3&&_6d4){
_6d3.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6d4.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6d6){
MenuBodyBinding.activeInstance=this;
if(_6d6){
var _6d7=this._getMenuItems().getFirst();
if(_6d7){
_6d7.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d8=this._lastFocused;
if((_6d8!=null)&&(!_6d8.isMenuContainer)){
_6d8.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6da=this._getMenuItems();
var _6db=null;
var next=null;
if(this._lastFocused){
_6db=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6da.getPreceding(_6db);
break;
case KeyEventCodes.VK_DOWN:
next=_6da.getFollowing(_6db);
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
next=_6da.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6de=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6df){
_6de=_6df.getChildBindingsByLocalName("menuitem");
_6de.each(function(item){
list.add(item);
});
});
_6de=this.getChildBindingsByLocalName("menuitem");
_6de.each(function(item){
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
MenuBodyBinding.newInstance=function(_6e2){
var _6e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6e2);
return UserInterface.registerBinding(_6e3,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6e4){
switch(_6e4){
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
MenuGroupBinding.newInstance=function(_6e5){
var _6e6=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e5);
return UserInterface.registerBinding(_6e6,MenuGroupBinding);
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
var _6e7=this.getProperty("image");
var _6e8=this.getProperty("image-hover");
var _6e9=this.getProperty("image-active");
var _6ea=this.getProperty("image-disabled");
if(!this.image&&_6e7){
this.image=_6e7;
}
if(!this.imageHover&&_6e8){
this.imageHover=_6e7;
}
if(!this.imageActive&&_6e9){
this.imageActive=_6e9;
}
if(!this.imageDisabled&&_6ea){
this.imageDisabled=_6ea;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6eb=this.getProperty("label");
var _6ec=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6ee=this.getProperty("isdisabled");
var _6ef=this.getProperty("image");
var _6f0=this.getProperty("image-hover");
var _6f1=this.getProperty("image-active");
var _6f2=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6f3=this.getMenuPopupBinding();
if(_6f3){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6ef){
this.image=_6ef;
}
if(!this.imageHover&&_6f0){
this.imageHover=_6ef;
}
if(!this.imageActive&&_6f1){
this.imageActive=_6f1;
}
if(!this.imageDisabled&&_6f2){
this.imageDisabled=_6f2;
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
if(_6eb!=null){
this.setLabel(_6eb);
}
if(_6ec){
this.setToolTip(_6ec);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6ee==true){
this.disable();
}
var _6f4=this.getProperty("oncommand");
if(_6f4){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6f4);
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
MenuItemBinding.prototype.setLabel=function(_6f7){
this.setProperty("label",_6f7);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f7));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f8){
this.setProperty("tooltip",_6f8);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f8));
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
var _6fa=this.bindingDocument.createElement("div");
_6fa.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6fa.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6fb=this.labelBinding.bindingElement;
_6fb.insertBefore(_6fa,_6fb.firstChild);
_6fa.style.display="none";
this.shadowTree.checkBoxIndicator=_6fa;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6fa=this.bindingDocument.createElement("div");
_6fa.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6fa.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6fb=this.labelBinding.bindingElement;
_6fb.insertBefore(_6fa,_6fb.firstChild);
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
var _6fd=this.imageProfile.getDisabledImage();
if(_6fd){
this.setImage(_6fd);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6fd=this.imageProfile.getDefaultImage();
if(_6fd){
this.setImage(_6fd);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6ff=this.getMenuContainerBinding();
if(_6ff.isOpen()&&!_6ff.isOpen(this)){
_6ff._openElement.hide();
_6ff.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6ff=this.getMenuContainerBinding();
if(!_6ff.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_701){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _702=this.getMenuContainerBinding();
if(!_702||!_702.isOpen(this)||_701){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_703){
this.setChecked(true,_703);
};
MenuItemBinding.prototype.uncheck=function(_704){
this.setChecked(false,_704);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_705,_706){
this.setProperty("ischecked",_705);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_705){
this.isChecked=_705;
this.shadowTree.checkBoxIndicator.style.display=_705?"block":"none";
if(!_706){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_707){
var _708=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_707);
UserInterface.registerBinding(_708,MenuItemBinding);
return UserInterface.getBinding(_708);
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
PopupSetBinding.newInstance=function(_709){
var _70a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_709);
return UserInterface.registerBinding(_70a,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_70b,arg){
switch(_70b){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _70f=PopupBinding.activeInstances.get(key);
var _710=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_70f);
if(!_710){
list.add(_70f);
}
});
list.each(function(_711){
_711.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _713=PopupBinding.activeInstances.get(key);
_713.hide();
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
var _714=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _715=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_714){
this._bodyBinding=UserInterface.getBinding(_714);
}else{
if(_715){
this._bodyBinding=UserInterface.getBinding(_715);
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
var _716=this.getProperty("position");
this.position=_716?_716:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_717){
var _718=null;
if(this._bodyBinding){
this._bodyBinding.add(_717);
_718=_717;
}else{
_718=PopupBinding.superclass.add.call(this,_717);
}
return _718;
};
PopupBinding.prototype.addFirst=function(_719){
var _71a=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_719);
_71a=_719;
}else{
_71a=PopupBinding.superclass.addFirst.call(this,_719);
}
return _71a;
};
PopupBinding.prototype.handleAction=function(_71b){
PopupBinding.superclass.handleAction.call(this,_71b);
var _71c=_71b.target;
switch(_71b.type){
case Binding.ACTION_ATTACHED:
if(_71c instanceof MenuItemBinding){
this._count(true);
_71b.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_71c instanceof MenuItemBinding){
this._count(false);
_71b.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_71d){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_71d?1:-1);
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
PopupBinding.prototype.snapTo=function(_71e){
var _71f=this._getElementPosition(_71e);
switch(this.position){
case PopupBinding.POSITION_TOP:
_71f.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_71f.x+=_71e.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_71f.y+=_71e.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_71f.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_71e;
this.bindingElement.style.display="block";
this.setPosition(_71f.x,_71f.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_721){
this.bindingElement.style.display="block";
this.setPosition(_721.x,_721.y);
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
PopupBinding.prototype._getElementPosition=function(_726){
return _726.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_726):DOMUtil.getUniversalPosition(_726);
};
PopupBinding.prototype._getMousePosition=function(e){
var _728=DOMEvents.getTarget(e);
return _728.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_729){
var _72a=this.bindingElement;
if(_729){
_72a.style.visibility="visible";
}else{
_72a.style.visibility="hidden";
_72a.style.display="none";
}
this.isVisible=_729;
};
PopupBinding.prototype._enableTab=function(_72b){
var self=this;
var _72d=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_72d.each(function(_72e){
_72e.bindingElement.tabIndex=_72b?0:-1;
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
var _736=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_736.y<0){
y=-_736.y;
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
PopupBinding.prototype.grabKeyboard=function(_738){
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
var _73e=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_73e=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _73e;
};
PopupBinding.prototype.clear=function(){
var _73f=this._bodyBinding;
if(_73f){
_73f.detachRecursive();
_73f.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_740){
var _741=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_740);
return UserInterface.registerBinding(_741,PopupBinding);
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
PopupBodyBinding.newInstance=function(_743){
var _744=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_743);
return UserInterface.registerBinding(_744,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_745){
return new Point(_745.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_746){
var _747=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_746);
return UserInterface.registerBinding(_747,MenuPopupBinding);
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
var _748=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_748){
this._body=UserInterface.getBinding(_748);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _749=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_749.hasNext()){
var _74a=DialogBorderBinding.newInstance(this.bindingDocument);
_74a.setType(_749.getNext());
this.add(_74a);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _74b=this.getProperty("controls");
if(_74b){
var _74c=new List(_74b.split(" "));
while(_74c.hasNext()){
var type=_74c.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _74e=DialogControlBinding.newInstance(this.bindingDocument);
_74e.setControlType(type);
this._titlebar.addControl(_74e);
this.controlBindings[type]=_74e;
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
var _74f=this.getProperty("image");
var _750=this.getProperty("label");
var _751=this.getProperty("draggable");
var _752=this.getProperty("resizable");
var _753=this.getProperty("modal");
if(_74f){
this.setImage(_74f);
}
if(_750){
this.setLabel(_750);
}
if(_751==false){
this.isDialogDraggable=false;
}
if(_752==false){
this.isPanelResizable=false;
}
if(_753==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_754){
this.isModal=_754;
};
DialogBinding.prototype.setLabel=function(_755){
this.setProperty("label",_755);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_755));
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
DialogBinding.prototype.handleAction=function(_757){
DialogBinding.superclass.handleAction.call(this,_757);
switch(_757.type){
case Binding.ACTION_DRAG:
var _758=_757.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_758.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_758.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_758;
_758.dragger.registerHandler(this);
}
break;
}
}
_757.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_757.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_759,arg){
DialogBinding.superclass.handleBroadcast.call(this,_759,arg);
switch(_759){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_75b){
DialogBinding.superclass.handleInvokedControl.call(this,_75b);
switch(_75b.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_75c){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_75c){
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
var _75e=self.bindingElement;
setTimeout(function(){
_75e.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_75f){
this.bindingElement.style.zIndex=new String(_75f);
};
DialogBinding.prototype.onDragStart=function(_760){
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
DialogBinding.prototype.setResizable=function(_772){
if(this._isResizable!=_772){
if(_772){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_772;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _773=null;
var _774=this.bindingDocument.body.offsetWidth;
var _775=this.bindingDocument.body.offsetHeight;
_773={x:0.125*_774,y:0.125*_775,w:0.75*_774,h:0.5*_775};
return _773;
};
DialogBinding.prototype.centerOnScreen=function(){
var _776=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_776.w-dim.w),0.5*(_776.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _778=this;
var i=0;
function blink(){
if(i%2==0){
_778.detachClassName("active");
}else{
_778.attachClassName("active");
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
var _77c="";
while(list.hasNext()){
var type=list.getNext();
_77c+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_77c);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_77d){
var _77e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_77d);
return UserInterface.registerBinding(_77e,DialogBinding);
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
DialogHeadBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_77f);
return UserInterface.registerBinding(_780,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_783){
var _784=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_783);
return UserInterface.registerBinding(_784,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_785){
DialogSetBinding.superclass.handleAction.call(this,_785);
var _786=_785.target;
switch(_785.type){
case Binding.ACTION_MOVETOTOP:
if(_786 instanceof DialogBinding){
this._moveToTop(_786);
}
break;
case Binding.ACTION_MOVEDONTOP:
_785.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_787){
var _788=0;
var _789=this.getChildBindingsByLocalName("dialog");
_789.each(function(_78a){
var _78b=_78a.getZIndex();
_788=_78b>_788?_78b:_788;
});
_787.setZIndex(_788+2);
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
DialogBorderBinding.newInstance=function(_78d){
var _78e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_78d);
return UserInterface.registerBinding(_78e,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_78f){
this._dialogBinding=_78f;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_791){
DialogCoverBinding.superclass.handleAction.call(this,_791);
var _792=_791.target;
if(this._dialogBinding.isModal){
switch(_791.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_792==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_792.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_793,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_793,arg);
switch(_793){
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
var _796=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_796);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _797=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_797);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_798);
return UserInterface.registerBinding(_799,DialogCoverBinding);
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
var _79a=this.getProperty("image");
if(_79a){
this.setImage(_79a);
}
var _79b=this.getProperty("label");
if(_79b){
this.setLabel(_79b);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_79c){
if(this.isAttached){
this.labelBinding.setLabel(_79c);
}
this.setProperty("label",_79c);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_79e){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_79e);
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
DialogTitleBarBinding.newInstance=function(_79f){
var _7a0=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_79f);
return UserInterface.registerBinding(_7a0,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7a1){
var _7a2=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7a1);
return UserInterface.registerBinding(_7a2,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7a3){
var _7a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a3);
return UserInterface.registerBinding(_7a4,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7a5){
this.binding=_7a5;
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
var _7a8=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a9=node.nodeName.toLowerCase();
switch(_7a9){
case "script":
case "style":
case "textarea":
_7a8=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a8;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7b0=true;
if(exp.test(text)){
self._textnodes.add(node);
_7b0=false;
}
return _7b0;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7b1,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7b1,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b5=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b5+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7bb){
var _7bc="";
var _7bd="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7be="</span>";
var self=this;
function iterate(_7c0){
var _7c1=-1;
var _7c2=null;
self._map.each(function(key,exp){
var low=_7c0.toLowerCase();
var _7c6=low.search(exp);
if(_7c6>-1){
if(_7c1==-1){
_7c1=_7c6;
}
if(_7c6<=_7c1){
_7c1=_7c6;
_7c2=key;
}
}
});
if(_7c1>-1&&_7c2!=null){
var pre=_7c0.substring(0,_7c1);
var hit=_7c0.substring(_7c1,_7c1+_7c2.length);
var pst=_7c0.substring(_7c1+_7c2.length,_7c0.length);
_7bc+=pre+_7bd+hit+_7be;
iterate(pst);
}else{
_7bc+=_7c0;
}
}
iterate(_7bb);
return _7bc;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7ca){
var _7cb=new List(_7ca.getElementsByTagName("span"));
_7cb.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7ca.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7ce){
var _7cf=null;
if(_7ce.isAttached){
var doc=_7ce.getContentDocument();
if(doc!=null){
_7cf=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7cf,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7cf=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7cf instanceof SOAPFault){
_7cf=null;
}
}
}
}
return _7cf;
};
WindowBinding.highlightKeywords=function(_7d3,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d3.isAttached){
var doc=_7d3.getContentDocument();
if(doc!=null){
var _7d6=WindowBinding._highlightcrawler;
_7d6.reset(doc.body);
if(list!=null){
_7d6.setKeys(list);
_7d6.crawl(doc.body);
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
var _7d7=WindowBinding.superclass.serialize.call(this);
if(_7d7){
_7d7.url=this.getURL();
}
return _7d7;
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
var _7d9=this.getContentWindow().DocumentManager;
if(_7d9!=null){
_7d9.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7da){
WindowBinding.superclass.handleAction.call(this,_7da);
var _7db=_7da.target;
switch(_7da.type){
case RootBinding.ACTION_PHASE_3:
if(_7db.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7db);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7da.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7dc){
if(!this.isFit||_7dc){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7dd){
if(this._pageBinding==null){
if(_7dd.bindingWindow==this.getContentWindow()){
this._pageBinding=_7dd;
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
WindowBinding.prototype._registerOnloadListener=function(_7de){
var _7df=this.shadowTree.iframe;
var _7e0=_7de?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e3=true;
if(Client.isExplorer){
_7e3=_7df.readyState=="complete";
}
if(_7e3==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7e0](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7e4){
var _7e5=_7e4?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e5](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7ea=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7ea.getQueryString().each(function(name,_7ec){
if(_7ec.length>512){
data.set(name,_7ec);
_7ea.setParam(name,null);
}
});
url=_7ea.toString();
}
if(data){
var self=this;
var _7ee=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7ee.id;
form.setAttribute("target",_7ee.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7f1){
var _7f2=self.bindingDocument.createElement("input");
_7f2.name=name;
_7f2.value=_7f1;
_7f2.type="hidden";
form.appendChild(_7f2);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f3=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f3=url;
}
return _7f3;
};
WindowBinding.prototype.reload=function(_7f5){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f6=null;
if(this.shadowTree.iframe!=null){
_7f6=this.shadowTree.iframe;
}
return _7f6;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f7=null,_7f8=this.getFrameElement();
if(_7f8!==null){
try{
_7f7=_7f8.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f7;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f9=null,win=this.getContentWindow();
if(win){
_7f9=win.document;
}
return _7f9;
};
WindowBinding.prototype.getRootBinding=function(){
var _7fb=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7fb=UserInterface.getBinding(doc.body);
}
return _7fb;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7fd){
this.bindingElement.style.height=_7fd+"px";
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
WindowBinding.prototype.handleCrawler=function(_7fe){
WindowBinding.superclass.handleCrawler.call(this,_7fe);
if(_7fe.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7fe.nextNode=root.bindingElement;
}else{
_7fe.response=NodeCrawler.SKIP_CHILDREN;
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
var _803=this.getContentWindow();
if(_803!=null&&_803.document!=null&&_803.document.body!=null){
if(this.bindingElement.offsetHeight){
_803.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_803.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_804){
var _805=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_804);
var _806=UserInterface.registerBinding(_805,WindowBinding);
return _806;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_80a){
_80a.target.show();
_80a.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_80c){
_80c.target.show();
_80c.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_80e){
PreviewWindowBinding.superclass.handleAction.call(this,_80e);
switch(_80e.type){
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
var _80f=null;
this._getRadioButtonBindings().each(function(_810){
if(_810.getProperty("ischecked")){
_80f=_810;
return false;
}else{
return true;
}
});
if(_80f){
this._checkedRadioBinding=_80f;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_811){
RadioGroupBinding.superclass.handleAction.call(this,_811);
var _812=_811.target;
switch(_811.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_811.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_812.isRadioButton&&!_812.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_812);
}
this._checkedRadioBinding=_812;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_811.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_813,_814){
if(_813 instanceof RadioDataBinding){
_813=_813.getButton();
}
if(_813.isRadioButton){
switch(_814){
case true:
this._unCheckRadioBindingsExcept(_813);
this._checkedRadioBinding=_813;
_813.check(true);
break;
default:
_813.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_815){
var _816=this._getRadioButtonBindings();
_816.each(function(_817){
if(_817.isChecked&&_817!=_815){
_817.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _818=new Crawler();
var list=new List();
_818.addFilter(function(_81a){
var _81b=true;
var _81c=UserInterface.getBinding(_81a);
if(_81c instanceof RadioGroupBinding){
_81b=NodeCrawler.SKIP_CHILDREN;
}else{
if(_81c instanceof ButtonBinding&&_81c.isRadioButton){
list.add(_81c);
}
}
return _81b;
});
_818.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_81d){
var _81e=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_81d);
return UserInterface.registerBinding(_81e,RadioGroupBinding);
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
var _820=this.getProperty("regexrule");
if(_820!=null){
this.expression=new RegExp(_820);
}
var _821=this.getProperty("onbindingblur");
if(_821!=null){
this.onblur=function(){
Binding.evaluate(_821,this);
};
}
var _822=this.getProperty("onvaluechange");
if(_822!=null){
this.onValueChange=function(){
Binding.evaluate(_822,this);
};
}
if(this.error==null&&this.type!=null){
var _823=DataBinding.errors[this.type];
if(_823!=null){
this.error=_823;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _824=this.getProperty("value");
if(_824!=null){
this.setValue(String(_824));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _826=this.getProperty("isdisabled");
if(_826==true){
this.setDisabled(true);
}
var _827=this.getProperty("readonly");
if(_827==true){
this.setReadOnly(true);
}
var _828=this.getProperty("autoselect");
if(_828==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _829=this.getProperty("placeholder");
if(_829){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_829));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _82a=Localization.currentLang();
if(_82a!=null){
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
var _82b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_82b.type=this.isPassword==true?"password":"text";
_82b.tabIndex=-1;
return _82b;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_82e){
if(_82e){
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
DataInputBinding.prototype.focus=function(_830){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_830){
var self=this,_832=this.bindingElement,_833={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_832,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_832,DOMEvents.MOUSEUP,_833);
}else{
this.select();
}
}
this.onfocus();
if(!_830){
var _834=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_834);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _835=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _836=_835.createTextRange();
_836.moveStart("character",0);
_836.moveEnd("character",_835.value.length);
_836.select();
}else{
_835.setSelectionRange(0,_835.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_837){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_837){
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
DataInputBinding.prototype.validate=function(_83b){
if(_83b==true||this._isValid){
var _83c=this.isValid();
if(_83c!=this._isValid){
this._isValid=_83c;
if(!_83c){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _83d=null;
if(this._isInvalidBecauseRequired==true){
_83d=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_83d=DataBinding.warnings["minlength"];
_83d=_83d.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_83d=DataBinding.warnings["maxlength"];
_83d=_83d.replace("${count}",String(this.maxlength));
}else{
_83d=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_83d!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_83d);
}
}else{
this.setValue(_83d);
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
var _83e=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _83f=this.getValue();
if(_83f==""){
if(this.isRequired==true){
_83e=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _840=DataBinding.expressions[this.type];
if(!_840.test(_83f)){
_83e=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_83f)){
_83e=false;
}
}
}
}
if(_83e&&this.minlength!=null){
if(_83f.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_83e=false;
}
}
if(_83e&&this.maxlength!=null){
if(_83f.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_83e=false;
}
}
return _83e;
};
DataInputBinding.prototype.setDisabled=function(_841){
if(_841!=this.isDisabled){
if(_841){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _842=this.shadowTree.input;
if(_841){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_842,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_842,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_841;
this.shadowTree.input.unselectable=_841?"on":"off";
}
this.isDisabled=_841;
this.isFocusable=!_841;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_844){
if(_844!=this.isReadOnly){
if(_844){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_844;
this.isReadOnly=_844;
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
DataInputBinding.prototype.handleElement=function(_845){
return true;
};
DataInputBinding.prototype.updateElement=function(_846){
var _847=_846.getAttribute("value");
var _848=_846.getAttribute("type");
var _849=_846.getAttribute("maxlength");
var _84a=_846.getAttribute("minlength");
var _84b=_846.getAttribute("required")==="true";
if(_847==null){
_847="";
}
var _84c=this.bindingWindow.UpdateManager;
if(this.getValue()!=_847){
_84c.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_847);
}
if(this.type!=_848){
_84c.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_848;
}
if(this.maxlength!=_849){
_84c.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_849;
}
if(this.minlength!=_84a){
_84c.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_84a;
}
if(this.isRequired!=_84b){
_84c.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_84b;
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
DataInputBinding.prototype.setValue=function(_84d){
if(_84d===null){
_84d="";
}
if(_84d!=this.getValue()){
this.setProperty("value",_84d);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_84d);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _84e=null;
if(this.shadowTree.input!=null){
_84e=this.shadowTree.input.value;
}else{
_84e=this.getProperty("value");
}
return _84e;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _850=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_850=Number(_850);
break;
}
return _850;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_851){
var _852=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_851);
return UserInterface.registerBinding(_852,DataInputBinding);
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
var _853=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_853!=null){
this.setValue(_853.value);
_853.parentNode.removeChild(_853);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _854;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_854=div.firstChild;
}else{
_854=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_854.tabIndex=-1;
return _854;
};
TextBoxBinding.prototype.handleElement=function(_856){
return true;
};
TextBoxBinding.prototype.updateElement=function(_857){
var _858,area=_857.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_858=DOMUtil.getTextContent(area);
}
if(_858==null){
_858="";
}
var _85a=this.bindingWindow.UpdateManager;
if(this.getValue()!=_858){
_85a.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_858);
}
var _85b=_857.getAttribute("type");
if(this.type!=_85b){
_85a.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_85b;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_85f){
var _860=this.bindingDocument.selection.createRange();
var _861=_860.text=="";
if(_861&&!_85f){
_860.text="\t";
}else{
var text="";
var _863=_860.text.length;
while((_860.moveStart("word",-1)&&_860.text.charAt(1)!="\n")){
}
_860.moveStart("character",1);
var _864=0;
var i=0,line,_867=_860.text.split("\n");
while((line=_867[i++])!=null){
if(_85f){
line=line.replace(/^(\s)/mg,"");
_864++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_867[i+1]?"\n":"");
}
_860.text=text;
_860.moveStart("character",-_863);
if(_85f){
_860.moveStart("character",2*_867.length-2);
}
_860.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _868=this.bindingDocument.selection.createRange();
var _869=_868.duplicate();
while((_869.moveStart("word",-1)&&_869.text.indexOf("\n")==-1)){
}
_869.moveStart("character",1);
_868.text="\n"+_869.text.match(/^(\s)*/)[0]+"!";
_868.moveStart("character",-1);
_868.select();
_868.text="";
_868.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_86a){
var _86b;
var _86c;
var oss;
var osy;
var i;
var fnd;
var _871=this._getSelectedText();
var el=this.shadowTree.input;
_86b=el.scrollLeft;
_86c=el.scrollTop;
if(!_871.match(/\n/)){
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
_871=this._getSelectedText();
if(_86a){
ntext=_871.replace(/^(\s)/mg,"");
}else{
ntext=_871.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_871.length);
}
el.scrollLeft=_86b;
el.scrollTop=_86c;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _873;
var _874;
var oss;
var osy;
var el=this.shadowTree.input;
_873=el.scrollLeft;
_874=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_873;
el.scrollTop=_874;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _87b=this.shadowTree.input.value;
var _87c=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _87b.substr(_87c,end-_87c);
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
var _87e=this.getProperty("isdisabled");
if(this.isDisabled||_87e){
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
var _880=this.getProperty("label");
var _881=this.getProperty("value");
var _882=this.getProperty("width");
var _883=this.getProperty("onchange");
var _884=this.getProperty("required")==true;
var _885=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_880!=null){
this.label=_880;
}
if(!this.value&&_881!=null){
this.value=_881;
}
if(!this.width&&_882){
this.width=_882;
}
if(_884){
this.isRequired=true;
}
if(_885){
this._isLocal=true;
}
if(_883){
this.onValueChange=function(){
Binding.evaluate(_883,this);
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
var _886=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_886.name=this.getName();
_886.value=this.getValue();
_886.type="hidden";
if(this.hasCallBackID()){
_886.id=this.getCallBackID();
}
this.shadowTree.input=_886;
this.bindingElement.appendChild(_886);
};
SelectorBinding.prototype.buildButton=function(){
var _887=this.BUTTON_IMPLEMENTATION;
var _888=this.add(_887.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_888.imageProfile=this.imageProfile;
}
if(this.width!=null){
_888.setWidth(this.width);
}
this._buttonBinding=_888;
this.shadowTree.button=_888;
_888.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _889;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _88a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_88a.id="selectorpopupset";
_889=UserInterface.registerBinding(_88a,PopupSetBinding);
this.bindingDocument.body.appendChild(_889.bindingElement);
}else{
_889=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_889=top.app.bindingMap.selectorpopupset;
}
var doc=_889.bindingDocument;
var _88c=_889.add(PopupBinding.newInstance(doc));
var _88d=_88c.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_88c;
this._menuBodyBinding=_88d;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_88c.attachClassName("selectorpopup");
_88c.addActionListener(PopupBinding.ACTION_SHOW,this);
_88c.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_88c.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_88c);
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
var _890=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_890).each(function(_891){
var _892=_891.getAttribute("label");
var _893=_891.getAttribute("value");
var _894=_891.getAttribute("selected");
var _895=_891.getAttribute("image");
var _896=_891.getAttribute("image-hover");
var _897=_891.getAttribute("image-active");
var _898=_891.getAttribute("image-disabled");
var _899=null;
if(_895||_896||_897||_898){
_899=new ImageProfile({image:_895,imageHover:_896,imageActive:_897,imageDisabled:_898});
}
list.add(new SelectorBindingSelection(_892?_892:null,_893?_893:null,_894&&_894=="true",_899));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _89b=null;
while(list.hasNext()){
var _89c=list.getNext();
var item=this.addSelection(_89c);
if(_89c.isSelected){
this.select(item,true);
}
if(!_89b){
_89b=item;
}
}
if(!this._selectedItemBinding){
this.select(_89b,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_89e,_89f){
var _8a0=this.MENUITEM_IMPLEMENTATION;
var _8a1=this._menuBodyBinding;
var _8a2=_8a1.bindingDocument;
var _8a3=_8a0.newInstance(_8a2);
_8a3.imageProfile=_89e.imageProfile;
_8a3.setLabel(_89e.label);
if(_89e.tooltip!=null){
_8a3.setToolTip(_89e.tooltip);
}
_8a3.selectionValue=_89e.value;
_89e.menuItemBinding=_8a3;
if(_89f){
_8a1.addFirst(_8a3);
this.selections.addFirst(_89e);
}else{
_8a1.add(_8a3);
this.selections.add(_89e);
}
this._isUpToDate=false;
return _8a3;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a4){
return this.addSelection(_8a4,true);
};
SelectorBinding.prototype.clear=function(_8a5){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a5&&this.defaultSelection!=null){
var _8a6=this.addSelection(this.defaultSelection);
this.select(_8a6,true);
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
SelectorBinding.prototype.setDisabled=function(_8a7){
if(this.isAttached==true){
var _8a8=this._buttonBinding;
_8a8.setDisabled(_8a7);
}
if(_8a7){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a9){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a9);
}
};
SelectorBinding.prototype.handleAction=function(_8aa){
SelectorBinding.superclass.handleAction.call(this,_8aa);
switch(_8aa.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8aa.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8aa.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8aa.target);
_8aa.consume();
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
_8aa.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8ac){
this.select(_8ac);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8ad=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8ae=this._popupBinding.bindingElement;
_8ae.style.minWidth=_8ad;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8b0=Client.isExplorer?e.keyCode:e.which;
if(_8b0==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8b0=Client.isExplorer?e.keyCode:e.which;
if(_8b0>=32){
this._buttonBinding.check();
var _8b1=String.fromCharCode(_8b0);
this._pushSearchSelection(_8b1);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8b2){
this._searchString+=_8b2.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b3){
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
var _8b4=this._menuBodyBinding;
if(_8b4!=null){
var _8b5=this.MENUITEM_IMPLEMENTATION;
var _8b6=_8b4.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b8=list.getNext();
if(_8b8.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b8);
}
}
}
this._attachSelections();
var _8b9=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8ba=_8b4.getDescendantBindingsByType(_8b5);
if(_8ba.hasEntries()){
while(_8ba.hasNext()){
var _8bb=_8ba.getNext();
var _8bc=_8bb.labelBinding;
if(_8bc!=null&&_8bc.shadowTree!=null&&_8bc.shadowTree.labelText!=null){
_8bc.shadowTree.labelText.innerHTML=_8bc.shadowTree.labelText.innerHTML.replace(_8b9,"<b>$&</b>");
}
}
_8ba.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8bc=LabelBinding.newInstance(_8b6);
_8bc.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b4.add(_8bc);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b8=list.getNext();
var item=this.addSelection(_8b8);
if(this._selectionValue==_8b8.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8be,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8be,arg);
switch(_8be){
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
SelectorBinding.prototype.select=function(_8c1,_8c2){
var _8c3=false;
if(_8c1!=this._selectedItemBinding){
this._selectedItemBinding=_8c1;
_8c3=true;
var _8c4=this._buttonBinding;
this._selectionValue=_8c1.selectionValue;
this._selectionLabel=_8c1.getLabel();
_8c4.setLabel(_8c1.getLabel());
if(_8c1.imageProfile!=null){
_8c4.imageProfile=_8c1.imageProfile;
}
if(_8c4.imageProfile!=null){
_8c4.setImage(this.isDisabled==true?_8c4.imageProfile.getDisabledImage():_8c4.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8c2){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8c2)){
this.validate();
}
}
return _8c3;
};
SelectorBinding.prototype._relate=function(){
var _8c5=this.getProperty("relate");
if(_8c5){
var _8c6=this.bindingDocument.getElementById(_8c5);
if(_8c6){
var _8c7=UserInterface.getBinding(_8c6);
if(_8c7){
if(this.isChecked){
_8c7.show();
}else{
_8c7.hide();
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
SelectorBinding.prototype.selectByValue=function(_8c8,_8c9){
var _8ca=false;
var _8cb=this._menuBodyBinding;
var _8cc=_8cb.getDescendantElementsByLocalName("menuitem");
while(_8cc.hasNext()){
var _8cd=UserInterface.getBinding(_8cc.getNext());
if(_8cd.selectionValue==_8c8){
_8ca=this.select(_8cd,_8c9);
break;
}
}
return _8ca;
};
SelectorBinding.prototype.getValue=function(){
var _8ce=this._selectionValue;
if(_8ce!=null){
_8ce=String(_8ce);
}
return _8ce;
};
SelectorBinding.prototype.setValue=function(_8cf){
this.selectByValue(String(_8cf),true);
};
SelectorBinding.prototype.getResult=function(){
var _8d0=this._selectionValue;
if(_8d0=="null"){
_8d0=null;
}
if(_8d0){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8d0=Number(_8d0);
break;
}
}
return _8d0;
};
SelectorBinding.prototype.setResult=function(_8d1){
this.selectByValue(_8d1,true);
};
SelectorBinding.prototype.validate=function(){
var _8d2=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d3=this.getValue();
if(_8d3==this.defaultSelection.value){
_8d2=false;
}
if(_8d2!=this._isValid){
if(_8d2){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8d2;
}
return _8d2;
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
var _8d4=this._popupBinding;
if(!this._isUpToDate){
_8d4.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d5,_8d6){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d5));
return true;
};
SelectorBinding.newInstance=function(_8d7){
var _8d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d7);
return UserInterface.registerBinding(_8d8,SelectorBinding);
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
var _8db=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8db){
this.onValueChange=function(){
Binding.evaluate(_8db,this);
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
SimpleSelectorBinding.prototype.focus=function(_8de){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8de){
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
SimpleSelectorBinding.prototype._hack=function(_8df){
if(Client.isExplorer){
this._select.style.width=_8df?"auto":this._cachewidth+"px";
if(_8df){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8e0=true;
if(this.isRequired){
if(this.getValue()==null){
_8e0=false;
}
}
if(_8e0!=this._isValid){
if(_8e0){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8e1=this._select;
var _8e2=_8e1.options[_8e1.selectedIndex];
var text=DOMUtil.getTextContent(_8e2);
_8e1.blur();
_8e1.style.color="#A40000";
_8e1.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e2,DataBinding.warnings["required"]);
}
_8e1.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e2,text);
}
};
}
this._isValid=_8e0;
}
return _8e0;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e4=null;
var _8e5=this._select;
var _8e6=_8e5.options[_8e5.selectedIndex];
var _8e7=true;
if(Client.isExplorer){
var html=_8e6.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e7=false;
}
}
if(_8e7){
_8e4=_8e6.getAttribute("value");
}
return _8e4;
};
SimpleSelectorBinding.prototype.setValue=function(_8e9){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8ea){
this.setValue(_8ea);
};
SimpleSelectorBinding.newInstance=function(_8eb){
var _8ec=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8eb);
return UserInterface.registerBinding(_8ec,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8ed,_8ee,_8ef,_8f0,_8f1){
this._init(_8ed,_8ee,_8ef,_8f0,_8f1);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8f2,_8f3,_8f4,_8f5,_8f6){
if(_8f2!=null){
this.label=String(_8f2);
}
if(_8f3!=null){
this.value=String(_8f3);
}
if(_8f5!=null){
this.imageProfile=_8f5;
}
if(_8f6!=null){
this.tooltip=_8f6;
}
this.isSelected=_8f4?true:false;
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
var _8f7=this.getProperty("image");
if(_8f7){
this.setImage(_8f7);
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
var _8fa=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8fa.popupBindingTargetElement=this.shadowTree.input;
_8fa.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8fa.attach();
var self=this;
_8fa.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8fa;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8fd=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8fd).each(function(_8fe){
if(_8fe.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8ff=_8fe.getAttribute("value");
var _900=_8fe.getAttribute("selected");
var _901=_8fe.getAttribute("tooltip");
list.add({value:_8ff?_8ff:null,toolTip:_901?_901:null,isSelected:(_900&&_900=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _903=this._menuBodyBinding;
var _904=_903.bindingDocument;
while(_903.bindingElement.hasChildNodes()){
var node=_903.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_903.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _906=this.getProperty("emptyentrylabel");
if(_906){
var _907=MenuItemBinding.newInstance(_904);
_907.setLabel(_906);
_907.selectionValue="";
_903.add(_907);
}
while(list.hasNext()){
var _908=list.getNext();
var _907=MenuItemBinding.newInstance(_904);
_907.setLabel(_908.label?_908.label:_908.value);
_907.selectionValue=_908.value;
if(_908.image){
_907.setImage(_908.image);
}
if(_908.toolTip){
_907.setToolTip(_908.toolTip);
}
if(_908.isSelected){
this.select(_907,true);
}
_903.add(_907);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_909){
this.select(_909);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_90a,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_90a,arg);
switch(_90a){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_90a,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_90c){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_90c);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_90d){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_90d);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _90e=this.bindingElement.offsetWidth+"px";
var _90f=this._popupBinding.bindingElement;
_90f.style.minWidth=_90e;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _910=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _911=this.getValue();
var _912=null;
_910.each(function(item){
if(item.getLabel()==_911){
_912=item;
}
});
if(_912){
_912.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_915){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_915){
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
DataInputSelectorBinding.prototype.setValue=function(_916){
var _917=this.isReadOnly;
var _918=null;
if(_916!=null&&_916!=""){
var _919=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_919.hasNext()){
var item=_919.getNext();
if(item.selectionValue==_916){
_918=item.getLabel();
break;
}
}
}
if(_918!=null){
this.value=_916;
this.shadowTree.input.value=_918;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_916);
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
var _91c="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_91c);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_91c);
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
var _91e=ToolBarButtonBinding.newInstance(this.bindingDocument);
_91e.setImage("${icon:popup}");
this.addFirst(_91e);
_91e.attach();
var self=this;
_91e.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _920=self.getProperty("handle");
var _921=ViewDefinition.clone(_920,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_921 instanceof DialogViewDefinition){
_921.handler={handleDialogResponse:function(_922,_923){
self._isButtonClicked=false;
if(_922==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _924=_923.getFirst();
self.setValue(_924);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_921.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_921);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_91e.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_91e;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _926=this._dialogButtonBinding;
if(_926!=null){
_926.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _928=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_928=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _928;
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
var _92b=ToolBarButtonBinding.newInstance(this.bindingDocument);
_92b.setImage("${icon:editor-sourceview}");
_92b.bindingElement.style.left="-24px";
_92b.bindingElement.style.width="24px";
this.addFirst(_92b);
_92b.attach();
_92b.hide();
var self=this;
_92b.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_92b;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_92c){
UrlInputDialogBinding.superclass.setValue.call(this,_92c);
if(this.isAttached){
this.compositeUrl=new Uri(_92c);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _92d=TreeService.GetCompositeUrlLabel(_92c);
if(_92d!=_92c){
this.setLabel(_92d);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_92e){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_92e){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_92e;
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
var _92f=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _930=this.getProperty("image");
if(_930!=null){
_92f.setImage(_930);
}else{
_92f.setImage("${icon:popup}");
}
this.addFirst(_92f);
_92f.attach();
var self=this;
_92f.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_92f;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _932=this._dialogButtonBinding;
if(_932!=null){
_932.oncommand();
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
var _933=this.getProperty("required")==true;
if(_933){
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
var _934=this.getProperty("label");
var _935=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_934!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_934+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_934);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_935!=null){
this._buttonBinding.setToolTip(_935);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _936="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_936,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _938=g.getAttribute("viewBox"),_939=document.createDocumentFragment(),_93a=g.cloneNode(true);
if(_938){
this.shadowTree.indicatorimage.setAttribute("viewBox",_938);
}
_939.appendChild(_93a);
this.shadowTree.indicatorimage.appendChild(_939);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_93b){
DataDialogBinding.superclass.handleAction.call(this,_93b);
var _93c=_93b.target;
var self=this;
switch(_93b.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_93e,_93f){
if(_93e==Dialog.RESPONSE_ACCEPT){
if(_93f instanceof DataBindingMap){
self._map=_93f;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_93c==this._buttonBinding){
_93b.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_940,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_940,arg);
switch(_940){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _943=this.getProperty("handle");
var url=this.getURL();
var _945=null;
if(_943!=null||def!=null){
if(def!=null){
_945=def;
}else{
_945=ViewDefinitions[_943];
}
if(_945 instanceof DialogViewDefinition){
_945.handler=this._handler;
if(this._map!=null){
_945.argument=this._map;
}
StageBinding.presentViewDefinition(_945);
}
}else{
if(url!=null){
_945=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_945!=null){
this._dialogViewHandle=_945.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_946){
this.setProperty("label",_946);
if(this.isAttached){
this._buttonBinding.setLabel(_946+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_947){
this.setProperty("image",_947);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_947);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_948){
this.setProperty("tooltip",_948);
if(this.isAttached){
this._buttonBinding.setToolTip(_948);
}
};
DataDialogBinding.prototype.setHandle=function(_949){
this.setProperty("handle",_949);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_94b){
this._handler=_94b;
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
var _94c=true;
if(this.isRequired==true){
var _94d=this.getValue();
if(_94d==null||_94d==""){
_94c=false;
}
if(_94c!=this._isValid){
if(_94c){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_94c;
}
return _94c;
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
DataDialogBinding.newInstance=function(_94f){
var _950=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_94f);
return UserInterface.registerBinding(_950,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_952,_953){
if(_952==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_953);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_954){
_954=new String(_954);
this.dirty();
this.setValue(encodeURIComponent(_954));
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
var _958=this.getValue();
if(_958==null){
_958="";
}
this.shadowTree.dotnetinput.value=_958;
};
PostBackDataDialogBinding.prototype.setValue=function(_959){
this.setProperty("value",_959);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_95a){
};
PostBackDataDialogBinding.newInstance=function(_95b){
var _95c=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95b);
return UserInterface.registerBinding(_95c,PostBackDataDialogBinding);
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
var _95d=this.getProperty("dialoglabel");
var _95e=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _960=this.getProperty("handle");
var _961=this.getProperty("selectedtoken");
if(_960!=null){
var def=ViewDefinition.clone(_960,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_95d!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_95d;
}
if(_95e!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_95e;
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
if(_961!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_961;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_963){
var _964=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_963);
return UserInterface.registerBinding(_964,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_966){
self._datathing.setValue(_966);
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
var _969=self.getValue();
if(_969==""||_969==null){
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
var _96a=this.getProperty("value");
var _96b=this.getProperty("selectorlabel");
if(_96b==null){
_96b=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_96a==null));
list.add(new SelectorBindingSelection(_96b+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_96a!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _96a=this.getValue();
if(_96a==""||_96a==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_96d){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_96d);
switch(_96d.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_96d.target==this._datathing){
var _96e=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_96e){
self._selector.setLabel(_96e);
}
},500);
_96d.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_970){
this.setProperty("label",_970);
if(this._selector!=null){
this._selector.setLabel(_970);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_971){
this._datathing.setValue(_971);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_973,_974){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_973,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_975){
this._buttonBinding.setLabel(_975);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_976){
this._buttonBinding.setToolTip(_976);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_977){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_977);
switch(_977.type){
case MenuItemBinding.ACTION_COMMAND:
var _978=_977.target;
var _979=this.master;
if(_978.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_978.getLabel());
setTimeout(function(){
_979.action();
},0);
}else{
if(_979.getValue()){
_979.dirty();
}
_979.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_97a){
var _97b=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_97a);
return UserInterface.registerBinding(_97b,NullPostBackDataDialogSelectorBinding);
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
var _97c=this._dataDialogBinding;
if(_97c!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_97c.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _97d=this.getProperty("editable");
var _97e=this.getProperty("selectable");
var _97f=this.getProperty("display");
if(_97d!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_97e){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_97f){
this._display=_97f;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _980=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_980.selections=this.selections;
this.add(_980);
_980.attach();
this._dataDialogBinding=_980;
this.shadowTree.datadialog=_980;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _982=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _983=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_982=_983.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_982=_983.isSelected!=true;
break;
}
if(_982){
this.shadowTree.box.appendChild(this._getElementForSelection(_983));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_985){
var box=this.shadowTree.box;
var _987=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _988=list.getNext();
if(_985){
_988.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_987=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_987=_988.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_987=_988.isSelected!=true;
break;
}
}
if(_987){
var _989=this._getElementForSelection(_988);
box.insertBefore(_989,box.firstChild);
CSSUtil.attachClassName(_989,"selected");
this._selectionMap.set(_988.value,_989);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_98a){
var _98b=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_98b.appendChild(this.bindingDocument.createTextNode(_98a.label));
_98b.setAttribute("label",_98a.label);
_98b.setAttribute("value",_98a.value);
return _98b;
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
var _98d=DOMEvents.getTarget(e);
var _98e=DOMUtil.getLocalName(_98d);
if(_98e=="div"){
this._handleMouseDown(_98d);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_98f){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _990=this._getElements();
var _991=_98f.getAttribute("value");
var _992=this._lastSelectedElement.getAttribute("value");
var _993=false;
while(_990.hasNext()){
var el=_990.getNext();
switch(el.getAttribute("value")){
case _991:
case _992:
_993=!_993;
break;
}
if(_993){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_98f);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_98f)){
this._unhilite(_98f);
}else{
this._hilite(_98f);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_98f){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_98f;
};
MultiSelectorBinding.prototype._hilite=function(_997){
var _998=_997.getAttribute("value");
if(!this._selectionMap.has(_998)){
CSSUtil.attachClassName(_997,"selected");
this._selectionMap.set(_998,_997);
}
};
MultiSelectorBinding.prototype._unhilite=function(_999){
var _99a=_999.getAttribute("value");
if(this._selectionMap.has(_99a)){
CSSUtil.detachClassName(_999,"selected");
this._selectionMap.del(_99a);
}
};
MultiSelectorBinding.prototype._isHilited=function(_99b){
return CSSUtil.hasClassName(_99b,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_99c){
MultiSelectorBinding.superclass.handleAction.call(this,_99c);
var _99d=_99c.target;
switch(_99c.type){
case DataDialogBinding.ACTION_COMMAND:
if(_99d==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_99c.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_99d.result);
this.dirty();
_99d.result=null;
_99c.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _99e=null;
if(this.isSelectable){
_99e=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9a0){
if(self._isHilited(_9a0)){
_9a0.parentNode.removeChild(_9a0);
_99e.add(new SelectorBindingSelection(_9a0.getAttribute("label"),_9a0.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _99e;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9a2=this._getElements();
if(!isUp){
_9a2.reverse();
}
var _9a3=true;
while(_9a3&&_9a2.hasNext()){
var _9a4=_9a2.getNext();
if(this._isHilited(_9a4)){
switch(isUp){
case true:
if(_9a4.previousSibling){
_9a4.parentNode.insertBefore(_9a4,_9a4.previousSibling);
}else{
_9a3=false;
}
break;
case false:
if(_9a4.nextSibling){
_9a4.parentNode.insertBefore(_9a4,_9a4.nextSibling.nextSibling);
}else{
_9a3=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9a5=new List();
var _9a6=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a8){
var _9a9=new SelectorBindingSelection(_9a8.getAttribute("label"),_9a8.getAttribute("value"),_9a6);
_9a9.isHighlighted=self._isHilited(_9a8);
_9a5.add(_9a9);
});
return _9a5;
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
var _9aa=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9aa.hasEntries()){
_9aa.each(function(_9ab){
_9ab.parentNode.removeChild(_9ab);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9ac=this.selections.getNext();
if(_9ac.isSelected){
var _9ad=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9ad.name=this._name;
_9ad.value=_9ac.value;
this.bindingElement.appendChild(_9ad);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9ae){
alert(_9ae);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9af){
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
var _9b0={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9b1=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9b1.handler=this._handler;
_9b1.argument=_9b0;
StageBinding.presentViewDefinition(_9b1);
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
var _9b2={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9b4={handleDialogResponse:function(_9b5,_9b6){
if(_9b5==Dialog.RESPONSE_ACCEPT){
self.result=_9b6;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b7=ViewDefinitions[this._dialogViewHandle];
_9b7.handler=_9b4;
_9b7.argument=_9b2;
StageBinding.presentViewDefinition(_9b7);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b8){
var _9b9=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b8);
return UserInterface.registerBinding(_9b9,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9ba){
var id=_9ba.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9bc=_9ba.bindingDocument.getElementById(id);
if(_9bc!=null){
var _9bd=UserInterface.getBinding(_9bc);
_9bd.setResult(true);
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
var _9bf=this.bindingDocument.getElementById(id);
if(_9bf!=null){
var _9c0=UserInterface.getBinding(_9bf);
if(_9c0&&!_9c0.isAttached){
_9c0.isLazy=true;
}else{
_9bf.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9c1){
this._isLazy=_9c1;
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
var _9c3=this.getProperty("stateprovider");
var _9c4=this.getProperty("handle");
if(_9c3!=null&&_9c4!=null){
url=url.replace("${stateprovider}",_9c3).replace("${handle}",_9c4);
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
EditorDataBinding.prototype._onPageInitialize=function(_9c5){
EditorDataBinding.superclass._onPageInitialize.call(this,_9c5);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9c6){
EditorDataBinding.superclass.handleAction.call(this,_9c6);
switch(_9c6.type){
case Binding.ACTION_DIRTY:
if(_9c6.target!=this){
if(!this.isDirty){
this.dirty();
}
_9c6.consume();
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
EditorDataBinding.prototype.setValue=function(_9c7){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c8){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9c9){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9c9);
if(this.hasBasic===false){
var _9ca=this.getContentWindow().bindingMap.basicgroup;
if(_9ca){
_9ca.hide();
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
var _9cf=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9cf=fake.getValue()!="";
}
if(!_9cf&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9cf&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9cf;
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
var _9d3=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9d3!=null){
_9d3.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9d4){
_9d4=_9d4!=null?_9d4:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9d4;
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
var _9d5=this.getProperty("label");
if(_9d5){
this.setLabel(_9d5);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9d6){
this.setProperty("label",_9d6);
if(this.shadowTree.labelBinding==null){
var _9d7=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d7.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d7.bindingElement,this.bindingElement.firstChild);
_9d7.attach();
this.shadowTree.labelBinding=_9d7;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9d6));
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
var _9d9=this.getProperty("relation");
if(_9d9!=null){
this.bindingRelation=_9d9;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9da,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9da,arg);
switch(_9da){
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
FieldBinding.newInstance=function(_9dc){
var _9dd=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9dc);
return UserInterface.registerBinding(_9dd,FieldBinding);
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
var _9de=this.getDescendantBindingByLocalName("fieldgroup");
if(_9de!=null){
_9de.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9df=true;
var _9e0=this.getDescendantBindingsByLocalName("*");
while(_9e0.hasNext()){
var _9e1=_9e0.getNext();
if(Interfaces.isImplemented(IData,_9e1)){
var _9e2=_9e1.validate();
if(_9df&&!_9e2){
_9df=false;
}
}
}
return _9df;
};
FieldsBinding.prototype.handleAction=function(_9e3){
FieldsBinding.superclass.handleAction.call(this,_9e3);
var _9e4=_9e3.target;
if(_9e4!=this){
switch(_9e3.type){
case Binding.ACTION_INVALID:
var _9e5=DataBinding.getAssociatedLabel(_9e4);
if(_9e5){
this._invalidFieldLabels.set(_9e4.key,_9e5);
}
if(_9e4.error){
if(!_9e4.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9e4.error},_9e4);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9e3.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9e4.key)){
this._invalidFieldLabels.del(_9e4.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9e3.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e6=null;
if(this._invalidFieldLabels.hasEntries()){
_9e6=this._invalidFieldLabels.toList();
}
return _9e6;
};
FieldsBinding.newInstance=function(_9e7){
var _9e8=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e7);
return UserInterface.registerBinding(_9e8,FieldsBinding);
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
var _9e9=this.getProperty("image");
if(_9e9){
this.setImage(_9e9);
}
var _9ea=this.getProperty("tooltip");
if(_9ea){
this.setToolTip(_9ea);
}
var _9eb=this.getProperty("label");
if(_9eb){
this.setLabel(_9eb);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9ed=this.getAncestorBindingByLocalName("field");
if(_9ed){
var _9ee=true;
_9ed.getDescendantBindingsByLocalName("*").each(function(_9ef){
if(Interfaces.isImplemented(IData,_9ef)){
_9ef.focus();
_9ee=false;
}
return _9ee;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9f0){
this.setProperty("label",_9f0);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9f0);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9f1=this.getProperty("label");
if(!_9f1){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9f1=node.data;
}
}
return _9f1;
};
FieldDescBinding.prototype.setImage=function(_9f3){
this.setProperty("image",_9f3);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9f4){
this.setProperty("tooltip",_9f4);
if(this.isAttached){
this.bindingElement.title=_9f4;
}
};
FieldDescBinding.newInstance=function(_9f5){
var _9f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f5);
return UserInterface.registerBinding(_9f6,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f7){
var _9f8=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f7);
return UserInterface.registerBinding(_9f8,FieldDataBinding);
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
var _9f9=this._fieldHelpPopupBinding;
if(_9f9){
_9f9.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9fa=app.bindingMap.fieldhelpopupset;
var doc=_9fa.bindingDocument;
var _9fc=_9fa.add(PopupBinding.newInstance(doc));
var _9fd=_9fc.add(PopupBodyBinding.newInstance(doc));
_9fc.position=PopupBinding.POSITION_RIGHT;
_9fc.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9fd.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9fe=this.getProperty("label");
if(_9fe){
_9fd.bindingElement.innerHTML=Resolver.resolve(_9fe);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9fc;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9ff=this.getAncestorBindingByLocalName("field");
if(_9ff){
_9ff.attachClassName("fieldhelp");
var _a00=ClickButtonBinding.newInstance(this.bindingDocument);
_a00.attachClassName("fieldhelp");
_a00.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a00);
_a00.attach();
var self=this;
_a00.oncommand=function(){
self.attachPopupBinding();
};
_a00.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a00;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a02=this._fieldHelpPopupBinding;
if(_a02&&!_a02.isAttached){
_a02.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a04){
RadioDataGroupBinding.superclass.handleAction.call(this,_a04);
switch(_a04.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a06,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a06,arg);
switch(_a06){
case BroadcastMessages.KEY_ARROW:
var _a08=null;
var next=null;
var _a0a=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a0a=this.getChildBindingsByLocalName("radio");
while(!_a08&&_a0a.hasNext()){
var _a0b=_a0a.getNext();
if(_a0b.getProperty("ischecked")){
_a08=_a0b;
}
}
break;
}
if(_a08){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a0a.getFollowing(_a08);
while(next!=null&&next.isDisabled){
next=_a0a.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a0a.getPreceding(_a08);
while(next!=null&&next.isDisabled){
next=_a0a.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a0c){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a0c){
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
var _a0d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0d.type="hidden";
_a0d.name=this._name;
this.bindingElement.appendChild(_a0d);
this.shadowTree.input=_a0d;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a0e=null;
var _a0f=this.getChildBindingsByLocalName("radio");
while(!_a0e&&_a0f.hasNext()){
var _a10=_a0f.getNext();
if(_a10.isChecked){
_a0e=_a10.getProperty("value");
}
}
return _a0e;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a11){
};
RadioDataGroupBinding.prototype.setResult=function(_a12){
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
var _a13=this.getProperty("relate");
var _a14=this.getProperty("oncommand");
var _a15=this.getProperty("isdisabled");
if(_a13){
this.bindingRelate=_a13;
this.relate();
}
if(_a14){
this.oncommand=function(){
Binding.evaluate(_a14,this);
};
}
if(_a15==true){
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
var _a17=this.getCallBackID();
this._buttonBinding.check=function(_a18){
RadioButtonBinding.prototype.check.call(this,_a18);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a19){
RadioButtonBinding.prototype.uncheck.call(this,_a19);
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
RadioDataBinding.prototype.setChecked=function(_a1a,_a1b){
this._buttonBinding.setChecked(_a1a,_a1b);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a1a);
};
RadioDataBinding.prototype.check=function(_a1c){
this.setChecked(true,_a1c);
};
RadioDataBinding.prototype.uncheck=function(_a1d){
this.setChecked(false,_a1d);
};
RadioDataBinding.prototype.setDisabled=function(_a1e){
if(_a1e!=this.isDisabled){
this.isDisabled=_a1e;
this._buttonBinding.setDisabled(_a1e);
if(_a1e){
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
var _a20=DOMEvents.getTarget(e);
switch(_a20){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a21=this.getProperty("label");
if(_a21){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a21)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a22){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a22;
}
this.setProperty("label",_a22);
};
RadioDataBinding.prototype.handleElement=function(_a23){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a24){
var _a25=_a24.getAttribute("ischecked")==="true";
if(this.isChecked!=_a25){
this.setChecked(_a25,true);
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
var _a27=DOMEvents.getTarget(e);
switch(_a27){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a28,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a28,arg);
switch(_a28){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a2b){
_a2b.consume();
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
var _a2d=this.getCallBackID();
this._buttonBinding.check=function(_a2e){
ButtonBinding.prototype.check.call(this,_a2e);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a2e){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a2f){
ButtonBinding.prototype.uncheck.call(this,_a2f);
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
if(_a2d!=null){
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
var _a30=true;
var _a31=this.bindingElement.parentNode;
if(_a31){
var _a32=UserInterface.getBinding(_a31);
if(_a32&&_a32 instanceof CheckBoxGroupBinding){
if(_a32.isRequired){
if(_a32.isValid){
_a30=_a32.validate();
}else{
_a30=false;
}
}
}
}
return _a30;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a33=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a33.type="hidden";
_a33.name=this._name;
_a33.style.display="none";
this.bindingElement.appendChild(_a33);
this.shadowTree.input=_a33;
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
var _a34=null;
var _a35=this.getProperty("value");
if(this.isChecked){
_a34=_a35?_a35:"on";
}
return _a34;
};
CheckBoxBinding.prototype.setValue=function(_a36){
if(_a36==this.getValue()||_a36=="on"){
this.check(true);
}else{
if(_a36!="on"){
this.setPropety("value",_a36);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a37=false;
if(this.isChecked){
_a37=this._result!=null?this._result:true;
}
return _a37;
};
CheckBoxBinding.prototype.setResult=function(_a38){
if(typeof _a38=="boolean"){
this.setChecked(_a38,true);
}else{
this._result=_a38;
}
};
CheckBoxBinding.newInstance=function(_a39){
var _a3a=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a39);
return UserInterface.registerBinding(_a3a,CheckBoxBinding);
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
var _a3b=true;
if(this.isRequired){
var _a3c=this.getDescendantBindingsByLocalName("checkbox");
if(_a3c.hasEntries()){
_a3b=false;
while(_a3c.hasNext()&&!_a3b){
if(_a3c.getNext().isChecked){
_a3b=true;
}
}
}
if(_a3b==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a3b;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a3d){
if(_a3d){
if(!this._labelBinding){
var _a3e=LabelBinding.newInstance(this.bindingDocument);
_a3e.attachClassName("invalid");
_a3e.setImage("${icon:error}");
_a3e.setLabel("Selection required");
this._labelBinding=this.addFirst(_a3e);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a3f){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a3f);
switch(_a3f.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a40){
var _a41=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a40);
return UserInterface.registerBinding(_a41,CheckBoxGroupBinding);
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
var _a42=DialogControlBinding.newInstance(this.bindingDocument);
_a42.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a42);
this._controlGroupBinding.attachRecursive();
var _a43=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a43);
var _a44=this.getLabel();
if(_a44!=null){
this.setLabel(_a44);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a45=this._snapTargetBinding;
if(Binding.exists(_a45)==true){
_a45.removeActionListener(Binding.ACTION_BLURRED,this);
_a45.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a46){
if(Interfaces.isImplemented(IData,_a46)){
this._snapTargetBinding=_a46;
var _a47=_a46.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a47&&_a47.isConsumed){
this._environmentBinding=_a47.listener;
}
if(this._environmentBinding){
_a46.addActionListener(Binding.ACTION_BLURRED,this);
_a46.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a46)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a46.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a49=this._snapTargetBinding;
var _a4a=this._environmentBinding;
var root=UserInterface.getBinding(_a49.bindingDocument.body);
if(Binding.exists(_a49)&&Binding.exists(_a4a)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a49.isAttached&&_a4a.isAttached){
var _a4c=_a49.boxObject.getUniversalPosition();
var _a4d=_a4a.boxObject.getUniversalPosition();
_a4d.y+=_a4a.bindingElement.scrollTop;
_a4d.x+=_a4a.bindingElement.scrollLeft;
var tDim=_a49.boxObject.getDimension();
var eDim=_a4a.boxObject.getDimension();
var _a50=false;
if(_a4c.y+tDim.h<_a4d.y){
_a50=true;
}else{
if(_a4c.x+tDim.w<_a4d.x){
_a50=true;
}else{
if(_a4c.y>_a4d.y+eDim.h){
_a50=true;
}else{
if(_a4c.x>_a4d.x+eDim.w){
_a50=true;
}
}
}
}
if(!_a50){
this._setComputedPosition(_a4c,_a4d,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a51,_a52,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a57=_a51;
var _a58=false;
if(_a51.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a58=true;
}else{
if(_a51.x+tDim.w>=_a52.x+eDim.w){
_a58=true;
}
}
if(_a58){
_a57.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a57.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a57.y-=(bDim.h);
_a57.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a57);
};
BalloonBinding.prototype.handleBroadcast=function(_a59,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a59,arg);
switch(_a59){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a5b){
var _a5c=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a5b){
_a5c=true;
}
}
return _a5c;
};
BalloonBinding.prototype._setPosition=function(_a5e){
var _a5f=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a5f=true;
}
}
if(!_a5f){
this.bindingElement.style.left=_a5e.x+"px";
this.bindingElement.style.top=_a5e.y+"px";
this._point=_a5e;
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
BalloonBinding.prototype.handleAction=function(_a61){
BalloonBinding.superclass.handleAction.call(this,_a61);
var _a62=_a61.target;
switch(_a61.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a61.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a62==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a62)){
self.dispose();
}else{
if(_a62.validate()){
var _a64=true;
if(_a61.type==Binding.ACTION_BLURRED){
var root=_a62.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a64=false;
}
}
if(_a64){
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
BalloonBinding.prototype.setLabel=function(_a67){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a68=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a67);
_a68.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a68);
}
this.setProperty("label",_a67);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a6a){
var _a6b=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a6a);
var _a6c=UserInterface.registerBinding(_a6b,BalloonBinding);
_a6c.hide();
return _a6c;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a6d,_a6e){
if(Interfaces.isImplemented(IData,_a6e)==true){
var _a6f,_a70=_a6e.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a70&&_a70.isConsumed){
switch(_a70.listener.constructor){
case StageBinding:
_a6f=false;
break;
case StageDialogBinding:
_a6f=true;
break;
}
}
var _a71=_a6f?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a72=_a71.add(BalloonBinding.newInstance(top.app.document));
_a72.setLabel(_a6d.text);
_a72.snapTo(_a6e);
_a72.attach();
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
var _a73=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a76=_a73.getDataBinding(name);
if(_a76){
ErrorBinding.presentError({text:text},_a76);
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
FocusBinding.focusElement=function(_a77){
var _a78=true;
try{
_a77.focus();
Application.focused(true);
}
catch(exception){
var _a79=UserInterface.getBinding(_a77);
var _a7a=SystemLogger.getLogger("FocusBinding.focusElement");
_a7a.warn("Could not focus "+(_a79?_a79.toString():String(_a77)));
_a78=false;
}
return _a78;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a7b){
var win=_a7b.bindingWindow;
var id=_a7b.bindingElement.id;
return {getBinding:function(){
var _a7e=null;
try{
if(Binding.exists(_a7b)){
_a7e=win.bindingMap[id];
}
}
catch(exception){
}
return _a7e;
}};
};
FocusBinding.navigateNext=function(_a7f){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a7f);
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
var _a80=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a80&&_a80.isConsumed){
if(_a80.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a81){
FocusBinding.superclass.handleAction.call(this,_a81);
var _a82=_a81.target;
var _a83=null;
if(this._isFocusManager){
switch(_a81.type){
case FocusBinding.ACTION_ATTACHED:
if(_a82!=this){
this._isUpToDate=false;
}
_a81.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a82!=this){
this._isUpToDate=false;
_a81.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a83=new FocusCrawler();
_a83.mode=FocusCrawler.MODE_BLUR;
_a83.crawl(_a82.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a81.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a82!=this){
_a83=new FocusCrawler();
_a83.mode=FocusCrawler.MODE_FOCUS;
_a83.crawl(_a82.bindingElement);
}
_a81.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a82)){
this.claimFocus();
this._onFocusableFocused(_a82);
}
_a81.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a82)){
this._onFocusableBlurred(_a82);
}
_a81.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a84){
var _a85=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a85==null&&list.hasNext()){
var _a87=list.getNext();
if(this._cachedFocus&&_a87==this._cachedFocus.getBinding()){
_a85=_a87;
}
}
if(_a85!=null){
if(_a87.isFocused){
var next=_a84?list.getPreceding(_a85):list.getFollowing(_a85);
if(!next){
next=_a84?list.getLast():list.getFirst();
}
next.focus();
}else{
_a85.focus();
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
var _a89=new FocusCrawler();
var list=new List();
_a89.mode=FocusCrawler.MODE_INDEX;
_a89.crawl(this.bindingElement,list);
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
var _a8c=this._cachedFocus.getBinding();
if(_a8c&&!_a8c.isFocused){
_a8c.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a8d){
if(_a8d!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a8d;
_a8d.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a8d);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a8e){
_a8e.deleteProperty(FocusBinding.MARKER);
if(_a8e==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a90){
this.bindingElement.style.left=_a90+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a91){
this.hiddenTabBindings.add(_a91);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a92=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a92.getLabel());
item.setImage(_a92.getImage());
item.associatedTabBinding=_a92;
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
TabsButtonBinding.prototype.handleAction=function(_a95){
TabsButtonBinding.superclass.handleAction.call(this,_a95);
switch(_a95.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a96=this.selectedTabBinding;
if(_a96){
this.containingTabBoxBinding.moveToOrdinalPosition(_a96,0);
this.containingTabBoxBinding.select(_a96);
}
_a95.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a97){
var _a98=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a97);
_a98.setAttribute("type","checkbox");
_a98.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a98.className="tabbutton";
return UserInterface.registerBinding(_a98,TabsButtonBinding);
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
var _a99=TabBoxBinding.currentActiveInstance;
if(_a99!=null&&Binding.exists(_a99)){
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
var _a9a=this.getTabElements().getLength();
var _a9b=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a9a!=_a9b){
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
var _a9c=this.getTabPanelElements();
while(_a9c.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a9c.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a9d=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a9e=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a9f=_a9d>_a9e?"tabsbelow":"tabsontop";
this.attachClassName(_a9f);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _aa1=this.getTabPanelElements();
var _aa2=null;
var _aa3=this.getProperty("selectedindex");
if(_aa3!=null){
if(_aa3>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aa4=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa6=_aa1.getNext();
this.registerTabBoxPair(tab,_aa6);
if(_aa3&&_aa4==_aa3){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aa2=tab;
}
}
_aa4++;
}
if(!_aa2){
_aa2=tabs.getFirst();
_aa2.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa7){
var _aa8=null;
var _aa9=null;
if(this.isEqualSize){
var _aaa=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aac=this.getTabPanelElements();
_aac.each(function(_aad){
max=_aad.offsetHeight>max?_aad.offsetHeight:max;
});
_aa9=max+_aaa.top+_aaa.bottom;
if(_aa7&&this._tabPanelsElement.style.height!=null){
_aa8=this._tabPanelsElement.offsetHeight;
}
if(_aa8!=null||_aa9>_aa8){
this._tabPanelsElement.style.height=_aa9+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aae){
_aae._invalidCount=0;
_aae.addActionListener(Binding.ACTION_INVALID,this);
_aae.addActionListener(Binding.ACTION_VALID,this);
_aae.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aaf){
TabBoxBinding.superclass.handleAction.call(this,_aaf);
var _ab0=_aaf.target;
var _ab1=_aaf.listener;
switch(_aaf.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_ab0.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aaf.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_ab0.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_ab1._invalidCount++;
if(_ab1._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_ab1.isSelected){
self._showWarning(_ab1,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_ab1._invalidCount>0){
_ab1._invalidCount--;
if(_ab1._invalidCount==0){
if(_ab1.isSelected){
this._showWarning(_ab1,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_ab1,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aaf._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aaf._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ab4=DOMEvents.getTarget(e);
if(_ab4==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab6=this.getTabPanelElements();
tabs.each(function(tab,_ab8){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab9=_ab6.get(_ab8);
this.registerTabBoxPair(tab,_ab9);
}
},this);
var _aba=this._tabBoxPairs;
for(var key in _aba){
var tab=_aba[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ab4);
switch(_ab4.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _abe=_ab4.parentNode;
if(_abe==this._tabsElement||_abe==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ab4==this._tabsElement||_ab4==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ac0){
var _ac1=this.getBindingForArgument(arg);
if(_ac1!=null&&!_ac1.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ac1.select(_ac0);
this.getTabPanelBinding(_ac1).select(_ac0);
var _ac2=this.getProperty("selectedindex");
if(_ac2!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ac1.bindingElement,true));
}
this._selectedTabBinding=_ac1;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ac1.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ac3=this.getTabPanelBinding(_ac1);
this._showBalloon(_ac3,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac5){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac5.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac5};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac9){
var _aca=null;
try{
var key=_ac9.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _acc=this._tabBoxPairs[key].tabPanel;
_aca=UserInterface.getBinding(_acc);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aca;
};
TabBoxBinding.prototype.getTabBinding=function(_acd){
var key=_acd.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _acf=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_acf);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ad0=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ad0);
return _ad0;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ad1,_ad2){
var _ad3=_ad1.bindingElement;
_ad1.setProperty("selected",true);
var _ad4=this.summonTabPanelBinding();
var _ad5=_ad4.bindingElement;
if(_ad2){
_ad5.appendChild(_ad2 instanceof Binding?_ad2.bindingElement:_ad2);
}
this.registerTabBoxPair(_ad3,_ad5);
UserInterface.getBinding(this._tabsElement).add(_ad1);
this._tabPanelsElement.appendChild(_ad5);
_ad1.attach();
UserInterface.getBinding(_ad5).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ad1;
};
TabBoxBinding.prototype.importTabBinding=function(_ad6){
var that=_ad6.containingTabBoxBinding;
var _ad8=that.getTabPanelBinding(_ad6);
var _ad9=_ad8.getBindingElement();
var _ada=_ad6.getBindingElement();
that.dismissTabBinding(_ad6);
this._tabsElement.appendChild(_ada);
this._tabPanelsElement.appendChild(_ad9);
this.registerTabBoxPair(_ada,_ad9);
_ad6.containingTabBoxBinding=this;
this.select(_ad6);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_adb){
var _adc=null;
if(_adb.isSelected){
_adc=this.getBestTab(_adb);
this._selectedTabBinding=null;
}
var _add=this.getTabPanelBinding(_adb);
this.unRegisterTabBoxPair(_adb.bindingElement);
_adb.dispose();
_add.dispose();
if(_adc!=null){
this.select(_adc,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ade){
if(_ade.isSelected){
this.selectBestTab(_ade);
}
};
TabBoxBinding.prototype.selectBestTab=function(_adf){
var _ae0=this.getBestTab(_adf);
if(_ae0){
this.select(_ae0);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ae1){
var _ae2=null;
var _ae3=_ae1.getOrdinalPosition(true);
var _ae4=this.getTabBindings();
var _ae5=_ae4.getLength();
var _ae6=_ae5-1;
if(_ae5==1){
_ae2=null;
}else{
if(_ae3==_ae6){
_ae2=_ae4.get(_ae3-1);
}else{
_ae2=_ae4.get(_ae3+1);
}
}
return _ae2;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae7,_ae8){
var _ae9=this.bindingDocument.getElementById(_ae7.bindingElement.id);
var tab=this.getTabElements().get(_ae8);
this._tabsElement.insertBefore(_ae9,tab);
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
var _aeb=this._nodename_tab;
var _aec=new List(this._tabsElement.childNodes);
var _aed=new List();
while(_aec.hasNext()){
var _aee=_aec.getNext();
if(_aee.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aee)==_aeb){
_aed.add(_aee);
}
}
return _aed;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _aef=this._nodename_tabpanel;
var _af0=new List(this._tabPanelsElement.childNodes);
var _af1=new List();
_af0.each(function(_af2){
if(_af2.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af2)==_aef){
_af1.add(_af2);
}
});
return _af1;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _af3=new List();
var _af4=this.getTabElements();
_af4.each(function(_af5){
_af3.add(UserInterface.getBinding(_af5));
});
return _af3;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af6=new List();
this.getTabPanelElements().each(function(_af7){
_af6.add(UserInterface.getBinding(_af7));
});
return _af6;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af8=null;
if(this._selectedTabBinding){
_af8=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af8;
};
TabBoxBinding.prototype._showWarning=function(_af9,_afa){
var _afb=this.getTabBinding(_af9);
if(_afa){
if(_afb.labelBinding.hasImage){
_afb._backupImage=_afb.getImage();
}
_afb.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_afb._backupImage){
_afb.setImage(_afb._backupImage);
}else{
_afb.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_afc,_afd){
var _afe=this.getTabBinding(_afc);
if((_afd&&!_afe.isSelected)||!_afd){
if(_afe.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_afd){
if(_afe.labelBinding.hasImage){
_afe._backupImage=_afe.getImage();
}
_afe.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_afe._backupImage!=null){
_afe.setImage(_afe._backupImage);
}else{
_afe.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aff){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b02=tab.getOrdinalPosition(true);
var next=null;
var _b04=new List();
tabs.each(function(t){
if(t.isVisible){
_b04.add(t);
}
});
if(_b04.getLength()>1){
if(_b02==0&&!_aff){
next=_b04.getLast();
}else{
if(_b02==_b04.getLength()-1&&_aff){
next=_b04.getFirst();
}else{
if(_aff){
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
var _b06=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b06.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b07){
TabsBinding.superclass.handleAction.call(this,_b07);
switch(_b07.type){
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
var _b0a=self.bindingElement.offsetWidth;
if(_b0a!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b0a;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b0b){
if(_b0b instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b0b);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b0c=false;
var _b0d,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b10=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b11=this.bindingElement.offsetWidth-_b10.RESERVED_SPACE;
var _b12=null;
var sum=0,_b14=0;
var _b15=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b15){
tab=tabs.getNext();
_b0d=UserInterface.getBinding(tab);
if(!_b12){
_b12=_b0d;
}
sum+=tab.offsetWidth;
if(sum>=_b11){
_b0c=true;
if(_b0d.isSelected){
if(!DOMUtil.isFirstElement(_b0d.bindingElement,true)){
this.isManaging=false;
if(_b12){
_b12.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b0d,_b14-1);
_b15=false;
}
}else{
_b0d.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b0d);
}
}else{
_b0d.show();
_b12=_b0d;
_b14++;
}
}
if(_b15){
if(_b0c&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b16=_b12.getBindingElement();
var _b17=_b16.offsetLeft+_b16.offsetWidth;
var _b18=this.tabsButtonBinding;
setTimeout(function(){
_b18.show(_b17+4);
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
var _b19=TabBinding.superclass.serialize.call(this);
if(_b19){
_b19.label=this.getLabel();
_b19.image=this.getImage();
_b19.tooltip=this.getToolTip();
}
return _b19;
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
var _b1a=this.bindingElement.getAttribute("image");
var _b1b=this.bindingElement.getAttribute("label");
var _b1c=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b1b){
this.setLabel(_b1b);
}
if(_b1a){
this.setImage(_b1a);
}
if(_b1c){
this.setToolTip(_b1c);
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
TabBinding.prototype.setLabel=function(_b1e){
if(_b1e!=null){
this.setProperty("label",_b1e);
if(this.isAttached){
this.labelBinding.setLabel(_b1e);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b1f){
if(_b1f){
this.setProperty("tooltip",_b1f);
if(this.isAttached){
this.labelBinding.setToolTip(_b1f);
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
var _b21=false;
if(Client.isMozilla==true){
}
if(!_b21){
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
TabBinding.prototype.select=function(_b22){
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
TabBinding.newInstance=function(_b23){
var _b24=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b23);
return UserInterface.registerBinding(_b24,TabBinding);
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
var _b25=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b25=true;
this._lastKnownDimension=dim1;
}
return _b25;
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
TabPanelBinding.prototype.select=function(_b28){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b28!=true){
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
TabPanelBinding.prototype.handleAction=function(_b29){
TabPanelBinding.superclass.handleAction.call(this,_b29);
var _b2a=_b29.target;
switch(_b29.type){
case BalloonBinding.ACTION_INITIALIZE:
_b29.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b2b){
var _b2c=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b2b);
UserInterface.registerBinding(_b2c,TabPanelBinding);
return UserInterface.getBinding(_b2c);
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
var _b2d=SplitBoxBinding.superclass.serialize.call(this);
if(_b2d){
_b2d.orient=this.getOrient();
_b2d.layout=this.getLayout();
}
return _b2d;
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
var _b2f=this.getSplitPanelElements();
if(_b2f.hasEntries()){
var _b30=new List(this.getLayout().split(":"));
if(_b30.getLength()!=_b2f.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b2f.each(function(_b31){
_b31.setAttribute("ratio",_b30.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b32=this.getProperty("orient");
if(_b32){
this._orient=_b32;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b33=this.getSplitterBindings();
while(_b33.hasNext()){
var _b34=_b33.getNext();
if(_b34&&_b34.getProperty("collapsed")==true){
_b34.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b35){
SplitBoxBinding.superclass.handleAction.call(this,_b35);
switch(_b35.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b35.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b35.target);
_b35.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b35.target);
_b35.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b36){
this._getSplitPanelBindingForSplitter(_b36).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b37){
this._getSplitPanelBindingForSplitter(_b37).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b38){
var _b39=DOMUtil.getOrdinalPosition(_b38.bindingElement,true);
var _b3a,_b3b=this.getSplitPanelElements();
switch(_b38.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b3a=_b3b.get(_b39);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b3a=_b3b.get(_b39+1);
break;
}
return UserInterface.getBinding(_b3a);
};
SplitBoxBinding.prototype.invokeLayout=function(_b3c){
var _b3d=this.isHorizontalOrient();
var _b3e=this.getSplitPanelBindings();
var _b3f=this.getSplitterBindings();
var _b40=new List();
var _b41,sum=0;
var _b43=0;
_b3e.each(function(_b44){
if(_b44.isFixed==true){
if(!_b3e.hasNext()){
_b43+=_b44.getFix();
}
_b40.add(0);
sum+=0;
}else{
_b41=_b44.getRatio();
_b40.add(_b41);
sum+=_b41;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b40.getLength()!=_b3e.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b45=_b3d?this.getInnerWidth():this.getInnerHeight();
_b45-=_b43;
_b3f.each(function(_b46){
if(_b46.isVisible){
_b45-=SplitterBinding.DIMENSION;
}
});
var unit=_b45/sum;
var _b48=0;
var self=this;
_b3e.each(function(_b4a){
var span=0;
var _b4c=_b40.getNext();
if(_b4a.isFixed){
span=_b4a.getFix();
}else{
span=Math.floor(unit*_b4c);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b48+=span;
while(_b48>_b45){
_b48--;
span--;
}
if(!_b4a.isFixed){
if(_b3d){
_b4a.setWidth(span);
}else{
_b4a.setHeight(span);
}
}
});
}
if(_b3c!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b4d=this.getLayout();
if(_b4d){
this.setProperty("layout",_b4d);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b4e=this.isHorizontalOrient();
var _b4f=this.getSplitPanelBindings();
var _b50=this.getSplitterBindings();
var _b51=null;
var _b52=null;
var unit=null;
var _b54=null;
var span=null;
_b4f.each(function(_b56){
if(!unit){
unit=_b4e?_b56.getWidth():_b56.getHeight();
}
span=_b4e?_b56.getWidth():_b56.getHeight();
if(_b54){
span-=_b54;
_b54=null;
}
_b51=_b50.getNext();
if(_b51&&_b51.offset){
_b54=_b51.offset;
span+=_b54;
}
_b56.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b57){
this.logger.debug(_b57);
this.setProperty("layout",_b57);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b58="",_b59=this.getSplitPanelBindings();
_b59.each(function(_b5a){
_b58+=_b5a.getRatio().toString();
_b58+=_b59.hasNext()?":":"";
});
this.setProperty("layout",_b58);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b5b=this.getSplitPanelElements();
_b5b.each(function(_b5c){
layout+="1"+(_b5b.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b5d){
this.bindingElement.style.width=_b5d+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b5e){
this.bindingElement.style.height=_b5e+"px";
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
var _b5f=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b5f.reverse();
}
return _b5f;
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
SplitBoxBinding.prototype.fit=function(_b60){
if(!this.isFit||_b60){
if(this.isHorizontalOrient()){
var max=0;
var _b62=this.getSplitPanelBindings();
_b62.each(function(_b63){
var _b64=_b63.bindingElement.offsetHeight;
max=_b64>max?_b64:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b65){
var _b66=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b65);
return UserInterface.registerBinding(_b66,SplitBoxBinding);
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
var _b69=this.getProperty("hidden");
if(_b69){
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
var _b6a=this.getProperty("ratiocache");
if(_b6a){
this.setRatio(_b6a);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b6b){
if(!this.isFixed){
if(_b6b!=this.getWidth()){
if(_b6b<0){
_b6b=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b6b+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b6b);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b6c=null;
if(this.isFixed){
_b6c=this.getFix();
}else{
_b6c=this.bindingElement.offsetWidth;
}
return _b6c;
};
SplitPanelBinding.prototype.setHeight=function(_b6d){
if(!this.isFixed){
if(_b6d!=this.getHeight()){
try{
this.bindingElement.style.height=_b6d+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b6e=null;
if(this.isFixed){
_b6e=this.getFix();
}else{
_b6e=this.bindingElement.offsetHeight;
}
return _b6e;
};
SplitPanelBinding.prototype.setRatio=function(_b6f){
this.setProperty("ratio",_b6f);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b70){
if(_b70){
this._fixedSpan=_b70;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b70);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b70);
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
SplitPanelBinding.newInstance=function(_b71){
var _b72=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b71);
return UserInterface.registerBinding(_b72,SplitPanelBinding);
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
var _b73=SplitBoxBinding.superclass.serialize.call(this);
if(_b73){
_b73.collapse=this.getProperty("collapse");
_b73.collapsed=this.getProperty("collapsed");
_b73.disabled=this.getProperty("isdisabled");
}
return _b73;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b74=this.getProperty("hidden");
if(_b74){
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
SplitterBinding.prototype.setCollapseDirection=function(_b76){
this.setProperty("collapse",_b76);
this._collapseDirection=_b76;
};
SplitterBinding.prototype.handleAction=function(_b77){
SplitterBinding.superclass.handleAction.call(this,_b77);
switch(_b77.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b77.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b79=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b79.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b79.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b7a){
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
SplitterBinding.newInstance=function(_b85){
var _b86=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b85);
return UserInterface.registerBinding(_b86,SplitterBinding);
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
var _b87=this.getProperty("selectedindex");
var _b88=this.getDeckElements();
if(_b88.hasEntries()){
var _b89=false;
var _b8a=0;
while(_b88.hasNext()){
var deck=_b88.getNext();
if(_b87&&_b8a==_b87){
deck.setAttribute("selected","true");
_b89=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b89=true;
}
}
_b8a++;
}
if(!_b89){
_b88.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b8d=this.getBindingForArgument(arg);
if(_b8d!=null){
if(_b8d!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b8d.select();
this._selectedDeckBinding=_b8d;
var _b8e=this.getProperty("selectedindex");
if(_b8e!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b8d.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b8f=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b8f=true;
this._lastKnownDimension=dim1;
}
return _b8f;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b92){
var _b93=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b92);
return UserInterface.registerBinding(_b93,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b94){
DeckBinding.superclass.handleAction.call(this,_b94);
var _b95=_b94.target;
switch(_b94.type){
case BalloonBinding.ACTION_INITIALIZE:
_b94.consume();
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
DeckBinding.newInstance=function(_b97){
var _b98=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b97);
return UserInterface.registerBinding(_b98,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b99){
if(_b99 instanceof ToolBarBodyBinding){
if(_b99.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b99;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b99;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b99);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b9a=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b9a){
this.setImageSize(_b9a);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b9c=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b9c.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b9c.isDefaultContent=true;
this.add(_b9c);
_b9c.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b9e=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b9e);
}
if(_b9e!=null&&_b9e.hasClassName("max")){
this._maxToolBarGroup(_b9e,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_ba0){
var _ba1=this.boxObject.getDimension().w;
var _ba2=CSSComputer.getPadding(this.bindingElement);
_ba1-=(_ba2.left+_ba2.right);
if(_ba0!=null){
_ba1-=_ba0.boxObject.getDimension().w;
if(!Client.isWindows){
_ba1-=1;
}
if(Client.isExplorer){
_ba1-=15;
}
}
max.bindingElement.style.width=_ba1+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ba3){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ba3);
};
ToolBarBinding.prototype.addLeft=function(_ba4,_ba5){
var _ba6=null;
if(this._toolBarBodyLeft!=null){
_ba6=this._toolBarBodyLeft.add(_ba4,_ba5);
}else{
throw new Error("No left toolbarbody");
}
return _ba6;
};
ToolBarBinding.prototype.addLeftFirst=function(_ba7,_ba8){
var _ba9=null;
if(this._toolBarBodyLeft){
_ba9=this._toolBarBodyLeft.addFirst(_ba7,_ba8);
}else{
throw new Error("No left toolbarbody");
}
return _ba9;
};
ToolBarBinding.prototype.addRight=function(_baa){
var _bab=null;
if(this._toolBarBodyRight){
_bab=this._toolBarBodyRight.add(_baa);
}else{
throw new Error("No left toolbarbody");
}
return _bab;
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
ToolBarBinding.newInstance=function(_bae){
var _baf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bae);
return UserInterface.registerBinding(_baf,ToolBarBinding);
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
var _bb0=this.getDescendantBindingsByLocalName("toolbargroup");
var _bb1=new List();
var _bb2=true;
_bb0.each(function(_bb3){
if(_bb3.isVisible&&!_bb3.isDefaultContent){
_bb1.add(_bb3);
}
});
while(_bb1.hasNext()){
var _bb4=_bb1.getNext();
_bb4.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bb2){
_bb4.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bb2=false;
}
if(!_bb1.hasNext()){
_bb4.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bb7=list.getNext();
var _bb8=_bb7.getEqualSizeWidth();
if(_bb8>max){
max=_bb8;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bb7=list.getNext();
_bb7.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bb9,_bba){
var _bbb=ToolBarBinding.superclass.add.call(this,_bb9);
if(!_bba){
if(_bb9 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbb;
};
ToolBarBodyBinding.prototype.addFirst=function(_bbc,_bbd){
var _bbe=ToolBarBinding.superclass.addFirst.call(this,_bbc);
if(!_bbd){
if(_bbc instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbe;
};
ToolBarBodyBinding.newInstance=function(_bbf){
var _bc0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bbf);
return UserInterface.registerBinding(_bc0,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bc1){
switch(_bc1){
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
var _bc2=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc2)=="toolbarbody"){
UserInterface.getBinding(_bc2).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bc3=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc3)=="toolbarbody"){
UserInterface.getBinding(_bc3).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bc4){
var _bc5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bc4);
return UserInterface.registerBinding(_bc5,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bc6){
var _bc7=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc6);
return UserInterface.registerBinding(_bc7,ToolBarButtonBinding);
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
var _bc8=this.getProperty("label");
var _bc9=this.getProperty("image");
if(_bc8){
this.setLabel(_bc8);
}
if(_bc9){
this.setImage(_bc9);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bca,_bcb){
if(this.isAttached){
this._labelBinding.setLabel(_bca,_bcb);
}
this.setProperty("label",_bca);
};
ToolBarLabelBinding.prototype.setImage=function(_bcc,_bcd){
if(this.isAttached){
this._labelBinding.setImage(_bcc,_bcd);
}
this.setProperty("image",_bcc);
};
ToolBarLabelBinding.newInstance=function(_bce){
var _bcf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bce);
return UserInterface.registerBinding(_bcf,ToolBarLabelBinding);
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
var _bd0=this.getDescendantBindingsByLocalName("clickbutton");
if(_bd0.hasEntries()){
while(_bd0.hasNext()){
var _bd1=_bd0.getNext();
if(_bd1.isDefault){
this._defaultButton=_bd1;
_bd1.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bd1.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bd0;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bd2,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bd2,arg);
switch(_bd2){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bd4=this.getAncestorBindingByType(DialogBinding,true);
if(_bd4!=null&&_bd4.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bd5){
DialogToolBarBinding.superclass.handleAction.call(this,_bd5);
var _bd6=_bd5.target;
var _bd7=false;
var _bd8=this._buttons.reset();
if(_bd6 instanceof ClickButtonBinding){
switch(_bd5.type){
case Binding.ACTION_FOCUSED:
_bd6.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd6;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd6.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bd7&&_bd8.hasNext()){
var _bd9=_bd8.getNext();
_bd7=_bd9.isFocused;
}
if(!_bd7){
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
ComboBoxBinding.newInstance=function(_bdb){
var _bdc=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bdb);
return UserInterface.registerBinding(_bdc,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bdd,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bdd,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _be1=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_be1.each(function(_be2){
var _be3=_be2.getProperty("oncommand");
_be2.setProperty("hiddencommand",_be3);
_be2.deleteProperty("oncommand");
_be2.oncommand=function(){
self.setAndFireButton(this);
};
});
var _be4=null;
var _be5=this.getActiveMenuItemId();
_be1.reset();
while(_be1.hasNext()){
var _be6=_be1.getNext();
if(_be6.getProperty("id")==_be5){
_be4=_be6;
break;
}
}
if(_be4==null&&_be1.hasEntries()){
_be4=_be1.getFirst();
}
if(_be4!=null){
this.setButton(_be4);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_be7){
if(_be7 instanceof MenuItemBinding){
var _be8=_be7.getProperty("label");
var _be9=_be7.getProperty("image");
var _bea=_be7.getProperty("image-hover");
var _beb=_be7.getProperty("image-active");
var _bec=_be7.getProperty("image-disabled");
var _bed=_be7.getProperty("hiddencommand");
this.setLabel(_be8?_be8:"");
this.image=_be9;
this.imageHover=_be9;
this.imageActive=_beb;
this.imageDisabled=_bec;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bed,this);
};
this.hideActiveItem(_be7);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bee){
if(_bee instanceof MenuItemBinding){
this.setButton(_bee);
this.setActiveMenuItemId(_bee.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bef){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bf0){
if(_bf0==_bef){
Binding.prototype.hide.call(_bf0);
}else{
Binding.prototype.show.call(_bf0);
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
var _bf2=this._views;
for(var _bf3 in ViewDefinitions){
var def=ViewDefinitions[_bf3];
var key=def.perspective;
if(key!=null){
if(!_bf2.has(key)){
_bf2.set(key,new List());
}
var list=_bf2.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bf7,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bf7,arg);
switch(_bf7){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bfa=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bfa.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bfa.add(StageViewMenuItemBinding.newInstance(_bfa.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bfa.show();
}else{
_bfa.hide();
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
TreeBinding.grid=function(_bfe){
var _bff=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bfe);
var _c01=_bfe%_bff;
if(_c01>0){
_bfe=_bfe-_c01+_bff;
}
return _bfe+TreeBodyBinding.PADDING_TOP;
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
var _c02=this.getProperty("focusable");
if(_c02!=null){
this._isFocusable=_c02;
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
var _c04=this.getProperty("builder");
if(_c04){
this._buildFromTextArea(_c04);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c05=this.getProperty("selectable");
var _c06=this.getProperty("selectionproperty");
var _c07=this.getProperty("selectionvalue");
if(_c05){
this.setSelectable(true);
if(_c06){
this.setSelectionProperty(_c06);
}
if(_c07){
this.setSelectionValue(_c07);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c0a=UserInterface.getBinding(area);
var _c0b=this._treeBodyBinding;
function build(){
_c0b.subTreeFromString(area.value);
}
_c0a.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c0c){
var _c0d=_c0c.getHandle();
if(this._treeNodeBindings.has(_c0d)){
throw "Duplicate treenodehandles registered: "+_c0c.getLabel();
}else{
this._treeNodeBindings.set(_c0d,_c0c);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c0d)){
_c0c.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c0f){
this._treeNodeBindings.del(_c0f.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c10){
var _c11=null;
if(this._treeNodeBindings.has(_c10)){
_c11=this._treeNodeBindings.get(_c10);
}else{
throw "No such treenode: "+_c10;
}
return _c11;
};
TreeBinding.prototype.handleAction=function(_c12){
TreeBinding.superclass.handleAction.call(this,_c12);
var _c13=_c12.target;
switch(_c12.type){
case TreeNodeBinding.ACTION_OPEN:
_c12.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c13);
_c12.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c13;
this.focusSingleTreeNodeBinding(_c13);
if(!this.isFocused){
this.focus();
}
_c12.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c13;
this.focusSingleTreeNodeBinding(_c13);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c13;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c13;
this.focusSingleTreeNodeBinding(_c13);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c12.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c13.isFocused){
this.blurSelectedTreeNodes();
}
_c12.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c14,_c15){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c16){
if(_c16!=null&&!_c16.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c16);
_c16.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c17){
this.blurSelectedTreeNodes();
while(_c17.hasNext()){
var _c18=_c17.getNext();
this._focusedTreeNodeBindings.add(_c18);
_c18.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c19=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c1a=false;
var _c1b=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c1c=this._focusedTreeNodeBindings.getNext();
var _c1d=_c1c.getProperty(this._selectionProperty);
if(_c1d!=null){
if(!this._selectionValue||this._selectionValue[_c1d]){
_c1b=(this._selectedTreeNodeBindings[_c1c.key]=_c1c);
var _c1e=_c19[_c1c.key];
if(!_c1e||_c1e!=_c1b){
_c1a=true;
}
}
}
}
if(_c1b){
if(_c1a){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c19){
for(var key in _c19){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c20=new List();
for(var key in this._selectedTreeNodeBindings){
_c20.add(this._selectedTreeNodeBindings[key]);
}
return _c20;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c22){
_c22.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c23){
var _c24=_c23.getDescendantBindingsByLocalName("treenode");
var _c25=true;
var self=this;
_c24.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c25;
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
var _c28=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c28!=null){
this.focusSingleTreeNodeBinding(_c28);
_c28.callback();
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
TreeBinding.prototype.add=function(_c29){
var _c2a=null;
if(this._treeBodyBinding){
_c2a=this._treeBodyBinding.add(_c29);
}else{
this._treeNodeBuffer.add(_c29);
_c2a=_c29;
}
return _c2a;
};
TreeBinding.prototype.addFirst=function(_c2b){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c2c=this._treeBodyBinding.bindingElement;
_c2c.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c2d,_c2e){
if(_c2e.isContainer&&_c2e.isOpen){
_c2e.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c2f){
this._isSelectable=_c2f;
if(_c2f){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c30){
this._selectionProperty=_c30;
};
TreeBinding.prototype.setSelectionValue=function(_c31){
if(_c31){
var list=new List(_c31.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c33,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c33,arg);
switch(_c33){
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
var _c35=this.getFocusedTreeNodeBindings();
if(_c35.hasEntries()){
var node=_c35.getFirst();
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
var _c38=this.getFocusedTreeNodeBindings();
if(_c38.hasEntries()){
var node=_c38.getFirst();
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
var _c3b=null;
while(next==null&&(_c3b=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c3b!=null){
next=_c3b.getNextBindingByLocalName("treenode");
}
node=_c3b;
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
var _c3d=DOMEvents.getTarget(e);
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
var _c3e=new TreeCrawler();
var list=new List();
_c3e.mode=TreeCrawler.MODE_GETOPEN;
_c3e.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c41=list.getNext();
map.set(_c41.getHandle(),true);
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
var _c46=this._positionIndicatorBinding;
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
if(y!=_c46.getPosition().y){
_c46.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c46.isVisible){
_c46.show();
}
}else{
if(_c46.isVisible){
_c46.hide();
}
}
}else{
if(_c46.isVisible){
_c46.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c49){
this._acceptingTreeNodeBinding=_c49;
this._acceptingPosition=_c49.boxObject.getLocalPosition();
this._acceptingDimension=_c49.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c49);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c4a){
var map={};
var _c4c=_c4a.getChildBindingsByLocalName("treenode");
var _c4d,pos,dim,y;
y=TreeBinding.grid(_c4a.boxObject.getLocalPosition().y);
map[y]=true;
while(_c4c.hasNext()){
_c4d=_c4c.getNext();
pos=_c4d.boxObject.getLocalPosition();
dim=_c4d.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c53 in this._acceptingPositions){
if(_c53==y){
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
TreeBinding.newInstance=function(_c54){
var _c55=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c54);
var _c56=UserInterface.registerBinding(_c55,TreeBinding);
_c56.treeBodyBinding=TreeBodyBinding.newInstance(_c54);
return _c56;
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
TreeBodyBinding.prototype.accept=function(_c57){
if(_c57 instanceof TreeNodeBinding){
this.logger.debug(_c57);
}
};
TreeBodyBinding.newInstance=function(_c58){
var _c59=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c58);
return UserInterface.registerBinding(_c59,TreeBodyBinding);
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
var _c5a=TreeNodeBinding.superclass.serialize.call(this);
if(_c5a){
_c5a.label=this.getLabel();
_c5a.image=this.getImage();
var _c5b=this.getHandle();
if(_c5b&&_c5b!=this.key){
_c5a.handle=_c5b;
}
if(this.isOpen){
_c5a.open=true;
}
if(this.isDisabled){
_c5a.disabled=true;
}
if(this.dragType){
_c5a.dragtype=this.dragType;
}
if(this.dragAccept){
_c5a.dragaccept=this.dragAccept;
}
}
return _c5a;
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
var _c5d=UserInterface.getBinding(node);
if(_c5d&&_c5d.containingTreeBinding){
this.containingTreeBinding=_c5d.containingTreeBinding;
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
var _c5e=this.key;
var _c5f=this.getProperty("handle");
if(_c5f){
_c5e=_c5f;
}
return _c5e;
};
TreeNodeBinding.prototype.setHandle=function(_c60){
this.setProperty("handle",_c60);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c62=this.getProperty("label");
var _c63=this.getProperty("tooltip");
var _c64=this.getProperty("oncommand");
var _c65=this.getProperty("onbindingfocus");
var _c66=this.getProperty("onbindingblur");
var _c67=this.getProperty("focused");
var _c68=this.getProperty("callbackid");
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
if(_c62!=null){
this.setLabel(_c62);
}
if(_c63!=null){
this.setToolTip(_c63);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c6a=this.bindingWindow.WindowManager;
if(_c64!=null){
this.oncommand=function(){
Binding.evaluate(_c64,this);
};
}
if(_c65!=null){
this.onfocus=function(){
Binding.evaluate(_c65,this);
};
}
if(_c66!=null){
this.onblur=function(){
Binding.evaluate(_c66,this);
};
}
if(_c67==true){
this.focus();
}
if(_c68!=null){
Binding.dotnetify(this,_c68);
}
};
TreeNodeBinding.prototype.handleAction=function(_c6b){
TreeNodeBinding.superclass.handleAction.call(this,_c6b);
switch(_c6b.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c6b.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c6c,_c6d){
var _c6e=true;
if(_c6c instanceof TreeNodeBinding){
var _c6f=false;
var _c70=this.bindingElement;
var _c71=this.containingTreeBinding.bindingElement;
while(!_c6f&&_c70!=_c71){
if(_c70==_c6c.getBindingElement()){
_c6f=true;
}else{
_c70=_c70.parentNode;
}
}
if(_c6f){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c6e=false;
}else{
this.acceptTreeNodeBinding(_c6c,_c6d);
}
}else{
_c6e=false;
}
return _c6e;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c72,_c73){
var _c74=_c72.serializeToString();
var _c75=new BindingParser(this.bindingDocument);
var _c76=_c75.parseFromString(_c74).getFirst();
_c73=_c73?_c73:this.containingTreeBinding.getDropIndex();
var _c77=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c76,_c77.get(_c73));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c72.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c78=this.getProperty("image");
var _c79=this.getProperty("image-active");
var _c7a=this.getProperty("image-disabled");
_c79=_c79?_c79:this.isContainer?_c78?_c78:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c78?_c78:TreeNodeBinding.DEFAULT_ITEM;
_c7a=_c7a?_c7a:this.isContainer?_c78?_c78:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c78?_c78:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c78=_c78?_c78:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c78,imageHover:null,imageActive:_c79,imageDisabled:_c7a});
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
TreeNodeBinding.prototype.setLabel=function(_c7c){
this.setProperty("label",String(_c7c));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7c));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c7d){
this.setProperty("tooltip",String(_c7d));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c7d));
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
var _c7e=this.imageProfile.getDefaultImage();
var _c7f=this.imageProfile.getActiveImage();
_c7f=_c7f?_c7f:_c7e;
return this.isOpen?_c7f:_c7e;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c81=DOMEvents.getTarget(e);
var _c82=this.labelBinding.bindingElement;
var _c83=this.labelBinding.shadowTree.labelBody;
var _c84=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c81){
case _c82:
this._onAction(e);
break;
case _c83:
case _c84:
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
if(_c81.parentNode==this.bindingElement&&_c81.__updateType==Update.TYPE_INSERT){
var _c82=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c81)=="treenode"){
if(_c81==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c81,_c82.nextSibling);
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
switch(_c81){
case _c82:
case _c83:
case _c84:
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
var _c88=true;
if(e.type=="mousedown"){
var _c89=e.button==(e.target?0:1);
if(!_c89){
_c88=false;
}
}
if(_c88){
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
var _c8b=false;
if(e!=null){
_c8b=e.shiftKey;
}
this.dispatchAction(_c8b?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c8e=this.getDescendantBindingsByLocalName("treenode");
_c8e.each(function(_c8f){
_c8f.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c90){
var _c91=_c90.getAttribute("focused");
if(_c91=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c92){
var _c93=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c92);
return UserInterface.registerBinding(_c93,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c94){
var _c95=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c94);
return UserInterface.registerBinding(_c95,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c96){
this.bindingElement.style.left=_c96.x+"px";
this.bindingElement.style.top=_c96.y+"px";
this._geometry.x=_c96.x;
this._geometry.y=_c96.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c97){
var _c98=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c97);
return UserInterface.registerBinding(_c98,TreePositionIndicatorBinding);
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
this.addFilter(function(_c9a){
var _c9b=UserInterface.getBinding(_c9a);
var _c9c=null;
var _c9c=null;
if(!_c9b instanceof TreeNodeBinding){
_c9c=NodeCrawler.SKIP_NODE;
}
return _c9c;
});
this.addFilter(function(_c9d,list){
var _c9f=UserInterface.getBinding(_c9d);
var _ca0=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c9f.isOpen){
list.add(_c9f);
}
break;
}
return _ca0;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca1){
this.binding=_ca1;
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
DockControlBinding.newInstance=function(_d14){
var _d15=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d14);
return UserInterface.registerBinding(_d15,DockControlBinding);
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
ViewBinding.getInstance=function(_d16){
var _d17=ViewBinding._instances.get(_d16);
if(!_d17){
var cry="ViewBinding.getInstance: No such instance: "+_d16;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d17;
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
var _d1a=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d1a){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d1b=snap.boxObject.getGlobalPosition();
var _d1c=snap.boxObject.getDimension();
if(!Point.isEqual(_d1b,this._lastknownposition)){
this.setPosition(_d1b);
this._lastknownposition=_d1b;
}
if(!Dimension.isEqual(_d1c,this._lastknowndimension)){
this.setDimension(_d1c);
this._lastknowndimension=_d1c;
var _d1d=_d1c.h-ViewBinding.VERTICAL_ADJUST;
_d1d=_d1d<0?0:_d1d;
this.windowBinding.getBindingElement().style.height=new String(_d1d)+"px";
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
var _d1e=this._viewDefinition.flowHandle;
if(_d1e!=null){
FlowControllerService.CancelFlow(_d1e);
}
}
if(this._viewDefinition!=null){
var _d1f=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d1f);
this.logger.fine("ViewBinding closed: \""+_d1f+"\"");
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
var _d21=null;
if(this._viewDefinition!=null){
_d21=this._viewDefinition.handle;
}
return _d21;
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
ViewBinding.prototype.setDefinition=function(_d22){
this._viewDefinition=_d22;
if(_d22.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d23){
ViewBinding.superclass.handleAction.call(this,_d23);
var _d24=_d23.target;
switch(_d23.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d23.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d24.isActivated){
_d24.onActivate();
}
}
_d23.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d24==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d23.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d24==this._snapBinding){
if(_d24.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d24.getContentWindow().isPostBackDocument){
if(_d23.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d24.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d24==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d24.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d23.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d23.type==WindowBinding.ACTION_ONLOAD){
var win=_d24.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d24);
}
}
}
_d23.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d24.label&&this._viewDefinition.label){
_d24.label=this._viewDefinition.label;
}
if(!_d24.image&&this._viewDefinition.image){
_d24.image=this._viewDefinition.image;
}
if(_d24.bindingWindow==this.getContentWindow()){
this._pageBinding=_d24;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d24.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d24==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d23.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d23.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d29,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d29,arg);
switch(_d29){
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
var _d2d=def.argument;
if(_d2d!=null){
page.setPageArgument(_d2d);
}
var _d2e=def.width;
if(_d2e!=null){
page.width=_d2e;
}
var _d2f=def.height;
if(_d2f!=null){
page.height=_d2f;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d30){
ViewBinding.superclass.handleCrawler.call(this,_d30);
switch(_d30.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d30.id==FocusCrawler.ID){
if(_d30.previousNode!=this._snapBinding.bindingElement){
_d30.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d30.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d31){
_d31.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d31.x+"px";
this.bindingElement.style.top=_d31.y+"px";
};
ViewBinding.prototype.setDimension=function(_d32){
_d32.h-=ViewBinding.VERTICAL_ADJUST;
_d32.w-=ViewBinding.HORIZONTAL_ADJUST;
_d32.w-=1;
if(_d32.h<0){
_d32.h=0;
}
if(_d32.w<0){
_d32.w=0;
}
this.bindingElement.style.width=String(_d32.w)+"px";
this.bindingElement.style.height=String(_d32.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d33){
this.isFlexBoxBehavior=false;
_d33.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d33.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d33.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d33;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d34=null;
if(this.isFreeFloating==true){
_d34=this._snapBinding.getBindingElement();
}else{
_d34=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d34;
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
ViewBinding.prototype.reload=function(_d35){
this._isLoaded=false;
this.windowBinding.reload(_d35);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d36=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d36=true;
}
}
if(!_d36){
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
ViewBinding.newInstance=function(_d3a){
var _d3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d3a);
var _d3c=UserInterface.registerBinding(_d3b,ViewBinding);
_d3c.windowBinding=_d3c.add(WindowBinding.newInstance(_d3a));
return _d3c;
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
var _d44=this.bindingWindow.__doPostBack;
var _d45=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d45){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d46,_d47){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d45=true;
}
self.manifestAllDataBindings();
_d44(_d46,_d47);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d48,list){
var _d4a=this.bindingWindow.bindingMap.__REQUEST;
if(_d4a!=null&&this._isDotNet()){
switch(_d48){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d4a.postback(_d48);
}
}
break;
default:
_d4a.postback(_d48);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d48,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d4b,list){
var _d4d=this.getDescendantBindingsByType(WindowBinding);
_d4d.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d4b,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d51){
if(_d51.name==null||_d51.name==""){
return;
}
list.add({name:_d51.name,value:_d51.value});
});
var out="";
list.each(function(_d53){
out+=_d53.name+": "+_d53.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d54){
PageBinding.superclass.handleAction.call(this,_d54);
var _d55=_d54.target;
switch(_d54.type){
case RootBinding.ACTION_PHASE_3:
if(_d55==UserInterface.getBinding(this.bindingDocument.body)){
_d55.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d55);
}
_d54.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d56=this.validateAllDataBindings();
if(_d56){
this.doPostBack(_d55);
}
}
_d54.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d54.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d55.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d55.key)){
this._initBlockers.del(_d55.key);
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
var _d58={handleAction:function(_d59){
if(_d59.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d58);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d58);
}else{
MessageQueue.udpdate();
}
_d54.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d5a,arg){
PageBinding.superclass.handleBroadcast.call(this,_d5a,arg);
switch(_d5a){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d5c=arg;
if(!this._canPostBack&&!_d5c){
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
PageBinding.prototype.doPostBack=function(_d5e){
if(this._canPostBack){
if(_d5e!=null&&this._isDotNet()){
var _d5f=_d5e.getCallBackID();
var _d60=_d5e.getCallBackArg();
if(_d5f!=null){
_d5f=_d5f.replace(/_/g,"$");
}else{
_d5f="";
}
if(_d60==null){
_d60="";
}
this.bindingWindow.__doPostBack(_d5f,_d60);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d61){
var _d62=true;
var _d63=this.bindingWindow.DataManager.getAllDataBindings();
while(_d63.hasNext()&&_d62){
var _d64=_d63.getNext();
if(_d64.isAttached){
var _d65=_d64.validate();
if(_d62&&!_d65){
_d62=false;
this.logger.debug("Invalid DataBinding: "+_d64.toString()+" ("+_d64.getName()+")");
if(_d61){
var _d66=_d64.getAncestorBindingByType(TabPanelBinding);
if(_d66!=null&&!_d66.isVisible){
var _d67=_d66.getAncestorBindingByType(TabBoxBinding);
var _d68=_d67.getTabBinding(_d66);
_d67.select(_d68);
}
}
break;
}
}
}
return _d62;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d6a=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6a.hasNext()){
var _d6b=_d6a.getNext();
if(_d6b.isAttached){
var _d6c=_d6b.manifest();
if(_d6c!=null){
list.add(_d6c);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d6d=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6d.hasNext()){
var _d6e=_d6d.getNext();
if(_d6e.isAttached){
_d6e.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d6f="";
if(!_d6f&&this.labelfield){
var _d70=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d70!=null&&_d70.getLabel){
_d6f=_d70.getLabel();
}else{
if(_d70!=null&&_d70.getValue){
_d6f=_d70.getValue();
}
}
}
if(!_d6f&&this.label){
_d6f=this.label;
}
return _d6f;
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
var _d73=this._cachedFocus.getBinding();
if(_d73){
_d73.blur();
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
var _d74=this.getProperty("width");
if(!_d74){
_d74=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d74;
}
if(this.height==null){
var _d75=this.getProperty("height");
this.height=_d75?_d75:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d76=this.getProperty("minheight");
if(_d76!=null){
this.minheight=_d76;
}
}
if(this.controls==null){
var _d77=this.getProperty("controls");
this.controls=_d77?_d77:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d78=this.getProperty("resizable");
this.isResizable=_d78?_d78:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d79=this.getProperty("image");
var _d7a=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d79&&_d7a){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d79);
_d7a.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d7c){
if(_d7c!=this.isAutoHeightLayoutMode){
if(_d7c){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d7c;
}
};
DialogPageBinding.prototype.handleAction=function(_d7d){
DialogPageBinding.superclass.handleAction.call(this,_d7d);
var _d7e=_d7d.target;
switch(_d7d.type){
case PageBinding.ACTION_ATTACHED:
if(_d7e!=this&&_d7e.isFitAsDialogSubPage){
_d7e.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d7d.consume();
if(_d7e.response!=null){
this.response=_d7e.response;
switch(_d7e.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d7f){
var _d80=this.bindingWindow.bindingMap.buttonAccept;
if(_d80!=null){
_d80.setDisabled(_d7f);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d81){
var _d82=CSSComputer.getPadding(this.bindingElement);
var _d83=CSSComputer.getBorder(this.bindingElement);
_d81+=_d82.top+_d82.bottom;
_d81+=_d83.top+_d83.bottom;
if(_d81>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d81+"px";
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
EditorPageBinding.prototype.handleAction=function(_d8b){
EditorPageBinding.superclass.handleAction.call(this,_d8b);
var _d8c=_d8b.target;
switch(_d8b.type){
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
var _d8d=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d8c.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d8d==-1){
_d8d=0;
}
}else{
_d8d++;
}
return res;
});
if(_d8d>-1){
this._messengers.del(_d8d);
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
_d8b.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d8c.key,_d8c);
if(_d8c instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d8c.key);
if(_d8c instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d8c==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d8c.getSelectedTabBinding();
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
_d8b.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d8c==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d8b.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d8c==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d8b.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d8c==this._windowBinding){
if(_d8c.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d92=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d92);
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
var _d93=this.bindingWindow.bindingMap.savebutton;
if(_d93!=null&&!_d93.isDisabled){
_d93.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d94=this.bindingWindow.bindingMap.__REQUEST;
if(_d94!=null){
_d94.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d95=this.bindingWindow.bindingMap.__REQUEST;
if(_d95!=null){
_d95.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d96){
this._message=null;
switch(_d96){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d96,this._messengers);
if(!this._messengers.hasEntries()){
if(_d96==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d96;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d96;
EditorPageBinding.superclass.postMessage.call(this,_d96,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d96,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d97,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d97,arg);
switch(_d97){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d99=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d99);
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
var _d9a=new List();
this._invalidBindings.each(function(key,_d9c){
var list=_d9c.getInvalidLabels();
if(list){
list.each(function(_d9e){
_d9a.add(_d9e);
});
}
});
if(_d9a.hasEntries()){
var _d9f="";
while(_d9a.hasNext()){
_d9f+=_d9a.getNext().toLowerCase();
if(_d9a.hasNext()){
_d9f+=", ";
}else{
_d9f+=".";
}
}
var _da0=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da0+" "+_d9f);
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
EditorPageBinding.prototype.enableSave=function(_da1){
var _da2=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da2){
var _da3=UserInterface.getBinding(_da2);
if(_da1){
_da3.enable();
}else{
_da3.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _da4=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_da4!=null){
UserInterface.getBinding(_da4).enable();
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
var _da5=this._windowBinding.getContentDocument().title;
if(_da5==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da6=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da8){
if(_da8.name=="__EVENTTARGET"&&_da6){
_da8.value=_da6;
}
list.add({name:_da8.name,value:_da8.value});
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
var _daa=this.getProperty("responseid");
this.responseid=_daa;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dab){
ResponsePageBinding.superclass.handleAction.call(this,_dab);
switch(_dab.type){
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
WizardPageBinding.prototype.handleAction=function(_dac){
WizardPageBinding.superclass.handleAction.call(this,_dac);
var _dad=_dac.target;
switch(_dac.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dad);
}else{
_dac.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dad);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dac.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dac.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dae){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db0=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dae);
}
if(_db0){
_db0.setDisabled(!_dae);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db1,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db1,arg);
var self=this;
switch(_db1){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db5){
};
MarkupAwarePageBinding.prototype._activate=function(_db6){
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
var _db7=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db7.boxObject.getDimension().w;
_db7.hide();
var _db8=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db8+"px";
var self=this;
var _dba=this.bindingWindow.bindingMap.moreactionsbutton;
_dba.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dbb){
self._showMoreActions();
_dbb.consume();
}});
var _dbc=this.bindingWindow.bindingMap.moreactionspopup;
_dbc.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dbd){
var item=_dbd.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dbf,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dbf,arg);
switch(_dbf){
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
var _dc3=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc3!=null){
_dc3.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dc4=this.bindingWindow.WindowManager;
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
var _dc5=new String("");
this._actionProfile.each(function(_dc6,list){
list.each(function(_dc8){
_dc5+=_dc8.getHandle()+";"+_dc8.getKey()+";";
if(_dc8.isDisabled()){
_dc5+="isDisabled='true';";
}
});
});
return _dc5;
};
SystemToolBarBinding.prototype.handleAction=function(_dc9){
SystemToolBarBinding.superclass.handleAction.call(this,_dc9);
switch(_dc9.type){
case ButtonBinding.ACTION_COMMAND:
var _dca=_dc9.target;
this._handleSystemAction(_dca.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dcb){
if(_dcb!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dcd=list.getFirst();
var _dce=_dcd.node;
}
SystemAction.invoke(_dcb,_dce);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd1,list){
var _dd3=new List();
list.reset();
while(list.hasNext()){
var _dd4=list.getNext();
var _dd5=null;
if(_dd4.isInToolBar()){
if(_dd4.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd5=self.getToolBarButtonBinding(_dd4);
}
}
if(_dd5!=null){
_dd3.add(_dd5);
}
}
if(_dd3.hasEntries()){
var _dd6=ToolBarGroupBinding.newInstance(doc);
_dd3.each(function(_dd7){
_dd6.add(_dd7);
});
self.addLeft(_dd6);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd8=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd9=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_dd9=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _dda=0;
var _ddb=new List();
var _ddc,_ddd=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_ddc=_ddd.getNext())!=null){
if(!_ddc.isVisible){
_ddc.show();
}
_dda+=_ddc.boxObject.getDimension().w;
if(_dda>=_dd9){
_ddb.add(_ddc);
_ddc.hide();
}
}
if(_ddb.hasEntries()){
var _dde=_ddb.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dde).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_ddc=_ddb.getNext())!=null){
this._moreActions.add(_ddc.associatedSystemAction);
}
_dd8.show();
}else{
this._moreActions=null;
_dd8.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _ddf=this.bindingWindow.bindingMap.moreactionspopup;
_ddf.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_ddf.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_ddf.add(item);
}
_ddf.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_de1){
var _de2=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _de3=_de1.getLabel();
var _de4=_de1.getToolTip();
var _de5=_de1.getImage();
var _de6=_de1.isDisabled();
if(_de5){
_de2.setImage(_de5);
}
if(_de3){
_de2.setLabel(_de3);
}
if(_de4){
_de2.setToolTip(_de4);
}
if(_de1.isDisabled()){
_de2.disable();
}
_de2.associatedSystemAction=_de1;
return _de2;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _de7=this.getDescendantBindingByLocalName("toolbarbutton");
if(_de7!=null){
_de7.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_de8){
var _de9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_de8);
return UserInterface.registerBinding(_de9,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_dea){
this.bindingElement.style.left=_dea.x+"px";
this.bindingElement.style.top=_dea.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_deb){
_deb.h-=ViewBinding.VERTICAL_ADJUST;
_deb.w-=ViewBinding.HORIZONTAL_ADJUST;
_deb.w-=1;
if(_deb.h<0){
_deb.h=0;
}
if(_deb.w<0){
_deb.w=0;
}
this.bindingElement.style.width=String(_deb.w)+"px";
this.bindingElement.style.height=String(_deb.h)+"px";
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
SystemTreeBinding.prototype.add=function(_dec){
var _ded=SystemTreeBinding.superclass.add.call(this,_dec);
if(!this._defaultTreeNode){
if(_dec instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dec;
}
}
return _ded;
};
SystemTreeBinding.prototype.handleAction=function(_dee){
SystemTreeBinding.superclass.handleAction.call(this,_dee);
var _def=_dee.target;
switch(_dee.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_def.key);
this._updateFocusedNode();
_dee.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dee.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_def.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dee.consume();
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
var _df1=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df1);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df2){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df2);
var reg=this._entityTokenRegistry;
var _df4=_df2.node.getEntityToken();
if(reg.has(_df4)){
reg.get(_df4).add(_df2);
}else{
reg.set(_df4,new List([_df2]));
}
var _df5=null;
if(this.isLockedToEditor){
if(_df4==StageBinding.entityToken){
if(_df2.node.isTreeLockEnabled()){
_df5=_df2;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df2.node.getHandle()){
_df5=_df2;
}
}
}
if(_df5!=null){
this.focusSingleTreeNodeBinding(_df5);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df6){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df6);
var reg=this._entityTokenRegistry;
var _df8=_df6.node.getEntityToken();
if(reg.has(_df8)){
var list=reg.get(_df8);
list.del(_df6);
if(!list.hasEntries()){
reg.del(_df8);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df6.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df6.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dfc=this._refreshingTreeNodes;
if(_dfc.hasEntries()&&_dfc.has(key)){
_dfc.del(key);
if(!_dfc.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _dfd=StageBinding.entityToken;
if(_dfd!=null){
this._focusTreeNodeByEntityToken(_dfd);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dfe=false;
var _dff=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dfe=false;
}else{
if(_dff.hasEntries()){
_dfe=true;
while(_dfe&&_dff.hasNext()){
var _e00=_dff.getNext();
if(!_e00.isDraggable){
_dfe=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dfe;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e01,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e01,arg);
switch(_e01){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e01,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e01);
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
var self=this,_e05=arg;
setTimeout(function(){
if(_e05!=null){
self._focusTreeNodeByEntityToken(_e05);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e07=tab.perspectiveNode==null;
if(!_e07){
_e07=tab.perspectiveNode==this.perspectiveNode;
}
if(_e07){
var self=this,_e09=tab.getEntityToken();
setTimeout(function(){
if(_e09!=null){
self._focusTreeNodeByEntityToken(_e09);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e0a,_e0b){
this.isLockFeatureFocus=true;
var _e0c=null;
if(this._entityTokenRegistry.has(_e0a)){
var list=this._entityTokenRegistry.get(_e0a);
list.each(function(tn){
var _e0f=true;
if(tn.node.isTreeLockEnabled()){
_e0c=tn;
_e0f=false;
}
return _e0f;
});
if(_e0c!=null){
if(!_e0c.isFocused){
this.focusSingleTreeNodeBinding(_e0c,true);
}else{
_e0c.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e0c==null&&_e0b!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e0a);
self._focusTreeNodeByEntityToken(_e0a,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e11){
var _e12=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e13=this.getRootTreeNodeBindings();
while(_e13.hasNext()){
var _e14=_e13.getNext();
_e12.add(_e14.node.getEntityToken());
}
}else{
_e12.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e12.hasNext()){
var _e15=_e12.getNext();
var _e16=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e15,_e11,_e16);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e19=this._treeNodeBindings;
var _e1a=new Map();
function fix(_e1b,list){
if(!_e1b.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e19.has(node.getHandle())){
var _e1e=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e1a.set(node.getHandle(),_e1e);
_e1b.add(_e1e);
}
});
_e1b.attachRecursive();
}
}
_e1b.open(true);
}
map.each(function(_e1f,list){
if(_e19.has(_e1f)){
var _e21=_e19.get(_e1f);
fix(_e21,list);
}else{
if(_e1a.has(_e1f)){
var _e22=_e1a.get(_e1f);
fix(_e22,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e23,arg){
switch(_e23){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e25=arg;
if(_e25!=null){
this._invokeServerRefresh(_e25);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e26=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e26;
_e26.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e26=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e26;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e27){
if(_e27!=null&&_e27=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e27)){
var list=this._entityTokenRegistry.get(_e27).reset();
this._refreshToken=_e27;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e29=list.getNext();
this._refreshingTreeNodes.set(_e29.key,true);
setTimeout(function(){
_e29.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e2a=this.getFocusedTreeNodeBindings().getFirst();
if(_e2a){
var _e2b=_e2a.getLabel();
var _e2c=_e2a.getAncestorBindingByLocalName("treenode");
if(_e2c){
_e2a=_e2c;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e2a.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e2d=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e2d,[_e2b]);
}
_e2a.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e2e=SystemTreeBinding.clipboard;
if(_e2e){
var type=_e2e.dragType;
var _e30=this.getFocusedTreeNodeBindings().getFirst();
if(_e30.dragAccept){
if(_e30.acceptor.isAccepting(type)){
this._performPaste(_e30);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e31){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e31.node.hasDetailedDropSupport()){
if(_e31.node.hasChildren()){
var _e33=_e31.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e34,_e35){
if(_e34==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e36=_e35.get("switch");
var _e37=_e35.get("sibling");
if(_e36=="after"){
_e37++;
}
var _e38=_e31.accept(SystemTreeBinding.clipboard,_e37);
if(_e38){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e33);
}else{
Application.lock(self);
var _e39=_e31.accept(SystemTreeBinding.clipboard,0);
if(_e39){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e39=_e31.accept(SystemTreeBinding.clipboard,0);
if(_e39){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e3a=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e3a!=null){
this._focusTreeNodeByEntityToken(_e3a);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e3b){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e3b){
this.blurSelectedTreeNodes();
var _e3c=this.getRootTreeNodeBindings();
_e3c.each(function(_e3d){
if(_e3d.isContainer&&_e3d.isOpen){
_e3d.close();
_e3d.hasBeenOpened=false;
_e3d.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e3e){
if(_e3e!=this.isLockedToEditor){
this.isLockedToEditor=_e3e;
if(_e3e){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e40=this.getRootTreeNodeBindings();
_e40.each(function(_e41){
var _e42=_e41.getOpenSystemNodes();
if(_e42!=null&&_e42.hasEntries()){
list.merge(_e42);
}else{
if(_e41.isOpen){
list.add(_e41.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e43){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e43);
if(_e43!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e44){
if(_e44){
var list=new List(_e44.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e46=new Map();
var _e47=this.getFocusedTreeNodeBindings().getFirst();
var _e48=_e47.node.getActionProfile();
if(_e48!=null){
var self=this;
_e48.each(function(_e4a,list){
var _e4c=new List();
list.each(function(_e4d){
if(_e4d.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e4d.getGroupName()]){
_e4c.add(_e4d);
}
}
});
if(_e4c.hasEntries()){
_e46.set(_e4a,_e4c);
}
});
}
_e46.activePosition=this._activePosition;
var _e4e=_e47.node.getPropertyBag();
if(_e4e&&_e4e.Uri&&_e4e.ElementType==="application/x-composite-page"){
_e46.Uri=_e4e.Uri;
}
return _e46;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e4f,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e4f,arg);
switch(_e4f){
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
var _e54=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e54.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e55=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e55.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e56){
SystemTreePopupBinding.superclass.handleAction.call(this,_e56);
switch(_e56.type){
case MenuItemBinding.ACTION_COMMAND:
var _e57=_e56.target;
var _e58=_e57.associatedSystemAction;
if(_e58){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e5a=list.getFirst();
var _e5b=_e5a.node;
}
SystemAction.invoke(_e58,_e5b);
}else{
var cmd=_e57.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e5e=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e5e=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e5e=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e5e=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e5e=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e5e){
setTimeout(function(){
EventBroadcaster.broadcast(_e5e);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e5f=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e5f.hasNext()){
var _e60=UserInterface.getBinding(_e5f.getNext());
if(!_e60.getProperty("rel")){
_e60.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e62=new List();
var self=this;
this._actionProfile.each(function(_e64,list){
var _e66=MenuGroupBinding.newInstance(doc);
list.each(function(_e67){
var _e68=self.getMenuItemBinding(_e67);
_e66.add(_e68);
});
_e62.add(_e66);
});
_e62.reverse();
while(_e62.hasNext()){
this._bodyBinding.addFirst(_e62.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e69){
var _e6a=MenuItemBinding.newInstance(this.bindingDocument);
var _e6b=_e69.getLabel();
var _e6c=_e69.getToolTip();
var _e6d=_e69.getImage();
var _e6e=_e69.getDisabledImage();
var _e6f=_e69.isCheckBox();
if(_e6b){
_e6a.setLabel(_e6b);
}
if(_e6c){
_e6a.setToolTip(_e6c);
}
if(_e6d){
_e6a.imageProfile=new ImageProfile({image:_e6d,imageDisabled:_e6e});
}
if(_e6f){
_e6a.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e69.isChecked()){
_e6a.check(true);
}
}
if(_e69.isDisabled()){
_e6a.disable();
}
_e6a.associatedSystemAction=_e69;
return _e6a;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e73=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e73=UserInterface.getBinding(node);
if(_e73.isDisabled){
_e73=null;
}
}
break;
}
if(_e73!=null&&_e73.node!=null&&_e73.node.getActionProfile()!=null){
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
var _e74=this.node.getLabel();
if(_e74){
this.setLabel(_e74);
}
var _e75=this.node.getToolTip();
if(_e75){
this.setToolTip(_e75);
}
var _e76=this.node.getHandle();
if(_e76){
this.setHandle(_e76);
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
var _e79="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e79+=list.getNext();
if(list.hasNext()){
_e79+=" ";
}
}
this.setProperty("dragaccept",_e79);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e7b){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e7b);
switch(_e7b.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e7b.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e7b.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e7c,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e7c,arg);
switch(_e7c){
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
var _e7f=null;
var _e80=this.node.getImageProfile();
if(_e80){
if(this.isOpen){
_e7f=_e80.getActiveImage();
}else{
_e7f=_e80.getDefaultImage();
}
}
if(!_e7f){
_e7f=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e7f;
};
SystemTreeNodeBinding.prototype.open=function(_e81){
var _e82=this.isContainer&&!this.isOpen;
var _e83=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e82&&(_e83||SystemTreeBinding.HAS_NO_MEMORY)&&_e81!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e84=null;
if(this.isContainer){
_e84=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e84);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e86){
if(_e86!=null){
this._refreshBranch(_e86);
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
var _e87=new List();
var _e88=this.node.getChildren();
this.empty();
if(_e88.hasEntries()){
this._insertTreeNodesRegulated(_e88);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e89){
var _e8a=0;
var _e8b=new List([]);
while(_e89.hasEntries()&&_e8a<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e8c=SystemTreeNodeBinding.newInstance(_e89.extractFirst(),this.bindingDocument);
_e8c.autoExpand=this.autoExpand;
this.add(_e8c);
_e8c.attach();
_e8a++;
if(this.autoExpand){
if(_e8a==1&&!_e89.hasEntries()||LocalStore.openedNodes.has(_e8c.node)){
_e8b.add(_e8c);
}
}
}
if(_e89.hasEntries()){
this._insertBufferTreeNode(_e89);
}
_e8b.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e8f){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e91=this.node.getDescendantBranch(list);
if(_e91.hasEntries()){
this.XXX(_e91);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e92){
var self=this;
var map=new Map();
this.empty();
_e92.each(function(key,_e96){
if(_e96.hasEntries()){
_e96.each(function(node){
var _e98=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e98);
if(map.has(key)){
var _e99=map.get(key);
_e99.add(_e98);
_e99.isOpen=true;
_e99.hasBeenOpened=true;
node.searchToken=_e99.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e98);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e92.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e9a=new TreeCrawler();
var _e9b=new List();
_e9a.mode=TreeCrawler.MODE_GETOPEN;
_e9a.crawl(this.bindingElement,_e9b);
if(_e9b.hasEntries()){
_e9b.extractFirst();
}
_e9a.dispose();
return _e9b;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e9c=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e9c=new List([this.node]);
list.each(function(_e9e){
_e9c.add(_e9e.node);
});
}
return _e9c;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e9f,_ea0){
var _ea1=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e9f instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e9f.node.getData(),this.node.getData(),_ea0?_ea0:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_ea1);
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
SystemTreeNodeBinding.newInstance=function(node,_ea5){
var _ea6=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ea5);
var _ea7=UserInterface.registerBinding(_ea6,SystemTreeNodeBinding);
_ea7.node=node;
return _ea7;
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
SystemPageBinding.prototype.setPageArgument=function(_ea8){
this.node=_ea8;
SystemPageBinding.superclass.setPageArgument.call(this,_ea8);
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
var _ea9=this.node.getChildren();
if(_ea9.hasEntries()){
while(_ea9.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ea9.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _eab=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_eab.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ead=new TreeCrawler();
var _eae=new List();
_ead.mode=TreeCrawler.MODE_GETOPEN;
_ead.crawl(this.bindingElement,_eae);
_ead.dispose();
var list=new List([this.node]);
_eae.each(function(_eb0){
list.add(_eb0.node);
});
this._tree.empty();
var _eb1=this.node.getDescendantBranch(list);
if(_eb1.hasEntries()){
var self=this;
var map=new Map();
_eb1.each(function(key,_eb5){
_eb5.each(function(node){
var _eb7=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eb7);
if(map.has(key)){
var _eb8=map.get(key);
_eb8.add(_eb7);
_eb8.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eb7);
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
SystemPageBinding.prototype.handleAction=function(_eb9){
SystemPageBinding.superclass.handleAction.call(this,_eb9);
switch(_eb9.type){
case ButtonBinding.ACTION_COMMAND:
var _eba=_eb9.target;
switch(_eba.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eba.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ebb,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ebb,arg);
switch(_ebb){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ebd=arg;
if(this.node&&this.node.getEntityToken()==_ebd){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ebd);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ebd);
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
StageContainerBinding.prototype.handleBroadcast=function(_ebf,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ebf,arg);
var _ec1=this.bindingWindow.WindowManager;
switch(_ebf){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ec1.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ec1.WINDOW_RESIZED_BROADCAST:
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
var _ec3=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ec3.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ec4){
if(StageBinding.isViewOpen(_ec4)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ec4);
}else{
var _ec5=ViewDefinitions[_ec4];
StageBinding.presentViewDefinition(_ec5);
}
};
StageBinding.isViewOpen=function(_ec6){
return StageBinding.bindingInstance._activeViewDefinitions[_ec6]!=null;
};
StageBinding.selectPerspective=function(_ec7){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ec7);
};
StageBinding.presentViewDefinition=function(_ec8){
if(_ec8.label!=null){
var _ec9=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec9,[_ec8.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec8);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ecb,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ecd=System.getPerspectiveNodes();
if(_ecd.hasEntries()){
this._initializeSystemViewDefinitions(_ecd);
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
var _ecf=null;
if(LocalStore.isEnabled){
_ecf=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ecf&&ViewDefinitions[_ecf]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ecf));
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
var _ed1=root.getActionProfile();
if(_ed1&&_ed1.hasEntries()){
var _ed2=top.app.bindingMap.toolsmenugroup;
if(_ed2){
_ed1.each(function(_ed3,list){
list.each(function(_ed5){
var item=MenuItemBinding.newInstance(_ed2.bindingDocument);
item.setLabel(_ed5.getLabel());
item.setToolTip(_ed5.getToolTip());
item.setImage(_ed5.getImage());
item.setDisabled(_ed5.isDisabled());
item.associatedSystemAction=_ed5;
var _ed7=_ed2;
var tag=_ed5.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ed7=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ed7.add(item);
});
});
_ed2.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed9){
while(_ed9.hasNext()){
var node=_ed9.getNext();
var _edb=node.getHandle();
ViewDefinitions[_edb]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_edc){
StageBinding.superclass.handleAction.call(this,_edc);
var _edd=_edc.target;
switch(_edc.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_edd;
this._inflateBinding(_edd);
_edc.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_edd;
this._inflateBinding(_edd);
_edc.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_edc.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_edd instanceof DockBinding){
switch(_edd.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_edd.reference,_edd);
break;
}
this.handleAttachedDock(_edd);
_edc.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_edd instanceof DockBinding){
this.handleSelectedDockTab(_edd.getSelectedTabBinding());
_edc.consume();
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
_edc.consume();
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
_edc.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_edc);
};
StageBinding.prototype.handleBroadcast=function(_edf,arg){
StageBinding.superclass.handleBroadcast.call(this,_edf,arg);
switch(_edf){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ee1=arg;
this._dontView(_ee1);
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
StageBinding.prototype._showStart=function(_ee3){
if(_ee3!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ee6=this.bindingWindow.bindingMap.maindecks;
if(_ee3){
_ee6.select("startdeck");
view.show();
}else{
view.hide();
_ee6.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ee3;
}
};
StageBinding.prototype._inflateBinding=function(_ee7){
for(var _ee8 in ViewDefinitions){
var _ee9=ViewDefinitions[_ee8];
if(_ee9 instanceof SystemViewDefinition){
_ee7.mountDefinition(_ee9);
}
}
var _eea=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_eea){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eed=new StageCrawler();
_eed.mode=mode;
_eed.crawl(this.bindingElement);
_eed.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_eee){
var _eef=_eee.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eef);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eef));
}
};
StageBinding.prototype.handleAttachedDock=function(_ef0){
var _ef1=_ef0.getTabBindings();
if(_ef1.hasEntries()){
while(_ef1.hasNext()){
var _ef2=_ef1.getNext();
var _ef3=_ef2.getHandle();
if(_ef3){
if(_ef3=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ef4=ViewDefinitions[_ef3];
if(_ef4){
this._view(_ef0,_ef2,_ef4,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ef3+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ef5){
var _ef6=null;
var _ef7=false;
switch(_ef5.position){
case Dialog.MODAL:
_ef6=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ef6=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ef5.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ef6=this._dockBindings.get(_ef5.position);
break;
case DockBinding.EXTERNAL:
window.open(_ef5.url);
_ef7=true;
break;
default:
var _ef8=this._decksBinding.getSelectedDeckBinding();
_ef6=_ef8.getDockBindingByReference(_ef5.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef9=this.bindingWindow.bindingMap.maindecks;
_ef9.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ef7=true;
}
break;
}
if(!_ef7){
if(_ef6!=null){
this._view(_ef6,null,_ef5,true);
}else{
throw "StageBinding: Could not position view: "+_ef5.handle;
}
}
};
StageBinding.prototype._view=function(_efa,_efb,_efc,_efd){
var _efe=_efc.handle;
if(_efc.isMutable){
_efe+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_efe]){
var _eff=ViewBinding.getInstance(_efe);
if(_eff!=null){
_eff.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_efe);
}
}else{
this._activeViewDefinitions[_efe]=_efc;
Application.lock(this);
switch(_efa.constructor){
case DockBinding:
if(_efd){
_efa.prepareNewView(_efc);
}else{
_efa.prepareOpenView(_efc,_efb);
}
break;
case StageDialogBinding:
if(_efd){
_efa.prepareNewView(_efc);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f00){
if(this._activeViewDefinitions[_f00]!=null){
delete this._activeViewDefinitions[_f00];
}else{
this.logger.debug("Could not unregister active view: "+_f00);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f01){
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
this.addFilter(function(_f03){
var _f04=UserInterface.getBinding(_f03);
var _f05=null;
if(_f04){
switch(_f04.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f04.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f04.handleUnMaximization();
break;
}
break;
case DockBinding:
_f05=NodeCrawler.SKIP_NODE;
break;
}
}
return _f05;
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
var _f06=null;
this._dialogs.each(function(_f07){
if(!_f07.isVisible){
_f06=_f07;
}
return _f06!=null;
});
if(!_f06){
this._newInstance();
_f06=this._dialogs.getLast();
}
_f06.setModal(false);
return _f06;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f08=this.getInstance();
_f08.setModal(true);
return _f08;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f09=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f09);
_f09.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f0a){
if(_f0a instanceof DialogViewDefinition){
var _f0b=ViewBinding.newInstance(this.bindingDocument);
_f0b.setDefinition(_f0a);
_f0b.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f0a.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f0a.handler)){
this._dialogResponseHandler=_f0a.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f0b;
this._body.add(_f0b);
_f0b.attach();
_f0b.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f0c){
StageDialogBinding.superclass.handleAction.call(this,_f0c);
var _f0d=_f0c.target;
switch(_f0c.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f0d);
_f0c.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f0d.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f0c.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f0d.response){
this._handleDialogPageResponse(_f0d);
}
_f0c.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f0c.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f0c.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f0c.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f0c.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f0c.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f0c.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f0c.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f0c.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f0d==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f0e,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f0e,arg);
switch(_f0e){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f10){
var _f11=new FitnessCrawler();
var list=new List();
if(_f10){
_f11.mode=FitnessCrawler.MODE_BRUTAL;
}
_f11.crawl(this.bindingElement,list);
_f11.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f13){
_f13.fit(_f10);
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
var _f14=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f14){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f16){
var cmd=_f16.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f18){
if(_f18.bindingDocument==this._viewBinding.getContentDocument()){
if(_f18 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f18);
}
this._pageBinding=_f18;
if(_f18.height=="auto"){
_f18.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f18);
_f18.enableAutoHeightLayoutMode(false);
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
if(_f18.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f18);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f19){
var _f1a=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f1a){
var _f1b=UserInterface.getBinding(_f1a);
_f1b.setDisabled(_f19);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f1c){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f1c.response,_f1c.result!=null?_f1c.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f1e){
if(_f1e.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f1e);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f20){
switch(_f20.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f20.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f20.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f21){
var _f22=_f21.label;
var _f23=_f21.image;
var _f24=_f21.width;
var _f25=_f21.height;
var _f26=_f21.controls;
var _f27=_f21.isResizable;
if(_f22){
this.setLabel(_f22);
}
if(_f23){
this.setImage(_f23);
}
if(_f24||_f25){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f24?_f24:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f25!=null&&_f25!="auto")?_f25:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f26){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f2b=new List(_f26.split(" "));
while((type=_f2b.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f27!=this._isResizable){
this.setResizable(_f27);
}
if(_f25=="auto"){
this._fixAutoHeight(_f21);
}
if(_f21==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f2c){
var dim=this.getDimension();
var _f2e=0;
var _f2f=0;
if(_f2c.isDialogSubPage){
_f2c=this._pageBinding;
}
if(this._isFirstPage){
_f2e=_f2c.width!=null?_f2c.width:dim.w;
}else{
_f2e=dim.w;
}
_f2f=_f2c.bindingElement.offsetHeight;
_f2f+=this._titlebar.bindingElement.offsetHeight;
_f2f+=4;
_f2f+=4;
if(_f2f<dim.h){
_f2f=dim.h;
}
if(_f2c.minheight!=null){
if(_f2f<_f2c.minheight){
_f2f=_f2c.minheight;
}
}
this.setDimension(new Dimension(_f2e,_f2f));
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
StageDialogBinding.newInstance=function(_f32){
var _f33=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f32);
var _f34=UserInterface.registerBinding(_f33,StageDialogBinding);
_f34.setProperty("controls","minimize maximize close");
return _f34;
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
this.addFilter(function(_f35,list){
var _f37=null;
var _f38=UserInterface.getBinding(_f35);
if(!_f38.isVisible){
_f37=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f37;
});
this.addFilter(function(_f39,list){
var _f3b=null;
var _f3c=UserInterface.getBinding(_f39);
if(_f3c.isAttached){
if(Interfaces.isImplemented(IFit,_f3c)){
if(!_f3c.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f3c);
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
StageDecksBinding.prototype.mountDefinition=function(_f3d){
var _f3e=StageDeckBinding.newInstance(this.bindingDocument);
_f3e.handle=_f3d.handle;
_f3e.perspectiveNode=_f3d.node;
_f3e.definition=_f3d;
this._decks[_f3e.handle]=_f3e;
this.add(_f3e);
_f3e.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f3f){
var _f40=this._decks[_f3f];
StageBinding.perspectiveNode=_f40.perspectiveNode;
this.select(_f40);
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
StageDeckBinding.prototype.handleAction=function(_f41){
StageDeckBinding.superclass.handleAction.call(this,_f41);
var _f42=_f41.target;
switch(_f41.type){
case WindowBinding.ACTION_LOADED:
if(_f42==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f43=this.windowBinding.getContentDocument();
var _f44=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f45=ViewBinding.newInstance(_f43);
_f45.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f46=ViewDefinitions["Composite.Management.Browser"];
_f46.argument["SystemViewDefinition"]=this.definition;
_f45.setDefinition(_f46);
_f44.add(_f45);
_f45.attach();
_f45.initialize();
this._viewBinding=_f45;
_f41.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f42 instanceof DockBinding){
this._dockBindings.set(_f42.reference,_f42);
_f42.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f41.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f41.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f41);
StageDeckBinding.superclass.handleAction.call(this,_f41);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f48=new StageCrawler();
_f48.mode=mode;
_f48.crawl(this.windowBinding.getContentDocument().body);
_f48.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f49){
return this._dockBindings.get(_f49);
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
StageDeckBinding.newInstance=function(_f4b){
var _f4c=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f4b);
var _f4d=UserInterface.registerBinding(_f4c,StageDeckBinding);
return _f4d;
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
StageSplitBoxBinding.prototype.handleAction=function(_f4e){
StageSplitBoxBinding.superclass.handleAction.call(this,_f4e);
StageBoxAbstraction.handleAction.call(this,_f4e);
var _f4f=_f4e.target;
var _f50=null;
var _f51=null;
switch(_f4e.type){
case DockBinding.ACTION_EMPTIED:
_f51=this.getChildBindingByLocalName("splitter");
if(_f51.isVisible){
_f51.hide();
}
_f50=this.getDescendantBindingsByLocalName("dock");
if(_f50.getFirst().isEmpty&&_f50.getLast().isEmpty){
if(_f50.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f4e.consume();
break;
case DockBinding.ACTION_OPENED:
_f50=this.getDescendantBindingsByLocalName("dock");
if(!_f50.getFirst().isEmpty&&!_f50.getLast().isEmpty){
_f51=this.getChildBindingByLocalName("splitter");
if(!_f51.isVisible){
_f51.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f4e.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f4f!=this){
_f51=this.getChildBindingByLocalName("splitter");
if(_f51.isVisible){
_f51.hide();
}
this.invokeLayout();
_f4e.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f4f!=this){
var _f52=this.getChildBindingsByLocalName("splitpanel");
if(_f52.getFirst().isVisible&&_f52.getLast().isVisible){
_f51=this.getChildBindingByLocalName("splitter");
if(!_f51.isVisible){
_f51.show();
}
}
this.invokeLayout();
_f4e.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f53){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f53);
switch(_f53.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f53.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f54=this.getChildBindingsByLocalName("splitpanel");
return _f54.getFirst().isVisible&&_f54.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f55=this.getChildBindingsByLocalName("splitpanel");
return _f55.getFirst().isFixed&&_f55.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f56){
StageSplitPanelBinding.superclass.handleAction.call(this,_f56);
StageBoxAbstraction.handleAction.call(this,_f56);
switch(_f56.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f56.type==StageSplitBoxBinding.ACTION_HIDE){
_f56.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f56.type==DockBinding.ACTION_EMPTIED){
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
if(_f56.type==StageSplitBoxBinding.ACTION_SHOW){
_f56.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f59=_f56.target;
if(_f59!=this&&_f59.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f5a=_f59._containingSplitBoxBinding;
if(_f5a.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f5b=_f5a.getChildBindingsByLocalName("splitpanel");
var _f5c=_f5b.getFirst();
var _f5d=_f5b.getLast();
if(this.isFixed==true){
if(!_f5c.isFixed||!_f5d.isFixed||(!_f5a.hasBothPanelsVisible()&&_f59.isMinimizedForReal)){
this.setFix(false);
_f56.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f5a.hasBothPanelsFixed()||(!_f5a.hasBothPanelsVisible()&&_f59.isMinimizedForReal)){
this.setFix(_f59.getContainedDock().getHeight());
_f56.consume();
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
var _f5e=this.getContainedDock();
if(_f5e){
if(this.isMaximizePrepared==true){
}else{
_f5e.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f5f=this.getContainedDock();
if(_f5f){
if(_f5f.type==DockBinding.TYPE_EDITORS){
if(_f5f.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f5f.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f60=this.getContainedDock();
if(_f60){
_f60.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f60);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f61=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f62=this.getContainedDock();
if(_f62){
_f62.collapse(_f61);
if(!_f61){
this.setFix(_f62.getHeight());
}else{
this.setFix(_f62.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f62&&_f62.isActive){
_f62.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f62);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f63){
var _f64=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f65=this.getContainedDock();
if(_f65){
if(this.isMinimized==true){
_f65.unCollapse(_f64);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f63){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f65){
_f65.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f65);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f66){
var _f67=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f67=false;
}
}
if(_f67==true){
this._invisibilize(_f66);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f69){
if(_f69!=this._isInvisibilized){
if(_f69){
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
StageSplitterBinding.prototype.onDragStart=function(_f6a){
var _f6b=top.app.bindingMap.stagesplittercover;
var _f6c=this._containingSplitBoxBinding.getOrient();
switch(_f6c){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6b.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6b.bindingElement.style.cursor="n-resize";
break;
}
_f6b.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f6c);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f72){
this._orient=_f72;
this.attachClassName(_f72);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f74=true;
var _f75=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f75=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f74=false;
break;
}
if(_f74){
this.bindingElement.style.left=pos.x+"px";
}
if(_f75){
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
StageBoxAbstraction.handleAction=function(_f77){
switch(_f77.type){
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
if(_f77.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f77.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f78=this.bindingElement.style;
_f78.position="absolute";
_f78.width="100%";
_f78.height="100%";
_f78.top="0";
_f78.left="0";
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
var _f79=this.bindingElement.style;
_f79.position="relative";
_f79.width="auto";
_f79.height="auto";
_f79.top="auto";
_f79.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f7a,_f7b){
var _f7c=_f7a.bindingElement.style;
var _f7d=_f7a.bindingElement.parentNode;
var box=_f7a._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f7b){
_f7a._unmodifiedFlexMethod=_f7a.flex;
_f7a.flex=function(){
_f7c.width=_f7d.offsetWidth+"px";
_f7c.height=_f7d.offsetHeight+"px";
};
}else{
_f7c.width="100%";
_f7c.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f7c.width="auto";
_f7c.height="auto";
box.reflex(true);
},0);
}
_f7a.flex=_f7a._unmodifiedFlexMethod;
_f7a._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f7f){
var _f80=_f7f.target;
switch(_f7f.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f80 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f7f);
_f7f.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f7f.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f81){
var mode=null;
switch(_f81.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f83){
StageMenuBarBinding.superclass.handleAction.call(this,_f83);
switch(_f83.type){
case MenuItemBinding.ACTION_COMMAND:
var _f84=_f83.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f84){
SystemAction.invoke(_f84,this._rootNode);
}
}
_f83.consume();
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
var _f85=this.getProperty("handle");
if(_f85){
this._handle=_f85;
if(StageBinding.isViewOpen(_f85)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f85);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f87){
this.setProperty("handle",_f87);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f88,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f88,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f88){
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
StageViewMenuItemBinding.newInstance=function(_f8a){
var _f8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f8a);
UserInterface.registerBinding(_f8b,StageViewMenuItemBinding);
return UserInterface.getBinding(_f8b);
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
StageStatusBarBinding.prototype.setLabel=function(_f8c){
this._label.setLabel(_f8c);
};
StageStatusBarBinding.prototype.setImage=function(_f8d){
this._label.setImage(_f8d);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f8e){
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
var _f8f=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f90=_f8f._viewBinding;
var _f91=_f90.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _f92=_f91.getFocusedTreeNodeBindings();
if(!_f92.hasEntries()&&StageBinding.treeSelector){
_f92=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f92;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f93=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f93.each(function(_f94){
LocalStore.focuseNodes.add(_f94.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f95=LocalStore.focuseNodes.getEntityTokens();
var _f96=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f97=_f96.getAssociatedView();
var _f98=_f97.getContentWindow().bindingMap.tree;
_f95=new List(TreeService.GetCurrentLocaleEntityTokens(_f95.toArray()));
_f95.each(function(_f99){
_f98._focusTreeNodeByEntityToken(_f99);
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
ExplorerBinding.prototype.handleAction=function(_f9a){
ExplorerBinding.superclass.handleAction.call(this,_f9a);
var _f9b=_f9a.target;
switch(_f9a.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f9a.consume();
break;
case Binding.ACTION_DRAG:
if(_f9b instanceof ExplorerSplitterBinding){
_f9b.dragger.registerHandler(this);
}
_f9a.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f9d){
this._menuBinding.setSelectionByHandle(_f9d);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f9e){
if(_f9e instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f9e);
this._menuBinding.mountDefinition(_f9e);
}
};
ExplorerBinding.prototype.onDragStart=function(_f9f){
var _fa0=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fa0.hasEntries()){
var _fa1=_fa0.getFirst();
this._dragStart=_fa1.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fa1.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa5){
if(_fa5 instanceof SystemViewDefinition){
var _fa6=ViewBinding.newInstance(this.bindingDocument);
_fa6.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa6.setDefinition(_fa5);
var _fa7=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa7.setAssociatedView(_fa6);
this._decks[_fa5.handle]=_fa7;
_fa7.add(_fa6);
this.add(_fa7);
function attach(){
_fa7.attach();
_fa6.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa8){
var _fa9=this._decks[_fa8];
this.select(_fa9);
};
DecksBinding.prototype.expandBy=function(_faa){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fac=this.bindingElement.offsetHeight+_faa;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fac+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fae){
var _faf=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fae);
return UserInterface.registerBinding(_faf,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fb0){
this._viewBinding=_fb0;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fb1=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fb2=this._viewBinding.getDefinition().label;
StatusBar.busy(_fb1,[_fb2]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fb3){
ExplorerDeckBinding.superclass.handleAction.call(this,_fb3);
var _fb4=_fb3.target;
switch(_fb3.type){
case PageBinding.ACTION_INITIALIZED:
if(_fb4 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fb4.node.getEntityToken();
this._handle=_fb4.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb5,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb5,arg);
switch(_fb5){
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
var _fb7=null;
if(this._isExplorerDeckBindingInitialized){
_fb7=this._viewBinding.getDefinition().label;
}else{
_fb7=DockTabBinding.LABEL_TABLOADING;
}
return _fb7;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb8=null;
if(this._isExplorerDeckBindingInitialized){
_fb8=this._viewBinding.getDefinition().image;
}else{
_fb8=DockTabBinding.IMG_TABLOADING;
}
return _fb8;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb9=null;
if(this._isExplorerDeckBindingInitialized){
_fb9=this._viewBinding.getDefinition().toolTip;
}
return _fb9;
};
ExplorerDeckBinding.newInstance=function(_fba){
var _fbb=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fba);
return UserInterface.registerBinding(_fbb,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fbc){
switch(_fbc.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fbc.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fbc);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fbd){
this._minButtons.set(_fbd.handle,this._mountMinButton(_fbd));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fbe){
var _fbf=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fbf.setLabel(_fbe.label);
_fbf.setToolTip(_fbe.label);
_fbf.handle=_fbe.handle;
_fbf.node=_fbe.node;
this._minGroup.add(_fbf);
this._minList.add(_fbf);
_fbf.attach();
return _fbf;
};
ExplorerMenuBinding.prototype.handleAction=function(_fc0){
ExplorerMenuBinding.superclass.handleAction.call(this,_fc0);
switch(_fc0.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fc1=_fc0.target;
var _fc2=_fc1.getCheckedButtonBinding();
var _fc3=_fc2.handle;
this._selectedHandle=_fc3;
this._selectedTag=_fc2.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fc0.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fc4,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fc4,arg);
switch(_fc4){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc6){
var _fc7=this._minButtons.get(_fc6);
if(_fc7){
_fc7.check();
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
top.app.bindingMap.menutogglebutton.setImage("${icon:menu}");
};
ExplorerMenuBinding.prototype.expand=function(){
top.app.bindingMap.app.attachClassName("expanded");
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
ExplorerToolBarBinding.newInstance=function(_fc8){
var _fc9=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc8);
return UserInterface.registerBinding(_fc9,ExplorerToolBarBinding);
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
var _fca=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fcb=_fca?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fcb);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fcc,_fcd){
var _fce="ui:explorertoolbarbutton";
var _fcf=DOMUtil.createElementNS(Constants.NS_UI,_fce,_fcc);
var _fd0=UserInterface.registerBinding(_fcf,ExplorerToolBarButtonBinding);
_fd0.explorerToolBarButtonType=_fcd;
return _fd0;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd1,_fd2,type){
type=type?type:"";
var _fd4=FunctionService.GetCustomEditorSettingsByMarkup(_fd1);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fd4){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fd4.Width?(_fd4.Width>dim.w?dim.w:_fd4.Width):undefined;
def.height=_fd4.Height?(_fd4.Height>dim.h?dim.h:_fd4.Height):undefined;
if(_fd4.Url){
_fd4.Url=_fd4.Url.indexOf("?")>-1?_fd4.Url+"&consoleId="+Application.CONSOLE_ID:_fd4.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd2;
def.argument={url:_fd4?_fd4.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd1}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fd7,_fd8){
var _fd9=EditorBinding._components;
var _fda=EditorBinding._editors;
var key=_fd8.key;
var _fdc=Interfaces.isImplemented(IWysiwygEditorComponent,_fd7);
if(!_fdc){
_fdc=Interfaces.isImplemented(ISourceEditorComponent,_fd7);
}
if(_fdc){
if(_fda.has(key)){
_fda.get(key).initializeEditorComponent(_fd7);
}else{
if(!_fd9.has(key)){
_fd9.set(key,new List());
}
_fd9.get(key).add(_fd7);
}
}else{
throw "Editor component interface not implemented: "+_fd7;
}
};
EditorBinding.claimComponents=function(_fdd,_fde){
var _fdf=EditorBinding._components;
var _fe0=EditorBinding._editors;
var key=_fde.key;
_fe0.set(key,_fdd);
var list=null;
if(_fdf.has(key)){
list=_fdf.get(key).copy();
_fdf.del(key);
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
var _fe4=this.getProperty("value");
if(_fe4!=null){
_fe4=decodeURIComponent(_fe4);
this._startContent=_fe4;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fe6=this.bindingWindow.DataManager;
_fe6.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fe8){
var _fe9=EditorBinding.claimComponents(this,_fe8);
if(_fe9!=null){
while(_fe9.hasNext()){
this.initializeEditorComponent(_fe9.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _feb=this.bindingWindow.DataManager;
if(_feb.getDataBinding(name)){
_feb.unRegisterDataBinding(name);
}
_feb.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fec=this.getEditorDocument();
if(_fec!=null){
Application.framework(_fec);
DOMEvents.addEventListener(_fec,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fec,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fec,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fec,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fee){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fee==true){
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
var _ff0=this.getCheckSum();
if(_ff0!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ff0;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff1=null;
if(Binding.exists(this._pageBinding)){
_ff1=this._pageBinding.getCheckSum(this._checksum);
}
return _ff1;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff3=DOMEvents.getTarget(e);
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
if(_ff3.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ff5,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff5,arg);
var _ff7=null;
switch(_ff5){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff8=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff8=false;
}
}
}else{
_ff7=DOMEvents.getTarget(arg);
if(_ff7&&_ff7.ownerDocument==this.getEditorDocument()){
_ff8=false;
}
}
if(_ff8){
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
EditorBinding.prototype._activateEditor=function(_ff9){
if(_ff9!=this._isActivated){
this._isActivated=_ff9;
EditorBinding.isActive=_ff9;
var _ffa=this.getEditorWindow().standardEventHandler;
var _ffb=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ffb!=null){
if(_ff9){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ffb.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ffa.enableNativeKeys(true);
}else{
_ffb.disable();
_ffa.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ffc=this.getEditorDocument().selection.createRange();
_ffc.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ffd=false;
try{
var _ffe=this.getEditorWindow().getSelection();
if(_ffe!=null){
_ffd=_ffe.toString().length>0;
if(!_ffd){
var _fff=_ffe.getRangeAt(0);
var frag=_fff.cloneContents();
var _1001=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1001.appendChild(frag.firstChild);
}
var img=_1001.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ffd=true;
}
}
}
}
}
catch(exception){
}
return _ffd;
};
EditorBinding.prototype.isCommandEnabled=function(_1003){
var _1004=true;
switch(_1003){
case "Cut":
case "Copy":
case "Paste":
_1004=this.getEditorDocument().queryCommandEnabled(_1003);
break;
}
return _1004;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1008=false;
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
_1008=true;
}
break;
}
return _1008;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _100b=this.getContentWindow().bindingMap.toolbar;
var _100c=_100b.getButtonForCommand(cmd);
if(!_100c){
throw "No button for command "+cmd;
}
return _100c;
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
EditorBinding.prototype.handleAction=function(_1010){
EditorBinding.superclass.handleAction.call(this,_1010);
var _1011=_1010.target;
var self=this;
var _1013=this.shadowTree.iframe;
switch(_1010.type){
case Binding.ACTION_DIRTY:
if(_1010.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1014){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1014);
};
EditorBinding.prototype.handleElement=function(_1015){
return true;
};
EditorBinding.prototype.updateElement=function(_1016){
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
var _1019=this._menuGroups[rel];
if(_1019 instanceof List){
_1019.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _101c=this._menuGroups[rel];
if(_101c instanceof List){
_101c.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_101e){
EditorPopupBinding.superclass.handleAction.call(this,_101e);
var _101f=_101e.target;
if(_101e.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_101f.getProperty("cmd");
var gui=_101f.getProperty("gui");
var val=_101f.getProperty("val");
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
var _1023=this.bindingWindow.bindingMap.tinywindow;
var _1024=this.bindingWindow.bindingMap.codepresswindow;
if(_1023){
EditorBinding.registerComponent(this,_1023);
}else{
if(_1024){
EditorBinding.registerComponent(this,_1024);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1025,_1026,_1027,theme){
this._editorBinding=_1025;
this._tinyEngine=_1026;
this._tinyInstance=_1027;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1029,frame,_102b){
this._editorBinding=_1029;
this._codePressFrame=frame;
this._codePressEngine=_102b;
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
var _102e=this._editorBinding;
if(_102e!=null){
var self=this;
var _1030={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_102e.hasBookmark()){
_102e.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_102e.hasBookmark()){
_102e.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1030);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1030);
}
};
EditorClickButtonBinding.newInstance=function(_1032){
var _1033=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1032);
return UserInterface.registerBinding(_1033,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1034){
var _1035=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1034);
return UserInterface.registerBinding(_1035,EditorToolBarButtonBinding);
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
var _1036=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1036);
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
EditorSelectorBinding.prototype.initializeComponent=function(_1037,_1038,_1039,theme){
this._editorBinding=_1037;
this._tinyEngine=_1038;
this._tinyInstance=_1039;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_103b){
EditorSelectorBinding.superclass.handleAction.call(this,_103b);
switch(_103b.type){
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
EditorMenuItemBinding.newInstance=function(_103f){
var _1040=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_103f);
return UserInterface.registerBinding(_1040,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1041){
var i=0,_1043,_1044=[],split=_1041.split(" ");
while((_1043=split[i++])!=null){
if(_1043.length>=3&&_1043.substring(0,3)=="mce"){
continue;
}else{
if(_1043.length>=14&&_1043.substring(0,14)=="compositemedia"){
continue;
}
}
_1044.push(_1043);
}
return _1044.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1046){
var _1047=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1046);
if(soap instanceof SOAPFault){
}else{
_1047=soap.XhtmlFragment;
if(!_1047){
_1047="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1047;
};
VisualEditorBinding.getTinyContent=function(_1049,_104a){
var _104b=null;
if(_1049==null||!_1049.replace(/\s*/gm,"").length){
_1049=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_104a.getSoapTinyContent(_1049);
if(soap instanceof SOAPFault){
var _104d=soap;
var _104e={handleDialogResponse:function(){
_104a.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_104e,_104d);
}else{
_104b=soap.XhtmlFragment;
if(_104b==null){
_104b=new String("");
}
_104b=_104b.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _104b;
};
VisualEditorBinding.isImage=function(_104f){
return _104f&&_104f.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1050){
return VisualEditorBinding.isImage(_1050)&&!VisualEditorBinding.isReservedElement(_1050);
};
VisualEditorBinding.isReservedElement=function(_1051){
if(VisualEditorBinding.isFunctionElement(_1051)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1051)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1051)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1052){
return VisualEditorBinding.isImage(_1052)&&CSSUtil.hasClassName(_1052,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1053){
return VisualEditorBinding.isImage(_1053)&&CSSUtil.hasClassName(_1053,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1054){
return VisualEditorBinding.isImage(_1054)&&CSSUtil.hasClassName(_1054,VisualEditorBinding.HTML_CLASSNAME);
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
var _1055=this.getProperty("embedablefieldstypenames");
if(_1055!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1055);
}
var _1056=this.getProperty("formattingconfiguration");
if(_1056!=null){
this._url+="?config="+_1056;
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
VisualEditorBinding.prototype.handleBroadcast=function(_1057,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1057,arg);
var _1059=this.getContentWindow().bindingMap.tinywindow;
var _105a=_1059.getContentWindow();
switch(_1057){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_105a){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1059);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_105b){
_105b.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _105c=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_105c.replace(/\s*/gm,"").length==0){
_105c=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_105c,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_105d){
VisualEditorBinding.superclass._onPageInitialize.call(this,_105d);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _105f=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_105f=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_105f=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _105f;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1062){
var _1063=_1062;
if(!this._isNormalizedDocument(_1062)){
_1063=this._getHtmlMarkup().replace("${body}",_1062);
}
return _1063;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1064){
var _1065=false;
var doc=XMLParser.parse(_1064,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1065=true;
}
}
if(Client.isWebKit){
if(_1064.indexOf("<html")!==0){
_1065=false;
}
}
return _1065;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _106a=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_106a){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_106a=true;
}
return _106a;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _106c=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_106c);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_106e){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_106e,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1070){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1070,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1073=CSSComputer.getPadding(body);
var _1074=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1074.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_1077){
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
VisualEditorPopupBinding.prototype.configure=function(_1078,_1079,_107a){
var _107b=this.editorBinding.hasSelection();
this.tinyInstance=_1078;
this.tinyEngine=_1079;
this.tinyElement=_107a;
this.hasSelection=_107b;
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
var _107f=false;
if(this.hasSelection){
_107f=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_107f=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_107f=true;
}
}
}
}
if(_107f){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1080=this.getMenuItemForCommand("compositeInsertLink");
var _1081=this.getMenuItemForCommand("unlink");
var _1082=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1083=this.editorBinding.getButtonForCommand("unlink");
_1081.setDisabled(_1083.isDisabled);
if(_1081.isDisabled){
_1080.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1080.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1084=this.editorBinding.embedableFieldConfiguration;
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
if(_1084){
var _1087=_1084.getGroupNames();
if(_1087.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1087.each(function(_108b){
var _108c=_1084.getFieldNames(_108b);
_108c.each(function(_108d){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_108d);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_108b+":"+_108d);
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
var _108f=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1090=null;
var _1091=null;
if(_108f){
if(_108f.nodeName=="TD"){
_1090=_108f.getAttribute("colspan");
_1091=_108f.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1090=="1"&&_1091=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_108f){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1092){
var _1093=VisualEditorFormattingConfiguration._configurations;
if(!_1093.has(_1092)){
_1093.set(_1092,new VisualEditorFormattingConfiguration());
}
return _1093.get(_1092);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1095){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1096){
var _1097=null;
var _1098=VisualEditorFieldGroupConfiguration._configurations;
if(!_1098.has(_1096)){
_1098.set(_1096,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1096)));
}
return _1098.get(_1096);
};
function VisualEditorFieldGroupConfiguration(_1099){
var _109a=new Map();
new List(_1099).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_109a.set(group.GroupName,map);
});
this._groups=_109a;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_109e){
return this._groups.get(_109e).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_109f,_10a0){
return this._groups.get(_109f).get(_10a0).xhtml;
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
var _10a2=this.getDescendantElementsByLocalName("textarea");
while(_10a2.hasNext()){
var _10a3=_10a2.getNext();
if(_10a3.getAttribute("selected")=="true"){
this._startContent=_10a3.value;
this._textareaname=_10a3.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10a5=this.getContentWindow().bindingMap.templatetree;
_10a5.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10a6){
var _10a7=_10a5.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10a7.textareaname);
_10a6.consume();
}});
_10a5.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a8){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a9=this.getContentWindow().bindingMap.toolsplitter;
_10a9.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10aa=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10aa.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10aa);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10ab){
this._textareas=new Map();
while(_10ab.hasNext()){
var _10ac=_10ab.getNext();
var _10ad=_10ac.getAttribute("placeholderid");
this._textareas.set(_10ad,{placeholderid:_10ad,placeholdername:_10ac.getAttribute("placeholdername"),placeholdermarkup:_10ac.value,textareaelement:_10ac,isSelected:_10ac.getAttribute("selected")=="true"});
}
var _10ae=new Map();
this._textareas.each(function(name,_10b0){
var _10b1=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b1.setLabel(_10b0.placeholdername);
_10b1.setImage("${icon:placeholder}");
_10b1.setProperty("placeholder",true);
_10b1.textareaname=name;
_10ae.set(_10b0.placeholdername,_10b1);
if(_10b0.isSelected){
selected=_10b1;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b2=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b2.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b3=this.getContentWindow().bindingMap.templatetree;
var _10b4=_10b3.add(TreeNodeBinding.newInstance(_10b3.bindingDocument));
_10b4.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10b4.setImage("${icon:warning}");
_10b4.attach();
var _10b5=this.getContentWindow().bindingMap.statusbar;
_10b5.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10b7=this._textareas.get(name);
var _10b8=_10b7.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b8));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b9){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b9;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10ba=this.getContentWindow().bindingMap.statusbar;
_10ba.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b9);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10bd=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10bd;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10be=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10be=this._xhtmls.get(this._textareaname);
if(_10be==null){
_10be=VisualEditorBinding.XHTML;
}
}
return _10be;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10c0){
_10c0.textareaelement.value=_10c0.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c1,_10c2,_10c3){
var _10c4=_10c1.getElementsByTagName("div").item(0);
var _10c5=_10c2.getElementsByTagName("div").item(0);
var _10c6=new List(_10c4.getElementsByTagName("textarea"));
var _10c7=new List(_10c5.getElementsByTagName("textarea"));
if(_10c6.getLength()!=_10c7.getLength()){
_10c3=true;
}else{
var index=0;
_10c6.each(function(_10c9,index){
var _10cb=_10c7.get(index);
var newid=_10c9.getAttribute("placeholderid");
var oldid=_10cb.getAttribute("placeholderid");
var _10ce=_10c9.getAttribute("placeholdername");
var _10cf=_10cb.getAttribute("placeholdername");
if(newid!=oldid||_10ce!=_10cf){
_10c3=true;
}
return !_10c3;
});
}
if(_10c3){
var html=null;
if(_10c4.innerHTML!=null){
html=_10c4.innerHTML;
}else{
html=DOMSerializer.serialize(_10c4);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d2){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d2);
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
var _10d5=this.getDescendantBindingByLocalName("selector");
_10d5.attach();
this._populateTemplateSelector();
var _10d6=this.getContentWindow().bindingMap.templateselector;
_10d6.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10d7=this.getDescendantBindingByLocalName("selector");
var _10d8=this.getContentWindow().bindingMap.templateselector;
_10d7.selections.each(function(_10d9){
_10d9.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d8.populateFromList(_10d7.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10da=this.getDescendantBindingByLocalName("selector");
var _10db=this.getContentWindow().bindingMap.templateselector;
_10da.selectByValue(_10db.getValue());
_10da.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10dc){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e1,_10e2){
var _10e3=_10e2;
if(old.has(_10e1)){
_10e3=old.get(_10e1).placeholdermarkup;
}
return _10e3;
}
while(_10dc.hasNext()){
var _10e4=_10dc.getNext();
var _10e5=_10e4.getAttribute("placeholderid");
this._textareas.set(_10e5,{placeholderid:_10e5,placeholdername:_10e4.getAttribute("placeholdername"),placeholdermarkup:compute(_10e5,_10e4.value),textareaelement:_10e4,isSelected:_10e4.getAttribute("selected")=="true"});
}
var _10e6=null;
var _10e7=this.getContentWindow().bindingMap.templatetree;
var _10e8=new Map();
this._textareas.each(function(name,_10ea){
var _10eb=_10e7.add(TreeNodeBinding.newInstance(_10e7.bindingDocument));
_10eb.setLabel(_10ea.placeholdername);
_10eb.setImage("${icon:placeholder}");
_10eb.setProperty("placeholder",true);
_10eb.textareaname=name;
_10e8.set(_10ea.placeholdername,_10eb);
if(_10ea.isSelected){
_10e6=_10eb;
}
});
_10e7.attachRecursive();
if(_10e6!=null){
var _10ec=true;
if(this._oldtextareas.hasEntries()){
_10ec=false;
var map=new Map();
this._textareas.each(function(id,_10ef){
map.set(_10ef.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10ec=true;
}
}
if(_10ec){
var _10f0=this._textareas.get(_10e6.textareaname);
this._textareaname=_10e6.textareaname;
this._placeholdername=_10f0.placeholdername;
this._setContentFromPlaceHolder(_10e6.textareaname);
_10e6.focus();
}else{
var _10f1=_10e8.get(this._placeholdername);
this._textareaname=_10f1.textareaname;
_10f1.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10f4){
var _10f5=null;
if(Client.isWebKit||Client.isExplorer){
_10f5=node.getElementsByTagName(_10f4);
}else{
_10f5=node.getElementsByTagName("ui:"+_10f4);
}
return _10f5;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10f6,_10f7){
var _10f8=this._getElementsByTagName(_10f6,"selector").item(0);
var _10f9=this._getElementsByTagName(_10f7,"selector").item(0);
var _10fa=false;
var _10fb=false;
if(_10f8!=null&&_10f9!=null){
var _10fc=new List(this._getElementsByTagName(_10f8,"selection"));
var _10fd=new List(this._getElementsByTagName(_10f9,"selection"));
if(_10fc.getLength()!=_10fd.getLength()){
_10fa=true;
_10fb=true;
}else{
_10fc.each(function(_10fe,index){
var _1100=_10fe.getAttribute("value");
var _1101=_10fd.get(index).getAttribute("value");
if(_1100!=_1101){
_10fa=true;
}
return !_10fa;
});
_10fc.each(function(_1102,index){
var _1104=_1102.getAttribute("selected");
var _1105=_10fd.get(index).getAttribute("selected");
if(_1104!=_1105){
_10fb=true;
}
return !_10fb;
});
}
}
if(_10fa){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f8);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_10fb){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10f6,_10f7,_10fb);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_1107){
var _1108=null;
if(_1107==undefined){
_1107=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_110a){
if(_110a.PlaceholderId==_1107){
_1108=_110a.ClientRectangle.Width;
return false;
}
});
}
return _1108;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _110c=this._pageId;
var _110d=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_110c,_110d,function(_110f){
self._templatePreview=_110f;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1110){
var _1111=this._pageId;
var _1112=this._textareaname;
var _1113=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1110,_1111,_1113,_1112,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1115){
var _1116=this._pageId;
var _1117=this._textareaname;
var _1118=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1115,_1116,_1118,_1117,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_111a,frame,_111c){
this._editorBinding=_111a;
this._codePressFrame=frame;
this._codePressEngine=_111c;
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
var _1122=this.getProperty("validate");
if(_1122==true){
this._hasStrictValidation=true;
}
var _1123=this.getProperty("strictsave");
if(_1123===false){
this._strictSave=false;
}
var _1124=this.getProperty("validator");
if(_1124!=null){
this._validator=_1124;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1125,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1125,arg);
switch(_1125){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1127=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1127!=null){
var _1128=_1127.getContentWindow();
if(arg.broadcastWindow==_1128){
this._codemirrorWindow=_1128;
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
this.initializeEditorComponents(_1127);
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
this.unsubscribe(_1125);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_112c){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_112c);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_112d){
if(_112d!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_112d;
EditorBinding.isActive=_112d;
var _112e=this._codemirrorWindow.standardEventHandler;
if(_112d){
_112e.enableNativeKeys(true);
}else{
_112e.disableNativeKeys();
}
var _112f=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_112f!=null){
if(_112d){
_112f.enable();
}else{
_112f.disable();
}
}
if(_112d){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1133=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1133;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1134){
_1134.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_1136){
if(!this._isFinalized){
if(_1136!=this._startContent){
this._startContent=_1136;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1136);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1137=this.getContentWindow().bindingMap.editorpage.getContent();
return _1137?_1137:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1138){
if(this._pageBinding!=null){
this._pageBinding.cover(_1138);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1139){
if(_1139!=null&&this.shadowTree.dotnetinput!=null){
var value=_1139.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _113b=true;
var _113c=this.getContent();
if(this._validator!=null){
_113b=Validator.validateInformed(_113c,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _113d=_113c.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_113d!=_113c){
_113c=_113d;
this.setContent(_113d);
}
_113b=XMLParser.isWellFormedDocument(_113c,true,!this._strictSave);
if(_113b==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_113b=this._isValidHTML(_113c);
break;
}
}
break;
}
}
return _113b;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _113f=true;
var doc=XMLParser.parse(xml);
var _1141=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1141.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1141.add("NamespaceURI");
}
var head=null,body=null;
var _1145=new List(root.childNodes);
while(_1145.hasNext()){
var child=_1145.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1141.add("MultipleHead");
}
if(body!=null){
_1141.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1141.add("MultipleBody");
}
body=child;
break;
default:
_1141.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1141.add("MissingHead");
}
if(body==null){
_1141.add("MissingBody");
}
}
if(_1141.hasEntries()){
_113f=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1141.getFirst()));
}
return _113f;
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
var _1147=null;
var page=this._pageBinding;
if(page!=null){
_1147=page.getCheckSum();
}
return _1147;
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
ThrobberBinding.prototype.handleBroadcast=function(_1149,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1149,arg);
switch(_1149){
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
ProgressBarBinding.notch=function(_114c){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_114c);
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
ProgressBarBinding.prototype.notch=function(_114e){
_114e=_114e?_114e:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_114e);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1150,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1150,arg);
switch(_1150){
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
StartMenuItemBinding.prototype.setChecked=function(_1152,_1153){
StartMenuItemBinding.superclass.setChecked.call(this,_1152,_1153);
if(!_1153){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1154){
var _1155=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1154);
UserInterface.registerBinding(_1155,StartMenuItemBinding);
return UserInterface.getBinding(_1155);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1158,_1159){
var _115a=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1159,true)==true){
if(_1158!="*"){
_1158=KeySetBinding._sanitizeKeyModifiers(_1158);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_115a[doc]){
_115a[doc]={};
}
if(!_115a[doc][code]){
_115a[doc][code]={};
}
_115a[doc][code][_1158]=_1159;
}
};
KeySetBinding.handleKey=function(doc,e){
var _115e=false;
var code=e.keyCode;
var _1160=KeySetBinding.keyEventHandlers;
if(_1160[doc]&&_1160[doc][code]){
var _1161="[default]";
_1161+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1161+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1161+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1161+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1162=_1160[doc][code][_1161];
if(_1162==null){
_1162=_1160[doc][code]["*"];
}
if(_1162!=null){
_1162.handleKeyEvent(e);
_115e=true;
}
}
return _115e;
};
KeySetBinding._sanitizeKeyModifiers=function(_1163){
var _1164="[default]";
var mods={};
if(_1163){
new List(_1163.split(" ")).each(function(_1166){
mods[_1166]=true;
});
function check(_1167){
if(mods[_1167]){
_1164+=" "+_1167;
}
}
check("shift");
check("control");
}
return _1164;
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
var _116b=key.getAttribute("oncommand");
var _116c=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_116c){
DOMEvents.preventDefault(e);
}
var _116e=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_116b,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_116f){
if(_116f instanceof CursorBinding){
_116f.setOpacity(0);
_116f.show();
new Animation({modifier:9,onstep:function(_1170){
_116f.setOpacity(Math.sin(_1170*Math.PI/180));
},onstop:function(){
_116f.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1171){
if(_1171 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1172){
_1171.setOpacity(Math.cos(_1172*Math.PI/180));
},onstop:function(){
_1171.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1173,_1174,_1175){
if(_1173 instanceof CursorBinding){
_1175.x-=16;
_1175.y-=16;
new Animation({modifier:3,onstep:function(_1176){
var tal=Math.sin(_1176*Math.PI/180);
_1173.setPosition(new Point(((1-tal)*_1174.x)+((0+tal)*_1175.x),((1-tal)*_1174.y)+((0+tal)*_1175.y)));
},onstop:function(){
CursorBinding.fadeOut(_1173);
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
CursorBinding.prototype.setOpacity=function(_117c){
this.bindingElement.style.opacity=new String(_117c);
this._opacity=_117c;
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
function setOpacity(_117f){
cover.bindingElement.style.opacity=new String(_117f);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1180){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1180*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1182){
cover.bindingElement.style.MozOpacity=new String(_1182);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1183){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1183*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1185){
if(_1185!=this._isBusy){
if(_1185){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1185;
}
};
CoverBinding.prototype.setTransparent=function(_1186){
if(_1186!=this._isTransparent){
if(_1186){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1186;
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
CoverBinding.prototype.setHeight=function(_1188){
if(_1188>=0){
this.bindingElement.style.height=new String(_1188+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1189){
var _118a=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1189);
return UserInterface.registerBinding(_118a,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _118c=UncoverBinding._bindingInstance;
if(Binding.exists(_118c)){
_118c.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1190){
this._isFading=_1190==true;
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
var _1191=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1191.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1191.clearRect(0,0,300,150);
_1191.fillRect(0,0,300,150);
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
var _1193=this._canvas.getContext("2d");
_1193.clearRect(0,0,300,150);
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
var _1194=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1194);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1195=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1195){
this._startcontent=_1195.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1196){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1196);
switch(_1196.type){
case WindowBinding.ACTION_ONLOAD:
if(_1196.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1196.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1196);
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
var _119a=this._transformer.transformToString(doc);
this._inject(_119a);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_119d){
this.getContentDocument().body.innerHTML=_119d;
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
var _11a5=list.getNext();
var id=_11a5.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11a5);
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
var _11af=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11af.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11af.appendChild(att);
}
elm.appendChild(_11af);
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
var _11b9=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11b9){
doc=XMLParser.parse(_11b9);
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
var _11bd=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11bd;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11be,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11be,arg);
switch(_11be){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11c0){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11c0);
switch(_11c0.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11c0.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11c2=new List();
list.each(function(lang){
_11c2.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11c2);
}else{
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11c6=this.getDescendantBindingByLocalName("menugroup");
_11c6.detachRecursive();
_11c6.bindingElement.innerHTML="";
if(list.hasEntries()){
var _11c7=null;
while(list.hasNext()){
var _11c8=list.getNext();
if(_11c8.isSelected){
this.setLabel(_11c8.label);
}
var _11c9=MenuItemBinding.newInstance(this.bindingDocument);
_11c9.imageProfile=_11c8.imageProfile;
_11c9.setLabel(_11c8.label);
if(_11c8.tooltip!=null){
_11c9.setToolTip(_11c8.tooltip);
}
_11c9.selectionValue=_11c8.value;
_11c6.add(_11c9);
_11c9.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11cc){
switch(_11cc){
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
var _11cf=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11cf,root);
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
var _11d0=this.getProperty("status");
if(_11d0!=null){
switch(_11d0){
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
UserInterfaceMapping.prototype.merge=function(_11d4){
for(var _11d5 in _11d4.map){
this.map[_11d5]=_11d4.getBindingImplementation(_11d5);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11d6){
var _11d7=null;
var name=_11d6.nodeName.toLowerCase();
if(this.map[name]){
_11d7=this.map[name];
}
return _11d7;
};
var UserInterface=new function(){
var _11d9=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11da=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11d9,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11db=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11dd,impl){
var _11df=null;
if(!this.hasBinding(_11dd)){
var _11e0=DOMUtil.getParentWindow(_11dd);
if(DOMUtil.getLocalName(_11dd)!="bindingmapping"){
if(!impl&&_11dd.getAttribute("binding")!=null){
var _11e1=_11dd.getAttribute("binding");
impl=_11e0[_11e1];
if(impl==null){
throw "No such binding in scope: "+_11e1;
}
}
if(!impl){
var _11e2=_11e0.DocumentManager;
if(_11e2){
var _11e3=_11e2.customUserInterfaceMapping;
if(_11e3){
impl=_11e3.getBindingImplementation(_11dd);
}
}
}
if(!impl){
impl=_11da.getBindingImplementation(_11dd);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11df=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11df){
var key=KeyMaster.getUniqueKey();
_11dd.setAttribute("key",key);
_11df.key=key;
if(!_11dd.id){
_11dd.id=key;
}
keys[key]={element:_11dd,binding:_11df};
_11df.onBindingRegister();
}
}
}
return _11df;
};
this.unRegisterBinding=function(_11e5){
terminate(_11e5);
};
function terminate(_11e6){
if(Binding.exists(_11e6)==true){
var key=_11e6.key;
Binding.destroy(_11e6);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11e6=null;
}else{
_11db.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11e8){
var _11e9=null;
if(keys[_11e8.key]){
_11e9=keys[_11e8.key].element;
}
return _11e9;
};
this.getBinding=function(_11ea){
var _11eb=null;
if(_11ea&&_11ea.nodeType==Node.ELEMENT_NODE){
try{
var key=_11ea.getAttribute("key");
if(key&&keys[key]){
_11eb=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11ea);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11eb;
};
this.getBindingByKey=function(key){
var _11ee=null;
if(keys[key]){
_11ee=keys[key].binding;
}
return _11ee;
};
this.hasBinding=function(_11ef){
return this.getBinding(_11ef)!=null;
};
this.isBindingVisible=function(_11f0){
var _11f1=Application.isOperational;
if(_11f1==true){
var _11f2=new Crawler();
_11f2.type=NodeCrawler.TYPE_ASCENDING;
_11f2.id="visibilitycrawler";
_11f2.addFilter(function(_11f3){
var b=UserInterface.getBinding(_11f3);
var res=0;
if(!b.isVisible){
_11f1=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11f2.crawl(_11f0.bindingElement);
_11f2.dispose();
}
return _11f1;
};
var _11f6=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11f6={};
for(var key in keys){
_11f6[key]=true;
}
};
this.getPoint=function(){
var _11fa=null;
if(_11f6){
_11fa=new List();
for(var key in keys){
if(!_11f6[key]){
_11fa.add(key);
}
}
}
return _11fa;
};
this.clearPoint=function(){
_11f6=null;
};
this.trackUndisposedBindings=function(){
var _11fc=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11fc){
_11fc="Bindings illdisposed: ";
}
_11fc+=entry.binding+" ";
}
}
if(_11fc!=null){
_11db.error(_11fc);
}
};
this.autoTrackDisposedBindings=function(_11ff){
if(_11ff){
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
SOAPRequest.newInstance=function(_1200,_1201){
var _1202=_1200+"/"+_1201;
var _1203=new SOAPRequest(_1202);
var _1204=SOAPRequest.resolver;
_1203.document=Templates.getTemplateDocument("soapenvelope.xml");
_1203.envelope=_1204.resolve("soap:Envelope",_1203.document);
_1203.header=_1204.resolve("soap:Header",_1203.envelope);
_1203.body=_1204.resolve("soap:Body",_1203.envelope);
return _1203;
};
SOAPRequest._parseResponse=function(_1205){
var _1206=null;
var _1207=false;
var doc=_1205.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1206=SOAPRequestResponse.newInstance(_1205.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1205.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1207=true;
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
var text=_1205.responseText;
if(_1205.status==503||text.indexOf("id=\"offline\"")>-1){
_1207=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1205.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1205.responseText);
}
}
}
}
if(_1207==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1206;
};
function SOAPRequest(_120c){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_120c;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _120e=DOMUtil.getXMLHTTPRequest();
var _120f=null;
_120e.open("post",url,false);
_120e.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_120e.setRequestHeader("SOAPAction",this.action);
try{
_120e.send(this.document);
_120f=SOAPRequest._parseResponse(_120e);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_120e=null;
return _120f;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1212){
var _1213=DOMUtil.getXMLHTTPRequest();
_1213.open("post",url,true);
_1213.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1213.setRequestHeader("SOAPAction",this.action);
_1213.onreadystatechange=function(){
if(_1213.readyState==4){
var _1214=SOAPRequest._parseResponse(_1213);
_1212(_1214);
_1213=null;
}
};
_1213.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1215 in this){
this[_1215]=null;
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
var _1217=null;
if(doc&&doc.documentElement){
_1217=new SOAPRequestResponse();
var _1218=SOAPRequestResponse.resolver;
_1217.document=doc;
_1217.envelope=_1218.resolve("soap:Envelope",_1217.document);
_1217.header=_1218.resolve("soap:Header",_1217.envelope);
_1217.body=_1218.resolve("soap:Body",_1217.envelope);
var fault=_1218.resolve("soap:Fault",_1217.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1217.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1218.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1218.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1217;
};
function SOAPFault(_121a,_121b,_121c){
this._operationName=_121a;
this._operationAddress=_121b;
this._faultString=_121c;
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
SOAPFault.newInstance=function(_121d,fault){
return new SOAPFault(_121d.name,_121d.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1220){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1220;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1222=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1222.body,this._operation);
var _1224=this._wsdl.getSchema();
var _1225=_1224.lookup(this._operation);
var _1226=_1225.getListedDefinitions();
while(_1226.hasNext()){
var def=_1226.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1222;
};
SOAPEncoder.prototype._resolve=function(_122a,_122b,value){
var _122d=this._wsdl.getSchema();
if(_122b.isSimpleValue){
this._appendText(_122a,value,_122b.type=="string");
}else{
var _122e=_122d.lookup(_122b.type);
if(_122e instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_122e.getListedDefinitions();
if(_122e.isArray){
var _1230=new List(value);
var def=defs.getNext();
while(_1230.hasNext()){
var elm=this._appendElement(_122a,def.name);
var val=_1230.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_122a,def.name);
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
SOAPEncoder.prototype._appendText=function(_1237,value,_1239){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _123c=false;
var i=0,c;
while(c=chars[i++]){
var _123f=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_123f=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_123f=false;
}
break;
}
if(!_123f){
safe+=c;
}else{
_123c=true;
}
}
if(_123c){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1237.appendChild(_1237.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1242){
this._wsdl=wsdl;
this._operation=_1242;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1247){
var _1248=null;
var _1249=this._wsdl.getSchema();
var id=this._operation+"Response";
var _124b=this.resolve(id,_1247.body);
var _124c=_1249.lookup(id);
var _124d=_124c.getListedDefinitions();
while(!_1248&&_124d.hasNext()){
var def=_124d.getNext();
var elm=this.resolve(def.name,_124b);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1248=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1248.appendChild(_1248.importNode(e,true));
}else{
_1248=this._compute(elm,def);
}
}
return _1248;
};
SOAPDecoder.prototype._compute=function(_1251,_1252){
var _1253=null;
var _1254=this._wsdl.getSchema();
if(_1252.isSimpleValue){
_1253=this._getSimpleValue(_1251,_1252.type);
}else{
var _1255=_1254.lookup(_1252.type);
if(_1255 instanceof SchemaSimpleType){
_1253=this._getSimpleValue(_1251,_1255.restrictionType);
}else{
var defs=_1255.getListedDefinitions();
if(_1255.isArray){
_1253=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1251);
while(elms.hasNext()){
var elm=elms.getNext();
_1253.push(this._compute(elm,def));
}
}else{
if(_1251==null){
_1253=null;
}else{
_1253={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1251);
if(elm){
_1253[def.name]=this._compute(elm,def);
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
return _1253;
};
SOAPDecoder.prototype._getSimpleValue=function(_125a,type){
var _125c=null;
if(_125a!=null&&_125a.firstChild&&_125a.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_125a.childNodes.length>1){
_125a.normalize();
}
_125c=_125a.firstChild.data;
switch(type){
case Schema.types.STRING:
_125c=_125c;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_125c=Number(_125c);
break;
case Schema.types.BOOLEAN:
_125c=_125c=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _125c;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_125d){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_125d);
}
Schema.prototype._parseSchema=function(_125e){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _125f={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_125e);
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
_125f[rule.getAttribute("name")]=entry;
}
return _125f;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1264){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1264);
}
SchemaDefinition.prototype._parse=function(_1265){
var min=_1265.getAttribute("minOccurs");
var max=_1265.getAttribute("maxOccurs");
var type=_1265.getAttribute("type");
this.name=_1265.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _126b=split[1];
this.isSimpleValue=sort!="tns";
this.type=_126b;
}else{
var elm=_1265.getElementsByTagName("*").item(0);
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
function SchemaElementType(_126d,_126e){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_126d,_126e);
}
SchemaElementType.prototype._parseListedDefinitions=function(_126f,_1270){
var els=_126f.resolveAll("s:complexType/s:sequence/s:element",_1270);
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
function SchemaComplexType(_1272,_1273){
this._definitions=new List();
this._parseListedDefinitions(_1272,_1273);
this.isArray=_1273.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1274,_1275){
var els=_1274.resolveAll("s:sequence/s:element",_1275);
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
function SchemaSimpleType(_1278,_1279){
this.restrictionType=null;
this._parse(_1278,_1279);
}
SchemaSimpleType.prototype._parse=function(_127a,_127b){
var _127c=_127a.resolve("s:restriction",_127b);
if(_127c){
this.restrictionType=_127c.getAttribute("base").split(":")[1];
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
var _127f=null;
var _1280=DOMUtil.getXMLHTTPRequest();
_1280.open("get",url,false);
_1280.send(null);
if(_1280.responseXML){
_127f=_1280.responseXML.documentElement;
}else{
alert(_1280.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _127f;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1281=new List();
var _1282=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1282.hasEntries()){
while(_1282.hasNext()){
var _1283=_1282.getNext();
var name=_1283.getAttribute("name");
_1281.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1281;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1286,_1287,_1288){
this.name=name;
this.address=_1286;
this.encoder=_1287;
this.decoder=_1288;
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
var _128c=wsdl.getOperations();
_128c.each(function(_128d){
proxy[_128d.name]=WebServiceProxy.createProxyOperation(_128d);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_128e,_128f){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_128f){
var log=_128f instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_128e.address+": "+_128e.name+"\n\n";
log+=DOMSerializer.serialize(_128f.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1291){
return function(){
var _1292=new List(arguments);
var _1293=null;
if(typeof (_1292.getLast())=="function"){
var _1294=_1292.extractLast();
var _1295=_1291.encoder.encode(_1292);
this._log(_1291,_1295);
var self=this;
var _1297=_1295.asyncInvoke(_1291.address,function(_1298){
self._log(_1291,_1298);
if(_1298){
if(_1298.fault){
_1293=SOAPFault.newInstance(_1291,_1298.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1293,_1295,_1298);
}
}else{
if(WebServiceProxy.isDOMResult){
_1293=_1298.document;
}else{
_1293=_1291.decoder.decode(_1298);
}
}
}
_1295.dispose();
_1294(_1293);
});
}else{
var _1295=_1291.encoder.encode(new List(arguments));
this._log(_1291,_1295);
var _1297=_1295.invoke(_1291.address);
this._log(_1291,_1297);
if(_1297){
if(_1297.fault){
_1293=SOAPFault.newInstance(_1291,_1297.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1293,_1295,_1297);
}
}else{
if(WebServiceProxy.isDOMResult){
_1293=_1297.document;
}else{
_1293=_1291.decoder.decode(_1297);
}
}
}
_1295.dispose();
return _1293;
}
};
};
WebServiceProxy.handleFault=function(_1299,_129a,_129b){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1299,soapRequest:_129a,soapResponse:_129b});
}
catch(exception){
alert(_1299.getFaultString());
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
var _129c=SystemLogger.getLogger("MessageQueue");
var _129d=null;
var _129e=0;
var _129f=null;
var _12a0=new Map();
var _12a1=new Map();
var _12a2=false;
var _12a3=false;
var _12a4=false;
var _12a5=false;
var _12a6={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_129d=ConsoleMessageQueueService;
_129e=_129d.GetCurrentSequenceNumber("dummyparam!");
this.index=_129e;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12a2){
if(!MessageQueue._actions.hasEntries()){
var _12a7=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12a3=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12a7;
_12a3=false;
}
}
}
};
this._pokeserver=function(){
if(_12a2==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12a8){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12a3);
this._updateMessages(_12a8);
}
};
this._updateMessages=function(_12a9){
if(_12a4){
_12a5=true;
}else{
_12a4=true;
var self=this;
var _12ab=function(_12ac){
if(_12ac!=null){
if(Types.isDefined(_12ac.CurrentSequenceNumber)){
var _12ad=_12ac.CurrentSequenceNumber;
if(_12ad<self.index){
_129c.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12ad);
}
self.index=_12ad;
var _12ae=new List(_12ac.ConsoleActions);
if(_12ae.hasEntries()){
self.evaluate(_12ae);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_129c.error("No sequencenumber in MessageQueue response!");
}
}
_12a4=false;
if(_12a5){
_12a5=false;
self._updateMessages();
}
};
if(_12a9){
_12ab(_129d.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_129d.GetMessages(Application.CONSOLE_ID,this.index,_12ab);
}
}
};
this.evaluate=function(_12af){
var _12b0=new List();
if(_12af.hasEntries()){
_12af.each(function(_12b1){
if(this._index[_12b1.Id]!=true){
_12b0.add(_12b1);
}
this._index[_12b1.Id]=true;
},this);
if(_12b0.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12b0);
}else{
this._actions=_12b0;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12b2){
var _12b3="(No reason)";
if(_12b2!=null){
_12b3=_12b2.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12b3);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12b7){
if(_12b7==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12b8=null;
if(this._actions.hasEntries()){
var _12b9=this._actions.extractFirst();
_129e=_12b9.SequenceNumber;
_129c.debug("MessageQueue action: "+_12b9.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_129e+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12b9.ActionType){
case "OpenView":
_12b8=_12b9.OpenViewParams;
if(_12b8.ViewType=="ModalDialog"){
openDialogView(_12b8);
}else{
_129f=_12b8.ViewId;
openView(_12b8);
}
break;
case "CloseView":
_12b8=_12b9.CloseViewParams;
_129f=_12b8.ViewId;
closeView(_12b8);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12b9.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12a0.countEntries()+"\n";
_12a0.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_129c.debug(debug);
if(!_12a0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12bc=_12b9.SelectElementParams.PerspectiveElementKey;
if(_12bc){
var _12bd={handleBroadcast:function(_12be,arg){
switch(_12be){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12bc){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b9.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12bd);
StageBinding.selectPerspective(_12b9.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b9.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12b9.MessageBoxParams);
break;
case "OpenViewDefinition":
_12b8=_12b9.OpenViewDefinitionParams;
_129f=_12b8.Handle;
openViewDefinition(_12b8);
break;
case "LogEntry":
logEntry(_12b9.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12b8=_12b9.BroadcastMessageParams;
_129c.debug("Server says: EventBroadcaster.broadcast ( \""+_12b8.Name+"\", "+_12b8.Value+" )");
EventBroadcaster.broadcast(_12b8.Name,_12b8.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12a0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12b9.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12b9.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12b9.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12b8=_12b9.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12b8.ViewId,entityToken:_12b8.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12b8=_12b9.OpenGenericViewParams;
openGenericView(_12b8);
break;
case "OpenExternalView":
_12b8=_12b9.OpenExternalViewParams;
openExternalView(_12b8);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12b9.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12a3);
}
function logEntry(_12c0){
var _12c1=_12c0.Level.toLowerCase();
SystemLogger.getLogger(_12c0.SenderId)[_12c1](_12c0.Message);
}
function openView(_12c2){
var list=paramsToList(_12c2.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12c2.ViewId);
def.entityToken=_12c2.EntityToken;
def.flowHandle=_12c2.FlowHandle;
def.position=_12a6[_12c2.ViewType],def.label=_12c2.Label;
def.image=_12c2.Image;
def.toolTip=_12c2.ToolTip;
def.argument={"url":_12c2.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12c2.ViewId,entityToken:_12c2.EntityToken,flowHandle:_12c2.FlowHandle,position:_12a6[_12c2.ViewType],url:_12c2.Url,label:_12c2.Label,image:_12c2.Image,toolTip:_12c2.ToolTip}));
}
}
function openDialogView(_12c5){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12c5.ViewId,flowHandle:_12c5.FlowHandle,position:Dialog.MODAL,url:_12c5.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12c6){
var _12c7=_12c6.DialogType.toLowerCase();
if(_12c7=="question"){
throw "Not supported!";
}else{
Dialog[_12c7](_12c6.Title,_12c6.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12c8){
var map={};
var _12ca=false;
new List(_12c8.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12ca=true;
});
var proto=ViewDefinitions[_12c8.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12c8.ViewId;
}
def.argument=_12ca?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12cf){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12cf.ViewId);
def.label=_12cf.Label;
def.toolTip=_12cf.ToolTip;
def.image=_12cf.Image;
def.argument={"url":_12cf.Url,"list":paramsToList(_12cf.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12d1){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12d1.ViewId);
def.label=_12d1.Label;
def.toolTip=_12d1.ToolTip;
def.image=_12d1.Image;
def.url=_12d1.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12d3){
if(StageBinding.isViewOpen(_12d3.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12d3.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12d4){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12d4.ViewId,isSuccess:_12d4.Succeeded});
}
this._lockSystem=function(_12d5){
var _12d6=top.bindingMap.offlinetheatre;
if(_12d5){
_12d6.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12d6.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a2=_12d5;
};
this.placeConsoleCommand=function(_12d8){
_129d.PlaceConsoleCommand(Application.CONSOLE_ID,_12d8);
};
this.handleBroadcast=function(_12d9,arg){
switch(_12d9){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_129f!=null&&arg==_129f){
_129f=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12a0.set(arg,true);
}else{
_129c.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12a0.hasEntries()){
_12a0.del(arg);
_129c.debug("Refreshed tree: "+arg+"\n("+_12a0.countEntries()+" trees left!)");
if(!_12a0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12a1.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12a1.hasEntries()==true){
_12a1.del(arg);
if(!_12a1.hasEntries()){
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
function paramsToList(_12db){
var list=new List();
new List(_12db).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12de=false;
var _12df=null;
var _12e0=false;
var _12e1=Client.qualifies();
var _12e2="admin";
var _12e3="123456";
if(!_12e1){
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
this.handleBroadcast=function(_12e4){
switch(_12e4){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12e4);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12e5=bindingMap.decks.getSelectedDeckBinding();
if(_12e5!=null){
switch(_12e5.getID()){
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
var _12e6=window.bindingMap.appwindow;
_12e6.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12e7=window.location.hash.replace(/^#/,"");
if(_12e7){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12e7);
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
function fileEventBroadcasterSubscriptions(_12e8){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12e9){
if(_12e8){
EventBroadcaster.subscribe(_12e9,KickStart);
}else{
EventBroadcaster.unsubscribe(_12e9,KickStart);
}
});
}
function kickStart(_12ea){
switch(_12ea){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12de=true;
break;
}
if(_12de){
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
DataManager.getDataBinding("username").setValue(_12e2);
DataManager.getDataBinding("password").setValue(_12e3);
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
var _12ed=DataManager.getDataBinding("username").getResult();
var _12ee=DataManager.getDataBinding("passwordold").getResult();
var _12ef=DataManager.getDataBinding("passwordnew").getResult();
var _12f0=DataManager.getDataBinding("passwordnew2").getResult();
if(_12ef==_12f0){
var _12f1=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f2=LoginService.ChangePassword(_12ed,_12ee,_12ef);
if(_12f2 instanceof SOAPFault){
alert(_12f2.getFaultString());
}else{
if(_12f2.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12f2);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12f1){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12f3){
_12f3=new List(_12f3);
var _12f4=document.getElementById("passworderror");
_12f4.innerHTML="";
_12f3.each(function(error){
var _12f6=document.createElement("div");
_12f6.textContent=error;
_12f6.className="errortext";
_12f4.appendChild(_12f6);
});
_12f4.style.display="block";
var _12f7={handleAction:function(_12f8){
document.getElementById("passworderror").style.display="none";
_12f8.target.removeActionListener(Binding.ACTION_DIRTY,_12f7);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12f7);
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
this.doLogin=function(_12f9,_12fa){
var _12fb=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12fc=false;
var _12fd=false;
var _12fe=LoginService.ValidateAndLogin(_12f9,_12fa);
if(_12fe instanceof SOAPFault){
alert(_12fe.getFaultString());
}else{
if(_12fe=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_12fe=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_12fe=="passwordUpdateRequired"){
_12fd=true;
}
if(_12fe=="success"){
_12fc=true;
}
}
if(_12fd){
changePasswordRequired();
}else{
if(_12fc){
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
if(_12fb){
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
var _12ff=document.getElementById("passwordexpired");
_12ff.firstChild.data=_12ff.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1300=DataManager.getDataBinding("username");
var _1301=DataManager.getDataBinding("password");
_1300.blur();
_1301.blur();
_1300.setValue("");
_1301.setValue("");
_1300.clean();
_1301.clean();
_1300.focus();
document.getElementById("loginerror").style.display="block";
var _1302={handleAction:function(_1303){
document.getElementById("loginerror").style.display="none";
_1303.target.removeActionListener(Binding.ACTION_DIRTY,_1302);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1302);
}
WindowManager.fireOnLoad(this);
if(!_12e1){
UpdateManager.isEnabled=false;
}
};

