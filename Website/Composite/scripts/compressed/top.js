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
_Localization.prototype={languages:null,source:null,target:null,isUIRtl:false,isRtl:false,handleBroadcast:function(_109,arg){
switch(_109){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
this.isUIRtl=LocalizationService.GetUITextDirection(true)=="rtl";
this.isRtl=LocalizationService.GetTextDirection(true)=="rtl";
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
var _1ae={x:e.clientX,y:e.clientY};
if(_1ac){
var _1af=this.getParentWindow(_1ad).frameElement;
if(_1af){
var add=this.getUniversalPosition(_1af);
_1ae.x+=add.x;
_1ae.y+=add.y;
}
}
return _1ae;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1b2){
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
if(!_1b2){
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
if(!_1b2){
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
},isWellFormedDocument:function(xml,_1b5,_1b6){
var _1b7=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b9=SourceValidationService.IsWellFormedDocument(xml);
if(_1b9!="True"){
_1b7=false;
if(_1b5==true){
if(_1b6){
if(confirm("Not well-formed\n"+_1b9+"\nContinue?")){
_1b7=true;
}
}else{
this._illFormedDialog(_1b9);
}
}
}
return _1b7;
},isWellFormedFragment:function(xml,_1bb){
var _1bc=true;
var _1bd=SourceValidationService.IsWellFormedFragment(xml);
if(_1bd!="True"){
_1bc=false;
if(_1bb==true){
this._illFormedDialog(_1bd);
}
}
return _1bc;
},_illFormedDialog:function(_1be){
setTimeout(function(){
Dialog.error("Not well-formed",_1be);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1bf){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1c0){
return _1bf[_1c0];
}};
}else{
this._nsResolver=_1bf;
}
};
XPathResolver.prototype.resolve=function(_1c1,node,_1c3){
var _1c4=null;
try{
if(this._evaluator){
_1c4=this._evaluateDOMXpath(_1c1,node,_1c3?true:false);
}else{
_1c4=this._evaluateMSXpath(_1c1,node,_1c3?true:false);
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
return _1c4;
};
XPathResolver.prototype.resolveAll=function(_1c5,node){
return this.resolve(_1c5,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c7,node,_1c9){
var _1ca=null;
if(node){
var _1ca=this._evaluator.evaluate(_1c7,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c9){
var list=new List();
while((node=_1ca.iterateNext())!=null){
list.add(node);
}
_1ca=list;
}else{
_1ca=_1ca.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1ca;
};
XPathResolver.prototype._evaluateMSXpath=function(_1cd,node,_1cf){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1d1="";
for(var _1d2 in this._nsResolver){
_1d1+="xmlns:"+_1d2+"=\""+this._nsResolver[_1d2]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1d1);
if(_1cf){
var list=new List();
var i=0,_1d5=node.selectNodes(_1cd);
while(i<_1d5.length){
list.add(_1d5.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1cd);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d7=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d7);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d7;
}
};
XSLTransformer.prototype._import=function(url){
var _1d9=null;
if(Client.hasXSLTProcessor){
var _1da=DOMUtil.getXMLHTTPRequest();
_1da.open("get",Resolver.resolve(url),false);
_1da.send(null);
_1d9=_1da.responseXML;
}else{
var _1d9=DOMUtil.getDOMDocument(true);
_1d9.async=false;
_1d9.load(url);
}
return _1d9;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1dc=null;
if(Client.hasXSLTProcessor){
_1dc=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1dc;
};
XSLTransformer.prototype.transformToString=function(dom,_1de){
var _1df=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1df=DOMSerializer.serialize(doc,_1de);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1df=proc.output;
}
return _1df;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1e2){
var _1e3=_1e2.style?_1e2.className:_1e2.getAttribute("class");
_1e3=_1e3?_1e3:"";
return _1e3;
},_contains:function(_1e4,sub){
return _1e4.indexOf(sub)>-1;
},_attach:function(_1e6,sub){
return _1e6+(_1e6==""?"":" ")+sub;
},_detach:function(_1e8,sub){
if(this._contains(_1e8," "+sub)){
sub=" "+sub;
}
return _1e8.replace(sub,"");
},attachClassName:function(_1ea,_1eb){
if(_1ea.classList!=null){
if(!_1ea.classList.contains(_1eb)){
_1ea.classList.add(_1eb);
}
}else{
var _1ec=this._getCurrent(_1ea);
if(!this._contains(_1ec,_1eb)){
_1ec=this._attach(_1ec,_1eb);
}
if(_1ea.style!=null){
_1ea.className=_1ec;
}else{
_1ea.setAttribute("class",_1ec);
}
}
},detachClassName:function(_1ed,_1ee){
if(_1ed.classList!=null){
if(_1ed.classList.contains(_1ee)){
_1ed.classList.remove(_1ee);
}
}else{
var _1ef=this._getCurrent(_1ed);
if(this._contains(_1ef,_1ee)){
_1ef=this._detach(_1ef,_1ee);
}
if(_1ed.style!=null){
_1ed.className=_1ef;
}else{
if(_1ef==""){
_1ed.removeAttribute("class");
}else{
_1ed.setAttribute("class",_1ef);
}
}
}
},hasClassName:function(_1f0,_1f1){
var _1f2=false;
if(_1f0.classList!=null){
_1f2=_1f0.classList.contains(_1f1);
}else{
_1f2=this._contains(this._getCurrent(_1f0),_1f1);
}
return _1f2;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f3,_1f4){
var _1f5={};
for(var _1f6 in _1f3){
var ent=parseInt(DOMUtil.getComputedStyle(_1f4,_1f3[_1f6]));
_1f5[_1f6]=isNaN(ent)?0:ent;
}
return _1f5;
},_getMargin:function(_1f8){
return this._getComplexResult(this._margins,_1f8);
},getPadding:function(_1f9){
return this._getComplexResult(this._paddings,_1f9);
},getBorder:function(_1fa){
return this._getComplexResult(this._borders,_1fa);
},getPosition:function(_1fb){
return DOMUtil.getComputedStyle(_1fb,"position");
},getFloat:function(_1fc){
return DOMUtil.getComputedStyle(_1fc,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1fd){
return parseInt(DOMUtil.getComputedStyle(_1fd,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1fe){
return DOMUtil.getComputedStyle(_1fe,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1ff=SystemLogger.getLogger("System");
var root=null;
var _201=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_202){
if(_201==null){
_201={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_203){
_201[_203.Key]=_203.Value;
});
}
return _201[_202];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _204=new List();
var _205=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_205);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_207){
_204.add(new SystemNode(_207));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _204;
};
this.getChildNodes=function(node,_209){
var _20a=new List();
var _20b=null;
if(_209){
if(SearchTokens.hasToken(_209)){
_209=SearchTokens.getToken(_209);
}
_20b=TreeService.GetElementsBySearchToken(node.getData(),_209);
}else{
_20b=TreeService.GetElements(node.getData());
}
new List(_20b).each(function(_20c){
var _20d=new SystemNode(_20c);
if(_209){
_20d.searchToken=_209;
}
_20a.add(_20d);
});
return _20a;
};
this.getDescendantBranch=function(_20e){
var map=new Map();
var arg=[];
_20e.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _212=TreeService.GetMultipleChildren(arg);
var _213=new List(_212);
while(_213.hasNext()){
this._listNodesInMap(_213.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_214,_215,_216){
var map=new Map();
var arg=[];
_216.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _21a=TreeService.FindEntityToken(_214,_215,arg);
if(_21a instanceof SOAPFault){
_1ff.error(_21a.getFaultString());
if(Application.isDeveloperMode){
alert(_21a.getFaultString());
}
map=null;
}else{
var _21b=new List(_21a);
while(_21b.hasNext()){
this._listNodesInMap(_21b.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_21c,map){
var list=new List();
var key=_21c.ElementKey;
var _220=new List(_21c.ClientElements);
map.set(key,list);
while(_220.hasNext()){
var _221=_220.getNext();
list.add(new SystemNode(_221));
}
};
this.getChildNodesBySearchToken=function(node,_223){
return this.getChildNodes(node,_223);
};
this.getNamedRoots=function(key,_225){
var _226=new List();
var _227=null;
if(_225){
if(SearchTokens.hasToken(_225)){
_225=SearchTokens.getToken(_225);
}
_227=TreeService.GetNamedRootsBySearchToken(key,_225);
}else{
_227=TreeService.GetNamedRoots(key);
}
new List(_227).each(function(_228){
var node=new SystemNode(_228);
if(_225){
node.searchToken=_225;
}
_226.add(node);
});
return _226;
};
this.getNamedRootsBySearchToken=function(key,_22b){
return this.getNamedRoots(key,_22b);
};
function compileActionList(node,_22d,_22e){
var _22f=_22d.ClientElementActionGroupId;
if(_22f!=null){
var _230=_22e.get(_22f).ClientElementActionGroupItems;
if(_230&&_230.length>0){
node.setActionList(new List(_230));
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
new List(self._data.Actions).each(function(_236){
var _237=_236.ActionCategory.Name;
if(SystemAction.hasCategory(_237)){
var _238=new SystemAction(_236);
SystemAction.actionMap.set(_236.ActionKey,_238);
}else{
throw "No such action category: "+_237;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _239=null;
if(this.searchToken){
_239=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_239=System.getChildNodes(this);
}
return _239;
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
var _23b=this._data.Piggybag;
if(_23b==null){
_23b="";
}
return _23b;
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
var _23d=null;
if(typeof this._data.ToolTip!="undefined"){
_23d=this._data.ToolTip;
}
return _23d;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_23f){
map[_23f.Key]=_23f.Value;
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
var _243=SystemAction.actionMap.get(key);
var _244=true;
if(_243.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_244=false;
}
}
if(_244){
var id=_243.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_243);
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
SystemAction.invoke=function(_247,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_247.logger.debug("Execute \""+_247.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_247.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_24a,_24b){
action=SystemAction.taggedActions.get(_24a);
node=SystemNode.taggedNodes.get(_24b);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_24c){
return SystemAction.categories[_24c]?true:false;
};
function SystemAction(_24d){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_24d;
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
var _24e=null;
if(this.isInFolder()){
_24e=this._data.ActionCategory.FolderName;
}
return _24e;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _24f=null;
if(typeof this._data.TagValue!="undefined"){
_24f=this._data.TagValue;
}
return _24f;
};
SystemAction.prototype.isChecked=function(){
var _250=null;
if(this.isCheckBox()){
_250=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _250;
};
function _UpdateManager(){
var _251=null;
if(!window.UpdateManager){
this._construct();
_251=this;
}
return _251;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_252){
var root=document.documentElement;
var _254=root.namespaceURI;
if(_254==null){
_254=new String(root.getAttribute("xmlns"));
}
if(_254=="http://www.w3.org/1999/xhtml"){
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
var _255=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_255);
}else{
throw new TypeError();
}
}else{
var _256=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_256.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _258=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_258=true;
}
},this);
return _258;
},_setupForm:function(form){
var _25b=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_25b.isEnabled){
_25b._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_25c,type){
if(_25c.addEventListener!=null){
_25c.addEventListener(type,this,false);
}else{
var _25e=this;
_25c.attachEvent("on"+type,function(){
_25e.handleEvent(window.event);
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
var _263=UpdateAssistant.getUpdateZones(dom);
var _264=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_263.forEach(function(_265,_266){
var _267=_264[_266];
this._crawl(_265,_267);
},this);
this._updates.forEach(function(_268,_269){
_268.update();
_268.dispose();
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
},_crawl:function(_26b,_26c,_26d,id){
var _26f=true;
var _270=_26c.getAttribute("class");
if(_270==null||_270.indexOf(this.CLASSNAME_GONE)==-1){
if(_26c.nodeType==Node.ELEMENT_NODE){
var _271=_26c.getAttribute("id");
if(_271!=null){
_26d=_26b;
id=_271;
}
}
if(_26f=this._check(_26b,_26c,_26d,id)){
var _272=_26b.firstChild;
var _273=_26c.firstChild;
while(_272!=null&&_273!=null&&!this._replaced[id]){
switch(_272.nodeType){
case Node.TEXT_NODE:
_26f=this._check(_272,_273,_26d,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_26f=this._crawl(_272,_273,_26d,id);
break;
}
if(this._replaced[id]){
_26f=false;
}else{
_272=_272.nextSibling;
_273=_273.nextSibling;
}
}
}
}
return _26f;
},_check:function(_274,_275,_276,id){
var _278=true;
var _279=null;
var _27a=false;
var _27b=false;
if((_274!=null&&_275==null)||(_274==null&&_275!=null)){
_278=false;
}else{
if(_278=_274.nodeType==_275.nodeType){
switch(_275.nodeType){
case Node.ELEMENT_NODE:
if(_274.namespaceURI!=_275.namespaceURI||_274.nodeName!=_275.nodeName){
_278=false;
}else{
if(_278=(_274.nodeName==_275.nodeName)){
var _27c=_275.getAttribute("id");
var _27d=_274.getAttribute("id");
if(_27c!=null&&_27d!=null){
if(_27c!=_27d){
_278=false;
}else{
if((_279=this._getPlugin(_274,_275))!=null){
if(_279.updateElement(_274,_275)){
_27b=true;
_278=false;
}
}
}
}
if(_278){
if(_278=this._checkAttributes(_274,_275)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_274)&&this._hasSoftChildren(_275)){
if(this._validateSoftChildren(_274,_275)){
this._updateSoftChildren(_274,_275);
_27a=true;
}
_278=false;
}else{
_278=_274.childNodes.length==_275.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_274.data.trim()!=_275.data.trim()){
_278=false;
}
break;
}
}
}
if(_278==false&&!_27a&&!_27b){
if(id!=null&&_276!=null){
this.addUpdate(new ReplaceUpdate(id,_276));
}
}
return _278;
},_checkAttributes:function(_27e,_27f){
var _280=true;
var _281=false;
var _282=_27e.attributes;
var _283=_27f.attributes;
if(_282.length!=_283.length){
_281=true;
}else{
_281=!Array.every(_282,function(att1,i){
var att2=_283.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_281){
var _287=_27e.getAttribute("id");
var _288=_27f.getAttribute("id");
if(this.hasSoftAttributes&&_287!=null&&_287==_288){
this.addUpdate(new AttributesUpdate(_288,_27e,_27f));
}else{
_280=false;
}
}
return _280;
},_hasSoftChildren:function(_289){
var _28a=true;
if(_289.hasChildNodes()){
_28a=Array.every(_289.childNodes,function(node){
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
return _28a;
},_validateSoftChildren:function(_28d,_28e){
var _28f=true;
var _290=-1;
var _291=-1;
var _292=-1;
var news=this._toMap(_28d.childNodes,true);
var olds=this._toMap(_28e.childNodes,true);
for(var id in olds){
if(_28f){
var _296=olds[id];
_28f=_296>=_290;
if(news[id]!=null){
_292=news[id];
_28f=_292>=_291;
}
}
_290=_296;
if(_292>-1){
_291=_292;
}
}
return _28f;
},_updateSoftChildren:function(_297,_298){
var news=this._toMap(_297.childNodes);
var olds=this._toMap(_298.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _29c=null;
for(id in news){
if(olds[id]==null){
var _29d=news[id];
if(_29c==null){
var _29e=_298.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29e,_29d,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29c,_29d,false));
}
}
_29c=id;
}
},addUpdate:function(_29f){
this._updates.push(_29f);
if(_29f instanceof ReplaceUpdate){
this._replaced[_29f.id]=true;
}
},_getPlugin:function(_2a0,_2a1){
var _2a2=null;
this.plugins.every(function(_2a3){
if(_2a3.handleElement(_2a0,_2a1)){
_2a2=_2a3;
}
return _2a2==null;
});
return _2a2;
},_toMap:function(_2a4,_2a5){
var _2a6={};
Array.forEach(_2a4,function(node,_2a8){
if(node.nodeType==Node.ELEMENT_NODE){
_2a6[node.getAttribute("id")]=_2a5?_2a8:node;
}
});
return _2a6;
},_getPost:function(form){
var _2aa=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2ac){
if(_2ac.name==null||_2ac.name==""){
return;
}
var name=_2ac.name;
var _2ae=encodeURIComponent(_2ac.value);
switch(_2ac.type){
case "button":
case "submit":
var _2af=UpdateAssistant.getActiveElement();
if(_2ac==_2af&&name!=""){
_2aa+=name+"="+_2ae+"&";
}
break;
case "radio":
if(_2ac.checked){
_2aa+=name+"="+_2ae+"&";
}
break;
case "checkbox":
if(_2ac.checked){
if(_2ac.name==last){
if(_2aa.lastIndexOf("&")==_2aa.length-1){
_2aa=_2aa.substr(0,_2aa.length-1);
}
_2aa+=","+_2ae;
}else{
_2aa+=name+"="+_2ac.value;
}
last=name;
_2aa+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2aa+=name+"="+_2ae+"&";
break;
}
});
}
return _2aa.substr(0,_2aa.length-1);
},_postRequest:function(form){
var _2b1=form.method!=""?form.method:"get";
var _2b2=form.action!=""?form.action:window.location.toString();
var _2b3=this._getPost(form);
if(_2b1=="get"){
if(_2b2.indexOf("?")>-1){
_2b2=_2b2+"&"+_2b3;
}else{
_2b2+"?"+_2b3;
}
}
var _2b4=this;
var _2b5=UpdateAssistant.getXMLHttpRequest(_2b1,_2b2,this);
if(_2b1=="post"){
_2b5.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b5.send(_2b1=="post"?_2b3:null);
},_fixdotnet:function(dom,id){
var _2b8=document.getElementById(id);
if(_2b8!=null){
var _2b9=UpdateAssistant.getElementById(dom,id);
if(_2b9!=null){
var _2ba=_2b9.getAttribute("value");
if(_2ba!==_2b8.value){
_2b8.value=_2ba;
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
},report:function(_2bd){
this.summary+=_2bd+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2be=null;
if(!window.UpdateAssistant){
this._construct();
_2be=this;
}
return _2be;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2bf,fun){
var _2c1=true;
var len=_2bf.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c3=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bf[i]!="undefined"){
if(!fun.call(_2c3,_2bf[i],i,_2bf)){
_2c1=false;
break;
}
}
}
}
return _2c1;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c6=arguments[1];
return Array.every(this,fun,_2c6);
};
}
if(!Array.forEach){
Array.forEach=function(_2c7,fun){
var len=_2c7.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ca=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c7[i]!="undefined"){
fun.call(_2ca,_2c7[i],i,_2c7);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2cd=arguments[1];
Array.forEach(this,fun,_2cd);
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
},getXMLHttpRequest:function(_2cf,_2d0,_2d1){
var _2d2=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2d2!=null){
_2d2.open(_2cf,_2d0,(_2d1!=null?true:false));
if(_2d1!=null){
function action(){
if(_2d2.readyState==4){
var _2d3=_2d2.getResponseHeader("X-Error-Type");
if(_2d3){
var _2d4="";
for(var i=0;i<10;i++){
var _2d6=i?i:"";
var _2d3=_2d2.getResponseHeader("X-Error-Type"+_2d6);
if(!_2d3){
break;
}
var _2d7=_2d2.getResponseHeader("X-Error-Message"+_2d6);
_2d4+=_2d3+"\n"+_2d7+"\n";
}
Dialog.error("Error",_2d4);
}else{
var text=_2d2.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d1.handleResponse(dom);
}
}
}
}
if(_2d2.addEventListener!=null){
_2d2.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2d2.onreadystatechange=action;
}
}
}
return _2d2;
},dispatchEvent:function(_2da,name){
var _2dc=true;
var _2dd=document.createEvent("UIEvents");
_2dd.initEvent(name,true,true);
_2dc=_2da.dispatchEvent(_2dd);
return _2dc;
},getUpdateZones:function(dom){
var _2df="//*[@id and contains(@class,'updatezone')]";
var _2e0=[];
var _2e1=null;
var _2e2=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e1=dom.evaluate(_2df,dom,null,type,null);
while((_2e2=_2e1.iterateNext())!=null){
_2e0.push(_2e2);
}
}else{
_2e1=dom.documentElement.selectNodes(_2df);
Array.forEach(_2e1,function(_2e4){
_2e0.push(_2e4);
});
}
return _2e0;
},getElementById:function(dom,id){
var _2e7="//*[@id='"+id+"']";
var _2e8=null;
var _2e9=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e8=dom.evaluate(_2e7,dom,null,type,null);
_2e9=_2e8.singleNodeValue;
}else{
_2e9=dom.documentElement.selectNodes(_2e7)[0];
}
return _2e9;
},_getIds:function(dom){
var _2ec="//*[@id]";
var _2ed=null;
var _2ee=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2ed=dom.evaluate(_2ec,dom,null,type,null);
while((element=_2ed.iterateNext())!=null){
_2ee.push(element.getAttribute("id"));
}
}else{
_2ed=dom.documentElement.selectNodes(_2ec);
Array.forEach(_2ed,function(_2f0){
_2ee.push(_2f0.getAttribute("id"));
});
}
return _2ee;
},toHTMLElement:function(_2f1){
var _2f2=this.serialize(_2f1);
var temp=document.createElement("temp");
temp.innerHTML=_2f2;
return temp.firstChild;
},getActiveElement:function(){
var _2f4=document.activeElement;
if(_2f4==null||_2f4==document.body){
_2f4=this._activeElement;
}
return _2f4;
},serialize:function(_2f5){
var _2f6=null;
if(_2f5.xml!=null){
_2f6=_2f5.xml;
}else{
if(this._serializer!=null){
_2f6=this._serializer.serializeToString(_2f5);
}
}
return _2f6;
},hasDifferences:function(_2f7,_2f8){
var s1=null;
var s2=null;
if(_2f7.xml!=null){
s1=_2f7.xml;
s2=_2f8.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f7);
s2=this._serializer.serializeToString(_2f8);
}
}
return s1!=s2;
},parse:function(_2fb){
var _2fc=null;
if(this._parser!=null&&window.XPathResult!=null){
_2fc=this._parser.parseFromString(_2fb,"text/xml");
}else{
_2fc=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2fc.setProperty("SelectionLanguage","XPath");
_2fc.loadXML(_2fb);
}
return this._validate(_2fc);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2ff=dom.getElementsByTagName("parsererror").item(0);
if(_2ff!=null){
out=_2ff.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _303=!has[id];
has[id]=true;
if(!_303){
out="Element \""+id+"\" encountered twice.";
}
return _303;
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
this.handleElement=function(_304,_305){
var _306=false;
switch(_304.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_304.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_306=false;
break;
}
break;
}
return _306;
};
this.updateElement=function(_307,_308){
var id=_307.getAttribute("id");
var _30a=document.getElementById(id);
if(_30a!=null){
var _30b=null;
switch(_30a.nodeName.toLowerCase()){
case "input":
_30b=_307.getAttribute("value");
break;
case "textarea":
_30b=_307.textContent?_307.textContent:_307.text;
break;
}
if(_30b==null){
_30b="";
}
if(_30b!=_30a.value){
_30a.value=_30b;
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
},_beforeUpdate:function(_30c){
var _30d=true;
if(_30c!=null){
_30c.__updateType=this.type;
_30d=UpdateAssistant.dispatchEvent(_30c,Update.EVENT_BEFOREUPDATE);
}
return _30d;
},_afterUpdate:function(_30e){
var _30f=true;
if(_30e!=null){
_30e.__updateType=this.type;
_30f=UpdateAssistant.dispatchEvent(_30e,Update.EVENT_AFTERUPDATE);
}
return _30f;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_311){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_311;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _312,_313,_314=UpdateAssistant.toHTMLElement(this.element);
if((_312=document.getElementById(this.id))!=null){
if((_313=_312.parentNode)!=null){
var _315=UserInterface.getBinding(_312);
if(_315!=null){
_314.__isAttached=_315.isAttached;
}
if(this._beforeUpdate(_312)){
_313.replaceChild(_314,_312);
this._afterUpdate(_314);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_316){
var _317=ReplaceUpdate.superclass._afterUpdate.call(this,_316);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_316.nodeName=="form"||_316.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _317;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_31a,_31b){
this.type=type;
this.id=id;
this.element=_31a;
this.isFirst=_31b;
return this;
}
SiblingUpdate.prototype.update=function(){
var _31c=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_31c);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_31c);
break;
}
};
SiblingUpdate.prototype._remove=function(_31d){
var _31e=_31d.parentNode;
if(_31e!=null){
if(this._beforeUpdate(_31d)){
_31e.removeChild(_31d);
this._afterUpdate(_31e);
}
}
};
SiblingUpdate.prototype._insert=function(_31f,_320){
var _321=UpdateAssistant.toHTMLElement(_31f);
if(this.isFirst){
var _322=_320;
if(_322!=null){
if(this._beforeUpdate(_322)){
_322.insertBefore(_321,_322.firstChild);
this._afterUpdate(_321);
}
}
}else{
var _322=_320.parentNode;
if(_322!=null){
if(this._beforeUpdate(_322)){
_322.insertBefore(_321,_320.nextSibling);
this._afterUpdate(_321);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_323){
var _324=SiblingUpdate.superclass._beforeUpdate.call(this,_323);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_323.id+"\"");
}
return _324;
};
SiblingUpdate.prototype._afterUpdate=function(_325){
var _326=true;
if(_325!=null){
_326=SiblingUpdate.superclass._afterUpdate.call(this,_325);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_325.id+"\"");
if(_325.nodeName=="form"||_325.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _326;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_328,_329){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_328;
this.currentElement=_329;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _32a=document.getElementById(this.id);
if(this._beforeUpdate(_32a)){
this._updateAttributes(_32a);
this._afterUpdate(_32a);
}
};
AttributesUpdate.prototype._updateAttributes=function(_32b){
Array.forEach(this.element.attributes,function(_32c){
var _32d=this.currentElement.getAttribute(_32c.nodeName);
if(_32d==null||_32d!=_32c.nodeValue){
this._setAttribute(_32b,_32c.nodeName,_32c.nodeValue);
this._summary.push("@"+_32c.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_32e){
if(this.element.getAttribute(_32e.nodeName)==null){
this._setAttribute(_32b,_32e.nodeName,null);
this._summary.push("@"+_32e.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_32f,name,_331){
if(_32f==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_331);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _332=(_331==null);
if(_332){
_32f.removeAttribute(name);
}else{
_32f.setAttribute(name,_331);
}
if(document.all!=null){
if(_332){
_331="";
}
switch(name.toLowerCase()){
case "class":
_32f.className=_331;
break;
case "disabled":
_32f.disabled=!_332;
break;
case "checked":
_32f.checked=!_332;
break;
case "readonly":
_32f.readOnly=!_332;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_333){
AttributesUpdate.superclass._afterUpdate.call(this,_333);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_334,key){
return _334.replace("${windowkey}",document.location+":"+key);
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
var _338=this._newDimensions.w!=this._currentDimensions.w;
var _339=this._newDimensions.h!=this._currentDimensions.h;
if(_338||_339){
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
},fireOnDOM:function(_33b){
if(Interfaces.isImplemented(IDOMHandler,_33b,true)){
this._ondomstatements.add(_33b);
}
},fireOnLoad:function(_33c){
if(Interfaces.isImplemented(ILoadHandler,_33c,true)){
this._onloadstatements.add(_33c);
}
},fireOnResize:function(_33d){
if(Interfaces.isImplemented(IResizeHandler,_33d,true)){
this._onresizestatements.add(_33d);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_33e){
return eval(_33e);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_33f,_340){
SystemLogger.unsuspend(_340);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_341,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _344=top.app.bindingMap.broadcasterHasDirtyTabs;
_344.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_345,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _348=top.app.bindingMap.broadcasterHasDirtyTabs;
_348.disable();
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
var _349=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_349=LoginService.Logout(true);
if(!_349){
alert("Logout failed.");
}
}
return _349;
},lock:function(_34a){
if(_34a!=null){
this._lockthings[_34a]=true;
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
},unlock:function(_34b,_34c){
if(_34b!=null){
delete this._lockthings[_34b];
if(top.bindingMap.mastercover!=null){
if(_34c||this._lockers>0){
if(_34c){
var out="Unlocked by "+new String(_34b)+"\n";
for(var _34e in this._lockthings){
out+="Locked by "+new String(_34e)+". ";
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
},hasLock:function(_34f){
return this._lockthings[_34f]==true;
},activate:function(_350){
var _351=this._activeBinding;
this._activeBinding=_350;
this._activatedBindings.add(_350);
if(_351&&_351.isActive){
_351.deActivate();
}
},deActivate:function(_352){
var _353=null;
var _354=null;
if(_352==this._activeBinding){
while(!_354&&this._activatedBindings.hasEntries()){
_353=this._activatedBindings.extractLast();
if(_353!=_352&&_353.isActivatable){
_354=_353;
}
}
if(!_354){
_354=app.bindingMap.explorerdock;
}
_354.activate();
}
},focused:function(_355){
this.isFocused=_355;
if(_355){
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
},handleAction:function(_35a){
switch(_35a.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _35c=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_35e){
var src=_35e.src;
if(src.indexOf(_35c)>-1){
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
var _363=false;
if(this._isMousePositionTracking){
_363=true;
if(Client.isExplorer&&e.button!=1){
_363=false;
}
if(_363){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _363;
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
},onDragStart:function(_365){
var _366=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_366,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_366.getImage());
this._cursorStartPoint=_365;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_366.showDrag){
_366.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_366.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _368=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_368);
}
},onDragStop:function(diff){
if(this._isDragging){
var _36a=BindingDragger.draggedBinding;
if(_36a.hideDrag){
_36a.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_36a.dragType);
this._isDragging=false;
_36a=BindingAcceptor.acceptingBinding;
if(_36a!=null){
if(Interfaces.isImplemented(IAcceptable,_36a,true)==true){
_36a.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_36a);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_36b){
if(this.isDeveloperMode||_36b){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_36c){
if(_36c==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_36d){
switch(_36d){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_36f){
switch(_36f.Key){
case "ProductVersion":
this.versionString=_36f.Value;
break;
case "ProductTitle":
this.versionPrettyString=_36f.Value;
break;
case "InstallationId":
this.installationID=_36f.Value;
break;
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_36f.Value;
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
var _372=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _373={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _374=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_374){
for(var key in _374){
_373[key]=_374[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_373);
}
}});
this.getPref=function(key){
var _377=null;
if(key){
_377=_373[key];
}else{
throw "No such preference.";
}
return _377;
};
this.setPref=function(key,_379){
if(key){
_373[key]=_379;
}else{
throw "No such preference.";
}
};
function debug(_37a){
var _37b=_37a?"Persisted preferences":"No persisted preferences. Using defaults";
_37b+=":\n";
for(var key in _373){
var pref=_373[key];
_37b+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_372.fine(_37b);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _380=null;
if(this.isInitialized==true){
if(this._persistance){
var _381=this._persistance[id];
if(_381){
_380=_381[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _380;
},setPersistedProperty:function(id,prop,_384){
if(this.isInitialized==true){
if(this._persistance){
if(_384!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_384);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_385){
switch(_385){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _386=top.bindingMap.persistance;
_386.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _387=top.bindingMap.persistance;
var map=_387.getPersistanceMap();
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
function StandardEventHandler(doc,_38a){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_38a;
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
var _38e={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_38e);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_38e);
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
var _395=UserInterface.getBinding(node);
if(_395!=null){
_395.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_395!=null?null:node.parentNode;
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
var _398=Application.trackMousePosition(e);
if(_398){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_39b){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_39b){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_39b=true;
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
var _39c=KeySetBinding.handleKey(this._contextDocument,e);
if(!_39c){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _39d=this._contextWindow.frameElement;
if(_39d!=null){
var _39e=DOMUtil.getParentWindow(_39d);
if(_39e.standardEventHandler!=null){
_39e.standardEventHandler._handleKeyDown(e,_39b);
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
var _3a1=false;
var _3a2=DOMEvents.getTarget(e);
var name=_3a2.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_3a1=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_3a1;
}
if(_3a1){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a5){
this._isAllowTabs=(_3a5==true?true:false);
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
function Action(_3a8,type){
this.target=_3a8;
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
function Animation(_3aa){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3ab in _3aa){
this[_3ab]=_3aa[_3ab];
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
Animation.prototype.onstart=function(_3af){
};
Animation.prototype.onstep=function(_3b0){
};
Animation.prototype.onstop=function(_3b1){
};
Point.isEqual=function(p1,p2){
var _3b4=false;
if(p1&&p2){
_3b4=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b4;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b9=false;
if(dim1&&dim2){
_3b9=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b9;
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
function BindingAcceptor(_3c0){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3c0;
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
var _3c1=new List(this._binding.dragAccept.split(" "));
while(_3c1.hasNext()){
var type=_3c1.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3c3,arg){
var type=arg;
try{
switch(_3c3){
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
function BindingBoxObject(_3c8){
this._domElement=_3c8.getBindingElement();
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
function BindingDragger(_3ca){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3ca;
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
BindingDragger.prototype.registerHandler=function(_3cc){
if(Interfaces.isImplemented(IDragHandler,_3cc)==true){
this.handler=_3cc;
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
var _3cf=e.button==(e.target?0:1);
if(_3cf){
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
var _3d1=Application.getMousePosition();
var dx=_3d1.x-this.startPoint.x;
var dy=_3d1.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d4,e){
switch(_3d4){
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
function BindingParser(_3d6){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d6;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d7){
var _3d8=new List();
var xml=BindingParser.XML.replace("${markup}",_3d7);
var doc=XMLParser.parse(_3d7);
if(doc){
var _3db=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3db);
var node=_3db.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d8.add(node);
}
node=node.nextSibling;
}
}
return _3d8;
};
BindingParser.prototype._iterate=function(_3dd,_3de){
var _3df=null;
switch(_3dd.nodeType){
case Node.ELEMENT_NODE:
_3df=this._cloneElement(_3dd);
UserInterface.registerBinding(_3df);
break;
case Node.TEXT_NODE:
_3df=this._ownerDocument.createTextNode(_3dd.nodeValue);
break;
}
if(_3df){
_3de.appendChild(_3df);
}
if(_3df&&_3dd.hasChildNodes()){
var _3e0=_3dd.firstChild;
while(_3e0){
this._iterate(_3e0,_3df);
_3e0=_3e0.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3e1){
var _3e2=DOMUtil.createElementNS(_3e1.namespaceURI?_3e1.namespaceURI:Constants.NS_XHTML,_3e1.nodeName,this._ownerDocument);
var i=0;
while(i<_3e1.attributes.length){
var attr=_3e1.attributes.item(i++);
_3e2.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3e2;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e5){
var _3e6=null;
var _3e7=false;
var _3e8=_3e5.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e5)){
var _3e9=UserInterface.getBinding(_3e5);
_3e7=BindingSerializer.activeInstance.indexBinding(_3e9);
if(_3e7){
_3e6=_3e9.key;
_3e5.setAttribute(BindingSerializer.KEYPOINTER,_3e6);
}
}
_3e6=_3e6?_3e6:_3e8;
var _3ea=new List(_3e5.childNodes);
_3ea.each(function(_3eb){
if(_3eb.nodeType==Node.ELEMENT_NODE){
_3eb.setAttribute(BindingSerializer.KEYPOINTER,_3e6);
}
});
if(_3e7){
BindingSerializer.activeInstance.append(_3e6,_3e8);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ec){
BindingSerializer.activeInstance=this;
_3ec.bindingWindow.ElementIterator.iterate(_3ec.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3ed){
var _3ee=false;
var _3ef=_3ed.serialize();
if(_3ef!=false){
_3ee=true;
var _3f0="ui:"+DOMUtil.getLocalName(_3ed.bindingElement);
var _3f1=DOMUtil.createElementNS(Constants.NS_UI,_3f0,this._dom);
this._pointers[_3ed.key]=_3f1;
for(var prop in _3ef){
if(_3ef[prop]!=null){
_3f1.setAttribute(prop,String(_3ef[prop]));
}
}
}
return _3ee;
};
BindingSerializer.prototype.append=function(_3f3,_3f4){
var _3f5=this._pointers[_3f3];
var _3f6=_3f4?this._pointers[_3f4]:this._dom;
_3f6.appendChild(_3f5);
};
function ImageProfile(_3f7){
this._default=_3f7.image;
this._hover=_3f7.imageHover;
this._active=_3f7.imageActive;
this._disabled=_3f7.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f8){
this._default=_3f8;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f9){
this._hover=_3f9;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3fa){
this._active=_3fa;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3fb){
this._disabled=_3fb;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3fc,_3fd,_3fe){
var _3ff=null;
if(_3fc.isAttached){
_3ff=new List();
var _400=_3fe?_3fc.getChildElementsByLocalName(_3fd):_3fc.getDescendantElementsByLocalName(_3fd);
_400.each(function(_401){
var _402=UserInterface.getBinding(_401);
if(_402){
_3ff.add(_402);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3fc.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3ff;
},getAncestorBindingByType:function(_404,impl,_406){
var _407=null;
if(Binding.exists(_404)){
var node=_404.bindingElement;
while(_407==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _409=UserInterface.getBinding(node);
if(_409 instanceof impl){
_407=_409;
}
}else{
if(_406&&node.nodeType==Node.DOCUMENT_NODE){
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
return _407;
},getAncestorBindingByLocalName:function(_40b,_40c,_40d){
var _40e=null;
if(_40c=="*"){
var node=_40b.bindingElement;
while(!_40e&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_40e=UserInterface.getBinding(node);
}
}
}else{
_40e=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_40c,_40b.bindingElement,_40d));
}
return _40e;
},getChildElementsByLocalName:function(_410,_411){
var _412=new List();
var _413=new List(_410.bindingElement.childNodes);
_413.each(function(_414){
if(_414.nodeType==Node.ELEMENT_NODE){
if(_411=="*"||DOMUtil.getLocalName(_414)==_411){
_412.add(_414);
}
}
});
return _412;
},getChildBindingByType:function(_415,impl){
var _417=null;
_415.getChildElementsByLocalName("*").each(function(_418){
var _419=UserInterface.getBinding(_418);
if(_419!=null&&_419 instanceof impl){
_417=_419;
return false;
}else{
return true;
}
});
return _417;
},getDescendantBindingByType:function(_41a,impl){
var _41c=null;
_41a.getDescendantElementsByLocalName("*").each(function(_41d){
var _41e=UserInterface.getBinding(_41d);
if(_41e!=null&&_41e instanceof impl){
_41c=_41e;
return false;
}else{
return true;
}
});
return _41c;
},getDescendantBindingsByType:function(_41f,impl){
var _421=new List();
_41f.getDescendantElementsByLocalName("*").each(function(_422){
var _423=UserInterface.getBinding(_422);
if(_423!=null&&_423 instanceof impl){
_421.add(_423);
}
return true;
});
return _421;
},getNextBindingByLocalName:function(_424,name){
var _426=null;
var _427=_424.bindingElement;
while((_427=DOMUtil.getNextElementSibling(_427))!=null&&DOMUtil.getLocalName(_427)!=name){
}
if(_427!=null){
_426=UserInterface.getBinding(_427);
}
return _426;
},getPreviousBindingByLocalName:function(_428,name){
var _42a=null;
var _42b=_428.bindingElement;
while((_42b=DOMUtil.getPreviousElementSibling(_42b))!=null&&DOMUtil.getLocalName(_42b)!=name){
}
if(_42b!=null){
_42a=UserInterface.getBinding(_42b);
}
return _42a;
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
},addFilter:function(_42c){
this._filters.add(_42c);
},removeFilter:function(_42d){
var _42e=-1;
this._filters.each(function(fil){
_42e++;
var _430=true;
if(fil==_42d){
_430=false;
}
return _430;
});
if(_42e>-1){
this._filters.del(_42e);
}
},_applyFilters:function(node,arg){
var _433=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _436=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _437=true;
while(this._filters.hasNext()&&_437==true){
var _438=this._filters.getNext();
var res=_438.call(this,node,arg);
if(res!=null){
_433=res;
switch(res){
case stop:
case skip:
case skip+_436:
_437=false;
break;
}
}
}
return _433;
},crawl:function(_43a,arg){
this.contextDocument=_43a.ownerDocument;
this.onCrawlStart();
var _43c=this.type==NodeCrawler.TYPE_ASCENDING;
var _43d=this._applyFilters(_43a,arg);
if(_43d!=NodeCrawler.STOP_CRAWLING){
if(_43c&&_43d==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_43c?_43a.parentNode:_43a;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_43f,arg){
var _441=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_441=this._crawlDescending(_43f,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_441=this._crawlAscending(_43f,arg);
break;
}
return _441;
},_crawlDescending:function(_442,arg){
var skip=NodeCrawler.SKIP_NODE;
var _445=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _447=null;
if(_442.hasChildNodes()){
var node=_442.firstChild;
while(node!=null&&_447!=stop){
this.currentNode=node;
_447=this._applyFilters(node,arg);
switch(_447){
case stop:
case _445:
case skip+_445:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_447=stop;
break;
}
}
}
if(_447!=stop&&_447!=skip){
this.previousNode=node;
}
break;
}
if(_447!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _447;
},_crawlAscending:function(_44a,arg){
var _44c=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_44a!=null){
this.currentNode=_44a;
_44c=this._applyFilters(_44a,arg);
if(_44c!=stop){
var next=this.nextNode?this.nextNode:_44a.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_44a;
_44c=this._crawl(next,arg);
}
}
}else{
_44c=stop;
}
return _44c;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _450 in this){
this[_450]=null;
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
var _453=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_453=NodeCrawler.SKIP_NODE;
}
return _453;
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
this.addFilter(function(_454,arg){
var _456=null;
if(!UserInterface.hasBinding(_454)){
_456=NodeCrawler.SKIP_NODE;
}
return _456;
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
this.addFilter(function(_458,arg){
var _45a=null;
var _45b=UserInterface.getBinding(_458);
if(Interfaces.isImplemented(ICrawlerHandler,_45b)==true){
self.response=null;
_45b.handleCrawler(self);
_45a=self.response;
}
return _45a;
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
this.addFilter(function(_45d,list){
var _45f=null;
var _460=UserInterface.getBinding(_45d);
if(Interfaces.isImplemented(IFlexible,_460)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_460);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_460.isFlexSuspended==true){
_45f=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_460);
}
break;
}
}
return _45f;
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
this.addFilter(function(_461,list){
var _463=null;
var _464=UserInterface.getBinding(_461);
if(_464.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_464)==true){
if(_464.isFocusable&&_464.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_464);
break;
case FocusCrawler.MODE_FOCUS:
if(!_464.isFocused){
_464.focus();
}
_463=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_464.isFocused==true){
_464.blur();
_463=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _463;
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
this.addFilter(function(_465,list){
var _467=null;
var _468=UserInterface.getBinding(_465);
if(!_468.isVisible){
_467=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _467;
});
this.addFilter(function(_469,list){
var _46b=null;
var _46c=UserInterface.getBinding(_469);
if(_46c.isAttached){
if(Interfaces.isImplemented(IFit,_46c)){
if(!_46c.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_46c);
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
UpdateAssistant.serialize=function(_46d){
_46d=_46d.cloneNode(true);
_46d.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_46d.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_46d);
};
}
},handleEvent:function(e){
var _46f=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_46f);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_46f);
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
},_beforeUpdate:function(_470){
var _471=(_470==document.documentElement);
if(_471){
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
var _474=FocusBinding.focusedBinding;
if(_474!=null){
this._focusID=_474.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_470.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_470);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_470,false);
break;
}
}
},_afterUpdate:function(_475){
var _476=(_475==document.documentElement);
if(_476){
var _477=this._elementsbuffer;
if(_477.hasEntries()){
_477.each(function(_478){
DocumentManager.attachBindings(_478);
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
var _47b=FocusBinding.focusedBinding;
if(_47b==null){
var _47c=document.getElementById(this._focusID);
if(_47c!=null){
var _47b=UserInterface.getBinding(_47c);
if(_47b!=null){
_47b.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _47d=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _47e="NEW DOM: "+document.title+"\n\n"+_47d+"\n\n";
_47e+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_47e);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_475.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_475);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_475,true);
break;
}
switch(_475.id){
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
var _47b=UserInterface.getBinding(_475);
while(_47b==null&&_475!=null){
_47b=UserInterface.getBinding(_475);
_475=_475.parentNode;
}
if(_47b!=null){
_47b.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_480,_481){
var _482=UserInterface.getBinding(_480);
if(_482!=null){
if(_481){
var _483=this._attributesbuffer;
var map=new Map();
_483.each(function(name,old){
var now=_480.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_480.attributes).each(function(att){
if(att.specified){
if(!_483.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_48a){
var _48b=_482.propertyMethodMap[name];
if(_48b!=null){
_48b.call(_482,_48a);
}
});
}else{
var map=new Map();
new List(_480.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_48d,_48e){
var _48f=window.bindingMap[_48d.getAttribute("id")];
if(_48f!=null){
return _48f.handleElement(_48d,_48e);
}
},updateElement:function(_490,_491){
var _492=window.bindingMap[_490.getAttribute("id")];
if(_492!=null){
return _492.updateElement(_490,_491);
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
this.addFilter(function(_494,list){
var _496=UserInterface.getBinding(_494);
var _497=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_496==null){
UserInterface.registerBinding(_494);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_496!=null){
if(!_496.isAttached){
list.add(_496);
}
if(_496.isLazy==true){
_497=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_496!=null){
list.add(_496);
}
break;
}
return _497;
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
},handleBroadcast:function(_498,arg){
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
var _49b=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_49b)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_49b!=null){
if(_49b.href!=null&&_49b.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _49c=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_49c!=null){
var map={};
var _49e=DOMUtil.getElementsByTagName(_49c,"bindingmapping");
new List(_49e).each(function(_49f){
var _4a0=_49f.getAttribute("element");
var _4a1=_49f.getAttribute("binding");
map[_4a0]=eval(_4a1);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_4a2){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_4a2;
}else{
this.customUserInterfaceMapping.merge(_4a2);
}
},_registerBindings:function(_4a3){
var _4a4=new DocumentCrawler();
_4a4.mode=DocumentCrawler.MODE_REGISTER;
_4a4.crawl(_4a3);
_4a4.dispose();
},_attachBindings:function(_4a5){
var _4a6=new DocumentCrawler();
_4a6.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a6.crawl(_4a5,list);
var _4a8=false;
while(list.hasNext()){
var _4a9=list.getNext();
if(!_4a9.isAttached){
_4a9.onBindingAttach();
if(!_4a9.memberDependencies){
_4a9.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a9)){
_4a8=true;
}
}
}
if(_4a8){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a6.dispose();
list.dispose();
},attachBindings:function(_4ab){
this._registerBindings(_4ab);
this._attachBindings(_4ab);
},detachBindings:function(_4ac,_4ad){
var _4ae=new DocumentCrawler();
_4ae.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4ae.crawl(_4ac,list);
if(_4ad==true){
list.extractFirst();
}
var _4b0=false;
list.reverse().each(function(_4b1){
if(Interfaces.isImplemented(IData,_4b1)){
_4b0=true;
}
_4b1.dispose(true);
});
if(_4b0){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4ae.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4b3){
return (/textarea|input/.test(DOMUtil.getLocalName(_4b3)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b4){
this.isDirty=true;
var _4b5=false;
if(_4b4!=null&&!_4b4.isDirty){
_4b4.isDirty=true;
_4b4.dispatchAction(Binding.ACTION_DIRTY);
_4b5=true;
}
return _4b5;
},clean:function(_4b6){
if(_4b6.isDirty){
_4b6.isDirty=false;
}
},registerDataBinding:function(name,_4b8){
if(Interfaces.isImplemented(IData,_4b8,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b8;
}
}else{
throw "Invalid DataBinding: "+_4b8;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4bb=null;
if(this._dataBindings[name]!=null){
_4bb=this._dataBindings[name];
}
return _4bb;
},getAllDataBindings:function(_4bc){
var list=new List();
for(var name in this._dataBindings){
var _4bf=this._dataBindings[name];
list.add(_4bf);
if(_4bc&&_4bf instanceof WindowBinding){
var _4c0=_4bf.getContentWindow().DataManager;
if(_4c0!=null){
list.merge(_4c0.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4c1=false;
for(var name in this._dataBindings){
_4c1=true;
break;
}
return _4c1;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c5){
var _4c6=this._dataBindings[name];
if(_4c6!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c6.setResult(_4c5);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c6);
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
var _4c7=new DataBindingMap();
_4c7.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c9=this._dataBindings[name];
if(_4c9 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c7[name]=_4c9.getValue();
}
return _4c7;
},getDataBindingResultMap:function(){
var _4ca=new DataBindingMap();
_4ca.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4cc=this._dataBindings[name];
var res=_4cc.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4cf){
_4ca.set(name,_4cf);
});
}else{
_4ca.set(name,res);
}
}
return _4ca;
},getPostBackString:function(){
var _4d0="";
var form=document.forms[0];
if(form!=null){
var _4d2="";
new List(form.elements).each(function(_4d3){
var name=_4d3.name;
var _4d5=encodeURIComponent(_4d3.value);
switch(_4d3.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4d0+=name+"="+_4d5+"&";
break;
case "submit":
if(document.activeElement==_4d3){
_4d0+=name+"="+_4d5+"&";
}
break;
case "radio":
if(_4d3.checked){
_4d0+=name+"="+_4d5+"&";
}
break;
case "checkbox":
if(_4d3.checked){
if(_4d3.name==_4d2){
if(_4d0.lastIndexOf("&")==_4d0.length-1){
_4d0=_4d0.substr(0,_4d0.length-1);
}
_4d0+=","+_4d5;
}else{
_4d0+=name+"="+_4d3.value;
}
_4d2=name;
_4d0+="&";
}
break;
}
});
}
return _4d0.substr(0,_4d0.length-1);
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
var _4de=null;
var _4df=null;
var _4e0=false;
if(!this._cache[name]){
_4e0=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4e2=DOMUtil.getXMLHTTPRequest();
_4e2.open("get",uri,false);
_4e2.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4e2.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4df=_4e2.responseText;
break;
default:
_4df=_4e2.responseXML;
break;
}
if(_4df==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4df;
}
}
_4df=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4de=_4df;
break;
case this._modes.MODE_DOCUMENT:
_4de=DOMUtil.cloneNode(_4df,true);
break;
case this._modes.MODE_ELEMENT:
_4de=DOMUtil.cloneNode(_4df.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4de=DOMSerializer.serialize(_4df,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4de=DOMSerializer.serialize(_4df.documentElement,true);
break;
}
if(_4e0&&Application.isDeveloperMode){
}
return _4de;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e5){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e5];
},invoke:function(url,_4e7,_4e8){
this._logger.error("Not implemented");
},invokeModal:function(url,_4ea,_4eb){
var _4ec=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4ea,argument:_4eb});
StageBinding.presentViewDefinition(_4ec);
return _4ec;
},invokeDefinition:function(_4ed){
if(_4ed instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4ed);
}
return _4ed;
},question:function(_4ee,text,_4f0,_4f1){
if(!_4f0){
_4f0=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ee,text,_4f0,_4f1);
},message:function(_4f2,text,_4f4,_4f5){
if(!_4f4){
_4f4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4f2,text,_4f4,_4f5);
},error:function(_4f6,text,_4f8,_4f9){
if(!_4f8){
_4f8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f6,text,_4f8,_4f9);
},warning:function(_4fa,text,_4fc,_4fd){
if(!_4fc){
_4fc=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4fa,text,_4fc,_4fd);
},_standardDialog:function(type,_4ff,text,_501,_502){
var _503=null;
if(!_501){
_503=new List(Dialog.BUTTONS_ACCEPT);
}else{
_503=new List();
new List(_501).each(function(_504){
var _505=null;
switch(typeof _504){
case "object":
_505=_504;
break;
case "string":
var _506=false;
if(_504.indexOf(":")>-1){
_504=_504.split(":")[0];
_506=true;
}
_505=Dialog.dialogButton(_504);
if(_506){
_505.isDefault=true;
}
break;
}
_503.add(_505);
});
}
var _507={title:_4ff,text:text,type:type,image:this._dialogImages[type],buttons:_503};
var _508=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_502,argument:_507});
StageBinding.presentViewDefinition(_508);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_50a,arg){
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
},saveAll:function(_50d){
var self=this;
var _50f=Application.getDirtyDockTabsTabs();
if(_50f.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_510,_511){
switch(_510){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_511,_50d);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_50f);
}else{
if(_50d){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_512,_513){
var _514=false;
var list=new List();
_512.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_514=true;
var _518=list.getLength();
var _519={handleBroadcast:function(_51a,tab){
if(--_518==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_513){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_519);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _514;
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
var _51e="Composite.Management.Help";
if(!StageBinding.isViewOpen(_51e)){
StageBinding.handleViewPresentation(_51e);
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
var _520=document.createEvent("Events");
_520.initEvent(type,true,true);
window.dispatchEvent(_520);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _522=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _523=_522.exec(url?url:"");
if(_523){
if(_523[3]=="media"){
this.isMedia=true;
}else{
if(_523[3]=="page"){
this.isPage=true;
}
}
}
var _524={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_524[$1]=$3;
});
this.queryString=_524;
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
Uri.prototype.setParam=function(key,_52d){
if(_52d==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_52d;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _52f=[];
for(var key in this.queryString){
_52f.push(key+"="+this.queryString[key]);
}
if(_52f.length>0){
url+="?"+_52f.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_531,_532){
var _533=null;
var _534=ViewDefinitions[_531];
if(_534.isMutable){
var impl=null;
if(_534 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_532!=null&&impl!=null){
var def=new impl();
for(var prop in _534){
def[prop]=ViewDefinition.cloneProperty(_534[prop]);
}
def.handle=_532;
_533=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _533;
};
ViewDefinition.cloneProperty=function(_538){
if(null==_538){
return _538;
}
if(typeof _538==="object"){
var _539=(_538.constructor===Array)?[]:{};
for(var prop in _538){
_539[prop]=ViewDefinition.cloneProperty(_538[prop]);
}
return _539;
}
return _538;
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
Binding.evaluate=function(_540,_541){
var _542=null;
var _543=_541.bindingWindow.WindowManager;
if(_543!=null){
var _544=Binding.parseScriptStatement(_540,_541.key);
_542=_543.evaluate(_544);
}
return _542;
};
Binding.parseScriptStatement=function(_545,key){
if(_545!=null&&key!=null){
var _547="UserInterface.getBindingByKey ( \""+key+"\" )";
_545=_545.replace(/(\W|^)this(,| +|\)|;)/g,_547);
_545=_545.replace(/(\W|^)this(\.)/g,_547+".");
}
return _545;
};
Binding.exists=function(_548){
var _549=false;
try{
if(_548&&_548.bindingElement&&_548.bindingElement.nodeType&&_548.isDisposed==false){
_549=true;
}
}
catch(accessDeniedException){
_549=false;
}
finally{
return _549;
}
};
Binding.destroy=function(_54a){
if(!_54a.isDisposed){
if(_54a.acceptor!=null){
_54a.acceptor.dispose();
}
if(_54a.dragger!=null){
_54a.disableDragging();
}
if(_54a.boxObject!=null){
_54a.boxObject.dispose();
}
if(_54a._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_54a);
}
for(var _54b in _54a.shadowTree){
var _54c=_54a.shadowTree[_54b];
if(_54c instanceof Binding&&Binding.exists(_54c)){
_54c.dispose(true);
}
_54a.shadowTree[_54b]=null;
}
_54a.isDisposed=true;
_54a=null;
}
};
Binding.dotnetify=function(_54d,_54e){
var _54f=_54d.getCallBackID();
if(_54f!=null){
var _550=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_54d.bindingDocument);
_550.type="hidden";
_550.id=_54f;
_550.name=_54f;
_550.value=_54e!=null?_54e:"";
_54d.bindingElement.appendChild(_550);
_54d.shadowTree.dotnetinput=_550;
}else{
throw _54d.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_551){
var _552=_551.getProperty("image");
var _553=_551.getProperty("image-hover");
var _554=_551.getProperty("image-active");
var _555=_551.getProperty("image-disabled");
if(_551.imageProfile==null){
if(_551.image==null&&_552!=null){
_551.image=_552;
}
if(_551.imageHover==null&&_553!=null){
_551.imageHover=_553;
}
if(_551.imageActive==null&&_554!=null){
_551.imageActive=_554;
}
if(_551.imageDisabled==null&&_555!=null){
_551.imageDisabled=_555;
}
if(_551.image||_551.imageHover||_551.imageActive||_551.imageDisabled){
_551.imageProfile=new ImageProfile(_551);
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
var _557=this.dependentBindings[key];
_557.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_558){
if(_558){
this.memberDependencies[_558.key]=true;
var _559=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_559=false;
break;
}
}
if(_559){
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
Binding.prototype.detachRecursive=function(_55b){
if(_55b==null){
_55b=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_55b);
};
Binding.prototype.addMember=function(_55c){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_55c.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_55c.key]=false;
_55c.registerDependentBinding(this);
}
}
return _55c;
};
Binding.prototype.addMembers=function(_55d){
while(_55d.hasNext()){
var _55e=_55d.getNext();
if(!_55e.isInitialized){
this.addMember(_55e);
}
}
return _55d;
};
Binding.prototype.registerDependentBinding=function(_55f){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_55f.key]=_55f;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _560=this.getProperty("persist");
if(_560&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _562=new List(_560.split(" "));
while(_562.hasNext()){
var prop=_562.getNext();
var _564=Persistance.getPersistedProperty(id,prop);
if(_564!=null){
this._persist[prop]=_564;
this.setProperty(prop,_564);
}else{
_564=this.getProperty(prop);
if(_564!=null){
this._persist[prop]=_564;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _565=this.getProperty("disabled");
var _566=this.getProperty("contextmenu");
var _567=this.getProperty("observes");
var _568=this.getProperty("onattach");
var _569=this.getProperty("hidden");
var _56a=this.getProperty("blockactionevents");
if(_569==true&&this.isVisible==true){
this.hide();
}
if(_565&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_566){
this.setContextMenu(_566);
}
if(_567){
this.observe(this.getBindingForArgument(_567));
}
if(_56a==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_568!=null){
Binding.evaluate(_568,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _56c=this.getProperty("draggable");
var _56d=this.getProperty("dragtype");
var _56e=this.getProperty("dragaccept");
var _56f=this.getProperty("dragreject");
if(_56c!=null){
this.isDraggable=_56c;
}
if(_56d!=null){
this.dragType=_56d;
if(_56c!=false){
this.isDraggable=true;
}
}
if(_56e!=null){
this.dragAccept=_56e;
}
if(_56f!=null){
this.dragReject=_56f;
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
Binding.prototype._updateBindingMap=function(_570){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _573=null;
if(_570){
_573=map[id];
if(_573!=null&&_573!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_573=map[id];
if(_573!=null&&_573==this){
delete map[id];
}
}
}else{
var _575=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_570);
if(Application.isDeveloperMode==true){
alert(_575);
}else{
this.logger.error(_575);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_577){
};
Binding.prototype.handleBroadcast=function(_578,arg){
};
Binding.prototype.handleElement=function(_57a){
return false;
};
Binding.prototype.updateElement=function(_57b){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _57d=null;
switch(typeof arg){
case "object":
_57d=arg;
break;
case "string":
_57d=this.bindingDocument.getElementById(arg);
if(_57d==null){
_57d=Binding.evaluate(arg,this);
}
break;
}
if(_57d!=null&&_57d.nodeType!=null){
_57d=UserInterface.getBinding(_57d);
}
return _57d;
};
Binding.prototype.serialize=function(){
var _57e={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_57e.id=id;
}
var _580=this.getProperty("binding");
if(_580){
_57e.binding=_580;
}
return _57e;
};
Binding.prototype.serializeToString=function(){
var _581=null;
if(this.isAttached){
_581=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _581;
};
Binding.prototype.subTreeFromString=function(_582){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_582);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_583){
var _584=this.bindingElement.getAttribute(_583);
if(_584){
_584=Types.castFromString(_584);
}
return _584;
};
Binding.prototype.setProperty=function(prop,_586){
if(_586!=null){
_586=_586.toString();
if(String(this.bindingElement.getAttribute(prop))!=_586){
this.bindingElement.setAttribute(prop,_586);
if(this.isAttached==true){
if(Persistance.isEnabled&&_586!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_586;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_586);
}
}
var _587=this.propertyMethodMap[prop];
if(_587){
_587.call(this,this.getProperty(prop));
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
var _589=null;
if(Binding.exists(this)){
_589=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _589;
};
Binding.prototype.attachClassName=function(_58a){
CSSUtil.attachClassName(this.bindingElement,_58a);
};
Binding.prototype.detachClassName=function(_58b){
CSSUtil.detachClassName(this.bindingElement,_58b);
};
Binding.prototype.hasClassName=function(_58c){
return CSSUtil.hasClassName(this.bindingElement,_58c);
};
Binding.prototype.addActionListener=function(type,_58e){
_58e=_58e!=null?_58e:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_58e)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_58e);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_58e+")");
}
};
Binding.prototype.removeActionListener=function(type,_590){
_590=_590?_590:this;
if(Action.isValid(type)){
var _591=this.actionListeners[type];
if(_591){
var i=0,_593;
while((_593=_591[i])!=null){
if(_593==_590){
_591.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_595){
_595=_595?_595:this;
DOMEvents.addEventListener(this.bindingElement,type,_595);
};
Binding.prototype.removeEventListener=function(type,_597){
_597=_597?_597:this;
DOMEvents.removeEventListener(this.bindingElement,type,_597);
};
Binding.prototype.subscribe=function(_598){
if(!this.hasSubscription(_598)){
this._subscriptions.set(_598,true);
EventBroadcaster.subscribe(_598,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_598);
}
};
Binding.prototype.unsubscribe=function(_599){
if(this.hasSubscription(_599)){
this._subscriptions.del(_599);
EventBroadcaster.unsubscribe(_599,this);
}
};
Binding.prototype.hasSubscription=function(_59a){
return this._subscriptions.has(_59a);
};
Binding.prototype.observe=function(_59b,_59c){
_59b.addObserver(this,_59c);
};
Binding.prototype.unObserve=function(_59d,_59e){
_59d.removeObserver(this,_59e);
};
Binding.prototype.handleContextEvent=function(e){
var self=this;
var menu=this.contextMenuBinding;
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a2={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a2);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a2);
}
menu.snapToMouse(e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
if(Client.isPad){
var _5a5=false;
var _5a6=false;
this.addEventListener(DOMEvents.TOUCHSTART,{handleEvent:function(e){
_5a6=setTimeout(function(){
self.handleContextEvent(e);
},800);
_5a5=true;
}});
this.addEventListener(DOMEvents.TOUCHMOVE,{handleEvent:function(e){
if(_5a5){
clearTimeout(_5a6);
_5a5=false;
}
}});
this.addEventListener(DOMEvents.TOUCHEND,{handleEvent:function(e){
if(_5a5){
clearTimeout(_5a6);
_5a5=false;
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
var _5ac=null;
var _5ad=null;
var _5ae=false;
if(arg instanceof Action){
_5ac=arg;
}else{
if(Action.isValid(arg)){
_5ac=new Action(this,arg);
_5ae=true;
}
}
if(_5ac!=null&&Action.isValid(_5ac.type)==true){
if(_5ac.isConsumed==true){
_5ad=_5ac;
}else{
var _5af=this.actionListeners[_5ac.type];
if(_5af!=null){
_5ac.listener=this;
var i=0,_5b1;
while((_5b1=_5af[i++])!=null){
if(_5b1&&_5b1.handleAction){
_5b1.handleAction(_5ac);
}
}
}
var _5b2=true;
if(this.isBlockingActions==true){
switch(_5ac.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5ae){
_5b2=false;
}
break;
}
}
if(_5b2){
_5ad=this.migrateAction(_5ac);
}else{
_5ad=_5ac;
}
}
}
return _5ad;
};
Binding.prototype.migrateAction=function(_5b3){
var _5b4=null;
var _5b5=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5b4&&node.nodeType!=Node.DOCUMENT_NODE){
_5b4=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5b4){
_5b5=_5b4.dispatchAction(_5b3);
}else{
_5b5=_5b3;
}
}
return _5b5;
};
Binding.prototype.reflex=function(_5b7){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5b7);
}
};
Binding.prototype.getMigrationParent=function(){
var _5b8=null;
if(true){
try{
var _5b9=this.bindingElement.parentNode;
if(_5b9!=null){
_5b8=_5b9;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5b8=null;
}
}
return _5b8;
};
Binding.prototype.add=function(_5ba){
if(_5ba.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5ba.bindingElement);
}else{
throw "Could not add "+_5ba.toString()+" of different document origin.";
}
return _5ba;
};
Binding.prototype.addFirst=function(_5bb){
if(_5bb.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5bb.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5bb.toString()+" of different document origin.";
}
return _5bb;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5bc,_5bd){
return BindingFinder.getAncestorBindingByLocalName(this,_5bc,_5bd);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5bf){
return BindingFinder.getAncestorBindingByType(this,impl,_5bf);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5c1){
return BindingFinder.getChildElementsByLocalName(this,_5c1);
};
Binding.prototype.getChildElementByLocalName=function(_5c2){
return this.getChildElementsByLocalName(_5c2).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5c3){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5c3));
};
Binding.prototype.getChildBindingsByLocalName=function(_5c4){
return this.getDescendantBindingsByLocalName(_5c4,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5c5){
return this.getChildBindingsByLocalName(_5c5).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5c6,_5c7){
return BindingFinder.getDescendantBindingsByLocalName(this,_5c6,_5c7);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5c8){
return this.getDescendantBindingsByLocalName(_5c8,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5cb){
return BindingFinder.getNextBindingByLocalName(this,_5cb);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5cc){
return BindingFinder.getPreviousBindingByLocalName(this,_5cc);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5cd){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5cd);
};
Binding.prototype.isFirstBinding=function(_5ce){
return (this.getOrdinalPosition(_5ce)==0);
};
Binding.prototype.isLastBinding=function(_5cf){
return DOMUtil.isLastElement(this.bindingElement,_5cf);
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
Binding.prototype.setCallBackArg=function(_5d1){
this.setProperty(Binding.CALLBACKARG,_5d1);
};
Binding.prototype.dispose=function(_5d2){
if(!this.isDisposed){
if(!_5d2){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5d3=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5d3){
if(Client.isExplorer){
_5d3.outerHTML="";
}else{
_5d3.parentNode.removeChild(_5d3);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5d6){
list.add(_5d6);
});
list.each(function(_5d7){
self.unsubscribe(_5d7);
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
Binding.prototype.wakeUp=function(_5d9,_5da){
_5da=_5da?_5da:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d9!==undefined){
self[_5d9]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5da);
},0);
}
};
Binding.prototype.handleCrawler=function(_5dc){
if(_5dc.response==null&&this.isLazy==true){
if(_5dc.id==DocumentCrawler.ID&&_5dc.mode==DocumentCrawler.MODE_REGISTER){
_5dc.response=NodeCrawler.NORMAL;
}else{
_5dc.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5dc.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5dc.id)){
_5dc.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5dc.response==null){
switch(_5dc.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5dc.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5dd){
var _5de=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5dd);
return UserInterface.registerBinding(_5de,Binding);
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
var _5df=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5df.each(function(_5e0){
DataBinding.expressions[_5e0.Key]=new RegExp(_5e0.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5e1){
var _5e2=null;
var _5e3=_5e1.getAncestorBindingByLocalName("field");
if(_5e3&&_5e3 instanceof FieldBinding){
var desc=_5e3.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5e2=desc.getLabel();
}
}
return _5e2;
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
var _5e6=this.bindingWindow.DataManager;
_5e6.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5e8=this.bindingWindow.DataManager;
if(_5e8.getDataBinding(name)){
_5e8.unRegisterDataBinding(name);
}
_5e8.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5e9,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e9,arg);
var _5eb=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e9){
case _5eb:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5eb);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5ec){
var _5ed=_5ec?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5ec!=this.isActivated){
this.isActivated=_5ec;
this.dispatchAction(_5ed);
var _5ee=new List();
var self=this;
this._activationawares.each(function(_5f0){
if(_5f0.isActivationAware){
try{
if(_5ec){
if(!_5f0.isActivated){
_5f0.onActivate();
}
}else{
if(_5f0.isActivated){
_5f0.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5ee.add(_5f0);
}
}
});
_5ee.each(function(_5f1){
this._activationawares.del(_5f1);
});
_5ee.dispose();
}else{
var _5f2="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5f2);
}else{
this.logger.error(_5f2);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5f3,_5f4){
if(Interfaces.isImplemented(IActivationAware,_5f3,true)==true){
if(_5f4==false){
this._activationawares.del(_5f3);
}else{
this._activationawares.add(_5f3);
if(this.isActivated==true){
_5f3.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5f3+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5f5){
var _5f6=this.getMigrationParent();
if(_5f6!=null){
var root=_5f6.ownerDocument.body;
var _5f8=UserInterface.getBinding(root);
if(_5f8!=null){
_5f8.makeActivationAware(this,_5f5);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f9){
RootBinding.superclass.handleCrawler.call(this,_5f9);
if(_5f9.type==NodeCrawler.TYPE_ASCENDING){
_5f9.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5fa=null;
if(this.bindingWindow.parent){
_5fa=this.bindingWindow.frameElement;
}
return _5fa;
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
StyleBinding.prototype.handleElement=function(_5fb){
return true;
};
StyleBinding.prototype.updateElement=function(_5fc){
var href=_5fc.getAttribute("link");
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
var _5fe=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5fe.hasNext()){
var cell=_5fe.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_600){
var _601=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_600.bindingElement);
_601=_600;
}else{
_601=MatrixBinding.superclass.add.call(this,_600);
}
return _601;
};
MatrixBinding.prototype.addFirst=function(_602){
var _603=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _604=this.shadowTree[MatrixBinding.CENTER];
_604.insertBefore(_602.bindingElement,_604.firstChild);
_603=_602;
}else{
_603=MatrixBinding.superclass.addFirst.call(this,_602);
}
return _602;
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
MatrixBinding.newInstance=function(_606){
var _607=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_606);
return UserInterface.registerBinding(_607,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_608,_609){
var list=new List();
var _60b=new FlexBoxCrawler();
_60b.mode=_609?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_60b.startBinding=_608;
_60b.crawl(_608.bindingElement,list);
list.each(function(_60c){
_60c.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_60d){
if(Binding.exists(_60d)){
_60d.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_60e){
if(Binding.exists(_60e)){
_60e.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_60b.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_60f){
FlexBoxBinding.superclass.handleAction.call(this,_60f);
switch(_60f.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_610){
var _611=0;
var _612=new List(this.bindingElement.parentNode.childNodes);
while(_612.hasNext()){
var _613=_612.getNext();
if(_613.nodeType==Node.ELEMENT_NODE&&_613!=this.bindingElement){
if(!this._isOutOfFlow(_613)){
var rect=_613.getBoundingClientRect();
if(_610){
height+=(rect.right-rect.left);
}else{
_611+=(rect.bottom-rect.top);
}
}
}
}
return _611;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_615){
var _616=CSSComputer.getPosition(_615);
var _617=CSSComputer.getFloat(_615);
return (_616=="absolute"||_617!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _618=this.bindingElement.parentNode;
var rect=_618.getBoundingClientRect();
var _61a=rect.bottom-rect.top;
var _61b=CSSComputer.getPadding(_618);
var _61c=CSSComputer.getBorder(_618);
_61a-=(_61b.top+_61b.bottom);
_61a-=(_61c.top+_61c.bottom);
return _61a;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _61d=this.bindingElement.parentNode;
var rect=_61d.getBoundingClientRect();
var _61f=rect.right-rect.left;
var _620=CSSComputer.getPadding(_61d);
var _621=CSSComputer.getBorder(_61d);
_61f-=(_620.left+_620.right);
_61f-=(_621.left+_621.right);
return _61f;
};
FlexBoxBinding.prototype.setFlexibility=function(_622){
if(_622!=this.isFlexible){
if(_622){
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
this.isFlexible=_622;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _623=this._getSiblingsSpan();
_623=this._getCalculatedHeight()-_623;
if(!isNaN(_623)&&_623>=0){
this.bindingElement.style.height=String(_623)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_624){
if(!this.isFit||_624){
var _625=0;
new List(this.bindingElement.childNodes).each(function(_626){
if(_626.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_626)){
var rect=_626.getBoundingClientRect();
_625+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_625);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_628){
var _629=CSSComputer.getPadding(this.bindingElement);
var _62a=CSSComputer.getBorder(this.bindingElement);
_628+=_629.top+_629.bottom;
_628+=_62a.top+_62a.bottom;
this.bindingElement.style.height=_628+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_62b){
ScrollBoxBinding.superclass.handleAction.call(this,_62b);
switch(_62b.type){
case BalloonBinding.ACTION_INITIALIZE:
_62b.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_62c){
this.bindingElement.scrollLeft=_62c.x;
this.bindingElement.scrollTop=_62c.y;
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
var _62d=this._getBuildElement("labeltext");
if(_62d){
this.shadowTree.labelText=_62d;
this.shadowTree.text=_62d.firstChild;
this.hasLabel=true;
}
}else{
var _62e=this.getProperty("label");
var _62f=this.getProperty("image");
var _630=this.getProperty("tooltip");
if(_62e){
this.setLabel(_62e,false);
}
if(_62f){
this.setImage(_62f,false);
}
if(_630){
this.setToolTip(_630);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_631,_632){
_631=_631!=null?_631:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_631);
this.setProperty("label",_631);
if(!_632){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_634){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _635=Resolver.resolve(url);
if(_635.classes){
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_635.classes);
}else{
this.setImageClasses();
this.setAlphaTransparentBackdrop(_635);
}
this.setProperty("image",url);
this.hasImage=true;
if(!_634){
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
LabelBinding.prototype.setImageClasses=function(_636){
if(this.shadowTree.labelBody){
if(!_636){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_636;
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
LabelBinding.prototype.setToolTip=function(_639){
this.setProperty("tooltip",_639);
if(_639!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_639));
}
};
LabelBinding.prototype.getToolTip=function(_63a){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_63b){
_63b=_63b==null?true:_63b;
var _63c=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_63b;
if(_63b){
this.attachClassName(_63c);
}else{
this.detachClassName(_63c);
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
var _63d="textonly";
var _63e="imageonly";
var _63f="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_63d);
this.detachClassName(_63e);
this.attachClassName(_63f);
}else{
if(this.hasLabel){
this.detachClassName(_63f);
this.detachClassName(_63e);
this.attachClassName(_63d);
}else{
if(this.hasImage){
this.detachClassName(_63f);
this.detachClassName(_63d);
this.attachClassName(_63e);
}
}
}
};
LabelBinding.newInstance=function(_640){
var _641=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_640);
return UserInterface.registerBinding(_641,LabelBinding);
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
var _642=this.getProperty("label");
if(!_642){
_642=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_642));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_644){
this.setProperty("label",_644);
};
TextBinding.newInstance=function(_645){
var _646=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_645);
return UserInterface.registerBinding(_646,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_647,_648){
BroadcasterBinding.superclass.setProperty.call(this,_647,_648);
function update(list){
if(list){
list.each(function(_64a){
_64a.setProperty(_647,_648);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _64b=this._observers[_647];
if(_64b){
update(_64b);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_64c){
BroadcasterBinding.superclass.deleteProperty.call(this,_64c);
function update(list){
if(list){
list.each(function(_64e){
_64e.deleteProperty(_64c);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _64f=this._observers[_64c];
if(_64f){
update(_64f);
}
};
BroadcasterBinding.prototype.addObserver=function(_650,_651){
_651=_651?_651:"*";
_651=new List(_651.split(" "));
while(_651.hasNext()){
var _652=_651.getNext();
switch(_652){
case "*":
this._setAllProperties(_650);
break;
default:
var _653=this.getProperty(_652);
_650.setProperty(_652,_653);
break;
}
if(!this._observers[_652]){
this._observers[_652]=new List();
}
this._observers[_652].add(_650);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_654){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _657=att.nodeName;
switch(_657){
case "id":
case "key":
break;
default:
var _658=this.getProperty(_657);
_654.setProperty(_657,_658);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_659,_65a){
_65a=_65a?_65a:"*";
_65a=new List(_65a.split(" "));
while(_65a.hasNext()){
var list=this._observers[_65a.getNext()];
if(list){
while(list.hasNext()){
var _65c=list.getNext();
if(_65c==_659){
list.del(_65c);
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
BroadcasterBinding.prototype.setDisabled=function(_65d){
this.setProperty("isdisabled",_65d);
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
var _65f=this.getProperty("width");
var _660=this.getProperty("label");
var type=this.getProperty("type");
var _662=this.getProperty("popup");
var _663=this.getProperty("tooltip");
var _664=this.getProperty("isdisabled");
var _665=this.getProperty("response");
var _666=this.getProperty("oncommand");
var _667=this.getProperty("value");
var _668=this.getProperty("ischecked");
var _669=this.getProperty("callbackid");
var _66a=this.getProperty("focusable");
var _66b=this.getProperty("focused");
var _66c=this.getProperty("default");
var url=this.getProperty("url");
var _66e=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_66e){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_660!=null){
this.setLabel(_660);
}
if(type!=null){
this.setType(type);
}
if(_663!=null){
this.setToolTip(_663);
}
if(_65f!=null){
this.setWidth(_65f);
}
if(_662!=null){
this.setPopup(_662);
}
if(_665!=null){
this.response=_665;
}
if(_668==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_666!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_666,this);
};
}
if(_66a||this.isFocusable){
this._makeFocusable();
if(_66c||this.isDefault){
this.isDefault=true;
}
if(_66b){
this.focus();
}
}
if(_664==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_669!=null){
this.bindingWindow.DataManager.registerDataBinding(_669,this);
if(_667!=null){
Binding.dotnetify(this,_667);
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
ButtonBinding.prototype.setImage=function(_66f){
if(this.isAttached){
this.labelBinding.setImage(_66f);
}
this.setProperty("image",_66f);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_670){
if(this.isAttached){
this.labelBinding.setLabel(_670);
}
this.setProperty("label",_670);
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
ButtonBinding.prototype.setToolTip=function(_672){
this.setProperty("tooltip",_672);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_672));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_673){
this.imageProfile=new _673(this);
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
ButtonBinding.prototype.flip=function(_678){
_678=_678==null?true:_678;
this.isFlipped=_678;
this.setProperty("flip",_678);
if(this.isAttached){
this.labelBinding.flip(_678);
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
ButtonBinding.prototype.check=function(_679){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_679==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_67a){
this.isActive=true;
this.isChecked=true;
if(!_67a){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_67b){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_67b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_67c){
this.isActive=false;
this.isChecked=false;
if(!_67c){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_67d,_67e){
if(_67d==null){
_67d==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_67d){
case true:
this.check(_67e);
break;
case false:
this.uncheck(_67e);
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
var _680=this.getProperty("tooltip");
if(_680){
this.setToolTip(_680);
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
var _681=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_681=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _681;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _683=this.getEqualSizeWidth();
if(goal>_683){
var diff=goal-_683;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _686=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_687){
if(_687>=0){
this.bindingElement.style.width=new String(_687+"px");
}
this.setProperty("width",_687);
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
ButtonBinding.prototype.setValue=function(_688){
this.shadowTree.dotnetinput.value=_688;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_689){
this.setValue(_689);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_68a){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_68a;
this.imageProfile=_68a.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_68b){
var _68c=_68b?"addEventListener":"removeEventListener";
this.binding[_68c](DOMEvents.MOUSEENTER,this);
this.binding[_68c](DOMEvents.MOUSELEAVE,this);
this.binding[_68c](DOMEvents.MOUSEDOWN,this);
this.binding[_68c](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _68e=false,_68f=false,_690=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_690=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_690=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_690=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_690=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_690==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_68e=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_690=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_690=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_690=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_690=ButtonStateManager.STATE_NORMAL;
var _691=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_691 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_690=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_690==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_68f=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_690=ButtonStateManager.STATE_NORMAL;
_68e=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_690=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_690=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_690=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_690=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_690==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_68e=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_690=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_690=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_690=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_690=ButtonStateManager.STATE_NORMAL;
_68e=true;
break;
}
}
}
}
}
switch(_690){
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
if(_68e){
this.binding.fireCommand();
}
if(_68f){
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
var _695=this.imageProfile.getDisabledImage();
if(_695){
this.binding.setImage(_695);
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
ClickButtonBinding.newInstance=function(_696){
var _697=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_696);
return UserInterface.registerBinding(_697,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_698){
var _699=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_698);
return UserInterface.registerBinding(_699,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_69a){
var _69b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_69a);
return UserInterface.registerBinding(_69b,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_69c){
this._binding=_69c;
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
var _69d=this.getDescendantBindingsByLocalName("control");
_69d.each(function(_69e){
_69e.setControlType(_69e.controlType);
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
ControlGroupBinding.newInstance=function(_6a0){
var _6a1=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_6a0);
return UserInterface.registerBinding(_6a1,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_6a4){
ControlBinding.superclass.handleAction.call(this,_6a4);
switch(_6a4.type){
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
function ControlImageProfile(_6a5){
this.binding=_6a5;
}
ControlImageProfile.prototype._getImage=function(_6a6){
var _6a7=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6a7=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6a7=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6a7=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6a7=this.constructor.IMAGE_CLOSE;
break;
}
return _6a7.replace("${string}",_6a6);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6a8=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6a8=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6a8?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6a9){
ControlBoxBinding.superclass.handleAction.call(this,_6a9);
switch(_6a9.type){
case ControlBinding.ACTION_COMMAND:
var _6aa=_6a9.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6aa);
Application.unlock(self);
},0);
_6a9.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6ac){
switch(_6ac.controlType){
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
ControlBoxBinding.prototype.setState=function(_6ad){
var _6ae=this.getState();
this.setProperty("state",_6ad);
this.detachClassName(_6ae);
this.attachClassName(_6ad);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6af=this.getProperty("state");
if(!_6af){
_6af=ControlBoxBinding.STATE_NORMAL;
}
return _6af;
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
MenuContainerBinding.prototype.isOpen=function(_6b0){
var _6b1=null;
if(!_6b0){
_6b1=this._isOpen;
}else{
_6b1=(_6b0==this._openElement);
}
return _6b1;
};
MenuContainerBinding.prototype.setOpenElement=function(_6b2){
if(_6b2){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6b2;
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
var _6b3=this.getChildBindingByLocalName("menupopup");
if(_6b3&&_6b3!=this.menuPopupBinding){
this.menuPopupBinding=_6b3;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6b4=this.getMenuContainerBinding();
_6b4.setOpenElement(this);
var _6b5=this.getMenuPopupBinding();
_6b5.snapTo(this.bindingElement);
_6b5.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6b6){
MenuContainerBinding.superclass.handleAction.call(this,_6b6);
if(_6b6.type==PopupBinding.ACTION_HIDE){
var _6b7=this.getMenuContainerBinding();
_6b7.setOpenElement(false);
this.reset();
_6b6.consume();
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
MenuBarBinding.prototype.handleAction=function(_6b8){
MenuBarBinding.superclass.handleAction.call(this,_6b8);
switch(_6b8.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b9=_6b8.target;
var _6ba=this.getChildBindingsByLocalName("menu");
while(_6ba.hasNext()){
var menu=_6ba.getNext();
}
switch(_6b9.arrowKey){
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
var _6bc=this.getProperty("image");
var _6bd=this.getProperty("label");
var _6be=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6bd){
this.setLabel(_6bd);
}
if(_6bc){
this.setImage(_6bc);
}
if(_6be){
this.setToolTip(_6be);
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
MenuBinding.prototype.setLabel=function(_6c0){
this.setProperty("label",_6c0);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c0));
}
};
MenuBinding.prototype.setToolTip=function(_6c1){
this.setProperty("tooltip",_6c1);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c1));
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
var _6c3=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6c3.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6c3.isOpen()&&!_6c3.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6c3.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6c3.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6c4,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6c4){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c9){
switch(_6c9.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6ca=null;
var _6cb=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c9.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6cd){
for(var key in this._focused){
if(key!=_6cd.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6cd.key]=_6cd;
this._lastFocused=_6cd;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6d0){
delete this._focused[_6d0.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6d1){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6d1);
}
if(_6d1){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6d4=this.getChildBindingsByLocalName("menugroup");
var _6d5=null;
var _6d6=null;
while(_6d4.hasNext()){
var _6d7=_6d4.getNext();
if(!_6d7.isDefaultContent){
_6d7.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6d5&&_6d7.isVisible){
_6d5=_6d7;
}
if(_6d7.isVisible){
_6d6=_6d7;
}
}
}
if(_6d5&&_6d6){
_6d5.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6d6.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6d8){
MenuBodyBinding.activeInstance=this;
if(_6d8){
var _6d9=this._getMenuItems().getFirst();
if(_6d9){
_6d9.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6da=this._lastFocused;
if((_6da!=null)&&(!_6da.isMenuContainer)){
_6da.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6dc=this._getMenuItems();
var _6dd=null;
var next=null;
if(this._lastFocused){
_6dd=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6dc.getPreceding(_6dd);
break;
case KeyEventCodes.VK_DOWN:
next=_6dc.getFollowing(_6dd);
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
next=_6dc.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6e0=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6e1){
_6e0=_6e1.getChildBindingsByLocalName("menuitem");
_6e0.each(function(item){
list.add(item);
});
});
_6e0=this.getChildBindingsByLocalName("menuitem");
_6e0.each(function(item){
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
MenuBodyBinding.newInstance=function(_6e4){
var _6e5=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6e4);
return UserInterface.registerBinding(_6e5,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6e6){
switch(_6e6){
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
MenuGroupBinding.newInstance=function(_6e7){
var _6e8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e7);
return UserInterface.registerBinding(_6e8,MenuGroupBinding);
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
var _6e9=this.getProperty("image");
var _6ea=this.getProperty("image-hover");
var _6eb=this.getProperty("image-active");
var _6ec=this.getProperty("image-disabled");
if(!this.image&&_6e9){
this.image=_6e9;
}
if(!this.imageHover&&_6ea){
this.imageHover=_6e9;
}
if(!this.imageActive&&_6eb){
this.imageActive=_6eb;
}
if(!this.imageDisabled&&_6ec){
this.imageDisabled=_6ec;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6ed=this.getProperty("label");
var _6ee=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6f0=this.getProperty("isdisabled");
var _6f1=this.getProperty("image");
var _6f2=this.getProperty("image-hover");
var _6f3=this.getProperty("image-active");
var _6f4=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6f5=this.getMenuPopupBinding();
if(_6f5){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6f1){
this.image=_6f1;
}
if(!this.imageHover&&_6f2){
this.imageHover=_6f1;
}
if(!this.imageActive&&_6f3){
this.imageActive=_6f3;
}
if(!this.imageDisabled&&_6f4){
this.imageDisabled=_6f4;
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
if(_6ed!=null){
this.setLabel(_6ed);
}
if(_6ee){
this.setToolTip(_6ee);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6f0==true){
this.disable();
}
var _6f6=this.getProperty("oncommand");
if(_6f6){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6f6);
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
MenuItemBinding.prototype.setLabel=function(_6f9){
this.setProperty("label",_6f9);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f9));
}
};
MenuItemBinding.prototype.setToolTip=function(_6fa){
this.setProperty("tooltip",_6fa);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6fa));
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
var _6fc=this.bindingDocument.createElement("div");
_6fc.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6fc.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6fd=this.labelBinding.bindingElement;
_6fd.insertBefore(_6fc,_6fd.firstChild);
_6fc.style.display="none";
this.shadowTree.checkBoxIndicator=_6fc;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6fc=this.bindingDocument.createElement("div");
_6fc.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6fc.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6fd=this.labelBinding.bindingElement;
_6fd.insertBefore(_6fc,_6fd.firstChild);
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
var _6ff=this.imageProfile.getDisabledImage();
if(_6ff){
this.setImage(_6ff);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6ff=this.imageProfile.getDefaultImage();
if(_6ff){
this.setImage(_6ff);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _701=this.getMenuContainerBinding();
if(_701.isOpen()&&!_701.isOpen(this)){
_701._openElement.hide();
_701.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _701=this.getMenuContainerBinding();
if(!_701.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_703){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _704=this.getMenuContainerBinding();
if(!_704||!_704.isOpen(this)||_703){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_705){
this.setChecked(true,_705);
};
MenuItemBinding.prototype.uncheck=function(_706){
this.setChecked(false,_706);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_707,_708){
this.setProperty("ischecked",_707);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_707){
this.isChecked=_707;
this.shadowTree.checkBoxIndicator.style.display=_707?"block":"none";
if(!_708){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_709){
var _70a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_709);
UserInterface.registerBinding(_70a,MenuItemBinding);
return UserInterface.getBinding(_70a);
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
PopupSetBinding.newInstance=function(_70b){
var _70c=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_70b);
return UserInterface.registerBinding(_70c,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_70d,arg){
switch(_70d){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _711=PopupBinding.activeInstances.get(key);
var _712=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_711);
if(!_712){
list.add(_711);
}
});
list.each(function(_713){
_713.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _715=PopupBinding.activeInstances.get(key);
_715.hide();
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
var _716=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _717=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_716){
this._bodyBinding=UserInterface.getBinding(_716);
}else{
if(_717){
this._bodyBinding=UserInterface.getBinding(_717);
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
var _718=this.getProperty("position");
this.position=_718?_718:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_719){
var _71a=null;
if(this._bodyBinding){
this._bodyBinding.add(_719);
_71a=_719;
}else{
_71a=PopupBinding.superclass.add.call(this,_719);
}
return _71a;
};
PopupBinding.prototype.addFirst=function(_71b){
var _71c=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_71b);
_71c=_71b;
}else{
_71c=PopupBinding.superclass.addFirst.call(this,_71b);
}
return _71c;
};
PopupBinding.prototype.handleAction=function(_71d){
PopupBinding.superclass.handleAction.call(this,_71d);
var _71e=_71d.target;
switch(_71d.type){
case Binding.ACTION_ATTACHED:
if(_71e instanceof MenuItemBinding){
this._count(true);
_71d.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_71e instanceof MenuItemBinding){
this._count(false);
_71d.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_71f){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_71f?1:-1);
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
PopupBinding.prototype.snapTo=function(_720){
var _721=this._getElementPosition(_720);
switch(this.position){
case PopupBinding.POSITION_TOP:
_721.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_721.x+=_720.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_721.y+=_720.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_721.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_720;
this.bindingElement.style.display="block";
this.setPosition(_721.x,_721.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_723){
this.bindingElement.style.display="block";
this.setPosition(_723.x,_723.y);
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
PopupBinding.prototype._getElementPosition=function(_728){
return _728.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_728):DOMUtil.getUniversalPosition(_728);
};
PopupBinding.prototype._getMousePosition=function(e){
var _72a=DOMEvents.getTarget(e);
return _72a.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_72b){
var _72c=this.bindingElement;
if(_72b){
_72c.style.visibility="visible";
}else{
_72c.style.visibility="hidden";
_72c.style.display="none";
}
this.isVisible=_72b;
};
PopupBinding.prototype._enableTab=function(_72d){
var self=this;
var _72f=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_72f.each(function(_730){
_730.bindingElement.tabIndex=_72d?0:-1;
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
var _738=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_738.y<0){
y=-_738.y;
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
PopupBinding.prototype.grabKeyboard=function(_73a){
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
var _740=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_740=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _740;
};
PopupBinding.prototype.clear=function(){
var _741=this._bodyBinding;
if(_741){
_741.detachRecursive();
_741.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_742){
var _743=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_742);
return UserInterface.registerBinding(_743,PopupBinding);
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
PopupBodyBinding.newInstance=function(_745){
var _746=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_745);
return UserInterface.registerBinding(_746,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_747){
return new Point(_747.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_748){
var _749=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_748);
return UserInterface.registerBinding(_749,MenuPopupBinding);
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
var _74a=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_74a){
this._body=UserInterface.getBinding(_74a);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _74b=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_74b.hasNext()){
var _74c=DialogBorderBinding.newInstance(this.bindingDocument);
_74c.setType(_74b.getNext());
this.add(_74c);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _74d=this.getProperty("controls");
if(_74d){
var _74e=new List(_74d.split(" "));
while(_74e.hasNext()){
var type=_74e.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _750=DialogControlBinding.newInstance(this.bindingDocument);
_750.setControlType(type);
this._titlebar.addControl(_750);
this.controlBindings[type]=_750;
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
var _751=this.getProperty("image");
var _752=this.getProperty("label");
var _753=this.getProperty("draggable");
var _754=this.getProperty("resizable");
var _755=this.getProperty("modal");
if(_751){
this.setImage(_751);
}
if(_752){
this.setLabel(_752);
}
if(_753==false){
this.isDialogDraggable=false;
}
if(_754==false){
this.isPanelResizable=false;
}
if(_755==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_756){
this.isModal=_756;
};
DialogBinding.prototype.setLabel=function(_757){
this.setProperty("label",_757);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_757));
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
DialogBinding.prototype.handleAction=function(_759){
DialogBinding.superclass.handleAction.call(this,_759);
switch(_759.type){
case Binding.ACTION_DRAG:
var _75a=_759.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_75a.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_75a.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_75a;
_75a.dragger.registerHandler(this);
}
break;
}
}
_759.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_759.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_75b,arg){
DialogBinding.superclass.handleBroadcast.call(this,_75b,arg);
switch(_75b){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_75d){
DialogBinding.superclass.handleInvokedControl.call(this,_75d);
switch(_75d.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_75e){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_75e){
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
var _760=self.bindingElement;
setTimeout(function(){
_760.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_761){
this.bindingElement.style.zIndex=new String(_761);
};
DialogBinding.prototype.onDragStart=function(_762){
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
DialogBinding.prototype.setResizable=function(_774){
if(this._isResizable!=_774){
if(_774){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_774;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _775=null;
var _776=this.bindingDocument.body.offsetWidth;
var _777=this.bindingDocument.body.offsetHeight;
_775={x:0.125*_776,y:0.125*_777,w:0.75*_776,h:0.5*_777};
return _775;
};
DialogBinding.prototype.centerOnScreen=function(){
var _778=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_778.w-dim.w),0.5*(_778.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _77a=this;
var i=0;
function blink(){
if(i%2==0){
_77a.detachClassName("active");
}else{
_77a.attachClassName("active");
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
var _77e="";
while(list.hasNext()){
var type=list.getNext();
_77e+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_77e);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_77f);
return UserInterface.registerBinding(_780,DialogBinding);
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
DialogHeadBinding.newInstance=function(_781){
var _782=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_781);
return UserInterface.registerBinding(_782,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_785){
var _786=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_785);
return UserInterface.registerBinding(_786,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_787){
var _788=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_787);
return UserInterface.registerBinding(_788,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_789){
DialogSetBinding.superclass.handleAction.call(this,_789);
var _78a=_789.target;
switch(_789.type){
case Binding.ACTION_MOVETOTOP:
if(_78a instanceof DialogBinding){
this._moveToTop(_78a);
}
break;
case Binding.ACTION_MOVEDONTOP:
_789.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_78b){
var _78c=0;
var _78d=this.getChildBindingsByLocalName("dialog");
_78d.each(function(_78e){
var _78f=_78e.getZIndex();
_78c=_78f>_78c?_78f:_78c;
});
_78b.setZIndex(_78c+2);
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
DialogBorderBinding.newInstance=function(_791){
var _792=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_791);
return UserInterface.registerBinding(_792,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_793){
this._dialogBinding=_793;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_795){
DialogCoverBinding.superclass.handleAction.call(this,_795);
var _796=_795.target;
if(this._dialogBinding.isModal){
switch(_795.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_796==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_796.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_797,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_797,arg);
switch(_797){
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
var _79a=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_79a);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _79b=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_79b);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_79c){
var _79d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_79c);
return UserInterface.registerBinding(_79d,DialogCoverBinding);
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
var _79e=this.getProperty("image");
if(_79e){
this.setImage(_79e);
}
var _79f=this.getProperty("label");
if(_79f){
this.setLabel(_79f);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_7a0){
if(this.isAttached){
this.labelBinding.setLabel(_7a0);
}
this.setProperty("label",_7a0);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_7a2){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_7a2);
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
DialogTitleBarBinding.newInstance=function(_7a3){
var _7a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_7a3);
return UserInterface.registerBinding(_7a4,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_7a5){
var _7a6=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_7a5);
return UserInterface.registerBinding(_7a6,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7a7){
var _7a8=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a7);
return UserInterface.registerBinding(_7a8,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7a9){
this.binding=_7a9;
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
var _7ac=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7ad=node.nodeName.toLowerCase();
switch(_7ad){
case "script":
case "style":
case "textarea":
_7ac=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7ac;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7b4=true;
if(exp.test(text)){
self._textnodes.add(node);
_7b4=false;
}
return _7b4;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7b5,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7b5,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b9=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b9+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7bf){
var _7c0="";
var _7c1="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7c2="</span>";
var self=this;
function iterate(_7c4){
var _7c5=-1;
var _7c6=null;
self._map.each(function(key,exp){
var low=_7c4.toLowerCase();
var _7ca=low.search(exp);
if(_7ca>-1){
if(_7c5==-1){
_7c5=_7ca;
}
if(_7ca<=_7c5){
_7c5=_7ca;
_7c6=key;
}
}
});
if(_7c5>-1&&_7c6!=null){
var pre=_7c4.substring(0,_7c5);
var hit=_7c4.substring(_7c5,_7c5+_7c6.length);
var pst=_7c4.substring(_7c5+_7c6.length,_7c4.length);
_7c0+=pre+_7c1+hit+_7c2;
iterate(pst);
}else{
_7c0+=_7c4;
}
}
iterate(_7bf);
return _7c0;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7ce){
var _7cf=new List(_7ce.getElementsByTagName("span"));
_7cf.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7ce.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7d2){
var _7d3=null;
if(_7d2.isAttached){
var doc=_7d2.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7d3=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7d3 instanceof SOAPFault){
_7d3=null;
}
}
}
return _7d3;
};
WindowBinding.highlightKeywords=function(_7d7,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d7.isAttached){
var doc=_7d7.getContentDocument();
if(doc!=null){
var _7da=WindowBinding._highlightcrawler;
_7da.reset(doc.body);
if(list!=null){
_7da.setKeys(list);
_7da.crawl(doc.body);
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
var _7db=WindowBinding.superclass.serialize.call(this);
if(_7db){
_7db.url=this.getURL();
}
return _7db;
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
var _7dd=this.getContentWindow().DocumentManager;
if(_7dd!=null){
_7dd.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7de){
WindowBinding.superclass.handleAction.call(this,_7de);
var _7df=_7de.target;
switch(_7de.type){
case RootBinding.ACTION_PHASE_3:
if(_7df.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7df);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7de.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7e0){
if(!this.isFit||_7e0){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7e1){
if(this._pageBinding==null){
if(_7e1.bindingWindow==this.getContentWindow()){
this._pageBinding=_7e1;
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
WindowBinding.prototype._registerOnloadListener=function(_7e2){
var _7e3=this.shadowTree.iframe;
var _7e4=_7e2?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e7=true;
if(Client.isExplorer){
_7e7=_7e3.readyState=="complete";
}
if(_7e7==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7e4](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7e8){
var _7e9=_7e8?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e9](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7ee=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7ee.getQueryString().each(function(name,_7f0){
if(_7f0.length>512){
data.set(name,_7f0);
_7ee.setParam(name,null);
}
});
url=_7ee.toString();
}
if(data){
var self=this;
var _7f2=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7f2.id;
form.setAttribute("target",_7f2.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7f5){
var _7f6=self.bindingDocument.createElement("input");
_7f6.name=name;
_7f6.value=_7f5;
_7f6.type="hidden";
form.appendChild(_7f6);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f7=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f7=url;
}
return _7f7;
};
WindowBinding.prototype.reload=function(_7f9){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7fa=null;
if(this.shadowTree.iframe!=null){
_7fa=this.shadowTree.iframe;
}
return _7fa;
};
WindowBinding.prototype.getContentWindow=function(){
var _7fb=null,_7fc=this.getFrameElement();
if(_7fc!==null){
try{
_7fb=_7fc.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7fb;
};
WindowBinding.prototype.getContentDocument=function(){
var _7fd=null,win=this.getContentWindow();
if(win){
_7fd=win.document;
}
return _7fd;
};
WindowBinding.prototype.getRootBinding=function(){
var _7ff=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7ff=UserInterface.getBinding(doc.body);
}
return _7ff;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_801){
this.bindingElement.style.height=_801+"px";
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
WindowBinding.prototype.handleCrawler=function(_802){
WindowBinding.superclass.handleCrawler.call(this,_802);
if(_802.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_802.nextNode=root.bindingElement;
}else{
_802.response=NodeCrawler.SKIP_CHILDREN;
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
var _807=this.getContentWindow();
if(_807!=null&&_807.document!=null&&_807.document.body!=null){
if(this.bindingElement.offsetHeight){
_807.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
if(this.bindingElement.offsetWidth){
_807.document.body.style.width=this.bindingElement.offsetWidth+"px";
}
}
}
};
WindowBinding.newInstance=function(_808){
var _809=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_808);
var _80a=UserInterface.registerBinding(_809,WindowBinding);
return _80a;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_80e){
_80e.target.show();
_80e.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_810){
_810.target.show();
_810.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_812){
PreviewWindowBinding.superclass.handleAction.call(this,_812);
switch(_812.type){
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
var _813=null;
this._getRadioButtonBindings().each(function(_814){
if(_814.getProperty("ischecked")){
_813=_814;
return false;
}else{
return true;
}
});
if(_813){
this._checkedRadioBinding=_813;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_815){
RadioGroupBinding.superclass.handleAction.call(this,_815);
var _816=_815.target;
switch(_815.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_815.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_816.isRadioButton&&!_816.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_816);
}
this._checkedRadioBinding=_816;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_815.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_817,_818){
if(_817 instanceof RadioDataBinding){
_817=_817.getButton();
}
if(_817.isRadioButton){
switch(_818){
case true:
this._unCheckRadioBindingsExcept(_817);
this._checkedRadioBinding=_817;
_817.check(true);
break;
default:
_817.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_819){
var _81a=this._getRadioButtonBindings();
_81a.each(function(_81b){
if(_81b.isChecked&&_81b!=_819){
_81b.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _81c=new Crawler();
var list=new List();
_81c.addFilter(function(_81e){
var _81f=true;
var _820=UserInterface.getBinding(_81e);
if(_820 instanceof RadioGroupBinding){
_81f=NodeCrawler.SKIP_CHILDREN;
}else{
if(_820 instanceof ButtonBinding&&_820.isRadioButton){
list.add(_820);
}
}
return _81f;
});
_81c.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_821){
var _822=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_821);
return UserInterface.registerBinding(_822,RadioGroupBinding);
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
var _824=this.getProperty("regexrule");
if(_824!=null){
this.expression=new RegExp(_824);
}
var _825=this.getProperty("onbindingblur");
if(_825!=null){
this.onblur=function(){
Binding.evaluate(_825,this);
};
}
var _826=this.getProperty("onvaluechange");
if(_826!=null){
this.onValueChange=function(){
Binding.evaluate(_826,this);
};
}
if(this.error==null&&this.type!=null){
var _827=DataBinding.errors[this.type];
if(_827!=null){
this.error=_827;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _828=this.getProperty("value");
if(_828!=null){
this.setValue(String(_828));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _82a=this.getProperty("isdisabled");
if(_82a==true){
this.setDisabled(true);
}
var _82b=this.getProperty("readonly");
if(_82b==true){
this.setReadOnly(true);
}
var _82c=this.getProperty("autoselect");
if(_82c==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _82d=Localization.currentLang();
if(_82d!=null){
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
var _82e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_82e.type=this.isPassword==true?"password":"text";
_82e.tabIndex=-1;
return _82e;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_831){
if(_831){
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
DataInputBinding.prototype.focus=function(_833){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_833){
var self=this,_835=this.bindingElement,_836={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_835,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_835,DOMEvents.MOUSEUP,_836);
}else{
this.select();
}
}
this.onfocus();
if(!_833){
var _837=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_837);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _838=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _839=_838.createTextRange();
_839.moveStart("character",0);
_839.moveEnd("character",_838.value.length);
_839.select();
}else{
_838.setSelectionRange(0,_838.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_83a){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_83a){
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
DataInputBinding.prototype.validate=function(_83e){
if(_83e==true||this._isValid){
var _83f=this.isValid();
if(_83f!=this._isValid){
this._isValid=_83f;
if(!_83f){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _840=null;
if(this._isInvalidBecauseRequired==true){
_840=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_840=DataBinding.warnings["minlength"];
_840=_840.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_840=DataBinding.warnings["maxlength"];
_840=_840.replace("${count}",String(this.maxlength));
}else{
_840=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_840!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_840);
}
}else{
this.setValue(_840);
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
var _841=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _842=this.getValue();
if(_842==""){
if(this.isRequired==true){
_841=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _843=DataBinding.expressions[this.type];
if(!_843.test(_842)){
_841=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_842)){
_841=false;
}
}
}
}
if(_841&&this.minlength!=null){
if(_842.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_841=false;
}
}
if(_841&&this.maxlength!=null){
if(_842.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_841=false;
}
}
return _841;
};
DataInputBinding.prototype.setDisabled=function(_844){
if(_844!=this.isDisabled){
if(_844){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _845=this.shadowTree.input;
if(_844){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_845,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_845,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_844;
this.shadowTree.input.unselectable=_844?"on":"off";
}
this.isDisabled=_844;
this.isFocusable=!_844;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_847){
if(_847!=this.isReadOnly){
if(_847){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_847;
this.isReadOnly=_847;
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
DataInputBinding.prototype.handleElement=function(_848){
return true;
};
DataInputBinding.prototype.updateElement=function(_849){
var _84a=_849.getAttribute("value");
var _84b=_849.getAttribute("type");
var _84c=_849.getAttribute("maxlength");
var _84d=_849.getAttribute("minlength");
var _84e=_849.getAttribute("required")==="true";
if(_84a==null){
_84a="";
}
var _84f=this.bindingWindow.UpdateManager;
if(this.getValue()!=_84a){
_84f.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_84a);
}
if(this.type!=_84b){
_84f.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_84b;
}
if(this.maxlength!=_84c){
_84f.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_84c;
}
if(this.minlength!=_84d){
_84f.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_84d;
}
if(this.isRequired!=_84e){
_84f.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_84e;
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
DataInputBinding.prototype.setValue=function(_850){
if(_850===null){
_850="";
}
if(_850!=this.getValue()){
this.setProperty("value",_850);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_850);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _851=null;
if(this.shadowTree.input!=null){
_851=this.shadowTree.input.value;
}else{
_851=this.getProperty("value");
}
return _851;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _853=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_853=Number(_853);
break;
}
return _853;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_854){
var _855=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_854);
return UserInterface.registerBinding(_855,DataInputBinding);
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
var _856=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_856!=null){
this.setValue(_856.value);
_856.parentNode.removeChild(_856);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _857;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_857=div.firstChild;
}else{
_857=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_857.tabIndex=-1;
return _857;
};
TextBoxBinding.prototype.handleElement=function(_859){
return true;
};
TextBoxBinding.prototype.updateElement=function(_85a){
var _85b,area=_85a.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_85b=DOMUtil.getTextContent(area);
}
if(_85b==null){
_85b="";
}
var _85d=this.bindingWindow.UpdateManager;
if(this.getValue()!=_85b){
_85d.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_85b);
}
var _85e=_85a.getAttribute("type");
if(this.type!=_85e){
_85d.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_85e;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_862){
var _863=this.bindingDocument.selection.createRange();
var _864=_863.text=="";
if(_864&&!_862){
_863.text="\t";
}else{
var text="";
var _866=_863.text.length;
while((_863.moveStart("word",-1)&&_863.text.charAt(1)!="\n")){
}
_863.moveStart("character",1);
var _867=0;
var i=0,line,_86a=_863.text.split("\n");
while((line=_86a[i++])!=null){
if(_862){
line=line.replace(/^(\s)/mg,"");
_867++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_86a[i+1]?"\n":"");
}
_863.text=text;
_863.moveStart("character",-_866);
if(_862){
_863.moveStart("character",2*_86a.length-2);
}
_863.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86b=this.bindingDocument.selection.createRange();
var _86c=_86b.duplicate();
while((_86c.moveStart("word",-1)&&_86c.text.indexOf("\n")==-1)){
}
_86c.moveStart("character",1);
_86b.text="\n"+_86c.text.match(/^(\s)*/)[0]+"!";
_86b.moveStart("character",-1);
_86b.select();
_86b.text="";
_86b.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_86d){
var _86e;
var _86f;
var oss;
var osy;
var i;
var fnd;
var _874=this._getSelectedText();
var el=this.shadowTree.input;
_86e=el.scrollLeft;
_86f=el.scrollTop;
if(!_874.match(/\n/)){
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
_874=this._getSelectedText();
if(_86d){
ntext=_874.replace(/^(\s)/mg,"");
}else{
ntext=_874.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_874.length);
}
el.scrollLeft=_86e;
el.scrollTop=_86f;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _876;
var _877;
var oss;
var osy;
var el=this.shadowTree.input;
_876=el.scrollLeft;
_877=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_876;
el.scrollTop=_877;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _87e=this.shadowTree.input.value;
var _87f=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _87e.substr(_87f,end-_87f);
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
var _881=this.getProperty("isdisabled");
if(this.isDisabled||_881){
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
var _883=this.getProperty("label");
var _884=this.getProperty("value");
var _885=this.getProperty("width");
var _886=this.getProperty("onchange");
var _887=this.getProperty("required")==true;
var _888=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_883!=null){
this.label=_883;
}
if(!this.value&&_884!=null){
this.value=_884;
}
if(!this.width&&_885){
this.width=_885;
}
if(_887){
this.isRequired=true;
}
if(_888){
this._isLocal=true;
}
if(_886){
this.onValueChange=function(){
Binding.evaluate(_886,this);
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
var _889=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_889.name=this.getName();
_889.value=this.getValue();
_889.type="hidden";
if(this.hasCallBackID()){
_889.id=this.getCallBackID();
}
this.shadowTree.input=_889;
this.bindingElement.appendChild(_889);
};
SelectorBinding.prototype.buildButton=function(){
var _88a=this.BUTTON_IMPLEMENTATION;
var _88b=this.add(_88a.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_88b.imageProfile=this.imageProfile;
}
if(this.width!=null){
_88b.setWidth(this.width);
}
this._buttonBinding=_88b;
this.shadowTree.button=_88b;
_88b.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _88d;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _88e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_88e.id="selectorpopupset";
_88d=UserInterface.registerBinding(_88e,PopupSetBinding);
this.bindingDocument.body.appendChild(_88d.bindingElement);
}else{
_88d=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_88d=top.app.bindingMap.selectorpopupset;
}
var doc=_88d.bindingDocument;
var _890=_88d.add(PopupBinding.newInstance(doc));
var _891=_890.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_890;
this._menuBodyBinding=_891;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_890.attachClassName("selectorpopup");
_890.addActionListener(PopupBinding.ACTION_SHOW,this);
_890.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_890.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_890);
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
var _894=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_894).each(function(_895){
var _896=_895.getAttribute("label");
var _897=_895.getAttribute("value");
var _898=_895.getAttribute("selected");
var _899=_895.getAttribute("image");
var _89a=_895.getAttribute("image-hover");
var _89b=_895.getAttribute("image-active");
var _89c=_895.getAttribute("image-disabled");
var _89d=null;
if(_899||_89a||_89b||_89c){
_89d=new ImageProfile({image:_899,imageHover:_89a,imageActive:_89b,imageDisabled:_89c});
}
list.add(new SelectorBindingSelection(_896?_896:null,_897?_897:null,_898&&_898=="true",_89d));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _89f=null;
while(list.hasNext()){
var _8a0=list.getNext();
var item=this.addSelection(_8a0);
if(_8a0.isSelected){
this.select(item,true);
}
if(!_89f){
_89f=item;
}
}
if(!this._selectedItemBinding){
this.select(_89f,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_8a2,_8a3){
var _8a4=this.MENUITEM_IMPLEMENTATION;
var _8a5=this._menuBodyBinding;
var _8a6=_8a5.bindingDocument;
var _8a7=_8a4.newInstance(_8a6);
_8a7.imageProfile=_8a2.imageProfile;
_8a7.setLabel(_8a2.label);
if(_8a2.tooltip!=null){
_8a7.setToolTip(_8a2.tooltip);
}
_8a7.selectionValue=_8a2.value;
_8a2.menuItemBinding=_8a7;
if(_8a3){
_8a5.addFirst(_8a7);
this.selections.addFirst(_8a2);
}else{
_8a5.add(_8a7);
this.selections.add(_8a2);
}
this._isUpToDate=false;
return _8a7;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a8){
return this.addSelection(_8a8,true);
};
SelectorBinding.prototype.clear=function(_8a9){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a9&&this.defaultSelection!=null){
var _8aa=this.addSelection(this.defaultSelection);
this.select(_8aa,true);
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
SelectorBinding.prototype.setDisabled=function(_8ab){
if(this.isAttached==true){
var _8ac=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_8ab?"none":"block";
_8ac.setDisabled(_8ab);
}
if(_8ab){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8ad){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8ad);
}
};
SelectorBinding.prototype.handleAction=function(_8ae){
SelectorBinding.superclass.handleAction.call(this,_8ae);
switch(_8ae.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8ae.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8ae.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8ae.target);
_8ae.consume();
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
_8ae.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8b0){
this.select(_8b0);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8b1=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8b2=this._popupBinding.bindingElement;
_8b2.style.minWidth=_8b1;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8b4=Client.isExplorer?e.keyCode:e.which;
if(_8b4==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8b4=Client.isExplorer?e.keyCode:e.which;
if(_8b4>=32){
this._buttonBinding.check();
var _8b5=String.fromCharCode(_8b4);
this._pushSearchSelection(_8b5);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8b6){
this._searchString+=_8b6.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b7){
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
var _8b8=this._menuBodyBinding;
if(_8b8!=null){
var _8b9=this.MENUITEM_IMPLEMENTATION;
var _8ba=_8b8.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8bc=list.getNext();
if(_8bc.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8bc);
}
}
}
this._attachSelections();
var _8bd=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8be=_8b8.getDescendantBindingsByType(_8b9);
if(_8be.hasEntries()){
while(_8be.hasNext()){
var _8bf=_8be.getNext();
var _8c0=_8bf.labelBinding;
if(_8c0!=null&&_8c0.shadowTree!=null&&_8c0.shadowTree.labelText!=null){
_8c0.shadowTree.labelText.innerHTML=_8c0.shadowTree.labelText.innerHTML.replace(_8bd,"<b>$&</b>");
}
}
_8be.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8c0=LabelBinding.newInstance(_8ba);
_8c0.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b8.add(_8c0);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8bc=list.getNext();
var item=this.addSelection(_8bc);
if(this._selectionValue==_8bc.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8c2,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8c2,arg);
switch(_8c2){
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
SelectorBinding.prototype.select=function(_8c5,_8c6){
var _8c7=false;
if(_8c5!=this._selectedItemBinding){
this._selectedItemBinding=_8c5;
_8c7=true;
var _8c8=this._buttonBinding;
this._selectionValue=_8c5.selectionValue;
this._selectionLabel=_8c5.getLabel();
_8c8.setLabel(_8c5.getLabel());
if(_8c5.imageProfile!=null){
_8c8.imageProfile=_8c5.imageProfile;
}
if(_8c8.imageProfile!=null){
_8c8.setImage(this.isDisabled==true?_8c8.imageProfile.getDisabledImage():_8c8.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8c6){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8c6)){
this.validate();
}
}
return _8c7;
};
SelectorBinding.prototype._relate=function(){
var _8c9=this.getProperty("relate");
if(_8c9){
var _8ca=this.bindingDocument.getElementById(_8c9);
if(_8ca){
var _8cb=UserInterface.getBinding(_8ca);
if(_8cb){
if(this.isChecked){
_8cb.show();
}else{
_8cb.hide();
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
SelectorBinding.prototype.selectByValue=function(_8cc,_8cd){
var _8ce=false;
var _8cf=this._menuBodyBinding;
var _8d0=_8cf.getDescendantElementsByLocalName("menuitem");
while(_8d0.hasNext()){
var _8d1=UserInterface.getBinding(_8d0.getNext());
if(_8d1.selectionValue==_8cc){
_8ce=this.select(_8d1,_8cd);
break;
}
}
return _8ce;
};
SelectorBinding.prototype.getValue=function(){
var _8d2=this._selectionValue;
if(_8d2!=null){
_8d2=String(_8d2);
}
return _8d2;
};
SelectorBinding.prototype.setValue=function(_8d3){
this.selectByValue(String(_8d3),true);
};
SelectorBinding.prototype.getResult=function(){
var _8d4=this._selectionValue;
if(_8d4=="null"){
_8d4=null;
}
if(_8d4){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8d4=Number(_8d4);
break;
}
}
return _8d4;
};
SelectorBinding.prototype.setResult=function(_8d5){
this.selectByValue(_8d5,true);
};
SelectorBinding.prototype.validate=function(){
var _8d6=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d7=this.getValue();
if(_8d7==this.defaultSelection.value){
_8d6=false;
}
if(_8d6!=this._isValid){
if(_8d6){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8d6;
}
return _8d6;
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
var _8d8=this._popupBinding;
if(!this._isUpToDate){
_8d8.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d9,_8da){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d9));
return true;
};
SelectorBinding.newInstance=function(_8db){
var _8dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8db);
return UserInterface.registerBinding(_8dc,SelectorBinding);
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
var _8df=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8df){
this.onValueChange=function(){
Binding.evaluate(_8df,this);
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
SimpleSelectorBinding.prototype.focus=function(_8e2){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8e2){
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
SimpleSelectorBinding.prototype._hack=function(_8e3){
if(Client.isExplorer){
this._select.style.width=_8e3?"auto":this._cachewidth+"px";
if(_8e3){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8e4=true;
if(this.isRequired){
if(this.getValue()==null){
_8e4=false;
}
}
if(_8e4!=this._isValid){
if(_8e4){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8e5=this._select;
var _8e6=_8e5.options[_8e5.selectedIndex];
var text=DOMUtil.getTextContent(_8e6);
_8e5.blur();
_8e5.style.color="#A40000";
_8e5.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e6,DataBinding.warnings["required"]);
}
_8e5.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8e6,text);
}
};
}
this._isValid=_8e4;
}
return _8e4;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e8=null;
var _8e9=this._select;
var _8ea=_8e9.options[_8e9.selectedIndex];
var _8eb=true;
if(Client.isExplorer){
var html=_8ea.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8eb=false;
}
}
if(_8eb){
_8e8=_8ea.getAttribute("value");
}
return _8e8;
};
SimpleSelectorBinding.prototype.setValue=function(_8ed){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8ee){
this.setValue(_8ee);
};
SimpleSelectorBinding.newInstance=function(_8ef){
var _8f0=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8ef);
return UserInterface.registerBinding(_8f0,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8f1,_8f2,_8f3,_8f4,_8f5){
this._init(_8f1,_8f2,_8f3,_8f4,_8f5);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8f6,_8f7,_8f8,_8f9,_8fa){
if(_8f6!=null){
this.label=String(_8f6);
}
if(_8f7!=null){
this.value=String(_8f7);
}
if(_8f9!=null){
this.imageProfile=_8f9;
}
if(_8fa!=null){
this.tooltip=_8fa;
}
this.isSelected=_8f8?true:false;
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
var _8fb=this.getProperty("image");
if(_8fb){
this.setImage(_8fb);
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
var _8fe=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8fe.popupBindingTargetElement=this.shadowTree.input;
_8fe.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8fe.attach();
var self=this;
_8fe.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8fe;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _901=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_901).each(function(_902){
if(_902.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _903=_902.getAttribute("value");
var _904=_902.getAttribute("selected");
var _905=_902.getAttribute("tooltip");
list.add({value:_903?_903:null,toolTip:_905?_905:null,isSelected:(_904&&_904=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _907=this._menuBodyBinding;
var _908=_907.bindingDocument;
while(_907.bindingElement.hasChildNodes()){
var node=_907.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_907.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _90a=this.getProperty("emptyentrylabel");
if(_90a){
var _90b=MenuItemBinding.newInstance(_908);
_90b.setLabel(_90a);
_90b.selectionValue="";
_907.add(_90b);
}
while(list.hasNext()){
var _90c=list.getNext();
var _90b=MenuItemBinding.newInstance(_908);
_90b.setLabel(_90c.label?_90c.label:_90c.value);
_90b.selectionValue=_90c.value;
if(_90c.image){
_90b.setImage(_90c.image);
}
if(_90c.toolTip){
_90b.setToolTip(_90c.toolTip);
}
if(_90c.isSelected){
this.select(_90b,true);
}
_907.add(_90b);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_90d){
this.select(_90d);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_90e,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_90e,arg);
switch(_90e){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_90e,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_910){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_910);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_911){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_911);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _912=this.bindingElement.offsetWidth+"px";
var _913=this._popupBinding.bindingElement;
_913.style.minWidth=_912;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _914=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _915=this.getValue();
var _916=null;
_914.each(function(item){
if(item.getLabel()==_915){
_916=item;
}
});
if(_916){
_916.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_919){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_919){
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
DataInputSelectorBinding.prototype.setValue=function(_91a){
var _91b=this.isReadOnly;
var _91c=null;
if(_91a!=null&&_91a!=""){
var _91d=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_91d.hasNext()){
var item=_91d.getNext();
if(item.selectionValue==_91a){
_91c=item.getLabel();
break;
}
}
}
if(_91c!=null){
this.value=_91a;
this.shadowTree.input.value=_91c;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_91a);
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
var _920="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_920);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_920);
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
var _922=ToolBarButtonBinding.newInstance(this.bindingDocument);
_922.setImage("${icon:popup}");
this.addFirst(_922);
_922.attach();
var self=this;
_922.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _924=self.getProperty("handle");
var _925=ViewDefinition.clone(_924,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_925 instanceof DialogViewDefinition){
_925.handler={handleDialogResponse:function(_926,_927){
self._isButtonClicked=false;
if(_926==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _928=_927.getFirst();
self.setValue(_928);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_925.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_925);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_922.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_922;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _92a=this._dialogButtonBinding;
if(_92a!=null){
_92a.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _92c=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_92c=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _92c;
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
var _92f=ToolBarButtonBinding.newInstance(this.bindingDocument);
_92f.setImage("${icon:editor-sourceview}");
_92f.bindingElement.style.left="-24px";
_92f.bindingElement.style.width="24px";
this.addFirst(_92f);
_92f.attach();
_92f.hide();
var self=this;
_92f.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_92f;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_930){
UrlInputDialogBinding.superclass.setValue.call(this,_930);
if(this.isAttached){
this.compositeUrl=new Uri(_930);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _931=TreeService.GetCompositeUrlLabel(_930);
if(_931!=_930){
this.setLabel(_931);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_932){
this.buildButtonAndLabel();
if(this.shadowTree.labelInput){
if(_932){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_932;
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
var _933=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _934=this.getProperty("image");
if(_934!=null){
_933.setImage(_934);
}else{
_933.setImage("${icon:popup}");
}
this.addFirst(_933);
_933.attach();
var self=this;
_933.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_933;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _936=this._dialogButtonBinding;
if(_936!=null){
_936.oncommand();
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
var _937=this.getProperty("required")==true;
if(_937){
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
var _938=this.getProperty("label");
var _939=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_938!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_938+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_938);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_939!=null){
this._buttonBinding.setToolTip(_939);
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
var div=this.bindingDocument.createElement("div");
div.className="tabliner";
this.bindingElement.insertBefore(div,this.bindingElement.firstChild);
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
TreeBodyBinding.prototype.handleAction=function(_c59){
TreeBodyBinding.superclass.handleAction.call(this,_c59);
switch(_c59.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c59.target);
_c59.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c5a){
var _c5b=_c5a.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c5b.offsetTop;
var h=_c5b.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c5b.scrollIntoView(true);
}else{
if(y-t+h>a){
_c5b.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_c61){
var _c62=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c61);
return UserInterface.registerBinding(_c62,TreeBodyBinding);
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
var _c63=TreeNodeBinding.superclass.serialize.call(this);
if(_c63){
_c63.label=this.getLabel();
_c63.image=this.getImage();
var _c64=this.getHandle();
if(_c64&&_c64!=this.key){
_c63.handle=_c64;
}
if(this.isOpen){
_c63.open=true;
}
if(this.isDisabled){
_c63.disabled=true;
}
if(this.dragType){
_c63.dragtype=this.dragType;
}
if(this.dragAccept){
_c63.dragaccept=this.dragAccept;
}
}
return _c63;
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
var _c66=UserInterface.getBinding(node);
if(_c66&&_c66.containingTreeBinding){
this.containingTreeBinding=_c66.containingTreeBinding;
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
var _c67=this.key;
var _c68=this.getProperty("handle");
if(_c68){
_c67=_c68;
}
return _c67;
};
TreeNodeBinding.prototype.setHandle=function(_c69){
this.setProperty("handle",_c69);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c6b=this.getProperty("label");
var _c6c=this.getProperty("tooltip");
var _c6d=this.getProperty("oncommand");
var _c6e=this.getProperty("onbindingfocus");
var _c6f=this.getProperty("onbindingblur");
var _c70=this.getProperty("focused");
var _c71=this.getProperty("callbackid");
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
if(_c6b!=null){
this.setLabel(_c6b);
}
if(_c6c!=null){
this.setToolTip(_c6c);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c73=this.bindingWindow.WindowManager;
if(_c6d!=null){
this.oncommand=function(){
Binding.evaluate(_c6d,this);
};
}
if(_c6e!=null){
this.onfocus=function(){
Binding.evaluate(_c6e,this);
};
}
if(_c6f!=null){
this.onblur=function(){
Binding.evaluate(_c6f,this);
};
}
if(_c70==true){
this.focus();
}
if(_c71!=null){
Binding.dotnetify(this,_c71);
}
};
TreeNodeBinding.prototype.handleAction=function(_c74){
TreeNodeBinding.superclass.handleAction.call(this,_c74);
switch(_c74.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c74.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c75,_c76){
var _c77=true;
if(_c75 instanceof TreeNodeBinding){
var _c78=false;
var _c79=this.bindingElement;
var _c7a=this.containingTreeBinding.bindingElement;
while(!_c78&&_c79!=_c7a){
if(_c79==_c75.getBindingElement()){
_c78=true;
}else{
_c79=_c79.parentNode;
}
}
if(_c78){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c77=false;
}else{
this.acceptTreeNodeBinding(_c75,_c76);
}
}else{
_c77=false;
}
return _c77;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c7b,_c7c){
var _c7d=_c7b.serializeToString();
var _c7e=new BindingParser(this.bindingDocument);
var _c7f=_c7e.parseFromString(_c7d).getFirst();
_c7c=_c7c?_c7c:this.containingTreeBinding.getDropIndex();
var _c80=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c7f,_c80.get(_c7c));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c7b.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c81=this.getProperty("image");
var _c82=this.getProperty("image-active");
var _c83=this.getProperty("image-disabled");
_c82=_c82?_c82:this.isContainer?_c81?_c81:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c81?_c81:TreeNodeBinding.DEFAULT_ITEM;
_c83=_c83?_c83:this.isContainer?_c81?_c81:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c81?_c81:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c81=_c81?_c81:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c81,imageHover:null,imageActive:_c82,imageDisabled:_c83});
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
TreeNodeBinding.prototype.setLabel=function(_c85){
this.setProperty("label",String(_c85));
if(this.isAttached){
this.labelBinding.setLabel(String(_c85));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c86){
this.setProperty("tooltip",String(_c86));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c86));
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
var _c87=this.imageProfile.getDefaultImage();
var _c88=this.imageProfile.getActiveImage();
_c88=_c88?_c88:_c87;
return this.isOpen?_c88:_c87;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c8a=DOMEvents.getTarget(e);
var _c8b=this.labelBinding.bindingElement;
var _c8c=this.labelBinding.shadowTree.labelBody;
var _c8d=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c8a){
case _c8b:
this._onAction(e);
break;
case _c8c:
case _c8d:
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
if(_c8a.parentNode==this.bindingElement&&_c8a.__updateType==Update.TYPE_INSERT){
var _c8b=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c8a)=="treenode"){
if(_c8a==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c8a,_c8b.nextSibling);
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
switch(_c8a){
case _c8b:
case _c8c:
case _c8d:
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
var _c91=true;
if(e.type=="mousedown"){
var _c92=e.button==(e.target?0:1);
if(!_c92){
_c91=false;
}
}
if(_c91){
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
var _c94=false;
if(e!=null){
_c94=e.shiftKey;
}
this.dispatchAction(_c94?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c97=this.getDescendantBindingsByLocalName("treenode");
_c97.each(function(_c98){
_c98.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c99){
var _c9a=_c99.getAttribute("focused");
if(_c9a=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c9b){
var _c9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c9b);
return UserInterface.registerBinding(_c9c,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c9d){
var _c9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c9d);
return UserInterface.registerBinding(_c9e,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c9f){
this.bindingElement.style.left=_c9f.x+"px";
this.bindingElement.style.top=_c9f.y+"px";
this._geometry.x=_c9f.x;
this._geometry.y=_c9f.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_ca0){
var _ca1=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_ca0);
return UserInterface.registerBinding(_ca1,TreePositionIndicatorBinding);
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
this.addFilter(function(_ca3){
var _ca4=UserInterface.getBinding(_ca3);
var _ca5=null;
var _ca5=null;
if(!_ca4 instanceof TreeNodeBinding){
_ca5=NodeCrawler.SKIP_NODE;
}
return _ca5;
});
this.addFilter(function(_ca6,list){
var _ca8=UserInterface.getBinding(_ca6);
var _ca9=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca8.isOpen){
list.add(_ca8);
}
break;
}
return _ca9;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_caa){
this.binding=_caa;
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
DockTabsButtonBinding.newInstance=function(_cab){
var _cac=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cab);
_cac.setAttribute("type","checkbox");
_cac.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cac.className="tabbutton";
return UserInterface.registerBinding(_cac,DockTabsButtonBinding);
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
var _cad=DockBinding.superclass.serialize.call(this);
if(_cad){
_cad.active=this.isActive?true:null;
_cad.collapsed=this.isCollapsed?true:null;
}
return _cad;
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
var _cae=UserInterface.getBinding(this.bindingElement.parentNode);
var _caf=MatrixBinding.newInstance(this.bindingDocument);
_caf.attachClassName("dockliner");
this.shadowTree.dockLiner=_caf;
_cae.add(_caf);
_caf.attach();
_caf.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_cb1){
var _cb2=this.getSelectedTabPanelBinding();
if(_cb2){
_cb2.isVisible=_cb1;
_cb2.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cb3){
var _cb4=this._getBindingForDefinition(_cb3);
var _cb5=DockTabBinding.newInstance(this.bindingDocument);
_cb5.setHandle(_cb3.handle);
_cb5.setLabel(_cb3.flowHandle?null:_cb3.label);
_cb5.setImage(_cb3.image);
_cb5.setToolTip(_cb3.toolTip);
_cb5.setEntityToken(_cb3.entityToken);
_cb5.setAssociatedView(_cb4);
this.appendTabByBindings(_cb5,null);
this._setupPageBindingListeners(_cb5);
var _cb6=this.getTabPanelBinding(_cb5);
_cb4.snapToBinding(_cb6);
var _cb7=this.bindingWindow.bindingMap.views;
_cb7.add(_cb4);
if(!this.isActive){
this.activate();
}
_cb4.attach();
};
DockBinding.prototype.prepareOpenView=function(_cb8,_cb9){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cb9.setLabel(_cb8.label);
_cb9.setImage(_cb8.image);
_cb9.setToolTip(_cb8.toolTip);
this._setupPageBindingListeners(_cb9);
var _cba=this.getTabPanelBinding(_cb9);
var _cbb=this._getBindingForDefinition(_cb8);
_cb9.setAssociatedView(_cbb);
_cbb.snapToBinding(_cba);
UserInterface.getBinding(this.bindingDocument.body).add(_cbb);
_cbb.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cbc){
var _cbd=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cbd.bindingDocument);
view.setDefinition(_cbc);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cbf){
var _cc0=this.getTabPanelBinding(_cbf);
var self=this;
var _cc2={handleAction:function(_cc3){
var _cc4=_cc3.target;
switch(_cc3.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cc4.reflex(true);
var view=_cbf.getAssociatedView();
if(_cc4.bindingWindow==view.getContentWindow()){
_cbf.updateDisplay(_cc4);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cbf.onPageInitialize(_cc4);
_cc3.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cbf.getAssociatedView();
if(_cc4.bindingWindow==view.getContentWindow()){
_cbf.updateDisplay(_cc4);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cbf.updateDisplay(_cc4);
_cc3.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cbf.updateEntityToken(_cc4);
_cc3.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cbf.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cbf.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cbf);
_cc3.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cbf,true);
_cc3.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cbf);
break;
case Binding.ACTION_FORCE_REFLEX:
_cc0.reflex(true);
_cc3.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cbf.isDirty){
_cbf.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cc6){
_cc0.addActionListener(_cc6,_cc2);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc7){
DockBinding.superclass.handleAction.call(this,_cc7);
var _cc8=_cc7.target;
switch(_cc7.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc7.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cc8 instanceof DockBinding){
if(_cc8.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cc8);
if(this.isActive){
_cc8.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cc8);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cc9,arg){
DockBinding.superclass.handleBroadcast.call(this,_cc9,arg);
switch(_cc9){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ccb=arg;
if(_ccb.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ccb.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_ccc){
var tabs=this.getTabBindings();
var _cce=false;
while(tabs.hasNext()&&!_cce){
var tab=tabs.getNext();
var _cd0=tab.getEntityToken();
if(_cd0!=null&&_cd0==_ccc){
if(!tab.isSelected){
this.select(tab,true);
_cce=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cd1){
this._handleCollapse(true,_cd1);
};
DockBinding.prototype.unCollapse=function(_cd2){
this._handleCollapse(false,_cd2);
};
DockBinding.prototype._handleCollapse=function(_cd3,_cd4){
var _cd5=this.getChildBindingByLocalName("dockpanels");
var _cd6=this.getAncestorBindingByLocalName("splitbox");
if(_cd3){
_cd5.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cd4&&_cd6.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cd5.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cd4){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cd3);
this.isCollapsed=_cd3;
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
DockBinding.prototype.closeTab=function(_cdb,_cdc){
if(_cdb.isDirty&&!_cdc){
var _cdd=Resolver.resolve(_cdb.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cdd),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cdf){
switch(_cdf){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cdb);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cdb);
break;
}
}});
}else{
this.removeTab(_cdb);
}
};
DockBinding.prototype.closeTabsExcept=function(_ce0){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ce0){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ce3){
var _ce4=_ce3.getAssociatedView();
_ce4.saveContainedEditor();
var self=this;
var _ce6={handleBroadcast:function(_ce7,arg){
switch(_ce7){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ce4.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ce6);
if(arg.isSuccess){
self.removeTab(_ce3);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ce6);
};
DockBinding.prototype.appendTabByBindings=function(_ce9,_cea){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ce9,_cea);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ceb){
_ceb=_ceb?_ceb+"px":"100%";
this.bindingElement.style.width=_ceb;
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
DockBinding.prototype.showControls=function(_cec){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cec){
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
var _cef=DockControlBinding.newInstance(this.bindingDocument);
_cef.setControlType(type);
return _cef;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cf1=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf1)){
_cf1=_cf1>0?_cf1-1:0;
self.bindingElement.style.width=new String(_cf1)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cf2){
DockTabsBinding.superclass.handleCrawler.call(this,_cf2);
switch(_cf2.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_cf5){
var _cf6=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cf5);
return UserInterface.registerBinding(_cf6,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cf7){
this._viewBinding=_cf7;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cf8=DockTabBinding.superclass.serialize.call(this);
if(_cf8){
_cf8.label=null;
_cf8.image=null;
_cf8.handle=this.getHandle();
}
return _cf8;
};
DockTabBinding.prototype.setHandle=function(_cf9){
this.setProperty("handle",_cf9);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cfa){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cfa;
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
var _cfb=DialogControlBinding.newInstance(this.bindingDocument);
_cfb.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cfb);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cfc){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cfc){
this.isDirty=_cfc;
if(Binding.exists(this.labelBinding)){
var _cfd=this.labelBinding.getLabel();
if(_cfd!=null){
this.labelBinding.setLabel(_cfc?"*"+_cfd:_cfd.slice(1,_cfd.length));
}else{
this.labelBinding.setLabel(_cfc?"*":"");
}
}
}
var _cfe=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cfe.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cfe.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cff){
this.setLabel(_cff.getLabel());
this.setImage(_cff.getImage());
this.setToolTip(_cff.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_d00){
this.setEntityToken(_d00.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d01){
DockTabBinding.superclass.handleAction.call(this,_d01);
var _d02=_d01.target;
switch(_d01.type){
case ControlBinding.ACTION_COMMAND:
if(_d02.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d01.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d02);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d03){
var cmd=_d03.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d05){
if(!_d05){
if(!this.getLabel()){
_d05=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d05=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d05=this.isDirty?"*"+_d05:_d05;
DockTabBinding.superclass.setLabel.call(this,_d05);
};
DockTabBinding.prototype.setImage=function(_d06){
if(!_d06){
if(!this.getImage()){
_d06=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d06=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d06);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d09=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d09;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d09;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d09;
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
var _d0b=this.bindingElement;
setTimeout(function(){
_d0b.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d0c,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d0c,arg);
if(this._viewBinding==null){
return;
}
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d0c){
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
DockTabBinding.prototype.select=function(_d11){
DockTabBinding.superclass.select.call(this,_d11);
this._updateBroadcasters();
if(_d11!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d12=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d13=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d13.enable();
if(this.isDirty){
_d12.enable();
}else{
_d12.disable();
}
}else{
_d13.disable();
_d12.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d14){
if(this._canUpdateTree||_d14){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d15=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d17=win.bindingMap.savebutton;
if(_d17!=null){
_d15=true;
}
}
}
return _d15;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d18){
var _d19=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d18);
return UserInterface.registerBinding(_d19,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d1a){
var _d1b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d1a);
return UserInterface.registerBinding(_d1b,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d1c){
DockPanelBinding.superclass.select.call(this,_d1c);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d1d){
DockPanelBinding.superclass.handleCrawler.call(this,_d1d);
if(_d1d.response==null){
if(_d1d.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d1d.id==FocusCrawler.ID){
_d1d.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d1e){
var _d1f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d1e);
return UserInterface.registerBinding(_d1f,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d20){
var _d21=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d20);
return UserInterface.registerBinding(_d21,DockControlBinding);
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
ViewBinding.getInstance=function(_d22){
var _d23=ViewBinding._instances.get(_d22);
if(!_d23){
var cry="ViewBinding.getInstance: No such instance: "+_d22;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d23;
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
var _d26=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d26){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d27=snap.boxObject.getGlobalPosition();
var _d28=snap.boxObject.getDimension();
if(!Point.isEqual(_d27,this._lastknownposition)){
this.setPosition(_d27);
this._lastknownposition=_d27;
}
if(!Dimension.isEqual(_d28,this._lastknowndimension)){
this.setDimension(_d28);
this._lastknowndimension=_d28;
var _d29=_d28.h-ViewBinding.VERTICAL_ADJUST;
_d29=_d29<0?0:_d29;
this.windowBinding.getBindingElement().style.height=new String(_d29)+"px";
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
var _d2a=this._viewDefinition.flowHandle;
if(_d2a!=null){
FlowControllerService.CancelFlow(_d2a);
}
}
if(this._viewDefinition!=null){
var _d2b=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d2b);
this.logger.fine("ViewBinding closed: \""+_d2b+"\"");
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
var _d2d=null;
if(this._viewDefinition!=null){
_d2d=this._viewDefinition.handle;
}
return _d2d;
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
ViewBinding.prototype.setDefinition=function(_d2e){
this._viewDefinition=_d2e;
if(_d2e.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d2f){
ViewBinding.superclass.handleAction.call(this,_d2f);
var _d30=_d2f.target;
switch(_d2f.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d2f.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d30.isActivated){
_d30.onActivate();
}
}
_d2f.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d30==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d2f.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d30==this._snapBinding){
if(_d30.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d30.getContentWindow().isPostBackDocument){
if(_d2f.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d30.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d30==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d30.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d2f.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d2f.type==WindowBinding.ACTION_ONLOAD){
var win=_d30.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d30);
}
}
}
_d2f.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d30.label&&this._viewDefinition.label){
_d30.label=this._viewDefinition.label;
}
if(!_d30.image&&this._viewDefinition.image){
_d30.image=this._viewDefinition.image;
}
if(_d30.bindingWindow==this.getContentWindow()){
this._pageBinding=_d30;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d30.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d30==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d2f.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d2f.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d35,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d35,arg);
switch(_d35){
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
var _d39=def.argument;
if(_d39!=null){
page.setPageArgument(_d39);
}
var _d3a=def.width;
if(_d3a!=null){
page.width=_d3a;
}
var _d3b=def.height;
if(_d3b!=null){
page.height=_d3b;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d3c){
ViewBinding.superclass.handleCrawler.call(this,_d3c);
switch(_d3c.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d3c.id==FocusCrawler.ID){
if(_d3c.previousNode!=this._snapBinding.bindingElement){
_d3c.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d3c.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d3d){
_d3d.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d3d.x+"px";
this.bindingElement.style.top=_d3d.y+"px";
};
ViewBinding.prototype.setDimension=function(_d3e){
_d3e.h-=ViewBinding.VERTICAL_ADJUST;
_d3e.w-=ViewBinding.HORIZONTAL_ADJUST;
_d3e.w-=1;
if(_d3e.h<0){
_d3e.h=0;
}
if(_d3e.w<0){
_d3e.w=0;
}
this.bindingElement.style.width=String(_d3e.w)+"px";
this.bindingElement.style.height=String(_d3e.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d3f){
this.isFlexBoxBehavior=false;
_d3f.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d3f.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d3f.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d3f;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d40=null;
if(this.isFreeFloating==true){
_d40=this._snapBinding.getBindingElement();
}else{
_d40=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d40;
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
ViewBinding.prototype.reload=function(_d41){
this._isLoaded=false;
this.windowBinding.reload(_d41);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d42=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d42=true;
}
}
if(!_d42){
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
ViewBinding.newInstance=function(_d46){
var _d47=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d46);
var _d48=UserInterface.registerBinding(_d47,ViewBinding);
_d48.windowBinding=_d48.add(WindowBinding.newInstance(_d46));
return _d48;
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
var _d50=this.bindingWindow.__doPostBack;
var _d51=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d51){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d52,_d53){
if(!form.__isSetup){
Application.lock(self);
_d51=true;
}
self.manifestAllDataBindings();
_d50(_d52,_d53);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d54,list){
var _d56=this.bindingWindow.bindingMap.__REQUEST;
if(_d56!=null&&this._isDotNet()){
switch(_d54){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d56.postback(_d54);
}
}
break;
default:
_d56.postback(_d54);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d54,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d57,list){
var _d59=this.getDescendantBindingsByType(WindowBinding);
_d59.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d57,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d5d){
if(_d5d.name==null||_d5d.name==""){
return;
}
list.add({name:_d5d.name,value:_d5d.value});
});
var out="";
list.each(function(_d5f){
out+=_d5f.name+": "+_d5f.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d60){
PageBinding.superclass.handleAction.call(this,_d60);
var _d61=_d60.target;
switch(_d60.type){
case RootBinding.ACTION_PHASE_3:
if(_d61==UserInterface.getBinding(this.bindingDocument.body)){
_d61.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d61);
}
_d60.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d62=this.validateAllDataBindings();
if(_d62){
this.doPostBack(_d61);
}
}
_d60.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d60.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d61.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d61.key)){
this._initBlockers.del(_d61.key);
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
var _d64={handleAction:function(_d65){
if(_d65.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d64);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d64);
}else{
MessageQueue.udpdate();
}
_d60.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d66,arg){
PageBinding.superclass.handleBroadcast.call(this,_d66,arg);
switch(_d66){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d68=arg;
if(!this._canPostBack&&!_d68){
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
PageBinding.prototype.doPostBack=function(_d6a){
if(this._canPostBack){
if(_d6a!=null&&this._isDotNet()){
var _d6b=_d6a.getCallBackID();
var _d6c=_d6a.getCallBackArg();
if(_d6b!=null){
_d6b=_d6b.replace(/_/g,"$");
}else{
_d6b="";
}
if(_d6c==null){
_d6c="";
}
this.bindingWindow.__doPostBack(_d6b,_d6c);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d6d){
var _d6e=true;
var _d6f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6f.hasNext()&&_d6e){
var _d70=_d6f.getNext();
if(_d70.isAttached){
var _d71=_d70.validate();
if(_d6e&&!_d71){
_d6e=false;
this.logger.debug("Invalid DataBinding: "+_d70.toString()+" ("+_d70.getName()+")");
if(_d6d){
var _d72=_d70.getAncestorBindingByType(TabPanelBinding);
if(_d72!=null&&!_d72.isVisible){
var _d73=_d72.getAncestorBindingByType(TabBoxBinding);
var _d74=_d73.getTabBinding(_d72);
_d73.select(_d74);
}
}
break;
}
}
}
return _d6e;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d76=this.bindingWindow.DataManager.getAllDataBindings();
while(_d76.hasNext()){
var _d77=_d76.getNext();
if(_d77.isAttached){
var _d78=_d77.manifest();
if(_d78!=null){
list.add(_d78);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d79=this.bindingWindow.DataManager.getAllDataBindings();
while(_d79.hasNext()){
var _d7a=_d79.getNext();
if(_d7a.isAttached){
_d7a.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d7b="";
if(!_d7b&&this.labelfield){
var _d7c=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d7c!=null&&_d7c.getLabel){
_d7b=_d7c.getLabel();
}else{
if(_d7c!=null&&_d7c.getValue){
_d7b=_d7c.getValue();
}
}
}
if(!_d7b&&this.label){
_d7b=this.label;
}
return _d7b;
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
var _d7f=this._cachedFocus.getBinding();
if(_d7f){
_d7f.blur();
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
var _d80=this.getProperty("width");
if(!_d80){
_d80=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d80;
}
if(this.height==null){
var _d81=this.getProperty("height");
this.height=_d81?_d81:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d82=this.getProperty("minheight");
if(_d82!=null){
this.minheight=_d82;
}
}
if(this.controls==null){
var _d83=this.getProperty("controls");
this.controls=_d83?_d83:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d84=this.getProperty("resizable");
this.isResizable=_d84?_d84:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d85){
if(_d85!=this.isAutoHeightLayoutMode){
if(_d85){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d85;
}
};
DialogPageBinding.prototype.handleAction=function(_d86){
DialogPageBinding.superclass.handleAction.call(this,_d86);
var _d87=_d86.target;
switch(_d86.type){
case PageBinding.ACTION_ATTACHED:
if(_d87!=this&&_d87.isFitAsDialogSubPage){
_d87.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d86.consume();
if(_d87.response!=null){
this.response=_d87.response;
switch(_d87.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d88){
var _d89=this.bindingWindow.bindingMap.buttonAccept;
if(_d89!=null){
_d89.setDisabled(_d88);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d8a){
var _d8b=CSSComputer.getPadding(this.bindingElement);
var _d8c=CSSComputer.getBorder(this.bindingElement);
_d8a+=_d8b.top+_d8b.bottom;
_d8a+=_d8c.top+_d8c.bottom;
if(_d8a>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d8a+"px";
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
EditorPageBinding.prototype.handleAction=function(_d94){
EditorPageBinding.superclass.handleAction.call(this,_d94);
var _d95=_d94.target;
switch(_d94.type){
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
var _d96=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d95.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d96==-1){
_d96=0;
}
}else{
_d96++;
}
return res;
});
if(_d96>-1){
this._messengers.del(_d96);
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
_d94.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d95.key,_d95);
if(_d95 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d95.key);
if(_d95 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d95==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d95.getSelectedTabBinding();
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
_d94.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d95==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d94.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d95==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d94.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d95==this._windowBinding){
if(_d95.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d9b=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d9b);
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
var _d9c=this.bindingWindow.bindingMap.savebutton;
if(_d9c!=null&&!_d9c.isDisabled){
_d9c.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9d=this.bindingWindow.bindingMap.__REQUEST;
if(_d9d!=null){
_d9d.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9e=this.bindingWindow.bindingMap.__REQUEST;
if(_d9e!=null){
_d9e.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d9f){
this._message=null;
switch(_d9f){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d9f,this._messengers);
if(!this._messengers.hasEntries()){
if(_d9f==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d9f;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d9f;
EditorPageBinding.superclass.postMessage.call(this,_d9f,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d9f,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_da0,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_da0,arg);
switch(_da0){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _da2=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_da2);
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
var _da3=new List();
this._invalidBindings.each(function(key,_da5){
var list=_da5.getInvalidLabels();
if(list){
list.each(function(_da7){
_da3.add(_da7);
});
}
});
if(_da3.hasEntries()){
var _da8="";
while(_da3.hasNext()){
_da8+=_da3.getNext().toLowerCase();
if(_da3.hasNext()){
_da8+=", ";
}else{
_da8+=".";
}
}
var _da9=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da9+" "+_da8);
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
EditorPageBinding.prototype.enableSave=function(_daa){
var _dab=this.bindingDocument.getElementById("broadcasterCanSave");
if(_dab){
var _dac=UserInterface.getBinding(_dab);
if(_daa){
_dac.enable();
}else{
_dac.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _dad=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_dad!=null){
UserInterface.getBinding(_dad).enable();
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
var _dae=this._windowBinding.getContentDocument().title;
if(_dae==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _daf=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_db1){
if(_db1.name=="__EVENTTARGET"&&_daf){
_db1.value=_daf;
}
list.add({name:_db1.name,value:_db1.value});
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
var _db3=this.getProperty("responseid");
this.responseid=_db3;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_db4){
ResponsePageBinding.superclass.handleAction.call(this,_db4);
switch(_db4.type){
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
WizardPageBinding.prototype.handleAction=function(_db5){
WizardPageBinding.superclass.handleAction.call(this,_db5);
var _db6=_db5.target;
switch(_db5.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_db6);
}else{
_db5.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_db6);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_db5.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_db5.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db7){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db9=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db7);
}
if(_db9){
_db9.setDisabled(!_db7);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dba,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dba,arg);
var self=this;
switch(_dba){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dbe){
};
MarkupAwarePageBinding.prototype._activate=function(_dbf){
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
var _dc0=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dc0.boxObject.getDimension().w;
_dc0.hide();
var _dc1=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dc1+"px";
var self=this;
var _dc3=this.bindingWindow.bindingMap.moreactionsbutton;
_dc3.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dc4){
self._showMoreActions();
_dc4.consume();
}});
var _dc5=this.bindingWindow.bindingMap.moreactionspopup;
_dc5.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dc6){
var item=_dc6.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dc8,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dc8,arg);
switch(_dc8){
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
var _dcc=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dcc!=null){
_dcc.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dcd=this.bindingWindow.WindowManager;
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
var _dce=new String("");
this._actionProfile.each(function(_dcf,list){
list.each(function(_dd1){
_dce+=_dd1.getHandle()+";"+_dd1.getKey()+";";
if(_dd1.isDisabled()){
_dce+="isDisabled='true';";
}
});
});
return _dce;
};
SystemToolBarBinding.prototype.handleAction=function(_dd2){
SystemToolBarBinding.superclass.handleAction.call(this,_dd2);
switch(_dd2.type){
case ButtonBinding.ACTION_COMMAND:
var _dd3=_dd2.target;
this._handleSystemAction(_dd3.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dd4){
if(_dd4!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dd6=list.getFirst();
var _dd7=_dd6.node;
}
SystemAction.invoke(_dd4,_dd7);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dda,list){
var _ddc=new List();
list.reset();
while(list.hasNext()){
var _ddd=list.getNext();
var _dde=null;
if(_ddd.isInToolBar()){
if(_ddd.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dde=self.getToolBarButtonBinding(_ddd);
}
}
if(_dde!=null){
_ddc.add(_dde);
}
}
if(_ddc.hasEntries()){
var _ddf=ToolBarGroupBinding.newInstance(doc);
_ddc.each(function(_de0){
_ddf.add(_de0);
});
self.addLeft(_ddf);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _de1=this.bindingWindow.bindingMap.toolsbutton;
var _de2=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _de3=_de1.bindingElement.offsetLeft-this._moreActionsWidth;
if(Localization.isUIRtl){
_de3=this.bindingElement.offsetWidth-_de1.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _de4=0;
var _de5=new List();
var _de6,_de7=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_de6=_de7.getNext())!=null){
if(!_de6.isVisible){
_de6.show();
}
_de4+=_de6.boxObject.getDimension().w;
if(_de4>=_de3){
_de5.add(_de6);
_de6.hide();
}
}
if(_de5.hasEntries()){
var _de8=_de5.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_de8).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_de6=_de5.getNext())!=null){
this._moreActions.add(_de6.associatedSystemAction);
}
_de2.show();
}else{
this._moreActions=null;
_de2.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _de9=this.bindingWindow.bindingMap.moreactionspopup;
_de9.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_de9.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_de9.add(item);
}
_de9.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_deb){
var _dec=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _ded=_deb.getLabel();
var _dee=_deb.getToolTip();
var _def=_deb.getImage();
var _df0=_deb.isDisabled();
if(_def&&_def.indexOf("size=")==-1){
_def=_def+"&size="+this.getImageSize();
_dec.imageProfile=new ImageProfile({image:_def});
}
if(_ded){
_dec.setLabel(_ded);
}
if(_dee){
_dec.setToolTip(_dee);
}
if(_deb.isDisabled()){
_dec.disable();
}
_dec.associatedSystemAction=_deb;
return _dec;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _df1=this.getDescendantBindingByLocalName("toolbarbutton");
if(_df1!=null){
_df1.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_df2){
var _df3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_df2);
return UserInterface.registerBinding(_df3,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_df4){
var _df5=SystemTreeBinding.superclass.add.call(this,_df4);
if(!this._defaultTreeNode){
if(_df4 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_df4;
}
}
return _df5;
};
SystemTreeBinding.prototype.handleAction=function(_df6){
SystemTreeBinding.superclass.handleAction.call(this,_df6);
var _df7=_df6.target;
switch(_df6.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df7.key);
this._updateFocusedNode();
_df6.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_df6.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df7.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_df6.consume();
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
var _df9=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df9);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dfa){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dfa);
var reg=this._entityTokenRegistry;
var _dfc=_dfa.node.getEntityToken();
if(reg.has(_dfc)){
reg.get(_dfc).add(_dfa);
}else{
reg.set(_dfc,new List([_dfa]));
}
var _dfd=null;
if(this.isLockedToEditor){
if(_dfc==StageBinding.entityToken){
if(_dfa.node.isTreeLockEnabled()){
_dfd=_dfa;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dfa.node.getHandle()){
_dfd=_dfa;
}
}
}
if(_dfd!=null){
this.focusSingleTreeNodeBinding(_dfd);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dfe){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dfe);
var reg=this._entityTokenRegistry;
var _e00=_dfe.node.getEntityToken();
if(reg.has(_e00)){
var list=reg.get(_e00);
list.del(_dfe);
if(!list.hasEntries()){
reg.del(_e00);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dfe.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dfe.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e04=this._refreshingTreeNodes;
if(_e04.hasEntries()&&_e04.has(key)){
_e04.del(key);
if(!_e04.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e05=StageBinding.entityToken;
if(_e05!=null){
this._focusTreeNodeByEntityToken(_e05);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e06=false;
var _e07=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e06=false;
}else{
if(_e07.hasEntries()){
_e06=true;
while(_e06&&_e07.hasNext()){
var _e08=_e07.getNext();
if(!_e08.isDraggable){
_e06=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e06;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e09,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e09,arg);
switch(_e09){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e09,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e09);
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
var self=this,_e0d=arg;
setTimeout(function(){
if(_e0d!=null){
self._focusTreeNodeByEntityToken(_e0d);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e0f=tab.perspectiveNode==null;
if(!_e0f){
_e0f=tab.perspectiveNode==this.perspectiveNode;
}
if(_e0f){
var self=this,_e11=tab.getEntityToken();
setTimeout(function(){
if(_e11!=null){
self._focusTreeNodeByEntityToken(_e11);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e12,_e13){
this.isLockFeatureFocus=true;
var _e14=null;
if(this._entityTokenRegistry.has(_e12)){
var list=this._entityTokenRegistry.get(_e12);
list.each(function(tn){
var _e17=true;
if(tn.node.isTreeLockEnabled()){
_e14=tn;
_e17=false;
}
return _e17;
});
if(_e14!=null){
if(!_e14.isFocused){
this.focusSingleTreeNodeBinding(_e14,true);
}else{
_e14.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e14==null&&_e13!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e12);
self._focusTreeNodeByEntityToken(_e12,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e19){
var _e1a=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e1b=this.getRootTreeNodeBindings();
while(_e1b.hasNext()){
var _e1c=_e1b.getNext();
_e1a.add(_e1c.node.getEntityToken());
}
}else{
_e1a.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e1a.hasNext()){
var _e1d=_e1a.getNext();
var _e1e=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e1d,_e19,_e1e);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e21=this._treeNodeBindings;
var _e22=new Map();
function fix(_e23,list){
if(!_e23.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e21.has(node.getHandle())){
var _e26=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e22.set(node.getHandle(),_e26);
_e23.add(_e26);
}
});
_e23.attachRecursive();
}
}
_e23.open(true);
}
map.each(function(_e27,list){
if(_e21.has(_e27)){
var _e29=_e21.get(_e27);
fix(_e29,list);
}else{
if(_e22.has(_e27)){
var _e2a=_e22.get(_e27);
fix(_e2a,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e2b,arg){
switch(_e2b){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2d=arg;
if(_e2d!=null){
this._invokeServerRefresh(_e2d);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e2e=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e2e;
_e2e.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e2e=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e2e;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e2f){
if(_e2f!=null&&_e2f=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e2f)){
var list=this._entityTokenRegistry.get(_e2f).reset();
this._refreshToken=_e2f;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e31=list.getNext();
this._refreshingTreeNodes.set(_e31.key,true);
setTimeout(function(){
_e31.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e32=this.getFocusedTreeNodeBindings().getFirst();
if(_e32){
var _e33=_e32.getLabel();
var _e34=_e32.getAncestorBindingByLocalName("treenode");
if(_e34){
_e32=_e34;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e32.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e35=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e35,[_e33]);
}
_e32.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e36=SystemTreeBinding.clipboard;
if(_e36){
var type=_e36.dragType;
var _e38=this.getFocusedTreeNodeBindings().getFirst();
if(_e38.dragAccept){
if(_e38.acceptor.isAccepting(type)){
this._performPaste(_e38);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e39){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e39.node.hasDetailedDropSupport()){
if(_e39.node.hasChildren()){
var _e3b=_e39.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e3c,_e3d){
if(_e3c==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e3e=_e3d.get("switch");
var _e3f=_e3d.get("sibling");
if(_e3e=="after"){
_e3f++;
}
var _e40=_e39.accept(SystemTreeBinding.clipboard,_e3f);
if(_e40){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e3b);
}else{
Application.lock(self);
var _e41=_e39.accept(SystemTreeBinding.clipboard,0);
if(_e41){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e41=_e39.accept(SystemTreeBinding.clipboard,0);
if(_e41){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e42=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e42!=null){
this._focusTreeNodeByEntityToken(_e42);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e43){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e43){
this.blurSelectedTreeNodes();
var _e44=this.getRootTreeNodeBindings();
_e44.each(function(_e45){
if(_e45.isContainer&&_e45.isOpen){
_e45.close();
_e45.hasBeenOpened=false;
_e45.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e46){
if(_e46!=this.isLockedToEditor){
this.isLockedToEditor=_e46;
if(_e46){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e48=this.getRootTreeNodeBindings();
_e48.each(function(_e49){
var _e4a=_e49.getOpenSystemNodes();
if(_e4a!=null&&_e4a.hasEntries()){
list.merge(_e4a);
}else{
if(_e49.isOpen){
list.add(_e49.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e4b){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e4b);
if(_e4b!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e4c){
if(_e4c){
var list=new List(_e4c.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e4e=new Map();
var _e4f=this.getFocusedTreeNodeBindings();
var _e50=_e4f.getFirst().node.getActionProfile();
if(_e50!=null){
var self=this;
_e50.each(function(_e52,list){
var _e54=new List();
list.each(function(_e55){
if(_e55.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e55.getGroupName()]){
_e54.add(_e55);
}
}
});
if(_e54.hasEntries()){
_e4e.set(_e52,_e54);
}
});
}
_e4e.activePosition=this._activePosition;
return _e4e;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e56,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e56,arg);
switch(_e56){
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
var _e5b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e5b.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e5c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e5c.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e5d){
SystemTreePopupBinding.superclass.handleAction.call(this,_e5d);
switch(_e5d.type){
case MenuItemBinding.ACTION_COMMAND:
var _e5e=_e5d.target;
var _e5f=_e5e.associatedSystemAction;
if(_e5f){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e61=list.getFirst();
var _e62=_e61.node;
}
SystemAction.invoke(_e5f,_e62);
}else{
var cmd=_e5e.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e65=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e65=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e65=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e65=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e65=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e65){
setTimeout(function(){
EventBroadcaster.broadcast(_e65);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e66=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e66.hasNext()){
var _e67=UserInterface.getBinding(_e66.getNext());
if(!_e67.getProperty("rel")){
_e67.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e69=new List();
var self=this;
this._actionProfile.each(function(_e6b,list){
var _e6d=MenuGroupBinding.newInstance(doc);
list.each(function(_e6e){
var _e6f=self.getMenuItemBinding(_e6e);
_e6d.add(_e6f);
});
_e69.add(_e6d);
});
_e69.reverse();
while(_e69.hasNext()){
this._bodyBinding.addFirst(_e69.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e70){
var _e71=MenuItemBinding.newInstance(this.bindingDocument);
var _e72=_e70.getLabel();
var _e73=_e70.getToolTip();
var _e74=_e70.getImage();
var _e75=_e70.getDisabledImage();
var _e76=_e70.isCheckBox();
if(_e72){
_e71.setLabel(_e72);
}
if(_e73){
_e71.setToolTip(_e73);
}
if(_e74){
_e71.imageProfile=new ImageProfile({image:_e74,imageDisabled:_e75});
}
if(_e76){
_e71.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e70.isChecked()){
_e71.check(true);
}
}
if(_e70.isDisabled()){
_e71.disable();
}
_e71.associatedSystemAction=_e70;
return _e71;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e7a=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e7a=UserInterface.getBinding(node);
if(_e7a.isDisabled){
_e7a=null;
}
}
break;
}
if(_e7a!=null&&_e7a.node!=null&&_e7a.node.getActionProfile()!=null){
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
var _e7b=this.node.getLabel();
if(_e7b){
this.setLabel(_e7b);
}
var _e7c=this.node.getToolTip();
if(_e7c){
this.setToolTip(_e7c);
}
var _e7d=this.node.getHandle();
if(_e7d){
this.setHandle(_e7d);
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
var _e80="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e80+=list.getNext();
if(list.hasNext()){
_e80+=" ";
}
}
this.setProperty("dragaccept",_e80);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e82){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e82);
switch(_e82.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e82.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e82.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e83,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e83,arg);
switch(_e83){
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
var _e86=null;
var _e87=this.node.getImageProfile();
if(_e87){
if(this.isOpen){
_e86=_e87.getActiveImage();
}else{
_e86=_e87.getDefaultImage();
}
}
if(!_e86){
_e86=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e86;
};
SystemTreeNodeBinding.prototype.open=function(_e88){
var _e89=this.isContainer&&!this.isOpen;
var _e8a=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e89&&(_e8a||SystemTreeBinding.HAS_NO_MEMORY)&&_e88!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e8b=null;
if(this.isContainer){
_e8b=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e8b);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e8d){
if(_e8d!=null){
this._refreshBranch(_e8d);
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
var _e8e=new List();
var _e8f=this.node.getChildren();
this.empty();
if(_e8f.hasEntries()){
this._insertTreeNodesRegulated(_e8f);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e90){
var _e91=0;
var _e92=new List([]);
while(_e90.hasEntries()&&_e91<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e93=SystemTreeNodeBinding.newInstance(_e90.extractFirst(),this.bindingDocument);
_e93.autoExpand=this.autoExpand;
this.add(_e93);
_e93.attach();
_e91++;
if(this.autoExpand){
if(_e91==1&&!_e90.hasEntries()||LocalStore.openedNodes.has(_e93.node)){
_e92.add(_e93);
}
}
}
if(_e90.hasEntries()){
this._insertBufferTreeNode(_e90);
}
_e92.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e96){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e98=this.node.getDescendantBranch(list);
if(_e98.hasEntries()){
this.XXX(_e98);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e99){
var self=this;
var map=new Map();
this.empty();
_e99.each(function(key,_e9d){
if(_e9d.hasEntries()){
_e9d.each(function(node){
var _e9f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e9f);
if(map.has(key)){
var _ea0=map.get(key);
_ea0.add(_e9f);
_ea0.isOpen=true;
_ea0.hasBeenOpened=true;
node.searchToken=_ea0.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e9f);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e99.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _ea1=new TreeCrawler();
var _ea2=new List();
_ea1.mode=TreeCrawler.MODE_GETOPEN;
_ea1.crawl(this.bindingElement,_ea2);
if(_ea2.hasEntries()){
_ea2.extractFirst();
}
_ea1.dispose();
return _ea2;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _ea3=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_ea3=new List([this.node]);
list.each(function(_ea5){
_ea3.add(_ea5.node);
});
}
return _ea3;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_ea6,_ea7){
var _ea8=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_ea6 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_ea6.node.getData(),this.node.getData(),_ea7?_ea7:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_ea8);
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
SystemTreeNodeBinding.newInstance=function(node,_eac){
var _ead=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_eac);
var _eae=UserInterface.registerBinding(_ead,SystemTreeNodeBinding);
_eae.node=node;
return _eae;
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
SystemPageBinding.prototype.setPageArgument=function(_eaf){
this.node=_eaf;
SystemPageBinding.superclass.setPageArgument.call(this,_eaf);
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
var _eb0=this.node.getChildren();
if(_eb0.hasEntries()){
while(_eb0.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_eb0.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _eb2=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_eb2.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _eb4=new TreeCrawler();
var _eb5=new List();
_eb4.mode=TreeCrawler.MODE_GETOPEN;
_eb4.crawl(this.bindingElement,_eb5);
_eb4.dispose();
var list=new List([this.node]);
_eb5.each(function(_eb7){
list.add(_eb7.node);
});
this._tree.empty();
var _eb8=this.node.getDescendantBranch(list);
if(_eb8.hasEntries()){
var self=this;
var map=new Map();
_eb8.each(function(key,_ebc){
_ebc.each(function(node){
var _ebe=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ebe);
if(map.has(key)){
var _ebf=map.get(key);
_ebf.add(_ebe);
_ebf.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ebe);
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
SystemPageBinding.prototype.handleAction=function(_ec0){
SystemPageBinding.superclass.handleAction.call(this,_ec0);
switch(_ec0.type){
case ButtonBinding.ACTION_COMMAND:
var _ec1=_ec0.target;
switch(_ec1.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ec1.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ec2,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ec2,arg);
switch(_ec2){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ec4=arg;
if(this.node&&this.node.getEntityToken()==_ec4){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ec4);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ec4);
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
StageContainerBinding.prototype.handleBroadcast=function(_ec6,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ec6,arg);
var _ec8=this.bindingWindow.WindowManager;
switch(_ec6){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ec8.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ec8.WINDOW_RESIZED_BROADCAST:
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
var _eca=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eca.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ecb){
if(StageBinding.isViewOpen(_ecb)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ecb);
}else{
var _ecc=ViewDefinitions[_ecb];
StageBinding.presentViewDefinition(_ecc);
}
};
StageBinding.isViewOpen=function(_ecd){
return StageBinding.bindingInstance._activeViewDefinitions[_ecd]!=null;
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
if(!Application.hasStartPage||!Application.hasExternalConnection){
top.app.bindingMap.defaultstartdeck.select();
this._isShowingDefaultStart=true;
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
this.handlePerspectiveChange(_ee3);
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
var _f4a=new StageCrawler();
_f4a.mode=mode;
_f4a.crawl(this.windowBinding.getContentDocument().body);
_f4a.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f4b){
return this._dockBindings.get(_f4b);
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
StageDeckBinding.newInstance=function(_f4d){
var _f4e=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f4d);
var _f4f=UserInterface.registerBinding(_f4e,StageDeckBinding);
return _f4f;
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
StageSplitBoxBinding.prototype.handleAction=function(_f50){
StageSplitBoxBinding.superclass.handleAction.call(this,_f50);
StageBoxAbstraction.handleAction.call(this,_f50);
var _f51=_f50.target;
var _f52=null;
var _f53=null;
switch(_f50.type){
case DockBinding.ACTION_EMPTIED:
_f53=this.getChildBindingByLocalName("splitter");
if(_f53.isVisible){
_f53.hide();
}
_f52=this.getDescendantBindingsByLocalName("dock");
if(_f52.getFirst().isEmpty&&_f52.getLast().isEmpty){
if(_f52.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f50.consume();
break;
case DockBinding.ACTION_OPENED:
_f52=this.getDescendantBindingsByLocalName("dock");
if(!_f52.getFirst().isEmpty&&!_f52.getLast().isEmpty){
_f53=this.getChildBindingByLocalName("splitter");
if(!_f53.isVisible){
_f53.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f50.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f51!=this){
_f53=this.getChildBindingByLocalName("splitter");
if(_f53.isVisible){
_f53.hide();
}
this.invokeLayout();
_f50.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f51!=this){
var _f54=this.getChildBindingsByLocalName("splitpanel");
if(_f54.getFirst().isVisible&&_f54.getLast().isVisible){
_f53=this.getChildBindingByLocalName("splitter");
if(!_f53.isVisible){
_f53.show();
}
}
this.invokeLayout();
_f50.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f55){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f55);
switch(_f55.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f55.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f56=this.getChildBindingsByLocalName("splitpanel");
return _f56.getFirst().isVisible&&_f56.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f57=this.getChildBindingsByLocalName("splitpanel");
return _f57.getFirst().isFixed&&_f57.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f58){
StageSplitPanelBinding.superclass.handleAction.call(this,_f58);
StageBoxAbstraction.handleAction.call(this,_f58);
switch(_f58.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f58.type==StageSplitBoxBinding.ACTION_HIDE){
_f58.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f58.type==DockBinding.ACTION_EMPTIED){
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
if(_f58.type==StageSplitBoxBinding.ACTION_SHOW){
_f58.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f5b=_f58.target;
if(_f5b!=this&&_f5b.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f5c=_f5b._containingSplitBoxBinding;
if(_f5c.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f5d=_f5c.getChildBindingsByLocalName("splitpanel");
var _f5e=_f5d.getFirst();
var _f5f=_f5d.getLast();
if(this.isFixed==true){
if(!_f5e.isFixed||!_f5f.isFixed||(!_f5c.hasBothPanelsVisible()&&_f5b.isMinimizedForReal)){
this.setFix(false);
_f58.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f5c.hasBothPanelsFixed()||(!_f5c.hasBothPanelsVisible()&&_f5b.isMinimizedForReal)){
this.setFix(_f5b.getContainedDock().getHeight());
_f58.consume();
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
var _f60=this.getContainedDock();
if(_f60){
if(this.isMaximizePrepared==true){
}else{
_f60.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f61=this.getContainedDock();
if(_f61){
if(_f61.type==DockBinding.TYPE_EDITORS){
if(_f61.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f61.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f62=this.getContainedDock();
if(_f62){
_f62.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f62);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f63=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f64=this.getContainedDock();
if(_f64){
_f64.collapse(_f63);
if(!_f63){
this.setFix(_f64.getHeight());
}else{
this.setFix(_f64.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f64&&_f64.isActive){
_f64.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f64);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f65){
var _f66=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f67=this.getContainedDock();
if(_f67){
if(this.isMinimized==true){
_f67.unCollapse(_f66);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f65){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f67){
_f67.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f67);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f68){
var _f69=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f69=false;
}
}
if(_f69==true){
this._invisibilize(_f68);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f6b){
if(_f6b!=this._isInvisibilized){
if(_f6b){
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
StageSplitterBinding.prototype.onDragStart=function(_f6c){
var _f6d=top.app.bindingMap.stagesplittercover;
var _f6e=this._containingSplitBoxBinding.getOrient();
switch(_f6e){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6d.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6d.bindingElement.style.cursor="n-resize";
break;
}
_f6d.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f6e);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f74){
this._orient=_f74;
this.attachClassName(_f74);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f76=true;
var _f77=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f77=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f76=false;
break;
}
if(_f76){
this.bindingElement.style.left=pos.x+"px";
}
if(_f77){
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
StageBoxAbstraction.handleAction=function(_f79){
switch(_f79.type){
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
if(_f79.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f79.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f7a=this.bindingElement.style;
_f7a.position="absolute";
_f7a.width="100%";
_f7a.height="100%";
_f7a.top="0";
_f7a.left="0";
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
var _f7b=this.bindingElement.style;
_f7b.position="relative";
_f7b.width="auto";
_f7b.height="auto";
_f7b.top="auto";
_f7b.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f7c,_f7d){
var _f7e=_f7c.bindingElement.style;
var _f7f=_f7c.bindingElement.parentNode;
var box=_f7c._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f7d){
_f7c._unmodifiedFlexMethod=_f7c.flex;
_f7c.flex=function(){
_f7e.width=_f7f.offsetWidth+"px";
_f7e.height=_f7f.offsetHeight+"px";
};
}else{
_f7e.width="100%";
_f7e.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f7e.width="auto";
_f7e.height="auto";
box.reflex(true);
},0);
}
_f7c.flex=_f7c._unmodifiedFlexMethod;
_f7c._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f81){
var _f82=_f81.target;
switch(_f81.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f82 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f81);
_f81.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f81.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f83){
var mode=null;
switch(_f83.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f85){
StageMenuBarBinding.superclass.handleAction.call(this,_f85);
switch(_f85.type){
case MenuItemBinding.ACTION_COMMAND:
var _f86=_f85.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f86){
SystemAction.invoke(_f86,this._rootNode);
}
}
_f85.consume();
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
var _f87=this.getProperty("handle");
if(_f87){
this._handle=_f87;
if(StageBinding.isViewOpen(_f87)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f87);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f89){
this.setProperty("handle",_f89);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f8a,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f8a,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f8a){
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
StageViewMenuItemBinding.newInstance=function(_f8c){
var _f8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f8c);
UserInterface.registerBinding(_f8d,StageViewMenuItemBinding);
return UserInterface.getBinding(_f8d);
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
StageStatusBarBinding.prototype.setLabel=function(_f8e){
this._label.setLabel(_f8e);
};
StageStatusBarBinding.prototype.setImage=function(_f8f){
this._label.setImage(_f8f);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f90){
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
var _f91=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f92=_f91.getAssociatedView();
var _f93=_f92.getContentWindow().bindingMap.tree;
var _f94=_f93.getFocusedTreeNodeBindings();
if(!_f94.hasEntries()&&StageBinding.treeSelector){
_f94=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f94;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f95=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f95.each(function(_f96){
LocalStore.focuseNodes.add(_f96.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f97=LocalStore.focuseNodes.getEntityTokens();
var _f98=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f99=_f98.getAssociatedView();
var _f9a=_f99.getContentWindow().bindingMap.tree;
_f97=new List(TreeService.GetCurrentLocaleEntityTokens(_f97.toArray()));
_f97.each(function(_f9b){
_f9a._focusTreeNodeByEntityToken(_f9b);
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
ExplorerBinding.prototype.handleAction=function(_f9c){
ExplorerBinding.superclass.handleAction.call(this,_f9c);
var _f9d=_f9c.target;
switch(_f9c.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f9c.consume();
break;
case Binding.ACTION_DRAG:
if(_f9d instanceof ExplorerSplitterBinding){
_f9d.dragger.registerHandler(this);
}
_f9c.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f9f){
this._menuBinding.setSelectionByHandle(_f9f);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fa0){
if(_fa0 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fa0);
this._menuBinding.mountDefinition(_fa0);
}
};
ExplorerBinding.prototype.onDragStart=function(_fa1){
var _fa2=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fa2.hasEntries()){
var _fa3=_fa2.getFirst();
this._dragStart=_fa3.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fa3.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa7){
if(_fa7 instanceof SystemViewDefinition){
var _fa8=ViewBinding.newInstance(this.bindingDocument);
_fa8.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa8.setDefinition(_fa7);
var _fa9=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa9.setAssociatedView(_fa8);
this._decks[_fa7.handle]=_fa9;
_fa9.add(_fa8);
this.add(_fa9);
function attach(){
_fa9.attach();
_fa8.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_faa){
var _fab=this._decks[_faa];
this.select(_fab);
};
DecksBinding.prototype.expandBy=function(_fac){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fae=this.bindingElement.offsetHeight+_fac;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fae+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fb0){
var _fb1=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fb0);
return UserInterface.registerBinding(_fb1,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fb2){
this._viewBinding=_fb2;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fb3=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fb4=this._viewBinding.getDefinition().label;
StatusBar.busy(_fb3,[_fb4]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fb5){
ExplorerDeckBinding.superclass.handleAction.call(this,_fb5);
var _fb6=_fb5.target;
switch(_fb5.type){
case PageBinding.ACTION_INITIALIZED:
if(_fb6 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fb6.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb7,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb7,arg);
switch(_fb7){
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
var _fb9=null;
if(this._isExplorerDeckBindingInitialized){
_fb9=this._viewBinding.getDefinition().label;
}else{
_fb9=DockTabBinding.LABEL_TABLOADING;
}
return _fb9;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fba=null;
if(this._isExplorerDeckBindingInitialized){
_fba=this._viewBinding.getDefinition().image;
}else{
_fba=DockTabBinding.IMG_TABLOADING;
}
return _fba;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fbb=null;
if(this._isExplorerDeckBindingInitialized){
_fbb=this._viewBinding.getDefinition().toolTip;
}
return _fbb;
};
ExplorerDeckBinding.newInstance=function(_fbc){
var _fbd=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fbc);
return UserInterface.registerBinding(_fbd,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fbe){
switch(_fbe.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fbe.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fbe.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fbe);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fbf){
this._maxButtons.set(_fbf.handle,this._mountMaxButton(_fbf));
this._minButtons.set(_fbf.handle,this._mountMinButton(_fbf));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fc0){
var _fc1=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fc1.setLabel(_fc0.label);
_fc1.setToolTip(_fc0.toolTip);
_fc1.handle=_fc0.handle;
_fc1.node=_fc0.node;
this._maxGroup.add(_fc1);
this._maxList.add(_fc1);
_fc1.attach();
if(Client.isPad){
_fc1.hide();
}
return _fc1;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fc2){
var _fc3=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fc3.setLabel(_fc2.label);
_fc3.setToolTip(_fc2.label);
_fc3.handle=_fc2.handle;
_fc3.node=_fc2.node;
this._minGroup.addFirst(_fc3);
this._minList.add(_fc3);
_fc3.attach();
if(!Client.isPad){
_fc3.hide();
}
return _fc3;
};
ExplorerMenuBinding.prototype.handleAction=function(_fc4){
ExplorerMenuBinding.superclass.handleAction.call(this,_fc4);
switch(_fc4.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fc5=_fc4.target;
var _fc6=_fc5.getCheckedButtonBinding();
var _fc7=_fc6.handle;
switch(_fc5){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fc7),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fc7),true);
break;
}
this._selectedHandle=_fc7;
this._selectedTag=_fc6.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fc4.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc8){
var _fc9=this._maxButtons.get(_fc8);
if(_fc9){
_fc9.check();
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
var _fca=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fca=true;
}
return _fca;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fcc=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fcc=true;
}
return _fcc;
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
ExplorerToolBarBinding.newInstance=function(_fcd){
var _fce=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fcd);
return UserInterface.registerBinding(_fce,ExplorerToolBarBinding);
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
var _fcf=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fd0=_fcf?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fd0);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fd1,_fd2){
var _fd3=(_fd2==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fd4=DOMUtil.createElementNS(Constants.NS_UI,_fd3,_fd1);
var _fd5=UserInterface.registerBinding(_fd4,ExplorerToolBarButtonBinding);
_fd5.explorerToolBarButtonType=_fd2;
return _fd5;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd6,_fd7,type){
type=type?type:"";
var _fd9=FunctionService.GetCustomEditorSettingsByMarkup(_fd6);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fd9){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fd9.Width?(_fd9.Width>dim.w?dim.w:_fd9.Width):undefined;
def.height=_fd9.Height?(_fd9.Height>dim.h?dim.h:_fd9.Height):undefined;
if(_fd9.Url){
_fd9.Url=_fd9.Url.indexOf("?")>-1?_fd9.Url+"&consoleId="+Application.CONSOLE_ID:_fd9.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd7;
def.argument={url:_fd9?_fd9.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd6}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fdc,_fdd){
var _fde=EditorBinding._components;
var _fdf=EditorBinding._editors;
var key=_fdd.key;
var _fe1=Interfaces.isImplemented(IWysiwygEditorComponent,_fdc);
if(!_fe1){
_fe1=Interfaces.isImplemented(ISourceEditorComponent,_fdc);
}
if(_fe1){
if(_fdf.has(key)){
_fdf.get(key).initializeEditorComponent(_fdc);
}else{
if(!_fde.has(key)){
_fde.set(key,new List());
}
_fde.get(key).add(_fdc);
}
}else{
throw "Editor component interface not implemented: "+_fdc;
}
};
EditorBinding.claimComponents=function(_fe2,_fe3){
var _fe4=EditorBinding._components;
var _fe5=EditorBinding._editors;
var key=_fe3.key;
_fe5.set(key,_fe2);
var list=null;
if(_fe4.has(key)){
list=_fe4.get(key).copy();
_fe4.del(key);
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
var _fe9=this.getProperty("value");
if(_fe9!=null){
_fe9=decodeURIComponent(_fe9);
this._startContent=_fe9;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _feb=this.bindingWindow.DataManager;
_feb.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fed){
var _fee=EditorBinding.claimComponents(this,_fed);
if(_fee!=null){
while(_fee.hasNext()){
this.initializeEditorComponent(_fee.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _ff0=this.bindingWindow.DataManager;
if(_ff0.getDataBinding(name)){
_ff0.unRegisterDataBinding(name);
}
_ff0.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ff1=this.getEditorDocument();
if(_ff1!=null){
Application.framework(_ff1);
DOMEvents.addEventListener(_ff1,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ff1,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ff1,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_ff1,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_ff3){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_ff3==true){
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
var _ff5=this.getCheckSum();
if(_ff5!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ff5;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff6=null;
if(Binding.exists(this._pageBinding)){
_ff6=this._pageBinding.getCheckSum(this._checksum);
}
return _ff6;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff8=DOMEvents.getTarget(e);
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
if(_ff8.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ffa,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ffa,arg);
var _ffc=null;
switch(_ffa){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ffd=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ffd=false;
}
}
}else{
_ffc=DOMEvents.getTarget(arg);
if(_ffc&&_ffc.ownerDocument==this.getEditorDocument()){
_ffd=false;
}
}
if(_ffd){
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
EditorBinding.prototype._activateEditor=function(_ffe){
if(_ffe!=this._isActivated){
this._isActivated=_ffe;
EditorBinding.isActive=_ffe;
var _fff=this.getEditorWindow().standardEventHandler;
var _1000=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1000!=null){
if(_ffe){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1000.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fff.enableNativeKeys(true);
}else{
_1000.disable();
_fff.disableNativeKeys();
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
var _1002=false;
try{
var _1003=this.getEditorWindow().getSelection();
if(_1003!=null){
_1002=_1003.toString().length>0;
if(!_1002){
var range=_1003.getRangeAt(0);
var frag=range.cloneContents();
var _1006=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1006.appendChild(frag.firstChild);
}
var img=_1006.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1002=true;
}
}
}
}
}
catch(exception){
}
return _1002;
};
EditorBinding.prototype.isCommandEnabled=function(_1008){
var _1009=true;
switch(_1008){
case "Cut":
case "Copy":
case "Paste":
_1009=this.getEditorDocument().queryCommandEnabled(_1008);
break;
}
return _1009;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _100d=false;
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
_100d=true;
}
break;
}
return _100d;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1010=this.getContentWindow().bindingMap.toolbar;
var _1011=_1010.getButtonForCommand(cmd);
if(!_1011){
throw "No button for command "+cmd;
}
return _1011;
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
EditorBinding.prototype.handleAction=function(_1015){
EditorBinding.superclass.handleAction.call(this,_1015);
var _1016=_1015.target;
var self=this;
var _1018=this.shadowTree.iframe;
switch(_1015.type){
case Binding.ACTION_DIRTY:
if(_1015.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1019){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1019);
};
EditorBinding.prototype.handleElement=function(_101a){
return true;
};
EditorBinding.prototype.updateElement=function(_101b){
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
var _101e=this._menuGroups[rel];
if(_101e instanceof List){
_101e.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1021=this._menuGroups[rel];
if(_1021 instanceof List){
_1021.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1023){
EditorPopupBinding.superclass.handleAction.call(this,_1023);
var _1024=_1023.target;
if(_1023.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1024.getProperty("cmd");
var gui=_1024.getProperty("gui");
var val=_1024.getProperty("val");
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
var _1028=this.bindingWindow.bindingMap.tinywindow;
var _1029=this.bindingWindow.bindingMap.codepresswindow;
if(_1028){
EditorBinding.registerComponent(this,_1028);
}else{
if(_1029){
EditorBinding.registerComponent(this,_1029);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_102a,_102b,_102c,theme){
this._editorBinding=_102a;
this._tinyEngine=_102b;
this._tinyInstance=_102c;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_102e,frame,_1030){
this._editorBinding=_102e;
this._codePressFrame=frame;
this._codePressEngine=_1030;
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
var _1033=this._editorBinding;
if(_1033!=null){
var self=this;
var _1035={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1033.hasBookmark()){
_1033.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1033.hasBookmark()){
_1033.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1035);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1035);
}
};
EditorClickButtonBinding.newInstance=function(_1037){
var _1038=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1037);
return UserInterface.registerBinding(_1038,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1039){
var _103a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1039);
return UserInterface.registerBinding(_103a,EditorToolBarButtonBinding);
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
var _103b=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_103b);
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
EditorSelectorBinding.prototype.initializeComponent=function(_103c,_103d,_103e,theme){
this._editorBinding=_103c;
this._tinyEngine=_103d;
this._tinyInstance=_103e;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1040){
EditorSelectorBinding.superclass.handleAction.call(this,_1040);
switch(_1040.type){
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
EditorMenuItemBinding.newInstance=function(_1044){
var _1045=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1044);
return UserInterface.registerBinding(_1045,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1046){
var i=0,_1048,_1049=[],split=_1046.split(" ");
while((_1048=split[i++])!=null){
if(_1048.length>=3&&_1048.substring(0,3)=="mce"){
continue;
}else{
if(_1048.length>=14&&_1048.substring(0,14)=="compositemedia"){
continue;
}
}
_1049.push(_1048);
}
return _1049.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_104b){
var _104c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_104b);
if(soap instanceof SOAPFault){
}else{
_104c=soap.XhtmlFragment;
if(!_104c){
_104c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _104c;
};
VisualEditorBinding.getTinyContent=function(_104e,_104f){
var _1050=null;
if(_104e==null||!_104e.replace(/\s*/gm,"").length){
_104e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_104f.getSoapTinyContent(_104e);
if(soap instanceof SOAPFault){
var _1052=soap;
var _1053={handleDialogResponse:function(){
_104f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1053,_1052);
}else{
_1050=soap.XhtmlFragment;
if(_1050==null){
_1050=new String("");
}
_1050=_1050.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1050;
};
VisualEditorBinding.isImage=function(_1054){
return _1054&&_1054.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1055){
return VisualEditorBinding.isImage(_1055)&&!VisualEditorBinding.isReservedElement(_1055);
};
VisualEditorBinding.isReservedElement=function(_1056){
if(VisualEditorBinding.isFunctionElement(_1056)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1056)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1056)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1057){
return VisualEditorBinding.isImage(_1057)&&CSSUtil.hasClassName(_1057,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1058){
return VisualEditorBinding.isImage(_1058)&&CSSUtil.hasClassName(_1058,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1059){
return VisualEditorBinding.isImage(_1059)&&CSSUtil.hasClassName(_1059,VisualEditorBinding.HTML_CLASSNAME);
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
var _105a=this.getProperty("embedablefieldstypenames");
if(_105a!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_105a);
}
var _105b=this.getProperty("formattingconfiguration");
if(_105b!=null){
this._url+="?config="+_105b;
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
VisualEditorBinding.prototype.handleBroadcast=function(_105c,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_105c,arg);
var _105e=this.getContentWindow().bindingMap.tinywindow;
var _105f=_105e.getContentWindow();
switch(_105c){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_105f){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_105e);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1060){
_1060.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1061=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1061.replace(/\s*/gm,"").length==0){
_1061=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1061,{format:"raw"});
this._tinyInstance.undoManager.clear();
this._tinyInstance.undoManager.add();
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1062){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1062);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1064=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1064=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1064=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1064;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1067){
var _1068=_1067;
if(!this._isNormalizedDocument(_1067)){
_1068=this._getHtmlMarkup().replace("${body}",_1067);
}
return _1068;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1069){
var _106a=false;
var doc=XMLParser.parse(_1069,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_106a=true;
}
}
if(Client.isWebKit){
if(_1069.indexOf("<html")!==0){
_106a=false;
}
}
return _106a;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _106f=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_106f){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_106f=true;
}
return _106f;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1071=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1071);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1073){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1073,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1075){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1075,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1078=CSSComputer.getPadding(body);
var _1079=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1079.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_107c){
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
VisualEditorPopupBinding.prototype.configure=function(_107d,_107e,_107f){
var _1080=this.editorBinding.hasSelection();
this.tinyInstance=_107d;
this.tinyEngine=_107e;
this.tinyElement=_107f;
this.hasSelection=_1080;
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
var _1084=false;
if(this.hasSelection){
_1084=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1084=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1084=true;
}
}
}
}
if(_1084){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1085=this.getMenuItemForCommand("compositeInsertLink");
var _1086=this.getMenuItemForCommand("unlink");
var _1087=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1088=this.editorBinding.getButtonForCommand("unlink");
_1086.setDisabled(_1088.isDisabled);
if(_1086.isDisabled){
_1085.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1085.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1089=this.editorBinding.embedableFieldConfiguration;
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
if(_1089){
var _108c=_1089.getGroupNames();
if(_108c.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_108c.each(function(_1090){
var _1091=_1089.getFieldNames(_1090);
_1091.each(function(_1092){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1092);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1090+":"+_1092);
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
var _1094=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1095=null;
var _1096=null;
if(_1094){
if(_1094.nodeName=="TD"){
_1095=_1094.getAttribute("colspan");
_1096=_1094.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1095=="1"&&_1096=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1094){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1097){
var _1098=VisualEditorFormattingConfiguration._configurations;
if(!_1098.has(_1097)){
_1098.set(_1097,new VisualEditorFormattingConfiguration());
}
return _1098.get(_1097);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_109a){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_109b){
var _109c=null;
var _109d=VisualEditorFieldGroupConfiguration._configurations;
if(!_109d.has(_109b)){
_109d.set(_109b,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_109b)));
}
return _109d.get(_109b);
};
function VisualEditorFieldGroupConfiguration(_109e){
var _109f=new Map();
new List(_109e).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_109f.set(group.GroupName,map);
});
this._groups=_109f;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10a3){
return this._groups.get(_10a3).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10a4,_10a5){
return this._groups.get(_10a4).get(_10a5).xhtml;
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
var _10a7=this.getDescendantElementsByLocalName("textarea");
while(_10a7.hasNext()){
var _10a8=_10a7.getNext();
if(_10a8.getAttribute("selected")=="true"){
this._startContent=_10a8.value;
this._textareaname=_10a8.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10aa=this.getContentWindow().bindingMap.templatetree;
_10aa.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10ab){
var _10ac=_10aa.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10ac.textareaname);
_10ab.consume();
}});
_10aa.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10ad){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10ae=this.getContentWindow().bindingMap.toolsplitter;
_10ae.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10af=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10af.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10af);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10b0){
this._textareas=new Map();
while(_10b0.hasNext()){
var _10b1=_10b0.getNext();
var _10b2=_10b1.getAttribute("placeholderid");
this._textareas.set(_10b2,{placeholderid:_10b2,placeholdername:_10b1.getAttribute("placeholdername"),placeholdermarkup:_10b1.value,textareaelement:_10b1,isSelected:_10b1.getAttribute("selected")=="true"});
}
var _10b3=new Map();
this._textareas.each(function(name,_10b5){
var _10b6=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b6.setLabel(_10b5.placeholdername);
_10b6.setImage("${icon:placeholder}");
_10b6.setProperty("placeholder",true);
_10b6.textareaname=name;
_10b3.set(_10b5.placeholdername,_10b6);
if(_10b5.isSelected){
selected=_10b6;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b7=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b7.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b8=this.getContentWindow().bindingMap.templatetree;
var _10b9=_10b8.add(TreeNodeBinding.newInstance(_10b8.bindingDocument));
_10b9.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10b9.setImage("${icon:warning}");
_10b9.attach();
var _10ba=this.getContentWindow().bindingMap.statusbar;
_10ba.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10bc=this._textareas.get(name);
var _10bd=_10bc.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10bd));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10be){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10be;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10bf=this.getContentWindow().bindingMap.statusbar;
_10bf.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10be);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10c2=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10c2;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10c3=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10c3=this._xhtmls.get(this._textareaname);
if(_10c3==null){
_10c3=VisualEditorBinding.XHTML;
}
}
return _10c3;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10c5){
_10c5.textareaelement.value=_10c5.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c6,_10c7,_10c8){
var _10c9=_10c6.getElementsByTagName("div").item(0);
var _10ca=_10c7.getElementsByTagName("div").item(0);
var _10cb=new List(_10c9.getElementsByTagName("textarea"));
var _10cc=new List(_10ca.getElementsByTagName("textarea"));
if(_10cb.getLength()!=_10cc.getLength()){
_10c8=true;
}else{
var index=0;
_10cb.each(function(_10ce,index){
var _10d0=_10cc.get(index);
var newid=_10ce.getAttribute("placeholderid");
var oldid=_10d0.getAttribute("placeholderid");
var _10d3=_10ce.getAttribute("placeholdername");
var _10d4=_10d0.getAttribute("placeholdername");
if(newid!=oldid||_10d3!=_10d4){
_10c8=true;
}
return !_10c8;
});
}
if(_10c8){
var html=null;
if(_10c9.innerHTML!=null){
html=_10c9.innerHTML;
}else{
html=DOMSerializer.serialize(_10c9);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d7){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d7);
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
var _10da=this.getDescendantBindingByLocalName("selector");
_10da.attach();
this._populateTemplateSelector();
var _10db=this.getContentWindow().bindingMap.templateselector;
_10db.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10dc=this.getDescendantBindingByLocalName("selector");
var _10dd=this.getContentWindow().bindingMap.templateselector;
_10dc.selections.each(function(_10de){
_10de.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10dd.populateFromList(_10dc.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10df=this.getDescendantBindingByLocalName("selector");
var _10e0=this.getContentWindow().bindingMap.templateselector;
_10df.selectByValue(_10e0.getValue());
_10df.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10e1){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e6,_10e7){
var _10e8=_10e7;
if(old.has(_10e6)){
_10e8=old.get(_10e6).placeholdermarkup;
}
return _10e8;
}
while(_10e1.hasNext()){
var _10e9=_10e1.getNext();
var _10ea=_10e9.getAttribute("placeholderid");
this._textareas.set(_10ea,{placeholderid:_10ea,placeholdername:_10e9.getAttribute("placeholdername"),placeholdermarkup:compute(_10ea,_10e9.value),textareaelement:_10e9,isSelected:_10e9.getAttribute("selected")=="true"});
}
var _10eb=null;
var _10ec=this.getContentWindow().bindingMap.templatetree;
var _10ed=new Map();
this._textareas.each(function(name,_10ef){
var _10f0=_10ec.add(TreeNodeBinding.newInstance(_10ec.bindingDocument));
_10f0.setLabel(_10ef.placeholdername);
_10f0.setImage("${icon:placeholder}");
_10f0.setProperty("placeholder",true);
_10f0.textareaname=name;
_10ed.set(_10ef.placeholdername,_10f0);
if(_10ef.isSelected){
_10eb=_10f0;
}
});
_10ec.attachRecursive();
if(_10eb!=null){
var _10f1=true;
if(this._oldtextareas.hasEntries()){
_10f1=false;
var map=new Map();
this._textareas.each(function(id,_10f4){
map.set(_10f4.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10f1=true;
}
}
if(_10f1){
var _10f5=this._textareas.get(_10eb.textareaname);
this._textareaname=_10eb.textareaname;
this._placeholdername=_10f5.placeholdername;
this._setContentFromPlaceHolder(_10eb.textareaname);
_10eb.focus();
}else{
var _10f6=_10ed.get(this._placeholdername);
this._textareaname=_10f6.textareaname;
_10f6.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10f9){
var _10fa=null;
if(Client.isWebKit||Client.isExplorer){
_10fa=node.getElementsByTagName(_10f9);
}else{
_10fa=node.getElementsByTagName("ui:"+_10f9);
}
return _10fa;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10fb,_10fc){
var _10fd=this._getElementsByTagName(_10fb,"selector").item(0);
var _10fe=this._getElementsByTagName(_10fc,"selector").item(0);
var _10ff=false;
var _1100=false;
if(_10fd!=null&&_10fe!=null){
var _1101=new List(this._getElementsByTagName(_10fd,"selection"));
var _1102=new List(this._getElementsByTagName(_10fe,"selection"));
if(_1101.getLength()!=_1102.getLength()){
_10ff=true;
_1100=true;
}else{
_1101.each(function(_1103,index){
var _1105=_1103.getAttribute("value");
var _1106=_1102.get(index).getAttribute("value");
if(_1105!=_1106){
_10ff=true;
}
return !_10ff;
});
_1101.each(function(_1107,index){
var _1109=_1107.getAttribute("selected");
var _110a=_1102.get(index).getAttribute("selected");
if(_1109!=_110a){
_1100=true;
}
return !_1100;
});
}
}
if(_10ff){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10fd);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1100){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10fb,_10fc,_1100);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_110c){
var _110d=null;
if(_110c==undefined){
_110c=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_110f){
if(_110f.PlaceholderId==_110c){
_110d=_110f.ClientRectangle.Width;
return false;
}
});
}
return _110d;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1111=this._pageId;
var _1112=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1111,_1112,function(_1114){
self._templatePreview=_1114;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1115){
var _1116=this._pageId;
var _1117=this._textareaname;
var _1118=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1115,_1116,_1118,_1117,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_111a){
var _111b=this._pageId;
var _111c=this._textareaname;
var _111d=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_111a,_111b,_111d,_111c,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_111f,frame,_1121){
this._editorBinding=_111f;
this._codePressFrame=frame;
this._codePressEngine=_1121;
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
var _1127=this.getProperty("validate");
if(_1127==true){
this._hasStrictValidation=true;
}
var _1128=this.getProperty("strictsave");
if(_1128===false){
this._strictSave=false;
}
var _1129=this.getProperty("validator");
if(_1129!=null){
this._validator=_1129;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_112a,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_112a,arg);
switch(_112a){
case BroadcastMessages.CODEMIRROR_LOADED:
var _112c=this.getContentWindow().bindingMap.codemirrorwindow;
if(_112c!=null){
var _112d=_112c.getContentWindow();
if(arg.broadcastWindow==_112d){
this._codemirrorWindow=_112d;
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
this.initializeEditorComponents(_112c);
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
this.unsubscribe(_112a);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1131){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1131);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1132){
if(_1132!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1132;
EditorBinding.isActive=_1132;
var _1133=this._codemirrorWindow.standardEventHandler;
if(_1132){
_1133.enableNativeKeys(true);
}else{
_1133.disableNativeKeys();
}
var _1134=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1134!=null){
if(_1132){
_1134.enable();
}else{
_1134.disable();
}
}
if(_1132){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1138=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1138;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1139){
_1139.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_113b){
if(!this._isFinalized){
if(_113b!=this._startContent){
this._startContent=_113b;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_113b);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _113c=this.getContentWindow().bindingMap.editorpage.getContent();
return _113c?_113c:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_113d){
if(this._pageBinding!=null){
this._pageBinding.cover(_113d);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_113e){
if(_113e!=null&&this.shadowTree.dotnetinput!=null){
var value=_113e.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1140=true;
var _1141=this.getContent();
if(this._validator!=null){
_1140=Validator.validateInformed(_1141,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1142=_1141.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1142!=_1141){
_1141=_1142;
this.setContent(_1142);
}
_1140=XMLParser.isWellFormedDocument(_1141,true,!this._strictSave);
if(_1140==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1140=this._isValidHTML(_1141);
break;
}
}
break;
}
}
return _1140;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1144=true;
var doc=XMLParser.parse(xml);
var _1146=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1146.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1146.add("NamespaceURI");
}
var head=null,body=null;
var _114a=new List(root.childNodes);
while(_114a.hasNext()){
var child=_114a.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1146.add("MultipleHead");
}
if(body!=null){
_1146.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1146.add("MultipleBody");
}
body=child;
break;
default:
_1146.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1146.add("MissingHead");
}
if(body==null){
_1146.add("MissingBody");
}
}
if(_1146.hasEntries()){
_1144=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1146.getFirst()));
}
return _1144;
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
var _114c=null;
var page=this._pageBinding;
if(page!=null){
_114c=page.getCheckSum();
}
return _114c;
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
ThrobberBinding.prototype.handleBroadcast=function(_114e,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_114e,arg);
switch(_114e){
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
ProgressBarBinding.notch=function(_1151){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1151);
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
ProgressBarBinding.prototype.notch=function(_1153){
_1153=_1153?_1153:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1153);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1155,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1155,arg);
switch(_1155){
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
StartMenuItemBinding.prototype.setChecked=function(_1157,_1158){
StartMenuItemBinding.superclass.setChecked.call(this,_1157,_1158);
if(!_1158){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1159){
var _115a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1159);
UserInterface.registerBinding(_115a,StartMenuItemBinding);
return UserInterface.getBinding(_115a);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_115d,_115e){
var _115f=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_115e,true)==true){
if(_115d!="*"){
_115d=KeySetBinding._sanitizeKeyModifiers(_115d);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_115f[doc]){
_115f[doc]={};
}
if(!_115f[doc][code]){
_115f[doc][code]={};
}
_115f[doc][code][_115d]=_115e;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1163=false;
var code=e.keyCode;
var _1165=KeySetBinding.keyEventHandlers;
if(_1165[doc]&&_1165[doc][code]){
var _1166="[default]";
_1166+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1166+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1166+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1166+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1167=_1165[doc][code][_1166];
if(_1167==null){
_1167=_1165[doc][code]["*"];
}
if(_1167!=null){
_1167.handleKeyEvent(e);
_1163=true;
}
}
return _1163;
};
KeySetBinding._sanitizeKeyModifiers=function(_1168){
var _1169="[default]";
var mods={};
if(_1168){
new List(_1168.split(" ")).each(function(_116b){
mods[_116b]=true;
});
function check(_116c){
if(mods[_116c]){
_1169+=" "+_116c;
}
}
check("shift");
check("control");
}
return _1169;
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
var _1170=key.getAttribute("oncommand");
var _1171=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1171){
DOMEvents.preventDefault(e);
}
var _1173=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1170,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1174){
if(_1174 instanceof CursorBinding){
_1174.setOpacity(0);
_1174.show();
new Animation({modifier:9,onstep:function(_1175){
_1174.setOpacity(Math.sin(_1175*Math.PI/180));
},onstop:function(){
_1174.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1176){
if(_1176 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1177){
_1176.setOpacity(Math.cos(_1177*Math.PI/180));
},onstop:function(){
_1176.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1178,_1179,_117a){
if(_1178 instanceof CursorBinding){
_117a.x-=16;
_117a.y-=16;
new Animation({modifier:3,onstep:function(_117b){
var tal=Math.sin(_117b*Math.PI/180);
_1178.setPosition(new Point(((1-tal)*_1179.x)+((0+tal)*_117a.x),((1-tal)*_1179.y)+((0+tal)*_117a.y)));
},onstop:function(){
CursorBinding.fadeOut(_1178);
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
CursorBinding.prototype.setOpacity=function(_1181){
this.bindingElement.style.opacity=new String(_1181);
this._opacity=_1181;
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
function setOpacity(_1184){
cover.bindingElement.style.opacity=new String(_1184);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1185){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1185*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1187){
cover.bindingElement.style.MozOpacity=new String(_1187);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1188){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1188*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_118a){
if(_118a!=this._isBusy){
if(_118a){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_118a;
}
};
CoverBinding.prototype.setTransparent=function(_118b){
if(_118b!=this._isTransparent){
if(_118b){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_118b;
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
CoverBinding.prototype.setHeight=function(_118d){
if(_118d>=0){
this.bindingElement.style.height=new String(_118d+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_118e){
var _118f=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_118e);
return UserInterface.registerBinding(_118f,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1191=UncoverBinding._bindingInstance;
if(Binding.exists(_1191)){
_1191.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1195){
this._isFading=_1195==true;
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
var _1196=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1196.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1196.clearRect(0,0,300,150);
_1196.fillRect(0,0,300,150);
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
var _1198=this._canvas.getContext("2d");
_1198.clearRect(0,0,300,150);
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
var _1199=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1199);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _119a=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_119a){
this._startcontent=_119a.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_119b){
SourceCodeViewerBinding.superclass.handleAction.call(this,_119b);
switch(_119b.type){
case WindowBinding.ACTION_ONLOAD:
if(_119b.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_119b.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_119b);
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
var _119f=this._transformer.transformToString(doc);
this._inject(_119f);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11a2){
this.getContentDocument().body.innerHTML=_11a2;
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
var _11aa=list.getNext();
var id=_11aa.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11aa);
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
var _11b4=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11b4.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11b4.appendChild(att);
}
elm.appendChild(_11b4);
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
var _11be=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11be){
doc=XMLParser.parse(_11be);
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
var _11c2=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11c2;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11c3,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11c3,arg);
switch(_11c3){
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
var _11c6=new List();
list.each(function(lang){
_11c6.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11c6);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11ca){
switch(_11ca){
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
var _11cd=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11cd,root);
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
var _11ce=this.getProperty("status");
if(_11ce!=null){
switch(_11ce){
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
var _11d8=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11d7,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
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
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b7.BindEntityTokenToViewParams.EntityToken);
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
function logEntry(_12ba){
var _12bb=_12ba.Level.toLowerCase();
SystemLogger.getLogger(_12ba.SenderId)[_12bb](_12ba.Message);
}
function openView(_12bc){
var list=paramsToList(_12bc.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12bc.ViewId);
def.entityToken=_12bc.EntityToken;
def.flowHandle=_12bc.FlowHandle;
def.position=_12a4[_12bc.ViewType],def.label=_12bc.Label;
def.image=_12bc.Image;
def.toolTip=_12bc.ToolTip;
def.argument={"url":_12bc.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12bc.ViewId,entityToken:_12bc.EntityToken,flowHandle:_12bc.FlowHandle,position:_12a4[_12bc.ViewType],url:_12bc.Url,label:_12bc.Label,image:_12bc.Image,toolTip:_12bc.ToolTip}));
}
}
function openDialogView(_12bf){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12bf.ViewId,flowHandle:_12bf.FlowHandle,position:Dialog.MODAL,url:_12bf.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12c0){
var _12c1=_12c0.DialogType.toLowerCase();
if(_12c1=="question"){
throw "Not supported!";
}else{
Dialog[_12c1](_12c0.Title,_12c0.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12c2){
var map={};
var _12c4=false;
new List(_12c2.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12c4=true;
});
var proto=ViewDefinitions[_12c2.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12c2.ViewId;
}
def.argument=_12c4?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12c9){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12c9.ViewId);
def.label=_12c9.Label;
def.toolTip=_12c9.ToolTip;
def.image=_12c9.Image;
def.argument={"url":_12c9.Url,"list":paramsToList(_12c9.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12cb){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12cb.ViewId);
def.label=_12cb.Label;
def.toolTip=_12cb.ToolTip;
def.image=_12cb.Image;
def.url=_12cb.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12cd){
if(StageBinding.isViewOpen(_12cd.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12cd.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12ce){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12ce.ViewId,isSuccess:_12ce.Succeeded});
}
this._lockSystem=function(_12cf){
var _12d0=top.bindingMap.offlinetheatre;
if(_12cf){
_12d0.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12d0.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a0=_12cf;
};
this.handleBroadcast=function(_12d2,arg){
switch(_12d2){
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
function paramsToList(_12d4){
var list=new List();
new List(_12d4).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12d7=false;
var _12d8=null;
var _12d9=false;
var _12da=Client.qualifies();
var _12db="admin";
var _12dc="123456";
if(!_12da){
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
this.handleBroadcast=function(_12dd){
switch(_12dd){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12dd);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
if(bindingMap.decks!=null){
var _12de=bindingMap.decks.getSelectedDeckBinding();
if(_12de!=null){
switch(_12de.getID()){
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
var _12df=window.bindingMap.appwindow;
_12df.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12e0){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12e1){
if(_12e0){
EventBroadcaster.subscribe(_12e1,KickStart);
}else{
EventBroadcaster.unsubscribe(_12e1,KickStart);
}
});
}
function kickStart(_12e2){
switch(_12e2){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12d7=true;
break;
}
if(_12d7){
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
DataManager.getDataBinding("username").setValue(_12db);
DataManager.getDataBinding("password").setValue(_12dc);
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
var _12e5=DataManager.getDataBinding("username").getResult();
var _12e6=DataManager.getDataBinding("passwordold").getResult();
var _12e7=DataManager.getDataBinding("passwordnew").getResult();
var _12e8=DataManager.getDataBinding("passwordnew2").getResult();
if(_12e7==_12e8){
var _12e9=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12ea=LoginService.ChangePassword(_12e5,_12e6,_12e7);
if(_12ea instanceof SOAPFault){
alert(_12ea.getFaultString());
}else{
if(_12ea.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12ea);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12e9){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12eb){
_12eb=new List(_12eb);
var _12ec=document.getElementById("passworderror");
_12ec.innerHTML="";
_12eb.each(function(error){
var _12ee=document.createElement("div");
_12ee.textContent=error;
_12ee.className="errortext";
_12ec.appendChild(_12ee);
});
_12ec.style.display="block";
var _12ef={handleAction:function(_12f0){
document.getElementById("passworderror").style.display="none";
_12f0.target.removeActionListener(Binding.ACTION_DIRTY,_12ef);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12ef);
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
this.doLogin=function(_12f1,_12f2){
var _12f3=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f4=false;
var _12f5=false;
var _12f6=LoginService.ValidateAndLogin(_12f1,_12f2);
if(_12f6 instanceof SOAPFault){
alert(_12f6.getFaultString());
}else{
if(_12f6=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_12f6=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_12f6=="passwordUpdateRequired"){
_12f5=true;
}
if(_12f6=="success"){
_12f4=true;
}
}
if(_12f5){
changePasswordRequired();
}else{
if(_12f4){
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
if(_12f3){
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
var _12f7=document.getElementById("passwordexpired");
_12f7.firstChild.data=_12f7.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _12f8=DataManager.getDataBinding("username");
var _12f9=DataManager.getDataBinding("password");
_12f8.blur();
_12f9.blur();
_12f8.setValue("");
_12f9.setValue("");
_12f8.clean();
_12f9.clean();
_12f8.focus();
document.getElementById("loginerror").style.display="block";
var _12fa={handleAction:function(_12fb){
document.getElementById("loginerror").style.display="none";
_12fb.target.removeActionListener(Binding.ACTION_DIRTY,_12fa);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12fa);
}
WindowManager.fireOnLoad(this);
if(!_12da){
UpdateManager.isEnabled=false;
}
};

