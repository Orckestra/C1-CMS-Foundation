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
}else{
this.setProperty("ischecked",true);
}
}
};
ButtonBinding.prototype._check=function(_692){
this.isActive=true;
this.isChecked=true;
if(!_692){
this._stateManager.invokeActiveState();
}
this.setProperty("ischecked",true);
};
ButtonBinding.prototype.uncheck=function(_693){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_693==true){
this.fireCommand();
}
}else{
this.setProperty("ischecked",false);
}
}
};
ButtonBinding.prototype._uncheck=function(_694){
this.isActive=false;
this.isChecked=false;
if(!_694){
this._stateManager.invokeNormalState();
}
this.setProperty("ischecked",false);
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
ClickButtonBinding.newInstance=function(_6aa){
var _6ab=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_6aa);
return UserInterface.registerBinding(_6ab,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_6ac){
var _6ad=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_6ac);
return UserInterface.registerBinding(_6ad,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_6ae){
var _6af=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_6ae);
return UserInterface.registerBinding(_6af,CheckButtonBinding);
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
var _6b0=this.getDescendantBindingsByLocalName("control");
_6b0.each(function(_6b1){
_6b1.setControlType(_6b1.controlType);
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
ControlGroupBinding.newInstance=function(_6b3){
var _6b4=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6b3);
return UserInterface.registerBinding(_6b4,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6b7){
ControlBinding.superclass.handleAction.call(this,_6b7);
switch(_6b7.type){
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
function ControlImageProfile(_6b8){
this.binding=_6b8;
}
ControlImageProfile.prototype._getImage=function(_6b9){
var _6ba=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6ba=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6ba=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6ba=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6ba=this.constructor.IMAGE_CLOSE;
break;
}
return _6ba.replace("${string}",_6b9);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6bb=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6bb=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6bb?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6bc){
ControlBoxBinding.superclass.handleAction.call(this,_6bc);
switch(_6bc.type){
case ControlBinding.ACTION_COMMAND:
var _6bd=_6bc.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6bd);
Application.unlock(self);
},0);
_6bc.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6bf){
switch(_6bf.controlType){
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
ControlBoxBinding.prototype.setState=function(_6c0){
var _6c1=this.getState();
this.setProperty("state",_6c0);
this.detachClassName(_6c1);
this.attachClassName(_6c0);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6c2=this.getProperty("state");
if(!_6c2){
_6c2=ControlBoxBinding.STATE_NORMAL;
}
return _6c2;
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
MenuContainerBinding.prototype.isOpen=function(_6c3){
var _6c4=null;
if(!_6c3){
_6c4=this._isOpen;
}else{
_6c4=(_6c3==this._openElement);
}
return _6c4;
};
MenuContainerBinding.prototype.setOpenElement=function(_6c5){
if(_6c5){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6c5;
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
var _6c6=this.getChildBindingByLocalName("menupopup");
if(_6c6&&_6c6!=this.menuPopupBinding){
this.menuPopupBinding=_6c6;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6c7=this.getMenuContainerBinding();
_6c7.setOpenElement(this);
var _6c8=this.getMenuPopupBinding();
_6c8.snapTo(this.bindingElement);
_6c8.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6c9){
MenuContainerBinding.superclass.handleAction.call(this,_6c9);
if(_6c9.type==PopupBinding.ACTION_HIDE){
var _6ca=this.getMenuContainerBinding();
_6ca.setOpenElement(false);
this.reset();
_6c9.consume();
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
MenuBarBinding.prototype.handleAction=function(_6cb){
MenuBarBinding.superclass.handleAction.call(this,_6cb);
switch(_6cb.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6cc=_6cb.target;
var _6cd=this.getChildBindingsByLocalName("menu");
while(_6cd.hasNext()){
var menu=_6cd.getNext();
}
switch(_6cc.arrowKey){
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
var _6cf=this.getProperty("image");
var _6d0=this.getProperty("label");
var _6d1=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6d0){
this.setLabel(_6d0);
}
if(_6cf){
this.setImage(_6cf);
}
if(_6d1){
this.setToolTip(_6d1);
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
MenuBinding.prototype.setLabel=function(_6d3){
this.setProperty("label",_6d3);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6d3));
}
};
MenuBinding.prototype.setToolTip=function(_6d4){
this.setProperty("tooltip",_6d4);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6d4));
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
var _6d6=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6d6.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6d6.isOpen()&&!_6d6.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6d6.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6d6.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6d7,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6d7){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6dc){
switch(_6dc.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6dd=null;
var _6de=true;
self._lastFocused.focus();
self.grabKeyboard();
_6dc.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6e0){
for(var key in this._focused){
if(key!=_6e0.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6e0.key]=_6e0;
this._lastFocused=_6e0;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6e3){
delete this._focused[_6e3.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6e4){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6e4);
}
if(_6e4){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6e7=this.getChildBindingsByLocalName("menugroup");
var _6e8=null;
var _6e9=null;
while(_6e7.hasNext()){
var _6ea=_6e7.getNext();
if(!_6ea.isDefaultContent){
_6ea.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6e8&&_6ea.isVisible){
_6e8=_6ea;
}
if(_6ea.isVisible){
_6e9=_6ea;
}
}
}
if(_6e8&&_6e9){
_6e8.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6e9.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6eb){
MenuBodyBinding.activeInstance=this;
if(_6eb){
var _6ec=this._getMenuItems().getFirst();
if(_6ec){
_6ec.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6ed=this._lastFocused;
if((_6ed!=null)&&(!_6ed.isMenuContainer)){
_6ed.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6ef=this._getMenuItems();
var _6f0=null;
var next=null;
if(this._lastFocused){
_6f0=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6ef.getPreceding(_6f0);
break;
case KeyEventCodes.VK_DOWN:
next=_6ef.getFollowing(_6f0);
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
next=_6ef.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6f3=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6f4){
_6f3=_6f4.getChildBindingsByLocalName("menuitem");
_6f3.each(function(item){
list.add(item);
});
});
_6f3=this.getChildBindingsByLocalName("menuitem");
_6f3.each(function(item){
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
MenuBodyBinding.newInstance=function(_6f7){
var _6f8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6f7);
return UserInterface.registerBinding(_6f8,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6f9){
switch(_6f9){
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
MenuGroupBinding.newInstance=function(_6fa){
var _6fb=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6fa);
return UserInterface.registerBinding(_6fb,MenuGroupBinding);
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
var _6fc=this.getProperty("image");
var _6fd=this.getProperty("image-hover");
var _6fe=this.getProperty("image-active");
var _6ff=this.getProperty("image-disabled");
if(!this.image&&_6fc){
this.image=_6fc;
}
if(!this.imageHover&&_6fd){
this.imageHover=_6fc;
}
if(!this.imageActive&&_6fe){
this.imageActive=_6fe;
}
if(!this.imageDisabled&&_6ff){
this.imageDisabled=_6ff;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _700=this.getProperty("label");
var _701=this.getProperty("tooltip");
var type=this.getProperty("type");
var _703=this.getProperty("isdisabled");
var _704=this.getProperty("image");
var _705=this.getProperty("image-hover");
var _706=this.getProperty("image-active");
var _707=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _708=this.getMenuPopupBinding();
if(_708){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_704){
this.image=_704;
}
if(!this.imageHover&&_705){
this.imageHover=_704;
}
if(!this.imageActive&&_706){
this.imageActive=_706;
}
if(!this.imageDisabled&&_707){
this.imageDisabled=_707;
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
if(_700!=null){
this.setLabel(_700);
}
if(_701){
this.setToolTip(_701);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_703==true){
this.disable();
}
var _709=this.getProperty("oncommand");
if(_709){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_709);
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
MenuItemBinding.prototype.setLabel=function(_70c){
this.setProperty("label",_70c);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_70c));
}
};
MenuItemBinding.prototype.setToolTip=function(_70d){
this.setProperty("tooltip",_70d);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_70d));
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
var _70f=this.bindingDocument.createElement("div");
_70f.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_70f.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _710=this.labelBinding.bindingElement;
_710.insertBefore(_70f,_710.firstChild);
_70f.style.display="none";
this.shadowTree.checkBoxIndicator=_70f;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _70f=this.bindingDocument.createElement("div");
_70f.className=MenuItemBinding.CLASSNAME_SUBMENU;
_70f.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _710=this.labelBinding.bindingElement;
_710.insertBefore(_70f,_710.firstChild);
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
var _712=this.imageProfile.getDisabledImage();
if(_712){
this.setImage(_712);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _712=this.imageProfile.getDefaultImage();
if(_712){
this.setImage(_712);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _714=this.getMenuContainerBinding();
if(_714.isOpen()&&!_714.isOpen(this)){
_714._openElement.hide();
_714.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _714=this.getMenuContainerBinding();
if(!_714.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_716){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _717=this.getMenuContainerBinding();
if(!_717||!_717.isOpen(this)||_716){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_718){
this.setChecked(true,_718);
};
MenuItemBinding.prototype.uncheck=function(_719){
this.setChecked(false,_719);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_71a,_71b){
this.setProperty("ischecked",_71a);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_71a){
this.isChecked=_71a;
this.shadowTree.checkBoxIndicator.style.display=_71a?"block":"none";
if(!_71b){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_71c){
var _71d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_71c);
UserInterface.registerBinding(_71d,MenuItemBinding);
return UserInterface.getBinding(_71d);
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
PopupSetBinding.newInstance=function(_71e){
var _71f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_71e);
return UserInterface.registerBinding(_71f,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_720,arg){
switch(_720){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _724=PopupBinding.activeInstances.get(key);
var _725=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_724);
if(!_725){
list.add(_724);
}
});
list.each(function(_726){
_726.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _728=PopupBinding.activeInstances.get(key);
_728.hide();
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
var _729=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _72a=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_729){
this._bodyBinding=UserInterface.getBinding(_729);
}else{
if(_72a){
this._bodyBinding=UserInterface.getBinding(_72a);
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
var _72b=this.getProperty("position");
this.position=_72b?_72b:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_72c){
var _72d=null;
if(this._bodyBinding){
this._bodyBinding.add(_72c);
_72d=_72c;
}else{
_72d=PopupBinding.superclass.add.call(this,_72c);
}
return _72d;
};
PopupBinding.prototype.addFirst=function(_72e){
var _72f=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_72e);
_72f=_72e;
}else{
_72f=PopupBinding.superclass.addFirst.call(this,_72e);
}
return _72f;
};
PopupBinding.prototype.handleAction=function(_730){
PopupBinding.superclass.handleAction.call(this,_730);
var _731=_730.target;
switch(_730.type){
case Binding.ACTION_ATTACHED:
if(_731 instanceof MenuItemBinding){
this._count(true);
_730.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_731 instanceof MenuItemBinding){
this._count(false);
_730.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_732){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_732?1:-1);
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
PopupBinding.prototype.snapTo=function(_733){
var _734=this._getElementPosition(_733);
switch(this.position){
case PopupBinding.POSITION_TOP:
_734.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_734.x+=_733.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_734.y+=_733.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_734.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_733;
this.bindingElement.style.display="block";
this.setPosition(_734.x,_734.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_736){
this.bindingElement.style.display="block";
this.setPosition(_736.x,_736.y);
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
PopupBinding.prototype._getElementPosition=function(_73b){
return _73b.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_73b):DOMUtil.getUniversalPosition(_73b);
};
PopupBinding.prototype._getMousePosition=function(e){
var _73d=DOMEvents.getTarget(e);
return _73d.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_73e){
var _73f=this.bindingElement;
if(_73e){
_73f.style.visibility="visible";
}else{
_73f.style.visibility="hidden";
_73f.style.display="none";
}
this.isVisible=_73e;
};
PopupBinding.prototype._enableTab=function(_740){
var self=this;
var _742=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_742.each(function(_743){
_743.bindingElement.tabIndex=_740?0:-1;
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
var _74b=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_74b.y<0){
y=-_74b.y;
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
PopupBinding.prototype.grabKeyboard=function(_74d){
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
var _753=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_753=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _753;
};
PopupBinding.prototype.clear=function(){
var _754=this._bodyBinding;
if(_754){
_754.detachRecursive();
_754.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_755){
var _756=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_755);
return UserInterface.registerBinding(_756,PopupBinding);
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
PopupBodyBinding.newInstance=function(_758){
var _759=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_758);
return UserInterface.registerBinding(_759,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_75a){
return new Point(_75a.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_75b){
var _75c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_75b);
return UserInterface.registerBinding(_75c,MenuPopupBinding);
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
var _75d=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_75d){
this._body=UserInterface.getBinding(_75d);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _75e=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_75e.hasNext()){
var _75f=DialogBorderBinding.newInstance(this.bindingDocument);
_75f.setType(_75e.getNext());
this.add(_75f);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _760=this.getProperty("controls");
if(_760){
var _761=new List(_760.split(" "));
while(_761.hasNext()){
var type=_761.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _763=DialogControlBinding.newInstance(this.bindingDocument);
_763.setControlType(type);
this._titlebar.addControl(_763);
this.controlBindings[type]=_763;
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
var _764=this.getProperty("image");
var _765=this.getProperty("label");
var _766=this.getProperty("draggable");
var _767=this.getProperty("resizable");
var _768=this.getProperty("modal");
if(_764){
this.setImage(_764);
}
if(_765){
this.setLabel(_765);
}
if(_766==false){
this.isDialogDraggable=false;
}
if(_767==false){
this.isPanelResizable=false;
}
if(_768==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_769){
this.isModal=_769;
};
DialogBinding.prototype.setLabel=function(_76a){
this.setProperty("label",_76a);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_76a));
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
DialogBinding.prototype.handleAction=function(_76c){
DialogBinding.superclass.handleAction.call(this,_76c);
switch(_76c.type){
case Binding.ACTION_DRAG:
var _76d=_76c.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_76d.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_76d.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_76d;
_76d.dragger.registerHandler(this);
}
break;
}
}
_76c.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_76c.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_76e,arg){
DialogBinding.superclass.handleBroadcast.call(this,_76e,arg);
switch(_76e){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_770){
DialogBinding.superclass.handleInvokedControl.call(this,_770);
switch(_770.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_771){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_771){
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
var _773=self.bindingElement;
setTimeout(function(){
_773.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_774){
this.bindingElement.style.zIndex=new String(_774);
};
DialogBinding.prototype.onDragStart=function(_775){
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
DialogBinding.prototype.setResizable=function(_787){
if(this._isResizable!=_787){
if(_787){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_787;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _788=null;
var _789=this.bindingDocument.body.offsetWidth;
var _78a=this.bindingDocument.body.offsetHeight;
_788={x:0.125*_789,y:0.125*_78a,w:0.75*_789,h:0.5*_78a};
return _788;
};
DialogBinding.prototype.centerOnScreen=function(){
var _78b=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_78b.w-dim.w),0.5*(_78b.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _78d=this;
var i=0;
function blink(){
if(i%2==0){
_78d.detachClassName("active");
}else{
_78d.attachClassName("active");
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
var _791="";
while(list.hasNext()){
var type=list.getNext();
_791+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_791);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_792){
var _793=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_792);
return UserInterface.registerBinding(_793,DialogBinding);
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
DialogHeadBinding.newInstance=function(_794){
var _795=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_794);
return UserInterface.registerBinding(_795,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_798);
return UserInterface.registerBinding(_799,DialogBodyBinding);
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
DialogSetBinding.prototype.handleAction=function(_79a){
DialogSetBinding.superclass.handleAction.call(this,_79a);
var _79b=_79a.target;
switch(_79a.type){
case Binding.ACTION_MOVETOTOP:
if(_79b instanceof DialogBinding){
this._moveToTop(_79b);
}
break;
case Binding.ACTION_MOVEDONTOP:
_79a.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_79c){
var _79d=0;
var _79e=this.getChildBindingsByLocalName("dialog");
_79e.each(function(_79f){
var _7a0=_79f.getZIndex();
_79d=_7a0>_79d?_7a0:_79d;
});
_79c.setZIndex(_79d+2);
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
DialogBorderBinding.newInstance=function(_7a2){
var _7a3=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_7a2);
return UserInterface.registerBinding(_7a3,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_7a4){
this._dialogBinding=_7a4;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_7a6){
DialogCoverBinding.superclass.handleAction.call(this,_7a6);
var _7a7=_7a6.target;
if(this._dialogBinding.isModal){
switch(_7a6.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_7a7==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_7a7.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_7a8,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_7a8,arg);
switch(_7a8){
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
var _7ab=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_7ab);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _7ac=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_7ac);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_7ad){
var _7ae=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_7ad);
return UserInterface.registerBinding(_7ae,DialogCoverBinding);
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
var _7af=this.getProperty("image");
if(_7af){
this.setImage(_7af);
}
var _7b0=this.getProperty("label");
if(_7b0){
this.setLabel(_7b0);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_7b1){
if(this.isAttached){
this.labelBinding.setLabel(_7b1);
}
this.setProperty("label",_7b1);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_7b3){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_7b3);
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
DialogTitleBarBinding.newInstance=function(_7b4){
var _7b5=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_7b4);
return UserInterface.registerBinding(_7b5,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7b6){
var _7b7=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7b6);
return UserInterface.registerBinding(_7b7,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7b8){
var _7b9=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7b8);
return UserInterface.registerBinding(_7b9,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7ba){
this.binding=_7ba;
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
var _7bd=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7be=node.nodeName.toLowerCase();
switch(_7be){
case "script":
case "style":
case "textarea":
_7bd=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7bd;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7c5=true;
if(exp.test(text)){
self._textnodes.add(node);
_7c5=false;
}
return _7c5;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7c6,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7c6,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7ca=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7ca+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7d0){
var _7d1="";
var _7d2="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7d3="</span>";
var self=this;
function iterate(_7d5){
var _7d6=-1;
var _7d7=null;
self._map.each(function(key,exp){
var low=_7d5.toLowerCase();
var _7db=low.search(exp);
if(_7db>-1){
if(_7d6==-1){
_7d6=_7db;
}
if(_7db<=_7d6){
_7d6=_7db;
_7d7=key;
}
}
});
if(_7d6>-1&&_7d7!=null){
var pre=_7d5.substring(0,_7d6);
var hit=_7d5.substring(_7d6,_7d6+_7d7.length);
var pst=_7d5.substring(_7d6+_7d7.length,_7d5.length);
_7d1+=pre+_7d2+hit+_7d3;
iterate(pst);
}else{
_7d1+=_7d5;
}
}
iterate(_7d0);
return _7d1;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7df){
var _7e0=new List(_7df.getElementsByTagName("span"));
_7e0.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7df.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7e3){
var _7e4=null;
if(_7e3.isAttached){
var doc=_7e3.getContentDocument();
if(doc!=null){
_7e4=new XMLSerializer().serializeToString(doc);
if(XMLParser.parse(_7e4,true)==null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7e4=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7e4 instanceof SOAPFault){
_7e4=null;
}
}
}
}
return _7e4;
};
WindowBinding.highlightKeywords=function(_7e8,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7e8.isAttached){
var doc=_7e8.getContentDocument();
if(doc!=null){
var _7eb=WindowBinding._highlightcrawler;
_7eb.reset(doc.body);
if(list!=null){
_7eb.setKeys(list);
_7eb.crawl(doc.body);
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
var _7ec=WindowBinding.superclass.serialize.call(this);
if(_7ec){
_7ec.url=this.getURL();
}
return _7ec;
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
var _7ee=this.getContentWindow().DocumentManager;
if(_7ee!=null){
_7ee.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7ef){
WindowBinding.superclass.handleAction.call(this,_7ef);
var _7f0=_7ef.target;
switch(_7ef.type){
case RootBinding.ACTION_PHASE_3:
if(_7f0.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7f0);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7ef.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7f1){
if(!this.isFit||_7f1){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7f2){
if(this._pageBinding==null){
if(_7f2.bindingWindow==this.getContentWindow()){
this._pageBinding=_7f2;
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
WindowBinding.prototype._registerOnloadListener=function(_7f3){
var _7f4=this.shadowTree.iframe;
var _7f5=_7f3?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7f8=true;
if(Client.isExplorer){
_7f8=_7f4.readyState=="complete";
}
if(_7f8==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7f5](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7f9){
var _7fa=_7f9?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7fa](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7ff=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7ff.getQueryString().each(function(name,_801){
if(_801.length>512){
data.set(name,_801);
_7ff.setParam(name,null);
}
});
url=_7ff.toString();
}
if(data){
var self=this;
var _803=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_803.id;
form.setAttribute("target",_803.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_806){
var _807=self.bindingDocument.createElement("input");
_807.name=name;
_807.value=_806;
_807.type="hidden";
form.appendChild(_807);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _808=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_808=url;
}
return _808;
};
WindowBinding.prototype.reload=function(_80a){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _80b=null;
if(this.shadowTree.iframe!=null){
_80b=this.shadowTree.iframe;
}
return _80b;
};
WindowBinding.prototype.getContentWindow=function(){
var _80c=null,_80d=this.getFrameElement();
if(_80d!==null){
try{
_80c=_80d.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _80c;
};
WindowBinding.prototype.getContentDocument=function(){
var _80e=null,win=this.getContentWindow();
if(win){
_80e=win.document;
}
return _80e;
};
WindowBinding.prototype.getRootBinding=function(){
var _810=null,doc=this.getContentDocument();
if(doc&&doc.body){
_810=UserInterface.getBinding(doc.body);
}
return _810;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_812){
this.bindingElement.style.height=_812+"px";
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
WindowBinding.prototype.handleCrawler=function(_813){
WindowBinding.superclass.handleCrawler.call(this,_813);
if(_813.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_813.nextNode=root.bindingElement;
}else{
_813.response=NodeCrawler.SKIP_CHILDREN;
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
var _818=this.getContentWindow();
if(_818!=null&&_818.document!=null&&_818.document.body!=null){
if(this.bindingElement.offsetHeight){
_818.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_818.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_819){
var _81a=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_819);
var _81b=UserInterface.registerBinding(_81a,WindowBinding);
return _81b;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_81f){
_81f.target.show();
_81f.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_821){
_821.target.show();
_821.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_823){
PreviewWindowBinding.superclass.handleAction.call(this,_823);
switch(_823.type){
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
var _824=null;
this._getRadioButtonBindings().each(function(_825){
if(_825.getProperty("ischecked")){
_824=_825;
return false;
}else{
return true;
}
});
if(_824){
this._checkedRadioBinding=_824;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_826){
RadioGroupBinding.superclass.handleAction.call(this,_826);
var _827=_826.target;
switch(_826.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_826.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_827.isRadioButton&&!_827.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_827);
}
this._checkedRadioBinding=_827;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_826.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_828,_829){
if(_828 instanceof RadioDataBinding){
_828=_828.getButton();
}
if(_828.isRadioButton){
switch(_829){
case true:
this._unCheckRadioBindingsExcept(_828);
this._checkedRadioBinding=_828;
_828.check(true);
break;
default:
_828.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_82a){
var _82b=this._getRadioButtonBindings();
_82b.each(function(_82c){
if(_82c.isChecked&&_82c!=_82a){
_82c.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _82d=new Crawler();
var list=new List();
_82d.addFilter(function(_82f){
var _830=true;
var _831=UserInterface.getBinding(_82f);
if(_831 instanceof RadioGroupBinding){
_830=NodeCrawler.SKIP_CHILDREN;
}else{
if(_831 instanceof ButtonBinding&&_831.isRadioButton){
list.add(_831);
}
}
return _830;
});
_82d.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_832){
var _833=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_832);
return UserInterface.registerBinding(_833,RadioGroupBinding);
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
var _835=this.getProperty("regexrule");
if(_835!=null){
this.expression=new RegExp(_835);
}
var _836=this.getProperty("onbindingblur");
if(_836!=null){
this.onblur=function(){
Binding.evaluate(_836,this);
};
}
var _837=this.getProperty("onvaluechange");
if(_837!=null){
this.onValueChange=function(){
Binding.evaluate(_837,this);
};
}
if(this.error==null&&this.type!=null){
var _838=DataBinding.errors[this.type];
if(_838!=null){
this.error=_838;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _839=this.getProperty("value");
if(_839!=null){
this.setValue(String(_839));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _83b=this.getProperty("isdisabled");
if(_83b==true){
this.setDisabled(true);
}
var _83c=this.getProperty("readonly");
if(_83c==true){
this.setReadOnly(true);
}
var _83d=this.getProperty("autoselect");
if(_83d==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _83e=this.getProperty("placeholder");
if(_83e){
this.shadowTree.input.setAttribute("placeholder",Resolver.resolve(_83e));
}
if(this.spellcheck&&Client.hasSpellcheck){
var _83f=Localization.currentLang();
if(_83f!=null){
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
var _840=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_840.type=this.isPassword==true?"password":"text";
_840.tabIndex=-1;
return _840;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_843){
if(_843){
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
DataInputBinding.prototype.focus=function(_845){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_845){
var self=this,_847=this.bindingElement,_848={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_847,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_847,DOMEvents.MOUSEUP,_848);
}else{
this.select();
}
}
this.onfocus();
if(!_845){
var _849=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_849);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _84a=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _84b=_84a.createTextRange();
_84b.moveStart("character",0);
_84b.moveEnd("character",_84a.value.length);
_84b.select();
}else{
_84a.setSelectionRange(0,_84a.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_84c){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_84c){
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
DataInputBinding.prototype.validate=function(_850){
if(_850==true||this._isValid){
var _851=this.isValid();
if(_851!=this._isValid){
this._isValid=_851;
if(!_851){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _852=null;
if(this._isInvalidBecauseRequired==true){
_852=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_852=DataBinding.warnings["minlength"];
_852=_852.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_852=DataBinding.warnings["maxlength"];
_852=_852.replace("${count}",String(this.maxlength));
}else{
_852=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_852!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_852);
}
}else{
this.setValue(_852);
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
var _853=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _854=this.getValue();
if(_854==""){
if(this.isRequired==true){
_853=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _855=DataBinding.expressions[this.type];
if(!_855.test(_854)){
_853=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_854)){
_853=false;
}
}
}
}
if(_853&&this.minlength!=null){
if(_854.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_853=false;
}
}
if(_853&&this.maxlength!=null){
if(_854.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_853=false;
}
}
return _853;
};
DataInputBinding.prototype.setDisabled=function(_856){
if(_856!=this.isDisabled){
if(_856){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _857=this.shadowTree.input;
if(_856){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_857,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_857,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_856;
this.shadowTree.input.unselectable=_856?"on":"off";
}
this.isDisabled=_856;
this.isFocusable=!_856;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_859){
if(_859!=this.isReadOnly){
if(_859){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_859;
this.isReadOnly=_859;
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
DataInputBinding.prototype.handleElement=function(_85a){
return true;
};
DataInputBinding.prototype.updateElement=function(_85b){
var _85c=_85b.getAttribute("value");
var _85d=_85b.getAttribute("type");
var _85e=_85b.getAttribute("maxlength");
var _85f=_85b.getAttribute("minlength");
var _860=_85b.getAttribute("required")==="true";
if(_85c==null){
_85c="";
}
var _861=this.bindingWindow.UpdateManager;
if(this.getValue()!=_85c){
_861.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_85c);
}
if(this.type!=_85d){
_861.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_85d;
}
if(this.maxlength!=_85e){
_861.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_85e;
}
if(this.minlength!=_85f){
_861.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_85f;
}
if(this.isRequired!=_860){
_861.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_860;
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
DataInputBinding.prototype.setValue=function(_862){
if(_862===null){
_862="";
}
if(_862!=this.getValue()){
this.setProperty("value",_862);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_862);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _863=null;
if(this.shadowTree.input!=null){
_863=this.shadowTree.input.value;
}else{
_863=this.getProperty("value");
}
return _863;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _865=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_865=Number(_865);
break;
}
return _865;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_866){
var _867=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_866);
return UserInterface.registerBinding(_867,DataInputBinding);
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
var _868=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_868!=null){
this.setValue(_868.value);
_868.parentNode.removeChild(_868);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _869;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_869=div.firstChild;
}else{
_869=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_869.tabIndex=-1;
return _869;
};
TextBoxBinding.prototype.handleElement=function(_86b){
return true;
};
TextBoxBinding.prototype.updateElement=function(_86c){
var _86d,area=_86c.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_86d=DOMUtil.getTextContent(area);
}
if(_86d==null){
_86d="";
}
var _86f=this.bindingWindow.UpdateManager;
if(this.getValue()!=_86d){
_86f.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_86d);
}
var _870=_86c.getAttribute("type");
if(this.type!=_870){
_86f.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_870;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_874){
var _875=this.bindingDocument.selection.createRange();
var _876=_875.text=="";
if(_876&&!_874){
_875.text="\t";
}else{
var text="";
var _878=_875.text.length;
while((_875.moveStart("word",-1)&&_875.text.charAt(1)!="\n")){
}
_875.moveStart("character",1);
var _879=0;
var i=0,line,_87c=_875.text.split("\n");
while((line=_87c[i++])!=null){
if(_874){
line=line.replace(/^(\s)/mg,"");
_879++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_87c[i+1]?"\n":"");
}
_875.text=text;
_875.moveStart("character",-_878);
if(_874){
_875.moveStart("character",2*_87c.length-2);
}
_875.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _87d=this.bindingDocument.selection.createRange();
var _87e=_87d.duplicate();
while((_87e.moveStart("word",-1)&&_87e.text.indexOf("\n")==-1)){
}
_87e.moveStart("character",1);
_87d.text="\n"+_87e.text.match(/^(\s)*/)[0]+"!";
_87d.moveStart("character",-1);
_87d.select();
_87d.text="";
_87d.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_87f){
var _880;
var _881;
var oss;
var osy;
var i;
var fnd;
var _886=this._getSelectedText();
var el=this.shadowTree.input;
_880=el.scrollLeft;
_881=el.scrollTop;
if(!_886.match(/\n/)){
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
_886=this._getSelectedText();
if(_87f){
ntext=_886.replace(/^(\s)/mg,"");
}else{
ntext=_886.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_886.length);
}
el.scrollLeft=_880;
el.scrollTop=_881;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _888;
var _889;
var oss;
var osy;
var el=this.shadowTree.input;
_888=el.scrollLeft;
_889=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_888;
el.scrollTop=_889;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _890=this.shadowTree.input.value;
var _891=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _890.substr(_891,end-_891);
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
var _893=this.getProperty("isdisabled");
if(this.isDisabled||_893){
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
var _895=this.getProperty("label");
var _896=this.getProperty("value");
var _897=this.getProperty("width");
var _898=this.getProperty("onchange");
var _899=this.getProperty("required")==true;
var _89a=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_895!=null){
this.label=_895;
}
if(!this.value&&_896!=null){
this.value=_896;
}
if(!this.width&&_897){
this.width=_897;
}
if(_899){
this.isRequired=true;
}
if(_89a){
this._isLocal=true;
}
if(_898){
this.onValueChange=function(){
Binding.evaluate(_898,this);
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
var _89b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_89b.name=this.getName();
_89b.value=this.getValue();
_89b.type="hidden";
if(this.hasCallBackID()){
_89b.id=this.getCallBackID();
}
this.shadowTree.input=_89b;
this.bindingElement.appendChild(_89b);
};
SelectorBinding.prototype.buildButton=function(){
var _89c=this.BUTTON_IMPLEMENTATION;
var _89d=this.add(_89c.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_89d.imageProfile=this.imageProfile;
}
if(this.width!=null){
_89d.setWidth(this.width);
}
this._buttonBinding=_89d;
this.shadowTree.button=_89d;
_89d.attach();
};
SelectorBinding.prototype.buildPopup=function(){
var _89e;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _89f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_89f.id="selectorpopupset";
_89e=UserInterface.registerBinding(_89f,PopupSetBinding);
this.bindingDocument.body.appendChild(_89e.bindingElement);
}else{
_89e=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_89e=top.app.bindingMap.selectorpopupset;
}
var doc=_89e.bindingDocument;
var _8a1=_89e.add(PopupBinding.newInstance(doc));
var _8a2=_8a1.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_8a1;
this._menuBodyBinding=_8a2;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_8a1.attachClassName("selectorpopup");
_8a1.addActionListener(PopupBinding.ACTION_SHOW,this);
_8a1.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_8a1.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_8a1);
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
var _8a5=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8a5).each(function(_8a6){
var _8a7=_8a6.getAttribute("label");
var _8a8=_8a6.getAttribute("value");
var _8a9=_8a6.getAttribute("selected");
var _8aa=_8a6.getAttribute("image");
var _8ab=_8a6.getAttribute("image-hover");
var _8ac=_8a6.getAttribute("image-active");
var _8ad=_8a6.getAttribute("image-disabled");
var _8ae=null;
if(_8aa||_8ab||_8ac||_8ad){
_8ae=new ImageProfile({image:_8aa,imageHover:_8ab,imageActive:_8ac,imageDisabled:_8ad});
}
list.add(new SelectorBindingSelection(_8a7?_8a7:null,_8a8?_8a8:null,_8a9&&_8a9=="true",_8ae));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _8b0=null;
while(list.hasNext()){
var _8b1=list.getNext();
var item=this.addSelection(_8b1);
if(_8b1.isSelected){
this.select(item,true);
}
if(!_8b0){
_8b0=item;
}
}
if(!this._selectedItemBinding){
this.select(_8b0,true);
}
}else{
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8b3,_8b4){
var _8b5=this.MENUITEM_IMPLEMENTATION;
var _8b6=this._menuBodyBinding;
var _8b7=_8b6.bindingDocument;
var _8b8=_8b5.newInstance(_8b7);
_8b8.imageProfile=_8b3.imageProfile;
_8b8.setLabel(_8b3.label);
if(_8b3.tooltip!=null){
_8b8.setToolTip(_8b3.tooltip);
}
_8b8.selectionValue=_8b3.value;
_8b3.menuItemBinding=_8b8;
if(_8b4){
_8b6.addFirst(_8b8);
this.selections.addFirst(_8b3);
}else{
_8b6.add(_8b8);
this.selections.add(_8b3);
}
this._isUpToDate=false;
return _8b8;
};
SelectorBinding.prototype.addSelectionFirst=function(_8b9){
return this.addSelection(_8b9,true);
};
SelectorBinding.prototype.clear=function(_8ba){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8ba&&this.defaultSelection!=null){
var _8bb=this.addSelection(this.defaultSelection);
this.select(_8bb,true);
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
SelectorBinding.prototype.setDisabled=function(_8bc){
if(this.isAttached==true){
var _8bd=this._buttonBinding;
_8bd.setDisabled(_8bc);
}
if(_8bc){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8be){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8be);
}
};
SelectorBinding.prototype.handleAction=function(_8bf){
SelectorBinding.superclass.handleAction.call(this,_8bf);
switch(_8bf.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8bf.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8bf.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8bf.target);
_8bf.consume();
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
_8bf.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8c1){
this.select(_8c1);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8c2=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8c3=this._popupBinding.bindingElement;
_8c3.style.minWidth=_8c2;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8c5=Client.isExplorer?e.keyCode:e.which;
if(_8c5==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8c5=Client.isExplorer?e.keyCode:e.which;
if(_8c5>=32){
this._buttonBinding.check();
var _8c6=String.fromCharCode(_8c5);
this._pushSearchSelection(_8c6);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8c7){
this._searchString+=_8c7.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8c8){
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
var _8c9=this._menuBodyBinding;
if(_8c9!=null){
var _8ca=this.MENUITEM_IMPLEMENTATION;
var _8cb=_8c9.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8cd=list.getNext();
if(_8cd.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8cd);
}
}
}
this._attachSelections();
var _8ce=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8cf=_8c9.getDescendantBindingsByType(_8ca);
if(_8cf.hasEntries()){
while(_8cf.hasNext()){
var _8d0=_8cf.getNext();
var _8d1=_8d0.labelBinding;
if(_8d1!=null&&_8d1.shadowTree!=null&&_8d1.shadowTree.labelText!=null){
_8d1.shadowTree.labelText.innerHTML=_8d1.shadowTree.labelText.innerHTML.replace(_8ce,"<b>$&</b>");
}
}
_8cf.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8d1=LabelBinding.newInstance(_8cb);
_8d1.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8c9.add(_8d1);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8cd=list.getNext();
var item=this.addSelection(_8cd);
if(this._selectionValue==_8cd.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8d3,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8d3,arg);
switch(_8d3){
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
SelectorBinding.prototype.select=function(_8d6,_8d7){
var _8d8=false;
if(_8d6!=this._selectedItemBinding){
this._selectedItemBinding=_8d6;
_8d8=true;
var _8d9=this._buttonBinding;
this._selectionValue=_8d6.selectionValue;
this._selectionLabel=_8d6.getLabel();
_8d9.setLabel(_8d6.getLabel());
if(_8d6.imageProfile!=null){
_8d9.imageProfile=_8d6.imageProfile;
}
if(_8d9.imageProfile!=null){
_8d9.setImage(this.isDisabled==true?_8d9.imageProfile.getDisabledImage():_8d9.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8d7){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8d7)){
this.validate();
}
}
return _8d8;
};
SelectorBinding.prototype._relate=function(){
var _8da=this.getProperty("relate");
if(_8da){
var _8db=this.bindingDocument.getElementById(_8da);
if(_8db){
var _8dc=UserInterface.getBinding(_8db);
if(_8dc){
if(this.isChecked){
_8dc.show();
}else{
_8dc.hide();
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
SelectorBinding.prototype.selectByValue=function(_8dd,_8de){
var _8df=false;
var _8e0=this._menuBodyBinding;
var _8e1=_8e0.getDescendantElementsByLocalName("menuitem");
while(_8e1.hasNext()){
var _8e2=UserInterface.getBinding(_8e1.getNext());
if(_8e2.selectionValue==_8dd){
_8df=this.select(_8e2,_8de);
break;
}
}
return _8df;
};
SelectorBinding.prototype.getValue=function(){
var _8e3=this._selectionValue;
if(_8e3!=null){
_8e3=String(_8e3);
}
return _8e3;
};
SelectorBinding.prototype.setValue=function(_8e4){
this.selectByValue(String(_8e4),true);
};
SelectorBinding.prototype.getResult=function(){
var _8e5=this._selectionValue;
if(_8e5=="null"){
_8e5=null;
}
if(_8e5){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8e5=Number(_8e5);
break;
}
}
return _8e5;
};
SelectorBinding.prototype.setResult=function(_8e6){
this.selectByValue(_8e6,true);
};
SelectorBinding.prototype.validate=function(){
var _8e7=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8e8=this.getValue();
if(_8e8==this.defaultSelection.value){
_8e7=false;
}
if(_8e7!=this._isValid){
if(_8e7){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8e7;
}
return _8e7;
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
var _8e9=this._popupBinding;
if(!this._isUpToDate){
_8e9.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8ea,_8eb){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8ea));
return true;
};
SelectorBinding.newInstance=function(_8ec){
var _8ed=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8ec);
return UserInterface.registerBinding(_8ed,SelectorBinding);
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
var _8f0=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8f0){
this.onValueChange=function(){
Binding.evaluate(_8f0,this);
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
SimpleSelectorBinding.prototype.focus=function(_8f3){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8f3){
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
SimpleSelectorBinding.prototype._hack=function(_8f4){
if(Client.isExplorer){
this._select.style.width=_8f4?"auto":this._cachewidth+"px";
if(_8f4){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8f5=true;
if(this.isRequired){
if(this.getValue()==null){
_8f5=false;
}
}
if(_8f5!=this._isValid){
if(_8f5){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8f6=this._select;
var _8f7=_8f6.options[_8f6.selectedIndex];
var text=DOMUtil.getTextContent(_8f7);
_8f6.blur();
_8f6.style.color="#A40000";
_8f6.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8f7,DataBinding.warnings["required"]);
}
_8f6.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8f7,text);
}
};
}
this._isValid=_8f5;
}
return _8f5;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8f9=null;
var _8fa=this._select;
var _8fb=_8fa.options[_8fa.selectedIndex];
var _8fc=true;
if(Client.isExplorer){
var html=_8fb.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8fc=false;
}
}
if(_8fc){
_8f9=_8fb.getAttribute("value");
}
return _8f9;
};
SimpleSelectorBinding.prototype.setValue=function(_8fe){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8ff){
this.setValue(_8ff);
};
SimpleSelectorBinding.newInstance=function(_900){
var _901=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_900);
return UserInterface.registerBinding(_901,SimpleSelectorBinding);
};
function SelectorBindingSelection(_902,_903,_904,_905,_906){
this._init(_902,_903,_904,_905,_906);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_907,_908,_909,_90a,_90b){
if(_907!=null){
this.label=String(_907);
}
if(_908!=null){
this.value=String(_908);
}
if(_90a!=null){
this.imageProfile=_90a;
}
if(_90b!=null){
this.tooltip=_90b;
}
this.isSelected=_909?true:false;
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
var _90c=this.getProperty("image");
if(_90c){
this.setImage(_90c);
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
var _90f=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_90f.popupBindingTargetElement=this.shadowTree.input;
_90f.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_90f.attach();
var self=this;
_90f.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_90f;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _912=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_912).each(function(_913){
if(_913.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _914=_913.getAttribute("value");
var _915=_913.getAttribute("selected");
var _916=_913.getAttribute("tooltip");
list.add({value:_914?_914:null,toolTip:_916?_916:null,isSelected:(_915&&_915=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _918=this._menuBodyBinding;
var _919=_918.bindingDocument;
while(_918.bindingElement.hasChildNodes()){
var node=_918.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_918.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _91b=this.getProperty("emptyentrylabel");
if(_91b){
var _91c=MenuItemBinding.newInstance(_919);
_91c.setLabel(_91b);
_91c.selectionValue="";
_918.add(_91c);
}
while(list.hasNext()){
var _91d=list.getNext();
var _91c=MenuItemBinding.newInstance(_919);
_91c.setLabel(_91d.label?_91d.label:_91d.value);
_91c.selectionValue=_91d.value;
if(_91d.image){
_91c.setImage(_91d.image);
}
if(_91d.toolTip){
_91c.setToolTip(_91d.toolTip);
}
if(_91d.isSelected){
this.select(_91c,true);
}
_918.add(_91c);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_91e){
this.select(_91e);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_91f,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_91f,arg);
switch(_91f){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_91f,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_921){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_921);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_922){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_922);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _923=this.bindingElement.offsetWidth+"px";
var _924=this._popupBinding.bindingElement;
_924.style.minWidth=_923;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _925=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _926=this.getValue();
var _927=null;
_925.each(function(item){
if(item.getLabel()==_926){
_927=item;
}
});
if(_927){
_927.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_92a){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_92a){
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
DataInputSelectorBinding.prototype.setValue=function(_92b){
var _92c=this.isReadOnly;
var _92d=null;
if(_92b!=null&&_92b!=""){
var _92e=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_92e.hasNext()){
var item=_92e.getNext();
if(item.selectionValue==_92b){
_92d=item.getLabel();
break;
}
}
}
if(_92d!=null){
this.value=_92b;
this.shadowTree.input.value=_92d;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_92b);
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
var _931="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_931);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_931);
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
var _933=ToolBarButtonBinding.newInstance(this.bindingDocument);
_933.setImage("${icon:popup}");
this.addFirst(_933);
_933.attach();
var self=this;
_933.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _935=self.getProperty("handle");
var _936=ViewDefinition.clone(_935,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_936 instanceof DialogViewDefinition){
_936.handler={handleDialogResponse:function(_937,_938){
self._isButtonClicked=false;
if(_937==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _939=_938.getFirst();
self.setValue(_939);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_936.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_936);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_933.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_933;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _93b=this._dialogButtonBinding;
if(_93b!=null){
_93b.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _93d=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_93d=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _93d;
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
var _940=ToolBarButtonBinding.newInstance(this.bindingDocument);
_940.setImage("${icon:editor-sourceview}");
_940.bindingElement.style.left="-24px";
_940.bindingElement.style.width="24px";
this.addFirst(_940);
_940.attach();
_940.hide();
var self=this;
_940.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_940;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_941){
UrlInputDialogBinding.superclass.setValue.call(this,_941);
if(this.isAttached){
this.compositeUrl=new Uri(_941);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _942=TreeService.GetCompositeUrlLabel(_941);
if(_942!=_941){
this.setLabel(_942);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_943){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_943){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_943;
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
var _944=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _945=this.getProperty("image");
if(_945!=null){
_944.setImage(_945);
}else{
_944.setImage("${icon:popup}");
}
this.addFirst(_944);
_944.attach();
var self=this;
_944.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_944;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _947=this._dialogButtonBinding;
if(_947!=null){
_947.oncommand();
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
var _948=this.getProperty("required")==true;
if(_948){
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
var _949=this.getProperty("label");
var _94a=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_949!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_949+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_949);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_94a!=null){
this._buttonBinding.setToolTip(_94a);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var _94b="http://www.w3.org/2000/svg";
this.shadowTree.indicatorimage=this.bindingDocument.createElementNS(_94b,"svg");
this.shadowTree.indicatorimage.setAttribute("viewBox","0 0 24 24");
this.shadowTree.indicatorimage.setAttribute("class","dialogindicatorimage");
var g=KickStart.sprites.querySelector("#popup");
if(g){
var _94d=g.getAttribute("viewBox"),_94e=document.createDocumentFragment(),_94f=g.cloneNode(true);
if(_94d){
this.shadowTree.indicatorimage.setAttribute("viewBox",_94d);
}
_94e.appendChild(_94f);
this.shadowTree.indicatorimage.appendChild(_94e);
}
this._buttonBinding.bindingElement.appendChild(this.shadowTree.indicatorimage);
};
DataDialogBinding.prototype.handleAction=function(_950){
DataDialogBinding.superclass.handleAction.call(this,_950);
var _951=_950.target;
var self=this;
switch(_950.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_953,_954){
if(_953==Dialog.RESPONSE_ACCEPT){
if(_954 instanceof DataBindingMap){
self._map=_954;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_951==this._buttonBinding){
_950.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_955,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_955,arg);
switch(_955){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _958=this.getProperty("handle");
var url=this.getURL();
var _95a=null;
if(_958!=null||def!=null){
if(def!=null){
_95a=def;
}else{
_95a=ViewDefinitions[_958];
}
if(_95a instanceof DialogViewDefinition){
_95a.handler=this._handler;
if(this._map!=null){
_95a.argument=this._map;
}
StageBinding.presentViewDefinition(_95a);
}
}else{
if(url!=null){
_95a=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_95a!=null){
this._dialogViewHandle=_95a.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_95b){
this.setProperty("label",_95b);
if(this.isAttached){
this._buttonBinding.setLabel(_95b+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_95c){
this.setProperty("image",_95c);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_95c);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_95d){
this.setProperty("tooltip",_95d);
if(this.isAttached){
this._buttonBinding.setToolTip(_95d);
}
};
DataDialogBinding.prototype.setHandle=function(_95e){
this.setProperty("handle",_95e);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_960){
this._handler=_960;
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
var _961=true;
if(this.isRequired==true){
var _962=this.getValue();
if(_962==null||_962==""){
_961=false;
}
if(_961!=this._isValid){
if(_961){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_961;
}
return _961;
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
DataDialogBinding.newInstance=function(_964){
var _965=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_964);
return UserInterface.registerBinding(_965,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_967,_968){
if(_967==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_968);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_969){
_969=new String(_969);
this.dirty();
this.setValue(encodeURIComponent(_969));
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
var _96d=this.getValue();
if(_96d==null){
_96d="";
}
this.shadowTree.dotnetinput.value=_96d;
};
PostBackDataDialogBinding.prototype.setValue=function(_96e){
this.setProperty("value",_96e);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_96f){
};
PostBackDataDialogBinding.newInstance=function(_970){
var _971=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_970);
return UserInterface.registerBinding(_971,PostBackDataDialogBinding);
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
var _972=this.getProperty("dialoglabel");
var _973=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _975=this.getProperty("handle");
var _976=this.getProperty("selectedtoken");
if(_975!=null){
var def=ViewDefinition.clone(_975,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_972!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_972;
}
if(_973!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_973;
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
if(_976!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_976;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_978){
var _979=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_978);
return UserInterface.registerBinding(_979,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_97b){
self._datathing.setValue(_97b);
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
var _97e=self.getValue();
if(_97e==""||_97e==null){
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
var _97f=this.getProperty("value");
var _980=this.getProperty("selectorlabel");
if(_980==null){
_980=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_97f==null));
list.add(new SelectorBindingSelection(_980+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_97f!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _97f=this.getValue();
if(_97f==""||_97f==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_982){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_982);
switch(_982.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_982.target==this._datathing){
var _983=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_983){
self._selector.setLabel(_983);
}
},500);
_982.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_985){
this.setProperty("label",_985);
if(this._selector!=null){
this._selector.setLabel(_985);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_986){
this._datathing.setValue(_986);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_988,_989){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_988,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_98a){
this._buttonBinding.setLabel(_98a);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_98b){
this._buttonBinding.setToolTip(_98b);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_98c){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_98c);
switch(_98c.type){
case MenuItemBinding.ACTION_COMMAND:
var _98d=_98c.target;
var _98e=this.master;
if(_98d.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_98d.getLabel());
setTimeout(function(){
_98e.action();
},0);
}else{
if(_98e.getValue()){
_98e.dirty();
}
_98e.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_98f){
var _990=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_98f);
return UserInterface.registerBinding(_990,NullPostBackDataDialogSelectorBinding);
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
var _991=this._dataDialogBinding;
if(_991!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_991.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _992=this.getProperty("editable");
var _993=this.getProperty("selectable");
var _994=this.getProperty("display");
if(_992!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_993){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_994){
this._display=_994;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _995=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_995.selections=this.selections;
this.add(_995);
_995.attach();
this._dataDialogBinding=_995;
this.shadowTree.datadialog=_995;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _997=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _998=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_997=_998.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_997=_998.isSelected!=true;
break;
}
if(_997){
this.shadowTree.box.appendChild(this._getElementForSelection(_998));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_99a){
var box=this.shadowTree.box;
var _99c=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _99d=list.getNext();
if(_99a){
_99d.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_99c=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_99c=_99d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_99c=_99d.isSelected!=true;
break;
}
}
if(_99c){
var _99e=this._getElementForSelection(_99d);
box.insertBefore(_99e,box.firstChild);
CSSUtil.attachClassName(_99e,"selected");
this._selectionMap.set(_99d.value,_99e);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_99f){
var _9a0=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_9a0.appendChild(this.bindingDocument.createTextNode(_99f.label));
_9a0.setAttribute("label",_99f.label);
_9a0.setAttribute("value",_99f.value);
return _9a0;
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
var _9a2=DOMEvents.getTarget(e);
var _9a3=DOMUtil.getLocalName(_9a2);
if(_9a3=="div"){
this._handleMouseDown(_9a2);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_9a4){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _9a5=this._getElements();
var _9a6=_9a4.getAttribute("value");
var _9a7=this._lastSelectedElement.getAttribute("value");
var _9a8=false;
while(_9a5.hasNext()){
var el=_9a5.getNext();
switch(el.getAttribute("value")){
case _9a6:
case _9a7:
_9a8=!_9a8;
break;
}
if(_9a8){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_9a4);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_9a4)){
this._unhilite(_9a4);
}else{
this._hilite(_9a4);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_9a4){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_9a4;
};
MultiSelectorBinding.prototype._hilite=function(_9ac){
var _9ad=_9ac.getAttribute("value");
if(!this._selectionMap.has(_9ad)){
CSSUtil.attachClassName(_9ac,"selected");
this._selectionMap.set(_9ad,_9ac);
}
};
MultiSelectorBinding.prototype._unhilite=function(_9ae){
var _9af=_9ae.getAttribute("value");
if(this._selectionMap.has(_9af)){
CSSUtil.detachClassName(_9ae,"selected");
this._selectionMap.del(_9af);
}
};
MultiSelectorBinding.prototype._isHilited=function(_9b0){
return CSSUtil.hasClassName(_9b0,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_9b1){
MultiSelectorBinding.superclass.handleAction.call(this,_9b1);
var _9b2=_9b1.target;
switch(_9b1.type){
case DataDialogBinding.ACTION_COMMAND:
if(_9b2==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_9b1.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_9b2.result);
this.dirty();
_9b2.result=null;
_9b1.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _9b3=null;
if(this.isSelectable){
_9b3=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9b5){
if(self._isHilited(_9b5)){
_9b5.parentNode.removeChild(_9b5);
_9b3.add(new SelectorBindingSelection(_9b5.getAttribute("label"),_9b5.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _9b3;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9b7=this._getElements();
if(!isUp){
_9b7.reverse();
}
var _9b8=true;
while(_9b8&&_9b7.hasNext()){
var _9b9=_9b7.getNext();
if(this._isHilited(_9b9)){
switch(isUp){
case true:
if(_9b9.previousSibling){
_9b9.parentNode.insertBefore(_9b9,_9b9.previousSibling);
}else{
_9b8=false;
}
break;
case false:
if(_9b9.nextSibling){
_9b9.parentNode.insertBefore(_9b9,_9b9.nextSibling.nextSibling);
}else{
_9b8=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9ba=new List();
var _9bb=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9bd){
var _9be=new SelectorBindingSelection(_9bd.getAttribute("label"),_9bd.getAttribute("value"),_9bb);
_9be.isHighlighted=self._isHilited(_9bd);
_9ba.add(_9be);
});
return _9ba;
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
var _9bf=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9bf.hasEntries()){
_9bf.each(function(_9c0){
_9c0.parentNode.removeChild(_9c0);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9c1=this.selections.getNext();
if(_9c1.isSelected){
var _9c2=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9c2.name=this._name;
_9c2.value=_9c1.value;
this.bindingElement.appendChild(_9c2);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9c3){
alert(_9c3);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9c4){
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
var _9c5={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9c6=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9c6.handler=this._handler;
_9c6.argument=_9c5;
StageBinding.presentViewDefinition(_9c6);
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
var _9c7={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9c9={handleDialogResponse:function(_9ca,_9cb){
if(_9ca==Dialog.RESPONSE_ACCEPT){
self.result=_9cb;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9cc=ViewDefinitions[this._dialogViewHandle];
_9cc.handler=_9c9;
_9cc.argument=_9c7;
StageBinding.presentViewDefinition(_9cc);
};
MultiSelectorDataDialogBinding.newInstance=function(_9cd){
var _9ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9cd);
return UserInterface.registerBinding(_9ce,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9cf){
var id=_9cf.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9d1=_9cf.bindingDocument.getElementById(id);
if(_9d1!=null){
var _9d2=UserInterface.getBinding(_9d1);
_9d2.setResult(true);
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
var _9d4=this.bindingDocument.getElementById(id);
if(_9d4!=null){
var _9d5=UserInterface.getBinding(_9d4);
if(_9d5&&!_9d5.isAttached){
_9d5.isLazy=true;
}else{
_9d4.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9d6){
this._isLazy=_9d6;
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
var _9d8=this.getProperty("stateprovider");
var _9d9=this.getProperty("handle");
if(_9d8!=null&&_9d9!=null){
url=url.replace("${stateprovider}",_9d8).replace("${handle}",_9d9);
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
EditorDataBinding.prototype._onPageInitialize=function(_9da){
EditorDataBinding.superclass._onPageInitialize.call(this,_9da);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9db){
EditorDataBinding.superclass.handleAction.call(this,_9db);
switch(_9db.type){
case Binding.ACTION_DIRTY:
if(_9db.target!=this){
if(!this.isDirty){
this.dirty();
}
_9db.consume();
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
EditorDataBinding.prototype.setValue=function(_9dc){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9dd){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9de){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9de);
if(this.hasBasic===false){
var _9df=this.getContentWindow().bindingMap.basicgroup;
if(_9df){
_9df.hide();
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
var _9e4=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9e4=fake.getValue()!="";
}
if(!_9e4&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9e4&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9e4;
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
var _9e8=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9e8!=null){
_9e8.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9e9){
_9e9=_9e9!=null?_9e9:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9e9;
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
var _9ea=this.getProperty("label");
if(_9ea){
this.setLabel(_9ea);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9eb){
this.setProperty("label",_9eb);
if(this.shadowTree.labelBinding==null){
var _9ec=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9ec.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9ec.bindingElement,this.bindingElement.firstChild);
_9ec.attach();
this.shadowTree.labelBinding=_9ec;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9eb));
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
var _9ee=this.getProperty("relation");
if(_9ee!=null){
this.bindingRelation=_9ee;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9ef,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9ef,arg);
switch(_9ef){
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
FieldBinding.newInstance=function(_9f1){
var _9f2=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9f1);
return UserInterface.registerBinding(_9f2,FieldBinding);
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
var _9f3=this.getDescendantBindingByLocalName("fieldgroup");
if(_9f3!=null){
_9f3.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9f4=true;
var _9f5=this.getDescendantBindingsByLocalName("*");
while(_9f5.hasNext()){
var _9f6=_9f5.getNext();
if(Interfaces.isImplemented(IData,_9f6)){
var _9f7=_9f6.validate();
if(_9f4&&!_9f7){
_9f4=false;
}
}
}
return _9f4;
};
FieldsBinding.prototype.handleAction=function(_9f8){
FieldsBinding.superclass.handleAction.call(this,_9f8);
var _9f9=_9f8.target;
if(_9f9!=this){
switch(_9f8.type){
case Binding.ACTION_INVALID:
var _9fa=DataBinding.getAssociatedLabel(_9f9);
if(_9fa){
this._invalidFieldLabels.set(_9f9.key,_9fa);
}
if(_9f9.error){
if(!_9f9.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9f9.error},_9f9);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9f8.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9f9.key)){
this._invalidFieldLabels.del(_9f9.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9f8.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9fb=null;
if(this._invalidFieldLabels.hasEntries()){
_9fb=this._invalidFieldLabels.toList();
}
return _9fb;
};
FieldsBinding.newInstance=function(_9fc){
var _9fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9fc);
return UserInterface.registerBinding(_9fd,FieldsBinding);
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
var _9fe=this.getProperty("image");
if(_9fe){
this.setImage(_9fe);
}
var _9ff=this.getProperty("tooltip");
if(_9ff){
this.setToolTip(_9ff);
}
var _a00=this.getProperty("label");
if(_a00){
this.setLabel(_a00);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _a02=this.getAncestorBindingByLocalName("field");
if(_a02){
var _a03=true;
_a02.getDescendantBindingsByLocalName("*").each(function(_a04){
if(Interfaces.isImplemented(IData,_a04)){
_a04.focus();
_a03=false;
}
return _a03;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_a05){
this.setProperty("label",_a05);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_a05);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _a06=this.getProperty("label");
if(!_a06){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_a06=node.data;
}
}
return _a06;
};
FieldDescBinding.prototype.setImage=function(_a08){
this.setProperty("image",_a08);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_a09){
this.setProperty("tooltip",_a09);
if(this.isAttached){
this.bindingElement.title=_a09;
}
};
FieldDescBinding.newInstance=function(_a0a){
var _a0b=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_a0a);
return UserInterface.registerBinding(_a0b,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_a0c){
var _a0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_a0c);
return UserInterface.registerBinding(_a0d,FieldDataBinding);
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
var _a0e=this._fieldHelpPopupBinding;
if(_a0e){
_a0e.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _a0f=app.bindingMap.fieldhelpopupset;
var doc=_a0f.bindingDocument;
var _a11=_a0f.add(PopupBinding.newInstance(doc));
var _a12=_a11.add(PopupBodyBinding.newInstance(doc));
_a11.position=PopupBinding.POSITION_RIGHT;
_a11.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_a12.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _a13=this.getProperty("label");
if(_a13){
_a12.bindingElement.innerHTML=Resolver.resolve(_a13);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_a11;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a14=this.getAncestorBindingByLocalName("field");
if(_a14){
_a14.attachClassName("fieldhelp");
var _a15=ClickButtonBinding.newInstance(this.bindingDocument);
_a15.attachClassName("fieldhelp");
_a15.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a15);
_a15.attach();
var self=this;
_a15.oncommand=function(){
self.attachPopupBinding();
};
_a15.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a15;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a17=this._fieldHelpPopupBinding;
if(_a17&&!_a17.isAttached){
_a17.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a19){
RadioDataGroupBinding.superclass.handleAction.call(this,_a19);
switch(_a19.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a1b,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a1b,arg);
switch(_a1b){
case BroadcastMessages.KEY_ARROW:
var _a1d=null;
var next=null;
var _a1f=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a1f=this.getChildBindingsByLocalName("radio");
while(!_a1d&&_a1f.hasNext()){
var _a20=_a1f.getNext();
if(_a20.getProperty("ischecked")){
_a1d=_a20;
}
}
break;
}
if(_a1d){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a1f.getFollowing(_a1d);
while(next!=null&&next.isDisabled){
next=_a1f.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a1f.getPreceding(_a1d);
while(next!=null&&next.isDisabled){
next=_a1f.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a21){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a21){
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
var _a22=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a22.type="hidden";
_a22.name=this._name;
this.bindingElement.appendChild(_a22);
this.shadowTree.input=_a22;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a23=null;
var _a24=this.getChildBindingsByLocalName("radio");
while(!_a23&&_a24.hasNext()){
var _a25=_a24.getNext();
if(_a25.isChecked){
_a23=_a25.getProperty("value");
}
}
return _a23;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a26){
};
RadioDataGroupBinding.prototype.setResult=function(_a27){
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
var _a28=this.getProperty("relate");
var _a29=this.getProperty("oncommand");
var _a2a=this.getProperty("isdisabled");
if(_a28){
this.bindingRelate=_a28;
this.relate();
}
if(_a29){
this.oncommand=function(){
Binding.evaluate(_a29,this);
};
}
if(_a2a==true){
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
var _a2c=this.getCallBackID();
this._buttonBinding.check=function(_a2d){
RadioButtonBinding.prototype.check.call(this,_a2d);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a2e){
RadioButtonBinding.prototype.uncheck.call(this,_a2e);
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
RadioDataBinding.prototype.setChecked=function(_a2f,_a30){
this._buttonBinding.setChecked(_a2f,_a30);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a2f);
};
RadioDataBinding.prototype.check=function(_a31){
this.setChecked(true,_a31);
};
RadioDataBinding.prototype.uncheck=function(_a32){
this.setChecked(false,_a32);
};
RadioDataBinding.prototype.setDisabled=function(_a33){
if(_a33!=this.isDisabled){
this.isDisabled=_a33;
this._buttonBinding.setDisabled(_a33);
if(_a33){
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
var _a35=DOMEvents.getTarget(e);
switch(_a35){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a36=this.getProperty("label");
if(_a36){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a36)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a37){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a37;
}
this.setProperty("label",_a37);
};
RadioDataBinding.prototype.handleElement=function(_a38){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a39){
var _a3a=_a39.getAttribute("ischecked")==="true";
if(this.isChecked!=_a3a){
this.setChecked(_a3a,true);
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
var _a3c=DOMEvents.getTarget(e);
switch(_a3c){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a3d,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a3d,arg);
switch(_a3d){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a40){
_a40.consume();
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
var _a42=this.getCallBackID();
this._buttonBinding.check=function(_a43){
ButtonBinding.prototype.check.call(this,_a43);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a43){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a44){
ButtonBinding.prototype.uncheck.call(this,_a44);
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
if(_a42!=null){
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
var _a45=true;
var _a46=this.bindingElement.parentNode;
if(_a46){
var _a47=UserInterface.getBinding(_a46);
if(_a47&&_a47 instanceof CheckBoxGroupBinding){
if(_a47.isRequired){
if(_a47.isValid){
_a45=_a47.validate();
}else{
_a45=false;
}
}
}
}
return _a45;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a48=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a48.type="hidden";
_a48.name=this._name;
_a48.style.display="none";
this.bindingElement.appendChild(_a48);
this.shadowTree.input=_a48;
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
var _a49=null;
var _a4a=this.getProperty("value");
if(this.isChecked){
_a49=_a4a?_a4a:"on";
}
return _a49;
};
CheckBoxBinding.prototype.setValue=function(_a4b){
if(_a4b==this.getValue()||_a4b=="on"){
this.check(true);
}else{
if(_a4b!="on"){
this.setPropety("value",_a4b);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a4c=false;
if(this.isChecked){
_a4c=this._result!=null?this._result:true;
}
return _a4c;
};
CheckBoxBinding.prototype.setResult=function(_a4d){
if(typeof _a4d=="boolean"){
this.setChecked(_a4d,true);
}else{
this._result=_a4d;
}
};
CheckBoxBinding.newInstance=function(_a4e){
var _a4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a4e);
return UserInterface.registerBinding(_a4f,CheckBoxBinding);
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
var _a50=true;
if(this.isRequired){
var _a51=this.getDescendantBindingsByLocalName("checkbox");
if(_a51.hasEntries()){
_a50=false;
while(_a51.hasNext()&&!_a50){
if(_a51.getNext().isChecked){
_a50=true;
}
}
}
if(_a50==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a50;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a52){
if(_a52){
if(!this._labelBinding){
var _a53=LabelBinding.newInstance(this.bindingDocument);
_a53.attachClassName("invalid");
_a53.setImage("${icon:error}");
_a53.setLabel("Selection required");
this._labelBinding=this.addFirst(_a53);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a54){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a54);
switch(_a54.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a55){
var _a56=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a55);
return UserInterface.registerBinding(_a56,CheckBoxGroupBinding);
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
var _a57=DialogControlBinding.newInstance(this.bindingDocument);
_a57.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a57);
this._controlGroupBinding.attachRecursive();
var _a58=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a58);
var _a59=this.getLabel();
if(_a59!=null){
this.setLabel(_a59);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a5a=this._snapTargetBinding;
if(Binding.exists(_a5a)==true){
_a5a.removeActionListener(Binding.ACTION_BLURRED,this);
_a5a.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a5b){
if(Interfaces.isImplemented(IData,_a5b)){
this._snapTargetBinding=_a5b;
var _a5c=_a5b.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a5c&&_a5c.isConsumed){
this._environmentBinding=_a5c.listener;
}
if(this._environmentBinding){
_a5b.addActionListener(Binding.ACTION_BLURRED,this);
_a5b.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a5b)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a5b.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a5e=this._snapTargetBinding;
var _a5f=this._environmentBinding;
var root=UserInterface.getBinding(_a5e.bindingDocument.body);
if(Binding.exists(_a5e)&&Binding.exists(_a5f)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a5e.isAttached&&_a5f.isAttached){
var _a61=_a5e.boxObject.getUniversalPosition();
var _a62=_a5f.boxObject.getUniversalPosition();
_a62.y+=_a5f.bindingElement.scrollTop;
_a62.x+=_a5f.bindingElement.scrollLeft;
var tDim=_a5e.boxObject.getDimension();
var eDim=_a5f.boxObject.getDimension();
var _a65=false;
if(_a61.y+tDim.h<_a62.y){
_a65=true;
}else{
if(_a61.x+tDim.w<_a62.x){
_a65=true;
}else{
if(_a61.y>_a62.y+eDim.h){
_a65=true;
}else{
if(_a61.x>_a62.x+eDim.w){
_a65=true;
}
}
}
}
if(!_a65){
this._setComputedPosition(_a61,_a62,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a66,_a67,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a6c=_a66;
var _a6d=false;
if(_a66.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a6d=true;
}else{
if(_a66.x+tDim.w>=_a67.x+eDim.w){
_a6d=true;
}
}
if(_a6d){
_a6c.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a6c.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a6c.y-=(bDim.h);
_a6c.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a6c);
};
BalloonBinding.prototype.handleBroadcast=function(_a6e,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a6e,arg);
switch(_a6e){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a70){
var _a71=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a70){
_a71=true;
}
}
return _a71;
};
BalloonBinding.prototype._setPosition=function(_a73){
var _a74=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a74=true;
}
}
if(!_a74){
this.bindingElement.style.left=_a73.x+"px";
this.bindingElement.style.top=_a73.y+"px";
this._point=_a73;
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
BalloonBinding.prototype.handleAction=function(_a76){
BalloonBinding.superclass.handleAction.call(this,_a76);
var _a77=_a76.target;
switch(_a76.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a76.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a77==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a77)){
self.dispose();
}else{
if(_a77.validate()){
var _a79=true;
if(_a76.type==Binding.ACTION_BLURRED){
var root=_a77.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a79=false;
}
}
if(_a79){
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
BalloonBinding.prototype.setLabel=function(_a7c){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a7c);
_a7d.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a7d);
}
this.setProperty("label",_a7c);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a7f){
var _a80=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a7f);
var _a81=UserInterface.registerBinding(_a80,BalloonBinding);
_a81.hide();
return _a81;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a82,_a83){
if(Interfaces.isImplemented(IData,_a83)==true){
var _a84,_a85=_a83.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a85&&_a85.isConsumed){
switch(_a85.listener.constructor){
case StageBinding:
_a84=false;
break;
case StageDialogBinding:
_a84=true;
break;
}
}
var _a86=_a84?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a87=_a86.add(BalloonBinding.newInstance(top.app.document));
_a87.setLabel(_a82.text);
_a87.snapTo(_a83);
_a87.attach();
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
var _a88=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a8b=_a88.getDataBinding(name);
if(_a8b){
ErrorBinding.presentError({text:text},_a8b);
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
FocusBinding.focusElement=function(_a8c){
var _a8d=true;
try{
_a8c.focus();
Application.focused(true);
}
catch(exception){
var _a8e=UserInterface.getBinding(_a8c);
var _a8f=SystemLogger.getLogger("FocusBinding.focusElement");
_a8f.warn("Could not focus "+(_a8e?_a8e.toString():String(_a8c)));
_a8d=false;
}
return _a8d;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a90){
var win=_a90.bindingWindow;
var id=_a90.bindingElement.id;
return {getBinding:function(){
var _a93=null;
try{
if(Binding.exists(_a90)){
_a93=win.bindingMap[id];
}
}
catch(exception){
}
return _a93;
}};
};
FocusBinding.navigateNext=function(_a94){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a94);
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
var _a95=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a95&&_a95.isConsumed){
if(_a95.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a96){
FocusBinding.superclass.handleAction.call(this,_a96);
var _a97=_a96.target;
var _a98=null;
if(this._isFocusManager){
switch(_a96.type){
case FocusBinding.ACTION_ATTACHED:
if(_a97!=this){
this._isUpToDate=false;
}
_a96.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a97!=this){
this._isUpToDate=false;
_a96.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a98=new FocusCrawler();
_a98.mode=FocusCrawler.MODE_BLUR;
_a98.crawl(_a97.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a96.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a97!=this){
_a98=new FocusCrawler();
_a98.mode=FocusCrawler.MODE_FOCUS;
_a98.crawl(_a97.bindingElement);
}
_a96.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a97)){
this.claimFocus();
this._onFocusableFocused(_a97);
}
_a96.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a97)){
this._onFocusableBlurred(_a97);
}
_a96.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a99){
var _a9a=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a9a==null&&list.hasNext()){
var _a9c=list.getNext();
if(this._cachedFocus&&_a9c==this._cachedFocus.getBinding()){
_a9a=_a9c;
}
}
if(_a9a!=null){
if(_a9c.isFocused){
var next=_a99?list.getPreceding(_a9a):list.getFollowing(_a9a);
if(!next){
next=_a99?list.getLast():list.getFirst();
}
next.focus();
}else{
_a9a.focus();
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
var _a9e=new FocusCrawler();
var list=new List();
_a9e.mode=FocusCrawler.MODE_INDEX;
_a9e.crawl(this.bindingElement,list);
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
var _aa1=this._cachedFocus.getBinding();
if(_aa1&&!_aa1.isFocused){
_aa1.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_aa2){
if(_aa2!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_aa2;
_aa2.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_aa2);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_aa3){
_aa3.deleteProperty(FocusBinding.MARKER);
if(_aa3==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_aa5){
this.bindingElement.style.left=_aa5+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_aa6){
this.hiddenTabBindings.add(_aa6);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _aa7=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_aa7.getLabel());
item.setImage(_aa7.getImage());
item.associatedTabBinding=_aa7;
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
TabsButtonBinding.prototype.handleAction=function(_aaa){
TabsButtonBinding.superclass.handleAction.call(this,_aaa);
switch(_aaa.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _aab=this.selectedTabBinding;
if(_aab){
this.containingTabBoxBinding.moveToOrdinalPosition(_aab,0);
this.containingTabBoxBinding.select(_aab);
}
_aaa.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_aac){
var _aad=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_aac);
_aad.setAttribute("type","checkbox");
_aad.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_aad.className="tabbutton";
return UserInterface.registerBinding(_aad,TabsButtonBinding);
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
var _aae=TabBoxBinding.currentActiveInstance;
if(_aae!=null&&Binding.exists(_aae)){
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
var _aaf=this.getTabElements().getLength();
var _ab0=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_aaf!=_ab0){
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
var _ab1=this.getTabPanelElements();
while(_ab1.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_ab1.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _ab2=DOMUtil.getOrdinalPosition(this._tabsElement);
var _ab3=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _ab4=_ab2>_ab3?"tabsbelow":"tabsontop";
this.attachClassName(_ab4);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _ab6=this.getTabPanelElements();
var _ab7=null;
var _ab8=this.getProperty("selectedindex");
if(_ab8!=null){
if(_ab8>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _ab9=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _abb=_ab6.getNext();
this.registerTabBoxPair(tab,_abb);
if(_ab8&&_ab9==_ab8){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_ab7=tab;
}
}
_ab9++;
}
if(!_ab7){
_ab7=tabs.getFirst();
_ab7.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_abc){
var _abd=null;
var _abe=null;
if(this.isEqualSize){
var _abf=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_ac1=this.getTabPanelElements();
_ac1.each(function(_ac2){
max=_ac2.offsetHeight>max?_ac2.offsetHeight:max;
});
_abe=max+_abf.top+_abf.bottom;
if(_abc&&this._tabPanelsElement.style.height!=null){
_abd=this._tabPanelsElement.offsetHeight;
}
if(_abd!=null||_abe>_abd){
this._tabPanelsElement.style.height=_abe+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_ac3){
_ac3._invalidCount=0;
_ac3.addActionListener(Binding.ACTION_INVALID,this);
_ac3.addActionListener(Binding.ACTION_VALID,this);
_ac3.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ac4){
TabBoxBinding.superclass.handleAction.call(this,_ac4);
var _ac5=_ac4.target;
var _ac6=_ac4.listener;
switch(_ac4.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_ac5.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ac4.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_ac5.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_ac6._invalidCount++;
if(_ac6._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_ac6.isSelected){
self._showWarning(_ac6,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_ac6._invalidCount>0){
_ac6._invalidCount--;
if(_ac6._invalidCount==0){
if(_ac6.isSelected){
this._showWarning(_ac6,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_ac6,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ac4._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ac4._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ac9=DOMEvents.getTarget(e);
if(_ac9==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _acb=this.getTabPanelElements();
tabs.each(function(tab,_acd){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ace=_acb.get(_acd);
this.registerTabBoxPair(tab,_ace);
}
},this);
var _acf=this._tabBoxPairs;
for(var key in _acf){
var tab=_acf[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ac9);
switch(_ac9.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ad3=_ac9.parentNode;
if(_ad3==this._tabsElement||_ad3==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ac9==this._tabsElement||_ac9==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ad5){
var _ad6=this.getBindingForArgument(arg);
if(_ad6!=null&&!_ad6.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ad6.select(_ad5);
this.getTabPanelBinding(_ad6).select(_ad5);
var _ad7=this.getProperty("selectedindex");
if(_ad7!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ad6.bindingElement,true));
}
this._selectedTabBinding=_ad6;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ad6.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ad8=this.getTabPanelBinding(_ad6);
this._showBalloon(_ad8,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ada){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ada.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ada};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ade){
var _adf=null;
try{
var key=_ade.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ae1=this._tabBoxPairs[key].tabPanel;
_adf=UserInterface.getBinding(_ae1);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _adf;
};
TabBoxBinding.prototype.getTabBinding=function(_ae2){
var key=_ae2.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ae4=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ae4);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ae5=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ae5);
return _ae5;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ae6,_ae7){
var _ae8=_ae6.bindingElement;
_ae6.setProperty("selected",true);
var _ae9=this.summonTabPanelBinding();
var _aea=_ae9.bindingElement;
if(_ae7){
_aea.appendChild(_ae7 instanceof Binding?_ae7.bindingElement:_ae7);
}
this.registerTabBoxPair(_ae8,_aea);
UserInterface.getBinding(this._tabsElement).add(_ae6);
this._tabPanelsElement.appendChild(_aea);
_ae6.attach();
UserInterface.getBinding(_aea).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ae6;
};
TabBoxBinding.prototype.importTabBinding=function(_aeb){
var that=_aeb.containingTabBoxBinding;
var _aed=that.getTabPanelBinding(_aeb);
var _aee=_aed.getBindingElement();
var _aef=_aeb.getBindingElement();
that.dismissTabBinding(_aeb);
this._tabsElement.appendChild(_aef);
this._tabPanelsElement.appendChild(_aee);
this.registerTabBoxPair(_aef,_aee);
_aeb.containingTabBoxBinding=this;
this.select(_aeb);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_af0){
var _af1=null;
if(_af0.isSelected){
_af1=this.getBestTab(_af0);
this._selectedTabBinding=null;
}
var _af2=this.getTabPanelBinding(_af0);
this.unRegisterTabBoxPair(_af0.bindingElement);
_af0.dispose();
_af2.dispose();
if(_af1!=null){
this.select(_af1,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_af3){
if(_af3.isSelected){
this.selectBestTab(_af3);
}
};
TabBoxBinding.prototype.selectBestTab=function(_af4){
var _af5=this.getBestTab(_af4);
if(_af5){
this.select(_af5);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_af6){
var _af7=null;
var _af8=_af6.getOrdinalPosition(true);
var _af9=this.getTabBindings();
var _afa=_af9.getLength();
var _afb=_afa-1;
if(_afa==1){
_af7=null;
}else{
if(_af8==_afb){
_af7=_af9.get(_af8-1);
}else{
_af7=_af9.get(_af8+1);
}
}
return _af7;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_afc,_afd){
var _afe=this.bindingDocument.getElementById(_afc.bindingElement.id);
var tab=this.getTabElements().get(_afd);
this._tabsElement.insertBefore(_afe,tab);
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
var _b00=this._nodename_tab;
var _b01=new List(this._tabsElement.childNodes);
var _b02=new List();
while(_b01.hasNext()){
var _b03=_b01.getNext();
if(_b03.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_b03)==_b00){
_b02.add(_b03);
}
}
return _b02;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _b04=this._nodename_tabpanel;
var _b05=new List(this._tabPanelsElement.childNodes);
var _b06=new List();
_b05.each(function(_b07){
if(_b07.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_b07)==_b04){
_b06.add(_b07);
}
});
return _b06;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _b08=new List();
var _b09=this.getTabElements();
_b09.each(function(_b0a){
_b08.add(UserInterface.getBinding(_b0a));
});
return _b08;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _b0b=new List();
this.getTabPanelElements().each(function(_b0c){
_b0b.add(UserInterface.getBinding(_b0c));
});
return _b0b;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _b0d=null;
if(this._selectedTabBinding){
_b0d=this.getTabPanelBinding(this._selectedTabBinding);
}
return _b0d;
};
TabBoxBinding.prototype._showWarning=function(_b0e,_b0f){
var _b10=this.getTabBinding(_b0e);
if(_b0f){
if(_b10.labelBinding.hasImage){
_b10._backupImage=_b10.getImage();
}
_b10.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_b10._backupImage){
_b10.setImage(_b10._backupImage);
}else{
_b10.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_b11,_b12){
var _b13=this.getTabBinding(_b11);
if((_b12&&!_b13.isSelected)||!_b12){
if(_b13.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_b12){
if(_b13.labelBinding.hasImage){
_b13._backupImage=_b13.getImage();
}
_b13.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_b13._backupImage!=null){
_b13.setImage(_b13._backupImage);
}else{
_b13.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b14){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b17=tab.getOrdinalPosition(true);
var next=null;
var _b19=new List();
tabs.each(function(t){
if(t.isVisible){
_b19.add(t);
}
});
if(_b19.getLength()>1){
if(_b17==0&&!_b14){
next=_b19.getLast();
}else{
if(_b17==_b19.getLength()-1&&_b14){
next=_b19.getFirst();
}else{
if(_b14){
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
var _b1b=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b1b.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b1c){
TabsBinding.superclass.handleAction.call(this,_b1c);
switch(_b1c.type){
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
var _b1f=self.bindingElement.offsetWidth;
if(_b1f!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b1f;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b20){
if(_b20 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b20);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b21=false;
var _b22,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b25=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b26=this.bindingElement.offsetWidth-_b25.RESERVED_SPACE;
var _b27=null;
var sum=0,_b29=0;
var _b2a=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b2a){
tab=tabs.getNext();
_b22=UserInterface.getBinding(tab);
if(!_b27){
_b27=_b22;
}
sum+=tab.offsetWidth;
if(sum>=_b26){
_b21=true;
if(_b22.isSelected){
if(!DOMUtil.isFirstElement(_b22.bindingElement,true)){
this.isManaging=false;
if(_b27){
_b27.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b22,_b29-1);
_b2a=false;
}
}else{
_b22.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b22);
}
}else{
_b22.show();
_b27=_b22;
_b29++;
}
}
if(_b2a){
if(_b21&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b2b=_b27.getBindingElement();
var _b2c=_b2b.offsetLeft+_b2b.offsetWidth;
var _b2d=this.tabsButtonBinding;
setTimeout(function(){
_b2d.show(_b2c+4);
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
var _b2e=TabBinding.superclass.serialize.call(this);
if(_b2e){
_b2e.label=this.getLabel();
_b2e.image=this.getImage();
_b2e.tooltip=this.getToolTip();
}
return _b2e;
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
var _b2f=this.bindingElement.getAttribute("image");
var _b30=this.bindingElement.getAttribute("label");
var _b31=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b30){
this.setLabel(_b30);
}
if(_b2f){
this.setImage(_b2f);
}
if(_b31){
this.setToolTip(_b31);
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
TabBinding.prototype.setLabel=function(_b33){
if(_b33!=null){
this.setProperty("label",_b33);
if(this.isAttached){
this.labelBinding.setLabel(_b33);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b34){
if(_b34){
this.setProperty("tooltip",_b34);
if(this.isAttached){
this.labelBinding.setToolTip(_b34);
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
var _b36=false;
if(Client.isMozilla==true){
}
if(!_b36){
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
TabBinding.prototype.select=function(_b37){
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
TabBinding.newInstance=function(_b38){
var _b39=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b38);
return UserInterface.registerBinding(_b39,TabBinding);
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
var _b3a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b3a=true;
this._lastKnownDimension=dim1;
}
return _b3a;
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
TabPanelBinding.prototype.select=function(_b3d){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b3d!=true){
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
TabPanelBinding.prototype.handleAction=function(_b3e){
TabPanelBinding.superclass.handleAction.call(this,_b3e);
var _b3f=_b3e.target;
switch(_b3e.type){
case BalloonBinding.ACTION_INITIALIZE:
_b3e.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b40){
var _b41=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b40);
UserInterface.registerBinding(_b41,TabPanelBinding);
return UserInterface.getBinding(_b41);
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
var _b42=SplitBoxBinding.superclass.serialize.call(this);
if(_b42){
_b42.orient=this.getOrient();
_b42.layout=this.getLayout();
}
return _b42;
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
var _b44=this.getSplitPanelElements();
if(_b44.hasEntries()){
var _b45=new List(this.getLayout().split(":"));
if(_b45.getLength()!=_b44.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b44.each(function(_b46){
_b46.setAttribute("ratio",_b45.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b47=this.getProperty("orient");
if(_b47){
this._orient=_b47;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b48=this.getSplitterBindings();
while(_b48.hasNext()){
var _b49=_b48.getNext();
if(_b49&&_b49.getProperty("collapsed")==true){
_b49.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b4a){
SplitBoxBinding.superclass.handleAction.call(this,_b4a);
switch(_b4a.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b4a.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b4a.target);
_b4a.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b4a.target);
_b4a.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b4b){
this._getSplitPanelBindingForSplitter(_b4b).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b4c){
this._getSplitPanelBindingForSplitter(_b4c).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b4d){
var _b4e=DOMUtil.getOrdinalPosition(_b4d.bindingElement,true);
var _b4f,_b50=this.getSplitPanelElements();
switch(_b4d.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b4f=_b50.get(_b4e);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b4f=_b50.get(_b4e+1);
break;
}
return UserInterface.getBinding(_b4f);
};
SplitBoxBinding.prototype.invokeLayout=function(_b51){
var _b52=this.isHorizontalOrient();
var _b53=this.getSplitPanelBindings();
var _b54=this.getSplitterBindings();
var _b55=new List();
var _b56,sum=0;
var _b58=0;
_b53.each(function(_b59){
if(_b59.isFixed==true){
if(!_b53.hasNext()){
_b58+=_b59.getFix();
}
_b55.add(0);
sum+=0;
}else{
_b56=_b59.getRatio();
_b55.add(_b56);
sum+=_b56;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b55.getLength()!=_b53.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b5a=_b52?this.getInnerWidth():this.getInnerHeight();
_b5a-=_b58;
_b54.each(function(_b5b){
if(_b5b.isVisible){
_b5a-=SplitterBinding.DIMENSION;
}
});
var unit=_b5a/sum;
var _b5d=0;
var self=this;
_b53.each(function(_b5f){
var span=0;
var _b61=_b55.getNext();
if(_b5f.isFixed){
span=_b5f.getFix();
}else{
span=Math.floor(unit*_b61);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b5d+=span;
while(_b5d>_b5a){
_b5d--;
span--;
}
if(!_b5f.isFixed){
if(_b52){
_b5f.setWidth(span);
}else{
_b5f.setHeight(span);
}
}
});
}
if(_b51!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b62=this.getLayout();
if(_b62){
this.setProperty("layout",_b62);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b63=this.isHorizontalOrient();
var _b64=this.getSplitPanelBindings();
var _b65=this.getSplitterBindings();
var _b66=null;
var _b67=null;
var unit=null;
var _b69=null;
var span=null;
_b64.each(function(_b6b){
if(!unit){
unit=_b63?_b6b.getWidth():_b6b.getHeight();
}
span=_b63?_b6b.getWidth():_b6b.getHeight();
if(_b69){
span-=_b69;
_b69=null;
}
_b66=_b65.getNext();
if(_b66&&_b66.offset){
_b69=_b66.offset;
span+=_b69;
}
_b6b.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b6c){
this.logger.debug(_b6c);
this.setProperty("layout",_b6c);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b6d="",_b6e=this.getSplitPanelBindings();
_b6e.each(function(_b6f){
_b6d+=_b6f.getRatio().toString();
_b6d+=_b6e.hasNext()?":":"";
});
this.setProperty("layout",_b6d);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b70=this.getSplitPanelElements();
_b70.each(function(_b71){
layout+="1"+(_b70.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b72){
this.bindingElement.style.width=_b72+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b73){
this.bindingElement.style.height=_b73+"px";
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
var _b74=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isUIRtl){
_b74.reverse();
}
return _b74;
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
SplitBoxBinding.prototype.fit=function(_b75){
if(!this.isFit||_b75){
if(this.isHorizontalOrient()){
var max=0;
var _b77=this.getSplitPanelBindings();
_b77.each(function(_b78){
var _b79=_b78.bindingElement.offsetHeight;
max=_b79>max?_b79:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b7a){
var _b7b=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b7a);
return UserInterface.registerBinding(_b7b,SplitBoxBinding);
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
var _b7e=this.getProperty("hidden");
if(_b7e){
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
var _b7f=this.getProperty("ratiocache");
if(_b7f){
this.setRatio(_b7f);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b80){
if(!this.isFixed){
if(_b80!=this.getWidth()){
if(_b80<0){
_b80=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b80+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b80);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b81=null;
if(this.isFixed){
_b81=this.getFix();
}else{
_b81=this.bindingElement.offsetWidth;
}
return _b81;
};
SplitPanelBinding.prototype.setHeight=function(_b82){
if(!this.isFixed){
if(_b82!=this.getHeight()){
try{
this.bindingElement.style.height=_b82+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b83=null;
if(this.isFixed){
_b83=this.getFix();
}else{
_b83=this.bindingElement.offsetHeight;
}
return _b83;
};
SplitPanelBinding.prototype.setRatio=function(_b84){
this.setProperty("ratio",_b84);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b85){
if(_b85){
this._fixedSpan=_b85;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b85);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b85);
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
SplitPanelBinding.newInstance=function(_b86){
var _b87=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b86);
return UserInterface.registerBinding(_b87,SplitPanelBinding);
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
var _b88=SplitBoxBinding.superclass.serialize.call(this);
if(_b88){
_b88.collapse=this.getProperty("collapse");
_b88.collapsed=this.getProperty("collapsed");
_b88.disabled=this.getProperty("isdisabled");
}
return _b88;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b89=this.getProperty("hidden");
if(_b89){
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
SplitterBinding.prototype.setCollapseDirection=function(_b8b){
this.setProperty("collapse",_b8b);
this._collapseDirection=_b8b;
};
SplitterBinding.prototype.handleAction=function(_b8c){
SplitterBinding.superclass.handleAction.call(this,_b8c);
switch(_b8c.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b8c.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b8e=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b8e.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b8e.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b8f){
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
SplitterBinding.newInstance=function(_b9a){
var _b9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b9a);
return UserInterface.registerBinding(_b9b,SplitterBinding);
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
var _b9c=this.getProperty("selectedindex");
var _b9d=this.getDeckElements();
if(_b9d.hasEntries()){
var _b9e=false;
var _b9f=0;
while(_b9d.hasNext()){
var deck=_b9d.getNext();
if(_b9c&&_b9f==_b9c){
deck.setAttribute("selected","true");
_b9e=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b9e=true;
}
}
_b9f++;
}
if(!_b9e){
_b9d.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _ba2=this.getBindingForArgument(arg);
if(_ba2!=null){
if(_ba2!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_ba2.select();
this._selectedDeckBinding=_ba2;
var _ba3=this.getProperty("selectedindex");
if(_ba3!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ba2.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _ba4=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_ba4=true;
this._lastKnownDimension=dim1;
}
return _ba4;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_ba7){
var _ba8=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_ba7);
return UserInterface.registerBinding(_ba8,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_ba9){
DeckBinding.superclass.handleAction.call(this,_ba9);
var _baa=_ba9.target;
switch(_ba9.type){
case BalloonBinding.ACTION_INITIALIZE:
_ba9.consume();
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
DeckBinding.newInstance=function(_bac){
var _bad=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_bac);
return UserInterface.registerBinding(_bad,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_bae){
if(_bae instanceof ToolBarBodyBinding){
if(_bae.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_bae;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_bae;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_bae);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _baf=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_baf){
this.setImageSize(_baf);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _bb1=ToolBarGroupBinding.newInstance(this.bindingDocument);
_bb1.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_bb1.isDefaultContent=true;
this.add(_bb1);
_bb1.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _bb3=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_bb3);
}
if(_bb3!=null&&_bb3.hasClassName("max")){
this._maxToolBarGroup(_bb3,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_bb5){
var _bb6=this.boxObject.getDimension().w;
var _bb7=CSSComputer.getPadding(this.bindingElement);
_bb6-=(_bb7.left+_bb7.right);
if(_bb5!=null){
_bb6-=_bb5.boxObject.getDimension().w;
if(!Client.isWindows){
_bb6-=1;
}
if(Client.isExplorer){
_bb6-=15;
}
}
max.bindingElement.style.width=_bb6+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_bb8){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_bb8);
};
ToolBarBinding.prototype.addLeft=function(_bb9,_bba){
var _bbb=null;
if(this._toolBarBodyLeft!=null){
_bbb=this._toolBarBodyLeft.add(_bb9,_bba);
}else{
throw new Error("No left toolbarbody");
}
return _bbb;
};
ToolBarBinding.prototype.addLeftFirst=function(_bbc,_bbd){
var _bbe=null;
if(this._toolBarBodyLeft){
_bbe=this._toolBarBodyLeft.addFirst(_bbc,_bbd);
}else{
throw new Error("No left toolbarbody");
}
return _bbe;
};
ToolBarBinding.prototype.addRight=function(_bbf){
var _bc0=null;
if(this._toolBarBodyRight){
_bc0=this._toolBarBodyRight.add(_bbf);
}else{
throw new Error("No left toolbarbody");
}
return _bc0;
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
ToolBarBinding.newInstance=function(_bc3){
var _bc4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bc3);
return UserInterface.registerBinding(_bc4,ToolBarBinding);
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
var _bc5=this.getDescendantBindingsByLocalName("toolbargroup");
var _bc6=new List();
var _bc7=true;
_bc5.each(function(_bc8){
if(_bc8.isVisible&&!_bc8.isDefaultContent){
_bc6.add(_bc8);
}
});
while(_bc6.hasNext()){
var _bc9=_bc6.getNext();
_bc9.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bc7){
_bc9.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bc7=false;
}
if(!_bc6.hasNext()){
_bc9.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bcc=list.getNext();
var _bcd=_bcc.getEqualSizeWidth();
if(_bcd>max){
max=_bcd;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bcc=list.getNext();
_bcc.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bce,_bcf){
var _bd0=ToolBarBinding.superclass.add.call(this,_bce);
if(!_bcf){
if(_bce instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bd0;
};
ToolBarBodyBinding.prototype.addFirst=function(_bd1,_bd2){
var _bd3=ToolBarBinding.superclass.addFirst.call(this,_bd1);
if(!_bd2){
if(_bd1 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bd3;
};
ToolBarBodyBinding.newInstance=function(_bd4){
var _bd5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bd4);
return UserInterface.registerBinding(_bd5,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bd6){
switch(_bd6){
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
var _bd7=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bd7)=="toolbarbody"){
UserInterface.getBinding(_bd7).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bd8=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bd8)=="toolbarbody"){
UserInterface.getBinding(_bd8).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bd9){
var _bda=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bd9);
return UserInterface.registerBinding(_bda,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bdb){
var _bdc=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bdb);
return UserInterface.registerBinding(_bdc,ToolBarButtonBinding);
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
var _bdd=this.getProperty("label");
var _bde=this.getProperty("image");
if(_bdd){
this.setLabel(_bdd);
}
if(_bde){
this.setImage(_bde);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bdf,_be0){
if(this.isAttached){
this._labelBinding.setLabel(_bdf,_be0);
}
this.setProperty("label",_bdf);
};
ToolBarLabelBinding.prototype.setImage=function(_be1,_be2){
if(this.isAttached){
this._labelBinding.setImage(_be1,_be2);
}
this.setProperty("image",_be1);
};
ToolBarLabelBinding.newInstance=function(_be3){
var _be4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_be3);
return UserInterface.registerBinding(_be4,ToolBarLabelBinding);
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
var _be5=this.getDescendantBindingsByLocalName("clickbutton");
if(_be5.hasEntries()){
while(_be5.hasNext()){
var _be6=_be5.getNext();
if(_be6.isDefault){
this._defaultButton=_be6;
_be6.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_be6.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_be5;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_be7,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_be7,arg);
switch(_be7){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _be9=this.getAncestorBindingByType(DialogBinding,true);
if(_be9!=null&&_be9.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bea){
DialogToolBarBinding.superclass.handleAction.call(this,_bea);
var _beb=_bea.target;
var _bec=false;
var _bed=this._buttons.reset();
if(_beb instanceof ClickButtonBinding){
switch(_bea.type){
case Binding.ACTION_FOCUSED:
_beb.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_beb;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_beb.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bec&&_bed.hasNext()){
var _bee=_bed.getNext();
_bec=_bee.isFocused;
}
if(!_bec){
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
ComboBoxBinding.newInstance=function(_bf0){
var _bf1=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bf0);
return UserInterface.registerBinding(_bf1,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bf2,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bf2,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bf6=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bf6.each(function(_bf7){
var _bf8=_bf7.getProperty("oncommand");
_bf7.setProperty("hiddencommand",_bf8);
_bf7.deleteProperty("oncommand");
_bf7.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bf9=null;
var _bfa=this.getActiveMenuItemId();
_bf6.reset();
while(_bf6.hasNext()){
var _bfb=_bf6.getNext();
if(_bfb.getProperty("id")==_bfa){
_bf9=_bfb;
break;
}
}
if(_bf9==null&&_bf6.hasEntries()){
_bf9=_bf6.getFirst();
}
if(_bf9!=null){
this.setButton(_bf9);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bfc){
if(_bfc instanceof MenuItemBinding){
var _bfd=_bfc.getProperty("label");
var _bfe=_bfc.getProperty("image");
var _bff=_bfc.getProperty("image-hover");
var _c00=_bfc.getProperty("image-active");
var _c01=_bfc.getProperty("image-disabled");
var _c02=_bfc.getProperty("hiddencommand");
this.setLabel(_bfd?_bfd:"");
this.image=_bfe;
this.imageHover=_bfe;
this.imageActive=_c00;
this.imageDisabled=_c01;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_c02,this);
};
this.hideActiveItem(_bfc);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_c03){
if(_c03 instanceof MenuItemBinding){
this.setButton(_c03);
this.setActiveMenuItemId(_c03.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_c04){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_c05){
if(_c05==_c04){
Binding.prototype.hide.call(_c05);
}else{
Binding.prototype.show.call(_c05);
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
var _c07=this._views;
for(var _c08 in ViewDefinitions){
var def=ViewDefinitions[_c08];
var key=def.perspective;
if(key!=null){
if(!_c07.has(key)){
_c07.set(key,new List());
}
var list=_c07.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_c0c,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_c0c,arg);
switch(_c0c){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _c0f=this.bindingWindow.bindingMap.toolboxpopupgroup;
_c0f.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_c0f.add(StageViewMenuItemBinding.newInstance(_c0f.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_c0f.show();
}else{
_c0f.hide();
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
TreeBinding.grid=function(_c13){
var _c14=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_c13);
var _c16=_c13%_c14;
if(_c16>0){
_c13=_c13-_c16+_c14;
}
return _c13+TreeBodyBinding.PADDING_TOP;
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
var _c17=this.getProperty("focusable");
if(_c17!=null){
this._isFocusable=_c17;
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
var _c19=this.getProperty("builder");
if(_c19){
this._buildFromTextArea(_c19);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c1a=this.getProperty("selectable");
var _c1b=this.getProperty("selectionproperty");
var _c1c=this.getProperty("selectionvalue");
if(_c1a){
this.setSelectable(true);
if(_c1b){
this.setSelectionProperty(_c1b);
}
if(_c1c){
this.setSelectionValue(_c1c);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c1f=UserInterface.getBinding(area);
var _c20=this._treeBodyBinding;
function build(){
_c20.subTreeFromString(area.value);
}
_c1f.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c21){
var _c22=_c21.getHandle();
if(this._treeNodeBindings.has(_c22)){
throw "Duplicate treenodehandles registered: "+_c21.getLabel();
}else{
this._treeNodeBindings.set(_c22,_c21);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c22)){
_c21.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c24){
this._treeNodeBindings.del(_c24.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c25){
var _c26=null;
if(this._treeNodeBindings.has(_c25)){
_c26=this._treeNodeBindings.get(_c25);
}else{
throw "No such treenode: "+_c25;
}
return _c26;
};
TreeBinding.prototype.handleAction=function(_c27){
TreeBinding.superclass.handleAction.call(this,_c27);
var _c28=_c27.target;
switch(_c27.type){
case TreeNodeBinding.ACTION_OPEN:
_c27.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c28);
_c27.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c28;
this.focusSingleTreeNodeBinding(_c28);
if(!this.isFocused){
this.focus();
}
_c27.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c28;
this.focusSingleTreeNodeBinding(_c28);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c28;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c28;
this.focusSingleTreeNodeBinding(_c28);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c27.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c28.isFocused){
this.blurSelectedTreeNodes();
}
_c27.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c29,_c2a){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c2b){
if(_c2b!=null&&!_c2b.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c2b);
_c2b.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c2c){
this.blurSelectedTreeNodes();
while(_c2c.hasNext()){
var _c2d=_c2c.getNext();
this._focusedTreeNodeBindings.add(_c2d);
_c2d.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c2e=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c2f=false;
var _c30=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c31=this._focusedTreeNodeBindings.getNext();
var _c32=_c31.getProperty(this._selectionProperty);
if(_c32!=null){
if(!this._selectionValue||this._selectionValue[_c32]){
_c30=(this._selectedTreeNodeBindings[_c31.key]=_c31);
var _c33=_c2e[_c31.key];
if(!_c33||_c33!=_c30){
_c2f=true;
}
}
}
}
if(_c30){
if(_c2f){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c2e){
for(var key in _c2e){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c35=new List();
for(var key in this._selectedTreeNodeBindings){
_c35.add(this._selectedTreeNodeBindings[key]);
}
return _c35;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c37){
_c37.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c38){
var _c39=_c38.getDescendantBindingsByLocalName("treenode");
var _c3a=true;
var self=this;
_c39.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c3a;
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
var _c3d=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c3d!=null){
this.focusSingleTreeNodeBinding(_c3d);
_c3d.callback();
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
TreeBinding.prototype.add=function(_c3e){
var _c3f=null;
if(this._treeBodyBinding){
_c3f=this._treeBodyBinding.add(_c3e);
}else{
this._treeNodeBuffer.add(_c3e);
_c3f=_c3e;
}
return _c3f;
};
TreeBinding.prototype.addFirst=function(_c40){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c41=this._treeBodyBinding.bindingElement;
_c41.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c42,_c43){
if(_c43.isContainer&&_c43.isOpen){
_c43.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c44){
this._isSelectable=_c44;
if(_c44){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c45){
this._selectionProperty=_c45;
};
TreeBinding.prototype.setSelectionValue=function(_c46){
if(_c46){
var list=new List(_c46.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c48,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c48,arg);
switch(_c48){
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
var _c4a=this.getFocusedTreeNodeBindings();
if(_c4a.hasEntries()){
var node=_c4a.getFirst();
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
var _c4d=this.getFocusedTreeNodeBindings();
if(_c4d.hasEntries()){
var node=_c4d.getFirst();
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
var _c50=null;
while(next==null&&(_c50=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c50!=null){
next=_c50.getNextBindingByLocalName("treenode");
}
node=_c50;
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
var _c52=DOMEvents.getTarget(e);
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
var _c53=new TreeCrawler();
var list=new List();
_c53.mode=TreeCrawler.MODE_GETOPEN;
_c53.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c56=list.getNext();
map.set(_c56.getHandle(),true);
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
var _c5b=this._positionIndicatorBinding;
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
if(y!=_c5b.getPosition().y){
_c5b.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c5b.isVisible){
_c5b.show();
}
}else{
if(_c5b.isVisible){
_c5b.hide();
}
}
}else{
if(_c5b.isVisible){
_c5b.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c5e){
this._acceptingTreeNodeBinding=_c5e;
this._acceptingPosition=_c5e.boxObject.getLocalPosition();
this._acceptingDimension=_c5e.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c5e);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c5f){
var map={};
var _c61=_c5f.getChildBindingsByLocalName("treenode");
var _c62,pos,dim,y;
y=TreeBinding.grid(_c5f.boxObject.getLocalPosition().y);
map[y]=true;
while(_c61.hasNext()){
_c62=_c61.getNext();
pos=_c62.boxObject.getLocalPosition();
dim=_c62.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c68 in this._acceptingPositions){
if(_c68==y){
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
TreeBinding.newInstance=function(_c69){
var _c6a=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c69);
var _c6b=UserInterface.registerBinding(_c6a,TreeBinding);
_c6b.treeBodyBinding=TreeBodyBinding.newInstance(_c69);
return _c6b;
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
TreeBodyBinding.prototype.accept=function(_c6c){
if(_c6c instanceof TreeNodeBinding){
this.logger.debug(_c6c);
}
};
TreeBodyBinding.newInstance=function(_c6d){
var _c6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c6d);
return UserInterface.registerBinding(_c6e,TreeBodyBinding);
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
var _c6f=TreeNodeBinding.superclass.serialize.call(this);
if(_c6f){
_c6f.label=this.getLabel();
_c6f.image=this.getImage();
var _c70=this.getHandle();
if(_c70&&_c70!=this.key){
_c6f.handle=_c70;
}
if(this.isOpen){
_c6f.open=true;
}
if(this.isDisabled){
_c6f.disabled=true;
}
if(this.dragType){
_c6f.dragtype=this.dragType;
}
if(this.dragAccept){
_c6f.dragaccept=this.dragAccept;
}
}
return _c6f;
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
var _c72=UserInterface.getBinding(node);
if(_c72&&_c72.containingTreeBinding){
this.containingTreeBinding=_c72.containingTreeBinding;
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
var _c73=this.key;
var _c74=this.getProperty("handle");
if(_c74){
_c73=_c74;
}
return _c73;
};
TreeNodeBinding.prototype.setHandle=function(_c75){
this.setProperty("handle",_c75);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c77=this.getProperty("label");
var _c78=this.getProperty("tooltip");
var _c79=this.getProperty("oncommand");
var _c7a=this.getProperty("onbindingfocus");
var _c7b=this.getProperty("onbindingblur");
var _c7c=this.getProperty("focused");
var _c7d=this.getProperty("callbackid");
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
if(_c77!=null){
this.setLabel(_c77);
}
if(_c78!=null){
this.setToolTip(_c78);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c7f=this.bindingWindow.WindowManager;
if(_c79!=null){
this.oncommand=function(){
Binding.evaluate(_c79,this);
};
}
if(_c7a!=null){
this.onfocus=function(){
Binding.evaluate(_c7a,this);
};
}
if(_c7b!=null){
this.onblur=function(){
Binding.evaluate(_c7b,this);
};
}
if(_c7c==true){
this.focus();
}
if(_c7d!=null){
Binding.dotnetify(this,_c7d);
}
};
TreeNodeBinding.prototype.handleAction=function(_c80){
TreeNodeBinding.superclass.handleAction.call(this,_c80);
switch(_c80.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c80.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c81,_c82){
var _c83=true;
if(_c81 instanceof TreeNodeBinding){
var _c84=false;
var _c85=this.bindingElement;
var _c86=this.containingTreeBinding.bindingElement;
while(!_c84&&_c85!=_c86){
if(_c85==_c81.getBindingElement()){
_c84=true;
}else{
_c85=_c85.parentNode;
}
}
if(_c84){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c83=false;
}else{
this.acceptTreeNodeBinding(_c81,_c82);
}
}else{
_c83=false;
}
return _c83;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c87,_c88){
var _c89=_c87.serializeToString();
var _c8a=new BindingParser(this.bindingDocument);
var _c8b=_c8a.parseFromString(_c89).getFirst();
_c88=_c88?_c88:this.containingTreeBinding.getDropIndex();
var _c8c=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c8b,_c8c.get(_c88));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c87.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c8d=this.getProperty("image");
var _c8e=this.getProperty("image-active");
var _c8f=this.getProperty("image-disabled");
_c8e=_c8e?_c8e:this.isContainer?_c8d?_c8d:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c8d?_c8d:TreeNodeBinding.DEFAULT_ITEM;
_c8f=_c8f?_c8f:this.isContainer?_c8d?_c8d:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c8d?_c8d:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c8d=_c8d?_c8d:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c8d,imageHover:null,imageActive:_c8e,imageDisabled:_c8f});
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
TreeNodeBinding.prototype.setLabel=function(_c91){
this.setProperty("label",String(_c91));
if(this.isAttached){
this.labelBinding.setLabel(String(_c91));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c92){
this.setProperty("tooltip",String(_c92));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c92));
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
var _c93=this.imageProfile.getDefaultImage();
var _c94=this.imageProfile.getActiveImage();
_c94=_c94?_c94:_c93;
return this.isOpen?_c94:_c93;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c96=DOMEvents.getTarget(e);
var _c97=this.labelBinding.bindingElement;
var _c98=this.labelBinding.shadowTree.labelBody;
var _c99=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c96){
case _c97:
this._onAction(e);
break;
case _c98:
case _c99:
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
if(_c96.parentNode==this.bindingElement&&_c96.__updateType==Update.TYPE_INSERT){
var _c97=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c96)=="treenode"){
if(_c96==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c96,_c97.nextSibling);
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
switch(_c96){
case _c97:
case _c98:
case _c99:
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
var _c9d=true;
if(e.type=="mousedown"){
var _c9e=e.button==(e.target?0:1);
if(!_c9e){
_c9d=false;
}
}
if(_c9d){
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
var _ca0=false;
if(e!=null){
_ca0=e.shiftKey;
}
this.dispatchAction(_ca0?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _ca3=this.getDescendantBindingsByLocalName("treenode");
_ca3.each(function(_ca4){
_ca4.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_ca5){
var _ca6=_ca5.getAttribute("focused");
if(_ca6=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_ca7){
var _ca8=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ca7);
return UserInterface.registerBinding(_ca8,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_ca9){
var _caa=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_ca9);
return UserInterface.registerBinding(_caa,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_cab){
this.bindingElement.style.left=_cab.x+"px";
this.bindingElement.style.top=_cab.y+"px";
this._geometry.x=_cab.x;
this._geometry.y=_cab.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_cac){
var _cad=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_cac);
return UserInterface.registerBinding(_cad,TreePositionIndicatorBinding);
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
this.addFilter(function(_caf){
var _cb0=UserInterface.getBinding(_caf);
var _cb1=null;
var _cb1=null;
if(!_cb0 instanceof TreeNodeBinding){
_cb1=NodeCrawler.SKIP_NODE;
}
return _cb1;
});
this.addFilter(function(_cb2,list){
var _cb4=UserInterface.getBinding(_cb2);
var _cb5=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_cb4.isOpen){
list.add(_cb4);
}
break;
}
return _cb5;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_cb6){
this.binding=_cb6;
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
DockTabsButtonBinding.newInstance=function(_cb7){
var _cb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cb7);
_cb8.setAttribute("type","checkbox");
_cb8.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cb8.className="tabbutton";
return UserInterface.registerBinding(_cb8,DockTabsButtonBinding);
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
var _cb9=DockBinding.superclass.serialize.call(this);
if(_cb9){
_cb9.active=this.isActive?true:null;
_cb9.collapsed=this.isCollapsed?true:null;
}
return _cb9;
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
DockBinding.prototype.interceptDisplayChange=function(_cbb){
var _cbc=this.getSelectedTabPanelBinding();
if(_cbc){
_cbc.isVisible=_cbb;
_cbc.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cbd){
var _cbe=this._getBindingForDefinition(_cbd);
var _cbf=DockTabBinding.newInstance(this.bindingDocument);
_cbf.setHandle(_cbd.handle);
_cbf.setLabel(_cbd.flowHandle?null:_cbd.label);
_cbf.setImage(_cbd.image);
_cbf.setToolTip(_cbd.toolTip);
_cbf.setEntityToken(_cbd.entityToken);
_cbf.setAssociatedView(_cbe);
this.appendTabByBindings(_cbf,null);
this._setupPageBindingListeners(_cbf);
var _cc0=this.getTabPanelBinding(_cbf);
_cbe.snapToBinding(_cc0);
var _cc1=this.bindingWindow.bindingMap.views;
_cc1.add(_cbe);
if(!this.isActive){
this.activate();
}
_cbe.attach();
};
DockBinding.prototype.prepareOpenView=function(_cc2,_cc3){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cc3.setLabel(_cc2.label);
_cc3.setImage(_cc2.image);
_cc3.setToolTip(_cc2.toolTip);
this._setupPageBindingListeners(_cc3);
var _cc4=this.getTabPanelBinding(_cc3);
var _cc5=this._getBindingForDefinition(_cc2);
_cc3.setAssociatedView(_cc5);
_cc5.snapToBinding(_cc4);
UserInterface.getBinding(this.bindingDocument.body).add(_cc5);
_cc5.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cc6){
var _cc7=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cc7.bindingDocument);
view.setDefinition(_cc6);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cc9){
var _cca=this.getTabPanelBinding(_cc9);
var self=this;
var _ccc={handleAction:function(_ccd){
var _cce=_ccd.target;
switch(_ccd.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cce.reflex(true);
var view=_cc9.getAssociatedView();
if(_cce.bindingWindow==view.getContentWindow()){
_cc9.updateDisplay(_cce);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cc9.onPageInitialize(_cce);
_ccd.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cc9.getAssociatedView();
if(_cce.bindingWindow==view.getContentWindow()){
_cc9.updateDisplay(_cce);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cc9.updateDisplay(_cce);
_ccd.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cc9.updateEntityToken(_cce);
_ccd.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cc9.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cc9.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cc9);
_ccd.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cc9,true);
_ccd.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cc9);
break;
case Binding.ACTION_FORCE_REFLEX:
_cca.reflex(true);
_ccd.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cc9.isDirty){
_cc9.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cd0){
_cca.addActionListener(_cd0,_ccc);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cd1){
DockBinding.superclass.handleAction.call(this,_cd1);
var _cd2=_cd1.target;
switch(_cd1.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cd1.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cd2 instanceof DockBinding){
if(_cd2.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cd2);
if(this.isActive){
_cd2.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cd2);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cd3,arg){
DockBinding.superclass.handleBroadcast.call(this,_cd3,arg);
switch(_cd3){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cd5=arg;
if(_cd5.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cd5.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cd6){
var tabs=this.getTabBindings();
var _cd8=false;
while(tabs.hasNext()&&!_cd8){
var tab=tabs.getNext();
var _cda=tab.getEntityToken();
if(_cda!=null&&_cda==_cd6){
if(!tab.isSelected){
this.select(tab,true);
_cd8=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cdb){
this._handleCollapse(true,_cdb);
};
DockBinding.prototype.unCollapse=function(_cdc){
this._handleCollapse(false,_cdc);
};
DockBinding.prototype._handleCollapse=function(_cdd,_cde){
var _cdf=this.getChildBindingByLocalName("dockpanels");
var _ce0=this.getAncestorBindingByLocalName("splitbox");
if(_cdd){
_cdf.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cde&&_ce0.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cdf.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cde){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cdd);
this.isCollapsed=_cdd;
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
DockBinding.prototype.closeTab=function(_ce5,_ce6){
if(_ce5.isDirty&&!_ce6){
var _ce7=Resolver.resolve(_ce5.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ce7),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_ce9){
switch(_ce9){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_ce5);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_ce5);
break;
}
}});
}else{
this.removeTab(_ce5);
}
};
DockBinding.prototype.closeTabsExcept=function(_cea){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cea){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ced){
var _cee=_ced.getAssociatedView();
_cee.saveContainedEditor();
var self=this;
var _cf0={handleBroadcast:function(_cf1,arg){
switch(_cf1){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cee.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cf0);
if(arg.isSuccess){
self.removeTab(_ced);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cf0);
};
DockBinding.prototype.appendTabByBindings=function(_cf3,_cf4){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cf3,_cf4);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cf5){
_cf5=_cf5?_cf5+"px":"100%";
this.bindingElement.style.width=_cf5;
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
var _cf6=null;
var _cf7=this.getTabBindings();
var _cf8=_cf7.getLength();
if(_cf8==1){
_cf6=null;
}else{
_cf6=_cf7.get(0);
}
return _cf6;
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
var _cfa=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cfa)){
_cfa=_cfa>0?_cfa-1:0;
self.bindingElement.style.width=new String(_cfa)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cfb){
DockTabsBinding.superclass.handleCrawler.call(this,_cfb);
switch(_cfb.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cfd=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cfd)){
_cfd=_cfd>0?_cfd-1:0;
self.bindingElement.style.width=new String(_cfd)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cfe){
var _cff=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cfe);
return UserInterface.registerBinding(_cff,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_d00){
this._viewBinding=_d00;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _d01=DockTabBinding.superclass.serialize.call(this);
if(_d01){
_d01.label=null;
_d01.image=null;
_d01.handle=this.getHandle();
}
return _d01;
};
DockTabBinding.prototype.setHandle=function(_d02){
this.setProperty("handle",_d02);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_d03){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_d03;
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
var _d04=DialogControlBinding.newInstance(this.bindingDocument);
_d04.setControlType(ControlBinding.TYPE_CLOSE);
_d04.attachClassName("closecontrol");
this._controlGroupBinding.add(_d04);
this._controlGroupBinding.attachRecursive();
}
};
DockTabBinding.prototype.setDirty=function(_d05){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_d05){
this.isDirty=_d05;
if(Binding.exists(this.labelBinding)){
var _d06=this.labelBinding.getLabel();
if(_d06!=null){
this.labelBinding.setLabel(_d05?"*"+_d06:_d06.slice(1,_d06.length));
}else{
this.labelBinding.setLabel(_d05?"*":"");
}
}
}
var _d07=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_d07.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_d07.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_d08){
this.setLabel(_d08.getLabel());
this.setImage(_d08.getImage());
this.setToolTip(_d08.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_d09){
this.setEntityToken(_d09.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d0a){
DockTabBinding.superclass.handleAction.call(this,_d0a);
var _d0b=_d0a.target;
switch(_d0a.type){
case ControlBinding.ACTION_COMMAND:
if(_d0b.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d0a.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d0b);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d0c){
var cmd=_d0c.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d0e){
if(!_d0e){
if(!this.getLabel()){
_d0e=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d0e=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d0e=this.isDirty?"*"+_d0e:_d0e;
DockTabBinding.superclass.setLabel.call(this,_d0e);
};
DockTabBinding.prototype.setImage=function(_d0f){
if(!_d0f){
if(!this.getImage()){
_d0f=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d0f=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d0f);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d12=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d12;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d12;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d12;
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
var _d14=this.bindingElement;
setTimeout(function(){
_d14.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d15,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d15,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d15){
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
DockTabBinding.prototype.select=function(_d1a){
DockTabBinding.superclass.select.call(this,_d1a);
this._updateBroadcasters();
if(_d1a!=true){
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
var _d1b=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d1c=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d1c.enable();
if(this.isDirty){
_d1b.enable();
}else{
_d1b.disable();
}
}else{
_d1c.disable();
_d1b.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d1d){
if(this._canUpdateTree||_d1d){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d1e=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d20=win.bindingMap.savebutton;
if(_d20!=null){
_d1e=true;
}
}
}
return _d1e;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d21){
var _d22=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d21);
return UserInterface.registerBinding(_d22,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d23){
var _d24=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d23);
return UserInterface.registerBinding(_d24,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d25){
DockPanelBinding.superclass.select.call(this,_d25);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d26){
DockPanelBinding.superclass.handleCrawler.call(this,_d26);
if(_d26.response==null){
if(_d26.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d26.id==FocusCrawler.ID){
_d26.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d27){
var _d28=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d27);
return UserInterface.registerBinding(_d28,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d29){
var _d2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d29);
return UserInterface.registerBinding(_d2a,DockControlBinding);
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
ViewBinding.getInstance=function(_d2b){
var _d2c=ViewBinding._instances.get(_d2b);
if(!_d2c){
var cry="ViewBinding.getInstance: No such instance: "+_d2b;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d2c;
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
var _d2f=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d2f){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d30=snap.boxObject.getGlobalPosition();
var _d31=snap.boxObject.getDimension();
if(!Point.isEqual(_d30,this._lastknownposition)){
this.setPosition(_d30);
this._lastknownposition=_d30;
}
if(!Dimension.isEqual(_d31,this._lastknowndimension)){
this.setDimension(_d31);
this._lastknowndimension=_d31;
var _d32=_d31.h-ViewBinding.VERTICAL_ADJUST;
_d32=_d32<0?0:_d32;
this.windowBinding.getBindingElement().style.height=new String(_d32)+"px";
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
var _d33=this._viewDefinition.flowHandle;
if(_d33!=null){
FlowControllerService.CancelFlow(_d33);
}
}
if(this._viewDefinition!=null){
var _d34=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d34);
this.logger.fine("ViewBinding closed: \""+_d34+"\"");
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
var _d36=null;
if(this._viewDefinition!=null){
_d36=this._viewDefinition.handle;
}
return _d36;
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
ViewBinding.prototype.setDefinition=function(_d37){
this._viewDefinition=_d37;
if(_d37.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d38){
ViewBinding.superclass.handleAction.call(this,_d38);
var _d39=_d38.target;
switch(_d38.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d38.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d39.isActivated){
_d39.onActivate();
}
}
_d38.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d39==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d38.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d39==this._snapBinding){
if(_d39.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d39.getContentWindow().isPostBackDocument){
if(_d38.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d39.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d39==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d39.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d38.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d38.type==WindowBinding.ACTION_ONLOAD){
var win=_d39.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d39);
}
}
}
_d38.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d39.label&&this._viewDefinition.label){
_d39.label=this._viewDefinition.label;
}
if(!_d39.image&&this._viewDefinition.image){
_d39.image=this._viewDefinition.image;
}
if(_d39.bindingWindow==this.getContentWindow()){
this._pageBinding=_d39;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d39.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d39==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d38.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d38.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d3e,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d3e,arg);
switch(_d3e){
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
var _d42=def.argument;
if(_d42!=null){
page.setPageArgument(_d42);
}
var _d43=def.width;
if(_d43!=null){
page.width=_d43;
}
var _d44=def.height;
if(_d44!=null){
page.height=_d44;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d45){
ViewBinding.superclass.handleCrawler.call(this,_d45);
switch(_d45.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d45.id==FocusCrawler.ID){
if(_d45.previousNode!=this._snapBinding.bindingElement){
_d45.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d45.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d46){
_d46.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d46.x+"px";
this.bindingElement.style.top=_d46.y+"px";
};
ViewBinding.prototype.setDimension=function(_d47){
_d47.h-=ViewBinding.VERTICAL_ADJUST;
_d47.w-=ViewBinding.HORIZONTAL_ADJUST;
_d47.w-=1;
if(_d47.h<0){
_d47.h=0;
}
if(_d47.w<0){
_d47.w=0;
}
this.bindingElement.style.width=String(_d47.w)+"px";
this.bindingElement.style.height=String(_d47.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d48){
this.isFlexBoxBehavior=false;
_d48.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d48.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d48.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d48;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d49=null;
if(this.isFreeFloating==true){
_d49=this._snapBinding.getBindingElement();
}else{
_d49=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d49;
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
ViewBinding.prototype.reload=function(_d4a){
this._isLoaded=false;
this.windowBinding.reload(_d4a);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d4b=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d4b=true;
}
}
if(!_d4b){
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
ViewBinding.newInstance=function(_d4f){
var _d50=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d4f);
var _d51=UserInterface.registerBinding(_d50,ViewBinding);
_d51.windowBinding=_d51.add(WindowBinding.newInstance(_d4f));
return _d51;
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
var _d59=this.bindingWindow.__doPostBack;
var _d5a=false;
if(!form.__isSetup&&this.isNonAjaxPage){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d5a){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d5b,_d5c){
if(!form.__isSetup&&this.isNonAjaxPage){
Application.lock(self);
_d5a=true;
}
self.manifestAllDataBindings();
_d59(_d5b,_d5c);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d5d,list){
var _d5f=this.bindingWindow.bindingMap.__REQUEST;
if(_d5f!=null&&this._isDotNet()){
switch(_d5d){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d5f.postback(_d5d);
}
}
break;
default:
_d5f.postback(_d5d);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d5d,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d60,list){
var _d62=this.getDescendantBindingsByType(WindowBinding);
_d62.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d60,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d66){
if(_d66.name==null||_d66.name==""){
return;
}
list.add({name:_d66.name,value:_d66.value});
});
var out="";
list.each(function(_d68){
out+=_d68.name+": "+_d68.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d69){
PageBinding.superclass.handleAction.call(this,_d69);
var _d6a=_d69.target;
switch(_d69.type){
case RootBinding.ACTION_PHASE_3:
if(_d6a==UserInterface.getBinding(this.bindingDocument.body)){
_d6a.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d6a);
}
_d69.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d6b=this.validateAllDataBindings();
if(_d6b){
this.doPostBack(_d6a);
}
}
_d69.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d69.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d6a.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d6a.key)){
this._initBlockers.del(_d6a.key);
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
var _d6d={handleAction:function(_d6e){
if(_d6e.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d6d);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d6d);
}else{
MessageQueue.udpdate();
}
_d69.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d6f,arg){
PageBinding.superclass.handleBroadcast.call(this,_d6f,arg);
switch(_d6f){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d71=arg;
if(!this._canPostBack&&!_d71){
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
PageBinding.prototype.doPostBack=function(_d73){
if(this._canPostBack){
if(_d73!=null&&this._isDotNet()){
var _d74=_d73.getCallBackID();
var _d75=_d73.getCallBackArg();
if(_d74!=null){
_d74=_d74.replace(/_/g,"$");
}else{
_d74="";
}
if(_d75==null){
_d75="";
}
this.bindingWindow.__doPostBack(_d74,_d75);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d76){
var _d77=true;
var _d78=this.bindingWindow.DataManager.getAllDataBindings();
while(_d78.hasNext()&&_d77){
var _d79=_d78.getNext();
if(_d79.isAttached){
var _d7a=_d79.validate();
if(_d77&&!_d7a){
_d77=false;
this.logger.debug("Invalid DataBinding: "+_d79.toString()+" ("+_d79.getName()+")");
if(_d76){
var _d7b=_d79.getAncestorBindingByType(TabPanelBinding);
if(_d7b!=null&&!_d7b.isVisible){
var _d7c=_d7b.getAncestorBindingByType(TabBoxBinding);
var _d7d=_d7c.getTabBinding(_d7b);
_d7c.select(_d7d);
}
}
break;
}
}
}
return _d77;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d7f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d7f.hasNext()){
var _d80=_d7f.getNext();
if(_d80.isAttached){
var _d81=_d80.manifest();
if(_d81!=null){
list.add(_d81);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d82=this.bindingWindow.DataManager.getAllDataBindings();
while(_d82.hasNext()){
var _d83=_d82.getNext();
if(_d83.isAttached){
_d83.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d84="";
if(!_d84&&this.labelfield){
var _d85=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d85!=null&&_d85.getLabel){
_d84=_d85.getLabel();
}else{
if(_d85!=null&&_d85.getValue){
_d84=_d85.getValue();
}
}
}
if(!_d84&&this.label){
_d84=this.label;
}
return _d84;
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
var _d88=this._cachedFocus.getBinding();
if(_d88){
_d88.blur();
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
var _d89=this.getProperty("width");
if(!_d89){
_d89=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d89;
}
if(this.height==null){
var _d8a=this.getProperty("height");
this.height=_d8a?_d8a:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d8b=this.getProperty("minheight");
if(_d8b!=null){
this.minheight=_d8b;
}
}
if(this.controls==null){
var _d8c=this.getProperty("controls");
this.controls=_d8c?_d8c:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d8d=this.getProperty("resizable");
this.isResizable=_d8d?_d8d:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.onBindingAttach=function(){
DialogPageBinding.superclass.onBindingAttach.call(this);
var _d8e=this.getProperty("image");
var _d8f=this.getDescendantElementsByLocalName("dialogvignette").getFirst();
if(_d8e&&_d8f){
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.setImage(_d8e);
_d8f.appendChild(this.labelBinding.bindingElement);
this.labelBinding.attach();
}
};
DialogPageBinding.prototype.setPageArgument=function(arg){
DialogPageBinding.superclass.setPageArgument.call(this,arg);
if(arg&&arg.image){
this.setProperty("image",arg.image);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d91){
if(_d91!=this.isAutoHeightLayoutMode){
if(_d91){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d91;
}
};
DialogPageBinding.prototype.handleAction=function(_d92){
DialogPageBinding.superclass.handleAction.call(this,_d92);
var _d93=_d92.target;
switch(_d92.type){
case PageBinding.ACTION_ATTACHED:
if(_d93!=this&&_d93.isFitAsDialogSubPage){
_d93.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d92.consume();
if(_d93.response!=null){
this.response=_d93.response;
switch(_d93.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d94){
var _d95=this.bindingWindow.bindingMap.buttonAccept;
if(_d95!=null){
_d95.setDisabled(_d94);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d96){
var _d97=CSSComputer.getPadding(this.bindingElement);
var _d98=CSSComputer.getBorder(this.bindingElement);
_d96+=_d97.top+_d97.bottom;
_d96+=_d98.top+_d98.bottom;
if(_d96>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d96+"px";
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
EditorPageBinding.prototype.handleAction=function(_da0){
EditorPageBinding.superclass.handleAction.call(this,_da0);
var _da1=_da0.target;
switch(_da0.type){
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
var _da2=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_da1.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_da2==-1){
_da2=0;
}
}else{
_da2++;
}
return res;
});
if(_da2>-1){
this._messengers.del(_da2);
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
_da0.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_da1.key,_da1);
if(_da1 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_da1.key);
if(_da1 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_da1==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_da1.getSelectedTabBinding();
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
_da0.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_da1==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_da0.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_da1==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_da0.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_da1==this._windowBinding){
if(_da1.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _da7=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_da7);
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
var _da8=this.bindingWindow.bindingMap.savebutton;
if(_da8!=null&&!_da8.isDisabled){
_da8.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _da9=this.bindingWindow.bindingMap.__REQUEST;
if(_da9!=null){
_da9.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _daa=this.bindingWindow.bindingMap.__REQUEST;
if(_daa!=null){
_daa.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_dab){
this._message=null;
switch(_dab){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_dab,this._messengers);
if(!this._messengers.hasEntries()){
if(_dab==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_dab;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_dab;
EditorPageBinding.superclass.postMessage.call(this,_dab,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_dab,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_dac,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_dac,arg);
switch(_dac){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _dae=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_dae);
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
var _daf=new List();
this._invalidBindings.each(function(key,_db1){
var list=_db1.getInvalidLabels();
if(list){
list.each(function(_db3){
_daf.add(_db3);
});
}
});
if(_daf.hasEntries()){
var _db4="";
while(_daf.hasNext()){
_db4+=_daf.getNext().toLowerCase();
if(_daf.hasNext()){
_db4+=", ";
}else{
_db4+=".";
}
}
var _db5=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_db5+" "+_db4);
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
EditorPageBinding.prototype.enableSave=function(_db6){
var _db7=this.bindingDocument.getElementById("broadcasterCanSave");
if(_db7){
var _db8=UserInterface.getBinding(_db7);
if(_db6){
_db8.enable();
}else{
_db8.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _db9=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_db9!=null){
UserInterface.getBinding(_db9).enable();
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
var _dba=this._windowBinding.getContentDocument().title;
if(_dba==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _dbb=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_dbd){
if(_dbd.name=="__EVENTTARGET"&&_dbb){
_dbd.value=_dbb;
}
list.add({name:_dbd.name,value:_dbd.value});
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
var _dbf=this.getProperty("responseid");
this.responseid=_dbf;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dc0){
ResponsePageBinding.superclass.handleAction.call(this,_dc0);
switch(_dc0.type){
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
WizardPageBinding.prototype.handleAction=function(_dc1){
WizardPageBinding.superclass.handleAction.call(this,_dc1);
var _dc2=_dc1.target;
switch(_dc1.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dc2);
}else{
_dc1.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dc2);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dc1.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dc1.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dc3){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dc5=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dc3);
}
if(_dc5){
_dc5.setDisabled(!_dc3);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dc6,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dc6,arg);
var self=this;
switch(_dc6){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dca){
};
MarkupAwarePageBinding.prototype._activate=function(_dcb){
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
var _dcc=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dcc.boxObject.getDimension().w;
_dcc.hide();
var _dcd=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dcd+"px";
var self=this;
var _dcf=this.bindingWindow.bindingMap.moreactionsbutton;
_dcf.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dd0){
self._showMoreActions();
_dd0.consume();
}});
var _dd1=this.bindingWindow.bindingMap.moreactionspopup;
_dd1.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dd2){
var item=_dd2.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dd4,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dd4,arg);
switch(_dd4){
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
var _dd8=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dd8!=null){
_dd8.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dd9=this.bindingWindow.WindowManager;
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
var _dda=new String("");
this._actionProfile.each(function(_ddb,list){
list.each(function(_ddd){
_dda+=_ddd.getHandle()+";"+_ddd.getKey()+";";
if(_ddd.isDisabled()){
_dda+="isDisabled='true';";
}
});
});
return _dda;
};
SystemToolBarBinding.prototype.handleAction=function(_dde){
SystemToolBarBinding.superclass.handleAction.call(this,_dde);
switch(_dde.type){
case ButtonBinding.ACTION_COMMAND:
var _ddf=_dde.target;
this._handleSystemAction(_ddf.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_de0){
if(_de0!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _de2=list.getFirst();
var _de3=_de2.node;
}
SystemAction.invoke(_de0,_de3);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_de6,list){
var _de8=new List();
list.reset();
while(list.hasNext()){
var _de9=list.getNext();
var _dea=null;
if(_de9.isInToolBar()){
if(_de9.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dea=self.getToolBarButtonBinding(_de9);
}
}
if(_dea!=null){
_de8.add(_dea);
}
}
if(_de8.hasEntries()){
var _deb=ToolBarGroupBinding.newInstance(doc);
_de8.each(function(_dec){
_deb.add(_dec);
});
self.addLeft(_deb);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _ded=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dee=this.bindingElement.offsetWidth-this._moreActionsWidth;
if(Localization.isUIRtl){
_dee=this.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _def=0;
var _df0=new List();
var _df1,_df2=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_df1=_df2.getNext())!=null){
if(!_df1.isVisible){
_df1.show();
}
_def+=_df1.boxObject.getDimension().w;
if(_def>=_dee){
_df0.add(_df1);
_df1.hide();
}
}
if(_df0.hasEntries()){
var _df3=_df0.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_df3).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_df1=_df0.getNext())!=null){
this._moreActions.add(_df1.associatedSystemAction);
}
_ded.show();
}else{
this._moreActions=null;
_ded.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _df4=this.bindingWindow.bindingMap.moreactionspopup;
_df4.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_df4.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_df4.add(item);
}
_df4.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_df6){
var _df7=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _df8=_df6.getLabel();
var _df9=_df6.getToolTip();
var _dfa=_df6.getImage();
var _dfb=_df6.isDisabled();
if(_dfa){
_df7.setImage(_dfa);
}
if(_df8){
_df7.setLabel(_df8);
}
if(_df9){
_df7.setToolTip(_df9);
}
if(_df6.isDisabled()){
_df7.disable();
}
_df7.associatedSystemAction=_df6;
return _df7;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dfc=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dfc!=null){
_dfc.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dfd){
var _dfe=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dfd);
return UserInterface.registerBinding(_dfe,SystemToolBarBinding);
};
SystemToolBarBinding.prototype.setPosition=function(_dff){
this.bindingElement.style.left=_dff.x+"px";
this.bindingElement.style.top=_dff.y+"px";
};
SystemToolBarBinding.prototype.setDimension=function(_e00){
_e00.h-=ViewBinding.VERTICAL_ADJUST;
_e00.w-=ViewBinding.HORIZONTAL_ADJUST;
_e00.w-=1;
if(_e00.h<0){
_e00.h=0;
}
if(_e00.w<0){
_e00.w=0;
}
this.bindingElement.style.width=String(_e00.w)+"px";
this.bindingElement.style.height=String(_e00.h)+"px";
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
SystemTreeBinding.prototype.add=function(_e01){
var _e02=SystemTreeBinding.superclass.add.call(this,_e01);
if(!this._defaultTreeNode){
if(_e01 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_e01;
}
}
return _e02;
};
SystemTreeBinding.prototype.handleAction=function(_e03){
SystemTreeBinding.superclass.handleAction.call(this,_e03);
var _e04=_e03.target;
switch(_e03.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_e04.key);
this._updateFocusedNode();
_e03.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_e03.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_e04.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_e03.consume();
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
var _e06=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_e06);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_e07){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_e07);
var reg=this._entityTokenRegistry;
var _e09=_e07.node.getEntityToken();
if(reg.has(_e09)){
reg.get(_e09).add(_e07);
}else{
reg.set(_e09,new List([_e07]));
}
var _e0a=null;
if(this.isLockedToEditor){
if(_e09==StageBinding.entityToken){
if(_e07.node.isTreeLockEnabled()){
_e0a=_e07;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_e07.node.getHandle()){
_e0a=_e07;
}
}
}
if(_e0a!=null){
this.focusSingleTreeNodeBinding(_e0a);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_e0b){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_e0b);
var reg=this._entityTokenRegistry;
var _e0d=_e0b.node.getEntityToken();
if(reg.has(_e0d)){
var list=reg.get(_e0d);
list.del(_e0b);
if(!list.hasEntries()){
reg.del(_e0d);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_e0b.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_e0b.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e11=this._refreshingTreeNodes;
if(_e11.hasEntries()&&_e11.has(key)){
_e11.del(key);
if(!_e11.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e12=StageBinding.entityToken;
if(_e12!=null){
this._focusTreeNodeByEntityToken(_e12);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e13=false;
var _e14=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e13=false;
}else{
if(_e14.hasEntries()){
_e13=true;
while(_e13&&_e14.hasNext()){
var _e15=_e14.getNext();
if(!_e15.isDraggable){
_e13=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e13;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e16,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e16,arg);
switch(_e16){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e16,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e16);
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
var self=this,_e1a=arg;
setTimeout(function(){
if(_e1a!=null){
self._focusTreeNodeByEntityToken(_e1a);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e1c=tab.perspectiveNode==null;
if(!_e1c){
_e1c=tab.perspectiveNode==this.perspectiveNode;
}
if(_e1c){
var self=this,_e1e=tab.getEntityToken();
setTimeout(function(){
if(_e1e!=null){
self._focusTreeNodeByEntityToken(_e1e);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e1f,_e20){
this.isLockFeatureFocus=true;
var _e21=null;
if(this._entityTokenRegistry.has(_e1f)){
var list=this._entityTokenRegistry.get(_e1f);
list.each(function(tn){
var _e24=true;
if(tn.node.isTreeLockEnabled()){
_e21=tn;
_e24=false;
}
return _e24;
});
if(_e21!=null){
if(!_e21.isFocused){
this.focusSingleTreeNodeBinding(_e21,true);
}else{
_e21.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e21==null&&_e20!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e1f);
self._focusTreeNodeByEntityToken(_e1f,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e26){
var _e27=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e28=this.getRootTreeNodeBindings();
while(_e28.hasNext()){
var _e29=_e28.getNext();
_e27.add(_e29.node.getEntityToken());
}
}else{
_e27.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e27.hasNext()){
var _e2a=_e27.getNext();
var _e2b=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e2a,_e26,_e2b);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e2e=this._treeNodeBindings;
var _e2f=new Map();
function fix(_e30,list){
if(!_e30.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e2e.has(node.getHandle())){
var _e33=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e2f.set(node.getHandle(),_e33);
_e30.add(_e33);
}
});
_e30.attachRecursive();
}
}
_e30.open(true);
}
map.each(function(_e34,list){
if(_e2e.has(_e34)){
var _e36=_e2e.get(_e34);
fix(_e36,list);
}else{
if(_e2f.has(_e34)){
var _e37=_e2f.get(_e34);
fix(_e37,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e38,arg){
switch(_e38){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e3a=arg;
if(_e3a!=null){
this._invokeServerRefresh(_e3a);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e3b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e3b;
_e3b.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e3b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e3b;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e3c){
if(_e3c!=null&&_e3c=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e3c)){
var list=this._entityTokenRegistry.get(_e3c).reset();
this._refreshToken=_e3c;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e3e=list.getNext();
this._refreshingTreeNodes.set(_e3e.key,true);
setTimeout(function(){
_e3e.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e3f=this.getFocusedTreeNodeBindings().getFirst();
if(_e3f){
var _e40=_e3f.getLabel();
var _e41=_e3f.getAncestorBindingByLocalName("treenode");
if(_e41){
_e3f=_e41;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e3f.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e42=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e42,[_e40]);
}
_e3f.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e43=SystemTreeBinding.clipboard;
if(_e43){
var type=_e43.dragType;
var _e45=this.getFocusedTreeNodeBindings().getFirst();
if(_e45.dragAccept){
if(_e45.acceptor.isAccepting(type)){
this._performPaste(_e45);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e46){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e46.node.hasDetailedDropSupport()){
if(_e46.node.hasChildren()){
var _e48=_e46.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e49,_e4a){
if(_e49==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e4b=_e4a.get("switch");
var _e4c=_e4a.get("sibling");
if(_e4b=="after"){
_e4c++;
}
var _e4d=_e46.accept(SystemTreeBinding.clipboard,_e4c);
if(_e4d){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e48);
}else{
Application.lock(self);
var _e4e=_e46.accept(SystemTreeBinding.clipboard,0);
if(_e4e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e4e=_e46.accept(SystemTreeBinding.clipboard,0);
if(_e4e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e4f=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e4f!=null){
this._focusTreeNodeByEntityToken(_e4f);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e50){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e50){
this.blurSelectedTreeNodes();
var _e51=this.getRootTreeNodeBindings();
_e51.each(function(_e52){
if(_e52.isContainer&&_e52.isOpen){
_e52.close();
_e52.hasBeenOpened=false;
_e52.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e53){
if(_e53!=this.isLockedToEditor){
this.isLockedToEditor=_e53;
if(_e53){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e55=this.getRootTreeNodeBindings();
_e55.each(function(_e56){
var _e57=_e56.getOpenSystemNodes();
if(_e57!=null&&_e57.hasEntries()){
list.merge(_e57);
}else{
if(_e56.isOpen){
list.add(_e56.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e58){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e58);
if(_e58!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e59){
if(_e59){
var list=new List(_e59.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e5b=new Map();
var _e5c=this.getFocusedTreeNodeBindings().getFirst();
var _e5d=_e5c.node.getActionProfile();
if(_e5d!=null){
var self=this;
_e5d.each(function(_e5f,list){
var _e61=new List();
list.each(function(_e62){
if(_e62.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e62.getGroupName()]){
_e61.add(_e62);
}
}
});
if(_e61.hasEntries()){
_e5b.set(_e5f,_e61);
}
});
}
_e5b.activePosition=this._activePosition;
var _e63=_e5c.node.getPropertyBag();
if(_e63&&_e63.Uri&&_e63.ElementType==="application/x-composite-page"){
_e5b.Uri=_e63.Uri;
}
return _e5b;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e64,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e64,arg);
switch(_e64){
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
var _e69=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e69.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e6a=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e6a.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e6b){
SystemTreePopupBinding.superclass.handleAction.call(this,_e6b);
switch(_e6b.type){
case MenuItemBinding.ACTION_COMMAND:
var _e6c=_e6b.target;
var _e6d=_e6c.associatedSystemAction;
if(_e6d){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e6f=list.getFirst();
var _e70=_e6f.node;
}
SystemAction.invoke(_e6d,_e70);
}else{
var cmd=_e6c.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e73=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e73=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e73=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e73=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e73=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e73){
setTimeout(function(){
EventBroadcaster.broadcast(_e73);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e74=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e74.hasNext()){
var _e75=UserInterface.getBinding(_e74.getNext());
if(!_e75.getProperty("rel")){
_e75.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e77=new List();
var self=this;
this._actionProfile.each(function(_e79,list){
var _e7b=MenuGroupBinding.newInstance(doc);
list.each(function(_e7c){
var _e7d=self.getMenuItemBinding(_e7c);
_e7b.add(_e7d);
});
_e77.add(_e7b);
});
_e77.reverse();
while(_e77.hasNext()){
this._bodyBinding.addFirst(_e77.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e7e){
var _e7f=MenuItemBinding.newInstance(this.bindingDocument);
var _e80=_e7e.getLabel();
var _e81=_e7e.getToolTip();
var _e82=_e7e.getImage();
var _e83=_e7e.getDisabledImage();
var _e84=_e7e.isCheckBox();
if(_e80){
_e7f.setLabel(_e80);
}
if(_e81){
_e7f.setToolTip(_e81);
}
if(_e82){
_e7f.imageProfile=new ImageProfile({image:_e82,imageDisabled:_e83});
}
if(_e84){
_e7f.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e7e.isChecked()){
_e7f.check(true);
}
}
if(_e7e.isDisabled()){
_e7f.disable();
}
_e7f.associatedSystemAction=_e7e;
return _e7f;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e88=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e88=UserInterface.getBinding(node);
if(_e88.isDisabled){
_e88=null;
}
}
break;
}
if(_e88!=null&&_e88.node!=null&&_e88.node.getActionProfile()!=null){
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
var _e89=this.node.getLabel();
if(_e89){
this.setLabel(_e89);
}
var _e8a=this.node.getToolTip();
if(_e8a){
this.setToolTip(_e8a);
}
var _e8b=this.node.getHandle();
if(_e8b){
this.setHandle(_e8b);
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
var _e8e="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e8e+=list.getNext();
if(list.hasNext()){
_e8e+=" ";
}
}
this.setProperty("dragaccept",_e8e);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e90){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e90);
switch(_e90.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e90.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e90.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e91,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e91,arg);
switch(_e91){
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
var _e94=null;
var _e95=this.node.getImageProfile();
if(_e95){
if(this.isOpen){
_e94=_e95.getActiveImage();
}else{
_e94=_e95.getDefaultImage();
}
}
if(!_e94){
_e94=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e94;
};
SystemTreeNodeBinding.prototype.open=function(_e96){
var _e97=this.isContainer&&!this.isOpen;
var _e98=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e97&&(_e98||SystemTreeBinding.HAS_NO_MEMORY)&&_e96!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e99=null;
if(this.isContainer){
_e99=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e99);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e9b){
if(_e9b!=null){
this._refreshBranch(_e9b);
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
var _e9c=new List();
var _e9d=this.node.getChildren();
this.empty();
if(_e9d.hasEntries()){
this._insertTreeNodesRegulated(_e9d);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e9e){
var _e9f=0;
var _ea0=new List([]);
while(_e9e.hasEntries()&&_e9f<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _ea1=SystemTreeNodeBinding.newInstance(_e9e.extractFirst(),this.bindingDocument);
_ea1.autoExpand=this.autoExpand;
this.add(_ea1);
_ea1.attach();
_e9f++;
if(this.autoExpand){
if(_e9f==1&&!_e9e.hasEntries()||LocalStore.openedNodes.has(_ea1.node)){
_ea0.add(_ea1);
}
}
}
if(_e9e.hasEntries()){
this._insertBufferTreeNode(_e9e);
}
_ea0.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_ea4){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _ea6=this.node.getDescendantBranch(list);
if(_ea6.hasEntries()){
this.XXX(_ea6);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_ea7){
var self=this;
var map=new Map();
this.empty();
_ea7.each(function(key,_eab){
if(_eab.hasEntries()){
_eab.each(function(node){
var _ead=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ead);
if(map.has(key)){
var _eae=map.get(key);
_eae.add(_ead);
_eae.isOpen=true;
_eae.hasBeenOpened=true;
node.searchToken=_eae.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_ead);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_ea7.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _eaf=new TreeCrawler();
var _eb0=new List();
_eaf.mode=TreeCrawler.MODE_GETOPEN;
_eaf.crawl(this.bindingElement,_eb0);
if(_eb0.hasEntries()){
_eb0.extractFirst();
}
_eaf.dispose();
return _eb0;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _eb1=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_eb1=new List([this.node]);
list.each(function(_eb3){
_eb1.add(_eb3.node);
});
}
return _eb1;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_eb4,_eb5){
var _eb6=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_eb4 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_eb4.node.getData(),this.node.getData(),_eb5?_eb5:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_eb6);
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
SystemTreeNodeBinding.newInstance=function(node,_eba){
var _ebb=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_eba);
var _ebc=UserInterface.registerBinding(_ebb,SystemTreeNodeBinding);
_ebc.node=node;
return _ebc;
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
SystemPageBinding.prototype.setPageArgument=function(_ebd){
this.node=_ebd;
SystemPageBinding.superclass.setPageArgument.call(this,_ebd);
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
var _ebe=this.node.getChildren();
if(_ebe.hasEntries()){
while(_ebe.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ebe.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ec0=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ec0.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ec2=new TreeCrawler();
var _ec3=new List();
_ec2.mode=TreeCrawler.MODE_GETOPEN;
_ec2.crawl(this.bindingElement,_ec3);
_ec2.dispose();
var list=new List([this.node]);
_ec3.each(function(_ec5){
list.add(_ec5.node);
});
this._tree.empty();
var _ec6=this.node.getDescendantBranch(list);
if(_ec6.hasEntries()){
var self=this;
var map=new Map();
_ec6.each(function(key,_eca){
_eca.each(function(node){
var _ecc=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ecc);
if(map.has(key)){
var _ecd=map.get(key);
_ecd.add(_ecc);
_ecd.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ecc);
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
SystemPageBinding.prototype.handleAction=function(_ece){
SystemPageBinding.superclass.handleAction.call(this,_ece);
switch(_ece.type){
case ButtonBinding.ACTION_COMMAND:
var _ecf=_ece.target;
switch(_ecf.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ecf.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ed0,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ed0,arg);
switch(_ed0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ed2=arg;
if(this.node&&this.node.getEntityToken()==_ed2){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ed2);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ed2);
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
StageContainerBinding.prototype.handleBroadcast=function(_ed4,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ed4,arg);
var _ed6=this.bindingWindow.WindowManager;
switch(_ed4){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ed6.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ed6.WINDOW_RESIZED_BROADCAST:
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
var _ed8=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ed8.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ed9){
if(StageBinding.isViewOpen(_ed9)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ed9);
}else{
var _eda=ViewDefinitions[_ed9];
StageBinding.presentViewDefinition(_eda);
}
};
StageBinding.isViewOpen=function(_edb){
return StageBinding.bindingInstance._activeViewDefinitions[_edb]!=null;
};
StageBinding.selectPerspective=function(_edc){
StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(_edc);
};
StageBinding.presentViewDefinition=function(_edd){
if(_edd.label!=null){
var _ede=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ede,[_edd.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_edd);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ee0,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ee2=System.getPerspectiveNodes();
if(_ee2.hasEntries()){
this._initializeSystemViewDefinitions(_ee2);
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
var _ee4=null;
if(LocalStore.isEnabled){
_ee4=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ee4&&ViewDefinitions[_ee4]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ee4));
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
var _ee6=root.getActionProfile();
if(_ee6&&_ee6.hasEntries()){
var _ee7=top.app.bindingMap.toolsmenugroup;
if(_ee7){
_ee6.each(function(_ee8,list){
list.each(function(_eea){
var item=MenuItemBinding.newInstance(_ee7.bindingDocument);
item.setLabel(_eea.getLabel());
item.setToolTip(_eea.getToolTip());
item.setImage(_eea.getImage());
item.setDisabled(_eea.isDisabled());
item.associatedSystemAction=_eea;
var _eec=_ee7;
var tag=_eea.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_eec=top.app.bindingMap.translationsmenugroup;
break;
}
}
_eec.add(item);
});
});
_ee7.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eee){
while(_eee.hasNext()){
var node=_eee.getNext();
var _ef0=node.getHandle();
ViewDefinitions[_ef0]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ef1){
StageBinding.superclass.handleAction.call(this,_ef1);
var _ef2=_ef1.target;
switch(_ef1.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ef2;
this._inflateBinding(_ef2);
_ef1.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ef2;
this._inflateBinding(_ef2);
_ef1.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(app.bindingMap.explorermenu);
_ef1.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ef2 instanceof DockBinding){
switch(_ef2.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ef2.reference,_ef2);
break;
}
this.handleAttachedDock(_ef2);
_ef1.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ef2 instanceof DockBinding){
this.handleSelectedDockTab(_ef2.getSelectedTabBinding());
_ef1.consume();
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
_ef1.consume();
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
_ef1.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ef1);
};
StageBinding.prototype.handleBroadcast=function(_ef4,arg){
StageBinding.superclass.handleBroadcast.call(this,_ef4,arg);
switch(_ef4){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ef6=arg;
this._dontView(_ef6);
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
StageBinding.prototype._showStart=function(_ef8){
if(_ef8!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _efb=this.bindingWindow.bindingMap.maindecks;
if(_ef8){
_efb.select("startdeck");
view.show();
}else{
view.hide();
_efb.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ef8;
}
};
StageBinding.prototype._inflateBinding=function(_efc){
for(var _efd in ViewDefinitions){
var _efe=ViewDefinitions[_efd];
if(_efe instanceof SystemViewDefinition){
_efc.mountDefinition(_efe);
}
}
var _eff=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_eff){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f02=new StageCrawler();
_f02.mode=mode;
_f02.crawl(this.bindingElement);
_f02.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_f03){
var _f04=_f03.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_f04);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_f04));
}
};
StageBinding.prototype.handleAttachedDock=function(_f05){
var _f06=_f05.getTabBindings();
if(_f06.hasEntries()){
while(_f06.hasNext()){
var _f07=_f06.getNext();
var _f08=_f07.getHandle();
if(_f08){
if(_f08=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _f09=ViewDefinitions[_f08];
if(_f09){
this._view(_f05,_f07,_f09,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_f08+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_f0a){
var _f0b=null;
var _f0c=false;
switch(_f0a.position){
case Dialog.MODAL:
_f0b=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_f0b=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_f0a.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_f0b=this._dockBindings.get(_f0a.position);
break;
case DockBinding.EXTERNAL:
window.open(_f0a.url);
_f0c=true;
break;
default:
var _f0d=this._decksBinding.getSelectedDeckBinding();
_f0b=_f0d.getDockBindingByReference(_f0a.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _f0e=this.bindingWindow.bindingMap.maindecks;
_f0e.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_f0c=true;
}
break;
}
if(!_f0c){
if(_f0b!=null){
this._view(_f0b,null,_f0a,true);
}else{
throw "StageBinding: Could not position view: "+_f0a.handle;
}
}
};
StageBinding.prototype._view=function(_f0f,_f10,_f11,_f12){
var _f13=_f11.handle;
if(_f11.isMutable){
_f13+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f13]){
var _f14=ViewBinding.getInstance(_f13);
if(_f14!=null){
_f14.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f13);
}
}else{
this._activeViewDefinitions[_f13]=_f11;
Application.lock(this);
switch(_f0f.constructor){
case DockBinding:
if(_f12){
_f0f.prepareNewView(_f11);
}else{
_f0f.prepareOpenView(_f11,_f10);
}
break;
case StageDialogBinding:
if(_f12){
_f0f.prepareNewView(_f11);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f15){
if(this._activeViewDefinitions[_f15]!=null){
delete this._activeViewDefinitions[_f15];
}else{
this.logger.debug("Could not unregister active view: "+_f15);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f16){
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
this.addFilter(function(_f18){
var _f19=UserInterface.getBinding(_f18);
var _f1a=null;
if(_f19){
switch(_f19.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f19.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f19.handleUnMaximization();
break;
}
break;
case DockBinding:
_f1a=NodeCrawler.SKIP_NODE;
break;
}
}
return _f1a;
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
var _f1b=null;
this._dialogs.each(function(_f1c){
if(!_f1c.isVisible){
_f1b=_f1c;
}
return _f1b!=null;
});
if(!_f1b){
this._newInstance();
_f1b=this._dialogs.getLast();
}
_f1b.setModal(false);
return _f1b;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f1d=this.getInstance();
_f1d.setModal(true);
return _f1d;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f1e=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f1e);
_f1e.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f1f){
if(_f1f instanceof DialogViewDefinition){
var _f20=ViewBinding.newInstance(this.bindingDocument);
_f20.setDefinition(_f1f);
_f20.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f1f.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f1f.handler)){
this._dialogResponseHandler=_f1f.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f20;
this._body.add(_f20);
_f20.attach();
_f20.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f21){
StageDialogBinding.superclass.handleAction.call(this,_f21);
var _f22=_f21.target;
switch(_f21.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f22);
_f21.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f22.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f21.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f22.response){
this._handleDialogPageResponse(_f22);
}
_f21.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f21.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f21.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f21.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f21.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f21.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f21.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f21.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f21.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f22==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f23,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f23,arg);
switch(_f23){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f25){
var _f26=new FitnessCrawler();
var list=new List();
if(_f25){
_f26.mode=FitnessCrawler.MODE_BRUTAL;
}
_f26.crawl(this.bindingElement,list);
_f26.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f28){
_f28.fit(_f25);
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
var _f29=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f29){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f2b){
var cmd=_f2b.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f2d){
if(_f2d.bindingDocument==this._viewBinding.getContentDocument()){
if(_f2d instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f2d);
}
this._pageBinding=_f2d;
if(_f2d.height=="auto"){
_f2d.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f2d);
_f2d.enableAutoHeightLayoutMode(false);
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
if(_f2d.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f2d);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f2e){
var _f2f=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f2f){
var _f30=UserInterface.getBinding(_f2f);
_f30.setDisabled(_f2e);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f31){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f31.response,_f31.result!=null?_f31.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f33){
if(_f33.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f33);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f35){
switch(_f35.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f35.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f35.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f36){
var _f37=_f36.label;
var _f38=_f36.image;
var _f39=_f36.width;
var _f3a=_f36.height;
var _f3b=_f36.controls;
var _f3c=_f36.isResizable;
if(_f37){
this.setLabel(_f37);
}
if(_f38){
this.setImage(_f38);
}
if(_f39||_f3a){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f39?_f39:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f3a!=null&&_f3a!="auto")?_f3a:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f3b){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f40=new List(_f3b.split(" "));
while((type=_f40.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f3c!=this._isResizable){
this.setResizable(_f3c);
}
if(_f3a=="auto"){
this._fixAutoHeight(_f36);
}
if(_f36==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f41){
var dim=this.getDimension();
var _f43=0;
var _f44=0;
if(_f41.isDialogSubPage){
_f41=this._pageBinding;
}
if(this._isFirstPage){
_f43=_f41.width!=null?_f41.width:dim.w;
}else{
_f43=dim.w;
}
_f44=_f41.bindingElement.offsetHeight;
_f44+=this._titlebar.bindingElement.offsetHeight;
_f44+=4;
_f44+=4;
if(_f44<dim.h){
_f44=dim.h;
}
if(_f41.minheight!=null){
if(_f44<_f41.minheight){
_f44=_f41.minheight;
}
}
this.setDimension(new Dimension(_f43,_f44));
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
StageDialogBinding.newInstance=function(_f47){
var _f48=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f47);
var _f49=UserInterface.registerBinding(_f48,StageDialogBinding);
_f49.setProperty("controls","minimize maximize close");
return _f49;
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
this.addFilter(function(_f4a,list){
var _f4c=null;
var _f4d=UserInterface.getBinding(_f4a);
if(!_f4d.isVisible){
_f4c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f4c;
});
this.addFilter(function(_f4e,list){
var _f50=null;
var _f51=UserInterface.getBinding(_f4e);
if(_f51.isAttached){
if(Interfaces.isImplemented(IFit,_f51)){
if(!_f51.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f51);
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
StageDecksBinding.prototype.mountDefinition=function(_f52){
var _f53=StageDeckBinding.newInstance(this.bindingDocument);
_f53.handle=_f52.handle;
_f53.perspectiveNode=_f52.node;
_f53.definition=_f52;
this._decks[_f53.handle]=_f53;
this.add(_f53);
_f53.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f54){
var _f55=this._decks[_f54];
StageBinding.perspectiveNode=_f55.perspectiveNode;
this.select(_f55);
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
StageDeckBinding.prototype.handleAction=function(_f56){
StageDeckBinding.superclass.handleAction.call(this,_f56);
var _f57=_f56.target;
switch(_f56.type){
case WindowBinding.ACTION_LOADED:
if(_f57==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
var _f58=this.windowBinding.getContentDocument();
var _f59=this.windowBinding.getContentWindow().bindingMap.browserpanel;
var _f5a=ViewBinding.newInstance(_f58);
_f5a.setType(ViewBinding.TYPE_EXPLORERVIEW);
var _f5b=ViewDefinitions["Composite.Management.Browser"];
_f5b.argument["SystemViewDefinition"]=this.definition;
_f5a.setDefinition(_f5b);
_f59.add(_f5a);
_f5a.attach();
_f5a.initialize();
this._viewBinding=_f5a;
_f56.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f57 instanceof DockBinding){
this._dockBindings.set(_f57.reference,_f57);
_f57.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f56.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f56.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f56);
StageDeckBinding.superclass.handleAction.call(this,_f56);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f5d=new StageCrawler();
_f5d.mode=mode;
_f5d.crawl(this.windowBinding.getContentDocument().body);
_f5d.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f5e){
return this._dockBindings.get(_f5e);
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
StageDeckBinding.newInstance=function(_f60){
var _f61=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f60);
var _f62=UserInterface.registerBinding(_f61,StageDeckBinding);
return _f62;
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
StageSplitBoxBinding.prototype.handleAction=function(_f63){
StageSplitBoxBinding.superclass.handleAction.call(this,_f63);
StageBoxAbstraction.handleAction.call(this,_f63);
var _f64=_f63.target;
var _f65=null;
var _f66=null;
switch(_f63.type){
case DockBinding.ACTION_EMPTIED:
_f66=this.getChildBindingByLocalName("splitter");
if(_f66.isVisible){
_f66.hide();
}
_f65=this.getDescendantBindingsByLocalName("dock");
if(_f65.getFirst().isEmpty&&_f65.getLast().isEmpty){
if(_f65.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f63.consume();
break;
case DockBinding.ACTION_OPENED:
_f65=this.getDescendantBindingsByLocalName("dock");
if(!_f65.getFirst().isEmpty&&!_f65.getLast().isEmpty){
_f66=this.getChildBindingByLocalName("splitter");
if(!_f66.isVisible){
_f66.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f63.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f64!=this){
_f66=this.getChildBindingByLocalName("splitter");
if(_f66.isVisible){
_f66.hide();
}
this.invokeLayout();
_f63.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f64!=this){
var _f67=this.getChildBindingsByLocalName("splitpanel");
if(_f67.getFirst().isVisible&&_f67.getLast().isVisible){
_f66=this.getChildBindingByLocalName("splitter");
if(!_f66.isVisible){
_f66.show();
}
}
this.invokeLayout();
_f63.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f68){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f68);
switch(_f68.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f68.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f69=this.getChildBindingsByLocalName("splitpanel");
return _f69.getFirst().isVisible&&_f69.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f6a=this.getChildBindingsByLocalName("splitpanel");
return _f6a.getFirst().isFixed&&_f6a.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f6b){
StageSplitPanelBinding.superclass.handleAction.call(this,_f6b);
StageBoxAbstraction.handleAction.call(this,_f6b);
switch(_f6b.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f6b.type==StageSplitBoxBinding.ACTION_HIDE){
_f6b.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f6b.type==DockBinding.ACTION_EMPTIED){
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
if(_f6b.type==StageSplitBoxBinding.ACTION_SHOW){
_f6b.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f6e=_f6b.target;
if(_f6e!=this&&_f6e.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f6f=_f6e._containingSplitBoxBinding;
if(_f6f.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f70=_f6f.getChildBindingsByLocalName("splitpanel");
var _f71=_f70.getFirst();
var _f72=_f70.getLast();
if(this.isFixed==true){
if(!_f71.isFixed||!_f72.isFixed||(!_f6f.hasBothPanelsVisible()&&_f6e.isMinimizedForReal)){
this.setFix(false);
_f6b.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f6f.hasBothPanelsFixed()||(!_f6f.hasBothPanelsVisible()&&_f6e.isMinimizedForReal)){
this.setFix(_f6e.getContainedDock().getHeight());
_f6b.consume();
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
var _f73=this.getContainedDock();
if(_f73){
if(this.isMaximizePrepared==true){
}else{
_f73.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f74=this.getContainedDock();
if(_f74){
if(_f74.type==DockBinding.TYPE_EDITORS){
if(_f74.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f74.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f75=this.getContainedDock();
if(_f75){
_f75.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f75);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f76=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f77=this.getContainedDock();
if(_f77){
_f77.collapse(_f76);
if(!_f76){
this.setFix(_f77.getHeight());
}else{
this.setFix(_f77.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f77&&_f77.isActive){
_f77.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f77);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f78){
var _f79=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f7a=this.getContainedDock();
if(_f7a){
if(this.isMinimized==true){
_f7a.unCollapse(_f79);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f78){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f7a){
_f7a.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f7a);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f7b){
var _f7c=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f7c=false;
}
}
if(_f7c==true){
this._invisibilize(_f7b);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f7e){
if(_f7e!=this._isInvisibilized){
if(_f7e){
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
StageSplitterBinding.prototype.onDragStart=function(_f7f){
var _f80=top.app.bindingMap.stagesplittercover;
var _f81=this._containingSplitBoxBinding.getOrient();
switch(_f81){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f80.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f80.bindingElement.style.cursor="n-resize";
break;
}
_f80.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f81);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f87){
this._orient=_f87;
this.attachClassName(_f87);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f89=true;
var _f8a=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f8a=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f89=false;
break;
}
if(_f89){
this.bindingElement.style.left=pos.x+"px";
}
if(_f8a){
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
StageBoxAbstraction.handleAction=function(_f8c){
switch(_f8c.type){
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
if(_f8c.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f8c.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f8d=this.bindingElement.style;
_f8d.position="absolute";
_f8d.width="100%";
_f8d.height="100%";
_f8d.top="0";
_f8d.left="0";
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
var _f8e=this.bindingElement.style;
_f8e.position="relative";
_f8e.width="auto";
_f8e.height="auto";
_f8e.top="auto";
_f8e.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f8f,_f90){
var _f91=_f8f.bindingElement.style;
var _f92=_f8f.bindingElement.parentNode;
var box=_f8f._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f90){
_f8f._unmodifiedFlexMethod=_f8f.flex;
_f8f.flex=function(){
_f91.width=_f92.offsetWidth+"px";
_f91.height=_f92.offsetHeight+"px";
};
}else{
_f91.width="100%";
_f91.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f91.width="auto";
_f91.height="auto";
box.reflex(true);
},0);
}
_f8f.flex=_f8f._unmodifiedFlexMethod;
_f8f._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f94){
var _f95=_f94.target;
switch(_f94.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f95 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f94);
_f94.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f94.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f96){
var mode=null;
switch(_f96.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f98){
StageMenuBarBinding.superclass.handleAction.call(this,_f98);
switch(_f98.type){
case MenuItemBinding.ACTION_COMMAND:
var _f99=_f98.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f99){
SystemAction.invoke(_f99,this._rootNode);
}
}
_f98.consume();
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
var _f9a=this.getProperty("handle");
if(_f9a){
this._handle=_f9a;
if(StageBinding.isViewOpen(_f9a)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f9a);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f9c){
this.setProperty("handle",_f9c);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f9d,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f9d,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f9d){
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
StageViewMenuItemBinding.newInstance=function(_f9f){
var _fa0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f9f);
UserInterface.registerBinding(_fa0,StageViewMenuItemBinding);
return UserInterface.getBinding(_fa0);
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
StageStatusBarBinding.prototype.setLabel=function(_fa1){
this._label.setLabel(_fa1);
};
StageStatusBarBinding.prototype.setImage=function(_fa2){
this._label.setImage(_fa2);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_fa3){
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
var _fa4=app.bindingMap.stagedecks.getSelectedDeckBinding();
var _fa5=_fa4._viewBinding;
var _fa6=_fa5.getContentWindow().bindingMap.browserpage._viewBinding.getContentWindow().bindingMap.tree;
var _fa7=_fa6.getFocusedTreeNodeBindings();
if(!_fa7.hasEntries()&&StageBinding.treeSelector){
_fa7=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _fa7;
};
ExplorerBinding.saveFocusedNodes=function(){
var _fa8=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_fa8.each(function(_fa9){
LocalStore.focuseNodes.add(_fa9.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _faa=LocalStore.focuseNodes.getEntityTokens();
var _fab=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _fac=_fab.getAssociatedView();
var _fad=_fac.getContentWindow().bindingMap.tree;
_faa=new List(TreeService.GetCurrentLocaleEntityTokens(_faa.toArray()));
_faa.each(function(_fae){
_fad._focusTreeNodeByEntityToken(_fae);
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
ExplorerBinding.prototype.handleAction=function(_faf){
ExplorerBinding.superclass.handleAction.call(this,_faf);
var _fb0=_faf.target;
switch(_faf.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_faf.consume();
break;
case Binding.ACTION_DRAG:
if(_fb0 instanceof ExplorerSplitterBinding){
_fb0.dragger.registerHandler(this);
}
_faf.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_fb2){
this._menuBinding.setSelectionByHandle(_fb2);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fb3){
if(_fb3 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fb3);
this._menuBinding.mountDefinition(_fb3);
}
};
ExplorerBinding.prototype.onDragStart=function(_fb4){
var _fb5=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fb5.hasEntries()){
var _fb6=_fb5.getFirst();
this._dragStart=_fb6.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fb6.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fba){
if(_fba instanceof SystemViewDefinition){
var _fbb=ViewBinding.newInstance(this.bindingDocument);
_fbb.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fbb.setDefinition(_fba);
var _fbc=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fbc.setAssociatedView(_fbb);
this._decks[_fba.handle]=_fbc;
_fbc.add(_fbb);
this.add(_fbc);
function attach(){
_fbc.attach();
_fbb.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fbd){
var _fbe=this._decks[_fbd];
this.select(_fbe);
};
DecksBinding.prototype.expandBy=function(_fbf){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fc1=this.bindingElement.offsetHeight+_fbf;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fc1+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fc3){
var _fc4=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fc3);
return UserInterface.registerBinding(_fc4,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fc5){
this._viewBinding=_fc5;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fc6=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fc7=this._viewBinding.getDefinition().label;
StatusBar.busy(_fc6,[_fc7]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fc8){
ExplorerDeckBinding.superclass.handleAction.call(this,_fc8);
var _fc9=_fc8.target;
switch(_fc8.type){
case PageBinding.ACTION_INITIALIZED:
if(_fc9 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fc9.node.getEntityToken();
this._handle=_fc9.node.getHandle();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fca,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fca,arg);
switch(_fca){
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
var _fcc=null;
if(this._isExplorerDeckBindingInitialized){
_fcc=this._viewBinding.getDefinition().label;
}else{
_fcc=DockTabBinding.LABEL_TABLOADING;
}
return _fcc;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fcd=null;
if(this._isExplorerDeckBindingInitialized){
_fcd=this._viewBinding.getDefinition().image;
}else{
_fcd=DockTabBinding.IMG_TABLOADING;
}
return _fcd;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fce=null;
if(this._isExplorerDeckBindingInitialized){
_fce=this._viewBinding.getDefinition().toolTip;
}
return _fce;
};
ExplorerDeckBinding.newInstance=function(_fcf){
var _fd0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fcf);
return UserInterface.registerBinding(_fd0,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fd1){
switch(_fd1.constructor){
case ExplorerToolBarBinding:
this._minGroup=_fd1.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fd1);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fd2){
this._minButtons.set(_fd2.handle,this._mountMinButton(_fd2));
this._index++;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fd3){
var _fd4=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fd4.setLabel(_fd3.label);
_fd4.setToolTip(_fd3.label);
_fd4.handle=_fd3.handle;
_fd4.node=_fd3.node;
this._minGroup.add(_fd4);
this._minList.add(_fd4);
_fd4.attach();
return _fd4;
};
ExplorerMenuBinding.prototype.handleAction=function(_fd5){
ExplorerMenuBinding.superclass.handleAction.call(this,_fd5);
switch(_fd5.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
this.collapse();
var _fd6=_fd5.target;
var _fd7=_fd6.getCheckedButtonBinding();
var _fd8=_fd7.handle;
this._selectedHandle=_fd8;
this._selectedTag=_fd7.node.getTag();
app.bindingMap.explorerdocktab.getAssociatedView().getContentWindow().bindingMap.explorerdeckscover.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fd5.consume();
break;
}
};
ExplorerMenuBinding.prototype.handleBroadcast=function(_fd9,arg){
ExplorerMenuBinding.superclass.handleBroadcast.call(this,_fd9,arg);
switch(_fd9){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.collapse();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fdb){
var _fdc=this._minButtons.get(_fdb);
if(_fdc){
_fdc.check();
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
ExplorerToolBarBinding.newInstance=function(_fdd){
var _fde=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fdd);
return UserInterface.registerBinding(_fde,ExplorerToolBarBinding);
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
var _fdf=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fe0=_fdf?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fe0);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fe1,_fe2){
var _fe3="ui:explorertoolbarbutton";
var _fe4=DOMUtil.createElementNS(Constants.NS_UI,_fe3,_fe1);
var _fe5=UserInterface.registerBinding(_fe4,ExplorerToolBarButtonBinding);
_fe5.explorerToolBarButtonType=_fe2;
return _fe5;
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
EditorBinding.invokeFunctionEditorDialog=function(_fe6,_fe7,type){
type=type?type:"";
var _fe9=FunctionService.GetCustomEditorSettingsByMarkup(_fe6);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fe9){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fe9.Width?(_fe9.Width>dim.w?dim.w:_fe9.Width):undefined;
def.height=_fe9.Height?(_fe9.Height>dim.h?dim.h:_fe9.Height):undefined;
if(_fe9.Url){
_fe9.Url=_fe9.Url.indexOf("?")>-1?_fe9.Url+"&consoleId="+Application.CONSOLE_ID:_fe9.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fe7;
def.argument={url:_fe9?_fe9.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fe6}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fec,_fed){
var _fee=EditorBinding._components;
var _fef=EditorBinding._editors;
var key=_fed.key;
var _ff1=Interfaces.isImplemented(IWysiwygEditorComponent,_fec);
if(!_ff1){
_ff1=Interfaces.isImplemented(ISourceEditorComponent,_fec);
}
if(_ff1){
if(_fef.has(key)){
_fef.get(key).initializeEditorComponent(_fec);
}else{
if(!_fee.has(key)){
_fee.set(key,new List());
}
_fee.get(key).add(_fec);
}
}else{
throw "Editor component interface not implemented: "+_fec;
}
};
EditorBinding.claimComponents=function(_ff2,_ff3){
var _ff4=EditorBinding._components;
var _ff5=EditorBinding._editors;
var key=_ff3.key;
_ff5.set(key,_ff2);
var list=null;
if(_ff4.has(key)){
list=_ff4.get(key).copy();
_ff4.del(key);
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
var _ff9=this.getProperty("value");
if(_ff9!=null){
_ff9=decodeURIComponent(_ff9);
this._startContent=_ff9;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _ffb=this.bindingWindow.DataManager;
_ffb.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_ffd){
var _ffe=EditorBinding.claimComponents(this,_ffd);
if(_ffe!=null){
while(_ffe.hasNext()){
this.initializeEditorComponent(_ffe.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _1000=this.bindingWindow.DataManager;
if(_1000.getDataBinding(name)){
_1000.unRegisterDataBinding(name);
}
_1000.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _1001=this.getEditorDocument();
if(_1001!=null){
Application.framework(_1001);
DOMEvents.addEventListener(_1001,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_1001,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_1001,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_1001,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_1003){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_1003==true){
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
var _1005=this.getCheckSum();
if(_1005!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_1005;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _1006=null;
if(Binding.exists(this._pageBinding)){
_1006=this._pageBinding.getCheckSum(this._checksum);
}
return _1006;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _1008=DOMEvents.getTarget(e);
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
if(_1008.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_100a,arg){
EditorBinding.superclass.handleBroadcast.call(this,_100a,arg);
var _100c=null;
switch(_100a){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _100d=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_100d=false;
}
}
}else{
_100c=DOMEvents.getTarget(arg);
if(_100c&&_100c.ownerDocument==this.getEditorDocument()){
_100d=false;
}
}
if(_100d){
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
EditorBinding.prototype._activateEditor=function(_100e){
if(_100e!=this._isActivated){
this._isActivated=_100e;
EditorBinding.isActive=_100e;
var _100f=this.getEditorWindow().standardEventHandler;
var _1010=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1010!=null){
if(_100e){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1010.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_100f.enableNativeKeys(true);
}else{
_1010.disable();
_100f.disableNativeKeys();
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
var _1012=false;
try{
var _1013=this.getEditorWindow().getSelection();
if(_1013!=null){
_1012=_1013.toString().length>0;
if(!_1012){
var range=_1013.getRangeAt(0);
var frag=range.cloneContents();
var _1016=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1016.appendChild(frag.firstChild);
}
var img=_1016.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1012=true;
}
}
}
}
}
catch(exception){
}
return _1012;
};
EditorBinding.prototype.isCommandEnabled=function(_1018){
var _1019=true;
switch(_1018){
case "Cut":
case "Copy":
case "Paste":
_1019=this.getEditorDocument().queryCommandEnabled(_1018);
break;
}
return _1019;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _101d=false;
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
_101d=true;
}
break;
}
return _101d;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1020=this.getContentWindow().bindingMap.toolbar;
var _1021=_1020.getButtonForCommand(cmd);
if(!_1021){
throw "No button for command "+cmd;
}
return _1021;
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
EditorBinding.prototype.handleAction=function(_1025){
EditorBinding.superclass.handleAction.call(this,_1025);
var _1026=_1025.target;
var self=this;
var _1028=this.shadowTree.iframe;
switch(_1025.type){
case Binding.ACTION_DIRTY:
if(_1025.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1029){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1029);
};
EditorBinding.prototype.handleElement=function(_102a){
return true;
};
EditorBinding.prototype.updateElement=function(_102b){
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
var _102e=this._menuGroups[rel];
if(_102e instanceof List){
_102e.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1031=this._menuGroups[rel];
if(_1031 instanceof List){
_1031.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1033){
EditorPopupBinding.superclass.handleAction.call(this,_1033);
var _1034=_1033.target;
if(_1033.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1034.getProperty("cmd");
var gui=_1034.getProperty("gui");
var val=_1034.getProperty("val");
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
var _1038=this.bindingWindow.bindingMap.tinywindow;
var _1039=this.bindingWindow.bindingMap.codepresswindow;
if(_1038){
EditorBinding.registerComponent(this,_1038);
}else{
if(_1039){
EditorBinding.registerComponent(this,_1039);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_103a,_103b,_103c,theme){
this._editorBinding=_103a;
this._tinyEngine=_103b;
this._tinyInstance=_103c;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_103e,frame,_1040){
this._editorBinding=_103e;
this._codePressFrame=frame;
this._codePressEngine=_1040;
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
var _1043=this._editorBinding;
if(_1043!=null){
var self=this;
var _1045={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1043.hasBookmark()){
_1043.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1043.hasBookmark()){
_1043.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1045);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1045);
}
};
EditorClickButtonBinding.newInstance=function(_1047){
var _1048=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1047);
return UserInterface.registerBinding(_1048,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1049){
var _104a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1049);
return UserInterface.registerBinding(_104a,EditorToolBarButtonBinding);
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
var _104b=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_104b);
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
EditorSelectorBinding.prototype.initializeComponent=function(_104c,_104d,_104e,theme){
this._editorBinding=_104c;
this._tinyEngine=_104d;
this._tinyInstance=_104e;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1050){
EditorSelectorBinding.superclass.handleAction.call(this,_1050);
switch(_1050.type){
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
EditorMenuItemBinding.newInstance=function(_1054){
var _1055=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1054);
return UserInterface.registerBinding(_1055,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1056){
var i=0,_1058,_1059=[],split=_1056.split(" ");
while((_1058=split[i++])!=null){
if(_1058.length>=3&&_1058.substring(0,3)=="mce"){
continue;
}else{
if(_1058.length>=14&&_1058.substring(0,14)=="compositemedia"){
continue;
}
}
_1059.push(_1058);
}
return _1059.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_105b){
var _105c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_105b);
if(soap instanceof SOAPFault){
}else{
_105c=soap.XhtmlFragment;
if(!_105c){
_105c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _105c;
};
VisualEditorBinding.getTinyContent=function(_105e,_105f){
var _1060=null;
if(_105e==null||!_105e.replace(/\s*/gm,"").length){
_105e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_105f.getSoapTinyContent(_105e);
if(soap instanceof SOAPFault){
var _1062=soap;
var _1063={handleDialogResponse:function(){
_105f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1063,_1062);
}else{
_1060=soap.XhtmlFragment;
if(_1060==null){
_1060=new String("");
}
_1060=_1060.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1060;
};
VisualEditorBinding.isImage=function(_1064){
return _1064&&_1064.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1065){
return VisualEditorBinding.isImage(_1065)&&!VisualEditorBinding.isReservedElement(_1065);
};
VisualEditorBinding.isReservedElement=function(_1066){
if(VisualEditorBinding.isFunctionElement(_1066)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1066)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1066)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1067){
return VisualEditorBinding.isImage(_1067)&&CSSUtil.hasClassName(_1067,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1068){
return VisualEditorBinding.isImage(_1068)&&CSSUtil.hasClassName(_1068,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1069){
return VisualEditorBinding.isImage(_1069)&&CSSUtil.hasClassName(_1069,VisualEditorBinding.HTML_CLASSNAME);
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
var _106a=this.getProperty("embedablefieldstypenames");
if(_106a!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_106a);
}
var _106b=this.getProperty("formattingconfiguration");
if(_106b!=null){
this._url+="?config="+_106b;
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
VisualEditorBinding.prototype.handleBroadcast=function(_106c,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_106c,arg);
var _106e=this.getContentWindow().bindingMap.tinywindow;
var _106f=_106e.getContentWindow();
switch(_106c){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_106f){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_106e);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1070){
_1070.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1071=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1071.replace(/\s*/gm,"").length==0){
_1071=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1071,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1072){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1072);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1074=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1074=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1074=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1074;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1077){
var _1078=_1077;
if(!this._isNormalizedDocument(_1077)){
_1078=this._getHtmlMarkup().replace("${body}",_1077);
}
return _1078;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1079){
var _107a=false;
var doc=XMLParser.parse(_1079,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_107a=true;
}
}
if(Client.isWebKit){
if(_1079.indexOf("<html")!==0){
_107a=false;
}
}
return _107a;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _107f=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_107f){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_107f=true;
}
return _107f;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1081=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1081);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1083){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1083,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1085){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1085,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1088=CSSComputer.getPadding(body);
var _1089=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1089.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_108c){
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
VisualEditorPopupBinding.prototype.configure=function(_108d,_108e,_108f){
var _1090=this.editorBinding.hasSelection();
this.tinyInstance=_108d;
this.tinyEngine=_108e;
this.tinyElement=_108f;
this.hasSelection=_1090;
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
var _1094=false;
if(this.hasSelection){
_1094=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1094=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1094=true;
}
}
}
}
if(_1094){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1095=this.getMenuItemForCommand("compositeInsertLink");
var _1096=this.getMenuItemForCommand("unlink");
var _1097=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1098=this.editorBinding.getButtonForCommand("unlink");
_1096.setDisabled(_1098.isDisabled);
if(_1096.isDisabled){
_1095.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1095.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1099=this.editorBinding.embedableFieldConfiguration;
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
if(_1099){
var _109c=_1099.getGroupNames();
if(_109c.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_109c.each(function(_10a0){
var _10a1=_1099.getFieldNames(_10a0);
_10a1.each(function(_10a2){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_10a2);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_10a0+":"+_10a2);
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
var _10a4=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _10a5=null;
var _10a6=null;
if(_10a4){
if(_10a4.nodeName=="TD"){
_10a5=_10a4.getAttribute("colspan");
_10a6=_10a4.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_10a5=="1"&&_10a6=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_10a4){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_10a7){
var _10a8=VisualEditorFormattingConfiguration._configurations;
if(!_10a8.has(_10a7)){
_10a8.set(_10a7,new VisualEditorFormattingConfiguration());
}
return _10a8.get(_10a7);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_10aa){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_10ab){
var _10ac=null;
var _10ad=VisualEditorFieldGroupConfiguration._configurations;
if(!_10ad.has(_10ab)){
_10ad.set(_10ab,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_10ab)));
}
return _10ad.get(_10ab);
};
function VisualEditorFieldGroupConfiguration(_10ae){
var _10af=new Map();
new List(_10ae).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_10af.set(group.GroupName,map);
});
this._groups=_10af;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10b3){
return this._groups.get(_10b3).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10b4,_10b5){
return this._groups.get(_10b4).get(_10b5).xhtml;
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
var _10b7=this.getDescendantElementsByLocalName("textarea");
while(_10b7.hasNext()){
var _10b8=_10b7.getNext();
if(_10b8.getAttribute("selected")=="true"){
this._startContent=_10b8.value;
this._textareaname=_10b8.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10ba=this.getContentWindow().bindingMap.templatetree;
_10ba.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10bb){
var _10bc=_10ba.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10bc.textareaname);
_10bb.consume();
}});
_10ba.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10bd){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10be=this.getContentWindow().bindingMap.toolsplitter;
_10be.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10bf=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10bf.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10bf);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10c0){
this._textareas=new Map();
while(_10c0.hasNext()){
var _10c1=_10c0.getNext();
var _10c2=_10c1.getAttribute("placeholderid");
this._textareas.set(_10c2,{placeholderid:_10c2,placeholdername:_10c1.getAttribute("placeholdername"),placeholdermarkup:_10c1.value,textareaelement:_10c1,isSelected:_10c1.getAttribute("selected")=="true"});
}
var _10c3=new Map();
this._textareas.each(function(name,_10c5){
var _10c6=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10c6.setLabel(_10c5.placeholdername);
_10c6.setImage("${icon:placeholder}");
_10c6.setProperty("placeholder",true);
_10c6.textareaname=name;
_10c3.set(_10c5.placeholdername,_10c6);
if(_10c5.isSelected){
selected=_10c6;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10c7=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10c7.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10c8=this.getContentWindow().bindingMap.templatetree;
var _10c9=_10c8.add(TreeNodeBinding.newInstance(_10c8.bindingDocument));
_10c9.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10c9.setImage("${icon:warning}");
_10c9.attach();
var _10ca=this.getContentWindow().bindingMap.statusbar;
_10ca.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10cc=this._textareas.get(name);
var _10cd=_10cc.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10cd));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10ce){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10ce;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10cf=this.getContentWindow().bindingMap.statusbar;
_10cf.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10ce);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10d2=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10d2;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10d3=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10d3=this._xhtmls.get(this._textareaname);
if(_10d3==null){
_10d3=VisualEditorBinding.XHTML;
}
}
return _10d3;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10d5){
_10d5.textareaelement.value=_10d5.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10d6,_10d7,_10d8){
var _10d9=_10d6.getElementsByTagName("div").item(0);
var _10da=_10d7.getElementsByTagName("div").item(0);
var _10db=new List(_10d9.getElementsByTagName("textarea"));
var _10dc=new List(_10da.getElementsByTagName("textarea"));
if(_10db.getLength()!=_10dc.getLength()){
_10d8=true;
}else{
var index=0;
_10db.each(function(_10de,index){
var _10e0=_10dc.get(index);
var newid=_10de.getAttribute("placeholderid");
var oldid=_10e0.getAttribute("placeholderid");
var _10e3=_10de.getAttribute("placeholdername");
var _10e4=_10e0.getAttribute("placeholdername");
if(newid!=oldid||_10e3!=_10e4){
_10d8=true;
}
return !_10d8;
});
}
if(_10d8){
var html=null;
if(_10d9.innerHTML!=null){
html=_10d9.innerHTML;
}else{
html=DOMSerializer.serialize(_10d9);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10e7){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10e7);
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
var _10ea=this.getDescendantBindingByLocalName("selector");
_10ea.attach();
this._populateTemplateSelector();
var _10eb=this.getContentWindow().bindingMap.templateselector;
_10eb.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ec=this.getDescendantBindingByLocalName("selector");
var _10ed=this.getContentWindow().bindingMap.templateselector;
_10ec.selections.each(function(_10ee){
_10ee.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10ed.populateFromList(_10ec.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10ef=this.getDescendantBindingByLocalName("selector");
var _10f0=this.getContentWindow().bindingMap.templateselector;
_10ef.selectByValue(_10f0.getValue());
_10ef.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10f1){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10f6,_10f7){
var _10f8=_10f7;
if(old.has(_10f6)){
_10f8=old.get(_10f6).placeholdermarkup;
}
return _10f8;
}
while(_10f1.hasNext()){
var _10f9=_10f1.getNext();
var _10fa=_10f9.getAttribute("placeholderid");
this._textareas.set(_10fa,{placeholderid:_10fa,placeholdername:_10f9.getAttribute("placeholdername"),placeholdermarkup:compute(_10fa,_10f9.value),textareaelement:_10f9,isSelected:_10f9.getAttribute("selected")=="true"});
}
var _10fb=null;
var _10fc=this.getContentWindow().bindingMap.templatetree;
var _10fd=new Map();
this._textareas.each(function(name,_10ff){
var _1100=_10fc.add(TreeNodeBinding.newInstance(_10fc.bindingDocument));
_1100.setLabel(_10ff.placeholdername);
_1100.setImage("${icon:placeholder}");
_1100.setProperty("placeholder",true);
_1100.textareaname=name;
_10fd.set(_10ff.placeholdername,_1100);
if(_10ff.isSelected){
_10fb=_1100;
}
});
_10fc.attachRecursive();
if(_10fb!=null){
var _1101=true;
if(this._oldtextareas.hasEntries()){
_1101=false;
var map=new Map();
this._textareas.each(function(id,_1104){
map.set(_1104.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1101=true;
}
}
if(_1101){
var _1105=this._textareas.get(_10fb.textareaname);
this._textareaname=_10fb.textareaname;
this._placeholdername=_1105.placeholdername;
this._setContentFromPlaceHolder(_10fb.textareaname);
_10fb.focus();
}else{
var _1106=_10fd.get(this._placeholdername);
this._textareaname=_1106.textareaname;
_1106.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_1109){
var _110a=null;
if(Client.isWebKit||Client.isExplorer){
_110a=node.getElementsByTagName(_1109);
}else{
_110a=node.getElementsByTagName("ui:"+_1109);
}
return _110a;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_110b,_110c){
var _110d=this._getElementsByTagName(_110b,"selector").item(0);
var _110e=this._getElementsByTagName(_110c,"selector").item(0);
var _110f=false;
var _1110=false;
if(_110d!=null&&_110e!=null){
var _1111=new List(this._getElementsByTagName(_110d,"selection"));
var _1112=new List(this._getElementsByTagName(_110e,"selection"));
if(_1111.getLength()!=_1112.getLength()){
_110f=true;
_1110=true;
}else{
_1111.each(function(_1113,index){
var _1115=_1113.getAttribute("value");
var _1116=_1112.get(index).getAttribute("value");
if(_1115!=_1116){
_110f=true;
}
return !_110f;
});
_1111.each(function(_1117,index){
var _1119=_1117.getAttribute("selected");
var _111a=_1112.get(index).getAttribute("selected");
if(_1119!=_111a){
_1110=true;
}
return !_1110;
});
}
}
if(_110f){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_110d);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1110){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_110b,_110c,_1110);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_111c){
var _111d=null;
if(_111c==undefined){
_111c=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_111f){
if(_111f.PlaceholderId==_111c){
_111d=_111f.ClientRectangle.Width;
return false;
}
});
}
return _111d;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1121=this._pageId;
var _1122=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1121,_1122,function(_1124){
self._templatePreview=_1124;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1125){
var _1126=this._pageId;
var _1127=this._textareaname;
var _1128=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1125,_1126,_1128,_1127,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_112a){
var _112b=this._pageId;
var _112c=this._textareaname;
var _112d=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_112a,_112b,_112d,_112c,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_112f,frame,_1131){
this._editorBinding=_112f;
this._codePressFrame=frame;
this._codePressEngine=_1131;
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
var _1137=this.getProperty("validate");
if(_1137==true){
this._hasStrictValidation=true;
}
var _1138=this.getProperty("strictsave");
if(_1138===false){
this._strictSave=false;
}
var _1139=this.getProperty("validator");
if(_1139!=null){
this._validator=_1139;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_113a,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_113a,arg);
switch(_113a){
case BroadcastMessages.CODEMIRROR_LOADED:
var _113c=this.getContentWindow().bindingMap.codemirrorwindow;
if(_113c!=null){
var _113d=_113c.getContentWindow();
if(arg.broadcastWindow==_113d){
this._codemirrorWindow=_113d;
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
this.initializeEditorComponents(_113c);
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
this.unsubscribe(_113a);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1141){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1141);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1142){
if(_1142!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1142;
EditorBinding.isActive=_1142;
var _1143=this._codemirrorWindow.standardEventHandler;
if(_1142){
_1143.enableNativeKeys(true);
}else{
_1143.disableNativeKeys();
}
var _1144=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1144!=null){
if(_1142){
_1144.enable();
}else{
_1144.disable();
}
}
if(_1142){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1148=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1148;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1149){
_1149.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_114b){
if(!this._isFinalized){
if(_114b!=this._startContent){
this._startContent=_114b;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_114b);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _114c=this.getContentWindow().bindingMap.editorpage.getContent();
return _114c?_114c:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_114d){
if(this._pageBinding!=null){
this._pageBinding.cover(_114d);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_114e){
if(_114e!=null&&this.shadowTree.dotnetinput!=null){
var value=_114e.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1150=true;
var _1151=this.getContent();
if(this._validator!=null){
_1150=Validator.validateInformed(_1151,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1152=_1151.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1152!=_1151){
_1151=_1152;
this.setContent(_1152);
}
_1150=XMLParser.isWellFormedDocument(_1151,true,!this._strictSave);
if(_1150==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1150=this._isValidHTML(_1151);
break;
}
}
break;
}
}
return _1150;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1154=true;
var doc=XMLParser.parse(xml);
var _1156=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1156.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1156.add("NamespaceURI");
}
var head=null,body=null;
var _115a=new List(root.childNodes);
while(_115a.hasNext()){
var child=_115a.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1156.add("MultipleHead");
}
if(body!=null){
_1156.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1156.add("MultipleBody");
}
body=child;
break;
default:
_1156.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1156.add("MissingHead");
}
if(body==null){
_1156.add("MissingBody");
}
}
if(_1156.hasEntries()){
_1154=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1156.getFirst()));
}
return _1154;
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
var _115c=null;
var page=this._pageBinding;
if(page!=null){
_115c=page.getCheckSum();
}
return _115c;
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
ThrobberBinding.prototype.handleBroadcast=function(_115e,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_115e,arg);
switch(_115e){
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
ProgressBarBinding.notch=function(_1161){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1161);
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
ProgressBarBinding.prototype.notch=function(_1163){
_1163=_1163?_1163:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1163);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1165,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1165,arg);
switch(_1165){
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
StartMenuItemBinding.prototype.setChecked=function(_1167,_1168){
StartMenuItemBinding.superclass.setChecked.call(this,_1167,_1168);
if(!_1168){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1169){
var _116a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1169);
UserInterface.registerBinding(_116a,StartMenuItemBinding);
return UserInterface.getBinding(_116a);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_116d,_116e){
var _116f=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_116e,true)==true){
if(_116d!="*"){
_116d=KeySetBinding._sanitizeKeyModifiers(_116d);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_116f[doc]){
_116f[doc]={};
}
if(!_116f[doc][code]){
_116f[doc][code]={};
}
_116f[doc][code][_116d]=_116e;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1173=false;
var code=e.keyCode;
var _1175=KeySetBinding.keyEventHandlers;
if(_1175[doc]&&_1175[doc][code]){
var _1176="[default]";
_1176+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1176+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1176+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1176+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1177=_1175[doc][code][_1176];
if(_1177==null){
_1177=_1175[doc][code]["*"];
}
if(_1177!=null){
_1177.handleKeyEvent(e);
_1173=true;
}
}
return _1173;
};
KeySetBinding._sanitizeKeyModifiers=function(_1178){
var _1179="[default]";
var mods={};
if(_1178){
new List(_1178.split(" ")).each(function(_117b){
mods[_117b]=true;
});
function check(_117c){
if(mods[_117c]){
_1179+=" "+_117c;
}
}
check("shift");
check("control");
}
return _1179;
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
var _1180=key.getAttribute("oncommand");
var _1181=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1181){
DOMEvents.preventDefault(e);
}
var _1183=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1180,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1184){
if(_1184 instanceof CursorBinding){
_1184.setOpacity(0);
_1184.show();
new Animation({modifier:9,onstep:function(_1185){
_1184.setOpacity(Math.sin(_1185*Math.PI/180));
},onstop:function(){
_1184.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1186){
if(_1186 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1187){
_1186.setOpacity(Math.cos(_1187*Math.PI/180));
},onstop:function(){
_1186.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1188,_1189,_118a){
if(_1188 instanceof CursorBinding){
_118a.x-=16;
_118a.y-=16;
new Animation({modifier:3,onstep:function(_118b){
var tal=Math.sin(_118b*Math.PI/180);
_1188.setPosition(new Point(((1-tal)*_1189.x)+((0+tal)*_118a.x),((1-tal)*_1189.y)+((0+tal)*_118a.y)));
},onstop:function(){
CursorBinding.fadeOut(_1188);
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
CursorBinding.prototype.setOpacity=function(_1191){
this.bindingElement.style.opacity=new String(_1191);
this._opacity=_1191;
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
function setOpacity(_1194){
cover.bindingElement.style.opacity=new String(_1194);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1195){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1195*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1197){
cover.bindingElement.style.MozOpacity=new String(_1197);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1198){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1198*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_119a){
if(_119a!=this._isBusy){
if(_119a){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_119a;
}
};
CoverBinding.prototype.setTransparent=function(_119b){
if(_119b!=this._isTransparent){
if(_119b){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_119b;
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
CoverBinding.prototype.setHeight=function(_119d){
if(_119d>=0){
this.bindingElement.style.height=new String(_119d+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_119e){
var _119f=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_119e);
return UserInterface.registerBinding(_119f,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _11a1=UncoverBinding._bindingInstance;
if(Binding.exists(_11a1)){
_11a1.setPosition(pos);
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
TheatreBinding.prototype.play=function(_11a5){
this._isFading=_11a5==true;
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
var _11a6=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_11a6.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_11a6.clearRect(0,0,300,150);
_11a6.fillRect(0,0,300,150);
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
var _11a8=this._canvas.getContext("2d");
_11a8.clearRect(0,0,300,150);
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
var _11a9=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_11a9);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _11aa=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_11aa){
this._startcontent=_11aa.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_11ab){
SourceCodeViewerBinding.superclass.handleAction.call(this,_11ab);
switch(_11ab.type){
case WindowBinding.ACTION_ONLOAD:
if(_11ab.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_11ab.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_11ab);
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
var _11af=this._transformer.transformToString(doc);
this._inject(_11af);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11b2){
this.getContentDocument().body.innerHTML=_11b2;
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
var _11ba=list.getNext();
var id=_11ba.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11ba);
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
var _11c4=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11c4.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11c4.appendChild(att);
}
elm.appendChild(_11c4);
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
var _11ce=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ce){
doc=XMLParser.parse(_11ce);
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
var _11d2=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11d2;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11d3,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11d3,arg);
switch(_11d3){
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
LocalizationSelectorBinding.prototype.handleAction=function(_11d5){
LocalizationSelectorBinding.superclass.handleAction.call(this,_11d5);
switch(_11d5.type){
case MenuItemBinding.ACTION_COMMAND:
this.onValueChange(_11d5.target.selectionValue);
break;
}
};
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11d7=new List();
list.each(function(lang){
_11d7.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11d7);
}else{
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
var self=this;
var _11db=this.getDescendantBindingByLocalName("menugroup");
_11db.detachRecursive();
_11db.bindingElement.innerHTML="";
if(list.hasEntries()){
var _11dc=null;
while(list.hasNext()){
var _11dd=list.getNext();
if(_11dd.isSelected){
this.setLabel(_11dd.label);
}
var _11de=MenuItemBinding.newInstance(this.bindingDocument);
_11de.imageProfile=_11dd.imageProfile;
_11de.setLabel(_11dd.label);
if(_11dd.tooltip!=null){
_11de.setToolTip(_11dd.tooltip);
}
_11de.selectionValue=_11dd.value;
_11db.add(_11de);
_11de.attach();
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11e1){
switch(_11e1){
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
var _11e4=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11e4,root);
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
var _11e5=this.getProperty("status");
if(_11e5!=null){
switch(_11e5){
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
UserInterfaceMapping.prototype.merge=function(_11e9){
for(var _11ea in _11e9.map){
this.map[_11ea]=_11e9.getBindingImplementation(_11ea);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11eb){
var _11ec=null;
var name=_11eb.nodeName.toLowerCase();
if(this.map[name]){
_11ec=this.map[name];
}
return _11ec;
};
var UserInterface=new function(){
var _11ee=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11ef=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11ee,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11f0=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11f2,impl){
var _11f4=null;
if(!this.hasBinding(_11f2)){
var _11f5=DOMUtil.getParentWindow(_11f2);
if(DOMUtil.getLocalName(_11f2)!="bindingmapping"){
if(!impl&&_11f2.getAttribute("binding")!=null){
var _11f6=_11f2.getAttribute("binding");
impl=_11f5[_11f6];
if(impl==null){
throw "No such binding in scope: "+_11f6;
}
}
if(!impl){
var _11f7=_11f5.DocumentManager;
if(_11f7){
var _11f8=_11f7.customUserInterfaceMapping;
if(_11f8){
impl=_11f8.getBindingImplementation(_11f2);
}
}
}
if(!impl){
impl=_11ef.getBindingImplementation(_11f2);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11f4=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11f4){
var key=KeyMaster.getUniqueKey();
_11f2.setAttribute("key",key);
_11f4.key=key;
if(!_11f2.id){
_11f2.id=key;
}
keys[key]={element:_11f2,binding:_11f4};
_11f4.onBindingRegister();
}
}
}
return _11f4;
};
this.unRegisterBinding=function(_11fa){
terminate(_11fa);
};
function terminate(_11fb){
if(Binding.exists(_11fb)==true){
var key=_11fb.key;
Binding.destroy(_11fb);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11fb=null;
}else{
_11f0.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11fd){
var _11fe=null;
if(keys[_11fd.key]){
_11fe=keys[_11fd.key].element;
}
return _11fe;
};
this.getBinding=function(_11ff){
var _1200=null;
if(_11ff&&_11ff.nodeType==Node.ELEMENT_NODE){
try{
var key=_11ff.getAttribute("key");
if(key&&keys[key]){
_1200=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occurred on element:\n\n\t\t"+_11ff);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1200;
};
this.getBindingByKey=function(key){
var _1203=null;
if(keys[key]){
_1203=keys[key].binding;
}
return _1203;
};
this.hasBinding=function(_1204){
return this.getBinding(_1204)!=null;
};
this.isBindingVisible=function(_1205){
var _1206=Application.isOperational;
if(_1206==true){
var _1207=new Crawler();
_1207.type=NodeCrawler.TYPE_ASCENDING;
_1207.id="visibilitycrawler";
_1207.addFilter(function(_1208){
var b=UserInterface.getBinding(_1208);
var res=0;
if(!b.isVisible){
_1206=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1207.crawl(_1205.bindingElement);
_1207.dispose();
}
return _1206;
};
var _120b=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_120b={};
for(var key in keys){
_120b[key]=true;
}
};
this.getPoint=function(){
var _120f=null;
if(_120b){
_120f=new List();
for(var key in keys){
if(!_120b[key]){
_120f.add(key);
}
}
}
return _120f;
};
this.clearPoint=function(){
_120b=null;
};
this.trackUndisposedBindings=function(){
var _1211=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1211){
_1211="Bindings illdisposed: ";
}
_1211+=entry.binding+" ";
}
}
if(_1211!=null){
_11f0.error(_1211);
}
};
this.autoTrackDisposedBindings=function(_1214){
if(_1214){
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
SOAPRequest.newInstance=function(_1215,_1216){
var _1217=_1215+"/"+_1216;
var _1218=new SOAPRequest(_1217);
var _1219=SOAPRequest.resolver;
_1218.document=Templates.getTemplateDocument("soapenvelope.xml");
_1218.envelope=_1219.resolve("soap:Envelope",_1218.document);
_1218.header=_1219.resolve("soap:Header",_1218.envelope);
_1218.body=_1219.resolve("soap:Body",_1218.envelope);
return _1218;
};
SOAPRequest._parseResponse=function(_121a){
var _121b=null;
var _121c=false;
var doc=_121a.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_121b=SOAPRequestResponse.newInstance(_121a.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_121a.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_121c=true;
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
var text=_121a.responseText;
if(_121a.status==503||text.indexOf("id=\"offline\"")>-1){
_121c=true;
}else{
var cry="Invalid SOAP response: \n\n"+_121a.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_121a.responseText);
}
}
}
}
if(_121c==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _121b;
};
function SOAPRequest(_1221){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1221;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1223=DOMUtil.getXMLHTTPRequest();
var _1224=null;
_1223.open("post",url,false);
_1223.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1223.setRequestHeader("SOAPAction",this.action);
try{
_1223.send(this.document);
_1224=SOAPRequest._parseResponse(_1223);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1223=null;
return _1224;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1227){
var _1228=DOMUtil.getXMLHTTPRequest();
_1228.open("post",url,true);
_1228.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1228.setRequestHeader("SOAPAction",this.action);
_1228.onreadystatechange=function(){
if(_1228.readyState==4){
var _1229=SOAPRequest._parseResponse(_1228);
_1227(_1229);
_1228=null;
}
};
_1228.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _122a in this){
this[_122a]=null;
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
var _122c=null;
if(doc&&doc.documentElement){
_122c=new SOAPRequestResponse();
var _122d=SOAPRequestResponse.resolver;
_122c.document=doc;
_122c.envelope=_122d.resolve("soap:Envelope",_122c.document);
_122c.header=_122d.resolve("soap:Header",_122c.envelope);
_122c.body=_122d.resolve("soap:Body",_122c.envelope);
var fault=_122d.resolve("soap:Fault",_122c.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_122c.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_122d.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_122d.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _122c;
};
function SOAPFault(_122f,_1230,_1231){
this._operationName=_122f;
this._operationAddress=_1230;
this._faultString=_1231;
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
SOAPFault.newInstance=function(_1232,fault){
return new SOAPFault(_1232.name,_1232.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1235){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1235;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1237=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1237.body,this._operation);
var _1239=this._wsdl.getSchema();
var _123a=_1239.lookup(this._operation);
var _123b=_123a.getListedDefinitions();
while(_123b.hasNext()){
var def=_123b.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1237;
};
SOAPEncoder.prototype._resolve=function(_123f,_1240,value){
var _1242=this._wsdl.getSchema();
if(_1240.isSimpleValue){
this._appendText(_123f,value,_1240.type=="string");
}else{
var _1243=_1242.lookup(_1240.type);
if(_1243 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1243.getListedDefinitions();
if(_1243.isArray){
var _1245=new List(value);
var def=defs.getNext();
while(_1245.hasNext()){
var elm=this._appendElement(_123f,def.name);
var val=_1245.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_123f,def.name);
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
SOAPEncoder.prototype._appendText=function(_124c,value,_124e){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1251=false;
var i=0,c;
while(c=chars[i++]){
var _1254=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1254=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1254=false;
}
break;
}
if(!_1254){
safe+=c;
}else{
_1251=true;
}
}
if(_1251){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_124c.appendChild(_124c.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1257){
this._wsdl=wsdl;
this._operation=_1257;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_125c){
var _125d=null;
var _125e=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1260=this.resolve(id,_125c.body);
var _1261=_125e.lookup(id);
var _1262=_1261.getListedDefinitions();
while(!_125d&&_1262.hasNext()){
var def=_1262.getNext();
var elm=this.resolve(def.name,_1260);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_125d=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_125d.appendChild(_125d.importNode(e,true));
}else{
_125d=this._compute(elm,def);
}
}
return _125d;
};
SOAPDecoder.prototype._compute=function(_1266,_1267){
var _1268=null;
var _1269=this._wsdl.getSchema();
if(_1267.isSimpleValue){
_1268=this._getSimpleValue(_1266,_1267.type);
}else{
var _126a=_1269.lookup(_1267.type);
if(_126a instanceof SchemaSimpleType){
_1268=this._getSimpleValue(_1266,_126a.restrictionType);
}else{
var defs=_126a.getListedDefinitions();
if(_126a.isArray){
_1268=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1266);
while(elms.hasNext()){
var elm=elms.getNext();
_1268.push(this._compute(elm,def));
}
}else{
if(_1266==null){
_1268=null;
}else{
_1268={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1266);
if(elm){
_1268[def.name]=this._compute(elm,def);
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
return _1268;
};
SOAPDecoder.prototype._getSimpleValue=function(_126f,type){
var _1271=null;
if(_126f!=null&&_126f.firstChild&&_126f.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_126f.childNodes.length>1){
_126f.normalize();
}
_1271=_126f.firstChild.data;
switch(type){
case Schema.types.STRING:
_1271=_1271;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1271=Number(_1271);
break;
case Schema.types.BOOLEAN:
_1271=_1271=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1271;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1272){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1272);
}
Schema.prototype._parseSchema=function(_1273){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1274={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1273);
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
_1274[rule.getAttribute("name")]=entry;
}
return _1274;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1279){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1279);
}
SchemaDefinition.prototype._parse=function(_127a){
var min=_127a.getAttribute("minOccurs");
var max=_127a.getAttribute("maxOccurs");
var type=_127a.getAttribute("type");
this.name=_127a.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1280=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1280;
}else{
var elm=_127a.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1282,_1283){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1282,_1283);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1284,_1285){
var els=_1284.resolveAll("s:complexType/s:sequence/s:element",_1285);
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
function SchemaComplexType(_1287,_1288){
this._definitions=new List();
this._parseListedDefinitions(_1287,_1288);
this.isArray=_1288.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1289,_128a){
var els=_1289.resolveAll("s:sequence/s:element",_128a);
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
function SchemaSimpleType(_128d,_128e){
this.restrictionType=null;
this._parse(_128d,_128e);
}
SchemaSimpleType.prototype._parse=function(_128f,_1290){
var _1291=_128f.resolve("s:restriction",_1290);
if(_1291){
this.restrictionType=_1291.getAttribute("base").split(":")[1];
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
var _1294=null;
var _1295=DOMUtil.getXMLHTTPRequest();
_1295.open("get",url,false);
_1295.send(null);
if(_1295.responseXML){
_1294=_1295.responseXML.documentElement;
}else{
alert(_1295.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1294;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1296=new List();
var _1297=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1297.hasEntries()){
while(_1297.hasNext()){
var _1298=_1297.getNext();
var name=_1298.getAttribute("name");
_1296.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1296;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_129b,_129c,_129d){
this.name=name;
this.address=_129b;
this.encoder=_129c;
this.decoder=_129d;
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
var _12a1=wsdl.getOperations();
_12a1.each(function(_12a2){
proxy[_12a2.name]=WebServiceProxy.createProxyOperation(_12a2);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_12a3,_12a4){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_12a4){
var log=_12a4 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_12a3.address+": "+_12a3.name+"\n\n";
log+=DOMSerializer.serialize(_12a4.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_12a6){
return function(){
var _12a7=new List(arguments);
var _12a8=null;
if(typeof (_12a7.getLast())=="function"){
var _12a9=_12a7.extractLast();
var _12aa=_12a6.encoder.encode(_12a7);
this._log(_12a6,_12aa);
var self=this;
var _12ac=_12aa.asyncInvoke(_12a6.address,function(_12ad){
self._log(_12a6,_12ad);
if(_12ad){
if(_12ad.fault){
_12a8=SOAPFault.newInstance(_12a6,_12ad.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12a8,_12aa,_12ad);
}
}else{
if(WebServiceProxy.isDOMResult){
_12a8=_12ad.document;
}else{
_12a8=_12a6.decoder.decode(_12ad);
}
}
}
_12aa.dispose();
_12a9(_12a8);
});
}else{
var _12aa=_12a6.encoder.encode(new List(arguments));
this._log(_12a6,_12aa);
var _12ac=_12aa.invoke(_12a6.address);
this._log(_12a6,_12ac);
if(_12ac){
if(_12ac.fault){
_12a8=SOAPFault.newInstance(_12a6,_12ac.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_12a8,_12aa,_12ac);
}
}else{
if(WebServiceProxy.isDOMResult){
_12a8=_12ac.document;
}else{
_12a8=_12a6.decoder.decode(_12ac);
}
}
}
_12aa.dispose();
return _12a8;
}
};
};
WebServiceProxy.handleFault=function(_12ae,_12af,_12b0){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_12ae,soapRequest:_12af,soapResponse:_12b0});
}
catch(exception){
alert(_12ae.getFaultString());
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
var _12b1=SystemLogger.getLogger("MessageQueue");
var _12b2=null;
var _12b3=0;
var _12b4=null;
var _12b5=new Map();
var _12b6=new Map();
var _12b7=false;
var _12b8=false;
var _12b9=false;
var _12ba=false;
var _12bb={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_12b2=ConsoleMessageQueueService;
_12b3=_12b2.GetCurrentSequenceNumber("dummyparam!");
this.index=_12b3;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_12b7){
if(!MessageQueue._actions.hasEntries()){
var _12bc=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_12b8=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12bc;
_12b8=false;
}
}
}
};
this._pokeserver=function(){
if(_12b7==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12bd){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_12b8);
this._updateMessages(_12bd);
}
};
this._updateMessages=function(_12be){
if(_12b9){
_12ba=true;
}else{
_12b9=true;
var self=this;
var _12c0=function(_12c1){
if(_12c1!=null){
if(Types.isDefined(_12c1.CurrentSequenceNumber)){
var _12c2=_12c1.CurrentSequenceNumber;
if(_12c2<self.index){
_12b1.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12c2);
}
self.index=_12c2;
var _12c3=new List(_12c1.ConsoleActions);
if(_12c3.hasEntries()){
self.evaluate(_12c3);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_12b1.error("No sequencenumber in MessageQueue response!");
}
}
_12b9=false;
if(_12ba){
_12ba=false;
self._updateMessages();
}
};
if(_12be){
_12c0(_12b2.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_12b2.GetMessages(Application.CONSOLE_ID,this.index,_12c0);
}
}
};
this.evaluate=function(_12c4){
var _12c5=new List();
if(_12c4.hasEntries()){
_12c4.each(function(_12c6){
if(this._index[_12c6.Id]!=true){
_12c5.add(_12c6);
}
this._index[_12c6.Id]=true;
},this);
if(_12c5.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12c5);
}else{
this._actions=_12c5;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12c7){
var _12c8="(No reason)";
if(_12c7!=null){
_12c8=_12c7.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12c8);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12cc){
if(_12cc==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12cd=null;
if(this._actions.hasEntries()){
var _12ce=this._actions.extractFirst();
_12b3=_12ce.SequenceNumber;
_12b1.debug("MessageQueue action: "+_12ce.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_12b3+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12ce.ActionType){
case "OpenView":
_12cd=_12ce.OpenViewParams;
if(_12cd.ViewType=="ModalDialog"){
openDialogView(_12cd);
}else{
_12b4=_12cd.ViewId;
openView(_12cd);
}
break;
case "CloseView":
_12cd=_12ce.CloseViewParams;
_12b4=_12cd.ViewId;
closeView(_12cd);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12ce.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_12b5.countEntries()+"\n";
_12b5.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_12b1.debug(debug);
if(!_12b5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
var _12d1=_12ce.SelectElementParams.PerspectiveElementKey;
if(_12d1){
var _12d2={handleBroadcast:function(_12d3,arg){
switch(_12d3){
case BroadcastMessages.EXPLORERDECK_CHANGED:
if(arg==_12d1){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12ce.SelectElementParams.EntityToken);
EventBroadcaster.unsubscribe(BroadcastMessages.EXPLORERDECK_CHANGED,this);
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.EXPLORERDECK_CHANGED,_12d2);
StageBinding.selectPerspective(_12ce.SelectElementParams.PerspectiveElementKey);
}else{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12ce.SelectElementParams.EntityToken);
}
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12ce.MessageBoxParams);
break;
case "OpenViewDefinition":
_12cd=_12ce.OpenViewDefinitionParams;
_12b4=_12cd.Handle;
openViewDefinition(_12cd);
break;
case "LogEntry":
logEntry(_12ce.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12cd=_12ce.BroadcastMessageParams;
_12b1.debug("Server says: EventBroadcaster.broadcast ( \""+_12cd.Name+"\", "+_12cd.Value+" )");
EventBroadcaster.broadcast(_12cd.Name,_12cd.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_12b5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12ce.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12ce.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12ce.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12cd=_12ce.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12cd.ViewId,entityToken:_12cd.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12cd=_12ce.OpenGenericViewParams;
openGenericView(_12cd);
break;
case "OpenExternalView":
_12cd=_12ce.OpenExternalViewParams;
openExternalView(_12cd);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12ce.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_12b8);
}
function logEntry(_12d5){
var _12d6=_12d5.Level.toLowerCase();
SystemLogger.getLogger(_12d5.SenderId)[_12d6](_12d5.Message);
}
function openView(_12d7){
var list=paramsToList(_12d7.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12d7.ViewId);
def.entityToken=_12d7.EntityToken;
def.flowHandle=_12d7.FlowHandle;
def.position=_12bb[_12d7.ViewType],def.label=_12d7.Label;
def.image=_12d7.Image;
def.toolTip=_12d7.ToolTip;
def.argument={"url":_12d7.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12d7.ViewId,entityToken:_12d7.EntityToken,flowHandle:_12d7.FlowHandle,position:_12bb[_12d7.ViewType],url:_12d7.Url,label:_12d7.Label,image:_12d7.Image,toolTip:_12d7.ToolTip}));
}
}
function openDialogView(_12da){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12da.ViewId,flowHandle:_12da.FlowHandle,position:Dialog.MODAL,url:_12da.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12db){
var _12dc=_12db.DialogType.toLowerCase();
if(_12dc=="question"){
throw "Not supported!";
}else{
Dialog[_12dc](_12db.Title,_12db.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12dd){
var map={};
var _12df=false;
new List(_12dd.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12df=true;
});
var proto=ViewDefinitions[_12dd.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12dd.ViewId;
}
def.argument=_12df?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12e4){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12e4.ViewId);
def.label=_12e4.Label;
def.toolTip=_12e4.ToolTip;
def.image=_12e4.Image;
def.argument={"url":_12e4.Url,"list":paramsToList(_12e4.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12e6){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12e6.ViewId);
def.label=_12e6.Label;
def.toolTip=_12e6.ToolTip;
def.image=_12e6.Image;
def.url=_12e6.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12e8){
if(StageBinding.isViewOpen(_12e8.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12e8.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12e9){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12e9.ViewId,isSuccess:_12e9.Succeeded});
}
this._lockSystem=function(_12ea){
var _12eb=top.bindingMap.offlinetheatre;
if(_12ea){
_12eb.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12eb.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12b7=_12ea;
};
this.placeConsoleCommand=function(_12ed){
_12b2.PlaceConsoleCommand(Application.CONSOLE_ID,_12ed);
};
this.handleBroadcast=function(_12ee,arg){
switch(_12ee){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_12b4!=null&&arg==_12b4){
_12b4=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_12b5.set(arg,true);
}else{
_12b1.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_12b5.hasEntries()){
_12b5.del(arg);
_12b1.debug("Refreshed tree: "+arg+"\n("+_12b5.countEntries()+" trees left!)");
if(!_12b5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_12b6.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_12b6.hasEntries()==true){
_12b6.del(arg);
if(!_12b6.hasEntries()){
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
function paramsToList(_12f0){
var list=new List();
new List(_12f0).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.IconPack.SpriteSVG":new HostedViewDefinition({handle:"Composite.Management.IconPack.SpriteSVG",position:DockBinding.MAIN,label:"Sprite SVG",image:"${icon:icon}",url:"${root}/content/views/dev/icons/svg/sprite.cshtml"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12f3=false;
var _12f4=null;
var _12f5=false;
var _12f6=Client.qualifies();
var _12f7="admin";
var _12f8="123456";
if(!_12f6){
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
this.handleBroadcast=function(_12f9){
switch(_12f9){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12f9);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12fa=bindingMap.decks.getSelectedDeckBinding();
if(_12fa!=null){
switch(_12fa.getID()){
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
var _12fb=window.bindingMap.appwindow;
_12fb.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
var _12fc=window.location.hash.replace(/^#/,"");
if(_12fc){
window.location.hash="";
MessageQueue.placeConsoleCommand(_12fc);
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
function fileEventBroadcasterSubscriptions(_12fd){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12fe){
if(_12fd){
EventBroadcaster.subscribe(_12fe,KickStart);
}else{
EventBroadcaster.unsubscribe(_12fe,KickStart);
}
});
}
function kickStart(_12ff){
switch(_12ff){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12f3=true;
break;
}
if(_12f3){
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
DataManager.getDataBinding("username").setValue(_12f7);
DataManager.getDataBinding("password").setValue(_12f8);
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
var _1302=DataManager.getDataBinding("username").getResult();
var _1303=DataManager.getDataBinding("passwordold").getResult();
var _1304=DataManager.getDataBinding("passwordnew").getResult();
var _1305=DataManager.getDataBinding("passwordnew2").getResult();
if(_1304==_1305){
var _1306=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1307=LoginService.ChangePassword(_1302,_1303,_1304);
if(_1307 instanceof SOAPFault){
alert(_1307.getFaultString());
}else{
if(_1307.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_1307);
}
}
WebServiceProxy.isFaultHandler=true;
if(_1306){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_1308){
_1308=new List(_1308);
var _1309=document.getElementById("passworderror");
_1309.innerHTML="";
_1308.each(function(error){
var _130b=document.createElement("div");
_130b.textContent=error;
_130b.className="errortext";
_1309.appendChild(_130b);
});
_1309.style.display="block";
var _130c={handleAction:function(_130d){
document.getElementById("passworderror").style.display="none";
_130d.target.removeActionListener(Binding.ACTION_DIRTY,_130c);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_130c);
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
this.doLogin=function(_130e,_130f){
var _1310=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1311=false;
var _1312=false;
var _1313=LoginService.ValidateAndLogin(_130e,_130f);
if(_1313 instanceof SOAPFault){
alert(_1313.getFaultString());
}else{
if(_1313=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_1313=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_1313=="passwordUpdateRequired"){
_1312=true;
}
if(_1313=="success"){
_1311=true;
}
}
if(_1312){
changePasswordRequired();
}else{
if(_1311){
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
if(_1310){
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
var _1314=document.getElementById("passwordexpired");
_1314.firstChild.data=_1314.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _1315=DataManager.getDataBinding("username");
var _1316=DataManager.getDataBinding("password");
_1315.blur();
_1316.blur();
_1315.setValue("");
_1316.setValue("");
_1315.clean();
_1316.clean();
_1315.focus();
document.getElementById("loginerror").style.display="block";
var _1317={handleAction:function(_1318){
document.getElementById("loginerror").style.display="none";
_1318.target.removeActionListener(Binding.ACTION_DIRTY,_1317);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1317);
}
WindowManager.fireOnLoad(this);
if(!_12f6){
UpdateManager.isEnabled=false;
}
};

