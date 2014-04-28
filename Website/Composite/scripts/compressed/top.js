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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_117,_118,_119,_11a){
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
_Application.prototype={CONSOLE_ID:KeyMaster.getUniqueKey(),_TIMEOUT_LOSTFOCUS:250,logger:SystemLogger.getLogger("Application"),timer:SystemTimer.getTimer("Application"),isDeveloperMode:false,isLocalHost:false,hasExternalConnection:false,isLoggedIn:false,isLoggedOut:false,isLocked:false,hasStartPage:!Client.isPad,isMalFunctional:false,isOperational:false,isShuttingDown:false,isOffLine:false,isFocused:true,isBlurred:false,_isMousePositionTracking:false,_mousePosition:null,_cursorStartPoint:null,_isDragging:false,_isShutDownAllowed:true,_lockers:0,_lockthings:{},_isRegistered:null,_activeBinding:null,_activatedBindings:new List(),_dirtyTabs:new Map(),_topLevelClasses:typeof topLevelClassNames!="undefined"?new List(topLevelClassNames):null,_construct:function(){
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
StandardEventHandler.prototype._handleKeyDown=function(e,_39c){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_39c){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_39c=true;
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
var _39d=KeySetBinding.handleKey(this._contextDocument,e);
if(!_39d){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _39e=this._contextWindow.frameElement;
if(_39e!=null){
var _39f=DOMUtil.getParentWindow(_39e);
if(_39f.standardEventHandler!=null){
_39f.standardEventHandler._handleKeyDown(e,_39c);
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
var _3a2=false;
var _3a3=DOMEvents.getTarget(e);
var name=_3a3.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_3a2=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_3a2;
}
if(_3a2){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a6){
this._isAllowTabs=(_3a6==true?true:false);
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
function Action(_3a9,type){
this.target=_3a9;
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
function Animation(_3ab){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3ac in _3ab){
this[_3ac]=_3ab[_3ac];
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
Animation.prototype.onstart=function(_3b0){
};
Animation.prototype.onstep=function(_3b1){
};
Animation.prototype.onstop=function(_3b2){
};
Point.isEqual=function(p1,p2){
var _3b5=false;
if(p1&&p2){
_3b5=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b5;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3ba=false;
if(dim1&&dim2){
_3ba=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3ba;
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
function BindingAcceptor(_3c1){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3c1;
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
var _3c2=new List(this._binding.dragAccept.split(" "));
while(_3c2.hasNext()){
var type=_3c2.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3c4,arg){
var type=arg;
try{
switch(_3c4){
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
function BindingBoxObject(_3c9){
this._domElement=_3c9.getBindingElement();
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
function BindingDragger(_3cb){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3cb;
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
BindingDragger.prototype.registerHandler=function(_3cd){
if(Interfaces.isImplemented(IDragHandler,_3cd)==true){
this.handler=_3cd;
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
var _3d0=e.button==(e.target?0:1);
if(_3d0){
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
var _3d2=Application.getMousePosition();
var dx=_3d2.x-this.startPoint.x;
var dy=_3d2.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d5,e){
switch(_3d5){
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
function BindingParser(_3d7){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d7;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d8){
var _3d9=new List();
var xml=BindingParser.XML.replace("${markup}",_3d8);
var doc=XMLParser.parse(_3d8);
if(doc){
var _3dc=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3dc);
var node=_3dc.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d9.add(node);
}
node=node.nextSibling;
}
}
return _3d9;
};
BindingParser.prototype._iterate=function(_3de,_3df){
var _3e0=null;
switch(_3de.nodeType){
case Node.ELEMENT_NODE:
_3e0=this._cloneElement(_3de);
UserInterface.registerBinding(_3e0);
break;
case Node.TEXT_NODE:
_3e0=this._ownerDocument.createTextNode(_3de.nodeValue);
break;
}
if(_3e0){
_3df.appendChild(_3e0);
}
if(_3e0&&_3de.hasChildNodes()){
var _3e1=_3de.firstChild;
while(_3e1){
this._iterate(_3e1,_3e0);
_3e1=_3e1.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3e2){
var _3e3=DOMUtil.createElementNS(_3e2.namespaceURI?_3e2.namespaceURI:Constants.NS_XHTML,_3e2.nodeName,this._ownerDocument);
var i=0;
while(i<_3e2.attributes.length){
var attr=_3e2.attributes.item(i++);
_3e3.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3e3;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e6){
var _3e7=null;
var _3e8=false;
var _3e9=_3e6.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e6)){
var _3ea=UserInterface.getBinding(_3e6);
_3e8=BindingSerializer.activeInstance.indexBinding(_3ea);
if(_3e8){
_3e7=_3ea.key;
_3e6.setAttribute(BindingSerializer.KEYPOINTER,_3e7);
}
}
_3e7=_3e7?_3e7:_3e9;
var _3eb=new List(_3e6.childNodes);
_3eb.each(function(_3ec){
if(_3ec.nodeType==Node.ELEMENT_NODE){
_3ec.setAttribute(BindingSerializer.KEYPOINTER,_3e7);
}
});
if(_3e8){
BindingSerializer.activeInstance.append(_3e7,_3e9);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ed){
BindingSerializer.activeInstance=this;
_3ed.bindingWindow.ElementIterator.iterate(_3ed.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3ee){
var _3ef=false;
var _3f0=_3ee.serialize();
if(_3f0!=false){
_3ef=true;
var _3f1="ui:"+DOMUtil.getLocalName(_3ee.bindingElement);
var _3f2=DOMUtil.createElementNS(Constants.NS_UI,_3f1,this._dom);
this._pointers[_3ee.key]=_3f2;
for(var prop in _3f0){
if(_3f0[prop]!=null){
_3f2.setAttribute(prop,String(_3f0[prop]));
}
}
}
return _3ef;
};
BindingSerializer.prototype.append=function(_3f4,_3f5){
var _3f6=this._pointers[_3f4];
var _3f7=_3f5?this._pointers[_3f5]:this._dom;
_3f7.appendChild(_3f6);
};
function ImageProfile(_3f8){
this._default=_3f8.image;
this._hover=_3f8.imageHover;
this._active=_3f8.imageActive;
this._disabled=_3f8.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f9){
this._default=_3f9;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3fa){
this._hover=_3fa;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3fb){
this._active=_3fb;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3fc){
this._disabled=_3fc;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3fd,_3fe,_3ff){
var _400=null;
if(_3fd.isAttached){
_400=new List();
var _401=_3ff?_3fd.getChildElementsByLocalName(_3fe):_3fd.getDescendantElementsByLocalName(_3fe);
_401.each(function(_402){
var _403=UserInterface.getBinding(_402);
if(_403){
_400.add(_403);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3fd.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _400;
},getAncestorBindingByType:function(_405,impl,_407){
var _408=null;
if(Binding.exists(_405)){
var node=_405.bindingElement;
while(_408==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _40a=UserInterface.getBinding(node);
if(_40a instanceof impl){
_408=_40a;
}
}else{
if(_407&&node.nodeType==Node.DOCUMENT_NODE){
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
return _408;
},getAncestorBindingByLocalName:function(_40c,_40d,_40e){
var _40f=null;
if(_40d=="*"){
var node=_40c.bindingElement;
while(!_40f&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_40f=UserInterface.getBinding(node);
}
}
}else{
_40f=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_40d,_40c.bindingElement,_40e));
}
return _40f;
},getChildElementsByLocalName:function(_411,_412){
var _413=new List();
var _414=new List(_411.bindingElement.childNodes);
_414.each(function(_415){
if(_415.nodeType==Node.ELEMENT_NODE){
if(_412=="*"||DOMUtil.getLocalName(_415)==_412){
_413.add(_415);
}
}
});
return _413;
},getChildBindingByType:function(_416,impl){
var _418=null;
_416.getChildElementsByLocalName("*").each(function(_419){
var _41a=UserInterface.getBinding(_419);
if(_41a!=null&&_41a instanceof impl){
_418=_41a;
return false;
}else{
return true;
}
});
return _418;
},getDescendantBindingByType:function(_41b,impl){
var _41d=null;
_41b.getDescendantElementsByLocalName("*").each(function(_41e){
var _41f=UserInterface.getBinding(_41e);
if(_41f!=null&&_41f instanceof impl){
_41d=_41f;
return false;
}else{
return true;
}
});
return _41d;
},getDescendantBindingsByType:function(_420,impl){
var _422=new List();
_420.getDescendantElementsByLocalName("*").each(function(_423){
var _424=UserInterface.getBinding(_423);
if(_424!=null&&_424 instanceof impl){
_422.add(_424);
}
return true;
});
return _422;
},getNextBindingByLocalName:function(_425,name){
var _427=null;
var _428=_425.bindingElement;
while((_428=DOMUtil.getNextElementSibling(_428))!=null&&DOMUtil.getLocalName(_428)!=name){
}
if(_428!=null){
_427=UserInterface.getBinding(_428);
}
return _427;
},getPreviousBindingByLocalName:function(_429,name){
var _42b=null;
var _42c=_429.bindingElement;
while((_42c=DOMUtil.getPreviousElementSibling(_42c))!=null&&DOMUtil.getLocalName(_42c)!=name){
}
if(_42c!=null){
_42b=UserInterface.getBinding(_42c);
}
return _42b;
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
},addFilter:function(_42d){
this._filters.add(_42d);
},removeFilter:function(_42e){
var _42f=-1;
this._filters.each(function(fil){
_42f++;
var _431=true;
if(fil==_42e){
_431=false;
}
return _431;
});
if(_42f>-1){
this._filters.del(_42f);
}
},_applyFilters:function(node,arg){
var _434=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _437=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _438=true;
while(this._filters.hasNext()&&_438==true){
var _439=this._filters.getNext();
var res=_439.call(this,node,arg);
if(res!=null){
_434=res;
switch(res){
case stop:
case skip:
case skip+_437:
_438=false;
break;
}
}
}
return _434;
},crawl:function(_43b,arg){
this.contextDocument=_43b.ownerDocument;
this.onCrawlStart();
var _43d=this.type==NodeCrawler.TYPE_ASCENDING;
var _43e=this._applyFilters(_43b,arg);
if(_43e!=NodeCrawler.STOP_CRAWLING){
if(_43d&&_43e==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_43d?_43b.parentNode:_43b;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_440,arg){
var _442=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_442=this._crawlDescending(_440,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_442=this._crawlAscending(_440,arg);
break;
}
return _442;
},_crawlDescending:function(_443,arg){
var skip=NodeCrawler.SKIP_NODE;
var _446=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _448=null;
if(_443.hasChildNodes()){
var node=_443.firstChild;
while(node!=null&&_448!=stop){
this.currentNode=node;
_448=this._applyFilters(node,arg);
switch(_448){
case stop:
case _446:
case skip+_446:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_448=stop;
break;
}
}
}
if(_448!=stop&&_448!=skip){
this.previousNode=node;
}
break;
}
if(_448!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _448;
},_crawlAscending:function(_44b,arg){
var _44d=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_44b!=null){
this.currentNode=_44b;
_44d=this._applyFilters(_44b,arg);
if(_44d!=stop){
var next=this.nextNode?this.nextNode:_44b.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_44b;
_44d=this._crawl(next,arg);
}
}
}else{
_44d=stop;
}
return _44d;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _451 in this){
this[_451]=null;
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
var _454=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_454=NodeCrawler.SKIP_NODE;
}
return _454;
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
this.addFilter(function(_455,arg){
var _457=null;
if(!UserInterface.hasBinding(_455)){
_457=NodeCrawler.SKIP_NODE;
}
return _457;
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
this.addFilter(function(_459,arg){
var _45b=null;
var _45c=UserInterface.getBinding(_459);
if(Interfaces.isImplemented(ICrawlerHandler,_45c)==true){
self.response=null;
_45c.handleCrawler(self);
_45b=self.response;
}
return _45b;
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
this.addFilter(function(_45e,list){
var _460=null;
var _461=UserInterface.getBinding(_45e);
if(Interfaces.isImplemented(IFlexible,_461)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_461);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_461.isFlexSuspended==true){
_460=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_461);
}
break;
}
}
return _460;
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
this.addFilter(function(_462,list){
var _464=null;
var _465=UserInterface.getBinding(_462);
if(_465.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_465)==true){
if(_465.isFocusable&&_465.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_465);
break;
case FocusCrawler.MODE_FOCUS:
if(!_465.isFocused){
_465.focus();
}
_464=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_465.isFocused==true){
_465.blur();
_464=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _464;
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
this.addFilter(function(_466,list){
var _468=null;
var _469=UserInterface.getBinding(_466);
if(!_469.isVisible){
_468=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _468;
});
this.addFilter(function(_46a,list){
var _46c=null;
var _46d=UserInterface.getBinding(_46a);
if(_46d.isAttached){
if(Interfaces.isImplemented(IFit,_46d)){
if(!_46d.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_46d);
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
UpdateAssistant.serialize=function(_46e){
_46e=_46e.cloneNode(true);
_46e.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_46e.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_46e);
};
}
},handleEvent:function(e){
var _470=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_470);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_470);
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
},_beforeUpdate:function(_471){
var _472=(_471==document.documentElement);
if(_472){
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
var _475=FocusBinding.focusedBinding;
if(_475!=null){
this._focusID=_475.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_471.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_471);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_471,false);
break;
}
}
},_afterUpdate:function(_476){
var _477=(_476==document.documentElement);
if(_477){
var _478=this._elementsbuffer;
if(_478.hasEntries()){
_478.each(function(_479){
DocumentManager.attachBindings(_479);
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
var _47c=FocusBinding.focusedBinding;
if(_47c==null){
var _47d=document.getElementById(this._focusID);
if(_47d!=null){
var _47c=UserInterface.getBinding(_47d);
if(_47c!=null){
_47c.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _47e=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _47f="NEW DOM: "+document.title+"\n\n"+_47e+"\n\n";
_47f+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_47f);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_476.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_476.__isAttached!==false){
this._elementsbuffer.add(_476);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_476,true);
break;
}
switch(_476.id){
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
var _47c=UserInterface.getBinding(_476);
while(_47c==null&&_476!=null){
_47c=UserInterface.getBinding(_476);
_476=_476.parentNode;
}
if(_47c!=null){
_47c.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_481,_482){
var _483=UserInterface.getBinding(_481);
if(_483!=null){
if(_482){
var _484=this._attributesbuffer;
var map=new Map();
_484.each(function(name,old){
var now=_481.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_481.attributes).each(function(att){
if(att.specified){
if(!_484.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_48b){
var _48c=_483.propertyMethodMap[name];
if(_48c!=null){
_48c.call(_483,_48b);
}
});
}else{
var map=new Map();
new List(_481.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_48e,_48f){
var _490=window.bindingMap[_48e.getAttribute("id")];
if(_490!=null){
return _490.handleElement(_48e,_48f);
}
},updateElement:function(_491,_492){
var _493=window.bindingMap[_491.getAttribute("id")];
if(_493!=null){
return _493.updateElement(_491,_492);
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
this.addFilter(function(_495,list){
var _497=UserInterface.getBinding(_495);
var _498=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_497==null){
UserInterface.registerBinding(_495);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_497!=null){
if(!_497.isAttached){
list.add(_497);
}
if(_497.isLazy==true){
_498=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_497!=null){
list.add(_497);
}
break;
}
return _498;
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
},handleBroadcast:function(_499,arg){
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
var _49c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_49c)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_49c!=null){
if(_49c.href!=null&&_49c.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _49d=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_49d!=null){
var map={};
var _49f=DOMUtil.getElementsByTagName(_49d,"bindingmapping");
new List(_49f).each(function(_4a0){
var _4a1=_4a0.getAttribute("element");
var _4a2=_4a0.getAttribute("binding");
map[_4a1]=eval(_4a2);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_4a3){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_4a3;
}else{
this.customUserInterfaceMapping.merge(_4a3);
}
},_registerBindings:function(_4a4){
var _4a5=new DocumentCrawler();
_4a5.mode=DocumentCrawler.MODE_REGISTER;
_4a5.crawl(_4a4);
_4a5.dispose();
},_attachBindings:function(_4a6){
var _4a7=new DocumentCrawler();
_4a7.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a7.crawl(_4a6,list);
var _4a9=false;
while(list.hasNext()){
var _4aa=list.getNext();
if(!_4aa.isAttached){
_4aa.onBindingAttach();
if(!_4aa.memberDependencies){
_4aa.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4aa)){
_4a9=true;
}
}
}
if(_4a9){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a7.dispose();
list.dispose();
},attachBindings:function(_4ac){
this._registerBindings(_4ac);
this._attachBindings(_4ac);
},detachBindings:function(_4ad,_4ae){
var _4af=new DocumentCrawler();
_4af.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4af.crawl(_4ad,list);
if(_4ae==true){
list.extractFirst();
}
var _4b1=false;
list.reverse().each(function(_4b2){
if(Interfaces.isImplemented(IData,_4b2)){
_4b1=true;
}
_4b2.dispose(true);
});
if(_4b1){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4af.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4b4){
return (/textarea|input/.test(DOMUtil.getLocalName(_4b4)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b5){
this.isDirty=true;
var _4b6=false;
if(_4b5!=null&&!_4b5.isDirty){
_4b5.isDirty=true;
_4b5.dispatchAction(Binding.ACTION_DIRTY);
_4b6=true;
}
return _4b6;
},clean:function(_4b7){
if(_4b7.isDirty){
_4b7.isDirty=false;
}
},registerDataBinding:function(name,_4b9){
if(Interfaces.isImplemented(IData,_4b9,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b9;
}
}else{
throw "Invalid DataBinding: "+_4b9;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4bc=null;
if(this._dataBindings[name]!=null){
_4bc=this._dataBindings[name];
}
return _4bc;
},getAllDataBindings:function(_4bd){
var list=new List();
for(var name in this._dataBindings){
var _4c0=this._dataBindings[name];
list.add(_4c0);
if(_4bd&&_4c0 instanceof WindowBinding){
var _4c1=_4c0.getContentWindow().DataManager;
if(_4c1!=null){
list.merge(_4c1.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4c2=false;
for(var name in this._dataBindings){
_4c2=true;
break;
}
return _4c2;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c6){
var _4c7=this._dataBindings[name];
if(_4c7!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c7.setResult(_4c6);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c7);
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
var _4c8=new DataBindingMap();
_4c8.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4ca=this._dataBindings[name];
if(_4ca instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c8[name]=_4ca.getValue();
}
return _4c8;
},getDataBindingResultMap:function(){
var _4cb=new DataBindingMap();
_4cb.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4cd=this._dataBindings[name];
var res=_4cd.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4d0){
_4cb.set(name,_4d0);
});
}else{
_4cb.set(name,res);
}
}
return _4cb;
},getPostBackString:function(){
var _4d1="";
var form=document.forms[0];
if(form!=null){
var _4d3="";
new List(form.elements).each(function(_4d4){
var name=_4d4.name;
var _4d6=encodeURIComponent(_4d4.value);
switch(_4d4.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4d1+=name+"="+_4d6+"&";
break;
case "submit":
if(document.activeElement==_4d4){
_4d1+=name+"="+_4d6+"&";
}
break;
case "radio":
if(_4d4.checked){
_4d1+=name+"="+_4d6+"&";
}
break;
case "checkbox":
if(_4d4.checked){
if(_4d4.name==_4d3){
if(_4d1.lastIndexOf("&")==_4d1.length-1){
_4d1=_4d1.substr(0,_4d1.length-1);
}
_4d1+=","+_4d6;
}else{
_4d1+=name+"="+_4d4.value;
}
_4d3=name;
_4d1+="&";
}
break;
}
});
}
return _4d1.substr(0,_4d1.length-1);
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
var _4df=null;
var _4e0=null;
var _4e1=false;
if(!this._cache[name]){
_4e1=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4e3=DOMUtil.getXMLHTTPRequest();
_4e3.open("get",uri,false);
_4e3.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4e3.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4e0=_4e3.responseText;
break;
default:
_4e0=_4e3.responseXML;
break;
}
if(_4e0==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4e0;
}
}
_4e0=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4df=_4e0;
break;
case this._modes.MODE_DOCUMENT:
_4df=DOMUtil.cloneNode(_4e0,true);
break;
case this._modes.MODE_ELEMENT:
_4df=DOMUtil.cloneNode(_4e0.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4df=DOMSerializer.serialize(_4e0,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4df=DOMSerializer.serialize(_4e0.documentElement,true);
break;
}
if(_4e1&&Application.isDeveloperMode){
}
return _4df;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e6){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e6];
},invoke:function(url,_4e8,_4e9){
this._logger.error("Not implemented");
},invokeModal:function(url,_4eb,_4ec){
var _4ed=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4eb,argument:_4ec});
StageBinding.presentViewDefinition(_4ed);
return _4ed;
},invokeDefinition:function(_4ee){
if(_4ee instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4ee);
}
return _4ee;
},question:function(_4ef,text,_4f1,_4f2){
if(!_4f1){
_4f1=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ef,text,_4f1,_4f2);
},message:function(_4f3,text,_4f5,_4f6){
if(!_4f5){
_4f5=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4f3,text,_4f5,_4f6);
},error:function(_4f7,text,_4f9,_4fa){
if(!_4f9){
_4f9=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f7,text,_4f9,_4fa);
},warning:function(_4fb,text,_4fd,_4fe){
if(!_4fd){
_4fd=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4fb,text,_4fd,_4fe);
},_standardDialog:function(type,_500,text,_502,_503){
var _504=null;
if(!_502){
_504=new List(Dialog.BUTTONS_ACCEPT);
}else{
_504=new List();
new List(_502).each(function(_505){
var _506=null;
switch(typeof _505){
case "object":
_506=_505;
break;
case "string":
var _507=false;
if(_505.indexOf(":")>-1){
_505=_505.split(":")[0];
_507=true;
}
_506=Dialog.dialogButton(_505);
if(_507){
_506.isDefault=true;
}
break;
}
_504.add(_506);
});
}
var _508={title:_500,text:text,type:type,image:this._dialogImages[type],buttons:_504};
var _509=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_503,argument:_508});
StageBinding.presentViewDefinition(_509);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_50b,arg){
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
},saveAll:function(_50e){
var self=this;
var _510=Application.getDirtyDockTabsTabs();
if(_510.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_511,_512){
switch(_511){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_512,_50e);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_510);
}else{
if(_50e){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_513,_514){
var _515=false;
var list=new List();
_513.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_515=true;
var _519=list.getLength();
var _51a={handleBroadcast:function(_51b,tab){
if(--_519==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_514){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_51a);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _515;
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
var _51f="Composite.Management.Help";
if(!StageBinding.isViewOpen(_51f)){
StageBinding.handleViewPresentation(_51f);
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
var _521=document.createEvent("Events");
_521.initEvent(type,true,true);
window.dispatchEvent(_521);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function Uri(url){
var _523=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d-\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _524=_523.exec(url?url:"");
if(_524){
if(_524[3]=="media"){
this.isMedia=true;
}else{
if(_524[3]=="page"){
this.isPage=true;
}
}
}
var _525={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_525[$1]=$3;
});
this.queryString=_525;
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
Uri.prototype.setParam=function(key,_52e){
if(_52e==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_52e;
}
};
Uri.prototype.toString=function(){
var url=this.path;
var _530=[];
for(var key in this.queryString){
_530.push(key+"="+this.queryString[key]);
}
if(_530.length>0){
url+="?"+_530.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_532,_533){
var _534=null;
var _535=ViewDefinitions[_532];
if(_535.isMutable){
var impl=null;
if(_535 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_533!=null&&impl!=null){
var def=new impl();
for(var prop in _535){
def[prop]=ViewDefinition.cloneProperty(_535[prop]);
}
def.handle=_533;
_534=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _534;
};
ViewDefinition.cloneProperty=function(_539){
if(null==_539){
return _539;
}
if(typeof _539==="object"){
var _53a=(_539.constructor===Array)?[]:{};
for(var prop in _539){
_53a[prop]=ViewDefinition.cloneProperty(_539[prop]);
}
return _53a;
}
return _539;
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
Binding.evaluate=function(_541,_542){
var _543=null;
var _544=_542.bindingWindow.WindowManager;
if(_544!=null){
var _545=Binding.parseScriptStatement(_541,_542.key);
_543=_544.evaluate(_545);
}
return _543;
};
Binding.parseScriptStatement=function(_546,key){
if(_546!=null&&key!=null){
var _548="UserInterface.getBindingByKey ( \""+key+"\" )";
_546=_546.replace(/(\W|^)this(,| +|\)|;)/g,_548);
_546=_546.replace(/(\W|^)this(\.)/g,_548+".");
}
return _546;
};
Binding.exists=function(_549){
var _54a=false;
try{
if(_549&&_549.bindingElement&&_549.bindingElement.nodeType&&_549.isDisposed==false){
_54a=true;
}
}
catch(accessDeniedException){
_54a=false;
}
finally{
return _54a;
}
};
Binding.destroy=function(_54b){
if(!_54b.isDisposed){
if(_54b.acceptor!=null){
_54b.acceptor.dispose();
}
if(_54b.dragger!=null){
_54b.disableDragging();
}
if(_54b.boxObject!=null){
_54b.boxObject.dispose();
}
if(_54b._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_54b);
}
for(var _54c in _54b.shadowTree){
var _54d=_54b.shadowTree[_54c];
if(_54d instanceof Binding&&Binding.exists(_54d)){
_54d.dispose(true);
}
_54b.shadowTree[_54c]=null;
}
_54b.isDisposed=true;
_54b=null;
}
};
Binding.dotnetify=function(_54e,_54f){
var _550=_54e.getCallBackID();
if(_550!=null){
var _551=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_54e.bindingDocument);
_551.type="hidden";
_551.id=_550;
_551.name=_550;
_551.value=_54f!=null?_54f:"";
_54e.bindingElement.appendChild(_551);
_54e.shadowTree.dotnetinput=_551;
}else{
throw _54e.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_552){
var _553=_552.getProperty("image");
var _554=_552.getProperty("image-hover");
var _555=_552.getProperty("image-active");
var _556=_552.getProperty("image-disabled");
if(_552.imageProfile==null){
if(_552.image==null&&_553!=null){
_552.image=_553;
}
if(_552.imageHover==null&&_554!=null){
_552.imageHover=_554;
}
if(_552.imageActive==null&&_555!=null){
_552.imageActive=_555;
}
if(_552.imageDisabled==null&&_556!=null){
_552.imageDisabled=_556;
}
if(_552.image||_552.imageHover||_552.imageActive||_552.imageDisabled){
_552.imageProfile=new ImageProfile(_552);
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
var _558=this.dependentBindings[key];
_558.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_559){
if(_559){
this.memberDependencies[_559.key]=true;
var _55a=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_55a=false;
break;
}
}
if(_55a){
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
Binding.prototype.detachRecursive=function(_55c){
if(_55c==null){
_55c=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_55c);
};
Binding.prototype.addMember=function(_55d){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_55d.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_55d.key]=false;
_55d.registerDependentBinding(this);
}
}
return _55d;
};
Binding.prototype.addMembers=function(_55e){
while(_55e.hasNext()){
var _55f=_55e.getNext();
if(!_55f.isInitialized){
this.addMember(_55f);
}
}
return _55e;
};
Binding.prototype.registerDependentBinding=function(_560){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_560.key]=_560;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _561=this.getProperty("persist");
if(_561&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _563=new List(_561.split(" "));
while(_563.hasNext()){
var prop=_563.getNext();
var _565=Persistance.getPersistedProperty(id,prop);
if(_565!=null){
this._persist[prop]=_565;
this.setProperty(prop,_565);
}else{
_565=this.getProperty(prop);
if(_565!=null){
this._persist[prop]=_565;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _566=this.getProperty("disabled");
var _567=this.getProperty("contextmenu");
var _568=this.getProperty("observes");
var _569=this.getProperty("onattach");
var _56a=this.getProperty("hidden");
var _56b=this.getProperty("blockactionevents");
if(_56a==true&&this.isVisible==true){
this.hide();
}
if(_566&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_567){
this.setContextMenu(_567);
}
if(_568){
this.observe(this.getBindingForArgument(_568));
}
if(_56b==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_569!=null){
Binding.evaluate(_569,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _56d=this.getProperty("draggable");
var _56e=this.getProperty("dragtype");
var _56f=this.getProperty("dragaccept");
var _570=this.getProperty("dragreject");
if(_56d!=null){
this.isDraggable=_56d;
}
if(_56e!=null){
this.dragType=_56e;
if(_56d!=false){
this.isDraggable=true;
}
}
if(_56f!=null){
this.dragAccept=_56f;
}
if(_570!=null){
this.dragReject=_570;
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
Binding.prototype._updateBindingMap=function(_571){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _574=null;
if(_571){
_574=map[id];
if(_574!=null&&_574!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_574=map[id];
if(_574!=null&&_574==this){
delete map[id];
}
}
}else{
var _576=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_571);
if(Application.isDeveloperMode==true){
alert(_576);
}else{
this.logger.error(_576);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_578){
};
Binding.prototype.handleBroadcast=function(_579,arg){
};
Binding.prototype.handleElement=function(_57b){
return false;
};
Binding.prototype.updateElement=function(_57c){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _57e=null;
switch(typeof arg){
case "object":
_57e=arg;
break;
case "string":
_57e=this.bindingDocument.getElementById(arg);
if(_57e==null){
_57e=Binding.evaluate(arg,this);
}
break;
}
if(_57e!=null&&_57e.nodeType!=null){
_57e=UserInterface.getBinding(_57e);
}
return _57e;
};
Binding.prototype.serialize=function(){
var _57f={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_57f.id=id;
}
var _581=this.getProperty("binding");
if(_581){
_57f.binding=_581;
}
return _57f;
};
Binding.prototype.serializeToString=function(){
var _582=null;
if(this.isAttached){
_582=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _582;
};
Binding.prototype.subTreeFromString=function(_583){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_583);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_584){
var _585=this.bindingElement.getAttribute(_584);
if(_585){
_585=Types.castFromString(_585);
}
return _585;
};
Binding.prototype.setProperty=function(prop,_587){
if(_587!=null){
_587=_587.toString();
if(String(this.bindingElement.getAttribute(prop))!=_587){
this.bindingElement.setAttribute(prop,_587);
if(this.isAttached==true){
if(Persistance.isEnabled&&_587!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_587;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_587);
}
}
var _588=this.propertyMethodMap[prop];
if(_588){
_588.call(this,this.getProperty(prop));
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
var _58a=null;
if(Binding.exists(this)){
_58a=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _58a;
};
Binding.prototype.attachClassName=function(_58b){
CSSUtil.attachClassName(this.bindingElement,_58b);
};
Binding.prototype.detachClassName=function(_58c){
CSSUtil.detachClassName(this.bindingElement,_58c);
};
Binding.prototype.hasClassName=function(_58d){
return CSSUtil.hasClassName(this.bindingElement,_58d);
};
Binding.prototype.addActionListener=function(type,_58f){
_58f=_58f!=null?_58f:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_58f)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_58f);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_58f+")");
}
};
Binding.prototype.removeActionListener=function(type,_591){
_591=_591?_591:this;
if(Action.isValid(type)){
var _592=this.actionListeners[type];
if(_592){
var i=0,_594;
while((_594=_592[i])!=null){
if(_594==_591){
_592.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_596){
_596=_596?_596:this;
DOMEvents.addEventListener(this.bindingElement,type,_596);
};
Binding.prototype.removeEventListener=function(type,_598){
_598=_598?_598:this;
DOMEvents.removeEventListener(this.bindingElement,type,_598);
};
Binding.prototype.subscribe=function(_599){
if(!this.hasSubscription(_599)){
this._subscriptions.set(_599,true);
EventBroadcaster.subscribe(_599,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_599);
}
};
Binding.prototype.unsubscribe=function(_59a){
if(this.hasSubscription(_59a)){
this._subscriptions.del(_59a);
EventBroadcaster.unsubscribe(_59a,this);
}
};
Binding.prototype.hasSubscription=function(_59b){
return this._subscriptions.has(_59b);
};
Binding.prototype.observe=function(_59c,_59d){
_59c.addObserver(this,_59d);
};
Binding.prototype.unObserve=function(_59e,_59f){
_59e.removeObserver(this,_59f);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a4={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a4);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a4);
}
menu.snapToMouse(e);
}});
}else{
throw "No such contextmenu: "+arg;
}
};
Binding.prototype.getContextMenu=function(){
return this.contextMenuBinding;
};
Binding.prototype.dispatchAction=function(arg){
var _5a6=null;
var _5a7=null;
var _5a8=false;
if(arg instanceof Action){
_5a6=arg;
}else{
if(Action.isValid(arg)){
_5a6=new Action(this,arg);
_5a8=true;
}
}
if(_5a6!=null&&Action.isValid(_5a6.type)==true){
if(_5a6.isConsumed==true){
_5a7=_5a6;
}else{
var _5a9=this.actionListeners[_5a6.type];
if(_5a9!=null){
_5a6.listener=this;
var i=0,_5ab;
while((_5ab=_5a9[i++])!=null){
if(_5ab&&_5ab.handleAction){
_5ab.handleAction(_5a6);
}
}
}
var _5ac=true;
if(this.isBlockingActions==true){
switch(_5a6.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a8){
_5ac=false;
}
break;
}
}
if(_5ac){
_5a7=this.migrateAction(_5a6);
}else{
_5a7=_5a6;
}
}
}
return _5a7;
};
Binding.prototype.migrateAction=function(_5ad){
var _5ae=null;
var _5af=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5ae&&node.nodeType!=Node.DOCUMENT_NODE){
_5ae=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5ae){
_5af=_5ae.dispatchAction(_5ad);
}else{
_5af=_5ad;
}
}
return _5af;
};
Binding.prototype.reflex=function(_5b1){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5b1);
}
};
Binding.prototype.getMigrationParent=function(){
var _5b2=null;
if(true){
try{
var _5b3=this.bindingElement.parentNode;
if(_5b3!=null){
_5b2=_5b3;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5b2=null;
}
}
return _5b2;
};
Binding.prototype.add=function(_5b4){
if(_5b4.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5b4.bindingElement);
}else{
throw "Could not add "+_5b4.toString()+" of different document origin.";
}
return _5b4;
};
Binding.prototype.addFirst=function(_5b5){
if(_5b5.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b5.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b5.toString()+" of different document origin.";
}
return _5b5;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b6,_5b7){
return BindingFinder.getAncestorBindingByLocalName(this,_5b6,_5b7);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b9){
return BindingFinder.getAncestorBindingByType(this,impl,_5b9);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5bb){
return BindingFinder.getChildElementsByLocalName(this,_5bb);
};
Binding.prototype.getChildElementByLocalName=function(_5bc){
return this.getChildElementsByLocalName(_5bc).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5bd){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5bd));
};
Binding.prototype.getChildBindingsByLocalName=function(_5be){
return this.getDescendantBindingsByLocalName(_5be,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5bf){
return this.getChildBindingsByLocalName(_5bf).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5c0,_5c1){
return BindingFinder.getDescendantBindingsByLocalName(this,_5c0,_5c1);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5c2){
return this.getDescendantBindingsByLocalName(_5c2,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c5){
return BindingFinder.getNextBindingByLocalName(this,_5c5);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c6){
return BindingFinder.getPreviousBindingByLocalName(this,_5c6);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c7){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c7);
};
Binding.prototype.isFirstBinding=function(_5c8){
return (this.getOrdinalPosition(_5c8)==0);
};
Binding.prototype.isLastBinding=function(_5c9){
return DOMUtil.isLastElement(this.bindingElement,_5c9);
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
Binding.prototype.setCallBackArg=function(_5cb){
this.setProperty(Binding.CALLBACKARG,_5cb);
};
Binding.prototype.dispose=function(_5cc){
if(!this.isDisposed){
if(!_5cc){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5cd=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5cd){
if(Client.isExplorer){
_5cd.outerHTML="";
}else{
_5cd.parentNode.removeChild(_5cd);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5d0){
list.add(_5d0);
});
list.each(function(_5d1){
self.unsubscribe(_5d1);
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
Binding.prototype.wakeUp=function(_5d3,_5d4){
_5d4=_5d4?_5d4:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d3!==undefined){
self[_5d3]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5d4);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d6){
if(_5d6.response==null&&this.isLazy==true){
if(_5d6.id==DocumentCrawler.ID&&_5d6.mode==DocumentCrawler.MODE_REGISTER){
_5d6.response=NodeCrawler.NORMAL;
}else{
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d6.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d6.id)){
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d6.response==null){
switch(_5d6.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d6.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d7){
var _5d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d7);
return UserInterface.registerBinding(_5d8,Binding);
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
var _5d9=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d9.each(function(_5da){
DataBinding.expressions[_5da.Key]=new RegExp(_5da.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5db){
var _5dc=null;
var _5dd=_5db.getAncestorBindingByLocalName("field");
if(_5dd&&_5dd instanceof FieldBinding){
var desc=_5dd.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5dc=desc.getLabel();
}
}
return _5dc;
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
var _5e0=this.bindingWindow.DataManager;
_5e0.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5e2=this.bindingWindow.DataManager;
if(_5e2.getDataBinding(name)){
_5e2.unRegisterDataBinding(name);
}
_5e2.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5e3,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e3,arg);
var _5e5=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e3){
case _5e5:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e5);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e6){
var _5e7=_5e6?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e6!=this.isActivated){
this.isActivated=_5e6;
this.dispatchAction(_5e7);
var _5e8=new List();
var self=this;
this._activationawares.each(function(_5ea){
if(_5ea.isActivationAware){
try{
if(_5e6){
if(!_5ea.isActivated){
_5ea.onActivate();
}
}else{
if(_5ea.isActivated){
_5ea.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e8.add(_5ea);
}
}
});
_5e8.each(function(_5eb){
this._activationawares.del(_5eb);
});
_5e8.dispose();
}else{
var _5ec="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5ec);
}else{
this.logger.error(_5ec);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ed,_5ee){
if(Interfaces.isImplemented(IActivationAware,_5ed,true)==true){
if(_5ee==false){
this._activationawares.del(_5ed);
}else{
this._activationawares.add(_5ed);
if(this.isActivated==true){
_5ed.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ed+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ef){
var _5f0=this.getMigrationParent();
if(_5f0!=null){
var root=_5f0.ownerDocument.body;
var _5f2=UserInterface.getBinding(root);
if(_5f2!=null){
_5f2.makeActivationAware(this,_5ef);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f3){
RootBinding.superclass.handleCrawler.call(this,_5f3);
if(_5f3.type==NodeCrawler.TYPE_ASCENDING){
_5f3.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5f4=null;
if(this.bindingWindow.parent){
_5f4=this.bindingWindow.frameElement;
}
return _5f4;
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
StyleBinding.prototype.handleElement=function(_5f5){
return true;
};
StyleBinding.prototype.updateElement=function(_5f6){
var href=_5f6.getAttribute("link");
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
var _5f8=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5f8.hasNext()){
var cell=_5f8.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5fa){
var _5fb=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5fa.bindingElement);
_5fb=_5fa;
}else{
_5fb=MatrixBinding.superclass.add.call(this,_5fa);
}
return _5fb;
};
MatrixBinding.prototype.addFirst=function(_5fc){
var _5fd=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5fe=this.shadowTree[MatrixBinding.CENTER];
_5fe.insertBefore(_5fc.bindingElement,_5fe.firstChild);
_5fd=_5fc;
}else{
_5fd=MatrixBinding.superclass.addFirst.call(this,_5fc);
}
return _5fc;
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
MatrixBinding.newInstance=function(_600){
var _601=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_600);
return UserInterface.registerBinding(_601,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_602,_603){
var list=new List();
var _605=new FlexBoxCrawler();
_605.mode=_603?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_605.startBinding=_602;
_605.crawl(_602.bindingElement,list);
list.each(function(_606){
_606.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_607){
if(Binding.exists(_607)){
_607.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_608){
if(Binding.exists(_608)){
_608.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_605.dispose();
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
}
};
FlexBoxBinding.prototype.onBindingAttach=function(){
FlexBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_UPDATED);
};
FlexBoxBinding.prototype.handleAction=function(_609){
FlexBoxBinding.superclass.handleAction.call(this,_609);
switch(_609.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_60a){
var _60b=0;
var _60c=new List(this.bindingElement.parentNode.childNodes);
while(_60c.hasNext()){
var _60d=_60c.getNext();
if(_60d.nodeType==Node.ELEMENT_NODE&&_60d!=this.bindingElement){
if(!this._isOutOfFlow(_60d)){
var rect=_60d.getBoundingClientRect();
if(_60a){
height+=(rect.right-rect.left);
}else{
_60b+=(rect.bottom-rect.top);
}
}
}
}
return _60b;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_60f){
var _610=CSSComputer.getPosition(_60f);
var _611=CSSComputer.getFloat(_60f);
return (_610=="absolute"||_611!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _612=this.bindingElement.parentNode;
var rect=_612.getBoundingClientRect();
var _614=rect.bottom-rect.top;
var _615=CSSComputer.getPadding(_612);
var _616=CSSComputer.getBorder(_612);
_614-=(_615.top+_615.bottom);
_614-=(_616.top+_616.bottom);
return _614;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _617=this.bindingElement.parentNode;
var rect=_617.getBoundingClientRect();
var _619=rect.right-rect.left;
var _61a=CSSComputer.getPadding(_617);
var _61b=CSSComputer.getBorder(_617);
_619-=(_61a.left+_61a.right);
_619-=(_61b.left+_61b.right);
return _619;
};
FlexBoxBinding.prototype.setFlexibility=function(_61c){
if(_61c!=this.isFlexible){
if(_61c){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_61c;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _61d=this._getSiblingsSpan();
_61d=this._getCalculatedHeight()-_61d;
if(!isNaN(_61d)&&_61d>=0){
this.bindingElement.style.height=String(_61d)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_61e){
if(!this.isFit||_61e){
var _61f=0;
new List(this.bindingElement.childNodes).each(function(_620){
if(_620.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_620)){
var rect=_620.getBoundingClientRect();
_61f+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_61f);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_622){
var _623=CSSComputer.getPadding(this.bindingElement);
var _624=CSSComputer.getBorder(this.bindingElement);
_622+=_623.top+_623.bottom;
_622+=_624.top+_624.bottom;
this.bindingElement.style.height=_622+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_625){
ScrollBoxBinding.superclass.handleAction.call(this,_625);
switch(_625.type){
case BalloonBinding.ACTION_INITIALIZE:
_625.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_626){
this.bindingElement.scrollLeft=_626.x;
this.bindingElement.scrollTop=_626.y;
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
var _627=this._getBuildElement("labeltext");
if(_627){
this.shadowTree.labelText=_627;
this.shadowTree.text=_627.firstChild;
this.hasLabel=true;
}
}else{
var _628=this.getProperty("label");
var _629=this.getProperty("image");
var _62a=this.getProperty("tooltip");
if(_628){
this.setLabel(_628,false);
}
if(_629){
this.setImage(_629,false);
}
if(_62a){
this.setToolTip(_62a);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_62b,_62c){
_62b=_62b!=null?_62b:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_62b);
this.setProperty("label",_62b);
if(!_62c){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_62e){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _62f=Resolver.resolve(url);
if(_62f.classes){
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_62f.classes);
}else{
this.setImageClasses();
this.setAlphaTransparentBackdrop(_62f);
}
this.setProperty("image",url);
this.hasImage=true;
if(!_62e){
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
LabelBinding.prototype.setImageClasses=function(_630){
if(this.shadowTree.labelBody){
if(!_630){
if(this.shadowTree.icon){
this.shadowTree.labelBody.removeChild(this.shadowTree.icon);
this.shadowTree.icon=null;
}
}else{
if(!this.shadowTree.icon){
this.shadowTree.icon=DOMUtil.createElementNS(Constants.NS_UI,"ui:icon",this.bindingDocument);
this.shadowTree.labelBody.insertBefore(this.shadowTree.icon,this.shadowTree.labelBody.firstChild);
}
this.shadowTree.icon.className=_630;
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
LabelBinding.prototype.setToolTip=function(_633){
this.setProperty("tooltip",_633);
if(_633!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_633));
}
};
LabelBinding.prototype.getToolTip=function(_634){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_635){
_635=_635==null?true:_635;
var _636=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_635;
if(_635){
this.attachClassName(_636);
}else{
this.detachClassName(_636);
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
var _637="textonly";
var _638="imageonly";
var _639="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_637);
this.detachClassName(_638);
this.attachClassName(_639);
}else{
if(this.hasLabel){
this.detachClassName(_639);
this.detachClassName(_638);
this.attachClassName(_637);
}else{
if(this.hasImage){
this.detachClassName(_639);
this.detachClassName(_637);
this.attachClassName(_638);
}
}
}
};
LabelBinding.newInstance=function(_63a){
var _63b=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_63a);
return UserInterface.registerBinding(_63b,LabelBinding);
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
var _63c=this.getProperty("label");
if(!_63c){
_63c=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_63c));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_63e){
this.setProperty("label",_63e);
};
TextBinding.newInstance=function(_63f){
var _640=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_63f);
return UserInterface.registerBinding(_640,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_641,_642){
BroadcasterBinding.superclass.setProperty.call(this,_641,_642);
function update(list){
if(list){
list.each(function(_644){
_644.setProperty(_641,_642);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _645=this._observers[_641];
if(_645){
update(_645);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_646){
BroadcasterBinding.superclass.deleteProperty.call(this,_646);
function update(list){
if(list){
list.each(function(_648){
_648.deleteProperty(_646);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _649=this._observers[_646];
if(_649){
update(_649);
}
};
BroadcasterBinding.prototype.addObserver=function(_64a,_64b){
_64b=_64b?_64b:"*";
_64b=new List(_64b.split(" "));
while(_64b.hasNext()){
var _64c=_64b.getNext();
switch(_64c){
case "*":
this._setAllProperties(_64a);
break;
default:
var _64d=this.getProperty(_64c);
_64a.setProperty(_64c,_64d);
break;
}
if(!this._observers[_64c]){
this._observers[_64c]=new List();
}
this._observers[_64c].add(_64a);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_64e){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _651=att.nodeName;
switch(_651){
case "id":
case "key":
break;
default:
var _652=this.getProperty(_651);
_64e.setProperty(_651,_652);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_653,_654){
_654=_654?_654:"*";
_654=new List(_654.split(" "));
while(_654.hasNext()){
var list=this._observers[_654.getNext()];
if(list){
while(list.hasNext()){
var _656=list.getNext();
if(_656==_653){
list.del(_656);
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
BroadcasterBinding.prototype.setDisabled=function(_657){
this.setProperty("isdisabled",_657);
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
var _659=this.getProperty("width");
var _65a=this.getProperty("label");
var type=this.getProperty("type");
var _65c=this.getProperty("popup");
var _65d=this.getProperty("tooltip");
var _65e=this.getProperty("isdisabled");
var _65f=this.getProperty("response");
var _660=this.getProperty("oncommand");
var _661=this.getProperty("value");
var _662=this.getProperty("ischecked");
var _663=this.getProperty("callbackid");
var _664=this.getProperty("focusable");
var _665=this.getProperty("focused");
var _666=this.getProperty("default");
var url=this.getProperty("url");
var _668=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_668){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_65a!=null){
this.setLabel(_65a);
}
if(type!=null){
this.setType(type);
}
if(_65d!=null){
this.setToolTip(_65d);
}
if(_659!=null){
this.setWidth(_659);
}
if(_65c!=null){
this.setPopup(_65c);
}
if(_65f!=null){
this.response=_65f;
}
if(_662==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_660!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_660,this);
};
}
if(_664||this.isFocusable){
this._makeFocusable();
if(_666||this.isDefault){
this.isDefault=true;
}
if(_665){
this.focus();
}
}
if(_65e==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_663!=null){
this.bindingWindow.DataManager.registerDataBinding(_663,this);
if(_661!=null){
Binding.dotnetify(this,_661);
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
ButtonBinding.prototype.setImage=function(_669){
if(this.isAttached){
this.labelBinding.setImage(_669);
}
this.setProperty("image",_669);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_66a){
if(this.isAttached){
this.labelBinding.setLabel(_66a);
}
this.setProperty("label",_66a);
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
ButtonBinding.prototype.setToolTip=function(_66c){
this.setProperty("tooltip",_66c);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_66c));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_66d){
this.imageProfile=new _66d(this);
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
ButtonBinding.prototype.flip=function(_672){
_672=_672==null?true:_672;
this.isFlipped=_672;
this.setProperty("flip",_672);
if(this.isAttached){
this.labelBinding.flip(_672);
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
ButtonBinding.prototype.check=function(_673){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_673==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_674){
this.isActive=true;
this.isChecked=true;
if(!_674){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_675){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true&&!this.isDisposed){
this._uncheck();
if(!_675==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_676){
this.isActive=false;
this.isChecked=false;
if(!_676){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_677,_678){
if(_677==null){
_677==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_677){
case true:
this.check(_678);
break;
case false:
this.uncheck(_678);
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
var _67a=this.getProperty("tooltip");
if(_67a){
this.setToolTip(_67a);
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
var _67b=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_67b=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _67b;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _67d=this.getEqualSizeWidth();
if(goal>_67d){
var diff=goal-_67d;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _680=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_681){
if(_681>=0){
this.bindingElement.style.width=new String(_681+"px");
}
this.setProperty("width",_681);
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
ButtonBinding.prototype.setValue=function(_682){
this.shadowTree.dotnetinput.value=_682;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_683){
this.setValue(_683);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_684){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_684;
this.imageProfile=_684.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_685){
var _686=_685?"addEventListener":"removeEventListener";
this.binding[_686](DOMEvents.MOUSEENTER,this);
this.binding[_686](DOMEvents.MOUSELEAVE,this);
this.binding[_686](DOMEvents.MOUSEDOWN,this);
this.binding[_686](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _688=false,_689=false,_68a=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_68a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_68a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_68a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_68a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_68a==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_688=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_68a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_68a=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_68a=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_68a=ButtonStateManager.STATE_NORMAL;
var _68b=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_68b instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_68a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_68a==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_689=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_68a=ButtonStateManager.STATE_NORMAL;
_688=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_68a=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_68a=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_68a=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_68a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_68a==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_688=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_68a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_68a=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_68a=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_68a=ButtonStateManager.STATE_NORMAL;
_688=true;
break;
}
}
}
}
}
switch(_68a){
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
if(_688){
this.binding.fireCommand();
}
if(_689){
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
var _68f=this.imageProfile.getDisabledImage();
if(_68f){
this.binding.setImage(_68f);
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
ClickButtonBinding.newInstance=function(_690){
var _691=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_690);
return UserInterface.registerBinding(_691,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_692){
var _693=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_692);
return UserInterface.registerBinding(_693,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_694){
var _695=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_694);
return UserInterface.registerBinding(_695,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_696){
this._binding=_696;
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
var _697=this.getDescendantBindingsByLocalName("control");
_697.each(function(_698){
_698.setControlType(_698.controlType);
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
ControlGroupBinding.newInstance=function(_69a){
var _69b=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_69a);
return UserInterface.registerBinding(_69b,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_69e){
ControlBinding.superclass.handleAction.call(this,_69e);
switch(_69e.type){
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
function ControlImageProfile(_69f){
this.binding=_69f;
}
ControlImageProfile.prototype._getImage=function(_6a0){
var _6a1=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6a1=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6a1=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6a1=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6a1=this.constructor.IMAGE_CLOSE;
break;
}
return _6a1.replace("${string}",_6a0);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6a2=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6a2=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6a2?this._getImage("default"):this._getImage("ghosted");
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
this.labelBinding.setImage(Resolver.resolve(url));
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
DialogMatrixBinding.newInstance=function(_781){
var _782=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_781);
return UserInterface.registerBinding(_782,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_783){
DialogSetBinding.superclass.handleAction.call(this,_783);
var _784=_783.target;
switch(_783.type){
case Binding.ACTION_MOVETOTOP:
if(_784 instanceof DialogBinding){
this._moveToTop(_784);
}
break;
case Binding.ACTION_MOVEDONTOP:
_783.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_785){
var _786=0;
var _787=this.getChildBindingsByLocalName("dialog");
_787.each(function(_788){
var _789=_788.getZIndex();
_786=_789>_786?_789:_786;
});
_785.setZIndex(_786+2);
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
DialogBorderBinding.newInstance=function(_78b){
var _78c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_78b);
return UserInterface.registerBinding(_78c,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_78d){
this._dialogBinding=_78d;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_78f){
DialogCoverBinding.superclass.handleAction.call(this,_78f);
var _790=_78f.target;
if(this._dialogBinding.isModal){
switch(_78f.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_790==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_790.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_791,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_791,arg);
switch(_791){
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
var _794=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_794);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _795=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_795);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_796){
var _797=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_796);
return UserInterface.registerBinding(_797,DialogCoverBinding);
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
var _798=this.getProperty("image");
if(_798){
this.setImage(_798);
}
var _799=this.getProperty("label");
if(_799){
this.setLabel(_799);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_79a){
if(this.isAttached){
this.labelBinding.setLabel(_79a);
}
this.setProperty("label",_79a);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_79c){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_79c);
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
DialogTitleBarBinding.newInstance=function(_79d){
var _79e=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_79d);
return UserInterface.registerBinding(_79e,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_79f){
var _7a0=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_79f);
return UserInterface.registerBinding(_7a0,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7a1){
var _7a2=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a1);
return UserInterface.registerBinding(_7a2,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7a3){
this.binding=_7a3;
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
var _7a6=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a7=node.nodeName.toLowerCase();
switch(_7a7){
case "script":
case "style":
case "textarea":
_7a6=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a6;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7ae=true;
if(exp.test(text)){
self._textnodes.add(node);
_7ae=false;
}
return _7ae;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7af,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7af,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b3=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b3+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b9){
var _7ba="";
var _7bb="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7bc="</span>";
var self=this;
function iterate(_7be){
var _7bf=-1;
var _7c0=null;
self._map.each(function(key,exp){
var low=_7be.toLowerCase();
var _7c4=low.search(exp);
if(_7c4>-1){
if(_7bf==-1){
_7bf=_7c4;
}
if(_7c4<=_7bf){
_7bf=_7c4;
_7c0=key;
}
}
});
if(_7bf>-1&&_7c0!=null){
var pre=_7be.substring(0,_7bf);
var hit=_7be.substring(_7bf,_7bf+_7c0.length);
var pst=_7be.substring(_7bf+_7c0.length,_7be.length);
_7ba+=pre+_7bb+hit+_7bc;
iterate(pst);
}else{
_7ba+=_7be;
}
}
iterate(_7b9);
return _7ba;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c8){
var _7c9=new List(_7c8.getElementsByTagName("span"));
_7c9.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c8.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7cc){
var _7cd=null;
if(_7cc.isAttached){
var doc=_7cc.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7cd=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7cd instanceof SOAPFault){
_7cd=null;
}
}
}
return _7cd;
};
WindowBinding.highlightKeywords=function(_7d1,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d1.isAttached){
var doc=_7d1.getContentDocument();
if(doc!=null){
var _7d4=WindowBinding._highlightcrawler;
_7d4.reset(doc.body);
if(list!=null){
_7d4.setKeys(list);
_7d4.crawl(doc.body);
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
var _7d5=WindowBinding.superclass.serialize.call(this);
if(_7d5){
_7d5.url=this.getURL();
}
return _7d5;
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
var _7d7=this.getContentWindow().DocumentManager;
if(_7d7!=null){
_7d7.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d8){
WindowBinding.superclass.handleAction.call(this,_7d8);
var _7d9=_7d8.target;
switch(_7d8.type){
case RootBinding.ACTION_PHASE_3:
if(_7d9.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d9);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d8.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7da){
if(!this.isFit||_7da){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7db){
if(this._pageBinding==null){
if(_7db.bindingWindow==this.getContentWindow()){
this._pageBinding=_7db;
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
WindowBinding.prototype._registerOnloadListener=function(_7dc){
var _7dd=this.shadowTree.iframe;
var _7de=_7dc?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e1=true;
if(Client.isExplorer){
_7e1=_7dd.readyState=="complete";
}
if(_7e1==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7de](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7e2){
var _7e3=_7e2?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e3](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e8=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e8.getQueryString().each(function(name,_7ea){
if(_7ea.length>512){
data.set(name,_7ea);
_7e8.setParam(name,null);
}
});
url=_7e8.toString();
}
if(data){
var self=this;
var _7ec=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7ec.id;
form.setAttribute("target",_7ec.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7ef){
var _7f0=self.bindingDocument.createElement("input");
_7f0.name=name;
_7f0.value=_7ef;
_7f0.type="hidden";
form.appendChild(_7f0);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f1=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f1=url;
}
return _7f1;
};
WindowBinding.prototype.reload=function(_7f3){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f4=null;
if(this.shadowTree.iframe!=null){
_7f4=this.shadowTree.iframe;
}
return _7f4;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f5=null,_7f6=this.getFrameElement();
if(_7f6!==null){
try{
_7f5=_7f6.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f5;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f7=null,win=this.getContentWindow();
if(win){
_7f7=win.document;
}
return _7f7;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f9=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f9=UserInterface.getBinding(doc.body);
}
return _7f9;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7fb){
this.bindingElement.style.height=_7fb+"px";
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
WindowBinding.prototype.handleCrawler=function(_7fc){
WindowBinding.superclass.handleCrawler.call(this,_7fc);
if(_7fc.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7fc.nextNode=root.bindingElement;
}else{
_7fc.response=NodeCrawler.SKIP_CHILDREN;
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
var _801=this.getContentWindow();
if(_801!=null&&_801.document!=null&&_801.document.body!=null){
_801.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
}
};
WindowBinding.newInstance=function(_802){
var _803=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_802);
var _804=UserInterface.registerBinding(_803,WindowBinding);
return _804;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_808){
_808.target.show();
_808.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_80a){
_80a.target.show();
_80a.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_80c){
PreviewWindowBinding.superclass.handleAction.call(this,_80c);
switch(_80c.type){
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
var _80d=null;
this._getRadioButtonBindings().each(function(_80e){
if(_80e.getProperty("ischecked")){
_80d=_80e;
return false;
}else{
return true;
}
});
if(_80d){
this._checkedRadioBinding=_80d;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_80f){
RadioGroupBinding.superclass.handleAction.call(this,_80f);
var _810=_80f.target;
switch(_80f.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_80f.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_810.isRadioButton&&!_810.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_810);
}
this._checkedRadioBinding=_810;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_80f.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_811,_812){
if(_811 instanceof RadioDataBinding){
_811=_811.getButton();
}
if(_811.isRadioButton){
switch(_812){
case true:
this._unCheckRadioBindingsExcept(_811);
this._checkedRadioBinding=_811;
_811.check(true);
break;
default:
_811.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_813){
var _814=this._getRadioButtonBindings();
_814.each(function(_815){
if(_815.isChecked&&_815!=_813){
_815.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _816=new Crawler();
var list=new List();
_816.addFilter(function(_818){
var _819=true;
var _81a=UserInterface.getBinding(_818);
if(_81a instanceof RadioGroupBinding){
_819=NodeCrawler.SKIP_CHILDREN;
}else{
if(_81a instanceof ButtonBinding&&_81a.isRadioButton){
list.add(_81a);
}
}
return _819;
});
_816.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_81b){
var _81c=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_81b);
return UserInterface.registerBinding(_81c,RadioGroupBinding);
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
var _81e=this.getProperty("regexrule");
if(_81e!=null){
this.expression=new RegExp(_81e);
}
var _81f=this.getProperty("onbindingblur");
if(_81f!=null){
this.onblur=function(){
Binding.evaluate(_81f,this);
};
}
var _820=this.getProperty("onvaluechange");
if(_820!=null){
this.onValueChange=function(){
Binding.evaluate(_820,this);
};
}
if(this.error==null&&this.type!=null){
var _821=DataBinding.errors[this.type];
if(_821!=null){
this.error=_821;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _822=this.getProperty("value");
if(_822!=null){
this.setValue(String(_822));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _824=this.getProperty("isdisabled");
if(_824==true){
this.setDisabled(true);
}
var _825=this.getProperty("readonly");
if(_825==true){
this.setReadOnly(true);
}
var _826=this.getProperty("autoselect");
if(_826==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _827=Localization.currentLang();
if(_827!=null){
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
var _828=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_828.type=this.isPassword==true?"password":"text";
_828.tabIndex=-1;
return _828;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_82b){
if(_82b){
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
DataInputBinding.prototype.focus=function(_82d){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_82d){
var self=this,_82f=this.bindingElement,_830={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_82f,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_82f,DOMEvents.MOUSEUP,_830);
}else{
this.select();
}
}
this.onfocus();
if(!_82d){
var _831=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_831);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _832=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _833=_832.createTextRange();
_833.moveStart("character",0);
_833.moveEnd("character",_832.value.length);
_833.select();
}else{
_832.setSelectionRange(0,_832.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_834){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_834){
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
DataInputBinding.prototype.validate=function(_838){
if(_838==true||this._isValid){
var _839=this.isValid();
if(_839!=this._isValid){
this._isValid=_839;
if(!_839){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _83a=null;
if(this._isInvalidBecauseRequired==true){
_83a=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_83a=DataBinding.warnings["minlength"];
_83a=_83a.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_83a=DataBinding.warnings["maxlength"];
_83a=_83a.replace("${count}",String(this.maxlength));
}else{
_83a=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_83a!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_83a);
}
}else{
this.setValue(_83a);
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
var _83b=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _83c=this.getValue();
if(_83c==""){
if(this.isRequired==true){
_83b=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _83d=DataBinding.expressions[this.type];
if(!_83d.test(_83c)){
_83b=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_83c)){
_83b=false;
}
}
}
}
if(_83b&&this.minlength!=null){
if(_83c.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_83b=false;
}
}
if(_83b&&this.maxlength!=null){
if(_83c.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_83b=false;
}
}
return _83b;
};
DataInputBinding.prototype.setDisabled=function(_83e){
if(_83e!=this.isDisabled){
if(_83e){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _83f=this.shadowTree.input;
if(_83e){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_83f,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_83f,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_83e;
this.shadowTree.input.unselectable=_83e?"on":"off";
}
this.isDisabled=_83e;
this.isFocusable=!_83e;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_841){
if(_841!=this.isReadOnly){
if(_841){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_841;
this.isReadOnly=_841;
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
DataInputBinding.prototype.handleElement=function(_842){
return true;
};
DataInputBinding.prototype.updateElement=function(_843){
var _844=_843.getAttribute("value");
var _845=_843.getAttribute("type");
var _846=_843.getAttribute("maxlength");
var _847=_843.getAttribute("minlength");
var _848=_843.getAttribute("required")==="true";
if(_844==null){
_844="";
}
var _849=this.bindingWindow.UpdateManager;
if(this.getValue()!=_844){
_849.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_844);
}
if(this.type!=_845){
_849.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_845;
}
if(this.maxlength!=_846){
_849.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_846;
}
if(this.minlength!=_847){
_849.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_847;
}
if(this.isRequired!=_848){
_849.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_848;
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
DataInputBinding.prototype.setValue=function(_84a){
if(_84a===null){
_84a="";
}
if(_84a!=this.getValue()){
this.setProperty("value",_84a);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_84a);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _84b=null;
if(this.shadowTree.input!=null){
_84b=this.shadowTree.input.value;
}else{
_84b=this.getProperty("value");
}
return _84b;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _84d=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_84d=Number(_84d);
break;
}
return _84d;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_84e){
var _84f=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_84e);
return UserInterface.registerBinding(_84f,DataInputBinding);
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
var _850=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_850!=null){
this.setValue(_850.value);
_850.parentNode.removeChild(_850);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _851=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_851.tabIndex=-1;
return _851;
};
TextBoxBinding.prototype.handleElement=function(_852){
return true;
};
TextBoxBinding.prototype.updateElement=function(_853){
var _854,area=_853.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_854=DOMUtil.getTextContent(area);
}
if(_854==null){
_854="";
}
var _856=this.bindingWindow.UpdateManager;
if(this.getValue()!=_854){
_856.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_854);
}
var _857=_853.getAttribute("type");
if(this.type!=_857){
_856.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_857;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_85b){
var _85c=this.bindingDocument.selection.createRange();
var _85d=_85c.text=="";
if(_85d&&!_85b){
_85c.text="\t";
}else{
var text="";
var _85f=_85c.text.length;
while((_85c.moveStart("word",-1)&&_85c.text.charAt(1)!="\n")){
}
_85c.moveStart("character",1);
var _860=0;
var i=0,line,_863=_85c.text.split("\n");
while((line=_863[i++])!=null){
if(_85b){
line=line.replace(/^(\s)/mg,"");
_860++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_863[i+1]?"\n":"");
}
_85c.text=text;
_85c.moveStart("character",-_85f);
if(_85b){
_85c.moveStart("character",2*_863.length-2);
}
_85c.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _864=this.bindingDocument.selection.createRange();
var _865=_864.duplicate();
while((_865.moveStart("word",-1)&&_865.text.indexOf("\n")==-1)){
}
_865.moveStart("character",1);
_864.text="\n"+_865.text.match(/^(\s)*/)[0]+"!";
_864.moveStart("character",-1);
_864.select();
_864.text="";
_864.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_866){
var _867;
var _868;
var oss;
var osy;
var i;
var fnd;
var _86d=this._getSelectedText();
var el=this.shadowTree.input;
_867=el.scrollLeft;
_868=el.scrollTop;
if(!_86d.match(/\n/)){
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
_86d=this._getSelectedText();
if(_866){
ntext=_86d.replace(/^(\s)/mg,"");
}else{
ntext=_86d.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_86d.length);
}
el.scrollLeft=_867;
el.scrollTop=_868;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86f;
var _870;
var oss;
var osy;
var el=this.shadowTree.input;
_86f=el.scrollLeft;
_870=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_86f;
el.scrollTop=_870;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _877=this.shadowTree.input.value;
var _878=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _877.substr(_878,end-_878);
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
var _87a=this.getProperty("isdisabled");
if(this.isDisabled||_87a){
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
var _87c=this.getProperty("label");
var _87d=this.getProperty("value");
var _87e=this.getProperty("width");
var _87f=this.getProperty("onchange");
var _880=this.getProperty("required")==true;
var _881=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_87c!=null){
this.label=_87c;
}
if(!this.value&&_87d!=null){
this.value=_87d;
}
if(!this.width&&_87e){
this.width=_87e;
}
if(_880){
this.isRequired=true;
}
if(_881){
this._isLocal=true;
}
if(_87f){
this.onValueChange=function(){
Binding.evaluate(_87f,this);
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
var _882=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_882.name=this.getName();
_882.value=this.getValue();
_882.type="hidden";
if(this.hasCallBackID()){
_882.id=this.getCallBackID();
}
this.shadowTree.input=_882;
this.bindingElement.appendChild(_882);
};
SelectorBinding.prototype.buildButton=function(){
var _883=this.BUTTON_IMPLEMENTATION;
var _884=this.add(_883.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_884.imageProfile=this.imageProfile;
}
if(this.width!=null){
_884.setWidth(this.width);
}
this._buttonBinding=_884;
this.shadowTree.button=_884;
_884.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _886;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _887=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_887.id="selectorpopupset";
_886=UserInterface.registerBinding(_887,PopupSetBinding);
this.bindingDocument.body.appendChild(_886.bindingElement);
}else{
_886=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_886=top.app.bindingMap.selectorpopupset;
}
var doc=_886.bindingDocument;
var _889=_886.add(PopupBinding.newInstance(doc));
var _88a=_889.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_889;
this._menuBodyBinding=_88a;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_889.attachClassName("selectorpopup");
_889.addActionListener(PopupBinding.ACTION_SHOW,this);
_889.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_889.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_889);
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
var _88d=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_88d).each(function(_88e){
var _88f=_88e.getAttribute("label");
var _890=_88e.getAttribute("value");
var _891=_88e.getAttribute("selected");
var _892=_88e.getAttribute("image");
var _893=_88e.getAttribute("image-hover");
var _894=_88e.getAttribute("image-active");
var _895=_88e.getAttribute("image-disabled");
var _896=null;
if(_892||_893||_894||_895){
_896=new ImageProfile({image:_892,imageHover:_893,imageActive:_894,imageDisabled:_895});
}
list.add(new SelectorBindingSelection(_88f?_88f:null,_890?_890:null,_891&&_891=="true",_896));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _898=null;
while(list.hasNext()){
var _899=list.getNext();
var item=this.addSelection(_899);
if(_899.isSelected){
this.select(item,true);
}
if(!_898){
_898=item;
}
}
if(!this._selectedItemBinding){
this.select(_898,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_89b,_89c){
var _89d=this.MENUITEM_IMPLEMENTATION;
var _89e=this._menuBodyBinding;
var _89f=_89e.bindingDocument;
var _8a0=_89d.newInstance(_89f);
_8a0.imageProfile=_89b.imageProfile;
_8a0.setLabel(_89b.label);
if(_89b.tooltip!=null){
_8a0.setToolTip(_89b.tooltip);
}
_8a0.selectionValue=_89b.value;
_89b.menuItemBinding=_8a0;
if(_89c){
_89e.addFirst(_8a0);
this.selections.addFirst(_89b);
}else{
_89e.add(_8a0);
this.selections.add(_89b);
}
this._isUpToDate=false;
return _8a0;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a1){
return this.addSelection(_8a1,true);
};
SelectorBinding.prototype.clear=function(_8a2){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a2&&this.defaultSelection!=null){
var _8a3=this.addSelection(this.defaultSelection);
this.select(_8a3,true);
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
SelectorBinding.prototype.setDisabled=function(_8a4){
if(this.isAttached==true){
var _8a5=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_8a4?"none":"block";
_8a5.setDisabled(_8a4);
}
if(_8a4){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a6){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a6);
}
};
SelectorBinding.prototype.handleAction=function(_8a7){
SelectorBinding.superclass.handleAction.call(this,_8a7);
switch(_8a7.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8a7.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8a7.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8a7.target);
_8a7.consume();
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
_8a7.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8a9){
this.select(_8a9);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8aa=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8ab=this._popupBinding.bindingElement;
_8ab.style.minWidth=_8aa;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ad=Client.isExplorer?e.keyCode:e.which;
if(_8ad==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ad=Client.isExplorer?e.keyCode:e.which;
if(_8ad>=32){
this._buttonBinding.check();
var _8ae=String.fromCharCode(_8ad);
this._pushSearchSelection(_8ae);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8af){
this._searchString+=_8af.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8b0){
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
var _8b1=this._menuBodyBinding;
if(_8b1!=null){
var _8b2=this.MENUITEM_IMPLEMENTATION;
var _8b3=_8b1.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b5=list.getNext();
if(_8b5.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b5);
}
}
}
this._attachSelections();
var _8b6=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8b7=_8b1.getDescendantBindingsByType(_8b2);
if(_8b7.hasEntries()){
while(_8b7.hasNext()){
var _8b8=_8b7.getNext();
var _8b9=_8b8.labelBinding;
if(_8b9!=null&&_8b9.shadowTree!=null&&_8b9.shadowTree.labelText!=null){
_8b9.shadowTree.labelText.innerHTML=_8b9.shadowTree.labelText.innerHTML.replace(_8b6,"<b>$&</b>");
}
}
_8b7.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8b9=LabelBinding.newInstance(_8b3);
_8b9.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b1.add(_8b9);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b5=list.getNext();
var item=this.addSelection(_8b5);
if(this._selectionValue==_8b5.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8bb,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8bb,arg);
switch(_8bb){
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
SelectorBinding.prototype.select=function(_8be,_8bf){
var _8c0=false;
if(_8be!=this._selectedItemBinding){
this._selectedItemBinding=_8be;
_8c0=true;
var _8c1=this._buttonBinding;
this._selectionValue=_8be.selectionValue;
this._selectionLabel=_8be.getLabel();
_8c1.setLabel(_8be.getLabel());
if(_8be.imageProfile!=null){
_8c1.imageProfile=_8be.imageProfile;
}
if(_8c1.imageProfile!=null){
_8c1.setImage(this.isDisabled==true?_8c1.imageProfile.getDisabledImage():_8c1.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8bf){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8bf)){
this.validate();
}
}
return _8c0;
};
SelectorBinding.prototype._relate=function(){
var _8c2=this.getProperty("relate");
if(_8c2){
var _8c3=this.bindingDocument.getElementById(_8c2);
if(_8c3){
var _8c4=UserInterface.getBinding(_8c3);
if(_8c4){
if(this.isChecked){
_8c4.show();
}else{
_8c4.hide();
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
SelectorBinding.prototype.selectByValue=function(_8c5,_8c6){
var _8c7=false;
var _8c8=this._menuBodyBinding;
var _8c9=_8c8.getDescendantElementsByLocalName("menuitem");
while(_8c9.hasNext()){
var _8ca=UserInterface.getBinding(_8c9.getNext());
if(_8ca.selectionValue==_8c5){
_8c7=this.select(_8ca,_8c6);
break;
}
}
return _8c7;
};
SelectorBinding.prototype.getValue=function(){
var _8cb=this._selectionValue;
if(_8cb!=null){
_8cb=String(_8cb);
}
return _8cb;
};
SelectorBinding.prototype.setValue=function(_8cc){
this.selectByValue(String(_8cc),true);
};
SelectorBinding.prototype.getResult=function(){
var _8cd=this._selectionValue;
if(_8cd=="null"){
_8cd=null;
}
if(_8cd){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8cd=Number(_8cd);
break;
}
}
return _8cd;
};
SelectorBinding.prototype.setResult=function(_8ce){
this.selectByValue(_8ce,true);
};
SelectorBinding.prototype.validate=function(){
var _8cf=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8d0=this.getValue();
if(_8d0==this.defaultSelection.value){
_8cf=false;
}
if(_8cf!=this._isValid){
if(_8cf){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8cf;
}
return _8cf;
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
var _8d1=this._popupBinding;
if(!this._isUpToDate){
_8d1.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d2,_8d3){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d2));
return true;
};
SelectorBinding.newInstance=function(_8d4){
var _8d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d4);
return UserInterface.registerBinding(_8d5,SelectorBinding);
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
var _8d8=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d8){
this.onValueChange=function(){
Binding.evaluate(_8d8,this);
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
SimpleSelectorBinding.prototype.focus=function(_8db){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8db){
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
SimpleSelectorBinding.prototype._hack=function(_8dc){
if(Client.isExplorer){
this._select.style.width=_8dc?"auto":this._cachewidth+"px";
if(_8dc){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8dd=true;
if(this.isRequired){
if(this.getValue()==null){
_8dd=false;
}
}
if(_8dd!=this._isValid){
if(_8dd){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8de=this._select;
var _8df=_8de.options[_8de.selectedIndex];
var text=DOMUtil.getTextContent(_8df);
_8de.blur();
_8de.style.color="#A40000";
_8de.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8df,DataBinding.warnings["required"]);
}
_8de.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8df,text);
}
};
}
this._isValid=_8dd;
}
return _8dd;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e1=null;
var _8e2=this._select;
var _8e3=_8e2.options[_8e2.selectedIndex];
var _8e4=true;
if(Client.isExplorer){
var html=_8e3.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e4=false;
}
}
if(_8e4){
_8e1=_8e3.getAttribute("value");
}
return _8e1;
};
SimpleSelectorBinding.prototype.setValue=function(_8e6){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8e7){
this.setValue(_8e7);
};
SimpleSelectorBinding.newInstance=function(_8e8){
var _8e9=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e8);
return UserInterface.registerBinding(_8e9,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8ea,_8eb,_8ec,_8ed,_8ee){
this._init(_8ea,_8eb,_8ec,_8ed,_8ee);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8ef,_8f0,_8f1,_8f2,_8f3){
if(_8ef!=null){
this.label=String(_8ef);
}
if(_8f0!=null){
this.value=String(_8f0);
}
if(_8f2!=null){
this.imageProfile=_8f2;
}
if(_8f3!=null){
this.tooltip=_8f3;
}
this.isSelected=_8f1?true:false;
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
var _8f4=this.getProperty("image");
if(_8f4){
this.setImage(_8f4);
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
var _8f7=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8f7.popupBindingTargetElement=this.shadowTree.input;
_8f7.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8f7.attach();
var self=this;
_8f7.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8f7;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8fa=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8fa).each(function(_8fb){
if(_8fb.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8fc=_8fb.getAttribute("value");
var _8fd=_8fb.getAttribute("selected");
var _8fe=_8fb.getAttribute("tooltip");
list.add({value:_8fc?_8fc:null,toolTip:_8fe?_8fe:null,isSelected:(_8fd&&_8fd=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _900=this._menuBodyBinding;
var _901=_900.bindingDocument;
while(_900.bindingElement.hasChildNodes()){
var node=_900.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_900.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _903=this.getProperty("emptyentrylabel");
if(_903){
var _904=MenuItemBinding.newInstance(_901);
_904.setLabel(_903);
_904.selectionValue="";
_900.add(_904);
}
while(list.hasNext()){
var _905=list.getNext();
var _904=MenuItemBinding.newInstance(_901);
_904.setLabel(_905.label?_905.label:_905.value);
_904.selectionValue=_905.value;
if(_905.image){
_904.setImage(_905.image);
}
if(_905.toolTip){
_904.setToolTip(_905.toolTip);
}
if(_905.isSelected){
this.select(_904,true);
}
_900.add(_904);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_906){
this.select(_906);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_907,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_907,arg);
switch(_907){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_907,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_909){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_909);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_90a){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_90a);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _90b=this.bindingElement.offsetWidth+"px";
var _90c=this._popupBinding.bindingElement;
_90c.style.minWidth=_90b;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _90d=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _90e=this.getValue();
var _90f=null;
_90d.each(function(item){
if(item.getLabel()==_90e){
_90f=item;
}
});
if(_90f){
_90f.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_912){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_912){
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
DataInputSelectorBinding.prototype.setValue=function(_913){
var _914=this.isReadOnly;
var _915=null;
if(_913!=null&&_913!=""){
var _916=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_916.hasNext()){
var item=_916.getNext();
if(item.selectionValue==_913){
_915=item.getLabel();
break;
}
}
}
if(_915!=null){
this.value=_913;
this.shadowTree.input.value=_915;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_913);
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
var _919="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_919);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_919);
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
var _91b=ToolBarButtonBinding.newInstance(this.bindingDocument);
_91b.setImage("${icon:popup}");
this.addFirst(_91b);
_91b.attach();
var self=this;
_91b.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _91d=self.getProperty("handle");
var _91e=ViewDefinition.clone(_91d,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_91e instanceof DialogViewDefinition){
_91e.handler={handleDialogResponse:function(_91f,_920){
self._isButtonClicked=false;
if(_91f==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _921=_920.getFirst();
self.setValue(_921);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_91e.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_91e);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_91b.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_91b;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _923=this._dialogButtonBinding;
if(_923!=null){
_923.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _925=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_925=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _925;
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
this.buildButtonAndLabel();
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
var _928=ToolBarButtonBinding.newInstance(this.bindingDocument);
_928.setImage("${icon:editor-sourceview}");
_928.bindingElement.style.left="-24px";
_928.bindingElement.style.width="24px";
this.addFirst(_928);
_928.attach();
_928.hide();
var self=this;
_928.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_928;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_929){
UrlInputDialogBinding.superclass.setValue.call(this,_929);
if(this.isAttached){
this.compositeUrl=new Uri(_929);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _92a=TreeService.GetCompositeUrlLabel(_929);
if(_92a!=_929){
this.setLabel(_92a);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_92b){
if(this.shadowTree.labelInput){
if(_92b){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_92b;
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
var _92c=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _92d=this.getProperty("image");
if(_92d!=null){
_92c.setImage(_92d);
}else{
_92c.setImage("${icon:popup}");
}
this.addFirst(_92c);
_92c.attach();
var self=this;
_92c.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_92c;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _92f=this._dialogButtonBinding;
if(_92f!=null){
_92f.oncommand();
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
var _930=this.getProperty("required")==true;
if(_930){
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
var _931=this.getProperty("label");
var _932=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_931!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_931+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_931);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_932!=null){
this._buttonBinding.setToolTip(_932);
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
DataDialogBinding.prototype.handleAction=function(_934){
DataDialogBinding.superclass.handleAction.call(this,_934);
var _935=_934.target;
var self=this;
switch(_934.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_937,_938){
if(_937==Dialog.RESPONSE_ACCEPT){
if(_938 instanceof DataBindingMap){
self._map=_938;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_935==this._buttonBinding){
_934.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_939,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_939,arg);
switch(_939){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _93c=this.getProperty("handle");
var url=this.getURL();
var _93e=null;
if(_93c!=null||def!=null){
if(def!=null){
_93e=def;
}else{
_93e=ViewDefinitions[_93c];
}
if(_93e instanceof DialogViewDefinition){
_93e.handler=this._handler;
if(this._map!=null){
_93e.argument=this._map;
}
StageBinding.presentViewDefinition(_93e);
}
}else{
if(url!=null){
_93e=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_93e!=null){
this._dialogViewHandle=_93e.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_93f){
this.setProperty("label",_93f);
if(this.isAttached){
this._buttonBinding.setLabel(_93f+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_940){
this.setProperty("image",_940);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_940);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_941){
this.setProperty("tooltip",_941);
if(this.isAttached){
this._buttonBinding.setToolTip(_941);
}
};
DataDialogBinding.prototype.setHandle=function(_942){
this.setProperty("handle",_942);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_944){
this._handler=_944;
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
var _945=true;
if(this.isRequired==true){
var _946=this.getValue();
if(_946==null||_946==""){
_945=false;
}
if(_945!=this._isValid){
if(_945){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_945;
}
return _945;
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
DataDialogBinding.newInstance=function(_948){
var _949=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_948);
return UserInterface.registerBinding(_949,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_94b,_94c){
if(_94b==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_94c);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_94d){
_94d=new String(_94d);
this.dirty();
this.setValue(encodeURIComponent(_94d));
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
var _951=this.getValue();
if(_951==null){
_951="";
}
this.shadowTree.dotnetinput.value=_951;
};
PostBackDataDialogBinding.prototype.setValue=function(_952){
this.setProperty("value",_952);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_953){
};
PostBackDataDialogBinding.newInstance=function(_954){
var _955=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_954);
return UserInterface.registerBinding(_955,PostBackDataDialogBinding);
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
var _956=this.getProperty("dialoglabel");
var _957=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _959=this.getProperty("handle");
var _95a=this.getProperty("selectedtoken");
if(_959!=null){
var def=ViewDefinition.clone(_959,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_956!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_956;
}
if(_957!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_957;
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
if(_95a!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_95a;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_95c){
var _95d=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95c);
return UserInterface.registerBinding(_95d,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_95f){
self._datathing.setValue(_95f);
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
var _962=self.getValue();
if(_962==""||_962==null){
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
var _963=this.getProperty("value");
var _964=this.getProperty("selectorlabel");
if(_964==null){
_964=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_963==null));
list.add(new SelectorBindingSelection(_964+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_963!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _963=this.getValue();
if(_963==""||_963==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_966){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_966);
switch(_966.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_966.target==this._datathing){
var _967=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_967){
self._selector.setLabel(_967);
}
},500);
_966.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_969){
this.setProperty("label",_969);
if(this._selector!=null){
this._selector.setLabel(_969);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_96a){
this._datathing.setValue(_96a);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_96c,_96d){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_96c,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_96e){
this._buttonBinding.setLabel(_96e);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_96f){
this._buttonBinding.setToolTip(_96f);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_970){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_970);
switch(_970.type){
case MenuItemBinding.ACTION_COMMAND:
var _971=_970.target;
var _972=this.master;
if(_971.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_971.getLabel());
setTimeout(function(){
_972.action();
},0);
}else{
if(_972.getValue()){
_972.dirty();
}
_972.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_973){
var _974=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_973);
return UserInterface.registerBinding(_974,NullPostBackDataDialogSelectorBinding);
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
var _975=this._dataDialogBinding;
if(_975!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_975.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _976=this.getProperty("editable");
var _977=this.getProperty("selectable");
var _978=this.getProperty("display");
if(_976!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_977){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_978){
this._display=_978;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _979=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_979.selections=this.selections;
this.add(_979);
_979.attach();
this._dataDialogBinding=_979;
this.shadowTree.datadialog=_979;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _97b=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _97c=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_97b=_97c.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_97b=_97c.isSelected!=true;
break;
}
if(_97b){
this.shadowTree.box.appendChild(this._getElementForSelection(_97c));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_97e){
var box=this.shadowTree.box;
var _980=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _981=list.getNext();
if(_97e){
_981.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_980=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_980=_981.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_980=_981.isSelected!=true;
break;
}
}
if(_980){
var _982=this._getElementForSelection(_981);
box.insertBefore(_982,box.firstChild);
CSSUtil.attachClassName(_982,"selected");
this._selectionMap.set(_981.value,_982);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_983){
var _984=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_984.appendChild(this.bindingDocument.createTextNode(_983.label));
_984.setAttribute("label",_983.label);
_984.setAttribute("value",_983.value);
return _984;
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
var _986=DOMEvents.getTarget(e);
var _987=DOMUtil.getLocalName(_986);
if(_987=="div"){
this._handleMouseDown(_986);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_988){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _989=this._getElements();
var _98a=_988.getAttribute("value");
var _98b=this._lastSelectedElement.getAttribute("value");
var _98c=false;
while(_989.hasNext()){
var el=_989.getNext();
switch(el.getAttribute("value")){
case _98a:
case _98b:
_98c=!_98c;
break;
}
if(_98c){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_988);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_988)){
this._unhilite(_988);
}else{
this._hilite(_988);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_988){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_988;
};
MultiSelectorBinding.prototype._hilite=function(_990){
var _991=_990.getAttribute("value");
if(!this._selectionMap.has(_991)){
CSSUtil.attachClassName(_990,"selected");
this._selectionMap.set(_991,_990);
}
};
MultiSelectorBinding.prototype._unhilite=function(_992){
var _993=_992.getAttribute("value");
if(this._selectionMap.has(_993)){
CSSUtil.detachClassName(_992,"selected");
this._selectionMap.del(_993);
}
};
MultiSelectorBinding.prototype._isHilited=function(_994){
return CSSUtil.hasClassName(_994,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_995){
MultiSelectorBinding.superclass.handleAction.call(this,_995);
var _996=_995.target;
switch(_995.type){
case DataDialogBinding.ACTION_COMMAND:
if(_996==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_995.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_996.result);
this.dirty();
_996.result=null;
_995.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _997=null;
if(this.isSelectable){
_997=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_999){
if(self._isHilited(_999)){
_999.parentNode.removeChild(_999);
_997.add(new SelectorBindingSelection(_999.getAttribute("label"),_999.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _997;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _99b=this._getElements();
if(!isUp){
_99b.reverse();
}
var _99c=true;
while(_99c&&_99b.hasNext()){
var _99d=_99b.getNext();
if(this._isHilited(_99d)){
switch(isUp){
case true:
if(_99d.previousSibling){
_99d.parentNode.insertBefore(_99d,_99d.previousSibling);
}else{
_99c=false;
}
break;
case false:
if(_99d.nextSibling){
_99d.parentNode.insertBefore(_99d,_99d.nextSibling.nextSibling);
}else{
_99c=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _99e=new List();
var _99f=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a1){
var _9a2=new SelectorBindingSelection(_9a1.getAttribute("label"),_9a1.getAttribute("value"),_99f);
_9a2.isHighlighted=self._isHilited(_9a1);
_99e.add(_9a2);
});
return _99e;
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
var _9a3=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9a3.hasEntries()){
_9a3.each(function(_9a4){
_9a4.parentNode.removeChild(_9a4);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9a5=this.selections.getNext();
if(_9a5.isSelected){
var _9a6=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9a6.name=this._name;
_9a6.value=_9a5.value;
this.bindingElement.appendChild(_9a6);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9a7){
alert(_9a7);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9a8){
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
var _9a9={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9aa=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9aa.handler=this._handler;
_9aa.argument=_9a9;
StageBinding.presentViewDefinition(_9aa);
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
var _9ab={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9ad={handleDialogResponse:function(_9ae,_9af){
if(_9ae==Dialog.RESPONSE_ACCEPT){
self.result=_9af;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9b0=ViewDefinitions[this._dialogViewHandle];
_9b0.handler=_9ad;
_9b0.argument=_9ab;
StageBinding.presentViewDefinition(_9b0);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b1){
var _9b2=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b1);
return UserInterface.registerBinding(_9b2,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9b3){
var id=_9b3.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9b5=_9b3.bindingDocument.getElementById(id);
if(_9b5!=null){
var _9b6=UserInterface.getBinding(_9b5);
_9b6.setResult(true);
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
var _9b8=this.bindingDocument.getElementById(id);
if(_9b8!=null){
var _9b9=UserInterface.getBinding(_9b8);
if(_9b9&&!_9b9.isAttached){
_9b9.isLazy=true;
}else{
_9b8.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9ba){
this._isLazy=_9ba;
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
var _9bc=this.getProperty("stateprovider");
var _9bd=this.getProperty("handle");
if(_9bc!=null&&_9bd!=null){
url=url.replace("${stateprovider}",_9bc).replace("${handle}",_9bd);
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
EditorDataBinding.prototype._onPageInitialize=function(_9be){
EditorDataBinding.superclass._onPageInitialize.call(this,_9be);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9bf){
EditorDataBinding.superclass.handleAction.call(this,_9bf);
switch(_9bf.type){
case Binding.ACTION_DIRTY:
if(_9bf.target!=this){
if(!this.isDirty){
this.dirty();
}
_9bf.consume();
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
EditorDataBinding.prototype.setValue=function(_9c0){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c1){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9c2){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9c2);
if(this.hasBasic===false){
var _9c3=this.getContentWindow().bindingMap.basicgroup;
if(_9c3){
_9c3.hide();
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
var _9c8=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9c8=fake.getValue()!="";
}
if(!_9c8&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9c8&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9c8;
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
var _9cc=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9cc!=null){
_9cc.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9cd){
_9cd=_9cd!=null?_9cd:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9cd;
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
var _9ce=this.getProperty("label");
if(_9ce){
this.setLabel(_9ce);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9cf){
this.setProperty("label",_9cf);
if(this.shadowTree.labelBinding==null){
var _9d0=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9d0.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9d0.bindingElement,this.bindingElement.firstChild);
_9d0.attach();
this.shadowTree.labelBinding=_9d0;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9cf));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9d2){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9d2.bindingElement);
return _9d2;
};
FieldGroupBinding.prototype.addFirst=function(_9d3){
var _9d4=this.shadowTree[FieldGroupBinding.CENTER];
_9d4.insertBefore(_9d3.bindingElement,_9d4.firstChild);
return _9d3;
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
var _9d5=this.getProperty("relation");
if(_9d5!=null){
this.bindingRelation=_9d5;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9d6,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9d6,arg);
switch(_9d6){
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
FieldBinding.newInstance=function(_9d8){
var _9d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9d8);
return UserInterface.registerBinding(_9d9,FieldBinding);
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
var _9da=this.getDescendantBindingByLocalName("fieldgroup");
if(_9da!=null){
_9da.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9db=true;
var _9dc=this.getDescendantBindingsByLocalName("*");
while(_9dc.hasNext()){
var _9dd=_9dc.getNext();
if(Interfaces.isImplemented(IData,_9dd)){
var _9de=_9dd.validate();
if(_9db&&!_9de){
_9db=false;
}
}
}
return _9db;
};
FieldsBinding.prototype.handleAction=function(_9df){
FieldsBinding.superclass.handleAction.call(this,_9df);
var _9e0=_9df.target;
if(_9e0!=this){
switch(_9df.type){
case Binding.ACTION_INVALID:
var _9e1=DataBinding.getAssociatedLabel(_9e0);
if(_9e1){
this._invalidFieldLabels.set(_9e0.key,_9e1);
}
if(_9e0.error){
if(!_9e0.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9e0.error},_9e0);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9df.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9e0.key)){
this._invalidFieldLabels.del(_9e0.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9df.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e2=null;
if(this._invalidFieldLabels.hasEntries()){
_9e2=this._invalidFieldLabels.toList();
}
return _9e2;
};
FieldsBinding.newInstance=function(_9e3){
var _9e4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e3);
return UserInterface.registerBinding(_9e4,FieldsBinding);
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
var _9e5=this.getProperty("image");
if(_9e5){
this.setImage(_9e5);
}
var _9e6=this.getProperty("tooltip");
if(_9e6){
this.setToolTip(_9e6);
}
var _9e7=this.getProperty("label");
if(_9e7){
this.setLabel(_9e7);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9e9=this.getAncestorBindingByLocalName("field");
if(_9e9){
var _9ea=true;
_9e9.getDescendantBindingsByLocalName("*").each(function(_9eb){
if(Interfaces.isImplemented(IData,_9eb)){
_9eb.focus();
_9ea=false;
}
return _9ea;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9ec){
this.setProperty("label",_9ec);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9ec);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9ed=this.getProperty("label");
if(!_9ed){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9ed=node.data;
}
}
return _9ed;
};
FieldDescBinding.prototype.setImage=function(_9ef){
this.setProperty("image",_9ef);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9f0){
this.setProperty("tooltip",_9f0);
if(this.isAttached){
this.bindingElement.title=_9f0;
}
};
FieldDescBinding.newInstance=function(_9f1){
var _9f2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f1);
return UserInterface.registerBinding(_9f2,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f3){
var _9f4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f3);
return UserInterface.registerBinding(_9f4,FieldDataBinding);
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
var _9f5=this._fieldHelpPopupBinding;
if(_9f5){
_9f5.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9f6=app.bindingMap.fieldhelpopupset;
var doc=_9f6.bindingDocument;
var _9f8=_9f6.add(PopupBinding.newInstance(doc));
var _9f9=_9f8.add(PopupBodyBinding.newInstance(doc));
_9f8.position=PopupBinding.POSITION_RIGHT;
_9f8.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9f9.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9fa=this.getProperty("label");
if(_9fa){
_9f9.bindingElement.innerHTML=Resolver.resolve(_9fa);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9f8;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9fb=this.getAncestorBindingByLocalName("field");
if(_9fb){
_9fb.attachClassName("fieldhelp");
var _9fc=ClickButtonBinding.newInstance(this.bindingDocument);
_9fc.attachClassName("fieldhelp");
_9fc.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9fc);
_9fc.attach();
var self=this;
_9fc.oncommand=function(){
self.attachPopupBinding();
};
_9fc.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9fc;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9fe=this._fieldHelpPopupBinding;
if(_9fe&&!_9fe.isAttached){
_9fe.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_a00){
RadioDataGroupBinding.superclass.handleAction.call(this,_a00);
switch(_a00.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a02,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a02,arg);
switch(_a02){
case BroadcastMessages.KEY_ARROW:
var _a04=null;
var next=null;
var _a06=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a06=this.getChildBindingsByLocalName("radio");
while(!_a04&&_a06.hasNext()){
var _a07=_a06.getNext();
if(_a07.getProperty("ischecked")){
_a04=_a07;
}
}
break;
}
if(_a04){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a06.getFollowing(_a04);
while(next!=null&&next.isDisabled){
next=_a06.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a06.getPreceding(_a04);
while(next!=null&&next.isDisabled){
next=_a06.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a08){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a08){
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
var _a09=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a09.type="hidden";
_a09.name=this._name;
this.bindingElement.appendChild(_a09);
this.shadowTree.input=_a09;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a0a=null;
var _a0b=this.getChildBindingsByLocalName("radio");
while(!_a0a&&_a0b.hasNext()){
var _a0c=_a0b.getNext();
if(_a0c.isChecked){
_a0a=_a0c.getProperty("value");
}
}
return _a0a;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a0d){
};
RadioDataGroupBinding.prototype.setResult=function(_a0e){
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
var _a0f=this.getProperty("relate");
var _a10=this.getProperty("oncommand");
var _a11=this.getProperty("isdisabled");
if(_a0f){
this.bindingRelate=_a0f;
this.relate();
}
if(_a10){
this.oncommand=function(){
Binding.evaluate(_a10,this);
};
}
if(_a11==true){
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
var _a13=this.getCallBackID();
this._buttonBinding.check=function(_a14){
RadioButtonBinding.prototype.check.call(this,_a14);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a15){
RadioButtonBinding.prototype.uncheck.call(this,_a15);
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
RadioDataBinding.prototype.setChecked=function(_a16,_a17){
this._buttonBinding.setChecked(_a16,_a17);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a16);
};
RadioDataBinding.prototype.check=function(_a18){
this.setChecked(true,_a18);
};
RadioDataBinding.prototype.uncheck=function(_a19){
this.setChecked(false,_a19);
};
RadioDataBinding.prototype.setDisabled=function(_a1a){
if(_a1a!=this.isDisabled){
this.isDisabled=_a1a;
this._buttonBinding.setDisabled(_a1a);
if(_a1a){
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
var _a1c=DOMEvents.getTarget(e);
switch(_a1c){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a1d=this.getProperty("label");
if(_a1d){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a1d)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a1e){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a1e;
}
this.setProperty("label",_a1e);
};
RadioDataBinding.prototype.handleElement=function(_a1f){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a20){
var _a21=_a20.getAttribute("ischecked")==="true";
if(this.isChecked!=_a21){
this.setChecked(_a21,true);
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
var _a23=DOMEvents.getTarget(e);
switch(_a23){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a24,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a24,arg);
switch(_a24){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a27){
_a27.consume();
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
var _a29=this.getCallBackID();
this._buttonBinding.check=function(_a2a){
ButtonBinding.prototype.check.call(this,_a2a);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a2a){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a2b){
ButtonBinding.prototype.uncheck.call(this,_a2b);
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
if(_a29!=null){
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
var _a2c=true;
var _a2d=this.bindingElement.parentNode;
if(_a2d){
var _a2e=UserInterface.getBinding(_a2d);
if(_a2e&&_a2e instanceof CheckBoxGroupBinding){
if(_a2e.isRequired){
if(_a2e.isValid){
_a2c=_a2e.validate();
}else{
_a2c=false;
}
}
}
}
return _a2c;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a2f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a2f.type="hidden";
_a2f.name=this._name;
_a2f.style.display="none";
this.bindingElement.appendChild(_a2f);
this.shadowTree.input=_a2f;
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
var _a30=null;
var _a31=this.getProperty("value");
if(this.isChecked){
_a30=_a31?_a31:"on";
}
return _a30;
};
CheckBoxBinding.prototype.setValue=function(_a32){
if(_a32==this.getValue()||_a32=="on"){
this.check(true);
}else{
if(_a32!="on"){
this.setPropety("value",_a32);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a33=false;
if(this.isChecked){
_a33=this._result!=null?this._result:true;
}
return _a33;
};
CheckBoxBinding.prototype.setResult=function(_a34){
if(typeof _a34=="boolean"){
this.setChecked(_a34,true);
}else{
this._result=_a34;
}
};
CheckBoxBinding.newInstance=function(_a35){
var _a36=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a35);
return UserInterface.registerBinding(_a36,CheckBoxBinding);
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
var _a37=true;
if(this.isRequired){
var _a38=this.getDescendantBindingsByLocalName("checkbox");
if(_a38.hasEntries()){
_a37=false;
while(_a38.hasNext()&&!_a37){
if(_a38.getNext().isChecked){
_a37=true;
}
}
}
if(_a37==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a37;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a39){
if(_a39){
if(!this._labelBinding){
var _a3a=LabelBinding.newInstance(this.bindingDocument);
_a3a.attachClassName("invalid");
_a3a.setImage("${icon:error}");
_a3a.setLabel("Selection required");
this._labelBinding=this.addFirst(_a3a);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a3b){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a3b);
switch(_a3b.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a3c){
var _a3d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a3c);
return UserInterface.registerBinding(_a3d,CheckBoxGroupBinding);
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
var _a3e=DialogControlBinding.newInstance(this.bindingDocument);
_a3e.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a3e);
this._controlGroupBinding.attachRecursive();
var _a3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a3f);
var _a40=this.getLabel();
if(_a40!=null){
this.setLabel(_a40);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a41=this._snapTargetBinding;
if(Binding.exists(_a41)==true){
_a41.removeActionListener(Binding.ACTION_BLURRED,this);
_a41.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a42){
if(Interfaces.isImplemented(IData,_a42)){
this._snapTargetBinding=_a42;
var _a43=_a42.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a43&&_a43.isConsumed){
this._environmentBinding=_a43.listener;
}
if(this._environmentBinding){
_a42.addActionListener(Binding.ACTION_BLURRED,this);
_a42.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a42)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a42.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a45=this._snapTargetBinding;
var _a46=this._environmentBinding;
var root=UserInterface.getBinding(_a45.bindingDocument.body);
if(Binding.exists(_a45)&&Binding.exists(_a46)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a45.isAttached&&_a46.isAttached){
var _a48=_a45.boxObject.getUniversalPosition();
var _a49=_a46.boxObject.getUniversalPosition();
_a49.y+=_a46.bindingElement.scrollTop;
_a49.x+=_a46.bindingElement.scrollLeft;
var tDim=_a45.boxObject.getDimension();
var eDim=_a46.boxObject.getDimension();
var _a4c=false;
if(_a48.y+tDim.h<_a49.y){
_a4c=true;
}else{
if(_a48.x+tDim.w<_a49.x){
_a4c=true;
}else{
if(_a48.y>_a49.y+eDim.h){
_a4c=true;
}else{
if(_a48.x>_a49.x+eDim.w){
_a4c=true;
}
}
}
}
if(!_a4c){
this._setComputedPosition(_a48,_a49,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a4d,_a4e,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a53=_a4d;
var _a54=false;
if(_a4d.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a54=true;
}else{
if(_a4d.x+tDim.w>=_a4e.x+eDim.w){
_a54=true;
}
}
if(_a54){
_a53.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a53.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a53.y-=(bDim.h);
_a53.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a53);
};
BalloonBinding.prototype.handleBroadcast=function(_a55,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a55,arg);
switch(_a55){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a57){
var _a58=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a57){
_a58=true;
}
}
return _a58;
};
BalloonBinding.prototype._setPosition=function(_a5a){
var _a5b=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a5b=true;
}
}
if(!_a5b){
this.bindingElement.style.left=_a5a.x+"px";
this.bindingElement.style.top=_a5a.y+"px";
this._point=_a5a;
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
BalloonBinding.prototype.handleAction=function(_a5d){
BalloonBinding.superclass.handleAction.call(this,_a5d);
var _a5e=_a5d.target;
switch(_a5d.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a5d.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a5e==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a5e)){
self.dispose();
}else{
if(_a5e.validate()){
var _a60=true;
if(_a5d.type==Binding.ACTION_BLURRED){
var root=_a5e.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a60=false;
}
}
if(_a60){
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
BalloonBinding.prototype.setLabel=function(_a63){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a64=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a63);
_a64.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a64);
}
this.setProperty("label",_a63);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a66){
var _a67=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a66);
var _a68=UserInterface.registerBinding(_a67,BalloonBinding);
_a68.hide();
return _a68;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a69,_a6a){
if(Interfaces.isImplemented(IData,_a6a)==true){
var _a6b,_a6c=_a6a.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a6c&&_a6c.isConsumed){
switch(_a6c.listener.constructor){
case StageBinding:
_a6b=false;
break;
case StageDialogBinding:
_a6b=true;
break;
}
}
var _a6d=_a6b?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a6e=_a6d.add(BalloonBinding.newInstance(top.app.document));
_a6e.setLabel(_a69.text);
_a6e.snapTo(_a6a);
_a6e.attach();
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
var _a6f=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a72=_a6f.getDataBinding(name);
if(_a72){
ErrorBinding.presentError({text:text},_a72);
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
FocusBinding.focusElement=function(_a73){
var _a74=true;
try{
_a73.focus();
Application.focused(true);
}
catch(exception){
var _a75=UserInterface.getBinding(_a73);
var _a76=SystemLogger.getLogger("FocusBinding.focusElement");
_a76.warn("Could not focus "+(_a75?_a75.toString():String(_a73)));
_a74=false;
}
return _a74;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a77){
var win=_a77.bindingWindow;
var id=_a77.bindingElement.id;
return {getBinding:function(){
var _a7a=null;
try{
if(Binding.exists(_a77)){
_a7a=win.bindingMap[id];
}
}
catch(exception){
}
return _a7a;
}};
};
FocusBinding.navigateNext=function(_a7b){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a7b);
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
var _a7c=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a7c&&_a7c.isConsumed){
if(_a7c.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a7d){
FocusBinding.superclass.handleAction.call(this,_a7d);
var _a7e=_a7d.target;
var _a7f=null;
if(this._isFocusManager){
switch(_a7d.type){
case FocusBinding.ACTION_ATTACHED:
if(_a7e!=this){
this._isUpToDate=false;
}
_a7d.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a7e!=this){
this._isUpToDate=false;
_a7d.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a7f=new FocusCrawler();
_a7f.mode=FocusCrawler.MODE_BLUR;
_a7f.crawl(_a7e.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a7d.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a7e!=this){
_a7f=new FocusCrawler();
_a7f.mode=FocusCrawler.MODE_FOCUS;
_a7f.crawl(_a7e.bindingElement);
}
_a7d.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a7e)){
this.claimFocus();
this._onFocusableFocused(_a7e);
}
_a7d.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a7e)){
this._onFocusableBlurred(_a7e);
}
_a7d.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a80){
var _a81=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a81==null&&list.hasNext()){
var _a83=list.getNext();
if(this._cachedFocus&&_a83==this._cachedFocus.getBinding()){
_a81=_a83;
}
}
if(_a81!=null){
if(_a83.isFocused){
var next=_a80?list.getPreceding(_a81):list.getFollowing(_a81);
if(!next){
next=_a80?list.getLast():list.getFirst();
}
next.focus();
}else{
_a81.focus();
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
var _a85=new FocusCrawler();
var list=new List();
_a85.mode=FocusCrawler.MODE_INDEX;
_a85.crawl(this.bindingElement,list);
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
var _a88=this._cachedFocus.getBinding();
if(_a88&&!_a88.isFocused){
_a88.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a89){
if(_a89!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a89;
_a89.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a89);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a8a){
_a8a.deleteProperty(FocusBinding.MARKER);
if(_a8a==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a8c){
this.bindingElement.style.left=_a8c+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a8d){
this.hiddenTabBindings.add(_a8d);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a8e=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a8e.getLabel());
item.setImage(_a8e.getImage());
item.associatedTabBinding=_a8e;
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
TabsButtonBinding.prototype.handleAction=function(_a91){
TabsButtonBinding.superclass.handleAction.call(this,_a91);
switch(_a91.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a92=this.selectedTabBinding;
if(_a92){
this.containingTabBoxBinding.moveToOrdinalPosition(_a92,0);
this.containingTabBoxBinding.select(_a92);
}
_a91.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a93){
var _a94=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a93);
_a94.setAttribute("type","checkbox");
_a94.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a94.className="tabbutton";
return UserInterface.registerBinding(_a94,TabsButtonBinding);
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
var _a95=TabBoxBinding.currentActiveInstance;
if(_a95!=null&&Binding.exists(_a95)){
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
var _a96=this.getTabElements().getLength();
var _a97=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a96!=_a97){
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
var _a98=this.getTabPanelElements();
while(_a98.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a98.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a99=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a9a=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a9b=_a99>_a9a?"tabsbelow":"tabsontop";
this.attachClassName(_a9b);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a9d=this.getTabPanelElements();
var _a9e=null;
var _a9f=this.getProperty("selectedindex");
if(_a9f!=null){
if(_a9f>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _aa0=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa2=_a9d.getNext();
this.registerTabBoxPair(tab,_aa2);
if(_a9f&&_aa0==_a9f){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a9e=tab;
}
}
_aa0++;
}
if(!_a9e){
_a9e=tabs.getFirst();
_a9e.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa3){
var _aa4=null;
var _aa5=null;
if(this.isEqualSize){
var _aa6=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aa8=this.getTabPanelElements();
_aa8.each(function(_aa9){
max=_aa9.offsetHeight>max?_aa9.offsetHeight:max;
});
_aa5=max+_aa6.top+_aa6.bottom;
if(_aa3&&this._tabPanelsElement.style.height!=null){
_aa4=this._tabPanelsElement.offsetHeight;
}
if(_aa4!=null||_aa5>_aa4){
this._tabPanelsElement.style.height=_aa5+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aaa){
_aaa._invalidCount=0;
_aaa.addActionListener(Binding.ACTION_INVALID,this);
_aaa.addActionListener(Binding.ACTION_VALID,this);
_aaa.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aab){
TabBoxBinding.superclass.handleAction.call(this,_aab);
var _aac=_aab.target;
var _aad=_aab.listener;
switch(_aab.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aac.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aab.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aac.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aad._invalidCount++;
if(_aad._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aad.isSelected){
self._showWarning(_aad,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aad._invalidCount>0){
_aad._invalidCount--;
if(_aad._invalidCount==0){
if(_aad.isSelected){
this._showWarning(_aad,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aad,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aab._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aab._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _ab0=DOMEvents.getTarget(e);
if(_ab0==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab2=this.getTabPanelElements();
tabs.each(function(tab,_ab4){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab5=_ab2.get(_ab4);
this.registerTabBoxPair(tab,_ab5);
}
},this);
var _ab6=this._tabBoxPairs;
for(var key in _ab6){
var tab=_ab6[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_ab0);
switch(_ab0.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aba=_ab0.parentNode;
if(_aba==this._tabsElement||_aba==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_ab0==this._tabsElement||_ab0==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_abc){
var _abd=this.getBindingForArgument(arg);
if(_abd!=null&&!_abd.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_abd.select(_abc);
this.getTabPanelBinding(_abd).select(_abc);
var _abe=this.getProperty("selectedindex");
if(_abe!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_abd.bindingElement,true));
}
this._selectedTabBinding=_abd;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_abd.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _abf=this.getTabPanelBinding(_abd);
this._showBalloon(_abf,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac1){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac1.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac1};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac5){
var _ac6=null;
try{
var key=_ac5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac8=this._tabBoxPairs[key].tabPanel;
_ac6=UserInterface.getBinding(_ac8);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ac6;
};
TabBoxBinding.prototype.getTabBinding=function(_ac9){
var key=_ac9.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _acb=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_acb);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _acc=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_acc);
return _acc;
};
TabBoxBinding.prototype.appendTabByBindings=function(_acd,_ace){
var _acf=_acd.bindingElement;
_acd.setProperty("selected",true);
var _ad0=this.summonTabPanelBinding();
var _ad1=_ad0.bindingElement;
if(_ace){
_ad1.appendChild(_ace instanceof Binding?_ace.bindingElement:_ace);
}
this.registerTabBoxPair(_acf,_ad1);
UserInterface.getBinding(this._tabsElement).add(_acd);
this._tabPanelsElement.appendChild(_ad1);
_acd.attach();
UserInterface.getBinding(_ad1).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _acd;
};
TabBoxBinding.prototype.importTabBinding=function(_ad2){
var that=_ad2.containingTabBoxBinding;
var _ad4=that.getTabPanelBinding(_ad2);
var _ad5=_ad4.getBindingElement();
var _ad6=_ad2.getBindingElement();
that.dismissTabBinding(_ad2);
this._tabsElement.appendChild(_ad6);
this._tabPanelsElement.appendChild(_ad5);
this.registerTabBoxPair(_ad6,_ad5);
_ad2.containingTabBoxBinding=this;
this.select(_ad2);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ad7){
var _ad8=null;
if(_ad7.isSelected){
_ad8=this.getBestTab(_ad7);
this._selectedTabBinding=null;
}
var _ad9=this.getTabPanelBinding(_ad7);
this.unRegisterTabBoxPair(_ad7.bindingElement);
_ad7.dispose();
_ad9.dispose();
if(_ad8!=null){
this.select(_ad8,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ada){
if(_ada.isSelected){
this.selectBestTab(_ada);
}
};
TabBoxBinding.prototype.selectBestTab=function(_adb){
var _adc=this.getBestTab(_adb);
if(_adc){
this.select(_adc);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_add){
var _ade=null;
var _adf=_add.getOrdinalPosition(true);
var _ae0=this.getTabBindings();
var _ae1=_ae0.getLength();
var _ae2=_ae1-1;
if(_ae1==1){
_ade=null;
}else{
if(_adf==_ae2){
_ade=_ae0.get(_adf-1);
}else{
_ade=_ae0.get(_adf+1);
}
}
return _ade;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae3,_ae4){
var _ae5=this.bindingDocument.getElementById(_ae3.bindingElement.id);
var tab=this.getTabElements().get(_ae4);
this._tabsElement.insertBefore(_ae5,tab);
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
var _ae7=this._nodename_tab;
var _ae8=new List(this._tabsElement.childNodes);
var _ae9=new List();
while(_ae8.hasNext()){
var _aea=_ae8.getNext();
if(_aea.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aea)==_ae7){
_ae9.add(_aea);
}
}
return _ae9;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _aeb=this._nodename_tabpanel;
var _aec=new List(this._tabPanelsElement.childNodes);
var _aed=new List();
_aec.each(function(_aee){
if(_aee.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aee)==_aeb){
_aed.add(_aee);
}
});
return _aed;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aef=new List();
var _af0=this.getTabElements();
_af0.each(function(_af1){
_aef.add(UserInterface.getBinding(_af1));
});
return _aef;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af2=new List();
this.getTabPanelElements().each(function(_af3){
_af2.add(UserInterface.getBinding(_af3));
});
return _af2;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af4=null;
if(this._selectedTabBinding){
_af4=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af4;
};
TabBoxBinding.prototype._showWarning=function(_af5,_af6){
var _af7=this.getTabBinding(_af5);
if(_af6){
if(_af7.labelBinding.hasImage){
_af7._backupImage=_af7.getImage();
}
_af7.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_af7._backupImage){
_af7.setImage(_af7._backupImage);
}else{
_af7.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_af8,_af9){
var _afa=this.getTabBinding(_af8);
if((_af9&&!_afa.isSelected)||!_af9){
if(_afa.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_af9){
if(_afa.labelBinding.hasImage){
_afa._backupImage=_afa.getImage();
}
_afa.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_afa._backupImage!=null){
_afa.setImage(_afa._backupImage);
}else{
_afa.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_afb){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _afe=tab.getOrdinalPosition(true);
var next=null;
var _b00=new List();
tabs.each(function(t){
if(t.isVisible){
_b00.add(t);
}
});
if(_b00.getLength()>1){
if(_afe==0&&!_afb){
next=_b00.getLast();
}else{
if(_afe==_b00.getLength()-1&&_afb){
next=_b00.getFirst();
}else{
if(_afb){
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
var _b03=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b03.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b04){
TabsBinding.superclass.handleAction.call(this,_b04);
switch(_b04.type){
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
var _b07=self.bindingElement.offsetWidth;
if(_b07!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b07;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b08){
if(_b08 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b08);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b09=false;
var _b0a,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b0d=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b0e=this.bindingElement.offsetWidth-_b0d.RESERVED_SPACE;
var _b0f=null;
var sum=0,_b11=0;
var _b12=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b12){
tab=tabs.getNext();
_b0a=UserInterface.getBinding(tab);
if(!_b0f){
_b0f=_b0a;
}
sum+=tab.offsetWidth;
if(sum>=_b0e){
_b09=true;
if(_b0a.isSelected){
if(!DOMUtil.isFirstElement(_b0a.bindingElement,true)){
this.isManaging=false;
if(_b0f){
_b0f.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b0a,_b11-1);
_b12=false;
}
}else{
_b0a.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b0a);
}
}else{
_b0a.show();
_b0f=_b0a;
_b11++;
}
}
if(_b12){
if(_b09&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b13=_b0f.getBindingElement();
var _b14=_b13.offsetLeft+_b13.offsetWidth;
var _b15=this.tabsButtonBinding;
setTimeout(function(){
_b15.show(_b14+4);
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
var _b16=TabBinding.superclass.serialize.call(this);
if(_b16){
_b16.label=this.getLabel();
_b16.image=this.getImage();
_b16.tooltip=this.getToolTip();
}
return _b16;
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
var _b17=this.bindingElement.getAttribute("image");
var _b18=this.bindingElement.getAttribute("label");
var _b19=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b18){
this.setLabel(_b18);
}
if(_b17){
this.setImage(_b17);
}
if(_b19){
this.setToolTip(_b19);
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
TabBinding.prototype.setLabel=function(_b1b){
if(_b1b!=null){
this.setProperty("label",_b1b);
if(this.isAttached){
this.labelBinding.setLabel(_b1b);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b1c){
if(_b1c){
this.setProperty("tooltip",_b1c);
if(this.isAttached){
this.labelBinding.setToolTip(_b1c);
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
var _b1e=false;
if(Client.isMozilla==true){
}
if(!_b1e){
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
TabBinding.prototype.select=function(_b1f){
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
TabBinding.newInstance=function(_b20){
var _b21=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b20);
return UserInterface.registerBinding(_b21,TabBinding);
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
var _b22=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b22=true;
this._lastKnownDimension=dim1;
}
return _b22;
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
TabPanelBinding.prototype.select=function(_b25){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b25!=true){
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
TabPanelBinding.prototype.handleAction=function(_b26){
TabPanelBinding.superclass.handleAction.call(this,_b26);
var _b27=_b26.target;
switch(_b26.type){
case BalloonBinding.ACTION_INITIALIZE:
_b26.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b28){
var _b29=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b28);
UserInterface.registerBinding(_b29,TabPanelBinding);
return UserInterface.getBinding(_b29);
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
var _b2a=SplitBoxBinding.superclass.serialize.call(this);
if(_b2a){
_b2a.orient=this.getOrient();
_b2a.layout=this.getLayout();
}
return _b2a;
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
var _b2b=this.getSplitPanelElements();
if(_b2b.hasEntries()){
var _b2c=new List(this.getLayout().split(":"));
if(_b2c.getLength()!=_b2b.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b2b.each(function(_b2d){
_b2d.setAttribute("ratio",_b2c.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b2e=this.getProperty("orient");
if(_b2e){
this._orient=_b2e;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b2f=this.getSplitterBindings();
while(_b2f.hasNext()){
var _b30=_b2f.getNext();
if(_b30&&_b30.getProperty("collapsed")==true){
_b30.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b31){
SplitBoxBinding.superclass.handleAction.call(this,_b31);
switch(_b31.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b31.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b31.target);
_b31.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b31.target);
_b31.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b32){
this._getSplitPanelBindingForSplitter(_b32).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b33){
this._getSplitPanelBindingForSplitter(_b33).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b34){
var _b35=DOMUtil.getOrdinalPosition(_b34.bindingElement,true);
var _b36,_b37=this.getSplitPanelElements();
switch(_b34.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b36=_b37.get(_b35);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b36=_b37.get(_b35+1);
break;
}
return UserInterface.getBinding(_b36);
};
SplitBoxBinding.prototype.invokeLayout=function(_b38){
var _b39=this.isHorizontalOrient();
var _b3a=this.getSplitPanelBindings();
var _b3b=this.getSplitterBindings();
var _b3c=new List();
var _b3d,sum=0;
var _b3f=0;
_b3a.each(function(_b40){
if(_b40.isFixed==true){
if(!_b3a.hasNext()){
_b3f+=_b40.getFix();
}
_b3c.add(0);
sum+=0;
}else{
_b3d=_b40.getRatio();
_b3c.add(_b3d);
sum+=_b3d;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b3c.getLength()!=_b3a.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b41=_b39?this.getInnerWidth():this.getInnerHeight();
_b41-=_b3f;
_b3b.each(function(_b42){
if(_b42.isVisible){
_b41-=SplitterBinding.DIMENSION;
}
});
var unit=_b41/sum;
var _b44=0;
var self=this;
_b3a.each(function(_b46){
var span=0;
var _b48=_b3c.getNext();
if(_b46.isFixed){
span=_b46.getFix();
}else{
span=Math.floor(unit*_b48);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b44+=span;
while(_b44>_b41){
_b44--;
span--;
}
if(!_b46.isFixed){
if(_b39){
_b46.setWidth(span);
}else{
_b46.setHeight(span);
}
}
});
}
if(_b38!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b49=this.getLayout();
if(_b49){
this.setProperty("layout",_b49);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b4a=this.isHorizontalOrient();
var _b4b=this.getSplitPanelBindings();
var _b4c=this.getSplitterBindings();
var _b4d=null;
var _b4e=null;
var unit=null;
var _b50=null;
var span=null;
_b4b.each(function(_b52){
if(!unit){
unit=_b4a?_b52.getWidth():_b52.getHeight();
}
span=_b4a?_b52.getWidth():_b52.getHeight();
if(_b50){
span-=_b50;
_b50=null;
}
_b4d=_b4c.getNext();
if(_b4d&&_b4d.offset){
_b50=_b4d.offset;
span+=_b50;
}
_b52.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b53){
this.logger.debug(_b53);
this.setProperty("layout",_b53);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b54="",_b55=this.getSplitPanelBindings();
_b55.each(function(_b56){
_b54+=_b56.getRatio().toString();
_b54+=_b55.hasNext()?":":"";
});
this.setProperty("layout",_b54);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b57=this.getSplitPanelElements();
_b57.each(function(_b58){
layout+="1"+(_b57.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b59){
this.bindingElement.style.width=_b59+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b5a){
this.bindingElement.style.height=_b5a+"px";
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
TreeBodyBinding.prototype.handleAction=function(_c53){
TreeBodyBinding.superclass.handleAction.call(this,_c53);
switch(_c53.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c53.target);
_c53.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c54){
var _c55=_c54.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c55.offsetTop;
var h=_c55.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c55.scrollIntoView(true);
}else{
if(y-t+h>a){
_c55.scrollIntoView(false);
}
}
try{
top.document.documentElement.scrollTop=0;
top.document.body.scrollTop=0;
top.app.document.documentElement.scrollTop=0;
top.app.document.body.scrollTop=0;
}
catch(exception){
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_c5b){
var _c5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c5b);
return UserInterface.registerBinding(_c5c,TreeBodyBinding);
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
var _c5d=TreeNodeBinding.superclass.serialize.call(this);
if(_c5d){
_c5d.label=this.getLabel();
_c5d.image=this.getImage();
var _c5e=this.getHandle();
if(_c5e&&_c5e!=this.key){
_c5d.handle=_c5e;
}
if(this.isOpen){
_c5d.open=true;
}
if(this.isDisabled){
_c5d.disabled=true;
}
if(this.dragType){
_c5d.dragtype=this.dragType;
}
if(this.dragAccept){
_c5d.dragaccept=this.dragAccept;
}
}
return _c5d;
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
var _c60=UserInterface.getBinding(node);
if(_c60&&_c60.containingTreeBinding){
this.containingTreeBinding=_c60.containingTreeBinding;
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
var _c61=this.key;
var _c62=this.getProperty("handle");
if(_c62){
_c61=_c62;
}
return _c61;
};
TreeNodeBinding.prototype.setHandle=function(_c63){
this.setProperty("handle",_c63);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c65=this.getProperty("label");
var _c66=this.getProperty("tooltip");
var _c67=this.getProperty("oncommand");
var _c68=this.getProperty("onbindingfocus");
var _c69=this.getProperty("onbindingblur");
var _c6a=this.getProperty("focused");
var _c6b=this.getProperty("callbackid");
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
if(_c65!=null){
this.setLabel(_c65);
}
if(_c66!=null){
this.setToolTip(_c66);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c6d=this.bindingWindow.WindowManager;
if(_c67!=null){
this.oncommand=function(){
Binding.evaluate(_c67,this);
};
}
if(_c68!=null){
this.onfocus=function(){
Binding.evaluate(_c68,this);
};
}
if(_c69!=null){
this.onblur=function(){
Binding.evaluate(_c69,this);
};
}
if(_c6a==true){
this.focus();
}
if(_c6b!=null){
Binding.dotnetify(this,_c6b);
}
};
TreeNodeBinding.prototype.handleAction=function(_c6e){
TreeNodeBinding.superclass.handleAction.call(this,_c6e);
switch(_c6e.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c6e.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c6f,_c70){
var _c71=true;
if(_c6f instanceof TreeNodeBinding){
var _c72=false;
var _c73=this.bindingElement;
var _c74=this.containingTreeBinding.bindingElement;
while(!_c72&&_c73!=_c74){
if(_c73==_c6f.getBindingElement()){
_c72=true;
}else{
_c73=_c73.parentNode;
}
}
if(_c72){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c71=false;
}else{
this.acceptTreeNodeBinding(_c6f,_c70);
}
}else{
_c71=false;
}
return _c71;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c75,_c76){
var _c77=_c75.serializeToString();
var _c78=new BindingParser(this.bindingDocument);
var _c79=_c78.parseFromString(_c77).getFirst();
_c76=_c76?_c76:this.containingTreeBinding.getDropIndex();
var _c7a=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c79,_c7a.get(_c76));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c75.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c7b=this.getProperty("image");
var _c7c=this.getProperty("image-active");
var _c7d=this.getProperty("image-disabled");
_c7c=_c7c?_c7c:this.isContainer?_c7b?_c7b:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c7b?_c7b:TreeNodeBinding.DEFAULT_ITEM;
_c7d=_c7d?_c7d:this.isContainer?_c7b?_c7b:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c7b?_c7b:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c7b=_c7b?_c7b:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c7b,imageHover:null,imageActive:_c7c,imageDisabled:_c7d});
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
TreeNodeBinding.prototype.setLabel=function(_c7f){
this.setProperty("label",String(_c7f));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7f));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c80){
this.setProperty("tooltip",String(_c80));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c80));
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
var _c81=this.imageProfile.getDefaultImage();
var _c82=this.imageProfile.getActiveImage();
_c82=_c82?_c82:_c81;
return this.isOpen?_c82:_c81;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c84=DOMEvents.getTarget(e);
var _c85=this.labelBinding.bindingElement;
var _c86=this.labelBinding.shadowTree.labelBody;
var _c87=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c84){
case _c85:
this._onAction(e);
break;
case _c86:
case _c87:
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
if(_c84.parentNode==this.bindingElement&&_c84.__updateType==Update.TYPE_INSERT){
var _c85=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c84)=="treenode"){
if(_c84==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c84,_c85.nextSibling);
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
switch(_c84){
case _c85:
case _c86:
case _c87:
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
var _c8b=true;
if(e.type=="mousedown"){
var _c8c=e.button==(e.target?0:1);
if(!_c8c){
_c8b=false;
}
}
if(_c8b){
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
var _c8e=false;
if(e!=null){
_c8e=e.shiftKey;
}
this.dispatchAction(_c8e?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c91=this.getDescendantBindingsByLocalName("treenode");
_c91.each(function(_c92){
_c92.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c93){
var _c94=_c93.getAttribute("focused");
if(_c94=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c95){
var _c96=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c95);
return UserInterface.registerBinding(_c96,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c97){
var _c98=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c97);
return UserInterface.registerBinding(_c98,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c99){
this.bindingElement.style.left=_c99.x+"px";
this.bindingElement.style.top=_c99.y+"px";
this._geometry.x=_c99.x;
this._geometry.y=_c99.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c9a){
var _c9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c9a);
return UserInterface.registerBinding(_c9b,TreePositionIndicatorBinding);
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
this.addFilter(function(_c9d){
var _c9e=UserInterface.getBinding(_c9d);
var _c9f=null;
var _c9f=null;
if(!_c9e instanceof TreeNodeBinding){
_c9f=NodeCrawler.SKIP_NODE;
}
return _c9f;
});
this.addFilter(function(_ca0,list){
var _ca2=UserInterface.getBinding(_ca0);
var _ca3=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca2.isOpen){
list.add(_ca2);
}
break;
}
return _ca3;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca4){
this.binding=_ca4;
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
DockTabsButtonBinding.newInstance=function(_ca5){
var _ca6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca5);
_ca6.setAttribute("type","checkbox");
_ca6.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca6.className="tabbutton";
return UserInterface.registerBinding(_ca6,DockTabsButtonBinding);
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
var _ca7=DockBinding.superclass.serialize.call(this);
if(_ca7){
_ca7.active=this.isActive?true:null;
_ca7.collapsed=this.isCollapsed?true:null;
}
return _ca7;
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
var _ca8=UserInterface.getBinding(this.bindingElement.parentNode);
var _ca9=MatrixBinding.newInstance(this.bindingDocument);
_ca9.attachClassName("dockliner");
this.shadowTree.dockLiner=_ca9;
_ca8.add(_ca9);
_ca9.attach();
_ca9.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_cab){
var _cac=this.getSelectedTabPanelBinding();
if(_cac){
_cac.isVisible=_cab;
_cac.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cad){
var _cae=this._getBindingForDefinition(_cad);
var _caf=DockTabBinding.newInstance(this.bindingDocument);
_caf.setHandle(_cad.handle);
_caf.setLabel(_cad.flowHandle?null:_cad.label);
_caf.setImage(_cad.image);
_caf.setToolTip(_cad.toolTip);
_caf.setEntityToken(_cad.entityToken);
_caf.setAssociatedView(_cae);
this.appendTabByBindings(_caf,null);
this._setupPageBindingListeners(_caf);
var _cb0=this.getTabPanelBinding(_caf);
_cae.snapToBinding(_cb0);
var _cb1=this.bindingWindow.bindingMap.views;
_cb1.add(_cae);
if(!this.isActive){
this.activate();
}
_cae.attach();
};
DockBinding.prototype.prepareOpenView=function(_cb2,_cb3){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cb3.setLabel(_cb2.label);
_cb3.setImage(_cb2.image);
_cb3.setToolTip(_cb2.toolTip);
this._setupPageBindingListeners(_cb3);
var _cb4=this.getTabPanelBinding(_cb3);
var _cb5=this._getBindingForDefinition(_cb2);
_cb3.setAssociatedView(_cb5);
_cb5.snapToBinding(_cb4);
UserInterface.getBinding(this.bindingDocument.body).add(_cb5);
_cb5.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb6){
var _cb7=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb7.bindingDocument);
view.setDefinition(_cb6);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb9){
var _cba=this.getTabPanelBinding(_cb9);
var self=this;
var _cbc={handleAction:function(_cbd){
var _cbe=_cbd.target;
switch(_cbd.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cbe.reflex(true);
var view=_cb9.getAssociatedView();
if(_cbe.bindingWindow==view.getContentWindow()){
_cb9.updateDisplay(_cbe);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb9.onPageInitialize(_cbe);
_cbd.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb9.getAssociatedView();
if(_cbe.bindingWindow==view.getContentWindow()){
_cb9.updateDisplay(_cbe);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb9.updateDisplay(_cbe);
_cbd.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb9.updateEntityToken(_cbe);
_cbd.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb9.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb9.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb9);
_cbd.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb9,true);
_cbd.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb9);
break;
case Binding.ACTION_FORCE_REFLEX:
_cba.reflex(true);
_cbd.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb9.isDirty){
_cb9.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cc0){
_cba.addActionListener(_cc0,_cbc);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc1){
DockBinding.superclass.handleAction.call(this,_cc1);
var _cc2=_cc1.target;
switch(_cc1.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc1.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cc2 instanceof DockBinding){
if(_cc2.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cc2);
if(this.isActive){
_cc2.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cc2);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cc3,arg){
DockBinding.superclass.handleBroadcast.call(this,_cc3,arg);
switch(_cc3){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cc5=arg;
if(_cc5.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cc5.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc6){
var tabs=this.getTabBindings();
var _cc8=false;
while(tabs.hasNext()&&!_cc8){
var tab=tabs.getNext();
var _cca=tab.getEntityToken();
if(_cca!=null&&_cca==_cc6){
if(!tab.isSelected){
this.select(tab,true);
_cc8=true;
}
}
}
};
DockBinding.prototype.collapse=function(_ccb){
this._handleCollapse(true,_ccb);
};
DockBinding.prototype.unCollapse=function(_ccc){
this._handleCollapse(false,_ccc);
};
DockBinding.prototype._handleCollapse=function(_ccd,_cce){
var _ccf=this.getChildBindingByLocalName("dockpanels");
var _cd0=this.getAncestorBindingByLocalName("splitbox");
if(_ccd){
_ccf.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cce&&_cd0.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_ccf.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cce){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_ccd);
this.isCollapsed=_ccd;
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
DockBinding.prototype.closeTab=function(_cd5,_cd6){
if(_cd5.isDirty&&!_cd6){
var _cd7=Resolver.resolve(_cd5.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd7),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd9){
switch(_cd9){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cd5);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cd5);
break;
}
}});
}else{
this.removeTab(_cd5);
}
};
DockBinding.prototype.closeTabsExcept=function(_cda){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cda){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cdd){
var _cde=_cdd.getAssociatedView();
_cde.saveContainedEditor();
var self=this;
var _ce0={handleBroadcast:function(_ce1,arg){
switch(_ce1){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cde.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ce0);
if(arg.isSuccess){
self.removeTab(_cdd);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ce0);
};
DockBinding.prototype.appendTabByBindings=function(_ce3,_ce4){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ce3,_ce4);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ce5){
_ce5=_ce5?_ce5+"px":"100%";
this.bindingElement.style.width=_ce5;
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
DockBinding.prototype.showControls=function(_ce6){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_ce6){
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
var _ce9=DockControlBinding.newInstance(this.bindingDocument);
_ce9.setControlType(type);
return _ce9;
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
this._controlGroupBinding=this.labelBinding.add(ControlGroupBinding.newInstance(this.bindingDocument));
var _cf5=DialogControlBinding.newInstance(this.bindingDocument);
_cf5.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cf5);
this._controlGroupBinding.attachRecursive();
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
this.containingTabBoxBinding.closeTab(this);
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
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d4b){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d4c,_d4d){
if(!form.__isSetup){
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
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d7f){
if(_d7f!=this.isAutoHeightLayoutMode){
if(_d7f){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d7f;
}
};
DialogPageBinding.prototype.handleAction=function(_d80){
DialogPageBinding.superclass.handleAction.call(this,_d80);
var _d81=_d80.target;
switch(_d80.type){
case PageBinding.ACTION_ATTACHED:
if(_d81!=this&&_d81.isFitAsDialogSubPage){
_d81.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d80.consume();
if(_d81.response!=null){
this.response=_d81.response;
switch(_d81.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d82){
var _d83=this.bindingWindow.bindingMap.buttonAccept;
if(_d83!=null){
_d83.setDisabled(_d82);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d84){
var _d85=CSSComputer.getPadding(this.bindingElement);
var _d86=CSSComputer.getBorder(this.bindingElement);
_d84+=_d85.top+_d85.bottom;
_d84+=_d86.top+_d86.bottom;
if(_d84>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d84+"px";
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
EditorPageBinding.prototype.handleAction=function(_d8e){
EditorPageBinding.superclass.handleAction.call(this,_d8e);
var _d8f=_d8e.target;
switch(_d8e.type){
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
var _d90=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d8f.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d90==-1){
_d90=0;
}
}else{
_d90++;
}
return res;
});
if(_d90>-1){
this._messengers.del(_d90);
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
_d8e.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d8f.key,_d8f);
if(_d8f instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d8f.key);
if(_d8f instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d8f==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d8f.getSelectedTabBinding();
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
_d8e.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d8f==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d8e.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d8f==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d8e.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d8f==this._windowBinding){
if(_d8f.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d95=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d95);
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
var _d96=this.bindingWindow.bindingMap.savebutton;
if(_d96!=null&&!_d96.isDisabled){
_d96.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d97=this.bindingWindow.bindingMap.__REQUEST;
if(_d97!=null){
_d97.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d98=this.bindingWindow.bindingMap.__REQUEST;
if(_d98!=null){
_d98.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d99){
this._message=null;
switch(_d99){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d99,this._messengers);
if(!this._messengers.hasEntries()){
if(_d99==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d99;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d99;
EditorPageBinding.superclass.postMessage.call(this,_d99,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d99,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d9a,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d9a,arg);
switch(_d9a){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d9c=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d9c);
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
var _d9d=new List();
this._invalidBindings.each(function(key,_d9f){
var list=_d9f.getInvalidLabels();
if(list){
list.each(function(_da1){
_d9d.add(_da1);
});
}
});
if(_d9d.hasEntries()){
var _da2="";
while(_d9d.hasNext()){
_da2+=_d9d.getNext().toLowerCase();
if(_d9d.hasNext()){
_da2+=", ";
}else{
_da2+=".";
}
}
var _da3=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da3+" "+_da2);
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
EditorPageBinding.prototype.enableSave=function(_da4){
var _da5=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da5){
var _da6=UserInterface.getBinding(_da5);
if(_da4){
_da6.enable();
}else{
_da6.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _da7=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_da7!=null){
UserInterface.getBinding(_da7).enable();
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
var _da8=this._windowBinding.getContentDocument().title;
if(_da8==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da9=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_dab){
if(_dab.name=="__EVENTTARGET"&&_da9){
_dab.value=_da9;
}
list.add({name:_dab.name,value:_dab.value});
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
var _dad=this.getProperty("responseid");
this.responseid=_dad;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dae){
ResponsePageBinding.superclass.handleAction.call(this,_dae);
switch(_dae.type){
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
WizardPageBinding.prototype.handleAction=function(_daf){
WizardPageBinding.superclass.handleAction.call(this,_daf);
var _db0=_daf.target;
switch(_daf.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_db0);
}else{
_daf.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_db0);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_daf.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_daf.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db1){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db3=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db1);
}
if(_db3){
_db3.setDisabled(!_db1);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db4,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db4,arg);
var self=this;
switch(_db4){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db8){
};
MarkupAwarePageBinding.prototype._activate=function(_db9){
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
var _dba=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dba.boxObject.getDimension().w;
_dba.hide();
var _dbb=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dbb+"px";
var self=this;
var _dbd=this.bindingWindow.bindingMap.moreactionsbutton;
_dbd.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dbe){
self._showMoreActions();
_dbe.consume();
}});
var _dbf=this.bindingWindow.bindingMap.moreactionspopup;
_dbf.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dc0){
var item=_dc0.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dc2,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dc2,arg);
switch(_dc2){
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
var _dc6=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc6!=null){
_dc6.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dc7=this.bindingWindow.WindowManager;
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
var _dc8=new String("");
this._actionProfile.each(function(_dc9,list){
list.each(function(_dcb){
_dc8+=_dcb.getHandle()+";"+_dcb.getKey()+";";
if(_dcb.isDisabled()){
_dc8+="isDisabled='true';";
}
});
});
return _dc8;
};
SystemToolBarBinding.prototype.handleAction=function(_dcc){
SystemToolBarBinding.superclass.handleAction.call(this,_dcc);
switch(_dcc.type){
case ButtonBinding.ACTION_COMMAND:
var _dcd=_dcc.target;
this._handleSystemAction(_dcd.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dce){
if(_dce!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dd0=list.getFirst();
var _dd1=_dd0.node;
}
SystemAction.invoke(_dce,_dd1);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd4,list){
var _dd6=new List();
list.reset();
while(list.hasNext()){
var _dd7=list.getNext();
var _dd8=null;
if(_dd7.isInToolBar()){
if(_dd7.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd8=self.getToolBarButtonBinding(_dd7);
}
}
if(_dd8!=null){
_dd6.add(_dd8);
}
}
if(_dd6.hasEntries()){
var _dd9=ToolBarGroupBinding.newInstance(doc);
_dd6.each(function(_dda){
_dd9.add(_dda);
});
self.addLeft(_dd9);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _ddb=this.bindingWindow.bindingMap.toolsbutton;
var _ddc=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _ddd=_ddb.bindingElement.offsetLeft-this._moreActionsWidth;
var _dde=0;
var _ddf=new List();
var _de0,_de1=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_de0=_de1.getNext())!=null){
if(!_de0.isVisible){
_de0.show();
}
_dde+=_de0.boxObject.getDimension().w;
if(_dde>=_ddd){
_ddf.add(_de0);
_de0.hide();
}
}
if(_ddf.hasEntries()){
var _de2=_ddf.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_de2).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_de0=_ddf.getNext())!=null){
this._moreActions.add(_de0.associatedSystemAction);
}
_ddc.show();
}else{
this._moreActions=null;
_ddc.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _de3=this.bindingWindow.bindingMap.moreactionspopup;
_de3.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_de3.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_de3.add(item);
}
_de3.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_de5){
var _de6=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _de7=_de5.getLabel();
var _de8=_de5.getToolTip();
var _de9=_de5.getImage();
var _dea=_de5.isDisabled();
if(_de9&&_de9.indexOf("size=")==-1){
_de9=_de9+"&size="+this.getImageSize();
_de6.imageProfile=new ImageProfile({image:_de9});
}
if(_de7){
_de6.setLabel(_de7);
}
if(_de8){
_de6.setToolTip(_de8);
}
if(_de5.isDisabled()){
_de6.disable();
}
_de6.associatedSystemAction=_de5;
return _de6;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _deb=this.getDescendantBindingByLocalName("toolbarbutton");
if(_deb!=null){
_deb.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dec){
var _ded=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dec);
return UserInterface.registerBinding(_ded,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dee){
var _def=SystemTreeBinding.superclass.add.call(this,_dee);
if(!this._defaultTreeNode){
if(_dee instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dee;
}
}
return _def;
};
SystemTreeBinding.prototype.handleAction=function(_df0){
SystemTreeBinding.superclass.handleAction.call(this,_df0);
var _df1=_df0.target;
switch(_df0.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df1.key);
this._updateFocusedNode();
_df0.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_df0.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df1.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_df0.consume();
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
var _df3=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df3);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df4){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df4);
var reg=this._entityTokenRegistry;
var _df6=_df4.node.getEntityToken();
if(reg.has(_df6)){
reg.get(_df6).add(_df4);
}else{
reg.set(_df6,new List([_df4]));
}
var _df7=null;
if(this.isLockedToEditor){
if(_df6==StageBinding.entityToken){
if(_df4.node.isTreeLockEnabled()){
_df7=_df4;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df4.node.getHandle()){
_df7=_df4;
}
}
}
if(_df7!=null){
this.focusSingleTreeNodeBinding(_df7);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df8){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df8);
var reg=this._entityTokenRegistry;
var _dfa=_df8.node.getEntityToken();
if(reg.has(_dfa)){
var list=reg.get(_dfa);
list.del(_df8);
if(!list.hasEntries()){
reg.del(_dfa);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df8.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df8.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dfe=this._refreshingTreeNodes;
if(_dfe.hasEntries()&&_dfe.has(key)){
_dfe.del(key);
if(!_dfe.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _dff=StageBinding.entityToken;
if(_dff!=null){
this._focusTreeNodeByEntityToken(_dff);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _e00=false;
var _e01=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_e00=false;
}else{
if(_e01.hasEntries()){
_e00=true;
while(_e00&&_e01.hasNext()){
var _e02=_e01.getNext();
if(!_e02.isDraggable){
_e00=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_e00;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e03,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e03,arg);
switch(_e03){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e03,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e03);
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
var self=this,_e07=arg;
setTimeout(function(){
if(_e07!=null){
self._focusTreeNodeByEntityToken(_e07);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e09=tab.perspectiveNode==null;
if(!_e09){
_e09=tab.perspectiveNode==this.perspectiveNode;
}
if(_e09){
var self=this,_e0b=tab.getEntityToken();
setTimeout(function(){
if(_e0b!=null){
self._focusTreeNodeByEntityToken(_e0b);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e0c,_e0d){
this.isLockFeatureFocus=true;
var _e0e=null;
if(this._entityTokenRegistry.has(_e0c)){
var list=this._entityTokenRegistry.get(_e0c);
list.each(function(tn){
var _e11=true;
if(tn.node.isTreeLockEnabled()){
_e0e=tn;
_e11=false;
}
return _e11;
});
if(_e0e!=null){
if(!_e0e.isFocused){
this.focusSingleTreeNodeBinding(_e0e,true);
}else{
_e0e.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e0e==null&&_e0d!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e0c);
self._focusTreeNodeByEntityToken(_e0c,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e13){
var _e14=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e15=this.getRootTreeNodeBindings();
while(_e15.hasNext()){
var _e16=_e15.getNext();
_e14.add(_e16.node.getEntityToken());
}
}else{
_e14.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e14.hasNext()){
var _e17=_e14.getNext();
var _e18=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e17,_e13,_e18);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e1b=this._treeNodeBindings;
var _e1c=new Map();
function fix(_e1d,list){
if(!_e1d.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e1b.has(node.getHandle())){
var _e20=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e1c.set(node.getHandle(),_e20);
_e1d.add(_e20);
}
});
_e1d.attachRecursive();
}
}
_e1d.open(true);
}
map.each(function(_e21,list){
if(_e1b.has(_e21)){
var _e23=_e1b.get(_e21);
fix(_e23,list);
}else{
if(_e1c.has(_e21)){
var _e24=_e1c.get(_e21);
fix(_e24,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e25,arg){
switch(_e25){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e27=arg;
if(_e27!=null){
this._invokeServerRefresh(_e27);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e28=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e28;
_e28.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e28=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e28;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e29){
if(_e29!=null&&_e29=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e29)){
var list=this._entityTokenRegistry.get(_e29).reset();
this._refreshToken=_e29;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e2b=list.getNext();
this._refreshingTreeNodes.set(_e2b.key,true);
setTimeout(function(){
_e2b.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e2c=this.getFocusedTreeNodeBindings().getFirst();
if(_e2c){
var _e2d=_e2c.getLabel();
var _e2e=_e2c.getAncestorBindingByLocalName("treenode");
if(_e2e){
_e2c=_e2e;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e2c.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e2f=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e2f,[_e2d]);
}
_e2c.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e30=SystemTreeBinding.clipboard;
if(_e30){
var type=_e30.dragType;
var _e32=this.getFocusedTreeNodeBindings().getFirst();
if(_e32.dragAccept){
if(_e32.acceptor.isAccepting(type)){
this._performPaste(_e32);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e33){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e33.node.hasDetailedDropSupport()){
if(_e33.node.hasChildren()){
var _e35=_e33.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e36,_e37){
if(_e36==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e38=_e37.get("switch");
var _e39=_e37.get("sibling");
if(_e38=="after"){
_e39++;
}
var _e3a=_e33.accept(SystemTreeBinding.clipboard,_e39);
if(_e3a){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e35);
}else{
Application.lock(self);
var _e3b=_e33.accept(SystemTreeBinding.clipboard,0);
if(_e3b){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e3b=_e33.accept(SystemTreeBinding.clipboard,0);
if(_e3b){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e3c=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e3c!=null){
this._focusTreeNodeByEntityToken(_e3c);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e3d){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e3d){
this.blurSelectedTreeNodes();
var _e3e=this.getRootTreeNodeBindings();
_e3e.each(function(_e3f){
if(_e3f.isContainer&&_e3f.isOpen){
_e3f.close();
_e3f.hasBeenOpened=false;
_e3f.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e40){
if(_e40!=this.isLockedToEditor){
this.isLockedToEditor=_e40;
if(_e40){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e42=this.getRootTreeNodeBindings();
_e42.each(function(_e43){
var _e44=_e43.getOpenSystemNodes();
if(_e44!=null&&_e44.hasEntries()){
list.merge(_e44);
}else{
if(_e43.isOpen){
list.add(_e43.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e45){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e45);
if(_e45!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e46){
if(_e46){
var list=new List(_e46.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e48=new Map();
var _e49=this.getFocusedTreeNodeBindings();
var _e4a=_e49.getFirst().node.getActionProfile();
if(_e4a!=null){
var self=this;
_e4a.each(function(_e4c,list){
var _e4e=new List();
list.each(function(_e4f){
if(_e4f.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e4f.getGroupName()]){
_e4e.add(_e4f);
}
}
});
if(_e4e.hasEntries()){
_e48.set(_e4c,_e4e);
}
});
}
_e48.activePosition=this._activePosition;
return _e48;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e50,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e50,arg);
switch(_e50){
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
var _e55=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e55.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e56=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e56.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e57){
SystemTreePopupBinding.superclass.handleAction.call(this,_e57);
switch(_e57.type){
case MenuItemBinding.ACTION_COMMAND:
var _e58=_e57.target;
var _e59=_e58.associatedSystemAction;
if(_e59){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e5b=list.getFirst();
var _e5c=_e5b.node;
}
SystemAction.invoke(_e59,_e5c);
}else{
var cmd=_e58.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e5f=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e5f=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e5f=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e5f=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e5f=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e5f){
setTimeout(function(){
EventBroadcaster.broadcast(_e5f);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e60=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e60.hasNext()){
var _e61=UserInterface.getBinding(_e60.getNext());
if(!_e61.getProperty("rel")){
_e61.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e63=new List();
var self=this;
this._actionProfile.each(function(_e65,list){
var _e67=MenuGroupBinding.newInstance(doc);
list.each(function(_e68){
var _e69=self.getMenuItemBinding(_e68);
_e67.add(_e69);
});
_e63.add(_e67);
});
_e63.reverse();
while(_e63.hasNext()){
this._bodyBinding.addFirst(_e63.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e6a){
var _e6b=MenuItemBinding.newInstance(this.bindingDocument);
var _e6c=_e6a.getLabel();
var _e6d=_e6a.getToolTip();
var _e6e=_e6a.getImage();
var _e6f=_e6a.getDisabledImage();
var _e70=_e6a.isCheckBox();
if(_e6c){
_e6b.setLabel(_e6c);
}
if(_e6d){
_e6b.setToolTip(_e6d);
}
if(_e6e){
_e6b.imageProfile=new ImageProfile({image:_e6e,imageDisabled:_e6f});
}
if(_e70){
_e6b.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e6a.isChecked()){
_e6b.check(true);
}
}
if(_e6a.isDisabled()){
_e6b.disable();
}
_e6b.associatedSystemAction=_e6a;
return _e6b;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e74=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e74=UserInterface.getBinding(node);
if(_e74.isDisabled){
_e74=null;
}
}
break;
}
if(_e74!=null&&_e74.node!=null&&_e74.node.getActionProfile()!=null){
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
var _e75=this.node.getLabel();
if(_e75){
this.setLabel(_e75);
}
var _e76=this.node.getToolTip();
if(_e76){
this.setToolTip(_e76);
}
var _e77=this.node.getHandle();
if(_e77){
this.setHandle(_e77);
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
var _e7a="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e7a+=list.getNext();
if(list.hasNext()){
_e7a+=" ";
}
}
this.setProperty("dragaccept",_e7a);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e7c){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e7c);
switch(_e7c.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e7c.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e7c.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e7d,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e7d,arg);
switch(_e7d){
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
var _e80=null;
var _e81=this.node.getImageProfile();
if(_e81){
if(this.isOpen){
_e80=_e81.getActiveImage();
}else{
_e80=_e81.getDefaultImage();
}
}
if(!_e80){
_e80=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e80;
};
SystemTreeNodeBinding.prototype.open=function(_e82){
var _e83=this.isContainer&&!this.isOpen;
var _e84=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e83&&(_e84||SystemTreeBinding.HAS_NO_MEMORY)&&_e82!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e85=null;
if(this.isContainer){
_e85=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e85);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e87){
if(_e87!=null){
this._refreshBranch(_e87);
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
var _e88=new List();
var _e89=this.node.getChildren();
this.empty();
if(_e89.hasEntries()){
this._insertTreeNodesRegulated(_e89);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e8a){
var _e8b=0;
var _e8c=new List([]);
while(_e8a.hasEntries()&&_e8b<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e8d=SystemTreeNodeBinding.newInstance(_e8a.extractFirst(),this.bindingDocument);
_e8d.autoExpand=this.autoExpand;
this.add(_e8d);
_e8d.attach();
_e8b++;
if(this.autoExpand){
if(_e8b==1&&!_e8a.hasEntries()||LocalStore.openedNodes.has(_e8d.node)){
_e8c.add(_e8d);
}
}
}
if(_e8a.hasEntries()){
this._insertBufferTreeNode(_e8a);
}
_e8c.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e90){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e92=this.node.getDescendantBranch(list);
if(_e92.hasEntries()){
this.XXX(_e92);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e93){
var self=this;
var map=new Map();
this.empty();
_e93.each(function(key,_e97){
if(_e97.hasEntries()){
_e97.each(function(node){
var _e99=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e99);
if(map.has(key)){
var _e9a=map.get(key);
_e9a.add(_e99);
_e9a.isOpen=true;
_e9a.hasBeenOpened=true;
node.searchToken=_e9a.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e99);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e93.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e9b=new TreeCrawler();
var _e9c=new List();
_e9b.mode=TreeCrawler.MODE_GETOPEN;
_e9b.crawl(this.bindingElement,_e9c);
if(_e9c.hasEntries()){
_e9c.extractFirst();
}
_e9b.dispose();
return _e9c;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e9d=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e9d=new List([this.node]);
list.each(function(_e9f){
_e9d.add(_e9f.node);
});
}
return _e9d;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_ea0,_ea1){
var _ea2=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_ea0 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_ea0.node.getData(),this.node.getData(),_ea1?_ea1:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_ea2);
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
SystemTreeNodeBinding.newInstance=function(node,_ea6){
var _ea7=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ea6);
var _ea8=UserInterface.registerBinding(_ea7,SystemTreeNodeBinding);
_ea8.node=node;
return _ea8;
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
SystemPageBinding.prototype.setPageArgument=function(_ea9){
this.node=_ea9;
SystemPageBinding.superclass.setPageArgument.call(this,_ea9);
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
var _eaa=this.node.getChildren();
if(_eaa.hasEntries()){
while(_eaa.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_eaa.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _eac=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_eac.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _eae=new TreeCrawler();
var _eaf=new List();
_eae.mode=TreeCrawler.MODE_GETOPEN;
_eae.crawl(this.bindingElement,_eaf);
_eae.dispose();
var list=new List([this.node]);
_eaf.each(function(_eb1){
list.add(_eb1.node);
});
this._tree.empty();
var _eb2=this.node.getDescendantBranch(list);
if(_eb2.hasEntries()){
var self=this;
var map=new Map();
_eb2.each(function(key,_eb6){
_eb6.each(function(node){
var _eb8=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eb8);
if(map.has(key)){
var _eb9=map.get(key);
_eb9.add(_eb8);
_eb9.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eb8);
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
SystemPageBinding.prototype.handleAction=function(_eba){
SystemPageBinding.superclass.handleAction.call(this,_eba);
switch(_eba.type){
case ButtonBinding.ACTION_COMMAND:
var _ebb=_eba.target;
switch(_ebb.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ebb.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ebc,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ebc,arg);
switch(_ebc){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ebe=arg;
if(this.node&&this.node.getEntityToken()==_ebe){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ebe);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ebe);
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
StageContainerBinding.prototype.handleBroadcast=function(_ec0,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ec0,arg);
var _ec2=this.bindingWindow.WindowManager;
switch(_ec0){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ec2.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ec2.WINDOW_RESIZED_BROADCAST:
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
var _ec4=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ec4.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ec5){
if(StageBinding.isViewOpen(_ec5)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ec5);
}else{
var _ec6=ViewDefinitions[_ec5];
StageBinding.presentViewDefinition(_ec6);
}
};
StageBinding.isViewOpen=function(_ec7){
return StageBinding.bindingInstance._activeViewDefinitions[_ec7]!=null;
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
if(!Application.hasStartPage||!Application.hasExternalConnection){
top.app.bindingMap.defaultstartdeck.select();
this._isShowingDefaultStart=true;
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
this.handlePerspectiveChange(_edd);
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
var _f44=new StageCrawler();
_f44.mode=mode;
_f44.crawl(this.windowBinding.getContentDocument().body);
_f44.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f45){
return this._dockBindings.get(_f45);
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
StageDeckBinding.newInstance=function(_f47){
var _f48=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f47);
var _f49=UserInterface.registerBinding(_f48,StageDeckBinding);
return _f49;
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
StageSplitBoxBinding.prototype.handleAction=function(_f4a){
StageSplitBoxBinding.superclass.handleAction.call(this,_f4a);
StageBoxAbstraction.handleAction.call(this,_f4a);
var _f4b=_f4a.target;
var _f4c=null;
var _f4d=null;
switch(_f4a.type){
case DockBinding.ACTION_EMPTIED:
_f4d=this.getChildBindingByLocalName("splitter");
if(_f4d.isVisible){
_f4d.hide();
}
_f4c=this.getDescendantBindingsByLocalName("dock");
if(_f4c.getFirst().isEmpty&&_f4c.getLast().isEmpty){
if(_f4c.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f4a.consume();
break;
case DockBinding.ACTION_OPENED:
_f4c=this.getDescendantBindingsByLocalName("dock");
if(!_f4c.getFirst().isEmpty&&!_f4c.getLast().isEmpty){
_f4d=this.getChildBindingByLocalName("splitter");
if(!_f4d.isVisible){
_f4d.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f4a.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f4b!=this){
_f4d=this.getChildBindingByLocalName("splitter");
if(_f4d.isVisible){
_f4d.hide();
}
this.invokeLayout();
_f4a.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f4b!=this){
var _f4e=this.getChildBindingsByLocalName("splitpanel");
if(_f4e.getFirst().isVisible&&_f4e.getLast().isVisible){
_f4d=this.getChildBindingByLocalName("splitter");
if(!_f4d.isVisible){
_f4d.show();
}
}
this.invokeLayout();
_f4a.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f4f){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f4f);
switch(_f4f.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f4f.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f50=this.getChildBindingsByLocalName("splitpanel");
return _f50.getFirst().isVisible&&_f50.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f51=this.getChildBindingsByLocalName("splitpanel");
return _f51.getFirst().isFixed&&_f51.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f52){
StageSplitPanelBinding.superclass.handleAction.call(this,_f52);
StageBoxAbstraction.handleAction.call(this,_f52);
switch(_f52.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f52.type==StageSplitBoxBinding.ACTION_HIDE){
_f52.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f52.type==DockBinding.ACTION_EMPTIED){
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
if(_f52.type==StageSplitBoxBinding.ACTION_SHOW){
_f52.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f55=_f52.target;
if(_f55!=this&&_f55.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f56=_f55._containingSplitBoxBinding;
if(_f56.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f57=_f56.getChildBindingsByLocalName("splitpanel");
var _f58=_f57.getFirst();
var _f59=_f57.getLast();
if(this.isFixed==true){
if(!_f58.isFixed||!_f59.isFixed||(!_f56.hasBothPanelsVisible()&&_f55.isMinimizedForReal)){
this.setFix(false);
_f52.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f56.hasBothPanelsFixed()||(!_f56.hasBothPanelsVisible()&&_f55.isMinimizedForReal)){
this.setFix(_f55.getContainedDock().getHeight());
_f52.consume();
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
var _f5a=this.getContainedDock();
if(_f5a){
if(this.isMaximizePrepared==true){
}else{
_f5a.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f5b=this.getContainedDock();
if(_f5b){
if(_f5b.type==DockBinding.TYPE_EDITORS){
if(_f5b.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f5b.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f5c=this.getContainedDock();
if(_f5c){
_f5c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f5c);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f5d=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5e=this.getContainedDock();
if(_f5e){
_f5e.collapse(_f5d);
if(!_f5d){
this.setFix(_f5e.getHeight());
}else{
this.setFix(_f5e.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5e&&_f5e.isActive){
_f5e.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f5e);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f5f){
var _f60=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f61=this.getContainedDock();
if(_f61){
if(this.isMinimized==true){
_f61.unCollapse(_f60);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f5f){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f61){
_f61.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f61);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f62){
var _f63=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f63=false;
}
}
if(_f63==true){
this._invisibilize(_f62);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f65){
if(_f65!=this._isInvisibilized){
if(_f65){
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
StageSplitterBinding.prototype.onDragStart=function(_f66){
var _f67=top.app.bindingMap.stagesplittercover;
var _f68=this._containingSplitBoxBinding.getOrient();
switch(_f68){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f67.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f67.bindingElement.style.cursor="n-resize";
break;
}
_f67.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f68);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f6e){
this._orient=_f6e;
this.attachClassName(_f6e);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f70=true;
var _f71=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f71=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f70=false;
break;
}
if(_f70){
this.bindingElement.style.left=pos.x+"px";
}
if(_f71){
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
StageBoxAbstraction.handleAction=function(_f73){
switch(_f73.type){
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
if(_f73.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f73.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f74=this.bindingElement.style;
_f74.position="absolute";
_f74.width="100%";
_f74.height="100%";
_f74.top="0";
_f74.left="0";
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
var _f75=this.bindingElement.style;
_f75.position="relative";
_f75.width="auto";
_f75.height="auto";
_f75.top="auto";
_f75.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f76,_f77){
var _f78=_f76.bindingElement.style;
var _f79=_f76.bindingElement.parentNode;
var box=_f76._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f77){
_f76._unmodifiedFlexMethod=_f76.flex;
_f76.flex=function(){
_f78.width=_f79.offsetWidth+"px";
_f78.height=_f79.offsetHeight+"px";
};
}else{
_f78.width="100%";
_f78.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f78.width="auto";
_f78.height="auto";
box.reflex(true);
},0);
}
_f76.flex=_f76._unmodifiedFlexMethod;
_f76._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f7b){
var _f7c=_f7b.target;
switch(_f7b.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f7c instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f7b);
_f7b.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f7b.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f7d){
var mode=null;
switch(_f7d.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f7f){
StageMenuBarBinding.superclass.handleAction.call(this,_f7f);
switch(_f7f.type){
case MenuItemBinding.ACTION_COMMAND:
var _f80=_f7f.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f80){
SystemAction.invoke(_f80,this._rootNode);
}
}
_f7f.consume();
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
var _f81=this.getProperty("handle");
if(_f81){
this._handle=_f81;
if(StageBinding.isViewOpen(_f81)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f81);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f83){
this.setProperty("handle",_f83);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f84,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f84,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f84){
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
StageViewMenuItemBinding.newInstance=function(_f86){
var _f87=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f86);
UserInterface.registerBinding(_f87,StageViewMenuItemBinding);
return UserInterface.getBinding(_f87);
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
StageStatusBarBinding.prototype.setLabel=function(_f88){
this._label.setLabel(_f88);
};
StageStatusBarBinding.prototype.setImage=function(_f89){
this._label.setImage(_f89);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f8a){
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
var _f8b=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8c=_f8b.getAssociatedView();
var _f8d=_f8c.getContentWindow().bindingMap.tree;
var _f8e=_f8d.getFocusedTreeNodeBindings();
if(!_f8e.hasEntries()&&StageBinding.treeSelector){
_f8e=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f8e;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f8f=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f8f.each(function(_f90){
LocalStore.focuseNodes.add(_f90.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f91=LocalStore.focuseNodes.getEntityTokens();
var _f92=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f93=_f92.getAssociatedView();
var _f94=_f93.getContentWindow().bindingMap.tree;
_f91=new List(TreeService.GetCurrentLocaleEntityTokens(_f91.toArray()));
_f91.each(function(_f95){
_f94._focusTreeNodeByEntityToken(_f95);
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
ExplorerBinding.prototype.handleAction=function(_f96){
ExplorerBinding.superclass.handleAction.call(this,_f96);
var _f97=_f96.target;
switch(_f96.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f96.consume();
break;
case Binding.ACTION_DRAG:
if(_f97 instanceof ExplorerSplitterBinding){
_f97.dragger.registerHandler(this);
}
_f96.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f99){
this._menuBinding.setSelectionByHandle(_f99);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f9a){
if(_f9a instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f9a);
this._menuBinding.mountDefinition(_f9a);
}
};
ExplorerBinding.prototype.onDragStart=function(_f9b){
var _f9c=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f9c.hasEntries()){
var _f9d=_f9c.getFirst();
this._dragStart=_f9d.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f9d.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa1){
if(_fa1 instanceof SystemViewDefinition){
var _fa2=ViewBinding.newInstance(this.bindingDocument);
_fa2.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa2.setDefinition(_fa1);
var _fa3=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa3.setAssociatedView(_fa2);
this._decks[_fa1.handle]=_fa3;
_fa3.add(_fa2);
this.add(_fa3);
function attach(){
_fa3.attach();
_fa2.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa4){
var _fa5=this._decks[_fa4];
this.select(_fa5);
};
DecksBinding.prototype.expandBy=function(_fa6){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa8=this.bindingElement.offsetHeight+_fa6;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa8+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_faa){
var _fab=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_faa);
return UserInterface.registerBinding(_fab,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fac){
this._viewBinding=_fac;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fad=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fae=this._viewBinding.getDefinition().label;
StatusBar.busy(_fad,[_fae]);
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
ExplorerDeckBinding.prototype.handleAction=function(_faf){
ExplorerDeckBinding.superclass.handleAction.call(this,_faf);
var _fb0=_faf.target;
switch(_faf.type){
case PageBinding.ACTION_INITIALIZED:
if(_fb0 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fb0.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb1,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb1,arg);
switch(_fb1){
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
var _fb3=null;
if(this._isExplorerDeckBindingInitialized){
_fb3=this._viewBinding.getDefinition().label;
}else{
_fb3=DockTabBinding.LABEL_TABLOADING;
}
return _fb3;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb4=null;
if(this._isExplorerDeckBindingInitialized){
_fb4=this._viewBinding.getDefinition().image;
}else{
_fb4=DockTabBinding.IMG_TABLOADING;
}
return _fb4;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb5=null;
if(this._isExplorerDeckBindingInitialized){
_fb5=this._viewBinding.getDefinition().toolTip;
}
return _fb5;
};
ExplorerDeckBinding.newInstance=function(_fb6){
var _fb7=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fb6);
return UserInterface.registerBinding(_fb7,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb8){
switch(_fb8.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fb8.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fb8.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb8);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb9){
this._maxButtons.set(_fb9.handle,this._mountMaxButton(_fb9));
this._minButtons.set(_fb9.handle,this._mountMinButton(_fb9));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fba){
var _fbb=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fbb.setLabel(_fba.label);
_fbb.setToolTip(_fba.toolTip);
_fbb.handle=_fba.handle;
_fbb.node=_fba.node;
this._maxGroup.add(_fbb);
this._maxList.add(_fbb);
_fbb.attach();
if(Client.isPad){
_fbb.hide();
}
return _fbb;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fbc){
var _fbd=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fbd.setLabel(_fbc.label);
_fbd.setToolTip(_fbc.label);
_fbd.handle=_fbc.handle;
_fbd.node=_fbc.node;
this._minGroup.addFirst(_fbd);
this._minList.add(_fbd);
_fbd.attach();
if(!Client.isPad){
_fbd.hide();
}
return _fbd;
};
ExplorerMenuBinding.prototype.handleAction=function(_fbe){
ExplorerMenuBinding.superclass.handleAction.call(this,_fbe);
switch(_fbe.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fbf=_fbe.target;
var _fc0=_fbf.getCheckedButtonBinding();
var _fc1=_fc0.handle;
switch(_fbf){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fc1),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fc1),true);
break;
}
this._selectedHandle=_fc1;
this._selectedTag=_fc0.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fbe.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc2){
var _fc3=this._maxButtons.get(_fc2);
if(_fc3){
_fc3.check();
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
var _fc4=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fc4=true;
}
return _fc4;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fc6=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fc6=true;
}
return _fc6;
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
ExplorerToolBarBinding.newInstance=function(_fc7){
var _fc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc7);
return UserInterface.registerBinding(_fc8,ExplorerToolBarBinding);
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
var _fc9=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fca=_fc9?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fca);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fcb,_fcc){
var _fcd=(_fcc==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fce=DOMUtil.createElementNS(Constants.NS_UI,_fcd,_fcb);
var _fcf=UserInterface.registerBinding(_fce,ExplorerToolBarButtonBinding);
_fcf.explorerToolBarButtonType=_fcc;
return _fcf;
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
EditorBinding.invokeFunctionEditorDialog=function(_fd0,_fd1,type){
type=type?type:"";
var _fd3=FunctionService.GetCustomEditorSettingsByMarkup(_fd0);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fd3){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fd3.Width?(_fd3.Width>dim.w?dim.w:_fd3.Width):undefined;
def.height=_fd3.Height?(_fd3.Height>dim.h?dim.h:_fd3.Height):undefined;
if(_fd3.Url){
_fd3.Url=_fd3.Url.indexOf("?")>-1?_fd3.Url+"&consoleId="+Application.CONSOLE_ID:_fd3.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd1;
def.argument={url:_fd3?_fd3.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fd0}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fd6,_fd7){
var _fd8=EditorBinding._components;
var _fd9=EditorBinding._editors;
var key=_fd7.key;
var _fdb=Interfaces.isImplemented(IWysiwygEditorComponent,_fd6);
if(!_fdb){
_fdb=Interfaces.isImplemented(ISourceEditorComponent,_fd6);
}
if(_fdb){
if(_fd9.has(key)){
_fd9.get(key).initializeEditorComponent(_fd6);
}else{
if(!_fd8.has(key)){
_fd8.set(key,new List());
}
_fd8.get(key).add(_fd6);
}
}else{
throw "Editor component interface not implemented: "+_fd6;
}
};
EditorBinding.claimComponents=function(_fdc,_fdd){
var _fde=EditorBinding._components;
var _fdf=EditorBinding._editors;
var key=_fdd.key;
_fdf.set(key,_fdc);
var list=null;
if(_fde.has(key)){
list=_fde.get(key).copy();
_fde.del(key);
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
var _fe3=this.getProperty("value");
if(_fe3!=null){
_fe3=decodeURIComponent(_fe3);
this._startContent=_fe3;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fe5=this.bindingWindow.DataManager;
_fe5.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fe7){
var _fe8=EditorBinding.claimComponents(this,_fe7);
if(_fe8!=null){
while(_fe8.hasNext()){
this.initializeEditorComponent(_fe8.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fea=this.bindingWindow.DataManager;
if(_fea.getDataBinding(name)){
_fea.unRegisterDataBinding(name);
}
_fea.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _feb=this.getEditorDocument();
if(_feb!=null){
Application.framework(_feb);
DOMEvents.addEventListener(_feb,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_feb,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_feb,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_feb,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fed){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fed==true){
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
var _fef=this.getCheckSum();
if(_fef!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fef;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _ff0=null;
if(Binding.exists(this._pageBinding)){
_ff0=this._pageBinding.getCheckSum(this._checksum);
}
return _ff0;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff2=DOMEvents.getTarget(e);
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
if(_ff2.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ff4,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff4,arg);
var _ff6=null;
switch(_ff4){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff7=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff7=false;
}
}
}else{
_ff6=DOMEvents.getTarget(arg);
if(_ff6&&_ff6.ownerDocument==this.getEditorDocument()){
_ff7=false;
}
}
if(_ff7){
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
EditorBinding.prototype._activateEditor=function(_ff8){
if(_ff8!=this._isActivated){
this._isActivated=_ff8;
EditorBinding.isActive=_ff8;
var _ff9=this.getEditorWindow().standardEventHandler;
var _ffa=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ffa!=null){
if(_ff8){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ffa.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff9.enableNativeKeys(true);
}else{
_ffa.disable();
_ff9.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ffb=this.getEditorDocument().selection.createRange();
_ffb.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ffc=false;
try{
var _ffd=this.getEditorWindow().getSelection();
if(_ffd!=null){
_ffc=_ffd.toString().length>0;
if(!_ffc){
var _ffe=_ffd.getRangeAt(0);
var frag=_ffe.cloneContents();
var _1000=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_1000.appendChild(frag.firstChild);
}
var img=_1000.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ffc=true;
}
}
}
}
}
catch(exception){
}
return _ffc;
};
EditorBinding.prototype.isCommandEnabled=function(_1002){
var _1003=true;
switch(_1002){
case "Cut":
case "Copy":
case "Paste":
_1003=this.getEditorDocument().queryCommandEnabled(_1002);
break;
}
return _1003;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1007=false;
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
_1007=true;
}
break;
}
return _1007;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _100a=this.getContentWindow().bindingMap.toolbar;
var _100b=_100a.getButtonForCommand(cmd);
if(!_100b){
throw "No button for command "+cmd;
}
return _100b;
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
EditorBinding.prototype.handleAction=function(_100f){
EditorBinding.superclass.handleAction.call(this,_100f);
var _1010=_100f.target;
var self=this;
var _1012=this.shadowTree.iframe;
switch(_100f.type){
case Binding.ACTION_DIRTY:
if(_100f.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1013){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1013);
};
EditorBinding.prototype.handleElement=function(_1014){
return true;
};
EditorBinding.prototype.updateElement=function(_1015){
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
var _1018=this._menuGroups[rel];
if(_1018 instanceof List){
_1018.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _101b=this._menuGroups[rel];
if(_101b instanceof List){
_101b.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_101d){
EditorPopupBinding.superclass.handleAction.call(this,_101d);
var _101e=_101d.target;
if(_101d.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_101e.getProperty("cmd");
var gui=_101e.getProperty("gui");
var val=_101e.getProperty("val");
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
var _1022=this.bindingWindow.bindingMap.tinywindow;
var _1023=this.bindingWindow.bindingMap.codepresswindow;
if(_1022){
EditorBinding.registerComponent(this,_1022);
}else{
if(_1023){
EditorBinding.registerComponent(this,_1023);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1024,_1025,_1026,theme){
this._editorBinding=_1024;
this._tinyEngine=_1025;
this._tinyInstance=_1026;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1028,frame,_102a){
this._editorBinding=_1028;
this._codePressFrame=frame;
this._codePressEngine=_102a;
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
var _102d=this._editorBinding;
if(_102d!=null){
var self=this;
var _102f={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_102d.hasBookmark()){
_102d.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_102d.hasBookmark()){
_102d.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_102f);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_102f);
}
};
EditorClickButtonBinding.newInstance=function(_1031){
var _1032=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1031);
return UserInterface.registerBinding(_1032,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1033){
var _1034=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1033);
return UserInterface.registerBinding(_1034,EditorToolBarButtonBinding);
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
var _1035=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1035);
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
EditorSelectorBinding.prototype.initializeComponent=function(_1036,_1037,_1038,theme){
this._editorBinding=_1036;
this._tinyEngine=_1037;
this._tinyInstance=_1038;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_103a){
EditorSelectorBinding.superclass.handleAction.call(this,_103a);
switch(_103a.type){
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
EditorMenuItemBinding.newInstance=function(_103e){
var _103f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_103e);
return UserInterface.registerBinding(_103f,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1040){
var i=0,_1042,_1043=[],split=_1040.split(" ");
while((_1042=split[i++])!=null){
if(_1042.length>=3&&_1042.substring(0,3)=="mce"){
continue;
}else{
if(_1042.length>=14&&_1042.substring(0,14)=="compositemedia"){
continue;
}
}
_1043.push(_1042);
}
return _1043.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1045){
var _1046=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1045);
if(soap instanceof SOAPFault){
}else{
_1046=soap.XhtmlFragment;
if(!_1046){
_1046="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1046;
};
VisualEditorBinding.getTinyContent=function(_1048,_1049){
var _104a=null;
if(_1048==null||!_1048.replace(/\s*/gm,"").length){
_1048=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1049.getSoapTinyContent(_1048);
if(soap instanceof SOAPFault){
var _104c=soap;
var _104d={handleDialogResponse:function(){
_1049.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_104d,_104c);
}else{
_104a=soap.XhtmlFragment;
if(_104a==null){
_104a=new String("");
}
_104a=_104a.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _104a;
};
VisualEditorBinding.isImage=function(_104e){
return _104e&&_104e.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_104f){
return VisualEditorBinding.isImage(_104f)&&!VisualEditorBinding.isReservedElement(_104f);
};
VisualEditorBinding.isReservedElement=function(_1050){
if(VisualEditorBinding.isFunctionElement(_1050)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1050)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1050)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1051){
return VisualEditorBinding.isImage(_1051)&&CSSUtil.hasClassName(_1051,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1052){
return VisualEditorBinding.isImage(_1052)&&CSSUtil.hasClassName(_1052,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1053){
return VisualEditorBinding.isImage(_1053)&&CSSUtil.hasClassName(_1053,VisualEditorBinding.HTML_CLASSNAME);
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
var _1054=this.getProperty("embedablefieldstypenames");
if(_1054!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1054);
}
var _1055=this.getProperty("formattingconfiguration");
if(_1055!=null){
this._url+="?config="+_1055;
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
VisualEditorBinding.prototype.handleBroadcast=function(_1056,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1056,arg);
var _1058=this.getContentWindow().bindingMap.tinywindow;
var _1059=_1058.getContentWindow();
switch(_1056){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1059){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1058);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_105a){
_105a.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _105b=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_105b.replace(/\s*/gm,"").length==0){
_105b=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_105b,{format:"raw"});
this.updateBodyWidth();
};
VisualEditorBinding.prototype._onPageInitialize=function(_105c){
VisualEditorBinding.superclass._onPageInitialize.call(this,_105c);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _105e=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_105e=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_105e=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _105e;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1061){
var _1062=_1061;
if(!this._isNormalizedDocument(_1061)){
_1062=this._getHtmlMarkup().replace("${body}",_1061);
}
return _1062;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1063){
var _1064=false;
var doc=XMLParser.parse(_1063,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1064=true;
}
}
if(Client.isWebKit){
if(_1063.indexOf("<html")!==0){
_1064=false;
}
}
return _1064;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1069=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1069){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1069=true;
}
return _1069;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _106b=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_106b);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_106d){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_106d,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_106f){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_106f,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1072=CSSComputer.getPadding(body);
var _1073=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1073.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_1076){
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
VisualEditorPopupBinding.prototype.configure=function(_1077,_1078,_1079){
var _107a=this.editorBinding.hasSelection();
this.tinyInstance=_1077;
this.tinyEngine=_1078;
this.tinyElement=_1079;
this.hasSelection=_107a;
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
var _107e=false;
if(this.hasSelection){
_107e=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_107e=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_107e=true;
}
}
}
}
if(_107e){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _107f=this.getMenuItemForCommand("compositeInsertLink");
var _1080=this.getMenuItemForCommand("unlink");
var _1081=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1082=this.editorBinding.getButtonForCommand("unlink");
_1080.setDisabled(_1082.isDisabled);
if(_1080.isDisabled){
_107f.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_107f.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1083=this.editorBinding.embedableFieldConfiguration;
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
if(_1083){
var _1086=_1083.getGroupNames();
if(_1086.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1086.each(function(_108a){
var _108b=_1083.getFieldNames(_108a);
_108b.each(function(_108c){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_108c);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_108a+":"+_108c);
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
var _108e=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _108f=null;
var _1090=null;
if(_108e){
if(_108e.nodeName=="TD"){
_108f=_108e.getAttribute("colspan");
_1090=_108e.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_108f=="1"&&_1090=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_108e){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1091){
var _1092=VisualEditorFormattingConfiguration._configurations;
if(!_1092.has(_1091)){
_1092.set(_1091,new VisualEditorFormattingConfiguration());
}
return _1092.get(_1091);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1094){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1095){
var _1096=null;
var _1097=VisualEditorFieldGroupConfiguration._configurations;
if(!_1097.has(_1095)){
_1097.set(_1095,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1095)));
}
return _1097.get(_1095);
};
function VisualEditorFieldGroupConfiguration(_1098){
var _1099=new Map();
new List(_1098).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1099.set(group.GroupName,map);
});
this._groups=_1099;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_109d){
return this._groups.get(_109d).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_109e,_109f){
return this._groups.get(_109e).get(_109f).xhtml;
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
var _10a1=this.getDescendantElementsByLocalName("textarea");
while(_10a1.hasNext()){
var _10a2=_10a1.getNext();
if(_10a2.getAttribute("selected")=="true"){
this._startContent=_10a2.value;
this._textareaname=_10a2.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _10a4=this.getContentWindow().bindingMap.templatetree;
_10a4.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10a5){
var _10a6=_10a4.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10a6.textareaname);
_10a5.consume();
}});
_10a4.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a7){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a8=this.getContentWindow().bindingMap.toolsplitter;
_10a8.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a9=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a9.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a9);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10aa){
this._textareas=new Map();
while(_10aa.hasNext()){
var _10ab=_10aa.getNext();
var _10ac=_10ab.getAttribute("placeholderid");
this._textareas.set(_10ac,{placeholderid:_10ac,placeholdername:_10ab.getAttribute("placeholdername"),placeholdermarkup:_10ab.value,textareaelement:_10ab,isSelected:_10ab.getAttribute("selected")=="true"});
}
var _10ad=new Map();
this._textareas.each(function(name,_10af){
var _10b0=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10b0.setLabel(_10af.placeholdername);
_10b0.setImage("${icon:placeholder}");
_10b0.setProperty("placeholder",true);
_10b0.textareaname=name;
_10ad.set(_10af.placeholdername,_10b0);
if(_10af.isSelected){
selected=_10b0;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b1=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b1.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b2=this.getContentWindow().bindingMap.templatetree;
var _10b3=_10b2.add(TreeNodeBinding.newInstance(_10b2.bindingDocument));
_10b3.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10b3.setImage("${icon:warning}");
_10b3.attach();
var _10b4=this.getContentWindow().bindingMap.statusbar;
_10b4.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10b6=this._textareas.get(name);
var _10b7=_10b6.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b7));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b8){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b8;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b9=this.getContentWindow().bindingMap.statusbar;
_10b9.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b8);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10bc=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10bc;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10bd=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10bd=this._xhtmls.get(this._textareaname);
if(_10bd==null){
_10bd=VisualEditorBinding.XHTML;
}
}
return _10bd;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10bf){
_10bf.textareaelement.value=_10bf.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10c0,_10c1){
var _10c2=_10c0.getElementsByTagName("div").item(0);
var _10c3=_10c1.getElementsByTagName("div").item(0);
var _10c4=new List(_10c2.getElementsByTagName("textarea"));
var _10c5=new List(_10c3.getElementsByTagName("textarea"));
var _10c6=false;
if(_10c4.getLength()!=_10c5.getLength()){
_10c6=true;
}else{
var index=0;
_10c4.each(function(_10c8,index){
var _10ca=_10c5.get(index);
var newid=_10c8.getAttribute("placeholderid");
var oldid=_10ca.getAttribute("placeholderid");
var _10cd=_10c8.getAttribute("placeholdername");
var _10ce=_10ca.getAttribute("placeholdername");
if(newid!=oldid||_10cd!=_10ce){
_10c6=true;
}
return !_10c6;
});
}
if(_10c6){
var html=null;
if(_10c2.innerHTML!=null){
html=_10c2.innerHTML;
}else{
html=DOMSerializer.serialize(_10c2);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d1){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d1);
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
var _10d4=this.getDescendantBindingByLocalName("selector");
_10d4.attach();
this._populateTemplateSelector();
var _10d5=this.getContentWindow().bindingMap.templateselector;
_10d5.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10d6=this.getDescendantBindingByLocalName("selector");
var _10d7=this.getContentWindow().bindingMap.templateselector;
_10d6.selections.each(function(_10d8){
_10d8.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d7.populateFromList(_10d6.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d9=this.getDescendantBindingByLocalName("selector");
var _10da=this.getContentWindow().bindingMap.templateselector;
_10d9.selectByValue(_10da.getValue());
_10d9.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10db){
this.updateTemplatePreview();
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10e0,_10e1){
var _10e2=_10e1;
if(old.has(_10e0)){
_10e2=old.get(_10e0).placeholdermarkup;
}
return _10e2;
}
while(_10db.hasNext()){
var _10e3=_10db.getNext();
var _10e4=_10e3.getAttribute("placeholderid");
this._textareas.set(_10e4,{placeholderid:_10e4,placeholdername:_10e3.getAttribute("placeholdername"),placeholdermarkup:compute(_10e4,_10e3.value),textareaelement:_10e3,isSelected:_10e3.getAttribute("selected")=="true"});
}
var _10e5=null;
var _10e6=this.getContentWindow().bindingMap.templatetree;
var _10e7=new Map();
this._textareas.each(function(name,_10e9){
var _10ea=_10e6.add(TreeNodeBinding.newInstance(_10e6.bindingDocument));
_10ea.setLabel(_10e9.placeholdername);
_10ea.setImage("${icon:placeholder}");
_10ea.setProperty("placeholder",true);
_10ea.textareaname=name;
_10e7.set(_10e9.placeholdername,_10ea);
if(_10e9.isSelected){
_10e5=_10ea;
}
});
_10e6.attachRecursive();
if(_10e5!=null){
var _10eb=true;
if(this._oldtextareas.hasEntries()){
_10eb=false;
var map=new Map();
this._textareas.each(function(id,_10ee){
map.set(_10ee.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10eb=true;
}
}
if(_10eb){
var _10ef=this._textareas.get(_10e5.textareaname);
this._textareaname=_10e5.textareaname;
this._placeholdername=_10ef.placeholdername;
this._setContentFromPlaceHolder(_10e5.textareaname);
_10e5.focus();
}else{
var _10f0=_10e7.get(this._placeholdername);
this._textareaname=_10f0.textareaname;
_10f0.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10f2,_10f3){
var _10f4=_10f2.getElementsByTagName("ui:selector").item(0);
var _10f5=_10f3.getElementsByTagName("ui:selector").item(0);
var _10f6=false;
if(_10f4!=null&&_10f5!=null){
var _10f7=new List(_10f4.getElementsByTagName("ui:selection"));
var _10f8=new List(_10f5.getElementsByTagName("ui:selection"));
if(_10f7.getLength()!=_10f8.getLength()){
_10f6=true;
}else{
_10f7.each(function(_10f9,index){
var _10fb=_10f9.getAttribute("value");
var _10fc=_10f8.get(index).getAttribute("value");
if(_10fb!=_10fc){
_10f6=true;
}
return !_10f6;
});
}
}
if(_10f6){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f4);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10f2,_10f3);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10fe){
var _10ff=null;
if(_10fe==undefined){
_10fe=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1101){
if(_1101.PlaceholderId==_10fe){
_10ff=_1101.ClientRectangle.Width;
return false;
}
});
}
return _10ff;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(){
var _1102=this._pageId;
var _1103=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1102,_1103,function(_1105){
self._templatePreview=_1105;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1106){
var _1107=this._pageId;
var _1108=this._textareaname;
var _1109=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1106,_1107,_1109,_1108,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_110b){
var _110c=this._pageId;
var _110d=this._textareaname;
var _110e=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_110b,_110c,_110e,_110d,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1110,frame,_1112){
this._editorBinding=_1110;
this._codePressFrame=frame;
this._codePressEngine=_1112;
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
var _1118=this.getProperty("validate");
if(_1118==true){
this._hasStrictValidation=true;
}
var _1119=this.getProperty("strictsave");
if(_1119===false){
this._strictSave=false;
}
var _111a=this.getProperty("validator");
if(_111a!=null){
this._validator=_111a;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_111b,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_111b,arg);
switch(_111b){
case BroadcastMessages.CODEMIRROR_LOADED:
var _111d=this.getContentWindow().bindingMap.codemirrorwindow;
if(_111d!=null){
var _111e=_111d.getContentWindow();
if(arg.broadcastWindow==_111e){
this._codemirrorWindow=_111e;
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
this.initializeEditorComponents(_111d);
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
this.unsubscribe(_111b);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1122){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1122);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1123){
if(_1123!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1123;
EditorBinding.isActive=_1123;
var _1124=this._codemirrorWindow.standardEventHandler;
if(_1123){
_1124.enableNativeKeys(true);
}else{
_1124.disableNativeKeys();
}
var _1125=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1125!=null){
if(_1123){
_1125.enable();
}else{
_1125.disable();
}
}
if(_1123){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1129=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1129;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_112a){
_112a.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_112c){
if(!this._isFinalized){
if(_112c!=this._startContent){
this._startContent=_112c;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_112c);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _112d=this.getContentWindow().bindingMap.editorpage.getContent();
return _112d?_112d:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_112e){
if(this._pageBinding!=null){
this._pageBinding.cover(_112e);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_112f){
if(_112f!=null&&this.shadowTree.dotnetinput!=null){
var value=_112f.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1131=true;
var _1132=this.getContent();
if(this._validator!=null){
_1131=Validator.validateInformed(_1132,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1133=_1132.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1133!=_1132){
_1132=_1133;
this.setContent(_1133);
}
_1131=XMLParser.isWellFormedDocument(_1132,true,!this._strictSave);
if(_1131==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1131=this._isValidHTML(_1132);
break;
}
}
break;
}
}
return _1131;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1135=true;
var doc=XMLParser.parse(xml);
var _1137=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1137.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1137.add("NamespaceURI");
}
var head=null,body=null;
var _113b=new List(root.childNodes);
while(_113b.hasNext()){
var child=_113b.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1137.add("MultipleHead");
}
if(body!=null){
_1137.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1137.add("MultipleBody");
}
body=child;
break;
default:
_1137.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1137.add("MissingHead");
}
if(body==null){
_1137.add("MissingBody");
}
}
if(_1137.hasEntries()){
_1135=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1137.getFirst()));
}
return _1135;
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
var _113d=null;
var page=this._pageBinding;
if(page!=null){
_113d=page.getCheckSum();
}
return _113d;
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
ThrobberBinding.prototype.handleBroadcast=function(_113f,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_113f,arg);
switch(_113f){
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
ProgressBarBinding.notch=function(_1142){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1142);
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
ProgressBarBinding.prototype.notch=function(_1144){
_1144=_1144?_1144:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1144);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1146,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1146,arg);
switch(_1146){
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
StartMenuItemBinding.prototype.setChecked=function(_1148,_1149){
StartMenuItemBinding.superclass.setChecked.call(this,_1148,_1149);
if(!_1149){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_114a){
var _114b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_114a);
UserInterface.registerBinding(_114b,StartMenuItemBinding);
return UserInterface.getBinding(_114b);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_114e,_114f){
var _1150=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_114f,true)==true){
if(_114e!="*"){
_114e=KeySetBinding._sanitizeKeyModifiers(_114e);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1150[doc]){
_1150[doc]={};
}
if(!_1150[doc][code]){
_1150[doc][code]={};
}
_1150[doc][code][_114e]=_114f;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1154=false;
var code=e.keyCode;
var _1156=KeySetBinding.keyEventHandlers;
if(_1156[doc]&&_1156[doc][code]){
var _1157="[default]";
_1157+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1157+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1157+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1157+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1158=_1156[doc][code][_1157];
if(_1158==null){
_1158=_1156[doc][code]["*"];
}
if(_1158!=null){
_1158.handleKeyEvent(e);
_1154=true;
}
}
return _1154;
};
KeySetBinding._sanitizeKeyModifiers=function(_1159){
var _115a="[default]";
var mods={};
if(_1159){
new List(_1159.split(" ")).each(function(_115c){
mods[_115c]=true;
});
function check(_115d){
if(mods[_115d]){
_115a+=" "+_115d;
}
}
check("shift");
check("control");
}
return _115a;
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
var _1161=key.getAttribute("oncommand");
var _1162=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1162){
DOMEvents.preventDefault(e);
}
var _1164=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1161,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1165){
if(_1165 instanceof CursorBinding){
_1165.setOpacity(0);
_1165.show();
new Animation({modifier:9,onstep:function(_1166){
_1165.setOpacity(Math.sin(_1166*Math.PI/180));
},onstop:function(){
_1165.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1167){
if(_1167 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1168){
_1167.setOpacity(Math.cos(_1168*Math.PI/180));
},onstop:function(){
_1167.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1169,_116a,_116b){
if(_1169 instanceof CursorBinding){
_116b.x-=16;
_116b.y-=16;
new Animation({modifier:3,onstep:function(_116c){
var tal=Math.sin(_116c*Math.PI/180);
_1169.setPosition(new Point(((1-tal)*_116a.x)+((0+tal)*_116b.x),((1-tal)*_116a.y)+((0+tal)*_116b.y)));
},onstop:function(){
CursorBinding.fadeOut(_1169);
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
CursorBinding.prototype.setOpacity=function(_1172){
this.bindingElement.style.opacity=new String(_1172);
this._opacity=_1172;
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
function setOpacity(_1175){
cover.bindingElement.style.opacity=new String(_1175);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1176){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1176*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1178){
cover.bindingElement.style.MozOpacity=new String(_1178);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1179){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1179*Math.PI/180));
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
}
};
CoverBinding.prototype.setBusy=function(_117b){
if(_117b!=this._isBusy){
if(_117b){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_117b;
}
};
CoverBinding.prototype.setTransparent=function(_117c){
if(_117c!=this._isTransparent){
if(_117c){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_117c;
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
CoverBinding.prototype.setHeight=function(_117e){
if(_117e>=0){
this.bindingElement.style.height=new String(_117e+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_117f){
var _1180=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_117f);
return UserInterface.registerBinding(_1180,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1182=UncoverBinding._bindingInstance;
if(Binding.exists(_1182)){
_1182.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1186){
this._isFading=_1186==true;
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
var _1187=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1187.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1187.clearRect(0,0,300,150);
_1187.fillRect(0,0,300,150);
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
var _1189=this._canvas.getContext("2d");
_1189.clearRect(0,0,300,150);
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
var _118a=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_118a);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _118b=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_118b){
this._startcontent=_118b.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_118c){
SourceCodeViewerBinding.superclass.handleAction.call(this,_118c);
switch(_118c.type){
case WindowBinding.ACTION_ONLOAD:
if(_118c.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_118c.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_118c);
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
var _1190=this._transformer.transformToString(doc);
this._inject(_1190);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1193){
this.getContentDocument().body.innerHTML=_1193;
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
var _119b=list.getNext();
var id=_119b.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_119b);
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
var _11a5=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a5.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a5.appendChild(att);
}
elm.appendChild(_11a5);
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
var _11af=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11af){
doc=XMLParser.parse(_11af);
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
var _11b3=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11b3;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b4,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b4,arg);
switch(_11b4){
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
var _11b7=new List();
list.each(function(lang){
_11b7.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11b7);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11bb){
switch(_11bb){
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
var _11be=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11be,root);
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
var _11bf=this.getProperty("status");
if(_11bf!=null){
switch(_11bf){
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
UserInterfaceMapping.prototype.merge=function(_11c3){
for(var _11c4 in _11c3.map){
this.map[_11c4]=_11c3.getBindingImplementation(_11c4);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11c5){
var _11c6=null;
var name=_11c5.nodeName.toLowerCase();
if(this.map[name]){
_11c6=this.map[name];
}
return _11c6;
};
var UserInterface=new function(){
var _11c8=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11c9=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11c8,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11ca=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11cc,impl){
var _11ce=null;
if(!this.hasBinding(_11cc)){
var _11cf=DOMUtil.getParentWindow(_11cc);
if(DOMUtil.getLocalName(_11cc)!="bindingmapping"){
if(!impl&&_11cc.getAttribute("binding")!=null){
var _11d0=_11cc.getAttribute("binding");
impl=_11cf[_11d0];
if(impl==null){
throw "No such binding in scope: "+_11d0;
}
}
if(!impl){
var _11d1=_11cf.DocumentManager;
if(_11d1){
var _11d2=_11d1.customUserInterfaceMapping;
if(_11d2){
impl=_11d2.getBindingImplementation(_11cc);
}
}
}
if(!impl){
impl=_11c9.getBindingImplementation(_11cc);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11ce=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11ce){
var key=KeyMaster.getUniqueKey();
_11cc.setAttribute("key",key);
_11ce.key=key;
if(!_11cc.id){
_11cc.id=key;
}
keys[key]={element:_11cc,binding:_11ce};
_11ce.onBindingRegister();
}
}
}
return _11ce;
};
this.unRegisterBinding=function(_11d4){
terminate(_11d4);
};
function terminate(_11d5){
if(Binding.exists(_11d5)==true){
var key=_11d5.key;
Binding.destroy(_11d5);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11d5=null;
}else{
_11ca.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11d7){
var _11d8=null;
if(keys[_11d7.key]){
_11d8=keys[_11d7.key].element;
}
return _11d8;
};
this.getBinding=function(_11d9){
var _11da=null;
if(_11d9&&_11d9.nodeType==Node.ELEMENT_NODE){
try{
var key=_11d9.getAttribute("key");
if(key&&keys[key]){
_11da=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11d9);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11da;
};
this.getBindingByKey=function(key){
var _11dd=null;
if(keys[key]){
_11dd=keys[key].binding;
}
return _11dd;
};
this.hasBinding=function(_11de){
return this.getBinding(_11de)!=null;
};
this.isBindingVisible=function(_11df){
var _11e0=Application.isOperational;
if(_11e0==true){
var _11e1=new Crawler();
_11e1.type=NodeCrawler.TYPE_ASCENDING;
_11e1.id="visibilitycrawler";
_11e1.addFilter(function(_11e2){
var b=UserInterface.getBinding(_11e2);
var res=0;
if(!b.isVisible){
_11e0=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11e1.crawl(_11df.bindingElement);
_11e1.dispose();
}
return _11e0;
};
var _11e5=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11e5={};
for(var key in keys){
_11e5[key]=true;
}
};
this.getPoint=function(){
var _11e9=null;
if(_11e5){
_11e9=new List();
for(var key in keys){
if(!_11e5[key]){
_11e9.add(key);
}
}
}
return _11e9;
};
this.clearPoint=function(){
_11e5=null;
};
this.trackUndisposedBindings=function(){
var _11eb=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11eb){
_11eb="Bindings illdisposed: ";
}
_11eb+=entry.binding+" ";
}
}
if(_11eb!=null){
_11ca.error(_11eb);
}
};
this.autoTrackDisposedBindings=function(_11ee){
if(_11ee){
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
SOAPRequest.newInstance=function(_11ef,_11f0){
var _11f1=_11ef+"/"+_11f0;
var _11f2=new SOAPRequest(_11f1);
var _11f3=SOAPRequest.resolver;
_11f2.document=Templates.getTemplateDocument("soapenvelope.xml");
_11f2.envelope=_11f3.resolve("soap:Envelope",_11f2.document);
_11f2.header=_11f3.resolve("soap:Header",_11f2.envelope);
_11f2.body=_11f3.resolve("soap:Body",_11f2.envelope);
return _11f2;
};
SOAPRequest._parseResponse=function(_11f4){
var _11f5=null;
var _11f6=false;
var doc=_11f4.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11f5=SOAPRequestResponse.newInstance(_11f4.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11f4.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11f6=true;
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
var text=_11f4.responseText;
if(_11f4.status==503||text.indexOf("id=\"offline\"")>-1){
_11f6=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11f4.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11f4.responseText);
}
}
}
}
if(_11f6==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11f5;
};
function SOAPRequest(_11fb){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11fb;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11fd=DOMUtil.getXMLHTTPRequest();
var _11fe=null;
_11fd.open("post",url,false);
_11fd.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11fd.setRequestHeader("SOAPAction",this.action);
try{
_11fd.send(this.document);
_11fe=SOAPRequest._parseResponse(_11fd);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11fd=null;
return _11fe;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1201){
var _1202=DOMUtil.getXMLHTTPRequest();
_1202.open("post",url,true);
_1202.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1202.setRequestHeader("SOAPAction",this.action);
_1202.onreadystatechange=function(){
if(_1202.readyState==4){
var _1203=SOAPRequest._parseResponse(_1202);
_1201(_1203);
_1202=null;
}
};
_1202.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1204 in this){
this[_1204]=null;
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
var _1206=null;
if(doc&&doc.documentElement){
_1206=new SOAPRequestResponse();
var _1207=SOAPRequestResponse.resolver;
_1206.document=doc;
_1206.envelope=_1207.resolve("soap:Envelope",_1206.document);
_1206.header=_1207.resolve("soap:Header",_1206.envelope);
_1206.body=_1207.resolve("soap:Body",_1206.envelope);
var fault=_1207.resolve("soap:Fault",_1206.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1206.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1207.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1207.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1206;
};
function SOAPFault(_1209,_120a,_120b){
this._operationName=_1209;
this._operationAddress=_120a;
this._faultString=_120b;
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
SOAPFault.newInstance=function(_120c,fault){
return new SOAPFault(_120c.name,_120c.address,fault.faultString);
};
function SOAPEncoder(wsdl,_120f){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_120f;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1211=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1211.body,this._operation);
var _1213=this._wsdl.getSchema();
var _1214=_1213.lookup(this._operation);
var _1215=_1214.getListedDefinitions();
while(_1215.hasNext()){
var def=_1215.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1211;
};
SOAPEncoder.prototype._resolve=function(_1219,_121a,value){
var _121c=this._wsdl.getSchema();
if(_121a.isSimpleValue){
this._appendText(_1219,value,_121a.type=="string");
}else{
var _121d=_121c.lookup(_121a.type);
if(_121d instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_121d.getListedDefinitions();
if(_121d.isArray){
var _121f=new List(value);
var def=defs.getNext();
while(_121f.hasNext()){
var elm=this._appendElement(_1219,def.name);
var val=_121f.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1219,def.name);
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
SOAPEncoder.prototype._appendText=function(_1226,value,_1228){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _122b=false;
var i=0,c;
while(c=chars[i++]){
var _122e=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_122e=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_122e=false;
}
break;
}
if(!_122e){
safe+=c;
}else{
_122b=true;
}
}
if(_122b){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1226.appendChild(_1226.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1231){
this._wsdl=wsdl;
this._operation=_1231;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1236){
var _1237=null;
var _1238=this._wsdl.getSchema();
var id=this._operation+"Response";
var _123a=this.resolve(id,_1236.body);
var _123b=_1238.lookup(id);
var _123c=_123b.getListedDefinitions();
while(!_1237&&_123c.hasNext()){
var def=_123c.getNext();
var elm=this.resolve(def.name,_123a);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1237=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1237.appendChild(_1237.importNode(e,true));
}else{
_1237=this._compute(elm,def);
}
}
return _1237;
};
SOAPDecoder.prototype._compute=function(_1240,_1241){
var _1242=null;
var _1243=this._wsdl.getSchema();
if(_1241.isSimpleValue){
_1242=this._getSimpleValue(_1240,_1241.type);
}else{
var _1244=_1243.lookup(_1241.type);
if(_1244 instanceof SchemaSimpleType){
_1242=this._getSimpleValue(_1240,_1244.restrictionType);
}else{
var defs=_1244.getListedDefinitions();
if(_1244.isArray){
_1242=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1240);
while(elms.hasNext()){
var elm=elms.getNext();
_1242.push(this._compute(elm,def));
}
}else{
if(_1240==null){
_1242=null;
}else{
_1242={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1240);
if(elm){
_1242[def.name]=this._compute(elm,def);
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
return _1242;
};
SOAPDecoder.prototype._getSimpleValue=function(_1249,type){
var _124b=null;
if(_1249!=null&&_1249.firstChild&&_1249.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1249.childNodes.length>1){
_1249.normalize();
}
_124b=_1249.firstChild.data;
switch(type){
case Schema.types.STRING:
_124b=_124b;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_124b=Number(_124b);
break;
case Schema.types.BOOLEAN:
_124b=_124b=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _124b;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_124c){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_124c);
}
Schema.prototype._parseSchema=function(_124d){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _124e={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_124d);
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
_124e[rule.getAttribute("name")]=entry;
}
return _124e;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1253){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1253);
}
SchemaDefinition.prototype._parse=function(_1254){
var min=_1254.getAttribute("minOccurs");
var max=_1254.getAttribute("maxOccurs");
var type=_1254.getAttribute("type");
this.name=_1254.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _125a=split[1];
this.isSimpleValue=sort!="tns";
this.type=_125a;
}else{
var elm=_1254.getElementsByTagName("*").item(0);
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
function SchemaElementType(_125c,_125d){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_125c,_125d);
}
SchemaElementType.prototype._parseListedDefinitions=function(_125e,_125f){
var els=_125e.resolveAll("s:complexType/s:sequence/s:element",_125f);
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
function SchemaComplexType(_1261,_1262){
this._definitions=new List();
this._parseListedDefinitions(_1261,_1262);
this.isArray=_1262.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1263,_1264){
var els=_1263.resolveAll("s:sequence/s:element",_1264);
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
function SchemaSimpleType(_1267,_1268){
this.restrictionType=null;
this._parse(_1267,_1268);
}
SchemaSimpleType.prototype._parse=function(_1269,_126a){
var _126b=_1269.resolve("s:restriction",_126a);
if(_126b){
this.restrictionType=_126b.getAttribute("base").split(":")[1];
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
var _126e=null;
var _126f=DOMUtil.getXMLHTTPRequest();
_126f.open("get",url,false);
_126f.send(null);
if(_126f.responseXML){
_126e=_126f.responseXML.documentElement;
}else{
alert(_126f.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _126e;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1270=new List();
var _1271=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1271.hasEntries()){
while(_1271.hasNext()){
var _1272=_1271.getNext();
var name=_1272.getAttribute("name");
_1270.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1270;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1275,_1276,_1277){
this.name=name;
this.address=_1275;
this.encoder=_1276;
this.decoder=_1277;
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
var _127b=wsdl.getOperations();
_127b.each(function(_127c){
proxy[_127c.name]=WebServiceProxy.createProxyOperation(_127c);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_127d,_127e){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_127e){
var log=_127e instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_127d.address+": "+_127d.name+"\n\n";
log+=DOMSerializer.serialize(_127e.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1280){
return function(){
var _1281=new List(arguments);
var _1282=null;
if(typeof (_1281.getLast())=="function"){
var _1283=_1281.extractLast();
var _1284=_1280.encoder.encode(_1281);
this._log(_1280,_1284);
var self=this;
var _1286=_1284.asyncInvoke(_1280.address,function(_1287){
self._log(_1280,_1287);
if(_1287){
if(_1287.fault){
_1282=SOAPFault.newInstance(_1280,_1287.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1282,_1284,_1287);
}
}else{
if(WebServiceProxy.isDOMResult){
_1282=_1287.document;
}else{
_1282=_1280.decoder.decode(_1287);
}
}
}
_1284.dispose();
_1283(_1282);
});
}else{
var _1284=_1280.encoder.encode(new List(arguments));
this._log(_1280,_1284);
var _1286=_1284.invoke(_1280.address);
this._log(_1280,_1286);
if(_1286){
if(_1286.fault){
_1282=SOAPFault.newInstance(_1280,_1286.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1282,_1284,_1286);
}
}else{
if(WebServiceProxy.isDOMResult){
_1282=_1286.document;
}else{
_1282=_1280.decoder.decode(_1286);
}
}
}
_1284.dispose();
return _1282;
}
};
};
WebServiceProxy.handleFault=function(_1288,_1289,_128a){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1288,soapRequest:_1289,soapResponse:_128a});
}
catch(exception){
alert(_1288.getFaultString());
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
var _128b=SystemLogger.getLogger("MessageQueue");
var _128c=null;
var _128d=0;
var _128e=null;
var _128f=new Map();
var _1290=new Map();
var _1291=false;
var _1292=false;
var _1293=false;
var _1294=false;
var _1295={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_128c=ConsoleMessageQueueService;
_128d=_128c.GetCurrentSequenceNumber("dummyparam!");
this.index=_128d;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1291){
if(!MessageQueue._actions.hasEntries()){
var _1296=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1292=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1296;
_1292=false;
}
}
}
};
this._pokeserver=function(){
if(_1291==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_1297){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1292);
this._updateMessages(_1297);
}
};
this._updateMessages=function(_1298){
if(_1293){
_1294=true;
}else{
_1293=true;
var self=this;
var _129a=function(_129b){
if(_129b!=null){
if(Types.isDefined(_129b.CurrentSequenceNumber)){
var _129c=_129b.CurrentSequenceNumber;
if(_129c<self.index){
_128b.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_129c);
}
self.index=_129c;
var _129d=new List(_129b.ConsoleActions);
if(_129d.hasEntries()){
self.evaluate(_129d);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_128b.error("No sequencenumber in MessageQueue response!");
}
}
_1293=false;
if(_1294){
_1294=false;
self._updateMessages();
}
};
if(_1298){
_129a(_128c.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_128c.GetMessages(Application.CONSOLE_ID,this.index,_129a);
}
}
};
this.evaluate=function(_129e){
var _129f=new List();
if(_129e.hasEntries()){
_129e.each(function(_12a0){
if(this._index[_12a0.Id]!=true){
_129f.add(_12a0);
}
this._index[_12a0.Id]=true;
},this);
if(_129f.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_129f);
}else{
this._actions=_129f;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12a1){
var _12a2="(No reason)";
if(_12a1!=null){
_12a2=_12a1.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12a2);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12a6){
if(_12a6==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12a7=null;
if(this._actions.hasEntries()){
var _12a8=this._actions.extractFirst();
_128d=_12a8.SequenceNumber;
_128b.debug("MessageQueue action: "+_12a8.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_128d+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12a8.ActionType){
case "OpenView":
_12a7=_12a8.OpenViewParams;
if(_12a7.ViewType=="ModalDialog"){
openDialogView(_12a7);
}else{
_128e=_12a7.ViewId;
openView(_12a7);
}
break;
case "CloseView":
_12a7=_12a8.CloseViewParams;
_128e=_12a7.ViewId;
closeView(_12a7);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12a8.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_128f.countEntries()+"\n";
_128f.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_128b.debug(debug);
if(!_128f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12a8.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12a8.MessageBoxParams);
break;
case "OpenViewDefinition":
_12a7=_12a8.OpenViewDefinitionParams;
_128e=_12a7.Handle;
openViewDefinition(_12a7);
break;
case "LogEntry":
logEntry(_12a8.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12a7=_12a8.BroadcastMessageParams;
_128b.debug("Server says: EventBroadcaster.broadcast ( \""+_12a7.Name+"\", "+_12a7.Value+" )");
EventBroadcaster.broadcast(_12a7.Name,_12a7.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_128f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12a8.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12a8.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12a8.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12a7=_12a8.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12a7.ViewId,entityToken:_12a7.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12a7=_12a8.OpenGenericViewParams;
openGenericView(_12a7);
break;
case "OpenExternalView":
_12a7=_12a8.OpenExternalViewParams;
openExternalView(_12a7);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12a8.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1292);
}
function logEntry(_12ab){
var _12ac=_12ab.Level.toLowerCase();
SystemLogger.getLogger(_12ab.SenderId)[_12ac](_12ab.Message);
}
function openView(_12ad){
var list=paramsToList(_12ad.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12ad.ViewId);
def.entityToken=_12ad.EntityToken;
def.flowHandle=_12ad.FlowHandle;
def.position=_1295[_12ad.ViewType],def.label=_12ad.Label;
def.image=_12ad.Image;
def.toolTip=_12ad.ToolTip;
def.argument={"url":_12ad.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12ad.ViewId,entityToken:_12ad.EntityToken,flowHandle:_12ad.FlowHandle,position:_1295[_12ad.ViewType],url:_12ad.Url,label:_12ad.Label,image:_12ad.Image,toolTip:_12ad.ToolTip}));
}
}
function openDialogView(_12b0){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12b0.ViewId,flowHandle:_12b0.FlowHandle,position:Dialog.MODAL,url:_12b0.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12b1){
var _12b2=_12b1.DialogType.toLowerCase();
if(_12b2=="question"){
throw "Not supported!";
}else{
Dialog[_12b2](_12b1.Title,_12b1.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12b3){
var map={};
var _12b5=false;
new List(_12b3.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12b5=true;
});
var proto=ViewDefinitions[_12b3.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12b3.ViewId;
}
def.argument=_12b5?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12ba){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12ba.ViewId);
def.label=_12ba.Label;
def.toolTip=_12ba.ToolTip;
def.image=_12ba.Image;
def.argument={"url":_12ba.Url,"list":paramsToList(_12ba.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12bc){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12bc.ViewId);
def.label=_12bc.Label;
def.toolTip=_12bc.ToolTip;
def.image=_12bc.Image;
def.url=_12bc.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12be){
if(StageBinding.isViewOpen(_12be.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12be.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12bf){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12bf.ViewId,isSuccess:_12bf.Succeeded});
}
this._lockSystem=function(_12c0){
var _12c1=top.bindingMap.offlinetheatre;
if(_12c0){
_12c1.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12c1.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1291=_12c0;
};
this.handleBroadcast=function(_12c3,arg){
switch(_12c3){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_128e!=null&&arg==_128e){
_128e=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_128f.set(arg,true);
}else{
_128b.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_128f.hasEntries()){
_128f.del(arg);
_128b.debug("Refreshed tree: "+arg+"\n("+_128f.countEntries()+" trees left!)");
if(!_128f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1290.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1290.hasEntries()==true){
_1290.del(arg);
if(!_1290.hasEntries()){
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
function paramsToList(_12c5){
var list=new List();
new List(_12c5).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12c8=false;
var _12c9=null;
var _12ca=false;
var _12cb=Client.qualifies();
var _12cc="admin";
var _12cd="123456";
if(!_12cb){
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
this.handleBroadcast=function(_12ce){
switch(_12ce){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12ce);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12cf=window.bindingMap.appwindow;
_12cf.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12d0){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12d1){
if(_12d0){
EventBroadcaster.subscribe(_12d1,KickStart);
}else{
EventBroadcaster.unsubscribe(_12d1,KickStart);
}
});
}
function kickStart(_12d2){
switch(_12d2){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12c8=true;
break;
}
if(_12c8){
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
DataManager.getDataBinding("username").setValue(_12cc);
DataManager.getDataBinding("password").setValue(_12cd);
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
this.doLogin=function(_12d5,_12d6){
var _12d7=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12d8=false;
var _12d9=LoginService.ValidateAndLogin(_12d5,_12d6);
if(_12d9 instanceof SOAPFault){
alert(_12d9.getFaultString());
}else{
_12d8=_12d9;
}
if(_12d8){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_12d7){
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
var _12da=DataManager.getDataBinding("username");
var _12db=DataManager.getDataBinding("password");
_12da.blur();
_12db.blur();
_12da.setValue("");
_12db.setValue("");
_12da.clean();
_12db.clean();
_12da.focus();
document.getElementById("loginerror").style.display="block";
var _12dc={handleAction:function(_12dd){
document.getElementById("loginerror").style.display="none";
_12dd.target.removeActionListener(Binding.ACTION_DIRTY,_12dc);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12dc);
}
WindowManager.fireOnLoad(this);
if(!_12cb){
UpdateManager.isEnabled=false;
}
};

