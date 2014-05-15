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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",TOUCHEVENT_TOUCHSTART:"touchevent touchstart",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
_be=_be?_be:"DEFAULT";
if(_c2!=null&&_c1!=null){
_bf=url.replace("${name}",_c2).replace("${hash}",_c1).replace("${size}",_be);
if(_be=="DEFAULT"){
_bf=_bf.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
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
if(_cf.indexOf("${string:")>-1){
_cf=this._resolveString(_cf);
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
return _d8;
},_resolveClasses:function(_dc){
var _dd={};
resource=_dc.split("${class:")[1].split("}")[0];
_dd.classes=resource;
return _dd;
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
_Cookies.prototype={createCookie:function(_e0,_e1,_e2){
var _e3="";
if(_e2){
var _e4=new Date();
_e4.setTime(_e4.getTime()+(_e2*24*60*60*1000));
_e3="; expires="+_e4.toGMTString();
}
document.cookie=_e0+"="+escape(_e1)+_e3+"; path=/";
return this.readCookie(_e0);
},readCookie:function(_e5){
var _e6=null;
var _e7=_e5+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_e7)==0){
_e6=unescape(c.substring(_e7.length,c.length));
}
}
return _e6;
},eraseCookie:function(_eb){
this.createCookie(_eb,"",-1);
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
var _ec=SystemLogger.getLogger("StatusBar");
var _ed=null;
var _ee="${icon:error}";
var _ef="${icon:warning}";
var _f0="${icon:loading}";
var _f1="${icon:message}";
var _f2=null;
var _f3=null;
var _f4=null;
var _f5=null;
this.initialize=function(_f6){
_f2=StringBundle.getString("ui","Website.App.StatusBar.Error");
_f3=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_f4=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_f5=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_ed=_f6;
this.document=_f6.bindingDocument;
};
this.error=function(_f7,_f8){
this.state=StatusBar.ERROR;
_f7=_f7?_f7:_f2;
show(_f7,_ee,_f8,false);
};
this.warn=function(_f9,_fa){
this.state=StatusBar.WARN;
_f9=_f9?_f9:_f3;
show(_f9,_ef,_fa,false);
};
this.busy=function(_fb,_fc){
this.state=StatusBar.BUSY;
_fb=_fb?_fb:_f4;
show(_fb,_f0,_fc,false);
};
this.ready=function(_fd,_fe){
this.state=StatusBar.READY;
_fd=_fd?_fd:_f5;
show(_fd,_f1,_fe,true);
};
this.report=function(_ff,icon,vars,_102){
this.state=null;
show(_ff,icon,vars,_102);
};
this.clear=function(){
this.state=null;
if(_ed){
_ed.clear();
}
};
function show(_103,icon,vars,_106){
if(vars){
_103=Resolver.resolveVars(_103,vars);
}
if(_ed){
_ed.setLabel(_103);
_ed.setImage(icon);
if(_106){
_ed.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_ec.error("Message not initialized for display: "+_103);
}
}
this.addToGroup=function(name,_108){
if(!this._groups.has(name)){
this._groups.set(name,_ed.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(name).add(_108);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_109,arg){
switch(_109){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
var _10b=LocalizationService.GetActiveLocales(true);
if(_10b.length>=1){
this.languages=new List(_10b);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_109){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _10c=LocalizationService.GetLocales(true);
this.source=_10c.ForeignLocaleName;
this.target=_10c.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_10c.ForeignLocaleName,target:_10c.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _10d=this.languages.copy();
while(_10d.hasNext()){
var lang=_10d.getNext();
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
_Validator.prototype={validate:function(_10f,key,_111){
var _112=true;
var _113=SourceValidationService.ValidateSource(_10f,key);
if(_113!="True"){
if(_111==true){
this._dialog(_113);
}
_112=false;
}
return _112;
},validateInformed:function(_114,key){
return this.validate(_114,key,true);
},_dialog:function(_116){
setTimeout(function(){
Dialog.error("Source Invalid",_116);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_117,_118,_119,_11a){
this._count++;
this._eventListener(true,_117,_118,_119,_11a);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_117&&typeof _117.nodeType!=Types.UNDEFINED){
if(_117.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_117);
if(win){
var _11c={handleEvent:function(){
DOMEvents.removeEventListener(_117,_118,_119,_11a);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_11c);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_11c);
}
}
}
}
},removeEventListener:function(_11d,_11e,_11f,_120){
this._count--;
this._eventListener(false,_11d,_11e,_11f,_120);
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
},cleanupEventListeners:function(_126){
this._deleteWrappedHandler(_126);
},isCurrentTarget:function(e){
var _128=false;
if(Client.isMozilla==true){
_128=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_129,_12a){
var _12b=true;
if(_129==_12a){
_12b=false;
}
if(_12b==true){
while(_12a!=null&&_12a.nodeType!=Node.DOCUMENT_NODE&&_12a!=_129){
_12a=_12a.parentNode;
}
_12b=(_12a==_129);
}
return _12b;
},_eventListener:function(_12c,_12d,_12e,_12f,_130,_131){
if(Interfaces.isImplemented(IEventListener,_12f,true)){
if(typeof _12e!=Types.UNDEFINED){
var _132=this._getAction(_12c);
if(_12d[_132]){
if(Client.isExplorer||Client.isExplorer11){
switch(_12e){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_12f=this._getWrappedHandler(_12d,_12e,_12f,_131);
_12d[_132](_12e,_12f,false);
break;
default:
_12d[_132](_12e,_12f,false);
break;
}
}else{
switch(_12e){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12e=_12e==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12d[_132](_12e,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12f.handleEvent(e);
}
}},_130?true:false);
break;
default:
_12d[_132](_12e,_12f,_130?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_135){
var _136=null;
switch(_135){
case true:
_136="addEventListener";
break;
case false:
_136="removeEventListener";
break;
}
return _136;
},_getWrappedHandler:function(_137,_138,_139,_13a){
var _13b=null;
try{
if(!_139._domEventHandlers){
_139._domEventHandlers={};
}
if(!_139._domEventHandlers[_137]){
_139._domEventHandlers[_137]={};
}
if(!_139._domEventHandlers[_137][_138]){
var win=_137.nodeType?DOMUtil.getParentWindow(_137):_137;
if(win){
_139._domEventHandlers[_137][_138]=function(e){
if(win.event!=null&&_139!=null){
_139.handleEvent(win.event);
}else{
if(_139!=null){
_139.handleEvent(e);
}
}
};
}
}
_13b=_139._domEventHandlers[_137][_138];
}
catch(exception){
this._report(_137,_138,_139,_13a);
}
return _13b;
},_deleteWrappedHandler:function(_13e){
for(var _13f in _13e._domEventHandlers){
if(_13f){
for(var _140 in _13e._domEventHandlers[_13f]){
if(_140){
delete _13e._domEventHandlers[_13f][_140];
}
}
}
delete _13e._domEventHandlers[_13f];
}
},_report:function(_141,_142,_143,_144){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_141?_141.nodeName:_141)+"\n"+"\tevent: "+_142+"\n"+"\thandler: "+_143+"\n\n"+"Offending invoker: "+(_144.callee?_144.callee.toString():_144.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_146){
var _147=null;
var _148=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_148=node.documentElement;
}
if(_148.xml!=null){
return _148.xml;
}else{
if(this._serializer!=null){
if(_146==true){
_148=_148.cloneNode(true);
_148=DOMFormatter.format(_148,DOMFormatter.INDENTED_TYPE_RESULT);
}
_147=this._serializer.serializeToString(_148);
}
}
return _147;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _14b=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_14c){
var doc=_14c.ownerDocument;
var _14e=function(node,_150){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _151="",i=0;
while(i++<_150){
_151+=TAB;
}
var _153=node.firstChild;
while(_153){
switch(_153.nodeType){
case Node.ELEMENT_NODE:
if(_153==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_151));
}
node.insertBefore(doc.createTextNode(NEW+_151+TAB),_153);
_14e(_153,_150+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_151+TAB),_153);
break;
}
if(_153.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_153,_151+TAB);
}
}
_153=_153.nextSibling;
}
}
};
_14e(_14c,0);
}
function strip(_154){
var _155=[];
var _156={acceptNode:function(_157){
return (!_14b.test(_157.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _158=_154.ownerDocument.createTreeWalker(_154,NodeFilter.SHOW_TEXT,_156,true);
while(_158.nextNode()){
_155.push(_158.currentNode);
}
var i=0,_15a;
while((_15a=_155[i++])!=null){
_15a.parentNode.removeChild(_15a);
}
}
function formatCDATASection(node,_15c){
if(node.textContent.indexOf(NEW)>-1){
var _15d=node.textContent.split(NEW);
var _15e="",line,_160=0,_161=true;
while((line=_15d.shift())!=null){
if(_160==0&&line.charAt(0)==TAB){
while(line.charAt(_160++)==TAB){
}
}
line=line.substring(_160,line.length);
if(_15d.length>0){
_15e+=_15c+TAB+line;
_15e+=_161?"":"\n";
}else{
_15e+=_15c+line;
_15c=_15c.slice(1,_15c.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_15c));
}
_161=false;
}
node.textContent=_15e;
}
}
this.format=function(_162,_163){
var _164=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_162);
if(_163!=_164){
indent(_162);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_162);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_165){
var sig,_167=null,_168=this.MSXML_MAXVERSION;
while(!_167&&_168>=this.MSXML_MINVERSION){
try{
sig=_165.replace("{$version}",_168);
_167=new ActiveXObject(sig);
}
catch(exception){
}
_168--;
}
return _167;
},getXMLHTTPRequest:function(){
var _169=null;
if(Client.isExplorer||Client.isExplorer11){
_169=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_169=new XMLHttpRequest();
}
return _169;
},getDOMDocument:function(_16a){
var _16b=null;
if(Client.isExplorer||Client.isExplorer11){
_16b=this.getMSComponent(_16a?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_16b=doc;
}
return _16b;
},getMSXMLXSLTemplate:function(){
var _16d=null;
if(Client.isExplorer||Client.isExplorer11){
_16d=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _16d;
},getLocalName:function(_16e){
var _16f=null;
if(_16e.localName){
_16f=_16e.localName.replace("ui:","");
}else{
if(_16e.baseName){
_16f=_16e.baseName;
}else{
_16f=_16e.nodeName.toLowerCase();
}
}
return _16f;
},getComputedStyle:function(_170,_171){
var _172=null;
if(Client.isExplorer){
if(_170.currentStyle!=null){
_172=_170.currentStyle[_171];
}else{
this._logger.error("Could not compute style for element "+_170.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _173=_170.ownerDocument.defaultView.getComputedStyle(_170,null);
if(_173!=null){
_172=_173.getPropertyValue(_171);
}else{
this._logger.error("Could not compute style for element "+_170.nodeName);
SystemDebug.stack(arguments);
}
}
return _172;
},getMaxIndex:function(doc){
var max=0,_176=new List(doc.getElementsByTagName("*"));
_176.each(function(_177){
var _178=CSSComputer.getZIndex(_177);
if(_178>max){
max=_178;
}
});
return max;
},getOrdinalPosition:function(_179,_17a){
var _17b=null;
var _17c=-1;
var _17d=this.getLocalName(_179);
var _17e=new List(_179.parentNode.childNodes);
while(_17e.hasNext()){
var _17f=_17e.getNext();
if(_17f.nodeType==Node.ELEMENT_NODE){
if(!_17a||this.getLocalName(_17f)==_17d){
_17c++;
if(_17f==_179||(_17f.id!=""&&_17f.id==_179.id)){
_17b=_17c;
break;
}
}
}
}
return _17b;
},isFirstElement:function(_180,_181){
return (this.getOrdinalPosition(_180,_181)==0);
},isLastElement:function(_182,_183){
var _184=_182.parentNode.getElementsByTagName(_183?this.getLocalName(_182):"*");
return (this.getOrdinalPosition(_182)==_184.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _188=null;
if(node.textContent){
_188=node.textContent;
}else{
if(node.text){
_188=node.text;
}else{
_188=node.innerText;
}
}
return _188;
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
},getAncestorByLocalName:function(_18b,node,_18d){
var _18e=null;
while(_18e==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_18d==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_18b){
_18e=node;
}
}
return _18e;
},contains:function(_190,node){
return _190.contains?_190!=node&&_190.contains(node):!!(_190.compareDocumentPosition(node)&16);
},createElementNS:function(_192,_193,_194){
var _195=null;
if(_194==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_195=_194.createElementNS(_192,_193);
}else{
if(_194.xml!=null){
_195=_194.createNode(Node.ELEMENT_NODE,_193,_192);
}else{
_195=_194.createElement(_193.replace("ui:",""));
}
}
}
return _195;
},getElementsByTagName:function(node,_197){
var _198=null;
if(Client.isMozilla){
_198=node.getElementsByTagNameNS(Constants.NS_XHTML,_197);
}else{
_198=node.getElementsByTagName(_197);
}
return _198;
},getNextElementSibling:function(_199){
return Client.isExplorer?_199.nextSibling:_199.nextElementSibling;
},getPreviousElementSibling:function(_19a){
return Client.isExplorer?_19a.previousSibling:_19a.previousElementSibling;
},cloneNode:function(node){
var _19c=null;
if(Client.isMozilla==true){
_19c=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_19c=node.cloneNode(true);
}
return _19c;
},getLocalPosition:function(_19d){
var _19e=new Point(_19d.offsetLeft,_19d.offsetTop);
if(Client.isExplorer&&_19d.parentNode&&_19d.parentNode.currentStyle){
if(_19d.parentNode.currentStyle.position=="static"){
var _19f=this.getLocalPosition(_19d.parentNode);
_19e.x+=_19f.x;
_19e.y+=_19f.y;
}
}
return _19e;
},getGlobalPosition:function(_1a0){
return this._getPosition(_1a0,false);
},getUniversalPosition:function(_1a1){
return this._getPosition(_1a1,true);
},_getPosition:function(_1a2,_1a3){
var _1a4=null;
if(typeof _1a2.getBoundingClientRect!=Types.UNDEFINED){
var rect=_1a2.getBoundingClientRect();
_1a4={x:rect.left,y:rect.top};
if(Client.isMozilla){
_1a4.x-=_1a2.scrollLeft;
_1a4.y-=_1a2.scrollTop;
}
}else{
_1a4={x:_1a2.offsetLeft-_1a2.scrollLeft,y:_1a2.offsetTop-_1a2.scrollTop};
while(_1a2.offsetParent){
_1a2=_1a2.offsetParent;
_1a4.x+=(_1a2.offsetLeft-_1a2.scrollLeft);
_1a4.y+=(_1a2.offsetTop-_1a2.scrollTop);
}
}
if(_1a3){
var win=DOMUtil.getParentWindow(_1a2);
if(win){
var _1a7=win.frameElement;
if(_1a7){
var add=DOMUtil.getUniversalPosition(_1a7);
_1a4.x+=add.x;
_1a4.y+=add.y;
}
}
}
return new Point(_1a4.x,_1a4.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1ac){
var _1ad=DOMEvents.getTarget(e);
var _1ae={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1ad.ownerDocument;
var win=this.getParentWindow(doc);
_1ae.x-=win.pageXOffset;
_1ae.y-=win.pageYOffset;
}
if(_1ac){
var _1b1=this.getParentWindow(_1ad).frameElement;
if(_1b1){
var add=this.getUniversalPosition(_1b1);
_1ae.x+=add.x;
_1ae.y+=add.y;
}
}
return _1ae;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1b4){
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
if(!_1b4){
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
if(!_1b4){
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
},isWellFormedDocument:function(xml,_1b7,_1b8){
var _1b9=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1bb=SourceValidationService.IsWellFormedDocument(xml);
if(_1bb!="True"){
_1b9=false;
if(_1b7==true){
if(_1b8){
if(confirm("Not well-formed\n"+_1bb+"\nContinue?")){
_1b9=true;
}
}else{
this._illFormedDialog(_1bb);
}
}
}
return _1b9;
},isWellFormedFragment:function(xml,_1bd){
var _1be=true;
var _1bf=SourceValidationService.IsWellFormedFragment(xml);
if(_1bf!="True"){
_1be=false;
if(_1bd==true){
this._illFormedDialog(_1bf);
}
}
return _1be;
},_illFormedDialog:function(_1c0){
setTimeout(function(){
Dialog.error("Not well-formed",_1c0);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1c1){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1c2){
return _1c1[_1c2];
}};
}else{
this._nsResolver=_1c1;
}
};
XPathResolver.prototype.resolve=function(_1c3,node,_1c5){
var _1c6=null;
try{
if(this._evaluator){
_1c6=this._evaluateDOMXpath(_1c3,node,_1c5?true:false);
}else{
_1c6=this._evaluateMSXpath(_1c3,node,_1c5?true:false);
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
return _1c6;
};
XPathResolver.prototype.resolveAll=function(_1c7,node){
return this.resolve(_1c7,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c9,node,_1cb){
var _1cc=null;
if(node){
var _1cc=this._evaluator.evaluate(_1c9,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1cb){
var list=new List();
while((node=_1cc.iterateNext())!=null){
list.add(node);
}
_1cc=list;
}else{
_1cc=_1cc.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1cc;
};
XPathResolver.prototype._evaluateMSXpath=function(_1cf,node,_1d1){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1d3="";
for(var _1d4 in this._nsResolver){
_1d3+="xmlns:"+_1d4+"=\""+this._nsResolver[_1d4]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1d3);
if(_1d1){
var list=new List();
var i=0,_1d7=node.selectNodes(_1cf);
while(i<_1d7.length){
list.add(_1d7.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1cf);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d9=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d9);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d9;
}
};
XSLTransformer.prototype._import=function(url){
var _1db=null;
if(Client.hasXSLTProcessor){
var _1dc=DOMUtil.getXMLHTTPRequest();
_1dc.open("get",Resolver.resolve(url),false);
_1dc.send(null);
_1db=_1dc.responseXML;
}else{
var _1db=DOMUtil.getDOMDocument(true);
_1db.async=false;
_1db.load(url);
}
return _1db;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1de=null;
if(Client.hasXSLTProcessor){
_1de=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1de;
};
XSLTransformer.prototype.transformToString=function(dom,_1e0){
var _1e1=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1e1=DOMSerializer.serialize(doc,_1e0);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1e1=proc.output;
}
return _1e1;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1e4){
var _1e5=_1e4.style?_1e4.className:_1e4.getAttribute("class");
_1e5=_1e5?_1e5:"";
return _1e5;
},_contains:function(_1e6,sub){
return _1e6.indexOf(sub)>-1;
},_attach:function(_1e8,sub){
return _1e8+(_1e8==""?"":" ")+sub;
},_detach:function(_1ea,sub){
if(this._contains(_1ea," "+sub)){
sub=" "+sub;
}
return _1ea.replace(sub,"");
},attachClassName:function(_1ec,_1ed){
if(_1ec.classList!=null){
if(!_1ec.classList.contains(_1ed)){
_1ec.classList.add(_1ed);
}
}else{
var _1ee=this._getCurrent(_1ec);
if(!this._contains(_1ee,_1ed)){
_1ee=this._attach(_1ee,_1ed);
}
if(_1ec.style!=null){
_1ec.className=_1ee;
}else{
_1ec.setAttribute("class",_1ee);
}
}
},detachClassName:function(_1ef,_1f0){
if(_1ef.classList!=null){
if(_1ef.classList.contains(_1f0)){
_1ef.classList.remove(_1f0);
}
}else{
var _1f1=this._getCurrent(_1ef);
if(this._contains(_1f1,_1f0)){
_1f1=this._detach(_1f1,_1f0);
}
if(_1ef.style!=null){
_1ef.className=_1f1;
}else{
if(_1f1==""){
_1ef.removeAttribute("class");
}else{
_1ef.setAttribute("class",_1f1);
}
}
}
},hasClassName:function(_1f2,_1f3){
var _1f4=false;
if(_1f2.classList!=null){
_1f4=_1f2.classList.contains(_1f3);
}else{
_1f4=this._contains(this._getCurrent(_1f2),_1f3);
}
return _1f4;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f5,_1f6){
var _1f7={};
for(var _1f8 in _1f5){
var ent=parseInt(DOMUtil.getComputedStyle(_1f6,_1f5[_1f8]));
_1f7[_1f8]=isNaN(ent)?0:ent;
}
return _1f7;
},_getMargin:function(_1fa){
return this._getComplexResult(this._margins,_1fa);
},getPadding:function(_1fb){
return this._getComplexResult(this._paddings,_1fb);
},getBorder:function(_1fc){
return this._getComplexResult(this._borders,_1fc);
},getPosition:function(_1fd){
return DOMUtil.getComputedStyle(_1fd,"position");
},getFloat:function(_1fe){
return DOMUtil.getComputedStyle(_1fe,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1ff){
return parseInt(DOMUtil.getComputedStyle(_1ff,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_200){
return DOMUtil.getComputedStyle(_200,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _201=SystemLogger.getLogger("System");
var root=null;
var _203=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_204){
if(_203==null){
_203={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_205){
_203[_205.Key]=_205.Value;
});
}
return _203[_204];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _206=new List();
var _207=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_207);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_209){
_206.add(new SystemNode(_209));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _206;
};
this.getChildNodes=function(node,_20b){
var _20c=new List();
var _20d=null;
if(_20b){
if(SearchTokens.hasToken(_20b)){
_20b=SearchTokens.getToken(_20b);
}
_20d=TreeService.GetElementsBySearchToken(node.getData(),_20b);
}else{
_20d=TreeService.GetElements(node.getData());
}
new List(_20d).each(function(_20e){
var _20f=new SystemNode(_20e);
if(_20b){
_20f.searchToken=_20b;
}
_20c.add(_20f);
});
return _20c;
};
this.getDescendantBranch=function(_210){
var map=new Map();
var arg=[];
_210.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _214=TreeService.GetMultipleChildren(arg);
var _215=new List(_214);
while(_215.hasNext()){
this._listNodesInMap(_215.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_216,_217,_218){
var map=new Map();
var arg=[];
_218.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _21c=TreeService.FindEntityToken(_216,_217,arg);
if(_21c instanceof SOAPFault){
_201.error(_21c.getFaultString());
if(Application.isDeveloperMode){
alert(_21c.getFaultString());
}
map=null;
}else{
var _21d=new List(_21c);
while(_21d.hasNext()){
this._listNodesInMap(_21d.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_21e,map){
var list=new List();
var key=_21e.ElementKey;
var _222=new List(_21e.ClientElements);
map.set(key,list);
while(_222.hasNext()){
var _223=_222.getNext();
list.add(new SystemNode(_223));
}
};
this.getChildNodesBySearchToken=function(node,_225){
return this.getChildNodes(node,_225);
};
this.getNamedRoots=function(key,_227){
var _228=new List();
var _229=null;
if(_227){
if(SearchTokens.hasToken(_227)){
_227=SearchTokens.getToken(_227);
}
_229=TreeService.GetNamedRootsBySearchToken(key,_227);
}else{
_229=TreeService.GetNamedRoots(key);
}
new List(_229).each(function(_22a){
var node=new SystemNode(_22a);
if(_227){
node.searchToken=_227;
}
_228.add(node);
});
return _228;
};
this.getNamedRootsBySearchToken=function(key,_22d){
return this.getNamedRoots(key,_22d);
};
function compileActionList(node,_22f,_230){
var _231=_22f.ClientElementActionGroupId;
if(_231!=null){
var _232=_230.get(_231).ClientElementActionGroupItems;
if(_232&&_232.length>0){
node.setActionList(new List(_232));
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
new List(self._data.Actions).each(function(_238){
var _239=_238.ActionCategory.Name;
if(SystemAction.hasCategory(_239)){
var _23a=new SystemAction(_238);
SystemAction.actionMap.set(_238.ActionKey,_23a);
}else{
throw "No such action category: "+_239;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _23b=null;
if(this.searchToken){
_23b=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_23b=System.getChildNodes(this);
}
return _23b;
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
var _23d=this._data.Piggybag;
if(_23d==null){
_23d="";
}
return _23d;
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
var _23f=null;
if(typeof this._data.ToolTip!="undefined"){
_23f=this._data.ToolTip;
}
return _23f;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_241){
map[_241.Key]=_241.Value;
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
var _245=SystemAction.actionMap.get(key);
var _246=true;
if(_245.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_246=false;
}
}
if(_246){
var id=_245.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_245);
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
SystemAction.invoke=function(_249,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_249.logger.debug("Execute \""+_249.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_249.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_24c,_24d){
action=SystemAction.taggedActions.get(_24c);
node=SystemNode.taggedNodes.get(_24d);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_24e){
return SystemAction.categories[_24e]?true:false;
};
function SystemAction(_24f){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_24f;
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
var _250=null;
if(this.isInFolder()){
_250=this._data.ActionCategory.FolderName;
}
return _250;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _251=null;
if(typeof this._data.TagValue!="undefined"){
_251=this._data.TagValue;
}
return _251;
};
SystemAction.prototype.isChecked=function(){
var _252=null;
if(this.isCheckBox()){
_252=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _252;
};
function _UpdateManager(){
var _253=null;
if(!window.UpdateManager){
this._construct();
_253=this;
}
return _253;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_254){
var root=document.documentElement;
var _256=root.namespaceURI;
if(_256==null){
_256=new String(root.getAttribute("xmlns"));
}
if(_256=="http://www.w3.org/1999/xhtml"){
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
var _257=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_257);
}else{
throw new TypeError();
}
}else{
var _258=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_258.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _25a=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_25a=true;
}
},this);
return _25a;
},_setupForm:function(form){
var _25d=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_25d.isEnabled){
_25d._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_25e,type){
if(_25e.addEventListener!=null){
_25e.addEventListener(type,this,false);
}else{
var _260=this;
_25e.attachEvent("on"+type,function(){
_260.handleEvent(window.event);
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
var _265=UpdateAssistant.getUpdateZones(dom);
var _266=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_265.forEach(function(_267,_268){
var _269=_266[_268];
this._crawl(_267,_269);
},this);
this._updates.forEach(function(_26a,_26b){
_26a.update();
_26a.dispose();
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
},_crawl:function(_26d,_26e,_26f,id){
var _271=true;
var _272=_26e.getAttribute("class");
if(_272==null||_272.indexOf(this.CLASSNAME_GONE)==-1){
if(_26e.nodeType==Node.ELEMENT_NODE){
var _273=_26e.getAttribute("id");
if(_273!=null){
_26f=_26d;
id=_273;
}
}
if(_271=this._check(_26d,_26e,_26f,id)){
var _274=_26d.firstChild;
var _275=_26e.firstChild;
while(_274!=null&&_275!=null&&!this._replaced[id]){
switch(_274.nodeType){
case Node.TEXT_NODE:
_271=this._check(_274,_275,_26f,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_271=this._crawl(_274,_275,_26f,id);
break;
}
if(this._replaced[id]){
_271=false;
}else{
_274=_274.nextSibling;
_275=_275.nextSibling;
}
}
}
}
return _271;
},_check:function(_276,_277,_278,id){
var _27a=true;
var _27b=null;
var _27c=false;
var _27d=false;
if((_276!=null&&_277==null)||(_276==null&&_277!=null)){
_27a=false;
}else{
if(_27a=_276.nodeType==_277.nodeType){
switch(_277.nodeType){
case Node.ELEMENT_NODE:
if(_276.namespaceURI!=_277.namespaceURI||_276.nodeName!=_277.nodeName){
_27a=false;
}else{
if(_27a=(_276.nodeName==_277.nodeName)){
var _27e=_277.getAttribute("id");
var _27f=_276.getAttribute("id");
if(_27e!=null&&_27f!=null){
if(_27e!=_27f){
_27a=false;
}else{
if((_27b=this._getPlugin(_276,_277))!=null){
if(_27b.updateElement(_276,_277)){
_27d=true;
_27a=false;
}
}
}
}
if(_27a){
if(_27a=this._checkAttributes(_276,_277)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_276)&&this._hasSoftChildren(_277)){
if(this._validateSoftChildren(_276,_277)){
this._updateSoftChildren(_276,_277);
_27c=true;
}
_27a=false;
}else{
_27a=_276.childNodes.length==_277.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_276.data.trim()!=_277.data.trim()){
_27a=false;
}
break;
}
}
}
if(_27a==false&&!_27c&&!_27d){
if(id!=null&&_278!=null){
this.addUpdate(new ReplaceUpdate(id,_278));
}
}
return _27a;
},_checkAttributes:function(_280,_281){
var _282=true;
var _283=false;
var _284=_280.attributes;
var _285=_281.attributes;
if(_284.length!=_285.length){
_283=true;
}else{
_283=!Array.every(_284,function(att1,i){
var att2=_285.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_283){
var _289=_280.getAttribute("id");
var _28a=_281.getAttribute("id");
if(this.hasSoftAttributes&&_289!=null&&_289==_28a){
this.addUpdate(new AttributesUpdate(_28a,_280,_281));
}else{
_282=false;
}
}
return _282;
},_hasSoftChildren:function(_28b){
var _28c=true;
if(_28b.hasChildNodes()){
_28c=Array.every(_28b.childNodes,function(node){
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
return _28c;
},_validateSoftChildren:function(_28f,_290){
var _291=true;
var _292=-1;
var _293=-1;
var _294=-1;
var news=this._toMap(_28f.childNodes,true);
var olds=this._toMap(_290.childNodes,true);
for(var id in olds){
if(_291){
var _298=olds[id];
_291=_298>=_292;
if(news[id]!=null){
_294=news[id];
_291=_294>=_293;
}
}
_292=_298;
if(_294>-1){
_293=_294;
}
}
return _291;
},_updateSoftChildren:function(_299,_29a){
var news=this._toMap(_299.childNodes);
var olds=this._toMap(_29a.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _29e=null;
for(id in news){
if(olds[id]==null){
var _29f=news[id];
if(_29e==null){
var _2a0=_29a.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_2a0,_29f,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29e,_29f,false));
}
}
_29e=id;
}
},addUpdate:function(_2a1){
this._updates.push(_2a1);
if(_2a1 instanceof ReplaceUpdate){
this._replaced[_2a1.id]=true;
}
},_getPlugin:function(_2a2,_2a3){
var _2a4=null;
this.plugins.every(function(_2a5){
if(_2a5.handleElement(_2a2,_2a3)){
_2a4=_2a5;
}
return _2a4==null;
});
return _2a4;
},_toMap:function(_2a6,_2a7){
var _2a8={};
Array.forEach(_2a6,function(node,_2aa){
if(node.nodeType==Node.ELEMENT_NODE){
_2a8[node.getAttribute("id")]=_2a7?_2aa:node;
}
});
return _2a8;
},_getPost:function(form){
var _2ac=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2ae){
if(_2ae.name==null||_2ae.name==""){
return;
}
var name=_2ae.name;
var _2b0=encodeURIComponent(_2ae.value);
switch(_2ae.type){
case "button":
case "submit":
var _2b1=UpdateAssistant.getActiveElement();
if(_2ae==_2b1&&name!=""){
_2ac+=name+"="+_2b0+"&";
}
break;
case "radio":
if(_2ae.checked){
_2ac+=name+"="+_2b0+"&";
}
break;
case "checkbox":
if(_2ae.checked){
if(_2ae.name==last){
if(_2ac.lastIndexOf("&")==_2ac.length-1){
_2ac=_2ac.substr(0,_2ac.length-1);
}
_2ac+=","+_2b0;
}else{
_2ac+=name+"="+_2ae.value;
}
last=name;
_2ac+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2ac+=name+"="+_2b0+"&";
break;
}
});
}
return _2ac.substr(0,_2ac.length-1);
},_postRequest:function(form){
var _2b3=form.method!=""?form.method:"get";
var _2b4=form.action!=""?form.action:window.location.toString();
var _2b5=this._getPost(form);
if(_2b3=="get"){
if(_2b4.indexOf("?")>-1){
_2b4=_2b4+"&"+_2b5;
}else{
_2b4+"?"+_2b5;
}
}
var _2b6=this;
var _2b7=UpdateAssistant.getXMLHttpRequest(_2b3,_2b4,this);
if(_2b3=="post"){
_2b7.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b7.send(_2b3=="post"?_2b5:null);
},_fixdotnet:function(dom,id){
var _2ba=document.getElementById(id);
if(_2ba!=null){
var _2bb=UpdateAssistant.getElementById(dom,id);
if(_2bb!=null){
var _2bc=_2bb.getAttribute("value");
if(_2bc!==_2ba.value){
_2ba.value=_2bc;
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
},report:function(_2bf){
this.summary+=_2bf+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2c0=null;
if(!window.UpdateAssistant){
this._construct();
_2c0=this;
}
return _2c0;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2c1,fun){
var _2c3=true;
var len=_2c1.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c5=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c1[i]!="undefined"){
if(!fun.call(_2c5,_2c1[i],i,_2c1)){
_2c3=false;
break;
}
}
}
}
return _2c3;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c8=arguments[1];
return Array.every(this,fun,_2c8);
};
}
if(!Array.forEach){
Array.forEach=function(_2c9,fun){
var len=_2c9.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2cc=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c9[i]!="undefined"){
fun.call(_2cc,_2c9[i],i,_2c9);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2cf=arguments[1];
Array.forEach(this,fun,_2cf);
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
},getXMLHttpRequest:function(_2d1,_2d2,_2d3){
var _2d4=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2d4!=null){
_2d4.open(_2d1,_2d2,(_2d3!=null?true:false));
if(_2d3!=null){
function action(){
if(_2d4.readyState==4){
var _2d5=_2d4.getResponseHeader("X-Error-Type");
if(_2d5){
var _2d6="";
for(var i=0;i<10;i++){
var _2d8=i?i:"";
var _2d5=_2d4.getResponseHeader("X-Error-Type"+_2d8);
if(!_2d5){
break;
}
var _2d9=_2d4.getResponseHeader("X-Error-Message"+_2d8);
_2d6+=_2d5+"\n"+_2d9+"\n";
}
Dialog.error("Error",_2d6);
}else{
var text=_2d4.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d3.handleResponse(dom);
}
}
}
}
if(_2d4.addEventListener!=null){
_2d4.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2d4.onreadystatechange=action;
}
}
}
return _2d4;
},dispatchEvent:function(_2dc,name){
var _2de=true;
var _2df=document.createEvent("UIEvents");
_2df.initEvent(name,true,true);
_2de=_2dc.dispatchEvent(_2df);
return _2de;
},getUpdateZones:function(dom){
var _2e1="//*[@id and contains(@class,'updatezone')]";
var _2e2=[];
var _2e3=null;
var _2e4=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e3=dom.evaluate(_2e1,dom,null,type,null);
while((_2e4=_2e3.iterateNext())!=null){
_2e2.push(_2e4);
}
}else{
_2e3=dom.documentElement.selectNodes(_2e1);
Array.forEach(_2e3,function(_2e6){
_2e2.push(_2e6);
});
}
return _2e2;
},getElementById:function(dom,id){
var _2e9="//*[@id='"+id+"']";
var _2ea=null;
var _2eb=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2ea=dom.evaluate(_2e9,dom,null,type,null);
_2eb=_2ea.singleNodeValue;
}else{
_2eb=dom.documentElement.selectNodes(_2e9)[0];
}
return _2eb;
},_getIds:function(dom){
var _2ee="//*[@id]";
var _2ef=null;
var _2f0=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2ef=dom.evaluate(_2ee,dom,null,type,null);
while((element=_2ef.iterateNext())!=null){
_2f0.push(element.getAttribute("id"));
}
}else{
_2ef=dom.documentElement.selectNodes(_2ee);
Array.forEach(_2ef,function(_2f2){
_2f0.push(_2f2.getAttribute("id"));
});
}
return _2f0;
},toHTMLElement:function(_2f3){
var _2f4=this.serialize(_2f3);
var temp=document.createElement("temp");
temp.innerHTML=_2f4;
return temp.firstChild;
},getActiveElement:function(){
var _2f6=document.activeElement;
if(_2f6==null||_2f6==document.body){
_2f6=this._activeElement;
}
return _2f6;
},serialize:function(_2f7){
var _2f8=null;
if(_2f7.xml!=null){
_2f8=_2f7.xml;
}else{
if(this._serializer!=null){
_2f8=this._serializer.serializeToString(_2f7);
}
}
return _2f8;
},hasDifferences:function(_2f9,_2fa){
var s1=null;
var s2=null;
if(_2f9.xml!=null){
s1=_2f9.xml;
s2=_2fa.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f9);
s2=this._serializer.serializeToString(_2fa);
}
}
return s1!=s2;
},parse:function(_2fd){
var _2fe=null;
if(this._parser!=null&&window.XPathResult!=null){
_2fe=this._parser.parseFromString(_2fd,"text/xml");
}else{
_2fe=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2fe.setProperty("SelectionLanguage","XPath");
_2fe.loadXML(_2fd);
}
return this._validate(_2fe);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _301=dom.getElementsByTagName("parsererror").item(0);
if(_301!=null){
out=_301.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _305=!has[id];
has[id]=true;
if(!_305){
out="Element \""+id+"\" encountered twice.";
}
return _305;
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
this.handleElement=function(_306,_307){
var _308=false;
switch(_306.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_306.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_308=false;
break;
}
break;
}
return _308;
};
this.updateElement=function(_309,_30a){
var id=_309.getAttribute("id");
var _30c=document.getElementById(id);
if(_30c!=null){
var _30d=null;
switch(_30c.nodeName.toLowerCase()){
case "input":
_30d=_309.getAttribute("value");
break;
case "textarea":
_30d=_309.textContent?_309.textContent:_309.text;
break;
}
if(_30d==null){
_30d="";
}
if(_30d!=_30c.value){
_30c.value=_30d;
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
},_beforeUpdate:function(_30e){
var _30f=true;
if(_30e!=null){
_30e.__updateType=this.type;
_30f=UpdateAssistant.dispatchEvent(_30e,Update.EVENT_BEFOREUPDATE);
}
return _30f;
},_afterUpdate:function(_310){
var _311=true;
if(_310!=null){
_310.__updateType=this.type;
_311=UpdateAssistant.dispatchEvent(_310,Update.EVENT_AFTERUPDATE);
}
return _311;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_313){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_313;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _314,_315,_316=UpdateAssistant.toHTMLElement(this.element);
if((_314=document.getElementById(this.id))!=null){
if((_315=_314.parentNode)!=null){
var _317=UserInterface.getBinding(_314);
if(_317!=null){
_316.__isAttached=_317.isAttached;
}
if(this._beforeUpdate(_314)){
_315.replaceChild(_316,_314);
this._afterUpdate(_316);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_318){
var _319=ReplaceUpdate.superclass._afterUpdate.call(this,_318);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_318.nodeName=="form"||_318.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _319;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_31c,_31d){
this.type=type;
this.id=id;
this.element=_31c;
this.isFirst=_31d;
return this;
}
SiblingUpdate.prototype.update=function(){
var _31e=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_31e);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_31e);
break;
}
};
SiblingUpdate.prototype._remove=function(_31f){
var _320=_31f.parentNode;
if(_320!=null){
if(this._beforeUpdate(_31f)){
_320.removeChild(_31f);
this._afterUpdate(_320);
}
}
};
SiblingUpdate.prototype._insert=function(_321,_322){
var _323=UpdateAssistant.toHTMLElement(_321);
if(this.isFirst){
var _324=_322;
if(_324!=null){
if(this._beforeUpdate(_324)){
_324.insertBefore(_323,_324.firstChild);
this._afterUpdate(_323);
}
}
}else{
var _324=_322.parentNode;
if(_324!=null){
if(this._beforeUpdate(_324)){
_324.insertBefore(_323,_322.nextSibling);
this._afterUpdate(_323);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_325){
var _326=SiblingUpdate.superclass._beforeUpdate.call(this,_325);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_325.id+"\"");
}
return _326;
};
SiblingUpdate.prototype._afterUpdate=function(_327){
var _328=true;
if(_327!=null){
_328=SiblingUpdate.superclass._afterUpdate.call(this,_327);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_327.id+"\"");
if(_327.nodeName=="form"||_327.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _328;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_32a,_32b){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_32a;
this.currentElement=_32b;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _32c=document.getElementById(this.id);
if(this._beforeUpdate(_32c)){
this._updateAttributes(_32c);
this._afterUpdate(_32c);
}
};
AttributesUpdate.prototype._updateAttributes=function(_32d){
Array.forEach(this.element.attributes,function(_32e){
var _32f=this.currentElement.getAttribute(_32e.nodeName);
if(_32f==null||_32f!=_32e.nodeValue){
this._setAttribute(_32d,_32e.nodeName,_32e.nodeValue);
this._summary.push("@"+_32e.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_330){
if(this.element.getAttribute(_330.nodeName)==null){
this._setAttribute(_32d,_330.nodeName,null);
this._summary.push("@"+_330.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_331,name,_333){
if(_331==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_333);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _334=(_333==null);
if(_334){
_331.removeAttribute(name);
}else{
_331.setAttribute(name,_333);
}
if(document.all!=null){
if(_334){
_333="";
}
switch(name.toLowerCase()){
case "class":
_331.className=_333;
break;
case "disabled":
_331.disabled=!_334;
break;
case "checked":
_331.checked=!_334;
break;
case "readonly":
_331.readOnly=!_334;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_335){
AttributesUpdate.superclass._afterUpdate.call(this,_335);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_336,key){
return _336.replace("${windowkey}",document.location+":"+key);
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
var _33a=this._newDimensions.w!=this._currentDimensions.w;
var _33b=this._newDimensions.h!=this._currentDimensions.h;
if(_33a||_33b){
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
},fireOnDOM:function(_33d){
if(Interfaces.isImplemented(IDOMHandler,_33d,true)){
this._ondomstatements.add(_33d);
}
},fireOnLoad:function(_33e){
if(Interfaces.isImplemented(ILoadHandler,_33e,true)){
this._onloadstatements.add(_33e);
}
},fireOnResize:function(_33f){
if(Interfaces.isImplemented(IResizeHandler,_33f,true)){
this._onresizestatements.add(_33f);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_340){
return eval(_340);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_341,_342){
SystemLogger.unsuspend(_342);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_343,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _346=top.app.bindingMap.broadcasterHasDirtyTabs;
_346.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_347,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _34a=top.app.bindingMap.broadcasterHasDirtyTabs;
_34a.disable();
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
var _34b=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_34b=LoginService.Logout(true);
if(!_34b){
alert("Logout failed.");
}
}
return _34b;
},lock:function(_34c){
if(_34c!=null){
this._lockthings[_34c]=true;
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
},unlock:function(_34d,_34e){
if(_34d!=null){
delete this._lockthings[_34d];
if(top.bindingMap.mastercover!=null){
if(_34e||this._lockers>0){
if(_34e){
var out="Unlocked by "+new String(_34d)+"\n";
for(var _350 in this._lockthings){
out+="Locked by "+new String(_350)+". ";
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
},hasLock:function(_351){
return this._lockthings[_351]==true;
},activate:function(_352){
var _353=this._activeBinding;
this._activeBinding=_352;
this._activatedBindings.add(_352);
if(_353&&_353.isActive){
_353.deActivate();
}
},deActivate:function(_354){
var _355=null;
var _356=null;
if(_354==this._activeBinding){
while(!_356&&this._activatedBindings.hasEntries()){
_355=this._activatedBindings.extractLast();
if(_355!=_354&&_355.isActivatable){
_356=_355;
}
}
if(!_356){
_356=app.bindingMap.explorerdock;
}
_356.activate();
}
},focused:function(_357){
this.isFocused=_357;
if(_357){
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
},handleAction:function(_35c){
switch(_35c.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _35e=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_360){
var src=_360.src;
if(src.indexOf(_35e)>-1){
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
var _365=false;
if(this._isMousePositionTracking){
_365=true;
if(Client.isExplorer&&e.button!=1){
_365=false;
}
if(_365){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _365;
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
},onDragStart:function(_367){
var _368=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_368,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_368.getImage());
this._cursorStartPoint=_367;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_368.showDrag){
_368.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_368.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _36a=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_36a);
}
},onDragStop:function(diff){
if(this._isDragging){
var _36c=BindingDragger.draggedBinding;
if(_36c.hideDrag){
_36c.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_36c.dragType);
this._isDragging=false;
_36c=BindingAcceptor.acceptingBinding;
if(_36c!=null){
if(Interfaces.isImplemented(IAcceptable,_36c,true)==true){
_36c.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_36c);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_36d){
if(this.isDeveloperMode||_36d){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_36e){
if(_36e==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_36f){
switch(_36f){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_371){
switch(_371.Key){
case "ProductVersion":
this.versionString=_371.Value;
break;
case "ProductTitle":
this.versionPrettyString=_371.Value;
break;
case "InstallationId":
this.installationID=_371.Value;
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
var _374=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _375={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _376=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_376){
for(var key in _376){
_375[key]=_376[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_375);
}
}});
this.getPref=function(key){
var _379=null;
if(key){
_379=_375[key];
}else{
throw "No such preference.";
}
return _379;
};
this.setPref=function(key,_37b){
if(key){
_375[key]=_37b;
}else{
throw "No such preference.";
}
};
function debug(_37c){
var _37d=_37c?"Persisted preferences":"No persisted preferences. Using defaults";
_37d+=":\n";
for(var key in _375){
var pref=_375[key];
_37d+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_374.fine(_37d);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _382=null;
if(this.isInitialized==true){
if(this._persistance){
var _383=this._persistance[id];
if(_383){
_382=_383[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _382;
},setPersistedProperty:function(id,prop,_386){
if(this.isInitialized==true){
if(this._persistance){
if(_386!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_386);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_387){
switch(_387){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _388=top.bindingMap.persistance;
_388.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _389=top.bindingMap.persistance;
var map=_389.getPersistanceMap();
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
function StandardEventHandler(doc,_38c){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_38c;
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
var _390={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_390);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_390);
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
var _397=UserInterface.getBinding(node);
if(_397!=null){
_397.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_397!=null?null:node.parentNode;
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
var _39a=Application.trackMousePosition(e);
if(_39a){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_39d){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_39d){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_39d=true;
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
var _39e=KeySetBinding.handleKey(this._contextDocument,e);
if(!_39e){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _39f=this._contextWindow.frameElement;
if(_39f!=null){
var _3a0=DOMUtil.getParentWindow(_39f);
if(_3a0.standardEventHandler!=null){
_3a0.standardEventHandler._handleKeyDown(e,_39d);
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
var _3a3=false;
var _3a4=DOMEvents.getTarget(e);
var name=_3a4.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_3a3=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_3a3;
}
if(_3a3){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a7){
this._isAllowTabs=(_3a7==true?true:false);
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
function Action(_3aa,type){
this.target=_3aa;
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
function Animation(_3ac){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3ad in _3ac){
this[_3ad]=_3ac[_3ad];
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
Animation.prototype.onstart=function(_3b1){
};
Animation.prototype.onstep=function(_3b2){
};
Animation.prototype.onstop=function(_3b3){
};
Point.isEqual=function(p1,p2){
var _3b6=false;
if(p1&&p2){
_3b6=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b6;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3bb=false;
if(dim1&&dim2){
_3bb=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3bb;
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
function BindingAcceptor(_3c2){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3c2;
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
var _3c3=new List(this._binding.dragAccept.split(" "));
while(_3c3.hasNext()){
var type=_3c3.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3c5,arg){
var type=arg;
try{
switch(_3c5){
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
function BindingBoxObject(_3ca){
this._domElement=_3ca.getBindingElement();
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
function BindingDragger(_3cc){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3cc;
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
BindingDragger.prototype.registerHandler=function(_3ce){
if(Interfaces.isImplemented(IDragHandler,_3ce)==true){
this.handler=_3ce;
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
var _3d1=e.button==(e.target?0:1);
if(_3d1){
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
var _3d3=Application.getMousePosition();
var dx=_3d3.x-this.startPoint.x;
var dy=_3d3.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d6,e){
switch(_3d6){
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
function BindingParser(_3d8){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d8;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d9){
var _3da=new List();
var xml=BindingParser.XML.replace("${markup}",_3d9);
var doc=XMLParser.parse(_3d9);
if(doc){
var _3dd=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3dd);
var node=_3dd.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3da.add(node);
}
node=node.nextSibling;
}
}
return _3da;
};
BindingParser.prototype._iterate=function(_3df,_3e0){
var _3e1=null;
switch(_3df.nodeType){
case Node.ELEMENT_NODE:
_3e1=this._cloneElement(_3df);
UserInterface.registerBinding(_3e1);
break;
case Node.TEXT_NODE:
_3e1=this._ownerDocument.createTextNode(_3df.nodeValue);
break;
}
if(_3e1){
_3e0.appendChild(_3e1);
}
if(_3e1&&_3df.hasChildNodes()){
var _3e2=_3df.firstChild;
while(_3e2){
this._iterate(_3e2,_3e1);
_3e2=_3e2.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3e3){
var _3e4=DOMUtil.createElementNS(_3e3.namespaceURI?_3e3.namespaceURI:Constants.NS_XHTML,_3e3.nodeName,this._ownerDocument);
var i=0;
while(i<_3e3.attributes.length){
var attr=_3e3.attributes.item(i++);
_3e4.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3e4;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e7){
var _3e8=null;
var _3e9=false;
var _3ea=_3e7.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e7)){
var _3eb=UserInterface.getBinding(_3e7);
_3e9=BindingSerializer.activeInstance.indexBinding(_3eb);
if(_3e9){
_3e8=_3eb.key;
_3e7.setAttribute(BindingSerializer.KEYPOINTER,_3e8);
}
}
_3e8=_3e8?_3e8:_3ea;
var _3ec=new List(_3e7.childNodes);
_3ec.each(function(_3ed){
if(_3ed.nodeType==Node.ELEMENT_NODE){
_3ed.setAttribute(BindingSerializer.KEYPOINTER,_3e8);
}
});
if(_3e9){
BindingSerializer.activeInstance.append(_3e8,_3ea);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ee){
BindingSerializer.activeInstance=this;
_3ee.bindingWindow.ElementIterator.iterate(_3ee.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3ef){
var _3f0=false;
var _3f1=_3ef.serialize();
if(_3f1!=false){
_3f0=true;
var _3f2="ui:"+DOMUtil.getLocalName(_3ef.bindingElement);
var _3f3=DOMUtil.createElementNS(Constants.NS_UI,_3f2,this._dom);
this._pointers[_3ef.key]=_3f3;
for(var prop in _3f1){
if(_3f1[prop]!=null){
_3f3.setAttribute(prop,String(_3f1[prop]));
}
}
}
return _3f0;
};
BindingSerializer.prototype.append=function(_3f5,_3f6){
var _3f7=this._pointers[_3f5];
var _3f8=_3f6?this._pointers[_3f6]:this._dom;
_3f8.appendChild(_3f7);
};
function ImageProfile(_3f9){
this._default=_3f9.image;
this._hover=_3f9.imageHover;
this._active=_3f9.imageActive;
this._disabled=_3f9.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3fa){
this._default=_3fa;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3fb){
this._hover=_3fb;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3fc){
this._active=_3fc;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3fd){
this._disabled=_3fd;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3fe,_3ff,_400){
var _401=null;
if(_3fe.isAttached){
_401=new List();
var _402=_400?_3fe.getChildElementsByLocalName(_3ff):_3fe.getDescendantElementsByLocalName(_3ff);
_402.each(function(_403){
var _404=UserInterface.getBinding(_403);
if(_404){
_401.add(_404);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3fe.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _401;
},getAncestorBindingByType:function(_406,impl,_408){
var _409=null;
if(Binding.exists(_406)){
var node=_406.bindingElement;
while(_409==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _40b=UserInterface.getBinding(node);
if(_40b instanceof impl){
_409=_40b;
}
}else{
if(_408&&node.nodeType==Node.DOCUMENT_NODE){
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
return _409;
},getAncestorBindingByLocalName:function(_40d,_40e,_40f){
var _410=null;
if(_40e=="*"){
var node=_40d.bindingElement;
while(!_410&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_410=UserInterface.getBinding(node);
}
}
}else{
_410=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_40e,_40d.bindingElement,_40f));
}
return _410;
},getChildElementsByLocalName:function(_412,_413){
var _414=new List();
var _415=new List(_412.bindingElement.childNodes);
_415.each(function(_416){
if(_416.nodeType==Node.ELEMENT_NODE){
if(_413=="*"||DOMUtil.getLocalName(_416)==_413){
_414.add(_416);
}
}
});
return _414;
},getChildBindingByType:function(_417,impl){
var _419=null;
_417.getChildElementsByLocalName("*").each(function(_41a){
var _41b=UserInterface.getBinding(_41a);
if(_41b!=null&&_41b instanceof impl){
_419=_41b;
return false;
}else{
return true;
}
});
return _419;
},getDescendantBindingByType:function(_41c,impl){
var _41e=null;
_41c.getDescendantElementsByLocalName("*").each(function(_41f){
var _420=UserInterface.getBinding(_41f);
if(_420!=null&&_420 instanceof impl){
_41e=_420;
return false;
}else{
return true;
}
});
return _41e;
},getDescendantBindingsByType:function(_421,impl){
var _423=new List();
_421.getDescendantElementsByLocalName("*").each(function(_424){
var _425=UserInterface.getBinding(_424);
if(_425!=null&&_425 instanceof impl){
_423.add(_425);
}
return true;
});
return _423;
},getNextBindingByLocalName:function(_426,name){
var _428=null;
var _429=_426.bindingElement;
while((_429=DOMUtil.getNextElementSibling(_429))!=null&&DOMUtil.getLocalName(_429)!=name){
}
if(_429!=null){
_428=UserInterface.getBinding(_429);
}
return _428;
},getPreviousBindingByLocalName:function(_42a,name){
var _42c=null;
var _42d=_42a.bindingElement;
while((_42d=DOMUtil.getPreviousElementSibling(_42d))!=null&&DOMUtil.getLocalName(_42d)!=name){
}
if(_42d!=null){
_42c=UserInterface.getBinding(_42d);
}
return _42c;
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
},addFilter:function(_42e){
this._filters.add(_42e);
},removeFilter:function(_42f){
var _430=-1;
this._filters.each(function(fil){
_430++;
var _432=true;
if(fil==_42f){
_432=false;
}
return _432;
});
if(_430>-1){
this._filters.del(_430);
}
},_applyFilters:function(node,arg){
var _435=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _438=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _439=true;
while(this._filters.hasNext()&&_439==true){
var _43a=this._filters.getNext();
var res=_43a.call(this,node,arg);
if(res!=null){
_435=res;
switch(res){
case stop:
case skip:
case skip+_438:
_439=false;
break;
}
}
}
return _435;
},crawl:function(_43c,arg){
this.contextDocument=_43c.ownerDocument;
this.onCrawlStart();
var _43e=this.type==NodeCrawler.TYPE_ASCENDING;
var _43f=this._applyFilters(_43c,arg);
if(_43f!=NodeCrawler.STOP_CRAWLING){
if(_43e&&_43f==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_43e?_43c.parentNode:_43c;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_441,arg){
var _443=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_443=this._crawlDescending(_441,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_443=this._crawlAscending(_441,arg);
break;
}
return _443;
},_crawlDescending:function(_444,arg){
var skip=NodeCrawler.SKIP_NODE;
var _447=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _449=null;
if(_444.hasChildNodes()){
var node=_444.firstChild;
while(node!=null&&_449!=stop){
this.currentNode=node;
_449=this._applyFilters(node,arg);
switch(_449){
case stop:
case _447:
case skip+_447:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_449=stop;
break;
}
}
}
if(_449!=stop&&_449!=skip){
this.previousNode=node;
}
break;
}
if(_449!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _449;
},_crawlAscending:function(_44c,arg){
var _44e=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_44c!=null){
this.currentNode=_44c;
_44e=this._applyFilters(_44c,arg);
if(_44e!=stop){
var next=this.nextNode?this.nextNode:_44c.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_44c;
_44e=this._crawl(next,arg);
}
}
}else{
_44e=stop;
}
return _44e;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _452 in this){
this[_452]=null;
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
var _455=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_455=NodeCrawler.SKIP_NODE;
}
return _455;
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
this.addFilter(function(_456,arg){
var _458=null;
if(!UserInterface.hasBinding(_456)){
_458=NodeCrawler.SKIP_NODE;
}
return _458;
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
this.addFilter(function(_45a,arg){
var _45c=null;
var _45d=UserInterface.getBinding(_45a);
if(Interfaces.isImplemented(ICrawlerHandler,_45d)==true){
self.response=null;
_45d.handleCrawler(self);
_45c=self.response;
}
return _45c;
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
this.addFilter(function(_45f,list){
var _461=null;
var _462=UserInterface.getBinding(_45f);
if(Interfaces.isImplemented(IFlexible,_462)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_462);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_462.isFlexSuspended==true){
_461=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_462);
}
break;
}
}
return _461;
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
this.addFilter(function(_463,list){
var _465=null;
var _466=UserInterface.getBinding(_463);
if(_466.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_466)==true){
if(_466.isFocusable&&_466.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_466);
break;
case FocusCrawler.MODE_FOCUS:
if(!_466.isFocused){
_466.focus();
}
_465=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_466.isFocused==true){
_466.blur();
_465=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _465;
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
this.addFilter(function(_467,list){
var _469=null;
var _46a=UserInterface.getBinding(_467);
if(!_46a.isVisible){
_469=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _469;
});
this.addFilter(function(_46b,list){
var _46d=null;
var _46e=UserInterface.getBinding(_46b);
if(_46e.isAttached){
if(Interfaces.isImplemented(IFit,_46e)){
if(!_46e.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_46e);
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
UpdateAssistant.serialize=function(_46f){
_46f=_46f.cloneNode(true);
_46f.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_46f.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_46f);
};
}
},handleEvent:function(e){
var _471=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_471);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_471);
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
},_beforeUpdate:function(_472){
var _473=(_472==document.documentElement);
if(_473){
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
var _476=FocusBinding.focusedBinding;
if(_476!=null){
this._focusID=_476.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_472.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_472);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_472,false);
break;
}
}
},_afterUpdate:function(_477){
var _478=(_477==document.documentElement);
if(_478){
var _479=this._elementsbuffer;
if(_479.hasEntries()){
_479.each(function(_47a){
DocumentManager.attachBindings(_47a);
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
var _47d=FocusBinding.focusedBinding;
if(_47d==null){
var _47e=document.getElementById(this._focusID);
if(_47e!=null){
var _47d=UserInterface.getBinding(_47e);
if(_47d!=null){
_47d.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _47f=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _480="NEW DOM: "+document.title+"\n\n"+_47f+"\n\n";
_480+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_480);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_477.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_477.__isAttached!==false){
this._elementsbuffer.add(_477);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_477,true);
break;
}
switch(_477.id){
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
var _47d=UserInterface.getBinding(_477);
while(_47d==null&&_477!=null){
_47d=UserInterface.getBinding(_477);
_477=_477.parentNode;
}
if(_47d!=null){
_47d.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_482,_483){
var _484=UserInterface.getBinding(_482);
if(_484!=null){
if(_483){
var _485=this._attributesbuffer;
var map=new Map();
_485.each(function(name,old){
var now=_482.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_482.attributes).each(function(att){
if(att.specified){
if(!_485.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_48c){
var _48d=_484.propertyMethodMap[name];
if(_48d!=null){
_48d.call(_484,_48c);
}
});
}else{
var map=new Map();
new List(_482.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_48f,_490){
var _491=window.bindingMap[_48f.getAttribute("id")];
if(_491!=null){
return _491.handleElement(_48f,_490);
}
},updateElement:function(_492,_493){
var _494=window.bindingMap[_492.getAttribute("id")];
if(_494!=null){
return _494.updateElement(_492,_493);
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
this.addFilter(function(_496,list){
var _498=UserInterface.getBinding(_496);
var _499=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_498==null){
UserInterface.registerBinding(_496);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_498!=null){
if(!_498.isAttached){
list.add(_498);
}
if(_498.isLazy==true){
_499=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_498!=null){
list.add(_498);
}
break;
}
return _499;
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
},handleBroadcast:function(_49a,arg){
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
var _49d=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_49d)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_49d!=null){
if(_49d.href!=null&&_49d.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _49e=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_49e!=null){
var map={};
var _4a0=DOMUtil.getElementsByTagName(_49e,"bindingmapping");
new List(_4a0).each(function(_4a1){
var _4a2=_4a1.getAttribute("element");
var _4a3=_4a1.getAttribute("binding");
map[_4a2]=eval(_4a3);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_4a4){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_4a4;
}else{
this.customUserInterfaceMapping.merge(_4a4);
}
},_registerBindings:function(_4a5){
var _4a6=new DocumentCrawler();
_4a6.mode=DocumentCrawler.MODE_REGISTER;
_4a6.crawl(_4a5);
_4a6.dispose();
},_attachBindings:function(_4a7){
var _4a8=new DocumentCrawler();
_4a8.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a8.crawl(_4a7,list);
var _4aa=false;
while(list.hasNext()){
var _4ab=list.getNext();
if(!_4ab.isAttached){
_4ab.onBindingAttach();
if(!_4ab.memberDependencies){
_4ab.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4ab)){
_4aa=true;
}
}
}
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
},attachBindings:function(_4ad){
this._registerBindings(_4ad);
this._attachBindings(_4ad);
},detachBindings:function(_4ae,_4af){
var _4b0=new DocumentCrawler();
_4b0.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4b0.crawl(_4ae,list);
if(_4af==true){
list.extractFirst();
}
var _4b2=false;
list.reverse().each(function(_4b3){
if(Interfaces.isImplemented(IData,_4b3)){
_4b2=true;
}
_4b3.dispose(true);
});
if(_4b2){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4b0.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4b5){
return (/textarea|input/.test(DOMUtil.getLocalName(_4b5)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b6){
this.isDirty=true;
var _4b7=false;
if(_4b6!=null&&!_4b6.isDirty){
_4b6.isDirty=true;
_4b6.dispatchAction(Binding.ACTION_DIRTY);
_4b7=true;
}
return _4b7;
},clean:function(_4b8){
if(_4b8.isDirty){
_4b8.isDirty=false;
}
},registerDataBinding:function(name,_4ba){
if(Interfaces.isImplemented(IData,_4ba,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4ba;
}
}else{
throw "Invalid DataBinding: "+_4ba;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4bd=null;
if(this._dataBindings[name]!=null){
_4bd=this._dataBindings[name];
}
return _4bd;
},getAllDataBindings:function(_4be){
var list=new List();
for(var name in this._dataBindings){
var _4c1=this._dataBindings[name];
list.add(_4c1);
if(_4be&&_4c1 instanceof WindowBinding){
var _4c2=_4c1.getContentWindow().DataManager;
if(_4c2!=null){
list.merge(_4c2.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4c3=false;
for(var name in this._dataBindings){
_4c3=true;
break;
}
return _4c3;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c7){
var _4c8=this._dataBindings[name];
if(_4c8!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c8.setResult(_4c7);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c8);
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
var _4c9=new DataBindingMap();
_4c9.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4cb=this._dataBindings[name];
if(_4cb instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c9[name]=_4cb.getValue();
}
return _4c9;
},getDataBindingResultMap:function(){
var _4cc=new DataBindingMap();
_4cc.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4ce=this._dataBindings[name];
var res=_4ce.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4d1){
_4cc.set(name,_4d1);
});
}else{
_4cc.set(name,res);
}
}
return _4cc;
},getPostBackString:function(){
var _4d2="";
var form=document.forms[0];
if(form!=null){
var _4d4="";
new List(form.elements).each(function(_4d5){
var name=_4d5.name;
var _4d7=encodeURIComponent(_4d5.value);
switch(_4d5.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4d2+=name+"="+_4d7+"&";
break;
case "submit":
if(document.activeElement==_4d5){
_4d2+=name+"="+_4d7+"&";
}
break;
case "radio":
if(_4d5.checked){
_4d2+=name+"="+_4d7+"&";
}
break;
case "checkbox":
if(_4d5.checked){
if(_4d5.name==_4d4){
if(_4d2.lastIndexOf("&")==_4d2.length-1){
_4d2=_4d2.substr(0,_4d2.length-1);
}
_4d2+=","+_4d7;
}else{
_4d2+=name+"="+_4d5.value;
}
_4d4=name;
_4d2+="&";
}
break;
}
});
}
return _4d2.substr(0,_4d2.length-1);
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
var _4e0=null;
var _4e1=null;
var _4e2=false;
if(!this._cache[name]){
_4e2=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4e4=DOMUtil.getXMLHTTPRequest();
_4e4.open("get",uri,false);
_4e4.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4e4.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4e1=_4e4.responseText;
break;
default:
_4e1=_4e4.responseXML;
break;
}
if(_4e1==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4e1;
}
}
_4e1=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4e0=_4e1;
break;
case this._modes.MODE_DOCUMENT:
_4e0=DOMUtil.cloneNode(_4e1,true);
break;
case this._modes.MODE_ELEMENT:
_4e0=DOMUtil.cloneNode(_4e1.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4e0=DOMSerializer.serialize(_4e1,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4e0=DOMSerializer.serialize(_4e1.documentElement,true);
break;
}
if(_4e2&&Application.isDeveloperMode){
}
return _4e0;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e7){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e7];
},invoke:function(url,_4e9,_4ea){
this._logger.error("Not implemented");
},invokeModal:function(url,_4ec,_4ed){
var _4ee=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4ec,argument:_4ed});
StageBinding.presentViewDefinition(_4ee);
return _4ee;
},invokeDefinition:function(_4ef){
if(_4ef instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4ef);
}
return _4ef;
},question:function(_4f0,text,_4f2,_4f3){
if(!_4f2){
_4f2=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4f0,text,_4f2,_4f3);
},message:function(_4f4,text,_4f6,_4f7){
if(!_4f6){
_4f6=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4f4,text,_4f6,_4f7);
},error:function(_4f8,text,_4fa,_4fb){
if(!_4fa){
_4fa=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f8,text,_4fa,_4fb);
},warning:function(_4fc,text,_4fe,_4ff){
if(!_4fe){
_4fe=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4fc,text,_4fe,_4ff);
},_standardDialog:function(type,_501,text,_503,_504){
var _505=null;
if(!_503){
_505=new List(Dialog.BUTTONS_ACCEPT);
}else{
_505=new List();
new List(_503).each(function(_506){
var _507=null;
switch(typeof _506){
case "object":
_507=_506;
break;
case "string":
var _508=false;
if(_506.indexOf(":")>-1){
_506=_506.split(":")[0];
_508=true;
}
_507=Dialog.dialogButton(_506);
if(_508){
_507.isDefault=true;
}
break;
}
_505.add(_507);
});
}
var _509={title:_501,text:text,type:type,image:this._dialogImages[type],buttons:_505};
var _50a=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_504,argument:_509});
StageBinding.presentViewDefinition(_50a);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_50c,arg){
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
},saveAll:function(_50f){
var self=this;
var _511=Application.getDirtyDockTabsTabs();
if(_511.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_512,_513){
switch(_512){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_513,_50f);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_511);
}else{
if(_50f){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_514,_515){
var _516=false;
var list=new List();
_514.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_516=true;
var _51a=list.getLength();
var _51b={handleBroadcast:function(_51c,tab){
if(--_51a==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_515){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_51b);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _516;
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
var _520="Composite.Management.Help";
if(!StageBinding.isViewOpen(_520)){
StageBinding.handleViewPresentation(_520);
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
var _522=document.createEvent("Events");
_522.initEvent(type,true,true);
window.dispatchEvent(_522);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _524=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _525=_524.exec(url?url:"");
if(_525){
if(_525[3]=="media"){
this.isMedia=true;
}else{
if(_525[3]=="page"){
this.isPage=true;
}
}
}
var _526={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_526[$1]=$3;
});
this.queryString=_526;
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
Uri.prototype.setParam=function(key,_52f){
if(_52f==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_52f;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _531=[];
for(var key in this.queryString){
_531.push(key+"="+this.queryString[key]);
}
if(_531.length>0){
url+="?"+_531.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_533,_534){
var _535=null;
var _536=ViewDefinitions[_533];
if(_536.isMutable){
var impl=null;
if(_536 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_534!=null&&impl!=null){
var def=new impl();
for(var prop in _536){
def[prop]=ViewDefinition.cloneProperty(_536[prop]);
}
def.handle=_534;
_535=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _535;
};
ViewDefinition.cloneProperty=function(_53a){
if(null==_53a){
return _53a;
}
if(typeof _53a==="object"){
var _53b=(_53a.constructor===Array)?[]:{};
for(var prop in _53a){
_53b[prop]=ViewDefinition.cloneProperty(_53a[prop]);
}
return _53b;
}
return _53a;
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
Binding.evaluate=function(_542,_543){
var _544=null;
var _545=_543.bindingWindow.WindowManager;
if(_545!=null){
var _546=Binding.parseScriptStatement(_542,_543.key);
_544=_545.evaluate(_546);
}
return _544;
};
Binding.parseScriptStatement=function(_547,key){
if(_547!=null&&key!=null){
var _549="UserInterface.getBindingByKey ( \""+key+"\" )";
_547=_547.replace(/(\W|^)this(,| +|\)|;)/g,_549);
_547=_547.replace(/(\W|^)this(\.)/g,_549+".");
}
return _547;
};
Binding.exists=function(_54a){
var _54b=false;
try{
if(_54a&&_54a.bindingElement&&_54a.bindingElement.nodeType&&_54a.isDisposed==false){
_54b=true;
}
}
catch(accessDeniedException){
_54b=false;
}
finally{
return _54b;
}
};
Binding.destroy=function(_54c){
if(!_54c.isDisposed){
if(_54c.acceptor!=null){
_54c.acceptor.dispose();
}
if(_54c.dragger!=null){
_54c.disableDragging();
}
if(_54c.boxObject!=null){
_54c.boxObject.dispose();
}
if(_54c._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_54c);
}
for(var _54d in _54c.shadowTree){
var _54e=_54c.shadowTree[_54d];
if(_54e instanceof Binding&&Binding.exists(_54e)){
_54e.dispose(true);
}
_54c.shadowTree[_54d]=null;
}
_54c.isDisposed=true;
_54c=null;
}
};
Binding.dotnetify=function(_54f,_550){
var _551=_54f.getCallBackID();
if(_551!=null){
var _552=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_54f.bindingDocument);
_552.type="hidden";
_552.id=_551;
_552.name=_551;
_552.value=_550!=null?_550:"";
_54f.bindingElement.appendChild(_552);
_54f.shadowTree.dotnetinput=_552;
}else{
throw _54f.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_553){
var _554=_553.getProperty("image");
var _555=_553.getProperty("image-hover");
var _556=_553.getProperty("image-active");
var _557=_553.getProperty("image-disabled");
if(_553.imageProfile==null){
if(_553.image==null&&_554!=null){
_553.image=_554;
}
if(_553.imageHover==null&&_555!=null){
_553.imageHover=_555;
}
if(_553.imageActive==null&&_556!=null){
_553.imageActive=_556;
}
if(_553.imageDisabled==null&&_557!=null){
_553.imageDisabled=_557;
}
if(_553.image||_553.imageHover||_553.imageActive||_553.imageDisabled){
_553.imageProfile=new ImageProfile(_553);
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
var _559=this.dependentBindings[key];
_559.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_55a){
if(_55a){
this.memberDependencies[_55a.key]=true;
var _55b=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_55b=false;
break;
}
}
if(_55b){
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
Binding.prototype.detachRecursive=function(_55d){
if(_55d==null){
_55d=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_55d);
};
Binding.prototype.addMember=function(_55e){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_55e.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_55e.key]=false;
_55e.registerDependentBinding(this);
}
}
return _55e;
};
Binding.prototype.addMembers=function(_55f){
while(_55f.hasNext()){
var _560=_55f.getNext();
if(!_560.isInitialized){
this.addMember(_560);
}
}
return _55f;
};
Binding.prototype.registerDependentBinding=function(_561){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_561.key]=_561;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _562=this.getProperty("persist");
if(_562&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _564=new List(_562.split(" "));
while(_564.hasNext()){
var prop=_564.getNext();
var _566=Persistance.getPersistedProperty(id,prop);
if(_566!=null){
this._persist[prop]=_566;
this.setProperty(prop,_566);
}else{
_566=this.getProperty(prop);
if(_566!=null){
this._persist[prop]=_566;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _567=this.getProperty("disabled");
var _568=this.getProperty("contextmenu");
var _569=this.getProperty("observes");
var _56a=this.getProperty("onattach");
var _56b=this.getProperty("hidden");
var _56c=this.getProperty("blockactionevents");
if(_56b==true&&this.isVisible==true){
this.hide();
}
if(_567&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_568){
this.setContextMenu(_568);
}
if(_569){
this.observe(this.getBindingForArgument(_569));
}
if(_56c==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_56a!=null){
Binding.evaluate(_56a,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _56e=this.getProperty("draggable");
var _56f=this.getProperty("dragtype");
var _570=this.getProperty("dragaccept");
var _571=this.getProperty("dragreject");
if(_56e!=null){
this.isDraggable=_56e;
}
if(_56f!=null){
this.dragType=_56f;
if(_56e!=false){
this.isDraggable=true;
}
}
if(_570!=null){
this.dragAccept=_570;
}
if(_571!=null){
this.dragReject=_571;
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
Binding.prototype._updateBindingMap=function(_572){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _575=null;
if(_572){
_575=map[id];
if(_575!=null&&_575!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_575=map[id];
if(_575!=null&&_575==this){
delete map[id];
}
}
}else{
var _577=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_572);
if(Application.isDeveloperMode==true){
alert(_577);
}else{
this.logger.error(_577);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_579){
};
Binding.prototype.handleBroadcast=function(_57a,arg){
};
Binding.prototype.handleElement=function(_57c){
return false;
};
Binding.prototype.updateElement=function(_57d){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _57f=null;
switch(typeof arg){
case "object":
_57f=arg;
break;
case "string":
_57f=this.bindingDocument.getElementById(arg);
if(_57f==null){
_57f=Binding.evaluate(arg,this);
}
break;
}
if(_57f!=null&&_57f.nodeType!=null){
_57f=UserInterface.getBinding(_57f);
}
return _57f;
};
Binding.prototype.serialize=function(){
var _580={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_580.id=id;
}
var _582=this.getProperty("binding");
if(_582){
_580.binding=_582;
}
return _580;
};
Binding.prototype.serializeToString=function(){
var _583=null;
if(this.isAttached){
_583=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _583;
};
Binding.prototype.subTreeFromString=function(_584){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_584);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_585){
var _586=this.bindingElement.getAttribute(_585);
if(_586){
_586=Types.castFromString(_586);
}
return _586;
};
Binding.prototype.setProperty=function(prop,_588){
if(_588!=null){
_588=_588.toString();
if(String(this.bindingElement.getAttribute(prop))!=_588){
this.bindingElement.setAttribute(prop,_588);
if(this.isAttached==true){
if(Persistance.isEnabled&&_588!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_588;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_588);
}
}
var _589=this.propertyMethodMap[prop];
if(_589){
_589.call(this,this.getProperty(prop));
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
var _58b=null;
if(Binding.exists(this)){
_58b=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _58b;
};
Binding.prototype.attachClassName=function(_58c){
CSSUtil.attachClassName(this.bindingElement,_58c);
};
Binding.prototype.detachClassName=function(_58d){
CSSUtil.detachClassName(this.bindingElement,_58d);
};
Binding.prototype.hasClassName=function(_58e){
return CSSUtil.hasClassName(this.bindingElement,_58e);
};
Binding.prototype.addActionListener=function(type,_590){
_590=_590!=null?_590:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_590)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_590);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_590+")");
}
};
Binding.prototype.removeActionListener=function(type,_592){
_592=_592?_592:this;
if(Action.isValid(type)){
var _593=this.actionListeners[type];
if(_593){
var i=0,_595;
while((_595=_593[i])!=null){
if(_595==_592){
_593.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_597){
_597=_597?_597:this;
DOMEvents.addEventListener(this.bindingElement,type,_597);
};
Binding.prototype.removeEventListener=function(type,_599){
_599=_599?_599:this;
DOMEvents.removeEventListener(this.bindingElement,type,_599);
};
Binding.prototype.subscribe=function(_59a){
if(!this.hasSubscription(_59a)){
this._subscriptions.set(_59a,true);
EventBroadcaster.subscribe(_59a,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_59a);
}
};
Binding.prototype.unsubscribe=function(_59b){
if(this.hasSubscription(_59b)){
this._subscriptions.del(_59b);
EventBroadcaster.unsubscribe(_59b,this);
}
};
Binding.prototype.hasSubscription=function(_59c){
return this._subscriptions.has(_59c);
};
Binding.prototype.observe=function(_59d,_59e){
_59d.addObserver(this,_59e);
};
Binding.prototype.unObserve=function(_59f,_5a0){
_59f.removeObserver(this,_5a0);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a4={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a4);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a4);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _5a7=false;
var _5a8=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_5a8=setTimeout(function(){
self.handleContextEvent(e);
},800);
_5a7=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_5a7){
clearTimeout(_5a8);
_5a7=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_5a7){
clearTimeout(_5a8);
_5a7=false;
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
var _5ae=null;
var _5af=null;
var _5b0=false;
if(arg instanceof Action){
_5ae=arg;
}else{
if(Action.isValid(arg)){
_5ae=new Action(this,arg);
_5b0=true;
}
}
if(_5ae!=null&&Action.isValid(_5ae.type)==true){
if(_5ae.isConsumed==true){
_5af=_5ae;
}else{
var _5b1=this.actionListeners[_5ae.type];
if(_5b1!=null){
_5ae.listener=this;
var i=0,_5b3;
while((_5b3=_5b1[i++])!=null){
if(_5b3&&_5b3.handleAction){
_5b3.handleAction(_5ae);
}
}
}
var _5b4=true;
if(this.isBlockingActions==true){
switch(_5ae.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5b0){
_5b4=false;
}
break;
}
}
if(_5b4){
_5af=this.migrateAction(_5ae);
}else{
_5af=_5ae;
}
}
}
return _5af;
};
Binding.prototype.migrateAction=function(_5b5){
var _5b6=null;
var _5b7=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5b6&&node.nodeType!=Node.DOCUMENT_NODE){
_5b6=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5b6){
_5b7=_5b6.dispatchAction(_5b5);
}else{
_5b7=_5b5;
}
}
return _5b7;
};
Binding.prototype.reflex=function(_5b9){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5b9);
}
};
Binding.prototype.getMigrationParent=function(){
var _5ba=null;
if(true){
try{
var _5bb=this.bindingElement.parentNode;
if(_5bb!=null){
_5ba=_5bb;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5ba=null;
}
}
return _5ba;
};
Binding.prototype.add=function(_5bc){
if(_5bc.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5bc.bindingElement);
}else{
throw "Could not add "+_5bc.toString()+" of different document origin.";
}
return _5bc;
};
Binding.prototype.addFirst=function(_5bd){
if(_5bd.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5bd.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5bd.toString()+" of different document origin.";
}
return _5bd;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5be,_5bf){
return BindingFinder.getAncestorBindingByLocalName(this,_5be,_5bf);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5c1){
return BindingFinder.getAncestorBindingByType(this,impl,_5c1);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5c3){
return BindingFinder.getChildElementsByLocalName(this,_5c3);
};
Binding.prototype.getChildElementByLocalName=function(_5c4){
return this.getChildElementsByLocalName(_5c4).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5c5){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5c5));
};
Binding.prototype.getChildBindingsByLocalName=function(_5c6){
return this.getDescendantBindingsByLocalName(_5c6,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5c7){
return this.getChildBindingsByLocalName(_5c7).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5c8,_5c9){
return BindingFinder.getDescendantBindingsByLocalName(this,_5c8,_5c9);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5ca){
return this.getDescendantBindingsByLocalName(_5ca,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5cd){
return BindingFinder.getNextBindingByLocalName(this,_5cd);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5ce){
return BindingFinder.getPreviousBindingByLocalName(this,_5ce);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5cf){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5cf);
};
Binding.prototype.isFirstBinding=function(_5d0){
return (this.getOrdinalPosition(_5d0)==0);
};
Binding.prototype.isLastBinding=function(_5d1){
return DOMUtil.isLastElement(this.bindingElement,_5d1);
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
Binding.prototype.setCallBackArg=function(_5d3){
this.setProperty(Binding.CALLBACKARG,_5d3);
};
Binding.prototype.dispose=function(_5d4){
if(!this.isDisposed){
if(!_5d4){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5d5=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5d5){
if(Client.isExplorer){
_5d5.outerHTML="";
}else{
_5d5.parentNode.removeChild(_5d5);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5d8){
list.add(_5d8);
});
list.each(function(_5d9){
self.unsubscribe(_5d9);
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
Binding.prototype.wakeUp=function(_5db,_5dc){
_5dc=_5dc?_5dc:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5db!==undefined){
self[_5db]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5dc);
},0);
}
};
Binding.prototype.handleCrawler=function(_5de){
if(_5de.response==null&&this.isLazy==true){
if(_5de.id==DocumentCrawler.ID&&_5de.mode==DocumentCrawler.MODE_REGISTER){
_5de.response=NodeCrawler.NORMAL;
}else{
_5de.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5de.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5de.id)){
_5de.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5de.response==null){
switch(_5de.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5de.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5df){
var _5e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5df);
return UserInterface.registerBinding(_5e0,Binding);
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
var _5e1=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5e1.each(function(_5e2){
DataBinding.expressions[_5e2.Key]=new RegExp(_5e2.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5e3){
var _5e4=null;
var _5e5=_5e3.getAncestorBindingByLocalName("field");
if(_5e5&&_5e5 instanceof FieldBinding){
var desc=_5e5.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5e4=desc.getLabel();
}
}
return _5e4;
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
var _5e8=this.bindingWindow.DataManager;
_5e8.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5ea=this.bindingWindow.DataManager;
if(_5ea.getDataBinding(name)){
_5ea.unRegisterDataBinding(name);
}
_5ea.registerDataBinding(name,this);
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
};
RootBinding.prototype.onBindingDispose=function(){
RootBinding.superclass.onBindingDispose.call(this);
this._setupActivationAwareness(false);
EventBroadcaster.unsubscribe(this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST,this);
};
RootBinding.prototype.handleBroadcast=function(_5eb,arg){
RootBinding.superclass.handleBroadcast.call(this,_5eb,arg);
var _5ed=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5eb){
case _5ed:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5ed);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5ee){
var _5ef=_5ee?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5ee!=this.isActivated){
this.isActivated=_5ee;
this.dispatchAction(_5ef);
var _5f0=new List();
var self=this;
this._activationawares.each(function(_5f2){
if(_5f2.isActivationAware){
try{
if(_5ee){
if(!_5f2.isActivated){
_5f2.onActivate();
}
}else{
if(_5f2.isActivated){
_5f2.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5f0.add(_5f2);
}
}
});
_5f0.each(function(_5f3){
this._activationawares.del(_5f3);
});
_5f0.dispose();
}else{
var _5f4="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5f4);
}else{
this.logger.error(_5f4);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5f5,_5f6){
if(Interfaces.isImplemented(IActivationAware,_5f5,true)==true){
if(_5f6==false){
this._activationawares.del(_5f5);
}else{
this._activationawares.add(_5f5);
if(this.isActivated==true){
_5f5.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5f5+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5f7){
var _5f8=this.getMigrationParent();
if(_5f8!=null){
var root=_5f8.ownerDocument.body;
var _5fa=UserInterface.getBinding(root);
if(_5fa!=null){
_5fa.makeActivationAware(this,_5f7);
}
}
};
RootBinding.prototype.handleCrawler=function(_5fb){
RootBinding.superclass.handleCrawler.call(this,_5fb);
if(_5fb.type==NodeCrawler.TYPE_ASCENDING){
_5fb.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5fc=null;
if(this.bindingWindow.parent){
_5fc=this.bindingWindow.frameElement;
}
return _5fc;
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
StyleBinding.prototype.handleElement=function(_5fd){
return true;
};
StyleBinding.prototype.updateElement=function(_5fe){
var href=_5fe.getAttribute("link");
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
var _600=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_600.hasNext()){
var cell=_600.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_602){
var _603=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_602.bindingElement);
_603=_602;
}else{
_603=MatrixBinding.superclass.add.call(this,_602);
}
return _603;
};
MatrixBinding.prototype.addFirst=function(_604){
var _605=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _606=this.shadowTree[MatrixBinding.CENTER];
_606.insertBefore(_604.bindingElement,_606.firstChild);
_605=_604;
}else{
_605=MatrixBinding.superclass.addFirst.call(this,_604);
}
return _604;
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
MatrixBinding.newInstance=function(_608){
var _609=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_608);
return UserInterface.registerBinding(_609,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_60a,_60b){
var list=new List();
var _60d=new FlexBoxCrawler();
_60d.mode=_60b?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_60d.startBinding=_60a;
_60d.crawl(_60a.bindingElement,list);
list.each(function(_60e){
_60e.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_60f){
if(Binding.exists(_60f)){
_60f.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_610){
if(Binding.exists(_610)){
_610.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_60d.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_611){
FlexBoxBinding.superclass.handleAction.call(this,_611);
switch(_611.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_612){
var _613=0;
var _614=new List(this.bindingElement.parentNode.childNodes);
while(_614.hasNext()){
var _615=_614.getNext();
if(_615.nodeType==Node.ELEMENT_NODE&&_615!=this.bindingElement){
if(!this._isOutOfFlow(_615)){
var rect=_615.getBoundingClientRect();
if(_612){
height+=(rect.right-rect.left);
}else{
_613+=(rect.bottom-rect.top);
}
}
}
}
return _613;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_617){
var _618=CSSComputer.getPosition(_617);
var _619=CSSComputer.getFloat(_617);
return (_618=="absolute"||_619!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _61a=this.bindingElement.parentNode;
var rect=_61a.getBoundingClientRect();
var _61c=rect.bottom-rect.top;
var _61d=CSSComputer.getPadding(_61a);
var _61e=CSSComputer.getBorder(_61a);
_61c-=(_61d.top+_61d.bottom);
_61c-=(_61e.top+_61e.bottom);
return _61c;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _61f=this.bindingElement.parentNode;
var rect=_61f.getBoundingClientRect();
var _621=rect.right-rect.left;
var _622=CSSComputer.getPadding(_61f);
var _623=CSSComputer.getBorder(_61f);
_621-=(_622.left+_622.right);
_621-=(_623.left+_623.right);
return _621;
};
FlexBoxBinding.prototype.setFlexibility=function(_624){
if(_624!=this.isFlexible){
if(_624){
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
this.isFlexible=_624;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _625=this._getSiblingsSpan();
_625=this._getCalculatedHeight()-_625;
if(!isNaN(_625)&&_625>=0){
this.bindingElement.style.height=String(_625)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_626){
if(!this.isFit||_626){
var _627=0;
new List(this.bindingElement.childNodes).each(function(_628){
if(_628.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_628)){
var rect=_628.getBoundingClientRect();
_627+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_627);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_62a){
var _62b=CSSComputer.getPadding(this.bindingElement);
var _62c=CSSComputer.getBorder(this.bindingElement);
_62a+=_62b.top+_62b.bottom;
_62a+=_62c.top+_62c.bottom;
this.bindingElement.style.height=_62a+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_62d){
ScrollBoxBinding.superclass.handleAction.call(this,_62d);
switch(_62d.type){
case BalloonBinding.ACTION_INITIALIZE:
_62d.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_62e){
this.bindingElement.scrollLeft=_62e.x;
this.bindingElement.scrollTop=_62e.y;
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
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_637.classes);
}else{
this.setImageClasses();
this.setAlphaTransparentBackdrop(_637);
}
this.setProperty("image",url);
this.hasImage=true;
if(!_636){
this.buildClassName();
}
}else{
this.setAlphaTransparentBackdrop(false);
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
var _641="both";
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
var _661=this.getProperty("width");
var _662=this.getProperty("label");
var type=this.getProperty("type");
var _664=this.getProperty("popup");
var _665=this.getProperty("tooltip");
var _666=this.getProperty("isdisabled");
var _667=this.getProperty("response");
var _668=this.getProperty("oncommand");
var _669=this.getProperty("value");
var _66a=this.getProperty("ischecked");
var _66b=this.getProperty("callbackid");
var _66c=this.getProperty("focusable");
var _66d=this.getProperty("focused");
var _66e=this.getProperty("default");
var url=this.getProperty("url");
var _670=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_670){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_662!=null){
this.setLabel(_662);
}
if(type!=null){
this.setType(type);
}
if(_665!=null){
this.setToolTip(_665);
}
if(_661!=null){
this.setWidth(_661);
}
if(_664!=null){
this.setPopup(_664);
}
if(_667!=null){
this.response=_667;
}
if(_66a==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_668!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_668,this);
};
}
if(_66c||this.isFocusable){
this._makeFocusable();
if(_66e||this.isDefault){
this.isDefault=true;
}
if(_66d){
this.focus();
}
}
if(_666==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_66b!=null){
this.bindingWindow.DataManager.registerDataBinding(_66b,this);
if(_669!=null){
Binding.dotnetify(this,_669);
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
ButtonBinding.prototype.setImage=function(_671){
if(this.isAttached){
this.labelBinding.setImage(_671);
}
this.setProperty("image",_671);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_672){
if(this.isAttached){
this.labelBinding.setLabel(_672);
}
this.setProperty("label",_672);
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
ButtonBinding.prototype.setToolTip=function(_674){
this.setProperty("tooltip",_674);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_674));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_675){
this.imageProfile=new _675(this);
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
ButtonBinding.prototype.flip=function(_67a){
_67a=_67a==null?true:_67a;
this.isFlipped=_67a;
this.setProperty("flip",_67a);
if(this.isAttached){
this.labelBinding.flip(_67a);
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
ButtonBinding.prototype.check=function(_67b){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_67b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_67c){
this.isActive=true;
this.isChecked=true;
if(!_67c){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_67d){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_67d==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_67e){
this.isActive=false;
this.isChecked=false;
if(!_67e){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_67f,_680){
if(_67f==null){
_67f==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_67f){
case true:
this.check(_680);
break;
case false:
this.uncheck(_680);
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
var _682=this.getProperty("tooltip");
if(_682){
this.setToolTip(_682);
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
var _683=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_683=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _683;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _685=this.getEqualSizeWidth();
if(goal>_685){
var diff=goal-_685;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _688=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_689){
if(_689>=0){
this.bindingElement.style.width=new String(_689+"px");
}
this.setProperty("width",_689);
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
ButtonBinding.prototype.setValue=function(_68a){
this.shadowTree.dotnetinput.value=_68a;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_68b){
this.setValue(_68b);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_68c){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_68c;
this.imageProfile=_68c.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_68d){
var _68e=_68d?"addEventListener":"removeEventListener";
this.binding[_68e](DOMEvents.MOUSEENTER,this);
this.binding[_68e](DOMEvents.MOUSELEAVE,this);
this.binding[_68e](DOMEvents.MOUSEDOWN,this);
this.binding[_68e](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _690=false,_691=false,_692=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_692=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_692=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_692=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_692=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_692==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_690=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_692=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_692=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_692=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_692=ButtonStateManager.STATE_NORMAL;
var _693=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_693 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_692=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_692==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_691=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_692=ButtonStateManager.STATE_NORMAL;
_690=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_692=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_692=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_692=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_692=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_692==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_690=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_692=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_692=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_692=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_692=ButtonStateManager.STATE_NORMAL;
_690=true;
break;
}
}
}
}
}
switch(_692){
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
if(_690){
this.binding.fireCommand();
}
if(_691){
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
var _697=this.imageProfile.getDisabledImage();
if(_697){
this.binding.setImage(_697);
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
ClickButtonBinding.newInstance=function(_698){
var _699=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_698);
return UserInterface.registerBinding(_699,ClickButtonBinding);
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
this.hasMatrix=false;
this.imageProfile=new CheckButtonImageProfile(this);
}
CheckButtonBinding.prototype.toString=function(){
return "[CheckButtonBinding]";
};
CheckButtonBinding.newInstance=function(_69c){
var _69d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_69c);
return UserInterface.registerBinding(_69d,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_69e){
this._binding=_69e;
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
var _69f=this.getDescendantBindingsByLocalName("control");
_69f.each(function(_6a0){
_6a0.setControlType(_6a0.controlType);
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
ControlGroupBinding.newInstance=function(_6a2){
var _6a3=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6a2);
return UserInterface.registerBinding(_6a3,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6a6){
ControlBinding.superclass.handleAction.call(this,_6a6);
switch(_6a6.type){
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
function ControlImageProfile(_6a7){
this.binding=_6a7;
}
ControlImageProfile.prototype._getImage=function(_6a8){
var _6a9=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6a9=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6a9=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6a9=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6a9=this.constructor.IMAGE_CLOSE;
break;
}
return _6a9.replace("${string}",_6a8);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6aa=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6aa=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6aa?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6ab){
ControlBoxBinding.superclass.handleAction.call(this,_6ab);
switch(_6ab.type){
case ControlBinding.ACTION_COMMAND:
var _6ac=_6ab.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6ac);
Application.unlock(self);
},0);
_6ab.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6ae){
switch(_6ae.controlType){
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
ControlBoxBinding.prototype.setState=function(_6af){
var _6b0=this.getState();
this.setProperty("state",_6af);
this.detachClassName(_6b0);
this.attachClassName(_6af);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6b1=this.getProperty("state");
if(!_6b1){
_6b1=ControlBoxBinding.STATE_NORMAL;
}
return _6b1;
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
MenuContainerBinding.prototype.isOpen=function(_6b2){
var _6b3=null;
if(!_6b2){
_6b3=this._isOpen;
}else{
_6b3=(_6b2==this._openElement);
}
return _6b3;
};
MenuContainerBinding.prototype.setOpenElement=function(_6b4){
if(_6b4){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6b4;
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
var _6b5=this.getChildBindingByLocalName("menupopup");
if(_6b5&&_6b5!=this.menuPopupBinding){
this.menuPopupBinding=_6b5;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6b6=this.getMenuContainerBinding();
_6b6.setOpenElement(this);
var _6b7=this.getMenuPopupBinding();
_6b7.snapTo(this.bindingElement);
_6b7.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6b8){
MenuContainerBinding.superclass.handleAction.call(this,_6b8);
if(_6b8.type==PopupBinding.ACTION_HIDE){
var _6b9=this.getMenuContainerBinding();
_6b9.setOpenElement(false);
this.reset();
_6b8.consume();
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
MenuBarBinding.prototype.handleAction=function(_6ba){
MenuBarBinding.superclass.handleAction.call(this,_6ba);
switch(_6ba.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6bb=_6ba.target;
var _6bc=this.getChildBindingsByLocalName("menu");
while(_6bc.hasNext()){
var menu=_6bc.getNext();
}
switch(_6bb.arrowKey){
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
var _6be=this.getProperty("image");
var _6bf=this.getProperty("label");
var _6c0=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6bf){
this.setLabel(_6bf);
}
if(_6be){
this.setImage(_6be);
}
if(_6c0){
this.setToolTip(_6c0);
}
};
MenuBinding.prototype.reset=function(){
this.detachClassName("hover");
};
MenuBinding.prototype.setImage=function(url){
this.setProperty("image",url);
if(this.isAttached){
this.labelBinding.setImage(Resolver.resolve(url));
}
};
MenuBinding.prototype.setLabel=function(_6c2){
this.setProperty("label",_6c2);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c2));
}
};
MenuBinding.prototype.setToolTip=function(_6c3){
this.setProperty("tooltip",_6c3);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c3));
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
var _6c5=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6c5.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6c5.isOpen()&&!_6c5.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6c5.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6c5.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6c6,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6c6){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6cb){
switch(_6cb.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6cc=null;
var _6cd=true;
self._lastFocused.focus();
self.grabKeyboard();
_6cb.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6cf){
for(var key in this._focused){
if(key!=_6cf.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6cf.key]=_6cf;
this._lastFocused=_6cf;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6d2){
delete this._focused[_6d2.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6d3){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6d3);
}
if(_6d3){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6d6=this.getChildBindingsByLocalName("menugroup");
var _6d7=null;
var _6d8=null;
while(_6d6.hasNext()){
var _6d9=_6d6.getNext();
if(!_6d9.isDefaultContent){
_6d9.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6d7&&_6d9.isVisible){
_6d7=_6d9;
}
if(_6d9.isVisible){
_6d8=_6d9;
}
}
}
if(_6d7&&_6d8){
_6d7.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6d8.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6da){
MenuBodyBinding.activeInstance=this;
if(_6da){
var _6db=this._getMenuItems().getFirst();
if(_6db){
_6db.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6dc=this._lastFocused;
if((_6dc!=null)&&(!_6dc.isMenuContainer)){
_6dc.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6de=this._getMenuItems();
var _6df=null;
var next=null;
if(this._lastFocused){
_6df=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6de.getPreceding(_6df);
break;
case KeyEventCodes.VK_DOWN:
next=_6de.getFollowing(_6df);
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
next=_6de.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6e2=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6e3){
_6e2=_6e3.getChildBindingsByLocalName("menuitem");
_6e2.each(function(item){
list.add(item);
});
});
_6e2=this.getChildBindingsByLocalName("menuitem");
_6e2.each(function(item){
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
MenuBodyBinding.newInstance=function(_6e6){
var _6e7=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6e6);
return UserInterface.registerBinding(_6e7,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6e8){
switch(_6e8){
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
MenuGroupBinding.newInstance=function(_6e9){
var _6ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e9);
return UserInterface.registerBinding(_6ea,MenuGroupBinding);
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
var _6eb=this.getProperty("image");
var _6ec=this.getProperty("image-hover");
var _6ed=this.getProperty("image-active");
var _6ee=this.getProperty("image-disabled");
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
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6ef=this.getProperty("label");
var _6f0=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6f2=this.getProperty("isdisabled");
var _6f3=this.getProperty("image");
var _6f4=this.getProperty("image-hover");
var _6f5=this.getProperty("image-active");
var _6f6=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6f7=this.getMenuPopupBinding();
if(_6f7){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6f3){
this.image=_6f3;
}
if(!this.imageHover&&_6f4){
this.imageHover=_6f3;
}
if(!this.imageActive&&_6f5){
this.imageActive=_6f5;
}
if(!this.imageDisabled&&_6f6){
this.imageDisabled=_6f6;
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
if(_6ef!=null){
this.setLabel(_6ef);
}
if(_6f0){
this.setToolTip(_6f0);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6f2==true){
this.disable();
}
var _6f8=this.getProperty("oncommand");
if(_6f8){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6f8);
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
MenuItemBinding.prototype.setLabel=function(_6fb){
this.setProperty("label",_6fb);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6fb));
}
};
MenuItemBinding.prototype.setToolTip=function(_6fc){
this.setProperty("tooltip",_6fc);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6fc));
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
var _6fe=this.bindingDocument.createElement("div");
_6fe.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6fe.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6ff=this.labelBinding.bindingElement;
_6ff.insertBefore(_6fe,_6ff.firstChild);
_6fe.style.display="none";
this.shadowTree.checkBoxIndicator=_6fe;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6fe=this.bindingDocument.createElement("div");
_6fe.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6fe.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6ff=this.labelBinding.bindingElement;
_6ff.insertBefore(_6fe,_6ff.firstChild);
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
var _701=this.imageProfile.getDisabledImage();
if(_701){
this.setImage(_701);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _701=this.imageProfile.getDefaultImage();
if(_701){
this.setImage(_701);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _703=this.getMenuContainerBinding();
if(_703.isOpen()&&!_703.isOpen(this)){
_703._openElement.hide();
_703.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _703=this.getMenuContainerBinding();
if(!_703.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_705){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _706=this.getMenuContainerBinding();
if(!_706||!_706.isOpen(this)||_705){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_707){
this.setChecked(true,_707);
};
MenuItemBinding.prototype.uncheck=function(_708){
this.setChecked(false,_708);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_709,_70a){
this.setProperty("ischecked",_709);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_709){
this.isChecked=_709;
this.shadowTree.checkBoxIndicator.style.display=_709?"block":"none";
if(!_70a){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_70b){
var _70c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_70b);
UserInterface.registerBinding(_70c,MenuItemBinding);
return UserInterface.getBinding(_70c);
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
PopupSetBinding.newInstance=function(_70d){
var _70e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_70d);
return UserInterface.registerBinding(_70e,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_70f,arg){
switch(_70f){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _713=PopupBinding.activeInstances.get(key);
var _714=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_713);
if(!_714){
list.add(_713);
}
});
list.each(function(_715){
_715.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _717=PopupBinding.activeInstances.get(key);
_717.hide();
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
var _718=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _719=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_718){
this._bodyBinding=UserInterface.getBinding(_718);
}else{
if(_719){
this._bodyBinding=UserInterface.getBinding(_719);
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
var _71a=this.getProperty("position");
this.position=_71a?_71a:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_71b){
var _71c=null;
if(this._bodyBinding){
this._bodyBinding.add(_71b);
_71c=_71b;
}else{
_71c=PopupBinding.superclass.add.call(this,_71b);
}
return _71c;
};
PopupBinding.prototype.addFirst=function(_71d){
var _71e=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_71d);
_71e=_71d;
}else{
_71e=PopupBinding.superclass.addFirst.call(this,_71d);
}
return _71e;
};
PopupBinding.prototype.handleAction=function(_71f){
PopupBinding.superclass.handleAction.call(this,_71f);
var _720=_71f.target;
switch(_71f.type){
case Binding.ACTION_ATTACHED:
if(_720 instanceof MenuItemBinding){
this._count(true);
_71f.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_720 instanceof MenuItemBinding){
this._count(false);
_71f.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_721){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_721?1:-1);
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
PopupBinding.prototype.snapTo=function(_722){
var _723=this._getElementPosition(_722);
switch(this.position){
case PopupBinding.POSITION_TOP:
_723.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_723.x+=_722.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_723.y+=_722.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_723.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_722;
this.bindingElement.style.display="block";
this.setPosition(_723.x,_723.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_725){
this.bindingElement.style.display="block";
this.setPosition(_725.x,_725.y);
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
PopupBinding.prototype._getElementPosition=function(_72a){
return _72a.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_72a):DOMUtil.getUniversalPosition(_72a);
};
PopupBinding.prototype._getMousePosition=function(e){
var _72c=DOMEvents.getTarget(e);
return _72c.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_72d){
var _72e=this.bindingElement;
if(_72d){
_72e.style.visibility="visible";
}else{
_72e.style.visibility="hidden";
_72e.style.display="none";
}
this.isVisible=_72d;
};
PopupBinding.prototype._enableTab=function(_72f){
var self=this;
var _731=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_731.each(function(_732){
_732.bindingElement.tabIndex=_72f?0:-1;
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
var _73a=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_73a.y<0){
y=-_73a.y;
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
PopupBinding.prototype.grabKeyboard=function(_73c){
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
var _742=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_742=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _742;
};
PopupBinding.prototype.clear=function(){
var _743=this._bodyBinding;
if(_743){
_743.detachRecursive();
_743.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_744){
var _745=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_744);
return UserInterface.registerBinding(_745,PopupBinding);
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
PopupBodyBinding.newInstance=function(_747){
var _748=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_747);
return UserInterface.registerBinding(_748,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_749){
return new Point(_749.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_74a){
var _74b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_74a);
return UserInterface.registerBinding(_74b,MenuPopupBinding);
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
this._matrix=null;
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
this._matrix=DialogMatrixBinding.newInstance(this.bindingDocument);
this._head=DialogHeadBinding.newInstance(this.bindingDocument);
this._titlebar=DialogTitleBarBinding.newInstance(this.bindingDocument);
this.add(this._matrix);
this.addFirst(this._head);
this._head.add(this._titlebar);
var _74c=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_74c){
this._body=UserInterface.getBinding(_74c);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _74d=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_74d.hasNext()){
var _74e=DialogBorderBinding.newInstance(this.bindingDocument);
_74e.setType(_74d.getNext());
this.add(_74e);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _74f=this.getProperty("controls");
if(_74f){
var _750=new List(_74f.split(" "));
while(_750.hasNext()){
var type=_750.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _752=DialogControlBinding.newInstance(this.bindingDocument);
_752.setControlType(type);
this._titlebar.addControl(_752);
this.controlBindings[type]=_752;
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
var _753=this.getProperty("image");
var _754=this.getProperty("label");
var _755=this.getProperty("draggable");
var _756=this.getProperty("resizable");
var _757=this.getProperty("modal");
if(_753){
this.setImage(_753);
}
if(_754){
this.setLabel(_754);
}
if(_755==false){
this.isDialogDraggable=false;
}
if(_756==false){
this.isPanelResizable=false;
}
if(_757==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_758){
this.isModal=_758;
};
DialogBinding.prototype.setLabel=function(_759){
this.setProperty("label",_759);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_759));
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
DialogBinding.prototype.handleAction=function(_75b){
DialogBinding.superclass.handleAction.call(this,_75b);
switch(_75b.type){
case Binding.ACTION_DRAG:
var _75c=_75b.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_75c.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_75c.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_75c;
_75c.dragger.registerHandler(this);
}
break;
}
}
_75b.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_75b.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_75d,arg){
DialogBinding.superclass.handleBroadcast.call(this,_75d,arg);
switch(_75d){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_75f){
DialogBinding.superclass.handleInvokedControl.call(this,_75f);
switch(_75f.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_760){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_760){
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
var _762=self.bindingElement;
setTimeout(function(){
_762.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_763){
this.bindingElement.style.zIndex=new String(_763);
};
DialogBinding.prototype.onDragStart=function(_764){
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
DialogBinding.prototype.setResizable=function(_776){
if(this._isResizable!=_776){
if(_776){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_776;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _777=null;
var _778=this.bindingDocument.body.offsetWidth;
var _779=this.bindingDocument.body.offsetHeight;
_777={x:0.125*_778,y:0.125*_779,w:0.75*_778,h:0.5*_779};
return _777;
};
DialogBinding.prototype.centerOnScreen=function(){
var _77a=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_77a.w-dim.w),0.5*(_77a.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _77c=this;
var i=0;
function blink(){
if(i%2==0){
_77c.detachClassName("active");
}else{
_77c.attachClassName("active");
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
var _780="";
while(list.hasNext()){
var type=list.getNext();
_780+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_780);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_781){
var _782=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_781);
return UserInterface.registerBinding(_782,DialogBinding);
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
DialogHeadBinding.newInstance=function(_783){
var _784=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_783);
return UserInterface.registerBinding(_784,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_787){
var _788=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_787);
return UserInterface.registerBinding(_788,DialogBodyBinding);
};
DialogMatrixBinding.prototype=new MatrixBinding;
DialogMatrixBinding.prototype.constructor=DialogMatrixBinding;
DialogMatrixBinding.superclass=MatrixBinding.prototype;
function DialogMatrixBinding(){
this.logger=SystemLogger.getLogger("DialogMatrixBinding");
this.isDraggable=true;
this._type=null;
}
DialogMatrixBinding.prototype.toString=function(){
return "[DialogMatrixBinding]";
};
DialogMatrixBinding.prototype.onBindingAttach=function(){
DialogMatrixBinding.superclass.onBindingAttach.call(this);
this.shadowTree.table.className="matrix dialogmatrix";
this._indexTable();
this.shadowTree[MatrixBinding.CENTER].appendChild(this.bindingDocument.createTextNode("."));
};
DialogMatrixBinding.newInstance=function(_789){
var _78a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_789);
return UserInterface.registerBinding(_78a,DialogMatrixBinding);
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
self._coverBinding.show();
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
this._coverBinding.show();
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
if(this.spellcheck&&Client.hasSpellcheck){
var _82f=Localization.currentLang();
if(_82f!=null){
this.shadowTree.input.setAttribute("spellcheck","true");
this.shadowTree.input.setAttribute("lang",Localization.currentLang());
}else{
this.shadowTree.input.setAttribute("spellcheck","false");
}
}else{
this.shadowTree.input.setAttribute("spellcheck","false");
}
if(this.hasCallBackID()){
}else{
if(this._isAutoPost){
this.logger.warn("Autopost "+this.toString()+" without a callbackid?");
}
}
};
DataInputBinding.prototype._getInputElement=function(){
var _830=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_830.type=this.isPassword==true?"password":"text";
_830.tabIndex=-1;
return _830;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_833){
if(_833){
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
DataInputBinding.prototype.focus=function(_835){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_835){
var self=this,_837=this.bindingElement,_838={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_837,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_837,DOMEvents.MOUSEUP,_838);
}else{
this.select();
}
}
this.onfocus();
if(!_835){
var _839=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_839);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _83a=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _83b=_83a.createTextRange();
_83b.moveStart("character",0);
_83b.moveEnd("character",_83a.value.length);
_83b.select();
}else{
_83a.setSelectionRange(0,_83a.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_83c){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_83c){
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
DataInputBinding.prototype.validate=function(_840){
if(_840==true||this._isValid){
var _841=this.isValid();
if(_841!=this._isValid){
this._isValid=_841;
if(!_841){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _842=null;
if(this._isInvalidBecauseRequired==true){
_842=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_842=DataBinding.warnings["minlength"];
_842=_842.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_842=DataBinding.warnings["maxlength"];
_842=_842.replace("${count}",String(this.maxlength));
}else{
_842=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_842!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_842);
}
}else{
this.setValue(_842);
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
var _843=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _844=this.getValue();
if(_844==""){
if(this.isRequired==true){
_843=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _845=DataBinding.expressions[this.type];
if(!_845.test(_844)){
_843=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_844)){
_843=false;
}
}
}
}
if(_843&&this.minlength!=null){
if(_844.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_843=false;
}
}
if(_843&&this.maxlength!=null){
if(_844.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_843=false;
}
}
return _843;
};
DataInputBinding.prototype.setDisabled=function(_846){
if(_846!=this.isDisabled){
if(_846){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _847=this.shadowTree.input;
if(_846){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_847,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_847,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_846;
this.shadowTree.input.unselectable=_846?"on":"off";
}
this.isDisabled=_846;
this.isFocusable=!_846;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_849){
if(_849!=this.isReadOnly){
if(_849){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_849;
this.isReadOnly=_849;
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
DataInputBinding.prototype.handleElement=function(_84a){
return true;
};
DataInputBinding.prototype.updateElement=function(_84b){
var _84c=_84b.getAttribute("value");
var _84d=_84b.getAttribute("type");
var _84e=_84b.getAttribute("maxlength");
var _84f=_84b.getAttribute("minlength");
var _850=_84b.getAttribute("required")==="true";
if(_84c==null){
_84c="";
}
var _851=this.bindingWindow.UpdateManager;
if(this.getValue()!=_84c){
_851.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_84c);
}
if(this.type!=_84d){
_851.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_84d;
}
if(this.maxlength!=_84e){
_851.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_84e;
}
if(this.minlength!=_84f){
_851.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_84f;
}
if(this.isRequired!=_850){
_851.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_850;
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
DataInputBinding.prototype.setValue=function(_852){
if(_852===null){
_852="";
}
if(_852!=this.getValue()){
this.setProperty("value",_852);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_852);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _853=null;
if(this.shadowTree.input!=null){
_853=this.shadowTree.input.value;
}else{
_853=this.getProperty("value");
}
return _853;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _855=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_855=Number(_855);
break;
}
return _855;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_856){
var _857=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_856);
return UserInterface.registerBinding(_857,DataInputBinding);
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
var _858=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_858!=null){
this.setValue(_858.value);
_858.parentNode.removeChild(_858);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _859=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_859.tabIndex=-1;
return _859;
};
TextBoxBinding.prototype.handleElement=function(_85a){
return true;
};
TextBoxBinding.prototype.updateElement=function(_85b){
var _85c,area=_85b.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_85c=DOMUtil.getTextContent(area);
}
if(_85c==null){
_85c="";
}
var _85e=this.bindingWindow.UpdateManager;
if(this.getValue()!=_85c){
_85e.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_85c);
}
var _85f=_85b.getAttribute("type");
if(this.type!=_85f){
_85e.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_85f;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_863){
var _864=this.bindingDocument.selection.createRange();
var _865=_864.text=="";
if(_865&&!_863){
_864.text="\t";
}else{
var text="";
var _867=_864.text.length;
while((_864.moveStart("word",-1)&&_864.text.charAt(1)!="\n")){
}
_864.moveStart("character",1);
var _868=0;
var i=0,line,_86b=_864.text.split("\n");
while((line=_86b[i++])!=null){
if(_863){
line=line.replace(/^(\s)/mg,"");
_868++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_86b[i+1]?"\n":"");
}
_864.text=text;
_864.moveStart("character",-_867);
if(_863){
_864.moveStart("character",2*_86b.length-2);
}
_864.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86c=this.bindingDocument.selection.createRange();
var _86d=_86c.duplicate();
while((_86d.moveStart("word",-1)&&_86d.text.indexOf("\n")==-1)){
}
_86d.moveStart("character",1);
_86c.text="\n"+_86d.text.match(/^(\s)*/)[0]+"!";
_86c.moveStart("character",-1);
_86c.select();
_86c.text="";
_86c.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_86e){
var _86f;
var _870;
var oss;
var osy;
var i;
var fnd;
var _875=this._getSelectedText();
var el=this.shadowTree.input;
_86f=el.scrollLeft;
_870=el.scrollTop;
if(!_875.match(/\n/)){
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
_875=this._getSelectedText();
if(_86e){
ntext=_875.replace(/^(\s)/mg,"");
}else{
ntext=_875.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_875.length);
}
el.scrollLeft=_86f;
el.scrollTop=_870;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _877;
var _878;
var oss;
var osy;
var el=this.shadowTree.input;
_877=el.scrollLeft;
_878=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_877;
el.scrollTop=_878;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _87f=this.shadowTree.input.value;
var _880=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _87f.substr(_880,end-_880);
};
SelectorBinding.prototype=new DataBinding;
SelectorBinding.prototype.constructor=SelectorBinding;
SelectorBinding.superclass=DataBinding.prototype;
SelectorBinding.INDICATOR_IMAGE=Resolver.resolve("${skin}/fields/selectorindicator.png");
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
var _882=this.getProperty("isdisabled");
if(this.isDisabled||_882){
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
var _884=this.getProperty("label");
var _885=this.getProperty("value");
var _886=this.getProperty("width");
var _887=this.getProperty("onchange");
var _888=this.getProperty("required")==true;
var _889=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_884!=null){
this.label=_884;
}
if(!this.value&&_885!=null){
this.value=_885;
}
if(!this.width&&_886){
this.width=_886;
}
if(_888){
this.isRequired=true;
}
if(_889){
this._isLocal=true;
}
if(_887){
this.onValueChange=function(){
Binding.evaluate(_887,this);
};
}
this._computeImageProfile();
};
SelectorBinding.prototype._computeImageProfile=function(){
Binding.imageProfile(this);
};
SelectorBinding.prototype.buildDOMContent=function(){
this.buildButton();
this.buildIndicator();
this.buildPopup();
this.buildSelections();
this.bindingElement.tabIndex=0;
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
};
SelectorBinding.prototype.buildFormField=function(){
var _88a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_88a.name=this.getName();
_88a.value=this.getValue();
_88a.type="hidden";
if(this.hasCallBackID()){
_88a.id=this.getCallBackID();
}
this.shadowTree.input=_88a;
this.bindingElement.appendChild(_88a);
};
SelectorBinding.prototype.buildButton=function(){
var _88b=this.BUTTON_IMPLEMENTATION;
var _88c=this.add(_88b.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_88c.imageProfile=this.imageProfile;
}
if(this.width!=null){
_88c.setWidth(this.width);
}
this._buttonBinding=_88c;
this.shadowTree.button=_88c;
_88c.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _88e;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _88f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_88f.id="selectorpopupset";
_88e=UserInterface.registerBinding(_88f,PopupSetBinding);
this.bindingDocument.body.appendChild(_88e.bindingElement);
}else{
_88e=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_88e=top.app.bindingMap.selectorpopupset;
}
var doc=_88e.bindingDocument;
var _891=_88e.add(PopupBinding.newInstance(doc));
var _892=_891.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_891;
this._menuBodyBinding=_892;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_891.attachClassName("selectorpopup");
_891.addActionListener(PopupBinding.ACTION_SHOW,this);
_891.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_891.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_891);
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
var _895=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_895).each(function(_896){
var _897=_896.getAttribute("label");
var _898=_896.getAttribute("value");
var _899=_896.getAttribute("selected");
var _89a=_896.getAttribute("image");
var _89b=_896.getAttribute("image-hover");
var _89c=_896.getAttribute("image-active");
var _89d=_896.getAttribute("image-disabled");
var _89e=null;
if(_89a||_89b||_89c||_89d){
_89e=new ImageProfile({image:_89a,imageHover:_89b,imageActive:_89c,imageDisabled:_89d});
}
list.add(new SelectorBindingSelection(_897?_897:null,_898?_898:null,_899&&_899=="true",_89e));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _8a0=null;
while(list.hasNext()){
var _8a1=list.getNext();
var item=this.addSelection(_8a1);
if(_8a1.isSelected){
this.select(item,true);
}
if(!_8a0){
_8a0=item;
}
}
if(!this._selectedItemBinding){
this.select(_8a0,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8a3,_8a4){
var _8a5=this.MENUITEM_IMPLEMENTATION;
var _8a6=this._menuBodyBinding;
var _8a7=_8a6.bindingDocument;
var _8a8=_8a5.newInstance(_8a7);
_8a8.imageProfile=_8a3.imageProfile;
_8a8.setLabel(_8a3.label);
if(_8a3.tooltip!=null){
_8a8.setToolTip(_8a3.tooltip);
}
_8a8.selectionValue=_8a3.value;
_8a3.menuItemBinding=_8a8;
if(_8a4){
_8a6.addFirst(_8a8);
this.selections.addFirst(_8a3);
}else{
_8a6.add(_8a8);
this.selections.add(_8a3);
}
this._isUpToDate=false;
return _8a8;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a9){
return this.addSelection(_8a9,true);
};
SelectorBinding.prototype.clear=function(_8aa){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8aa&&this.defaultSelection!=null){
var _8ab=this.addSelection(this.defaultSelection);
this.select(_8ab,true);
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
SelectorBinding.prototype.setDisabled=function(_8ac){
if(this.isAttached==true){
var _8ad=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_8ac?"none":"block";
_8ad.setDisabled(_8ac);
}
if(_8ac){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8ae){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8ae);
}
};
SelectorBinding.prototype.handleAction=function(_8af){
SelectorBinding.superclass.handleAction.call(this,_8af);
switch(_8af.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8af.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8af.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8af.target);
_8af.consume();
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
_8af.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8b1){
this.select(_8b1);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8b2=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8b3=this._popupBinding.bindingElement;
_8b3.style.minWidth=_8b2;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8b5=Client.isExplorer?e.keyCode:e.which;
if(_8b5==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8b5=Client.isExplorer?e.keyCode:e.which;
if(_8b5>=32){
this._buttonBinding.check();
var _8b6=String.fromCharCode(_8b5);
this._pushSearchSelection(_8b6);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8b7){
this._searchString+=_8b7.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b8){
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
var _8b9=this._menuBodyBinding;
if(_8b9!=null){
var _8ba=this.MENUITEM_IMPLEMENTATION;
var _8bb=_8b9.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8bd=list.getNext();
if(_8bd.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8bd);
}
}
}
this._attachSelections();
var _8be=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8bf=_8b9.getDescendantBindingsByType(_8ba);
if(_8bf.hasEntries()){
while(_8bf.hasNext()){
var _8c0=_8bf.getNext();
var _8c1=_8c0.labelBinding;
if(_8c1!=null&&_8c1.shadowTree!=null&&_8c1.shadowTree.labelText!=null){
_8c1.shadowTree.labelText.innerHTML=_8c1.shadowTree.labelText.innerHTML.replace(_8be,"<b>$&</b>");
}
}
_8bf.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8c1=LabelBinding.newInstance(_8bb);
_8c1.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b9.add(_8c1);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8bd=list.getNext();
var item=this.addSelection(_8bd);
if(this._selectionValue==_8bd.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8c3,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8c3,arg);
switch(_8c3){
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
SelectorBinding.prototype.select=function(_8c6,_8c7){
var _8c8=false;
if(_8c6!=this._selectedItemBinding){
this._selectedItemBinding=_8c6;
_8c8=true;
var _8c9=this._buttonBinding;
this._selectionValue=_8c6.selectionValue;
this._selectionLabel=_8c6.getLabel();
_8c9.setLabel(_8c6.getLabel());
if(_8c6.imageProfile!=null){
_8c9.imageProfile=_8c6.imageProfile;
}
if(_8c9.imageProfile!=null){
_8c9.setImage(this.isDisabled==true?_8c9.imageProfile.getDisabledImage():_8c9.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8c7){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8c7)){
this.validate();
}
}
return _8c8;
};
SelectorBinding.prototype._relate=function(){
var _8ca=this.getProperty("relate");
if(_8ca){
var _8cb=this.bindingDocument.getElementById(_8ca);
if(_8cb){
var _8cc=UserInterface.getBinding(_8cb);
if(_8cc){
if(this.isChecked){
_8cc.show();
}else{
_8cc.hide();
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
SelectorBinding.prototype.selectByValue=function(_8cd,_8ce){
var _8cf=false;
var _8d0=this._menuBodyBinding;
var _8d1=_8d0.getDescendantElementsByLocalName("menuitem");
while(_8d1.hasNext()){
var _8d2=UserInterface.getBinding(_8d1.getNext());
if(_8d2.selectionValue==_8cd){
_8cf=this.select(_8d2,_8ce);
break;
}
}
return _8cf;
};
SelectorBinding.prototype.getValue=function(){
var _8d3=this._selectionValue;
if(_8d3!=null){
_8d3=String(_8d3);
}
return _8d3;
};
SelectorBinding.prototype.setValue=function(_8d4){
this.selectByValue(String(_8d4),true);
};
SelectorBinding.prototype.getResult=function(){
var _8d5=this._selectionValue;
if(_8d5=="null"){
_8d5=null;
}
if(_8d5){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8d5=Number(_8d5);
break;
}
}
return _8d5;
};
SelectorBinding.prototype.setResult=function(_8d6){
this.selectByValue(_8d6,true);
};
SelectorBinding.prototype.validate=function(){
var _8d7=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d8=this.getValue();
if(_8d8==this.defaultSelection.value){
_8d7=false;
}
if(_8d7!=this._isValid){
if(_8d7){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8d7;
}
return _8d7;
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
var _8d9=this._popupBinding;
if(!this._isUpToDate){
_8d9.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8da,_8db){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8da));
return true;
};
SelectorBinding.newInstance=function(_8dc){
var _8dd=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8dc);
return UserInterface.registerBinding(_8dd,SelectorBinding);
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
var _8e0=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8e0){
this.onValueChange=function(){
Binding.evaluate(_8e0,this);
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
SimpleSelectorBinding.prototype.focus=function(_8e3){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8e3){
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
SimpleSelectorBinding.prototype._hack=function(_8e4){
if(Client.isExplorer){
this._select.style.width=_8e4?"auto":this._cachewidth+"px";
if(_8e4){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8e5=true;
if(this.isRequired){
if(this.getValue()==null){
_8e5=false;
}
}
if(_8e5!=this._isValid){
if(_8e5){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8e6=this._select;
var _8e7=_8e6.options[_8e6.selectedIndex];
var text=DOMUtil.getTextContent(_8e7);
_8e6.blur();
_8e6.style.color="#A40000";
_8e6.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e7,DataBinding.warnings["required"]);
}
_8e6.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e7,text);
}
};
}
this._isValid=_8e5;
}
return _8e5;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e9=null;
var _8ea=this._select;
var _8eb=_8ea.options[_8ea.selectedIndex];
var _8ec=true;
if(Client.isExplorer){
var html=_8eb.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8ec=false;
}
}
if(_8ec){
_8e9=_8eb.getAttribute("value");
}
return _8e9;
};
SimpleSelectorBinding.prototype.setValue=function(_8ee){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8ef){
this.setValue(_8ef);
};
SimpleSelectorBinding.newInstance=function(_8f0){
var _8f1=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8f0);
return UserInterface.registerBinding(_8f1,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8f2,_8f3,_8f4,_8f5,_8f6){
this._init(_8f2,_8f3,_8f4,_8f5,_8f6);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8f7,_8f8,_8f9,_8fa,_8fb){
if(_8f7!=null){
this.label=String(_8f7);
}
if(_8f8!=null){
this.value=String(_8f8);
}
if(_8fa!=null){
this.imageProfile=_8fa;
}
if(_8fb!=null){
this.tooltip=_8fb;
}
this.isSelected=_8f9?true:false;
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
var _8fc=this.getProperty("image");
if(_8fc){
this.setImage(_8fc);
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
var _8ff=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8ff.popupBindingTargetElement=this.shadowTree.input;
_8ff.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8ff.attach();
var self=this;
_8ff.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8ff;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _902=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_902).each(function(_903){
if(_903.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _904=_903.getAttribute("value");
var _905=_903.getAttribute("selected");
var _906=_903.getAttribute("tooltip");
list.add({value:_904?_904:null,toolTip:_906?_906:null,isSelected:(_905&&_905=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _908=this._menuBodyBinding;
var _909=_908.bindingDocument;
while(_908.bindingElement.hasChildNodes()){
var node=_908.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_908.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _90b=this.getProperty("emptyentrylabel");
if(_90b){
var _90c=MenuItemBinding.newInstance(_909);
_90c.setLabel(_90b);
_90c.selectionValue="";
_908.add(_90c);
}
while(list.hasNext()){
var _90d=list.getNext();
var _90c=MenuItemBinding.newInstance(_909);
_90c.setLabel(_90d.label?_90d.label:_90d.value);
_90c.selectionValue=_90d.value;
if(_90d.image){
_90c.setImage(_90d.image);
}
if(_90d.toolTip){
_90c.setToolTip(_90d.toolTip);
}
if(_90d.isSelected){
this.select(_90c,true);
}
_908.add(_90c);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_90e){
this.select(_90e);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_90f,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_90f,arg);
switch(_90f){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_90f,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_911){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_911);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_912){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_912);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _913=this.bindingElement.offsetWidth+"px";
var _914=this._popupBinding.bindingElement;
_914.style.minWidth=_913;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _915=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _916=this.getValue();
var _917=null;
_915.each(function(item){
if(item.getLabel()==_916){
_917=item;
}
});
if(_917){
_917.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_91a){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_91a){
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
DataInputSelectorBinding.prototype.setValue=function(_91b){
var _91c=this.isReadOnly;
var _91d=null;
if(_91b!=null&&_91b!=""){
var _91e=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_91e.hasNext()){
var item=_91e.getNext();
if(item.selectionValue==_91b){
_91d=item.getLabel();
break;
}
}
}
if(_91d!=null){
this.value=_91b;
this.shadowTree.input.value=_91d;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_91b);
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
var _921="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_921);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_921);
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
var _923=ToolBarButtonBinding.newInstance(this.bindingDocument);
_923.setImage("${icon:popup}");
this.addFirst(_923);
_923.attach();
var self=this;
_923.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _925=self.getProperty("handle");
var _926=ViewDefinition.clone(_925,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_926 instanceof DialogViewDefinition){
_926.handler={handleDialogResponse:function(_927,_928){
self._isButtonClicked=false;
if(_927==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _929=_928.getFirst();
self.setValue(_929);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_926.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_926);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_923.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_923;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _92b=this._dialogButtonBinding;
if(_92b!=null){
_92b.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _92d=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_92d=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _92d;
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
var _930=ToolBarButtonBinding.newInstance(this.bindingDocument);
_930.setImage("${icon:editor-sourceview}");
_930.bindingElement.style.left="-24px";
_930.bindingElement.style.width="24px";
this.addFirst(_930);
_930.attach();
_930.hide();
var self=this;
_930.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_930;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_931){
UrlInputDialogBinding.superclass.setValue.call(this,_931);
if(this.isAttached){
this.compositeUrl=new Uri(_931);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _932=TreeService.GetCompositeUrlLabel(_931);
if(_932!=_931){
this.setLabel(_932);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_933){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_933){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_933;
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
var _934=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _935=this.getProperty("image");
if(_935!=null){
_934.setImage(_935);
}else{
_934.setImage("${icon:popup}");
}
this.addFirst(_934);
_934.attach();
var self=this;
_934.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_934;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _937=this._dialogButtonBinding;
if(_937!=null){
_937.oncommand();
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
var _938=this.getProperty("required")==true;
if(_938){
this.isRequired=true;
}
};
DataDialogBinding.prototype.onBindingAttach=function(){
DataDialogBinding.superclass.onBindingAttach.call(this);
Binding.imageProfile(this);
this._buildButton();
this.parseDOMProperties();
if(this.getProperty("handle")!=null||this.getProperty("url")){
this._buildIndicator();
}
this.bindingElement.tabIndex=0;
if(Client.isExplorer){
this.bindingElement.hideFocus=true;
}
};
DataDialogBinding.prototype._buildButton=function(){
var _939=this.getProperty("label");
var _93a=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_939!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_939+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_939);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_93a!=null){
this._buttonBinding.setToolTip(_93a);
}
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,this);
this._buttonBinding.attach();
};
DataDialogBinding.prototype._buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=Resolver.resolve("${icon:popup}");
img.className="dialogindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.indicatorimage=img;
};
DataDialogBinding.prototype.handleAction=function(_93c){
DataDialogBinding.superclass.handleAction.call(this,_93c);
var _93d=_93c.target;
var self=this;
switch(_93c.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_93f,_940){
if(_93f==Dialog.RESPONSE_ACCEPT){
if(_940 instanceof DataBindingMap){
self._map=_940;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_93d==this._buttonBinding){
_93c.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_941,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_941,arg);
switch(_941){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _944=this.getProperty("handle");
var url=this.getURL();
var _946=null;
if(_944!=null||def!=null){
if(def!=null){
_946=def;
}else{
_946=ViewDefinitions[_944];
}
if(_946 instanceof DialogViewDefinition){
_946.handler=this._handler;
if(this._map!=null){
_946.argument=this._map;
}
StageBinding.presentViewDefinition(_946);
}
}else{
if(url!=null){
_946=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_946!=null){
this._dialogViewHandle=_946.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_947){
this.setProperty("label",_947);
if(this.isAttached){
this._buttonBinding.setLabel(_947+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_948){
this.setProperty("image",_948);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_948);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_949){
this.setProperty("tooltip",_949);
if(this.isAttached){
this._buttonBinding.setToolTip(_949);
}
};
DataDialogBinding.prototype.setHandle=function(_94a){
this.setProperty("handle",_94a);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_94c){
this._handler=_94c;
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
var _94d=true;
if(this.isRequired==true){
var _94e=this.getValue();
if(_94e==null||_94e==""){
_94d=false;
}
if(_94d!=this._isValid){
if(_94d){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_94d;
}
return _94d;
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
DataDialogBinding.newInstance=function(_950){
var _951=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_950);
return UserInterface.registerBinding(_951,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_953,_954){
if(_953==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_954);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_955){
_955=new String(_955);
this.dirty();
this.setValue(encodeURIComponent(_955));
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
var _959=this.getValue();
if(_959==null){
_959="";
}
this.shadowTree.dotnetinput.value=_959;
};
PostBackDataDialogBinding.prototype.setValue=function(_95a){
this.setProperty("value",_95a);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_95b){
};
PostBackDataDialogBinding.newInstance=function(_95c){
var _95d=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95c);
return UserInterface.registerBinding(_95d,PostBackDataDialogBinding);
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
var _95e=this.getProperty("dialoglabel");
var _95f=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _961=this.getProperty("handle");
var _962=this.getProperty("selectedtoken");
if(_961!=null){
var def=ViewDefinition.clone(_961,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_95e!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_95e;
}
if(_95f!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_95f;
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
if(_962!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_962;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_964){
var _965=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_964);
return UserInterface.registerBinding(_965,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_967){
self._datathing.setValue(_967);
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
var _96a=self.getValue();
if(_96a==""||_96a==null){
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
var _96b=this.getProperty("value");
var _96c=this.getProperty("selectorlabel");
if(_96c==null){
_96c=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_96b==null));
list.add(new SelectorBindingSelection(_96c+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_96b!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _96b=this.getValue();
if(_96b==""||_96b==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_96e){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_96e);
switch(_96e.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_96e.target==this._datathing){
var _96f=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_96f){
self._selector.setLabel(_96f);
}
},500);
_96e.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_971){
this.setProperty("label",_971);
if(this._selector!=null){
this._selector.setLabel(_971);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_972){
this._datathing.setValue(_972);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_974,_975){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_974,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_976){
this._buttonBinding.setLabel(_976);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_977){
this._buttonBinding.setToolTip(_977);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_978){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_978);
switch(_978.type){
case MenuItemBinding.ACTION_COMMAND:
var _979=_978.target;
var _97a=this.master;
if(_979.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_979.getLabel());
setTimeout(function(){
_97a.action();
},0);
}else{
if(_97a.getValue()){
_97a.dirty();
}
_97a.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_97b){
var _97c=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_97b);
return UserInterface.registerBinding(_97c,NullPostBackDataDialogSelectorBinding);
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
var _97d=this._dataDialogBinding;
if(_97d!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_97d.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _97e=this.getProperty("editable");
var _97f=this.getProperty("selectable");
var _980=this.getProperty("display");
if(_97e!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_97f){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_980){
this._display=_980;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _981=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_981.selections=this.selections;
this.add(_981);
_981.attach();
this._dataDialogBinding=_981;
this.shadowTree.datadialog=_981;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _983=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _984=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_983=_984.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_983=_984.isSelected!=true;
break;
}
if(_983){
this.shadowTree.box.appendChild(this._getElementForSelection(_984));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_986){
var box=this.shadowTree.box;
var _988=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _989=list.getNext();
if(_986){
_989.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_988=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_988=_989.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_988=_989.isSelected!=true;
break;
}
}
if(_988){
var _98a=this._getElementForSelection(_989);
box.insertBefore(_98a,box.firstChild);
CSSUtil.attachClassName(_98a,"selected");
this._selectionMap.set(_989.value,_98a);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_98b){
var _98c=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_98c.appendChild(this.bindingDocument.createTextNode(_98b.label));
_98c.setAttribute("label",_98b.label);
_98c.setAttribute("value",_98b.value);
return _98c;
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
var _98e=DOMEvents.getTarget(e);
var _98f=DOMUtil.getLocalName(_98e);
if(_98f=="div"){
this._handleMouseDown(_98e);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_990){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _991=this._getElements();
var _992=_990.getAttribute("value");
var _993=this._lastSelectedElement.getAttribute("value");
var _994=false;
while(_991.hasNext()){
var el=_991.getNext();
switch(el.getAttribute("value")){
case _992:
case _993:
_994=!_994;
break;
}
if(_994){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_990);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_990)){
this._unhilite(_990);
}else{
this._hilite(_990);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_990){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_990;
};
MultiSelectorBinding.prototype._hilite=function(_998){
var _999=_998.getAttribute("value");
if(!this._selectionMap.has(_999)){
CSSUtil.attachClassName(_998,"selected");
this._selectionMap.set(_999,_998);
}
};
MultiSelectorBinding.prototype._unhilite=function(_99a){
var _99b=_99a.getAttribute("value");
if(this._selectionMap.has(_99b)){
CSSUtil.detachClassName(_99a,"selected");
this._selectionMap.del(_99b);
}
};
MultiSelectorBinding.prototype._isHilited=function(_99c){
return CSSUtil.hasClassName(_99c,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_99d){
MultiSelectorBinding.superclass.handleAction.call(this,_99d);
var _99e=_99d.target;
switch(_99d.type){
case DataDialogBinding.ACTION_COMMAND:
if(_99e==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_99d.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_99e.result);
this.dirty();
_99e.result=null;
_99d.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _99f=null;
if(this.isSelectable){
_99f=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9a1){
if(self._isHilited(_9a1)){
_9a1.parentNode.removeChild(_9a1);
_99f.add(new SelectorBindingSelection(_9a1.getAttribute("label"),_9a1.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _99f;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9a3=this._getElements();
if(!isUp){
_9a3.reverse();
}
var _9a4=true;
while(_9a4&&_9a3.hasNext()){
var _9a5=_9a3.getNext();
if(this._isHilited(_9a5)){
switch(isUp){
case true:
if(_9a5.previousSibling){
_9a5.parentNode.insertBefore(_9a5,_9a5.previousSibling);
}else{
_9a4=false;
}
break;
case false:
if(_9a5.nextSibling){
_9a5.parentNode.insertBefore(_9a5,_9a5.nextSibling.nextSibling);
}else{
_9a4=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9a6=new List();
var _9a7=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a9){
var _9aa=new SelectorBindingSelection(_9a9.getAttribute("label"),_9a9.getAttribute("value"),_9a7);
_9aa.isHighlighted=self._isHilited(_9a9);
_9a6.add(_9aa);
});
return _9a6;
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
var _9ab=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9ab.hasEntries()){
_9ab.each(function(_9ac){
_9ac.parentNode.removeChild(_9ac);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9ad=this.selections.getNext();
if(_9ad.isSelected){
var _9ae=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9ae.name=this._name;
_9ae.value=_9ad.value;
this.bindingElement.appendChild(_9ae);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9af){
alert(_9af);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9b0){
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
var _9b1={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9b2=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9b2.handler=this._handler;
_9b2.argument=_9b1;
StageBinding.presentViewDefinition(_9b2);
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
var _9b3={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9b5={handleDialogResponse:function(_9b6,_9b7){
if(_9b6==Dialog.RESPONSE_ACCEPT){
self.result=_9b7;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b8=ViewDefinitions[this._dialogViewHandle];
_9b8.handler=_9b5;
_9b8.argument=_9b3;
StageBinding.presentViewDefinition(_9b8);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b9){
var _9ba=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b9);
return UserInterface.registerBinding(_9ba,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9bb){
var id=_9bb.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9bd=_9bb.bindingDocument.getElementById(id);
if(_9bd!=null){
var _9be=UserInterface.getBinding(_9bd);
_9be.setResult(true);
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
var _9c0=this.bindingDocument.getElementById(id);
if(_9c0!=null){
var _9c1=UserInterface.getBinding(_9c0);
if(_9c1&&!_9c1.isAttached){
_9c1.isLazy=true;
}else{
_9c0.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9c2){
this._isLazy=_9c2;
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
var _9c4=this.getProperty("stateprovider");
var _9c5=this.getProperty("handle");
if(_9c4!=null&&_9c5!=null){
url=url.replace("${stateprovider}",_9c4).replace("${handle}",_9c5);
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
EditorDataBinding.prototype._onPageInitialize=function(_9c6){
EditorDataBinding.superclass._onPageInitialize.call(this,_9c6);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9c7){
EditorDataBinding.superclass.handleAction.call(this,_9c7);
switch(_9c7.type){
case Binding.ACTION_DIRTY:
if(_9c7.target!=this){
if(!this.isDirty){
this.dirty();
}
_9c7.consume();
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
EditorDataBinding.prototype.setValue=function(_9c8){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c9){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9ca){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9ca);
if(this.hasBasic===false){
var _9cb=this.getContentWindow().bindingMap.basicgroup;
if(_9cb){
_9cb.hide();
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
var _9d0=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9d0=fake.getValue()!="";
}
if(!_9d0&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9d0&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9d0;
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
var _9d4=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9d4!=null){
_9d4.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9d5){
_9d5=_9d5!=null?_9d5:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9d5;
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
var _9d6=this.getProperty("label");
if(_9d6){
this.setLabel(_9d6);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
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
if(!this._isTableIndexed){
this._indexTable();
}
var _a69=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a68);
_a69.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a69);
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
var div=this.bindingDocument.createElement("div");
div.className="tabliner";
this.bindingElement.insertBefore(div,this.bindingElement.firstChild);
this.shadowTree.tabManager=this.bindingDocument.createElement("div");
this.shadowTree.tabManager.className="tabmanager";
var _b08=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b08.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b09){
TabsBinding.superclass.handleAction.call(this,_b09);
switch(_b09.type){
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
var _b0c=self.bindingElement.offsetWidth;
if(_b0c!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b0c;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b0d){
if(_b0d instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b0d);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b0e=false;
var _b0f,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b12=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b13=this.bindingElement.offsetWidth-_b12.RESERVED_SPACE;
var _b14=null;
var sum=0,_b16=0;
var _b17=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b17){
tab=tabs.getNext();
_b0f=UserInterface.getBinding(tab);
if(!_b14){
_b14=_b0f;
}
sum+=tab.offsetWidth;
if(sum>=_b13){
_b0e=true;
if(_b0f.isSelected){
if(!DOMUtil.isFirstElement(_b0f.bindingElement,true)){
this.isManaging=false;
if(_b14){
_b14.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b0f,_b16-1);
_b17=false;
}
}else{
_b0f.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b0f);
}
}else{
_b0f.show();
_b14=_b0f;
_b16++;
}
}
if(_b17){
if(_b0e&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b18=_b14.getBindingElement();
var _b19=_b18.offsetLeft+_b18.offsetWidth;
var _b1a=this.tabsButtonBinding;
setTimeout(function(){
_b1a.show(_b19+4);
},50);
}else{
this.tabsButtonBinding.hide();
}
}
}
this.isManaging=false;
}
};
TabBinding.prototype=new MatrixBinding;
TabBinding.prototype.constructor=TabBinding;
TabBinding.superclass=MatrixBinding.prototype;
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
var _b1b=TabBinding.superclass.serialize.call(this);
if(_b1b){
_b1b.label=this.getLabel();
_b1b.image=this.getImage();
_b1b.tooltip=this.getToolTip();
}
return _b1b;
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
var _b1c=this.bindingElement.getAttribute("image");
var _b1d=this.bindingElement.getAttribute("label");
var _b1e=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b1d){
this.setLabel(_b1d);
}
if(_b1c){
this.setImage(_b1c);
}
if(_b1e){
this.setToolTip(_b1e);
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
TabBinding.prototype.setLabel=function(_b20){
if(_b20!=null){
this.setProperty("label",_b20);
if(this.isAttached){
this.labelBinding.setLabel(_b20);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b21){
if(_b21){
this.setProperty("tooltip",_b21);
if(this.isAttached){
this.labelBinding.setToolTip(_b21);
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
var _b23=false;
if(Client.isMozilla==true){
}
if(!_b23){
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
TabBinding.prototype.select=function(_b24){
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
TabBinding.newInstance=function(_b25){
var _b26=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b25);
return UserInterface.registerBinding(_b26,TabBinding);
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
var _b27=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b27=true;
this._lastKnownDimension=dim1;
}
return _b27;
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
TabPanelBinding.prototype.select=function(_b2a){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b2a!=true){
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
TabPanelBinding.prototype.handleAction=function(_b2b){
TabPanelBinding.superclass.handleAction.call(this,_b2b);
var _b2c=_b2b.target;
switch(_b2b.type){
case BalloonBinding.ACTION_INITIALIZE:
_b2b.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b2d){
var _b2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b2d);
UserInterface.registerBinding(_b2e,TabPanelBinding);
return UserInterface.getBinding(_b2e);
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
var _b2f=SplitBoxBinding.superclass.serialize.call(this);
if(_b2f){
_b2f.orient=this.getOrient();
_b2f.layout=this.getLayout();
}
return _b2f;
};
SplitBoxBinding.prototype.onBindingAttach=function(){
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
return this.getChildElementsByLocalName("splitpanel");
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
SplitterBinding.DIMENSION=8;
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
TreeBodyBinding.prototype.handleAction=function(_c58){
TreeBodyBinding.superclass.handleAction.call(this,_c58);
switch(_c58.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c58.target);
_c58.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c59){
var _c5a=_c59.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c5a.offsetTop;
var h=_c5a.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c5a.scrollIntoView(true);
}else{
if(y-t+h>a){
_c5a.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_c60){
var _c61=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c60);
return UserInterface.registerBinding(_c61,TreeBodyBinding);
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
var _c62=TreeNodeBinding.superclass.serialize.call(this);
if(_c62){
_c62.label=this.getLabel();
_c62.image=this.getImage();
var _c63=this.getHandle();
if(_c63&&_c63!=this.key){
_c62.handle=_c63;
}
if(this.isOpen){
_c62.open=true;
}
if(this.isDisabled){
_c62.disabled=true;
}
if(this.dragType){
_c62.dragtype=this.dragType;
}
if(this.dragAccept){
_c62.dragaccept=this.dragAccept;
}
}
return _c62;
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
var _c65=UserInterface.getBinding(node);
if(_c65&&_c65.containingTreeBinding){
this.containingTreeBinding=_c65.containingTreeBinding;
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
var _c66=this.key;
var _c67=this.getProperty("handle");
if(_c67){
_c66=_c67;
}
return _c66;
};
TreeNodeBinding.prototype.setHandle=function(_c68){
this.setProperty("handle",_c68);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c6a=this.getProperty("label");
var _c6b=this.getProperty("tooltip");
var _c6c=this.getProperty("oncommand");
var _c6d=this.getProperty("onbindingfocus");
var _c6e=this.getProperty("onbindingblur");
var _c6f=this.getProperty("focused");
var _c70=this.getProperty("callbackid");
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
if(_c6a!=null){
this.setLabel(_c6a);
}
if(_c6b!=null){
this.setToolTip(_c6b);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c72=this.bindingWindow.WindowManager;
if(_c6c!=null){
this.oncommand=function(){
Binding.evaluate(_c6c,this);
};
}
if(_c6d!=null){
this.onfocus=function(){
Binding.evaluate(_c6d,this);
};
}
if(_c6e!=null){
this.onblur=function(){
Binding.evaluate(_c6e,this);
};
}
if(_c6f==true){
this.focus();
}
if(_c70!=null){
Binding.dotnetify(this,_c70);
}
};
TreeNodeBinding.prototype.handleAction=function(_c73){
TreeNodeBinding.superclass.handleAction.call(this,_c73);
switch(_c73.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c73.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c74,_c75){
var _c76=true;
if(_c74 instanceof TreeNodeBinding){
var _c77=false;
var _c78=this.bindingElement;
var _c79=this.containingTreeBinding.bindingElement;
while(!_c77&&_c78!=_c79){
if(_c78==_c74.getBindingElement()){
_c77=true;
}else{
_c78=_c78.parentNode;
}
}
if(_c77){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c76=false;
}else{
this.acceptTreeNodeBinding(_c74,_c75);
}
}else{
_c76=false;
}
return _c76;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c7a,_c7b){
var _c7c=_c7a.serializeToString();
var _c7d=new BindingParser(this.bindingDocument);
var _c7e=_c7d.parseFromString(_c7c).getFirst();
_c7b=_c7b?_c7b:this.containingTreeBinding.getDropIndex();
var _c7f=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c7e,_c7f.get(_c7b));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c7a.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c80=this.getProperty("image");
var _c81=this.getProperty("image-active");
var _c82=this.getProperty("image-disabled");
_c81=_c81?_c81:this.isContainer?_c80?_c80:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c80?_c80:TreeNodeBinding.DEFAULT_ITEM;
_c82=_c82?_c82:this.isContainer?_c80?_c80:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c80?_c80:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c80=_c80?_c80:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c80,imageHover:null,imageActive:_c81,imageDisabled:_c82});
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
TreeNodeBinding.prototype.setLabel=function(_c84){
this.setProperty("label",String(_c84));
if(this.isAttached){
this.labelBinding.setLabel(String(_c84));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c85){
this.setProperty("tooltip",String(_c85));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c85));
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
var _c86=this.imageProfile.getDefaultImage();
var _c87=this.imageProfile.getActiveImage();
_c87=_c87?_c87:_c86;
return this.isOpen?_c87:_c86;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c89=DOMEvents.getTarget(e);
var _c8a=this.labelBinding.bindingElement;
var _c8b=this.labelBinding.shadowTree.labelBody;
var _c8c=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c89){
case _c8a:
this._onAction(e);
break;
case _c8b:
case _c8c:
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
if(_c89.parentNode==this.bindingElement&&_c89.__updateType==Update.TYPE_INSERT){
var _c8a=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c89)=="treenode"){
if(_c89==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c89,_c8a.nextSibling);
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
switch(_c89){
case _c8a:
case _c8b:
case _c8c:
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
var _c90=true;
if(e.type=="mousedown"){
var _c91=e.button==(e.target?0:1);
if(!_c91){
_c90=false;
}
}
if(_c90){
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
var _c93=false;
if(e!=null){
_c93=e.shiftKey;
}
this.dispatchAction(_c93?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c96=this.getDescendantBindingsByLocalName("treenode");
_c96.each(function(_c97){
_c97.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c98){
var _c99=_c98.getAttribute("focused");
if(_c99=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c9a){
var _c9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c9a);
return UserInterface.registerBinding(_c9b,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c9c){
var _c9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c9c);
return UserInterface.registerBinding(_c9d,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c9e){
this.bindingElement.style.left=_c9e.x+"px";
this.bindingElement.style.top=_c9e.y+"px";
this._geometry.x=_c9e.x;
this._geometry.y=_c9e.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c9f){
var _ca0=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c9f);
return UserInterface.registerBinding(_ca0,TreePositionIndicatorBinding);
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
this.addFilter(function(_ca2){
var _ca3=UserInterface.getBinding(_ca2);
var _ca4=null;
var _ca4=null;
if(!_ca3 instanceof TreeNodeBinding){
_ca4=NodeCrawler.SKIP_NODE;
}
return _ca4;
});
this.addFilter(function(_ca5,list){
var _ca7=UserInterface.getBinding(_ca5);
var _ca8=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca7.isOpen){
list.add(_ca7);
}
break;
}
return _ca8;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca9){
this.binding=_ca9;
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
DockTabsButtonBinding.newInstance=function(_caa){
var _cab=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_caa);
_cab.setAttribute("type","checkbox");
_cab.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cab.className="tabbutton";
return UserInterface.registerBinding(_cab,DockTabsButtonBinding);
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
var _cac=DockBinding.superclass.serialize.call(this);
if(_cac){
_cac.active=this.isActive?true:null;
_cac.collapsed=this.isCollapsed?true:null;
}
return _cac;
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
DockBinding.prototype.onBindingInitialize=function(){
if(this.type==DockBinding.TYPE_EDITORS){
this.showControls(false);
}
DockBinding.superclass.onBindingInitialize.call(this);
};
DockBinding.prototype.buildDOMContent=function(){
var _cad=UserInterface.getBinding(this.bindingElement.parentNode);
var _cae=MatrixBinding.newInstance(this.bindingDocument);
_cae.attachClassName("dockliner");
this.shadowTree.dockLiner=_cae;
_cad.add(_cae);
_cae.attach();
_cae.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_cb0){
var _cb1=this.getSelectedTabPanelBinding();
if(_cb1){
_cb1.isVisible=_cb0;
_cb1.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cb2){
var _cb3=this._getBindingForDefinition(_cb2);
var _cb4=DockTabBinding.newInstance(this.bindingDocument);
_cb4.setHandle(_cb2.handle);
_cb4.setLabel(_cb2.flowHandle?null:_cb2.label);
_cb4.setImage(_cb2.image);
_cb4.setToolTip(_cb2.toolTip);
_cb4.setEntityToken(_cb2.entityToken);
_cb4.setAssociatedView(_cb3);
this.appendTabByBindings(_cb4,null);
this._setupPageBindingListeners(_cb4);
var _cb5=this.getTabPanelBinding(_cb4);
_cb3.snapToBinding(_cb5);
var _cb6=this.bindingWindow.bindingMap.views;
_cb6.add(_cb3);
if(!this.isActive){
this.activate();
}
_cb3.attach();
};
DockBinding.prototype.prepareOpenView=function(_cb7,_cb8){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cb8.setLabel(_cb7.label);
_cb8.setImage(_cb7.image);
_cb8.setToolTip(_cb7.toolTip);
this._setupPageBindingListeners(_cb8);
var _cb9=this.getTabPanelBinding(_cb8);
var _cba=this._getBindingForDefinition(_cb7);
_cb8.setAssociatedView(_cba);
_cba.snapToBinding(_cb9);
UserInterface.getBinding(this.bindingDocument.body).add(_cba);
_cba.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cbb){
var _cbc=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cbc.bindingDocument);
view.setDefinition(_cbb);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cbe){
var _cbf=this.getTabPanelBinding(_cbe);
var self=this;
var _cc1={handleAction:function(_cc2){
var _cc3=_cc2.target;
switch(_cc2.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cc3.reflex(true);
var view=_cbe.getAssociatedView();
if(_cc3.bindingWindow==view.getContentWindow()){
_cbe.updateDisplay(_cc3);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cbe.onPageInitialize(_cc3);
_cc2.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cbe.getAssociatedView();
if(_cc3.bindingWindow==view.getContentWindow()){
_cbe.updateDisplay(_cc3);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cbe.updateDisplay(_cc3);
_cc2.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cbe.updateEntityToken(_cc3);
_cc2.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cbe.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cbe.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cbe);
_cc2.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cbe,true);
_cc2.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cbe);
break;
case Binding.ACTION_FORCE_REFLEX:
_cbf.reflex(true);
_cc2.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cbe.isDirty){
_cbe.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cc5){
_cbf.addActionListener(_cc5,_cc1);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc6){
DockBinding.superclass.handleAction.call(this,_cc6);
var _cc7=_cc6.target;
switch(_cc6.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc6.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cc7 instanceof DockBinding){
if(_cc7.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cc7);
if(this.isActive){
_cc7.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cc7);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cc8,arg){
DockBinding.superclass.handleBroadcast.call(this,_cc8,arg);
switch(_cc8){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cca=arg;
if(_cca.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cca.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_ccb){
var tabs=this.getTabBindings();
var _ccd=false;
while(tabs.hasNext()&&!_ccd){
var tab=tabs.getNext();
var _ccf=tab.getEntityToken();
if(_ccf!=null&&_ccf==_ccb){
if(!tab.isSelected){
this.select(tab,true);
_ccd=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cd0){
this._handleCollapse(true,_cd0);
};
DockBinding.prototype.unCollapse=function(_cd1){
this._handleCollapse(false,_cd1);
};
DockBinding.prototype._handleCollapse=function(_cd2,_cd3){
var _cd4=this.getChildBindingByLocalName("dockpanels");
var _cd5=this.getAncestorBindingByLocalName("splitbox");
if(_cd2){
_cd4.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cd3&&_cd5.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cd4.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cd3){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cd2);
this.isCollapsed=_cd2;
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
DockBinding.prototype.closeTab=function(_cda,_cdb){
if(_cda.isDirty&&!_cdb){
var _cdc=Resolver.resolve(_cda.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cdc),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cde){
switch(_cde){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cda);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cda);
break;
}
}});
}else{
this.removeTab(_cda);
}
};
DockBinding.prototype.closeTabsExcept=function(_cdf){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cdf){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ce2){
var _ce3=_ce2.getAssociatedView();
_ce3.saveContainedEditor();
var self=this;
var _ce5={handleBroadcast:function(_ce6,arg){
switch(_ce6){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ce3.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ce5);
if(arg.isSuccess){
self.removeTab(_ce2);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ce5);
};
DockBinding.prototype.appendTabByBindings=function(_ce8,_ce9){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ce8,_ce9);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cea){
_cea=_cea?_cea+"px":"100%";
this.bindingElement.style.width=_cea;
};
DockBinding.prototype.show=function(){
if(this.isVisible){
DockBinding.superclass.show.call(this);
this.isFlexible=true;
this.shadowTree.dockLiner.style.display="block";
}
};
DockBinding.prototype.hide=function(){
if(!this.isVisible){
DockBinding.superclass.hide.call(this);
this.shadowTree.dockLiner.style.display="none";
this.isFlexible=false;
if(this.isActive){
this.deActivate();
}
}
};
DockBinding.prototype.showControls=function(_ceb){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_ceb){
tabs.controlGroupBinding.show();
}else{
tabs.controlGroupBinding.hide();
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
DockTabsBinding.prototype.buildDOMContent=function(){
DockTabsBinding.superclass.buildDOMContent.call(this);
if(this.containingTabBoxBinding.type!=DockBinding.TYPE_EXPLORER){
this.controlGroupBinding=this.add(ControlGroupBinding.newInstance(this.bindingDocument));
this.controlGroupBinding.attachClassName("docktabscontrolgroup");
this.controlGroupBinding.add(this.getControlBinding(ControlBinding.TYPE_MAXIMIZE));
this.controlGroupBinding.attachRecursive();
}
};
DockTabsBinding.prototype.getControlBinding=function(type){
var _cee=DockControlBinding.newInstance(this.bindingDocument);
_cee.setControlType(type);
return _cee;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cf0=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf0)){
_cf0=_cf0>0?_cf0-1:0;
self.bindingElement.style.width=new String(_cf0)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cf1){
DockTabsBinding.superclass.handleCrawler.call(this,_cf1);
switch(_cf1.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cf3=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf3)){
_cf3=_cf3>0?_cf3-1:0;
self.bindingElement.style.width=new String(_cf3)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cf4){
var _cf5=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cf4);
return UserInterface.registerBinding(_cf5,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cf6){
this._viewBinding=_cf6;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cf7=DockTabBinding.superclass.serialize.call(this);
if(_cf7){
_cf7.label=null;
_cf7.image=null;
_cf7.handle=this.getHandle();
}
return _cf7;
};
DockTabBinding.prototype.setHandle=function(_cf8){
this.setProperty("handle",_cf8);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cf9){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cf9;
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
this._controlGroupBinding=this.labelBinding.add(ControlGroupBinding.newInstance(this.bindingDocument));
var _cfa=DialogControlBinding.newInstance(this.bindingDocument);
_cfa.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cfa);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cfb){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cfb){
this.isDirty=_cfb;
if(Binding.exists(this.labelBinding)){
var _cfc=this.labelBinding.getLabel();
if(_cfc!=null){
this.labelBinding.setLabel(_cfb?"*"+_cfc:_cfc.slice(1,_cfc.length));
}else{
this.labelBinding.setLabel(_cfb?"*":"");
}
}
}
var _cfd=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cfd.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cfd.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cfe){
this.setLabel(_cfe.getLabel());
this.setImage(_cfe.getImage());
this.setToolTip(_cfe.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cff){
this.setEntityToken(_cff.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d00){
DockTabBinding.superclass.handleAction.call(this,_d00);
var _d01=_d00.target;
switch(_d00.type){
case ControlBinding.ACTION_COMMAND:
if(_d01.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d00.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d01);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d02){
var cmd=_d02.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d04){
if(!_d04){
if(!this.getLabel()){
_d04=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d04=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d04=this.isDirty?"*"+_d04:_d04;
DockTabBinding.superclass.setLabel.call(this,_d04);
};
DockTabBinding.prototype.setImage=function(_d05){
if(!_d05){
if(!this.getImage()){
_d05=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d05=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d05);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d08=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d08;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d08;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d08;
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
var _d0a=this.bindingElement;
setTimeout(function(){
_d0a.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d0b,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d0b,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d0b){
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
DockTabBinding.prototype.select=function(_d10){
DockTabBinding.superclass.select.call(this,_d10);
this._updateBroadcasters();
if(_d10!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d11=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d12=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d12.enable();
if(this.isDirty){
_d11.enable();
}else{
_d11.disable();
}
}else{
_d12.disable();
_d11.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d13){
if(this._canUpdateTree||_d13){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d14=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d16=win.bindingMap.savebutton;
if(_d16!=null){
_d14=true;
}
}
}
return _d14;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d17){
var _d18=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d17);
return UserInterface.registerBinding(_d18,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d19){
var _d1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d19);
return UserInterface.registerBinding(_d1a,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d1b){
DockPanelBinding.superclass.select.call(this,_d1b);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d1c){
DockPanelBinding.superclass.handleCrawler.call(this,_d1c);
if(_d1c.response==null){
if(_d1c.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d1c.id==FocusCrawler.ID){
_d1c.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d1d){
var _d1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d1d);
return UserInterface.registerBinding(_d1e,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d1f){
var _d20=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d1f);
return UserInterface.registerBinding(_d20,DockControlBinding);
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
ViewBinding.getInstance=function(_d21){
var _d22=ViewBinding._instances.get(_d21);
if(!_d22){
var cry="ViewBinding.getInstance: No such instance: "+_d21;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d22;
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
var _d25=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d25){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d26=snap.boxObject.getGlobalPosition();
var _d27=snap.boxObject.getDimension();
if(!Point.isEqual(_d26,this._lastknownposition)){
this.setPosition(_d26);
this._lastknownposition=_d26;
}
if(!Dimension.isEqual(_d27,this._lastknowndimension)){
this.setDimension(_d27);
this._lastknowndimension=_d27;
var _d28=_d27.h-ViewBinding.VERTICAL_ADJUST;
_d28=_d28<0?0:_d28;
this.windowBinding.getBindingElement().style.height=new String(_d28)+"px";
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
var _d29=this._viewDefinition.flowHandle;
if(_d29!=null){
FlowControllerService.CancelFlow(_d29);
}
}
if(this._viewDefinition!=null){
var _d2a=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d2a);
this.logger.fine("ViewBinding closed: \""+_d2a+"\"");
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
var _d2c=null;
if(this._viewDefinition!=null){
_d2c=this._viewDefinition.handle;
}
return _d2c;
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
ViewBinding.prototype.setDefinition=function(_d2d){
this._viewDefinition=_d2d;
if(_d2d.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d2e){
ViewBinding.superclass.handleAction.call(this,_d2e);
var _d2f=_d2e.target;
switch(_d2e.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d2e.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d2f.isActivated){
_d2f.onActivate();
}
}
_d2e.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d2f==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d2e.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d2f==this._snapBinding){
if(_d2f.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d2f.getContentWindow().isPostBackDocument){
if(_d2e.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d2f.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d2f==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d2f.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d2e.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d2e.type==WindowBinding.ACTION_ONLOAD){
var win=_d2f.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d2f);
}
}
}
_d2e.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d2f.label&&this._viewDefinition.label){
_d2f.label=this._viewDefinition.label;
}
if(!_d2f.image&&this._viewDefinition.image){
_d2f.image=this._viewDefinition.image;
}
if(_d2f.bindingWindow==this.getContentWindow()){
this._pageBinding=_d2f;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d2f.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d2f==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d2e.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d2e.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d34,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d34,arg);
switch(_d34){
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
var _d38=def.argument;
if(_d38!=null){
page.setPageArgument(_d38);
}
var _d39=def.width;
if(_d39!=null){
page.width=_d39;
}
var _d3a=def.height;
if(_d3a!=null){
page.height=_d3a;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d3b){
ViewBinding.superclass.handleCrawler.call(this,_d3b);
switch(_d3b.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d3b.id==FocusCrawler.ID){
if(_d3b.previousNode!=this._snapBinding.bindingElement){
_d3b.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d3b.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d3c){
_d3c.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d3c.x+"px";
this.bindingElement.style.top=_d3c.y+"px";
};
ViewBinding.prototype.setDimension=function(_d3d){
_d3d.h-=ViewBinding.VERTICAL_ADJUST;
_d3d.w-=ViewBinding.HORIZONTAL_ADJUST;
_d3d.w-=1;
if(_d3d.h<0){
_d3d.h=0;
}
if(_d3d.w<0){
_d3d.w=0;
}
this.bindingElement.style.width=String(_d3d.w)+"px";
this.bindingElement.style.height=String(_d3d.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d3e){
this.isFlexBoxBehavior=false;
_d3e.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d3e.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d3e.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d3e;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d3f=null;
if(this.isFreeFloating==true){
_d3f=this._snapBinding.getBindingElement();
}else{
_d3f=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d3f;
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
ViewBinding.prototype.reload=function(_d40){
this._isLoaded=false;
this.windowBinding.reload(_d40);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d41=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d41=true;
}
}
if(!_d41){
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
ViewBinding.newInstance=function(_d45){
var _d46=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d45);
var _d47=UserInterface.registerBinding(_d46,ViewBinding);
_d47.windowBinding=_d47.add(WindowBinding.newInstance(_d45));
return _d47;
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
var _d4f=this.bindingWindow.__doPostBack;
var _d50=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d50){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d51,_d52){
if(!form.__isSetup){
Application.lock(self);
_d50=true;
}
self.manifestAllDataBindings();
_d4f(_d51,_d52);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d53,list){
var _d55=this.bindingWindow.bindingMap.__REQUEST;
if(_d55!=null&&this._isDotNet()){
switch(_d53){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d55.postback(_d53);
}
}
break;
default:
_d55.postback(_d53);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d53,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d56,list){
var _d58=this.getDescendantBindingsByType(WindowBinding);
_d58.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d56,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d5c){
if(_d5c.name==null||_d5c.name==""){
return;
}
list.add({name:_d5c.name,value:_d5c.value});
});
var out="";
list.each(function(_d5e){
out+=_d5e.name+": "+_d5e.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d5f){
PageBinding.superclass.handleAction.call(this,_d5f);
var _d60=_d5f.target;
switch(_d5f.type){
case RootBinding.ACTION_PHASE_3:
if(_d60==UserInterface.getBinding(this.bindingDocument.body)){
_d60.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d60);
}
_d5f.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d61=this.validateAllDataBindings();
if(_d61){
this.doPostBack(_d60);
}
}
_d5f.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d5f.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d60.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d60.key)){
this._initBlockers.del(_d60.key);
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
var _d63={handleAction:function(_d64){
if(_d64.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d63);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d63);
}else{
MessageQueue.udpdate();
}
_d5f.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d65,arg){
PageBinding.superclass.handleBroadcast.call(this,_d65,arg);
switch(_d65){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d67=arg;
if(!this._canPostBack&&!_d67){
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
PageBinding.prototype.doPostBack=function(_d69){
if(this._canPostBack){
if(_d69!=null&&this._isDotNet()){
var _d6a=_d69.getCallBackID();
var _d6b=_d69.getCallBackArg();
if(_d6a!=null){
_d6a=_d6a.replace(/_/g,"$");
}else{
_d6a="";
}
if(_d6b==null){
_d6b="";
}
this.bindingWindow.__doPostBack(_d6a,_d6b);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d6c){
var _d6d=true;
var _d6e=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6e.hasNext()&&_d6d){
var _d6f=_d6e.getNext();
if(_d6f.isAttached){
var _d70=_d6f.validate();
if(_d6d&&!_d70){
_d6d=false;
this.logger.debug("Invalid DataBinding: "+_d6f.toString()+" ("+_d6f.getName()+")");
if(_d6c){
var _d71=_d6f.getAncestorBindingByType(TabPanelBinding);
if(_d71!=null&&!_d71.isVisible){
var _d72=_d71.getAncestorBindingByType(TabBoxBinding);
var _d73=_d72.getTabBinding(_d71);
_d72.select(_d73);
}
}
break;
}
}
}
return _d6d;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d75=this.bindingWindow.DataManager.getAllDataBindings();
while(_d75.hasNext()){
var _d76=_d75.getNext();
if(_d76.isAttached){
var _d77=_d76.manifest();
if(_d77!=null){
list.add(_d77);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d78=this.bindingWindow.DataManager.getAllDataBindings();
while(_d78.hasNext()){
var _d79=_d78.getNext();
if(_d79.isAttached){
_d79.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d7a="";
if(!_d7a&&this.labelfield){
var _d7b=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d7b!=null&&_d7b.getLabel){
_d7a=_d7b.getLabel();
}else{
if(_d7b!=null&&_d7b.getValue){
_d7a=_d7b.getValue();
}
}
}
if(!_d7a&&this.label){
_d7a=this.label;
}
return _d7a;
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
var _d7e=this._cachedFocus.getBinding();
if(_d7e){
_d7e.blur();
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
var _d7f=this.getProperty("width");
if(!_d7f){
_d7f=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d7f;
}
if(this.height==null){
var _d80=this.getProperty("height");
this.height=_d80?_d80:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d81=this.getProperty("minheight");
if(_d81!=null){
this.minheight=_d81;
}
}
if(this.controls==null){
var _d82=this.getProperty("controls");
this.controls=_d82?_d82:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d83=this.getProperty("resizable");
this.isResizable=_d83?_d83:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d84){
if(_d84!=this.isAutoHeightLayoutMode){
if(_d84){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d84;
}
};
DialogPageBinding.prototype.handleAction=function(_d85){
DialogPageBinding.superclass.handleAction.call(this,_d85);
var _d86=_d85.target;
switch(_d85.type){
case PageBinding.ACTION_ATTACHED:
if(_d86!=this&&_d86.isFitAsDialogSubPage){
_d86.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d85.consume();
if(_d86.response!=null){
this.response=_d86.response;
switch(_d86.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d87){
var _d88=this.bindingWindow.bindingMap.buttonAccept;
if(_d88!=null){
_d88.setDisabled(_d87);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d89){
var _d8a=CSSComputer.getPadding(this.bindingElement);
var _d8b=CSSComputer.getBorder(this.bindingElement);
_d89+=_d8a.top+_d8a.bottom;
_d89+=_d8b.top+_d8b.bottom;
if(_d89>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d89+"px";
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
EditorPageBinding.prototype.handleAction=function(_d93){
EditorPageBinding.superclass.handleAction.call(this,_d93);
var _d94=_d93.target;
switch(_d93.type){
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
var _d95=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d94.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d95==-1){
_d95=0;
}
}else{
_d95++;
}
return res;
});
if(_d95>-1){
this._messengers.del(_d95);
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
_d93.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d94.key,_d94);
if(_d94 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d94.key);
if(_d94 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d94==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d94.getSelectedTabBinding();
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
_d93.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d94==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d93.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d94==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d93.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d94==this._windowBinding){
if(_d94.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d9a=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d9a);
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
var _d9b=this.bindingWindow.bindingMap.savebutton;
if(_d9b!=null&&!_d9b.isDisabled){
_d9b.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9c=this.bindingWindow.bindingMap.__REQUEST;
if(_d9c!=null){
_d9c.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9d=this.bindingWindow.bindingMap.__REQUEST;
if(_d9d!=null){
_d9d.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d9e){
this._message=null;
switch(_d9e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d9e,this._messengers);
if(!this._messengers.hasEntries()){
if(_d9e==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d9e;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d9e;
EditorPageBinding.superclass.postMessage.call(this,_d9e,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d9e,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d9f,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d9f,arg);
switch(_d9f){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _da1=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_da1);
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
var _da2=new List();
this._invalidBindings.each(function(key,_da4){
var list=_da4.getInvalidLabels();
if(list){
list.each(function(_da6){
_da2.add(_da6);
});
}
});
if(_da2.hasEntries()){
var _da7="";
while(_da2.hasNext()){
_da7+=_da2.getNext().toLowerCase();
if(_da2.hasNext()){
_da7+=", ";
}else{
_da7+=".";
}
}
var _da8=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da8+" "+_da7);
}else{
StatusBar.clear();
}
};
EditorPageBinding.prototype._startPreview=function(){
Application.lock(this);
this._isGeneratingPreview=true;
if(Client.isPrism){
Prism.disableCache();
}
this._windowBinding.setURL(WindowBinding.POSTBACK_URL);
};
EditorPageBinding.prototype._stopPreview=function(){
this._windowBinding.reset();
if(Application.isLocked){
Application.unlock(this);
}
};
EditorPageBinding.prototype.enableSave=function(_da9){
var _daa=this.bindingDocument.getElementById("broadcasterCanSave");
if(_daa){
var _dab=UserInterface.getBinding(_daa);
if(_da9){
_dab.enable();
}else{
_dab.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _dac=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_dac!=null){
UserInterface.getBinding(_dac).enable();
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
var _dad=this._windowBinding.getContentDocument().title;
if(_dad==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _dae=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_db0){
if(_db0.name=="__EVENTTARGET"&&_dae){
_db0.value=_dae;
}
list.add({name:_db0.name,value:_db0.value});
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
var _db2=this.getProperty("responseid");
this.responseid=_db2;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_db3){
ResponsePageBinding.superclass.handleAction.call(this,_db3);
switch(_db3.type){
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
WizardPageBinding.prototype.handleAction=function(_db4){
WizardPageBinding.superclass.handleAction.call(this,_db4);
var _db5=_db4.target;
switch(_db4.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_db5);
}else{
_db4.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_db5);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_db4.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_db4.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db6){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db8=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db6);
}
if(_db8){
_db8.setDisabled(!_db6);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db9,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db9,arg);
var self=this;
switch(_db9){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dbd){
};
MarkupAwarePageBinding.prototype._activate=function(_dbe){
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
var _dbf=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dbf.boxObject.getDimension().w;
_dbf.hide();
var _dc0=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dc0+"px";
var self=this;
var _dc2=this.bindingWindow.bindingMap.moreactionsbutton;
_dc2.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dc3){
self._showMoreActions();
_dc3.consume();
}});
var _dc4=this.bindingWindow.bindingMap.moreactionspopup;
_dc4.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dc5){
var item=_dc5.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dc7,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dc7,arg);
switch(_dc7){
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
var _dcb=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dcb!=null){
_dcb.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dcc=this.bindingWindow.WindowManager;
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
var _dcd=new String("");
this._actionProfile.each(function(_dce,list){
list.each(function(_dd0){
_dcd+=_dd0.getHandle()+";"+_dd0.getKey()+";";
if(_dd0.isDisabled()){
_dcd+="isDisabled='true';";
}
});
});
return _dcd;
};
SystemToolBarBinding.prototype.handleAction=function(_dd1){
SystemToolBarBinding.superclass.handleAction.call(this,_dd1);
switch(_dd1.type){
case ButtonBinding.ACTION_COMMAND:
var _dd2=_dd1.target;
this._handleSystemAction(_dd2.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dd3){
if(_dd3!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dd5=list.getFirst();
var _dd6=_dd5.node;
}
SystemAction.invoke(_dd3,_dd6);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd9,list){
var _ddb=new List();
list.reset();
while(list.hasNext()){
var _ddc=list.getNext();
var _ddd=null;
if(_ddc.isInToolBar()){
if(_ddc.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_ddd=self.getToolBarButtonBinding(_ddc);
}
}
if(_ddd!=null){
_ddb.add(_ddd);
}
}
if(_ddb.hasEntries()){
var _dde=ToolBarGroupBinding.newInstance(doc);
_ddb.each(function(_ddf){
_dde.add(_ddf);
});
self.addLeft(_dde);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _de0=this.bindingWindow.bindingMap.toolsbutton;
var _de1=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _de2=_de0.bindingElement.offsetLeft-this._moreActionsWidth;
var _de3=0;
var _de4=new List();
var _de5,_de6=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_de5=_de6.getNext())!=null){
if(!_de5.isVisible){
_de5.show();
}
_de3+=_de5.boxObject.getDimension().w;
if(_de3>=_de2){
_de4.add(_de5);
_de5.hide();
}
}
if(_de4.hasEntries()){
var _de7=_de4.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_de7).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_de5=_de4.getNext())!=null){
this._moreActions.add(_de5.associatedSystemAction);
}
_de1.show();
}else{
this._moreActions=null;
_de1.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _de8=this.bindingWindow.bindingMap.moreactionspopup;
_de8.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_de8.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_de8.add(item);
}
_de8.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dea){
var _deb=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dec=_dea.getLabel();
var _ded=_dea.getToolTip();
var _dee=_dea.getImage();
var _def=_dea.isDisabled();
if(_dee&&_dee.indexOf("size=")==-1){
_dee=_dee+"&size="+this.getImageSize();
_deb.imageProfile=new ImageProfile({image:_dee});
}
if(_dec){
_deb.setLabel(_dec);
}
if(_ded){
_deb.setToolTip(_ded);
}
if(_dea.isDisabled()){
_deb.disable();
}
_deb.associatedSystemAction=_dea;
return _deb;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _df0=this.getDescendantBindingByLocalName("toolbarbutton");
if(_df0!=null){
_df0.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_df1){
var _df2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_df1);
return UserInterface.registerBinding(_df2,SystemToolBarBinding);
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
this.isLockedToEditor=true;
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
SystemTreeBinding.prototype.add=function(_df3){
var _df4=SystemTreeBinding.superclass.add.call(this,_df3);
if(!this._defaultTreeNode){
if(_df3 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_df3;
}
}
return _df4;
};
SystemTreeBinding.prototype.handleAction=function(_df5){
SystemTreeBinding.superclass.handleAction.call(this,_df5);
var _df6=_df5.target;
switch(_df5.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df6.key);
this._updateFocusedNode();
_df5.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_df5.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df6.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_df5.consume();
break;
}
};
SystemTreeBinding.prototype.focus=function(){
SystemTreeBinding.superclass.focus.call(this);
if(this.isFocused){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype._focusDefault=function(){
this._attemptRestorableFocus();
if(!this.getFocusedTreeNodeBindings().hasEntries()){
SystemTreeBinding.superclass._focusDefault.call(this);
}
};
SystemTreeBinding.prototype._attemptRestorableFocus=function(){
if(this._treeNodeBindings.has(this._restorableFocusHandle)){
var _df8=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df8);
}
this._restorableFocusHandle=null;
};
SystemTreeBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
this._computeClipboardSetup();
this._computeRefreshSetup();
if(this._isActionProfileAware){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{activePosition:this._activePosition,actionProfile:this.getCompiledActionProfile()});
}
}
};
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df9){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df9);
var reg=this._entityTokenRegistry;
var _dfb=_df9.node.getEntityToken();
if(reg.has(_dfb)){
reg.get(_dfb).add(_df9);
}else{
reg.set(_dfb,new List([_df9]));
}
var _dfc=null;
if(this.isLockedToEditor){
if(_dfb==StageBinding.entityToken){
if(_df9.node.isTreeLockEnabled()){
_dfc=_df9;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df9.node.getHandle()){
_dfc=_df9;
}
}
}
if(_dfc!=null){
this.focusSingleTreeNodeBinding(_dfc);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dfd){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dfd);
var reg=this._entityTokenRegistry;
var _dff=_dfd.node.getEntityToken();
if(reg.has(_dff)){
var list=reg.get(_dff);
list.del(_dfd);
if(!list.hasEntries()){
reg.del(_dff);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dfd.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dfd.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e03=this._refreshingTreeNodes;
if(_e03.hasEntries()&&_e03.has(key)){
_e03.del(key);
if(!_e03.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e04=StageBinding.entityToken;
if(_e04!=null){
this._focusTreeNodeByEntityToken(_e04);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e05=false;
var _e06=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e05=false;
}else{
if(_e06.hasEntries()){
_e05=true;
while(_e05&&_e06.hasNext()){
var _e07=_e06.getNext();
if(!_e07.isDraggable){
_e05=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e05;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e08,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e08,arg);
switch(_e08){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e08,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e08);
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
var self=this,_e0c=arg;
setTimeout(function(){
if(_e0c!=null){
self._focusTreeNodeByEntityToken(_e0c);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e0e=tab.perspectiveNode==null;
if(!_e0e){
_e0e=tab.perspectiveNode==this.perspectiveNode;
}
if(_e0e){
var self=this,_e10=tab.getEntityToken();
setTimeout(function(){
if(_e10!=null){
self._focusTreeNodeByEntityToken(_e10);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e11,_e12){
this.isLockFeatureFocus=true;
var _e13=null;
if(this._entityTokenRegistry.has(_e11)){
var list=this._entityTokenRegistry.get(_e11);
list.each(function(tn){
var _e16=true;
if(tn.node.isTreeLockEnabled()){
_e13=tn;
_e16=false;
}
return _e16;
});
if(_e13!=null){
if(!_e13.isFocused){
this.focusSingleTreeNodeBinding(_e13,true);
}else{
_e13.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e13==null&&_e12!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e11);
self._focusTreeNodeByEntityToken(_e11,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e18){
var _e19=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e1a=this.getRootTreeNodeBindings();
while(_e1a.hasNext()){
var _e1b=_e1a.getNext();
_e19.add(_e1b.node.getEntityToken());
}
}else{
_e19.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e19.hasNext()){
var _e1c=_e19.getNext();
var _e1d=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e1c,_e18,_e1d);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e20=this._treeNodeBindings;
var _e21=new Map();
function fix(_e22,list){
if(!_e22.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e20.has(node.getHandle())){
var _e25=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e21.set(node.getHandle(),_e25);
_e22.add(_e25);
}
});
_e22.attachRecursive();
}
}
_e22.open(true);
}
map.each(function(_e26,list){
if(_e20.has(_e26)){
var _e28=_e20.get(_e26);
fix(_e28,list);
}else{
if(_e21.has(_e26)){
var _e29=_e21.get(_e26);
fix(_e29,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e2a,arg){
switch(_e2a){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2c=arg;
if(_e2c!=null){
this._invokeServerRefresh(_e2c);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e2d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e2d;
_e2d.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e2d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e2d;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e2e){
if(_e2e!=null&&_e2e=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e2e)){
var list=this._entityTokenRegistry.get(_e2e).reset();
this._refreshToken=_e2e;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e30=list.getNext();
this._refreshingTreeNodes.set(_e30.key,true);
setTimeout(function(){
_e30.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e31=this.getFocusedTreeNodeBindings().getFirst();
if(_e31){
var _e32=_e31.getLabel();
var _e33=_e31.getAncestorBindingByLocalName("treenode");
if(_e33){
_e31=_e33;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e31.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e34=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e34,[_e32]);
}
_e31.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e35=SystemTreeBinding.clipboard;
if(_e35){
var type=_e35.dragType;
var _e37=this.getFocusedTreeNodeBindings().getFirst();
if(_e37.dragAccept){
if(_e37.acceptor.isAccepting(type)){
this._performPaste(_e37);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e38){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e38.node.hasDetailedDropSupport()){
if(_e38.node.hasChildren()){
var _e3a=_e38.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e3b,_e3c){
if(_e3b==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e3d=_e3c.get("switch");
var _e3e=_e3c.get("sibling");
if(_e3d=="after"){
_e3e++;
}
var _e3f=_e38.accept(SystemTreeBinding.clipboard,_e3e);
if(_e3f){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e3a);
}else{
Application.lock(self);
var _e40=_e38.accept(SystemTreeBinding.clipboard,0);
if(_e40){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e40=_e38.accept(SystemTreeBinding.clipboard,0);
if(_e40){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e41=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e41!=null){
this._focusTreeNodeByEntityToken(_e41);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e42){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e42){
this.blurSelectedTreeNodes();
var _e43=this.getRootTreeNodeBindings();
_e43.each(function(_e44){
if(_e44.isContainer&&_e44.isOpen){
_e44.close();
_e44.hasBeenOpened=false;
_e44.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e45){
if(_e45!=this.isLockedToEditor){
this.isLockedToEditor=_e45;
if(_e45){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e47=this.getRootTreeNodeBindings();
_e47.each(function(_e48){
var _e49=_e48.getOpenSystemNodes();
if(_e49!=null&&_e49.hasEntries()){
list.merge(_e49);
}else{
if(_e48.isOpen){
list.add(_e48.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e4a){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e4a);
if(_e4a!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e4b){
if(_e4b){
var list=new List(_e4b.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e4d=new Map();
var _e4e=this.getFocusedTreeNodeBindings();
var _e4f=_e4e.getFirst().node.getActionProfile();
if(_e4f!=null){
var self=this;
_e4f.each(function(_e51,list){
var _e53=new List();
list.each(function(_e54){
if(_e54.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e54.getGroupName()]){
_e53.add(_e54);
}
}
});
if(_e53.hasEntries()){
_e4d.set(_e51,_e53);
}
});
}
_e4d.activePosition=this._activePosition;
return _e4d;
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
StageBinding.presentViewDefinition=function(_ecd){
if(_ecd.label!=null){
var _ece=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ece,[_ecd.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ecd);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ed0,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ed2=System.getPerspectiveNodes();
if(_ed2.hasEntries()){
this._initializeSystemViewDefinitions(_ed2);
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
var _ed4=null;
if(LocalStore.isEnabled){
_ed4=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ed4&&ViewDefinitions[_ed4]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ed4));
}else{
this._explorerBinding.setSelectionDefault();
}
}else{
this._onStageReady();
}
};
StageBinding.prototype._onStageReady=function(){
if(!this._isStageReady){
if(!Application.hasStartPage||!Application.hasExternalConnection||Client.isPad){
top.app.bindingMap.defaultstartdeck.select();
this._isShowingDefaultStart=true;
}
EventBroadcaster.broadcast(BroadcastMessages.STAGE_INITIALIZED);
this._isStageReady=true;
}
};
StageBinding.prototype._initializeRootActions=function(root){
var _ed6=root.getActionProfile();
if(_ed6&&_ed6.hasEntries()){
var _ed7=top.app.bindingMap.toolsmenugroup;
if(_ed7){
_ed6.each(function(_ed8,list){
list.each(function(_eda){
var item=MenuItemBinding.newInstance(_ed7.bindingDocument);
item.setLabel(_eda.getLabel());
item.setToolTip(_eda.getToolTip());
item.setImage(_eda.getImage());
item.setDisabled(_eda.isDisabled());
item.associatedSystemAction=_eda;
var _edc=_ed7;
var tag=_eda.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_edc=top.app.bindingMap.translationsmenugroup;
break;
}
}
_edc.add(item);
});
});
_ed7.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ede){
while(_ede.hasNext()){
var node=_ede.getNext();
var _ee0=node.getHandle();
ViewDefinitions[_ee0]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ee1){
StageBinding.superclass.handleAction.call(this,_ee1);
var _ee2=_ee1.target;
switch(_ee1.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ee2;
this._inflateBinding(_ee2);
_ee1.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ee2;
this._inflateBinding(_ee2);
_ee1.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ee2);
_ee1.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ee2 instanceof DockBinding){
switch(_ee2.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ee2.reference,_ee2);
break;
}
this.handleAttachedDock(_ee2);
_ee1.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ee2 instanceof DockBinding){
this.handleSelectedDockTab(_ee2.getSelectedTabBinding());
_ee1.consume();
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
_ee1.consume();
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
_ee1.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ee1);
};
StageBinding.prototype.handleBroadcast=function(_ee4,arg){
StageBinding.superclass.handleBroadcast.call(this,_ee4,arg);
switch(_ee4){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ee6=arg;
this._dontView(_ee6);
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
StageBinding.prototype._showStart=function(_ee8){
if(_ee8!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _eeb=this.bindingWindow.bindingMap.maindecks;
if(_ee8){
_eeb.select("startdeck");
view.show();
}else{
view.hide();
_eeb.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ee8;
}
};
StageBinding.prototype._inflateBinding=function(_eec){
for(var _eed in ViewDefinitions){
var _eee=ViewDefinitions[_eed];
if(_eee instanceof SystemViewDefinition){
_eec.mountDefinition(_eee);
}
}
var _eef=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_eef){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ef2=new StageCrawler();
_ef2.mode=mode;
_ef2.crawl(this.bindingElement);
_ef2.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ef3){
var _ef4=_ef3.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ef4);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ef4));
}
};
StageBinding.prototype.handleAttachedDock=function(_ef5){
var _ef6=_ef5.getTabBindings();
if(_ef6.hasEntries()){
while(_ef6.hasNext()){
var _ef7=_ef6.getNext();
var _ef8=_ef7.getHandle();
if(_ef8){
if(_ef8=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ef9=ViewDefinitions[_ef8];
if(_ef9){
this._view(_ef5,_ef7,_ef9,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ef8+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_efa){
var _efb=null;
var _efc=false;
switch(_efa.position){
case Dialog.MODAL:
_efb=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_efb=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_efa.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_efb=this._dockBindings.get(_efa.position);
break;
case DockBinding.EXTERNAL:
window.open(_efa.url);
_efc=true;
break;
default:
var _efd=this._decksBinding.getSelectedDeckBinding();
_efb=_efd.getDockBindingByReference(_efa.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _efe=this.bindingWindow.bindingMap.maindecks;
_efe.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_efc=true;
}
break;
}
if(!_efc){
if(_efb!=null){
this._view(_efb,null,_efa,true);
}else{
throw "StageBinding: Could not position view: "+_efa.handle;
}
}
};
StageBinding.prototype._view=function(_eff,_f00,_f01,_f02){
var _f03=_f01.handle;
if(_f01.isMutable){
_f03+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f03]){
var _f04=ViewBinding.getInstance(_f03);
if(_f04!=null){
_f04.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f03);
}
}else{
this._activeViewDefinitions[_f03]=_f01;
Application.lock(this);
switch(_eff.constructor){
case DockBinding:
if(_f02){
_eff.prepareNewView(_f01);
}else{
_eff.prepareOpenView(_f01,_f00);
}
break;
case StageDialogBinding:
if(_f02){
_eff.prepareNewView(_f01);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f05){
if(this._activeViewDefinitions[_f05]!=null){
delete this._activeViewDefinitions[_f05];
}else{
this.logger.debug("Could not unregister active view: "+_f05);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f06){
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
this.addFilter(function(_f08){
var _f09=UserInterface.getBinding(_f08);
var _f0a=null;
if(_f09){
switch(_f09.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f09.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f09.handleUnMaximization();
break;
}
break;
case DockBinding:
_f0a=NodeCrawler.SKIP_NODE;
break;
}
}
return _f0a;
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
var _f0b=null;
this._dialogs.each(function(_f0c){
if(!_f0c.isVisible){
_f0b=_f0c;
}
return _f0b!=null;
});
if(!_f0b){
this._newInstance();
_f0b=this._dialogs.getLast();
}
_f0b.setModal(false);
return _f0b;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f0d=this.getInstance();
_f0d.setModal(true);
return _f0d;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f0e=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f0e);
_f0e.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f0f){
if(_f0f instanceof DialogViewDefinition){
var _f10=ViewBinding.newInstance(this.bindingDocument);
_f10.setDefinition(_f0f);
_f10.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f0f.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f0f.handler)){
this._dialogResponseHandler=_f0f.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f10;
this._body.add(_f10);
_f10.attach();
_f10.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f11){
StageDialogBinding.superclass.handleAction.call(this,_f11);
var _f12=_f11.target;
switch(_f11.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f12);
_f11.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f12.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f11.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f12.response){
this._handleDialogPageResponse(_f12);
}
_f11.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f11.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f11.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f11.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f11.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f11.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f11.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f11.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f11.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f12==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f13,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f13,arg);
switch(_f13){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f15){
var _f16=new FitnessCrawler();
var list=new List();
if(_f15){
_f16.mode=FitnessCrawler.MODE_BRUTAL;
}
_f16.crawl(this.bindingElement,list);
_f16.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f18){
_f18.fit(_f15);
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
var _f19=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f19){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f1b){
var cmd=_f1b.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f1d){
if(_f1d.bindingDocument==this._viewBinding.getContentDocument()){
if(_f1d instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f1d);
}
this._pageBinding=_f1d;
if(_f1d.height=="auto"){
_f1d.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f1d);
_f1d.enableAutoHeightLayoutMode(false);
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
if(_f1d.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f1d);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f1e){
var _f1f=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f1f){
var _f20=UserInterface.getBinding(_f1f);
_f20.setDisabled(_f1e);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f21){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f21.response,_f21.result!=null?_f21.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f23){
if(_f23.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f23);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f25){
switch(_f25.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f25.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f25.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f26){
var _f27=_f26.label;
var _f28=_f26.image;
var _f29=_f26.width;
var _f2a=_f26.height;
var _f2b=_f26.controls;
var _f2c=_f26.isResizable;
if(_f27){
this.setLabel(_f27);
}
if(_f28){
this.setImage(_f28);
}
if(_f29||_f2a){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f29?_f29:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f2a!=null&&_f2a!="auto")?_f2a:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f2b){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f30=new List(_f2b.split(" "));
while((type=_f30.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f2c!=this._isResizable){
this.setResizable(_f2c);
}
if(_f2a=="auto"){
this._fixAutoHeight(_f26);
}
if(_f26==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f31){
var dim=this.getDimension();
var _f33=0;
var _f34=0;
if(_f31.isDialogSubPage){
_f31=this._pageBinding;
}
if(this._isFirstPage){
_f33=_f31.width!=null?_f31.width:dim.w;
}else{
_f33=dim.w;
}
_f34=_f31.bindingElement.offsetHeight;
_f34+=this._titlebar.bindingElement.offsetHeight;
_f34+=4;
_f34+=4;
if(_f34<dim.h){
_f34=dim.h;
}
if(_f31.minheight!=null){
if(_f34<_f31.minheight){
_f34=_f31.minheight;
}
}
this.setDimension(new Dimension(_f33,_f34));
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
StageDialogBinding.newInstance=function(_f37){
var _f38=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f37);
var _f39=UserInterface.registerBinding(_f38,StageDialogBinding);
_f39.setProperty("controls","minimize maximize close");
return _f39;
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
this.addFilter(function(_f3a,list){
var _f3c=null;
var _f3d=UserInterface.getBinding(_f3a);
if(!_f3d.isVisible){
_f3c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f3c;
});
this.addFilter(function(_f3e,list){
var _f40=null;
var _f41=UserInterface.getBinding(_f3e);
if(_f41.isAttached){
if(Interfaces.isImplemented(IFit,_f41)){
if(!_f41.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f41);
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
StageDecksBinding.prototype.mountDefinition=function(_f42){
var _f43=StageDeckBinding.newInstance(this.bindingDocument);
_f43.handle=_f42.handle;
_f43.perspectiveNode=_f42.node;
this._decks[_f43.handle]=_f43;
this.add(_f43);
_f43.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f44){
var _f45=this._decks[_f44];
StageBinding.perspectiveNode=_f45.perspectiveNode;
this.select(_f45);
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
StageDeckBinding.prototype.handleAction=function(_f46){
StageDeckBinding.superclass.handleAction.call(this,_f46);
var _f47=_f46.target;
switch(_f46.type){
case WindowBinding.ACTION_LOADED:
if(_f47==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f46.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f47 instanceof DockBinding){
this._dockBindings.set(_f47.reference,_f47);
_f47.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f46.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f46.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f46);
StageDeckBinding.superclass.handleAction.call(this,_f46);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f49=new StageCrawler();
_f49.mode=mode;
_f49.crawl(this.windowBinding.getContentDocument().body);
_f49.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f4a){
return this._dockBindings.get(_f4a);
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
StageDeckBinding.newInstance=function(_f4c){
var _f4d=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f4c);
var _f4e=UserInterface.registerBinding(_f4d,StageDeckBinding);
return _f4e;
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
StageSplitBoxBinding.prototype.handleAction=function(_f4f){
StageSplitBoxBinding.superclass.handleAction.call(this,_f4f);
StageBoxAbstraction.handleAction.call(this,_f4f);
var _f50=_f4f.target;
var _f51=null;
var _f52=null;
switch(_f4f.type){
case DockBinding.ACTION_EMPTIED:
_f52=this.getChildBindingByLocalName("splitter");
if(_f52.isVisible){
_f52.hide();
}
_f51=this.getDescendantBindingsByLocalName("dock");
if(_f51.getFirst().isEmpty&&_f51.getLast().isEmpty){
if(_f51.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f4f.consume();
break;
case DockBinding.ACTION_OPENED:
_f51=this.getDescendantBindingsByLocalName("dock");
if(!_f51.getFirst().isEmpty&&!_f51.getLast().isEmpty){
_f52=this.getChildBindingByLocalName("splitter");
if(!_f52.isVisible){
_f52.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f4f.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f50!=this){
_f52=this.getChildBindingByLocalName("splitter");
if(_f52.isVisible){
_f52.hide();
}
this.invokeLayout();
_f4f.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f50!=this){
var _f53=this.getChildBindingsByLocalName("splitpanel");
if(_f53.getFirst().isVisible&&_f53.getLast().isVisible){
_f52=this.getChildBindingByLocalName("splitter");
if(!_f52.isVisible){
_f52.show();
}
}
this.invokeLayout();
_f4f.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f54){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f54);
switch(_f54.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f54.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f55=this.getChildBindingsByLocalName("splitpanel");
return _f55.getFirst().isVisible&&_f55.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f56=this.getChildBindingsByLocalName("splitpanel");
return _f56.getFirst().isFixed&&_f56.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f57){
StageSplitPanelBinding.superclass.handleAction.call(this,_f57);
StageBoxAbstraction.handleAction.call(this,_f57);
switch(_f57.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f57.type==StageSplitBoxBinding.ACTION_HIDE){
_f57.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f57.type==DockBinding.ACTION_EMPTIED){
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
if(_f57.type==StageSplitBoxBinding.ACTION_SHOW){
_f57.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f5a=_f57.target;
if(_f5a!=this&&_f5a.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f5b=_f5a._containingSplitBoxBinding;
if(_f5b.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f5c=_f5b.getChildBindingsByLocalName("splitpanel");
var _f5d=_f5c.getFirst();
var _f5e=_f5c.getLast();
if(this.isFixed==true){
if(!_f5d.isFixed||!_f5e.isFixed||(!_f5b.hasBothPanelsVisible()&&_f5a.isMinimizedForReal)){
this.setFix(false);
_f57.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f5b.hasBothPanelsFixed()||(!_f5b.hasBothPanelsVisible()&&_f5a.isMinimizedForReal)){
this.setFix(_f5a.getContainedDock().getHeight());
_f57.consume();
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
var _f5f=this.getContainedDock();
if(_f5f){
if(this.isMaximizePrepared==true){
}else{
_f5f.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f60=this.getContainedDock();
if(_f60){
if(_f60.type==DockBinding.TYPE_EDITORS){
if(_f60.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f60.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f61=this.getContainedDock();
if(_f61){
_f61.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f61);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f62=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f63=this.getContainedDock();
if(_f63){
_f63.collapse(_f62);
if(!_f62){
this.setFix(_f63.getHeight());
}else{
this.setFix(_f63.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f63&&_f63.isActive){
_f63.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f63);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f64){
var _f65=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f66=this.getContainedDock();
if(_f66){
if(this.isMinimized==true){
_f66.unCollapse(_f65);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f64){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f66){
_f66.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f66);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f67){
var _f68=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f68=false;
}
}
if(_f68==true){
this._invisibilize(_f67);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f6a){
if(_f6a!=this._isInvisibilized){
if(_f6a){
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
StageSplitterBinding.prototype.onDragStart=function(_f6b){
var _f6c=top.app.bindingMap.stagesplittercover;
var _f6d=this._containingSplitBoxBinding.getOrient();
switch(_f6d){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6c.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6c.bindingElement.style.cursor="n-resize";
break;
}
_f6c.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f6d);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f73){
this._orient=_f73;
this.attachClassName(_f73);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f75=true;
var _f76=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f76=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f75=false;
break;
}
if(_f75){
this.bindingElement.style.left=pos.x+"px";
}
if(_f76){
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
StageBoxAbstraction.handleAction=function(_f78){
switch(_f78.type){
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
if(_f78.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f78.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f79=this.bindingElement.style;
_f79.position="absolute";
_f79.width="100%";
_f79.height="100%";
_f79.top="0";
_f79.left="0";
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
var _f7a=this.bindingElement.style;
_f7a.position="relative";
_f7a.width="auto";
_f7a.height="auto";
_f7a.top="auto";
_f7a.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f7b,_f7c){
var _f7d=_f7b.bindingElement.style;
var _f7e=_f7b.bindingElement.parentNode;
var box=_f7b._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f7c){
_f7b._unmodifiedFlexMethod=_f7b.flex;
_f7b.flex=function(){
_f7d.width=_f7e.offsetWidth+"px";
_f7d.height=_f7e.offsetHeight+"px";
};
}else{
_f7d.width="100%";
_f7d.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f7d.width="auto";
_f7d.height="auto";
box.reflex(true);
},0);
}
_f7b.flex=_f7b._unmodifiedFlexMethod;
_f7b._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f80){
var _f81=_f80.target;
switch(_f80.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f81 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f80);
_f80.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f80.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f82){
var mode=null;
switch(_f82.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f84){
StageMenuBarBinding.superclass.handleAction.call(this,_f84);
switch(_f84.type){
case MenuItemBinding.ACTION_COMMAND:
var _f85=_f84.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f85){
SystemAction.invoke(_f85,this._rootNode);
}
}
_f84.consume();
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
var _f86=this.getProperty("handle");
if(_f86){
this._handle=_f86;
if(StageBinding.isViewOpen(_f86)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f86);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f88){
this.setProperty("handle",_f88);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f89,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f89,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f89){
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
StageViewMenuItemBinding.newInstance=function(_f8b){
var _f8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f8b);
UserInterface.registerBinding(_f8c,StageViewMenuItemBinding);
return UserInterface.getBinding(_f8c);
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
StageStatusBarBinding.prototype.setLabel=function(_f8d){
this._label.setLabel(_f8d);
};
StageStatusBarBinding.prototype.setImage=function(_f8e){
this._label.setImage(_f8e);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f8f){
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
var _f90=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f91=_f90.getAssociatedView();
var _f92=_f91.getContentWindow().bindingMap.tree;
var _f93=_f92.getFocusedTreeNodeBindings();
if(!_f93.hasEntries()&&StageBinding.treeSelector){
_f93=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f93;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f94=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f94.each(function(_f95){
LocalStore.focuseNodes.add(_f95.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f96=LocalStore.focuseNodes.getEntityTokens();
var _f97=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f98=_f97.getAssociatedView();
var _f99=_f98.getContentWindow().bindingMap.tree;
_f96=new List(TreeService.GetCurrentLocaleEntityTokens(_f96.toArray()));
_f96.each(function(_f9a){
_f99._focusTreeNodeByEntityToken(_f9a);
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
this._splitterBinding=this.addMember(this.getDescendantBindingByLocalName("explorersplitter"));
this._menuBinding=this.addMember(this.getDescendantBindingByLocalName("explorermenu"));
};
ExplorerBinding.prototype.onBindingInitialize=function(){
ExplorerBinding.bindingInstance=this;
ExplorerBinding.superclass.onBindingInitialize.call(this);
this.dispatchAction(ExplorerBinding.ACTION_INITIALIZED);
};
ExplorerBinding.prototype.handleAction=function(_f9b){
ExplorerBinding.superclass.handleAction.call(this,_f9b);
var _f9c=_f9b.target;
switch(_f9b.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f9b.consume();
break;
case Binding.ACTION_DRAG:
if(_f9c instanceof ExplorerSplitterBinding){
_f9c.dragger.registerHandler(this);
}
_f9b.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f9e){
this._menuBinding.setSelectionByHandle(_f9e);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f9f){
if(_f9f instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f9f);
this._menuBinding.mountDefinition(_f9f);
}
};
ExplorerBinding.prototype.onDragStart=function(_fa0){
var _fa1=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fa1.hasEntries()){
var _fa2=_fa1.getFirst();
this._dragStart=_fa2.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fa2.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa6){
if(_fa6 instanceof SystemViewDefinition){
var _fa7=ViewBinding.newInstance(this.bindingDocument);
_fa7.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa7.setDefinition(_fa6);
var _fa8=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa8.setAssociatedView(_fa7);
this._decks[_fa6.handle]=_fa8;
_fa8.add(_fa7);
this.add(_fa8);
function attach(){
_fa8.attach();
_fa7.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa9){
var _faa=this._decks[_fa9];
this.select(_faa);
};
DecksBinding.prototype.expandBy=function(_fab){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fad=this.bindingElement.offsetHeight+_fab;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fad+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_faf){
var _fb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_faf);
return UserInterface.registerBinding(_fb0,ExplorerDecksBinding);
};
ExplorerDeckBinding.prototype=new DeckBinding;
ExplorerDeckBinding.prototype.constructor=ExplorerDeckBinding;
ExplorerDeckBinding.superclass=DeckBinding.prototype;
ExplorerDeckBinding.NODENAME_DECKS="explorerdecks";
function ExplorerDeckBinding(){
this.logger=SystemLogger.getLogger("ExplorerDeckBinding");
this._entityToken=null;
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fb1){
this._viewBinding=_fb1;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fb2=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fb3=this._viewBinding.getDefinition().label;
StatusBar.busy(_fb2,[_fb3]);
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
};
ExplorerDeckBinding.prototype.handleAction=function(_fb4){
ExplorerDeckBinding.superclass.handleAction.call(this,_fb4);
var _fb5=_fb4.target;
switch(_fb4.type){
case PageBinding.ACTION_INITIALIZED:
if(_fb5 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fb5.node.getEntityToken();
this.removeActionListener(PageBinding.ACTION_INITIALIZED);
this.bindingWindow.bindingMap.explorerdeckscover.hide();
this.dispatchAction(DockTabBinding.ACTION_UPDATE_VISUAL);
Application.unlock(this);
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
break;
}
};
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb6,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb6,arg);
switch(_fb6){
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
var _fb8=null;
if(this._isExplorerDeckBindingInitialized){
_fb8=this._viewBinding.getDefinition().label;
}else{
_fb8=DockTabBinding.LABEL_TABLOADING;
}
return _fb8;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb9=null;
if(this._isExplorerDeckBindingInitialized){
_fb9=this._viewBinding.getDefinition().image;
}else{
_fb9=DockTabBinding.IMG_TABLOADING;
}
return _fb9;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fba=null;
if(this._isExplorerDeckBindingInitialized){
_fba=this._viewBinding.getDefinition().toolTip;
}
return _fba;
};
ExplorerDeckBinding.newInstance=function(_fbb){
var _fbc=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fbb);
return UserInterface.registerBinding(_fbc,ExplorerDeckBinding);
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
this._maxButtons=new Map();
this._maxList=new List();
this._minButtons=new Map();
this._minList=new List();
this._index=-1;
this._maxGroup=null;
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
this.addMember(this.getChildBindingByLocalName("toolbar"));
};
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fbd){
switch(_fbd.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fbd.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fbd.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fbd);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fbe){
this._maxButtons.set(_fbe.handle,this._mountMaxButton(_fbe));
this._minButtons.set(_fbe.handle,this._mountMinButton(_fbe));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fbf){
var _fc0=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fc0.setLabel(_fbf.label);
_fc0.setToolTip(_fbf.toolTip);
_fc0.handle=_fbf.handle;
_fc0.node=_fbf.node;
this._maxGroup.add(_fc0);
this._maxList.add(_fc0);
_fc0.attach();
if(Client.isPad){
_fc0.hide();
}
return _fc0;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fc1){
var _fc2=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fc2.setLabel(_fc1.label);
_fc2.setToolTip(_fc1.label);
_fc2.handle=_fc1.handle;
_fc2.node=_fc1.node;
this._minGroup.addFirst(_fc2);
this._minList.add(_fc2);
_fc2.attach();
if(!Client.isPad){
_fc2.hide();
}
return _fc2;
};
ExplorerMenuBinding.prototype.handleAction=function(_fc3){
ExplorerMenuBinding.superclass.handleAction.call(this,_fc3);
switch(_fc3.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fc4=_fc3.target;
var _fc5=_fc4.getCheckedButtonBinding();
var _fc6=_fc5.handle;
switch(_fc4){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fc6),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fc6),true);
break;
}
this._selectedHandle=_fc6;
this._selectedTag=_fc5.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fc3.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc7){
var _fc8=this._maxButtons.get(_fc7);
if(_fc8){
_fc8.check();
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
if(this._maxList.hasEntries()){
this._maxList.getFirst().check();
}
};
ExplorerMenuBinding.prototype.showMore=function(){
var _fc9=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fc9=true;
}
return _fc9;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fcb=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fcb=true;
}
return _fcb;
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
ExplorerToolBarBinding.newInstance=function(_fcc){
var _fcd=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fcc);
return UserInterface.registerBinding(_fcd,ExplorerToolBarBinding);
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
var _fce=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fcf=_fce?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fcf);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fd0,_fd1){
var _fd2=(_fd1==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fd3=DOMUtil.createElementNS(Constants.NS_UI,_fd2,_fd0);
var _fd4=UserInterface.registerBinding(_fd3,ExplorerToolBarButtonBinding);
_fd4.explorerToolBarButtonType=_fd1;
return _fd4;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd5,_fd6,type){
type=type?type:"";
var _fd8=FunctionService.GetCustomEditorSettingsByMarkup(_fd5);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fd8){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fd8.Width?(_fd8.Width>dim.w?dim.w:_fd8.Width):undefined;
def.height=_fd8.Height?(_fd8.Height>dim.h?dim.h:_fd8.Height):undefined;
if(_fd8.Url){
_fd8.Url=_fd8.Url.indexOf("?")>-1?_fd8.Url+"&consoleId="+Application.CONSOLE_ID:_fd8.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd6;
def.argument={url:_fd8?_fd8.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd5}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fdb,_fdc){
var _fdd=EditorBinding._components;
var _fde=EditorBinding._editors;
var key=_fdc.key;
var _fe0=Interfaces.isImplemented(IWysiwygEditorComponent,_fdb);
if(!_fe0){
_fe0=Interfaces.isImplemented(ISourceEditorComponent,_fdb);
}
if(_fe0){
if(_fde.has(key)){
_fde.get(key).initializeEditorComponent(_fdb);
}else{
if(!_fdd.has(key)){
_fdd.set(key,new List());
}
_fdd.get(key).add(_fdb);
}
}else{
throw "Editor component interface not implemented: "+_fdb;
}
};
EditorBinding.claimComponents=function(_fe1,_fe2){
var _fe3=EditorBinding._components;
var _fe4=EditorBinding._editors;
var key=_fe2.key;
_fe4.set(key,_fe1);
var list=null;
if(_fe3.has(key)){
list=_fe3.get(key).copy();
_fe3.del(key);
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
var _fe8=this.getProperty("value");
if(_fe8!=null){
_fe8=decodeURIComponent(_fe8);
this._startContent=_fe8;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fea=this.bindingWindow.DataManager;
_fea.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fec){
var _fed=EditorBinding.claimComponents(this,_fec);
if(_fed!=null){
while(_fed.hasNext()){
this.initializeEditorComponent(_fed.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fef=this.bindingWindow.DataManager;
if(_fef.getDataBinding(name)){
_fef.unRegisterDataBinding(name);
}
_fef.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ff0=this.getEditorDocument();
if(_ff0!=null){
Application.framework(_ff0);
DOMEvents.addEventListener(_ff0,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ff0,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ff0,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_ff0,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_ff2){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_ff2==true){
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
var _ff4=this.getCheckSum();
if(_ff4!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ff4;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff5=null;
if(Binding.exists(this._pageBinding)){
_ff5=this._pageBinding.getCheckSum(this._checksum);
}
return _ff5;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff7=DOMEvents.getTarget(e);
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
if(_ff7.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ff9,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff9,arg);
var _ffb=null;
switch(_ff9){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ffc=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ffc=false;
}
}
}else{
_ffb=DOMEvents.getTarget(arg);
if(_ffb&&_ffb.ownerDocument==this.getEditorDocument()){
_ffc=false;
}
}
if(_ffc){
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
EditorBinding.prototype._activateEditor=function(_ffd){
if(_ffd!=this._isActivated){
this._isActivated=_ffd;
EditorBinding.isActive=_ffd;
var _ffe=this.getEditorWindow().standardEventHandler;
var _fff=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fff!=null){
if(_ffd){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fff.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ffe.enableNativeKeys(true);
}else{
_fff.disable();
_ffe.disableNativeKeys();
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
var _1001=false;
try{
var _1002=this.getEditorWindow().getSelection();
if(_1002!=null){
_1001=_1002.toString().length>0;
if(!_1001){
var range=_1002.getRangeAt(0);
var frag=range.cloneContents();
var _1005=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1005.appendChild(frag.firstChild);
}
var img=_1005.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1001=true;
}
}
}
}
}
catch(exception){
}
return _1001;
};
EditorBinding.prototype.isCommandEnabled=function(_1007){
var _1008=true;
switch(_1007){
case "Cut":
case "Copy":
case "Paste":
_1008=this.getEditorDocument().queryCommandEnabled(_1007);
break;
}
return _1008;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _100c=false;
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
_100c=true;
}
break;
}
return _100c;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _100f=this.getContentWindow().bindingMap.toolbar;
var _1010=_100f.getButtonForCommand(cmd);
if(!_1010){
throw "No button for command "+cmd;
}
return _1010;
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
EditorBinding.prototype.handleAction=function(_1014){
EditorBinding.superclass.handleAction.call(this,_1014);
var _1015=_1014.target;
var self=this;
var _1017=this.shadowTree.iframe;
switch(_1014.type){
case Binding.ACTION_DIRTY:
if(_1014.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1018){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1018);
};
EditorBinding.prototype.handleElement=function(_1019){
return true;
};
EditorBinding.prototype.updateElement=function(_101a){
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
var _101d=this._menuGroups[rel];
if(_101d instanceof List){
_101d.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1020=this._menuGroups[rel];
if(_1020 instanceof List){
_1020.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1022){
EditorPopupBinding.superclass.handleAction.call(this,_1022);
var _1023=_1022.target;
if(_1022.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1023.getProperty("cmd");
var gui=_1023.getProperty("gui");
var val=_1023.getProperty("val");
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
var _1027=this.bindingWindow.bindingMap.tinywindow;
var _1028=this.bindingWindow.bindingMap.codepresswindow;
if(_1027){
EditorBinding.registerComponent(this,_1027);
}else{
if(_1028){
EditorBinding.registerComponent(this,_1028);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1029,_102a,_102b,theme){
this._editorBinding=_1029;
this._tinyEngine=_102a;
this._tinyInstance=_102b;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_102d,frame,_102f){
this._editorBinding=_102d;
this._codePressFrame=frame;
this._codePressEngine=_102f;
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
var _1032=this._editorBinding;
if(_1032!=null){
var self=this;
var _1034={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1032.hasBookmark()){
_1032.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1032.hasBookmark()){
_1032.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1034);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1034);
}
};
EditorClickButtonBinding.newInstance=function(_1036){
var _1037=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1036);
return UserInterface.registerBinding(_1037,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1038){
var _1039=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1038);
return UserInterface.registerBinding(_1039,EditorToolBarButtonBinding);
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
var _103a=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_103a);
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
EditorSelectorBinding.prototype.initializeComponent=function(_103b,_103c,_103d,theme){
this._editorBinding=_103b;
this._tinyEngine=_103c;
this._tinyInstance=_103d;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_103f){
EditorSelectorBinding.superclass.handleAction.call(this,_103f);
switch(_103f.type){
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
EditorMenuItemBinding.newInstance=function(_1043){
var _1044=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1043);
return UserInterface.registerBinding(_1044,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1045){
var i=0,_1047,_1048=[],split=_1045.split(" ");
while((_1047=split[i++])!=null){
if(_1047.length>=3&&_1047.substring(0,3)=="mce"){
continue;
}else{
if(_1047.length>=14&&_1047.substring(0,14)=="compositemedia"){
continue;
}
}
_1048.push(_1047);
}
return _1048.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_104a){
var _104b=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_104a);
if(soap instanceof SOAPFault){
}else{
_104b=soap.XhtmlFragment;
if(!_104b){
_104b="";
}
}
WebServiceProxy.isFaultHandler=true;
return _104b;
};
VisualEditorBinding.getTinyContent=function(_104d,_104e){
var _104f=null;
if(_104d==null||!_104d.replace(/\s*/gm,"").length){
_104d=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_104e.getSoapTinyContent(_104d);
if(soap instanceof SOAPFault){
var _1051=soap;
var _1052={handleDialogResponse:function(){
_104e.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1052,_1051);
}else{
_104f=soap.XhtmlFragment;
if(_104f==null){
_104f=new String("");
}
_104f=_104f.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _104f;
};
VisualEditorBinding.isImage=function(_1053){
return _1053&&_1053.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1054){
return VisualEditorBinding.isImage(_1054)&&!VisualEditorBinding.isReservedElement(_1054);
};
VisualEditorBinding.isReservedElement=function(_1055){
if(VisualEditorBinding.isFunctionElement(_1055)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1055)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1055)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1056){
return VisualEditorBinding.isImage(_1056)&&CSSUtil.hasClassName(_1056,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1057){
return VisualEditorBinding.isImage(_1057)&&CSSUtil.hasClassName(_1057,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1058){
return VisualEditorBinding.isImage(_1058)&&CSSUtil.hasClassName(_1058,VisualEditorBinding.HTML_CLASSNAME);
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
var _1059=this.getProperty("embedablefieldstypenames");
if(_1059!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1059);
}
var _105a=this.getProperty("formattingconfiguration");
if(_105a!=null){
this._url+="?config="+_105a;
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
VisualEditorBinding.prototype.handleBroadcast=function(_105b,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_105b,arg);
var _105d=this.getContentWindow().bindingMap.tinywindow;
var _105e=_105d.getContentWindow();
switch(_105b){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_105e){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_105d);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_105f){
_105f.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1060=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1060.replace(/\s*/gm,"").length==0){
_1060=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1060,{format:"raw"});
this.updateBodyWidth();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1061){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1061);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1063=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1063=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1063=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1063;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1066){
var _1067=_1066;
if(!this._isNormalizedDocument(_1066)){
_1067=this._getHtmlMarkup().replace("${body}",_1066);
}
return _1067;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1068){
var _1069=false;
var doc=XMLParser.parse(_1068,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1069=true;
}
}
if(Client.isWebKit){
if(_1068.indexOf("<html")!==0){
_1069=false;
}
}
return _1069;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _106e=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_106e){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_106e=true;
}
return _106e;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1070=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1070);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1072){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1072,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1074){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1074,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1077=CSSComputer.getPadding(body);
var _1078=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1078.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_107b){
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
VisualEditorPopupBinding.prototype.configure=function(_107c,_107d,_107e){
var _107f=this.editorBinding.hasSelection();
this.tinyInstance=_107c;
this.tinyEngine=_107d;
this.tinyElement=_107e;
this.hasSelection=_107f;
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
var _1083=false;
if(this.hasSelection){
_1083=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1083=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1083=true;
}
}
}
}
if(_1083){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1084=this.getMenuItemForCommand("compositeInsertLink");
var _1085=this.getMenuItemForCommand("unlink");
var _1086=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1087=this.editorBinding.getButtonForCommand("unlink");
_1085.setDisabled(_1087.isDisabled);
if(_1085.isDisabled){
_1084.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1084.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1088=this.editorBinding.embedableFieldConfiguration;
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
if(_1088){
var _108b=_1088.getGroupNames();
if(_108b.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_108b.each(function(_108f){
var _1090=_1088.getFieldNames(_108f);
_1090.each(function(_1091){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1091);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_108f+":"+_1091);
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
var _1093=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1094=null;
var _1095=null;
if(_1093){
if(_1093.nodeName=="TD"){
_1094=_1093.getAttribute("colspan");
_1095=_1093.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1094=="1"&&_1095=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1093){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1096){
var _1097=VisualEditorFormattingConfiguration._configurations;
if(!_1097.has(_1096)){
_1097.set(_1096,new VisualEditorFormattingConfiguration());
}
return _1097.get(_1096);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1099){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_109a){
var _109b=null;
var _109c=VisualEditorFieldGroupConfiguration._configurations;
if(!_109c.has(_109a)){
_109c.set(_109a,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_109a)));
}
return _109c.get(_109a);
};
function VisualEditorFieldGroupConfiguration(_109d){
var _109e=new Map();
new List(_109d).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_109e.set(group.GroupName,map);
});
this._groups=_109e;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10a2){
return this._groups.get(_10a2).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10a3,_10a4){
return this._groups.get(_10a3).get(_10a4).xhtml;
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
var _10a6=this.getDescendantElementsByLocalName("textarea");
while(_10a6.hasNext()){
var _10a7=_10a6.getNext();
if(_10a7.getAttribute("selected")=="true"){
this._startContent=_10a7.value;
this._textareaname=_10a7.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _10a9=this.getContentWindow().bindingMap.templatetree;
_10a9.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10aa){
var _10ab=_10a9.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10ab.textareaname);
_10aa.consume();
}});
_10a9.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10ac){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10ad=this.getContentWindow().bindingMap.toolsplitter;
_10ad.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10ae=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10ae.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10ae);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10af){
this._textareas=new Map();
while(_10af.hasNext()){
var _10b0=_10af.getNext();
var _10b1=_10b0.getAttribute("placeholderid");
this._textareas.set(_10b1,{placeholderid:_10b1,placeholdername:_10b0.getAttribute("placeholdername"),placeholdermarkup:_10b0.value,textareaelement:_10b0,isSelected:_10b0.getAttribute("selected")=="true"});
}
var _10b2=new Map();
this._textareas.each(function(name,_10b4){
var _10b5=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b5.setLabel(_10b4.placeholdername);
_10b5.setImage("${icon:placeholder}");
_10b5.setProperty("placeholder",true);
_10b5.textareaname=name;
_10b2.set(_10b4.placeholdername,_10b5);
if(_10b4.isSelected){
selected=_10b5;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b6=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b6.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b7=this.getContentWindow().bindingMap.templatetree;
var _10b8=_10b7.add(TreeNodeBinding.newInstance(_10b7.bindingDocument));
_10b8.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10b8.setImage("${icon:warning}");
_10b8.attach();
var _10b9=this.getContentWindow().bindingMap.statusbar;
_10b9.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10bb=this._textareas.get(name);
var _10bc=_10bb.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10bc));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10bd){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10bd;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10be=this.getContentWindow().bindingMap.statusbar;
_10be.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10bd);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10c1=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10c1;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10c2=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10c2=this._xhtmls.get(this._textareaname);
if(_10c2==null){
_10c2=VisualEditorBinding.XHTML;
}
}
return _10c2;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10c4){
_10c4.textareaelement.value=_10c4.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c5,_10c6,_10c7){
var _10c8=_10c5.getElementsByTagName("div").item(0);
var _10c9=_10c6.getElementsByTagName("div").item(0);
var _10ca=new List(_10c8.getElementsByTagName("textarea"));
var _10cb=new List(_10c9.getElementsByTagName("textarea"));
if(_10ca.getLength()!=_10cb.getLength()){
_10c7=true;
}else{
var index=0;
_10ca.each(function(_10cd,index){
var _10cf=_10cb.get(index);
var newid=_10cd.getAttribute("placeholderid");
var oldid=_10cf.getAttribute("placeholderid");
var _10d2=_10cd.getAttribute("placeholdername");
var _10d3=_10cf.getAttribute("placeholdername");
if(newid!=oldid||_10d2!=_10d3){
_10c7=true;
}
return !_10c7;
});
}
if(_10c7){
var html=null;
if(_10c8.innerHTML!=null){
html=_10c8.innerHTML;
}else{
html=DOMSerializer.serialize(_10c8);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d6){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d6);
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
var _10d9=this.getDescendantBindingByLocalName("selector");
_10d9.attach();
this._populateTemplateSelector();
var _10da=this.getContentWindow().bindingMap.templateselector;
_10da.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10db=this.getDescendantBindingByLocalName("selector");
var _10dc=this.getContentWindow().bindingMap.templateselector;
_10db.selections.each(function(_10dd){
_10dd.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10dc.populateFromList(_10db.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10de=this.getDescendantBindingByLocalName("selector");
var _10df=this.getContentWindow().bindingMap.templateselector;
_10de.selectByValue(_10df.getValue());
_10de.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10e0){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e5,_10e6){
var _10e7=_10e6;
if(old.has(_10e5)){
_10e7=old.get(_10e5).placeholdermarkup;
}
return _10e7;
}
while(_10e0.hasNext()){
var _10e8=_10e0.getNext();
var _10e9=_10e8.getAttribute("placeholderid");
this._textareas.set(_10e9,{placeholderid:_10e9,placeholdername:_10e8.getAttribute("placeholdername"),placeholdermarkup:compute(_10e9,_10e8.value),textareaelement:_10e8,isSelected:_10e8.getAttribute("selected")=="true"});
}
var _10ea=null;
var _10eb=this.getContentWindow().bindingMap.templatetree;
var _10ec=new Map();
this._textareas.each(function(name,_10ee){
var _10ef=_10eb.add(TreeNodeBinding.newInstance(_10eb.bindingDocument));
_10ef.setLabel(_10ee.placeholdername);
_10ef.setImage("${icon:placeholder}");
_10ef.setProperty("placeholder",true);
_10ef.textareaname=name;
_10ec.set(_10ee.placeholdername,_10ef);
if(_10ee.isSelected){
_10ea=_10ef;
}
});
_10eb.attachRecursive();
if(_10ea!=null){
var _10f0=true;
if(this._oldtextareas.hasEntries()){
_10f0=false;
var map=new Map();
this._textareas.each(function(id,_10f3){
map.set(_10f3.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10f0=true;
}
}
if(_10f0){
var _10f4=this._textareas.get(_10ea.textareaname);
this._textareaname=_10ea.textareaname;
this._placeholdername=_10f4.placeholdername;
this._setContentFromPlaceHolder(_10ea.textareaname);
_10ea.focus();
}else{
var _10f5=_10ec.get(this._placeholdername);
this._textareaname=_10f5.textareaname;
_10f5.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10f7,_10f8){
var _10f9=_10f7.getElementsByTagName("selector").item(0);
var _10fa=_10f8.getElementsByTagName("selector").item(0);
var _10fb=false;
if(_10f9!=null&&_10fa!=null){
var _10fc=new List(_10f9.getElementsByTagName("selection"));
var _10fd=new List(_10fa.getElementsByTagName("selection"));
if(_10fc.getLength()!=_10fd.getLength()){
_10fb=true;
}else{
_10fc.each(function(_10fe,index){
var _1100=_10fe.getAttribute("value");
var _1101=_10fd.get(index).getAttribute("value");
if(_1100!=_1101){
_10fb=true;
}
return !_10fb;
});
}
}
if(_10fb){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f9);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
var _1103=false;
if(_10f9!=null&&_10fa!=null){
var _10fc=new List(_10f9.getElementsByTagName("selection"));
var _10fd=new List(_10fa.getElementsByTagName("selection"));
if(_10fc.getLength()!=_10fd.getLength()){
_1103=true;
}else{
_10fc.each(function(_1104,index){
var _1106=_1104.getAttribute("selected");
var _1107=_10fd.get(index).getAttribute("selected");
if(_1106!=_1107){
_1103=true;
}
return !_1103;
});
}
}
if(_1103){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10f7,_10f8,_1103);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_1108){
var _1109=null;
if(_1108==undefined){
_1108=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_110b){
if(_110b.PlaceholderId==_1108){
_1109=_110b.ClientRectangle.Width;
return false;
}
});
}
return _1109;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _110d=this._pageId;
var _110e=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
var _1110=PageTemplateService.GetTemplatePreviewInformation(_110d,_110e);
self._templatePreview=_1110;
self.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1111){
var _1112=this._pageId;
var _1113=this._textareaname;
var _1114=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1111,_1112,_1114,_1113,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1116){
var _1117=this._pageId;
var _1118=this._textareaname;
var _1119=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1116,_1117,_1119,_1118,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_111b,frame,_111d){
this._editorBinding=_111b;
this._codePressFrame=frame;
this._codePressEngine=_111d;
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
var _1123=this.getProperty("validate");
if(_1123==true){
this._hasStrictValidation=true;
}
var _1124=this.getProperty("strictsave");
if(_1124===false){
this._strictSave=false;
}
var _1125=this.getProperty("validator");
if(_1125!=null){
this._validator=_1125;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1126,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1126,arg);
switch(_1126){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1128=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1128!=null){
var _1129=_1128.getContentWindow();
if(arg.broadcastWindow==_1129){
this._codemirrorWindow=_1129;
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
this.initializeEditorComponents(_1128);
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
this.unsubscribe(_1126);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_112d){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_112d);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_112e){
if(_112e!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_112e;
EditorBinding.isActive=_112e;
var _112f=this._codemirrorWindow.standardEventHandler;
if(_112e){
_112f.enableNativeKeys(true);
}else{
_112f.disableNativeKeys();
}
var _1130=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1130!=null){
if(_112e){
_1130.enable();
}else{
_1130.disable();
}
}
if(_112e){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1134=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1134;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1135){
_1135.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_1137){
if(!this._isFinalized){
if(_1137!=this._startContent){
this._startContent=_1137;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1137);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1138=this.getContentWindow().bindingMap.editorpage.getContent();
return _1138?_1138:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1139){
if(this._pageBinding!=null){
this._pageBinding.cover(_1139);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_113a){
if(_113a!=null&&this.shadowTree.dotnetinput!=null){
var value=_113a.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _113c=true;
var _113d=this.getContent();
if(this._validator!=null){
_113c=Validator.validateInformed(_113d,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _113e=_113d.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_113e!=_113d){
_113d=_113e;
this.setContent(_113e);
}
_113c=XMLParser.isWellFormedDocument(_113d,true,!this._strictSave);
if(_113c==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_113c=this._isValidHTML(_113d);
break;
}
}
break;
}
}
return _113c;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1140=true;
var doc=XMLParser.parse(xml);
var _1142=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1142.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1142.add("NamespaceURI");
}
var head=null,body=null;
var _1146=new List(root.childNodes);
while(_1146.hasNext()){
var child=_1146.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1142.add("MultipleHead");
}
if(body!=null){
_1142.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1142.add("MultipleBody");
}
body=child;
break;
default:
_1142.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1142.add("MissingHead");
}
if(body==null){
_1142.add("MissingBody");
}
}
if(_1142.hasEntries()){
_1140=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1142.getFirst()));
}
return _1140;
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
var _1148=null;
var page=this._pageBinding;
if(page!=null){
_1148=page.getCheckSum();
}
return _1148;
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
ThrobberBinding.prototype.handleBroadcast=function(_114a,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_114a,arg);
switch(_114a){
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
ProgressBarBinding.notch=function(_114d){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_114d);
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
ProgressBarBinding.prototype.notch=function(_114f){
_114f=_114f?_114f:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_114f);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1151,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1151,arg);
switch(_1151){
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
StartMenuItemBinding.prototype.setChecked=function(_1153,_1154){
StartMenuItemBinding.superclass.setChecked.call(this,_1153,_1154);
if(!_1154){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1155){
var _1156=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1155);
UserInterface.registerBinding(_1156,StartMenuItemBinding);
return UserInterface.getBinding(_1156);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1159,_115a){
var _115b=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_115a,true)==true){
if(_1159!="*"){
_1159=KeySetBinding._sanitizeKeyModifiers(_1159);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_115b[doc]){
_115b[doc]={};
}
if(!_115b[doc][code]){
_115b[doc][code]={};
}
_115b[doc][code][_1159]=_115a;
}
};
KeySetBinding.handleKey=function(doc,e){
var _115f=false;
var code=e.keyCode;
var _1161=KeySetBinding.keyEventHandlers;
if(_1161[doc]&&_1161[doc][code]){
var _1162="[default]";
_1162+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1162+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1162+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1162+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1163=_1161[doc][code][_1162];
if(_1163==null){
_1163=_1161[doc][code]["*"];
}
if(_1163!=null){
_1163.handleKeyEvent(e);
_115f=true;
}
}
return _115f;
};
KeySetBinding._sanitizeKeyModifiers=function(_1164){
var _1165="[default]";
var mods={};
if(_1164){
new List(_1164.split(" ")).each(function(_1167){
mods[_1167]=true;
});
function check(_1168){
if(mods[_1168]){
_1165+=" "+_1168;
}
}
check("shift");
check("control");
}
return _1165;
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
var _116c=key.getAttribute("oncommand");
var _116d=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_116d){
DOMEvents.preventDefault(e);
}
var _116f=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_116c,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1170){
if(_1170 instanceof CursorBinding){
_1170.setOpacity(0);
_1170.show();
new Animation({modifier:9,onstep:function(_1171){
_1170.setOpacity(Math.sin(_1171*Math.PI/180));
},onstop:function(){
_1170.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1172){
if(_1172 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1173){
_1172.setOpacity(Math.cos(_1173*Math.PI/180));
},onstop:function(){
_1172.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1174,_1175,_1176){
if(_1174 instanceof CursorBinding){
_1176.x-=16;
_1176.y-=16;
new Animation({modifier:3,onstep:function(_1177){
var tal=Math.sin(_1177*Math.PI/180);
_1174.setPosition(new Point(((1-tal)*_1175.x)+((0+tal)*_1176.x),((1-tal)*_1175.y)+((0+tal)*_1176.y)));
},onstop:function(){
CursorBinding.fadeOut(_1174);
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
CursorBinding.prototype.setOpacity=function(_117d){
this.bindingElement.style.opacity=new String(_117d);
this._opacity=_117d;
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
function setOpacity(_1180){
cover.bindingElement.style.opacity=new String(_1180);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1181){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1181*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1183){
cover.bindingElement.style.MozOpacity=new String(_1183);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1184){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1184*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1186){
if(_1186!=this._isBusy){
if(_1186){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1186;
}
};
CoverBinding.prototype.setTransparent=function(_1187){
if(_1187!=this._isTransparent){
if(_1187){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1187;
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
CoverBinding.prototype.setHeight=function(_1189){
if(_1189>=0){
this.bindingElement.style.height=new String(_1189+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_118a){
var _118b=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_118a);
return UserInterface.registerBinding(_118b,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _118d=UncoverBinding._bindingInstance;
if(Binding.exists(_118d)){
_118d.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1191){
this._isFading=_1191==true;
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
var _1192=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1192.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1192.clearRect(0,0,300,150);
_1192.fillRect(0,0,300,150);
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
var _1194=this._canvas.getContext("2d");
_1194.clearRect(0,0,300,150);
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
var _1195=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1195);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1196=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1196){
this._startcontent=_1196.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1197){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1197);
switch(_1197.type){
case WindowBinding.ACTION_ONLOAD:
if(_1197.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1197.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1197);
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
var _119b=this._transformer.transformToString(doc);
this._inject(_119b);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_119e){
this.getContentDocument().body.innerHTML=_119e;
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
var _11a6=list.getNext();
var id=_11a6.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11a6);
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
var _11b0=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11b0.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11b0.appendChild(att);
}
elm.appendChild(_11b0);
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
var _11ba=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ba){
doc=XMLParser.parse(_11ba);
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
var _11be=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11be;
};
LocalizationSelectorBinding.prototype=new SelectorBinding;
LocalizationSelectorBinding.prototype.constructor=LocalizationSelectorBinding;
LocalizationSelectorBinding.superclass=SelectorBinding.prototype;
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
};
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11bf,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11bf,arg);
switch(_11bf){
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
LocalizationSelectorBinding.prototype._populateFromLanguages=function(list){
if(list!=null&&list.hasEntries()&&list.getLength()>1){
var _11c2=new List();
list.each(function(lang){
_11c2.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11c2);
this.show();
}else{
this.hide();
}
};
LocalizationSelectorBinding.prototype.populateFromList=function(list){
LocalizationSelectorBinding.superclass.populateFromList.call(this,list);
this._backupSelectionValue=this._selectionValue;
};
LocalizationSelectorBinding.prototype.onValueChange=function(){
ExplorerBinding.saveFocusedNodes();
var self=this;
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11c6){
switch(_11c6){
case Dialog.RESPONSE_ACCEPT:
if(Application.hasDirtyDockTabs()){
self.subscribe(BroadcastMessages.SAVE_ALL_DONE);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL);
}else{
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
self._invokeAction();
}
self._backupSelectionValue=self.getValue();
break;
case Dialog.RESPONSE_CANCEL:
self.selectByValue(self._backupSelectionValue);
break;
}
}});
};
LocalizationSelectorBinding.prototype._invokeAction=function(){
var token=this.getValue();
var root=SystemNode.taggedNodes.get("Root");
var _11c9=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11c9,root);
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
var _11ca=this.getProperty("status");
if(_11ca!=null){
switch(_11ca){
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
UserInterfaceMapping.prototype.merge=function(_11ce){
for(var _11cf in _11ce.map){
this.map[_11cf]=_11ce.getBindingImplementation(_11cf);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11d0){
var _11d1=null;
var name=_11d0.nodeName.toLowerCase();
if(this.map[name]){
_11d1=this.map[name];
}
return _11d1;
};
var UserInterface=new function(){
var _11d3=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11d4=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11d3,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11d5=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11d7,impl){
var _11d9=null;
if(!this.hasBinding(_11d7)){
var _11da=DOMUtil.getParentWindow(_11d7);
if(DOMUtil.getLocalName(_11d7)!="bindingmapping"){
if(!impl&&_11d7.getAttribute("binding")!=null){
var _11db=_11d7.getAttribute("binding");
impl=_11da[_11db];
if(impl==null){
throw "No such binding in scope: "+_11db;
}
}
if(!impl){
var _11dc=_11da.DocumentManager;
if(_11dc){
var _11dd=_11dc.customUserInterfaceMapping;
if(_11dd){
impl=_11dd.getBindingImplementation(_11d7);
}
}
}
if(!impl){
impl=_11d4.getBindingImplementation(_11d7);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11d9=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11d9){
var key=KeyMaster.getUniqueKey();
_11d7.setAttribute("key",key);
_11d9.key=key;
if(!_11d7.id){
_11d7.id=key;
}
keys[key]={element:_11d7,binding:_11d9};
_11d9.onBindingRegister();
}
}
}
return _11d9;
};
this.unRegisterBinding=function(_11df){
terminate(_11df);
};
function terminate(_11e0){
if(Binding.exists(_11e0)==true){
var key=_11e0.key;
Binding.destroy(_11e0);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11e0=null;
}else{
_11d5.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11e2){
var _11e3=null;
if(keys[_11e2.key]){
_11e3=keys[_11e2.key].element;
}
return _11e3;
};
this.getBinding=function(_11e4){
var _11e5=null;
if(_11e4&&_11e4.nodeType==Node.ELEMENT_NODE){
try{
var key=_11e4.getAttribute("key");
if(key&&keys[key]){
_11e5=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11e4);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11e5;
};
this.getBindingByKey=function(key){
var _11e8=null;
if(keys[key]){
_11e8=keys[key].binding;
}
return _11e8;
};
this.hasBinding=function(_11e9){
return this.getBinding(_11e9)!=null;
};
this.isBindingVisible=function(_11ea){
var _11eb=Application.isOperational;
if(_11eb==true){
var _11ec=new Crawler();
_11ec.type=NodeCrawler.TYPE_ASCENDING;
_11ec.id="visibilitycrawler";
_11ec.addFilter(function(_11ed){
var b=UserInterface.getBinding(_11ed);
var res=0;
if(!b.isVisible){
_11eb=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11ec.crawl(_11ea.bindingElement);
_11ec.dispose();
}
return _11eb;
};
var _11f0=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11f0={};
for(var key in keys){
_11f0[key]=true;
}
};
this.getPoint=function(){
var _11f4=null;
if(_11f0){
_11f4=new List();
for(var key in keys){
if(!_11f0[key]){
_11f4.add(key);
}
}
}
return _11f4;
};
this.clearPoint=function(){
_11f0=null;
};
this.trackUndisposedBindings=function(){
var _11f6=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11f6){
_11f6="Bindings illdisposed: ";
}
_11f6+=entry.binding+" ";
}
}
if(_11f6!=null){
_11d5.error(_11f6);
}
};
this.autoTrackDisposedBindings=function(_11f9){
if(_11f9){
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
SOAPRequest.newInstance=function(_11fa,_11fb){
var _11fc=_11fa+"/"+_11fb;
var _11fd=new SOAPRequest(_11fc);
var _11fe=SOAPRequest.resolver;
_11fd.document=Templates.getTemplateDocument("soapenvelope.xml");
_11fd.envelope=_11fe.resolve("soap:Envelope",_11fd.document);
_11fd.header=_11fe.resolve("soap:Header",_11fd.envelope);
_11fd.body=_11fe.resolve("soap:Body",_11fd.envelope);
return _11fd;
};
SOAPRequest._parseResponse=function(_11ff){
var _1200=null;
var _1201=false;
var doc=_11ff.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1200=SOAPRequestResponse.newInstance(_11ff.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11ff.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1201=true;
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
var text=_11ff.responseText;
if(_11ff.status==503||text.indexOf("id=\"offline\"")>-1){
_1201=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11ff.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11ff.responseText);
}
}
}
}
if(_1201==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1200;
};
function SOAPRequest(_1206){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1206;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1208=DOMUtil.getXMLHTTPRequest();
var _1209=null;
_1208.open("post",url,false);
_1208.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1208.setRequestHeader("SOAPAction",this.action);
try{
_1208.send(this.document);
_1209=SOAPRequest._parseResponse(_1208);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1208=null;
return _1209;
};
SOAPRequest.prototype.asyncInvoke=function(url,_120c){
var _120d=DOMUtil.getXMLHTTPRequest();
_120d.open("post",url,true);
_120d.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_120d.setRequestHeader("SOAPAction",this.action);
_120d.onreadystatechange=function(){
if(_120d.readyState==4){
var _120e=SOAPRequest._parseResponse(_120d);
_120c(_120e);
_120d=null;
}
};
_120d.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _120f in this){
this[_120f]=null;
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
var _1211=null;
if(doc&&doc.documentElement){
_1211=new SOAPRequestResponse();
var _1212=SOAPRequestResponse.resolver;
_1211.document=doc;
_1211.envelope=_1212.resolve("soap:Envelope",_1211.document);
_1211.header=_1212.resolve("soap:Header",_1211.envelope);
_1211.body=_1212.resolve("soap:Body",_1211.envelope);
var fault=_1212.resolve("soap:Fault",_1211.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1211.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1212.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1212.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1211;
};
function SOAPFault(_1214,_1215,_1216){
this._operationName=_1214;
this._operationAddress=_1215;
this._faultString=_1216;
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
SOAPFault.newInstance=function(_1217,fault){
return new SOAPFault(_1217.name,_1217.address,fault.faultString);
};
function SOAPEncoder(wsdl,_121a){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_121a;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _121c=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_121c.body,this._operation);
var _121e=this._wsdl.getSchema();
var _121f=_121e.lookup(this._operation);
var _1220=_121f.getListedDefinitions();
while(_1220.hasNext()){
var def=_1220.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _121c;
};
SOAPEncoder.prototype._resolve=function(_1224,_1225,value){
var _1227=this._wsdl.getSchema();
if(_1225.isSimpleValue){
this._appendText(_1224,value,_1225.type=="string");
}else{
var _1228=_1227.lookup(_1225.type);
if(_1228 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1228.getListedDefinitions();
if(_1228.isArray){
var _122a=new List(value);
var def=defs.getNext();
while(_122a.hasNext()){
var elm=this._appendElement(_1224,def.name);
var val=_122a.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1224,def.name);
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
SOAPEncoder.prototype._appendText=function(_1231,value,_1233){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1236=false;
var i=0,c;
while(c=chars[i++]){
var _1239=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1239=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1239=false;
}
break;
}
if(!_1239){
safe+=c;
}else{
_1236=true;
}
}
if(_1236){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1231.appendChild(_1231.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_123c){
this._wsdl=wsdl;
this._operation=_123c;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1241){
var _1242=null;
var _1243=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1245=this.resolve(id,_1241.body);
var _1246=_1243.lookup(id);
var _1247=_1246.getListedDefinitions();
while(!_1242&&_1247.hasNext()){
var def=_1247.getNext();
var elm=this.resolve(def.name,_1245);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1242=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1242.appendChild(_1242.importNode(e,true));
}else{
_1242=this._compute(elm,def);
}
}
return _1242;
};
SOAPDecoder.prototype._compute=function(_124b,_124c){
var _124d=null;
var _124e=this._wsdl.getSchema();
if(_124c.isSimpleValue){
_124d=this._getSimpleValue(_124b,_124c.type);
}else{
var _124f=_124e.lookup(_124c.type);
if(_124f instanceof SchemaSimpleType){
_124d=this._getSimpleValue(_124b,_124f.restrictionType);
}else{
var defs=_124f.getListedDefinitions();
if(_124f.isArray){
_124d=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_124b);
while(elms.hasNext()){
var elm=elms.getNext();
_124d.push(this._compute(elm,def));
}
}else{
if(_124b==null){
_124d=null;
}else{
_124d={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_124b);
if(elm){
_124d[def.name]=this._compute(elm,def);
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
return _124d;
};
SOAPDecoder.prototype._getSimpleValue=function(_1254,type){
var _1256=null;
if(_1254!=null&&_1254.firstChild&&_1254.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1254.childNodes.length>1){
_1254.normalize();
}
_1256=_1254.firstChild.data;
switch(type){
case Schema.types.STRING:
_1256=_1256;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1256=Number(_1256);
break;
case Schema.types.BOOLEAN:
_1256=_1256=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1256;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1257){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1257);
}
Schema.prototype._parseSchema=function(_1258){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1259={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1258);
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
_1259[rule.getAttribute("name")]=entry;
}
return _1259;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_125e){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_125e);
}
SchemaDefinition.prototype._parse=function(_125f){
var min=_125f.getAttribute("minOccurs");
var max=_125f.getAttribute("maxOccurs");
var type=_125f.getAttribute("type");
this.name=_125f.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1265=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1265;
}else{
var elm=_125f.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1267,_1268){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1267,_1268);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1269,_126a){
var els=_1269.resolveAll("s:complexType/s:sequence/s:element",_126a);
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
function SchemaComplexType(_126c,_126d){
this._definitions=new List();
this._parseListedDefinitions(_126c,_126d);
this.isArray=_126d.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_126e,_126f){
var els=_126e.resolveAll("s:sequence/s:element",_126f);
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
function SchemaSimpleType(_1272,_1273){
this.restrictionType=null;
this._parse(_1272,_1273);
}
SchemaSimpleType.prototype._parse=function(_1274,_1275){
var _1276=_1274.resolve("s:restriction",_1275);
if(_1276){
this.restrictionType=_1276.getAttribute("base").split(":")[1];
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
var _1279=null;
var _127a=DOMUtil.getXMLHTTPRequest();
_127a.open("get",url,false);
_127a.send(null);
if(_127a.responseXML){
_1279=_127a.responseXML.documentElement;
}else{
alert(_127a.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1279;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _127b=new List();
var _127c=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_127c.hasEntries()){
while(_127c.hasNext()){
var _127d=_127c.getNext();
var name=_127d.getAttribute("name");
_127b.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _127b;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1280,_1281,_1282){
this.name=name;
this.address=_1280;
this.encoder=_1281;
this.decoder=_1282;
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
var _1286=wsdl.getOperations();
_1286.each(function(_1287){
proxy[_1287.name]=WebServiceProxy.createProxyOperation(_1287);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1288,_1289){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1289){
var log=_1289 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1288.address+": "+_1288.name+"\n\n";
log+=DOMSerializer.serialize(_1289.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_128b){
return function(){
var _128c=new List(arguments);
var _128d=null;
if(typeof (_128c.getLast())=="function"){
var _128e=_128c.extractLast();
var _128f=_128b.encoder.encode(_128c);
this._log(_128b,_128f);
var self=this;
var _1291=_128f.asyncInvoke(_128b.address,function(_1292){
self._log(_128b,_1292);
if(_1292){
if(_1292.fault){
_128d=SOAPFault.newInstance(_128b,_1292.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_128d,_128f,_1292);
}
}else{
if(WebServiceProxy.isDOMResult){
_128d=_1292.document;
}else{
_128d=_128b.decoder.decode(_1292);
}
}
}
_128f.dispose();
_128e(_128d);
});
}else{
var _128f=_128b.encoder.encode(new List(arguments));
this._log(_128b,_128f);
var _1291=_128f.invoke(_128b.address);
this._log(_128b,_1291);
if(_1291){
if(_1291.fault){
_128d=SOAPFault.newInstance(_128b,_1291.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_128d,_128f,_1291);
}
}else{
if(WebServiceProxy.isDOMResult){
_128d=_1291.document;
}else{
_128d=_128b.decoder.decode(_1291);
}
}
}
_128f.dispose();
return _128d;
}
};
};
WebServiceProxy.handleFault=function(_1293,_1294,_1295){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1293,soapRequest:_1294,soapResponse:_1295});
}
catch(exception){
alert(_1293.getFaultString());
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
var _1296=SystemLogger.getLogger("MessageQueue");
var _1297=null;
var _1298=0;
var _1299=null;
var _129a=new Map();
var _129b=new Map();
var _129c=false;
var _129d=false;
var _129e=false;
var _129f=false;
var _12a0={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1297=ConsoleMessageQueueService;
_1298=_1297.GetCurrentSequenceNumber("dummyparam!");
this.index=_1298;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_129c){
if(!MessageQueue._actions.hasEntries()){
var _12a1=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_129d=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_12a1;
_129d=false;
}
}
}
};
this._pokeserver=function(){
if(_129c==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_12a2){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_129d);
this._updateMessages(_12a2);
}
};
this._updateMessages=function(_12a3){
if(_129e){
_129f=true;
}else{
_129e=true;
var self=this;
var _12a5=function(_12a6){
if(_12a6!=null){
if(Types.isDefined(_12a6.CurrentSequenceNumber)){
var _12a7=_12a6.CurrentSequenceNumber;
if(_12a7<self.index){
_1296.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_12a7);
}
self.index=_12a7;
var _12a8=new List(_12a6.ConsoleActions);
if(_12a8.hasEntries()){
self.evaluate(_12a8);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1296.error("No sequencenumber in MessageQueue response!");
}
}
_129e=false;
if(_129f){
_129f=false;
self._updateMessages();
}
};
if(_12a3){
_12a5(_1297.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_1297.GetMessages(Application.CONSOLE_ID,this.index,_12a5);
}
}
};
this.evaluate=function(_12a9){
var _12aa=new List();
if(_12a9.hasEntries()){
_12a9.each(function(_12ab){
if(this._index[_12ab.Id]!=true){
_12aa.add(_12ab);
}
this._index[_12ab.Id]=true;
},this);
if(_12aa.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_12aa);
}else{
this._actions=_12aa;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12ac){
var _12ad="(No reason)";
if(_12ac!=null){
_12ad=_12ac.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12ad);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12b1){
if(_12b1==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12b2=null;
if(this._actions.hasEntries()){
var _12b3=this._actions.extractFirst();
_1298=_12b3.SequenceNumber;
_1296.debug("MessageQueue action: "+_12b3.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1298+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12b3.ActionType){
case "OpenView":
_12b2=_12b3.OpenViewParams;
if(_12b2.ViewType=="ModalDialog"){
openDialogView(_12b2);
}else{
_1299=_12b2.ViewId;
openView(_12b2);
}
break;
case "CloseView":
_12b2=_12b3.CloseViewParams;
_1299=_12b2.ViewId;
closeView(_12b2);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12b3.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_129a.countEntries()+"\n";
_129a.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1296.debug(debug);
if(!_129a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b3.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12b3.MessageBoxParams);
break;
case "OpenViewDefinition":
_12b2=_12b3.OpenViewDefinitionParams;
_1299=_12b2.Handle;
openViewDefinition(_12b2);
break;
case "LogEntry":
logEntry(_12b3.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12b2=_12b3.BroadcastMessageParams;
_1296.debug("Server says: EventBroadcaster.broadcast ( \""+_12b2.Name+"\", "+_12b2.Value+" )");
EventBroadcaster.broadcast(_12b2.Name,_12b2.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_129a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12b3.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12b3.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12b3.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12b2=_12b3.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12b2.ViewId,entityToken:_12b2.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12b2=_12b3.OpenGenericViewParams;
openGenericView(_12b2);
break;
case "OpenExternalView":
_12b2=_12b3.OpenExternalViewParams;
openExternalView(_12b2);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12b3.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_129d);
}
function logEntry(_12b6){
var _12b7=_12b6.Level.toLowerCase();
SystemLogger.getLogger(_12b6.SenderId)[_12b7](_12b6.Message);
}
function openView(_12b8){
var list=paramsToList(_12b8.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12b8.ViewId);
def.entityToken=_12b8.EntityToken;
def.flowHandle=_12b8.FlowHandle;
def.position=_12a0[_12b8.ViewType],def.label=_12b8.Label;
def.image=_12b8.Image;
def.toolTip=_12b8.ToolTip;
def.argument={"url":_12b8.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12b8.ViewId,entityToken:_12b8.EntityToken,flowHandle:_12b8.FlowHandle,position:_12a0[_12b8.ViewType],url:_12b8.Url,label:_12b8.Label,image:_12b8.Image,toolTip:_12b8.ToolTip}));
}
}
function openDialogView(_12bb){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12bb.ViewId,flowHandle:_12bb.FlowHandle,position:Dialog.MODAL,url:_12bb.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12bc){
var _12bd=_12bc.DialogType.toLowerCase();
if(_12bd=="question"){
throw "Not supported!";
}else{
Dialog[_12bd](_12bc.Title,_12bc.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12be){
var map={};
var _12c0=false;
new List(_12be.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12c0=true;
});
var proto=ViewDefinitions[_12be.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12be.ViewId;
}
def.argument=_12c0?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12c5){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12c5.ViewId);
def.label=_12c5.Label;
def.toolTip=_12c5.ToolTip;
def.image=_12c5.Image;
def.argument={"url":_12c5.Url,"list":paramsToList(_12c5.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12c7){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12c7.ViewId);
def.label=_12c7.Label;
def.toolTip=_12c7.ToolTip;
def.image=_12c7.Image;
def.url=_12c7.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12c9){
if(StageBinding.isViewOpen(_12c9.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12c9.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12ca){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12ca.ViewId,isSuccess:_12ca.Succeeded});
}
this._lockSystem=function(_12cb){
var _12cc=top.bindingMap.offlinetheatre;
if(_12cb){
_12cc.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12cc.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_129c=_12cb;
};
this.handleBroadcast=function(_12ce,arg){
switch(_12ce){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1299!=null&&arg==_1299){
_1299=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_129a.set(arg,true);
}else{
_1296.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_129a.hasEntries()){
_129a.del(arg);
_1296.debug("Refreshed tree: "+arg+"\n("+_129a.countEntries()+" trees left!)");
if(!_129a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_129b.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_129b.hasEntries()==true){
_129b.del(arg);
if(!_129b.hasEntries()){
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
function paramsToList(_12d0){
var list=new List();
new List(_12d0).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12d3=false;
var _12d4=null;
var _12d5=false;
var _12d6=Client.qualifies();
var _12d7="admin";
var _12d8="123456";
if(!_12d6){
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
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);
setTimeout(function(){
Persistance.initialize();
},0);
};
this.handleBroadcast=function(_12d9){
switch(_12d9){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12d9);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12da=window.bindingMap.appwindow;
_12da.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
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
function fileEventBroadcasterSubscriptions(_12db){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12dc){
if(_12db){
EventBroadcaster.subscribe(_12dc,KickStart);
}else{
EventBroadcaster.unsubscribe(_12dc,KickStart);
}
});
}
function kickStart(_12dd){
switch(_12dd){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12d3=true;
break;
}
if(_12d3){
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
DataManager.getDataBinding("username").setValue(_12d7);
DataManager.getDataBinding("password").setValue(_12d8);
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
this.doLogin=function(_12e0,_12e1){
var _12e2=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12e3=false;
var _12e4=LoginService.ValidateAndLogin(_12e0,_12e1);
if(_12e4 instanceof SOAPFault){
alert(_12e4.getFaultString());
}else{
_12e3=_12e4;
}
if(_12e3){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_12e2){
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
function accesssDenied(){
var _12e5=DataManager.getDataBinding("username");
var _12e6=DataManager.getDataBinding("password");
_12e5.blur();
_12e6.blur();
_12e5.setValue("");
_12e6.setValue("");
_12e5.clean();
_12e6.clean();
_12e5.focus();
document.getElementById("loginerror").style.display="block";
var _12e7={handleAction:function(_12e8){
document.getElementById("loginerror").style.display="none";
_12e8.target.removeActionListener(Binding.ACTION_DIRTY,_12e7);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12e7);
}
WindowManager.fireOnLoad(this);
if(!_12d6){
UpdateManager.isEnabled=false;
}
};

