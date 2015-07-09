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
};
this.getChildNodesBySearchToken=function(node,_217){
return this.getChildNodes(node,_217);
};
this.getNamedRoots=function(key,_219){
var _21a=new List();
var _21b=null;
if(_219){
if(SearchTokens.hasToken(_219)){
_219=SearchTokens.getToken(_219);
}
_21b=TreeService.GetNamedRootsBySearchToken(key,_219);
}else{
_21b=TreeService.GetNamedRoots(key);
}
new List(_21b).each(function(_21c){
var node=new SystemNode(_21c);
if(_219){
node.searchToken=_219;
}
_21a.add(node);
});
return _21a;
};
this.getNamedRootsBySearchToken=function(key,_21f){
return this.getNamedRoots(key,_21f);
};
function compileActionList(node,_221,_222){
var _223=_221.ClientElementActionGroupId;
if(_223!=null){
var _224=_222.get(_223).ClientElementActionGroupItems;
if(_224&&_224.length>0){
node.setActionList(new List(_224));
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
new List(self._data.Actions).each(function(_22a){
var _22b=_22a.ActionCategory.Name;
if(SystemAction.hasCategory(_22b)){
var _22c=new SystemAction(_22a);
SystemAction.actionMap.set(_22a.ActionKey,_22c);
}else{
throw "No such action category: "+_22b;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _22d=null;
if(this.searchToken){
_22d=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_22d=System.getChildNodes(this);
}
return _22d;
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
var _22f=this._data.Piggybag;
if(_22f==null){
_22f="";
}
return _22f;
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
var _231=null;
if(typeof this._data.ToolTip!="undefined"){
_231=this._data.ToolTip;
}
return _231;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_233){
map[_233.Key]=_233.Value;
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
var _237=SystemAction.actionMap.get(key);
var _238=true;
if(_237.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_238=false;
}
}
if(_238){
var id=_237.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_237);
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
SystemAction.invoke=function(_23b,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_23b.logger.debug("Execute \""+_23b.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_23b.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_23e,_23f){
action=SystemAction.taggedActions.get(_23e);
node=SystemNode.taggedNodes.get(_23f);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_240){
return SystemAction.categories[_240]?true:false;
};
function SystemAction(_241){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_241;
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
var _242=null;
if(this.isInFolder()){
_242=this._data.ActionCategory.FolderName;
}
return _242;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _243=null;
if(typeof this._data.TagValue!="undefined"){
_243=this._data.TagValue;
}
return _243;
};
SystemAction.prototype.isChecked=function(){
var _244=null;
if(this.isCheckBox()){
_244=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _244;
};
function _UpdateManager(){
var _245=null;
if(!window.UpdateManager){
this._construct();
_245=this;
}
return _245;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_246){
var root=document.documentElement;
var _248=root.namespaceURI;
if(_248==null){
_248=new String(root.getAttribute("xmlns"));
}
if(_248=="http://www.w3.org/1999/xhtml"){
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
var _249=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_249);
}else{
throw new TypeError();
}
}else{
var _24a=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_24a.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _24c=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_24c=true;
}
},this);
return _24c;
},_setupForm:function(form){
var _24f=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_24f.isEnabled){
_24f._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_250,type){
if(_250.addEventListener!=null){
_250.addEventListener(type,this,false);
}else{
var _252=this;
_250.attachEvent("on"+type,function(){
_252.handleEvent(window.event);
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
var _257=UpdateAssistant.getUpdateZones(dom);
var _258=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_257.forEach(function(_259,_25a){
var _25b=_258[_25a];
this._crawl(_259,_25b);
},this);
this._updates.forEach(function(_25c,_25d){
_25c.update();
_25c.dispose();
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
},_crawl:function(_25f,_260,_261,id){
var _263=true;
var _264=_260.getAttribute("class");
if(_264==null||_264.indexOf(this.CLASSNAME_GONE)==-1){
if(_260.nodeType==Node.ELEMENT_NODE){
var _265=_260.getAttribute("id");
if(_265!=null){
_261=_25f;
id=_265;
}
}
if(_263=this._check(_25f,_260,_261,id)){
var _266=_25f.firstChild;
var _267=_260.firstChild;
while(_266!=null&&_267!=null&&!this._replaced[id]){
switch(_266.nodeType){
case Node.TEXT_NODE:
_263=this._check(_266,_267,_261,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_263=this._crawl(_266,_267,_261,id);
break;
}
if(this._replaced[id]){
_263=false;
}else{
_266=_266.nextSibling;
_267=_267.nextSibling;
}
}
}
}
return _263;
},_check:function(_268,_269,_26a,id){
var _26c=true;
var _26d=null;
var _26e=false;
var _26f=false;
if((_268!=null&&_269==null)||(_268==null&&_269!=null)){
_26c=false;
}else{
if(_26c=_268.nodeType==_269.nodeType){
switch(_269.nodeType){
case Node.ELEMENT_NODE:
if(_268.namespaceURI!=_269.namespaceURI||_268.nodeName!=_269.nodeName){
_26c=false;
}else{
if(_26c=(_268.nodeName==_269.nodeName)){
var _270=_269.getAttribute("id");
var _271=_268.getAttribute("id");
if(_270!=null&&_271!=null){
if(_270!=_271){
_26c=false;
}else{
if((_26d=this._getPlugin(_268,_269))!=null){
if(_26d.updateElement(_268,_269)){
_26f=true;
_26c=false;
}
}
}
}
if(_26c){
if(_26c=this._checkAttributes(_268,_269)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_268)&&this._hasSoftChildren(_269)){
if(this._validateSoftChildren(_268,_269)){
this._updateSoftChildren(_268,_269);
_26e=true;
}
_26c=false;
}else{
_26c=_268.childNodes.length==_269.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_268.data.trim()!=_269.data.trim()){
_26c=false;
}
break;
}
}
}
if(_26c==false&&!_26e&&!_26f){
if(id!=null&&_26a!=null){
this.addUpdate(new ReplaceUpdate(id,_26a));
}
}
return _26c;
},_checkAttributes:function(_272,_273){
var _274=true;
var _275=false;
var _276=_272.attributes;
var _277=_273.attributes;
if(_276.length!=_277.length){
_275=true;
}else{
_275=!Array.every(_276,function(att1,i){
var att2=_277.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_275){
var _27b=_272.getAttribute("id");
var _27c=_273.getAttribute("id");
if(this.hasSoftAttributes&&_27b!=null&&_27b==_27c){
this.addUpdate(new AttributesUpdate(_27c,_272,_273));
}else{
_274=false;
}
}
return _274;
},_hasSoftChildren:function(_27d){
var _27e=true;
if(_27d.hasChildNodes()){
_27e=Array.every(_27d.childNodes,function(node){
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
return _27e;
},_validateSoftChildren:function(_281,_282){
var _283=true;
var _284=-1;
var _285=-1;
var _286=-1;
var news=this._toMap(_281.childNodes,true);
var olds=this._toMap(_282.childNodes,true);
for(var id in olds){
if(_283){
var _28a=olds[id];
_283=_28a>=_284;
if(news[id]!=null){
_286=news[id];
_283=_286>=_285;
}
}
_284=_28a;
if(_286>-1){
_285=_286;
}
}
return _283;
},_updateSoftChildren:function(_28b,_28c){
var news=this._toMap(_28b.childNodes);
var olds=this._toMap(_28c.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _290=null;
for(id in news){
if(olds[id]==null){
var _291=news[id];
if(_290==null){
var _292=_28c.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_292,_291,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_290,_291,false));
}
}
_290=id;
}
},addUpdate:function(_293){
this._updates.push(_293);
if(_293 instanceof ReplaceUpdate){
this._replaced[_293.id]=true;
}
},_getPlugin:function(_294,_295){
var _296=null;
this.plugins.every(function(_297){
if(_297.handleElement(_294,_295)){
_296=_297;
}
return _296==null;
});
return _296;
},_toMap:function(_298,_299){
var _29a={};
Array.forEach(_298,function(node,_29c){
if(node.nodeType==Node.ELEMENT_NODE){
_29a[node.getAttribute("id")]=_299?_29c:node;
}
});
return _29a;
},_getPost:function(form){
var _29e=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a0){
if(_2a0.name==null||_2a0.name==""){
return;
}
var name=_2a0.name;
var _2a2=encodeURIComponent(_2a0.value);
switch(_2a0.type){
case "button":
case "submit":
var _2a3=UpdateAssistant.getActiveElement();
if(_2a0==_2a3&&name!=""){
_29e+=name+"="+_2a2+"&";
}
break;
case "radio":
if(_2a0.checked){
_29e+=name+"="+_2a2+"&";
}
break;
case "checkbox":
if(_2a0.checked){
if(_2a0.name==last){
if(_29e.lastIndexOf("&")==_29e.length-1){
_29e=_29e.substr(0,_29e.length-1);
}
_29e+=","+_2a2;
}else{
_29e+=name+"="+_2a0.value;
}
last=name;
_29e+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_29e+=name+"="+_2a2+"&";
break;
}
});
}
return _29e.substr(0,_29e.length-1);
},_postRequest:function(form){
var _2a5=form.method!=""?form.method:"get";
var _2a6=form.action!=""?form.action:window.location.toString();
var _2a7=this._getPost(form);
if(_2a5=="get"){
if(_2a6.indexOf("?")>-1){
_2a6=_2a6+"&"+_2a7;
}else{
_2a6+"?"+_2a7;
}
}
var _2a8=this;
var _2a9=UpdateAssistant.getXMLHttpRequest(_2a5,_2a6,this);
if(_2a5=="post"){
_2a9.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2a9.send(_2a5=="post"?_2a7:null);
},_fixdotnet:function(dom,id){
var _2ac=document.getElementById(id);
if(_2ac!=null){
var _2ad=UpdateAssistant.getElementById(dom,id);
if(_2ad!=null){
var _2ae=_2ad.getAttribute("value");
if(_2ae!==_2ac.value){
_2ac.value=_2ae;
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
},report:function(_2b1){
this.summary+=_2b1+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b2=null;
if(!window.UpdateAssistant){
this._construct();
_2b2=this;
}
return _2b2;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b3,fun){
var _2b5=true;
var len=_2b3.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b7=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b3[i]!="undefined"){
if(!fun.call(_2b7,_2b3[i],i,_2b3)){
_2b5=false;
break;
}
}
}
}
return _2b5;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2ba=arguments[1];
return Array.every(this,fun,_2ba);
};
}
if(!Array.forEach){
Array.forEach=function(_2bb,fun){
var len=_2bb.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2be=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bb[i]!="undefined"){
fun.call(_2be,_2bb[i],i,_2bb);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c1=arguments[1];
Array.forEach(this,fun,_2c1);
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
},getXMLHttpRequest:function(_2c3,_2c4,_2c5){
var _2c6=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c6!=null){
_2c6.open(_2c3,_2c4,(_2c5!=null?true:false));
if(_2c5!=null){
function action(){
if(_2c6.readyState==4){
var _2c7=_2c6.getResponseHeader("X-Error-Type");
if(_2c7){
var _2c8="";
for(var i=0;i<10;i++){
var _2ca=i?i:"";
var _2c7=_2c6.getResponseHeader("X-Error-Type"+_2ca);
if(!_2c7){
break;
}
var _2cb=_2c6.getResponseHeader("X-Error-Message"+_2ca);
_2c8+=_2c7+"\n"+_2cb+"\n";
}
Dialog.error("Error",_2c8);
}else{
var text=_2c6.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c5.handleResponse(dom);
}
}
}
}
if(_2c6.addEventListener!=null){
_2c6.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c6.onreadystatechange=action;
}
}
}
return _2c6;
},dispatchEvent:function(_2ce,name){
var _2d0=true;
var _2d1=document.createEvent("UIEvents");
_2d1.initEvent(name,true,true);
_2d0=_2ce.dispatchEvent(_2d1);
return _2d0;
},getUpdateZones:function(dom){
var _2d3="//*[@id and contains(@class,'updatezone')]";
var _2d4=[];
var _2d5=null;
var _2d6=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d5=dom.evaluate(_2d3,dom,null,type,null);
while((_2d6=_2d5.iterateNext())!=null){
_2d4.push(_2d6);
}
}else{
_2d5=dom.documentElement.selectNodes(_2d3);
Array.forEach(_2d5,function(_2d8){
_2d4.push(_2d8);
});
}
return _2d4;
},getElementById:function(dom,id){
var _2db="//*[@id='"+id+"']";
var _2dc=null;
var _2dd=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2dc=dom.evaluate(_2db,dom,null,type,null);
_2dd=_2dc.singleNodeValue;
}else{
_2dd=dom.documentElement.selectNodes(_2db)[0];
}
return _2dd;
},_getIds:function(dom){
var _2e0="//*[@id]";
var _2e1=null;
var _2e2=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e1=dom.evaluate(_2e0,dom,null,type,null);
while((element=_2e1.iterateNext())!=null){
_2e2.push(element.getAttribute("id"));
}
}else{
_2e1=dom.documentElement.selectNodes(_2e0);
Array.forEach(_2e1,function(_2e4){
_2e2.push(_2e4.getAttribute("id"));
});
}
return _2e2;
},toHTMLElement:function(_2e5){
var _2e6=this.serialize(_2e5);
var temp=document.createElement("temp");
temp.innerHTML=_2e6;
return temp.firstChild;
},getActiveElement:function(){
var _2e8=document.activeElement;
if(_2e8==null||_2e8==document.body){
_2e8=this._activeElement;
}
return _2e8;
},serialize:function(_2e9){
var _2ea=null;
if(_2e9.xml!=null){
_2ea=_2e9.xml;
}else{
if(this._serializer!=null){
_2ea=this._serializer.serializeToString(_2e9);
}
}
return _2ea;
},hasDifferences:function(_2eb,_2ec){
var s1=null;
var s2=null;
if(_2eb.xml!=null){
s1=_2eb.xml;
s2=_2ec.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2eb);
s2=this._serializer.serializeToString(_2ec);
}
}
return s1!=s2;
},parse:function(_2ef){
var _2f0=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f0=this._parser.parseFromString(_2ef,"text/xml");
}else{
_2f0=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f0.setProperty("SelectionLanguage","XPath");
_2f0.loadXML(_2ef);
}
return this._validate(_2f0);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f3=dom.getElementsByTagName("parsererror").item(0);
if(_2f3!=null){
out=_2f3.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2f7=!has[id];
has[id]=true;
if(!_2f7){
out="Element \""+id+"\" encountered twice.";
}
return _2f7;
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
this.handleElement=function(_2f8,_2f9){
var _2fa=false;
switch(_2f8.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2f8.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2fa=false;
break;
}
break;
}
return _2fa;
};
this.updateElement=function(_2fb,_2fc){
var id=_2fb.getAttribute("id");
var _2fe=document.getElementById(id);
if(_2fe!=null){
var _2ff=null;
switch(_2fe.nodeName.toLowerCase()){
case "input":
_2ff=_2fb.getAttribute("value");
break;
case "textarea":
_2ff=_2fb.textContent?_2fb.textContent:_2fb.text;
break;
}
if(_2ff==null){
_2ff="";
}
if(_2ff!=_2fe.value){
_2fe.value=_2ff;
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
},_beforeUpdate:function(_300){
var _301=true;
if(_300!=null){
_300.__updateType=this.type;
_301=UpdateAssistant.dispatchEvent(_300,Update.EVENT_BEFOREUPDATE);
}
return _301;
},_afterUpdate:function(_302){
var _303=true;
if(_302!=null){
_302.__updateType=this.type;
_303=UpdateAssistant.dispatchEvent(_302,Update.EVENT_AFTERUPDATE);
}
return _303;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_305){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_305;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _306,_307,_308=UpdateAssistant.toHTMLElement(this.element);
if((_306=document.getElementById(this.id))!=null){
if((_307=_306.parentNode)!=null){
var _309=UserInterface.getBinding(_306);
if(_309!=null){
_308.__isAttached=_309.isAttached;
}
if(this._beforeUpdate(_306)){
_307.replaceChild(_308,_306);
this._afterUpdate(_308);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_30a){
var _30b=ReplaceUpdate.superclass._afterUpdate.call(this,_30a);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_30a.nodeName=="form"||_30a.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30b;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_30e,_30f){
this.type=type;
this.id=id;
this.element=_30e;
this.isFirst=_30f;
return this;
}
SiblingUpdate.prototype.update=function(){
var _310=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_310);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_310);
break;
}
};
SiblingUpdate.prototype._remove=function(_311){
var _312=_311.parentNode;
if(_312!=null){
if(this._beforeUpdate(_311)){
_312.removeChild(_311);
this._afterUpdate(_312);
}
}
};
SiblingUpdate.prototype._insert=function(_313,_314){
var _315=UpdateAssistant.toHTMLElement(_313);
if(this.isFirst){
var _316=_314;
if(_316!=null){
if(this._beforeUpdate(_316)){
_316.insertBefore(_315,_316.firstChild);
this._afterUpdate(_315);
}
}
}else{
var _316=_314.parentNode;
if(_316!=null){
if(this._beforeUpdate(_316)){
_316.insertBefore(_315,_314.nextSibling);
this._afterUpdate(_315);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_317){
var _318=SiblingUpdate.superclass._beforeUpdate.call(this,_317);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_317.id+"\"");
}
return _318;
};
SiblingUpdate.prototype._afterUpdate=function(_319){
var _31a=true;
if(_319!=null){
_31a=SiblingUpdate.superclass._afterUpdate.call(this,_319);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_319.id+"\"");
if(_319.nodeName=="form"||_319.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _31a;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31c,_31d){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31c;
this.currentElement=_31d;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _31e=document.getElementById(this.id);
if(this._beforeUpdate(_31e)){
this._updateAttributes(_31e);
this._afterUpdate(_31e);
}
};
AttributesUpdate.prototype._updateAttributes=function(_31f){
Array.forEach(this.element.attributes,function(_320){
var _321=this.currentElement.getAttribute(_320.nodeName);
if(_321==null||_321!=_320.nodeValue){
this._setAttribute(_31f,_320.nodeName,_320.nodeValue);
this._summary.push("@"+_320.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_322){
if(this.element.getAttribute(_322.nodeName)==null){
this._setAttribute(_31f,_322.nodeName,null);
this._summary.push("@"+_322.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_323,name,_325){
if(_323==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_325);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _326=(_325==null);
if(_326){
_323.removeAttribute(name);
}else{
_323.setAttribute(name,_325);
}
if(document.all!=null){
if(_326){
_325="";
}
switch(name.toLowerCase()){
case "class":
_323.className=_325;
break;
case "disabled":
_323.disabled=!_326;
break;
case "checked":
_323.checked=!_326;
break;
case "readonly":
_323.readOnly=!_326;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_327){
AttributesUpdate.superclass._afterUpdate.call(this,_327);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_328,key){
return _328.replace("${windowkey}",document.location+":"+key);
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
var _32c=this._newDimensions.w!=this._currentDimensions.w;
var _32d=this._newDimensions.h!=this._currentDimensions.h;
if(_32c||_32d){
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
},fireOnDOM:function(_32f){
if(Interfaces.isImplemented(IDOMHandler,_32f,true)){
this._ondomstatements.add(_32f);
}
},fireOnLoad:function(_330){
if(Interfaces.isImplemented(ILoadHandler,_330,true)){
this._onloadstatements.add(_330);
}
},fireOnResize:function(_331){
if(Interfaces.isImplemented(IResizeHandler,_331,true)){
this._onresizestatements.add(_331);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_332){
return eval(_332);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_333,_334){
SystemLogger.unsuspend(_334);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_335,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _338=top.app.bindingMap.broadcasterHasDirtyTabs;
_338.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_339,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33c=top.app.bindingMap.broadcasterHasDirtyTabs;
_33c.disable();
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
var _33d=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_33d=LoginService.Logout(true);
if(!_33d){
alert("Logout failed.");
}
}
return _33d;
},lock:function(_33e){
if(_33e!=null){
this._lockthings[_33e]=true;
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
},unlock:function(_33f,_340){
if(_33f!=null){
delete this._lockthings[_33f];
if(top.bindingMap.mastercover!=null){
if(_340||this._lockers>0){
if(_340){
var out="Unlocked by "+new String(_33f)+"\n";
for(var _342 in this._lockthings){
out+="Locked by "+new String(_342)+". ";
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
},hasLock:function(_343){
return this._lockthings[_343]==true;
},activate:function(_344){
var _345=this._activeBinding;
this._activeBinding=_344;
this._activatedBindings.add(_344);
if(_345&&_345.isActive){
_345.deActivate();
}
},deActivate:function(_346){
var _347=null;
var _348=null;
if(_346==this._activeBinding){
while(!_348&&this._activatedBindings.hasEntries()){
_347=this._activatedBindings.extractLast();
if(_347!=_346&&_347.isActivatable){
_348=_347;
}
}
if(!_348){
_348=app.bindingMap.explorerdock;
}
_348.activate();
}
},focused:function(_349){
this.isFocused=_349;
if(_349){
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
},handleAction:function(_34e){
switch(_34e.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _350=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_352){
var src=_352.src;
if(src.indexOf(_350)>-1){
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
var _357=false;
if(this._isMousePositionTracking){
_357=true;
if(Client.isExplorer&&e.button!=1){
_357=false;
}
if(_357){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _357;
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
},onDragStart:function(_359){
var _35a=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_35a,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_35a.getImage());
this._cursorStartPoint=_359;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_35a.showDrag){
_35a.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_35a.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35c=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35c);
}
},onDragStop:function(diff){
if(this._isDragging){
var _35e=BindingDragger.draggedBinding;
if(_35e.hideDrag){
_35e.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_35e.dragType);
this._isDragging=false;
_35e=BindingAcceptor.acceptingBinding;
if(_35e!=null){
if(Interfaces.isImplemented(IAcceptable,_35e,true)==true){
_35e.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_35e);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_35f){
if(this.isDeveloperMode||_35f){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_360){
if(_360==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_361){
switch(_361){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_363){
switch(_363.Key){
case "ProductVersion":
this.versionString=_363.Value;
break;
case "ProductTitle":
this.versionPrettyString=_363.Value;
break;
case "InstallationId":
this.installationID=_363.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_363.Value;
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
var _366=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _367={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _368=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_368){
for(var key in _368){
_367[key]=_368[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_367);
}
}});
this.getPref=function(key){
var _36b=null;
if(key){
_36b=_367[key];
}else{
throw "No such preference.";
}
return _36b;
};
this.setPref=function(key,_36d){
if(key){
_367[key]=_36d;
}else{
throw "No such preference.";
}
};
function debug(_36e){
var _36f=_36e?"Persisted preferences":"No persisted preferences. Using defaults";
_36f+=":\n";
for(var key in _367){
var pref=_367[key];
_36f+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_366.fine(_36f);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _374=null;
if(this.isInitialized==true){
if(this._persistance){
var _375=this._persistance[id];
if(_375){
_374=_375[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _374;
},setPersistedProperty:function(id,prop,_378){
if(this.isInitialized==true){
if(this._persistance){
if(_378!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_378);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_379){
switch(_379){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _37a=top.bindingMap.persistance;
_37a.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37b=top.bindingMap.persistance;
var map=_37b.getPersistanceMap();
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
function StandardEventHandler(doc,_37e){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_37e;
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
var _382={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_382);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_382);
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
var _389=UserInterface.getBinding(node);
if(_389!=null){
_389.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_389!=null?null:node.parentNode;
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
var _38c=Application.trackMousePosition(e);
if(_38c){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_38f){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_38f){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_38f=true;
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
var _390=KeySetBinding.handleKey(this._contextDocument,e);
if(!_390){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _391=this._contextWindow.frameElement;
if(_391!=null){
var _392=DOMUtil.getParentWindow(_391);
if(_392.standardEventHandler!=null){
_392.standardEventHandler._handleKeyDown(e,_38f);
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
var _395=false;
var _396=DOMEvents.getTarget(e);
var name=_396.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_395=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_395;
}
if(_395){
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
StandardEventHandler.prototype.enableNativeKeys=function(_399){
this._isAllowTabs=(_399==true?true:false);
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
function Action(_39c,type){
this.target=_39c;
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
function Animation(_39e){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _39f in _39e){
this[_39f]=_39e[_39f];
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
Animation.prototype.onstart=function(_3a3){
};
Animation.prototype.onstep=function(_3a4){
};
Animation.prototype.onstop=function(_3a5){
};
Point.isEqual=function(p1,p2){
var _3a8=false;
if(p1&&p2){
_3a8=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a8;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3ad=false;
if(dim1&&dim2){
_3ad=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3ad;
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
function BindingAcceptor(_3b4){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b4;
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
var _3b5=new List(this._binding.dragAccept.split(" "));
while(_3b5.hasNext()){
var type=_3b5.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b7,arg){
var type=arg;
try{
switch(_3b7){
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
function BindingBoxObject(_3bc){
this._domElement=_3bc.getBindingElement();
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
function BindingDragger(_3be){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3be;
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
BindingDragger.prototype.registerHandler=function(_3c0){
if(Interfaces.isImplemented(IDragHandler,_3c0)==true){
this.handler=_3c0;
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
var _3c3=e.button==(e.target?0:1);
if(_3c3){
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
var _3c5=Application.getMousePosition();
var dx=_3c5.x-this.startPoint.x;
var dy=_3c5.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c8,e){
switch(_3c8){
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
function BindingParser(_3ca){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3ca;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3cb){
var _3cc=new List();
var xml=BindingParser.XML.replace("${markup}",_3cb);
var doc=XMLParser.parse(_3cb);
if(doc){
var _3cf=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3cf);
var node=_3cf.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3cc.add(node);
}
node=node.nextSibling;
}
}
return _3cc;
};
BindingParser.prototype._iterate=function(_3d1,_3d2){
var _3d3=null;
switch(_3d1.nodeType){
case Node.ELEMENT_NODE:
_3d3=this._cloneElement(_3d1);
UserInterface.registerBinding(_3d3);
break;
case Node.TEXT_NODE:
_3d3=this._ownerDocument.createTextNode(_3d1.nodeValue);
break;
}
if(_3d3){
_3d2.appendChild(_3d3);
}
if(_3d3&&_3d1.hasChildNodes()){
var _3d4=_3d1.firstChild;
while(_3d4){
this._iterate(_3d4,_3d3);
_3d4=_3d4.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d5){
var _3d6=DOMUtil.createElementNS(_3d5.namespaceURI?_3d5.namespaceURI:Constants.NS_XHTML,_3d5.nodeName,this._ownerDocument);
var i=0;
while(i<_3d5.attributes.length){
var attr=_3d5.attributes.item(i++);
_3d6.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d6;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3d9){
var _3da=null;
var _3db=false;
var _3dc=_3d9.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d9)){
var _3dd=UserInterface.getBinding(_3d9);
_3db=BindingSerializer.activeInstance.indexBinding(_3dd);
if(_3db){
_3da=_3dd.key;
_3d9.setAttribute(BindingSerializer.KEYPOINTER,_3da);
}
}
_3da=_3da?_3da:_3dc;
var _3de=new List(_3d9.childNodes);
_3de.each(function(_3df){
if(_3df.nodeType==Node.ELEMENT_NODE){
_3df.setAttribute(BindingSerializer.KEYPOINTER,_3da);
}
});
if(_3db){
BindingSerializer.activeInstance.append(_3da,_3dc);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e0){
BindingSerializer.activeInstance=this;
_3e0.bindingWindow.ElementIterator.iterate(_3e0.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e1){
var _3e2=false;
var _3e3=_3e1.serialize();
if(_3e3!=false){
_3e2=true;
var _3e4="ui:"+DOMUtil.getLocalName(_3e1.bindingElement);
var _3e5=DOMUtil.createElementNS(Constants.NS_UI,_3e4,this._dom);
this._pointers[_3e1.key]=_3e5;
for(var prop in _3e3){
if(_3e3[prop]!=null){
_3e5.setAttribute(prop,String(_3e3[prop]));
}
}
}
return _3e2;
};
BindingSerializer.prototype.append=function(_3e7,_3e8){
var _3e9=this._pointers[_3e7];
var _3ea=_3e8?this._pointers[_3e8]:this._dom;
_3ea.appendChild(_3e9);
};
function ImageProfile(_3eb){
this._default=_3eb.image;
this._hover=_3eb.imageHover;
this._active=_3eb.imageActive;
this._disabled=_3eb.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3ec){
this._default=_3ec;
};
ImageProfile.prototype.getHoverImage=function(){
return this._default;
};
ImageProfile.prototype.setHoverImage=function(_3ed){
this._hover=_3ed;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3ee){
this._active=_3ee;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._default;
};
ImageProfile.prototype.setDisabledImage=function(_3ef){
this._disabled=_3ef;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f0,_3f1,_3f2){
var _3f3=null;
if(_3f0.isAttached){
_3f3=new List();
var _3f4=_3f2?_3f0.getChildElementsByLocalName(_3f1):_3f0.getDescendantElementsByLocalName(_3f1);
_3f4.each(function(_3f5){
var _3f6=UserInterface.getBinding(_3f5);
if(_3f6){
_3f3.add(_3f6);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f0.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f3;
},getAncestorBindingByType:function(_3f8,impl,_3fa){
var _3fb=null;
if(Binding.exists(_3f8)){
var node=_3f8.bindingElement;
while(_3fb==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3fd=UserInterface.getBinding(node);
if(_3fd instanceof impl){
_3fb=_3fd;
}
}else{
if(_3fa&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fb;
},getAncestorBindingByLocalName:function(_3ff,_400,_401){
var _402=null;
if(_400=="*"){
var node=_3ff.bindingElement;
while(!_402&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_402=UserInterface.getBinding(node);
}
}
}else{
_402=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_400,_3ff.bindingElement,_401));
}
return _402;
},getChildElementsByLocalName:function(_404,_405){
var _406=new List();
var _407=new List(_404.bindingElement.childNodes);
_407.each(function(_408){
if(_408.nodeType==Node.ELEMENT_NODE){
if(_405=="*"||DOMUtil.getLocalName(_408)==_405){
_406.add(_408);
}
}
});
return _406;
},getChildBindingByType:function(_409,impl){
var _40b=null;
_409.getChildElementsByLocalName("*").each(function(_40c){
var _40d=UserInterface.getBinding(_40c);
if(_40d!=null&&_40d instanceof impl){
_40b=_40d;
return false;
}else{
return true;
}
});
return _40b;
},getDescendantBindingByType:function(_40e,impl){
var _410=null;
_40e.getDescendantElementsByLocalName("*").each(function(_411){
var _412=UserInterface.getBinding(_411);
if(_412!=null&&_412 instanceof impl){
_410=_412;
return false;
}else{
return true;
}
});
return _410;
},getDescendantBindingsByType:function(_413,impl){
var _415=new List();
_413.getDescendantElementsByLocalName("*").each(function(_416){
var _417=UserInterface.getBinding(_416);
if(_417!=null&&_417 instanceof impl){
_415.add(_417);
}
return true;
});
return _415;
},getNextBindingByLocalName:function(_418,name){
var _41a=null;
var _41b=_418.bindingElement;
while((_41b=DOMUtil.getNextElementSibling(_41b))!=null&&DOMUtil.getLocalName(_41b)!=name){
}
if(_41b!=null){
_41a=UserInterface.getBinding(_41b);
}
return _41a;
},getPreviousBindingByLocalName:function(_41c,name){
var _41e=null;
var _41f=_41c.bindingElement;
while((_41f=DOMUtil.getPreviousElementSibling(_41f))!=null&&DOMUtil.getLocalName(_41f)!=name){
}
if(_41f!=null){
_41e=UserInterface.getBinding(_41f);
}
return _41e;
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
},addFilter:function(_420){
this._filters.add(_420);
},removeFilter:function(_421){
var _422=-1;
this._filters.each(function(fil){
_422++;
var _424=true;
if(fil==_421){
_424=false;
}
return _424;
});
if(_422>-1){
this._filters.del(_422);
}
},_applyFilters:function(node,arg){
var _427=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42a=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42b=true;
while(this._filters.hasNext()&&_42b==true){
var _42c=this._filters.getNext();
var res=_42c.call(this,node,arg);
if(res!=null){
_427=res;
switch(res){
case stop:
case skip:
case skip+_42a:
_42b=false;
break;
}
}
}
return _427;
},crawl:function(_42e,arg){
this.contextDocument=_42e.ownerDocument;
this.onCrawlStart();
var _430=this.type==NodeCrawler.TYPE_ASCENDING;
var _431=this._applyFilters(_42e,arg);
if(_431!=NodeCrawler.STOP_CRAWLING){
if(_430&&_431==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_430?_42e.parentNode:_42e;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_433,arg){
var _435=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_435=this._crawlDescending(_433,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_435=this._crawlAscending(_433,arg);
break;
}
return _435;
},_crawlDescending:function(_436,arg){
var skip=NodeCrawler.SKIP_NODE;
var _439=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43b=null;
if(_436.hasChildNodes()){
var node=_436.firstChild;
while(node!=null&&_43b!=stop){
this.currentNode=node;
_43b=this._applyFilters(node,arg);
switch(_43b){
case stop:
case _439:
case skip+_439:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43b=stop;
break;
}
}
}
if(_43b!=stop&&_43b!=skip){
this.previousNode=node;
}
break;
}
if(_43b!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43b;
},_crawlAscending:function(_43e,arg){
var _440=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_43e!=null){
this.currentNode=_43e;
_440=this._applyFilters(_43e,arg);
if(_440!=stop){
var next=this.nextNode?this.nextNode:_43e.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_43e;
_440=this._crawl(next,arg);
}
}
}else{
_440=stop;
}
return _440;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _444 in this){
this[_444]=null;
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
var _447=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_447=NodeCrawler.SKIP_NODE;
}
return _447;
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
this.addFilter(function(_448,arg){
var _44a=null;
if(!UserInterface.hasBinding(_448)){
_44a=NodeCrawler.SKIP_NODE;
}
return _44a;
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
this.addFilter(function(_44c,arg){
var _44e=null;
var _44f=UserInterface.getBinding(_44c);
if(Interfaces.isImplemented(ICrawlerHandler,_44f)==true){
self.response=null;
_44f.handleCrawler(self);
_44e=self.response;
}
return _44e;
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
this.addFilter(function(_451,list){
var _453=null;
var _454=UserInterface.getBinding(_451);
if(Interfaces.isImplemented(IFlexible,_454)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_454);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_454.isFlexSuspended==true){
_453=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_454);
}
break;
}
}
return _453;
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
this.addFilter(function(_455,list){
var _457=null;
var _458=UserInterface.getBinding(_455);
if(_458.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_458)==true){
if(_458.isFocusable&&_458.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_458);
break;
case FocusCrawler.MODE_FOCUS:
if(!_458.isFocused){
_458.focus();
}
_457=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_458.isFocused==true){
_458.blur();
_457=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _457;
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
this.addFilter(function(_459,list){
var _45b=null;
var _45c=UserInterface.getBinding(_459);
if(!_45c.isVisible){
_45b=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45b;
});
this.addFilter(function(_45d,list){
var _45f=null;
var _460=UserInterface.getBinding(_45d);
if(_460.isAttached){
if(Interfaces.isImplemented(IFit,_460)){
if(!_460.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_460);
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
UpdateAssistant.serialize=function(_461){
_461=_461.cloneNode(true);
_461.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_461.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_461);
};
}
},handleEvent:function(e){
var _463=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_463);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_463);
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
},_beforeUpdate:function(_464){
var _465=(_464==document.documentElement);
if(_465){
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
var _468=FocusBinding.focusedBinding;
if(_468!=null){
this._focusID=_468.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_464.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_464);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_464,false);
break;
}
}
},_afterUpdate:function(_469){
var _46a=(_469==document.documentElement);
if(_46a){
var _46b=this._elementsbuffer;
if(_46b.hasEntries()){
_46b.each(function(_46c){
DocumentManager.attachBindings(_46c);
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
var _46f=FocusBinding.focusedBinding;
if(_46f==null){
var _470=document.getElementById(this._focusID);
if(_470!=null){
var _46f=UserInterface.getBinding(_470);
if(_46f!=null){
_46f.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _471=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _472="NEW DOM: "+document.title+"\n\n"+_471+"\n\n";
_472+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_472);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_469.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_469);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_469,true);
break;
}
switch(_469.id){
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
var _46f=UserInterface.getBinding(_469);
while(_46f==null&&_469!=null){
_46f=UserInterface.getBinding(_469);
_469=_469.parentNode;
}
if(_46f!=null){
_46f.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_474,_475){
var _476=UserInterface.getBinding(_474);
if(_476!=null){
if(_475){
var _477=this._attributesbuffer;
var map=new Map();
_477.each(function(name,old){
var now=_474.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_474.attributes).each(function(att){
if(att.specified){
if(!_477.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_47e){
var _47f=_476.propertyMethodMap[name];
if(_47f!=null){
_47f.call(_476,_47e);
}
});
}else{
var map=new Map();
new List(_474.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_481,_482){
var _483=window.bindingMap[_481.getAttribute("id")];
if(_483!=null){
return _483.handleElement(_481,_482);
}
},updateElement:function(_484,_485){
var _486=window.bindingMap[_484.getAttribute("id")];
if(_486!=null){
return _486.updateElement(_484,_485);
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
this.addFilter(function(_488,list){
var _48a=UserInterface.getBinding(_488);
var _48b=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48a==null){
UserInterface.registerBinding(_488);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48a!=null){
if(!_48a.isAttached){
list.add(_48a);
}
if(_48a.isLazy==true){
_48b=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48a!=null){
list.add(_48a);
}
break;
}
return _48b;
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
},handleBroadcast:function(_48c,arg){
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
var _48f=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_48f)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_48f!=null){
if(_48f.href!=null&&_48f.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _490=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_490!=null){
var map={};
var _492=DOMUtil.getElementsByTagName(_490,"bindingmapping");
new List(_492).each(function(_493){
var _494=_493.getAttribute("element");
var _495=_493.getAttribute("binding");
map[_494]=eval(_495);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_496){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_496;
}else{
this.customUserInterfaceMapping.merge(_496);
}
},_registerBindings:function(_497){
var _498=new DocumentCrawler();
_498.mode=DocumentCrawler.MODE_REGISTER;
_498.crawl(_497);
_498.dispose();
},_attachBindings:function(_499){
var _49a=new DocumentCrawler();
_49a.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49a.crawl(_499,list);
var _49c=false;
while(list.hasNext()){
var _49d=list.getNext();
if(!_49d.isAttached){
_49d.onBindingAttach();
if(!_49d.memberDependencies){
_49d.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_49d)){
_49c=true;
}
}
}
if(_49c){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49a.dispose();
list.dispose();
},attachBindings:function(_49f){
this._registerBindings(_49f);
this._attachBindings(_49f);
},detachBindings:function(_4a0,_4a1){
var _4a2=new DocumentCrawler();
_4a2.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a2.crawl(_4a0,list);
if(_4a1==true){
list.extractFirst();
}
var _4a4=false;
list.reverse().each(function(_4a5){
if(Interfaces.isImplemented(IData,_4a5)){
_4a4=true;
}
_4a5.dispose(true);
});
if(_4a4){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a2.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a7){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a7)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a8){
this.isDirty=true;
var _4a9=false;
if(_4a8!=null&&!_4a8.isDirty){
_4a8.isDirty=true;
_4a8.dispatchAction(Binding.ACTION_DIRTY);
_4a9=true;
}
return _4a9;
},clean:function(_4aa){
if(_4aa.isDirty){
_4aa.isDirty=false;
}
},registerDataBinding:function(name,_4ac){
if(Interfaces.isImplemented(IData,_4ac,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4ac;
}
}else{
throw "Invalid DataBinding: "+_4ac;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4af=null;
if(this._dataBindings[name]!=null){
_4af=this._dataBindings[name];
}
return _4af;
},getAllDataBindings:function(_4b0){
var list=new List();
for(var name in this._dataBindings){
var _4b3=this._dataBindings[name];
list.add(_4b3);
if(_4b0&&_4b3 instanceof WindowBinding){
var _4b4=_4b3.getContentWindow().DataManager;
if(_4b4!=null){
list.merge(_4b4.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b5=false;
for(var name in this._dataBindings){
_4b5=true;
break;
}
return _4b5;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b9){
var _4ba=this._dataBindings[name];
if(_4ba!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4ba.setResult(_4b9);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4ba);
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
var _4bb=new DataBindingMap();
_4bb.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4bd=this._dataBindings[name];
if(_4bd instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4bb[name]=_4bd.getValue();
}
return _4bb;
},getDataBindingResultMap:function(){
var _4be=new DataBindingMap();
_4be.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c0=this._dataBindings[name];
var res=_4c0.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c3){
_4be.set(name,_4c3);
});
}else{
_4be.set(name,res);
}
}
return _4be;
},getPostBackString:function(){
var _4c4="";
var form=document.forms[0];
if(form!=null){
var _4c6="";
new List(form.elements).each(function(_4c7){
var name=_4c7.name;
var _4c9=encodeURIComponent(_4c7.value);
switch(_4c7.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c4+=name+"="+_4c9+"&";
break;
case "submit":
if(document.activeElement==_4c7){
_4c4+=name+"="+_4c9+"&";
}
break;
case "radio":
if(_4c7.checked){
_4c4+=name+"="+_4c9+"&";
}
break;
case "checkbox":
if(_4c7.checked){
if(_4c7.name==_4c6){
if(_4c4.lastIndexOf("&")==_4c4.length-1){
_4c4=_4c4.substr(0,_4c4.length-1);
}
_4c4+=","+_4c9;
}else{
_4c4+=name+"="+_4c7.value;
}
_4c6=name;
_4c4+="&";
}
break;
}
});
}
return _4c4.substr(0,_4c4.length-1);
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
var _4d2=null;
var _4d3=null;
var _4d4=false;
if(!this._cache[name]){
_4d4=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d6=DOMUtil.getXMLHTTPRequest();
_4d6.open("get",uri,false);
_4d6.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d6.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d3=_4d6.responseText;
break;
default:
_4d3=_4d6.responseXML;
break;
}
if(_4d3==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d3;
}
}
_4d3=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d2=_4d3;
break;
case this._modes.MODE_DOCUMENT:
_4d2=DOMUtil.cloneNode(_4d3,true);
break;
case this._modes.MODE_ELEMENT:
_4d2=DOMUtil.cloneNode(_4d3.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d2=DOMSerializer.serialize(_4d3,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d2=DOMSerializer.serialize(_4d3.documentElement,true);
break;
}
if(_4d4&&Application.isDeveloperMode){
}
return _4d2;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d9){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d9];
},invoke:function(url,_4db,_4dc){
this._logger.error("Not implemented");
},invokeModal:function(url,_4de,_4df){
var _4e0=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4de,argument:_4df});
StageBinding.presentViewDefinition(_4e0);
return _4e0;
},invokeDefinition:function(_4e1){
if(_4e1 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e1);
}
return _4e1;
},question:function(_4e2,text,_4e4,_4e5){
if(!_4e4){
_4e4=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e2,text,_4e4,_4e5);
},message:function(_4e6,text,_4e8,_4e9){
if(!_4e8){
_4e8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e6,text,_4e8,_4e9);
},error:function(_4ea,text,_4ec,_4ed){
if(!_4ec){
_4ec=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ea,text,_4ec,_4ed);
},warning:function(_4ee,text,_4f0,_4f1){
if(!_4f0){
_4f0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4ee,text,_4f0,_4f1);
},_standardDialog:function(type,_4f3,text,_4f5,_4f6){
var _4f7=null;
if(!_4f5){
_4f7=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f7=new List();
new List(_4f5).each(function(_4f8){
var _4f9=null;
switch(typeof _4f8){
case "object":
_4f9=_4f8;
break;
case "string":
var _4fa=false;
if(_4f8.indexOf(":")>-1){
_4f8=_4f8.split(":")[0];
_4fa=true;
}
_4f9=Dialog.dialogButton(_4f8);
if(_4fa){
_4f9.isDefault=true;
}
break;
}
_4f7.add(_4f9);
});
}
var _4fb={title:_4f3,text:text,type:type,image:this._dialogImages[type],buttons:_4f7};
var _4fc=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f6,argument:_4fb});
StageBinding.presentViewDefinition(_4fc);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4fe,arg){
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
},saveAll:function(_501){
var self=this;
var _503=Application.getDirtyDockTabsTabs();
if(_503.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_504,_505){
switch(_504){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_505,_501);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_503);
}else{
if(_501){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_506,_507){
var _508=false;
var list=new List();
_506.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_508=true;
var _50c=list.getLength();
var _50d={handleBroadcast:function(_50e,tab){
if(--_50c==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_507){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_50d);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _508;
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
var _512="Composite.Management.Help";
if(!StageBinding.isViewOpen(_512)){
StageBinding.handleViewPresentation(_512);
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
var _514=document.createEvent("Events");
_514.initEvent(type,true,true);
window.dispatchEvent(_514);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _516=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _517=_516.exec(url?url:"");
if(_517){
if(_517[3]=="media"){
this.isMedia=true;
}else{
if(_517[3]=="page"){
this.isPage=true;
}
}
}
var _518={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_518[$1]=$3;
});
this.queryString=_518;
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
Uri.prototype.setParam=function(key,_521){
if(_521==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_521;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _523=[];
for(var key in this.queryString){
_523.push(key+"="+this.queryString[key]);
}
if(_523.length>0){
url+="?"+_523.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_525,_526){
var _527=null;
var _528=ViewDefinitions[_525];
if(_528.isMutable){
var impl=null;
if(_528 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_526!=null&&impl!=null){
var def=new impl();
for(var prop in _528){
def[prop]=ViewDefinition.cloneProperty(_528[prop]);
}
def.handle=_526;
_527=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _527;
};
ViewDefinition.cloneProperty=function(_52c){
if(null==_52c){
return _52c;
}
if(typeof _52c==="object"){
var _52d=(_52c.constructor===Array)?[]:{};
for(var prop in _52c){
_52d[prop]=ViewDefinition.cloneProperty(_52c[prop]);
}
return _52d;
}
return _52c;
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
Binding.evaluate=function(_534,_535){
var _536=null;
var _537=_535.bindingWindow.WindowManager;
if(_537!=null){
var _538=Binding.parseScriptStatement(_534,_535.key);
_536=_537.evaluate(_538);
}
return _536;
};
Binding.parseScriptStatement=function(_539,key){
if(_539!=null&&key!=null){
var _53b="UserInterface.getBindingByKey ( \""+key+"\" )";
_539=_539.replace(/(\W|^)this(,| +|\)|;)/g,_53b);
_539=_539.replace(/(\W|^)this(\.)/g,_53b+".");
}
return _539;
};
Binding.exists=function(_53c){
var _53d=false;
try{
if(_53c&&_53c.bindingElement&&_53c.bindingElement.nodeType&&_53c.isDisposed==false){
_53d=true;
}
}
catch(accessDeniedException){
_53d=false;
}
finally{
return _53d;
}
};
Binding.destroy=function(_53e){
if(!_53e.isDisposed){
if(_53e.acceptor!=null){
_53e.acceptor.dispose();
}
if(_53e.dragger!=null){
_53e.disableDragging();
}
if(_53e.boxObject!=null){
_53e.boxObject.dispose();
}
if(_53e._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_53e);
}
for(var _53f in _53e.shadowTree){
var _540=_53e.shadowTree[_53f];
if(_540 instanceof Binding&&Binding.exists(_540)){
_540.dispose(true);
}
_53e.shadowTree[_53f]=null;
}
_53e.isDisposed=true;
_53e=null;
}
};
Binding.dotnetify=function(_541,_542){
var _543=_541.getCallBackID();
if(_543!=null){
var _544=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_541.bindingDocument);
_544.type="hidden";
_544.id=_543;
_544.name=_543;
_544.value=_542!=null?_542:"";
_541.bindingElement.appendChild(_544);
_541.shadowTree.dotnetinput=_544;
}else{
throw _541.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_545){
var _546=_545.getProperty("image");
var _547=_545.getProperty("image-hover");
var _548=_545.getProperty("image-active");
var _549=_545.getProperty("image-disabled");
if(_545.imageProfile==null){
if(_545.image==null&&_546!=null){
_545.image=_546;
}
if(_545.imageHover==null&&_547!=null){
_545.imageHover=_547;
}
if(_545.imageActive==null&&_548!=null){
_545.imageActive=_548;
}
if(_545.imageDisabled==null&&_549!=null){
_545.imageDisabled=_549;
}
if(_545.image||_545.imageHover||_545.imageActive||_545.imageDisabled){
_545.imageProfile=new ImageProfile(_545);
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
var _54b=this.dependentBindings[key];
_54b.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54c){
if(_54c){
this.memberDependencies[_54c.key]=true;
var _54d=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_54d=false;
break;
}
}
if(_54d){
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
Binding.prototype.detachRecursive=function(_54f){
if(_54f==null){
_54f=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_54f);
};
Binding.prototype.addMember=function(_550){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_550.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_550.key]=false;
_550.registerDependentBinding(this);
}
}
return _550;
};
Binding.prototype.addMembers=function(_551){
while(_551.hasNext()){
var _552=_551.getNext();
if(!_552.isInitialized){
this.addMember(_552);
}
}
return _551;
};
Binding.prototype.registerDependentBinding=function(_553){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_553.key]=_553;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _554=this.getProperty("persist");
if(_554&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _556=new List(_554.split(" "));
while(_556.hasNext()){
var prop=_556.getNext();
var _558=Persistance.getPersistedProperty(id,prop);
if(_558!=null){
this._persist[prop]=_558;
this.setProperty(prop,_558);
}else{
_558=this.getProperty(prop);
if(_558!=null){
this._persist[prop]=_558;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _559=this.getProperty("disabled");
var _55a=this.getProperty("contextmenu");
var _55b=this.getProperty("observes");
var _55c=this.getProperty("onattach");
var _55d=this.getProperty("hidden");
var _55e=this.getProperty("blockactionevents");
if(_55d==true&&this.isVisible==true){
this.hide();
}
if(_559&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55a){
this.setContextMenu(_55a);
}
if(_55b){
this.observe(this.getBindingForArgument(_55b));
}
if(_55e==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55c!=null){
Binding.evaluate(_55c,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _560=this.getProperty("draggable");
var _561=this.getProperty("dragtype");
var _562=this.getProperty("dragaccept");
var _563=this.getProperty("dragreject");
if(_560!=null){
this.isDraggable=_560;
}
if(_561!=null){
this.dragType=_561;
if(_560!=false){
this.isDraggable=true;
}
}
if(_562!=null){
this.dragAccept=_562;
}
if(_563!=null){
this.dragReject=_563;
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
Binding.prototype._updateBindingMap=function(_564){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _567=null;
if(_564){
_567=map[id];
if(_567!=null&&_567!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_567=map[id];
if(_567!=null&&_567==this){
delete map[id];
}
}
}else{
var _569=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_564);
if(Application.isDeveloperMode==true){
alert(_569);
}else{
this.logger.error(_569);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56b){
};
Binding.prototype.handleBroadcast=function(_56c,arg){
};
Binding.prototype.handleElement=function(_56e){
return false;
};
Binding.prototype.updateElement=function(_56f){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _571=null;
switch(typeof arg){
case "object":
_571=arg;
break;
case "string":
_571=this.bindingDocument.getElementById(arg);
if(_571==null){
_571=Binding.evaluate(arg,this);
}
break;
}
if(_571!=null&&_571.nodeType!=null){
_571=UserInterface.getBinding(_571);
}
return _571;
};
Binding.prototype.serialize=function(){
var _572={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_572.id=id;
}
var _574=this.getProperty("binding");
if(_574){
_572.binding=_574;
}
return _572;
};
Binding.prototype.serializeToString=function(){
var _575=null;
if(this.isAttached){
_575=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _575;
};
Binding.prototype.subTreeFromString=function(_576){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_576);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_577){
var _578=this.bindingElement.getAttribute(_577);
if(_578){
_578=Types.castFromString(_578);
}
return _578;
};
Binding.prototype.setProperty=function(prop,_57a){
if(_57a!=null){
_57a=_57a.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57a){
this.bindingElement.setAttribute(prop,_57a);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57a!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57a;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57a);
}
}
var _57b=this.propertyMethodMap[prop];
if(_57b){
_57b.call(this,this.getProperty(prop));
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
var _57d=null;
if(Binding.exists(this)){
_57d=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _57d;
};
Binding.prototype.attachClassName=function(_57e){
CSSUtil.attachClassName(this.bindingElement,_57e);
};
Binding.prototype.detachClassName=function(_57f){
CSSUtil.detachClassName(this.bindingElement,_57f);
};
Binding.prototype.hasClassName=function(_580){
return CSSUtil.hasClassName(this.bindingElement,_580);
};
Binding.prototype.addActionListener=function(type,_582){
_582=_582!=null?_582:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_582)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_582);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_582+")");
}
};
Binding.prototype.removeActionListener=function(type,_584){
_584=_584?_584:this;
if(Action.isValid(type)){
var _585=this.actionListeners[type];
if(_585){
var i=0,_587;
while((_587=_585[i])!=null){
if(_587==_584){
_585.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_589){
_589=_589?_589:this;
DOMEvents.addEventListener(this.bindingElement,type,_589);
};
Binding.prototype.removeEventListener=function(type,_58b){
_58b=_58b?_58b:this;
DOMEvents.removeEventListener(this.bindingElement,type,_58b);
};
Binding.prototype.subscribe=function(_58c){
if(!this.hasSubscription(_58c)){
this._subscriptions.set(_58c,true);
EventBroadcaster.subscribe(_58c,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_58c);
}
};
Binding.prototype.unsubscribe=function(_58d){
if(this.hasSubscription(_58d)){
this._subscriptions.del(_58d);
EventBroadcaster.unsubscribe(_58d,this);
}
};
Binding.prototype.hasSubscription=function(_58e){
return this._subscriptions.has(_58e);
};
Binding.prototype.observe=function(_58f,_590){
_58f.addObserver(this,_590);
};
Binding.prototype.unObserve=function(_591,_592){
_591.removeObserver(this,_592);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _596={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_596);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_596);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _599=false;
var _59a=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_59a=setTimeout(function(){
self.handleContextEvent(e);
},800);
_599=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_599){
clearTimeout(_59a);
_599=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_599){
clearTimeout(_59a);
_599=false;
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
var _5a0=null;
var _5a1=null;
var _5a2=false;
if(arg instanceof Action){
_5a0=arg;
}else{
if(Action.isValid(arg)){
_5a0=new Action(this,arg);
_5a2=true;
}
}
if(_5a0!=null&&Action.isValid(_5a0.type)==true){
if(_5a0.isConsumed==true){
_5a1=_5a0;
}else{
var _5a3=this.actionListeners[_5a0.type];
if(_5a3!=null){
_5a0.listener=this;
var i=0,_5a5;
while((_5a5=_5a3[i++])!=null){
if(_5a5&&_5a5.handleAction){
_5a5.handleAction(_5a0);
}
}
}
var _5a6=true;
if(this.isBlockingActions==true){
switch(_5a0.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a2){
_5a6=false;
}
break;
}
}
if(_5a6){
_5a1=this.migrateAction(_5a0);
}else{
_5a1=_5a0;
}
}
}
return _5a1;
};
Binding.prototype.migrateAction=function(_5a7){
var _5a8=null;
var _5a9=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a8&&node.nodeType!=Node.DOCUMENT_NODE){
_5a8=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a8){
_5a9=_5a8.dispatchAction(_5a7);
}else{
_5a9=_5a7;
}
}
return _5a9;
};
Binding.prototype.reflex=function(_5ab){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ab);
}
};
Binding.prototype.getMigrationParent=function(){
var _5ac=null;
if(true){
try{
var _5ad=this.bindingElement.parentNode;
if(_5ad!=null){
_5ac=_5ad;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5ac=null;
}
}
return _5ac;
};
Binding.prototype.add=function(_5ae){
if(_5ae.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5ae.bindingElement);
}else{
throw "Could not add "+_5ae.toString()+" of different document origin.";
}
return _5ae;
};
Binding.prototype.addFirst=function(_5af){
if(_5af.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5af.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5af.toString()+" of different document origin.";
}
return _5af;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b0,_5b1){
return BindingFinder.getAncestorBindingByLocalName(this,_5b0,_5b1);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b3){
return BindingFinder.getAncestorBindingByType(this,impl,_5b3);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b5){
return BindingFinder.getChildElementsByLocalName(this,_5b5);
};
Binding.prototype.getChildElementByLocalName=function(_5b6){
return this.getChildElementsByLocalName(_5b6).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b7){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b7));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b8){
return this.getDescendantBindingsByLocalName(_5b8,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b9){
return this.getChildBindingsByLocalName(_5b9).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5ba,_5bb){
return BindingFinder.getDescendantBindingsByLocalName(this,_5ba,_5bb);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5bc){
return this.getDescendantBindingsByLocalName(_5bc,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5bf){
return BindingFinder.getNextBindingByLocalName(this,_5bf);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c0){
return BindingFinder.getPreviousBindingByLocalName(this,_5c0);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c1){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c1);
};
Binding.prototype.isFirstBinding=function(_5c2){
return (this.getOrdinalPosition(_5c2)==0);
};
Binding.prototype.isLastBinding=function(_5c3){
return DOMUtil.isLastElement(this.bindingElement,_5c3);
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
Binding.prototype.setCallBackArg=function(_5c5){
this.setProperty(Binding.CALLBACKARG,_5c5);
};
Binding.prototype.dispose=function(_5c6){
if(!this.isDisposed){
if(!_5c6){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c7=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c7){
if(Client.isExplorer){
_5c7.outerHTML="";
}else{
_5c7.parentNode.removeChild(_5c7);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5ca){
list.add(_5ca);
});
list.each(function(_5cb){
self.unsubscribe(_5cb);
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
Binding.prototype.wakeUp=function(_5cd,_5ce){
_5ce=_5ce?_5ce:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5cd!==undefined){
self[_5cd]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5ce);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d0){
if(_5d0.response==null&&this.isLazy==true){
if(_5d0.id==DocumentCrawler.ID&&_5d0.mode==DocumentCrawler.MODE_REGISTER){
_5d0.response=NodeCrawler.NORMAL;
}else{
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d0.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d0.id)){
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d0.response==null){
switch(_5d0.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d1){
var _5d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d1);
return UserInterface.registerBinding(_5d2,Binding);
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
var _5d3=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d3.each(function(_5d4){
DataBinding.expressions[_5d4.Key]=new RegExp(_5d4.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d5){
var _5d6=null;
var _5d7=_5d5.getAncestorBindingByLocalName("field");
if(_5d7&&_5d7 instanceof FieldBinding){
var desc=_5d7.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d6=desc.getLabel();
}
}
return _5d6;
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
var _5da=this.bindingWindow.DataManager;
_5da.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5dc=this.bindingWindow.DataManager;
if(_5dc.getDataBinding(name)){
_5dc.unRegisterDataBinding(name);
}
_5dc.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5dd,arg){
RootBinding.superclass.handleBroadcast.call(this,_5dd,arg);
var _5df=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5dd){
case _5df:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5df);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e0){
var _5e1=_5e0?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e0!=this.isActivated){
this.isActivated=_5e0;
this.dispatchAction(_5e1);
var _5e2=new List();
var self=this;
this._activationawares.each(function(_5e4){
if(_5e4.isActivationAware){
try{
if(_5e0){
if(!_5e4.isActivated){
_5e4.onActivate();
}
}else{
if(_5e4.isActivated){
_5e4.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e2.add(_5e4);
}
}
});
_5e2.each(function(_5e5){
this._activationawares.del(_5e5);
});
_5e2.dispose();
}else{
var _5e6="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e6);
}else{
this.logger.error(_5e6);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e7,_5e8){
if(Interfaces.isImplemented(IActivationAware,_5e7,true)==true){
if(_5e8==false){
this._activationawares.del(_5e7);
}else{
this._activationawares.add(_5e7);
if(this.isActivated==true){
_5e7.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e7+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e9){
var _5ea=this.getMigrationParent();
if(_5ea!=null){
var root=_5ea.ownerDocument.body;
var _5ec=UserInterface.getBinding(root);
if(_5ec!=null){
_5ec.makeActivationAware(this,_5e9);
}
}
};
RootBinding.prototype.handleCrawler=function(_5ed){
RootBinding.superclass.handleCrawler.call(this,_5ed);
if(_5ed.type==NodeCrawler.TYPE_ASCENDING){
_5ed.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5ee=null;
if(this.bindingWindow.parent){
_5ee=this.bindingWindow.frameElement;
}
return _5ee;
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
StyleBinding.prototype.handleElement=function(_5ef){
return true;
};
StyleBinding.prototype.updateElement=function(_5f0){
var href=_5f0.getAttribute("link");
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
var _5f2=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5f2.hasNext()){
var cell=_5f2.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5f4){
var _5f5=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5f4.bindingElement);
_5f5=_5f4;
}else{
_5f5=MatrixBinding.superclass.add.call(this,_5f4);
}
return _5f5;
};
MatrixBinding.prototype.addFirst=function(_5f6){
var _5f7=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f8=this.shadowTree[MatrixBinding.CENTER];
_5f8.insertBefore(_5f6.bindingElement,_5f8.firstChild);
_5f7=_5f6;
}else{
_5f7=MatrixBinding.superclass.addFirst.call(this,_5f6);
}
return _5f6;
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
MatrixBinding.newInstance=function(_5fa){
var _5fb=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5fa);
return UserInterface.registerBinding(_5fb,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5fc,_5fd){
var list=new List();
var _5ff=new FlexBoxCrawler();
_5ff.mode=_5fd?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5ff.startBinding=_5fc;
_5ff.crawl(_5fc.bindingElement,list);
list.each(function(_600){
_600.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_601){
if(Binding.exists(_601)){
_601.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_602){
if(Binding.exists(_602)){
_602.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5ff.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_603){
FlexBoxBinding.superclass.handleAction.call(this,_603);
switch(_603.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_604){
var _605=0;
var _606=new List(this.bindingElement.parentNode.childNodes);
while(_606.hasNext()){
var _607=_606.getNext();
if(_607.nodeType==Node.ELEMENT_NODE&&_607!=this.bindingElement){
if(!this._isOutOfFlow(_607)){
var rect=_607.getBoundingClientRect();
if(_604){
height+=(rect.right-rect.left);
}else{
_605+=(rect.bottom-rect.top);
}
}
}
}
return _605;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_609){
var _60a=CSSComputer.getPosition(_609);
var _60b=CSSComputer.getFloat(_609);
return (_60a=="absolute"||_60b!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _60c=this.bindingElement.parentNode;
var rect=_60c.getBoundingClientRect();
var _60e=rect.bottom-rect.top;
var _60f=CSSComputer.getPadding(_60c);
var _610=CSSComputer.getBorder(_60c);
_60e-=(_60f.top+_60f.bottom);
_60e-=(_610.top+_610.bottom);
return _60e;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _611=this.bindingElement.parentNode;
var rect=_611.getBoundingClientRect();
var _613=rect.right-rect.left;
var _614=CSSComputer.getPadding(_611);
var _615=CSSComputer.getBorder(_611);
_613-=(_614.left+_614.right);
_613-=(_615.left+_615.right);
return _613;
};
FlexBoxBinding.prototype.setFlexibility=function(_616){
if(_616!=this.isFlexible){
if(_616){
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
this.isFlexible=_616;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _617=this._getSiblingsSpan();
_617=this._getCalculatedHeight()-_617;
if(!isNaN(_617)&&_617>=0){
this.bindingElement.style.height=String(_617)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_618){
if(!this.isFit||_618){
var _619=0;
new List(this.bindingElement.childNodes).each(function(_61a){
if(_61a.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_61a)){
var rect=_61a.getBoundingClientRect();
_619+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_619);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_61c){
var _61d=CSSComputer.getPadding(this.bindingElement);
var _61e=CSSComputer.getBorder(this.bindingElement);
_61c+=_61d.top+_61d.bottom;
_61c+=_61e.top+_61e.bottom;
this.bindingElement.style.height=_61c+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_61f){
ScrollBoxBinding.superclass.handleAction.call(this,_61f);
switch(_61f.type){
case BalloonBinding.ACTION_INITIALIZE:
_61f.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_620){
this.bindingElement.scrollLeft=_620.x;
this.bindingElement.scrollTop=_620.y;
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
var _621=this,_622=document.createElement("x");
_622.innerHTML=_621.responseText;
var uses=_622.querySelectorAll("use");
for(var i=0;i<uses.length;++i){
var use=uses[i];
var def=use.parentNode;
var hash=use.getAttribute("xlink:href").split("#")[1];
var _628=_622.querySelector("#"+hash);
if(_628){
var _629=_628.cloneNode(true);
_629.id=def.id;
def.parentNode.replaceChild(_629,def);
}
}
LabelBinding.sprites=_622;
LabelBinding.spriteLoading=false;
LabelBinding.spritesQueue.each(function(key,_62b){
var _62c=UserInterface.getBindingByKey(key);
if(_62c!=null){
LabelBinding.setImageSvg(_62c,_62b);
}
});
LabelBinding.spritesQueue.empty();
}
if(!LabelBinding.spriteLoading){
LabelBinding.spriteLoading=true;
var _62d=new XMLHttpRequest();
_62d.open("GET",Resolver.resolve(LabelBinding.SPRITE_PATH));
_62d.onload=onspriteload;
_62d.send();
}
};
LabelBinding.setImageSvg=function(_62e,_62f){
if(typeof _62f=="string"&&/^[A-Za-z]+[\w\-\.]*$/.test(_62f)){
if(_62e.shadowTree.labelBody){
if(!_62f){
if(_62e.shadowTree.svg){
if(_62e.shadowTree.svg.parentNode){
_62e.shadowTree.svg.parentNode.removeChild(_62e.shadowTree.svg);
}
_62e.shadowTree.svg=null;
}
}else{
if(LabelBinding.sprites){
var g=LabelBinding.sprites.querySelector("#"+_62f);
if(g){
var _631="http://www.w3.org/2000/svg";
if(!_62e.shadowTree.svg){
_62e.shadowTree.svg=_62e.bindingDocument.createElementNS(_631,"svg");
_62e.shadowTree.labelBody.insertBefore(_62e.shadowTree.svg,_62e.shadowTree.labelBody.firstChild);
}
_62e.shadowTree.svg.setAttribute("viewBox","0 0 24 24");
var _632=g.getAttribute("viewBox"),_633=document.createDocumentFragment(),_634=g.cloneNode(true);
if(_632){
_62e.shadowTree.svg.setAttribute("viewBox",_632);
}
_633.appendChild(_634);
_62e.shadowTree.svg.innerHTML="";
_62e.shadowTree.svg.appendChild(_633);
}
}else{
LabelBinding.spritesQueue.set(_62e.getID(),_62f);
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
var _635=this._getBuildElement("labeltext");
if(_635){
this.shadowTree.labelText=_635;
this.shadowTree.text=_635.firstChild;
this.hasLabel=true;
}
}else{
var _636=this.getProperty("label");
var _637=this.getProperty("image");
var _638=this.getProperty("tooltip");
if(_636){
this.setLabel(_636,false);
}
if(_637){
this.setImage(_637,false);
}
if(_638){
this.setToolTip(_638);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_639,_63a){
_639=_639!=null?_639:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_639);
this.setProperty("label",_639);
if(!_63a){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_63c){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _63d=Resolver.resolve(url);
if(_63d.classes){
this.setAlphaTransparentBackdrop();
this.setImageSvg();
this.setImageClasses(_63d.classes);
}else{
if(typeof _63d=="string"&&_63d[0]=="/"){
this.setAlphaTransparentBackdrop(_63d);
this.setImageSvg();
this.setImageClasses();
}else{
this.setAlphaTransparentBackdrop();
this.setImageSvg(_63d);
this.setImageClasses();
}
}
if(typeof _63d=="string"){
this.setProperty("image",url);
}
this.hasImage=true;
if(!_63c){
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
LabelBinding.prototype.setImageClasses=function(_63e){
if(this.shadowTree.labelBody){
if(!_63e){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_63e;
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
}else{
this.setProperty("ischecked",true);
}
}
};
ButtonBinding.prototype._check=function(_683){
this.isActive=true;
this.isChecked=true;
if(!_683){
this._stateManager.invokeActiveState();
}
this.setProperty("ischecked",true);
};
ButtonBinding.prototype.uncheck=function(_684){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_684==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",false);
}
}
};
ButtonBinding.prototype._uncheck=function(_685){
this.isActive=false;
this.isChecked=false;
if(!_685){
this._stateManager.invokeNormalState();
}
this.setProperty("ischecked",false);
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
ClickButtonBinding.newInstance=function(_69b){
var _69c=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_69b);
return UserInterface.registerBinding(_69c,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_69d){
var _69e=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_69d);
return UserInterface.registerBinding(_69e,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_69f){
var _6a0=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_69f);
return UserInterface.registerBinding(_6a0,CheckButtonBinding);
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
var _6a1=this.getDescendantBindingsByLocalName("control");
_6a1.each(function(_6a2){
_6a2.setControlType(_6a2.controlType);
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
ControlGroupBinding.newInstance=function(_6a4){
var _6a5=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6a4);
return UserInterface.registerBinding(_6a5,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6a8){
ControlBinding.superclass.handleAction.call(this,_6a8);
switch(_6a8.type){
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
function ControlImageProfile(_6a9){
this.binding=_6a9;
}
ControlImageProfile.prototype._getImage=function(_6aa){
var _6ab=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6ab=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6ab=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6ab=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6ab=this.constructor.IMAGE_CLOSE;
break;
}
return _6ab.replace("${string}",_6aa);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6ac=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6ac=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6ac?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6ad){
ControlBoxBinding.superclass.handleAction.call(this,_6ad);
switch(_6ad.type){
case ControlBinding.ACTION_COMMAND:
var _6ae=_6ad.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6ae);
Application.unlock(self);
},0);
_6ad.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6b0){
switch(_6b0.controlType){
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
ControlBoxBinding.prototype.setState=function(_6b1){
var _6b2=this.getState();
this.setProperty("state",_6b1);
this.detachClassName(_6b2);
this.attachClassName(_6b1);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6b3=this.getProperty("state");
if(!_6b3){
_6b3=ControlBoxBinding.STATE_NORMAL;
}
return _6b3;
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
MenuContainerBinding.prototype.isOpen=function(_6b4){
var _6b5=null;
if(!_6b4){
_6b5=this._isOpen;
}else{
_6b5=(_6b4==this._openElement);
}
return _6b5;
};
MenuContainerBinding.prototype.setOpenElement=function(_6b6){
if(_6b6){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6b6;
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
var _6b7=this.getChildBindingByLocalName("menupopup");
if(_6b7&&_6b7!=this.menuPopupBinding){
this.menuPopupBinding=_6b7;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6b8=this.getMenuContainerBinding();
_6b8.setOpenElement(this);
var _6b9=this.getMenuPopupBinding();
_6b9.snapTo(this.bindingElement);
_6b9.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6ba){
MenuContainerBinding.superclass.handleAction.call(this,_6ba);
if(_6ba.type==PopupBinding.ACTION_HIDE){
var _6bb=this.getMenuContainerBinding();
_6bb.setOpenElement(false);
this.reset();
_6ba.consume();
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
MenuBarBinding.prototype.handleAction=function(_6bc){
MenuBarBinding.superclass.handleAction.call(this,_6bc);
switch(_6bc.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6bd=_6bc.target;
var _6be=this.getChildBindingsByLocalName("menu");
while(_6be.hasNext()){
var menu=_6be.getNext();
}
switch(_6bd.arrowKey){
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
var _6c0=this.getProperty("image");
var _6c1=this.getProperty("label");
var _6c2=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6c1){
this.setLabel(_6c1);
}
if(_6c0){
this.setImage(_6c0);
}
if(_6c2){
this.setToolTip(_6c2);
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
MenuBinding.prototype.setLabel=function(_6c4){
this.setProperty("label",_6c4);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c4));
}
};
MenuBinding.prototype.setToolTip=function(_6c5){
this.setProperty("tooltip",_6c5);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c5));
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
var _6c7=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6c7.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6c7.isOpen()&&!_6c7.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6c7.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6c7.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6c8,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6c8){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6cd){
switch(_6cd.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6ce=null;
var _6cf=true;
self._lastFocused.focus();
self.grabKeyboard();
_6cd.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6d1){
for(var key in this._focused){
if(key!=_6d1.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6d1.key]=_6d1;
this._lastFocused=_6d1;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6d4){
delete this._focused[_6d4.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6d5){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6d5);
}
if(_6d5){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6d8=this.getChildBindingsByLocalName("menugroup");
var _6d9=null;
var _6da=null;
while(_6d8.hasNext()){
var _6db=_6d8.getNext();
if(!_6db.isDefaultContent){
_6db.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6d9&&_6db.isVisible){
_6d9=_6db;
}
if(_6db.isVisible){
_6da=_6db;
}
}
}
if(_6d9&&_6da){
_6d9.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6da.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6dc){
MenuBodyBinding.activeInstance=this;
if(_6dc){
var _6dd=this._getMenuItems().getFirst();
if(_6dd){
_6dd.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6de=this._lastFocused;
if((_6de!=null)&&(!_6de.isMenuContainer)){
_6de.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6e0=this._getMenuItems();
var _6e1=null;
var next=null;
if(this._lastFocused){
_6e1=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6e0.getPreceding(_6e1);
break;
case KeyEventCodes.VK_DOWN:
next=_6e0.getFollowing(_6e1);
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
next=_6e0.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6e4=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6e5){
_6e4=_6e5.getChildBindingsByLocalName("menuitem");
_6e4.each(function(item){
list.add(item);
});
});
_6e4=this.getChildBindingsByLocalName("menuitem");
_6e4.each(function(item){
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
MenuBodyBinding.newInstance=function(_6e8){
var _6e9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6e8);
return UserInterface.registerBinding(_6e9,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6ea){
switch(_6ea){
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
MenuGroupBinding.newInstance=function(_6eb){
var _6ec=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6eb);
return UserInterface.registerBinding(_6ec,MenuGroupBinding);
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
var _6ed=this.getProperty("image");
var _6ee=this.getProperty("image-hover");
var _6ef=this.getProperty("image-active");
var _6f0=this.getProperty("image-disabled");
if(!this.image&&_6ed){
this.image=_6ed;
}
if(!this.imageHover&&_6ee){
this.imageHover=_6ed;
}
if(!this.imageActive&&_6ef){
this.imageActive=_6ef;
}
if(!this.imageDisabled&&_6f0){
this.imageDisabled=_6f0;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6f1=this.getProperty("label");
var _6f2=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6f4=this.getProperty("isdisabled");
var _6f5=this.getProperty("image");
var _6f6=this.getProperty("image-hover");
var _6f7=this.getProperty("image-active");
var _6f8=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6f9=this.getMenuPopupBinding();
if(_6f9){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6f5){
this.image=_6f5;
}
if(!this.imageHover&&_6f6){
this.imageHover=_6f5;
}
if(!this.imageActive&&_6f7){
this.imageActive=_6f7;
}
if(!this.imageDisabled&&_6f8){
this.imageDisabled=_6f8;
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
if(_6f1!=null){
this.setLabel(_6f1);
}
if(_6f2){
this.setToolTip(_6f2);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6f4==true){
this.disable();
}
var _6fa=this.getProperty("oncommand");
if(_6fa){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6fa);
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
MenuItemBinding.prototype.setLabel=function(_6fd){
this.setProperty("label",_6fd);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6fd));
}
};
MenuItemBinding.prototype.setToolTip=function(_6fe){
this.setProperty("tooltip",_6fe);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6fe));
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
var _700=this.bindingDocument.createElement("div");
_700.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_700.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _701=this.labelBinding.bindingElement;
_701.insertBefore(_700,_701.firstChild);
_700.style.display="none";
this.shadowTree.checkBoxIndicator=_700;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _700=this.bindingDocument.createElement("div");
_700.className=MenuItemBinding.CLASSNAME_SUBMENU;
_700.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _701=this.labelBinding.bindingElement;
_701.insertBefore(_700,_701.firstChild);
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
var _703=this.imageProfile.getDisabledImage();
if(_703){
this.setImage(_703);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _703=this.imageProfile.getDefaultImage();
if(_703){
this.setImage(_703);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _705=this.getMenuContainerBinding();
if(_705.isOpen()&&!_705.isOpen(this)){
_705._openElement.hide();
_705.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _705=this.getMenuContainerBinding();
if(!_705.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_707){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _708=this.getMenuContainerBinding();
if(!_708||!_708.isOpen(this)||_707){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_709){
this.setChecked(true,_709);
};
MenuItemBinding.prototype.uncheck=function(_70a){
this.setChecked(false,_70a);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_70b,_70c){
this.setProperty("ischecked",_70b);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_70b){
this.isChecked=_70b;
this.shadowTree.checkBoxIndicator.style.display=_70b?"block":"none";
if(!_70c){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_70d){
var _70e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_70d);
UserInterface.registerBinding(_70e,MenuItemBinding);
return UserInterface.getBinding(_70e);
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
PopupSetBinding.newInstance=function(_70f){
var _710=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_70f);
return UserInterface.registerBinding(_710,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_711,arg){
switch(_711){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _715=PopupBinding.activeInstances.get(key);
var _716=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_715);
if(!_716){
list.add(_715);
}
});
list.each(function(_717){
_717.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _719=PopupBinding.activeInstances.get(key);
_719.hide();
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
var _71a=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _71b=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_71a){
this._bodyBinding=UserInterface.getBinding(_71a);
}else{
if(_71b){
this._bodyBinding=UserInterface.getBinding(_71b);
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
var _71c=this.getProperty("position");
this.position=_71c?_71c:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_71d){
var _71e=null;
if(this._bodyBinding){
this._bodyBinding.add(_71d);
_71e=_71d;
}else{
_71e=PopupBinding.superclass.add.call(this,_71d);
}
return _71e;
};
PopupBinding.prototype.addFirst=function(_71f){
var _720=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_71f);
_720=_71f;
}else{
_720=PopupBinding.superclass.addFirst.call(this,_71f);
}
return _720;
};
PopupBinding.prototype.handleAction=function(_721){
PopupBinding.superclass.handleAction.call(this,_721);
var _722=_721.target;
switch(_721.type){
case Binding.ACTION_ATTACHED:
if(_722 instanceof MenuItemBinding){
this._count(true);
_721.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_722 instanceof MenuItemBinding){
this._count(false);
_721.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_723){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_723?1:-1);
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
PopupBinding.prototype.snapTo=function(_724){
var _725=this._getElementPosition(_724);
switch(this.position){
case PopupBinding.POSITION_TOP:
_725.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_725.x+=_724.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_725.y+=_724.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_725.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_724;
this.bindingElement.style.display="block";
this.setPosition(_725.x,_725.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_727){
this.bindingElement.style.display="block";
this.setPosition(_727.x,_727.y);
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
PopupBinding.prototype._getElementPosition=function(_72c){
return _72c.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_72c):DOMUtil.getUniversalPosition(_72c);
};
PopupBinding.prototype._getMousePosition=function(e){
var _72e=DOMEvents.getTarget(e);
return _72e.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_72f){
var _730=this.bindingElement;
if(_72f){
_730.style.visibility="visible";
}else{
_730.style.visibility="hidden";
_730.style.display="none";
}
this.isVisible=_72f;
};
PopupBinding.prototype._enableTab=function(_731){
var self=this;
var _733=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_733.each(function(_734){
_734.bindingElement.tabIndex=_731?0:-1;
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
var _73c=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_73c.y<0){
y=-_73c.y;
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
PopupBinding.prototype.grabKeyboard=function(_73e){
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
var _744=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_744=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _744;
};
PopupBinding.prototype.clear=function(){
var _745=this._bodyBinding;
if(_745){
_745.detachRecursive();
_745.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_746){
var _747=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_746);
return UserInterface.registerBinding(_747,PopupBinding);
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
PopupBodyBinding.newInstance=function(_749){
var _74a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_749);
return UserInterface.registerBinding(_74a,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_74b){
return new Point(_74b.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_74c){
var _74d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_74c);
return UserInterface.registerBinding(_74d,MenuPopupBinding);
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
var _74e=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_74e){
this._body=UserInterface.getBinding(_74e);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _74f=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_74f.hasNext()){
var _750=DialogBorderBinding.newInstance(this.bindingDocument);
_750.setType(_74f.getNext());
this.add(_750);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _751=this.getProperty("controls");
if(_751){
var _752=new List(_751.split(" "));
while(_752.hasNext()){
var type=_752.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _754=DialogControlBinding.newInstance(this.bindingDocument);
_754.setControlType(type);
this._titlebar.addControl(_754);
this.controlBindings[type]=_754;
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
var _755=this.getProperty("image");
var _756=this.getProperty("label");
var _757=this.getProperty("draggable");
var _758=this.getProperty("resizable");
var _759=this.getProperty("modal");
if(_755){
this.setImage(_755);
}
if(_756){
this.setLabel(_756);
}
if(_757==false){
this.isDialogDraggable=false;
}
if(_758==false){
this.isPanelResizable=false;
}
if(_759==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_75a){
this.isModal=_75a;
};
DialogBinding.prototype.setLabel=function(_75b){
this.setProperty("label",_75b);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_75b));
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
DialogBinding.prototype.handleAction=function(_75d){
DialogBinding.superclass.handleAction.call(this,_75d);
switch(_75d.type){
case Binding.ACTION_DRAG:
var _75e=_75d.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_75e.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_75e.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_75e;
_75e.dragger.registerHandler(this);
}
break;
}
}
_75d.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_75d.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_75f,arg){
DialogBinding.superclass.handleBroadcast.call(this,_75f,arg);
switch(_75f){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_761){
DialogBinding.superclass.handleInvokedControl.call(this,_761);
switch(_761.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_762){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_762){
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
var _764=self.bindingElement;
setTimeout(function(){
_764.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_765){
this.bindingElement.style.zIndex=new String(_765);
};
DialogBinding.prototype.onDragStart=function(_766){
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
DialogBinding.prototype.setResizable=function(_778){
if(this._isResizable!=_778){
if(_778){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_778;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _779=null;
var _77a=this.bindingDocument.body.offsetWidth;
var _77b=this.bindingDocument.body.offsetHeight;
_779={x:0.125*_77a,y:0.125*_77b,w:0.75*_77a,h:0.5*_77b};
return _779;
};
DialogBinding.prototype.centerOnScreen=function(){
var _77c=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_77c.w-dim.w),0.5*(_77c.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _77e=this;
var i=0;
function blink(){
if(i%2==0){
_77e.detachClassName("active");
}else{
_77e.attachClassName("active");
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
var _782="";
while(list.hasNext()){
var type=list.getNext();
_782+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_782);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_783){
var _784=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_783);
return UserInterface.registerBinding(_784,DialogBinding);
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
DialogHeadBinding.newInstance=function(_785){
var _786=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_785);
return UserInterface.registerBinding(_786,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_789){
var _78a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_789);
return UserInterface.registerBinding(_78a,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_78b){
DialogSetBinding.superclass.handleAction.call(this,_78b);
var _78c=_78b.target;
switch(_78b.type){
case Binding.ACTION_MOVETOTOP:
if(_78c instanceof DialogBinding){
this._moveToTop(_78c);
}
break;
case Binding.ACTION_MOVEDONTOP:
_78b.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_78d){
var _78e=0;
var _78f=this.getChildBindingsByLocalName("dialog");
_78f.each(function(_790){
var _791=_790.getZIndex();
_78e=_791>_78e?_791:_78e;
});
_78d.setZIndex(_78e+2);
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
DialogBorderBinding.newInstance=function(_793){
var _794=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_793);
return UserInterface.registerBinding(_794,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_795){
this._dialogBinding=_795;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_797){
DialogCoverBinding.superclass.handleAction.call(this,_797);
var _798=_797.target;
if(this._dialogBinding.isModal){
switch(_797.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_798==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_798.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_799,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_799,arg);
switch(_799){
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
var _79c=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_79c);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _79d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_79d);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_79e){
var _79f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_79e);
return UserInterface.registerBinding(_79f,DialogCoverBinding);
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
var _7a0=this.getProperty("image");
if(_7a0){
this.setImage(_7a0);
}
var _7a1=this.getProperty("label");
if(_7a1){
this.setLabel(_7a1);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_7a2){
if(this.isAttached){
this.labelBinding.setLabel(_7a2);
}
this.setProperty("label",_7a2);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_7a4){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_7a4);
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
DialogTitleBarBinding.newInstance=function(_7a5){
var _7a6=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_7a5);
return UserInterface.registerBinding(_7a6,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7a7){
var _7a8=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7a7);
return UserInterface.registerBinding(_7a8,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7a9){
var _7aa=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a9);
return UserInterface.registerBinding(_7aa,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7ab){
this.binding=_7ab;
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
var _7ae=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7af=node.nodeName.toLowerCase();
switch(_7af){
case "script":
case "style":
case "textarea":
_7ae=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7ae;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7b6=true;
if(exp.test(text)){
self._textnodes.add(node);
_7b6=false;
}
return _7b6;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7b7,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7b7,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7bb=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7bb+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7c1){
var _7c2="";
var _7c3="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7c4="</span>";
var self=this;
function iterate(_7c6){
var _7c7=-1;
var _7c8=null;
self._map.each(function(key,exp){
var low=_7c6.toLowerCase();
var _7cc=low.search(exp);
if(_7cc>-1){
if(_7c7==-1){
_7c7=_7cc;
}
if(_7cc<=_7c7){
_7c7=_7cc;
_7c8=key;
}
}
});
if(_7c7>-1&&_7c8!=null){
var pre=_7c6.substring(0,_7c7);
var hit=_7c6.substring(_7c7,_7c7+_7c8.length);
var pst=_7c6.substring(_7c7+_7c8.length,_7c6.length);
_7c2+=pre+_7c3+hit+_7c4;
iterate(pst);
}else{
_7c2+=_7c6;
}
}
iterate(_7c1);
return _7c2;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7d0){
var _7d1=new List(_7d0.getElementsByTagName("span"));
_7d1.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7d0.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7d4){
var _7d5=null;
if(_7d4.isAttached){
var doc=_7d4.getContentDocument();
if(doc!=null){
_7d5=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7d5,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7d5=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7d5 instanceof SOAPFault){
_7d5=null;
}
}
}
}
return _7d5;
};
WindowBinding.highlightKeywords=function(_7d9,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d9.isAttached){
var doc=_7d9.getContentDocument();
if(doc!=null){
var _7dc=WindowBinding._highlightcrawler;
_7dc.reset(doc.body);
if(list!=null){
_7dc.setKeys(list);
_7dc.crawl(doc.body);
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
var _7dd=WindowBinding.superclass.serialize.call(this);
if(_7dd){
_7dd.url=this.getURL();
}
return _7dd;
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
var _7df=this.getContentWindow().DocumentManager;
if(_7df!=null){
_7df.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7e0){
WindowBinding.superclass.handleAction.call(this,_7e0);
var _7e1=_7e0.target;
switch(_7e0.type){
case RootBinding.ACTION_PHASE_3:
if(_7e1.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7e1);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7e0.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7e2){
if(!this.isFit||_7e2){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7e3){
if(this._pageBinding==null){
if(_7e3.bindingWindow==this.getContentWindow()){
this._pageBinding=_7e3;
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
WindowBinding.prototype._registerOnloadListener=function(_7e4){
var _7e5=this.shadowTree.iframe;
var _7e6=_7e4?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e9=true;
if(Client.isExplorer){
_7e9=_7e5.readyState=="complete";
}
if(_7e9==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7e6](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7ea){
var _7eb=_7ea?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7eb](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7f0=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7f0.getQueryString().each(function(name,_7f2){
if(_7f2.length>512){
data.set(name,_7f2);
_7f0.setParam(name,null);
}
});
url=_7f0.toString();
}
if(data){
var self=this;
var _7f4=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7f4.id;
form.setAttribute("target",_7f4.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7f7){
var _7f8=self.bindingDocument.createElement("input");
_7f8.name=name;
_7f8.value=_7f7;
_7f8.type="hidden";
form.appendChild(_7f8);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f9=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f9=url;
}
return _7f9;
};
WindowBinding.prototype.reload=function(_7fb){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7fc=null;
if(this.shadowTree.iframe!=null){
_7fc=this.shadowTree.iframe;
}
return _7fc;
};
WindowBinding.prototype.getContentWindow=function(){
var _7fd=null,_7fe=this.getFrameElement();
if(_7fe!==null){
try{
_7fd=_7fe.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7fd;
};
WindowBinding.prototype.getContentDocument=function(){
var _7ff=null,win=this.getContentWindow();
if(win){
_7ff=win.document;
}
return _7ff;
};
WindowBinding.prototype.getRootBinding=function(){
var _801=null,doc=this.getContentDocument();
if(doc&&doc.body){
_801=UserInterface.getBinding(doc.body);
}
return _801;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_803){
this.bindingElement.style.height=_803+"px";
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
WindowBinding.prototype.handleCrawler=function(_804){
WindowBinding.superclass.handleCrawler.call(this,_804);
if(_804.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_804.nextNode=root.bindingElement;
}else{
_804.response=NodeCrawler.SKIP_CHILDREN;
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
var _809=this.getContentWindow();
if(_809!=null&&_809.document!=null&&_809.document.body!=null){
if(this.bindingElement.offsetHeight){
_809.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_809.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_80a){
var _80b=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_80a);
var _80c=UserInterface.registerBinding(_80b,WindowBinding);
return _80c;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_810){
_810.target.show();
_810.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_812){
_812.target.show();
_812.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_814){
PreviewWindowBinding.superclass.handleAction.call(this,_814);
switch(_814.type){
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
var _815=null;
this._getRadioButtonBindings().each(function(_816){
if(_816.getProperty("ischecked")){
_815=_816;
return false;
}else{
return true;
}
});
if(_815){
this._checkedRadioBinding=_815;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_817){
RadioGroupBinding.superclass.handleAction.call(this,_817);
var _818=_817.target;
switch(_817.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_817.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_818.isRadioButton&&!_818.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_818);
}
this._checkedRadioBinding=_818;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_817.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_819,_81a){
if(_819 instanceof RadioDataBinding){
_819=_819.getButton();
}
if(_819.isRadioButton){
switch(_81a){
case true:
this._unCheckRadioBindingsExcept(_819);
this._checkedRadioBinding=_819;
_819.check(true);
break;
default:
_819.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_81b){
var _81c=this._getRadioButtonBindings();
_81c.each(function(_81d){
if(_81d.isChecked&&_81d!=_81b){
_81d.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _81e=new Crawler();
var list=new List();
_81e.addFilter(function(_820){
var _821=true;
var _822=UserInterface.getBinding(_820);
if(_822 instanceof RadioGroupBinding){
_821=NodeCrawler.SKIP_CHILDREN;
}else{
if(_822 instanceof ButtonBinding&&_822.isRadioButton){
list.add(_822);
}
}
return _821;
});
_81e.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_823){
var _824=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_823);
return UserInterface.registerBinding(_824,RadioGroupBinding);
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
var _826=this.getProperty("regexrule");
if(_826!=null){
this.expression=new RegExp(_826);
}
var _827=this.getProperty("onbindingblur");
if(_827!=null){
this.onblur=function(){
Binding.evaluate(_827,this);
};
}
var _828=this.getProperty("onvaluechange");
if(_828!=null){
this.onValueChange=function(){
Binding.evaluate(_828,this);
};
}
if(this.error==null&&this.type!=null){
var _829=DataBinding.errors[this.type];
if(_829!=null){
this.error=_829;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _82a=this.getProperty("value");
if(_82a!=null){
this.setValue(String(_82a));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _82c=this.getProperty("isdisabled");
if(_82c==true){
this.setDisabled(true);
}
var _82d=this.getProperty("readonly");
if(_82d==true){
this.setReadOnly(true);
}
var _82e=this.getProperty("autoselect");
if(_82e==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _82f=this.getProperty("placeholder");
if(_82f){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_82f));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _830=Localization.currentLang();
if(_830!=null){
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
var _831=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_831.type=this.isPassword==true?"password":"text";
_831.tabIndex=-1;
return _831;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_834){
if(_834){
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
DataInputBinding.prototype.focus=function(_836){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_836){
var self=this,_838=this.bindingElement,_839={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_838,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_838,DOMEvents.MOUSEUP,_839);
}else{
this.select();
}
}
this.onfocus();
if(!_836){
var _83a=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_83a);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _83b=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _83c=_83b.createTextRange();
_83c.moveStart("character",0);
_83c.moveEnd("character",_83b.value.length);
_83c.select();
}else{
_83b.setSelectionRange(0,_83b.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_83d){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_83d){
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
DataInputBinding.prototype.validate=function(_841){
if(_841==true||this._isValid){
var _842=this.isValid();
if(_842!=this._isValid){
this._isValid=_842;
if(!_842){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _843=null;
if(this._isInvalidBecauseRequired==true){
_843=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_843=DataBinding.warnings["minlength"];
_843=_843.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_843=DataBinding.warnings["maxlength"];
_843=_843.replace("${count}",String(this.maxlength));
}else{
_843=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_843!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_843);
}
}else{
this.setValue(_843);
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
var _844=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _845=this.getValue();
if(_845==""){
if(this.isRequired==true){
_844=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _846=DataBinding.expressions[this.type];
if(!_846.test(_845)){
_844=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_845)){
_844=false;
}
}
}
}
if(_844&&this.minlength!=null){
if(_845.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_844=false;
}
}
if(_844&&this.maxlength!=null){
if(_845.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_844=false;
}
}
return _844;
};
DataInputBinding.prototype.setDisabled=function(_847){
if(_847!=this.isDisabled){
if(_847){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _848=this.shadowTree.input;
if(_847){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_848,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_848,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_847;
this.shadowTree.input.unselectable=_847?"on":"off";
}
this.isDisabled=_847;
this.isFocusable=!_847;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_84a){
if(_84a!=this.isReadOnly){
if(_84a){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_84a;
this.isReadOnly=_84a;
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
DataInputBinding.prototype.handleElement=function(_84b){
return true;
};
DataInputBinding.prototype.updateElement=function(_84c){
var _84d=_84c.getAttribute("value");
var _84e=_84c.getAttribute("type");
var _84f=_84c.getAttribute("maxlength");
var _850=_84c.getAttribute("minlength");
var _851=_84c.getAttribute("required")==="true";
if(_84d==null){
_84d="";
}
var _852=this.bindingWindow.UpdateManager;
if(this.getValue()!=_84d){
_852.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_84d);
}
if(this.type!=_84e){
_852.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_84e;
}
if(this.maxlength!=_84f){
_852.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_84f;
}
if(this.minlength!=_850){
_852.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_850;
}
if(this.isRequired!=_851){
_852.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_851;
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
DataInputBinding.prototype.setValue=function(_853){
if(_853===null){
_853="";
}
if(_853!=this.getValue()){
this.setProperty("value",_853);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_853);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _854=null;
if(this.shadowTree.input!=null){
_854=this.shadowTree.input.value;
}else{
_854=this.getProperty("value");
}
return _854;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _856=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_856=Number(_856);
break;
}
return _856;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_857){
var _858=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_857);
return UserInterface.registerBinding(_858,DataInputBinding);
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
var _859=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_859!=null){
this.setValue(_859.value);
_859.parentNode.removeChild(_859);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _85a;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_85a=div.firstChild;
}else{
_85a=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_85a.tabIndex=-1;
return _85a;
};
TextBoxBinding.prototype.handleElement=function(_85c){
return true;
};
TextBoxBinding.prototype.updateElement=function(_85d){
var _85e,area=_85d.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_85e=DOMUtil.getTextContent(area);
}
if(_85e==null){
_85e="";
}
var _860=this.bindingWindow.UpdateManager;
if(this.getValue()!=_85e){
_860.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_85e);
}
var _861=_85d.getAttribute("type");
if(this.type!=_861){
_860.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_861;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_865){
var _866=this.bindingDocument.selection.createRange();
var _867=_866.text=="";
if(_867&&!_865){
_866.text="\t";
}else{
var text="";
var _869=_866.text.length;
while((_866.moveStart("word",-1)&&_866.text.charAt(1)!="\n")){
}
_866.moveStart("character",1);
var _86a=0;
var i=0,line,_86d=_866.text.split("\n");
while((line=_86d[i++])!=null){
if(_865){
line=line.replace(/^(\s)/mg,"");
_86a++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_86d[i+1]?"\n":"");
}
_866.text=text;
_866.moveStart("character",-_869);
if(_865){
_866.moveStart("character",2*_86d.length-2);
}
_866.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86e=this.bindingDocument.selection.createRange();
var _86f=_86e.duplicate();
while((_86f.moveStart("word",-1)&&_86f.text.indexOf("\n")==-1)){
}
_86f.moveStart("character",1);
_86e.text="\n"+_86f.text.match(/^(\s)*/)[0]+"!";
_86e.moveStart("character",-1);
_86e.select();
_86e.text="";
_86e.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_870){
var _871;
var _872;
var oss;
var osy;
var i;
var fnd;
var _877=this._getSelectedText();
var el=this.shadowTree.input;
_871=el.scrollLeft;
_872=el.scrollTop;
if(!_877.match(/\n/)){
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
_877=this._getSelectedText();
if(_870){
ntext=_877.replace(/^(\s)/mg,"");
}else{
ntext=_877.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_877.length);
}
el.scrollLeft=_871;
el.scrollTop=_872;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _879;
var _87a;
var oss;
var osy;
var el=this.shadowTree.input;
_879=el.scrollLeft;
_87a=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_879;
el.scrollTop=_87a;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _881=this.shadowTree.input.value;
var _882=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _881.substr(_882,end-_882);
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
var _884=this.getProperty("isdisabled");
if(this.isDisabled||_884){
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
var _886=this.getProperty("label");
var _887=this.getProperty("value");
var _888=this.getProperty("width");
var _889=this.getProperty("onchange");
var _88a=this.getProperty("required")==true;
var _88b=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_886!=null){
this.label=_886;
}
if(!this.value&&_887!=null){
this.value=_887;
}
if(!this.width&&_888){
this.width=_888;
}
if(_88a){
this.isRequired=true;
}
if(_88b){
this._isLocal=true;
}
if(_889){
this.onValueChange=function(){
Binding.evaluate(_889,this);
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
var _88c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_88c.name=this.getName();
_88c.value=this.getValue();
_88c.type="hidden";
if(this.hasCallBackID()){
_88c.id=this.getCallBackID();
}
this.shadowTree.input=_88c;
this.bindingElement.appendChild(_88c);
};
SelectorBinding.prototype.buildButton=function(){
var _88d=this.BUTTON_IMPLEMENTATION;
var _88e=this.add(_88d.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_88e.imageProfile=this.imageProfile;
}
if(this.width!=null){
_88e.setWidth(this.width);
}
this._buttonBinding=_88e;
this.shadowTree.button=_88e;
_88e.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _88f;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _890=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_890.id="selectorpopupset";
_88f=UserInterface.registerBinding(_890,PopupSetBinding);
this.bindingDocument.body.appendChild(_88f.bindingElement);
}else{
_88f=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_88f=top.app.bindingMap.selectorpopupset;
}
var doc=_88f.bindingDocument;
var _892=_88f.add(PopupBinding.newInstance(doc));
var _893=_892.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_892;
this._menuBodyBinding=_893;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_892.attachClassName("selectorpopup");
_892.addActionListener(PopupBinding.ACTION_SHOW,this);
_892.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_892.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_892);
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
var _896=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_896).each(function(_897){
var _898=_897.getAttribute("label");
var _899=_897.getAttribute("value");
var _89a=_897.getAttribute("selected");
var _89b=_897.getAttribute("image");
var _89c=_897.getAttribute("image-hover");
var _89d=_897.getAttribute("image-active");
var _89e=_897.getAttribute("image-disabled");
var _89f=null;
if(_89b||_89c||_89d||_89e){
_89f=new ImageProfile({image:_89b,imageHover:_89c,imageActive:_89d,imageDisabled:_89e});
}
list.add(new SelectorBindingSelection(_898?_898:null,_899?_899:null,_89a&&_89a=="true",_89f));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _8a1=null;
while(list.hasNext()){
var _8a2=list.getNext();
var item=this.addSelection(_8a2);
if(_8a2.isSelected){
this.select(item,true);
}
if(!_8a1){
_8a1=item;
}
}
if(!this._selectedItemBinding){
this.select(_8a1,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8a4,_8a5){
var _8a6=this.MENUITEM_IMPLEMENTATION;
var _8a7=this._menuBodyBinding;
var _8a8=_8a7.bindingDocument;
var _8a9=_8a6.newInstance(_8a8);
_8a9.imageProfile=_8a4.imageProfile;
_8a9.setLabel(_8a4.label);
if(_8a4.tooltip!=null){
_8a9.setToolTip(_8a4.tooltip);
}
_8a9.selectionValue=_8a4.value;
_8a4.menuItemBinding=_8a9;
if(_8a5){
_8a7.addFirst(_8a9);
this.selections.addFirst(_8a4);
}else{
_8a7.add(_8a9);
this.selections.add(_8a4);
}
this._isUpToDate=false;
return _8a9;
};
SelectorBinding.prototype.addSelectionFirst=function(_8aa){
return this.addSelection(_8aa,true);
};
SelectorBinding.prototype.clear=function(_8ab){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8ab&&this.defaultSelection!=null){
var _8ac=this.addSelection(this.defaultSelection);
this.select(_8ac,true);
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
SelectorBinding.prototype.setDisabled=function(_8ad){
if(this.isAttached==true){
var _8ae=this._buttonBinding;
_8ae.setDisabled(_8ad);
}
if(_8ad){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8af){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8af);
}
};
SelectorBinding.prototype.handleAction=function(_8b0){
SelectorBinding.superclass.handleAction.call(this,_8b0);
switch(_8b0.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8b0.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8b0.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8b0.target);
_8b0.consume();
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
_8b0.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8b2){
this.select(_8b2);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8b3=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8b4=this._popupBinding.bindingElement;
_8b4.style.minWidth=_8b3;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8b6=Client.isExplorer?e.keyCode:e.which;
if(_8b6==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8b6=Client.isExplorer?e.keyCode:e.which;
if(_8b6>=32){
this._buttonBinding.check();
var _8b7=String.fromCharCode(_8b6);
this._pushSearchSelection(_8b7);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8b8){
this._searchString+=_8b8.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b9){
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
var _8ba=this._menuBodyBinding;
if(_8ba!=null){
var _8bb=this.MENUITEM_IMPLEMENTATION;
var _8bc=_8ba.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8be=list.getNext();
if(_8be.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8be);
}
}
}
this._attachSelections();
var _8bf=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8c0=_8ba.getDescendantBindingsByType(_8bb);
if(_8c0.hasEntries()){
while(_8c0.hasNext()){
var _8c1=_8c0.getNext();
var _8c2=_8c1.labelBinding;
if(_8c2!=null&&_8c2.shadowTree!=null&&_8c2.shadowTree.labelText!=null){
_8c2.shadowTree.labelText.innerHTML=_8c2.shadowTree.labelText.innerHTML.replace(_8bf,"<b>$&</b>");
}
}
_8c0.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8c2=LabelBinding.newInstance(_8bc);
_8c2.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8ba.add(_8c2);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8be=list.getNext();
var item=this.addSelection(_8be);
if(this._selectionValue==_8be.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8c4,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8c4,arg);
switch(_8c4){
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
SelectorBinding.prototype.select=function(_8c7,_8c8){
var _8c9=false;
if(_8c7!=this._selectedItemBinding){
this._selectedItemBinding=_8c7;
_8c9=true;
var _8ca=this._buttonBinding;
this._selectionValue=_8c7.selectionValue;
this._selectionLabel=_8c7.getLabel();
_8ca.setLabel(_8c7.getLabel());
if(_8c7.imageProfile!=null){
_8ca.imageProfile=_8c7.imageProfile;
}
if(_8ca.imageProfile!=null){
_8ca.setImage(this.isDisabled==true?_8ca.imageProfile.getDisabledImage():_8ca.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8c8){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8c8)){
this.validate();
}
}
return _8c9;
};
SelectorBinding.prototype._relate=function(){
var _8cb=this.getProperty("relate");
if(_8cb){
var _8cc=this.bindingDocument.getElementById(_8cb);
if(_8cc){
var _8cd=UserInterface.getBinding(_8cc);
if(_8cd){
if(this.isChecked){
_8cd.show();
}else{
_8cd.hide();
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
SelectorBinding.prototype.selectByValue=function(_8ce,_8cf){
var _8d0=false;
var _8d1=this._menuBodyBinding;
var _8d2=_8d1.getDescendantElementsByLocalName("menuitem");
while(_8d2.hasNext()){
var _8d3=UserInterface.getBinding(_8d2.getNext());
if(_8d3.selectionValue==_8ce){
_8d0=this.select(_8d3,_8cf);
break;
}
}
return _8d0;
};
SelectorBinding.prototype.getValue=function(){
var _8d4=this._selectionValue;
if(_8d4!=null){
_8d4=String(_8d4);
}
return _8d4;
};
SelectorBinding.prototype.setValue=function(_8d5){
this.selectByValue(String(_8d5),true);
};
SelectorBinding.prototype.getResult=function(){
var _8d6=this._selectionValue;
if(_8d6=="null"){
_8d6=null;
}
if(_8d6){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8d6=Number(_8d6);
break;
}
}
return _8d6;
};
SelectorBinding.prototype.setResult=function(_8d7){
this.selectByValue(_8d7,true);
};
SelectorBinding.prototype.validate=function(){
var _8d8=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d9=this.getValue();
if(_8d9==this.defaultSelection.value){
_8d8=false;
}
if(_8d8!=this._isValid){
if(_8d8){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8d8;
}
return _8d8;
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
var _8da=this._popupBinding;
if(!this._isUpToDate){
_8da.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8db,_8dc){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8db));
return true;
};
SelectorBinding.newInstance=function(_8dd){
var _8de=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8dd);
return UserInterface.registerBinding(_8de,SelectorBinding);
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
var _8e1=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8e1){
this.onValueChange=function(){
Binding.evaluate(_8e1,this);
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
SimpleSelectorBinding.prototype.focus=function(_8e4){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8e4){
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
SimpleSelectorBinding.prototype._hack=function(_8e5){
if(Client.isExplorer){
this._select.style.width=_8e5?"auto":this._cachewidth+"px";
if(_8e5){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8e6=true;
if(this.isRequired){
if(this.getValue()==null){
_8e6=false;
}
}
if(_8e6!=this._isValid){
if(_8e6){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8e7=this._select;
var _8e8=_8e7.options[_8e7.selectedIndex];
var text=DOMUtil.getTextContent(_8e8);
_8e7.blur();
_8e7.style.color="#A40000";
_8e7.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e8,DataBinding.warnings["required"]);
}
_8e7.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e8,text);
}
};
}
this._isValid=_8e6;
}
return _8e6;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8ea=null;
var _8eb=this._select;
var _8ec=_8eb.options[_8eb.selectedIndex];
var _8ed=true;
if(Client.isExplorer){
var html=_8ec.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8ed=false;
}
}
if(_8ed){
_8ea=_8ec.getAttribute("value");
}
return _8ea;
};
SimpleSelectorBinding.prototype.setValue=function(_8ef){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8f0){
this.setValue(_8f0);
};
SimpleSelectorBinding.newInstance=function(_8f1){
var _8f2=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8f1);
return UserInterface.registerBinding(_8f2,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8f3,_8f4,_8f5,_8f6,_8f7){
this._init(_8f3,_8f4,_8f5,_8f6,_8f7);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8f8,_8f9,_8fa,_8fb,_8fc){
if(_8f8!=null){
this.label=String(_8f8);
}
if(_8f9!=null){
this.value=String(_8f9);
}
if(_8fb!=null){
this.imageProfile=_8fb;
}
if(_8fc!=null){
this.tooltip=_8fc;
}
this.isSelected=_8fa?true:false;
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
var _8fd=this.getProperty("image");
if(_8fd){
this.setImage(_8fd);
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
var _900=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_900.popupBindingTargetElement=this.shadowTree.input;
_900.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_900.attach();
var self=this;
_900.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_900;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _903=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_903).each(function(_904){
if(_904.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _905=_904.getAttribute("value");
var _906=_904.getAttribute("selected");
var _907=_904.getAttribute("tooltip");
list.add({value:_905?_905:null,toolTip:_907?_907:null,isSelected:(_906&&_906=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _909=this._menuBodyBinding;
var _90a=_909.bindingDocument;
while(_909.bindingElement.hasChildNodes()){
var node=_909.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_909.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _90c=this.getProperty("emptyentrylabel");
if(_90c){
var _90d=MenuItemBinding.newInstance(_90a);
_90d.setLabel(_90c);
_90d.selectionValue="";
_909.add(_90d);
}
while(list.hasNext()){
var _90e=list.getNext();
var _90d=MenuItemBinding.newInstance(_90a);
_90d.setLabel(_90e.label?_90e.label:_90e.value);
_90d.selectionValue=_90e.value;
if(_90e.image){
_90d.setImage(_90e.image);
}
if(_90e.toolTip){
_90d.setToolTip(_90e.toolTip);
}
if(_90e.isSelected){
this.select(_90d,true);
}
_909.add(_90d);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_90f){
this.select(_90f);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_910,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_910,arg);
switch(_910){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_910,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_912){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_912);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_913){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_913);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _914=this.bindingElement.offsetWidth+"px";
var _915=this._popupBinding.bindingElement;
_915.style.minWidth=_914;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _916=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _917=this.getValue();
var _918=null;
_916.each(function(item){
if(item.getLabel()==_917){
_918=item;
}
});
if(_918){
_918.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_91b){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_91b){
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
DataInputSelectorBinding.prototype.setValue=function(_91c){
var _91d=this.isReadOnly;
var _91e=null;
if(_91c!=null&&_91c!=""){
var _91f=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_91f.hasNext()){
var item=_91f.getNext();
if(item.selectionValue==_91c){
_91e=item.getLabel();
break;
}
}
}
if(_91e!=null){
this.value=_91c;
this.shadowTree.input.value=_91e;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_91c);
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
var _922="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_922);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_922);
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
var _924=ToolBarButtonBinding.newInstance(this.bindingDocument);
_924.setImage("${icon:popup}");
this.addFirst(_924);
_924.attach();
var self=this;
_924.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _926=self.getProperty("handle");
var _927=ViewDefinition.clone(_926,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_927 instanceof DialogViewDefinition){
_927.handler={handleDialogResponse:function(_928,_929){
self._isButtonClicked=false;
if(_928==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _92a=_929.getFirst();
self.setValue(_92a);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_927.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_927);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_924.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_924;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _92c=this._dialogButtonBinding;
if(_92c!=null){
_92c.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _92e=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_92e=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _92e;
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
var _931=ToolBarButtonBinding.newInstance(this.bindingDocument);
_931.setImage("${icon:editor-sourceview}");
_931.bindingElement.style.left="-24px";
_931.bindingElement.style.width="24px";
this.addFirst(_931);
_931.attach();
_931.hide();
var self=this;
_931.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_931;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_932){
UrlInputDialogBinding.superclass.setValue.call(this,_932);
if(this.isAttached){
this.compositeUrl=new Uri(_932);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _933=TreeService.GetCompositeUrlLabel(_932);
if(_933!=_932){
this.setLabel(_933);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_934){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_934){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_934;
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
var _935=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _936=this.getProperty("image");
if(_936!=null){
_935.setImage(_936);
}else{
_935.setImage("${icon:popup}");
}
this.addFirst(_935);
_935.attach();
var self=this;
_935.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_935;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _938=this._dialogButtonBinding;
if(_938!=null){
_938.oncommand();
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
var _939=this.getProperty("required")==true;
if(_939){
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
var _93a=this.getProperty("label");
var _93b=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_93a!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_93a+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_93a);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_93b!=null){
this._buttonBinding.setToolTip(_93b);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _93c="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_93c,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _93e=g.getAttribute("viewBox"),_93f=document.createDocumentFragment(),_940=g.cloneNode(true);
if(_93e){
this.shadowTree.indicatorimage.setAttribute("viewBox",_93e);
}
_93f.appendChild(_940);
this.shadowTree.indicatorimage.appendChild(_93f);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_941){
DataDialogBinding.superclass.handleAction.call(this,_941);
var _942=_941.target;
var self=this;
switch(_941.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_944,_945){
if(_944==Dialog.RESPONSE_ACCEPT){
if(_945 instanceof DataBindingMap){
self._map=_945;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_942==this._buttonBinding){
_941.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_946,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_946,arg);
switch(_946){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _949=this.getProperty("handle");
var url=this.getURL();
var _94b=null;
if(_949!=null||def!=null){
if(def!=null){
_94b=def;
}else{
_94b=ViewDefinitions[_949];
}
if(_94b instanceof DialogViewDefinition){
_94b.handler=this._handler;
if(this._map!=null){
_94b.argument=this._map;
}
StageBinding.presentViewDefinition(_94b);
}
}else{
if(url!=null){
_94b=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_94b!=null){
this._dialogViewHandle=_94b.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_94c){
this.setProperty("label",_94c);
if(this.isAttached){
this._buttonBinding.setLabel(_94c+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_94d){
this.setProperty("image",_94d);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_94d);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_94e){
this.setProperty("tooltip",_94e);
if(this.isAttached){
this._buttonBinding.setToolTip(_94e);
}
};
DataDialogBinding.prototype.setHandle=function(_94f){
this.setProperty("handle",_94f);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_951){
this._handler=_951;
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
var _952=true;
if(this.isRequired==true){
var _953=this.getValue();
if(_953==null||_953==""){
_952=false;
}
if(_952!=this._isValid){
if(_952){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_952;
}
return _952;
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
DataDialogBinding.newInstance=function(_955){
var _956=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_955);
return UserInterface.registerBinding(_956,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_958,_959){
if(_958==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_959);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_95a){
_95a=new String(_95a);
this.dirty();
this.setValue(encodeURIComponent(_95a));
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
var _95e=this.getValue();
if(_95e==null){
_95e="";
}
this.shadowTree.dotnetinput.value=_95e;
};
PostBackDataDialogBinding.prototype.setValue=function(_95f){
this.setProperty("value",_95f);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_960){
};
PostBackDataDialogBinding.newInstance=function(_961){
var _962=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_961);
return UserInterface.registerBinding(_962,PostBackDataDialogBinding);
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
var _963=this.getProperty("dialoglabel");
var _964=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _966=this.getProperty("handle");
var _967=this.getProperty("selectedtoken");
if(_966!=null){
var def=ViewDefinition.clone(_966,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_963!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_963;
}
if(_964!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_964;
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
if(_967!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_967;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_969){
var _96a=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_969);
return UserInterface.registerBinding(_96a,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_96c){
self._datathing.setValue(_96c);
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
var _96f=self.getValue();
if(_96f==""||_96f==null){
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
var _970=this.getProperty("value");
var _971=this.getProperty("selectorlabel");
if(_971==null){
_971=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_970==null));
list.add(new SelectorBindingSelection(_971+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_970!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _970=this.getValue();
if(_970==""||_970==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_973){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_973);
switch(_973.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_973.target==this._datathing){
var _974=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_974){
self._selector.setLabel(_974);
}
},500);
_973.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_976){
this.setProperty("label",_976);
if(this._selector!=null){
this._selector.setLabel(_976);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_977){
this._datathing.setValue(_977);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_979,_97a){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_979,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_97b){
this._buttonBinding.setLabel(_97b);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_97c){
this._buttonBinding.setToolTip(_97c);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_97d){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_97d);
switch(_97d.type){
case MenuItemBinding.ACTION_COMMAND:
var _97e=_97d.target;
var _97f=this.master;
if(_97e.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_97e.getLabel());
setTimeout(function(){
_97f.action();
},0);
}else{
if(_97f.getValue()){
_97f.dirty();
}
_97f.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_980){
var _981=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_980);
return UserInterface.registerBinding(_981,NullPostBackDataDialogSelectorBinding);
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
var _982=this._dataDialogBinding;
if(_982!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_982.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _983=this.getProperty("editable");
var _984=this.getProperty("selectable");
var _985=this.getProperty("display");
if(_983!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_984){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_985){
this._display=_985;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _986=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_986.selections=this.selections;
this.add(_986);
_986.attach();
this._dataDialogBinding=_986;
this.shadowTree.datadialog=_986;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _988=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _989=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_988=_989.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_988=_989.isSelected!=true;
break;
}
if(_988){
this.shadowTree.box.appendChild(this._getElementForSelection(_989));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_98b){
var box=this.shadowTree.box;
var _98d=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _98e=list.getNext();
if(_98b){
_98e.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_98d=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_98d=_98e.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_98d=_98e.isSelected!=true;
break;
}
}
if(_98d){
var _98f=this._getElementForSelection(_98e);
box.insertBefore(_98f,box.firstChild);
CSSUtil.attachClassName(_98f,"selected");
this._selectionMap.set(_98e.value,_98f);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_990){
var _991=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_991.appendChild(this.bindingDocument.createTextNode(_990.label));
_991.setAttribute("label",_990.label);
_991.setAttribute("value",_990.value);
return _991;
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
var _993=DOMEvents.getTarget(e);
var _994=DOMUtil.getLocalName(_993);
if(_994=="div"){
this._handleMouseDown(_993);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_995){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _996=this._getElements();
var _997=_995.getAttribute("value");
var _998=this._lastSelectedElement.getAttribute("value");
var _999=false;
while(_996.hasNext()){
var el=_996.getNext();
switch(el.getAttribute("value")){
case _997:
case _998:
_999=!_999;
break;
}
if(_999){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_995);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_995)){
this._unhilite(_995);
}else{
this._hilite(_995);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_995){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_995;
};
MultiSelectorBinding.prototype._hilite=function(_99d){
var _99e=_99d.getAttribute("value");
if(!this._selectionMap.has(_99e)){
CSSUtil.attachClassName(_99d,"selected");
this._selectionMap.set(_99e,_99d);
}
};
MultiSelectorBinding.prototype._unhilite=function(_99f){
var _9a0=_99f.getAttribute("value");
if(this._selectionMap.has(_9a0)){
CSSUtil.detachClassName(_99f,"selected");
this._selectionMap.del(_9a0);
}
};
MultiSelectorBinding.prototype._isHilited=function(_9a1){
return CSSUtil.hasClassName(_9a1,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_9a2){
MultiSelectorBinding.superclass.handleAction.call(this,_9a2);
var _9a3=_9a2.target;
switch(_9a2.type){
case DataDialogBinding.ACTION_COMMAND:
if(_9a3==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_9a2.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_9a3.result);
this.dirty();
_9a3.result=null;
_9a2.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _9a4=null;
if(this.isSelectable){
_9a4=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9a6){
if(self._isHilited(_9a6)){
_9a6.parentNode.removeChild(_9a6);
_9a4.add(new SelectorBindingSelection(_9a6.getAttribute("label"),_9a6.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _9a4;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9a8=this._getElements();
if(!isUp){
_9a8.reverse();
}
var _9a9=true;
while(_9a9&&_9a8.hasNext()){
var _9aa=_9a8.getNext();
if(this._isHilited(_9aa)){
switch(isUp){
case true:
if(_9aa.previousSibling){
_9aa.parentNode.insertBefore(_9aa,_9aa.previousSibling);
}else{
_9a9=false;
}
break;
case false:
if(_9aa.nextSibling){
_9aa.parentNode.insertBefore(_9aa,_9aa.nextSibling.nextSibling);
}else{
_9a9=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9ab=new List();
var _9ac=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9ae){
var _9af=new SelectorBindingSelection(_9ae.getAttribute("label"),_9ae.getAttribute("value"),_9ac);
_9af.isHighlighted=self._isHilited(_9ae);
_9ab.add(_9af);
});
return _9ab;
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
var _9b0=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9b0.hasEntries()){
_9b0.each(function(_9b1){
_9b1.parentNode.removeChild(_9b1);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9b2=this.selections.getNext();
if(_9b2.isSelected){
var _9b3=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9b3.name=this._name;
_9b3.value=_9b2.value;
this.bindingElement.appendChild(_9b3);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9b4){
alert(_9b4);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9b5){
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
var _9b6={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9b7=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9b7.handler=this._handler;
_9b7.argument=_9b6;
StageBinding.presentViewDefinition(_9b7);
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
var _9b8={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9ba={handleDialogResponse:function(_9bb,_9bc){
if(_9bb==Dialog.RESPONSE_ACCEPT){
self.result=_9bc;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9bd=ViewDefinitions[this._dialogViewHandle];
_9bd.handler=_9ba;
_9bd.argument=_9b8;
StageBinding.presentViewDefinition(_9bd);
};
MultiSelectorDataDialogBinding.newInstance=function(_9be){
var _9bf=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9be);
return UserInterface.registerBinding(_9bf,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9c0){
var id=_9c0.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9c2=_9c0.bindingDocument.getElementById(id);
if(_9c2!=null){
var _9c3=UserInterface.getBinding(_9c2);
_9c3.setResult(true);
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
var _9c5=this.bindingDocument.getElementById(id);
if(_9c5!=null){
var _9c6=UserInterface.getBinding(_9c5);
if(_9c6&&!_9c6.isAttached){
_9c6.isLazy=true;
}else{
_9c5.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9c7){
this._isLazy=_9c7;
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
var _9c9=this.getProperty("stateprovider");
var _9ca=this.getProperty("handle");
if(_9c9!=null&&_9ca!=null){
url=url.replace("${stateprovider}",_9c9).replace("${handle}",_9ca);
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
EditorDataBinding.prototype._onPageInitialize=function(_9cb){
EditorDataBinding.superclass._onPageInitialize.call(this,_9cb);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9cc){
EditorDataBinding.superclass.handleAction.call(this,_9cc);
switch(_9cc.type){
case Binding.ACTION_DIRTY:
if(_9cc.target!=this){
if(!this.isDirty){
this.dirty();
}
_9cc.consume();
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
EditorDataBinding.prototype.setValue=function(_9cd){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9ce){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9cf){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9cf);
if(this.hasBasic===false){
var _9d0=this.getContentWindow().bindingMap.basicgroup;
if(_9d0){
_9d0.hide();
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
var _9d5=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9d5=fake.getValue()!="";
}
if(!_9d5&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9d5&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9d5;
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
var _9d9=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9d9!=null){
_9d9.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9da){
_9da=_9da!=null?_9da:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9da;
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
var _9db=this.getProperty("label");
if(_9db){
this.setLabel(_9db);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9dc){
this.setProperty("label",_9dc);
if(this.shadowTree.labelBinding==null){
var _9dd=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9dd.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9dd.bindingElement,this.bindingElement.firstChild);
_9dd.attach();
this.shadowTree.labelBinding=_9dd;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9dc));
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
var _9df=this.getProperty("relation");
if(_9df!=null){
this.bindingRelation=_9df;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9e0,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9e0,arg);
switch(_9e0){
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
FieldBinding.newInstance=function(_9e2){
var _9e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9e2);
return UserInterface.registerBinding(_9e3,FieldBinding);
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
var _9e4=this.getDescendantBindingByLocalName("fieldgroup");
if(_9e4!=null){
_9e4.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9e5=true;
var _9e6=this.getDescendantBindingsByLocalName("*");
while(_9e6.hasNext()){
var _9e7=_9e6.getNext();
if(Interfaces.isImplemented(IData,_9e7)){
var _9e8=_9e7.validate();
if(_9e5&&!_9e8){
_9e5=false;
}
}
}
return _9e5;
};
FieldsBinding.prototype.handleAction=function(_9e9){
FieldsBinding.superclass.handleAction.call(this,_9e9);
var _9ea=_9e9.target;
if(_9ea!=this){
switch(_9e9.type){
case Binding.ACTION_INVALID:
var _9eb=DataBinding.getAssociatedLabel(_9ea);
if(_9eb){
this._invalidFieldLabels.set(_9ea.key,_9eb);
}
if(_9ea.error){
if(!_9ea.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9ea.error},_9ea);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9e9.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9ea.key)){
this._invalidFieldLabels.del(_9ea.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9e9.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9ec=null;
if(this._invalidFieldLabels.hasEntries()){
_9ec=this._invalidFieldLabels.toList();
}
return _9ec;
};
FieldsBinding.newInstance=function(_9ed){
var _9ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9ed);
return UserInterface.registerBinding(_9ee,FieldsBinding);
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
var _9ef=this.getProperty("image");
if(_9ef){
this.setImage(_9ef);
}
var _9f0=this.getProperty("tooltip");
if(_9f0){
this.setToolTip(_9f0);
}
var _9f1=this.getProperty("label");
if(_9f1){
this.setLabel(_9f1);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9f3=this.getAncestorBindingByLocalName("field");
if(_9f3){
var _9f4=true;
_9f3.getDescendantBindingsByLocalName("*").each(function(_9f5){
if(Interfaces.isImplemented(IData,_9f5)){
_9f5.focus();
_9f4=false;
}
return _9f4;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9f6){
this.setProperty("label",_9f6);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9f6);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9f7=this.getProperty("label");
if(!_9f7){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9f7=node.data;
}
}
return _9f7;
};
FieldDescBinding.prototype.setImage=function(_9f9){
this.setProperty("image",_9f9);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9fa){
this.setProperty("tooltip",_9fa);
if(this.isAttached){
this.bindingElement.title=_9fa;
}
};
FieldDescBinding.newInstance=function(_9fb){
var _9fc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9fb);
return UserInterface.registerBinding(_9fc,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9fd){
var _9fe=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9fd);
return UserInterface.registerBinding(_9fe,FieldDataBinding);
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
var _9ff=this._fieldHelpPopupBinding;
if(_9ff){
_9ff.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _a00=app.bindingMap.fieldhelpopupset;
var doc=_a00.bindingDocument;
var _a02=_a00.add(PopupBinding.newInstance(doc));
var _a03=_a02.add(PopupBodyBinding.newInstance(doc));
_a02.position=PopupBinding.POSITION_RIGHT;
_a02.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_a03.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _a04=this.getProperty("label");
if(_a04){
_a03.bindingElement.innerHTML=Resolver.resolve(_a04);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_a02;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a05=this.getAncestorBindingByLocalName("field");
if(_a05){
_a05.attachClassName("fieldhelp");
var _a06=ClickButtonBinding.newInstance(this.bindingDocument);
_a06.attachClassName("fieldhelp");
_a06.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a06);
_a06.attach();
var self=this;
_a06.oncommand=function(){
self.attachPopupBinding();
};
_a06.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a06;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a08=this._fieldHelpPopupBinding;
if(_a08&&!_a08.isAttached){
_a08.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a0a){
RadioDataGroupBinding.superclass.handleAction.call(this,_a0a);
switch(_a0a.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a0c,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a0c,arg);
switch(_a0c){
case BroadcastMessages.KEY_ARROW:
var _a0e=null;
var next=null;
var _a10=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a10=this.getChildBindingsByLocalName("radio");
while(!_a0e&&_a10.hasNext()){
var _a11=_a10.getNext();
if(_a11.getProperty("ischecked")){
_a0e=_a11;
}
}
break;
}
if(_a0e){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a10.getFollowing(_a0e);
while(next!=null&&next.isDisabled){
next=_a10.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a10.getPreceding(_a0e);
while(next!=null&&next.isDisabled){
next=_a10.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a12){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a12){
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
var _a13=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a13.type="hidden";
_a13.name=this._name;
this.bindingElement.appendChild(_a13);
this.shadowTree.input=_a13;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a14=null;
var _a15=this.getChildBindingsByLocalName("radio");
while(!_a14&&_a15.hasNext()){
var _a16=_a15.getNext();
if(_a16.isChecked){
_a14=_a16.getProperty("value");
}
}
return _a14;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a17){
};
RadioDataGroupBinding.prototype.setResult=function(_a18){
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
var _a19=this.getProperty("relate");
var _a1a=this.getProperty("oncommand");
var _a1b=this.getProperty("isdisabled");
if(_a19){
this.bindingRelate=_a19;
this.relate();
}
if(_a1a){
this.oncommand=function(){
Binding.evaluate(_a1a,this);
};
}
if(_a1b==true){
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
var _a1d=this.getCallBackID();
this._buttonBinding.check=function(_a1e){
RadioButtonBinding.prototype.check.call(this,_a1e);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a1f){
RadioButtonBinding.prototype.uncheck.call(this,_a1f);
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
RadioDataBinding.prototype.setChecked=function(_a20,_a21){
this._buttonBinding.setChecked(_a20,_a21);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a20);
};
RadioDataBinding.prototype.check=function(_a22){
this.setChecked(true,_a22);
};
RadioDataBinding.prototype.uncheck=function(_a23){
this.setChecked(false,_a23);
};
RadioDataBinding.prototype.setDisabled=function(_a24){
if(_a24!=this.isDisabled){
this.isDisabled=_a24;
this._buttonBinding.setDisabled(_a24);
if(_a24){
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
var _a26=DOMEvents.getTarget(e);
switch(_a26){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a27=this.getProperty("label");
if(_a27){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a27)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a28){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a28;
}
this.setProperty("label",_a28);
};
RadioDataBinding.prototype.handleElement=function(_a29){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a2a){
var _a2b=_a2a.getAttribute("ischecked")==="true";
if(this.isChecked!=_a2b){
this.setChecked(_a2b,true);
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
var _a2d=DOMEvents.getTarget(e);
switch(_a2d){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a2e,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a2e,arg);
switch(_a2e){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a31){
_a31.consume();
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
var _a33=this.getCallBackID();
this._buttonBinding.check=function(_a34){
ButtonBinding.prototype.check.call(this,_a34);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a34){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a35){
ButtonBinding.prototype.uncheck.call(this,_a35);
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
if(_a33!=null){
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
var _a36=true;
var _a37=this.bindingElement.parentNode;
if(_a37){
var _a38=UserInterface.getBinding(_a37);
if(_a38&&_a38 instanceof CheckBoxGroupBinding){
if(_a38.isRequired){
if(_a38.isValid){
_a36=_a38.validate();
}else{
_a36=false;
}
}
}
}
return _a36;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a39=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a39.type="hidden";
_a39.name=this._name;
_a39.style.display="none";
this.bindingElement.appendChild(_a39);
this.shadowTree.input=_a39;
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
var _a3a=null;
var _a3b=this.getProperty("value");
if(this.isChecked){
_a3a=_a3b?_a3b:"on";
}
return _a3a;
};
CheckBoxBinding.prototype.setValue=function(_a3c){
if(_a3c==this.getValue()||_a3c=="on"){
this.check(true);
}else{
if(_a3c!="on"){
this.setPropety("value",_a3c);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a3d=false;
if(this.isChecked){
_a3d=this._result!=null?this._result:true;
}
return _a3d;
};
CheckBoxBinding.prototype.setResult=function(_a3e){
if(typeof _a3e=="boolean"){
this.setChecked(_a3e,true);
}else{
this._result=_a3e;
}
};
CheckBoxBinding.newInstance=function(_a3f){
var _a40=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a3f);
return UserInterface.registerBinding(_a40,CheckBoxBinding);
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
var _a41=true;
if(this.isRequired){
var _a42=this.getDescendantBindingsByLocalName("checkbox");
if(_a42.hasEntries()){
_a41=false;
while(_a42.hasNext()&&!_a41){
if(_a42.getNext().isChecked){
_a41=true;
}
}
}
if(_a41==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a41;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a43){
if(_a43){
if(!this._labelBinding){
var _a44=LabelBinding.newInstance(this.bindingDocument);
_a44.attachClassName("invalid");
_a44.setImage("${icon:error}");
_a44.setLabel("Selection required");
this._labelBinding=this.addFirst(_a44);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a45){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a45);
switch(_a45.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a46){
var _a47=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a46);
return UserInterface.registerBinding(_a47,CheckBoxGroupBinding);
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
var _a48=DialogControlBinding.newInstance(this.bindingDocument);
_a48.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a48);
this._controlGroupBinding.attachRecursive();
var _a49=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a49);
var _a4a=this.getLabel();
if(_a4a!=null){
this.setLabel(_a4a);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a4b=this._snapTargetBinding;
if(Binding.exists(_a4b)==true){
_a4b.removeActionListener(Binding.ACTION_BLURRED,this);
_a4b.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a4c){
if(Interfaces.isImplemented(IData,_a4c)){
this._snapTargetBinding=_a4c;
var _a4d=_a4c.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a4d&&_a4d.isConsumed){
this._environmentBinding=_a4d.listener;
}
if(this._environmentBinding){
_a4c.addActionListener(Binding.ACTION_BLURRED,this);
_a4c.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a4c)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a4c.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a4f=this._snapTargetBinding;
var _a50=this._environmentBinding;
var root=UserInterface.getBinding(_a4f.bindingDocument.body);
if(Binding.exists(_a4f)&&Binding.exists(_a50)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a4f.isAttached&&_a50.isAttached){
var _a52=_a4f.boxObject.getUniversalPosition();
var _a53=_a50.boxObject.getUniversalPosition();
_a53.y+=_a50.bindingElement.scrollTop;
_a53.x+=_a50.bindingElement.scrollLeft;
var tDim=_a4f.boxObject.getDimension();
var eDim=_a50.boxObject.getDimension();
var _a56=false;
if(_a52.y+tDim.h<_a53.y){
_a56=true;
}else{
if(_a52.x+tDim.w<_a53.x){
_a56=true;
}else{
if(_a52.y>_a53.y+eDim.h){
_a56=true;
}else{
if(_a52.x>_a53.x+eDim.w){
_a56=true;
}
}
}
}
if(!_a56){
this._setComputedPosition(_a52,_a53,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a57,_a58,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a5d=_a57;
var _a5e=false;
if(_a57.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a5e=true;
}else{
if(_a57.x+tDim.w>=_a58.x+eDim.w){
_a5e=true;
}
}
if(_a5e){
_a5d.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a5d.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a5d.y-=(bDim.h);
_a5d.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a5d);
};
BalloonBinding.prototype.handleBroadcast=function(_a5f,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a5f,arg);
switch(_a5f){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a61){
var _a62=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a61){
_a62=true;
}
}
return _a62;
};
BalloonBinding.prototype._setPosition=function(_a64){
var _a65=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a65=true;
}
}
if(!_a65){
this.bindingElement.style.left=_a64.x+"px";
this.bindingElement.style.top=_a64.y+"px";
this._point=_a64;
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
BalloonBinding.prototype.handleAction=function(_a67){
BalloonBinding.superclass.handleAction.call(this,_a67);
var _a68=_a67.target;
switch(_a67.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a67.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a68==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a68)){
self.dispose();
}else{
if(_a68.validate()){
var _a6a=true;
if(_a67.type==Binding.ACTION_BLURRED){
var root=_a68.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a6a=false;
}
}
if(_a6a){
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
BalloonBinding.prototype.setLabel=function(_a6d){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a6d);
_a6e.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a6e);
}
this.setProperty("label",_a6d);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a70){
var _a71=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a70);
var _a72=UserInterface.registerBinding(_a71,BalloonBinding);
_a72.hide();
return _a72;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a73,_a74){
if(Interfaces.isImplemented(IData,_a74)==true){
var _a75,_a76=_a74.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a76&&_a76.isConsumed){
switch(_a76.listener.constructor){
case StageBinding:
_a75=false;
break;
case StageDialogBinding:
_a75=true;
break;
}
}
var _a77=_a75?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a78=_a77.add(BalloonBinding.newInstance(top.app.document));
_a78.setLabel(_a73.text);
_a78.snapTo(_a74);
_a78.attach();
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
var _a79=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a7c=_a79.getDataBinding(name);
if(_a7c){
ErrorBinding.presentError({text:text},_a7c);
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
FocusBinding.focusElement=function(_a7d){
var _a7e=true;
try{
_a7d.focus();
Application.focused(true);
}
catch(exception){
var _a7f=UserInterface.getBinding(_a7d);
var _a80=SystemLogger.getLogger("FocusBinding.focusElement");
_a80.warn("Could not focus "+(_a7f?_a7f.toString():String(_a7d)));
_a7e=false;
}
return _a7e;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a81){
var win=_a81.bindingWindow;
var id=_a81.bindingElement.id;
return {getBinding:function(){
var _a84=null;
try{
if(Binding.exists(_a81)){
_a84=win.bindingMap[id];
}
}
catch(exception){
}
return _a84;
}};
};
FocusBinding.navigateNext=function(_a85){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a85);
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
var _a86=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a86&&_a86.isConsumed){
if(_a86.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a87){
FocusBinding.superclass.handleAction.call(this,_a87);
var _a88=_a87.target;
var _a89=null;
if(this._isFocusManager){
switch(_a87.type){
case FocusBinding.ACTION_ATTACHED:
if(_a88!=this){
this._isUpToDate=false;
}
_a87.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a88!=this){
this._isUpToDate=false;
_a87.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a89=new FocusCrawler();
_a89.mode=FocusCrawler.MODE_BLUR;
_a89.crawl(_a88.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a87.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a88!=this){
_a89=new FocusCrawler();
_a89.mode=FocusCrawler.MODE_FOCUS;
_a89.crawl(_a88.bindingElement);
}
_a87.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a88)){
this.claimFocus();
this._onFocusableFocused(_a88);
}
_a87.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a88)){
this._onFocusableBlurred(_a88);
}
_a87.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a8a){
var _a8b=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a8b==null&&list.hasNext()){
var _a8d=list.getNext();
if(this._cachedFocus&&_a8d==this._cachedFocus.getBinding()){
_a8b=_a8d;
}
}
if(_a8b!=null){
if(_a8d.isFocused){
var next=_a8a?list.getPreceding(_a8b):list.getFollowing(_a8b);
if(!next){
next=_a8a?list.getLast():list.getFirst();
}
next.focus();
}else{
_a8b.focus();
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
var _a8f=new FocusCrawler();
var list=new List();
_a8f.mode=FocusCrawler.MODE_INDEX;
_a8f.crawl(this.bindingElement,list);
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
var _a92=this._cachedFocus.getBinding();
if(_a92&&!_a92.isFocused){
_a92.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a93){
if(_a93!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a93;
_a93.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a93);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a94){
_a94.deleteProperty(FocusBinding.MARKER);
if(_a94==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a96){
this.bindingElement.style.left=_a96+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a97){
this.hiddenTabBindings.add(_a97);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a98=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a98.getLabel());
item.setImage(_a98.getImage());
item.associatedTabBinding=_a98;
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
TabsButtonBinding.prototype.handleAction=function(_a9b){
TabsButtonBinding.superclass.handleAction.call(this,_a9b);
switch(_a9b.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a9c=this.selectedTabBinding;
if(_a9c){
this.containingTabBoxBinding.moveToOrdinalPosition(_a9c,0);
this.containingTabBoxBinding.select(_a9c);
}
_a9b.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a9d){
var _a9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a9d);
_a9e.setAttribute("type","checkbox");
_a9e.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a9e.className="tabbutton";
return UserInterface.registerBinding(_a9e,TabsButtonBinding);
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
var _a9f=TabBoxBinding.currentActiveInstance;
if(_a9f!=null&&Binding.exists(_a9f)){
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
var _aa0=this.getTabElements().getLength();
var _aa1=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_aa0!=_aa1){
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
var _aa2=this.getTabPanelElements();
while(_aa2.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_aa2.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _aa3=DOMUtil.getOrdinalPosition(this._tabsElement);
var _aa4=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _aa5=_aa3>_aa4?"tabsbelow":"tabsontop";
this.attachClassName(_aa5);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _aa7=this.getTabPanelElements();
var _aa8=null;
var _aa9=this.getProperty("selectedindex");
if(_aa9!=null){
if(_aa9>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aaa=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aac=_aa7.getNext();
this.registerTabBoxPair(tab,_aac);
if(_aa9&&_aaa==_aa9){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aa8=tab;
}
}
_aaa++;
}
if(!_aa8){
_aa8=tabs.getFirst();
_aa8.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aad){
var _aae=null;
var _aaf=null;
if(this.isEqualSize){
var _ab0=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_ab2=this.getTabPanelElements();
_ab2.each(function(_ab3){
max=_ab3.offsetHeight>max?_ab3.offsetHeight:max;
});
_aaf=max+_ab0.top+_ab0.bottom;
if(_aad&&this._tabPanelsElement.style.height!=null){
_aae=this._tabPanelsElement.offsetHeight;
}
if(_aae!=null||_aaf>_aae){
this._tabPanelsElement.style.height=_aaf+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_ab4){
_ab4._invalidCount=0;
_ab4.addActionListener(Binding.ACTION_INVALID,this);
_ab4.addActionListener(Binding.ACTION_VALID,this);
_ab4.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ab5){
TabBoxBinding.superclass.handleAction.call(this,_ab5);
var _ab6=_ab5.target;
var _ab7=_ab5.listener;
switch(_ab5.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_ab6.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ab5.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_ab6.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_ab7._invalidCount++;
if(_ab7._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_ab7.isSelected){
self._showWarning(_ab7,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_ab7._invalidCount>0){
_ab7._invalidCount--;
if(_ab7._invalidCount==0){
if(_ab7.isSelected){
this._showWarning(_ab7,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_ab7,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ab5._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ab5._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aba=DOMEvents.getTarget(e);
if(_aba==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _abc=this.getTabPanelElements();
tabs.each(function(tab,_abe){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _abf=_abc.get(_abe);
this.registerTabBoxPair(tab,_abf);
}
},this);
var _ac0=this._tabBoxPairs;
for(var key in _ac0){
var tab=_ac0[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aba);
switch(_aba.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ac4=_aba.parentNode;
if(_ac4==this._tabsElement||_ac4==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aba==this._tabsElement||_aba==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ac6){
var _ac7=this.getBindingForArgument(arg);
if(_ac7!=null&&!_ac7.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ac7.select(_ac6);
this.getTabPanelBinding(_ac7).select(_ac6);
var _ac8=this.getProperty("selectedindex");
if(_ac8!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ac7.bindingElement,true));
}
this._selectedTabBinding=_ac7;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ac7.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ac9=this.getTabPanelBinding(_ac7);
this._showBalloon(_ac9,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_acb){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_acb.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_acb};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_acf){
var _ad0=null;
try{
var key=_acf.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad2=this._tabBoxPairs[key].tabPanel;
_ad0=UserInterface.getBinding(_ad2);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ad0;
};
TabBoxBinding.prototype.getTabBinding=function(_ad3){
var key=_ad3.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad5=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ad5);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ad6=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ad6);
return _ad6;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ad7,_ad8){
var _ad9=_ad7.bindingElement;
_ad7.setProperty("selected",true);
var _ada=this.summonTabPanelBinding();
var _adb=_ada.bindingElement;
if(_ad8){
_adb.appendChild(_ad8 instanceof Binding?_ad8.bindingElement:_ad8);
}
this.registerTabBoxPair(_ad9,_adb);
UserInterface.getBinding(this._tabsElement).add(_ad7);
this._tabPanelsElement.appendChild(_adb);
_ad7.attach();
UserInterface.getBinding(_adb).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ad7;
};
TabBoxBinding.prototype.importTabBinding=function(_adc){
var that=_adc.containingTabBoxBinding;
var _ade=that.getTabPanelBinding(_adc);
var _adf=_ade.getBindingElement();
var _ae0=_adc.getBindingElement();
that.dismissTabBinding(_adc);
this._tabsElement.appendChild(_ae0);
this._tabPanelsElement.appendChild(_adf);
this.registerTabBoxPair(_ae0,_adf);
_adc.containingTabBoxBinding=this;
this.select(_adc);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ae1){
var _ae2=null;
if(_ae1.isSelected){
_ae2=this.getBestTab(_ae1);
this._selectedTabBinding=null;
}
var _ae3=this.getTabPanelBinding(_ae1);
this.unRegisterTabBoxPair(_ae1.bindingElement);
_ae1.dispose();
_ae3.dispose();
if(_ae2!=null){
this.select(_ae2,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ae4){
if(_ae4.isSelected){
this.selectBestTab(_ae4);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ae5){
var _ae6=this.getBestTab(_ae5);
if(_ae6){
this.select(_ae6);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ae7){
var _ae8=null;
var _ae9=_ae7.getOrdinalPosition(true);
var _aea=this.getTabBindings();
var _aeb=_aea.getLength();
var _aec=_aeb-1;
if(_aeb==1){
_ae8=null;
}else{
if(_ae9==_aec){
_ae8=_aea.get(_ae9-1);
}else{
_ae8=_aea.get(_ae9+1);
}
}
return _ae8;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_aed,_aee){
var _aef=this.bindingDocument.getElementById(_aed.bindingElement.id);
var tab=this.getTabElements().get(_aee);
this._tabsElement.insertBefore(_aef,tab);
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
var _af1=this._nodename_tab;
var _af2=new List(this._tabsElement.childNodes);
var _af3=new List();
while(_af2.hasNext()){
var _af4=_af2.getNext();
if(_af4.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af4)==_af1){
_af3.add(_af4);
}
}
return _af3;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _af5=this._nodename_tabpanel;
var _af6=new List(this._tabPanelsElement.childNodes);
var _af7=new List();
_af6.each(function(_af8){
if(_af8.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af8)==_af5){
_af7.add(_af8);
}
});
return _af7;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _af9=new List();
var _afa=this.getTabElements();
_afa.each(function(_afb){
_af9.add(UserInterface.getBinding(_afb));
});
return _af9;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _afc=new List();
this.getTabPanelElements().each(function(_afd){
_afc.add(UserInterface.getBinding(_afd));
});
return _afc;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _afe=null;
if(this._selectedTabBinding){
_afe=this.getTabPanelBinding(this._selectedTabBinding);
}
return _afe;
};
TabBoxBinding.prototype._showWarning=function(_aff,_b00){
var _b01=this.getTabBinding(_aff);
if(_b00){
if(_b01.labelBinding.hasImage){
_b01._backupImage=_b01.getImage();
}
_b01.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_b01._backupImage){
_b01.setImage(_b01._backupImage);
}else{
_b01.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_b02,_b03){
var _b04=this.getTabBinding(_b02);
if((_b03&&!_b04.isSelected)||!_b03){
if(_b04.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_b03){
if(_b04.labelBinding.hasImage){
_b04._backupImage=_b04.getImage();
}
_b04.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_b04._backupImage!=null){
_b04.setImage(_b04._backupImage);
}else{
_b04.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b05){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b08=tab.getOrdinalPosition(true);
var next=null;
var _b0a=new List();
tabs.each(function(t){
if(t.isVisible){
_b0a.add(t);
}
});
if(_b0a.getLength()>1){
if(_b08==0&&!_b05){
next=_b0a.getLast();
}else{
if(_b08==_b0a.getLength()-1&&_b05){
next=_b0a.getFirst();
}else{
if(_b05){
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
var _b0c=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b0c.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b0d){
TabsBinding.superclass.handleAction.call(this,_b0d);
switch(_b0d.type){
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
var _b10=self.bindingElement.offsetWidth;
if(_b10!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b10;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b11){
if(_b11 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b11);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b12=false;
var _b13,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b16=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b17=this.bindingElement.offsetWidth-_b16.RESERVED_SPACE;
var _b18=null;
var sum=0,_b1a=0;
var _b1b=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b1b){
tab=tabs.getNext();
_b13=UserInterface.getBinding(tab);
if(!_b18){
_b18=_b13;
}
sum+=tab.offsetWidth;
if(sum>=_b17){
_b12=true;
if(_b13.isSelected){
if(!DOMUtil.isFirstElement(_b13.bindingElement,true)){
this.isManaging=false;
if(_b18){
_b18.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b13,_b1a-1);
_b1b=false;
}
}else{
_b13.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b13);
}
}else{
_b13.show();
_b18=_b13;
_b1a++;
}
}
if(_b1b){
if(_b12&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b1c=_b18.getBindingElement();
var _b1d=_b1c.offsetLeft+_b1c.offsetWidth;
var _b1e=this.tabsButtonBinding;
setTimeout(function(){
_b1e.show(_b1d+4);
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
var _b1f=TabBinding.superclass.serialize.call(this);
if(_b1f){
_b1f.label=this.getLabel();
_b1f.image=this.getImage();
_b1f.tooltip=this.getToolTip();
}
return _b1f;
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
var _b20=this.bindingElement.getAttribute("image");
var _b21=this.bindingElement.getAttribute("label");
var _b22=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b21){
this.setLabel(_b21);
}
if(_b20){
this.setImage(_b20);
}
if(_b22){
this.setToolTip(_b22);
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
TabBinding.prototype.setLabel=function(_b24){
if(_b24!=null){
this.setProperty("label",_b24);
if(this.isAttached){
this.labelBinding.setLabel(_b24);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b25){
if(_b25){
this.setProperty("tooltip",_b25);
if(this.isAttached){
this.labelBinding.setToolTip(_b25);
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
var _b27=false;
if(Client.isMozilla==true){
}
if(!_b27){
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
TabBinding.prototype.select=function(_b28){
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
TabBinding.newInstance=function(_b29){
var _b2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b29);
return UserInterface.registerBinding(_b2a,TabBinding);
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
var _b2b=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b2b=true;
this._lastKnownDimension=dim1;
}
return _b2b;
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
TabPanelBinding.prototype.select=function(_b2e){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b2e!=true){
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
TabPanelBinding.prototype.handleAction=function(_b2f){
TabPanelBinding.superclass.handleAction.call(this,_b2f);
var _b30=_b2f.target;
switch(_b2f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b2f.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b31){
var _b32=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b31);
UserInterface.registerBinding(_b32,TabPanelBinding);
return UserInterface.getBinding(_b32);
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
var _b33=SplitBoxBinding.superclass.serialize.call(this);
if(_b33){
_b33.orient=this.getOrient();
_b33.layout=this.getLayout();
}
return _b33;
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
var _b35=this.getSplitPanelElements();
if(_b35.hasEntries()){
var _b36=new List(this.getLayout().split(":"));
if(_b36.getLength()!=_b35.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b35.each(function(_b37){
_b37.setAttribute("ratio",_b36.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b38=this.getProperty("orient");
if(_b38){
this._orient=_b38;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b39=this.getSplitterBindings();
while(_b39.hasNext()){
var _b3a=_b39.getNext();
if(_b3a&&_b3a.getProperty("collapsed")==true){
_b3a.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b3b){
SplitBoxBinding.superclass.handleAction.call(this,_b3b);
switch(_b3b.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b3b.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b3b.target);
_b3b.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b3b.target);
_b3b.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b3c){
this._getSplitPanelBindingForSplitter(_b3c).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b3d){
this._getSplitPanelBindingForSplitter(_b3d).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b3e){
var _b3f=DOMUtil.getOrdinalPosition(_b3e.bindingElement,true);
var _b40,_b41=this.getSplitPanelElements();
switch(_b3e.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b40=_b41.get(_b3f);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b40=_b41.get(_b3f+1);
break;
}
return UserInterface.getBinding(_b40);
};
SplitBoxBinding.prototype.invokeLayout=function(_b42){
var _b43=this.isHorizontalOrient();
var _b44=this.getSplitPanelBindings();
var _b45=this.getSplitterBindings();
var _b46=new List();
var _b47,sum=0;
var _b49=0;
_b44.each(function(_b4a){
if(_b4a.isFixed==true){
if(!_b44.hasNext()){
_b49+=_b4a.getFix();
}
_b46.add(0);
sum+=0;
}else{
_b47=_b4a.getRatio();
_b46.add(_b47);
sum+=_b47;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b46.getLength()!=_b44.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b4b=_b43?this.getInnerWidth():this.getInnerHeight();
_b4b-=_b49;
_b45.each(function(_b4c){
if(_b4c.isVisible){
_b4b-=SplitterBinding.DIMENSION;
}
});
var unit=_b4b/sum;
var _b4e=0;
var self=this;
_b44.each(function(_b50){
var span=0;
var _b52=_b46.getNext();
if(_b50.isFixed){
span=_b50.getFix();
}else{
span=Math.floor(unit*_b52);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b4e+=span;
while(_b4e>_b4b){
_b4e--;
span--;
}
if(!_b50.isFixed){
if(_b43){
_b50.setWidth(span);
}else{
_b50.setHeight(span);
}
}
});
}
if(_b42!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b53=this.getLayout();
if(_b53){
this.setProperty("layout",_b53);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b54=this.isHorizontalOrient();
var _b55=this.getSplitPanelBindings();
var _b56=this.getSplitterBindings();
var _b57=null;
var _b58=null;
var unit=null;
var _b5a=null;
var span=null;
_b55.each(function(_b5c){
if(!unit){
unit=_b54?_b5c.getWidth():_b5c.getHeight();
}
span=_b54?_b5c.getWidth():_b5c.getHeight();
if(_b5a){
span-=_b5a;
_b5a=null;
}
_b57=_b56.getNext();
if(_b57&&_b57.offset){
_b5a=_b57.offset;
span+=_b5a;
}
_b5c.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b5d){
this.logger.debug(_b5d);
this.setProperty("layout",_b5d);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b5e="",_b5f=this.getSplitPanelBindings();
_b5f.each(function(_b60){
_b5e+=_b60.getRatio().toString();
_b5e+=_b5f.hasNext()?":":"";
});
this.setProperty("layout",_b5e);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b61=this.getSplitPanelElements();
_b61.each(function(_b62){
layout+="1"+(_b61.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b63){
this.bindingElement.style.width=_b63+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b64){
this.bindingElement.style.height=_b64+"px";
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
var _b65=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b65.reverse();
}
return _b65;
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
SplitBoxBinding.prototype.fit=function(_b66){
if(!this.isFit||_b66){
if(this.isHorizontalOrient()){
var max=0;
var _b68=this.getSplitPanelBindings();
_b68.each(function(_b69){
var _b6a=_b69.bindingElement.offsetHeight;
max=_b6a>max?_b6a:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b6b){
var _b6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b6b);
return UserInterface.registerBinding(_b6c,SplitBoxBinding);
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
var _b6f=this.getProperty("hidden");
if(_b6f){
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
var _b70=this.getProperty("ratiocache");
if(_b70){
this.setRatio(_b70);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b71){
if(!this.isFixed){
if(_b71!=this.getWidth()){
if(_b71<0){
_b71=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b71+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b71);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b72=null;
if(this.isFixed){
_b72=this.getFix();
}else{
_b72=this.bindingElement.offsetWidth;
}
return _b72;
};
SplitPanelBinding.prototype.setHeight=function(_b73){
if(!this.isFixed){
if(_b73!=this.getHeight()){
try{
this.bindingElement.style.height=_b73+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b74=null;
if(this.isFixed){
_b74=this.getFix();
}else{
_b74=this.bindingElement.offsetHeight;
}
return _b74;
};
SplitPanelBinding.prototype.setRatio=function(_b75){
this.setProperty("ratio",_b75);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b76){
if(_b76){
this._fixedSpan=_b76;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b76);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b76);
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
SplitPanelBinding.newInstance=function(_b77){
var _b78=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b77);
return UserInterface.registerBinding(_b78,SplitPanelBinding);
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
var _b79=SplitBoxBinding.superclass.serialize.call(this);
if(_b79){
_b79.collapse=this.getProperty("collapse");
_b79.collapsed=this.getProperty("collapsed");
_b79.disabled=this.getProperty("isdisabled");
}
return _b79;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b7a=this.getProperty("hidden");
if(_b7a){
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
SplitterBinding.prototype.setCollapseDirection=function(_b7c){
this.setProperty("collapse",_b7c);
this._collapseDirection=_b7c;
};
SplitterBinding.prototype.handleAction=function(_b7d){
SplitterBinding.superclass.handleAction.call(this,_b7d);
switch(_b7d.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b7d.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b7f=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b7f.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b7f.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b80){
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
SplitterBinding.newInstance=function(_b8b){
var _b8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b8b);
return UserInterface.registerBinding(_b8c,SplitterBinding);
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
var _b8d=this.getProperty("selectedindex");
var _b8e=this.getDeckElements();
if(_b8e.hasEntries()){
var _b8f=false;
var _b90=0;
while(_b8e.hasNext()){
var deck=_b8e.getNext();
if(_b8d&&_b90==_b8d){
deck.setAttribute("selected","true");
_b8f=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b8f=true;
}
}
_b90++;
}
if(!_b8f){
_b8e.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b93=this.getBindingForArgument(arg);
if(_b93!=null){
if(_b93!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b93.select();
this._selectedDeckBinding=_b93;
var _b94=this.getProperty("selectedindex");
if(_b94!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b93.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b95=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b95=true;
this._lastKnownDimension=dim1;
}
return _b95;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b98){
var _b99=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b98);
return UserInterface.registerBinding(_b99,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b9a){
DeckBinding.superclass.handleAction.call(this,_b9a);
var _b9b=_b9a.target;
switch(_b9a.type){
case BalloonBinding.ACTION_INITIALIZE:
_b9a.consume();
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
DeckBinding.newInstance=function(_b9d){
var _b9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b9d);
return UserInterface.registerBinding(_b9e,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b9f){
if(_b9f instanceof ToolBarBodyBinding){
if(_b9f.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b9f;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b9f;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b9f);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _ba0=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_ba0){
this.setImageSize(_ba0);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _ba2=ToolBarGroupBinding.newInstance(this.bindingDocument);
_ba2.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_ba2.isDefaultContent=true;
this.add(_ba2);
_ba2.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _ba4=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_ba4);
}
if(_ba4!=null&&_ba4.hasClassName("max")){
this._maxToolBarGroup(_ba4,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_ba6){
var _ba7=this.boxObject.getDimension().w;
var _ba8=CSSComputer.getPadding(this.bindingElement);
_ba7-=(_ba8.left+_ba8.right);
if(_ba6!=null){
_ba7-=_ba6.boxObject.getDimension().w;
if(!Client.isWindows){
_ba7-=1;
}
if(Client.isExplorer){
_ba7-=15;
}
}
max.bindingElement.style.width=_ba7+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ba9){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ba9);
};
ToolBarBinding.prototype.addLeft=function(_baa,_bab){
var _bac=null;
if(this._toolBarBodyLeft!=null){
_bac=this._toolBarBodyLeft.add(_baa,_bab);
}else{
throw new Error("No left toolbarbody");
}
return _bac;
};
ToolBarBinding.prototype.addLeftFirst=function(_bad,_bae){
var _baf=null;
if(this._toolBarBodyLeft){
_baf=this._toolBarBodyLeft.addFirst(_bad,_bae);
}else{
throw new Error("No left toolbarbody");
}
return _baf;
};
ToolBarBinding.prototype.addRight=function(_bb0){
var _bb1=null;
if(this._toolBarBodyRight){
_bb1=this._toolBarBodyRight.add(_bb0);
}else{
throw new Error("No left toolbarbody");
}
return _bb1;
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
ToolBarBinding.newInstance=function(_bb4){
var _bb5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bb4);
return UserInterface.registerBinding(_bb5,ToolBarBinding);
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
var _bb6=this.getDescendantBindingsByLocalName("toolbargroup");
var _bb7=new List();
var _bb8=true;
_bb6.each(function(_bb9){
if(_bb9.isVisible&&!_bb9.isDefaultContent){
_bb7.add(_bb9);
}
});
while(_bb7.hasNext()){
var _bba=_bb7.getNext();
_bba.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bb8){
_bba.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bb8=false;
}
if(!_bb7.hasNext()){
_bba.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bbd=list.getNext();
var _bbe=_bbd.getEqualSizeWidth();
if(_bbe>max){
max=_bbe;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bbd=list.getNext();
_bbd.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bbf,_bc0){
var _bc1=ToolBarBinding.superclass.add.call(this,_bbf);
if(!_bc0){
if(_bbf instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bc1;
};
ToolBarBodyBinding.prototype.addFirst=function(_bc2,_bc3){
var _bc4=ToolBarBinding.superclass.addFirst.call(this,_bc2);
if(!_bc3){
if(_bc2 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bc4;
};
ToolBarBodyBinding.newInstance=function(_bc5){
var _bc6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bc5);
return UserInterface.registerBinding(_bc6,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bc7){
switch(_bc7){
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
var _bc8=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc8)=="toolbarbody"){
UserInterface.getBinding(_bc8).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bc9=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc9)=="toolbarbody"){
UserInterface.getBinding(_bc9).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bca){
var _bcb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bca);
return UserInterface.registerBinding(_bcb,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bcc){
var _bcd=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bcc);
return UserInterface.registerBinding(_bcd,ToolBarButtonBinding);
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
var _bce=this.getProperty("label");
var _bcf=this.getProperty("image");
if(_bce){
this.setLabel(_bce);
}
if(_bcf){
this.setImage(_bcf);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bd0,_bd1){
if(this.isAttached){
this._labelBinding.setLabel(_bd0,_bd1);
}
this.setProperty("label",_bd0);
};
ToolBarLabelBinding.prototype.setImage=function(_bd2,_bd3){
if(this.isAttached){
this._labelBinding.setImage(_bd2,_bd3);
}
this.setProperty("image",_bd2);
};
ToolBarLabelBinding.newInstance=function(_bd4){
var _bd5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bd4);
return UserInterface.registerBinding(_bd5,ToolBarLabelBinding);
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
var _bd6=this.getDescendantBindingsByLocalName("clickbutton");
if(_bd6.hasEntries()){
while(_bd6.hasNext()){
var _bd7=_bd6.getNext();
if(_bd7.isDefault){
this._defaultButton=_bd7;
_bd7.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bd7.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bd6;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bd8,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bd8,arg);
switch(_bd8){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bda=this.getAncestorBindingByType(DialogBinding,true);
if(_bda!=null&&_bda.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bdb){
DialogToolBarBinding.superclass.handleAction.call(this,_bdb);
var _bdc=_bdb.target;
var _bdd=false;
var _bde=this._buttons.reset();
if(_bdc instanceof ClickButtonBinding){
switch(_bdb.type){
case Binding.ACTION_FOCUSED:
_bdc.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bdc;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bdc.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bdd&&_bde.hasNext()){
var _bdf=_bde.getNext();
_bdd=_bdf.isFocused;
}
if(!_bdd){
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
ComboBoxBinding.newInstance=function(_be1){
var _be2=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_be1);
return UserInterface.registerBinding(_be2,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_be3,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_be3,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _be7=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_be7.each(function(_be8){
var _be9=_be8.getProperty("oncommand");
_be8.setProperty("hiddencommand",_be9);
_be8.deleteProperty("oncommand");
_be8.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bea=null;
var _beb=this.getActiveMenuItemId();
_be7.reset();
while(_be7.hasNext()){
var _bec=_be7.getNext();
if(_bec.getProperty("id")==_beb){
_bea=_bec;
break;
}
}
if(_bea==null&&_be7.hasEntries()){
_bea=_be7.getFirst();
}
if(_bea!=null){
this.setButton(_bea);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bed){
if(_bed instanceof MenuItemBinding){
var _bee=_bed.getProperty("label");
var _bef=_bed.getProperty("image");
var _bf0=_bed.getProperty("image-hover");
var _bf1=_bed.getProperty("image-active");
var _bf2=_bed.getProperty("image-disabled");
var _bf3=_bed.getProperty("hiddencommand");
this.setLabel(_bee?_bee:"");
this.image=_bef;
this.imageHover=_bef;
this.imageActive=_bf1;
this.imageDisabled=_bf2;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bf3,this);
};
this.hideActiveItem(_bed);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bf4){
if(_bf4 instanceof MenuItemBinding){
this.setButton(_bf4);
this.setActiveMenuItemId(_bf4.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bf5){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bf6){
if(_bf6==_bf5){
Binding.prototype.hide.call(_bf6);
}else{
Binding.prototype.show.call(_bf6);
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
var _bf8=this._views;
for(var _bf9 in ViewDefinitions){
var def=ViewDefinitions[_bf9];
var key=def.perspective;
if(key!=null){
if(!_bf8.has(key)){
_bf8.set(key,new List());
}
var list=_bf8.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bfd,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bfd,arg);
switch(_bfd){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _c00=this.bindingWindow.bindingMap.toolboxpopupgroup;
_c00.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_c00.add(StageViewMenuItemBinding.newInstance(_c00.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_c00.show();
}else{
_c00.hide();
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
TreeBinding.grid=function(_c04){
var _c05=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_c04);
var _c07=_c04%_c05;
if(_c07>0){
_c04=_c04-_c07+_c05;
}
return _c04+TreeBodyBinding.PADDING_TOP;
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
var _c08=this.getProperty("focusable");
if(_c08!=null){
this._isFocusable=_c08;
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
var _c0a=this.getProperty("builder");
if(_c0a){
this._buildFromTextArea(_c0a);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c0b=this.getProperty("selectable");
var _c0c=this.getProperty("selectionproperty");
var _c0d=this.getProperty("selectionvalue");
if(_c0b){
this.setSelectable(true);
if(_c0c){
this.setSelectionProperty(_c0c);
}
if(_c0d){
this.setSelectionValue(_c0d);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c10=UserInterface.getBinding(area);
var _c11=this._treeBodyBinding;
function build(){
_c11.subTreeFromString(area.value);
}
_c10.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c12){
var _c13=_c12.getHandle();
if(this._treeNodeBindings.has(_c13)){
throw "Duplicate treenodehandles registered: "+_c12.getLabel();
}else{
this._treeNodeBindings.set(_c13,_c12);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c13)){
_c12.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c15){
this._treeNodeBindings.del(_c15.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c16){
var _c17=null;
if(this._treeNodeBindings.has(_c16)){
_c17=this._treeNodeBindings.get(_c16);
}else{
throw "No such treenode: "+_c16;
}
return _c17;
};
TreeBinding.prototype.handleAction=function(_c18){
TreeBinding.superclass.handleAction.call(this,_c18);
var _c19=_c18.target;
switch(_c18.type){
case TreeNodeBinding.ACTION_OPEN:
_c18.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c19);
_c18.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c19;
this.focusSingleTreeNodeBinding(_c19);
if(!this.isFocused){
this.focus();
}
_c18.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c19;
this.focusSingleTreeNodeBinding(_c19);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c19;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c19;
this.focusSingleTreeNodeBinding(_c19);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c18.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c19.isFocused){
this.blurSelectedTreeNodes();
}
_c18.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c1a,_c1b){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c1c){
if(_c1c!=null&&!_c1c.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c1c);
_c1c.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c1d){
this.blurSelectedTreeNodes();
while(_c1d.hasNext()){
var _c1e=_c1d.getNext();
this._focusedTreeNodeBindings.add(_c1e);
_c1e.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c1f=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c20=false;
var _c21=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c22=this._focusedTreeNodeBindings.getNext();
var _c23=_c22.getProperty(this._selectionProperty);
if(_c23!=null){
if(!this._selectionValue||this._selectionValue[_c23]){
_c21=(this._selectedTreeNodeBindings[_c22.key]=_c22);
var _c24=_c1f[_c22.key];
if(!_c24||_c24!=_c21){
_c20=true;
}
}
}
}
if(_c21){
if(_c20){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c1f){
for(var key in _c1f){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c26=new List();
for(var key in this._selectedTreeNodeBindings){
_c26.add(this._selectedTreeNodeBindings[key]);
}
return _c26;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c28){
_c28.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c29){
var _c2a=_c29.getDescendantBindingsByLocalName("treenode");
var _c2b=true;
var self=this;
_c2a.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c2b;
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
var _c2e=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c2e!=null){
this.focusSingleTreeNodeBinding(_c2e);
_c2e.callback();
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
TreeBinding.prototype.add=function(_c2f){
var _c30=null;
if(this._treeBodyBinding){
_c30=this._treeBodyBinding.add(_c2f);
}else{
this._treeNodeBuffer.add(_c2f);
_c30=_c2f;
}
return _c30;
};
TreeBinding.prototype.addFirst=function(_c31){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c32=this._treeBodyBinding.bindingElement;
_c32.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c33,_c34){
if(_c34.isContainer&&_c34.isOpen){
_c34.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c35){
this._isSelectable=_c35;
if(_c35){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c36){
this._selectionProperty=_c36;
};
TreeBinding.prototype.setSelectionValue=function(_c37){
if(_c37){
var list=new List(_c37.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c39,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c39,arg);
switch(_c39){
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
var _c3b=this.getFocusedTreeNodeBindings();
if(_c3b.hasEntries()){
var node=_c3b.getFirst();
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
var _c3e=this.getFocusedTreeNodeBindings();
if(_c3e.hasEntries()){
var node=_c3e.getFirst();
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
var _c41=null;
while(next==null&&(_c41=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c41!=null){
next=_c41.getNextBindingByLocalName("treenode");
}
node=_c41;
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
var _c43=DOMEvents.getTarget(e);
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
var _c44=new TreeCrawler();
var list=new List();
_c44.mode=TreeCrawler.MODE_GETOPEN;
_c44.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c47=list.getNext();
map.set(_c47.getHandle(),true);
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
var _c4c=this._positionIndicatorBinding;
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
if(y!=_c4c.getPosition().y){
_c4c.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c4c.isVisible){
_c4c.show();
}
}else{
if(_c4c.isVisible){
_c4c.hide();
}
}
}else{
if(_c4c.isVisible){
_c4c.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c4f){
this._acceptingTreeNodeBinding=_c4f;
this._acceptingPosition=_c4f.boxObject.getLocalPosition();
this._acceptingDimension=_c4f.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c4f);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c50){
var map={};
var _c52=_c50.getChildBindingsByLocalName("treenode");
var _c53,pos,dim,y;
y=TreeBinding.grid(_c50.boxObject.getLocalPosition().y);
map[y]=true;
while(_c52.hasNext()){
_c53=_c52.getNext();
pos=_c53.boxObject.getLocalPosition();
dim=_c53.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c59 in this._acceptingPositions){
if(_c59==y){
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
TreeBinding.newInstance=function(_c5a){
var _c5b=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c5a);
var _c5c=UserInterface.registerBinding(_c5b,TreeBinding);
_c5c.treeBodyBinding=TreeBodyBinding.newInstance(_c5a);
return _c5c;
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
TreeBodyBinding.prototype.accept=function(_c5d){
if(_c5d instanceof TreeNodeBinding){
this.logger.debug(_c5d);
}
};
TreeBodyBinding.newInstance=function(_c5e){
var _c5f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c5e);
return UserInterface.registerBinding(_c5f,TreeBodyBinding);
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
var _c60=TreeNodeBinding.superclass.serialize.call(this);
if(_c60){
_c60.label=this.getLabel();
_c60.image=this.getImage();
var _c61=this.getHandle();
if(_c61&&_c61!=this.key){
_c60.handle=_c61;
}
if(this.isOpen){
_c60.open=true;
}
if(this.isDisabled){
_c60.disabled=true;
}
if(this.dragType){
_c60.dragtype=this.dragType;
}
if(this.dragAccept){
_c60.dragaccept=this.dragAccept;
}
}
return _c60;
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
var _c63=UserInterface.getBinding(node);
if(_c63&&_c63.containingTreeBinding){
this.containingTreeBinding=_c63.containingTreeBinding;
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
var _c64=this.key;
var _c65=this.getProperty("handle");
if(_c65){
_c64=_c65;
}
return _c64;
};
TreeNodeBinding.prototype.setHandle=function(_c66){
this.setProperty("handle",_c66);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c68=this.getProperty("label");
var _c69=this.getProperty("tooltip");
var _c6a=this.getProperty("oncommand");
var _c6b=this.getProperty("onbindingfocus");
var _c6c=this.getProperty("onbindingblur");
var _c6d=this.getProperty("focused");
var _c6e=this.getProperty("callbackid");
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
if(_c68!=null){
this.setLabel(_c68);
}
if(_c69!=null){
this.setToolTip(_c69);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c70=this.bindingWindow.WindowManager;
if(_c6a!=null){
this.oncommand=function(){
Binding.evaluate(_c6a,this);
};
}
if(_c6b!=null){
this.onfocus=function(){
Binding.evaluate(_c6b,this);
};
}
if(_c6c!=null){
this.onblur=function(){
Binding.evaluate(_c6c,this);
};
}
if(_c6d==true){
this.focus();
}
if(_c6e!=null){
Binding.dotnetify(this,_c6e);
}
};
TreeNodeBinding.prototype.handleAction=function(_c71){
TreeNodeBinding.superclass.handleAction.call(this,_c71);
switch(_c71.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c71.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c72,_c73){
var _c74=true;
if(_c72 instanceof TreeNodeBinding){
var _c75=false;
var _c76=this.bindingElement;
var _c77=this.containingTreeBinding.bindingElement;
while(!_c75&&_c76!=_c77){
if(_c76==_c72.getBindingElement()){
_c75=true;
}else{
_c76=_c76.parentNode;
}
}
if(_c75){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c74=false;
}else{
this.acceptTreeNodeBinding(_c72,_c73);
}
}else{
_c74=false;
}
return _c74;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c78,_c79){
var _c7a=_c78.serializeToString();
var _c7b=new BindingParser(this.bindingDocument);
var _c7c=_c7b.parseFromString(_c7a).getFirst();
_c79=_c79?_c79:this.containingTreeBinding.getDropIndex();
var _c7d=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c7c,_c7d.get(_c79));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c78.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c7e=this.getProperty("image");
var _c7f=this.getProperty("image-active");
var _c80=this.getProperty("image-disabled");
_c7f=_c7f?_c7f:this.isContainer?_c7e?_c7e:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c7e?_c7e:TreeNodeBinding.DEFAULT_ITEM;
_c80=_c80?_c80:this.isContainer?_c7e?_c7e:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c7e?_c7e:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c7e=_c7e?_c7e:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c7e,imageHover:null,imageActive:_c7f,imageDisabled:_c80});
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
TreeNodeBinding.prototype.setLabel=function(_c82){
this.setProperty("label",String(_c82));
if(this.isAttached){
this.labelBinding.setLabel(String(_c82));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c83){
this.setProperty("tooltip",String(_c83));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c83));
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
var _c84=this.imageProfile.getDefaultImage();
var _c85=this.imageProfile.getActiveImage();
_c85=_c85?_c85:_c84;
return this.isOpen?_c85:_c84;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c87=DOMEvents.getTarget(e);
var _c88=this.labelBinding.bindingElement;
var _c89=this.labelBinding.shadowTree.labelBody;
var _c8a=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c87){
case _c88:
this._onAction(e);
break;
case _c89:
case _c8a:
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
if(_c87.parentNode==this.bindingElement&&_c87.__updateType==Update.TYPE_INSERT){
var _c88=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c87)=="treenode"){
if(_c87==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c87,_c88.nextSibling);
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
switch(_c87){
case _c88:
case _c89:
case _c8a:
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
var _c8e=true;
if(e.type=="mousedown"){
var _c8f=e.button==(e.target?0:1);
if(!_c8f){
_c8e=false;
}
}
if(_c8e){
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
var _c91=false;
if(e!=null){
_c91=e.shiftKey;
}
this.dispatchAction(_c91?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c94=this.getDescendantBindingsByLocalName("treenode");
_c94.each(function(_c95){
_c95.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c96){
var _c97=_c96.getAttribute("focused");
if(_c97=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c98){
var _c99=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c98);
return UserInterface.registerBinding(_c99,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c9a){
var _c9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c9a);
return UserInterface.registerBinding(_c9b,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c9c){
this.bindingElement.style.left=_c9c.x+"px";
this.bindingElement.style.top=_c9c.y+"px";
this._geometry.x=_c9c.x;
this._geometry.y=_c9c.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c9d){
var _c9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c9d);
return UserInterface.registerBinding(_c9e,TreePositionIndicatorBinding);
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
this.addFilter(function(_ca0){
var _ca1=UserInterface.getBinding(_ca0);
var _ca2=null;
var _ca2=null;
if(!_ca1 instanceof TreeNodeBinding){
_ca2=NodeCrawler.SKIP_NODE;
}
return _ca2;
});
this.addFilter(function(_ca3,list){
var _ca5=UserInterface.getBinding(_ca3);
var _ca6=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca5.isOpen){
list.add(_ca5);
}
break;
}
return _ca6;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca7){
this.binding=_ca7;
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
DockTabsButtonBinding.newInstance=function(_ca8){
var _ca9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca8);
_ca9.setAttribute("type","checkbox");
_ca9.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca9.className="tabbutton";
return UserInterface.registerBinding(_ca9,DockTabsButtonBinding);
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
var _caa=DockBinding.superclass.serialize.call(this);
if(_caa){
_caa.active=this.isActive?true:null;
_caa.collapsed=this.isCollapsed?true:null;
}
return _caa;
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
DockBinding.prototype.interceptDisplayChange=function(_cac){
var _cad=this.getSelectedTabPanelBinding();
if(_cad){
_cad.isVisible=_cac;
_cad.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cae){
var _caf=this._getBindingForDefinition(_cae);
var _cb0=DockTabBinding.newInstance(this.bindingDocument);
_cb0.setHandle(_cae.handle);
_cb0.setLabel(_cae.flowHandle?null:_cae.label);
_cb0.setImage(_cae.image);
_cb0.setToolTip(_cae.toolTip);
_cb0.setEntityToken(_cae.entityToken);
_cb0.setAssociatedView(_caf);
this.appendTabByBindings(_cb0,null);
this._setupPageBindingListeners(_cb0);
var _cb1=this.getTabPanelBinding(_cb0);
_caf.snapToBinding(_cb1);
var _cb2=this.bindingWindow.bindingMap.views;
_cb2.add(_caf);
if(!this.isActive){
this.activate();
}
_caf.attach();
};
DockBinding.prototype.prepareOpenView=function(_cb3,_cb4){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cb4.setLabel(_cb3.label);
_cb4.setImage(_cb3.image);
_cb4.setToolTip(_cb3.toolTip);
this._setupPageBindingListeners(_cb4);
var _cb5=this.getTabPanelBinding(_cb4);
var _cb6=this._getBindingForDefinition(_cb3);
_cb4.setAssociatedView(_cb6);
_cb6.snapToBinding(_cb5);
UserInterface.getBinding(this.bindingDocument.body).add(_cb6);
_cb6.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb7){
var _cb8=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb8.bindingDocument);
view.setDefinition(_cb7);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cba){
var _cbb=this.getTabPanelBinding(_cba);
var self=this;
var _cbd={handleAction:function(_cbe){
var _cbf=_cbe.target;
switch(_cbe.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cbf.reflex(true);
var view=_cba.getAssociatedView();
if(_cbf.bindingWindow==view.getContentWindow()){
_cba.updateDisplay(_cbf);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cba.onPageInitialize(_cbf);
_cbe.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cba.getAssociatedView();
if(_cbf.bindingWindow==view.getContentWindow()){
_cba.updateDisplay(_cbf);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cba.updateDisplay(_cbf);
_cbe.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cba.updateEntityToken(_cbf);
_cbe.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cba.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cba.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cba);
_cbe.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cba,true);
_cbe.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cba);
break;
case Binding.ACTION_FORCE_REFLEX:
_cbb.reflex(true);
_cbe.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cba.isDirty){
_cba.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cc1){
_cbb.addActionListener(_cc1,_cbd);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc2){
DockBinding.superclass.handleAction.call(this,_cc2);
var _cc3=_cc2.target;
switch(_cc2.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc2.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cc3 instanceof DockBinding){
if(_cc3.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cc3);
if(this.isActive){
_cc3.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cc3);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cc4,arg){
DockBinding.superclass.handleBroadcast.call(this,_cc4,arg);
switch(_cc4){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cc6=arg;
if(_cc6.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cc6.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc7){
var tabs=this.getTabBindings();
var _cc9=false;
while(tabs.hasNext()&&!_cc9){
var tab=tabs.getNext();
var _ccb=tab.getEntityToken();
if(_ccb!=null&&_ccb==_cc7){
if(!tab.isSelected){
this.select(tab,true);
_cc9=true;
}
}
}
};
DockBinding.prototype.collapse=function(_ccc){
this._handleCollapse(true,_ccc);
};
DockBinding.prototype.unCollapse=function(_ccd){
this._handleCollapse(false,_ccd);
};
DockBinding.prototype._handleCollapse=function(_cce,_ccf){
var _cd0=this.getChildBindingByLocalName("dockpanels");
var _cd1=this.getAncestorBindingByLocalName("splitbox");
if(_cce){
_cd0.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_ccf&&_cd1.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cd0.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_ccf){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cce);
this.isCollapsed=_cce;
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
DockBinding.prototype.closeTab=function(_cd6,_cd7){
if(_cd6.isDirty&&!_cd7){
var _cd8=Resolver.resolve(_cd6.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd8),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cda){
switch(_cda){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cd6);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cd6);
break;
}
}});
}else{
this.removeTab(_cd6);
}
};
DockBinding.prototype.closeTabsExcept=function(_cdb){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cdb){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cde){
var _cdf=_cde.getAssociatedView();
_cdf.saveContainedEditor();
var self=this;
var _ce1={handleBroadcast:function(_ce2,arg){
switch(_ce2){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cdf.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ce1);
if(arg.isSuccess){
self.removeTab(_cde);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ce1);
};
DockBinding.prototype.appendTabByBindings=function(_ce4,_ce5){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ce4,_ce5);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ce6){
_ce6=_ce6?_ce6+"px":"100%";
this.bindingElement.style.width=_ce6;
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
var _ce7=null;
var _ce8=this.getTabBindings();
var _ce9=_ce8.getLength();
if(_ce9==1){
_ce7=null;
}else{
_ce7=_ce8.get(0);
}
return _ce7;
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
var _ceb=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ceb)){
_ceb=_ceb>0?_ceb-1:0;
self.bindingElement.style.width=new String(_ceb)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cec){
DockTabsBinding.superclass.handleCrawler.call(this,_cec);
switch(_cec.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cee=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cee)){
_cee=_cee>0?_cee-1:0;
self.bindingElement.style.width=new String(_cee)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cef){
var _cf0=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cef);
return UserInterface.registerBinding(_cf0,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cf1){
this._viewBinding=_cf1;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cf2=DockTabBinding.superclass.serialize.call(this);
if(_cf2){
_cf2.label=null;
_cf2.image=null;
_cf2.handle=this.getHandle();
}
return _cf2;
};
DockTabBinding.prototype.setHandle=function(_cf3){
this.setProperty("handle",_cf3);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cf4){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cf4;
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
var _cf5=DialogControlBinding.newInstance(this.bindingDocument);
_cf5.setControlType(ControlBinding.TYPE_CLOSE);
_cf5.attachClassName("closecontrol");
this._controlGroupBinding.add(_cf5);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_cf6){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cf6){
this.isDirty=_cf6;
if(Binding.exists(this.labelBinding)){
var _cf7=this.labelBinding.getLabel();
if(_cf7!=null){
this.labelBinding.setLabel(_cf6?"*"+_cf7:_cf7.slice(1,_cf7.length));
}else{
this.labelBinding.setLabel(_cf6?"*":"");
}
}
}
var _cf8=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf8.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf8.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf9){
this.setLabel(_cf9.getLabel());
this.setImage(_cf9.getImage());
this.setToolTip(_cf9.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cfa){
this.setEntityToken(_cfa.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cfb){
DockTabBinding.superclass.handleAction.call(this,_cfb);
var _cfc=_cfb.target;
switch(_cfb.type){
case ControlBinding.ACTION_COMMAND:
if(_cfc.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cfb.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cfc);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cfd){
var cmd=_cfd.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cff){
if(!_cff){
if(!this.getLabel()){
_cff=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cff=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cff=this.isDirty?"*"+_cff:_cff;
DockTabBinding.superclass.setLabel.call(this,_cff);
};
DockTabBinding.prototype.setImage=function(_d00){
if(!_d00){
if(!this.getImage()){
_d00=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d00=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d00);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d03=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d03;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d03;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d03;
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
var _d05=this.bindingElement;
setTimeout(function(){
_d05.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d06,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d06,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d06){
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
DockTabBinding.prototype.select=function(_d0b){
DockTabBinding.superclass.select.call(this,_d0b);
this._updateBroadcasters();
if(_d0b!=true){
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
var _d0c=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d0d=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d0d.enable();
if(this.isDirty){
_d0c.enable();
}else{
_d0c.disable();
}
}else{
_d0d.disable();
_d0c.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d0e){
if(this._canUpdateTree||_d0e){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d0f=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d11=win.bindingMap.savebutton;
if(_d11!=null){
_d0f=true;
}
}
}
return _d0f;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d12){
var _d13=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d12);
return UserInterface.registerBinding(_d13,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d14){
var _d15=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d14);
return UserInterface.registerBinding(_d15,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d16){
DockPanelBinding.superclass.select.call(this,_d16);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d17){
DockPanelBinding.superclass.handleCrawler.call(this,_d17);
if(_d17.response==null){
if(_d17.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d17.id==FocusCrawler.ID){
_d17.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d18){
var _d19=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d18);
return UserInterface.registerBinding(_d19,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d1a){
var _d1b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d1a);
return UserInterface.registerBinding(_d1b,DockControlBinding);
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
ViewBinding.getInstance=function(_d1c){
var _d1d=ViewBinding._instances.get(_d1c);
if(!_d1d){
var cry="ViewBinding.getInstance: No such instance: "+_d1c;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d1d;
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
var _d20=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d20){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d21=snap.boxObject.getGlobalPosition();
var _d22=snap.boxObject.getDimension();
if(!Point.isEqual(_d21,this._lastknownposition)){
this.setPosition(_d21);
this._lastknownposition=_d21;
}
if(!Dimension.isEqual(_d22,this._lastknowndimension)){
this.setDimension(_d22);
this._lastknowndimension=_d22;
var _d23=_d22.h-ViewBinding.VERTICAL_ADJUST;
_d23=_d23<0?0:_d23;
this.windowBinding.getBindingElement().style.height=new String(_d23)+"px";
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
var _d24=this._viewDefinition.flowHandle;
if(_d24!=null){
FlowControllerService.CancelFlow(_d24);
}
}
if(this._viewDefinition!=null){
var _d25=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d25);
this.logger.fine("ViewBinding closed: \""+_d25+"\"");
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
var _d27=null;
if(this._viewDefinition!=null){
_d27=this._viewDefinition.handle;
}
return _d27;
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
ViewBinding.prototype.setDefinition=function(_d28){
this._viewDefinition=_d28;
if(_d28.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d29){
ViewBinding.superclass.handleAction.call(this,_d29);
var _d2a=_d29.target;
switch(_d29.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d29.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d2a.isActivated){
_d2a.onActivate();
}
}
_d29.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d2a==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d29.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d2a==this._snapBinding){
if(_d2a.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d2a.getContentWindow().isPostBackDocument){
if(_d29.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d2a.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d2a==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d2a.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d29.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d29.type==WindowBinding.ACTION_ONLOAD){
var win=_d2a.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d2a);
}
}
}
_d29.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d2a.label&&this._viewDefinition.label){
_d2a.label=this._viewDefinition.label;
}
if(!_d2a.image&&this._viewDefinition.image){
_d2a.image=this._viewDefinition.image;
}
if(_d2a.bindingWindow==this.getContentWindow()){
this._pageBinding=_d2a;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d2a.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d2a==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d29.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d29.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d2f,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d2f,arg);
switch(_d2f){
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
var _d33=def.argument;
if(_d33!=null){
page.setPageArgument(_d33);
}
var _d34=def.width;
if(_d34!=null){
page.width=_d34;
}
var _d35=def.height;
if(_d35!=null){
page.height=_d35;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d36){
ViewBinding.superclass.handleCrawler.call(this,_d36);
switch(_d36.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d36.id==FocusCrawler.ID){
if(_d36.previousNode!=this._snapBinding.bindingElement){
_d36.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d36.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d37){
_d37.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d37.x+"px";
this.bindingElement.style.top=_d37.y+"px";
};
ViewBinding.prototype.setDimension=function(_d38){
_d38.h-=ViewBinding.VERTICAL_ADJUST;
_d38.w-=ViewBinding.HORIZONTAL_ADJUST;
_d38.w-=1;
if(_d38.h<0){
_d38.h=0;
}
if(_d38.w<0){
_d38.w=0;
}
this.bindingElement.style.width=String(_d38.w)+"px";
this.bindingElement.style.height=String(_d38.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d39){
this.isFlexBoxBehavior=false;
_d39.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d39.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d39.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d39;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d3a=null;
if(this.isFreeFloating==true){
_d3a=this._snapBinding.getBindingElement();
}else{
_d3a=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d3a;
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
ViewBinding.prototype.reload=function(_d3b){
this._isLoaded=false;
this.windowBinding.reload(_d3b);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d3c=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d3c=true;
}
}
if(!_d3c){
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
ViewBinding.newInstance=function(_d40){
var _d41=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d40);
var _d42=UserInterface.registerBinding(_d41,ViewBinding);
_d42.windowBinding=_d42.add(WindowBinding.newInstance(_d40));
return _d42;
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
var _d4a=this.bindingWindow.__doPostBack;
var _d4b=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d4b){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d4c,_d4d){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d4b=true;
}
self.manifestAllDataBindings();
_d4a(_d4c,_d4d);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d4e,list){
var _d50=this.bindingWindow.bindingMap.__REQUEST;
if(_d50!=null&&this._isDotNet()){
switch(_d4e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d50.postback(_d4e);
}
}
break;
default:
_d50.postback(_d4e);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d4e,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d51,list){
var _d53=this.getDescendantBindingsByType(WindowBinding);
_d53.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d51,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d57){
if(_d57.name==null||_d57.name==""){
return;
}
list.add({name:_d57.name,value:_d57.value});
});
var out="";
list.each(function(_d59){
out+=_d59.name+": "+_d59.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d5a){
PageBinding.superclass.handleAction.call(this,_d5a);
var _d5b=_d5a.target;
switch(_d5a.type){
case RootBinding.ACTION_PHASE_3:
if(_d5b==UserInterface.getBinding(this.bindingDocument.body)){
_d5b.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d5b);
}
_d5a.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d5c=this.validateAllDataBindings();
if(_d5c){
this.doPostBack(_d5b);
}
}
_d5a.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d5a.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d5b.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d5b.key)){
this._initBlockers.del(_d5b.key);
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
var _d5e={handleAction:function(_d5f){
if(_d5f.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d5e);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d5e);
}else{
MessageQueue.udpdate();
}
_d5a.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d60,arg){
PageBinding.superclass.handleBroadcast.call(this,_d60,arg);
switch(_d60){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d62=arg;
if(!this._canPostBack&&!_d62){
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
PageBinding.prototype.doPostBack=function(_d64){
if(this._canPostBack){
if(_d64!=null&&this._isDotNet()){
var _d65=_d64.getCallBackID();
var _d66=_d64.getCallBackArg();
if(_d65!=null){
_d65=_d65.replace(/_/g,"$");
}else{
_d65="";
}
if(_d66==null){
_d66="";
}
this.bindingWindow.__doPostBack(_d65,_d66);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d67){
var _d68=true;
var _d69=this.bindingWindow.DataManager.getAllDataBindings();
while(_d69.hasNext()&&_d68){
var _d6a=_d69.getNext();
if(_d6a.isAttached){
var _d6b=_d6a.validate();
if(_d68&&!_d6b){
_d68=false;
this.logger.debug("Invalid DataBinding: "+_d6a.toString()+" ("+_d6a.getName()+")");
if(_d67){
var _d6c=_d6a.getAncestorBindingByType(TabPanelBinding);
if(_d6c!=null&&!_d6c.isVisible){
var _d6d=_d6c.getAncestorBindingByType(TabBoxBinding);
var _d6e=_d6d.getTabBinding(_d6c);
_d6d.select(_d6e);
}
}
break;
}
}
}
return _d68;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d70=this.bindingWindow.DataManager.getAllDataBindings();
while(_d70.hasNext()){
var _d71=_d70.getNext();
if(_d71.isAttached){
var _d72=_d71.manifest();
if(_d72!=null){
list.add(_d72);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d73=this.bindingWindow.DataManager.getAllDataBindings();
while(_d73.hasNext()){
var _d74=_d73.getNext();
if(_d74.isAttached){
_d74.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d75="";
if(!_d75&&this.labelfield){
var _d76=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d76!=null&&_d76.getLabel){
_d75=_d76.getLabel();
}else{
if(_d76!=null&&_d76.getValue){
_d75=_d76.getValue();
}
}
}
if(!_d75&&this.label){
_d75=this.label;
}
return _d75;
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
var _d79=this._cachedFocus.getBinding();
if(_d79){
_d79.blur();
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
var _d7a=this.getProperty("width");
if(!_d7a){
_d7a=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d7a;
}
if(this.height==null){
var _d7b=this.getProperty("height");
this.height=_d7b?_d7b:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d7c=this.getProperty("minheight");
if(_d7c!=null){
this.minheight=_d7c;
}
}
if(this.controls==null){
var _d7d=this.getProperty("controls");
this.controls=_d7d?_d7d:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d7e=this.getProperty("resizable");
this.isResizable=_d7e?_d7e:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d7f=this.getProperty("image");
var _d80=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d7f&&_d80){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d7f);
_d80.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d82){
if(_d82!=this.isAutoHeightLayoutMode){
if(_d82){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d82;
}
};
DialogPageBinding.prototype.handleAction=function(_d83){
DialogPageBinding.superclass.handleAction.call(this,_d83);
var _d84=_d83.target;
switch(_d83.type){
case PageBinding.ACTION_ATTACHED:
if(_d84!=this&&_d84.isFitAsDialogSubPage){
_d84.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d83.consume();
if(_d84.response!=null){
this.response=_d84.response;
switch(_d84.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d85){
var _d86=this.bindingWindow.bindingMap.buttonAccept;
if(_d86!=null){
_d86.setDisabled(_d85);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d87){
var _d88=CSSComputer.getPadding(this.bindingElement);
var _d89=CSSComputer.getBorder(this.bindingElement);
_d87+=_d88.top+_d88.bottom;
_d87+=_d89.top+_d89.bottom;
if(_d87>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d87+"px";
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
EditorPageBinding.prototype.handleAction=function(_d91){
EditorPageBinding.superclass.handleAction.call(this,_d91);
var _d92=_d91.target;
switch(_d91.type){
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
var _d93=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d92.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d93==-1){
_d93=0;
}
}else{
_d93++;
}
return res;
});
if(_d93>-1){
this._messengers.del(_d93);
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
_d91.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d92.key,_d92);
if(_d92 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d92.key);
if(_d92 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d92==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d92.getSelectedTabBinding();
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
_d91.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d92==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d91.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d92==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d91.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d92==this._windowBinding){
if(_d92.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d98=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d98);
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
var _d99=this.bindingWindow.bindingMap.savebutton;
if(_d99!=null&&!_d99.isDisabled){
_d99.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9a=this.bindingWindow.bindingMap.__REQUEST;
if(_d9a!=null){
_d9a.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9b=this.bindingWindow.bindingMap.__REQUEST;
if(_d9b!=null){
_d9b.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d9c){
this._message=null;
switch(_d9c){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d9c,this._messengers);
if(!this._messengers.hasEntries()){
if(_d9c==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d9c;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d9c;
EditorPageBinding.superclass.postMessage.call(this,_d9c,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d9c,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d9d,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d9d,arg);
switch(_d9d){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d9f=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d9f);
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
var _da0=new List();
this._invalidBindings.each(function(key,_da2){
var list=_da2.getInvalidLabels();
if(list){
list.each(function(_da4){
_da0.add(_da4);
});
}
});
if(_da0.hasEntries()){
var _da5="";
while(_da0.hasNext()){
_da5+=_da0.getNext().toLowerCase();
if(_da0.hasNext()){
_da5+=", ";
}else{
_da5+=".";
}
}
var _da6=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da6+" "+_da5);
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
EditorPageBinding.prototype.enableSave=function(_da7){
var _da8=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da8){
var _da9=UserInterface.getBinding(_da8);
if(_da7){
_da9.enable();
}else{
_da9.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _daa=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_daa!=null){
UserInterface.getBinding(_daa).enable();
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
var _dab=this._windowBinding.getContentDocument().title;
if(_dab==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _dac=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_dae){
if(_dae.name=="__EVENTTARGET"&&_dac){
_dae.value=_dac;
}
list.add({name:_dae.name,value:_dae.value});
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
var _db0=this.getProperty("responseid");
this.responseid=_db0;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_db1){
ResponsePageBinding.superclass.handleAction.call(this,_db1);
switch(_db1.type){
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
WizardPageBinding.prototype.handleAction=function(_db2){
WizardPageBinding.superclass.handleAction.call(this,_db2);
var _db3=_db2.target;
switch(_db2.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_db3);
}else{
_db2.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_db3);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_db2.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_db2.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db4){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db6=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db4);
}
if(_db6){
_db6.setDisabled(!_db4);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db7,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db7,arg);
var self=this;
switch(_db7){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dbb){
};
MarkupAwarePageBinding.prototype._activate=function(_dbc){
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
var _dbd=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dbd.boxObject.getDimension().w;
_dbd.hide();
var _dbe=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dbe+"px";
var self=this;
var _dc0=this.bindingWindow.bindingMap.moreactionsbutton;
_dc0.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dc1){
self._showMoreActions();
_dc1.consume();
}});
var _dc2=this.bindingWindow.bindingMap.moreactionspopup;
_dc2.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dc3){
var item=_dc3.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dc5,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dc5,arg);
switch(_dc5){
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
var _dc9=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc9!=null){
_dc9.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dca=this.bindingWindow.WindowManager;
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
var _dcb=new String("");
this._actionProfile.each(function(_dcc,list){
list.each(function(_dce){
_dcb+=_dce.getHandle()+";"+_dce.getKey()+";";
if(_dce.isDisabled()){
_dcb+="isDisabled='true';";
}
});
});
return _dcb;
};
SystemToolBarBinding.prototype.handleAction=function(_dcf){
SystemToolBarBinding.superclass.handleAction.call(this,_dcf);
switch(_dcf.type){
case ButtonBinding.ACTION_COMMAND:
var _dd0=_dcf.target;
this._handleSystemAction(_dd0.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dd1){
if(_dd1!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dd3=list.getFirst();
var _dd4=_dd3.node;
}
SystemAction.invoke(_dd1,_dd4);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd7,list){
var _dd9=new List();
list.reset();
while(list.hasNext()){
var _dda=list.getNext();
var _ddb=null;
if(_dda.isInToolBar()){
if(_dda.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_ddb=self.getToolBarButtonBinding(_dda);
}
}
if(_ddb!=null){
_dd9.add(_ddb);
}
}
if(_dd9.hasEntries()){
var _ddc=ToolBarGroupBinding.newInstance(doc);
_dd9.each(function(_ddd){
_ddc.add(_ddd);
});
self.addLeft(_ddc);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dde=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _ddf=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_ddf=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _de0=0;
var _de1=new List();
var _de2,_de3=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_de2=_de3.getNext())!=null){
if(!_de2.isVisible){
_de2.show();
}
_de0+=_de2.boxObject.getDimension().w;
if(_de0>=_ddf){
_de1.add(_de2);
_de2.hide();
}
}
if(_de1.hasEntries()){
var _de4=_de1.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_de4).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_de2=_de1.getNext())!=null){
this._moreActions.add(_de2.associatedSystemAction);
}
_dde.show();
}else{
this._moreActions=null;
_dde.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _de5=this.bindingWindow.bindingMap.moreactionspopup;
_de5.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_de5.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_de5.add(item);
}
_de5.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_de7){
var _de8=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _de9=_de7.getLabel();
var _dea=_de7.getToolTip();
var _deb=_de7.getImage();
var _dec=_de7.isDisabled();
if(_deb){
_de8.setImage(_deb);
}
if(_de9){
_de8.setLabel(_de9);
}
if(_dea){
_de8.setToolTip(_dea);
}
if(_de7.isDisabled()){
_de8.disable();
}
_de8.associatedSystemAction=_de7;
return _de8;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _ded=this.getDescendantBindingByLocalName("toolbarbutton");
if(_ded!=null){
_ded.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dee){
var _def=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dee);
return UserInterface.registerBinding(_def,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_df0){
this.bindingElement.style.left=_df0.x+"px";
this.bindingElement.style.top=_df0.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_df1){
_df1.h-=ViewBinding.VERTICAL_ADJUST;
_df1.w-=ViewBinding.HORIZONTAL_ADJUST;
_df1.w-=1;
if(_df1.h<0){
_df1.h=0;
}
if(_df1.w<0){
_df1.w=0;
}
this.bindingElement.style.width=String(_df1.w)+"px";
this.bindingElement.style.height=String(_df1.h)+"px";
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
SystemTreeBinding.prototype.add=function(_df2){
var _df3=SystemTreeBinding.superclass.add.call(this,_df2);
if(!this._defaultTreeNode){
if(_df2 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_df2;
}
}
return _df3;
};
SystemTreeBinding.prototype.handleAction=function(_df4){
SystemTreeBinding.superclass.handleAction.call(this,_df4);
var _df5=_df4.target;
switch(_df4.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df5.key);
this._updateFocusedNode();
_df4.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_df4.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df5.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_df4.consume();
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
var _df7=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df7);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df8){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df8);
var reg=this._entityTokenRegistry;
var _dfa=_df8.node.getEntityToken();
if(reg.has(_dfa)){
reg.get(_dfa).add(_df8);
}else{
reg.set(_dfa,new List([_df8]));
}
var _dfb=null;
if(this.isLockedToEditor){
if(_dfa==StageBinding.entityToken){
if(_df8.node.isTreeLockEnabled()){
_dfb=_df8;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df8.node.getHandle()){
_dfb=_df8;
}
}
}
if(_dfb!=null){
this.focusSingleTreeNodeBinding(_dfb);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dfc){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dfc);
var reg=this._entityTokenRegistry;
var _dfe=_dfc.node.getEntityToken();
if(reg.has(_dfe)){
var list=reg.get(_dfe);
list.del(_dfc);
if(!list.hasEntries()){
reg.del(_dfe);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dfc.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dfc.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e02=this._refreshingTreeNodes;
if(_e02.hasEntries()&&_e02.has(key)){
_e02.del(key);
if(!_e02.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e03=StageBinding.entityToken;
if(_e03!=null){
this._focusTreeNodeByEntityToken(_e03);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e04=false;
var _e05=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e04=false;
}else{
if(_e05.hasEntries()){
_e04=true;
while(_e04&&_e05.hasNext()){
var _e06=_e05.getNext();
if(!_e06.isDraggable){
_e04=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e04;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e07,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e07,arg);
switch(_e07){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e07,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e07);
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
var self=this,_e0b=arg;
setTimeout(function(){
if(_e0b!=null){
self._focusTreeNodeByEntityToken(_e0b);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e0d=tab.perspectiveNode==null;
if(!_e0d){
_e0d=tab.perspectiveNode==this.perspectiveNode;
}
if(_e0d){
var self=this,_e0f=tab.getEntityToken();
setTimeout(function(){
if(_e0f!=null){
self._focusTreeNodeByEntityToken(_e0f);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e10,_e11){
this.isLockFeatureFocus=true;
var _e12=null;
if(this._entityTokenRegistry.has(_e10)){
var list=this._entityTokenRegistry.get(_e10);
list.each(function(tn){
var _e15=true;
if(tn.node.isTreeLockEnabled()){
_e12=tn;
_e15=false;
}
return _e15;
});
if(_e12!=null){
if(!_e12.isFocused){
this.focusSingleTreeNodeBinding(_e12,true);
}else{
_e12.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e12==null&&_e11!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e10);
self._focusTreeNodeByEntityToken(_e10,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e17){
var _e18=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e19=this.getRootTreeNodeBindings();
while(_e19.hasNext()){
var _e1a=_e19.getNext();
_e18.add(_e1a.node.getEntityToken());
}
}else{
_e18.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e18.hasNext()){
var _e1b=_e18.getNext();
var _e1c=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e1b,_e17,_e1c);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e1f=this._treeNodeBindings;
var _e20=new Map();
function fix(_e21,list){
if(!_e21.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e1f.has(node.getHandle())){
var _e24=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e20.set(node.getHandle(),_e24);
_e21.add(_e24);
}
});
_e21.attachRecursive();
}
}
_e21.open(true);
}
map.each(function(_e25,list){
if(_e1f.has(_e25)){
var _e27=_e1f.get(_e25);
fix(_e27,list);
}else{
if(_e20.has(_e25)){
var _e28=_e20.get(_e25);
fix(_e28,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e29,arg){
switch(_e29){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2b=arg;
if(_e2b!=null){
this._invokeServerRefresh(_e2b);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e2c=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e2c;
_e2c.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e2c=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e2c;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e2d){
if(_e2d!=null&&_e2d=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e2d)){
var list=this._entityTokenRegistry.get(_e2d).reset();
this._refreshToken=_e2d;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e2f=list.getNext();
this._refreshingTreeNodes.set(_e2f.key,true);
setTimeout(function(){
_e2f.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e30=this.getFocusedTreeNodeBindings().getFirst();
if(_e30){
var _e31=_e30.getLabel();
var _e32=_e30.getAncestorBindingByLocalName("treenode");
if(_e32){
_e30=_e32;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e30.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e33=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e33,[_e31]);
}
_e30.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e34=SystemTreeBinding.clipboard;
if(_e34){
var type=_e34.dragType;
var _e36=this.getFocusedTreeNodeBindings().getFirst();
if(_e36.dragAccept){
if(_e36.acceptor.isAccepting(type)){
this._performPaste(_e36);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e37){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e37.node.hasDetailedDropSupport()){
if(_e37.node.hasChildren()){
var _e39=_e37.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e3a,_e3b){
if(_e3a==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e3c=_e3b.get("switch");
var _e3d=_e3b.get("sibling");
if(_e3c=="after"){
_e3d++;
}
var _e3e=_e37.accept(SystemTreeBinding.clipboard,_e3d);
if(_e3e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e39);
}else{
Application.lock(self);
var _e3f=_e37.accept(SystemTreeBinding.clipboard,0);
if(_e3f){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e3f=_e37.accept(SystemTreeBinding.clipboard,0);
if(_e3f){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e40=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e40!=null){
this._focusTreeNodeByEntityToken(_e40);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e41){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e41){
this.blurSelectedTreeNodes();
var _e42=this.getRootTreeNodeBindings();
_e42.each(function(_e43){
if(_e43.isContainer&&_e43.isOpen){
_e43.close();
_e43.hasBeenOpened=false;
_e43.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e44){
if(_e44!=this.isLockedToEditor){
this.isLockedToEditor=_e44;
if(_e44){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e46=this.getRootTreeNodeBindings();
_e46.each(function(_e47){
var _e48=_e47.getOpenSystemNodes();
if(_e48!=null&&_e48.hasEntries()){
list.merge(_e48);
}else{
if(_e47.isOpen){
list.add(_e47.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e49){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e49);
if(_e49!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e4a){
if(_e4a){
var list=new List(_e4a.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e4c=new Map();
var _e4d=this.getFocusedTreeNodeBindings().getFirst();
var _e4e=_e4d.node.getActionProfile();
if(_e4e!=null){
var self=this;
_e4e.each(function(_e50,list){
var _e52=new List();
list.each(function(_e53){
if(_e53.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e53.getGroupName()]){
_e52.add(_e53);
}
}
});
if(_e52.hasEntries()){
_e4c.set(_e50,_e52);
}
});
}
_e4c.activePosition=this._activePosition;
var _e54=_e4d.node.getPropertyBag();
if(_e54&&_e54.Uri&&_e54.ElementType==="application/x-composite-page"){
_e4c.Uri=_e54.Uri;
}
_e4c.EnitityToken=_e4d.node.getEntityToken();
return _e4c;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e55,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e55,arg);
switch(_e55){
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
var _e5a=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e5a.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e5b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e5b.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e5c){
SystemTreePopupBinding.superclass.handleAction.call(this,_e5c);
switch(_e5c.type){
case MenuItemBinding.ACTION_COMMAND:
var _e5d=_e5c.target;
var _e5e=_e5d.associatedSystemAction;
if(_e5e){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e60=list.getFirst();
var _e61=_e60.node;
}
SystemAction.invoke(_e5e,_e61);
}else{
var cmd=_e5d.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e64=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e64=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e64=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e64=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e64=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e64){
setTimeout(function(){
EventBroadcaster.broadcast(_e64);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e65=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e65.hasNext()){
var _e66=UserInterface.getBinding(_e65.getNext());
if(!_e66.getProperty("rel")){
_e66.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e68=new List();
var self=this;
this._actionProfile.each(function(_e6a,list){
var _e6c=MenuGroupBinding.newInstance(doc);
list.each(function(_e6d){
var _e6e=self.getMenuItemBinding(_e6d);
_e6c.add(_e6e);
});
_e68.add(_e6c);
});
_e68.reverse();
while(_e68.hasNext()){
this._bodyBinding.addFirst(_e68.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e6f){
var _e70=MenuItemBinding.newInstance(this.bindingDocument);
var _e71=_e6f.getLabel();
var _e72=_e6f.getToolTip();
var _e73=_e6f.getImage();
var _e74=_e6f.getDisabledImage();
var _e75=_e6f.isCheckBox();
if(_e71){
_e70.setLabel(_e71);
}
if(_e72){
_e70.setToolTip(_e72);
}
if(_e73){
_e70.imageProfile=new ImageProfile({image:_e73,imageDisabled:_e74});
}
if(_e75){
_e70.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e6f.isChecked()){
_e70.check(true);
}
}
if(_e6f.isDisabled()){
_e70.disable();
}
_e70.associatedSystemAction=_e6f;
return _e70;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e79=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e79=UserInterface.getBinding(node);
if(_e79.isDisabled){
_e79=null;
}
}
break;
}
if(_e79!=null&&_e79.node!=null&&_e79.node.getActionProfile()!=null){
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
var _e7a=this.node.getLabel();
if(_e7a){
this.setLabel(_e7a);
}
var _e7b=this.node.getToolTip();
if(_e7b){
this.setToolTip(_e7b);
}
var _e7c=this.node.getHandle();
if(_e7c){
this.setHandle(_e7c);
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
var _e7f="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e7f+=list.getNext();
if(list.hasNext()){
_e7f+=" ";
}
}
this.setProperty("dragaccept",_e7f);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e81){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e81);
switch(_e81.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e81.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e81.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e82,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e82,arg);
switch(_e82){
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
var _e85=null;
var _e86=this.node.getImageProfile();
if(_e86){
if(this.isOpen){
_e85=_e86.getActiveImage();
}else{
_e85=_e86.getDefaultImage();
}
}
if(!_e85){
_e85=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e85;
};
SystemTreeNodeBinding.prototype.open=function(_e87){
var _e88=this.isContainer&&!this.isOpen;
var _e89=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e88&&(_e89||SystemTreeBinding.HAS_NO_MEMORY)&&_e87!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e8a=null;
if(this.isContainer){
_e8a=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e8a);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e8c){
if(_e8c!=null){
this._refreshBranch(_e8c);
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
var _e8d=new List();
var _e8e=this.node.getChildren();
this.empty();
if(_e8e.hasEntries()){
this._insertTreeNodesRegulated(_e8e);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e8f){
var _e90=0;
var _e91=new List([]);
while(_e8f.hasEntries()&&_e90<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e92=SystemTreeNodeBinding.newInstance(_e8f.extractFirst(),this.bindingDocument);
_e92.autoExpand=this.autoExpand;
this.add(_e92);
_e92.attach();
_e90++;
if(this.autoExpand){
if(_e90==1&&!_e8f.hasEntries()||LocalStore.openedNodes.has(_e92.node)){
_e91.add(_e92);
}
}
}
if(_e8f.hasEntries()){
this._insertBufferTreeNode(_e8f);
}
_e91.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e95){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e97=this.node.getDescendantBranch(list);
if(_e97.hasEntries()){
this.XXX(_e97);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e98){
var self=this;
var map=new Map();
this.empty();
_e98.each(function(key,_e9c){
if(_e9c.hasEntries()){
_e9c.each(function(node){
var _e9e=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e9e);
if(map.has(key)){
var _e9f=map.get(key);
_e9f.add(_e9e);
_e9f.isOpen=true;
_e9f.hasBeenOpened=true;
node.searchToken=_e9f.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e9e);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e98.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _ea0=new TreeCrawler();
var _ea1=new List();
_ea0.mode=TreeCrawler.MODE_GETOPEN;
_ea0.crawl(this.bindingElement,_ea1);
if(_ea1.hasEntries()){
_ea1.extractFirst();
}
_ea0.dispose();
return _ea1;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _ea2=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_ea2=new List([this.node]);
list.each(function(_ea4){
_ea2.add(_ea4.node);
});
}
return _ea2;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_ea5,_ea6){
var _ea7=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_ea5 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_ea5.node.getData(),this.node.getData(),_ea6?_ea6:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_ea7);
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
SystemTreeNodeBinding.newInstance=function(node,_eab){
var _eac=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_eab);
var _ead=UserInterface.registerBinding(_eac,SystemTreeNodeBinding);
_ead.node=node;
return _ead;
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
SystemPageBinding.prototype.setPageArgument=function(_eae){
this.node=_eae;
SystemPageBinding.superclass.setPageArgument.call(this,_eae);
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
var _eaf=this.node.getChildren();
if(_eaf.hasEntries()){
while(_eaf.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_eaf.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _eb1=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_eb1.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _eb3=new TreeCrawler();
var _eb4=new List();
_eb3.mode=TreeCrawler.MODE_GETOPEN;
_eb3.crawl(this.bindingElement,_eb4);
_eb3.dispose();
var list=new List([this.node]);
_eb4.each(function(_eb6){
list.add(_eb6.node);
});
this._tree.empty();
var _eb7=this.node.getDescendantBranch(list);
if(_eb7.hasEntries()){
var self=this;
var map=new Map();
_eb7.each(function(key,_ebb){
_ebb.each(function(node){
var _ebd=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ebd);
if(map.has(key)){
var _ebe=map.get(key);
_ebe.add(_ebd);
_ebe.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ebd);
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
SystemPageBinding.prototype.handleAction=function(_ebf){
SystemPageBinding.superclass.handleAction.call(this,_ebf);
switch(_ebf.type){
case ButtonBinding.ACTION_COMMAND:
var _ec0=_ebf.target;
switch(_ec0.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ec0.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ec1,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ec1,arg);
switch(_ec1){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ec3=arg;
if(this.node&&this.node.getEntityToken()==_ec3){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ec3);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ec3);
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
StageContainerBinding.prototype.handleBroadcast=function(_ec5,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ec5,arg);
var _ec7=this.bindingWindow.WindowManager;
switch(_ec5){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ec7.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ec7.WINDOW_RESIZED_BROADCAST:
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
var _ec9=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ec9.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_eca){
if(StageBinding.isViewOpen(_eca)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eca);
}else{
var _ecb=ViewDefinitions[_eca];
StageBinding.presentViewDefinition(_ecb);
}
};
StageBinding.isViewOpen=function(_ecc){
return StageBinding.bindingInstance._activeViewDefinitions[_ecc]!=null;
};
StageBinding.selectPerspective=function(_ecd){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_ecd);
};
StageBinding.presentViewDefinition=function(_ece){
if(_ece.label!=null){
var _ecf=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ecf,[_ece.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ece);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ed1,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ed3=System.getPerspectiveNodes();
if(_ed3.hasEntries()){
this._initializeSystemViewDefinitions(_ed3);
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
var _ed5=null;
if(LocalStore.isEnabled){
_ed5=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ed5&&ViewDefinitions[_ed5]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ed5));
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
var _ed7=root.getActionProfile();
if(_ed7&&_ed7.hasEntries()){
var _ed8=top.app.bindingMap.toolsmenugroup;
if(_ed8){
_ed7.each(function(_ed9,list){
list.each(function(_edb){
var item=MenuItemBinding.newInstance(_ed8.bindingDocument);
item.setLabel(_edb.getLabel());
item.setToolTip(_edb.getToolTip());
item.setImage(_edb.getImage());
item.setDisabled(_edb.isDisabled());
item.associatedSystemAction=_edb;
var _edd=_ed8;
var tag=_edb.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_edd=top.app.bindingMap.translationsmenugroup;
break;
}
}
_edd.add(item);
});
});
_ed8.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_edf){
while(_edf.hasNext()){
var node=_edf.getNext();
var _ee1=node.getHandle();
ViewDefinitions[_ee1]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ee2){
StageBinding.superclass.handleAction.call(this,_ee2);
var _ee3=_ee2.target;
switch(_ee2.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ee3;
this._inflateBinding(_ee3);
_ee2.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ee3;
this._inflateBinding(_ee3);
_ee2.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ee2.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ee3 instanceof DockBinding){
switch(_ee3.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ee3.reference,_ee3);
break;
}
this.handleAttachedDock(_ee3);
_ee2.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ee3 instanceof DockBinding){
this.handleSelectedDockTab(_ee3.getSelectedTabBinding());
_ee2.consume();
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
_ee2.consume();
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
_ee2.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ee2);
};
StageBinding.prototype.handleBroadcast=function(_ee5,arg){
StageBinding.superclass.handleBroadcast.call(this,_ee5,arg);
switch(_ee5){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ee7=arg;
this._dontView(_ee7);
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
StageBinding.prototype._showStart=function(_ee9){
if(_ee9!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _eec=this.bindingWindow.bindingMap.maindecks;
if(_ee9){
_eec.select("startdeck");
view.show();
}else{
view.hide();
_eec.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ee9;
}
};
StageBinding.prototype._inflateBinding=function(_eed){
for(var _eee in ViewDefinitions){
var _eef=ViewDefinitions[_eee];
if(_eef instanceof SystemViewDefinition){
_eed.mountDefinition(_eef);
}
}
var _ef0=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ef0){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ef3=new StageCrawler();
_ef3.mode=mode;
_ef3.crawl(this.bindingElement);
_ef3.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ef4){
var _ef5=_ef4.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ef5);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ef5));
}
};
StageBinding.prototype.handleAttachedDock=function(_ef6){
var _ef7=_ef6.getTabBindings();
if(_ef7.hasEntries()){
while(_ef7.hasNext()){
var _ef8=_ef7.getNext();
var _ef9=_ef8.getHandle();
if(_ef9){
if(_ef9=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _efa=ViewDefinitions[_ef9];
if(_efa){
this._view(_ef6,_ef8,_efa,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ef9+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_efb){
var _efc=null;
var _efd=false;
switch(_efb.position){
case Dialog.MODAL:
_efc=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_efc=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_efb.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_efc=this._dockBindings.get(_efb.position);
break;
case DockBinding.EXTERNAL:
window.open(_efb.url);
_efd=true;
break;
default:
var _efe=this._decksBinding.getSelectedDeckBinding();
_efc=_efe.getDockBindingByReference(_efb.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _eff=this.bindingWindow.bindingMap.maindecks;
_eff.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_efd=true;
}
break;
}
if(!_efd){
if(_efc!=null){
this._view(_efc,null,_efb,true);
}else{
throw "StageBinding: Could not position view: "+_efb.handle;
}
}
};
StageBinding.prototype._view=function(_f00,_f01,_f02,_f03){
var _f04=_f02.handle;
if(_f02.isMutable){
_f04+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f04]){
var _f05=ViewBinding.getInstance(_f04);
if(_f05!=null){
_f05.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f04);
}
}else{
this._activeViewDefinitions[_f04]=_f02;
Application.lock(this);
switch(_f00.constructor){
case DockBinding:
if(_f03){
_f00.prepareNewView(_f02);
}else{
_f00.prepareOpenView(_f02,_f01);
}
break;
case StageDialogBinding:
if(_f03){
_f00.prepareNewView(_f02);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f06){
if(this._activeViewDefinitions[_f06]!=null){
delete this._activeViewDefinitions[_f06];
}else{
this.logger.debug("Could not unregister active view: "+_f06);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f07){
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
this.addFilter(function(_f09){
var _f0a=UserInterface.getBinding(_f09);
var _f0b=null;
if(_f0a){
switch(_f0a.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f0a.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f0a.handleUnMaximization();
break;
}
break;
case DockBinding:
_f0b=NodeCrawler.SKIP_NODE;
break;
}
}
return _f0b;
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
var _f0c=null;
this._dialogs.each(function(_f0d){
if(!_f0d.isVisible){
_f0c=_f0d;
}
return _f0c!=null;
});
if(!_f0c){
this._newInstance();
_f0c=this._dialogs.getLast();
}
_f0c.setModal(false);
return _f0c;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f0e=this.getInstance();
_f0e.setModal(true);
return _f0e;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f0f=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f0f);
_f0f.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f10){
if(_f10 instanceof DialogViewDefinition){
var _f11=ViewBinding.newInstance(this.bindingDocument);
_f11.setDefinition(_f10);
_f11.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f10.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f10.handler)){
this._dialogResponseHandler=_f10.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f11;
this._body.add(_f11);
_f11.attach();
_f11.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f12){
StageDialogBinding.superclass.handleAction.call(this,_f12);
var _f13=_f12.target;
switch(_f12.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f13);
_f12.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f13.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f12.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f13.response){
this._handleDialogPageResponse(_f13);
}
_f12.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f12.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f12.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f12.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f12.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f12.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f12.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f12.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f12.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f13==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f14,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f14,arg);
switch(_f14){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f16){
var _f17=new FitnessCrawler();
var list=new List();
if(_f16){
_f17.mode=FitnessCrawler.MODE_BRUTAL;
}
_f17.crawl(this.bindingElement,list);
_f17.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f19){
_f19.fit(_f16);
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
var _f1a=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f1a){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f1c){
var cmd=_f1c.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f1e){
if(_f1e.bindingDocument==this._viewBinding.getContentDocument()){
if(_f1e instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f1e);
}
this._pageBinding=_f1e;
if(_f1e.height=="auto"){
_f1e.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f1e);
_f1e.enableAutoHeightLayoutMode(false);
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
if(_f1e.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f1e);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f1f){
var _f20=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f20){
var _f21=UserInterface.getBinding(_f20);
_f21.setDisabled(_f1f);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f22){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f22.response,_f22.result!=null?_f22.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f24){
if(_f24.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f24);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f26){
switch(_f26.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f26.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f26.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f27){
var _f28=_f27.label;
var _f29=_f27.image;
var _f2a=_f27.width;
var _f2b=_f27.height;
var _f2c=_f27.controls;
var _f2d=_f27.isResizable;
if(_f28){
this.setLabel(_f28);
}
if(_f29){
this.setImage(_f29);
}
if(_f2a||_f2b){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f2a?_f2a:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f2b!=null&&_f2b!="auto")?_f2b:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f2c){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f31=new List(_f2c.split(" "));
while((type=_f31.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f2d!=this._isResizable){
this.setResizable(_f2d);
}
if(_f2b=="auto"){
this._fixAutoHeight(_f27);
}
if(_f27==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f32){
var dim=this.getDimension();
var _f34=0;
var _f35=0;
if(_f32.isDialogSubPage){
_f32=this._pageBinding;
}
if(this._isFirstPage){
_f34=_f32.width!=null?_f32.width:dim.w;
}else{
_f34=dim.w;
}
_f35=_f32.bindingElement.offsetHeight;
_f35+=this._titlebar.bindingElement.offsetHeight;
_f35+=4;
_f35+=4;
if(_f35<dim.h){
_f35=dim.h;
}
if(_f32.minheight!=null){
if(_f35<_f32.minheight){
_f35=_f32.minheight;
}
}
this.setDimension(new Dimension(_f34,_f35));
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
StageDialogBinding.newInstance=function(_f38){
var _f39=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f38);
var _f3a=UserInterface.registerBinding(_f39,StageDialogBinding);
_f3a.setProperty("controls","minimize maximize close");
return _f3a;
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
this.addFilter(function(_f3b,list){
var _f3d=null;
var _f3e=UserInterface.getBinding(_f3b);
if(!_f3e.isVisible){
_f3d=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f3d;
});
this.addFilter(function(_f3f,list){
var _f41=null;
var _f42=UserInterface.getBinding(_f3f);
if(_f42.isAttached){
if(Interfaces.isImplemented(IFit,_f42)){
if(!_f42.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f42);
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
StageDecksBinding.prototype.mountDefinition=function(_f43){
var _f44=StageDeckBinding.newInstance(this.bindingDocument);
_f44.handle=_f43.handle;
_f44.perspectiveNode=_f43.node;
_f44.definition=_f43;
this._decks[_f44.handle]=_f44;
this.add(_f44);
_f44.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f45){
var _f46=this._decks[_f45];
StageBinding.perspectiveNode=_f46.perspectiveNode;
this.select(_f46);
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
StageDeckBinding.prototype.handleAction=function(_f47){
StageDeckBinding.superclass.handleAction.call(this,_f47);
var _f48=_f47.target;
switch(_f47.type){
case WindowBinding.ACTION_LOADED:
if(_f48==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f49=this.windowBinding.getContentDocument();
var _f4a=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f4b=ViewBinding.newInstance(_f49);
_f4b.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f4c=ViewDefinitions["Composite.Management.Browser"];
_f4c.argument["SystemViewDefinition"]=this.definition;
_f4b.setDefinition(_f4c);
_f4a.add(_f4b);
_f4b.attach();
_f4b.initialize();
this._viewBinding=_f4b;
_f47.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f48 instanceof DockBinding){
this._dockBindings.set(_f48.reference,_f48);
_f48.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f47.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f47.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f47);
StageDeckBinding.superclass.handleAction.call(this,_f47);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f4e=new StageCrawler();
_f4e.mode=mode;
_f4e.crawl(this.windowBinding.getContentDocument().body);
_f4e.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f4f){
return this._dockBindings.get(_f4f);
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
StageDeckBinding.newInstance=function(_f51){
var _f52=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f51);
var _f53=UserInterface.registerBinding(_f52,StageDeckBinding);
return _f53;
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
StageSplitBoxBinding.prototype.handleAction=function(_f54){
StageSplitBoxBinding.superclass.handleAction.call(this,_f54);
StageBoxAbstraction.handleAction.call(this,_f54);
var _f55=_f54.target;
var _f56=null;
var _f57=null;
switch(_f54.type){
case DockBinding.ACTION_EMPTIED:
_f57=this.getChildBindingByLocalName("splitter");
if(_f57.isVisible){
_f57.hide();
}
_f56=this.getDescendantBindingsByLocalName("dock");
if(_f56.getFirst().isEmpty&&_f56.getLast().isEmpty){
if(_f56.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f54.consume();
break;
case DockBinding.ACTION_OPENED:
_f56=this.getDescendantBindingsByLocalName("dock");
if(!_f56.getFirst().isEmpty&&!_f56.getLast().isEmpty){
_f57=this.getChildBindingByLocalName("splitter");
if(!_f57.isVisible){
_f57.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f54.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f55!=this){
_f57=this.getChildBindingByLocalName("splitter");
if(_f57.isVisible){
_f57.hide();
}
this.invokeLayout();
_f54.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f55!=this){
var _f58=this.getChildBindingsByLocalName("splitpanel");
if(_f58.getFirst().isVisible&&_f58.getLast().isVisible){
_f57=this.getChildBindingByLocalName("splitter");
if(!_f57.isVisible){
_f57.show();
}
}
this.invokeLayout();
_f54.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f59){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f59);
switch(_f59.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f59.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f5a=this.getChildBindingsByLocalName("splitpanel");
return _f5a.getFirst().isVisible&&_f5a.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f5b=this.getChildBindingsByLocalName("splitpanel");
return _f5b.getFirst().isFixed&&_f5b.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f5c){
StageSplitPanelBinding.superclass.handleAction.call(this,_f5c);
StageBoxAbstraction.handleAction.call(this,_f5c);
switch(_f5c.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f5c.type==StageSplitBoxBinding.ACTION_HIDE){
_f5c.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f5c.type==DockBinding.ACTION_EMPTIED){
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
if(_f5c.type==StageSplitBoxBinding.ACTION_SHOW){
_f5c.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f5f=_f5c.target;
if(_f5f!=this&&_f5f.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f60=_f5f._containingSplitBoxBinding;
if(_f60.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f61=_f60.getChildBindingsByLocalName("splitpanel");
var _f62=_f61.getFirst();
var _f63=_f61.getLast();
if(this.isFixed==true){
if(!_f62.isFixed||!_f63.isFixed||(!_f60.hasBothPanelsVisible()&&_f5f.isMinimizedForReal)){
this.setFix(false);
_f5c.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f60.hasBothPanelsFixed()||(!_f60.hasBothPanelsVisible()&&_f5f.isMinimizedForReal)){
this.setFix(_f5f.getContainedDock().getHeight());
_f5c.consume();
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
var _f64=this.getContainedDock();
if(_f64){
if(this.isMaximizePrepared==true){
}else{
_f64.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f65=this.getContainedDock();
if(_f65){
if(_f65.type==DockBinding.TYPE_EDITORS){
if(_f65.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f65.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f66=this.getContainedDock();
if(_f66){
_f66.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f66);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f67=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f68=this.getContainedDock();
if(_f68){
_f68.collapse(_f67);
if(!_f67){
this.setFix(_f68.getHeight());
}else{
this.setFix(_f68.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f68&&_f68.isActive){
_f68.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f68);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f69){
var _f6a=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f6b=this.getContainedDock();
if(_f6b){
if(this.isMinimized==true){
_f6b.unCollapse(_f6a);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f69){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f6b){
_f6b.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f6b);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f6c){
var _f6d=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f6d=false;
}
}
if(_f6d==true){
this._invisibilize(_f6c);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f6f){
if(_f6f!=this._isInvisibilized){
if(_f6f){
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
StageSplitterBinding.prototype.onDragStart=function(_f70){
var _f71=top.app.bindingMap.stagesplittercover;
var _f72=this._containingSplitBoxBinding.getOrient();
switch(_f72){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f71.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f71.bindingElement.style.cursor="n-resize";
break;
}
_f71.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f72);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f78){
this._orient=_f78;
this.attachClassName(_f78);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f7a=true;
var _f7b=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f7b=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f7a=false;
break;
}
if(_f7a){
this.bindingElement.style.left=pos.x+"px";
}
if(_f7b){
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
StageBoxAbstraction.handleAction=function(_f7d){
switch(_f7d.type){
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
if(_f7d.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f7d.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f7e=this.bindingElement.style;
_f7e.position="absolute";
_f7e.width="100%";
_f7e.height="100%";
_f7e.top="0";
_f7e.left="0";
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
var _f7f=this.bindingElement.style;
_f7f.position="relative";
_f7f.width="auto";
_f7f.height="auto";
_f7f.top="auto";
_f7f.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f80,_f81){
var _f82=_f80.bindingElement.style;
var _f83=_f80.bindingElement.parentNode;
var box=_f80._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f81){
_f80._unmodifiedFlexMethod=_f80.flex;
_f80.flex=function(){
_f82.width=_f83.offsetWidth+"px";
_f82.height=_f83.offsetHeight+"px";
};
}else{
_f82.width="100%";
_f82.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f82.width="auto";
_f82.height="auto";
box.reflex(true);
},0);
}
_f80.flex=_f80._unmodifiedFlexMethod;
_f80._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f85){
var _f86=_f85.target;
switch(_f85.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f86 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f85);
_f85.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f85.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f87){
var mode=null;
switch(_f87.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f89){
StageMenuBarBinding.superclass.handleAction.call(this,_f89);
switch(_f89.type){
case MenuItemBinding.ACTION_COMMAND:
var _f8a=_f89.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f8a){
SystemAction.invoke(_f8a,this._rootNode);
}
}
_f89.consume();
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
var _f8b=this.getProperty("handle");
if(_f8b){
this._handle=_f8b;
if(StageBinding.isViewOpen(_f8b)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f8b);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f8d){
this.setProperty("handle",_f8d);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f8e,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f8e,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f8e){
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
StageViewMenuItemBinding.newInstance=function(_f90){
var _f91=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f90);
UserInterface.registerBinding(_f91,StageViewMenuItemBinding);
return UserInterface.getBinding(_f91);
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
StageStatusBarBinding.prototype.setLabel=function(_f92){
this._label.setLabel(_f92);
};
StageStatusBarBinding.prototype.setImage=function(_f93){
this._label.setImage(_f93);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f94){
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
var _f95=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _f96=_f95._viewBinding;
var _f97=_f96.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _f98=_f97.getFocusedTreeNodeBindings();
if(!_f98.hasEntries()&&StageBinding.treeSelector){
_f98=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f98;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f99=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f99.each(function(_f9a){
LocalStore.focuseNodes.add(_f9a.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f9b=LocalStore.focuseNodes.getEntityTokens();
var _f9c=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f9d=_f9c.getAssociatedView();
var _f9e=_f9d.getContentWindow().bindingMap.tree;
_f9b=new List(TreeService.GetCurrentLocaleEntityTokens(_f9b.toArray()));
_f9b.each(function(_f9f){
_f9e._focusTreeNodeByEntityToken(_f9f);
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
ExplorerBinding.prototype.handleAction=function(_fa0){
ExplorerBinding.superclass.handleAction.call(this,_fa0);
var _fa1=_fa0.target;
switch(_fa0.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_fa0.consume();
break;
case Binding.ACTION_DRAG:
if(_fa1 instanceof ExplorerSplitterBinding){
_fa1.dragger.registerHandler(this);
}
_fa0.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_fa3){
this._menuBinding.setSelectionByHandle(_fa3);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fa4){
if(_fa4 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fa4);
this._menuBinding.mountDefinition(_fa4);
}
};
ExplorerBinding.prototype.onDragStart=function(_fa5){
var _fa6=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fa6.hasEntries()){
var _fa7=_fa6.getFirst();
this._dragStart=_fa7.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fa7.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fab){
if(_fab instanceof SystemViewDefinition){
var _fac=ViewBinding.newInstance(this.bindingDocument);
_fac.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fac.setDefinition(_fab);
var _fad=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fad.setAssociatedView(_fac);
this._decks[_fab.handle]=_fad;
_fad.add(_fac);
this.add(_fad);
function attach(){
_fad.attach();
_fac.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fae){
var _faf=this._decks[_fae];
this.select(_faf);
};
DecksBinding.prototype.expandBy=function(_fb0){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fb2=this.bindingElement.offsetHeight+_fb0;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fb2+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fb4){
var _fb5=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fb4);
return UserInterface.registerBinding(_fb5,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fb6){
this._viewBinding=_fb6;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fb7=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fb8=this._viewBinding.getDefinition().label;
StatusBar.busy(_fb7,[_fb8]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fb9){
ExplorerDeckBinding.superclass.handleAction.call(this,_fb9);
var _fba=_fb9.target;
switch(_fb9.type){
case PageBinding.ACTION_INITIALIZED:
if(_fba instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fba.node.getEntityToken();
this._handle=_fba.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fbb,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fbb,arg);
switch(_fbb){
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
var _fbd=null;
if(this._isExplorerDeckBindingInitialized){
_fbd=this._viewBinding.getDefinition().label;
}else{
_fbd=DockTabBinding.LABEL_TABLOADING;
}
return _fbd;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fbe=null;
if(this._isExplorerDeckBindingInitialized){
_fbe=this._viewBinding.getDefinition().image;
}else{
_fbe=DockTabBinding.IMG_TABLOADING;
}
return _fbe;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fbf=null;
if(this._isExplorerDeckBindingInitialized){
_fbf=this._viewBinding.getDefinition().toolTip;
}
return _fbf;
};
ExplorerDeckBinding.newInstance=function(_fc0){
var _fc1=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fc0);
return UserInterface.registerBinding(_fc1,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fc2){
switch(_fc2.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fc2.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fc2);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fc3){
this._minButtons.set(_fc3.handle,this._mountMinButton(_fc3));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fc4){
var _fc5=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fc5.setLabel(_fc4.label);
_fc5.setToolTip(_fc4.label);
_fc5.handle=_fc4.handle;
_fc5.node=_fc4.node;
this._minGroup.add(_fc5);
this._minList.add(_fc5);
_fc5.attach();
return _fc5;
};
ExplorerMenuBinding.prototype.handleAction=function(_fc6){
ExplorerMenuBinding.superclass.handleAction.call(this,_fc6);
switch(_fc6.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fc7=_fc6.target;
var _fc8=_fc7.getCheckedButtonBinding();
var _fc9=_fc8.handle;
this._selectedHandle=_fc9;
this._selectedTag=_fc8.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fc6.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fca,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fca,arg);
switch(_fca){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fcc){
var _fcd=this._minButtons.get(_fcc);
if(_fcd){
_fcd.check();
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
ExplorerToolBarBinding.newInstance=function(_fce){
var _fcf=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fce);
return UserInterface.registerBinding(_fcf,ExplorerToolBarBinding);
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
var _fd0=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fd1=_fd0?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fd1);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fd2,_fd3){
var _fd4="ui:explorertoolbarbutton";
var _fd5=DOMUtil.createElementNS(Constants.NS_UI,_fd4,_fd2);
var _fd6=UserInterface.registerBinding(_fd5,ExplorerToolBarButtonBinding);
_fd6.explorerToolBarButtonType=_fd3;
return _fd6;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd7,_fd8,type){
type=type?type:"";
var _fda=FunctionService.GetCustomEditorSettingsByMarkup(_fd7);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fda){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fda.Width?(_fda.Width>dim.w?dim.w:_fda.Width):undefined;
def.height=_fda.Height?(_fda.Height>dim.h?dim.h:_fda.Height):undefined;
if(_fda.Url){
_fda.Url=_fda.Url.indexOf("?")>-1?_fda.Url+"&consoleId="+Application.CONSOLE_ID:_fda.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd8;
def.argument={url:_fda?_fda.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd7}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fdd,_fde){
var _fdf=EditorBinding._components;
var _fe0=EditorBinding._editors;
var key=_fde.key;
var _fe2=Interfaces.isImplemented(IWysiwygEditorComponent,_fdd);
if(!_fe2){
_fe2=Interfaces.isImplemented(ISourceEditorComponent,_fdd);
}
if(_fe2){
if(_fe0.has(key)){
_fe0.get(key).initializeEditorComponent(_fdd);
}else{
if(!_fdf.has(key)){
_fdf.set(key,new List());
}
_fdf.get(key).add(_fdd);
}
}else{
throw "Editor component interface not implemented: "+_fdd;
}
};
EditorBinding.claimComponents=function(_fe3,_fe4){
var _fe5=EditorBinding._components;
var _fe6=EditorBinding._editors;
var key=_fe4.key;
_fe6.set(key,_fe3);
var list=null;
if(_fe5.has(key)){
list=_fe5.get(key).copy();
_fe5.del(key);
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
var _fea=this.getProperty("value");
if(_fea!=null){
_fea=decodeURIComponent(_fea);
this._startContent=_fea;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fec=this.bindingWindow.DataManager;
_fec.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fee){
var _fef=EditorBinding.claimComponents(this,_fee);
if(_fef!=null){
while(_fef.hasNext()){
this.initializeEditorComponent(_fef.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _ff1=this.bindingWindow.DataManager;
if(_ff1.getDataBinding(name)){
_ff1.unRegisterDataBinding(name);
}
_ff1.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ff2=this.getEditorDocument();
if(_ff2!=null){
Application.framework(_ff2);
DOMEvents.addEventListener(_ff2,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ff2,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ff2,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_ff2,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_ff4){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_ff4==true){
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
var _ff6=this.getCheckSum();
if(_ff6!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ff6;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff7=null;
if(Binding.exists(this._pageBinding)){
_ff7=this._pageBinding.getCheckSum(this._checksum);
}
return _ff7;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff9=DOMEvents.getTarget(e);
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
if(_ff9.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ffb,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ffb,arg);
var _ffd=null;
switch(_ffb){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ffe=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ffe=false;
}
}
}else{
_ffd=DOMEvents.getTarget(arg);
if(_ffd&&_ffd.ownerDocument==this.getEditorDocument()){
_ffe=false;
}
}
if(_ffe){
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
EditorBinding.prototype._activateEditor=function(_fff){
if(_fff!=this._isActivated){
this._isActivated=_fff;
EditorBinding.isActive=_fff;
var _1000=this.getEditorWindow().standardEventHandler;
var _1001=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1001!=null){
if(_fff){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1001.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_1000.enableNativeKeys(true);
}else{
_1001.disable();
_1000.disableNativeKeys();
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
var _1003=false;
try{
var _1004=this.getEditorWindow().getSelection();
if(_1004!=null){
_1003=_1004.toString().length>0;
if(!_1003){
var range=_1004.getRangeAt(0);
var frag=range.cloneContents();
var _1007=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1007.appendChild(frag.firstChild);
}
var img=_1007.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1003=true;
}
}
}
}
}
catch(exception){
}
return _1003;
};
EditorBinding.prototype.isCommandEnabled=function(_1009){
var _100a=true;
switch(_1009){
case "Cut":
case "Copy":
case "Paste":
_100a=this.getEditorDocument().queryCommandEnabled(_1009);
break;
}
return _100a;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _100e=false;
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
_100e=true;
}
break;
}
return _100e;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1011=this.getContentWindow().bindingMap.toolbar;
var _1012=_1011.getButtonForCommand(cmd);
if(!_1012){
throw "No button for command "+cmd;
}
return _1012;
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
EditorBinding.prototype.handleAction=function(_1016){
EditorBinding.superclass.handleAction.call(this,_1016);
var _1017=_1016.target;
var self=this;
var _1019=this.shadowTree.iframe;
switch(_1016.type){
case Binding.ACTION_DIRTY:
if(_1016.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_101a){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_101a);
};
EditorBinding.prototype.handleElement=function(_101b){
return true;
};
EditorBinding.prototype.updateElement=function(_101c){
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
var _101f=this._menuGroups[rel];
if(_101f instanceof List){
_101f.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1022=this._menuGroups[rel];
if(_1022 instanceof List){
_1022.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1024){
EditorPopupBinding.superclass.handleAction.call(this,_1024);
var _1025=_1024.target;
if(_1024.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1025.getProperty("cmd");
var gui=_1025.getProperty("gui");
var val=_1025.getProperty("val");
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
var _1029=this.bindingWindow.bindingMap.tinywindow;
var _102a=this.bindingWindow.bindingMap.codepresswindow;
if(_1029){
EditorBinding.registerComponent(this,_1029);
}else{
if(_102a){
EditorBinding.registerComponent(this,_102a);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_102b,_102c,_102d,theme){
this._editorBinding=_102b;
this._tinyEngine=_102c;
this._tinyInstance=_102d;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_102f,frame,_1031){
this._editorBinding=_102f;
this._codePressFrame=frame;
this._codePressEngine=_1031;
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
var _1034=this._editorBinding;
if(_1034!=null){
var self=this;
var _1036={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1034.hasBookmark()){
_1034.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1034.hasBookmark()){
_1034.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1036);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1036);
}
};
EditorClickButtonBinding.newInstance=function(_1038){
var _1039=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1038);
return UserInterface.registerBinding(_1039,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_103a){
var _103b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_103a);
return UserInterface.registerBinding(_103b,EditorToolBarButtonBinding);
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
var _103c=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_103c);
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
EditorSelectorBinding.prototype.initializeComponent=function(_103d,_103e,_103f,theme){
this._editorBinding=_103d;
this._tinyEngine=_103e;
this._tinyInstance=_103f;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1041){
EditorSelectorBinding.superclass.handleAction.call(this,_1041);
switch(_1041.type){
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
EditorMenuItemBinding.newInstance=function(_1045){
var _1046=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1045);
return UserInterface.registerBinding(_1046,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1047){
var i=0,_1049,_104a=[],split=_1047.split(" ");
while((_1049=split[i++])!=null){
if(_1049.length>=3&&_1049.substring(0,3)=="mce"){
continue;
}else{
if(_1049.length>=14&&_1049.substring(0,14)=="compositemedia"){
continue;
}
}
_104a.push(_1049);
}
return _104a.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_104c){
var _104d=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_104c);
if(soap instanceof SOAPFault){
}else{
_104d=soap.XhtmlFragment;
if(!_104d){
_104d="";
}
}
WebServiceProxy.isFaultHandler=true;
return _104d;
};
VisualEditorBinding.getTinyContent=function(_104f,_1050){
var _1051=null;
if(_104f==null||!_104f.replace(/\s*/gm,"").length){
_104f=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1050.getSoapTinyContent(_104f);
if(soap instanceof SOAPFault){
var _1053=soap;
var _1054={handleDialogResponse:function(){
_1050.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1054,_1053);
}else{
_1051=soap.XhtmlFragment;
if(_1051==null){
_1051=new String("");
}
_1051=_1051.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1051;
};
VisualEditorBinding.isImage=function(_1055){
return _1055&&_1055.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1056){
return VisualEditorBinding.isImage(_1056)&&!VisualEditorBinding.isReservedElement(_1056);
};
VisualEditorBinding.isReservedElement=function(_1057){
if(VisualEditorBinding.isFunctionElement(_1057)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1057)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1057)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1058){
return VisualEditorBinding.isImage(_1058)&&CSSUtil.hasClassName(_1058,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1059){
return VisualEditorBinding.isImage(_1059)&&CSSUtil.hasClassName(_1059,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_105a){
return VisualEditorBinding.isImage(_105a)&&CSSUtil.hasClassName(_105a,VisualEditorBinding.HTML_CLASSNAME);
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
var _105b=this.getProperty("embedablefieldstypenames");
if(_105b!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_105b);
}
var _105c=this.getProperty("formattingconfiguration");
if(_105c!=null){
this._url+="?config="+_105c;
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
VisualEditorBinding.prototype.handleBroadcast=function(_105d,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_105d,arg);
var _105f=this.getContentWindow().bindingMap.tinywindow;
var _1060=_105f.getContentWindow();
switch(_105d){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1060){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_105f);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1061){
_1061.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1062=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1062.replace(/\s*/gm,"").length==0){
_1062=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1062,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1063){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1063);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1065=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1065=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1065=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1065;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1068){
var _1069=_1068;
if(!this._isNormalizedDocument(_1068)){
_1069=this._getHtmlMarkup().replace("${body}",_1068);
}
return _1069;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_106a){
var _106b=false;
var doc=XMLParser.parse(_106a,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_106b=true;
}
}
if(Client.isWebKit){
if(_106a.indexOf("<html")!==0){
_106b=false;
}
}
return _106b;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1070=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1070){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1070=true;
}
return _1070;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1072=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1072);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1074){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1074,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1076){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1076,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1079=CSSComputer.getPadding(body);
var _107a=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_107a.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_107d){
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
VisualEditorPopupBinding.prototype.configure=function(_107e,_107f,_1080){
var _1081=this.editorBinding.hasSelection();
this.tinyInstance=_107e;
this.tinyEngine=_107f;
this.tinyElement=_1080;
this.hasSelection=_1081;
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
var _1085=false;
if(this.hasSelection){
_1085=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1085=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1085=true;
}
}
}
}
if(_1085){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1086=this.getMenuItemForCommand("compositeInsertLink");
var _1087=this.getMenuItemForCommand("unlink");
var _1088=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1089=this.editorBinding.getButtonForCommand("unlink");
_1087.setDisabled(_1089.isDisabled);
if(_1087.isDisabled){
_1086.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1086.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _108a=this.editorBinding.embedableFieldConfiguration;
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
if(_108a){
var _108d=_108a.getGroupNames();
if(_108d.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_108d.each(function(_1091){
var _1092=_108a.getFieldNames(_1091);
_1092.each(function(_1093){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1093);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1091+":"+_1093);
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
var _1095=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1096=null;
var _1097=null;
if(_1095){
if(_1095.nodeName=="TD"){
_1096=_1095.getAttribute("colspan");
_1097=_1095.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1096=="1"&&_1097=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1095){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1098){
var _1099=VisualEditorFormattingConfiguration._configurations;
if(!_1099.has(_1098)){
_1099.set(_1098,new VisualEditorFormattingConfiguration());
}
return _1099.get(_1098);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_109b){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_109c){
var _109d=null;
var _109e=VisualEditorFieldGroupConfiguration._configurations;
if(!_109e.has(_109c)){
_109e.set(_109c,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_109c)));
}
return _109e.get(_109c);
};
function VisualEditorFieldGroupConfiguration(_109f){
var _10a0=new Map();
new List(_109f).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_10a0.set(group.GroupName,map);
});
this._groups=_10a0;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10a4){
return this._groups.get(_10a4).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10a5,_10a6){
return this._groups.get(_10a5).get(_10a6).xhtml;
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
var _10a8=this.getDescendantElementsByLocalName("textarea");
while(_10a8.hasNext()){
var _10a9=_10a8.getNext();
if(_10a9.getAttribute("selected")=="true"){
this._startContent=_10a9.value;
this._textareaname=_10a9.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10ab=this.getContentWindow().bindingMap.templatetree;
_10ab.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10ac){
var _10ad=_10ab.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10ad.textareaname);
_10ac.consume();
}});
_10ab.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10ae){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10af=this.getContentWindow().bindingMap.toolsplitter;
_10af.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10b0=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10b0.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10b0);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10b1){
this._textareas=new Map();
while(_10b1.hasNext()){
var _10b2=_10b1.getNext();
var _10b3=_10b2.getAttribute("placeholderid");
this._textareas.set(_10b3,{placeholderid:_10b3,placeholdername:_10b2.getAttribute("placeholdername"),placeholdermarkup:_10b2.value,textareaelement:_10b2,isSelected:_10b2.getAttribute("selected")=="true"});
}
var _10b4=new Map();
this._textareas.each(function(name,_10b6){
var _10b7=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b7.setLabel(_10b6.placeholdername);
_10b7.setImage("${icon:placeholder}");
_10b7.setProperty("placeholder",true);
_10b7.textareaname=name;
_10b4.set(_10b6.placeholdername,_10b7);
if(_10b6.isSelected){
selected=_10b7;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b8=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b8.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b9=this.getContentWindow().bindingMap.templatetree;
var _10ba=_10b9.add(TreeNodeBinding.newInstance(_10b9.bindingDocument));
_10ba.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10ba.setImage("${icon:warning}");
_10ba.attach();
var _10bb=this.getContentWindow().bindingMap.statusbar;
_10bb.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10bd=this._textareas.get(name);
var _10be=_10bd.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10be));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10bf){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10bf;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10c0=this.getContentWindow().bindingMap.statusbar;
_10c0.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10bf);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10c3=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10c3;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10c4=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10c4=this._xhtmls.get(this._textareaname);
if(_10c4==null){
_10c4=VisualEditorBinding.XHTML;
}
}
return _10c4;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10c6){
_10c6.textareaelement.value=_10c6.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c7,_10c8,_10c9){
var _10ca=_10c7.getElementsByTagName("div").item(0);
var _10cb=_10c8.getElementsByTagName("div").item(0);
var _10cc=new List(_10ca.getElementsByTagName("textarea"));
var _10cd=new List(_10cb.getElementsByTagName("textarea"));
if(_10cc.getLength()!=_10cd.getLength()){
_10c9=true;
}else{
var index=0;
_10cc.each(function(_10cf,index){
var _10d1=_10cd.get(index);
var newid=_10cf.getAttribute("placeholderid");
var oldid=_10d1.getAttribute("placeholderid");
var _10d4=_10cf.getAttribute("placeholdername");
var _10d5=_10d1.getAttribute("placeholdername");
if(newid!=oldid||_10d4!=_10d5){
_10c9=true;
}
return !_10c9;
});
}
if(_10c9){
var html=null;
if(_10ca.innerHTML!=null){
html=_10ca.innerHTML;
}else{
html=DOMSerializer.serialize(_10ca);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d8){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d8);
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
var _10db=this.getDescendantBindingByLocalName("selector");
_10db.attach();
this._populateTemplateSelector();
var _10dc=this.getContentWindow().bindingMap.templateselector;
_10dc.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10dd=this.getDescendantBindingByLocalName("selector");
var _10de=this.getContentWindow().bindingMap.templateselector;
_10dd.selections.each(function(_10df){
_10df.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10de.populateFromList(_10dd.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10e0=this.getDescendantBindingByLocalName("selector");
var _10e1=this.getContentWindow().bindingMap.templateselector;
_10e0.selectByValue(_10e1.getValue());
_10e0.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10e2){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e7,_10e8){
var _10e9=_10e8;
if(old.has(_10e7)){
_10e9=old.get(_10e7).placeholdermarkup;
}
return _10e9;
}
while(_10e2.hasNext()){
var _10ea=_10e2.getNext();
var _10eb=_10ea.getAttribute("placeholderid");
this._textareas.set(_10eb,{placeholderid:_10eb,placeholdername:_10ea.getAttribute("placeholdername"),placeholdermarkup:compute(_10eb,_10ea.value),textareaelement:_10ea,isSelected:_10ea.getAttribute("selected")=="true"});
}
var _10ec=null;
var _10ed=this.getContentWindow().bindingMap.templatetree;
var _10ee=new Map();
this._textareas.each(function(name,_10f0){
var _10f1=_10ed.add(TreeNodeBinding.newInstance(_10ed.bindingDocument));
_10f1.setLabel(_10f0.placeholdername);
_10f1.setImage("${icon:placeholder}");
_10f1.setProperty("placeholder",true);
_10f1.textareaname=name;
_10ee.set(_10f0.placeholdername,_10f1);
if(_10f0.isSelected){
_10ec=_10f1;
}
});
_10ed.attachRecursive();
if(_10ec!=null){
var _10f2=true;
if(this._oldtextareas.hasEntries()){
_10f2=false;
var map=new Map();
this._textareas.each(function(id,_10f5){
map.set(_10f5.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10f2=true;
}
}
if(_10f2){
var _10f6=this._textareas.get(_10ec.textareaname);
this._textareaname=_10ec.textareaname;
this._placeholdername=_10f6.placeholdername;
this._setContentFromPlaceHolder(_10ec.textareaname);
_10ec.focus();
}else{
var _10f7=_10ee.get(this._placeholdername);
this._textareaname=_10f7.textareaname;
_10f7.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10fa){
var _10fb=null;
if(Client.isWebKit||Client.isExplorer){
_10fb=node.getElementsByTagName(_10fa);
}else{
_10fb=node.getElementsByTagName("ui:"+_10fa);
}
return _10fb;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10fc,_10fd){
var _10fe=this._getElementsByTagName(_10fc,"selector").item(0);
var _10ff=this._getElementsByTagName(_10fd,"selector").item(0);
var _1100=false;
var _1101=false;
if(_10fe!=null&&_10ff!=null){
var _1102=new List(this._getElementsByTagName(_10fe,"selection"));
var _1103=new List(this._getElementsByTagName(_10ff,"selection"));
if(_1102.getLength()!=_1103.getLength()){
_1100=true;
_1101=true;
}else{
_1102.each(function(_1104,index){
var _1106=_1104.getAttribute("value");
var _1107=_1103.get(index).getAttribute("value");
if(_1106!=_1107){
_1100=true;
}
return !_1100;
});
_1102.each(function(_1108,index){
var _110a=_1108.getAttribute("selected");
var _110b=_1103.get(index).getAttribute("selected");
if(_110a!=_110b){
_1101=true;
}
return !_1101;
});
}
}
if(_1100){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10fe);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1101){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10fc,_10fd,_1101);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_110d){
var _110e=null;
if(_110d==undefined){
_110d=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1110){
if(_1110.PlaceholderId==_110d){
_110e=_1110.ClientRectangle.Width;
return false;
}
});
}
return _110e;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1112=this._pageId;
var _1113=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1112,_1113,function(_1115){
self._templatePreview=_1115;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1116){
var _1117=this._pageId;
var _1118=this._textareaname;
var _1119=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1116,_1117,_1119,_1118,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_111b){
var _111c=this._pageId;
var _111d=this._textareaname;
var _111e=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_111b,_111c,_111e,_111d,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1120,frame,_1122){
this._editorBinding=_1120;
this._codePressFrame=frame;
this._codePressEngine=_1122;
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
var _1128=this.getProperty("validate");
if(_1128==true){
this._hasStrictValidation=true;
}
var _1129=this.getProperty("strictsave");
if(_1129===false){
this._strictSave=false;
}
var _112a=this.getProperty("validator");
if(_112a!=null){
this._validator=_112a;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_112b,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_112b,arg);
switch(_112b){
case BroadcastMessages.CODEMIRROR_LOADED:
var _112d=this.getContentWindow().bindingMap.codemirrorwindow;
if(_112d!=null){
var _112e=_112d.getContentWindow();
if(arg.broadcastWindow==_112e){
this._codemirrorWindow=_112e;
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
this.initializeEditorComponents(_112d);
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
this.unsubscribe(_112b);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1132){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1132);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1133){
if(_1133!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1133;
EditorBinding.isActive=_1133;
var _1134=this._codemirrorWindow.standardEventHandler;
if(_1133){
_1134.enableNativeKeys(true);
}else{
_1134.disableNativeKeys();
}
var _1135=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1135!=null){
if(_1133){
_1135.enable();
}else{
_1135.disable();
}
}
if(_1133){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1139=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1139;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_113a){
_113a.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_113c){
if(!this._isFinalized){
if(_113c!=this._startContent){
this._startContent=_113c;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_113c);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _113d=this.getContentWindow().bindingMap.editorpage.getContent();
return _113d?_113d:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_113e){
if(this._pageBinding!=null){
this._pageBinding.cover(_113e);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_113f){
if(_113f!=null&&this.shadowTree.dotnetinput!=null){
var value=_113f.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1141=true;
var _1142=this.getContent();
if(this._validator!=null){
_1141=Validator.validateInformed(_1142,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1143=_1142.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1143!=_1142){
_1142=_1143;
this.setContent(_1143);
}
_1141=XMLParser.isWellFormedDocument(_1142,true,!this._strictSave);
if(_1141==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1141=this._isValidHTML(_1142);
break;
}
}
break;
}
}
return _1141;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1145=true;
var doc=XMLParser.parse(xml);
var _1147=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1147.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1147.add("NamespaceURI");
}
var head=null,body=null;
var _114b=new List(root.childNodes);
while(_114b.hasNext()){
var child=_114b.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1147.add("MultipleHead");
}
if(body!=null){
_1147.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1147.add("MultipleBody");
}
body=child;
break;
default:
_1147.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1147.add("MissingHead");
}
if(body==null){
_1147.add("MissingBody");
}
}
if(_1147.hasEntries()){
_1145=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1147.getFirst()));
}
return _1145;
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
var _114d=null;
var page=this._pageBinding;
if(page!=null){
_114d=page.getCheckSum();
}
return _114d;
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
ThrobberBinding.prototype.handleBroadcast=function(_114f,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_114f,arg);
switch(_114f){
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
ProgressBarBinding.notch=function(_1152){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1152);
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
ProgressBarBinding.prototype.notch=function(_1154){
_1154=_1154?_1154:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1154);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1156,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1156,arg);
switch(_1156){
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
StartMenuItemBinding.prototype.setChecked=function(_1158,_1159){
StartMenuItemBinding.superclass.setChecked.call(this,_1158,_1159);
if(!_1159){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_115a){
var _115b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_115a);
UserInterface.registerBinding(_115b,StartMenuItemBinding);
return UserInterface.getBinding(_115b);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_115e,_115f){
var _1160=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_115f,true)==true){
if(_115e!="*"){
_115e=KeySetBinding._sanitizeKeyModifiers(_115e);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1160[doc]){
_1160[doc]={};
}
if(!_1160[doc][code]){
_1160[doc][code]={};
}
_1160[doc][code][_115e]=_115f;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1164=false;
var code=e.keyCode;
var _1166=KeySetBinding.keyEventHandlers;
if(_1166[doc]&&_1166[doc][code]){
var _1167="[default]";
_1167+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1167+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1167+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1167+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1168=_1166[doc][code][_1167];
if(_1168==null){
_1168=_1166[doc][code]["*"];
}
if(_1168!=null){
_1168.handleKeyEvent(e);
_1164=true;
}
}
return _1164;
};
KeySetBinding._sanitizeKeyModifiers=function(_1169){
var _116a="[default]";
var mods={};
if(_1169){
new List(_1169.split(" ")).each(function(_116c){
mods[_116c]=true;
});
function check(_116d){
if(mods[_116d]){
_116a+=" "+_116d;
}
}
check("shift");
check("control");
}
return _116a;
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
var _1171=key.getAttribute("oncommand");
var _1172=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1172){
DOMEvents.preventDefault(e);
}
var _1174=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1171,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1175){
if(_1175 instanceof CursorBinding){
_1175.setOpacity(0);
_1175.show();
new Animation({modifier:9,onstep:function(_1176){
_1175.setOpacity(Math.sin(_1176*Math.PI/180));
},onstop:function(){
_1175.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1177){
if(_1177 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1178){
_1177.setOpacity(Math.cos(_1178*Math.PI/180));
},onstop:function(){
_1177.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1179,_117a,_117b){
if(_1179 instanceof CursorBinding){
_117b.x-=16;
_117b.y-=16;
new Animation({modifier:3,onstep:function(_117c){
var tal=Math.sin(_117c*Math.PI/180);
_1179.setPosition(new Point(((1-tal)*_117a.x)+((0+tal)*_117b.x),((1-tal)*_117a.y)+((0+tal)*_117b.y)));
},onstop:function(){
CursorBinding.fadeOut(_1179);
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
CursorBinding.prototype.setOpacity=function(_1182){
this.bindingElement.style.opacity=new String(_1182);
this._opacity=_1182;
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
function setOpacity(_1185){
cover.bindingElement.style.opacity=new String(_1185);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1186){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1186*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1188){
cover.bindingElement.style.MozOpacity=new String(_1188);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1189){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1189*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_118b){
if(_118b!=this._isBusy){
if(_118b){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_118b;
}
};
CoverBinding.prototype.setTransparent=function(_118c){
if(_118c!=this._isTransparent){
if(_118c){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_118c;
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
CoverBinding.prototype.setHeight=function(_118e){
if(_118e>=0){
this.bindingElement.style.height=new String(_118e+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_118f){
var _1190=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_118f);
return UserInterface.registerBinding(_1190,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1192=UncoverBinding._bindingInstance;
if(Binding.exists(_1192)){
_1192.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1196){
this._isFading=_1196==true;
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
var _1197=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1197.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1197.clearRect(0,0,300,150);
_1197.fillRect(0,0,300,150);
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
var _1199=this._canvas.getContext("2d");
_1199.clearRect(0,0,300,150);
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
var _119a=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_119a);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _119b=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_119b){
this._startcontent=_119b.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_119c){
SourceCodeViewerBinding.superclass.handleAction.call(this,_119c);
switch(_119c.type){
case WindowBinding.ACTION_ONLOAD:
if(_119c.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_119c.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_119c);
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
var _11a0=this._transformer.transformToString(doc);
this._inject(_11a0);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11a3){
this.getContentDocument().body.innerHTML=_11a3;
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
var _11ab=list.getNext();
var id=_11ab.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11ab);
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
var _11b5=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11b5.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11b5.appendChild(att);
}
elm.appendChild(_11b5);
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
var _11bf=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11bf){
doc=XMLParser.parse(_11bf);
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
var _11c3=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11c3;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11c4,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11c4,arg);
switch(_11c4){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11c6){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11c6);
switch(_11c6.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11c6.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11c8=new List();
list.each(function(lang){
_11c8.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11c8);
}else{
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11cc=this.getDescendantBindingByLocalName("menugroup");
_11cc.detachRecursive();
_11cc.bindingElement.innerHTML="";
if(list.hasEntries()){
var _11cd=null;
while(list.hasNext()){
var _11ce=list.getNext();
if(_11ce.isSelected){
this.setLabel(_11ce.label);
}
var _11cf=MenuItemBinding.newInstance(this.bindingDocument);
_11cf.imageProfile=_11ce.imageProfile;
_11cf.setLabel(_11ce.label);
if(_11ce.tooltip!=null){
_11cf.setToolTip(_11ce.tooltip);
}
_11cf.selectionValue=_11ce.value;
_11cc.add(_11cf);
_11cf.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11d2){
switch(_11d2){
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
var _11d5=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11d5,root);
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
var _11d6=this.getProperty("status");
if(_11d6!=null){
switch(_11d6){
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
UserInterfaceMapping.prototype.merge=function(_11da){
for(var _11db in _11da.map){
this.map[_11db]=_11da.getBindingImplementation(_11db);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11dc){
var _11dd=null;
var name=_11dc.nodeName.toLowerCase();
if(this.map[name]){
_11dd=this.map[name];
}
return _11dd;
};
var UserInterface=new function(){
var _11df=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11e0=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11df,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11e1=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11e3,impl){
var _11e5=null;
if(!this.hasBinding(_11e3)){
var _11e6=DOMUtil.getParentWindow(_11e3);
if(DOMUtil.getLocalName(_11e3)!="bindingmapping"){
if(!impl&&_11e3.getAttribute("binding")!=null){
var _11e7=_11e3.getAttribute("binding");
impl=_11e6[_11e7];
if(impl==null){
throw "No such binding in scope: "+_11e7;
}
}
if(!impl){
var _11e8=_11e6.DocumentManager;
if(_11e8){
var _11e9=_11e8.customUserInterfaceMapping;
if(_11e9){
impl=_11e9.getBindingImplementation(_11e3);
}
}
}
if(!impl){
impl=_11e0.getBindingImplementation(_11e3);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11e5=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11e5){
var key=KeyMaster.getUniqueKey();
_11e3.setAttribute("key",key);
_11e5.key=key;
if(!_11e3.id){
_11e3.id=key;
}
keys[key]={element:_11e3,binding:_11e5};
_11e5.onBindingRegister();
}
}
}
return _11e5;
};
this.unRegisterBinding=function(_11eb){
terminate(_11eb);
};
function terminate(_11ec){
if(Binding.exists(_11ec)==true){
var key=_11ec.key;
Binding.destroy(_11ec);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11ec=null;
}else{
_11e1.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11ee){
var _11ef=null;
if(keys[_11ee.key]){
_11ef=keys[_11ee.key].element;
}
return _11ef;
};
this.getBinding=function(_11f0){
var _11f1=null;
if(_11f0&&_11f0.nodeType==Node.ELEMENT_NODE){
try{
var key=_11f0.getAttribute("key");
if(key&&keys[key]){
_11f1=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11f0);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11f1;
};
this.getBindingByKey=function(key){
var _11f4=null;
if(keys[key]){
_11f4=keys[key].binding;
}
return _11f4;
};
this.hasBinding=function(_11f5){
return this.getBinding(_11f5)!=null;
};
this.isBindingVisible=function(_11f6){
var _11f7=Application.isOperational;
if(_11f7==true){
var _11f8=new Crawler();
_11f8.type=NodeCrawler.TYPE_ASCENDING;
_11f8.id="visibilitycrawler";
_11f8.addFilter(function(_11f9){
var b=UserInterface.getBinding(_11f9);
var res=0;
if(!b.isVisible){
_11f7=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11f8.crawl(_11f6.bindingElement);
_11f8.dispose();
}
return _11f7;
};
var _11fc=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11fc={};
for(var key in keys){
_11fc[key]=true;
}
};
this.getPoint=function(){
var _1200=null;
if(_11fc){
_1200=new List();
for(var key in keys){
if(!_11fc[key]){
_1200.add(key);
}
}
}
return _1200;
};
this.clearPoint=function(){
_11fc=null;
};
this.trackUndisposedBindings=function(){
var _1202=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1202){
_1202="Bindings illdisposed: ";
}
_1202+=entry.binding+" ";
}
}
if(_1202!=null){
_11e1.error(_1202);
}
};
this.autoTrackDisposedBindings=function(_1205){
if(_1205){
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
SOAPRequest.newInstance=function(_1206,_1207){
var _1208=_1206+"/"+_1207;
var _1209=new SOAPRequest(_1208);
var _120a=SOAPRequest.resolver;
_1209.document=Templates.getTemplateDocument("soapenvelope.xml");
_1209.envelope=_120a.resolve("soap:Envelope",_1209.document);
_1209.header=_120a.resolve("soap:Header",_1209.envelope);
_1209.body=_120a.resolve("soap:Body",_1209.envelope);
return _1209;
};
SOAPRequest._parseResponse=function(_120b){
var _120c=null;
var _120d=false;
var doc=_120b.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_120c=SOAPRequestResponse.newInstance(_120b.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_120b.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_120d=true;
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
var text=_120b.responseText;
if(_120b.status==503||text.indexOf("id=\"offline\"")>-1){
_120d=true;
}else{
var cry="Invalid SOAP response: \n\n"+_120b.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_120b.responseText);
}
}
}
}
if(_120d==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _120c;
};
function SOAPRequest(_1212){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1212;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1214=DOMUtil.getXMLHTTPRequest();
var _1215=null;
_1214.open("post",url,false);
_1214.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1214.setRequestHeader("SOAPAction",this.action);
try{
_1214.send(this.document);
_1215=SOAPRequest._parseResponse(_1214);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1214=null;
return _1215;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1218){
var _1219=DOMUtil.getXMLHTTPRequest();
_1219.open("post",url,true);
_1219.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1219.setRequestHeader("SOAPAction",this.action);
_1219.onreadystatechange=function(){
if(_1219.readyState==4){
var _121a=SOAPRequest._parseResponse(_1219);
_1218(_121a);
_1219=null;
}
};
_1219.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _121b in this){
this[_121b]=null;
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
var _121d=null;
if(doc&&doc.documentElement){
_121d=new SOAPRequestResponse();
var _121e=SOAPRequestResponse.resolver;
_121d.document=doc;
_121d.envelope=_121e.resolve("soap:Envelope",_121d.document);
_121d.header=_121e.resolve("soap:Header",_121d.envelope);
_121d.body=_121e.resolve("soap:Body",_121d.envelope);
var fault=_121e.resolve("soap:Fault",_121d.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_121d.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_121e.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_121e.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _121d;
};
function SOAPFault(_1220,_1221,_1222){
this._operationName=_1220;
this._operationAddress=_1221;
this._faultString=_1222;
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
SOAPFault.newInstance=function(_1223,fault){
return new SOAPFault(_1223.name,_1223.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1226){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1226;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1228=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1228.body,this._operation);
var _122a=this._wsdl.getSchema();
var _122b=_122a.lookup(this._operation);
var _122c=_122b.getListedDefinitions();
while(_122c.hasNext()){
var def=_122c.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1228;
};
SOAPEncoder.prototype._resolve=function(_1230,_1231,value){
var _1233=this._wsdl.getSchema();
if(_1231.isSimpleValue){
this._appendText(_1230,value,_1231.type=="string");
}else{
var _1234=_1233.lookup(_1231.type);
if(_1234 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1234.getListedDefinitions();
if(_1234.isArray){
var _1236=new List(value);
var def=defs.getNext();
while(_1236.hasNext()){
var elm=this._appendElement(_1230,def.name);
var val=_1236.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1230,def.name);
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
SOAPEncoder.prototype._appendText=function(_123d,value,_123f){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1242=false;
var i=0,c;
while(c=chars[i++]){
var _1245=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1245=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1245=false;
}
break;
}
if(!_1245){
safe+=c;
}else{
_1242=true;
}
}
if(_1242){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_123d.appendChild(_123d.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1248){
this._wsdl=wsdl;
this._operation=_1248;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_124d){
var _124e=null;
var _124f=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1251=this.resolve(id,_124d.body);
var _1252=_124f.lookup(id);
var _1253=_1252.getListedDefinitions();
while(!_124e&&_1253.hasNext()){
var def=_1253.getNext();
var elm=this.resolve(def.name,_1251);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_124e=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_124e.appendChild(_124e.importNode(e,true));
}else{
_124e=this._compute(elm,def);
}
}
return _124e;
};
SOAPDecoder.prototype._compute=function(_1257,_1258){
var _1259=null;
var _125a=this._wsdl.getSchema();
if(_1258.isSimpleValue){
_1259=this._getSimpleValue(_1257,_1258.type);
}else{
var _125b=_125a.lookup(_1258.type);
if(_125b instanceof SchemaSimpleType){
_1259=this._getSimpleValue(_1257,_125b.restrictionType);
}else{
var defs=_125b.getListedDefinitions();
if(_125b.isArray){
_1259=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1257);
while(elms.hasNext()){
var elm=elms.getNext();
_1259.push(this._compute(elm,def));
}
}else{
if(_1257==null){
_1259=null;
}else{
_1259={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1257);
if(elm){
_1259[def.name]=this._compute(elm,def);
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
return _1259;
};
SOAPDecoder.prototype._getSimpleValue=function(_1260,type){
var _1262=null;
if(_1260!=null&&_1260.firstChild&&_1260.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1260.childNodes.length>1){
_1260.normalize();
}
_1262=_1260.firstChild.data;
switch(type){
case Schema.types.STRING:
_1262=_1262;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1262=Number(_1262);
break;
case Schema.types.BOOLEAN:
_1262=_1262=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1262;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1263){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1263);
}
Schema.prototype._parseSchema=function(_1264){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1265={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1264);
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
_1265[rule.getAttribute("name")]=entry;
}
return _1265;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_126a){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_126a);
}
SchemaDefinition.prototype._parse=function(_126b){
var min=_126b.getAttribute("minOccurs");
var max=_126b.getAttribute("maxOccurs");
var type=_126b.getAttribute("type");
this.name=_126b.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1271=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1271;
}else{
var elm=_126b.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1273,_1274){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1273,_1274);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1275,_1276){
var els=_1275.resolveAll("s:complexType/s:sequence/s:element",_1276);
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
function SchemaComplexType(_1278,_1279){
this._definitions=new List();
this._parseListedDefinitions(_1278,_1279);
this.isArray=_1279.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_127a,_127b){
var els=_127a.resolveAll("s:sequence/s:element",_127b);
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
function SchemaSimpleType(_127e,_127f){
this.restrictionType=null;
this._parse(_127e,_127f);
}
SchemaSimpleType.prototype._parse=function(_1280,_1281){
var _1282=_1280.resolve("s:restriction",_1281);
if(_1282){
this.restrictionType=_1282.getAttribute("base").split(":")[1];
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
var _1285=null;
var _1286=DOMUtil.getXMLHTTPRequest();
_1286.open("get",url,false);
_1286.send(null);
if(_1286.responseXML){
_1285=_1286.responseXML.documentElement;
}else{
alert(_1286.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1285;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1287=new List();
var _1288=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1288.hasEntries()){
while(_1288.hasNext()){
var _1289=_1288.getNext();
var name=_1289.getAttribute("name");
_1287.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1287;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_128c,_128d,_128e){
this.name=name;
this.address=_128c;
this.encoder=_128d;
this.decoder=_128e;
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
var _1292=wsdl.getOperations();
_1292.each(function(_1293){
proxy[_1293.name]=WebServiceProxy.createProxyOperation(_1293);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1294,_1295){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1295){
var log=_1295 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1294.address+": "+_1294.name+"\n\n";
log+=DOMSerializer.serialize(_1295.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1297){
return function(){
var _1298=new List(arguments);
var _1299=null;
if(typeof (_1298.getLast())=="function"){
var _129a=_1298.extractLast();
var _129b=_1297.encoder.encode(_1298);
this._log(_1297,_129b);
var self=this;
var _129d=_129b.asyncInvoke(_1297.address,function(_129e){
self._log(_1297,_129e);
if(_129e){
if(_129e.fault){
_1299=SOAPFault.newInstance(_1297,_129e.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1299,_129b,_129e);
}
}else{
if(WebServiceProxy.isDOMResult){
_1299=_129e.document;
}else{
_1299=_1297.decoder.decode(_129e);
}
}
}
_129b.dispose();
_129a(_1299);
});
}else{
var _129b=_1297.encoder.encode(new List(arguments));
this._log(_1297,_129b);
var _129d=_129b.invoke(_1297.address);
this._log(_1297,_129d);
if(_129d){
if(_129d.fault){
_1299=SOAPFault.newInstance(_1297,_129d.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1299,_129b,_129d);
}
}else{
if(WebServiceProxy.isDOMResult){
_1299=_129d.document;
}else{
_1299=_1297.decoder.decode(_129d);
}
}
}
_129b.dispose();
return _1299;
}
};
};
WebServiceProxy.handleFault=function(_129f,_12a0,_12a1){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_129f,soapRequest:_12a0,soapResponse:_12a1});
}
catch(exception){
alert(_129f.getFaultString());
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
var _12a2=SystemLogger.getLogger("MessageQueue");
var _12a3=null;
var _12a4=0;
var _12a5=null;
var _12a6=new Map();
var _12a7=new Map();
var _12a8=false;
var _12a9=false;
var _12aa=false;
var _12ab=false;
var _12ac={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_12a3=ConsoleMessageQueueService;
_12a4=_12a3.GetCurrentSequenceNumber("dummyparam!");
this.index=_12a4;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12a8){
if(!MessageQueue._actions.hasEntries()){
var _12ad=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12a9=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12ad;
_12a9=false;
}
}
}
};
this._pokeserver=function(){
if(_12a8==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12ae){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12a9);
this._updateMessages(_12ae);
}
};
this._updateMessages=function(_12af){
if(_12aa){
_12ab=true;
}else{
_12aa=true;
var self=this;
var _12b1=function(_12b2){
if(_12b2!=null){
if(Types.isDefined(_12b2.CurrentSequenceNumber)){
var _12b3=_12b2.CurrentSequenceNumber;
if(_12b3<self.index){
_12a2.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12b3);
}
self.index=_12b3;
var _12b4=new List(_12b2.ConsoleActions);
if(_12b4.hasEntries()){
self.evaluate(_12b4);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_12a2.error("No sequencenumber in MessageQueue response!");
}
}
_12aa=false;
if(_12ab){
_12ab=false;
self._updateMessages();
}
};
if(_12af){
_12b1(_12a3.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_12a3.GetMessages(Application.CONSOLE_ID,this.index,_12b1);
}
}
};
this.evaluate=function(_12b5){
var _12b6=new List();
if(_12b5.hasEntries()){
_12b5.each(function(_12b7){
if(this._index[_12b7.Id]!=true){
_12b6.add(_12b7);
}
this._index[_12b7.Id]=true;
},this);
if(_12b6.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12b6);
}else{
this._actions=_12b6;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12b8){
var _12b9="(No reason)";
if(_12b8!=null){
_12b9=_12b8.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12b9);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12bd){
if(_12bd==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12be=null;
if(this._actions.hasEntries()){
var _12bf=this._actions.extractFirst();
_12a4=_12bf.SequenceNumber;
_12a2.debug("MessageQueue action: "+_12bf.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_12a4+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12bf.ActionType){
case "OpenView":
_12be=_12bf.OpenViewParams;
if(_12be.ViewType=="ModalDialog"){
openDialogView(_12be);
}else{
_12a5=_12be.ViewId;
openView(_12be);
}
break;
case "CloseView":
_12be=_12bf.CloseViewParams;
_12a5=_12be.ViewId;
closeView(_12be);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12bf.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12a6.countEntries()+"\n";
_12a6.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_12a2.debug(debug);
if(!_12a6.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12c2=_12bf.SelectElementParams.PerspectiveElementKey;
if(_12c2){
var _12c3={handleBroadcast:function(_12c4,arg){
switch(_12c4){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12c2){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12bf.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12c3);
StageBinding.selectPerspective(_12bf.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12bf.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12bf.MessageBoxParams);
break;
case "OpenViewDefinition":
_12be=_12bf.OpenViewDefinitionParams;
_12a5=_12be.Handle;
openViewDefinition(_12be);
break;
case "LogEntry":
logEntry(_12bf.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12be=_12bf.BroadcastMessageParams;
_12a2.debug("Server says: EventBroadcaster.broadcast ( \""+_12be.Name+"\", "+_12be.Value+" )");
EventBroadcaster.broadcast(_12be.Name,_12be.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12a6.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12bf.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12bf.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12bf.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12be=_12bf.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12be.ViewId,entityToken:_12be.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12be=_12bf.OpenGenericViewParams;
openGenericView(_12be);
break;
case "OpenExternalView":
_12be=_12bf.OpenExternalViewParams;
openExternalView(_12be);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12bf.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12a9);
}
function logEntry(_12c6){
var _12c7=_12c6.Level.toLowerCase();
SystemLogger.getLogger(_12c6.SenderId)[_12c7](_12c6.Message);
}
function openView(_12c8){
var list=paramsToList(_12c8.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12c8.ViewId);
def.entityToken=_12c8.EntityToken;
def.flowHandle=_12c8.FlowHandle;
def.position=_12ac[_12c8.ViewType],def.label=_12c8.Label;
def.image=_12c8.Image;
def.toolTip=_12c8.ToolTip;
def.argument={"url":_12c8.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12c8.ViewId,entityToken:_12c8.EntityToken,flowHandle:_12c8.FlowHandle,position:_12ac[_12c8.ViewType],url:_12c8.Url,label:_12c8.Label,image:_12c8.Image,toolTip:_12c8.ToolTip}));
}
}
function openDialogView(_12cb){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12cb.ViewId,flowHandle:_12cb.FlowHandle,position:Dialog.MODAL,url:_12cb.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12cc){
var _12cd=_12cc.DialogType.toLowerCase();
if(_12cd=="question"){
throw "Not supported!";
}else{
Dialog[_12cd](_12cc.Title,_12cc.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12ce){
var map={};
var _12d0=false;
new List(_12ce.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12d0=true;
});
var proto=ViewDefinitions[_12ce.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12ce.ViewId;
}
def.argument=_12d0?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12d5){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12d5.ViewId);
def.label=_12d5.Label;
def.toolTip=_12d5.ToolTip;
def.image=_12d5.Image;
def.argument={"url":_12d5.Url,"list":paramsToList(_12d5.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12d7){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12d7.ViewId);
def.label=_12d7.Label;
def.toolTip=_12d7.ToolTip;
def.image=_12d7.Image;
def.url=_12d7.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12d9){
if(StageBinding.isViewOpen(_12d9.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12d9.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12da){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12da.ViewId,isSuccess:_12da.Succeeded});
}
this._lockSystem=function(_12db){
var _12dc=top.bindingMap.offlinetheatre;
if(_12db){
_12dc.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12dc.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a8=_12db;
};
this.placeConsoleCommand=function(_12de){
_12a3.PlaceConsoleCommand(Application.CONSOLE_ID,_12de);
};
this.handleBroadcast=function(_12df,arg){
switch(_12df){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12a5!=null&&arg==_12a5){
_12a5=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12a6.set(arg,true);
}else{
_12a2.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12a6.hasEntries()){
_12a6.del(arg);
_12a2.debug("Refreshed tree: "+arg+"\n("+_12a6.countEntries()+" trees left!)");
if(!_12a6.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12a7.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12a7.hasEntries()==true){
_12a7.del(arg);
if(!_12a7.hasEntries()){
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
function paramsToList(_12e1){
var list=new List();
new List(_12e1).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12e4=false;
var _12e5=null;
var _12e6=false;
var _12e7=Client.qualifies();
var _12e8="admin";
var _12e9="123456";
if(!_12e7){
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
this.handleBroadcast=function(_12ea){
switch(_12ea){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12ea);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12eb=bindingMap.decks.getSelectedDeckBinding();
if(_12eb!=null){
switch(_12eb.getID()){
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
var _12ec=window.bindingMap.appwindow;
_12ec.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12ed=window.location.hash.replace(/^#/,"");
if(_12ed){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12ed);
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
function fileEventBroadcasterSubscriptions(_12ee){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12ef){
if(_12ee){
EventBroadcaster.subscribe(_12ef,KickStart);
}else{
EventBroadcaster.unsubscribe(_12ef,KickStart);
}
});
}
function kickStart(_12f0){
switch(_12f0){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12e4=true;
break;
}
if(_12e4){
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
DataManager.getDataBinding("username").setValue(_12e8);
DataManager.getDataBinding("password").setValue(_12e9);
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
var _12f3=DataManager.getDataBinding("username").getResult();
var _12f4=DataManager.getDataBinding("passwordold").getResult();
var _12f5=DataManager.getDataBinding("passwordnew").getResult();
var _12f6=DataManager.getDataBinding("passwordnew2").getResult();
if(_12f5==_12f6){
var _12f7=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f8=LoginService.ChangePassword(_12f3,_12f4,_12f5);
if(_12f8 instanceof SOAPFault){
alert(_12f8.getFaultString());
}else{
if(_12f8.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12f8);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12f7){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12f9){
_12f9=new List(_12f9);
var _12fa=document.getElementById("passworderror");
_12fa.innerHTML="";
_12f9.each(function(error){
var _12fc=document.createElement("div");
_12fc.textContent=error;
_12fc.className="errortext";
_12fa.appendChild(_12fc);
});
_12fa.style.display="block";
var _12fd={handleAction:function(_12fe){
document.getElementById("passworderror").style.display="none";
_12fe.target.removeActionListener(Binding.ACTION_DIRTY,_12fd);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12fd);
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
this.doLogin=function(_12ff,_1300){
var _1301=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1302=false;
var _1303=false;
var _1304=LoginService.ValidateAndLogin(_12ff,_1300);
if(_1304 instanceof SOAPFault){
alert(_1304.getFaultString());
}else{
if(_1304=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_1304=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_1304=="passwordUpdateRequired"){
_1303=true;
}
if(_1304=="success"){
_1302=true;
}
}
if(_1303){
changePasswordRequired();
}else{
if(_1302){
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
if(_1301){
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
var _1305=document.getElementById("passwordexpired");
_1305.firstChild.data=_1305.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1306=DataManager.getDataBinding("username");
var _1307=DataManager.getDataBinding("password");
_1306.blur();
_1307.blur();
_1306.setValue("");
_1307.setValue("");
_1306.clean();
_1307.clean();
_1306.focus();
document.getElementById("loginerror").style.display="block";
var _1308={handleAction:function(_1309){
document.getElementById("loginerror").style.display="none";
_1309.target.removeActionListener(Binding.ACTION_DIRTY,_1308);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1308);
}
WindowManager.fireOnLoad(this);
if(!_12e7){
UpdateManager.isEnabled=false;
}
};

