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
_Localization.prototype={languages:null,source:null,target:null,isRtl:false,handleBroadcast:function(_109,arg){
switch(_109){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,passwordExpirationTimeInDays:null,handleBroadcast:function(_36f){
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
case "PasswordExpirationTimeInDays":
this.passwordExpirationTimeInDays=_371.Value;
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
this._elementsbuffer.add(_477);
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
if(Localization.isRtl){
this.setProperty("dir","rtl");
this.attachClassName("rtl");
}
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
var _859;
if(Client.isExplorer||Client.isExplorer11){
var div=this.bindingDocument.createElement("div");
div.innerHTML="<textarea></textarea>";
_859=div.firstChild;
}else{
_859=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
}
_859.tabIndex=-1;
return _859;
};
TextBoxBinding.prototype.handleElement=function(_85b){
return true;
};
TextBoxBinding.prototype.updateElement=function(_85c){
var _85d,area=_85c.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_85d=DOMUtil.getTextContent(area);
}
if(_85d==null){
_85d="";
}
var _85f=this.bindingWindow.UpdateManager;
if(this.getValue()!=_85d){
_85f.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_85d);
}
var _860=_85c.getAttribute("type");
if(this.type!=_860){
_85f.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_860;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_864){
var _865=this.bindingDocument.selection.createRange();
var _866=_865.text=="";
if(_866&&!_864){
_865.text="\t";
}else{
var text="";
var _868=_865.text.length;
while((_865.moveStart("word",-1)&&_865.text.charAt(1)!="\n")){
}
_865.moveStart("character",1);
var _869=0;
var i=0,line,_86c=_865.text.split("\n");
while((line=_86c[i++])!=null){
if(_864){
line=line.replace(/^(\s)/mg,"");
_869++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_86c[i+1]?"\n":"");
}
_865.text=text;
_865.moveStart("character",-_868);
if(_864){
_865.moveStart("character",2*_86c.length-2);
}
_865.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86d=this.bindingDocument.selection.createRange();
var _86e=_86d.duplicate();
while((_86e.moveStart("word",-1)&&_86e.text.indexOf("\n")==-1)){
}
_86e.moveStart("character",1);
_86d.text="\n"+_86e.text.match(/^(\s)*/)[0]+"!";
_86d.moveStart("character",-1);
_86d.select();
_86d.text="";
_86d.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_86f){
var _870;
var _871;
var oss;
var osy;
var i;
var fnd;
var _876=this._getSelectedText();
var el=this.shadowTree.input;
_870=el.scrollLeft;
_871=el.scrollTop;
if(!_876.match(/\n/)){
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
_876=this._getSelectedText();
if(_86f){
ntext=_876.replace(/^(\s)/mg,"");
}else{
ntext=_876.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_876.length);
}
el.scrollLeft=_870;
el.scrollTop=_871;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _878;
var _879;
var oss;
var osy;
var el=this.shadowTree.input;
_878=el.scrollLeft;
_879=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_878;
el.scrollTop=_879;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _880=this.shadowTree.input.value;
var _881=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _880.substr(_881,end-_881);
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
var _883=this.getProperty("isdisabled");
if(this.isDisabled||_883){
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
var _885=this.getProperty("label");
var _886=this.getProperty("value");
var _887=this.getProperty("width");
var _888=this.getProperty("onchange");
var _889=this.getProperty("required")==true;
var _88a=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_885!=null){
this.label=_885;
}
if(!this.value&&_886!=null){
this.value=_886;
}
if(!this.width&&_887){
this.width=_887;
}
if(_889){
this.isRequired=true;
}
if(_88a){
this._isLocal=true;
}
if(_888){
this.onValueChange=function(){
Binding.evaluate(_888,this);
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
var _88b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_88b.name=this.getName();
_88b.value=this.getValue();
_88b.type="hidden";
if(this.hasCallBackID()){
_88b.id=this.getCallBackID();
}
this.shadowTree.input=_88b;
this.bindingElement.appendChild(_88b);
};
SelectorBinding.prototype.buildButton=function(){
var _88c=this.BUTTON_IMPLEMENTATION;
var _88d=this.add(_88c.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_88d.imageProfile=this.imageProfile;
}
if(this.width!=null){
_88d.setWidth(this.width);
}
this._buttonBinding=_88d;
this.shadowTree.button=_88d;
_88d.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
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
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
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
this.shadowTree.selectorindicatorimage.style.display=_8ad?"none":"block";
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
this._buildIndicator();
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
var img=this.bindingDocument.createElement("img");
img.src=Resolver.resolve("${icon:popup}");
img.className="dialogindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.indicatorimage=img;
};
DataDialogBinding.prototype.handleAction=function(_93d){
DataDialogBinding.superclass.handleAction.call(this,_93d);
var _93e=_93d.target;
var self=this;
switch(_93d.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_940,_941){
if(_940==Dialog.RESPONSE_ACCEPT){
if(_941 instanceof DataBindingMap){
self._map=_941;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_93e==this._buttonBinding){
_93d.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_942,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_942,arg);
switch(_942){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _945=this.getProperty("handle");
var url=this.getURL();
var _947=null;
if(_945!=null||def!=null){
if(def!=null){
_947=def;
}else{
_947=ViewDefinitions[_945];
}
if(_947 instanceof DialogViewDefinition){
_947.handler=this._handler;
if(this._map!=null){
_947.argument=this._map;
}
StageBinding.presentViewDefinition(_947);
}
}else{
if(url!=null){
_947=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_947!=null){
this._dialogViewHandle=_947.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_948){
this.setProperty("label",_948);
if(this.isAttached){
this._buttonBinding.setLabel(_948+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_949){
this.setProperty("image",_949);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_949);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_94a){
this.setProperty("tooltip",_94a);
if(this.isAttached){
this._buttonBinding.setToolTip(_94a);
}
};
DataDialogBinding.prototype.setHandle=function(_94b){
this.setProperty("handle",_94b);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_94d){
this._handler=_94d;
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
var _94e=true;
if(this.isRequired==true){
var _94f=this.getValue();
if(_94f==null||_94f==""){
_94e=false;
}
if(_94e!=this._isValid){
if(_94e){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_94e;
}
return _94e;
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
DataDialogBinding.newInstance=function(_951){
var _952=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_951);
return UserInterface.registerBinding(_952,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_954,_955){
if(_954==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_955);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_956){
_956=new String(_956);
this.dirty();
this.setValue(encodeURIComponent(_956));
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
var _95a=this.getValue();
if(_95a==null){
_95a="";
}
this.shadowTree.dotnetinput.value=_95a;
};
PostBackDataDialogBinding.prototype.setValue=function(_95b){
this.setProperty("value",_95b);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_95c){
};
PostBackDataDialogBinding.newInstance=function(_95d){
var _95e=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95d);
return UserInterface.registerBinding(_95e,PostBackDataDialogBinding);
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
var _95f=this.getProperty("dialoglabel");
var _960=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _962=this.getProperty("handle");
var _963=this.getProperty("selectedtoken");
if(_962!=null){
var def=ViewDefinition.clone(_962,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_95f!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_95f;
}
if(_960!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_960;
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
if(_963!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_963;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_965){
var _966=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_965);
return UserInterface.registerBinding(_966,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_968){
self._datathing.setValue(_968);
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
var _96b=self.getValue();
if(_96b==""||_96b==null){
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
var _96c=this.getProperty("value");
var _96d=this.getProperty("selectorlabel");
if(_96d==null){
_96d=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_96c==null));
list.add(new SelectorBindingSelection(_96d+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_96c!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _96c=this.getValue();
if(_96c==""||_96c==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_96f){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_96f);
switch(_96f.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_96f.target==this._datathing){
var _970=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_970){
self._selector.setLabel(_970);
}
},500);
_96f.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_972){
this.setProperty("label",_972);
if(this._selector!=null){
this._selector.setLabel(_972);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_973){
this._datathing.setValue(_973);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_975,_976){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_975,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_977){
this._buttonBinding.setLabel(_977);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_978){
this._buttonBinding.setToolTip(_978);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_979){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_979);
switch(_979.type){
case MenuItemBinding.ACTION_COMMAND:
var _97a=_979.target;
var _97b=this.master;
if(_97a.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_97a.getLabel());
setTimeout(function(){
_97b.action();
},0);
}else{
if(_97b.getValue()){
_97b.dirty();
}
_97b.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_97c){
var _97d=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_97c);
return UserInterface.registerBinding(_97d,NullPostBackDataDialogSelectorBinding);
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
var _97e=this._dataDialogBinding;
if(_97e!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_97e.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _97f=this.getProperty("editable");
var _980=this.getProperty("selectable");
var _981=this.getProperty("display");
if(_97f!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_980){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_981){
this._display=_981;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _982=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_982.selections=this.selections;
this.add(_982);
_982.attach();
this._dataDialogBinding=_982;
this.shadowTree.datadialog=_982;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _984=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _985=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_984=_985.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_984=_985.isSelected!=true;
break;
}
if(_984){
this.shadowTree.box.appendChild(this._getElementForSelection(_985));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_987){
var box=this.shadowTree.box;
var _989=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _98a=list.getNext();
if(_987){
_98a.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_989=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_989=_98a.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_989=_98a.isSelected!=true;
break;
}
}
if(_989){
var _98b=this._getElementForSelection(_98a);
box.insertBefore(_98b,box.firstChild);
CSSUtil.attachClassName(_98b,"selected");
this._selectionMap.set(_98a.value,_98b);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_98c){
var _98d=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_98d.appendChild(this.bindingDocument.createTextNode(_98c.label));
_98d.setAttribute("label",_98c.label);
_98d.setAttribute("value",_98c.value);
return _98d;
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
var _98f=DOMEvents.getTarget(e);
var _990=DOMUtil.getLocalName(_98f);
if(_990=="div"){
this._handleMouseDown(_98f);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_991){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _992=this._getElements();
var _993=_991.getAttribute("value");
var _994=this._lastSelectedElement.getAttribute("value");
var _995=false;
while(_992.hasNext()){
var el=_992.getNext();
switch(el.getAttribute("value")){
case _993:
case _994:
_995=!_995;
break;
}
if(_995){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_991);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_991)){
this._unhilite(_991);
}else{
this._hilite(_991);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_991){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_991;
};
MultiSelectorBinding.prototype._hilite=function(_999){
var _99a=_999.getAttribute("value");
if(!this._selectionMap.has(_99a)){
CSSUtil.attachClassName(_999,"selected");
this._selectionMap.set(_99a,_999);
}
};
MultiSelectorBinding.prototype._unhilite=function(_99b){
var _99c=_99b.getAttribute("value");
if(this._selectionMap.has(_99c)){
CSSUtil.detachClassName(_99b,"selected");
this._selectionMap.del(_99c);
}
};
MultiSelectorBinding.prototype._isHilited=function(_99d){
return CSSUtil.hasClassName(_99d,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_99e){
MultiSelectorBinding.superclass.handleAction.call(this,_99e);
var _99f=_99e.target;
switch(_99e.type){
case DataDialogBinding.ACTION_COMMAND:
if(_99f==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_99e.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_99f.result);
this.dirty();
_99f.result=null;
_99e.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _9a0=null;
if(this.isSelectable){
_9a0=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_9a2){
if(self._isHilited(_9a2)){
_9a2.parentNode.removeChild(_9a2);
_9a0.add(new SelectorBindingSelection(_9a2.getAttribute("label"),_9a2.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _9a0;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _9a4=this._getElements();
if(!isUp){
_9a4.reverse();
}
var _9a5=true;
while(_9a5&&_9a4.hasNext()){
var _9a6=_9a4.getNext();
if(this._isHilited(_9a6)){
switch(isUp){
case true:
if(_9a6.previousSibling){
_9a6.parentNode.insertBefore(_9a6,_9a6.previousSibling);
}else{
_9a5=false;
}
break;
case false:
if(_9a6.nextSibling){
_9a6.parentNode.insertBefore(_9a6,_9a6.nextSibling.nextSibling);
}else{
_9a5=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _9a7=new List();
var _9a8=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9aa){
var _9ab=new SelectorBindingSelection(_9aa.getAttribute("label"),_9aa.getAttribute("value"),_9a8);
_9ab.isHighlighted=self._isHilited(_9aa);
_9a7.add(_9ab);
});
return _9a7;
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
var _9ac=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9ac.hasEntries()){
_9ac.each(function(_9ad){
_9ad.parentNode.removeChild(_9ad);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9ae=this.selections.getNext();
if(_9ae.isSelected){
var _9af=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9af.name=this._name;
_9af.value=_9ae.value;
this.bindingElement.appendChild(_9af);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9b0){
alert(_9b0);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9b1){
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
var _9b2={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9b3=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9b3.handler=this._handler;
_9b3.argument=_9b2;
StageBinding.presentViewDefinition(_9b3);
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
var _9b4={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9b6={handleDialogResponse:function(_9b7,_9b8){
if(_9b7==Dialog.RESPONSE_ACCEPT){
self.result=_9b8;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b9=ViewDefinitions[this._dialogViewHandle];
_9b9.handler=_9b6;
_9b9.argument=_9b4;
StageBinding.presentViewDefinition(_9b9);
};
MultiSelectorDataDialogBinding.newInstance=function(_9ba){
var _9bb=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9ba);
return UserInterface.registerBinding(_9bb,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9bc){
var id=_9bc.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9be=_9bc.bindingDocument.getElementById(id);
if(_9be!=null){
var _9bf=UserInterface.getBinding(_9be);
_9bf.setResult(true);
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
var _9c1=this.bindingDocument.getElementById(id);
if(_9c1!=null){
var _9c2=UserInterface.getBinding(_9c1);
if(_9c2&&!_9c2.isAttached){
_9c2.isLazy=true;
}else{
_9c1.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9c3){
this._isLazy=_9c3;
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
var _9c5=this.getProperty("stateprovider");
var _9c6=this.getProperty("handle");
if(_9c5!=null&&_9c6!=null){
url=url.replace("${stateprovider}",_9c5).replace("${handle}",_9c6);
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
EditorDataBinding.prototype._onPageInitialize=function(_9c7){
EditorDataBinding.superclass._onPageInitialize.call(this,_9c7);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9c8){
EditorDataBinding.superclass.handleAction.call(this,_9c8);
switch(_9c8.type){
case Binding.ACTION_DIRTY:
if(_9c8.target!=this){
if(!this.isDirty){
this.dirty();
}
_9c8.consume();
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
EditorDataBinding.prototype.setValue=function(_9c9){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9ca){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9cb){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9cb);
if(this.hasBasic===false){
var _9cc=this.getContentWindow().bindingMap.basicgroup;
if(_9cc){
_9cc.hide();
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
var _9d1=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9d1=fake.getValue()!="";
}
if(!_9d1&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9d1&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9d1;
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
var _9d5=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9d5!=null){
_9d5.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9d6){
_9d6=_9d6!=null?_9d6:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9d6;
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
var _9d7=this.getProperty("label");
if(_9d7){
this.setLabel(_9d7);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9d8){
this.setProperty("label",_9d8);
if(this.shadowTree.labelBinding==null){
var _9d9=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d9.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d9.bindingElement,this.bindingElement.firstChild);
_9d9.attach();
this.shadowTree.labelBinding=_9d9;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9d8));
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
var _9db=this.getProperty("relation");
if(_9db!=null){
this.bindingRelation=_9db;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9dc,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9dc,arg);
switch(_9dc){
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
FieldBinding.newInstance=function(_9de){
var _9df=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9de);
return UserInterface.registerBinding(_9df,FieldBinding);
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
var _9e0=this.getDescendantBindingByLocalName("fieldgroup");
if(_9e0!=null){
_9e0.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9e1=true;
var _9e2=this.getDescendantBindingsByLocalName("*");
while(_9e2.hasNext()){
var _9e3=_9e2.getNext();
if(Interfaces.isImplemented(IData,_9e3)){
var _9e4=_9e3.validate();
if(_9e1&&!_9e4){
_9e1=false;
}
}
}
return _9e1;
};
FieldsBinding.prototype.handleAction=function(_9e5){
FieldsBinding.superclass.handleAction.call(this,_9e5);
var _9e6=_9e5.target;
if(_9e6!=this){
switch(_9e5.type){
case Binding.ACTION_INVALID:
var _9e7=DataBinding.getAssociatedLabel(_9e6);
if(_9e7){
this._invalidFieldLabels.set(_9e6.key,_9e7);
}
if(_9e6.error){
if(!_9e6.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9e6.error},_9e6);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9e5.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9e6.key)){
this._invalidFieldLabels.del(_9e6.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9e5.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e8=null;
if(this._invalidFieldLabels.hasEntries()){
_9e8=this._invalidFieldLabels.toList();
}
return _9e8;
};
FieldsBinding.newInstance=function(_9e9){
var _9ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e9);
return UserInterface.registerBinding(_9ea,FieldsBinding);
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
var _9eb=this.getProperty("image");
if(_9eb){
this.setImage(_9eb);
}
var _9ec=this.getProperty("tooltip");
if(_9ec){
this.setToolTip(_9ec);
}
var _9ed=this.getProperty("label");
if(_9ed){
this.setLabel(_9ed);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9ef=this.getAncestorBindingByLocalName("field");
if(_9ef){
var _9f0=true;
_9ef.getDescendantBindingsByLocalName("*").each(function(_9f1){
if(Interfaces.isImplemented(IData,_9f1)){
_9f1.focus();
_9f0=false;
}
return _9f0;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9f2){
this.setProperty("label",_9f2);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9f2);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9f3=this.getProperty("label");
if(!_9f3){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9f3=node.data;
}
}
return _9f3;
};
FieldDescBinding.prototype.setImage=function(_9f5){
this.setProperty("image",_9f5);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9f6){
this.setProperty("tooltip",_9f6);
if(this.isAttached){
this.bindingElement.title=_9f6;
}
};
FieldDescBinding.newInstance=function(_9f7){
var _9f8=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f7);
return UserInterface.registerBinding(_9f8,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f9){
var _9fa=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f9);
return UserInterface.registerBinding(_9fa,FieldDataBinding);
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
var _9fb=this._fieldHelpPopupBinding;
if(_9fb){
_9fb.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9fc=app.bindingMap.fieldhelpopupset;
var doc=_9fc.bindingDocument;
var _9fe=_9fc.add(PopupBinding.newInstance(doc));
var _9ff=_9fe.add(PopupBodyBinding.newInstance(doc));
_9fe.position=PopupBinding.POSITION_RIGHT;
_9fe.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9ff.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _a00=this.getProperty("label");
if(_a00){
_9ff.bindingElement.innerHTML=Resolver.resolve(_a00);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9fe;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _a01=this.getAncestorBindingByLocalName("field");
if(_a01){
_a01.attachClassName("fieldhelp");
var _a02=ClickButtonBinding.newInstance(this.bindingDocument);
_a02.attachClassName("fieldhelp");
_a02.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_a02);
_a02.attach();
var self=this;
_a02.oncommand=function(){
self.attachPopupBinding();
};
_a02.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_a02;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _a04=this._fieldHelpPopupBinding;
if(_a04&&!_a04.isAttached){
_a04.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a06){
RadioDataGroupBinding.superclass.handleAction.call(this,_a06);
switch(_a06.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a08,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a08,arg);
switch(_a08){
case BroadcastMessages.KEY_ARROW:
var _a0a=null;
var next=null;
var _a0c=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a0c=this.getChildBindingsByLocalName("radio");
while(!_a0a&&_a0c.hasNext()){
var _a0d=_a0c.getNext();
if(_a0d.getProperty("ischecked")){
_a0a=_a0d;
}
}
break;
}
if(_a0a){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a0c.getFollowing(_a0a);
while(next!=null&&next.isDisabled){
next=_a0c.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a0c.getPreceding(_a0a);
while(next!=null&&next.isDisabled){
next=_a0c.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a0e){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a0e){
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
var _a0f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0f.type="hidden";
_a0f.name=this._name;
this.bindingElement.appendChild(_a0f);
this.shadowTree.input=_a0f;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a10=null;
var _a11=this.getChildBindingsByLocalName("radio");
while(!_a10&&_a11.hasNext()){
var _a12=_a11.getNext();
if(_a12.isChecked){
_a10=_a12.getProperty("value");
}
}
return _a10;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a13){
};
RadioDataGroupBinding.prototype.setResult=function(_a14){
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
var _a15=this.getProperty("relate");
var _a16=this.getProperty("oncommand");
var _a17=this.getProperty("isdisabled");
if(_a15){
this.bindingRelate=_a15;
this.relate();
}
if(_a16){
this.oncommand=function(){
Binding.evaluate(_a16,this);
};
}
if(_a17==true){
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
var _a19=this.getCallBackID();
this._buttonBinding.check=function(_a1a){
RadioButtonBinding.prototype.check.call(this,_a1a);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a1b){
RadioButtonBinding.prototype.uncheck.call(this,_a1b);
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
RadioDataBinding.prototype.setChecked=function(_a1c,_a1d){
this._buttonBinding.setChecked(_a1c,_a1d);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a1c);
};
RadioDataBinding.prototype.check=function(_a1e){
this.setChecked(true,_a1e);
};
RadioDataBinding.prototype.uncheck=function(_a1f){
this.setChecked(false,_a1f);
};
RadioDataBinding.prototype.setDisabled=function(_a20){
if(_a20!=this.isDisabled){
this.isDisabled=_a20;
this._buttonBinding.setDisabled(_a20);
if(_a20){
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
var _a22=DOMEvents.getTarget(e);
switch(_a22){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a23=this.getProperty("label");
if(_a23){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a23)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a24){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a24;
}
this.setProperty("label",_a24);
};
RadioDataBinding.prototype.handleElement=function(_a25){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a26){
var _a27=_a26.getAttribute("ischecked")==="true";
if(this.isChecked!=_a27){
this.setChecked(_a27,true);
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
var _a29=DOMEvents.getTarget(e);
switch(_a29){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a2a,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a2a,arg);
switch(_a2a){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a2d){
_a2d.consume();
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
var _a2f=this.getCallBackID();
this._buttonBinding.check=function(_a30){
ButtonBinding.prototype.check.call(this,_a30);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a30){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a31){
ButtonBinding.prototype.uncheck.call(this,_a31);
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
if(_a2f!=null){
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
var _a32=true;
var _a33=this.bindingElement.parentNode;
if(_a33){
var _a34=UserInterface.getBinding(_a33);
if(_a34&&_a34 instanceof CheckBoxGroupBinding){
if(_a34.isRequired){
if(_a34.isValid){
_a32=_a34.validate();
}else{
_a32=false;
}
}
}
}
return _a32;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a35=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a35.type="hidden";
_a35.name=this._name;
_a35.style.display="none";
this.bindingElement.appendChild(_a35);
this.shadowTree.input=_a35;
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
var _a36=null;
var _a37=this.getProperty("value");
if(this.isChecked){
_a36=_a37?_a37:"on";
}
return _a36;
};
CheckBoxBinding.prototype.setValue=function(_a38){
if(_a38==this.getValue()||_a38=="on"){
this.check(true);
}else{
if(_a38!="on"){
this.setPropety("value",_a38);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a39=false;
if(this.isChecked){
_a39=this._result!=null?this._result:true;
}
return _a39;
};
CheckBoxBinding.prototype.setResult=function(_a3a){
if(typeof _a3a=="boolean"){
this.setChecked(_a3a,true);
}else{
this._result=_a3a;
}
};
CheckBoxBinding.newInstance=function(_a3b){
var _a3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a3b);
return UserInterface.registerBinding(_a3c,CheckBoxBinding);
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
var _a3d=true;
if(this.isRequired){
var _a3e=this.getDescendantBindingsByLocalName("checkbox");
if(_a3e.hasEntries()){
_a3d=false;
while(_a3e.hasNext()&&!_a3d){
if(_a3e.getNext().isChecked){
_a3d=true;
}
}
}
if(_a3d==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a3d;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a3f){
if(_a3f){
if(!this._labelBinding){
var _a40=LabelBinding.newInstance(this.bindingDocument);
_a40.attachClassName("invalid");
_a40.setImage("${icon:error}");
_a40.setLabel("Selection required");
this._labelBinding=this.addFirst(_a40);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a41){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a41);
switch(_a41.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a42){
var _a43=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a42);
return UserInterface.registerBinding(_a43,CheckBoxGroupBinding);
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
var _a44=DialogControlBinding.newInstance(this.bindingDocument);
_a44.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a44);
this._controlGroupBinding.attachRecursive();
var _a45=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a45);
var _a46=this.getLabel();
if(_a46!=null){
this.setLabel(_a46);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a47=this._snapTargetBinding;
if(Binding.exists(_a47)==true){
_a47.removeActionListener(Binding.ACTION_BLURRED,this);
_a47.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a48){
if(Interfaces.isImplemented(IData,_a48)){
this._snapTargetBinding=_a48;
var _a49=_a48.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a49&&_a49.isConsumed){
this._environmentBinding=_a49.listener;
}
if(this._environmentBinding){
_a48.addActionListener(Binding.ACTION_BLURRED,this);
_a48.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a48)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a48.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a4b=this._snapTargetBinding;
var _a4c=this._environmentBinding;
var root=UserInterface.getBinding(_a4b.bindingDocument.body);
if(Binding.exists(_a4b)&&Binding.exists(_a4c)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a4b.isAttached&&_a4c.isAttached){
var _a4e=_a4b.boxObject.getUniversalPosition();
var _a4f=_a4c.boxObject.getUniversalPosition();
_a4f.y+=_a4c.bindingElement.scrollTop;
_a4f.x+=_a4c.bindingElement.scrollLeft;
var tDim=_a4b.boxObject.getDimension();
var eDim=_a4c.boxObject.getDimension();
var _a52=false;
if(_a4e.y+tDim.h<_a4f.y){
_a52=true;
}else{
if(_a4e.x+tDim.w<_a4f.x){
_a52=true;
}else{
if(_a4e.y>_a4f.y+eDim.h){
_a52=true;
}else{
if(_a4e.x>_a4f.x+eDim.w){
_a52=true;
}
}
}
}
if(!_a52){
this._setComputedPosition(_a4e,_a4f,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a53,_a54,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a59=_a53;
var _a5a=false;
if(_a53.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a5a=true;
}else{
if(_a53.x+tDim.w>=_a54.x+eDim.w){
_a5a=true;
}
}
if(_a5a){
_a59.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a59.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a59.y-=(bDim.h);
_a59.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a59);
};
BalloonBinding.prototype.handleBroadcast=function(_a5b,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a5b,arg);
switch(_a5b){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a5d){
var _a5e=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a5d){
_a5e=true;
}
}
return _a5e;
};
BalloonBinding.prototype._setPosition=function(_a60){
var _a61=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a61=true;
}
}
if(!_a61){
this.bindingElement.style.left=_a60.x+"px";
this.bindingElement.style.top=_a60.y+"px";
this._point=_a60;
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
BalloonBinding.prototype.handleAction=function(_a63){
BalloonBinding.superclass.handleAction.call(this,_a63);
var _a64=_a63.target;
switch(_a63.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a63.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a64==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a64)){
self.dispose();
}else{
if(_a64.validate()){
var _a66=true;
if(_a63.type==Binding.ACTION_BLURRED){
var root=_a64.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a66=false;
}
}
if(_a66){
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
BalloonBinding.prototype.setLabel=function(_a69){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a6a=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a69);
_a6a.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a6a);
}
this.setProperty("label",_a69);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a6c){
var _a6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a6c);
var _a6e=UserInterface.registerBinding(_a6d,BalloonBinding);
_a6e.hide();
return _a6e;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a6f,_a70){
if(Interfaces.isImplemented(IData,_a70)==true){
var _a71,_a72=_a70.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a72&&_a72.isConsumed){
switch(_a72.listener.constructor){
case StageBinding:
_a71=false;
break;
case StageDialogBinding:
_a71=true;
break;
}
}
var _a73=_a71?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a74=_a73.add(BalloonBinding.newInstance(top.app.document));
_a74.setLabel(_a6f.text);
_a74.snapTo(_a70);
_a74.attach();
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
var _a75=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a78=_a75.getDataBinding(name);
if(_a78){
ErrorBinding.presentError({text:text},_a78);
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
FocusBinding.focusElement=function(_a79){
var _a7a=true;
try{
_a79.focus();
Application.focused(true);
}
catch(exception){
var _a7b=UserInterface.getBinding(_a79);
var _a7c=SystemLogger.getLogger("FocusBinding.focusElement");
_a7c.warn("Could not focus "+(_a7b?_a7b.toString():String(_a79)));
_a7a=false;
}
return _a7a;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a7d){
var win=_a7d.bindingWindow;
var id=_a7d.bindingElement.id;
return {getBinding:function(){
var _a80=null;
try{
if(Binding.exists(_a7d)){
_a80=win.bindingMap[id];
}
}
catch(exception){
}
return _a80;
}};
};
FocusBinding.navigateNext=function(_a81){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a81);
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
var _a82=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a82&&_a82.isConsumed){
if(_a82.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a83){
FocusBinding.superclass.handleAction.call(this,_a83);
var _a84=_a83.target;
var _a85=null;
if(this._isFocusManager){
switch(_a83.type){
case FocusBinding.ACTION_ATTACHED:
if(_a84!=this){
this._isUpToDate=false;
}
_a83.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a84!=this){
this._isUpToDate=false;
_a83.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a85=new FocusCrawler();
_a85.mode=FocusCrawler.MODE_BLUR;
_a85.crawl(_a84.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a83.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a84!=this){
_a85=new FocusCrawler();
_a85.mode=FocusCrawler.MODE_FOCUS;
_a85.crawl(_a84.bindingElement);
}
_a83.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a84)){
this.claimFocus();
this._onFocusableFocused(_a84);
}
_a83.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a84)){
this._onFocusableBlurred(_a84);
}
_a83.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a86){
var _a87=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a87==null&&list.hasNext()){
var _a89=list.getNext();
if(this._cachedFocus&&_a89==this._cachedFocus.getBinding()){
_a87=_a89;
}
}
if(_a87!=null){
if(_a89.isFocused){
var next=_a86?list.getPreceding(_a87):list.getFollowing(_a87);
if(!next){
next=_a86?list.getLast():list.getFirst();
}
next.focus();
}else{
_a87.focus();
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
var _a8b=new FocusCrawler();
var list=new List();
_a8b.mode=FocusCrawler.MODE_INDEX;
_a8b.crawl(this.bindingElement,list);
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
var _a8e=this._cachedFocus.getBinding();
if(_a8e&&!_a8e.isFocused){
_a8e.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a8f){
if(_a8f!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a8f;
_a8f.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a8f);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a90){
_a90.deleteProperty(FocusBinding.MARKER);
if(_a90==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a92){
this.bindingElement.style.left=_a92+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a93){
this.hiddenTabBindings.add(_a93);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a94=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a94.getLabel());
item.setImage(_a94.getImage());
item.associatedTabBinding=_a94;
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
TabsButtonBinding.prototype.handleAction=function(_a97){
TabsButtonBinding.superclass.handleAction.call(this,_a97);
switch(_a97.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a98=this.selectedTabBinding;
if(_a98){
this.containingTabBoxBinding.moveToOrdinalPosition(_a98,0);
this.containingTabBoxBinding.select(_a98);
}
_a97.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a99){
var _a9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a99);
_a9a.setAttribute("type","checkbox");
_a9a.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a9a.className="tabbutton";
return UserInterface.registerBinding(_a9a,TabsButtonBinding);
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
var _a9b=TabBoxBinding.currentActiveInstance;
if(_a9b!=null&&Binding.exists(_a9b)){
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
var _a9c=this.getTabElements().getLength();
var _a9d=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a9c!=_a9d){
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
var _a9e=this.getTabPanelElements();
while(_a9e.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a9e.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a9f=DOMUtil.getOrdinalPosition(this._tabsElement);
var _aa0=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _aa1=_a9f>_aa0?"tabsbelow":"tabsontop";
this.attachClassName(_aa1);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _aa3=this.getTabPanelElements();
var _aa4=null;
var _aa5=this.getProperty("selectedindex");
if(_aa5!=null){
if(_aa5>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aa6=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa8=_aa3.getNext();
this.registerTabBoxPair(tab,_aa8);
if(_aa5&&_aa6==_aa5){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_aa4=tab;
}
}
_aa6++;
}
if(!_aa4){
_aa4=tabs.getFirst();
_aa4.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa9){
var _aaa=null;
var _aab=null;
if(this.isEqualSize){
var _aac=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aae=this.getTabPanelElements();
_aae.each(function(_aaf){
max=_aaf.offsetHeight>max?_aaf.offsetHeight:max;
});
_aab=max+_aac.top+_aac.bottom;
if(_aa9&&this._tabPanelsElement.style.height!=null){
_aaa=this._tabPanelsElement.offsetHeight;
}
if(_aaa!=null||_aab>_aaa){
this._tabPanelsElement.style.height=_aab+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_ab0){
_ab0._invalidCount=0;
_ab0.addActionListener(Binding.ACTION_INVALID,this);
_ab0.addActionListener(Binding.ACTION_VALID,this);
_ab0.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_ab1){
TabBoxBinding.superclass.handleAction.call(this,_ab1);
var _ab2=_ab1.target;
var _ab3=_ab1.listener;
switch(_ab1.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_ab2.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_ab1.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_ab2.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_ab3._invalidCount++;
if(_ab3._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_ab3.isSelected){
self._showWarning(_ab3,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_ab3._invalidCount>0){
_ab3._invalidCount--;
if(_ab3._invalidCount==0){
if(_ab3.isSelected){
this._showWarning(_ab3,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_ab3,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_ab1._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_ab1._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ab6=DOMEvents.getTarget(e);
if(_ab6==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab8=this.getTabPanelElements();
tabs.each(function(tab,_aba){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _abb=_ab8.get(_aba);
this.registerTabBoxPair(tab,_abb);
}
},this);
var _abc=this._tabBoxPairs;
for(var key in _abc){
var tab=_abc[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ab6);
switch(_ab6.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ac0=_ab6.parentNode;
if(_ac0==this._tabsElement||_ac0==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ab6==this._tabsElement||_ab6==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ac2){
var _ac3=this.getBindingForArgument(arg);
if(_ac3!=null&&!_ac3.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ac3.select(_ac2);
this.getTabPanelBinding(_ac3).select(_ac2);
var _ac4=this.getProperty("selectedindex");
if(_ac4!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ac3.bindingElement,true));
}
this._selectedTabBinding=_ac3;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ac3.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ac5=this.getTabPanelBinding(_ac3);
this._showBalloon(_ac5,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac7){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac7.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac7};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_acb){
var _acc=null;
try{
var key=_acb.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ace=this._tabBoxPairs[key].tabPanel;
_acc=UserInterface.getBinding(_ace);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _acc;
};
TabBoxBinding.prototype.getTabBinding=function(_acf){
var key=_acf.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ad1=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ad1);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ad2=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ad2);
return _ad2;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ad3,_ad4){
var _ad5=_ad3.bindingElement;
_ad3.setProperty("selected",true);
var _ad6=this.summonTabPanelBinding();
var _ad7=_ad6.bindingElement;
if(_ad4){
_ad7.appendChild(_ad4 instanceof Binding?_ad4.bindingElement:_ad4);
}
this.registerTabBoxPair(_ad5,_ad7);
UserInterface.getBinding(this._tabsElement).add(_ad3);
this._tabPanelsElement.appendChild(_ad7);
_ad3.attach();
UserInterface.getBinding(_ad7).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ad3;
};
TabBoxBinding.prototype.importTabBinding=function(_ad8){
var that=_ad8.containingTabBoxBinding;
var _ada=that.getTabPanelBinding(_ad8);
var _adb=_ada.getBindingElement();
var _adc=_ad8.getBindingElement();
that.dismissTabBinding(_ad8);
this._tabsElement.appendChild(_adc);
this._tabPanelsElement.appendChild(_adb);
this.registerTabBoxPair(_adc,_adb);
_ad8.containingTabBoxBinding=this;
this.select(_ad8);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_add){
var _ade=null;
if(_add.isSelected){
_ade=this.getBestTab(_add);
this._selectedTabBinding=null;
}
var _adf=this.getTabPanelBinding(_add);
this.unRegisterTabBoxPair(_add.bindingElement);
_add.dispose();
_adf.dispose();
if(_ade!=null){
this.select(_ade,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ae0){
if(_ae0.isSelected){
this.selectBestTab(_ae0);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ae1){
var _ae2=this.getBestTab(_ae1);
if(_ae2){
this.select(_ae2);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ae3){
var _ae4=null;
var _ae5=_ae3.getOrdinalPosition(true);
var _ae6=this.getTabBindings();
var _ae7=_ae6.getLength();
var _ae8=_ae7-1;
if(_ae7==1){
_ae4=null;
}else{
if(_ae5==_ae8){
_ae4=_ae6.get(_ae5-1);
}else{
_ae4=_ae6.get(_ae5+1);
}
}
return _ae4;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae9,_aea){
var _aeb=this.bindingDocument.getElementById(_ae9.bindingElement.id);
var tab=this.getTabElements().get(_aea);
this._tabsElement.insertBefore(_aeb,tab);
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
var _aed=this._nodename_tab;
var _aee=new List(this._tabsElement.childNodes);
var _aef=new List();
while(_aee.hasNext()){
var _af0=_aee.getNext();
if(_af0.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af0)==_aed){
_aef.add(_af0);
}
}
return _aef;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _af1=this._nodename_tabpanel;
var _af2=new List(this._tabPanelsElement.childNodes);
var _af3=new List();
_af2.each(function(_af4){
if(_af4.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_af4)==_af1){
_af3.add(_af4);
}
});
return _af3;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _af5=new List();
var _af6=this.getTabElements();
_af6.each(function(_af7){
_af5.add(UserInterface.getBinding(_af7));
});
return _af5;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af8=new List();
this.getTabPanelElements().each(function(_af9){
_af8.add(UserInterface.getBinding(_af9));
});
return _af8;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _afa=null;
if(this._selectedTabBinding){
_afa=this.getTabPanelBinding(this._selectedTabBinding);
}
return _afa;
};
TabBoxBinding.prototype._showWarning=function(_afb,_afc){
var _afd=this.getTabBinding(_afb);
if(_afc){
if(_afd.labelBinding.hasImage){
_afd._backupImage=_afd.getImage();
}
_afd.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_afd._backupImage){
_afd.setImage(_afd._backupImage);
}else{
_afd.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_afe,_aff){
var _b00=this.getTabBinding(_afe);
if((_aff&&!_b00.isSelected)||!_aff){
if(_b00.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_aff){
if(_b00.labelBinding.hasImage){
_b00._backupImage=_b00.getImage();
}
_b00.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_b00._backupImage!=null){
_b00.setImage(_b00._backupImage);
}else{
_b00.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_b01){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _b04=tab.getOrdinalPosition(true);
var next=null;
var _b06=new List();
tabs.each(function(t){
if(t.isVisible){
_b06.add(t);
}
});
if(_b06.getLength()>1){
if(_b04==0&&!_b01){
next=_b06.getLast();
}else{
if(_b04==_b06.getLength()-1&&_b01){
next=_b06.getFirst();
}else{
if(_b01){
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
var _b09=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b09.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b0a){
TabsBinding.superclass.handleAction.call(this,_b0a);
switch(_b0a.type){
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
var _b0d=self.bindingElement.offsetWidth;
if(_b0d!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b0d;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b0e){
if(_b0e instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b0e);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b0f=false;
var _b10,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b13=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b14=this.bindingElement.offsetWidth-_b13.RESERVED_SPACE;
var _b15=null;
var sum=0,_b17=0;
var _b18=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b18){
tab=tabs.getNext();
_b10=UserInterface.getBinding(tab);
if(!_b15){
_b15=_b10;
}
sum+=tab.offsetWidth;
if(sum>=_b14){
_b0f=true;
if(_b10.isSelected){
if(!DOMUtil.isFirstElement(_b10.bindingElement,true)){
this.isManaging=false;
if(_b15){
_b15.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b10,_b17-1);
_b18=false;
}
}else{
_b10.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b10);
}
}else{
_b10.show();
_b15=_b10;
_b17++;
}
}
if(_b18){
if(_b0f&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b19=_b15.getBindingElement();
var _b1a=_b19.offsetLeft+_b19.offsetWidth;
var _b1b=this.tabsButtonBinding;
setTimeout(function(){
_b1b.show(_b1a+4);
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
var _b1c=TabBinding.superclass.serialize.call(this);
if(_b1c){
_b1c.label=this.getLabel();
_b1c.image=this.getImage();
_b1c.tooltip=this.getToolTip();
}
return _b1c;
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
var _b1d=this.bindingElement.getAttribute("image");
var _b1e=this.bindingElement.getAttribute("label");
var _b1f=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b1e){
this.setLabel(_b1e);
}
if(_b1d){
this.setImage(_b1d);
}
if(_b1f){
this.setToolTip(_b1f);
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
TabBinding.prototype.setLabel=function(_b21){
if(_b21!=null){
this.setProperty("label",_b21);
if(this.isAttached){
this.labelBinding.setLabel(_b21);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b22){
if(_b22){
this.setProperty("tooltip",_b22);
if(this.isAttached){
this.labelBinding.setToolTip(_b22);
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
var _b24=false;
if(Client.isMozilla==true){
}
if(!_b24){
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
TabBinding.prototype.select=function(_b25){
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
TabBinding.newInstance=function(_b26){
var _b27=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b26);
return UserInterface.registerBinding(_b27,TabBinding);
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
var _b28=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b28=true;
this._lastKnownDimension=dim1;
}
return _b28;
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
TabPanelBinding.prototype.select=function(_b2b){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b2b!=true){
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
TabPanelBinding.prototype.handleAction=function(_b2c){
TabPanelBinding.superclass.handleAction.call(this,_b2c);
var _b2d=_b2c.target;
switch(_b2c.type){
case BalloonBinding.ACTION_INITIALIZE:
_b2c.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b2e){
var _b2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b2e);
UserInterface.registerBinding(_b2f,TabPanelBinding);
return UserInterface.getBinding(_b2f);
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
var _b30=SplitBoxBinding.superclass.serialize.call(this);
if(_b30){
_b30.orient=this.getOrient();
_b30.layout=this.getLayout();
}
return _b30;
};
SplitBoxBinding.prototype.onBindingAttach=function(){
if(this.isHorizontalOrient()&&Localization.isRtl){
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
var _b32=this.getSplitPanelElements();
if(_b32.hasEntries()){
var _b33=new List(this.getLayout().split(":"));
if(_b33.getLength()!=_b32.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b32.each(function(_b34){
_b34.setAttribute("ratio",_b33.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b35=this.getProperty("orient");
if(_b35){
this._orient=_b35;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b36=this.getSplitterBindings();
while(_b36.hasNext()){
var _b37=_b36.getNext();
if(_b37&&_b37.getProperty("collapsed")==true){
_b37.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b38){
SplitBoxBinding.superclass.handleAction.call(this,_b38);
switch(_b38.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b38.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b38.target);
_b38.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b38.target);
_b38.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b39){
this._getSplitPanelBindingForSplitter(_b39).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b3a){
this._getSplitPanelBindingForSplitter(_b3a).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b3b){
var _b3c=DOMUtil.getOrdinalPosition(_b3b.bindingElement,true);
var _b3d,_b3e=this.getSplitPanelElements();
switch(_b3b.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b3d=_b3e.get(_b3c);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b3d=_b3e.get(_b3c+1);
break;
}
return UserInterface.getBinding(_b3d);
};
SplitBoxBinding.prototype.invokeLayout=function(_b3f){
var _b40=this.isHorizontalOrient();
var _b41=this.getSplitPanelBindings();
var _b42=this.getSplitterBindings();
var _b43=new List();
var _b44,sum=0;
var _b46=0;
_b41.each(function(_b47){
if(_b47.isFixed==true){
if(!_b41.hasNext()){
_b46+=_b47.getFix();
}
_b43.add(0);
sum+=0;
}else{
_b44=_b47.getRatio();
_b43.add(_b44);
sum+=_b44;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b43.getLength()!=_b41.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b48=_b40?this.getInnerWidth():this.getInnerHeight();
_b48-=_b46;
_b42.each(function(_b49){
if(_b49.isVisible){
_b48-=SplitterBinding.DIMENSION;
}
});
var unit=_b48/sum;
var _b4b=0;
var self=this;
_b41.each(function(_b4d){
var span=0;
var _b4f=_b43.getNext();
if(_b4d.isFixed){
span=_b4d.getFix();
}else{
span=Math.floor(unit*_b4f);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b4b+=span;
while(_b4b>_b48){
_b4b--;
span--;
}
if(!_b4d.isFixed){
if(_b40){
_b4d.setWidth(span);
}else{
_b4d.setHeight(span);
}
}
});
}
if(_b3f!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b50=this.getLayout();
if(_b50){
this.setProperty("layout",_b50);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b51=this.isHorizontalOrient();
var _b52=this.getSplitPanelBindings();
var _b53=this.getSplitterBindings();
var _b54=null;
var _b55=null;
var unit=null;
var _b57=null;
var span=null;
_b52.each(function(_b59){
if(!unit){
unit=_b51?_b59.getWidth():_b59.getHeight();
}
span=_b51?_b59.getWidth():_b59.getHeight();
if(_b57){
span-=_b57;
_b57=null;
}
_b54=_b53.getNext();
if(_b54&&_b54.offset){
_b57=_b54.offset;
span+=_b57;
}
_b59.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b5a){
this.logger.debug(_b5a);
this.setProperty("layout",_b5a);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b5b="",_b5c=this.getSplitPanelBindings();
_b5c.each(function(_b5d){
_b5b+=_b5d.getRatio().toString();
_b5b+=_b5c.hasNext()?":":"";
});
this.setProperty("layout",_b5b);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b5e=this.getSplitPanelElements();
_b5e.each(function(_b5f){
layout+="1"+(_b5e.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b60){
this.bindingElement.style.width=_b60+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b61){
this.bindingElement.style.height=_b61+"px";
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
var _b62=this.getChildElementsByLocalName("splitpanel");
if(this.isHorizontalOrient()&&Localization.isRtl){
_b62.reverse();
}
return _b62;
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
SplitBoxBinding.prototype.fit=function(_b63){
if(!this.isFit||_b63){
if(this.isHorizontalOrient()){
var max=0;
var _b65=this.getSplitPanelBindings();
_b65.each(function(_b66){
var _b67=_b66.bindingElement.offsetHeight;
max=_b67>max?_b67:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b68){
var _b69=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b68);
return UserInterface.registerBinding(_b69,SplitBoxBinding);
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
var _b6c=this.getProperty("hidden");
if(_b6c){
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
var _b6d=this.getProperty("ratiocache");
if(_b6d){
this.setRatio(_b6d);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b6e){
if(!this.isFixed){
if(_b6e!=this.getWidth()){
if(_b6e<0){
_b6e=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b6e+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b6e);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b6f=null;
if(this.isFixed){
_b6f=this.getFix();
}else{
_b6f=this.bindingElement.offsetWidth;
}
return _b6f;
};
SplitPanelBinding.prototype.setHeight=function(_b70){
if(!this.isFixed){
if(_b70!=this.getHeight()){
try{
this.bindingElement.style.height=_b70+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b71=null;
if(this.isFixed){
_b71=this.getFix();
}else{
_b71=this.bindingElement.offsetHeight;
}
return _b71;
};
SplitPanelBinding.prototype.setRatio=function(_b72){
this.setProperty("ratio",_b72);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b73){
if(_b73){
this._fixedSpan=_b73;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b73);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b73);
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
SplitPanelBinding.newInstance=function(_b74){
var _b75=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b74);
return UserInterface.registerBinding(_b75,SplitPanelBinding);
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
var _b76=SplitBoxBinding.superclass.serialize.call(this);
if(_b76){
_b76.collapse=this.getProperty("collapse");
_b76.collapsed=this.getProperty("collapsed");
_b76.disabled=this.getProperty("isdisabled");
}
return _b76;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b77=this.getProperty("hidden");
if(_b77){
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
SplitterBinding.prototype.setCollapseDirection=function(_b79){
this.setProperty("collapse",_b79);
this._collapseDirection=_b79;
};
SplitterBinding.prototype.handleAction=function(_b7a){
SplitterBinding.superclass.handleAction.call(this,_b7a);
switch(_b7a.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b7a.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b7c=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b7c.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b7c.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b7d){
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
SplitterBinding.newInstance=function(_b88){
var _b89=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b88);
return UserInterface.registerBinding(_b89,SplitterBinding);
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
var _b8a=this.getProperty("selectedindex");
var _b8b=this.getDeckElements();
if(_b8b.hasEntries()){
var _b8c=false;
var _b8d=0;
while(_b8b.hasNext()){
var deck=_b8b.getNext();
if(_b8a&&_b8d==_b8a){
deck.setAttribute("selected","true");
_b8c=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b8c=true;
}
}
_b8d++;
}
if(!_b8c){
_b8b.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b90=this.getBindingForArgument(arg);
if(_b90!=null){
if(_b90!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b90.select();
this._selectedDeckBinding=_b90;
var _b91=this.getProperty("selectedindex");
if(_b91!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b90.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b92=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b92=true;
this._lastKnownDimension=dim1;
}
return _b92;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b95){
var _b96=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b95);
return UserInterface.registerBinding(_b96,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b97){
DeckBinding.superclass.handleAction.call(this,_b97);
var _b98=_b97.target;
switch(_b97.type){
case BalloonBinding.ACTION_INITIALIZE:
_b97.consume();
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
DeckBinding.newInstance=function(_b9a){
var _b9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b9a);
return UserInterface.registerBinding(_b9b,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b9c){
if(_b9c instanceof ToolBarBodyBinding){
if(_b9c.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b9c;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b9c;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b9c);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b9d=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b9d){
this.setImageSize(_b9d);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b9f=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b9f.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b9f.isDefaultContent=true;
this.add(_b9f);
_b9f.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _ba1=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_ba1);
}
if(_ba1!=null&&_ba1.hasClassName("max")){
this._maxToolBarGroup(_ba1,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_ba3){
var _ba4=this.boxObject.getDimension().w;
var _ba5=CSSComputer.getPadding(this.bindingElement);
_ba4-=(_ba5.left+_ba5.right);
if(_ba3!=null){
_ba4-=_ba3.boxObject.getDimension().w;
if(!Client.isWindows){
_ba4-=1;
}
if(Client.isExplorer){
_ba4-=15;
}
}
max.bindingElement.style.width=_ba4+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ba6){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ba6);
};
ToolBarBinding.prototype.addLeft=function(_ba7,_ba8){
var _ba9=null;
if(this._toolBarBodyLeft!=null){
_ba9=this._toolBarBodyLeft.add(_ba7,_ba8);
}else{
throw new Error("No left toolbarbody");
}
return _ba9;
};
ToolBarBinding.prototype.addLeftFirst=function(_baa,_bab){
var _bac=null;
if(this._toolBarBodyLeft){
_bac=this._toolBarBodyLeft.addFirst(_baa,_bab);
}else{
throw new Error("No left toolbarbody");
}
return _bac;
};
ToolBarBinding.prototype.addRight=function(_bad){
var _bae=null;
if(this._toolBarBodyRight){
_bae=this._toolBarBodyRight.add(_bad);
}else{
throw new Error("No left toolbarbody");
}
return _bae;
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
ToolBarBinding.newInstance=function(_bb1){
var _bb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_bb1);
return UserInterface.registerBinding(_bb2,ToolBarBinding);
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
var _bb3=this.getDescendantBindingsByLocalName("toolbargroup");
var _bb4=new List();
var _bb5=true;
_bb3.each(function(_bb6){
if(_bb6.isVisible&&!_bb6.isDefaultContent){
_bb4.add(_bb6);
}
});
while(_bb4.hasNext()){
var _bb7=_bb4.getNext();
_bb7.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bb5){
_bb7.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bb5=false;
}
if(!_bb4.hasNext()){
_bb7.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bba=list.getNext();
var _bbb=_bba.getEqualSizeWidth();
if(_bbb>max){
max=_bbb;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bba=list.getNext();
_bba.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bbc,_bbd){
var _bbe=ToolBarBinding.superclass.add.call(this,_bbc);
if(!_bbd){
if(_bbc instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bbe;
};
ToolBarBodyBinding.prototype.addFirst=function(_bbf,_bc0){
var _bc1=ToolBarBinding.superclass.addFirst.call(this,_bbf);
if(!_bc0){
if(_bbf instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bc1;
};
ToolBarBodyBinding.newInstance=function(_bc2){
var _bc3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bc2);
return UserInterface.registerBinding(_bc3,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bc4){
switch(_bc4){
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
var _bc5=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc5)=="toolbarbody"){
UserInterface.getBinding(_bc5).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bc6=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bc6)=="toolbarbody"){
UserInterface.getBinding(_bc6).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bc7){
var _bc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bc7);
return UserInterface.registerBinding(_bc8,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bc9){
var _bca=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc9);
return UserInterface.registerBinding(_bca,ToolBarButtonBinding);
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
var _bcb=this.getProperty("label");
var _bcc=this.getProperty("image");
if(_bcb){
this.setLabel(_bcb);
}
if(_bcc){
this.setImage(_bcc);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bcd,_bce){
if(this.isAttached){
this._labelBinding.setLabel(_bcd,_bce);
}
this.setProperty("label",_bcd);
};
ToolBarLabelBinding.prototype.setImage=function(_bcf,_bd0){
if(this.isAttached){
this._labelBinding.setImage(_bcf,_bd0);
}
this.setProperty("image",_bcf);
};
ToolBarLabelBinding.newInstance=function(_bd1){
var _bd2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bd1);
return UserInterface.registerBinding(_bd2,ToolBarLabelBinding);
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
var _bd3=this.getDescendantBindingsByLocalName("clickbutton");
if(_bd3.hasEntries()){
while(_bd3.hasNext()){
var _bd4=_bd3.getNext();
if(_bd4.isDefault){
this._defaultButton=_bd4;
_bd4.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bd4.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bd3;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bd5,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bd5,arg);
switch(_bd5){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bd7=this.getAncestorBindingByType(DialogBinding,true);
if(_bd7!=null&&_bd7.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bd8){
DialogToolBarBinding.superclass.handleAction.call(this,_bd8);
var _bd9=_bd8.target;
var _bda=false;
var _bdb=this._buttons.reset();
if(_bd9 instanceof ClickButtonBinding){
switch(_bd8.type){
case Binding.ACTION_FOCUSED:
_bd9.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd9;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd9.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bda&&_bdb.hasNext()){
var _bdc=_bdb.getNext();
_bda=_bdc.isFocused;
}
if(!_bda){
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
ComboBoxBinding.newInstance=function(_bde){
var _bdf=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bde);
return UserInterface.registerBinding(_bdf,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_be0,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_be0,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _be4=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_be4.each(function(_be5){
var _be6=_be5.getProperty("oncommand");
_be5.setProperty("hiddencommand",_be6);
_be5.deleteProperty("oncommand");
_be5.oncommand=function(){
self.setAndFireButton(this);
};
});
var _be7=null;
var _be8=this.getActiveMenuItemId();
_be4.reset();
while(_be4.hasNext()){
var _be9=_be4.getNext();
if(_be9.getProperty("id")==_be8){
_be7=_be9;
break;
}
}
if(_be7==null&&_be4.hasEntries()){
_be7=_be4.getFirst();
}
if(_be7!=null){
this.setButton(_be7);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bea){
if(_bea instanceof MenuItemBinding){
var _beb=_bea.getProperty("label");
var _bec=_bea.getProperty("image");
var _bed=_bea.getProperty("image-hover");
var _bee=_bea.getProperty("image-active");
var _bef=_bea.getProperty("image-disabled");
var _bf0=_bea.getProperty("hiddencommand");
this.setLabel(_beb?_beb:"");
this.image=_bec;
this.imageHover=_bec;
this.imageActive=_bee;
this.imageDisabled=_bef;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bf0,this);
};
this.hideActiveItem(_bea);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bf1){
if(_bf1 instanceof MenuItemBinding){
this.setButton(_bf1);
this.setActiveMenuItemId(_bf1.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bf2){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bf3){
if(_bf3==_bf2){
Binding.prototype.hide.call(_bf3);
}else{
Binding.prototype.show.call(_bf3);
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
var _bf5=this._views;
for(var _bf6 in ViewDefinitions){
var def=ViewDefinitions[_bf6];
var key=def.perspective;
if(key!=null){
if(!_bf5.has(key)){
_bf5.set(key,new List());
}
var list=_bf5.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bfa,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bfa,arg);
switch(_bfa){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bfd=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bfd.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bfd.add(StageViewMenuItemBinding.newInstance(_bfd.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bfd.show();
}else{
_bfd.hide();
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
TreeBinding.grid=function(_c01){
var _c02=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_c01);
var _c04=_c01%_c02;
if(_c04>0){
_c01=_c01-_c04+_c02;
}
return _c01+TreeBodyBinding.PADDING_TOP;
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
var _c05=this.getProperty("focusable");
if(_c05!=null){
this._isFocusable=_c05;
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
var _c07=this.getProperty("builder");
if(_c07){
this._buildFromTextArea(_c07);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _c08=this.getProperty("selectable");
var _c09=this.getProperty("selectionproperty");
var _c0a=this.getProperty("selectionvalue");
if(_c08){
this.setSelectable(true);
if(_c09){
this.setSelectionProperty(_c09);
}
if(_c0a){
this.setSelectionValue(_c0a);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c0d=UserInterface.getBinding(area);
var _c0e=this._treeBodyBinding;
function build(){
_c0e.subTreeFromString(area.value);
}
_c0d.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c0f){
var _c10=_c0f.getHandle();
if(this._treeNodeBindings.has(_c10)){
throw "Duplicate treenodehandles registered: "+_c0f.getLabel();
}else{
this._treeNodeBindings.set(_c10,_c0f);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c10)){
_c0f.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c12){
this._treeNodeBindings.del(_c12.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c13){
var _c14=null;
if(this._treeNodeBindings.has(_c13)){
_c14=this._treeNodeBindings.get(_c13);
}else{
throw "No such treenode: "+_c13;
}
return _c14;
};
TreeBinding.prototype.handleAction=function(_c15){
TreeBinding.superclass.handleAction.call(this,_c15);
var _c16=_c15.target;
switch(_c15.type){
case TreeNodeBinding.ACTION_OPEN:
_c15.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c16);
_c15.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c16;
this.focusSingleTreeNodeBinding(_c16);
if(!this.isFocused){
this.focus();
}
_c15.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c16;
this.focusSingleTreeNodeBinding(_c16);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c16;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c16;
this.focusSingleTreeNodeBinding(_c16);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c15.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c16.isFocused){
this.blurSelectedTreeNodes();
}
_c15.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c17,_c18){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c19){
if(_c19!=null&&!_c19.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c19);
_c19.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c1a){
this.blurSelectedTreeNodes();
while(_c1a.hasNext()){
var _c1b=_c1a.getNext();
this._focusedTreeNodeBindings.add(_c1b);
_c1b.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c1c=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c1d=false;
var _c1e=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c1f=this._focusedTreeNodeBindings.getNext();
var _c20=_c1f.getProperty(this._selectionProperty);
if(_c20!=null){
if(!this._selectionValue||this._selectionValue[_c20]){
_c1e=(this._selectedTreeNodeBindings[_c1f.key]=_c1f);
var _c21=_c1c[_c1f.key];
if(!_c21||_c21!=_c1e){
_c1d=true;
}
}
}
}
if(_c1e){
if(_c1d){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c1c){
for(var key in _c1c){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c23=new List();
for(var key in this._selectedTreeNodeBindings){
_c23.add(this._selectedTreeNodeBindings[key]);
}
return _c23;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c25){
_c25.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c26){
var _c27=_c26.getDescendantBindingsByLocalName("treenode");
var _c28=true;
var self=this;
_c27.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c28;
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
var _c2b=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c2b!=null){
this.focusSingleTreeNodeBinding(_c2b);
_c2b.callback();
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
TreeBinding.prototype.add=function(_c2c){
var _c2d=null;
if(this._treeBodyBinding){
_c2d=this._treeBodyBinding.add(_c2c);
}else{
this._treeNodeBuffer.add(_c2c);
_c2d=_c2c;
}
return _c2d;
};
TreeBinding.prototype.addFirst=function(_c2e){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c2f=this._treeBodyBinding.bindingElement;
_c2f.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c30,_c31){
if(_c31.isContainer&&_c31.isOpen){
_c31.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c32){
this._isSelectable=_c32;
if(_c32){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c33){
this._selectionProperty=_c33;
};
TreeBinding.prototype.setSelectionValue=function(_c34){
if(_c34){
var list=new List(_c34.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c36,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c36,arg);
switch(_c36){
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
var _c38=this.getFocusedTreeNodeBindings();
if(_c38.hasEntries()){
var node=_c38.getFirst();
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
var _c3b=this.getFocusedTreeNodeBindings();
if(_c3b.hasEntries()){
var node=_c3b.getFirst();
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
var _c3e=null;
while(next==null&&(_c3e=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c3e!=null){
next=_c3e.getNextBindingByLocalName("treenode");
}
node=_c3e;
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
var _c40=DOMEvents.getTarget(e);
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
var _c41=new TreeCrawler();
var list=new List();
_c41.mode=TreeCrawler.MODE_GETOPEN;
_c41.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c44=list.getNext();
map.set(_c44.getHandle(),true);
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
var _c49=this._positionIndicatorBinding;
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
if(y!=_c49.getPosition().y){
_c49.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c49.isVisible){
_c49.show();
}
}else{
if(_c49.isVisible){
_c49.hide();
}
}
}else{
if(_c49.isVisible){
_c49.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c4c){
this._acceptingTreeNodeBinding=_c4c;
this._acceptingPosition=_c4c.boxObject.getLocalPosition();
this._acceptingDimension=_c4c.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c4c);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c4d){
var map={};
var _c4f=_c4d.getChildBindingsByLocalName("treenode");
var _c50,pos,dim,y;
y=TreeBinding.grid(_c4d.boxObject.getLocalPosition().y);
map[y]=true;
while(_c4f.hasNext()){
_c50=_c4f.getNext();
pos=_c50.boxObject.getLocalPosition();
dim=_c50.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c56 in this._acceptingPositions){
if(_c56==y){
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
TreeBinding.newInstance=function(_c57){
var _c58=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c57);
var _c59=UserInterface.registerBinding(_c58,TreeBinding);
_c59.treeBodyBinding=TreeBodyBinding.newInstance(_c57);
return _c59;
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
TreeBodyBinding.prototype.accept=function(_c5a){
if(_c5a instanceof TreeNodeBinding){
this.logger.debug(_c5a);
}
};
TreeBodyBinding.prototype.handleAction=function(_c5b){
TreeBodyBinding.superclass.handleAction.call(this,_c5b);
switch(_c5b.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c5b.target);
_c5b.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c5c){
var _c5d=_c5c.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c5d.offsetTop;
var h=_c5d.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c5d.scrollIntoView(true);
}else{
if(y-t+h>a){
_c5d.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_c63){
var _c64=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c63);
return UserInterface.registerBinding(_c64,TreeBodyBinding);
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
var _c65=TreeNodeBinding.superclass.serialize.call(this);
if(_c65){
_c65.label=this.getLabel();
_c65.image=this.getImage();
var _c66=this.getHandle();
if(_c66&&_c66!=this.key){
_c65.handle=_c66;
}
if(this.isOpen){
_c65.open=true;
}
if(this.isDisabled){
_c65.disabled=true;
}
if(this.dragType){
_c65.dragtype=this.dragType;
}
if(this.dragAccept){
_c65.dragaccept=this.dragAccept;
}
}
return _c65;
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
var _c68=UserInterface.getBinding(node);
if(_c68&&_c68.containingTreeBinding){
this.containingTreeBinding=_c68.containingTreeBinding;
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
var _c69=this.key;
var _c6a=this.getProperty("handle");
if(_c6a){
_c69=_c6a;
}
return _c69;
};
TreeNodeBinding.prototype.setHandle=function(_c6b){
this.setProperty("handle",_c6b);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c6d=this.getProperty("label");
var _c6e=this.getProperty("tooltip");
var _c6f=this.getProperty("oncommand");
var _c70=this.getProperty("onbindingfocus");
var _c71=this.getProperty("onbindingblur");
var _c72=this.getProperty("focused");
var _c73=this.getProperty("callbackid");
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
if(_c6d!=null){
this.setLabel(_c6d);
}
if(_c6e!=null){
this.setToolTip(_c6e);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c75=this.bindingWindow.WindowManager;
if(_c6f!=null){
this.oncommand=function(){
Binding.evaluate(_c6f,this);
};
}
if(_c70!=null){
this.onfocus=function(){
Binding.evaluate(_c70,this);
};
}
if(_c71!=null){
this.onblur=function(){
Binding.evaluate(_c71,this);
};
}
if(_c72==true){
this.focus();
}
if(_c73!=null){
Binding.dotnetify(this,_c73);
}
};
TreeNodeBinding.prototype.handleAction=function(_c76){
TreeNodeBinding.superclass.handleAction.call(this,_c76);
switch(_c76.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c76.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c77,_c78){
var _c79=true;
if(_c77 instanceof TreeNodeBinding){
var _c7a=false;
var _c7b=this.bindingElement;
var _c7c=this.containingTreeBinding.bindingElement;
while(!_c7a&&_c7b!=_c7c){
if(_c7b==_c77.getBindingElement()){
_c7a=true;
}else{
_c7b=_c7b.parentNode;
}
}
if(_c7a){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c79=false;
}else{
this.acceptTreeNodeBinding(_c77,_c78);
}
}else{
_c79=false;
}
return _c79;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c7d,_c7e){
var _c7f=_c7d.serializeToString();
var _c80=new BindingParser(this.bindingDocument);
var _c81=_c80.parseFromString(_c7f).getFirst();
_c7e=_c7e?_c7e:this.containingTreeBinding.getDropIndex();
var _c82=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c81,_c82.get(_c7e));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c7d.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c83=this.getProperty("image");
var _c84=this.getProperty("image-active");
var _c85=this.getProperty("image-disabled");
_c84=_c84?_c84:this.isContainer?_c83?_c83:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c83?_c83:TreeNodeBinding.DEFAULT_ITEM;
_c85=_c85?_c85:this.isContainer?_c83?_c83:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c83?_c83:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c83=_c83?_c83:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c83,imageHover:null,imageActive:_c84,imageDisabled:_c85});
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
TreeNodeBinding.prototype.setLabel=function(_c87){
this.setProperty("label",String(_c87));
if(this.isAttached){
this.labelBinding.setLabel(String(_c87));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c88){
this.setProperty("tooltip",String(_c88));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c88));
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
var _c89=this.imageProfile.getDefaultImage();
var _c8a=this.imageProfile.getActiveImage();
_c8a=_c8a?_c8a:_c89;
return this.isOpen?_c8a:_c89;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c8c=DOMEvents.getTarget(e);
var _c8d=this.labelBinding.bindingElement;
var _c8e=this.labelBinding.shadowTree.labelBody;
var _c8f=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c8c){
case _c8d:
this._onAction(e);
break;
case _c8e:
case _c8f:
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
if(_c8c.parentNode==this.bindingElement&&_c8c.__updateType==Update.TYPE_INSERT){
var _c8d=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c8c)=="treenode"){
if(_c8c==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c8c,_c8d.nextSibling);
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
switch(_c8c){
case _c8d:
case _c8e:
case _c8f:
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
var _c93=true;
if(e.type=="mousedown"){
var _c94=e.button==(e.target?0:1);
if(!_c94){
_c93=false;
}
}
if(_c93){
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
var _c96=false;
if(e!=null){
_c96=e.shiftKey;
}
this.dispatchAction(_c96?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c99=this.getDescendantBindingsByLocalName("treenode");
_c99.each(function(_c9a){
_c9a.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c9b){
var _c9c=_c9b.getAttribute("focused");
if(_c9c=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c9d){
var _c9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c9d);
return UserInterface.registerBinding(_c9e,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c9f){
var _ca0=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c9f);
return UserInterface.registerBinding(_ca0,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_ca1){
this.bindingElement.style.left=_ca1.x+"px";
this.bindingElement.style.top=_ca1.y+"px";
this._geometry.x=_ca1.x;
this._geometry.y=_ca1.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_ca2){
var _ca3=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_ca2);
return UserInterface.registerBinding(_ca3,TreePositionIndicatorBinding);
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
this.addFilter(function(_ca5){
var _ca6=UserInterface.getBinding(_ca5);
var _ca7=null;
var _ca7=null;
if(!_ca6 instanceof TreeNodeBinding){
_ca7=NodeCrawler.SKIP_NODE;
}
return _ca7;
});
this.addFilter(function(_ca8,list){
var _caa=UserInterface.getBinding(_ca8);
var _cab=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_caa.isOpen){
list.add(_caa);
}
break;
}
return _cab;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_cac){
this.binding=_cac;
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
DockTabsButtonBinding.newInstance=function(_cad){
var _cae=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cad);
_cae.setAttribute("type","checkbox");
_cae.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_cae.className="tabbutton";
return UserInterface.registerBinding(_cae,DockTabsButtonBinding);
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
var _caf=DockBinding.superclass.serialize.call(this);
if(_caf){
_caf.active=this.isActive?true:null;
_caf.collapsed=this.isCollapsed?true:null;
}
return _caf;
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
var _cb0=UserInterface.getBinding(this.bindingElement.parentNode);
var _cb1=MatrixBinding.newInstance(this.bindingDocument);
_cb1.attachClassName("dockliner");
this.shadowTree.dockLiner=_cb1;
_cb0.add(_cb1);
_cb1.attach();
_cb1.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_cb3){
var _cb4=this.getSelectedTabPanelBinding();
if(_cb4){
_cb4.isVisible=_cb3;
_cb4.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cb5){
var _cb6=this._getBindingForDefinition(_cb5);
var _cb7=DockTabBinding.newInstance(this.bindingDocument);
_cb7.setHandle(_cb5.handle);
_cb7.setLabel(_cb5.flowHandle?null:_cb5.label);
_cb7.setImage(_cb5.image);
_cb7.setToolTip(_cb5.toolTip);
_cb7.setEntityToken(_cb5.entityToken);
_cb7.setAssociatedView(_cb6);
this.appendTabByBindings(_cb7,null);
this._setupPageBindingListeners(_cb7);
var _cb8=this.getTabPanelBinding(_cb7);
_cb6.snapToBinding(_cb8);
var _cb9=this.bindingWindow.bindingMap.views;
_cb9.add(_cb6);
if(!this.isActive){
this.activate();
}
_cb6.attach();
};
DockBinding.prototype.prepareOpenView=function(_cba,_cbb){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cbb.setLabel(_cba.label);
_cbb.setImage(_cba.image);
_cbb.setToolTip(_cba.toolTip);
this._setupPageBindingListeners(_cbb);
var _cbc=this.getTabPanelBinding(_cbb);
var _cbd=this._getBindingForDefinition(_cba);
_cbb.setAssociatedView(_cbd);
_cbd.snapToBinding(_cbc);
UserInterface.getBinding(this.bindingDocument.body).add(_cbd);
_cbd.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cbe){
var _cbf=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cbf.bindingDocument);
view.setDefinition(_cbe);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cc1){
var _cc2=this.getTabPanelBinding(_cc1);
var self=this;
var _cc4={handleAction:function(_cc5){
var _cc6=_cc5.target;
switch(_cc5.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cc6.reflex(true);
var view=_cc1.getAssociatedView();
if(_cc6.bindingWindow==view.getContentWindow()){
_cc1.updateDisplay(_cc6);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cc1.onPageInitialize(_cc6);
_cc5.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cc1.getAssociatedView();
if(_cc6.bindingWindow==view.getContentWindow()){
_cc1.updateDisplay(_cc6);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cc1.updateDisplay(_cc6);
_cc5.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cc1.updateEntityToken(_cc6);
_cc5.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cc1.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cc1.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cc1);
_cc5.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cc1,true);
_cc5.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cc1);
break;
case Binding.ACTION_FORCE_REFLEX:
_cc2.reflex(true);
_cc5.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cc1.isDirty){
_cc1.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cc8){
_cc2.addActionListener(_cc8,_cc4);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc9){
DockBinding.superclass.handleAction.call(this,_cc9);
var _cca=_cc9.target;
switch(_cc9.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc9.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cca instanceof DockBinding){
if(_cca.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cca);
if(this.isActive){
_cca.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cca);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_ccb,arg){
DockBinding.superclass.handleBroadcast.call(this,_ccb,arg);
switch(_ccb){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ccd=arg;
if(_ccd.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ccd.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cce){
var tabs=this.getTabBindings();
var _cd0=false;
while(tabs.hasNext()&&!_cd0){
var tab=tabs.getNext();
var _cd2=tab.getEntityToken();
if(_cd2!=null&&_cd2==_cce){
if(!tab.isSelected){
this.select(tab,true);
_cd0=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cd3){
this._handleCollapse(true,_cd3);
};
DockBinding.prototype.unCollapse=function(_cd4){
this._handleCollapse(false,_cd4);
};
DockBinding.prototype._handleCollapse=function(_cd5,_cd6){
var _cd7=this.getChildBindingByLocalName("dockpanels");
var _cd8=this.getAncestorBindingByLocalName("splitbox");
if(_cd5){
_cd7.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cd6&&_cd8.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cd7.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cd6){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cd5);
this.isCollapsed=_cd5;
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
DockBinding.prototype.closeTab=function(_cdd,_cde){
if(_cdd.isDirty&&!_cde){
var _cdf=Resolver.resolve(_cdd.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cdf),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_ce1){
switch(_ce1){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cdd);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cdd);
break;
}
}});
}else{
this.removeTab(_cdd);
}
};
DockBinding.prototype.closeTabsExcept=function(_ce2){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ce2){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ce5){
var _ce6=_ce5.getAssociatedView();
_ce6.saveContainedEditor();
var self=this;
var _ce8={handleBroadcast:function(_ce9,arg){
switch(_ce9){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ce6.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ce8);
if(arg.isSuccess){
self.removeTab(_ce5);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ce8);
};
DockBinding.prototype.appendTabByBindings=function(_ceb,_cec){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ceb,_cec);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ced){
_ced=_ced?_ced+"px":"100%";
this.bindingElement.style.width=_ced;
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
DockBinding.prototype.showControls=function(_cee){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cee){
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
var _cf1=DockControlBinding.newInstance(this.bindingDocument);
_cf1.setControlType(type);
return _cf1;
};
DockTabsBinding.prototype.flex=function(){
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
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cf4){
DockTabsBinding.superclass.handleCrawler.call(this,_cf4);
switch(_cf4.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cf6=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cf6)){
_cf6=_cf6>0?_cf6-1:0;
self.bindingElement.style.width=new String(_cf6)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cf7){
var _cf8=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cf7);
return UserInterface.registerBinding(_cf8,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cf9){
this._viewBinding=_cf9;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cfa=DockTabBinding.superclass.serialize.call(this);
if(_cfa){
_cfa.label=null;
_cfa.image=null;
_cfa.handle=this.getHandle();
}
return _cfa;
};
DockTabBinding.prototype.setHandle=function(_cfb){
this.setProperty("handle",_cfb);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cfc){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cfc;
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
var _cfd=DialogControlBinding.newInstance(this.bindingDocument);
_cfd.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cfd);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cfe){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cfe){
this.isDirty=_cfe;
if(Binding.exists(this.labelBinding)){
var _cff=this.labelBinding.getLabel();
if(_cff!=null){
this.labelBinding.setLabel(_cfe?"*"+_cff:_cff.slice(1,_cff.length));
}else{
this.labelBinding.setLabel(_cfe?"*":"");
}
}
}
var _d00=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_d00.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_d00.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_d01){
this.setLabel(_d01.getLabel());
this.setImage(_d01.getImage());
this.setToolTip(_d01.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_d02){
this.setEntityToken(_d02.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_d03){
DockTabBinding.superclass.handleAction.call(this,_d03);
var _d04=_d03.target;
switch(_d03.type){
case ControlBinding.ACTION_COMMAND:
if(_d04.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_d03.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_d04);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_d05){
var cmd=_d05.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_d07){
if(!_d07){
if(!this.getLabel()){
_d07=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_d07=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_d07=this.isDirty?"*"+_d07:_d07;
DockTabBinding.superclass.setLabel.call(this,_d07);
};
DockTabBinding.prototype.setImage=function(_d08){
if(!_d08){
if(!this.getImage()){
_d08=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_d08=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_d08);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d0b=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d0b;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d0b;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d0b;
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
var _d0d=this.bindingElement;
setTimeout(function(){
_d0d.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d0e,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d0e,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d0e){
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
DockTabBinding.prototype.select=function(_d13){
DockTabBinding.superclass.select.call(this,_d13);
this._updateBroadcasters();
if(_d13!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d14=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d15=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d15.enable();
if(this.isDirty){
_d14.enable();
}else{
_d14.disable();
}
}else{
_d15.disable();
_d14.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d16){
if(this._canUpdateTree||_d16){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d17=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d19=win.bindingMap.savebutton;
if(_d19!=null){
_d17=true;
}
}
}
return _d17;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d1a){
var _d1b=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d1a);
return UserInterface.registerBinding(_d1b,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d1c){
var _d1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d1c);
return UserInterface.registerBinding(_d1d,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d1e){
DockPanelBinding.superclass.select.call(this,_d1e);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d1f){
DockPanelBinding.superclass.handleCrawler.call(this,_d1f);
if(_d1f.response==null){
if(_d1f.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d1f.id==FocusCrawler.ID){
_d1f.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d20){
var _d21=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d20);
return UserInterface.registerBinding(_d21,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d22){
var _d23=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d22);
return UserInterface.registerBinding(_d23,DockControlBinding);
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
ViewBinding.getInstance=function(_d24){
var _d25=ViewBinding._instances.get(_d24);
if(!_d25){
var cry="ViewBinding.getInstance: No such instance: "+_d24;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d25;
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
var _d28=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d28){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d29=snap.boxObject.getGlobalPosition();
var _d2a=snap.boxObject.getDimension();
if(!Point.isEqual(_d29,this._lastknownposition)){
this.setPosition(_d29);
this._lastknownposition=_d29;
}
if(!Dimension.isEqual(_d2a,this._lastknowndimension)){
this.setDimension(_d2a);
this._lastknowndimension=_d2a;
var _d2b=_d2a.h-ViewBinding.VERTICAL_ADJUST;
_d2b=_d2b<0?0:_d2b;
this.windowBinding.getBindingElement().style.height=new String(_d2b)+"px";
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
var _d2c=this._viewDefinition.flowHandle;
if(_d2c!=null){
FlowControllerService.CancelFlow(_d2c);
}
}
if(this._viewDefinition!=null){
var _d2d=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d2d);
this.logger.fine("ViewBinding closed: \""+_d2d+"\"");
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
var _d2f=null;
if(this._viewDefinition!=null){
_d2f=this._viewDefinition.handle;
}
return _d2f;
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
ViewBinding.prototype.setDefinition=function(_d30){
this._viewDefinition=_d30;
if(_d30.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d31){
ViewBinding.superclass.handleAction.call(this,_d31);
var _d32=_d31.target;
switch(_d31.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d31.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d32.isActivated){
_d32.onActivate();
}
}
_d31.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d32==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d31.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d32==this._snapBinding){
if(_d32.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d32.getContentWindow().isPostBackDocument){
if(_d31.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d32.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d32==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d32.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d31.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d31.type==WindowBinding.ACTION_ONLOAD){
var win=_d32.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d32);
}
}
}
_d31.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d32.label&&this._viewDefinition.label){
_d32.label=this._viewDefinition.label;
}
if(!_d32.image&&this._viewDefinition.image){
_d32.image=this._viewDefinition.image;
}
if(_d32.bindingWindow==this.getContentWindow()){
this._pageBinding=_d32;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d32.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d32==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d31.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d31.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d37,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d37,arg);
switch(_d37){
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
var _d3b=def.argument;
if(_d3b!=null){
page.setPageArgument(_d3b);
}
var _d3c=def.width;
if(_d3c!=null){
page.width=_d3c;
}
var _d3d=def.height;
if(_d3d!=null){
page.height=_d3d;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d3e){
ViewBinding.superclass.handleCrawler.call(this,_d3e);
switch(_d3e.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d3e.id==FocusCrawler.ID){
if(_d3e.previousNode!=this._snapBinding.bindingElement){
_d3e.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d3e.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d3f){
_d3f.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d3f.x+"px";
this.bindingElement.style.top=_d3f.y+"px";
};
ViewBinding.prototype.setDimension=function(_d40){
_d40.h-=ViewBinding.VERTICAL_ADJUST;
_d40.w-=ViewBinding.HORIZONTAL_ADJUST;
_d40.w-=1;
if(_d40.h<0){
_d40.h=0;
}
if(_d40.w<0){
_d40.w=0;
}
this.bindingElement.style.width=String(_d40.w)+"px";
this.bindingElement.style.height=String(_d40.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d41){
this.isFlexBoxBehavior=false;
_d41.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d41.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d41.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d41;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d42=null;
if(this.isFreeFloating==true){
_d42=this._snapBinding.getBindingElement();
}else{
_d42=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d42;
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
ViewBinding.prototype.reload=function(_d43){
this._isLoaded=false;
this.windowBinding.reload(_d43);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d44=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d44=true;
}
}
if(!_d44){
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
ViewBinding.newInstance=function(_d48){
var _d49=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d48);
var _d4a=UserInterface.registerBinding(_d49,ViewBinding);
_d4a.windowBinding=_d4a.add(WindowBinding.newInstance(_d48));
return _d4a;
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
var _d52=this.bindingWindow.__doPostBack;
var _d53=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d53){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d54,_d55){
if(!form.__isSetup){
Application.lock(self);
_d53=true;
}
self.manifestAllDataBindings();
_d52(_d54,_d55);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d56,list){
var _d58=this.bindingWindow.bindingMap.__REQUEST;
if(_d58!=null&&this._isDotNet()){
switch(_d56){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d58.postback(_d56);
}
}
break;
default:
_d58.postback(_d56);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d56,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d59,list){
var _d5b=this.getDescendantBindingsByType(WindowBinding);
_d5b.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d59,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d5f){
if(_d5f.name==null||_d5f.name==""){
return;
}
list.add({name:_d5f.name,value:_d5f.value});
});
var out="";
list.each(function(_d61){
out+=_d61.name+": "+_d61.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d62){
PageBinding.superclass.handleAction.call(this,_d62);
var _d63=_d62.target;
switch(_d62.type){
case RootBinding.ACTION_PHASE_3:
if(_d63==UserInterface.getBinding(this.bindingDocument.body)){
_d63.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d63);
}
_d62.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d64=this.validateAllDataBindings();
if(_d64){
this.doPostBack(_d63);
}
}
_d62.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d62.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d63.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d63.key)){
this._initBlockers.del(_d63.key);
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
var _d66={handleAction:function(_d67){
if(_d67.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d66);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d66);
}else{
MessageQueue.udpdate();
}
_d62.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d68,arg){
PageBinding.superclass.handleBroadcast.call(this,_d68,arg);
switch(_d68){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d6a=arg;
if(!this._canPostBack&&!_d6a){
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
PageBinding.prototype.doPostBack=function(_d6c){
if(this._canPostBack){
if(_d6c!=null&&this._isDotNet()){
var _d6d=_d6c.getCallBackID();
var _d6e=_d6c.getCallBackArg();
if(_d6d!=null){
_d6d=_d6d.replace(/_/g,"$");
}else{
_d6d="";
}
if(_d6e==null){
_d6e="";
}
this.bindingWindow.__doPostBack(_d6d,_d6e);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d6f){
var _d70=true;
var _d71=this.bindingWindow.DataManager.getAllDataBindings();
while(_d71.hasNext()&&_d70){
var _d72=_d71.getNext();
if(_d72.isAttached){
var _d73=_d72.validate();
if(_d70&&!_d73){
_d70=false;
this.logger.debug("Invalid DataBinding: "+_d72.toString()+" ("+_d72.getName()+")");
if(_d6f){
var _d74=_d72.getAncestorBindingByType(TabPanelBinding);
if(_d74!=null&&!_d74.isVisible){
var _d75=_d74.getAncestorBindingByType(TabBoxBinding);
var _d76=_d75.getTabBinding(_d74);
_d75.select(_d76);
}
}
break;
}
}
}
return _d70;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d78=this.bindingWindow.DataManager.getAllDataBindings();
while(_d78.hasNext()){
var _d79=_d78.getNext();
if(_d79.isAttached){
var _d7a=_d79.manifest();
if(_d7a!=null){
list.add(_d7a);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d7b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d7b.hasNext()){
var _d7c=_d7b.getNext();
if(_d7c.isAttached){
_d7c.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d7d="";
if(!_d7d&&this.labelfield){
var _d7e=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d7e!=null&&_d7e.getLabel){
_d7d=_d7e.getLabel();
}else{
if(_d7e!=null&&_d7e.getValue){
_d7d=_d7e.getValue();
}
}
}
if(!_d7d&&this.label){
_d7d=this.label;
}
return _d7d;
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
var _d81=this._cachedFocus.getBinding();
if(_d81){
_d81.blur();
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
var _d82=this.getProperty("width");
if(!_d82){
_d82=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d82;
}
if(this.height==null){
var _d83=this.getProperty("height");
this.height=_d83?_d83:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d84=this.getProperty("minheight");
if(_d84!=null){
this.minheight=_d84;
}
}
if(this.controls==null){
var _d85=this.getProperty("controls");
this.controls=_d85?_d85:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d86=this.getProperty("resizable");
this.isResizable=_d86?_d86:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d87){
if(_d87!=this.isAutoHeightLayoutMode){
if(_d87){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d87;
}
};
DialogPageBinding.prototype.handleAction=function(_d88){
DialogPageBinding.superclass.handleAction.call(this,_d88);
var _d89=_d88.target;
switch(_d88.type){
case PageBinding.ACTION_ATTACHED:
if(_d89!=this&&_d89.isFitAsDialogSubPage){
_d89.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d88.consume();
if(_d89.response!=null){
this.response=_d89.response;
switch(_d89.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d8a){
var _d8b=this.bindingWindow.bindingMap.buttonAccept;
if(_d8b!=null){
_d8b.setDisabled(_d8a);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d8c){
var _d8d=CSSComputer.getPadding(this.bindingElement);
var _d8e=CSSComputer.getBorder(this.bindingElement);
_d8c+=_d8d.top+_d8d.bottom;
_d8c+=_d8e.top+_d8e.bottom;
if(_d8c>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d8c+"px";
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
EditorPageBinding.prototype.handleAction=function(_d96){
EditorPageBinding.superclass.handleAction.call(this,_d96);
var _d97=_d96.target;
switch(_d96.type){
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
var _d98=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d97.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d98==-1){
_d98=0;
}
}else{
_d98++;
}
return res;
});
if(_d98>-1){
this._messengers.del(_d98);
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
_d96.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d97.key,_d97);
if(_d97 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d97.key);
if(_d97 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d97==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d97.getSelectedTabBinding();
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
_d96.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d97==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d96.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d97==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d96.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d97==this._windowBinding){
if(_d97.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d9d=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d9d);
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
var _d9e=this.bindingWindow.bindingMap.savebutton;
if(_d9e!=null&&!_d9e.isDisabled){
_d9e.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d9f=this.bindingWindow.bindingMap.__REQUEST;
if(_d9f!=null){
_d9f.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _da0=this.bindingWindow.bindingMap.__REQUEST;
if(_da0!=null){
_da0.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_da1){
this._message=null;
switch(_da1){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_da1,this._messengers);
if(!this._messengers.hasEntries()){
if(_da1==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_da1;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_da1;
EditorPageBinding.superclass.postMessage.call(this,_da1,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_da1,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_da2,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_da2,arg);
switch(_da2){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _da4=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_da4);
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
var _da5=new List();
this._invalidBindings.each(function(key,_da7){
var list=_da7.getInvalidLabels();
if(list){
list.each(function(_da9){
_da5.add(_da9);
});
}
});
if(_da5.hasEntries()){
var _daa="";
while(_da5.hasNext()){
_daa+=_da5.getNext().toLowerCase();
if(_da5.hasNext()){
_daa+=", ";
}else{
_daa+=".";
}
}
var _dab=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_dab+" "+_daa);
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
EditorPageBinding.prototype.enableSave=function(_dac){
var _dad=this.bindingDocument.getElementById("broadcasterCanSave");
if(_dad){
var _dae=UserInterface.getBinding(_dad);
if(_dac){
_dae.enable();
}else{
_dae.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _daf=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_daf!=null){
UserInterface.getBinding(_daf).enable();
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
var _db0=this._windowBinding.getContentDocument().title;
if(_db0==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _db1=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_db3){
if(_db3.name=="__EVENTTARGET"&&_db1){
_db3.value=_db1;
}
list.add({name:_db3.name,value:_db3.value});
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
var _db5=this.getProperty("responseid");
this.responseid=_db5;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_db6){
ResponsePageBinding.superclass.handleAction.call(this,_db6);
switch(_db6.type){
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
WizardPageBinding.prototype.handleAction=function(_db7){
WizardPageBinding.superclass.handleAction.call(this,_db7);
var _db8=_db7.target;
switch(_db7.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_db8);
}else{
_db7.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_db8);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_db7.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_db7.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db9){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dbb=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db9);
}
if(_dbb){
_dbb.setDisabled(!_db9);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dbc,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dbc,arg);
var self=this;
switch(_dbc){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dc0){
};
MarkupAwarePageBinding.prototype._activate=function(_dc1){
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
var _dc2=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dc2.boxObject.getDimension().w;
_dc2.hide();
var _dc3=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dc3+"px";
var self=this;
var _dc5=this.bindingWindow.bindingMap.moreactionsbutton;
_dc5.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dc6){
self._showMoreActions();
_dc6.consume();
}});
var _dc7=this.bindingWindow.bindingMap.moreactionspopup;
_dc7.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dc8){
var item=_dc8.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dca,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dca,arg);
switch(_dca){
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
var _dce=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dce!=null){
_dce.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dcf=this.bindingWindow.WindowManager;
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
var _dd0=new String("");
this._actionProfile.each(function(_dd1,list){
list.each(function(_dd3){
_dd0+=_dd3.getHandle()+";"+_dd3.getKey()+";";
if(_dd3.isDisabled()){
_dd0+="isDisabled='true';";
}
});
});
return _dd0;
};
SystemToolBarBinding.prototype.handleAction=function(_dd4){
SystemToolBarBinding.superclass.handleAction.call(this,_dd4);
switch(_dd4.type){
case ButtonBinding.ACTION_COMMAND:
var _dd5=_dd4.target;
this._handleSystemAction(_dd5.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dd6){
if(_dd6!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dd8=list.getFirst();
var _dd9=_dd8.node;
}
SystemAction.invoke(_dd6,_dd9);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_ddc,list){
var _dde=new List();
list.reset();
while(list.hasNext()){
var _ddf=list.getNext();
var _de0=null;
if(_ddf.isInToolBar()){
if(_ddf.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_de0=self.getToolBarButtonBinding(_ddf);
}
}
if(_de0!=null){
_dde.add(_de0);
}
}
if(_dde.hasEntries()){
var _de1=ToolBarGroupBinding.newInstance(doc);
_dde.each(function(_de2){
_de1.add(_de2);
});
self.addLeft(_de1);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _de3=this.bindingWindow.bindingMap.toolsbutton;
var _de4=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _de5=_de3.bindingElement.offsetLeft-this._moreActionsWidth;
if(Localization.isRtl){
_de5=this.bindingElement.offsetWidth-_de3.bindingElement.offsetWidth-this._moreActionsWidth;
}
var _de6=0;
var _de7=new List();
var _de8,_de9=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_de8=_de9.getNext())!=null){
if(!_de8.isVisible){
_de8.show();
}
_de6+=_de8.boxObject.getDimension().w;
if(_de6>=_de5){
_de7.add(_de8);
_de8.hide();
}
}
if(_de7.hasEntries()){
var _dea=_de7.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dea).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_de8=_de7.getNext())!=null){
this._moreActions.add(_de8.associatedSystemAction);
}
_de4.show();
}else{
this._moreActions=null;
_de4.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _deb=this.bindingWindow.bindingMap.moreactionspopup;
_deb.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_deb.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_deb.add(item);
}
_deb.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_ded){
var _dee=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _def=_ded.getLabel();
var _df0=_ded.getToolTip();
var _df1=_ded.getImage();
var _df2=_ded.isDisabled();
if(_df1&&_df1.indexOf("size=")==-1){
_df1=_df1+"&size="+this.getImageSize();
_dee.imageProfile=new ImageProfile({image:_df1});
}
if(_def){
_dee.setLabel(_def);
}
if(_df0){
_dee.setToolTip(_df0);
}
if(_ded.isDisabled()){
_dee.disable();
}
_dee.associatedSystemAction=_ded;
return _dee;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _df3=this.getDescendantBindingByLocalName("toolbarbutton");
if(_df3!=null){
_df3.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_df4){
var _df5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_df4);
return UserInterface.registerBinding(_df5,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_df6){
var _df7=SystemTreeBinding.superclass.add.call(this,_df6);
if(!this._defaultTreeNode){
if(_df6 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_df6;
}
}
return _df7;
};
SystemTreeBinding.prototype.handleAction=function(_df8){
SystemTreeBinding.superclass.handleAction.call(this,_df8);
var _df9=_df8.target;
switch(_df8.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df9.key);
this._updateFocusedNode();
_df8.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_df8.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df9.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_df8.consume();
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
var _dfb=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dfb);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dfc){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dfc);
var reg=this._entityTokenRegistry;
var _dfe=_dfc.node.getEntityToken();
if(reg.has(_dfe)){
reg.get(_dfe).add(_dfc);
}else{
reg.set(_dfe,new List([_dfc]));
}
var _dff=null;
if(this.isLockedToEditor){
if(_dfe==StageBinding.entityToken){
if(_dfc.node.isTreeLockEnabled()){
_dff=_dfc;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dfc.node.getHandle()){
_dff=_dfc;
}
}
}
if(_dff!=null){
this.focusSingleTreeNodeBinding(_dff);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_e00){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_e00);
var reg=this._entityTokenRegistry;
var _e02=_e00.node.getEntityToken();
if(reg.has(_e02)){
var list=reg.get(_e02);
list.del(_e00);
if(!list.hasEntries()){
reg.del(_e02);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_e00.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_e00.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _e06=this._refreshingTreeNodes;
if(_e06.hasEntries()&&_e06.has(key)){
_e06.del(key);
if(!_e06.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _e07=StageBinding.entityToken;
if(_e07!=null){
this._focusTreeNodeByEntityToken(_e07);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e08=false;
var _e09=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e08=false;
}else{
if(_e09.hasEntries()){
_e08=true;
while(_e08&&_e09.hasNext()){
var _e0a=_e09.getNext();
if(!_e0a.isDraggable){
_e08=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e08;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e0b,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e0b,arg);
switch(_e0b){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e0b,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e0b);
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
var self=this,_e0f=arg;
setTimeout(function(){
if(_e0f!=null){
self._focusTreeNodeByEntityToken(_e0f);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e11=tab.perspectiveNode==null;
if(!_e11){
_e11=tab.perspectiveNode==this.perspectiveNode;
}
if(_e11){
var self=this,_e13=tab.getEntityToken();
setTimeout(function(){
if(_e13!=null){
self._focusTreeNodeByEntityToken(_e13);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e14,_e15){
this.isLockFeatureFocus=true;
var _e16=null;
if(this._entityTokenRegistry.has(_e14)){
var list=this._entityTokenRegistry.get(_e14);
list.each(function(tn){
var _e19=true;
if(tn.node.isTreeLockEnabled()){
_e16=tn;
_e19=false;
}
return _e19;
});
if(_e16!=null){
if(!_e16.isFocused){
this.focusSingleTreeNodeBinding(_e16,true);
}else{
_e16.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e16==null&&_e15!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e14);
self._focusTreeNodeByEntityToken(_e14,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e1b){
var _e1c=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e1d=this.getRootTreeNodeBindings();
while(_e1d.hasNext()){
var _e1e=_e1d.getNext();
_e1c.add(_e1e.node.getEntityToken());
}
}else{
_e1c.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e1c.hasNext()){
var _e1f=_e1c.getNext();
var _e20=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e1f,_e1b,_e20);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e23=this._treeNodeBindings;
var _e24=new Map();
function fix(_e25,list){
if(!_e25.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e23.has(node.getHandle())){
var _e28=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e24.set(node.getHandle(),_e28);
_e25.add(_e28);
}
});
_e25.attachRecursive();
}
}
_e25.open(true);
}
map.each(function(_e29,list){
if(_e23.has(_e29)){
var _e2b=_e23.get(_e29);
fix(_e2b,list);
}else{
if(_e24.has(_e29)){
var _e2c=_e24.get(_e29);
fix(_e2c,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e2d,arg){
switch(_e2d){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2f=arg;
if(_e2f!=null){
this._invokeServerRefresh(_e2f);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e30=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e30;
_e30.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e30=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e30;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e31){
if(_e31!=null&&_e31=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e31)){
var list=this._entityTokenRegistry.get(_e31).reset();
this._refreshToken=_e31;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e33=list.getNext();
this._refreshingTreeNodes.set(_e33.key,true);
setTimeout(function(){
_e33.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e34=this.getFocusedTreeNodeBindings().getFirst();
if(_e34){
var _e35=_e34.getLabel();
var _e36=_e34.getAncestorBindingByLocalName("treenode");
if(_e36){
_e34=_e36;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e34.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e37=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e37,[_e35]);
}
_e34.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e38=SystemTreeBinding.clipboard;
if(_e38){
var type=_e38.dragType;
var _e3a=this.getFocusedTreeNodeBindings().getFirst();
if(_e3a.dragAccept){
if(_e3a.acceptor.isAccepting(type)){
this._performPaste(_e3a);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e3b){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e3b.node.hasDetailedDropSupport()){
if(_e3b.node.hasChildren()){
var _e3d=_e3b.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e3e,_e3f){
if(_e3e==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e40=_e3f.get("switch");
var _e41=_e3f.get("sibling");
if(_e40=="after"){
_e41++;
}
var _e42=_e3b.accept(SystemTreeBinding.clipboard,_e41);
if(_e42){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e3d);
}else{
Application.lock(self);
var _e43=_e3b.accept(SystemTreeBinding.clipboard,0);
if(_e43){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e43=_e3b.accept(SystemTreeBinding.clipboard,0);
if(_e43){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e44=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e44!=null){
this._focusTreeNodeByEntityToken(_e44);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e45){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e45){
this.blurSelectedTreeNodes();
var _e46=this.getRootTreeNodeBindings();
_e46.each(function(_e47){
if(_e47.isContainer&&_e47.isOpen){
_e47.close();
_e47.hasBeenOpened=false;
_e47.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e48){
if(_e48!=this.isLockedToEditor){
this.isLockedToEditor=_e48;
if(_e48){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e4a=this.getRootTreeNodeBindings();
_e4a.each(function(_e4b){
var _e4c=_e4b.getOpenSystemNodes();
if(_e4c!=null&&_e4c.hasEntries()){
list.merge(_e4c);
}else{
if(_e4b.isOpen){
list.add(_e4b.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e4d){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e4d);
if(_e4d!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e4e){
if(_e4e){
var list=new List(_e4e.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e50=new Map();
var _e51=this.getFocusedTreeNodeBindings();
var _e52=_e51.getFirst().node.getActionProfile();
if(_e52!=null){
var self=this;
_e52.each(function(_e54,list){
var _e56=new List();
list.each(function(_e57){
if(_e57.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e57.getGroupName()]){
_e56.add(_e57);
}
}
});
if(_e56.hasEntries()){
_e50.set(_e54,_e56);
}
});
}
_e50.activePosition=this._activePosition;
return _e50;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e58,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e58,arg);
switch(_e58){
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
var _e5d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e5d.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e5e=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e5e.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e5f){
SystemTreePopupBinding.superclass.handleAction.call(this,_e5f);
switch(_e5f.type){
case MenuItemBinding.ACTION_COMMAND:
var _e60=_e5f.target;
var _e61=_e60.associatedSystemAction;
if(_e61){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e63=list.getFirst();
var _e64=_e63.node;
}
SystemAction.invoke(_e61,_e64);
}else{
var cmd=_e60.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e67=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e67=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e67=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e67=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e67=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e67){
setTimeout(function(){
EventBroadcaster.broadcast(_e67);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e68=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e68.hasNext()){
var _e69=UserInterface.getBinding(_e68.getNext());
if(!_e69.getProperty("rel")){
_e69.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e6b=new List();
var self=this;
this._actionProfile.each(function(_e6d,list){
var _e6f=MenuGroupBinding.newInstance(doc);
list.each(function(_e70){
var _e71=self.getMenuItemBinding(_e70);
_e6f.add(_e71);
});
_e6b.add(_e6f);
});
_e6b.reverse();
while(_e6b.hasNext()){
this._bodyBinding.addFirst(_e6b.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e72){
var _e73=MenuItemBinding.newInstance(this.bindingDocument);
var _e74=_e72.getLabel();
var _e75=_e72.getToolTip();
var _e76=_e72.getImage();
var _e77=_e72.getDisabledImage();
var _e78=_e72.isCheckBox();
if(_e74){
_e73.setLabel(_e74);
}
if(_e75){
_e73.setToolTip(_e75);
}
if(_e76){
_e73.imageProfile=new ImageProfile({image:_e76,imageDisabled:_e77});
}
if(_e78){
_e73.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e72.isChecked()){
_e73.check(true);
}
}
if(_e72.isDisabled()){
_e73.disable();
}
_e73.associatedSystemAction=_e72;
return _e73;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e7c=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e7c=UserInterface.getBinding(node);
if(_e7c.isDisabled){
_e7c=null;
}
}
break;
}
if(_e7c!=null&&_e7c.node!=null&&_e7c.node.getActionProfile()!=null){
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
var _e7d=this.node.getLabel();
if(_e7d){
this.setLabel(_e7d);
}
var _e7e=this.node.getToolTip();
if(_e7e){
this.setToolTip(_e7e);
}
var _e7f=this.node.getHandle();
if(_e7f){
this.setHandle(_e7f);
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
var _e82="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e82+=list.getNext();
if(list.hasNext()){
_e82+=" ";
}
}
this.setProperty("dragaccept",_e82);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e84){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e84);
switch(_e84.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e84.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e84.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e85,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e85,arg);
switch(_e85){
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
var _e88=null;
var _e89=this.node.getImageProfile();
if(_e89){
if(this.isOpen){
_e88=_e89.getActiveImage();
}else{
_e88=_e89.getDefaultImage();
}
}
if(!_e88){
_e88=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e88;
};
SystemTreeNodeBinding.prototype.open=function(_e8a){
var _e8b=this.isContainer&&!this.isOpen;
var _e8c=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e8b&&(_e8c||SystemTreeBinding.HAS_NO_MEMORY)&&_e8a!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e8d=null;
if(this.isContainer){
_e8d=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e8d);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e8f){
if(_e8f!=null){
this._refreshBranch(_e8f);
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
var _e90=new List();
var _e91=this.node.getChildren();
this.empty();
if(_e91.hasEntries()){
this._insertTreeNodesRegulated(_e91);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e92){
var _e93=0;
var _e94=new List([]);
while(_e92.hasEntries()&&_e93<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e95=SystemTreeNodeBinding.newInstance(_e92.extractFirst(),this.bindingDocument);
_e95.autoExpand=this.autoExpand;
this.add(_e95);
_e95.attach();
_e93++;
if(this.autoExpand){
if(_e93==1&&!_e92.hasEntries()||LocalStore.openedNodes.has(_e95.node)){
_e94.add(_e95);
}
}
}
if(_e92.hasEntries()){
this._insertBufferTreeNode(_e92);
}
_e94.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e98){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e9a=this.node.getDescendantBranch(list);
if(_e9a.hasEntries()){
this.XXX(_e9a);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e9b){
var self=this;
var map=new Map();
this.empty();
_e9b.each(function(key,_e9f){
if(_e9f.hasEntries()){
_e9f.each(function(node){
var _ea1=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea1);
if(map.has(key)){
var _ea2=map.get(key);
_ea2.add(_ea1);
_ea2.isOpen=true;
_ea2.hasBeenOpened=true;
node.searchToken=_ea2.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_ea1);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e9b.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _ea3=new TreeCrawler();
var _ea4=new List();
_ea3.mode=TreeCrawler.MODE_GETOPEN;
_ea3.crawl(this.bindingElement,_ea4);
if(_ea4.hasEntries()){
_ea4.extractFirst();
}
_ea3.dispose();
return _ea4;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _ea5=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_ea5=new List([this.node]);
list.each(function(_ea7){
_ea5.add(_ea7.node);
});
}
return _ea5;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_ea8,_ea9){
var _eaa=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_ea8 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_ea8.node.getData(),this.node.getData(),_ea9?_ea9:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_eaa);
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
SystemTreeNodeBinding.newInstance=function(node,_eae){
var _eaf=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_eae);
var _eb0=UserInterface.registerBinding(_eaf,SystemTreeNodeBinding);
_eb0.node=node;
return _eb0;
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
SystemPageBinding.prototype.setPageArgument=function(_eb1){
this.node=_eb1;
SystemPageBinding.superclass.setPageArgument.call(this,_eb1);
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
var _eb2=this.node.getChildren();
if(_eb2.hasEntries()){
while(_eb2.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_eb2.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _eb4=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_eb4.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _eb6=new TreeCrawler();
var _eb7=new List();
_eb6.mode=TreeCrawler.MODE_GETOPEN;
_eb6.crawl(this.bindingElement,_eb7);
_eb6.dispose();
var list=new List([this.node]);
_eb7.each(function(_eb9){
list.add(_eb9.node);
});
this._tree.empty();
var _eba=this.node.getDescendantBranch(list);
if(_eba.hasEntries()){
var self=this;
var map=new Map();
_eba.each(function(key,_ebe){
_ebe.each(function(node){
var _ec0=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ec0);
if(map.has(key)){
var _ec1=map.get(key);
_ec1.add(_ec0);
_ec1.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ec0);
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
SystemPageBinding.prototype.handleAction=function(_ec2){
SystemPageBinding.superclass.handleAction.call(this,_ec2);
switch(_ec2.type){
case ButtonBinding.ACTION_COMMAND:
var _ec3=_ec2.target;
switch(_ec3.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ec3.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ec4,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ec4,arg);
switch(_ec4){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ec6=arg;
if(this.node&&this.node.getEntityToken()==_ec6){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ec6);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ec6);
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
StageContainerBinding.prototype.handleBroadcast=function(_ec8,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ec8,arg);
var _eca=this.bindingWindow.WindowManager;
switch(_ec8){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eca.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eca.WINDOW_RESIZED_BROADCAST:
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
var _ecc=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ecc.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ecd){
if(StageBinding.isViewOpen(_ecd)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ecd);
}else{
var _ece=ViewDefinitions[_ecd];
StageBinding.presentViewDefinition(_ece);
}
};
StageBinding.isViewOpen=function(_ecf){
return StageBinding.bindingInstance._activeViewDefinitions[_ecf]!=null;
};
StageBinding.presentViewDefinition=function(_ed0){
if(_ed0.label!=null){
var _ed1=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ed1,[_ed0.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ed0);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ed3,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ed5=System.getPerspectiveNodes();
if(_ed5.hasEntries()){
this._initializeSystemViewDefinitions(_ed5);
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
var _ed7=null;
if(LocalStore.isEnabled){
_ed7=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ed7&&ViewDefinitions[_ed7]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ed7));
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
var _ed9=root.getActionProfile();
if(_ed9&&_ed9.hasEntries()){
var _eda=top.app.bindingMap.toolsmenugroup;
if(_eda){
_ed9.each(function(_edb,list){
list.each(function(_edd){
var item=MenuItemBinding.newInstance(_eda.bindingDocument);
item.setLabel(_edd.getLabel());
item.setToolTip(_edd.getToolTip());
item.setImage(_edd.getImage());
item.setDisabled(_edd.isDisabled());
item.associatedSystemAction=_edd;
var _edf=_eda;
var tag=_edd.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_edf=top.app.bindingMap.translationsmenugroup;
break;
}
}
_edf.add(item);
});
});
_eda.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ee1){
while(_ee1.hasNext()){
var node=_ee1.getNext();
var _ee3=node.getHandle();
ViewDefinitions[_ee3]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ee4){
StageBinding.superclass.handleAction.call(this,_ee4);
var _ee5=_ee4.target;
switch(_ee4.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ee5;
this._inflateBinding(_ee5);
_ee4.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ee5;
this._inflateBinding(_ee5);
_ee4.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ee5);
_ee4.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ee5 instanceof DockBinding){
switch(_ee5.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ee5.reference,_ee5);
break;
}
this.handleAttachedDock(_ee5);
_ee4.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ee5 instanceof DockBinding){
this.handleSelectedDockTab(_ee5.getSelectedTabBinding());
_ee4.consume();
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
_ee4.consume();
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
_ee4.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ee4);
};
StageBinding.prototype.handleBroadcast=function(_ee7,arg){
StageBinding.superclass.handleBroadcast.call(this,_ee7,arg);
switch(_ee7){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ee9=arg;
this._dontView(_ee9);
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
StageBinding.prototype._showStart=function(_eeb){
if(_eeb!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _eee=this.bindingWindow.bindingMap.maindecks;
if(_eeb){
_eee.select("startdeck");
view.show();
}else{
view.hide();
_eee.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_eeb;
}
};
StageBinding.prototype._inflateBinding=function(_eef){
for(var _ef0 in ViewDefinitions){
var _ef1=ViewDefinitions[_ef0];
if(_ef1 instanceof SystemViewDefinition){
_eef.mountDefinition(_ef1);
}
}
var _ef2=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ef2){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ef5=new StageCrawler();
_ef5.mode=mode;
_ef5.crawl(this.bindingElement);
_ef5.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ef6){
var _ef7=_ef6.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ef7);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ef7));
}
};
StageBinding.prototype.handleAttachedDock=function(_ef8){
var _ef9=_ef8.getTabBindings();
if(_ef9.hasEntries()){
while(_ef9.hasNext()){
var _efa=_ef9.getNext();
var _efb=_efa.getHandle();
if(_efb){
if(_efb=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _efc=ViewDefinitions[_efb];
if(_efc){
this._view(_ef8,_efa,_efc,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_efb+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_efd){
var _efe=null;
var _eff=false;
switch(_efd.position){
case Dialog.MODAL:
_efe=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_efe=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_efd.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_efe=this._dockBindings.get(_efd.position);
break;
case DockBinding.EXTERNAL:
window.open(_efd.url);
_eff=true;
break;
default:
var _f00=this._decksBinding.getSelectedDeckBinding();
_efe=_f00.getDockBindingByReference(_efd.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _f01=this.bindingWindow.bindingMap.maindecks;
_f01.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eff=true;
}
break;
}
if(!_eff){
if(_efe!=null){
this._view(_efe,null,_efd,true);
}else{
throw "StageBinding: Could not position view: "+_efd.handle;
}
}
};
StageBinding.prototype._view=function(_f02,_f03,_f04,_f05){
var _f06=_f04.handle;
if(_f04.isMutable){
_f06+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_f06]){
var _f07=ViewBinding.getInstance(_f06);
if(_f07!=null){
_f07.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_f06);
}
}else{
this._activeViewDefinitions[_f06]=_f04;
Application.lock(this);
switch(_f02.constructor){
case DockBinding:
if(_f05){
_f02.prepareNewView(_f04);
}else{
_f02.prepareOpenView(_f04,_f03);
}
break;
case StageDialogBinding:
if(_f05){
_f02.prepareNewView(_f04);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_f08){
if(this._activeViewDefinitions[_f08]!=null){
delete this._activeViewDefinitions[_f08];
}else{
this.logger.debug("Could not unregister active view: "+_f08);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f09){
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
this.addFilter(function(_f0b){
var _f0c=UserInterface.getBinding(_f0b);
var _f0d=null;
if(_f0c){
switch(_f0c.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f0c.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f0c.handleUnMaximization();
break;
}
break;
case DockBinding:
_f0d=NodeCrawler.SKIP_NODE;
break;
}
}
return _f0d;
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
var _f0e=null;
this._dialogs.each(function(_f0f){
if(!_f0f.isVisible){
_f0e=_f0f;
}
return _f0e!=null;
});
if(!_f0e){
this._newInstance();
_f0e=this._dialogs.getLast();
}
_f0e.setModal(false);
return _f0e;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f10=this.getInstance();
_f10.setModal(true);
return _f10;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f11=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f11);
_f11.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f12){
if(_f12 instanceof DialogViewDefinition){
var _f13=ViewBinding.newInstance(this.bindingDocument);
_f13.setDefinition(_f12);
_f13.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f12.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f12.handler)){
this._dialogResponseHandler=_f12.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f13;
this._body.add(_f13);
_f13.attach();
_f13.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f14){
StageDialogBinding.superclass.handleAction.call(this,_f14);
var _f15=_f14.target;
switch(_f14.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f15);
_f14.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f15.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f14.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f15.response){
this._handleDialogPageResponse(_f15);
}
_f14.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f14.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f14.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f14.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f14.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f14.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f14.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f14.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f14.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f15==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f16,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f16,arg);
switch(_f16){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f18){
var _f19=new FitnessCrawler();
var list=new List();
if(_f18){
_f19.mode=FitnessCrawler.MODE_BRUTAL;
}
_f19.crawl(this.bindingElement,list);
_f19.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f1b){
_f1b.fit(_f18);
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
var _f1c=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f1c){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f1e){
var cmd=_f1e.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f20){
if(_f20.bindingDocument==this._viewBinding.getContentDocument()){
if(_f20 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f20);
}
this._pageBinding=_f20;
if(_f20.height=="auto"){
_f20.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f20);
_f20.enableAutoHeightLayoutMode(false);
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
if(_f20.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f20);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f21){
var _f22=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f22){
var _f23=UserInterface.getBinding(_f22);
_f23.setDisabled(_f21);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f24){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f24.response,_f24.result!=null?_f24.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f26){
if(_f26.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f26);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f28){
switch(_f28.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f28.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f28.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f29){
var _f2a=_f29.label;
var _f2b=_f29.image;
var _f2c=_f29.width;
var _f2d=_f29.height;
var _f2e=_f29.controls;
var _f2f=_f29.isResizable;
if(_f2a){
this.setLabel(_f2a);
}
if(_f2b){
this.setImage(_f2b);
}
if(_f2c||_f2d){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f2c?_f2c:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f2d!=null&&_f2d!="auto")?_f2d:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f2e){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f33=new List(_f2e.split(" "));
while((type=_f33.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f2f!=this._isResizable){
this.setResizable(_f2f);
}
if(_f2d=="auto"){
this._fixAutoHeight(_f29);
}
if(_f29==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f34){
var dim=this.getDimension();
var _f36=0;
var _f37=0;
if(_f34.isDialogSubPage){
_f34=this._pageBinding;
}
if(this._isFirstPage){
_f36=_f34.width!=null?_f34.width:dim.w;
}else{
_f36=dim.w;
}
_f37=_f34.bindingElement.offsetHeight;
_f37+=this._titlebar.bindingElement.offsetHeight;
_f37+=4;
_f37+=4;
if(_f37<dim.h){
_f37=dim.h;
}
if(_f34.minheight!=null){
if(_f37<_f34.minheight){
_f37=_f34.minheight;
}
}
this.setDimension(new Dimension(_f36,_f37));
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
StageDialogBinding.newInstance=function(_f3a){
var _f3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f3a);
var _f3c=UserInterface.registerBinding(_f3b,StageDialogBinding);
_f3c.setProperty("controls","minimize maximize close");
return _f3c;
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
this.addFilter(function(_f3d,list){
var _f3f=null;
var _f40=UserInterface.getBinding(_f3d);
if(!_f40.isVisible){
_f3f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f3f;
});
this.addFilter(function(_f41,list){
var _f43=null;
var _f44=UserInterface.getBinding(_f41);
if(_f44.isAttached){
if(Interfaces.isImplemented(IFit,_f44)){
if(!_f44.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f44);
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
StageDecksBinding.prototype.mountDefinition=function(_f45){
var _f46=StageDeckBinding.newInstance(this.bindingDocument);
_f46.handle=_f45.handle;
_f46.perspectiveNode=_f45.node;
this._decks[_f46.handle]=_f46;
this.add(_f46);
_f46.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f47){
var _f48=this._decks[_f47];
StageBinding.perspectiveNode=_f48.perspectiveNode;
this.select(_f48);
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
StageDeckBinding.prototype.handleAction=function(_f49){
StageDeckBinding.superclass.handleAction.call(this,_f49);
var _f4a=_f49.target;
switch(_f49.type){
case WindowBinding.ACTION_LOADED:
if(_f4a==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f49.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f4a instanceof DockBinding){
this._dockBindings.set(_f4a.reference,_f4a);
_f4a.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f49.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f49.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f49);
StageDeckBinding.superclass.handleAction.call(this,_f49);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f4c=new StageCrawler();
_f4c.mode=mode;
_f4c.crawl(this.windowBinding.getContentDocument().body);
_f4c.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f4d){
return this._dockBindings.get(_f4d);
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
StageDeckBinding.newInstance=function(_f4f){
var _f50=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f4f);
var _f51=UserInterface.registerBinding(_f50,StageDeckBinding);
return _f51;
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
StageSplitBoxBinding.prototype.handleAction=function(_f52){
StageSplitBoxBinding.superclass.handleAction.call(this,_f52);
StageBoxAbstraction.handleAction.call(this,_f52);
var _f53=_f52.target;
var _f54=null;
var _f55=null;
switch(_f52.type){
case DockBinding.ACTION_EMPTIED:
_f55=this.getChildBindingByLocalName("splitter");
if(_f55.isVisible){
_f55.hide();
}
_f54=this.getDescendantBindingsByLocalName("dock");
if(_f54.getFirst().isEmpty&&_f54.getLast().isEmpty){
if(_f54.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f52.consume();
break;
case DockBinding.ACTION_OPENED:
_f54=this.getDescendantBindingsByLocalName("dock");
if(!_f54.getFirst().isEmpty&&!_f54.getLast().isEmpty){
_f55=this.getChildBindingByLocalName("splitter");
if(!_f55.isVisible){
_f55.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f52.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f53!=this){
_f55=this.getChildBindingByLocalName("splitter");
if(_f55.isVisible){
_f55.hide();
}
this.invokeLayout();
_f52.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f53!=this){
var _f56=this.getChildBindingsByLocalName("splitpanel");
if(_f56.getFirst().isVisible&&_f56.getLast().isVisible){
_f55=this.getChildBindingByLocalName("splitter");
if(!_f55.isVisible){
_f55.show();
}
}
this.invokeLayout();
_f52.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f57){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f57);
switch(_f57.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f57.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f58=this.getChildBindingsByLocalName("splitpanel");
return _f58.getFirst().isVisible&&_f58.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f59=this.getChildBindingsByLocalName("splitpanel");
return _f59.getFirst().isFixed&&_f59.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f5a){
StageSplitPanelBinding.superclass.handleAction.call(this,_f5a);
StageBoxAbstraction.handleAction.call(this,_f5a);
switch(_f5a.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f5a.type==StageSplitBoxBinding.ACTION_HIDE){
_f5a.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f5a.type==DockBinding.ACTION_EMPTIED){
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
if(_f5a.type==StageSplitBoxBinding.ACTION_SHOW){
_f5a.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f5d=_f5a.target;
if(_f5d!=this&&_f5d.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f5e=_f5d._containingSplitBoxBinding;
if(_f5e.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f5f=_f5e.getChildBindingsByLocalName("splitpanel");
var _f60=_f5f.getFirst();
var _f61=_f5f.getLast();
if(this.isFixed==true){
if(!_f60.isFixed||!_f61.isFixed||(!_f5e.hasBothPanelsVisible()&&_f5d.isMinimizedForReal)){
this.setFix(false);
_f5a.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f5e.hasBothPanelsFixed()||(!_f5e.hasBothPanelsVisible()&&_f5d.isMinimizedForReal)){
this.setFix(_f5d.getContainedDock().getHeight());
_f5a.consume();
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
var _f62=this.getContainedDock();
if(_f62){
if(this.isMaximizePrepared==true){
}else{
_f62.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f63=this.getContainedDock();
if(_f63){
if(_f63.type==DockBinding.TYPE_EDITORS){
if(_f63.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f63.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f64=this.getContainedDock();
if(_f64){
_f64.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f64);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f65=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f66=this.getContainedDock();
if(_f66){
_f66.collapse(_f65);
if(!_f65){
this.setFix(_f66.getHeight());
}else{
this.setFix(_f66.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f66&&_f66.isActive){
_f66.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f66);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f67){
var _f68=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f69=this.getContainedDock();
if(_f69){
if(this.isMinimized==true){
_f69.unCollapse(_f68);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f67){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f69){
_f69.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f69);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f6a){
var _f6b=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f6b=false;
}
}
if(_f6b==true){
this._invisibilize(_f6a);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f6d){
if(_f6d!=this._isInvisibilized){
if(_f6d){
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
StageSplitterBinding.prototype.onDragStart=function(_f6e){
var _f6f=top.app.bindingMap.stagesplittercover;
var _f70=this._containingSplitBoxBinding.getOrient();
switch(_f70){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6f.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6f.bindingElement.style.cursor="n-resize";
break;
}
_f6f.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f70);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f76){
this._orient=_f76;
this.attachClassName(_f76);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f78=true;
var _f79=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f79=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f78=false;
break;
}
if(_f78){
this.bindingElement.style.left=pos.x+"px";
}
if(_f79){
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
StageBoxAbstraction.handleAction=function(_f7b){
switch(_f7b.type){
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
if(_f7b.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f7b.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f7c=this.bindingElement.style;
_f7c.position="absolute";
_f7c.width="100%";
_f7c.height="100%";
_f7c.top="0";
_f7c.left="0";
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
var _f7d=this.bindingElement.style;
_f7d.position="relative";
_f7d.width="auto";
_f7d.height="auto";
_f7d.top="auto";
_f7d.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f7e,_f7f){
var _f80=_f7e.bindingElement.style;
var _f81=_f7e.bindingElement.parentNode;
var box=_f7e._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f7f){
_f7e._unmodifiedFlexMethod=_f7e.flex;
_f7e.flex=function(){
_f80.width=_f81.offsetWidth+"px";
_f80.height=_f81.offsetHeight+"px";
};
}else{
_f80.width="100%";
_f80.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f80.width="auto";
_f80.height="auto";
box.reflex(true);
},0);
}
_f7e.flex=_f7e._unmodifiedFlexMethod;
_f7e._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f83){
var _f84=_f83.target;
switch(_f83.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f84 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f83);
_f83.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f83.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f85){
var mode=null;
switch(_f85.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f87){
StageMenuBarBinding.superclass.handleAction.call(this,_f87);
switch(_f87.type){
case MenuItemBinding.ACTION_COMMAND:
var _f88=_f87.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f88){
SystemAction.invoke(_f88,this._rootNode);
}
}
_f87.consume();
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
var _f89=this.getProperty("handle");
if(_f89){
this._handle=_f89;
if(StageBinding.isViewOpen(_f89)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f89);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f8b){
this.setProperty("handle",_f8b);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f8c,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f8c,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f8c){
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
StageViewMenuItemBinding.newInstance=function(_f8e){
var _f8f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f8e);
UserInterface.registerBinding(_f8f,StageViewMenuItemBinding);
return UserInterface.getBinding(_f8f);
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
StageStatusBarBinding.prototype.setLabel=function(_f90){
this._label.setLabel(_f90);
};
StageStatusBarBinding.prototype.setImage=function(_f91){
this._label.setImage(_f91);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f92){
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
var _f93=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f94=_f93.getAssociatedView();
var _f95=_f94.getContentWindow().bindingMap.tree;
var _f96=_f95.getFocusedTreeNodeBindings();
if(!_f96.hasEntries()&&StageBinding.treeSelector){
_f96=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f96;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f97=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f97.each(function(_f98){
LocalStore.focuseNodes.add(_f98.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f99=LocalStore.focuseNodes.getEntityTokens();
var _f9a=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f9b=_f9a.getAssociatedView();
var _f9c=_f9b.getContentWindow().bindingMap.tree;
_f99=new List(TreeService.GetCurrentLocaleEntityTokens(_f99.toArray()));
_f99.each(function(_f9d){
_f9c._focusTreeNodeByEntityToken(_f9d);
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
ExplorerBinding.prototype.handleAction=function(_f9e){
ExplorerBinding.superclass.handleAction.call(this,_f9e);
var _f9f=_f9e.target;
switch(_f9e.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f9e.consume();
break;
case Binding.ACTION_DRAG:
if(_f9f instanceof ExplorerSplitterBinding){
_f9f.dragger.registerHandler(this);
}
_f9e.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_fa1){
this._menuBinding.setSelectionByHandle(_fa1);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_fa2){
if(_fa2 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_fa2);
this._menuBinding.mountDefinition(_fa2);
}
};
ExplorerBinding.prototype.onDragStart=function(_fa3){
var _fa4=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_fa4.hasEntries()){
var _fa5=_fa4.getFirst();
this._dragStart=_fa5.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_fa5.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa9){
if(_fa9 instanceof SystemViewDefinition){
var _faa=ViewBinding.newInstance(this.bindingDocument);
_faa.setType(ViewBinding.TYPE_EXPLORERVIEW);
_faa.setDefinition(_fa9);
var _fab=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fab.setAssociatedView(_faa);
this._decks[_fa9.handle]=_fab;
_fab.add(_faa);
this.add(_fab);
function attach(){
_fab.attach();
_faa.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fac){
var _fad=this._decks[_fac];
this.select(_fad);
};
DecksBinding.prototype.expandBy=function(_fae){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fb0=this.bindingElement.offsetHeight+_fae;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fb0+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fb2){
var _fb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fb2);
return UserInterface.registerBinding(_fb3,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fb4){
this._viewBinding=_fb4;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fb5=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fb6=this._viewBinding.getDefinition().label;
StatusBar.busy(_fb5,[_fb6]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fb7){
ExplorerDeckBinding.superclass.handleAction.call(this,_fb7);
var _fb8=_fb7.target;
switch(_fb7.type){
case PageBinding.ACTION_INITIALIZED:
if(_fb8 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fb8.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb9,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb9,arg);
switch(_fb9){
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
var _fbb=null;
if(this._isExplorerDeckBindingInitialized){
_fbb=this._viewBinding.getDefinition().label;
}else{
_fbb=DockTabBinding.LABEL_TABLOADING;
}
return _fbb;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fbc=null;
if(this._isExplorerDeckBindingInitialized){
_fbc=this._viewBinding.getDefinition().image;
}else{
_fbc=DockTabBinding.IMG_TABLOADING;
}
return _fbc;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fbd=null;
if(this._isExplorerDeckBindingInitialized){
_fbd=this._viewBinding.getDefinition().toolTip;
}
return _fbd;
};
ExplorerDeckBinding.newInstance=function(_fbe){
var _fbf=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fbe);
return UserInterface.registerBinding(_fbf,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fc0){
switch(_fc0.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fc0.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fc0.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fc0);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fc1){
this._maxButtons.set(_fc1.handle,this._mountMaxButton(_fc1));
this._minButtons.set(_fc1.handle,this._mountMinButton(_fc1));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fc2){
var _fc3=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fc3.setLabel(_fc2.label);
_fc3.setToolTip(_fc2.toolTip);
_fc3.handle=_fc2.handle;
_fc3.node=_fc2.node;
this._maxGroup.add(_fc3);
this._maxList.add(_fc3);
_fc3.attach();
if(Client.isPad){
_fc3.hide();
}
return _fc3;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fc4){
var _fc5=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fc5.setLabel(_fc4.label);
_fc5.setToolTip(_fc4.label);
_fc5.handle=_fc4.handle;
_fc5.node=_fc4.node;
this._minGroup.addFirst(_fc5);
this._minList.add(_fc5);
_fc5.attach();
if(!Client.isPad){
_fc5.hide();
}
return _fc5;
};
ExplorerMenuBinding.prototype.handleAction=function(_fc6){
ExplorerMenuBinding.superclass.handleAction.call(this,_fc6);
switch(_fc6.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fc7=_fc6.target;
var _fc8=_fc7.getCheckedButtonBinding();
var _fc9=_fc8.handle;
switch(_fc7){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fc9),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fc9),true);
break;
}
this._selectedHandle=_fc9;
this._selectedTag=_fc8.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fc6.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fca){
var _fcb=this._maxButtons.get(_fca);
if(_fcb){
_fcb.check();
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
var _fcc=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fcc=true;
}
return _fcc;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fce=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fce=true;
}
return _fce;
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
ExplorerToolBarBinding.newInstance=function(_fcf){
var _fd0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fcf);
return UserInterface.registerBinding(_fd0,ExplorerToolBarBinding);
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
var _fd1=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fd2=_fd1?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fd2);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fd3,_fd4){
var _fd5=(_fd4==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fd6=DOMUtil.createElementNS(Constants.NS_UI,_fd5,_fd3);
var _fd7=UserInterface.registerBinding(_fd6,ExplorerToolBarButtonBinding);
_fd7.explorerToolBarButtonType=_fd4;
return _fd7;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd8,_fd9,type){
type=type?type:"";
var _fdb=FunctionService.GetCustomEditorSettingsByMarkup(_fd8);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fdb){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fdb.Width?(_fdb.Width>dim.w?dim.w:_fdb.Width):undefined;
def.height=_fdb.Height?(_fdb.Height>dim.h?dim.h:_fdb.Height):undefined;
if(_fdb.Url){
_fdb.Url=_fdb.Url.indexOf("?")>-1?_fdb.Url+"&consoleId="+Application.CONSOLE_ID:_fdb.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd9;
def.argument={url:_fdb?_fdb.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd8}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fde,_fdf){
var _fe0=EditorBinding._components;
var _fe1=EditorBinding._editors;
var key=_fdf.key;
var _fe3=Interfaces.isImplemented(IWysiwygEditorComponent,_fde);
if(!_fe3){
_fe3=Interfaces.isImplemented(ISourceEditorComponent,_fde);
}
if(_fe3){
if(_fe1.has(key)){
_fe1.get(key).initializeEditorComponent(_fde);
}else{
if(!_fe0.has(key)){
_fe0.set(key,new List());
}
_fe0.get(key).add(_fde);
}
}else{
throw "Editor component interface not implemented: "+_fde;
}
};
EditorBinding.claimComponents=function(_fe4,_fe5){
var _fe6=EditorBinding._components;
var _fe7=EditorBinding._editors;
var key=_fe5.key;
_fe7.set(key,_fe4);
var list=null;
if(_fe6.has(key)){
list=_fe6.get(key).copy();
_fe6.del(key);
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
var _feb=this.getProperty("value");
if(_feb!=null){
_feb=decodeURIComponent(_feb);
this._startContent=_feb;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fed=this.bindingWindow.DataManager;
_fed.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fef){
var _ff0=EditorBinding.claimComponents(this,_fef);
if(_ff0!=null){
while(_ff0.hasNext()){
this.initializeEditorComponent(_ff0.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _ff2=this.bindingWindow.DataManager;
if(_ff2.getDataBinding(name)){
_ff2.unRegisterDataBinding(name);
}
_ff2.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ff3=this.getEditorDocument();
if(_ff3!=null){
Application.framework(_ff3);
DOMEvents.addEventListener(_ff3,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ff3,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ff3,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_ff3,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_ff5){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_ff5==true){
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
var _ff7=this.getCheckSum();
if(_ff7!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_ff7;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff8=null;
if(Binding.exists(this._pageBinding)){
_ff8=this._pageBinding.getCheckSum(this._checksum);
}
return _ff8;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ffa=DOMEvents.getTarget(e);
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
if(_ffa.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ffc,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ffc,arg);
var _ffe=null;
switch(_ffc){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _fff=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fff=false;
}
}
}else{
_ffe=DOMEvents.getTarget(arg);
if(_ffe&&_ffe.ownerDocument==this.getEditorDocument()){
_fff=false;
}
}
if(_fff){
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
EditorBinding.prototype._activateEditor=function(_1000){
if(_1000!=this._isActivated){
this._isActivated=_1000;
EditorBinding.isActive=_1000;
var _1001=this.getEditorWindow().standardEventHandler;
var _1002=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1002!=null){
if(_1000){
if(this.hasBookmark()){
this.deleteBookmark();
}
_1002.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_1001.enableNativeKeys(true);
}else{
_1002.disable();
_1001.disableNativeKeys();
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
var _1004=false;
try{
var _1005=this.getEditorWindow().getSelection();
if(_1005!=null){
_1004=_1005.toString().length>0;
if(!_1004){
var range=_1005.getRangeAt(0);
var frag=range.cloneContents();
var _1008=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1008.appendChild(frag.firstChild);
}
var img=_1008.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_1004=true;
}
}
}
}
}
catch(exception){
}
return _1004;
};
EditorBinding.prototype.isCommandEnabled=function(_100a){
var _100b=true;
switch(_100a){
case "Cut":
case "Copy":
case "Paste":
_100b=this.getEditorDocument().queryCommandEnabled(_100a);
break;
}
return _100b;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _100f=false;
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
_100f=true;
}
break;
}
return _100f;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1012=this.getContentWindow().bindingMap.toolbar;
var _1013=_1012.getButtonForCommand(cmd);
if(!_1013){
throw "No button for command "+cmd;
}
return _1013;
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
EditorBinding.prototype.handleAction=function(_1017){
EditorBinding.superclass.handleAction.call(this,_1017);
var _1018=_1017.target;
var self=this;
var _101a=this.shadowTree.iframe;
switch(_1017.type){
case Binding.ACTION_DIRTY:
if(_1017.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_101b){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_101b);
};
EditorBinding.prototype.handleElement=function(_101c){
return true;
};
EditorBinding.prototype.updateElement=function(_101d){
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
var _1020=this._menuGroups[rel];
if(_1020 instanceof List){
_1020.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1023=this._menuGroups[rel];
if(_1023 instanceof List){
_1023.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1025){
EditorPopupBinding.superclass.handleAction.call(this,_1025);
var _1026=_1025.target;
if(_1025.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1026.getProperty("cmd");
var gui=_1026.getProperty("gui");
var val=_1026.getProperty("val");
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
var _102a=this.bindingWindow.bindingMap.tinywindow;
var _102b=this.bindingWindow.bindingMap.codepresswindow;
if(_102a){
EditorBinding.registerComponent(this,_102a);
}else{
if(_102b){
EditorBinding.registerComponent(this,_102b);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_102c,_102d,_102e,theme){
this._editorBinding=_102c;
this._tinyEngine=_102d;
this._tinyInstance=_102e;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1030,frame,_1032){
this._editorBinding=_1030;
this._codePressFrame=frame;
this._codePressEngine=_1032;
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
var _1035=this._editorBinding;
if(_1035!=null){
var self=this;
var _1037={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1035.hasBookmark()){
_1035.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1035.hasBookmark()){
_1035.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1037);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1037);
}
};
EditorClickButtonBinding.newInstance=function(_1039){
var _103a=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1039);
return UserInterface.registerBinding(_103a,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_103b){
var _103c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_103b);
return UserInterface.registerBinding(_103c,EditorToolBarButtonBinding);
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
var _103d=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_103d);
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
EditorSelectorBinding.prototype.initializeComponent=function(_103e,_103f,_1040,theme){
this._editorBinding=_103e;
this._tinyEngine=_103f;
this._tinyInstance=_1040;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1042){
EditorSelectorBinding.superclass.handleAction.call(this,_1042);
switch(_1042.type){
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
EditorMenuItemBinding.newInstance=function(_1046){
var _1047=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1046);
return UserInterface.registerBinding(_1047,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1048){
var i=0,_104a,_104b=[],split=_1048.split(" ");
while((_104a=split[i++])!=null){
if(_104a.length>=3&&_104a.substring(0,3)=="mce"){
continue;
}else{
if(_104a.length>=14&&_104a.substring(0,14)=="compositemedia"){
continue;
}
}
_104b.push(_104a);
}
return _104b.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_104d){
var _104e=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_104d);
if(soap instanceof SOAPFault){
}else{
_104e=soap.XhtmlFragment;
if(!_104e){
_104e="";
}
}
WebServiceProxy.isFaultHandler=true;
return _104e;
};
VisualEditorBinding.getTinyContent=function(_1050,_1051){
var _1052=null;
if(_1050==null||!_1050.replace(/\s*/gm,"").length){
_1050=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1051.getSoapTinyContent(_1050);
if(soap instanceof SOAPFault){
var _1054=soap;
var _1055={handleDialogResponse:function(){
_1051.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1055,_1054);
}else{
_1052=soap.XhtmlFragment;
if(_1052==null){
_1052=new String("");
}
_1052=_1052.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1052;
};
VisualEditorBinding.isImage=function(_1056){
return _1056&&_1056.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1057){
return VisualEditorBinding.isImage(_1057)&&!VisualEditorBinding.isReservedElement(_1057);
};
VisualEditorBinding.isReservedElement=function(_1058){
if(VisualEditorBinding.isFunctionElement(_1058)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1058)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1058)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1059){
return VisualEditorBinding.isImage(_1059)&&CSSUtil.hasClassName(_1059,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_105a){
return VisualEditorBinding.isImage(_105a)&&CSSUtil.hasClassName(_105a,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_105b){
return VisualEditorBinding.isImage(_105b)&&CSSUtil.hasClassName(_105b,VisualEditorBinding.HTML_CLASSNAME);
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
var _105c=this.getProperty("embedablefieldstypenames");
if(_105c!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_105c);
}
var _105d=this.getProperty("formattingconfiguration");
if(_105d!=null){
this._url+="?config="+_105d;
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
VisualEditorBinding.prototype.handleBroadcast=function(_105e,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_105e,arg);
var _1060=this.getContentWindow().bindingMap.tinywindow;
var _1061=_1060.getContentWindow();
switch(_105e){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1061){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1060);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1062){
_1062.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1063=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1063.replace(/\s*/gm,"").length==0){
_1063=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1063,{format:"raw"});
this.updateBodyWidth();
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1064){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1064);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1066=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1066=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1066=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1066;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1069){
var _106a=_1069;
if(!this._isNormalizedDocument(_1069)){
_106a=this._getHtmlMarkup().replace("${body}",_1069);
}
return _106a;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_106b){
var _106c=false;
var doc=XMLParser.parse(_106b,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_106c=true;
}
}
if(Client.isWebKit){
if(_106b.indexOf("<html")!==0){
_106c=false;
}
}
return _106c;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1071=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1071){
try{
this._tinyInstance.execCommand(cmd,gui,val,{skip_focus:true});
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1071=true;
}
return _1071;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1073=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1073);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1075){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1075,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1077){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1077,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _107a=CSSComputer.getPadding(body);
var _107b=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_107b.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_107e){
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
VisualEditorPopupBinding.prototype.configure=function(_107f,_1080,_1081){
var _1082=this.editorBinding.hasSelection();
this.tinyInstance=_107f;
this.tinyEngine=_1080;
this.tinyElement=_1081;
this.hasSelection=_1082;
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
var _1086=false;
if(this.hasSelection){
_1086=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1086=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1086=true;
}
}
}
}
if(_1086){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1087=this.getMenuItemForCommand("compositeInsertLink");
var _1088=this.getMenuItemForCommand("unlink");
var _1089=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _108a=this.editorBinding.getButtonForCommand("unlink");
_1088.setDisabled(_108a.isDisabled);
if(_1088.isDisabled){
_1087.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1087.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _108b=this.editorBinding.embedableFieldConfiguration;
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
if(_108b){
var _108e=_108b.getGroupNames();
if(_108e.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_108e.each(function(_1092){
var _1093=_108b.getFieldNames(_1092);
_1093.each(function(_1094){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1094);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1092+":"+_1094);
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
var _1096=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1097=null;
var _1098=null;
if(_1096){
if(_1096.nodeName=="TD"){
_1097=_1096.getAttribute("colspan");
_1098=_1096.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1097=="1"&&_1098=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1096){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1099){
var _109a=VisualEditorFormattingConfiguration._configurations;
if(!_109a.has(_1099)){
_109a.set(_1099,new VisualEditorFormattingConfiguration());
}
return _109a.get(_1099);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_109c){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_109d){
var _109e=null;
var _109f=VisualEditorFieldGroupConfiguration._configurations;
if(!_109f.has(_109d)){
_109f.set(_109d,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_109d)));
}
return _109f.get(_109d);
};
function VisualEditorFieldGroupConfiguration(_10a0){
var _10a1=new Map();
new List(_10a0).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_10a1.set(group.GroupName,map);
});
this._groups=_10a1;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_10a5){
return this._groups.get(_10a5).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_10a6,_10a7){
return this._groups.get(_10a6).get(_10a7).xhtml;
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
var _10a9=this.getDescendantElementsByLocalName("textarea");
while(_10a9.hasNext()){
var _10aa=_10a9.getNext();
if(_10aa.getAttribute("selected")=="true"){
this._startContent=_10aa.value;
this._textareaname=_10aa.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
var _10ac=this.getContentWindow().bindingMap.templatetree;
_10ac.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10ad){
var _10ae=_10ac.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10ae.textareaname);
_10ad.consume();
}});
_10ac.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10af){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10b0=this.getContentWindow().bindingMap.toolsplitter;
_10b0.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10b1=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10b1.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10b1);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10b2){
this._textareas=new Map();
while(_10b2.hasNext()){
var _10b3=_10b2.getNext();
var _10b4=_10b3.getAttribute("placeholderid");
this._textareas.set(_10b4,{placeholderid:_10b4,placeholdername:_10b3.getAttribute("placeholdername"),placeholdermarkup:_10b3.value,textareaelement:_10b3,isSelected:_10b3.getAttribute("selected")=="true"});
}
var _10b5=new Map();
this._textareas.each(function(name,_10b7){
var _10b8=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b8.setLabel(_10b7.placeholdername);
_10b8.setImage("${icon:placeholder}");
_10b8.setProperty("placeholder",true);
_10b8.textareaname=name;
_10b5.set(_10b7.placeholdername,_10b8);
if(_10b7.isSelected){
selected=_10b8;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b9=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b9.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10ba=this.getContentWindow().bindingMap.templatetree;
var _10bb=_10ba.add(TreeNodeBinding.newInstance(_10ba.bindingDocument));
_10bb.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10bb.setImage("${icon:warning}");
_10bb.attach();
var _10bc=this.getContentWindow().bindingMap.statusbar;
_10bc.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10be=this._textareas.get(name);
var _10bf=_10be.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10bf));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10c0){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10c0;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10c1=this.getContentWindow().bindingMap.statusbar;
_10c1.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10c0);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10c4=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10c4;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10c5=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10c5=this._xhtmls.get(this._textareaname);
if(_10c5==null){
_10c5=VisualEditorBinding.XHTML;
}
}
return _10c5;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10c7){
_10c7.textareaelement.value=_10c7.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c8,_10c9,_10ca){
var _10cb=_10c8.getElementsByTagName("div").item(0);
var _10cc=_10c9.getElementsByTagName("div").item(0);
var _10cd=new List(_10cb.getElementsByTagName("textarea"));
var _10ce=new List(_10cc.getElementsByTagName("textarea"));
if(_10cd.getLength()!=_10ce.getLength()){
_10ca=true;
}else{
var index=0;
_10cd.each(function(_10d0,index){
var _10d2=_10ce.get(index);
var newid=_10d0.getAttribute("placeholderid");
var oldid=_10d2.getAttribute("placeholderid");
var _10d5=_10d0.getAttribute("placeholdername");
var _10d6=_10d2.getAttribute("placeholdername");
if(newid!=oldid||_10d5!=_10d6){
_10ca=true;
}
return !_10ca;
});
}
if(_10ca){
var html=null;
if(_10cb.innerHTML!=null){
html=_10cb.innerHTML;
}else{
html=DOMSerializer.serialize(_10cb);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d9){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d9);
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
var _10dc=this.getDescendantBindingByLocalName("selector");
_10dc.attach();
this._populateTemplateSelector();
var _10dd=this.getContentWindow().bindingMap.templateselector;
_10dd.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
this.updateTemplatePreview();
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10de=this.getDescendantBindingByLocalName("selector");
var _10df=this.getContentWindow().bindingMap.templateselector;
_10de.selections.each(function(_10e0){
_10e0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10df.populateFromList(_10de.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10e1=this.getDescendantBindingByLocalName("selector");
var _10e2=this.getContentWindow().bindingMap.templateselector;
_10e1.selectByValue(_10e2.getValue());
_10e1.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10e3){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e8,_10e9){
var _10ea=_10e9;
if(old.has(_10e8)){
_10ea=old.get(_10e8).placeholdermarkup;
}
return _10ea;
}
while(_10e3.hasNext()){
var _10eb=_10e3.getNext();
var _10ec=_10eb.getAttribute("placeholderid");
this._textareas.set(_10ec,{placeholderid:_10ec,placeholdername:_10eb.getAttribute("placeholdername"),placeholdermarkup:compute(_10ec,_10eb.value),textareaelement:_10eb,isSelected:_10eb.getAttribute("selected")=="true"});
}
var _10ed=null;
var _10ee=this.getContentWindow().bindingMap.templatetree;
var _10ef=new Map();
this._textareas.each(function(name,_10f1){
var _10f2=_10ee.add(TreeNodeBinding.newInstance(_10ee.bindingDocument));
_10f2.setLabel(_10f1.placeholdername);
_10f2.setImage("${icon:placeholder}");
_10f2.setProperty("placeholder",true);
_10f2.textareaname=name;
_10ef.set(_10f1.placeholdername,_10f2);
if(_10f1.isSelected){
_10ed=_10f2;
}
});
_10ee.attachRecursive();
if(_10ed!=null){
var _10f3=true;
if(this._oldtextareas.hasEntries()){
_10f3=false;
var map=new Map();
this._textareas.each(function(id,_10f6){
map.set(_10f6.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10f3=true;
}
}
if(_10f3){
var _10f7=this._textareas.get(_10ed.textareaname);
this._textareaname=_10ed.textareaname;
this._placeholdername=_10f7.placeholdername;
this._setContentFromPlaceHolder(_10ed.textareaname);
_10ed.focus();
}else{
var _10f8=_10ef.get(this._placeholdername);
this._textareaname=_10f8.textareaname;
_10f8.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype._getElementsByTagName=function(node,_10fb){
var _10fc=null;
if(Client.isWebKit||Client.isExplorer){
_10fc=node.getElementsByTagName(_10fb);
}else{
_10fc=node.getElementsByTagName("ui:"+_10fb);
}
return _10fc;
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10fd,_10fe){
var _10ff=this._getElementsByTagName(_10fd,"selector").item(0);
var _1100=this._getElementsByTagName(_10fe,"selector").item(0);
var _1101=false;
var _1102=false;
if(_10ff!=null&&_1100!=null){
var _1103=new List(this._getElementsByTagName(_10ff,"selection"));
var _1104=new List(this._getElementsByTagName(_1100,"selection"));
if(_1103.getLength()!=_1104.getLength()){
_1101=true;
_1102=true;
}else{
_1103.each(function(_1105,index){
var _1107=_1105.getAttribute("value");
var _1108=_1104.get(index).getAttribute("value");
if(_1107!=_1108){
_1101=true;
}
return !_1101;
});
_1103.each(function(_1109,index){
var _110b=_1109.getAttribute("selected");
var _110c=_1104.get(index).getAttribute("selected");
if(_110b!=_110c){
_1102=true;
}
return !_1102;
});
}
}
if(_1101){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10ff);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
if(_1102){
this.updateTemplatePreview();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10fd,_10fe,_1102);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_110e){
var _110f=null;
if(_110e==undefined){
_110e=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1111){
if(_1111.PlaceholderId==_110e){
_110f=_1111.ClientRectangle.Width;
return false;
}
});
}
return _110f;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(sync){
var _1113=this._pageId;
var _1114=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1113,_1114,function(_1116){
self._templatePreview=_1116;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1117){
var _1118=this._pageId;
var _1119=this._textareaname;
var _111a=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1117,_1118,_111a,_1119,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_111c){
var _111d=this._pageId;
var _111e=this._textareaname;
var _111f=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_111c,_111d,_111f,_111e,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1121,frame,_1123){
this._editorBinding=_1121;
this._codePressFrame=frame;
this._codePressEngine=_1123;
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
var _1129=this.getProperty("validate");
if(_1129==true){
this._hasStrictValidation=true;
}
var _112a=this.getProperty("strictsave");
if(_112a===false){
this._strictSave=false;
}
var _112b=this.getProperty("validator");
if(_112b!=null){
this._validator=_112b;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_112c,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_112c,arg);
switch(_112c){
case BroadcastMessages.CODEMIRROR_LOADED:
var _112e=this.getContentWindow().bindingMap.codemirrorwindow;
if(_112e!=null){
var _112f=_112e.getContentWindow();
if(arg.broadcastWindow==_112f){
this._codemirrorWindow=_112f;
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
this.initializeEditorComponents(_112e);
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
this.unsubscribe(_112c);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1133){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1133);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1134){
if(_1134!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1134;
EditorBinding.isActive=_1134;
var _1135=this._codemirrorWindow.standardEventHandler;
if(_1134){
_1135.enableNativeKeys(true);
}else{
_1135.disableNativeKeys();
}
var _1136=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1136!=null){
if(_1134){
_1136.enable();
}else{
_1136.disable();
}
}
if(_1134){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _113a=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _113a;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_113b){
_113b.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_113d){
if(!this._isFinalized){
if(_113d!=this._startContent){
this._startContent=_113d;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_113d);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _113e=this.getContentWindow().bindingMap.editorpage.getContent();
return _113e?_113e:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_113f){
if(this._pageBinding!=null){
this._pageBinding.cover(_113f);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1140){
if(_1140!=null&&this.shadowTree.dotnetinput!=null){
var value=_1140.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1142=true;
var _1143=this.getContent();
if(this._validator!=null){
_1142=Validator.validateInformed(_1143,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1144=_1143.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1144!=_1143){
_1143=_1144;
this.setContent(_1144);
}
_1142=XMLParser.isWellFormedDocument(_1143,true,!this._strictSave);
if(_1142==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1142=this._isValidHTML(_1143);
break;
}
}
break;
}
}
return _1142;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1146=true;
var doc=XMLParser.parse(xml);
var _1148=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1148.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1148.add("NamespaceURI");
}
var head=null,body=null;
var _114c=new List(root.childNodes);
while(_114c.hasNext()){
var child=_114c.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1148.add("MultipleHead");
}
if(body!=null){
_1148.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1148.add("MultipleBody");
}
body=child;
break;
default:
_1148.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1148.add("MissingHead");
}
if(body==null){
_1148.add("MissingBody");
}
}
if(_1148.hasEntries()){
_1146=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1148.getFirst()));
}
return _1146;
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
var _114e=null;
var page=this._pageBinding;
if(page!=null){
_114e=page.getCheckSum();
}
return _114e;
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
ThrobberBinding.prototype.handleBroadcast=function(_1150,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1150,arg);
switch(_1150){
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
ProgressBarBinding.notch=function(_1153){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1153);
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
ProgressBarBinding.prototype.notch=function(_1155){
_1155=_1155?_1155:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1155);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1157,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1157,arg);
switch(_1157){
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
StartMenuItemBinding.prototype.setChecked=function(_1159,_115a){
StartMenuItemBinding.superclass.setChecked.call(this,_1159,_115a);
if(!_115a){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_115b){
var _115c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_115b);
UserInterface.registerBinding(_115c,StartMenuItemBinding);
return UserInterface.getBinding(_115c);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_115f,_1160){
var _1161=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1160,true)==true){
if(_115f!="*"){
_115f=KeySetBinding._sanitizeKeyModifiers(_115f);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1161[doc]){
_1161[doc]={};
}
if(!_1161[doc][code]){
_1161[doc][code]={};
}
_1161[doc][code][_115f]=_1160;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1165=false;
var code=e.keyCode;
var _1167=KeySetBinding.keyEventHandlers;
if(_1167[doc]&&_1167[doc][code]){
var _1168="[default]";
_1168+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1168+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1168+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1168+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1169=_1167[doc][code][_1168];
if(_1169==null){
_1169=_1167[doc][code]["*"];
}
if(_1169!=null){
_1169.handleKeyEvent(e);
_1165=true;
}
}
return _1165;
};
KeySetBinding._sanitizeKeyModifiers=function(_116a){
var _116b="[default]";
var mods={};
if(_116a){
new List(_116a.split(" ")).each(function(_116d){
mods[_116d]=true;
});
function check(_116e){
if(mods[_116e]){
_116b+=" "+_116e;
}
}
check("shift");
check("control");
}
return _116b;
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
var _1172=key.getAttribute("oncommand");
var _1173=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1173){
DOMEvents.preventDefault(e);
}
var _1175=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1172,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1176){
if(_1176 instanceof CursorBinding){
_1176.setOpacity(0);
_1176.show();
new Animation({modifier:9,onstep:function(_1177){
_1176.setOpacity(Math.sin(_1177*Math.PI/180));
},onstop:function(){
_1176.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1178){
if(_1178 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1179){
_1178.setOpacity(Math.cos(_1179*Math.PI/180));
},onstop:function(){
_1178.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_117a,_117b,_117c){
if(_117a instanceof CursorBinding){
_117c.x-=16;
_117c.y-=16;
new Animation({modifier:3,onstep:function(_117d){
var tal=Math.sin(_117d*Math.PI/180);
_117a.setPosition(new Point(((1-tal)*_117b.x)+((0+tal)*_117c.x),((1-tal)*_117b.y)+((0+tal)*_117c.y)));
},onstop:function(){
CursorBinding.fadeOut(_117a);
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
CursorBinding.prototype.setOpacity=function(_1183){
this.bindingElement.style.opacity=new String(_1183);
this._opacity=_1183;
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
function setOpacity(_1186){
cover.bindingElement.style.opacity=new String(_1186);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1187){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1187*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1189){
cover.bindingElement.style.MozOpacity=new String(_1189);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_118a){
if(Binding.exists(cover)){
setOpacity(Math.sin(_118a*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_118c){
if(_118c!=this._isBusy){
if(_118c){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_118c;
}
};
CoverBinding.prototype.setTransparent=function(_118d){
if(_118d!=this._isTransparent){
if(_118d){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_118d;
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
CoverBinding.prototype.setHeight=function(_118f){
if(_118f>=0){
this.bindingElement.style.height=new String(_118f+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1190){
var _1191=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1190);
return UserInterface.registerBinding(_1191,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1193=UncoverBinding._bindingInstance;
if(Binding.exists(_1193)){
_1193.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1197){
this._isFading=_1197==true;
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
var _1198=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1198.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1198.clearRect(0,0,300,150);
_1198.fillRect(0,0,300,150);
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
var _119a=this._canvas.getContext("2d");
_119a.clearRect(0,0,300,150);
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
var _119b=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_119b);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _119c=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_119c){
this._startcontent=_119c.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_119d){
SourceCodeViewerBinding.superclass.handleAction.call(this,_119d);
switch(_119d.type){
case WindowBinding.ACTION_ONLOAD:
if(_119d.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_119d.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_119d);
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
var _11a1=this._transformer.transformToString(doc);
this._inject(_11a1);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_11a4){
this.getContentDocument().body.innerHTML=_11a4;
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
var _11ac=list.getNext();
var id=_11ac.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_11ac);
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
var _11b6=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11b6.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11b6.appendChild(att);
}
elm.appendChild(_11b6);
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
var _11c0=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11c0){
doc=XMLParser.parse(_11c0);
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
var _11c4=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11c4;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11c5,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11c5,arg);
switch(_11c5){
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
var _11c8=new List();
list.each(function(lang){
_11c8.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11c8);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11cc){
switch(_11cc){
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
var _11da=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11d9,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
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
alert("getBinding exception occured on element:\n\n\t\t"+_11ea);
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
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12b9.BindEntityTokenToViewParams.EntityToken);
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
function logEntry(_12bc){
var _12bd=_12bc.Level.toLowerCase();
SystemLogger.getLogger(_12bc.SenderId)[_12bd](_12bc.Message);
}
function openView(_12be){
var list=paramsToList(_12be.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12be.ViewId);
def.entityToken=_12be.EntityToken;
def.flowHandle=_12be.FlowHandle;
def.position=_12a6[_12be.ViewType],def.label=_12be.Label;
def.image=_12be.Image;
def.toolTip=_12be.ToolTip;
def.argument={"url":_12be.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12be.ViewId,entityToken:_12be.EntityToken,flowHandle:_12be.FlowHandle,position:_12a6[_12be.ViewType],url:_12be.Url,label:_12be.Label,image:_12be.Image,toolTip:_12be.ToolTip}));
}
}
function openDialogView(_12c1){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12c1.ViewId,flowHandle:_12c1.FlowHandle,position:Dialog.MODAL,url:_12c1.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12c2){
var _12c3=_12c2.DialogType.toLowerCase();
if(_12c3=="question"){
throw "Not supported!";
}else{
Dialog[_12c3](_12c2.Title,_12c2.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12c4){
var map={};
var _12c6=false;
new List(_12c4.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12c6=true;
});
var proto=ViewDefinitions[_12c4.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12c4.ViewId;
}
def.argument=_12c6?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12cb){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12cb.ViewId);
def.label=_12cb.Label;
def.toolTip=_12cb.ToolTip;
def.image=_12cb.Image;
def.argument={"url":_12cb.Url,"list":paramsToList(_12cb.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12cd){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12cd.ViewId);
def.label=_12cd.Label;
def.toolTip=_12cd.ToolTip;
def.image=_12cd.Image;
def.url=_12cd.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12cf){
if(StageBinding.isViewOpen(_12cf.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12cf.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12d0){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12d0.ViewId,isSuccess:_12d0.Succeeded});
}
this._lockSystem=function(_12d1){
var _12d2=top.bindingMap.offlinetheatre;
if(_12d1){
_12d2.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12d2.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_12a2=_12d1;
};
this.handleBroadcast=function(_12d4,arg){
switch(_12d4){
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
function paramsToList(_12d6){
var list=new List();
new List(_12d6).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12d9=false;
var _12da=null;
var _12db=false;
var _12dc=Client.qualifies();
var _12dd="admin";
var _12de="123456";
if(!_12dc){
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
this.handleBroadcast=function(_12df){
switch(_12df){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12df);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12e0=window.bindingMap.appwindow;
_12e0.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12e1){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12e2){
if(_12e1){
EventBroadcaster.subscribe(_12e2,KickStart);
}else{
EventBroadcaster.unsubscribe(_12e2,KickStart);
}
});
}
function kickStart(_12e3){
switch(_12e3){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12d9=true;
break;
}
if(_12d9){
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
DataManager.getDataBinding("username").setValue(_12dd);
DataManager.getDataBinding("password").setValue(_12de);
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
var _12e6=DataManager.getDataBinding("username").getResult();
var _12e7=DataManager.getDataBinding("passwordold").getResult();
var _12e8=DataManager.getDataBinding("passwordnew").getResult();
var _12e9=DataManager.getDataBinding("passwordnew2").getResult();
if(_12e8==_12e9){
var _12ea=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12eb=LoginService.ChangePassword(_12e6,_12e7,_12e8);
if(_12eb instanceof SOAPFault){
alert(_12eb.getFaultString());
}else{
if(_12eb.length==0){
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
this.showPasswordErrors(_12eb);
}
}
WebServiceProxy.isFaultHandler=true;
if(_12ea){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
this.showPasswordErrors([Resolver.resolve("${string:Composite.C1Console.Users:ChangePasswordForm.ConfirmationPasswordMimatch}")]);
}
}
};
this.showPasswordErrors=function(_12ec){
_12ec=new List(_12ec);
var _12ed=document.getElementById("passworderror");
_12ed.innerHTML="";
_12ec.each(function(error){
var _12ef=document.createElement("div");
_12ef.textContent=error;
_12ef.className="errortext";
_12ed.appendChild(_12ef);
});
_12ed.style.display="block";
var _12f0={handleAction:function(_12f1){
document.getElementById("passworderror").style.display="none";
_12f1.target.removeActionListener(Binding.ACTION_DIRTY,_12f0);
}};
bindingMap.passwordfields.addActionListener(Binding.ACTION_DIRTY,_12f0);
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
this.doLogin=function(_12f2,_12f3){
var _12f4=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12f5=false;
var _12f6=false;
var _12f7=LoginService.ValidateAndLogin(_12f2,_12f3);
if(_12f7 instanceof SOAPFault){
alert(_12f7.getFaultString());
}else{
if(_12f7=="lockedAfterMaxAttempts"){
alert("The account was locked after maximum login attempts. Please contact administrator.");
}
if(_12f7=="lockedByAnAdministrator"){
alert("The account was locked by an administrator.");
}
if(_12f7=="passwordUpdateRequired"){
_12f6=true;
}
if(_12f7=="success"){
_12f5=true;
}
}
if(_12f6){
changePasswordRequired();
}else{
if(_12f5){
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
if(_12f4){
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
bindingMap.decks.select("chnagepassworddeck");
bindingMap.cover.attachClassName("widesplash");
setTimeout(function(){
var _12f8=document.getElementById("passwordexpired");
_12f8.firstChild.data=_12f8.firstChild.data.replace("{0}",Installation.passwordExpirationTimeInDays);
DataManager.getDataBinding("usernameold").setValue(DataManager.getDataBinding("username").getResult());
DataManager.getDataBinding("passwordold").focus();
},0);
}
},25);
}
function accesssDenied(){
var _12f9=DataManager.getDataBinding("username");
var _12fa=DataManager.getDataBinding("password");
_12f9.blur();
_12fa.blur();
_12f9.setValue("");
_12fa.setValue("");
_12f9.clean();
_12fa.clean();
_12f9.focus();
document.getElementById("loginerror").style.display="block";
var _12fb={handleAction:function(_12fc){
document.getElementById("loginerror").style.display="none";
_12fc.target.removeActionListener(Binding.ACTION_DIRTY,_12fb);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12fb);
}
WindowManager.fireOnLoad(this);
if(!_12dc){
UpdateManager.isEnabled=false;
}
};

